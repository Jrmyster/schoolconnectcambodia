import { useState } from "react";
import { Users, Ear, ThumbsUp, Smile, User as UserIcon, Sparkles, ArrowDown } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

type TraitId = "earlobes" | "thumb" | "widowsPeak" | "cleftChin" | "dimples";
type Allele = "dom" | "rec";
type Member = "father" | "mother" | "you";

type Trait = {
  id: TraitId;
  Icon: React.ComponentType<{ className?: string }>;
  label:     { en: string; kh: string };
  dominant:  { en: string; kh: string };
  recessive: { en: string; kh: string };
};

const TRAITS: Trait[] = [
  { id: "earlobes",   Icon: Ear,      label: { en: "Earlobes",     kh: "ស្លឹកត្រចៀក" }, dominant: { en: "Detached",     kh: "ផ្តាច់" },     recessive: { en: "Attached",     kh: "ភ្ជាប់" } },
  { id: "thumb",      Icon: ThumbsUp, label: { en: "Thumb",        kh: "មេដៃ" },        dominant: { en: "Straight",     kh: "ត្រង់" },      recessive: { en: "Hitchhiker's", kh: "កោងទៅក្រោយ" } },
  { id: "widowsPeak", Icon: Sparkles, label: { en: "Widow's Peak", kh: "សក់ថ្ងាស" },    dominant: { en: "Yes",          kh: "មាន" },        recessive: { en: "No",           kh: "គ្មាន" } },
  { id: "cleftChin",  Icon: UserIcon, label: { en: "Cleft Chin",   kh: "ចង្ការឆែក" },   dominant: { en: "Yes",          kh: "មាន" },        recessive: { en: "No",           kh: "គ្មាន" } },
  { id: "dimples",    Icon: Smile,    label: { en: "Dimples",      kh: "ផ្នត់ថ្ពាល់" }, dominant: { en: "Yes",          kh: "មាន" },        recessive: { en: "No",           kh: "គ្មាន" } },
];

type State = Record<Member, Partial<Record<TraitId, Allele>>>;

const INITIAL: State = {
  father: { earlobes: "dom", thumb: "dom", widowsPeak: "rec", cleftChin: "dom", dimples: "rec" },
  mother: { earlobes: "rec", thumb: "dom", widowsPeak: "dom", cleftChin: "rec", dimples: "dom" },
  you:    { earlobes: "dom", thumb: "dom", widowsPeak: "dom", cleftChin: "dom", dimples: "dom" },
};

type Inheritance = "father" | "mother" | "both" | "hiddenCarrier" | "impossible" | "unknown";

function inheritance(your?: Allele, dad?: Allele, mom?: Allele): Inheritance {
  if (!your || !dad || !mom) return "unknown";
  const md = your === dad;
  const mm = your === mom;
  if (md && mm) return "both";
  if (md) return "father";
  if (mm) return "mother";
  // Your phenotype matches neither parent. Two cases:
  //  - You are recessive but both parents look dominant → both parents are hidden carriers (Dd × Dd → dd). Valid!
  //  - You are dominant but both parents are visibly recessive (rr × rr → rr only) → biologically impossible.
  return your === "rec" ? "hiddenCarrier" : "impossible";
}

const ACCENTS = {
  sky:     { ring: "border-sky-300",     bg: "bg-sky-50",     chip: "bg-sky-700",     label: { en: "Father", kh: "ឪពុក" },     badge: "♂" },
  rose:    { ring: "border-rose-300",    bg: "bg-rose-50",    chip: "bg-rose-700",    label: { en: "Mother", kh: "ម្តាយ" },    badge: "♀" },
  emerald: { ring: "border-emerald-400", bg: "bg-emerald-50", chip: "bg-emerald-700", label: { en: "You",    kh: "ខ្លួនអ្នក" }, badge: "★" },
} as const;

type AccentKey = keyof typeof ACCENTS;

