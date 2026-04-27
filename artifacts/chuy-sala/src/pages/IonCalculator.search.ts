import { Calculator } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

export const searchMeta: SearchEntry = {
  id: "chemistry-ion-calculator",
  type: "page",
  href: "/chemistry/ion-calculator",
  icon: Calculator,
  titleEn: "Ion & Oxidation Number Calculator",
  titleKh: "ម៉ាស៊ីនគណនាអ៊ីយ៉ុង និងលេខអុកស៊ីដាស្យូន",
  categoryEn: "Chemistry",
  categoryKh: "គីមីវិទ្យា",
  descEn:
    "Look up cations, anions, polyatomic ions, and oxidation states for any element — with instant balanced-formula examples.",
  descKh:
    "ស្វែងរកកាទីយ៉ុង អានីយ៉ុង អ៊ីយ៉ុងពហុអាតូម និងស្ថានភាពអុកស៊ីដាស្យូនសម្រាប់ធាតុណាមួយ — ជាមួយឧទាហរណ៍រូបមន្តតុល្យភាពភ្លាមៗ។",
  keywordsEn: [
    "ion", "ions", "ionic", "cation", "anion", "polyatomic",
    "oxidation", "oxidation number", "oxidation state", "redox",
    "charge", "valence", "valency", "electron transfer",
    "calculator", "chemistry calculator",
    "sodium", "chloride", "sulfate", "nitrate", "phosphate", "ammonium",
    "balanced formula", "ionic compound", "salt formula",
  ],
  keywordsKh: [
    "អ៊ីយ៉ុង", "កាទីយ៉ុង", "អានីយ៉ុង", "អ៊ីយ៉ុងពហុអាតូម",
    "អុកស៊ីដាស្យូន", "លេខអុកស៊ីដាស្យូន", "ស្ថានភាពអុកស៊ីដាស្យូន",
    "បន្ទុក", "វ៉ាឡង់", "ម៉ាស៊ីនគណនា", "គីមីវិទ្យា",
    "សូដ្យូម", "ក្លរ៉ូ", "សុលផាត", "នីត្រាត",
  ],
};
