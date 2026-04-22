import { useMemo, useState } from "react";
import {
  GraduationCap, Pencil, BookText, Highlighter, ListChecks,
  ChevronsUp, ChevronsRight, AlertTriangle, Search,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

/* ──────────────────────────────────────────────────────────────────────
 * Comparing the World: Comparative & Superlative Adjectives
 * ការប្រៀបធៀបពិភពលោក៖ គុណនាមប្រៀបធៀប និងកម្រិតខ្ពស់បំផុត
 *
 * Audience: Cambodian ESL learners.
 * Aesthetic: "English Classroom" — notebook-paper whites, crisp blue
 * borders, and red highlighting on the morphological suffixes/qualifiers
 * (-er, -est, more, most) so the structural changes pop visually.
 * ────────────────────────────────────────────────────────────────────── */

type RuleId = 1 | 2 | 3 | 4 | 5 | 6;

/** A morphological "diff" pair — splits a comparative/superlative form into
 *  (unchanged stem, highlighted change). Lets us render the red suffix or
 *  prefix without hard-coding HTML in the data layer. */
type Diff = { stem: string; change: string; mode: "suffix" | "prefix" | "irregular" };

type WordEntry = {
  base: string;
  comparative: Diff;
  superlative: Diff;
  kh: string;
  rule: RuleId;
};

/** Helpers to build the diff pairs cleanly. */
const suffix = (stem: string, change: string): Diff => ({ stem, change, mode: "suffix" });
const prefix = (change: string, stem: string): Diff => ({ stem, change, mode: "prefix" });
const irregular = (full: string): Diff => ({ stem: "", change: full, mode: "irregular" });

const VOCABULARY: WordEntry[] = [
  { base: "Tall",      comparative: suffix("Tall", "er"),       superlative: suffix("Tall", "est"),       kh: "ខ្ពស់",            rule: 1 },
  { base: "Short",     comparative: suffix("Short", "er"),      superlative: suffix("Short", "est"),      kh: "ទាប / ខ្លី",        rule: 1 },
  { base: "Big",       comparative: suffix("Big", "ger"),       superlative: suffix("Big", "gest"),       kh: "ធំ",               rule: 3 },
  { base: "Small",     comparative: suffix("Small", "er"),      superlative: suffix("Small", "est"),      kh: "តូច",              rule: 1 },
  { base: "Fast",      comparative: suffix("Fast", "er"),       superlative: suffix("Fast", "est"),       kh: "លឿន",             rule: 1 },
  { base: "Slow",      comparative: suffix("Slow", "er"),       superlative: suffix("Slow", "est"),       kh: "យឺត",              rule: 1 },
  { base: "Hot",       comparative: suffix("Hot", "ter"),       superlative: suffix("Hot", "test"),       kh: "ក្ដៅ",              rule: 3 },
  { base: "Cold",      comparative: suffix("Cold", "er"),       superlative: suffix("Cold", "est"),       kh: "ត្រជាក់",          rule: 1 },
  { base: "Happy",     comparative: suffix("Happ", "ier"),      superlative: suffix("Happ", "iest"),      kh: "សប្បាយចិត្ត",  rule: 4 },
  { base: "Sad",       comparative: suffix("Sad", "der"),       superlative: suffix("Sad", "dest"),       kh: "សោកសៅ",         rule: 3 },
  { base: "Heavy",     comparative: suffix("Heav", "ier"),      superlative: suffix("Heav", "iest"),      kh: "ធ្ងន់",            rule: 4 },
  { base: "Light",     comparative: suffix("Light", "er"),      superlative: suffix("Light", "est"),      kh: "ស្រាល",            rule: 1 },
  { base: "Smart",     comparative: suffix("Smart", "er"),      superlative: suffix("Smart", "est"),      kh: "ឆ្លាត",            rule: 1 },
  { base: "Easy",      comparative: suffix("Eas", "ier"),       superlative: suffix("Eas", "iest"),       kh: "ងាយស្រួល",      rule: 4 },
  { base: "Hard",      comparative: suffix("Hard", "er"),       superlative: suffix("Hard", "est"),       kh: "ពិបាក",            rule: 1 },
  { base: "Young",     comparative: suffix("Young", "er"),      superlative: suffix("Young", "est"),      kh: "ក្មេង",            rule: 1 },
  { base: "Old",       comparative: suffix("Old", "er"),        superlative: suffix("Old", "est"),        kh: "ចាស់",             rule: 1 },
  { base: "Beautiful", comparative: prefix("More ", "beautiful"), superlative: prefix("Most ", "beautiful"), kh: "ស្រស់ស្អាត", rule: 5 },
  { base: "Good",      comparative: irregular("Better"),        superlative: irregular("Best"),           kh: "ល្អ",              rule: 6 },
  { base: "Bad",       comparative: irregular("Worse"),         superlative: irregular("Worst"),          kh: "អាក្រក់",          rule: 6 },
];

/** Renders a Diff as plain text with the changed portion highlighted in red.
 *  This is the "English Classroom" structural-change cue. */
function MorphForm({ diff }: { diff: Diff }) {
  if (diff.mode === "irregular") {
    return (
      <span className="inline-flex items-baseline gap-1">
        <span className="font-bold text-rose-700 underline decoration-rose-400 decoration-2 underline-offset-2">
          {diff.change}
        </span>
        <span
          className="text-[10px] uppercase tracking-wider text-rose-500/80 font-mono"
          aria-label="irregular / មិនទៀង"
          title="irregular / មិនទៀង"
        >
          irr. · មិនទៀង
        </span>
      </span>
    );
  }
  if (diff.mode === "prefix") {
    return (
      <span>
        <span className="font-bold text-rose-600">{diff.change}</span>
        <span className="text-slate-800">{diff.stem}</span>
      </span>
    );
  }
  // suffix
  return (
    <span>
      <span className="text-slate-800">{diff.stem}</span>
      <span className="font-bold text-rose-600">{diff.change}</span>
    </span>
  );
}

/* Rule metadata — colour-coded so each card stays visually distinct. */
const RULES: {
  id: RuleId;
  titleEn: string;
  titleKh: string;
  ruleEn: string;
  ruleKh: string;
  example: { base: string; comparative: Diff; superlative: Diff };
  Icon: typeof Pencil;
  tone: string;
  badgeTone: string;
}[] = [
  {
    id: 1,
    titleEn: "Short Words (1 syllable)",
    titleKh: "ពាក្យខ្លី (១ ព្យាង្គ)",
    ruleEn: "Add -er and -est.",
    ruleKh: "បន្ថែម -er និង -est ។",
    example: { base: "Fast", comparative: suffix("Fast", "er"), superlative: suffix("Fast", "est") },
    Icon: Pencil,
    tone: "bg-sky-50 border-sky-300",
    badgeTone: "bg-sky-600 text-white",
  },
  {
    id: 2,
    titleEn: "Words ending in 'e'",
    titleKh: "ពាក្យដែលបញ្ចប់ដោយ 'e'",
    ruleEn: "Just add -r and -st.",
    ruleKh: "បន្ថែមតែ -r និង -st ប៉ុណ្ណោះ ។",
    example: { base: "Large", comparative: suffix("Large", "r"), superlative: suffix("Large", "st") },
    Icon: BookText,
    tone: "bg-emerald-50 border-emerald-300",
    badgeTone: "bg-emerald-600 text-white",
  },
  {
    id: 3,
    titleEn: "Consonant-Vowel-Consonant",
    titleKh: "ព្យញ្ជនៈ-ស្រៈ-ព្យញ្ជនៈ",
    ruleEn: "Double the last letter, then add -er / -est.",
    ruleKh: "ទ្វេអក្សរចុងក្រោយ បន្ទាប់មកបន្ថែម -er / -est ។",
    example: { base: "Hot", comparative: suffix("Hot", "ter"), superlative: suffix("Hot", "test") },
    Icon: Highlighter,
    tone: "bg-amber-50 border-amber-300",
    badgeTone: "bg-amber-600 text-white",
  },
  {
    id: 4,
    titleEn: "Words ending in 'y'",
    titleKh: "ពាក្យដែលបញ្ចប់ដោយ 'y'",
    ruleEn: "Drop the y, change to i, then add -er / -est.",
    ruleKh: "លុប 'y' ប្ដូរទៅជា 'i' រួចបន្ថែម -er / -est ។",
    example: { base: "Happy", comparative: suffix("Happ", "ier"), superlative: suffix("Happ", "iest") },
    Icon: ListChecks,
    tone: "bg-violet-50 border-violet-300",
    badgeTone: "bg-violet-600 text-white",
  },
  {
    id: 5,
    titleEn: "Long Words (2+ syllables)",
    titleKh: "ពាក្យវែង (២ ព្យាង្គឡើង)",
    ruleEn: "Don't change the word — use 'more' and 'most' in front.",
    ruleKh: "កុំប្តូរពាក្យ — ប្រើ 'more' និង 'most' នៅខាងមុខ ។",
    example: {
      base: "Beautiful",
      comparative: prefix("More ", "beautiful"),
      superlative: prefix("Most ", "beautiful"),
    },
    Icon: ChevronsRight,
    tone: "bg-cyan-50 border-cyan-300",
    badgeTone: "bg-cyan-600 text-white",
  },
  {
    id: 6,
    titleEn: "The Rule Breakers (Irregular)",
    titleKh: "ពាក្យលើកលែង (មិនមានច្បាប់)",
    ruleEn: "Memorize them — they don't follow any rule!",
    ruleKh: "ត្រូវចងចាំ — ពាក្យទាំងនេះមិនអនុវត្តតាមច្បាប់ណាមួយឡើយ!",
    example: { base: "Good", comparative: irregular("Better"), superlative: irregular("Best") },
    Icon: AlertTriangle,
    tone: "bg-rose-50 border-rose-300",
    badgeTone: "bg-rose-600 text-white",
  },
];

export function ComparativeSuperlativeModule() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [query, setQuery] = useState("");
  const [activeRule, setActiveRule] = useState<RuleId | "all">("all");

  const filteredVocab = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VOCABULARY.filter((w) => {
      if (activeRule !== "all" && w.rule !== activeRule) return false;
      if (!q) return true;
      return (
        w.base.toLowerCase().includes(q) ||
        w.kh.includes(query.trim())
      );
    });
  }, [query, activeRule]);

  return (
    <section
      aria-label="Comparing the World: Comparative & Superlative Adjectives / ការប្រៀបធៀបពិភពលោក ៖ គុណនាមប្រៀបធៀប និងកម្រិតខ្ពស់បំផុត"
      data-testid="comparative-superlative-module"
      className="rounded-3xl border-4 border-blue-300 bg-white shadow-md overflow-hidden"
      style={{
        // Faint notebook-paper rule lines for the "English Classroom" feel.
        backgroundImage:
          "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(59,130,246,0.07) 31px, rgba(59,130,246,0.07) 32px)",
      }}
    >
      {/* ── Header ────────────────────────────────────────────────── */}
      <header className="px-5 sm:px-8 pt-6 pb-5 border-b-4 border-blue-200 bg-white/70 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white shadow-md flex-shrink-0">
            <GraduationCap className="w-6 h-6" />
          </span>
          <div className="min-w-0">
            {/* Strictly bilingual eyebrow — both languages always visible */}
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-blue-700 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span>Grammar Lesson</span>
              <span aria-hidden className="opacity-50">·</span>
              <span className="font-khmer normal-case tracking-normal text-xs">មេរៀនវេយ្យាករណ៍</span>
            </div>
            <h2
              id="comp-sup-heading"
              className={`font-display text-2xl sm:text-3xl font-extrabold text-blue-900 leading-tight mt-0.5 ${kh ? "font-khmer leading-snug" : ""}`}
            >
              {kh
                ? "ការប្រៀបធៀបពិភពលោក៖ គុណនាមប្រៀបធៀប និងកម្រិតខ្ពស់បំផុត"
                : "Comparing the World: Comparative & Superlative Adjectives"}
            </h2>
            <p className={`mt-1 text-sm text-slate-600 ${kh ? "font-khmer text-base leading-loose" : ""}`}>
              {kh
                ? "Comparing the World: Comparative & Superlative Adjectives"
                : "ការប្រៀបធៀបពិភពលោក៖ គុណនាមប្រៀបធៀប និងកម្រិតខ្ពស់បំផុត"}
            </p>
          </div>
        </div>
      </header>

      {/* ── 1. Core Concept ──────────────────────────────────────── */}
      <CoreConcept kh={kh} />

      {/* ── 2. Six Spelling Rule Cards ───────────────────────────── */}
      <RulesGrid kh={kh} />

      {/* ── 3. 20-Word Vocabulary Bank ───────────────────────────── */}
      <VocabularyBank
        kh={kh}
        rows={filteredVocab}
        query={query}
        onQuery={setQuery}
        activeRule={activeRule}
        onRule={setActiveRule}
      />
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* SECTION 1 — Core Concept (the three levels of measurement)           */
/* ──────────────────────────────────────────────────────────────────── */

function CoreConcept({ kh }: { kh: boolean }) {
  const tiers: {
    levelEn: string;
    levelKh: string;
    countEn: string;
    countKh: string;
    sentenceEn: React.ReactNode;
    sentenceKh: string;
    badgeTone: string;
    cardTone: string;
    pillTone: string;
  }[] = [
    {
      levelEn: "Base Adjective",
      levelKh: "គុណនាមមូលដ្ឋាន",
      countEn: "Describes ONE thing",
      countKh: "ពិពណ៌នាវត្ថុ ១ មុខ",
      sentenceEn: <>The elephant is <strong className="text-blue-700">big</strong>.</>,
      sentenceKh: "ដំរីគឺធំ ។",
      badgeTone: "bg-blue-100 text-blue-800 border-blue-300",
      cardTone: "border-blue-300",
      pillTone: "bg-blue-600 text-white",
    },
    {
      levelEn: "Comparative",
      levelKh: "ប្រៀបធៀប",
      countEn: "Compares exactly TWO things",
      countKh: "ប្រៀបធៀបវត្ថុ ២ មុខ",
      sentenceEn: (
        <>
          The elephant is <strong className="text-rose-600">bigger</strong> than the dog.
        </>
      ),
      sentenceKh: "ដំរីធំជាងឆ្កែ ។",
      badgeTone: "bg-rose-100 text-rose-800 border-rose-300",
      cardTone: "border-rose-300",
      pillTone: "bg-rose-600 text-white",
    },
    {
      levelEn: "Superlative",
      levelKh: "កម្រិតខ្ពស់បំផុត",
      countEn: "Compares THREE OR MORE things",
      countKh: "ប្រៀបធៀបវត្ថុ ៣ ឬច្រើនជាងនេះ",
      sentenceEn: (
        <>
          The elephant is the <strong className="text-rose-600">biggest</strong> animal on land.
        </>
      ),
      sentenceKh: "ដំរីគឺជាសត្វធំបំផុតនៅលើគោក ។",
      badgeTone: "bg-amber-100 text-amber-800 border-amber-300",
      cardTone: "border-amber-300",
      pillTone: "bg-amber-600 text-white",
    },
  ];

  return (
    <div className="px-5 sm:px-8 py-6 border-b-4 border-blue-100 bg-white/60">
      <SectionTitle
        kh={kh}
        en="1. The Core Concept"
        khText="១. គោលគំនិតសំខាន់"
      />
      {/* Strictly bilingual intro — both languages always rendered. */}
      <div className="mt-1 mb-4 text-sm text-slate-600">
        <p>There are three levels of measurement:</p>
        <p className="font-khmer text-base leading-loose text-slate-500">
          មាន ៣ កម្រិតនៃការវាស់ស្ទង់ ៖
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((t, i) => (
          <article
            key={t.levelEn}
            data-testid={`concept-tier-${i + 1}`}
            className={`relative rounded-2xl border-2 ${t.cardTone} bg-white p-4 shadow-sm`}
          >
            <span
              className={`absolute -top-3 left-4 inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-extrabold border-2 border-white ${t.pillTone}`}
              aria-hidden
            >
              {i + 1}
            </span>
            {/* Bilingual level badge — both languages always visible */}
            <div className={`inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${t.badgeTone}`}>
              <span>{t.levelEn}</span>
              <span aria-hidden className="opacity-50">·</span>
              <span className="font-khmer normal-case tracking-normal text-xs">{t.levelKh}</span>
            </div>
            {/* Bilingual cardinality hint */}
            <div className="mt-2 text-xs text-slate-600 leading-relaxed">
              <div>{t.countEn}</div>
              <div className="font-khmer text-sm leading-loose text-slate-500">{t.countKh}</div>
            </div>

            {/* Example sentence — English (always shown, since this is an English lesson) */}
            <p className="mt-3 text-base sm:text-lg leading-snug text-slate-800">
              {t.sentenceEn}
            </p>
            {/* Khmer mirror */}
            <p className="mt-1 font-khmer text-sm text-slate-600 leading-loose">
              {t.sentenceKh}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* SECTION 2 — The 6 Spelling Rule Cards                                */
/* ──────────────────────────────────────────────────────────────────── */

function RulesGrid({ kh }: { kh: boolean }) {
  return (
    <div className="px-5 sm:px-8 py-6 border-b-4 border-blue-100 bg-white/60">
      <SectionTitle
        kh={kh}
        en="2. The Rules of Spelling"
        khText="២. ច្បាប់នៃការប្រកប"
      />

      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RULES.map((r) => {
          const Icon = r.Icon;
          return (
            <article
              key={r.id}
              data-testid={`rule-card-${r.id}`}
              className={`relative rounded-2xl border-2 ${r.tone} p-4 shadow-sm`}
            >
              <div className="flex items-start gap-2 mb-2">
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-extrabold flex-shrink-0 ${r.badgeTone}`}>
                  {r.id}
                </span>
                <Icon className="w-4 h-4 text-slate-600 mt-1.5 flex-shrink-0" aria-hidden />
                {/* Bilingual title — both languages are always shown so the
                    lesson stays "strictly bilingual" regardless of UI language. */}
                <hgroup className="min-w-0">
                  <h4 className={`font-bold text-sm sm:text-base text-slate-800 leading-tight ${kh ? "font-khmer text-base leading-snug" : ""}`}>
                    {kh ? r.titleKh : r.titleEn}
                  </h4>
                  <p className={`text-[11px] font-normal text-slate-500 leading-snug ${kh ? "" : "font-khmer text-xs leading-loose"}`}>
                    {kh ? r.titleEn : r.titleKh}
                  </p>
                </hgroup>
              </div>

              {/* Bilingual rule explanation — both languages always rendered. */}
              <p className={`text-sm text-slate-700 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : ""}`}>
                {kh ? r.ruleKh : r.ruleEn}
              </p>
              <p className={`mt-1 text-xs italic text-slate-500 leading-relaxed ${kh ? "" : "font-khmer not-italic text-sm leading-loose"}`}>
                {kh ? r.ruleEn : r.ruleKh}
              </p>

              {/* Worked example — Base → Comparative → Superlative */}
              <div className="mt-3 rounded-xl border-2 border-dashed border-slate-300 bg-white px-3 py-2.5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-base sm:text-lg font-semibold">
                  <span className="text-slate-800">{r.example.base}</span>
                  <ChevronsRight className="w-4 h-4 text-slate-400" aria-hidden />
                  <MorphForm diff={r.example.comparative} />
                  <ChevronsRight className="w-4 h-4 text-slate-400" aria-hidden />
                  <MorphForm diff={r.example.superlative} />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Legend explaining the red highlight convention — strictly bilingual,
          both languages always visible. */}
      <div className="mt-4 inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs text-blue-800">
        <Highlighter className="w-3.5 h-3.5 flex-shrink-0" aria-hidden />
        <span>Red text marks the structural change in the word.</span>
        <span aria-hidden className="opacity-50">·</span>
        <span className="font-khmer text-sm leading-loose">
          ផ្នែកដែលគូសក្រហមបង្ហាញពីការប្ដូរទម្រង់ពាក្យ ។
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* SECTION 3 — 20-Word Vocabulary Bank                                  */
/* ──────────────────────────────────────────────────────────────────── */

function VocabularyBank({
  kh,
  rows,
  query,
  onQuery,
  activeRule,
  onRule,
}: {
  kh: boolean;
  rows: WordEntry[];
  query: string;
  onQuery: (s: string) => void;
  activeRule: RuleId | "all";
  onRule: (r: RuleId | "all") => void;
}) {
  return (
    <div className="px-5 sm:px-8 py-6 bg-white/60">
      <SectionTitle
        kh={kh}
        en="3. The 20-Word Vocabulary Bank"
        khText="៣. កម្រងពាក្យចំនួន ២០"
      />

      {/* Filter row: search + rule chips */}
      <div className="mt-3 mb-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <label className="relative w-full sm:max-w-xs">
          {/* Bilingual SR-only label so screen readers always hear both. */}
          <span className="sr-only">Search words / ស្វែងរកពាក្យ</span>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search · ស្វែងរក… (e.g. tall · ខ្ពស់)"
            className="w-full pl-9 pr-3 py-2 rounded-xl border-2 border-blue-200 bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            data-testid="vocab-search"
          />
        </label>
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="group"
          aria-label="Filter by rule / តម្រងតាមច្បាប់"
        >
          {/* Strictly bilingual filter label, always visible */}
          <span className="text-xs font-bold text-blue-700 mr-1">
            <span>Filter</span>
            <span aria-hidden className="opacity-50 mx-1">·</span>
            <span className="font-khmer text-sm">តម្រង</span>
          </span>
          <RuleChip kh={kh} active={activeRule === "all"} onClick={() => onRule("all")}>
            <span className="inline-flex items-center gap-1">
              <span>All</span>
              <span aria-hidden className="opacity-50">·</span>
              <span className="font-khmer">ទាំងអស់</span>
            </span>
          </RuleChip>
          {RULES.map((r) => (
            <RuleChip
              key={r.id}
              kh={kh}
              active={activeRule === r.id}
              onClick={() => onRule(r.id)}
              testId={`rule-chip-${r.id}`}
            >
              {r.id}
            </RuleChip>
          ))}
        </div>
      </div>

      {/* Vocabulary table — alternating-row "notebook" style with red suffixes */}
      <div className="overflow-x-auto rounded-2xl border-2 border-blue-300 bg-white shadow-sm">
        <table className="w-full text-sm sm:text-base" data-testid="vocab-table">
          <caption className="sr-only">
            Adjective table: Base, Comparative, Superlative, and Khmer translation / តារាងគុណនាម ៖ មូលដ្ឋាន ប្រៀបធៀប កម្រិតខ្ពស់បំផុត និងការបកប្រែ
          </caption>
          <thead className="bg-blue-600 text-white text-left">
            <tr>
              {/* Strictly bilingual column headers — both languages always
                  visible, stacked so the table stays scannable. */}
              <th scope="col" className="px-3 sm:px-4 py-2.5 font-bold align-top">
                <div>Base</div>
                <div className="font-khmer text-xs font-normal text-white/85 leading-loose">មូលដ្ឋាន</div>
              </th>
              <th scope="col" className="px-3 sm:px-4 py-2.5 font-bold align-top">
                <div className="inline-flex items-center gap-1">
                  <ChevronsUp className="w-3.5 h-3.5 rotate-90" aria-hidden />
                  <span>Comparative</span>
                </div>
                <div className="font-khmer text-xs font-normal text-white/85 leading-loose">ប្រៀបធៀប</div>
              </th>
              <th scope="col" className="px-3 sm:px-4 py-2.5 font-bold align-top">
                <div className="inline-flex items-center gap-1">
                  <ChevronsUp className="w-3.5 h-3.5" aria-hidden />
                  <span>Superlative</span>
                </div>
                <div className="font-khmer text-xs font-normal text-white/85 leading-loose">កម្រិតខ្ពស់បំផុត</div>
              </th>
              <th scope="col" className="px-3 sm:px-4 py-2.5 font-bold align-top">
                <div>Khmer Translation</div>
                <div className="font-khmer text-xs font-normal text-white/85 leading-loose">ការបកប្រែខ្មែរ</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-500 italic">
                  <span>No words match your filter.</span>
                  <span aria-hidden className="opacity-50 mx-2">·</span>
                  <span className="font-khmer text-base leading-loose">រកមិនឃើញពាក្យដែលត្រូវនឹងតម្រងទេ ។</span>
                </td>
              </tr>
            ) : (
              rows.map((w, i) => (
                <tr
                  key={w.base}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-blue-50/60"} border-t border-blue-100`}
                  data-testid={`vocab-row-${w.base.toLowerCase()}`}
                >
                  <td className="px-3 sm:px-4 py-2.5 font-bold text-slate-900">
                    {w.base}
                    <span
                      className="ml-1.5 text-[10px] font-mono text-slate-400"
                      title={`Rule ${w.rule} / ច្បាប់ទី ${w.rule}`}
                      aria-label={`Rule ${w.rule} / ច្បាប់ទី ${w.rule}`}
                    >
                      R{w.rule}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-2.5">
                    <MorphForm diff={w.comparative} />
                  </td>
                  <td className="px-3 sm:px-4 py-2.5">
                    <MorphForm diff={w.superlative} />
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 font-khmer text-slate-700 leading-loose">
                    {w.kh}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Strictly bilingual count footer — both lines always rendered. */}
      <div className="mt-3 text-xs text-slate-500">
        <p>{`Showing ${rows.length} of ${VOCABULARY.length} words.`}</p>
        <p className="font-khmer text-sm leading-loose">
          {`កំពុងបង្ហាញ ${rows.length} ក្នុងចំណោម ${VOCABULARY.length} ពាក្យ ។`}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* Small shared bits                                                    */
/* ──────────────────────────────────────────────────────────────────── */

/** Always renders both English and Khmer side-by-side. Primary text follows
 *  the user's selected UI language; the other language sits underneath as a
 *  smaller italic mirror. This satisfies the "strictly bilingual" lesson
 *  requirement on every heading. */
function SectionTitle({ kh, en, khText }: { kh: boolean; en: string; khText: string }) {
  const primary = kh ? khText : en;
  const secondary = kh ? en : khText;
  return (
    <hgroup>
      <h3 className={`font-display text-lg sm:text-xl font-bold text-blue-900 leading-snug ${kh ? "font-khmer" : ""}`}>
        {primary}
      </h3>
      <p className={`mt-0.5 text-sm font-normal italic text-slate-500 ${kh ? "" : "font-khmer not-italic leading-loose"}`}>
        {secondary}
      </p>
    </hgroup>
  );
}

function RuleChip({
  kh, active, onClick, children, testId,
}: {
  kh: boolean;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  testId?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      data-testid={testId}
      className={`min-w-[2.25rem] px-2.5 py-1 rounded-lg text-xs font-bold border-2 transition-colors ${
        active
          ? "bg-blue-600 text-white border-blue-700 shadow-sm"
          : "bg-white text-blue-700 border-blue-200 hover:border-blue-400"
      } ${kh ? "font-khmer" : ""}`}
    >
      {children}
    </button>
  );
}
