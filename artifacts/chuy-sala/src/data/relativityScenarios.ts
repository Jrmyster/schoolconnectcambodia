// ── Relativity Scenarios ──────────────────────────────────────────────────────
// Rule: Earth time ≈ distance in light-years (ship at ≈99.99% c).
// Choices always include: correct Earth time | traveler felt time | distractor.
// Correct answer key varies per scenario (A / B / C) to prevent pattern guessing.
// ─────────────────────────────────────────────────────────────────────────────

export type AnswerKey = "A" | "B" | "C";

export type Choice = {
  key: AnswerKey;
  en: string;
  kh: string;
};

export type Scenario = {
  id: string;
  destination: { en: string; kh: string };
  emoji: string;
  distanceLy: number;
  distanceLabel: { en: string; kh: string };
  travelerTime: { en: string; kh: string };
  earthTimeLabel: { en: string; kh: string };
  scenarioText: { en: string; kh: string };
  questionText: { en: string; kh: string };
  choices: Choice[];
  correctKey: AnswerKey;
  feedbackCorrect: { en: string; kh: string };
  feedbackIncorrect: { en: string; kh: string };
  clockCaption: { en: string; kh: string };
  lifeFact: { en: string; kh: string };
};

// ─────────────────────────────────────────────────────────────────────────────

