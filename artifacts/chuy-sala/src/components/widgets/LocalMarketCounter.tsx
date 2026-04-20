import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { ShoppingBasket, RotateCcw, RefreshCw, Sparkles, Volume2 } from "lucide-react";
import { speakWord } from "@/lib/speech";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { useMascotCheer } from "@/store/use-mascot";

type ItemKey = "mango" | "banana" | "fish" | "rice";

type Item = {
  key: ItemKey;
  emoji: string;
  singular: string;
  plural: string;
  kh: string;
  bg: string;       // stack background
  border: string;   // stack border
  text: string;     // text color on stack
  chip: string;     // pill in equation
};

const ITEMS: Record<ItemKey, Item> = {
  mango: {
    key: "mango",   emoji: "🥭", singular: "Mango",  plural: "Mangoes",  kh: "ស្វាយ",
    bg: "bg-gradient-to-b from-amber-300 to-orange-500",
    border: "border-orange-700", text: "text-white",
    chip: "bg-orange-100 text-orange-900 border-orange-300",
  },
  banana: {
    key: "banana",  emoji: "🍌", singular: "Banana", plural: "Bananas",  kh: "ចេក",
    bg: "bg-gradient-to-b from-yellow-200 to-yellow-400",
    border: "border-yellow-700", text: "text-yellow-900",
    chip: "bg-yellow-100 text-yellow-900 border-yellow-300",
  },
  fish: {
    key: "fish",    emoji: "🐟", singular: "Fish",   plural: "Fish",     kh: "ត្រី",
    bg: "bg-gradient-to-b from-sky-300 to-cyan-500",
    border: "border-cyan-700", text: "text-white",
    chip: "bg-cyan-100 text-cyan-900 border-cyan-300",
  },
  rice: {
    key: "rice",    emoji: "🍚", singular: "Bowl of rice", plural: "Bowls of rice", kh: "បាយ",
    bg: "bg-gradient-to-b from-stone-100 to-stone-300",
    border: "border-stone-600", text: "text-stone-900",
    chip: "bg-stone-100 text-stone-900 border-stone-300",
  },
};

const ITEM_KEYS: ItemKey[] = ["mango", "banana", "fish", "rice"];

type Counts = Record<ItemKey, number>;
const ZERO_COUNTS: Counts = { mango: 0, banana: 0, fish: 0, rice: 0 };

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

function numberWord(n: number): string {
  return n >= 0 && n < NUMBER_WORDS.length ? NUMBER_WORDS[n] : String(n);
}

function pluralize(item: Item, n: number): string {
  return n === 1 ? item.singular : item.plural;
}

function randomGoal(): Counts {
  // Pick 2 distinct items, give each a small random count
  const pool = [...ITEM_KEYS];
  pool.sort(() => Math.random() - 0.5);
  const picks = pool.slice(0, 2);
  const goal: Counts = { ...ZERO_COUNTS };
  for (const k of picks) {
    goal[k] = 1 + Math.floor(Math.random() * 3); // 1..3
  }
  return goal;
}

function countsEqual(a: Counts, b: Counts): boolean {
  return ITEM_KEYS.every((k) => a[k] === b[k]);
}

function totalItems(c: Counts): number {
  return ITEM_KEYS.reduce((sum, k) => sum + c[k], 0);
}

function playChime() {
  if (typeof window === "undefined") return;
  // Lazy-create an AudioContext for a short success chime.
  type W = Window & { webkitAudioContext?: typeof AudioContext };
  const Ctx = window.AudioContext || (window as W).webkitAudioContext;
  if (!Ctx) return;
  try {
    const ctx = new Ctx();
    const notes = [523.25, 659.25, 783.99]; // C5 E5 G5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + i * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.35);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.4);
    });
    setTimeout(() => ctx.close(), 1200);
  } catch {
    /* ignore */
  }
}

