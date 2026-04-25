import { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  Crown,
  Droplets,
  Drumstick,
  Feather,
  Flag,
  Flower2,
  Ghost,
  Globe2,
  HandHeart,
  Heart,
  LandPlot,
  Landmark,
  Mountain,
  PartyPopper,
  Scale,
  Scroll,
  Search,
  Ship,
  Sparkles,
  Star,
  Sun,
  Sword,
  TreePine,
  Trophy,
  Users,
  Vote,
  Wrench,
  Gavel,
  Signature,
  Ban,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  GEO-US-01 · The United States: History, Geography, and Culture
//             សហរដ្ឋអាមេរិក៖ ប្រវត្តិសាស្ត្រ ភូមិសាស្ត្រ និងវប្បធម៌
//
//  Tabbed module — 5 tabs:
//   1 · Geography & Demographics
//   2 · The Founding Story
//   3 · Cultural Holidays
//   4 · Landmarks & Leaders (Mount Rushmore + all 46 presidents)
//
//  Aesthetic: Americana — navy `#0a2463`, heritage red `#b91c1c`,
//             cream `#fbf8f1`, parchment `#f5efdf`. Clean academic typography.
// ════════════════════════════════════════════════════════════════════════════

const NAVY        = "#0a2463";
const NAVY_DEEP   = "#06184a";
const NAVY_SOFT   = "#dfe6f5";
const RED         = "#b91c1c";
const RED_DEEP    = "#7f1d1d";
const CREAM       = "#fbf8f1";
const PARCHMENT   = "#f5efdf";
const INK         = "#1c1917";
const INK_SOFT    = "#44403c";
const RULE        = "#d6d3d1";
const GOLD        = "#b08800";
const GOLD_SOFT   = "#fef3c7";

const FRAME: React.CSSProperties = {
  backgroundColor: CREAM,
  backgroundImage:
    `radial-gradient(circle at 0% 0%, ${NAVY}11, transparent 40%),` +
    `radial-gradient(circle at 100% 100%, ${RED}0e, transparent 45%)`,
};

type T = (en: string, kh: string) => string;

// ─── Khmer numerals ───────────────────────────────────────────────────────
const KH_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
function toKhNum(n: number | string): string {
  return String(n).replace(/[0-9]/g, (d) => KH_DIGITS[Number(d)]);
}
function num(k: boolean, n: number | string): string {
  return k ? toKhNum(n) : String(n);
}

// ─── Section header ───────────────────────────────────────────────────────

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
        className="font-mono text-[10px] tracking-[0.25em] uppercase rounded-md px-2.5 py-1 text-white"
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
      <div className="flex-1 border-t border-dashed" style={{ borderColor: RULE }} />
    </div>
  );
}

// ─── Stat tile ────────────────────────────────────────────────────────────

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
      className="rounded-2xl border-2 p-3 sm:p-4 bg-white"
      style={{ borderColor: `${accent}55` }}
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
        style={{ color: NAVY_DEEP, fontFamily: k ? "Hanuman, serif" : undefined }}
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

// ─── Bilingual paragraph block ────────────────────────────────────────────

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

// ════════════════════════════════════════════════════════════════════════════
//  Tab definitions
// ════════════════════════════════════════════════════════════════════════════

type TabKey = "geo" | "founding" | "holidays" | "landmarks";

const TABS: {
  key: TabKey;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enLabel: string;
  khLabel: string;
  enShort: string;
  khShort: string;
}[] = [
  { key: "geo",       Icon: Globe2,   enLabel: "Geography & Demographics", khLabel: "ភូមិសាស្ត្រ និងប្រជាសាស្ត្រ", enShort: "Geography",  khShort: "ភូមិសាស្ត្រ" },
  { key: "founding",  Icon: Scroll,   enLabel: "The Founding Story",       khLabel: "ប្រវត្តិទូទៅ",                 enShort: "Founding",   khShort: "ប្រវត្តិ" },
  { key: "holidays",  Icon: Calendar, enLabel: "Cultural Holidays",        khLabel: "ថ្ងៃឈប់សម្រាកវប្បធម៌",        enShort: "Holidays",   khShort: "ថ្ងៃឈប់" },
  { key: "landmarks", Icon: Landmark, enLabel: "Landmarks & Leaders",      khLabel: "តំបន់ប្រវត្តិសាស្ត្រ និងថ្នាក់ដឹកនាំ", enShort: "Leaders",    khShort: "ថ្នាក់ដឹកនាំ" },
];

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export function UnitedStatesPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";
  const [tab, setTab] = useState<TabKey>("geo");

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={FRAME}>
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${k ? "font-khmer" : ""}`}
            style={{ color: NAVY }}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
        </div>

        {/* Hero */}
        <header
          className="relative rounded-[2rem] p-6 sm:p-9 mb-8 overflow-hidden border-2"
          style={{
            borderColor: `${NAVY}33`,
            backgroundColor: "#ffffff",
            backgroundImage:
              `repeating-linear-gradient(0deg, ${RED}0d, ${RED}0d 18px, transparent 18px, transparent 36px),` +
              `linear-gradient(135deg, #ffffff 0%, ${NAVY_SOFT} 100%)`,
          }}
        >
          {/* Star canton */}
          <svg
            viewBox="0 0 200 120"
            className="absolute top-0 left-0 w-44 h-28 opacity-95"
            aria-hidden="true"
          >
            <rect width="200" height="120" fill={NAVY} />
            {Array.from({ length: 5 }).map((_, row) =>
              Array.from({ length: 5 }).map((_, col) => (
                <Star5
                  key={`${row}-${col}`}
                  cx={20 + col * 40 + (row % 2) * 20}
                  cy={15 + row * 22}
                  size={6}
                  fill="#ffffff"
                />
              ))
            )}
          </svg>

          <div className="relative pl-0 sm:pl-44">
            <div
              className={`flex items-center gap-2 text-xs mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-[0.3em]"}`}
              style={{ color: RED_DEEP }}
            >
              <span>{t("Study Center · Geography", "មជ្ឈមណ្ឌលសិក្សា · ភូមិសាស្ត្រ")}</span>
              <span>·</span>
              <span>GEO-US-01</span>
            </div>
            <h1
              className={`text-3xl sm:text-4xl font-extrabold leading-tight ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: NAVY_DEEP }}
              data-testid="page-title"
            >
              {t(
                "The United States: History, Geography, and Culture",
                "សហរដ្ឋអាមេរិក៖ ប្រវត្តិសាស្ត្រ ភូមិសាស្ត្រ និងវប្បធម៌"
              )}
            </h1>
            <p
              className={`mt-3 text-sm sm:text-base max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: INK_SOFT }}
            >
              {t(
                "Fifty states stitched together across an entire continent: deserts, mountains, the Great Lakes, two long coastlines, 335 million people, 46 presidents, and a written constitution that is older than almost every country alive today. This module walks through the land, the founding story, the holidays families share, and the landmarks and leaders that built the United States of America.",
                "រដ្ឋហាសិបតភ្ជាប់គ្នាឆ្លងកាត់ទ្វីបទាំងមូល ៖ វាលខ្សាច់ ភ្នំ ស្រះធំៗ ឆ្នេរសមុទ្រវែងពីរ មនុស្ស ៣៣៥ លាននាក់ ប្រធានាធិបតី ៤៦ នាក់ និងរដ្ឋធម្មនុញ្ញសរសេរដែលចាស់ជាងស្ទើរតែគ្រប់ប្រទេសសព្វថ្ងៃ។ មុខវិជ្ជានេះដើរកាត់ទឹកដី ប្រវត្តិបង្កើត ថ្ងៃឈប់សម្រាកដែលក្រុមគ្រួសារចែករំលែក និងតំបន់ និងថ្នាក់ដឹកនាំដែលបានកសាងសហរដ្ឋអាមេរិក។"
              )}
            </p>
          </div>
        </header>

        {/* Tab navigation */}
        <div
          role="tablist"
          aria-label={t("Section tabs", "ផ្ទាំងផ្នែក")}
          className="mb-6 flex flex-wrap gap-2 p-2 rounded-2xl border-2 bg-white"
          style={{ borderColor: `${NAVY}33` }}
          data-testid="tab-nav"
        >
          {TABS.map((tDef, i) => {
            const active = tab === tDef.key;
            const Icon = tDef.Icon;
            return (
              <button
                key={tDef.key}
                role="tab"
                id={`us-tab-${tDef.key}`}
                aria-controls={`us-panel-${tDef.key}`}
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                onClick={() => setTab(tDef.key)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const dir = e.key === "ArrowRight" ? 1 : -1;
                    const next = TABS[(i + dir + TABS.length) % TABS.length];
                    setTab(next.key);
                    requestAnimationFrame(() => {
                      const el = document.getElementById(`us-tab-${next.key}`);
                      el?.focus();
                    });
                  }
                }}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-bold transition-colors ${k ? "font-khmer" : ""}`}
                style={{
                  backgroundColor: active ? NAVY : "transparent",
                  color: active ? "#ffffff" : NAVY,
                  border: `1.5px solid ${active ? NAVY : "transparent"}`,
                }}
                data-testid={`tab-${tDef.key}`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{k ? tDef.khLabel : tDef.enLabel}</span>
                <span className="sm:hidden">{k ? tDef.khShort : tDef.enShort}</span>
              </button>
            );
          })}
        </div>

        {/* Tab panels */}
        <div
          role="tabpanel"
          id={`us-panel-${tab}`}
          aria-labelledby={`us-tab-${tab}`}
          data-testid={`panel-${tab}`}
        >
          {tab === "geo"       && <GeographyTab   k={k} t={t} />}
          {tab === "founding"  && <FoundingTab    k={k} t={t} />}
          {tab === "holidays"  && <HolidaysTab    k={k} t={t} />}
          {tab === "landmarks" && <LandmarksTab   k={k} t={t} />}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold transition-opacity hover:opacity-90 ${k ? "font-khmer" : ""}`}
            style={{ backgroundColor: NAVY }}
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
//  Helper · Five-pointed star SVG
// ════════════════════════════════════════════════════════════════════════════

function Star5({
  cx,
  cy,
  size,
  fill,
}: {
  cx: number;
  cy: number;
  size: number;
  fill: string;
}) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? size : size / 2.4;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return <polygon points={pts.join(" ")} fill={fill} />;
}

// ════════════════════════════════════════════════════════════════════════════
//  TAB 01 · Geography & Demographics
// ════════════════════════════════════════════════════════════════════════════

