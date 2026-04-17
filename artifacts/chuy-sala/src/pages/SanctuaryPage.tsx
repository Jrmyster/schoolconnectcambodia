import { useState, useEffect, useRef } from "react";
import { ExternalLink, Leaf, RotateCcw, Play, Pause, Heart, Wind, Phone, ShieldCheck, Lightbulb, HeartHandshake } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

const STUDY_SECS = 25 * 60;
const BREAK_SECS = 5 * 60;

type AlertType = "focus" | "break" | null;
type BreathePhase = "inhale" | "exhale";

const QUOTES = [
  {
    en: "Every expert was once a beginner. Keep going.",
    kh: "អ្នកជំនាញគ្រប់រូបគឺធ្លាប់ជាអ្នកចាប់ផ្ដើម។ សូមបន្ត។",
  },
  {
    en: "Small steps every day lead to big change.",
    kh: "ជំហានតូចៗប្រចាំថ្ងៃ នាំទៅរកការផ្លាស់ប្ដូរដ៏ធំ។",
  },
  {
    en: "Rest is not giving up — it is part of the journey.",
    kh: "ការសម្រាកមិនមែនជាការបោះបង់ — វាជាផ្នែកមួយនៃដំណើរ។",
  },
  {
    en: "Your education is the one thing no one can take from you.",
    kh: "ការអប់រំរបស់អ្នក គឺជារឿងតែមួយដែលគ្មាននរណាអាចដកចេញពីអ្នក។",
  },
  {
    en: "Breathe. Refocus. Begin again.",
    kh: "ដកដង្ហើម។ ផ្ដោតអារម្មណ៍វិញ។ ចាប់ផ្ដើមម្ដងទៀត។",
  },
  {
    en: "You are capable of more than you know.",
    kh: "អ្នកមានសមត្ថភាពលើសពីអ្វីដែលអ្នកដឹង។",
  },
  {
    en: "The quieter you become, the more you can hear.",
    kh: "ការស្ងប់ស្ងៀមកាន់តែខ្លាំង អ្នកអាចស្ដាប់ឮកាន់តែច្រើន។",
  },
  {
    en: "Progress, not perfection.",
    kh: "ភាពរីកចម្រើន មិនមែនភាពល្អឥតខ្ចោះ។",
  },
];

