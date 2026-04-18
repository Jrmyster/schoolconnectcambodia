import { useState } from "react";
import { Users } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

type Stage = {
  id: string;
  ya: { en: string; kh: string };
  name: { en: string; kh: string };
  trait: { en: string; kh: string };
  height: number;  // visual silhouette height
  stoop: number;   // 0 = upright, 1 = bent
  color: string;
};

const STAGES: Stage[] = [
  { id: "australopithecus",
    ya: { en: "~4 Mya", kh: "≈៤ លានឆ្នាំមុន" },
    name: { en: "Australopithecus", kh: "អូស្ត្រាឡូពីតេកស៍" },
    trait: { en: "First to walk fully upright on two legs.", kh: "អ្នកដំបូងគេដែលដើរត្រង់លើជើងពីរ។" },
    height: 50, stoop: 0.6, color: "#92400e" },
  { id: "habilis",
    ya: { en: "~2.4 Mya", kh: "≈២.៤ លានឆ្នាំមុន" },
    name: { en: "Homo habilis", kh: "Homo habilis (មនុស្សដៃល្អ)" },
    trait: { en: "Made the first stone tools.", kh: "បង្កើតឧបករណ៍ថ្មដំបូងបង្អស់។" },
    height: 60, stoop: 0.4, color: "#a16207" },
  { id: "erectus",
    ya: { en: "~1.9 Mya", kh: "≈១.៩ លានឆ្នាំមុន" },
    name: { en: "Homo erectus", kh: "Homo erectus (មនុស្សឈរ)" },
    trait: { en: "Mastered fire and spread out of Africa.", kh: "បានគ្រប់គ្រងភ្លើង និងរីករាលទៅក្រៅអាហ្វ្រិក។" },
    height: 70, stoop: 0.2, color: "#b45309" },
  { id: "neanderthal",
    ya: { en: "~400 Kya", kh: "≈៤០០ ពាន់ឆ្នាំមុន" },
    name: { en: "Homo neanderthalensis", kh: "Homo neanderthalensis" },
    trait: { en: "Strong build; lived through ice ages alongside us.", kh: "រាងកាយរឹងមាំ — រស់នៅក្នុងសម័យទឹកកករួមជាមួយយើង។" },
    height: 78, stoop: 0.1, color: "#c2410c" },
  { id: "sapiens",
    ya: { en: "~300 Kya", kh: "≈៣០០ ពាន់ឆ្នាំមុន" },
    name: { en: "Homo sapiens", kh: "Homo sapiens (មនុស្សយើង)" },
    trait: { en: "That's us — language, art, agriculture and science.", kh: "នោះគឺជាយើង — ភាសា សិល្បៈ កសិកម្ម និងវិទ្យាសាស្ត្រ។" },
    height: 86, stoop: 0, color: "#16a34a" },
];