export const SCENARIOS: Scenario[] = [
  // ── 1. Proxima Centauri — correct: A ─────────────────────────────────────
  {
    id: "proxima-centauri",
    destination: { en: "Proxima Centauri", kh: "ផ្កាយ ប្រ៉ុកស៊ីម៉ា សិនតូរី" },
    emoji: "🌟",
    distanceLy: 4.2,
    distanceLabel: { en: "4.2 light-years", kh: "ឆ្នាំពន្លឺ ៤.២" },
    travelerTime: { en: "about 2.2 months", kh: "ប្រហែល ២.២ ខែ" },
    earthTimeLabel: { en: "4.2 years", kh: "៤.២ ឆ្នាំ" },
    scenarioText: {
      en: "You are 18 years old. You board a spacecraft bound for Proxima Centauri — our nearest stellar neighbor at 4.2 light-years away — at near-light speed. Due to Time Dilation, only about 2.2 months pass for you on board.",
      kh: "អ្នកមានអាយុ ១៨ ឆ្នាំ។ អ្នកឡើងយានអវកាស ទៅ ប្រ៉ុកស៊ីម៉ា សិនតូរី — ចម្ងាយ ៤.២ ឆ្នាំពន្លឺ — ក្នុងល្បឿនជិតពន្លឺ។ ដោយសារការពន្យារពេលវេលា ប្រហែល ២.២ ខែប៉ុណ្ណោះ ដែលកន្លងទៅ សម្រាប់អ្នកលើយាន។",
    },
    questionText: {
      en: "You arrive at Proxima Centauri feeling like barely a semester has passed. How many years have gone by for your friends back on Earth?",
      kh: "អ្នកទៅដល់ ប្រ៉ុកស៊ីម៉ា សិនតូរី ក្នុងអារម្មណ៍ ២.២ ខែ។ ប៉ុន្មានឆ្នាំបានកន្លងទៅ សម្រាប់មិត្តភក្តិ នៅផែនដី?",
    },
    choices: [
      {
        key: "A",
        en: "4.2 years — the light-travel time to Proxima Centauri",
        kh: "៤.២ ឆ្នាំ — ពេលវេលាដំណើររបស់ពន្លឺ ទៅ ប្រ៉ុកស៊ីម៉ា",
      },
      {
        key: "B",
        en: "About 2.2 months — the same as you felt on the ship",
        kh: "ប្រហែល ២.២ ខែ — ដូចអ្នកមានអារម្មណ៍នៅលើយាន",
      },
      {
        key: "C",
        en: "8.4 years — double the distance to Proxima",
        kh: "៨.៤ ឆ្នាំ — ចម្ងាយទ្វីគុណ ទៅ ប្រ៉ុកស៊ីម៉ា",
      },
    ],
    correctKey: "A",
    feedbackCorrect: {
      en: "Correct! While you felt only 2.2 months pass, 4.2 years elapsed on Earth — equal to the distance in light-years. You barely finished a semester; your friends graduated high school.",
      kh: "ត្រឹមត្រូវ! ខណៈអ្នកមានអារម្មណ៍ ២.២ ខែ ៤.២ ឆ្នាំ ត្រូវបានកន្លងទៅ នៅផែនដី — ស្មើចម្ងាយ ជាឆ្នាំពន្លឺ។ អ្នកស្ទើរតែបញ្ចប់ ១ ឆមាស; មិត្តភក្តិបញ្ចប់វិទ្យាល័យ។",
    },
    feedbackIncorrect: {
      en: "Not quite. The correct answer is 4.2 years — always equal to the distance in light-years. Your clock ran far slower than Earth's at near-light speed.",
      kh: "មិនត្រូវទេ។ ចម្លើយត្រឹមត្រូវ គឺ ៤.២ ឆ្នាំ — ស្មើចម្ងាយ ជាឆ្នាំពន្លឺ។ នាឡិការបស់អ្នកដើរយឺតជាងផែនដី ក្នុងល្បឿនជិតពន្លឺ។",
    },
    clockCaption: {
      en: "2.2 months on your ship = 4.2 years on Earth. You barely aged; your friends have moved on.",
      kh: "២.២ ខែ នៅលើយាន = ៤.២ ឆ្នាំ នៅផែនដី។ អ្នកស្ទើរមិនបានចាស់; មិត្តភក្តិបន្ដជីវិតហើយ។",
    },
    lifeFact: {
      en: "You've barely finished a semester — but your friends have graduated high school, turned 22, and many have already started their first jobs.",
      kh: "អ្នកទើបបញ្ចប់ ១ ឆមាស — ប៉ុន្តែមិត្តភក្តិបញ្ចប់វិទ្យាល័យ អាយុ ២២ ឆ្នាំ ហើយជាច្រើននាក់ ចាប់ផ្ដើមមុខរបររបស់ពួកគេហើយ។",
    },
  },

  // ── 2. Vega — correct: B ──────────────────────────────────────────────────
  {
    id: "vega",
    destination: { en: "Vega", kh: "ផ្កាយ វេហ្គា" },
    emoji: "💫",
    distanceLy: 25,
    distanceLabel: { en: "25 light-years", kh: "ឆ្នាំពន្លឺ ២៥" },
    travelerTime: { en: "about 1.1 years", kh: "ប្រហែល ១.១ ឆ្នាំ" },
    earthTimeLabel: { en: "25 years", kh: "២៥ ឆ្នាំ" },
    scenarioText: {
      en: "You are 18 years old. You set course for Vega — one of the brightest stars in the sky at 25 light-years away — at near-light speed. Time Dilation shrinks the voyage to just about 1.1 years for you on board.",
      kh: "អ្នកមានអាយុ ១៨ ឆ្នាំ។ អ្នករៀបចំចេញដំណើរ ទៅ វេហ្គា — ផ្កាយភ្លឺ ចម្ងាយ ២៥ ឆ្នាំពន្លឺ — ក្នុងល្បឿនជិតពន្លឺ។ ការពន្យារពេលវេលា ហ្វត់ដំណើរ ជា ១.១ ឆ្នាំ ក្នុងការរំពឹងរបស់អ្នក។",
    },
    questionText: {
      en: "You arrive at Vega just over a year older. How many years have passed for your friends and family on Earth?",
      kh: "អ្នកទៅដល់ វេហ្គា ចាស់ជាងមួយឆ្នាំ។ ប៉ុន្មានឆ្នាំបានកន្លងទៅ សម្រាប់គ្រួសារ នៅផែនដី?",
    },
    choices: [
      {
        key: "A",
        en: "About 1.1 years — the same as your ship-time",
        kh: "ប្រហែល ១.១ ឆ្នាំ — ដូចពេលវេលានៅលើយាន",
      },
      {
        key: "B",
        en: "25 years — the light-travel time to Vega",
        kh: "២៥ ឆ្នាំ — ពេលវេលាដំណើររបស់ពន្លឺ ទៅ វេហ្គា",
      },
      {
        key: "C",
        en: "50 years — double the distance to Vega",
        kh: "៥០ ឆ្នាំ — ចម្ងាយទ្វីគុណ ទៅ វេហ្គា",
      },
    ],
    correctKey: "B",
    feedbackCorrect: {
      en: "Correct! Exactly 25 years passed on Earth — equal to Vega's distance in light-years. You aged just one year; your friends are now in their 40s, many starting their own families.",
      kh: "ត្រឹមត្រូវ! ២៥ ឆ្នាំបានកន្លងទៅ នៅផែនដី — ស្មើចម្ងាយ ជាឆ្នាំពន្លឺ។ អ្នកចាស់ ១ ឆ្នាំ; មិត្តភក្តិ ៤០ ជាងឆ្នាំ ហើយជាច្រើន ចាប់ផ្ដើមបង្កើតគ្រួសារ។",
    },
    feedbackIncorrect: {
      en: "Not quite. Earth experienced 25 years — matching Vega's distance in light-years. While you aged barely a year, a quarter-century passed for everyone you love.",
      kh: "មិនត្រូវទេ។ ផែនដីបានកន្លង ២៥ ឆ្នាំ — ស្មើចម្ងាយ ជាឆ្នាំពន្លឺ។ ខណៈអ្នកចាស់ ១ ឆ្នាំ ២៥ ឆ្នាំបានកន្លងទៅ សម្រាប់ក្រុមគ្រួសារ។",
    },
    clockCaption: {
      en: "1.1 years on your ship = 25 years on Earth. You've aged one year; your friends have grown old.",
      kh: "១.១ ឆ្នាំ នៅលើយាន = ២៥ ឆ្នាំ នៅផែនដី។ អ្នកចាស់ ១ ឆ្នាំ; មិត្តភក្តិចាស់ ២៥ ឆ្នាំ។",
    },
    lifeFact: {
      en: "You've aged one year — but your friends are now starting their own families. Some already have teenage children. The pop songs from when you left are now considered \"classics\".",
      kh: "អ្នកចាស់ ១ ឆ្នាំ — ប៉ុន្តែមិត្តភក្តិ ចាប់ផ្ដើមបង្កើតគ្រួសារ។ ខ្លះមានកូនជំទង់ហើយ។ បទចម្រៀង ពីពេលអ្នកចេញ ឥឡូវជា \"ចម្រៀងបុរាណ\"។",
    },
  },

  // ── 3. Pleiades Cluster — correct: C ─────────────────────────────────────
  {
    id: "pleiades",
    destination: { en: "The Pleiades Cluster", kh: "ក្រុមផ្កាយ ផ្លេអ៊ែត" },
    emoji: "✨",
    distanceLy: 444,
    distanceLabel: { en: "444 light-years", kh: "ឆ្នាំពន្លឺ ៤៤៤" },
    travelerTime: { en: "about 19.8 years", kh: "ប្រហែល ១៩.៨ ឆ្នាំ" },
    earthTimeLabel: { en: "444 years", kh: "៤៤៤ ឆ្នាំ" },
    scenarioText: {
      en: "You are 18 years old. The Pleiades — a breathtaking star cluster 444 light-years away — has inspired myths for millennia. You embark on a mission there at near-light speed. About 19.8 years pass for you on board — you will be nearly 38 when you arrive.",
      kh: "អ្នកមានអាយុ ១៨ ឆ្នាំ។ ក្រុមផ្កាយ ផ្លេអ៊ែត — ចម្ងាយ ៤៤៤ ឆ្នាំពន្លឺ — បំផុះផ្លោះរឿងព្រេង ជាច្រើនពាន់ឆ្នាំ។ អ្នកចេញបេសកម្ម ទៅទីនោះ ក្នុងល្បឿនជិតពន្លឺ។ ប្រហែល ១៩.៨ ឆ្នាំ ដែលកន្លងទៅ; អ្នកដើបចូលដល់ ៣៨ ឆ្នាំ។",
    },
    questionText: {
      en: "You arrive at the Pleiades nearly 20 years older. How many years have elapsed back on Earth?",
      kh: "អ្នកទៅដល់ ក្រុមផ្កាយ ផ្លេអ៊ែត ចាស់ ២០ ឆ្នាំ។ ប៉ុន្មានឆ្នាំបានកន្លងទៅ នៅផែនដី?",
    },
    choices: [
      {
        key: "A",
        en: "About 19.8 years — the same as your time on the ship",
        kh: "ប្រហែល ១៩.៨ ឆ្នាំ — ដូចពេលវេលានៅលើយាន",
      },
      {
        key: "B",
        en: "888 years — double the distance to the Pleiades",
        kh: "៨៨៨ ឆ្នាំ — ចម្ងាយទ្វីគុណ ទៅ ក្រុមផ្កាយ",
      },
      {
        key: "C",
        en: "444 years — the light-travel time to the Pleiades",
        kh: "៤៤៤ ឆ្នាំ — ពេលវេលាដំណើររបស់ពន្លឺ ទៅ ក្រុមផ្កាយ ផ្លេអ៊ែត",
      },
    ],
    correctKey: "C",
    feedbackCorrect: {
      en: "Correct! 444 years passed on Earth — equal to the distance in light-years. You aged 20 years; Earth spanned the era from Shakespeare's time to today.",
      kh: "ត្រឹមត្រូវ! ៤៤៤ ឆ្នាំបានកន្លងទៅ នៅផែនដី — ស្មើចម្ងាយ ជាឆ្នាំពន្លឺ។ អ្នកចាស់ ២០ ឆ្នាំ; ផែនដីបានផ្លាស់ប្ដូរ ៤ សតវត្សរ៍ ពីសម័យ ស្ហែ​ស្ពៀរ ដល់សព្វថ្ងៃ។",
    },
    feedbackIncorrect: {
      en: "Not quite. 444 years passed on Earth — matching the distance in light-years. While you aged 20 years, entire empires rose and fell. The world you left is now ancient history.",
      kh: "មិនត្រូវទេ។ ៤៤៤ ឆ្នាំបានកន្លងទៅ នៅផែនដី — ស្មើចម្ងាយ ជាឆ្នាំពន្លឺ។ ខណៈអ្នកចាស់ ២០ ឆ្នាំ ចក្រភពទាំងមូល បានលេចឡើង ហើយដួលរលំ។",
    },
    clockCaption: {
      en: "19.8 years on your ship = 444 years on Earth. You've grown into an adult; civilizations have transformed.",
      kh: "១៩.៨ ឆ្នាំ នៅលើយាន = ៤៤៤ ឆ្នាំ នៅផែនដី។ អ្នករីកចម្រើន ហើយ អរិយធម៌ ផ្លាស់ប្ដូររួចហើយ។",
    },
    lifeFact: {
      en: "You are 38 — but the world you left is ancient history. 444 years ago was the era of Shakespeare, the Khmer Kingdom's final dynasties, and the first telescopes. None of the countries or technologies you knew exist anymore.",
      kh: "អ្នកអាយុ ៣៨ ឆ្នាំ — ប៉ុន្តែពិភពលោកដែលអ្នកចាកចេញ ឥឡូវជាប្រវត្តិសាស្ត្របុរាណ។ ៤៤៤ ឆ្នាំ មុននៅផែនដី គឺ សម័យ ស្ហែ​ស្ពៀរ និងជំនាន់ចុងក្រោយ ព្រះចៅ ខ្មែរ។",
    },
  },

  // ── 4. Antares — correct: A ───────────────────────────────────────────────
  {
    id: "antares",
    destination: { en: "Antares", kh: "ផ្កាយ អាំតារ៉េស" },
    emoji: "🔴",
    distanceLy: 550,
    distanceLabel: { en: "550 light-years", kh: "ឆ្នាំពន្លឺ ៥៥០" },
    travelerTime: { en: "about 24.5 years", kh: "ប្រហែល ២៤.៥ ឆ្នាំ" },
    earthTimeLabel: { en: "550 years", kh: "៥៥០ ឆ្នាំ" },
    scenarioText: {
      en: "You are 18 years old. Antares — a colossal red supergiant 550 light-years away, so vast it would swallow Jupiter's orbit — beckons you. You travel there at near-light speed. About 24.5 years pass for you; you arrive in your early 40s.",
      kh: "អ្នកមានអាយុ ១៨ ឆ្នាំ។ អាំតារ៉េស — ផ្កាយក្រហម យក្ស ចម្ងាយ ៥៥០ ឆ្នាំពន្លឺ — ហៅអ្នក។ អ្នកធ្វើដំណើរ ក្នុងល្បឿនជិតពន្លឺ។ ប្រហែល ២៤.៥ ឆ្នាំ ដែលកន្លងទៅ; អ្នកទៅដល់ ខណៈ ដើបចូលដល់ ៤០ ឆ្នាំ។",
    },
    questionText: {
      en: "You arrive at Antares in your 40s, having aged 24.5 years. How many years have passed on Earth since you left?",
      kh: "អ្នកទៅដល់ អាំតារ៉េស ខណៈ ៤០ ជាងឆ្នាំ ចាស់ ២៤.៥ ឆ្នាំ។ ប៉ុន្មានឆ្នាំបានកន្លងទៅ នៅផែនដី?",
    },
    choices: [
      {
        key: "A",
        en: "550 years — the light-travel time to Antares",
        kh: "៥៥០ ឆ្នាំ — ពេលវេលាដំណើររបស់ពន្លឺ ទៅ អាំតារ៉េស",
      },
      {
        key: "B",
        en: "About 24.5 years — the same as you experienced",
        kh: "ប្រហែល ២៤.៥ ឆ្នាំ — ដូចអ្នកបានជួបប្រទះ",
      },
      {
        key: "C",
        en: "1,100 years — double the distance to Antares",
        kh: "១.១០០ ឆ្នាំ — ចម្ងាយទ្វីគុណ ទៅ អាំតារ៉េស",
      },
    ],
    correctKey: "A",
    feedbackCorrect: {
      en: "Correct! 550 years passed on Earth — equal to Antares' distance in light-years. You've reached your prime at 42; the city you left is completely unrecognizable.",
      kh: "ត្រឹមត្រូវ! ៥៥០ ឆ្នាំ — ស្មើចម្ងាយ ជាឆ្នាំពន្លឺ — បានកន្លងទៅ នៅផែនដី។ អ្នកដើបចូលដល់ ៤២ ឆ្នាំ; ទីក្រុង ដែលអ្នកចាកចេញ ឥឡូវ ពុំអាចស្គាល់ទៀតទេ។",
    },
    feedbackIncorrect: {
      en: "Not quite. The correct answer is 550 years — always the distance in light-years. While you aged 24.5 years, Earth experienced more than five centuries of history.",
      kh: "មិនត្រូវទេ។ ចម្លើយត្រឹមត្រូវ គឺ ៥៥០ ឆ្នាំ — ស្មើចម្ងាយ ជាឆ្នាំពន្លឺ។ ខណៈអ្នករស់ ២៤.៥ ឆ្នាំ ផែនដីបានជួបប្រទះ ៥ សតវត្សរ៍ ប្រវត្តិសាស្ត្រ។",
    },
    clockCaption: {
      en: "24.5 years on your ship = 550 years on Earth. You've reached your prime; entire civilizations came and went.",
      kh: "២៤.៥ ឆ្នាំ នៅលើយាន = ៥៥០ ឆ្នាំ នៅផែនដី។ អ្នកដើបចូលដល់ ខណៈ អរិយធម៌ ទាំងមូលបានផ្លាស់ប្ដូរ។",
    },
    lifeFact: {
      en: "You've reached your prime at 42 — but the city you left is completely unrecognizable. 550 years of history have passed. The languages, borders, and technologies of Earth are entirely different. You are a living relic from a lost era.",
      kh: "អ្នកដើបចូលដល់ ៤២ ឆ្នាំ — ប៉ុន្តែទីក្រុង ដែលអ្នកចាកចេញ ឥឡូវ ពុំអាចប្រៀបធៀបបាន។ ៥៥០ ឆ្នាំ ប្រវត្តិបានកន្លងទៅ។ ភាសា ព្រំដែន និងបច្ចេកវិទ្យា នៅផែនដី ខុសគ្នាទាំងស្រុង។",
    },
  },

  // ── 5. Andromeda Galaxy — correct: B ─────────────────────────────────────
  {
    id: "andromeda",
    destination: { en: "The Andromeda Galaxy", kh: "វិទ្យាសាស្ត្រ អង់ដ្រូម៉េដា" },
    emoji: "🌌",
    distanceLy: 2_500_000,
    distanceLabel: { en: "2.5 million light-years", kh: "ឆ្នាំពន្លឺ ២.៥ លាន" },
    travelerTime: { en: "about 28 years", kh: "ប្រហែល ២៨ ឆ្នាំ" },
    earthTimeLabel: { en: "2.5 million years", kh: "២.៥ លានឆ្នាំ" },
    scenarioText: {
      en: "You are 18 years old — and you volunteer for the most ambitious voyage in human history: a one-way trip to the Andromeda Galaxy, 2.5 million light-years away, at near-light speed. Time Dilation condenses this cosmic journey to just about 28 years for you. You will arrive at 46.",
      kh: "អ្នកមានអាយុ ១៨ ឆ្នាំ — ហើយអ្នក ស្ម័គ្រចិត្ត ក្នុងការធ្វើដំណើរ ដ៏មហិច្ឆតា ក្នុងប្រវត្តិ: ដំណើរ តែមួយទិស ទៅ អង់ដ្រូម៉េដា ចម្ងាយ ២.៥ លានឆ្នាំពន្លឺ ក្នុងល្បឿនជិតពន្លឺ។ ការពន្យារពេលវេលា ហ្វត់ ដំណើរ ជា ២៨ ឆ្នាំ ក្នុងការរំពឹងរបស់អ្នក។ អ្នកនឹងទៅដល់ ខណៈ ៤៦ ឆ្នាំ។",
    },
    questionText: {
      en: "You arrive at Andromeda at age 46, having lived 28 years on the ship. How much time has passed on Earth since you launched?",
      kh: "អ្នកទៅដល់ អង់ដ្រូម៉េដា ខណៈ ៤៦ ឆ្នាំ រស់ ២៨ ឆ្នាំ នៅលើយាន។ ពេលប៉ុន្មានបានកន្លងទៅ នៅផែនដី?",
    },
    choices: [
      {
        key: "A",
        en: "About 28 years — equal to your journey time",
        kh: "ប្រហែល ២៨ ឆ្នាំ — ស្មើពេលដំណើររបស់អ្នក",
      },
      {
        key: "B",
        en: "2.5 million years — the light-travel time to Andromeda",
        kh: "២.៥ លានឆ្នាំ — ពេលវេលាដំណើររបស់ពន្លឺ ទៅ អង់ដ្រូម៉េដា",
      },
      {
        key: "C",
        en: "5 million years — double the distance to Andromeda",
        kh: "៥ លានឆ្នាំ — ចម្ងាយទ្វីគុណ ទៅ អង់ដ្រូម៉េដា",
      },
    ],
    correctKey: "B",
    feedbackCorrect: {
      en: "Correct! 2.5 million years passed on Earth — equal to Andromeda's distance in light-years. You aged 28 years; back home, the human species itself may have evolved beyond recognition. Homo sapiens didn't even fully exist 2.5 million years ago.",
      kh: "ត្រឹមត្រូវ! ២.៥ លានឆ្នាំ — ស្មើចម្ងាយ ជាឆ្នាំពន្លឺ — បានកន្លងទៅ នៅផែនដី។ អ្នកចាស់ ២៨ ឆ្នាំ; នៅផ្ទះ មនុស្ស ប្រហែលជាបានវិវត្ត ហួសពីការទទួលស្គាល់ហើយ។",
    },
    feedbackIncorrect: {
      en: "Not quite. The answer is 2.5 million years — always the distance in light-years. You are 46; on Earth, 2.5 million years of evolution and transformation have passed. The civilization that launched you no longer exists.",
      kh: "មិនត្រូវទេ។ ចម្លើយ គឺ ២.៥ លានឆ្នាំ — ស្មើចម្ងាយ ជាឆ្នាំពន្លឺ។ អ្នកអាយុ ៤៦ ឆ្នាំ; នៅផែនដី ២.៥ លានឆ្នាំ នៃការវិវត្ត ត្រូវបានកន្លងទៅ។ អរិយធម៌ ដែលបានចាប់ផ្ដើម ពុំមានទៀតហើយ។",
    },
    clockCaption: {
      en: "28 years on your ship = 2.5 million years on Earth. You are 46; the human species has had 2.5 million years to evolve.",
      kh: "២៨ ឆ្នាំ នៅលើយាន = ២.៥ លានឆ្នាំ នៅផែនដី។ អ្នកអាយុ ៤៦ ឆ្នាំ; មនុស្សជាតិ មាន ២.៥ លានឆ្នាំ ដើម្បីវិវត្ត។",
    },
    lifeFact: {
      en: "You are a veteran explorer at 46 — but 2.5 million years have passed on Earth. When you left, Homo sapiens had just emerged. Now the human species itself has had 2.5 million years to evolve, transform, or disappear entirely.",
      kh: "អ្នកជា អ្នករុករក ដ៏ពូកែ ៤៦ ឆ្នាំ — ប៉ុន្តែ ២.៥ លានឆ្នាំ បានកន្លងទៅ នៅផែនដី។ ពេលអ្នកចេញ Homo sapiens ទើបតែលេចឡើង។ ឥឡូវ មនុស្សជាតិ មាន ២.៥ លានឆ្នាំ ដើម្បីវិវត្ត ឬបាត់ទៅ ទាំងស្រុង។",
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────

/** Pick a random scenario from the bank */
export function randomScenario(): Scenario {
  return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
}

/** Pick a random scenario different from the current one */
export function nextScenario(currentId: string): Scenario {
  const others = SCENARIOS.filter((s) => s.id !== currentId);
  return others[Math.floor(Math.random() * others.length)];
}
