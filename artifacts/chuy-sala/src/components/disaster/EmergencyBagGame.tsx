import { useMemo, useState } from "react";
import {
  Backpack, CheckCircle2, XCircle, Sparkles, RotateCcw,
  Droplets, Flashlight, Radio, Heart, FileText, Gamepad2,
  BookOpen, Tv, Flower2, Wind, Smartphone, Cookie,
} from "lucide-react";
import type { ComponentType } from "react";
import { useLanguageStore } from "@/store/use-language";

type Item = {
  id: string;
  nameEn: string;
  nameKh: string;
  essential: boolean;
  icon: ComponentType<{ className?: string }>;
  color: string;          // tile background tint when not selected
  feedbackEn: string;     // shown when picked
  feedbackKh: string;
};

const ITEMS: Item[] = [
  // ── 5 essential items ────────────────────────────────────────────────
  {
    id: "water",
    nameEn: "Clean drinking water",
    nameKh: "ទឹកស្អាតផឹក",
    essential: true,
    icon: Droplets,
    color: "bg-sky-100",
    feedbackEn: "Excellent! A person can survive only 3 days without water — biology depends on it.",
    feedbackKh: "ល្អណាស់! មនុស្សអាចរស់នៅបានតែ ៣ ថ្ងៃប៉ុណ្ណោះដោយគ្មានទឹក — ជីវវិទ្យាពឹងផ្អែកលើវា។",
  },
  {
    id: "flashlight",
    nameEn: "Flashlight (with batteries)",
    nameKh: "ភ្លើងពិល (មានថ្ម)",
    essential: true,
    icon: Flashlight,
    color: "bg-yellow-100",
    feedbackEn: "Smart pick! Power often goes out during disasters — you need light to move safely at night.",
    feedbackKh: "ជម្រើសឆ្លាត! ភ្លើងតែងតែដាច់ពេលគ្រោះមហន្តរាយ — អ្នកត្រូវការពន្លឺដើម្បីផ្លាស់ទីដោយសុវត្ថិភាពនៅពេលយប់។",
  },
  {
    id: "radio",
    nameEn: "Battery-powered radio",
    nameKh: "វិទ្យុដើរដោយថ្ម",
    essential: true,
    icon: Radio,
    color: "bg-orange-100",
    feedbackEn: "Great choice! With phone networks down, a radio is how you'll hear official warnings and updates.",
    feedbackKh: "ជម្រើសល្អ! នៅពេលបណ្ដាញទូរស័ព្ទដាច់ វិទ្យុគឺជារបៀបដែលអ្នកនឹងលឺការព្រមាន និងព័ត៌មានផ្លូវការ។",
  },
  {
    id: "first-aid",
    nameEn: "First-aid kit",
    nameKh: "ឧបករណ៍ជំនួយដំបូង",
    essential: true,
    icon: Heart,
    color: "bg-red-100",
    feedbackEn: "Perfect! Bandages, antiseptic, and basic medicine treat injuries before help can arrive.",
    feedbackKh: "ល្អឥតខ្ចោះ! បង់រុំ ថ្នាំសម្លាប់មេរោគ និងថ្នាំមូលដ្ឋាន អាចព្យាបាលរបួសមុនពេលជំនួយមកដល់។",
  },
  {
    id: "documents",
    nameEn: "Important documents (ID, family records)",
    nameKh: "ឯកសារសំខាន់ (អត្តសញ្ញាណប័ណ្ណ កំណត់ត្រាគ្រួសារ)",
    essential: true,
    icon: FileText,
    color: "bg-purple-100",
    feedbackEn: "Wise! ID and records (in a waterproof bag) help you get aid, register at shelters, and reunite with family.",
    feedbackKh: "ប្រាជ្ញា! អត្តសញ្ញាណប័ណ្ណ និងកំណត់ត្រា (ក្នុងថង់មិនជ្រាបទឹក) ជួយអ្នកទទួលបានជំនួយ ចុះឈ្មោះនៅទីជម្រក និងជួបជុំគ្រួសារ។",
  },

  // ── Distractors ──────────────────────────────────────────────────────
  {
    id: "phone-charger",
    nameEn: "Phone charger (no battery)",
    nameKh: "ឆ្នាំងសាកថ្មទូរស័ព្ទ (គ្មានថ្ម)",
    essential: false,
    icon: Smartphone,
    color: "bg-stone-100",
    feedbackEn: "Tricky! Without electricity, a regular wall charger is useless. A power bank or solar charger would be different.",
    feedbackKh: "ស្មុគស្មាញ! គ្មានអគ្គិសនី ឆ្នាំងសាកជញ្ជាំងធម្មតាគ្មានប្រយោជន៍។ ថ្មបម្រុង ឬឆ្នាំងសាកថាមពលព្រះអាទិត្យនឹងខុសគ្នា។",
  },
  {
    id: "snacks",
    nameEn: "Bag of fresh fruit",
    nameKh: "ថង់ផ្លែឈើស្រស់",
    essential: false,
    icon: Cookie,
    color: "bg-amber-100",
    feedbackEn: "Close! Food matters — but fresh fruit spoils in 1–2 days. Pack rice, dried noodles, or canned food instead.",
    feedbackKh: "ជិតបាន! អាហារសំខាន់ — ប៉ុន្តែផ្លែឈើស្រស់ខូចក្នុងរយៈពេល ១-២ ថ្ងៃ។ ខ្ចប់អង្ករ មីស្ងួត ឬអាហារកំប៉ុងជំនួសវិញ។",
  },
  {
    id: "video-game",
    nameEn: "Video game console",
    nameKh: "ឧបករណ៍លេងហ្គេម",
    essential: false,
    icon: Gamepad2,
    color: "bg-stone-100",
    feedbackEn: "Not essential. Fun, but it needs power and won't help you survive. Save the space for water or food.",
    feedbackKh: "មិនចាំបាច់ទេ។ កំសាន្ត ប៉ុន្តែវាត្រូវការអគ្គិសនី ហើយនឹងមិនជួយអ្នករស់រានបានទេ។ សន្សំទីសម្រាប់ទឹក ឬអាហារ។",
  },
  {
    id: "books",
    nameEn: "Heavy school textbooks",
    nameKh: "សៀវភៅសិក្សាធ្ងន់",
    essential: false,
    icon: BookOpen,
    color: "bg-stone-100",
    feedbackEn: "Not for the bag. Books are heavy and not life-saving. Keep your bag light enough to carry while running.",
    feedbackKh: "មិនមែនសម្រាប់កាបូប។ សៀវភៅធ្ងន់ ហើយមិនអាចជួយជីវិតបានទេ។ រក្សាកាបូបស្រាលគ្រប់គ្រាន់ឱ្យអ្នកអាចយកជាមួយពេលរត់។",
  },
  {
    id: "tv",
    nameEn: "Television",
    nameKh: "ទូរទស្សន៍",
    essential: false,
    icon: Tv,
    color: "bg-stone-100",
    feedbackEn: "No way! Far too big and heavy, and it needs power. A small radio does the same job for warnings.",
    feedbackKh: "មិនបាន! ធំ និងធ្ងន់ពេក ហើយត្រូវការអគ្គិសនី។ វិទ្យុតូចមួយធ្វើការងារដូចគ្នាសម្រាប់ការព្រមាន។",
  },
  {
    id: "plant",
    nameEn: "Decorative plant",
    nameKh: "រុក្ខជាតិតុបតែង",
    essential: false,
    icon: Flower2,
    color: "bg-stone-100",
    feedbackEn: "Lovely, but useless in an emergency. The bag is for survival — beauty can wait.",
    feedbackKh: "ស្អាត ប៉ុន្តែគ្មានប្រយោជន៍ក្នុងស្ថានភាពបន្ទាន់។ កាបូបគឺសម្រាប់ការរស់រាន — ភាពស្រស់ស្អាតអាចរង់ចាំ។",
  },
  {
    id: "hairdryer",
    nameEn: "Hair dryer",
    nameKh: "ម៉ាស៊ីនសម្ងួតសក់",
    essential: false,
    icon: Wind,
    color: "bg-stone-100",
    feedbackEn: "Definitely no. It needs electricity (which is gone), and a small towel does the job.",
    feedbackKh: "ច្បាស់លាស់ថាទេ។ វាត្រូវការអគ្គិសនី (ដែលដាច់) ហើយកន្សែងតូចមួយធ្វើការងារនោះបាន។",
  },
];

