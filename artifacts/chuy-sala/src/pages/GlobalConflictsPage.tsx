import { useState } from "react";
import { Link } from "wouter";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  BookOpen,
  Bomb,
  Crosshair,
  Flag,
  FlaskConical,
  Globe2,
  HandshakeIcon,
  Radiation,
  Scroll,
  Shield,
  ShieldAlert,
  Skull,
  Swords,
  Users,
  Wind,
  Zap,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  HIST-CONF-01 · Global Conflicts & The Atomic Age
//                  ជម្លោះសកល និងយុគសម័យបរមាណូ
//
//  Tabbed module — 4 tabs:
//   1 · World War I — sepia "powder keg" archive
//   2 · World War II — slightly cooler sepia, two theaters
//   3 · The Manhattan Project — desert lab → starkness
//   4 · The Cold War & Proliferation — gray + warning red
//
//  Aesthetic: a "Historical Archive" that drifts from warm sepia to stark
//  high-contrast greys with nuclear-warning reds.
// ════════════════════════════════════════════════════════════════════════════

// Shared inks
const INK         = "#1c1917";
const INK_SOFT    = "#44403c";
const RULE        = "#d6d3d1";
const PARCHMENT   = "#f5efdf";

// Era palettes
const ERA = {
  ww1: {
    bg:     "#f3e7cf",
    paper:  "#fbf3df",
    accent: "#854d0e",
    deep:   "#5a3306",
    soft:   "#fde68a",
    text:   "#3f2a05",
  },
  ww2: {
    bg:     "#ede1c8",
    paper:  "#f7eed7",
    accent: "#7c2d12",
    deep:   "#451a03",
    soft:   "#fed7aa",
    text:   "#3c1707",
  },
  manhattan: {
    bg:     "#e7e5e4",
    paper:  "#f5f5f4",
    accent: "#0f766e",
    deep:   "#134e4a",
    soft:   "#ccfbf1",
    text:   "#1c1917",
  },
  cold: {
    bg:     "#1f2937",
    paper:  "#111827",
    accent: "#ef4444",
    deep:   "#7f1d1d",
    soft:   "#450a0a",
    text:   "#f9fafb",
  },
} as const;

type EraKey = keyof typeof ERA;

// ─── Khmer numerals ───────────────────────────────────────────────────────
const KH_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
function toKhNum(n: number | string): string {
  return String(n).replace(/[0-9]/g, (d) => KH_DIGITS[Number(d)]);
}
function num(k: boolean, n: number | string): string {
  return k ? toKhNum(n) : String(n);
}

type T = (en: string, kh: string) => string;

// ─── Layout helpers ───────────────────────────────────────────────────────

function SectionHeader({
  spec,
  en,
  kh,
  k,
  Icon,
  era,
}: {
  spec: string;
  en: string;
  kh: string;
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  era: EraKey;
}) {
  const p = ERA[era];
  const dark = era === "cold";
  return (
    <div className="mb-5 flex items-center gap-3 flex-wrap">
      <span
        className="font-mono text-[10px] tracking-[0.25em] uppercase rounded-md px-2.5 py-1 text-white"
        style={{ backgroundColor: p.accent }}
      >
        {spec}
      </span>
      <Icon className="w-5 h-5" style={{ color: p.accent }} />
      <h2
        className={`text-xl sm:text-2xl font-bold ${k ? "font-khmer" : ""}`}
        style={{ color: dark ? p.text : INK }}
      >
        {k ? kh : en}
      </h2>
      <div className="flex-1 border-t border-dashed" style={{ borderColor: dark ? "#475569" : RULE }} />
    </div>
  );
}