function GeographyTab({ k, t }: { k: boolean; t: T }) {
  return (
    <section data-testid="tab-geography">
      {/* The Land */}
      <SectionHeader spec="01a" en="The Land" kh="ទឹកដី" k={k} Icon={LandPlot} accent={NAVY} />

      <div className="grid lg:grid-cols-3 gap-5 mb-8">
        <div className="lg:col-span-2">
          <StatesMap k={k} />
        </div>
        <div className="space-y-3">
          <StatTile
            Icon={Flag}
            k={k}
            enLabel="States"
            khLabel="រដ្ឋ"
            value={num(k, 50)}
            enUnit="self-governing states + 1 federal district (D.C.)"
            khUnit="រដ្ឋគ្រប់គ្រងខ្លួន ៥០ + តំបន់សហព័ន្ធ ១ (D.C.)"
            accent={NAVY}
          />
          <StatTile
            Icon={LandPlot}
            k={k}
            enLabel="Total area"
            khLabel="ផ្ទៃក្រឡាសរុប"
            value={`${num(k, "9.83")} M km²`}
            enUnit="3rd or 4th largest country by land area in the world"
            khUnit="ប្រទេសធំជាងគេទី ៣ ឬទី ៤ ក្នុងពិភពលោកតាមផ្ទៃដី"
            accent={NAVY}
          />
          <StatTile
            Icon={Sun}
            k={k}
            enLabel="Time zones"
            khLabel="តំបន់ពេលវេលា"
            value={num(k, 6)}
            enUnit="from Hawaii to Maine — sunset crosses the country"
            khUnit="ពី Hawaii ដល់ Maine — ថ្ងៃលិចឆ្លងកាត់ប្រទេស"
            accent={NAVY}
          />
        </div>
      </div>

      {/* Great Lakes + Capital */}
      <div className="grid lg:grid-cols-2 gap-5 mb-8">
        <FeatureCard
          k={k}
          Icon={Droplets}
          enTitle="The Great Lakes"
          khTitle="ស្រះធំៗ"
          enTag="freshwater inland sea"
          khTag="សមុទ្រទឹកសាបក្នុងដី"
          accent={NAVY}
          enBody="On the northern border with Canada lie five enormous lakes — Superior, Michigan, Huron, Erie, and Ontario — that look more like inland seas than lakes. Together they hold roughly 21% of all the surface fresh water on Earth, enough to cover the entire continental United States in 2.9 metres of water. Lake Superior alone is larger than the country of Cambodia. The lakes give birth to the Saint Lawrence River, which flows out to the Atlantic Ocean and carries cargo ships from the heart of the continent all the way to Europe."
          khBody="នៅព្រំដែនខាងជើងជាមួយប្រទេសកាណាដា មានស្រះធំៗប្រាំ — Superior, Michigan, Huron, Erie, និង Ontario — ដែលមើលទៅដូចជាសមុទ្រក្នុងដីច្រើនជាងស្រះ។ ពួកវារួមគ្នាមានទឹកសាបនៅផ្ទៃផែនដីប្រហែល ២១% នៃទាំងអស់ គ្រប់គ្រាន់ដើម្បីគ្របដណ្តប់សហរដ្ឋអាមេរិកទាំងមូលក្នុងទឹកជម្រៅ ២,៩ ម៉ែត្រ។ ស្រះ Superior តែឯងក៏ធំជាងប្រទេសកម្ពុជាទៀតហើយ។ ស្រះទាំងនេះផ្ដល់កំណើតដល់ទន្លេ Saint Lawrence ដែលហូរទៅសមុទ្រអាត្លង់ទិច និងផ្ទុកនាវាទំនិញពីបេះដូងទ្វីបទៅដល់អឺរ៉ុប។"
        >
          <GreatLakesViz k={k} />
        </FeatureCard>

        <FeatureCard
          k={k}
          Icon={Landmark}
          enTitle="Washington, D.C."
          khTitle="វ៉ាស៊ីនតោន ឌី.ស៊ី."
          enTag="the capital · founded 1790"
          khTag="រដ្ឋធានី · បង្កើតឆ្នាំ ១៧៩០"
          accent={RED}
          enBody="The capital is not in any state. It is its own federal district called the District of Columbia (D.C.), carved out between Maryland and Virginia in 1790 so that no single state could claim power over the national government. Inside D.C. you find the White House (where the president lives and works), the Capitol Building (where Congress writes the laws), and the Supreme Court (which decides if those laws agree with the Constitution). The whole city was deliberately designed from scratch with broad avenues radiating like spokes — so the seat of power could not look like any old town that grew up by accident."
          khBody="រដ្ឋធានីមិននៅក្នុងរដ្ឋណាមួយទេ។ វាគឺជាតំបន់សហព័ន្ធផ្ទាល់ខ្លួនហៅថា District of Columbia (D.C.) កាត់ចេញរវាង Maryland និង Virginia ក្នុងឆ្នាំ ១៧៩០ ដើម្បីកុំឲ្យរដ្ឋណាមួយតែឯងអាចទាមទារអំណាចលើរដ្ឋាភិបាលជាតិបាន។ នៅក្នុង D.C. អ្នករកឃើញ White House (កន្លែងដែលប្រធានាធិបតីរស់នៅ និងធ្វើការ) Capitol Building (កន្លែងដែលសភាសរសេរច្បាប់) និងតុលាការកំពូល (ដែលសម្រេចថា ច្បាប់ទាំងនោះស្របតាមរដ្ឋធម្មនុញ្ញ ឬអត់)។ ទីក្រុងទាំងមូលត្រូវបានរចនាដោយចេតនាពីដើម ដោយមានផ្លូវធំៗរសាត់ដូចជាដៃកង់ — ដើម្បីកន្លែងអំណាចមិនអាចមើលទៅដូចជាទីក្រុងចាស់ដែលរីកដោយចៃដន្យ។"
        >
          <DCViz k={k} />
        </FeatureCard>
      </div>

      {/* The People */}
      <SectionHeader spec="01b" en="The People" kh="ប្រជាជន" k={k} Icon={Users} accent={RED} />

      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <StatTile
          Icon={Users}
          k={k}
          enLabel="Population"
          khLabel="ប្រជាជន"
          value={`~${num(k, 335)} M`}
          enUnit="3rd most populous country, after India and China"
          khUnit="ប្រទេសប្រជាជនច្រើនជាងគេទី ៣ បន្ទាប់ពីឥណ្ឌា និងចិន"
          accent={NAVY}
        />
        <StatTile
          Icon={Vote}
          k={k}
          enLabel="Languages spoken"
          khLabel="ភាសានិយាយ"
          value={num(k, "350+")}
          enUnit="English is dominant; Spanish is the largest second language"
          khUnit="អង់គ្លេសជាសំខាន់ បន្ទាប់ភាសាអេស្ប៉ាញ"
          accent={NAVY}
        />
        <StatTile
          Icon={Globe2}
          k={k}
          enLabel="Foreign-born share"
          khLabel="អ្នកកើតក្រៅប្រទេស"
          value={`~${num(k, 14)}%`}
          enUnit="about 1 in 7 residents was born in another country"
          khUnit="ប្រហែល ១ ក្នុង ៧ នាក់កើតនៅប្រទេសផ្សេង"
          accent={NAVY}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-3" data-testid="top-cities">
        {[
          {
            rank: 1, en: "New York City", kh: "ញូវយ៉ក",
            enState: "New York · Northeast", khState: "ញូវយ៉ក · ភាគឦសាន",
            pop: "8.3 M",
            enFact: "Five boroughs; the financial heart of the country (Wall Street).",
            khFact: "ប្លុកប្រាំ ; បេះដូងហិរញ្ញវត្ថុនៃប្រទេស (Wall Street)។",
          },
          {
            rank: 2, en: "Los Angeles", kh: "ឡូស អាន់ជឺឡេស",
            enState: "California · West Coast", khState: "កាលីហ្វ័រនី · ឆ្នេរខាងលិច",
            pop: "3.9 M",
            enFact: "Home of Hollywood and the global film industry.",
            khFact: "ស្រុកកំណើតរបស់ Hollywood និងឧស្សាហកម្មភាពយន្តពិភពលោក។",
          },
          {
            rank: 3, en: "Chicago", kh: "ស៊ីកាហ្គោ",
            enState: "Illinois · Midwest", khState: "អ៊ីលីណយ · ភាគកណ្ដាល",
            pop: "2.7 M",
            enFact: "Built the world's first skyscraper in 1885.",
            khFact: "សាងសង់អគារខ្ពស់បំផុតដំបូងគេក្នុងពិភពលោកក្នុងឆ្នាំ ១៨៨៥។",
          },
        ].map((c) => (
          <div
            key={c.rank}
            className="rounded-2xl border-2 p-4 bg-white"
            style={{ borderColor: `${NAVY}44` }}
            data-testid={`city-${c.rank}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold font-mono"
                style={{ backgroundColor: NAVY }}
              >
                {num(k, c.rank)}
              </div>
              <div
                className="text-[10px] px-2 py-0.5 rounded-full text-white font-mono"
                style={{ backgroundColor: RED }}
              >
                {num(k, c.pop)}
              </div>
            </div>
            <div className={`text-lg font-bold ${k ? "font-khmer" : ""}`} style={{ color: NAVY_DEEP }}>
              {k ? c.kh : c.en}
            </div>
            <div className={`text-[11px] mb-2 ${k ? "font-khmer" : ""}`} style={{ color: RED_DEEP }}>
              {k ? c.khState : c.enState}
            </div>
            <div className={`text-xs ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK_SOFT }}>
              {k ? c.khFact : c.enFact}
            </div>
          </div>
        ))}
      </div>

      <p className={`mt-4 text-xs italic text-center ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
        {t(
          "Note: city figures are populations within the city limit, not the wider metropolitan region.",
          "ចំណាំ ៖ លេខទីក្រុងគឺជាប្រជាជននៅក្នុងព្រំដែនទីក្រុង មិនមែនតំបន់រដ្ឋវិទ្យាធំជុំវិញទេ។"
        )}
      </p>
    </section>
  );
}

// ─── Stylized 50-state grid map ───────────────────────────────────────────
// Coordinates are a simplified tile grid that approximates US state geography.
// This is intentionally schematic — readable on a 3G phone, no heavy SVG.

type StateTile = {
  abbr: string;
  enName: string;
  khName: string;
  region: "NE" | "SE" | "MW" | "SW" | "W" | "NC";
  col: number;
  row: number;
  flag?: "capital" | "biggest";
};

const REGION_COLORS: Record<StateTile["region"], string> = {
  NE: "#1d4ed8", // northeast — blue
  SE: "#b91c1c", // southeast — red
  MW: "#a16207", // midwest  — golden brown
  SW: "#c2410c", // southwest — burnt orange
  W:  "#15803d", // west     — forest green
  NC: "#7c3aed", // non-contiguous (AK, HI) — purple
};

const STATES: StateTile[] = [
  // Row 0 (far north)
  { abbr: "AK", enName: "Alaska",         khName: "អាឡាស្កា",        region: "NC", col: 0,  row: 6 },
  { abbr: "HI", enName: "Hawaii",         khName: "ហាវ៉ៃ",            region: "NC", col: 1,  row: 6 },

  // Row 1 — top tier
  { abbr: "WA", enName: "Washington",     khName: "វ៉ាស៊ីនតោន",      region: "W",  col: 1,  row: 0 },
  { abbr: "ID", enName: "Idaho",          khName: "អៃដាហូ",            region: "W",  col: 2,  row: 0 },
  { abbr: "MT", enName: "Montana",        khName: "ម៉ុនតាណា",          region: "W",  col: 3,  row: 0 },
  { abbr: "ND", enName: "North Dakota",   khName: "ដាកូតាខាងជើង",   region: "MW", col: 4,  row: 0 },
  { abbr: "MN", enName: "Minnesota",      khName: "មីនីសូតា",          region: "MW", col: 5,  row: 0 },
  { abbr: "WI", enName: "Wisconsin",      khName: "វីស្កុនស៊ីន",       region: "MW", col: 6,  row: 0 },
  { abbr: "MI", enName: "Michigan",       khName: "មីឈីហ្គែន",          region: "MW", col: 8,  row: 0 },
  { abbr: "ME", enName: "Maine",          khName: "មេន",                region: "NE", col: 11, row: 0 },

  // Row 2
  { abbr: "OR", enName: "Oregon",         khName: "អូរេហ្គន",          region: "W",  col: 1,  row: 1 },
  { abbr: "NV", enName: "Nevada",         khName: "ណេវ៉ាដា",            region: "W",  col: 2,  row: 1 },
  { abbr: "WY", enName: "Wyoming",        khName: "វ៉ាយអូមីង",          region: "W",  col: 3,  row: 1 },
  { abbr: "SD", enName: "South Dakota",   khName: "ដាកូតាខាងត្បូង",  region: "MW", col: 4,  row: 1 },
  { abbr: "IA", enName: "Iowa",           khName: "អាយអូវ៉ា",          region: "MW", col: 5,  row: 1 },
  { abbr: "IL", enName: "Illinois",       khName: "អ៊ីលីណយ",          region: "MW", col: 6,  row: 1, flag: "biggest" },
  { abbr: "IN", enName: "Indiana",        khName: "អ៊ីនដៀណា",         region: "MW", col: 7,  row: 1 },
  { abbr: "OH", enName: "Ohio",           khName: "អូហៃយ៉ូ",            region: "MW", col: 8,  row: 1 },
  { abbr: "PA", enName: "Pennsylvania",   khName: "ប៉េនស៊ីលវ៉ានី",     region: "NE", col: 9,  row: 1 },
  { abbr: "NY", enName: "New York",       khName: "ញូវយ៉ក",             region: "NE", col: 10, row: 1, flag: "biggest" },
  { abbr: "VT", enName: "Vermont",        khName: "វ៉ឺម៉ុន",            region: "NE", col: 11, row: 1 },
  { abbr: "NH", enName: "New Hampshire",  khName: "ញូវហែមភ័រ",        region: "NE", col: 12, row: 1 },

  // Row 3
  { abbr: "CA", enName: "California",     khName: "កាលីហ្វ័រនី",        region: "W",  col: 1,  row: 2, flag: "biggest" },
  { abbr: "UT", enName: "Utah",           khName: "យូតា",                region: "W",  col: 2,  row: 2 },
  { abbr: "CO", enName: "Colorado",       khName: "កូឡូរ៉ាដូ",          region: "W",  col: 3,  row: 2 },
  { abbr: "NE", enName: "Nebraska",       khName: "ណេប្រាស្កា",          region: "MW", col: 4,  row: 2 },
  { abbr: "MO", enName: "Missouri",       khName: "មីសសួរី",             region: "MW", col: 5,  row: 2 },
  { abbr: "KY", enName: "Kentucky",       khName: "កេនធុកគី",            region: "SE", col: 7,  row: 2 },
  { abbr: "WV", enName: "West Virginia",  khName: "វ៉ាជីនៀខាងលិច",    region: "SE", col: 8,  row: 2 },
  { abbr: "VA", enName: "Virginia",       khName: "វ៉ាជីនៀ",             region: "SE", col: 9,  row: 2 },
  { abbr: "MD", enName: "Maryland",       khName: "មែរីលែន",             region: "NE", col: 10, row: 2 },
  { abbr: "NJ", enName: "New Jersey",     khName: "ញូវជឺស៊ី",            region: "NE", col: 11, row: 2 },
  { abbr: "MA", enName: "Massachusetts",  khName: "ម៉ាសាឈូសេត",          region: "NE", col: 12, row: 2 },
  { abbr: "RI", enName: "Rhode Island",   khName: "រ៉ូដ អៃឡែន",          region: "NE", col: 13, row: 2 },
  { abbr: "CT", enName: "Connecticut",    khName: "កូនិកធីខាត់",         region: "NE", col: 14, row: 2 },

  // Row 4
  { abbr: "AZ", enName: "Arizona",        khName: "អារីហ្សូណា",          region: "SW", col: 2,  row: 3 },
  { abbr: "NM", enName: "New Mexico",     khName: "ញូវម៉ិកស៊ិក",         region: "SW", col: 3,  row: 3 },
  { abbr: "KS", enName: "Kansas",         khName: "កាន់សាស់",            region: "MW", col: 4,  row: 3 },
  { abbr: "AR", enName: "Arkansas",       khName: "អាខានសាស់",            region: "SE", col: 5,  row: 3 },
  { abbr: "TN", enName: "Tennessee",      khName: "ថែនណេស៊ី",             region: "SE", col: 6,  row: 3 },
  { abbr: "NC", enName: "North Carolina", khName: "ខារ៉ូឡាញខាងជើង",    region: "SE", col: 9,  row: 3 },
  { abbr: "DC", enName: "Washington D.C.",khName: "វ៉ាស៊ីនតោន ឌី.ស៊ី.", region: "NE", col: 10, row: 3, flag: "capital" },
  { abbr: "DE", enName: "Delaware",       khName: "ដេឡាវ៉ែ",              region: "NE", col: 11, row: 3 },

  // Row 5
  { abbr: "OK", enName: "Oklahoma",       khName: "ខូក្លាហូម៉ា",          region: "SW", col: 4,  row: 4 },
  { abbr: "LA", enName: "Louisiana",      khName: "លូស៊ីយ៉ាណា",          region: "SE", col: 5,  row: 4 },
  { abbr: "MS", enName: "Mississippi",    khName: "មីស៊ីស៊ីពី",           region: "SE", col: 6,  row: 4 },
  { abbr: "AL", enName: "Alabama",        khName: "អាឡាបាម៉ា",            region: "SE", col: 7,  row: 4 },
  { abbr: "GA", enName: "Georgia",        khName: "ហ្ស៊ហ្ស៊ៀ",            region: "SE", col: 8,  row: 4 },
  { abbr: "SC", enName: "South Carolina", khName: "ខារ៉ូឡាញខាងត្បូង",  region: "SE", col: 9,  row: 4 },

  // Row 6
  { abbr: "TX", enName: "Texas",          khName: "តិកសាស់",              region: "SW", col: 4,  row: 5 },
  { abbr: "FL", enName: "Florida",        khName: "ហ្វ្លរីដា",            region: "SE", col: 9,  row: 5 },
];

function StatesMap({ k }: { k: boolean }) {
  const [hover, setHover] = useState<StateTile | null>(null);

  const W = 720;
  const H = 380;
  const COLS = 16;
  const ROWS = 7;
  const pad = 16;
  const cellW = (W - pad * 2) / COLS;
  const cellH = (H - pad * 2) / ROWS;

  return (
    <div
      className="rounded-2xl border-2 p-3 sm:p-4 bg-white"
      style={{ borderColor: `${NAVY}33` }}
      data-testid="states-map"
    >
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <div className={`text-xs font-bold ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: NAVY }}>
          {k ? "៥០ រដ្ឋ + D.C." : "50 STATES + D.C."}
        </div>
        <div className="flex items-center gap-2 flex-wrap text-[10px]">
          {[
            { region: "W"  as const, en: "West",       kh: "ខាងលិច" },
            { region: "MW" as const, en: "Midwest",    kh: "កណ្ដាល" },
            { region: "SW" as const, en: "Southwest",  kh: "និរតី" },
            { region: "SE" as const, en: "Southeast",  kh: "អាគ្នេយ៍" },
            { region: "NE" as const, en: "Northeast",  kh: "ឦសាន" },
            { region: "NC" as const, en: "Non-contig.", kh: "ដាច់ដោយឡែក" },
          ].map((r) => (
            <span key={r.region} className={`inline-flex items-center gap-1 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}>
              <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: REGION_COLORS[r.region] }} />
              <span style={{ color: INK_SOFT }}>{k ? r.kh : r.en}</span>
            </span>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Stylized US map">
        {/* Background ocean */}
        <rect width={W} height={H} fill={NAVY_SOFT} opacity="0.35" />

        {/* Country label */}
        <text x={W - pad} y={pad + 6} fontSize="10" textAnchor="end" fill={INK_SOFT} fontFamily="monospace">
          {k ? "សហរដ្ឋអាមេរិក" : "UNITED STATES"}
        </text>

        {/* AK / HI tray label */}
        <text x={pad + cellW * 1.3} y={pad + cellH * 6 - 4} fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ដាច់ដោយឡែក" : "NON-CONTIGUOUS"}
        </text>

        {STATES.map((s) => {
          const x = pad + s.col * cellW;
          const y = pad + s.row * cellH;
          const isCap = s.flag === "capital";
          const fill = isCap ? RED : REGION_COLORS[s.region];
          return (
            <g
              key={s.abbr}
              transform={`translate(${x},${y})`}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            >
              <rect
                width={cellW - 4}
                height={cellH - 4}
                rx="4"
                fill={fill}
                stroke="#ffffff"
                strokeWidth="1.5"
                opacity={hover && hover.abbr !== s.abbr ? 0.55 : 0.95}
              />
              <text
                x={(cellW - 4) / 2}
                y={(cellH - 4) / 2 + 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#ffffff"
                fontFamily="monospace"
                pointerEvents="none"
              >
                {s.abbr}
              </text>
              {s.flag === "biggest" ? (
                <Star5 cx={cellW - 10} cy={6} size={4} fill="#ffffff" />
              ) : null}
              {isCap ? (
                <Star5 cx={cellW - 10} cy={6} size={4} fill="#ffffff" />
              ) : null}
            </g>
          );
        })}
      </svg>

      <div
        className="mt-2 min-h-[44px] rounded-lg px-3 py-2 flex items-center justify-between gap-2 text-xs"
        style={{ backgroundColor: PARCHMENT, color: INK }}
        data-testid="hover-readout"
      >
        {hover ? (
          <>
            <span className={k ? "font-khmer" : ""}>
              <strong style={{ color: NAVY_DEEP }}>{hover.abbr}</strong>
              {" · "}
              <strong>{k ? hover.khName : hover.enName}</strong>
            </span>
            <span className={`text-[11px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: REGION_COLORS[hover.region] }}>
              {hover.region}
            </span>
          </>
        ) : (
          <span className={`italic ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
            {k ? "ដាក់សន្លឹកលើរដ្ឋណាមួយដើម្បីមើលឈ្មោះ" : "Hover any tile to see the state name"}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Great Lakes mini-viz ─────────────────────────────────────────────────

function GreatLakesViz({ k }: { k: boolean }) {
  return (
    <div
      className="rounded-2xl p-3 border"
      style={{ borderColor: `${NAVY}33`, backgroundColor: PARCHMENT }}
      data-testid="great-lakes-viz"
    >
      <svg viewBox="0 0 320 130" className="w-full h-32" aria-hidden="true">
        {/* Canada label */}
        <line x1="0" y1="20" x2="320" y2="20" stroke={INK_SOFT} strokeDasharray="3 3" />
        <text x="6" y="14" fontSize="8" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "កាណាដា" : "CANADA"}
        </text>
        <text x="6" y="128" fontSize="8" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "សហរដ្ឋអាមេរិក" : "USA"}
        </text>

        {/* The five lakes — schematic */}
        <ellipse cx="60"  cy="50" rx="40" ry="18" fill={NAVY} opacity="0.85" />
        <text x="60" y="53" fontSize="9" fill="#fff" textAnchor="middle" fontFamily="monospace">SUPERIOR</text>

        <ellipse cx="120" cy="80" rx="14" ry="28" fill={NAVY} opacity="0.85" />
        <text x="120" y="80" fontSize="7" fill="#fff" textAnchor="middle" fontFamily="monospace">MICH.</text>

        <ellipse cx="155" cy="65" rx="22" ry="14" fill={NAVY} opacity="0.85" />
        <text x="155" y="68" fontSize="8" fill="#fff" textAnchor="middle" fontFamily="monospace">HURON</text>

        <ellipse cx="210" cy="78" rx="26" ry="9"  fill={NAVY} opacity="0.85" />
        <text x="210" y="81" fontSize="8" fill="#fff" textAnchor="middle" fontFamily="monospace">ERIE</text>

        <ellipse cx="262" cy="62" rx="28" ry="9"  fill={NAVY} opacity="0.85" />
        <text x="262" y="65" fontSize="8" fill="#fff" textAnchor="middle" fontFamily="monospace">ONTARIO</text>

        {/* Saint Lawrence outflow */}
        <path d="M285,60 q12,-8 28,-4" stroke={NAVY} strokeWidth="2" fill="none" />
        <text x="290" y="48" fontSize="7" fill={NAVY} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ទន្លេ St. Lawrence →" : "→ St. Lawrence"}
        </text>
      </svg>
      <div className={`mt-1 text-[11px] text-center ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
        {k
          ? "ស្រះធំ ៥ ផ្ទុកទឹកសាបនៅផ្ទៃផែនដី ~២១%។"
          : "Five Great Lakes hold ~21% of Earth's surface fresh water."}
      </div>
    </div>
  );
}

// ─── Washington D.C. mini-viz ─────────────────────────────────────────────

function DCViz({ k }: { k: boolean }) {
  return (
    <div
      className="rounded-2xl p-3 border"
      style={{ borderColor: `${RED}44`, backgroundColor: PARCHMENT }}
      data-testid="dc-viz"
    >
      <svg viewBox="0 0 320 130" className="w-full h-32" aria-hidden="true">
        {/* National Mall */}
        <rect x="20" y="60" width="280" height="14" fill="#86efac" />
        <text x="22" y="58" fontSize="8" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ផ្លូវជាតិ National Mall" : "THE NATIONAL MALL"}
        </text>

        {/* White House (left) */}
        <g transform="translate(46,40)">
          <rect x="-18" y="0" width="36" height="22" fill="#ffffff" stroke={INK} strokeWidth="1" />
          <polygon points="-22,0 0,-10 22,0" fill="#ffffff" stroke={INK} strokeWidth="1" />
          <rect x="-3" y="10" width="6" height="12" fill={NAVY} />
          <text x="0" y="36" fontSize="8" fill={NAVY} textAnchor="middle" fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "សេតវិមាន" : "WHITE HOUSE"}
          </text>
        </g>

        {/* Washington Monument (centre obelisk) */}
        <g transform="translate(160,30)">
          <polygon points="-4,32 4,32 4,-2 0,-12 -4,-2" fill="#cbd5e1" stroke={INK} strokeWidth="1" />
          <text x="0" y="46" fontSize="8" fill={NAVY} textAnchor="middle" fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "សសរ Washington" : "MONUMENT"}
          </text>
        </g>

        {/* Capitol (right) */}
        <g transform="translate(270,38)">
          <rect x="-20" y="6" width="40" height="20" fill="#ffffff" stroke={INK} strokeWidth="1" />
          <ellipse cx="0" cy="6" rx="10" ry="10" fill="#ffffff" stroke={INK} strokeWidth="1" />
          <rect x="-1" y="-8" width="2" height="6" fill={INK} />
          <text x="0" y="40" fontSize="8" fill={NAVY} textAnchor="middle" fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "សភា Capitol" : "CAPITOL"}
          </text>
        </g>

        {/* Reflecting pool */}
        <rect x="80" y="78" width="60" height="4" fill={NAVY} opacity="0.6" />

        {/* Three branches strip */}
        <g transform="translate(0,100)">
          <text x="46"  y="14" fontSize="8" fill={RED_DEEP} textAnchor="middle" fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "នាយក" : "EXECUTIVE"}
          </text>
          <text x="160" y="14" fontSize="8" fill={RED_DEEP} textAnchor="middle" fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ជាតិ" : "NATIONAL"}
          </text>
          <text x="270" y="14" fontSize="8" fill={RED_DEEP} textAnchor="middle" fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "នីតិបញ្ញត្តិ" : "LEGISLATIVE"}
          </text>
        </g>
      </svg>
      <div className={`mt-1 text-[11px] text-center ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
        {k
          ? "ទីក្រុងរបស់រដ្ឋាភិបាល មិនមែនរបស់រដ្ឋណាមួយឡើយ។"
          : "A city of the government — owned by no single state."}
      </div>
    </div>
  );
}

// ─── Generic feature card ─────────────────────────────────────────────────

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
      className="rounded-3xl p-5 sm:p-6 border-2 bg-white flex flex-col"
      style={{
        borderColor: `${accent}55`,
        boxShadow: `0 1px 0 ${accent}11, 0 12px 28px -22px ${accent}55`,
      }}
      data-testid={`feature-${enTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${accent}1f`, border: `1px solid ${accent}55` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-lg sm:text-xl ${k ? "font-khmer" : ""}`} style={{ color: NAVY_DEEP }}>
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
//  TAB 02 · The Founding Story
// ════════════════════════════════════════════════════════════════════════════

function FoundingTab({ k, t }: { k: boolean; t: T }) {
  return (
    <section data-testid="tab-founding">
      <SectionHeader spec="02" en="The Founding Story" kh="ប្រវត្តិទូទៅ" k={k} Icon={Scroll} accent={NAVY} />

      {/* Timeline ribbon */}
      <div
        className="rounded-2xl border-2 p-3 sm:p-4 mb-6 bg-white overflow-x-auto"
        style={{ borderColor: `${NAVY}33` }}
        data-testid="founding-timeline"
      >
        <div className="flex items-center gap-3 min-w-[640px]">
          {[
            { year: "1607", en: "Jamestown",       kh: "Jamestown",       color: NAVY },
            { year: "1620", en: "Mayflower",       kh: "Mayflower",       color: NAVY },
            { year: "1776", en: "Independence",    kh: "ឯករាជ្យ",         color: RED },
            { year: "1781", en: "War won",         kh: "ឈ្នះសង្គ្រាម",   color: RED },
            { year: "1787", en: "Constitution",    kh: "រដ្ឋធម្មនុញ្ញ",  color: GOLD },
            { year: "1791", en: "Bill of Rights",  kh: "សិទ្ធិមូលដ្ឋាន",  color: GOLD },
          ].map((m, i, arr) => (
            <div key={m.year} className="flex items-center gap-3 flex-shrink-0">
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-mono text-xs font-bold mx-auto"
                  style={{ backgroundColor: m.color }}
                >
                  {num(k, m.year)}
                </div>
                <div className={`mt-1 text-[10px] font-bold ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: m.color }}>
                  {k ? m.kh : m.en}
                </div>
              </div>
              {i < arr.length - 1 ? (
                <div className="w-10 border-t-2 border-dashed" style={{ borderColor: RULE }} />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <FeatureCard
          k={k}
          Icon={Ship}
          enTitle="Jamestown · 1607"
          khTitle="Jamestown · ១៦០៧"
          enTag="the first permanent English settlement"
          khTag="ការតាំងលំនៅអង់គ្លេសអចិន្ត្រៃយ៍ដំបូង"
          accent={NAVY}
          enBody="In May 1607, three small English ships dropped anchor on a marshy peninsula in what is now the state of Virginia. Roughly 100 men climbed off the boats and built a wooden fort they named Jamestown, in honour of King James I of England. The first winter was brutal: disease, hunger, and conflict with the Powhatan people killed two-thirds of the settlers. The colony survived only because of tobacco — a crop they learned to grow and sell back to Europe at huge profit. Jamestown was not the first European outpost in the Americas (the Spanish had been in Florida since 1565), but it was the first English settlement that did not vanish, and so it is usually called the seed from which the future United States grew."
          khBody="នៅខែឧសភា ឆ្នាំ ១៦០៧ កប៉ាល់អង់គ្លេសតូចបីបានចូលចត់នៅឧបទ្វីបជ្រៀតមួយ ក្នុងអ្វីដែលឥឡូវនេះជារដ្ឋ Virginia។ បុរសប្រហែល ១០០ នាក់បានចុះពីកប៉ាល់ និងសាងសង់បន្ទាយឈើដែលពួកគេឲ្យឈ្មោះថា Jamestown ដើម្បីគោរពស្ដេច James I នៃប្រទេសអង់គ្លេស។ រដូវរងាដំបូងគឺឃោរឃៅ ៖ ជំងឺ ភាពអត់ឃ្លាន និងជម្លោះជាមួយជនជាតិ Powhatan បានសម្លាប់ពីរភាគបីនៃអ្នកតាំងលំនៅ។ ស្ថាបនកម្មនេះរស់រានបានគ្រាន់តែអាស្រ័យលើថ្នាំជក់ — ដំណាំដែលពួកគេបានរៀនដាំ និងលក់ត្រលប់ទៅអឺរ៉ុបបានចំណេញច្រើនយ៉ាងធំ។ Jamestown មិនមែនជាមូលដ្ឋានអឺរ៉ុបដំបូងនៅទ្វីបអាមេរិកទេ (អេស្ប៉ាញនៅក្នុង Florida តាំងពីឆ្នាំ ១៥៦៥) ប៉ុន្តែវាគឺជាការតាំងលំនៅអង់គ្លេសដំបូងដែលមិនបានបាត់ ដូច្នេះវាជាធម្មតាត្រូវបានហៅថាគ្រាប់ពូជដែលសហរដ្ឋអាមេរិកអនាគតបានរីកចេញ។"
        />

        <FeatureCard
          k={k}
          Icon={Sword}
          enTitle="The Revolutionary War · 1775–1783"
          khTitle="សង្គ្រាមបដិវត្តន៍ · ១៧៧៥–១៧៨៣"
          enTag="13 colonies vs. the British king"
          khTag="អាណានិគម ១៣ ទល់នឹងស្ដេចអង់គ្លេស"
          accent={RED}
          enBody="By the 1770s, thirteen English colonies had been growing along the Atlantic coast for over 150 years. They were ruled from London by King George III, three thousand kilometres of ocean away. The colonists were taxed without being allowed to sit in Parliament, and they finally refused. On 4 July 1776, fifty-six colonial leaders signed the Declaration of Independence, a single sheet of parchment that declared the colonies a free nation, the United States of America. War had already begun in 1775. It lasted eight years. With the help of France, the new American army — led by a Virginia farmer named George Washington — defeated the British in 1781. The new country had no king. It was the first major nation in the modern world to make that choice on purpose."
          khBody="នៅទសវត្ស ១៧៧០ អាណានិគមអង់គ្លេសដប់បីបានរីកធំតាមឆ្នេរអាត្លង់ទិចជាង ១៥០ ឆ្នាំ។ ពួកវាត្រូវបានគ្រប់គ្រងពី London ដោយស្ដេច George III ឆ្ងាយបីពាន់គីឡូម៉ែត្រឆ្លងសមុទ្រ។ អ្នកអាណានិគមត្រូវបានបង់ពន្ធដោយមិនត្រូវបានអនុញ្ញាតឲ្យអង្គុយក្នុងសភា ហើយចុងក្រោយពួកគេបដិសេធ។ នៅថ្ងៃទី ៤ ខែកក្កដា ឆ្នាំ ១៧៧៦ អ្នកដឹកនាំអាណានិគម ៥៦ នាក់បានចុះហត្ថលេខាលើប្រកាសឯករាជ្យ ដែលជាសន្លឹកក្រដាសមួយប្រកាសថា អាណានិគមជាប្រទេសសេរី គឺសហរដ្ឋអាមេរិក។ សង្គ្រាមបានចាប់ផ្ដើមរួចហើយក្នុងឆ្នាំ ១៧៧៥។ វាមានរយៈពេល ៨ ឆ្នាំ។ ដោយមានជំនួយពីបារាំង កងទ័ពអាមេរិកថ្មី — ដឹកនាំដោយកសិករ Virginia ឈ្មោះ George Washington — បានកម្ចាត់អង់គ្លេសក្នុងឆ្នាំ ១៧៨១។ ប្រទេសថ្មីគ្មានស្ដេចទេ។ វាគឺជាប្រទេសធំដំបូងក្នុងពិភពលោកទំនើប ដែលបានធ្វើជម្រើសនោះដោយចេតនា។"
        />
      </div>

      {/* The Blueprint */}
      <div
        className="rounded-3xl border-2 p-5 sm:p-6 bg-white"
        style={{ borderColor: `${GOLD}66` }}
        data-testid="blueprint"
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: GOLD_SOFT, border: `1px solid ${GOLD}66` }}
          >
            <Feather className="w-5 h-5" style={{ color: GOLD }} />
          </div>
          <div>
            <h3 className={`font-bold text-lg sm:text-xl ${k ? "font-khmer" : ""}`} style={{ color: NAVY_DEEP }}>
              {t("The Blueprint", "ផែនការគ្រឹះ")}
            </h3>
            <div className={`text-[11px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: GOLD }}>
              {t("Constitution · Bill of Rights", "រដ្ឋធម្មនុញ្ញ · សិទ្ធិមូលដ្ឋាន")}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className={`text-sm font-bold mb-1 ${k ? "font-khmer" : ""}`} style={{ color: NAVY }}>
              {t("The Constitution · 1787", "រដ្ឋធម្មនុញ្ញ · ១៧៨៧")}
            </div>
            <P
              k={k}
              en="After winning independence, the new country had to invent a way to govern itself without a king. Fifty-five delegates met in Philadelphia in 1787 and wrote the Constitution — a short rulebook of just 4,400 words. It splits power into three pieces: a Congress that writes laws, a President who carries them out, and a Supreme Court that judges them. No branch can act alone. The document is still in force today, more than 235 years later — making it the oldest written national constitution that is still being used."
              kh="បន្ទាប់ពីទទួលឯករាជ្យ ប្រទេសថ្មីត្រូវបង្កើតវិធីដើម្បីគ្រប់គ្រងខ្លួនឯងដោយគ្មានស្ដេច។ តំណាង ៥៥ នាក់បានជួបគ្នានៅ Philadelphia ក្នុងឆ្នាំ ១៧៨៧ និងសរសេររដ្ឋធម្មនុញ្ញ — សៀវភៅច្បាប់ខ្លីត្រឹមតែ ៤,៤០០ ពាក្យ។ វាបែងចែកអំណាចជាបីផ្នែក ៖ សភាសរសេរច្បាប់ ប្រធានាធិបតីប្រតិបត្តិច្បាប់ និងតុលាការកំពូលវិនិច្ឆ័យច្បាប់។ គ្មានសាខាណាមួយអាចធ្វើសកម្មភាពតែឯងបានទេ។ ឯកសារនេះនៅតែមានអនុភាពសព្វថ្ងៃនេះ បន្ទាប់ពីជាង ២៣៥ ឆ្នាំ — ដែលធ្វើឲ្យវាជារដ្ឋធម្មនុញ្ញសរសេរជាតិចាស់ជាងគេដែលនៅប្រើប្រាស់។"
              className="text-sm"
            />
            <ThreeBranches k={k} />
          </div>
          <div>
            <div className={`text-sm font-bold mb-1 ${k ? "font-khmer" : ""}`} style={{ color: NAVY }}>
              {t("The Bill of Rights · 1791", "សិទ្ធិមូលដ្ឋាន · ១៧៩១")}
            </div>
            <P
              k={k}
              en="Many people refused to support the new Constitution unless it was promised that it would also protect ordinary citizens from the new government itself. Four years later, ten short amendments were added — they are called the Bill of Rights. They guarantee, among other things, freedom of speech, freedom of religion, freedom to gather peacefully, freedom of the press, the right to a fair trial by jury, and protection from being searched without good reason. Together they tell the government, in writing, the things it is not allowed to do — even if a majority votes for them."
              kh="មនុស្សជាច្រើនបានបដិសេធគាំទ្ររដ្ឋធម្មនុញ្ញថ្មី លុះត្រាតែវាសន្យាការពារពលរដ្ឋធម្មតាពីរដ្ឋាភិបាលថ្មីខ្លួនឯងផងដែរ។ បួនឆ្នាំក្រោយមក ការកែតម្រូវខ្លីៗដប់ត្រូវបានបន្ថែម — ពួកវាត្រូវបានហៅថា សិទ្ធិមូលដ្ឋាន។ ពួកវាធានា ៖ សេរីភាពនៃការនិយាយ សេរីភាពនៃសាសនា សេរីភាពនៃការប្រមូលផ្ដុំដោយសន្តិភាព សេរីភាពនៃសារព័ត៌មាន សិទ្ធិទទួលការវិនិច្ឆ័យដោយយុត្តិធម៌ និងការការពារពីការស្វែងរកដោយគ្មានហេតុផល។ ពួកវារួមគ្នាប្រាប់រដ្ឋាភិបាលជាលាយលក្ខណ៍អក្សរនូវរបស់ដែលវាមិនត្រូវបានអនុញ្ញាតឲ្យធ្វើ — ទោះបីភាគច្រើនបោះឆ្នោតគាំទ្រក៏ដោយ។"
              className="text-sm"
            />
            <BillOfRights k={k} />
          </div>
        </div>
      </div>

      {/* The Machinery of Law: Checks and Balances */}
      <MachineryOfLaw k={k} t={t} />
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  The Machinery of Law · Checks and Balances
//  យន្តការនៃច្បាប់ · ការត្រួតពិនិត្យ និងតុល្យភាពអំណាច
// ════════════════════════════════════════════════════════════════════════════

function MachineryOfLaw({ k, t }: { k: boolean; t: T }) {
  return (
    <div
      className="rounded-3xl border-2 p-5 sm:p-6"
      style={{
        borderColor: `${NAVY}55`,
        backgroundColor: PARCHMENT,
        backgroundImage:
          "radial-gradient(circle at 100% 0%, rgba(10, 36, 99, 0.06), transparent 35%)," +
          "radial-gradient(circle at 0% 100%, rgba(185, 28, 28, 0.05), transparent 35%)",
      }}
      data-testid="machinery-of-law"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: NAVY_SOFT, border: `1px solid ${NAVY}55` }}
        >
          <Gavel className="w-5 h-5" style={{ color: NAVY_DEEP }} />
        </div>
        <div>
          <h3 className={`font-bold text-lg sm:text-xl ${k ? "font-khmer" : ""}`} style={{ color: NAVY_DEEP }}>
            {t("The Machinery of Law: Checks and Balances", "យន្តការនៃច្បាប់ ៖ ការត្រួតពិនិត្យ និងតុល្យភាពអំណាច")}
          </h3>
          <div className={`text-[11px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: RED }}>
            {t("How an idea becomes a law — and how the people stay in charge", "របៀបដែលគំនិតមួយក្លាយជាច្បាប់ — និងរបៀបដែលប្រជាជននៅជាអ្នកមានអំណាច")}
          </div>
        </div>
      </div>

      {/* Card 1: Three Engines of Power */}
      <ThreeEnginesCard k={k} />

      {/* Card 2: How a Bill Becomes a Law */}
      <BillBecomesLawCard k={k} t={t} />

      {/* Card 3: The Ultimate Override */}
      <UltimateOverrideCard k={k} t={t} />
    </div>
  );
}

// ── Card 1: The Three Engines of Power ──────────────────────────────────────

function ThreeEnginesCard({ k }: { k: boolean }) {
  const engines = [
    {
      id: "legislative",
      Icon: Scroll,
      color: RED,
      colorDeep: RED_DEEP,
      enRole: "Legislative",
      khRole: "នីតិប្បញ្ញត្តិ",
      enWho: "Congress · House + Senate",
      khWho: "សភា · សភាតំណាងរាស្ត្រ + ព្រឹទ្ធសភា",
      enNickname: "The Architects",
      khNickname: "ស្ថាបត្យករ",
      enJob: "They debate, write, and propose the laws. The House and the Senate must both agree on the exact text before it can leave Congress at all.",
      khJob: "ពួកគេពិភាក្សា សរសេរ និងស្នើច្បាប់។ សភាតំណាងរាស្ត្រ និងព្រឹទ្ធសភាត្រូវឯកភាពលើអត្ថបទពិតប្រាកដ មុនពេលវាអាចចេញពីសភាបាន។",
    },
    {
      id: "executive",
      Icon: Crown,
      color: NAVY,
      colorDeep: NAVY_DEEP,
      enRole: "Executive",
      khRole: "នីតិប្រតិបត្តិ",
      enWho: "President",
      khWho: "ប្រធានាធិបតី",
      enNickname: "The Operators",
      khNickname: "អ្នកប្រតិបត្តិ",
      enJob: "They sign the laws into action, enforce them, command the military, and run the government agencies that put the laws into effect every day.",
      khJob: "ពួកគេចុះហត្ថលេខាលើច្បាប់ឲ្យចូលជាធរមាន អនុវត្តច្បាប់ បញ្ជាកងទ័ព និងគ្រប់គ្រងទីភ្នាក់ងាររដ្ឋាភិបាល ដែលដាក់ច្បាប់ឲ្យដំណើរការរាល់ថ្ងៃ។",
    },
    {
      id: "judicial",
      Icon: Gavel,
      color: GOLD,
      colorDeep: "#7c5b00",
      enRole: "Judicial",
      khRole: "តុលាការ",
      enWho: "Supreme Court",
      khWho: "តុលាការកំពូល",
      enNickname: "The Referees",
      khNickname: "អាជ្ញាកណ្ដាល",
      enJob: "They measure each new law against the Constitution. If a law breaks the rules of the Blueprint itself, the Court can strike it down — even if Congress and the President both agreed on it.",
      khJob: "ពួកគេវាស់ច្បាប់ថ្មីនីមួយៗធៀបនឹងរដ្ឋធម្មនុញ្ញ។ បើច្បាប់មួយបំពានច្បាប់នៃផែនការគ្រឹះ តុលាការអាចទម្លាក់វាបាន — ទោះបីសភា និងប្រធានាធិបតីបានព្រមលើវាក៏ដោយ។",
    },
  ];

  return (
    <div
      className="rounded-2xl border bg-white p-4 sm:p-5 mb-4"
      style={{ borderColor: `${NAVY}33` }}
      data-testid="mol-card-engines"
    >
      <CardHeader
        k={k}
        chipEn="Card 01 · Three Engines"
        chipKh="កាត ០១ · អំណាចទាំងបី"
        enTitle="The Three Engines of Power"
        khTitle="អំណាចទាំងបី"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {engines.map((e) => (
          <div
            key={e.id}
            className="rounded-xl border-2 p-3 sm:p-4 flex flex-col gap-2"
            style={{ borderColor: `${e.color}55`, backgroundColor: "#ffffff" }}
            data-testid={`engine-${e.id}`}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${e.color}18`, border: `1px solid ${e.color}55` }}
              >
                <e.Icon className="w-4 h-4" style={{ color: e.colorDeep }} />
              </div>
              <div className="min-w-0">
                <div
                  className={`text-[10px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`}
                  style={{ color: e.colorDeep }}
                >
                  {k ? e.khRole : e.enRole}
                </div>
                <div className={`text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color: NAVY_DEEP }}>
                  {k ? e.khNickname : e.enNickname}
                </div>
              </div>
            </div>
            <div className={`text-[11px] ${k ? "font-khmer leading-loose" : "font-mono"}`} style={{ color: e.color }}>
              {k ? e.khWho : e.enWho}
            </div>
            <p className={`text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK_SOFT }}>
              {k ? e.khJob : e.enJob}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Card 2: How a Bill Becomes a Law ────────────────────────────────────────

function BillBecomesLawCard({ k, t }: { k: boolean; t: T }) {
  return (
    <div
      className="rounded-2xl border bg-white p-4 sm:p-5 mb-4"
      style={{ borderColor: `${NAVY}33` }}
      data-testid="mol-card-bill"
    >
      <CardHeader
        k={k}
        chipEn="Card 02 · The Process"
        chipKh="កាត ០២ · ដំណើរការ"
        enTitle="How a Bill Becomes a Law"
        khTitle="ដំណើរការអនុម័តច្បាប់"
      />

      <p className={`text-sm mb-4 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK_SOFT }}>
        {t(
          "Every law in the country starts as just an idea on a piece of paper — called a 'Bill'. To survive, it has to pass through three doors.",
          "ច្បាប់នីមួយៗក្នុងប្រទេសចាប់ផ្ដើមពីគ្រាន់តែជាគំនិតមួយលើក្រដាស — ហៅថា «សេចក្ដីព្រាងច្បាប់» (Bill)។ ដើម្បីរស់រាន វាត្រូវឆ្លងកាត់ទ្វារបី។"
        )}
      </p>

      {/* Flow chart */}
      <div className="space-y-2" data-testid="bill-flow">
        {/* Step 1 */}
        <FlowStep
          n={1}
          color={RED}
          Icon={Scroll}
          enLabel="The Proposal"
          khLabel="ការស្នើ"
          enText="A member of Congress writes the idea down as a Bill and introduces it."
          khText="សមាជិកសភាម្នាក់សរសេរគំនិតនោះជាសេចក្ដីព្រាងច្បាប់ និងដាក់បង្ហាញ។"
          k={k}
          testId="bill-step-1"
        />
        <FlowArrow />
        {/* Step 2 */}
        <FlowStep
          n={2}
          color={RED}
          Icon={Vote}
          enLabel="Both Chambers"
          khLabel="សភាទាំងពីរ"
          enText="The Bill must pass BOTH the House and the Senate, with a simple majority — over 50% — in each chamber."
          khText="សេចក្ដីព្រាងច្បាប់ត្រូវឆ្លងកាត់ ទាំងសភាតំណាងរាស្ត្រ និងព្រឹទ្ធសភា ជាមួយសំឡេងភាគច្រើន — លើសពី ៥០ ភាគរយ — នៅក្នុងសភានីមួយៗ។"
          k={k}
          testId="bill-step-2"
          chip={k ? "≥ ៥០%" : "≥ 50%"}
        />
        <FlowArrow />
        {/* Step 3 — President’s desk */}
        <div
          className="rounded-xl border-2 p-3 sm:p-4"
          style={{ borderColor: `${NAVY}55`, backgroundColor: "#f8f9ff" }}
          data-testid="bill-step-3"
        >
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${k ? "font-khmer" : "font-mono"}`}
              style={{ backgroundColor: NAVY_DEEP }}
            >
              {k ? toKhNum(3) : "3"}
            </div>
            <Crown className="w-4 h-4" style={{ color: NAVY }} />
            <div className={`text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color: NAVY_DEEP }}>
              {t("The President's Desk", "តុរបស់ប្រធានាធិបតី")}
            </div>
          </div>
          <p className={`text-sm mb-3 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK_SOFT }}>
            {t(
              "If the Bill passes Congress, it travels to the White House. The President has exactly two choices:",
              "បើសេចក្ដីព្រាងច្បាប់ឆ្លងកាត់សភា វាធ្វើដំណើរទៅសេតវិមាន។ ប្រធានាធិបតីមានជម្រើសពិតប្រាកដពីរ ៖"
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Sign */}
            <div
              className="rounded-lg border-2 p-3"
              style={{ borderColor: `${NAVY}55`, backgroundColor: NAVY_SOFT }}
              data-testid="bill-choice-sign"
            >
              <div className="flex items-center gap-2 mb-1">
                <Signature className="w-4 h-4" style={{ color: NAVY_DEEP }} />
                <div
                  className={`text-[11px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`}
                  style={{ color: NAVY_DEEP }}
                >
                  {t("Sign it", "ចុះហត្ថលេខា")}
                </div>
                <CheckCircle2 className="w-3.5 h-3.5 ml-auto" style={{ color: NAVY }} />
              </div>
              <p className={`text-[13px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK }}>
                {t(
                  "It immediately becomes a permanent Law of the United States.",
                  "វាក្លាយទៅជាច្បាប់អចិន្ត្រៃយ៍នៃសហរដ្ឋអាមេរិកភ្លាមៗ។"
                )}
              </p>
            </div>
            {/* Veto */}
            <div
              className="rounded-lg border-2 p-3"
              style={{ borderColor: `${RED}66`, backgroundColor: "#fef2f2" }}
              data-testid="bill-choice-veto"
            >
              <div className="flex items-center gap-2 mb-1">
                <Ban className="w-4 h-4" style={{ color: RED_DEEP }} />
                <div
                  className={`text-[11px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`}
                  style={{ color: RED_DEEP }}
                >
                  {t("Veto it", "វេតូ · បដិសេធ")}
                </div>
                <span
                  className="ml-auto inline-block rounded-sm border-2 px-1.5 py-0.5 font-mono text-[10px] font-extrabold rotate-[-6deg]"
                  style={{ borderColor: RED_DEEP, color: RED_DEEP, backgroundColor: "#ffffff" }}
                  aria-hidden="true"
                >
                  NO
                </span>
              </div>
              <p className={`text-[13px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK }}>
                {t(
                  "The President stamps 'NO' on the Bill and sends it back to Congress.",
                  "ប្រធានាធិបតីបោះត្រា «NO» លើសេចក្ដីព្រាងច្បាប់ ហើយផ្ញើវាត្រឡប់ទៅសភាវិញ។"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowStep({
  n, color, Icon, enLabel, khLabel, enText, khText, k, testId, chip,
}: {
  n: number;
  color: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enLabel: string; khLabel: string;
  enText: string; khText: string;
  k: boolean;
  testId: string;
  chip?: string;
}) {
  return (
    <div
      className="rounded-xl border-2 p-3 flex items-start gap-3"
      style={{ borderColor: `${color}55`, backgroundColor: "#ffffff" }}
      data-testid={testId}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-white font-mono text-xs font-bold flex-shrink-0"
        style={{ backgroundColor: color }}
      >
        {k ? toKhNum(n) : String(n)}
      </div>
      <Icon className="w-4 h-4 mt-1 flex-shrink-0" style={{ color }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <div className={`text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color: NAVY_DEEP }}>
            {k ? khLabel : enLabel}
          </div>
          {chip && (
            <span
              className="font-mono text-[11px] font-bold rounded px-1.5 py-0.5 border"
              style={{ color, borderColor: `${color}66`, backgroundColor: "#fff7ed" }}
            >
              {chip}
            </span>
          )}
        </div>
        <p className={`text-[13px] mt-1 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK_SOFT }}>
          {k ? khText : enText}
        </p>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <ChevronDown className="w-5 h-5" style={{ color: `${NAVY}66` }} />
    </div>
  );
}

// ── Card 3: The Ultimate Override ──────────────────────────────────────────

function UltimateOverrideCard({ k, t }: { k: boolean; t: T }) {
  return (
    <div
      className="rounded-2xl border-2 p-4 sm:p-5"
      style={{
        borderColor: `${RED}66`,
        backgroundImage:
          `linear-gradient(135deg, ${PARCHMENT} 0%, #ffffff 60%, ${NAVY_SOFT} 100%)`,
      }}
      data-testid="mol-card-override"
    >
      <CardHeader
        k={k}
        chipEn="Card 03 · The Override"
        chipKh="កាត ០៣ · ការទម្លាក់សិទ្ធិ"
        enTitle="The Ultimate Override"
        khTitle="ការទម្លាក់សិទ្ធិវេតូ"
      />

      <p className={`text-sm mb-3 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK }}>
        {t(
          "A Veto is not the end of the story. The Constitution gives Congress one final chance to answer back. If they can gather a massive two-thirds supermajority — in BOTH the House and the Senate — they can override the President. The Bill becomes a Law anyway.",
          "ការវេតូមិនមែនជាចុងបញ្ចប់នៃរឿងនោះទេ។ រដ្ឋធម្មនុញ្ញផ្ដល់ឲ្យសភានូវឱកាសចុងក្រោយមួយ ដើម្បីឆ្លើយតបវិញ។ បើពួកគេអាចប្រមូលសម្លេងភាគច្រើនពិសេសពីរភាគបី — ទាំងនៅសភាតំណាងរាស្ត្រ និងព្រឹទ្ធសភា — ពួកគេអាចទម្លាក់សិទ្ធិវេតូរបស់ប្រធានាធិបតីបាន។ សេចក្ដីព្រាងច្បាប់ក្លាយជាច្បាប់ដដែល។"
        )}
      </p>

      {/* Mini override flow */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-stretch mb-4" data-testid="override-flow">
        <div
          className="rounded-lg border-2 p-3 text-center"
          style={{ borderColor: `${RED}66`, backgroundColor: "#fef2f2" }}
        >
          <Ban className="w-5 h-5 mx-auto mb-1" style={{ color: RED_DEEP }} />
          <div className={`text-xs font-bold ${k ? "font-khmer" : ""}`} style={{ color: RED_DEEP }}>
            {t("President vetoes", "ប្រធានាធិបតីវេតូ")}
          </div>
        </div>
        <div
          className="rounded-lg border-2 p-3 text-center"
          style={{ borderColor: `${NAVY}66`, backgroundColor: NAVY_SOFT }}
        >
          <RefreshCw className="w-5 h-5 mx-auto mb-1" style={{ color: NAVY_DEEP }} />
          <div className={`text-xs font-bold ${k ? "font-khmer" : ""}`} style={{ color: NAVY_DEEP }}>
            {t("Congress re-votes", "សភាបោះឆ្នោតឡើងវិញ")}
          </div>
          <div
            className={`mt-1 inline-block text-[11px] font-extrabold rounded px-1.5 py-0.5 border ${k ? "font-khmer" : "font-mono"}`}
            style={{ color: RED_DEEP, borderColor: `${RED_DEEP}66`, backgroundColor: "#ffffff" }}
            data-testid="supermajority-chip"
          >
            {k ? "២⁄៣ នៃសំឡេង" : "2⁄3 majority"}
          </div>
        </div>
        <div
          className="rounded-lg border-2 p-3 text-center"
          style={{ borderColor: `${GOLD}66`, backgroundColor: GOLD_SOFT }}
        >
          <CheckCircle2 className="w-5 h-5 mx-auto mb-1" style={{ color: "#7c5b00" }} />
          <div className={`text-xs font-bold ${k ? "font-khmer" : ""}`} style={{ color: "#7c5b00" }}>
            {t("Bill becomes Law", "សេចក្ដីព្រាងក្លាយជាច្បាប់")}
          </div>
        </div>
      </div>

      <div
        className="rounded-lg border-l-4 p-3 flex items-start gap-2"
        style={{ borderLeftColor: NAVY_DEEP, backgroundColor: "#ffffff" }}
      >
        <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: NAVY }} />
        <p className={`text-sm italic ${k ? "font-khmer not-italic leading-loose" : "leading-relaxed"}`} style={{ color: NAVY_DEEP }}>
          {t(
            "This is the heart of the system. It proves, in writing, that the shared power of the people — speaking through their elected Congress — outranks the single power of one President.",
            "នេះគឺជាបេះដូងនៃប្រព័ន្ធ។ វាបង្ហាញយ៉ាងជាក់លាក់ថា អំណាចរួមរបស់ប្រជាជន — និយាយតាមរយៈសភាដែលត្រូវបានបោះឆ្នោតរបស់ពួកគេ — មានឋានៈខ្ពស់ជាងអំណាចរបស់ប្រធានាធិបតីតែម្នាក់។"
          )}
        </p>
      </div>
    </div>
  );
}

function CardHeader({
  k, chipEn, chipKh, enTitle, khTitle,
}: {
  k: boolean;
  chipEn: string; chipKh: string;
  enTitle: string; khTitle: string;
}) {
  return (
    <div className="mb-3">
      <div
        className={`inline-block text-[10px] font-mono uppercase tracking-[0.25em] rounded px-1.5 py-0.5 border mb-1 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
        style={{ color: NAVY_DEEP, borderColor: `${NAVY}55`, backgroundColor: NAVY_SOFT }}
      >
        {k ? chipKh : chipEn}
      </div>
      <h4 className={`text-base sm:text-lg font-bold ${k ? "font-khmer" : ""}`} style={{ color: NAVY_DEEP }}>
        {k ? khTitle : enTitle}
      </h4>
    </div>
  );
}

function ThreeBranches({ k }: { k: boolean }) {
  const branches = [
    { Icon: Crown,    en: "Executive",   kh: "នាយក",       enWho: "President",      khWho: "ប្រធានាធិបតី", color: NAVY },
    { Icon: Vote,     en: "Legislative", kh: "នីតិបញ្ញត្តិ", enWho: "Congress",       khWho: "សភា",         color: RED },
    { Icon: Scale,    en: "Judicial",    kh: "តុលាការ",     enWho: "Supreme Court",  khWho: "តុលាការកំពូល", color: GOLD },
  ];
  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      {branches.map((b) => {
        const Icon = b.Icon;
        return (
          <div
            key={b.en}
            className="rounded-xl p-2 text-center border"
            style={{ borderColor: `${b.color}55`, backgroundColor: "#ffffff" }}
          >
            <Icon className="w-4 h-4 mx-auto mb-1" style={{ color: b.color }} />
            <div className={`text-[11px] font-bold ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: b.color }}>
              {k ? b.kh : b.en}
            </div>
            <div className={`text-[10px] ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
              {k ? b.khWho : b.enWho}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BillOfRights({ k }: { k: boolean }) {
  const rights = [
    { en: "Free speech",        kh: "សេរីភាពនិយាយ" },
    { en: "Free religion",      kh: "សេរីភាពសាសនា" },
    { en: "Free press",         kh: "សេរីភាពសារព័ត៌មាន" },
    { en: "Peaceful assembly",  kh: "ប្រមូលផ្ដុំដោយសន្តិ" },
    { en: "Fair trial · jury",  kh: "ការវិនិច្ឆ័យត្រឹមត្រូវ" },
    { en: "No unfair search",   kh: "មិនស្វែងរកដោយរំលោភ" },
  ];
  return (
    <div className="mt-3 grid grid-cols-2 gap-1.5" data-testid="bill-of-rights">
      {rights.map((r) => (
        <div
          key={r.en}
          className="rounded-md px-2 py-1.5 text-[11px] border flex items-center gap-1.5"
          style={{ backgroundColor: GOLD_SOFT, borderColor: `${GOLD}66`, color: INK }}
        >
          <Star className="w-3 h-3" style={{ color: GOLD }} />
          <span className={k ? "font-khmer" : ""}>{k ? r.kh : r.en}</span>
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  TAB 03 · Cultural Holidays
// ════════════════════════════════════════════════════════════════════════════

function HolidaysTab({ k, t: _t }: { k: boolean; t: T }) {
  const holidays = [
    {
      key: "july4",
      Icon: Sparkles,
      enName: "Independence Day · July 4",
      khName: "ទិវាឯករាជ្យ · ៤ កក្កដា",
      enWhen: "Summer · every 4 July",
      khWhen: "រដូវក្ដៅ · រាល់ថ្ងៃទី ៤ កក្កដា",
      enBody: "On 4 July 1776, the colonies signed the Declaration of Independence — the document that announced they were no longer ruled by the British king. Every year on the same date, families gather for backyard barbecues, public picnics, parades down Main Street, and, after dark, fireworks displays in almost every town. Houses fly the red-white-and-blue flag. It is the country's national birthday party.",
      khBody: "នៅថ្ងៃទី ៤ ខែកក្កដា ឆ្នាំ ១៧៧៦ អាណានិគមបានចុះហត្ថលេខាលើប្រកាសឯករាជ្យ — ឯកសារដែលប្រកាសថា ពួកគេលែងត្រូវបានគ្រប់គ្រងដោយស្ដេចអង់គ្លេសទៀតហើយ។ រាល់ឆ្នាំនៅថ្ងៃដដែល ក្រុមគ្រួសារប្រមូលផ្ដុំសម្រាប់អាហារដុតក្រអូបនៅសួនច្បារ ស្ថានបិកនិកសាធារណៈ ដង្ហែដឹកអាហារតាមផ្លូវសំខាន់ និងក្រោយព្រះអាទិត្យលិច មានកាំជ្រួចស្ទើរតែគ្រប់ទីក្រុង។ ផ្ទះទាំងនោះបង្ហោះទង់ក្រហម-ស-និងខៀវ។ វាគឺជាខួបកំណើតជាតិរបស់ប្រទេស។",
      bg: "linear-gradient(135deg,#fef3c7,#fde68a)",
      accent: RED,
      visualKind: "fireworks" as const,
    },
    {
      key: "halloween",
      Icon: Ghost,
      enName: "Halloween · October 31",
      khName: "Halloween · ៣១ តុលា",
      enWhen: "Autumn · every 31 October",
      khWhen: "រដូវស្លឹកឈើជ្រុះ · រាល់ថ្ងៃទី ៣១ តុលា",
      enBody: "On the last evening of October, children dress up in costumes — ghosts, witches, superheroes, princesses — and walk door-to-door through their neighbourhood saying 'trick or treat'. Adults answer the door and hand out candy. Houses are decorated with carved orange pumpkins called jack-o'-lanterns, with candles glowing inside the cut-out faces. The roots of the holiday are an ancient Celtic harvest festival, but in modern America it is mostly a community event for children — a single safe night when strangers in your street give you sweets.",
      khBody: "នៅព្រឹកល្ងាចចុងក្រោយនៃខែតុលា កុមារស្លៀកសម្លៀកបំពាក់បំប្លែង — ខ្មោចបិសាច មេធ្មប់ វីរបុរស ព្រះនាង — និងដើរពីផ្ទះមួយទៅផ្ទះមួយក្នុងមូលដ្ឋានរបស់ពួកគេ និយាយថា 'ល្បិច ឬ ភោជន'។ មនុស្សពេញវ័យឆ្លើយទ្វារ និងចែកស្ករគ្រាប់។ ផ្ទះត្រូវបានតុបតែងដោយល្ពៅពណ៌ទឹកក្រូចឆ្លាក់ដែលហៅថា jack-o'-lanterns ដោយមានទៀនឆេះនៅខាងក្នុងមុខដែលកាត់។ ប្រភពនៃថ្ងៃឈប់សម្រាកគឺពិធីបុណ្យចំការ Celtic បុរាណ ប៉ុន្តែនៅអាមេរិកសព្វថ្ងៃ វាជាសកម្មភាពសហគមន៍សម្រាប់កុមារ — យប់សុវត្ថិភាពមួយ ដែលមនុស្សចម្លែកនៅផ្លូវផ្ទះអ្នកឲ្យអ្នកស្ករ។",
      bg: "linear-gradient(135deg,#1c1917,#7c2d12)",
      accent: "#ea580c",
      visualKind: "pumpkin" as const,
    },
    {
      key: "thanksgiving",
      Icon: Drumstick,
      enName: "Thanksgiving · 4th Thursday in November",
      khName: "ថ្ងៃអរគុណ · ថ្ងៃព្រហស្បតិ៍ទី ៤ ខែវិច្ឆិកា",
      enWhen: "Late autumn · harvest season",
      khWhen: "ចុងរដូវស្លឹកឈើជ្រុះ · រដូវប្រមូលផល",
      enBody: "Thanksgiving is the holiday Americans take most seriously. The story it remembers is from 1621, when the Pilgrims (early settlers from Plymouth) sat down to a harvest meal with the Wampanoag people who had taught them how to grow corn in this new land. Today, the focus is family, not religion. People travel huge distances — it is the biggest travel weekend of the entire year — to be at one long dinner table with relatives. The traditional meal is a roasted turkey with stuffing, mashed potatoes, cranberry sauce, sweet potatoes, and pumpkin pie. Before eating, many families go around the table and each person says one thing they are grateful for that year.",
      khBody: "ថ្ងៃអរគុណគឺជាថ្ងៃឈប់សម្រាកដែលអាមេរិកាំងយកចិត្តទុកដាក់បំផុត។ រឿងដែលវាចងចាំគឺពីឆ្នាំ ១៦២១ នៅពេលពួក Pilgrims (អ្នកតាំងលំនៅដំបូងពី Plymouth) បានអង្គុយញ៉ាំអាហារប្រមូលផលជាមួយជនជាតិ Wampanoag ដែលបានបង្រៀនពួកគេឲ្យដាំពោតនៅទឹកដីថ្មីនេះ។ សព្វថ្ងៃ ការផ្ដោតគឺក្រុមគ្រួសារ មិនមែនសាសនា។ មនុស្សធ្វើដំណើរចម្ងាយយ៉ាងធំ — វាជាចុងសប្ដាហ៍ធ្វើដំណើរធំជាងគេនៃឆ្នាំទាំងមូល — ដើម្បីនៅតុអាហារវែងមួយជាមួយសាច់ញាតិ។ អាហារប្រពៃណីគឺ មាន់ទួនលីង ដំឡូងបុក ទឹកជ្រលក់ cranberry ដំឡូងផ្អែម និងនំល្ពៅ។ មុនញ៉ាំ ក្រុមគ្រួសារជាច្រើនវិលជុំវិញតុ ហើយម្នាក់ៗនិយាយរឿងមួយដែលគេអរគុណក្នុងឆ្នាំនោះ។",
      bg: "linear-gradient(135deg,#fef3c7,#fed7aa)",
      accent: "#a16207",
      visualKind: "turkey" as const,
    },
    {
      key: "nye",
      Icon: PartyPopper,
      enName: "New Year's Eve · December 31",
      khName: "ថ្ងៃឆ្លងឆ្នាំសកល · ៣១ ធ្នូ",
      enWhen: "Winter · every 31 December",
      khWhen: "រដូវរងា · រាល់ថ្ងៃទី ៣១ ធ្នូ",
      enBody:
        "Americans stay awake until midnight to count down the final seconds of the old year. It is usually celebrated with parties, music, and watching a giant glowing ball drop in New York City.",
      khBody:
        "ជនជាតិអាមេរិកនៅចាំរហូតដល់ពាក់កណ្តាលអធ្រាត្រដើម្បីរាប់ថយក្រោយវិនាទីចុងក្រោយនៃឆ្នាំចាស់។ ជាទូទៅគេប្រារព្ធពិធីដោយការជប់លៀង តន្ត្រី និងការមើលគ្រាប់បាល់ភ្លឺធំមួយធ្លាក់ចុះក្នុងទីក្រុង New York។",
      bg: "linear-gradient(135deg,#0c1e3e,#1e3a8a)",
      accent: "#fbbf24",
      visualKind: "midnight" as const,
    },
    {
      key: "newyearday",
      Icon: Clock,
      enName: "New Year's Day · January 1",
      khName: "ចូលឆ្នាំសកល · ១ មករា",
      enWhen: "Winter · every 1 January",
      khWhen: "រដូវរងា · រាល់ថ្ងៃទី ១ មករា",
      enBody:
        "A quiet day of rest after the late-night parties. Many people make 'resolutions' — promises to themselves to build better habits in the coming year.",
      khBody:
        "ថ្ងៃសម្រាកដ៏ស្ងប់ស្ងាត់បន្ទាប់ពីពិធីជប់លៀងយប់ជ្រៅ។ មនុស្សជាច្រើនធ្វើ «ការតាំងចិត្ត» — ការសន្យាចំពោះខ្លួនឯងដើម្បីបង្កើតទម្លាប់ល្អៗក្នុងឆ្នាំបន្ទាប់។",
      bg: "linear-gradient(135deg,#dbeafe,#93c5fd)",
      accent: NAVY,
      visualKind: "newyearday" as const,
    },
    {
      key: "mlk",
      Icon: HandHeart,
      enName: "Martin Luther King Jr. Day · 3rd Monday in January",
      khName: "ទិវារំលឹកខួបលោក Martin Luther King Jr. · ថ្ងៃច័ន្ទទី ៣ នៃខែមករា",
      enWhen: "Winter · 3rd Monday in January",
      khWhen: "រដូវរងា · ថ្ងៃច័ន្ទទី ៣ នៃខែមករា",
      enBody:
        "Honors the famous civil rights leader who fought for racial equality through non-violent protest. It is considered a national day of service, where Americans are encouraged to volunteer in their communities.",
      khBody:
        "ផ្តល់កិត្តិយសដល់មេដឹកនាំសិទ្ធិស៊ីវិលដ៏ល្បីល្បាញ ដែលបានតស៊ូទាមទារសមភាពពូជសាសន៍តាមរយៈការតវ៉ាដោយអហិង្សា។ វាត្រូវបានចាត់ទុកជាទិវាបម្រើជាតិមួយ ដែលជនជាតិអាមេរិកត្រូវបានលើកទឹកចិត្តឱ្យធ្វើជាស្ម័គ្រចិត្តក្នុងសហគមន៍របស់ពួកគេ។",
      bg: "linear-gradient(135deg,#e0e7ff,#a5b4fc)",
      accent: "#4338ca",
      visualKind: "peace" as const,
    },
    {
      key: "valentines",
      Icon: Heart,
      enName: "Valentine's Day · February 14",
      khName: "ទិវានៃក្តីស្រឡាញ់ · ១៤ កុម្ភៈ",
      enWhen: "Winter · every 14 February",
      khWhen: "រដូវរងា · រាល់ថ្ងៃទី ១៤ កុម្ភៈ",
      enBody:
        "A day dedicated to romance and friendship. People exchange cards, chocolates, and flowers with those they love. In schools, young students often pass out small candy hearts to their classmates.",
      khBody:
        "ថ្ងៃដែលឧទ្ទិសដល់មនោសញ្ចេតនា និងមិត្តភាព។ មនុស្សម្នាជូនកាត សូកូឡា និងផ្កាទៅកាន់អ្នកដែលពួកគេស្រឡាញ់។ នៅសាលារៀន សិស្សតូចៗច្រើនតែចែកស្ករគ្រាប់រាងបេះដូងតូចៗដល់មិត្តរួមថ្នាក់របស់ពួកគេ។",
      bg: "linear-gradient(135deg,#fce7f3,#fbcfe8)",
      accent: "#e11d48",
      visualKind: "heart" as const,
    },
    {
      key: "mothers",
      Icon: Flower2,
      enName: "Mother's Day · 2nd Sunday in May",
      khName: "ទិវាមាតា · ថ្ងៃអាទិត្យទី ២ នៃខែឧសភា",
      enWhen: "Spring · 2nd Sunday in May",
      khWhen: "រដូវផ្ការីក · ថ្ងៃអាទិត្យទី ២ នៃខែឧសភា",
      enBody:
        "A special day to honor mothers and grandmothers. Families usually celebrate by cooking breakfast for their mothers or taking them out to a nice dinner so they don't have to work.",
      khBody:
        "ថ្ងៃពិសេសដើម្បីផ្តល់កិត្តិយសដល់ម្តាយ និងជីដូន។ គ្រួសារជាច្រើនប្រារព្ធពិធីដោយចម្អិនអាហារពេលព្រឹកសម្រាប់ម្តាយរបស់ពួកគេ ឬនាំពួកគាត់ទៅញ៉ាំអាហារពេលល្ងាចនៅខាងក្រៅ ដើម្បីកុំឱ្យពួកគាត់ត្រូវធ្វើការ។",
      bg: "linear-gradient(135deg,#dcfce7,#bbf7d0)",
      accent: "#db2777",
      visualKind: "bouquet" as const,
    },
    {
      key: "fathers",
      Icon: Wrench,
      enName: "Father's Day · 3rd Sunday in June",
      khName: "ទិវាបិតា · ថ្ងៃអាទិត្យទី ៣ នៃខែមិថុនា",
      enWhen: "Summer · 3rd Sunday in June",
      khWhen: "រដូវក្ដៅ · ថ្ងៃអាទិត្យទី ៣ នៃខែមិថុនា",
      enBody:
        "A day to honor fathers and grandfathers. Typical gifts include tools, neckties, or outdoor equipment, and families often celebrate by grilling food outside.",
      khBody:
        "ថ្ងៃផ្តល់កិត្តិយសដល់ឪពុក និងជីតា។ អំណោយជាទូទៅរួមមាន ឧបករណ៍ប្រើប្រាស់ ក្រវាត់ក ឬសម្ភារៈសម្រាប់ធ្វើសកម្មភាពក្រៅផ្ទះ ហើយគ្រួសារជាច្រើនប្រារព្ធពិធីដោយដុតបំពងអាហារនៅខាងក្រៅ។",
      bg: "linear-gradient(135deg,#fef9c3,#fde047)",
      accent: NAVY,
      visualKind: "tie" as const,
    },
    {
      key: "christmas",
      Icon: TreePine,
      enName: "Christmas · December 25",
      khName: "បុណ្យណូអែល · ២៥ ធ្នូ",
      enWhen: "Winter · every 25 December",
      khWhen: "រដូវរងា · រាល់ថ្ងៃទី ២៥ ធ្នូ",
      enBody: "Christmas blends two traditions sitting on top of each other: the Christian celebration of the birth of Jesus, and the older folklore of Santa Claus, a cheerful old man in a red suit who is said to deliver gifts to children around the world in a single night, pulled by flying reindeer. Families decorate a real or fake evergreen tree with coloured lights and shiny ornaments, and on Christmas morning children open wrapped gifts placed beneath it. Houses are strung with lights along the roof and windows. The whole month of December is filled with carols, special foods, and gatherings — for many Americans it is the warmest holiday of the year, even when the weather outside is the coldest.",
      khBody: "បុណ្យណូអែលលាយប្រពៃណីពីរនៅលើគ្នា ៖ ការអបអរសាទរគ្រិស្តសាសនានៃការបង្កើតនៃព្រះយេស៊ូ និងរឿងព្រេងចាស់ជាងនៃ Santa Claus បុរសចាស់រីករាយក្នុងសម្លៀកបំពាក់ក្រហមដែលគេនិយាយថា ចែកអំណោយដល់កុមារនៅទូទាំងពិភពលោកក្នុងយប់តែមួយ ដែលដឹកដោយ reindeer ហោះ។ ក្រុមគ្រួសារតុបតែងដើមឈើពណ៌បៃតងពិត ឬក្លែងក្លាយដោយភ្លើងពណ៌ និងគ្រឿងតុបតែងភ្លឺ ហើយនៅព្រឹកថ្ងៃណូអែល កុមារបើកកញ្ចប់អំណោយដែលដាក់នៅក្រោមដើមឈើ។ ផ្ទះត្រូវបានព្យួរដោយភ្លើងតាមដំបូល និងបង្អួច។ ខែធ្នូទាំងមូលពោរពេញដោយចម្រៀង អាហារពិសេស និងការប្រមូលផ្ដុំ — សម្រាប់អាមេរិកាំងជាច្រើន វាជាថ្ងៃឈប់សម្រាកកក់ក្ដៅជាងគេនៃឆ្នាំ សូម្បីពេលដែលអាកាសធាតុខាងក្រៅគឺត្រជាក់ជាងគេក៏ដោយ។",
      bg: "linear-gradient(135deg,#dcfce7,#86efac)",
      accent: "#15803d",
      visualKind: "tree" as const,
    },
  ];

  return (
    <section data-testid="tab-holidays">
      <SectionHeader spec="03" en="Cultural Holidays" kh="ថ្ងៃឈប់សម្រាកវប្បធម៌" k={k} Icon={Calendar} accent={NAVY} />

      <div className="grid lg:grid-cols-2 gap-5">
        {holidays.map((h) => (
          <div
            key={h.key}
            className="rounded-3xl border-2 overflow-hidden flex flex-col bg-white"
            style={{ borderColor: `${h.accent}55` }}
            data-testid={`holiday-${h.key}`}
          >
            <div
              className="h-32 relative flex items-center justify-center"
              style={{ background: h.bg }}
            >
              <HolidayVisual kind={h.visualKind} />
              <span
                className={`absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded-full text-white ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
                style={{ backgroundColor: h.accent }}
              >
                {k ? h.khWhen : h.enWhen}
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <h.Icon className="w-5 h-5" style={{ color: h.accent }} />
                <h3 className={`font-bold text-lg ${k ? "font-khmer" : ""}`} style={{ color: NAVY_DEEP }}>
                  {k ? h.khName : h.enName}
                </h3>
              </div>
              <P k={k} en={h.enBody} kh={h.khBody} className="text-sm" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

type HolidayVisualKind =
  | "fireworks"
  | "pumpkin"
  | "turkey"
  | "tree"
  | "midnight"
  | "newyearday"
  | "peace"
  | "heart"
  | "bouquet"
  | "tie";

function HolidayVisual({ kind }: { kind: HolidayVisualKind }) {
  if (kind === "fireworks") {
    return (
      <svg viewBox="0 0 320 130" className="w-full h-full" aria-hidden="true">
        {/* fireworks bursts */}
        {[
          { cx: 80,  cy: 60, c: RED },
          { cx: 240, cy: 50, c: NAVY },
          { cx: 160, cy: 40, c: GOLD },
        ].map((b, i) => (
          <g key={i}>
            {Array.from({ length: 12 }).map((_, j) => {
              const a = (Math.PI * 2 * j) / 12;
              const r = 22;
              return (
                <line
                  key={j}
                  x1={b.cx}
                  y1={b.cy}
                  x2={b.cx + r * Math.cos(a)}
                  y2={b.cy + r * Math.sin(a)}
                  stroke={b.c}
                  strokeWidth="1.5"
                />
              );
            })}
            <circle cx={b.cx} cy={b.cy} r="3" fill={b.c} />
          </g>
        ))}
        {/* mini flag */}
        <g transform="translate(40,90)">
          <rect width="36" height="22" fill="#ffffff" />
          <rect width="36" height="2.4" y="0"   fill={RED} />
          <rect width="36" height="2.4" y="4.8" fill={RED} />
          <rect width="36" height="2.4" y="9.6" fill={RED} />
          <rect width="36" height="2.4" y="14.4" fill={RED} />
          <rect width="36" height="2.4" y="19.6" fill={RED} />
          <rect width="14" height="11" fill={NAVY} />
        </g>
      </svg>
    );
  }
  if (kind === "pumpkin") {
    return (
      <svg viewBox="0 0 320 130" className="w-full h-full" aria-hidden="true">
        {/* moon */}
        <circle cx="260" cy="40" r="18" fill="#fef3c7" />
        {/* pumpkin body */}
        <ellipse cx="160" cy="80" rx="58" ry="40" fill="#ea580c" />
        <ellipse cx="130" cy="80" rx="22" ry="40" fill="#c2410c" opacity="0.5" />
        <ellipse cx="190" cy="80" rx="22" ry="40" fill="#c2410c" opacity="0.5" />
        <rect x="156" y="34" width="8" height="14" fill="#15803d" />
        {/* face */}
        <polygon points="138,72 150,72 144,82" fill="#1c1917" />
        <polygon points="170,72 182,72 176,82" fill="#1c1917" />
        <path d="M132,98 q28,16 56,0 l-6,-6 q-22,8 -44,0 z" fill="#1c1917" />
      </svg>
    );
  }
  if (kind === "turkey") {
    return (
      <svg viewBox="0 0 320 130" className="w-full h-full" aria-hidden="true">
        {/* feathers fan */}
        {["#b91c1c", "#d97706", "#a16207", "#78350f", "#a16207", "#d97706", "#b91c1c"].map((c, i) => {
          const a = -60 + i * 20;
          const rad = (a * Math.PI) / 180;
          return (
            <ellipse
              key={i}
              cx={160 + Math.sin(rad) * 38}
              cy={70 - Math.cos(rad) * 38}
              rx="12"
              ry="22"
              fill={c}
              transform={`rotate(${a} ${160} ${70})`}
            />
          );
        })}
        {/* body */}
        <ellipse cx="160" cy="92" rx="28" ry="20" fill="#78350f" />
        {/* head */}
        <circle cx="160" cy="64" r="11" fill="#a16207" />
        {/* beak + wattle */}
        <polygon points="171,64 178,66 171,68" fill="#fde68a" />
        <path d="M168,68 q3,6 -2,8" stroke="#b91c1c" strokeWidth="2" fill="none" />
        {/* eye */}
        <circle cx="163" cy="62" r="1.4" fill="#ffffff" />
        {/* feet */}
        <line x1="152" y1="112" x2="148" y2="120" stroke="#78350f" strokeWidth="2" />
        <line x1="168" y1="112" x2="172" y2="120" stroke="#78350f" strokeWidth="2" />
      </svg>
    );
  }
  if (kind === "tree") {
  return (
    <svg viewBox="0 0 320 130" className="w-full h-full" aria-hidden="true">
      {/* falling snow */}
      {Array.from({ length: 14 }).map((_, i) => (
        <circle key={i} cx={(i * 23) % 320} cy={(i * 37) % 90 + 5} r="1.6" fill="#ffffff" />
      ))}
      {/* tree triangles */}
      <polygon points="160,18 124,58 196,58" fill="#15803d" />
      <polygon points="160,38 116,80 204,80" fill="#15803d" />
      <polygon points="160,60 108,108 212,108" fill="#15803d" />
      {/* trunk */}
      <rect x="152" y="108" width="16" height="12" fill="#7c2d12" />
      {/* star */}
      <Star5 cx={160} cy={16} size={6} fill={GOLD} />
      {/* gifts */}
      <rect x="106" y="112" width="20" height="12" fill={RED} />
      <rect x="115" y="112" width="2"  height="12" fill={GOLD} />
      <rect x="200" y="112" width="20" height="12" fill={NAVY} />
      <rect x="209" y="112" width="2"  height="12" fill={GOLD} />
      {/* baubles */}
      <circle cx="148" cy="50" r="2" fill={RED} />
      <circle cx="172" cy="68" r="2" fill={GOLD} />
      <circle cx="142" cy="92" r="2" fill={RED} />
      <circle cx="180" cy="96" r="2" fill={GOLD} />
    </svg>
  );
  }

  if (kind === "midnight") {
    // Times Square ball drop on a dark sky with confetti
    const confetti = ["#fbbf24", "#f87171", "#60a5fa", "#34d399", "#f472b6", "#fde047"];
    return (
      <svg viewBox="0 0 320 130" className="w-full h-full" aria-hidden="true">
        {/* twinkling stars */}
        {Array.from({ length: 22 }).map((_, i) => (
          <circle
            key={`s-${i}`}
            cx={(i * 29) % 320}
            cy={(i * 19) % 60 + 4}
            r={i % 3 === 0 ? 1.6 : 1}
            fill="#ffffff"
            opacity={i % 2 === 0 ? 0.9 : 0.55}
          />
        ))}
        {/* drop pole */}
        <line x1="160" y1="6" x2="160" y2="40" stroke="#fde68a" strokeWidth="1.5" />
        {/* glowing ball */}
        <circle cx="160" cy="56" r="22" fill="#fde68a" opacity="0.35" />
        <circle cx="160" cy="56" r="16" fill="#fbbf24" />
        <circle cx="155" cy="51" r="4" fill="#fef3c7" opacity="0.8" />
        {/* faceted lines on the ball */}
        <line x1="144" y1="56" x2="176" y2="56" stroke="#b45309" strokeWidth="0.6" opacity="0.6" />
        <line x1="160" y1="40" x2="160" y2="72" stroke="#b45309" strokeWidth="0.6" opacity="0.6" />
        {/* confetti rectangles */}
        {Array.from({ length: 26 }).map((_, i) => {
          const x = (i * 43) % 320;
          const y = 80 + ((i * 17) % 40);
          const rot = (i * 31) % 90;
          return (
            <rect
              key={`c-${i}`}
              x={x}
              y={y}
              width="4"
              height="8"
              fill={confetti[i % confetti.length]}
              transform={`rotate(${rot} ${x + 2} ${y + 4})`}
            />
          );
        })}
      </svg>
    );
  }

  if (kind === "newyearday") {
    // Calendar page flipped to Jan 1 with a sunrise
    return (
      <svg viewBox="0 0 320 130" className="w-full h-full" aria-hidden="true">
        {/* horizon */}
        <rect x="0" y="92" width="320" height="38" fill="#bfdbfe" />
        {/* sunrise */}
        <circle cx="60" cy="92" r="28" fill="#fde68a" />
        <circle cx="60" cy="92" r="20" fill="#fbbf24" />
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={i}
            x1="60"
            y1="92"
            x2={60 + Math.cos((i / 6) * Math.PI - Math.PI) * 42}
            y2={92 + Math.sin((i / 6) * Math.PI - Math.PI) * 42}
            stroke="#f59e0b"
            strokeWidth="1.2"
            opacity="0.7"
          />
        ))}
        {/* calendar body */}
        <rect x="180" y="22" width="110" height="92" rx="6" fill="#ffffff" stroke={NAVY} strokeWidth="2" />
        {/* header band */}
        <rect x="180" y="22" width="110" height="22" rx="6" fill={RED} />
        <rect x="180" y="38" width="110" height="6" fill={RED} />
        {/* binding rings */}
        <circle cx="200" cy="22" r="3" fill={GOLD} />
        <circle cx="270" cy="22" r="3" fill={GOLD} />
        {/* JAN label */}
        <text x="235" y="38" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="sans-serif">
          JAN
        </text>
        {/* big "1" */}
        <text x="235" y="92" textAnchor="middle" fill={NAVY} fontSize="44" fontWeight="800" fontFamily="serif">
          1
        </text>
      </svg>
    );
  }

  if (kind === "peace") {
    // Two clasped hands forming a circle of equality with a dove above
    return (
      <svg viewBox="0 0 320 130" className="w-full h-full" aria-hidden="true">
        {/* soft halo */}
        <circle cx="160" cy="78" r="44" fill="#ffffff" opacity="0.45" />
        {/* dove silhouette */}
        <path
          d="M150 28 Q158 18 172 22 Q176 14 184 18 Q186 24 180 28 Q188 30 188 36 Q176 40 168 36 Q162 42 152 38 Q144 38 144 32 Q146 28 150 28 Z"
          fill="#ffffff"
          stroke={NAVY}
          strokeWidth="1.2"
        />
        {/* olive branch in beak */}
        <line x1="184" y1="22" x2="200" y2="16" stroke="#15803d" strokeWidth="1.5" />
        <ellipse cx="196" cy="17" rx="3" ry="1.5" fill="#15803d" />
        <ellipse cx="200" cy="14" rx="3" ry="1.5" fill="#15803d" />
        {/* left forearm (lighter skin tone) */}
        <path d="M70 110 Q90 90 130 86 L150 100 L130 116 Z" fill="#fcd9b6" stroke={NAVY_DEEP} strokeWidth="1.2" />
        {/* right forearm (deeper skin tone) */}
        <path d="M250 110 Q230 90 190 86 L170 100 L190 116 Z" fill="#8b5a2b" stroke={NAVY_DEEP} strokeWidth="1.2" />
        {/* clasp/handshake center */}
        <ellipse cx="160" cy="100" rx="22" ry="12" fill="#b08968" stroke={NAVY_DEEP} strokeWidth="1.2" />
        {/* thumb highlight */}
        <path d="M150 92 Q160 88 170 92" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.7" />
      </svg>
    );
  }

  if (kind === "heart") {
    // Layered hearts with floating petals
    return (
      <svg viewBox="0 0 320 130" className="w-full h-full" aria-hidden="true">
        {/* small floating hearts */}
        {[
          { x: 40, y: 30, s: 0.6, c: "#fb7185" },
          { x: 80, y: 90, s: 0.5, c: "#f472b6" },
          { x: 250, y: 28, s: 0.55, c: "#f472b6" },
          { x: 280, y: 84, s: 0.65, c: "#fb7185" },
          { x: 220, y: 100, s: 0.45, c: "#fda4af" },
          { x: 60, y: 60, s: 0.4, c: "#fda4af" },
        ].map((h, i) => (
          <path
            key={i}
            d="M0 -6 C 6 -14, 16 -8, 0 8 C -16 -8, -6 -14, 0 -6 Z"
            fill={h.c}
            opacity="0.85"
            transform={`translate(${h.x} ${h.y}) scale(${h.s})`}
          />
        ))}
        {/* big heart shadow */}
        <path
          d="M160 108 C 110 70, 90 40, 130 30 C 148 28, 158 42, 160 50 C 162 42, 172 28, 190 30 C 230 40, 210 70, 160 108 Z"
          fill="#9f1239"
          opacity="0.25"
          transform="translate(4 4)"
        />
        {/* big heart */}
        <path
          d="M160 108 C 110 70, 90 40, 130 30 C 148 28, 158 42, 160 50 C 162 42, 172 28, 190 30 C 230 40, 210 70, 160 108 Z"
          fill="#e11d48"
          stroke="#9f1239"
          strokeWidth="1.5"
        />
        {/* sparkle */}
        <path d="M148 56 L152 60 L148 64 L144 60 Z" fill="#ffffff" opacity="0.85" />
      </svg>
    );
  }

  if (kind === "bouquet") {
    // Bouquet of flowers wrapped in paper
    const petalColors = ["#ec4899", "#f472b6", "#fb7185", "#a78bfa", "#fde047"];
    const flowers = [
      { cx: 130, cy: 50, color: petalColors[0] },
      { cx: 160, cy: 38, color: petalColors[1] },
      { cx: 190, cy: 50, color: petalColors[2] },
      { cx: 145, cy: 64, color: petalColors[3] },
      { cx: 175, cy: 64, color: petalColors[4] },
    ];
    return (
      <svg viewBox="0 0 320 130" className="w-full h-full" aria-hidden="true">
        {/* leaves */}
        <path d="M130 78 Q108 86 100 110" stroke="#15803d" strokeWidth="2" fill="none" />
        <path d="M190 78 Q212 86 220 110" stroke="#15803d" strokeWidth="2" fill="none" />
        <ellipse cx="108" cy="98" rx="8" ry="3" fill="#15803d" transform="rotate(-30 108 98)" />
        <ellipse cx="212" cy="98" rx="8" ry="3" fill="#15803d" transform="rotate(30 212 98)" />
        {/* stems gathered */}
        {flowers.map((f, i) => (
          <line key={`st-${i}`} x1={f.cx} y1={f.cy + 6} x2="160" y2="92" stroke="#15803d" strokeWidth="1.6" />
        ))}
        {/* paper wrap */}
        <path d="M118 92 L160 78 L202 92 L186 122 L134 122 Z" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
        <path d="M160 78 L160 122" stroke="#db2777" strokeWidth="1" opacity="0.6" />
        {/* ribbon */}
        <rect x="138" y="100" width="44" height="8" fill="#db2777" />
        <polygon points="138,100 130,96 130,112 138,108" fill="#db2777" />
        <polygon points="182,100 190,96 190,112 182,108" fill="#db2777" />
        {/* flowers (5 petals each) */}
        {flowers.map((f, i) => (
          <g key={`fl-${i}`}>
            {Array.from({ length: 5 }).map((_, p) => {
              const a = (p / 5) * Math.PI * 2 - Math.PI / 2;
              return (
                <circle
                  key={p}
                  cx={f.cx + Math.cos(a) * 7}
                  cy={f.cy + Math.sin(a) * 7}
                  r="6"
                  fill={f.color}
                />
              );
            })}
            <circle cx={f.cx} cy={f.cy} r="3.5" fill="#fde047" stroke="#a16207" strokeWidth="0.6" />
          </g>
        ))}
      </svg>
    );
  }

  if (kind === "tie") {
    // Necktie centered on a dress shirt collar
    return (
      <svg viewBox="0 0 320 130" className="w-full h-full" aria-hidden="true">
        {/* shirt body */}
        <path d="M40 130 L40 80 Q160 60 280 80 L280 130 Z" fill="#ffffff" stroke={NAVY} strokeWidth="1.5" />
        {/* buttons */}
        <circle cx="160" cy="118" r="2" fill={NAVY} />
        {/* left collar */}
        <polygon points="100,60 160,72 132,108 110,90" fill="#ffffff" stroke={NAVY} strokeWidth="1.5" />
        {/* right collar */}
        <polygon points="220,60 160,72 188,108 210,90" fill="#ffffff" stroke={NAVY} strokeWidth="1.5" />
        {/* tie knot */}
        <polygon points="148,72 172,72 178,86 142,86" fill={RED} stroke={NAVY_DEEP} strokeWidth="1" />
        {/* tie body */}
        <polygon points="142,86 178,86 168,124 152,124" fill={RED} stroke={NAVY_DEEP} strokeWidth="1" />
        {/* tip */}
        <polygon points="152,124 168,124 160,134" fill={RED} stroke={NAVY_DEEP} strokeWidth="1" />
        {/* diagonal stripes */}
        <line x1="146" y1="92" x2="174" y2="98" stroke={GOLD} strokeWidth="1.5" />
        <line x1="148" y1="106" x2="172" y2="112" stroke={GOLD} strokeWidth="1.5" />
        <line x1="151" y1="118" x2="169" y2="122" stroke={GOLD} strokeWidth="1.5" />
      </svg>
    );
  }

  return null;
}

// ════════════════════════════════════════════════════════════════════════════
//  TAB 04 · Landmarks & Leaders
// ════════════════════════════════════════════════════════════════════════════

function LandmarksTab({ k, t }: { k: boolean; t: T }) {
  return (
    <section data-testid="tab-landmarks">
      {/* Mount Rushmore */}
      <SectionHeader spec="04a" en="Mount Rushmore" kh="ភ្នំ Rushmore" k={k} Icon={Mountain} accent={NAVY} />

      <div
        className="rounded-3xl border-2 p-5 sm:p-6 mb-8 bg-white grid md:grid-cols-2 gap-5"
        style={{ borderColor: `${NAVY}44` }}
        data-testid="rushmore"
      >
        <div>
          <P
            k={k}
            en="In the Black Hills of South Dakota stands one of the strangest pieces of art on Earth: four enormous human faces, each as tall as a six-storey building, carved directly into the side of a granite mountain. The mountain is called Mount Rushmore. Between 1927 and 1941, sculptor Gutzon Borglum and a team of around 400 workers used dynamite, jackhammers, and chisels to remove roughly 410,000 tonnes of stone. The four presidents chosen represent four chapters of American history: George Washington (independence), Thomas Jefferson (expansion), Abraham Lincoln (preservation through civil war), and Theodore Roosevelt (the modern industrial nation). They stare out across the prairie at a height of 1,745 metres, designed to last, by Borglum's own estimate, for at least 100,000 years."
            kh="នៅ Black Hills នៃរដ្ឋ South Dakota មានឈរស្នាដៃសិល្បៈចម្លែកបំផុតមួយនៅលើផែនដី ៖ មុខមនុស្សយក្ស ៤ ដែលនីមួយៗខ្ពស់ដូចអគារ ៦ ជាន់ ឆ្លាក់ដោយផ្ទាល់ចូលផ្នែកនៃភ្នំថ្ម granite។ ភ្នំនេះមានឈ្មោះថា ភ្នំ Rushmore។ រវាងឆ្នាំ ១៩២៧ និង ១៩៤១ ជាងចម្លាក់ Gutzon Borglum និងក្រុមប្រហែល ៤០០ នាក់បានប្រើគ្រាប់បំផ្ទុះ jackhammer និងគ្រឿងឆ្លាក់ដើម្បីដកថ្មប្រហែល ៤១០,០០០ តោន។ ប្រធានាធិបតី ៤ នាក់ដែលត្រូវបានជ្រើសរើសតំណាងឲ្យជំពូក ៤ នៃប្រវត្តិអាមេរិកាំង ៖ George Washington (ឯករាជ្យ) Thomas Jefferson (ការពង្រីក) Abraham Lincoln (ការការពារតាមរយៈសង្គ្រាមស៊ីវិល) និង Theodore Roosevelt (ប្រទេសឧស្សាហកម្មទំនើប)។ ពួកគេសម្លឹងមើលឆ្លងកាត់ វាលស្មៅនៅកម្ពស់ ១,៧៤៥ ម៉ែត្រ បានរចនាឲ្យទ្រាំទ្រ តាមការប៉ាន់ស្មានរបស់ Borglum ផ្ទាល់ យ៉ាងតិច ១០០,០០០ ឆ្នាំ។"
            className="text-sm sm:text-[15px]"
          />
        </div>
        <RushmoreViz k={k} />
      </div>

      {/* Presidents list */}
      <SectionHeader
        spec="04b"
        en="The Presidents · 1789 → today"
        kh="ប្រធានាធិបតី · ១៧៨៩ → សព្វថ្ងៃ"
        k={k}
        Icon={Trophy}
        accent={RED}
      />

      <PresidentsList k={k} t={t} />
    </section>
  );
}

function RushmoreViz({ k }: { k: boolean }) {
  // Stylized: four oval heads carved into a triangular mountain silhouette
  const faces = [
    { x:  80, en: "Washington", kh: "Washington", year: "1789" },
    { x: 140, en: "Jefferson",  kh: "Jefferson",  year: "1801" },
    { x: 200, en: "Roosevelt",  kh: "Roosevelt",  year: "1901" },
    { x: 260, en: "Lincoln",    kh: "Lincoln",    year: "1861" },
  ];
  return (
    <div
      className="rounded-2xl p-3 border"
      style={{ borderColor: `${NAVY}44`, backgroundColor: PARCHMENT }}
      data-testid="rushmore-viz"
    >
      <svg viewBox="0 0 340 170" className="w-full h-44" aria-hidden="true">
        {/* sky */}
        <rect width="340" height="170" fill="#dbeafe" />
        {/* mountain */}
        <polygon points="0,170 340,170 320,40 240,80 180,30 100,90 30,60" fill="#a8a29e" />
        <polygon points="0,170 340,170 320,40 240,80 180,30 100,90 30,60" fill="#78716c" opacity="0.4" />
        {/* faces */}
        {faces.map((f) => (
          <g key={f.en} transform={`translate(${f.x},86)`}>
            <ellipse cx="0" cy="0" rx="20" ry="26" fill="#e7e5e4" stroke="#44403c" strokeWidth="1" />
            {/* simplified facial feature lines */}
            <line x1="-10" y1="-6"  x2="-3"  y2="-6"  stroke="#44403c" strokeWidth="1.4" />
            <line x1="3"   y1="-6"  x2="10"  y2="-6"  stroke="#44403c" strokeWidth="1.4" />
            <line x1="0"   y1="-2"  x2="0"   y2="6"   stroke="#44403c" strokeWidth="1.2" />
            <path d="M-7,12 q7,5 14,0" stroke="#44403c" strokeWidth="1.2" fill="none" />
            <text x="0" y="44" fontSize="7" textAnchor="middle" fill={NAVY} fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? f.kh : f.en}
            </text>
            <text x="0" y="54" fontSize="6" textAnchor="middle" fill={INK_SOFT} fontFamily="monospace">
              {num(k, f.year)}
            </text>
          </g>
        ))}
        {/* trees at base */}
        {Array.from({ length: 12 }).map((_, i) => (
          <polygon
            key={i}
            points={`${20 + i * 28},168 ${28 + i * 28},152 ${36 + i * 28},168`}
            fill="#15803d"
            opacity="0.7"
          />
        ))}
      </svg>
      <div className={`mt-1 text-[11px] text-center ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
        {k
          ? "មុខ ៤ ឆ្លាក់ក្នុងថ្ម granite · ឆ្នាំ ១៩២៧–១៩៤១"
          : "Four faces carved in granite · 1927–1941"}
      </div>
    </div>
  );
}

// ─── The Presidents (search + collapsible groups) ─────────────────────────

type PresidentEra = "founding" | "antebellum" | "civilwar" | "gildedage" | "early20" | "midcentury" | "modern" | "contemporary";

const ERAS: { key: PresidentEra; en: string; kh: string; range: string }[] = [
  { key: "founding",     en: "Founding Era",            kh: "យុគបង្កើត",                range: "1–6 · 1789–1829" },
  { key: "antebellum",   en: "Antebellum Era",          kh: "មុនសង្គ្រាមស៊ីវិល",         range: "7–14 · 1829–1857" },
  { key: "civilwar",     en: "Civil War & Reconstruction", kh: "សង្គ្រាមស៊ីវិល និងការសាងសង់ឡើងវិញ", range: "15–19 · 1857–1881" },
  { key: "gildedage",    en: "Gilded Age",              kh: "យុគមាស",                  range: "20–25 · 1881–1901" },
  { key: "early20",      en: "Early 20th Century",      kh: "ដើមសតវត្សទី ២០",          range: "26–32 · 1901–1933" },
  { key: "midcentury",   en: "Mid-Century · WWII era",  kh: "កណ្ដាលសតវត្ស · សង្គ្រាមលោកលើកទី ២", range: "32–36 · 1933–1969" },
  { key: "modern",       en: "Modern Era",              kh: "យុគទំនើប",                 range: "37–42 · 1969–2001" },
  { key: "contemporary", en: "Contemporary",            kh: "សហសម័យ",                   range: "43–46 · 2001–today" },
];

type PresEntry = {
  n: number;
  en: string;
  kh: string;
  party: string;
  enYears: string;
  khYears: string;
  enFact: string;
  khFact: string;
  era: PresidentEra;
};

const PRESIDENTS: PresEntry[] = [
  { n: 1,  en: "George Washington",       kh: "George Washington",       party: "—",            enYears: "1789–1797", khYears: "១៧៨៩–១៧៩៧",
    enFact: "Commander of the army that won independence; refused to be made king and stepped down after eight years.",
    khFact: "មេបញ្ជាការកងទ័ពដែលឈ្នះឯករាជ្យ ; បដិសេធការតែងតាំងជាស្ដេច និងចុះចេញពីតំណែងបន្ទាប់ពី ៨ ឆ្នាំ។", era: "founding" },
  { n: 2,  en: "John Adams",              kh: "John Adams",              party: "Federalist",   enYears: "1797–1801", khYears: "១៧៩៧–១៨០១",
    enFact: "Helped draft the Declaration of Independence; first president to live in the White House.",
    khFact: "បានជួយព្រាងប្រកាសឯករាជ្យ ; ប្រធានាធិបតីដំបូងគេរស់នៅក្នុង White House។", era: "founding" },
  { n: 3,  en: "Thomas Jefferson",        kh: "Thomas Jefferson",        party: "Dem.-Rep.",    enYears: "1801–1809", khYears: "១៨០១–១៨០៩",
    enFact: "Wrote the Declaration of Independence; doubled the size of the country with the Louisiana Purchase (1803).",
    khFact: "បានសរសេរប្រកាសឯករាជ្យ ; បានទ្វេដងទំហំប្រទេសជាមួយការទិញ Louisiana (១៨០៣)។", era: "founding" },
  { n: 4,  en: "James Madison",           kh: "James Madison",           party: "Dem.-Rep.",    enYears: "1809–1817", khYears: "១៨០៩–១៨១៧",
    enFact: "Father of the Constitution and the Bill of Rights; led the country through the War of 1812.",
    khFact: "ឪពុករបស់រដ្ឋធម្មនុញ្ញ និងសិទ្ធិមូលដ្ឋាន ; បានដឹកនាំប្រទេសកាត់សង្គ្រាម ១៨១២។", era: "founding" },
  { n: 5,  en: "James Monroe",            kh: "James Monroe",            party: "Dem.-Rep.",    enYears: "1817–1825", khYears: "១៨១៧–១៨២៥",
    enFact: "Issued the Monroe Doctrine, warning Europe to stop colonising the Americas.",
    khFact: "បានចេញ Monroe Doctrine ដាស់តឿនអឺរ៉ុបឲ្យឈប់ធ្វើអាណានិគមលើទ្វីបអាមេរិក។", era: "founding" },
  { n: 6,  en: "John Quincy Adams",       kh: "John Quincy Adams",       party: "Dem.-Rep.",    enYears: "1825–1829", khYears: "១៨២៥–១៨២៩",
    enFact: "Son of the 2nd president; later returned to Congress and fought to end slavery.",
    khFact: "កូនរបស់ប្រធានាធិបតីទី ២ ; ក្រោយមកត្រឡប់ទៅសភា និងតស៊ូបញ្ឈប់ទាសភាព។", era: "founding" },
  { n: 7,  en: "Andrew Jackson",          kh: "Andrew Jackson",          party: "Democrat",     enYears: "1829–1837", khYears: "១៨២៩–១៨៣៧",
    enFact: "First 'common man' president; forced thousands of Native Americans onto the deadly Trail of Tears.",
    khFact: "ប្រធានាធិបតី 'មនុស្សធម្មតា' ដំបូង ; បានបង្ខំជនជាតិដើមរាប់ពាន់នាក់ឲ្យដើរលើ Trail of Tears ដ៏សាហាវ។", era: "antebellum" },
  { n: 8,  en: "Martin Van Buren",        kh: "Martin Van Buren",        party: "Democrat",     enYears: "1837–1841", khYears: "១៨៣៧–១៨៤១",
    enFact: "First president born as a U.S. citizen rather than a British subject; first language was Dutch.",
    khFact: "ប្រធានាធិបតីដំបូងគេកើតជាពលរដ្ឋអាមេរិកាំង មិនមែនជារាស្ត្រអង់គ្លេស ; ភាសាដំបូងគឺ Dutch។", era: "antebellum" },
  { n: 9,  en: "William Henry Harrison",  kh: "William H. Harrison",     party: "Whig",         enYears: "1841",      khYears: "១៨៤១",
    enFact: "Died of pneumonia just 31 days after taking office — the shortest presidency in U.S. history.",
    khFact: "បានស្លាប់ដោយជំងឺរលាកសួតគ្រាន់តែ ៣១ ថ្ងៃបន្ទាប់ពីចូលកាន់តំណែង — ជាការកាន់តំណែងខ្លីបំផុត។", era: "antebellum" },
  { n: 10, en: "John Tyler",              kh: "John Tyler",              party: "Whig",         enYears: "1841–1845", khYears: "១៨៤១–១៨៤៥",
    enFact: "First vice-president to take over after a death in office; expelled by his own party.",
    khFact: "អនុប្រធានាធិបតីដំបូងគេយកតំណែងបន្តបន្ទាប់ពីស្លាប់ ; ត្រូវបណ្ដេញចេញដោយគណបក្សផ្ទាល់របស់គេ។", era: "antebellum" },
  { n: 11, en: "James K. Polk",           kh: "James K. Polk",           party: "Democrat",     enYears: "1845–1849", khYears: "១៨៤៥–១៨៤៩",
    enFact: "Won the Mexican–American War, adding California, Texas, and the Southwest to the country.",
    khFact: "បានឈ្នះសង្គ្រាមអាមេរិក-ម៉ិកស៊ិក បន្ថែម California, Texas, និងភាគនិរតីឲ្យប្រទេស។", era: "antebellum" },
  { n: 12, en: "Zachary Taylor",          kh: "Zachary Taylor",          party: "Whig",         enYears: "1849–1850", khYears: "១៨៤៩–១៨៥០",
    enFact: "War hero turned president; died after only 16 months in office.",
    khFact: "វីរបុរសសង្គ្រាមក្លាយជាប្រធានាធិបតី ; ស្លាប់បន្ទាប់ពីត្រឹមតែ ១៦ ខែ។", era: "antebellum" },
  { n: 13, en: "Millard Fillmore",        kh: "Millard Fillmore",        party: "Whig",         enYears: "1850–1853", khYears: "១៨៥០–១៨៥៣",
    enFact: "Sent Commodore Perry to open trade with Japan.",
    khFact: "បានបញ្ជូន Commodore Perry ទៅបើកពាណិជ្ជកម្មជាមួយជប៉ុន។", era: "antebellum" },
  { n: 14, en: "Franklin Pierce",         kh: "Franklin Pierce",         party: "Democrat",     enYears: "1853–1857", khYears: "១៨៥៣–១៨៥៧",
    enFact: "Signed laws that pushed the country closer to the Civil War.",
    khFact: "បានចុះហត្ថលេខាលើច្បាប់ដែលរុញប្រទេសខិតទៅជិតសង្គ្រាមស៊ីវិល។", era: "antebellum" },
  { n: 15, en: "James Buchanan",          kh: "James Buchanan",          party: "Democrat",     enYears: "1857–1861", khYears: "១៨៥៧–១៨៦១",
    enFact: "Watched the country split apart and did nothing; only president who never married.",
    khFact: "បានមើលប្រទេសបែកបាក់ដោយមិនធ្វើអ្វី ; ប្រធានាធិបតីតែម្នាក់ដែលមិនដែលរៀបការ។", era: "civilwar" },
  { n: 16, en: "Abraham Lincoln",         kh: "Abraham Lincoln",         party: "Republican",   enYears: "1861–1865", khYears: "១៨៦១–១៨៦៥",
    enFact: "Led the Union through the Civil War and abolished slavery; assassinated in 1865.",
    khFact: "បានដឹកនាំសហព័ន្ធកាត់សង្គ្រាមស៊ីវិល និងបានបំបាត់ទាសភាព ; ត្រូវបានធ្វើឃាតក្នុងឆ្នាំ ១៨៦៥។", era: "civilwar" },
  { n: 17, en: "Andrew Johnson",          kh: "Andrew Johnson",          party: "Democrat",     enYears: "1865–1869", khYears: "១៨៦៥–១៨៦៩",
    enFact: "Took over after Lincoln's assassination; first president to be impeached.",
    khFact: "យកតំណែងបន្ទាប់ពីការធ្វើឃាត Lincoln ; ប្រធានាធិបតីដំបូងគេត្រូវបានចោទប្រកាន់។", era: "civilwar" },
  { n: 18, en: "Ulysses S. Grant",        kh: "Ulysses S. Grant",        party: "Republican",   enYears: "1869–1877", khYears: "១៨៦៩–១៨៧៧",
    enFact: "The Union general who won the Civil War; struggled with corruption as president.",
    khFact: "ឧត្តមសេនីយ៍សហព័ន្ធដែលឈ្នះសង្គ្រាមស៊ីវិល ; ពិបាកទប់ទល់អំពើពុករលួយ។", era: "civilwar" },
  { n: 19, en: "Rutherford B. Hayes",     kh: "Rutherford B. Hayes",     party: "Republican",   enYears: "1877–1881", khYears: "១៨៧៧–១៨៨១",
    enFact: "Won the most disputed election in U.S. history; ended Reconstruction in the South.",
    khFact: "បានឈ្នះការបោះឆ្នោតដែលជជែកគ្នាច្រើនជាងគេ ; បញ្ចប់ Reconstruction ភាគខាងត្បូង។", era: "civilwar" },
  { n: 20, en: "James A. Garfield",       kh: "James A. Garfield",       party: "Republican",   enYears: "1881",      khYears: "១៨៨១",
    enFact: "Shot four months after taking office; died after a long, painful summer.",
    khFact: "ត្រូវបានបាញ់ ៤ ខែបន្ទាប់ពីចូលកាន់តំណែង ; ស្លាប់បន្ទាប់ពីរដូវក្ដៅឈឺចាប់វែង។", era: "gildedage" },
  { n: 21, en: "Chester A. Arthur",       kh: "Chester A. Arthur",       party: "Republican",   enYears: "1881–1885", khYears: "១៨៨១–១៨៨៥",
    enFact: "Reformed the corrupt civil service so government jobs went to qualified people.",
    khFact: "បានកែទម្រង់រដ្ឋបាលពុករលួយ ដើម្បីការងាររដ្ឋាភិបាលឲ្យមនុស្សដែលមានគុណវុឌ្ឍិ។", era: "gildedage" },
  { n: 22, en: "Grover Cleveland",        kh: "Grover Cleveland",        party: "Democrat",     enYears: "1885–1889", khYears: "១៨៨៥–១៨៨៩",
    enFact: "Only president to serve two non-consecutive terms (also the 24th).",
    khFact: "ប្រធានាធិបតីតែម្នាក់ដែលបម្រើពីរអាណត្តិមិនជាប់គ្នា (ក៏ជាទី ២៤ ដែរ)។", era: "gildedage" },
  { n: 23, en: "Benjamin Harrison",       kh: "Benjamin Harrison",       party: "Republican",   enYears: "1889–1893", khYears: "១៨៨៩–១៨៩៣",
    enFact: "Grandson of the 9th president; brought electricity to the White House.",
    khFact: "ចៅរបស់ប្រធានាធិបតីទី ៩ ; បាននាំអគ្គិសនីចូល White House។", era: "gildedage" },
  { n: 24, en: "Grover Cleveland (2nd)",  kh: "Grover Cleveland (លើកទី ២)", party: "Democrat", enYears: "1893–1897", khYears: "១៨៩៣–១៨៩៧",
    enFact: "Returned to the White House four years after losing it.",
    khFact: "បានត្រឡប់ទៅ White House បួនឆ្នាំក្រោយការចាញ់។", era: "gildedage" },
  { n: 25, en: "William McKinley",        kh: "William McKinley",        party: "Republican",   enYears: "1897–1901", khYears: "១៨៩៧–១៩០១",
    enFact: "Won the Spanish–American War; assassinated in 1901.",
    khFact: "បានឈ្នះសង្គ្រាមអាមេរិក-អេស្ប៉ាញ ; ត្រូវបានធ្វើឃាតក្នុងឆ្នាំ ១៩០១។", era: "gildedage" },
  { n: 26, en: "Theodore Roosevelt",      kh: "Theodore Roosevelt",      party: "Republican",   enYears: "1901–1909", khYears: "១៩០១–១៩០៩",
    enFact: "Created the National Parks; built the Panama Canal; on Mount Rushmore.",
    khFact: "បានបង្កើតសួនជាតិ ; បានសាងសង់ Panama Canal ; នៅលើភ្នំ Rushmore។", era: "early20" },
  { n: 27, en: "William Howard Taft",     kh: "William H. Taft",         party: "Republican",   enYears: "1909–1913", khYears: "១៩០៩–១៩១៣",
    enFact: "Only person to be both president and Chief Justice of the Supreme Court.",
    khFact: "មនុស្សតែម្នាក់ដែលជាទាំងប្រធានាធិបតី និងប្រធានតុលាការកំពូល។", era: "early20" },
  { n: 28, en: "Woodrow Wilson",          kh: "Woodrow Wilson",          party: "Democrat",     enYears: "1913–1921", khYears: "១៩១៣–១៩២១",
    enFact: "Led the country through World War I; tried to create the League of Nations.",
    khFact: "បានដឹកនាំប្រទេសកាត់សង្គ្រាមលោកលើកទី ១ ; បានព្យាយាមបង្កើត League of Nations។", era: "early20" },
  { n: 29, en: "Warren G. Harding",       kh: "Warren G. Harding",       party: "Republican",   enYears: "1921–1923", khYears: "១៩២១–១៩២៣",
    enFact: "Promised a 'return to normalcy' after WWI; died suddenly in office.",
    khFact: "បានសន្យា 'ការត្រឡប់ទៅធម្មតា' បន្ទាប់ពីសង្គ្រាមលោកលើកទី ១ ; ស្លាប់ភ្លាមៗ។", era: "early20" },
  { n: 30, en: "Calvin Coolidge",         kh: "Calvin Coolidge",         party: "Republican",   enYears: "1923–1929", khYears: "១៩២៣–១៩២៩",
    enFact: "Famously quiet; presided over the booming Roaring Twenties.",
    khFact: "ល្បីដោយការស្ងាត់ ; បានដឹកនាំក្នុងអំឡុងទសវត្ស ១៩២០ ដែលរុងរឿង។", era: "early20" },
  { n: 31, en: "Herbert Hoover",          kh: "Herbert Hoover",          party: "Republican",   enYears: "1929–1933", khYears: "១៩២៩–១៩៣៣",
    enFact: "The Great Depression began months after he took office; voters blamed him.",
    khFact: "ការធ្លាក់ចុះសេដ្ឋកិច្ចធំចាប់ផ្ដើមប៉ុន្មានខែក្រោយចូលតំណែង ; អ្នកបោះឆ្នោតបានស្ដីបន្ទោសគេ។", era: "early20" },
  { n: 32, en: "Franklin D. Roosevelt",   kh: "Franklin D. Roosevelt",   party: "Democrat",     enYears: "1933–1945", khYears: "១៩៣៣–១៩៤៥",
    enFact: "Only president elected four times; led the country through the Depression and WWII.",
    khFact: "ប្រធានាធិបតីតែម្នាក់ដែលត្រូវបោះឆ្នោតជាប់ ៤ ដង ; បានដឹកនាំប្រទេសកាត់ Depression និងសង្គ្រាមលោកលើកទី ២។", era: "midcentury" },
  { n: 33, en: "Harry S. Truman",         kh: "Harry S. Truman",         party: "Democrat",     enYears: "1945–1953", khYears: "១៩៤៥–១៩៥៣",
    enFact: "Ordered the atomic bombs on Japan to end WWII; integrated the U.S. military.",
    khFact: "បានបញ្ជាបំផ្ទុះគ្រាប់បែកអាតូមលើជប៉ុនដើម្បីបញ្ចប់សង្គ្រាមលោកលើកទី ២ ; បានរួមបញ្ចូលកងទ័ព។", era: "midcentury" },
  { n: 34, en: "Dwight D. Eisenhower",    kh: "Dwight D. Eisenhower",    party: "Republican",   enYears: "1953–1961", khYears: "១៩៥៣–១៩៦១",
    enFact: "Allied general who beat Nazi Germany; built the interstate highway system.",
    khFact: "ឧត្តមសេនីយ៍សម្ព័ន្ធមិត្តដែលឈ្នះអាល្លឺម៉ង់ណាស៊ី ; បានសាងសង់ប្រព័ន្ធផ្លូវហាយវេយ។", era: "midcentury" },
  { n: 35, en: "John F. Kennedy",         kh: "John F. Kennedy",         party: "Democrat",     enYears: "1961–1963", khYears: "១៩៦១–១៩៦៣",
    enFact: "Promised to put a man on the Moon; assassinated in Dallas in 1963.",
    khFact: "បានសន្យានាំមនុស្សទៅព្រះច័ន្ទ ; ត្រូវបានធ្វើឃាតនៅ Dallas ក្នុងឆ្នាំ ១៩៦៣។", era: "midcentury" },
  { n: 36, en: "Lyndon B. Johnson",       kh: "Lyndon B. Johnson",       party: "Democrat",     enYears: "1963–1969", khYears: "១៩៦៣–១៩៦៩",
    enFact: "Signed the Civil Rights Act of 1964 and Voting Rights Act of 1965.",
    khFact: "បានចុះហត្ថលេខាលើ Civil Rights Act ១៩៦៤ និង Voting Rights Act ១៩៦៥។", era: "midcentury" },
  { n: 37, en: "Richard Nixon",           kh: "Richard Nixon",           party: "Republican",   enYears: "1969–1974", khYears: "១៩៦៩–១៩៧៤",
    enFact: "In office when Neil Armstrong walked on the Moon (1969); resigned over Watergate.",
    khFact: "នៅក្នុងតំណែងពេល Neil Armstrong ដើរលើព្រះច័ន្ទ (១៩៦៩) ; បានលាលែងពីជម្លោះ Watergate។", era: "modern" },
  { n: 38, en: "Gerald Ford",             kh: "Gerald Ford",             party: "Republican",   enYears: "1974–1977", khYears: "១៩៧៤–១៩៧៧",
    enFact: "Only president never elected as either president or vice-president.",
    khFact: "ប្រធានាធិបតីតែម្នាក់ដែលមិនដែលត្រូវបានបោះឆ្នោតជាប្រធានាធិបតី ឬអនុប្រធានាធិបតី។", era: "modern" },
  { n: 39, en: "Jimmy Carter",            kh: "Jimmy Carter",            party: "Democrat",     enYears: "1977–1981", khYears: "១៩៧៧–១៩៨១",
    enFact: "A peanut farmer from Georgia; later won the Nobel Peace Prize.",
    khFact: "កសិករសណ្ដែកដីពី Georgia ; ក្រោយមកបានឈ្នះរង្វាន់ Nobel សន្តិភាព។", era: "modern" },
  { n: 40, en: "Ronald Reagan",           kh: "Ronald Reagan",           party: "Republican",   enYears: "1981–1989", khYears: "១៩៨១–១៩៨៩",
    enFact: "A former movie actor; in office when the Cold War with the Soviet Union ended.",
    khFact: "អតីតតារាសម្ដែងភាពយន្ត ; នៅក្នុងតំណែងពេលសង្គ្រាមត្រជាក់ជាមួយសូវៀតបានបញ្ចប់។", era: "modern" },
  { n: 41, en: "George H. W. Bush",       kh: "George H. W. Bush",       party: "Republican",   enYears: "1989–1993", khYears: "១៩៨៩–១៩៩៣",
    enFact: "Led the U.S.-led coalition that pushed Iraq out of Kuwait in the 1991 Gulf War.",
    khFact: "បានដឹកនាំសម្ព័ន្ធមិត្តរុញអ៊ីរ៉ាក់ចេញពី Kuwait ក្នុងសង្គ្រាម Gulf ឆ្នាំ ១៩៩១។", era: "modern" },
  { n: 42, en: "Bill Clinton",            kh: "Bill Clinton",            party: "Democrat",     enYears: "1993–2001", khYears: "១៩៩៣–២០០១",
    enFact: "Presided over the early internet boom and a strong economy; impeached but stayed in office.",
    khFact: "បានដឹកនាំក្នុងការផ្ទុះចូលអ៊ីនធើណិតដំបូង និងសេដ្ឋកិច្ចរឹងមាំ ; ត្រូវបានចោទប្រកាន់ប៉ុន្តែនៅរក្សាតំណែង។", era: "modern" },
  { n: 43, en: "George W. Bush",          kh: "George W. Bush",          party: "Republican",   enYears: "2001–2009", khYears: "២០០១–២០០៩",
    enFact: "In office on 9/11; launched the wars in Afghanistan and Iraq.",
    khFact: "នៅក្នុងតំណែងថ្ងៃ ៩/១១ ; បានចាប់ផ្ដើមសង្គ្រាមនៅ Afghanistan និង Iraq។", era: "contemporary" },
  { n: 44, en: "Barack Obama",            kh: "Barack Obama",            party: "Democrat",     enYears: "2009–2017", khYears: "២០០៩–២០១៧",
    enFact: "First African-American president; passed the Affordable Care Act ('Obamacare').",
    khFact: "ប្រធានាធិបតីអាហ្វ្រិកាំង-អាមេរិកាំងដំបូង ; បានឆ្លងកាត់ Affordable Care Act ('Obamacare')។", era: "contemporary" },
  { n: 45, en: "Donald Trump",            kh: "Donald Trump",            party: "Republican",   enYears: "2017–2021", khYears: "២០១៧–២០២១",
    enFact: "First president with no prior government or military experience; impeached twice.",
    khFact: "ប្រធានាធិបតីដំបូងគ្មានបទពិសោធន៍រដ្ឋាភិបាល ឬកងទ័ពពីមុន ; ត្រូវបានចោទប្រកាន់ ២ ដង។", era: "contemporary" },
  { n: 46, en: "Joe Biden",               kh: "Joe Biden",               party: "Democrat",     enYears: "2021–2025", khYears: "២០២១–២០២៥",
    enFact: "Oldest person ever sworn in as president; previously vice-president to Obama.",
    khFact: "មនុស្សចាស់បំផុតដែលដែលបានស្បថចូលជាប្រធានាធិបតី ; ពីមុនជាអនុប្រធានាធិបតីរបស់ Obama។", era: "contemporary" },
];

function PresidentsList({ k, t }: { k: boolean; t: T }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Record<PresidentEra, boolean>>({
    founding:     true,
    antebellum:   false,
    civilwar:     true,
    gildedage:    false,
    early20:      false,
    midcentury:   true,
    modern:       false,
    contemporary: true,
  });

  const filtered = useMemo(() => {
    const raw = query.trim();
    const q = raw.toLowerCase();
    if (!q) return PRESIDENTS;
    // Normalise any Khmer digits in the query to ASCII so number search works
    // in both scripts.
    const ascii = raw.replace(/[០-៩]/g, (d) => String(KH_DIGITS.indexOf(d)));
    return PRESIDENTS.filter(
      (p) =>
        p.en.toLowerCase().includes(q) ||
        p.kh.includes(raw) ||
        p.enFact.toLowerCase().includes(q) ||
        String(p.n) === ascii
    );
  }, [query]);

  return (
    <div data-testid="presidents-list">
      {/* Search */}
      <div className="mb-4 flex items-center gap-3 flex-wrap">
        <div
          className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2 rounded-xl border-2 bg-white"
          style={{ borderColor: `${NAVY}33` }}
        >
          <Search className="w-4 h-4" aria-hidden="true" style={{ color: NAVY }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("Search by name, number, or fact…", "ស្វែងរកតាមឈ្មោះ លេខ ឬព័ត៌មាន…")}
            aria-label={t("Search presidents", "ស្វែងរកប្រធានាធិបតី")}
            className={`flex-1 outline-none bg-transparent text-sm ${k ? "font-khmer" : ""}`}
            data-testid="president-search"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="text-[10px] px-2 py-0.5 rounded-md text-white font-mono"
              style={{ backgroundColor: RED }}
            >
              {t("CLEAR", "សម្អាត")}
            </button>
          ) : null}
        </div>
        <div className="text-xs" style={{ color: INK_SOFT }}>
          <span className={k ? "font-khmer" : ""}>
            {t(`Showing ${filtered.length} of 46`, `បង្ហាញ ${toKhNum(filtered.length)} ក្នុងចំណោម ៤៦`)}
          </span>
        </div>
      </div>

      {query ? (
        // Flat list when searching
        <div className="grid sm:grid-cols-2 gap-2">
          {filtered.map((p) => (
            <PresidentRow key={p.n} k={k} p={p} />
          ))}
          {filtered.length === 0 ? (
            <div
              className="rounded-xl border-2 border-dashed p-4 text-center text-sm"
              style={{ borderColor: RULE, color: INK_SOFT }}
            >
              {t("No presidents matched your search.", "គ្មានប្រធានាធិបតីត្រូវនឹងការស្វែងរករបស់អ្នកទេ។")}
            </div>
          ) : null}
        </div>
      ) : (
        // Grouped collapsible eras when browsing
        <div className="space-y-3">
          {ERAS.map((era) => {
            const list = PRESIDENTS.filter((p) => p.era === era.key);
            const isOpen = open[era.key];
            return (
              <div
                key={era.key}
                className="rounded-2xl border-2 bg-white overflow-hidden"
                style={{ borderColor: `${NAVY}33` }}
                data-testid={`era-${era.key}`}
              >
                <button
                  onClick={() => setOpen((o) => ({ ...o, [era.key]: !o[era.key] }))}
                  aria-expanded={isOpen}
                  aria-controls={`era-panel-${era.key}`}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-stone-50"
                >
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4" style={{ color: NAVY }} />
                  ) : (
                    <ChevronRight className="w-4 h-4" style={{ color: NAVY }} />
                  )}
                  <div className="flex-1">
                    <div className={`font-bold text-sm sm:text-base ${k ? "font-khmer" : ""}`} style={{ color: NAVY_DEEP }}>
                      {k ? era.kh : era.en}
                    </div>
                    <div className="text-[11px] font-mono uppercase tracking-widest" style={{ color: RED_DEEP }}>
                      {era.range.replace(/[0-9]+/g, (n) => num(k, n))}
                    </div>
                  </div>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                    style={{ backgroundColor: NAVY_SOFT, color: NAVY_DEEP }}
                  >
                    {num(k, list.length)}
                  </span>
                </button>
                {isOpen ? (
                  <div
                    id={`era-panel-${era.key}`}
                    className="border-t border-dashed p-3 grid sm:grid-cols-2 gap-2"
                    style={{ borderColor: RULE }}
                  >
                    {list.map((p) => (
                      <PresidentRow key={p.n} k={k} p={p} />
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      <div
        className="mt-6 rounded-2xl border-2 p-4 flex items-start gap-3"
        style={{ borderColor: `${GOLD}66`, backgroundColor: GOLD_SOFT }}
      >
        <BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
        <p className={`text-xs ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK }}>
          {t(
            "Note: Grover Cleveland is counted twice (22 and 24) because he served two non-consecutive terms — that is why the 46 presidents have only 45 unique people.",
            "ចំណាំ ៖ Grover Cleveland ត្រូវរាប់ ២ ដង (២២ និង ២៤) ព្រោះគេបម្រើពីរអាណត្តិមិនជាប់គ្នា — នោះហើយជាមូលហេតុដែលប្រធានាធិបតី ៤៦ មានមនុស្សពិសេសត្រឹមតែ ៤៥ នាក់។"
          )}
        </p>
      </div>
    </div>
  );
}

function PresidentRow({ k, p }: { k: boolean; p: PresEntry }) {
  return (
    <div
      className="rounded-xl border p-3 bg-white flex gap-3"
      style={{ borderColor: `${NAVY}22` }}
      data-testid={`president-${p.n}`}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold text-white"
        style={{ backgroundColor: NAVY }}
      >
        {num(k, p.n)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <div className={`font-bold text-sm ${k ? "font-khmer" : ""}`} style={{ color: NAVY_DEEP }}>
            {k ? p.kh : p.en}
          </div>
          <div className="text-[10px] font-mono" style={{ color: INK_SOFT }}>
            {k ? p.khYears : p.enYears}
          </div>
          {p.party !== "—" ? (
            <span
              className="text-[10px] px-1.5 py-0.5 rounded font-mono uppercase tracking-widest"
              style={{
                backgroundColor: p.party === "Democrat" ? `${NAVY}1f` : p.party === "Republican" ? `${RED}1f` : `${GOLD}1f`,
                color: p.party === "Democrat" ? NAVY : p.party === "Republican" ? RED : GOLD,
              }}
            >
              {p.party}
            </span>
          ) : null}
        </div>
        <div className={`mt-1 text-[12px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK_SOFT }}>
          {k ? p.khFact : p.enFact}
        </div>
      </div>
    </div>
  );
}