function fmt(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function SanctuaryPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  // ── Pomodoro ──
  const [phase, setPhase] = useState<"study" | "break">("study");
  const [secondsLeft, setSecondsLeft] = useState(STUDY_SECS);
  const [isRunning, setIsRunning] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>(null);
  const phaseRef = useRef(phase);
  const secondsRef = useRef(secondsLeft);
  phaseRef.current = phase;
  secondsRef.current = secondsLeft;

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      if (secondsRef.current <= 1) {
        clearInterval(id);
        const nextPhase = phaseRef.current === "study" ? "break" : "study";
        setIsRunning(false);
        setAlertType(nextPhase === "break" ? "break" : "focus");
        setPhase(nextPhase);
        setSecondsLeft(nextPhase === "break" ? BREAK_SECS : STUDY_SECS);
      } else {
        setSecondsLeft((s) => s - 1);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setPhase("study");
    setSecondsLeft(STUDY_SECS);
    setAlertType(null);
  };

  const progress =
    phase === "study"
      ? 1 - secondsLeft / STUDY_SECS
      : 1 - secondsLeft / BREAK_SECS;
  const circumference = 2 * Math.PI * 54;

  // ── Breathing ──
  const [breathePhase, setBreathePhase] = useState<BreathePhase>("inhale");
  useEffect(() => {
    const id = setInterval(
      () => setBreathePhase((p) => (p === "inhale" ? "exhale" : "inhale")),
      4000
    );
    return () => clearInterval(id);
  }, []);

  // ── Random quote ──
  const [quote] = useState(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)]
  );

  const alertMsg =
    alertType === "break"
      ? t("Take a Break! 🌿", "សម្រាកបន្តិច! 🌿")
      : t("Time to Focus! 🎯", "ដល់ពេលផ្ដោតអារម្មណ៍! 🎯");

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50/40">

      {/* ── Breathing animation keyframes ── */}
      <style>{`
        @keyframes breathe-in {
          0%   { transform: scale(1);    opacity: 0.75; }
          100% { transform: scale(1.38); opacity: 1;    }
        }
        @keyframes breathe-out {
          0%   { transform: scale(1.38); opacity: 1;    }
          100% { transform: scale(1);    opacity: 0.75; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);    opacity: 0.4; }
          50%  { transform: scale(1.55); opacity: 0;   }
          100% { transform: scale(1);    opacity: 0.4; }
        }
      `}</style>

      {/* ── Hero ── */}
      <div className="relative bg-gradient-to-br from-emerald-700 via-teal-600 to-emerald-800 text-white overflow-hidden">
        <div className="flex h-2">
          <div className="flex-1 bg-emerald-500" />
          <div className="flex-1 bg-teal-400" />
          <div className="flex-1 bg-emerald-500" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-5 py-2 mb-5 text-sm font-semibold backdrop-blur-sm">
            <Leaf className="w-4 h-4 text-emerald-200" />
            {t("Well-being & Stress Sanctuary", "មជ្ឈមណ្ឌលសុខុមាលភាព")}
          </div>
          <h1 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t("You deserve to", "អ្នកសមនឹង")}
            {" "}
            <span className="text-emerald-200">{t("breathe easy.", "ដកដង្ហើមស្រួល។")}</span>
          </h1>
          <p className={`text-white/75 max-w-xl mx-auto leading-relaxed ${kh ? "font-khmer text-base leading-loose" : "text-base"}`}>
            {t(
              "Study smarter, rest intentionally, and take care of the most important tool you have — your mind.",
              "រៀនឱ្យឆ្លាតវៃ សម្រាកដោយមានគោលបំណង ហើយថែរក្សាឧបករណ៍ដ៏សំខាន់បំផុតរបស់អ្នក — គឺចិត្ត។"
            )}
          </p>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="rgb(240 253 244)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* ── Timer alert banner ── */}
        {alertType && (
          <div className={`flex items-center justify-between gap-4 px-6 py-4 rounded-2xl font-bold shadow-md text-white
            ${alertType === "break" ? "bg-teal-500" : "bg-emerald-600"}`}>
            <span className={kh ? "font-khmer text-base" : ""}>{alertMsg}</span>
            <button
              onClick={() => setAlertType(null)}
              className="text-white/70 hover:text-white text-xl leading-none transition-colors"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        )}

        {/* ── Top row: Timer + Breathing ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Pomodoro Timer */}
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-8 flex flex-col items-center gap-6">
            {/* Phase badge */}
            <div className={`px-4 py-1.5 rounded-full text-sm font-bold ${
              phase === "study"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-teal-100 text-teal-700"
            }`}>
              {phase === "study"
                ? t("Study Session", "វគ្គរៀន")
                : t("Break Time", "ពេលសម្រាក")}
            </div>

            {/* SVG ring + time display */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
                {/* Track */}
                <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor"
                  className="text-emerald-100" strokeWidth="8" />
                {/* Progress */}
                <circle cx="60" cy="60" r="54" fill="none"
                  stroke={phase === "study" ? "#059669" : "#0d9488"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
              <span className="font-mono text-3xl font-bold text-emerald-800">
                {fmt(secondsLeft)}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRunning((r) => !r)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all
                  ${isRunning ? "bg-amber-500 hover:bg-amber-600" : "bg-emerald-600 hover:bg-emerald-700"}`}
              >
                {isRunning
                  ? <><Pause className="w-4 h-4" />{t("Pause", "ផ្អាក")}</>
                  : <><Play  className="w-4 h-4" />{t("Start", "ចាប់ផ្ដើម")}</>
                }
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 text-sm transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                {t("Reset", "កំណត់ឡើងវិញ")}
              </button>
            </div>

            <p className={`text-xs text-muted-foreground text-center ${kh ? "font-khmer" : ""}`}>
              {t("25 min focus · 5 min rest", "ផ្ដោត ២៥ នាទី · សម្រាក ៥ នាទី")}
            </p>
          </div>

          {/* Breathing Guide */}
          <div className="bg-white rounded-3xl border border-teal-100 shadow-sm p-8 flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-teal-500" />
              <h2 className={`font-bold text-foreground text-lg ${kh ? "font-khmer" : "font-display"}`}>
                {t("Breathing Guide", "ការណែនាំដកដង្ហើម")}
              </h2>
            </div>
            <p className={`text-sm text-muted-foreground text-center max-w-xs ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Follow the circle — breathe in as it grows, breathe out as it shrinks.",
                "តាមដានរង្វង់ — ដកដង្ហើមចូលពេលវាធំ ហើយដកដង្ហើមចេញពេលវាតូច។"
              )}
            </p>

            {/* Animated circle */}
            <div className="relative flex items-center justify-center w-44 h-44">
              {/* Outer pulse ring */}
              <div
                className="absolute rounded-full bg-teal-300/30"
                style={{
                  width: "176px",
                  height: "176px",
                  animation: "pulse-ring 8s ease-in-out infinite",
                }}
              />
              {/* Main breathing circle */}
              <div
                className="rounded-full bg-gradient-to-br from-teal-300 to-emerald-400 flex items-center justify-center shadow-lg"
                style={{
                  width: "110px",
                  height: "110px",
                  animation: `${breathePhase === "inhale" ? "breathe-in" : "breathe-out"} 4s ease-in-out forwards`,
                }}
              >
                <span className={`text-white font-bold text-sm text-center leading-tight ${kh ? "font-khmer" : ""}`}>
                  {breathePhase === "inhale"
                    ? t("Inhale", "ដកចូល")
                    : t("Exhale", "ដកចេញ")}
                </span>
              </div>
            </div>

            <p className={`text-xs text-muted-foreground ${kh ? "font-khmer" : ""}`}>
              {t("4-second rhythm · breathe naturally", "ចង្វាក់ ៤ វិនាទី · ដកដង្ហើមធម្មជាតិ")}
            </p>
          </div>
        </div>

        {/* ── Encouragement Quote ── */}
        <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 text-white text-center overflow-hidden shadow-md">
          {/* Decorative large quote mark */}
          <div className="absolute top-3 left-6 text-white/10 font-serif text-8xl leading-none select-none" aria-hidden>
            "
          </div>
          <Heart className="w-6 h-6 text-emerald-200 mx-auto mb-4" fill="currentColor" />
          <blockquote className={`text-xl font-semibold leading-relaxed mb-3 relative z-10 ${kh ? "font-khmer leading-loose" : "font-display"}`}>
            "{kh ? quote.kh : quote.en}"
          </blockquote>
          {/* Show the other language in smaller text below */}
          <p className={`text-white/60 text-sm italic ${kh ? "" : "font-khmer"}`}>
            "{kh ? quote.en : quote.kh}"
          </p>
          <p className={`mt-4 text-xs text-emerald-200/70 ${kh ? "font-khmer" : ""}`}>
            {t("A new quote appears each visit.", "សម្ដីលើកទឹកចិត្តថ្មី នៅរាល់ការចូលទស្សនា។")}
          </p>
        </div>

        {/* ── NGO Mental Health Resources ── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-5 h-5 text-emerald-600" />
            <h2 className={`font-display font-bold text-foreground text-xl ${kh ? "font-khmer" : ""}`}>
              {t("Mental Health Support", "ការគាំទ្រសុខភាពផ្លូវចិត្ត")}
            </h2>
          </div>

          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden">
            {/* Accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400" />
            <div className="p-6 flex flex-col md:flex-row gap-5 items-start md:items-center">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
                <Heart className="w-7 h-7 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-foreground text-lg mb-1 ${kh ? "font-khmer" : "font-display"}`}>
                  {t("TPO Cambodia", "TPO កម្ពុជា")}
                </h3>
                <p className={`text-muted-foreground text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Transcultural Psychosocial Organization — providing free mental health support, counselling, and psychosocial services to Cambodians in need.",
                    "អង្គការចិត្តសង្គមឆ្លងវប្បធម៌ — ផ្ដល់ការគាំទ្រសុខភាពផ្លូវចិត្ត ការប្រឹក្សា និងសេវាចិត្តសង្គមដោយឥតគិតថ្លៃ ដល់ប្រជាជនខ្មែរដែលត្រូវការ។"
                  )}
                </p>
              </div>
              <a
                href="https://tpocambodia.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all ${kh ? "font-khmer text-base" : ""}`}
              >
                {t("Visit TPO", "ចូលគេហទំព័រ TPO")}
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          <p className={`text-center text-xs text-muted-foreground/60 mt-8 ${kh ? "font-khmer" : ""}`}>
            {t(
              "If you or someone you know is struggling, please reach out to a trusted adult or mental health professional.",
              "ប្រសិនបើអ្នក ឬនរណាម្នាក់ដែលអ្នកស្គាល់កំពុងជួបការលំបាក សូមទំនាក់ទំនងជាមួយមនុស្សពេញវ័យ ឬអ្នកជំនាញសុខភាពផ្លូវចិត្តដែលអ្នកទុកចិត្ត។"
            )}
          </p>
        </section>

        {/* ── Youth Reproductive Health & Support ── */}
        <ReproductiveHealthSection kh={kh} t={t} />

      </div>
    </div>
  );
}

