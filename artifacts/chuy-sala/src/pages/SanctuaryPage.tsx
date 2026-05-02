import { useState, useEffect, useId, useRef } from "react";
import { ExternalLink, Leaf, RotateCcw, Play, Pause, Heart, Wind, Phone, ShieldCheck, Lightbulb, HeartHandshake, Sparkles, Brain, Activity, Droplets, Moon, MessageCircle, Eraser, Lock, Sun } from "lucide-react";
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

        {/* ── Adolescence: The Great Transformation ── */}
        <AdolescenceModule kh={kh} t={t} />

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
  freeMenstrualSupplies?: boolean;
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
    freeMenstrualSupplies: true,
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
    freeMenstrualSupplies: true,
  },
];

function ReproductiveHealthSection({ kh, t }: { kh: boolean; t: TFn }) {
  const [factOpen, setFactOpen] = useState(false);
  return (
    <section id="reproductive-health" className="space-y-6 scroll-mt-24">
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
                  {r.freeMenstrualSupplies && (
                    <span
                      data-testid={`free-menstrual-badge-${r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      className={`mt-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-300/70 px-3 py-1 text-[11px] font-bold text-purple-800 shadow-sm ${kh ? "font-khmer text-xs" : ""}`}
                    >
                      <Sparkles className="w-3 h-3 text-pink-500" aria-hidden />
                      {t(
                        "Free Menstrual Supplies Available",
                        "មានផ្តល់សម្ភារៈអនាម័យឥតគិតថ្លៃ",
                      )}
                    </span>
                  )}
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
            <div className="border-t border-amber-100 pt-4 space-y-3">
              <ul className="space-y-3 list-disc pl-5 marker:text-amber-500">
                <li className={`text-foreground/90 text-sm md:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Teen pregnancy is a health issue, not a moral one. Access to education and medical care is a human right.",
                    "ការមានផ្ទៃពោះក្នុងវ័យជំទង់ គឺជាបញ្ហាសុខភាព មិនមែនជាបញ្ហាសីលធម៌នោះទេ។ ការទទួលបានការអប់រំ និងការថែទាំវេជ្ជសាស្ត្រ គឺជាសិទ្ធិរបស់មនុស្សគ្រប់រូប។",
                  )}
                </li>
                <li
                  data-testid="did-you-know-period-poverty"
                  className={`text-foreground/90 text-sm md:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}
                >
                  {t(
                    "Menstruation is a normal, healthy part of life. No student should miss school because they lack supplies. You can visit your local RHAC clinic or ask a trusted teacher about RACHA programs to receive free sanitary pads and hygiene education.",
                    "ការមករដូវគឺជារឿងធម្មតា និងមានសុខភាពល្អ។ មិនគួរមានសិស្សណាម្នាក់អវត្តមានពីសាលារៀន ដោយសារតែខ្វះសម្ភារៈអនាម័យឡើយ។ អ្នកអាចទៅគ្លីនិក RHAC ក្នុងតំបន់របស់អ្នក ឬសួរគ្រូដែលអ្នកទុកចិត្តអំពីកម្មវិធី RACHA ដើម្បីទទួលបានទ្រនាប់អនាម័យឥតគិតថ្លៃ និងការអប់រំអំពីអនាម័យ។",
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Anonymity / privacy note — sticky so it stays visible while browsing resources */}
      <div className="sticky bottom-3 z-20">
        <div
          data-testid="privacy-banner"
          className="bg-emerald-50/95 backdrop-blur-sm border border-emerald-200 rounded-2xl px-5 py-4 flex items-start gap-3 shadow-md"
        >
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className={`text-emerald-900 text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            <span className="font-bold">
              {t("Your privacy is important. ", "ភាពឯកជនរបស់អ្នកមានសារៈសំខាន់។ ")}
            </span>
            {t(
              "Browsing these resources on Chouy Sala is private and confidential — your searches for these terms are not tracked.",
              "ការមើលឯកសារធនធានទាំងនេះនៅលើ Chouy Sala គឺឯកជន និងជាសម្ងាត់ — ការស្វែងរកពាក្យទាំងនេះរបស់អ្នកមិនត្រូវបានតាមដានឡើយ។",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Adolescence: The Great Transformation / វ័យជំទង់៖ ការផ្លាស់ប្តូរដ៏អស្ចារ្យ
 * Tone: supportive "big brother / big sister" — calm, knowledgeable, kind.
 * Palette: warm purples, oranges, pinks.
 * ══════════════════════════════════════════════════════════════════════════ */
function AdolescenceModule({ kh, t }: { kh: boolean; t: TFn }) {
  return (
    <section
      aria-labelledby="adolescence-title"
      className="relative overflow-hidden rounded-3xl border-2 border-purple-200/60 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6 sm:p-9 shadow-md"
    >
      {/* Soft glows */}
      <div aria-hidden className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-orange-200/60 to-pink-200/0 blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-br from-purple-200/60 to-violet-200/0 blur-3xl pointer-events-none" />

      <div className="relative">
        {/* Hero */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-orange-400 text-white shadow-md flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className={`text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-purple-700 mb-0.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Sanctuary · Growing-Up Module", "មជ្ឈមណ្ឌល · មុខវិជ្ជាវ័យជំទង់")}
            </div>
            <h2 id="adolescence-title" className={`font-display text-2xl sm:text-3xl font-extrabold text-purple-900 leading-snug ${kh ? "font-khmer leading-loose" : ""}`}>
              {t("Adolescence: The Great Transformation", "វ័យជំទង់៖ ការផ្លាស់ប្តូរដ៏អស្ចារ្យ")}
            </h2>
          </div>
        </div>
        <p className={`text-base sm:text-lg text-purple-900/85 leading-relaxed max-w-3xl mb-7 ${kh ? "font-khmer text-lg leading-loose" : ""}`}>
          {t(
            "Hey — your body and mind are going through one of the biggest upgrades a human ever experiences. Here's what's actually happening, in plain language. Nothing here is strange, nothing here is shameful. We've all been through it.",
            "សួស្តី — រាងកាយ និងចិត្តរបស់អ្នកកំពុងឆ្លងកាត់ការអភិវឌ្ឍធំជាងគេមួយដែលមនុស្សធ្លាប់មាន។ នេះគឺជាអ្វីដែលកំពុងកើតឡើងពិតៗ ដោយពាក្យសាមញ្ញ។ គ្មានអ្វីប្លែក គ្មានអ្វីត្រូវខ្មាសឡើយ។ យើងទាំងអស់គ្នាធ្លាប់ឆ្លងកាត់វា។",
          )}
        </p>

        <div className="space-y-7">
          <BiologicalBlueprint kh={kh} t={t} />
          <HormoneWaveSection kh={kh} t={t} />
          <HygieneSelfCare kh={kh} t={t} />
          <SelfReflectionBox kh={kh} t={t} />
        </div>
      </div>
    </section>
  );
}

/* ── 1. Biological Blueprint ─────────────────────────────────────────── */
type Sign = {
  id: string;
  emoji: string;
  titleEn: string;
  titleKh: string;
  forWhom: "all" | "girls" | "boys";
  bodyEn: string;
  bodyKh: string;
};

const PUBERTY_SIGNS: Sign[] = [
  {
    id: "growth",
    emoji: "📏",
    titleEn: "Growth spurt",
    titleKh: "ការលូតលាស់រាងកាយ",
    forWhom: "all",
    bodyEn: "Your bones grow fast — sometimes faster than your muscles can keep up. That clumsy feeling is temporary; your body is just catching up to its new size.",
    bodyKh: "ឆ្អឹងរបស់អ្នកលូតលាស់លឿន — ពេលខ្លះលឿនជាងសាច់ដុំអាចតាមទាន់។ អារម្មណ៍រអាក់រអួលនោះគ្រាន់តែជាបណ្ដោះអាសន្ន; រាងកាយរបស់អ្នកគ្រាន់តែកំពុងតាមទាន់ទំហំថ្មីរបស់វា។",
  },
  {
    id: "voice",
    emoji: "🎤",
    titleEn: "Voice changes",
    titleKh: "សំឡេងប្រែប្រួល",
    forWhom: "all",
    bodyEn: "Your voice box (larynx) grows. Boys' voices usually drop more obviously and may crack for a while — totally normal. Girls' voices also deepen a little.",
    bodyKh: "បំពង់សំឡេង (ឡារ៉ាំង) ធំឡើង។ សំឡេងក្មេងប្រុសជាធម្មតាធ្លាក់ទាបច្បាស់ហើយអាចបាក់មួយរយៈ — ធម្មតាទាំងស្រុង។ សំឡេងក្មេងស្រីក៏ធ្លាក់ទាបបន្តិចដែរ។",
  },
  {
    id: "skin",
    emoji: "✨",
    titleEn: "Skin & sweat changes",
    titleKh: "ស្បែក និងញើសប្រែប្រួល",
    forWhom: "all",
    bodyEn: "Skin produces more oil, sweat glands switch on. Pimples and stronger body odor are not a sign you are dirty — they are a sign you are growing.",
    bodyKh: "ស្បែកផលិតប្រេងច្រើនឡើង ក្រពេញញើសចាប់ផ្ដើមដំណើរការ។ មុន និងក្លិនកាយខ្លាំងជាងមុនមិនមែនជាសញ្ញាថាអ្នកកខ្វក់ទេ — វាជាសញ្ញាថាអ្នកកំពុងលូតលាស់។",
  },
  {
    id: "hair",
    emoji: "🌿",
    titleEn: "New hair growth",
    titleKh: "សក់ដុះនៅកន្លែងថ្មី",
    forWhom: "all",
    bodyEn: "Hair appears under the arms and in the pubic area for everyone. Boys may also see facial and chest hair later. This is hormones doing their job.",
    bodyKh: "សក់ដុះនៅក្រោមដៃ និងតំបន់ឯកជនសម្រាប់ទាំងអស់គ្នា។ ក្មេងប្រុសក៏អាចមានសក់នៅលើមុខ និងទ្រូងពេលក្រោយដែរ។ នេះគឺជាអ័រម៉ូនកំពុងបំពេញការងាររបស់វា។",
  },
  {
    id: "girls",
    emoji: "🌸",
    titleEn: "Girls: chest & menstruation",
    titleKh: "ក្មេងស្រី៖ ដើមទ្រូង និងការមករដូវ",
    forWhom: "girls",
    bodyEn: "Breasts begin to develop and menstrual cycles start. Both can begin anywhere from about age 9 to 15 — there is no single 'right' time. If you have questions, talk to a trusted adult or visit a clinic listed above.",
    bodyKh: "ដើមទ្រូងចាប់ផ្ដើមអភិវឌ្ឍ ហើយរដូវចាប់ផ្ដើមមក។ ទាំងពីរអាចចាប់ផ្ដើមនៅអាយុពី ៩ ដល់ ១៥ ឆ្នាំ — គ្មានពេលវេលា «ត្រឹមត្រូវ» តែមួយឡើយ។ ប្រសិនបើអ្នកមានសំណួរ សូមនិយាយជាមួយមនុស្សពេញវ័យដែលអ្នកទុកចិត្ត ឬចូលគ្លីនិកដែលបានរាយខាងលើ។",
  },
  {
    id: "boys",
    emoji: "🌱",
    titleEn: "Boys: deeper voice & growth",
    titleKh: "ក្មេងប្រុស៖ សំឡេងធ្លាក់ទាប និងការលូតលាស់",
    forWhom: "boys",
    bodyEn: "Shoulders broaden, muscles develop, and reproductive organs mature. Like girls, the timing varies a lot — comparing yourself to friends is not useful, your body has its own clock.",
    bodyKh: "ស្មាធំទូលាយ សាច់ដុំអភិវឌ្ឍ ហើយសរីរាង្គបន្តពូជពេញវ័យ។ ដូចក្មេងស្រីដែរ ពេលវេលាខុសគ្នាច្រើន — ការប្រៀបធៀបខ្លួនឯងជាមួយមិត្តភក្ដិមិនមានប្រយោជន៍ទេ រាងកាយរបស់អ្នកមាននាឡិការៀងៗខ្លួន។",
  },
];

function BiologicalBlueprint({ kh, t }: { kh: boolean; t: TFn }) {
  const [filter, setFilter] = useState<"all" | "girls" | "boys">("all");
  const visible = PUBERTY_SIGNS.filter((s) => filter === "all" ? true : s.forWhom === "all" || s.forWhom === filter);

  const FilterBtn = ({ id, en, kh: khLabel }: { id: "all" | "girls" | "boys"; en: string; kh: string }) => {
    const on = filter === id;
    return (
      <button
        type="button"
        aria-pressed={on}
        onClick={() => setFilter(id)}
        className={`px-3.5 py-1.5 rounded-full text-sm font-bold border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 ${
          on
            ? "bg-purple-600 text-white border-purple-600 shadow"
            : "bg-white/80 text-purple-700 border-purple-200 hover:border-purple-400"
        } ${kh ? "font-khmer text-base" : ""}`}
      >
        {kh ? khLabel : en}
      </button>
    );
  };

  return (
    <div className="rounded-2xl border-2 border-pink-200 bg-white/70 backdrop-blur p-5 sm:p-6 shadow-sm">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-orange-400 text-white shadow flex items-center justify-center flex-shrink-0">
          <Activity className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-pink-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "១ · គម្រោងជីវវិទ្យា" : "1 · The Biological Blueprint"}
          </div>
          <h3 className={`font-display text-xl font-extrabold text-purple-900 ${kh ? "font-khmer" : ""}`}>
            {kh ? "ការផ្លាស់ប្តូររាងកាយ" : "Physical Changes"}
          </h3>
        </div>
      </div>

      {/* Pituitary explainer */}
      <div className="grid md:grid-cols-[200px_minmax(0,1fr)] gap-4 items-center mb-5 p-4 rounded-xl bg-gradient-to-br from-purple-100/70 via-pink-50/70 to-orange-50/70 border border-purple-200">
        <PituitaryDiagram kh={kh} />
        <div>
          <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-purple-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "មេបញ្ជា" : "The Master Controller"}
          </div>
          <h4 className={`font-display text-lg font-bold text-purple-900 mb-1 ${kh ? "font-khmer" : ""}`}>
            {kh ? "ក្រពេញពីទុយតារ៉ា" : "The Pituitary Gland"}
          </h4>
          <p className={`text-sm sm:text-base text-purple-900/85 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : ""}`}>
            {t(
              "Tucked at the base of your brain, the pituitary is about the size of a pea — but it is the conductor of the orchestra. It releases hormone signals that travel through your blood to wake up the ovaries (in girls) or the testes (in boys). Those organs then send out estrogen or testosterone, which tell the rest of your body to begin developing adult characteristics: the growth spurt, the voice change, the new hair, all of it.",
              "ស្ថិតនៅគ្រឹះខួរក្បាល ក្រពេញពីទុយតារ៉ាមានទំហំប៉ុនគ្រាប់សណ្ដែក — ប៉ុន្តែវាជាមេបញ្ជានៃប្រព័ន្ធអ័រម៉ូនទាំងមូល។ វាបញ្ចេញសញ្ញាអ័រម៉ូនដែលធ្វើដំណើរតាមឈាមទៅដាស់អូវែ (សម្រាប់ក្មេងស្រី) ឬពងស្វាស (សម្រាប់ក្មេងប្រុស)។ បន្ទាប់មកសរីរាង្គទាំងនោះបញ្ចេញអ័រម៉ូន អេស្ត្រូហ្សែន ឬ តេស្តូស្តេរ៉ូន ដែលប្រាប់ផ្នែកដទៃនៃរាងកាយឱ្យចាប់ផ្ដើមអភិវឌ្ឍលក្ខណៈពេញវ័យ៖ ការលូតលាស់ ការប្រែសំឡេង សក់ថ្មី និងគ្រប់ការប្រែប្រួលផ្សេងៗ។",
            )}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className={`text-xs font-bold uppercase tracking-wider text-purple-600 mr-1 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
          {kh ? "បង្ហាញ៖" : "Show:"}
        </span>
        <FilterBtn id="all"   en="Everyone"      kh="ទាំងអស់គ្នា" />
        <FilterBtn id="girls" en="Girls' changes" kh="ក្មេងស្រី" />
        <FilterBtn id="boys"  en="Boys' changes"  kh="ក្មេងប្រុស" />
      </div>

      {/* Sign cards */}
      <div className="grid sm:grid-cols-2 gap-3">
        {visible.map((s) => (
          <article
            key={s.id}
            className="rounded-xl bg-white border-2 border-purple-100 hover:border-purple-300 transition-colors p-4 flex gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-xl flex-shrink-0" aria-hidden>
              {s.emoji}
            </div>
            <div className="min-w-0">
              <h5 className={`font-display font-bold text-purple-900 mb-1 ${kh ? "font-khmer text-base" : ""}`}>
                {kh ? s.titleKh : s.titleEn}
              </h5>
              <p className={`text-sm text-purple-900/80 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : ""}`}>
                {kh ? s.bodyKh : s.bodyEn}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function PituitaryDiagram({ kh }: { kh: boolean }) {
  const uid = useId().replace(/:/g, "");
  const brainId = `adol-brain-${uid}`;
  return (
    <svg viewBox="0 0 200 180" className="w-full max-w-[200px] h-auto mx-auto" role="img" aria-label={kh ? "ដ្យាក្រាមក្រពេញពីទុយតារ៉ា" : "Pituitary gland diagram"}>
      <defs>
        <radialGradient id={brainId} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#c4b5fd" />
        </radialGradient>
      </defs>
      {/* Brain silhouette */}
      <path
        d="M 50 60 Q 30 50 40 95 Q 30 130 70 140 Q 100 160 130 140 Q 170 130 160 95 Q 175 50 140 60 Q 120 30 95 40 Q 70 30 50 60 Z"
        fill={`url(#${brainId})`}
        stroke="#a78bfa"
        strokeWidth="1.6"
      />
      {/* Squiggles */}
      <path d="M 60 75 Q 80 65 100 80 Q 120 95 140 80" fill="none" stroke="#7c3aed" strokeWidth="1.2" opacity="0.55" />
      <path d="M 55 100 Q 90 110 130 100" fill="none" stroke="#7c3aed" strokeWidth="1.2" opacity="0.45" />
      {/* Pituitary "pea" */}
      <circle cx="100" cy="125" r="8" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
      <circle cx="100" cy="125" r="14" fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="3 3" opacity="0.7">
        <animate attributeName="r" values="14;20;14" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.1;0.7" dur="2.5s" repeatCount="indefinite" />
      </circle>
      {/* Hormone signals down to body */}
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1="100" y1="133"
          x2={70 + i * 30} y2="170"
          stroke="#f97316" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.85"
        />
      ))}
      {/* Label */}
      <line x1="120" y1="125" x2="160" y2="115" stroke="#c2410c" strokeWidth="1" />
      <text x="162" y="113" fontSize="9" fill="#9a3412" fontFamily={kh ? "inherit" : "monospace"}>
        {kh ? "ពីទុយតារ៉ា" : "PITUITARY"}
      </text>
      <text x="100" y="178" fontSize="8" fill="#7c3aed" fontFamily={kh ? "inherit" : "monospace"} textAnchor="middle">
        {kh ? "សញ្ញាអ័រម៉ូន →" : "→ hormone signals →"}
      </text>
    </svg>
  );
}

/* ── 2. Hormone Wave (Emotional Changes) ─────────────────────────────── */
function HormoneWaveSection({ kh, t }: { kh: boolean; t: TFn }) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      setPhase(((now - start) / 1000) % 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <div className="rounded-2xl border-2 border-purple-200 bg-white/70 backdrop-blur p-5 sm:p-6 shadow-sm">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow flex items-center justify-center flex-shrink-0">
          <Brain className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-purple-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "២ · រលកអ័រម៉ូន" : "2 · The Hormone Wave"}
          </div>
          <h3 className={`font-display text-xl font-extrabold text-purple-900 ${kh ? "font-khmer" : ""}`}>
            {kh ? "ការផ្លាស់ប្តូរអារម្មណ៍" : "Emotional Changes"}
          </h3>
        </div>
      </div>

      {/* Animated mood wave */}
      <div className="relative rounded-xl bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border border-purple-200 p-3 mb-5 overflow-hidden">
        <MoodWave phase={phase} reduced={reduced} kh={kh} />
        <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-purple-700/70 px-1 mt-1">
          <span>{kh ? "ស្ងប់" : "Calm"}</span>
          <span>{kh ? "រីករាយ" : "Joy"}</span>
          <span>{kh ? "ខឹង" : "Anger"}</span>
          <span>{kh ? "សោក" : "Sad"}</span>
          <span>{kh ? "ស្ងប់" : "Calm"}</span>
        </div>
      </div>

      {/* Limbic vs Prefrontal */}
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-pink-50 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-7 h-7 rounded-lg bg-orange-400 text-white flex items-center justify-center text-xs font-bold">🔥</span>
            <h4 className={`font-display font-bold text-orange-900 ${kh ? "font-khmer text-base" : ""}`}>
              {kh ? "ប្រព័ន្ធលីមប៊ិក (មជ្ឈមណ្ឌលអារម្មណ៍)" : "Limbic System (emotions)"}
            </h4>
          </div>
          <p className={`text-sm text-orange-900/85 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : ""}`}>
            {t(
              "Develops faster during teen years. Feels things loud — joy is louder, anger is louder, hurt is louder.",
              "អភិវឌ្ឍលឿនជាងក្នុងវ័យជំទង់។ មានអារម្មណ៍ខ្លាំង — រីករាយខ្លាំង ខឹងខ្លាំង ឈឺចាប់ខ្លាំង។",
            )}
          </p>
        </div>
        <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-7 h-7 rounded-lg bg-purple-500 text-white flex items-center justify-center text-xs font-bold">🧭</span>
            <h4 className={`font-display font-bold text-purple-900 ${kh ? "font-khmer text-base" : ""}`}>
              {kh ? "សំបកខួរផ្នែកមុខ (មជ្ឈមណ្ឌលហេតុផល)" : "Prefrontal Cortex (logic)"}
            </h4>
          </div>
          <p className={`text-sm text-purple-900/85 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : ""}`}>
            {t(
              "Develops more slowly — it is not fully wired until your mid-20s. This is why feelings often arrive before the calm reasoning that helps you handle them.",
              "អភិវឌ្ឍយឺតជាង — វាមិនទាន់ភ្ជាប់ពេញលេញរហូតដល់អាយុកណ្ដាល ២០។ នេះជាមូលហេតុដែលអារម្មណ៍ច្រើនតែមកមុនការគិតស្ងប់ស្ងាត់ដែលជួយអ្នកដោះស្រាយវា។",
            )}
          </p>
        </div>
      </div>

      {/* Key message */}
      <div className="rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-orange-500 text-white p-5 shadow-md flex items-start gap-3">
        <Heart className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" />
        <div>
          <div className={`text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/80 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "សារសំខាន់" : "Key Message"}
          </div>
          <p className={`text-base sm:text-lg font-semibold leading-relaxed ${kh ? "font-khmer text-lg leading-loose" : ""}`}>
            {t(
              "It is normal to feel intense emotions or feel like no one understands you. Your brain is simply learning how to handle new chemicals.",
              "ការមានអារម្មណ៍ខ្លាំង ឬមានអារម្មណ៍ថាគ្មាននរណាម្នាក់យល់ពីអ្នក គឺជារឿងធម្មតា។ ខួរក្បាលរបស់អ្នកគ្រាន់តែកំពុងរៀនទម្លាប់ជាមួយសារធាតុគីមីថ្មីប៉ុណ្ណោះ។",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function MoodWave({ phase, reduced, kh }: { phase: number; reduced: boolean; kh: boolean }) {
  // Build a wavy SVG path that scrolls horizontally to evoke mood swings.
  const W = 600, H = 110, mid = H / 2;
  const points: string[] = [];
  for (let x = 0; x <= W; x += 6) {
    // Two sine waves of different frequency = "moods on top of moods"
    const t1 = (x / W) * Math.PI * 6 + phase * 1.3;
    const t2 = (x / W) * Math.PI * 2.4 + phase * 0.7;
    const y = mid + Math.sin(t1) * 22 + Math.sin(t2) * 14;
    points.push(`${x},${y.toFixed(2)}`);
  }
  const pathD = `M ${points.join(" L ")}`;
  const fillD = `${pathD} L ${W} ${H} L 0 ${H} Z`;
  const uid = useId().replace(/:/g, "");
  const fillId = `mood-fill-${uid}`;
  const strokeId = `mood-stroke-${uid}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={kh ? "រលកអារម្មណ៍ផ្លាស់ប្តូរ" : "Animated wave of changing moods"}>
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#a78bfa" stopOpacity="0.55" />
          <stop offset="35%"  stopColor="#f472b6" stopOpacity="0.55" />
          <stop offset="65%"  stopColor="#fb923c" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#7c3aed" />
          <stop offset="50%"  stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      {/* center baseline */}
      <line x1="0" y1={mid} x2={W} y2={mid} stroke="#c4b5fd" strokeDasharray="3 4" strokeWidth="1" />
      <path d={fillD} fill={`url(#${fillId})`} />
      <path d={pathD} fill="none" stroke={`url(#${strokeId})`} strokeWidth="2.5" strokeLinecap="round" />
      {!reduced && (
        <text x={W - 8} y={14} textAnchor="end" fontSize="9" fill="#7c3aed" fontFamily="monospace" opacity="0.6">
          {kh ? "កំពុងប្រែប្រួល…" : "shifting…"}
        </text>
      )}
    </svg>
  );
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(m.matches);
    update();
    m.addEventListener?.("change", update);
    return () => m.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

/* ── 3. Hygiene & Self-Care ──────────────────────────────────────────── */
type CareTip = {
  id: string;
  Icon: React.ComponentType<{ className?: string }>;
  toneFrom: string;
  toneTo: string;
  iconBg: string;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  bullets: { en: string; kh: string }[];
};

const CARE_TIPS: CareTip[] = [
  {
    id: "skin",
    Icon: Sun,
    toneFrom: "from-orange-50",
    toneTo: "to-pink-50",
    iconBg: "from-orange-400 to-pink-400",
    titleEn: "Skin care (acne)",
    titleKh: "ការថែស្បែក (មុន)",
    bodyEn: "Pimples are not your fault. Your skin is making more oil because of new hormones. Keep it simple — gentle is better than harsh.",
    bodyKh: "មុនមិនមែនជាកំហុសរបស់អ្នកទេ។ ស្បែករបស់អ្នកកំពុងផលិតប្រេងច្រើន ដោយសារអ័រម៉ូនថ្មី។ រក្សាការថែទាំឱ្យសាមញ្ញ — ការធ្វើថ្នមៗ ប្រសើរជាងការដុសខ្លាំង។",
    bullets: [
      { en: "Wash your face twice a day with mild soap and clean water — no scrubbing.", kh: "លាងមុខពីរដងក្នុងមួយថ្ងៃជាមួយសាប៊ូស្រាល និងទឹកស្អាត — កុំដុសខ្លាំង។" },
      { en: "Don't pop or squeeze pimples — that turns them into longer-lasting marks.", kh: "កុំចុចឬស្រូបមុន — វាក្លាយជាស្នាមយូរអង្វែង។" },
      { en: "If acne is painful or widespread, a clinic can help — it's a medical issue, not a moral one.", kh: "ប្រសិនបើមុនឈឺ ឬដុះច្រើន គ្លីនិកអាចជួយបាន — វាជាបញ្ហាវេជ្ជសាស្ត្រ មិនមែនបញ្ហាសីលធម៌ឡើយ។" },
    ],
  },
  {
    id: "odor",
    Icon: Droplets,
    toneFrom: "from-purple-50",
    toneTo: "to-fuchsia-50",
    iconBg: "from-purple-400 to-fuchsia-400",
    titleEn: "Body odor",
    titleKh: "ក្លិនកាយ",
    bodyEn: "Your sweat glands are now adult-strength. Sweat itself is almost odorless — the smell comes from bacteria on your skin meeting that sweat.",
    bodyKh: "ក្រពេញញើសរបស់អ្នកឥឡូវនេះមានកម្លាំងពេញវ័យហើយ។ ញើសខ្លួនឯងស្ទើរតែគ្មានក្លិន — ក្លិនកើតចេញពីបាក់តេរីលើស្បែកជួបនឹងញើស។",
    bullets: [
      { en: "Shower daily, especially after sport or hot weather. Pay attention to underarms and feet.", kh: "ងូតទឹករាល់ថ្ងៃ ជាពិសេសក្រោយលេងកីឡាឬអាកាសធាតុក្ដៅ។ យកចិត្តទុកដាក់ក្រោមដៃ និងជើង។" },
      { en: "Change into clean clothes — bacteria stay in worn fabric.", kh: "ប្ដូរសម្លៀកបំពាក់ស្អាត — បាក់តេរីនៅសល់ក្នុងសម្លៀកបំពាក់ដែលប្រើហើយ។" },
      { en: "A simple deodorant is fine; expensive products are not required.", kh: "ឱសថកម្ចាត់ក្លិនធម្មតាគ្រប់គ្រាន់ហើយ; មិនចាំបាច់ទិញផលិតផលថ្លៃទេ។" },
    ],
  },
  {
    id: "sleep",
    Icon: Moon,
    toneFrom: "from-indigo-50",
    toneTo: "to-purple-50",
    iconBg: "from-indigo-400 to-purple-500",
    titleEn: "Sleep — your secret weapon",
    titleKh: "ការគេង — អាវុធសម្ងាត់របស់អ្នក",
    bodyEn: "During sleep, growth hormone is released and the brain reorganizes what you learned that day. Less sleep = slower growth, weaker memory, shakier mood.",
    bodyKh: "ពេលគេង អ័រម៉ូនលូតលាស់ត្រូវបានបញ្ចេញ ហើយខួរក្បាលរៀបចំឡើងវិញនូវអ្វីដែលអ្នករៀនថ្ងៃនោះ។ ការគេងតិច = លូតលាស់យឺត ការចងចាំខ្សោយ អារម្មណ៍មិនស្ថិតស្ថេរ។",
    bullets: [
      { en: "Aim for 8–10 hours every night during the teen years.", kh: "តាំងគោលដៅ ៨–១០ ម៉ោងរាល់យប់ក្នុងវ័យជំទង់។" },
      { en: "Put your phone down 30 minutes before bed — bright screens trick the brain into staying awake.", kh: "ដាក់ទូរស័ព្ទចុះ ៣០ នាទីមុនគេង — អេក្រង់ភ្លឺបោកខួរក្បាលឱ្យនៅភ្ញាក់។" },
      { en: "Keep a consistent bedtime, even on weekends — your body loves rhythm.", kh: "រក្សាម៉ោងគេងស្ថិតស្ថេរ សូម្បីតែចុងសប្តាហ៍ — រាងកាយស្រលាញ់ចង្វាក់។" },
    ],
  },
];

function HygieneSelfCare({ kh, t }: { kh: boolean; t: TFn }) {
  return (
    <div className="rounded-2xl border-2 border-orange-200 bg-white/70 backdrop-blur p-5 sm:p-6 shadow-sm">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-400 text-white shadow flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-orange-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "៣ · ការថែទាំខ្លួនឯង" : "3 · Hygiene & Self-Care"}
          </div>
          <h3 className={`font-display text-xl font-extrabold text-orange-900 ${kh ? "font-khmer" : ""}`}>
            {kh ? "ការអនុវត្តប្រចាំថ្ងៃ — ដោយគ្មានការវិនិច្ឆ័យ" : "Daily practice — without judgment"}
          </h3>
        </div>
      </div>

      <p className={`text-sm sm:text-base text-orange-900/85 leading-relaxed mb-5 ${kh ? "font-khmer text-base leading-loose" : ""}`}>
        {t(
          "These changes are universal. Every healthy adult has been through them. Below are the basics — small habits, not punishments.",
          "ការផ្លាស់ប្តូរទាំងនេះកើតមានទូទៅ។ មនុស្សពេញវ័យដែលមានសុខភាពល្អម្នាក់ៗធ្លាប់ឆ្លងកាត់វា។ ខាងក្រោមនេះគឺជាមូលដ្ឋាន — ទម្លាប់តូចៗ មិនមែនការដាក់ទណ្ឌកម្មទេ។",
        )}
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {CARE_TIPS.map((tip) => {
          const Icon = tip.Icon;
          return (
            <article key={tip.id} className={`rounded-xl border-2 border-white bg-gradient-to-br ${tip.toneFrom} ${tip.toneTo} p-4 shadow-sm`}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tip.iconBg} text-white shadow flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <h4 className={`font-display font-extrabold text-purple-900 mb-1 ${kh ? "font-khmer text-base" : ""}`}>
                {kh ? tip.titleKh : tip.titleEn}
              </h4>
              <p className={`text-sm text-purple-900/85 leading-relaxed mb-2 ${kh ? "font-khmer text-base leading-loose" : ""}`}>
                {kh ? tip.bodyKh : tip.bodyEn}
              </p>
              <ul className="space-y-1.5">
                {tip.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm text-purple-900/85">
                    <span className="text-pink-500 flex-shrink-0 mt-0.5" aria-hidden>•</span>
                    <span className={kh ? "font-khmer text-base leading-loose" : "leading-relaxed"}>{kh ? b.kh : b.en}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}

/* ── 4. Self-Reflection (Anonymous, not saved) ───────────────────────── */
function SelfReflectionBox({ kh, t }: { kh: boolean; t: TFn }) {
  const [text, setText] = useState("");
  const [released, setReleased] = useState(false);
  const limit = 800;

  const reduced = usePrefersReducedMotion();
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  function handleRelease() {
    if (!text.trim()) return;
    setReleased(true);
    // Clear after animation; user can write again.
    window.setTimeout(() => {
      setText("");
      setReleased(false);
      taRef.current?.focus();
    }, reduced ? 400 : 1400);
  }

  function handleClear() {
    setText("");
    setReleased(false);
    taRef.current?.focus();
  }

  return (
    <div className="rounded-2xl border-2 border-fuchsia-200 bg-white/70 backdrop-blur p-5 sm:p-6 shadow-sm">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-500 text-white shadow flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-fuchsia-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "៤ · ប្រអប់ឆ្លុះបញ្ចាំងខ្លួនឯង" : "4 · The Self-Reflection Box"}
          </div>
          <h3 className={`font-display text-xl font-extrabold text-purple-900 ${kh ? "font-khmer" : ""}`}>
            {kh ? "សួរអ្វីក៏បាន · ឯកជនទាំងស្រុង" : "Ask Anything · Fully Private"}
          </h3>
        </div>
      </div>

      {/* Privacy assurance */}
      <div className="flex items-start gap-2 rounded-xl bg-purple-50 border border-purple-200 p-3 mb-4">
        <Lock className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
        <p className={`text-xs sm:text-sm text-purple-900/85 leading-relaxed ${kh ? "font-khmer text-sm leading-loose" : ""}`}>
          {t(
            "What you type here is never sent or saved. It stays on your screen. Use this space to put your worry into words — sometimes that alone makes it lighter.",
            "អ្វីដែលអ្នកវាយនៅទីនេះមិនត្រូវបានផ្ញើ ឬរក្សាទុកឡើយ។ វានៅតែលើអេក្រង់របស់អ្នកប៉ុណ្ណោះ។ ប្រើកន្លែងនេះដើម្បីបញ្ចេញការព្រួយបារម្ភរបស់អ្នកជាពាក្យ — ពេលខ្លះត្រឹមតែការនេះក៏អាចធ្វើឱ្យចិត្តស្រាលហើយ។",
          )}
        </p>
      </div>

      <label htmlFor="adolescence-reflection" className={`block text-sm font-bold text-purple-900 mb-1.5 ${kh ? "font-khmer text-base" : ""}`}>
        {kh ? "សរសេរអ្វីដែលនៅក្នុងចិត្តរបស់អ្នក…" : "Write what's on your mind…"}
      </label>

      <div className="relative">
        <textarea
          id="adolescence-reflection"
          ref={taRef}
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, limit))}
          rows={5}
          aria-describedby="adolescence-reflection-help"
          placeholder={kh
            ? "ឧទាហរណ៍៖ ខ្ញុំមានអារម្មណ៍ថាគ្មាននរណាម្នាក់យល់ពីខ្ញុំសព្វថ្ងៃនេះ…"
            : "Example: I feel like nobody understands me lately…"}
          className={`w-full rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white/90 p-3 text-purple-900 placeholder:text-purple-400/70 transition-all ${
            released ? "opacity-30 blur-sm" : "opacity-100"
          } ${kh ? "font-khmer text-base leading-loose" : "leading-relaxed"}`}
          style={{ resize: "vertical", minHeight: "120px" }}
        />
        {released && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-live="polite">
            <div
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-sm font-bold shadow-lg"
              style={{ animation: reduced ? "none" : "adol-release 1.4s ease-out forwards" }}
            >
              {kh ? "បានបញ្ចេញ ✦" : "Released ✦"}
            </div>
          </div>
        )}
      </div>

      <div id="adolescence-reflection-help" className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <span className={`text-xs text-purple-700/70 ${kh ? "font-khmer text-sm" : ""}`}>
          {text.length} / {limit} {kh ? "តួអក្សរ · មិនបានរក្សាទុក" : "characters · not stored"}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClear}
            disabled={!text}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 ${
              text
                ? "bg-white text-purple-700 border-purple-200 hover:border-purple-400"
                : "bg-purple-50 text-purple-300 border-purple-100 cursor-not-allowed"
            } ${kh ? "font-khmer text-base" : ""}`}
          >
            <Eraser className="w-4 h-4" />
            {kh ? "សម្អាត" : "Clear"}
          </button>
          <button
            type="button"
            onClick={handleRelease}
            disabled={!text.trim() || released}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white shadow transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 ${
              !text.trim() || released
                ? "bg-purple-300 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
            } ${kh ? "font-khmer text-base" : ""}`}
          >
            <Sparkles className="w-4 h-4" />
            {kh ? "ដោះលែង" : "Release it"}
          </button>
        </div>
      </div>

      <p className={`mt-4 text-xs text-purple-700/70 leading-relaxed ${kh ? "font-khmer text-sm leading-loose" : ""}`}>
        {t(
          "If your worry is heavy or persistent, please share it with a trusted adult, teacher, or one of the support lines listed above. You are not alone.",
          "ប្រសិនបើការព្រួយបារម្ភរបស់អ្នកធ្ងន់ ឬមិនបាត់ សូមចែករំលែកវាជាមួយមនុស្សពេញវ័យដែលអ្នកទុកចិត្ត គ្រូបង្រៀន ឬបណ្ដាញគាំទ្រដែលបានរាយខាងលើ។ អ្នកមិនមែននៅម្នាក់ឯងទេ។",
        )}
      </p>

      <style>{`
        @keyframes adol-release {
          0%   { transform: translateY(0)    scale(1);   opacity: 1; }
          60%  { transform: translateY(-22px) scale(1.05); opacity: 1; }
          100% { transform: translateY(-60px) scale(0.85); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
