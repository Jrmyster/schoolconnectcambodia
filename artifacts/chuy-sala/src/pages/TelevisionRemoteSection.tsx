import {
  Radio,
  EyeOff,
  Camera,
  Smartphone,
  Binary,
  Sparkles,
  Zap,
  Lightbulb,
  TestTube2,
  ArrowRight,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════════════════
 *  THE INVISIBLE COMMAND — HOW A TV REMOTE WORKS
 *  បញ្ជាមើលមិនឃើញ៖ របៀបបញ្ជាទូរទស្សន៍ដំណើរការ
 *
 *  Lives inside TelevisionPage as Section 04, anchor: #remote-control
 *  Aesthetic: deep black panel + neon RED + INFRARED purple glow accents.
 * ══════════════════════════════════════════════════════════════════════════ */

const PANEL = "#11131a";
const PANEL_2 = "#181b25";
const GRID = "#1f2433";
const INK = "#e5e7eb";
const INK_SOFT = "#9ca3af";
const RED = "#ef4444";
const IR_PURPLE = "#a855f7"; // colour cameras "see" IR as
const HOT_PURPLE = "#c084fc";
const CYAN = "#22d3ee";
const AMBER = "#fbbf24";

// ── Custom icons ────────────────────────────────────────────────────────

function RemoteIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 36" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="2" width="18" height="32" rx="3" />
      <circle cx="12" cy="6" r="1.6" fill="currentColor" />
      <rect x="7" y="11" width="10" height="3" rx="1" />
      <circle cx="8" cy="19" r="1.5" />
      <circle cx="16" cy="19" r="1.5" />
      <circle cx="8" cy="25" r="1.5" />
      <circle cx="16" cy="25" r="1.5" />
      <circle cx="12" cy="30" r="1.5" />
    </svg>
  );
}

function EyeSlashIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

// ── Sub-section header ──────────────────────────────────────────────────

function SubHeader({
  Icon,
  numEn,
  numKh,
  titleEn,
  titleKh,
  accent,
}: {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  numEn: string;
  numKh: string;
  titleEn: string;
  titleKh: string;
  accent: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div
        className="w-11 h-11 rounded-xl grid place-items-center shrink-0"
        style={{
          backgroundColor: `${accent}22`,
          border: `1px solid ${accent}66`,
          boxShadow: `0 0 18px -4px ${accent}88`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: accent }} />
      </div>
      <div>
        <div className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: accent }}>
          {numEn} <span className="font-khmer tracking-normal opacity-80">{numKh}</span>
        </div>
        <h3 className="font-bold text-lg sm:text-xl leading-tight" style={{ color: INK }}>
          {titleEn}
        </h3>
        <p className="font-khmer text-base sm:text-lg leading-snug mt-0.5" style={{ color: accent }}>
          {titleKh}
        </p>
      </div>
    </div>
  );
}

// ── Main exported section ──────────────────────────────────────────────

