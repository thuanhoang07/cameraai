"""
main_line.py - DO LINE bang AI VISION CAMERA (OhStem), thay cho HuskyLens.

Cach dung: nap file nay LEN robot voi ten main.py (khi muon test do line).

KHAC ban truoc: bo dieu khien line viet NGAY trong file nay (khong dung
_camera_line_pid_step cua visionbot vi no kep max(0,..) -> khong xoay gat duoc).
    - Dung offset (vi tri) + angle (huong) THO tu camera.
    - CHO PHEP banh trong LUI (rpm am) -> cua gat gan nhu pivot/xoay tai cho (~90 do).
    - Mat line -> GIU nguyen lenh dong co cuoi (tiep tuc bo cua cu) den khi thay lai.
Van goi visionbot.set_target_rpm (tang 2 encoder PID) -> KHONG doi visionbot.py.

Ket noi: Camera TX->RX(D3), Camera RX->TX(D4). App camera: mode "Line tracking".
"""

import time
from visionbot import *
from motor import *
from mdv2 import *
from yolo_uno import *
from ai_camera import AICamera

camera = AICamera(D3_PIN, D4_PIN)

# ================== THONG SO DO LINE (CHINH O DAY) ==================
LINE_KP    = 0.6    # do GAT bam line. Cua bi mat line -> TANG MANH (0.8, 1.0, 1.2...)
LINE_KD    = 0.3    # ham (chong lac). Camera nhieu -> giu nho.
ANGLE_GAIN = 0.8    # trong so GOC line vao loi -> don cua som. Tang neu vao cua tre.
LINE_BASE  = 45     # toc do CHAY THANG
LINE_MIN   = 10     # toc do tien toi thieu khi VAO CUA (thap -> cua cang gat)
LINE_MAX   = 90     # tran toc do 1 banh
PIVOT_MAX  = 70     # muc banh trong duoc LUI toi da khi cua gat (0 = khong cho lui)
DEADZONE   = 12     # |loi| nho hon -> coi nhu dang giua, di thang
CURVE_ERR  = 55     # |loi| lon hon -> coi la VAO CUA -> tien cham nhat (LINE_MIN)

_lerr = 0.0
_was_lost = True
_dbg_t = 0


def _line_control(offset, angle):
    # Tinh & dat toc do 2 banh tu offset + angle. Cho phep banh trong LUI de cua gat.
    global _lerr
    err = offset + angle * ANGLE_GAIN         # loi = vi tri + huong (don cua)
    if -DEADZONE < err < DEADZONE:
        err = 0.0
    d = err - _lerr
    _lerr = err
    corr = LINE_KP * err + LINE_KD * d

    # Tien cang cham khi cua cang gat (|err| lon) -> ban kinh cua nho, it van line
    ae = err if err >= 0 else -err
    if ae >= CURVE_ERR:
        base = LINE_MIN
    elif ae > DEADZONE:
        base = LINE_BASE - (LINE_BASE - LINE_MIN) * (ae - DEADZONE) / (CURVE_ERR - DEADZONE)
    else:
        base = LINE_BASE

    left = base + corr
    right = base - corr

    # Kep: banh NGOAI toi da LINE_MAX; banh TRONG duoc LUI toi -PIVOT_MAX (pivot/xoay)
    if left > LINE_MAX:
        left = LINE_MAX
    elif left < -PIVOT_MAX:
        left = -PIVOT_MAX
    if right > LINE_MAX:
        right = LINE_MAX
    elif right < -PIVOT_MAX:
        right = -PIVOT_MAX

    visionbot.set_target_rpm(left, right)
    return left, right


# ================== KHOI TAO DONG CO / ROBOT ==================
md_v2 = MotorDriverV2()
visionbot_left = DCMotor(md_v2, E1, reversed=False)
visionbot_left.set_encoder(rpm=300, ppr=6, gears=48)
visionbot_right = DCMotor(md_v2, E2, reversed=True)
visionbot_right.set_encoder(rpm=300, ppr=6, gears=48)
visionbot = VisionBot(visionbot_left, visionbot_right)


def deinit():
    visionbot.stop()


import yolo_uno
yolo_uno.deinit = deinit


async def task_forever():
    global _dbg_t, _was_lost
    while True:
        camera.set_algorithm(3)               # no-op (tuong thich)
        arrow = await camera.get_arrow()       # cap nhat camera.line_offset/angle + quan ly miss
        seen = (arrow["xo"] != 0 or arrow["yo"] != 0)

        lr = None
        if seen:
            if _was_lost:
                _lerr = 0.0                    # reset dao ham khi vua bat lai line
                _was_lost = False
            lr = _line_control(camera.line_offset, camera.line_angle)
        else:
            # MAT line -> KHONG dat rpm moi -> tang 2 GIU nguyen lenh cuoi (bo cua cu tiep)
            _was_lost = True

        # ===== LOG TAM THOI (throttle ~150ms) =====
        if time.ticks_diff(time.ticks_ms(), _dbg_t) >= 150:
            _dbg_t = time.ticks_ms()
            if seen:
                print("LINE[SEEN] off=%d ang=%d junc=%s | rpm L=%d R=%d" % (
                    int(camera.line_offset), int(camera.line_angle),
                    camera.line_junc or "-", int(lr[0]), int(lr[1])))
            else:
                print("LINE[LOST-giu lenh cu] L=%d R=%d" % (
                    int(visionbot._target_left), int(visionbot._target_right)))

        await asleep_ms(85)


async def setup():
    print('App started (LINE)')
    # Cho CAMERA LEN NGUON + on dinh (~10s) TRUOC khi bat do line.
    print('Doi camera len nguon (10s)...')
    await asleep_ms(10000)
    print('Bat dau do line')
    visionbot.pid_set(0.3, 0.05, 0.1)          # PID van toc banh (tang 2) - giu
    create_task(task_forever())


async def main():
    await setup()
    while True:
        await asleep_ms(100)


run_loop(main())
