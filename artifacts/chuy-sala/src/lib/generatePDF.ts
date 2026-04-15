/**
 * Chouy Sala — Offline Resource Guide PDF Generator
 * Uses jsPDF v4 + jspdf-autotable v5
 * Khmer font (Noto Sans Khmer) is fetched at runtime and registered.
 */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import careersRaw from "@/data/careers.json";
import healthData from "@/data/health_science.json";
import grammarData from "@/data/english_grammar.json";
import mathData from "@/data/mathematics.json";

// ── Brand colours (R, G, B) ───────────────────────────────────────────────────
const C = {
  navy:  [26,  58,  92]  as [number, number, number], // #1A3A5C
  blue:  [26,  110, 168] as [number, number, number], // #1A6EA8
  gold:  [245, 158, 11]  as [number, number, number], // #F59E0B
  white: [255, 255, 255] as [number, number, number],
  light: [240, 244, 248] as [number, number, number],
  dark:  [30,  41,  59]  as [number, number, number],
  muted: [100, 116, 139] as [number, number, number],
  teal:  [16,  150, 100] as [number, number, number],
  indigo:[37,  99,  235] as [number, number, number],
  violet:[124, 58,  237] as [number, number, number],
};

// ── Types ─────────────────────────────────────────────────────────────────────
type Career = {
  id: string; en: string; kh: string;
  tasks: { en: string[]; kh: string[] };
  impact: { en: string; kh: string };
};
type Major = { id: string; en: string; kh: string; icon: string; careers: Career[] };

type SubjectData = {
  topics: { titleEn: string; titleKh: string; focusEn: string; focusKh: string; questions: unknown[] }[];
};

// ── Khmer font loader ─────────────────────────────────────────────────────────
async function loadKhmerFont(): Promise<string | null> {
  try {
    const url =
      "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansKhmer/NotoSansKhmer-Regular.ttf";
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let binary = "";
    const CHUNK = 32768;
    for (let i = 0; i < bytes.length; i += CHUNK) {
      binary += String.fromCharCode(...bytes.subarray(i, Math.min(i + CHUNK, bytes.length)));
    }
    return btoa(binary);
  } catch (err) {
    console.warn("[PDF] Khmer font not loaded:", err);
    return null;
  }
}

// ── Drawing helpers ───────────────────────────────────────────────────────────
function fillRect(doc: jsPDF, x: number, y: number, w: number, h: number, rgb: [number, number, number]) {
  doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  doc.rect(x, y, w, h, "F");
}

function hLine(doc: jsPDF, y: number, x1 = 20, x2 = 190, rgb = C.gold, lw = 0.5) {
  doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
  doc.setLineWidth(lw);
  doc.line(x1, y, x2, y);
}