function P({
  k,
  en,
  kh,
  className,
  dark,
}: {
  k: boolean;
  en: string;
  kh: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <p
      className={`${className ?? ""} ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
      style={{ color: dark ? "#cbd5e1" : INK_SOFT }}
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
  era,
}: {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  k: boolean;
  enLabel: string;
  khLabel: string;
  value: string;
  enUnit?: string;
  khUnit?: string;
  era: EraKey;
}) {
  const p = ERA[era];
  const dark = era === "cold";
  return (
    <div
      className="rounded-2xl border-2 p-3 sm:p-4"
      style={{
        borderColor: `${p.accent}55`,
        backgroundColor: dark ? p.paper : "#ffffff",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4" style={{ color: p.accent }} />
        <div
          className={`text-[10px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
          style={{ color: p.accent }}
        >
          {k ? khLabel : enLabel}
        </div>
      </div>
      <div
        className="text-2xl sm:text-3xl font-extrabold leading-none"
        style={{ color: dark ? p.text : p.deep, fontFamily: k ? "Hanuman, serif" : undefined }}
      >
        {value}
      </div>
      {enUnit && khUnit ? (
        <div
          className={`mt-1 text-[11px] ${k ? "font-khmer" : ""}`}
          style={{ color: dark ? "#94a3b8" : INK_SOFT }}
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
  era,
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
  era: EraKey;
  children?: React.ReactNode;
}) {
  const p = ERA[era];
  const dark = era === "cold";
  return (
    <div
      className="rounded-3xl p-5 sm:p-6 border-2 flex flex-col"
      style={{
        borderColor: `${p.accent}66`,
        backgroundColor: dark ? p.paper : "#ffffff",
        boxShadow: `0 1px 0 ${p.accent}11, 0 12px 28px -22px ${p.accent}55`,
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${p.accent}1f`, border: `1px solid ${p.accent}55` }}
        >
          <Icon className="w-5 h-5" style={{ color: p.accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-lg sm:text-xl ${k ? "font-khmer" : ""}`} style={{ color: dark ? p.text : p.deep }}>
            {k ? khTitle : enTitle}
          </h3>
          <div
            className={`text-[11px] mt-0.5 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
            style={{ color: p.accent }}
          >
            {k ? khTag : enTag}
          </div>
        </div>
      </div>
      <P k={k} en={enBody} kh={khBody} className="text-sm sm:text-[15px] mb-3" dark={dark} />
      {children}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tab definitions
// ════════════════════════════════════════════════════════════════════════════

type TabKey = "ww1" | "ww2" | "manhattan" | "cold";

const TABS: {
  key: TabKey;
  era: EraKey;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enLabel: string;
  khLabel: string;
  enShort: string;
  khShort: string;
  enYears: string;
  khYears: string;
}[] = [
  { key: "ww1",       era: "ww1",       Icon: Crosshair,    enLabel: "World War I",            khLabel: "សង្គ្រាមលោកលើកទី ១",     enShort: "WW I",        khShort: "ស.ល. ១",   enYears: "1914–1918", khYears: "១៩១៤–១៩១៨" },
  { key: "ww2",       era: "ww2",       Icon: Globe2,       enLabel: "World War II",           khLabel: "សង្គ្រាមលោកលើកទី ២",     enShort: "WW II",       khShort: "ស.ល. ២",   enYears: "1939–1945", khYears: "១៩៣៩–១៩៤៥" },
  { key: "manhattan", era: "manhattan", Icon: Atom,         enLabel: "The Manhattan Project",  khLabel: "គម្រោងម៉ាន់ហាតាន់",       enShort: "Manhattan",   khShort: "ម៉ាន់ហាតាន់", enYears: "1942–1945", khYears: "១៩៤២–១៩៤៥" },
  { key: "cold",      era: "cold",      Icon: Radiation,    enLabel: "The Cold War",            khLabel: "សង្គ្រាមត្រជាក់",        enShort: "Cold War",    khShort: "ត្រជាក់",  enYears: "1947–1991", khYears: "១៩៤៧–១៩៩១" },
];

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export function GlobalConflictsPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";
  const [tab, setTab] = useState<TabKey>("ww1");
  const era = TABS.find((d) => d.key === tab)!.era;
  const p = ERA[era];
  const dark = era === "cold";

  const frame: React.CSSProperties = {
    backgroundColor: p.bg,
    backgroundImage: dark
      ? `radial-gradient(circle at 0% 0%, ${p.accent}22, transparent 45%),` +
        `radial-gradient(circle at 100% 100%, ${p.accent}11, transparent 45%)`
      : `repeating-linear-gradient(0deg, transparent, transparent 24px, ${p.accent}08 24px, ${p.accent}08 25px),` +
        `radial-gradient(circle at 0% 0%, ${p.accent}10, transparent 45%)`,
    transition: "background-color 0.4s ease",
  };

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={frame}>
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${k ? "font-khmer" : ""}`}
            style={{ color: dark ? p.text : p.deep }}
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
            borderColor: `${p.accent}55`,
            backgroundColor: dark ? p.paper : "#ffffff",
            backgroundImage: dark
              ? `linear-gradient(135deg, ${p.paper} 0%, #0f172a 100%)`
              : `linear-gradient(135deg, #ffffff 0%, ${p.soft}88 100%)`,
          }}
        >
          {/* Vintage stamp */}
          <div
            className="hidden sm:flex absolute top-5 right-5 w-28 h-28 rounded-full items-center justify-center text-center font-mono text-[10px] tracking-widest leading-tight"
            style={{
              border: `2px dashed ${p.accent}`,
              color: p.accent,
              transform: "rotate(-8deg)",
              opacity: 0.85,
            }}
            aria-hidden="true"
          >
            HISTORICAL
            <br />
            ARCHIVE
            <br />
            №&nbsp;01
          </div>

          <div
            className={`flex items-center gap-2 text-xs mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-[0.3em]"}`}
            style={{ color: p.accent }}
          >
            <span>{t("Study Center · History", "មជ្ឈមណ្ឌលសិក្សា · ប្រវត្តិសាស្ត្រ")}</span>
            <span>·</span>
            <span>HIST-CONF-01</span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl font-extrabold leading-tight max-w-3xl ${k ? "font-khmer leading-loose" : ""}`}
            style={{ color: dark ? p.text : p.deep }}
            data-testid="page-title"
          >
            {t(
              "Global Conflicts & The Atomic Age",
              "ជម្លោះសកល និងយុគសម័យបរមាណូ"
            )}
          </h1>
          <p
            className={`mt-3 text-sm sm:text-base max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: dark ? "#cbd5e1" : INK_SOFT }}
          >
            {t(
              "In just thirty-one years — from 1914 to 1945 — humanity built two world wars, killed more than 100 million of its own people, and then in a single morning in July 1945 split the atom and gave itself the power to destroy every city on Earth. This module walks through that single, unbroken story: from the trenches of World War I, to the global theatre of World War II, to the secret desert lab where the atomic bomb was born, to the half-century 'cold' standoff that followed.",
              "ត្រឹមតែ ៣១ ឆ្នាំ — ពីឆ្នាំ ១៩១៤ ដល់ ១៩៤៥ — មនុស្សជាតិបានបង្កើតសង្គ្រាមលោក ២ លើក សម្លាប់ប្រជាជនខ្លួនឯងជាង ១០០ លាននាក់ និងបន្ទាប់មកនៅព្រឹកមួយក្នុងខែកក្កដា ឆ្នាំ ១៩៤៥ បានបំបែកអាតូម ផ្ដល់ឲ្យខ្លួនឯងនូវអំណាចបំផ្លាញគ្រប់ទីក្រុងលើផែនដី។ មុខវិជ្ជានេះដើរតាមរឿងតែមួយដែលមិនដាច់នេះ ៖ ពីលំហដីសង្គ្រាមលោកលើកទី ១ ទៅរោងសង្គ្រាមលោកសកលលើកទី ២ ទៅមន្ទីរពិសោធន៍សម្ងាត់នៅវាលខ្សាច់ដែលគ្រាប់បែកបរមាណូត្រូវបានកើត និងទៅការតស៊ូ 'ត្រជាក់' កន្លះសតវត្សដែលបន្តបន្ទាប់។"
            )}
          </p>
        </header>

        {/* Tab navigation */}
        <div
          role="tablist"
          aria-label={t("Era tabs", "ផ្ទាំងយុគសម័យ")}
          className="mb-6 flex flex-wrap gap-2 p-2 rounded-2xl border-2"
          style={{ borderColor: `${p.accent}33`, backgroundColor: dark ? p.paper : "#ffffff" }}
          data-testid="tab-nav"
        >
          {TABS.map((tDef, i) => {
            const active = tab === tDef.key;
            const Icon = tDef.Icon;
            const tp = ERA[tDef.era];
            return (
              <button
                key={tDef.key}
                role="tab"
                id={`gc-tab-${tDef.key}`}
                aria-controls={`gc-panel-${tDef.key}`}
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
                      const el = document.getElementById(`gc-tab-${next.key}`);
                      el?.focus();
                    });
                  }
                }}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-bold transition-colors ${k ? "font-khmer" : ""}`}
                style={{
                  backgroundColor: active ? tp.accent : "transparent",
                  color: active ? "#ffffff" : dark ? p.text : tp.accent,
                  border: `1.5px solid ${active ? tp.accent : "transparent"}`,
                }}
                data-testid={`tab-${tDef.key}`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex flex-col items-start leading-tight">
                  <span className="hidden sm:inline">{k ? tDef.khLabel : tDef.enLabel}</span>
                  <span className="sm:hidden">{k ? tDef.khShort : tDef.enShort}</span>
                  <span
                    className="text-[9px] font-mono opacity-80"
                    style={{ color: active ? "#ffffff" : tp.accent }}
                  >
                    {k ? tDef.khYears : tDef.enYears}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab panels */}
        <div
          role="tabpanel"
          id={`gc-panel-${tab}`}
          aria-labelledby={`gc-tab-${tab}`}
          data-testid={`panel-${tab}`}
        >
          {tab === "ww1"       && <WW1Tab       k={k} t={t} />}
          {tab === "ww2"       && <WW2Tab       k={k} t={t} />}
          {tab === "manhattan" && <ManhattanTab k={k} t={t} />}
          {tab === "cold"      && <ColdWarTab   k={k} t={t} />}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold transition-opacity hover:opacity-90 ${k ? "font-khmer" : ""}`}
            style={{ backgroundColor: p.accent }}
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
//  TAB 01 · World War I — The Industrialization of War
// ════════════════════════════════════════════════════════════════════════════

function WW1Tab({ k, t }: { k: boolean; t: T }) {
  return (
    <section data-testid="tab-ww1">
      {/* Headline stats */}
      <div className="grid sm:grid-cols-4 gap-3 mb-8">
        <StatTile
          Icon={Skull}        k={k} era="ww1"
          enLabel="Total deaths"   khLabel="ស្លាប់សរុប"
          value={`~${num(k, 20)} M`}
          enUnit="soldiers + civilians, 1914–1918"
          khUnit="ទាហាន + ស៊ីវិល ឆ្នាំ ១៩១៤–១៩១៨"
        />
        <StatTile
          Icon={Flag}         k={k} era="ww1"
          enLabel="Countries fighting" khLabel="ប្រទេសច្បាំង"
          value={`${num(k, 32)}+`}
          enUnit="from Europe to Asia, Africa, the Pacific"
          khUnit="ពីអឺរ៉ុបដល់អាស៊ី អាហ្រ្វិក និងប៉ាស៊ីហ្វិក"
        />
        <StatTile
          Icon={Crosshair}    k={k} era="ww1"
          enLabel="Trench length" khLabel="ប្រវែងលំហដី"
          value={`~${num(k, "40,000")} km`}
          enUnit="enough to circle the Earth"
          khUnit="គ្រប់គ្រាន់ដើម្បីហ៊ុំជុំវិញផែនដី"
        />
        <StatTile
          Icon={Wind}         k={k} era="ww1"
          enLabel="New weapons" khLabel="អាវុធថ្មី"
          value={num(k, 5)}
          enUnit="machine gun, tank, plane, submarine, poison gas"
          khUnit="កាំភ្លើងយន្ត រថក្រោះ យន្តហោះ នាវាមុជទឹក ឧស្ម័នពុល"
        />
      </div>

      {/* The Powder Keg */}
      <SectionHeader spec="01a" en="The Powder Keg" kh="ធុងគ្រាប់ផ្ទុះ" k={k} Icon={HandshakeIcon} era="ww1" />

      <div className="grid lg:grid-cols-5 gap-5 mb-8">
        <div className="lg:col-span-3">
          <FeatureCard
            k={k}
            Icon={Scroll}
            era="ww1"
            enTitle="One assassination, one whole world at war"
            khTitle="ការធ្វើឃាតមួយ ពិភពលោកទាំងមូលច្បាំង"
            enTag="28 June 1914 · Sarajevo"
            khTag="២៨ មិថុនា ១៩១៤ · សារ៉ាយេវ៉ូ"
            enBody="On a summer morning in Sarajevo, a 19-year-old shot the heir to the Austro-Hungarian throne. Forty days later, the entire continent of Europe was at war — and within months, so were Russia, the Ottoman Empire, the Middle East, India, Australia, Japan, and eventually the United States. The reason a single pistol shot could do this was not the bullet. It was an invisible web of secret treaties: every great power had quietly promised to fight for its allies if they were attacked. When Austria attacked Serbia, Russia was bound to defend Serbia, Germany was bound to defend Austria, France was bound to defend Russia, Britain was bound to defend France. Like a row of dominoes, every promise fell into the next. In four weeks the world had committed to a war that no single country had wanted to fight."
            khBody="នៅព្រឹកមួយរដូវក្ដៅនៅទីក្រុងសារ៉ាយេវ៉ូ យុវវ័យអាយុ ១៩ ឆ្នាំម្នាក់បានបាញ់សម្លាប់រាជទាយាទនៃរាជបល្ល័ង្ក Austro-Hungarian។ ៤០ ថ្ងៃក្រោយមក ទ្វីបអឺរ៉ុបទាំងមូលស្ថិតក្នុងសង្គ្រាម — ហើយក្នុងរយៈពេលប៉ុន្មានខែ ក៏មានរុស្ស៊ី អាណាចក្រអ៊ុតម៉ង់ មជ្ឈិមបូព៌ា ឥណ្ឌា អូស្ត្រាលី ជប៉ុន និងចុងក្រោយសហរដ្ឋអាមេរិកផងដែរ។ មូលហេតុដែលគ្រាប់កាំភ្លើងតែមួយអាចធ្វើដូច្នេះបាន មិនមែនជាគ្រាប់ទេ។ វាជាបណ្ដាញសម្ងាត់នៃសន្ធិសញ្ញា ៖ មហាអំណាចគ្រប់ខ្លួនបានសន្យាស្ងាត់ៗថា នឹងច្បាំងជំនួសសម្ព័ន្ធមិត្តរបស់ខ្លួន បើពួកគេត្រូវវាយប្រហារ។ ពេល Austria វាយ Serbia, Russia ត្រូវការពារ Serbia, Germany ត្រូវការពារ Austria, France ត្រូវការពារ Russia, Britain ត្រូវការពារ France។ ដូចជាជួរដុំដូមីណូ ការសន្យាគ្រប់មួយធ្លាក់ទៅមួយបន្ទាប់។ ក្នុងរយៈពេល ៤ សប្ដាហ៍ ពិភពលោកបានប្ដេជ្ញាចូលសង្គ្រាមដែលគ្មានប្រទេសណាមួយចង់ច្បាំងទេ។"
          />
        </div>
        <div className="lg:col-span-2">
          <AllianceWeb k={k} />
        </div>
      </div>

      {/* Trench Warfare */}
      <SectionHeader spec="01b" en="Trench Warfare" kh="សង្គ្រាមលំហដី" k={k} Icon={Crosshair} era="ww1" />

      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <FeatureCard
          k={k}
          Icon={Crosshair}
          era="ww1"
          enTitle="Old tactics meet new machines"
          khTitle="យុទ្ធសាស្ត្រចាស់ ជួបនឹងម៉ាស៊ីនថ្មី"
          enTag="machine guns vs. cavalry charges"
          khTag="កាំភ្លើងយន្ត ទល់នឹងការវាយបុកអ្នកទ័ពសេះ"
          enBody="The generals of 1914 had learned to fight in the days when armies marched in straight lines and charged with bayonets. They walked their men into a war that had something none of those old wars had: the machine gun. A single machine gun, fired by two soldiers, could put down 600 bullets a minute — more than an entire infantry regiment from a hundred years earlier. Within weeks, both sides realised that anyone who stood up was killed. So both sides dug into the ground. Two parallel lines of trenches were carved across France, from the Belgian coast to the Swiss border — about 700 km long, but with all the side trenches, support trenches, and communication lines, the total length came to roughly 40,000 km. Soldiers lived in mud, with rats, lice, and the constant noise of artillery, for four years. The new weapons (poison gas, the tank, the airplane) were each invented in turn to break this stalemate, but mostly they just made the killing more efficient."
          khBody="ឧត្តមសេនីយ៍ឆ្នាំ ១៩១៤ បានរៀនច្បាំងពីសម័យដែលកងទ័ពដើរជាជួរត្រង់ និងវាយបុកដោយដាវ។ ពួកគេនាំទាហានចូលសង្គ្រាមដែលមានរបស់ដែលគ្មានសង្គ្រាមចាស់ៗណាមួយមាន ៖ កាំភ្លើងយន្ត។ កាំភ្លើងយន្តតែមួយ បាញ់ដោយទាហាន ២ នាក់ អាចបាញ់គ្រាប់ ៦០០ ក្នុងមួយនាទី — ច្រើនជាងកងទ័ពថ្មើរជើងទាំងមូលពីរយឆ្នាំមុន។ ក្នុងរយៈពេលប៉ុន្មានសប្ដាហ៍ ភាគីទាំងពីរបានដឹងថា អ្នកដែលក្រោកឈរត្រូវសម្លាប់។ ដូច្នេះភាគីទាំងពីរបានជីកចូលដី។ ខ្សែលំហដីស្របគ្នាពីរត្រូវបានឆ្លាក់ឆ្លងកាត់ប្រទេសបារាំង ពីឆ្នេរ Belgian ដល់ព្រំដែន Swiss — ប្រវែងប្រហែល ៧០០ គីឡូម៉ែត្រ ប៉ុន្តែជាមួយលំហដីខាង លំហដីគាំទ្រ និងខ្សែទំនាក់ទំនងទាំងអស់ ប្រវែងសរុបដល់ប្រមាណ ៤០,០០០ គីឡូម៉ែត្រ។ ទាហានរស់នៅក្នុងភក់ ជាមួយកណ្ដុរ ចៃ និងសំឡេងគ្រាប់ផ្លោងរហូត ក្នុងរយៈពេល ៤ ឆ្នាំ។ អាវុធថ្មី (ឧស្ម័នពុល រថក្រោះ យន្តហោះ) ត្រូវបានបង្កើតម្ដងមួយដើម្បីបំបែកស្ថានភាពជាប់គាំងនេះ ប៉ុន្តែភាគច្រើនពួកវាគ្រាន់តែធ្វើឲ្យការសម្លាប់មានប្រសិទ្ធភាពជាងមុន។"
        />
        <TrenchCrossSection k={k} />
      </div>
    </section>
  );
}

// ─── Alliance web visualization ───────────────────────────────────────────

function AllianceWeb({ k }: { k: boolean }) {
  // Two clusters: Triple Entente vs Central Powers
  const entente: { x: number; y: number; en: string; kh: string }[] = [
    { x: 80,  y:  50, en: "FRANCE",  kh: "បារាំង" },
    { x: 50,  y: 130, en: "BRITAIN", kh: "អង់គ្លេស" },
    { x: 110, y: 200, en: "RUSSIA",  kh: "រុស្ស៊ី" },
  ];
  const central: { x: number; y: number; en: string; kh: string }[] = [
    { x: 280, y:  50, en: "GERMANY",  kh: "អាល្លឺម៉ង់" },
    { x: 310, y: 130, en: "AUSTRIA",  kh: "អូទ្រីស" },
    { x: 250, y: 200, en: "OTTOMAN",  kh: "អុតម៉ង់" },
  ];
  const p = ERA.ww1;
  return (
    <div
      className="rounded-2xl border-2 p-3 sm:p-4 h-full bg-white"
      style={{ borderColor: `${p.accent}55` }}
      data-testid="alliance-web"
    >
      <div className={`text-xs font-bold mb-1 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: p.accent }}>
        {k ? "បណ្ដាញសម្ព័ន្ធមិត្ត ១៩១៤" : "ALLIANCE WEB · 1914"}
      </div>
      <svg viewBox="0 0 360 270" className="w-full h-auto" role="img" aria-label="Alliance web 1914">
        {/* Entente alliance lines */}
        {[
          [entente[0], entente[1]],
          [entente[1], entente[2]],
          [entente[0], entente[2]],
        ].map(([a, b], i) => (
          <line key={`ent-${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#1e40af" strokeWidth="2" strokeDasharray="4 3" />
        ))}
        {/* Central powers alliance lines */}
        {[
          [central[0], central[1]],
          [central[1], central[2]],
          [central[0], central[2]],
        ].map(([a, b], i) => (
          <line key={`cen-${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#991b1b" strokeWidth="2" strokeDasharray="4 3" />
        ))}
        {/* Spark — Sarajevo assassination */}
        <g transform="translate(180,135)">
          <circle r="14" fill="#fbbf24" />
          <circle r="10" fill="#f59e0b" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (Math.PI * 2 * i) / 8;
            return (
              <line
                key={i}
                x1={Math.cos(a) * 14}
                y1={Math.sin(a) * 14}
                x2={Math.cos(a) * 22}
                y2={Math.sin(a) * 22}
                stroke="#dc2626"
                strokeWidth="1.5"
              />
            );
          })}
          <text y="40" textAnchor="middle" fontSize="9" fontFamily={k ? "Hanuman, serif" : "monospace"} fill={p.deep}>
            {k ? "សារ៉ាយេវ៉ូ" : "SARAJEVO"}
          </text>
          <text y="50" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={p.accent}>
            {num(k, "28·06·1914")}
          </text>
        </g>
        {/* Hostility line between camps */}
        <path
          d="M150,135 L210,135"
          stroke="#dc2626"
          strokeWidth="1.5"
          strokeDasharray="2 2"
          opacity="0.4"
        />
        {/* Country nodes */}
        {entente.map((c) => (
          <g key={c.en} transform={`translate(${c.x},${c.y})`}>
            <circle r="22" fill="#1e40af" />
            <text y="-26" textAnchor="middle" fontSize="9" fontFamily={k ? "Hanuman, serif" : "monospace"} fill={p.deep}>
              {k ? c.kh : c.en}
            </text>
            <Flag5 fill="#ffffff" />
          </g>
        ))}
        {central.map((c) => (
          <g key={c.en} transform={`translate(${c.x},${c.y})`}>
            <circle r="22" fill="#991b1b" />
            <text y="-26" textAnchor="middle" fontSize="9" fontFamily={k ? "Hanuman, serif" : "monospace"} fill={p.deep}>
              {k ? c.kh : c.en}
            </text>
            <Flag5 fill="#ffffff" />
          </g>
        ))}
        {/* Legend */}
        <g transform="translate(8,255)">
          <rect width="10" height="10" fill="#1e40af" />
          <text x="14" y="9" fontSize="8" fontFamily={k ? "Hanuman, serif" : "monospace"} fill={p.deep}>
            {k ? "សម្ព័ន្ធ Entente" : "TRIPLE ENTENTE"}
          </text>
          <rect x="120" width="10" height="10" fill="#991b1b" />
          <text x="134" y="9" fontSize="8" fontFamily={k ? "Hanuman, serif" : "monospace"} fill={p.deep}>
            {k ? "មហាអំណាចកណ្ដាល" : "CENTRAL POWERS"}
          </text>
        </g>
      </svg>
      <div className={`mt-1 text-[11px] text-center ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
        {k
          ? "ការសន្យាសម្ងាត់រួមបញ្ចូលប្រទេសទាំងអស់ក្នុងរយៈពេល ៤០ ថ្ងៃ។"
          : "Secret promises pulled every country in within 40 days."}
      </div>
    </div>
  );
}

function Flag5({ fill }: { fill: string }) {
  return (
    <g transform="translate(-5,-3)">
      <rect width="10" height="6" fill={fill} opacity="0.9" />
    </g>
  );
}

// ─── Trench cross-section ─────────────────────────────────────────────────

function TrenchCrossSection({ k }: { k: boolean }) {
  const p = ERA.ww1;
  return (
    <div
      className="rounded-2xl border-2 p-3 sm:p-4 bg-white"
      style={{ borderColor: `${p.accent}55` }}
      data-testid="trench-cross-section"
    >
      <div className={`text-xs font-bold mb-1 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: p.accent }}>
        {k ? "មុខកាត់លំហដី" : "TRENCH · CROSS-SECTION"}
      </div>
      <svg viewBox="0 0 380 240" className="w-full h-auto" role="img" aria-label="Trench cross-section">
        {/* sky */}
        <rect width="380" height="100" fill="#e7d6a8" />
        {/* earth */}
        <path
          d="M0,100 L0,240 L380,240 L380,100
             L260,100 L260,140 L240,140 L240,170 L260,170 L260,200 L150,200 L150,170 L130,170 L130,140 L150,140 L150,100 Z"
          fill="#8b6f3f"
        />
        <path
          d="M0,100 L0,240 L380,240 L380,100
             L260,100 L260,140 L240,140 L240,170 L260,170 L260,200 L150,200 L150,170 L130,170 L130,140 L150,140 L150,100 Z"
          fill="#5a4523"
          opacity="0.4"
        />
        {/* sandbags top */}
        {Array.from({ length: 7 }).map((_, i) => (
          <ellipse key={`sb1-${i}`} cx={20 + i * 18} cy={98} rx="9" ry="4" fill="#a8884a" stroke={p.deep} strokeWidth="0.5" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <ellipse key={`sb2-${i}`} cx={272 + i * 14} cy={98} rx="8" ry="4" fill="#a8884a" stroke={p.deep} strokeWidth="0.5" />
        ))}
        {/* barbed wire */}
        <g stroke="#3f2a05" strokeWidth="1">
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i}>
              <line x1={150 + i * 22} y1={92} x2={150 + i * 22} y2={70} />
              <line x1={150 + i * 22 - 4} y1={78} x2={150 + i * 22 + 4} y2={82} />
              <line x1={150 + i * 22 - 4} y1={82} x2={150 + i * 22 + 4} y2={78} />
            </g>
          ))}
        </g>
        {/* soldier silhouettes */}
        <g fill="#1c1917">
          <circle cx="80"  cy="155" r="6" />
          <rect x="76" y="161" width="8" height="14" />
        </g>
        <g fill="#1c1917">
          <circle cx="320" cy="155" r="6" />
          <rect x="316" y="161" width="8" height="14" />
        </g>
        {/* labels */}
        <text x="80"  y="220" fontSize="9" textAnchor="middle" fill="#fff" fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "សម្ព័ន្ធ" : "ALLIES"}
        </text>
        <text x="320" y="220" fontSize="9" textAnchor="middle" fill="#fff" fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "មហាអំណាចកណ្ដាល" : "CENTRAL"}
        </text>
        <text x="190" y="58" fontSize="9" textAnchor="middle" fill={p.deep} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "តំបន់គ្មានមនុស្ស" : "NO MAN'S LAND"}
        </text>
        <text x="190" y="46" fontSize="7" textAnchor="middle" fill={p.accent} fontFamily="monospace">
          {k ? "~១០០–៣០០ ម៉ែត្រ" : "~100–300 m"}
        </text>
        {/* arrow callouts */}
        <text x="10"  y="92" fontSize="7" fill={p.deep} fontFamily="monospace">SANDBAGS</text>
        <text x="10"  y="195" fontSize="7" fill="#fff" fontFamily="monospace">FIRE STEP</text>
      </svg>
      <div className={`mt-1 text-[11px] text-center ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
        {k
          ? "លំហដី ២ ខ្សែស្របគ្នា · មនុស្សរស់នៅក្នុងភក់ ៤ ឆ្នាំ។"
          : "Two parallel trench lines · men lived in mud for four years."}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  TAB 02 · World War II — The Global Theatre
// ════════════════════════════════════════════════════════════════════════════

function WW2Tab({ k, t: _t }: { k: boolean; t: T }) {
  return (
    <section data-testid="tab-ww2">
      <div className="grid sm:grid-cols-4 gap-3 mb-8">
        <StatTile
          Icon={Skull}     k={k} era="ww2"
          enLabel="Total deaths" khLabel="ស្លាប់សរុប"
          value={`~${num(k, 75)} M`}
          enUnit="the deadliest conflict in human history"
          khUnit="ជម្លោះស្លាប់ខ្លាំងជាងគេក្នុងប្រវត្តិមនុស្ស"
        />
        <StatTile
          Icon={Users}     k={k} era="ww2"
          enLabel="Civilian deaths" khLabel="ស្លាប់ស៊ីវិល"
          value={`~${num(k, 50)} M`}
          enUnit="for the first time, more civilians than soldiers"
          khUnit="ជាលើកដំបូង ស៊ីវិលស្លាប់ច្រើនជាងទាហាន"
        />
        <StatTile
          Icon={Flag}      k={k} era="ww2"
          enLabel="Years"  khLabel="ឆ្នាំ"
          value={num(k, 6)}
          enUnit="from Sept 1939 (Europe) to Sept 1945 (Pacific)"
          khUnit="ពីកញ្ញា ១៩៣៩ (អឺរ៉ុប) ដល់កញ្ញា ១៩៤៥ (ប៉ាស៊ីហ្វិក)"
        />
        <StatTile
          Icon={Skull}     k={k} era="ww2"
          enLabel="Holocaust (Shoah)" khLabel="ហូឡូខូស្ត (សូអា)"
          value={`~${num(k, 6)} M`}
          enUnit="Jews murdered by Nazi Germany"
          khUnit="ជនជាតិយូដាដែលត្រូវរដ្ឋាភិបាលណាស៊ីសម្លាប់"
        />
      </div>

      {/* The Scale */}
      <SectionHeader spec="02a" en="The Scale: Two Theaters" kh="ទំហំ ៖ រោងមហោស្រព ២" k={k} Icon={Globe2} era="ww2" />

      <TwoTheatersMap k={k} />

      <div className="grid lg:grid-cols-2 gap-5 mt-6 mb-8">
        <FeatureCard
          k={k}
          Icon={Swords}
          era="ww2"
          enTitle="The European Theater"
          khTitle="រោងសង្គ្រាមអឺរ៉ុប"
          enTag="vs. Fascism · vs. the Holocaust"
          khTag="ទល់នឹងហ្វាស៊ីស្ត៍ · ទល់នឹងសោកនាដកម្ម"
          enBody="Adolf Hitler's Nazi Germany invaded Poland on 1 September 1939, then France, then much of the Soviet Union. The war in Europe was a fight against Fascism — a political idea that one race or one nation should rule everyone else by force. As the German army advanced, it carried out the Holocaust (in Hebrew, the Shoah): the deliberate, industrial murder of about six million Jewish people, plus millions of Roma, disabled people, Soviet prisoners, and political opponents. Whole families were rounded up, transported in cattle wagons, and killed in purpose-built camps. The European war ended on 8 May 1945 when Berlin fell to the Soviet army, and Hitler took his own life in an underground bunker."
          khBody="អាល្លឺម៉ង់ណាស៊ីរបស់ Adolf Hitler បានឈ្លានពានប៉ូឡូញនៅថ្ងៃទី ១ កញ្ញា ១៩៣៩ បន្ទាប់មកបារាំង បន្ទាប់មកភាគច្រើននៃសហភាពសូវៀត។ សង្គ្រាមនៅអឺរ៉ុបជាការតស៊ូប្រឆាំងហ្វាស៊ីស្ត៍ — គំនិតនយោបាយដែលជាតិសាសន៍មួយ ឬប្រទេសមួយគួរគ្រប់គ្រងអ្នកដទៃដោយកម្លាំង។ នៅពេលកងទ័ពអាល្លឺម៉ង់រីកមុខ វាបានធ្វើ ហូឡូខូស្ត (ភាសាហេប្រ៊ូ ៖ សូអា) ៖ ការសម្លាប់ឧស្សាហកម្មដោយចេតនានូវជនជាតិយូដាប្រហែល ៦ លាននាក់ បូករួមនឹងជនជាតិ Roma ជនពិការ អ្នកទោសសូវៀត និងគូបដិបក្ខនយោបាយរាប់លាននាក់ទៀត។ ក្រុមគ្រួសារទាំងមូលត្រូវបានចាប់ ដឹកជញ្ជូនក្នុងរទេះគោក្របី និងសម្លាប់ក្នុងជំរំសាងសង់ដើម្បីគោលបំណងនេះ។ សង្គ្រាមអឺរ៉ុបបានបញ្ចប់នៅថ្ងៃទី ៨ ឧសភា ១៩៤៥ នៅពេល Berlin ធ្លាក់ទៅកងទ័ពសូវៀត ហើយ Hitler បានសម្លាប់ខ្លួនក្នុងក្រោមដី។"
        />

        <FeatureCard
          k={k}
          Icon={Crosshair}
          era="ww2"
          enTitle="The Pacific Theater"
          khTitle="រោងសង្គ្រាមប៉ាស៊ីហ្វិក"
          enTag="vs. Imperial Japan"
          khTag="ទល់នឹងជប៉ុនអធិរាជ"
          enBody="On the morning of 7 December 1941, Imperial Japan launched a surprise air attack on the U.S. naval base at Pearl Harbor in Hawaii — and the war became truly global. Across the next four years, fighting moved island by island across an ocean larger than every continent on Earth combined: the Philippines, Guadalcanal, Iwo Jima, Okinawa. The Imperial Japanese Army also occupied much of China, Korea, Vietnam, Indonesia, the Philippines, and even Cambodia, often committing terrible atrocities against civilians. The Pacific war did not end with a battle. It ended in August 1945, when the United States dropped two atomic bombs on the Japanese cities of Hiroshima and Nagasaki — described in the next tab."
          khBody="នៅព្រឹកថ្ងៃទី ៧ ធ្នូ ១៩៤១ ជប៉ុនអធិរាជបានចាប់ផ្ដើមការវាយប្រហារពីលើអាកាសភ្លាមៗលើមូលដ្ឋាននាវាសហរដ្ឋអាមេរិកនៅ Pearl Harbor ក្នុងរដ្ឋ Hawaii — ហើយសង្គ្រាមបានក្លាយជាសកលពិតប្រាកដ។ ក្នុងរយៈពេល ៤ ឆ្នាំបន្ទាប់ ការច្បាំងបានផ្លាស់ប្ដូរកោះមួយ ៗ ឆ្លងកាត់មហាសមុទ្រធំជាងគ្រប់ទ្វីបនៅលើផែនដីរួមបញ្ចូលគ្នា ៖ ហ្វីលីពីន Guadalcanal Iwo Jima Okinawa។ កងទ័ពអធិរាជជប៉ុនក៏បានកាន់កាប់ភាគច្រើននៃចិន កូរ៉េ វៀតណាម ឥណ្ឌូនេស៊ី ហ្វីលីពីន និងសូម្បីតែកម្ពុជា ដោយតែងតែប្រព្រឹត្តអំពើឃោរឃៅភយាន្តប្រឆាំងស៊ីវិល។ សង្គ្រាមប៉ាស៊ីហ្វិកមិនបានបញ្ចប់ដោយការចាប់ប្រយុទ្ធទេ។ វាបានបញ្ចប់នៅខែសីហា ១៩៤៥ នៅពេលសហរដ្ឋអាមេរិកបានទម្លាក់គ្រាប់បែកបរមាណូ ២ លើទីក្រុងជប៉ុន Hiroshima និង Nagasaki — ដែលត្រូវបានពណ៌នាក្នុងផ្ទាំងបន្ទាប់។"
        />
      </div>

      {/* The Turning Point — industry */}
      <SectionHeader spec="02b" en="The Turning Point: Industry & Science" kh="ចំណុចបង្វែរ ៖ ឧស្សាហកម្ម និងវិទ្យាសាស្ត្រ" k={k} Icon={FlaskConical} era="ww2" />

      <div className="grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <FeatureCard
            k={k}
            Icon={FlaskConical}
            era="ww2"
            enTitle="Factories won the war as much as soldiers"
            khTitle="រោងចក្រឈ្នះសង្គ្រាមដូចទាហានដែរ"
            enTag="who could out-build the other"
            khTag="នរណាអាចកសាងលើសម្រាប់អ្នកដទៃ"
            enBody="The lesson of the Second World War was simple and frightening: the country that could build more tanks, more planes, and more ships, faster, would win — even if it lost more soldiers in every individual battle. The United States, safe behind two oceans, switched its civilian factories to war production almost overnight. Car factories built tanks. Refrigerator factories built bombs. By 1944 the U.S. was producing one fully-armed warplane every five minutes, around the clock. The Soviet Union, attacked on its own soil, picked up its factories and physically moved them east of the Ural Mountains, then out-produced Germany in tanks 4-to-1. Science was just as important: radar (covered in our Radar module), penicillin, code-breaking computers at Bletchley Park, jet engines, and — most consequential of all — the bomb that we will see in the next tab."
            khBody="មេរៀននៃសង្គ្រាមលោកលើកទី ២ គឺសាមញ្ញ និងគួរឲ្យភ័យខ្លាច ៖ ប្រទេសដែលអាចកសាងរថក្រោះច្រើនជាង យន្តហោះច្រើនជាង និងនាវាច្រើនជាង ដោយឆាប់ជាង នឹងឈ្នះ — ទោះបីបាត់បង់ទាហានច្រើនជាងក្នុងគ្រប់ការប្រយុទ្ធនីមួយៗក៏ដោយ។ សហរដ្ឋអាមេរិក ដែលមានសុវត្ថិភាពនៅក្រោយមហាសមុទ្រ ២ បានប្ដូររោងចក្រស៊ីវិលរបស់ខ្លួនទៅជាផលិតកម្មសង្គ្រាមស្ទើរតែភ្លាមៗ។ រោងចក្រឡានបានកសាងរថក្រោះ។ រោងចក្រទូទឹកកកបានកសាងគ្រាប់បែក។ នៅឆ្នាំ ១៩៤៤ សហរដ្ឋអាមេរិកកំពុងផលិតយន្តហោះច្បាំងពេញលេញមួយរៀងរាល់ ៥ នាទី ២៤ ម៉ោងពេញ។ សហភាពសូវៀត ដែលត្រូវវាយប្រហារនៅលើដីខ្លួនឯង បានយករោងចក្រខ្លួន និងផ្លាស់ទីជារូបរាងកាយទៅខាងកើតភ្នំ Ural បន្ទាប់មកផលិតរថក្រោះច្រើនជាងអាល្លឺម៉ង់ ៤ ដង។ វិទ្យាសាស្ត្រមានសារៈសំខាន់ដូចគ្នា ៖ រ៉ាដារ (បានគ្របដណ្តប់ក្នុងមុខវិជ្ជារ៉ាដាររបស់យើង) ប៉េនីស៊ីលីន កុំព្យូទ័របំបែកលេខកូដនៅ Bletchley Park ម៉ាស៊ីនយន្ត និង — សំខាន់បំផុត — គ្រាប់បែកដែលយើងនឹងឃើញនៅផ្ទាំងបន្ទាប់។"
          />
        </div>
        <div className="lg:col-span-2">
          <ProductionBars k={k} />
        </div>
      </div>
    </section>
  );
}

// ─── Two Theaters world map (schematic) ───────────────────────────────────

function TwoTheatersMap({ k }: { k: boolean }) {
  const p = ERA.ww2;
  return (
    <div
      className="rounded-2xl border-2 p-3 sm:p-4 bg-white"
      style={{ borderColor: `${p.accent}55` }}
      data-testid="two-theaters"
    >
      <div className={`text-xs font-bold mb-1 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: p.accent }}>
        {k ? "រោងមហោស្រព ២ ៖ អឺរ៉ុប និងប៉ាស៊ីហ្វិក" : "TWO THEATERS · EUROPE & PACIFIC"}
      </div>
      <svg viewBox="0 0 720 240" className="w-full h-auto" role="img" aria-label="Two theaters map">
        {/* Ocean */}
        <rect width="720" height="240" fill="#cfe2f3" />
        {/* North America */}
        <path d="M30,40 L150,30 L200,90 L160,180 L60,170 Z" fill="#c5b58a" stroke="#78350f" strokeWidth="0.6" />
        <text x="100" y="115" fontSize="9" textAnchor="middle" fill="#78350f" fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "សហរដ្ឋអាមេរិក" : "USA"}
        </text>
        {/* South America */}
        <path d="M120,170 L170,170 L160,230 L130,235 L110,210 Z" fill="#c5b58a" stroke="#78350f" strokeWidth="0.6" />
        {/* Europe */}
        <path d="M280,40 L370,30 L380,100 L300,110 L270,80 Z" fill="#c5b58a" stroke="#78350f" strokeWidth="0.6" />
        {/* Africa */}
        <path d="M295,110 L370,105 L380,200 L320,225 L290,200 L300,150 Z" fill="#c5b58a" stroke="#78350f" strokeWidth="0.6" />
        {/* Asia */}
        <path d="M380,30 L580,40 L600,120 L500,140 L420,120 L380,100 Z" fill="#c5b58a" stroke="#78350f" strokeWidth="0.6" />
        <text x="490" y="90" fontSize="9" textAnchor="middle" fill="#78350f" fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ចិន · ឥណ្ឌា" : "CHINA · INDIA"}
        </text>
        {/* Japan */}
        <ellipse cx="615" cy="90" rx="14" ry="22" fill="#c5b58a" stroke="#78350f" strokeWidth="0.6" />
        <text x="615" y="125" fontSize="8" textAnchor="middle" fill="#78350f" fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ជប៉ុន" : "JAPAN"}
        </text>
        {/* Australia */}
        <path d="M540,180 L610,180 L620,225 L550,225 Z" fill="#c5b58a" stroke="#78350f" strokeWidth="0.6" />

        {/* Europe theater overlay */}
        <ellipse cx="325" cy="80" rx="80" ry="55" fill="#dc2626" opacity="0.2" />
        <ellipse cx="325" cy="80" rx="80" ry="55" fill="none" stroke="#7f1d1d" strokeWidth="2" strokeDasharray="5 4" />
        <text x="325" y="20" fontSize="11" fontWeight="700" textAnchor="middle" fill="#7f1d1d" fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "រោងសង្គ្រាមអឺរ៉ុប" : "EUROPEAN THEATER"}
        </text>

        {/* Pacific theater overlay */}
        <ellipse cx="615" cy="155" rx="80" ry="80" fill="#dc2626" opacity="0.2" />
        <ellipse cx="615" cy="155" rx="80" ry="80" fill="none" stroke="#7f1d1d" strokeWidth="2" strokeDasharray="5 4" />
        <text x="615" y="235" fontSize="11" fontWeight="700" textAnchor="middle" fill="#7f1d1d" fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "រោងសង្គ្រាមប៉ាស៊ីហ្វិក" : "PACIFIC THEATER"}
        </text>

        {/* Pearl Harbor marker */}
        <g transform="translate(220,140)">
          <circle r="4" fill="#dc2626" />
          <line x1="-6" y1="-6" x2="6" y2="6" stroke="#dc2626" strokeWidth="1.5" />
          <line x1="-6" y1="6"  x2="6" y2="-6" stroke="#dc2626" strokeWidth="1.5" />
          <text x="0" y="-10" fontSize="7" textAnchor="middle" fill="#7f1d1d" fontFamily="monospace">
            PEARL HARBOR · {num(k, "07·12·1941")}
          </text>
        </g>

        {/* Hiroshima marker */}
        <g transform="translate(610,90)">
          <circle r="4" fill="#fbbf24" stroke="#7f1d1d" strokeWidth="1" />
          <text x="14" y="3" fontSize="7" fill="#7f1d1d" fontFamily="monospace">
            HIROSHIMA · {num(k, "08·1945")}
          </text>
        </g>

        {/* Berlin marker */}
        <g transform="translate(330,75)">
          <circle r="3" fill="#7f1d1d" />
          <text x="6" y="-4" fontSize="7" fill="#7f1d1d" fontFamily="monospace">BERLIN</text>
        </g>
      </svg>
    </div>
  );
}

// ─── Production bars ──────────────────────────────────────────────────────

function ProductionBars({ k }: { k: boolean }) {
  const p = ERA.ww2;
  // Approximate WWII industrial output, indexed to highlight US dominance.
  const data = [
    { en: "USA",      kh: "សហរដ្ឋអាមេរិក", value: 100, color: "#1e40af" },
    { en: "Soviet",   kh: "សហភាពសូវៀត",   value:  55, color: "#b45309" },
    { en: "Germany",  kh: "អាល្លឺម៉ង់",     value:  35, color: "#374151" },
    { en: "Britain",  kh: "អង់គ្លេស",       value:  30, color: "#0e7490" },
    { en: "Japan",    kh: "ជប៉ុន",          value:  18, color: "#9d174d" },
  ];
  return (
    <div
      className="rounded-2xl border-2 p-3 sm:p-4 h-full bg-white"
      style={{ borderColor: `${p.accent}55` }}
      data-testid="production-bars"
    >
      <div className={`text-xs font-bold mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: p.accent }}>
        {k ? "សន្ទស្សន៍ផលិតកម្មសង្គ្រាម (USA = ១០០)" : "WAR PRODUCTION INDEX (USA = 100)"}
      </div>
      <div className="space-y-2.5 mt-2">
        {data.map((d) => (
          <div key={d.en}>
            <div className="flex items-center justify-between text-[11px] mb-0.5">
              <span className={k ? "font-khmer" : ""} style={{ color: INK }}>{k ? d.kh : d.en}</span>
              <span className="font-mono" style={{ color: p.accent }}>{num(k, d.value)}</span>
            </div>
            <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: `${d.color}22` }}>
              <div className="h-full rounded-full" style={{ width: `${d.value}%`, backgroundColor: d.color }} />
            </div>
          </div>
        ))}
      </div>
      <div className={`mt-3 text-[10px] italic ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
        {k
          ? "សន្ទស្សន៍ប្រហាក់ប្រហែល · យកសរុបនៃកាំភ្លើងដឹកនាំ យន្តហោះច្បាំង រថក្រោះ និងនាវា ១៩៤១–៤៥។"
          : "Approximate index · totals across guns, planes, tanks, ships, 1941–45."}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  TAB 03 · The Manhattan Project
// ════════════════════════════════════════════════════════════════════════════

function ManhattanTab({ k, t }: { k: boolean; t: T }) {
  return (
    <section data-testid="tab-manhattan">
      <div className="grid sm:grid-cols-4 gap-3 mb-8">
        <StatTile
          Icon={Users}      k={k} era="manhattan"
          enLabel="Workers" khLabel="កម្មករ"
          value={`~${num(k, "130,000")}`}
          enUnit="across 30+ secret sites in 3 countries"
          khUnit="នៅទីតាំងសម្ងាត់ ៣០+ ក្នុងប្រទេស ៣"
        />
        <StatTile
          Icon={Atom}       k={k} era="manhattan"
          enLabel="Cost (1945 USD)" khLabel="ការចំណាយ (USD ១៩៤៥)"
          value={`~$${num(k, 2)} B`}
          enUnit="≈ $30 billion in today's money"
          khUnit="≈ ៣០ ពាន់លាន ដុល្លារ ក្នុងប្រាក់សម័យឥឡូវ"
        />
        <StatTile
          Icon={Zap}        k={k} era="manhattan"
          enLabel="Trinity test" khLabel="ការសាកល្បង Trinity"
          value={num(k, "16·07·1945")}
          enUnit="first atomic explosion · New Mexico desert"
          khUnit="ការផ្ទុះអាតូមដំបូង · វាលខ្សាច់ New Mexico"
        />
        <StatTile
          Icon={Bomb}       k={k} era="manhattan"
          enLabel="Bombs dropped" khLabel="គ្រាប់បែកទម្លាក់"
          value={num(k, 2)}
          enUnit="Hiroshima (06·08), Nagasaki (09·08·1945)"
          khUnit="Hiroshima (០៦·០៨) · Nagasaki (០៩·០៨·១៩៤៥)"
        />
      </div>

      {/* The Science of Destruction */}
      <SectionHeader spec="03a" en="The Science of Destruction" kh="វិទ្យាសាស្ត្រនៃការបំផ្លាញ" k={k} Icon={FlaskConical} era="manhattan" />

      <div className="grid lg:grid-cols-5 gap-5 mb-8">
        <div className="lg:col-span-3">
          <FeatureCard
            k={k}
            Icon={FlaskConical}
            era="manhattan"
            enTitle="The most brilliant minds, in one secret desert lab"
            khTitle="គំនិតពូកែបំផុត ក្នុងមន្ទីរពិសោធន៍សម្ងាត់នៅវាលខ្សាច់"
            enTag="Los Alamos · 1942–1945"
            khTag="Los Alamos · ១៩៤២–១៩៤៥"
            enBody="Beginning in 1942, the United States quietly gathered the greatest collection of physicists and chemists ever assembled — many of them refugees who had fled Nazi Europe. They were brought to a hidden mesa in the New Mexico desert called Los Alamos, told they could not write home about their work, and given a single goal: build an atomic bomb before Germany did. The project was led by physicist J. Robert Oppenheimer. It cost roughly $2 billion (about $30 billion today) and at its peak employed 130,000 people across more than 30 secret sites — yet most of them did not even know what they were building. On 16 July 1945, in the Trinity test, the first atomic device was detonated. Oppenheimer later said that, watching the fireball rise, a line from Hindu scripture came into his head: 'Now I am become Death, the destroyer of worlds.'"
            khBody="ចាប់ផ្ដើមពីឆ្នាំ ១៩៤២ សហរដ្ឋអាមេរិកបានប្រមូលផ្ដុំស្ងាត់នូវការប្រមូលផ្ដុំធំបំផុតនៃរូបវិទូ និងគីមីវិទូ — ភាគច្រើនជាជនភៀសខ្លួនដែលរត់ចេញពីអឺរ៉ុបណាស៊ី។ ពួកគេត្រូវបាននាំទៅទីតាំងលាក់នៅវាលខ្សាច់ New Mexico ហៅថា Los Alamos ត្រូវបានប្រាប់ថា មិនអាចសរសេរទៅផ្ទះអំពីការងាររបស់ពួកគេបានទេ ហើយត្រូវបានផ្ដល់គោលដៅតែមួយ ៖ កសាងគ្រាប់បែកបរមាណូមុនអាល្លឺម៉ង់។ គម្រោងនេះត្រូវបានដឹកនាំដោយរូបវិទូ J. Robert Oppenheimer។ វាបានចំណាយប្រហែល ២ ពាន់លានដុល្លារ (ប្រហែល ៣០ ពាន់លានសព្វថ្ងៃ) និងនៅពេលកំពូលបានជួលមនុស្ស ១៣០,០០០ នាក់ឆ្លងកាត់ទីតាំងសម្ងាត់ជាង ៣០ — ប៉ុន្តែភាគច្រើននៃពួកគេមិនបានដឹងថា ខ្លួនកំពុងសាងសង់អ្វីទេ។ នៅថ្ងៃទី ១៦ កក្កដា ១៩៤៥ ក្នុងការសាកល្បង Trinity ឧបករណ៍បរមាណូដំបូងត្រូវបានបំផ្ទុះ។ Oppenheimer ក្រោយមកបាននិយាយថា ខណៈពេលមើលគំនរភ្លើងហើរឡើង បន្ទាត់មួយពីព្រះគម្ពីរហិណ្ឌូបានចូលក្នុងក្បាលគេ ៖ 'ឥឡូវនេះខ្ញុំបានក្លាយជាសេចក្តីស្លាប់ ជាអ្នកបំផ្លាញនៃពិភពលោក។'"
          />
        </div>
        <div className="lg:col-span-2">
          <FissionDiagram k={k} />
        </div>
      </div>

      {/* E = mc² */}
      <div
        className="rounded-3xl border-2 p-5 sm:p-7 mb-8"
        style={{ borderColor: `${ERA.manhattan.accent}55`, backgroundColor: ERA.manhattan.paper }}
        data-testid="emc2"
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${ERA.manhattan.accent}1f`, border: `1px solid ${ERA.manhattan.accent}55` }}
          >
            <Atom className="w-5 h-5" style={{ color: ERA.manhattan.accent }} />
          </div>
          <div>
            <h3 className={`font-bold text-lg sm:text-xl ${k ? "font-khmer" : ""}`} style={{ color: ERA.manhattan.deep }}>
              {t("Why splitting one atom can level a city", "ហេតុអ្វីបំបែកអាតូមតែមួយអាចបំផ្លាញទីក្រុង")}
            </h3>
            <div className={`text-[11px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: ERA.manhattan.accent }}>
              {t("Einstein, 1905 · E = mc²", "Einstein · ១៩០៥ · E = mc²")}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-start">
          <div>
            <P
              k={k}
              en="In 1905, a 26-year-old Albert Einstein wrote down what looked like an innocent equation. It said that mass and energy are the same thing, and that you can convert one into the other using a single number — the speed of light, squared. The speed of light is enormous (300,000 km per second), and squaring it gives an unimaginably enormous number (90 quadrillion). What this means is that even a tiny amount of mass — a few grams — contains the energy of millions of tonnes of dynamite. For forty years it stayed a beautiful equation in textbooks. Then, in 1945, physicists figured out how to actually do it: split a single, microscopic atom of Uranium-235, and convert about 0.7 grams of its mass directly into pure energy. That's roughly the mass of a paper clip. The bomb dropped on Hiroshima released the energy of 15,000 tonnes of TNT — and killed an estimated 140,000 people, most of them civilians, by the end of 1945."
              kh="ក្នុងឆ្នាំ ១៩០៥ Albert Einstein អាយុ ២៦ ឆ្នាំបានសរសេរសមីការដែលមើលទៅគ្មានគ្រោះថ្នាក់។ វាបាននិយាយថា ម៉ាស់ និងថាមពលគឺជារបស់ដូចគ្នា ហើយអ្នកអាចបំប្លែងពីមួយទៅមួយដោយប្រើលេខតែមួយ — ល្បឿនពន្លឺ លើកការ៉េ។ ល្បឿនពន្លឺគឺធំសម្បើម (៣០០,០០០ គីឡូម៉ែត្រក្នុងវិនាទី) ហើយលើកការ៉េវាផ្ដល់លេខធំសម្បើមមិនអាចស្រមៃបាន (៩០ គាដ្រិលលីយ៉ុង)។ អ្វីដែលនេះមានន័យគឺថា ទោះម៉ាស់តូចបន្តិច — ប៉ុន្មានក្រាម — ក៏មានថាមពលនៃ TNT រាប់លានតោន។ ៤០ ឆ្នាំ វានៅជាសមីការស្អាតក្នុងសៀវភៅសិក្សា។ បន្ទាប់មក ក្នុងឆ្នាំ ១៩៤៥ រូបវិទូបានរកវិធីធ្វើវាជាក់ស្ដែង ៖ បំបែកអាតូម Uranium-235 មីក្រូស្កុបិកតែមួយ និងបំប្លែងម៉ាស់ប្រហែល ០.៧ ក្រាមរបស់វាដោយផ្ទាល់ទៅជាថាមពលសុទ្ធ។ នោះប្រហែលជាម៉ាស់នៃ paper clip មួយ។ គ្រាប់បែកដែលបានទម្លាក់លើ Hiroshima បានបញ្ចេញថាមពល ១៥,០០០ តោន TNT — ហើយបានសម្លាប់មនុស្សប្រហែល ១៤០,០០០ នាក់ ភាគច្រើនជាស៊ីវិល នៅចុងឆ្នាំ ១៩៤៥។"
              className="text-sm"
            />
          </div>
          <div>
            <div
              className="rounded-2xl p-5 border text-center"
              style={{ borderColor: `${ERA.manhattan.accent}33`, backgroundColor: "#ffffff" }}
            >
              <div className={`text-[10px] mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: ERA.manhattan.accent }}>
                {k ? "សមីការ Einstein" : "EINSTEIN'S EQUATION"}
              </div>
              <div className="text-3xl py-2" style={{ color: ERA.manhattan.deep }}>
                <BlockMath math={String.raw`E = m c^{2}`} />
              </div>
              <div className={`mt-2 text-xs ${k ? "font-khmer leading-loose" : ""}`} style={{ color: INK_SOFT }}>
                <div className="grid grid-cols-3 gap-1 text-left">
                  <div>
                    <span className="font-mono" style={{ color: ERA.manhattan.deep }}>E</span>
                    <div>{k ? "ថាមពល (J)" : "energy (J)"}</div>
                  </div>
                  <div>
                    <span className="font-mono" style={{ color: ERA.manhattan.deep }}>m</span>
                    <div>{k ? "ម៉ាស់ (kg)" : "mass (kg)"}</div>
                  </div>
                  <div>
                    <span className="font-mono" style={{ color: ERA.manhattan.deep }}>c</span>
                    <div>{k ? "ល្បឿនពន្លឺ" : "speed of light"}</div>
                  </div>
                </div>
              </div>
              <div className={`mt-4 text-xs ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
                {k ? "ឧទាហរណ៍ ៖ បំប្លែងម៉ាស់ ០.៧ ក្រាម →" : "Example · convert 0.7 g of mass →"}
              </div>
              <div className="mt-1 text-base">
                <InlineMath math={String.raw`(0.0007)\,(3{\times}10^{8})^{2} \approx 6.3{\times}10^{13}\,\text{J}`} />
              </div>
              <div className={`mt-2 text-xs font-bold ${k ? "font-khmer" : ""}`} style={{ color: ERA.manhattan.accent }}>
                {k ? "= ថាមពលនៃ TNT ~១៥,០០០ តោន" : "= the energy of ~15,000 tonnes of TNT"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Shift */}
      <SectionHeader spec="03b" en="The Shift" kh="ការប្ដូរ" k={k} Icon={Bomb} era="manhattan" />

      <div className="grid lg:grid-cols-2 gap-5">
        <FeatureCard
          k={k}
          Icon={Bomb}
          era="manhattan"
          enTitle="Hiroshima · 6 August 1945, 8:15 a.m."
          khTitle="Hiroshima · ៦ សីហា ១៩៤៥ ម៉ោង ៨:១៥ ព្រឹក"
          enTag="Little Boy · uranium-235 bomb"
          khTag="Little Boy · គ្រាប់បែក Uranium-235"
          enBody="A single American B-29 bomber, named Enola Gay, dropped a single bomb on the Japanese city of Hiroshima. It exploded about 600 metres above the ground. Within one second, every building inside a 1.6 km radius was flattened. By the end of 1945, an estimated 140,000 people had died — most of them civilians, including thousands of children at school. Three days later, on 9 August, a second bomb destroyed the city of Nagasaki, killing about 70,000 more. On 15 August, Japan announced its surrender, ending World War II. For the first time in history, two cities had been erased not by an army, but by physics."
          khBody="យន្តហោះច្បាំង B-29 អាមេរិកាំងតែមួយឈ្មោះ Enola Gay បានទម្លាក់គ្រាប់បែកតែមួយលើទីក្រុងជប៉ុន Hiroshima។ វាបានផ្ទុះប្រហែល ៦០០ ម៉ែត្រលើដី។ ក្នុងរយៈពេល ១ វិនាទី គ្រប់អគារក្នុងកាំ ១.៦ គីឡូម៉ែត្រត្រូវបានរាបស្មើ។ នៅចុងឆ្នាំ ១៩៤៥ មនុស្សប្រហែល ១៤០,០០០ នាក់បានស្លាប់ — ភាគច្រើនជាស៊ីវិល រួមទាំងកុមារនៅសាលារៀនរាប់ពាន់នាក់។ ៣ ថ្ងៃក្រោយមក នៅថ្ងៃ ៩ សីហា គ្រាប់បែកទី ២ បានបំផ្លាញទីក្រុង Nagasaki សម្លាប់មនុស្សប្រហែល ៧០,០០០ នាក់ទៀត។ នៅថ្ងៃ ១៥ សីហា ជប៉ុនបានប្រកាសចុះចាញ់ បញ្ចប់សង្គ្រាមលោកលើកទី ២។ ជាលើកដំបូងក្នុងប្រវត្តិ ទីក្រុង ២ ត្រូវបានលុបបំបាត់មិនមែនដោយកងទ័ព ប៉ុន្តែដោយរូបវិទ្យា។"
        >
          <MushroomCloud k={k} />
        </FeatureCard>

        <FeatureCard
          k={k}
          Icon={ShieldAlert}
          era="manhattan"
          enTitle="The exact moment humanity could destroy itself"
          khTitle="ពេលជាក់លាក់ដែលមនុស្សជាតិអាចបំផ្លាញខ្លួនឯង"
          enTag="the line that cannot be uncrossed"
          khTag="ខ្សែដែលមិនអាចឆ្លងវិញ"
          enBody="Before 1945, every weapon in human history could only kill at the scale of a battlefield. After 1945, a single bomb could erase a city; within a few years, a single bomb could erase a country; within twenty years, both sides had enough bombs to erase the whole human species several times over. This is what historians mean when they say the atomic bomb 'changed everything'. It was not just a more powerful weapon. It was a new category of weapon — and from that morning in August 1945 onwards, every president, every prime minister, every general has had to live with one new fact: their decisions can, in principle, end human civilization in an afternoon."
          khBody="មុនឆ្នាំ ១៩៤៥ គ្រប់អាវុធក្នុងប្រវត្តិមនុស្ស អាចសម្លាប់បានតែនៅទំហំមួយរបស់សមរភូមិ។ បន្ទាប់ពីឆ្នាំ ១៩៤៥ គ្រាប់បែកតែមួយអាចលុបទីក្រុង ; ក្នុងរយៈពេលប៉ុន្មានឆ្នាំ គ្រាប់បែកតែមួយអាចលុបប្រទេស ; ក្នុងរយៈពេល ២០ ឆ្នាំ ភាគីទាំងពីរមានគ្រាប់បែកគ្រប់គ្រាន់ដើម្បីលុបពូជមនុស្សទាំងមូលច្រើនដង។ នេះគឺជាអ្វីដែលអ្នកប្រវត្តិសាស្ត្រមានន័យពេលពួកគេនិយាយថា គ្រាប់បែកបរមាណូ 'បានផ្លាស់ប្ដូរអ្វីៗគ្រប់យ៉ាង'។ វាមិនមែនគ្រាន់តែជាអាវុធខ្លាំងជាងទេ។ វាជាប្រភេទអាវុធថ្មី — ហើយចាប់ពីព្រឹកនោះក្នុងខែសីហា ១៩៤៥ ប្រធានាធិបតី នាយករដ្ឋមន្ត្រី និងឧត្តមសេនីយ៍គ្រប់នាក់ត្រូវរស់នៅជាមួយការពិតថ្មីមួយ ៖ ការសម្រេចចិត្តរបស់ពួកគេអាច ជាគោលការណ៍ បញ្ចប់អរិយធម៌មនុស្សក្នុងពេលរសៀលមួយ។"
        />
      </div>
    </section>
  );
}

// ─── Fission diagram ──────────────────────────────────────────────────────

function FissionDiagram({ k }: { k: boolean }) {
  const p = ERA.manhattan;
  return (
    <div
      className="rounded-2xl border-2 p-3 sm:p-4 h-full bg-white"
      style={{ borderColor: `${p.accent}55` }}
      data-testid="fission-diagram"
    >
      <div className={`text-xs font-bold mb-1 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: p.accent }}>
        {k ? "ការបំបែកអាតូម Uranium-235" : "URANIUM-235 FISSION"}
      </div>
      <svg viewBox="0 0 320 280" className="w-full h-auto" role="img" aria-label="Fission chain">
        {/* incoming neutron */}
        <g>
          <line x1="20" y1="60" x2="120" y2="100" stroke={p.accent} strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="20" cy="60" r="6" fill="#0f766e" />
          <text x="32" y="55" fontSize="8" fill={p.deep} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "នឺត្រុង" : "neutron"}
          </text>
        </g>
        {/* U-235 nucleus */}
        <g transform="translate(140,110)">
          <circle r="22" fill="#fbbf24" stroke="#92400e" strokeWidth="1.5" />
          {Array.from({ length: 7 }).map((_, i) => (
            <circle key={i} cx={Math.cos((i / 7) * Math.PI * 2) * 10} cy={Math.sin((i / 7) * Math.PI * 2) * 10} r="3" fill="#92400e" />
          ))}
          <text y="38" textAnchor="middle" fontSize="9" fontWeight="700" fill={p.deep} fontFamily="monospace">U-235</text>
        </g>
        {/* split arrow */}
        <line x1="140" y1="135" x2="140" y2="165" stroke={p.accent} strokeWidth="2" markerEnd="url(#arrowM)" />
        <defs>
          <marker id="arrowM" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill={p.accent} />
          </marker>
        </defs>
        {/* products */}
        <g transform="translate(80,200)">
          <circle r="14" fill="#fbbf24" stroke="#92400e" strokeWidth="1" />
          <text y="3" textAnchor="middle" fontSize="7" fontWeight="700" fill={p.deep} fontFamily="monospace">Ba</text>
        </g>
        <g transform="translate(200,200)">
          <circle r="14" fill="#fbbf24" stroke="#92400e" strokeWidth="1" />
          <text y="3" textAnchor="middle" fontSize="7" fontWeight="700" fill={p.deep} fontFamily="monospace">Kr</text>
        </g>
        {/* released neutrons */}
        {[
          { x: 250, y: 145 }, { x: 240, y: 220 }, { x: 30, y: 220 },
        ].map((n, i) => (
          <g key={i}>
            <line x1="140" y1="155" x2={n.x} y2={n.y} stroke="#0f766e" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx={n.x} cy={n.y} r="4" fill="#0f766e" />
          </g>
        ))}
        {/* energy burst */}
        <g transform="translate(140,110)">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (Math.PI * 2 * i) / 12;
            return (
              <line
                key={i}
                x1={Math.cos(a) * 26}
                y1={Math.sin(a) * 26}
                x2={Math.cos(a) * 36}
                y2={Math.sin(a) * 36}
                stroke="#dc2626"
                strokeWidth="1.2"
              />
            );
          })}
        </g>
        {/* labels */}
        <text x="160" y="262" fontSize="9" textAnchor="middle" fill={p.deep} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "+ ៣ នឺត្រុងថ្មី → ប្រតិកម្មច្រវ៉ាក់" : "+ 3 new neutrons → chain reaction"}
        </text>
        <text x="160" y="275" fontSize="8" textAnchor="middle" fill="#dc2626" fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "+ ថាមពលធំពី E=mc²" : "+ huge energy from E=mc²"}
        </text>
      </svg>
    </div>
  );
}

