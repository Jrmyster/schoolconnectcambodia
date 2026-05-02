import {
  Lightbulb,
  Zap,
  Flame,
  Thermometer,
  AlertTriangle,
  Wind,
  History,
  Activity,
  Leaf,
  ShieldAlert,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════════════════
 *  THE INCANDESCENT BULB — LET THERE BE LIGHT
 *  អំពូលភ្លើងតាំង៖ ការបង្កើតពន្លឺ
 *
 *  Lives inside ElectricalSafetyPage as a deep-dive module, anchor: #incandescent-bulb
 *  Aesthetic: warm — soft yellows + amber accents on a deep-night background.
 * ══════════════════════════════════════════════════════════════════════════ */

// ── Custom warm "glowing bulb" SVG icon ─────────────────────────────────

function GlowingBulbIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id="bulb-glow" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#fef9c3" stopOpacity="1" />
          <stop offset="55%" stopColor="#fde68a" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bulb-halo" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Outer halo */}
      <circle cx="32" cy="26" r="28" fill="url(#bulb-halo)" />
      {/* Glass globe */}
      <path
        d="M32 6c-9 0-16 7-16 16 0 6 3 10 6 13 2 2 3 4 3 6v3h14v-3c0-2 1-4 3-6 3-3 6-7 6-13 0-9-7-16-16-16z"
        fill="url(#bulb-glow)"
        stroke="#f59e0b"
        strokeWidth="1.5"
      />
      {/* Filament — looped tungsten coil */}
      <path
        d="M26 24c1-2 3-2 3 0s-2 3 0 5 4 0 4 0 1-3 3-3 3 2 1 4-3 2-3 4"
        fill="none"
        stroke="#f97316"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Filament wires up */}
      <line x1="24" y1="32" x2="26" y2="24" stroke="#fb923c" strokeWidth="1.2" />
      <line x1="38" y1="33" x2="36" y2="27" stroke="#fb923c" strokeWidth="1.2" />
      {/* Base / screw */}
      <rect x="24" y="44" width="16" height="3" fill="#a16207" />
      <rect x="25" y="48" width="14" height="3" fill="#a16207" />
      <rect x="26" y="52" width="12" height="3" fill="#a16207" />
      <path d="M28 56 h8 l-1 4 h-6 z" fill="#78350f" />
    </svg>
  );
}

// ── Bilingual heading helper ────────────────────────────────────────────

function SubHeader({
  Icon,
  numberEn,
  numberKh,
  titleEn,
  titleKh,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  numberEn: string;
  numberKh: string;
  titleEn: string;
  titleKh: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400/40 grid place-items-center shrink-0">
        <Icon className="w-5 h-5 text-amber-300" />
      </div>
      <div>
        <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-amber-300/80">
          {numberEn} <span className="font-khmer tracking-normal opacity-80">{numberKh}</span>
        </div>
        <h3 className="font-display font-bold text-lg sm:text-xl text-amber-50 leading-tight">
          {titleEn}
        </h3>
        <p className="font-khmer text-base sm:text-lg text-amber-200 leading-snug mt-0.5">
          {titleKh}
        </p>
      </div>
    </div>
  );
}

// ── Main exported section ──────────────────────────────────────────────

