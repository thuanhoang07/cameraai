import asyncio
import math
from time import ticks_ms
from constants import *


class VisionBot:
    def __init__(self, left, right):
        self.left = left
        self.right = right
        self._speed = 70
        self._wheel_diameter = 80  # mm
        self._wheel_circ = math.pi * self._wheel_diameter
        # PID motor state
        self._target_left = 0
        self._target_right = 0
        self._error_left = 0
        self._error_right = 0
        self._last_error_left = 0
        self._last_error_right = 0
        self._integral_left = 0
        self._integral_right = 0
        self._kp = 0.3
        self._ki = 0.05
        self._kd = 0.1
        self._pid_running = False
        self._max_integral = 200
        self._max_correction = 30
        self._min_duty = 8
        # Remote control state
        self.mode_auto = True
        self._min_speed = 40
        self._teleop_cmd = ''
        self._teleop_cmd_handlers = {}
        # Camera line following state (PD+I tren offset thuan - da test thuc te
        # cho thay curve_err/angle_gain/pivot_max khong can thiet, bo de don gian)
        self._cl_kp = 0.6
        self._cl_ki = 0.0
        self._cl_kd = 0.3
        self._cl_int = 0.0
        self._cl_imax = 50
        self._cl_lerr = 0.0
        self._cl_was_lost = True
        self._cl_base_speed = 45     # LINE_BASE: toc do chay (co dinh, khong giam theo cua)
        self._cl_max_speed = 90      # LINE_MAX: tran toc do 1 banh, CO DINH
        self._cl_deadzone = 12
        # Vision tracking PID state
        self._tx_kp = 0.3
        self._tx_ki = 0
        self._tx_kd = 0.6
        self._ty_kp = 1.0
        self._ty_ki = 0
        self._ty_kd = 2.0
        self._tx_lerr = 0
        self._tx_int = 0
        self._ty_lerr = 0
        self._ty_int = 0
        self._tx_out = 0
        self._ty_out = 0
        self._t_min = 25
        self._t_max = 140
        self._t_dz = 12
        self._t_imax = 50
        self._t_ref = 100  # output PID raw "danh nghĩa" — scale = _t_max / _t_ref

    def speed(self, speed, min_speed=None):
        self._speed = speed
        if min_speed is not None:
            self._min_speed = min_speed

    def forward(self, speed=None):
        if speed is None:
            speed = self._speed
        self.left.run(speed)
        self.right.run(speed)

    def backward(self, speed=None):
        if speed is None:
            speed = self._speed
        self.left.run(-speed)
        self.right.run(-speed)

    def turn_right(self, speed=None):
        if speed is None:
            speed = self._speed
        self.left.run(speed)
        self.right.run(-speed)

    def turn_left(self, speed=None):
        if speed is None:
            speed = self._speed
        self.left.run(-speed)
        self.right.run(speed)

    def run_speed(self, left_speed, right_speed):
        self.left.run(left_speed)
        self.right.run(right_speed)

    def stop(self):
        self.left.stop()
        self.right.stop()

    def brake(self):
        self.left.brake()
        self.right.brake()

    async def stop_then(self, then):
        if then == BRAKE:
            self.brake()
            await asyncio.sleep_ms(500)
            self.stop()
        else:
            self.stop()

    def _distance_driven(self):
        left_angle = abs(self.left.angle())
        right_angle = abs(self.right.angle())
        avg_angle = (left_angle + right_angle) / 2
        return (avg_angle * self._wheel_circ) / 360

    async def _run_for(self, left_speed, right_speed, amount, unit=SECOND, then=STOP):
        if unit == SECOND:
            duration = abs(amount) * 1000
            self.left.run(left_speed)
            self.right.run(right_speed)
            start = ticks_ms()
            while ticks_ms() - start < duration:
                await asyncio.sleep_ms(10)
        elif unit == CM:
            if not self.left._encoder_enabled or not self.right._encoder_enabled:
                return
            distance_mm = abs(amount) * 10
            self.left.reset_angle()
            self.right.reset_angle()
            self.left.run(left_speed)
            self.right.run(right_speed)
            while self._distance_driven() < distance_mm:
                await asyncio.sleep_ms(10)
        await self.stop_then(then)

    async def forward_for(self, speed, amount, unit=SECOND, then=STOP):
        await self._run_for(speed, speed, amount, unit, then)

    async def backward_for(self, speed, amount, unit=SECOND, then=STOP):
        await self._run_for(-speed, -speed, amount, unit, then)

    async def turn_right_for(self, speed, amount, unit=SECOND, then=STOP):
        await self._run_for(speed, -speed, amount, unit, then)

    async def turn_left_for(self, speed, amount, unit=SECOND, then=STOP):
        await self._run_for(-speed, speed, amount, unit, then)

    def set_angle_sensor(self, sensor):
        self._angle_sensor = sensor

    async def turn_right_degree(self, speed, degree):
        await self._turn_degree(speed, -speed, degree)

    async def turn_left_degree(self, speed, degree):
        await self._turn_degree(-speed, speed, degree)

    async def _turn_degree(self, left_rpm, right_rpm, degree):
        if not hasattr(self, '_angle_sensor'):
            return
        sensor = self._angle_sensor
        await sensor.reset()
        self.set_target_rpm(left_rpm, right_rpm)
        while abs(sensor.heading) < abs(degree):
            await asyncio.sleep_ms(10)
        self.pid_stop()
        self.brake()

    def set_target_rpm(self, left_rpm, right_rpm):
        self._target_left = left_rpm
        self._target_right = right_rpm
        if not self._pid_running:
            self._pid_running = True
            self._integral_left = 0
            self._integral_right = 0
            self._last_error_left = 0
            self._last_error_right = 0
            asyncio.create_task(self._pid_loop())

    def pid_set(self, kp, ki, kd):
        self._kp = kp
        self._ki = ki
        self._kd = kd

    async def _pid_loop(self):
        while self._pid_running:
            self._pid_update()
            await asyncio.sleep_ms(50)

    def _pid_update(self):
        if not self.left._encoder_enabled or not self.right._encoder_enabled:
            self.left.run(self._target_left)
            self.right.run(self._target_right)
            return

        # Handle zero target
        if self._target_left == 0 and self._target_right == 0:
            self.left.brake()
            self.right.brake()
            return

        # Feedforward: estimate duty from target RPM
        max_rpm_l = self.left._rpm if self.left._rpm > 0 else 300
        max_rpm_r = self.right._rpm if self.right._rpm > 0 else 300
        ff_left = self._target_left / max_rpm_l * 100
        ff_right = self._target_right / max_rpm_r * 100

        # PID error
        self._error_left = self._target_left - self.left.speed()
        self._error_right = self._target_right - self.right.speed()

        # Integral with anti-windup
        self._integral_left = max(-self._max_integral, min(self._max_integral, self._integral_left + self._error_left))
        self._integral_right = max(-self._max_integral, min(self._max_integral, self._integral_right + self._error_right))

        # Derivative
        d_left = self._error_left - self._last_error_left
        d_right = self._error_right - self._last_error_right

        # PID correction
        corr_left = self._kp * self._error_left + self._ki * self._integral_left + self._kd * d_left
        corr_right = self._kp * self._error_right + self._ki * self._integral_right + self._kd * d_right

        # Clamp correction
        corr_left = max(-self._max_correction, min(self._max_correction, corr_left))
        corr_right = max(-self._max_correction, min(self._max_correction, corr_right))

        # Final duty = feedforward + correction
        duty_left = ff_left + corr_left
        duty_right = ff_right + corr_right

        # Dead zone compensation
        if self._target_left != 0 and abs(duty_left) > 0 and abs(duty_left) < self._min_duty:
            duty_left = self._min_duty if duty_left > 0 else -self._min_duty
        if self._target_right != 0 and abs(duty_right) > 0 and abs(duty_right) < self._min_duty:
            duty_right = self._min_duty if duty_right > 0 else -self._min_duty

        # Clamp total duty
        duty_left = max(-100, min(100, duty_left))
        duty_right = max(-100, min(100, duty_right))

        self._last_error_left = self._error_left
        self._last_error_right = self._error_right
        self.left.run(duty_left)
        self.right.run(duty_right)

    def pid_reset(self):
        self._error_left = 0
        self._error_right = 0
        self._last_error_left = 0
        self._last_error_right = 0
        self._integral_left = 0
        self._integral_right = 0

    def pid_stop(self):
        self._pid_running = False
        self._target_left = 0
        self._target_right = 0
        self.pid_reset()
        self.left.stop()
        self.right.stop()

    # ============ Remote Control (Gamepad) ============

    async def run_teleop(self, gamepad, accel_steps=5):
        self.mode_auto = False
        self._teleop_cmd = ''
        speed = self._min_speed
        turn_speed = self._min_speed
        last_dir = -1
        while True:
            if self.mode_auto:
                await asyncio.sleep_ms(100)
                continue

            dir = -1
            if gamepad.data[AL_DISTANCE] > 50:
                dir = gamepad.data[AL_DIR]
            elif gamepad.data[BTN_UP] and gamepad.data[BTN_LEFT]:
                self._teleop_cmd = BTN_UP
                dir = DIR_LF
            elif gamepad.data[BTN_UP] and gamepad.data[BTN_RIGHT]:
                self._teleop_cmd = BTN_UP
                dir = DIR_RF
            elif gamepad.data[BTN_DOWN] and gamepad.data[BTN_LEFT]:
                self._teleop_cmd = BTN_DOWN
                dir = DIR_LB
            elif gamepad.data[BTN_DOWN] and gamepad.data[BTN_RIGHT]:
                self._teleop_cmd = BTN_DOWN
                dir = DIR_RB
            elif gamepad.data[BTN_UP]:
                self._teleop_cmd = BTN_UP
                dir = DIR_FW
            elif gamepad.data[BTN_DOWN]:
                self._teleop_cmd = BTN_DOWN
                dir = DIR_BW
            elif gamepad.data[BTN_LEFT]:
                self._teleop_cmd = BTN_LEFT
                dir = DIR_L
            elif gamepad.data[BTN_RIGHT]:
                self._teleop_cmd = BTN_RIGHT
                dir = DIR_R
            elif gamepad.data[BTN_L1]:
                self._teleop_cmd = BTN_L1
            elif gamepad.data[BTN_R1]:
                self._teleop_cmd = BTN_R1
            elif gamepad.data[BTN_TRIANGLE]:
                self._teleop_cmd = BTN_TRIANGLE
            elif gamepad.data[BTN_SQUARE]:
                self._teleop_cmd = BTN_SQUARE
            elif gamepad.data[BTN_CROSS]:
                self._teleop_cmd = BTN_CROSS
            elif gamepad.data[BTN_CIRCLE]:
                self._teleop_cmd = BTN_CIRCLE
            elif gamepad.data[BTN_L2]:
                self._teleop_cmd = BTN_L2
            elif gamepad.data[BTN_R2]:
                self._teleop_cmd = BTN_R2
            elif gamepad.data[BTN_M1]:
                self._teleop_cmd = BTN_M1
            elif gamepad.data[BTN_M2]:
                self._teleop_cmd = BTN_M2
            elif gamepad.data[BTN_THUMBL]:
                self._teleop_cmd = BTN_THUMBL
            elif gamepad.data[BTN_THUMBR]:
                self._teleop_cmd = BTN_THUMBR
            else:
                self._teleop_cmd = ''

            if dir != last_dir:
                speed = self._min_speed
                turn_speed = self._min_speed
            else:
                speed = min(speed + accel_steps, self._speed)
                turn_speed = min(turn_speed + int(accel_steps / 2), self._speed)

            if self._teleop_cmd != '' and self._teleop_cmd in self._teleop_cmd_handlers:
                if self._teleop_cmd_handlers[self._teleop_cmd] is not None:
                    await self._teleop_cmd_handlers[self._teleop_cmd]()
                    await asyncio.sleep_ms(200)
            elif self._teleop_cmd != '':
                # Nút đang nhấn nhưng không có handler → không can thiệp,
                # để code user (polling kiểu if/else) tự xử lý.
                pass
            else:
                if dir == DIR_FW:
                    self.run_speed(speed, speed)
                elif dir == DIR_BW:
                    self.run_speed(-speed, -speed)
                elif dir == DIR_L:
                    self.run_speed(-turn_speed, turn_speed)
                elif dir == DIR_R:
                    self.run_speed(turn_speed, -turn_speed)
                elif dir == DIR_RF:
                    self.run_speed(speed, int(speed / 2))
                elif dir == DIR_LF:
                    self.run_speed(int(speed / 2), speed)
                elif dir == DIR_RB:
                    self.run_speed(-speed, int(-speed / 2))
                elif dir == DIR_LB:
                    self.run_speed(int(-speed / 2), -speed)
                else:
                    # Không nhấn gì → reset PID target để PID tự brake,
                    # đồng thời stop motor.
                    if self._pid_running:
                        self._target_left = 0
                        self._target_right = 0
                    self.stop()

            last_dir = dir
            await asyncio.sleep_ms(10)

    def on_teleop_command(self, cmd, callback):
        self._teleop_cmd_handlers[cmd] = callback

    # ============ Camera Line Following ============

    def camera_line_pid_set(self, kp, ki, kd):
        self._cl_kp = kp
        self._cl_ki = ki
        self._cl_kd = kd

    def camera_line_speed_set(self, max_speed, deadzone):
        self._cl_base_speed = max_speed
        self._cl_deadzone = deadzone

    def camera_line_reset(self):
        # Goi khi dung/khoi dong lai dò line - tranh dao ham/tich phan cu lam giat.
        self._cl_lerr = 0.0
        self._cl_int = 0.0
        self._cl_was_lost = True

    def _camera_line_pid_step(self, offset):
        # Da test thuc te: PID thuan tren offset (khong can angle/curve_err/pivot)
        # bam line sat hon o toc do co dinh - xem thao luan tune ngay 2026.
        err = offset
        if -self._cl_deadzone < err < self._cl_deadzone:
            err = 0.0

        self._cl_int += err
        self._cl_int = max(-self._cl_imax, min(self._cl_imax, self._cl_int))
        d = err - self._cl_lerr
        self._cl_lerr = err

        corr = self._cl_kp * err + self._cl_ki * self._cl_int + self._cl_kd * d

        base = self._cl_base_speed
        left = base + corr
        right = base - corr

        # Kep: 0..(cl_max_speed) - khong cho banh lui (pivot) nua.
        if left > self._cl_max_speed:
            left = self._cl_max_speed
        elif left < 0:
            left = 0
        if right > self._cl_max_speed:
            right = self._cl_max_speed
        elif right < 0:
            right = 0

        self.set_target_rpm(left, right)

    async def camera_line_step(self, camera):
        """1 buoc do line camera AI. Goi trong vong lap ~85ms (khop nhip camera)."""
        arrow = await camera.get_arrow()
        seen = (arrow["xo"] != 0 or arrow["yo"] != 0)
        if seen:
            if self._cl_was_lost:
                # vua bat lai line -> reset dao ham/tich phan tranh giat
                self._cl_lerr = 0.0
                self._cl_int = 0.0
                self._cl_was_lost = False
            self._camera_line_pid_step(camera.line_offset)
        else:
            # MAT line -> KHONG dat rpm moi -> giu nguyen lenh cuoi (bo cua cu tiep)
            self._cl_was_lost = True

    # ============ Vision Tracking PID ============

    def track_set_pid_x(self, kp, ki, kd):
        self._tx_kp = kp
        self._tx_ki = ki
        self._tx_kd = kd

    def track_set_pid_y(self, kp, ki, kd):
        self._ty_kp = kp
        self._ty_ki = ki
        self._ty_kd = kd

    def track_set_speed(self, min_speed, max_speed):
        self._t_min = min_speed
        self._t_max = max_speed

    def track_x(self, current_x, target_x):
        e = current_x - target_x
        if abs(e) <= self._t_dz:
            e = 0
        self._tx_int = max(-self._t_imax, min(self._t_imax, self._tx_int + e))
        d = e - self._tx_lerr
        self._tx_out = self._tx_kp * e + self._tx_ki * self._tx_int + self._tx_kd * d
        self._tx_lerr = e

    def track_y(self, current_y, target_y):
        e = target_y - current_y
        if abs(e) <= self._t_dz:
            e = 0
        self._ty_int = max(-self._t_imax, min(self._t_imax, self._ty_int + e))
        d = e - self._ty_lerr
        self._ty_out = self._ty_kp * e + self._ty_ki * self._ty_int + self._ty_kd * d
        self._ty_lerr = e

    def _track_limit(self, value):
        # Scale theo max/ref: max=100 → 1.0x (giữ nguyên tune), max=300 → 3.0x, max=50 → 0.5x
        scaled = value * self._t_max / self._t_ref
        if abs(scaled) <= self._t_min:
            return 0
        if scaled > self._t_max:
            return self._t_max
        if scaled < -self._t_max:
            return -self._t_max
        return scaled

    @property
    def track_vt(self):
        return self._track_limit(self._tx_out + self._ty_out)

    @property
    def track_vp(self):
        return self._track_limit(self._ty_out - self._tx_out)
