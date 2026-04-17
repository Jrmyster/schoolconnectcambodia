import { Link, useRoute } from "wouter";
import {
  Atom,
  Rocket,
  Magnet,
  Flame,
  Radio,
  ArrowRight,
  ArrowLeft,
  Compass,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type PhysicsModule = {
  slug: string;
  number: string;
  code: string; // engineering "spec sheet" code, e.g. "M-01"
  titleEn: string;
  titleKh: string;
  blurbEn: string;
  blurbKh: string;
  topicsEn: string[];
  topicsKh: string[];
  icon: React.ComponentType<{ className?: string }>;
  accent: {
    border: string;
    chipBorder: string;
    chipText: string;
    iconBg: string;
    title: string;
    code: string;
    glow: string;
  };
};

export const PHYSICS_MODULES: PhysicsModule[] = [
  {
    slug: "motion",
    number: "01",
    code: "M-01",
    titleEn: "Motion & Kinematics",
    titleKh: "ចលនា និងគីនេម៉ាទិច",
    blurbEn: "Learn how and why things move through space and time.",
    blurbKh: "រៀនពីរបៀប និងហេតុដែលវត្ថុមានចលនាឆ្លងកាត់លំហ និងពេលវេលា។",
    topicsEn: ["Speed", "Velocity", "Acceleration", "Trajectory"],
    topicsKh: ["ល្បឿន", "ល្បឿនវ៉ិចទ័រ", "សំទុះ", "គន្លងចលនា"],
    icon: Rocket,
    accent: {
      border: "border-cyan-300",
      chipBorder: "border-cyan-300/80",
      chipText: "text-cyan-800",
      iconBg: "bg-cyan-600",
      title: "text-cyan-900",
      code: "text-cyan-700",
      glow: "shadow-cyan-200/40",
    },
  },
  {
    slug: "forces",
    number: "02",
    code: "M-02",
    titleEn: "Forces & Newton's Laws",
    titleKh: "កម្លាំង និងច្បាប់ញូតុន",
    blurbEn:
      "Discover the invisible pushes and pulls that hold our world together.",
    blurbKh:
      "ស្វែងយល់ពីការរុញ និងការទាញដែលមើលមិនឃើញ ដែលរក្សាពិភពលោករបស់យើងឱ្យនៅជាមួយគ្នា។",
    topicsEn: ["Gravity", "Friction", "Inertia", "Action / Reaction"],
    topicsKh: ["ទំនាញ", "កកិត", "និយាមភាព", "សកម្មភាព / ប្រតិកម្ម"],
    icon: Magnet,
    accent: {
      border: "border-rose-300",
      chipBorder: "border-rose-300/80",
      chipText: "text-rose-800",
      iconBg: "bg-rose-600",
      title: "text-rose-900",
      code: "text-rose-700",
      glow: "shadow-rose-200/40",
    },
  },
  {
    slug: "energy",
    number: "03",
    code: "M-03",
    titleEn: "Energy & Thermodynamics",
    titleKh: "ថាមពល និងទែម៉ូឌីណាមិច",
    blurbEn:
      "Understand how energy is never lost, only transformed from one type to another.",
    blurbKh:
      "យល់ពីរបៀបដែលថាមពលមិនបាត់បង់ឡើយ គ្រាន់តែបំលែងពីប្រភេទមួយទៅប្រភេទមួយទៀត។",
    topicsEn: [
      "Kinetic Energy",
      "Potential Energy",
      "Heat Transfer",
      "Conservation of Energy",
    ],
    topicsKh: [
      "ថាមពលចលនា",
      "ថាមពលប៉ូតង់ស្យែល",
      "ការបញ្ជូនកម្តៅ",
      "ការអភិរក្សថាមពល",
    ],
    icon: Flame,
    accent: {
      border: "border-amber-300",
      chipBorder: "border-amber-300/80",
      chipText: "text-amber-800",
      iconBg: "bg-amber-600",
      title: "text-amber-900",
      code: "text-amber-700",
      glow: "shadow-amber-200/40",
    },
  },
  {
    slug: "waves",
    number: "04",
    code: "M-04",
    titleEn: "Waves, Sound & Light",
    titleKh: "រលក សំឡេង និងពន្លឺ",
    blurbEn:
      "Explore how energy travels through the air and the vacuum of space.",
    blurbKh:
      "ស្វែងយល់ពីរបៀបដែលថាមពលធ្វើដំណើរកាត់ខ្យល់ និងខ្យល់ទំនេរក្នុងលំហ។",
    topicsEn: [
      "Frequencies",
      "Optics",
      "Lenses",
      "Electromagnetic Spectrum",
    ],
    topicsKh: [
      "ប្រេកង់",
      "អុបទិក",
      "កែវ",
      "វិសាលគមអេឡិចត្រូម៉ាញេទិច",
    ],
    icon: Radio,
    accent: {
      border: "border-indigo-300",
      chipBorder: "border-indigo-300/80",
      chipText: "text-indigo-800",
      iconBg: "bg-indigo-600",
      title: "text-indigo-900",
      code: "text-indigo-700",
      glow: "shadow-indigo-200/40",
    },
  },
];

// Inline SVG blueprint grid — used as background image via data URI.
// Subtle indigo/cyan lines on transparent background.
const BLUEPRINT_BG: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  backgroundImage:
    "linear-gradient(rgba(14, 116, 144, 0.07) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(14, 116, 144, 0.07) 1px, transparent 1px), " +
    "linear-gradient(rgba(14, 116, 144, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(14, 116, 144, 0.04) 1px, transparent 1px)",
  backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
  backgroundPosition: "-1px -1px, -1px -1px, -1px -1px, -1px -1px",
};

