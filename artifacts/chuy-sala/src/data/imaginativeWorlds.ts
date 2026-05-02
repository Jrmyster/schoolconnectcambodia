// ════════════════════════════════════════════════════════════════════════════
// Imaginative Worlds & Teen Fiction — curated modern fiction starter shelf.
//
// Tags are bilingual (English / Khmer) and color-coded in the UI. Cover image
// URLs are intentionally placeholders ("") — the UI falls back to a styled
// glyph card when no cover is provided. Drop a real URL into `coverImageUrl`
// to swap the glyph for the cover.
// ════════════════════════════════════════════════════════════════════════════

export type GenreTag = "scifi" | "fantasy" | "teen";

export type ImaginativeBook = {
  title: string;
  author: string;
  genreTag: GenreTag;
  coverImageUrl: string; // "" when no cover is available
  /** Short bilingual blurb shown under the title. */
  blurbEn: string;
  blurbKh: string;
};

/**
 * Bilingual genre labels, kept here so cards, filter chips, and the search
 * bar all read from a single source of truth.
 */
export const GENRE_LABELS: Record<GenreTag, { en: string; kh: string; short: string }> = {
  scifi:   { en: "Sci-Fi",      kh: "វិទ្យាសាស្ត្រ", short: "Sci-Fi" },
  fantasy: { en: "Fantasy",     kh: "រវើរវាយ",        short: "Fantasy" },
  teen:    { en: "Teen Fiction", kh: "យុវវ័យ",          short: "Teen" },
};

export const IMAGINATIVE_BOOKS: ImaginativeBook[] = [
  {
    title: "The Culture Series",
    author: "Iain M. Banks",
    genreTag: "scifi",
    coverImageUrl: "",
    blurbEn: "A galaxy-spanning post-scarcity civilisation explored across nine novels.",
    blurbKh: "សៀវភៅប្រឌិតវិទ្យាសាស្ត្រ ៩ ភាគ ស្តីពីសង្គមអនាគតដែលមិនកម្រខ្វះអ្វីទាំងអស់។",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genreTag: "scifi",
    coverImageUrl: "",
    blurbEn: "Politics, prophecy and ecology on the desert world of Arrakis.",
    blurbKh: "នយោបាយ ព្យាករណ៍ និងបរិស្ថានវិទ្យានៅលើភពខ្សាច់ អារ៉ាគីស។",
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genreTag: "fantasy",
    coverImageUrl: "",
    blurbEn: "The hobbit Frodo's quest to destroy the One Ring in the fires of Mount Doom.",
    blurbKh: "ដំណើររបស់ Frodo ដើម្បីបំផ្លាញចិញ្ចៀនមួយ នៅភ្នំ Doom។",
  },
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    genreTag: "teen",
    coverImageUrl: "",
    blurbEn: "Seven-book journey of a young wizard and his friends at Hogwarts.",
    blurbKh: "ដំណើរ ៧ ភាគរបស់គ្រូមន្តអាគមវ័យក្មេង និងមិត្តភក្តិនៅសាលា Hogwarts។",
  },
  {
    title: "The Inheritance Cycle (Eragon)",
    author: "Christopher Paolini",
    genreTag: "teen",
    coverImageUrl: "",
    blurbEn: "A farm boy bonds with a dragon and is pulled into a kingdom-wide rebellion.",
    blurbKh: "ក្មេងប្រុសចម្ការម្នាក់ចងសម្ព័ន្ធជាមួយនាគ ហើយត្រូវចូលរួមក្នុងការបះបោរ។",
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    genreTag: "scifi",
    coverImageUrl: "",
    blurbEn: "A lone astronaut wakes light-years from Earth and must save the species.",
    blurbKh: "អវកាសយានិកម្នាក់ភ្ញាក់ឡើងឆ្ងាយពីផែនដី ហើយត្រូវសង្គ្រោះមនុស្សជាតិ។",
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    genreTag: "teen",
    coverImageUrl: "",
    blurbEn: "Katniss Everdeen volunteers in a televised survival contest in dystopian Panem.",
    blurbKh: "Katniss Everdeen ស្ម័គ្រចូលប្រកួតរស់រាននៅក្នុងប្រទេស Panem ដែលគាបសង្កត់។",
  },
];
