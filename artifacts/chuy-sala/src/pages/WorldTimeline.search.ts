import { History } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

export const searchMeta: SearchEntry = {
  id: "study-center-world-timeline",
  type: "page",
  href: "/study-center/world-timeline",
  icon: History,
  titleEn: "The World Timeline",
  titleKh: "បន្ទាត់ពេលវេលាពិភពលោក",
  categoryEn: "Study Center",
  categoryKh: "មជ្ឈមណ្ឌលសិក្សា",
  descEn:
    "Walk through every major event in human history — from prehistory to the present, filtered by era, region, and theme.",
  descKh:
    "ដើរកាត់រាល់ព្រឹត្តិការណ៍សំខាន់ក្នុងប្រវត្តិសាស្ត្រមនុស្ស — ពីបុរេប្រវត្តិដល់បច្ចុប្បន្ន ច្រោះតាមយុគ តំបន់ និងប្រធានបទ។",
  keywordsEn: [
    "timeline", "world timeline", "history", "world history",
    "events", "era", "eras", "ancient", "medieval", "modern",
    "prehistory", "antiquity", "renaissance", "industrial revolution",
    "world war", "wwi", "wwii", "20th century", "21st century",
    "civilizations", "empires", "rome", "greece", "egypt", "china",
    "chronology", "dates",
  ],
  keywordsKh: [
    "បន្ទាត់ពេលវេលា", "ប្រវត្តិសាស្ត្រ", "ប្រវត្តិសាស្ត្រពិភពលោក",
    "ព្រឹត្តិការណ៍", "យុគ", "យុគបុរាណ", "យុគមធ្យម", "យុគទំនើប",
    "បុរេប្រវត្តិ", "សង្គ្រាមលោក", "សតវត្សទី២០", "សតវត្សទី២១",
    "អារ្យធម៌", "ចក្រភព",
  ],
};
