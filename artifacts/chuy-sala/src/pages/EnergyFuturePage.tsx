import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  AtomIcon,
  Battery,
  CircleDot,
  Cpu,
  Droplet,
  Flame,
  Footprints,
  Globe2,
  Leaf,
  Magnet,
  Moon,
  Mountain,
  Quote,
  Radiation,
  Rocket,
  Satellite,
  ShieldAlert,
  Snowflake,
  Sparkles,
  Sun,
  Telescope,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  ENG-01 · Renewable & Future Energies: Powering Spaceship Earth
//           ថាមពលកកើតឡើងវិញ និងអនាគត៖ ការផ្តល់ថាមពលដល់ផែនដី
//
//  1. The Giants of Nature   · solar, wind & hydro, geothermal & tidal
//  2. The Atomic Engine      · fission, thorium fuel cycle
//  3. Micro & Frugal Power   · piezoelectric (train-station floor tiles)
//  4. The Speculative Frontier · hot fusion, cold fusion / LENR, space solar
//
//  Aesthetic: Clean Future — stark whites, neon blue (atomic),
//  vibrant green (nature), amber (frugal), violet (speculative).
// ════════════════════════════════════════════════════════════════════════════

const NEON = "#0ea5e9";        // neon blue — atomic
const NEON_DEEP = "#0369a1";   // deeper blue
const GREEN = "#16a34a";       // vibrant green — nature
const GREEN_DEEP = "#14532d";
const AMBER = "#d97706";       // frugal — amber/gold
const VIOLET = "#7c3aed";      // speculative — neon violet
const VIOLET_DEEP = "#4c1d95";
const INK = "#0f172a";         // near-black for contrast

const FRAME: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  backgroundImage:
    "radial-gradient(circle at 15% 20%, rgba(14, 165, 233, 0.06), transparent 45%)," +
    "radial-gradient(circle at 85% 80%, rgba(22, 163, 74, 0.05), transparent 50%)," +
    "linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px)," +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
  backgroundSize: "auto, auto, 56px 56px, 56px 56px",
};

type T = (en: string, kh: string) => string;

// ─── Section header ──────────────────────────────────────────────────────────

function SectionHeader({
  spec,
  en,
  kh,
  k,
  Icon,
  accent,
}: {
  spec: string;
  en: string;
  kh: string;
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3 flex-wrap">
      <span
        className="font-mono text-[10px] tracking-[0.25em] uppercase text-white rounded px-2 py-0.5 shadow-sm"
        style={{ backgroundColor: accent }}
      >
        SEC-{spec}
      </span>
      <Icon className="w-5 h-5" style={{ color: accent }} />
      <h2
        className={`text-xl sm:text-2xl font-bold ${k ? "font-khmer" : ""}`}
        style={{ color: INK }}
      >
        {k ? kh : en}
      </h2>
      <div
        className="flex-1 border-t-2"
        style={{ borderColor: `${accent}55` }}
      />
    </div>
  );
}

// ─── Reusable tech card ──────────────────────────────────────────────────────

type TechCardProps = {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enName: string;
  khName: string;
  enTag: string;
  khTag: string;
  enHow: string;
  khHow: string;
  enExample?: string;
  khExample?: string;
  exampleEnLabel?: string;
  exampleKhLabel?: string;
  accent: string;
  glow?: boolean;
  badge?: { en: string; kh: string };
};

