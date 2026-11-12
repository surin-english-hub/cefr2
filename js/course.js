/* ระบบแสดงผลหน้าเว็บรายวิชา — ข้อมูลทั้งหมดอยู่ใน js/course-data.js */
(function () {
  "use strict";
  var C = window.COURSE;
  var page = document.body.getAttribute("data-page");
  var DAY = 86400000;

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function $(sel) { return document.querySelector(sel); }
  function startOf(n) {
    var d = new Date(C.startDate + "T00:00:00+07:00");
    return new Date(d.getTime() + (n - 1) * 7 * DAY);
  }
  function thDate(d) {
    return d.toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "2-digit", timeZone: "Asia/Bangkok" });
  }
  function weekStatus(n) {
    var now = Date.now(), s = startOf(n).getTime();
    if (now < s) return "upcoming";
    if (now < s + 7 * DAY) return "current";
    return "past";
  }
  function currentWeek() {
    for (var i = 0; i < C.weeks.length; i++) {
      if (weekStatus(C.weeks[i].n) === "current") return C.weeks[i];
    }
    return null;
  }
  function cloTags(arr) {
    var h = "";
    for (var i = 0; i < arr.length; i++) h += '<span class="tag clo">CLO ' + arr[i] + "</span>";
    return h;
  }
  function statusTag(n) {
    var st = weekStatus(n);
    if (st === "current") return '<span class="tag now">สัปดาห์นี้</span>';
    if (st === "past") return '<span class="tag past">ผ่านแล้ว</span>';
    return "";
  }
  function weekByN(n) {
    for (var i = 0; i < C.weeks.length; i++) if (C.weeks[i].n === n) return C.weeks[i];
    return null;
  }

  /* ---------- header / footer ---------- */
  var NAV = [
    ["index.html", "หน้าแรก", "home"],
    ["plan.html", "แผนการเรียน", "plan"],
    ["listening.html", "Listening", "listening"],
    ["reading.html", "Reading & Grammar", "reading"],
    ["writing.html", "Writing", "writing"],
    ["quizzes.html", "Quizzes", "quizzes"],
    ["mock-tests.html", "Mock Tests", "mock"],
    ["downloads.html", "ดาวน์โหลด", "downloads"]
  ];
  function renderChrome() {
    var active = page === "section" ? document.body.getAttribute("data-section") : (page === "week" ? "plan" : page);
    var links = "";
    for (var i = 0; i < NAV.length; i++) {
      links += '<a href="' + NAV[i][0] + '"' + (NAV[i][2] === active ? ' aria-current="page"' : "") + ">" + NAV[i][1] + "</a>";
    }
    $("#site-header").innerHTML =
      '<div class="hubline"><div class="hubwrap"><a href="/">← Surin English Hub</a><span>RMUTI Surin Campus</span></div></div>' +
      '<div class="topbar">' +
        '<a href="index.html" class="brand"><span class="brand-mark" aria-hidden="true">C2</span>' +
        '<span class="brand-text"><b>' + esc(C.nick) + "</b><small>" + esc(C.code) + " · TOEIC Preparation</small></span></a>" +
        '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">เมนู</button>' +
      "</div>" +
      '<nav id="site-nav" class="nav">' + links + "</nav>";
    var btn = $(".menu-btn"), nav = $("#site-nav");
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $("#site-footer").innerHTML =
      '<span>' + esc(C.code) + " " + esc(C.titleEn) + "</span>" +
      '<span class="credit">Designed by ' + esc(C.designer) + "<br>" + esc(C.org) + "<br>© 2026</span>";
  }

  /* ---------- shared blocks ---------- */
  function weekRow(w) {
    var date = thDate(startOf(w.n));
    if (w.type === "exam") {
      return '<tr class="exam-row"><td class="wk">' + w.n + '</td><td class="dt">' + date +
        '</td><td colspan="3"><b>' + esc(w.title) + "</b></td><td>" + esc(w.assess) + "</td></tr>";
    }
    return '<tr' + (weekStatus(w.n) === "current" ? ' class="now-row"' : "") + '><td class="wk">' + w.n +
      '</td><td class="dt">' + date + "</td>" +
      '<td><a href="week.html?w=' + w.n + '">' + esc(w.L) + "</a></td>" +
      "<td>" + esc(w.R) + "</td>" +
      '<td class="nowrap">' + w.clo.join(", ") + "</td>" +
      "<td>" + esc(w.assess || "–") + "</td></tr>";
  }
  function scheduleTable() {
    var rows = "";
    for (var i = 0; i < C.weeks.length; i++) rows += weekRow(C.weeks[i]);
    return '<div class="table-wrap"><table class="sched"><thead><tr>' +
      '<th>ส.</th><th>วันที่</th><th>Listening</th><th>Grammar / Reading / Writing</th><th>CLO</th><th>ประเมิน</th>' +
      "</tr></thead><tbody>" + rows + "</tbody></table></div>";
  }
  function weekCard(w) {
    var date = thDate(startOf(w.n));
    if (w.type === "exam") {
      return '<article class="wcard exam" id="week-' + w.n + '"><div class="wnum">' + w.n + "</div>" +
        '<div class="wbody"><div class="wmeta">' + date + " " + statusTag(w.n) + "</div>" +
        "<h3>" + esc(w.title) + "</h3><p class=\"muted\">" + esc(w.assess) + " · วันสอบไม่มีการสอน</p></div></article>";
    }
    var outline = "";
    for (var i = 0; i < w.handout.length; i++) outline += "<li>" + esc(w.handout[i]) + "</li>";
    return '<article class="wcard" id="week-' + w.n + '"><div class="wnum">' + w.n + "</div>" +
      '<div class="wbody"><div class="wmeta">' + date + " " + statusTag(w.n) + (w.assess ? '<span class="tag due">' + esc(w.assess) + "</span>" : "") + "</div>" +
      '<h3><a href="week.html?w=' + w.n + '">' + esc(w.title) + "</a></h3>" +
      '<dl class="lr"><dt>L</dt><dd>' + esc(w.L) + "</dd><dt>R</dt><dd>" + esc(w.R) + "</dd></dl>" +
      '<div class="wfoot">' + cloTags(w.clo) + (w.book && w.book !== "—" ? '<span class="tag book">📖 ' + esc(w.book) + "</span>" : "") + "</div>" +
      '<details><summary>โครง handout</summary><ol>' + outline + "</ol></details>" +
      "</div></article>";
  }

  /* ---------- placement test card ---------- */
  function placementCard() {
    var P = C.placement;
    if (!P || !P.url) return "";
    var steps = "";
    for (var i = 0; i < P.steps.length; i++) steps += "<li>" + esc(P.steps[i]) + "</li>";
    return '<section class="card pt-card"><div class="pt-head"><div><span class="pill">แบบทดสอบวัดระดับ</span>' +
      "<h3>Placement Test</h3><p class=\"muted small\">" + esc(P.when) + " · 60 ข้อ</p></div>" +
      '<a class="btn primary" href="' + esc(P.url) + '" target="_blank" rel="noopener">เข้าห้องสอบ ↗</a></div>' +
      '<ol class="pt-steps">' + steps + "</ol>" +
      '<p class="muted small">ห้องสอบเปิดเฉพาะเวลาที่อาจารย์กำหนด ถ้าขึ้นว่าปิดอยู่ ให้รอสัญญาณจากอาจารย์</p></section>';
  }
  function placementWeek(n) {
    return C.placement && C.placement.weeks.indexOf(n) > -1;
  }

  /* ---------- pages ---------- */
  function renderHome() {
    var cw = currentWeek();
    var cwHtml = cw
      ? '<a class="card now-card" href="' + (cw.type === "exam" ? "plan.html#week-" + cw.n : "week.html?w=" + cw.n) + '">' +
        '<span class="pill">สัปดาห์ที่ ' + cw.n + " · " + thDate(startOf(cw.n)) + "</span>" +
        "<h3>" + esc(cw.title) + "</h3>" +
        (cw.type === "exam" ? "" : '<p class="muted">L: ' + esc(cw.L) + "<br>R: " + esc(cw.R) + "</p>") +
        '<span class="go">ไปที่บทเรียน →</span></a>'
      : '<a class="card now-card" href="plan.html"><h3>ดูแผนการเรียนทั้งเทอม</h3><span class="go">แผนการเรียน →</span></a>';

    var clos = "";
    for (var i = 0; i < C.clos.length; i++) clos += '<li><span class="clo-n">CLO ' + (i + 1) + "</span>" + esc(C.clos[i]) + "</li>";

    var assess = "";
    for (var a = 0; a < C.assessment.length; a++) {
      var it = C.assessment[a];
      assess += '<div class="bar-row"><div class="bar-label"><b>' + esc(it.item) + "</b><span>" + esc(it.note) +
        '</span></div><div class="bar"><span style="width:' + it.pct + '%"></span></div><div class="bar-pct">' + it.pct + "%</div></div>";
    }

    var b1 = "";
    for (var b = 0; b < C.b1.length; b++) {
      b1 += '<div class="b1"><span>' + C.b1[b].skill + "</span><b>" + C.b1[b].score + "</b><small>จาก " + C.b1[b].max + "</small></div>";
    }

    function partList(arr, key) {
      var h = "";
      for (var k = 0; k < arr.length; k++) {
        h += "<li><b>" + (key === "q" ? "Q" + arr[k].q : "Part " + arr[k].part) + "</b> " + esc(arr[k].name) +
          (arr[k].n ? ' <span class="muted">' + arr[k].n + " ข้อ</span>" : "") + "</li>";
      }
      return h;
    }

    var tiles = [
      ["listening.html", "🎧", "Listening", "Part 1–4"],
      ["reading.html", "📘", "Reading & Grammar", "Part 5–7"],
      ["writing.html", "✍️", "Writing", "Q1–8"],
      ["quizzes.html", "📝", "Quizzes", "แบบทดสอบย่อย"],
      ["mock-tests.html", "⏱️", "Mock Tests", "ข้อสอบจำลอง"],
      ["downloads.html", "📥", "ดาวน์โหลด", "หนังสือ / เอกสาร"]
    ];
    var tileHtml = "";
    for (var t = 0; t < tiles.length; t++) {
      tileHtml += '<a class="tile" href="' + tiles[t][0] + '"><span class="ico" aria-hidden="true">' + tiles[t][1] +
        "</span><b>" + tiles[t][2] + "</b><small>" + tiles[t][3] + "</small></a>";
    }

    $("#app").innerHTML =
      '<section class="hero">' +
        '<p class="eyebrow">' + esc(C.nick) + " · " + esc(C.code) + " · " + esc(C.credits) + " · " + esc(C.semester) + "</p>" +
        "<h1>" + esc(C.titleTh) + "</h1>" +
        '<p class="en">' + esc(C.titleEn) + "</p>" +
        '<p class="lead">เป้าหมาย: <b>CEFR B1</b> ด้วยข้อสอบ TOEIC</p>' +
      "</section>" +
      '<section class="grid-2">' + cwHtml +
        '<a class="card plan-card" href="plan.html"><span class="pill">16 สัปดาห์</span><h3>สารบัญแผนการเรียน</h3>' +
        '<p class="muted">หัวข้อรายสัปดาห์ โครง handout บทในหนังสือ และกำหนดส่งงาน</p><span class="go">เปิดแผนการเรียน →</span></a>' +
      "</section>" +
      (C.placement && C.placement.show ? placementCard() : "") +
      '<section class="tiles">' + tileHtml + "</section>" +

      '<section class="block"><h2>เกี่ยวกับรายวิชา</h2><p>' + esc(C.description) + '</p><p class="muted small">' + esc(C.hours) + "</p></section>" +
      '<section class="block"><h2>ผลลัพธ์การเรียนรู้ (CLOs)</h2><ol class="clos">' + clos + "</ol></section>" +

      '<section class="block"><h2>รูปแบบข้อสอบ TOEIC</h2><div class="grid-3">' +
        '<div class="card"><h3>Listening <span class="muted small">100 ข้อ · ~45 นาที</span></h3><ul class="parts">' + partList(C.toeic.listening) + "</ul></div>" +
        '<div class="card"><h3>Reading <span class="muted small">100 ข้อ · 75 นาที</span></h3><ul class="parts">' + partList(C.toeic.reading) + "</ul></div>" +
        '<div class="card"><h3>Writing <span class="muted small">8 ข้อ · ~60 นาที</span></h3><ul class="parts">' + partList(C.toeic.writing, "q") + "</ul></div>" +
      "</div></section>" +

      '<section class="block"><h2>เกณฑ์คะแนน TOEIC ระดับ B1</h2><div class="b1-row">' + b1 + "</div>" +
        '<p class="muted small">อ้างอิงการเทียบคะแนน TOEIC กับ CEFR ของ ETS</p></section>' +

      '<section class="block"><h2>ตารางเรียน 16 สัปดาห์</h2>' + scheduleTable() +
        '<p class="muted small">วันที่อาจเปลี่ยนตามปฏิทินมหาวิทยาลัย · <a href="plan.html">ดูรายละเอียดแต่ละสัปดาห์</a></p></section>' +

      '<section class="block"><h2>การวัดและประเมินผล</h2><div class="card">' + assess + "</div></section>";
  }

  function renderPlan() {
    var first = "", second = "";
    for (var i = 0; i < C.weeks.length; i++) {
      var w = C.weeks[i];
      if (w.n <= 8) first += weekCard(w); else second += weekCard(w);
    }
    var toc = "";
    for (var j = 0; j < C.weeks.length; j++) {
      var x = C.weeks[j];
      toc += '<a href="#week-' + x.n + '" class="toc-item' + (x.type === "exam" ? " exam" : "") +
        (weekStatus(x.n) === "current" ? " now" : "") + '"><span>' + x.n + "</span>" + esc(x.type === "exam" ? x.title : x.title) + "</a>";
    }
    $("#app").innerHTML =
      '<section class="hero small-hero"><p class="eyebrow">' + esc(C.code) + "</p><h1>สารบัญแผนการเรียน</h1>" +
      '<p class="lead">ทุกสัปดาห์เรียนคู่กัน 2 ส่วน: <b>L</b> = Listening และ <b>R</b> = Grammar / Reading / Writing</p></section>' +
      '<nav class="toc" aria-label="สารบัญรายสัปดาห์">' + toc + "</nav>" +
      '<h2 class="half">ครึ่งแรก · สัปดาห์ 1–8</h2><div class="wlist">' + first + "</div>" +
      '<h2 class="half">ครึ่งหลัง · สัปดาห์ 9–16</h2><div class="wlist">' + second + "</div>";
    if (location.hash) {
      var el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView();
    }
  }

  function renderWeek() {
    var n = parseInt(new URLSearchParams(location.search).get("w"), 10);
    var w = weekByN(n);
    if (!w) { location.replace("plan.html"); return; }
    document.title = "สัปดาห์ที่ " + w.n + " · " + C.nick + " · Surin English Hub";
    var prev = weekByN(n - 1), next = weekByN(n + 1);
    function navLink(x, label) {
      if (!x) return "<span></span>";
      var href = x.type === "exam" ? "plan.html#week-" + x.n : "week.html?w=" + x.n;
      return '<a class="btn" href="' + href + '">' + label + " สัปดาห์ " + x.n + "</a>";
    }
    var outline = "";
    for (var i = 0; i < w.handout.length; i++) outline += "<li>" + esc(w.handout[i]) + "</li>";
    var L = w.links || {};
    function mat(key, ico, name) {
      return L[key]
        ? '<a class="mat ready" href="' + esc(L[key]) + '"><span aria-hidden="true">' + ico + "</span>" + name + "</a>"
        : '<div class="mat"><span aria-hidden="true">' + ico + "</span>" + name + '<small>กำลังจัดทำ</small></div>';
    }
    $("#app").innerHTML =
      '<p class="crumb"><a href="plan.html">แผนการเรียน</a> › สัปดาห์ที่ ' + w.n + "</p>" +
      '<section class="hero small-hero"><p class="eyebrow">สัปดาห์ที่ ' + w.n + " · " + thDate(startOf(w.n)) + " " + statusTag(w.n) + "</p>" +
      "<h1>" + esc(w.title) + "</h1><div class=\"wfoot\">" + cloTags(w.clo) +
      (w.book && w.book !== "—" ? '<span class="tag book">📖 ' + esc(w.book) + "</span>" : "") +
      (w.assess ? '<span class="tag due">' + esc(w.assess) + "</span>" : "") + "</div></section>" +
      (w.type === "exam" ? "" :
      '<section class="grid-2">' +
        '<div class="card"><span class="pill">L · Listening</span><p>' + esc(w.L) + "</p></div>" +
        '<div class="card"><span class="pill">R · Grammar / Reading / Writing</span><p>' + esc(w.R) + "</p></div>" +
      "</section>" +
      (placementWeek(w.n) ? placementCard() : "") +
      '<section class="block"><h2>สื่อประจำสัปดาห์</h2><div class="mats">' +
        mat("handout", "📄", "Handout") + mat("slides", "🖥️", "สไลด์") + mat("worksheet", "📝", "ใบงาน") + mat("practice", "🎧", "ฝึกบนเว็บ") +
      "</div></section>" +
      '<section class="block"><h2>หัวข้อที่เรียน</h2><ol class="outline">' + outline + "</ol></section>") +
      '<div class="pager">' + navLink(prev, "←") + navLink(next, "") + "</div>";
    var nx = $(".pager a:last-child");
    if (nx && next) nx.textContent = "สัปดาห์ " + next.n + " →";
  }

  function renderSection() {
    var key = document.body.getAttribute("data-section");
    var s = C.sections[key];
    var groups = "";
    for (var i = 0; i < s.groups.length; i++) {
      var g = s.groups[i], items = "";
      for (var k = 0; k < g.practice.length; k++) {
        items += '<li><a href="' + esc(g.practice[k].href) + '">' + esc(g.practice[k].title) + "</a></li>";
      }
      var wk = g.week ? weekByN(g.week) : null;
      groups += '<div class="card group"><div class="group-head"><h3>' + esc(g.name) + "</h3>" +
        (wk ? '<a class="tag" href="week.html?w=' + wk.n + '">สัปดาห์ ' + wk.n + "</a>" : "") + "</div>" +
        (items ? '<ul class="practice">' + items + "</ul>" : '<p class="muted small">กำลังจัดทำ</p>') + "</div>";
    }
    var note = (key === "listening" || key === "reading" || key === "mock")
      ? '<div class="card modes"><div><b>โหมดฝึก</b><p class="muted small">เห็นคำถามและตัวเลือก ฟังซ้ำได้ไม่จำกัด เฉลยทันที</p></div>' +
        '<div><b>โหมดสอบ</b><p class="muted small">จับเวลา ฟังอย่างเดียวเหมือนข้อสอบจริง เฉลยหลังส่ง</p></div></div>'
      : "";
    $("#app").innerHTML =
      '<section class="hero small-hero"><p class="eyebrow">' + esc(C.code) + "</p><h1>" + esc(s.title) + "</h1>" +
      '<p class="lead">' + esc(s.sub) + "</p></section>" + (key === "quizzes" ? placementCard() : "") + note + '<div class="groups">' + groups + "</div>";
  }

  renderChrome();
  if (page === "home") renderHome();
  else if (page === "plan") renderPlan();
  else if (page === "week") renderWeek();
  else if (page === "section") renderSection();
})();
