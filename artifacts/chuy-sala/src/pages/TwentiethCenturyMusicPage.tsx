import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CassetteTape,
  Cpu,
  Crown,
  Music,
  Music2,
  Disc3,
  Mic2,
  Guitar,
  Moon,
  Radio,
  Drum,
  Volume2,
  Sparkles,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  MUSIC-20C · The 20th Century: The Electric Revolution
//              សតវត្សទី២០៖ បដិវត្តន៍អគ្គិសនី
//
//  1. The Acoustic Roots — Blues + Jazz
//  2. The Amplified Rebellion — Rock 'n' Roll + Heavy Metal
//  3. The Rhythmic Word — Hip-Hop & Rap
//
//  Aesthetic: Vintage Vinyl / Amplifier — warm glowing ambers,
//  deep vinyl blacks, brushed-silver borders, knurled-knob accents.
// ════════════════════════════════════════════════════════════════════════════

const VINYL_BG =
  "bg-gradient-to-br from-[#0c0a09] via-[#1c1917] to-[#292524]";

export default function TwentiethCenturyMusicPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100 text-stone-900">
      {/* ── Hero — vinyl black with amber glow ───────────────────────── */}
      <header
        className={`relative overflow-hidden ${VINYL_BG} text-stone-100 border-b-4 border-amber-500/70`}
      >
        <AmpGrillBgPattern />
        <VinylSpinner />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
          <Link
            href="/music-theory"
            className={`inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 text-sm mb-5 ${
              isKh ? "font-khmer" : ""
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {isKh ? "ត្រឡប់ទៅទ្រឹស្តីតន្ត្រី" : "Back to Music Theory"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-amber-500/15 backdrop-blur border border-amber-400/40 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-amber-300">
            <Disc3 className="w-3.5 h-3.5" />
            MUSIC-20C · ELECTRIC REVOLUTION
          </div>

          <h1
            className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl drop-shadow ${
              isKh ? "font-khmer leading-snug" : ""
            }`}
          >
            {isKh ? (
              <>
                សតវត្សទី២០ —{" "}
                <span className="text-amber-400" style={{ textShadow: "0 0 18px rgba(251,191,36,0.55)" }}>
                  បដិវត្តន៍​អគ្គិសនី
                </span>
              </>
            ) : (
              <>
                The 20th Century —{" "}
                <span className="text-amber-400" style={{ textShadow: "0 0 18px rgba(251,191,36,0.55)" }}>
                  The Electric Revolution
                </span>
              </>
            )}
          </h1>

          <p
            className={`mt-4 max-w-2xl text-stone-300 text-sm sm:text-base ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh
              ? "នៅ​ដើម​សតវត្ស​ទី ២០ ​តន្ត្រី​ត្រូវ​បាន​លេង​ដោយ​ឧបករណ៍​អាគូស្ទិក​នៅ​ក្នុង​ជ្រកាល​ជា​ព្យុះ។ ​បន្ទាប់​មក​ភ្លើង​អគ្គិសនី​បាន​មក​ដល់ — ហើយ​ក្នុង​រយៈ​ពេល​ ៧០ ឆ្នាំ ​យើង​បាន​ផ្លាស់​ប្តូរ​ពី​ប៊្លូស ​ទៅ​ហ្សាស ​ទៅ​រ៉ុក ​ទៅ​មេតាល់ ​ទៅ​ហ៊ីបហប — ម្តង​ហើយ​ម្តង​ទៀត​បំបែក​ច្បាប់​ដែល​មុន​ៗ​បាន​សរសេរ។"
              : "At the start of the 1900s, music was acoustic and played in smoky rooms. Then electricity arrived — and in just 70 years we went from blues to jazz to rock to metal to hip-hop, each one breaking the rules the one before it had written."}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 max-w-xl">
            <Stat valueEn="1903" labelEn="First blues recording" labelKh="ការ​ថត​ប៊្លូស​ដំបូង" isKh={isKh} />
            <Stat valueEn="1951" labelEn="Word 'rock & roll' coined on radio" labelKh="ពាក្យ 'rock & roll' លេច​ឡើង" isKh={isKh} />
            <Stat valueEn="1973" labelEn="Hip-hop born in the Bronx" labelKh="ហ៊ីបហប​កើត​នៅ Bronx" isKh={isKh} />
          </div>
        </div>
      </header>

      {/* ── Section 1: The Acoustic Roots ────────────────────────────── */}
      <Section
        spec="01"
        eyebrowEn="Strings, brass, sweat"
        eyebrowKh="ខ្សែ ​លង្ហិន ​ញើស"
        titleEn="The Acoustic Roots"
        titleKh="ប្រភព​ដើម​នៃ​សូរ​ស័ព្ទ"
        descEn="Before the wall socket, every note had to come from a vibrating string, a column of air, or a stretched skin. Two American genres in this acoustic era changed music forever — both born from the African American community."
        descKh="មុន​ពេល​ដោត​ភ្លើង ​សំឡេង​នីមួយ​ៗ​ត្រូវ​មក​ពី​ខ្សែ​រញ្ជួយ ​ជួរ​ខ្យល់ ​ឬ​ស្បែក​ដែល​ត្រូវ​បាន​បន្ត្រែង។ មាន​ជំនាន់​អាមេរិក​ពីរ​នៅ​ក្នុង​យុគ​អាគូស្ទិក​នេះ​ដែល​បាន​ប្តូរ​តន្ត្រី​ជា​រៀង​រហូត — ទាំង​ពីរ​កើត​ចេញ​ពី​សហគមន៍​អាមេរិក​ស្បែក​ខ្មៅ។"
        isKh={isKh}
      >
        <GenreCard
          icon={Guitar}
          accent="amber"
          decadeEn="1900s · American South"
          decadeKh="ទសវត្សរ៍ ១៩០០ · ខាង​ត្បូង​អាមេរិក"
          titleEn="The Blues"
          titleKh="តន្ត្រី​ប៊្លូស៍"
          taglineEn="Pain made into a chord progression"
          taglineKh="ការ​ឈឺ​ចាប់​ប្រែ​ក្លាយ​ជា​ការ​លេង​ឆ្នូត​ដ៏​ស្រស់"
          bodyEn="The blues was born in the cotton fields, churches, and porches of the American South — created by African Americans out of the hardship of slavery and its long aftermath. A blues song is raw, emotional storytelling: someone lost their job, lost their love, missed their train. The voice cracks on purpose."
          bodyKh="ប៊្លូស​កើត​នៅ​ចំការ​កប្បាស ​ព្រះវិហារ ​និង​ច​ណ្តោះ​ផ្ទះ​នៃ​អាមេរិក​ខាង​ត្បូង — បង្កើត​ឡើង​ដោយ​ជន​ជាតិ​អាមេរិក​ស្បែក​ខ្មៅ​ចេញ​ពី​ការ​លំ​បាក​នៃ​ទាសភាព និង​ផល​វិបាក​យូរ​អង្វែង​របស់​វា។ ចម្រៀង​ប៊្លូស​គឺ​ជា​ការ​និយាយ​រឿង​ដោយ​ស្មោះ​និង​មាន​អារម្មណ៍ — អ្នក​បាត់​បង់​ការ​ងារ បាត់​បង់​សេចក្តី​ស្រឡាញ់ ​ខក​ខាន​ឡាន​ភ្លើង។ សំឡេង​បែក​ដោយ​ចេតនា។"
          factEn="Structure: the 12-bar chord pattern (I – IV – V) repeated forever"
          factKh="រចនា​សម្ព័ន្ធ​៖ លំនាំ​ការ​ឆ្នូត ១២ បារ (I – IV – V) ​ដែល​ចំបង​សម្រាប់​ចំ​រៀង​ទាំង​មូល"
          isKh={isKh}
        />

        <GenreCard
          icon={Music2}
          accent="amber"
          decadeEn="1910s–40s · New Orleans → New York"
          decadeKh="ទសវត្សរ៍ ១៩១០–៤០ · ញូវ​អូឡេអ៊ង → ញូវយ៉ក"
          titleEn="Jazz"
          titleKh="ចង្វាក់​ហ្សាស"
          taglineEn="The art of breaking the rules"
          taglineKh="សិល្បៈ​នៃ​ការ​បំបែក​ច្បាប់"
          bodyEn="Jazz took the blues into the city and added a stage, a tuxedo, and a wild new idea: improvisation. Jazz musicians don't read a sheet of music — they invent it on the spot. A trumpet says one phrase, a saxophone answers, a piano interrupts. They are talking to each other in real time. Heavy on brass, piano, and syncopated rhythms (the beats land where you don't expect)."
          bodyKh="ហ្សាស​បាន​យក​ប៊្លូស​ចូល​ទីក្រុង ​បន្ថែម​ឆាក ​អាវ​មាស ​និង​គំនិត​ថ្មី​ដ៏​អាកប្ប៖ ការ​ច្នៃ​ប្រឌិត​ភ្លាមៗ។ អ្នក​លេង​ហ្សាស​មិន​អាន​សន្លឹក​ភ្លេង​ទេ — ​ពួក​គេ​ច្នៃ​វា​នៅ​នឹង​កន្លែង។ ត្រាំប៉ែត​និយាយ​ឃ្លា​មួយ ​សាក់សូហ្វូន​ឆ្លើយ ​ព្យាណូ​បំបែក​ពាក្យ។ ពួក​គេ​ពិភាក្សា​គ្នា​ទៅ​វិញ​ទៅ​មក​ភ្លាម​ៗ។ ផ្តោត​លើ​ឧបករណ៍​លង្ហិន ​ព្យាណូ ​និង​ចង្វាក់ syncopated (​ចង្វាក់​ដែល​ធ្លាក់​នៅ​កន្លែង​អ្នក​មិន​នឹក​ស្មាន)។"
          factEn="Improvisation: a real-time conversation between brass, piano, and rhythm"
          factKh="ការ​ច្នៃ​ភ្លាមៗ​៖ ការ​សន្ទនា​ភ្លាមៗ​រវាង​លង្ហិន ​ព្យាណូ ​និង​ចង្វាក់"
          isKh={isKh}
        />
      </Section>

      {/* ── Section 2: The Amplified Rebellion ───────────────────────── */}
      <Section
        spec="02"
        eyebrowEn="Plug in, turn up"
        eyebrowKh="ដោត​ភ្លើង ​បើក​ឱ្យ​ខ្លាំង"
        titleEn="The Amplified Rebellion"
        titleKh="ការ​បះ​បោរ​ដោយ​ប្រើ​ឧបករណ៍​បំពង​សំឡេង"
        descEn="In 1948, the solid-body electric guitar arrived. Suddenly a single instrument could fill a stadium. The amplifier was the new co-singer — and what young musicians did with it was take the rules of jazz and the soul of the blues and crank them up until parents covered their ears."
        descKh="នៅ​ឆ្នាំ ១៩៤៨ ​គីតា​អគ្គិសនី​មាន​តួ​ដ៏​រឹង​បាន​មក​ដល់។ ភ្លាម​ៗ​នោះ​ឧបករណ៍​តែ​មួយ​អាច​បំពេញ​កីឡដ្ឋាន​ទាំង​មូល។ បំពង​សំឡេង​ក្លាយ​ជា​អ្នក​ច្រៀង​រួម​ថ្មី — ហើយ​អ្វី​ដែល​យុវ​ជន​អ្នក​លេង​ភ្លេង​បាន​ធ្វើ​គឺ​យក​ច្បាប់​ហ្សាស និង​ព្រលឹង​ប៊្លូស ​ហើយ​បើក​ខ្លាំង​ៗ​រហូត​ដល់​ឪពុក​ម្តាយ​ត្រូវ​បិទ​ត្រចៀក។"
        isKh={isKh}
      >
        <GenreCard
          icon={Guitar}
          accent="silver"
          decadeEn="1950s–60s · Memphis · Detroit · Liverpool"
          decadeKh="ទសវត្សរ៍ ១៩៥០–៦០ · ​ម៉េមភីស ​ឌីត្រូយ ​លីវភូល"
          titleEn="Rock and Roll"
          titleKh="រ៉ុក​អេន​រ៉ូល"
          taglineEn="Electricity changes everything"
          taglineKh="ភ្លើង​អគ្គិសនី​ប្តូរ​ទាំង​អស់"
          bodyEn="The electric guitar took center stage. The drums got louder. A heavy backbeat — that hard slap on beats 2 and 4 — made it impossible to sit still. Rock and roll was the soundtrack of a generation that wanted to dance, to argue with their parents, and to refuse the world handed to them."
          bodyKh="គីតា​អគ្គិសនី​ឡើង​កណ្តាល​ឆាក។ ស្គរ​ខ្លាំង​ឡើង។ ចង្វាក់​ខ្លាំង​នៅ​ខាង​ក្រោយ — ការ​ទះ​ខ្លាំង​នៅ​លើ​ចង្វាក់​ទី ២ និង ៤ — ធ្វើ​ឱ្យ​មិន​អាច​អង្គុយ​ស្ងៀម។ រ៉ុក​អេន​រ៉ូល​គឺ​ជា​សំឡេង​នៃ​ជំនាន់​មួយ​ដែល​ចង់​រាំ ​ចង់​ឈ្លោះ​ជា​មួយ​ឪពុក​ម្តាយ ​និង​បដិសេធ​ពិភព​ដែល​គេ​ប្រគល់​ឱ្យ។"
          factEn="The heavy backbeat (snap on beats 2 and 4) defines the genre"
          factKh="ចង្វាក់​ខ្លាំង​នៅ​ខាង​ក្រោយ (ទះ​នៅ​ចង្វាក់ ២ និង ៤) ​កំណត់​ជំនាន់​ភ្លេង​នេះ"
          isKh={isKh}
        />

        <DistortionCard isKh={isKh} />
      </Section>

      {/* ── Section 3: The Rhythmic Word ─────────────────────────────── */}
      <Section
        spec="03"
        eyebrowEn="From the block party"
        eyebrowKh="ចេញ​ពី​ពិធី​នៅ​សង្កាត់"
        titleEn="The Rhythmic Word"
        titleKh="ពាក្យ​ពេចន៍ និង​ចង្វាក់"
        descEn="In August 1973, in a recreation room at 1520 Sedgwick Avenue in the Bronx, New York, an 18-year-old DJ named Kool Herc plugged in two turntables and started looping the drum break of a funk record. A new genre — and a brand-new culture — were born that night."
        descKh="នៅ​ខែ​សីហា ឆ្នាំ ១៩៧៣ ​នៅ​ក្នុង​បន្ទប់​កម្សាន្ត​នៃ​អគារ​លេខ ១៥២០ Sedgwick Avenue ​នៅ Bronx ​ញូវយ៉ក ​ឌី​ជេ​អាយុ ១៨ ឆ្នាំ​ឈ្មោះ Kool Herc បាន​ដោត​ឧបករណ៍​បង្វិល​ថាស​ពីរ ​ហើយ​ចាប់​ផ្តើម​លេង​ស្គរ​ត្រឡប់​ៗ​ពី​ថាស funk។ ជំនាន់​ភ្លេង​ថ្មី — និង​វប្បធម៌​ថ្មី​ទាំង​ស្រុង — បាន​កើត​នៅ​យប់​នោះ។"
        isKh={isKh}
      >
        <HipHopVsRap isKh={isKh} />
        <TurntableCard isKh={isKh} />
      </Section>

      {/* ── Section 4: The Cambodian Synthesis ──────────────────────── */}
      <Section
        spec="04"
        eyebrowEn="Cambodia plugs in"
        eyebrowKh="កម្ពុជា​ដោត​ភ្លើង"
        titleEn="The Cambodian Synthesis: A Musical Journey"
        titleKh="ការសំយោគតន្ត្រីកម្ពុជា៖ ដំណើរនៃសិល្បៈ"
        descEn="The electric revolution didn't stop at the Pacific. When the amplifier reached Cambodia, our artists didn't just copy — they fused electric rock, surf, and soul with the ancient melodies of Khmer music. What followed is one of the most extraordinary musical journeys of the 20th century."
        descKh="បដិវត្តន៍​អគ្គិសនី​មិន​បាន​បញ្ឈប់​នៅ​មហាសមុទ្រ​ប៉ាស៊ីហ្វិក​ឡើយ។ ​នៅ​ពេល​ដែល​បំពង​សំឡេង​មក​ដល់​កម្ពុជា ​សិល្បករ​យើង​មិន​ត្រឹម​តែ​ចម្លង​ទេ — ​ពួក​គេ​បាន​លាយ​បញ្ចូល​រ៉ុក​អគ្គិសនី ​ស៊ើហ្វ ​និង​សូល ​ជា​មួយ​នឹង​សំនៀង​បុរាណ​នៃ​តន្ត្រី​ខ្មែរ។ លទ្ធផល​គឺ​ដំណើរ​សិល្បៈ​ដ៏​អស្ចារ្យ​បំផុត​មួយ​នៃ​សតវត្សរ៍​ទី ២០។"
        isKh={isKh}
      >
        <CambodianSynthesis isKh={isKh} />
      </Section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/music-theory"
          className={`inline-flex items-center gap-1.5 text-stone-500 hover:text-amber-700 text-sm ${
            isKh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅទ្រឹស្តីតន្ត្រី" : "Back to Music Theory"}
        </Link>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Layout shell — vinyl-amplifier flavour
// ════════════════════════════════════════════════════════════════════════════

function Section({
  spec, eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  spec: string;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-stone-900 text-amber-400 rounded-sm px-2.5 py-0.5">
          SEC-{spec}
        </span>
        <span
          className={`text-xs font-bold uppercase tracking-widest text-amber-700 ${
            isKh ? "font-khmer normal-case tracking-normal" : ""
          }`}
        >
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl text-stone-950 mb-2 ${
          isKh ? "font-khmer leading-snug" : ""
        }`}
      >
        {isKh ? titleKh : titleEn}
      </h2>
      <p
        className={`text-stone-700 text-sm sm:text-base mb-6 max-w-3xl ${
          isKh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Stat({
  valueEn, labelEn, labelKh, isKh,
}: { valueEn: string; labelEn: string; labelKh: string; isKh: boolean }) {
  return (
    <div className="rounded-xl bg-white/5 backdrop-blur border border-amber-400/30 px-3 py-2 flex flex-col">
      <div className="font-display font-bold text-2xl text-amber-400 leading-none">{valueEn}</div>
      <div className={`text-[11px] text-stone-300 mt-1 ${isKh ? "font-khmer" : ""}`}>
        {isKh ? labelKh : labelEn}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Reusable cards — silver-bordered "amplifier-faceplate" cards with glow
// ════════════════════════════════════════════════════════════════════════════

function GenreCard({
  icon: Icon, accent, decadeEn, decadeKh, titleEn, titleKh,
  taglineEn, taglineKh, bodyEn, bodyKh, factEn, factKh, isKh,
}: {
  icon: React.ComponentType<{ className?: string }>;
  accent: "amber" | "silver";
  decadeEn: string; decadeKh: string;
  titleEn: string; titleKh: string;
  taglineEn: string; taglineKh: string;
  bodyEn: string; bodyKh: string;
  factEn: string; factKh: string;
  isKh: boolean;
}) {
  const accentBorder =
    accent === "amber" ? "border-amber-300" : "border-zinc-300";
  const iconWrap =
    accent === "amber"
      ? "from-amber-400 to-amber-600 text-stone-900"
      : "from-zinc-200 to-zinc-400 text-stone-900";
  const factBg =
    accent === "amber"
      ? "border-amber-300 bg-amber-50 text-amber-900"
      : "border-zinc-300 bg-zinc-50 text-zinc-800";

  return (
    <article className={`rounded-2xl border-2 ${accentBorder} bg-white shadow-sm overflow-hidden`}>
      {/* Faceplate header — vinyl-black with a brushed-silver line and glowing knob */}
      <div className={`relative ${VINYL_BG} px-5 py-4 border-b border-zinc-700 flex items-center gap-4`}>
        <BrushedRule />
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconWrap} flex items-center justify-center shadow-md flex-shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="min-w-0 flex-1 relative">
          <div
            className={`font-mono text-[10px] uppercase tracking-widest text-amber-400 ${
              isKh ? "font-khmer normal-case tracking-normal" : ""
            }`}
          >
            {isKh ? decadeKh : decadeEn}
          </div>
          <div
            className={`font-display font-bold text-xl text-stone-100 ${
              isKh ? "font-khmer leading-snug" : "leading-tight"
            }`}
            style={{ textShadow: "0 0 12px rgba(251,191,36,0.25)" }}
          >
            {isKh ? titleKh : titleEn}
          </div>
        </div>
        <KnobIcon />
      </div>

      <div className="p-5 sm:p-6">
        <div
          className={`font-mono text-[10px] uppercase tracking-widest text-stone-500 mb-1 ${
            isKh ? "font-khmer normal-case tracking-normal" : ""
          }`}
        >
          {isKh ? taglineKh : taglineEn}
        </div>
        <p
          className={`text-sm text-stone-700 mb-3 ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh ? bodyKh : bodyEn}
        </p>
        <div className={`rounded-lg border ${factBg} px-3 py-2 flex items-center gap-2 text-xs`}>
          <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
          <span className={`font-medium ${isKh ? "font-khmer" : ""}`}>
            {isKh ? factKh : factEn}
          </span>
        </div>
      </div>
    </article>
  );
}

function DistortionCard({ isKh }: { isKh: boolean }) {
  return (
    <article className="rounded-2xl border-2 border-zinc-300 bg-white shadow-sm overflow-hidden">
      <div className={`relative ${VINYL_BG} px-5 py-4 border-b border-zinc-700 flex items-center gap-4`}>
        <BrushedRule />
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-200 to-zinc-400 text-stone-900 flex items-center justify-center shadow-md flex-shrink-0">
          <Drum className="w-6 h-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`font-mono text-[10px] uppercase tracking-widest text-amber-400 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "ទសវត្សរ៍ ១៩៧០–៨០ · ​ប៊ឺមីងហែម · ​ឡូស​អែនជឺឡេស" : "1970s–80s · Birmingham · Los Angeles"}
          </div>
          <div
            className={`font-display font-bold text-xl text-stone-100 ${isKh ? "font-khmer leading-snug" : "leading-tight"}`}
            style={{ textShadow: "0 0 12px rgba(251,191,36,0.25)" }}
          >
            {isKh ? "តន្ត្រី​មេតាល់" : "Heavy Metal"}
          </div>
        </div>
        <KnobIcon glow />
      </div>

      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-5 items-center">
        <div>
          <div className={`font-mono text-[10px] uppercase tracking-widest text-stone-500 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "រ៉ុក​ដែល​បាន​ដំ​ឱ្យ​ដល់​ខ្ពស់​បំផុត" : "Rock pushed to the absolute extreme"}
          </div>
          <h3 className={`font-display font-bold text-lg text-stone-950 mb-2 ${isKh ? "font-khmer leading-snug" : "leading-tight"}`}>
            {isKh ? "ការ​ខូច​ទ្រង់​ទ្រាយ​សំឡេង (Distortion)" : "Distortion: when the wave breaks"}
          </h3>
          <p className={`text-sm text-stone-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ខ្សែ​សំឡេង​ដ៏​ស្រស់​ស្អាត​មាន​រាង​ដូច​រលក​សមុទ្រ​ស្ងួត។ ​បើ​អ្នក​បើក​បំពង​សំឡេង​ខ្លាំង​ពេក ​រលក​នោះ​លោត​ឆ្លង​ដែន — កំពូល​ត្រូវ​បាន​កាត់​ឆ្ងាយ​នៅ​លើ​និង​ខាង​ក្រោម។ លទ្ធផល​គឺ​សំឡេង​ខ្ជើច ​ឆ្ងួល ​ជា «​សំឡេង​បែក»។ មេតាល់​យក​ការ​បែក​នោះ​ធ្វើ​ជា​ពូជ​សំឡេង​មូល​ដ្ឋាន — ​ផ្គូផ្គង​នឹង​ការ​ដៀវ​គីតា​លឿន​ដូច​ផ្លេក​បន្ទោរ ​និង​ស្គរ​ឆ្នួល​ដ៏​ខ្លាំង​ឃ្លៀវ។"
              : "A clean sound looks like a smooth ocean wave. Push the amplifier too hard and the wave clips — its top and bottom are sliced off. The result is a gritty, snarling 'broken' sound. Heavy metal made that breakage its core voice — paired with lightning-fast guitar solos and aggressive, double-kick drumming."}
          </p>
          <div className="rounded-lg border border-amber-300 bg-amber-50 text-amber-900 px-3 py-2 flex items-center gap-2 text-xs">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span className={`font-medium ${isKh ? "font-khmer" : ""}`}>
              {isKh
                ? "Distortion = ការ​ដំ​បំពង​សំឡេង​ខ្លាំង​រហូត​រលក​សំឡេង​បែក​ជា​ផ្លូវ​ការ"
                : "Distortion = pushing the amp so hard the soundwave literally breaks"}
            </span>
          </div>
        </div>

        {/* Clean wave vs clipped wave SVG */}
        <DistortionSVG />
      </div>
    </article>
  );
}

function HipHopVsRap({ isKh }: { isKh: boolean }) {
  return (
    <article className="rounded-2xl border-2 border-amber-300 bg-white shadow-sm overflow-hidden">
      <div className={`${VINYL_BG} px-5 py-4 border-b border-zinc-700`}>
        <div className={`font-mono text-[10px] uppercase tracking-widest text-amber-400 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "ភាព​ខុស​គ្នា​សំខាន់" : "Crucial distinction"}
        </div>
        <h3
          className={`font-display font-bold text-xl text-stone-100 mt-0.5 ${isKh ? "font-khmer leading-snug" : "leading-tight"}`}
          style={{ textShadow: "0 0 12px rgba(251,191,36,0.25)" }}
        >
          {isKh ? "ហ៊ីបហប ≠ រ៉េប" : "Hip-Hop ≠ Rap"}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200">
        <div className="p-5 sm:p-6 bg-gradient-to-br from-amber-50/60 to-white">
          <div className="flex items-center gap-2 mb-1.5">
            <Disc3 className="w-4 h-4 text-amber-700" />
            <div className={`font-mono text-[10px] uppercase tracking-widest text-amber-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "វប្បធម៌ + តន្ត្រី" : "the culture + the music"}
            </div>
          </div>
          <h4 className={`font-display font-bold text-lg text-stone-950 mb-2 ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh ? "ហ៊ីបហប" : "Hip-Hop"}
          </h4>
          <p className={`text-sm text-stone-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ហ៊ីបហប​គឺ​ជា​វប្បធម៌​ទាំង​មូល​ដែល​មាន​មែក​ធាង​បួន​៖ ឌី​ជេ ​អ្នក​រ៉េប (MC) ​រាំ break-dance ​និង​សរសេរ​ក្រាហ្វីទី។ វា​ជា​រឿង​សម្តែង​ម៉ូដ ​រឿង​ការ​ប្រកួត ​រឿង​ការ​បង្កើត​សហគមន៍ — មិន​មែន​គ្រាន់​តែ​សំឡេង​ប៉ុណ្ណោះ​ទេ។"
              : "Hip-hop is the entire culture — it has four classic 'pillars': DJing, MCing (rapping), break-dancing, and graffiti writing. It's about fashion, competition, and community-building — not just sound."}
          </p>
        </div>
        <div className="p-5 sm:p-6 bg-gradient-to-br from-zinc-50/60 to-white">
          <div className="flex items-center gap-2 mb-1.5">
            <Mic2 className="w-4 h-4 text-zinc-700" />
            <div className={`font-mono text-[10px] uppercase tracking-widest text-zinc-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "បច្ចេក​ទេស​សំឡេង" : "the vocal technique"}
            </div>
          </div>
          <h4 className={`font-display font-bold text-lg text-stone-950 mb-2 ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh ? "រ៉េប" : "Rap"}
          </h4>
          <p className={`text-sm text-stone-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "រ៉េប​គឺ​ជា​បច្ចេក​ទេស​សំឡេង​ជាក់​លាក់ — ការ​និយាយ​តាម​ចង្វាក់ ​ពាក្យ​ចួន ​នៅ​លើ​ចង្វាក់​ស្គរ។ វា​ជា​មែក​ធាង​មួយ​នៃ​ហ៊ីបហប ​ប៉ុន្តែ​អ្នក​អាច​លឺ​ការ​រ៉េប​នៅ​ក្នុង​ផ្សាយ​ពាណិជ្ជកម្ម ​ភ្លេង​ប៉ប់ ​សូម្បី​តែ​ភ្លេង​ខ្នើយ​សម្រាប់​កុមារ​ផង​ដែរ។"
              : "Rap is the specific vocal technique: speaking rhythmically and rhyming over a beat. It's one branch of hip-hop — but you can hear rap in adverts, in pop songs, even in children's lullabies."}
          </p>
        </div>
      </div>

      <div className="bg-stone-50 border-t border-stone-200 px-5 py-3 flex gap-3 items-start">
        <CheckCircle2 className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <p className={`text-sm text-stone-800 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "មេរៀន​ខ្លី​៖ មនុស្ស​គ្រប់​គ្នា​ដែល​រ៉េប​គឺ​ស្ថិត​នៅ​ក្នុង​ហ៊ីបហប ​ប៉ុន្តែ​មិន​មែន​មនុស្ស​គ្រប់​គ្នា​នៅ​ក្នុង​ហ៊ីបហប​សុទ្ធ​តែ​រ៉េប​ឡើយ (​ឌី​ជេ ​អ្នក​រាំ ​អ្នក​សរសេរ​ក្រាហ្វីទី)។"
            : "In short: every rapper is in hip-hop, but not everyone in hip-hop raps (the DJs, the dancers, the graffiti writers)."}
        </p>
      </div>
    </article>
  );
}

function TurntableCard({ isKh }: { isKh: boolean }) {
  return (
    <article className="rounded-2xl border-2 border-amber-300 bg-white shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className={`${VINYL_BG} p-6 flex items-center justify-center relative overflow-hidden`}>
        <AmpGrillBgPattern muted />
        <TurntableSVG />
      </div>
      <div className="p-5 sm:p-6">
        <div className={`font-mono text-[10px] uppercase tracking-widest text-amber-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "ឧបករណ៍​ថ្មី" : "The new instrument"}
        </div>
        <h3 className={`font-display font-bold text-lg text-stone-950 mb-2 ${isKh ? "font-khmer leading-snug" : "leading-tight"}`}>
          {isKh
            ? "ម៉ាស៊ីន​បង្វិល​ថាស​ក្លាយ​ជា​ឧបករណ៍​ភ្លេង"
            : "The turntable becomes a musical instrument"}
        </h3>
        <p className={`text-sm text-stone-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "ម៉ាស៊ីន​បង្វិល​ថាស​ត្រូវ​បាន​ច្នៃ​ឱ្យ «​ត្រឹម​តែ​បើក​ភ្លេង»។ ឌី​ជេ​នៅ Bronx បាន​ប្តូរ​វា​ជា​ឧបករណ៍​លេង​ភ្លេង​ដ៏​ថ្មី​ស្រឡាង។ ​ដោយ​ប្រើ​ថាស​ពីរ ​ពួក​គេ​អាច​៖"
            : "The turntable was designed to 'just play music'. The Bronx DJs turned it into a brand-new instrument. Using two of them, they could:"}
        </p>
        <ul className="space-y-1.5 text-sm text-stone-700">
          <li className="flex gap-2">
            <span className="font-mono text-amber-600 flex-shrink-0">①</span>
            <span className={isKh ? "font-khmer leading-loose" : ""}>
              {isKh
                ? "Looping ៖ លេង​ផ្នែក​ស្គរ​ដ៏​ល្អ​បំផុត​ត្រឡប់​ៗ​ឥត​ឈប់"
                : "Looping: replay the perfect drum break over and over, forever"}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-mono text-amber-600 flex-shrink-0">②</span>
            <span className={isKh ? "font-khmer leading-loose" : ""}>
              {isKh
                ? "Scratching ៖ បង្វិល​ថាស​ដោយ​ដៃ ​ផលិត​សំឡេង​ដ៏​ខ្ជើច​ដ៏​ពិសេស"
                : "Scratching: spinning the record by hand to create a brand-new percussive sound"}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-mono text-amber-600 flex-shrink-0">③</span>
            <span className={isKh ? "font-khmer leading-loose" : ""}>
              {isKh
                ? "Beat-juggling ៖ ផ្លាស់​ប្តូរ​ចង្វាក់​រវាង​ថាស​ពីរ ​បង្កើត​ភ្លេង​ថ្មី"
                : "Beat-juggling: switching between two records to invent fresh patterns"}
            </span>
          </li>
        </ul>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Decorative SVG bits — vinyl & amplifier flavour
// ════════════════════════════════════════════════════════════════════════════

function AmpGrillBgPattern({ muted = false }: { muted?: boolean }) {
  const op = muted ? 0.05 : 0.08;
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 600 240"
    >
      {/* Diagonal speaker-grill cross-hatch */}
      <defs>
        <pattern id="ampGrill" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="14" stroke={`rgba(251,191,36,${op})`} strokeWidth="1" />
          <line x1="7" y1="0" x2="7" y2="14" stroke={`rgba(255,255,255,${op})`} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="600" height="240" fill="url(#ampGrill)" />
    </svg>
  );
}

function VinylSpinner() {
  return (
    <div
      aria-hidden
      className="hidden md:block absolute -right-32 -top-24 w-[460px] h-[460px] opacity-30 pointer-events-none"
    >
      <svg viewBox="0 0 460 460">
        <defs>
          <radialGradient id="vinyl" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#fbbf24" stopOpacity="0.85" />
            <stop offset="0.06" stopColor="#1c1917" />
            <stop offset="1" stopColor="#0c0a09" />
          </radialGradient>
        </defs>
        <circle cx="230" cy="230" r="230" fill="url(#vinyl)" />
        {/* Concentric grooves */}
        {Array.from({ length: 14 }).map((_, i) => (
          <circle
            key={i}
            cx="230"
            cy="230"
            r={40 + i * 12}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
        ))}
        {/* Center label */}
        <circle cx="230" cy="230" r="34" fill="#b45309" />
        <circle cx="230" cy="230" r="3" fill="#0c0a09" />
      </svg>
    </div>
  );
}

function BrushedRule() {
  return (
    <span
      aria-hidden
      className="absolute left-0 right-0 bottom-0 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(228,228,231,0.45) 30%, rgba(228,228,231,0.45) 70%, transparent 100%)",
      }}
    />
  );
}

function KnobIcon({ glow = false }: { glow?: boolean }) {
  return (
    <div
      aria-hidden
      className="hidden sm:flex w-9 h-9 rounded-full bg-gradient-to-br from-zinc-300 via-zinc-500 to-zinc-700 items-center justify-center shadow-inner border border-zinc-900 flex-shrink-0"
      style={glow ? { boxShadow: "0 0 14px rgba(251,191,36,0.45)" } : undefined}
    >
      <span className="block w-1 h-3.5 bg-amber-400 rounded-sm" />
    </div>
  );
}

function DistortionSVG() {
  // Two waves: top is a clean sine, bottom is a clipped square-ish wave.
  const points = (clipped: boolean) => {
    const pts: string[] = [];
    for (let x = 0; x <= 200; x += 2) {
      const raw = Math.sin((x / 200) * Math.PI * 4);
      let y = raw;
      if (clipped) {
        y = Math.max(-0.65, Math.min(0.65, raw * 1.6));
      }
      pts.push(`${x},${30 + y * 22}`);
    }
    return pts.join(" ");
  };
  return (
    <svg viewBox="0 0 220 140" className="w-full max-w-[260px] mx-auto">
      {/* Clean */}
      <text x="6" y="14" fontSize="9" fill="#0c0a09" fontFamily="ui-monospace, monospace" fontWeight="700">
        CLEAN
      </text>
      <polyline points={points(false)} fill="none" stroke="#a8a29e" strokeWidth="2" />
      {/* Clipped */}
      <text x="6" y="84" fontSize="9" fill="#7c2d12" fontFamily="ui-monospace, monospace" fontWeight="700">
        DISTORTED
      </text>
      <g transform="translate(0,70)">
        <polyline points={points(true)} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        {/* Clipping bars to make the breakage obvious */}
        <line x1="0" y1="8" x2="200" y2="8" stroke="#fde68a" strokeWidth="0.7" strokeDasharray="3 3" />
        <line x1="0" y1="52" x2="200" y2="52" stroke="#fde68a" strokeWidth="0.7" strokeDasharray="3 3" />
      </g>
    </svg>
  );
}

function TurntableSVG() {
  return (
    <svg viewBox="0 0 240 200" className="relative w-full max-w-[260px] drop-shadow-md">
      {/* Plinth */}
      <rect x="20" y="40" width="200" height="140" rx="8" fill="#1c1917" stroke="#52525b" strokeWidth="1.5" />
      {/* Platter */}
      <circle cx="100" cy="110" r="60" fill="#0c0a09" stroke="#71717a" strokeWidth="1.2" />
      {/* Grooves */}
      {Array.from({ length: 8 }).map((_, i) => (
        <circle
          key={i}
          cx="100"
          cy="110"
          r={20 + i * 5}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      ))}
      {/* Center label */}
      <circle cx="100" cy="110" r="14" fill="#b45309" />
      <circle cx="100" cy="110" r="2.5" fill="#0c0a09" />
      {/* Tonearm */}
      <line x1="200" y1="60" x2="135" y2="95" stroke="#a8a29e" strokeWidth="3" strokeLinecap="round" />
      <circle cx="200" cy="60" r="6" fill="#a8a29e" />
      <rect x="130" y="92" width="14" height="8" rx="2" fill="#fbbf24" />
      {/* Pitch slider */}
      <rect x="180" y="120" width="6" height="46" rx="2" fill="#27272a" />
      <rect x="178" y="138" width="10" height="4" rx="1" fill="#fbbf24" />
      {/* Glowing power LED */}
      <circle cx="40" cy="56" r="3" fill="#f59e0b">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 4 · The Cambodian Synthesis — A Musical Journey
//  ការសំយោគតន្ត្រីកម្ពុជា៖ ដំណើរនៃសិល្បៈ
// ════════════════════════════════════════════════════════════════════════════

type EraTheme = "gold" | "ash" | "sepia" | "neon";

type Era = {
  id: string;
  Icon: React.ComponentType<{ className?: string }>;
  theme: EraTheme;
  periodEn: string;
  periodKh: string;
  titleEn: string;
  titleKh: string;
  focusEn: string;
  focusKh: string;
  bodyEn: string;
  bodyKh: string;
  tagsEn?: string[];
  tagsKh?: string[];
};

const ERAS: Era[] = [
  {
    id: "golden",
    Icon: Crown,
    theme: "gold",
    periodEn: "1960s — 1975",
    periodKh: "ទសវត្សរ៍ ១៩៦០ — ១៩៧៥",
    titleEn: "The Golden Age",
    titleKh: "យុគមាស",
    focusEn: "The birth of Khmer Rock",
    focusKh: "កំណើត​នៃ​រ៉ុក​ខ្មែរ",
    bodyEn: "Phnom Penh became one of the most exciting music cities in Asia. Legends like Sinn Sisamouth, Ros Serey Sothea, and Pan Ron blended Latin grooves, French pop, and American psychedelic rock with traditional Khmer poetry and ancient vocal techniques. The result was a sound that was unmistakably Cambodian — and unmistakably new.",
    bodyKh: "ភ្នំពេញ​បាន​ក្លាយ​ជា​ទីក្រុង​តន្ត្រី​ដ៏​ច្រើន​ទីបំផុត​មួយ​ក្នុង​អាស៊ី។ ​មានកំពូល​សិល្បករ​ដូច​ជា​លោក ស៊ីន ស៊ីសាមុត ​អ្នកនាង រស់ សេរីសុទ្ធា ​និង​អ្នកនាង ប៉ែន រ៉ន ​បាន​លាយ​បញ្ចូល​ចង្វាក់​ឡាទីន ​ភ្លេង​ប៉ុប​បារាំង ​និង​រ៉ុក​ផ្លេច​ផ្លាញ​អាមេរិក ​ជា​មួយ​នឹង​កំណាព្យ​ខ្មែរ​បុរាណ ​និង​បច្ចេក​ទេស​សំឡេង​ដ៏​ចំណាស់។ លទ្ធផល​គឺ​សំឡេង​មួយ​ដែល​ខ្មែរ​យ៉ាង​ច្បាស់ — ហើយ​ថ្មី​យ៉ាង​ច្បាស់​ដែរ។",
    tagsEn: ["Sinn Sisamouth", "Ros Serey Sothea", "Pan Ron"],
    tagsKh: ["ស៊ីន ស៊ីសាមុត", "រស់ សេរីសុទ្ធា", "ប៉ែន រ៉ន"],
  },
  {
    id: "silence",
    Icon: Moon,
    theme: "ash",
    periodEn: "1975 — 1979",
    periodKh: "១៩៧៥ — ១៩៧៩",
    titleEn: "The Great Silence",
    titleKh: "ភាពស្ងៀមស្ងាត់",
    focusEn: "The cultural loss during the Khmer Rouge",
    focusKh: "ការ​បាត់​បង់​វប្បធម៌​ក្នុង​សម័យ​ខ្មែរ​ក្រហម",
    bodyEn: "Music was banned. Radios were silenced. Many of Cambodia's greatest artists, along with master tapes, instruments, and entire archives of Khmer music, were tragically lost in the years that followed. A generation of song nearly disappeared.",
    bodyKh: "តន្ត្រី​ត្រូវ​បាន​ហាម​ឃាត់។ វិទ្យុ​ត្រូវ​បាន​បិទ​ស្ងៀម។ ​សិល្បករ​ដ៏​អស្ចារ្យ​ជាច្រើន​នាក់ របស់​កម្ពុជា ​រួម​ជា​មួយ​ខ្សែ​អាត់​ដើម ​ឧបករណ៍​ភ្លេង ​និង​បណ្ណាល័យ​តន្ត្រី​ខ្មែរ​ទាំង​មូល ​ត្រូវ​បាន​បាត់​បង់​យ៉ាង​ខ្លោច​ផ្សា​ក្នុង​ឆ្នាំ​ដែល​បាន​បន្ត​មក។ ​ជំនាន់​ចម្រៀង​មួយ​ស្ទើរ​តែ​បាត់។",
  },
  {
    id: "cassette",
    Icon: CassetteTape,
    theme: "sepia",
    periodEn: "1980s — 1990s",
    periodKh: "ទសវត្សរ៍ ១៩៨០ — ១៩៩០",
    titleEn: "The Cassette Revival",
    titleKh: "ការរស់ឡើងវិញនៃកាសែត",
    focusEn: "Rebuilding from memory",
    focusKh: "ការ​ស្ថាបនា​ឡើង​វិញ​ពី​ការ​ចង​ចាំ",
    bodyEn: "Survivors in refugee camps and overseas Khmer communities began recording the old songs from memory onto cassette tapes. Verse by verse, melody by melody, the soul of the music was kept alive — and slowly, the cassettes were smuggled back into the country, reseeding what had been almost erased.",
    bodyKh: "អ្នក​រស់​រាន​មាន​ជីវិត​នៅ​ក្នុង​ជំរំ​ជន​ភៀស​ខ្លួន ​និង​សហគមន៍​ខ្មែរ​នៅ​បរទេស ​បាន​ចាប់​ផ្តើម​ថត​ចម្រៀង​ចាស់​ៗ​ពី​ការ​ចង​ចាំ​ទៅ​លើ​កាសែត។ ​ឃ្លា​មួយ​ៗ ​សំនៀង​មួយ​ៗ ​ព្រលឹង​នៃ​តន្ត្រី​ត្រូវ​បាន​រក្សា​ឱ្យ​នៅ​រស់ — ​ហើយ​បន្ទាប់​មក ​កាសែត​ត្រូវ​បាន​លួច​បញ្ចូល​ត្រឡប់​មក​ប្រទេស​វិញ​ម្តង​បន្តិច​ៗ ​បង្កើត​ឡើង​វិញ​នូវ​អ្វី​ដែល​ស្ទើរ​តែ​បាន​បាត់។",
  },
  {
    id: "modern",
    Icon: Cpu,
    theme: "neon",
    periodEn: "Present",
    periodKh: "បច្ចុប្បន្ន",
    titleEn: "The Modern Fusion",
    titleKh: "ការលាយបញ្ចូលគ្នាសម័យទំនើប",
    focusEn: "The digital era and Hip-Hop",
    focusKh: "សម័យ​ឌីជីថល ​និង​ហ៊ីបហប",
    bodyEn: "Today's young Cambodian producers bring the journey full circle. Using laptops and digital production software, they sample 1960s Golden Age tracks and weave ancient acoustic instruments — the Roneat, the Kse Diev, the Tro — into modern hip-hop, R&B, and electronic beats. Phnom Penh's sound is once again exporting itself to the world.",
    bodyKh: "អ្នក​ផលិត​ភ្លេង​ខ្មែរ​វ័យ​ក្មេង​នា​ពេល​បច្ចុប្បន្ន ​នាំ​ដំណើរ​នេះ​មក​បំពេញ​ជា​រង្វង់​មូល។ ​ដោយ​ប្រើ​កុំព្យូទ័រ​យួរដៃ ​និង​កម្មវិធី​ផលិត​ភ្លេង​ឌីជីថល ​ពួក​គេ​យក​ខ្សែ​អាត់​ភ្លេង​យុគមាស​ឆ្នាំ ១៩៦០ មក​ផ្សំ ​ហើយ​បក​បញ្ចូល​ឧបករណ៍​អាគូស្ទិក​បុរាណ​ដូច​ជា​រនាត ​ខ្សែ​ដៀវ ​និង​ទ្រ ​ទៅ​ក្នុង​ហ៊ីបហប ​R&B ​និង​ភ្លេង​អេឡិចត្រូនិក​សម័យ​ទំនើប។ ​សំឡេង​ភ្នំពេញ​ម្តង​ទៀត​កំពុង​នាំ​ចេញ​ខ្លួន​ឯង​ទៅ​ពិភពលោក។",
    tagsEn: ["Roneat", "Kse Diev", "Tro"],
    tagsKh: ["រនាត", "ខ្សែ​ដៀវ", "ទ្រ"],
  },
];

function CambodianSynthesis({ isKh }: { isKh: boolean }) {
  return (
    <div className="space-y-6" data-testid="cambodian-synthesis-root">
      {/* ── Bridge intro ─────────────────────────────────────────── */}
      <article
        className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-white to-amber-50 shadow-sm overflow-hidden"
        data-testid="cs-bridge"
      >
        <div className={`relative ${VINYL_BG} px-5 py-4 border-b border-zinc-700 flex items-center gap-4`}>
          <BrushedRule />
          <div
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-900 flex items-center justify-center shadow-md flex-shrink-0"
            aria-hidden="true"
          >
            <Music className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div
              className={`font-mono text-[10px] uppercase tracking-widest text-amber-400 ${
                isKh ? "font-khmer normal-case tracking-normal" : ""
              }`}
            >
              {isKh ? "ការ​ភ្ជាប់​សាច់​រឿង" : "The bridge"}
            </div>
            <h3
              className={`font-display font-bold text-xl text-stone-100 ${
                isKh ? "font-khmer leading-snug" : "leading-tight"
              }`}
              style={{ textShadow: "0 0 12px rgba(251,191,36,0.25)" }}
            >
              {isKh ? "ពេល​អគ្គិសនី​ឈាន​ដល់​អាស៊ី​អាគ្នេយ៍" : "When electricity reached Southeast Asia"}
            </h3>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <p
            className={`text-sm sm:text-base text-stone-800 ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh
              ? "នៅ​ពេល​ដែល​គីតា​អគ្គិសនី ​និង​បំពង​សំឡេង​បាន​ឈាន​មក​ដល់​អាស៊ី​អាគ្នេយ៍ ​សិល្បករ​ខ្មែរ​មិន​ត្រឹម​តែ​ធ្វើ​តាម​ពិភព​ខាង​លិច​ឡើយ។ ​ពួក​គេ​បាន​យក​អំណាច​ឆៅ​នៃ​រ៉ុក​អគ្គិសនី ​ស៊ើហ្វ ​និង​សូល ​ហើយ​លាយ​បញ្ចូល​វា​ជា​មួយ​នឹង​សំនៀង​ដ៏​ស្រស់​ស្អាត​បុរាណ​នៃ​តន្ត្រី​ប្រពៃណី​ខ្មែរ។"
              : "When the electric guitar and the amplifier arrived in Southeast Asia, Cambodian artists did not just imitate the West. They took the raw power of electric rock, surf, and soul, and fused it with the beautiful, ancient melodies of Khmer traditional music."}
          </p>
        </div>
      </article>

      {/* ── Era timeline (chronological) ─────────────────────────── */}
      <div
        className={`font-mono text-[10px] uppercase tracking-widest text-amber-700 ${
          isKh ? "font-khmer normal-case tracking-normal" : ""
        }`}
      >
        {isKh ? "សម័យកាលនៃតន្ត្រី" : "The Eras of the Music"}
      </div>
      <ol className="relative space-y-5" data-testid="cs-timeline">
        {ERAS.map((era, i) => (
          <EraCard key={era.id} era={era} index={i} isKh={isKh} />
        ))}
      </ol>
    </div>
  );
}

function EraCard({ era, index, isKh }: { era: Era; index: number; isKh: boolean }) {
  const Icon = era.Icon;
  const t = ERA_THEMES[era.theme];
  const num = String(index + 1).padStart(2, "0");

  return (
    <li
      className={`relative rounded-2xl border-2 ${t.cardBorder} ${t.cardBg} shadow-sm overflow-hidden list-none`}
      data-testid={`cs-era-${era.id}`}
    >
      {/* left rail — color rolls forward through the eras */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${t.rail}`}
        style={t.railShadow ? { boxShadow: t.railShadow } : undefined}
      />

      {/* dark "faceplate" header with year band */}
      <div className={`relative ${VINYL_BG} pl-6 pr-5 py-4 border-b border-zinc-700 flex items-center gap-4`}>
        <BrushedRule />
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.iconWrap} flex items-center justify-center shadow-md flex-shrink-0`}
          style={t.iconGlow ? { boxShadow: t.iconGlow } : undefined}
          aria-hidden="true"
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-mono text-[10px] tracking-[0.25em] uppercase ${t.numChip} rounded-sm px-1.5 py-0.5`}>
              ERA-{num}
            </span>
            <span
              className={`font-mono text-[10px] uppercase tracking-widest ${t.periodColor} ${
                isKh ? "font-khmer normal-case tracking-normal" : ""
              }`}
            >
              {isKh ? era.periodKh : era.periodEn}
            </span>
          </div>
          <h3
            className={`font-display font-bold text-xl text-stone-100 mt-0.5 ${
              isKh ? "font-khmer leading-snug" : "leading-tight"
            }`}
            style={t.titleShadow ? { textShadow: t.titleShadow } : undefined}
          >
            {isKh ? era.titleKh : era.titleEn}
          </h3>
        </div>
      </div>

      <div className="p-5 sm:p-6 pl-7 sm:pl-8">
        <div
          className={`font-mono text-[10px] uppercase tracking-widest mb-1 ${t.focusColor} ${
            isKh ? "font-khmer normal-case tracking-normal" : ""
          }`}
        >
          {isKh ? era.focusKh : era.focusEn}
        </div>
        <p
          className={`text-sm text-stone-700 ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          } ${era.tagsEn ? "mb-3" : ""}`}
        >
          {isKh ? era.bodyKh : era.bodyEn}
        </p>

        {era.tagsEn && (
          <div className="flex flex-wrap gap-1.5">
            {(isKh ? era.tagsKh ?? era.tagsEn : era.tagsEn).map((tag, j) => (
              <span
                key={`${era.id}-tag-${j}`}
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${t.tagChip} ${
                  isKh ? "font-khmer text-xs" : ""
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

const ERA_THEMES: Record<
  EraTheme,
  {
    cardBorder: string;
    cardBg: string;
    rail: string;
    railShadow?: string;
    iconWrap: string;
    iconGlow?: string;
    numChip: string;
    periodColor: string;
    titleShadow?: string;
    focusColor: string;
    tagChip: string;
  }
> = {
  gold: {
    cardBorder: "border-amber-300",
    cardBg: "bg-white",
    rail: "bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700",
    railShadow: "0 0 14px rgba(251,191,36,0.55)",
    iconWrap: "from-amber-400 to-amber-600 text-stone-900",
    iconGlow: "0 0 16px rgba(251,191,36,0.5)",
    numChip: "bg-amber-500 text-stone-900",
    periodColor: "text-amber-300",
    titleShadow: "0 0 14px rgba(251,191,36,0.35)",
    focusColor: "text-amber-700",
    tagChip: "border-amber-300 bg-amber-50 text-amber-900",
  },
  ash: {
    cardBorder: "border-zinc-400",
    cardBg: "bg-zinc-50",
    rail: "bg-gradient-to-b from-zinc-400 via-zinc-500 to-zinc-700",
    iconWrap: "from-zinc-300 to-zinc-500 text-stone-900",
    numChip: "bg-zinc-700 text-zinc-200",
    periodColor: "text-zinc-300",
    focusColor: "text-zinc-700",
    tagChip: "border-zinc-300 bg-zinc-100 text-zinc-700",
  },
  sepia: {
    cardBorder: "border-orange-300",
    cardBg: "bg-orange-50/40",
    rail: "bg-gradient-to-b from-orange-300 via-orange-600 to-amber-800",
    railShadow: "0 0 10px rgba(234,88,12,0.35)",
    iconWrap: "from-orange-400 to-orange-700 text-stone-50",
    iconGlow: "0 0 12px rgba(234,88,12,0.4)",
    numChip: "bg-orange-700 text-orange-100",
    periodColor: "text-orange-300",
    titleShadow: "0 0 10px rgba(234,88,12,0.3)",
    focusColor: "text-orange-800",
    tagChip: "border-orange-300 bg-orange-50 text-orange-900",
  },
  neon: {
    cardBorder: "border-fuchsia-300",
    cardBg: "bg-gradient-to-br from-fuchsia-50/60 via-white to-cyan-50/60",
    rail: "bg-gradient-to-b from-cyan-400 via-fuchsia-500 to-violet-600",
    railShadow: "0 0 16px rgba(217,70,239,0.55)",
    iconWrap: "from-cyan-400 via-fuchsia-500 to-violet-600 text-white",
    iconGlow: "0 0 18px rgba(217,70,239,0.55)",
    numChip: "bg-fuchsia-600 text-white",
    periodColor: "text-fuchsia-300",
    titleShadow: "0 0 14px rgba(217,70,239,0.45)",
    focusColor: "text-fuchsia-700",
    tagChip: "border-fuchsia-300 bg-fuchsia-50 text-fuchsia-800",
  },
};
