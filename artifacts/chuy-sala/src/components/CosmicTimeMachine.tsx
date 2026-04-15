import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Zap, Eye, Calculator } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

// ── Constants ────────────────────────────────────────────────────────────────
const KM_PER_LY  = 9.461e12;
const MI_PER_LY  = 5.879e12;
const C_MS       = 299_792_458;

// ── Celestial catalogue ──────────────────────────────────────────────────────
const OBJECTS = [
  {
    id: "sun",
    nameEn: "The Sun",
    nameKh: "ព្រះអាទិត្យ",
    distEn: "8.3 light-minutes",
    distKh: "8.3 នាទីពន្លឺ",
    lyAgo: 8.3 / (365.25 * 24 * 60),
    eventEn: "The light arriving at your eyes right now left the Sun about 8 minutes ago — long enough to boil a pot of rice.",
    eventKh: "ពន្លឺដែលចូលភ្នែករបស់អ្នកឥឡូវ ចាកចេញពីព្រះអាទិត្យ ប្រហែល ៨ នាទីមុន — គ្រប់ហ្នឹងដើម្បីដាំបាយ។",
    color: "#FFD060",
    glow: "rgba(255,208,96,0.4)",
    size: 22,
  },
  {
    id: "proxima",
    nameEn: "Proxima Centauri",
    nameKh: "ប្រុក់ស៊ីម៉ា សេនតូរី",
    distEn: "4.2 light-years",
    distKh: "4.2 ឆ្នាំពន្លឺ",
    lyAgo: 4.2,
    eventEn: "That light left Proxima Centauri around 2021 — when you were just starting high school. It is the nearest star to our Sun.",
    eventKh: "ពន្លឺនោះ ចាកចេញប្រហែល ២០២១ — ពេលអ្នកចាប់ផ្តើមចូលវិទ្យាល័យ។ វាជាផ្កាយដ៏ជិតបំផុតនៃព្រះអាទិត្យ។",
    color: "#FF8C69",
    glow: "rgba(255,140,105,0.4)",
    size: 14,
  },
  {
    id: "sirius",
    nameEn: "Sirius",
    nameKh: "ផ្កាយ ស៊ីរ្យូស",
    distEn: "8.6 light-years",
    distKh: "8.6 ឆ្នាំពន្លឺ",
    lyAgo: 8.6,
    eventEn: "That light left Sirius around 2017 — when you were sitting in a primary school classroom. Sirius is the brightest star in the night sky.",
    eventKh: "ពន្លឺនោះ ចាកចេញប្រហែល ២០១៧ — ពេលអ្នកនៅអង្គុយក្នុងថ្នាក់បឋមសិក្សា។ ស៊ីរ្យូសជាផ្កាយភ្លឺបំផុតលើមេឃ។",
    color: "#7EC8E3",
    glow: "rgba(126,200,227,0.4)",
    size: 16,
  },
  {
    id: "pleiades",
    nameEn: "The Pleiades Cluster",
    nameKh: "ចង្កោមផ្កាយ ប្លៃអ៉ាឌីស",
    distEn: "444 light-years",
    distKh: "444 ឆ្នាំពន្លឺ",
    lyAgo: 444,
    eventEn: "That light left during the height of the Angkor Empire — around 1581 CE. Builders were still carving temple stones when this light began its journey.",
    eventKh: "ពន្លឺនោះ ចាកចេញនៅសម័យប្រភពអង្គរ — ប្រហែល គ.ស ១៥៨១។ ជាងសំណង់ នៅតែចម្លាក់ទៅលើថ្មទ្រព្យ ពេលពន្លឺនោះចាប់ផ្តើមដំណើររបស់វា។",
    color: "#B57BFF",
    glow: "rgba(181,123,255,0.4)",
    size: 18,
  },
];

// ── Seeded random stars ──────────────────────────────────────────────────────
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function genStars(count: number, layer: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: seededRandom(i * 31 + layer * 97) * 100,
    y: seededRandom(i * 53 + layer * 113) * 100,
    r: seededRandom(i * 71 + layer * 137) * 1.6 + 0.4,
    opacity: seededRandom(i * 89 + layer * 151) * 0.5 + 0.2,
    dur: seededRandom(i * 107 + layer * 173) * 4 + 2,
    delay: seededRandom(i * 127 + layer * 191) * 4,
  }));
}