const CARD_BG: React.CSSProperties = {
  backgroundColor: "#ffffff",
  backgroundImage:
    "linear-gradient(rgba(15, 23, 42, 0.035) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.035) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

export function PhysicsHubPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={BLUEPRINT_BG}>
      <div className="max-w-6xl mx-auto">
        {/* ── Hero — dark blueprint header card ─────────────────── */}
        <header
          className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-6 sm:px-10 py-9 sm:py-12 mb-10 shadow-lg"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56, 189, 248, 0.10) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(56, 189, 248, 0.10) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          {/* corner spec marks */}
          <CornerMarks />

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-500/10 border-2 border-cyan-400/60 text-cyan-300 flex items-center justify-center flex-shrink-0 shadow-inner">
              <Atom className="w-9 h-9 sm:w-10 sm:h-10" />
            </div>

            <div className="flex-1 min-w-0">
              <div
                className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-300/80 mb-2 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Science Hub", "មជ្ឈមណ្ឌលវិទ្យាសាស្ត្រ")}</span>
                <span className="opacity-50">/</span>
                <span>{t("Physics", "រូបវិទ្យា")}</span>
              </div>

              <h1
                className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${
                  kh ? "font-khmer leading-snug" : ""
                }`}
              >
                {t("Physics Hub", "មជ្ឈមណ្ឌលរូបវិទ្យា")}
              </h1>

              <p
                className={`mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {t(
                  "Discover the fundamental rules of the universe, from moving objects to the nature of light.",
                  "ស្វែងយល់ពីច្បាប់មូលដ្ឋាននៃសកលលោក ចាប់ពីវត្ថុមានចលនា រហូតដល់ធម្មជាតិនៃពន្លឺ។",
                )}
              </p>

              {/* spec line */}
              <div
                className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-slate-400 ${
                  kh ? "font-khmer text-xs" : ""
                }`}
              >
                <span>{t("MODULES: 04", "មុខវិជ្ជា៖ ០៤")}</span>
                <span className="opacity-40">|</span>
                <span>{t("LANG: EN / ខ្មែរ", "ភាសា៖ EN / ខ្មែរ")}</span>
                <span className="opacity-40">|</span>
                <span>{t("LEVEL: SECONDARY", "កម្រិត៖ មធ្យមសិក្សា")}</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Module grid ───────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {PHYSICS_MODULES.map((m) => (
            <ModuleCard key={m.slug} module={m} kh={kh} t={t} />
          ))}
        </div>

        {/* ── Footer ───────────────────────────────────────────── */}
        <p
          className={`mt-10 text-center text-xs sm:text-sm text-muted-foreground ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {t(
            "Pick any module to begin. New to physics? Module 1 (Motion) is the natural starting point.",
            "ជ្រើសរើសមុខវិជ្ជាណាមួយដើម្បីចាប់ផ្តើម។ ទើបនឹងស្គាល់រូបវិទ្យា? មុខវិជ្ជាទី ១ (ចលនា) គឺជាចំណុចចាប់ផ្តើមធម្មជាតិ។",
          )}
        </p>
      </div>
    </div>
  );
}