export function IncandescentBulbSection({ kh }: { kh: boolean }) {
  return (
    <section
      id="incandescent-bulb"
      className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-24"
      data-testid="section-incandescent-bulb"
    >
      <div
        className="relative overflow-hidden rounded-3xl border border-amber-900/40 shadow-2xl"
        style={{
          background:
            "radial-gradient(ellipse at top, #2a1a05 0%, #160d03 40%, #0a0603 100%)",
        }}
      >
        {/* Soft amber glows in corners */}
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #fbbf24 0%, transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #f59e0b 0%, transparent 65%)",
          }}
        />

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div className="relative px-6 sm:px-10 pt-10 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-amber-500/15 text-amber-300 rounded-sm px-2.5 py-0.5 border border-amber-500/30">
              MODULE · LIGHT
            </span>
            <span className="font-khmer text-xs text-amber-300/80">
              ម៉ូឌុល · ពន្លឺ
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-6 items-start">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-amber-50 leading-tight">
                The Incandescent Bulb
                <span className="block text-amber-300 mt-1">Let There Be Light</span>
              </h2>
              <p className="font-khmer text-xl sm:text-2xl text-amber-200 mt-3 leading-snug">
                អំពូលភ្លើងតាំង៖ <span className="text-amber-300">ការបង្កើតពន្លឺ</span>
              </p>
              <p className="text-amber-100/80 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl">
                For 100 years, this glass globe of glowing tungsten lit the entire planet. The physics inside it
                is hot, beautiful, and surprisingly wasteful — and it explains exactly why the world is moving on.
              </p>
              <p className="font-khmer text-amber-100/70 text-sm sm:text-base mt-2 leading-loose max-w-2xl">
                អស់រយៈពេល ១០០ ឆ្នាំ បាល់កែវនៃតង់ស្ទែនដែលភ្លឺនេះ បានបំភ្លឺផែនដីទាំងមូល។ រូបវិទ្យានៅខាងក្នុងវាគឺក្តៅ ស្រស់ស្អាត និងខ្ជះខ្ជាយយ៉ាងគួរឲ្យភ្ញាក់ផ្អើល — ហើយវាពន្យល់យ៉ាងច្បាស់នូវមូលហេតុដែលពិភពលោកកំពុងផ្លាស់ប្តូរ។
              </p>
            </div>
            <div className="hidden sm:block">
              <GlowingBulbIcon className="w-32 h-32" />
            </div>
          </div>

          {/* Quick spec strip */}
          <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <SpecChip valueEn="1879" labelEn="Edison's year" labelKh="ឆ្នាំរបស់ Edison" />
            <SpecChip valueEn="2,500°C" labelEn="Filament temp" labelKh="សីតុណ្ហភាពហ្វីឡាម៉ង់" />
            <SpecChip valueEn="~1,000 hr" labelEn="Lifespan" labelKh="អាយុកាល" />
            <SpecChip valueEn="90%" labelEn="Wasted as heat" labelKh="ខ្ជះខ្ជាយជាកំដៅ" warn />
          </div>
        </div>

        {/* ── Section 1: Invention & Vacuum ───────────────────────────── */}
        <div className="relative px-6 sm:px-10 py-8 border-t border-amber-900/30">
          <SubHeader
            Icon={History}
            numberEn="PART 1"
            numberKh="ផ្នែកទី ១"
            titleEn="The Invention & The Vacuum"
            titleKh="ការច្នៃប្រឌិត និងបូមខ្យល់ចេញ"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* History card */}
            <div className="rounded-2xl bg-amber-950/40 border border-amber-700/30 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-amber-300" />
                <div className="font-mono text-[10px] tracking-widest uppercase text-amber-300/80">
                  1879 <span className="font-khmer tracking-normal">/ ឆ្នាំ ១៨៧៩</span>
                </div>
              </div>
              <p className="text-amber-50 text-sm sm:text-base leading-relaxed">
                <span className="font-semibold text-amber-200">Thomas Edison</span> and his team in New Jersey did
                not invent the very first electric light. But in <span className="font-semibold">1879</span>, they
                made the first one that was <span className="font-semibold text-amber-200">practical</span> — cheap
                enough, safe enough, and long-lasting enough to put inside a real home.
              </p>
              <p className="font-khmer text-amber-100/80 text-sm leading-loose mt-3">
                <span className="font-semibold text-amber-200">Thomas Edison</span> និងក្រុមការងាររបស់គាត់នៅរដ្ឋ New Jersey មិនមែនជាអ្នកច្នៃប្រឌិតពន្លឺអគ្គិសនីដំបូងបង្អស់ឡើយ។ ប៉ុន្តែនៅ <span className="font-semibold">ឆ្នាំ ១៨៧៩</span> ពួកគាត់បានបង្កើតអំពូលដំបូងគេដែល <span className="font-semibold text-amber-200">អាចប្រើបានជាក់ស្តែង</span> — ថោកល្មម សុវត្ថិភាពល្មម និងគង់វង្សល្មម ដើម្បីដាក់ក្នុងផ្ទះពិតប្រាកដ។
              </p>
            </div>

            {/* The problem card */}
            <div className="rounded-2xl bg-rose-950/30 border border-rose-700/30 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-5 h-5 text-rose-300" />
                <div className="font-mono text-[10px] tracking-widest uppercase text-rose-300/80">
                  The problem <span className="font-khmer tracking-normal normal-case">/ បញ្ហា</span>
                </div>
              </div>
              <p className="text-rose-50 text-sm sm:text-base leading-relaxed">
                Heat any wire until it glows in normal air, and the{" "}
                <span className="font-semibold text-rose-200">oxygen (អុកស៊ីសែន)</span> in the room makes it{" "}
                <span className="font-semibold text-rose-200">catch fire instantly</span>. The wire burns up in
                seconds. There is no light — only a flash and a puff of smoke.
              </p>
              <p className="font-khmer text-rose-100/80 text-sm leading-loose mt-3">
                ដុតខ្សែលួសណាមួយរហូតដល់វាភ្លឺនៅក្នុងខ្យល់ធម្មតា ហើយ <span className="font-semibold text-rose-200">អុកស៊ីសែន</span> ក្នុងបន្ទប់ធ្វើឲ្យវា <span className="font-semibold text-rose-200">ឆេះភ្លាមៗ</span>។ ខ្សែឆេះអស់ក្នុងរយៈពេលប៉ុន្មានវិនាទី។ គ្មានពន្លឺឡើយ — មានតែផ្លេកមួយ និងផ្សែងមួយដុំប៉ុណ្ណោះ។
              </p>
            </div>
          </div>

          {/* The genius solution */}
          <div className="mt-5 rounded-2xl bg-gradient-to-br from-amber-500/15 via-amber-600/10 to-transparent border border-amber-400/40 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-amber-950 grid place-items-center shrink-0 shadow-lg shadow-amber-500/30">
                <Wind className="w-6 h-6" />
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-amber-300 mb-1">
                  The genius <span className="font-khmer tracking-normal normal-case">/ គំនិតដ៏ឆ្លាត</span>
                </div>
                <p className="text-amber-50 text-base sm:text-lg leading-snug font-bold">
                  Put the wire inside a sealed glass globe — and suck all the air out.
                </p>
                <p className="font-khmer text-amber-200 text-base sm:text-lg leading-snug font-bold mt-1">
                  ដាក់ខ្សែលួសក្នុងបាល់កែវបិទជិត — ហើយបូមខ្យល់ទាំងអស់ចេញ។
                </p>
                <p className="text-amber-50/85 text-sm sm:text-base leading-relaxed mt-3">
                  With no oxygen inside (a <span className="font-semibold text-amber-200">vacuum (បូមខ្យល់ចេញ)</span>) — or
                  filled with an <span className="font-semibold text-amber-200">inert gas (ឧស្ម័នអសកម្ម)</span> like
                  argon that won't react with anything — the wire can be heated to over{" "}
                  <span className="font-semibold text-amber-200">2,500°C</span> and glow brightly without burning up.
                </p>
                <p className="font-khmer text-amber-100/70 text-sm leading-loose mt-2">
                  ដោយគ្មានអុកស៊ីសែននៅខាងក្នុង (<span className="font-semibold text-amber-200">បូមខ្យល់ចេញ</span>) — ឬបំពេញដោយ <span className="font-semibold text-amber-200">ឧស្ម័នអសកម្ម</span> ដូចជា argon ដែលមិនប្រតិកម្មនឹងអ្វីទាំងអស់ — ខ្សែលួសអាចត្រូវបានកម្តៅរហូតលើសពី <span className="font-semibold text-amber-200">២,៥០០°C</span> ហើយភ្លឺច្បាស់ដោយមិនឆេះ។
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 2: How it works & why it fails ──────────────────── */}
        <div className="relative px-6 sm:px-10 py-8 border-t border-amber-900/30">
          <SubHeader
            Icon={Zap}
            numberEn="PART 2"
            numberKh="ផ្នែកទី ២"
            titleEn="How It Works & Why It Fails"
            titleKh="របៀបដែលវាដំណើរការ និងមូលហេតុដែលវាខូច"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-5">
            {/* How it works */}
            <div className="rounded-2xl bg-amber-950/40 border border-amber-700/30 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-amber-300" />
                <div className="font-mono text-[10px] tracking-widest uppercase text-amber-300/80">
                  How it glows <span className="font-khmer tracking-normal normal-case">/ របៀបដែលវាភ្លឺ</span>
                </div>
              </div>
              <p className="text-amber-50 text-sm sm:text-base leading-relaxed">
                Electricity is pushed through a very thin wire called a{" "}
                <span className="font-semibold text-amber-200">Filament (ខ្សែហ្វីឡាម៉ង់)</span>, almost always made of{" "}
                <span className="font-semibold text-amber-200">tungsten (តង់ស្ទែន)</span> — the metal with the highest
                melting point on Earth.
              </p>
              <p className="text-amber-50 text-sm sm:text-base leading-relaxed mt-2">
                Because the wire is so thin, it creates huge{" "}
                <span className="font-semibold text-amber-200">resistance (រេស៊ីស្តង់)</span> against the moving
                electricity. That resistance generates massive heat — until the wire literally{" "}
                <span className="font-semibold text-amber-200">glows white-hot with light</span>.
              </p>
              <p className="font-khmer text-amber-100/80 text-sm leading-loose mt-3">
                អគ្គិសនីត្រូវបានរុញឆ្លងកាត់ខ្សែលួសស្តើងបំផុតមួយ ហៅថា <span className="font-semibold text-amber-200">ខ្សែហ្វីឡាម៉ង់ (Filament)</span> ដែលស្ទើរតែតែងតែធ្វើពី <span className="font-semibold text-amber-200">តង់ស្ទែន (tungsten)</span> — លោហៈដែលមានចំណុចរលាយខ្ពស់បំផុតនៅលើផែនដី។
              </p>
              <p className="font-khmer text-amber-100/80 text-sm leading-loose mt-2">
                ដោយសារតែខ្សែស្តើងបំផុត វាបង្កើត <span className="font-semibold text-amber-200">រេស៊ីស្តង់</span> ដ៏ធំធេងប្រឆាំងនឹងចលនាអគ្គិសនី។ រេស៊ីស្តង់នោះបង្កើតកំដៅដ៏ច្រើន — រហូតដល់ខ្សែ <span className="font-semibold text-amber-200">ភ្លឺពណ៌សជាមួយពន្លឺ</span>។
              </p>
            </div>

            {/* Why it fails */}
            <div className="rounded-2xl bg-amber-950/40 border border-amber-700/30 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Thermometer className="w-5 h-5 text-orange-300" />
                <div className="font-mono text-[10px] tracking-widest uppercase text-orange-300/80">
                  Why it burns out <span className="font-khmer tracking-normal normal-case">/ មូលហេតុរលត់</span>
                </div>
              </div>
              <p className="text-amber-50 text-sm sm:text-base leading-relaxed">
                A standard incandescent bulb only lasts about{" "}
                <span className="font-semibold text-amber-200">1,000 hours</span> of use.
              </p>
              <p className="text-amber-50 text-sm sm:text-base leading-relaxed mt-2">
                Over time, the extreme heat causes the tungsten metal to slowly{" "}
                <span className="font-semibold text-amber-200">evaporate</span> from the filament. The wire gets
                thinner and thinner — until one day it is too thin to carry the current and it simply{" "}
                <span className="font-semibold text-amber-200">snaps</span>. That is exactly what people mean when
                they say a bulb has <span className="italic">"burned out"</span>.
              </p>
              <p className="font-khmer text-amber-100/80 text-sm leading-loose mt-3">
                អំពូលភ្លើងតាំងស្តង់ដារមានអាយុកាលត្រឹមតែប្រហែល <span className="font-semibold text-amber-200">១,០០០ ម៉ោង</span> នៃការប្រើប្រាស់។ ក្នុងរយៈពេលយូរ កំដៅខ្លាំងបណ្តាលឲ្យលោហៈតង់ស្ទែន <span className="font-semibold text-amber-200">បង្ហើរ</span> យឺតៗចេញពីខ្សែហ្វីឡាម៉ង់។ ខ្សែកាន់តែស្តើង រហូតដល់ថ្ងៃមួយវាស្តើងពេក មិនអាចទ្រចរន្តបាន ហើយ <span className="font-semibold text-amber-200">ដាច់ភ្លាម</span>។
              </p>
            </div>
          </div>

          {/* Lifecycle visual */}
          <div className="mt-5 rounded-2xl bg-amber-950/30 border border-amber-700/20 p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-300/80 mb-3">
              Filament lifecycle <span className="font-khmer normal-case tracking-normal">/ វដ្តជីវិតរបស់ហ្វីឡាម៉ង់</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <LifecycleStep
                en="New filament"
                kh="ហ្វីឡាម៉ង់ថ្មី"
                hint="Thick, glowing strong"
                hintKh="ក្រាស់ ភ្លឺខ្លាំង"
                stage={0}
              />
              <LifecycleStep
                en="Tungsten evaporates"
                kh="តង់ស្ទែនបង្ហើរ"
                hint="Gets thinner each hour"
                hintKh="ស្តើងបន្តិចម្តងៗ"
                stage={1}
              />
              <LifecycleStep
                en="The wire snaps"
                kh="ខ្សែដាច់"
                hint="Bulb burns out"
                hintKh="អំពូលរលត់"
                stage={2}
              />
            </div>
          </div>
        </div>

        {/* ── Section 3: Wattage vs Brightness ────────────────────────── */}
        <div className="relative px-6 sm:px-10 py-8 border-t border-amber-900/30">
          <SubHeader
            Icon={Zap}
            numberEn="PART 3"
            numberKh="ផ្នែកទី ៣"
            titleEn="Wattage vs. Brightness"
            titleKh="កម្លាំងវ៉ាត់ និងពន្លឺ"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Wattage */}
            <UnitCard
              symbol="W"
              unitEn="Watts"
              unitKh="វ៉ាត់"
              measuresEn="Energy IN"
              measuresKh="ថាមពលចូល"
              bodyEn="Watts measure how much electrical energy the bulb is consuming from the wall every second. It is the bill — the cost of running the bulb."
              bodyKh="វ៉ាត់វាស់ចំនួនថាមពលអគ្គិសនីដែលអំពូលប្រើប្រាស់ពីជញ្ជាំងក្នុងមួយវិនាទី។ វាគឺជាវិក្កយបត្រ — តម្លៃនៃការប្រើអំពូល។"
              accent="amber"
            />
            {/* Lumens */}
            <UnitCard
              symbol="lm"
              unitEn="Lumens"
              unitKh="លូម៉ែន"
              measuresEn="Light OUT"
              measuresKh="ពន្លឺចេញ"
              bodyEn="Lumens measure the actual brightness — how much visible light reaches your eyes. This is what you really care about when you choose a bulb."
              bodyKh="លូម៉ែនវាស់ពន្លឺពិតប្រាកដ — បរិមាណពន្លឺដែលឃើញទៅដល់ភ្នែករបស់អ្នក។ នេះគឺជាអ្វីដែលអ្នកពិតជាគិតគូរ នៅពេលអ្នកជ្រើសរើសអំពូល។"
              accent="sky"
            />
          </div>

          {/* The 40W vs 100W comparison */}
          <div className="rounded-2xl bg-amber-950/40 border border-amber-700/30 p-5 sm:p-6">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-300/80 mb-4">
              For old incandescent bulbs <span className="font-khmer normal-case tracking-normal">/ សម្រាប់អំពូលភ្លើងតាំងចាស់</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr] gap-4 items-center">
              <BulbCompareCard
                watts={40}
                glowSize={48}
                labelEn="40-Watt bulb"
                labelKh="អំពូល ៤០ វ៉ាត់"
                noteEn="Less electricity → less heat → less light"
                noteKh="អគ្គិសនីតិច → កំដៅតិច → ពន្លឺតិច"
              />
              <div
                aria-hidden
                className="text-amber-300/60 font-mono text-2xl text-center select-none"
              >
                vs
              </div>
              <BulbCompareCard
                watts={100}
                glowSize={88}
                labelEn="100-Watt bulb"
                labelKh="អំពូល ១០០ វ៉ាត់"
                noteEn="More electricity → more heat → more light"
                noteKh="អគ្គិសនីច្រើន → កំដៅច្រើន → ពន្លឺច្រើន"
                bright
              />
            </div>
            <p className="text-amber-100/80 text-sm leading-relaxed mt-5">
              For old incandescent bulbs, more watts means more electricity is being pushed through the same thin
              filament — creating more heat, which creates more light. So the 100-Watt bulb is roughly{" "}
              <span className="font-semibold text-amber-200">2.5× brighter</span> than the 40-Watt bulb.
            </p>
            <p className="font-khmer text-amber-100/70 text-sm leading-loose mt-2">
              សម្រាប់អំពូលភ្លើងតាំងចាស់ វ៉ាត់កាន់តែច្រើនមានន័យថាអគ្គិសនីកាន់តែច្រើនត្រូវរុញឆ្លងកាត់ខ្សែហ្វីឡាម៉ង់ស្តើងតែមួយ — បង្កើតកំដៅកាន់តែច្រើន ដែលបង្កើតពន្លឺកាន់តែច្រើន។ ដូច្នេះអំពូល ១០០ វ៉ាត់ ភ្លឺ <span className="font-semibold text-amber-200">ប្រហែល ២.៥ ដង</span> ច្រើនជាងអំពូល ៤០ វ៉ាត់។
            </p>
          </div>

          {/* Safety warning */}
          <div className="mt-5 rounded-2xl bg-rose-950/40 border-2 border-rose-500/50 p-5 sm:p-6 shadow-lg shadow-rose-900/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500 text-white grid place-items-center shrink-0 shadow-lg shadow-rose-500/40">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-rose-300 mb-1">
                  Safety warning <span className="font-khmer tracking-normal normal-case">/ ការព្រមាននៃសុវត្ថិភាព</span>
                </div>
                <p className="text-rose-50 text-base sm:text-lg font-bold leading-snug">
                  90% of the energy used by an incandescent bulb is wasted as heat — not light.
                </p>
                <p className="font-khmer text-rose-200 text-base sm:text-lg font-bold leading-snug mt-1">
                  ៩០% នៃថាមពលដែលប្រើដោយអំពូលភ្លើងតាំង ត្រូវខ្ជះខ្ជាយជាកំដៅ — មិនមែនពន្លឺឡើយ។
                </p>
                <p className="text-rose-50/85 text-sm sm:text-base leading-relaxed mt-3">
                  A 100-Watt bulb that has been on for even a few minutes can reach over{" "}
                  <span className="font-semibold text-rose-200">200°C</span> on the surface of the glass. Touching it
                  with bare skin causes <span className="font-semibold text-rose-200">severe burns</span> within
                  seconds. This is exactly why the world is switching to cool, energy-efficient{" "}
                  <span className="font-semibold text-rose-200">LEDs</span>, which produce the same brightness
                  using <span className="font-semibold text-rose-200">⅒ the energy</span> and stay cool to the touch.
                </p>
                <p className="font-khmer text-rose-100/80 text-sm leading-loose mt-2">
                  អំពូល ១០០ វ៉ាត់ ដែលបើកសូម្បីតែប៉ុន្មាននាទី អាចឡើងកំដៅលើសពី <span className="font-semibold text-rose-200">២០០°C</span> លើផ្ទៃកញ្ចក់។ ប៉ះវាដោយស្បែកទទេបណ្តាលឲ្យ <span className="font-semibold text-rose-200">រលាកធ្ងន់ធ្ងរ</span> ក្នុងរយៈពេលប៉ុន្មានវិនាទី។ នេះជាមូលហេតុដែលពិភពលោកកំពុងប្តូរទៅប្រើ <span className="font-semibold text-rose-200">អំពូល LED</span> ដែលត្រជាក់ និងសន្សំសំចៃថាមពល ដែលផលិតពន្លឺដូចគ្នាដោយប្រើ <span className="font-semibold text-rose-200">១/១០ នៃថាមពល</span> ហើយនៅត្រជាក់ពេលប៉ះ។
                </p>
              </div>
            </div>
          </div>

          {/* LED footnote */}
          <div className="mt-4 flex items-start gap-3 px-2 text-xs text-amber-200/70">
            <Leaf className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold text-emerald-300">Why LEDs win:</span>{" "}
              they produce light from a semiconductor chip, not a glowing wire — almost no heat, no fragile
              filament to snap, and a lifespan of <span className="font-semibold">25,000+ hours</span>.{" "}
              <span className="font-khmer text-amber-200/60">
                / អំពូល LED បង្កើតពន្លឺពីបន្ទះ semiconductor មិនមែនពីខ្សែដែលភ្លឺ — ស្ទើរតែគ្មានកំដៅ គ្មានហ្វីឡាម៉ង់ផុយដែលអាចដាច់ និងអាយុកាល ២៥,០០០+ ម៉ោង។
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────

