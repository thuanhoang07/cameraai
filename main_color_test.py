"""
main_color_test.py - Test hieu chinh (calib) + nhan dien mau CAM BIEN MAU (VEML6040).

Cach dung: nap file nay LEN robot voi ten main.py (khi muon test rieng cam bien mau).

Quy trinh:
  1. Ap cam bien mau vao be mat mau XANH NGOC (dat gan nhat = "xanh lo/cyan" trong
     6 mau preset cua VEML6040 - xem ghi chu o duoi) TRUOC khi het thoi gian dem
     nguoc CALIB_WAIT_MS, roi chuong trinh se tu dong hieu chinh (calib).
  2. Sau khi calib xong, DOI mot luc (POST_CALIB_WAIT_MS) - luc nay ban co the
     GIU NGUYEN vat mau de test nhan luon, hoac NHAC vat ra roi dat lai de test
     mat mau.
  3. Vong lap sau do: lien tuc in ra co dang la mau "xanh ngoc" (cyan) hay khong.

Ghi chu ten mau: VEML6040 chi ho tro 6 nhan mau dinh san (do, vang, xanh la,
xanh lo/cyan, xanh duong, hong tham) + 2 nhan nen (trang, den). "Xanh ngoc" (ngoc
bich/turquoise) KHONG co san -> dang dung "cyan" (xanh lo) la gan nhat. Neu mau
thuc te cua ban ngA? ve xanh la nhieu hon, doi COLOR_NAME ben duoi thanh "green".
"""

import time
from veml6040 import VEML6040
from yolo_uno import *

COLOR_NAME = "cyan"          # "xanh ngoc" -> gan nhat voi cyan (xanh lo) trong 6 mau preset

CALIB_WAIT_MS = 3000         # thoi gian cho de AP CAM BIEN vao mau truoc khi calib
POST_CALIB_WAIT_MS = 3000    # thoi gian cho SAU KHI calib xong, truoc khi bat dau nhan dien
CHECK_INTERVAL_MS = 300      # nhip in ket qua nhan dien trong vong lap

color_sensor = VEML6040()


async def main():
    # ===== BUOC 1: CALIB =====
    print("Ap cam bien mau vao be mat MAU XANH NGOC ngay bay gio...")
    print("Se calib sau %d ms" % CALIB_WAIT_MS)
    await asleep_ms(CALIB_WAIT_MS)

    color_sensor.calibrate_color(COLOR_NAME)
    print("Da calib xong mau '%s' (xanh ngoc)" % COLOR_NAME)

    # ===== BUOC 2: DOI MOT LUC =====
    print("Doi %d ms truoc khi bat dau nhan dien..." % POST_CALIB_WAIT_MS)
    await asleep_ms(POST_CALIB_WAIT_MS)

    # ===== BUOC 3: BAT TASK NEN DOC MAU + VONG LAP NHAN DIEN =====
    create_task(color_sensor.color_run())
    await asleep_ms(200)  # cho task nen co it nhat 1 mau du lieu dau tien

    print("Bat dau nhan dien mau xanh ngoc (cyan). Dua vat mau ra/vao de test.")
    while True:
        current = color_sensor.color()
        if current == COLOR_NAME:
            print("[NHAN DIEN] DUNG la xanh ngoc (cyan)")
        else:
            print("[NHAN DIEN] khong phai xanh ngoc - dang doc: %s" % current)
        await asleep_ms(CHECK_INTERVAL_MS)


run_loop(main())