// ─── Mushroom cloud illustration ──────────────────────────────────────────

function MushroomCloud({ k }: { k: boolean }) {
  const p = ERA.manhattan;
  return (
    <div
      className="rounded-2xl p-3 border"
      style={{ borderColor: `${p.accent}33`, backgroundColor: PARCHMENT }}
      data-testid="mushroom-cloud"
    >
      <svg viewBox="0 0 320 200" className="w-full h-44" aria-hidden="true">
        {/* sky */}
        <rect width="320" height="200" fill="#1f2937" />
        {/* mushroom cap */}
        <ellipse cx="160" cy="60" rx="80" ry="45" fill="#fef3c7" />
        <ellipse cx="160" cy="50" rx="65" ry="35" fill="#fed7aa" />
        <ellipse cx="160" cy="40" rx="50" ry="22" fill="#fdba74" />
        <ellipse cx="160" cy="30" rx="35" ry="14" fill="#f59e0b" />
        {/* stem */}
        <path d="M140,100 Q150,140 130,180 L190,180 Q170,140 180,100 Z" fill="#a8a29e" opacity="0.85" />
        <path d="M150,100 Q155,150 150,180 L170,180 Q165,150 170,100 Z" fill="#fbbf24" opacity="0.6" />
        {/* base devastation */}
        <rect x="0" y="180" width="320" height="20" fill="#3f2a05" />
        {/* horizon city silhouettes destroyed */}
        <g fill="#1c1917">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={i * 28} y={172 + (i % 3) * 2} width={6 + (i % 4)} height={8 + (i % 3) * 2} />
          ))}
        </g>
        {/* date stamp */}
        <text x="10" y="20" fontSize="8" fill="#fbbf24" fontFamily="monospace">{k ? "០៦·០៨·១៩៤៥ ម៉ោង ៨:១៥" : "06·08·1945  08:15"}</text>
        <text x="310" y="20" fontSize="8" fill="#fbbf24" fontFamily="monospace" textAnchor="end">HIROSHIMA</text>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  TAB 04 · The Cold War & Nuclear Proliferation
