import {
  Brush,
  Bug,
  Heart,
  HeartPulse,
  Shield,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Droplet,
  Activity,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════════════════
 *  THE DAILY DEFENSE: BRUSHING & FLOSSING
 *  ការការពារប្រចាំថ្ងៃ៖ ការដុសធ្មេញ និងប្រើខ្សែទន្តពេទ្យ
 *
 *  Lives inside DentistryPage as Section 04, anchor: #daily-defense
 *  Aesthetic: clinical — mint greens, pristine whites, soft blues.
 * ══════════════════════════════════════════════════════════════════════════ */

// ── Custom dental icons (lucide doesn't ship a floss/tooth-shield) ──────

function ToothShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Tooth */}
      <path d="M8 3.5c-2.2 0-3.5 1.6-3.5 4.5 0 1.6.4 2.7.9 4.4.4 1.4.6 2.4.6 3.6 0 2.2.7 4.5 2.2 4.5 1.1 0 1.4-1.5 1.7-3.4.2-1.4.5-2.6 1.1-2.6.6 0 .9 1.2 1.1 2.6.3 1.9.6 3.4 1.7 3.4 1.5 0 2.2-2.3 2.2-4.5 0-1.2.2-2.2.6-3.6.5-1.7.9-2.8.9-4.4 0-2.9-1.3-4.5-3.5-4.5-1.4 0-2 .8-3 .8s-1.6-.8-3-.8z" />
      {/* Shield overlay */}
      <path
        d="M19 13l3 1.2v3c0 2.4-1.5 4.4-3 4.8-1.5-.4-3-2.4-3-4.8v-3L19 13z"
        fill="white"
      />
      <path d="M19 13l3 1.2v3c0 2.4-1.5 4.4-3 4.8-1.5-.4-3-2.4-3-4.8v-3L19 13z" />
      <path d="M17.7 17l1 1 1.7-1.8" />
    </svg>
  );
}

function FlossIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Two fingertips */}
      <circle cx="5" cy="6.5" r="2.5" />
      <circle cx="19" cy="6.5" r="2.5" />
      {/* Floss strand draped + wrapped */}
      <path d="M5 9c0 4 1 7 1 9" />
      <path d="M19 9c0 4-1 7-1 9" />
      <path d="M6 15c2 1.5 4 2 6 2s4-.5 6-2" />
      {/* Tooth gap suggestion */}
      <path d="M10 19h4" />
    </svg>
  );
}

function BacteriaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <ellipse cx="12" cy="12" rx="6" ry="4" />
      <path d="M6 12L3 10" />
      <path d="M6 12L3 14" />
      <path d="M18 12l3-2" />
      <path d="M18 12l3 2" />
      <path d="M9 9l-1.5-2" />
      <path d="M15 9l1.5-2" />
      <path d="M9 15l-1.5 2" />
      <path d="M15 15l1.5 2" />
      <circle cx="10" cy="11.5" r="0.6" fill="currentColor" />
      <circle cx="14" cy="12.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

// ── Palette helpers ─────────────────────────────────────────────────────

const MINT_BG = "bg-emerald-50";
const MINT_BORDER = "border-emerald-200";
const MINT_INK = "text-emerald-700";
const SKY_BG = "bg-sky-50";
const SKY_BORDER = "border-sky-200";
const SKY_INK = "text-sky-700";

// ── Sub-component: Bilingual label (always shows both languages) ────────

function Bilingual({
  en,
  kh,
  className = "",
  khClassName = "",
}: {
  en: React.ReactNode;
  kh: React.ReactNode;
  className?: string;
  khClassName?: string;
}) {
  return (
    <span className={className}>
      <span>{en}</span>
      <span className={`block font-khmer text-[0.85em] opacity-80 mt-0.5 ${khClassName}`}>
        {kh}
      </span>
    </span>
  );
}

// ── Sub-component: Sub-section heading inside the section ───────────────

