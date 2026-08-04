"""
main.py - Theo doi vat the bang AI VISION CAMERA (OhStem), thay cho HuskyLens.

So voi ban HuskyLens cu: chi doi 1 dong tao camera va cho tracking dung
camera.get_block() thay husky.get_block(). Toan bo logic track_x / track_y GIU NGUYEN.

Ket noi: Camera TX -> chan RX (D3), Camera RX -> chan TX (D4), VCC 5V/3V3, GND chung.
Tren app camera: chon mode "Object tracking".
"""

import time
from visionbot import *
from motor import *
from mdv2 import *
from yolo_uno import *
from ai_camera import AICamera

# ===== Camera thay HuskyLens (chan da dung, D3=RX D4=TX) =====
camera = AICamera(D3_PIN, D4_PIN)

# ================== CAU HINH THEO DOI ==================
# (id, target). id = 1 (camera chi theo 1 vat, id chi de tuong thich HuskyLens).
# Adapter da QUY DOI toa do AI (240x176) sang he HuskyLens (320x240) ->
# dung LAI dung target/tuning cu: giua khung = (160,120).
TARGET_X = 160
TARGET_Y = 155

_track_cfg = {"x": None, "y": None}
_dbg_t = 0   # moc thoi gian lan log gan nhat (throttle)

# ================== BO THONG SO RIENG THEO NGUON ==================
# Adapter cho biet frame den tu 'OBJ' (object tracking) hay 'CBOX' (color).
#   OBJ : giu NGUYEN nhu cu (da on).
#   CBOX: box color chac/it nhieu -> THAT CHAT dieu kien di chuyen (nhay hon, sat tam hon):
#         Kp cao hon + min thap hon + deadzone nho hon -> canh giua tot hon.
# Moi profile: (pid_x=(kp,ki,kd), pid_y=(kp,ki,kd), speed=(min,max), dz)
PROFILE = {
    'OBJ':  {'pid_x': (0.24, 0, 0.54), 'pid_y': (1.4, 0, 1.5), 'speed': (15, 80), 'dz': 12},
    'CBOX': {'pid_x': (0.24, 0, 0.54), 'pid_y': (1.4, 0, 1.5), 'speed': (15, 80), 'dz': 12},
}
_cur_profile = ''   # profile dang ap (tranh set lai moi frame)


def _apply_profile(src):
    global _cur_profile
    if src not in PROFILE or src == _cur_profile:
        return
    p = PROFILE[src]
    visionbot.track_set_pid_x(*p['pid_x'])
    visionbot.track_set_pid_y(*p['pid_y'])
    visionbot.track_set_speed(*p['speed'])
    visionbot._t_dz = p['dz']
    _cur_profile = src


async def _visionbot_track_step():
    global _dbg_t
    cfg_x = _track_cfg["x"]
    cfg_y = _track_cfg["y"]
    if not cfg_x and not cfg_y:
        return
    blk = None
    if cfg_x and cfg_y and cfg_x[0] == cfg_y[0]:
        blk = await camera.get_block(cfg_x[0])
        visionbot.track_x(blk["x"], cfg_x[1])
        visionbot.track_y(blk["y"], cfg_y[1])
    else:
        if cfg_x:
            blk = await camera.get_block(cfg_x[0])
            visionbot.track_x(blk["x"], cfg_x[1])
        if cfg_y:
            blk = await camera.get_block(cfg_y[0])
            visionbot.track_y(blk["y"], cfg_y[1])
    # Tu chon bo thong so theo nguon frame (OBJ / CBOX) - ap cho frame ke tiep.
    _apply_profile(camera.source)
    vt = visionbot.track_vt
    vp = visionbot.track_vp
    visionbot.set_target_rpm(vt, vp)

    # ===== LOG TAM THOI (throttle ~150ms) - go bo khi chay that =====
    if time.ticks_diff(time.ticks_ms(), _dbg_t) >= 150:
        _dbg_t = time.ticks_ms()
        if blk is None:
            print("track: chua cau hinh")
        else:
            seen = (blk["w"] != 0 or blk["h"] != 0)
            state = "THAY VAT" if seen else "MAT VAT "
            tx = cfg_x[1] if cfg_x else -1
            ty = cfg_y[1] if cfg_y else -1
            print("[%s] box x=%d y=%d w=%d h=%d | target x=%d y=%d | rpm L=%d R=%d" % (
                state, blk["x"], blk["y"], blk["w"], blk["h"],
                tx, ty, int(vt), int(vp)))


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
    while True:
        await _visionbot_track_step()   # chay 1 buoc theo doi moi vong
        # Chu ky 85ms ~ khop nhip camera (~11 FPS) -> moi vong gan nhu co 1 frame moi,
        # tranh tinh lai PID tren data cu (het nhap nhay Kd). Camera nhanh hon -> giam so nay.
        await asleep_ms(85)


async def setup():
    print('App started')
    # Cho CAMERA LEN NGUON + on dinh (~10s) TRUOC khi bat theo doi.
    # Camera khoi dong lau hon MCU -> tranh chay tracking khi chua co du lieu.
    print('Doi camera len nguon (10s)...')
    await asleep_ms(10000)
    print('Bat dau theo doi')
    # Thong so tracking gio DAT THEO NGUON trong PROFILE (o dau file) va tu ap
    # trong _visionbot_track_step tuy frame la OBJ hay CBOX. Dat default OBJ luc dau.
    _apply_profile('OBJ')
    _track_cfg["x"] = (1, TARGET_X)
    _track_cfg["y"] = (1, TARGET_Y)
    create_task(task_forever())


async def main():
    await setup()
    while True:
        await asleep_ms(100)


run_loop(main())





