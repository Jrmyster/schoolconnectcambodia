import { Sparkles } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

/**
 * Search entry for the Daily Defense (brushing & flossing) section
 * inside the Dentistry & Orthodontics page. Lives at /science/dentistry#daily-defense.
 */
export const searchMeta: SearchEntry = {
  id: "science-dentistry-daily-defense",
  type: "module",
  href: "/science/dentistry#daily-defense",
  icon: Sparkles,
  titleEn: "The Daily Defense: Brushing & Flossing",
  titleKh: "ការការពារប្រចាំថ្ងៃ៖ ការដុសធ្មេញ និងប្រើខ្សែទន្តពេទ្យ",
  categoryEn: "Health",
  categoryKh: "សុខភាព",
  descEn:
    "How plaque, cavities, and gum disease actually work — bacteria + sugar produce acid that eats tooth enamel. A toothbrush only reaches 60% of every tooth; flossing covers the missing 40%. Severe gum disease is directly linked to heart infections and cardiovascular disease.",
  descKh:
    "របៀបដែលបាក់តេរីធ្មេញ ប្រហោងធ្មេញ និងរលាកអញ្ចាញធ្មេញដំណើរការពិតប្រាកដ — បាក់តេរី + ស្ករ ផលិតអាស៊ីតដែលស៊ីស្រទាប់រឹងនៃធ្មេញ។ ច្រាសដុសធ្មេញឈានដល់តែ ៦០% នៃធ្មេញនីមួយៗ ការប្រើខ្សែទន្តពេទ្យគ្របដណ្តប់ ៤០% ដែលនៅសល់។ រលាកអញ្ចាញធ្មេញធ្ងន់ធ្ងរ មានទំនាក់ទំនងផ្ទាល់នឹងការឆ្លងបេះដូង និងជំងឺសរសៃឈាមបេះដូង។",
  keywordsEn: [
    "teeth", "tooth", "brush", "brushing", "toothbrush", "toothpaste",
    "floss", "flossing", "dental floss",
    "plaque", "cavities", "cavity", "tooth decay", "decay", "enamel",
    "gum disease", "gingivitis", "periodontitis", "gums",
    "oral hygiene", "oral health", "dental health",
    "bacteria", "acid", "sugar",
    "heart", "cardiovascular", "endocarditis",
    "daily defense", "two minutes",
  ],
  keywordsKh: [
    "ធ្មេញ", "ដុសធ្មេញ", "ច្រាសដុសធ្មេញ", "ថ្នាំដុសធ្មេញ",
    "ខ្សែទន្តពេទ្យ", "ខ្សែដុសធ្មេញ",
    "បាក់តេរីធ្មេញ", "ប្រហោងធ្មេញ", "ថ្នាំងធ្មេញ",
    "រលាកអញ្ចាញធ្មេញ", "អញ្ចាញធ្មេញ",
    "អនាម័យមាត់", "សុខភាពមាត់",
    "បាក់តេរី", "អាស៊ីត", "ស្ករ",
    "បេះដូង", "សរសៃឈាមបេះដូង",
    "ការការពារប្រចាំថ្ងៃ",
  ],
};