function SubHeader({
  Icon,
  numberEn,
  numberKh,
  titleEn,
  titleKh,
  accent = "emerald",
}: {
  Icon: React.ComponentType<{ className?: string }>;
  numberEn: string;
  numberKh: string;
  titleEn: string;
  titleKh: string;
  accent?: "emerald" | "sky" | "rose";
}) {
  const ringMap = {
    emerald: "bg-emerald-600 text-white",
    sky: "bg-sky-600 text-white",
    rose: "bg-rose-500 text-white",
  } as const;
  const inkMap = {
    emerald: "text-emerald-700",
    sky: "text-sky-700",
    rose: "text-rose-700",
  } as const;
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className={`w-11 h-11 rounded-xl ${ringMap[accent]} grid place-items-center shrink-0 shadow-sm`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className={`font-mono text-[10px] tracking-[0.25em] uppercase ${inkMap[accent]}`}>
          {numberEn} <span className="font-khmer tracking-normal opacity-80">{numberKh}</span>
        </div>
        <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 leading-tight">
          {titleEn}
        </h3>
        <p className={`font-khmer text-base sm:text-lg ${inkMap[accent]} mt-0.5 leading-snug`}>
          {titleKh}
        </p>
      </div>
    </div>
  );
}

// ── Section 1: The Invisible Enemy — Plaque ─────────────────────────────