export function LocalMarketCounter() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [counts, setCounts] = useState<Counts>({ ...ZERO_COUNTS });
  const [goal, setGoal] = useState<Counts>(() => randomGoal());
  const [solved, setSolved] = useState(false);
  const [bumpKey, setBumpKey] = useState<ItemKey | null>(null);
  const [basketHot, setBasketHot] = useState(false);
  const [winsCount, setWinsCount] = useState(0);
  const dragKeyRef = useRef<ItemKey | null>(null);
  const cheer = useMascotCheer();

  const total = useMemo(() => totalItems(counts), [counts]);
  const isMatch = useMemo(() => countsEqual(counts, goal) && totalItems(goal) > 0, [counts, goal]);

  // Trigger success once when match is reached.
  useEffect(() => {
    if (isMatch && !solved) {
      setSolved(true);
      setWinsCount((n) => n + 1);
      playChime();
      cheer("win");
      // Speak "Great job!" after the last item-spoken settles.
      setTimeout(() => speakWord("Great job!"), 450);
    } else if (!isMatch && solved) {
      // Reset solved flag if the basket changes after a win
      setSolved(false);
    }
  }, [isMatch, solved, cheer]);

  function addToBasket(key: ItemKey) {
    if (solved) return;
    setCounts((c) => {
      const newCount = c[key] + 1;
      const item = ITEMS[key];
      // Speak "One Mango!" / "Two Mangoes!" using the helper from the vocab section.
      const phrase = `${numberWord(newCount).charAt(0).toUpperCase()}${numberWord(newCount).slice(1)}... ${pluralize(item, newCount)}!`;
      speakWord(phrase);
      return { ...c, [key]: newCount };
    });
    setBumpKey(key);
    setBasketHot(true);
    cheer("correct");
    setTimeout(() => setBumpKey((cur) => (cur === key ? null : cur)), 400);
    setTimeout(() => setBasketHot(false), 250);
  }

  function removeOneFromBasket(key: ItemKey) {
    if (solved) return;
    setCounts((c) => (c[key] > 0 ? { ...c, [key]: c[key] - 1 } : c));
  }

  const clearBasket = useCallback(() => {
    setCounts({ ...ZERO_COUNTS });
    setSolved(false);
  }, []);

  function newGoal() {
    setGoal(randomGoal());
    setCounts({ ...ZERO_COUNTS });
    setSolved(false);
  }

  // ----- DnD handlers -----
  function onDragStart(e: React.DragEvent, key: ItemKey) {
    dragKeyRef.current = key;
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("text/plain", key);
  }
  function onBasketDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setBasketHot(true);
  }
  function onBasketDragLeave() { setBasketHot(false); }
  function onBasketDrop(e: React.DragEvent) {
    e.preventDefault();
    const key = (e.dataTransfer.getData("text/plain") || dragKeyRef.current) as ItemKey | null;
    if (key && ITEM_KEYS.includes(key)) addToBasket(key);
    dragKeyRef.current = null;
    setBasketHot(false);
  }

  // ----- Render the equation pieces -----
  const equationParts = ITEM_KEYS
    .filter((k) => counts[k] > 0)
    .map((k) => ({ k, n: counts[k], item: ITEMS[k] }));

  const goalParts = ITEM_KEYS
    .filter((k) => goal[k] > 0)
    .map((k) => ({ k, n: goal[k], item: ITEMS[k] }));

  return (
    <section className="rounded-3xl border-4 border-pink-300 bg-gradient-to-b from-pink-50 via-amber-50 to-emerald-50 p-5 sm:p-7 shadow-xl overflow-hidden">
      <style>{`
        @keyframes mc-bump {
          0%   { transform: translateY(0) scale(1); }
          40%  { transform: translateY(-12px) scale(1.08); }
          100% { transform: translateY(0) scale(1); }
        }
        .mc-bump { animation: mc-bump 0.4s cubic-bezier(.34,1.56,.64,1); }

        @keyframes mc-basket-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(251,146,60,0.0); }
          50%      { box-shadow: 0 0 0 14px rgba(251,146,60,0.35); }
        }
        .mc-basket-hot { animation: mc-basket-glow 0.6s ease-out; }

        @keyframes mc-confetti {
          0%   { transform: translate(-50%, 0) rotate(0); opacity: 0; }
          15%  { opacity: 1; }
          100% { transform: translate(var(--cx,0), var(--cy,-200px)) rotate(720deg); opacity: 0; }
        }
        .mc-confetti { animation: mc-confetti 1.6s ease-out forwards; }

        @keyframes mc-star-pop {
          0%   { transform: scale(0) rotate(0); opacity: 0; }
          50%  { transform: scale(1.3) rotate(20deg); opacity: 1; }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        .mc-star { animation: mc-star-pop 0.7s cubic-bezier(.34,1.56,.64,1) forwards; }

        @keyframes mc-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.04); }
        }
        .mc-pulse { animation: mc-pulse 1.6s ease-in-out infinite; }
      `}</style>

      {/* HEADER */}
      <header className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-200 text-pink-900 text-[11px] font-bold uppercase tracking-wider mb-2">
            <ShoppingBasket className="w-3.5 h-3.5" /> {t("Local Market Counter", "បញ្ជររាប់ទំនិញនៅផ្សារ")}
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight ${kh ? "font-khmer leading-snug" : "font-display"}`}>
            {t("Shop, count, and learn!", "ទិញ រាប់ និងរៀន!")}
          </h2>
        </div>
        {winsCount > 0 && (
          <div className="hidden sm:flex flex-col items-center px-3 py-2 rounded-2xl bg-amber-100 border-2 border-amber-300">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span className="text-lg font-black text-amber-900 leading-none mt-1 tabular-nums">{winsCount}</span>
            <span className={`text-[10px] font-bold text-amber-800 uppercase ${kh ? "font-khmer normal-case text-[11px]" : ""}`}>
              {t("Wins", "ឈ្នះ")}
            </span>
          </div>
        )}
      </header>

      {/* GOAL CARD */}
      <div className="rounded-2xl border-4 border-dashed border-amber-400 bg-white p-4 mb-5 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className={`text-[11px] font-bold uppercase tracking-wider text-amber-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            🎯 {t("Today's Shopping List", "បញ្ជីទិញឥវ៉ាន់ថ្ងៃនេះ")}
          </div>
          <button
            type="button"
            onClick={newGoal}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-800 text-xs font-bold active:scale-95 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className={kh ? "font-khmer" : ""}>{t("New", "ថ្មី")}</span>
          </button>
        </div>
        <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
          {t("Please buy", "សូមទិញ")}{" "}
          {goalParts.map((p, i) => (
            <span key={p.k}>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-300">
                <span className="text-base">{p.item.emoji}</span>
                <span className="tabular-nums">{p.n}</span>
                <span>{pluralize(p.item, p.n)}</span>
              </span>
              {i < goalParts.length - 2 ? ", " : i === goalParts.length - 2 ? ` ${t("and", "និង")} ` : "."}
            </span>
          ))}
        </p>
      </div>

      {/* BASKET DROP ZONE */}
      <div
        onDragOver={onBasketDragOver}
        onDragLeave={onBasketDragLeave}
        onDrop={onBasketDrop}
        role="region"
        aria-label="Basket drop zone"
        className={`relative mx-auto max-w-md rounded-[2rem] border-4 border-dashed border-amber-400 bg-gradient-to-b from-amber-50 to-orange-100 p-5 mb-5 transition-all ${
          basketHot ? "mc-basket-hot border-orange-500 bg-orange-100" : ""
        } ${solved ? "border-green-400 bg-green-50" : ""}`}
        style={{ minHeight: "180px" }}
      >
        {/* Basket icon header */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className={`w-12 h-12 rounded-2xl bg-amber-600 border-2 border-amber-800 flex items-center justify-center text-3xl ${total > 0 && !solved ? "mc-pulse" : ""}`}>
            🧺
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
              {t("Basket", "កន្ត្រក")}
            </div>
            <div className="text-sm text-slate-700">
              <span className="font-black tabular-nums text-lg text-slate-900">{total}</span>{" "}
              <span className={kh ? "font-khmer" : ""}>{t(total === 1 ? "item" : "items", "របស់")}</span>
            </div>
          </div>
        </div>

        {/* Items in basket */}
        <div className="flex flex-wrap items-center justify-center gap-2 min-h-[60px]">
          {total === 0 && (
            <p className={`text-sm text-amber-700 italic text-center ${kh ? "font-khmer" : ""}`}>
              {t("Drag items here from the market below ↓", "អូសរបស់ពីផ្សារខាងក្រោមមកទីនេះ ↓")}
            </p>
          )}
          {ITEM_KEYS.flatMap((k) => {
            const n = counts[k];
            if (n === 0) return [];
            const item = ITEMS[k];
            return Array.from({ length: n }).map((_, i) => (
              <button
                key={`${k}-${i}`}
                type="button"
                onClick={() => removeOneFromBasket(k)}
                disabled={solved}
                aria-label={`Remove one ${item.singular}`}
                className={`text-3xl sm:text-4xl rounded-full bg-white border-2 border-slate-200 w-12 h-12 flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-transform disabled:cursor-default ${
                  bumpKey === k && i === n - 1 ? "mc-bump" : ""
                }`}
              >
                {item.emoji}
              </button>
            ));
          })}
        </div>

        {/* EQUATION */}
        {total > 0 && (
          <div className="mt-4 pt-4 border-t-2 border-dashed border-amber-300">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-base sm:text-lg font-extrabold">
              {equationParts.map((p, i) => (
                <span key={p.k} className="inline-flex items-center gap-1.5">
                  {i > 0 && <span className="text-2xl text-slate-500">+</span>}
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border-2 ${p.item.chip}`}>
                    <span className="tabular-nums text-lg">{p.n}</span>
                    <span>{pluralize(p.item, p.n)}</span>
                    <span className="text-lg">{p.item.emoji}</span>
                  </span>
                </span>
              ))}
              <span className="text-2xl text-slate-500">=</span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-900 text-white tabular-nums">
                {total}
                <span className={`text-sm font-bold ${kh ? "font-khmer" : ""}`}>
                  {total === 1 ? t("Item", "របស់") : t("Items", "របស់")}
                </span>
              </span>
            </div>
          </div>
        )}

        {/* SUCCESS OVERLAY */}
        {solved && (
          <div className="absolute inset-0 rounded-[2rem] flex flex-col items-center justify-center bg-green-50/90 backdrop-blur-[1px] pointer-events-none">
            {/* Confetti */}
            {Array.from({ length: 20 }).map((_, i) => {
              const colors = ["#f59e0b", "#ef4444", "#3b82f6", "#10b981", "#a855f7", "#ec4899", "#facc15"];
              const cx = (Math.random() - 0.5) * 320;
              const cy = -120 - Math.random() * 120;
              return (
                <span
                  key={i}
                  className="mc-confetti absolute bottom-12 left-1/2 w-2.5 h-3.5 rounded-sm"
                  style={{
                    background: colors[i % colors.length],
                    // @ts-expect-error CSS custom props
                    "--cx": `${cx}px`,
                    "--cy": `${cy}px`,
                    animationDelay: `${i * 0.04}s`,
                  }}
                />
              );
            })}
            {/* Stars */}
            <div className="flex gap-2 mb-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="mc-star text-4xl"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >⭐</span>
              ))}
            </div>
            <div className="px-4 py-2 rounded-2xl bg-green-600 text-white font-black text-xl shadow-lg pointer-events-auto">
              {t("Great job!", "ល្អណាស់!")}
            </div>
            <p className={`text-sm text-green-800 font-semibold mt-1 ${kh ? "font-khmer" : ""}`}>
              {t("Your basket matches the list!", "កន្ត្រករបស់អ្នកត្រូវនឹងបញ្ជី!")}
            </p>
          </div>
        )}
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <button
          type="button"
          onClick={clearBasket}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border-2 border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 active:scale-95 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span className={kh ? "font-khmer" : ""}>{t("Clear Basket", "សម្អាតកន្ត្រក")}</span>
        </button>
        <button
          type="button"
          onClick={newGoal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm border-2 border-amber-700 active:scale-95 shadow-md transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span className={kh ? "font-khmer" : ""}>{t("New List", "បញ្ជីថ្មី")}</span>
        </button>
      </div>

      {/* MARKET STALL */}
      <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-b from-emerald-50 to-white p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-2xl">🏪</div>
          <div className={`text-xs font-bold uppercase tracking-wider text-emerald-700 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
            {t("Market Stalls — drag items into the basket", "បញ្ជរផ្សារ — អូសរបស់ចូលក្នុងកន្ត្រក")}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ITEM_KEYS.map((k) => {
            const item = ITEMS[k];
            return (
              <button
                key={k}
                type="button"
                draggable={!solved}
                onDragStart={(e) => onDragStart(e, k)}
                onClick={() => addToBasket(k)}
                disabled={solved}
                aria-label={`Add one ${item.singular}`}
                className={`relative ${item.bg} ${item.border} ${item.text} border-[3px] rounded-2xl p-3 sm:p-4 min-h-[120px] flex flex-col items-center justify-center gap-1 shadow-md cursor-grab active:scale-95 hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-default`}
              >
                <span className="text-5xl sm:text-6xl drop-shadow-md leading-none" aria-hidden>
                  {item.emoji}
                </span>
                <span className="font-black text-base sm:text-lg drop-shadow">{item.singular}</span>
                <span className={`text-xs opacity-90 font-semibold ${kh ? "font-khmer" : "font-khmer"}`}>
                  {item.kh}
                </span>
                <span className="absolute top-1.5 right-1.5 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-white/90 text-slate-700 text-[10px] font-bold">
                  <Volume2 className="w-3 h-3" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className={`text-[11px] text-slate-500 text-center mt-4 ${kh ? "font-khmer" : ""}`}>
        {t(
          "Tip: tap an item to add it, or drag with your finger. Tap an item in the basket to remove one.",
          "គន្លឹះ៖ ចុចលើរបស់ដើម្បីបន្ថែម ឬអូសដោយម្រាមដៃ។ ចុចលើរបស់ក្នុងកន្ត្រកដើម្បីដកចេញ។"
        )}
      </p>
    </section>
  );
}
