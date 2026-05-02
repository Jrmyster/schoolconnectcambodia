import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Tv,
  Eye,
  Layers,
  Zap,
  Grid3x3,
  Monitor,
  Sparkles,
  Cpu,
  Atom,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { RemoteControlSection } from "./TelevisionRemoteSection";

// ════════════════════════════════════════════════════════════════════════════
//  TECH-TV-01 · Television: The Illusion of Light
//                ទូរទស្សន៍ ៖ ការបំភាន់នៃពន្លឺ
//
//  Cyber/Optics aesthetic — deep blacks, neon RGB accents, technical
//  diagrams. Sections:
//   1 · The Magic Trick of Pixels (RGB additive colour)
//   2 · A History from Tubes to Flat Screens (CRT → LCD)
//   3 · High Definition (the maths of pixel density)
// ════════════════════════════════════════════════════════════════════════════

// Cyber palette
const BG       = "#0a0a0f";
const PANEL    = "#11131a";
const PANEL_2  = "#181b25";
const GRID     = "#1f2433";
const INK      = "#e5e7eb";
const INK_SOFT = "#9ca3af";
const RED      = "#ef4444";
const GREEN    = "#22c55e";
const BLUE     = "#3b82f6";
const CYAN     = "#22d3ee";
const AMBER    = "#fbbf24";

// Khmer numerals
const KH_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
function toKhNum(n: number | string): string {
  return String(n).replace(/[0-9]/g, (d) => KH_DIGITS[Number(d)]);
}
function num(k: boolean, n: number | string): string {
  return k ? toKhNum(n) : String(n);
}

// ─── Layout helpers ───────────────────────────────────────────────────────

function SectionHeader({
  spec,
  en,
  kh,
  k,
  Icon,
  accent,
}: {
  spec: string;
  en: string;
  kh: string;
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3 flex-wrap">
      <span
        className="font-mono text-[10px] tracking-[0.25em] uppercase rounded-md px-2.5 py-1 text-black"
        style={{ backgroundColor: accent }}
      >
        {spec}
      </span>
      <Icon className="w-5 h-5" style={{ color: accent }} />
      <h2
        className={`text-xl sm:text-2xl font-bold ${k ? "font-khmer" : ""}`}
        style={{ color: INK }}
      >
        {k ? kh : en}
      </h2>
      <div className="flex-1 border-t border-dashed" style={{ borderColor: GRID }} />
    </div>
  );
}

