import { History } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

/**
 * Co-located search entry for the historical / public-health subsection
 * appended at the bottom of PlumbingSewersPage.tsx — "The Evolution of
 * Sanitation: From Chamber Pots to Clean Water". Auto-discovered by
 * src/data/searchAutoIndex.ts via the `*.search.ts` glob.
 */
export const searchMeta: SearchEntry = {
  id: "tech-plumbing-sanitation-history",
  type: "page",
  href: "/technology/plumbing#evolution-of-sanitation",
  icon: History,
  titleEn: "The Evolution of Sanitation: From Chamber Pots to Clean Water",
  titleKh: "ការវិវត្តនៃអនាម័យ៖ ពីកន្ថោរ ដល់ទឹកស្អាត",
  categoryEn: "Technology · History",
  categoryKh: "បច្ចេកវិទ្យា · ប្រវត្តិសាស្ត្រ",
  descEn:
    "5,000 years of plumbing — from the Indus Valley flushing toilets and Roman aqueducts, to the chamber pots and cholera epidemics of 18th-century Europe, to the 1.5 billion people still without safe sanitation today.",
  descKh:
    "៥.០០០ ឆ្នាំ​នៃ​ប្រព័ន្ធ​បំពង់​ទឹក — ពី​បង្គន់​បង្ហូរ​ទឹក​នៅ​ជ្រលង​ភ្នំ​សិន្ធុ និង​ស្ពាន​បង្ហូរ​ទឹក​រ៉ូម៉ាំង រហូត​ដល់​កន្ថោរ និង​ការ​ផ្ទុះ​ជំងឺ​អាសន្ន​រោគ​នៅ​អឺរ៉ុប​សតវត្ស​ទី ១៨ និង​ដល់​មនុស្ស ១,៥ ពាន់​លាន​នាក់​ដែល​នៅ​ខ្វះ​អនាម័យ​មាន​សុវត្ថិភាព​សព្វ​ថ្ងៃ​នេះ។",
  keywordsEn: [
    "plumbing", "toilet", "history", "sanitation", "cholera",
    "chamber pot", "indus valley", "mohenjo-daro", "roman empire",
    "aqueduct", "aqueducts", "public health", "dysentery",
    "open defecation", "clean water", "sewage history",
    "evolution of sanitation", "global health", "ancient plumbing",
    "1.5 billion", "diarrhea", "diarrhoea", "child mortality",
  ],
  keywordsKh: [
    "បំពង់ទឹក", "បង្គន់", "ប្រវត្តិសាស្ត្រ", "អនាម័យ",
    "ជំងឺអាសន្នរោគ", "កន្ថោរ", "ជ្រលងភ្នំសិន្ធុ",
    "ម៉ូហិនចូ-ដាហ្រូ", "អាណាចក្ររ៉ូម៉ាំង", "ស្ពានបង្ហូរទឹក",
    "សុខភាពសាធារណៈ", "ជំងឺមូលមាត់", "ការបន្ទោរបង់ខាងក្រៅ",
    "ទឹកស្អាត", "ប្រវត្តិលូ", "ការវិវត្តនៃអនាម័យ",
    "សុខភាពពិភពលោក", "ជំងឺរាក",
  ],
};
