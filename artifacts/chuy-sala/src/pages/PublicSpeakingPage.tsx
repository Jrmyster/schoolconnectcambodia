import { Link } from "wouter";
import {
  ArrowLeft,
  Presentation,
  Image as ImageIcon,
  Anchor,
  Layers3,
  Megaphone,
  Eye,
  Volume2,
  Gauge,
  Mic,
  Brain,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  ENG-WR-PUB-01 · Public Speaking & Presentations
//                  ការនិយាយជាសាធារណៈ និងការបង្ហាញ
//
//  A new life-skills section nested under the English Writing module.
//  Three strictly-bilingual cards (BOTH EN + KH always rendered):
//   1. You Are the Presentation       — Golden Rule + 6×6 Rule
//   2. The Three-Part Structure       — Hook → Rule of 3 → Call to Action
//   3. Body Language & Voice          — Eye contact + 20% louder / 20% slower
//
//  Aesthetic: "Auditorium" — crisp white cards on a deep navy stage, with
//  warm amber spotlight accents. Distinct from the warm-amber English Writing
//  page so this section feels like stepping onto a stage.
// ════════════════════════════════════════════════════════════════════════════

export function PublicSpeakingPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-slate-100 overflow-hidden">
      <AuditoriumBg />

      {/* Back link */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/english-writing"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors ${isKh ? "font-khmer" : ""}`}
          data-testid="back-english-writing"
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅការសរសេរភាសាអង់គ្លេស" : "Back to English Writing"}
        </Link>
      </div>

      {/* Hero — strictly bilingual */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-amber-300/60 text-amber-200 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-md flex-wrap backdrop-blur-sm">
          <Presentation className="w-3.5 h-3.5" />
          <span>English Writing · Life Skills</span>
          <span className="opacity-50">·</span>
          <span className="font-khmer normal-case">ការសរសេរភាសាអង់គ្លេស · ជំនាញជីវិត</span>
          <span className="font-mono opacity-60">· ENG-WR-PUB-01</span>
        </div>

        <h1
          data-testid="page-title"
          className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-2 leading-tight text-white"
        >
          Public Speaking <span className="text-amber-300">&amp; Presentations</span>
        </h1>
        <h2 className="font-khmer font-bold text-xl sm:text-3xl lg:text-4xl mb-5 leading-loose text-slate-200">
          ការនិយាយជាសាធារណៈ <span className="text-amber-300">និងការបង្ហាញ</span>
        </h2>

        <div className="space-y-2 max-w-3xl">
          <p className="text-slate-200 text-base leading-relaxed">
            How to walk onto a stage — or to the front of a classroom — and own the room. Three rules that turn nervous students into confident speakers.
          </p>
          <p className="text-slate-200 text-base font-khmer leading-loose">
            របៀបឈានជើងឡើងលើឆាក — ឬដើរទៅខាងមុខថ្នាក់រៀន — ហើយគ្រប់គ្រងបន្ទប់នោះ។ ច្បាប់បីដែលប្រែសិស្សដែលភ័យខ្លាច ឲ្យក្លាយជាអ្នកនិយាយដែលមានទំនុកចិត្ត។
          </p>
        </div>
      </header>

      {/* Three cards */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <YouAreThePresentationCard />
          <ThreePartStructureCard />
          <BodyLanguageVoiceCard />
        </div>
      </section>

      {/* Closing — bilingual */}
      <footer className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <div className="inline-block rounded-2xl border border-amber-300/60 bg-slate-900/60 backdrop-blur-sm px-6 py-4 text-slate-100 shadow-lg">
          <p className="font-serif italic">
            “The audience came to hear <em>you</em>, not to read your slides.”
          </p>
          <p className="font-khmer not-italic leading-loose text-slate-200 mt-1">
            «ទស្សនិកជនបានមកស្ដាប់ <em>អ្នក</em> មិនមែនមកអានស្លាយរបស់អ្នកទេ។»
          </p>
        </div>
      </footer>
    </div>
  );
}

export default PublicSpeakingPage;

// ════════════════════════════════════════════════════════════════════════════
//  Background — auditorium: deep navy with a soft amber spotlight pool
// ════════════════════════════════════════════════════════════════════════════

function AuditoriumBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #020617 0%, #0f172a 35%, #1e293b 75%, #0f172a 100%)",
        }}
      />
      {/* Spotlight cone — top-center warm glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 38% at 50% 0%, rgba(252, 211, 77, 0.18) 0%, rgba(252, 211, 77, 0.04) 50%, transparent 80%)",
        }}
      />
      {/* Faint dot grid for stage texture */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="aud-dots" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.7" fill="#cbd5e1" opacity="0.10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#aud-dots)" />
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Bilingual helpers — always render BOTH languages
// ════════════════════════════════════════════════════════════════════════════

function BilingualBlock({ en, kh }: { en: React.ReactNode; kh: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm leading-relaxed text-slate-700">{en}</p>
      <p className="text-sm font-khmer leading-loose text-slate-700">{kh}</p>
    </div>
  );
}

function SubLabel({ en, kh }: { en: string; kh: string }) {
  return (
    <div className="text-[11px] font-mono uppercase tracking-widest mb-1 flex flex-wrap gap-x-2 text-slate-500">
      <span>{en}</span>
      <span className="font-khmer normal-case tracking-normal text-[0.7rem]">{kh}</span>
    </div>
  );
}

// White card shell shared by all three cards — auditorium aesthetic
function StageCard({
  cardNo,
  topicEn,
  topicKh,
  titleEn,
  titleKh,
  Icon,
  testId,
  children,
}: {
  cardNo: string;
  topicEn: string;
  topicKh: string;
  titleEn: string;
  titleKh: string;
  Icon: typeof Presentation;
  testId: string;
  children: React.ReactNode;
}) {
  return (
    <article
      data-testid={testId}
      className="relative rounded-3xl bg-white border-2 border-slate-300 shadow-2xl overflow-hidden flex flex-col text-slate-900"
    >
      {/* Navy header strip */}
      <header
        className="px-5 pt-5 pb-3 border-b-2 border-amber-300/80"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
        }}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-300 border-2 border-amber-200 text-slate-900 flex items-center justify-center shadow-md">
            <Icon className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-200/90 mb-0.5 flex flex-wrap gap-x-2">
              <span>Card · {cardNo}</span>
              <span className="opacity-50">/</span>
              <span>{topicEn}</span>
              <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-90">{topicKh}</span>
            </div>
            <h3 className="font-bold text-lg text-white leading-tight">
              <span className="block">{titleEn}</span>
              <span className="block font-khmer text-base leading-loose mt-0.5 text-amber-100">
                {titleKh}
              </span>
            </h3>
          </div>
        </div>
      </header>

      {/* White body */}
      <div className="px-5 py-4 flex flex-col gap-4 flex-1">
        {children}
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 1 — You Are the Presentation
// ════════════════════════════════════════════════════════════════════════════

function YouAreThePresentationCard() {
  return (
    <StageCard
      cardNo="01"
      topicEn="Mindset"
      topicKh="ផ្នត់គំនិត"
      titleEn="You Are the Presentation"
      titleKh="អ្នកគឺជាការបង្ហាញ"
      Icon={Mic}
      testId="card-you-are"
    >
      {/* Golden Rule callout */}
      <div className="rounded-xl border-2 border-amber-400 bg-amber-50 p-3">
        <SubLabel en="The Golden Rule" kh="ច្បាប់មាស" />
        <p className="text-base font-bold text-slate-900 leading-snug">
          The slides are <strong className="text-amber-700">not</strong> the presentation. <strong className="text-amber-700">YOU</strong> are.
        </p>
        <p className="text-base font-bold text-slate-900 font-khmer leading-loose mt-1">
          ស្លាយមិនមែនជាការបង្ហាញទេ។ <strong className="text-amber-700">អ្នក</strong> ទេដែលជាការបង្ហាញ។
        </p>
      </div>

      <BilingualBlock
        en={
          <>
            The slides are a backdrop. They support what you are saying — they do not <em>replace</em> what you are saying.
          </>
        }
        kh={
          <>
            ស្លាយគ្រាន់តែជាផ្ទៃខាងក្រោយ។ វាគាំទ្រនូវអ្វីដែលអ្នកកំពុងនិយាយ — វាមិន <em>ជំនួស</em> អ្វីដែលអ្នកកំពុងនិយាយឡើយ។
          </>
        }
      />

      {/* The 6×6 Rule */}
      <div>
        <SubLabel en="The 6 × 6 Rule" kh="ច្បាប់ ៦ × ៦" />
        <BilingualBlock
          en={
            <>
              A slide should <strong>never</strong> have paragraphs of text. Limit a slide to a maximum of:
            </>
          }
          kh={
            <>
              ស្លាយមួយ <strong>មិនគួរ</strong> មានកថាខណ្ឌអក្សរវែងៗឡើយ។ កំណត់ស្លាយឲ្យមានយ៉ាងច្រើនបំផុត ៖
            </>
          }
        />

        {/* The 6×6 visual */}
        <SixBySixVisual />

        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-slate-100 border-2 border-slate-700 p-2 text-center">
            <div className="font-display font-extrabold text-3xl text-slate-900 leading-none">6</div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-slate-700 mt-0.5">Bullets max</div>
            <div className="text-[11px] font-khmer text-slate-700 leading-loose">ចំណុចយ៉ាងច្រើន</div>
          </div>
          <div className="rounded-lg bg-slate-100 border-2 border-slate-700 p-2 text-center">
            <div className="font-display font-extrabold text-3xl text-slate-900 leading-none">6</div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-slate-700 mt-0.5">Words / line</div>
            <div className="text-[11px] font-khmer text-slate-700 leading-loose">ពាក្យក្នុងមួយបន្ទាត់</div>
          </div>
        </div>
      </div>

      {/* Why callout */}
      <div className="rounded-lg border-l-4 border-l-rose-500 bg-rose-50 border border-rose-200 p-2.5">
        <p className="text-sm text-slate-800 leading-snug">
          If the audience is reading a wall of text, they are <strong>not listening</strong> to your voice.
        </p>
        <p className="text-sm text-slate-800 font-khmer leading-loose mt-1">
          ប្រសិនបើទស្សនិកជនកំពុងអានជញ្ជាំងអក្សរ ពួកគេ <strong>មិនកំពុងស្ដាប់</strong> សំឡេងរបស់អ្នកទេ។
        </p>
      </div>

      <div className="rounded-lg border-l-4 border-l-emerald-500 bg-emerald-50 border border-emerald-200 p-2.5 flex items-start gap-2.5">
        <ImageIcon className="w-4 h-4 mt-1 flex-shrink-0 text-emerald-700" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-800 leading-snug">
            Use <strong>big, bold images</strong> instead. A picture they cannot read forces them to <em>listen</em> to you.
          </p>
          <p className="text-sm text-slate-800 font-khmer leading-loose mt-1">
            ប្រើ <strong>រូបភាពធំៗ និងលេចធ្លោ</strong> ជំនួសវិញ។ រូបភាពដែលគេអានមិនបានបង្ខំឲ្យពួកគេ <em>ស្ដាប់</em> អ្នក។
          </p>
        </div>
      </div>
    </StageCard>
  );
}

// Side-by-side BAD vs GOOD slide visual
function SixBySixVisual() {
  return (
    <div className="mt-2 grid grid-cols-2 gap-2" aria-hidden="true">
      {/* BAD slide — wall of text */}
      <div className="rounded-md border-2 border-rose-400 bg-white p-2 relative">
        <div className="absolute -top-2 left-2 text-[9px] font-mono font-bold uppercase tracking-widest bg-rose-500 text-white px-1.5 py-0.5 rounded">
          ✗ Bad / មិនល្អ
        </div>
        <div className="space-y-[3px] mt-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-[3px] rounded bg-slate-400"
              style={{ width: `${88 - (i % 3) * 6}%` }}
            />
          ))}
        </div>
      </div>
      {/* GOOD slide — image + 6 bullets */}
      <div className="rounded-md border-2 border-emerald-500 bg-white p-2 relative">
        <div className="absolute -top-2 left-2 text-[9px] font-mono font-bold uppercase tracking-widest bg-emerald-600 text-white px-1.5 py-0.5 rounded">
          ✓ Good / ល្អ
        </div>
        <div
          className="h-8 rounded mt-2 mb-1.5 flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)",
          }}
        >
          <ImageIcon className="w-4 h-4 text-amber-900" />
        </div>
        <div className="space-y-[3px]">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-emerald-600 flex-shrink-0" />
              <div
                className="h-[3px] rounded bg-slate-700"
                style={{ width: `${50 - i * 5}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 2 — The Three-Part Structure
// ════════════════════════════════════════════════════════════════════════════

function ThreePartStructureCard() {
  return (
    <StageCard
      cardNo="02"
      topicEn="Structure"
      topicKh="រចនាសម្ព័ន្ធ"
      titleEn="The Three-Part Structure"
      titleKh="រចនាសម្ព័ន្ធបីផ្នែក"
      Icon={Layers3}
      testId="card-three-part"
    >
      <BilingualBlock
        en={
          <>
            The classic shape of every great talk — used from TED stages to your school assembly.
          </>
        }
        kh={
          <>
            រចនាសម្ព័ន្ធបុរាណនៃការនិយាយដ៏អស្ចារ្យគ្រប់ប្រភេទ — ប្រើតាំងពីឆាក TED រហូតដល់ការប្រជុំសាលារបស់អ្នក។
          </>
        }
      />

      {/* The 3-step flow visual */}
      <ThreeStepFlow />

      {/* Step 1 — The Hook */}
      <StepBlock
        n="1"
        Icon={Anchor}
        accent="border-amber-500 bg-amber-50"
        accentText="text-amber-800"
        nameEn="The Hook"
        nameKh="ការទាក់ទាញ"
        en={
          <>
            Start with a <strong>question</strong>, a <strong>surprising fact</strong>, or a <strong>short story</strong>. Make the audience <em>want</em> to listen.
          </>
        }
        kh={
          <>
            ចាប់ផ្ដើមដោយ <strong>សំណួរ</strong> ឬ <strong>ការពិតគួរឲ្យភ្ញាក់ផ្អើល</strong> ឬ <strong>រឿងខ្លីមួយ</strong>។ ធ្វើឲ្យទស្សនិកជន <em>ចង់</em> ស្ដាប់។
          </>
        }
      />

      {/* Step 2 — Rule of Three */}
      <StepBlock
        n="2"
        Icon={Brain}
        accent="border-blue-500 bg-blue-50"
        accentText="text-blue-800"
        nameEn="The Rule of Three"
        nameKh="ច្បាប់នៃចំណុចបី"
        en={
          <>
            Human brains easily remember things in <strong>threes</strong>. Break your main topic into <strong>exactly three</strong> simple points.
          </>
        }
        kh={
          <>
            ខួរក្បាលមនុស្សចាំងាយនូវរបស់ដែលមាន <strong>បី</strong>។ បំបែកប្រធានបទសំខាន់របស់អ្នកជា <strong>បីចំណុច</strong> ត្រឹមត្រូវដ៏សាមញ្ញ។
          </>
        }
        extra={
          <div className="mt-2 flex items-center justify-center gap-2">
            {["1", "2", "3"].map((d) => (
              <div
                key={d}
                className="w-8 h-8 rounded-full bg-blue-600 text-white font-display font-bold flex items-center justify-center text-sm shadow"
              >
                {d}
              </div>
            ))}
          </div>
        }
      />

      {/* Step 3 — Call to Action */}
      <StepBlock
        n="3"
        Icon={Megaphone}
        accent="border-rose-500 bg-rose-50"
        accentText="text-rose-800"
        nameEn="The Call to Action"
        nameKh="ការសន្និដ្ឋាន និងការជំរុញ"
        en={
          <>
            End <strong>strongly</strong>. Tell the audience exactly what you want them to <strong>remember</strong> or <strong>do next</strong>.
          </>
        }
        kh={
          <>
            បញ្ចប់ឲ្យ <strong>ខ្លាំងក្លា</strong>។ ប្រាប់ទស្សនិកជនពិតប្រាកដនូវអ្វីដែលអ្នកចង់ឲ្យពួកគេ <strong>ចងចាំ</strong> ឬ <strong>ធ្វើបន្ទាប់</strong>។
          </>
        }
      />
    </StageCard>
  );
}

function StepBlock({
  n,
  Icon,
  accent,
  accentText,
  nameEn,
  nameKh,
  en,
  kh,
  extra,
}: {
  n: string;
  Icon: typeof Anchor;
  accent: string;
  accentText: string;
  nameEn: string;
  nameKh: string;
  en: React.ReactNode;
  kh: React.ReactNode;
  extra?: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border-2 ${accent} p-3`}>
      <div className="flex items-center gap-2 mb-1.5">
        <div className={`w-7 h-7 rounded-full bg-white border-2 ${accent} flex items-center justify-center font-display font-bold text-sm ${accentText}`}>
          {n}
        </div>
        <Icon className={`w-4 h-4 ${accentText}`} aria-hidden="true" />
        <div className="leading-tight">
          <div className={`font-bold text-sm ${accentText}`}>{nameEn}</div>
          <div className={`font-khmer text-sm leading-loose ${accentText}`}>{nameKh}</div>
        </div>
      </div>
      <p className="text-sm text-slate-800 leading-relaxed">{en}</p>
      <p className="text-sm text-slate-800 font-khmer leading-loose mt-1">{kh}</p>
      {extra}
    </div>
  );
}