// ── Module card with blueprint styling ────────────────────────────────────
function ModuleCard({
  module: m,
  kh,
  t,
}: {
  module: PhysicsModule;
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const Icon = m.icon;
  return (
    <Link
      href={`/physics/${m.slug}`}
      className={`group relative block rounded-2xl border-2 ${m.accent.border} shadow-sm hover:shadow-lg ${m.accent.glow} hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current overflow-hidden`}
      style={CARD_BG}
    >
      <CornerMarks subtle />

      <div className="relative p-5 sm:p-6">
        <div className="flex items-start gap-4 mb-3">
          <div
            className={`w-12 h-12 rounded-xl ${m.accent.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-sm`}
          >
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase ${m.accent.code}`}
              >
                {m.code}
              </span>
              <span className="text-slate-300">·</span>
              <span
                className={`text-[10px] font-bold tracking-widest uppercase ${m.accent.title} opacity-70 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t(`Module ${m.number}`, `មុខវិជ្ជា ${m.number}`)}
              </span>
            </div>
            <h2
              className={`text-lg sm:text-xl font-bold ${m.accent.title} leading-tight ${
                kh ? "font-khmer" : ""
              }`}
            >
              {kh ? m.titleKh : m.titleEn}
            </h2>
          </div>
        </div>

        <p
          className={`text-sm text-foreground/80 leading-relaxed mb-4 ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {kh ? m.blurbKh : m.blurbEn}
        </p>

        <div className="border-t border-dashed border-slate-200 pt-3 mb-4">
          <div
            className={`text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t("Content focus", "មាតិកាសំខាន់")}
          </div>
          <ul className="flex flex-wrap gap-1.5" aria-label={kh ? "ប្រធានបទ" : "Topics"}>
            {(kh ? m.topicsKh : m.topicsEn).map((topic, i) => (
              <li
                key={i}
                className={`inline-block text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded border ${m.accent.chipBorder} ${m.accent.chipText} bg-white/60 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 text-sm font-bold ${m.accent.title} group-hover:gap-2 transition-all ${
            kh ? "font-khmer" : ""
          }`}
        >
          {t("Open module", "បើកមុខវិជ្ជា")}
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

// Decorative corner brackets — give the cards an "engineering drawing" feel
function CornerMarks({ subtle = false }: { subtle?: boolean }) {
  const stroke = subtle ? "border-slate-300/70" : "border-cyan-400/60";
  const size = subtle ? "w-3 h-3" : "w-4 h-4";
  return (
    <>
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 left-2 ${size} border-t-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 right-2 ${size} border-t-2 border-r-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 left-2 ${size} border-b-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 right-2 ${size} border-b-2 border-r-2 ${stroke}`} />
    </>
  );
}

// ── Placeholder module page (shared by all 4 module slugs) ────────────────
// Keeps card links functional and bilingual until the full lessons ship.
export function PhysicsModulePlaceholder() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [, params] = useRoute<{ slug: string }>("/physics/:slug");
  const slug = params?.slug ?? "";
  const m = PHYSICS_MODULES.find((x) => x.slug === slug);

  if (!m) {
    return (
      <div className="min-h-screen py-12 px-4" style={BLUEPRINT_BG}>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            {t("Module not found", "រកមិនឃើញមុខវិជ្ជា")}
          </h1>
          <Link
            href="/physics"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:text-cyan-900"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
          </Link>
        </div>
      </div>
    );
  }

  const Icon = m.icon;

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={BLUEPRINT_BG}>
      <div className="max-w-3xl mx-auto">
        <Link
          href="/physics"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
        </Link>

        <div
          className={`relative rounded-3xl border-2 ${m.accent.border} p-6 sm:p-8 shadow-sm overflow-hidden`}
          style={CARD_BG}
        >
          <CornerMarks subtle />
          <div className="relative">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-14 h-14 rounded-2xl ${m.accent.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <Icon className="w-7 h-7" />
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase ${m.accent.code}`}>
                  {m.code}
                </span>
                <h1 className={`font-display text-2xl sm:text-3xl font-bold ${m.accent.title} leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
                  {kh ? m.titleKh : m.titleEn}
                </h1>
              </div>
            </div>

            <p className={`text-base text-foreground/80 leading-relaxed mb-6 ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh ? m.blurbKh : m.blurbEn}
            </p>

            <div className="border-t border-dashed border-slate-200 pt-4 mb-6">
              <div className={`text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("You'll learn", "អ្នកនឹងរៀន")}
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {(kh ? m.topicsKh : m.topicsEn).map((topic, i) => (
                  <li
                    key={i}
                    className={`inline-block text-xs font-semibold px-2.5 py-1 rounded border ${m.accent.chipBorder} ${m.accent.chipText} bg-white/60 ${kh ? "font-khmer" : ""}`}
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-slate-50 border border-dashed border-slate-300 px-4 py-3">
              <p className={`text-sm text-slate-700 ${kh ? "font-khmer leading-loose" : ""}`}>
                <strong className="font-mono text-[10px] tracking-widest uppercase text-slate-500 mr-2">
                  {t("STATUS", "ស្ថានភាព")}
                </strong>
                {t(
                  "Detailed lessons for this module are launching soon.",
                  "មេរៀនលម្អិតសម្រាប់មុខវិជ្ជានេះនឹងចាប់ផ្តើមក្នុងពេលឆាប់ៗនេះ។",
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
