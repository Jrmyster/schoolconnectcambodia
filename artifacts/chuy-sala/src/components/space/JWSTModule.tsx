import { useRef, useState } from "react";
import {
  Telescope, Hexagon, Snowflake, Flame, Eye, Sparkles, Target,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Lang = "en" | "kh";

// ── Reusable subsection header ──────────────────────────────────────────────

function ModuleHeader({
  icon, en, kh, lang, descEn, descKh,
}: {
  icon: React.ReactNode; en: string; kh: string; lang: Lang;
  descEn: string; descKh: string;
}) {
  const isKh = lang === "kh";
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300">
          {icon}
        </div>
        <h3 className={`font-display font-bold text-white text-lg sm:text-xl ${isKh ? "font-khmer" : ""}`}>
          {isKh ? kh : en}
        </h3>
      </div>
      <p className={`text-white/65 text-sm leading-relaxed ml-[42px] ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? descKh : descEn}
      </p>
    </div>
  );
}

// ── 1. Mission overview ─────────────────────────────────────────────────────

function MissionPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  const goals = [
    {
      icon: Sparkles,
      en: "See the very first stars and galaxies that lit up after the Big Bang — light that has been travelling for over 13 billion years.",
      kh: "មើលឃើញផ្កាយ និងហ្គាឡាក់ស៊ីដំបូងបំផុត ដែលបានបំភ្លឺឡើងបន្ទាប់ពីការផ្ទុះធំ — ពន្លឺដែលធ្វើដំណើរអស់រយៈពេលជាង ១៣ ពាន់លានឆ្នាំ។",
    },
    {
      icon: Target,
      en: "\"Sniff\" the atmospheres of planets orbiting other stars, looking for water vapor — and possible signs of life.",
      kh: "\"ហិត\" បរិយាកាសនៃភពដែលបង្វិលជុំវិញផ្កាយផ្សេងទៀត ស្វែងរកចំហាយទឹក — និងសញ្ញាជីវិតដែលអាចមាន។",
    },
    {
      icon: Telescope,
      en: "Watch new stars and planets being born inside thick clouds of cosmic dust that no other telescope can see through.",
      kh: "មើលផ្កាយ និងភពថ្មីៗ កំពុងកើតនៅខាងក្នុងពពកធូលីចក្រវាលក្រាស់ ដែលទូរទស្សន៍ផ្សេងទៀត មើលឆ្លងកាត់មិនបាន។",
    },
  ] as const;

  return (
    <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-br from-[#0b0a08] via-[#1a1206] to-[#020012] p-5 sm:p-7">
      <ModuleHeader
        icon={<Telescope className="w-4 h-4" />}
        en="The Mission"
        kh="បេសកកម្ម"
        lang={lang}
        descEn="The James Webb Space Telescope (JWST) is the most powerful telescope ever built — a $10-billion gold-mirrored eye, launched on Christmas Day 2021, designed to answer two of humanity's oldest questions."
        descKh="ទូរទស្សន៍អវកាស JWST គឺជាទូរទស្សន៍ដ៏មានឥទ្ធិពលបំផុតដែលធ្លាប់សាងសង់ — ភ្នែកមាសតម្លៃ ១០ ពាន់លានដុល្លារ ដែលត្រូវបានបាញ់បង្ហោះនៅថ្ងៃបុណ្យណូអែលឆ្នាំ ២០២១ បង្កើតឡើងដើម្បីឆ្លើយសំណួរចាស់បំផុតពីរ របស់មនុស្សជាតិ។"
      />

      {/* Hexagonal mirror visual + goals */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)] gap-5 items-start">
        {/* JWST mirror cluster — 18 hexagons in honeycomb arrangement */}
        <div className="flex justify-center">
          <svg viewBox="-110 -100 220 200" className="w-full max-w-[200px]" aria-hidden>
            <defs>
              <radialGradient id="jwst-mirror" cx="0.35" cy="0.35" r="0.7">
                <stop offset="0%" stopColor="#fff8c8" />
                <stop offset="40%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#92400e" />
              </radialGradient>
              <filter id="jwst-glow">
                <feGaussianBlur stdDeviation="2.5" />
              </filter>
            </defs>
            {/* Glow halo */}
            <circle cx="0" cy="0" r="95" fill="#fbbf24" opacity="0.08" filter="url(#jwst-glow)" />
            {/* 18 hexagonal segments — flat-top hex grid */}
            {(() => {
              const r = 18;
              const dx = r * Math.sqrt(3);
              const dy = r * 1.5;
              // 18-hex JWST primary mirror cluster: 1 center + 6 ring-1 + 11 ring-2.
              // Ring 2 has 12 symmetric positions; we drop the bottom-center cell
              // (0, 2*dy) to mimic JWST's secondary-mirror notch.
              const positions = [
                [0, 0],
                // Ring 1 (6 cells around the center)
                [dx, 0], [-dx, 0],
                [dx / 2, dy], [-dx / 2, dy],
                [dx / 2, -dy], [-dx / 2, -dy],
                // Ring 2 (11 cells, symmetric left-right)
                [2 * dx, 0], [-2 * dx, 0],
                [1.5 * dx, dy], [-1.5 * dx, dy],
                [1.5 * dx, -dy], [-1.5 * dx, -dy],
                [dx, 2 * dy], [-dx, 2 * dy],
                [dx, -2 * dy], [-dx, -2 * dy],
                [0, -2 * dy],
              ];
              const points = (cx: number, cy: number) =>
                Array.from({ length: 6 }, (_, i) => {
                  const a = (Math.PI / 3) * i + Math.PI / 6;
                  return `${cx + r * 0.94 * Math.cos(a)},${cy + r * 0.94 * Math.sin(a)}`;
                }).join(" ");
              return positions.map(([cx, cy], i) => (
                <polygon
                  key={i}
                  points={points(cx, cy)}
                  fill="url(#jwst-mirror)"
                  stroke="#78350f"
                  strokeWidth="0.6"
                />
              ));
            })()}
          </svg>
        </div>

        <ul className="space-y-3">
          {goals.map((g, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/3 px-4 py-3"
            >
              <g.icon className="w-4 h-4 text-amber-300 mt-0.5 flex-shrink-0" />
              <p className={`text-white/80 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? g.kh : g.en}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── 2. Infrared vs visible — draggable wipe slider ──────────────────────────

function InfraredCompareSlider({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";
  const [pct, setPct] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const handlePointer = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next = ((clientX - r.left) / r.width) * 100;
    setPct(Math.max(0, Math.min(100, next)));
  };

  return (
    <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-br from-[#0b0a08] via-[#1a1206] to-[#020012] p-5 sm:p-7">
      <ModuleHeader
        icon={<Eye className="w-4 h-4" />}
        en="Infrared Vision"
        kh="ចក្ខុវិស័យអ៊ីនហ្វ្រារ៉េដ"
        lang={lang}
        descEn="JWST does not see ordinary visible light. It sees infrared — heat light. Cosmic dust clouds are like thick smoke that blocks visible light, but infrared passes right through. Drag the slider to see how the same star nursery looks to Hubble (visible) versus Webb (infrared)."
        descKh="JWST មិនមើលឃើញពន្លឺធម្មតាដែលភ្នែកយើងឃើញទេ។ វាមើលឃើញពន្លឺអ៊ីនហ្វ្រារ៉េដ — ពន្លឺកម្ដៅ។ ពពកធូលីចក្រវាលគឺដូចជាផ្សែងក្រាស់ដែលរារាំងពន្លឺមើលឃើញ ប៉ុន្តែអ៊ីនហ្វ្រារ៉េដឆ្លងកាត់បានយ៉ាងងាយ។ អូសរំកិលដើម្បីមើលថា ស្ថានភាពនៃផ្ទះកំណើតផ្កាយដូចគ្នា មើលទៅយ៉ាងណានៅទូរទស្សន៍ហាប់បល់ ដែលប្រើពន្លឺមើលឃើញ ធៀបនឹង JWST ដែលប្រើអ៊ីនហ្វ្រារ៉េដ។"
      />

      <div
        ref={ref}
        className="relative w-full aspect-[16/9] max-w-[640px] mx-auto rounded-2xl overflow-hidden border border-white/10 select-none cursor-ew-resize touch-none"
        data-testid="ir-compare-slider"
        onPointerDown={(e) => {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          handlePointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons) handlePointer(e.clientX);
        }}
      >
        {/* Visible (Hubble) — bottom layer: dusty nebula */}
        <NebulaScene mode="visible" />

        {/* Infrared (Webb) — top layer, clipped from left to pct */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
          aria-hidden
        >
          <NebulaScene mode="infrared" />
        </div>

        {/* Divider handle */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-amber-300/90 shadow-[0_0_12px_rgba(252,211,77,0.7)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-amber-300 border-2 border-amber-100 shadow-[0_0_20px_rgba(252,211,77,0.7)] flex items-center justify-center text-[#451a03] font-bold text-xs">
            ⇆
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/55 backdrop-blur-sm flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-sky-300" />
          <span className={`text-xs font-semibold text-sky-200 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ហាប់បល់ · មើលឃើញ" : "Hubble · Visible"}
          </span>
        </div>
        <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-black/55 backdrop-blur-sm flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-amber-300" />
          <span className={`text-xs font-semibold text-amber-200 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "JWST · អ៊ីនហ្វ្រារ៉េដ" : "Webb · Infrared"}
          </span>
        </div>
      </div>

      {/* Range fallback for keyboard / non-pointer users */}
      <div className="mt-3 max-w-[640px] mx-auto">
        <input
          type="range"
          min={0}
          max={100}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          aria-label={isKh ? "កែសម្រួលការប្រៀបធៀបរវាងហាប់បល់ និង JWST" : "Adjust Hubble vs Webb comparison"}
          className="w-full accent-amber-400"
          data-testid="ir-compare-range"
        />
      </div>

      <p className={`text-white/55 text-xs text-center mt-2 max-w-md mx-auto ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh
          ? "ផ្នែកខាងឆ្វេង៖ ពពកធូលីលាក់បាំងផ្កាយ។ ផ្នែកខាងស្ដាំ៖ អ៊ីនហ្វ្រារ៉េដបង្ហាញផ្កាយខាងក្នុង។"
          : "Left side: dust hides the stars. Right side: infrared reveals the stars hidden inside."}
      </p>
    </div>
  );
}

function NebulaScene({ mode }: { mode: "visible" | "infrared" }) {
  // Two scenes share the same star coordinates — only opacity differs by mode.
  const stars = [
    [120, 90, 5], [180, 140, 7], [250, 100, 4], [310, 170, 6],
    [380, 110, 5], [445, 150, 8], [200, 200, 4], [340, 70, 5],
    [410, 220, 6], [275, 230, 4], [150, 60, 4], [490, 90, 6],
    [495, 200, 5], [230, 60, 3], [380, 200, 5],
  ] as const;
  const isVisible = mode === "visible";
  return (
    <svg viewBox="0 0 560 315" className="absolute inset-0 w-full h-full" aria-hidden>
      <defs>
        <radialGradient id={`bg-${mode}`} cx="0.5" cy="0.5" r="0.7">
          <stop offset="0%" stopColor={isVisible ? "#1e1b4b" : "#3b0764"} />
          <stop offset="100%" stopColor="#020010" />
        </radialGradient>
        <radialGradient id={`dust-${mode}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={isVisible ? "#7e22ce" : "#dc2626"} stopOpacity={isVisible ? 0.8 : 0.18} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id={`star-${mode}`}>
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>

      <rect width="560" height="315" fill={`url(#bg-${mode})`} />

      {/* Multiple dust clouds */}
      <ellipse cx="180" cy="140" rx="160" ry="100" fill={`url(#dust-${mode})`} />
      <ellipse cx="380" cy="180" rx="180" ry="110" fill={`url(#dust-${mode})`} />
      <ellipse cx="290" cy="100" rx="140" ry="80"  fill={`url(#dust-${mode})`} />

      {/* Stars — far brighter in infrared (dust no longer hides them) */}
      {stars.map(([cx, cy, r], i) => (
        <g key={i} filter={`url(#star-${mode})`}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill={isVisible ? "#cbd5e1" : "#fde68a"}
            opacity={isVisible ? 0.30 : 0.95}
          />
          {!isVisible && (
            <circle cx={cx} cy={cy} r={r * 0.45} fill="#fff" opacity="0.95" />
          )}
        </g>
      ))}

      {/* A handful of brand-new "hidden" stars only visible in infrared */}
      {!isVisible && [
        [220, 165], [310, 145], [365, 100], [275, 195], [400, 145],
      ].map(([cx, cy], i) => (
        <g key={`h${i}`} filter={`url(#star-${mode})`}>
          <circle cx={cx} cy={cy} r={5} fill="#fde68a" />
          <circle cx={cx} cy={cy} r={2} fill="#fff" />
        </g>
      ))}
    </svg>
  );
}

// ── 3. Lagrange L2 diagram ──────────────────────────────────────────────────

function LagrangeL2Panel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-br from-[#0b0a08] via-[#1a1206] to-[#020012] p-5 sm:p-7">
      <ModuleHeader
        icon={<Snowflake className="w-4 h-4" />}
        en="The Lagrange Point L2"
        kh="ចំណុចឡាហ្គ្រង់ L2"
        lang={lang}
        descEn={"JWST does not orbit the Earth like the Moon. It \"parks\" at a special spot 1.5 million kilometres away called L2 — about four times further from Earth than the Moon."}
        descKh={"JWST មិនបង្វិលជុំវិញផែនដីដូចព្រះច័ន្ទទេ។ វា \"ចត\" នៅចំណុចពិសេសមួយ ឆ្ងាយ ១,៥ លានគីឡូម៉ែត្រ ហៅថា L2 — ប្រហែលបួនដងឆ្ងាយជាងព្រះច័ន្ទពីផែនដី។"}
      />

      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-6" data-testid="l2-diagram">
        <svg viewBox="0 0 640 280" className="w-full h-auto" aria-label="Lagrange L2 diagram">
          <defs>
            <radialGradient id="l2-sun" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="55%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="l2-earth" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </radialGradient>
            <filter id="l2-glow"><feGaussianBlur stdDeviation="2.5" /></filter>
          </defs>

          {/* Background stars */}
          {[
            [40, 30], [120, 220], [280, 30], [490, 50], [600, 240], [200, 250], [340, 240], [560, 30],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.2" fill="#e0f2fe" opacity="0.7" />
          ))}

          {/* Sun (left) */}
          <circle cx="50" cy="140" r="40" fill="url(#l2-sun)" />
          <circle cx="50" cy="140" r="22" fill="#fde047" filter="url(#l2-glow)" />
          <text x="50" y="200" textAnchor="middle" fontSize="11" fill="#fbbf24" fontWeight="700">
            {isKh ? "ព្រះអាទិត្យ" : "Sun"}
          </text>

          {/* Earth's orbit hint */}
          <ellipse cx="50" cy="140" rx="380" ry="0" stroke="#475569" strokeDasharray="3 4" />

          {/* Sun-Earth axis dashed */}
          <line x1="90" y1="140" x2="600" y2="140" stroke="#fbbf24" strokeOpacity="0.25" strokeDasharray="6 6" />

          {/* Earth */}
          <circle cx="430" cy="140" r="14" fill="url(#l2-earth)" />
          <text x="430" y="172" textAnchor="middle" fontSize="11" fill="#93c5fd" fontWeight="700">
            {isKh ? "ផែនដី" : "Earth"}
          </text>

          {/* Moon — just for scale reference */}
          <circle cx="468" cy="124" r="3.5" fill="#cbd5e1" />
          <text x="468" y="112" textAnchor="middle" fontSize="9" fill="#94a3b8">
            {isKh ? "ច័ន្ទ" : "Moon"}
          </text>

          {/* L2 point + JWST */}
          <g transform="translate(560,140)">
            {/* Sunshield — diamond facing the Sun */}
            <polygon points="-22,-18 0,0 -22,18 -44,0" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1" />
            {/* Mirror cluster behind — small gold hexagon stack */}
            <polygon points="0,-12 10,-6 10,6 0,12 -10,6 -10,-6"  fill="#fbbf24" stroke="#78350f" strokeWidth="0.6" />
            <polygon points="14,-10 22,-5 22,5 14,10 6,5 6,-5"    fill="#fbbf24" stroke="#78350f" strokeWidth="0.6" opacity="0.85" />
            <polygon points="-14,-10 -6,-5 -6,5 -14,10 -22,5 -22,-5" fill="#fbbf24" stroke="#78350f" strokeWidth="0.6" opacity="0.85" />
            {/* Halo */}
            <circle cx="0" cy="0" r="34" fill="none" stroke="#fbbf24" strokeOpacity="0.35" strokeDasharray="2 4" />
          </g>
          <text x="560" y="200" textAnchor="middle" fontSize="11" fill="#fbbf24" fontWeight="700">
            JWST · L2
          </text>
          <text x="560" y="216" textAnchor="middle" fontSize="9" fill="#94a3b8">
            {isKh ? "ឆ្ងាយ ១,៥ លាន គម" : "1.5 million km"}
          </text>

          {/* Cold-side label */}
          <text x="600" y="124" textAnchor="end" fontSize="9" fill="#67e8f9">
            {isKh ? "ត្រជាក់ · ភ្នែក" : "Cold · Mirrors"}
          </text>
          {/* Hot-side label */}
          <text x="520" y="124" textAnchor="end" fontSize="9" fill="#fbbf24">
            {isKh ? "ក្ដៅ · ខែលព្រះអាទិត្យ" : "Hot · Sunshield"}
          </text>
        </svg>
      </div>

      {/* Why L2 — three small cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
        <FeatureCard
          icon={Target}
          tone="amber"
          en="Always in line"
          kh="ស្ថិតក្នុងជួរជានិច្ច"
          bodyEn="The combined gravity of the Sun and Earth keeps JWST locked on the same line as Earth, orbiting the Sun together."
          bodyKh="ទំនាញរួមនៃព្រះអាទិត្យ និងផែនដី រក្សាឱ្យ JWST ស្ថិតក្នុងជួរតែមួយជាមួយផែនដី បង្វិលជុំវិញព្រះអាទិត្យជាមួយគ្នា។"
        />
        <FeatureCard
          icon={Flame}
          tone="amber"
          en="Sunshield always faces the Sun"
          kh="ខែលព្រះអាទិត្យបែរទៅព្រះអាទិត្យជានិច្ច"
          bodyEn="One side of the spacecraft always faces the Sun, Earth, and Moon — so the giant tennis-court-sized sunshield can block all that heat."
          bodyKh="ផ្នែកម្ខាងនៃយានអវកាស បែរទៅព្រះអាទិត្យ ផែនដី និងព្រះច័ន្ទជានិច្ច — ដូច្នេះខែលព្រះអាទិត្យធំទំហំទីលានកីឡា អាចរារាំងកម្ដៅទាំងអស់នោះ។"
        />
        <FeatureCard
          icon={Snowflake}
          tone="cyan"
          en="Permanent freezing dark"
          kh="ងងឹតត្រជាក់អស់កល្ប"
          bodyEn={"The other side stays at −233 °C, dark and cold, so the mirrors can \"hear\" the faintest infrared whispers from the early Universe."}
          bodyKh={"ផ្នែកម្ខាងទៀតរក្សាសីតុណ្ហភាព −២៣៣ °C ងងឹត និងត្រជាក់ ដូច្នេះកញ្ចក់អាច \"ស្ដាប់\" សម្លេងខ្សិបអ៊ីនហ្វ្រារ៉េដខ្សោយបំផុត ពីសកលលោកដំបូង។"}
        />
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon, tone, en, kh, bodyEn, bodyKh,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone: "amber" | "cyan";
  en: string; kh: string; bodyEn: string; bodyKh: string;
}) {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const c = tone === "amber"
    ? { ring: "border-amber-400/30 bg-amber-500/5", icon: "text-amber-300", title: "text-amber-200" }
    : { ring: "border-cyan-400/30 bg-cyan-500/5",   icon: "text-cyan-300",  title: "text-cyan-200" };
  return (
    <div className={`rounded-xl border ${c.ring} p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${c.icon}`} />
        <h4 className={`text-sm font-bold ${c.title} ${isKh ? "font-khmer" : ""}`}>
          {isKh ? kh : en}
        </h4>
      </div>
      <p className={`text-white/65 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? bodyKh : bodyEn}
      </p>
    </div>
  );
}

// ── Main module wrapper ─────────────────────────────────────────────────────

export function JWSTModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const kh = lang === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      data-testid="jwst-module"
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
            <Hexagon className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-amber-300 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("JWST: The Cosmic Time Machine", "ទូរទស្សន៍អវកាស JWST៖ ម៉ាស៊ីនពេលវេលាអវកាស")}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-amber-400/30 to-transparent" />
      </div>

      {/* Glowing intro card */}
      <div
        className="rounded-3xl border border-amber-400/30 p-6 sm:p-8 mb-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(251,191,36,0.10) 0%,rgba(15,23,42,0.6) 60%,rgba(2,6,23,0.85) 100%)",
          boxShadow: "0 0 40px rgba(251,191,36,0.15) inset",
        }}
      >
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
        <div className="relative">
          <h2
            className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}
            style={{
              background: "linear-gradient(90deg,#fde68a 0%,#fbbf24 60%,#fde68a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(251,191,36,0.25)",
            }}
          >
            {t("Looking Back to the Beginning", "ការក្រឡេកមើលទៅកាន់ការចាប់ផ្ដើម")}
          </h2>
          <p className={`text-white/70 text-sm sm:text-base leading-relaxed max-w-3xl ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Because light takes time to travel, looking far away is the same as looking back in time. JWST sees so far that the photons hitting its mirrors today left their stars when the Universe was a child.",
              "ព្រោះពន្លឺត្រូវការពេលដើម្បីធ្វើដំណើរ ការមើលទៅឆ្ងាយ ស្មើនឹងការក្រឡេកមើលត្រឡប់ទៅពេលអតីតកាល។ JWST មើលឃើញឆ្ងាយណាស់ រហូតដល់ photon ដែលប៉ះកញ្ចក់របស់វាថ្ងៃនេះ បានចាកចេញពីផ្កាយរបស់វា នៅពេលដែលសកលលោកនៅជាកុមារ។",
            )}
          </p>
        </div>
      </div>

      {/* 1. Mission */}
      <div className="mb-6">
        <MissionPanel lang={lang} />
      </div>

      {/* 2. Infrared comparison */}
      <div className="mb-6">
        <InfraredCompareSlider lang={lang} />
      </div>

      {/* 3. L2 */}
      <LagrangeL2Panel lang={lang} />

      <p className={`mt-5 text-center text-amber-200/70 text-xs italic max-w-2xl mx-auto ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "A gold-mirrored eye, a million miles from home, listening for the first whispers of light.",
          "ភ្នែកមាសមួយ ឆ្ងាយពីផ្ទះមួយលានម៉ាយល៍ កំពុងស្ដាប់សម្លេងខ្សិបពន្លឺដំបូងបំផុត។",
        )}
      </p>
    </section>
  );
}
