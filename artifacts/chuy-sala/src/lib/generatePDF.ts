import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import careersRaw from "@/data/careers.json";
import healthData from "@/data/health_science.json";
import grammarData from "@/data/english_grammar.json";
import mathData from "@/data/mathematics.json";

// ── Brand colours ─────────────────────────────────────────────────────────────
const NAVY  = [26, 58, 92]   as [number, number, number];  // #1A3A5C
const BLUE  = [26, 110, 168] as [number, number, number];  // #1A6EA8
const GOLD  = [245, 158, 11] as [number, number, number];  // #F59E0B
const WHITE = [255, 255, 255] as [number, number, number];
const LIGHT = [240, 244, 248] as [number, number, number]; // section bg
const DARK  = [30,  41,  59]  as [number, number, number]; // body text
const MUTED = [100, 116, 139] as [number, number, number];

// ── Types ─────────────────────────────────────────────────────────────────────
type Major = {
  id: string; en: string; kh: string; icon: string;
  careers: {
    id: string; en: string; kh: string;
    tasks: { en: string[]; kh: string[] };
    impact: { en: string; kh: string };
  }[];
};

// ── Helpers ───────────────────────────────────────────────────────────────────
async function loadKhmerFont(): Promise<string | null> {
  try {
    const url =
      "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansKhmer/NotoSansKhmer-Regular.ttf";
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let bin = "";
    const CHUNK = 0x8000;
    for (let i = 0; i < bytes.length; i += CHUNK) {
      bin += String.fromCharCode(...bytes.subarray(i, Math.min(i + CHUNK, bytes.length)));
    }
    return btoa(bin);
  } catch {
    return null;
  }
}

function drawRect(
  doc: jsPDF,
  x: number, y: number, w: number, h: number,
  color: [number, number, number],
) {
  doc.setFillColor(...color);
  doc.rect(x, y, w, h, "F");
}

function hRule(doc: jsPDF, y: number, color: [number, number, number] = GOLD) {
  doc.setDrawColor(...color);
  doc.setLineWidth(0.6);
  doc.line(20, y, 190, y);
}

function sectionHeader(
  doc: jsPDF,
  title: string,
  subtitle: string,
  y: number,
  pageW = 210,
) {
  drawRect(doc, 0, y, pageW, 14, NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...WHITE);
  doc.text(title, 20, y + 5.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...GOLD);
  doc.text(subtitle, 20, y + 11);
  return y + 14;
}

// ── Cover Page ────────────────────────────────────────────────────────────────
function buildCoverPage(doc: jsPDF, khFont: string | null) {
  const pageW = 210;
  const pageH = 297;

  // Navy top banner
  drawRect(doc, 0, 0, pageW, 72, NAVY);

  // Gold accent stripe
  drawRect(doc, 0, 72, pageW, 3, GOLD);

  // Site name — Latin
  doc.setFont("helvetica", "bold");
  doc.setFontSize(38);
  doc.setTextColor(...WHITE);
  doc.text("Chouy Sala", pageW / 2, 30, { align: "center" });

  // Khmer subtitle
  if (khFont) {
    doc.setFont("NotoSansKhmer", "normal");
    doc.setFontSize(20);
    doc.setTextColor(...GOLD);
    doc.text("ជួយសាលា", pageW / 2, 46, { align: "center" });
    doc.setFont("helvetica", "normal");
  }

  // Tagline
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(180, 210, 240);
  doc.text("Help School — Cambodia", pageW / 2, 62, { align: "center" });

  // Central document title
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  doc.text("OFFLINE RESOURCE GUIDE", pageW / 2, 100, { align: "center" });

  hRule(doc, 108, GOLD);

  // Mission statement block
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  const mission = doc.splitTextToSize(
    "Empowering Cambodian students with access to career guidance, bilingual exam preparation, and scholarship pathways — even without an internet connection.",
    160,
  );
  doc.text(mission, pageW / 2, 120, { align: "center", lineHeightFactor: 1.6 });

  if (khFont) {
    doc.setFont("NotoSansKhmer", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...MUTED);
    const missionKh = doc.splitTextToSize(
      "ផ្ដល់សិទ្ធិអំណាចដល់សិស្សកម្ពុជា ក្នុងការទទួលបានការណែនាំអំពីអាជីព ការត្រៀមប្រឡង ២ ភាសា និងផ្លូវទទួលបានអាហារូបករណ៍ — ទោះបីគ្មានអ៊ីន្ទឺណែតក៏ដោយ។",
      160,
    );
    doc.text(missionKh, pageW / 2, 148, { align: "center", lineHeightFactor: 1.7 });
    doc.setFont("helvetica", "normal");
  }

  // What's inside card
  drawRect(doc, 20, 175, 170, 60, LIGHT);
  doc.setDrawColor(...BLUE);
  doc.setLineWidth(0.4);
  doc.rect(20, 175, 170, 60);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...NAVY);
  doc.text("WHAT'S INSIDE", 25, 183);

  const contents = [
    "Section 1 — Future Pathways Guide: 43 majors & 95+ career profiles with bilingual descriptions",
    "Section 2 — Exam Prep Topics: Grade 12 subjects — Health & Science, English Grammar, Mathematics",
    "Section 3 — Interview Coach: Evidence-based tips for job interviews & scholarship panels",
  ];
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  contents.forEach((line, i) => {
    doc.setFillColor(...GOLD);
    doc.circle(27, 191 + i * 13, 1.2, "F");
    const wrapped = doc.splitTextToSize(line, 154);
    doc.text(wrapped, 31, 191 + i * 13);
  });

  // Bottom footer bar
  drawRect(doc, 0, pageH - 22, pageW, 22, NAVY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...GOLD);
  doc.text("chouy-sala.replit.app", pageW / 2, pageH - 13, { align: "center" });
  doc.setTextColor(180, 210, 240);
  doc.text(`Generated ${new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}`, pageW / 2, pageH - 7, { align: "center" });
}

