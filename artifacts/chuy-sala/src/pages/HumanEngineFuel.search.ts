import { Apple } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

/**
 * Deep-link entry for the Engine Fuel (Healthy vs Unhealthy Food) sub-section
 * inside the Human Engine page. Lives in its own sidecar file because the
 * search auto-discoverer only picks up the single `searchMeta` export per file.
 */
export const searchMeta: SearchEntry = {
  id: "human-engine-fuel",
  type: "module",
  href: "/human-engine#engine-fuel",
  icon: Apple,
  titleEn: "Engine Fuel — Healthy vs Unhealthy Food",
  titleKh: "ឥន្ធនៈម៉ាស៊ីន — អាហារល្អ vs អាហារមិនល្អ",
  categoryEn: "Well-being",
  categoryKh: "សុខុមាលភាព",
  descEn:
    "What you put in your body is the fuel that powers everything. Compare premium fuel (whole foods) vs cheap fuel (processed junk).",
  descKh:
    "អ្វីដែលអ្នកដាក់ចូលក្នុងរាងកាយ គឺជាឥន្ធនៈដែលផ្ដល់ថាមពលគ្រប់ទីកន្លែង។ ប្រៀបធៀបឥន្ធនៈគុណភាពខ្ពស់ (អាហារធម្មជាតិ) ទល់នឹងឥន្ធនៈថោក (អាហារកែច្នៃ)។",
  keywordsEn: [
    "engine fuel", "fuel", "nutrition", "food",
    "healthy food", "unhealthy food", "junk food", "processed food",
    "whole foods", "soda", "sugar", "fast food", "snacks",
    "premium fuel", "cheap fuel", "diet", "macros",
    "fruits", "vegetables", "protein", "carbs", "fat",
    "calories", "weight", "obesity", "diabetes",
  ],
  keywordsKh: [
    "ឥន្ធនៈម៉ាស៊ីន", "ឥន្ធនៈ", "អាហារូបត្ថម្ភ", "អាហារ",
    "អាហារល្អ", "អាហារមិនល្អ", "អាហារកែច្នៃ",
    "អាហារធម្មជាតិ", "ទឹកជ្រក់ផ្អែម", "ស្ករ", "អាហាររហ័ស",
    "ផ្លែឈើ", "បន្លែ", "ប្រូតេអ៊ីន",
  ],
};
