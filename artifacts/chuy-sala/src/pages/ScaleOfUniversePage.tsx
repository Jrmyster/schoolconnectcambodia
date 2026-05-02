import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Telescope,
  Atom,
  Maximize2,
  Minimize2,
  Globe2,
  Sun,
  Sparkles,
  User,
  Bug,
  Droplet,
  CircleDot,
  Orbit,
  Pause,
  Play,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ════════════════════════════════════════════════════════════════════════════
 *  THE SCALE OF THE UNIVERSE — ទំហំនៃចក្រវាឡ
 *  Powers-of-Ten interactive zoom from a proton (10⁻¹⁵ m) to the
 *  observable universe (10²⁶ m). Immersive deep-space aesthetic.
 * ══════════════════════════════════════════════════════════════════════════ */

// ── Khmer numerals helper ───────────────────────────────────────────────
const KH_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
function toKhNum(s: string): string {
  return s.replace(/[0-9]/g, (d) => KH_DIGITS[Number(d)]);
}

// ── Milestone data ──────────────────────────────────────────────────────

type Milestone = {
  power: number; // exponent of 10, in metres
  nameEn: string;
  nameKh: string;
  taglineEn: string;
  taglineKh: string;
  bodyEn: string;
  bodyKh: string;
  /** Human-readable size (already includes unit) */
  sizeEn: string;
  sizeKh: string;
  /** Tailwind colour token used for accents */
  hue: string; // hex
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  /** Visual renderer */
  visual: "proton" | "atom" | "cell" | "ant" | "human" | "earth" | "solar" | "galaxy" | "universe";
};