// ── Component ────────────────────────────────────────────────────────────────
export function CosmicTimeMachine() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [years, setYears] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax
  useEffect(() => {
    const handler = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setScrollY(-rect.top * 0.3);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Calculator
  const calc = useMemo(() => {
    const n = parseFloat(years);
    if (!n || n <= 0 || !isFinite(n)) return null;
    const km = n * KM_PER_LY;
    const mi = n * MI_PER_LY;
    const fmt = (v: number) =>
      v >= 1e12
        ? (v / 1e12).toLocaleString(undefined, { maximumFractionDigits: 2 }) + " trillion"
        : v >= 1e9
        ? (v / 1e9).toLocaleString(undefined, { maximumFractionDigits: 2 }) + " billion"
        : v.toLocaleString(undefined, { maximumFractionDigits: 0 });
    return { km: fmt(km), mi: fmt(mi) };
  }, [years]);

  const selected = OBJECTS.find((o) => o.id === selectedId) ?? null;
  const starsNear = useMemo(() => genStars(60, 1), []);
  const starsFar  = useMemo(() => genStars(40, 2), []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden mb-16">

      {/* ── Parallax starfield ───────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Layer 1 – slow (far) */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        >
          {starsFar.map((s) => (
            <div
              key={s.id}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                left: `${s.x}%`, top: `${s.y}%`,
                width: s.r, height: s.r,
                opacity: s.opacity,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>
        {/* Layer 2 – fast (near) */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.9}px)` }}
        >
          {starsNear.map((s) => (
            <div
              key={s.id}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                left: `${s.x}%`, top: `${s.y}%`,
                width: s.r + 0.5, height: s.r + 0.5,
                opacity: s.opacity * 0.7,
                animationDuration: `${s.dur + 1}s`,
                animationDelay: `${s.delay + 1}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-7 h-7 rounded-lg bg-sky-400/15 border border-sky-400/25 flex items-center justify-center text-sky-400">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-sky-400 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("Cosmic Time Machine", "ម៉ាស៊ីនពេលវេលាអវកាស")}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-sky-400/20 to-transparent" />
        </div>

        {/* ── 1. Light-Year Definition ──────────────────────────────────── */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-400/25 flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className={`font-display font-bold text-white text-lg mb-2 ${kh ? "font-khmer" : ""}`}>
                {t("What is a Light-Year?", "តើ ឆ្នាំពន្លឺ ជាអ្វី?")}
              </h3>
              <p className={`text-white/70 text-sm leading-relaxed mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "A light-year is the distance light travels in one year: about 9.46 trillion kilometers (5.88 trillion miles). It is a measure of distance, not time.",
                  "ឆ្នាំពន្លឺ គឺជាចម្ងាយដែលពន្លឺធ្វើដំណើរក្នុងរយៈពេលមួយឆ្នាំ៖ ប្រហែល ៩,៤៦ ទ្រីលានគីឡូម៉ែត្រ (៥,៨៨ ទ្រីលានម៉ាយ)។ វាជាការវាស់ ចម្ងាយ មិនមែន ពេលវេលា ទេ។"
                )}
              </p>
              {/* Speed of light pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5">
                <span className="text-sky-300 font-mono text-xs font-bold">c = 299,792,458 m/s</span>
                <span className={`text-sky-300/60 text-xs ${kh ? "font-khmer" : ""}`}>
                  {t("— speed of light", "— ល្បឿនពន្លឺ")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. Distance Calculator ────────────────────────────────────── */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <h3 className={`font-display font-bold text-white text-lg ${kh ? "font-khmer" : ""}`}>
              {t("Distance Calculator", "ម៉ាស៊ីនគណនាចម្ងាយ")}
            </h3>
          </div>
          <p className={`text-white/50 text-sm mb-5 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t("Enter a number of light-years to see the distance in real units.", "បញ្ចូលចំនួន ឆ្នាំពន្លឺ ដើម្បីមើលចម្ងាយជាឯកតាពិត។")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="number"
                min="0"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder={t("e.g. 4.2", "ឧ. 4.2") as string}
                className="w-full rounded-xl border border-white/15 bg-white/8 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/25"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-xs font-mono">
                {t("light-years", "ឆ្នាំពន្លឺ")}
              </span>
            </div>
          </div>

          <AnimatePresence>
            {calc && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/8 p-4">
                  <p className={`text-emerald-300/60 text-xs mb-1 ${kh ? "font-khmer" : ""}`}>
                    {t("Kilometers", "គីឡូម៉ែត្រ")}
                  </p>
                  <p className="text-emerald-300 font-bold text-base font-mono">{calc.km} km</p>
                </div>
                <div className="rounded-2xl border border-sky-400/20 bg-sky-400/8 p-4">
                  <p className={`text-sky-300/60 text-xs mb-1 ${kh ? "font-khmer" : ""}`}>
                    {t("Miles", "ម៉ាយ")}
                  </p>
                  <p className="text-sky-300 font-bold text-base font-mono">{calc.mi} mi</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── 3. Lookback Interactive ───────────────────────────────────── */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-violet-400" />
            <h3 className={`font-display font-bold text-white text-lg ${kh ? "font-khmer" : ""}`}>
              {t("The Lookback Interactive", "ការឡើងក្រឡេកមើលអតីតកាល")}
            </h3>
          </div>
          <p className={`text-white/50 text-sm mb-6 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Click a celestial object to discover when the light now reaching your eyes actually left it — and what was happening on Earth at that moment.",
              "ចុចលើវត្ថុអវកាស ដើម្បីរកដឹងថា ពន្លឺដែលកំពុងចូលភ្នែករបស់អ្នកឥឡូវ ចាកចេញពីវានៅពេលណា — និងអ្វីកំពុងកើតឡើងនៅលើផែនដីពេលនោះ។"
            )}
          </p>

          {/* Star grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {OBJECTS.map((obj) => (
              <button
                key={obj.id}
                onClick={() => setSelectedId(selectedId === obj.id ? null : obj.id)}
                className={`group relative flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all duration-200 text-center ${
                  selectedId === obj.id
                    ? "border-white/30 bg-white/12 scale-105"
                    : "border-white/8 bg-white/5 hover:border-white/20 hover:bg-white/8"
                }`}
                style={selectedId === obj.id ? { boxShadow: `0 0 24px ${obj.glow}` } : undefined}
              >
                {/* Star dot */}
                <div
                  className="rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    width: obj.size,
                    height: obj.size,
                    background: obj.color,
                    boxShadow: `0 0 ${obj.size * 1.5}px ${obj.glow}`,
                  }}
                />
                <span className={`text-white/80 text-xs font-semibold leading-snug ${kh ? "font-khmer" : ""}`}>
                  {kh ? obj.nameKh : obj.nameEn}
                </span>
                <span className="text-white/35 text-xs font-mono">
                  {kh ? obj.distKh : obj.distEn}
                </span>
              </button>
            ))}
          </div>

          {/* Reveal panel */}
          <AnimatePresence>
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-white/15 bg-white/8 p-5"
                style={{ borderColor: selected.color + "40", background: selected.glow.replace("0.4)", "0.08)") }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="rounded-full flex-shrink-0"
                    style={{
                      width: 12, height: 12,
                      background: selected.color,
                      boxShadow: `0 0 10px ${selected.glow}`,
                    }}
                  />
                  <span className={`font-bold text-white text-base ${kh ? "font-khmer" : ""}`}>
                    {kh ? selected.nameKh : selected.nameEn}
                  </span>
                  <span className="ml-auto text-white/40 text-xs font-mono">
                    {kh ? selected.distKh : selected.distEn}
                  </span>
                </div>
                <p className={`text-white/70 text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                  {kh ? selected.eventKh : selected.eventEn}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── 4. Seeing the Past ────────────────────────────────────────── */}
        <div className="rounded-3xl border border-white/10 overflow-hidden">
          {/* Top banner */}
          <div
            className="px-6 sm:px-8 pt-8 pb-6"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.12) 100%)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-5 h-5 text-indigo-300" />
              <h3 className={`font-display font-bold text-white text-xl ${kh ? "font-khmer" : ""}`}>
                {t("Seeing the Past", "ការមើលឃើញអតីតកាល")}
              </h3>
            </div>
            <p className={`text-white/65 text-sm leading-relaxed max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Because light has a speed limit — c = 299,792,458 m/s — it takes time to travel across space. When you look at a star, you are not seeing it as it is now. You are seeing a snapshot of its past. The further away a star is, the further back in history you are looking.",
                "ដោយសារពន្លឺ មាន ល្បឿនដែន — c = 299,792,458 m/s — វាត្រូវការពេលវេលាដើម្បីដំណើរទូទាំងអវកាស។ ពេលអ្នកក្រឡេកមើលផ្កាយ អ្នកមិនមើលឃើញវានៅបច្ចុប្បន្នទេ។ អ្នកកំពុងមើល រូបថតអតីតកាលរបស់វា។ ផ្កាយណាដែលនៅឆ្ងាយជាង ទស្សនៈរបស់អ្នកក្នុងប្រវត្តិសាស្ត្រ ក៏ឆ្ងាយជាងដែរ។"
              )}
            </p>
          </div>

          {/* Analogy row */}
          <div className="px-6 sm:px-8 py-6 bg-white/3 border-t border-white/8">
            <p className={`text-white/40 text-xs font-semibold uppercase tracking-widest mb-4 ${kh ? "font-khmer tracking-normal" : ""}`}>
              {t("Think of it this way", "ស្រមៃបែបនេះ")}
            </p>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-400/20 border border-indigo-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-indigo-300 text-xs">📷</span>
              </div>
              <p className={`text-white/60 text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Looking at the night sky is like looking at a photo album of history. Every star is a photograph taken at a different moment in the past. The entire Universe is its own time capsule — and you hold a window into it every time you look up.",
                  "ការក្រឡេកមើលមេឃពេលយប់ ដូចជាការក្រឡេកមើលឯកសារ​រូបថត​ប្រវត្តិ​សាស្ត្រ​មួយ​ក្ដី​។ ផ្កាយ​គ្រប់​ដួងជា​រូបថត​ដែល​ថត​ក្នុង​ពេល​វេលា​ផ្សេងៗ​គ្នា​នៅ​ក្នុង​អតីតកាល​។ ចក្រវាល​ទាំង​មូល​ជា​ស្នប​ពេល​វេលា​របស់​ខ្លួន — ហើយ​អ្នក​ទទួល​បាន​បង្អួច​ចូល​ក្នុង​វា​រៀងរាល់​ពេល​ដែល​អ្នក​ស្ថិត​ក្រោម​ផ្កាយ​អ្នក​
ក្រឡេក​ទ​ទ​ ",
                )}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
