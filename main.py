from visionbot import *
from motor import *
from mdv2 import *
from ai_camera import AICamera
from abutton import *
from yolo_uno import *

_track_cfg = {"x": None, "y": None}

async def _visionbot_track_step():
    cfg_x = _track_cfg["x"]
    cfg_y = _track_cfg["y"]
    if not cfg_x and not cfg_y:
        return
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
    visionbot.set_target_rpm(visionbot.track_vt, visionbot.track_vp)

md_v2 = MotorDriverV2()
visionbot_left = DCMotor(md_v2, E1, reversed=False)
visionbot_left.set_encoder(rpm=300, ppr=6, gears=48)
visionbot_right = DCMotor(md_v2, E2, reversed=True)
visionbot_right.set_encoder(rpm=300, ppr=6, gears=48)
visionbot = VisionBot(visionbot_left, visionbot_right)
camera = AICamera(D3_PIN, D4_PIN)
btn_BOOT= aButton(BOOT_PIN)

def deinit():
  visionbot.stop()
  btn_BOOT.deinit()

import yolo_uno
yolo_uno.deinit = deinit

async def task_forever():
  while True:
    await asleep_ms(50)
    await _visionbot_track_step()

async def setup():

  print('App started')
  _track_cfg["x"] = (1, 155)
  visionbot.track_set_pid_x(0.24, 0, 0.54)
  _track_cfg["y"] = (1, 155)
  visionbot.track_set_pid_y(1.4, 0, 1.5)
  visionbot.track_set_speed(15, 80)
  await wait_for_async(lambda: (btn_BOOT()))

  create_task(task_forever())

async def main():
  await setup()
  while True:
    await asleep_ms(100)

run_loop(main())
