import { Users } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

export const searchMeta: SearchEntry = {
  id: "kids-community",
  type: "page",
  href: "/kids/community",
  icon: Users,
  titleEn: "Kids · Community Helpers",
  titleKh: "ក្មេងៗ · អ្នកជួយសហគមន៍",
  categoryEn: "For Kids",
  categoryKh: "សម្រាប់ក្មេង",
  descEn:
    "Doctors, teachers, farmers, monks, police, market vendors — meet the people who keep a Cambodian community running and learn what each of them does.",
  descKh:
    "គ្រូពេទ្យ គ្រូបង្រៀន កសិករ ព្រះសង្ឃ ប៉ូលីស អ្នកលក់ក្នុងផ្សារ — ស្គាល់មនុស្សដែលធ្វើឲ្យសហគមន៍កម្ពុជាដំណើរការ ហើយរៀនអ្វីដែលនីមួយៗធ្វើ។",
  keywordsEn: [
    "community", "community helpers", "kids community",
    "jobs", "occupations", "doctor", "teacher", "farmer",
    "police", "monk", "neighbours", "village",
  ],
  keywordsKh: [
    "សហគមន៍", "អ្នកជួយសហគមន៍", "មុខរបរ", "គ្រូពេទ្យ",
    "គ្រូបង្រៀន", "កសិករ", "ព្រះសង្ឃ", "ប៉ូលីស", "ភូមិ",
  ],
};
