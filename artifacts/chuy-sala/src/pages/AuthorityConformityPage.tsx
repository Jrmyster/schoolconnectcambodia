import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Zap,
  AlertTriangle,
  Brain,
  ShieldCheck,
  Eye,
  GraduationCap,
  ClipboardList,
  Quote,
  Hand,
  ScrollText,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import type React from "react";

// ════════════════════════════════════════════════════════════════════════════
//  STC-SOC-OBEY-01 · Authority & Conformity: The Science of Obedience
//                    អំណាច និងការស្របតាមសង្គម ៖ វិទ្យាសាស្ត្រនៃការស្តាប់បង្គាប់
//
//  Psychology-Lab aesthetic — clinical whites + chalkboard blacks + alert red.
//  Custom anatomical SVGs for the Asch line cards, Milgram lab layout, the
//  shock-generator dial, the 65 % result chart, and the agentic-state diagram.
// ════════════════════════════════════════════════════════════════════════════

// ─── Psychology-lab palette ─────────────────────────────────────────────
const BG       = "#0a0d12";   // chalkboard black
const PANEL    = "#f5f6f8";   // clinical paper-white
const PANEL_2  = "#fafafa";
const INK_DARK = "#0f172a";   // chart ink on white panels
const INK_SOFT_DARK = "#475569";
const LINE_DARK = "#cbd5e1";
const INK      = "#f8fafc";   // text on chalkboard
const INK_SOFT = "#94a3b8";
const RULE     = "#1f2a3d";
const ALERT    = "#dc2626";   // alert red — danger
const ALERT_DK = "#991b1b";
const STEEL    = "#64748b";   // clinical steel
const AMBER    = "#f59e0b";   // warning
const TEAL     = "#0d9488";   // antidote / safe
const VIOLET   = "#7c3aed";   // authority / scientist coat highlight
const CHALK    = "#ffffff";

// Khmer numerals
const KH_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
function toKhNum(n: number | string): string {
  return String(n).replace(/[0-9]/g, (d) => KH_DIGITS[Number(d)]);
}

// ─── Layout primitives ──────────────────────────────────────────────────

function P({
  k,
  en,
  kh,
  className,
  light,
}: { k: boolean; en: string; kh: string; className?: string; light?: boolean }) {
  return (
    <p
      className={`${className ?? ""} ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
      style={{ color: light ? INK_SOFT_DARK : INK_SOFT }}
    >
      {k ? kh : en}
    </p>
  );
}

function H2({
  k,
  en,
  kh,
  Icon,
  accent,
  num,
}: {
  k: boolean;
  en: string;
  kh: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
  num?: number;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      {num !== undefined && (
        <span
          className="font-mono font-extrabold text-xs px-2 py-1 rounded"
          style={{ backgroundColor: accent, color: BG }}
        >
          §{k ? toKhNum(num) : num}
        </span>
      )}
      <Icon className="w-5 h-5" style={{ color: accent }} />
      <h2
        className={`text-lg sm:text-xl font-bold tracking-wide ${k ? "font-khmer" : "uppercase"}`}
        style={{ color: INK }}
      >
        {k ? kh : en}
      </h2>
      <div className="flex-1 border-t border-dashed" style={{ borderColor: `${accent}55` }} />
    </div>
  );
}

function ClinicalPanel({
  children,
  accent,
  className,
  testId,
}: {
  children: React.ReactNode;
  accent: string;
  className?: string;
  testId?: string;
}) {
  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 border ${className ?? ""}`}
      style={{
        backgroundColor: PANEL,
        borderColor: accent,
        boxShadow: `inset 0 0 0 1px ${accent}22, 0 4px 24px -8px rgba(0,0,0,0.4)`,
      }}
      data-testid={testId}
    >
      {children}
    </div>
  );
}