export function FamilyTraitMapper() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [data, setData] = useState<State>(INITIAL);

  function update(m: Member, t: TraitId, a: Allele) {
    setData(prev => ({ ...prev, [m]: { ...prev[m], [t]: a } }));
  }

  return (
    <div className="rounded-2xl bg-white border border-emerald-200/70 shadow-sm overflow-hidden">
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-amber-50 via-emerald-50 to-white border-b border-emerald-200/70">
        <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-amber-800/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <Users className="w-3.5 h-3.5" />
          <span>{kh ? "ឧបករណ៍វាស់ស្ទង់លក្ខណៈគ្រួសារ" : "Family Trait Mapper"}</span>
        </div>
        <h3 className={`font-display text-xl sm:text-2xl font-bold text-emerald-950 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? "ហ្សែនរបស់អ្នកមកពីណា?" : "Where do your traits come from?"}
        </h3>
        <p className={`mt-1 text-sm text-stone-600 max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "ជ្រើសរើសលក្ខណៈរបស់ឪពុក ម្តាយ និងខ្លួនអ្នក — រួចមើលថាតើហ្សែនធ្លាក់ចុះមកអ្នកយ៉ាងណា។"
            : "Pick the traits for your father, mother and yourself — then watch how the genes flow down to you."}
        </p>
      </div>

      <div className="p-5 sm:p-7 grid lg:grid-cols-[1.5fr,1fr] gap-6">
        {/* Genealogy tree */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <PersonCard role="father" data={data.father} update={(t, a) => update("father", t, a)} kh={kh} accent="sky" />
            <PersonCard role="mother" data={data.mother} update={(t, a) => update("mother", t, a)} kh={kh} accent="rose" />
          </div>

          {/* Connector — desktop */}
          <div className="hidden sm:block relative h-14" aria-hidden="true">
            <div className="absolute left-1/4 top-0 w-0.5 h-7 bg-stone-400 -translate-x-1/2" />
            <div className="absolute left-3/4 top-0 w-0.5 h-7 bg-stone-400 -translate-x-1/2" />
            <div className="absolute left-1/4 right-1/4 top-7 h-0.5 bg-stone-400" />
            <div className="absolute left-1/2 top-7 w-0.5 h-7 bg-stone-400 -translate-x-1/2" />
            <div className="absolute left-1/2 top-[52px] w-2 h-2 rounded-full bg-stone-400 -translate-x-1/2" />
          </div>
          {/* Connector — mobile */}
          <div className="flex sm:hidden justify-center py-3" aria-hidden="true">
            <ArrowDown className="w-5 h-5 text-stone-400" />
          </div>

          <div className="sm:max-w-md sm:mx-auto">
            <PersonCard
              role="you"
              data={data.you}
              update={(t, a) => update("you", t, a)}
              kh={kh}
              accent="emerald"
              parents={{ father: data.father, mother: data.mother }}
            />
          </div>
        </div>

        {/* Why do I look like this? */}
        <div className="space-y-3">
          <div className="rounded-xl bg-gradient-to-br from-emerald-700 to-green-800 text-white p-4 sm:p-5">
            <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-emerald-200 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{kh ? "ហេតុអ្វីខ្ញុំមានរូបរាងបែបនេះ?" : "Why do I look like this?"}</span>
            </div>
            <p className={`text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh
                ? "សម្រាប់លក្ខណៈនីមួយៗ អ្នកទទួលបានហ្សែនមួយពីឪពុក និងហ្សែនមួយពីម្តាយ — សរុបពីរ។ ការផ្សំនៃហ្សែនទាំងពីរនេះកំណត់ថាតើអ្នកមើលទៅយ៉ាងណា។"
                : "For every trait, you inherit one allele from your father and one from your mother — two in total. The combination of these two alleles decides what you look like."}
            </p>
          </div>

          <div className="rounded-xl bg-white border border-stone-200 p-4">
            <div className={`text-sm font-bold text-stone-900 mb-2 ${kh ? "font-khmer" : ""}`}>
              {kh ? "ហ្សែនខ្លាំង និងហ្សែនខ្សោយ" : "Dominant vs. Recessive"}
            </div>
            <div className="space-y-3 text-sm text-stone-700">
              <div className="flex items-start gap-2">
                <span className="inline-block w-3 h-3 mt-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                <p className={kh ? "font-khmer leading-loose" : ""}>
                  <strong>{kh ? "ហ្សែនខ្លាំង" : "Dominant alleles"}</strong>
                  {kh ? " (ហ្សែនខ្លាំង) " : " "}
                  {kh
                    ? "បង្ហាញខ្លួនឱ្យឃើញ បើទោះជាមានច្បាប់ចម្លងតែមួយក៏ដោយ — ឧ. សក់ថ្ងាស ឬចង្ការឆែក។"
                    : "show up even when you carry only one copy — like a widow's peak or a cleft chin."}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-block w-3 h-3 mt-1.5 rounded-full bg-stone-300 border border-stone-400 flex-shrink-0" />
                <p className={kh ? "font-khmer leading-loose" : ""}>
                  <strong>{kh ? "ហ្សែនខ្សោយ" : "Recessive alleles"}</strong>
                  {kh ? " (ហ្សែនខ្សោយ) " : " "}
                  {kh
                    ? "បង្ហាញខ្លួនបានលុះត្រាតែអ្នកទទួលបានច្បាប់ចម្លងពីរ — មួយពីឪពុក និងមួយពីម្តាយ។"
                    : "only show up when you inherit two copies — one from each parent."}
                </p>
              </div>
            </div>
          </div>

          <div className={`rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900 ${kh ? "font-khmer leading-loose" : ""}`}>
            <strong>{kh ? "ការពិតគួរឱ្យចាប់អារម្មណ៍៖" : "Did you know?"}</strong>{" "}
            {kh
              ? "ប្រសិនបើអ្នកមានលក្ខណៈខ្សោយ ប៉ុន្តែឪពុកម្តាយរបស់អ្នកមិនបង្ហាញ — នោះមានន័យថាពួកគាត់ទាំងពីរ ដឹកផ្ទុកហ្សែនខ្សោយដោយលាក់កំបាំង។"
              : "If you have a recessive trait but neither parent shows it — that means both parents secretly carry the recessive allele!"}
          </div>

          <div className={`rounded-xl bg-gradient-to-br from-emerald-50 to-lime-50 border border-emerald-300 p-4 text-sm text-emerald-900 ${kh ? "font-khmer leading-loose" : ""}`}>
            <Sparkles className="w-4 h-4 inline mr-1 text-emerald-700" />
            <strong>{kh ? "អ្នកមានតែមួយគត់៖" : "You are unique:"}</strong>{" "}
            {kh
              ? "អ្នកគឺជាការផ្សំដ៏ពិសេស នៃផែនទីហ្សែនរបស់បុព្វបុរសរបស់អ្នក!"
              : "You are a unique combination of your ancestors' genetic maps!"}
          </div>

          <p className={`text-[11px] text-stone-500 italic ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
            {kh
              ? "កំណត់សម្គាល់៖ ឧទាហរណ៍ទាំងនេះត្រូវបានធ្វើឱ្យសាមញ្ញសម្រាប់ការសិក្សា។ ហ្សែនពិតប្រាកដច្រើនតែស្មុគស្មាញ និងពាក់ព័ន្ធនឹងហ្សែនច្រើន។"
              : "Note: these examples are simplified for learning. Real genetics is often more complex and involves many genes."}
          </p>
        </div>
      </div>
    </div>
  );
}

function PersonCard({
  data, update, kh, accent, parents,
}: {
  role: Member;
  data: Partial<Record<TraitId, Allele>>;
  update: (t: TraitId, a: Allele) => void;
  kh: boolean;
  accent: AccentKey;
  parents?: { father: Partial<Record<TraitId, Allele>>; mother: Partial<Record<TraitId, Allele>> };
}) {
  const a = ACCENTS[accent];
  return (
    <div className={`rounded-xl border-2 ${a.ring} ${a.bg} overflow-hidden shadow-sm`}>
      <div className={`${a.chip} text-white px-3 py-2 flex items-center justify-between`}>
        <div className={`font-bold text-sm tracking-wide ${kh ? "font-khmer" : ""}`}>{kh ? a.label.kh : a.label.en}</div>
        <span className="text-lg leading-none font-bold" aria-hidden="true">{a.badge}</span>
      </div>
      <div className="p-3 space-y-2.5">
        {TRAITS.map(t => {
          const Icon = t.Icon;
          const val = data[t.id];
          const inh = parents ? inheritance(val, parents.father[t.id], parents.mother[t.id]) : "unknown";
          return (
            <div key={t.id}>
              <div className="flex items-center justify-between gap-2 text-xs mb-1">
                <span className={`flex items-center gap-1.5 text-stone-700 font-medium ${kh ? "font-khmer" : ""}`}>
                  <Icon className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
                  <span className="truncate">{kh ? t.label.kh : t.label.en}</span>
                </span>
                {parents && val && <InheritanceBadge inh={inh} kh={kh} />}
              </div>
              <div className="grid grid-cols-2 gap-1" role="radiogroup" aria-label={kh ? t.label.kh : t.label.en}>
                {(["dom", "rec"] as Allele[]).map(opt => {
                  const isOn = val === opt;
                  const od = opt === "dom" ? t.dominant : t.recessive;
                  return (
                    <button
                      key={opt}
                      onClick={() => update(t.id, opt)}
                      role="radio"
                      aria-checked={isOn}
                      className={`px-2 py-1 rounded text-xs transition border ${
                        isOn
                          ? (opt === "dom"
                              ? "bg-emerald-600 text-white border-emerald-700 shadow-sm"
                              : "bg-stone-700 text-white border-stone-800 shadow-sm")
                          : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                      } ${kh ? "font-khmer" : ""}`}
                    >
                      {kh ? od.kh : od.en}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InheritanceBadge({ inh, kh }: { inh: Inheritance; kh: boolean }) {
  if (inh === "unknown") return null;
  const map: Record<Exclude<Inheritance, "unknown">, { en: string; kh: string; cls: string }> = {
    father:        { en: "← Dad",            kh: "← ឪពុក",                    cls: "bg-sky-100 text-sky-800 border-sky-300" },
    mother:        { en: "← Mom",            kh: "← ម្តាយ",                    cls: "bg-rose-100 text-rose-800 border-rose-300" },
    both:          { en: "← Both",           kh: "← ទាំងពីរ",                  cls: "bg-purple-100 text-purple-800 border-purple-300" },
    hiddenCarrier: { en: "Hidden carriers!",  kh: "ឪពុកម្តាយដឹកផ្ទុក!",         cls: "bg-amber-100 text-amber-800 border-amber-300" },
    impossible:    { en: "Check inputs",     kh: "ពិនិត្យឡើងវិញ",              cls: "bg-red-100 text-red-800 border-red-300" },
  };
  const m = map[inh];
  return (
    <span className={`inline-flex text-[10px] px-1.5 py-0.5 rounded border whitespace-nowrap ${m.cls} ${kh ? "font-khmer" : ""}`}>
      {kh ? m.kh : m.en}
    </span>
  );
}
