import { Link } from "wouter";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
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
  SlidersHorizontal,
  Volume2,
  Waves,
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

      {/* ── Section 5: The Electric Revolution — Instruments ───────── */}
      <ElectricRevolution isKh={isKh} />

      {/* ── Section 6: The Mechanics of Sound — Audio Equipment ────── */}
      <AudioEquipment isKh={isKh} />

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
//  Section 5 · The Electric Revolution: Instruments that Changed the World
//             បដិវត្តន៍អគ្គិសនី៖ ឧបករណ៍ភ្លេងដែលផ្លាស់ប្តូរពិភពលោក
//
//  Aesthetic: dark amplifier-cabinet vibe with neon cyan / magenta / lime
//  accents and a faint amp grill-cloth weave.
// ════════════════════════════════════════════════════════════════════════════

// ── Inline SVG illustrations ────────────────────────────────────────────

const ElectricGuitarSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} aria-hidden>
    {/* Body — solid offset shape */}
    <path
      d="M58 70 C 42 70, 28 80, 28 92 C 28 106, 42 110, 56 106 C 70 102, 84 92, 88 80 C 90 74, 84 70, 78 70 Z"
      fill="currentColor"
    />
    {/* Cutaway notch */}
    <circle cx="46" cy="86" r="4" fill="#0a0a0f" />
    {/* Pickups */}
    <rect x="56" y="74" width="22" height="5" rx="1" fill="#1a1a22" stroke="#fff" strokeWidth="0.5" />
    <rect x="56" y="84" width="22" height="5" rx="1" fill="#1a1a22" stroke="#fff" strokeWidth="0.5" />
    {/* Bridge + jack */}
    <rect x="62" y="94" width="18" height="3" fill="#fff" opacity="0.7" />
    {/* Neck */}
    <rect x="78" y="62" width="6" height="42" fill="#1a1208" transform="rotate(-30 78 62)" />
    {/* Headstock */}
    <path d="M104 18 L116 14 L118 24 L106 26 Z" fill="#1a1208" transform="rotate(-30 104 18)" />
    {/* Strings */}
    {[-1.5, -0.5, 0.5, 1.5].map((dx, i) => (
      <line
        key={i}
        x1={70 + dx}
        y1="92"
        x2={108 + dx}
        y2="20"
        stroke="#fff"
        strokeWidth="0.4"
        opacity="0.9"
      />
    ))}
  </svg>
);

const ElectricBassSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} aria-hidden>
    {/* Body — bigger, beefier */}
    <path
      d="M52 66 C 32 66, 18 80, 18 96 C 18 112, 36 116, 54 110 C 72 104, 88 92, 90 80 C 92 70, 82 66, 72 66 Z"
      fill="currentColor"
    />
    <circle cx="38" cy="90" r="4" fill="#0a0a0f" />
    {/* Single big pickup */}
    <rect x="50" y="80" width="28" height="7" rx="1" fill="#1a1a22" stroke="#fff" strokeWidth="0.5" />
    {/* Bridge */}
    <rect x="58" y="98" width="22" height="3" fill="#fff" opacity="0.7" />
    {/* Neck — longer than guitar */}
    <rect x="78" y="58" width="7" height="50" fill="#1a1208" transform="rotate(-30 78 58)" />
    {/* Headstock — flipped */}
    <path d="M108 12 L122 10 L124 22 L110 24 Z" fill="#1a1208" transform="rotate(-30 108 12)" />
    {/* 4 thick bass strings */}
    {[-2, -0.7, 0.7, 2].map((dx, i) => (
      <line
        key={i}
        x1={66 + dx}
        y1="92"
        x2={114 + dx}
        y2="14"
        stroke="#fff"
        strokeWidth="0.7"
        opacity="0.85"
      />
    ))}
  </svg>
);

const SynthesizerSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} aria-hidden>
    {/* Synth chassis */}
    <rect x="10" y="32" width="100" height="56" rx="4" fill="currentColor" />
    {/* Top control panel */}
    <rect x="14" y="36" width="92" height="20" rx="2" fill="#0a0a0f" stroke="#fff" strokeOpacity="0.2" />
    {/* Knobs */}
    {[24, 38, 52, 66, 80, 94].map((x) => (
      <g key={x}>
        <circle cx={x} cy="46" r="4.5" fill="#1a1a22" stroke="#fff" strokeOpacity="0.5" strokeWidth="0.6" />
        <line x1={x} y1="46" x2={x + 3} y2="42.5" stroke="#fff" strokeWidth="1" />
      </g>
    ))}
    {/* Tiny LED row */}
    {[24, 38, 52, 66, 80, 94].map((x, i) => (
      <circle
        key={i}
        cx={x}
        cy="54"
        r="1"
        fill={["#22d3ee", "#f0abfc", "#a3e635", "#fb7185", "#fbbf24", "#22d3ee"][i]}
      />
    ))}
    {/* Keyboard — 14 white keys with sharps */}
    <rect x="14" y="60" width="92" height="26" fill="#fafafa" stroke="#0a0a0f" strokeWidth="0.6" />
    {Array.from({ length: 13 }).map((_, i) => (
      <line
        key={i}
        x1={14 + (i + 1) * (92 / 14)}
        y1="60"
        x2={14 + (i + 1) * (92 / 14)}
        y2="86"
        stroke="#0a0a0f"
        strokeWidth="0.5"
      />
    ))}
    {/* Black keys (skipping at E-F & B-C) */}
    {[1, 2, 4, 5, 6, 8, 9, 11, 12, 13].map((i) => (
      <rect
        key={i}
        x={14 + i * (92 / 14) - 1.8}
        y="60"
        width="3.6"
        height="16"
        fill="#0a0a0f"
      />
    ))}
  </svg>
);

const PickupAmpSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 360 120" className={className} aria-hidden>
    {/* String */}
    <line x1="10" y1="30" x2="120" y2="30" stroke="#fff" strokeWidth="1.5" />
    {/* String vibration ghost */}
    <line x1="10" y1="30" x2="120" y2="30" stroke="#22d3ee" strokeWidth="0.6" opacity="0.7">
      <animate attributeName="y1" values="28;32;28" dur="1.2s" repeatCount="indefinite" />
      <animate attributeName="y2" values="32;28;32" dur="1.2s" repeatCount="indefinite" />
    </line>
    <text x="10" y="20" fill="#22d3ee" fontSize="9" fontFamily="monospace">METAL STRING</text>

    {/* Magnet / pickup beneath the string */}
    <rect x="50" y="36" width="30" height="14" rx="2" fill="#1a1a22" stroke="#22d3ee" strokeWidth="1" />
    <rect x="54" y="38" width="3" height="10" fill="#22d3ee" />
    <rect x="60" y="38" width="3" height="10" fill="#22d3ee" />
    <rect x="66" y="38" width="3" height="10" fill="#22d3ee" />
    <rect x="72" y="38" width="3" height="10" fill="#22d3ee" />
    <text x="50" y="62" fill="#22d3ee" fontSize="8" fontFamily="monospace">MAGNETIC PICKUP</text>

    {/* Cable — curving from pickup to amp */}
    <path
      d="M 80 50 Q 130 90, 200 80 T 280 70"
      fill="none"
      stroke="#f0abfc"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Electricity sparks along the cable */}
    {[140, 200, 250].map((x, i) => (
      <circle key={i} cx={x} cy={i === 0 ? 84 : i === 1 ? 80 : 73} r="2" fill="#fde047">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="0.9s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
      </circle>
    ))}
    <text x="170" y="105" fill="#f0abfc" fontSize="9" fontFamily="monospace">ELECTRICAL SIGNAL → CABLE</text>

    {/* Amplifier */}
    <g>
      <rect x="280" y="20" width="70" height="80" rx="4" fill="#1a1a22" stroke="#a3e635" strokeWidth="1.5" />
      {/* Speaker grill cloth */}
      <rect x="288" y="28" width="54" height="42" rx="2" fill="#0a0a0f" />
      <pattern id="amp-grill-pattern" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="0.5" fill="#a3e63540" />
      </pattern>
      <rect x="288" y="28" width="54" height="42" rx="2" fill="url(#amp-grill-pattern)" />
      {/* Speaker cone */}
      <circle cx="315" cy="49" r="14" fill="none" stroke="#a3e635" strokeWidth="1" opacity="0.6" />
      <circle cx="315" cy="49" r="9" fill="none" stroke="#a3e635" strokeWidth="1" opacity="0.6" />
      <circle cx="315" cy="49" r="4" fill="#a3e635" opacity="0.8" />
      {/* Knobs row */}
      {[295, 305, 315, 325, 335].map((x) => (
        <circle key={x} cx={x} cy="80" r="3" fill="#a3e635" />
      ))}
      {/* Power LED */}
      <circle cx="345" cy="92" r="1.8" fill="#fb7185">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <text x="290" y="113" fill="#a3e635" fontSize="9" fontFamily="monospace">AMPLIFIER</text>
    </g>

    {/* Sound waves blasting from speaker */}
    {[18, 24, 30].map((r, i) => (
      <path
        key={r}
        d={`M ${330 + r * 0.6} ${49 - r * 0.7} A ${r} ${r} 0 0 1 ${330 + r * 0.6} ${49 + r * 0.7}`}
        fill="none"
        stroke="#a3e635"
        strokeWidth="1.5"
        opacity={0.7 - i * 0.18}
      >
        <animate attributeName="opacity" values={`${0.7 - i * 0.18};0;${0.7 - i * 0.18}`} dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
      </path>
    ))}
  </svg>
);