function SpecChip({
  valueEn,
  labelEn,
  labelKh,
  warn = false,
}: {
  valueEn: string;
  labelEn: string;
  labelKh: string;
  warn?: boolean;
}) {
  return (
    <div
      className={`rounded-xl px-3 py-2.5 border ${
        warn
          ? "bg-rose-950/40 border-rose-500/40"
          : "bg-amber-950/40 border-amber-500/30"
      } flex flex-col`}
    >
      <div
        className={`font-display font-bold text-xl sm:text-2xl leading-none ${
          warn ? "text-rose-300" : "text-amber-300"
        }`}
      >
        {valueEn}
      </div>
      <div className="text-[11px] text-amber-100/70 mt-1 leading-tight">{labelEn}</div>
      <div className="font-khmer text-[11px] text-amber-100/50 leading-snug">{labelKh}</div>
    </div>
  );
}

function LifecycleStep({
  en,
  kh,
  hint,
  hintKh,
  stage,
}: {
  en: string;
  kh: string;
  hint: string;
  hintKh: string;
  stage: 0 | 1 | 2;
}) {
  // Render a thinning filament line
  const widths = [3, 1.6, 0.6];
  const colors = ["#fde047", "#f59e0b", "#7f1d1d"];
  const broken = stage === 2;
  return (
    <div className="rounded-xl bg-amber-950/40 border border-amber-700/30 p-4 flex flex-col items-center text-center">
      <svg viewBox="0 0 100 30" className="w-full h-8 mb-3" aria-hidden>
        {!broken ? (
          <path
            d="M5 15 Q 20 5, 30 15 T 55 15 T 80 15 T 95 15"
            fill="none"
            stroke={colors[stage]}
            strokeWidth={widths[stage]}
            strokeLinecap="round"
          />
        ) : (
          <>
            <path
              d="M5 15 Q 20 5, 30 15 T 45 15"
              fill="none"
              stroke={colors[2]}
              strokeWidth={widths[2]}
              strokeLinecap="round"
            />
            <path
              d="M55 15 T 80 15 T 95 15"
              fill="none"
              stroke={colors[2]}
              strokeWidth={widths[2]}
              strokeLinecap="round"
            />
            <text x="50" y="10" textAnchor="middle" fontSize="6" fill="#fca5a5">
              SNAP
            </text>
          </>
        )}
      </svg>
      <div className="text-sm font-bold text-amber-100 leading-tight">{en}</div>
      <div className="font-khmer text-xs text-amber-200 leading-snug mt-0.5">{kh}</div>
      <div className="text-[11px] text-amber-100/60 mt-2">{hint}</div>
      <div className="font-khmer text-[11px] text-amber-100/50 leading-snug">{hintKh}</div>
    </div>
  );
}