function P({
  k,
  en,
  kh,
  className,
}: {
  k: boolean;
  en: string;
  kh: string;
  className?: string;
}) {
  return (
    <p
      className={`${className ?? ""} ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
      style={{ color: INK_SOFT }}
    >
      {k ? kh : en}
    </p>
  );
}

function StatTile({
  Icon,
  k,
  enLabel,
  khLabel,
  value,
  enUnit,
  khUnit,
  accent,
}: {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  k: boolean;
  enLabel: string;
  khLabel: string;
  value: string;
  enUnit?: string;
  khUnit?: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-2xl border p-3 sm:p-4"
      style={{
        borderColor: `${accent}55`,
        backgroundColor: PANEL,
        boxShadow: `0 0 0 1px ${accent}22, 0 12px 28px -22px ${accent}aa`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4" style={{ color: accent }} />
        <div
          className={`text-[10px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
          style={{ color: accent }}
        >
          {k ? khLabel : enLabel}
        </div>
      </div>
      <div
        className="text-2xl sm:text-3xl font-extrabold leading-none"
        style={{ color: INK, fontFamily: k ? "Hanuman, serif" : undefined }}
      >
        {value}
      </div>
      {enUnit && khUnit ? (
        <div
          className={`mt-1 text-[11px] ${k ? "font-khmer" : ""}`}
          style={{ color: INK_SOFT }}
        >
          {k ? khUnit : enUnit}
        </div>
      ) : null}
    </div>
  );
}

function FeatureCard({
  k,
  Icon,
  enTitle,
  khTitle,
  enTag,
  khTag,
  enBody,
  khBody,
  accent,
  children,
}: {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enTitle: string;
  khTitle: string;
  enTag: string;
  khTag: string;
  enBody: string;
  khBody: string;
  accent: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="rounded-3xl p-5 sm:p-6 border flex flex-col h-full"
      style={{
        borderColor: `${accent}55`,
        backgroundColor: PANEL,
        boxShadow: `0 0 0 1px ${accent}22, 0 18px 40px -28px ${accent}aa`,
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${accent}22`, border: `1px solid ${accent}66` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-lg sm:text-xl ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
            {k ? khTitle : enTitle}
          </h3>
          <div
            className={`text-[11px] mt-0.5 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
            style={{ color: accent }}
          >
            {k ? khTag : enTag}
          </div>
        </div>
      </div>
      <P k={k} en={enBody} kh={khBody} className="text-sm sm:text-[15px] mb-3" />
      {children}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export function TelevisionPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  const frame: React.CSSProperties = {
    backgroundColor: BG,
    backgroundImage:
      `radial-gradient(circle at 0% 0%, ${RED}11, transparent 35%),` +
      `radial-gradient(circle at 50% 0%, ${GREEN}11, transparent 35%),` +
      `radial-gradient(circle at 100% 0%, ${BLUE}14, transparent 35%),` +
      `linear-gradient(${GRID}55 1px, transparent 1px),` +
      `linear-gradient(90deg, ${GRID}55 1px, transparent 1px)`,
    backgroundSize: "auto, auto, auto, 32px 32px, 32px 32px",
  };

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={frame}>
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${k ? "font-khmer" : ""}`}
            style={{ color: CYAN }}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
        </div>

        {/* Hero */}
        <header
          className="relative rounded-[2rem] p-6 sm:p-9 mb-10 overflow-hidden border"
          style={{
            borderColor: `${CYAN}55`,
            backgroundColor: PANEL,
            backgroundImage:
              `linear-gradient(135deg, ${PANEL} 0%, #050507 100%),` +
              `radial-gradient(circle at 100% 100%, ${BLUE}33, transparent 50%)`,
            boxShadow: `0 0 0 1px ${CYAN}22, 0 24px 60px -32px ${CYAN}cc`,
          }}
        >
          {/* Decorative scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${CYAN}55 3px, ${CYAN}55 4px)`,
            }}
            aria-hidden="true"
          />

          {/* Hero RGB pixel ribbon */}
          <div
            className="hidden sm:flex absolute top-5 right-5 w-32 gap-1"
            aria-hidden="true"
          >
            {Array.from({ length: 18 }).map((_, i) => {
              const c = i % 3 === 0 ? RED : i % 3 === 1 ? GREEN : BLUE;
              return (
                <div
                  key={i}
                  className="flex-1 h-6 rounded-sm"
                  style={{ backgroundColor: c, boxShadow: `0 0 8px ${c}aa` }}
                />
              );
            })}
          </div>

          <div
            className={`relative flex items-center gap-2 text-xs mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-[0.3em]"}`}
            style={{ color: CYAN }}
          >
            <span>{t("Technology · Optics", "បច្ចេកវិទ្យា · អុបទិក")}</span>
            <span>·</span>
            <span>TECH-TV-01</span>
          </div>
          <h1
            className={`relative text-3xl sm:text-4xl font-extrabold leading-tight max-w-3xl ${k ? "font-khmer leading-loose" : ""}`}
            style={{ color: INK }}
            data-testid="page-title"
          >
            {t(
              "Television: The Illusion of Light",
              "ទូរទស្សន៍ ៖ ការបំភាន់នៃពន្លឺ"
            )}
          </h1>
          <p
            className={`relative mt-3 text-sm sm:text-base max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK_SOFT }}
          >
            {t(
              "Stand close to any television, phone, or laptop screen and you will see something strange: there is no white, no yellow, and no orange anywhere on it. The whole screen is built from millions of microscopic dots that can only do one thing — glow red, glow green, or glow blue. Every other colour you have ever seen on a screen is a trick your own eyes have played on themselves. This module walks through how that trick works, how engineers went from heavy electron-gun box TVs to paper-thin flat screens, and what '4K' and 'HD' really mean.",
              "ឈរនៅជិតទូរទស្សន៍ ទូរស័ព្ទ ឬកុំព្យូទ័រណាមួយ អ្នកនឹងឃើញអ្វីដែលចម្លែក ៖ គ្មានពណ៌សទេ គ្មានពណ៌លឿងទេ ហើយក៏គ្មានពណ៌ទឹកក្រូចណាមួយលើវាដែរ។ អេក្រង់ទាំងមូលត្រូវបានកសាងពីចំណុចមីក្រូស្កុបិករាប់លានដែលអាចធ្វើបានតែមួយរឿង — ភ្លឺពណ៌ក្រហម ភ្លឺពណ៌បៃតង ឬភ្លឺពណ៌ខៀវ។ គ្រប់ពណ៌ផ្សេងទៀតដែលអ្នកធ្លាប់ឃើញនៅលើអេក្រង់ ជាការបោកប្រាស់ដែលភ្នែករបស់អ្នកលេងលើខ្លួនវាផ្ទាល់។ មុខវិជ្ជានេះដើរតាមរបៀបដែលការបោកប្រាស់នោះដំណើរការ របៀបវិស្វករបានឆ្លងពីប្រអប់ទូរទស្សន៍ដែលប្រើកាំភ្លើងអេឡិចត្រុងទម្ងន់ធ្ងន់ ទៅអេក្រង់រាបស្មើស្ដើងដូចក្រដាស និងអ្វីដែល '4K' និង 'HD' មានន័យពិតប្រាកដ។"
            )}
          </p>

          <div className="relative grid sm:grid-cols-3 gap-3 mt-6">
            <StatTile Icon={Sparkles} k={k} accent={RED}
              enLabel="Primary colours" khLabel="ពណ៌គោល"
              value={num(k, 3)}
              enUnit="red, green, blue — that is all a screen can do"
              khUnit="ក្រហម បៃតង ខៀវ — នោះគឺអ្វីដែលអេក្រង់អាចធ្វើបាន"
            />
            <StatTile Icon={Grid3x3} k={k} accent={GREEN}
              enLabel="Pixels in a 4K screen" khLabel="ភីកសែលក្នុងអេក្រង់ 4K"
              value={`~${num(k, 8.3)}M`}
              enUnit="3,840 × 2,160 dots in the same physical space"
              khUnit="៣,៨៤០ × ២,១៦០ ចំណុចក្នុងលំហររូបវិទ្យាដូចគ្នា"
            />
            <StatTile Icon={Eye} k={k} accent={BLUE}
              enLabel="Colours your eye sees" khLabel="ពណ៌ដែលភ្នែកអ្នកឃើញ"
              value={`~${num(k, 10)}M`}
              enUnit="all faked from just 3 lights of varying brightness"
              khUnit="ទាំងអស់ត្រូវបានបង្កើតពី ៣ ពន្លឺនៃពន្លឺផ្សេងៗ"
            />
          </div>
        </header>

        {/* SECTION 1 · The Magic Trick of Pixels */}
        <SectionHeader spec="01" en="The Magic Trick of Pixels" kh="វេទមន្តនៃភីកសែល" k={k} Icon={Grid3x3} accent={CYAN} />

        <div className="grid lg:grid-cols-5 gap-5 mb-12">
          <div className="lg:col-span-3">
            <FeatureCard
              k={k}
              Icon={Sparkles}
              accent={CYAN}
              enTitle="A screen does not really show 'white'"
              khTitle="អេក្រង់មិនពិតជាបង្ហាញពណ៌ 'ស' ទេ"
              enTag="Pixel · the smallest dot of light"
              khTag="ភីកសែល · ចំណុចតូចបំផុតនៃពន្លឺ"
              enBody="If you press your nose against any modern screen, you'll discover that what you thought was a smooth picture is actually a giant grid. The screen is divided into millions of microscopic squares — each square is called a pixel (short for 'picture element'). On a 1080p phone there are about 2 million pixels. On a 4K TV there are over 8 million. Each pixel can only glow in one mixed colour at a time, and that colour is built from just three tiny lights underneath it: one red, one green, one blue. By turning each of those three sub-lights up or down to a different brightness, the pixel can pretend to be almost any colour. Yellow is just bright red + bright green. Cyan is bright green + bright blue. White is all three at full power. Black is all three turned off. There is literally no yellow lamp, no white lamp, no orange lamp anywhere inside your screen — only RGB and the trick our eyes play."
              khBody="ប្រសិនបើអ្នកចុចច្រមុះអ្នកជាប់នឹងអេក្រង់សម័យថ្មីណាមួយ អ្នកនឹងរកឃើញថា អ្វីដែលអ្នកគិតថាជារូបភាពរលោង គឺពិតជាក្រឡាដ៏ធំ។ អេក្រង់ត្រូវបានបែងចែកជាការ៉េមីក្រូស្កុបិករាប់លាន — ការ៉េមួយៗហៅថា ភីកសែល (មកពី 'picture element')។ នៅលើទូរស័ព្ទ ១០៨០p មានភីកសែលប្រហែល ២ លាន។ នៅលើទូរទស្សន៍ 4K មានជាង ៨ លាន។ ភីកសែលនីមួយៗអាចភ្លឺនៅពណ៌ច្រឡំតែមួយក្នុងពេលតែមួយ ហើយពណ៌នោះត្រូវបានបង្កើតពីពន្លឺតូច ៣ នៅខាងក្រោមវា ៖ មួយពណ៌ក្រហម មួយពណ៌បៃតង មួយពណ៌ខៀវ។ ដោយបង្កើនឬបន្ថយពន្លឺនីមួយៗនៃ ៣ ទាំងនោះទៅពន្លឺផ្សេងៗ ភីកសែលអាចសម្ដែងជាស្ទើរតែគ្រប់ពណ៌។ ពណ៌លឿងគ្រាន់តែជាក្រហមភ្លឺ + បៃតងភ្លឺ។ ពណ៌ស៊ីយ៉ានគឺបៃតងភ្លឺ + ខៀវភ្លឺ។ ពណ៌សគឺទាំង ៣ ពេញកំលាំង។ ពណ៌ខ្មៅគឺទាំង ៣ ត្រូវបានបិទ។ គ្មានចង្កៀងពណ៌លឿង គ្មានចង្កៀងពណ៌ស គ្មានចង្កៀងពណ៌ទឹកក្រូចនៅទីណាមួយខាងក្នុងអេក្រង់របស់អ្នកទេ — មានតែ RGB និងការបោកប្រាស់ដែលភ្នែករបស់យើងលេង។"
            />
          </div>
          <div className="lg:col-span-2">
            <RGBMixer k={k} />
          </div>
        </div>

        {/* Pixel zoom illustration */}
        <PixelZoom k={k} />

        {/* SECTION 2 · History */}
        <div className="mt-12">
          <SectionHeader spec="02" en="From Tubes to Flat Screens" kh="ពីបំពង់ ទៅអេក្រង់រាបស្មើ" k={k} Icon={Tv} accent={AMBER} />
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mb-6">
          <FeatureCard
            k={k}
            Icon={Zap}
            accent={AMBER}
            enTitle="CRT — the electron gun TV"
            khTitle="CRT — ទូរទស្សន៍កាំភ្លើងអេឡិចត្រុង"
            enTag="Cathode-Ray Tube · 1934 → ~2008"
            khTag="បំពង់កាំរស្មីកាតូត · ១៩៣៤ → ~២០០៨"
            enBody="Old box-shaped televisions — the heavy ones our parents and grandparents grew up with — were called CRT TVs, short for Cathode-Ray Tube. The 'tube' is exactly what it sounds like: a giant vacuum-sealed glass funnel taking up almost the whole inside of the television. At the narrow back end was an 'electron gun' that did exactly what its name says — it shot a beam of real electrons (tiny particles smaller than atoms) at the front glass, sixty times every second. The inside of the front glass was painted with a special powder called phosphor that glows wherever electrons hit it. By steering the beam left-right, up-down, the gun could 'paint' a picture line by line, fast enough that our slow eyes saw a moving image. Originally the screen had only one phosphor and so could only glow black-and-white. Around 1954, engineers added three different electron guns and three different coloured phosphors (red, green, blue) — and full-colour television was born."
            khBody="ទូរទស្សន៍ប្រអប់ចាស់ — ទូរទស្សន៍ធ្ងន់ៗដែលឪពុកម្ដាយ និងជីដូនជីតារបស់យើងធំឡើងជាមួយ — ត្រូវបានហៅថា CRT TVs មកពី Cathode-Ray Tube។ 'បំពង់' គឺពិតជាអ្វីដែលឈ្មោះវានិយាយ ៖ ផើងកញ្ចក់រូបស្នូកធំបំផុតបិទជិតវ៉ាក់ស៊ុមដែលកាន់កាប់ស្ទើរតែទាំងអស់ខាងក្នុងទូរទស្សន៍។ នៅចុងក្រោយតូចនៃផ្នែកខាងក្រោយគឺ 'កាំភ្លើងអេឡិចត្រុង' ដែលធ្វើនូវអ្វីដែលឈ្មោះវានិយាយ — វាបាញ់កាំរស្មីអេឡិចត្រុងពិត (ភាគល្អិតតូចជាងអាតូម) ទៅកញ្ចក់ខាងមុខ ៦០ ដងរៀងរាល់វិនាទី។ ខាងក្នុងកញ្ចក់ខាងមុខត្រូវបានលាបជាមួយម្សៅពិសេសហៅថា ផូស្វើ ដែលភ្លឺនៅកន្លែងណាដែលអេឡិចត្រុងវាយ។ ដោយដឹកនាំកាំរស្មីឆ្វេង-ស្ដាំ ឡើង-ចុះ កាំភ្លើងអាច 'លាប' រូបភាពតាមជួរនីមួយៗ លឿនល្មមភ្នែកយឺតរបស់យើងឃើញរូបភាពកំពុងផ្លាស់ទី។ ដើមឡើយ អេក្រង់មានតែផូស្វើមួយ ដូច្នេះអាចភ្លឺតែស-ខ្មៅ។ ប្រហែលឆ្នាំ ១៩៥៤ វិស្វករបានបន្ថែមកាំភ្លើងអេឡិចត្រុងផ្សេងគ្នា ៣ និងផូស្វើ ៣ ពណ៌ផ្សេងគ្នា (ក្រហម បៃតង ខៀវ) — ហើយទូរទស្សន៍ពេញពណ៌កើតឡើង។"
          >
            <CRTDiagram k={k} />
          </FeatureCard>

          <FeatureCard
            k={k}
            Icon={Layers}
            accent={CYAN}
            enTitle="LCD — the liquid-crystal flat screen"
            khTitle="LCD — អេក្រង់រាបស្មើគ្រីស្តាល់រាវ"
            enTag="Liquid Crystal Display · 1990s → today"
            khTag="អេក្រង់គ្រីស្តាល់រាវ · ១៩៩០ → សព្វថ្ងៃ"
            enBody="A modern flat television could not be more different. Behind the screen there is just one thing: a single, plain white backlight that is always on. The trick is what happens between the backlight and your eyes. In front of the white light sit millions of microscopic 'liquid crystals' — strange molecules that are halfway between a liquid and a solid, and that twist when electricity is applied to them. They act exactly like millions of tiny window blinds. When the electric current is off, the crystal sits twisted and lets light through. When the current is on, it untwists and blocks the light. In front of every group of three blinds is a coloured filter — one red, one green, one blue. So by opening or closing each tiny blind by exactly the right amount, the screen controls how much red, green, and blue light gets through every single pixel — sixty times every second. No moving parts, no heavy tube, no electron gun: just a flat lamp and millions of microscopic shutters."
            khBody="ទូរទស្សន៍រាបស្មើសម័យថ្មីពិតជាខុសគ្នាខ្លាំង។ នៅខាងក្រោយអេក្រង់មានតែមួយរបស់ ៖ ពន្លឺខាងក្រោយពណ៌សធម្មតាតែមួយ ដែលបើកជានិច្ច។ ល្បិចគឺអ្វីដែលកើតឡើងរវាងពន្លឺខាងក្រោយ និងភ្នែករបស់អ្នក។ នៅខាងមុខពន្លឺពណ៌សអង្គុយមាន 'គ្រីស្តាល់រាវ' មីក្រូស្កុបិករាប់លាន — ម៉ូលេគុលចម្លែកដែលនៅពាក់កណ្ដាលរវាងរាវ និងរឹង ហើយដែលរមួលនៅពេលអគ្គិសនីត្រូវបានអនុវត្តលើពួកវា។ ពួកវាដើរតួដូចប្រដាប់បិទបង្អួចតូចរាប់លានយ៉ាងដូចគ្នា។ នៅពេលចរន្តអគ្គិសនីបិទ គ្រីស្តាល់អង្គុយរមួល និងអនុញ្ញាតឲ្យពន្លឺឆ្លងកាត់។ នៅពេលចរន្តបើក វារំសាយ និងបិទពន្លឺ។ នៅខាងមុខគ្រប់ក្រុមនៃប្រដាប់បិទបង្អួច ៣ មានតម្រងពណ៌ — មួយក្រហម មួយបៃតង មួយខៀវ។ ដូច្នេះដោយបើកឬបិទប្រដាប់បិទបង្អួចតូចនីមួយៗចំពោះបរិមាណត្រឹមត្រូវ អេក្រង់គ្រប់គ្រងថា ពន្លឺក្រហម បៃតង និងខៀវប៉ុន្មានឆ្លងកាត់ភីកសែលនីមួយៗ — ៦០ ដងរៀងរាល់វិនាទី។ គ្មានផ្នែកផ្លាស់ទី គ្មានបំពង់ធ្ងន់ គ្មានកាំភ្លើងអេឡិចត្រុង ៖ មានតែចង្កៀងរាបស្មើ និងបន្ទះសំងាត់មីក្រូស្កុបិករាប់លាន។"
          />
        </div>

        {/* LCD layer-cake diagram */}
        <LCDLayerCake k={k} />

        {/* SECTION 3 · HD */}
        <div className="mt-12">
          <SectionHeader spec="03" en="High Definition: The Maths of Density" kh="កម្រិតច្បាស់ខ្ពស់ ៖ គណិតវិទ្យានៃដង់ស៊ីតេ" k={k} Icon={Monitor} accent={GREEN} />
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3">
            <FeatureCard
              k={k}
              Icon={Cpu}
              accent={GREEN}
              enTitle="What 'HD' and '4K' really mean"
              khTitle="អ្វីដែល 'HD' និង '4K' មានន័យពិតប្រាកដ"
              enTag="resolution = pixels per row × pixels per column"
              khTag="គុណភាពបង្ហាញ = ភីកសែលក្នុងជួរ × ភីកសែលក្នុងជួរឈរ"
              enBody="'HD' and '4K' are not magic words — they are just counting. They tell you how many pixels are squeezed into a screen. An old standard-definition CRT television had a picture about 720 dots wide and 480 dots tall, which works out to roughly 345,600 pixels in total. 'Full HD' (1080p) means 1,920 × 1,080 — about 2 million pixels. '4K' (also called UHD) means 3,840 × 2,160 — about 8.3 million pixels. The screen itself is the same size; the dots are just much, much smaller. And here is the magic of density: when the dots get small enough, your eye stops being able to see the gaps between them. The picture stops looking like a grid of squares and starts looking like real life. That is all 'high definition' actually is — pixels small enough to fool a human eye sitting on the other side of the room."
              khBody="'HD' និង '4K' មិនមែនជាពាក្យវេទមន្តទេ — ពួកវាគ្រាន់តែជាការរាប់។ ពួកវាប្រាប់អ្នកថា ភីកសែលប៉ុន្មានត្រូវបានច្របាច់បញ្ចូលក្នុងអេក្រង់។ ទូរទស្សន៍ CRT គុណភាពស្តង់ដារចាស់មានរូបភាពទទឹងប្រហែល ៧២០ ចំណុច និងកម្ពស់ ៤៨០ ចំណុច ដែលគណនាបានប្រហែល ៣៤៥,៦០០ ភីកសែលសរុប។ 'Full HD' (១០៨០p) មានន័យថា ១,៩២០ × ១,០៨០ — ប្រហែល ២ លានភីកសែល។ '4K' (ហៅផងដែរថា UHD) មានន័យថា ៣,៨៤០ × ២,១៦០ — ប្រហែល ៨.៣ លានភីកសែល។ អេក្រង់ខ្លួនឯងមានទំហំដូចគ្នា ; ចំណុចគ្រាន់តែតូចជាងច្រើនណាស់។ ហើយនេះគឺជាវេទមន្តនៃដង់ស៊ីតេ ៖ នៅពេលចំណុចតូចគ្រប់គ្រាន់ ភ្នែករបស់អ្នកលែងអាចមើលឃើញចន្លោះរវាងពួកវា។ រូបភាពលែងមើលទៅដូចក្រឡានៃការ៉េ និងចាប់ផ្ដើមមើលទៅដូចជីវិតពិត។ នោះគឺជាអ្វីដែល 'កម្រិតច្បាស់ខ្ពស់' ពិតប្រាកដ — ភីកសែលតូចគ្រប់គ្រាន់ដើម្បីបោកប្រាស់ភ្នែកមនុស្សដែលអង្គុយនៅផ្នែកម្ខាងទៀតនៃបន្ទប់។"
            />
          </div>
          <div className="lg:col-span-2">
            <ResolutionLadder k={k} />
          </div>
        </div>

        {/* SECTION 4 · The Invisible Command — How a TV Remote Works */}
        <RemoteControlSection k={k} />

        {/* Closing reflection */}
        <div
          className="mt-10 rounded-2xl border p-4 flex items-start gap-3"
          style={{ borderColor: `${CYAN}55`, backgroundColor: PANEL }}
        >
          <Atom className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
          <p className={`text-xs ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK_SOFT }}>
            {t(
              "Every video on your phone, every classroom presentation, and every football match on the family TV is built on the same simple idea: three colours of light, millions of times, sixty times a second. Engineering at its most beautiful is rarely magic — it is usually just a clever trick repeated very quickly.",
              "រាល់វីដេអូនៅលើទូរស័ព្ទរបស់អ្នក រាល់ការបង្ហាញក្នុងថ្នាក់រៀន និងរាល់ការប្រកួតបាល់ទាត់នៅលើទូរទស្សន៍គ្រួសារ ត្រូវបានកសាងលើគំនិតសាមញ្ញដូចគ្នា ៖ ៣ ពណ៌នៃពន្លឺ រាប់លានដង ៦០ ដងក្នុងមួយវិនាទី។ វិស្វកម្មនៅសម័យដ៏ស្រស់ស្អាតបំផុត កម្រជាវេទមន្ត — ជាធម្មតាគ្រាន់តែជាល្បិចឆ្លាតវៃដែលធ្វើឡើងវិញលឿនណាស់។"
            )}
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-black text-sm font-bold transition-opacity hover:opacity-90 ${k ? "font-khmer" : ""}`}
            style={{ backgroundColor: CYAN, boxShadow: `0 0 24px ${CYAN}77` }}
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
//  Diagram · Interactive RGB additive mixer
// ════════════════════════════════════════════════════════════════════════════

function RGBMixer({ k }: { k: boolean }) {
  const [r, setR] = useState(255);
  const [g, setG] = useState(255);
  const [b, setB] = useState(255);
  const swatch = `rgb(${r}, ${g}, ${b})`;
  const hex = "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();

  // Compute a friendly name for the mixed colour
  const name = describeColour(r, g, b, k);

  return (
    <div
      className="rounded-2xl border p-3 sm:p-4 h-full"
      style={{ borderColor: `${CYAN}55`, backgroundColor: PANEL }}
      data-testid="rgb-mixer"
    >
      <div className={`text-xs font-bold mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: CYAN }}>
        {k ? "ឧបករណ៍លាយពណ៌ RGB" : "RGB · ADDITIVE COLOUR MIXER"}
      </div>

      {/* Result swatch */}
      <div
        className="h-32 rounded-xl border flex items-end justify-between p-3"
        style={{
          backgroundColor: swatch,
          borderColor: GRID,
          boxShadow: `inset 0 0 0 1px ${GRID}, 0 0 24px ${swatch}55`,
        }}
        aria-label={k ? "ពណ៌លទ្ធផល" : "Resulting colour"}
      >
        <div
          className="font-mono text-[11px] px-2 py-0.5 rounded-md"
          style={{
            backgroundColor: "rgba(0,0,0,0.55)",
            color: INK,
          }}
        >
          {hex}
        </div>
        <div
          className={`text-[11px] px-2 py-0.5 rounded-md ${k ? "font-khmer" : ""}`}
          style={{
            backgroundColor: "rgba(0,0,0,0.55)",
            color: INK,
          }}
        >
          {name}
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-2 mt-4">
        <ChannelSlider label={k ? "ក្រហម" : "RED"}   value={r} setValue={setR} colour={RED}   k={k} />
        <ChannelSlider label={k ? "បៃតង" : "GREEN"} value={g} setValue={setG} colour={GREEN} k={k} />
        <ChannelSlider label={k ? "ខៀវ" : "BLUE"}  value={b} setValue={setB} colour={BLUE}  k={k} />
      </div>

      {/* Presets */}
      <div className="mt-3 flex flex-wrap gap-2">
        {[
          { label: k ? "ស"     : "WHITE",  rgb: [255, 255, 255] as const },
          { label: k ? "ខ្មៅ"  : "BLACK",  rgb: [  0,   0,   0] as const },
          { label: k ? "លឿង"  : "YELLOW", rgb: [255, 255,   0] as const },
          { label: k ? "ស៊ីយ៉ាន" : "CYAN",   rgb: [  0, 255, 255] as const },
          { label: k ? "ម៉ាហ្សិនតា" : "MAGENTA", rgb: [255,   0, 255] as const },
        ].map((p) => (
          <button
            key={p.label}
            onClick={() => { setR(p.rgb[0]); setG(p.rgb[1]); setB(p.rgb[2]); }}
            className={`text-[10px] font-mono px-2 py-1 rounded-md border transition-colors ${k ? "font-khmer" : ""}`}
            style={{
              borderColor: `${CYAN}55`,
              color: INK,
              backgroundColor: `rgb(${p.rgb[0]},${p.rgb[1]},${p.rgb[2]})`,
              mixBlendMode: "normal",
            }}
          >
            <span style={{
              backgroundColor: "rgba(0,0,0,0.55)",
              padding: "1px 4px",
              borderRadius: 4,
            }}>{p.label}</span>
          </button>
        ))}
      </div>

      <div className={`mt-3 text-[11px] italic ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
        {k
          ? "អូសរបារដើម្បីលាយ ៖ ៣ ពណ៌ × ២៥៦ កម្រិតពន្លឺ = ១៦.៧ លានពណ៌។"
          : "Drag the sliders: 3 channels × 256 brightness levels = 16.7 million colours."}
      </div>
    </div>
  );
}

function ChannelSlider({
  label,
  value,
  setValue,
  colour,
  k,
}: {
  label: string;
  value: number;
  setValue: (v: number) => void;
  colour: string;
  k: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] mb-0.5">
        <span className={k ? "font-khmer" : "font-mono uppercase tracking-widest"} style={{ color: colour }}>
          {label}
        </span>
        <span className="font-mono" style={{ color: INK }}>{num(k, value)}</span>
      </div>
      <input
        type="range"
        min={0}
        max={255}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label={label}
        className="w-full h-2 appearance-none rounded-full cursor-pointer"
        style={{
          background: `linear-gradient(to right, #000, ${colour})`,
        }}
      />
    </div>
  );
}

