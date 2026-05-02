import { Biohazard } from "lucide-react";
import type { SearchEntry } from "@/data/searchTypes";

/**
 * Co-located global-search entry for the new
 * "Pandemics & Triumphs: The History of Disease" page under Study Center.
 * Auto-discovered by src/data/searchAutoIndex.ts via the *.search.ts glob.
 */
export const searchMeta: SearchEntry = {
  id: "study-pandemics-history",
  type: "page",
  href: "/study-center/pandemics-history",
  icon: Biohazard,
  titleEn: "Pandemics & Triumphs: The History of Disease",
  titleKh: "ជំងឺរាតត្បាត និងជ័យជម្នះ៖ ប្រវត្តិសាស្ត្រនៃជំងឺ",
  categoryEn: "Study Center · Medical History",
  categoryKh: "មជ្ឈមណ្ឌលសិក្សា · ប្រវត្តិវេជ្ជសាស្ត្រ",
  descEn:
    "From the Biblical plagues and the Black Death to Yellow Fever, Influenza, Polio — and the WHO eradication of Smallpox, the only human disease ever wiped out forever.",
  descKh:
    "ពី​ជំងឺ​រាតត្បាត​ក្នុង​ព្រះ​គម្ពីរ និង​ជំងឺ​ប៉េស្ត ដល់​ជំងឺ​គ្រុន​លឿង ផ្ដាសាយ ស្វិត​ដៃ​ជើង — និង​ការ​លុប​បំបាត់​ជំងឺ​អុត​ធំ​ដោយ WHO ដែល​ជា​ជំងឺ​មនុស្ស​តែ​មួយ​គត់​ដែល​ត្រូវ​បាន​លុប​បំបាត់​ជា​រៀង​រហូត។",
  keywordsEn: [
    "pandemic", "pandemics", "disease history", "history of disease",
    "vaccine", "vaccines", "vaccination", "immunization",
    "plague", "plagues", "black death", "biblical plagues",
    "smallpox", "polio", "yellow fever", "influenza", "spanish flu",
    "leprosy", "hansen disease", "cholera", "sanitation",
    "epidemic", "outbreak", "WHO", "world health organization",
    "antibiotics", "virus", "bacteria", "microbiology",
    "yersinia pestis", "buboes", "ali maow maalin",
    "salk", "sabin", "eradication", "ring vaccination",
    "medical history", "public health",
  ],
  keywordsKh: [
    "ជំងឺរាតត្បាត", "ប្រវត្តិសាស្ត្រនៃជំងឺ", "វ៉ាក់សាំង",
    "ការចាក់វ៉ាក់សាំង", "ភាពស៊ាំ", "ជំងឺប៉េស្ត",
    "ជំងឺអុតធំ", "ជំងឺស្វិតដៃជើង", "ជំងឺគ្រុនលឿង",
    "ជំងឺផ្ដាសាយ", "ផ្ដាសាយអេស្ប៉ាញ", "ជំងឺឃ្លង់",
    "ជំងឺអាសន្នរោគ", "អនាម័យ", "ការផ្ទុះ", "ជំងឺរាតត្បាតធំ",
    "WHO", "អង្គការសុខភាពពិភពលោក", "ថ្នាំអង់ទីប៊ីយ៉ូទិច",
    "វីរុស", "បាក់តេរី", "មីក្រូជីវវិទ្យា",
    "ការលុបបំបាត់", "ប្រវត្តិវេជ្ជសាស្ត្រ", "សុខភាពសាធារណៈ",
    "ជំងឺរាតត្បាតក្នុងព្រះគម្ពីរ", "មូស",
  ],
};