function ChalkPanel({
  children,
  accent,
  className,
  testId,
}: {
  children: React.ReactNode;
  accent: string;
  className?: string;
  testId?: string;
}) {
  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 border ${className ?? ""}`}
      style={{
        backgroundColor: "#10141d",
        borderColor: `${accent}66`,
        boxShadow: `inset 0 0 0 1px ${accent}22, 0 0 22px -10px ${accent}66`,
      }}
      data-testid={testId}
    >
      {children}
    </div>
  );
}

function Tag({
  k,
  en,
  kh,
  accent,
  light,
}: {
  k: boolean;
  en: string;
  kh: string;
  accent: string;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-block text-[10px] font-bold px-2 py-1 rounded-md tracking-widest ${k ? "font-khmer" : "uppercase font-mono"}`}
      style={{ backgroundColor: accent, color: light ? PANEL : BG }}
    >
      {k ? kh : en}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export function AuthorityConformityPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  const frame: React.CSSProperties = {
    backgroundColor: BG,
    backgroundImage:
      `radial-gradient(circle at 18% 12%, ${ALERT}22, transparent 50%),` +
      `radial-gradient(circle at 84% 88%, ${VIOLET}1d, transparent 55%),` +
      // chalkboard rules
      `linear-gradient(${RULE} 1px, transparent 1px),` +
      `linear-gradient(90deg, ${RULE} 1px, transparent 1px)`,
    backgroundSize: "auto, auto, 38px 38px, 38px 38px",
  };

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={frame}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80 ${k ? "font-khmer" : ""}`}
            style={{ color: ALERT }}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
        </div>

        {/* HERO */}
        <header
          className="relative rounded-[2rem] overflow-hidden border p-6 sm:p-9 mb-8"
          style={{
            backgroundColor: "#0e131c",
            borderColor: `${ALERT}66`,
            boxShadow: `inset 0 0 0 1px ${ALERT}22, 0 0 60px -20px ${ALERT}99`,
          }}
        >
          <LabBackdrop />
          <div className="relative">
            <div
              className={`flex items-center gap-2 text-[11px] mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-[0.3em]"}`}
              style={{ color: ALERT }}
            >
              <span>{t("Study Center · Sociology", "មជ្ឈមណ្ឌលសិក្សា · សង្គមវិទ្យា")}</span>
              <span>·</span>
              <span>STC-SOC-OBEY-01</span>
            </div>
            <h1
              className={`text-3xl sm:text-4xl font-extrabold leading-tight max-w-3xl ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: INK, textShadow: `0 0 18px ${ALERT}88` }}
              data-testid="page-title"
            >
              {t(
                "Authority & Conformity: The Science of Obedience",
                "អំណាច និងការស្របតាមសង្គម ៖ វិទ្យាសាស្ត្រនៃការស្តាប់បង្គាប់"
              )}
            </h1>
            <p
              className={`mt-3 text-sm sm:text-base max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: INK_SOFT }}
            >
              {t(
                "Most of us imagine that, if a stranger in a white coat told us to hurt another human being, we would refuse. We would walk out. We would be the hero. In 1961, a quiet psychology professor at Yale named Stanley Milgram set up an experiment to find out exactly how true that was — and the answer terrified an entire generation of scientists. Around the same time, Solomon Asch had already shown that people will deny what their own eyes are telling them, just to fit in with a group. Together, these two experiments reshaped how we understand authority, peer pressure, the moral lines we believe we will never cross — and how to actually defend ourselves against the most dangerous instinct in human social wiring: blind obedience.",
                "យើងភាគច្រើនស្រមៃថា បើមនុស្សចម្លែកម្នាក់ស្លៀកអាវពណ៌សប្រាប់យើងឲ្យធ្វើបាបមនុស្សម្នាក់ទៀត យើងនឹងបដិសេធ។ យើងនឹងដើរចេញ។ យើងនឹងជាវីរបុរស។ នៅឆ្នាំ ១៩៦១ សាស្ត្រាចារ្យចិត្តវិទ្យាស្ងាត់ៗម្នាក់នៅសាកលវិទ្យាល័យ Yale ឈ្មោះ Stanley Milgram បានរៀបចំការពិសោធន៍មួយដើម្បីរកមើលថាតើការនេះពិតប៉ុណ្ណា — ហើយចម្លើយបានធ្វើឲ្យអ្នកវិទ្យាសាស្ត្រមួយជំនាន់ភ័យរន្ធត់។ ប្រហែលពេលជាមួយគ្នា Solomon Asch បានបង្ហាញរួចមកហើយថា មនុស្សនឹងបដិសេធអ្វីដែលភ្នែករបស់គេខ្លួនប្រាប់ ដើម្បីស្របជាមួយក្រុម។ ការពិសោធន៍ទាំងពីរនេះបានផ្លាស់ប្ដូររបៀបដែលយើងយល់ពីអំណាច សម្ពាធពីមិត្តរួមក្រុម ខ្សែសីលធម៌ដែលយើងជឿថាយើងនឹងមិនកាត់ផ្ដាច់ — និងរបៀបការពារខ្លួនពិតប្រាកដប្រឆាំងនឹងសភាវគតិដ៏គ្រោះថ្នាក់បំផុតក្នុងសរសៃសង្គមរបស់មនុស្ស ៖ ការស្តាប់បង្គាប់ងងឹត។"
              )}
            </p>

            {/* Quick stats strip */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { en: "Asch wrong-answer conformity", kh: "ការស្របខុស (Asch)",       val: "~37%",    valKh: "~៣៧%",    accent: AMBER },
                { en: "Milgram all-the-way obedience",  kh: "ការស្តាប់រហូតចុង (Milgram)", val: "65%",     valKh: "៦៥%",     accent: ALERT },
                { en: "Maximum shock label",            kh: "តង់ស្យុងអតិបរមា",          val: "450 V",   valKh: "៤៥០ V",   accent: VIOLET },
                { en: "Yale year of experiment",        kh: "ឆ្នាំពិសោធន៍នៅ Yale",       val: "1961",    valKh: "១៩៦១",    accent: STEEL },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3 border"
                  style={{ backgroundColor: "#10141d", borderColor: `${s.accent}66` }}
                >
                  <div className={`text-[10px] mb-1 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: s.accent }}>
                    {k ? s.kh : s.en}
                  </div>
                  <div className="text-base font-extrabold font-mono" style={{ color: INK }}>
                    {k ? s.valKh : s.val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* CHAPTER 1 — Asch */}
        <section className="mb-12">
          <H2 num={1} k={k} en="The need to fit in" kh="ការស្របតាមសង្គម" Icon={Users} accent={AMBER} />
          <P
            k={k}
            en="In 1951, the psychologist Solomon Asch sat eight people around a table and showed them two large cards. The first card had a single straight line on it. The second card had three lines: A, B, and C. The task was almost insultingly simple — say out loud which of the three lines on the second card was the same length as the line on the first card. The answer was obvious. A child could see it. But seven of the eight people in the room were secretly Asch's actors. One by one, they confidently and clearly said the wrong line. The real subject — the eighth person, the only one being studied — sat there, looked at the card, looked at the others, and slowly, painfully, began to doubt his own eyes."
            kh="នៅឆ្នាំ ១៩៥១ ចិត្តវិទូ Solomon Asch បានឲ្យមនុស្សប្រាំបីនាក់អង្គុយជុំវិញតុ និងបានបង្ហាញប័ណ្ណធំៗពីរ។ ប័ណ្ណទីមួយមានបន្ទាត់ត្រង់មួយ។ ប័ណ្ណទីពីរមានបន្ទាត់បី ៖ A B និង C។ កិច្ចការគឺសាមញ្ញគួរឲ្យអាម៉ាស់ — និយាយលឺៗថា តើបន្ទាត់ណាមួយក្នុងបីនៅលើប័ណ្ណទីពីរ មានប្រវែងស្មើនឹងបន្ទាត់នៅលើប័ណ្ណទីមួយ។ ចម្លើយច្បាស់លាស់។ កុមារក៏អាចមើលឃើញ។ ប៉ុន្តែអ្នកប្រាំពីរក្នុងចំណោមប្រាំបីនាក់ក្នុងបន្ទប់ គឺជាតួសម្ងាត់របស់ Asch។ ម្នាក់បន្ទាប់ម្នាក់ ពួកគេបាននិយាយប្រកបដោយទំនុកចិត្ត និងច្បាស់នូវបន្ទាត់ខុស។ មនុស្សពិត — អ្នកទីប្រាំបី ដែលជាមនុស្សតែម្នាក់គត់ដែលត្រូវសិក្សា — អង្គុយនៅទីនោះ មើលប័ណ្ណ មើលអ្នកដទៃ ហើយចាប់ផ្ដើមសង្ស័យភ្នែករបស់ខ្លួនយឺតៗ និងឈឺចាប់។"
            className="-mt-2 mb-5"
          />

          <ClinicalPanel accent={AMBER} testId="asch-panel">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Tag k={k} en="The Asch line experiment · 1951" kh="ការពិសោធន៍បន្ទាត់ Asch · ១៩៥១" accent={AMBER} />
            </div>
            <h3 className={`text-xl font-bold mb-4 ${k ? "font-khmer" : ""}`} style={{ color: INK_DARK }}>
              {k ? "តើបន្ទាត់ណាមានប្រវែងស្មើនឹងគំរូ?" : "Which line matches the reference?"}
            </h3>
            <AschLineCards k={k} />

            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              {[
                {
                  num: 1,
                  en: "Truth: B is obviously the match.",
                  kh: "ការពិត ៖ B ច្បាស់ជាបន្ទាត់ដែលត្រូវ។",
                  accent: TEAL,
                  Icon: CheckCircle2,
                },
                {
                  num: 2,
                  en: "7 actors confidently call out 'C'.",
                  kh: "តួសម្ងាត់ ៧ នាក់និយាយប្រកបដោយទំនុកចិត្តថា «C»។",
                  accent: AMBER,
                  Icon: Users,
                },
                {
                  num: 3,
                  en: "~37 % of subjects also said 'C' — to fit in.",
                  kh: "មនុស្សពិត ~៣៧% ក៏និយាយ «C» — ដើម្បីស្រប។",
                  accent: ALERT,
                  Icon: AlertTriangle,
                },
              ].map((s) => {
                const Ic = s.Icon;
                return (
                  <div
                    key={s.num}
                    className="rounded-lg p-3 border"
                    style={{ backgroundColor: PANEL_2, borderColor: s.accent }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Ic className="w-4 h-4" style={{ color: s.accent }} />
                      <span className="font-mono font-extrabold text-sm" style={{ color: s.accent }}>
                        {k ? toKhNum(s.num) : s.num}.
                      </span>
                    </div>
                    <div
                      className={`text-[12px] ${k ? "font-khmer leading-loose" : ""}`}
                      style={{ color: INK_DARK }}
                    >
                      {k ? s.kh : s.en}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="mt-4 rounded-lg p-3 border-l-4 italic"
              style={{ backgroundColor: "#fff8eb", borderColor: AMBER }}
            >
              <div className="flex items-start gap-2">
                <Quote className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: AMBER }} />
                <p className={`text-[12px] ${k ? "font-khmer leading-loose" : ""}`} style={{ color: INK_DARK }}>
                  {k
                    ? "«មនុស្សវ័យក្មេងល្អៗ មានចំណេះដឹង បានព្យាយាមនឹងនាំខ្លួនឲ្យហៅខ្មៅជាស។ នេះជារឿងគួរឲ្យព្រួយបារម្ភ»។ — Solomon Asch ឆ្នាំ ១៩៥៥"
                    : "“That intelligent, well-meaning, young people are willing to call white black is a matter of concern.” — Solomon Asch, 1955"}
                </p>
              </div>
            </div>

            <P
              k={k}
              en="Asch's discovery is small but devastating: humans are wired to doubt their own senses to avoid social isolation. Standing alone in a group of confident dissenters is, biologically, almost as painful as standing alone in a freezing room. The brain quietly rewrites what the eyes saw, just to make the group accept us."
              kh="ការរកឃើញរបស់ Asch តូច ប៉ុន្តែខ្លាំង ៖ មនុស្សត្រូវបានរៀបចំឲ្យសង្ស័យអារម្មណ៍របស់ខ្លួនឯង ដើម្បីជៀសវាងភាពឯកោក្នុងសង្គម។ ឈរម្នាក់ឯងក្នុងក្រុមដែលប្រឆាំងដោយទំនុកចិត្ត គឺឈឺចាប់ជីវៈសាស្ត្រ ប្រហែលនឹងឈរម្នាក់ឯងក្នុងបន្ទប់ត្រជាក់។ ខួរក្បាលសរសេរឡើងវិញដោយស្ងាត់នូវអ្វីដែលភ្នែកបានឃើញ ដើម្បីឲ្យក្រុមទទួលយក។"
              className="text-sm mt-4"
              light
            />
          </ClinicalPanel>
        </section>

        {/* CHAPTER 2 — Milgram setup */}
        <section className="mb-12">
          <H2 num={2} k={k} en="The Milgram experiment" kh="ការពិសោធន៍របស់ Milgram" Icon={Zap} accent={ALERT} />
          <P
            k={k}
            en="If Asch shocked his colleagues, Stanley Milgram broke the field open. Working at Yale University in 1961, Milgram wanted to understand how, in living memory, ordinary German citizens — bakers, accountants, schoolteachers — had agreed to participate in industrial-scale murder. His hypothesis was uncomfortable: maybe most of the population of any country, given the right authority figure, would do the same. To test it, he built one of the most famous, controversial, and morally horrifying experiments in the history of psychology."
            kh="បើ Asch បានធ្វើឲ្យមិត្តរួមការងារភ្ញាក់ផ្អើល Stanley Milgram បានបង្ខូចមុខវិជ្ជាចេញ។ កំពុងធ្វើការនៅសាកលវិទ្យាល័យ Yale ឆ្នាំ ១៩៦១ Milgram ចង់យល់ពីរបៀបដែលប្រជាជនអាល្លឺម៉ង់ធម្មតា — អ្នកធ្វើនំប៉័ង គណនេយ្យករ គ្រូបង្រៀន — បានយល់ព្រមចូលរួមក្នុងឃាតកម្មកម្រិតឧស្សាហកម្មកាលពីមិនយូរប៉ុន្មាន។ សម្មតិកម្មរបស់គាត់មិនស្រួល ៖ ប្រហែលជាប្រជាជនភាគច្រើនរបស់ប្រទេសណាមួយ បើផ្ដល់អំណាចត្រឹមត្រូវ ក៏នឹងធ្វើដូចគ្នា។ ដើម្បីសាកល្បង គាត់បានសាងសង់ការពិសោធន៍ដ៏ល្បីបំផុត ឆ្ងាយចម្លោះបំផុត និងគួរឲ្យខ្លាចបំផុតមួយ ក្នុងប្រវត្តិសាស្ត្រចិត្តវិទ្យា។"
            className="-mt-2 mb-5"
          />

          <ClinicalPanel accent={ALERT} testId="milgram-setup-panel">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Tag k={k} en="The setup · Yale 1961" kh="ការរៀបចំ · Yale ១៩៦១" accent={ALERT} />
            </div>
            <h3 className={`text-xl font-bold mb-4 ${k ? "font-khmer" : ""}`} style={{ color: INK_DARK }}>
              {k ? "បន្ទប់ពិសោធន៍ ៖ បីតួនាទី" : "Inside the lab: three roles"}
            </h3>
            <MilgramLabDiagram k={k} />

            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              {[
                {
                  role: "scientist",
                  en: "The Scientist",
                  kh: "អ្នកវិទ្យាសាស្ត្រ",
                  who: { en: "actor in white coat (the authority)", kh: "តួស្លៀកអាវពណ៌ស (ជាអំណាច)" },
                  accent: VIOLET,
                  Icon: GraduationCap,
                },
                {
                  role: "teacher",
                  en: "The Teacher",
                  kh: "គ្រូ",
                  who: { en: "the real subject — does not know shocks are fake", kh: "មនុស្សពិត — មិនដឹងថាតង់ស្យុងជាការបន្លំទេ" },
                  accent: STEEL,
                  Icon: ClipboardList,
                },
                {
                  role: "learner",
                  en: "The Learner",
                  kh: "សិស្ស",
                  who: { en: "actor pretending to be shocked", kh: "តួធ្វើពុតថាត្រូវឆក់" },
                  accent: ALERT,
                  Icon: Hand,
                },
              ].map((r) => {
                const Ic = r.Icon;
                return (
                  <div
                    key={r.role}
                    className="rounded-lg p-3 border-l-4"
                    style={{ backgroundColor: PANEL_2, borderColor: r.accent }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Ic className="w-4 h-4" style={{ color: r.accent }} />
                      <span className={`text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color: r.accent }}>
                        {k ? r.kh : r.en}
                      </span>
                    </div>
                    <div className={`text-[11px] ${k ? "font-khmer leading-loose" : ""}`} style={{ color: INK_SOFT_DARK }}>
                      {k ? r.who.kh : r.who.en}
                    </div>
                  </div>
                );
              })}
            </div>

            <P
              k={k}
              en="The 'Teacher' read pairs of words to the 'Learner' through a wall and tested their memory. Every wrong answer triggered an electric shock — at least, that's what the Teacher was told. The shock dial in front of them ran from a gentle 15 volts up to a clearly labelled 450 volts: 'Danger: Severe Shock · XXX'. With every mistake, the dial was supposed to climb by one notch. The Learner's chair on the other side of the wall was wired up; the Teacher could hear every reaction."
              kh="«គ្រូ» បានអានគូពាក្យឲ្យ «សិស្ស» តាមជញ្ជាំង និងសាកល្បងការចងចាំរបស់ពួកគេ។ រាល់ចម្លើយខុសបង្ករឲ្យមានឆក់អគ្គិសនី — យ៉ាងហោចការបានប្រាប់គ្រូដូច្នេះ។ ឌីសក្រាហ្វិកតង់ស្យុងនៅខាងមុខពួកគេបានដើរពី ១៥ វុលដ៏ស្រាល ឡើងទៅ ៤៥០ វុលមានស្លាកច្បាស់ ៖ «គ្រោះថ្នាក់ ៖ ឆក់ធ្ងន់ · XXX»។ រាល់កំហុស ឌីសក្រត្រូវឡើងមួយអូស។ កៅអីរបស់សិស្សនៅខាងម្ខាងជញ្ជាំងត្រូវភ្ជាប់ខ្សែ ; គ្រូអាចឮប្រតិកម្មគ្រប់យ៉ាង។"
              className="text-sm mt-5"
              light
            />
          </ClinicalPanel>

          {/* Shock generator dial */}
          <ClinicalPanel accent={ALERT} className="mt-5" testId="shock-dial-panel">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Zap className="w-5 h-5" style={{ color: ALERT }} />
              <h3 className={`text-base font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK_DARK }}>
                {k ? "ឌីសតង់ស្យុង ៖ ពី ១៥ V ដល់ ៤៥០ V" : "The shock generator: 15 V to 450 V"}
              </h3>
            </div>
            <ShockGeneratorDial k={k} />
          </ClinicalPanel>

          {/* Pressure / scientist line */}
          <ChalkPanel accent={VIOLET} className="mt-5" testId="pressure-panel">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Quote className="w-5 h-5" style={{ color: VIOLET }} />
              <Tag k={k} en="The pressure" kh="សម្ពាធ" accent={VIOLET} light />
              <h3 className={`text-base font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                {k ? "ពេលដែលសិស្សស្រែកសុំឲ្យឈប់" : "When the Learner started to scream"}
              </h3>
            </div>
            <P
              k={k}
              en="By 150 volts, the Learner — through the wall — would shout that he had a heart condition and demand to be released. By 270, the screams were unbearable. By 330, there was complete silence: as if the Learner had collapsed. Almost every Teacher would, at some point, turn to the scientist in the white coat and say, 'I want to stop. Something is wrong with him.' The scientist would simply reply, in a calm flat voice, with one of four scripted lines."
              kh="ឈានដល់ ១៥០ វុល សិស្ស — តាមជញ្ជាំង — នឹងស្រែកថាគាត់មានជំងឺបេះដូង ហើយទាមទារឲ្យដោះលែង។ ឈានដល់ ២៧០ វុល សំលេងស្រែកមិនអាចទ្រាំបាន។ ឈានដល់ ៣៣០ វុល ស្ងាត់ស្ងៀមទាំងស្រុង ៖ ដូចជាសិស្សដួល។ គ្រូស្ទើរតែទាំងអស់ នៅពេលណាមួយ បានបែរទៅរកអ្នកវិទ្យាសាស្ត្រស្លៀកអាវពណ៌ស និងនិយាយថា «ខ្ញុំចង់ឈប់។ មានអ្វីខុសនឹងគាត់»។ អ្នកវិទ្យាសាស្ត្រនឹងឆ្លើយតែស្ងៀមៗដោយសំឡេងស្ងាត់ ដោយប្រើខ្សែនិយាយដែលរៀបចំទុកមុនក្នុងចំណោម ៤ ខ្សែ។"
              className="text-sm mb-4"
            />
            <ScientistPrompts k={k} />
          </ChalkPanel>
        </section>

        {/* CHAPTER 3 — Results & Agentic State */}
        <section className="mb-12">
          <H2 num={3} k={k} en="The terrifying truth" kh="ការពិតដ៏គួរឱ្យខ្លាច" Icon={AlertTriangle} accent={ALERT} />
          <P
            k={k}
            en="Before running the experiment, Milgram surveyed psychiatrists, doctors and ordinary college students. He asked them to predict the outcome. Almost everyone agreed: maybe one or two pathological subjects out of every hundred would push all the way to 450 volts. Less than 1 %. The rest would walk out long before. The actual results, when the data finally came in, did not just disappoint Milgram — they shook his hands. Sixty-five percent of perfectly ordinary, kind, decent, employed adults — the same kind of person you sit next to on a bus — pressed the maximum 450-volt switch, while believing they were causing serious harm to a stranger, simply because a man in a white coat told them to keep going."
            kh="មុនដំណើរការការពិសោធន៍ Milgram បានស្ទង់មតិវេជ្ជបណ្ឌិតផ្នែកវិកលចរិក វេជ្ជបណ្ឌិតទូទៅ និងសិស្សមហាវិទ្យាល័យធម្មតា។ គាត់បានសុំឲ្យពួកគេទាយលទ្ធផល។ ស្ទើរតែគ្រប់គ្នាយល់ស្រប ៖ ប្រហែលជាមនុស្សមានបញ្ហាចិត្តមួយឬពីរនាក់ក្នុងចំណោមមួយរយនឹងរុញរហូតដល់ ៤៥០ វុល។ តិចជាង ១%។ ឯទៀតនឹងដើរចេញយូរមុនពេលនោះ។ លទ្ធផលពិតប្រាកដ នៅពេលទិន្នន័យទៅដល់ មិនត្រឹមតែធ្វើឲ្យ Milgram ខកចិត្តទេ — វាបានធ្វើឲ្យដៃរបស់គាត់ញ័រ។ ហុកសិបប្រាំភាគរយនៃមនុស្សពេញវ័យធម្មតា ល្អ មានទំនួលខុសត្រូវ និងមានការងារ — ប្រភេទមនុស្សដែលអ្នកអង្គុយជាប់នៅលើឡានក្រុង — បានចុចប៊ូតុង ៤៥០ វុលអតិបរមា ខណៈជឿថាខ្លួនកំពុងធ្វើអោយជនចម្លែកម្នាក់រងគ្រោះធ្ងន់ធ្ងរ ដោយគ្រាន់តែបុរសស្លៀកអាវពណ៌សប្រាប់ឲ្យបន្ត។"
            className="-mt-2 mb-5"
          />

          <ClinicalPanel accent={ALERT} testId="results-panel">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Tag k={k} en="Results · 40 ordinary subjects" kh="លទ្ធផល · មនុស្សធម្មតា ៤០ នាក់" accent={ALERT} />
            </div>
            <MilgramResultsBar k={k} />
            <P
              k={k}
              en="Read those bars again. Two-thirds of perfectly normal people — your neighbours, your colleagues, your relatives — went all the way. None of the 40 stopped before 300 volts. Not a single one walked out the door at the first protest. The experiment did not reveal who is evil; it revealed how thin, in every one of us, the line really is."
              kh="អានរបារទាំងនោះម្ដងទៀត។ ពីរភាគបីនៃមនុស្សធម្មតា — អ្នកជិតខាងរបស់អ្នក សហការី សាច់ញាតិ — បានទៅរហូតដល់ចុង។ គ្មាននរណាម្នាក់ក្នុងចំណោម ៤០ នាក់បានឈប់មុន ៣០០ វុលទេ។ គ្មាននរណាម្នាក់ដើរចេញពីទ្វារនៅពេលប្រឆាំងលើកដំបូង។ ការពិសោធន៍មិនបានបង្ហាញថានរណាជាមនុស្សអាក្រក់ទេ ; វាបានបង្ហាញថាខ្សែបន្ទាត់ស្ដើងណាស់ក្នុងយើងម្នាក់ៗ។"
              className="text-sm mt-4"
              light
            />
          </ClinicalPanel>

          {/* Agentic State */}
          <ChalkPanel accent={VIOLET} className="mt-5" testId="agentic-panel">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Brain className="w-5 h-5" style={{ color: VIOLET }} />
              <Tag k={k} en="Milgram's theory" kh="ទ្រឹស្ដីរបស់ Milgram" accent={VIOLET} light />
              <h3 className={`text-xl font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                {k ? "ស្ថានភាពធ្វើតាមបញ្ជា (Agentic State)" : "The Agentic State"}
              </h3>
            </div>
            <P
              k={k}
              en="Milgram's explanation was that the human mind has two operating modes. In the autonomous state, you act on your own values — you feel responsible for what you do. In the agentic state, you have surrendered to an authority and now see yourself as merely the instrument of someone else's wishes. Your hand pulls the lever, but you no longer feel that you pulled it; the scientist did, the institution did, the system did. The same act, the same nervous system, but the moral switch has flipped: 'I was just following orders' is not an excuse — it is, eerily, what the brain actually feels."
              kh="ការពន្យល់របស់ Milgram គឺថា ខួរក្បាលមនុស្សមានមុខងារពីរ។ ក្នុងស្ថានភាពស្វយ័ត អ្នកធ្វើសកម្មភាពតាមតម្លៃផ្ទាល់ខ្លួន — អ្នកមានអារម្មណ៍ទទួលខុសត្រូវលើអ្វីដែលអ្នកធ្វើ។ ក្នុងស្ថានភាពធ្វើតាមបញ្ជា អ្នកបានចុះចាញ់នឹងអំណាច និងមើលឃើញខ្លួនឯងជាគ្រាន់តែឧបករណ៍សម្រាប់បំណងរបស់នរណាម្នាក់ផ្សេងទៀត។ ដៃរបស់អ្នកទាញដៃកាន់ ប៉ុន្តែអ្នកលែងមានអារម្មណ៍ថាខ្លួនបានទាញ ; អ្នកវិទ្យាសាស្ត្រ ស្ថាប័ន ឬប្រព័ន្ធបានទាញ។ សកម្មភាពដូចគ្នា ប្រព័ន្ធសរសៃប្រសាទដូចគ្នា ប៉ុន្តែស្វិចសីលធម៌បានបិទបើក ៖ «ខ្ញុំគ្រាន់តែធ្វើតាមបញ្ជា» មិនមែនជាការដោះសារទេ — តាមរបៀបគួរឲ្យខ្លាច វាជាអ្វីដែលខួរក្បាលមានអារម្មណ៍ពិតប្រាកដ។"
              className="text-sm mb-4"
            />
            <AgenticStateDiagram k={k} />
          </ChalkPanel>
        </section>

        {/* CHAPTER 4 — Antidote */}
        <section className="mb-12">
          <H2 num={4} k={k} en="The antidote: critical thinking" kh="ដំណោះស្រាយ ៖ ការគិតពិចារណា" Icon={ShieldCheck} accent={TEAL} />
          <P
            k={k}
            en="It would be wrong to read these experiments and conclude that all obedience is bad. A society that obeys nothing falls apart in a week. We need traffic to stop at red lights, surgeons to follow sterile procedure, judges to follow the law, soldiers to follow rules of engagement. Obedience is the social glue. The danger is not obedience itself — it is blind obedience, the kind that switches off the moral check before the action is taken. The defence is small, unglamorous, and surprisingly difficult: critical thinking, plus the willingness to be the only person in the room who says 'No.'"
            kh="វាខុសណាស់ បើអានការពិសោធន៍ទាំងនេះ និងសន្និដ្ឋានថាការស្តាប់បង្គាប់ទាំងអស់អាក្រក់។ សង្គមដែលមិនស្តាប់បង្គាប់អ្វីសោះ នឹងបាក់បែកក្នុងមួយសប្ដាហ៍។ យើងត្រូវការចរាចរណ៍ឈប់ត្រង់ភ្លើងក្រហម គ្រូពេទ្យវះកាត់ធ្វើតាមនីតិវិធីស្អាត ចៅក្រមធ្វើតាមច្បាប់ ទាហានធ្វើតាមច្បាប់ប្រយុទ្ធ។ ការស្តាប់បង្គាប់ជាជ័រសង្គម។ គ្រោះថ្នាក់មិនមែនជាការស្តាប់បង្គាប់ដោយខ្លួនឯងទេ — វាជាការស្តាប់បង្គាប់ងងឹត ប្រភេទដែលបិទស្វិចសីលធម៌មុនពេលធ្វើសកម្មភាព។ ការការពារគឺតូច មិនទាក់ទាញ និងពិបាកគួរឲ្យភ្ញាក់ផ្អើល ៖ ការគិតពិចារណា ព្រមជាមួយការហ៊ានជាមនុស្សតែម្នាក់គត់ក្នុងបន្ទប់ដែលនិយាយថា «ទេ»។"
            className="-mt-2 mb-5"
          />

          <div className="grid lg:grid-cols-2 gap-5">
            <ClinicalPanel accent={TEAL} testId="good-obedience-panel">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <CheckCircle2 className="w-5 h-5" style={{ color: TEAL }} />
                <Tag k={k} en="Useful obedience" kh="ការស្តាប់បង្គាប់មានប្រយោជន៍" accent={TEAL} />
              </div>
              <h3 className={`text-lg font-bold mb-3 ${k ? "font-khmer" : ""}`} style={{ color: INK_DARK }}>
                {k ? "ការស្តាប់ដែលរក្សាសង្គមឲ្យដំណើរការ" : "Obedience that keeps society running"}
              </h3>
              <ObedienceList k={k} kind="good" />
            </ClinicalPanel>

            <ClinicalPanel accent={ALERT} testId="bad-obedience-panel">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <XCircle className="w-5 h-5" style={{ color: ALERT }} />
                <Tag k={k} en="Blind obedience" kh="ការស្តាប់បង្គាប់ងងឹត" accent={ALERT} />
              </div>
              <h3 className={`text-lg font-bold mb-3 ${k ? "font-khmer" : ""}`} style={{ color: INK_DARK }}>
                {k ? "ការស្តាប់ដែលគ្រោះថ្នាក់ដល់មនុស្ស" : "Obedience that endangers people"}
              </h3>
              <ObedienceList k={k} kind="bad" />
            </ClinicalPanel>
          </div>

          <ClinicalPanel accent={TEAL} className="mt-5" testId="checklist-panel">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <ScrollText className="w-5 h-5" style={{ color: TEAL }} />
              <h3 className={`text-base font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK_DARK }}>
                {k ? "ឧបករណ៍ ៥ ៖ មុនពេលធ្វើតាមបញ្ជា សួរសំណួរទាំងនេះ" : "Five-question kit: ask these before you obey"}
              </h3>
            </div>
            <CriticalThinkingChecklist k={k} />
          </ClinicalPanel>

          {/* Moral courage */}
          <ChalkPanel accent={TEAL} className="mt-5" testId="moral-courage-panel">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: TEAL }} />
              <p className={`text-xs ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK_SOFT }}>
                {k
                  ? "Milgram បានកត់សម្គាល់រឿងមួយផ្សេងទៀត ៖ ប្រសិនបើតួមួយផ្សេងទៀតក្នុងបន្ទប់ឈរឡើង និងនិយាយថា «ទេ ខ្ញុំបញ្ឈប់» — អត្រាស្តាប់បង្គាប់ធ្លាក់ពី ៦៥% មកនៅត្រឹម ១០%។ មនុស្សតែម្នាក់គត់ដែលហ៊ានបើកមាត់ផ្ដល់សិទ្ធិឲ្យអ្នកដទៃ។ នេះជាមូលហេតុដែលភាពក្លាហានសីលធម៌មិនត្រឹមតែការពារខ្លួនឯងទេ — វាក៏រំដោះអ្នកដទៃផងដែរ។ ការក្រឡេកមើលអំណាច និងសួរថា «ហេតុអ្វី?» គឺជាប្រព័ន្ធការពារដ៏សំខាន់បំផុតរបស់សង្គម។"
                  : "Milgram noticed one more thing: if even one other person in the room stood up and said 'No, I'm stopping' — the obedience rate collapsed from 65 % to about 10 %. The single person willing to speak first gives everyone else permission. That is why moral courage is not just self-protection — it liberates others, too. Looking authority in the eye and asking 'Why?' is, quietly, the most important defence system a society has."}
              </p>
            </div>
          </ChalkPanel>
        </section>

        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-opacity hover:opacity-90 ${k ? "font-khmer" : ""}`}
            style={{ backgroundColor: ALERT, color: PANEL, boxShadow: `0 0 28px -10px ${ALERT}` }}
          >
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Hero backdrop — clipboard grid + alert pulse
// ════════════════════════════════════════════════════════════════════════════
function LabBackdrop() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
      viewBox="0 0 460 240"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="lbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ALERT} stopOpacity="0.5" />
          <stop offset="60%" stopColor={VIOLET} stopOpacity="0.18" />
          <stop offset="100%" stopColor={ALERT} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="60" r="70" fill="url(#lbGlow)">
        <animate attributeName="r" values="60;90;60" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="380" cy="200" r="80" fill="url(#lbGlow)">
        <animate attributeName="r" values="70;100;70" dur="6s" repeatCount="indefinite" />
      </circle>
      {/* clipboard rules across the hero */}
      {[40, 80, 120, 160, 200].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="460" y2={y} stroke={`${INK_SOFT}33`} strokeWidth="0.5" strokeDasharray="6 4" />
      ))}
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Asch line cards
// ════════════════════════════════════════════════════════════════════════════
function AschLineCards({ k }: { k: boolean }) {
  return (
    <div className="rounded-xl border p-3" style={{ backgroundColor: PANEL_2, borderColor: LINE_DARK }}>
      <svg
        viewBox="0 0 460 240"
        className="w-full h-auto"
        role="img"
        aria-label={k ? "ការពិសោធន៍បន្ទាត់ Asch ៖ ប័ណ្ណគំរូជាមួយបន្ទាត់មួយ និងប័ណ្ណជម្រើសជាមួយបន្ទាត់ A B និង C" : "Asch line experiment: a reference card with one line and a comparison card with lines A, B, and C"}
      >
        {/* Reference card */}
        <g>
          <rect x="20" y="30" width="170" height="180" rx="8" fill={CHALK} stroke={INK_DARK} strokeWidth="1.4" />
          <text x="105" y="50" textAnchor="middle" fontSize="10" fontWeight="bold" fill={INK_SOFT_DARK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ប័ណ្ណគំរូ" : "REFERENCE CARD"}
          </text>
          <line x1="105" y1="80" x2="105" y2="190" stroke={INK_DARK} strokeWidth="6" strokeLinecap="square" />
          <text x="105" y="208" textAnchor="middle" fontSize="9" fill={INK_SOFT_DARK} fontFamily="monospace">
            {k ? toKhNum(110) + " mm" : "110 mm"}
          </text>
        </g>

        {/* Comparison card */}
        <g>
          <rect x="220" y="30" width="220" height="180" rx="8" fill={CHALK} stroke={INK_DARK} strokeWidth="1.4" />
          <text x="330" y="50" textAnchor="middle" fontSize="10" fontWeight="bold" fill={INK_SOFT_DARK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ប័ណ្ណជម្រើស" : "COMPARISON CARD"}
          </text>
          {/* Line A — too short */}
          <line x1="260" y1="100" x2="260" y2="190" stroke={INK_DARK} strokeWidth="6" strokeLinecap="square" />
          <text x="260" y="208" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK_DARK} fontFamily="monospace">A</text>
          {/* Line B — exact match */}
          <line x1="330" y1="80" x2="330" y2="190" stroke={INK_DARK} strokeWidth="6" strokeLinecap="square" />
          <text x="330" y="208" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK_DARK} fontFamily="monospace">B</text>
          {/* Line C — too long */}
          <line x1="400" y1="65" x2="400" y2="190" stroke={INK_DARK} strokeWidth="6" strokeLinecap="square" />
          <text x="400" y="208" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK_DARK} fontFamily="monospace">C</text>

          {/* Truth marker on B */}
          <g transform="translate(330,72)">
            <circle r="10" fill={TEAL} />
            <path d="M -5 0 L -1 4 L 5 -4" stroke={CHALK} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <text x="330" y="20" textAnchor="middle" fontSize="9" fontWeight="bold" fill={TEAL} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ការពិត" : "TRUTH"}
          </text>

          {/* Group answer marker on C */}
          <g transform="translate(400,57)">
            <circle r="10" fill={ALERT} />
            <text x="0" y="3" textAnchor="middle" fontSize="11" fontWeight="bold" fill={CHALK}>!</text>
          </g>
          <text x="400" y="20" textAnchor="middle" fontSize="9" fontWeight="bold" fill={ALERT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ក្រុមនិយាយ" : "GROUP SAYS"}
          </text>
        </g>

        {/* Connecting arrow */}
        <line x1="195" y1="140" x2="215" y2="140" stroke={INK_SOFT_DARK} strokeWidth="1" />
        <polygon points="215,140 207,135 207,145" fill={INK_SOFT_DARK} />
      </svg>

      {/* Eight-seat round table */}
      <div className="mt-4 flex flex-col items-center">
        <div className={`text-[11px] mb-2 ${k ? "font-khmer" : "uppercase font-mono tracking-widest"}`} style={{ color: INK_SOFT_DARK }}>
          {k ? "ជុំវិញតុ ៖ តួសម្ងាត់ ៧ + មនុស្សពិត ១" : "Around the table: 7 actors + 1 real subject"}
        </div>
        <svg viewBox="0 0 240 120" className="w-full max-w-sm h-auto" role="img" aria-label={k ? "តុមូលដែលមានកៅអី ៨ ៖ កៅអី ៧ ជាតួសម្ងាត់ ហើយ ១ ជាមនុស្សពិត" : "Round table with 8 seats: 7 are actors and 1 is the real subject"}>
          <ellipse cx="120" cy="60" rx="70" ry="32" fill={`${INK_SOFT_DARK}11`} stroke={INK_SOFT_DARK} strokeWidth="1.2" />
          <text x="120" y="64" textAnchor="middle" fontSize="9" fill={INK_SOFT_DARK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "តុ" : "TABLE"}
          </text>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
            const cx = 120 + Math.cos(angle) * 90;
            const cy = 60 + Math.sin(angle) * 45;
            const isReal = i === 7;
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r="9" fill={isReal ? TEAL : ALERT} stroke={CHALK} strokeWidth="1.2" />
                <text x={cx} y={cy + 3} textAnchor="middle" fontSize="9" fontWeight="bold" fill={CHALK} fontFamily="monospace">
                  {isReal ? "?" : "C"}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="mt-2 flex gap-4 text-[10px]">
          <span className="inline-flex items-center gap-1.5" style={{ color: ALERT }}>
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: ALERT }} />
            <span className={k ? "font-khmer" : ""}>{k ? "តួសម្ងាត់និយាយ «C»" : "actor says 'C'"}</span>
          </span>
          <span className="inline-flex items-center gap-1.5" style={{ color: TEAL }}>
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: TEAL }} />
            <span className={k ? "font-khmer" : ""}>{k ? "មនុស្សពិត" : "real subject"}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Milgram lab diagram — three-room layout