const MILESTONES: Milestone[] = [
  {
    power: -15,
    nameEn: "Proton",
    nameKh: "ប្រូតុង",
    taglineEn: "The heart of an atom",
    taglineKh: "បេះដូងនៃអាតូម",
    bodyEn:
      "A proton is one of the tiny particles packed inside the nucleus of every atom. It carries a positive electric charge and, together with neutrons, makes up almost all of an atom's mass. About one quadrillionth of a metre across — so small that 100 million of them lined up would still be thinner than a human hair.",
    bodyKh:
      "ប្រូតុងគឺជាភាគល្អិតតូចមួយក្នុងចំណោមភាគល្អិតដែលដាក់នៅក្នុងស្នូលរបស់អាតូមនីមួយៗ។ វាមានបន្ទុកអគ្គិសនីវិជ្ជមាន ហើយរួមជាមួយនឺត្រុង បង្កើតជាជាងម៉ាសទាំងមូលរបស់អាតូម។ ប្រហែល ១ ភាគពាន់ពាន់លានពាន់លាននៃ ១ ម៉ែត្រ — តូចណាស់ បើតម្រៀប ១០០ លាននៃវានៅចំហៀង ក៏នៅតូចជាងសក់មនុស្ស។",
    sizeEn: "0.000 000 000 000 001 m",
    sizeKh: "០.០០០ ០០០ ០០០ ០០០ ០០១ ម",
    hue: "#f43f5e",
    Icon: CircleDot,
    visual: "proton",
  },
  {
    power: -10,
    nameEn: "Hydrogen Atom",
    nameKh: "អាតូមអ៊ីដ្រូសែន",
    taglineEn: "The building block of everything",
    taglineKh: "ប្លុកសាងសង់នៃអ្វីៗគ្រប់យ៉ាង",
    bodyEn:
      "The simplest atom in the universe — a single proton with a single electron orbiting it. Hydrogen is the most common atom in existence: 75% of all the visible matter in the cosmos is hydrogen. Stars are mostly hydrogen. Water is two hydrogens and one oxygen. You are about 10% hydrogen by mass.",
    bodyKh:
      "អាតូមដ៏សាមញ្ញបំផុតក្នុងចក្រវាឡ — ប្រូតុងតែមួយជាមួយអេឡិចត្រុងតែមួយដែលគោចរជុំវិញ។ អ៊ីដ្រូសែនគឺជាអាតូមដែលមានច្រើនបំផុត៖ ៧៥% នៃរូបធាតុដែលមើលឃើញទាំងអស់ក្នុងសកលលោកគឺអ៊ីដ្រូសែន។ ផ្កាយភាគច្រើនជាអ៊ីដ្រូសែន។ ទឹកគឺអ៊ីដ្រូសែន ២ និងអុកស៊ីសែន ១។ រាងកាយរបស់អ្នកមានអ៊ីដ្រូសែនប្រហែល ១០% តាមម៉ាស។",
    sizeEn: "0.000 000 000 1 m",
    sizeKh: "០.០០០ ០០០ ០០០ ១ ម",
    hue: "#fb923c",
    Icon: Atom,
    visual: "atom",
  },
  {
    power: -6,
    nameEn: "Red Blood Cell",
    nameKh: "កោសិកាឈាមក្រហម",
    taglineEn: "The engine of human life",
    taglineKh: "ម៉ាស៊ីននៃជីវិតមនុស្ស",
    bodyEn:
      "Shaped like a tiny disc with a dimple in the middle, a red blood cell carries oxygen from your lungs to every other cell in your body. You make about 2 million new ones every second, and your body holds 25 trillion at any moment. About 7 micrometres wide — small enough to squeeze single-file through your thinnest blood vessels.",
    bodyKh:
      "មានរាងជារង្វង់តូចមួយដែលមានរណ្តៅនៅកណ្តាល កោសិកាឈាមក្រហមដឹកអុកស៊ីសែនពីសួតរបស់អ្នកទៅគ្រប់កោសិកាផ្សេងទៀតក្នុងរាងកាយ។ អ្នកបង្កើតថ្មីប្រហែល ២ លានរៀងរាល់វិនាទី ហើយរាងកាយរបស់អ្នកមាន ២៥ ពាន់ពាន់លានគ្រប់ពេលវេលា។ ទទឹងប្រហែល ៧ មីក្រូម៉ែត្រ — តូចគ្រប់គ្រាន់ដើម្បីច្របាច់ចូលជួរតែមួយតាមសរសៃឈាមស្តើងបំផុតរបស់អ្នក។",
    sizeEn: "0.000 007 m  (~7 µm)",
    sizeKh: "០.០០០ ០០៧ ម  (~៧ មីក្រូម៉ែត្រ)",
    hue: "#ef4444",
    Icon: Droplet,
    visual: "cell",
  },
  {
    power: -3,
    nameEn: "Ant",
    nameKh: "ស្រមោច",
    taglineEn: "The micro-world we can see",
    taglineKh: "ពិភពតូចដែលយើងអាចមើលឃើញ",
    bodyEn:
      "An ant is one of the smallest things you can clearly see with the naked eye. About a millimetre tall — yet inside that millimetre lives a brain, six legs, two antennae, a heart, and the power to lift fifty times its own body weight. Ants outnumber humans by roughly 2.5 million to one.",
    bodyKh:
      "ស្រមោចគឺជារបស់តូចបំផុតមួយដែលអ្នកអាចមើលឃើញច្បាស់ដោយភ្នែកទទេ។ កម្ពស់ប្រហែល ១ មីលីម៉ែត្រ — ប៉ុន្តែក្នុងមីលីម៉ែត្រនោះមានខួរក្បាល ៦ ជើង ២ អង់តែន បេះដូង និងកម្លាំងលើករបស់ដែលមានទម្ងន់ ៥០ ដងធ្ងន់ជាងខ្លួនវា។ ស្រមោចមានចំនួនច្រើនជាងមនុស្សប្រហែល ២.៥ លាន ទល់នឹងមួយ។",
    sizeEn: "0.001 m  (1 mm)",
    sizeKh: "០.០០១ ម  (១ មម)",
    hue: "#facc15",
    Icon: Bug,
    visual: "ant",
  },
  {
    power: 0,
    nameEn: "Human Being",
    nameKh: "មនុស្ស",
    taglineEn: "Our scale",
    taglineKh: "ទំហំរបស់យើង",
    bodyEn:
      "You. About one to two metres tall, made of roughly 37 trillion cells, each made of trillions of atoms. Standing right in the geometric middle of the entire scale chart — exactly halfway between a proton and the observable universe in powers of ten. We are the species that asks 'how big is everything?'",
    bodyKh:
      "អ្នក។ កម្ពស់ប្រហែល ១ ទៅ ២ ម៉ែត្រ ផ្សំពីកោសិកាប្រមាណ ៣៧ ពាន់ពាន់លាន ដែលនីមួយៗផ្សំពីអាតូមរាប់ពាន់ពាន់លាន។ ឈរនៅកណ្តាលធរណីមាត្រនៃតារាងទំហំទាំងមូល — ពិតប្រាកដនៅពាក់កណ្តាលរវាងប្រូតុង និងចក្រវាឡដែលអាចមើលឃើញ ក្នុងគោលដប់។ យើងគឺជាប្រភេទសត្វដែលសួរថា 'អ្វីៗធំប៉ុនណា?'",
    sizeEn: "1 m",
    sizeKh: "១ ម",
    hue: "#22c55e",
    Icon: User,
    visual: "human",
  },
  {
    power: 7,
    nameEn: "Earth",
    nameKh: "ផែនដី",
    taglineEn: "Our home",
    taglineKh: "ផ្ទះរបស់យើង",
    bodyEn:
      "Our planet is about 12,742 km across — roughly 10 million metres. A blue-green sphere of rock, water, and one fragile layer of breathable air. Every human who has ever lived has lived on this single dot. From space it looks tiny. From Cambodia it looks like the whole world.",
    bodyKh:
      "ភពយើងមានទំហំប្រហែល ១២,៧៤២ គ.ម — ប្រហែល ១០ លានម៉ែត្រ។ ស្វ៊ែរពណ៌ខៀវ-បៃតងនៃថ្ម ទឹក និងស្រទាប់ខ្យល់ដកដង្ហើមដ៏ផុយស្រួយ។ មនុស្សគ្រប់រូបដែលធ្លាប់រស់នៅ បានរស់នៅលើចំណុចតែមួយនេះ។ ពីអវកាសវាមើលទៅតូច។ ពីប្រទេសកម្ពុជា វាមើលទៅដូចជាពិភពលោកទាំងមូល។",
    sizeEn: "12,742 km  (~10⁷ m)",
    sizeKh: "១២,៧៤២ គម  (~១០⁷ ម)",
    hue: "#3b82f6",
    Icon: Globe2,
    visual: "earth",
  },
  {
    power: 13,
    nameEn: "Solar System",
    nameKh: "ប្រព័ន្ធព្រះអាទិត្យ",
    taglineEn: "The Sun's domain",
    taglineKh: "ដែនរបស់ព្រះអាទិត្យ",
    bodyEn:
      "The Sun and everything that orbits it: eight planets, hundreds of moons, asteroid belts, and trillions of icy comets stretching far past Pluto. Light from the Sun takes 8 minutes to reach Earth — and over 4 hours to reach Neptune. The system is roughly 10 trillion metres across.",
    bodyKh:
      "ព្រះអាទិត្យ និងគ្រប់របស់ដែលគោចរជុំវិញវា៖ ភព ៨ ព្រះច័ន្ទរាប់រយ ខ្សែក្រវាត់ផ្កាយរណប និងផ្កាយដុះកន្ទុយទឹកកករាប់ពាន់ពាន់លានលាតសន្ធឹងឆ្ងាយលើសភ្លុយតុង។ ពន្លឺពីព្រះអាទិត្យចំណាយពេល ៨ នាទីដើម្បីទៅដល់ផែនដី — ហើយជាង ៤ ម៉ោងដើម្បីទៅដល់ណិបទូន។ ប្រព័ន្ធនេះមានទំហំប្រហែល ១០ ពាន់ពាន់លានម៉ែត្រ។",
    sizeEn: "~10¹³ m",
    sizeKh: "~១០¹³ ម",
    hue: "#fbbf24",
    Icon: Sun,
    visual: "solar",
  },
  {
    power: 21,
    nameEn: "The Milky Way Galaxy",
    nameKh: "កាឡាក់ស៊ីផ្លូវទឹកដោះ",
    taglineEn: "Our local star city",
    taglineKh: "ទីក្រុងផ្កាយក្នុងស្រុករបស់យើង",
    bodyEn:
      "A spiral pinwheel of 100 to 400 billion stars, all bound together by gravity. Our Sun is just one tiny dot in one of its outer arms. Light takes 100,000 years to cross the Milky Way from edge to edge. There are an estimated 2 trillion galaxies like ours in the observable universe.",
    bodyKh:
      "កង្ហារខ្យល់ដែលមានរាងស្ប៉ៃរ៉ាល់ផ្សំពីផ្កាយ ១០០ ទៅ ៤០០ ពាន់លាន ភ្ជាប់គ្នាដោយទំនាញ។ ព្រះអាទិត្យរបស់យើងគ្រាន់តែជាចំណុចតូចមួយនៅក្នុងដៃខាងក្រៅរបស់វា។ ពន្លឺត្រូវចំណាយពេល ១០០,០០០ ឆ្នាំដើម្បីឆ្លងកាត់កាឡាក់ស៊ីផ្លូវទឹកដោះពីម្ខាងទៅម្ខាង។ មានកាឡាក់ស៊ីប្រមាណ ២ ពាន់ពាន់លាន ដូចយើងក្នុងចក្រវាឡដែលអាចមើលឃើញ។",
    sizeEn: "~10²¹ m  (100,000 light-years)",
    sizeKh: "~១០²¹ ម  (១០០,០០០ ឆ្នាំពន្លឺ)",
    hue: "#a855f7",
    Icon: Orbit,
    visual: "galaxy",
  },
  {
    power: 26,
    nameEn: "The Observable Universe",
    nameKh: "ចក្រវាឡដែលអាចមើលឃើញ",
    taglineEn: "The edge of reality",
    taglineKh: "គែមនៃការពិត",
    bodyEn:
      "Everything we can in principle see — every galaxy whose light has had time to reach us since the Big Bang, 13.8 billion years ago. About 93 billion light-years across (because space itself has expanded while the light travelled). What lies beyond? Almost certainly more universe — we just cannot see it. Yet.",
    bodyKh:
      "អ្វីៗដែលយើងអាចមើលឃើញតាមគោលការណ៍ — រាល់កាឡាក់ស៊ីដែលពន្លឺរបស់វាមានពេលគ្រប់គ្រាន់មកដល់យើងចាប់តាំងពី Big Bang កាលពី ១៣.៨ ពាន់លានឆ្នាំមុន។ ទំហំប្រហែល ៩៣ ពាន់លានឆ្នាំពន្លឺ (ដោយសារលំហខ្លួនឯងបានពង្រីកនៅពេលពន្លឺធ្វើដំណើរ)។ មានអ្វីនៅហួសពីនេះ? ស្ទើរតែប្រាកដជាមានចក្រវាឡច្រើនទៀត — យើងគ្រាន់តែមិនអាចមើលឃើញវាប៉ុណ្ណោះ។ មិនទាន់។",
    sizeEn: "~10²⁶ m  (93 billion light-years)",
    sizeKh: "~១០²⁶ ម  (៩៣ ពាន់លានឆ្នាំពន្លឺ)",
    hue: "#22d3ee",
    Icon: Sparkles,
    visual: "universe",
  },
];

