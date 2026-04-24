import { Brain } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

/**
 * Deep-link entry: clicking this in the global search routes the user
 * to /study-center/philosophy and auto-opens the Mind branch (handled
 * by the hash-aware effect in PhilosophyMap.tsx).
 */
export const searchMeta: SearchEntry = {
  id: "philosophy-free-will-determinism",
  href: "/study-center/philosophy#free-will-vs-determinism-title",
  icon: Brain,
  titleEn: "Free Will vs. Determinism",
  titleKh: "ឆន្ទៈសេរី ទល់នឹង ទ្រឹស្ដីកំណត់និយម",
  categoryEn: "Philosophy",
  categoryKh: "ទស្សនវិជ្ជា",
  descEn:
    "Philosophy of Mind: a duel between the warm human feeling that 'I choose' and the cold physics view that every choice was already written by atoms — plus what neuroscience (Libet's experiment) actually says about consciousness and decision.",
  descKh:
    "ទស្សនវិជ្ជានៃចិត្ត៖ ការប្រកួតរវាងអារម្មណ៍មនុស្សដ៏កក់ក្តៅថា «ខ្ញុំជ្រើសរើស» និងទស្សនៈរូបវិទ្យាដ៏ត្រជាក់ថា គ្រប់ការជ្រើសរើសត្រូវបានសរសេររួចហើយដោយអូដ្ឋាតូម — ព្រមទាំងអ្វីដែលប្រសាទវិទ្យា (ការពិសោធន៍ Libet) និយាយពិតៗអំពីស្មារតី និងការសម្រេចចិត្ត។",
  keywordsEn: [
    "free will", "freewill", "determinism", "philosophy of mind",
    "consciousness", "choice", "libet", "compatibilism", "agency",
    "neuroscience", "mind", "brain", "self", "soul", "decision", "fate",
  ],
  keywordsKh: [
    "ឆន្ទៈសេរី", "ទ្រឹស្ដីកំណត់និយម", "ទស្សនវិជ្ជានៃចិត្ត", "ស្មារតី",
    "ចិត្ត", "ខួរក្បាល", "ជ្រើសរើស", "សម្រេចចិត្ត", "វាសនា",
  ],
  type: "module",
};