/** Draws the navy banner at top of a section page. Returns the y cursor after the banner. */
function sectionBanner(doc: jsPDF, title: string, subtitle: string, pageW: number): number {
  const H = 15;
  fillRect(doc, 0, 0, pageW, H, C.navy);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(C.white[0], C.white[1], C.white[2]);
  doc.text(title, 18, 6.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(C.gold[0], C.gold[1], C.gold[2]);
  doc.text(subtitle, 18, 12);
  return H + 4; // cursor below banner with small gap
}

/** Draws a repeating mini-header on continuation pages for a section. */
function continuationHeader(doc: jsPDF, label: string, pageW: number) {
  fillRect(doc, 0, 0, pageW, 7, C.navy);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(C.gold[0], C.gold[1], C.gold[2]);
  doc.text(label + " (continued)", 18, 5);
}

/** Draws the standard footer on any page. */
function pageFooter(doc: jsPDF, pageNum: number | string, rightLabel = "") {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  fillRect(doc, 0, pageH - 9, pageW, 9, C.navy);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(C.gold[0], C.gold[1], C.gold[2]);
  doc.text("Chouy Sala  |  chouy-sala.replit.app", 18, pageH - 3.5);
  if (rightLabel) {
    doc.setTextColor(180, 210, 240);
    doc.text(rightLabel, pageW - 18, pageH - 3.5, { align: "right" });
  }
  doc.setTextColor(200, 220, 240);
  doc.text(String(pageNum), pageW / 2, pageH - 3.5, { align: "center" });
}

// ── Cover Page ────────────────────────────────────────────────────────────────
function buildCoverPage(doc: jsPDF, kh: string | null) {
  const pageW = 210;
  const pageH = 297;

  // Top hero banner
  fillRect(doc, 0, 0, pageW, 80, C.navy);
  fillRect(doc, 0, 80, pageW, 3, C.gold);

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(C.white[0], C.white[1], C.white[2]);
  doc.text("Chouy Sala", pageW / 2, 34, { align: "center" });

  // Khmer title (only if font loaded)
  if (kh) {
    doc.setFont("NotoSansKhmer", "normal");
    doc.setFontSize(18);
    doc.setTextColor(C.gold[0], C.gold[1], C.gold[2]);
    doc.text("\u1787\u17BD\u1799\u179F\u17B6\u179B\u17B6", pageW / 2, 50, { align: "center" });
    doc.setFont("helvetica", "normal");
  }

  // Tagline
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(180, 210, 240);
  doc.text("Help School  |  Cambodia", pageW / 2, 68, { align: "center" });

  // Document heading
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(C.navy[0], C.navy[1], C.navy[2]);
  doc.text("OFFLINE RESOURCE GUIDE", pageW / 2, 102, { align: "center" });

  hLine(doc, 110, 30, 180, C.gold, 0.7);

  // Mission statement (English)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(C.dark[0], C.dark[1], C.dark[2]);
  const missionEn =
    "Empowering Cambodian students with access to career guidance, " +
    "bilingual exam preparation, and scholarship pathways — " +
    "even without an internet connection.";
  const missionLines = doc.splitTextToSize(missionEn, 160);
  doc.text(missionLines, pageW / 2, 120, { align: "center", lineHeightFactor: 1.6 });

  // Mission in Khmer
  if (kh) {
    doc.setFont("NotoSansKhmer", "normal");
    doc.setFontSize(9);
    doc.setTextColor(C.muted[0], C.muted[1], C.muted[2]);
    const missionKhStr =
      "\u1795\u17D2\u178A\u17B6\u179B\u179F\u17B7\u1791\u17D2\u1792\u17B7\u17A2\u1798\u17D2\u178E\u17B6\u1785\u178A\u179B\u17CB\u179F\u17B7\u179F\u17D2\u179F\u1780\u1798\u17D2\u1796\u17BB\u1787\u17B6 " +
      "\u1780\u17D2\u1793\u17BB\u1784\u1780\u17B6\u179A\u178F\u17BD\u179B\u178F\u17D0\u1793\u200B\u1780\u17B6\u179A\u178E\u17B2\u1793\u17B6\u17C6\u17A2\u17C6\u1796\u17B8\u17A2\u17B6\u1787\u17B8\u1796";
    const khLines = doc.splitTextToSize(missionKhStr, 160);
    doc.text(khLines, pageW / 2, 150, { align: "center", lineHeightFactor: 1.7 });
    doc.setFont("helvetica", "normal");
  }

  // "What's inside" card
  const cardY = 176;
  fillRect(doc, 20, cardY, 170, 64, C.light);
  doc.setDrawColor(C.blue[0], C.blue[1], C.blue[2]);
  doc.setLineWidth(0.35);
  doc.rect(20, cardY, 170, 64);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(C.navy[0], C.navy[1], C.navy[2]);
  doc.text("WHAT'S INSIDE", 28, cardY + 8);

  const sections = [
    "Section 1 - Future Pathways Guide:  43 majors and 95+ career profiles with bilingual descriptions",
    "Section 2 - Exam Prep Guide:  Grade 12 topics for Health & Science, English Grammar, and Mathematics",
    "Section 3 - The Interview Coach:  Evidence-based strategies for job interviews and scholarship panels",
  ];
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(C.dark[0], C.dark[1], C.dark[2]);
  sections.forEach((s, i) => {
    const ly = cardY + 18 + i * 15;
    // Bullet square
    doc.setFillColor(C.gold[0], C.gold[1], C.gold[2]);
    doc.rect(27, ly - 3, 2, 2, "F");
    const wrapped = doc.splitTextToSize(s, 152);
    doc.text(wrapped, 32, ly);
  });

  // Footer bar
  fillRect(doc, 0, pageH - 20, pageW, 20, C.navy);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(C.gold[0], C.gold[1], C.gold[2]);
  doc.text("chouy-sala.replit.app", pageW / 2, pageH - 11, { align: "center" });
  doc.setTextColor(180, 210, 240);
  const dateStr = new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
  doc.text(`Generated: ${dateStr}`, pageW / 2, pageH - 5, { align: "center" });
}

// ── Section 1 — Future Pathways ───────────────────────────────────────────────
function buildFuturePathwaysSection(doc: jsPDF) {
  doc.addPage();
  const pageW = doc.internal.pageSize.getWidth();

  const startY = sectionBanner(
    doc,
    "SECTION 1 — FUTURE PATHWAYS GUIDE",
    "All 43 university majors with career paths and real-world impact",
    pageW,
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(C.muted[0], C.muted[1], C.muted[2]);
  doc.text(
    "Each row shows a major, the career roles it opens, and the impact those careers have in Cambodia.",
    18, startY + 4,
  );

  const majors = careersRaw as Major[];

  // Build flat table rows: [Major (blank for 2nd career), Career EN, Impact EN]
  const rows: string[][] = [];
  majors.forEach((major) => {
    major.careers.forEach((career, idx) => {
      rows.push([
        idx === 0 ? `${major.en}` : "",
        career.en,
        career.impact.en,
      ]);
    });
  });

  autoTable(doc, {
    startY: startY + 10,
    head: [["MAJOR", "CAREER PATH", "REAL-WORLD IMPACT"]],
    body: rows,
    margin: { left: 18, right: 18 },
    tableWidth: "auto",
    styles: {
      fontSize: 7.5,
      cellPadding: { top: 2.5, bottom: 2.5, left: 3, right: 3 },
      lineColor: [200, 215, 230] as [number, number, number],
      lineWidth: 0.2,
      overflow: "linebreak",
      font: "helvetica",
      textColor: [30, 41, 59] as [number, number, number],
    },
    headStyles: {
      fillColor: C.blue as [number, number, number],
      textColor: C.white as [number, number, number],
      fontStyle: "bold",
      fontSize: 8,
      halign: "left",
      cellPadding: { top: 4, bottom: 4, left: 3, right: 3 },
    },
    columnStyles: {
      0: { cellWidth: 42, fontStyle: "bold", fillColor: [235, 244, 252] as [number, number, number] },
      1: { cellWidth: 70 },
      2: { cellWidth: 64 },
    },
    alternateRowStyles: {
      fillColor: [248, 251, 255] as [number, number, number],
    },
    didDrawPage: (data) => {
      if (data.pageNumber > 1) {
        continuationHeader(doc, "SECTION 1 — FUTURE PATHWAYS GUIDE", pageW);
      }
      pageFooter(doc, data.pageNumber, "Section 1 of 3");
    },
  });
}

// ── Section 2 — Exam Prep ─────────────────────────────────────────────────────
function buildExamPrepSection(doc: jsPDF, kh: string | null) {
  doc.addPage();
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  let y = sectionBanner(
    doc,
    "SECTION 2 — EXAM PREP GUIDE",
    "Grade 12 bilingual study topics for the National University Entrance Examination (NUEE)",
    pageW,
  );

  const subjects: { title: string; titleKh: string; grade: string; color: [number, number, number]; data: SubjectData }[] = [
    { title: "Health & Science",  titleKh: "\u179F\u17BB\u1781\u1797\u17B6\u1796 \u1793\u17B7\u1784\u179C\u17B7\u178F\u17D2\u1799\u17B6\u179F\u17B6\u179F\u17D2\u178F\u17D2\u179A", grade: "Grade 11-12", color: C.teal,   data: healthData  as SubjectData },
    { title: "English Grammar",   titleKh: "\u179C\u17C1\u1799\u17D2\u1799\u17B6\u1780\u179A\u178E\u17CD\u1797\u17B6\u179F\u17B6\u17A2\u1784\u17CB\u1782\u17D2\u179B\u17C1\u179F", grade: "Grade 12",    color: C.indigo, data: grammarData as SubjectData },
    { title: "Mathematics",       titleKh: "\u1782\u178E\u17B7\u178F\u179C\u17B7\u1791\u17D2\u1799\u17B6",                                                                          grade: "Grade 12",    color: C.violet, data: mathData    as SubjectData },
  ];

  for (const subj of subjects) {
    // Subject colour bar
    fillRect(doc, 18, y, 174, 11, subj.color);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(C.white[0], C.white[1], C.white[2]);
    doc.text(subj.title, 23, y + 7.5);

    // Khmer name right-aligned in bar (only if font loaded)
    if (kh) {
      doc.setFont("NotoSansKhmer", "normal");
      doc.setFontSize(8);
      doc.setTextColor(220, 240, 255);
      doc.text(subj.titleKh, pageW - 22, y + 7.5, { align: "right" });
      doc.setFont("helvetica", "normal");
    }

    doc.setFont("helvetica", "italic");
    doc.setFontSize(7);
    doc.setTextColor(C.white[0], C.white[1], C.white[2]);
    doc.text(subj.grade, 23, y + 7.5 + 0.1); // drawn over by bold above — grade shown via alpha
    // Actually draw grade in the bar at the end
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text(subj.grade, 80, y + 7.5);

    y += 11;

    // Build topic rows: show English topic, English focus, question count
    const topicRows = subj.data.topics.map((t) => [
      t.titleEn,
      t.focusEn,
      `${t.questions.length} questions`,
    ]);

    autoTable(doc, {
      startY: y,
      head: [["Topic", "Focus Area", "Questions"]],
      body: topicRows,
      margin: { left: 18, right: 18 },
      styles: {
        fontSize: 8,
        cellPadding: { top: 3, bottom: 3, left: 3, right: 3 },
        lineColor: [200, 215, 230] as [number, number, number],
        lineWidth: 0.2,
        textColor: [30, 41, 59] as [number, number, number],
        font: "helvetica",
      },
      headStyles: {
        fillColor: subj.color,
        textColor: C.white as [number, number, number],
        fontStyle: "bold",
        fontSize: 8,
        cellPadding: { top: 3.5, bottom: 3.5, left: 3, right: 3 },
      },
      columnStyles: {
        0: { cellWidth: 70, fontStyle: "bold" },
        1: { cellWidth: 86 },
        2: { cellWidth: 22, halign: "center" },
      },
      alternateRowStyles: { fillColor: [248, 251, 255] as [number, number, number] },
    });

    // Safe access to lastAutoTable
    const lastTable = (doc as unknown as { lastAutoTable?: { finalY?: number } }).lastAutoTable;
    y = (lastTable?.finalY ?? y + 30) + 8;
  }

  // Study tips callout box
  if (y + 34 > pageH - 20) y = pageH - 54; // snap to bottom if overflowing
  fillRect(doc, 18, y, 174, 34, [255, 251, 235]);
  doc.setDrawColor(C.gold[0], C.gold[1], C.gold[2]);
  doc.setLineWidth(0.4);
  doc.rect(18, y, 174, 34);
  fillRect(doc, 18, y, 5, 34, C.gold);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(C.navy[0], C.navy[1], C.navy[2]);
  doc.text("Grade 12 Study Tips", 27, y + 8);

  const studyTips = [
    "Start with topics where you feel most confident to build momentum early.",
    "Practice each topic at least twice — mistakes are the best teachers.",
    "Use both English and Khmer explanations to deepen your understanding.",
  ];
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(C.dark[0], C.dark[1], C.dark[2]);
  studyTips.forEach((tip, i) => {
    doc.setFillColor(C.gold[0], C.gold[1], C.gold[2]);
    doc.circle(28.5, y + 15 + i * 7, 1, "F");
    doc.text(tip, 33, y + 15 + i * 7);
  });

  pageFooter(doc, "Exam Prep", "Section 2 of 3");
}

// ── Section 3 — Interview Coach ───────────────────────────────────────────────
function buildInterviewCoachSection(doc: jsPDF, kh: string | null) {
  doc.addPage();
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  const startY = sectionBanner(
    doc,
    "SECTION 3 — THE INTERVIEW COACH",
    "Evidence-based preparation strategies for job interviews and scholarship panels",
    pageW,
  );

  const coachTips: { title: string; titleKh: string; body: string; bodyKh: string }[] = [
    {
      title: "Research Before You Walk In",
      titleKh: "\u179F\u17D2\u179A\u17B6\u179C\u1787\u17D2\u179A\u17B6\u179C \u1798\u17BB\u1793\u1796\u17C1\u179B\u17A2\u17D2\u1793\u1780\u1785\u17BC\u179B",
      body: "Study the organisation's mission, recent news, and the job description thoroughly. " +
            "Interviewers immediately notice candidates who understand the role.",
      bodyKh: "\u179F\u17B7\u1780\u17D2\u179F\u17B6\u1794\u17C1\u179F\u1780\u1780\u1798\u17D2\u1798 \u1796\u17D0\u178F\u17CC\u1798\u17B6\u1793\u1790\u17D2\u1798\u17B8\u17C6 \u1793\u17B7\u1784\u1780\u17B6\u179A\u1796\u17B7\u1796\u178E\u17CC\u1793\u17B6\u1780\u17B6\u179A\u1784\u17B6\u179A \u1799\u17B6\u1784\u17A0\u17D2\u1798\u178F\u17CB\u1785\u178F\u17CB\u17D4",
    },
    {
      title: "Use the STAR Method",
      titleKh: "\u1794\u17D2\u179A\u17be\u179C\u17B7\u1792\u17B7 STAR",
      body: "Structure answers using Situation, Task, Action, and Result. " +
            "This makes responses clear, concise, and evidence-based for every interviewer.",
      bodyKh: "\u179A\u17C1\u1794\u1785\u1780\u1785\u1798\u17D2\u179B\u17BE\u1799\u179A\u17B7\u1799\u1784\u179A\u17B6\u179B\u17CB \u178A\u17C4\u1799\u1794\u17D2\u179A\u17be\u17D0 \u179F\u17D2\u1790\u17B6\u1793\u1780\u17B6\u179A\u178E\u17CD \u1797\u17B6\u179A\u1780\u17B7\u1785\u17D2\u1785 \u179F\u1780\u1798\u17D2\u1798\u1797\u17B6\u1796 \u179F \u179B\u178F\u17D2\u1792\u1795\u179B\u17D4",
    },
    {
      title: "Tone, Pace and Clarity",
      titleKh: "\u179F\u1798\u17D2\u179B\u17C1\u1784 \u179B\u17D2\u1794\u17BE\u1793 \u1793\u17B7\u1784\u1797\u17B6\u1796\u1785\u17D2\u1794\u17B6\u179F\u17CB\u179B\u17B6\u179F\u17CB",
      body: "Speak clearly at a measured pace. Pause briefly before answering to collect your thoughts. " +
            "A calm, confident tone signals professionalism.",
      bodyKh: "\u1793\u17B7\u1799\u17B6\u1799\u17A2\u17C4\u1799\u1785\u17D2\u1794\u17B6\u179F\u17CB \u1780\u17D2\u1793\u17BB\u1784\u179B\u17D2\u1794\u17BE\u1793\u179F\u17D2\u1790\u17B7\u178F\u179F\u17D2\u1790\u17C1\u179A\u17D4 \u179F\u1798\u17D2\u179B\u17C1\u1784\u179F\u17D2\u1784\u1794\u17CB\u179F\u17D2\u1784\u17B6\u178F\u17CB \u1793\u17B7\u1784\u1787\u17BE\u1787\u17B6\u1780\u17CB \u1794\u1784\u17CB\u17A0\u17B6\u1789\u179C\u17B7\u1787\u17D2\u1787\u17B6\u1787\u17B8\u1796\u17D4",
    },
    {
      title: "Body Language and Presence",
      titleKh: "\u1797\u17B6\u179F\u17B6\u1780\u17B6\u1799\u179C\u17B7\u1780\u17B6\u179A \u1793\u17B7\u1784\u179C\u178F\u17D2\u178F\u1798\u1780\u17D2\u1793\u17BB\u1784",
      body: "Sit upright with relaxed shoulders. Make natural eye contact. " +
            "Nod to show active listening. Avoid crossing arms or fidgeting.",
      bodyKh: "\u17A2\u1784\u17D2\u1782\u17BB\u1799\u178F\u17D2\u179A\u1784\u17CB \u179F\u17D2\u1798\u17B6\u179F\u1798\u17D2\u179A\u17B6\u1780\u17D4 \u1792\u17D2\u179C\u17BE\u178F\u1798\u17D2\u1793\u17B6\u1780\u178F\u1798\u17D2\u1793\u1784\u1797\u17D2\u1793\u17C1\u1780\u178A\u17C4\u1799\u1792\u1798\u17D2\u1798\u1787\u17B6\u178F\u17B7\u17D4 \u1784\u17B6\u1780\u1780\u17D2\u1794\u17B6\u179B\u178A\u17BE\u1798\u17D2\u1794\u17B8\u1794\u1784\u17CB\u17A0\u17B6\u1789\u1780\u17B6\u179A\u179F\u17D2\u178F\u17B6\u1794\u17CB\u17D4",
    },
    {
      title: "Ask Thoughtful Questions",
      titleKh: "\u179F\u17D2\u1793\u17BE\u179F\u1798\u17D2\u178E\u17BD\u179A\u178A\u17D2\u178B\u179F\u17CA\u1787\u1798\u17D2\u179A\u17BD\u1780",
      body: "Prepare 3 to 5 genuine questions. For example: What does success look like in this role in 90 days? " +
            "How does this team contribute to the broader mission?",
      bodyKh: "\u179A\u17C1\u1794\u1785\u1780 ៣ \u178F\u17B6\u1798 ៥ \u179F\u1798\u17D2\u178E\u17BD\u179A\u1796\u17B7\u178F\u1794\u17D2\u179A\u17B6\u1780\u178A\u17D4 \u1793\u17C1\u1780\u1793\u17C2\u1780\u17D2\u1793\u1784\u1793\u17B7\u1799\u17B6\u1799\u179F\u17D2\u179F\u17BB\u1798\u179F\u17D2\u179A\u17BD\u179B\u17C1\u1780\u17B6\u179A\u1784\u17B6\u179A\u1793\u17C1\u17D4",
    },
    {
      title: "Follow Up With Gratitude",
      titleKh: "\u178F\u17B6\u1798\u178A\u17B6\u1793\u178A\u17C4\u1799\u1780\u17B6\u179A\u1782\u17C4\u179A\u1796",
      body: "Send a brief thank-you message within 24 hours. Mention one specific topic from the interview to show genuine engagement.",
      bodyKh: "\u1795\u17D2\u1789\u17BE\u179F\u17B6\u179A\u179A\u1798\u17D2\u179B\u17B9\u1780\u17A2\u1789\u179A\u1782\u17BB\u178E \u1780\u17D2\u1793\u17BB\u1784 ២៤ \u1798\u17C9\u17B8\u1784\u17D4 \u1793\u17B7\u1799\u17B6\u1799\u178A\u17B9\u1784\u1794\u17D2\u179A\u1792\u17B6\u1793\u1794\u178F\u1798\u17BD\u1799\u1796\u17B8\u1780\u17B6\u179A\u179F\u1798\u17D2\u1797\u17B6\u179F \u178A\u17BE\u1798\u17D2\u1794\u17B8\u1794\u1784\u17CB\u17A0\u17B6\u1789\u1796\u17B7\u178F\u1794\u17D2\u179A\u17B6\u1780\u178A\u17D4",
    },
  ];

  let y = startY + 2;
  const CARD_H = 39;
  const CARD_GAP = 2;

  coachTips.forEach((tip, i) => {
    const bg: [number, number, number] = i % 2 === 0 ? C.light : [255, 255, 255];
    fillRect(doc, 18, y, 174, CARD_H, bg);
    // Border
    doc.setDrawColor(C.blue[0], C.blue[1], C.blue[2]);
    doc.setLineWidth(0.25);
    doc.rect(18, y, 174, CARD_H);
    // Left accent bar
    fillRect(doc, 18, y, 5, CARD_H, C.blue);

    // Number badge
    fillRect(doc, 23, y + 2, 8, 8, C.navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(C.gold[0], C.gold[1], C.gold[2]);
    doc.text(String(i + 1), 27, y + 8, { align: "center" });

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(C.navy[0], C.navy[1], C.navy[2]);
    doc.text(tip.title, 35, y + 8);

    // Khmer title
    if (kh) {
      doc.setFont("NotoSansKhmer", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(C.muted[0], C.muted[1], C.muted[2]);
      doc.text(tip.titleKh, 35, y + 14.5);
      doc.setFont("helvetica", "normal");
    }

    // Body text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(C.dark[0], C.dark[1], C.dark[2]);
    const bodyY = kh ? y + 20 : y + 14;
    const bodyLines = doc.splitTextToSize(tip.body, 150);
    doc.text(bodyLines, 35, bodyY);

    // Khmer body (only if font loaded and space allows)
    if (kh && bodyLines.length <= 2) {
      doc.setFont("NotoSansKhmer", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(C.muted[0], C.muted[1], C.muted[2]);
      const khBodyLines = doc.splitTextToSize(tip.bodyKh, 150);
      const khBodyY = bodyY + bodyLines.length * 4;
      if (khBodyY + khBodyLines.length * 3.5 < y + CARD_H - 1) {
        doc.text(khBodyLines, 35, khBodyY);
      }
      doc.setFont("helvetica", "normal");
    }

    y += CARD_H + CARD_GAP;
  });

  // Closing callout
  fillRect(doc, 18, y + 2, 174, 20, C.navy);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(C.gold[0], C.gold[1], C.gold[2]);
  doc.text("Practice makes confident", pageW / 2, y + 10, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(C.white[0], C.white[1], C.white[2]);
  doc.text(
    "Visit the AI Interview Simulator at chouy-sala.replit.app for real-time feedback.",
    pageW / 2, y + 17, { align: "center" },
  );

  pageFooter(doc, "Interview Coach", "Section 3 of 3");
}

// ── Main export ───────────────────────────────────────────────────────────────
export async function generateResourceGuide(
  onProgress?: (step: string) => void,
): Promise<void> {
  onProgress?.("Loading Khmer font (this may take a moment)...");
  const khFont = await loadKhmerFont();

  onProgress?.("Building PDF document...");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  if (khFont) {
    doc.addFileToVFS("NotoSansKhmer-Regular.ttf", khFont);
    doc.addFont("NotoSansKhmer-Regular.ttf", "NotoSansKhmer", "normal");
    onProgress?.("Khmer font loaded. Building cover page...");
  } else {
    onProgress?.("Building cover page (English only)...");
  }

  buildCoverPage(doc, khFont);

  onProgress?.("Building Future Pathways section (43 majors)...");
  buildFuturePathwaysSection(doc);

  onProgress?.("Building Exam Prep section...");
  buildExamPrepSection(doc, khFont);

  onProgress?.("Building Interview Coach section...");
  buildInterviewCoachSection(doc, khFont);

  onProgress?.("Saving PDF...");
  doc.save("Chouy_Sala_Resource_Guide.pdf");
}
