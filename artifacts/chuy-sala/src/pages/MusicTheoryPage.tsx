import { useState, useRef, useEffect, useCallback } from "react";
import {
  Music,
  Music2,
  Music3,
  Music4,
  Drum,
  Guitar,
  Play,
  Square,
  Plus,
  Crown,
  Sparkles,
  Info,
  Wind,
  Mic2,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Music Theory & The Art of Sound — ទ្រឹស្តីតន្ត្រី និងសិល្បៈនៃសំឡេង
//
//  Sections:
//    1. Instrument Gallery (4 families × 2 instruments)
//    2. Harmonic Sophistication
//        - Functional Harmony (Tonic/Dominant/Subdominant)
//        - Chord Builder (C → C7 → C9 → C9#11)
//        - Voice Leading (smooth vs jumpy)
//    3. Rhythmic Complexity
//        - Polyrhythm 3:2 generator
//        - Metric Modulation (visual + explanation)
//    4. The Great Masters
//        - Mozart card
//        - Re-harmonization (Twinkle Twinkle: Standard vs Jazz)
//
//  Aesthetic: cream manuscript-paper, gold + ebony, music notes & flourishes.
//  Audio: vanilla Web Audio API — lazy AudioContext, triangle waves with a
//  short ADSR envelope; percussion = filtered noise burst.
// ════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
//  Web-audio engine
// ─────────────────────────────────────────────────────────────────────────────

let _ctx: AudioContext | null = null;
function getCtx(): AudioContext {
  if (!_ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    _ctx = new Ctor();
  }
  if (_ctx.state === "suspended") _ctx.resume().catch(() => {});
  return _ctx;
}

// MIDI → Hz
function mtof(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Note name → MIDI (e.g. "C4" → 60). Supports flat (b) and sharp (#).
const NOTE_OFFSETS: Record<string, number> = {
  C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4, F: 5,
  "F#": 6, Gb: 6, G: 7, "G#": 8, Ab: 8, A: 9, "A#": 10, Bb: 10, B: 11,
};
function noteToMidi(name: string): number {
  const m = name.match(/^([A-G][#b]?)(-?\d+)$/);
  if (!m) return 60;
  const [, n, oct] = m;
  return (parseInt(oct, 10) + 1) * 12 + NOTE_OFFSETS[n];
}

type Voice = "triangle" | "sine" | "square" | "sawtooth";

function playMidi(midi: number, when: number, dur: number, voice: Voice = "triangle", gain = 0.12) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = voice;
  osc.frequency.value = mtof(midi);
  // Gentle ADSR
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(gain, when + 0.015);
  g.gain.exponentialRampToValueAtTime(gain * 0.6, when + Math.min(dur * 0.4, 0.4));
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start(when);
  osc.stop(when + dur + 0.05);
}

function playChord(midis: number[], when: number, dur: number, gain = 0.08) {
  midis.forEach((m) => playMidi(m, when, dur, "triangle", gain));
}

// Short percussive click — filtered white noise burst.
function playClick(when: number, kind: "high" | "low" = "high") {
  const ctx = getCtx();
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filt = ctx.createBiquadFilter();
  filt.type = "bandpass";
  filt.frequency.value = kind === "high" ? 2200 : 800;
  filt.Q.value = 4;
  const g = ctx.createGain();
  g.gain.setValueAtTime(kind === "high" ? 0.35 : 0.45, when);
  g.gain.exponentialRampToValueAtTime(0.0001, when + 0.08);
  src.connect(filt).connect(g).connect(ctx.destination);
  src.start(when);
  src.stop(when + 0.1);
}

// ════════════════════════════════════════════════════════════════════════════
//  Page component
// ════════════════════════════════════════════════════════════════════════════

export default function MusicTheoryPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-stone-900 overflow-hidden">
      <ScopedStyles />

      {/* Cream parchment background with faint staff lines */}
      <ManuscriptBg />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="inline-flex items-center gap-2 bg-[#1a1410] text-amber-200 border border-amber-700/40 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-sm">
          <Music className="w-3.5 h-3.5" />
          {isKh ? "មេរៀនកម្រិតខ្ពស់ · សុខភាពផ្លូវចិត្ត" : "Advanced Lesson · Sanctuary"}
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-stone-900 mb-4 leading-tight ${
            isKh ? "font-khmer leading-loose" : ""
          }`}
        >
          {isKh ? (
            <>ទ្រឹស្តីតន្ត្រី <span className="mt-text-gold">និងសិល្បៈនៃសំឡេង</span></>
          ) : (
            <>Music Theory <span className="mt-text-gold">& The Art of Sound</span></>
          )}
        </h1>
        <p
          className={`text-stone-700 max-w-2xl text-base ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "តន្ត្រី គឺជាគណិតវិទ្យាដែលអ្នកអាចមានអារម្មណ៍បាន។ យើងនឹងធ្វើដំណើរពីគ្រួសារឧបករណ៍ ទៅរក chord ស្មុគស្មាញ ចង្វាក់ផ្សំគ្នា និងអ្នកនិពន្ធតន្ត្រីដ៏អស្ចារ្យជាងគេ — ហើយអ្នកអាចស្ដាប់រាល់គំនិតបាន។"
            : "Music is mathematics you can feel. We'll travel from instrument families through complex chords, layered rhythms, and the greatest composers — and you can hear every idea along the way."}
        </p>

        <div className="hidden sm:flex absolute top-12 right-8 text-amber-700/70 gap-2">
          <Music2 className="w-9 h-9 mt-note-float" style={{ animationDelay: "0s" }} />
          <Music3 className="w-7 h-7 mt-note-float" style={{ animationDelay: "0.6s" }} />
          <Music4 className="w-8 h-8 mt-note-float" style={{ animationDelay: "1.2s" }} />
        </div>
      </header>

      {/* ── 1. Instrument Gallery ────────────────────────────────────── */}
      <Section
        eyebrowEn="The Orchestra"
        eyebrowKh="ឧបករណ៍"
        titleEn="The Instrument Gallery"
        titleKh="វិចិត្រសាលឧបករណ៍ភ្លេង"
        descEn="Every instrument belongs to a family. They share how they make sound — vibrating strings, columns of air, buzzing lips, or struck surfaces."
        descKh="ឧបករណ៍ភ្លេងនីមួយៗស្ថិតក្នុងគ្រួសារមួយ។ ពួកវាចែករំលែករបៀបបង្កើតសំឡេង — ខ្សែញ័រ ខ្យល់ បបូរមាត់រន្ទាប់ ឬផ្ទៃវាយ។"
        isKh={isKh}
      >
        <InstrumentGallery isKh={isKh} />
      </Section>

      {/* ── 2. Harmonic Sophistication ───────────────────────────────── */}
      <Section
        eyebrowEn="Harmony"
        eyebrowKh="សុរសីន"
        titleEn="Harmonic Sophistication"
        titleKh="ភាពស្មុគស្មាញនៃសុរសីន"
        descEn="A chord is more than just notes stacked together — it has a job inside a song. Listen, build, and watch how chords flow into one another."
        descKh="Chord គឺមិនត្រឹមតែជាចំណាំដែលត្រួតលើគ្នាប៉ុណ្ណោះទេ — វាមានតួនាទីនៅក្នុងបទចម្រៀង។ ស្ដាប់ សាងសង់ និងមើលរបៀបដែល chord ហូរទៅរកគ្នា។"
        isKh={isKh}
      >
        <FunctionalHarmony isKh={isKh} />
        <ChordBuilder isKh={isKh} />
        <VoiceLeading isKh={isKh} />
      </Section>

      {/* ── 3. Rhythmic Complexity ───────────────────────────────────── */}
      <Section
        eyebrowEn="Rhythm"
        eyebrowKh="ចង្វាក់"
        titleEn="Rhythmic Complexity"
        titleKh="ភាពស្មុគស្មាញនៃចង្វាក់"
        descEn="Rhythm isn't only one steady pulse. Two pulses can run side-by-side, and a song can even shift speed without anyone noticing."
        descKh="ចង្វាក់មិនមែនមានតែកំបោរមួយរលូននោះទេ។ កំបោរពីរអាចដំណើរការក្បែរគ្នា ហើយបទចម្រៀងអាចប្ដូរល្បឿនដោយគ្មានអ្នកណាសម្គាល់ឃើញ។"
        isKh={isKh}
      >
        <Polyrhythm isKh={isKh} />
        <MetricModulation isKh={isKh} />
      </Section>

      {/* ── 4. The Great Masters ─────────────────────────────────────── */}
      <Section
        eyebrowEn="The Masters"
        eyebrowKh="មហាស៊ីលរុ៉េ"
        titleEn="Mozart & Beyond"
        titleKh="Mozart និងអ្នកនិពន្ធដ៏អស្ចារ្យ"
        descEn="One man shaped the sound of an entire era — and centuries later, jazz musicians took simple melodies and dressed them in glittering new clothes."
        descKh="មនុស្សម្នាក់បានបង្កើតរូបរាងសំឡេងនៃយុគមួយទាំងមូល — ហើយរាប់សតវត្សក្រោយមក តន្ត្រីករ Jazz យកម៉ាឡូឌីសាមញ្ញ និងស្លៀកវាដោយសម្លៀកបំពាក់ថ្មីចែងចាំង។"
        isKh={isKh}
      >
        <MozartCard isKh={isKh} />
        <Reharmonization isKh={isKh} />
      </Section>

      {/* ── Closing ──────────────────────────────────────────────────── */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 text-center text-stone-600 text-sm italic">
        <span className={isKh ? "font-khmer not-italic" : ""}>
          {isKh
            ? "“តន្ត្រី គឺជាភាសារបស់វិញ្ញាណ — វានាំសន្តិភាពមួយដែលគ្មានភ្នំ ឬឆ្ងាយណាអាចទប់បាន។”"
            : "“Music is the language of the spirit — it brings a peace no mountain or distance can hold back.”"}
        </span>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section wrapper & shared bits
// ════════════════════════════════════════════════════════════════════════════

function Section({
  eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mt-text-gold mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
        <Sparkles className="w-3 h-3" />
        {isKh ? eyebrowKh : eyebrowEn}
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-stone-900 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-stone-700 text-sm max-w-3xl mb-6 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function PaperCard({
  children, className = "", as = "div",
}: { children: React.ReactNode; className?: string; as?: "div" | "article" }) {
  const Tag = as as keyof React.JSX.IntrinsicElements;
  return (
    <Tag className={`bg-[#fdfaf2] rounded-2xl border border-amber-900/15 shadow-[0_2px_24px_-12px_rgba(120,53,15,0.45)] ${className}`}>
      {children as React.ReactNode}
    </Tag>
  );
}

function PlayButton({
  onClick, isPlaying = false, label, isKh,
}: { onClick: () => void; isPlaying?: boolean; label: { en: string; kh: string }; isKh: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isPlaying}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1410] hover:bg-[#2a1f17] text-amber-100 border border-amber-700/40 font-bold text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
    >
      {isPlaying ? <Square className="w-4 h-4 fill-amber-100" /> : <Play className="w-4 h-4 fill-amber-100" />}
      <span className={isKh ? "font-khmer" : ""}>{isKh ? label.kh : label.en}</span>
    </button>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Manuscript-paper background (faint staff lines)
// ════════════════════════════════════════════════════════════════════════════

function ManuscriptBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, #fdf6e3 0%, #f5ecd7 60%, #ede0c2 100%)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-[0.18]" preserveAspectRatio="none">
        <defs>
          <pattern id="mt-staff" x="0" y="0" width="220" height="120" patternUnits="userSpaceOnUse">
            {/* 5-line staff */}
            {[0, 8, 16, 24, 32].map((y) => (
              <line key={y} x1="0" x2="220" y1={50 + y} y2={50 + y} stroke="#7c4a17" strokeWidth="0.6" />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mt-staff)" />
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  1. Instrument Gallery
// ════════════════════════════════════════════════════════════════════════════

type Family = {
  id: string;
  nameEn: string; nameKh: string;
  Icon: typeof Music;
  blurbEn: string; blurbKh: string;
  instruments: { en: string; kh: string; midi: number; voice: Voice }[];
  accentBg: string;
};

const FAMILIES: Family[] = [
  {
    id: "strings",
    nameEn: "Strings",
    nameKh: "ខ្សែ (Strings)",
    Icon: Guitar,
    blurbEn: "A vibrating string makes the sound. The shorter or tighter the string, the higher the pitch.",
    blurbKh: "ខ្សែញ័របង្កើតសំឡេង។ ខ្សែខ្លីជាង ឬតឹងជាង សំឡេងកាន់តែខ្ពស់។",
    instruments: [
      { en: "Guitar",   kh: "ហ្គីតា",   midi: noteToMidi("E3"), voice: "triangle" },
      { en: "Violin",   kh: "វីយូឡុង", midi: noteToMidi("E5"), voice: "sawtooth" },
    ],
    accentBg: "from-[#fdf6e3] to-[#f3e3b8]",
  },
  {
    id: "woodwinds",
    nameEn: "Woodwinds",
    nameKh: "ខ្យល់ឈើ (Woodwinds)",
    Icon: Wind,
    blurbEn: "A column of air vibrates inside a tube. Open or close holes to change the length of the column — and the pitch.",
    blurbKh: "សសរខ្យល់ញ័រនៅក្នុងបំពង់។ បើក ឬបិទរន្ធដើម្បីប្ដូរប្រវែងសសរ — និងសំឡេង។",
    instruments: [
      { en: "Flute",     kh: "ខ្លុយ",       midi: noteToMidi("D5"), voice: "sine" },
      { en: "Saxophone", kh: "សាក់សូហ្វូន", midi: noteToMidi("F4"), voice: "sawtooth" },
    ],
    accentBg: "from-[#fdf6e3] to-[#e6dfc8]",
  },
  {
    id: "brass",
    nameEn: "Brass",
    nameKh: "ស្ពាន់ (Brass)",
    Icon: Mic2,
    blurbEn: "Buzzing lips set the air inside a long metal tube vibrating. Valves or a slide change the path length.",
    blurbKh: "បបូរមាត់រន្ទាប់ធ្វើឲ្យខ្យល់នៅក្នុងបំពង់ស្ពាន់ញ័រ។ វាល់វ ឬបំពង់រអិល ប្ដូរប្រវែងផ្លូវ។",
    instruments: [
      { en: "Trumpet",   kh: "ត្រែ",         midi: noteToMidi("Bb4"), voice: "square" },
      { en: "Trombone",  kh: "ត្រុមប៊ូន",   midi: noteToMidi("Bb3"), voice: "square" },
    ],
    accentBg: "from-[#fdf6e3] to-[#f0d9a8]",
  },
  {
    id: "percussion",
    nameEn: "Percussion",
    nameKh: "វាយ (Percussion)",
    Icon: Drum,
    blurbEn: "Hit it, shake it, scrape it — anything you strike to make a sound. Many percussion instruments don't even have a fixed pitch.",
    blurbKh: "វាយវា អង្រួនវា កោសវា — អ្វីៗដែលអ្នកវាយដើម្បីបង្កើតសំឡេង។ ឧបករណ៍វាយជាច្រើនមិនមានសំឡេងថេរទេ។",
    instruments: [
      { en: "Drums",            kh: "ស្គរ",           midi: 36, voice: "triangle" },
      { en: "Chapei Dang Veng", kh: "ចាប៉ីដងវែង",   midi: noteToMidi("A2"), voice: "triangle" },
    ],
    accentBg: "from-[#fdf6e3] to-[#ead7b3]",
  },
];

function InstrumentGallery({ isKh }: { isKh: boolean }) {
  const playInstrument = (inst: { midi: number; voice: Voice; en: string }) => {
    const ctx = getCtx();
    const t = ctx.currentTime;
    if (inst.en === "Drums") {
      // Simple kick + snare-ish pattern
      playClick(t, "low");
      playClick(t + 0.25, "high");
      playClick(t + 0.5, "low");
      playClick(t + 0.75, "high");
      return;
    }
    // Play a small ascending arpeggio in the instrument's range
    const notes = [inst.midi, inst.midi + 4, inst.midi + 7, inst.midi + 12];
    notes.forEach((n, i) => playMidi(n, t + i * 0.2, 0.32, inst.voice, 0.15));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {FAMILIES.map((fam) => (
        <PaperCard key={fam.id} as="article" className="p-5 overflow-hidden">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${fam.accentBg} border border-amber-900/15 flex items-center justify-center flex-shrink-0`}>
              <fam.Icon className="w-7 h-7 text-amber-800" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-display font-bold text-xl text-stone-900 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? fam.nameKh : fam.nameEn}
              </h3>
              <p className={`text-sm text-stone-600 mt-1 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh ? fam.blurbKh : fam.blurbEn}
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {fam.instruments.map((inst) => (
              <div
                key={inst.en}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-white/60 border border-amber-900/10"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Music2 className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span className={`font-semibold text-stone-800 text-sm truncate ${isKh ? "font-khmer" : ""}`}>
                    {inst.en} <span className="text-stone-500 font-normal">· {inst.kh}</span>
                  </span>
                </div>
                <button
                  onClick={() => playInstrument(inst)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1a1410] hover:bg-[#2a1f17] text-amber-100 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  aria-label={`Play ${inst.en}`}
                >
                  <Play className="w-3 h-3 fill-amber-100" />
                  {isKh ? "ស្ដាប់" : "Hear"}
                </button>
              </div>
            ))}
          </div>
        </PaperCard>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2a. Functional Harmony
// ════════════════════════════════════════════════════════════════════════════

type ChordRole = "tonic" | "subdominant" | "dominant";

const ROLES: Array<{
  id: ChordRole;
  romanEn: string;
  nameEn: string; nameKh: string;
  jobEn: string;  jobKh: string;
  feelEn: string; feelKh: string;
  midis: number[]; // C major key, simple triads
}> = [
  {
    id: "tonic",
    romanEn: "I",
    nameEn: "Tonic — C major",
    nameKh: "Tonic — C major (ដឹងធ្នើរ)",
    jobEn: "HOME. The chord of rest, where the song wants to land.",
    jobKh: "ផ្ទះ។ Chord នៃការសម្រាក កន្លែងដែលបទចម្រៀងចង់ត្រឡប់មកវិញ។",
    feelEn: "Settled, complete, peaceful.",
    feelKh: "ស្ថិតស្ថេរ ពេញលេញ ស្ងប់ស្ងាត់។",
    midis: [60, 64, 67], // C E G
  },
  {
    id: "subdominant",
    romanEn: "IV",
    nameEn: "Subdominant — F major",
    nameKh: "Subdominant — F major",
    jobEn: "DEPARTURE. Steps away from home — a feeling of motion or longing.",
    jobKh: "ការចេញដំណើរ។ ដើរចេញពីផ្ទះ — អារម្មណ៍នៃចលនា ឬការស្រឡាញ់ឲ្យត្រឡប់មកវិញ។",
    feelEn: "Open, reaching, slightly sad or hopeful.",
    feelKh: "បើកចំហរ ឈោងយក បន្តិចសោកស្ដាយ ឬមានសង្ឃឹម។",
    midis: [65, 69, 72], // F A C
  },
  {
    id: "dominant",
    romanEn: "V",
    nameEn: "Dominant — G major",
    nameKh: "Dominant — G major",
    jobEn: "TENSION. Pulls strongly back to the Tonic — your ear wants to resolve.",
    jobKh: "ភាពតានតឹង។ ទាញយ៉ាងខ្លាំងត្រឡប់ទៅកាន់ Tonic — ត្រចៀកអ្នកចង់ឲ្យដោះស្រាយ។",
    feelEn: "Suspenseful, leaning forward.",
    feelKh: "មានភាពតានតឹង ផ្អៀងទៅមុខ។",
    midis: [67, 71, 74], // G B D
  },
];

function FunctionalHarmony({ isKh }: { isKh: boolean }) {
  const playRole = (midis: number[]) => {
    const t = getCtx().currentTime;
    playChord(midis, t, 1.4, 0.09);
  };

  const playProgression = () => {
    const t = getCtx().currentTime + 0.05;
    // I — IV — V — I
    playChord(ROLES[0].midis, t + 0.0, 0.9);
    playChord(ROLES[1].midis, t + 0.95, 0.9);
    playChord(ROLES[2].midis, t + 1.9, 0.9);
    playChord(ROLES[0].midis, t + 2.85, 1.4);
  };

  return (
    <PaperCard className="p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0">
          <Crown className="w-5 h-5 text-amber-800" />
        </div>
        <div>
          <h3 className={`font-display font-bold text-xl text-stone-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "Chord មានការងារ — Functional Harmony" : "Chords have jobs — Functional Harmony"}
          </h3>
          <p className={`text-sm text-stone-600 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ស្ដាប់ chord នីមួយៗ បន្ទាប់មកស្ដាប់ progression ពេញលេញ I → IV → V → I។"
              : "Listen to each chord on its own, then hear the full progression I → IV → V → I."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {ROLES.map((r) => (
          <div
            key={r.id}
            className="rounded-xl border border-amber-900/15 bg-white/70 p-4 flex flex-col"
          >
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-display font-bold text-3xl mt-text-gold">{r.romanEn}</span>
              <span className={`text-[10px] tracking-widest uppercase font-bold text-stone-500 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
                {r.id}
              </span>
            </div>
            <div className={`font-bold text-stone-900 text-sm ${isKh ? "font-khmer" : ""}`}>
              {isKh ? r.nameKh : r.nameEn}
            </div>
            <p className={`text-xs text-stone-700 mt-2 flex-1 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? r.jobKh : r.jobEn}
            </p>
            <p className={`text-xs italic text-stone-500 mt-2 ${isKh ? "font-khmer not-italic" : ""}`}>
              {isKh ? r.feelKh : r.feelEn}
            </p>
            <button
              onClick={() => playRole(r.midis)}
              className="mt-3 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1a1410] hover:bg-[#2a1f17] text-amber-100 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <Play className="w-3 h-3 fill-amber-100" />
              {isKh ? "ស្ដាប់ chord នេះ" : "Play this chord"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-amber-900/10">
        <div className={`text-sm text-stone-700 ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh
            ? "ស្ដាប់ការដំណើរ I → IV → V → I — អារម្មណ៍នៃ ការចេញ និងការត្រឡប់មកវិញ។"
            : "Listen to the I → IV → V → I journey — the feeling of leaving home and coming back."}
        </div>
        <PlayButton onClick={playProgression} label={{ en: "Play full progression", kh: "ស្ដាប់ progression ពេញលេញ" }} isKh={isKh} />
      </div>
    </PaperCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2b. Chord Builder — C → C7 → C9 → C9#11
// ════════════════════════════════════════════════════════════════════════════

type Extension = { id: string; labelEn: string; labelKh: string; midi: number; descEn: string; descKh: string };

const C_ROOT = noteToMidi("C4"); // 60
const BASE_TRIAD = [C_ROOT, C_ROOT + 4, C_ROOT + 7]; // C E G

const EXTS: Extension[] = [
  {
    id: "7",
    labelEn: "Add ♭7 (Bb)",
    labelKh: "បន្ថែម ♭7 (Bb)",
    midi: C_ROOT + 10, // Bb4
    descEn: "Adds a bluesy, restless edge — turns C into a dominant 7th, the engine of jazz.",
    descKh: "បន្ថែមរសជាតិ Blues និងភាពមិនស្ងប់ — ប្ដូរ C ទៅជា dominant 7th ជាម៉ាស៊ីននៃតន្ត្រី Jazz។",
  },
  {
    id: "9",
    labelEn: "Add 9 (D)",
    labelKh: "បន្ថែម 9 (D)",
    midi: C_ROOT + 14, // D5
    descEn: "A 9th adds shimmer — the chord starts to glow.",
    descKh: "9th បន្ថែមពន្លឺចែងចាំង — chord ចាប់ផ្ដើមភ្លឺ។",
  },
  {
    id: "11",
    labelEn: "Add #11 (F#)",
    labelKh: "បន្ថែម #11 (F#)",
    midi: C_ROOT + 18, // F#5
    descEn: "A sharp 11 hovers above the chord — Debussy and modern jazz love this colour.",
    descKh: "Sharp 11 អណ្ដែតលើ chord — Debussy និង Jazz ទំនើបស្រឡាញ់ពណ៌នេះ។",
  },
];

function ChordBuilder({ isKh }: { isKh: boolean }) {
  const [active, setActive] = useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setActive((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const currentMidis = [
    ...BASE_TRIAD,
    ...EXTS.filter((e) => active.has(e.id)).map((e) => e.midi),
  ];

  const play = () => playChord(currentMidis, getCtx().currentTime, 1.8, 0.08);

  // Chord name builder
  const chordName = (() => {
    const has7 = active.has("7");
    const has9 = active.has("9");
    const has11 = active.has("11");
    if (has11) return has9 ? "C9(#11)" : has7 ? "C7(#11)" : "C(#11)";
    if (has9)  return has7 ? "C9" : "Cadd9";
    if (has7)  return "C7";
    return "C";
  })();

  return (
    <PaperCard className="p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0">
          <Plus className="w-5 h-5 text-amber-800" />
        </div>
        <div>
          <h3 className={`font-display font-bold text-xl text-stone-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "Chord Builder — សាងសង់ chord របស់អ្នក" : "Chord Builder — build your own chord"}
          </h3>
          <p className={`text-sm text-stone-600 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ចាប់ផ្ដើមជាមួយ C major សាមញ្ញ។ បន្ថែមនូត ៧ ៩ ឬ #11 ហើយស្ដាប់ពណ៌នៃ chord ប្ដូរ។"
              : "Start with a plain C major. Add a 7th, 9th, or #11 and hear how the colour of the chord changes."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4">
        {/* Staff visualisation */}
        <div className="bg-white/70 rounded-xl border border-amber-900/15 p-4">
          <ChordStaff midis={currentMidis} />
          <div className="text-center mt-2">
            <span className={`inline-block font-display font-bold text-2xl mt-text-gold ${isKh ? "font-khmer" : ""}`}>
              {chordName}
            </span>
            <div className="text-[10px] tracking-widest uppercase text-stone-500 mt-1">
              {isKh ? "ចំណាំ៖" : "Notes:"} {currentMidis.map(midiToNoteName).join(" · ")}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          {EXTS.map((e) => {
            const on = active.has(e.id);
            return (
              <button
                key={e.id}
                onClick={() => toggle(e.id)}
                aria-pressed={on}
                className={`w-full text-left p-3 rounded-xl border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  on
                    ? "bg-amber-50 border-amber-500"
                    : "bg-white/60 border-amber-900/15 hover:border-amber-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-sm ${on ? "text-amber-900" : "text-stone-700"} ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? e.labelKh : e.labelEn}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${on ? "bg-amber-700 text-amber-50" : "bg-stone-200 text-stone-500"} ${isKh ? "font-khmer" : ""}`}>
                    {on ? (isKh ? "បើក" : "ON") : (isKh ? "បិទ" : "OFF")}
                  </span>
                </div>
                <p className={`text-xs text-stone-600 mt-1 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {isKh ? e.descKh : e.descEn}
                </p>
              </button>
            );
          })}
          <PlayButton onClick={play} label={{ en: `Play ${chordName}`, kh: `ស្ដាប់ ${chordName}` }} isKh={isKh} />
        </div>
      </div>
    </PaperCard>
  );
}

// Render a tiny treble-clef staff with note heads at the right positions.
function ChordStaff({ midis }: { midis: number[] }) {
  // Treble staff lines: E4(64), G4(67), B4(71), D5(74), F5(77).
  // Map any midi to a y position. Use diatonic step (white keys) for layout.
  const STAFF_TOP_Y = 40;          // F5 line
  const STEP_Y = 6;                // half-line step
  const F5 = noteToMidi("F5");     // 77

  // Map midi → diatonic step from F5 (counting only natural whites).
  const naturalIndex = (m: number) => {
    // Convert to scale-degree index using note name (handle accidentals separately)
    const name = midiToNoteName(m);
    const letter = name[0];
    const oct = parseInt(name.replace(/[^0-9-]/g, ""), 10);
    const idx: Record<string, number> = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };
    return oct * 7 + idx[letter];
  };
  const ref = naturalIndex(F5);
  const yOf = (m: number) => STAFF_TOP_Y + (ref - naturalIndex(m)) * STEP_Y;
  const accidentalOf = (m: number) => {
    const n = midiToNoteName(m);
    if (n.includes("#")) return "♯";
    if (n.includes("b")) return "♭";
    return "";
  };

  // Sort ascending so notes stack visually
  const sorted = [...midis].sort((a, b) => a - b);

  return (
    <svg viewBox="0 0 280 110" className="w-full h-auto block" aria-label="Chord on the treble staff">
      {/* Staff lines (E4 G4 B4 D5 F5 → top to bottom y = 40,46,52,58,64 → invert) */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="20" x2="260"
          y1={STAFF_TOP_Y + i * 12}
          y2={STAFF_TOP_Y + i * 12}
          stroke="#3b2a1a"
          strokeWidth="1"
        />
      ))}
      {/* Treble clef glyph (text) */}
      <text x="22" y="76" fontSize="56" fill="#1a1410" fontFamily="serif">𝄞</text>

      {/* Notes */}
      {sorted.map((m, i) => {
        const y = yOf(m);
        const x = 130 + i * 22;
        const acc = accidentalOf(m);
        // ledger lines if needed (above F5 staff or below E4 staff)
        const top = STAFF_TOP_Y;
        const bot = STAFF_TOP_Y + 4 * 12;
        const ledgers: number[] = [];
        if (y < top) {
          for (let yy = top - 12; yy >= y - 2; yy -= 12) ledgers.push(yy);
        } else if (y > bot) {
          for (let yy = bot + 12; yy <= y + 2; yy += 12) ledgers.push(yy);
        }
        return (
          <g key={i}>
            {ledgers.map((ly) => (
              <line key={ly} x1={x - 10} x2={x + 10} y1={ly} y2={ly} stroke="#3b2a1a" strokeWidth="1" />
            ))}
            <ellipse cx={x} cy={y} rx="6.5" ry="5" fill="#1a1410" transform={`rotate(-22 ${x} ${y})`} />
            {acc && (
              <text x={x - 18} y={y + 4} fontSize="14" fontWeight="700" fill="#1a1410" fontFamily="serif">
                {acc}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function midiToNoteName(m: number): string {
  const NAMES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
  const oct = Math.floor(m / 12) - 1;
  return NAMES[m % 12] + oct;
}

// ════════════════════════════════════════════════════════════════════════════
//  2c. Voice Leading
// ════════════════════════════════════════════════════════════════════════════

function VoiceLeading({ isKh }: { isKh: boolean }) {
  const [showSmooth, setShowSmooth] = useState(true);

  // Two voicings of C → G:
  //   Jumpy: C-E-G → G-B-D (every voice moves a long way)
  //   Smooth: C-E-G → B-D-G (closest possible movement)
  const FROM = [60, 64, 67];
  const JUMPY_TO = [55, 59, 62]; // G3 B3 D4 — big leaps down
  const SMOOTH_TO = [59, 62, 67]; // B3 D4 G4 — only small steps

  const target = showSmooth ? SMOOTH_TO : JUMPY_TO;

  const play = () => {
    const t = getCtx().currentTime;
    playChord(FROM, t, 1.0, 0.09);
    playChord(target, t + 1.05, 1.6, 0.09);
  };

  return (
    <PaperCard className="p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0">
          <Music className="w-5 h-5 text-amber-800" />
        </div>
        <div>
          <h3 className={`font-display font-bold text-xl text-stone-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "Voice Leading — ផ្លូវខ្លីបំផុត" : "Voice Leading — the shortest path"}
          </h3>
          <p className={`text-sm text-stone-600 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ប្ដូរពី C ទៅ G។ បើនូតនីមួយៗផ្លាស់ទីខ្លីបំផុត ដំណើរនោះស្ដាប់រលូន។ បើពួកវាលោតឆ្ងាយ វាស្ដាប់ដាច់ៗ។"
              : "Move from C to G. If each voice travels the shortest possible distance, the change sounds smooth. If they leap far, it sounds clunky."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
        <div className="bg-white/70 rounded-xl border border-amber-900/15 p-4">
          <VoiceLeadingDiagram from={FROM} to={target} smooth={showSmooth} />
        </div>
        <div className="space-y-3">
          <div className="flex gap-2" role="group" aria-label="Voice leading mode">
            <button
              onClick={() => setShowSmooth(true)}
              aria-pressed={showSmooth}
              className={`flex-1 px-3 py-2 rounded-lg border-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                showSmooth ? "bg-emerald-50 border-emerald-500 text-emerald-800" : "bg-white border-stone-200 text-stone-500 hover:border-amber-400"
              } ${isKh ? "font-khmer" : ""}`}
            >
              {isKh ? "រលូន (Smooth)" : "Smooth"}
            </button>
            <button
              onClick={() => setShowSmooth(false)}
              aria-pressed={!showSmooth}
              className={`flex-1 px-3 py-2 rounded-lg border-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                !showSmooth ? "bg-rose-50 border-rose-500 text-rose-800" : "bg-white border-stone-200 text-stone-500 hover:border-amber-400"
              } ${isKh ? "font-khmer" : ""}`}
            >
              {isKh ? "លោត (Jumpy)" : "Jumpy"}
            </button>
          </div>
          <p className={`text-sm text-stone-700 px-1 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {showSmooth
              ? isKh
                ? "Voice ខាងក្រោមនៅនឹងគ្នា Voice ខាងលើធ្វើដំណើរតែ ១ ឬ ២ ដំណាក់កាល។ ត្រចៀកស្ដាប់ដោយរីករាយ។"
                : "Voices barely move — only a step or two each. The ear is happy."
              : isKh
                ? "Voice ទាំងអស់លោតឆ្ងាយ — សំឡេងបើទោះបីត្រឹមត្រូវ ក៏អាចស្ដាប់ឆ្គងឆ្គាង។"
                : "Every voice leaps a long way. It's still 'correct,' but it sounds clunky."}
          </p>
          <PlayButton onClick={play} label={{ en: "Play C → G", kh: "ស្ដាប់ C → G" }} isKh={isKh} />
        </div>
      </div>
    </PaperCard>
  );
}

function VoiceLeadingDiagram({ from, to, smooth }: { from: number[]; to: number[]; smooth: boolean }) {
  // Map midi range 50–80 to y range 200–20
  const yOf = (m: number) => 200 - ((m - 50) / 30) * 180;
  const colour = smooth ? "#15803d" : "#be123c";
  return (
    <svg viewBox="0 0 360 220" className="w-full h-auto block" aria-label="Voice leading diagram">
      {/* Grid */}
      {[55, 60, 65, 70, 75].map((m) => (
        <line key={m} x1="50" x2="320" y1={yOf(m)} y2={yOf(m)} stroke="#d6c79b" strokeWidth="0.6" strokeDasharray="3 4" />
      ))}
      {/* Labels */}
      <text x="20" y="20" fontSize="11" fill="#7c4a17" fontWeight="700">{midiToNoteName(75)}</text>
      <text x="20" y="200" fontSize="11" fill="#7c4a17" fontWeight="700">{midiToNoteName(55)}</text>

      <text x="100" y="215" fontSize="11" fill="#3b2a1a" fontWeight="700" textAnchor="middle">C</text>
      <text x="270" y="215" fontSize="11" fill="#3b2a1a" fontWeight="700" textAnchor="middle">G</text>

      {/* Lines */}
      {from.map((f, i) => {
        const t = to[i];
        return (
          <g key={i}>
            <line
              x1={100} y1={yOf(f)}
              x2={270} y2={yOf(t)}
              stroke={colour}
              strokeWidth="2.5"
              className="mt-voice-line"
            />
            {/* From dot */}
            <circle cx={100} cy={yOf(f)} r="6" fill="#1a1410" />
            <text x={88} y={yOf(f) + 4} fontSize="10" fill="#3b2a1a" textAnchor="end" fontWeight="700">
              {midiToNoteName(f)}
            </text>
            {/* To dot */}
            <circle cx={270} cy={yOf(t)} r="6" fill={colour} />
            <text x={282} y={yOf(t) + 4} fontSize="10" fill={colour} fontWeight="700">
              {midiToNoteName(t)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3a. Polyrhythm 3:2 Generator
// ════════════════════════════════════════════════════════════════════════════

function Polyrhythm({ isKh }: { isKh: boolean }) {
  const [tempo, setTempo] = useState(80); // bpm of the "2" pulse beat
  const [playing, setPlaying] = useState(false);
  const [pulse, setPulse] = useState({ two: -1, three: -1 });
  const stopRef = useRef<(() => void) | null>(null);

  const start = useCallback(() => {
    if (stopRef.current) stopRef.current();
    const ctx = getCtx();
    const beatLen = 60 / tempo; // seconds per beat (the "2" pulse)
    const cycle = beatLen * 2;  // total cycle = 2 beats of the "2" pulse
    const startTime = ctx.currentTime + 0.1;
    let nextCycleStart = startTime;
    let stopped = false;
    const LOOKAHEAD_S = 0.25; // schedule events up to 250 ms ahead
    const TICK_MS = 50;       // check every 50 ms

    // Schedule one full cycle of clicks beginning at `cs`.
    const scheduleCycle = (cs: number) => {
      // 2-pulse: 2 hits per cycle (high click)
      [0, 1].forEach((i) => playClick(cs + (i * cycle) / 2, "high"));
      // 3-pulse: 3 hits per cycle (low click)
      [0, 1, 2].forEach((i) => playClick(cs + (i * cycle) / 3, "low"));
    };

    // Self-correcting scheduler: compare against AudioContext.currentTime.
    // Even if setInterval is delayed (tab throttle, busy main thread), we
    // catch up by scheduling every cycle whose start falls inside the
    // lookahead window — no drift.
    const audioTick = () => {
      if (stopped) return;
      while (nextCycleStart < ctx.currentTime + LOOKAHEAD_S) {
        scheduleCycle(nextCycleStart);
        nextCycleStart += cycle;
      }
    };
    audioTick(); // schedule the first cycle immediately
    const interval = window.setInterval(audioTick, TICK_MS);

    // UI heartbeat — purely visual, derived from audio clock so it stays in sync.
    let raf = 0;
    const uiTick = () => {
      if (stopped) return;
      const t = ctx.currentTime - startTime;
      if (t >= 0) {
        const cyc = ((t % cycle) + cycle) % cycle;
        const two = Math.floor((cyc / cycle) * 2);
        const three = Math.floor((cyc / cycle) * 3);
        setPulse({ two, three });
      }
      raf = requestAnimationFrame(uiTick);
    };
    raf = requestAnimationFrame(uiTick);

    stopRef.current = () => {
      stopped = true;
      window.clearInterval(interval);
      cancelAnimationFrame(raf);
      setPulse({ two: -1, three: -1 });
    };
  }, [tempo]);

  const toggle = () => {
    if (playing) {
      stopRef.current?.();
      setPlaying(false);
    } else {
      start();
      setPlaying(true);
    }
  };

  // Stop on unmount or tempo change while playing
  useEffect(() => {
    return () => {
      stopRef.current?.();
    };
  }, []);
  useEffect(() => {
    if (playing) {
      stopRef.current?.();
      start();
    }
  }, [tempo, playing, start]);

  return (
    <PaperCard className="p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0">
          <Drum className="w-5 h-5 text-amber-800" />
        </div>
        <div>
          <h3 className={`font-display font-bold text-xl text-stone-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "Polyrhythm 3:2 — ចង្វាក់ផ្សំគ្នា" : "Polyrhythm 3:2 — two pulses at once"}
          </h3>
          <p className={`text-sm text-stone-600 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ស្ដាប់ click ខ្ពស់ ២ ដង នៅខណៈដែល click ទាប ៣ ដង នៅក្នុងពេលដូចគ្នា។ ខួរក្បាលអ្នកដំបូងភាន់ច្រឡំ — បន្ទាប់មកវាចាប់ផ្ដើមក្ដៅ។"
              : "Listen to 2 high clicks in the same time as 3 low clicks. Your brain feels confused at first — then it clicks."}
          </p>
        </div>
      </div>

      {/* Visual pulse grids */}
      <div className="space-y-3 mb-4">
        <PulseRow label={isKh ? "2 បន្តិច (ខ្ពស់)" : "2 pulse (high)"} count={2} active={pulse.two} colour="amber" />
        <PulseRow label={isKh ? "3 បន្តិច (ទាប)" : "3 pulse (low)"} count={3} active={pulse.three} colour="stone" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-3 border-t border-amber-900/10">
        <label className={`flex items-center gap-2 text-sm text-stone-700 flex-1 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ល្បឿន" : "Tempo"}: <span className="font-bold tabular-nums">{tempo} BPM</span>
          <input
            type="range"
            min={50} max={140} value={tempo}
            onChange={(e) => setTempo(parseInt(e.target.value, 10))}
            className="flex-1 accent-amber-700"
            aria-label="Tempo"
          />
        </label>
        <PlayButton
          onClick={toggle}
          isPlaying={playing}
          label={{ en: playing ? "Stop" : "Play 3:2", kh: playing ? "ឈប់" : "ស្ដាប់ 3:2" }}
          isKh={isKh}
        />
      </div>
    </PaperCard>
  );
}

function PulseRow({ label, count, active, colour }: {
  label: string; count: number; active: number; colour: "amber" | "stone";
}) {
  const onCls = colour === "amber" ? "bg-amber-500 border-amber-700 text-amber-50" : "bg-stone-800 border-stone-900 text-stone-50";
  const offCls = "bg-white/70 border-amber-900/15 text-stone-400";
  return (
    <div>
      <div className="text-[11px] tracking-widest uppercase text-stone-500 font-bold mb-1">{label}</div>
      <div className="flex gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-10 rounded-lg border-2 flex items-center justify-center font-bold text-sm transition-colors duration-75 ${
              active === i ? onCls : offCls
            }`}
            aria-hidden="true"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3b. Metric Modulation
// ════════════════════════════════════════════════════════════════════════════

function MetricModulation({ isKh }: { isKh: boolean }) {
  const [running, setRunning] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);

  const play = () => {
    if (running) {
      stopRef.current?.();
      setRunning(false);
      return;
    }
    setRunning(true);
    const ctx = getCtx();
    let t = ctx.currentTime + 0.1;
    const beat = 0.6; // original beat = 0.6s

    // Phase 1: 4 plain beats with a triplet underneath (high accent + 3 low subs).
    for (let bar = 0; bar < 2; bar++) {
      for (let b = 0; b < 4; b++) {
        playClick(t + b * beat, "high");
        // triplet under each beat
        for (let k = 0; k < 3; k++) {
          playClick(t + b * beat + (k * beat) / 3, "low");
        }
      }
      t += 4 * beat;
    }

    // Phase 2: same triplet rate becomes the new beat.
    // New beat length = beat / 3 (subdivision now main pulse -> faster feel).
    const newBeat = beat / 1.5; // smoother modulation: triplet feel becomes 2/3 of original
    for (let bar = 0; bar < 2; bar++) {
      for (let b = 0; b < 4; b++) {
        playClick(t + b * newBeat, "high");
      }
      t += 4 * newBeat;
    }

    const totalMs = (t - ctx.currentTime) * 1000 + 200;
    const id = window.setTimeout(() => setRunning(false), totalMs);
    stopRef.current = () => {
      window.clearTimeout(id);
      setRunning(false);
    };
  };

  useEffect(() => () => stopRef.current?.(), []);

  return (
    <PaperCard className="p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-amber-800" />
        </div>
        <div>
          <h3 className={`font-display font-bold text-xl text-stone-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "Metric Modulation — ប្ដូរល្បឿនដោយលាក់" : "Metric Modulation — change speed in disguise"}
          </h3>
          <p className={`text-sm text-stone-600 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ល្បិច៖ ដើម្បីប្ដូរល្បឿន សិល្បករដាក់ subdivision មួយ (ដូចជា triplet) ក្រោម beat ដើម។ បន្ទាប់មកគេធ្វើឲ្យ subdivision នោះក្លាយជា beat ថ្មី — ស្ដាប់ដូចជាបទចម្រៀងនៅដដែល ប៉ុន្តែឥឡូវនេះវាដើរលឿនជាង។"
              : "The trick: to change speed, the musician puts a subdivision (like a triplet) under the original beat. Then they make that subdivision the new beat — the song feels continuous, but it's now moving faster."}
          </p>
        </div>
      </div>

      {/* Tiny diagram */}
      <div className="bg-white/70 rounded-xl border border-amber-900/15 p-4">
        <svg viewBox="0 0 600 110" className="w-full h-auto">
          {/* original beat row */}
          <text x="0" y="22" fontSize="11" fill="#7c4a17" fontWeight="700">
            {isKh ? "Beat ដើម" : "Original beat"}
          </text>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={130 + i * 100} y="14" width="10" height="14" fill="#b45309" />
          ))}

          {/* triplet under beat row */}
          <text x="0" y="62" fontSize="11" fill="#7c4a17" fontWeight="700">
            {isKh ? "Triplet ខាងក្រោម" : "Triplets under"}
          </text>
          {[0, 1, 2, 3].flatMap((b) =>
            [0, 1, 2].map((k) => {
              const x = 130 + b * 100 + (k * 100) / 3;
              return <rect key={`${b}-${k}`} x={x} y="54" width="6" height="10" fill="#3b2a1a" opacity="0.55" />;
            })
          )}

          {/* New beat row — triplet rate becomes the pulse */}
          <text x="0" y="102" fontSize="11" fill="#7c4a17" fontWeight="700">
            {isKh ? "Beat ថ្មី (លឿនជាង)" : "New beat (faster)"}
          </text>
          {[0, 1, 2, 3].flatMap((b) =>
            [0, 1, 2].map((k) => {
              const x = 130 + b * 100 + (k * 100) / 3;
              return <rect key={`n-${b}-${k}`} x={x} y="92" width="9" height="14" fill="#15803d" />;
            })
          )}

          {/* Arrow indicating "becomes" */}
          <line x1="430" y1="68" x2="430" y2="88" stroke="#15803d" strokeWidth="2" markerEnd="url(#mt-arr)" />
          <defs>
            <marker id="mt-arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#15803d" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="flex justify-end mt-3">
        <PlayButton
          onClick={play}
          isPlaying={running}
          label={{
            en: running ? "Stop" : "Hear the modulation",
            kh: running ? "ឈប់" : "ស្ដាប់ការប្ដូរ",
          }}
          isKh={isKh}
        />
      </div>
    </PaperCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  4a. Mozart Card
// ════════════════════════════════════════════════════════════════════════════

function MozartCard({ isKh }: { isKh: boolean }) {
  // Opening of Eine kleine Nachtmusik (G major, simplified): G D G D | G D G B5 A5 G5 ...
  const playMozart = () => {
    const t = getCtx().currentTime;
    const seq = [
      { m: noteToMidi("G4"), d: 0.0,  l: 0.18 },
      { m: noteToMidi("D4"), d: 0.22, l: 0.18 },
      { m: noteToMidi("G4"), d: 0.44, l: 0.18 },
      { m: noteToMidi("D4"), d: 0.66, l: 0.18 },
      { m: noteToMidi("G4"), d: 0.88, l: 0.10 },
      { m: noteToMidi("D5"), d: 1.00, l: 0.10 },
      { m: noteToMidi("B4"), d: 1.12, l: 0.10 },
      { m: noteToMidi("G4"), d: 1.24, l: 0.32 },
    ];
    seq.forEach((n) => playMidi(n.m, t + n.d, n.l, "triangle", 0.16));
  };

  return (
    <PaperCard as="article" className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr]">
        <div className="bg-gradient-to-br from-[#f3e3b8] via-[#fdf6e3] to-white p-6 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-amber-900/15">
          {/* Stylised silhouette (powdered wig + jacket collar) */}
          <svg viewBox="0 0 200 240" className="w-full max-w-[200px] h-auto mb-3" aria-hidden="true">
            {/* Jacket */}
            <path d="M30,240 C40,170 70,150 100,150 C130,150 160,170 170,240 Z" fill="#4a3722" />
            <path d="M85,150 L100,210 L115,150 Z" fill="#fdf6e3" />
            {/* Cravat */}
            <ellipse cx="100" cy="170" rx="12" ry="6" fill="#fdf6e3" />
            {/* Face */}
            <ellipse cx="100" cy="115" rx="32" ry="40" fill="#f4d3aa" />
            {/* Wig */}
            <path d="M58,80 C58,40 145,40 145,90 L150,140 C155,150 170,150 170,140 L165,80 C160,30 40,30 35,80 L30,140 C30,150 45,150 50,140 Z" fill="#fdf6e3" />
            {/* Hairline */}
            <path d="M68,90 C90,75 115,75 135,90" stroke="#3b2a1a" strokeWidth="1" fill="none" />
            {/* Eyes */}
            <circle cx="88" cy="112" r="2" fill="#1a1410" />
            <circle cx="112" cy="112" r="2" fill="#1a1410" />
            {/* Mouth */}
            <path d="M92,135 Q100,140 108,135" stroke="#7c4a17" strokeWidth="1.5" fill="none" />
          </svg>
          <div className={`font-display font-bold text-lg text-stone-900 ${isKh ? "font-khmer" : ""}`}>
            Mozart
          </div>
          <div className={`text-xs text-stone-600 mt-1 ${isKh ? "font-khmer" : ""}`}>
            1756 – 1791 · {isKh ? "ប្រទេសអូទ្រីស" : "Austria"}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase mt-text-gold mb-2">
            <Crown className="w-3 h-3" />
            {isKh ? "កុមារអច្ឆរិយៈ" : "Child prodigy"}
          </div>
          <h3 className={`font-display font-bold text-2xl sm:text-3xl text-stone-900 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
            Wolfgang Amadeus Mozart
          </h3>
          <p className={`text-stone-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "Mozart ចាប់ផ្ដើមលេង clavier នៅអាយុ ៣ ឆ្នាំ និងនិពន្ធបទដំបូងនៅអាយុ ៥ ឆ្នាំ។ នៅអាយុ ៣៥ ឆ្នាំ គាត់បានបន្សល់ស្នាដៃជាង ៦០០ បទ — symphony, opera, concerto — ដែលមនុស្សនៅតែលេង នៅស្ដាប់ និងសិក្សាសព្វថ្ងៃ។ មេឫសរបស់គាត់៖ ម៉ាឡូឌីដ៏សាមញ្ញដែលហាក់ដូចជា 'ត្រូវត្រឹម' ចាប់ពីដំបូង។"
              : "Mozart was playing the clavier at age 3 and writing his first compositions at 5. By the time he died at 35 he had left behind over 600 works — symphonies, operas, concertos — that people still play, hear, and study today. His secret: melodies so simple they sound 'inevitable' from the very first note."}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <Stat valueEn="600+" labelEn="Works" labelKh="ស្នាដៃ" isKh={isKh} />
            <Stat valueEn="age 5" labelEn="First piece" labelKh="បទដំបូង" isKh={isKh} />
            <Stat valueEn="35" labelEn="Years lived" labelKh="អាយុ" isKh={isKh} />
          </div>

          <div className="mt-5 flex items-center gap-3 pt-3 border-t border-amber-900/10">
            <span className={`text-sm text-stone-700 flex-1 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ស្ដាប់ការបើក Eine kleine Nachtmusik" : "Hear the opening of Eine kleine Nachtmusik"}
            </span>
            <PlayButton onClick={playMozart} label={{ en: "Play", kh: "ស្ដាប់" }} isKh={isKh} />
          </div>
        </div>
      </div>
    </PaperCard>
  );
}

function Stat({ valueEn, labelEn, labelKh, isKh }: { valueEn: string; labelEn: string; labelKh: string; isKh: boolean }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
      <div className="font-display font-bold text-base text-amber-900 tabular-nums">{valueEn}</div>
      <div className={`text-[10px] uppercase tracking-wider font-bold text-stone-500 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
        {isKh ? labelKh : labelEn}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  4b. Re-harmonization (Twinkle Twinkle)
// ════════════════════════════════════════════════════════════════════════════

// Standard: C major | C major | F major | C major
// Jazz:     CMaj7 | A7   | Dm9   | G13(b9)
//
// Melody = Twinkle Twinkle (just first phrase)

const MELODY = [
  { midi: noteToMidi("C5"), d: 0.0 },
  { midi: noteToMidi("C5"), d: 0.45 },
  { midi: noteToMidi("G5"), d: 0.9 },
  { midi: noteToMidi("G5"), d: 1.35 },
  { midi: noteToMidi("A5"), d: 1.8 },
  { midi: noteToMidi("A5"), d: 2.25 },
  { midi: noteToMidi("G5"), d: 2.7  },
];

const STD_CHORDS = [
  { midis: [48, 52, 55],          d: 0.0  }, // C major
  { midis: [48, 52, 55],          d: 0.9  }, // C major
  { midis: [53, 57, 60],          d: 1.8  }, // F major
  { midis: [48, 52, 55],          d: 2.7  }, // C major
];

const JAZZ_CHORDS = [
  { midis: [48, 52, 55, 59, 62],  d: 0.0  }, // CMaj9 (C E G B D)
  { midis: [45, 49, 52, 55, 58],  d: 0.9  }, // A7(b9)-ish (A C# E G + Bb implied via 58? actually 58 = Bb4)
  { midis: [50, 53, 57, 60, 64],  d: 1.8  }, // Dm9 (D F A C E)
  { midis: [43, 47, 50, 53, 57],  d: 2.7  }, // G13ish (G B D F A) — leads back to C
];

function Reharmonization({ isKh }: { isKh: boolean }) {
  const playVersion = (chords: typeof STD_CHORDS) => {
    const t = getCtx().currentTime + 0.05;
    chords.forEach((c) => playChord(c.midis, t + c.d, 0.85, 0.07));
    MELODY.forEach((n) => playMidi(n.midi, t + n.d, 0.4, "triangle", 0.18));
  };

  return (
    <PaperCard className="p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-amber-800" />
        </div>
        <div>
          <h3 className={`font-display font-bold text-xl text-stone-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "Re-harmonization — \"Twinkle Twinkle\" ពីរវ៉ារ្យង់" : "Re-harmonization — two versions of \"Twinkle Twinkle\""}
          </h3>
          <p className={`text-sm text-stone-600 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ម៉ាឡូឌីដូចគ្នា — ប៉ុន្តែ chord ខាងក្រោមផ្លាស់ប្ដូរអ្វីៗទាំងអស់។ ស្ដាប់វ៉ារ្យង់សាមញ្ញ បន្ទាប់មកស្ដាប់វ៉ារ្យង់ Jazz។"
              : "Same melody — but the chords underneath change everything. Listen to the simple version, then the jazz version."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Standard */}
        <div className="bg-white/70 rounded-xl border border-amber-900/15 p-4 flex flex-col">
          <div className={`text-xs font-bold tracking-widest uppercase text-stone-500 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
            {isKh ? "វ៉ារ្យង់ស្ដង់ដារ" : "Standard"}
          </div>
          <div className="flex-1 grid grid-cols-4 gap-2 mb-3">
            {["C", "C", "F", "C"].map((label, i) => (
              <div key={i} className="bg-amber-50 border border-amber-200 rounded-md p-2 text-center font-display font-bold text-amber-900">
                {label}
              </div>
            ))}
          </div>
          <p className={`text-xs text-stone-600 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "Chord បីងាយៗ។ ស្រស់ស្អាត ច្បាស់លាស់ — ដូចបទចម្រៀងកុមារ។"
              : "Three plain chords. Clear, sweet — the way you'd sing it to a child."}
          </p>
          <PlayButton onClick={() => playVersion(STD_CHORDS)} label={{ en: "Play standard", kh: "ស្ដាប់ស្ដង់ដារ" }} isKh={isKh} />
        </div>

        {/* Jazz */}
        <div className="bg-gradient-to-br from-[#1a1410] to-[#2a1f17] rounded-xl border border-amber-700/30 p-4 flex flex-col text-amber-50">
          <div className={`text-xs font-bold tracking-widest uppercase text-amber-300 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
            {isKh ? "វ៉ារ្យង់ Jazz" : "Re-harmonized (Jazz)"}
          </div>
          <div className="flex-1 grid grid-cols-4 gap-2 mb-3">
            {["CMaj9", "A7♭9", "Dm9", "G13"].map((label, i) => (
              <div key={i} className="bg-amber-900/40 border border-amber-500/40 rounded-md p-2 text-center font-display font-bold text-amber-100 text-xs sm:text-sm">
                {label}
              </div>
            ))}
          </div>
          <p className={`text-xs text-amber-100/80 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ម៉ាឡូឌីដដែល — ប៉ុន្តែ chord ឥឡូវមាន 7th, 9th, 13th។ វាស្ដាប់ដូចជាបទចម្រៀង Jazz ភ្លាមៗ។"
              : "Same melody — but the chords now carry 7ths, 9ths, and 13ths. Suddenly it sounds like a jazz ballad."}
          </p>
          <button
            onClick={() => playVersion(JAZZ_CHORDS)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-amber-100 hover:bg-amber-200 text-stone-900 font-bold text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <Play className="w-4 h-4 fill-stone-900" />
            <span className={isKh ? "font-khmer" : ""}>{isKh ? "ស្ដាប់ Jazz" : "Play jazz version"}</span>
          </button>
        </div>
      </div>

      <div className={`mt-4 flex items-start gap-2 text-xs text-stone-600 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        <Info className="w-4 h-4 mt-0.5 text-amber-700 flex-shrink-0" />
        <span>
          {isKh
            ? "នេះហើយ Re-harmonization។ ការប្ដូរ chord ខាងក្រោម — ម៉ាឡូឌីអាចមានអារម្មណ៍ផ្សេង — សោកសៅ, ភ្លឺ, លាក់កំបាំង។ វាជាមូលហេតុដែលអ្នកនិពន្ធចូលចិត្តលេងតាមបទចម្រៀងចាស់ៗ។"
            : "That is re-harmonization. By changing the chords beneath the melody, the same tune can feel sad, sparkling, or mysterious. It's why arrangers love to re-dress old songs."}
        </span>
      </div>
    </PaperCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Scoped styles
// ════════════════════════════════════════════════════════════════════════════

function ScopedStyles() {
  return (
    <style>{`
      .mt-text-gold {
        background: linear-gradient(180deg, #c08a2e 0%, #8b5e1a 60%, #b8860b 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      @keyframes mt-note-float {
        0%, 100% { transform: translateY(0) rotate(-6deg); }
        50%      { transform: translateY(-8px) rotate(6deg); }
      }
      .mt-note-float {
        animation: mt-note-float 3.5s ease-in-out infinite;
      }

      .mt-voice-line {
        transition: y2 360ms ease, stroke 200ms ease;
      }

      @media (prefers-reduced-motion: reduce) {
        .mt-note-float {
          animation: none !important;
        }
      }
    `}</style>
  );
}
