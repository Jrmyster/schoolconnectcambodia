// ════════════════════════════════════════════════════════════════════════════
// Khmer Literature — foundational Cambodian works.
//
// Each entry carries BOTH the English transliteration / translation AND the
// original Khmer title, since these are canonical pairings (e.g. "Sophat"
// always appears alongside "សូផាត"). Genre tags are bilingual and unique to
// this shelf — we expose them as their own type so the section UI can render
// a rich color palette per genre.
// ════════════════════════════════════════════════════════════════════════════

export type KhmerGenreTag =
  | "first-modern-novel"
  | "classic-romance"
  | "epic-poetry"
  | "historical-fiction"
  | "traditional-poetry";

export type KhmerBook = {
  /** English transliteration / translation of the title. */
  titleEn: string;
  /** Original Khmer title. */
  titleKh: string;
  /** Author name in Latin script (used for sorting / English search). */
  authorEn: string;
  /** Author name in Khmer script. */
  authorKh: string;
  /** Genre tag (typed enum keyed into KHMER_GENRE_LABELS). */
  genreTag: KhmerGenreTag;
  /** Placeholder — empty string falls back to a stylised glyph card. */
  coverImageUrl: string;
  /** Year of publication (for sorting / display); 0 when uncertain. */
  year: number;
  blurbEn: string;
  blurbKh: string;
};

export const KHMER_GENRE_LABELS: Record<KhmerGenreTag, { en: string; kh: string }> = {
  "first-modern-novel":  { en: "First Modern Novel",  kh: "ប្រលោមលោកទំនើបដំបូង" },
  "classic-romance":     { en: "Classic Romance",     kh: "មនោសញ្ចេតនាបុរាណ" },
  "epic-poetry":         { en: "Epic Poetry",         kh: "កំណាព្យវីរកថា" },
  "historical-fiction":  { en: "Historical Fiction",  kh: "ប្រលោមលោកប្រវត្តិសាស្ត្រ" },
  "traditional-poetry":  { en: "Traditional Poetry",  kh: "កំណាព្យប្រពៃណី" },
};

export const KHMER_BOOKS: KhmerBook[] = [
  {
    titleEn: "Sophat",
    titleKh: "សូផាត",
    authorEn: "Rim Kin",
    authorKh: "រឹម គីន",
    genreTag: "first-modern-novel",
    coverImageUrl: "",
    year: 1938,
    blurbEn:
      "Widely regarded as the first modern Khmer-language novel — a coming-of-age story that helped define modern Cambodian fiction.",
    blurbKh:
      "ត្រូវបានគេចាត់ទុកជាប្រលោមលោកខ្មែរទំនើបដំបូងគេ ដែលបានកំណត់រូបរាងនៃប្រលោមលោកខ្មែរសម័យទំនើប។",
  },
  {
    titleEn: "Kolap Pailin",
    titleKh: "កុលាបប៉ៃលិន",
    authorEn: "Nhok Them",
    authorKh: "ញ៉ុក ថែម",
    genreTag: "classic-romance",
    coverImageUrl: "",
    year: 1943,
    blurbEn:
      "“The Rose of Pailin” — a celebrated romance set in the gem-mining town of Pailin, beloved across generations of Cambodian readers.",
    blurbKh:
      "“កុលាបប៉ៃលិន” រឿងស្នេហាដ៏ល្បីដែលកើតឡើងនៅទីក្រុងរ៉ាត់ត្បូងប៉ៃលិន ដែលត្រូវបានស្រឡាញ់ដោយអ្នកអានខ្មែរច្រើនជំនាន់។",
  },
  {
    titleEn: "Tum Teav",
    titleKh: "ទុំទាវ",
    authorEn: "Preah Botumthera Som",
    authorKh: "ព្រះបទុមត្ថេរ សោម",
    genreTag: "epic-poetry",
    coverImageUrl: "",
    year: 1915,
    blurbEn:
      "Cambodia's most famous tragic love poem — a 19th-century tale codified in verse by Preah Botumthera Som.",
    blurbKh:
      "កំណាព្យស្នេហាដ៏សោកនាដកម្មល្បីបំផុតរបស់កម្ពុជា ដែលត្រូវបានសរសេរជាខ្សែកំណាព្យដោយ ព្រះបទុមត្ថេរ សោម។",
  },
  {
    titleEn: "A New Sun Rises Over the Old Land",
    titleKh: "ព្រះអាទិត្យថ្មីរះលើផែនដីចាស់",
    authorEn: "Suon Sorin",
    authorKh: "សួន សូរិន",
    genreTag: "historical-fiction",
    coverImageUrl: "",
    year: 1961,
    blurbEn:
      "A landmark mid-20th-century novel that captures Cambodian society on the cusp of profound political change.",
    blurbKh:
      "ប្រលោមលោកប្រវត្តិសាស្ត្រសំខាន់ពាក់កណ្តាលសតវត្សរ៍ទី ២០ ដែលឆ្លុះបញ្ចាំងសង្គមខ្មែរនៅគ្រាប្រែប្រួលនយោបាយ។",
  },
  {
    titleEn: "The Poems of Krom Ngoy",
    titleKh: "ច្បាប់ក្រមង៉ុយ",
    authorEn: "Krom Ngoy",
    authorKh: "ក្រម ង៉ុយ",
    genreTag: "traditional-poetry",
    coverImageUrl: "",
    year: 1920,
    blurbEn:
      "Moral verse and folk-wisdom poetry by Krom Ngoy — still recited and taught in Cambodian schools today.",
    blurbKh:
      "កំណាព្យសីលធម៌ និងប្រាជ្ញាប្រជាប្រិយដោយ ក្រម ង៉ុយ — នៅតែត្រូវបានសូត្រ និងបង្រៀននៅក្នុងសាលារៀនខ្មែរសព្វថ្ងៃ។",
  },
];