// ════════════════════════════════════════════════════════════════════════════
function MilgramLabDiagram({ k }: { k: boolean }) {
  return (
    <div className="rounded-xl border p-3" style={{ backgroundColor: PANEL_2, borderColor: LINE_DARK }}>
      <svg viewBox="0 0 460 230" className="w-full h-auto" role="img" aria-label={k ? "ប្លង់បន្ទប់ពិសោធន៍ Milgram ៖ អ្នកវិទ្យាសាស្ត្រ និងគ្រូនៅខាងម្ខាងជញ្ជាំង សិស្សនៅខាងម្ខាងទៀត" : "Milgram lab layout: scientist and teacher on one side of a wall, learner on the other"}>
        {/* Outer room outline */}
        <rect x="20" y="20" width="420" height="190" fill={CHALK} stroke={INK_DARK} strokeWidth="1.4" rx="6" />

        {/* Dividing wall */}
        <line x1="270" y1="20" x2="270" y2="210" stroke={INK_DARK} strokeWidth="3" />
        {/* "wall" label */}
        <text x="270" y="14" textAnchor="middle" fontSize="9" fill={INK_SOFT_DARK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ជញ្ជាំង" : "wall"}
        </text>

        {/* Left room: Scientist + Teacher */}
        <text x="145" y="40" textAnchor="middle" fontSize="10" fontWeight="bold" fill={INK_SOFT_DARK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "បន្ទប់សង្កេត" : "OBSERVATION ROOM"}
        </text>

        {/* Scientist figure */}
        <g transform="translate(70,90)">
          {/* white coat body */}
          <rect x="-16" y="0" width="32" height="40" rx="4" fill={CHALK} stroke={VIOLET} strokeWidth="1.6" />
          <line x1="0" y1="0" x2="0" y2="40" stroke={VIOLET} strokeWidth="1" />
          {/* head */}
          <circle cx="0" cy="-12" r="11" fill={`${VIOLET}33`} stroke={VIOLET} strokeWidth="1.4" />
          {/* clipboard in hand */}
          <rect x="18" y="14" width="14" height="18" rx="1" fill={`${VIOLET}22`} stroke={VIOLET} strokeWidth="1" />
          <line x1="20" y1="20" x2="30" y2="20" stroke={VIOLET} strokeWidth="0.6" />
          <line x1="20" y1="24" x2="30" y2="24" stroke={VIOLET} strokeWidth="0.6" />
          <line x1="20" y1="28" x2="28" y2="28" stroke={VIOLET} strokeWidth="0.6" />
          <text x="0" y="62" textAnchor="middle" fontSize="9" fontWeight="bold" fill={VIOLET} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "អ្នកវិទ្យាសាស្ត្រ" : "scientist"}
          </text>
          <text x="0" y="74" textAnchor="middle" fontSize="8" fill={INK_SOFT_DARK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "(អំណាច)" : "(authority)"}
          </text>
        </g>

        {/* Teacher figure */}
        <g transform="translate(180,90)">
          <rect x="-14" y="0" width="28" height="40" rx="4" fill={`${STEEL}22`} stroke={STEEL} strokeWidth="1.4" />
          <circle cx="0" cy="-12" r="11" fill={`${STEEL}33`} stroke={STEEL} strokeWidth="1.4" />
          <text x="0" y="62" textAnchor="middle" fontSize="9" fontWeight="bold" fill={STEEL} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "គ្រូ (មនុស្សពិត)" : "teacher (real)"}
          </text>
          <text x="0" y="74" textAnchor="middle" fontSize="8" fill={INK_SOFT_DARK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "នៅខាងឌីសក្រ" : "at the dial"}
          </text>
        </g>

        {/* Shock generator box on the table */}
        <g transform="translate(220,118)">
          <rect x="-6" y="0" width="34" height="22" rx="2" fill={INK_DARK} stroke={ALERT} strokeWidth="1.4" />
          <circle cx="11" cy="11" r="7" fill={ALERT} stroke={CHALK} strokeWidth="1" />
          <line x1="11" y1="11" x2="16" y2="6" stroke={CHALK} strokeWidth="1.4" />
          <text x="11" y="32" textAnchor="middle" fontSize="7" fill={ALERT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ឌីសក្រ" : "dial"}
          </text>
        </g>

        {/* Wires through the wall */}
        <path d="M 240 130 C 260 130, 270 130, 280 130 L 350 130" stroke={ALERT} strokeWidth="1.4" strokeDasharray="3 2" fill="none" />
        <text x="305" y="124" textAnchor="middle" fontSize="8" fontWeight="bold" fill={ALERT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ខ្សែឆក់" : "shock wires"}
        </text>

        {/* Right room: Learner */}
        <text x="370" y="40" textAnchor="middle" fontSize="10" fontWeight="bold" fill={INK_SOFT_DARK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "បន្ទប់សិស្ស" : "LEARNER ROOM"}
        </text>

        {/* Learner strapped to chair */}
        <g transform="translate(370,110)">
          {/* chair back */}
          <rect x="-22" y="-10" width="44" height="60" rx="3" fill={`${ALERT}11`} stroke={ALERT} strokeWidth="1.2" />
          {/* head */}
          <circle cx="0" cy="-20" r="11" fill={`${ALERT}22`} stroke={ALERT} strokeWidth="1.4" />
          {/* body */}
          <rect x="-12" y="-8" width="24" height="34" rx="3" fill={`${ALERT}33`} stroke={ALERT} strokeWidth="1" />
          {/* arm-strap */}
          <line x1="-22" y1="0" x2="22" y2="0" stroke={ALERT} strokeWidth="1.2" />
          <line x1="-22" y1="14" x2="22" y2="14" stroke={ALERT} strokeWidth="1.2" />
          {/* electrode pad */}
          <rect x="-18" y="6" width="6" height="6" fill={ALERT} />
          <text x="0" y="62" textAnchor="middle" fontSize="9" fontWeight="bold" fill={ALERT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "សិស្ស (តួ)" : "learner (actor)"}
          </text>
          <text x="0" y="74" textAnchor="middle" fontSize="8" fill={INK_SOFT_DARK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ភ្ជាប់ខ្សែឆក់ក្លែង" : "wired to fake shocks"}
          </text>
        </g>

        {/* Speech bubble: scream */}
        <g transform="translate(345,55)">
          <ellipse cx="0" cy="0" rx="34" ry="14" fill={CHALK} stroke={ALERT} strokeWidth="1.2" />
          <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="bold" fill={ALERT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ឈប់សិន!" : "STOP!"}
          </text>
          <polygon points="-5,12 5,12 0,20" fill={CHALK} stroke={ALERT} strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Shock generator dial — graded volt scale 15→450
// ════════════════════════════════════════════════════════════════════════════
function ShockGeneratorDial({ k }: { k: boolean }) {
  const stops = [
    { v: 15,  en: "Slight",        kh: "ស្រាល",          color: TEAL },
    { v: 75,  en: "Moderate",      kh: "មធ្យម",          color: TEAL },
    { v: 135, en: "Strong",        kh: "ខ្លាំង",          color: AMBER },
    { v: 195, en: "Very Strong",   kh: "ខ្លាំងណាស់",      color: AMBER },
    { v: 255, en: "Intense",       kh: "ហួសហេតុ",         color: ALERT },
    { v: 315, en: "Extreme",       kh: "ខ្លាំងបំផុត",     color: ALERT },
    { v: 375, en: "Danger Severe", kh: "គ្រោះថ្នាក់ធ្ងន់", color: ALERT_DK },
    { v: 450, en: "XXX",           kh: "XXX",            color: ALERT_DK },
  ];

  return (
    <div className="rounded-xl border p-3" style={{ backgroundColor: PANEL_2, borderColor: LINE_DARK }}>
      <svg viewBox="0 0 460 200" className="w-full h-auto" role="img" aria-label={k ? "ឌីសក្រឆក់ ៖ ៣០ ស្វិចពី ១៥ វុលដល់ ៤៥០ វុល មានស្លាកស្រាល មធ្យម ខ្លាំង គ្រោះថ្នាក់ធ្ងន់ ខូ ខូ ខូ" : "Shock dial: 30 switches from 15 to 450 volts, labelled slight, moderate, strong, danger severe, XXX"}>
        {/* base */}
        <rect x="20" y="40" width="420" height="100" rx="8" fill={INK_DARK} stroke={INK_DARK} strokeWidth="1" />

        {/* 30 switches in a strip */}
        {Array.from({ length: 30 }).map((_, i) => {
          const x = 30 + i * 13;
          let color = TEAL;
          if (i >= 4 && i < 12) color = AMBER;
          else if (i >= 12 && i < 24) color = ALERT;
          else if (i >= 24) color = ALERT_DK;
          return (
            <g key={i}>
              <rect x={x} y="62" width="9" height="20" rx="1" fill={color} opacity={0.85} />
              <text x={x + 4.5} y="58" textAnchor="middle" fontSize="6" fill={INK_SOFT} fontFamily="monospace">
                {(i + 1) * 15}
              </text>
            </g>
          );
        })}

        {/* Sliding indicator */}
        <g>
          <line x1="30" y1="92" x2="425" y2="92" stroke={INK_SOFT} strokeWidth="0.6" />
          <polygon points="412,92 422,86 422,98" fill={ALERT}>
            <animate attributeName="points" values="30,92 40,86 40,98; 412,92 422,86 422,98; 412,92 422,86 422,98" dur="6s" repeatCount="indefinite" />
          </polygon>
        </g>

        {/* Stop labels under */}
        {stops.map((s, i) => {
          const x = 30 + (s.v / 15 - 1) * 13 + 4.5;
          return (
            <g key={i}>
              <line x1={x} y1="110" x2={x} y2="118" stroke={s.color} strokeWidth="1.4" />
              <text x={x} y="130" textAnchor="middle" fontSize="8" fontWeight="bold" fill={s.color} fontFamily="monospace">
                {k ? toKhNum(s.v) : s.v} V
              </text>
              <text x={x} y="142" textAnchor="middle" fontSize="7" fill={s.color} fontFamily={k ? "Hanuman, serif" : "monospace"}>
                {k ? s.kh : s.en}
              </text>
            </g>
          );
        })}

        {/* XXX warning at end */}
        <g>
          <rect x="395" y="155" width="55" height="30" rx="3" fill={ALERT_DK} stroke={ALERT_DK} strokeWidth="1.4" />
          <text x="422" y="170" textAnchor="middle" fontSize="11" fontWeight="bold" fill={CHALK} fontFamily="monospace">450 V</text>
          <text x="422" y="180" textAnchor="middle" fontSize="8" fontWeight="bold" fill={CHALK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ខ្លាំងបំផុត XXX" : "XXX"}
          </text>
        </g>
      </svg>
      <div className={`text-[10px] mt-2 text-center italic ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT_DARK }}>
        {k
          ? "ស្វិច ៣០ — ការកើនតង់ស្យុង ១៥ វុលរាល់ការខុស — ស្លាកលើឡើងពីស្រាលទៅ «XXX»។"
          : "30 switches — voltage rises by 15 V per error — labels climb from 'slight' to 'XXX'."}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Scientist's four scripted prompts
// ════════════════════════════════════════════════════════════════════════════
function ScientistPrompts({ k }: { k: boolean }) {
  const prompts = [
    { en: "Please continue.",                                         kh: "សូមបន្ត។" },
    { en: "The experiment requires that you continue.",               kh: "ការពិសោធន៍ទាមទារឲ្យអ្នកបន្ត។" },
    { en: "It is absolutely essential that you continue.",            kh: "វាចាំបាច់បំផុតដែលអ្នកត្រូវបន្ត។" },
    { en: "You have no other choice. You must go on.",                kh: "អ្នកគ្មានជម្រើសផ្សេងទេ។ អ្នកត្រូវតែបន្ត។" },
  ];
  return (
    <div className="space-y-2" data-testid="scientist-prompts">
      {prompts.map((p, i) => (
        <div
          key={i}
          className="rounded-lg p-3 border-l-4 flex items-start gap-3"
          style={{ backgroundColor: "#0a0d12", borderColor: VIOLET }}
        >
          <span
            className="font-mono font-extrabold text-xs px-2 py-0.5 rounded"
            style={{ backgroundColor: VIOLET, color: BG }}
          >
            {k ? toKhNum(i + 1) : i + 1}
          </span>
          <p className={`text-sm italic ${k ? "font-khmer leading-loose" : ""}`} style={{ color: INK }}>
            “{k ? p.kh : p.en}”
          </p>
        </div>
      ))}
      <div className={`text-[11px] mt-2 italic ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
        {k
          ? "បន្ទាត់ទាំង ៤ — ស្ងាត់ ស្ងួត គ្មានការគំរាមកំហែង។ មិនមានការដាក់ទោសទេ ប៉ុន្តែ ៦៥% នៃគ្រូបន្ត។"
          : "Four lines — calm, flat, no threats. No punishment was offered, but 65 % of Teachers kept going."}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Milgram results — bar chart of how far each subject went
// ════════════════════════════════════════════════════════════════════════════
function MilgramResultsBar({ k }: { k: boolean }) {
  // Approximate buckets from Milgram's original 1963 study (n=40)
  const buckets = [
    { range: "15–135 V",   en: "stopped early",      kh: "ឈប់មុន",         count: 0,  color: TEAL },
    { range: "150–285 V",  en: "stopped after protest", kh: "ឈប់ក្រោយប្រឆាំង", count: 0,  color: TEAL },
    { range: "300 V",      en: "stopped at scream",  kh: "ឈប់ពេលស្រែក",     count: 5,  color: AMBER },
    { range: "315–375 V",  en: "stopped late",       kh: "ឈប់យឺត",          count: 9,  color: ALERT },
    { range: "450 V",      en: "went all the way",   kh: "បន្តរហូតអស់",     color: ALERT_DK, count: 26 },
  ];
  const total = buckets.reduce((s, b) => s + b.count, 0);
  return (
    <div className="rounded-xl border p-4" style={{ backgroundColor: PANEL_2, borderColor: LINE_DARK }}>
      <div className="space-y-2.5" data-testid="results-bars">
        {buckets.map((b, i) => {
          const pct = (b.count / total) * 100;
          return (
            <div key={i}>
              <div className="flex justify-between items-baseline mb-1 flex-wrap gap-2">
                <span className={`text-[12px] font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK_DARK }}>
                  <span className="font-mono">{k ? toKhNum(b.range) : b.range}</span>
                  <span className="ml-2 font-normal" style={{ color: INK_SOFT_DARK }}>
                    {k ? `(${b.kh})` : `(${b.en})`}
                  </span>
                </span>
                <span className="font-mono text-sm font-extrabold" style={{ color: b.color }}>
                  {k ? toKhNum(b.count) : b.count} / {k ? toKhNum(total) : total} · {k ? toKhNum(Math.round(pct)) : Math.round(pct)}%
                </span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: "#e2e8f0" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${b.color}aa, ${b.color})`,
                    boxShadow: `0 0 6px ${b.color}55`,
                  }}
                  role="progressbar"
                  aria-valuenow={b.count}
                  aria-valuemin={0}
                  aria-valuemax={total}
                  aria-label={k ? `${b.range} ${b.kh}` : `${b.range} ${b.en}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Big 65% headline */}
      <div className="mt-5 grid sm:grid-cols-2 gap-3">
        <div className="rounded-lg p-4 border-l-4" style={{ backgroundColor: "#fef2f2", borderColor: ALERT }}>
          <div className="text-4xl font-extrabold font-mono" style={{ color: ALERT }}>
            {k ? toKhNum(65) : 65}%
          </div>
          <div className={`text-xs mt-1 ${k ? "font-khmer" : ""}`} style={{ color: INK_DARK }}>
            {k ? "បានទៅរហូតដល់ ៤៥០ វុលអតិបរមា" : "went all the way to the maximum 450 V"}
          </div>
        </div>
        <div className="rounded-lg p-4 border-l-4" style={{ backgroundColor: "#fff8eb", borderColor: AMBER }}>
          <div className="text-4xl font-extrabold font-mono" style={{ color: AMBER }}>
            &lt; {k ? toKhNum(1) : 1}%
          </div>
          <div className={`text-xs mt-1 ${k ? "font-khmer" : ""}`} style={{ color: INK_DARK }}>
            {k ? "អ្វីដែលអ្នកជំនាញបានទាយមុនការពិសោធន៍" : "what experts predicted before the experiment"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Agentic state diagram — autonomous vs agentic mind
// ════════════════════════════════════════════════════════════════════════════
function AgenticStateDiagram({ k }: { k: boolean }) {
  return (
    <div className="rounded-xl border p-3" style={{ backgroundColor: "#0a0d12", borderColor: `${VIOLET}55` }}>
      <svg viewBox="0 0 460 240" className="w-full h-auto" role="img" aria-label={k ? "ស្ថានភាពធ្វើតាមបញ្ជា ៖ ប្រៀបធៀបខួរក្បាលស្វយ័ត និងខួរក្បាលធ្វើតាមបញ្ជា" : "Agentic state: comparing the autonomous mind versus the agentic mind"}>
        {/* Two head silhouettes */}
        {/* LEFT — autonomous */}
        <g transform="translate(110,30)">
          <text x="0" y="0" textAnchor="middle" fontSize="11" fontWeight="bold" fill={TEAL} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ស្ថានភាពស្វយ័ត" : "AUTONOMOUS STATE"}
          </text>
          <ellipse cx="0" cy="65" rx="46" ry="50" fill={`${TEAL}22`} stroke={TEAL} strokeWidth="1.6" />
          {/* Brain interior with check icons */}
          <text x="0" y="50" textAnchor="middle" fontSize="11" fontWeight="bold" fill={TEAL} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "តម្លៃផ្ទាល់ខ្លួន" : "own values"}
          </text>
          <text x="0" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill={TEAL} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ការសម្រេចចិត្ត" : "judgement"}
          </text>
          <text x="0" y="86" textAnchor="middle" fontSize="11" fontWeight="bold" fill={TEAL} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ការទទួលខុសត្រូវ" : "responsibility"}
          </text>
          {/* Hand action */}
          <line x1="0" y1="115" x2="0" y2="155" stroke={TEAL} strokeWidth="2" />
          <circle cx="0" cy="170" r="12" fill={`${TEAL}33`} stroke={TEAL} strokeWidth="1.4" />
          <text x="0" y="174" textAnchor="middle" fontSize="11">✓</text>
          <text x="0" y="200" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "«ខ្ញុំទទួលខុសត្រូវ»" : "“I am responsible”"}
          </text>
        </g>

        {/* Center — switch / arrow */}
        <g transform="translate(230,100)">
          <rect x="-30" y="-12" width="60" height="24" rx="12" fill={`${VIOLET}22`} stroke={VIOLET} strokeWidth="1.2" />
          <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="bold" fill={VIOLET} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ឆ្លើយតបអំណាច" : "obey authority"}
          </text>
          <polygon points="30,0 22,-6 22,6" fill={VIOLET} />
          <line x1="-30" y1="0" x2="-38" y2="0" stroke={VIOLET} strokeWidth="1.4" />
          <polygon points="-38,0 -30,-6 -30,6" fill={VIOLET} />
        </g>

        {/* RIGHT — agentic */}
        <g transform="translate(350,30)">
          <text x="0" y="0" textAnchor="middle" fontSize="11" fontWeight="bold" fill={ALERT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ស្ថានភាពធ្វើតាមបញ្ជា" : "AGENTIC STATE"}
          </text>
          <ellipse cx="0" cy="65" rx="46" ry="50" fill={`${ALERT}22`} stroke={ALERT} strokeWidth="1.6" />
          <text x="0" y="50" textAnchor="middle" fontSize="11" fontWeight="bold" fill={ALERT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ឧបករណ៍" : "instrument"}
          </text>
          <text x="0" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill={ALERT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "តាមបញ្ជា" : "executes orders"}
          </text>
          <text x="0" y="86" textAnchor="middle" fontSize="11" fontWeight="bold" fill={ALERT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "គ្មានការទទួលខុសត្រូវ" : "no responsibility"}
          </text>
          {/* Hand action */}
          <line x1="0" y1="115" x2="0" y2="155" stroke={ALERT} strokeWidth="2" />
          <circle cx="0" cy="170" r="12" fill={`${ALERT}33`} stroke={ALERT} strokeWidth="1.4" />
          <text x="0" y="174" textAnchor="middle" fontSize="11">⚡</text>
          <text x="0" y="200" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "«ខ្ញុំគ្រាន់តែធ្វើតាមបញ្ជា»" : "“I'm just following orders”"}
          </text>
        </g>

        {/* Bottom caption */}
        <text x="230" y="232" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ដៃដូចគ្នា — ស្វិចសីលធម៌ខុសគ្នា" : "Same hand — different moral switch"}
        </text>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Obedience lists — good vs blind
// ════════════════════════════════════════════════════════════════════════════
function ObedienceList({ k, kind }: { k: boolean; kind: "good" | "bad" }) {
  const goodItems = [
    { en: "Stopping at a red traffic light",      kh: "ការឈប់ត្រង់ភ្លើងក្រហម" },
    { en: "Surgeons following sterile procedure", kh: "គ្រូពេទ្យវះកាត់ធ្វើតាមនីតិវិធីស្អាត" },
    { en: "Pilots following air-traffic control", kh: "អ្នកបើកយន្តហោះធ្វើតាមការគ្រប់គ្រងចរាចរណ៍ផ្លូវអាកាស" },
    { en: "Children learning road-crossing rules", kh: "កុមាររៀនច្បាប់ឆ្លងផ្លូវ" },
    { en: "Citizens paying taxes lawfully",       kh: "ប្រជាពលរដ្ឋបង់ពន្ធតាមច្បាប់" },
  ];
  const badItems = [
    { en: "Hurting a stranger because someone in a uniform said so", kh: "ធ្វើបាបជនចម្លែកព្រោះមនុស្សស្លៀកឯកសណ្ឋានប្រាប់" },
    { en: "Spreading false information from an authority figure",     kh: "ផ្សព្វផ្សាយព័ត៌មានមិនពិតពីអ្នកមានអំណាច" },
    { en: "Obeying a teacher who tells you to bully a classmate",     kh: "ស្តាប់គ្រូដែលប្រាប់ឲ្យបៀតបៀនមិត្តរួមថ្នាក់" },
    { en: "Carrying out cruel orders during war",                    kh: "ប្រតិបត្តិបញ្ជាដែលឃោរឃៅក្នុងសង្គ្រាម" },
    { en: "Continuing harmful work because 'it's just my job'",       kh: "បន្តការងារដែលបង្កគ្រោះថ្នាក់ព្រោះ «វាគ្រាន់តែជាការងាររបស់ខ្ញុំ»" },
  ];
  const items = kind === "good" ? goodItems : badItems;
  const accent = kind === "good" ? TEAL : ALERT;
  const Icon = kind === "good" ? CheckCircle2 : XCircle;

  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accent }} />
          <span
            className={`text-[12px] ${k ? "font-khmer leading-loose" : ""}`}
            style={{ color: INK_DARK }}
          >
            {k ? it.kh : it.en}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Critical-thinking checklist
// ════════════════════════════════════════════════════════════════════════════
function CriticalThinkingChecklist({ k }: { k: boolean }) {
  const qs = [
    {
      en: "Is the order lawful and ethical?",
      kh: "តើបញ្ជានេះស្របច្បាប់ និងត្រឹមត្រូវខាងសីលធម៌ឬទេ?",
    },
    {
      en: "Will someone be harmed if I obey?",
      kh: "តើនរណាម្នាក់នឹងត្រូវរងគ្រោះ បើខ្ញុំស្តាប់បង្គាប់?",
    },
    {
      en: "Do I have the same conscience inside and outside this room?",
      kh: "តើខ្ញុំមានសីលធម៌ដូចគ្នាទាំងក្នុង និងក្រៅបន្ទប់នេះ?",
    },
    {
      en: "Is the authority asking for power they don't actually have?",
      kh: "តើអ្នកមានអំណាចកំពុងសុំសិទ្ធិអំណាចដែលគេពិតជាគ្មានឬ?",
    },
    {
      en: "Am I willing to be the only voice that says 'No'?",
      kh: "តើខ្ញុំហ៊ានជាសំឡេងតែមួយគត់ដែលនិយាយ «ទេ»ឬទេ?",
    },
  ];
  return (
    <ol className="grid sm:grid-cols-2 gap-2 mt-2" data-testid="checklist">
      {qs.map((q, i) => (
        <li
          key={i}
          className="rounded-lg p-3 border flex items-start gap-3"
          style={{ backgroundColor: PANEL_2, borderColor: LINE_DARK }}
        >
          <span
            className="font-mono font-extrabold text-xs px-2 py-0.5 rounded flex-shrink-0"
            style={{ backgroundColor: TEAL, color: CHALK }}
          >
            {k ? toKhNum(i + 1) : i + 1}
          </span>
          <span
            className={`text-[12px] ${k ? "font-khmer leading-loose" : ""}`}
            style={{ color: INK_DARK }}
          >
            {k ? q.kh : q.en}
          </span>
        </li>
      ))}
    </ol>
  );
}

// keep helper-icon imports referenced
const _iconKeep: React.ComponentType[] = [Eye];
void _iconKeep;
