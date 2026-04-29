/**
 * Dynamic country entries for the global search index.
 *
 * Maps every entry in `countriesData.json` into a `SearchEntry` so students
 * can search for any country directly from the homepage search bar — no
 * duplicated copy of the country data, single source of truth.
 *
 * Click-through goes to `/study-center/global-atlas?country=<id>`. The Atlas
 * page reads that query string on mount (via wouter's `useSearch`) and
 * filters the grid down to that country plus auto-opens its profile modal.
 */
import { Globe } from "lucide-react";
import type { SearchEntry } from "./searchTypes";
import countriesRaw from "./countriesData.json";

type Bilingual = { en: string; kh: string };
type Continent = "asia" | "europe" | "africa" | "americas" | "oceania";

type CountryRecord = {
  id: string;
  flag: string;
  continent: Continent;
  name: Bilingual;
  capital: Bilingual;
};

const CONTINENT_LABEL: Record<Continent, Bilingual> = {
  asia:     { en: "Asia",     kh: "អាស៊ី" },
  europe:   { en: "Europe",   kh: "អឺរ៉ុប" },
  africa:   { en: "Africa",   kh: "អាហ្វ្រិក" },
  americas: { en: "Americas", kh: "អាមេរិក" },
  oceania:  { en: "Oceania",  kh: "អូសេអានី" },
};

const ATLAS_PATH = "/study-center/global-atlas";

function toEntry(c: CountryRecord): SearchEntry {
  const cont = CONTINENT_LABEL[c.continent];

  return {
    id: `country-${c.id}`,
    type: "page",
    href: `${ATLAS_PATH}?country=${encodeURIComponent(c.id)}`,
    icon: Globe,

    // Bilingual title with flag prefix — the dropdown picks one based on
    // the active UI language, so each side stays clean and readable.
    titleEn: `${c.flag} ${c.name.en} / ${c.name.kh}`,
    titleKh: `${c.flag} ${c.name.kh} / ${c.name.en}`,

    // Per spec: a single bilingual category string for these dynamic results.
    categoryEn: "Global Atlas (សៀវភៅផែនទីពិភពលោក)",
    categoryKh: "សៀវភៅផែនទីពិភពលោក (Global Atlas)",

    descEn: `Capital: ${c.capital.en} · Continent: ${cont.en}. Open the country card in the Global Atlas.`,
    descKh: `រាជធានី៖ ${c.capital.kh} · ទ្វីប៖ ${cont.kh}។ បើកកាតប្រទេសក្នុងសៀវភៅផែនទីពិភពលោក។`,

    keywordsEn: [
      c.name.en,
      c.name.en.toLowerCase(),
      c.capital.en,
      cont.en,
      "country",
      "atlas",
      "global atlas",
    ],
    keywordsKh: [
      c.name.kh,
      c.capital.kh,
      cont.kh,
      "ប្រទេស",
      "ផែនទី",
      "សៀវភៅផែនទីពិភពលោក",
    ],
  };
}

const COUNTRIES = countriesRaw as CountryRecord[];

export const COUNTRY_SEARCH_ENTRIES: SearchEntry[] = COUNTRIES.map(toEntry);
