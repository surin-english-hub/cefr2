/* =========================================================
   ข้อมูลรายวิชา — แก้ไฟล์นี้ไฟล์เดียว ทุกหน้าจะอัปเดตตาม
   ⚠️ เว็บนี้เป็นสาธารณะ: ห้ามใส่เฉลยแบบทดสอบที่นับคะแนน
      ข้อสอบกลางภาค/ปลายภาค หรือข้อมูลนักศึกษาในไฟล์ใด ๆ
   ========================================================= */
window.COURSE = {
  nick: "CEFR 2",
  code: "21-402-071-307",
  titleTh: "ภาษาอังกฤษเพื่อเตรียมตัวสอบข้อสอบมาตรฐานนานาชาติ",
  titleEn: "English for International Standardized Tests Preparation",
  credits: "3(2-2-5)",
  semester: "ภาคการศึกษาที่ 2/2569",
  startDate: "2026-11-11",           // คาบแรก (วันพุธ) ใช้คำนวณวันที่ของแต่ละสัปดาห์
  hours: "บรรยาย 2 ชม. + ปฏิบัติ 2 ชม. / สัปดาห์",
  designer: "Suparat Walakanon",
  org: "The International Studies Center, RMUTI, Surin Campus",

  description:
    "พื้นฐานการเตรียมตัวสอบข้อสอบมาตรฐานนานาชาติเพื่อวัดระดับความสามารถด้านภาษาอังกฤษ " +
    "รูปแบบข้อสอบและประเภทคำถาม เทคนิคการทำข้อสอบ การฝึกทำตัวอย่างข้อสอบมาตรฐานหลากหลาย",

  clos: [
    "อธิบายความสำคัญ หลักการ และเกณฑ์มาตรฐานของการวัดระดับความสามารถในการสื่อสารภาษาอังกฤษเพื่อการสื่อสารนานาชาติได้",
    "ประยุกต์ใช้หลักการและกลยุทธ์ในการทำข้อสอบมาตรฐานภาษาอังกฤษได้",
    "ประยุกต์ใช้ความรู้คำศัพท์ สำนวน กฎเกณฑ์ไวยากรณ์ในการสอบข้อสอบมาตรฐานภาษาอังกฤษได้",
    "ประยุกต์ใช้ความรู้เพื่อการฟังและอ่านภาษาอังกฤษที่ปรากฏในข้อสอบมาตรฐานภาษาอังกฤษได้"
  ],

  assessment: [
    { item: "Quizzes & Assignments", note: "แบบทดสอบย่อย 4 ครั้ง + งานเขียน 3 ชิ้น (อาจมีนำเสนองานกลุ่ม)", pct: 40 },
    { item: "Attendance", note: "การเข้าเรียน", pct: 10 },
    { item: "Midterm", note: "สัปดาห์ที่ 8 — เนื้อหาสัปดาห์ 1–7", pct: 25 },
    { item: "Final", note: "สัปดาห์ที่ 16 — เนื้อหาสัปดาห์ 9–15", pct: 25 }
  ],

  b1: [
    { skill: "Listening", score: "≥ 275", max: "495" },
    { skill: "Reading", score: "≥ 275", max: "495" },
    { skill: "Writing", score: "≥ 120", max: "200" },
    { skill: "Speaking", score: "≥ 120", max: "200" }
  ],

  toeic: {
    listening: [
      { part: 1, name: "Photographs", n: 6 },
      { part: 2, name: "Question–Response", n: 25 },
      { part: 3, name: "Conversations", n: 39 },
      { part: 4, name: "Talks", n: 30 }
    ],
    reading: [
      { part: 5, name: "Incomplete Sentences", n: 30 },
      { part: 6, name: "Text Completion", n: 16 },
      { part: 7, name: "Reading Comprehension (Single 29 / Multiple 25)", n: 54 }
    ],
    writing: [
      { q: "1–5", name: "Write a sentence based on a picture" },
      { q: "6–7", name: "Respond to a written request" },
      { q: "8", name: "Write an opinion essay" }
    ]
  },

  /* ---------- Placement Test (Pretest / Posttest) ----------
     show: true = แสดงการ์ดบนหน้าแรก · false = ซ่อนจากหน้าแรก (ยังอยู่ในหน้าสัปดาห์ 1, 15 และ Quizzes)
     การเปิด-ปิดห้องสอบจริงควบคุมที่ exam_open ใน Google Sheet — ห้ามใส่ access code ในไฟล์นี้ */
  placement: {
    show: true,
    url: "https://script.google.com/macros/s/AKfycbyZTZSSKTPpbO_6YnkH6S31A2I0uQhHZJzexcqJu-4wsR6_5hQzIf00ve4cBXEmsa3n/exec",
    weeks: [1, 15],
    when: "Pretest สัปดาห์ที่ 1–2 · Posttest สัปดาห์ที่ 15",
    steps: [
      "ใช้คอมพิวเตอร์และหูฟัง (ส่วน Listening มีเสียง)",
      "พิมพ์รหัสนักศึกษาแบบมีขีด เช่น 68XXXXXXXXX-X",
      "ใส่รหัสเข้าสอบที่อาจารย์แจ้งในห้องสอบ",
      "ทำให้ครบ 3 ส่วน: Listening 20 · Grammar & Vocabulary 20 · Reading 20"
    ]
  },

  /* ---------- แผนการเรียน 16 สัปดาห์ ----------
     type: "lesson" | "exam"
     L = ส่วน Listening, R = ส่วน Grammar / Reading / Writing
     handout = โครง handout (หัวข้อหลัก)
     links = ใส่ลิงก์เมื่อสื่อพร้อม เช่น { slides: "...", handout: "...", practice: "..." } */
  weeks: [
    {
      n: 1, type: "lesson",
      title: "Introduction to TOEIC & CEFR",
      L: "แนะนำรายวิชา: รูปแบบข้อสอบ TOEIC และเกณฑ์ CEFR",
      R: "Pretest (Placement Test)",
      book: "—", clo: [1], assess: "Pretest",
      links: { slides: "docs/week-01/Week01_Intro_TOEIC_CEFR.pptx" },
      handout: [
        "TOEIC L&R และ Writing: จำนวนข้อ เวลา ช่วงคะแนน",
        "CEFR คืออะไร และคะแนน TOEIC ที่เทียบระดับ B1",
        "ตั้งเป้าหมายคะแนนของตัวเอง",
        "วิธีใช้เว็บรายวิชา: โหมดฝึก / โหมดสอบ"
      ]
    },
    {
      n: 2, type: "lesson",
      title: "Part 1 Photographs + Word Form",
      L: "Part 1 Photographs",
      R: "Part 5: Parts of Speech & Word Form",
      book: "บทที่ 1", clo: [2, 3, 4], assess: "",
      handout: [
        "A: ประเภทภาพ (คนเดียว / หลายคน / ไม่มีคน)",
        "A: is + V-ing กับ has been + V3 / กับดักคำเสียงคล้าย",
        "B: ตำแหน่ง noun / verb / adjective / adverb ในประโยค",
        "B: suffix -tion -ment -ness -ly -ful -less",
        "B: เทคนิคดูช่องว่างโดยไม่ต้องแปลทั้งประโยค"
      ]
    },
    {
      n: 3, type: "lesson",
      title: "Part 2 (Wh- Questions) + Verb Tenses",
      L: "Part 2 Question–Response: Wh- questions",
      R: "Part 5: Verb Tenses",
      book: "บทที่ 2", clo: [2, 3, 4], assess: "Quiz 1",
      handout: [
        "A: ฟังคำแรกของคำถาม (Who / When / Where / Why / How)",
        "A: กับดัก: ตอบ Yes/No กับคำถาม Wh-, คำซ้ำ, เสียงคล้าย",
        "B: Present Simple vs Present Continuous",
        "B: Past Simple vs Present Perfect",
        "B: will vs be going to และ signal words"
      ]
    },
    {
      n: 4, type: "lesson",
      title: "Part 2 (Other Questions) + Subject-Verb Agreement",
      L: "Part 2: Yes/No, Tag, Choice, Suggestion, Statement",
      R: "Part 5: Subject-Verb Agreement + Pronouns",
      book: "บทที่ 3", clo: [2, 3, 4], assess: "",
      handout: [
        "A: คำถามแบบเลือก คำถามชวน และประโยคบอกเล่า",
        "A: คำตอบอ้อม เช่น I'll check the schedule.",
        "B: กฎ Subject-Verb Agreement และกับดักวลีคั่นกลาง",
        "B: each / every, either…or, neither…nor",
        "B: Pronouns (subject / object / possessive / reflexive)"
      ]
    },
    {
      n: 5, type: "lesson",
      title: "Part 3 Conversations (1) + Verb Patterns",
      L: "Part 3: โครงสร้างบทสนทนาและการอ่านคำถามล่วงหน้า",
      R: "Part 5: Verb Patterns + Verb + Preposition",
      book: "บทที่ 4, 6", clo: [2, 3, 4], assess: "Quiz 2",
      handout: [
        "A: 3 คำถาม = ต้น / กลาง / ท้าย บทสนทนา",
        "A: คำถาม Who / Where / What will they do next",
        "B: Verb + to V1 / Verb + V-ing",
        "B: คำที่ความหมายเปลี่ยน: stop, remember, try",
        "B: Verb + Preposition ที่ออกบ่อยใน TOEIC"
      ]
    },
    {
      n: 6, type: "lesson",
      title: "Part 3 (2) + Part 6 Text Completion",
      L: "Part 3: บทสนทนา 3 คน, Graphic questions, Intent questions",
      R: "Part 6 Text Completion + คำเชื่อม",
      book: "บทที่ 11–12 (ปรับเป็นเทคนิค Part 5–6)", clo: [2, 3, 4], assess: "",
      handout: [
        "A: บทสนทนา 3 คน และคำถามคู่กราฟิก (ตาราง แผนที่ ใบราคา)",
        "A: What does the man mean when he says…",
        "B: 4 ชนิดคำถาม Part 6 รวม sentence insertion",
        "B: อ่านทั้งย่อหน้าก่อนเลือก tense",
        "B: transition words: however, therefore, in addition"
      ]
    },
    {
      n: 7, type: "lesson",
      title: "Listening Review + Part 7 Single Passages",
      L: "ทบทวนกับดัก Part 1–3",
      R: "Part 7: Single Passages และประเภทคำถาม",
      book: "บทที่ 14–16", clo: [2, 4], assess: "Quiz 3 (Mini Mock)",
      handout: [
        "A: ตารางสรุปกับดัก Part 1–3",
        "B: 6 ประเภทคำถาม: main idea, detail, vocabulary, inference, NOT, purpose",
        "B: email, notice, advertisement, text message chain",
        "B: skimming / scanning และคำถามแทรกประโยค [1]–[4]",
        "Mini Mock: Listening 20 + Reading 20"
      ]
    },
    { n: 8, type: "exam", title: "สอบกลางภาค (Midterm)", L: "", R: "", book: "", clo: [1, 2, 3, 4], assess: "Midterm 25%", handout: [] },
    {
      n: 9, type: "lesson",
      title: "Part 4 Talks (1) + Phrasal Verbs",
      L: "Part 4: Announcements, Voicemail, Advertisements",
      R: "Part 5: Phrasal Verbs & Collocations",
      book: "บทที่ 5", clo: [2, 3, 4], assess: "",
      handout: [
        "A: ประเภท talk และคำถามที่ตามมา",
        "A: จับผู้พูด ผู้ฟัง และจุดประสงค์ของ talk",
        "B: phrasal verbs ธุรกิจ: carry out, put off, take over",
        "B: collocations: make a reservation, meet a deadline"
      ]
    },
    {
      n: 10, type: "lesson",
      title: "Part 4 (2) + Conditionals & Relative Clauses",
      L: "Part 4: Graphic questions และ talk ที่ยาวขึ้น",
      R: "Part 5–6: Conditionals + Relative Clauses",
      book: "บทที่ 7–8", clo: [2, 3, 4], assess: "Quiz 4",
      handout: [
        "A: talk คู่กราฟิก และคำบอกลำดับ (first, after that, finally)",
        "B: Conditionals Type 0–3",
        "B: who / which / that / whose / where ในข้อสอบ Part 5"
      ]
    },
    {
      n: 11, type: "lesson",
      title: "Paraphrase + Part 7 Multiple Passages",
      L: "Part 3–4: Paraphrase, การเปลี่ยนใจตอนท้าย, ตัวเลขสับสน",
      R: "Part 7: Double/Triple Passages + Passive & Comparisons",
      book: "บทที่ 9–10, 17", clo: [2, 3, 4], assess: "",
      handout: [
        "A: บทพูดกับตัวเลือกใช้คำต่างกันแต่ความหมายเดียวกัน",
        "A: ตัวเลขสับสน (13 / 30) และการเปลี่ยนใจตอนท้าย",
        "B: คำถามที่ต้องโยงข้อมูลจาก 2–3 เอกสาร",
        "B: Passive Voice และ Comparisons ใน Part 5"
      ]
    },
    {
      n: 12, type: "lesson",
      title: "Writing Q1–5: Sentences Based on Pictures",
      L: "ฝึกฟังจับเวลา Part 1–2",
      R: "Writing Q1–5: Write a sentence based on a picture",
      book: "เล่ม Writing", clo: [2, 3], assess: "Assignment 1",
      handout: [
        "B: รูปแบบโจทย์ (ภาพ + คำที่กำหนด 2 คำ) และเกณฑ์คะแนน 0–3",
        "B: โครงประโยคที่ใช้ได้กับทุกภาพ",
        "B: ข้อผิดพลาดที่ผู้เรียนไทยทำบ่อย",
        "B: ตัวอย่างคำตอบระดับ B1 + rubric"
      ]
    },
    {
      n: 13, type: "lesson",
      title: "Writing Q6–7: Respond to a Written Request",
      L: "ฝึกฟังจับเวลา Part 3–4",
      R: "Writing Q6–7: Respond to a written request",
      book: "เล่ม Writing", clo: [2, 3], assess: "Assignment 2",
      handout: [
        "B: อ่านโจทย์แล้วหา \"งาน\" ที่ต้องทำให้ครบ",
        "B: โครงอีเมลตอบกลับ และเกณฑ์คะแนน 0–4",
        "B: ตัวอย่างคำตอบระดับ B1 + rubric"
      ]
    },
    {
      n: 14, type: "lesson",
      title: "Writing Q8: Opinion Essay + Time Management",
      L: "กลยุทธ์บริหารเวลา Listening 45 นาที",
      R: "Writing Q8 Opinion Essay + Part 7 จับเวลา",
      book: "เล่ม Writing", clo: [2, 3, 4], assess: "Assignment 3",
      handout: [
        "A: ใช้ช่วงอ่านคำสั่งไปอ่านคำถามล่วงหน้า",
        "B: โครง opinion essay 4–5 ย่อหน้า (≥ 300 คำ) และเกณฑ์ 0–5",
        "B: Part 7 จับเวลา ประมาณ 1 นาทีต่อข้อ"
      ]
    },
    {
      n: 15, type: "lesson",
      title: "Full Mock Test + Posttest",
      L: "Full Mock Test (Listening)",
      R: "Full Mock Test (Reading) + Posttest",
      book: "—", clo: [1, 2, 3, 4], assess: "Mock Test / Posttest",
      handout: [
        "ข้อสอบจำลองเต็มชุด",
        "ใบวิเคราะห์จุดอ่อนรายบุคคล",
        "แผนเตรียมสอบต่อด้วยตนเอง"
      ]
    },
    { n: 16, type: "exam", title: "สอบปลายภาค (Final)", L: "", R: "", book: "", clo: [1, 2, 3, 4], assess: "Final 25%", handout: [] }
  ],

  /* หน้าฝึก — ใส่ลิงก์ชุดฝึกเมื่อพร้อม (practice: [{ title, href }]) */
  sections: {
    listening: {
      title: "Listening", sub: "ฝึกฟังแยกตาม Part 1–4 พร้อมเสียง บทพูด และเฉลย",
      groups: [
        { name: "Part 1 Photographs", week: 2, practice: [] },
        { name: "Part 2 Question–Response", week: 3, practice: [] },
        { name: "Part 3 Conversations", week: 5, practice: [] },
        { name: "Part 4 Talks", week: 9, practice: [] }
      ]
    },
    reading: {
      title: "Reading & Grammar", sub: "ฝึกแยกตาม Part 5–7",
      groups: [
        { name: "Part 5 Incomplete Sentences", week: 2, practice: [] },
        { name: "Part 6 Text Completion", week: 6, practice: [] },
        { name: "Part 7 Single Passages", week: 7, practice: [] },
        { name: "Part 7 Multiple Passages", week: 11, practice: [] }
      ]
    },
    writing: {
      title: "Writing", sub: "โจทย์ ตัวอย่างคำตอบระดับ B1 และ rubric",
      groups: [
        { name: "Q1–5 Write a sentence based on a picture", week: 12, practice: [] },
        { name: "Q6–7 Respond to a written request", week: 13, practice: [] },
        { name: "Q8 Opinion essay", week: 14, practice: [] }
      ]
    },
    quizzes: {
      title: "Quizzes", sub: "แบบทดสอบย่อยรายสัปดาห์ (ทำผ่านลิงก์ที่อาจารย์แจ้งในชั้นเรียน)",
      groups: [
        { name: "Quiz 1 — Part 2 + Verb Tenses", week: 3, practice: [] },
        { name: "Quiz 2 — Part 3 + Verb Patterns", week: 5, practice: [] },
        { name: "Quiz 3 — Mini Mock (L 20 + R 20)", week: 7, practice: [] },
        { name: "Quiz 4 — Part 4 + Conditionals & Relative Clauses", week: 10, practice: [] }
      ]
    },
    mock: {
      title: "Mock Tests", sub: "ข้อสอบจำลอง TOEIC เต็มชุด — โหมดฝึกและโหมดสอบ",
      groups: [
        { name: "Mock Test 1", week: 15, practice: [] }
      ]
    },
    downloads: {
      title: "ดาวน์โหลด", sub: "หนังสือ (PDF) และเอกสารประกอบการสอน",
      groups: [
        { name: "หนังสือเทคนิคทำข้อสอบ — Grammar & Reading", week: null, practice: [] },
        { name: "หนังสือเทคนิคทำข้อสอบ — Listening", week: null, practice: [] },
        { name: "หนังสือเทคนิคทำข้อสอบ — Writing", week: null, practice: [] },
        { name: "Handout รายสัปดาห์", week: null, practice: [] }
      ]
    }
  }
};
