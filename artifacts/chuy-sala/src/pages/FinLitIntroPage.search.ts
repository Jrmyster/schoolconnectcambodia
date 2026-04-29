import { DollarSign } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

export const searchMeta: SearchEntry = {
  id: "finlit-intro",
  type: "page",
  href: "/finlit-intro",
  icon: DollarSign,
  titleEn: "Financial Literacy — Money Basics",
  titleKh: "អក្ខរកម្មហិរញ្ញវត្ថុ — មូលដ្ឋានគ្រឹះអំពីប្រាក់",
  categoryEn: "Career",
  categoryKh: "អាជីព",
  descEn:
    "Earning, saving, budgeting, interest, and how to think about money — the everyday financial skills schools rarely teach.",
  descKh:
    "ការរកប្រាក់ ការសន្សំ ការធ្វើថវិកា ការប្រាក់ និងវិធីគិតអំពីប្រាក់ — ជំនាញហិរញ្ញវត្ថុប្រចាំថ្ងៃ ដែលសាលារៀនកម្រណាត់បង្រៀន។",
  keywordsEn: [
    "money", "finance", "financial", "financial literacy",
    "budget", "budgeting", "savings", "save", "interest",
    "loan", "loans", "debt", "credit", "earning", "income",
    "expenses", "personal finance", "bank", "banking",
  ],
  keywordsKh: [
    "ប្រាក់", "ហិរញ្ញវត្ថុ", "អក្ខរកម្មហិរញ្ញវត្ថុ",
    "ថវិកា", "ការសន្សំ", "ការប្រាក់", "បំណុល",
    "ឥណទាន", "ប្រាក់ចំណូល", "ធនាគារ",
  ],
};
