import { useMemo, useRef, useState } from "react";
import {
  PenLine,
  Sandwich,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Sparkles,
  Copy,
  RotateCcw,
  ArrowRight,
  Quote,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

type Tip = {
  id: string;
  level: "warn" | "info" | "good";
  en: string;
  kh: string;
};

const TRANSITION_WORDS = [
  "first", "second", "next", "also", "in addition", "additionally",
  "for example", "for instance", "another", "moreover", "furthermore",
  "however", "because", "since", "therefore", "finally", "lastly",
  "in conclusion", "to sum up", "overall",
];

function countSentences(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  // Split on sentence-ending punctuation, drop empty fragments
  return trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function endsWithPunctuation(text: string): boolean {
  return /[.!?]\s*$/.test(text.trim());
}

function startsCapitalized(text: string): boolean {
  const t = text.trim();
  if (!t) return true;
  const first = t[0];
  return first === first.toUpperCase() && first !== first.toLowerCase();
}

function hasTransition(text: string): boolean {
  const lower = text.toLowerCase().trim();
  return TRANSITION_WORDS.some((w) => lower.startsWith(w + " ") || lower.startsWith(w + ","));
}

export function ParagraphBuilder() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [topic, setTopic]       = useState("");
  const [detail1, setDetail1]   = useState("");
  const [detail2, setDetail2]   = useState("");
  const [closing, setClosing]   = useState("");
  const [combined, setCombined] = useState<string | null>(null);
  const [copied, setCopied]     = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  function combine() {
    // Auto-add a period if the user forgot
    const polish = (s: string) => {
      const t = s.trim();
      if (!t) return "";
      return endsWithPunctuation(t) ? t : t + ".";
    };
    const parts = [topic, detail1, detail2, closing].map(polish).filter(Boolean);
    setCombined(parts.join(" "));
    setCopied(false);
    // Smooth-scroll the preview into view
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
  }

  function reset() {
    setTopic("");
    setDetail1("");
    setDetail2("");
    setClosing("");
    setCombined(null);
    setCopied(false);
  }

  async function copyParagraph() {
    if (!combined) return;
    try {
      await navigator.clipboard.writeText(combined);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  }

  function loadExample() {
    setTopic("My favorite season is the rainy season in Cambodia.");
    setDetail1("First, the rain cools the air after the hot months and makes everything feel fresh.");
    setDetail2("Also, the rice fields turn bright green, which is beautiful and important for our farmers.");
    setClosing("For these reasons, the rainy season is the part of the year I look forward to the most.");
    setCombined(null);
  }

  const allFilled = !!(topic.trim() && detail1.trim() && detail2.trim() && closing.trim());
  const filledCount = [topic, detail1, detail2, closing].filter((s) => s.trim()).length;

  // Build tips against the latest combined paragraph (or live preview if not combined yet)
  const tips: Tip[] = useMemo(() => {
    const text = combined ?? [topic, detail1, detail2, closing].filter((s) => s.trim()).join(" ");
    if (!text.trim()) return [];

    const list: Tip[] = [];
    const sCount = countSentences(text);
    const wCount = countWords(text);

    if (filledCount < 4) {
      list.push({
        id: "fill-all",
        level: "info",
        en: `Tip: Fill in all 4 boxes (${filledCount}/4 done) so your paragraph has a beginning, middle, and end.`,
        kh: `គន្លឹះ៖ បំពេញគ្រប់ប្រអប់ទាំង ៤ (${filledCount}/4 បានរួច) ដើម្បីឱ្យកថាខណ្ឌរបស់អ្នកមានដើម កណ្ដាល និងចុង។`,
      });
    }

    if (sCount > 0 && sCount < 3) {
      list.push({
        id: "min-sentences",
        level: "warn",
        en: "Tip: Good paragraphs usually have at least 3–5 sentences to fully explain the idea!",
        kh: "គន្លឹះ៖ កថាខណ្ឌល្អៗ ជាធម្មតាមានយ៉ាងហោចណាស់ ៣-៥ ប្រយោគ ដើម្បីពន្យល់គំនិតឱ្យបានពេញលេញ!",
      });
    }

    if (wCount > 0 && wCount < 25) {
      list.push({
        id: "too-short",
        level: "warn",
        en: `Try to add more detail — your paragraph is ${wCount} words. Aim for 40–80 words.`,
        kh: `សូមព្យាយាមបន្ថែមសេចក្ដីលម្អិត — កថាខណ្ឌរបស់អ្នកមាន ${wCount} ពាក្យ។ គោលដៅគឺ ៤០-៨០ ពាក្យ។`,
      });
    }

    [
      { name: "Topic Sentence",       nameKh: "ប្រយោគប្រធាន",   text: topic },
      { name: "Detail 1",             nameKh: "សេចក្តីលម្អិត ១", text: detail1 },
      { name: "Detail 2",             nameKh: "សេចក្តីលម្អិត ២", text: detail2 },
      { name: "Concluding Sentence",  nameKh: "ប្រយោគបញ្ចប់",    text: closing },
    ].forEach(({ name, nameKh, text }) => {
      const t = text.trim();
      if (!t) return;
      if (!startsCapitalized(t)) {
        list.push({
          id: `cap-${name}`,
          level: "warn",
          en: `Capitalize the first letter of your ${name}.`,
          kh: `សូមសរសេរអក្សរធំនៅដើម ${nameKh}។`,
        });
      }
      if (!endsWithPunctuation(t)) {
        list.push({
          id: `punct-${name}`,
          level: "info",
          en: `Don't forget to end your ${name} with a period (.), question mark (?), or exclamation mark (!).`,
          kh: `កុំភ្លេចបិទ ${nameKh} ដោយសញ្ញាចុច (.) សញ្ញាសួរ (?) ឬសញ្ញាឧទាន (!)។`,
        });
      }
    });

    if (topic.trim() && countWords(topic) < 4) {
      list.push({
        id: "topic-short",
        level: "info",
        en: "Your topic sentence feels short — try to clearly state the main idea (5+ words).",
        kh: "ប្រយោគប្រធានរបស់អ្នកខ្លីពេក — សូមព្យាយាមបញ្ជាក់គំនិតសំខាន់ឱ្យច្បាស់ (៥ ពាក្យឡើង)។",
      });
    }

    if (detail1.trim() && detail2.trim() && !hasTransition(detail1) && !hasTransition(detail2)) {
      list.push({
        id: "transitions",
        level: "info",
        en: "Try a transition word at the start of a detail: First, Also, For example, Because, Finally…",
        kh: "សាកល្បងប្រើពាក្យបន្តនៅដើមសេចក្ដីលម្អិត៖ First, Also, For example, Because, Finally…",
      });
    }

    // Positive feedback
    if (allFilled && sCount >= 4 && wCount >= 40 &&
        [topic, detail1, detail2, closing].every((s) => endsWithPunctuation(s) && startsCapitalized(s))) {
      list.unshift({
        id: "great",
        level: "good",
        en: `Great work! ${sCount} sentences, ${wCount} words — your paragraph has a clear shape.`,
        kh: `ល្អណាស់! ${sCount} ប្រយោគ, ${wCount} ពាក្យ — កថាខណ្ឌរបស់អ្នកមានរូបរាងច្បាស់លាស់។`,
      });
    }

    return list;
  }, [combined, topic, detail1, detail2, closing, filledCount, allFilled]);

  return (
    <div className="rounded-3xl bg-white border-2 border-amber-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-amber-50 via-white to-orange-50 border-b border-amber-100">
        <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-amber-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <PenLine className="w-3.5 h-3.5" />
          <span>{kh ? "ឧបករណ៍សរសេរ" : "Writing Tool"}</span>
        </div>
        <h3 className={`font-display text-xl sm:text-2xl font-bold text-foreground mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? "ជំនួយការសរសេរកថាខណ្ឌ" : "Paragraph Builder & Assistant"}
          {kh && <span className="ml-2 text-sm text-muted-foreground font-sans font-normal">(Paragraph Builder)</span>}
        </h3>
        <p className={`mt-1 text-sm text-muted-foreground max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "សាងសង់កថាខណ្ឌអង់គ្លេសរបស់អ្នកម្ដងមួយប្រយោគ — ដូចជាការធ្វើ Hamburger មួយ! បន្ទាប់មកចុច «បង្គុំ» ដើម្បីមើលលទ្ធផលនិងទទួលគន្លឹះ។"
            : "Build your English paragraph one sentence at a time — like making a hamburger! Then click 'Combine' to see the result and get gentle tips."}
        </p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-0">
        {/* ── Hamburger guide ─────────────────────────── */}
        <HamburgerGuide kh={kh} />

        {/* ── Form + Preview ──────────────────────────── */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Progress + Example */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className={`flex items-center gap-2 text-xs ${kh ? "font-khmer leading-loose" : ""}`}>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((n) => (
                  <span
                    key={n}
                    className={`w-6 h-1.5 rounded-full transition ${
                      filledCount >= n ? "bg-amber-500" : "bg-stone-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-stone-600">
                {kh ? `បំពេញ ${filledCount}/4` : `${filledCount}/4 filled`}
              </span>
            </div>
            <button
              type="button"
              onClick={loadExample}
              className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 hover:bg-amber-200 transition ${kh ? "font-khmer" : ""}`}
            >
              <Sparkles className="w-3 h-3" />
              {kh ? "មើលគំរូ" : "See an example"}
            </button>
          </div>

          <SentenceBox
            step={1}
            color="amber"
            labelEn="Topic Sentence"
            labelKh="ប្រយោគប្រធាន"
            hintEn="What is your paragraph about? State the main idea clearly."
            hintKh="តើកថាខណ្ឌរបស់អ្នកនិយាយអំពីអ្វី? ចូរបញ្ជាក់គំនិតសំខាន់ឱ្យច្បាស់។"
            placeholder={kh ? "ឧ. The rainy season is my favorite time of year." : "e.g. The rainy season is my favorite time of year."}
            value={topic}
            onChange={setTopic}
            kh={kh}
            done={!!topic.trim()}
          />

          <SentenceBox
            step={2}
            color="emerald"
            labelEn="Supporting Detail 1"
            labelKh="សេចក្តីលម្អិត ១"
            hintEn="Give a fact, reason, or example. Try starting with 'First,…'"
            hintKh="ផ្ដល់ការពិត ហេតុផល ឬឧទាហរណ៍មួយ។ សាកល្បងចាប់ផ្ដើមដោយ ‹First,…›"
            placeholder={kh ? "ឧ. First, the rain cools the hot air…" : "e.g. First, the rain cools the hot air…"}
            value={detail1}
            onChange={setDetail1}
            kh={kh}
            done={!!detail1.trim()}
          />

          <SentenceBox
            step={3}
            color="emerald"
            labelEn="Supporting Detail 2"
            labelKh="សេចក្តីលម្អិត ២"
            hintEn="Add another fact, reason, or example. Try 'Also,…' or 'For example,…'"
            hintKh="បន្ថែមការពិត ហេតុផល ឬឧទាហរណ៍មួយទៀត។ សាកល្បង ‹Also,…› ឬ ‹For example,…›"
            placeholder={kh ? "ឧ. Also, the rice fields turn bright green…" : "e.g. Also, the rice fields turn bright green…"}
            value={detail2}
            onChange={setDetail2}
            kh={kh}
            done={!!detail2.trim()}
          />

          <SentenceBox
            step={4}
            color="amber"
            labelEn="Concluding Sentence"
            labelKh="ប្រយោគបញ្ចប់"
            hintEn="Wrap up your idea. Try 'For these reasons,…' or 'Overall,…'"
            hintKh="សង្ខេបគំនិតរបស់អ្នក។ សាកល្បង ‹For these reasons,…› ឬ ‹Overall,…›"
            placeholder={kh ? "ឧ. For these reasons, the rainy season is the best." : "e.g. For these reasons, the rainy season is the best."}
            value={closing}
            onChange={setClosing}
            kh={kh}
            done={!!closing.trim()}
          />

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="button"
              onClick={combine}
              disabled={filledCount === 0}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-sm shadow hover:bg-amber-700 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-600 ${kh ? "font-khmer" : ""}`}
            >
              <Sandwich className="w-4 h-4" />
              {kh ? "បង្គុំកថាខណ្ឌ" : "Combine Paragraph"}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={reset}
              className={`inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border-2 border-stone-200 text-stone-700 font-medium text-sm hover:bg-stone-50 transition ${kh ? "font-khmer" : ""}`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {kh ? "ចាប់ផ្ដើមឡើងវិញ" : "Start Over"}
            </button>
          </div>

          {/* Live preview */}
          {combined && (
            <div ref={previewRef} className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <PaperPreview text={combined} kh={kh} onCopy={copyParagraph} copied={copied} />
            </div>
          )}

          {/* Tips */}
          {tips.length > 0 && (
            <TipsPanel tips={tips} kh={kh} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Hamburger visual guide                                                */
/* ────────────────────────────────────────────────────────────────────── */

function HamburgerGuide({ kh }: { kh: boolean }) {
  return (
    <aside className="bg-gradient-to-b from-orange-50 to-amber-50 border-b lg:border-b-0 lg:border-r border-amber-100 p-5 sm:p-6">
      <div className={`text-[10px] font-mono uppercase tracking-widest text-orange-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kh ? "៣ ផ្នែកនៃកថាខណ្ឌ" : "The 3 Parts of a Paragraph"}
      </div>
      <h4 className={`mt-1 font-display font-bold text-base text-stone-800 flex items-center gap-1.5 ${kh ? "font-khmer leading-snug" : ""}`}>
        <Sandwich className="w-4 h-4 text-orange-600" />
        {kh ? "ច្បាប់ Hamburger" : "The Hamburger Rule"}
      </h4>

      <div className="mt-4 mx-auto w-full max-w-[220px]">
        {/* Top bun */}
        <BurgerLayer
          tone="bun-top"
          label={kh ? "បាននប័ងខាងលើ" : "Top Bun"}
          en="Topic Sentence"
          kh="ប្រយោគប្រធាន"
          desc={kh ? "តើគំនិតសំខាន់គឺអ្វី?" : "What's the main idea?"}
          showKh={kh}
        />
        {/* Lettuce */}
        <BurgerLayer tone="lettuce" />
        {/* Tomato */}
        <BurgerLayer tone="tomato" />
        {/* Patty */}
        <BurgerLayer
          tone="patty"
          label={kh ? "សាច់ + បន្លែ" : "Meat & Veggies"}
          en="Supporting Details"
          kh="សេចក្តីលម្អិត"
          desc={kh ? "ការពិត ឧទាហរណ៍ ឬហេតុផល" : "Facts, examples, or reasons"}
          showKh={kh}
        />
        {/* Cheese */}
        <BurgerLayer tone="cheese" />
        {/* Bottom bun */}
        <BurgerLayer
          tone="bun-bottom"
          label={kh ? "បាននប័ងខាងក្រោម" : "Bottom Bun"}
          en="Concluding Sentence"
          kh="ប្រយោគបញ្ចប់"
          desc={kh ? "សង្ខេប ឬផ្លាស់ប្ដូរទៅគំនិតបន្ទាប់" : "Summarize or transition"}
          showKh={kh}
        />
      </div>

      <p className={`mt-4 text-[11px] text-stone-600 leading-relaxed ${kh ? "font-khmer text-xs leading-loose" : ""}`}>
        {kh
          ? "កថាខណ្ឌមួយល្អត្រូវមានគ្រប់ ៣ ផ្នែក — ដូចជា Hamburger ដែលពេញលេញ!"
          : "A good paragraph has all 3 parts — just like a complete hamburger!"}
      </p>
    </aside>
  );
}

type Tone = "bun-top" | "bun-bottom" | "lettuce" | "tomato" | "patty" | "cheese";

function BurgerLayer({
  tone, label, en, kh, desc, showKh,
}: {
  tone: Tone;
  label?: string;
  en?: string;
  kh?: string;
  desc?: string;
  showKh?: boolean;
}) {
  const styles: Record<Tone, string> = {
    "bun-top":
      "h-12 rounded-t-[60%_100%] bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 border border-amber-600 relative",
    "bun-bottom":
      "h-10 rounded-b-[60%_100%] bg-gradient-to-t from-amber-500 via-amber-400 to-amber-300 border border-amber-600",
    lettuce:
      "h-3 -mt-0.5 -mx-2 bg-green-500 rounded-md border border-green-700 [clip-path:polygon(0_0,8%_50%,16%_0,24%_50%,32%_0,40%_50%,48%_0,56%_50%,64%_0,72%_50%,80%_0,88%_50%,96%_0,100%_30%,100%_100%,0_100%)]",
    tomato:
      "h-2.5 -mt-0.5 mx-1 bg-red-500 rounded border border-red-700",
    patty:
      "h-7 -mt-0.5 bg-gradient-to-b from-amber-900 via-stone-700 to-amber-950 border border-amber-950 rounded-sm relative",
    cheese:
      "h-2.5 -mt-0.5 -mx-1.5 bg-yellow-300 border border-yellow-500 rounded-sm [clip-path:polygon(0_0,100%_0,96%_100%,90%_60%,80%_100%,70%_60%,60%_100%,50%_60%,40%_100%,30%_60%,20%_100%,10%_60%,4%_100%)]",
  };

  return (
    <div className="relative group">
      <div className={styles[tone]} aria-hidden>
        {tone === "bun-top" && (
          // Sesame seeds
          <div className="absolute inset-0 flex items-center justify-center gap-1.5 mt-1">
            <span className="w-1.5 h-1 rounded-full bg-amber-100/90 rotate-12" />
            <span className="w-1.5 h-1 rounded-full bg-amber-100/90 -rotate-6" />
            <span className="w-1.5 h-1 rounded-full bg-amber-100/90 rotate-3" />
            <span className="w-1.5 h-1 rounded-full bg-amber-100/90 -rotate-12" />
            <span className="w-1.5 h-1 rounded-full bg-amber-100/90 rotate-6" />
          </div>
        )}
        {tone === "patty" && (
          <div className="absolute inset-0 opacity-40" aria-hidden>
            <div className="absolute top-1.5 left-3 w-1 h-1 rounded-full bg-amber-300" />
            <div className="absolute top-3 right-4 w-1 h-1 rounded-full bg-amber-300" />
            <div className="absolute bottom-1 left-1/2 w-1 h-1 rounded-full bg-amber-300" />
          </div>
        )}
      </div>
      {label && (
        <div className="mt-1.5 mb-2 text-center">
          <div className={`text-[9px] font-mono uppercase tracking-widest text-stone-500 ${showKh ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}>
            {label}
          </div>
          <div className={`text-xs font-bold text-stone-800 ${showKh ? "font-khmer text-sm" : ""}`}>
            {showKh ? kh : en}
            {showKh && <span className="ml-1 text-[10px] font-normal text-stone-500 font-sans">({en})</span>}
          </div>
          {desc && (
            <div className={`text-[10px] text-stone-500 italic mt-0.5 ${showKh ? "font-khmer not-italic text-[11px] leading-loose" : ""}`}>
              {desc}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Numbered sentence input                                               */
/* ────────────────────────────────────────────────────────────────────── */

function SentenceBox({
  step, color, labelEn, labelKh, hintEn, hintKh, placeholder, value, onChange, kh, done,
}: {
  step: number;
  color: "amber" | "emerald";
  labelEn: string;
  labelKh: string;
  hintEn: string;
  hintKh: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  kh: boolean;
  done: boolean;
}) {
  const ring = color === "amber"
    ? "border-amber-200 focus-within:border-amber-500 focus-within:ring-amber-200"
    : "border-emerald-200 focus-within:border-emerald-500 focus-within:ring-emerald-200";
  const badge = color === "amber" ? "bg-amber-500 text-white" : "bg-emerald-500 text-white";
  const wordCount = countWords(value);

  return (
    <div className={`rounded-xl border-2 bg-white transition focus-within:ring-4 ${ring}`}>
      <div className="flex items-start gap-3 p-3 sm:p-4">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${badge} flex items-center justify-center font-bold text-sm shadow-sm`}>
          {done ? <CheckCircle2 className="w-4 h-4" /> : step}
        </div>
        <div className="min-w-0 flex-1">
          <label className={`block text-sm font-bold text-stone-800 ${kh ? "font-khmer" : ""}`}>
            {kh ? labelKh : labelEn}
            <span className="ml-1.5 text-xs font-normal text-stone-500">
              ({kh ? labelEn : labelKh})
            </span>
          </label>
          <p className={`text-xs text-stone-500 mt-0.5 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? hintKh : hintEn}
          </p>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={2}
            className="mt-2 w-full text-sm text-foreground bg-transparent resize-none focus:outline-none placeholder:text-stone-400"
          />
          {value.trim() && (
            <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1">
              <span>{wordCount} {kh ? "ពាក្យ" : wordCount === 1 ? "word" : "words"}</span>
              {!endsWithPunctuation(value) && (
                <span className={`text-amber-600 ${kh ? "font-khmer" : ""}`}>
                  {kh ? "កុំភ្លេចសញ្ញាចុច (.)" : "End with . ! or ?"}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Notebook-paper preview                                                */
/* ────────────────────────────────────────────────────────────────────── */

function PaperPreview({ text, kh, onCopy, copied }: { text: string; kh: boolean; onCopy: () => void; copied: boolean }) {
  const sCount = countSentences(text);
  const wCount = countWords(text);

  return (
    <div className="rounded-2xl border-2 border-amber-300 shadow-md overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2 bg-amber-100 border-b border-amber-300 flex items-center justify-between">
        <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-900 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
          <Quote className="w-3.5 h-3.5" />
          {kh ? "កថាខណ្ឌរបស់អ្នក" : "Your Paragraph"}
        </div>
        <button
          type="button"
          onClick={onCopy}
          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-white border border-amber-300 text-amber-800 hover:bg-amber-50 transition ${kh ? "font-khmer" : ""}`}
        >
          {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? (kh ? "ចម្លងហើយ!" : "Copied!") : (kh ? "ចម្លង" : "Copy")}
        </button>
      </div>

      {/* Notebook lines */}
      <div
        className="relative px-6 sm:px-10 py-6 bg-[#fffdf5] min-h-[180px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(180, 195, 220, 0.45) 31px, rgba(180, 195, 220, 0.45) 32px)",
        }}
      >
        {/* Red margin line */}
        <div className="absolute left-3 sm:left-6 top-0 bottom-0 w-px bg-red-300/70" aria-hidden />
        <p
          className="relative text-base text-stone-800 whitespace-pre-wrap break-words"
          style={{ lineHeight: "32px", fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          <span className="inline-block w-6" />{text}
        </p>
      </div>

      {/* Footer stats */}
      <div className={`px-4 py-2 bg-amber-50 border-t border-amber-200 flex flex-wrap gap-3 text-xs text-amber-900 ${kh ? "font-khmer leading-loose" : ""}`}>
        <span><b>{sCount}</b> {kh ? "ប្រយោគ" : sCount === 1 ? "sentence" : "sentences"}</span>
        <span><b>{wCount}</b> {kh ? "ពាក្យ" : wCount === 1 ? "word" : "words"}</span>
        <span><b>{text.length}</b> {kh ? "តួអក្សរ" : "characters"}</span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Tips panel                                                            */
/* ────────────────────────────────────────────────────────────────────── */

function TipsPanel({ tips, kh }: { tips: Tip[]; kh: boolean }) {
  return (
    <div className="rounded-2xl border-2 border-stone-200 bg-stone-50 p-4">
      <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-600 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-sm font-bold" : ""}`}>
        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
        {kh ? "គន្លឹះអ្នកជំនួយការ" : "Assistant Tips"}
        <span className="text-stone-400 font-normal normal-case tracking-normal">({tips.length})</span>
      </div>
      <ul className="space-y-2">
        {tips.map((tip) => {
          const Icon = tip.level === "good" ? CheckCircle2 : tip.level === "warn" ? AlertCircle : Lightbulb;
          const tone = tip.level === "good"
            ? "bg-emerald-50 border-emerald-200 text-emerald-900"
            : tip.level === "warn"
              ? "bg-amber-50 border-amber-200 text-amber-900"
              : "bg-sky-50 border-sky-200 text-sky-900";
          const iconTone = tip.level === "good" ? "text-emerald-600" : tip.level === "warn" ? "text-amber-600" : "text-sky-600";
          return (
            <li
              key={tip.id}
              className={`flex items-start gap-2 p-2.5 rounded-lg border ${tone}`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${iconTone}`} />
              <div className="min-w-0 flex-1">
                <p className={`text-sm leading-snug ${kh ? "font-khmer leading-loose" : ""}`}>
                  {kh ? tip.kh : tip.en}
                </p>
                {kh && (
                  <p className="text-[11px] italic text-stone-500 mt-0.5">{tip.en}</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