/* ─── Youth Reproductive Health & Support ──────────────────────────── */

type TFn = (en: string, kh: string) => string;

interface RHResource {
  name: string;
  nameKh: string;
  focusEn: string;
  focusKh: string;
  phone: string;
  phoneLabel: string;
  website: string;
  websiteLabel: string;
}

const RH_RESOURCES: RHResource[] = [
  {
    name: "Mother's Heart",
    nameKh: "Mother's Heart",
    focusEn: "Crisis pregnancy counseling and parenting support.",
    focusKh: "ការប្រឹក្សាស្តីពីការមានផ្ទៃពោះក្នុងស្ថានភាពលំបាក និងការគាំទ្រឪពុកម្ដាយ។",
    phone: "+85512602384",
    phoneLabel: "+855 12 60 23 84",
    website: "https://mothersheartcambodia.org",
    websiteLabel: "mothersheartcambodia.org",
  },
  {
    name: "RHAC",
    nameKh: "RHAC",
    focusEn: "Professional clinics for sexual & reproductive health.",
    focusKh: "គ្លីនិកជំនាញសម្រាប់សុខភាពផ្លូវភេទ និងបន្តពូជ។",
    phone: "+855023883027",
    phoneLabel: "023 883 027",
    website: "https://rhac.org.kh",
    websiteLabel: "rhac.org.kh",
  },
  {
    name: "Marie Stopes",
    nameKh: "Marie Stopes",
    focusEn: "Safe family planning and reproductive healthcare.",
    focusKh: "ការរៀបចំផែនការគ្រួសារ និងការថែទាំសុខភាពបន្តពូជប្រកបដោយសុវត្ថិភាព។",
    phone: "1296",
    phoneLabel: "1296",
    website: "https://mariestopes.org.kh",
    websiteLabel: "mariestopes.org.kh",
  },
  {
    name: "RACHA",
    nameKh: "RACHA",
    focusEn: "Maternal and child health education in rural areas.",
    focusKh: "ការអប់រំអំពីសុខភាពម្ដាយ និងកុមារនៅតំបន់ជនបទ។",
    phone: "",
    phoneLabel: "",
    website: "https://racha.org.kh",
    websiteLabel: "racha.org.kh",
  },
];