// ════════════════════════════════════════════════════════════════════════════

function ColdWarTab({ k, t }: { k: boolean; t: T }) {
  return (
    <section data-testid="tab-cold">
      <div className="grid sm:grid-cols-4 gap-3 mb-8">
        <StatTile
          Icon={Flag}      k={k} era="cold"
          enLabel="Duration" khLabel="រយៈពេល"
          value={`~${num(k, 44)} ${k ? "ឆ្នាំ" : "yrs"}`}
          enUnit="from 1947 to the fall of the USSR in 1991"
          khUnit="ពី ១៩៤៧ ដល់ការដួលរលំសហភាពសូវៀតក្នុងឆ្នាំ ១៩៩១"
        />
        <StatTile
          Icon={Bomb}      k={k} era="cold"
          enLabel="Peak warheads" khLabel="ចំនួនកំពូលនៃក្បាលគ្រាប់"
          value={`~${num(k, "70,300")}`}
          enUnit="combined US + USSR stockpile, 1986"
          khUnit="ឃ្លាំងសរុប អាមេរិក + សូវៀត ឆ្នាំ ១៩៨៦"
        />
        <StatTile
          Icon={ShieldAlert} k={k} era="cold"
          enLabel="Proxy wars" khLabel="សង្គ្រាមតំណាង"
          value={`${num(k, 50)}+`}
          enUnit="incl. Korea, Vietnam, Afghanistan, Cambodia"
          khUnit="រួមបញ្ចូល ៖ កូរ៉េ វៀតណាម អាហ្វហ្គានីស្ថាន កម្ពុជា"
        />
        <StatTile
          Icon={Atom}      k={k} era="cold"
          enLabel="Today" khLabel="សព្វថ្ងៃ"
          value={`~${num(k, "12,500")}`}
          enUnit="warheads remaining worldwide, in 9 countries"
          khUnit="ក្បាលគ្រាប់នៅសល់ពិភពលោក ក្នុងប្រទេស ៩"
        />
      </div>

      {/* The War of Ideas */}
      <SectionHeader spec="04a" en="The War of Ideas" kh="សង្គ្រាមនៃគំនិត" k={k} Icon={Shield} era="cold" />

      <div className="grid lg:grid-cols-5 gap-5 mb-8">
        <div className="lg:col-span-3">
          <FeatureCard
            k={k}
            Icon={Shield}
            era="cold"
            enTitle="Two superpowers, never directly at war"
            khTitle="មហាអំណាច ២ មិនដែលច្បាំងផ្ទាល់"
            enTag="USA vs. USSR · 1947–1991"
            khTag="សហរដ្ឋ ទល់នឹង សហភាពសូវៀត · ១៩៤៧–១៩៩១"
            enBody="The moment WWII ended, the two countries that had defeated Nazi Germany — the United States and the Soviet Union — found themselves staring at each other across a ruined Europe with two completely opposite ideas of how the world should work: free-market democracy on one side, state-controlled communism on the other. For the next forty-four years, they competed for the loyalty of every other country on Earth. They built spy networks. They funded coups. They fought 'proxy wars' in places like Korea, Vietnam, Afghanistan, and Cambodia, where they backed opposite sides instead of fighting each other directly. But the United States and the Soviet Union themselves never fired a single shot at each other. The reason had a chilling name."
            khBody="ពេលសង្គ្រាមលោកលើកទី ២ បានបញ្ចប់ ប្រទេស ២ ដែលបានកម្ចាត់អាល្លឺម៉ង់ណាស៊ី — សហរដ្ឋអាមេរិក និងសហភាពសូវៀត — បានរកឃើញខ្លួនឯងសម្លឹងគ្នាឆ្លងកាត់អឺរ៉ុបដែលបាក់បែក ដោយមានគំនិតផ្ទុយគ្នាទាំងស្រុង ២ អំពីរបៀបដែលពិភពលោកគួរដំណើរការ ៖ លទ្ធិប្រជាធិបតេយ្យទីផ្សារសេរីនៅផ្នែកមួយ កុម្មុយនិស្តគ្រប់គ្រងដោយរដ្ឋនៅផ្នែកម្ខាងទៀត។ សម្រាប់ ៤៤ ឆ្នាំបន្ទាប់ ពួកគេបានប្រកួតប្រជែងសម្រាប់ភាពស្មោះត្រង់នៃប្រទេសផ្សេងទៀតគ្រប់ប្រទេសនៅលើផែនដី។ ពួកគេបានកសាងបណ្ដាញចារកម្ម។ ពួកគេបានផ្ដល់មូលនិធិដល់រដ្ឋប្រហារ។ ពួកគេបានច្បាំង 'សង្គ្រាមតំណាង' នៅកន្លែងដូចជាកូរ៉េ វៀតណាម អាហ្វហ្គានីស្ថាន និងកម្ពុជា ដែលពួកគេគាំទ្រភាគីផ្ទុយ ជំនួសឲ្យការច្បាំងគ្នាដោយផ្ទាល់។ ប៉ុន្តែសហរដ្ឋអាមេរិក និងសហភាពសូវៀតផ្ទាល់មិនដែលបាញ់គ្រាប់តែមួយលើគ្នាទេ។ ហេតុផលមានឈ្មោះគួរឲ្យឆ្ងល់។"
          />
        </div>
        <div className="lg:col-span-2">
          <MADDiagram k={k} />
        </div>
      </div>

      {/* MAD callout */}
      <div
        className="rounded-3xl border-2 p-5 sm:p-6 mb-8"
        style={{ borderColor: ERA.cold.accent, backgroundColor: ERA.cold.paper }}
        data-testid="mad-callout"
      >
        <div className="flex items-center gap-3 mb-3">
          <Radiation className="w-6 h-6" style={{ color: ERA.cold.accent }} />
          <h3 className={`font-bold text-lg sm:text-xl ${k ? "font-khmer" : ""}`} style={{ color: ERA.cold.text }}>
            {t("Mutually Assured Destruction (MAD)", "ការបំផ្លាញដែលធានាគ្នាទៅវិញទៅមក (MAD)")}
          </h3>
          <span
            className="ml-auto text-[10px] font-mono tracking-widest px-2 py-0.5 rounded text-white"
            style={{ backgroundColor: ERA.cold.accent }}
          >
            ☢ DOCTRINE
          </span>
        </div>
        <P
          k={k}
          dark
          en="The doctrine of Mutually Assured Destruction said: if either side ever launched its nuclear weapons, the other side would have enough time to launch its own — and within thirty minutes both countries (and probably most of the rest of the world) would be ash. Therefore, no rational leader would ever start such a war. The very name was the joke: the strategy for surviving was to make sure that everybody, on both sides, was MAD — that is, completely guaranteed to be destroyed. It was the most terrifying peace in human history. There were several near-misses, the closest being the Cuban Missile Crisis in October 1962, when President Kennedy and Premier Khrushchev came within hours of giving the launch order, before stepping back at the very last moment."
          kh="គោលលទ្ធិនៃ Mutually Assured Destruction បាននិយាយថា ៖ ប្រសិនបើភាគីណាមួយធ្លាប់បាញ់អាវុធនុយក្លេអ៊ែរ ភាគីម្ខាងទៀតនឹងមានពេលគ្រប់គ្រាន់ដើម្បីបាញ់របស់ខ្លួន — ហើយក្នុងរយៈពេល ៣០ នាទី ប្រទេសទាំងពីរ (និងប្រហែលជាភាគច្រើននៃពិភពលោកទាំងមូល) នឹងក្លាយជាផេះ។ ដូច្នេះ គ្មានមេដឹកនាំសមហេតុផលណាមួយនឹងចាប់ផ្ដើមសង្គ្រាមបែបនេះទេ។ ឈ្មោះផ្ទាល់ជារឿងកំប្លែង ៖ យុទ្ធសាស្ត្រសម្រាប់រស់រានគឺត្រូវធានាថា គ្រប់គ្នា នៅភាគីទាំងពីរ គឺឆ្កួត (MAD) — នោះគឺ ត្រូវបានធានាទាំងស្រុងថា នឹងត្រូវបំផ្លាញ។ វាគឺជាសន្តិភាពគួរឲ្យភ័យខ្លាចបំផុតក្នុងប្រវត្តិមនុស្ស។ មានករណីជិតៗមួយចំនួន ដែលជិតបំផុតគឺវិបត្តិគ្រាប់ផ្លោង Cuba ក្នុងខែតុលា ១៩៦២ នៅពេលប្រធានាធិបតី Kennedy និងនាយករដ្ឋមន្ត្រី Khrushchev មកដល់ចម្ងាយមួយម៉ោងពីការបញ្ជាបាញ់ មុនពេលថយក្រោយនៅពេលចុងក្រោយបំផុត។"
          className="text-sm"
        />
      </div>

      {/* Proliferation */}
      <SectionHeader spec="04b" en="Proliferation" kh="ការរីកសាយភាយ" k={k} Icon={Radiation} era="cold" />

      <div className="grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <FeatureCard
            k={k}
            Icon={Radiation}
            era="cold"
            enTitle="The terrifying spread"
            khTitle="ការរីករាលដ៏គួរឲ្យភ័យខ្លាច"
            enTag="9 countries with the bomb today"
            khTag="ប្រទេស ៩ មានគ្រាប់បែកសព្វថ្ងៃ"
            enBody={"\"Nuclear proliferation\" simply means: the spread of nuclear weapons to more and more countries. The United States built the first one in 1945. The Soviet Union followed in 1949. Then the United Kingdom (1952), France (1960), China (1964), India (1974), Israel (around 1967, never officially confirmed), Pakistan (1998), and finally North Korea (2006). Nine countries. With every new owner, the risk grows that a weapon will be used by accident, by mistake, or by a leader having a very bad day. Since 1968 the world has had a treaty (the Non-Proliferation Treaty) that tries to stop more countries from getting the bomb, and to slowly dismantle the existing stockpiles. From the peak of about 70,000 warheads in 1986, the world has come down to roughly 12,500 today — still enough to end civilization several times over, but the trend is, finally, the right way."}
            khBody={"\"ការរីកសាយភាយនុយក្លេអ៊ែរ\" មានន័យថា ៖ ការរីករាលនៃអាវុធនុយក្លេអ៊ែរទៅកាន់ប្រទេសកាន់តែច្រើនឡើង។ សហរដ្ឋអាមេរិកបានកសាងគ្រាប់បែកដំបូងក្នុងឆ្នាំ ១៩៤៥។ សហភាពសូវៀតបានធ្វើតាមក្នុងឆ្នាំ ១៩៤៩។ បន្ទាប់មកចក្រភពអង់គ្លេស (១៩៥២) បារាំង (១៩៦០) ចិន (១៩៦៤) ឥណ្ឌា (១៩៧៤) អ៊ីស្រាអែល (ប្រហែល ១៩៦៧ មិនដែលត្រូវបានបញ្ជាក់ជាផ្លូវការ) ប៉ាគីស្ថាន (១៩៩៨) និងជាចុងក្រោយកូរ៉េខាងជើង (២០០៦)។ ប្រទេស ៩។ ជាមួយនឹងម្ចាស់ថ្មីម្នាក់ៗ ហានិភ័យកើនឡើងថា អាវុធនឹងត្រូវបានប្រើដោយចៃដន្យ ដោយកំហុស ឬដោយមេដឹកនាំដែលមានថ្ងៃអាក្រក់ខ្លាំង។ ចាប់តាំងពីឆ្នាំ ១៩៦៨ ពិភពលោកបានមានសន្ធិសញ្ញាមួយ (សន្ធិសញ្ញាមិនរីកសាយភាយ) ដែលព្យាយាមបញ្ឈប់ប្រទេសច្រើនទៀតពីការទទួលគ្រាប់បែក និងបន្តិចម្ដងៗបំបាត់ឃ្លាំងសម្ងាត់ដែលមានស្រាប់។ ពីកំពូលប្រហែល ៧០,០០០ ក្បាលគ្រាប់ក្នុងឆ្នាំ ១៩៨៦ ពិភពលោកបានចុះមកប្រហែល ១២,៥០០ សព្វថ្ងៃ — នៅតែគ្រប់គ្រាន់បញ្ចប់អរិយធម៌ច្រើនដង ប៉ុន្តែនិន្នាការ ទីបំផុត គឺផ្លូវត្រឹមត្រូវ។"}
          />
        </div>
        <div className="lg:col-span-2">
          <NuclearClubList k={k} />
        </div>
      </div>

      {/* Stockpile timeline */}
      <div className="mt-6">
        <StockpileTimeline k={k} />
      </div>

      {/* Closing reflection */}
      <div
        className="mt-8 rounded-2xl border-2 p-4 flex items-start gap-3"
        style={{ borderColor: ERA.cold.accent, backgroundColor: ERA.cold.paper }}
      >
        <BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: ERA.cold.accent }} />
        <p className={`text-xs ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: "#cbd5e1" }}>
          {t(
            "Cambodia knew the Cold War directly: the proxy fighting in Vietnam spilled across our border, and the politics of that era helped set the stage for the catastrophe of 1975–79. Studying this module is, in part, studying the wider world that shaped our own grandparents' lives.",
            "កម្ពុជាបានស្គាល់សង្គ្រាមត្រជាក់ដោយផ្ទាល់ ៖ ការច្បាំងតំណាងនៅវៀតណាមបានរលាមឆ្លងព្រំដែនរបស់យើង ហើយនយោបាយនៃយុគនោះបានជួយរៀបចំសង្គ្រាមនាំទៅរកមហន្តរាយឆ្នាំ ១៩៧៥–៧៩។ ការសិក្សាមុខវិជ្ជានេះ ផ្នែកមួយ គឺការសិក្សាពិភពលោកទូលំទូលាយដែលបានរៀបចំជីវិតជីដូនជីតារបស់យើង។"
          )}
        </p>
      </div>
    </section>
  );
}

// ─── MAD diagram ──────────────────────────────────────────────────────────

function MADDiagram({ k }: { k: boolean }) {
  const p = ERA.cold;
  return (
    <div
      className="rounded-2xl border-2 p-3 sm:p-4 h-full"
      style={{ borderColor: p.accent, backgroundColor: p.paper }}
      data-testid="mad-diagram"
    >
      <div className={`text-xs font-bold mb-1 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: p.accent }}>
        {k ? "យុទ្ធសាស្ត្រ MAD" : "M.A.D. STRATEGY"}
      </div>
      <svg viewBox="0 0 320 240" className="w-full h-auto" role="img" aria-label="MAD diagram">
        {/* USA */}
        <g transform="translate(60,80)">
          <circle r="40" fill="#1e3a8a" stroke="#fff" strokeWidth="1" />
          <text y="3" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "សហរដ្ឋ" : "USA"}
          </text>
          <text y="16" textAnchor="middle" fontSize="8" fill="#cbd5e1" fontFamily="monospace">~30,000 ☢</text>
        </g>
        {/* USSR */}
        <g transform="translate(260,80)">
          <circle r="40" fill="#7f1d1d" stroke="#fff" strokeWidth="1" />
          <text y="3" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "សូវៀត" : "USSR"}
          </text>
          <text y="16" textAnchor="middle" fontSize="8" fill="#fecaca" fontFamily="monospace">~40,000 ☢</text>
        </g>
        {/* missiles flying both ways */}
        <g stroke={p.accent} strokeWidth="2" fill="none" markerEnd="url(#arrowMAD)">
          <path d="M100,70 Q160,30 220,70" />
          <path d="M220,90 Q160,130 100,90" />
        </g>
        <defs>
          <marker id="arrowMAD" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill={p.accent} />
          </marker>
        </defs>
        {/* warning sign in middle */}
        <g transform="translate(160,40)">
          <polygon points="0,-12 12,8 -12,8" fill="#fbbf24" stroke="#7f1d1d" strokeWidth="1" />
          <text y="5" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7f1d1d">!</text>
        </g>
        {/* Arrow back from middle pointing both ways destroyed */}
        <g transform="translate(160,170)">
          <text textAnchor="middle" fontSize="10" fontWeight="700" fill={p.accent} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ភាគីទាំង ២ បំផ្លាញ" : "BOTH SIDES DESTROYED"}
          </text>
          <text y="14" textAnchor="middle" fontSize="9" fill={p.text} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "→ គ្មាននរណាម្នាក់ឈ្នះ → គ្មាននរណាម្នាក់បាញ់" : "→ no one wins → no one fires"}
          </text>
        </g>
        {/* mushroom mini icons */}
        <g transform="translate(60,160)" opacity="0.7">
          <ellipse rx="20" ry="6" fill="#9ca3af" />
          <rect x="-3" y="0" width="6" height="14" fill="#9ca3af" />
        </g>
        <g transform="translate(260,160)" opacity="0.7">
          <ellipse rx="20" ry="6" fill="#9ca3af" />
          <rect x="-3" y="0" width="6" height="14" fill="#9ca3af" />
        </g>
        {/* horizon */}
        <line x1="0" y1="220" x2="320" y2="220" stroke="#475569" />
      </svg>
    </div>
  );
}