function describeColour(r: number, g: number, b: number, k: boolean): string {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max < 30) return k ? "ខ្មៅ" : "BLACK";
  if (min > 220) return k ? "ស" : "WHITE";
  if (max - min < 20) return k ? "ប្រផេះ" : "GREY";
  // dominant channels
  const isR = r === max && r - Math.max(g, b) > 30;
  const isG = g === max && g - Math.max(r, b) > 30;
  const isB = b === max && b - Math.max(r, g) > 30;
  if (isR) return k ? "ក្រហម" : "RED";
  if (isG) return k ? "បៃតង" : "GREEN";
  if (isB) return k ? "ខៀវ" : "BLUE";
  // pairs
  if (r > 180 && g > 180 && b < 80) return k ? "លឿង" : "YELLOW";
  if (g > 180 && b > 180 && r < 80) return k ? "ស៊ីយ៉ាន" : "CYAN";
  if (r > 180 && b > 180 && g < 80) return k ? "ម៉ាហ្សិនតា" : "MAGENTA";
  if (r > 200 && g > 100 && g < 200 && b < 80) return k ? "ទឹកក្រូច" : "ORANGE";
  if (r > 100 && b > 150 && g < 100) return k ? "ស្វាយ" : "PURPLE";
  return k ? "ពណ៌ច្រឡំ" : "MIXED";
}

