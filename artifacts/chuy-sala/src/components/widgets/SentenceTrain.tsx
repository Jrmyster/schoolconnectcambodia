import { useState, useMemo, useRef } from "react";
import { Train, Sparkles, RotateCcw, Check, X } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Slot = "subject" | "verb" | "object";

type Block = {
  id: string;
  slot: Slot;
  en: string;
  kh: string;
};

const BLOCKS: Block[] = [
  // Subjects (blue)
  { id: "s1", slot: "subject", en: "I",        kh: "ខ្ញុំ" },
  { id: "s2", slot: "subject", en: "You",      kh: "អ្នក" },
  { id: "s3", slot: "subject", en: "The cow",  kh: "គោ" },
  { id: "s4", slot: "subject", en: "The boy",  kh: "ក្មេងប្រុស" },
  // Verbs (red)
  { id: "v1", slot: "verb", en: "eat",  kh: "ញ៉ាំ" },
  { id: "v2", slot: "verb", en: "see",  kh: "ឃើញ" },
  { id: "v3", slot: "verb", en: "like", kh: "ចូលចិត្ត" },
  { id: "v4", slot: "verb", en: "walk", kh: "ដើរ" },
  // Objects (green)
  { id: "o1", slot: "object", en: "rice",       kh: "បាយ" },
  { id: "o2", slot: "object", en: "water",      kh: "ទឹក" },
  { id: "o3", slot: "object", en: "the dog",    kh: "ឆ្កែ" },
  { id: "o4", slot: "object", en: "the school", kh: "សាលា" },
];

