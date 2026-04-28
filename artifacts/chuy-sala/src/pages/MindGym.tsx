import { useState, useRef } from "react";
import { Link } from "wouter";
import confetti from "canvas-confetti";
import {
  Brain,
  Puzzle,
  Lightbulb,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Eye,
  Target,
  Trophy,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  The Mind Gym: Logic & Puzzles · កន្លែងហ្វឹកហាត់ខួរក្បាល
//
//  Three tiers (Easy / Medium / Hard) · 9 strictly-bilingual puzzles total.
//  Click a card to reveal the riddle, then click "Reveal Answer" for confetti.
// ════════════════════════════════════════════════════════════════════════════

type Tier = "easy" | "medium" | "hard";

type PuzzleData = {
  id: string;
  emoji: string;
  titleEn: string;
  titleKh: string;
  questionEn: React.ReactNode;
  questionKh: React.ReactNode;
  hintEn?: string;
  hintKh?: string;
  answerEn: React.ReactNode;
  answerKh: React.ReactNode;
};

// ── Difficulty tier metadata ─────────────────────────────────────────────
const TIERS: Array<{
  key: Tier;
  emoji: string;
  labelEn: string;
  labelKh: string;
  focusEn: string;
  focusKh: string;
  accent: "emerald" | "amber" | "rose";
}> = [
  {
    key: "easy",
    emoji: "🟢",
    labelEn: "Level 1: Easy",
    labelKh: "កម្រិត ១៖ ងាយស្រួល",
    focusEn: "Pattern Recognition",
    focusKh: "ការសម្គាល់លំនាំ",
    accent: "emerald",
  },
  {
    key: "medium",
    emoji: "🟡",
    labelEn: "Level 2: Medium",
    labelKh: "កម្រិត ២៖ មធ្យម",
    focusEn: "Lateral Thinking",
    focusKh: "ការគិតបែបច្នៃប្រឌិត",
    accent: "amber",
  },
  {
    key: "hard",
    emoji: "🔴",
    labelEn: "Level 3: Hard",
    labelKh: "កម្រិត ៣៖ ពិបាក",
    focusEn: "Algorithmic Logic",
    focusKh: "តក្កវិជ្ជាក្បួនដោះស្រាយ",
    accent: "rose",
  },
];

// ── Tailwind-safe color classes per tier accent ──────────────────────────
const ACCENT: Record<
  "emerald" | "amber" | "rose",
  {
    border: string;
    cardBorder: string;
    cardHover: string;
    text: string;
    chip: string;
    button: string;
    badge: string;
    glow: string;
    confetti: string[];
  }
> = {
  emerald: {
    border: "border-emerald-400",
    cardBorder: "border-emerald-500/30",
    cardHover: "hover:border-emerald-400/70 hover:shadow-emerald-500/20",
    text: "text-emerald-300",
    chip: "bg-emerald-500/15 text-emerald-200 border-emerald-500/40",
    button:
      "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-emerald-500/40",
    badge: "bg-emerald-500/20 text-emerald-200 border-emerald-500/50",
    glow: "shadow-[0_0_30px_rgba(52,211,153,0.25)]",
    confetti: ["#34d399", "#a7f3d0", "#fbbf24", "#a78bfa"],
  },
  amber: {
    border: "border-amber-400",
    cardBorder: "border-amber-500/30",
    cardHover: "hover:border-amber-400/70 hover:shadow-amber-500/20",
    text: "text-amber-300",
    chip: "bg-amber-500/15 text-amber-200 border-amber-500/40",
    button:
      "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-amber-500/40",
    badge: "bg-amber-500/20 text-amber-200 border-amber-500/50",
    glow: "shadow-[0_0_30px_rgba(251,191,36,0.25)]",
    confetti: ["#fbbf24", "#fde68a", "#34d399", "#a78bfa"],
  },
  rose: {
    border: "border-rose-400",
    cardBorder: "border-rose-500/30",
    cardHover: "hover:border-rose-400/70 hover:shadow-rose-500/20",
    text: "text-rose-300",
    chip: "bg-rose-500/15 text-rose-200 border-rose-500/40",
    button:
      "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white shadow-rose-500/40",
    badge: "bg-rose-500/20 text-rose-200 border-rose-500/50",
    glow: "shadow-[0_0_30px_rgba(251,113,133,0.25)]",
    confetti: ["#fb7185", "#fda4af", "#a78bfa", "#34d399"],
  },
};

// ── The 9 bilingual puzzles ──────────────────────────────────────────────
const PUZZLES: Record<Tier, PuzzleData[]> = {
  easy: [
    {
      id: "apples-bananas",
      emoji: "🍎",
      titleEn: "Apples & Bananas",
      titleKh: "ផ្លែប៉ោម និងចេក",
      questionEn:
        "If 🍎 + 🍎 + 🍎 = 30, and 🍎 + 🍌 + 🍌 = 18, what is the value of one 🍌?",
      questionKh:
        "បើ 🍎 + 🍎 + 🍎 = ៣០ ហើយ 🍎 + 🍌 + 🍌 = ១៨ តើ 🍌 មួយ មានតម្លៃប៉ុន្មាន?",
      hintEn: "Solve for one apple first, then plug it in.",
      hintKh: "ស្វែងរកតម្លៃផ្លែប៉ោមមួយជាមុនសិន រួចជំនួសវាចូលទៅក្នុងសមីការ។",
      answerEn:
        "One banana = 4. Three apples = 30, so one apple = 10. Then 10 + 2 × banana = 18 → 2 × banana = 8 → banana = 4.",
      answerKh:
        "ចេកមួយ = ៤។ ផ្លែប៉ោមបី = ៣០ ដូច្នេះផ្លែប៉ោមមួយ = ១០។ បន្ទាប់មក ១០ + ២ × ចេក = ១៨ → ២ × ចេក = ៨ → ចេក = ៤។",
    },
    {
      id: "doubling-sequence",
      emoji: "🔢",
      titleEn: "The Doubling Sequence",
      titleKh: "ស៊េរីលេខទ្វេដង",
      questionEn: "What number comes next? 2, 4, 8, 16, 32, ___ ?",
      questionKh: "តើលេខអ្វីបន្ទាប់? ២, ៤, ៨, ១៦, ៣២, ___ ?",
      hintEn: "Compare each number to the one before it.",
      hintKh: "ប្រៀបធៀបលេខនីមួយៗជាមួយលេខមុនវា។",
      answerEn:
        "64. Each number is the previous number multiplied by 2 (a 'doubling' or geometric sequence).",
      answerKh:
        "៦៤។ លេខនីមួយៗគឺជាលេខមុនគុណនឹង ២ (ស៊េរីទ្វេដង ឬស៊េរីធរណីមាត្រ)។",
    },
    {
      id: "shape-pattern",
      emoji: "🔺",
      titleEn: "The Shape Parade",
      titleKh: "ក្បួនរូបទ្រវែង",
      questionEn:
        "Look at this row: 🔺 🟦 🔺 🟦 🔺 🟦 🔺 ___. What shape comes next, and how do you know?",
      questionKh:
        "មើលជួរនេះ៖ 🔺 🟦 🔺 🟦 🔺 🟦 🔺 ___។ តើរូបអ្វីមកបន្ទាប់ ហើយអ្នកដឹងដោយរបៀបណា?",
      hintEn: "Count how many shapes appear before each one repeats.",
      hintKh: "រាប់ថាមានរូបប៉ុន្មាន មុនដែលរូបនីមួយៗត្រូវបានធ្វើឡើងវិញ។",
      answerEn:
        "🟦 (a square). The pattern alternates triangle, square, triangle, square — every odd position is a triangle and every even position is a square.",
      answerKh:
        "🟦 (ការ៉េ)។ លំនាំស្លាប់រវាងត្រីកោណ និងការ៉េ — រាល់ទីតាំងសេសគឺត្រីកោណ និងរាល់ទីតាំងគូគឺការ៉េ។",
    },
  ],
  medium: [
    {
      id: "echo",
      emoji: "🗣️",
      titleEn: "The Voice Without a Mouth",
      titleKh: "សំឡេងគ្មានមាត់",
      questionEn:
        "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
      questionKh:
        "ខ្ញុំនិយាយដោយគ្មានមាត់ ហើយឮដោយគ្មានត្រចៀក។ ខ្ញុំគ្មានរូបកាយ ប៉ុន្តែខ្ញុំរស់ឡើងជាមួយខ្យល់។ តើខ្ញុំជាអ្វី?",
      hintEn: "You hear me bounce back when you shout in a canyon.",
      hintKh: "អ្នកឮខ្ញុំបន្ទរត្រឡប់នៅពេលអ្នកស្រែកនៅក្នុងជ្រលងភ្នំ។",
      answerEn:
        "An echo. Your voice bounces off a distant surface and returns — it 'speaks' your words back without a mouth and is carried by moving air.",
      answerKh:
        "សំឡេងបន្ទរ (Echo)។ សំឡេងរបស់អ្នកបន្ទរទៅផ្ទៃឆ្ងាយ ហើយត្រឡប់មកវិញ — វា «និយាយ» ពាក្យរបស់អ្នកដោយគ្មានមាត់ ហើយត្រូវបានបញ្ជូនដោយខ្យល់ដែលផ្លាស់ទី។",
    },
    {
      id: "the-hole",
      emoji: "🕳️",
      titleEn: "Take More, Become Bigger",
      titleKh: "យកកាន់តែច្រើន ធំកាន់តែខ្លាំង",
      questionEn:
        "The more you take away from me, the bigger I become. What am I?",
      questionKh:
        "អ្នកកាន់តែយកចេញពីខ្ញុំច្រើន ខ្ញុំកាន់តែធំឡើង។ តើខ្ញុំជាអ្វី?",
      hintEn:
        "Think about what happens when a worker digs into the ground.",
      hintKh: "គិតពីអ្វីដែលកើតឡើងពេលកម្មករជីកដី។",
      answerEn:
        "A hole. Removing more dirt makes the hole grow bigger — the more you 'take', the more it expands.",
      answerKh:
        "រន្ធ (Hole)។ ការដកដីចេញកាន់តែច្រើន ធ្វើឱ្យរន្ធកាន់តែធំ — អ្នកកាន់តែ «យក» ច្រើន វាកាន់តែពង្រីក។",
    },
    {
      id: "one-match",
      emoji: "🕯️",
      titleEn: "One Match, One Cold Room",
      titleKh: "ឈើគូសមួយ បន្ទប់ត្រជាក់មួយ",
      questionEn:
        "You walk into a freezing dark room with a candle, an oil lamp, and a fireplace. You only have ONE match. Which do you light first?",
      questionKh:
        "អ្នកដើរចូលក្នុងបន្ទប់ងងឹតត្រជាក់មួយ ដែលមានទៀន ចង្កៀងប្រេង និងភ្លើងធ្នើ។ អ្នកមានឈើគូស ១ ប៉ុណ្ណោះ។ តើអ្នកអុជអ្វីមុនគេ?",
      hintEn:
        "Read the question word by word — one of those words is itself a thing in the story.",
      hintKh: "អានសំណួរម្ដងមួយពាក្យ — ពាក្យមួយក្នុងចំណោមពាក្យទាំងនោះ ខ្លួនវាជារបស់មួយក្នុងរឿង។",
      answerEn:
        "The match itself! Before you can light a candle or a lamp or a fireplace, you must first strike and light the match. Lateral thinking means questioning the assumed list of options.",
      answerKh:
        "ឈើគូស (Match) ខ្លួនវាផ្ទាល់! មុនដែលអ្នកអាចអុជទៀន ចង្កៀង ឬភ្លើងធ្នើ អ្នកត្រូវគូសហើយអុជឈើគូសជាមុនសិន។ ការគិតបែបច្នៃប្រឌិតមានន័យថា ត្រូវសួរអំពីបញ្ជីជម្រើសដែលគេសន្មត់ទុកជាមុន។",
    },
  ],
  hard: [
    {
      id: "river-crossing",
      emoji: "🚣",
      titleEn: "The River Crossing",
      titleKh: "ការឆ្លងទន្លេ",
      questionEn: (
        <>
          A farmer must take a <strong>wolf</strong>, a <strong>goat</strong>, and a head of{" "}
          <strong>cabbage</strong> across a river. The boat holds only the farmer plus one item at a time.
          If left together unsupervised:
          <br />• the wolf will eat the goat,
          <br />• the goat will eat the cabbage.
          <br />
          How does the farmer get all three across the river safely?
        </>
      ),
      questionKh: (
        <>
          កសិករម្នាក់ត្រូវយក <strong>ឆ្កែចចក</strong> <strong>ពពែ</strong> និង <strong>ស្ពៃក្តោប</strong> ឆ្លងទន្លេ។
          ទូករបស់គាត់ផ្ទុកបានតែគាត់ និងរបស់មួយក្នុងពេលតែមួយ។ បើទុកនៅជាមួយគ្នាដោយគ្មានការមើលថែ៖
          <br />• ឆ្កែចចកនឹងស៊ីពពែ
          <br />• ពពែនឹងស៊ីស្ពៃ
          <br />
          តើកសិករឆ្លងទាំងបីដោយសុវត្ថិភាពយ៉ាងណា?
        </>
      ),
      hintEn:
        "The farmer is allowed to carry an item BACK across the river too — that's the trick.",
      hintKh:
        "កសិករអាចយករបស់ត្រឡប់មកវិញឆ្លងទន្លេបាន — នោះគឺជាល្បិច។",
      answerEn: (
        <>
          Four trips:
          <br />
          <strong>1.</strong> Take the goat across. (Wolf + cabbage stay — safe, wolves don't eat cabbage.)
          <br />
          <strong>2.</strong> Return alone. Take the wolf across.
          <br />
          <strong>3.</strong> Bring the goat BACK. Drop the goat. Take the cabbage across.
          <br />
          <strong>4.</strong> Return alone. Take the goat across. Done.
        </>
      ),
      answerKh: (
        <>
          ដំណើរ ៤ ដង៖
          <br />
          <strong>១.</strong> យកពពែឆ្លងទៅ។ (ឆ្កែចចក + ស្ពៃនៅ — សុវត្ថិភាព ព្រោះឆ្កែចចកមិនស៊ីស្ពៃ។)
          <br />
          <strong>២.</strong> ត្រឡប់មកម្នាក់ឯង។ យកឆ្កែចចកឆ្លងទៅ។
          <br />
          <strong>៣.</strong> យកពពែ ត្រឡប់មកវិញ។ ដាក់ពពែចុះ។ យកស្ពៃឆ្លងទៅ។
          <br />
          <strong>៤.</strong> ត្រឡប់មកម្នាក់ឯង។ យកពពែឆ្លងទៅ។ ចប់។
        </>
      ),
    },
    {
      id: "two-doors",
      emoji: "🚪",
      titleEn: "Two Doors, Two Guards",
      titleKh: "ទ្វារពីរ ឆ្មាំពីរ",
      questionEn: (
        <>
          You face <strong>two doors</strong>. One leads to freedom, the other to certain doom. Each
          door has a <strong>guard</strong>. One guard <em>always tells the truth</em>. The other{" "}
          <em>always lies</em>. You don't know which guard is which.
          <br />
          You may ask <strong>ONE guard ONE question</strong>. What do you ask, and which door do
          you choose?
        </>
      ),
      questionKh: (
        <>
          អ្នកប្រឈមនឹង <strong>ទ្វារពីរ</strong>។ មួយនាំទៅសេរីភាព មួយទៀតនាំទៅមរណភាព។
          ទ្វារនីមួយៗមាន <strong>ឆ្មាំ</strong>។ ឆ្មាំម្នាក់ <em>និយាយការពិតជានិច្ច</em>។ មួយទៀត
          <em>ភូតភរជានិច្ច</em>។ អ្នកមិនដឹងថាឆ្មាំណាជាអ្វី។
          <br />
          អ្នកអាចសួរ <strong>ឆ្មាំ ១ នាក់ សំណួរ ១ ប៉ុណ្ណោះ</strong>។ តើអ្នកសួរអ្វី និងជ្រើសទ្វារណា?
        </>
      ),
      hintEn:
        "Try to construct a question whose answer is the SAME no matter which guard you ask.",
      hintKh: "ព្យាយាមបង្កើតសំណួរមួយដែលចម្លើយដូចគ្នា មិនថាអ្នកសួរឆ្មាំណាក៏ដោយ។",
      answerEn: (
        <>
          Ask either guard:{" "}
          <em>
            "If I asked the OTHER guard which door leads to freedom, which door would they point
            to?"
          </em>
          <br />
          Then choose <strong>the OPPOSITE door</strong>.
          <br />
          Why it works: the truth-teller honestly reports the liar's lie (so they point to the
          doom door); the liar lies about the truth-teller's truth (so they also point to the doom
          door). BOTH guards' answers point to doom — so the OTHER door is freedom.
        </>
      ),
      answerKh: (
        <>
          សួរឆ្មាំណាមួយក៏បាន៖{" "}
          <em>
            «បើខ្ញុំសួរឆ្មាំ ម្ខាងទៀត ថាទ្វារមួយណានាំទៅសេរីភាព តើគេនឹងចង្អុលទៅទ្វារណា?»
          </em>
          <br />
          បន្ទាប់មកជ្រើសរើស <strong>ទ្វារផ្ទុយ</strong>។
          <br />
          ហេតុអ្វីបានជាដំណើរការ៖ អ្នកនិយាយការពិតរាយការណ៍ពាក្យកុហករបស់អ្នកកុហកដោយស្មោះត្រង់ (ដូច្នេះគេចង្អុលទៅទ្វារមរណៈ)។
          អ្នកកុហកនឹងកុហកអំពីការពិតរបស់អ្នកនិយាយការពិត (ដូច្នេះគេក៏ចង្អុលទៅទ្វារមរណៈដែរ)។
          ចម្លើយរបស់ឆ្មាំទាំងពីរនាក់ ចង្អុលទៅមរណៈ — ដូច្នេះទ្វារ ផ្ទុយ គឺសេរីភាព។
        </>
      ),
    },
    {
      id: "three-switches",
      emoji: "💡",
      titleEn: "The Three Switches",
      titleKh: "កុងតាក់ទាំងបី",
      questionEn: (
        <>
          Three light switches downstairs each control one of three lamps in a sealed{" "}
          <strong>upstairs</strong> room. You may flip switches as much as you want, but you can
          only walk upstairs <strong>ONCE</strong> to check.
          <br />
          How do you figure out which switch controls which lamp?
        </>
      ),
      questionKh: (
        <>
          កុងតាក់បីនៅជាន់ក្រោម គ្រប់គ្រងភ្លើងបីនៅក្នុងបន្ទប់ <strong>ជាន់លើ</strong> ដែលបិទស្និទ្ធ។
          អ្នកអាចបិទ-បើកកុងតាក់បានច្រើនតាមចង់ ប៉ុន្តែអ្នកអាចឡើងជាន់លើបាន <strong>ម្ដងប៉ុណ្ណោះ</strong> ដើម្បីពិនិត្យ។
          <br />
          តើអ្នករកថា កុងតាក់ណា គ្រប់គ្រងភ្លើងណាដោយរបៀបណា?
        </>
      ),
      hintEn:
        "Each switch has TWO states (on / off) but a lamp can give you a THIRD piece of information you might forget about.",
      hintKh:
        "កុងតាក់នីមួយៗមាន ស្ថានភាពពីរ (បើក/បិទ) ប៉ុន្តែអំពូលអាចផ្ដល់ព័ត៌មានទីបី ដែលអ្នកអាចភ្លេច។",
      answerEn: (
        <>
          Use <strong>HEAT</strong> as a third state of information.
          <br />
          <strong>1.</strong> Turn switch #1 ON. Wait 10 minutes.
          <br />
          <strong>2.</strong> Turn switch #1 OFF. Turn switch #2 ON.
          <br />
          <strong>3.</strong> Walk upstairs immediately.
          <br />
          • The lamp that is <strong>ON</strong> = switch #2.
          <br />
          • The lamp that is <strong>OFF but warm</strong> to the touch = switch #1.
          <br />
          • The lamp that is <strong>OFF and cold</strong> = switch #3.
        </>
      ),
      answerKh: (
        <>
          ប្រើ <strong>កំដៅ</strong> ជាស្ថានភាពទីបីនៃព័ត៌មាន។
          <br />
          <strong>១.</strong> បើកកុងតាក់ទី១។ រង់ចាំ ១០ នាទី។
          <br />
          <strong>២.</strong> បិទកុងតាក់ទី១។ បើកកុងតាក់ទី២។
          <br />
          <strong>៣.</strong> ដើរឡើងជាន់លើភ្លាមៗ។
          <br />
          • អំពូលដែល <strong>បើក</strong> = កុងតាក់ទី២។
          <br />
          • អំពូលដែល <strong>បិទ ប៉ុន្តែក្ដៅ</strong> ពេលប៉ះ = កុងតាក់ទី១។
          <br />
          • អំពូលដែល <strong>បិទ និងត្រជាក់</strong> = កុងតាក់ទី៣។
        </>
      ),
    },
  ],
};