// ── Visualisation renderers ─────────────────────────────────────────────

function ScaleVisual({ visual, hue }: { visual: Milestone["visual"]; hue: string }) {
  // Each visual is a centered SVG that crossfades on milestone change.
  switch (visual) {
    case "proton":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
          <defs>
            <radialGradient id="p-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="35%" stopColor={hue} />
              <stop offset="100%" stopColor={hue} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="url(#p-grad)" opacity="0.55" />
          <circle cx="100" cy="100" r="32" fill={hue} />
          <circle cx="100" cy="100" r="32" fill="url(#p-grad)" />
          <text x="100" y="106" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#fff">
            +
          </text>
        </svg>
      );
    case "atom":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
          {/* Nucleus */}
          <circle cx="100" cy="100" r="14" fill={hue} />
          <circle cx="100" cy="100" r="14" fill="#fff" opacity="0.25" />
          {/* Electron orbits */}
          {[0, 60, 120].map((rot, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx="80"
              ry="28"
              fill="none"
              stroke={hue}
              strokeOpacity="0.55"
              strokeWidth="1.5"
              transform={`rotate(${rot} 100 100)`}
            />
          ))}
          {/* Electron */}
          <circle cx="180" cy="100" r="5" fill="#fff">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      );
    case "cell":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
          <defs>
            <radialGradient id="rbc" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7f1d1d" />
              <stop offset="60%" stopColor={hue} />
              <stop offset="100%" stopColor="#fca5a5" />
            </radialGradient>
          </defs>
          {[
            [60, 70, 28],
            [130, 60, 22],
            [110, 130, 32],
            [40, 130, 18],
            [160, 130, 20],
          ].map(([cx, cy, r], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r} fill="url(#rbc)" />
              <circle cx={cx} cy={cy} r={r * 0.45} fill="#7f1d1d" opacity="0.7" />
            </g>
          ))}
        </svg>
      );
    case "ant":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
          <g fill={hue} stroke={hue} strokeLinecap="round">
            {/* Body segments */}
            <ellipse cx="70" cy="100" rx="14" ry="12" />
            <ellipse cx="100" cy="100" rx="11" ry="10" />
            <ellipse cx="135" cy="100" rx="20" ry="16" />
            {/* Head + antennae */}
            <line x1="58" y1="92" x2="42" y2="78" strokeWidth="2" />
            <line x1="58" y1="108" x2="42" y2="120" strokeWidth="2" />
            {/* Legs */}
            {[0, 1, 2].map((i) => {
              const x = 90 + i * 18;
              return (
                <g key={i}>
                  <line x1={x} y1="98" x2={x - 8} y2="70" strokeWidth="2.5" />
                  <line x1={x} y1="102" x2={x - 6} y2="135" strokeWidth="2.5" />
                </g>
              );
            })}
          </g>
        </svg>
      );
    case "human":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
          {/* Ground */}
          <line x1="20" y1="170" x2="180" y2="170" stroke={hue} strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="3 4" />
          <g fill="none" stroke={hue} strokeWidth="3.5" strokeLinecap="round">
            <circle cx="100" cy="55" r="14" fill={hue} />
            <line x1="100" y1="69" x2="100" y2="125" />
            <line x1="100" y1="85" x2="78" y2="110" />
            <line x1="100" y1="85" x2="122" y2="110" />
            <line x1="100" y1="125" x2="82" y2="170" />
            <line x1="100" y1="125" x2="118" y2="170" />
          </g>
        </svg>
      );
    case "earth":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
          <defs>
            <radialGradient id="earth-g" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="50%" stopColor={hue} />
              <stop offset="100%" stopColor="#0c1f3d" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="78" fill="url(#earth-g)" />
          {/* Stylised continents */}
          <g fill="#22c55e" opacity="0.85">
            <path d="M55 80 q15 -15 35 -8 q10 5 5 18 q-12 14 -28 8 z" />
            <path d="M115 70 q20 5 25 25 q-3 18 -22 18 q-15 -3 -15 -20 z" />
            <path d="M70 130 q15 -8 30 0 q5 12 -10 18 q-18 5 -25 -8 z" />
            <path d="M125 135 q12 -5 22 5 q3 12 -10 16 q-15 3 -18 -10 z" />
          </g>
          <circle cx="100" cy="100" r="78" fill="none" stroke="#fff" strokeOpacity="0.15" strokeWidth="1" />
        </svg>
      );
    case "solar":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
          {/* Sun */}
          <defs>
            <radialGradient id="sun-g" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="40%" stopColor={hue} />
              <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="50" fill="url(#sun-g)" opacity="0.7" />
          <circle cx="100" cy="100" r="14" fill={hue} />
          {/* Orbits + planets */}
          {[
            { r: 30, c: "#fde68a", pr: 2 },
            { r: 45, c: "#fca5a5", pr: 2.5 },
            { r: 60, c: "#60a5fa", pr: 3 },
            { r: 75, c: "#f87171", pr: 2.5 },
            { r: 92, c: "#fbbf24", pr: 5 },
            { r: 108, c: "#fcd34d", pr: 4 },
          ].map((o, i) => {
            const angle = (i * 53) % 360;
            const x = 100 + Math.cos((angle * Math.PI) / 180) * o.r;
            const y = 100 + Math.sin((angle * Math.PI) / 180) * o.r;
            return (
              <g key={i}>
                <circle cx="100" cy="100" r={o.r} fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="0.7" />
                <circle cx={x} cy={y} r={o.pr} fill={o.c} />
              </g>
            );
          })}
        </svg>
      );
    case "galaxy":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
          <defs>
            <radialGradient id="gal-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="30%" stopColor={hue} />
              <stop offset="100%" stopColor={hue} stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="100" rx="90" ry="22" fill="url(#gal-core)" opacity="0.4" transform="rotate(-25 100 100)" />
          {/* Spiral arms via dotted curves */}
          {Array.from({ length: 90 }).map((_, i) => {
            const t = i / 90;
            const angle = t * Math.PI * 4 + (i % 2 ? Math.PI : 0);
            const r = 12 + t * 80;
            const x = 100 + Math.cos(angle) * r;
            const y = 100 + Math.sin(angle) * r * 0.32; // flatten into a disc
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={Math.random() < 0.2 ? 1.5 : 0.8}
                fill="#fff"
                opacity={0.4 + Math.random() * 0.5}
                transform="rotate(-25 100 100)"
              />
            );
          })}
          <circle cx="100" cy="100" r="10" fill="#fff" opacity="0.85" />
        </svg>
      );
    case "universe":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
          <defs>
            <radialGradient id="uni-g" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={hue} stopOpacity="0.5" />
              <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="95" fill="url(#uni-g)" />
          {/* Cosmic web — many tiny galaxies */}
          {Array.from({ length: 80 }).map((_, i) => {
            const a = (i * 137.5) % 360;
            const r = 15 + ((i * 11) % 80);
            const x = 100 + Math.cos((a * Math.PI) / 180) * r;
            const y = 100 + Math.sin((a * Math.PI) / 180) * r;
            const c = ["#fff", "#a855f7", "#22d3ee", "#f59e0b"][i % 4];
            return <circle key={i} cx={x} cy={y} r={(i % 3) * 0.6 + 0.7} fill={c} opacity={0.7} />;
          })}
          <circle cx="100" cy="100" r="95" fill="none" stroke="#fff" strokeOpacity="0.12" strokeDasharray="2 4" />
        </svg>
      );
  }
}