function ReproductiveHealthSection({ kh, t }: { kh: boolean; t: TFn }) {
  const [factOpen, setFactOpen] = useState(false);
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <HeartHandshake className="w-5 h-5 text-rose-500" />
        <h2 className={`font-display font-bold text-foreground text-xl ${kh ? "font-khmer" : ""}`}>
          {t(
            "Youth Reproductive Health & Support",
            "សុខភាពបន្តពូជ និងការគាំទ្រយុវជន",
          )}
        </h2>
      </div>

      {/* Compassionate intro */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50/60 border border-rose-100 rounded-3xl p-6">
        <p className={`text-foreground/90 text-sm md:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "You are not alone. These trusted organizations provide confidential health services and support for teenagers and families.",
            "អ្នកមិននៅម្នាក់ឯងទេ។ អង្គការដែលទុកចិត្តទាំងនេះ ផ្ដល់សេវាសុខភាព និងការគាំទ្រជាសម្ងាត់សម្រាប់មនុស្សវ័យជំទង់ និងគ្រួសារ។",
          )}
        </p>
      </div>

      {/* Resource cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {RH_RESOURCES.map((r) => (
          <article
            key={r.name}
            className="bg-white rounded-3xl border border-rose-100 shadow-sm overflow-hidden flex flex-col"
          >
            <div className="h-1.5 bg-gradient-to-r from-rose-400 to-pink-400" />
            <div className="p-6 flex flex-col gap-4 flex-1">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-rose-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-foreground text-lg leading-tight ${kh ? "font-khmer" : "font-display"}`}>
                    {kh ? r.nameKh : r.name}
                  </h3>
                  <p className={`text-muted-foreground text-sm mt-1 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                    {kh ? r.focusKh : r.focusEn}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-auto pt-2">
                {r.phone && (
                  <a
                    href={`tel:${r.phone}`}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-sm hover:bg-rose-600 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all min-h-[44px] ${kh ? "font-khmer text-base" : ""}`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t("Call Now", "ទូរស័ព្ទឥឡូវនេះ")}</span>
                    <span className="font-mono font-semibold opacity-90 text-xs ml-1">{r.phoneLabel}</span>
                  </a>
                )}
                <a
                  href={r.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 font-semibold text-sm hover:bg-rose-100 transition-colors min-h-[44px] ${kh ? "font-khmer text-base" : ""}`}
                >
                  <span>{r.websiteLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Health Literacy: Did You Know toggle */}
      <div className="bg-white rounded-3xl border border-amber-200 shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setFactOpen((v) => !v)}
          aria-expanded={factOpen}
          className="w-full flex items-center gap-3 p-5 text-left hover:bg-amber-50/40 transition-colors"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold text-foreground ${kh ? "font-khmer text-base" : "font-display text-base"}`}>
              {t("Did You Know?", "តើអ្នកដឹងទេ?")}
            </h3>
            <p className={`text-xs text-muted-foreground mt-0.5 ${kh ? "font-khmer text-sm" : ""}`}>
              {t("Health literacy", "ចំណេះដឹងសុខភាព")}
            </p>
          </div>
          <span
            className="text-amber-600 text-2xl leading-none"
            aria-hidden
          >
            {factOpen ? "−" : "+"}
          </span>
        </button>
        {factOpen && (
          <div className="px-5 pb-5 -mt-1">
            <div className="border-t border-amber-100 pt-4">
              <p className={`text-foreground/90 text-sm md:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Teen pregnancy is a health issue, not a moral one. Access to education and medical care is a human right.",
                  "ការមានផ្ទៃពោះក្នុងវ័យជំទង់ គឺជាបញ្ហាសុខភាព មិនមែនជាបញ្ហាសីលធម៌នោះទេ។ ការទទួលបានការអប់រំ និងការថែទាំវេជ្ជសាស្ត្រ គឺជាសិទ្ធិរបស់មនុស្សគ្រប់រូប។",
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Anonymity / privacy note */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl px-5 py-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <p className={`text-emerald-900 text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
          <span className="font-bold">
            {t("Your privacy is important. ", "ភាពឯកជនរបស់អ្នកមានសារៈសំខាន់។ ")}
          </span>
          {t(
            "Browsing these resources on Chouy Sala is private and confidential.",
            "ការមើលឯកសារធនធានទាំងនេះនៅលើ Chouy Sala គឺឯកជន និងជាសម្ងាត់។",
          )}
        </p>
      </div>
    </section>
  );
}
