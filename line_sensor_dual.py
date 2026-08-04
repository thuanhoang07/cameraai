from machine import I2C
import pcf8574


class LineSensor2I2C:
    def __init__(self, scl_pin2, sda_pin2, address=0x23):
        self.scl2 = scl_pin2
        self.sda2 = sda_pin2
        self.i2c_pcf2 = I2C(0, scl=self.scl2, sda=self.sda2, freq=100000)
        self.address = address

        try:
            self.pcf2 = pcf8574.PCF8574(self.i2c_pcf2, self.address)
        except:
            self.pcf2 = None
            print('Line sensor not found')

    def read_ss2(self, index=None):
        # 0 white, 1 black
        if self.pcf2 == None:
            return 0

        if index == None:
            return (self.pcf2.pin(0), self.pcf2.pin(1), self.pcf2.pin(2), self.pcf2.pin(3))

        return self.pcf2.pin(index)
