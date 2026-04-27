import { Globe } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

export const searchMeta: SearchEntry = {
  id: "study-center-global-atlas",
  type: "page",
  href: "/study-center/global-atlas",
  icon: Globe,
  titleEn: "The Global Atlas",
  titleKh: "ផែនទីពិភពលោក",
  categoryEn: "Study Center",
  categoryKh: "មជ្ឈមណ្ឌលសិក្សា",
  descEn:
    "Browse every country in the world: capital, population, currency, language, neighbors, and key facts — searchable and bilingual.",
  descKh:
    "រុករកគ្រប់ប្រទេសក្នុងពិភពលោក៖ រដ្ឋធានី ប្រជាជន រូបិយប័ណ្ណ ភាសា ប្រទេសជិតខាង និងការពិតសំខាន់ៗ — ស្វែងរកបាន ទ្វេភាសា។",
  keywordsEn: [
    "atlas", "global atlas", "world atlas", "world map",
    "country", "countries", "nation", "nations",
    "capital", "capitals", "population", "currency", "currencies",
    "language", "languages", "neighbor", "neighbors", "geography",
    "continents", "borders", "africa", "asia", "europe", "americas", "oceania",
    "flag", "flags", "world", "global",
  ],
  keywordsKh: [
    "ផែនទី", "ផែនទីពិភពលោក", "អាត្លាស",
    "ប្រទេស", "ជាតិ", "រដ្ឋធានី", "ប្រជាជន", "រូបិយប័ណ្ណ",
    "ភាសា", "ភូមិសាស្ត្រ", "ទ្វីប", "ព្រំដែន",
    "ទង់ជាតិ", "ពិភពលោក",
  ],
};
