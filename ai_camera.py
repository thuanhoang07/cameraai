"""
ai_camera.py - Adapter cho AI VISION CAMERA (OhStem) MO PHONG interface HuskyLens.

Muc dich: thay HuskyLens ma KHONG phai sua logic tracking cu.
    Cu:  husky  = HuskyLens(sda_pin=SDA_PIN, scl_pin=SCL_PIN)
    Moi: camera = AICamera(D3_PIN, D4_PIN)
Goi y het:  blk = await camera.get_block(id)  ->  {"x","y","w","h","id"}

Camera gui bounding box qua UART tu 2 mode (adapter nhan CA HAI):
    OBJ :<offset>,<distance>,<confidence>,<x>,<y>,<w>,<h>   (mode Object tracking)
    CBOX:<id>,<name>,<x>,<y>,<w>,<h>                        (mode Color, co box - NHANH)
        x, y : tam bounding box (px). GOC (0,0) o DUOI-TRAI
        w, h : rong / cao box (px)
    OBJ:lost / CBOX:lost : mat vat
(Bo qua COLOR:<name> chi co ten - khong dinh vi duoc.)

LUU Y toa do: HuskyLens goc (0,0) TREN-TRAI, khung 320x240, y tang XUONG.
Camera AI goc (0,0) DUOI-TRAI, khung 240x176, y tang LEN.
-> Mac dinh emulate_huskylens=True: adapter QUY DOI toa do AI sang he HuskyLens
   (320x240, goc tren-trai) nen dung lai duoc target/tuning cu (155/200).
   Dat emulate_huskylens=False neu muon toa do THO cua camera (240x176, goc duoi-trai).

XU LY MAT VAT (giong HuskyLens): khi khong co frame moi hop le, GIU tọa do CŨ
   toi MISS_THRESHOLD frame lien tiep roi moi tra 0 -> mat chop nhoang khong lam
   robot giat (khong bao gio day (0,0) vao PID som).
"""

import machine


