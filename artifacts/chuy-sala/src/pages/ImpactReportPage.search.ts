import { TrendingUp } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

export const searchMeta: SearchEntry = {
  id: "impact-report",
  type: "page",
  href: "/impact",
  icon: TrendingUp,
  titleEn: "Impact Report",
  titleKh: "របាយការណ៍ផលប៉ះពាល់",
  categoryEn: "Platform",
  categoryKh: "វេទិកា",
  descEn:
    "See how your contributions are helping Cambodian students — schools reached, projects completed, and the lives changed by donor-funded learning.",
  descKh:
    "ឃើញពីរបៀបដែលការរួមចំណែករបស់អ្នកជួយសិស្សកម្ពុជា — សាលាដែលបានទទួល គម្រោងដែលបានបញ្ចប់ និងជីវិតដែលបានផ្លាស់ប្ដូរ។",
  keywordsEn: [
    "impact", "impact report", "results", "stats",
    "donations", "donors", "schools helped", "outcomes",
    "transparency", "annual report",
  ],
  keywordsKh: [
    "ផលប៉ះពាល់", "របាយការណ៍", "លទ្ធផល", "ស្ថិតិ",
    "ការបរិច្ចាគ", "តម្លាភាព",
  ],
};
