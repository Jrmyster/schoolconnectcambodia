import { useState, useEffect, useId, useRef, useMemo } from "react";
import {
  Fuel,
  Droplet,
  Flame,
  Mountain,
  Clock,
  Zap,
  Cog,
  TrendingUp,
  AlertTriangle,
  Factory,
  Truck,
  Layers,
  Gauge,
  Sparkles,
  Globe2,
  Play,
  Pause,
  RotateCcw,
  Construction,
  ArrowDown,
  Thermometer,
  Heart,
  Route,
  Hammer,
  Disc3,
  Trees,
  FlaskConical,
  Snowflake,
  Sun,
  Ruler,
  CalendarClock,
  CloudRain,
  ShieldAlert,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Fossil Fuels: Ancient Energy — ប្រេងឥន្ធនៈហ្វូស៊ីល៖ ថាមពលបុរាណ
//
//    1. Formation & scarcity   — burial animation + global reserve countdown
//    2. Fractional distillation — vertical refinery tower
//    3. Internal combustion     — interactive 4-stroke piston
//    4. Economics               — gasoline price breakdown
//
//  Aesthetic: industrial dark grays, amber highlights for crude oil, blue
//  flames. All technical terms bilingual (English + Khmer).
// ════════════════════════════════════════════════════════════════════════════

export default function FossilFuelsPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 text-stone-100 relative overflow-hidden">
      <ScopedStyles />
      <IndustrialBg />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/40 text-amber-300 rounded-full px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest">
          <Fuel className="w-3.5 h-3.5" />
          {isKh ? "មេរៀនពិសេស · ភូគព្ភវិទ្យា" : "Major Lesson · Earth Science"}
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-stone-50 mb-4 leading-tight ${
            isKh ? "font-khmer leading-loose" : ""
          }`}
        >
          {isKh ? (
            <>ប្រេងឥន្ធនៈហ្វូស៊ីល៖ <span className="ff-text-flame">ថាមពលបុរាណ</span></>
          ) : (
            <>Fossil Fuels: <span className="ff-text-flame">Ancient Energy</span></>
          )}
        </h1>
        <p
          className={`text-stone-300 max-w-2xl text-base ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "រាល់ដងដែលអ្នកជិះម៉ូតូ ឬឡានទៅសាលា អ្នកកំពុងដុតថាមពលដែលបានស្តុកទុករយៈពេល ៣០០ លានឆ្នាំ។ យើងនឹងតាមដានវាពីផ្នែករុក្ខជាតិ និងសត្វរស់នៅសមុទ្របុរាណ ឆ្លងកាត់ ស្ថានីយចម្រាញ់ ចូលក្នុងស៊ីឡាំងម៉ាស៊ីន និងចេញមកជាតម្លៃនៅស្ថានីយប្រេងសាំង។"
            : "Every time you ride a moto or a car to school, you're burning energy that took 300 million years to store. We're going to follow it from ancient sea-life, through a refinery tower, into the cylinder of an engine, and out as the price you pay at the pump."}
        </p>
        <div className="hidden sm:flex absolute top-12 right-8 items-center gap-3 text-amber-500/30 select-none">
          <Droplet className="w-7 h-7 ff-float" style={{ animationDelay: "0s" }} />
          <Flame className="w-7 h-7 ff-float text-blue-400/40" style={{ animationDelay: "0.6s" }} />
          <Cog className="w-7 h-7 ff-float ff-spin-slow" style={{ animationDelay: "1.2s" }} />
        </div>
      </header>

      {/* ── 1. Formation & scarcity ───────────────────────────────── */}
      <Section
        id="formation"
        eyebrowEn="01 · Geology"
        eyebrowKh="០១ · ភូគព្ភវិទ្យា"
        titleEn="Formation — 300 million years in the dark"
        titleKh="ការបង្កើត — ៣០០ លានឆ្នាំក្នុងភាពងងឹត"
        descEn="Fossil fuels aren't 'made' in a factory. They started as plankton, algae and tiny sea-creatures. When they died they sank into mud, were buried under more mud, then more rock. Heat + pressure + time slowly cooked the carbon into the oil and gas we drill today."
        descKh={"ប្រេងឥន្ធនៈហ្វូស៊ីលមិនត្រូវបាន “ផលិត” នៅក្នុងរោងចក្រទេ។ វាបានចាប់ផ្ដើមជាប្លង់តុង សារាយ និងសត្វសមុទ្រតូចៗ។ នៅពេលពួកវាស្លាប់ ពួកវាបានធ្លាក់ចូលទៅក្នុងភក់ ត្រូវបានកប់នៅក្រោមភក់បន្ថែម បន្ទាប់មកថ្មបន្ថែម។ កំដៅ + សម្ពាធ + ពេលវេលា បានចម្អិនកាបោនយឺតៗឲ្យក្លាយជាប្រេង និងហ្គាសដែលយើងជីករកសព្វថ្ងៃ។"}
        isKh={isKh}
      >
        <FormationAnimation isKh={isKh} />
        <ReserveCountdown isKh={isKh} />
      </Section>

      {/* ── 2. Fractional distillation ────────────────────────────── */}
      <Section
        id="distillation"
        eyebrowEn="02 · Chemistry of separation"
        eyebrowKh="០២ · គីមីនៃការបំបែក"
        titleEn="Fractional distillation — one oil, six products"
        titleKh="ការចម្រាញ់ដាច់ដោយផ្នែក — ប្រេងមួយ ផលិតផលប្រាំមួយ"
        descEn="Crude oil is a soup of hundreds of different hydrocarbon chains, each with its own boiling point. Heat the soup, let the vapours rise, and at every level of the tower a different molecule turns back into liquid — and is tapped off."
        descKh="ប្រេងឆៅគឺជាល្បាយនៃខ្សែកាបូនអ៊ីដ្រូកាបោនរាប់រយខុសៗគ្នា ដែលនីមួយៗមានចំណុចរំពុះផ្ទាល់របស់វា។ ដុតល្បាយ ទុកឲ្យចំហាយឡើងលើ ហើយនៅរាល់កម្រិតនៃប៉ម ម៉ូលេគុលផ្សេងៗគ្នាប្រែជាវត្ថុរាវឡើងវិញ — ហើយត្រូវបានដក។"
        isKh={isKh}
      >
        <DistillationTower isKh={isKh} />
      </Section>

      {/* ── 3. Internal combustion engine ─────────────────────────── */}
      <Section
        id="combustion"
        eyebrowEn="03 · Physics of the explosion"
        eyebrowKh="០៣ · ហ្វីស៊ីកនៃការផ្ទុះ"
        titleEn="Internal combustion — the four-stroke cycle"
        titleKh="ការដុតផ្ទៃក្នុង — វដ្តបួនជំហាន"
        descEn="A petrol engine repeats the same four moves a thousand times a minute: suck in fuel + air, squeeze it small, light it, push the leftovers out. The 'explosion' on stroke three is what shoves the piston down and ultimately turns your wheels."
        descKh={"ម៉ាស៊ីនប្រេងសាំងធ្វើចលនាដូចគ្នាបួនយ៉ាងម្ដងហើយម្ដងទៀតរាប់ពាន់ដងក្នុងមួយនាទី៖ ស្រូបឥន្ធនៈ + អុកស៊ីសែន ច្របាច់វាឲ្យតូច បំភ្លឺវា រុញសំណល់ចេញ។ “ការផ្ទុះ” នៅជំហានទីបី ជាអ្វីដែលរុញស៊ីឡាំងចុះក្រោម ហើយចុងក្រោយបង្វិលកង់របស់អ្នក។"}
        isKh={isKh}
      >
        <PistonAnimation isKh={isKh} />
        <OxidationNote isKh={isKh} />
      </Section>

      {/* ── 4. Economics ──────────────────────────────────────────── */}
      <Section
        id="pump-economics"
        eyebrowEn="04 · Economics"
        eyebrowKh="០៤ · សេដ្ឋកិច្ច"
        titleEn="What you actually pay for at the pump"
        titleKh="អ្វីដែលអ្នកពិតជាបង់ប្រាក់នៅស្ថានីយប្រេង"
        descEn="When you hand over 5,000 riel for a litre of petrol in Phnom Penh, that money splits between four big buckets — and not all of them stay in Cambodia."
        descKh="នៅពេលអ្នកប្រគល់ ៥.០០០ រៀលសម្រាប់ប្រេងសាំងមួយលីត្រនៅភ្នំពេញ ប្រាក់នោះត្រូវបានបែងចែកទៅជាបួនធុង — ហើយមិនមែនទាំងអស់នៅក្នុងកម្ពុជាទេ។"
        isKh={isKh}
      >
        <PriceBreakdown isKh={isKh} />
      </Section>

      {/* ── 5. Asphalt: the world's glue ──────────────────────────── */}
      <Section
        id="asphalt"
        eyebrowEn="05 · Civil Engineering"
        eyebrowKh="០៥ · វិស្វកម្មសំណង់ស៊ីវិល"
        titleEn="Asphalt: The World's Glue"
        titleKh="អាស្វាល់៖ កាវរបស់ពិភពលោក"
        descEn="Look back at the distillation tower — at the very bottom, hotter than every other product, sits the heaviest residue: bitumen. We don't burn it. We mix it with stone and pour it across the planet to make 64 million kilometres of road. This is ancient sunlight in its most solid form."
        descKh="មើលត្រឡប់ទៅប៉មចម្រាញ់វិញ — នៅបាតបង្អស់ ក្ដៅជាងផលិតផលផ្សេងទៀតទាំងអស់ មានសំណល់ដ៏ធ្ងន់៖ ប៊ីទុយម៉ែន។ យើងមិនដុតវាទេ។ យើងលាយវាជាមួយថ្ម ហើយចាក់នៅទូទាំងផែនដី បង្កើតផ្លូវប្រវែង ៦៤ លានគីឡូម៉ែត្រ។ នេះគឺជាពន្លឺថ្ងៃបុរាណក្នុងទម្រង់រឹងបំផុតរបស់វា។"
        isKh={isKh}
      >
        <AsphaltOrigin isKh={isKh} />
        <AsphaltRecipe isKh={isKh} />
        <RoadwayDashboard isKh={isKh} />
      </Section>

      {/* ── 6. Rubber & Tires ─────────────────────────────────────── */}
      <Section
        id="rubber-tires"
        eyebrowEn="06 · Materials Science"
        eyebrowKh="០៦ · វិទ្យាសាស្ត្រសម្ភារៈ"
        titleEn="Rubber & Tires: The Fossil Fuel You Drive On"
        titleKh="កៅស៊ូ និងសំបកកង់៖ ឥន្ធនៈហ្វូស៊ីលដែលអ្នកបើកបរលើ"
        descEn="The four black circles under every car and moto are quietly one of the most important pieces of chemistry on the planet. Half of every modern tire is grown on a tree in Cambodia or Vietnam — the other half is squeezed out of crude oil in a factory. Then both halves are 'baked' with sulfur until they become tougher than steel for their weight."
        descKh="រង្វង់ខ្មៅទាំងបួនក្រោមឡាន និងម៉ូតូគ្រប់គ្រឿង គឺជាគីមីដ៏សំខាន់បំផុតមួយនៅលើភពផែនដី។ ពាក់កណ្ដាលនៃសំបកកង់ទំនើបនីមួយៗ ដាំដុះនៅលើដើមឈើនៅកម្ពុជា ឬវៀតណាម — ពាក់កណ្ដាលទៀតត្រូវបានច្របាច់ចេញពីប្រេងឆៅនៅរោងចក្រ។ បន្ទាប់មកពាក់កណ្ដាលទាំងពីរត្រូវបានដុតកម្ដៅជាមួយស្ពាន់ធ័រ រហូតដល់វារឹងមាំជាងដែកសម្រាប់ទម្ងន់របស់វា។"
        isKh={isKh}
      >
        <RubberTypesCard isKh={isKh} />
        <VulcanizationCard isKh={isKh} />
        <TireAnatomyCard isKh={isKh} />
        <TireSafetyCard isKh={isKh} />
      </Section>

      {/* ── Closing ─────────────────────────────────────────────── */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 text-center text-stone-400 text-sm italic">
        <span className={isKh ? "font-khmer not-italic" : ""}>
          {isKh
            ? "“Stone Age មិនបានបញ្ចប់ដោយសារយើងអស់ដុំថ្មទេ ហើយយុគសម័យប្រេងនឹងបញ្ចប់មុនពេលយើងអស់ប្រេង។” — Ahmed Zaki Yamani"
            : "“The Stone Age did not end because we ran out of stones, and the Oil Age will end long before we run out of oil.” — Ahmed Zaki Yamani"}
        </span>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Layout helpers
// ════════════════════════════════════════════════════════════════════════════

function Section({
  id, eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  id?: string;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
      <div className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-400/90 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
        <Sparkles className="w-3 h-3" />
        {isKh ? eyebrowKh : eyebrowEn}
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-stone-50 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-stone-300 text-sm max-w-3xl mb-6 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function SteelCard({
  children,
  className = "",
  ...rest
}: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={`bg-stone-800/80 backdrop-blur-sm rounded-xl border border-stone-700 shadow-[0_2px_24px_-12px_rgba(245,158,11,0.18)] ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeader({
  icon: Icon, titleEn, titleKh, isKh,
}: {
  icon: typeof Fuel;
  titleEn: string; titleKh: string; isKh: boolean;
}) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className={`font-display font-bold text-xl text-stone-50 mt-1 ${isKh ? "font-khmer" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h3>
    </div>
  );
}

function IndustrialBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <svg width="100%" height="100%" className="opacity-[0.06]">
        <defs>
          <pattern id="ff-rivets" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.2" fill="#fbbf24" />
            <line x1="0" y1="20" x2="40" y2="20" stroke="#fbbf24" strokeWidth="0.3" />
            <line x1="20" y1="0" x2="20" y2="40" stroke="#fbbf24" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ff-rivets)" />
      </svg>
      <div className="absolute top-32 -left-20 w-80 h-80 rounded-full bg-amber-600/10 blur-3xl" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 rounded-full bg-blue-700/10 blur-3xl" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  1a. Formation animation — organic matter buried over millions of years
// ════════════════════════════════════════════════════════════════════════════

function FormationAnimation({ isKh }: { isKh: boolean }) {
  const STAGES = [
    {
      yearsAgo: "300M",
      titleEn: "Living sea — algae & plankton",
      titleKh: "សមុទ្ររស់ — សារាយ និងប្លង់តុង",
      bodyEn: "Carboniferous oceans teem with microscopic life. When it dies it sinks into the soft mud at the bottom.",
      bodyKh: "មហាសមុទ្រសម័យកាបូនីហ្វឺមានពោរពេញដោយជីវិតមីក្រូទស្សន៍។ នៅពេលវាស្លាប់ វាធ្លាក់ចូលទៅក្នុងភក់ទន់នៅបាត។",
    },
    {
      yearsAgo: "200M",
      titleEn: "Buried under sediment",
      titleKh: "កប់នៅក្រោមរ៉ែ",
      bodyEn: "Layer after layer of sand and silt seal the dead matter away from oxygen — so it can't fully decay.",
      bodyKh: "ស្រទាប់នៃខ្សាច់ និងកាក់ៗបិទផ្ទប់សារធាតុស្លាប់ឲ្យឃ្លាតពីអុកស៊ីសែន — ដូច្នេះវាមិនអាចរលាយទាំងស្រុង។",
    },
    {
      yearsAgo: "100M",
      titleEn: "Heat & pressure cook the carbon",
      titleKh: "កំដៅ និងសម្ពាធចម្អិនកាបោន",
      bodyEn: "Pressed down by km of rock, temperatures hit 60–150 °C. The complex organics break into smaller hydrocarbon chains — kerogen → oil → gas.",
      bodyKh: "ត្រូវបានច្របាច់ដោយថ្មរាប់គីឡូម៉ែត្រ កំដៅឡើងដល់ ៦០–១៥០ °C។ សារធាតុសរីរាង្គស្មុគស្មាញបែកជាខ្សែកាបូនអ៊ីដ្រូកាបោនតូចជាង — kerogen → ប្រេង → ហ្គាស។",
    },
    {
      yearsAgo: isKh ? "ឥឡូវ" : "today",
      titleEn: "Trapped in porous rock",
      titleKh: "ជាប់ក្នុងថ្មរន្ធ",
      bodyEn: "Oil & gas migrate up until they hit a layer of impermeable rock. We drill down through that 'cap rock' to release them — minutes of drilling for millions of years of storage.",
      bodyKh: "ប្រេង និងហ្គាសរំកិលឡើងលើរហូតដល់ពួកវាប៉ះស្រទាប់ថ្មមិនជ្រាប។ យើងជីកចុះកាត់ \"ថ្មគ្រប\" នោះដើម្បីបញ្ចេញវា — ការជីករាប់នាទីសម្រាប់ការផ្ទុករយៈពេលរាប់លានឆ្នាំ។",
    },
  ];

  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStage((s) => {
        if (s >= STAGES.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 2200);
    return () => clearInterval(id);
  }, [playing, STAGES.length]);

  // SVG layout
  const W = 720, H = 320;
  const seaY = 70;
  const groundY = 100;

  // Sediment depth grows with stage
  const sedimentDepth = stage === 0 ? 0 : stage === 1 ? 70 : stage === 2 ? 130 : 180;

  return (
    <SteelCard className="p-5 sm:p-6">
      <CardHeader
        icon={Mountain}
        titleEn="From living sea to drilled well"
        titleKh="ពីសមុទ្ររស់ ដល់អណ្ដូងជីក"
        isKh={isKh}
      />

      <div className="bg-stone-900 rounded-lg border border-stone-700 p-3 mb-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-labelledby="ff-form-title ff-form-desc">
          <title id="ff-form-title">{isKh ? "ការបង្កើតប្រេង និងហ្គាសក្នុងរយៈពេលរាប់លានឆ្នាំ" : "Formation of oil and gas over millions of years"}</title>
          <desc id="ff-form-desc">{isKh ? "ផ្នែកឆ្លងកាត់នៃផែនដីបង្ហាញជីវិតសមុទ្រធ្លាក់ចូលក្នុងភក់ ត្រូវបានកប់ដោយរ៉ែបន្តិចម្ដងៗ បន្ទាប់មកត្រូវបានចម្អិនទៅជាប្រេង (ពណ៌អំបារ) និងហ្គាស (ពណ៌ខៀវ) ដែលជាប់ក្នុងថ្ម។" : "Cross-section of the Earth showing sea-life sinking into mud, gradually buried under sediment, then cooked into oil (amber) and gas (blue) trapped within rock."}</desc>

          <defs>
            <linearGradient id="ff-sea-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <linearGradient id="ff-rock-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#57534e" />
              <stop offset="100%" stopColor="#292524" />
            </linearGradient>
            <linearGradient id="ff-oil-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <radialGradient id="ff-gas-grad" cx="0.5" cy="0.5" r="0.6">
              <stop offset="0%"   stopColor="#93c5fd" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.4" />
            </radialGradient>
          </defs>

          {/* Sky */}
          <rect x="0" y="0" width={W} height={seaY} fill="#1c1917" />
          {/* Sun / atmosphere hint */}
          <circle cx={W - 60} cy={30} r={14} fill="#fbbf24" opacity="0.7" />
          <circle cx={W - 60} cy={30} r={20} fill="#fbbf24" opacity="0.15" />

          {/* Sea */}
          <rect x="0" y={seaY} width={W} height={groundY - seaY + sedimentDepth} fill="url(#ff-sea-grad)" />
          {/* Subtle waves */}
          {stage === 0 && (
            <>
              <path d={`M 0 ${seaY + 6} Q ${W * 0.25} ${seaY}, ${W * 0.5} ${seaY + 6} T ${W} ${seaY + 6}`} stroke="#bfdbfe" strokeWidth="1" fill="none" opacity="0.5" />
              <path d={`M 0 ${seaY + 14} Q ${W * 0.3} ${seaY + 10}, ${W * 0.6} ${seaY + 14} T ${W} ${seaY + 14}`} stroke="#bfdbfe" strokeWidth="1" fill="none" opacity="0.3" />
            </>
          )}

          {/* Plankton/algae floating in sea (stage 0) */}
          {stage === 0 && Array.from({ length: 24 }).map((_, i) => {
            const x = (i * 31) % W;
            const y = seaY + 8 + ((i * 17) % (groundY - seaY - 12));
            return (
              <circle key={`pk-${i}`} cx={x} cy={y} r={2.2} fill="#86efac" className="ff-pulse" style={{ animationDelay: `${(i % 6) * 0.2}s` }} />
            );
          })}

          {/* Mud / sediment growing layers */}
          {stage >= 1 && (
            <>
              <rect x="0" y={groundY} width={W} height={sedimentDepth * 0.45} fill="#78716c" />
              <rect x="0" y={groundY + sedimentDepth * 0.45} width={W} height={sedimentDepth * 0.30} fill="#57534e" />
              <rect x="0" y={groundY + sedimentDepth * 0.75} width={W} height={sedimentDepth * 0.25} fill="#3f3f46" />
              {/* Stratification lines */}
              {Array.from({ length: 4 }).map((_, i) => (
                <line key={`st-${i}`} x1="0" y1={groundY + (i + 1) * (sedimentDepth / 5)} x2={W} y2={groundY + (i + 1) * (sedimentDepth / 5)} stroke="#1c1917" strokeWidth="0.5" opacity="0.5" />
              ))}
            </>
          )}

          {/* Bedrock — always present */}
          <rect x="0" y={groundY + sedimentDepth} width={W} height={H - groundY - sedimentDepth} fill="url(#ff-rock-grad)" />

          {/* Dead organic matter falling / settled (stage 0–1) */}
          {stage <= 1 && Array.from({ length: 14 }).map((_, i) => {
            const x = 30 + i * 48;
            const y = groundY - 4 - (stage === 0 ? Math.sin(i) * 8 : 0);
            return <circle key={`om-${i}`} cx={x} cy={y} r={3} fill="#78716c" />;
          })}

          {/* Oil reservoir forming (stage 2) */}
          {stage >= 2 && (
            <>
              <ellipse cx={W * 0.32} cy={H - 78} rx={110} ry={22} fill="url(#ff-oil-grad)" opacity="0.95" />
              <ellipse cx={W * 0.7}  cy={H - 60} rx={80}  ry={15} fill="url(#ff-oil-grad)" opacity="0.85" />
              {/* Gas cap above oil */}
              <ellipse cx={W * 0.32} cy={H - 100} rx={70} ry={12} fill="url(#ff-gas-grad)" />
            </>
          )}

          {/* Drilling rig (stage 3) */}
          {stage >= 3 && (
            <>
              {/* Tower */}
              <g transform={`translate(${W * 0.32 - 18}, ${seaY - 60})`}>
                <polygon points="0,60 36,60 30,0 6,0" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
                <line x1="6" y1="0"  x2="30" y2="60" stroke="#fbbf24" strokeWidth="1" opacity="0.7" />
                <line x1="30" y1="0" x2="6"  y2="60" stroke="#fbbf24" strokeWidth="1" opacity="0.7" />
              </g>
              {/* Borehole down to oil */}
              <line
                x1={W * 0.32} y1={seaY - 1}
                x2={W * 0.32} y2={H - 78}
                stroke="#fbbf24"
                strokeWidth="3"
                strokeDasharray="6 4"
                className="ff-pulse"
              />
              {/* Drop rising */}
              <circle cx={W * 0.32} cy={seaY - 8} r={5} fill="#fbbf24" />
            </>
          )}

          {/* Time stamp */}
          <g>
            <rect x={W - 110} y={H - 36} width={100} height={26} rx={4} fill="#0c0a09" stroke="#44403c" />
            <text x={W - 60} y={H - 19} fontSize="13" fontFamily="monospace" fill="#fbbf24" textAnchor="middle" fontWeight="700">
              {STAGES[stage].yearsAgo}{stage < 3 ? (isKh ? " ឆ្នាំ" : " yrs ago") : ""}
            </text>
          </g>

          {/* Depth ruler on left */}
          {stage >= 1 && (
            <g>
              <line x1={20} y1={groundY} x2={20} y2={H - 20} stroke="#78716c" strokeWidth="1" />
              <text x={26} y={groundY + 12} fontSize="9" fill="#a8a29e">0 km</text>
              <text x={26} y={H - 24} fontSize="9" fill="#a8a29e">~2 km</text>
            </g>
          )}
        </svg>
      </div>

      {/* Stage info */}
      <div className="bg-stone-900/60 border border-stone-700 rounded-lg p-4 mb-4">
        <div className={`text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
          {isKh ? "ដំណាក់កាល" : "Stage"} {stage + 1} / {STAGES.length} · {STAGES[stage].yearsAgo}{stage < 3 ? (isKh ? " ឆ្នាំមុន" : " years ago") : ""}
        </div>
        <h4 className={`font-display font-bold text-lg text-stone-100 mb-1 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? STAGES[stage].titleKh : STAGES[stage].titleEn}
        </h4>
        <p className={`text-sm text-stone-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh ? STAGES[stage].bodyKh : STAGES[stage].bodyEn}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => { setPlaying(true); if (stage >= STAGES.length - 1) setStage(0); }}
          disabled={playing}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-colors bg-amber-500 hover:bg-amber-400 text-stone-900 disabled:opacity-50 disabled:cursor-not-allowed ${isKh ? "font-khmer" : ""}`}
        >
          <Play className="w-4 h-4" />
          {isKh ? "លេង" : "Play"}
        </button>
        <button
          onClick={() => setPlaying(false)}
          disabled={!playing}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm bg-stone-700 hover:bg-stone-600 text-stone-100 disabled:opacity-50 disabled:cursor-not-allowed ${isKh ? "font-khmer" : ""}`}
        >
          <Pause className="w-4 h-4" />
          {isKh ? "ឈប់" : "Pause"}
        </button>
        <button
          onClick={() => { setPlaying(false); setStage(0); }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm bg-stone-700 hover:bg-stone-600 text-stone-100 ${isKh ? "font-khmer" : ""}`}
        >
          <RotateCcw className="w-4 h-4" />
          {isKh ? "ចាប់ផ្ដើមឡើងវិញ" : "Reset"}
        </button>
        <div className="ml-auto flex items-center gap-1">
          {STAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPlaying(false); setStage(i); }}
              aria-label={`Stage ${i + 1}`}
              aria-current={i === stage}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === stage ? "bg-amber-400" : "bg-stone-600 hover:bg-stone-500"}`}
            />
          ))}
        </div>
      </div>
    </SteelCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  1b. Global reserve countdown
// ════════════════════════════════════════════════════════════════════════════

function ReserveCountdown({ isKh }: { isKh: boolean }) {
  // Reference values (illustrative, BP Statistical Review style):
  // Proven oil reserves ≈ 1.7 trillion barrels.
  // Daily consumption    ≈ 100 million barrels per day → ~36.5 bn / yr.
  // R/P ratio ≈ 47 years at current rate. Pick a target depletion date for the live ticker.
  const TARGET_DATE = useMemo(() => new Date(Date.UTC(2073, 0, 1)).getTime(), []); // Jan 1 2073
  // Widely-cited estimate (Dukes 2003, U. Utah): one year of modern fossil-fuel
  // burn ≈ what photosynthesis + burial historically built up in ~1,000,000 years.
  const FORMATION_YEARS_PER_YEAR_OF_USE = 1_000_000;

  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remainingMs = Math.max(0, TARGET_DATE - now);
  const totalSec = Math.floor(remainingMs / 1000);
  const years   = Math.floor(totalSec / (365.25 * 24 * 3600));
  const days    = Math.floor((totalSec % (365.25 * 24 * 3600)) / (24 * 3600));
  const hours   = Math.floor((totalSec % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  return (
    <SteelCard className="p-5 sm:p-6">
      <CardHeader
        icon={Clock}
        titleEn="The limited resource — global reserve countdown"
        titleKh="ធនធានមានកំណត់ — ការរាប់ថយក្រោយនៃទុនបំរុងពិភពលោក"
        isKh={isKh}
      />
      <p className={`text-sm text-stone-300 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "នៅអត្រាប្រើប្រាស់សព្វថ្ងៃ — ប្រហែល ១០០ លានធុងក្នុងមួយថ្ងៃ — ទុនបំរុងប្រេងដែលបានបញ្ជាក់របស់ពិភពលោកនឹងគ្រប់គ្រាន់ប្រហែល ៥០ ឆ្នាំ។ នេះគឺជាការប៉ាន់ស្មាន មិនមែនជាការរាប់ត្រឹមត្រូវទេ — ប៉ុន្តែវាបង្ហាញប្រធានបទនេះ៖ យើងកំពុងប្រើវាលឿនជាងផែនដីអាចបង្កើតវាបាន។"
          : "At today's burn rate — about 100 million barrels per day — the world's proven oil reserves last about 50 years. The number isn't an exact end date, but it makes the point: we're using it far faster than the Earth can replace it."}
      </p>

      <div className="bg-gradient-to-br from-stone-900 to-stone-950 rounded-lg border border-amber-500/30 p-5 mb-4">
        <div className={`text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-3 text-center ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
          {isKh ? "ប្រេងបំរុងពិភពលោក · ការប៉ាន់ស្មានបំបាត់" : "Global oil reserves · estimated depletion in"}
        </div>
        <div className="grid grid-cols-5 gap-2 sm:gap-3" role="timer" aria-live="off">
          <TimeUnit n={years}  labelEn="years"   labelKh="ឆ្នាំ"   isKh={isKh} accent />
          <TimeUnit n={days}   labelEn="days"    labelKh="ថ្ងៃ"   isKh={isKh} />
          <TimeUnit n={hours}  labelEn="hours"   labelKh="ម៉ោង" isKh={isKh} />
          <TimeUnit n={minutes} labelEn="min"    labelKh="នាទី" isKh={isKh} />
          <TimeUnit n={seconds} labelEn="sec"    labelKh="វិ."   isKh={isKh} pulse />
        </div>
        <div className={`mt-3 text-center text-xs text-stone-500 italic ${isKh ? "font-khmer not-italic" : ""}`}>
          {isKh ? "ការប៉ាន់ស្មានដោយប្រើ R/P ≈ ៥០ ឆ្នាំ (ឆ្នាំគោលដៅ ២០៧៣)" : "Illustrative R/P ≈ 50 years (target year 2073)"}
        </div>
      </div>

      {/* The mismatch */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3">
          <Gauge className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className={`text-xs font-bold uppercase tracking-wider text-amber-300 mb-1 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
              {isKh ? "យើងដុត" : "We burn"}
            </div>
            <div className={`text-stone-100 font-semibold mb-1 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "~១០០ លានធុង / ថ្ងៃ" : "~100 million barrels / day"}
            </div>
            <div className={`text-xs text-stone-400 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? "ប្រហែល ៦៦០ លានលីត្រ រាល់ម៉ោង ទូទាំងពិភពលោក (១ ធុង = ១៥៩ លីត្រ)។" : "About 660 million litres every hour, worldwide (1 barrel = 159 L)."}
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
          <Droplet className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
          <div>
            <div className={`text-xs font-bold uppercase tracking-wider text-blue-300 mb-1 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
              {isKh ? "ផែនដីបង្កើត" : "Earth replaces"}
            </div>
            <div className={`text-stone-100 font-semibold mb-1 ${isKh ? "font-khmer" : ""}`}>
              {isKh
                ? `យើងដុតក្នុង ១ ឆ្នាំ = ~${FORMATION_YEARS_PER_YEAR_OF_USE.toLocaleString()} ឆ្នាំនៃការបង្កើត`
                : `1 year of burning = ~${FORMATION_YEARS_PER_YEAR_OF_USE.toLocaleString()} years of formation`}
            </div>
            <div className={`text-xs text-stone-400 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "ការសិក្សាមួយ (Dukes ២០០៣) ប៉ាន់ប្រមាណថា ឥន្ធនៈដែលយើងដុតក្នុងមួយឆ្នាំ ត្រូវចំណាយពេលប្រហែលមួយលានឆ្នាំសម្រាប់រុក្ខជាតិ និងប្លង់តុងបុរាណក្នុងការបង្កើត។"
                : "A 2003 study (Dukes) estimated that the fuel we burn in a single year took ancient plants and plankton roughly a million years to lay down."}
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-4 flex items-start gap-2 text-sm text-amber-200/90 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400" />
        <span>
          {isKh
            ? "នេះជាមូលហេតុដែលថាមពលអាចបន្តបាន — ពន្លឺព្រះអាទិត្យ ខ្យល់ ទឹក — សំខាន់ខ្លាំងណាស់៖ ពួកវាមកដល់ភ្លាម។ ប្រេងប្រហែលជាបុរាណ ប៉ុន្តែទីផ្សារសមទំនើបនឹងមិនរង់ចាំ ៣០០ លានឆ្នាំទេ។"
            : "This is why renewable energy — sun, wind, water — matters: it arrives in real time. Oil may be ancient, but a modern economy can't wait 300 million years for the next batch."}
        </span>
      </div>
    </SteelCard>
  );
}