function UnitCard({
  symbol,
  unitEn,
  unitKh,
  measuresEn,
  measuresKh,
  bodyEn,
  bodyKh,
  accent,
}: {
  symbol: string;
  unitEn: string;
  unitKh: string;
  measuresEn: string;
  measuresKh: string;
  bodyEn: string;
  bodyKh: string;
  accent: "amber" | "sky";
}) {
  const map = {
    amber: {
      bg: "bg-amber-950/40",
      border: "border-amber-700/40",
      ink: "text-amber-300",
      pill: "bg-amber-500/20 border-amber-500/40 text-amber-200",
    },
    sky: {
      bg: "bg-sky-950/40",
      border: "border-sky-700/40",
      ink: "text-sky-300",
      pill: "bg-sky-500/20 border-sky-500/40 text-sky-200",
    },
  } as const;
  const a = map[accent];
  return (
    <div className={`rounded-2xl ${a.bg} border ${a.border} p-5`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className={`font-display font-bold text-2xl ${a.ink} leading-none`}>{unitEn}</div>
          <div className="font-khmer text-base text-amber-100/80 mt-0.5">{unitKh}</div>
        </div>
        <div
          className={`font-mono text-xl font-bold rounded-lg border px-3 py-1 ${a.pill}`}
        >
          {symbol}
        </div>
      </div>
      <div
        className={`text-xs font-mono tracking-widest uppercase ${a.ink} mb-2`}
      >
        Measures: {measuresEn}{" "}
        <span className="font-khmer normal-case tracking-normal opacity-80">/ វាស់៖ {measuresKh}</span>
      </div>
      <p className="text-amber-50/90 text-sm leading-relaxed">{bodyEn}</p>
      <p className="font-khmer text-amber-100/70 text-sm leading-loose mt-2">{bodyKh}</p>
    </div>
  );
}

function BulbCompareCard({
  watts,
  glowSize,
  labelEn,
  labelKh,
  noteEn,
  noteKh,
  bright = false,
}: {
  watts: number;
  glowSize: number;
  labelEn: string;
  labelKh: string;
  noteEn: string;
  noteKh: string;
  bright?: boolean;
}) {
  return (
    <div className="rounded-xl bg-amber-950/30 border border-amber-700/30 p-4 flex flex-col items-center text-center">
      <div
        className="relative grid place-items-center"
        style={{ width: 110, height: 110 }}
      >
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width: glowSize * 2.2,
            height: glowSize * 2.2,
            background: bright
              ? "radial-gradient(circle, rgba(253, 224, 71, 0.85) 0%, rgba(245, 158, 11, 0.4) 35%, transparent 70%)"
              : "radial-gradient(circle, rgba(253, 224, 71, 0.55) 0%, rgba(245, 158, 11, 0.2) 40%, transparent 75%)",
          }}
        />
        <GlowingBulbIcon className="relative" />
      </div>
      <div className={`font-display font-bold text-3xl leading-none mt-1 ${bright ? "text-amber-200" : "text-amber-300/80"}`}>
        {watts}
        <span className="text-base align-top ml-1">W</span>
      </div>
      <div className="text-sm font-semibold text-amber-100 mt-2 leading-tight">{labelEn}</div>
      <div className="font-khmer text-xs text-amber-200 leading-snug">{labelKh}</div>
      <div className="text-[11px] text-amber-100/60 mt-2 leading-snug">{noteEn}</div>
      <div className="font-khmer text-[11px] text-amber-100/50 leading-snug">{noteKh}</div>
    </div>
  );
}

// Re-export icon for parent use if desired
export { GlowingBulbIcon };