export function RemoteControlSection({ k }: { k: boolean }) {
  return (
    <section
      id="remote-control"
      className="relative max-w-6xl mx-auto py-12 scroll-mt-24"
      data-testid="section-remote-control"
    >
      <div
        className="relative overflow-hidden rounded-3xl border"
        style={{
          borderColor: `${RED}55`,
          backgroundColor: "#070709",
          backgroundImage:
            `radial-gradient(circle at 0% 0%, ${RED}22, transparent 45%),` +
            `radial-gradient(circle at 100% 100%, ${IR_PURPLE}22, transparent 45%),` +
            `linear-gradient(180deg, #0c0c12 0%, #06060a 100%)`,
          boxShadow: `0 0 0 1px ${RED}22, 0 24px 60px -32px ${IR_PURPLE}cc`,
        }}
      >
        {/* Faint scanlines */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-15 mix-blend-screen"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${RED}33 3px, ${RED}33 4px)`,
          }}
        />

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div className="relative px-6 sm:px-10 pt-10 pb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className="font-mono text-[10px] tracking-[0.25em] uppercase rounded-md px-2.5 py-1 text-black"
              style={{ backgroundColor: RED }}
            >
              04
            </span>
            <Radio className="w-5 h-5" style={{ color: RED }} />
            <span
              className="font-mono text-[10px] tracking-[0.3em] uppercase"
              style={{ color: RED }}
            >
              MODULE · INVISIBLE LIGHT
            </span>
            <span className="font-khmer text-xs" style={{ color: HOT_PURPLE }}>
              ម៉ូឌុល · ពន្លឺមើលមិនឃើញ
            </span>
            <div className="flex-1 border-t border-dashed" style={{ borderColor: GRID }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-6 items-center">
            <div>
              <h2 className="font-extrabold text-2xl sm:text-4xl leading-tight" style={{ color: INK }}>
                The Invisible Command
                <span className="block mt-1" style={{ color: RED, textShadow: `0 0 18px ${RED}aa` }}>
                  How a TV Remote Works
                </span>
              </h2>
              <p className="font-khmer text-xl sm:text-2xl mt-3 leading-snug" style={{ color: HOT_PURPLE }}>
                បញ្ជាមើលមិនឃើញ៖ <span style={{ color: INK }}>របៀបបញ្ជាទូរទស្សន៍ដំណើរការ</span>
              </p>
              <p className="text-sm sm:text-base mt-4 leading-relaxed max-w-2xl" style={{ color: INK_SOFT }}>
                Every time you press a button on a TV remote, you fire an invisible flash of light across the
                room. Your eyes can't see it — but the TV can, and so can the camera in your pocket.
                Here's the science, the secret code, and a science experiment you can run right now.
              </p>
              <p className="font-khmer text-sm sm:text-base mt-2 leading-loose max-w-2xl" style={{ color: INK_SOFT }}>
                រាល់ពេលដែលអ្នកចុចប៊ូតុងលើបញ្ជាទូរទស្សន៍ អ្នកបាញ់ពន្លឺភ្លឹបភ្លែតមួយដែលមើលមិនឃើញឆ្លងកាត់បន្ទប់។ ភ្នែករបស់អ្នកមើលមិនឃើញវាទេ — ប៉ុន្តែទូរទស្សន៍ឃើញ ហើយកាមេរ៉ាក្នុងហោប៉ៅរបស់អ្នកក៏ឃើញដែរ។ នេះគឺជាវិទ្យាសាស្ត្រ លេខកូដសម្ងាត់ និងការពិសោធន៍មួយដែលអ្នកអាចធ្វើបានឥឡូវនេះ។
              </p>
            </div>

            {/* Remote + IR beam graphic */}
            <div className="hidden sm:flex flex-col items-center gap-2">
              <div className="relative" style={{ filter: `drop-shadow(0 0 14px ${RED}aa)` }}>
                <RemoteIcon className="w-16 h-24" style={{ color: INK }} />
                {/* IR beam */}
                <div
                  aria-hidden
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${HOT_PURPLE} 0%, ${IR_PURPLE} 50%, transparent 75%)`,
                    boxShadow: `0 0 24px ${IR_PURPLE}, 0 0 6px ${HOT_PURPLE}`,
                  }}
                />
              </div>
              <div className="font-mono text-[9px] tracking-widest" style={{ color: IR_PURPLE }}>
                IR · 940nm
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 1: Invisible Light ───────────────────────────────── */}
        <div className="relative px-6 sm:px-10 py-8 border-t" style={{ borderColor: GRID }}>
          <SubHeader
            Icon={EyeSlashIcon}
            numEn="PART 1"
            numKh="ផ្នែកទី ១"
            titleEn="Invisible Light"
            titleKh="ពន្លឺដែលមើលមិនឃើញ"
            accent={IR_PURPLE}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-5">
            <div
              className="rounded-2xl p-5 sm:p-6 border"
              style={{
                borderColor: `${IR_PURPLE}55`,
                backgroundColor: PANEL,
                boxShadow: `0 0 0 1px ${IR_PURPLE}22`,
              }}
            >
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: INK }}>
                The bulb at the very tip of every TV remote is a kind of <span className="font-semibold" style={{ color: HOT_PURPLE }}>LED</span> — but
                unlike the LEDs in your room or in your phone screen, it doesn't shoot{" "}
                <span className="italic">visible</span> light. It shoots{" "}
                <span className="font-semibold" style={{ color: HOT_PURPLE }}>Infrared (IR) light · ពន្លឺអ៊ីនហ្វ្រារ៉េដ</span>.
              </p>
              <p className="font-khmer text-sm sm:text-base leading-loose mt-3" style={{ color: INK_SOFT }}>
                អំពូលនៅចុងបញ្ជាទូរទស្សន៍គ្រប់ប្រភេទ គឺជាប្រភេទ <span className="font-semibold" style={{ color: HOT_PURPLE }}>LED</span> — ប៉ុន្តែខុសពី LED ក្នុងបន្ទប់ ឬនៅលើអេក្រង់ទូរស័ព្ទរបស់អ្នក វាមិនបាញ់ពន្លឺ <span className="italic">មើលឃើញ</span> ឡើយ។ វាបាញ់ <span className="font-semibold" style={{ color: HOT_PURPLE }}>ពន្លឺអ៊ីនហ្វ្រារ៉េដ (Infrared / IR)</span>។
              </p>

              <p className="text-sm sm:text-base leading-relaxed mt-4" style={{ color: INK }}>
                The human eye cannot see infrared because the light{" "}
                <span className="font-semibold" style={{ color: HOT_PURPLE }}>waves are too long</span> for the
                colour-sensors in your retina. But the small dark sensor on the front of the television is
                built specifically to "see" this invisible colour — and only this colour.
              </p>
              <p className="font-khmer text-sm sm:text-base leading-loose mt-3" style={{ color: INK_SOFT }}>
                ភ្នែកមនុស្សមើលមិនឃើញពន្លឺអ៊ីនហ្វ្រារ៉េដ ដោយសារ <span className="font-semibold" style={{ color: HOT_PURPLE }}>រលកពន្លឺវែងពេក</span> សម្រាប់សិន្ធុ-ពណ៌នៅក្នុងភ្នែករបស់អ្នក។ ប៉ុន្តែ សិន្ធុតូចពណ៌ខ្មៅនៅខាងមុខទូរទស្សន៍ ត្រូវបានកសាងជាពិសេស ដើម្បី "មើលឃើញ" ពណ៌មើលមិនឃើញនេះ — ហើយតែពណ៌នេះប៉ុណ្ណោះ។
              </p>
            </div>

            {/* Spectrum visual */}
            <div
              className="rounded-2xl p-5 border flex flex-col justify-between"
              style={{
                borderColor: `${IR_PURPLE}55`,
                backgroundColor: PANEL_2,
                boxShadow: `0 0 0 1px ${IR_PURPLE}22`,
              }}
            >
              <div className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: IR_PURPLE }}>
                The light spectrum <span className="font-khmer normal-case tracking-normal">/ វិសាលគមពន្លឺ</span>
              </div>

              {/* Rainbow bar with IR section */}
              <div>
                <div
                  className="h-7 rounded-md w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #7c3aed 0%, #3b82f6 18%, #06b6d4 32%, #22c55e 48%, #facc15 65%, #fb923c 78%, #ef4444 90%, #7f1d1d 100%)",
                  }}
                  aria-hidden
                />
                <div className="flex justify-between text-[10px] mt-1.5" style={{ color: INK_SOFT }}>
                  <span>400nm</span>
                  <span style={{ color: INK }}>← visible / មើលឃើញ →</span>
                  <span>700nm</span>
                </div>

                {/* IR extension */}
                <div className="flex items-center gap-2 mt-3">
                  <div
                    className="h-6 flex-1 rounded-md relative overflow-hidden"
                    style={{
                      background: `linear-gradient(90deg, #7f1d1d 0%, ${IR_PURPLE} 100%)`,
                      boxShadow: `0 0 18px ${IR_PURPLE}66`,
                    }}
                  >
                    <div
                      className="absolute inset-0 grid place-items-center font-mono text-[10px] tracking-widest"
                      style={{ color: "#fff" }}
                    >
                      INFRARED · IR
                    </div>
                  </div>
                  <span className="font-mono text-[10px]" style={{ color: HOT_PURPLE }}>
                    ~940nm
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-[11px]" style={{ color: INK_SOFT }}>
                  <EyeSlashIcon className="w-3.5 h-3.5" style={{ color: HOT_PURPLE }} />
                  <span>
                    Beyond red — invisible to humans.{" "}
                    <span className="font-khmer">/ លើសក្រហម — មនុស្សមើលមិនឃើញ។</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 2: The Secret Flashing Code ─────────────────────── */}
        <div className="relative px-6 sm:px-10 py-8 border-t" style={{ borderColor: GRID }}>
          <SubHeader
            Icon={Binary}
            numEn="PART 2"
            numKh="ផ្នែកទី ២"
            titleEn="The Secret Flashing Code"
            titleKh="លេខកូដភ្លឹបភ្លែតៗសម្ងាត់"
            accent={RED}
          />

          <div
            className="rounded-2xl p-5 sm:p-6 border mb-5"
            style={{
              borderColor: `${RED}55`,
              backgroundColor: PANEL,
              boxShadow: `0 0 0 1px ${RED}22`,
            }}
          >
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: INK }}>
              When you press a button, the remote does not just{" "}
              <span className="italic">turn the IR light on</span>. It flashes the light{" "}
              <span className="font-semibold" style={{ color: RED }}>on and off incredibly fast</span> in a
              very specific pattern — many thousands of pulses per second.
            </p>
            <p className="font-khmer text-sm sm:text-base leading-loose mt-3" style={{ color: INK_SOFT }}>
              នៅពេលអ្នកចុចប៊ូតុង បញ្ជាមិនគ្រាន់តែ <span className="italic">បើកពន្លឺ IR</span> ឡើយ។ វា <span className="font-semibold" style={{ color: RED }}>បើកនិងបិទពន្លឺយ៉ាងលឿន</span> តាមលំនាំជាក់លាក់ — រាប់ពាន់ដងក្នុងមួយវិនាទី។
            </p>

            <p className="text-sm sm:text-base leading-relaxed mt-4" style={{ color: INK }}>
              That pattern is exactly what computer scientists call{" "}
              <span className="font-semibold" style={{ color: RED }}>Binary Code · កូដគោលពីរ</span> — a
              language with only two letters: <span className="font-mono">1</span> means "light is ON" for one
              tick, <span className="font-mono">0</span> means "light is OFF" for one tick. Every button on the
              remote has its own unique sequence of 1s and 0s.
            </p>
            <p className="font-khmer text-sm sm:text-base leading-loose mt-3" style={{ color: INK_SOFT }}>
              លំនាំនោះគឺពិតជាអ្វីដែលអ្នកវិទ្យាសាស្ត្រកុំព្យូទ័រហៅថា <span className="font-semibold" style={{ color: RED }}>កូដគោលពីរ (Binary Code)</span> — ភាសាដែលមានតែ ២ អក្សរ៖ <span className="font-mono">១</span> មានន័យថា "ពន្លឺបើក" សម្រាប់មួយ tick, <span className="font-mono">០</span> មានន័យថា "ពន្លឺបិទ"។ គ្រប់ប៊ូតុងនៅលើបញ្ជាមានលំដាប់ ១ និង ០ តែមួយគត់របស់វា។
            </p>
          </div>

          {/* Two example patterns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BinaryPatternCard
              labelEn="Volume Up"
              labelKh="បង្កើនសំឡេង"
              pattern="10110"
              accent={RED}
            />
            <BinaryPatternCard
              labelEn="Channel Down"
              labelKh="បន្ថយឆានែល"
              pattern="11001"
              accent={HOT_PURPLE}
            />
          </div>

          {/* Decoder strip */}
          <div
            className="mt-5 rounded-2xl p-4 sm:p-5 border flex items-start gap-3"
            style={{
              borderColor: `${CYAN}55`,
              backgroundColor: PANEL_2,
              boxShadow: `0 0 0 1px ${CYAN}22`,
            }}
          >
            <Sparkles className="w-5 h-5 shrink-0 mt-0.5" style={{ color: CYAN }} />
            <div>
              <p className="text-sm leading-relaxed" style={{ color: INK }}>
                The TV's IR sensor reads the flashes as a binary number, looks it up in its built-in code
                book, and runs the matching command:{" "}
                <span style={{ color: CYAN }}>volume up · channel down · power off · mute.</span>
              </p>
              <p className="font-khmer text-sm leading-loose mt-2" style={{ color: INK_SOFT }}>
                សិន្ធុ IR របស់ទូរទស្សន៍អានភ្លឹបភ្លែតជាលេខគោលពីរ រកវានៅក្នុងសៀវភៅកូដខាងក្នុងរបស់វា ហើយដំណើរការបញ្ជាត្រូវគ្នា៖ <span style={{ color: CYAN }}>បង្កើនសំឡេង · បន្ថយឆានែល · បិទថាមពល · បិទសំឡេង</span>។
              </p>
            </div>
          </div>
        </div>

        {/* ── Section 3: Smartphone Experiment ────────────────────────── */}
        <div className="relative px-6 sm:px-10 py-8 border-t" style={{ borderColor: GRID }}>
          <SubHeader
            Icon={TestTube2}
            numEn="PART 3"
            numKh="ផ្នែកទី ៣"
            titleEn="The Smartphone Science Experiment"
            titleKh="ការពិសោធន៍វិទ្យាសាស្ត្រជាមួយទូរស័ព្ទ"
            accent={HOT_PURPLE}
          />

          <div
            className="relative rounded-3xl overflow-hidden border-2 p-5 sm:p-7"
            style={{
              borderColor: HOT_PURPLE,
              backgroundColor: "#0c0813",
              boxShadow: `0 0 0 1px ${HOT_PURPLE}55, 0 0 40px -8px ${HOT_PURPLE}88, inset 0 0 80px -20px ${IR_PURPLE}55`,
            }}
          >
            {/* Glowing badge */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className="font-mono text-[10px] tracking-[0.3em] uppercase rounded-md px-2.5 py-1 text-black font-bold"
                style={{
                  backgroundColor: HOT_PURPLE,
                  boxShadow: `0 0 18px ${HOT_PURPLE}`,
                }}
              >
                TRY THIS AT HOME
              </span>
              <span className="font-khmer text-sm" style={{ color: HOT_PURPLE }}>
                សាកល្បងនៅផ្ទះ
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-6 items-center">
              <div>
                <p className="text-base sm:text-lg leading-snug font-bold" style={{ color: INK }}>
                  Human eyes can't see infrared. But{" "}
                  <span style={{ color: HOT_PURPLE }}>digital camera sensors can</span>.
                </p>
                <p className="font-khmer text-base sm:text-lg leading-snug font-bold mt-1" style={{ color: HOT_PURPLE }}>
                  ភ្នែកមនុស្សមើលមិនឃើញ IR។ ប៉ុន្តែ <span style={{ color: INK }}>សិន្ធុកាមេរ៉ាឌីជីថលឃើញវា</span>។
                </p>

                <ol className="mt-5 space-y-3">
                  <ExperimentStep
                    n="1"
                    en="Open the camera app on your smartphone."
                    kh="បើកកម្មវិធីកាមេរ៉ានៅលើស្មាតហ្វូនរបស់អ្នក។"
                  />
                  <ExperimentStep
                    n="2"
                    en="Point your TV remote directly at the phone's camera lens — about 5 cm away."
                    kh="តម្រង់បញ្ជាទូរទស្សន៍ដោយផ្ទាល់ទៅកាន់កែវកាមេរ៉ាទូរស័ព្ទ — ប្រហែល ៥ ស.ម។"
                  />
                  <ExperimentStep
                    n="3"
                    en="Look at the phone screen. Press any button on the remote."
                    kh="មើលអេក្រង់ទូរស័ព្ទ។ ចុចប៊ូតុងណាមួយនៅលើបញ្ជា។"
                  />
                  <ExperimentStep
                    n="4"
                    en="✨ The bulb on the remote will flash a bright purple-white light on screen — even though your eyes see nothing!"
                    kh="✨ អំពូលនៅលើបញ្ជានឹងភ្លឹបភ្លែតពន្លឺពណ៌ស្វាយ-សពេញកម្លាំងលើអេក្រង់ — សូម្បីតែភ្នែករបស់អ្នកមើលមិនឃើញអ្វីសោះ!"
                    highlight
                  />
                </ol>

                <div
                  className="mt-5 rounded-xl p-3 border flex items-start gap-2"
                  style={{
                    borderColor: `${AMBER}55`,
                    backgroundColor: `${AMBER}11`,
                  }}
                >
                  <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" style={{ color: AMBER }} />
                  <p className="text-xs leading-relaxed" style={{ color: INK_SOFT }}>
                    <span className="font-semibold" style={{ color: AMBER }}>Why it works:</span> phone camera
                    sensors are sensitive to a wider range of light than human eyes — including near-infrared.
                    Most modern phones add a filter to <em>partly</em> block IR for better photos, so the front
                    selfie camera (which usually has a weaker filter) often shows the flash even brighter than
                    the rear camera.{" "}
                    <span className="font-khmer">
                      / មូលហេតុ៖ សិន្ធុកាមេរ៉ាទូរស័ព្ទមានភាពយល់ឃើញចំពោះពន្លឺច្រើនជាងភ្នែកមនុស្ស — រាប់បញ្ចូលទាំង IR។ កាមេរ៉ាខាងមុខច្រើនតែឃើញពន្លឺច្បាស់ជាង។
                    </span>
                  </p>
                </div>
              </div>

              {/* Phone screen mockup with glowing IR */}
              <PhoneCameraMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────

function BinaryPatternCard({
  labelEn,
  labelKh,
  pattern,
  accent,
}: {
  labelEn: string;
  labelKh: string;
  pattern: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-2xl p-4 border"
      style={{
        borderColor: `${accent}55`,
        backgroundColor: PANEL_2,
        boxShadow: `0 0 0 1px ${accent}22`,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm font-bold" style={{ color: INK }}>
            "{labelEn}"
          </div>
          <div className="font-khmer text-xs mt-0.5" style={{ color: accent }}>
            "{labelKh}"
          </div>
        </div>
        <Zap className="w-4 h-4" style={{ color: accent }} />
      </div>

      {/* Pulse strip */}
      <div className="flex items-end gap-1 h-12 mb-2">
        {pattern.split("").map((bit, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
            <div
              className="w-full rounded-t"
              style={{
                height: bit === "1" ? "100%" : "12%",
                backgroundColor: bit === "1" ? accent : `${INK_SOFT}44`,
                boxShadow: bit === "1" ? `0 0 12px ${accent}cc` : "none",
              }}
              aria-hidden
            />
          </div>
        ))}
      </div>

      {/* Bit labels */}
      <div className="flex gap-1 font-mono text-sm font-bold">
        {pattern.split("").map((bit, i) => (
          <div
            key={i}
            className="flex-1 text-center rounded-sm py-0.5"
            style={{
              color: bit === "1" ? "#000" : INK_SOFT,
              backgroundColor: bit === "1" ? accent : `${INK_SOFT}22`,
            }}
          >
            {bit}
          </div>
        ))}
      </div>

      <div className="flex justify-between text-[10px] mt-2" style={{ color: INK_SOFT }}>
        <span className="font-mono">
          1 = ON · 0 = OFF
        </span>
        <span className="font-khmer">១ = បើក · ០ = បិទ</span>
      </div>
    </div>
  );
}

function ExperimentStep({
  n,
  en,
  kh,
  highlight = false,
}: {
  n: string;
  en: string;
  kh: string;
  highlight?: boolean;
}) {
  return (
    <li className="flex items-start gap-3">
      <div
        className="w-7 h-7 rounded-full grid place-items-center font-mono text-xs font-bold shrink-0 mt-0.5"
        style={{
          backgroundColor: highlight ? HOT_PURPLE : `${HOT_PURPLE}33`,
          color: highlight ? "#000" : HOT_PURPLE,
          border: `1px solid ${HOT_PURPLE}66`,
          boxShadow: highlight ? `0 0 14px ${HOT_PURPLE}` : "none",
        }}
      >
        {n}
      </div>
      <div>
        <p
          className={`text-sm leading-relaxed ${highlight ? "font-semibold" : ""}`}
          style={{ color: highlight ? INK : INK_SOFT }}
        >
          {en}
        </p>
        <p
          className={`font-khmer text-sm leading-loose mt-0.5 ${highlight ? "font-semibold" : ""}`}
          style={{ color: highlight ? HOT_PURPLE : INK_SOFT }}
        >
          {kh}
        </p>
      </div>
    </li>
  );
}

function PhoneCameraMockup() {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Phone body */}
      <div
        className="relative rounded-[1.8rem] border-4 p-2"
        style={{
          width: 160,
          height: 280,
          borderColor: "#1f2937",
          backgroundColor: "#0a0a0f",
          boxShadow: "0 0 0 1px #374151, 0 12px 30px -10px rgba(0,0,0,0.8)",
        }}
      >
        {/* Notch */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 top-1.5 w-14 h-3 rounded-b-xl"
          style={{ backgroundColor: "#0a0a0f", border: "1px solid #1f2937" }}
        />
        {/* Screen showing camera view of IR flash */}
        <div
          className="w-full h-full rounded-[1.2rem] relative overflow-hidden grid place-items-center"
          style={{
            background: `radial-gradient(circle at 50% 55%, ${HOT_PURPLE} 0%, ${IR_PURPLE} 18%, #1a0b2e 45%, #050308 80%)`,
            boxShadow: `inset 0 0 30px ${IR_PURPLE}aa`,
          }}
        >
          {/* Bright glow center */}
          <div
            aria-hidden
            className="w-10 h-10 rounded-full"
            style={{
              backgroundColor: "#fff",
              boxShadow: `0 0 30px 10px #fff, 0 0 60px 20px ${HOT_PURPLE}`,
            }}
          />
          {/* Caption */}
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-widest text-white/80"
          >
            CAMERA · LIVE
          </div>
        </div>
      </div>

      {/* Caption under phone */}
      <div className="flex items-center gap-1.5 text-[11px]" style={{ color: HOT_PURPLE }}>
        <Camera className="w-3.5 h-3.5" />
        <span>What the camera sees</span>
        <ArrowRight className="w-3 h-3 opacity-50" />
        <Smartphone className="w-3.5 h-3.5" />
      </div>
      <div className="font-khmer text-[11px]" style={{ color: INK_SOFT }}>
        អ្វីដែលកាមេរ៉ាឃើញ
      </div>
    </div>
  );
}