// ── Twinkling star backdrop ─────────────────────────────────────────────

function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }).map((_, i) => ({
        x: (i * 73) % 100,
        y: (i * 41) % 100,
        s: ((i * 7) % 3) + 0.5,
        d: ((i * 13) % 4) + 2,
        delay: ((i * 11) % 5) * 0.4,
      })),
    [],
  );
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            opacity: 0.4,
            animation: `twinkle ${s.d}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50%      { opacity: 0.95; transform: scale(1.4); }
        }
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%      { transform: translate(-50%, -52%) scale(1.025); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.85); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────

export default function ScaleOfUniversePage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  const [idx, setIdx] = useState(4); // start at Human Being
  const [autoplay, setAutoplay] = useState(false);

  const m = MILESTONES[idx];
  const visualKeyRef = useRef(0);
  visualKeyRef.current += 0; // bump per render not needed — use idx as key

  // Autoplay: cycle through milestones every 4s
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % MILESTONES.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [autoplay]);

  // Format the power-of-ten label nicely
  const powerLabel = (p: number) => {
    const abs = String(Math.abs(p));
    const sign = p < 0 ? "⁻" : "";
    const supMap: Record<string, string> = {
      "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
      "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
    };
    return `10${sign}${abs.split("").map((d) => supMap[d]).join("")} m`;
  };

  return (
    <div
      className="relative min-h-screen text-white overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 0%, #1e1b4b 0%, transparent 55%)," +
          "radial-gradient(ellipse at 90% 30%, #4c1d9555 0%, transparent 50%)," +
          "radial-gradient(ellipse at 50% 100%, #0c4a6e55 0%, transparent 60%)," +
          "linear-gradient(180deg, #03030a 0%, #06061a 50%, #02020a 100%)",
      }}
    >
      <StarField />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition ${
              k ? "font-khmer" : ""
            }`}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
        </div>

        {/* Hero */}
        <header className="mb-8 sm:mb-10">
          <div className={`flex items-center gap-2 text-xs mb-2 text-cyan-300 ${k ? "font-khmer" : "font-mono uppercase tracking-[0.3em]"}`}>
            <Telescope className="w-4 h-4" />
            <span>{t("Science · Cosmology", "វិទ្យាសាស្ត្រ · ចក្រវាឡវិទ្យា")}</span>
            <span>·</span>
            <span>POWERS OF TEN</span>
          </div>
          <h1
            className={`text-3xl sm:text-5xl font-extrabold leading-tight ${k ? "font-khmer leading-loose" : ""}`}
            style={{
              background: "linear-gradient(90deg, #fff 0%, #a5f3fc 40%, #c4b5fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            data-testid="page-title"
          >
            {t("The Scale of the Universe", "ទំហំនៃចក្រវាឡ")}
          </h1>
          <p className={`mt-3 max-w-3xl text-sm sm:text-base text-slate-300 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Human beings are stuck in the middle of reality. We are giants compared to atoms — but infinitesimally tiny next to galaxies. This tool lets you zoom through the 'Powers of Ten,' from the heart of an atom to the edge of the observable universe, and see exactly where we sit in between.",
              "មនុស្សយើងជាប់នៅកណ្តាលនៃការពិត។ យើងជាយក្សធំធៀបនឹងអាតូម — ប៉ុន្តែតូចគ្មានទំហំបើធៀបនឹងកាឡាក់ស៊ី។ ឧបករណ៍នេះអនុញ្ញាតឲ្យអ្នកពង្រីកឆ្លងកាត់ 'គោលដប់' ពីបេះដូងនៃអាតូម ទៅគែមនៃចក្រវាឡដែលអាចមើលឃើញ ហើយឃើញច្បាស់ថាយើងអង្គុយនៅកន្លែងណារវាងវា។",
            )}
          </p>
        </header>

        {/* The Interactive Viewer */}
        <div
          className="relative rounded-3xl border border-white/10 overflow-hidden mb-6"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, " + m.hue + "22 0%, transparent 65%)," +
              "linear-gradient(180deg, #0a0a18 0%, #050511 100%)",
            boxShadow: `0 0 0 1px ${m.hue}33, 0 30px 80px -40px ${m.hue}aa`,
          }}
          data-testid="scale-viewer"
        >
          {/* Stage */}
          <div className="relative h-[340px] sm:h-[440px] overflow-hidden">
            {/* Local star backdrop */}
            <StarField />

            {/* Visual — keyed by idx for crossfade-style remount */}
            <div
              key={idx}
              className="absolute left-1/2 top-1/2 w-[260px] h-[260px] sm:w-[340px] sm:h-[340px]"
              style={{
                transform: "translate(-50%, -50%)",
                animation: "fade-in 0.7s cubic-bezier(0.2,0.7,0.2,1), float 6s ease-in-out 0.7s infinite",
                filter: `drop-shadow(0 0 22px ${m.hue}66)`,
              }}
            >
              <ScaleVisual visual={m.visual} hue={m.hue} />
            </div>

            {/* Top-left: scale chip */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
              <div
                className="rounded-xl px-3 py-2 backdrop-blur-md border"
                style={{
                  backgroundColor: "#0a0a18cc",
                  borderColor: `${m.hue}66`,
                  boxShadow: `0 0 16px -2px ${m.hue}77`,
                }}
              >
                <div className={`text-[10px] tracking-widest uppercase text-slate-400 ${k ? "font-khmer normal-case" : "font-mono"}`}>
                  {t("Scale", "ទំហំ")}
                </div>
                <div className="font-mono text-xl sm:text-2xl font-bold" style={{ color: m.hue }}>
                  {powerLabel(m.power)}
                </div>
              </div>
            </div>

            {/* Top-right: zoom indicator */}
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5 flex items-center gap-2 text-[11px] text-slate-400">
              {idx === 0 ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : idx === MILESTONES.length - 1 ? (
                <Maximize2 className="w-3.5 h-3.5" />
              ) : (
                <Telescope className="w-3.5 h-3.5" />
              )}
              <span className={k ? "font-khmer" : ""}>
                {t(
                  `${idx + 1} of ${MILESTONES.length}`,
                  `${toKhNum(String(idx + 1))} នៃ ${toKhNum(String(MILESTONES.length))}`,
                )}
              </span>
            </div>

            {/* Autoplay toggle */}
            <button
              onClick={() => setAutoplay((v) => !v)}
              className={`absolute bottom-4 right-4 sm:bottom-5 sm:right-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs border backdrop-blur-md transition hover:bg-white/10 ${
                k ? "font-khmer" : ""
              }`}
              style={{ backgroundColor: "#0a0a18aa", borderColor: `${m.hue}66`, color: m.hue }}
              data-testid="button-autoplay"
            >
              {autoplay ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> {t("Pause", "ផ្អាក")}
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" /> {t("Auto-zoom", "ពង្រីកស្វ័យប្រវត្តិ")}
                </>
              )}
            </button>
          </div>

          {/* Slider */}
          <div className="relative px-5 sm:px-8 pt-4 pb-7 border-t border-white/10 bg-black/20 backdrop-blur-md">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 mb-2">
              <span className="inline-flex items-center gap-1.5">
                <Minimize2 className="w-3 h-3" /> {t("smaller", "តូចជាង")}
              </span>
              <span className={`uppercase tracking-widest ${k ? "font-khmer normal-case" : "font-mono"}`}>
                {t("zoom slider", "ឧបករណ៍ពង្រីក")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                {t("larger", "ធំជាង")} <Maximize2 className="w-3 h-3" />
              </span>
            </div>

            {/* Custom labelled track with milestone ticks */}
            <div className="relative">
              <input
                type="range"
                min={0}
                max={MILESTONES.length - 1}
                step={1}
                value={idx}
                onChange={(e) => {
                  setIdx(Number(e.target.value));
                  if (autoplay) setAutoplay(false);
                }}
                className="w-full h-2 appearance-none rounded-full cursor-pointer outline-none"
                style={{
                  background: `linear-gradient(90deg,
                    #f43f5e 0%,
                    #fb923c 12%,
                    #ef4444 25%,
                    #facc15 37%,
                    #22c55e 50%,
                    #3b82f6 65%,
                    #fbbf24 78%,
                    #a855f7 90%,
                    #22d3ee 100%
                  )`,
                  boxShadow: `0 0 18px -2px ${m.hue}88`,
                }}
                aria-label={t("Scale of the universe slider", "ឧបករណ៍ពង្រីកទំហំចក្រវាឡ")}
                data-testid="scale-slider"
              />
              <style>{`
                input[type="range"][data-testid="scale-slider"]::-webkit-slider-thumb {
                  appearance: none;
                  width: 22px; height: 22px; border-radius: 9999px;
                  background: #fff;
                  border: 3px solid ${m.hue};
                  box-shadow: 0 0 18px ${m.hue}, 0 0 4px #fff;
                  cursor: pointer;
                  transition: background 0.2s, border-color 0.3s;
                }
                input[type="range"][data-testid="scale-slider"]::-moz-range-thumb {
                  width: 22px; height: 22px; border-radius: 9999px;
                  background: #fff;
                  border: 3px solid ${m.hue};
                  box-shadow: 0 0 18px ${m.hue}, 0 0 4px #fff;
                  cursor: pointer;
                }
              `}</style>

              {/* Milestone ticks */}
              <div className="absolute inset-x-0 top-full mt-2 flex justify-between px-[2px]">
                {MILESTONES.map((mi, i) => {
                  const active = i === idx;
                  return (
                    <button
                      key={mi.power}
                      onClick={() => {
                        setIdx(i);
                        if (autoplay) setAutoplay(false);
                      }}
                      className="group flex flex-col items-center"
                      data-testid={`tick-${i}`}
                      aria-label={mi.nameEn}
                    >
                      <span
                        className="block w-[2px] h-2 rounded-full transition-all"
                        style={{
                          backgroundColor: active ? mi.hue : "#475569",
                          boxShadow: active ? `0 0 8px ${mi.hue}` : "none",
                          transform: active ? "scaleY(1.6)" : "scaleY(1)",
                        }}
                      />
                      <span
                        className={`hidden md:block mt-1 text-[9px] font-mono whitespace-nowrap transition-colors ${
                          active ? "text-white font-bold" : "text-slate-500 group-hover:text-slate-300"
                        }`}
                      >
                        {mi.power < 0 ? `10⁻${String(-mi.power).split("").map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]).join("")}` :
                          mi.power === 0 ? "10⁰" :
                          `10${String(mi.power).split("").map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]).join("")}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Info card */}
        <div
          key={`info-${idx}`}
          className="relative rounded-3xl border p-6 sm:p-8 mb-10 overflow-hidden"
          style={{
            borderColor: `${m.hue}66`,
            backgroundColor: "#0a0a18ee",
            boxShadow: `0 0 0 1px ${m.hue}22, 0 24px 60px -32px ${m.hue}aa`,
            animation: "fade-in 0.6s ease-out",
          }}
          data-testid="info-card"
        >
          <div className="flex items-start gap-4 mb-4 flex-wrap">
            <div
              className="w-14 h-14 rounded-2xl grid place-items-center shrink-0"
              style={{
                backgroundColor: `${m.hue}22`,
                border: `1.5px solid ${m.hue}88`,
                boxShadow: `0 0 22px -4px ${m.hue}cc`,
              }}
            >
              <m.Icon className="w-6 h-6" style={{ color: m.hue }} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight" style={{ color: m.hue }}>
                {m.nameEn}
              </h2>
              <p className="font-khmer text-xl sm:text-2xl text-white/90 leading-snug mt-0.5">
                {m.nameKh}
              </p>
              <p className={`text-sm mt-1 italic text-slate-400 ${k ? "font-khmer not-italic" : ""}`}>
                {k ? m.taglineKh : m.taglineEn}
              </p>
            </div>
            <div
              className="rounded-xl px-3 py-2 border text-right"
              style={{
                borderColor: `${m.hue}55`,
                backgroundColor: "#000a",
              }}
            >
              <div className="font-mono text-[10px] tracking-widest text-slate-400">SIZE</div>
              <div className="font-mono text-base font-bold" style={{ color: m.hue }}>
                {k ? m.sizeKh : m.sizeEn}
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {m.bodyEn}
          </p>
          <p className="font-khmer text-sm sm:text-base text-slate-300 leading-loose mt-3">
            {m.bodyKh}
          </p>

          {/* Quick prev/next */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border border-white/15 bg-white/5 hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed ${
                k ? "font-khmer" : ""
              }`}
              data-testid="button-prev"
            >
              <ArrowLeft className="w-4 h-4" />
              {idx > 0 ? (k ? MILESTONES[idx - 1].nameKh : MILESTONES[idx - 1].nameEn) : t("Smaller", "តូចជាង")}
            </button>
            <button
              onClick={() => setIdx((i) => Math.min(MILESTONES.length - 1, i + 1))}
              disabled={idx === MILESTONES.length - 1}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition disabled:opacity-30 disabled:cursor-not-allowed ${
                k ? "font-khmer" : ""
              }`}
              style={{
                backgroundColor: idx < MILESTONES.length - 1 ? `${m.hue}22` : undefined,
                borderColor: `${m.hue}66`,
                color: idx < MILESTONES.length - 1 ? m.hue : undefined,
              }}
              data-testid="button-next"
            >
              {idx < MILESTONES.length - 1 ? (k ? MILESTONES[idx + 1].nameKh : MILESTONES[idx + 1].nameEn) : t("Larger", "ធំជាង")}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Closing reflection */}
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-4 flex items-start gap-3 mb-10">
          <Sparkles className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
          <p className={`text-xs sm:text-sm text-slate-300 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "From a single proton to 93 billion light-years, every step on this slider is a multiplication by 10. We sit almost exactly in the middle. Small enough to be made of atoms, large enough to look at galaxies. That is no accident — it is the beautiful coincidence of being human.",
              "ពីប្រូតុងតែមួយដល់ ៩៣ ពាន់លានឆ្នាំពន្លឺ រាល់ជំហាននៅលើឧបករណ៍នេះគឺគុណនឹង ១០។ យើងអង្គុយស្ទើរតែពិតប្រាកដនៅចំកណ្តាល។ តូចគ្រប់គ្រាន់ដើម្បីផ្សំពីអាតូម ធំគ្រប់គ្រាន់ដើម្បីមើលកាឡាក់ស៊ី។ នោះមិនមែនជាការចៃដន្យទេ — វាជាការចៃដន្យដ៏ស្រស់ស្អាតនៃការជាមនុស្ស។",
            )}
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 text-black text-sm font-bold hover:opacity-90 transition ${
              k ? "font-khmer" : ""
            }`}
            style={{ boxShadow: "0 0 24px #22d3ee77" }}
          >
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