// ════════════════════════════════════════════════════════════════════════════
//  Diagram · Pixel zoom — show how a flat colour is really 3 sub-pixels
// ════════════════════════════════════════════════════════════════════════════

function PixelZoom({ k }: { k: boolean }) {
  return (
    <div
      className="rounded-3xl border p-4 sm:p-6"
      style={{ borderColor: `${CYAN}55`, backgroundColor: PANEL }}
      data-testid="pixel-zoom"
    >
      <div className={`text-xs font-bold mb-3 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: CYAN }}>
        {k ? "ការពង្រីក ៖ ពណ៌តែមួយ → ៣ ពន្លឺ" : "ZOOM IN · ONE COLOUR → THREE LIGHTS"}
      </div>
      <svg
        viewBox="0 0 720 240"
        className="w-full h-auto"
        role="img"
        aria-label={k ? "ដ្យាក្រាមការពង្រីកភីកសែល" : "Pixel zoom diagram"}
      >
        {/* Stage 1 — full picture (smiley) */}
        <g transform="translate(0,20)">
          <rect width="180" height="180" rx="10" fill="#04060c" stroke={GRID} />
          <circle cx="90" cy="90" r="55" fill="#fbbf24" />
          <circle cx="72" cy="78" r="6" fill="#0a0a0f" />
          <circle cx="108" cy="78" r="6" fill="#0a0a0f" />
          <path d="M 64 100 Q 90 130 116 100" stroke="#0a0a0f" strokeWidth="4" fill="none" strokeLinecap="round" />
          <text x="90" y="220" fontSize="10" textAnchor="middle" fill={INK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "១ · រូបភាពពេញ" : "1 · FULL PICTURE"}
          </text>
        </g>
        {/* Arrow */}
        <g transform="translate(180,110)">
          <line x1="10" y1="0" x2="38" y2="0" stroke={CYAN} strokeWidth="2" markerEnd="url(#tvArrow)" />
        </g>
        {/* Stage 2 — pixel grid (zoomed yellow region) */}
        <g transform="translate(230,20)">
          <rect width="180" height="180" rx="10" fill="#04060c" stroke={GRID} />
          {/* a 6x6 grid of yellow pixels with slight variations */}
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((__, col) => (
              <rect
                key={`${row}-${col}`}
                x={col * 30 + 0}
                y={row * 30 + 0}
                width="29"
                height="29"
                fill={"#fbbf24"}
                opacity={0.85 + ((row + col) % 3) * 0.05}
                stroke="#04060c"
                strokeWidth="0.5"
              />
            ))
          )}
          {/* highlight one pixel */}
          <rect x="60" y="60" width="29" height="29" fill="none" stroke={CYAN} strokeWidth="2" />
          <text x="90" y="220" fontSize="10" textAnchor="middle" fill={INK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "២ · ភីកសែលលឿង" : "2 · YELLOW PIXELS"}
          </text>
        </g>
        {/* Arrow */}
        <g transform="translate(410,110)">
          <line x1="10" y1="0" x2="38" y2="0" stroke={CYAN} strokeWidth="2" markerEnd="url(#tvArrow)" />
        </g>
        {/* Stage 3 — sub-pixel — three vertical bars */}
        <g transform="translate(460,20)">
          <rect width="240" height="180" rx="10" fill="#000" stroke={GRID} />
          {/* RED bar — full brightness */}
          <rect x="20"  y="16" width="60" height="148" fill={RED} />
          <text x="50"  y="180" fontSize="10" textAnchor="middle" fill={RED} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? `ក្រហម ${toKhNum(255)}` : "R 255"}
          </text>
          {/* GREEN bar — full brightness */}
          <rect x="90"  y="16" width="60" height="148" fill={GREEN} />
          <text x="120" y="180" fontSize="10" textAnchor="middle" fill={GREEN} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? `បៃតង ${toKhNum(255)}` : "G 255"}
          </text>
          {/* BLUE bar — OFF (so result is yellow) */}
          <rect x="160" y="16" width="60" height="148" fill="#0a0a0f" stroke={BLUE} strokeWidth="1" strokeDasharray="3 3" />
          <text x="190" y="180" fontSize="10" textAnchor="middle" fill={BLUE} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? `ខៀវ ${toKhNum(0)}` : "B 0"}
          </text>
          <text x="120" y="220" fontSize="10" textAnchor="middle" fill={INK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "៣ · ភីកសែលរង = ក្រហម + បៃតង + ០ = លឿង" : "3 · SUB-PIXELS · R + G + 0 = YELLOW"}
          </text>
        </g>
        <defs>
          <marker id="tvArrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill={CYAN} />
          </marker>
        </defs>
      </svg>
      <div className={`mt-2 text-[12px] text-center ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
        {k
          ? "គ្មានចង្កៀងលឿងណាមួយ ៖ ភ្នែករបស់អ្នកបន្ថែមពន្លឺក្រហម + បៃតងជា 'លឿង'។"
          : "There is no yellow lamp — your eye adds bright red + bright green into 'yellow'."}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Diagram · CRT side-view — electron gun + phosphor screen
// ════════════════════════════════════════════════════════════════════════════

function CRTDiagram({ k }: { k: boolean }) {
  return (
    <div
      className="rounded-2xl p-3 border"
      style={{ borderColor: `${AMBER}33`, backgroundColor: PANEL_2 }}
      data-testid="crt-diagram"
    >
      <svg
        viewBox="0 0 360 180"
        className="w-full h-auto"
        role="img"
        aria-label={k ? "ដ្យាក្រាម CRT" : "CRT diagram"}
      >
        {/* Tube outline */}
        <path d="M 30 70 L 30 110 L 110 130 L 320 145 L 340 130 L 340 50 L 320 35 L 110 50 Z" fill="#1a1d28" stroke={AMBER} strokeWidth="1.2" />
        {/* Front phosphor screen */}
        <line x1="320" y1="35" x2="320" y2="145" stroke={GREEN} strokeWidth="4" />
        <text x="320" y="170" fontSize="8" textAnchor="middle" fill={GREEN} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ផូស្វើ R/G/B" : "PHOSPHOR R/G/B"}
        </text>
        {/* Electron guns (3 of them stacked) */}
        {[60, 90, 120].map((y, i) => {
          const c = i === 0 ? RED : i === 1 ? GREEN : BLUE;
          const enLetter = i === 0 ? "R" : i === 1 ? "G" : "B";
          const khLetter = i === 0 ? "ក" : i === 1 ? "ប" : "ខ";
          return (
            <g key={i}>
              <rect x="20" y={y - 4} width="20" height="8" fill={c} />
              <text x="-2" y={y + 3} fontSize="7" fill={c} fontFamily={k ? "Hanuman, serif" : "monospace"}>
                {k ? khLetter : enLetter}
              </text>
            </g>
          );
        })}
        {/* Beam paths */}
        {[60, 90, 120].map((y, i) => {
          const c = i === 0 ? RED : i === 1 ? GREEN : BLUE;
          return (
            <line
              key={`beam-${i}`}
              x1={40} y1={y}
              x2={319} y2={(35 + 145) / 2 - 30 + i * 20}
              stroke={c}
              strokeWidth="1"
              strokeDasharray="3 2"
            />
          );
        })}
        {/* Deflection coils */}
        <circle cx="170" cy="65" r="12" fill="none" stroke={CYAN} strokeWidth="1.2" />
        <circle cx="170" cy="115" r="12" fill="none" stroke={CYAN} strokeWidth="1.2" />
        <text x="170" y="40" fontSize="7" textAnchor="middle" fill={CYAN} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "កំាងសរសៃបង្វិល" : "DEFLECTION COILS"}
        </text>
        {/* Label gun */}
        <text x="30" y="20" fontSize="8" fill={AMBER} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "កាំភ្លើងអេឡិចត្រុង × ៣" : "ELECTRON GUNS × 3"}
        </text>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Diagram · LCD layer cake — backlight, polarizer, crystals, filter, glass
// ════════════════════════════════════════════════════════════════════════════

function LCDLayerCake({ k }: { k: boolean }) {
  type Layer = {
    en: string;
    kh: string;
    descEn: string;
    descKh: string;
    colour: string;
  };
  const layers: Layer[] = [
    {
      en: "1 · Backlight",
      kh: "១ · ពន្លឺខាងក្រោយ",
      descEn: "A solid-white LED panel that is always on. It only knows how to be bright; it cannot make colours by itself.",
      descKh: "បន្ទះ LED ពណ៌សដែលបើកជានិច្ច។ វាអាចចេះតែភ្លឺ ; មិនអាចបង្កើតពណ៌ដោយខ្លួនវាបានទេ។",
      colour: "#fafafa",
    },
    {
      en: "2 · Rear polariser",
      kh: "២ · តម្រងពន្លឺខាងក្រោយ (ប៉ូឡារីសេ)",
      descEn: "A filter that lets only horizontally-vibrating light waves pass through. Half the light is thrown away here.",
      descKh: "តម្រងដែលអនុញ្ញាតតែរលកពន្លឺដែលរំញ័រផ្ដេកឆ្លងកាត់។ ពាក់កណ្ដាលនៃពន្លឺត្រូវបានបោះចោលនៅទីនេះ។",
      colour: "#94a3b8",
    },
    {
      en: "3 · Liquid crystals + electrodes",
      kh: "៣ · គ្រីស្តាល់រាវ + អេឡិចត្រូត",
      descEn: "The 'shutter' layer. Each pixel contains crystals that twist when electricity is applied — twisting either lets the light pass or blocks it.",
      descKh: "ស្រទាប់ 'ប្រដាប់បិទ'។ ភីកសែលនីមួយៗមានគ្រីស្តាល់ដែលរមួលនៅពេលអគ្គិសនីត្រូវបានអនុវត្ត — ការរមួលអាចអនុញ្ញាតពន្លឺឆ្លងកាត់ ឬបិទវា។",
      colour: "#22d3ee",
    },
    {
      en: "4 · RGB colour filter",
      kh: "៤ · តម្រងពណ៌ RGB",
      descEn: "A grid of microscopic red, green, and blue stripes. White light passing through becomes red, green, or blue depending on which stripe it hits.",
      descKh: "ក្រឡានៃខ្សែបន្ទាត់មីក្រូស្កុបិកក្រហម បៃតង និងខៀវ។ ពន្លឺពណ៌សដែលឆ្លងកាត់ក្លាយជាក្រហម បៃតង ឬខៀវ អាស្រ័យលើខ្សែបន្ទាត់ណាដែលវាវាយ។",
      colour: RED,
    },
    {
      en: "5 · Front polariser",
      kh: "៥ · តម្រងពន្លឺខាងមុខ (ប៉ូឡារីសេ)",
      descEn: "A second polariser, turned 90° to the first. Together with the crystals, it decides exactly how much light reaches your eyes.",
      descKh: "តម្រងពន្លឺទីពីរ បង្វិល ៩០° ទៅទីមួយ។ រួមជាមួយគ្រីស្តាល់ វាសម្រេចចិត្តយ៉ាងត្រឹមត្រូវថា ពន្លឺប៉ុន្មានដល់ភ្នែករបស់អ្នក។",
      colour: "#94a3b8",
    },
    {
      en: "6 · Glass surface",
      kh: "៦ · ផ្ទៃកញ្ចក់",
      descEn: "The protective glass you actually touch. Everything that has happened in layers 1–5 has happened in just a few millimetres behind this surface.",
      descKh: "កញ្ចក់ការពារដែលអ្នកប៉ះពិតប្រាកដ។ អ្វីៗគ្រប់យ៉ាងដែលបានកើតឡើងក្នុងស្រទាប់ ១–៥ បានកើតឡើងក្នុងមីលីម៉ែត្រពីរបីនៅខាងក្រោយផ្ទៃនេះ។",
      colour: "#e5e7eb",
    },
  ];

  return (
    <div
      className="rounded-3xl border p-4 sm:p-6 mb-12"
      style={{ borderColor: `${CYAN}55`, backgroundColor: PANEL }}
      data-testid="lcd-layer-cake"
    >
      <div className={`text-xs font-bold mb-3 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: CYAN }}>
        {k ? "មុខកាត់នៃអេក្រង់ LCD" : "LCD · CROSS-SECTION"}
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* The diagram itself */}
        <div className="lg:col-span-2">
          <svg
        viewBox="0 0 400 320"
        className="w-full h-auto"
        role="img"
        aria-label={k ? "មុខកាត់ស្រទាប់ LCD" : "LCD layer cross-section"}
      >
            {/* viewer eye on the right */}
            <g transform="translate(360,160)">
              <ellipse rx="22" ry="14" fill="#fff" stroke={INK} strokeWidth="1" />
              <circle r="7" fill="#0ea5e9" />
              <circle r="3" fill="#0a0a0f" />
              <text y="34" fontSize="9" textAnchor="middle" fill={INK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
                {k ? "ភ្នែក" : "EYE"}
              </text>
            </g>

            {/* Layers (vertical stack, drawn left → right toward eye) */}
            {(() => {
              const widths = [22, 14, 36, 22, 14, 14];
              let x = 20;
              return widths.map((w, i) => {
                const layer = layers[i];
                const rect = (
                  <g key={i}>
                    <rect x={x} y={40} width={w} height={240} fill={layer.colour} stroke={GRID} strokeWidth="1" />
                    {/* number badge */}
                    <circle cx={x + w / 2} cy={28} r="9" fill="#0a0a0f" stroke={CYAN} strokeWidth="1.2" />
                    <text x={x + w / 2} y={31} fontSize="9" textAnchor="middle" fill={CYAN} fontFamily="monospace">{i + 1}</text>
                  </g>
                );
                x += w + 6;
                return rect;
              });
            })()}

            {/* Light ray going from backlight through everything */}
            {(() => {
              // start at left of layer 1, end at eye
              const start = { x: 20, y: 160 };
              const end = { x: 338, y: 160 };
              return (
                <g>
                  <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={AMBER} strokeWidth="2" strokeDasharray="6 4" />
                  <polygon points={`${end.x},${end.y - 4} ${end.x + 8},${end.y} ${end.x},${end.y + 4}`} fill={AMBER} />
                </g>
              );
            })()}

            {/* Sub-pixel cluster on filter layer */}
            <g transform="translate(180,90)">
              <rect width="36" height="22" fill={RED} />
              <rect y="22" width="36" height="22" fill={GREEN} />
              <rect y="44" width="36" height="22" fill={BLUE} />
              <text x="40" y="36" fontSize="9" fill={INK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
                {k ? "ក/ប/ខ" : "R/G/B"}
              </text>
            </g>
            {/* Twisted-crystal cartoon on layer 3 */}
            <g transform="translate(95,205)">
              <rect width="36" height="60" rx="3" fill="none" stroke={CYAN} strokeWidth="0.8" />
              {Array.from({ length: 6 }).map((_, i) => (
                <line
                  key={i}
                  x1="6" y1={6 + i * 9}
                  x2="30" y2={9 + i * 9}
                  stroke={CYAN}
                  strokeWidth="1.2"
                  transform={`rotate(${i * 12 - 30} 18 ${6 + i * 9})`}
                />
              ))}
              <text x="18" y="76" fontSize="8" textAnchor="middle" fill={CYAN} fontFamily={k ? "Hanuman, serif" : "monospace"}>
                {k ? "រមួល" : "TWIST"}
              </text>
            </g>

            {/* Title labels */}
            <text x="20" y="305" fontSize="9" fill={AMBER} fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "← ពន្លឺខាងក្រោយ" : "← BACKLIGHT"}
            </text>
            <text x="338" y="305" fontSize="9" textAnchor="end" fill={CYAN} fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "ភ្នែករបស់អ្នក →" : "YOUR EYE →"}
            </text>
          </svg>
        </div>

        {/* Layer descriptions */}
        <ol className="lg:col-span-3 space-y-2">
          {layers.map((layer, i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl border"
              style={{ borderColor: GRID, backgroundColor: PANEL_2 }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-[11px] font-bold"
                style={{ backgroundColor: `${CYAN}22`, color: CYAN, border: `1px solid ${CYAN}88` }}
              >
                {num(k, i + 1)}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                  {k ? layer.kh : layer.en}
                </div>
                <div className={`text-[12px] mt-0.5 ${k ? "font-khmer leading-loose" : ""}`} style={{ color: INK_SOFT }}>
                  {k ? layer.descKh : layer.descEn}
                </div>
              </div>
              <div
                className="w-3 h-12 rounded-sm flex-shrink-0 mt-0.5"
                style={{ backgroundColor: layer.colour, border: `1px solid ${GRID}` }}
                aria-hidden="true"
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Diagram · Resolution ladder — SD vs HD vs Full HD vs 4K vs 8K
// ════════════════════════════════════════════════════════════════════════════

function ResolutionLadder({ k }: { k: boolean }) {
  const tiers = [
    { name: "SD",      kh: "ស្តង់ដារ",      w:  720, h:  480, total:    345600, colour: "#6b7280" },
    { name: "HD",      kh: "HD",          w: 1280, h:  720, total:    921600, colour: "#0ea5e9" },
    { name: "Full HD", kh: "Full HD",     w: 1920, h: 1080, total:   2073600, colour: "#22c55e" },
    { name: "4K UHD",  kh: "4K UHD",      w: 3840, h: 2160, total:   8294400, colour: "#a855f7" },
    { name: "8K UHD",  kh: "8K UHD",      w: 7680, h: 4320, total:  33177600, colour: "#ef4444" },
  ];
  const max = tiers[tiers.length - 1].total;

  return (
    <div
      className="rounded-2xl border p-3 sm:p-4 h-full"
      style={{ borderColor: `${GREEN}55`, backgroundColor: PANEL }}
      data-testid="resolution-ladder"
    >
      <div className={`text-xs font-bold mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: GREEN }}>
        {k ? "ដង់ស៊ីតេភីកសែល · គុណភាព ៥ កម្រិត" : "PIXEL DENSITY · 5 RESOLUTIONS"}
      </div>
      <ol className="space-y-2.5 mt-2">
        {tiers.map((tier) => {
          const pct = (tier.total / max) * 100;
          return (
            <li key={tier.name}>
              <div className="flex items-center justify-between text-[11px] mb-0.5">
                <span className={`font-bold ${k ? "font-khmer" : "font-mono"}`} style={{ color: INK }}>
                  {k ? tier.kh : tier.name}
                </span>
                <span className="font-mono" style={{ color: tier.colour }}>
                  {num(k, tier.w.toLocaleString())} × {num(k, tier.h.toLocaleString())}
                </span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: `${tier.colour}22` }}>
                <div className="h-full rounded-full" style={{ width: `${Math.max(pct, 1)}%`, backgroundColor: tier.colour }} />
              </div>
              <div className="flex items-center justify-between mt-0.5 text-[10px]">
                <span className="font-mono" style={{ color: INK_SOFT }}>
                  {num(k, (tier.total / 1_000_000).toFixed(tier.total >= 1_000_000 ? 1 : 2))} M {k ? "ភីកសែល" : "px"}
                </span>
                <span className="font-mono" style={{ color: INK_SOFT }}>
                  ×{num(k, Math.round(tier.total / tiers[0].total))} {k ? "ដង" : "vs SD"}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
      <div className={`mt-3 text-[10px] italic ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
        {k
          ? "ដង់ស៊ីតេឡើង × ៩៦ ដង ពី SD ទៅ 8K · អេក្រង់ដូចគ្នា ភីកសែលតូចជាងឆ្ងាយ។"
          : "Density rises ×96 from SD to 8K · same screen, far smaller dots."}
      </div>
    </div>
  );
}