function TimeUnit({
  n, labelEn, labelKh, isKh, accent, pulse,
}: {
  n: number; labelEn: string; labelKh: string; isKh: boolean;
  accent?: boolean; pulse?: boolean;
}) {
  return (
    <div className={`text-center rounded-md py-2 sm:py-3 border ${accent ? "bg-amber-500/15 border-amber-400/50" : "bg-stone-800/80 border-stone-700"}`}>
      <div className={`font-mono font-bold tabular-nums text-2xl sm:text-3xl ${accent ? "text-amber-300" : "text-stone-100"} ${pulse ? "ff-pulse-fast" : ""}`}>
        {String(n).padStart(2, "0")}
      </div>
      <div className={`text-[10px] uppercase tracking-wider text-stone-400 mt-0.5 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
        {isKh ? labelKh : labelEn}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2. Distillation tower
// ════════════════════════════════════════════════════════════════════════════

function DistillationTower({ isKh }: { isKh: boolean }) {
  // Fractions from coolest top → hottest bottom
  const FRACTIONS = [
    { en: "Refinery gases", kh: "ហ្គាសរោងចម្រាញ់", uses: { en: "Propane, butane — bottled cooking gas", kh: "ប្រូប៉ាន ប៊ូតាន — ហ្គាសចម្អិនម្ហូបក្នុងដប" }, tempC: 25,  carbon: "C₁–C₄",  color: "#bfdbfe" },
    { en: "Gasoline (Petrol)", kh: "ប្រេងសាំង", uses: { en: "Cars, motorbikes, small engines", kh: "ឡាន ម៉ូតូ ម៉ាស៊ីនតូចៗ" }, tempC: 70,  carbon: "C₅–C₁₀",  color: "#fde68a" },
    { en: "Kerosene (Jet fuel)", kh: "ប្រេងកាត (ប្រេងម៉ាស៊ីនយន្តហោះ)", uses: { en: "Jet engines, rural lamps", kh: "ម៉ាស៊ីនយន្តហោះ ចង្កៀងតាមជនបទ" }, tempC: 170, carbon: "C₁₀–C₁₆", color: "#fbbf24" },
    { en: "Diesel", kh: "ម៉ាស៊ូត", uses: { en: "Trucks, buses, generators, tractors", kh: "ឡានដឹកទំនិញ ឡានក្រុង ម៉ាស៊ីនភ្លើង ត្រាក់ទ័រ" }, tempC: 270, carbon: "C₁₄–C₂₀", color: "#f59e0b" },
    { en: "Lubricating oil", kh: "ប្រេងរំអិល", uses: { en: "Engine oil, machine grease", kh: "ប្រេងម៉ាស៊ីន ខ្លាញ់ម៉ាស៊ីន" }, tempC: 340, carbon: "C₂₀–C₃₅", color: "#d97706" },
    { en: "Bitumen (Asphalt)", kh: "ស្នាមជ័រ (អាស្វាល)", uses: { en: "Roads, roof tar", kh: "ផ្លូវ ជ័រដំបូលផ្ទះ" }, tempC: 400, carbon: "C₃₀⁺",   color: "#92400e" },
  ];

  // Tower drawing dimensions
  const W = 720, H = 540;
  const towerLeft = 280, towerRight = 520;
  const towerTop = 30, towerBottom = H - 80;
  const innerH = towerBottom - towerTop;
  const trayCount = FRACTIONS.length;

  // y position of each tray, from coolest (top) to hottest (bottom)
  const trays = FRACTIONS.map((_, i) => towerTop + ((i + 0.5) / trayCount) * innerH);

  return (
    <SteelCard className="p-5 sm:p-6">
      <CardHeader
        icon={Layers}
        titleEn="The fractionating tower"
        titleKh="ប៉មចម្រាញ់"
        isKh={isKh}
      />

      <div className="bg-stone-900 rounded-lg border border-stone-700 p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-labelledby="ff-tower-title ff-tower-desc">
          <title id="ff-tower-title">{isKh ? "ប៉មចម្រាញ់ដាច់ដោយផ្នែក" : "Fractional distillation tower"}</title>
          <desc id="ff-tower-desc">
            {isKh
              ? "ប្រេងឆៅចូលនៅខាងក្រោមហើយត្រូវបានកំដៅ។ ចំហាយឡើងលើ។ នៅរាល់កម្រិត ផ្នែកផ្សេងគ្នាប្រែជាវត្ថុរាវ៖ ហ្គាសរោងចម្រាញ់ (ខាងលើបំផុត ត្រជាក់បំផុត) ប្រេងសាំង កេរ៉ូស៊ីន ម៉ាស៊ូត ប្រេងរំអិល ហើយស្នាមជ័រ (ខាងក្រោមបំផុត ក្ដៅបំផុត)។"
              : "Crude oil enters at the bottom and is heated. The vapours rise. At each level, a different fraction turns back into liquid: refinery gases (top, coolest), gasoline, kerosene, diesel, lubricating oil, and bitumen (bottom, hottest)."}
          </desc>

          <defs>
            <linearGradient id="ff-tower-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#1c1917" />
              <stop offset="50%"  stopColor="#292524" />
              <stop offset="100%" stopColor="#1c1917" />
            </linearGradient>
            <linearGradient id="ff-vapor-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%"   stopColor="#fbbf24" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="ff-flame" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%"   stopColor="#3b82f6" />
              <stop offset="60%"  stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Tower outer shell */}
          <rect x={towerLeft} y={towerTop} width={towerRight - towerLeft} height={innerH} rx={12} fill="url(#ff-tower-grad)" stroke="#fbbf24" strokeWidth="2" />
          {/* Top dome */}
          <path d={`M ${towerLeft} ${towerTop + 8} Q ${(towerLeft + towerRight) / 2} ${towerTop - 26}, ${towerRight} ${towerTop + 8}`} fill="url(#ff-tower-grad)" stroke="#fbbf24" strokeWidth="2" />
          {/* Tower vent at top */}
          <rect x={(towerLeft + towerRight) / 2 - 8} y={towerTop - 36} width={16} height={14} fill="#1c1917" stroke="#fbbf24" strokeWidth="1.5" />

          {/* Rising vapor inside */}
          <rect x={towerLeft + 8} y={towerTop + 10} width={towerRight - towerLeft - 16} height={innerH - 20} fill="url(#ff-vapor-grad)" />

          {/* Trays + fractions */}
          {trays.map((y, i) => {
            const f = FRACTIONS[i];
            const isLeft = i % 2 === 0;
            return (
              <g key={`tray-${i}`}>
                {/* Tray inside tower */}
                <line x1={towerLeft + 6} y1={y} x2={towerRight - 6} y2={y} stroke="#fbbf24" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.6" />
                <rect x={towerLeft + 12} y={y - 2} width={(towerRight - towerLeft - 24) * 0.6} height={4} fill={f.color} opacity="0.9" />

                {/* Outflow pipe */}
                {isLeft ? (
                  <>
                    <line x1={towerLeft} y1={y} x2={towerLeft - 30} y2={y} stroke="#a8a29e" strokeWidth="3" />
                    <circle cx={towerLeft - 36} cy={y} r={5} fill={f.color} />
                  </>
                ) : (
                  <>
                    <line x1={towerRight} y1={y} x2={towerRight + 30} y2={y} stroke="#a8a29e" strokeWidth="3" />
                    <circle cx={towerRight + 36} cy={y} r={5} fill={f.color} />
                  </>
                )}

                {/* Label box */}
                <g>
                  <rect
                    x={isLeft ? 16 : towerRight + 50}
                    y={y - 24}
                    width={isLeft ? towerLeft - 50 : W - towerRight - 66}
                    height={48}
                    rx={6}
                    fill="#1c1917"
                    stroke={f.color}
                    strokeWidth="1.2"
                  />
                  <text
                    x={isLeft ? 24 : towerRight + 58}
                    y={y - 8}
                    fontSize="11"
                    fontWeight="700"
                    fill={f.color}
                  >
                    {isKh ? f.kh : f.en}
                  </text>
                  <text
                    x={isLeft ? 24 : towerRight + 58}
                    y={y + 6}
                    fontSize="9"
                    fill="#d6d3d1"
                  >
                    {f.carbon} · ~{f.tempC}°C
                  </text>
                  <text
                    x={isLeft ? 24 : towerRight + 58}
                    y={y + 18}
                    fontSize="8"
                    fill="#a8a29e"
                    fontStyle="italic"
                  >
                    {(isKh ? f.uses.kh : f.uses.en).slice(0, 38)}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Crude-oil inlet pipe at bottom */}
          <g>
            <line x1={towerLeft - 60} y1={towerBottom + 14} x2={towerLeft + 6} y2={towerBottom + 14} stroke="#a8a29e" strokeWidth="6" />
            <line x1={towerLeft - 60} y1={towerBottom + 14} x2={towerLeft + 6} y2={towerBottom + 14} stroke="#fbbf24" strokeWidth="2" className="ff-pulse" />
            <text x={towerLeft - 62} y={towerBottom + 6} fontSize="10" fontWeight="700" fill="#fbbf24" textAnchor="end">
              {isKh ? "ប្រេងឆៅចូល" : "Crude oil in"}
            </text>
          </g>

          {/* Furnace */}
          <g>
            <rect x={towerLeft - 6} y={towerBottom + 6} width={towerRight - towerLeft + 12} height={28} rx={4} fill="#0c0a09" stroke="#fbbf24" strokeWidth="1.5" />
            {/* Blue flames */}
            {[0.2, 0.4, 0.6, 0.8].map((t) => (
              <path
                key={`fl-${t}`}
                d={`M ${towerLeft + (towerRight - towerLeft) * t} ${towerBottom + 32}
                   Q ${towerLeft + (towerRight - towerLeft) * t - 6} ${towerBottom + 18},
                     ${towerLeft + (towerRight - towerLeft) * t}     ${towerBottom + 12}
                   Q ${towerLeft + (towerRight - towerLeft) * t + 6} ${towerBottom + 18},
                     ${towerLeft + (towerRight - towerLeft) * t}     ${towerBottom + 32} Z`}
                fill="url(#ff-flame)"
                className="ff-flicker"
                style={{ animationDelay: `${t * 0.4}s` }}
              />
            ))}
          </g>

          {/* Temperature gradient label */}
          <g>
            <text x={W - 22} y={towerTop + 6} fontSize="9" fill="#bfdbfe" textAnchor="end">{isKh ? "ត្រជាក់" : "cool"} ↑</text>
            <text x={W - 22} y={towerBottom + 4} fontSize="9" fill="#fbbf24" textAnchor="end">{isKh ? "ក្ដៅ" : "hot"} ↓</text>
          </g>
        </svg>
      </div>

      <div className={`mt-4 text-sm text-stone-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "ច្បាប់សាមញ្ញ៖ ខ្សែកាបោនខ្លី (C₁–C₄) រំពុះនៅត្រជាក់ ដូច្នេះវាឡើងដល់កំពូល។ ខ្សែវែង (C₃₀⁺) រំពុះ និងផ្ដិតឡើងវិញតែនៅពេលក្ដៅខ្លាំង ដូច្នេះវានៅជាប់ខាងក្រោម — ហើយត្រូវបានចាក់នៅលើផ្លូវរបស់យើង។"
          : "Simple rule: short carbon chains (C₁–C₄) boil at low temperatures, so they rise to the top. Long chains (C₃₀⁺) only boil and condense at very high temperatures, so they stay at the bottom — and end up paving our roads."}
      </div>
    </SteelCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3. Piston animation — 4-stroke cycle
// ════════════════════════════════════════════════════════════════════════════

const STROKES = [
  {
    key: "intake",
    titleEn: "Intake", titleKh: "ស្រូប",
    bodyEn: "The piston moves DOWN. The intake valve opens, sucking in a mist of petrol and air.",
    bodyKh: "ស៊ីឡាំងផ្លាស់ទីចុះក្រោម។ វ៉ាល់ស្រូបបើក ស្រូបចូលនូវចំហាយប្រេងសាំង និងខ្យល់។",
    pistonY: 0.9, // 0 = top, 1 = bottom
    intakeOpen: true, exhaustOpen: false, spark: false, mixDensity: 0.4,
    color: "#3b82f6",
  },
  {
    key: "compression",
    titleEn: "Compression", titleKh: "ច្របាច់",
    bodyEn: "Both valves close. The piston moves UP, squeezing the fuel-air mix into a tiny, dense cloud.",
    bodyKh: "វ៉ាល់ទាំងពីរបិទ។ ស៊ីឡាំងផ្លាស់ទីឡើងលើ ច្របាច់ល្បាយប្រេង-ខ្យល់ទៅជាពពកតូច ក្រាស់។",
    pistonY: 0.15, intakeOpen: false, exhaustOpen: false, spark: false, mixDensity: 0.95,
    color: "#fbbf24",
  },
  {
    key: "power",
    titleEn: "Power (the explosion)", titleKh: "ថាមពល (ការផ្ទុះ)",
    bodyEn: "The spark plug fires. The hot dense mix EXPLODES and shoves the piston down hard — this is the only stroke that does useful work.",
    bodyKh: "ភ្លើងស្ប៉ាក់បាញ់។ ល្បាយក្ដៅក្រាស់ផ្ទុះ ហើយរុញស៊ីឡាំងចុះក្រោមយ៉ាងខ្លាំង — នេះគឺជាជំហានតែមួយគត់ដែលធ្វើការងារមានប្រយោជន៍។",
    pistonY: 0.85, intakeOpen: false, exhaustOpen: false, spark: true, mixDensity: 0.2,
    color: "#ef4444",
  },
  {
    key: "exhaust",
    titleEn: "Exhaust", titleKh: "បំភាយ",
    bodyEn: "The exhaust valve opens. The piston moves UP, pushing the burnt gases (CO₂ + H₂O + NOₓ) out the tailpipe.",
    bodyKh: "វ៉ាល់បំភាយបើក។ ស៊ីឡាំងផ្លាស់ទីឡើងលើ រុញហ្គាសដែលបានឆេះ (CO₂ + H₂O + NOₓ) ចេញតាមបំពង់ផ្សែង។",
    pistonY: 0.15, intakeOpen: false, exhaustOpen: true, spark: false, mixDensity: 0.0,
    color: "#78716c",
  },
] as const;

function PistonAnimation({ isKh }: { isKh: boolean }) {
  const [stroke, setStroke] = useState(0);
  const [running, setRunning] = useState(false);
  const [rpm, setRpm] = useState(40); // strokes per minute (slow for visibility)

  // Use a ref to keep track of timer to avoid stale-closure restart bugs
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!running) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    const intervalMs = (60 / rpm) * 1000;
    timerRef.current = setTimeout(() => {
      setStroke((s) => (s + 1) % STROKES.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [running, rpm, stroke]);

  const cur = STROKES[stroke];

  // SVG layout
  const W = 360, H = 420;
  const cylX = 90, cylW = 180;
  const cylTop = 50, cylBottom = 320;
  const cylHeight = cylBottom - cylTop;
  const pistonTopAt = cylTop + cur.pistonY * (cylHeight - 60);
  const pistonHeight = 60;

  return (
    <SteelCard className="p-5 sm:p-6">
      <CardHeader
        icon={Cog}
        titleEn="Inside a single cylinder"
        titleKh="ខាងក្នុងស៊ីឡាំងមួយ"
        isKh={isKh}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SVG */}
        <div className="bg-stone-900 rounded-lg border border-stone-700 p-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-labelledby="ff-piston-title ff-piston-desc">
            <title id="ff-piston-title">{isKh ? "វដ្តម៉ាស៊ីនបួនជំហាន" : "Four-stroke engine cycle"}</title>
            <desc id="ff-piston-desc">{isKh ? `ស៊ីឡាំងបង្ហាញជំហានបច្ចុប្បន្ន៖ ${STROKES[stroke].titleKh}` : `Cylinder diagram showing the current stroke: ${STROKES[stroke].titleEn}`}</desc>

            <defs>
              <linearGradient id="ff-cyl-wall" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#44403c" />
                <stop offset="50%"  stopColor="#78716c" />
                <stop offset="100%" stopColor="#44403c" />
              </linearGradient>
              <radialGradient id="ff-spark-flash" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%"   stopColor="#fef9c3" />
                <stop offset="40%"  stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Cylinder walls */}
            <rect x={cylX - 8} y={cylTop - 4} width={cylW + 16} height={cylHeight + 8} fill="#1c1917" stroke="#fbbf24" strokeWidth="1.5" rx={6} />
            <rect x={cylX} y={cylTop} width={cylW} height={cylHeight} fill="url(#ff-cyl-wall)" />

            {/* Spark plug */}
            <g transform={`translate(${cylX + cylW / 2}, ${cylTop - 6})`}>
              <rect x={-7} y={-22} width={14} height={22} fill="#a8a29e" stroke="#1c1917" />
              <rect x={-9} y={-30} width={18} height={8} fill="#fbbf24" />
              <line x1="0" y1="0" x2="0" y2="12" stroke="#78716c" strokeWidth="2" />
              {cur.spark && (
                <>
                  <circle cx="0" cy="14" r="14" fill="url(#ff-spark-flash)" className="ff-flicker" />
                  <line x1="-4" y1="11" x2="4" y2="17" stroke="#fef9c3" strokeWidth="1.5" />
                  <line x1="4"  y1="11" x2="-4" y2="17" stroke="#fef9c3" strokeWidth="1.5" />
                </>
              )}
            </g>

            {/* Intake valve (left top) */}
            <g transform={`translate(${cylX + 30}, ${cylTop})`}>
              <rect x={-10} y={-14} width={20} height={6} fill={cur.intakeOpen ? "#3b82f6" : "#44403c"} />
              <rect x={-2}  y={-8}  width={4}  height={cur.intakeOpen ? 14 : 6} fill="#a8a29e" />
              <text x={0} y={-22} fontSize="8" fill="#bfdbfe" textAnchor="middle" fontWeight="700">{isKh ? "ស្រូប" : "IN"}</text>
            </g>
            {/* Exhaust valve (right top) */}
            <g transform={`translate(${cylX + cylW - 30}, ${cylTop})`}>
              <rect x={-10} y={-14} width={20} height={6} fill={cur.exhaustOpen ? "#ef4444" : "#44403c"} />
              <rect x={-2}  y={-8}  width={4}  height={cur.exhaustOpen ? 14 : 6} fill="#a8a29e" />
              <text x={0} y={-22} fontSize="8" fill="#fca5a5" textAnchor="middle" fontWeight="700">{isKh ? "បំភាយ" : "EX"}</text>
            </g>

            {/* Fuel-air mixture density (above piston) */}
            {Array.from({ length: 28 }).map((_, i) => {
              const visible = Math.random() < cur.mixDensity || true;
              const px = cylX + 12 + ((i * 19) % (cylW - 24));
              const py = cylTop + 18 + ((i * 13) % Math.max(20, pistonTopAt - cylTop - 28));
              if (py > pistonTopAt - 4) return null;
              const dotSize = 1.4 + cur.mixDensity * 1.6;
              return (
                <circle
                  key={`mx-${i}`}
                  cx={px}
                  cy={py}
                  r={dotSize}
                  fill={cur.spark ? "#ef4444" : (cur.key === "exhaust" ? "#78716c" : "#fbbf24")}
                  opacity={cur.mixDensity * 0.95 + 0.05}
                />
              );
            })}

            {/* Piston */}
            <g style={{ transition: "transform 0.6s ease-in-out" }} transform={`translate(0, ${pistonTopAt - cylTop})`}>
              <rect x={cylX + 4} y={cylTop} width={cylW - 8} height={pistonHeight} rx={3} fill="#a8a29e" stroke="#1c1917" strokeWidth="1.5" />
              {/* Piston rings */}
              <line x1={cylX + 6} y1={cylTop + 8} x2={cylX + cylW - 6} y2={cylTop + 8} stroke="#1c1917" strokeWidth="1" />
              <line x1={cylX + 6} y1={cylTop + 14} x2={cylX + cylW - 6} y2={cylTop + 14} stroke="#1c1917" strokeWidth="1" />
              <line x1={cylX + 6} y1={cylTop + 20} x2={cylX + cylW - 6} y2={cylTop + 20} stroke="#1c1917" strokeWidth="1" />
              {/* Connecting rod */}
              <rect x={cylX + cylW / 2 - 8} y={cylTop + pistonHeight} width={16} height={cylBottom - (cylTop + pistonHeight) + 30} fill="#78716c" />
            </g>

            {/* Crankshaft (just a circle below) */}
            <circle cx={cylX + cylW / 2} cy={cylBottom + 60} r={32} fill="#1c1917" stroke="#fbbf24" strokeWidth="1.5" />
            <circle cx={cylX + cylW / 2} cy={cylBottom + 60} r={5}  fill="#fbbf24" />
            {/* Crankshaft web (rotates with stroke index) */}
            <g transform={`translate(${cylX + cylW / 2}, ${cylBottom + 60}) rotate(${stroke * 90})`}>
              <line x1="0" y1="0" x2="0" y2="-26" stroke="#fbbf24" strokeWidth="3" />
              <circle cx="0" cy="-26" r="5" fill="#fbbf24" />
            </g>

            {/* Stroke counter */}
            <g>
              <rect x={W - 86} y={H - 38} width={72} height={26} rx={4} fill="#0c0a09" stroke="#44403c" />
              <text x={W - 50} y={H - 21} fontSize="11" fontFamily="monospace" fill={cur.color} textAnchor="middle" fontWeight="700">
                {stroke + 1}/4 · {(isKh ? cur.titleKh : cur.titleEn).split(" ")[0]}
              </text>
            </g>
          </svg>
        </div>

        {/* Description + controls */}
        <div className="flex flex-col">
          <div className="bg-stone-900/60 border border-stone-700 rounded-lg p-4 mb-4 flex-1">
            <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`} style={{ color: cur.color }}>
              {isKh ? "ជំហាន" : "Stroke"} {stroke + 1} / 4
            </div>
            <h4 className={`font-display font-bold text-lg text-stone-100 mb-2 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? cur.titleKh : cur.titleEn}
            </h4>
            <p className={`text-sm text-stone-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? cur.bodyKh : cur.bodyEn}
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <button
              onClick={() => setRunning((r) => !r)}
              aria-pressed={running}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-colors ${
                running ? "bg-stone-700 hover:bg-stone-600 text-stone-100" : "bg-amber-500 hover:bg-amber-400 text-stone-900"
              } ${isKh ? "font-khmer" : ""}`}
            >
              {running ? <><Pause className="w-4 h-4" />{isKh ? "ឈប់" : "Pause"}</> : <><Play className="w-4 h-4" />{isKh ? "ចាប់ផ្ដើម" : "Start"}</>}
            </button>
            <button
              onClick={() => setStroke((s) => (s + 1) % STROKES.length)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm bg-stone-700 hover:bg-stone-600 text-stone-100 ${isKh ? "font-khmer" : ""}`}
            >
              {isKh ? "ជំហានបន្ទាប់" : "Step"}
            </button>
          </div>

          {/* Stroke pills */}
          <div className="grid grid-cols-2 gap-2">
            {STROKES.map((s, i) => (
              <button
                key={s.key}
                onClick={() => { setRunning(false); setStroke(i); }}
                aria-current={i === stroke}
                className={`text-xs px-3 py-2 rounded-md border transition-colors text-left ${
                  i === stroke
                    ? "bg-stone-700 border-amber-400 text-stone-50"
                    : "bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-600"
                } ${isKh ? "font-khmer" : ""}`}
              >
                <span className="font-mono font-bold mr-1.5" style={{ color: s.color }}>{i + 1}.</span>
                {isKh ? s.titleKh : s.titleEn}
              </button>
            ))}
          </div>

          {/* Speed slider */}
          <div className="mt-4">
            <label className={`text-xs text-stone-400 mb-1 block ${isKh ? "font-khmer" : ""}`}>
              {isKh ? `ល្បឿន: ${rpm} ស្រ្តូក / នាទី` : `Speed: ${rpm} strokes/min`}
            </label>
            <input
              type="range"
              min={10}
              max={120}
              value={rpm}
              onChange={(e) => setRpm(parseInt(e.target.value, 10))}
              className="w-full accent-amber-500"
              aria-label={isKh ? "ល្បឿនវដ្ត" : "Cycle speed"}
            />
          </div>
        </div>
      </div>
    </SteelCard>
  );
}

function OxidationNote({ isKh }: { isKh: boolean }) {
  return (
    <SteelCard className="p-5 sm:p-6">
      <CardHeader
        icon={Flame}
        titleEn="Oxidation — why fuel 'explodes'"
        titleKh={"ការអុកស៊ីតកម្ម — ហេតុអ្វីឥន្ធនៈ “ផ្ទុះ”"}
        isKh={isKh}
      />
      <p className={`text-sm text-stone-300 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "ប្រេងសាំងគឺជាខ្សែកាបូនអ៊ីដ្រូកាបោន — អាតូមកាបោន និងហ៊ីដ្រូសែនដែលជាប់នឹងគ្នាដោយចំណង។ ចំណងទាំងនេះផ្ទុកថាមពលច្រើន។ នៅពេលអ្នកលាយវាជាមួយអុកស៊ីសែន ហើយផ្ដល់ស្ប៉ាក់តូចមួយ ប្រតិកម្មស៊ីសេនថ្នាក់ខ្ពស់បាញ់ចេញឲ្យទាំងអស់គ្នា — ដោយបញ្ចេញកំដៅ និងបង្កើតហ្គាសដែលរំពុះ។"
          : "Petrol is a hydrocarbon — carbon and hydrogen atoms locked together by chemical bonds. Those bonds store a lot of energy. When you mix it with oxygen and add a tiny spark, a fast chain-reaction releases all of that energy at once — making heat and a sudden burst of expanding gas."}
      </p>

      {/* Reaction equation */}
      <div className="bg-stone-900 border border-amber-500/30 rounded-lg p-4 mb-4 overflow-x-auto">
        <div className={`text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
          {isKh ? "ការដុតប្រេងសាំង (សាមញ្ញសម្រាប់អុកតាន)" : "Combustion of petrol (simplified for octane)"}
        </div>
        <div className="font-mono text-base sm:text-lg text-stone-100 whitespace-nowrap text-center">
          <span className="text-amber-300">2 C₈H₁₈</span>
          <span className="text-stone-500"> + </span>
          <span className="text-blue-300">25 O₂</span>
          <span className="text-amber-400 mx-3 ff-flicker">→</span>
          <span className="text-stone-300">16 CO₂</span>
          <span className="text-stone-500"> + </span>
          <span className="text-stone-300">18 H₂O</span>
          <span className="text-stone-500"> + </span>
          <span className="text-rose-400 font-bold">energy</span>
        </div>
        <div className={`text-xs text-stone-500 mt-3 italic text-center ${isKh ? "font-khmer not-italic" : ""}`}>
          {isKh
            ? "ប្រេងសាំង + អុកស៊ីសែន → កាបោនឌីអុកស៊ីត + ទឹក + ថាមពល (ភាគច្រើនជាកំដៅ)"
            : "Petrol + oxygen → carbon dioxide + water + energy (mostly heat)"}
        </div>
      </div>

      <div className={`flex items-start gap-2 text-sm text-stone-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        <Zap className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400" />
        <span>
          {isKh
            ? "មានបញ្ហាមួយ៖ កាបោនឌីអុកស៊ីត (CO₂) ដែលត្រូវបានបញ្ចេញ កាន់តែច្រើននៅក្នុងបរិយាកាស ហើយចាប់យកកំដៅរបស់ព្រះអាទិត្យ — នេះជាមូលហេតុដែលការផ្លាស់ប្ដូរអាកាសធាតុកំពុងពន្លឿន។"
            : "There's a catch: the CO₂ released builds up in the atmosphere and traps the sun's heat — which is the reason climate change is accelerating."}
        </span>
      </div>
    </SteelCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  4. Price breakdown
// ════════════════════════════════════════════════════════════════════════════

function PriceBreakdown({ isKh }: { isKh: boolean }) {
  const PARTS = [
    {
      key: "crude",
      pct: 55,
      titleEn: "Crude oil cost",
      titleKh: "តម្លៃប្រេងឆៅ",
      bodyEn: "The biggest slice. Set globally by supply (OPEC+ production quotas, US shale, sanctions) and demand (winter heating, summer driving, recessions).",
      bodyKh: "ចំណែកធំបំផុត។ កំណត់ដោយផ្គត់ផ្គង់សកល (កូតាផលិតកម្មរបស់ OPEC+ ហ៊ីនស្គេស សហរដ្ឋអាមេរិក ការដាក់ទណ្ឌកម្ម) និងតម្រូវការ (កំដៅរដូវរងារ ការបើកបររដូវក្ដៅ វិបត្តិសេដ្ឋកិច្ច)។",
      icon: Globe2, color: "#f59e0b",
    },
    {
      key: "refining",
      pct: 18,
      titleEn: "Refining",
      titleKh: "ការចម្រាញ់",
      bodyEn: "Running the distillation tower 24/7 — energy, maintenance, workers, and the refinery's profit margin.",
      bodyKh: "ដំណើរការប៉មចម្រាញ់ ២៤ ម៉ោង / ៧ ថ្ងៃ — ថាមពល ការថែទាំ កម្មករ និងប្រាក់ចំណេញរបស់រោងចក្រ។",
      icon: Factory, color: "#fbbf24",
    },
    {
      key: "distribution",
      pct: 12,
      titleEn: "Shipping & distribution",
      titleKh: "ការដឹកជញ្ជូន និងការចែកចាយ",
      bodyEn: "Cambodia imports nearly all its refined fuel. Tankers, port fees, trucks from Sihanoukville to your village pump.",
      bodyKh: "កម្ពុជានាំចូលឥន្ធនៈចម្រាញ់ស្ទើរតែទាំងអស់។ កប៉ាល់ដឹកប្រេង កម្រៃកំពង់ផែ ឡានដឹកពីក្រុងព្រះសីហនុទៅស្ថានីយប្រេងភូមិរបស់អ្នក។",
      icon: Truck, color: "#60a5fa",
    },
    {
      key: "tax",
      pct: 15,
      titleEn: "Taxes & station markup",
      titleKh: "ពន្ធ និងតម្លៃបន្ថែមរបស់ស្ថានីយ",
      bodyEn: "Government excise + VAT, plus the petrol station's own margin. Cambodia's pump tax is lower than most ASEAN neighbours.",
      bodyKh: "ពន្ធរដ្ឋ + អាករ បូករួមនឹងប្រាក់ចំណេញរបស់ស្ថានីយប្រេង។ ពន្ធនៅស្ថានីយប្រេងរបស់កម្ពុជាទាបជាងប្រទេសភាគច្រើននៅអាស៊ាន។",
      icon: TrendingUp, color: "#a78bfa",
    },
  ];

  // Stable percentages should sum to 100; if rounding drifts, normalise.
  const total = PARTS.reduce((s, p) => s + p.pct, 0);

  return (
    <SteelCard className="p-5 sm:p-6">
      <CardHeader
        icon={TrendingUp}
        titleEn="Price-influencer breakdown"
        titleKh="ការបែងចែកអ្នកមានឥទ្ធិពលលើតម្លៃ"
        isKh={isKh}
      />

      {/* Stacked bar */}
      <div className="mb-4">
        <div className={`text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
          {isKh ? "១ លីត្រ ប្រេងសាំង = ១០០%" : "1 litre of petrol = 100%"}
        </div>
        <div className="flex h-12 rounded-lg overflow-hidden border border-stone-600 shadow-inner" role="img" aria-label={isKh ? "ការបែងចែកតម្លៃប្រេងសាំង" : "Gasoline price breakdown"}>
          {PARTS.map((p) => {
            const w = (p.pct / total) * 100;
            return (
              <div
                key={p.key}
                className="flex items-center justify-center text-xs font-bold text-stone-900 transition-all"
                style={{ width: `${w}%`, backgroundColor: p.color }}
                title={`${(isKh ? p.titleKh : p.titleEn)} · ${p.pct}%`}
              >
                {p.pct >= 10 && `${p.pct}%`}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PARTS.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.key} className="bg-stone-900/60 border border-stone-700 rounded-lg p-4 flex gap-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-1" style={{ backgroundColor: p.color }} />
              <div className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${p.color}25`, border: `1px solid ${p.color}55` }}>
                <Icon className="w-4 h-4" style={{ color: p.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <h4 className={`font-display font-bold text-sm text-stone-100 ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? p.titleKh : p.titleEn}
                  </h4>
                  <span className="font-mono font-bold text-sm" style={{ color: p.color }}>{p.pct}%</span>
                </div>
                <p className={`text-xs text-stone-400 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {isKh ? p.bodyKh : p.bodyEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`mt-4 flex items-start gap-2 text-sm text-stone-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400" />
        <span>
          {isKh
            ? "ប្រហែល ៧០% នៃតម្លៃនៅស្ថានីយប្រេងរបស់អ្នកត្រូវបានសម្រេចនៅខាងក្រៅប្រទេសកម្ពុជា — នេះជាមូលហេតុដែលការផ្លាស់ប្ដូរនៅតម្លៃប្រេងសាកល (សង្គ្រាមនៅអ៊ុយក្រែន ការសម្រេចរបស់ OPEC+) ប៉ះពាល់នឹងគ្រួសារនៅភ្នំពេញដោយផ្ទាល់។ តម្លៃ និងសមាមាត្រគឺគ្រាន់តែជាការបង្ហាញ — តម្លៃពិតប្រាកដផ្លាស់ប្ដូររាល់ខែ។"
            : "Roughly 70% of the price at your local pump is decided outside Cambodia — which is why a war in Ukraine or an OPEC+ vote shows up directly on a Phnom Penh family's weekly bill. The percentages above are illustrative; real values shift every month."}
        </span>
      </div>
    </SteelCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  5a. Asphalt origin — link to fractional distillation tower bottom
// ════════════════════════════════════════════════════════════════════════════

function AsphaltOrigin({ isKh }: { isKh: boolean }) {
  const uid = useId().replace(/:/g, "");
  const towerTitleId = `ff-asph-tower-t-${uid}`;
  const arrowId = `ff-asph-arrow-${uid}`;
  return (
    <SteelCard className="p-5 sm:p-6 ff-asphalt-surface">
      <CardHeader
        icon={ArrowDown}
        titleEn="The Origin — bottom of the barrel"
        titleKh="ប្រភពដើម — បាតធុង"
        isKh={isKh}
      />

      <div className="grid lg:grid-cols-[260px_1fr] gap-5 items-start">
        {/* Mini distillation tower with bottom-residue highlight */}
        <div className="bg-stone-950/80 rounded-lg border-2 border-amber-500/30 p-3">
          <svg viewBox="0 0 220 280" className="w-full h-auto block" role="img" aria-labelledby={towerTitleId}>
            <title id={towerTitleId}>{isKh ? "ប៉មចម្រាញ់ — សំណល់នៅបាត" : "Distillation tower — residue at the bottom"}</title>
            {/* tower body */}
            <rect x="70" y="20" width="80" height="220" rx="8" fill="#1c1917" stroke="#57534e" strokeWidth="1.5" />
            {/* fraction bands top→bottom: cool → hot */}
            {[
              { y: 28,  c: "#fde68a", lblEn: "Gas",      lblKh: "ហ្គាស" },
              { y: 60,  c: "#fbbf24", lblEn: "Gasoline", lblKh: "ប្រេងសាំង" },
              { y: 92,  c: "#f59e0b", lblEn: "Kerosene", lblKh: "ប្រេងកាត" },
              { y: 124, c: "#d97706", lblEn: "Diesel",   lblKh: "ម៉ាស៊ូត" },
              { y: 156, c: "#b45309", lblEn: "Lubricant",lblKh: "ប្រេងរំអិល" },
            ].map((f) => (
              <g key={f.lblEn}>
                <rect x="74" y={f.y} width="72" height="22" fill={f.c} opacity="0.55" />
                <text x="158" y={f.y + 15} fontSize="9" fill="#a8a29e" fontFamily={isKh ? "inherit" : "monospace"}>
                  {isKh ? f.lblKh : f.lblEn}
                </text>
              </g>
            ))}
            {/* bottom residue — bitumen — highlighted */}
            <rect x="74" y="190" width="72" height="46" fill="#0c0a09" stroke="#fbbf24" strokeWidth="2" className="ff-pulse" />
            <text x="110" y="216" fontSize="11" fontWeight="800" fill="#fbbf24" textAnchor="middle" fontFamily={isKh ? "inherit" : "sans-serif"}>
              {isKh ? "ប៊ីទុយម៉ែន" : "BITUMEN"}
            </text>
            <text x="110" y="230" fontSize="9" fill="#fbbf24" textAnchor="middle" opacity="0.85">
              ~400°C · C₃₀⁺
            </text>
            {/* arrow + caption */}
            <line x1="44" y1="213" x2="68" y2="213" stroke="#fbbf24" strokeWidth="1.5" markerEnd={`url(#${arrowId})`} />
            <defs>
              <marker id={arrowId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
              </marker>
            </defs>
            <text x="42" y="208" fontSize="9" fill="#fbbf24" textAnchor="end" fontFamily={isKh ? "inherit" : "sans-serif"}>
              {isKh ? "សំណល់" : "residue"}
            </text>
            {/* heat scale */}
            <text x="160" y="30"  fontSize="9" fill="#60a5fa">{isKh ? "ត្រជាក់" : "cool"} ↑</text>
            <text x="160" y="248" fontSize="9" fill="#fbbf24">{isKh ? "ក្ដៅ" : "hot"} ↓</text>
          </svg>
        </div>

        {/* Explanation */}
        <div className="space-y-3">
          <div className="bg-stone-900/70 border-l-4 border-yellow-400 rounded-r-lg p-4">
            <p className={`text-stone-200 text-sm ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "ត្រឡប់ទៅផ្នែកទី ០២ វិញ — ប៉មចម្រាញ់ដាច់ដោយផ្នែក។ បន្ទាប់ពី ហ្គាស ប្រេងសាំង ប្រេងកាត ម៉ាស៊ូត និងប្រេងរំអិលទាំងអស់ត្រូវបានពុះចេញ សំណល់ដ៏ឋិតល្អដែលនៅសល់នៅបាតប៉មគឺ ប៊ីទុយម៉ែន (ហៅផងដែរថា អាស្វាល)។ វាមិនពុះនៅសីតុណ្ហភាពធម្មតាទេ — យើងត្រូវចម្អិនវាដើម្បីឲ្យវាហូរ។"
                : "Go back to Section 02 — the fractional distillation tower. After the gas, gasoline, kerosene, diesel and lubricating oils have all been boiled off, the heavy black residue left at the bottom is bitumen (also called asphalt). It will not boil at normal temperatures — we have to cook it just to make it pour."}
            </p>
          </div>

          <div className="bg-yellow-400/10 border border-yellow-400/40 rounded-lg p-4">
            <div className={`flex items-center gap-2 text-yellow-300 text-xs font-bold uppercase tracking-widest mb-2 ${isKh ? "font-khmer tracking-normal normal-case text-sm" : ""}`}>
              <Sparkles className="w-3.5 h-3.5" />
              {isKh ? "ពន្លឺថ្ងៃបុរាណ" : "Ancient Sunlight"}
            </div>
            <p className={`text-stone-200 text-sm ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "រាល់ផ្លូវកៅស៊ូដែលអ្នកដើរលើ គឺពន្លឺថ្ងៃដែលបានប្រមូលផ្ដុំដោយជីវិតសមុទ្រកាលពី ៣០០ លានឆ្នាំមុន — ដែលត្រូវបានចម្អិន ច្របាច់ និងផ្ដុំក្នុងទម្រង់រឹង និងប្រមូលផ្ដុំបំផុតរបស់វា។ ផ្លូវរបស់អ្នកគឺជាហ្វូស៊ីលដែលត្រូវបានរៀបចំឡើងវិញ។"
                : "Every asphalt road you walk on is sunlight gathered by sea-life 300 million years ago — cooked, squeezed, and concentrated into its most solid, dense form. Your road is a re-arranged fossil."}
            </p>
          </div>
        </div>
      </div>
    </SteelCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  5b. Asphalt recipe — composition + process
// ════════════════════════════════════════════════════════════════════════════

function AsphaltRecipe({ isKh }: { isKh: boolean }) {
  const uid = useId().replace(/:/g, "");
  const mixTitleId = `ff-asph-mix-t-${uid}`;
  // Donut chart: 8% bitumen / 92% aggregate (typical mid-range)
  const BITUMEN = 8;
  const AGGREGATE = 100 - BITUMEN;
  const R = 70, C = 2 * Math.PI * R;
  const bitumenLen = (BITUMEN / 100) * C;

  return (
    <SteelCard className="p-5 sm:p-6">
      <CardHeader
        icon={Layers}
        titleEn="The Recipe — a road is not just oil"
        titleKh="រូបមន្ត — ផ្លូវមួយមិនមែនមានតែប្រេងទេ"
        isKh={isKh}
      />

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Donut + labels */}
        <div className="bg-stone-950 rounded-lg border border-stone-700 p-4">
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-56 h-56" role="img" aria-labelledby={mixTitleId}>
              <title id={mixTitleId}>{isKh ? "សមាសភាពនៃល្បាយកៅស៊ូ" : "Composition of the asphalt mix"}</title>
              {/* aggregate (large slice) */}
              <circle cx="100" cy="100" r={R} fill="none" stroke="#a8a29e" strokeWidth="28" />
              {/* bitumen (small slice) */}
              <circle
                cx="100" cy="100" r={R}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="28"
                strokeDasharray={`${bitumenLen} ${C - bitumenLen}`}
                strokeDashoffset={C / 4}
                transform="rotate(-90 100 100)"
              />
              <text x="100" y="96" textAnchor="middle" fontSize="18" fontWeight="800" fill="#fbbf24" fontFamily={isKh ? "inherit" : "sans-serif"}>
                {isKh ? "ផ្លូវ" : "ROAD"}
              </text>
              <text x="100" y="116" textAnchor="middle" fontSize="10" fill="#a8a29e">
                {isKh ? "ល្បាយពេញ" : "by weight"}
              </text>
            </svg>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3 bg-stone-900/70 border border-amber-500/40 rounded-lg p-3">
              <span className="w-4 h-4 rounded-sm bg-amber-400 flex-shrink-0" />
              <div className="flex-1">
                <div className={`text-stone-100 text-sm font-bold ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? "ប៊ីទុយម៉ែន (កាវចង)" : "Bitumen — the binder / glue"}
                </div>
                <div className="text-xs text-stone-400">5–10%</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-stone-900/70 border border-stone-600 rounded-lg p-3">
              <span className="w-4 h-4 rounded-sm bg-stone-400 flex-shrink-0" />
              <div className="flex-1">
                <div className={`text-stone-100 text-sm font-bold ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? "សារធាតុរឹង (ថ្មកំទេច ក្រួស ខ្សាច់)" : "Aggregate — crushed stone, gravel, sand"}
                </div>
                <div className="text-xs text-stone-400">90–95%</div>
              </div>
            </div>
            <p className={`text-xs text-stone-400 italic ${isKh ? "font-khmer not-italic leading-loose" : ""}`}>
              {isKh
                ? "ប៊ីទុយម៉ែនគ្រាន់តែជាកាវ — រឿងធំបំផុតនៅក្រោមកង់របស់អ្នក គឺថ្ម។"
                : "The bitumen is just the glue. The thing actually under your wheels is rock."}
            </p>
          </div>
        </div>

        {/* Process steps */}
        <div className="space-y-3">
          <div className={`text-xs uppercase tracking-widest text-yellow-400/90 font-bold ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
            {isKh ? "ដំណើរការចាក់ផ្លូវ" : "How a road is laid"}
          </div>

          {[
            {
              icon: Thermometer,
              titleEn: "1. Heat the mix",
              titleKh: "១. ដុតល្បាយ",
              bodyEn: "Bitumen and aggregate are heated together to about 150 °C in a mixing plant. At this temperature the bitumen flows like thick honey and coats every stone.",
              bodyKh: "ប៊ីទុយម៉ែន និងសារធាតុរឹងត្រូវបានដុតរួមគ្នាដល់ប្រហែល ១៥០ °C នៅរោងផលិត។ នៅសីតុណ្ហភាពនេះ ប៊ីទុយម៉ែនហូរដូចទឹកឃ្មុំក្រាស់ ហើយបិទគ្រប់គ្រាប់ថ្ម។",
            },
            {
              icon: Truck,
              titleEn: "2. Spread it hot",
              titleKh: "២. ចាក់វាពេលក្ដៅ",
              bodyEn: "A paver truck dumps the steaming mix and a screed pulls it flat behind it — a few centimetres thick across the full lane width.",
              bodyKh: "ឡានចាក់ផ្លូវចាក់ល្បាយក្ដៅ ហើយបន្ទះទាញនៅខាងក្រោយវាធ្វើឲ្យរាបស្មើ — ប្រហែលពីរបីសង់ទីម៉ែត្រក្រាស់ពេញទទឹងគន្លង។",
            },
            {
              icon: Hammer,
              titleEn: "3. Compact with rollers",
              titleKh: "៣. ច្របាច់ដោយរ៉ូល័រ",
              bodyEn: "Heavy steel rollers pass over the hot surface again and again, squeezing out the air. The road cools and locks the stones together — strong enough to carry a 40-tonne truck.",
              bodyKh: "រ៉ូល័រដែកធ្ងន់ៗរំកិលលើផ្ទៃក្ដៅជាច្រើនលើក រុញខ្យល់ចេញ។ ផ្លូវត្រជាក់ និងចាក់សោថ្មទាំងអស់ឲ្យជាប់គ្នា — រឹងមាំល្មមផ្ទុកឡានធុនធ្ងន់ ៤០ តោន។",
            },
          ].map(({ icon: Icon, titleEn, titleKh, bodyEn, bodyKh }) => (
            <div key={titleEn} className="flex gap-3 bg-stone-900/70 rounded-lg border border-stone-700 p-3">
              <div className="w-9 h-9 rounded-lg bg-yellow-400/15 border border-yellow-400/40 text-yellow-300 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-stone-100 text-sm font-bold mb-0.5 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? titleKh : titleEn}
                </div>
                <div className={`text-xs text-stone-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {isKh ? bodyKh : bodyEn}
                </div>
              </div>
            </div>
          ))}

          {/* Roller animation */}
          <div className="bg-stone-950 rounded-lg border border-stone-700 p-3 overflow-hidden relative">
            <svg viewBox="0 0 300 70" className="w-full h-12 block" role="img" aria-label={isKh ? "រ៉ូល័រកំពុងច្របាច់ផ្លូវ" : "Roller compacting fresh asphalt"}>
              {/* fresh asphalt strip */}
              <rect x="0" y="40" width="300" height="22" fill="#27272a" />
              <rect x="0" y="40" width="300" height="2"  fill="#3f3f46" />
              {/* yellow caution dashes */}
              {Array.from({ length: 10 }).map((_, i) => (
                <rect key={i} x={10 + i * 30} y={50} width={14} height={3} fill="#fbbf24" opacity="0.7" />
              ))}
              {/* roller */}
              <g className="ff-roll">
                <circle cx="40" cy="36" r="20" fill="#1c1917" stroke="#fbbf24" strokeWidth="1.5" />
                <circle cx="40" cy="36" r="14" fill="none" stroke="#57534e" strokeWidth="1" />
                <line x1="40" y1="22" x2="40" y2="50" stroke="#57534e" strokeWidth="1" className="ff-spin-slow" style={{ transformOrigin: "40px 36px" }} />
                <rect x="20" y="6" width="40" height="14" fill="#fbbf24" rx="2" />
                <rect x="22" y="8" width="36" height="10" fill="#1c1917" rx="1" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </SteelCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  5c. Global Roadway Dashboard
// ════════════════════════════════════════════════════════════════════════════

function RoadwayDashboard({ isKh }: { isKh: boolean }) {
  const uid = useId().replace(/:/g, "");
  const equatorTitleId = `ff-equator-t-${uid}`;
  const EARTH_CIRC_KM = 40075;
  const TOTAL_ROAD_KM = 64_000_000;
  const wraps = Math.round(TOTAL_ROAD_KM / EARTH_CIRC_KM); // ~1597

  return (
    <SteelCard className="p-5 sm:p-6 ff-asphalt-surface">
      <CardHeader
        icon={Globe2}
        titleEn="Global Roadway Dashboard"
        titleKh="ផ្ទាំងព័ត៌មានផ្លូវសាកល"
        isKh={isKh}
      />

      <div className="grid sm:grid-cols-3 gap-3 mb-5">
        {/* Stat 1: total km */}
        <div className="bg-stone-950 rounded-lg border-2 border-yellow-400/50 p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-400/5 rounded-full blur-xl" />
          <div className={`text-[10px] uppercase tracking-widest text-yellow-400 font-bold mb-1 ${isKh ? "font-khmer tracking-normal normal-case text-xs" : ""}`}>
            {isKh ? "ផ្លូវសាកលសរុប" : "Total Global Roads"}
          </div>
          <div className="font-display font-black text-3xl sm:text-4xl text-stone-50 tabular-nums leading-none">
            64M
          </div>
          <div className={`text-xs text-stone-400 mt-1 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "គីឡូម៉ែត្រ (~៤០ លានម៉ាយ)" : "kilometres (~40 million miles)"}
          </div>
          <Route className="absolute bottom-2 right-2 w-7 h-7 text-yellow-400/20" />
        </div>

        {/* Stat 2: equator wraps */}
        <div className="bg-stone-950 rounded-lg border-2 border-yellow-400/50 p-4 relative overflow-hidden">
          <div className={`text-[10px] uppercase tracking-widest text-yellow-400 font-bold mb-1 ${isKh ? "font-khmer tracking-normal normal-case text-xs" : ""}`}>
            {isKh ? "រុំជុំវិញខ្សែអេក្វាទ័រ" : "Equator wraps"}
          </div>
          <div className="font-display font-black text-3xl sm:text-4xl text-stone-50 tabular-nums leading-none">
            ~1,600×
          </div>
          <div className={`text-xs text-stone-400 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? "ខ្សែអេក្វាទ័រ = ៤០.០៧៥ គម" : "equator ≈ 40,075 km"}
          </div>
          <Globe2 className="absolute bottom-2 right-2 w-7 h-7 text-yellow-400/20" />
        </div>

        {/* Stat 3: circulatory metaphor */}
        <div className="bg-stone-950 rounded-lg border-2 border-yellow-400/50 p-4 relative overflow-hidden">
          <div className={`text-[10px] uppercase tracking-widest text-yellow-400 font-bold mb-1 ${isKh ? "font-khmer tracking-normal normal-case text-xs" : ""}`}>
            {isKh ? "ប្រព័ន្ធ​ឈាមរត់" : "Circulatory system"}
          </div>
          <div className={`font-display font-black text-2xl sm:text-3xl text-stone-50 leading-tight ${isKh ? "font-khmer text-xl" : ""}`}>
            {isKh ? "នៃអរិយធម៌" : "of civilisation"}
          </div>
          <div className={`text-xs text-stone-400 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? "អាហារ · ឱសថ · មនុស្ស" : "food · medicine · people"}
          </div>
          <Heart className="absolute bottom-2 right-2 w-7 h-7 text-red-400/30 ff-pulse" />
        </div>
      </div>

      {/* Equator visual */}
      <div className="bg-stone-950 rounded-lg border border-stone-700 p-4 mb-4">
        <svg viewBox="0 0 600 140" className="w-full h-auto block" role="img" aria-labelledby={equatorTitleId}>
          <title id={equatorTitleId}>{isKh ? "ផ្លូវរុំជុំវិញផែនដី ១.៦០០ ដង" : "Roads wrap the Earth's equator about 1,600 times"}</title>
          {/* earth */}
          <circle cx="90" cy="70" r="48" fill="#1e3a8a" />
          <ellipse cx="90" cy="70" rx="48" ry="6" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
          <path d="M 60 50 Q 80 45 100 55 T 130 60 M 65 90 Q 90 85 115 92" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85" />
          <text x="90" y="135" textAnchor="middle" fontSize="10" fill="#a8a29e" fontFamily={isKh ? "inherit" : "sans-serif"}>
            {isKh ? "ផែនដី" : "Earth"}
          </text>

          {/* coiled "rope" of road wrapping around — represented as nested ellipses */}
          <g transform="translate(330,70)">
            {Array.from({ length: 18 }).map((_, i) => (
              <ellipse
                key={i}
                cx="0"
                cy={-30 + i * 4}
                rx={120 - i * 1.5}
                ry={5 - i * 0.15}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="0.8"
                opacity={0.25 + (i / 18) * 0.5}
              />
            ))}
            <text x="0" y={-50} textAnchor="middle" fontSize="11" fontWeight="800" fill="#fbbf24" fontFamily={isKh ? "inherit" : "sans-serif"}>
              {isKh ? "៦៤ លានគីឡូម៉ែត្រនៃកៅស៊ូ" : "64,000,000 km of asphalt"}
            </text>
            <text x="0" y={62} textAnchor="middle" fontSize="9" fill="#a8a29e">
              {isKh ? "≈ ១.៦០០ ជុំ" : "≈ 1,600 wraps"}
            </text>
          </g>

          {/* connector line */}
          <line x1="138" y1="70" x2="200" y2="70" stroke="#fbbf24" strokeDasharray="4 3" strokeWidth="1" />
        </svg>
      </div>

      <div className={`flex items-start gap-2 text-sm text-stone-200 bg-stone-900/70 border-l-4 border-red-400 rounded-r-lg p-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        <Heart className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
        <span>
          {isKh
            ? "ផ្លូវកៅស៊ូទាំង ៦៤ លានគីឡូម៉ែត្រនេះ គឺជា ប្រព័ន្ធឈាមរត់នៃអរិយធម៌មនុស្ស។ ពួកវាអនុញ្ញាតឲ្យអាហារទៅដល់ទីផ្សារ ឱសថទៅដល់មន្ទីរពេទ្យ និងសិស្សទៅដល់សាលា។ បើគ្មានកាវធ្ងន់ដែលដួលនៅបាតប៉មចម្រាញ់ ពិភពលោកសម័យទំនើបនឹងបាត់បង់ផ្លូវរត់ត្រឡប់របស់ខ្លួន។"
            : "These 64 million kilometres of asphalt are the circulatory system of human civilisation. They let food reach markets, medicine reach hospitals, and students reach school. Without the heavy glue that drips out of the bottom of the refinery tower, the modern world loses its arteries."}
        </span>
      </div>
    </SteelCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Scoped styles
// ════════════════════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════════════════════
//  6. Rubber & Tires
// ════════════════════════════════════════════════════════════════════════════

function RubberTypesCard({ isKh }: { isKh: boolean }) {
  return (
    <SteelCard className="p-6 sm:p-8" data-testid="rubber-types">
      <CardHeader
        icon={Layers}
        titleEn="The Two Types of Rubber"
        titleKh="ប្រភេទកៅស៊ូទាំងពីរ"
        isKh={isKh}
      />
      <p className={`text-stone-300 text-sm mb-5 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "កៅស៊ូដែលនៅជុំវិញយើងសព្វថ្ងៃ មានពីរប្រភេទ — មួយចេញពីដើមឈើ មួយទៀតចេញពីប្រេងឆៅ។ សំបកកង់ទំនើបជាការលាយរបស់ទាំងពីរ។"
          : "The rubber around us today comes in two flavours — one grown on a tree, one squeezed out of crude oil. A modern tire is a blend of both."}
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Natural rubber */}
        <div
          className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-5"
          data-testid="natural-rubber"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center">
              <Trees className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`font-display font-bold text-stone-50 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "កៅស៊ូធម្មជាតិ" : "Natural Rubber"}
              </h4>
              <p className="text-emerald-300/80 text-xs uppercase tracking-widest font-bold">
                {isKh ? "ពីដើមឈើ" : "From a tree"}
              </p>
            </div>
          </div>

          {/* Mini SVG: rubber tree with latex drip */}
          <svg viewBox="0 0 220 130" className="w-full h-32 mb-3" aria-hidden="true">
            <defs>
              <linearGradient id="rt-canopy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>
            {/* ground */}
            <rect x="0" y="115" width="220" height="15" fill="#44403c" />
            {/* trunk */}
            <rect x="60" y="55" width="14" height="62" fill="#78350f" />
            {/* diagonal cut */}
            <line x1="58" y1="78" x2="76" y2="68" stroke="#fbbf24" strokeWidth="2" />
            {/* canopy */}
            <ellipse cx="67" cy="42" rx="42" ry="32" fill="url(#rt-canopy)" />
            {/* latex bucket */}
            <path d="M 56 92 L 78 92 L 76 110 L 58 110 Z" fill="#1c1917" stroke="#a8a29e" strokeWidth="1" />
            <ellipse cx="67" cy="92" rx="11" ry="2.4" fill="#f5f5f4" />
            {/* drip */}
            <circle cx="67" cy="86" r="2" fill="#f5f5f4" className="ff-pulse" />
            {/* label arrow */}
            <line x1="100" y1="96" x2="135" y2="96" stroke="#a8a29e" strokeWidth="1" />
            <polygon points="100,96 106,93 106,99" fill="#a8a29e" />
            <text x="138" y="92" fill="#f5f5f4" fontSize="10" fontFamily="monospace">{isKh ? "ជ័រ" : "latex"}</text>
            <text x="138" y="104" fill="#a8a29e" fontSize="9" fontFamily="monospace">{isKh ? "ជ័រស" : "white sap"}</text>
          </svg>

          <ul className={`space-y-2 text-stone-200 text-sm ${isKh ? "font-khmer leading-loose" : ""}`}>
            <li className="flex gap-2">
              <span className="text-emerald-400 font-bold">·</span>
              <span>
                {isKh
                  ? "មកពីជ័រស ( latex / ជ័រ ) នៃដើមកៅស៊ូ Hevea brasiliensis។"
                  : "Comes from the white sap (latex / ជ័រ) of the Hevea brasiliensis tree."}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-400 font-bold">·</span>
              <span>
                {isKh
                  ? "កម្ពុជានាំចេញកៅស៊ូជាង ៤០០.០០០ តោនក្នុងមួយឆ្នាំ — ផលិតផលកសិកម្មសំខាន់មួយ។"
                  : "Cambodia exports over 400,000 tonnes per year — a major agricultural product."}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-400 font-bold">·</span>
              <span>
                {isKh
                  ? "ផលិតករត្រូវរោទ៍សំបកដើមឈើ ហើយយកជ័រស្រក់ចូលក្នុងពែងនីមួយៗរាល់ព្រឹក។"
                  : "Farmers cut a thin diagonal stripe in the bark and collect the dripping latex in a cup each morning."}
              </span>
            </li>
          </ul>
        </div>

        {/* Synthetic rubber */}
        <div
          className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-5"
          data-testid="synthetic-rubber"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`font-display font-bold text-stone-50 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "កៅស៊ូសំយោគ" : "Synthetic Rubber"}
              </h4>
              <p className="text-amber-300/80 text-xs uppercase tracking-widest font-bold">
                {isKh ? "ពីប្រេងឆៅ" : "From crude oil"}
              </p>
            </div>
          </div>

          {/* Mini SVG: oil → factory → rubber pellets */}
          <svg viewBox="0 0 220 130" className="w-full h-32 mb-3" aria-hidden="true">
            {/* ground */}
            <rect x="0" y="115" width="220" height="15" fill="#44403c" />
            {/* oil barrel */}
            <rect x="14" y="74" width="36" height="40" fill="#1c1917" stroke="#fbbf24" strokeWidth="1.5" rx="2" />
            <rect x="14" y="80" width="36" height="3" fill="#fbbf24" opacity="0.6" />
            <rect x="14" y="100" width="36" height="3" fill="#fbbf24" opacity="0.6" />
            <text x="32" y="135" fill="#fbbf24" fontSize="9" fontFamily="monospace" textAnchor="middle">{isKh ? "ប្រេង" : "oil"}</text>
            {/* arrow */}
            <line x1="55" y1="92" x2="78" y2="92" stroke="#a8a29e" strokeWidth="1.5" />
            <polygon points="78,92 73,89 73,95" fill="#a8a29e" />
            {/* factory */}
            <rect x="82" y="60" width="60" height="55" fill="#292524" stroke="#a8a29e" strokeWidth="1.5" />
            <polygon points="82,60 112,42 142,60" fill="#1c1917" stroke="#a8a29e" strokeWidth="1.5" />
            <rect x="118" y="35" width="8" height="25" fill="#1c1917" stroke="#a8a29e" strokeWidth="1" />
            <ellipse cx="122" cy="32" rx="6" ry="3" fill="#a8a29e" opacity="0.5" className="ff-pulse" />
            <ellipse cx="122" cy="26" rx="8" ry="4" fill="#a8a29e" opacity="0.3" className="ff-pulse" />
            <rect x="92" y="78" width="10" height="10" fill="#fbbf24" opacity="0.6" />
            <rect x="108" y="78" width="10" height="10" fill="#fbbf24" opacity="0.6" />
            <rect x="124" y="78" width="10" height="10" fill="#fbbf24" opacity="0.6" />
            {/* arrow */}
            <line x1="148" y1="92" x2="171" y2="92" stroke="#a8a29e" strokeWidth="1.5" />
            <polygon points="171,92 166,89 166,95" fill="#a8a29e" />
            {/* rubber pellets */}
            <circle cx="180" cy="100" r="4" fill="#1c1917" />
            <circle cx="190" cy="105" r="4" fill="#1c1917" />
            <circle cx="200" cy="100" r="4" fill="#1c1917" />
            <circle cx="195" cy="95" r="4" fill="#1c1917" />
            <circle cx="185" cy="93" r="4" fill="#1c1917" />
            <text x="190" y="125" fill="#fbbf24" fontSize="9" fontFamily="monospace" textAnchor="middle">{isKh ? "កៅស៊ូ" : "rubber"}</text>
          </svg>

          <ul className={`space-y-2 text-stone-200 text-sm ${isKh ? "font-khmer leading-loose" : ""}`}>
            <li className="flex gap-2">
              <span className="text-amber-400 font-bold">·</span>
              <span>
                {isKh
                  ? "ពិភពលោកត្រូវការកៅស៊ូច្រើនជាងដើមឈើអាចផលិតបាន។"
                  : "The world needs more rubber than trees can produce."}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-400 font-bold">·</span>
              <span>
                {isKh
                  ? "អ្នកគីមីវិទូយកសារធាតុ ( butadiene · styrene ) ដែលទាញចេញពីប្រេងឆៅ ហើយផ្សំវានៅរោងចក្រ។"
                  : "Chemists take molecules (butadiene · styrene) pulled from crude oil and link them together in a factory."}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-400 font-bold">·</span>
              <span>
                {isKh
                  ? "សំបកកង់ទំនើបគឺជាល្បាយ — ប្រហែល ៤០% ធម្មជាតិ ៦០% សំយោគ។"
                  : "A modern tire is a blend — roughly 40% natural, 60% synthetic."}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </SteelCard>
  );
}

/* ── Card 2: Vulcanization (baking) ────────────────────────────────────── */
function VulcanizationCard({ isKh }: { isKh: boolean }) {
  const [stage, setStage] = useState<"raw" | "baked">("raw");

  return (
    <SteelCard className="p-6 sm:p-8" data-testid="vulcanization">
      <CardHeader
        icon={Flame}
        titleEn="Baking a Tire — Vulcanization"
        titleKh="ការដុតកម្ដៅសំបកកង់ — Vulcanization"
        isKh={isKh}
      />
      <p className={`text-stone-300 text-sm mb-5 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "កៅស៊ូឆៅមានបញ្ហាធំ ៖ វាស្អិតពេកនៅរដូវក្ដៅ និងផុយពេកនៅរដូវត្រជាក់។ ដំណោះស្រាយ — ដាក់ស្ពាន់ធ័រ ( sulfur ) ហើយ “ដុតកម្ដៅ” វា។ ម៉ូលេគុលនឹងភ្ជាប់គ្នា ហើយក្លាយជាខ្លាំងហើយធន់នឹងអាកាសធាតុ។"
          : "Raw rubber has a big problem: it's sticky in the heat and brittle in the cold. The fix — add sulfur and 'bake' it. The molecules lock together and become tough and weather-proof."}
      </p>

      {/* Toggle */}
      <div className="flex gap-2 mb-5">
        <button
          type="button"
          onClick={() => setStage("raw")}
          data-testid="vulc-toggle-raw"
          className={`flex-1 py-3 rounded-lg border-2 font-bold text-sm uppercase tracking-widest transition-all ${
            stage === "raw"
              ? "bg-stone-700 border-stone-500 text-stone-50"
              : "bg-stone-900/40 border-stone-700 text-stone-400 hover:text-stone-200"
          } ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}
        >
          {isKh ? "កៅស៊ូឆៅ" : "Raw rubber"}
        </button>
        <button
          type="button"
          onClick={() => setStage("baked")}
          data-testid="vulc-toggle-baked"
          className={`flex-1 py-3 rounded-lg border-2 font-bold text-sm uppercase tracking-widest transition-all ${
            stage === "baked"
              ? "bg-amber-500/20 border-amber-500 text-amber-200"
              : "bg-stone-900/40 border-stone-700 text-stone-400 hover:text-stone-200"
          } ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}
        >
          {isKh ? "កៅស៊ូដុតកម្ដៅ ( + ស្ពាន់ធ័រ )" : "Baked rubber ( + sulfur )"}
        </button>
      </div>

      {/* Molecule diagram */}
      <div className="rounded-xl bg-stone-900/60 border border-stone-700 p-4 mb-4">
        <svg viewBox="0 0 480 200" className="w-full h-48" aria-hidden="true" data-testid="vulc-molecules">
          {/* 4 long polymer chains */}
          {[0, 1, 2, 3].map((row) => {
            const y = 30 + row * 45;
            return (
              <g key={row}>
                <polyline
                  points={Array.from({ length: 13 }, (_, i) => `${20 + i * 36},${y + (i % 2 === 0 ? 0 : 8)}`).join(" ")}
                  fill="none"
                  stroke={stage === "baked" ? "#fbbf24" : "#a8a29e"}
                  strokeWidth="3"
                />
                {Array.from({ length: 13 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={20 + i * 36}
                    cy={y + (i % 2 === 0 ? 0 : 8)}
                    r="5"
                    fill={stage === "baked" ? "#fbbf24" : "#d6d3d1"}
                  />
                ))}
              </g>
            );
          })}
          {/* sulfur cross-links — only when baked */}
          {stage === "baked" &&
            [
              { x: 56, y1: 30, y2: 75 },
              { x: 164, y1: 75, y2: 120 },
              { x: 272, y1: 30, y2: 75 },
              { x: 380, y1: 120, y2: 165 },
              { x: 128, y1: 120, y2: 165 },
              { x: 308, y1: 75, y2: 120 },
            ].map((bond, i) => (
              <g key={i}>
                <line
                  x1={bond.x}
                  y1={bond.y1 + 8}
                  x2={bond.x}
                  y2={bond.y2}
                  stroke="#facc15"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                />
                <circle cx={bond.x} cy={(bond.y1 + bond.y2) / 2 + 4} r="6" fill="#fde047" stroke="#a16207" strokeWidth="1.5" />
                <text
                  x={bond.x}
                  y={(bond.y1 + bond.y2) / 2 + 7}
                  fill="#78350f"
                  fontSize="8"
                  fontFamily="monospace"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  S
                </text>
              </g>
            ))}
          {/* legend */}
          <text x="20" y="195" fill="#a8a29e" fontSize="11" fontFamily={isKh ? "inherit" : "monospace"} className={isKh ? "font-khmer" : ""}>
            {stage === "raw"
              ? isKh
                ? "ខ្សែកៅស៊ូវែង រអិលឆ្លងគ្នា"
                : "long rubber chains slip past each other"
              : isKh
              ? "ស្ពាន់ធ័រ ( S ) ភ្ជាប់ខ្សែទាំងអស់គ្នា"
              : "sulfur (S) bridges lock the chains together"}
          </text>
        </svg>
      </div>

      {/* Property compare */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-sky-500/40 bg-sky-500/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Snowflake className="w-4 h-4 text-sky-300" />
            <span className={`text-sky-200 text-xs font-bold uppercase tracking-widest ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
              {isKh ? "នៅរដូវត្រជាក់" : "In cold weather"}
            </span>
          </div>
          <p className={`text-stone-200 text-sm ${isKh ? "font-khmer leading-loose" : ""}`} data-testid="vulc-cold-result">
            {stage === "raw"
              ? isKh
                ? "ផុយ — បាក់ដូចកញ្ចក់។"
                : "Brittle — snaps like glass."
              : isKh
              ? "នៅតែទន់ងាយបត់បែន។"
              : "Stays soft and flexible."}
          </p>
        </div>
        <div className="rounded-lg border border-rose-500/40 bg-rose-500/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-4 h-4 text-rose-300" />
            <span className={`text-rose-200 text-xs font-bold uppercase tracking-widest ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
              {isKh ? "នៅរដូវក្ដៅ" : "In hot weather"}
            </span>
          </div>
          <p className={`text-stone-200 text-sm ${isKh ? "font-khmer leading-loose" : ""}`} data-testid="vulc-hot-result">
            {stage === "raw"
              ? isKh
                ? "ស្អិត និងរលាយ — ដូចស្ករកៅស៊ូ។"
                : "Sticky and melting — like chewing gum."
              : isKh
              ? "រឹង រក្សារូបរាង ធន់នឹងការសឹក។"
              : "Firm, holds its shape, resists wear."}
          </p>
        </div>
      </div>

      <div className={`mt-5 rounded-lg border-l-4 border-amber-500 bg-stone-900/60 p-4 text-sm text-stone-200 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        <span className="text-amber-300 font-bold">
          {isKh ? "ការពិតប្រវត្តិសាស្ត្រ ៖ " : "History fact: "}
        </span>
        {isKh
          ? "Charles Goodyear បានរកឃើញដំណើរការនេះដោយចៃដន្យក្នុងឆ្នាំ ១៨៣៩ — គាត់ទម្លាក់ល្បាយកៅស៊ូ + ស្ពាន់ធ័រលើឡានៅផ្ទះបាយ។ ផ្លាកសញ្ញាសំបកកង់ Goodyear ឥឡូវនេះ ដាក់ឈ្មោះតាមគាត់។"
          : "Charles Goodyear discovered this process by accident in 1839 — he dropped a rubber-and-sulfur mix on a hot stove. The Goodyear tire brand today is named after him."}
      </div>
    </SteelCard>
  );
}

/* ── Card 3: Tire anatomy infographic ─────────────────────────────────── */
function TireAnatomyCard({ isKh }: { isKh: boolean }) {
  const [hover, setHover] = useState<string | null>(null);

  const layers: { id: string; en: string; kh: string; color: string; descEn: string; descKh: string }[] = [
    {
      id: "tread",
      en: "Tread (the part that touches the road)",
      kh: "ផ្ទៃខាងក្រៅ ( ជាន់នឹងផ្លូវ )",
      color: "#1c1917",
      descEn: "Tough rubber with deep grooves to grip the road and push water away.",
      descKh: "កៅស៊ូរឹង មានគ្រឡុកជ្រៅៗ សម្រាប់ចាប់ផ្លូវ និងរុញទឹកចេញ។",
    },
    {
      id: "belt",
      en: "Steel belts",
      kh: "ខ្សែដែក",
      color: "#9ca3af",
      descEn: "Two crossed layers of steel wire that stop the tread from stretching.",
      descKh: "ខ្សែដែកពីរស្រទាប់ឆ្លងគ្នា ជួយកុំឲ្យផ្ទៃខាងក្រៅពង្រីកលូត។",
    },
    {
      id: "nylon",
      en: "Nylon cap ply",
      kh: "ស្រទាប់ Nylon",
      color: "#fde047",
      descEn: "A wrap of nylon fabric that holds everything together at high speed.",
      descKh: "ស្រទាប់ក្រណាត់ Nylon ជួយរក្សារូបរាងពេលរត់លឿន។",
    },
    {
      id: "body",
      en: "Body ply (rubber + polyester)",
      kh: "តួសំបក ( កៅស៊ូ + Polyester )",
      color: "#44403c",
      descEn: "The main rubber body, reinforced with polyester threads, that gives the tire its shape.",
      descKh: "តួកៅស៊ូសំខាន់ ជាមួយខ្សែ Polyester ដែលផ្ដល់រូបរាងដល់សំបកកង់។",
    },
    {
      id: "inner",
      en: "Inner liner (holds air)",
      kh: "ស្រទាប់ក្នុង ( រក្សាខ្យល់ )",
      color: "#78716c",
      descEn: "An airtight rubber lining that does the job of an old-fashioned inner tube.",
      descKh: "ស្រទាប់កៅស៊ូបិទជិតខ្យល់ ជំនួសបំពង់ខ្យល់ខាងក្នុងបុរាណ។",
    },
    {
      id: "bead",
      en: "Bead (locks tire to wheel)",
      kh: "គែម ( ភ្ជាប់ទៅកង់ដែក )",
      color: "#52525b",
      descEn: "A loop of high-strength steel wire that clamps the tire onto the metal wheel.",
      descKh: "រង្វង់ខ្សែដែករឹង ដែលបង្ខាំងសំបកកង់ទៅនឹងកង់ដែក។",
    },
  ];

  return (
    <SteelCard className="p-6 sm:p-8" data-testid="tire-anatomy">
      <CardHeader
        icon={Disc3}
        titleEn="Inside a Tire — Cross-Section"
        titleKh="ខាងក្នុងសំបកកង់ — ផ្នែកកាត់"
        isKh={isKh}
      />
      <p className={`text-stone-300 text-sm mb-5 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "សំបកកង់មួយមិនមែនជាដុំកៅស៊ូទេ — វាមានជិត ២០ ស្រទាប់នៃកៅស៊ូ ខ្សែដែក និងក្រណាត់ Nylon ភ្ជាប់ជាមួយគ្នា។ ផ្អៀលលើស្រទាប់នីមួយៗដើម្បីមើលអ្វីខ្លះនៅខាងក្នុង។"
          : "A tire isn't a single lump of rubber — it's nearly 20 layers of rubber, steel and nylon stacked together. Hover any layer to see what it does."}
      </p>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-start">
        {/* SVG cross-section */}
        <div className="rounded-xl bg-stone-900/60 border border-stone-700 p-4">
          <svg viewBox="0 0 360 280" className="w-full h-auto" data-testid="tire-cross-section">
            {/* outer tire silhouette: rounded rectangle (cross-section of a tire) */}
            {/* tread */}
            <path
              d="M 60 40 L 300 40 Q 320 40 320 60 L 320 90 L 40 90 L 40 60 Q 40 40 60 40 Z"
              fill={hover === "tread" ? "#292524" : layers[0].color}
              stroke={hover === "tread" ? "#facc15" : "#000"}
              strokeWidth={hover === "tread" ? "3" : "1"}
              onMouseEnter={() => setHover("tread")}
              onMouseLeave={() => setHover(null)}
              data-testid="layer-tread"
              style={{ cursor: "pointer" }}
            />
            {/* tread grooves on top */}
            <rect x="90" y="32" width="14" height="10" fill="#0a0a0a" />
            <rect x="140" y="32" width="14" height="10" fill="#0a0a0a" />
            <rect x="190" y="32" width="14" height="10" fill="#0a0a0a" />
            <rect x="240" y="32" width="14" height="10" fill="#0a0a0a" />

            {/* steel belts */}
            <rect
              x="40"
              y="92"
              width="280"
              height="14"
              fill={hover === "belt" ? "#d4d4d8" : layers[1].color}
              stroke={hover === "belt" ? "#facc15" : "#000"}
              strokeWidth={hover === "belt" ? "3" : "1"}
              onMouseEnter={() => setHover("belt")}
              onMouseLeave={() => setHover(null)}
              data-testid="layer-belt"
              style={{ cursor: "pointer" }}
            />
            {/* belt cross-hatch */}
            <g opacity="0.5" pointerEvents="none">
              {Array.from({ length: 28 }).map((_, i) => (
                <line key={i} x1={40 + i * 10} y1={92} x2={50 + i * 10} y2={106} stroke="#000" strokeWidth="0.7" />
              ))}
            </g>

            {/* nylon */}
            <rect
              x="40"
              y="108"
              width="280"
              height="10"
              fill={hover === "nylon" ? "#fef08a" : layers[2].color}
              stroke={hover === "nylon" ? "#facc15" : "#a16207"}
              strokeWidth={hover === "nylon" ? "3" : "1"}
              onMouseEnter={() => setHover("nylon")}
              onMouseLeave={() => setHover(null)}
              data-testid="layer-nylon"
              style={{ cursor: "pointer" }}
            />

            {/* body ply (sidewalls) */}
            <path
              d="M 40 118 L 320 118 L 320 220 Q 320 240 300 240 L 60 240 Q 40 240 40 220 Z"
              fill={hover === "body" ? "#57534e" : layers[3].color}
              stroke={hover === "body" ? "#facc15" : "#000"}
              strokeWidth={hover === "body" ? "3" : "1"}
              onMouseEnter={() => setHover("body")}
              onMouseLeave={() => setHover(null)}
              data-testid="layer-body"
              style={{ cursor: "pointer" }}
            />

            {/* inner liner */}
            <rect
              x="50"
              y="220"
              width="260"
              height="12"
              fill={hover === "inner" ? "#a8a29e" : layers[4].color}
              stroke={hover === "inner" ? "#facc15" : "#000"}
              strokeWidth={hover === "inner" ? "3" : "1"}
              onMouseEnter={() => setHover("inner")}
              onMouseLeave={() => setHover(null)}
              data-testid="layer-inner"
              style={{ cursor: "pointer" }}
            />

            {/* beads */}
            <circle
              cx="55"
              cy="245"
              r="9"
              fill={hover === "bead" ? "#71717a" : layers[5].color}
              stroke={hover === "bead" ? "#facc15" : "#000"}
              strokeWidth={hover === "bead" ? "3" : "1.5"}
              onMouseEnter={() => setHover("bead")}
              onMouseLeave={() => setHover(null)}
              data-testid="layer-bead"
              style={{ cursor: "pointer" }}
            />
            <circle
              cx="305"
              cy="245"
              r="9"
              fill={hover === "bead" ? "#71717a" : layers[5].color}
              stroke={hover === "bead" ? "#facc15" : "#000"}
              strokeWidth={hover === "bead" ? "3" : "1.5"}
              onMouseEnter={() => setHover("bead")}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            />
            {/* wheel rim hint */}
            <rect x="30" y="252" width="300" height="14" fill="#3f3f46" stroke="#000" strokeWidth="1" />
            <text x="180" y="276" fill="#a1a1aa" fontSize="11" fontFamily={isKh ? "inherit" : "monospace"} textAnchor="middle" className={isKh ? "font-khmer" : ""}>
              {isKh ? "កង់ដែក" : "metal wheel"}
            </text>

            {/* "ROAD" arrow above tread */}
            <text x="180" y="20" fill="#facc15" fontSize="10" fontFamily={isKh ? "inherit" : "monospace"} textAnchor="middle" fontWeight="bold" className={isKh ? "font-khmer" : ""}>
              {isKh ? "↓ ផ្លូវ ↓" : "↓ ROAD ↓"}
            </text>
          </svg>
        </div>

        {/* Layer legend */}
        <ul className="space-y-2" data-testid="tire-anatomy-legend">
          {layers.map((l) => {
            const active = hover === l.id;
            return (
              <li
                key={l.id}
                onMouseEnter={() => setHover(l.id)}
                onMouseLeave={() => setHover(null)}
                data-testid={`legend-${l.id}`}
                className={`rounded-lg border-2 p-3 transition-all cursor-pointer ${
                  active
                    ? "border-amber-500 bg-amber-500/10"
                    : "border-stone-700 bg-stone-900/40 hover:border-stone-500"
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className="w-5 h-5 rounded border border-stone-500 flex-shrink-0"
                    style={{ background: l.color }}
                  />
                  <span className={`font-bold text-stone-50 text-sm ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? l.kh : l.en}
                  </span>
                </div>
                <p className={`text-stone-300 text-xs pl-8 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {isKh ? l.descKh : l.descEn}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </SteelCard>
  );
}

/* ── Card 4: When to change a tire (vocational) ────────────────────────── */
function TireSafetyCard({ isKh }: { isKh: boolean }) {
  const [tread, setTread] = useState<number>(8); // mm

  const status =
    tread >= 4
      ? { en: "SAFE", kh: "សុវត្ថិភាព", color: "#22c55e", bg: "rgba(34,197,94,0.12)", border: "#16a34a" }
      : tread >= 3
      ? { en: "MONITOR", kh: "តាមដាន", color: "#facc15", bg: "rgba(250,204,21,0.12)", border: "#ca8a04" }
      : tread >= 1.7
      ? { en: "REPLACE SOON", kh: "ត្រូវផ្លាស់ឆាប់ៗ", color: "#fb923c", bg: "rgba(251,146,60,0.12)", border: "#ea580c" }
      : { en: "BALD — DANGEROUS", kh: "ដាច់គ្រឡុក — គ្រោះថ្នាក់", color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "#dc2626" };

  return (
    <SteelCard className="p-6 sm:p-8" data-testid="tire-safety">
      <CardHeader
        icon={ShieldAlert}
        titleEn="Vocational Skill: When to Change a Tire"
        titleKh="ជំនាញវិជ្ជាជីវៈ ៖ ពេលណាត្រូវផ្លាស់ប្តូរសំបកកង់"
        isKh={isKh}
      />

      {/* Hazard stripe banner */}
      <div
        className="rounded-lg mb-5 p-3 flex items-center gap-3 border-l-4"
        style={{
          background:
            "repeating-linear-gradient(45deg, #fbbf24 0 14px, #1c1917 14px 28px)",
          borderColor: "#fbbf24",
        }}
      >
        <AlertTriangle className="w-5 h-5 text-stone-900 flex-shrink-0 bg-amber-300 rounded p-0.5" />
        <span className={`text-stone-50 font-bold text-xs sm:text-sm uppercase tracking-widest bg-stone-900/80 px-2 py-1 rounded ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
          {isKh
            ? "សំបកកង់ចាស់ ឬដាច់គ្រឡុក = មូលហេតុចំបងនៃគ្រោះថ្នាក់ចរាចរណ៍"
            : "Worn or aged tires are a leading cause of road accidents"}
        </span>
      </div>

      {/* ── Tread depth interactive ── */}
      <div className="rounded-xl bg-stone-900/60 border border-stone-700 p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Ruler className="w-5 h-5 text-amber-400" />
          <h4 className={`font-display font-bold text-stone-50 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ជម្រៅក្រឡាកង់ ( Tread Depth )" : "Tread Depth (ជម្រៅក្រឡាកង់)"}
          </h4>
        </div>
        <p className={`text-stone-300 text-sm mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "គ្រឡុកជ្រៅៗនៅលើផ្ទៃសំបកកង់ មានគោលដៅរុញទឹកចេញ ដើម្បីកុំឲ្យឡានរអិលនៅលើទឹកនៅពេលភ្លៀង។ នៅពេលជម្រៅគ្រឡុកសឹកនៅត្រឹម ១,៦ មិល្លីម៉ែត្រ — សំបកកង់ត្រូវបានគេហៅថា “ដាច់គ្រឡុក” ហើយវាគ្រោះថ្នាក់ខ្លាំងណាស់នៅពេលភ្លៀង។"
            : "The deep grooves on the tread are designed to push water out from under the tire so the car doesn't slip in the rain. When tread depth wears down to 1.6 mm, the tire is called 'bald' — and is extremely dangerous on wet roads."}
        </p>

        {/* Tread visualization */}
        <div className="rounded-lg bg-stone-950 p-4 mb-4 ff-asphalt-surface">
          <svg viewBox="0 0 480 140" className="w-full h-auto" data-testid="tread-svg">
            {/* tire side view block */}
            <rect x="10" y="20" width="460" height="50" fill="#1c1917" stroke="#a8a29e" strokeWidth="1" />
            {/* tread grooves whose depth depends on `tread` */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const grooveDepth = (tread / 8) * 38; // px, max 38px deep
              const x = 30 + i * 56;
              return (
                <rect key={i} x={x} y={70 - grooveDepth} width="22" height={grooveDepth} fill="#0a0a0a" />
              );
            })}
            {/* depth scale on right */}
            <line x1="478" y1="32" x2="478" y2="68" stroke="#a8a29e" strokeWidth="1" />
            <text x="448" y="36" fill="#fbbf24" fontSize="10" fontFamily="monospace" textAnchor="end">
              8mm
            </text>
            <text x="448" y="68" fill="#a8a29e" fontSize="10" fontFamily="monospace" textAnchor="end">
              0mm
            </text>
            {/* legal line */}
            <line x1="10" y1={70 - (1.6 / 8) * 38} x2="470" y2={70 - (1.6 / 8) * 38} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 4" />
            <text x="20" y={70 - (1.6 / 8) * 38 - 4} fill="#fca5a5" fontSize="10" fontFamily={isKh ? "inherit" : "monospace"} className={isKh ? "font-khmer" : ""}>
              {isKh ? "ដែនកំណត់ស្របច្បាប់ · ១,៦ មម" : "legal limit · 1.6mm"}
            </text>
            {/* water + rain illustration */}
            <CloudRainSvg x={120} y={88} bald={tread < 1.7} />
            <CloudRainSvg x={260} y={88} bald={tread < 1.7} />
            <CloudRainSvg x={400} y={88} bald={tread < 1.7} />
            <text x="240" y="135" fill="#a8a29e" fontSize="10" fontFamily={isKh ? "inherit" : "monospace"} textAnchor="middle" className={isKh ? "font-khmer" : ""}>
              {tread < 1.7
                ? isKh
                  ? "សំបកកង់រអិលលើទឹក →"
                  : "tire skids on water →"
                : isKh
                ? "← គ្រឡុករុញទឹកចេញ ←"
                : "← grooves push water out ←"}
            </text>
          </svg>
        </div>

        {/* Slider */}
        <div className="flex items-center gap-4">
          <span className="text-stone-400 text-xs font-mono">0mm</span>
          <input
            type="range"
            min={0}
            max={8}
            step={0.1}
            value={tread}
            onChange={(e) => setTread(parseFloat(e.target.value))}
            className="flex-1 accent-amber-500"
            data-testid="tread-slider"
            aria-label="tread depth"
          />
          <span className="text-stone-400 text-xs font-mono">8mm</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-stone-400 text-xs uppercase tracking-widest font-bold">
              {isKh ? "ជម្រៅគ្រឡុក" : "Tread depth"}
            </div>
            <div className="text-3xl font-mono font-bold text-amber-300" data-testid="tread-readout">
              {tread.toFixed(1)} mm
            </div>
          </div>
          <div
            className="px-4 py-3 rounded-lg border-2 font-bold uppercase tracking-widest text-sm"
            style={{ background: status.bg, borderColor: status.border, color: status.color }}
            data-testid="tread-status"
          >
            <span className={isKh ? "font-khmer tracking-normal normal-case" : ""}>
              {isKh ? status.kh : status.en}
            </span>
          </div>
        </div>
      </div>

      {/* ── Age & Rot ── */}
      <div className="rounded-xl bg-stone-900/60 border border-stone-700 p-5" data-testid="tire-age">
        <div className="flex items-center gap-2 mb-3">
          <CalendarClock className="w-5 h-5 text-amber-400" />
          <h4 className={`font-display font-bold text-stone-50 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "អាយុ និងការប្រេះស្រាំ" : "Age & Rot"}
          </h4>
        </div>
        <p className={`text-stone-300 text-sm mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "សូម្បីតែឡានដែលគេមិនបានបើកច្រើនក៏ដោយ កៅស៊ូក៏ស្ងួត និងប្រេះស្រាំតាមពេលវេលា — ពន្លឺថ្ងៃ កំដៅ និងអុកស៊ីសែនបំផ្លាញម៉ូលេគុលបន្តិចម្ដងៗ។"
            : "Even if a car is rarely driven, the rubber dries out and cracks over time — sun, heat and oxygen slowly break down the molecules."}
        </p>

        {/* Year timeline */}
        <div className="rounded-lg bg-stone-950 p-4">
          <div className="flex items-end justify-between mb-2">
            {[
              { year: "1y", color: "#22c55e", labelEn: "new", labelKh: "ថ្មី" },
              { year: "3y", color: "#22c55e", labelEn: "fine", labelKh: "ល្អ" },
              { year: "5y", color: "#facc15", labelEn: "inspect", labelKh: "ត្រួតពិនិត្យ" },
              { year: "6y", color: "#fb923c", labelEn: "replace", labelKh: "ត្រូវផ្លាស់" },
              { year: "10y", color: "#ef4444", labelEn: "danger", labelKh: "គ្រោះថ្នាក់" },
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1" data-testid={`age-tick-${t.year}`}>
                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-mono font-bold"
                     style={{ borderColor: t.color, color: t.color }}>
                  {t.year}
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-bold ${isKh ? "font-khmer tracking-normal normal-case text-[11px]" : ""}`}
                      style={{ color: t.color }}>
                  {isKh ? t.labelKh : t.labelEn}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 via-orange-500 to-rose-600" />
        </div>

        <div className={`mt-4 rounded-lg border-l-4 border-rose-500 bg-rose-500/10 p-4 text-sm text-stone-100 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          <span className="text-rose-300 font-bold">
            {isKh ? "ច្បាប់ទូទៅ ៖ " : "Rule of thumb: "}
          </span>
          {isKh
            ? "ផ្លាស់ប្តូរសំបកកង់រាល់ ៦ ឆ្នាំ — ទោះបីជាមើលទៅនៅល្អក៏ដោយ។ មើលថ្ងៃផលិត ( លេខ ៤ ខ្ទង់នៅលើជើងសំបក — ឧទាហរណ៍ “២១២៥” = សប្ដាហ៍ទី ២១ ឆ្នាំ ២០២៥ )។"
            : "Replace tires every 6 years — even if they look fine. Check the date code (a 4-digit number on the sidewall — e.g. \"2125\" = week 21 of year 2025)."}
        </div>
      </div>
    </SteelCard>
  );
}

/* small helper for the tread visualization */
function CloudRainSvg({ x, y, bald }: { x: number; y: number; bald: boolean }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx="0" cy="0" rx="20" ry="6" fill="#475569" />
      <line x1="-10" y1="6" x2="-10" y2={bald ? 36 : 18} stroke="#60a5fa" strokeWidth="1.5" />
      <line x1="0" y1="6" x2="0" y2={bald ? 36 : 18} stroke="#60a5fa" strokeWidth="1.5" />
      <line x1="10" y1="6" x2="10" y2={bald ? 36 : 18} stroke="#60a5fa" strokeWidth="1.5" />
    </g>
  );
}

function ScopedStyles() {
  return (
    <style>{`
      .ff-text-flame {
        background: linear-gradient(180deg, #fbbf24 0%, #f97316 50%, #ef4444 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      @keyframes ff-float-kf {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-6px); }
      }
      .ff-float { animation: ff-float-kf 3.6s ease-in-out infinite; }

      @keyframes ff-spin-kf {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      .ff-spin-slow { animation: ff-spin-kf 8s linear infinite; transform-origin: 50% 50%; }

      @keyframes ff-pulse-kf {
        0%, 100% { opacity: 1; }
        50%      { opacity: 0.4; }
      }
      .ff-pulse      { animation: ff-pulse-kf 1.6s ease-in-out infinite; }
      .ff-pulse-fast { animation: ff-pulse-kf 1s ease-in-out infinite; }

      @keyframes ff-flicker-kf {
        0%, 100% { transform: scaleY(1)   translateY(0); opacity: 1; }
        50%      { transform: scaleY(1.1) translateY(-2px); opacity: 0.85; }
      }
      .ff-flicker { animation: ff-flicker-kf 0.6s ease-in-out infinite; transform-origin: 50% 100%; }

      /* Asphalt road-surface texture */
      .ff-asphalt-surface {
        background-color: #1c1917;
        background-image:
          radial-gradient(rgba(168,162,158,0.10) 1px, transparent 1.4px),
          radial-gradient(rgba(120,113,108,0.08) 1px, transparent 1.4px),
          linear-gradient(180deg, #1c1917 0%, #292524 100%);
        background-size: 18px 18px, 11px 11px, 100% 100%;
        background-position: 0 0, 6px 7px, 0 0;
      }

      @keyframes ff-roll-kf {
        0%   { transform: translateX(-10px); }
        100% { transform: translateX(260px); }
      }
      .ff-roll { animation: ff-roll-kf 6s linear infinite; }

      @media (prefers-reduced-motion: reduce) {
        .ff-float, .ff-spin-slow, .ff-pulse, .ff-pulse-fast, .ff-flicker, .ff-roll {
          animation: none !important;
        }
      }
    `}</style>
  );
}
