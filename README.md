# CEFR 2 — 21-402-071-307 Course Website

เว็บรายวิชา English for International Standardized Tests Preparation (มทร.อีสาน วิทยาเขตสุรินทร์)
Designed by Suparat Walakanon, The International Studies Center, RMUTI, Surin Campus

## หน้าในเว็บ

| ไฟล์ | หน้า |
|---|---|
| `index.html` | หน้าแรก: ข้อมูลรายวิชา, สัปดาห์นี้, CLOs, รูปแบบ TOEIC, เกณฑ์ B1, ตาราง 16 สัปดาห์, การประเมิน |
| `plan.html` | สารบัญแผนการเรียน: รายสัปดาห์พร้อมโครง handout, บทในหนังสือ, CLO, กำหนดส่งงาน |
| `week.html?w=2` | บทเรียนรายสัปดาห์ (สัปดาห์ 1–15) พร้อมช่องสื่อ: handout, สไลด์, ใบงาน, ฝึกบนเว็บ |
| `listening.html` `reading.html` `writing.html` `quizzes.html` `mock-tests.html` `downloads.html` | หน้าฝึกและดาวน์โหลด |

## แก้เนื้อหา: แก้ไฟล์เดียว `js/course-data.js`

- **วันที่**: แก้ `startDate` (คาบแรก) ระบบคำนวณวันที่ทุกสัปดาห์และไฮไลต์ "สัปดาห์นี้" ให้เอง
- **ใส่สื่อของสัปดาห์**: เพิ่ม `links` ในสัปดาห์นั้น เช่น

  ```js
  links: { handout: "docs/week-02-handout.pdf", slides: "https://...", worksheet: "...", practice: "practice/#/test/w02" }
  ```
  ช่องที่ยังไม่มีลิงก์จะขึ้น "กำลังจัดทำ"
- **ใส่ชุดฝึก**: ใน `sections` เพิ่ม `{ title, href }` ลงใน `practice: []` ของ Part นั้น

## ติดตั้งบน GitHub Pages

รายวิชานี้เป็น repo หนึ่งใน Organization `surin-english-hub` (เหมือน `edl`)
1. Settings → Pages → Source: **Deploy from a branch** → `main` / `(root)`
2. เว็บจะอยู่ที่ `https://surin-english-hub.github.io/cefr2/` (repo ชื่อ `cefr2`) และลิงก์จากหน้า Surin English Hub

## ระบบฝึกข้อสอบ (โหมดฝึก / โหมดสอบ)

จะนำระบบฝึกสอบเดิม (โหมดฝึก/โหมดสอบ) มาไว้ในโฟลเดอร์ `practice/` เมื่อชุดฝึก TOEIC ชุดแรกพร้อม
(GitHub Actions สร้างเสียง TTS อัตโนมัติ — ตอนนั้นให้เปลี่ยน Source เป็น GitHub Actions)

## ⚠️ ข้อห้าม (repo สาธารณะ)

ห้ามใส่เฉลยแบบทดสอบที่นับคะแนน ข้อสอบกลางภาค/ปลายภาค หรือข้อมูลนักศึกษาในไฟล์ใด ๆ ของ repo นี้
หน้า Quizzes ใส่ได้เฉพาะลิงก์ไปยังระบบสอบฝั่งเซิร์ฟเวอร์ (Google Apps Script)