type ElectricInstrument = {
  id: string;
  nameEn: string;
  nameKh: string;
  yearEn: string;
  yearKh: string;
  taglineEn: string;
  taglineKh: string;
  bodyEn: string;
  bodyKh: string;
  /** neon accent colour */
  neon: string;
  Svg: React.ComponentType<{ className?: string }>;
};

const ELECTRIC_INSTRUMENTS: ElectricInstrument[] = [
  {
    id: "electric-guitar",
    nameEn: "The Electric Guitar",
    nameKh: "ហ្គីតាអគ្គិសនី",
    yearEn: "Invented 1930s · popularised 1950s",
    yearKh: "បង្កើតក្នុងទសវត្សរ៍ ១៩៣០ · ល្បីក្នុងទសវត្សរ៍ ១៩៥០",
    taglineEn: "It defined Rock and Roll.",
    taglineKh: "វាបានកំណត់ Rock and Roll។",
    bodyEn:
      "Invented in the 1930s but popularised in the 1950s, the solid-body electric guitar threw away the hollow box and replaced it with magnetic pickups. It allowed musicians to bend strings, sustain a single note for an entire bar, and snarl with distortion in ways previously impossible on an acoustic instrument.",
    bodyKh:
      "បង្កើតក្នុងទសវត្សរ៍ ១៩៣០ ប៉ុន្តែមានប្រជាប្រិយក្នុងទសវត្សរ៍ ១៩៥០ ហ្គីតាអគ្គិសនីតួរឹងបានបោះបង់ប្រអប់ប្រហោង ហើយជំនួសវាដោយឧបករណ៍ស្រូបសំឡេងម៉ាញេទិក។ វាអនុញ្ញាតឲ្យអ្នកលេងតន្ត្រី 'បត់' ខ្សែ បន្តនូតតែមួយមួយបារទាំងមូល និងស្រែកដោយ distortion តាមរបៀបដែលមិនធ្លាប់អាចធ្វើបានលើឧបករណ៍អាគូស្ទិក។",
    neon: "#22d3ee",
    Svg: ElectricGuitarSvg,
  },
  {
    id: "electric-bass",
    nameEn: "The Electric Bass",
    nameKh: "ហ្គីតាបាសអគ្គិសនី",
    yearEn: "Mass-produced from 1951 (Fender Precision)",
    yearKh: "ផលិតជាដុំៗចាប់ពីឆ្នាំ ១៩៥១ (Fender Precision)",
    taglineEn: "The driving heartbeat of Funk, Soul & Pop.",
    taglineKh: "ចង្វាក់បេះដូងដ៏រឹងមាំនៃ Funk, Soul & Pop។",
    bodyEn:
      "The electric bass replaced the massive, heavy upright acoustic bass — and changed everything. Suddenly the bass player could move, dance, and stand on stage with the band. Its deep, driving low frequencies became the rhythmic heartbeat of Funk, Soul, Reggae, and almost all modern Pop music.",
    bodyKh:
      "ហ្គីតាបាសអគ្គិសនីបានជំនួសបាសអាគូស្ទិកឈរធំៗដ៏ធ្ងន់ — ហើយប្តូរអ្វីៗគ្រប់យ៉ាង។ ភ្លាមៗនោះ អ្នកលេងបាសអាចផ្លាស់ទី រាំ និងឈរលើឆាកជាមួយវង់ភ្លេង។ ហ្វ្រេកង់ទាបជ្រៅរបស់វាបានក្លាយជាចង្វាក់បេះដូងនៃ Funk, Soul, Reggae និងតន្ត្រី Pop ស្ទើរទាំងអស់សម័យទំនើប។",
    neon: "#f0abfc",
    Svg: ElectricBassSvg,
  },
  {
    id: "synthesizer",
    nameEn: "The Synthesizer",
    nameKh: "ស៊ីនថេស៊ីស័រ",
    yearEn: "Affordable from the 1970s · ruled the 1980s",
    yearKh: "មានតម្លៃសមរម្យចាប់ពីទសវត្សរ៍ ១៩៧០ · គ្រប់គ្រងទសវត្សរ៍ ១៩៨០",
    taglineEn: "An instrument with no strings at all.",
    taglineKh: "ឧបករណ៍ដែលមិនមានខ្សែសោះឡើយ។",
    bodyEn:
      "An instrument with no strings at all. The synthesizer creates sound purely by generating and shaping raw electronic waves — sine, square, sawtooth — and bending them with filters and envelopes. It defined the glittering sound of the 1980s and is the foundation of nearly all modern electronic dance music (EDM).",
    bodyKh:
      "ឧបករណ៍ដែលមិនមានខ្សែសោះឡើយ។ ស៊ីនថេស៊ីស័របង្កើតសំឡេងដោយផ្ទាល់តាមរយៈការបង្កើត និងបង្កើតរូបរាងរលកអេឡិចត្រូនិចសុទ្ធ — sine, square, sawtooth — ហើយកោងវាដោយ filter និង envelope។ វាបានកំណត់សំឡេងភ្លឺច្រឡោងនៃទសវត្សរ៍ ១៩៨០ ហើយជាមូលដ្ឋាននៃតន្ត្រីរាំអេឡិចត្រូនិចទំនើប (EDM) ស្ទើរទាំងអស់។",
    neon: "#a3e635",
    Svg: SynthesizerSvg,
  },
];

