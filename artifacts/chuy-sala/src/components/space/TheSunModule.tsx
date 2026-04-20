import { useState, useEffect } from "react";
import {
  Sun, Flame, Zap, Clock, Ruler, RotateCw, Info, Sparkles,
  Cloud, CloudRain, Droplets, MapPin,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ─────────────────────────────────────────────────────────────────────────────
// "The Sun: Our Local Star" — bilingual deep-dive module for /space.
//
// Self-contained: no extra deps, just SVG + CSS keyframes (declared at the
// bottom of the file via a single <style> tag with a unique prefix `sunmod-*`
// to avoid collisions with the rest of the app).
//
// Four sub-tools:
//   1. SolarAnatomy        — clickable cross-section of the Sun
//   2. SolarLifeCycle      — horizontal progress bar of the Sun's lifetime
//   3. SolarYardstick      — distance-to-planets scale + basketball analogy
//   4. TiltAndSeasons      — 23.5° tilt simulator with Cambodia context
// ─────────────────────────────────────────────────────────────────────────────

type Lang = "en" | "kh";

// ── Shared little helpers ────────────────────────────────────────────────────

function ToolHeader({
  icon, en, kh, lang, descEn, descKh,
}: {
  icon: React.ReactNode; en: string; kh: string; lang: Lang;
  descEn: string; descKh: string;
}) {
  const isKh = lang === "kh";
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300">
          {icon}
        </div>
        <h3 className={`font-display font-bold text-white text-lg sm:text-xl ${isKh ? "font-khmer" : ""}`}>
          {isKh ? kh : en}
        </h3>
      </div>
      <p className={`text-white/55 text-sm leading-relaxed ml-[42px] ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? descKh : descEn}
      </p>
    </div>
  );
}

// ─── 1. Solar Anatomy ───────────────────────────────────────────────────────

type LayerId = "core" | "radiative" | "convective" | "photosphere" | "sunspot" | "flare";

const LAYERS: Record<LayerId, {
  en: string; kh: string;
  tempEn: string; tempKh: string;
  bodyEn: string; bodyKh: string;
}> = {
  core: {
    en: "The Core",
    kh: "ស្នូល",
    tempEn: "≈ 15 million °C",
    tempKh: "≈ ១៥ លាន °C",
    bodyEn: "Hydrogen atoms are crushed together by gravity until they fuse into helium. This nuclear fusion releases the energy that powers the entire Solar System.",
    bodyKh: "អាតូមអ៊ីដ្រូសែនត្រូវបានកម្តេចដោយទំនាញ រហូតដល់រួមផ្សំបញ្ចូលគ្នាទៅជា ហេលីយូម។ ការផ្សំនុយក្លេអ៊ែរនេះបញ្ចេញថាមពលដែលផ្ដល់អំណាចដល់ប្រព័ន្ធព្រះអាទិត្យទាំងមូល។",
  },
  radiative: {
    en: "Radiative Zone",
    kh: "តំបន់វិទ្យុសកម្ម",
    tempEn: "7 million → 2 million °C",
    tempKh: "៧ លាន → ២ លាន °C",
    bodyEn: "Energy from the core travels outward as photons of light. The plasma is so dense that a single photon can take ~170,000 years to bounce its way through this zone.",
    bodyKh: "ថាមពលពីស្នូលធ្វើដំណើរចេញក្រៅជាហ្វូតុនពន្លឺ។ ប្លាស្មាក្រាស់ខ្លាំងបំផុត ដែលហ្វូតុនមួយអាចចំណាយពេលប្រហែល ១៧០,០០០ ឆ្នាំ ដើម្បីលោតតាមរយៈតំបន់នេះ។",
  },
  convective: {
    en: "Convective Zone",
    kh: "តំបន់ចលនាកម្ដៅ",
    tempEn: "2 million → 5,500 °C",
    tempKh: "២ លាន → ៥,៥០០ °C",
    bodyEn: "Hot plasma rises and cooler plasma sinks — like boiling water — carrying energy the rest of the way to the surface in giant churning cells.",
    bodyKh: "ប្លាស្មាក្ដៅឡើងលើ ហើយប្លាស្មាត្រជាក់ចុះក្រោម — ដូចទឹកដែលពុះ — ដឹកនាំថាមពលឆ្ពោះទៅផ្ទៃខាងក្រៅក្នុងក្រឡាដែលរង្គាល់។",
  },
  photosphere: {
    en: "Photosphere",
    kh: "ផ្ទៃស្រទាប់ក្រៅ",
    tempEn: "≈ 5,500 °C",
    tempKh: "≈ ៥,៥០០ °C",
    bodyEn: "The bright surface we actually see from Earth. Light leaves here and reaches us in just 8 minutes 20 seconds — the fastest news in the Solar System.",
    bodyKh: "ផ្ទៃភ្លឺដែលយើងពិតជាមើលឃើញពីផែនដី។ ពន្លឺចេញពីទីនេះ ហើយមកដល់យើងក្នុងរយៈពេលត្រឹមតែ ៨ នាទី ២០ វិនាទី — ដំណឹងលឿនបំផុតក្នុងប្រព័ន្ធព្រះអាទិត្យ។",
  },
  sunspot: {
    en: "Sunspots",
    kh: "ចំណុចព្រះអាទិត្យ",
    tempEn: "≈ 3,800 °C (cooler patches)",
    tempKh: "≈ ៣,៨០០ °C (តំបន់ត្រជាក់ជាង)",
    bodyEn: "Dark, cooler regions where the Sun's magnetic field pokes through the surface. They follow an 11-year cycle of more and fewer spots.",
    bodyKh: "តំបន់ខ្មៅ និងត្រជាក់ជាង ដែលដែនម៉ាញេទិកព្រះអាទិត្យចាក់ផ្ទុះតាមរយៈផ្ទៃ។ ពួកវាដើរតាមវដ្ដ ១១ ឆ្នាំ មានច្រើន ឬតិច។",
  },
  flare: {
    en: "Solar Flares & CMEs",
    kh: "ការផ្ទុះព្រះអាទិត្យ និង CME",
    tempEn: "Charged particles → Earth in 1–3 days",
    tempKh: "ភាគល្អិតបន្ទុក → ផែនដីក្នុង ១–៣ ថ្ងៃ",
    bodyEn: "Sudden eruptions of energy and plasma. Strong flares can disturb satellites, GPS signals, radio communications, and power grids. They also paint the sky with auroras near the poles.",
    bodyKh: "ការផ្ទុះថាមពល និងប្លាស្មាភ្លាមៗ។ ការផ្ទុះខ្លាំងអាចបង្ករឱ្យមានការរំខានដល់ផ្កាយរណប សញ្ញា GPS ការទាក់ទងវិទ្យុ និងបណ្ដាញអគ្គិសនី។ ពួកវាក៏គូរលើមេឃនូវ Aurora ជិតប៉ូលផងដែរ។",
  },
};

function SolarAnatomy({ lang }: { lang: Lang }) {
  const t = useTranslation();
  const [active, setActive] = useState<LayerId>("core");
  const isKh = lang === "kh";
  const a = LAYERS[active];

  const layers: { id: LayerId; r: number; label: { en: string; kh: string }; color: string }[] = [
    { id: "photosphere", r: 175, label: LAYERS.photosphere, color: "#ffb347" },
    { id: "convective",  r: 138, label: LAYERS.convective,  color: "#ff8c42" },
    { id: "radiative",   r: 95,  label: LAYERS.radiative,   color: "#ff6b1a" },
    { id: "core",        r: 48,  label: LAYERS.core,        color: "#ffeb3b" },
  ];

  return (
    <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-[#0a0500] to-[#1a0a00] p-5 sm:p-7">
      <ToolHeader
        icon={<Sun className="w-4 h-4" />}
        en="Deep Dive: Anatomy of the Sun"
        kh="ស្វែងយល់ជ្រៅ៖ កាយវិភាគនៃព្រះអាទិត្យ"
        lang={lang}
        descEn="Click any layer or feature to learn what's happening inside our local star."
        descKh="ចុចលើស្រទាប់ ឬលក្ខណៈពិសេសណាមួយ ដើម្បីស្វែងយល់ពីអ្វីដែលកំពុងកើតឡើងក្នុងផ្កាយក្នុងតំបន់របស់យើង។"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] gap-6 items-start">

        {/* SVG cross-section */}
        <div className="relative aspect-square w-full max-w-[440px] mx-auto" data-testid="sun-anatomy-svg">
          <svg viewBox="-220 -220 440 440" className="w-full h-full">
            <defs>
              <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="60%" stopColor="rgba(255,200,80,0)" />
                <stop offset="100%" stopColor="rgba(255,140,30,0.45)" />
              </radialGradient>
              <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff7c2" />
                <stop offset="100%" stopColor="#ffd54f" />
              </radialGradient>
            </defs>

            {/* Outer corona glow */}
            <circle cx="0" cy="0" r="210" fill="url(#sunGlow)" />

            {/* Concentric layers — outer first so inner sit on top. Each
                ring is a keyboard-operable button (focusable + Enter/Space). */}
            {layers.map((l) => (
              <circle
                key={l.id}
                cx="0"
                cy="0"
                r={l.r}
                fill={l.id === "core" ? "url(#coreGlow)" : l.color}
                stroke={active === l.id ? "#fff" : "rgba(0,0,0,0.25)"}
                strokeWidth={active === l.id ? 3 : 1.5}
                onClick={() => setActive(l.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(l.id); }
                }}
                tabIndex={0}
                role="button"
                aria-label={isKh ? l.label.kh : l.label.en}
                style={{ cursor: "pointer", transition: "stroke 0.2s", outline: "none" }}
                data-testid={`layer-${l.id}`}
              >
                <title>{isKh ? l.label.kh : l.label.en}</title>
              </circle>
            ))}

            {/* Sunspots — small dark blobs on the photosphere */}
            <g
              onClick={() => setActive("sunspot")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive("sunspot"); }
              }}
              tabIndex={0}
              role="button"
              aria-label={isKh ? LAYERS.sunspot.kh : LAYERS.sunspot.en}
              style={{ cursor: "pointer", outline: "none" }}
              data-testid="layer-sunspot"
            >
              <ellipse cx="-95" cy="-55" rx="14" ry="9" fill="#3a1a00" opacity="0.85" />
              <ellipse cx="-95" cy="-55" rx="6" ry="3.5" fill="#000" opacity="0.9" />
              <ellipse cx="60" cy="80" rx="10" ry="7" fill="#3a1a00" opacity="0.85" />
              <ellipse cx="60" cy="80" rx="4" ry="2.5" fill="#000" opacity="0.9" />
              <title>{isKh ? LAYERS.sunspot.kh : LAYERS.sunspot.en}</title>
            </g>

            {/* Solar flare arc — top right */}
            <g
              onClick={() => setActive("flare")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive("flare"); }
              }}
              tabIndex={0}
              role="button"
              aria-label={isKh ? LAYERS.flare.kh : LAYERS.flare.en}
              style={{ cursor: "pointer", outline: "none" }}
              data-testid="layer-flare"
            >
              <path
                d="M 110 -130 Q 175 -195 170 -90"
                stroke="#ff5722"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                opacity="0.85"
              >
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite" />
              </path>
              <circle cx="170" cy="-90" r="8" fill="#ffb347">
                <animate attributeName="r" values="6;10;6" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <title>{isKh ? LAYERS.flare.kh : LAYERS.flare.en}</title>
            </g>

            {/* Layer pointer labels (only when active) */}
            {layers.map((l) => active === l.id && (
              <line
                key={`ptr-${l.id}`}
                x1={l.id === "core" ? 0 : l.r * 0.85}
                y1={l.id === "core" ? 0 : -l.r * 0.5}
                x2={195}
                y2={-180 + layers.findIndex(x => x.id === l.id) * 12}
                stroke="#fff"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.4"
              />
            ))}
          </svg>
        </div>

        {/* Side info panel */}
        <div className="rounded-2xl border border-amber-400/30 bg-black/50 p-4 sm:p-5" role="status" aria-live="polite">
          <div className="text-amber-300 text-[11px] font-bold uppercase tracking-widest mb-1.5">
            {t("Selected Layer", "ស្រទាប់ដែលបានជ្រើសរើស")}
          </div>
          <h4 className={`text-white font-display font-bold text-xl mb-1 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? a.kh : a.en}
          </h4>
          <div className="inline-flex items-center gap-1.5 mb-3 rounded-full border border-orange-500/40 bg-orange-500/10 px-2.5 py-1">
            <Flame className="w-3 h-3 text-orange-300" />
            <span className={`text-orange-200 text-xs font-mono font-bold ${isKh ? "font-khmer" : ""}`}>
              {isKh ? a.tempKh : a.tempEn}
            </span>
          </div>
          <p className={`text-white/75 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? a.bodyKh : a.bodyEn}
          </p>

          {/* Quick tabs */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {(["core","radiative","convective","photosphere","sunspot","flare"] as LayerId[]).map((id) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                data-testid={`button-tab-${id}`}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border transition-colors ${
                  active === id
                    ? "border-amber-400 bg-amber-400/20 text-amber-200"
                    : "border-white/15 bg-white/5 text-white/55 hover:text-white"
                } ${isKh ? "font-khmer" : ""}`}
              >
                {isKh ? LAYERS[id].kh : LAYERS[id].en}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Life Cycle Timeline ─────────────────────────────────────────────────

type Stage = {
  id: "birth" | "now" | "redgiant" | "whitedwarf";
  ageEn: string; ageKh: string;
  titleEn: string; titleKh: string;
  bodyEn: string; bodyKh: string;
  color: string;
  size: number; // visual swelling
};

const STAGES: Stage[] = [
  {
    id: "birth",
    ageEn: "4.6 billion years ago",
    ageKh: "កាលពី ៤.៦ ពាន់លានឆ្នាំមុន",
    titleEn: "Birth — Protostar",
    titleKh: "កំណើត — ផ្កាយដើម",
    bodyEn: "A giant cloud of gas and dust collapses under its own gravity, ignites fusion in its core, and a new star is born.",
    bodyKh: "ពពកធំនៃឧស្ម័ន និងធូលីដួលរលំក្រោមទំនាញខ្លួនឯង បំភ្លឺ fusion ក្នុងស្នូលរបស់វា ហើយផ្កាយថ្មីកើតមក។",
    color: "#ff7043",
    size: 14,
  },
  {
    id: "now",
    ageEn: "Today — middle-aged Yellow Dwarf",
    ageKh: "សព្វថ្ងៃ — ផ្កាយមានវ័យកណ្តាល Yellow Dwarf",
    titleEn: "You Are Here",
    titleKh: "អ្នកនៅទីនេះ",
    bodyEn: "The Sun is about half-way through its main-sequence life. It will keep shining steadily for another ~5 billion years.",
    bodyKh: "ព្រះអាទិត្យបានដើរប្រហែលពាក់កណ្ដាលនៃជីវិត Main-Sequence របស់វា។ វានឹងបន្តចាំងពន្លឺយ៉ាងស្ថិរសេស្ថេរសម្រាប់ ៥ ពាន់លានឆ្នាំទៀត។",
    color: "#ffc107",
    size: 18,
  },
  {
    id: "redgiant",
    ageEn: "in ≈ 5 billion years",
    ageKh: "ក្នុងរយៈពេលប្រហែល ៥ ពាន់លានឆ្នាំទៀត",
    titleEn: "Red Giant",
    titleKh: "Red Giant (ផ្កាយធំក្រហម)",
    bodyEn: "Hydrogen runs low. The Sun swells up to about 200× its current size — large enough to swallow Mercury and Venus, and to scorch Earth.",
    bodyKh: "អ៊ីដ្រូសែនរលត់។ ព្រះអាទិត្យឡើងធំប្រហែល ២០០ ដង នៃទំហំបច្ចុប្បន្ន — ធំល្មមចឹកស្រូប Mercury និង Venus ហើយដុតផ្ទាំងផែនដី។",
    color: "#e53935",
    size: 38,
  },
  {
    id: "whitedwarf",
    ageEn: "in ≈ 6 to 7 billion years",
    ageKh: "ក្នុងរយៈពេលប្រហែល ៦ ដល់ ៧ ពាន់លានឆ្នាំទៀត",
    titleEn: "White Dwarf",
    titleKh: "White Dwarf (ផ្កាយតូចស)",
    bodyEn: "The outer layers drift away as a planetary nebula. What's left is a dense, Earth-sized core that quietly cools for trillions of years.",
    bodyKh: "ស្រទាប់ខាងក្រៅហោះចេញជា Planetary Nebula។ អ្វីដែលនៅសល់គឺជាស្នូលក្រាស់ដែលមានទំហំស្មើផែនដី ដែលនឹងត្រជាក់យឺតៗរយៈពេលរាប់ត្រីលានឆ្នាំ។",
    color: "#e3f2fd",
    size: 6,
  },
];

function SolarLifeCycle({ lang }: { lang: Lang }) {
  const t = useTranslation();
  const isKh = lang === "kh";
  const [activeId, setActiveId] = useState<Stage["id"]>("now");
  const active = STAGES.find((s) => s.id === activeId)!;

  return (
    <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-[#0a0500] to-[#15080a] p-5 sm:p-7">
      <ToolHeader
        icon={<Clock className="w-4 h-4" />}
        en="The Sun's Life Story"
        kh="រឿងជីវិតរបស់ព្រះអាទិត្យ"
        lang={lang}
        descEn="Stars are born, live, swell, and die. Tap any milestone to see what happens at that stage."
        descKh="ផ្កាយកើត រស់ លូត និងស្លាប់។ ប៉ះលើព្រឹត្តិការណ៍ណាមួយ ដើម្បីមើលពីអ្វីដែលកើតឡើងនៅដំណាក់កាលនោះ។"
      />

      {/* Timeline bar */}
      <div className="relative mt-6 mb-8 px-2">
        {/* Track */}
        <div className="relative h-2 rounded-full bg-gradient-to-r from-orange-500/40 via-yellow-400/50 to-red-700/40" />
        {/* Progress (now ≈ 50%) */}
        <div
          className="absolute top-0 left-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-yellow-300"
          style={{ width: "calc(50% - 4px)", boxShadow: "0 0 12px rgba(255,193,7,0.6)" }}
        />

        {/* Markers */}
        <div className="absolute inset-x-2 -top-2.5 flex justify-between">
          {STAGES.map((s, i) => {
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                data-testid={`button-stage-${s.id}`}
                className="group flex flex-col items-center"
                style={{ transform: i === 1 ? "translateX(-25%)" : undefined }}
                aria-label={isKh ? s.titleKh : s.titleEn}
              >
                <div
                  className={`rounded-full border-2 transition-all ${isActive ? "scale-125" : "group-hover:scale-110"}`}
                  style={{
                    width: `${Math.max(s.size, 14)}px`,
                    height: `${Math.max(s.size, 14)}px`,
                    background: s.color,
                    borderColor: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                    boxShadow: isActive ? `0 0 18px ${s.color}` : "none",
                  }}
                />
                <span
                  className={`mt-2 text-[10px] font-bold tracking-wider uppercase ${
                    isActive ? "text-amber-300" : "text-white/45"
                  } ${isKh ? "font-khmer tracking-normal" : ""}`}
                >
                  {isKh ? s.titleKh.split(" ")[0] : s.titleEn.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active stage panel */}
      <div className="mt-12 rounded-2xl border border-amber-400/25 bg-black/45 p-4 sm:p-5" role="status" aria-live="polite">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
          <h4 className={`text-white font-display font-bold text-lg sm:text-xl ${isKh ? "font-khmer" : ""}`}>
            {isKh ? active.titleKh : active.titleEn}
          </h4>
          <span className={`text-amber-300/80 text-xs font-mono ${isKh ? "font-khmer" : ""}`}>
            {isKh ? active.ageKh : active.ageEn}
          </span>
        </div>
        <p className={`text-white/75 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh ? active.bodyKh : active.bodyEn}
        </p>
      </div>

      <p className={`mt-3 text-white/40 text-xs italic ${isKh ? "font-khmer" : ""}`}>
        {t(
          "Don't worry — the Sun has another ~5 billion years of stable shining left.",
          "កុំបារម្ភ — ព្រះអាទិត្យនៅមានពេលប្រហែល ៥ ពាន់លានឆ្នាំទៀត ក្នុងការចាំងពន្លឺយ៉ាងស្ថិរ។"
        )}
      </p>
    </div>
  );
}

// ─── 3. Solar Yardstick ─────────────────────────────────────────────────────

const PLANETS = [
  { id: "mercury", en: "Mercury", kh: "Mercury",   km: 58,   light: "3 min 13 s",  lightKh: "៣ នាទី ១៣ វិ.",  color: "#a59f97" },
  { id: "venus",   en: "Venus",   kh: "Venus",     km: 108,  light: "6 min 0 s",   lightKh: "៦ នាទី ០ វិ.",   color: "#e8c074" },
  { id: "earth",   en: "Earth",   kh: "ផែនដី",     km: 150,  light: "8 min 20 s",  lightKh: "៨ នាទី ២០ វិ.", color: "#4fc3f7" },
  { id: "mars",    en: "Mars",    kh: "Mars",      km: 228,  light: "12 min 40 s", lightKh: "១២ នាទី ៤០ វិ.",color: "#e76f51" },
];

function SolarYardstick({ lang }: { lang: Lang }) {
  const t = useTranslation();
  const isKh = lang === "kh";
  const maxKm = 250;

  return (
    <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-[#0a0500] to-[#100815] p-5 sm:p-7">
      <ToolHeader
        icon={<Ruler className="w-4 h-4" />}
        en="The Solar Yardstick"
        kh="ឈើវាស់ព្រះអាទិត្យ"
        lang={lang}
        descEn="Space is mostly… space. Here is how far each inner planet sits from our star, and how long sunlight needs to reach it."
        descKh="អវកាសភាគច្រើនគឺ… ទំហំទំនេរ។ នេះជាចម្ងាយដែលភពនីមួយៗស្ថិតនៅពីផ្កាយរបស់យើង និងរយៈពេលដែលពន្លឺត្រូវការដើម្បីទៅដល់។"
      />

      <div className="mt-2 rounded-2xl border border-white/10 bg-black/45 p-4 sm:p-6">
        {/* Scale ruler */}
        <div className="relative mb-4 sm:mb-6 pl-12 sm:pl-16 pr-3" style={{ minHeight: "140px" }}>
          {/* Sun on the left */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              style={{
                background: "radial-gradient(circle, #fff7c2, #ffb347 60%, #ff6a00)",
                boxShadow: "0 0 24px rgba(255,140,30,0.6)",
              }}
              aria-hidden
            />
            <span className={`text-amber-300 text-[10px] font-bold uppercase tracking-wider ${isKh ? "font-khmer tracking-normal" : ""}`}>
              {t("Sun", "ព្រះអាទិត្យ")}
            </span>
          </div>

          {/* Track */}
          <div className="relative top-1/2 h-px bg-gradient-to-r from-amber-300/50 to-amber-300/10" />

          {/* Planets along the ruler */}
          {PLANETS.map((p) => {
            const pct = (p.km / maxKm) * 100;
            return (
              <div
                key={p.id}
                className="absolute top-1/2"
                style={{ left: `calc(${pct}% - 14px)`, transform: "translateY(-50%)" }}
              >
                <div className="flex flex-col items-center">
                  {/* Planet dot */}
                  <div
                    className="rounded-full border border-white/30"
                    style={{
                      width: p.id === "earth" ? "16px" : "12px",
                      height: p.id === "earth" ? "16px" : "12px",
                      background: p.color,
                      boxShadow: p.id === "earth" ? "0 0 10px rgba(79,195,247,0.7)" : "none",
                    }}
                  />
                  <div className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                    <div className={`text-white text-[11px] font-bold ${isKh ? "font-khmer" : ""}`}>
                      {isKh ? p.kh : p.en}
                    </div>
                    <div className="text-white/45 text-[10px] font-mono">{p.km}M km</div>
                  </div>
                  <div className={`absolute top-5 left-1/2 -translate-x-1/2 text-center whitespace-nowrap`}>
                    <div className="inline-flex items-center gap-1 text-amber-300/80 text-[10px] font-mono">
                      <Zap className="w-2.5 h-2.5" />
                      {isKh ? p.lightKh : p.light}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Earth highlight strip */}
        <div className="rounded-xl border border-sky-400/30 bg-sky-500/5 p-3.5 mt-4 mb-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-sky-300" />
            </div>
            <div>
              <div className={`text-sky-200 text-sm font-bold mb-0.5 ${isKh ? "font-khmer" : ""}`}>
                {t(
                  "Earth: 150 million km — sunlight reaches us in 8 min 20 s.",
                  "ផែនដី៖ ១៥០ លាន គីឡូម៉ែត្រ — ពន្លឺព្រះអាទិត្យមកដល់យើងក្នុង ៨ នាទី ២០ វិនាទី។"
                )}
              </div>
              <p className={`text-sky-100/65 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "When you look at the Sun, you are seeing it as it was over 8 minutes ago. If it disappeared right now, we would not even know for 500 seconds.",
                  "ពេលអ្នកសម្លឹងមើលព្រះអាទិត្យ អ្នកកំពុងឃើញវាដូចដែលវាមានកាលពី ៨ នាទីមុន។ បើវាបាត់ខ្លួនពេលនេះ យើងមិនដឹងសូម្បីតែមួយក្នុងរយៈពេល ៥០០ វិនាទី។"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Basketball analogy */}
        <div className="rounded-xl border border-amber-400/30 bg-amber-500/5 p-3.5">
          <div className="flex items-start gap-3">
            <div className="text-3xl flex-shrink-0" role="img" aria-label="basketball">🏀</div>
            <div>
              <div className={`text-amber-200 text-sm font-bold mb-0.5 ${isKh ? "font-khmer" : ""}`}>
                {t("Imagine the scale", "ស្រមៃពីខ្នាត")}
              </div>
              <p className={`text-amber-100/75 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "If the Sun were the size of a basketball, Earth would be a tiny grain of sand sitting about 25 metres away — roughly the length of a school classroom hallway.",
                  "បើព្រះអាទិត្យធំស្មើបាល់បោះបាល់ ផែនដីនឹងជាគ្រាប់ខ្សាច់តូចមួយ ដែលនៅឆ្ងាយប្រហែល ២៥ ម៉ែត្រ — ប្រវែងស្មើនឹងច្រករបៀងសាលាមួយ។"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. Tilt & Seasons ──────────────────────────────────────────────────────

type Season = {
  id: "jun" | "sep" | "dec" | "mar";
  monthEn: string; monthKh: string;
  northEn: string; northKh: string;
  northTone: "summer" | "winter" | "equinox";
  // angle around the orbit, in degrees (0° = right, 90° = top)
  angle: number;
  // tilt direction relative to viewer for the small Earth glyph
  tilt: number; // degrees
};

// This is the standard high-school textbook SCHEMATIC of seasons, not a
// literal 2D physics projection. The key fact we want to teach is the only
// fact that actually matters for seasons: Earth's axis points in a *fixed*
// direction in absolute space and does not swing around as Earth orbits.
// We render that by giving every season the same `tilt` (+23.5°, so the
// N-pole always leans toward the upper-right of the screen). Then we anchor
// the two solstices at the orbital positions that make the toward/away
// relationship visually obvious:
//   • June (N. summer):   Earth at the LEFT  of the Sun → fixed-right axis points TOWARD the Sun
//   • December (N. winter):Earth at the RIGHT of the Sun → fixed-right axis points AWAY from the Sun
// The equinox positions (top and bottom of the ellipse) are presented as the
// in-between stages along the orbit; we deliberately avoid claiming exact
// perpendicular geometry, which would not be true in this simplified 2D view.
const FIXED_TILT = 23.5;
const SEASONS: Season[] = [
  { id: "jun", monthEn: "June Solstice",     monthKh: "អយនវិសុវត្ ខែមិថុនា",  northEn: "Summer in N. Hemisphere", northKh: "រដូវក្ដៅនៅអឌ្ឍគោលខាងជើង", northTone: "summer",  angle: 180, tilt: FIXED_TILT },
  { id: "sep", monthEn: "Sept. Equinox",     monthKh: "សមរវិសុវត្ ខែកញ្ញា",   northEn: "Equal day & night",        northKh: "ថ្ងៃ និងយប់ស្មើគ្នា",         northTone: "equinox", angle: 270, tilt: FIXED_TILT },
  { id: "dec", monthEn: "December Solstice", monthKh: "អយនវិសុវត្ ខែធ្នូ",     northEn: "Winter in N. Hemisphere",  northKh: "រដូវរងានៅអឌ្ឍគោលខាងជើង",  northTone: "winter",  angle: 0,   tilt: FIXED_TILT },
  { id: "mar", monthEn: "March Equinox",     monthKh: "សមរវិសុវត្ ខែមីនា",     northEn: "Equal day & night",        northKh: "ថ្ងៃ និងយប់ស្មើគ្នា",         northTone: "equinox", angle: 90,  tilt: FIXED_TILT },
];

function TiltAndSeasons({ lang }: { lang: Lang }) {
  const t = useTranslation();
  const isKh = lang === "kh";
  const [seasonId, setSeasonId] = useState<Season["id"]>("jun");
  const [autoplay, setAutoplay] = useState(false);

  // Autoplay rotates through seasons every 1.8s. Timeout is cleared on
  // toggle-off, manual season change, and unmount.
  useEffect(() => {
    if (!autoplay) return;
    const order: Season["id"][] = ["jun", "sep", "dec", "mar"];
    const i = order.indexOf(seasonId);
    const id = setTimeout(() => setSeasonId(order[(i + 1) % 4]), 1800);
    return () => clearTimeout(id);
  }, [autoplay, seasonId]);

  const season = SEASONS.find((s) => s.id === seasonId)!;
  const rad = (season.angle * Math.PI) / 180;
  // Orbit radius for placing Earth
  const orbitR = 130;
  const earthX = Math.cos(rad) * orbitR;
  const earthY = -Math.sin(rad) * orbitR;

  return (
    <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-[#020010] to-[#0a0518] p-5 sm:p-7">
      <ToolHeader
        icon={<RotateCw className="w-4 h-4" />}
        en="Tilt & Seasons Simulator"
        kh="ការក្រឡៃ និងរដូវ — ការសាកល្បងអន្តរកម្ម"
        lang={lang}
        descEn="Earth's axis is tilted 23.5°. That single tilt is the entire reason for seasons. Click a month to see the geometry."
        descKh="អ័ក្សផែនដីត្រូវបានក្រឡៃ ២៣.៥°។ ការក្រឡៃនេះតែមួយ គឺជាមូលហេតុនៃរដូវទាំងអស់។ ចុចខែណាមួយ ដើម្បីឃើញធរណីមាត្រ។"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] gap-6 items-start">

        {/* Orbit diagram */}
        <div className="relative aspect-square w-full max-w-[420px] mx-auto" data-testid="orbit-diagram">
          <svg viewBox="-180 -180 360 360" className="w-full h-full">
            {/* Orbit ellipse */}
            <ellipse cx="0" cy="0" rx={orbitR} ry={orbitR * 0.55} fill="none" stroke="rgba(255,193,7,0.25)" strokeDasharray="3 4" />

            {/* Sun */}
            <defs>
              <radialGradient id="sunCenter" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff7c2" />
                <stop offset="60%" stopColor="#ffb347" />
                <stop offset="100%" stopColor="#ff6a00" />
              </radialGradient>
            </defs>
            <circle cx="0" cy="0" r="36" fill="url(#sunCenter)" style={{ filter: "drop-shadow(0 0 14px rgba(255,140,30,0.6))" }} />

            {/* Markers for the four positions on the orbit. They are real,
                keyboard-operable buttons (focusable + Enter/Space activates).
                Manual selection also stops autoplay so the user stays in
                control of what they are looking at. */}
            {SEASONS.map((s) => {
              const r = (s.angle * Math.PI) / 180;
              const x = Math.cos(r) * orbitR;
              const y = -Math.sin(r) * orbitR * 0.55;
              const isActive = s.id === seasonId;
              const select = () => { setSeasonId(s.id); setAutoplay(false); };
              return (
                <g
                  key={s.id}
                  onClick={select}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(); }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={isKh ? s.monthKh : s.monthEn}
                  style={{ cursor: "pointer", outline: "none" }}
                  data-testid={`button-orbit-${s.id}`}
                >
                  <circle cx={x} cy={y} r={isActive ? 4 : 3} fill={isActive ? "#ffeb3b" : "rgba(255,255,255,0.35)"} />
                  {/* Larger transparent hit/focus target for keyboard & touch. */}
                  <circle cx={x} cy={y} r="12" fill="transparent" stroke={isActive ? "rgba(255,235,59,0.4)" : "transparent"} strokeWidth="1" />
                </g>
              );
            })}

            {/* Earth at active position with tilted axis */}
            <g
              style={{
                transform: `translate(${earthX}px, ${earthY * 0.55}px)`,
                transition: "transform 0.7s ease",
              }}
            >
              {/* The tilted axis line */}
              <line
                x1="0" y1="-22" x2="0" y2="22"
                stroke="#fff"
                strokeWidth="1.5"
                strokeDasharray="2 2"
                transform={`rotate(${season.tilt})`}
                opacity="0.7"
              />
              {/* Earth body */}
              <circle cx="0" cy="0" r="14" fill="#1976d2" />
              {/* Northern hemisphere highlight (above equator after tilt) */}
              <g transform={`rotate(${season.tilt})`}>
                <path d="M -14 0 A 14 14 0 0 1 14 0 Z" fill="#4fc3f7" opacity="0.85" />
                {/* N pole marker */}
                <circle cx="0" cy="-14" r="2" fill="#fff" />
                <text x="4" y="-14" fill="#fff" fontSize="8" fontFamily="monospace">N</text>
              </g>
              {/* Sunlight indicator arrow pointing TOWARD the sun */}
              {(() => {
                const dirX = -earthX;
                const dirY = -earthY * 0.55;
                const len = Math.hypot(dirX, dirY) || 1;
                const ux = dirX / len, uy = dirY / len;
                const startX = ux * 18, startY = uy * 18;
                const endX = ux * 36, endY = uy * 36;
                return (
                  <g>
                    <line x1={startX} y1={startY} x2={endX} y2={endY} stroke="#ffeb3b" strokeWidth="1.5" opacity="0.7" markerEnd="url(#sunArrow)" />
                  </g>
                );
              })()}
            </g>

            <defs>
              <marker id="sunArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 Z" fill="#ffeb3b" />
              </marker>
            </defs>

            {/* Month labels around orbit — positions correspond to the
                Season `angle` values above (right=Dec, top=Mar, left=Jun,
                bottom=Sep). */}
            <text x={orbitR + 12} y="4"                       fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="monospace">Dec</text>
            <text x="-12"          y={-orbitR * 0.55 - 8}     fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="monospace">Mar</text>
            <text x={-orbitR - 28} y="4"                       fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="monospace">Jun</text>
            <text x="-12"          y={orbitR * 0.55 + 14}     fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="monospace">Sep</text>

            {/* Tilt callout */}
            <text x="-170" y="-160" fill="#ffeb3b" fontSize="10" fontFamily="monospace">23.5° tilt</text>
          </svg>
        </div>

        {/* Side panel */}
        <div>
          {/* Season buttons */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {SEASONS.map((s) => {
              const isActive = s.id === seasonId;
              return (
                <button
                  key={s.id}
                  onClick={() => { setSeasonId(s.id); setAutoplay(false); }}
                  data-testid={`button-season-${s.id}`}
                  className={`text-left px-3 py-2 rounded-lg border transition-colors ${
                    isActive
                      ? "border-amber-400 bg-amber-400/15 text-amber-200"
                      : "border-white/15 bg-white/5 text-white/60 hover:text-white"
                  }`}
                >
                  <div className={`text-[11px] font-bold ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? s.monthKh : s.monthEn}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setAutoplay((v) => !v)}
            data-testid="button-autoplay"
            className={`w-full mb-4 inline-flex items-center justify-center gap-2 rounded-lg border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 text-amber-200 text-xs font-bold py-2 transition-colors ${isKh ? "font-khmer" : ""}`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoplay ? "animate-spin" : ""}`} />
            {autoplay ? t("Stop the year", "ឈប់ឆ្នាំ") : t("Watch a full year", "មើលឆ្នាំពេញ")}
          </button>

          {/* Northern hemisphere outcome */}
          <div
            className="rounded-2xl border p-4"
            style={{
              borderColor:
                season.northTone === "summer" ? "rgba(245,158,11,0.5)" :
                season.northTone === "winter" ? "rgba(96,165,250,0.5)" :
                "rgba(148,163,184,0.5)",
              background:
                season.northTone === "summer" ? "rgba(245,158,11,0.08)" :
                season.northTone === "winter" ? "rgba(96,165,250,0.08)" :
                "rgba(148,163,184,0.08)",
            }}
            role="status" aria-live="polite"
          >
            <div className={`text-white font-bold text-sm mb-1 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? season.northKh : season.northEn}
            </div>
            <p className={`text-white/65 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {season.northTone === "summer" && t(
                "The Northern Hemisphere is tilted toward the Sun. Days are longer, sunlight strikes more directly, and air heats up.",
                "អឌ្ឍគោលខាងជើងក្រឡៃឆ្ពោះទៅរកព្រះអាទិត្យ។ ថ្ងៃវែងជាង ពន្លឺព្រះអាទិត្យបុកដោយផ្ទាល់ និងអាកាសក្ដៅឡើង។"
              )}
              {season.northTone === "winter" && t(
                "The Northern Hemisphere is tilted away from the Sun. Days are shorter, sunlight arrives at a shallow angle, and the air cools.",
                "អឌ្ឍគោលខាងជើងក្រឡៃចេញពីព្រះអាទិត្យ។ ថ្ងៃខ្លី ពន្លឺមកដោយមុំទាប និងអាកាសត្រជាក់។"
              )}
              {season.northTone === "equinox" && t(
                "This is the half-way point between summer and winter geometry. Both hemispheres receive roughly equal amounts of sunlight, so day and night are about the same length all over the planet.",
                "នេះគឺជាចំណុចពាក់កណ្ដាលចន្លោះធរណីមាត្ររដូវក្ដៅ និងរដូវរងា។ អឌ្ឍគោលទាំងពីរទទួលពន្លឺព្រះអាទិត្យប្រហែលគ្នា ដូច្នេះថ្ងៃ និងយប់មានប្រវែងស្មើគ្នាជិតៗគ្រប់ទីកន្លែងលើភពផែនដី។"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Cambodia context */}
      <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/5 p-4 sm:p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-emerald-300" />
          </div>
          <div>
            <div className={`text-emerald-200 font-bold text-sm mb-0.5 ${isKh ? "font-khmer" : ""}`}>
              {t("Why Cambodia has Wet & Dry seasons, not four", "ហេតុអ្វីកម្ពុជាមានរដូវវស្សា និងរដូវប្រាំង មិនមែនបួន")}
            </div>
            <p className={`text-emerald-100/70 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Cambodia sits very close to the Equator (~11.5° N). At that latitude the 23.5° tilt has only a small effect — daylight stays close to 12 hours and the Sun is high all year. Our seasons are driven instead by monsoon winds:",
                "កម្ពុជាស្ថិតនៅជិតបន្ទាត់អេក្វាទ័រ (≈ ១១.៥° ខាងជើង)។ នៅរយៈទទឹងនេះ ការក្រឡៃ ២៣.៥° មានឥទ្ធិពលតិចប៉ុណ្ណោះ — ពេលថ្ងៃនៅជិត ១២ ម៉ោង ហើយព្រះអាទិត្យឡើងខ្ពស់ពេញមួយឆ្នាំ។ រដូវរបស់យើងត្រូវបានជំរុញដោយខ្យល់ moson វិញ៖"
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-12">
          <div className="rounded-xl border border-sky-400/30 bg-sky-500/5 p-3">
            <div className="flex items-center gap-2 mb-1">
              <CloudRain className="w-4 h-4 text-sky-300" />
              <span className={`text-sky-200 text-xs font-bold ${isKh ? "font-khmer" : ""}`}>
                {t("Wet — May to October", "រដូវវស្សា — ឧសភា ដល់ តុលា")}
              </span>
            </div>
            <p className={`text-sky-100/65 text-[11px] leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Southwest monsoon winds carry moist air from the Indian Ocean over the country, bringing daily afternoon rains.",
                "ខ្យល់ moson ពីនិរតីនាំខ្យល់សើមពីមហាសមុទ្រឥណ្ឌាមកលើប្រទេស ដែលនាំមកនូវភ្លៀងប្រចាំថ្ងៃនៅពេលរសៀល។"
              )}
            </p>
          </div>
          <div className="rounded-xl border border-amber-400/30 bg-amber-500/5 p-3">
            <div className="flex items-center gap-2 mb-1">
              <Cloud className="w-4 h-4 text-amber-300" />
              <span className={`text-amber-200 text-xs font-bold ${isKh ? "font-khmer" : ""}`}>
                {t("Dry — November to April", "រដូវប្រាំង — វិច្ឆិកា ដល់ មេសា")}
              </span>
            </div>
            <p className={`text-amber-100/65 text-[11px] leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Northeast monsoon winds blow in dry air from inland Asia. The skies clear, humidity drops, and the Mekong recedes.",
                "ខ្យល់ moson ពីឦសានបក់ខ្យល់ស្ងួតពីដីគោកអាស៊ី។ មេឃភ្លឺ សំណើមធ្លាក់ចុះ ហើយទន្លេមេគង្គស្ងួតថយ។"
              )}
            </p>
          </div>
        </div>

        <div className="mt-3 ml-12 flex items-start gap-2 text-emerald-100/55 text-[11px]">
          <Droplets className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          <span className={isKh ? "font-khmer leading-loose" : "leading-relaxed"}>
            {t(
              "So the same 23.5° tilt that gives Europe four seasons gives the Mekong its great pulse of flood and drought instead.",
              "ដូច្នេះ ការក្រឡៃ ២៣.៥° ដដែលដែលផ្ដល់ឱ្យអឺរ៉ុបនូវរដូវបួន ផ្ដល់ឱ្យទន្លេមេគង្គនូវចង្វាក់ដ៏អស្ចារ្យនៃទឹកជំនន់ និងគ្រោះរាំងស្ងួតវិញ។"
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Module ──────────────────────────────────────────────────────────────────

export function TheSunModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const isKh = lang === "kh";

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20" data-testid="section-the-sun">
      {/* Section header — matches the other sections on /space */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-300">
          <Sun className="w-3.5 h-3.5" />
        </div>
        <span className={`text-xs font-bold tracking-widest text-amber-300 uppercase ${isKh ? "font-khmer tracking-normal" : ""}`}>
          {t("The Sun: Our Local Star", "ព្រះអាទិត្យ៖ ផ្កាយក្នុងតំបន់របស់យើង")}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-amber-400/30 to-transparent" />
      </div>

      <div className="rounded-3xl border border-amber-500/15 bg-black/30 backdrop-blur-sm p-4 sm:p-5 mb-5 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-300 mt-0.5 flex-shrink-0" />
        <p className={`text-white/65 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "Every drop of rain, every grain of rice, every gust of monsoon wind — all of it is energy that started inside the Sun. Let's take it apart.",
            "រាល់តំណក់ភ្លៀង រាល់គ្រាប់អង្ករ រាល់ខ្យល់ moson — ទាំងអស់នេះគឺថាមពលដែលចាប់ផ្ដើមនៅខាងក្នុងព្រះអាទិត្យ។ តោះ ដោះស្រាយវាជាមួយគ្នា។"
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <SolarAnatomy lang={lang} />
        <SolarLifeCycle lang={lang} />
        <SolarYardstick lang={lang} />
        <TiltAndSeasons lang={lang} />
      </div>
    </section>
  );
}