// ── Confetti burst (uses canvas-confetti) ────────────────────────────────
function burstConfetti(originEl: HTMLElement | null, accent: "emerald" | "amber" | "rose") {
  let origin = { x: 0.5, y: 0.5 };
  if (originEl) {
    const rect = originEl.getBoundingClientRect();
    origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    };
  }
  const colors = ACCENT[accent].confetti;
  // Two quick bursts from the same point
  confetti({
    particleCount: 80,
    spread: 70,
    startVelocity: 35,
    origin,
    colors,
    gravity: 1,
    scalar: 0.95,
    ticks: 200,
  });
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 100,
      startVelocity: 25,
      origin,
      colors,
      gravity: 1.1,
      scalar: 0.8,
      ticks: 200,
    });
  }, 120);
}

// ════════════════════════════════════════════════════════════════════════════
//  Page component
// ════════════════════════════════════════════════════════════════════════════
export default function MindGym() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [activeTier, setActiveTier] = useState<Tier>("easy");

  const activeMeta = TIERS.find((tt) => tt.key === activeTier)!;
  const accent = ACCENT[activeMeta.accent];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
        {/* ── Back to Home link ───────────────────────────────────────── */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-violet-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span className={kh ? "font-khmer" : ""}>
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </span>
        </Link>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <header className="relative rounded-3xl border-2 border-violet-500/30 bg-slate-900/60 p-6 sm:p-10 overflow-hidden mb-8 sm:mb-10">
          {/* decorative puzzle-piece watermark */}
          <Puzzle
            aria-hidden="true"
            className="absolute -right-6 -top-6 w-44 h-44 text-violet-500/10"
            strokeWidth={1.2}
          />
          <Puzzle
            aria-hidden="true"
            className="absolute -right-16 bottom-2 w-28 h-28 text-emerald-500/10 rotate-45"
            strokeWidth={1.2}
          />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`text-[10px] font-mono uppercase tracking-[0.25em] rounded px-2 py-0.5 border bg-violet-500/15 text-violet-200 border-violet-500/40 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              >
                {t("Study Center · Logic Lab", "មជ្ឈមណ្ឌលសិក្សា · មន្ទីរតក្កវិជ្ជា")}
              </span>
              <Brain className="w-5 h-5 text-violet-300" aria-hidden="true" />
            </div>

            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent ${kh ? "font-khmer leading-snug" : ""}`}
            >
              {t(
                "🧩 The Mind Gym: Logic & Puzzles",
                "🧩 កន្លែងហ្វឹកហាត់ខួរក្បាល៖ តក្កវិជ្ជា និងល្បែងប្រាជ្ញា"
              )}
            </h1>
            <p
              className={`mt-2 text-lg sm:text-xl text-slate-300 ${kh ? "font-khmer" : "font-khmer"}`}
            >
              {kh
                ? "🧩 The Mind Gym: Logic & Puzzles"
                : "🧩 កន្លែងហ្វឹកហាត់ខួរក្បាល៖ តក្កវិជ្ជា និងល្បែងប្រាជ្ញា"}
            </p>

            <p
              className={`mt-5 max-w-2xl text-sm sm:text-base text-slate-300 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
            >
              {t(
                "Train the muscle between your ears with 9 bilingual puzzles across three difficulty tiers. Tap a card to read the riddle in English and Khmer. Try to solve it before pressing 'Reveal Answer' — the harder the puzzle, the brighter the celebration. 🎉",
                "ហ្វឹកហាត់សាច់ដុំរវាងត្រចៀករបស់អ្នកជាមួយល្បែង ៩ ពីរភាសាក្នុងកម្រិតពិបាកបី។ ចុចលើកាតមួយដើម្បីអានសំណួរជាភាសាអង់គ្លេស និងខ្មែរ។ ព្យាយាមដោះស្រាយវាមុនចុច «បង្ហាញចម្លើយ» — កាន់តែពិបាក ការអបអរសាទរកាន់តែភ្លឺ។ 🎉"
              )}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border bg-emerald-500/10 text-emerald-200 border-emerald-500/40">
                🟢 3 {t("easy", "ងាយស្រួល")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border bg-amber-500/10 text-amber-200 border-amber-500/40">
                🟡 3 {t("medium", "មធ្យម")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border bg-rose-500/10 text-rose-200 border-rose-500/40">
                🔴 3 {t("hard", "ពិបាក")}
              </span>
            </div>
          </div>
        </header>

        {/* ── Difficulty Tabs ──────────────────────────────────────────── */}
        <div
          role="tablist"
          aria-label={t("Difficulty levels", "កម្រិតពិបាក")}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6"
          data-testid="tier-tabs"
        >
          {TIERS.map((tier) => {
            const tAccent = ACCENT[tier.accent];
            const isActive = activeTier === tier.key;
            return (
              <button
                key={tier.key}
                id={`tier-tab-${tier.key}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tier-panel-${tier.key}`}
                onClick={() => setActiveTier(tier.key)}
                className={`relative rounded-2xl border-2 p-4 text-left transition-all ${
                  isActive
                    ? `${tAccent.border} ${tAccent.glow} bg-slate-900/80`
                    : "border-slate-700 hover:border-slate-500 bg-slate-900/40"
                }`}
                data-testid={`tier-tab-${tier.key}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    {tier.emoji}
                  </span>
                  <div className="flex-1">
                    <div
                      className={`text-base font-bold ${isActive ? tAccent.text : "text-slate-200"} ${kh ? "font-khmer leading-snug" : ""}`}
                    >
                      {kh ? tier.labelKh : tier.labelEn}
                    </div>
                    <div
                      className={`text-xs ${isActive ? "text-slate-300" : "text-slate-500"} ${kh ? "" : "font-khmer"}`}
                    >
                      {kh ? tier.labelEn : tier.labelKh}
                    </div>
                    <div
                      className={`mt-1 text-[10px] font-mono uppercase tracking-wider ${isActive ? tAccent.text + " opacity-90" : "text-slate-500"} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
                    >
                      {kh ? tier.focusKh : tier.focusEn}
                    </div>
                  </div>
                  {isActive && (
                    <Target
                      className={`w-5 h-5 ${tAccent.text}`}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Active tier banner ───────────────────────────────────────── */}
        <div
          role="status"
          className={`rounded-xl border px-4 py-3 mb-5 flex items-center gap-3 ${accent.chip}`}
          data-testid="tier-banner"
        >
          <Lightbulb className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
          <div className={`text-sm ${kh ? "font-khmer leading-loose text-base" : ""}`}>
            <strong>
              {kh ? activeMeta.labelKh : activeMeta.labelEn}
            </strong>
            {" — "}
            <span className="opacity-90">
              {kh
                ? `ផ្ដោតលើ៖ ${activeMeta.focusKh} (${activeMeta.focusEn})`
                : `Focus: ${activeMeta.focusEn} (${activeMeta.focusKh})`}
            </span>
          </div>
        </div>

        {/* ── Puzzles for active tier ──────────────────────────────────── */}
        <div
          id={`tier-panel-${activeTier}`}
          role="tabpanel"
          aria-labelledby={`tier-tab-${activeTier}`}
          className="space-y-4 sm:space-y-5"
          data-testid={`puzzle-list-${activeTier}`}
        >
          {PUZZLES[activeTier].map((puzzle, idx) => (
            <PuzzleCard
              key={puzzle.id}
              puzzle={puzzle}
              index={idx}
              accent={activeMeta.accent}
              kh={kh}
              t={t}
            />
          ))}
        </div>

        {/* ── Footer note ──────────────────────────────────────────────── */}
        <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-900/60 p-5 sm:p-6 flex items-start gap-4">
          <Trophy
            className="w-8 h-8 text-amber-300 flex-shrink-0"
            aria-hidden="true"
          />
          <p
            className={`text-sm sm:text-base text-slate-300 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {t(
              "Logic puzzles are bench-press for the brain. Don't rush to the answer — the value is in the struggle. The more you wrestle with a problem before peeking, the stronger the neural pathway you build. Come back tomorrow and try the next tier.",
              "ល្បែងតក្កវិជ្ជាគឺជាការ ហ្វឹកហាត់សាច់ដុំ សម្រាប់ខួរក្បាល។ កុំប្រញាប់ឆ្ពោះទៅរកចម្លើយ — តម្លៃពិតប្រាកដគឺនៅក្នុងការតស៊ូ។ អ្នកកាន់តែតស៊ូជាមួយបញ្ហាមុនពេលមើល ផ្លូវសរសៃប្រសាទកាន់តែរឹងមាំ។ ត្រឡប់មកវិញនៅថ្ងៃស្អែក និងសាកល្បងកម្រិតបន្ទាប់។"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Single puzzle card · click to expand · "Reveal Answer" → confetti
// ════════════════════════════════════════════════════════════════════════════
function PuzzleCard({
  puzzle,
  index,
  accent,
  kh,
  t,
}: {
  puzzle: PuzzleData;
  index: number;
  accent: "emerald" | "amber" | "rose";
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const revealBtnRef = useRef<HTMLButtonElement>(null);
  const a = ACCENT[accent];

  const handleReveal = () => {
    setRevealed(true);
    burstConfetti(revealBtnRef.current, accent);
  };

  return (
    <article
      className={`relative rounded-3xl border-2 overflow-hidden transition-all bg-slate-900/60 ${
        open ? `${a.border} ${a.glow}` : `${a.cardBorder} ${a.cardHover}`
      }`}
      data-testid={`puzzle-${puzzle.id}`}
    >
      {/* faint puzzle-piece motif corner */}
      <Puzzle
        aria-hidden="true"
        className={`absolute -right-3 -bottom-3 w-20 h-20 ${a.text} opacity-[0.07]`}
        strokeWidth={1.2}
      />

      {/* Card header — click to expand */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={`puzzle-body-${puzzle.id}`}
        className="relative w-full text-left p-5 sm:p-6 flex items-start gap-4 hover:bg-white/[0.02] transition-colors"
        data-testid={`puzzle-toggle-${puzzle.id}`}
      >
        <div
          className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl border ${a.chip}`}
          aria-hidden="true"
        >
          {puzzle.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`text-[10px] font-mono uppercase tracking-[0.25em] ${a.text} opacity-90`}
          >
            {t("Puzzle", "ល្បែង")} {String(index + 1).padStart(2, "0")}
          </div>
          <h3
            className={`text-lg sm:text-xl font-bold text-slate-50 mt-0.5 ${kh ? "font-khmer leading-snug" : ""}`}
          >
            {kh ? puzzle.titleKh : puzzle.titleEn}
          </h3>
          <p
            className={`text-sm text-slate-400 mt-0.5 ${kh ? "" : "font-khmer"}`}
          >
            {kh ? puzzle.titleEn : puzzle.titleKh}
          </p>
        </div>
        <div
          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border ${a.chip}`}
          aria-hidden="true"
        >
          {open ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>

      {/* Expanded body */}
      {open && (
        <div
          id={`puzzle-body-${puzzle.id}`}
          className="relative px-5 sm:px-6 pb-5 sm:pb-6 space-y-4 border-t border-white/5"
          data-testid={`puzzle-body-${puzzle.id}`}
        >
          {/* THE PUZZLE — bilingual EN + KH stacked */}
          <div className="pt-4">
            <div
              className={`text-[10px] font-mono uppercase tracking-[0.25em] ${a.text} mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            >
              ❓ {t("The Puzzle", "សំណួរ")}
            </div>
            <div className="rounded-2xl bg-slate-950/60 border border-white/5 p-4 sm:p-5 space-y-3">
              <p className="text-base sm:text-lg leading-relaxed text-slate-100">
                {puzzle.questionEn}
              </p>
              <p className="font-khmer text-base sm:text-lg leading-loose text-slate-200/95 border-t border-white/5 pt-3">
                {puzzle.questionKh}
              </p>
            </div>
          </div>

          {/* HINT (optional) */}
          {puzzle.hintEn && (
            <details className="rounded-xl bg-slate-800/40 border border-white/5 p-3 sm:p-4">
              <summary
                className={`cursor-pointer text-sm font-medium text-slate-300 hover:text-amber-200 transition-colors flex items-center gap-2 ${kh ? "font-khmer text-base" : ""}`}
              >
                <Lightbulb className="w-4 h-4 text-amber-300" aria-hidden="true" />
                {t("Need a hint?", "ចង់បានគន្លឹះ?")}
              </summary>
              <div className="mt-3 space-y-2">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {puzzle.hintEn}
                </p>
                <p className="font-khmer text-sm text-slate-400 leading-loose">
                  {puzzle.hintKh}
                </p>
              </div>
            </details>
          )}

          {/* REVEAL BUTTON or ANSWER */}
          {!revealed ? (
            <button
              ref={revealBtnRef}
              type="button"
              onClick={handleReveal}
              className={`w-full rounded-2xl font-bold py-3 sm:py-4 px-6 text-base sm:text-lg shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] inline-flex items-center justify-center gap-2 ${a.button} ${kh ? "font-khmer" : ""}`}
              data-testid={`reveal-${puzzle.id}`}
            >
              <Sparkles className="w-5 h-5" aria-hidden="true" />
              {t("Reveal Answer", "បង្ហាញចម្លើយ")}
              <Sparkles className="w-5 h-5" aria-hidden="true" />
            </button>
          ) : (
            <div
              className="rounded-2xl border-2 border-violet-400/40 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 p-4 sm:p-5 animate-in fade-in slide-in-from-bottom-2 duration-300"
              data-testid={`answer-${puzzle.id}`}
              role="region"
              aria-label={t("Answer", "ចម្លើយ")}
            >
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-violet-300" aria-hidden="true" />
                <span
                  className={`text-[10px] font-mono uppercase tracking-[0.25em] text-violet-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
                >
                  ✓ {t("Answer", "ចម្លើយ")}
                </span>
              </div>
              <div className="space-y-3">
                <p className="text-base text-slate-100 leading-relaxed">
                  {puzzle.answerEn}
                </p>
                <p className="font-khmer text-base text-slate-100 leading-loose border-t border-violet-400/20 pt-3">
                  {puzzle.answerKh}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
