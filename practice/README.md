# ชุดฝึก TOEIC รายวิชา CEFR 2 (practice/)

ระบบโหมดฝึก/โหมดสอบ ปรับจากเว็บฝึกสอบ TELP เดิม · Designed by Suparat Walakanon, The International Studies Center, RMUTI, Surin Campus

- โหมดฝึก `#/practice/<id>`: ฟังไม่จำกัด เห็นตัวเลือก เฉลยทันที
- โหมดสอบ `#/test/<id>`: จับเวลา ฟังได้ตาม `playLimit` Listening ไม่แสดงคำถามและตัวเลือก
- ชุดข้อสอบอยู่ใน `data/tests/*.json` และต้องใส่ชื่อใน `data/tests/index.json`
- Part 1 ใส่ภาพด้วย `"image"` และ `"imageAlt"` ในแต่ละ group (ภาพอยู่ใน `images/`)
- ชุดรวมใช้ `"includes": ["ชุด-1", "ชุด-2"]`
- เสียง MP3 สร้างอัตโนมัติด้วย edge-tts ใน GitHub Actions (`.github/workflows/build-and-deploy.yml`) ระหว่างยังไม่มีไฟล์เสียง เว็บใช้เสียงอ่านของเบราว์เซอร์แทน
- ตรวจไฟล์ก่อน push: `python practice/scripts/validate.py`

⚠️ repo สาธารณะ: ใส่ได้เฉพาะชุดฝึกที่ไม่นับคะแนน ห้ามใส่ข้อสอบหรือเฉลยของแบบทดสอบที่นับคะแนน
- อัปเดตโค้ด (js/css) แล้วให้เปลี่ยนเลข `?v=` ใน `index.html` เพื่อให้เบราว์เซอร์โหลดไฟล์ใหม่ทันที