const SLOT_META: Record<Slot, { en: string; kh: string; subEn: string; subKh: string; color: string; ring: string; chip: string }> = {
  subject: {
    en: "Who", kh: "នរណា",
    subEn: "Subject", subKh: "កម្មបទ",
    color: "from-sky-400 to-blue-600",
    ring: "ring-sky-300",
    chip: "bg-sky-100 text-sky-800 border-sky-300",
  },
  verb: {
    en: "Action", kh: "សកម្មភាព",
    subEn: "Verb", subKh: "កិរិយាស័ព្ទ",
    color: "from-rose-400 to-red-600",
    ring: "ring-rose-300",
    chip: "bg-rose-100 text-rose-800 border-rose-300",
  },
  object: {
    en: "What", kh: "អ្វី",
    subEn: "Object", subKh: "កម្មវត្ថុ",
    color: "from-emerald-400 to-green-600",
    ring: "ring-emerald-300",
    chip: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
};

const BLOCK_STYLES: Record<Slot, string> = {
  subject: "bg-gradient-to-b from-sky-300 to-sky-500 border-sky-700 text-white shadow-sky-300",
  verb:    "bg-gradient-to-b from-rose-300 to-rose-500 border-rose-700 text-white shadow-rose-300",
  object:  "bg-gradient-to-b from-emerald-300 to-emerald-500 border-emerald-700 text-white shadow-emerald-300",
};

type Placed = Partial<Record<Slot, string>>; // slot → block id

export function SentenceTrain() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [placed, setPlaced] = useState<Placed>({});
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [bouncingId, setBouncingId] = useState<string | null>(null);
  const [moving, setMoving] = useState(false);
  const [solvedCount, setSolvedCount] = useState(0);
  const dragIdRef = useRef<string | null>(null);

  const blockMap = useMemo(() => Object.fromEntries(BLOCKS.map((b) => [b.id, b])), []);
  const placedIds = useMemo(() => new Set(Object.values(placed).filter(Boolean) as string[]), [placed]);
  const allFilled = !!placed.subject && !!placed.verb && !!placed.object;

  function bounceBack(id: string) {
    setBouncingId(id);
    setTimeout(() => setBouncingId((cur) => (cur === id ? null : cur)), 600);
  }

  function tryPlace(blockId: string, slot: Slot) {
    if (moving) return;
    const block = blockMap[blockId];
    if (!block) return;
    if (block.slot !== slot) {
      bounceBack(blockId);
      return;
    }
    setPlaced((p) => {
      const next: Placed = { ...p };
      // remove this block from any slot it was in
      for (const k of Object.keys(next) as Slot[]) {
        if (next[k] === blockId) delete next[k];
      }
      next[slot] = blockId;
      return next;
    });
    setSelectedBlockId(null);
  }

  function clearSlot(slot: Slot) {
    if (moving) return;
    setPlaced((p) => {
      const next = { ...p };
      delete next[slot];
      return next;
    });
  }

  function reset() {
    setPlaced({});
    setSelectedBlockId(null);
    setMoving(false);
  }

  function chooChoo() {
    if (!allFilled || moving) return;
    setMoving(true);
    setTimeout(() => {
      setSolvedCount((n) => n + 1);
      reset();
    }, 1700);
  }

  // ----- DnD handlers -----
  function onDragStart(e: React.DragEvent, blockId: string) {
    dragIdRef.current = blockId;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", blockId);
  }
  function onDropSlot(e: React.DragEvent, slot: Slot) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") || dragIdRef.current;
    if (id) tryPlace(id, slot);
    dragIdRef.current = null;
  }
  function onDragOver(e: React.DragEvent) { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }

  // ----- click-to-place (mobile-friendly) -----
  function onBlockClick(blockId: string) {
    if (placedIds.has(blockId)) return;
    setSelectedBlockId((cur) => (cur === blockId ? null : blockId));
  }
  function onSlotClick(slot: Slot) {
    if (selectedBlockId) {
      tryPlace(selectedBlockId, slot);
    } else if (placed[slot]) {
      clearSlot(slot);
    }
  }

  const sentencePreview = allFilled
    ? `${blockMap[placed.subject!].en} ${blockMap[placed.verb!].en} ${blockMap[placed.object!].en}.`
    : "";
  const sentencePreviewKh = allFilled
    ? `${blockMap[placed.subject!].kh} ${blockMap[placed.verb!].kh} ${blockMap[placed.object!].kh}.`
    : "";

  return (
    <section className="rounded-3xl border-4 border-amber-300 bg-gradient-to-b from-sky-50 via-white to-emerald-50 p-5 sm:p-7 shadow-xl overflow-hidden">
      <style>{`
        @keyframes train-bounce-back {
          0% { transform: translate(var(--dx,0), var(--dy,0)) scale(1); }
          40% { transform: translate(0,0) scale(1.15) rotate(-6deg); }
          70% { transform: translate(0,0) scale(0.92) rotate(4deg); }
          100% { transform: translate(0,0) scale(1) rotate(0); }
        }
        .train-bounce { animation: train-bounce-back 0.55s cubic-bezier(.34,1.56,.64,1); box-shadow: 0 0 0 4px #ef4444 inset; }

        @keyframes train-puff {
          0%   { transform: translateY(0) scale(0.6); opacity: 0.9; }
          100% { transform: translateY(-32px) scale(1.4); opacity: 0; }
        }
        .puff { animation: train-puff 1.1s ease-out infinite; }

        @keyframes train-wheel { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        .wheel-spin { animation: train-wheel 1.2s linear infinite; }
        .wheel-spin-fast { animation: train-wheel 0.35s linear infinite; }

        @keyframes train-go {
          0%   { transform: translateX(0); }
          20%  { transform: translateX(15px) translateY(-2px); }
          100% { transform: translateX(140%); }
        }
        .train-leaving { animation: train-go 1.6s cubic-bezier(.55,.05,.7,.2) forwards; }

        @keyframes track-scroll { from { background-position: 0 0; } to { background-position: -32px 0; } }
        .track-scroll { animation: track-scroll 0.4s linear infinite; }

        @keyframes confetti-pop {
          0% { transform: translate(-50%, 0) scale(0.4) rotate(0); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translate(var(--cx,0), var(--cy,-120px)) scale(1) rotate(720deg); opacity: 0; }
        }
        .confetti { animation: confetti-pop 1.4s ease-out forwards; }

        @keyframes selected-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        .selected-pulse { animation: selected-pulse 0.9s ease-in-out infinite; }
      `}</style>

      {/* HEADER */}
      <header className="flex items-start justify-between gap-3 mb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Train className="w-3.5 h-3.5" /> {t("Sentence Train", "រថភ្លើងប្រយោគ")}
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight ${kh ? "font-khmer leading-snug" : "font-display"}`}>
            {t("Build a sentence — choo choo!", "សាងសង់ប្រយោគ — ឈូ ឈូ!")}
          </h2>
          <p className={`text-sm text-slate-600 mt-1 ${kh ? "font-khmer leading-loose text-xs" : ""}`}>
            {t(
              "Drop one word into each car: Who → Action → What.",
              "ដាក់ពាក្យមួយចូលក្នុងរថភ្លើងនីមួយៗ៖ នរណា → សកម្មភាព → អ្វី។"
            )}
          </p>
        </div>
        {solvedCount > 0 && (
          <div className="hidden sm:flex flex-col items-center px-3 py-2 rounded-2xl bg-amber-100 border-2 border-amber-300">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span className="text-lg font-black text-amber-900 leading-none mt-1 tabular-nums">{solvedCount}</span>
            <span className={`text-[10px] font-bold text-amber-800 uppercase ${kh ? "font-khmer normal-case text-[11px]" : ""}`}>
              {t("Trips", "ដំណើរ")}
            </span>
          </div>
        )}
      </header>

      {/* TRAIN + TRACK */}
      <div className="relative h-[200px] sm:h-[220px] mb-6 rounded-2xl bg-gradient-to-b from-sky-100 to-amber-100 border-2 border-amber-200 overflow-hidden">
        {/* Sun */}
        <div className="absolute top-3 right-4 w-10 h-10 rounded-full bg-yellow-300 shadow-[0_0_25px_8px_rgba(253,224,71,0.6)]" />
        {/* Hills */}
        <div className="absolute bottom-12 left-0 right-0 h-16 pointer-events-none">
          <div className="absolute bottom-0 left-[-30px] w-40 h-24 rounded-full bg-emerald-300/70" />
          <div className="absolute bottom-0 left-1/3 w-52 h-20 rounded-full bg-emerald-400/70" />
          <div className="absolute bottom-0 right-[-20px] w-44 h-24 rounded-full bg-emerald-300/70" />
        </div>

        {/* Track */}
        <div
          className={`absolute bottom-2 left-0 right-0 h-3 ${moving ? "track-scroll" : ""}`}
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #78350f 0 14px, transparent 14px 32px), linear-gradient(#92400e, #92400e)",
            backgroundSize: "32px 6px, 100% 3px",
            backgroundRepeat: "repeat-x, no-repeat",
            backgroundPosition: "0 0, 0 100%",
          }}
        />

        {/* TRAIN */}
        <div className={`absolute bottom-5 left-3 flex items-end gap-1.5 ${moving ? "train-leaving" : ""}`}>
          {/* Engine */}
          <div className="relative">
            {/* puffs */}
            <div className="absolute -top-3 left-2 flex gap-0.5">
              <div className="w-3 h-3 rounded-full bg-slate-200/90 puff" style={{ animationDelay: "0s" }} />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200/80 puff" style={{ animationDelay: "0.3s" }} />
              <div className="w-2 h-2 rounded-full bg-slate-200/70 puff" style={{ animationDelay: "0.6s" }} />
            </div>
            <div className="relative w-[78px] h-[68px]">
              {/* chimney */}
              <div className="absolute top-0 left-2 w-3.5 h-5 rounded-t-md bg-slate-700" />
              {/* cab */}
              <div className="absolute top-3 left-7 w-9 h-7 rounded-md bg-amber-700 border-2 border-amber-900">
                <div className="absolute inset-1 rounded-sm bg-sky-200 border border-sky-400" />
              </div>
              {/* boiler */}
              <div className="absolute top-7 left-0 w-[78px] h-8 rounded-l-full rounded-r-md bg-red-600 border-2 border-red-800 flex items-center justify-end pr-1">
                <div className="w-2 h-2 rounded-full bg-yellow-300 border border-yellow-600" />
              </div>
              {/* wheels */}
              <div className={`absolute -bottom-1 left-2 w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center ${moving ? "wheel-spin-fast" : "wheel-spin"}`}>
                <div className="w-1 h-3.5 bg-amber-300" />
              </div>
              <div className={`absolute -bottom-1 right-2 w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center ${moving ? "wheel-spin-fast" : "wheel-spin"}`}>
                <div className="w-1 h-3.5 bg-amber-300" />
              </div>
            </div>
          </div>

          {/* Cargo cars */}
          {(["subject", "verb", "object"] as Slot[]).map((slot) => {
            const meta = SLOT_META[slot];
            const blockId = placed[slot];
            const block = blockId ? blockMap[blockId] : null;
            return (
              <div
                key={slot}
                onClick={() => onSlotClick(slot)}
                onDragOver={onDragOver}
                onDrop={(e) => onDropSlot(e, slot)}
                role="button"
                tabIndex={0}
                aria-label={`${meta.en} car`}
                className={`relative cursor-pointer select-none transition-transform active:scale-95 ${
                  selectedBlockId ? "ring-4 ring-offset-2 ring-amber-400 rounded-md" : ""
                }`}
              >
                {/* car body */}
                <div
                  className={`relative w-[88px] sm:w-[100px] h-[68px] rounded-md border-[3px] bg-gradient-to-b ${meta.color} border-slate-900 shadow-md flex items-center justify-center px-1`}
                >
                  {block ? (
                    <span className={`text-white font-extrabold text-sm sm:text-base text-center leading-tight drop-shadow ${kh ? "font-khmer text-xs sm:text-sm" : ""}`}>
                      {kh ? block.kh : block.en}
                    </span>
                  ) : (
                    <span className={`text-white/90 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-center leading-tight ${kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}>
                      {kh ? meta.kh : meta.en}
                      <br />
                      <span className="opacity-70 text-[9px] normal-case font-semibold">
                        ({kh ? meta.subKh : meta.subEn})
                      </span>
                    </span>
                  )}
                  {/* coupling */}
                  <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-800 border border-slate-900" />
                </div>
                {/* wheels */}
                <div className={`absolute -bottom-1 left-2 w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-900 ${moving ? "wheel-spin-fast" : "wheel-spin"}`} />
                <div className={`absolute -bottom-1 right-2 w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-900 ${moving ? "wheel-spin-fast" : "wheel-spin"}`} />
              </div>
            );
          })}
        </div>

        {/* Confetti when moving */}
        {moving &&
          Array.from({ length: 14 }).map((_, i) => {
            const colors = ["#f59e0b", "#ef4444", "#3b82f6", "#10b981", "#a855f7", "#ec4899"];
            const cx = (Math.random() - 0.5) * 200;
            const cy = -60 - Math.random() * 80;
            return (
              <span
                key={i}
                className="confetti absolute bottom-20 left-1/2 w-2 h-3 rounded-sm"
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

        {/* Sentence preview */}
        {allFilled && !moving && (
          <div className="absolute top-3 left-3 right-16 sm:right-20 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur border-2 border-amber-300 shadow-sm">
            <div className="text-[10px] uppercase tracking-wider font-bold text-amber-700">
              {t("Your sentence", "ប្រយោគរបស់អ្នក")}
            </div>
            <div className="text-sm font-bold text-slate-900 truncate">{sentencePreview}</div>
            <div className="text-xs font-khmer text-slate-700 truncate">{sentencePreviewKh}</div>
          </div>
        )}
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <button
          onClick={reset}
          disabled={moving}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border-2 border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 active:scale-95 disabled:opacity-50 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span className={kh ? "font-khmer" : ""}>{t("Reset", "កំណត់ឡើងវិញ")}</span>
        </button>
        <button
          onClick={chooChoo}
          disabled={!allFilled || moving}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-black text-base shadow-lg transition-all active:scale-95 ${
            allFilled && !moving
              ? "bg-gradient-to-b from-emerald-400 to-green-600 text-white border-2 border-green-700 hover:-translate-y-0.5 shadow-green-300"
              : "bg-slate-200 text-slate-400 border-2 border-slate-300 cursor-not-allowed"
          }`}
        >
          <Check className="w-5 h-5" />
          <span className={kh ? "font-khmer" : ""}>{t("Choo Choo!", "ឈូ ឈូ!")}</span>
        </button>
      </div>

      {/* SELECTED HINT */}
      {selectedBlockId && (
        <div className="mb-3 px-3 py-2 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span className={kh ? "font-khmer" : ""}>
            {t("Now tap the matching train car!", "ឥឡូវចុចលើរថភ្លើងដែលត្រូវគ្នា!")}
          </span>
          <button onClick={() => setSelectedBlockId(null)} className="ml-auto p-1 rounded hover:bg-amber-100" aria-label="cancel">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* WORD BANK */}
      <div className="space-y-3">
        {(["subject", "verb", "object"] as Slot[]).map((slot) => {
          const meta = SLOT_META[slot];
          const blocksInRow = BLOCKS.filter((b) => b.slot === slot);
          return (
            <div key={slot}>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider mb-2 border ${meta.chip}`}>
                {kh ? meta.kh : meta.en} · {kh ? meta.subKh : meta.subEn}
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {blocksInRow.map((b) => {
                  const used = placedIds.has(b.id);
                  const selected = selectedBlockId === b.id;
                  const bouncing = bouncingId === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      draggable={!used && !moving}
                      onDragStart={(e) => onDragStart(e, b.id)}
                      onClick={() => onBlockClick(b.id)}
                      disabled={used || moving}
                      className={`relative px-4 py-3 min-h-[52px] rounded-xl border-[3px] font-extrabold text-sm sm:text-base text-center select-none touch-none transition-all shadow-md ${
                        BLOCK_STYLES[slot]
                      } ${used ? "opacity-30 grayscale cursor-not-allowed" : "active:scale-95 cursor-grab"} ${
                        selected ? "selected-pulse ring-4 ring-amber-400 ring-offset-2" : ""
                      } ${bouncing ? "train-bounce" : ""}`}
                      style={{ minWidth: "76px" }}
                      aria-pressed={selected}
                    >
                      <span className="block leading-tight drop-shadow">{b.en}</span>
                      <span className={`block text-[11px] font-bold opacity-90 mt-0.5 ${kh ? "font-khmer" : "font-khmer"}`}>
                        {b.kh}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className={`text-[11px] text-slate-500 text-center mt-4 ${kh ? "font-khmer" : ""}`}>
        {t(
          "Tip: tap a word, then tap a train car — or drag with your finger.",
          "គន្លឹះ៖ ចុចពាក្យមួយ បន្ទាប់មកចុចរថភ្លើង — ឬអូសដោយម្រាមដៃ។"
        )}
      </p>
    </section>
  );
}
