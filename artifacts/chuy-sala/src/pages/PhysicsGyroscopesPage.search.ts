import { Cog } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

export const searchMeta: SearchEntry = {
  id: "physics-gyroscopes",
  type: "page",
  href: "/physics/gyroscopes",
  icon: Cog,
  titleEn: "Gyroscopes & Angular Momentum",
  titleKh: "ហ្គីរ៉ូស្កុប និងម៉ូម៉ង់មុំ",
  categoryEn: "Physics",
  categoryKh: "រូបវិទ្យា",
  descEn:
    "Why a spinning top stays upright, how phones know which way is up, and the physics of angular momentum — from bicycle wheels to the Hubble Space Telescope.",
  descKh:
    "ហេតុអ្វីកំពូលវិលនៅឈរ របៀបដែលទូរស័ព្ទដឹងថាខាងណាគឺឡើងលើ និងរូបវិទ្យានៃម៉ូម៉ង់មុំ — ពីកង់កង់ ដល់កែវយឹតអវកាស Hubble។",
  keywordsEn: [
    "gyroscope", "gyro", "angular momentum", "spinning top",
    "precession", "rotation", "MEMS", "phone sensor",
    "stabilizer", "bicycle wheel physics",
  ],
  keywordsKh: [
    "ហ្គីរ៉ូស្កុប", "ម៉ូម៉ង់មុំ", "កំពូលវិល",
    "ការវិលជុំ", "ឧបករណ៍រកស្ថេរភាព",
  ],
};