// Hook → Rule of 3 → CTA flow visual
function ThreeStepFlow() {
  return (
    <div
      className="relative w-full h-20 rounded-lg border-2 border-slate-300 bg-slate-50 px-2 py-2 flex items-center justify-between gap-2"
      aria-hidden="true"
    >
      {[
        { label: "HOOK", kh: "ទាក់ទាញ", color: "bg-amber-500", text: "text-amber-50" },
        { label: "× 3", kh: "ច្បាប់ ៣", color: "bg-blue-600", text: "text-blue-50" },
        { label: "CTA", kh: "ជំរុញ", color: "bg-rose-600", text: "text-rose-50" },
      ].map((step, i, arr) => (
        <div key={step.label} className="flex items-center flex-1">
          <div
            className={`flex-1 rounded-md ${step.color} ${step.text} px-2 py-1.5 text-center shadow`}
          >
            <div className="font-display font-extrabold text-sm leading-none">{step.label}</div>
            <div className="font-khmer text-[10px] leading-loose mt-0.5">{step.kh}</div>
          </div>
          {i < arr.length - 1 && (
            <div className="px-1 text-slate-400 font-bold text-lg" aria-hidden="true">›</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 3 — Body Language & Voice
// ════════════════════════════════════════════════════════════════════════════

function BodyLanguageVoiceCard() {
  return (
    <StageCard
      cardNo="03"
      topicEn="Delivery"
      topicKh="ការបញ្ជូន"
      titleEn="Body Language & Voice"
      titleKh="កាយវិការ និងសំឡេង"
      Icon={Megaphone}
      testId="card-body-voice"
    >
      <BilingualBlock
        en={
          <>
            What you <em>do</em> with your body and voice matters more than what you <em>say</em>.
          </>
        }
        kh={
          <>
            អ្វីដែលអ្នក <em>ធ្វើ</em> ដោយរូបកាយ និងសំឡេងរបស់អ្នក សំខាន់ជាងអ្វីដែលអ្នក <em>និយាយ</em>។
          </>
        }
      />

      {/* Eye Contact */}
      <div className="rounded-xl border-2 border-blue-600 bg-blue-50 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Eye className="w-5 h-5 text-blue-700" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-blue-900">Eye Contact</div>
            <div className="font-khmer text-base text-blue-900 leading-loose">ការសម្លឹងភ្នែក</div>
          </div>
        </div>

        <EyeContactDiagram />

        <div className="mt-2 grid grid-cols-1 gap-2">
          <div className="rounded-md bg-rose-100 border border-rose-300 p-2">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-700 mb-0.5 flex flex-wrap gap-x-2">
              <span>✗ Don't</span>
              <span className="font-khmer normal-case tracking-normal">មិនល្អ</span>
            </div>
            <p className="text-sm text-slate-800 leading-snug">
              Stare at the floor or the projector screen.
            </p>
            <p className="text-sm text-slate-800 font-khmer leading-loose">
              សម្លឹងមើលដី ឬមើលអេក្រង់​ម៉ាស៊ីនបញ្ចាំង។
            </p>
          </div>
          <div className="rounded-md bg-emerald-100 border border-emerald-400 p-2">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 mb-0.5 flex flex-wrap gap-x-2">
              <span>✓ Do</span>
              <span className="font-khmer normal-case tracking-normal">ល្អ</span>
            </div>
            <p className="text-sm text-slate-800 leading-snug">
              Look <strong>directly</strong> at your friends in the audience.
            </p>
            <p className="text-sm text-slate-800 font-khmer leading-loose">
              មើល <strong>ដោយផ្ទាល់</strong> ទៅកាន់មិត្តភក្តិរបស់អ្នកនៅក្នុងទស្សនិកជន។
            </p>
          </div>
        </div>
      </div>

      {/* Volume & Pace */}
      <div className="rounded-xl border-2 border-amber-500 bg-amber-50 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Volume2 className="w-5 h-5 text-amber-700" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-amber-900">Volume & Pace</div>
            <div className="font-khmer text-base text-amber-900 leading-loose">សំឡេង និងល្បឿន</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              When people get nervous, they speak <strong>too fast</strong> and <strong>too quietly</strong>.
            </>
          }
          kh={
            <>
              នៅពេលមនុស្សភ័យព្រួយ ពួកគេនិយាយ <strong>លឿនពេក</strong> និង <strong>ស្ងាត់ពេក</strong>។
            </>
          }
        />

        {/* The 20% rule visual */}
        <div className="mt-2 grid grid-cols-2 gap-2">
          <TwentyPercentDial label="LOUDER" labelKh="ខ្លាំងជាង" Icon={Volume2} />
          <TwentyPercentDial label="SLOWER" labelKh="យឺតជាង" Icon={Gauge} />
        </div>

        <div className="mt-2 rounded-md border-l-4 border-l-amber-600 bg-white border border-amber-300 p-2.5">
          <p className="text-sm font-bold text-slate-900 leading-snug">
            You must speak <strong className="text-amber-700">20% louder</strong> and <strong className="text-amber-700">20% slower</strong> than you think is normal.
          </p>
          <p className="text-sm font-bold text-slate-900 font-khmer leading-loose mt-1">
            អ្នកត្រូវនិយាយ <strong className="text-amber-700">ខ្លាំងជាង ២០%</strong> និង <strong className="text-amber-700">យឺតជាង ២០%</strong> ពីអ្វីដែលអ្នកគិតថាធម្មតា។
          </p>
        </div>
      </div>
    </StageCard>
  );
}

// Eye contact: speaker pupil → arrows to multiple audience members
function EyeContactDiagram() {
  return (
    <div
      className="mt-1 relative w-full h-24 rounded-md bg-white border border-blue-300 overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 240 96" className="w-full h-full">
        {/* Stage line */}
        <line x1="0" y1="78" x2="240" y2="78" stroke="#cbd5e1" strokeWidth="1" />
        {/* Speaker on the left */}
        <circle cx="34" cy="48" r="14" fill="#1e3a8a" />
        <rect x="22" y="60" width="24" height="18" rx="3" fill="#1e3a8a" />
        {/* Speaker eyes */}
        <circle cx="29" cy="46" r="2.2" fill="#fef3c7" />
        <circle cx="39" cy="46" r="2.2" fill="#fef3c7" />
        <circle cx="29.5" cy="46.5" r="1" fill="#0f172a" />
        <circle cx="39.5" cy="46.5" r="1" fill="#0f172a" />
        {/* Audience heads on the right */}
        {[
          { x: 130, y: 56 },
          { x: 165, y: 44 },
          { x: 200, y: 56 },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="9" fill="#94a3b8" />
            <rect x={p.x - 8} y={p.y + 7} width="16" height="14" rx="2" fill="#94a3b8" />
          </g>
        ))}
        {/* Eye-contact arrows from speaker to each audience head */}
        <defs>
          <marker id="arrow-eye" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 Z" fill="#2563eb" />
          </marker>
        </defs>
        {[
          { x: 130, y: 56 },
          { x: 165, y: 44 },
          { x: 200, y: 56 },
        ].map((p, i) => (
          <line
            key={i}
            x1="50"
            y1="46"
            x2={p.x - 10}
            y2={p.y}
            stroke="#2563eb"
            strokeWidth="1.5"
            strokeDasharray="3 2"
            markerEnd="url(#arrow-eye)"
          />
        ))}
        {/* Labels */}
        <text x="22" y="14" fontSize="9" fontWeight="bold" fill="#1e3a8a" fontFamily="ui-sans-serif, system-ui">YOU · អ្នក</text>
        <text x="142" y="14" fontSize="9" fontWeight="bold" fill="#475569" fontFamily="ui-sans-serif, system-ui">AUDIENCE · ទស្សនិកជន</text>
      </svg>
    </div>
  );
}

// "+20%" dial chip
function TwentyPercentDial({
  label,
  labelKh,
  Icon,
}: {
  label: string;
  labelKh: string;
  Icon: typeof Volume2;
}) {
  return (
    <div className="rounded-lg bg-white border-2 border-amber-400 p-2 text-center">
      <Icon className="w-4 h-4 mx-auto text-amber-700" aria-hidden="true" />
      <div className="font-display font-extrabold text-2xl text-amber-700 leading-none mt-1">
        +20%
      </div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-700 mt-1">{label}</div>
      <div className="text-[10px] font-khmer text-slate-700 leading-loose">{labelKh}</div>
    </div>
  );
}