// ─── Nuclear Club list ────────────────────────────────────────────────────

const CLUB: { en: string; kh: string; year: number; flagBg: string }[] = [
  { en: "USA",          kh: "សហរដ្ឋអាមេរិក",    year: 1945, flagBg: "#1e3a8a" },
  { en: "USSR / Russia", kh: "សូវៀត / រុស្ស៊ី",   year: 1949, flagBg: "#7f1d1d" },
  { en: "United Kingdom", kh: "ចក្រភពអង់គ្លេស",  year: 1952, flagBg: "#1e40af" },
  { en: "France",       kh: "បារាំង",           year: 1960, flagBg: "#1d4ed8" },
  { en: "China",        kh: "ចិន",              year: 1964, flagBg: "#b91c1c" },
  { en: "Israel",       kh: "អ៊ីស្រាអែល",       year: 1967, flagBg: "#0e7490" },
  { en: "India",        kh: "ឥណ្ឌា",            year: 1974, flagBg: "#a16207" },
  { en: "Pakistan",     kh: "ប៉ាគីស្ថាន",        year: 1998, flagBg: "#15803d" },
  { en: "North Korea",  kh: "កូរ៉េខាងជើង",      year: 2006, flagBg: "#7c2d12" },
];

function NuclearClubList({ k }: { k: boolean }) {
  const p = ERA.cold;
  return (
    <div
      className="rounded-2xl border-2 p-3 sm:p-4 h-full"
      style={{ borderColor: p.accent, backgroundColor: p.paper }}
      data-testid="nuclear-club"
    >
      <div className={`text-xs font-bold mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: p.accent }}>
        {k ? "ក្លឹបនុយក្លេអ៊ែរ · ៩ ប្រទេស" : "NUCLEAR CLUB · 9 STATES"}
      </div>
      <ol className="space-y-1.5">
        {CLUB.map((c, i) => (
          <li key={c.en} className="flex items-center gap-2">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-white font-mono text-[10px]"
              style={{ backgroundColor: c.flagBg }}
            >
              {num(k, i + 1)}
            </span>
            <span className={`flex-1 text-sm ${k ? "font-khmer" : ""}`} style={{ color: p.text }}>
              {k ? c.kh : c.en}
            </span>
            <span className="text-[11px] font-mono" style={{ color: "#94a3b8" }}>
              {num(k, c.year)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ─── Stockpile timeline (line chart) ──────────────────────────────────────

const STOCKPILE: { year: number; total: number }[] = [
  { year: 1945, total:     2 },
  { year: 1950, total:   374 },
  { year: 1955, total:  3267 },
  { year: 1960, total: 22229 },
  { year: 1965, total: 38134 },
  { year: 1970, total: 39125 },
  { year: 1975, total: 47192 },
  { year: 1980, total: 55246 },
  { year: 1986, total: 70300 },
  { year: 1990, total: 60236 },
  { year: 1995, total: 39945 },
  { year: 2000, total: 31100 },
  { year: 2005, total: 26854 },
  { year: 2010, total: 22600 },
  { year: 2015, total: 15600 },
  { year: 2020, total: 13400 },
  { year: 2024, total: 12500 },
];

function StockpileTimeline({ k }: { k: boolean }) {
  const p = ERA.cold;
  const W = 720;
  const H = 280;
  const padL = 56;
  const padR = 16;
  const padT = 30;
  const padB = 44;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const xMin = STOCKPILE[0].year;
  const xMax = STOCKPILE[STOCKPILE.length - 1].year;
  const yMax = 75000;
  const xScale = (year: number) => padL + ((year - xMin) / (xMax - xMin)) * innerW;
  const yScale = (v: number)    => padT + innerH - (v / yMax) * innerH;
  const path = STOCKPILE.map((d, i) => `${i === 0 ? "M" : "L"}${xScale(d.year).toFixed(1)},${yScale(d.total).toFixed(1)}`).join(" ");

  // y ticks
  const yTicks = [0, 20000, 40000, 60000, 70000];

  return (
    <div
      className="rounded-2xl border-2 p-3 sm:p-4"
      style={{ borderColor: p.accent, backgroundColor: p.paper }}
      data-testid="stockpile-timeline"
    >
      <div className={`text-xs font-bold mb-1 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: p.accent }}>
        {k ? "ឃ្លាំងក្បាលគ្រាប់នុយក្លេអ៊ែរពិភពលោក · ១៩៤៥–២០២៤" : "GLOBAL NUCLEAR STOCKPILE · 1945–2024"}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Stockpile timeline">
        {/* grid */}
        {yTicks.map((tk) => (
          <g key={tk}>
            <line x1={padL} y1={yScale(tk)} x2={W - padR} y2={yScale(tk)} stroke="#475569" strokeDasharray="2 3" opacity="0.6" />
            <text x={padL - 6} y={yScale(tk) + 3} fontSize="9" textAnchor="end" fill="#cbd5e1" fontFamily="monospace">
              {num(k, (tk / 1000).toFixed(0))}{k ? "K" : "K"}
            </text>
          </g>
        ))}
        {/* x axis labels */}
        {[1945, 1960, 1980, 2000, 2024].map((yr) => (
          <text key={yr} x={xScale(yr)} y={H - 24} fontSize="9" textAnchor="middle" fill="#cbd5e1" fontFamily="monospace">
            {num(k, yr)}
          </text>
        ))}
        {/* fill */}
        <path d={`${path} L${xScale(xMax)},${yScale(0)} L${xScale(xMin)},${yScale(0)} Z`} fill={p.accent} opacity="0.18" />
        {/* line */}
        <path d={path} fill="none" stroke={p.accent} strokeWidth="2.4" />
        {/* peak marker */}
        {(() => {
          const peak = STOCKPILE.reduce((a, b) => (b.total > a.total ? b : a));
          return (
            <g transform={`translate(${xScale(peak.year)},${yScale(peak.total)})`}>
              <circle r="5" fill="#fbbf24" stroke={p.accent} strokeWidth="2" />
              <text x="8" y="-6" fontSize="10" fill="#fbbf24" fontFamily={k ? "Hanuman, serif" : "monospace"}>
                {k ? "កំពូល" : "PEAK"} · {num(k, peak.year)} · {num(k, "70.3K")} ☢
              </text>
            </g>
          );
        })()}
        {/* today marker */}
        {(() => {
          const today = STOCKPILE[STOCKPILE.length - 1];
          return (
            <g transform={`translate(${xScale(today.year)},${yScale(today.total)})`}>
              <circle r="5" fill="#22c55e" stroke="#fff" strokeWidth="1.5" />
              <text x="-8" y="-8" fontSize="10" textAnchor="end" fill="#86efac" fontFamily={k ? "Hanuman, serif" : "monospace"}>
                {k ? "សព្វថ្ងៃ" : "TODAY"} · {num(k, "12.5K")}
              </text>
            </g>
          );
        })()}
        {/* axis lines */}
        <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#475569" />
        <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#475569" />
      </svg>
      <div className={`mt-1 text-[11px] text-center ${k ? "font-khmer" : ""}`} style={{ color: "#94a3b8" }}>
        {k
          ? "ឃ្លាំងធ្លាក់ចុះ ៨២% ពីកំពូលឆ្នាំ ១៩៨៦ ប៉ុន្តែគ្រាប់ ១២,៥០០ ក៏គ្រប់គ្រាន់បំផ្លាញពិភពលោកច្រើនដងហើយ។"
          : "Down 82% from the 1986 peak — but 12,500 warheads are still enough to destroy the world many times over."}
      </div>
    </div>
  );
}