// ── Section 1 — Future Pathways ───────────────────────────────────────────────
function buildFuturePathwaysSection(doc: jsPDF, khFont: string | null) {
  doc.addPage();
  const pageW = 210;

  let y = sectionHeader(
    doc,
    "SECTION 1 — FUTURE PATHWAYS GUIDE",
    "Career profiles drawn from Cambodia's university majors — English & Khmer",
    0,
    pageW,
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text(
    "Each row shows a major offered at Cambodian universities, the career pathways it opens, and the real-world impact.",
    20, y + 6,
  );

  const majors = careersRaw as Major[];

  const rows: (string | { content: string; styles: object })[][] = [];

  majors.forEach((major) => {
    major.careers.forEach((career, idx) => {
      const majorCell = idx === 0
        ? {
            content: `${major.icon} ${major.en}\n${major.kh}`,
            rowSpan: major.careers.length,
            styles: { fontStyle: "bold", valign: "middle" } as object,
          }
        : null;

      const careerCell = `${career.en}\n${career.kh}`;
      const impactCell = career.impact.en;

      if (majorCell) {
        rows.push([majorCell, careerCell, impactCell]);
      } else {
        rows.push([careerCell, impactCell]);
      }
    });
  });

  // Flatten rows to a simpler format (rowSpan can be tricky; use simple approach)
  const flatRows: string[][] = [];
  majors.forEach((major) => {
    major.careers.forEach((career, idx) => {
      flatRows.push([
        idx === 0 ? `${major.icon} ${major.en}\n${major.kh}` : "",
        `${career.en}\n${career.kh}`,
        career.impact.en,
      ]);
    });
  });

  autoTable(doc, {
    startY: y + 12,
    head: [["MAJOR / ជំនាញ", "CAREER / អាជីព", "IMPACT / ផលប្រយោជន៍"]],
    body: flatRows,
    margin: { left: 20, right: 20 },
    styles: {
      fontSize: 7.5,
      cellPadding: { top: 3, right: 3, bottom: 3, left: 3 },
      lineColor: [200, 215, 230],
      lineWidth: 0.25,
      overflow: "linebreak",
      font: "helvetica",
      textColor: [...DARK],
    },
    headStyles: {
      fillColor: [...BLUE],
      textColor: [...WHITE],
      fontStyle: "bold",
      fontSize: 8,
      halign: "left",
      cellPadding: { top: 4, right: 3, bottom: 4, left: 3 },
    },
    columnStyles: {
      0: { cellWidth: 42, fontStyle: "bold", fillColor: [235, 244, 252] },
      1: { cellWidth: 65 },
      2: { cellWidth: 63 },
    },
    alternateRowStyles: {
      fillColor: [248, 251, 255],
    },
    didParseCell(data) {
      // Apply Khmer font to cells containing Khmer characters
      if (khFont && data.cell.text.some((t: string) => /[\u1780-\u17FF]/.test(t))) {
        data.cell.styles.font = "NotoSansKhmer";
        data.cell.styles.fontSize = 6.5;
      }
    },
    didDrawPage(data) {
      // Repeat section label on continuation pages
      if (data.pageNumber > 1) {
        drawRect(doc, 0, 0, pageW, 7, NAVY);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(...GOLD);
        doc.text("SECTION 1 — FUTURE PATHWAYS GUIDE (continued)", 20, 5);
      }
      // Footer
      const pageH = doc.internal.pageSize.getHeight();
      drawRect(doc, 0, pageH - 10, pageW, 10, NAVY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(...GOLD);
      doc.text("Chouy Sala — chouy-sala.replit.app", 20, pageH - 4);
      doc.setTextColor(180, 210, 240);
      doc.text(`Page ${data.pageNumber}`, pageW - 20, pageH - 4, { align: "right" });
    },
  });
}

// ── Section 2 — Exam Prep ─────────────────────────────────────────────────────
function buildExamPrepSection(doc: jsPDF, khFont: string | null) {
  doc.addPage();
  const pageW = 210;
  const pageH = doc.internal.pageSize.getHeight();

  let y = sectionHeader(
    doc,
    "SECTION 2 — EXAM PREP GUIDE",
    "Grade 12 bilingual quiz topics for the National University Entrance Examination (NUEE)",
    0,
    pageW,
  );
  y += 8;

  const subjects = [
    {
      title: "Health & Science",
      kh: "សុខភាព និងវិទ្យាសាស្ត្រ",
      color: [16, 150, 100] as [number, number, number],
      emoji: "🔬",
      grade: "Grade 11–12",
      data: healthData,
    },
    {
      title: "English Grammar",
      kh: "វេយ្យាករណ៍ភាសាអង់គ្លេស",
      color: [37, 99, 235] as [number, number, number],
      emoji: "📖",
      grade: "Grade 12",
      data: grammarData,
    },
    {
      title: "Mathematics",
      kh: "គណិតវិទ្យា",
      color: [124, 58, 237] as [number, number, number],
      emoji: "🧮",
      grade: "Grade 12",
      data: mathData,
    },
  ];

  subjects.forEach((subj) => {
    // Subject header bar
    drawRect(doc, 20, y, 170, 10, subj.color);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...WHITE);
    doc.text(`${subj.emoji}  ${subj.title}`, 24, y + 7);

    if (khFont) {
      doc.setFont("NotoSansKhmer", "normal");
      doc.setFontSize(8);
      doc.setTextColor(220, 240, 255);
      doc.text(subj.kh, 130, y + 7);
      doc.setFont("helvetica", "normal");
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...MUTED);
    doc.text(subj.grade, 175, y + 7, { align: "right" });
    y += 10;

    // Topics table
    const topicRows = subj.data.topics.map((topic) => [
      topic.titleEn,
      topic.titleKh,
      topic.focusEn,
      `${topic.questions.length} questions`,
    ]);

    autoTable(doc, {
      startY: y,
      head: [["Topic", "ប្រធានបទ", "Focus Area", "Questions"]],
      body: topicRows,
      margin: { left: 20, right: 20 },
      styles: {
        fontSize: 8,
        cellPadding: { top: 3, right: 3, bottom: 3, left: 3 },
        lineColor: [200, 215, 230],
        lineWidth: 0.2,
        textColor: [...DARK],
        font: "helvetica",
      },
      headStyles: {
        fillColor: subj.color,
        textColor: [...WHITE],
        fontStyle: "bold",
        fontSize: 8,
        cellPadding: { top: 3.5, right: 3, bottom: 3.5, left: 3 },
      },
      columnStyles: {
        0: { cellWidth: 50, fontStyle: "bold" },
        1: { cellWidth: 55 },
        2: { cellWidth: 60 },
        3: { cellWidth: 20, halign: "center" },
      },
      alternateRowStyles: { fillColor: [248, 251, 255] },
      didParseCell(data) {
        if (khFont && data.cell.text.some((t: string) => /[\u1780-\u17FF]/.test(t))) {
          data.cell.styles.font = "NotoSansKhmer";
          data.cell.styles.fontSize = 7;
        }
      },
    });

    y = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;
  });

  // Study tips callout
  drawRect(doc, 20, y, 170, 32, [255, 251, 235]);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.rect(20, y, 170, 32);
  drawRect(doc, 20, y, 4, 32, GOLD);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...NAVY);
  doc.text("📝  Grade 12 Study Tips", 28, y + 7);

  const tips = [
    "Start with topics where you feel most confident to build momentum.",
    "Practice each topic at least twice — mistakes are how you learn.",
    "Use the bilingual explanations to understand both EN and Khmer terminology.",
  ];
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...DARK);
  tips.forEach((tip, i) => {
    doc.setFillColor(...GOLD);
    doc.circle(28, y + 15 + i * 7, 1, "F");
    doc.text(tip, 32, y + 15 + i * 7);
  });

  y += 40;

  // Page footer
  drawRect(doc, 0, pageH - 10, pageW, 10, NAVY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...GOLD);
  doc.text("Chouy Sala — chouy-sala.replit.app", 20, pageH - 4);
  doc.setTextColor(180, 210, 240);
  doc.text("Section 2 — Exam Prep Guide", pageW - 20, pageH - 4, { align: "right" });
}

