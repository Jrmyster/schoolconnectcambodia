import { Atom } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

/**
 * Co-located global-search entry for the new
 * "Moving Humanity: From Stairs to Teleportation" page under Study Center.
 * Auto-discovered by src/data/searchAutoIndex.ts via the *.search.ts glob.
 */
export const searchMeta: SearchEntry = {
  id: "study-moving-humanity",
  type: "page",
  href: "/study-center/moving-humanity",
  icon: Atom,
  titleEn: "Moving Humanity: From Stairs to Teleportation",
  titleKh: "ចលនាមនុស្សជាតិ៖ ពីជណ្ដើរ ដល់ការបញ្ជូនរូបធាតុ",
  categoryEn: "Study Center · Physics & Technology",
  categoryKh: "មជ្ឈមណ្ឌលសិក្សា · រូបវិទ្យា និងបច្ចេកវិទ្យា",
  descEn:
    "From the inclined-plane physics of stairs and the elevator's hidden counterweight to the genius of continuous-motion escalators — and finally the real science (and philosophical paradox) of quantum teleportation.",
  descKh:
    "ពី​រូបវិទ្យា​ផ្ទៃ​ជម្រាល​នៃ​ជណ្ដើរ និង​ទម្ងន់​ផ្ទុយ​លាក់​នៃ​ជណ្ដើរយន្ត​ប្រអប់ ដល់​ភាព​ប៉ិន​ប្រសប់​នៃ​ជណ្ដើរយន្ត​រំកិល​ចលនា​បន្ត — និង​ចុង​ក្រោយ វិទ្យាសាស្ត្រ​ពិត​ប្រាកដ (និង​ភាព​ផ្ទុយ​គ្នា​ផ្នែក​ទស្សនវិជ្ជា) នៃ​ការ​បញ្ជូន​រូបធាតុ​កង់ទិច។",
  keywordsEn: [
    "stairs", "staircase", "step", "steps", "inclined plane", "ramp",
    "elevator", "lift", "counterweight", "Otis", "skyscraper",
    "escalator", "transveyor", "moving walkway", "continuous motion transit", "conveyor",
    "teleportation", "teleport", "quantum teleportation", "quantum",
    "quantum mechanics", "no-cloning theorem", "photon", "atom",
    "Caltech 1998", "physics of transport", "vertical transport",
    "futuristic transport", "consciousness", "personal identity",
    "philosophical question", "Bennett", "Caltech",
  ],
  keywordsKh: [
    "ជណ្ដើរ", "ផ្ទៃជម្រាល", "ផ្លូវឡើងជម្រាល",
    "ជណ្ដើរយន្ត", "ជណ្ដើរយន្តប្រអប់", "ទម្ងន់ផ្ទុយ",
    "ជណ្ដើរយន្តរំកិល", "ផ្លូវដើររំកិល", "ខ្សែដឹក",
    "ការបញ្ជូនរូបធាតុ", "ការបញ្ជូនរូបធាតុកង់ទិច", "កង់ទិច",
    "មេកានិចកង់ទិច", "ភូតុង", "អាតូម", "ការដឹកជញ្ជូន",
    "រូបវិទ្យា", "បច្ចេកវិទ្យាអនាគត", "ការដឹកបញ្ឈរ",
    "ស្មារតី", "អត្តសញ្ញាណផ្ទាល់ខ្លួន", "សំណួរទស្សនវិជ្ជា",
    "Otis", "Caltech", "ច្បាប់ចម្លង",
  ],
};
