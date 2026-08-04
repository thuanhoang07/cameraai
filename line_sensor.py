from machine import Pin, SoftI2C
from setting import *
import pcf8574


class LineSensorI2C:
    def __init__(self, address=0x23):
        scl_pin = Pin(SCL_PIN)
        sda_pin = Pin(SDA_PIN)
        self.i2c_pcf = SoftI2C(scl=scl_pin, sda=sda_pin, freq=100000)
        self.address = address

        try:
            self.pcf = pcf8574.PCF8574(self.i2c_pcf, self.address)
        except:
            self.pcf = None
            print('Line sensor not found')

    def _read_byte(self):
        # Read all 8 pins in 1 I2C transaction
        self.pcf._read()
        return self.pcf._port[0]

    def read(self, index=None):
        # 0 white, 1 black
        if self.pcf == None:
            return 0

        byte = self._read_byte()

        if index is not None:
            return (byte >> index) & 1

        return ((byte >> 0) & 1, (byte >> 1) & 1, (byte >> 2) & 1, (byte >> 3) & 1)