class AICamera:
    def __init__(self, rx_pin, tx_pin, baudrate=115200, miss_threshold=15,
                 emulate_huskylens=True):
        # Gop tham so 1 lan -> tranh .init() lam reset chan tren ESP32-S3
        self.uart = machine.UART(1, baudrate=baudrate, rx=rx_pin, tx=tx_pin,
                                 bits=8, parity=None, stop=1)
        # So frame MAT lien tiep toi da van GIU toa do cu (HuskyLens = 50).
        # Camera ~11 FPS -> 15 frame ~ 1.3s. Tang len neu hay mat vat -> bam lì hơn;
        # giam xuong neu muon dung nhanh khi mat that.
        self._miss_threshold = miss_threshold
        self._miss = 0
        # emulate_huskylens=True -> quy doi toa do AI (240x176, goc DUOI-TRAI)
        #   sang he HuskyLens (320x240, goc TREN-TRAI) de dung lai target/tuning cu.
        self._emu = emulate_huskylens
        # Nguon frame hop le gan nhat: 'OBJ' (object tracking) hoac 'CBOX' (color).
        # main.py doc de ap bo thong so RIENG cho tung mode.
        self.source = ''
        # Tra ve GIONG HUSKYLENS: x, y, w, h, id + rieng mode OBJ co them
        # offset/distance/conf (mode CBOX khong co, mac dinh 0 - xem _read_uart).
        self._empty = {"x": 0, "y": 0, "w": 0, "h": 0, "id": 0,
                        "offset": 0, "distance": 0, "conf": 0}
        self._last = dict(self._empty)

        # ===== DO LINE: doc "line:offset,angle,junc" -> TONG HOP arrow gia =====
        # de tai dung camera_line_step / _camera_line_pid_step cua visionbot (get_arrow).
        self._line_miss = 0
        self._arrow = {"xo": 0, "yo": 0, "xt": 0, "yt": 0, "id": 0}
        # Gia tri line THO gan nhat (cong khai de LOG / xu ly giao lo):
        self.line_offset = 0.0   # lech ngang line so voi tam (px, thang camera goc)
        self.line_angle = 0.0    # goc nghieng line (do): + = nghieng phai
        self.line_junc = ''      # 'S','CROSS4','CROSS3L','CROSS3R','CURVE_L','CURVE_R'...
        # Cau hinh tong hop arrow (chinh khi dò line loan/i):
        self.line_angle_gain = 3.0   # px lech NGON arrow tren moi do goc -> muc "don cua"

        # ===== OBJECT CLASSIFICATION: doc "class:<ten_lop>" =====
        # Kieu du lieu KHAC obj/cbox: tra ve TEN LOP dang chu (VD "apple", "banana"),
        # KHONG phai ID so - vi day la lop do NGUOI DUNG tu train, khong co danh
        # sach co dinh. Gui theo SU KIEN (khong phai nhip lien tuc nhu obj/line),
        # va KHONG co dang "class:lost" -> giu nguyen ten cu cho den khi co su kien moi.
        self.class_name = ''     # '' = chua co ket qua phan loai nao

    # Do phan giai khung
    AI_W = 240        # camera AI: rong (x: 0..240)
    AI_H = 176        # camera AI: cao (y: 0..176, goc duoi-trai, y huong len)
    HK_W = 320        # HuskyLens: rong
    HK_H = 240        # HuskyLens: cao

    # ---------- doc & phan tich UART ----------
    def _read_uart(self):
        # Tra True neu doc duoc 1 frame OBJ HOP LE moi; nguoc lai False.
        # Doc HET dong dang cho, chi giu dong moi nhat (tranh tre du lieu).
        line = None
        while self.uart.any():
            l = self.uart.readline()
            if l:
                line = l
        if not line:
            return False
        try:
            text = line.decode('utf-8').strip()
        except Exception:
            return False
        i = text.find(':')
        if i <= 0:
            return False
        tag = text[:i].strip().upper()
        payload = text[i + 1:].strip()

        # TU NHAN bounding box tu CA 2 nguon (khong quan tam color hay obj):
        #   OBJ :offset,distance,conf,x,y,w,h  -> x,y,w,h o index 3,4,5,6
        #   CBOX:id,name,x,y,w,h               -> x,y,w,h o index 2,3,4,5 (name la chu)
        # Bo qua COLOR (chi ten, khong co box) / FACE / CLASS / QR / LINE.
        if tag == 'OBJ':
            xi, yi, wi, hi = 3, 4, 5, 6
        elif tag == 'CBOX':
            xi, yi, wi, hi = 2, 3, 4, 5
        else:
            return False
        if 'lost' in payload.lower():
            return False                # mat vat -> khong co frame moi hop le
        parts = payload.split(',')
        if len(parts) <= hi:
            return False                # thieu truong -> bo qua
        try:
            x = float(parts[xi])
            y = float(parts[yi])
            w = float(parts[wi])
            h = float(parts[hi])
        except Exception:
            return False                # truong khong phai so -> bo qua

        # OBJ co them offset,distance,conf o dau (index 0,1,2); CBOX khong co -> 0.
        off_raw = dist_raw = conf_raw = 0.0
        if tag == 'OBJ':
            try:
                off_raw = float(parts[0])
                dist_raw = float(parts[1])
                conf_raw = float(parts[2])
            except Exception:
                pass                     # thieu/lỗi truong nay -> giu 0, khong bo qua ca frame

        if self._emu:
            # Quy doi AI (240x176, goc DUOI-TRAI) -> HuskyLens (320x240, goc TREN-TRAI)
            #   x: gian ngang theo ti le
            #   y: LAT truc (AI_H - y) roi gian doc -> giong huong y HuskyLens
            x = x * self.HK_W / self.AI_W
            y = (self.AI_H - y) * self.HK_H / self.AI_H
            w = w * self.HK_W / self.AI_W
            h = h * self.HK_H / self.AI_H

        self._last = {
            "x": int(x), "y": int(y), "w": int(w), "h": int(h),
            "id": 1, "offset": off_raw, "distance": dist_raw, "conf": conf_raw,
        }
        self.source = tag        # 'OBJ' hoac 'CBOX' -> main.py ap thong so rieng
        return True

    # ---------- API GIONG HuskyLens ----------
    async def get_block(self, target_id=None):
        # Camera chi theo 1 vat -> bo qua target_id.
        # Co frame moi -> reset miss, tra box that.
        # Khong co -> tang miss; con < nguong thi GIU toa do cu; qua nguong -> tra 0 (dung).
        if self._read_uart():
            self._miss = 0
            return dict(self._last)
        self._miss += 1
        if self._miss < self._miss_threshold:
            return dict(self._last)     # GIU vi tri cu (giong HuskyLens)
        return dict(self._empty)        # mat qua lau -> 0

    async def get_any_block(self):
        return await self.get_block()

    # ---------- DO LINE ----------
    def _read_line(self):
        # Tra True neu doc duoc 1 frame LINE hop le moi: "line:offset,angle,junc".
        line = None
        while self.uart.any():
            l = self.uart.readline()
            if l:
                line = l
        if not line:
            return False
        try:
            text = line.decode('utf-8').strip()
        except Exception:
            return False
        i = text.find(':')
        if i <= 0:
            return False
        tag = text[:i].strip().upper()
        payload = text[i + 1:].strip()
        if tag != 'LINE':
            return False                # bo qua OBJ/CBOX/COLOR...
        if 'lost' in payload.lower():
            return False                # mat line
        parts = payload.split(',')
        try:
            off = float(parts[0])
        except Exception:
            return False
        ang = 0.0
        if len(parts) >= 2:
            try:
                ang = float(parts[1])
            except Exception:
                ang = 0.0
        junc = parts[2].strip().upper() if len(parts) >= 3 else 'S'
        self.line_offset = off
        self.line_angle = ang
        self.line_junc = junc
        return True

    def _make_arrow(self, offset, angle):
        # Tong hop mui ten gia {xo,yo,xt,yt} tu offset (vi tri) + angle (huong):
        #   xo = tam + offset (dua ve thang HuskyLens 320) -> vi tri line gan robot
        #   xt = xo + angle*gain                          -> ngon line phia truoc (don cua)
        cx = self.HK_W / 2.0                  # 160
        if self._emu:
            xo = cx + offset * (self.HK_W / self.AI_W)   # scale 240 -> 320
        else:
            xo = cx + offset
        # GOP GOC line vao VI TRI CHINH (xo) -> don cua manh & som, KHONG bi
        # blend cap 0.25 cua visionbot gioi han. Duong thang (angle~0) -> khong doi.
        xo = xo + angle * self.line_angle_gain
        if xo < 0:
            xo = 0
        elif xo > self.HK_W:
            xo = self.HK_W
        # xt = xo -> x = xo (khong dung blend rieng); yo>0 de khong bi coi "mat line".
        return {"xo": int(xo), "yo": 100, "xt": int(xo), "yt": 60, "id": 1}

    async def get_arrow(self):
        # Tra arrow tong hop tu du lieu line. Co frame moi -> tinh arrow; mat qua nguong -> 0.
        if self._read_line():
            self._line_miss = 0
            self._arrow = self._make_arrow(self.line_offset, self.line_angle)
            return dict(self._arrow)
        self._line_miss += 1
        if self._line_miss < self._miss_threshold:
            return dict(self._arrow)     # GIU arrow cu (mat chop nhoang)
        # mat line lau -> arrow 0 -> visionbot tu "giu huong cu" theo _cl_err
        return {"xo": 0, "yo": 0, "xt": 0, "yt": 0, "id": 0}

    # ---------- OBJECT CLASSIFICATION ----------
    def _read_class(self):
        # Tra True neu doc duoc 1 dong "class:<ten_lop>" moi. Chi nhan dung tag
        # CLASS, bo qua OBJ/CBOX/LINE/... tren cung UART.
        line = None
        while self.uart.any():
            l = self.uart.readline()
            if l:
                line = l
        if not line:
            return False
        try:
            text = line.decode('utf-8').strip()
        except Exception:
            return False
        i = text.find(':')
        if i <= 0:
            return False
        tag = text[:i].strip().upper()
        if tag != 'CLASS':
            return False
        name = text[i + 1:].strip()
        if not name:
            return False
        self.class_name = name
        return True

    async def get_class(self):
        # Su kien (khong phai nhip lien tuc), KHONG co dang "lost" -> co du lieu
        # moi thi cap nhat, khong thi GIU nguyen ten cu (khac han get_block/get_arrow).
        self._read_class()
        return self.class_name

    def set_algorithm(self, algo):
        # HuskyLens can chuyen thuat toan; AI camera chon mode tren app -> khong lam gi.
        pass

    def set_mode(self, mode):
        # Doi mode hoat dong cua camera (0..7, xem bang mode trong app).
        # Gui doi xung voi chieu NHAN "TAG:payload\n", nhung TAG viet THUONG
        # ("mode:") - da kiem tra thuc te tren firmware v1.5, KHONG phai "MODE:".
        self.uart.write("mode:%d\n" % mode)