function ElectricRevolution({ isKh }: { isKh: boolean }) {
  return (
    <section
      id="electric-revolution"
      className="relative overflow-hidden border-y border-fuchsia-500/30"
      data-testid="electric-revolution"
      style={{
        background:
          "radial-gradient(circle at 12% 0%, rgba(34,211,238,0.18) 0%, transparent 55%)," +
          "radial-gradient(circle at 92% 100%, rgba(240,171,252,0.18) 0%, transparent 55%)," +
          "linear-gradient(180deg, #0a0a0f 0%, #050509 60%, #0a0a0f 100%)",
      }}
    >
      {/* Amp grill cloth weave */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)",
          backgroundSize: "6px 6px",
        }}
      />
      {/* Local neon keyframes */}
      <style>{`
        @keyframes er-bolt-pulse {
          0%, 100% { filter: drop-shadow(0 0 6px #22d3ee) drop-shadow(0 0 12px #22d3ee88); transform: scale(1); }
          50%      { filter: drop-shadow(0 0 14px #22d3ee) drop-shadow(0 0 28px #22d3eecc); transform: scale(1.08); }
        }
        @keyframes er-wave {
          0%, 100% { transform: scaleY(1); }
          50%      { transform: scaleY(1.4); }
        }
      `}</style>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400/40 rounded-sm px-2.5 py-0.5">
            SEC-05 · ELECTRIC
          </span>
          <span
            className={`text-xs font-bold uppercase tracking-widest text-cyan-300 ${
              isKh ? "font-khmer normal-case tracking-normal" : ""
            }`}
          >
            {isKh ? "ឧបករណ៍ភ្លេងទំនើប" : "The new instruments"}
          </span>
        </div>

        {/* Section title */}
        <h2
          className={`font-display font-extrabold text-3xl sm:text-5xl mb-3 leading-tight flex items-start gap-3 ${
            isKh ? "font-khmer leading-snug" : ""
          }`}
          style={{ color: "#fff" }}
        >
          <Zap
            className="w-9 h-9 sm:w-12 sm:h-12 text-cyan-300 flex-shrink-0 mt-1"
            style={{ animation: "er-bolt-pulse 2.4s ease-in-out infinite" }}
          />
          <span>
            {isKh ? (
              <>
                បដិវត្តន៍អគ្គិសនី៖{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #22d3ee 0%, #f0abfc 50%, #a3e635 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  ឧបករណ៍ភ្លេងដែលផ្លាស់ប្តូរពិភពលោក
                </span>
              </>
            ) : (
              <>
                The Electric Revolution:{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #22d3ee 0%, #f0abfc 50%, #a3e635 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Instruments that Changed the World
                </span>
              </>
            )}
          </span>
        </h2>
        <p
          className={`max-w-3xl text-stone-300 text-sm sm:text-base mb-10 ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "ការច្នៃប្រឌិតបី — ហ្គីតាអគ្គិសនី បាសអគ្គិសនី និងស៊ីនថេស៊ីស័រ — បានកំណត់សំឡេងនៃសតវត្សរ៍ទី ២០។ ប៉ុន្តែតើពួកវាដំណើរការដូចម្តេច? ចម្លើយចាប់ផ្តើមនៅក្នុងរូបវិទ្យានៃខ្សែរញ័រ និងម៉ាញេទិក។"
            : "Three inventions — the electric guitar, the electric bass, and the synthesizer — defined the sound of the 20th century. But how do they actually work? The answer begins in the physics of a vibrating string and a magnet."}
        </p>

        {/* ── Sub-section 1: Sound Becomes Electricity ─────────────── */}
        <div className="rounded-2xl border border-cyan-400/30 bg-black/50 backdrop-blur-sm overflow-hidden mb-10 shadow-[0_0_40px_-12px_rgba(34,211,238,0.45)]">
          <div className="px-6 sm:px-8 py-6 border-b border-cyan-400/20">
            <div
              className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase mb-2 text-cyan-300 ${
                isKh ? "font-khmer tracking-normal normal-case" : ""
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              {isKh ? "ផ្នែកទី ១ · រូបវិទ្យា" : "Section 1 · Physics"}
            </div>
            <h3
              className={`font-display font-bold text-xl sm:text-2xl text-white leading-tight ${
                isKh ? "font-khmer leading-snug" : ""
              }`}
            >
              {isKh ? "សំឡេងក្លាយជាអគ្គិសនី" : "Sound Becomes Electricity"}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 px-6 sm:px-8 py-7">
            {/* Left: explanation */}
            <div className="space-y-4 text-stone-200 text-sm sm:text-base">
              <p className={isKh ? "font-khmer leading-loose" : "leading-relaxed"}>
                {isKh
                  ? "ឧបករណ៍បុរាណ (ហ្គីតាអាគូស្ទិក វីយូឡុង ខ្លុយ) ប្រើ "
                  : "Traditional instruments (acoustic guitar, violin, flute) use a "}
                <span className="font-bold text-amber-300">
                  {isKh ? "តួប្រហោងធ្វើពីឈើ" : "hollow wooden body"}
                </span>
                {isKh
                  ? " ដើម្បីពង្រីកសំឡេងឲ្យលឺខ្លាំងជាង។ ខ្សែញ័រ ខ្យល់ខាងក្នុងតួញ័រតាមដោយ ហើយរូបរាងតួនោះច្រៀងសំឡេងចេញមកក្រៅ។"
                  : " to make sound louder. The string vibrates, the air inside the body vibrates with it, and the shape of the body sings the sound out into the room."}
              </p>
              <p className={isKh ? "font-khmer leading-loose" : "leading-relaxed"}>
                {isKh ? "ឧបករណ៍អគ្គិសនីប្រើ " : "Electric instruments instead use "}
                <span className="font-bold text-cyan-300">
                  {isKh
                    ? "ឧបករណ៍ស្រូបសំឡេងម៉ាញេទិក (Magnetic Pickups)"
                    : "Magnetic Pickups (ឧបករណ៍ស្រូបសំឡេងម៉ាញេទិក)"}
                </span>
                {isKh ? "។" : "."}
              </p>
              <p className={isKh ? "font-khmer leading-loose" : "leading-relaxed"}>
                {isKh
                  ? "នៅពេលដែលខ្សែលោហៈញ័រលើម៉ាញេទិក វាបង្កើត"
                  : "When a metal string vibrates over a magnet, it creates a "}
                <span className="font-bold text-fuchsia-300">
                  {isKh ? "ចរន្តអគ្គិសនីតូចមួយ" : "small electrical current"}
                </span>
                {isKh
                  ? "។ អគ្គិសនីនោះធ្វើដំណើរតាម"
                  : ". That electricity then travels through a "}
                <span className="font-bold text-fuchsia-300">
                  {isKh ? "ខ្សែ (cable)" : "cable"}
                </span>
                {isKh ? " ទៅកាន់ " : " to an "}
                <span className="font-bold text-lime-300">
                  {isKh ? "អំភ្លី (Amplifier)" : "Amplifier (អំភ្លី)"}
                </span>
                {isKh
                  ? " ដែលធ្វើឲ្យវាខ្លាំងគ្រប់គ្រាន់ដើម្បីបំពេញកីឡដ្ឋានទាំងមូល។"
                  : ", which makes it loud enough to fill a stadium."}
              </p>

              {/* Flow chips */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono uppercase tracking-wider">
                <span className="px-2 py-1 rounded border border-cyan-400/50 text-cyan-300 bg-cyan-500/10">
                  {isKh ? "ខ្សែញ័រ" : "Vibration"}
                </span>
                <ArrowRight className="w-3 h-3 text-stone-500" />
                <span className="px-2 py-1 rounded border border-cyan-400/50 text-cyan-300 bg-cyan-500/10">
                  {isKh ? "ម៉ាញេទិក" : "Magnetic Pickup"}
                </span>
                <ArrowRight className="w-3 h-3 text-stone-500" />
                <span className="px-2 py-1 rounded border border-fuchsia-400/50 text-fuchsia-300 bg-fuchsia-500/10">
                  {isKh ? "ខ្សែ" : "Cable"}
                </span>
                <ArrowRight className="w-3 h-3 text-stone-500" />
                <span className="px-2 py-1 rounded border border-lime-400/50 text-lime-300 bg-lime-500/10">
                  {isKh ? "អំភ្លី" : "Amplifier"}
                </span>
                <ArrowRight className="w-3 h-3 text-stone-500" />
                <Volume2 className="w-4 h-4 text-lime-300" />
              </div>
            </div>

            {/* Right: animated diagram */}
            <div
              className="rounded-xl border border-fuchsia-400/30 bg-black/60 p-3 flex items-center justify-center"
              style={{ boxShadow: "inset 0 0 30px rgba(240,171,252,0.12)" }}
            >
              <PickupAmpSvg className="w-full h-auto" />
            </div>
          </div>
        </div>

        {/* ── Sub-section 2: Instruments of a New Era ──────────────── */}
        <div className="mb-2">
          <div
            className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase mb-2 text-fuchsia-300 ${
              isKh ? "font-khmer tracking-normal normal-case" : ""
            }`}
          >
            <Guitar className="w-3.5 h-3.5" />
            {isKh ? "ផ្នែកទី ២ · រូបភាព" : "Section 2 · Profiles"}
          </div>
          <h3
            className={`font-display font-bold text-xl sm:text-2xl text-white mb-6 leading-tight ${
              isKh ? "font-khmer leading-snug" : ""
            }`}
          >
            {isKh ? "ឧបករណ៍ភ្លេងនៃយុគសម័យថ្មី" : "The Instruments of a New Era"}
          </h3>
        </div>

        {/* Responsive grid — 1 col mobile, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ELECTRIC_INSTRUMENTS.map((ins) => {
            const Svg = ins.Svg;
            return (
              <article
                key={ins.id}
                data-testid={`electric-card-${ins.id}`}
                className="rounded-2xl overflow-hidden border bg-black/60 backdrop-blur-sm flex flex-col transition-transform hover:-translate-y-1"
                style={{
                  borderColor: `${ins.neon}66`,
                  boxShadow: `0 0 0 1px ${ins.neon}22, 0 18px 40px -16px ${ins.neon}aa`,
                }}
              >
                {/* Portrait */}
                <div
                  className="relative aspect-[5/3] grid place-items-center border-b"
                  style={{
                    borderColor: `${ins.neon}33`,
                    background: `radial-gradient(circle at 50% 60%, ${ins.neon}33 0%, transparent 65%), #050509`,
                  }}
                >
                  {/* tiny grill weave */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)",
                      backgroundSize: "5px 5px",
                    }}
                  />
                  <Svg
                    className="relative w-3/4 h-3/4"
                    // SVGs use currentColor for the body fill
                  />
                  <div
                    className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono tracking-wider"
                    style={{ color: ins.neon }}
                  >
                    <span className="inline-flex items-center gap-1">
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: ins.neon, boxShadow: `0 0 6px ${ins.neon}` }}
                      />
                      LIVE
                    </span>
                    <span className="opacity-70">{isKh ? ins.yearKh : ins.yearEn}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 flex flex-col">
                  <div
                    className="text-base font-display font-bold leading-tight"
                    style={{
                      color: ins.neon,
                      textShadow: `0 0 14px ${ins.neon}66`,
                    }}
                  >
                    {ins.nameEn}
                  </div>
                  <div className="font-khmer text-base text-white/95 leading-snug mt-0.5">
                    {ins.nameKh}
                  </div>
                  <div
                    className={`text-[12px] mt-1 italic text-stone-300 ${
                      isKh ? "font-khmer not-italic leading-loose" : ""
                    }`}
                  >
                    {isKh ? ins.taglineKh : ins.taglineEn}
                  </div>
                  <p
                    className={`mt-3 text-[12.5px] text-stone-300 ${
                      isKh ? "font-khmer leading-loose" : "leading-relaxed"
                    }`}
                  >
                    {isKh ? ins.bodyKh : ins.bodyEn}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Closing line */}
        <div
          className="mt-8 rounded-xl border border-cyan-400/25 px-4 py-3 flex items-start gap-3 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-lime-500/10"
        >
          <Volume2 className="w-4 h-4 mt-0.5 text-lime-300 flex-shrink-0" />
          <p
            className={`text-xs sm:text-sm text-stone-200 ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh
              ? "ឧបករណ៍ទាំងបីនេះ — ហ្គីតា បាស និងស៊ីនថេស៊ីស័រ — បានធ្វើឲ្យសំឡេងតន្ត្រីរបស់សតវត្សរ៍ទី ២០ ខុសពីសតវត្សរ៍ផ្សេងៗទាំងអស់ដែលបានកើតមុនវា។ វាមិនមែនមកពីសំឡេងតែប៉ុណ្ណោះទេ — វាមកពីអគ្គិសនី។"
              : "These three instruments — guitar, bass, and synthesizer — made the music of the 20th century sound unlike any century that came before it. The change wasn't just in the notes. It was in the electricity."}
          </p>
        </div>
      </div>
    </section>
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

// ════════════════════════════════════════════════════════════════════════════
//  Section 6 · The Mechanics of Sound: Audio Equipment
//             យន្តការនៃសំឡេង៖ ឧបករណ៍អូឌីយ៉ូ
//
//  Aesthetic: "Studio Gear" — matte blacks, brushed metallic silvers,
//  glowing LED audio-meter greens flowing into ambers and reds (the
//  classic VU-meter colour-march). Every panel has the look of a real
//  rack-mounted piece of recording-studio equipment.
// ════════════════════════════════════════════════════════════════════════════

const STUDIO_BG =
  "bg-gradient-to-br from-[#08080a] via-[#101014] to-[#1c1c22]";
const SILVER_RING = "border-zinc-400/35";

// ── Inline SVG: vintage "ribbon" microphone ─────────────────────────────────
const VintageMicSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 160" className={className} aria-hidden>
    {/* Mic body — chromed cylinder */}
    <defs>
      <linearGradient id="micChrome" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#52525b" />
        <stop offset="40%"  stopColor="#e5e7eb" />
        <stop offset="60%"  stopColor="#f4f4f5" />
        <stop offset="100%" stopColor="#3f3f46" />
      </linearGradient>
      <linearGradient id="micGrill" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#27272a" />
        <stop offset="100%" stopColor="#0a0a0c" />
      </linearGradient>
    </defs>
    {/* Top mounting yoke */}
    <rect x="56" y="10" width="8" height="14" rx="2" fill="url(#micChrome)" />
    {/* Grill (capsule) */}
    <ellipse cx="60" cy="56" rx="32" ry="36" fill="url(#micGrill)" stroke="url(#micChrome)" strokeWidth="3" />
    {/* Grill mesh — horizontal lines */}
    {Array.from({ length: 9 }).map((_, i) => (
      <line key={i} x1="32" y1={28 + i * 7} x2="88" y2={28 + i * 7} stroke="#71717a" strokeWidth="0.7" opacity="0.7" />
    ))}
    {/* Mesh — vertical */}
    {Array.from({ length: 7 }).map((_, i) => (
      <line key={i} x1={36 + i * 8} y1="24" x2={36 + i * 8} y2="88" stroke="#71717a" strokeWidth="0.7" opacity="0.5" />
    ))}
    {/* Body shaft */}
    <rect x="50" y="92" width="20" height="44" rx="3" fill="url(#micChrome)" stroke="#27272a" strokeWidth="0.7" />
    {/* Lower band */}
    <rect x="48" y="120" width="24" height="4" fill="#18181b" />
    {/* On-air LED */}
    <circle cx="60" cy="106" r="2.5" fill="#ef4444">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
    </circle>
    {/* Cable curling away */}
    <path d="M 60 136 Q 70 148 56 156" fill="none" stroke="#0a0a0c" strokeWidth="3" strokeLinecap="round" />
    {/* Sound waves entering from the left */}
    {[10, 16, 22].map((r, i) => (
      <path
        key={r}
        d={`M ${24 - r * 0.5} ${56 - r * 0.7} A ${r} ${r} 0 0 0 ${24 - r * 0.5} ${56 + r * 0.7}`}
        fill="none"
        stroke="#22c55e"
        strokeWidth="1.5"
        opacity={0.85 - i * 0.18}
      >
        <animate attributeName="opacity" values={`${0.85 - i * 0.18};0;${0.85 - i * 0.18}`} dur="2.2s" begin={`${i * 0.32}s`} repeatCount="indefinite" />
      </path>
    ))}
  </svg>
);

// ── Inline SVG: speaker cone (cross-section, opposite of mic) ─────────────
const SpeakerConeSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 160 140" className={className} aria-hidden role="img" aria-label="speaker cone cross-section">
    <defs>
      <linearGradient id="spkChrome" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#3f3f46" />
        <stop offset="50%"  stopColor="#d4d4d8" />
        <stop offset="100%" stopColor="#52525b" />
      </linearGradient>
      <radialGradient id="spkCone" cx="50%" cy="50%">
        <stop offset="0%"   stopColor="#27272a" />
        <stop offset="80%"  stopColor="#0a0a0c" />
      </radialGradient>
    </defs>
    {/* Cabinet outline */}
    <rect x="6" y="10" width="60" height="120" rx="4" fill="#18181b" stroke="url(#spkChrome)" strokeWidth="2" />
    {/* Cone profile (trapezoid) */}
    <polygon points="20,42 56,30 56,110 20,98" fill="url(#spkCone)" stroke="url(#spkChrome)" strokeWidth="1.2" />
    {/* Voice-coil + magnet (rear) */}
    <rect x="6" y="58" width="14" height="24" fill="#0a0a0c" stroke="url(#spkChrome)" strokeWidth="1" />
    <rect x="6" y="64" width="14" height="12" fill="#71717a" />
    {/* Front dust cap */}
    <ellipse cx="56" cy="70" rx="3" ry="10" fill="#18181b" stroke="#a1a1aa" strokeWidth="0.6" />
    {/* Vibrating arrows */}
    <g stroke="#22c55e" strokeWidth="1" fill="none">
      <line x1="60" y1="70" x2="68" y2="70">
        <animate attributeName="x2" values="64;72;64" dur="0.45s" repeatCount="indefinite" />
      </line>
    </g>
    {/* Sound waves blasting outward */}
    {[18, 28, 38, 48].map((r, i) => (
      <path
        key={r}
        d={`M ${72 + r * 0.6} ${70 - r * 0.85} A ${r} ${r} 0 0 1 ${72 + r * 0.6} ${70 + r * 0.85}`}
        fill="none"
        stroke="#22c55e"
        strokeWidth="1.6"
        opacity={0.85 - i * 0.16}
      >
        <animate attributeName="opacity" values={`${0.85 - i * 0.16};0;${0.85 - i * 0.16}`} dur="2.4s" begin={`${i * 0.28}s`} repeatCount="indefinite" />
      </path>
    ))}
    {/* Cable feeding from behind */}
    <path d="M 6 90 Q -2 100 8 112" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ── Inline SVG: studio mixer console ────────────────────────────────────────
const MixerConsoleSvg = ({ className }: { className?: string }) => {
  const channels = 8;
  const xs = Array.from({ length: channels }, (_, i) => 18 + i * 28);
  return (
    <svg viewBox="0 0 240 150" className={className} aria-hidden>
      <defs>
        <linearGradient id="mxBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#27272a" />
          <stop offset="100%" stopColor="#0a0a0c" />
        </linearGradient>
        <linearGradient id="mxKnob" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#e4e4e7" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>
      </defs>
      {/* Console chassis */}
      <rect x="4" y="6" width="232" height="138" rx="6" fill="url(#mxBody)" stroke="#a1a1aa" strokeWidth="1.2" />
      {/* Channel strips */}
      {xs.map((x, i) => {
        const sliderTop = 60 + ((i * 7) % 38);   // staggered slider positions
        return (
          <g key={i}>
            {/* Channel divider */}
            <line x1={x - 12} y1="14" x2={x - 12} y2="138" stroke="#3f3f46" strokeWidth="0.7" />
            {/* Top knob (gain) */}
            <circle cx={x} cy="22" r="5" fill="url(#mxKnob)" stroke="#0a0a0c" strokeWidth="0.5" />
            <line x1={x} y1="22" x2={x + 3} y2="18.5" stroke="#0a0a0c" strokeWidth="1" />
            {/* EQ knobs (HI MID LO) */}
            <circle cx={x} cy="36" r="3.5" fill="#fbbf24" />
            <circle cx={x} cy="46" r="3.5" fill="#22c55e" />
            <circle cx={x} cy="56" r="3.5" fill="#60a5fa" />
            {/* Slider track */}
            <rect x={x - 1} y="68" width="2" height="58" fill="#3f3f46" />
            {/* Slider cap */}
            <rect x={x - 6} y={sliderTop} width="12" height="6" rx="1" fill="url(#mxKnob)" stroke="#0a0a0c" strokeWidth="0.4" />
            {/* Channel-strip LED meter (mini) */}
            <rect x={x - 9} y="68" width="2" height="56" fill="#0a0a0c" />
            {Array.from({ length: 12 }).map((_, b) => {
              const fill = b < 7 ? "#22c55e" : b < 10 ? "#fbbf24" : "#ef4444";
              const lit = (b < (10 - (i % 5))) ? 1 : 0.18;
              return <rect key={b} x={x - 9} y={68 + b * 4.6} width="2" height="3.5" fill={fill} opacity={lit} />;
            })}
          </g>
        );
      })}
    </svg>
  );
};

// ── LED VU-meter strip (horizontal classic green→amber→red) ────────────────
function VUMeter({ label, level }: { label: string; level: number }) {
  const segs = 16;
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[9px] text-zinc-500 w-3 text-right">{label}</span>
      <div className="flex-1 h-3 rounded-sm bg-black border border-zinc-700 flex items-center gap-px px-px">
        {Array.from({ length: segs }).map((_, i) => {
          const fill = i < segs * 0.65 ? "#22c55e" : i < segs * 0.85 ? "#fbbf24" : "#ef4444";
          const lit = i < Math.floor(segs * level) ? 1 : 0.15;
          return (
            <span
              key={i}
              className="flex-1 h-2 rounded-[1px]"
              style={{
                background: fill,
                opacity: lit,
                boxShadow: lit === 1 ? `0 0 4px ${fill}` : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── Studio "rack panel" card — matte black with brushed-silver border ─────
function RackPanel({
  Icon, accent, eyebrowEn, eyebrowKh, titleEn, titleKh, isKh, children,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  accent: "green" | "blue" | "red";
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  const accentText  = accent === "green" ? "text-emerald-400"
                     : accent === "blue"  ? "text-sky-400"
                                          : "text-rose-400";
  const accentGlow  = accent === "green" ? "rgba(34,197,94,0.55)"
                     : accent === "blue"  ? "rgba(96,165,250,0.55)"
                                          : "rgba(244,63,94,0.55)";
  const accentLed   = accent === "green" ? "#22c55e"
                     : accent === "blue"  ? "#60a5fa"
                                          : "#ef4444";
  return (
    <article
      className={`relative rounded-2xl border ${SILVER_RING} ${STUDIO_BG} text-zinc-100 overflow-hidden shadow-lg`}
      style={{ boxShadow: `0 14px 40px -22px ${accentGlow}, inset 0 1px 0 rgba(255,255,255,0.04)` }}
    >
      {/* Brushed-silver top rule */}
      <div className="h-[3px] w-full" style={{
        background: `linear-gradient(90deg, transparent 0%, ${accentLed}aa 12%, #d4d4d8 50%, ${accentLed}aa 88%, transparent 100%)`,
      }} aria-hidden />

      {/* Top header bar — eyebrow + title + power LED */}
      <header className="flex items-center gap-3 px-5 py-3 border-b border-zinc-700/70 bg-black/30">
        <div className={`w-10 h-10 rounded-lg bg-zinc-900 border ${SILVER_RING} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${accentText}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`font-mono text-[10px] uppercase tracking-widest ${accentText} ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? eyebrowKh : eyebrowEn}
          </div>
          <div
            className={`font-display font-bold text-lg sm:text-xl text-zinc-100 ${isKh ? "font-khmer leading-snug" : "leading-tight"}`}
            style={{ textShadow: `0 0 10px ${accentGlow}` }}
          >
            {isKh ? titleKh : titleEn}
          </div>
        </div>
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: accentLed, boxShadow: `0 0 8px ${accentLed}` }}
          aria-hidden
        />
      </header>

      <div className="p-5 sm:p-6">{children}</div>
    </article>
  );
}

