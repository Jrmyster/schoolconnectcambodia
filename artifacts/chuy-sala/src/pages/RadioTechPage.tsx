import { Link } from "wouter";
import {
  ArrowLeft,
  Radio,
  RadioTower,
  Antenna,
  Waves,
  Mic,
  Speaker,
  Zap,
  History,
  Info,
  Mountain,
  CloudLightning,
  Music,
  Sparkles,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  TECH-05 · Radio Technology: Catching Invisible Waves
//            បច្ចេកវិទ្យាវិទ្យុ៖ ការចាប់យករលកអរូបិយ
//
//  1. The Electromagnetic Spectrum  · horizontal bar chart, radio highlighted
//  2. Transmitters & Receivers      · core loop + Marconi/Tesla history box
//  3. AM vs FM                      · side-by-side modulation comparison
//
//  Aesthetic: clean technical / blueprint — slate + cyan, with live SVG
//  waveform graphics. Strictly bilingual (EN/Khmer) on every concept.
// ════════════════════════════════════════════════════════════════════════════

// ─── EM Spectrum data ─────────────────────────────────────────────────────

type Band = {
  id: string;
  nameEn: string;
  nameKh: string;
  freq: string;       // frequency range (display)
  wave: string;       // wavelength (display)
  color: string;      // tailwind bg
  text: string;       // tailwind text
  highlight?: boolean;
};

const SPECTRUM: Band[] = [
  { id: "radio",  nameEn: "Radio",       nameKh: "វិទ្យុ",       freq: "10³–10⁹ Hz",   wave: "10³ – 10⁻¹ m",  color: "bg-cyan-500",    text: "text-cyan-50",    highlight: true },
  { id: "micro",  nameEn: "Microwave",   nameKh: "មីក្រូវ៉េវ",    freq: "10⁹–10¹¹",     wave: "10⁻¹ – 10⁻³ m", color: "bg-teal-500",    text: "text-teal-50" },
  { id: "ir",     nameEn: "Infrared",    nameKh: "អ៊ីនហ្វ្រារ៉េដ", freq: "10¹¹–10¹⁴",     wave: "10⁻³ – 10⁻⁶ m", color: "bg-emerald-500", text: "text-emerald-50" },
  { id: "vis",    nameEn: "Visible",     nameKh: "ពន្លឺមើលឃើញ",  freq: "~10¹⁵",        wave: "~10⁻⁶ m",       color: "bg-gradient-to-r from-violet-500 via-yellow-400 to-rose-500", text: "text-white" },
  { id: "uv",     nameEn: "Ultraviolet", nameKh: "អ៊ុលត្រាវីយ៉ូឡេ", freq: "10¹⁵–10¹⁷",    wave: "10⁻⁷ – 10⁻⁸ m", color: "bg-violet-600",  text: "text-violet-50" },
  { id: "xray",   nameEn: "X-ray",       nameKh: "អ៊ិចរេ",        freq: "10¹⁷–10¹⁹",    wave: "10⁻⁸ – 10⁻¹⁰ m", color: "bg-indigo-700", text: "text-indigo-50" },
  { id: "gamma",  nameEn: "Gamma",       nameKh: "ហ្គាម៉ា",       freq: ">10¹⁹",        wave: "<10⁻¹¹ m",      color: "bg-fuchsia-700",  text: "text-fuchsia-50" },
];

// ════════════════════════════════════════════════════════════════════════════

export default function RadioTechPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ── Header / Hero ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 text-white border-b border-cyan-700/40">
        <DecorativeWaves />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-cyan-200 hover:text-white text-sm mb-5 ${isKh ? "font-khmer" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-cyan-200">
            <RadioTower className="w-3.5 h-3.5" />
            TECH-05 · Radio & Waves
          </div>

          <h1 className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh ? "បច្ចេកវិទ្យាវិទ្យុ៖ ការចាប់យករលកអរូបិយ" : <>Radio Technology <span className="text-cyan-300">— Catching Invisible Waves</span></>}
          </h1>
          <p className={`mt-4 max-w-2xl text-cyan-100/90 text-sm sm:text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ស្ដាប់សំឡេងពីឆ្ងាយរាប់ពាន់គីឡូម៉ែត្រ — ដោយរលកដែលធំជាងអាគារ ហើយមើលមិនឃើញ។ នេះជារបៀបដែលវាដំណើរការ។"
              : "Hearing voices from a thousand kilometres away — through waves bigger than buildings, completely invisible to the eye. Here is how it works."}
          </p>
        </div>
      </header>

      {/* ── Section 1: EM Spectrum ────────────────────────────────────── */}
      <Section
        spec="01"
        Icon={Waves}
        eyebrowEn="The Electromagnetic Spectrum"
        eyebrowKh="វិសាលគមអេឡិចត្រូម៉ាញ៉េទិច"
        titleEn="Radio waves are a type of invisible light"
        titleKh="រលកវិទ្យុគឺជាប្រភេទពន្លឺដែលមើលមិនឃើញ"
        descEn="The light your eyes can see is just a tiny sliver in the middle. Below it are the giants: radio waves, with the lowest frequency and the longest wavelength — some as long as a building, which is why they slip right through walls and travel across cities."
        descKh="ពន្លឺដែលភ្នែកអ្នកមើលឃើញគ្រាន់តែជាបំណែកតូចមួយនៅកណ្ដាល។ ខាងក្រោមវាគឺជាយក្ស៖ រលកវិទ្យុ ដែលមានប្រេកង់ទាបបំផុត និងរលកវែងបំផុត — ខ្លះវែងដូចអាគារ ហើយនេះជាមូលហេតុដែលវាអាចហោះកាត់ជញ្ជាំង និងធ្វើដំណើរឆ្លងកាត់ទីក្រុង។"
        isKh={isKh}
      >
        <SpectrumChart isKh={isKh} />

        <Callout
          isKh={isKh}
          Icon={Info}
          en={`"Radio waves are a type of invisible light." — they travel at the same speed (c ≈ 300,000 km/s) and obey the same physics, but their wavelength is so long they pass through walls, mountains, and weather.`}
          kh={`"រលកវិទ្យុគឺជាប្រភេទពន្លឺដែលមើលមិនឃើញ។" — វាធ្វើដំណើរក្នុងល្បឿនដូចគ្នា (c ≈ 300,000 គ.ម./វិ) និងគោរពតាមរូបវិទ្យាដូចគ្នា ប៉ុន្តែរលកវែងជាង ដូច្នេះវាហោះកាត់ជញ្ជាំង ភ្នំ និងអាកាសធាតុ។`}
          accent="cyan"
        />
      </Section>

      {/* ── Section 2: Transmitters & Receivers ──────────────────────── */}
      <Section
        spec="02"
        Icon={RadioTower}
        eyebrowEn="Transmitters & Receivers"
        eyebrowKh="ឧបករណ៍បញ្ជូន និងឧបករណ៍ទទួល"
        titleEn="The core loop: sound → wave → sound"
        titleKh="វដ្តជាមូលដ្ឋាន៖ សំឡេង → រលក → សំឡេង"
        descEn="Every radio station, walkie-talkie, and Bluetooth speaker uses the same two-part dance: a transmitter that turns sound into a wave, and a receiver that turns the wave back into sound."
        descKh="ស្ថានីយ៍វិទ្យុ វ៉ាគី-ថលគី និងឧបករណ៍ប៊្លូធូសទាំងអស់ ប្រើការរាំពីរផ្នែកដូចគ្នា៖ ឧបករណ៍បញ្ជូនដែលបង្វែរសំឡេងទៅជារលក និងឧបករណ៍ទទួលដែលបង្វែររលកត្រឡប់ទៅសំឡេងវិញ។"
        isKh={isKh}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LoopCard
            isKh={isKh}
            stage="A"
            Icon={Mic}
            stageEn="Transmitter"
            stageKh="អ្នកបញ្ជូន"
            titleEn="Voice into the sky"
            titleKh="សំឡេងទៅលើមេឃ"
            steps={[
              { en: "A DJ speaks into a microphone.", kh: "DJ និយាយចូលមីក្រូ។" },
              { en: "Sound is turned into an electrical signal.", kh: "សំឡេងត្រូវបានបង្វែរទៅជាសញ្ញាអគ្គិសនី។" },
              { en: "The signal is pushed up the antenna and launched as a radio wave.", kh: "សញ្ញានេះត្រូវបានរុញឡើងលើអង់តែន ហើយបញ្ចេញជារលកវិទ្យុ។" },
            ]}
            tone="from-cyan-500 to-blue-600"
          />
          <LoopCard
            isKh={isKh}
            stage="B"
            Icon={Speaker}
            stageEn="Receiver"
            stageKh="អ្នកទទួល"
            titleEn="Sky back into sound"
            titleKh="មេឃត្រឡប់មកជាសំឡេងវិញ"
            steps={[
              { en: "Your radio's antenna catches that specific wave.", kh: "អង់តែនវិទ្យុរបស់អ្នកចាប់យករលកជាក់លាក់នោះ។" },
              { en: "Inside the radio, the wave becomes a small electrical signal again.", kh: "នៅខាងក្នុងវិទ្យុ រលកក្លាយជាសញ្ញាអគ្គិសនីតូចម្ដងទៀត។" },
              { en: "The speaker turns the electricity back into sound you can hear.", kh: "ឧបករណ៍បំពងសំឡេងបង្វែរអគ្គិសនីត្រឡប់ទៅជាសំឡេងដែលអ្នកអាចស្ដាប់បាន។" },
            ]}
            tone="from-emerald-500 to-teal-600"
          />
        </div>

        {/* Loop diagram */}
        <LoopDiagram isKh={isKh} />

        {/* History */}
        <HistoryBox isKh={isKh} />
      </Section>

      {/* ── Section 3: AM vs FM ──────────────────────────────────────── */}
      <Section
        spec="03"
        Icon={Music}
        eyebrowEn="AM vs FM"
        eyebrowKh="ការប្រៀបធៀប AM និង FM"
        titleEn="Two ways to hide music inside a wave"
        titleKh="វិធីពីរយ៉ាងដើម្បីលាក់តន្ត្រីខាងក្នុងរលក"
        descEn="To send music or a voice, the transmitter must 'modulate' (change) the carrier wave to match the sound. There are two famous ways: change the height (AM) or change the spacing (FM)."
        descKh="ដើម្បីផ្ញើតន្ត្រី ឬសំឡេង ឧបករណ៍បញ្ជូនត្រូវ 'កែប្រែ' រលកដឹកនាំឱ្យត្រូវនឹងសំឡេង។ មានវិធីល្បីពីរ៖ ផ្លាស់ប្ដូរកម្ពស់ (AM) ឬផ្លាស់ប្ដូរចន្លោះ (FM)។"
        isKh={isKh}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ModulationCard
            isKh={isKh}
            badge="AM"
            nameEn="Amplitude Modulation"
            nameKh="ការកែប្រែអំព្លីទុត"
            ideaEn="We change the HEIGHT of the wave to match the sound."
            ideaKh="យើងផ្លាស់ប្ដូរកម្ពស់នៃរលកឱ្យត្រូវនឹងសំឡេង។"
            pros={[
              { en: "Travels very far — bounces off the upper atmosphere, reaching over mountains and across continents.", kh: "ធ្វើដំណើរបានឆ្ងាយណាស់ — លោតលើបរិយាកាសខាងលើ ឆ្លងភ្នំ និងឆ្លងទ្វីប។" },
            ]}
            cons={[
              { en: "Picks up static and crackle easily — thunderstorms, motors, and electrical noise all distort the height.", kh: "ងាយចាប់សំឡេងស្តាទិច និងការរំខាន — ផ្គររន្ទះ ម៉ូទ័រ និងសម្លេងអគ្គិសនី ធ្វើឱ្យកម្ពស់រលកខូច។" },
            ]}
            tone={{ accent: "amber", from: "from-amber-500", to: "to-orange-600", ring: "ring-amber-200" }}
            CornerIcon={CloudLightning}
            cornerLabelEn="Long range, more static"
            cornerLabelKh="ឆ្ងាយជាង សំឡេងរំខានច្រើនជាង"
            wave="am"
          />
          <ModulationCard
            isKh={isKh}
            badge="FM"
            nameEn="Frequency Modulation"
            nameKh="ការកែប្រែប្រេកង់"
            ideaEn="We change the SPEED / spacing of the wave to match the sound."
            ideaKh="យើងផ្លាស់ប្ដូរល្បឿន / ចន្លោះនៃរលកឱ្យត្រូវនឹងសំឡេង។"
            pros={[
              { en: "Incredibly clear, hi-fi sound — interference cannot fake the spacing of a wave, only its height.", kh: "សំឡេងច្បាស់ និងគុណភាពខ្ពស់ — ការរំខានមិនអាចក្លែងបន្លំចន្លោះរលកបានទេ។" },
            ]}
            cons={[
              { en: "Shorter range — FM waves travel mostly in straight lines and stop at the horizon.", kh: "ចម្ងាយខ្លីជាង — រលក FM ភាគច្រើនធ្វើដំណើរត្រង់ ហើយឈប់នៅចុងផ្តេក។" },
            ]}
            tone={{ accent: "sky", from: "from-sky-500", to: "to-cyan-600", ring: "ring-sky-200" }}
            CornerIcon={Mountain}
            cornerLabelEn="Short range, crystal clear"
            cornerLabelKh="ចម្ងាយខ្លី សំឡេងច្បាស់ដូចគ្រីស្តាល់"
            wave="fm"
          />
        </div>

        <Callout
          isKh={isKh}
          Icon={Sparkles}
          en="A simple rule: AM cares about how TALL the wave is. FM cares about how CLOSE TOGETHER the waves are."
          kh="ច្បាប់សាមញ្ញ៖ AM យកចិត្តទុកដាក់ថា រលកមានកម្ពស់ប៉ុនណា។ FM យកចិត្តទុកដាក់ថា រលកនៅជិតគ្នាប៉ុនណា។"
          accent="emerald"
        />
      </Section>

      {/* ── Footer breadcrumb ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-cyan-700 hover:text-cyan-900 text-sm ${isKh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Building blocks
// ════════════════════════════════════════════════════════════════════════════

function Section({
  spec, Icon, eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  spec: string;
  Icon: React.ComponentType<{ className?: string }>;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-cyan-100 text-cyan-700 rounded-full px-2.5 py-0.5">SEC-{spec}</span>
        <Icon className="w-5 h-5 text-cyan-600" />
        <span className={`text-xs font-bold uppercase tracking-widest text-cyan-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-2 ${isKh ? "font-khmer leading-snug" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-slate-600 text-sm sm:text-base mb-6 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Callout({
  Icon, en, kh, accent, isKh,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  en: string; kh: string;
  accent: "cyan" | "emerald" | "amber" | "sky";
  isKh: boolean;
}) {
  const tone = {
    cyan:    { bg: "bg-cyan-50",    border: "border-cyan-300",    text: "text-cyan-900",    icon: "text-cyan-600" },
    emerald: { bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-900", icon: "text-emerald-600" },
    amber:   { bg: "bg-amber-50",   border: "border-amber-300",   text: "text-amber-900",   icon: "text-amber-600" },
    sky:     { bg: "bg-sky-50",     border: "border-sky-300",     text: "text-sky-900",     icon: "text-sky-600" },
  }[accent];
  return (
    <div className={`flex gap-3 p-4 rounded-xl border-l-4 ${tone.bg} ${tone.border}`}>
      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${tone.icon}`} />
      <p className={`text-sm ${tone.text} ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? kh : en}
      </p>
    </div>
  );
}

// ─── Section 1: Spectrum chart ────────────────────────────────────────────

function SpectrumChart({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 text-xs">
        <div className={`flex items-center gap-1.5 text-slate-500 ${isKh ? "font-khmer" : "font-mono uppercase tracking-widest"}`}>
          <span className="w-2 h-2 rounded-full bg-cyan-500" />
          {isKh ? "ប្រេកង់ទាប · រលកវែង" : "Low frequency · Long wavelength"}
        </div>
        <div className={`flex items-center gap-1.5 text-slate-500 ${isKh ? "font-khmer" : "font-mono uppercase tracking-widest"}`}>
          {isKh ? "ប្រេកង់ខ្ពស់ · រលកខ្លី" : "High frequency · Short wavelength"}
          <span className="w-2 h-2 rounded-full bg-fuchsia-700" />
        </div>
      </div>

      {/* Bar chart */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 rounded-lg overflow-hidden">
        {SPECTRUM.map((b) => (
          <div
            key={b.id}
            className={`relative ${b.color} ${b.text} p-2 sm:p-3 min-h-[110px] sm:min-h-[130px] flex flex-col justify-between transition-transform hover:scale-[1.03] focus-within:scale-[1.03] ${
              b.highlight ? "ring-2 ring-offset-2 ring-cyan-600 rounded-md z-10" : ""
            }`}
            data-testid={`em-band-${b.id}`}
          >
            <div>
              <div className={`text-[10px] sm:text-xs font-bold leading-tight ${isKh ? "font-khmer" : "uppercase tracking-wide"}`}>
                {isKh ? b.nameKh : b.nameEn}
              </div>
              {b.highlight && (
                <div className="mt-0.5 inline-block text-[8px] sm:text-[9px] font-mono uppercase bg-white/30 rounded px-1 py-0.5">
                  YOU ARE HERE
                </div>
              )}
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono opacity-90 leading-tight">
              <div>f: {b.freq}</div>
              <div>λ: {b.wave}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Wavelength comparison strip */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="rounded-lg bg-cyan-50 border border-cyan-200 p-3">
          <div className={`font-bold text-cyan-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "រលកវិទ្យុ" : "Radio wave"}
          </div>
          <div className={`text-cyan-800 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? "វែងដូចជាអាគារ ➜ ហោះកាត់ជញ្ជាំង" : "Long as a building ➜ passes through walls"}
          </div>
        </div>
        <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
          <div className={`font-bold text-yellow-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ពន្លឺមើលឃើញ" : "Visible light"}
          </div>
          <div className={`text-yellow-800 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? "តូចជាងសក់ ៥០០ ដង" : "500× thinner than a hair"}
          </div>
        </div>
        <div className="rounded-lg bg-fuchsia-50 border border-fuchsia-200 p-3">
          <div className={`font-bold text-fuchsia-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "កាំរស្មីហ្គាម៉ា" : "Gamma ray"}
          </div>
          <div className={`text-fuchsia-800 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? "តូចជាងអាតូម" : "Smaller than an atom"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section 2: Loop cards & diagram ──────────────────────────────────────

function LoopCard({
  isKh, stage, Icon, stageEn, stageKh, titleEn, titleKh, steps, tone,
}: {
  isKh: boolean;
  stage: "A" | "B";
  Icon: React.ComponentType<{ className?: string }>;
  stageEn: string; stageKh: string;
  titleEn: string; titleKh: string;
  steps: { en: string; kh: string }[];
  tone: string;
}) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className={`bg-gradient-to-r ${tone} text-white px-5 py-3 flex items-center gap-3`}>
        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-mono font-bold">
          {stage}
        </div>
        <div className="min-w-0">
          <div className={`text-[10px] font-mono uppercase tracking-widest opacity-90 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? stageKh : stageEn}
          </div>
          <div className={`font-display font-bold text-lg leading-tight ${isKh ? "font-khmer" : ""}`}>
            {isKh ? titleKh : titleEn}
          </div>
        </div>
        <Icon className="w-7 h-7 ml-auto opacity-80" />
      </div>
      <ol className="p-5 space-y-2.5">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3 items-start text-sm">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <span className={`text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? s.kh : s.en}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function LoopDiagram({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-800 text-white p-5 sm:p-6 overflow-hidden">
      <div className={`text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-3 text-center ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
        {isKh ? "ការដឹកជញ្ជូនរលក" : "Wave handoff"}
      </div>
      <svg viewBox="0 0 600 140" className="w-full h-auto" aria-hidden>
        {/* Transmitter tower */}
        <g transform="translate(40,20)">
          <line x1="40" y1="0" x2="40" y2="100" stroke="#22d3ee" strokeWidth="3" />
          <polygon points="40,0 36,12 44,12" fill="#22d3ee" />
          <line x1="20" y1="100" x2="60" y2="100" stroke="#cbd5e1" strokeWidth="2" />
          <text x="40" y="120" textAnchor="middle" fill="#67e8f9" fontSize="11" fontFamily="monospace">TX</text>
        </g>
        {/* Waves */}
        <g>
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M 100 ${50 + i * 4} Q 250 ${10 - i * 4}, 400 ${50 + i * 4} T 500 ${50 + i * 4}`}
              fill="none"
              stroke="#67e8f9"
              strokeWidth={2 - i * 0.3}
              opacity={0.9 - i * 0.18}
            />
          ))}
        </g>
        {/* Receiver radio */}
        <g transform="translate(490,40)">
          <rect x="0" y="20" width="70" height="55" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
          <line x1="35" y1="20" x2="35" y2="0" stroke="#10b981" strokeWidth="2" />
          <circle cx="35" cy="0" r="3" fill="#10b981" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="#34d399" strokeWidth="2" />
          <circle cx="50" cy="50" r="3" fill="#34d399" />
          <rect x="10" y="40" width="20" height="10" rx="2" fill="#0f172a" stroke="#34d399" />
          <text x="35" y="95" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontFamily="monospace">RX</text>
        </g>
      </svg>
      <div className={`mt-2 grid grid-cols-3 gap-2 text-[11px] text-center ${isKh ? "font-khmer" : "font-mono uppercase tracking-widest"}`}>
        <div className="text-cyan-300">{isKh ? "បញ្ជូន" : "Transmit"}</div>
        <div className="text-slate-400">{isKh ? "រលកវិទ្យុ" : "Radio wave"}</div>
        <div className="text-emerald-300">{isKh ? "ទទួល" : "Receive"}</div>
      </div>
    </div>
  );
}

function HistoryBox({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-amber-200/70 flex items-center justify-center">
          <History className="w-5 h-5 text-amber-700" />
        </div>
        <div className="min-w-0">
          <div className={`text-[10px] font-mono uppercase tracking-widest text-amber-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "ប្រវត្តិ · ឆ្នាំ ១៨៩០" : "History · 1890s"}
          </div>
          <h3 className={`font-display font-bold text-lg text-amber-950 mt-0.5 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "Marconi និង Tesla — ចំណេញរលកដំបូង" : "Marconi & Tesla — winning the first waves"}
          </h3>
          <p className={`mt-2 text-sm text-amber-900 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "នៅចុងទសវត្សរ៍ ១៨៩០ វិស្វករអ៊ីតាលី Guglielmo Marconi បានបង្ហាញការទំនាក់ទំនងវិទ្យុចម្ងាយឆ្ងាយជាលើកដំបូង — ផ្ញើសញ្ញាឆ្លងមហាសមុទ្រអាត្លង់ទិកនៅឆ្នាំ ១៩០១។ វិស្វករសែប Nikola Tesla បានបង្កើតស្នាដៃមូលដ្ឋានច្រើនមុនអំពីសៀគ្វីដែលធ្វើឱ្យការនេះអាចទៅរួច។ បច្ចុប្បន្ននេះ ស្ទើរតែគ្រប់សម្ភារៈឥតខ្សែក្នុងផ្ទះរបស់អ្នក សុទ្ធតែទាញមកពីការងាររបស់ពួកគេ។"
              : "In the late 1890s, Italian engineer Guglielmo Marconi demonstrated the first long-distance radio communication — sending a signal across the Atlantic Ocean in 1901. Serbian-American inventor Nikola Tesla had already built much of the foundational circuit work that made it possible. Almost every wireless device in your home today traces back to their inventions."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Section 3: AM vs FM cards ────────────────────────────────────────────

function ModulationCard({
  isKh, badge, nameEn, nameKh, ideaEn, ideaKh, pros, cons, tone, CornerIcon, cornerLabelEn, cornerLabelKh, wave,
}: {
  isKh: boolean;
  badge: "AM" | "FM";
  nameEn: string; nameKh: string;
  ideaEn: string; ideaKh: string;
  pros: { en: string; kh: string }[];
  cons: { en: string; kh: string }[];
  tone: { accent: string; from: string; to: string; ring: string };
  CornerIcon: React.ComponentType<{ className?: string }>;
  cornerLabelEn: string; cornerLabelKh: string;
  wave: "am" | "fm";
}) {
  return (
    <div className={`relative rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden ring-1 ${tone.ring}`}>
      <div className={`bg-gradient-to-br ${tone.from} ${tone.to} text-white p-5 relative`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-widest opacity-90">MODULATION</div>
            <div className="font-display font-extrabold text-3xl leading-none mt-0.5">{badge}</div>
            <div className={`mt-1 text-sm font-semibold ${isKh ? "font-khmer" : ""}`}>
              {isKh ? nameKh : nameEn}
            </div>
            <div className={`text-[11px] opacity-90 mt-0.5 ${isKh ? "font-sans" : "font-khmer"}`}>
              {isKh ? nameEn : nameKh}
            </div>
          </div>
          <CornerIcon className="w-7 h-7 opacity-80 flex-shrink-0" />
        </div>
        <WaveGraphic kind={wave} />
      </div>

      <div className="p-5 space-y-4">
        <div className={`text-sm font-bold text-slate-900 ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh ? ideaKh : ideaEn}
        </div>

        <div>
          <div className={`text-[10px] font-mono uppercase tracking-widest text-emerald-700 mb-1.5 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            ✓ {isKh ? "ចំណុចរឹង" : "Pros"}
          </div>
          {pros.map((p, i) => (
            <p key={i} className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? p.kh : p.en}
            </p>
          ))}
        </div>

        <div>
          <div className={`text-[10px] font-mono uppercase tracking-widest text-rose-700 mb-1.5 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            ✗ {isKh ? "ចំណុចខ្សោយ" : "Cons"}
          </div>
          {cons.map((c, i) => (
            <p key={i} className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? c.kh : c.en}
            </p>
          ))}
        </div>

        <div className={`pt-2 border-t border-slate-100 text-[11px] text-slate-500 ${isKh ? "font-khmer" : "font-mono uppercase tracking-widest"}`}>
          {isKh ? cornerLabelKh : cornerLabelEn}
        </div>
      </div>
    </div>
  );
}

function WaveGraphic({ kind }: { kind: "am" | "fm" }) {
  // AM: amplitude varies (envelope grows/shrinks); FM: frequency varies (spacing tight/loose)
  const points: string[] = [];
  if (kind === "am") {
    for (let x = 0; x <= 300; x += 1) {
      const env = 16 + 14 * Math.sin((x / 300) * Math.PI * 2); // amplitude envelope
      const y = 30 + env * Math.sin((x / 300) * Math.PI * 14);
      points.push(`${x},${y.toFixed(1)}`);
    }
  } else {
    for (let x = 0; x <= 300; x += 1) {
      // frequency grows along x: integrate sin(k(x)*x) — use phase that increases nonlinearly
      const phase = (x / 300) * Math.PI * 8 + Math.pow(x / 300, 2) * Math.PI * 18;
      const y = 30 + 22 * Math.sin(phase);
      points.push(`${x},${y.toFixed(1)}`);
    }
  }
  return (
    <svg viewBox="0 0 300 60" className="mt-3 w-full h-12" aria-hidden>
      <polyline
        fill="none"
        stroke="white"
        strokeOpacity="0.85"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points.join(" ")}
      />
    </svg>
  );
}

// ─── Decorative wave background for hero ──────────────────────────────────

function DecorativeWaves() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      viewBox="0 0 800 300"
      preserveAspectRatio="none"
      aria-hidden
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M 0 ${60 + i * 40} Q 200 ${20 + i * 40}, 400 ${60 + i * 40} T 800 ${60 + i * 40}`}
          fill="none"
          stroke="#67e8f9"
          strokeWidth={1.5 - i * 0.2}
          opacity={0.6 - i * 0.1}
        />
      ))}
    </svg>
  );
}
