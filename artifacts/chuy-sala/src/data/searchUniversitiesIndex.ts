/**
 * Dynamically-generated search entries for every university in the
 * "Global 200" Directory.
 *
 * The source of truth is `UNIVERSITIES` in `@/components/GlobalUniversityHub`.
 * Adding/removing a university there automatically updates global search —
 * no entry needs to be hand-maintained here.
 *
 * All entries route to `/launchpad#global-university-hub`, which scrolls to
 * the directory section on the Launchpad page.
 */
import { GraduationCap } from "lucide-react";
import {
  UNIVERSITIES,
  REGIONS,
  SPECIALTY,
} from "@/components/GlobalUniversityHub";
import type { SearchEntry } from "./searchTypes";

const HREF = "/launchpad#global-university-hub";

const regionLabel = (id: string) => REGIONS.find((r) => r.id === id);

export const UNIVERSITY_SEARCH_ENTRIES: SearchEntry[] = UNIVERSITIES.map(
  (u): SearchEntry => {
    const region = regionLabel(u.region);
    const spec = SPECIALTY[u.specialty];
    const slug = u.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return {
      id: `university-${slug}`,
      type: "module",
      href: HREF,
      icon: GraduationCap,
      titleEn: u.name,
      titleKh: u.name,
      categoryEn: "Global 200 Directory",
      categoryKh: "បញ្ជីសាកលវិទ្យាល័យ Global 200",
      descEn: `${u.countryEn} • ${region?.en ?? u.region} • ${spec.en}`,
      descKh: `${u.countryKh} • ${region?.kh ?? u.region} • ${spec.kh}`,
      keywordsEn: [
        "university",
        "college",
        "global 200",
        u.countryEn,
        region?.en ?? "",
        spec.en,
        u.specialty,
      ].filter(Boolean),
      keywordsKh: [
        "សាកលវិទ្យាល័យ",
        "មហាវិទ្យាល័យ",
        u.countryKh,
        region?.kh ?? "",
        spec.kh,
      ].filter(Boolean),
    };
  },
);