export function HumanEvolutionTimeline() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [active, setActive] = useState<string>("sapiens");
  const a = STAGES.find(s => s.id === active)!;

  return (
    <div className="rounded-2xl bg-white border border-emerald-200/70 shadow-sm overflow-hidden">
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-amber-50 via-orange-50 to-white border-b border-emerald-200/70">
        <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-amber-800/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <Users className="w-3.5 h-3.5" />
          <span>{kh ? "រឿងរ៉ាវរបស់មនុស្ស" : "The Human Story"}</span>
        </div>
        <h3 className={`font-display text-xl sm:text-2xl font-bold text-stone-900 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? "ខ្សែបន្ទាត់នៃការវិវត្តរបស់មនុស្ស" : "Timeline of Human Evolution"}
        </h3>
        <p className={`mt-1 text-sm text-stone-600 max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "មនុស្សគ្រប់គ្នានៅលើផែនដី — ដោយមិនគិតពីពូជសាសន៍ ឬតំបន់ — រួមគ្នានូវពូជពង្សតែមួយដែលបានវិវត្តនៅអាហ្វ្រិក។ យើងជាគ្រួសារតែមួយ។"
            : "Every human alive — regardless of race or region — shares a single ancestor lineage that evolved in Africa. We are one family."}
        </p>
      </div>

      <div className="p-5 sm:p-7">
        <div className="flex items-end justify-between gap-2 sm:gap-4 px-2 pb-3">
          {STAGES.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex flex-col items-center gap-1 transition ${active === s.id ? "scale-105" : "opacity-70 hover:opacity-100"}`}
              aria-label={kh ? s.name.kh : s.name.en}
              aria-pressed={active === s.id}
            >
              <Silhouette s={s} active={active === s.id} />
              <div className={`text-[10px] sm:text-xs font-mono text-stone-500 ${kh ? "font-khmer text-xs normal-case" : ""}`}>{kh ? s.ya.kh : s.ya.en}</div>
            </button>
          ))}
        </div>

        <div className="relative h-1.5 bg-gradient-to-r from-amber-700 via-orange-500 to-emerald-500 rounded-full" />

        <div className="mt-5 rounded-xl bg-gradient-to-br from-emerald-50 to-amber-50 border border-emerald-200 p-4">
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <h4 className={`font-bold text-emerald-950 text-lg ${kh ? "font-khmer" : ""}`}>{kh ? a.name.kh : a.name.en}</h4>
            <span className={`text-xs font-mono text-stone-500 ${kh ? "font-khmer" : ""}`}>{kh ? a.ya.kh : a.ya.en}</span>
          </div>
          <p className={`mt-2 text-sm text-stone-700 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>{kh ? a.trait.kh : a.trait.en}</p>
        </div>

        <div className={`mt-4 p-4 rounded-xl bg-emerald-700 text-white text-sm ${kh ? "font-khmer leading-loose" : ""}`}>
          <strong>{kh ? "ឯកភាពជីវសាស្ត្រ៖" : "Biological unity:"}</strong>{" "}
          {kh
            ? "មនុស្សគ្រប់គ្នាមាន DNA ប្រហែល ៩៩.៩% ដូចគ្នា។ យើងជាសាច់ញាតិជិតស្និទ្ធ — សាខាតូចបំផុតមួយនៃដើមឈើគ្រួសារដ៏ធំនៃជីវិត។"
            : "All humans share about 99.9% of their DNA. We are close cousins — one tiny twig on the great family tree of life."}
        </div>
      </div>
    </div>
  );
}

function Silhouette({ s, active }: { s: Stage; active: boolean }) {
  const w = 50;
  const h = 100;
  const fill = active ? s.color : "#a8a29e";
  const baseY = h - 4;
  const topY = h - s.height;
  const headR = 5 + (s.height - 50) * 0.06;
  const stoopAngle = s.stoop * 35;
  const lean = Math.sin((stoopAngle * Math.PI) / 180) * (s.height * 0.3);
  const hipY = baseY - s.height * 0.5;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <line x1={w / 2 - 3} y1={hipY} x2={w / 2 - 3} y2={baseY} stroke={fill} strokeWidth={3.5} strokeLinecap="round" />
      <line x1={w / 2 + 3} y1={hipY} x2={w / 2 + 3} y2={baseY} stroke={fill} strokeWidth={3.5} strokeLinecap="round" />
      <line x1={w / 2} y1={hipY} x2={w / 2 + lean * 0.4} y2={topY + headR + 2} stroke={fill} strokeWidth={6} strokeLinecap="round" />
      <circle cx={w / 2 + lean * 0.5} cy={topY + headR - 1} r={headR} fill={fill} />
      <line x1={w / 2 + lean * 0.2} y1={hipY + 8} x2={w / 2 + lean * 0.2 - 6} y2={hipY + s.height * 0.2} stroke={fill} strokeWidth={3} strokeLinecap="round" />
      <line x1={w / 2 + lean * 0.2} y1={hipY + 8} x2={w / 2 + lean * 0.2 + 6} y2={hipY + s.height * 0.2} stroke={fill} strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}
