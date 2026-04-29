import { Wrench } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

export const searchMeta: SearchEntry = {
  id: "tech-bridges",
  type: "page",
  href: "/technology/bridges",
  icon: Wrench,
  titleEn: "Bridges — Engineering That Spans Rivers",
  titleKh: "ស្ពាន — វិស្វកម្មដែលឆ្លងកាត់ទន្លេ",
  categoryEn: "Technology",
  categoryKh: "បច្ចេកវិទ្យា",
  descEn:
    "Beam, arch, truss, suspension, cable-stayed — how each bridge type carries weight, why some collapse, and the famous bridges of the world.",
  descKh:
    "ស្ពានធ្នឹម ស្ពានធ្នូ ស្ពានរនុក ស្ពានចង និងស្ពានខ្សែ — របៀបដែលប្រភេទស្ពាននីមួយៗទ្រទម្ងន់ ហេតុអ្វីខ្លះរលំ និងស្ពានដ៏ល្បីៗរបស់ពិភពលោក។",
  keywordsEn: [
    "bridges", "bridge", "civil engineering", "beam bridge",
    "arch bridge", "truss bridge", "suspension bridge",
    "cable stayed bridge", "tacoma narrows", "golden gate",
    "structural engineering", "loads",
  ],
  keywordsKh: [
    "ស្ពាន", "វិស្វកម្មសុីវិល", "ស្ពានធ្នឹម",
    "ស្ពានធ្នូ", "ស្ពានចង", "រចនាសម្ព័ន្ធ",
  ],
};