const TARGET = 5;

export function EmergencyBagGame() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Stable shuffle so essentials are mixed in but order doesn't change on each render
  const shuffled = useMemo(() => {
    const copy = [...ITEMS];
    // Deterministic shuffle: pseudo-random based on id length
    for (let i = copy.length - 1; i > 0; i--) {
      const j = (i * 7 + 3) % (i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, []);

  const isFull = selected.length >= TARGET;
  const correctCount = selected.filter((id) => ITEMS.find((it) => it.id === id)?.essential).length;
  const score = submitted ? correctCount : 0;

  function add(id: string) {
    if (selected.includes(id) || submitted) return;
    if (selected.length >= TARGET) return;
    setSelected((s) => [...s, id]);
  }
  function remove(id: string) {
    if (submitted) return;
    setSelected((s) => s.filter((x) => x !== id));
  }
  function reset() {
    setSelected([]);
    setSubmitted(false);
  }

  return (
    <div className="rounded-3xl bg-white border-4 border-orange-400 shadow-lg overflow-hidden">
      {/* Header — hazard tape */}
      <div className="px-5 sm:px-7 py-4 bg-orange-500" style={{
        backgroundImage: "repeating-linear-gradient(45deg, #f97316 0 14px, #1c1917 14px 18px)",
      }}>
        <div className="bg-orange-300 inline-flex items-center gap-2 px-3 py-1.5 rounded-md border-2 border-stone-900 shadow-sm">
          <Backpack className="w-5 h-5 text-stone-900" />
          <span className={`text-sm font-extrabold uppercase tracking-wider text-stone-900 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {kh ? "ហ្គេមកាបូបបន្ទាន់" : "Go-Bag Game"}
          </span>
        </div>
      </div>

      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-orange-50 to-yellow-50 border-b-2 border-orange-200">
        <div className={`text-[11px] font-mono uppercase tracking-[0.25em] text-orange-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {kh ? "មេរៀនទី ២" : "Lesson 2"}
        </div>
        <h3 className={`font-display text-xl sm:text-2xl font-bold text-stone-900 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? "ជ្រើសរើសរបស់ ៥ យ៉ាងសម្រាប់កាបូបបន្ទាន់" : "Pack Your Emergency 'Go-Bag'"}
          {kh && <span className="ml-2 text-sm text-stone-600 font-sans font-normal">(Pick 5 essentials)</span>}
        </h3>
        <p className={`mt-1 text-sm text-stone-700 max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "អូស ឬចុចលើរបស់ដើម្បីដាក់ក្នុងកាបូប។ អ្នកអាចជ្រើសរើសបាន ៥ យ៉ាងតែប៉ុណ្ណោះ — សូមជ្រើសរើសដោយប្រាជ្ញា!"
            : "Drag (or tap) items to add them to your bag. You can choose only 5 — pick wisely!"}
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-0">
        {/* Item pool */}
        <div className="p-4 sm:p-5 bg-stone-50/40">
          <div className={`text-[10px] font-mono uppercase tracking-widest text-stone-600 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "របស់របរដែលមាន" : "Available items"}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {shuffled.map((item) => {
              const inBag = selected.includes(item.id);
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  draggable={!inBag && !submitted && !isFull}
                  onDragStart={(e) => { e.dataTransfer.setData("text/plain", item.id); e.dataTransfer.effectAllowed = "copy"; }}
                  onClick={() => inBag ? remove(item.id) : add(item.id)}
                  className={`group relative cursor-pointer select-none rounded-xl border-2 p-2.5 text-left transition active:scale-[0.97] ${
                    inBag
                      ? "bg-emerald-100 border-emerald-400 opacity-60"
                      : submitted
                        ? "bg-white border-stone-200 cursor-default"
                        : isFull
                          ? "bg-white border-stone-200 cursor-not-allowed opacity-50"
                          : `${item.color} border-stone-300 hover:border-orange-500 hover:shadow-md`
                  }`}
                  aria-pressed={inBag}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inBag ? remove(item.id) : add(item.id); } }}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 flex-shrink-0 ${inBag ? "text-emerald-700" : "text-stone-700"}`} />
                    <div className={`text-xs font-bold leading-tight text-stone-800 ${kh ? "font-khmer leading-tight text-sm" : ""}`}>
                      {kh ? item.nameKh : item.nameEn}
                    </div>
                  </div>
                  {inBag && (
                    <CheckCircle2 className="absolute top-1.5 right-1.5 w-4 h-4 text-emerald-600" />
                  )}
                  {!inBag && !submitted && !isFull && (
                    <div className={`mt-1 text-[10px] text-stone-500 group-hover:text-orange-600 ${kh ? "font-khmer text-xs" : ""}`}>
                      {kh ? "+ ដាក់ចូល" : "+ Add"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bag drop zone + feedback */}
        <div
          onDragOver={(e) => { e.preventDefault(); if (!isFull && !submitted) setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const id = e.dataTransfer.getData("text/plain");
            if (id) add(id);
          }}
          className={`border-t-2 lg:border-t-0 lg:border-l-2 border-orange-300 p-4 sm:p-5 transition ${
            dragOver ? "bg-yellow-100" : "bg-gradient-to-b from-orange-50 to-yellow-50"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`flex items-center gap-2 text-sm font-bold text-orange-900 ${kh ? "font-khmer" : ""}`}>
              <Backpack className="w-5 h-5" />
              {kh ? "កាបូបបន្ទាន់របស់អ្នក" : "Your Go-Bag"}
              <span className="text-stone-500 font-mono text-xs">({selected.length}/{TARGET})</span>
            </div>
            {selected.length > 0 && (
              <button onClick={reset} className={`text-xs font-medium text-orange-700 hover:text-orange-900 inline-flex items-center gap-1 ${kh ? "font-khmer" : ""}`}>
                <RotateCcw className="w-3 h-3" />
                {kh ? "ចាប់ផ្ដើមឡើងវិញ" : "Reset"}
              </button>
            )}
          </div>

          {/* Slots */}
          <div className="space-y-2 mb-4">
            {Array.from({ length: TARGET }).map((_, i) => {
              const id = selected[i];
              const item = id ? ITEMS.find((it) => it.id === id) : null;
              if (!item) {
                return (
                  <div key={i} className="rounded-lg border-2 border-dashed border-orange-300 bg-white/60 p-2.5 text-xs text-orange-400 italic min-h-[48px] flex items-center">
                    {kh ? `ទីទំនេរ #${i + 1} — អូសរបស់មកដាក់នៅទីនេះ` : `Empty slot #${i + 1} — drop or tap an item here`}
                  </div>
                );
              }
              const Icon = item.icon;
              const showFeedback = submitted || true; // show inline once added
              return (
                <div key={item.id} className={`rounded-lg border-2 p-2.5 bg-white shadow-sm ${
                  submitted
                    ? item.essential ? "border-emerald-400" : "border-red-400"
                    : "border-orange-300"
                }`}>
                  <div className="flex items-start gap-2">
                    <Icon className="w-5 h-5 flex-shrink-0 text-stone-700 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <div className={`text-sm font-bold text-stone-900 leading-tight ${kh ? "font-khmer" : ""}`}>
                        {kh ? item.nameKh : item.nameEn}
                      </div>
                      {showFeedback && (
                        <div className={`mt-1 text-[11px] leading-snug rounded p-1.5 flex items-start gap-1 ${
                          item.essential
                            ? "bg-emerald-50 text-emerald-900"
                            : "bg-red-50 text-red-900"
                        } ${kh ? "font-khmer text-xs leading-loose" : ""}`}>
                          {item.essential
                            ? <CheckCircle2 className="w-3 h-3 flex-shrink-0 mt-0.5 text-emerald-600" />
                            : <XCircle  className="w-3 h-3 flex-shrink-0 mt-0.5 text-red-600" />}
                          <span>{kh ? item.feedbackKh : item.feedbackEn}</span>
                        </div>
                      )}
                    </div>
                    {!submitted && (
                      <button onClick={() => remove(item.id)} className="text-stone-400 hover:text-red-600" aria-label={kh ? "យកចេញ" : "Remove"}>
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action / Score */}
          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              disabled={!isFull}
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-extrabold text-base shadow transition disabled:opacity-50 disabled:cursor-not-allowed ${
                isFull ? "bg-orange-600 text-white hover:bg-orange-700 active:scale-[0.98]" : "bg-stone-300 text-stone-600"
              } ${kh ? "font-khmer" : ""}`}
            >
              <Sparkles className="w-4 h-4" />
              {isFull
                ? (kh ? "ពិនិត្យកាបូបរបស់ខ្ញុំ" : "Check My Bag")
                : (kh ? `សូមបន្ថែម ${TARGET - selected.length} ទៀត` : `Add ${TARGET - selected.length} more item${TARGET - selected.length === 1 ? "" : "s"}`)}
            </button>
          ) : (
            <div className={`rounded-xl p-3 border-2 ${
              score === TARGET ? "bg-emerald-50 border-emerald-400" :
              score >= 3      ? "bg-yellow-50 border-yellow-400" :
                                "bg-red-50 border-red-400"
            }`}>
              <div className="flex items-center gap-2">
                <div className={`text-3xl font-extrabold ${
                  score === TARGET ? "text-emerald-700" : score >= 3 ? "text-yellow-700" : "text-red-700"
                }`}>{score}/{TARGET}</div>
                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-bold ${kh ? "font-khmer" : ""}`}>
                    {score === TARGET
                      ? (kh ? "ល្អឥតខ្ចោះ! អ្នកត្រៀមរួចហើយ។" : "Perfect! You're ready.")
                      : score >= 3
                        ? (kh ? "ល្អណាស់! ពិនិត្យព័ត៌មានគន្លឹះ ហើយព្យាយាមម្ដងទៀត។" : "Good job! Read the tips and try again.")
                        : (kh ? "សិក្សាបន្ថែម — ការត្រៀមលក្ខណៈអាចសង្គ្រោះជីវិត។" : "Keep learning — preparation can save lives.")}
                  </div>
                  <button onClick={reset} className={`mt-1 text-xs font-bold underline ${kh ? "font-khmer" : ""}`}>
                    {kh ? "លេងម្ដងទៀត" : "Play again"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
