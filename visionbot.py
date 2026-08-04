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
        # Camera line following PID state
        self._cl_target_x = 160  # center of 320px
        self._cl_kp = 0.3
        self._cl_ki = 0.0
        self._cl_kd = 0.2
        self._cl_err = 0
        self._cl_lerr = 0
        self._cl_int = 0
        self._cl_imax = 50
        self._cl_arrow = {"xo": 0, "yo": 0, "xt": 0, "yt": 0}
        self._cl_base_speed = 50
        self._cl_min_speed = 25
        self._cl_last_valid_xo = 160
        self._cl_noise_count = 0
        self._cl_stable_count = 0
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

    def camera_line_pid_set(self, kp, ki, kd, target_x=160):
        self._cl_kp = kp
        self._cl_ki = ki
        self._cl_kd = kd
        self._cl_target_x = target_x

    def _camera_line_pid_step(self):
        xo = self._cl_arrow["xo"]
        yo = self._cl_arrow["yo"]
        xt = self._cl_arrow["xt"]
        yt = self._cl_arrow["yt"]
        base_speed = self._cl_base_speed

        # no line detected — keep last direction
        if xo == 0 and yo == 0:
            if self._cl_err != 0:
                turn = base_speed * 0.5
                if self._cl_err > 0:
                    self.set_target_rpm(base_speed, max(0, base_speed - turn))
                else:
                    self.set_target_rpm(max(0, base_speed - turn), base_speed)
            return

        # Noise filter: if xo jumps >60px from last valid, likely noise
        if abs(xo - self._cl_last_valid_xo) > 60:
            self._cl_noise_count += 1
            if self._cl_noise_count < 5:
                # Use last valid position — ignore noise
                xo = self._cl_last_valid_xo
            else:
                # Noise persisted >5 frames — accept new position
                self._cl_last_valid_xo = xo
                self._cl_noise_count = 0
        else:
            self._cl_last_valid_xo = xo
            self._cl_noise_count = 0

        # blend xt
        if xt > 0 and yt > 0:
            blend = min(yt / 240.0, 0.25)
            x = xo * (1.0 - blend) + xt * blend
        else:
            x = xo

        self._cl_err = x - self._cl_target_x

        # Dead zone
        if abs(self._cl_err) < 20:
            self._cl_err = 0

        # PID calculation
        self._cl_int += self._cl_err
        self._cl_int = max(-self._cl_imax, min(self._cl_imax, self._cl_int))
        d = self._cl_err - self._cl_lerr
        self._cl_lerr = self._cl_err

        correction = self._cl_kp * self._cl_err + self._cl_ki * self._cl_int + self._cl_kd * d

        # Stability tracking: count consecutive low-error frames
        abs_err = abs(self._cl_err)
        if abs_err < 25:
            self._cl_stable_count = min(self._cl_stable_count + 1, 10)
        else:
            self._cl_stable_count = 0

        # Adaptive speed with post-curve stabilization
        if abs_err > 60:
            actual_speed = self._cl_min_speed
        elif abs_err > 20:
            actual_speed = base_speed - (base_speed - self._cl_min_speed) * (abs_err - 20) / 40.0
        elif self._cl_stable_count < 5:
            # Just exited curve — not stable yet, stay at 70% speed
            actual_speed = base_speed * 0.7
        else:
            actual_speed = base_speed

        left = actual_speed + correction
        right = actual_speed - correction

        left = max(0, left)
        right = max(0, right)

        self.set_target_rpm(left, right)

    async def camera_line_step(self, husky):
        """One step of camera line following. Call in a loop every 50ms."""
        husky.set_algorithm(3)  # auto switch to Line Tracking
        arrow = await husky.get_arrow()
        self._cl_arrow = arrow
        self._camera_line_pid_step()

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