function PlaqueSection() {
  return (
    <div className={`rounded-2xl ${MINT_BG} border ${MINT_BORDER} p-5 sm:p-7 shadow-sm`}>
      <SubHeader
        Icon={BacteriaIcon}
        numberEn="PART 1"
        numberKh="ផ្នែកទី ១"
        titleEn="The Invisible Enemy — Plaque"
        titleKh="សត្រូវមើលមិនឃើញ — បាក់តេរីធ្មេញ"
        accent="emerald"
      />

      <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-2">
        Your mouth is full of <span className="font-semibold text-emerald-800">bacteria</span> — millions of them, all the time. When you eat sugar or carbohydrates, those bacteria eat the leftovers and produce <span className="font-semibold text-emerald-800">acid as waste</span>.
      </p>
      <p className="font-khmer text-slate-600 text-sm sm:text-base leading-loose mb-5">
        មាត់របស់អ្នកពោរពេញដោយ <span className="font-semibold text-emerald-800">បាក់តេរី</span> — រាប់លាន ហើយគ្រប់ពេលវេលា។ នៅពេលអ្នកញ៉ាំស្ករ ឬកាបូអ៊ីដ្រាត បាក់តេរីទាំងនោះញ៉ាំសំណល់ និងផលិត <span className="font-semibold text-emerald-800">អាស៊ីតជាសំណល់</span>។
      </p>

      {/* Acid → Enamel diagram */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <DecayStep
          icon={<BacteriaIcon className="w-6 h-6" />}
          en="Sugar feeds bacteria"
          kh="ស្ករចិញ្ចឹមបាក់តេរី"
          tone="emerald"
        />
        <DecayStep
          icon={<Droplet className="w-6 h-6" />}
          en="Bacteria release acid"
          kh="បាក់តេរីបញ្ចេញអាស៊ីត"
          tone="amber"
        />
        <DecayStep
          icon={<AlertTriangle className="w-6 h-6" />}
          en="Acid eats the enamel"
          kh="អាស៊ីតស៊ីស្រទាប់រឹង"
          tone="rose"
        />
      </div>

      {/* The damage box */}
      <div className="rounded-xl bg-white border border-rose-200 p-4 sm:p-5 mb-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-rose-700 mb-1">
              The damage <span className="font-khmer normal-case tracking-normal">/ ការខូចខាត</span>
            </div>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
              That acid eats away the hard outer shell of the tooth — the{" "}
              <span className="font-semibold text-rose-700">Enamel (ថ្នាំងធ្មេញ)</span> —
              and creates holes called <span className="font-semibold text-rose-700">cavities (ប្រហោងធ្មេញ)</span>.
            </p>
            <p className="font-khmer text-slate-600 text-sm leading-loose mt-2">
              អាស៊ីតនោះស៊ីស្រទាប់ខាងក្រៅដ៏រឹងនៃធ្មេញ — ហៅថា <span className="font-semibold text-rose-700">Enamel (ថ្នាំងធ្មេញ)</span> — ហើយបង្កើតរន្ធដែលហៅថា <span className="font-semibold text-rose-700">ប្រហោងធ្មេញ (cavities)</span>។
            </p>
          </div>
        </div>
      </div>

      {/* The defense box */}
      <div className="rounded-xl bg-white border border-emerald-300 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Brush className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-700 mb-1">
              The defense <span className="font-khmer normal-case tracking-normal">/ ការការពារ</span>
            </div>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
              <span className="font-semibold">Brushing twice a day</span> sweeps away the bacteria
              before they can build a hardened, sticky, acidic fortress called <span className="font-semibold text-emerald-800">plaque (បាក់តេរីធ្មេញ)</span>.
            </p>
            <p className="font-khmer text-slate-600 text-sm leading-loose mt-2">
              <span className="font-semibold">ការដុសធ្មេញពីរដងក្នុងមួយថ្ងៃ</span> បោសសម្អាតបាក់តេរី មុនពេលពួកវាអាចសាងសង់បន្ទាយរឹង សអាស៊ីត ហៅថា <span className="font-semibold text-emerald-800">បាក់តេរីធ្មេញ (plaque)</span>។
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DecayStep({
  icon,
  en,
  kh,
  tone,
}: {
  icon: React.ReactNode;
  en: string;
  kh: string;
  tone: "emerald" | "amber" | "rose";
}) {
  const map = {
    emerald: { bg: "bg-white", border: "border-emerald-300", ink: "text-emerald-700" },
    amber: { bg: "bg-white", border: "border-amber-300", ink: "text-amber-700" },
    rose: { bg: "bg-white", border: "border-rose-300", ink: "text-rose-700" },
  } as const;
  const t = map[tone];
  return (
    <div className={`rounded-xl ${t.bg} border ${t.border} p-3 flex items-center gap-3`}>
      <div className={`w-10 h-10 rounded-lg grid place-items-center ${t.ink} bg-slate-50 border ${t.border} shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-slate-800 leading-tight">{en}</div>
        <div className="font-khmer text-xs text-slate-500 leading-snug mt-0.5">{kh}</div>
      </div>
    </div>
  );
}

// ── Section 2: The Missing 40% — Why We Floss ───────────────────────────

function FlossingSection() {
  return (
    <div className={`rounded-2xl ${SKY_BG} border ${SKY_BORDER} p-5 sm:p-7 shadow-sm`}>
      <SubHeader
        Icon={FlossIcon}
        numberEn="PART 2"
        numberKh="ផ្នែកទី ២"
        titleEn="The 'Missing 40%' — Why We Floss"
        titleKh="៤០% ដែលបាត់បង់ — ហេតុអ្វីយើងត្រូវប្រើខ្សែទន្តពេទ្យ"
        accent="sky"
      />

      {/* Big visual call-out — 60/40 */}
      <div className="rounded-2xl bg-white border-2 border-sky-300 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-5">
          {/* 60% — brush reaches */}
          <div className="sm:col-span-3 bg-gradient-to-br from-sky-100 to-emerald-50 p-6 sm:p-8 border-b sm:border-b-0 sm:border-r-2 border-dashed border-sky-300">
            <div className="flex items-center gap-2 mb-2">
              <Brush className="w-5 h-5 text-sky-700" />
              <div className="text-xs font-mono uppercase tracking-widest text-sky-700">
                Toothbrush reaches <span className="font-khmer normal-case tracking-normal">/ ច្រាសដុសធ្មេញដល់</span>
              </div>
            </div>
            <div className="font-display font-bold text-5xl sm:text-6xl text-sky-700 leading-none">
              60<span className="text-3xl sm:text-4xl">%</span>
            </div>
            <p className="text-slate-700 text-sm sm:text-base mt-3 leading-relaxed">
              The <span className="font-semibold">front, back, and top</span> of every tooth.
            </p>
            <p className="font-khmer text-slate-600 text-sm leading-loose mt-1">
              ផ្នែក <span className="font-semibold">ខាងមុខ ខាងក្រោយ និងផ្នែកលើ</span> នៃធ្មេញនីមួយៗ។
            </p>
          </div>

          {/* 40% — flossing */}
          <div className="sm:col-span-2 bg-gradient-to-br from-rose-50 to-amber-50 p-6 sm:p-8 relative">
            <div
              aria-hidden
              className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-30"
              style={{ background: "radial-gradient(circle, #fecaca 0%, transparent 70%)" }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <FlossIcon className="w-5 h-5 text-rose-700" />
                <div className="text-xs font-mono uppercase tracking-widest text-rose-700">
                  Brush misses <span className="font-khmer normal-case tracking-normal">/ ច្រាសខកខាន</span>
                </div>
              </div>
              <div className="font-display font-bold text-5xl sm:text-6xl text-rose-600 leading-none">
                40<span className="text-3xl sm:text-4xl">%</span>
              </div>
              <p className="text-slate-700 text-sm sm:text-base mt-3 leading-relaxed">
                The <span className="font-semibold text-rose-700">spaces between</span> the teeth.
              </p>
              <p className="font-khmer text-slate-600 text-sm leading-loose mt-1">
                <span className="font-semibold text-rose-700">ចន្លោះធ្មេញ</span>។
              </p>
            </div>
          </div>
        </div>

        {/* Punchline strip */}
        <div className="bg-slate-900 text-white px-6 py-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm sm:text-base leading-relaxed">
                If you don't floss, you are leaving <span className="font-bold text-amber-300">almost half of your mouth completely uncleaned</span> — and that is exactly where the most dangerous cavities and gum disease begin.
              </p>
              <p className="font-khmer text-slate-300 text-sm leading-loose mt-2">
                ប្រសិនបើអ្នកមិនប្រើខ្សែទន្តពេទ្យ អ្នកកំពុងទុក <span className="font-bold text-amber-300">ស្ទើរតែពាក់កណ្តាលនៃមាត់របស់អ្នកដោយមិនបានសម្អាត</span> — ហើយនោះគឺជាកន្លែងដែលប្រហោងធ្មេញដ៏គ្រោះថ្នាក់បំផុត និង <span className="font-semibold text-amber-300">រលាកអញ្ចាញធ្មេញ (gum disease)</span> ចាប់ផ្តើម។
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily rule */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <DailyRule
          icon={<Brush className="w-5 h-5" />}
          en="Brush 2× a day"
          kh="ដុសធ្មេញ ២ ដង/ថ្ងៃ"
          subEn="Morning + before bed"
          subKh="ពេលព្រឹក + មុនចូលគេង"
        />
        <DailyRule
          icon={<FlossIcon className="w-5 h-5" />}
          en="Floss 1× a day"
          kh="ខ្សែទន្តពេទ្យ ១ ដង/ថ្ងៃ"
          subEn="Reaches the 40% gap"
          subKh="ដល់ចន្លោះ ៤០%"
        />
        <DailyRule
          icon={<Sparkles className="w-5 h-5" />}
          en="Dentist 2× a year"
          kh="ទន្តពេទ្យ ២ ដង/ឆ្នាំ"
          subEn="Catch problems early"
          subKh="ចាប់បញ្ហាមុនពេលធ្ងន់"
        />
      </div>
    </div>
  );
}

function DailyRule({
  icon,
  en,
  kh,
  subEn,
  subKh,
}: {
  icon: React.ReactNode;
  en: string;
  kh: string;
  subEn: string;
  subKh: string;
}) {
  return (
    <div className="rounded-xl bg-white border border-sky-200 p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 grid place-items-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-sm font-bold text-slate-900 leading-tight">{en}</div>
        <div className="font-khmer text-xs text-sky-700 leading-snug mt-0.5">{kh}</div>
        <div className="text-[11px] text-slate-500 mt-1.5 leading-tight">{subEn}</div>
        <div className="font-khmer text-[11px] text-slate-400 leading-snug">{subKh}</div>
      </div>
    </div>
  );
}

// ── Section 3: The Heart Connection ─────────────────────────────────────

function HeartConnectionSection() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-rose-50 via-white to-sky-50 border border-rose-200 p-5 sm:p-7 shadow-sm">
      <SubHeader
        Icon={HeartPulse}
        numberEn="PART 3"
        numberKh="ផ្នែកទី ៣"
        titleEn="The Heart Connection"
        titleKh="ទំនាក់ទំនងទៅនឹងបេះដូង"
        accent="rose"
      />

      <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-2">
        Your mouth is not separate from the rest of your body. Severe <span className="font-semibold text-rose-700">gum disease (រលាកអញ្ចាញធ្មេញ)</span> opens up tiny wounds in the gums, and dangerous bacteria can enter the <span className="font-semibold text-rose-700">bloodstream</span> from there.
      </p>
      <p className="font-khmer text-slate-600 text-sm sm:text-base leading-loose mb-6">
        មាត់របស់អ្នកមិនដាច់ដោយឡែកពីផ្នែកដទៃនៃរូបកាយឡើយ។ <span className="font-semibold text-rose-700">រលាកអញ្ចាញធ្មេញ (gum disease)</span> ធ្ងន់ធ្ងរ បើករបួសតូចៗនៅអញ្ចាញធ្មេញ ហើយបាក់តេរីដ៏គ្រោះថ្នាក់អាចចូលទៅក្នុង <span className="font-semibold text-rose-700">ចរន្តឈាម</span> ពីទីនោះ។
      </p>

      {/* Mouth → Bloodstream → Heart visual */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <PathStep
          stepEn="Gum disease"
          stepKh="រលាកអញ្ចាញធ្មេញ"
          icon={<Bug className="w-6 h-6" />}
          tone="emerald"
        />
        <PathStep
          stepEn="Bacteria enter blood"
          stepKh="បាក់តេរីចូលឈាម"
          icon={<Activity className="w-6 h-6" />}
          tone="amber"
          showArrow
        />
        <PathStep
          stepEn="Heart inflammation"
          stepKh="ការរលាកបេះដូង"
          icon={<Heart className="w-6 h-6" />}
          tone="rose"
          showArrow
        />
      </div>

      <div className="rounded-xl bg-white border-2 border-rose-300 p-5 flex items-start gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-rose-600 text-white grid place-items-center shrink-0 shadow-sm">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <p className="text-slate-900 text-base sm:text-lg font-bold leading-snug">
            A healthy mouth protects a healthy heart.
          </p>
          <p className="font-khmer text-rose-700 text-base sm:text-lg font-bold leading-snug mt-1">
            មាត់ដែលមានសុខភាពល្អ ការពារបេះដូងដែលមានសុខភាពល្អ។
          </p>
          <p className="text-slate-600 text-sm leading-relaxed mt-3">
            Studies have directly linked severe gum disease to heart infections (endocarditis) and cardiovascular disease. Two minutes with a toothbrush each morning is one of the cheapest, most powerful things you can do for your long-term health.
          </p>
          <p className="font-khmer text-slate-500 text-sm leading-loose mt-2">
            ការសិក្សាបានបង្ហាញដោយផ្ទាល់នូវទំនាក់ទំនងរវាងរលាកអញ្ចាញធ្មេញធ្ងន់ធ្ងរ ជាមួយការឆ្លងបេះដូង និងជំងឺសរសៃឈាមបេះដូង។ ពីរនាទីជាមួយច្រាសដុសធ្មេញរៀងរាល់ព្រឹក គឺជាមួយក្នុងចំណោមរបស់ដែលថោកបំផុត និងមានឥទ្ធិពលបំផុត ដែលអ្នកអាចធ្វើបានសម្រាប់សុខភាពរយៈពេលវែង។
          </p>
        </div>
      </div>
    </div>
  );
}

function PathStep({
  stepEn,
  stepKh,
  icon,
  tone,
  showArrow = false,
}: {
  stepEn: string;
  stepKh: string;
  icon: React.ReactNode;
  tone: "emerald" | "amber" | "rose";
  showArrow?: boolean;
}) {
  const map = {
    emerald: { ring: "bg-emerald-600", ink: "text-emerald-700", border: "border-emerald-200" },
    amber: { ring: "bg-amber-500", ink: "text-amber-700", border: "border-amber-200" },
    rose: { ring: "bg-rose-600", ink: "text-rose-700", border: "border-rose-200" },
  } as const;
  const t = map[tone];
  return (
    <div className={`relative rounded-xl bg-white border ${t.border} p-4 flex flex-col items-center text-center`}>
      {showArrow && (
        <div
          aria-hidden
          className="hidden sm:block absolute -left-3 top-1/2 -translate-y-1/2 text-slate-300 text-2xl leading-none select-none"
        >
          →
        </div>
      )}
      <div className={`w-12 h-12 rounded-xl ${t.ring} text-white grid place-items-center mb-3 shadow-sm`}>
        {icon}
      </div>
      <div className={`text-sm font-bold ${t.ink} leading-tight`}>{stepEn}</div>
      <div className="font-khmer text-xs text-slate-600 leading-snug mt-1">{stepKh}</div>
    </div>
  );
}

// ── Main exported section component ─────────────────────────────────────

export function DailyDefenseSection({ isKh }: { isKh: boolean }) {
  return (
    <section
      id="daily-defense"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24"
      data-testid="section-daily-defense"
    >
      {/* Section eyebrow + title — matches the page's existing Section component */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-emerald-100 text-emerald-800 rounded-sm px-2.5 py-0.5 border border-emerald-200">
          SEC-04
        </span>
        <span className={`text-xs font-bold uppercase tracking-widest text-emerald-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "ការការពារប្រចាំថ្ងៃ" : "Two minutes a day"}
        </span>
      </div>

      {/* Bilingual title — always both */}
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-1 leading-tight">
        The Daily Defense: Brushing &amp; Flossing
      </h2>
      <p className="font-khmer text-emerald-700 text-xl sm:text-2xl mb-3 leading-snug">
        ការការពារប្រចាំថ្ងៃ៖ ការដុសធ្មេញ និងប្រើខ្សែទន្តពេទ្យ
      </p>

      <p className="text-slate-600 text-sm sm:text-base mb-2 max-w-3xl leading-relaxed">
        Cavities and gum disease are not random bad luck — they are the predictable result of a daily war
        between your toothbrush and the bacteria living in your mouth. Here is exactly what is happening,
        and the two simple habits that win the war.
      </p>
      <p className="font-khmer text-slate-500 text-sm sm:text-base mb-8 max-w-3xl leading-loose">
        ប្រហោងធ្មេញ និងរលាកអញ្ចាញធ្មេញ មិនមែនជាសំណាងអាក្រក់ដោយចៃដន្យទេ — វាគឺជាលទ្ធផលដែលអាចទស្សន៍ទាយបាននៃសង្គ្រាមប្រចាំថ្ងៃ រវាងច្រាសដុសធ្មេញរបស់អ្នក និងបាក់តេរីដែលរស់នៅក្នុងមាត់របស់អ្នក។ នេះគឺជាអ្វីដែលកំពុងកើតឡើងពិតប្រាកដ និងទម្លាប់សាមញ្ញពីរ ដែលឈ្នះសង្គ្រាម។
      </p>

      <div className="space-y-5">
        <PlaqueSection />
        <FlossingSection />
        <HeartConnectionSection />

        {/* Bottom rule — final call to action */}
        <div className="rounded-2xl bg-emerald-700 text-white p-5 sm:p-7 flex items-start gap-4 shadow-sm">
          <ToothShieldIcon className="w-12 h-12 text-white shrink-0" />
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-200 mb-1">
              The 2-2-1 rule <span className="font-khmer normal-case tracking-normal">/ ច្បាប់ ២-២-១</span>
            </div>
            <p className="text-base sm:text-lg font-bold leading-snug">
              Brush 2 minutes, 2 times a day. Floss 1 time a day. That's it.
            </p>
            <p className="font-khmer text-emerald-100 text-base sm:text-lg leading-snug mt-1">
              ដុសធ្មេញ ២ នាទី ២ ដងក្នុងមួយថ្ងៃ។ ប្រើខ្សែទន្តពេទ្យ ១ ដងក្នុងមួយថ្ងៃ។ ប៉ុណ្ណឹងទេ។
            </p>
          </div>
          <CheckCircle2 className="w-7 h-7 text-emerald-200 shrink-0 ml-auto hidden sm:block" />
        </div>
      </div>
    </section>
  );
}

// Re-export the small shield icon in case the parent page wants to use it.
export { ToothShieldIcon as DailyDefenseToothShieldIcon };
