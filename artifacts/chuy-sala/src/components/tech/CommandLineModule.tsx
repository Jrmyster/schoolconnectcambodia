import {
  Terminal,
  Monitor,
  MousePointer2,
  Eye,
  Zap,
  Battery,
  Repeat,
  Folder,
  FolderTree,
  FolderPlus,
  KeyRound,
  ShieldAlert,
  ChevronRight,
  Hash,
  Lock,
  ListTree,
} from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
//  Lesson 4 · The Command Line — Talking to the Machine
//   ▸ Section 1: The Illusion of the Desktop (Map vs Territory)
//   ▸ Section 2: Core Vocabulary (pwd / ls / cd / mkdir cheat-sheet)
//   ▸ Section 3: Superuser Powers (sudo)
//
//  Aesthetic: blueprint navy + cyan grid lines + green-on-black "hacker"
//  monospace terminal blocks. EN+KH bilingual for every heading and
//  explanation. Terminal commands stay in English (universal syntax).
// ════════════════════════════════════════════════════════════════════════════

export function CommandLineModule() {
  return (
    <div className="space-y-8" data-testid="command-line-module">
      <SubSectionDesktopIllusion />
      <SubSectionCoreVocabulary />
      <SubSectionSuperuser />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
//  Reusable: blueprint sub-section wrapper with cyan grid background
// ────────────────────────────────────────────────────────────────────────────
function BlueprintCard({
  testid,
  children,
}: {
  testid: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className="relative rounded-2xl border-2 border-cyan-500/30 bg-slate-950/70 p-5 sm:p-7 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur-sm"
      data-testid={testid}
      style={{
        backgroundImage:
          "linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {children}
    </article>
  );
}

function SubHeading({
  partLabel,
  titleEn,
  titleKh,
  Icon,
}: {
  partLabel: string;
  titleEn: string;
  titleKh: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <header className="flex items-start gap-3 mb-5">
      <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400/80">
          {partLabel}
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug mt-0.5">
          {titleEn}
        </h3>
        <p className="font-khmer text-lg sm:text-xl font-bold text-cyan-200 leading-relaxed">
          {titleKh}
        </p>
      </div>
    </header>
  );
}

// ────────────────────────────────────────────────────────────────────────────
//  Re-usable: a "terminal block" pretending to be a real prompt
// ────────────────────────────────────────────────────────────────────────────
function TerminalBlock({
  prompt = "user@chuy-sala",
  cwd = "~",
  lines,
  testid,
}: {
  prompt?: string;
  cwd?: string;
  lines: { type: "cmd" | "out" | "comment"; text: string }[];
  testid?: string;
}) {
  return (
    <div
      data-testid={testid}
      className="rounded-xl border border-emerald-500/30 bg-black/90 shadow-[0_0_20px_rgba(16,185,129,0.15)] overflow-hidden font-mono text-[13px] sm:text-sm"
    >
      {/* tiny "window chrome" */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/80 border-b border-emerald-500/20">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/60">
          terminal
        </span>
      </div>
      <div className="px-3 py-3 space-y-1 leading-relaxed">
        {lines.map((line, i) => {
          if (line.type === "cmd") {
            return (
              <div key={i} className="flex flex-wrap items-baseline gap-1.5">
                <span className="text-emerald-400">{prompt}</span>
                <span className="text-slate-500">:</span>
                <span className="text-cyan-300">{cwd}</span>
                <span className="text-slate-500">$</span>
                <span className="text-emerald-200 font-bold break-all">
                  {line.text}
                </span>
              </div>
            );
          }
          if (line.type === "comment") {
            return (
              <div key={i} className="text-slate-500 italic">
                {/* explicit hash prefix for #comment */}# {line.text}
              </div>
            );
          }
          // output line
          return (
            <div key={i} className="text-slate-300 pl-2 break-all">
              {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  ▸ Section 1 · The Illusion of the Desktop
// ════════════════════════════════════════════════════════════════════════════
function SubSectionDesktopIllusion() {
  return (
    <BlueprintCard testid="subsection-desktop-illusion">
      <SubHeading
        partLabel="PART 01 · MAP vs TERRITORY"
        titleEn="The Illusion of the Desktop"
        titleKh="ការបំភាន់នៃអេក្រង់កុំព្យូទ័រ"
        Icon={Monitor}
      />

      {/* Map vs Territory paragraphs */}
      <div className="space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed">
        <p>
          Look at your screen right now. Pretty folders. Friendly icons. A mouse
          cursor that points where you tell it to. None of this is the real
          computer. It is a{" "}
          <strong className="text-cyan-300">mask</strong> — a beautiful picture
          painted on top of the machine to make things easy for humans. The
          true computer underneath only reads{" "}
          <strong className="text-cyan-300">text</strong>.
        </p>
        <p className="font-khmer leading-loose border-t border-cyan-500/20 pt-3">
          សូមមើលអេក្រង់របស់អ្នកឥឡូវនេះ។ ហ្វូលឌ័រស្អាត។ រូបតំណាងសប្បុរស។ ទស្សទ្រនិចកណ្ដុរដែលចង្អុលទៅកន្លែងដែលអ្នកប្រាប់។ គ្មានរបស់ទាំងនេះជាកុំព្យូទ័រពិតប្រាកដទេ។ វាគឺជា{" "}
          <strong className="text-cyan-300">របាំងមុខ</strong> — រូបភាពដ៏ស្រស់ស្អាតមួយដែលគូរនៅពីលើម៉ាស៊ីន ដើម្បីធ្វើឱ្យអ្វីៗងាយស្រួលសម្រាប់មនុស្ស។ កុំព្យូទ័រពិតប្រាកដនៅខាងក្រោម អានបានតែ{" "}
          <strong className="text-cyan-300">អក្សរ</strong> ប៉ុណ្ណោះ។
        </p>
        <p className="text-sm text-slate-400 italic border-l-2 border-cyan-500/40 pl-3 mt-3">
          The map is not the territory. The desktop is not the computer.
        </p>
        <p className="font-khmer text-sm text-slate-400 italic border-l-2 border-cyan-500/40 pl-3 leading-loose">
          ផែនទី មិនមែនជាទឹកដី។ អេក្រង់ Desktop មិនមែនជាកុំព្យូទ័រ។
        </p>
      </div>

      {/* Visual: the mask vs the machine */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* GUI mask */}
        <div className="rounded-xl border border-slate-700 bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-slate-900/40 p-4 sm:p-5 relative overflow-hidden">
          <div className="absolute top-2 right-2 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400/70">
            THE MASK · របាំងមុខ
          </div>
          <div className="flex items-center gap-3 mt-2">
            <Folder className="w-10 h-10 text-amber-400 fill-amber-500/30" />
            <Folder className="w-10 h-10 text-sky-400 fill-sky-500/30" />
            <Folder className="w-10 h-10 text-rose-400 fill-rose-500/30" />
            <MousePointer2 className="w-6 h-6 text-white drop-shadow ml-auto" />
          </div>
          <div className="mt-3 text-sm text-slate-300">
            What you see: pictures, clicks, drag-and-drop.
          </div>
          <div className="mt-1 font-khmer text-sm text-slate-400 leading-loose">
            អ្វីដែលអ្នកឃើញ៖ រូបភាព ការចុច ការអូស។
          </div>
        </div>

        {/* CLI underneath */}
        <div className="rounded-xl border border-emerald-500/40 bg-black/80 p-4 sm:p-5 relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <div className="absolute top-2 right-2 text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400/70">
            THE TRUTH · ការពិត
          </div>
          <div className="flex items-center gap-2 mt-2 font-mono text-emerald-300 text-sm">
            <Terminal className="w-5 h-5" />
            <span>$ ls /home/user</span>
          </div>
          <div className="mt-2 font-mono text-emerald-200/80 text-xs sm:text-sm pl-2 leading-relaxed">
            documents/ photos/ projects/ secrets.txt
          </div>
          <div className="mt-3 text-sm text-emerald-100/80 font-mono">
            What is really there: just text.
          </div>
          <div className="mt-1 font-khmer text-sm text-emerald-100/70 leading-loose">
            អ្វីដែលនៅទីនោះពិតប្រាកដ៖ មានតែអក្សរ។
          </div>
        </div>
      </div>

      {/* Why pros use the CLI */}
      <div className="mt-6">
        <div className="flex items-baseline gap-2 mb-3 flex-wrap">
          <h4 className="text-sm font-display font-bold text-white">
            Why professionals talk to the machine directly
          </h4>
          <span className="font-khmer text-sm text-cyan-200">
            ហេតុអ្វីបានជាអ្នកជំនាញនិយាយដោយផ្ទាល់ទៅកាន់ម៉ាស៊ីន
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <BenefitCard
            Icon={Zap}
            color="text-amber-300"
            border="border-amber-400/40"
            glow="shadow-[0_0_18px_rgba(251,191,36,0.18)]"
            titleEn="Speed"
            titleKh="ល្បឿន"
            bodyEn="Typing 5 letters is faster than 12 mouse clicks. Always."
            bodyKh="ការវាយ ៥ អក្សរ លឿនជាងការចុចកណ្ដុរ ១២ ដង។ ជានិច្ច។"
          />
          <BenefitCard
            Icon={Battery}
            color="text-emerald-300"
            border="border-emerald-400/40"
            glow="shadow-[0_0_18px_rgba(52,211,153,0.18)]"
            titleEn="Light & Lean"
            titleKh="ស្រាល និងមិនលោភ"
            bodyEn="No graphics to draw. Almost no battery, almost no memory."
            bodyKh="គ្មានក្រាហ្វិកត្រូវគូរ។ ស៊ីថ្មតិច ស៊ីស តិច។"
          />
          <BenefitCard
            Icon={Repeat}
            color="text-cyan-300"
            border="border-cyan-400/40"
            glow="shadow-[0_0_18px_rgba(34,211,238,0.18)]"
            titleEn="Automation"
            titleKh="ស្វ័យប្រវត្តិកម្ម"
            bodyEn="Save your commands in a script. Run 1,000 of them while you sleep."
            bodyKh="រក្សាទុកពាក្យបញ្ជាក្នុង script។ ដំណើរការ ១,០០០ ដង ខណៈអ្នកដេក។"
          />
        </div>
      </div>
    </BlueprintCard>
  );
}

function BenefitCard({
  Icon,
  color,
  border,
  glow,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
  border: string;
  glow: string;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
}) {
  return (
    <div
      className={`rounded-xl border ${border} ${glow} bg-slate-950/70 p-3 sm:p-4 flex flex-col gap-2`}
    >
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <div className="flex-1 min-w-0">
          <div className={`text-sm font-display font-bold ${color}`}>
            {titleEn}
          </div>
          <div className="font-khmer text-xs text-cyan-200/90 leading-relaxed">
            {titleKh}
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed">{bodyEn}</p>
      <p className="font-khmer text-xs text-slate-400 leading-loose">
        {bodyKh}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  ▸ Section 2 · Core Vocabulary (Cheat Sheet)
// ════════════════════════════════════════════════════════════════════════════
type CommandSpec = {
  cmd: string;
  longNameEn: string;
  longNameKh: string;
  questionEn: string;
  questionKh: string;
  descEn: string;
  descKh: string;
  Icon: React.ComponentType<{ className?: string }>;
  example: { type: "cmd" | "out" | "comment"; text: string }[];
};

const CHEAT_SHEET: CommandSpec[] = [
  {
    cmd: "pwd",
    longNameEn: "Print Working Directory",
    longNameKh: "បង្ហាញហ្វូលឌ័របច្ចុប្បន្ន",
    questionEn: "Where am I right now?",
    questionKh: "តើខ្ញុំនៅឯណាឥឡូវនេះ?",
    descEn:
      "It is easy to get lost when you can't see icons. Type pwd and the computer tells you the full path of the folder you are currently standing inside.",
    descKh:
      "វាងាយនឹងវង្វេង នៅពេលដែលអ្នកមើលមិនឃើញរូបតំណាង។ វាយ pwd ហើយកុំព្យូទ័រនឹងប្រាប់អ្នកនូវផ្លូវពេញរបស់ហ្វូលឌ័រដែលអ្នកកំពុងឈរនៅខាងក្នុង។",
    Icon: Hash,
    example: [
      { type: "cmd", text: "pwd" },
      { type: "out", text: "/home/sokha/projects" },
    ],
  },
  {
    cmd: "ls",
    longNameEn: "List",
    longNameKh: "បញ្ជី",
    questionEn: "What files are inside this folder?",
    questionKh: "តើមានឯកសារអ្វីខ្លះនៅក្នុងហ្វូលឌ័រនេះ?",
    descEn:
      "Lists every file and folder in your current location. Like opening a folder window — but instant, and without graphics.",
    descKh:
      "បង្ហាញរាល់ឯកសារ និងហ្វូលឌ័រនៅទីតាំងបច្ចុប្បន្នរបស់អ្នក។ ដូចជាការបើកបង្អួចហ្វូលឌ័រ — ប៉ុន្តែភ្លាមៗ និងគ្មានក្រាហ្វិក។",
    Icon: ListTree,
    example: [
      { type: "cmd", text: "ls" },
      { type: "out", text: "homework.pdf  notes.txt  photos/  music/" },
    ],
  },
  {
    cmd: "cd",
    longNameEn: "Change Directory",
    longNameKh: "ផ្លាស់ប្ដូរហ្វូលឌ័រ",
    questionEn: "Move me into a new folder.",
    questionKh: "ផ្លាស់ខ្ញុំចូលទៅហ្វូលឌ័រថ្មី។",
    descEn:
      "The walking command. cd photos walks you into the photos folder. cd .. walks you back up one level. There is no double-clicking — just type and arrive.",
    descKh:
      "ពាក្យបញ្ជាដើរ។ cd photos នាំអ្នកចូលក្នុងហ្វូលឌ័រ photos។ cd .. នាំអ្នកត្រឡប់ឡើងលើមួយកម្រិត។ គ្មានការចុចទ្វេទេ — គ្រាន់តែវាយ ហើយមកដល់។",
    Icon: FolderTree,
    example: [
      { type: "cmd", text: "cd photos" },
      { type: "cmd", text: "pwd" },
      { type: "out", text: "/home/sokha/projects/photos" },
    ],
  },
  {
    cmd: "mkdir",
    longNameEn: "Make Directory",
    longNameKh: "បង្កើតហ្វូលឌ័រ",
    questionEn: "Create a brand new folder here.",
    questionKh: "បង្កើតហ្វូលឌ័រថ្មីមួយនៅទីនេះ។",
    descEn:
      "Builds a brand-new empty folder with the name you give it — instantly, with no right-click menu in sight.",
    descKh:
      "បង្កើតហ្វូលឌ័រទទេថ្មីមួយដោយឈ្មោះដែលអ្នកដាក់ឱ្យវា — ភ្លាមៗ ដោយគ្មានម៉ឺនុយចុចស្ដាំទេ។",
    Icon: FolderPlus,
    example: [
      { type: "cmd", text: "mkdir homework_2026" },
      { type: "cmd", text: "ls" },
      {
        type: "out",
        text: "homework.pdf  homework_2026/  notes.txt  photos/  music/",
      },
    ],
  },
];

function SubSectionCoreVocabulary() {
  return (
    <BlueprintCard testid="subsection-core-vocabulary">
      <SubHeading
        partLabel="PART 02 · CHEAT SHEET"
        titleEn="The Core Vocabulary"
        titleKh="វាក្យសព្ទគោល"
        Icon={Terminal}
      />

      <div className="space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed mb-5">
        <p>
          You don't need to learn 1,000 commands. You need four. Master these
          four, and you can already navigate any computer in the world.
        </p>
        <p className="font-khmer leading-loose border-t border-cyan-500/20 pt-3">
          អ្នកមិនត្រូវរៀនពាក្យបញ្ជា ១,០០០ ទេ។ អ្នកត្រូវការតែ បួន ប៉ុណ្ណោះ។ ស្ទាត់ជំនាញនឹងបួននេះ ហើយអ្នកអាចរុករកកុំព្យូទ័រណាមួយនៅលើពិភពលោក។
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHEAT_SHEET.map((c) => (
          <CommandCard key={c.cmd} spec={c} />
        ))}
      </div>
    </BlueprintCard>
  );
}

function CommandCard({ spec }: { spec: CommandSpec }) {
  const { Icon } = spec;
  return (
    <div
      data-testid={`cmd-${spec.cmd}`}
      className="rounded-2xl border-2 border-emerald-500/30 bg-slate-950/80 p-4 sm:p-5 flex flex-col gap-3 shadow-[0_0_20px_rgba(16,185,129,0.08)] hover:shadow-[0_0_28px_rgba(16,185,129,0.18)] transition-shadow"
    >
      {/* Top row: command name + meaning */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <code className="font-mono text-2xl sm:text-3xl font-black text-emerald-300 tracking-tight">
              {spec.cmd}
            </code>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400/70">
              {spec.longNameEn}
            </span>
          </div>
          <div className="font-khmer text-xs text-cyan-200/80 leading-relaxed mt-0.5">
            {spec.longNameKh}
          </div>
        </div>
      </div>

      {/* The "question it answers" */}
      <div className="rounded-lg border border-cyan-500/25 bg-cyan-500/5 p-3">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400/80 mb-1">
          Asks:
        </div>
        <p className="text-sm sm:text-base text-cyan-100 italic">
          “{spec.questionEn}”
        </p>
        <p className="font-khmer text-sm text-cyan-200/90 italic leading-loose mt-1">
          «{spec.questionKh}»
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2 text-sm leading-relaxed">
        <p className="text-slate-300">{spec.descEn}</p>
        <p className="font-khmer text-slate-400 leading-loose border-t border-slate-800 pt-2">
          {spec.descKh}
        </p>
      </div>

      {/* Mock terminal block */}
      <TerminalBlock
        prompt="sokha@chuy"
        cwd="~/projects"
        lines={spec.example}
        testid={`cmd-${spec.cmd}-terminal`}
      />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  ▸ Section 3 · Superuser Powers
// ════════════════════════════════════════════════════════════════════════════
function SubSectionSuperuser() {
  return (
    <BlueprintCard testid="subsection-superuser">
      <SubHeading
        partLabel="PART 03 · MASTER KEY"
        titleEn="Superuser Powers"
        titleKh="ថាមពលអ្នកប្រើប្រាស់ជាន់ខ្ពស់"
        Icon={KeyRound}
      />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-stretch">
        {/* Big explanatory text */}
        <div className="md:col-span-3 space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed">
          <p>
            A computer has{" "}
            <strong className="text-cyan-300">locked doors</strong> on the
            inside. Those doors protect the parts of the system that, if broken,
            would stop the machine from booting at all. Normal commands can't
            open them — and that is on purpose.
          </p>
          <p className="font-khmer leading-loose border-t border-cyan-500/20 pt-3">
            កុំព្យូទ័រមាន <strong className="text-cyan-300">ទ្វារដែលចាក់សោ</strong> នៅខាងក្នុង។ ទ្វារទាំងនោះការពារផ្នែកនៃប្រព័ន្ធ ដែលបើខូចហើយ នឹងធ្វើឱ្យម៉ាស៊ីនមិនអាចបើកដំណើរការបាន។ ពាក្យបញ្ជាធម្មតាមិនអាចបើកវាបានទេ — ហើយវាគឺជាគោលបំណង។
          </p>
          <p>
            Type the word{" "}
            <code className="font-mono text-emerald-300 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
              sudo
            </code>{" "}
            in front of any command — short for{" "}
            <em className="text-cyan-200">Superuser Do</em> — and it is like
            pulling out the master key to the building. Suddenly the locked
            doors open. You have absolute control over the machine.
          </p>
          <p className="font-khmer leading-loose border-t border-cyan-500/20 pt-3">
            វាយពាក្យ{" "}
            <code className="font-mono text-emerald-300 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
              sudo
            </code>{" "}
            នៅខាងមុខពាក្យបញ្ជាណាមួយ — ជាអក្សរកាត់នៃ{" "}
            <em className="text-cyan-200">Superuser Do (អ្នកប្រើជាន់ខ្ពស់ធ្វើ)</em> — ហើយវាដូចជាការទាញកូនសោមេនៃអាគារ។ ភ្លាមៗ ទ្វារដែលចាក់សោបើក។ អ្នកមាន ការគ្រប់គ្រងពេញលេញ លើម៉ាស៊ីន។
          </p>

          {/* Warning */}
          <div className="mt-2 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p className="text-sm text-amber-100">
                <strong>With great power comes great responsibility.</strong>{" "}
                The master key can also delete the entire operating system in a
                single line. Use sudo only when you are sure.
              </p>
              <p className="font-khmer text-sm text-amber-100/90 leading-loose">
                <strong>ជាមួយនឹងថាមពលដ៏អស្ចារ្យ មកជាមួយនឹងទំនួលខុសត្រូវដ៏អស្ចារ្យ។</strong>{" "}
                កូនសោមេក៏អាចលុបប្រព័ន្ធប្រតិបត្តិការទាំងមូលក្នុងតែមួយបន្ទាត់ដែរ។ ប្រើ sudo តែនៅពេលដែលអ្នកប្រាកដ។
              </p>
            </div>
          </div>
        </div>

        {/* Visual: lock → key */}
        <div className="md:col-span-2 flex flex-col gap-3">
          {/* Locked door visual */}
          <div className="rounded-xl border border-rose-500/30 bg-slate-950/80 p-4 flex items-center gap-3">
            <Lock className="w-7 h-7 text-rose-300 flex-shrink-0" />
            <div className="text-xs">
              <div className="text-rose-200 font-mono">
                Permission denied
              </div>
              <div className="font-khmer text-rose-200/80 leading-loose">
                ការអនុញ្ញាតត្រូវបានបដិសេធ
              </div>
            </div>
          </div>

          {/* Plain command — denied */}
          <TerminalBlock
            prompt="sokha@chuy"
            cwd="/etc"
            testid="superuser-denied-terminal"
            lines={[
              { type: "comment", text: "trying without the master key" },
              { type: "cmd", text: "apt install htop" },
              { type: "out", text: "E: Permission denied. (You are not root.)" },
            ]}
          />

          {/* sudo unlocks it */}
          <div className="rounded-xl border border-emerald-500/40 bg-slate-950/80 p-4 flex items-center gap-3 shadow-[0_0_18px_rgba(16,185,129,0.15)]">
            <KeyRound className="w-7 h-7 text-emerald-300 flex-shrink-0" />
            <div className="text-xs">
              <div className="text-emerald-200 font-mono">
                Master key applied
              </div>
              <div className="font-khmer text-emerald-200/80 leading-loose">
                កូនសោមេត្រូវបានប្រើ
              </div>
            </div>
          </div>

          {/* sudo command — allowed */}
          <TerminalBlock
            prompt="sokha@chuy"
            cwd="/etc"
            testid="superuser-allowed-terminal"
            lines={[
              { type: "comment", text: "same command + sudo" },
              { type: "cmd", text: "sudo apt install htop" },
              { type: "out", text: "[sudo] password for sokha: ********" },
              { type: "out", text: "Reading package lists... Done" },
              { type: "out", text: "Setting up htop ✓" },
            ]}
          />
        </div>
      </div>

      {/* Closing one-liner */}
      <div className="mt-6 rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-4 flex items-start gap-3">
        <Eye className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
        <div className="space-y-2">
          <p className="text-sm text-slate-200 leading-relaxed">
            <strong className="text-cyan-300">The takeaway:</strong> the
            command line is not for hackers in movies. It is the real face of
            every computer you have ever owned. Once you can talk to it
            directly, the machine stops being magic and becomes a tool — one
            that listens to you, exactly.
          </p>
          <p className="font-khmer text-sm text-slate-200 leading-loose border-t border-cyan-500/15 pt-2">
            <strong className="text-cyan-300">សេចក្ដីសន្និដ្ឋាន៖</strong> បន្ទាត់ពាក្យបញ្ជា មិនមែនសម្រាប់តែ hacker ក្នុងភាពយន្តទេ។ វាគឺជាមុខពិតប្រាកដនៃកុំព្យូទ័រគ្រប់គ្រឿងដែលអ្នកធ្លាប់មាន។ ពេលដែលអ្នកអាចនិយាយដោយផ្ទាល់ជាមួយវា ម៉ាស៊ីនឈប់ជាមន្តអាគម ហើយក្លាយជាឧបករណ៍មួយ — ដែលស្ដាប់អ្នក ត្រឹមត្រូវ។
          </p>
        </div>
      </div>
    </BlueprintCard>
  );
}

export default CommandLineModule;