// ── Section 3 — Interview Coach ───────────────────────────────────────────────
function buildInterviewCoachSection(doc: jsPDF, khFont: string | null) {
  doc.addPage();
  const pageW = 210;
  const pageH = doc.internal.pageSize.getHeight();

  sectionHeader(
    doc,
    "SECTION 3 — THE INTERVIEW COACH",
    "Evidence-based preparation strategies for job interviews & scholarship panels",
    0,
    pageW,
  );

  const tips: { title: string; titleKh: string; body: string; bodyKh: string; icon: string }[] = [
    {
      icon: "🎯",
      title: "Research Before You Walk In",
      titleKh: "ស្រាវជ្រាវ មុនពេលអ្នកចូល",
      body: "Study the organisation's mission, recent news, and the job description thoroughly. Interviewers immediately notice candidates who understand the role and connect it to the organisation's goals.",
      bodyKh: "សិក្សាបេសកកម្ម ព័ត៌មានថ្មីៗ និងការពិពណ៌នាការងារ យ៉ាងហ្មត់ចត់។ អ្នកសំភាសន៍ ភ្លាមៗ កត់ចំណាំអ្នកដែលយល់ដឹងអំពីតួនាទី ហើយភ្ជាប់វាទៅគោលដៅអង្គការ។",
    },
    {
      icon: "⭐",
      title: "Use the STAR Method",
      titleKh: "ប្រើវិធី STAR",
      body: "Structure every behavioural answer using Situation → Task → Action → Result. This makes your responses clear, concise, and evidence-based, which is valued by every interviewer globally.",
      bodyKh: "រៀបចំចម្លើយរៀងរាល់ខ្ញុំ ដោយប្រើ: ស្ថានការណ៍ → ភារកិច្ច → សកម្មភាព → លទ្ធផល។ នេះធ្វើឱ្យចម្លើយរបស់អ្នកច្បាស់ល្អ សង្ខេប ហើយផ្អែកលើភស្តុតាង ដែលអ្នកសំភាសន៍ទូទៅជំនាញវាយតម្លៃ។",
    },
    {
      icon: "🗣️",
      title: "Tone, Pace & Clarity",
      titleKh: "សម្លេង ល្បឿន និងភាពច្បាស់លាស់",
      body: "Speak clearly at a measured pace — not too fast, not too slow. Pause briefly before answering to collect your thoughts. A calm, confident tone signals professionalism more than any single answer you give.",
      bodyKh: "និយាយឱ្យច្បាស់ ក្នុងល្បឿនស្ថិតស្ថេរ — មិនលឿនពេក មិនយឺតពេក។ ឈប់ស្ងៀមមួយចំណុចក្រោយសំណួរ ដើម្បីប្រមូលគំនិត។ សម្លេងស្ងប់ស្ងាត់ និងជឿជាក់ បង្ហាញវិជ្ជាជីវៈ ច្រើនជាចម្លើយណាក៏ដោយ។",
    },
    {
      icon: "💼",
      title: "Body Language & Presence",
      titleKh: "ភាសាកាយវិការ និងវត្តមាន",
      body: "Sit upright with relaxed shoulders. Make natural eye contact — not a stare. Nod to show active listening. Avoid crossing arms or fidgeting. Your physical presence communicates confidence before you say a word.",
      bodyKh: "អង្គុយ똑똑ត្រង់ ស្មាសម្រាក។ ធ្វើទំនាក់ទំនងភ្នែកដោយធម្មជាតិ — មិនមែនសម្លឹងដូចខ្លា។ ងាកក្បាលដើម្បីបង្ហាញការស្តាប់能动地。 វត្តមានរាងកាយផ្ទាល់ខ្លួនបញ្ជាក់ ជំនឿ មុនពេលអ្នកនិយាយ Word ណាម្ដង។",
    },
    {
      icon: "❓",
      title: "Ask Thoughtful Questions",
      titleKh: "ស្នើសំណួរដ៏ស៊ីជម្រៅ",
      body: "Prepare 3–5 genuine questions to ask the interviewer. Great options: 'What does success look like in this role in the first 90 days?' or 'How does this team contribute to the broader mission?'",
      bodyKh: "រៀបចំ ៣–៥ សំណួរពិតប្រាកដ ដើម្បីសួរអ្នកសំភាស។ ជម្រើសល្អ: 'ភាពជោគជ័យក្នុងតួនាទីនេះ ក្នុង ៩០ ថ្ងៃដំបូង ហើទ?' ឬ 'តើក្រុមនេះ ចូលរួមមុខតូចយ៉ាងណា ទៅបេសកកម្មទូលំទូលាយ?'",
    },
    {
      icon: "🙏",
      title: "Follow Up With Gratitude",
      titleKh: "តាមដានដោយការគោរព",
      body: "Send a brief thank-you message within 24 hours. Mention one specific topic from the conversation to show you were genuinely engaged. This small act significantly increases your chance of being remembered positively.",
      bodyKh: "ផ្ញើសាររំលឹកអំណរគុណ ក្នុង ២៤ ម៉ោង។ ដ.ស. ប្រធានបទមួយ ពីការសន្ទនា ដើម្បីបង្ហាញថាអ្នកបានចូលរួមពិតប្រាកដ។ ការប្រព្រឹត្ដតូចនេះ បង្កើន ឱកាស ឱ្យអ្នករំឭកបានជោគជ័យ ។",
    },
  ];

  let y = 20;

  tips.forEach((tip, i) => {
    const even = i % 2 === 0;
    const bgColor: [number, number, number] = even ? LIGHT : [255, 255, 255];

    // Tip card
    drawRect(doc, 20, y, 170, 38, bgColor);
    doc.setDrawColor(...BLUE);
    doc.setLineWidth(0.3);
    doc.rect(20, y, 170, 38);
    drawRect(doc, 20, y, 5, 38, BLUE);

    // Icon + title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...NAVY);
    doc.text(`${tip.icon}  ${tip.title}`, 30, y + 7);

    if (khFont) {
      doc.setFont("NotoSansKhmer", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(...MUTED);
      doc.text(tip.titleKh, 30, y + 13);
      doc.setFont("helvetica", "normal");
    }

    // Body text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...DARK);
    const bodyLines = doc.splitTextToSize(tip.body, 155);
    doc.text(bodyLines, 30, khFont ? y + 20 : y + 14);

    if (khFont) {
      doc.setFont("NotoSansKhmer", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(...MUTED);
      const bodyKhLines = doc.splitTextToSize(tip.bodyKh, 155);
      const bodyEnd = (khFont ? y + 20 : y + 14) + bodyLines.length * 3.5;
      if (bodyEnd < y + 38) {
        doc.text(bodyKhLines, 30, bodyEnd);
      }
      doc.setFont("helvetica", "normal");
    }

    y += 40;
  });

  // Closing callout
  drawRect(doc, 20, y, 170, 22, NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...GOLD);
  doc.text("🌟  Practice Makes Confident", pageW / 2, y + 8, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...WHITE);
  doc.text(
    "Visit the AI Interview Simulator at chouy-sala.replit.app to practice with instant AI feedback.",
    pageW / 2, y + 15, { align: "center" },
  );

  // Footer
  drawRect(doc, 0, pageH - 10, pageW, 10, NAVY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...GOLD);
  doc.text("Chouy Sala — chouy-sala.replit.app", 20, pageH - 4);
  doc.setTextColor(180, 210, 240);
  doc.text("Section 3 — Interview Coach", pageW - 20, pageH - 4, { align: "right" });
}

// ── Main export ───────────────────────────────────────────────────────────────
export async function generateResourceGuide(
  onProgress?: (step: string) => void,
): Promise<void> {
  onProgress?.("Loading Khmer font…");
  const khFont = await loadKhmerFont();

  onProgress?.("Building document…");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // Register Khmer font if loaded
  if (khFont) {
    doc.addFileToVFS("NotoSansKhmer-Regular.ttf", khFont);
    doc.addFont("NotoSansKhmer-Regular.ttf", "NotoSansKhmer", "normal");
  }

  onProgress?.("Building cover page…");
  buildCoverPage(doc, khFont);

  onProgress?.("Building Future Pathways section…");
  buildFuturePathwaysSection(doc, khFont);

  onProgress?.("Building Exam Prep section…");
  buildExamPrepSection(doc, khFont);

  onProgress?.("Building Interview Coach section…");
  buildInterviewCoachSection(doc, khFont);

  onProgress?.("Saving PDF…");
  doc.save("Chouy_Sala_Resource_Guide.pdf");
}