function AudioEquipment({ isKh }: { isKh: boolean }) {
  return (
    <section
      className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      data-testid="section-audio-equipment"
      id="audio-equipment"
    >
      {/* Section label */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-stone-900 text-emerald-400 rounded-sm px-2.5 py-0.5">
          SEC-06
        </span>
        <span className={`text-xs font-bold uppercase tracking-widest text-emerald-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "ឧបករណ៍ស្ទូឌីយោ · យន្តការនៃសំឡេង" : "Studio Gear · The Mechanics of Sound"}
        </span>
      </div>

      <h2
        className={`font-display font-bold text-2xl sm:text-3xl text-stone-950 mb-2 ${isKh ? "font-khmer leading-snug" : ""}`}
        data-testid="audio-equipment-title"
      >
        {isKh
          ? "យន្តការនៃសំឡេង៖ ឧបករណ៍អូឌីយ៉ូ"
          : "The Mechanics of Sound: Audio Equipment"}
      </h2>
      <p className={`text-stone-700 text-sm sm:text-base mb-8 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "តន្ត្រី​សម័យ​ទំនើប​មិន​ត្រឹម​តែ​ជា​សិល្បៈ​ប៉ុណ្ណោះ​ទេ — វា​គឺ​ជា​បច្ចេកវិទ្យា​ផង​ដែរ។ មុន​ពេល​សំឡេង​មក​ដល់​ត្រចៀក​អ្នក វា​ត្រូវ​ឆ្លង​កាត់​ច្រវាក់​ឧបករណ៍​មួយ ៖ មីក្រូហ្វូន, ឧបករណ៍​លាយ, ឧបករណ៍​បំពង​សំឡេង។ មក​ស្គាល់​ឧបករណ៍​ទាំង​នោះ ​ដែល​អនុញ្ញាត​ឱ្យ​បដិវត្តន៍​ទាំង​មូល​នេះ​អាច​កើត​ឡើង។"
          : "Modern music is not just an art — it is also a technology. Before any sound reaches your ears, it travels through a chain of equipment: a microphone, a mixer, a speaker. Meet the gear that quietly made the entire 20th-century revolution possible."}
      </p>

      {/* ── Subsection 6.1: The Transducers ───────────────────────────── */}
      <div data-testid="subsection-transducers" className="mb-10">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <ArrowRightLeft className="w-4 h-4 text-emerald-700" />
          <h3 className={`font-bold text-lg sm:text-xl text-stone-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh
              ? "៦.១ · ឧបករណ៍បំប្លែងថាមពល (Transducers)"
              : "6.1 · The Transducers (ឧបករណ៍បំប្លែងថាមពល)"}
          </h3>
        </div>
        <p className={`text-stone-700 text-sm sm:text-base mb-5 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "ឧបករណ៍​បំប្លែង​ថាមពល (Transducer) គឺ​ជា​ឧបករណ៍​ដែល​ប្ដូរ​ថាមពល​ពី​ទម្រង់​មួយ​ទៅ​ទម្រង់​មួយ​ទៀត។ មីក្រូហ្វូន និង​ឧបករណ៍​បំពង​សំឡេង គឺ​ជា​ឧបករណ៍​បំប្លែង​ថាមពល​ពីរ​ដែល​ឆ្លុះ​បញ្ចាំង​គ្នា ៖ ម្នាក់​បង្វែរ​ខ្យល់​ទៅ​ភ្លើង ហើយ​ម្នាក់​ទៀត​បង្វែរ​ភ្លើង​ត្រឡប់​ទៅ​ខ្យល់​វិញ។"
            : "A transducer is a device that converts energy from one form into another. The microphone and the speaker are two perfectly mirrored transducers: one turns air into electricity, the other turns electricity back into air."}
        </p>

        {/* Mic + Speaker, mirrored, with a flow diagram in between */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
          {/* Microphone panel */}
          <RackPanel
            Icon={Mic2}
            accent="green"
            eyebrowEn="Acoustic → Electrical · ខ្យល់​ → ភ្លើង"
            eyebrowKh="អាគូស្ទិក → អគ្គិសនី · Acoustic → Electrical"
            titleEn="The Microphone · មីក្រូហ្វូន"
            titleKh="មីក្រូហ្វូន · The Microphone"
            isKh={isKh}
          >
            <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
              <VintageMicSvg className="w-20 h-auto flex-shrink-0" />
              <div>
                <p className={`text-sm text-zinc-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {isKh
                    ? "មីក្រូហ្វូន​ចាប់​យក​ថាមពល​អាគូស្ទិក (រលក​សំឡេង​ក្នុង​ខ្យល់) ហើយ​បំប្លែង​វា​ទៅ​ជា​ថាមពល​អគ្គិសនី (សញ្ញា​អូឌីយ៉ូ​ឆ្លង​កាត់​ខ្សែ)។ រលក​សំឡេង​រញ្ជួយ​បន្ទះ​ភ្នាស​តូច​មួយ ហើយ​ការ​រញ្ជួយ​នោះ​ត្រូវ​បាន​ប្ដូរ​ជា​លំនាំ​អគ្គិសនី​ដ៏​ឆ្លាត​មួយ ​ដែល​បន្ទរ​សំឡេង​ពិត​ប្រាកដ ​រាល់​ម៉ូម៉ង់។"
                    : "A microphone takes acoustic energy (sound waves in the air) and converts it into electrical energy (audio signals through a wire). Sound waves vibrate a thin diaphragm, and that vibration is translated into a clever electrical pattern that mirrors the original sound, moment by moment."}
                </p>
                <div className="mt-3 rounded-md border border-emerald-900/60 bg-emerald-950/40 p-2.5">
                  <div className={`font-mono text-[10px] uppercase tracking-widest text-emerald-300 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                    {isKh ? "ការ​បំប្លែង" : "The conversion"}
                  </div>
                  <div className={`text-sm text-emerald-100 ${isKh ? "font-khmer leading-loose" : "font-mono"}`}>
                    {isKh ? "ខ្យល់ ➜ ភ្នាស ➜ អគ្គិសនី" : "AIR ➜ DIAPHRAGM ➜ ELECTRICITY"}
                  </div>
                </div>
              </div>
            </div>
          </RackPanel>

          {/* Direction-of-flow indicator */}
          <div className="hidden lg:flex flex-col items-center justify-center px-3" aria-hidden>
            <ArrowRightLeft className="w-7 h-7 text-zinc-400" />
            <span
              className={`text-[10px] text-zinc-500 mt-2 text-center ${
                isKh ? "font-khmer leading-snug" : "font-mono uppercase tracking-widest"
              }`}
            >
              {isKh ? "ឆ្លុះ​បញ្ចាំង​គ្នា" : "Mirror"}
            </span>
            <span
              className={`text-[10px] text-zinc-600 mt-0.5 italic text-center ${
                !isKh ? "font-khmer not-italic leading-snug" : ""
              }`}
            >
              {isKh ? "perfect opposites" : "ឆ្លុះ​បញ្ចាំង​គ្នា"}
            </span>
          </div>

          {/* Speaker panel */}
          <RackPanel
            Icon={Volume2}
            accent="red"
            eyebrowEn="Electrical → Acoustic · ភ្លើង​ → ខ្យល់"
            eyebrowKh="អគ្គិសនី → អាគូស្ទិក · Electrical → Acoustic"
            titleEn="The Speaker · ឧបករណ៍បំពងសំឡេង"
            titleKh="ឧបករណ៍បំពងសំឡេង · The Speaker"
            isKh={isKh}
          >
            <div className="grid grid-cols-[1fr_auto] gap-4 items-start">
              <div>
                <p className={`text-sm text-zinc-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {isKh
                    ? "ឧបករណ៍​បំពង​សំឡេង​ធ្វើ​អ្វី​ដែល​ផ្ទុយ​ពី​មីក្រូហ្វូន​ទាំង​ស្រុង។ វា​ទទួល​យក​ថាមពល​អគ្គិសនី រុញ​មេដែក​មួយ ហើយ​ផ្លាស់​ទី​ស៊ុង (cone) ​ដើម្បី​បង្កើត​រលក​សំឡេង​យក្ស​ត្រឡប់​ទៅ​ក្នុង​ខ្យល់​វិញ។ ​មេដែក, ​បន្ទះ​ស៊ុង​ក្រដាស, ​និង​ខ្យល់​ដែល​ត្រូវ​ច្រាន — ​នោះ​ហើយ​ជា​មូល​ហេតុ​ដែល​អ្នក​ស្ដាប់​ឮ​ភ្លេង។"
                    : "A speaker does the exact opposite of a microphone. It takes electrical energy, pushes a magnet, and moves a paper cone to create massive acoustic sound waves back into the air. A magnet, a paper cone, and air being shoved — that is literally why you hear music."}
                </p>
                <div className="mt-3 rounded-md border border-rose-900/60 bg-rose-950/40 p-2.5">
                  <div className={`font-mono text-[10px] uppercase tracking-widest text-rose-300 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                    {isKh ? "ការ​បំប្លែង" : "The conversion"}
                  </div>
                  <div className={`text-sm text-rose-100 ${isKh ? "font-khmer leading-loose" : "font-mono"}`}>
                    {isKh ? "អគ្គិសនី ➜ មេដែក ➜ ខ្យល់" : "ELECTRICITY ➜ MAGNET ➜ AIR"}
                  </div>
                </div>
              </div>
              <SpeakerConeSvg className="w-24 h-auto flex-shrink-0" />
            </div>
          </RackPanel>
        </div>

        {/* Tiny "signal flow" caption strip beneath both transducers */}
        <div
          className={`mt-4 rounded-lg ${STUDIO_BG} border ${SILVER_RING} px-4 py-3 text-zinc-300 text-xs flex items-center gap-3 flex-wrap ${isKh ? "font-khmer leading-loose" : "font-mono"}`}
        >
          <Waves className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            {isKh
              ? "សំឡេង​ពិត ➜ មីក្រូហ្វូន ➜ ខ្សែ ➜ ឧបករណ៍​លាយ ➜ ឧបករណ៍​ពង្រីក​សញ្ញា ➜ ឧបករណ៍​បំពង​សំឡេង ➜ ត្រចៀក​អ្នក"
              : "REAL SOUND ➜ MIC ➜ CABLE ➜ MIXER ➜ AMPLIFIER ➜ SPEAKER ➜ YOUR EAR"}
          </span>
        </div>
      </div>

      {/* ── Subsection 6.2: The Brain of the Studio (Mixer) ───────────── */}
      <div data-testid="subsection-mixer" className="mb-10">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <SlidersHorizontal className="w-4 h-4 text-sky-700" />
          <h3 className={`font-bold text-lg sm:text-xl text-stone-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh
              ? "៦.២ · ខួរក្បាលនៃស្ទូឌីយោ — ឧបករណ៍លាយសំឡេង"
              : "6.2 · The Brain of the Studio — The Mixer"}
          </h3>
        </div>

        <RackPanel
          Icon={SlidersHorizontal}
          accent="blue"
          eyebrowEn="The Console · ​ខន​សូល"
          eyebrowKh="ខន​សូល · The Console"
          titleEn="The Audio Mixer · ឧបករណ៍លាយសំឡេង"
          titleKh="ឧបករណ៍លាយសំឡេង · The Audio Mixer"
          isKh={isKh}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-5 items-start">
            {/* Mixer console graphic + meters */}
            <div className="rounded-xl border border-zinc-700/70 bg-black/40 p-3">
              <MixerConsoleSvg className="w-full h-auto" />
              <div className="mt-3 space-y-1.5">
                <VUMeter label="L" level={0.78} />
                <VUMeter label="R" level={0.66} />
              </div>
              <div className={`text-[10px] text-zinc-500 mt-2 ${isKh ? "font-khmer leading-loose" : "font-mono uppercase tracking-widest"}`}>
                {isKh ? "៨ ឆានែល លាយចូល → ស្តេរេអូ ​ឆ្វេង/ស្ដាំ ចេញ" : "8 channels in → stereo L/R out"}
              </div>
            </div>

            {/* Explanation */}
            <div>
              <p className={`text-sm text-zinc-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh
                  ? "ឧបករណ៍​លាយ​សំឡេង​ទទួល​យក​សញ្ញា​អគ្គិសនី​រាប់​សិប​ផ្សេង​ៗ​គ្នា (ពី​មីក្រូហ្វូន​និង​ឧបករណ៍​ផ្សេង​ៗ) ​លៃ​តម្រូវ​សំឡេង (amplitude) និង​សំនៀង (frequencies) ​របស់​ពួក​វា ហើយ​លាយ​ពួក​វា​បញ្ចូល​គ្នា​ជា​បទ​ស្តេរេអូ​តែ​មួយ (ឆ្វេង និង​ស្ដាំ)។ វិស្វករ​លាយ​ស្ដាប់​មែន​ទែន — ​បញ្ចេញ​ជង់ស្គរ​ទៅ​ខាង​ឆ្វេង ​ដាក់​សំឡេង​ច្រៀង​នៅ​កណ្ដាល ​ដាក់​ហ្គីតារ​ទៅ​ខាង​ស្ដាំ — ​រហូត​ដល់​បន្ទប់​ដែល​មាន​មនុស្ស​ប្រាំ​នាក់​ស្ដាប់​ទៅ​ដូច​ជា​ក្រុម​ភ្លេង​មួយ​ឯក​ច្ឆ័ន្ទ។"
                  : "A mixer takes dozens of separate electrical signals (from different microphones and instruments), adjusts their volume (amplitude) and tone (frequencies), and blends them into one single stereo track (Left and Right). The mixing engineer is really listening — pushing the drums to the left, locking the vocal in the centre, parking the guitar to the right — until a roomful of five people sounds like one cohesive band."}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <MixerControlPill
                  isKh={isKh}
                  color="text-amber-300"
                  ledColor="#fbbf24"
                  enLabel="GAIN"
                  khLabel="ប៊ឺត"
                  enHint="how loud each input is"
                  khHint="ភាព​ខ្លាំង​នៃ​សញ្ញា​នីមួយ​ៗ"
                />
                <MixerControlPill
                  isKh={isKh}
                  color="text-emerald-300"
                  ledColor="#22c55e"
                  enLabel="EQ"
                  khLabel="អេក្យូ"
                  enHint="bass / mid / treble shaping"
                  khHint="ការ​លៃ​សំនៀង​ទាប/កណ្ដាល/ខ្ពស់"
                />
                <MixerControlPill
                  isKh={isKh}
                  color="text-sky-300"
                  ledColor="#60a5fa"
                  enLabel="PAN"
                  khLabel="ប៉ាន"
                  enHint="left ↔ right placement"
                  khHint="ដាក់​ឆ្វេង ↔ ស្ដាំ"
                />
                <MixerControlPill
                  isKh={isKh}
                  color="text-rose-300"
                  ledColor="#ef4444"
                  enLabel="FADER"
                  khLabel="ហ្វេឌ័រ"
                  enHint="final blend volume"
                  khHint="ភាព​ខ្លាំង​សម្រាប់​ការ​លាយ"
                />
              </div>

              <div className="mt-4 rounded-md border border-sky-900/60 bg-sky-950/40 p-3 flex items-start gap-2">
                <Activity className="w-4 h-4 text-sky-300 flex-shrink-0 mt-0.5" />
                <p className={`text-xs text-sky-100 ${isKh ? "font-khmer leading-loose" : "leading-snug"}`}>
                  {isKh
                    ? "បន្ទាត់​ភ្លើង​បៃតង-លឿង-ក្រហម​នៅ​ខាង​ឆ្វេង​នេះ​គឺ​ជា 'VU meter' ដែល​បង្ហាញ​ភាព​ខ្លាំង​នៃ​សញ្ញា​ក្នុង​ពេល​ពិត។ ពណ៌​ក្រហម = ខ្លាំង​ពេក នឹង​ខូច​សំឡេង។"
                    : "The green-yellow-red bars to the left are 'VU meters' showing the live signal level. Red = too loud — the sound will distort."}
                </p>
              </div>
            </div>
          </div>
        </RackPanel>
      </div>

      {/* ── Subsection 6.3: The 20th Century Revolution ───────────────── */}
      <div data-testid="subsection-revolution">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Zap className="w-4 h-4 text-rose-700" />
          <h3 className={`font-bold text-lg sm:text-xl text-stone-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh
              ? "៦.៣ · បដិវត្តន៍សតវត្សទី២០"
              : "6.3 · The 20th Century Revolution"}
          </h3>
        </div>

        {/* Highlighted manifesto block */}
        <div
          className={`relative rounded-2xl border ${SILVER_RING} ${STUDIO_BG} overflow-hidden mb-5`}
          style={{ boxShadow: "0 18px 48px -22px rgba(34,197,94,0.45)" }}
          data-testid="audio-revolution-quote"
        >
          {/* meter-tape strip across the top */}
          <div className="h-1.5 w-full flex">
            {Array.from({ length: 24 }).map((_, i) => {
              const c = i < 16 ? "#22c55e" : i < 21 ? "#fbbf24" : "#ef4444";
              return <span key={i} className="flex-1" style={{ background: c, opacity: 0.55 + (i / 24) * 0.45 }} />;
            })}
          </div>
          <div className="p-6 sm:p-8">
            <div className={`font-mono text-[10px] uppercase tracking-widest text-emerald-400 mb-3 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "សេចក្ដី​ប្រកាស" : "The thesis"}
            </div>
            <p
              className={`font-display font-extrabold text-xl sm:text-3xl text-zinc-50 leading-tight ${isKh ? "font-khmer leading-snug" : ""}`}
              style={{ textShadow: "0 0 18px rgba(34,197,94,0.45)" }}
            >
              {isKh
                ? "បើ​គ្មាន​ឧបករណ៍​ទាំង​នេះ​ទេ ​តន្ត្រី​សម័យ​ទំនើប​ក៏​មិន​អាច​កើត​មាន​ដែរ។"
                : "Without this gear, modern music does not exist."}
            </p>
            <p
              className={`mt-3 text-sm sm:text-base text-zinc-400 ${
                !isKh ? "font-khmer leading-loose" : "italic leading-relaxed"
              }`}
            >
              {isKh
                ? "Without this gear, modern music does not exist."
                : "បើ​គ្មាន​ឧបករណ៍​ទាំង​នេះ​ទេ ​តន្ត្រី​សម័យ​ទំនើប​ក៏​មិន​អាច​កើត​មាន​ដែរ។"}
            </p>
          </div>
        </div>

        {/* Two cause/effect cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RevolutionCard
            isKh={isKh}
            accent="green"
            Icon={Mic2}
            enHeading="The microphone unlocked intimate singing."
            khHeading="មីក្រូហ្វូន​បាន​ដោះ​សោ​ការ​ច្រៀង​យ៉ាង​ស្ងប់ស្ងាត់។"
            enBody="Before the microphone, singers had to scream over a loud band so the back of the room could hear. With a mic in front of their lips, performers could whisper, hum, and sigh — and the whole world would still hear every breath. That is what made the soft, conversational vocals of jazz crooners and modern pop possible."
            khBody="មុន​ពេល​មាន​មីក្រូហ្វូន ​អ្នក​ច្រៀង​ត្រូវ​តែ​ស្រែក​ដាក់​ក្រុម​ភ្លេង​ខ្លាំង ​ដើម្បី​ឱ្យ​មនុស្ស​នៅ​ខាង​ក្រោយ​បន្ទប់​ឮ។ ​ពេល​មាន​មីក្រូហ្វូន​នៅ​មុខ​បបូរ​មាត់ ​អ្នក​ចម្រៀង​អាច​ខ្សឹប ​អាច​ច្រៀង​ស្រួយ ​អាច​ដក​ដង្ហើម — ហើយ​ពិភពលោក​ទាំង​មូល​នៅ​តែ​ឮ​ដង្ហើម​ទាំង​មូល​របស់​ពួក​គេ។ ​នោះ​ហើយ​ជា​មូល​ហេតុ​ដែល​សំឡេង​ច្រៀង​ទន់​ភ្លន់ ​ដូច​ជា Jazz crooners និង Pop សម័យ​ទំនើប អាច​កើត​ឡើង។"
          />
          <RevolutionCard
            isKh={isKh}
            accent="red"
            Icon={Guitar}
            enHeading="The amplifier gave birth to the electric guitar — and to rock & roll."
            khHeading="ឧបករណ៍​ពង្រីក​សញ្ញា​បាន​ផ្ដល់​កំណើត​ឱ្យ​ហ្គីតារ​អគ្គិសនី — និង​តន្ត្រី​រ៉ុក​អែន​រ៉ូល។"
            enBody="An acoustic guitar can never out-shout a drum kit. But run an electric guitar through an amplifier and a speaker stack, and a single player suddenly has more sonic power than an entire brass band. That one technological shift gave the world Chuck Berry, Jimi Hendrix, the British Invasion, heavy metal, punk, and grunge — every loud guitar moment of the last 70 years."
            khBody="ហ្គីតារ​អាគូស្ទិក​មិន​អាច​ឈ្នះ​សំឡេង​ស្គរ​ទេ។ ​ប៉ុន្តែ​ដោត​ហ្គីតារ​អគ្គិសនី​ឆ្លង​កាត់​ឧបករណ៍​ពង្រីក​សញ្ញា​និង​បំពង​សំឡេង ​អ្នក​លេង​តែ​ម្នាក់​ឯង​ភ្លាម​មាន​អំណាច​សំឡេង​ខ្លាំង​ជាង​ក្រុម​ភ្លេង​លង្ហិន​ទាំង​មូល។ ​ការ​ផ្លាស់​ប្ដូរ​បច្ចេកវិទ្យា​នោះ​មួយ​បាន​ផ្ដល់​ឱ្យ​ពិភពលោក​នូវ Chuck Berry, Jimi Hendrix, ការ​លុក​លុយ​អង់​គ្លេស, តន្ត្រី​មេតាល់, ភាង់, និង​ហ្គ្រាង — រាល់​សន្ទុះ​ហ្គីតារ​ខ្លាំង​ៗ​នៃ ៧០ ឆ្នាំ​ចុង​ក្រោយ​នេះ។"
          />
        </div>
      </div>
    </section>
  );
}

function MixerControlPill({
  isKh, color, ledColor, enLabel, khLabel, enHint, khHint,
}: {
  isKh: boolean;
  color: string;
  ledColor: string;
  enLabel: string; khLabel: string;
  enHint: string;  khHint: string;
}) {
  return (
    <div className="rounded-lg border border-zinc-700/70 bg-black/30 px-3 py-2 flex items-start gap-2">
      <span
        className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
        style={{ background: ledColor, boxShadow: `0 0 6px ${ledColor}` }}
        aria-hidden
      />
      <div className="min-w-0">
        <div className={`font-mono text-[10px] tracking-widest ${color} ${isKh ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}>
          {isKh ? khLabel : enLabel}
        </div>
        <div className={`text-[11px] text-zinc-400 ${isKh ? "font-khmer leading-loose" : "leading-snug"}`}>
          {isKh ? khHint : enHint}
        </div>
      </div>
    </div>
  );
}

function RevolutionCard({
  isKh, accent, Icon, enHeading, khHeading, enBody, khBody,
}: {
  isKh: boolean;
  accent: "green" | "red";
  Icon: React.ComponentType<{ className?: string }>;
  enHeading: string; khHeading: string;
  enBody: string; khBody: string;
}) {
  const accentText = accent === "green" ? "text-emerald-300" : "text-rose-300";
  const accentLed  = accent === "green" ? "#22c55e" : "#ef4444";
  const stripFrom  = accent === "green" ? "#22c55e" : "#fbbf24";
  const stripTo    = accent === "green" ? "#fbbf24" : "#ef4444";
  return (
    <article className={`relative rounded-2xl border ${SILVER_RING} ${STUDIO_BG} text-zinc-100 overflow-hidden`}>
      <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${stripFrom}, ${stripTo})` }} />
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg bg-zinc-900 border ${SILVER_RING} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${accentText}`} />
          </div>
          <h4
            className={`font-display font-bold text-base sm:text-lg leading-snug ${isKh ? "font-khmer" : ""}`}
            style={{ textShadow: `0 0 10px ${accentLed}55` }}
          >
            {isKh ? khHeading : enHeading}
          </h4>
        </div>
        <p className={`text-sm text-zinc-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh ? khBody : enBody}
        </p>
      </div>
    </article>
  );
}