function TechCard({
  k,
  Icon,
  enName,
  khName,
  enTag,
  khTag,
  enHow,
  khHow,
  enExample,
  khExample,
  exampleEnLabel = "Real-world example",
  exampleKhLabel = "ឧទាហរណ៍ក្នុងជីវភាពពិត",
  accent,
  glow = false,
  badge,
}: TechCardProps) {
  return (
    <div
      className="relative rounded-2xl p-5 bg-white border-2 shadow-sm overflow-hidden flex flex-col"
      style={{
        borderColor: `${accent}66`,
        boxShadow: glow
          ? `0 0 0 1px ${accent}33 inset, 0 8px 28px -12px ${accent}66`
          : undefined,
      }}
      data-testid={`tech-card-${enName.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* coloured top stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ backgroundColor: accent }}
      />

      <div className="flex items-start gap-3 mb-2 mt-1">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `${accent}14`,
            border: `1px solid ${accent}33`,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <h4
            className={`font-bold text-base sm:text-lg leading-tight ${k ? "font-khmer" : ""}`}
            style={{ color: INK }}
          >
            {k ? khName : enName}
          </h4>
          <div
            className={`text-[11px] font-mono uppercase tracking-widest mt-0.5 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
            style={{ color: accent }}
          >
            {k ? khTag : enTag}
          </div>
        </div>
        {badge ? (
          <span
            className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full text-white ${k ? "font-khmer normal-case tracking-normal" : ""}`}
            style={{ backgroundColor: accent }}
          >
            {k ? badge.kh : badge.en}
          </span>
        ) : null}
      </div>

      <p
        className={`text-sm text-slate-700 mb-3 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {k ? khHow : enHow}
      </p>

      {enExample ? (
        <div
          className="mt-auto rounded-lg p-3 border"
          style={{
            backgroundColor: `${accent}08`,
            borderColor: `${accent}33`,
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" style={{ color: accent }} />
            <span
              className={`text-[10px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`}
              style={{ color: accent }}
            >
              {k ? exampleKhLabel : exampleEnLabel}
            </span>
          </div>
          <p
            className={`text-xs ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK }}
          >
            {k ? khExample : enExample}
          </p>
        </div>
      ) : null}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════

export function EnergyFuturePage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={FRAME}>
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors ${k ? "font-khmer" : ""}`}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
        </div>

        {/* Hero */}
        <header
          className="relative rounded-3xl p-6 sm:p-9 mb-10 overflow-hidden shadow-xl border"
          style={{
            borderColor: `${NEON}55`,
            backgroundImage: `
              radial-gradient(circle at 15% 20%, ${NEON}55, transparent 50%),
              radial-gradient(circle at 85% 80%, ${GREEN}55, transparent 55%),
              linear-gradient(135deg, #0b1220 0%, #0f172a 50%, #0b1220 100%)
            `,
          }}
        >
          {/* hairline grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)," +
                "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative flex items-start gap-4">
            <div
              className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border"
              style={{
                backgroundColor: "rgba(14, 165, 233, 0.12)",
                borderColor: `${NEON}66`,
                boxShadow: `0 0 20px ${NEON}55 inset`,
              }}
            >
              <Zap className="w-8 h-8" style={{ color: "#bae6fd" }} />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] mb-2 text-sky-200/80 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
              >
                <span>{t("Science", "វិទ្យាសាស្ត្រ")}</span>
                <span>·</span>
                <span>ENG-01</span>
              </div>
              <h1
                className={`text-3xl sm:text-4xl font-extrabold text-white leading-tight ${k ? "font-khmer leading-loose" : ""}`}
                data-testid="page-title"
              >
                {t(
                  "Renewable & Future Energies: Powering Spaceship Earth",
                  "ថាមពលកកើតឡើងវិញ និងអនាគត៖ ការផ្តល់ថាមពលដល់ផែនដី"
                )}
              </h1>
              <p
                className={`mt-3 text-sm sm:text-base text-slate-200/90 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              >
                {t(
                  "Every device you own runs on energy borrowed from somewhere. The question of the century is no longer whether we can produce more power — it is how we can produce it without burning the only planet we have. This is a tour of the answers, from the giants of nature to the speculative frontier.",
                  "គ្រឿងបរិក្ខារនីមួយៗដែលអ្នកកាន់កាប់ ដំណើរការដោយប្រើថាមពលដែលខ្ចីពីកន្លែងណាមួយ។ សំណួរនៃសតវត្ស មិនមែនថាតើយើងអាចផលិតថាមពលច្រើនជាងនេះបានទេ — ប៉ុន្តែតើយើងអាចផលិតវាដោយមិនដុតផែនដីតែមួយគត់ដែលយើងមាន។ នេះគឺជាដំណើរទស្សនកិច្ចនៃចម្លើយ ចាប់ពីយក្សនៃធម្មជាតិ ដល់ព្រំដែនការស្រាវជ្រាវនៃអនាគត។"
                )}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <HeroChip color={GREEN}  k={k} en="Nature" kh="ធម្មជាតិ" />
                <HeroChip color={NEON}   k={k} en="Atomic" kh="បរមាណូ" />
                <HeroChip color={AMBER}  k={k} en="Frugal" kh="ខ្នាតតូច" />
                <HeroChip color={VIOLET} k={k} en="Frontier" kh="អនាគត" />
              </div>
            </div>
          </div>
        </header>

        <SectionGiants     k={k} t={t} />
        <SectionAtomic     k={k} t={t} />
        <SectionFrugal     k={k} t={t} />
        <SectionFrontier   k={k} t={t} />

        {/* Closing */}
        <div
          className="relative mt-12 rounded-2xl border-2 bg-white p-5 flex items-start gap-3 shadow"
          style={{ borderColor: `${NEON}55` }}
          data-testid="closing-note"
        >
          <Sparkles className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: NEON_DEEP }} />
          <p className={`text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong className={k ? "" : "font-bold"}>
              {t("Why it matters: ", "ហេតុអ្វីសំខាន់ ៖ ")}
            </strong>
            {t(
              "There is no single \u201Cclean\u201D energy source. The real future is a blend — solar on every roof, wind across every coastline, hydro from honest rivers, and atomic engines designed to be safer than the ones our parents grew up fearing. Knowing the trade-offs is what turns a citizen into an engineer of the next century.",
              "មិនមានប្រភពថាមពល «ស្អាត» តែមួយនោះទេ។ អនាគតពិត គឺជាការលាយឡំ — ថាមពលព្រះអាទិត្យលើដំបូលនីមួយៗ ខ្យល់នៅតាមបណ្តោយឆ្នេរសមុទ្រ វារីអគ្គិសនីពីទន្លេស្មោះត្រង់ និងម៉ាស៊ីនបរមាណូដែលត្រូវបានរចនាឲ្យមានសុវត្ថិភាពជាងម៉ាស៊ីនដែលឪពុកម្តាយរបស់យើងធ្លាប់ខ្លាច។ ការស្គាល់គុណវិបត្តិ គឺជាអ្វីដែលប្រែប្រួលប្រជាពលរដ្ឋទៅជាវិស្វករនៃសតវត្សបន្ទាប់។"
            )}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold shadow hover:opacity-90 transition-opacity ${k ? "font-khmer" : ""}`}
            style={{ backgroundColor: NEON_DEEP }}
          >
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function HeroChip({
  color,
  k,
  en,
  kh,
}: {
  color: string;
  k: boolean;
  en: string;
  kh: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${k ? "font-khmer" : ""}`}
      style={{
        color,
        borderColor: `${color}88`,
        backgroundColor: `${color}1f`,
      }}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {k ? kh : en}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 01 — The Giants of Nature
// ════════════════════════════════════════════════════════════════════════════

function SectionGiants({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-giants">
      <SectionHeader
        spec="01"
        en="The Giants of Nature"
        kh="ថាមពលធម្មជាតិ"
        k={k}
        Icon={Leaf}
        accent={GREEN}
      />

      <p className={`text-sm text-slate-700 mb-5 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "These are the energy sources that have always existed on Earth, given to us for free by sunlight, wind, water, and the planet itself. Our only job is to learn how to harvest them without breaking the systems that produce them.",
          "ទាំងនេះគឺជាប្រភពថាមពលដែលធ្លាប់មាននៅលើផែនដី ដែលផ្ដល់ឲ្យយើងដោយឥតគិតថ្លៃ ដោយពន្លឺព្រះអាទិត្យ ខ្យល់ ទឹក និងផែនដីខ្លួនឯង។ កិច្ចការតែមួយរបស់យើង គឺរៀនរបៀបប្រមូលផលវាដោយមិនបំផ្លាញប្រព័ន្ធដែលផលិតវា។"
        )}
      </p>

      {/* Solar — featured */}
      <div className="mb-4">
        <TechCard
          k={k}
          Icon={Sun}
          enName="Solar Power"
          khName="ថាមពលព្រះអាទិត្យ"
          enTag="photovoltaic · sunlight → electrons"
          khTag="ផូតូវ៉ុលតាអ៊ីក · ពន្លឺ → អេឡិចត្រុង"
          enHow="A photovoltaic (PV) cell is a slab of silicon engineered so that when a particle of light — a photon — slams into it, the photon's energy knocks an electron loose from a silicon atom. Wires on top of the cell catch those moving electrons and steer them into a circuit. That is electricity: trillions of photons per second turning into trillions of moving electrons. No moving parts, no fuel, no exhaust — just sunlight in, current out."
          khHow="កោសិកាផូតូវ៉ុលតាអ៊ីក (PV) គឺជាបន្ទះស៊ីលីកុនដែលត្រូវបានរចនា ដូច្នេះនៅពេលភាគល្អិតពន្លឺ — ហៅថាផូតុង — បុកលើវា ថាមពលរបស់ផូតុងរុញអេឡិចត្រុងឲ្យចេញពីអាតូមស៊ីលីកុន។ ខ្សែភ្ជាប់នៅខាងលើកោសិកាចាប់យកអេឡិចត្រុងដែលកំពុងផ្លាស់ទីទាំងនោះ ហើយនាំវាចូលក្នុងសៀគ្វី។ នោះគឺជាអគ្គិសនី ៖ ផូតុងរាប់ត្រីលានក្នុងមួយវិនាទី ប្រែជាអេឡិចត្រុងផ្លាស់ទីរាប់ត្រីលាន។ គ្មានគ្រឿងបន្លាស់ផ្លាស់ទី គ្មានឥន្ធនៈ គ្មានផ្សែង — មានតែពន្លឺចូល ចរន្តចេញ។"
          enExample="A typical rooftop solar panel converts roughly 18-22% of the sunlight that hits it into usable electricity — and silently, for 25+ years."
          khExample="បន្ទះថាមពលព្រះអាទិត្យលើដំបូលធម្មតា បំប្លែងពន្លឺប្រហែល ១៨–២២% ដែលប៉ះវា ឲ្យក្លាយជាអគ្គិសនីប្រើប្រាស់បាន — ដោយស្ងៀមស្ងាត់ អស់រយៈពេល ២៥ ឆ្នាំ ឬច្រើនជាងនេះ។"
          accent={GREEN}
          glow
        />
      </div>

      {/* Wind & Hydro pair */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <TechCard
          k={k}
          Icon={Wind}
          enName="Wind Power"
          khName="ថាមពលខ្យល់"
          enTag="moving air → spinning blades"
          khTag="ខ្យល់ផ្លាស់ទី → ស្លាបបង្វិល"
          enHow="A wind turbine is — at its heart — just an enormous fan running in reverse. Instead of using electricity to spin blades and push air, the wind pushes the blades and that motion spins a generator. The generator is a magnet rotating inside a coil of wire, which by the laws of electromagnetism forces electrons in the wire to flow. Wind in, electricity out."
          khHow="តួបែនខ្យល់ — នៅខ្លឹមសារ — គឺជាបង្ខាដ៏ធំមួយដែលដំណើរការបញ្ច្រាស។ ជំនួសឲ្យការប្រើអគ្គិសនីដើម្បីបង្វិលស្លាប និងរុញខ្យល់ ខ្យល់រុញស្លាប ហើយចលនានោះបង្វិលម៉ាស៊ីនភ្លើង។ ម៉ាស៊ីនភ្លើងគឺជាមេដែកដែលបង្វិលនៅខាងក្នុងរង្វង់ខ្សែ ដែលតាមច្បាប់នៃអេឡិចត្រូម៉ាញ៉េទិច បង្ខំអេឡិចត្រុងក្នុងខ្សែឲ្យហូរ។ ខ្យល់ចូល អគ្គិសនីចេញ។"
          accent={GREEN}
        />
        <TechCard
          k={k}
          Icon={Droplet}
          enName="Hydroelectric Power"
          khName="វារីអគ្គិសនី"
          enTag="gravity + falling water → turbine"
          khTag="ទំនាញ + ទឹកធ្លាក់ → តួបែន"
          enHow="A hydro dam holds back a river so that water collects high above the valley floor. When that water is released through pipes, gravity gives it tremendous speed. The fast water slams into the curved blades of a turbine and spins it — driving exactly the same kind of magnet-and-coil generator a wind turbine uses. The dam converts the gravitational pull on a lake into the electricity in your wall socket."
          khHow="ទំនប់វារីអគ្គិសនី រក្សាទន្លេមួយឲ្យទឹកប្រមូលផ្តុំខ្ពស់ពីលើតំបន់ជ្រលង។ ពេលទឹកនោះត្រូវបានបញ្ចេញតាមបំពង់ ទំនាញផែនដីផ្ដល់ឲ្យវានូវល្បឿនយ៉ាងខ្លាំង។ ទឹករហ័សបុកលើស្លាបកោងនៃតួបែន ហើយបង្វិលវា — ដំណើរការម៉ាស៊ីនភ្លើងមេដែក និងរង្វង់ខ្សែដូចគ្នានឹងតួបែនខ្យល់។ ទំនប់បំប្លែងទំនាញលើបឹងមួយ ទៅជាអគ្គិសនីនៅក្នុងព្រីសជញ្ជាំងរបស់អ្នក។"
          enExample="The Lower Sesan 2 Dam in Stung Treng province is Cambodia's largest hydro project — generating up to 400 MW from the waters of the Mekong basin."
          khExample="ទំនប់វារីអគ្គិសនី សេសានក្រោម ២ នៅខេត្តស្ទឹងត្រែង គឺជាគម្រោងវារីអគ្គិសនីធំជាងគេរបស់កម្ពុជា — ផលិតបានដល់ ៤០០ ម៉េហ្គាវ៉ាត់ ពីទឹកនៃអាងទន្លេមេគង្គ។"
          accent={GREEN}
        />
      </div>

      {/* Geothermal & Tidal pair */}
      <div className="grid md:grid-cols-2 gap-4">
        <TechCard
          k={k}
          Icon={Mountain}
          enName="Geothermal Power"
          khName="កម្ដៅផែនដី"
          enTag="Earth's magma heat → steam"
          khTag="កម្ដៅមាក់ម៉ា → ចំហាយ"
          enHow="The Earth's core is a furnace of molten rock kept hot by the slow decay of radioactive elements deep underground. In some places — Iceland, Indonesia, the Philippines — that heat comes close enough to the surface that we can drill a well, pump water down, let the magma boil it into steam, and use that steam to spin yet another turbine. The fuel here is the planet itself."
          khHow="ស្នូលនៃផែនដី គឺជាឡភ្លើងដ៏ធំនៃថ្មរលាយ ដែលត្រូវបានរក្សាក្ដៅដោយការវិនាសយឺតៗនៃធាតុរ៉ាដូអាក់ទីវ្នៅជ្រៅក្រោមដី។ នៅកន្លែងខ្លះ — អ៊ីស្លង់ ឥណ្ឌូនេស៊ី ហ្វីលីពីន — កម្ដៅនោះមកជិតផ្ទៃដីគ្រប់គ្រាន់ ដែលយើងអាចជីករណ្ដៅមួយ បូមទឹកចុះ ឲ្យមាក់ម៉ាដាំវាជាចំហាយ ហើយប្រើចំហាយនោះដើម្បីបង្វិលតួបែនមួយទៀត។ ឥន្ធនៈនៅទីនេះ គឺជាផែនដីខ្លួនឯង។"
          accent={GREEN}
        />
        <TechCard
          k={k}
          Icon={Moon}
          enName="Tidal Power"
          khName="រលកសមុទ្រ"
          enTag="Moon's gravity → ocean turbines"
          khTag="ទំនាញព្រះច័ន្ទ → តួបែនសមុទ្រ"
          enHow="Twice every day the Moon's gravity pulls a hump of seawater across our oceans — that is the tide. By placing turbines underwater in narrow coastal channels, we let the rising and falling tide push huge volumes of water back and forth across the blades. We are, quite literally, plugging into the gravitational link between Earth and Moon and skimming a small share of its energy."
          khHow="ពីរដងជារៀងរាល់ថ្ងៃ ទំនាញព្រះច័ន្ទទាញកំពូលទឹកសមុទ្រឆ្លងកាត់មហាសមុទ្ររបស់យើង — នោះគឺរលកលិច។ ដោយដាក់តួបែននៅក្រោមទឹកក្នុងច្រកឆ្នេរតូចចង្អៀត យើងឲ្យរលកឡើង និងធ្លាក់រុញបរិមាណទឹកដ៏ច្រើនទៅមកលើស្លាប។ យើងពិតជាកំពុងភ្ជាប់ចូលទៅក្នុងតំណទំនាញរវាងផែនដី និងព្រះច័ន្ទ ហើយកាប់យកចំណែកតូចមួយនៃថាមពលរបស់វា។"
          accent={GREEN}
        />
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — The Atomic Engine
// ════════════════════════════════════════════════════════════════════════════

function SectionAtomic({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-atomic">
      <SectionHeader
        spec="02"
        en="The Atomic Engine"
        kh="ម៉ាស៊ីនបរមាណូ"
        k={k}
        Icon={AtomIcon}
        accent={NEON}
      />

      {/* Disclaimer */}
      <div
        className="rounded-xl p-4 mb-5 border-2 flex items-start gap-3 bg-white"
        style={{ borderColor: `${NEON}66` }}
        data-testid="atomic-disclaimer"
      >
        <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: NEON_DEEP }} />
        <p className={`text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          <strong className={k ? "" : "font-bold"} style={{ color: NEON_DEEP }}>
            {t("A note on \u201Crenewable.\u201D ", "កំណត់ចំណាំ អំពីពាក្យ «កកើតឡើងវិញ»។ ")}
          </strong>
          {t(
            "Strictly speaking, atomic energy is not renewable — it consumes a fuel (uranium or thorium) that must be mined. But it produces virtually no carbon dioxide, runs day and night through every season, and per kilogram releases millions of times more energy than any chemical fuel. Any honest plan for the climate has to discuss it.",
            "តាមនិយមន័យ ថាមពលបរមាណូមិនមែនជាថាមពលកកើតឡើងវិញទេ — វាប្រើឥន្ធនៈ (អ៊ុយរ៉ាញ៉ូម ឬថូរីយ៉ូម) ដែលត្រូវធ្វើរ៉ែ។ ប៉ុន្តែវាពិតជាមិនបញ្ចេញកាបូនឌីអុកស៊ីតទេ ដំណើរការទាំងថ្ងៃ និងយប់គ្រប់រដូវ ហើយក្នុងមួយគីឡូក្រាម បញ្ចេញថាមពលច្រើនជាងឥន្ធនៈគីមីណាមួយរាប់លានដង។ ផែនការស្មោះត្រង់ណាមួយសម្រាប់អាកាសធាតុ ត្រូវតែពិភាក្សាអំពីវា។"
          )}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <TechCard
          k={k}
          Icon={Radiation}
          enName="Nuclear Fission"
          khName="ប្រតិកម្មបំបែកនុយក្លេអ៊ែរ"
          enTag="splitting heavy uranium atoms"
          khTag="បំបែកអាតូមអ៊ុយរ៉ាញ៉ូមធ្ងន់"
          enHow="A nucleus of Uranium-235 is so big that it is barely holding itself together. When a slow neutron taps it, the nucleus splits in two — releasing more neutrons (which split more uranium nuclei) and a vast burst of heat. That heat boils water into steam; the steam spins a turbine; the turbine spins a generator. One kilogram of uranium releases roughly 2-3 million times more energy than one kilogram of coal."
          khHow="ស្នូលអាតូមអ៊ុយរ៉ាញ៉ូម-២៣៥ មានទំហំធំខ្លាំង រហូតដល់វាសឹងតែមិនអាចទប់ខ្លួនវាបានទេ។ ពេលនុយត្រុងយឺតមួយប៉ះវា ស្នូលបែកជាពីរ — បញ្ចេញនុយត្រុងបន្ថែម (ដែលបំបែកស្នូលអ៊ុយរ៉ាញ៉ូមផ្សេងទៀត) និងចំនួនកម្ដៅយ៉ាងច្រើន។ កម្ដៅនោះដាំទឹកជាចំហាយ ចំហាយបង្វិលតួបែន តួបែនបង្វិលម៉ាស៊ីនភ្លើង។ អ៊ុយរ៉ាញ៉ូម ១ គីឡូក្រាម បញ្ចេញថាមពលច្រើនជាងធ្យូងថ្ម ១ គីឡូក្រាម ប្រហែល ២–៣ លានដង។"
          enExample="A single fuel pellet the size of a fingertip can produce as much electricity as a tonne of coal — and most of the world's nuclear plants have run safely for decades."
          khExample="គ្រាប់ឥន្ធនៈតែមួយមានទំហំខ្នាតចុងម្រាមដៃ អាចផលិតអគ្គិសនីបានប៉ុនធ្យូងថ្ម ១ តោន — ហើយរោងចក្រនុយក្លេអ៊ែរភាគច្រើនលើពិភពលោកបានដំណើរការប្រកបដោយសុវត្ថិភាពអស់រយៈពេលជាច្រើនទសវត្សរ៍មកហើយ។"
          accent={NEON}
          glow
          badge={{ en: "Zero-CO₂", kh: "សូន្យ CO₂" }}
        />

        <TechCard
          k={k}
          Icon={CircleDot}
          enName="The Thorium Fuel Cycle"
          khName="វដ្តឥន្ធនៈថូរីយ៉ូម"
          enTag="safer · greener · molten salt"
          khTag="សុវត្ថិភាព · ស្អាត · អំបិលរលាយ"
          enHow="Thorium is a different heavy element — about three times more abundant in the Earth's crust than uranium. Inside a properly designed reactor (often a molten-salt reactor), thorium is gradually converted into a fissile fuel and split. Crucially, this kind of reactor is built so that if anything goes wrong, the fuel simply drains and cools by itself — it physically cannot melt down. It also produces dramatically less long-lived radioactive waste than today's uranium plants."
          khHow="ថូរីយ៉ូម គឺជាធាតុធ្ងន់មួយផ្សេង — មានច្រើនជាងអ៊ុយរ៉ាញ៉ូមនៅក្នុងសំបកផែនដី ប្រហែល ៣ ដង។ នៅខាងក្នុងម៉ាស៊ីនបន្តពូជដែលរចនាបានត្រឹមត្រូវ (ច្រើនតែម៉ាស៊ីនបន្តពូជអំបិលរលាយ) ថូរីយ៉ូមត្រូវបានបំប្លែងបន្តិចម្ដងៗ ទៅជាឥន្ធនៈអាចបំបែកបាន ហើយត្រូវបានបំបែក។ ជាសំខាន់ ម៉ាស៊ីនបន្តពូជប្រភេទនេះ ត្រូវបានសាងសង់ដូច្នេះ ប្រសិនបើមានបញ្ហា ឥន្ធនៈគ្រាន់តែហូរចេញ និងត្រជាក់ដោយខ្លួនឯង — វាពិតជាមិនអាចរលាយធ្លាក់ចុះបានទេ។ វាក៏បញ្ចេញកាកសំណល់រ៉ាដូអាក់ទីវ្ដែលរស់នៅយូរ តិចជាងរោងចក្រអ៊ុយរ៉ាញ៉ូមសព្វថ្ងៃ យ៉ាងច្រើន។"
          enExample="India and China are racing to build the world's first commercial thorium reactors — partly because both countries hold enormous natural reserves of the element."
          khExample="ឥណ្ឌា និងចិនកំពុងប្រណាំងប្រជែងគ្នាសាងសង់ម៉ាស៊ីនបន្តពូជថូរីយ៉ូមពាណិជ្ជកម្មដំបូងគេលើពិភពលោក — ដោយផ្នែកមួយ ពីព្រោះប្រទេសទាំងពីរមានទុនបម្រុងធម្មជាតិដ៏ច្រើននៃធាតុនេះ។"
          accent={NEON}
          badge={{ en: "Cannot melt down", kh: "មិនអាចរលាយ" }}
        />
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — Micro & Frugal Power
// ════════════════════════════════════════════════════════════════════════════

function SectionFrugal({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-frugal">
      <SectionHeader
        spec="03"
        en="Micro & Frugal Power"
        kh="ថាមពលខ្នាតតូច"
        k={k}
        Icon={Battery}
        accent={AMBER}
      />

      <p className={`text-sm text-slate-700 mb-5 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "Not every solution needs to be a giant power plant. The most clever engineers ask: \u201Cwhat energy is already being wasted around us — and how can we catch a little of it?\u201D",
          "មិនមែនរាល់ដំណោះស្រាយត្រូវជារោងចក្រថាមពលដ៏ធំទេ។ វិស្វករឆ្លាតវៃជាងគេសួរ ៖ «តើថាមពលអ្វីខ្លះដែលកំពុងត្រូវបានខ្ជះខ្ជាយជុំវិញយើង — ហើយតើយើងអាចចាប់យកបន្តិចបន្តួចនៃវាបានយ៉ាងដូចម្ដេច?»"
        )}
      </p>

      <TechCard
        k={k}
        Icon={Footprints}
        enName="Piezoelectric Power"
        khName="ថាមពលពីសម្ពាធ"
        enTag="pressure · mechanical stress → electricity"
        khTag="សម្ពាធ · សម្ពាធយន្តកម្ម → អគ្គិសនី"
        enHow="Certain crystals — quartz being the most famous — have a strange property: when you squeeze them, the structure of the crystal pushes its positive and negative charges very slightly apart, producing a tiny voltage. Squeeze harder, get more voltage. This is the piezoelectric effect. By the millions, those tiny voltages add up to genuine, useful electricity."
        khHow="គ្រីស្តាល់មួយចំនួន — គួរ្តហ្ស៍ ល្បីបំផុត — មានលក្ខណៈពិសេស ៖ ពេលអ្នកច្របាច់វា រចនាសម្ព័ន្ធនៃគ្រីស្តាល់រុញបន្ទុកវិជ្ជមាន និងអវិជ្ជមានរបស់វាបន្តិចបន្តួច ដែលផលិតវ៉ុលតិចតួច។ ច្របាច់ខ្លាំងជាងនេះ បានវ៉ុលច្រើនជាងនេះ។ នេះគឺជាបាតុភូតប៊ីយ៉េហ្សូអេឡិចត្រិក។ វ៉ុលតូចៗរាប់លានទាំងនោះ ប្រមូលផ្តុំគ្នា ទៅជាអគ្គិសនីពិតប្រាកដ និងមានប្រយោជន៍។"
        enExample="In Tokyo and London, busy train-station floor tiles are built with piezoelectric crystals underneath. Every footstep flexes the tile a fraction of a millimetre — and a single station can generate enough electricity to power its own ticket gates and lighting. The crowd literally pays its own electric bill."
        khExample="នៅទីក្រុងតូក្យូ និងឡុងដ៍ ក្រឡាក្រាលឥដ្ឋនៅស្ថានីយរថភ្លើងមមាញឹក ត្រូវបានសាងសង់ដោយមានគ្រីស្តាល់ប៊ីយ៉េហ្សូអេឡិចត្រិកនៅខាងក្រោម។ រាល់ជំហានជើងពត់ក្រឡា ប៉ុនចំណែកនៃមីលីម៉ែត្រ — ហើយស្ថានីយតែមួយ អាចផលិតអគ្គិសនីគ្រប់គ្រាន់ដើម្បីផ្ដល់ថាមពលដល់ច្រកសំបុត្រ និងពន្លឺផ្ទាល់ខ្លួនរបស់វា។ ហ្វូងមនុស្សពិតជាបង់ថ្លៃវិក្កយបត្រអគ្គិសនីផ្ទាល់ខ្លួន។"
        accent={AMBER}
        glow
        badge={{ en: "Step-powered", kh: "បើកដោយជំហាន" }}
      />
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 04 — The Speculative Frontier
// ════════════════════════════════════════════════════════════════════════════

function SectionFrontier({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-2" data-testid="section-frontier">
      <SectionHeader
        spec="04"
        en="The Speculative Frontier"
        kh="បច្ចេកវិទ្យាអនាគត"
        k={k}
        Icon={Telescope}
        accent={VIOLET}
      />

      <p className={`text-sm text-slate-700 mb-5 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "These ideas range from \u201Calmost there\u201D to \u201Cmaybe never.\u201D They are worth knowing because the way scientists test, debate, and sometimes reject them is exactly how knowledge actually advances.",
          "គំនិតទាំងនេះមានចាប់ពី «ស្ទើរតែបានហើយ» ដល់ «ប្រហែលមិនដែលបាន»។ វាសមនឹងស្គាល់ ព្រោះរបៀបដែលអ្នកវិទ្យាសាស្ត្របង្ហាញ ជជែក និងពេលខ្លះបដិសេធវា គឺពិតជារបៀបដែលចំណេះដឹងវិវត្តន៍ឡើងពិតប្រាកដ។"
        )}
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Hot fusion */}
        <TechCard
          k={k}
          Icon={Flame}
          enName="Hot Fusion"
          khName="ប្រតិកម្មរលាយនុយក្លេអ៊ែរ"
          enTag="a star in a magnetic bottle"
          khTag="ផ្កាយក្នុងដបមេដែក"
          enHow="Fusion is the opposite of fission: instead of splitting heavy atoms, you smash light hydrogen atoms together so hard that they fuse into helium — releasing huge amounts of energy. This is the same reaction that powers the Sun. The trick on Earth is that you have to heat the hydrogen to more than 100 million °C — hotter than the Sun's core — and hold it suspended in a chamber using powerful magnetic fields, because at that temperature it would vaporise any container. It is the holy grail of clean energy."
          khHow="ប្រតិកម្មរលាយ គឺផ្ទុយពីប្រតិកម្មបំបែក ៖ ជំនួសឲ្យការបំបែកអាតូមធ្ងន់ អ្នកបុកអាតូមអ៊ីដ្រូសែនស្រាលៗបញ្ចូលគ្នាខ្លាំងណាស់ ដើម្បីឲ្យពួកវារលាយចូលគ្នាជាហេលីយ៉ូម — បញ្ចេញថាមពលច្រើនយ៉ាងគួរឲ្យភ្ញាក់ផ្អើល។ នេះគឺជាប្រតិកម្មដូចគ្នានឹងអ្វីដែលផ្ដល់ថាមពលដល់ព្រះអាទិត្យ។ ល្បិចនៅលើផែនដី គឺថាអ្នកត្រូវកម្ដៅអ៊ីដ្រូសែនឲ្យលើសពី ១០០ លានអង្សាសេ — ក្ដៅជាងស្នូលព្រះអាទិត្យ — ហើយទុកវានៅព្យួរក្នុងបន្ទប់ដោយប្រើដែនមេដែកដ៏មានឥទ្ធិពល ព្រោះនៅសីតុណ្ហភាពនោះ វានឹងហួតផុតរាល់ធុងដាក់។ វាគឺជាក្តីសុបិន្តដ៏ល្អបំផុតនៃថាមពលស្អាត។"
          enExample="In 2022 the U.S. National Ignition Facility briefly produced more fusion energy than the lasers fed in — the first ever \u201Cnet-positive\u201D fusion experiment. Commercial reactors are still believed to be 20-30 years away."
          khExample="ក្នុងឆ្នាំ ២០២២ មជ្ឈមណ្ឌលបំភ្លឺជាតិសហរដ្ឋអាមេរិក បានផលិតថាមពលរលាយមួយរយៈខ្លី ច្រើនជាងឡាស៊ែរបានបញ្ចូល — ជាការពិសោធន៍រលាយ «ផលវិជ្ជមានសុទ្ធ» លើកដំបូងគេ។ ម៉ាស៊ីនបន្តពូជពាណិជ្ជកម្មនៅតែគ្រាន់តែសមាទានថា នៅឆ្ងាយ ២០–៣០ ឆ្នាំទៀត។"
          accent={VIOLET}
          glow
          badge={{ en: "Holy grail", kh: "ក្តីសុបិន្តដ៏ល្អ" }}
        />

        {/* Cold fusion */}
        <TechCard
          k={k}
          Icon={Snowflake}
          enName="Cold Fusion / LENR"
          khName="រលាយនុយក្លេអ៊ែរត្រជាក់"
          enTag="room-temperature fusion (?)"
          khTag="ប្រតិកម្មរលាយក្នុងសីតុណ្ហភាពបន្ទប់ (?)"
          enHow="In 1989 two chemists announced they had achieved nuclear fusion at room temperature in a simple jar of water — a result that, if real, would have rewritten physics. Other laboratories rushed to repeat the experiment and almost universally failed. Today the broader claim is considered debunked, though a niche field called Low-Energy Nuclear Reactions (LENR) continues to investigate softer versions of the idea."
          khHow="នៅឆ្នាំ ១៩៨៩ អ្នកគីមីពីរនាក់បានប្រកាសថា ពួកគេបានសម្រេចប្រតិកម្មរលាយនុយក្លេអ៊ែរ ក្នុងសីតុណ្ហភាពបន្ទប់ ក្នុងចានទឹកធម្មតា — លទ្ធផលដែលបើពិត នឹងបានសរសេរឡើងវិញរូបវិទ្យា។ មន្ទីរពិសោធន៍ផ្សេងទៀតបានប្រញាប់ប្រញាល់ធ្វើពិសោធន៍នោះម្តងទៀត ហើយស្ទើរតែទាំងអស់បរាជ័យ។ សព្វថ្ងៃ ការអះអាងដ៏ធំជាងគេនេះត្រូវបានចាត់ទុកថាបានបដិសេធ ទោះបីជាវិស័យមួយតូចហៅថា ប្រតិកម្មនុយក្លេអ៊ែរថាមពលទាប (LENR) នៅតែបន្តស៊ើបអង្កេតលើការបកស្រាយទន់ៗនៃគំនិតនេះ។"
          enExample="The cold-fusion saga is one of the great teaching cases in science: a real claim is only real once independent labs can repeat it. Until then, exciting is not the same as true."
          khExample="រឿងរ៉ាវនៃប្រតិកម្មរលាយត្រជាក់ គឺជាករណីបង្រៀនដ៏ធំមួយក្នុងវិទ្យាសាស្ត្រ ៖ ការអះអាងពិតជាពិត លុះត្រាតែមន្ទីរពិសោធន៍ឯករាជ្យអាចធ្វើវាម្តងទៀតបាន។ រហូតដល់ពេលនោះ «គួរឲ្យរំភើប» មិនមែនមានន័យដូច «ពិត» ទេ។"
          accent={VIOLET}
          badge={{ en: "Mostly debunked", kh: "ភាគច្រើនបានបដិសេធ" }}
        />

        {/* Space-based solar */}
        <TechCard
          k={k}
          Icon={Satellite}
          enName="Space-Based Solar"
          khName="ថាមពលព្រះអាទិត្យពីអវកាស"
          enTag="orbital panels · microwave beam"
          khTag="បន្ទះក្នុងគន្លង · ធ្នូមីក្រូវ៉េវ"
          enHow="A satellite in geostationary orbit sees sunlight 24 hours a day — no clouds, no nights, no atmosphere weakening it. The plan is to build vast solar farms in space, convert the electricity into focused microwaves, and beam them down to large receiver antennas on Earth, where they are turned back into ordinary electricity. It would deliver clean power around the clock to anywhere on the planet."
          khHow="ផ្កាយរណបនៅគន្លងនឹងផែនដី មើលឃើញពន្លឺព្រះអាទិត្យ ២៤ ម៉ោងក្នុងមួយថ្ងៃ — គ្មានពពក គ្មានយប់ គ្មានបរិយាកាសធ្វើឲ្យវាចុះខ្សោយ។ ផែនការគឺសាងសង់កសិដ្ឋានព្រះអាទិត្យដ៏ធំក្នុងអវកាស បំប្លែងអគ្គិសនីទៅជាមីក្រូវ៉េវផ្ដោត ហើយផ្ញើពួកវាមកចាន្ទទទួលដ៏ធំនៅលើផែនដី ដែលត្រូវបានបំប្លែងត្រឡប់ជាអគ្គិសនីធម្មតា។ វានឹងផ្ដល់ថាមពលស្អាតគ្រប់ពេលវេលា ទៅគ្រប់កន្លែងលើភពនេះ។"
          enExample="China, Japan, and the U.S. all have active research programmes aiming for the first orbital solar demonstrations within the next decade."
          khExample="ចិន ជប៉ុន និងសហរដ្ឋអាមេរិក សុទ្ធតែមានកម្មវិធីស្រាវជ្រាវសកម្ម ដែលគោលដៅសម្រាប់ការបង្ហាញព្រះអាទិត្យក្នុងគន្លងលើកដំបូង ក្នុងរយៈពេលមួយទសវត្សរ៍ខាងមុខ។"
          accent={VIOLET}
          badge={{ en: "24/7 sunlight", kh: "ថ្ងៃ ២៤ ម៉ោង" }}
        />
      </div>

      {/* Frontier quote */}
      <blockquote
        className={`relative mt-6 pl-5 border-l-4 italic text-slate-700 ${k ? "font-khmer not-italic leading-loose" : "leading-relaxed"}`}
        style={{ borderColor: VIOLET }}
      >
        <Quote
          className="absolute -left-3 -top-1 w-4 h-4 bg-[#f8fafc]"
          style={{ color: VIOLET }}
          aria-hidden="true"
        />
        <span className="text-base">
          {t(
            "\u201CThe stone age did not end because we ran out of stones — it ended because we found something better.\u201D",
            "«សម័យថ្មមិនបានបញ្ចប់ ព្រោះយើងអស់ថ្មទេ — វាបានបញ្ចប់ ព្រោះយើងបានរកឃើញអ្វីដែលប្រសើរជាង។»"
          )}
        </span>
        <span className={`block mt-1 text-xs not-italic text-slate-500 ${k ? "font-khmer" : ""}`}>
          — {t("Often attributed to Sheikh Ahmed Zaki Yamani", "ច្រើនតែសន្មតថានិពន្ធដោយ ស៊ីក អាម៉េដ ហ្សាគី យ៉ាម៉ានី")}
        </span>
      </blockquote>
    </section>
  );
}
