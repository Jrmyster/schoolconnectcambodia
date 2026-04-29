import { Zap } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

export const searchMeta: SearchEntry = {
  id: "kids-electronics",
  type: "page",
  href: "/kids/electronics",
  icon: Zap,
  titleEn: "Kids · Electronics for Beginners",
  titleKh: "ក្មេងៗ · អេឡិចត្រូនិចសម្រាប់អ្នកចាប់ផ្ដើម",
  categoryEn: "For Kids",
  categoryKh: "សម្រាប់ក្មេង",
  descEn:
    "What is a battery? What does a wire do? Light up an LED, build a buzzer circuit, and meet electricity for the first time — safely and visually.",
  descKh:
    "តើថ្មគឺជាអ្វី? តើខ្សែភ្លើងធ្វើអ្វី? បំភ្លឺ LED បង្កើតសៀគ្វីរន្ទា ហើយជួបជាមួយចរន្តអគ្គិសនីលើកដំបូង — ដោយសុវត្ថិភាព និងតាមរូបភាព។",
  keywordsEn: [
    "electronics", "kids electronics", "circuit", "circuits",
    "battery", "wire", "LED", "buzzer", "switch",
    "voltage", "current", "beginner electronics",
  ],
  keywordsKh: [
    "អេឡិចត្រូនិច", "សៀគ្វី", "ថ្ម", "ខ្សែភ្លើង",
    "LED", "កុងតាក់", "តង់ស្យុង", "ចរន្ត",
  ],
};
