import { useMemo, useState } from "react";
import {
  Search,
  GraduationCap,
  Globe2,
  Award,
  ExternalLink,
  Sparkles,
  MapPin,
  BookMarked,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ──────────────────────────────────────────────────────────────────────────────
   Palette — kept inline for maximum portability:
     OXBLOOD  #7C1D1D   primary accent (deep academic red)
     OXBLOOD2 #5C1212   shadow / hover
     PARCH    #FAF5E6   parchment background
     PARCH2   #F2EAD0   parchment border / wash
     GOLD     #B8860B   institutional gold
     GOLD2    #E6C667   gold highlight
     INK      #2D1810   primary text
     SUBINK   #5C4632   secondary text
   ────────────────────────────────────────────────────────────────────────── */

type Scholarship = {
  key: string;
  flag: string;
  nameEn: string;
  nameKh: string;
  countryEn: string;
  countryKh: string;
  focusEn: string;
  focusKh: string;
  descEn: string;
  descKh: string;
  url: string;
};

const SCHOLARSHIPS: Scholarship[] = [
  {
    key: "australia-awards",
    flag: "🇦🇺",
    nameEn: "Australia Awards",
    nameKh: "អាហារូបករណ៍ប្រទេសអូស្ត្រាលី",
    countryEn: "Australia",
    countryKh: "អូស្ត្រាលី",
    focusEn: "Development, Engineering & Public Health",
    focusKh: "ការអភិវឌ្ឍ វិស្វកម្ម និងសុខភាពសាធារណៈ",
    descEn:
      "Fully-funded postgraduate scholarships for Cambodian students, prioritising fields that contribute to Cambodia's national development — including engineering, public health, governance, and rural development. Recipients return home to apply their skills.",
    descKh:
      "អាហារូបករណ៍ក្រោយឧត្តមសិក្សាដែលមានការឧបត្ថម្ភពេញលេញសម្រាប់និស្សិតខ្មែរ ដោយផ្តោតលើផ្នែកដែលរួមចំណែកដល់ការអភិវឌ្ឍន៍ប្រទេស — រួមមានវិស្វកម្ម សុខភាពសាធារណៈ អភិបាលកិច្ច និងការអភិវឌ្ឍន៍ជនបទ។ អ្នកទទួលត្រូវត្រឡប់មកប្រទេសវិញ ដើម្បីប្រើជំនាញរបស់ខ្លួន។",
    url: "https://australiaawardscambodia.org/",
  },
  {
    key: "mext",
    flag: "🇯🇵",
    nameEn: "MEXT Scholarship",
    nameKh: "អាហារូបករណ៍រដ្ឋាភិបាលជប៉ុន",
    countryEn: "Japan",
    countryKh: "ជប៉ុន",
    focusEn: "STEM, Humanities & Research",
    focusKh: "វិទ្យាសាស្ត្រ-បច្ចេកវិទ្យា មនុស្សសាស្ត្រ និងស្រាវជ្រាវ",
    descEn:
      "Japan's premier government scholarship covers tuition, monthly stipend, and round-trip airfare for undergraduate, master's, and PhD study at Japanese universities. Strong tracks in engineering, robotics, medicine, and Japanese studies.",
    descKh:
      "អាហារូបករណ៍រដ្ឋាភិបាលជប៉ុនដ៏ល្បីបំផុត ដែលគ្របដណ្តប់ថ្លៃសិក្សា ប្រាក់ឧបត្ថម្ភប្រចាំខែ និងសំបុត្រយន្តហោះទៅ-មកសម្រាប់សិក្សាបរិញ្ញាបត្រ បរិញ្ញាបត្រជាន់ខ្ពស់ និងបណ្ឌិតនៅសាកលវិទ្យាល័យជប៉ុន។ មានកម្មវិធីខ្លាំងផ្នែកវិស្វកម្ម មនុស្សយន្ត វេជ្ជសាស្ត្រ និងសិក្សាជប៉ុន។",
    url: "https://www.kh.emb-japan.go.jp/itpr_en/jis_mext.html",
  },
  {
    key: "chevening",
    flag: "🇬🇧",
    nameEn: "Chevening Scholarship",
    nameKh: "អាហារូបករណ៍ចក្រភពអង់គ្លេស",
    countryEn: "United Kingdom",
    countryKh: "ចក្រភពអង់គ្លេស",
    focusEn: "Future Leaders & Policy-Makers",
    focusKh: "អ្នកដឹកនាំ និងអ្នកបង្កើតគោលនយោបាយនៃអនាគត",
    descEn:
      "The UK Foreign Office's flagship award funds one full master's degree at any UK university for emerging leaders. Strong tracks in public policy, international relations, law, journalism, and development.",
    descKh:
      "ពានរង្វាន់ឈានមុខគេរបស់ក្រសួងការបរទេសចក្រភពអង់គ្លេស ផ្តល់មូលនិធិសម្រាប់បរិញ្ញាបត្រជាន់ខ្ពស់ពេញមួយវគ្គនៅសាកលវិទ្យាល័យអង់គ្លេសណាមួយ សម្រាប់អ្នកដឹកនាំជំនាន់ថ្មី។ មានកម្មវិធីខ្លាំងផ្នែកគោលនយោបាយសាធារណៈ ទំនាក់ទំនងអន្តរជាតិ ច្បាប់ សារព័ត៌មាន និងការអភិវឌ្ឍ។",
    url: "https://www.chevening.org/scholarship/cambodia/",
  },
  {
    key: "fulbright",
    flag: "🇺🇸",
    nameEn: "Fulbright Program",
    nameKh: "អាហារូបករណ៍សហរដ្ឋអាមេរិក",
    countryEn: "United States",
    countryKh: "សហរដ្ឋអាមេរិក",
    focusEn: "Advanced Degrees & Cultural Exchange",
    focusKh: "សញ្ញាបត្រកម្រិតខ្ពស់ និងការផ្លាស់ប្ដូរវប្បធម៌",
    descEn:
      "The U.S. government's flagship international exchange program, funding master's and PhD study at American universities. Open across all academic fields and combines rigorous study with intentional cultural exchange.",
    descKh:
      "កម្មវិធីផ្លាស់ប្ដូរអន្តរជាតិឈានមុខគេរបស់រដ្ឋាភិបាលអាមេរិក ផ្តល់មូលនិធិសម្រាប់សិក្សាបរិញ្ញាបត្រជាន់ខ្ពស់ និងបណ្ឌិតនៅសាកលវិទ្យាល័យអាមេរិក។ បើកសម្រាប់គ្រប់ផ្នែកសិក្សា និងរួមបញ្ចូលការសិក្សាហ្មត់ចត់ជាមួយការផ្លាស់ប្ដូរវប្បធម៌។",
    url: "https://kh.usembassy.gov/education-culture/fulbright-program/",
  },
  {
    key: "cgs",
    flag: "🇨🇳",
    nameEn: "Chinese Government Scholarship (CGS)",
    nameKh: "អាហារូបករណ៍រដ្ឋាភិបាលចិន",
    countryEn: "China",
    countryKh: "ចិន",
    focusEn: "Engineering, Medicine & Technology",
    focusKh: "វិស្វកម្ម វេជ្ជសាស្ត្រ និងបច្ចេកវិទ្យា",
    descEn:
      "Extensive scholarship system administered by the China Scholarship Council, opening more than 270 Chinese universities to international students at undergraduate, master's, and PhD level. Particularly deep options in engineering, medicine, AI, and emerging tech.",
    descKh:
      "ប្រព័ន្ធអាហារូបករណ៍ដ៏ទូលំទូលាយដែលគ្រប់គ្រងដោយក្រុមប្រឹក្សាអាហារូបករណ៍ចិន បើកសាកលវិទ្យាល័យជាង ២៧០ ដល់និស្សិតអន្តរជាតិកម្រិតបរិញ្ញាបត្រ បរិញ្ញាបត្រជាន់ខ្ពស់ និងបណ្ឌិត។ មានជម្រើសខ្លាំងជាពិសេសផ្នែកវិស្វកម្ម វេជ្ជសាស្ត្រ បញ្ញាសិប្បនិម្មិត និងបច្ចេកវិទ្យាថ្មីៗ។",
    url: "https://www.campuschina.org/",
  },
];

/* ──────────────────────────────────────────────────────────────────────────────
   University Directory — 200 famous global institutions, organised by region.
   Specialty is bilingual via a tiny lookup so the dataset stays compact.
   ────────────────────────────────────────────────────────────────────────── */

type Region = "usa" | "europe" | "china" | "japan" | "oceania";

type SpecialtyKey =
  | "engineering" | "technology" | "sciences" | "humanities" | "liberalarts"
  | "medicine" | "law" | "business" | "economics" | "arts" | "design"
  | "music" | "film" | "mathematics" | "agriculture" | "publichealth"
  | "aerospace" | "architecture" | "computerscience" | "internationalrelations"
  | "politics" | "education" | "pharmacy" | "physics" | "mining"
  | "marinescience" | "linguistics" | "hospitality" | "journalism"
  | "foreignservice" | "pacificstudies";

const SPECIALTY: Record<SpecialtyKey, { en: string; kh: string }> = {
  engineering:            { en: "Engineering",             kh: "វិស្វកម្ម" },
  technology:             { en: "Technology",              kh: "បច្ចេកវិទ្យា" },
  sciences:               { en: "Sciences",                kh: "វិទ្យាសាស្ត្រ" },
  humanities:             { en: "Humanities",              kh: "មនុស្សសាស្ត្រ" },
  liberalarts:            { en: "Liberal Arts",            kh: "សិល្បៈសេរី" },
  medicine:               { en: "Medicine",                kh: "វេជ្ជសាស្ត្រ" },
  law:                    { en: "Law",                     kh: "ច្បាប់" },
  business:               { en: "Business",                kh: "ពាណិជ្ជកម្ម" },
  economics:              { en: "Economics",               kh: "សេដ្ឋកិច្ច" },
  arts:                   { en: "Arts",                    kh: "សិល្បៈ" },
  design:                 { en: "Design",                  kh: "រចនា" },
  music:                  { en: "Music",                   kh: "តន្ត្រី" },
  film:                   { en: "Film",                    kh: "ភាពយន្ត" },
  mathematics:            { en: "Mathematics",             kh: "គណិតវិទ្យា" },
  agriculture:            { en: "Agriculture",             kh: "កសិកម្ម" },
  publichealth:           { en: "Public Health",           kh: "សុខភាពសាធារណៈ" },
  aerospace:              { en: "Aerospace Engineering",   kh: "វិស្វកម្មអវកាស" },
  architecture:           { en: "Architecture",            kh: "ស្ថាបត្យកម្ម" },
  computerscience:        { en: "Computer Science",        kh: "វិទ្យាសាស្ត្រកុំព្យូទ័រ" },
  internationalrelations: { en: "International Relations", kh: "ទំនាក់ទំនងអន្តរជាតិ" },
  politics:               { en: "Politics & Policy",       kh: "នយោបាយ" },
  education:              { en: "Education",               kh: "អប់រំ" },
  pharmacy:               { en: "Pharmacy",                kh: "ឱសថសាស្ត្រ" },
  physics:                { en: "Physics",                 kh: "រូបវិទ្យា" },
  mining:                 { en: "Mining Engineering",      kh: "វិស្វកម្មរ៉ែ" },
  marinescience:          { en: "Marine Sciences",         kh: "វិទ្យាសាស្ត្រសមុទ្រ" },
  linguistics:            { en: "Linguistics",             kh: "ភាសាវិទ្យា" },
  hospitality:            { en: "Hospitality",             kh: "សេវាបដិសណ្ឋារកិច្ច" },
  journalism:             { en: "Journalism",              kh: "សារព័ត៌មាន" },
  foreignservice:         { en: "Foreign Service",         kh: "សេវាការទូត" },
  pacificstudies:         { en: "Pacific Studies",         kh: "ការសិក្សាប៉ាស៊ីហ្វិក" },
};

const REGIONS: Array<{ id: Region | "all"; en: string; kh: string }> = [
  { id: "all",     en: "All Regions",         kh: "តំបន់ទាំងអស់" },
  { id: "usa",     en: "United States",       kh: "សហរដ្ឋអាមេរិក" },
  { id: "europe",  en: "Europe",              kh: "អឺរ៉ុប" },
  { id: "china",   en: "China",               kh: "ចិន" },
  { id: "japan",   en: "Japan",               kh: "ជប៉ុន" },
  { id: "oceania", en: "Australia / Oceania", kh: "អូស្ត្រាលី" },
];

type University = {
  name: string;
  countryEn: string;
  countryKh: string;
  region: Region;
  specialty: SpecialtyKey;
};

const UNIVERSITIES: University[] = [
  // ─── United States (50) ────────────────────────────────────────────────────
  { name: "Massachusetts Institute of Technology (MIT)", countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "engineering" },
  { name: "Stanford University",                          countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "computerscience" },
  { name: "Harvard University",                           countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "liberalarts" },
  { name: "Yale University",                              countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "law" },
  { name: "Princeton University",                         countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "mathematics" },
  { name: "California Institute of Technology (Caltech)", countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "physics" },
  { name: "Columbia University",                          countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "journalism" },
  { name: "University of Chicago",                        countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "economics" },
  { name: "University of Pennsylvania",                   countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "business" },
  { name: "Cornell University",                           countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "agriculture" },
  { name: "Johns Hopkins University",                     countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "medicine" },
  { name: "Northwestern University",                      countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "journalism" },
  { name: "Duke University",                              countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "medicine" },
  { name: "UC Berkeley",                                  countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "engineering" },
  { name: "UCLA",                                         countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "film" },
  { name: "Brown University",                             countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "liberalarts" },
  { name: "Dartmouth College",                            countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "business" },
  { name: "Vanderbilt University",                        countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "medicine" },
  { name: "Rice University",                              countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "engineering" },
  { name: "University of Notre Dame",                     countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "business" },
  { name: "Washington University in St. Louis",           countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "medicine" },
  { name: "Emory University",                             countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "publichealth" },
  { name: "Georgetown University",                        countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "foreignservice" },
  { name: "Carnegie Mellon University",                   countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "computerscience" },
  { name: "New York University (NYU)",                    countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "arts" },
  { name: "University of Michigan, Ann Arbor",            countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "engineering" },
  { name: "University of Virginia",                       countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "law" },
  { name: "UNC Chapel Hill",                              countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "publichealth" },
  { name: "University of Southern California (USC)",      countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "film" },
  { name: "Tufts University",                             countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "internationalrelations" },
  { name: "UC San Diego",                                 countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "sciences" },
  { name: "UT Austin",                                    countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "engineering" },
  { name: "University of Wisconsin–Madison",              countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "sciences" },
  { name: "University of Illinois Urbana-Champaign",      countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "engineering" },
  { name: "Boston University",                            countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "journalism" },
  { name: "Boston College",                               countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "business" },
  { name: "Georgia Tech",                                 countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "engineering" },
  { name: "Purdue University",                            countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "engineering" },
  { name: "UC Davis",                                     countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "agriculture" },
  { name: "UC Irvine",                                    countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "sciences" },
  { name: "Penn State University",                        countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "engineering" },
  { name: "Ohio State University",                        countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "business" },
  { name: "University of Florida",                        countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "sciences" },
  { name: "University of Washington, Seattle",            countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "computerscience" },
  { name: "University of Maryland, College Park",         countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "politics" },
  { name: "University of Pittsburgh",                     countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "medicine" },
  { name: "University of Minnesota",                      countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "sciences" },
  { name: "University of Rochester",                      countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "music" },
  { name: "Case Western Reserve University",              countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "engineering" },
  { name: "Tulane University",                            countryEn: "USA", countryKh: "សហរដ្ឋអាមេរិក", region: "usa", specialty: "publichealth" },

  // ─── Europe (60) ──────────────────────────────────────────────────────────
  { name: "University of Oxford",                         countryEn: "UK",          countryKh: "ចក្រភពអង់គ្លេស", region: "europe", specialty: "humanities" },
  { name: "University of Cambridge",                      countryEn: "UK",          countryKh: "ចក្រភពអង់គ្លេស", region: "europe", specialty: "sciences" },
  { name: "Imperial College London",                      countryEn: "UK",          countryKh: "ចក្រភពអង់គ្លេស", region: "europe", specialty: "engineering" },
  { name: "University College London (UCL)",              countryEn: "UK",          countryKh: "ចក្រភពអង់គ្លេស", region: "europe", specialty: "sciences" },
  { name: "London School of Economics (LSE)",             countryEn: "UK",          countryKh: "ចក្រភពអង់គ្លេស", region: "europe", specialty: "economics" },
  { name: "University of Edinburgh",                      countryEn: "UK",          countryKh: "ចក្រភពអង់គ្លេស", region: "europe", specialty: "medicine" },
  { name: "King's College London",                        countryEn: "UK",          countryKh: "ចក្រភពអង់គ្លេស", region: "europe", specialty: "medicine" },
  { name: "University of Manchester",                     countryEn: "UK",          countryKh: "ចក្រភពអង់គ្លេស", region: "europe", specialty: "engineering" },
  { name: "University of Warwick",                        countryEn: "UK",          countryKh: "ចក្រភពអង់គ្លេស", region: "europe", specialty: "mathematics" },
  { name: "University of Bristol",                        countryEn: "UK",          countryKh: "ចក្រភពអង់គ្លេស", region: "europe", specialty: "sciences" },
  { name: "University of Glasgow",                        countryEn: "UK",          countryKh: "ចក្រភពអង់គ្លេស", region: "europe", specialty: "medicine" },
  { name: "ETH Zürich",                                   countryEn: "Switzerland", countryKh: "ស្វីស",            region: "europe", specialty: "engineering" },
  { name: "EPFL Lausanne",                                countryEn: "Switzerland", countryKh: "ស្វីស",            region: "europe", specialty: "engineering" },
  { name: "University of Zurich",                         countryEn: "Switzerland", countryKh: "ស្វីស",            region: "europe", specialty: "sciences" },
  { name: "University of Geneva",                         countryEn: "Switzerland", countryKh: "ស្វីស",            region: "europe", specialty: "internationalrelations" },
  { name: "Sorbonne University",                          countryEn: "France",      countryKh: "បារាំង",            region: "europe", specialty: "humanities" },
  { name: "École Normale Supérieure (ENS Paris)",         countryEn: "France",      countryKh: "បារាំង",            region: "europe", specialty: "sciences" },
  { name: "Sciences Po",                                  countryEn: "France",      countryKh: "បារាំង",            region: "europe", specialty: "politics" },
  { name: "École Polytechnique",                          countryEn: "France",      countryKh: "បារាំង",            region: "europe", specialty: "engineering" },
  { name: "PSL University",                               countryEn: "France",      countryKh: "បារាំង",            region: "europe", specialty: "sciences" },
  { name: "HEC Paris",                                    countryEn: "France",      countryKh: "បារាំង",            region: "europe", specialty: "business" },
  { name: "LMU Munich",                                   countryEn: "Germany",     countryKh: "អាល្លឺម៉ង់",        region: "europe", specialty: "sciences" },
  { name: "Technical University of Munich (TUM)",         countryEn: "Germany",     countryKh: "អាល្លឺម៉ង់",        region: "europe", specialty: "engineering" },
  { name: "Heidelberg University",                        countryEn: "Germany",     countryKh: "អាល្លឺម៉ង់",        region: "europe", specialty: "sciences" },
  { name: "Humboldt University of Berlin",                countryEn: "Germany",     countryKh: "អាល្លឺម៉ង់",        region: "europe", specialty: "humanities" },
  { name: "RWTH Aachen",                                  countryEn: "Germany",     countryKh: "អាល្លឺម៉ង់",        region: "europe", specialty: "engineering" },
  { name: "Free University of Berlin",                    countryEn: "Germany",     countryKh: "អាល្លឺម៉ង់",        region: "europe", specialty: "humanities" },
  { name: "Karlsruhe Institute of Technology (KIT)",      countryEn: "Germany",     countryKh: "អាល្លឺម៉ង់",        region: "europe", specialty: "engineering" },
  { name: "University of Bonn",                           countryEn: "Germany",     countryKh: "អាល្លឺម៉ង់",        region: "europe", specialty: "mathematics" },
  { name: "University of Hamburg",                        countryEn: "Germany",     countryKh: "អាល្លឺម៉ង់",        region: "europe", specialty: "sciences" },
  { name: "University of Amsterdam",                      countryEn: "Netherlands", countryKh: "ហុល្លង់",           region: "europe", specialty: "humanities" },
  { name: "Delft University of Technology (TU Delft)",    countryEn: "Netherlands", countryKh: "ហុល្លង់",           region: "europe", specialty: "engineering" },
  { name: "Leiden University",                            countryEn: "Netherlands", countryKh: "ហុល្លង់",           region: "europe", specialty: "law" },
  { name: "Utrecht University",                           countryEn: "Netherlands", countryKh: "ហុល្លង់",           region: "europe", specialty: "sciences" },
  { name: "Erasmus University Rotterdam",                 countryEn: "Netherlands", countryKh: "ហុល្លង់",           region: "europe", specialty: "business" },
  { name: "KU Leuven",                                    countryEn: "Belgium",     countryKh: "បែលហ្ស៊ិក",         region: "europe", specialty: "sciences" },
  { name: "Ghent University",                             countryEn: "Belgium",     countryKh: "បែលហ្ស៊ិក",         region: "europe", specialty: "sciences" },
  { name: "Karolinska Institute",                         countryEn: "Sweden",      countryKh: "ស៊ុយអែត",            region: "europe", specialty: "medicine" },
  { name: "Lund University",                              countryEn: "Sweden",      countryKh: "ស៊ុយអែត",            region: "europe", specialty: "engineering" },
  { name: "Uppsala University",                           countryEn: "Sweden",      countryKh: "ស៊ុយអែត",            region: "europe", specialty: "sciences" },
  { name: "KTH Royal Institute of Technology",            countryEn: "Sweden",      countryKh: "ស៊ុយអែត",            region: "europe", specialty: "engineering" },
  { name: "University of Copenhagen",                     countryEn: "Denmark",     countryKh: "ដាណឺម៉ាក",          region: "europe", specialty: "medicine" },
  { name: "University of Helsinki",                       countryEn: "Finland",     countryKh: "ហ្វាំងឡង់",         region: "europe", specialty: "sciences" },
  { name: "Aalto University",                             countryEn: "Finland",     countryKh: "ហ្វាំងឡង់",         region: "europe", specialty: "design" },
  { name: "University of Oslo",                           countryEn: "Norway",      countryKh: "ន័រវេស",             region: "europe", specialty: "sciences" },
  { name: "Trinity College Dublin",                       countryEn: "Ireland",     countryKh: "អៀរឡង់",            region: "europe", specialty: "humanities" },
  { name: "University College Dublin (UCD)",              countryEn: "Ireland",     countryKh: "អៀរឡង់",            region: "europe", specialty: "business" },
  { name: "Bocconi University",                           countryEn: "Italy",       countryKh: "អ៊ីតាលី",            region: "europe", specialty: "economics" },
  { name: "University of Bologna",                        countryEn: "Italy",       countryKh: "អ៊ីតាលី",            region: "europe", specialty: "humanities" },
  { name: "Sapienza University of Rome",                  countryEn: "Italy",       countryKh: "អ៊ីតាលី",            region: "europe", specialty: "humanities" },
  { name: "Politecnico di Milano",                        countryEn: "Italy",       countryKh: "អ៊ីតាលី",            region: "europe", specialty: "design" },
  { name: "University of Pisa",                           countryEn: "Italy",       countryKh: "អ៊ីតាលី",            region: "europe", specialty: "sciences" },
  { name: "Complutense University of Madrid",             countryEn: "Spain",       countryKh: "អេស្ប៉ាញ",          region: "europe", specialty: "humanities" },
  { name: "University of Barcelona",                      countryEn: "Spain",       countryKh: "អេស្ប៉ាញ",          region: "europe", specialty: "sciences" },
  { name: "IE University",                                countryEn: "Spain",       countryKh: "អេស្ប៉ាញ",          region: "europe", specialty: "business" },
  { name: "University of Lisbon",                         countryEn: "Portugal",    countryKh: "ព័រទុយហ្គាល់",      region: "europe", specialty: "sciences" },
  { name: "University of Vienna",                         countryEn: "Austria",     countryKh: "អូទ្រីស",            region: "europe", specialty: "humanities" },
  { name: "Charles University, Prague",                   countryEn: "Czechia",     countryKh: "ឆេក",                region: "europe", specialty: "medicine" },
  { name: "University of Warsaw",                         countryEn: "Poland",      countryKh: "ប៉ូឡូញ",            region: "europe", specialty: "sciences" },
  { name: "Lomonosov Moscow State University",            countryEn: "Russia",      countryKh: "រុស្ស៊ី",            region: "europe", specialty: "sciences" },

  // ─── China (35) ───────────────────────────────────────────────────────────
  { name: "Tsinghua University",                          countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "engineering" },
  { name: "Peking University",                            countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "sciences" },
  { name: "Fudan University",                             countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "medicine" },
  { name: "Shanghai Jiao Tong University",                countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "engineering" },
  { name: "Zhejiang University",                          countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "engineering" },
  { name: "University of Science and Technology of China",countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "physics" },
  { name: "Nanjing University",                           countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "sciences" },
  { name: "Wuhan University",                             countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "sciences" },
  { name: "Sun Yat-sen University",                       countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "medicine" },
  { name: "Harbin Institute of Technology",               countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "aerospace" },
  { name: "Beijing Normal University",                    countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "education" },
  { name: "Renmin University of China",                   countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "economics" },
  { name: "Beijing Institute of Technology",              countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "engineering" },
  { name: "Tongji University",                            countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "architecture" },
  { name: "Xi'an Jiaotong University",                    countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "engineering" },
  { name: "South China University of Technology",         countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "engineering" },
  { name: "Sichuan University",                           countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "medicine" },
  { name: "Shandong University",                          countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "sciences" },
  { name: "Jilin University",                             countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "sciences" },
  { name: "Central South University",                     countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "engineering" },
  { name: "Beihang University",                           countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "aerospace" },
  { name: "Tianjin University",                           countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "engineering" },
  { name: "Dalian University of Technology",              countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "engineering" },
  { name: "Northwestern Polytechnical University",        countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "aerospace" },
  { name: "Chongqing University",                         countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "engineering" },
  { name: "University of Hong Kong (HKU)",                countryEn: "Hong Kong",   countryKh: "ហុងកុង",             region: "china", specialty: "medicine" },
  { name: "Chinese University of Hong Kong (CUHK)",       countryEn: "Hong Kong",   countryKh: "ហុងកុង",             region: "china", specialty: "business" },
  { name: "Hong Kong UST (HKUST)",                        countryEn: "Hong Kong",   countryKh: "ហុងកុង",             region: "china", specialty: "engineering" },
  { name: "City University of Hong Kong",                 countryEn: "Hong Kong",   countryKh: "ហុងកុង",             region: "china", specialty: "engineering" },
  { name: "Hong Kong Polytechnic University",             countryEn: "Hong Kong",   countryKh: "ហុងកុង",             region: "china", specialty: "engineering" },
  { name: "National Taiwan University",                   countryEn: "Taiwan",      countryKh: "តៃវ៉ាន់",            region: "china", specialty: "sciences" },
  { name: "National Tsing Hua University",                countryEn: "Taiwan",      countryKh: "តៃវ៉ាន់",            region: "china", specialty: "engineering" },
  { name: "National Cheng Kung University",               countryEn: "Taiwan",      countryKh: "តៃវ៉ាន់",            region: "china", specialty: "engineering" },
  { name: "University of Macau",                          countryEn: "Macau",       countryKh: "ម៉ាកាវ",             region: "china", specialty: "business" },
  { name: "Shenzhen University",                          countryEn: "China",       countryKh: "ចិន",                region: "china", specialty: "technology" },

  // ─── Japan (30) ───────────────────────────────────────────────────────────
  { name: "University of Tokyo",                          countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "sciences" },
  { name: "Kyoto University",                             countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "sciences" },
  { name: "Osaka University",                             countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "sciences" },
  { name: "Tohoku University",                            countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "sciences" },
  { name: "Nagoya University",                            countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "engineering" },
  { name: "Hokkaido University",                          countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "agriculture" },
  { name: "Kyushu University",                            countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "engineering" },
  { name: "Institute of Science Tokyo (Tokyo Tech)",      countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "engineering" },
  { name: "Hitotsubashi University",                      countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "economics" },
  { name: "University of Tsukuba",                        countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "sciences" },
  { name: "Keio University",                              countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "medicine" },
  { name: "Waseda University",                            countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "politics" },
  { name: "Sophia University",                            countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "internationalrelations" },
  { name: "Aoyama Gakuin University",                     countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "liberalarts" },
  { name: "Meiji University",                             countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "law" },
  { name: "Rikkyo University",                            countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "liberalarts" },
  { name: "International Christian University (ICU)",     countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "liberalarts" },
  { name: "Tokyo University of the Arts (Geidai)",        countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "arts" },
  { name: "Tokyo Medical and Dental University",          countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "medicine" },
  { name: "Yokohama National University",                 countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "engineering" },
  { name: "Kobe University",                              countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "business" },
  { name: "Hiroshima University",                         countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "sciences" },
  { name: "Kanazawa University",                          countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "sciences" },
  { name: "Okayama University",                           countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "medicine" },
  { name: "Niigata University",                           countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "medicine" },
  { name: "Chiba University",                             countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "sciences" },
  { name: "Shinshu University",                           countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "engineering" },
  { name: "Nara Institute of Science and Technology",     countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "computerscience" },
  { name: "Tokyo University of Pharmacy and Life Sciences",countryEn: "Japan",      countryKh: "ជប៉ុន",              region: "japan", specialty: "pharmacy" },
  { name: "Doshisha University",                          countryEn: "Japan",       countryKh: "ជប៉ុន",              region: "japan", specialty: "liberalarts" },

  // ─── Australia / Oceania (25) ─────────────────────────────────────────────
  { name: "University of Melbourne",                      countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "sciences" },
  { name: "University of Sydney",                         countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "medicine" },
  { name: "Australian National University (ANU)",         countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "politics" },
  { name: "UNSW Sydney",                                  countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "engineering" },
  { name: "University of Queensland",                     countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "sciences" },
  { name: "Monash University",                            countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "pharmacy" },
  { name: "University of Western Australia (UWA)",        countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "sciences" },
  { name: "University of Adelaide",                       countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "sciences" },
  { name: "University of Technology Sydney (UTS)",        countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "technology" },
  { name: "Macquarie University",                         countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "linguistics" },
  { name: "University of Wollongong",                     countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "engineering" },
  { name: "RMIT University",                              countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "design" },
  { name: "Curtin University",                            countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "mining" },
  { name: "Deakin University",                            countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "publichealth" },
  { name: "Griffith University",                          countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "hospitality" },
  { name: "University of Newcastle",                      countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "engineering" },
  { name: "La Trobe University",                          countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "publichealth" },
  { name: "University of Tasmania",                       countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "marinescience" },
  { name: "James Cook University",                        countryEn: "Australia",   countryKh: "អូស្ត្រាលី",         region: "oceania", specialty: "marinescience" },
  { name: "University of Auckland",                       countryEn: "New Zealand", countryKh: "នូវែលហ្សេឡង់",      region: "oceania", specialty: "sciences" },
  { name: "University of Otago",                          countryEn: "New Zealand", countryKh: "នូវែលហ្សេឡង់",      region: "oceania", specialty: "medicine" },
  { name: "Victoria University of Wellington",            countryEn: "New Zealand", countryKh: "នូវែលហ្សេឡង់",      region: "oceania", specialty: "politics" },
  { name: "University of Canterbury",                     countryEn: "New Zealand", countryKh: "នូវែលហ្សេឡង់",      region: "oceania", specialty: "engineering" },
  { name: "Massey University",                            countryEn: "New Zealand", countryKh: "នូវែលហ្សេឡង់",      region: "oceania", specialty: "agriculture" },
  { name: "University of the South Pacific",              countryEn: "Fiji",        countryKh: "ហ្វីជី",             region: "oceania", specialty: "pacificstudies" },
];

/* ──────────────────────────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────────────────────── */

export function GlobalUniversityHub() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return UNIVERSITIES.filter((u) => {
      if (region !== "all" && u.region !== region) return false;
      if (!q) return true;
      const sp = SPECIALTY[u.specialty];
      // Look up region label so users can search "europe", "japan", etc.
      const regionLabel = REGIONS.find((r) => r.id === u.region);
      return (
        u.name.toLowerCase().includes(q) ||
        u.countryEn.toLowerCase().includes(q) ||
        u.countryKh.includes(q) ||
        sp.en.toLowerCase().includes(q) ||
        sp.kh.includes(q) ||
        (regionLabel
          ? regionLabel.en.toLowerCase().includes(q) || regionLabel.kh.includes(q)
          : false)
      );
    });
  }, [query, region]);

  return (
    <div
      className="rounded-3xl border-2 border-[#D9C99B] bg-[#FAF5E6] shadow-sm overflow-hidden"
      data-testid="global-university-hub"
    >
      {/* ── Banner ─────────────────────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-[#7C1D1D] via-[#5C1212] to-[#3D0A0A] text-[#FAF5E6] px-6 sm:px-10 py-10 overflow-hidden">
        {/* Gold accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8860B] via-[#E6C667] to-[#B8860B]" />
        {/* Subtle parchment texture vignette */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(230,198,103,0.4) 0%, transparent 50%)",
          }}
        />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E6C667]/40 bg-[#7C1D1D]/40 backdrop-blur-sm mb-4">
            <Award className="w-4 h-4 text-[#E6C667]" />
            <span
              className={`text-xs font-bold uppercase tracking-wider text-[#E6C667] ${
                kh ? "font-khmer" : ""
              }`}
            >
              {t("Academic Hub", "មជ្ឈមណ្ឌលអប់រំ")}
            </span>
          </div>
          <h2
            className={`font-display font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-2 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Global Scholars & University Directory",
              "បញ្ជីអាហារូបករណ៍ និងសាកលវិទ្យាល័យពិភពលោក"
            )}
          </h2>
          <p
            className={`text-[#FAF5E6]/80 max-w-3xl ${
              kh ? "font-khmer text-base leading-loose" : "text-sm sm:text-base leading-relaxed"
            }`}
          >
            {t(
              "Five major fully-funded scholarships actively recruiting Cambodian students, plus a searchable directory of 200 of the world's most renowned universities.",
              "អាហារូបករណ៍ផ្តល់មូលនិធិពេញលេញធំៗចំនួន ៥ ដែលកំពុងជ្រើសរើសសិស្សខ្មែរ និងបញ្ជីសាកលវិទ្យាល័យល្បីបំផុតចំនួន ២០០ ដែលអាចស្វែងរកបាន។"
            )}
          </p>
        </div>
      </div>

      {/* ── Section 1: Scholarships ────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 py-10 border-b-2 border-[#D9C99B]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#7C1D1D] flex items-center justify-center shadow">
            <Award className="w-5 h-5 text-[#E6C667]" />
          </div>
          <div>
            <h3
              className={`font-bold text-[#2D1810] text-lg sm:text-xl ${
                kh ? "font-khmer" : "font-display"
              }`}
            >
              {t(
                "Global Scholarships for Cambodian Citizens",
                "អាហារូបករណ៍ពិភពលោកសម្រាប់ប្រជាជនកម្ពុជា"
              )}
            </h3>
          </div>
        </div>
        <p
          className={`text-[#5C4632] text-sm mb-7 ${
            kh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {t(
            "Fully-funded programs that actively recruit students from Cambodia. Each entry is shown in both English and Khmer so families can read together.",
            "កម្មវិធីផ្តល់មូលនិធិពេញលេញ ដែលកំពុងជ្រើសរើសសិស្សពីប្រទេសកម្ពុជា។ ធាតុនីមួយៗត្រូវបានបង្ហាញជាភាសាអង់គ្លេស និងខ្មែរ ដើម្បីឱ្យក្រុមគ្រួសារអាចអានជាមួយគ្នា។"
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SCHOLARSHIPS.map((s) => (
            <article
              key={s.key}
              className="group relative flex flex-col bg-[#FFFCF2] rounded-2xl border-2 border-[#E8D9A8] overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(124,29,29,0.15)] hover:border-[#7C1D1D]/40 hover:-translate-y-0.5 transition-all duration-200"
              data-testid={`scholarship-${s.key}`}
            >
              {/* Gold top stripe */}
              <div className="h-1 bg-gradient-to-r from-[#B8860B] via-[#E6C667] to-[#B8860B]" />

              <div className="flex flex-col flex-1 p-6 gap-4">
                {/* Header: flag + country */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl" role="img" aria-label={s.countryEn}>
                      {s.flag}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#7C1D1D]">
                        {s.countryEn}
                      </span>
                      <span className="text-xs text-[#5C4632]/70 font-khmer">
                        {s.countryKh}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bilingual name */}
                <div>
                  <h4 className="font-display font-bold text-[#2D1810] text-lg leading-snug">
                    {s.nameEn}
                  </h4>
                  <p className="font-khmer text-sm text-[#5C4632] leading-relaxed mt-0.5 italic">
                    {s.nameKh}
                  </p>
                </div>

                {/* Focus pill — bilingual */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#7C1D1D]/10 text-[#7C1D1D] border border-[#7C1D1D]/20">
                    <Sparkles className="w-3 h-3" />
                    {s.focusEn}
                  </span>
                  <span className="text-xs font-khmer text-[#5C4632]/80 italic">
                    {s.focusKh}
                  </span>
                </div>

                {/* Bilingual description — both shown together so families can read together */}
                <div className="flex flex-col gap-3 text-sm leading-relaxed flex-1">
                  <p className="text-[#2D1810]">{s.descEn}</p>
                  <p className="font-khmer text-[#5C4632] leading-loose border-l-2 border-[#E6C667] pl-3 italic">
                    {s.descKh}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#7C1D1D] text-[#FAF5E6] font-bold hover:bg-[#5C1212] hover:shadow-md active:scale-95 transition-all ${
                    kh ? "font-khmer text-base" : "text-sm"
                  }`}
                >
                  {t("Apply / Learn More", "ដាក់ពាក្យ / ស្វែងយល់បន្ថែម")}
                  <ExternalLink className="w-3.5 h-3.5 opacity-90" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Section 2: Global 200 Directory ────────────────────────────────── */}
      <section className="px-6 sm:px-10 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#7C1D1D] flex items-center justify-center shadow">
            <GraduationCap className="w-5 h-5 text-[#E6C667]" />
          </div>
          <div>
            <h3
              className={`font-bold text-[#2D1810] text-lg sm:text-xl ${
                kh ? "font-khmer" : "font-display"
              }`}
            >
              {t(
                "The Global 200 Directory",
                "បញ្ជីសាកលវិទ្យាល័យទាំង២០០"
              )}
            </h3>
            <p
              className={`text-xs text-[#5C4632]/80 ${
                kh ? "font-khmer" : ""
              }`}
            >
              {t(
                `Showing ${filtered.length} of ${UNIVERSITIES.length} universities`,
                `កំពុងបង្ហាញ ${filtered.length} នៃ ${UNIVERSITIES.length} សាកលវិទ្យាល័យ`
              )}
            </p>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mt-5 mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7C1D1D]/60 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(
              "Search for your future...",
              "ស្វែងរកអនាគតរបស់អ្នក..."
            )}
            aria-label={t("Search universities", "ស្វែងរកសាកលវិទ្យាល័យ")}
            className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-[#D9C99B] bg-[#FFFCF2] text-[#2D1810] placeholder:text-[#5C4632]/50 focus:outline-none focus:border-[#7C1D1D] focus:ring-2 focus:ring-[#7C1D1D]/20 transition-all ${
              kh ? "font-khmer" : ""
            }`}
            data-testid="university-search"
          />
        </div>

        {/* Region filter chips — toggle buttons (not a tab pattern, since
            there is no separate tabpanel per chip; all chips filter the same
            grid). Uses aria-pressed for screen-reader state. */}
        <div
          className="flex flex-wrap gap-2 mb-6"
          role="group"
          aria-label={kh ? "ច្រោះតាមតំបន់" : "Filter by region"}
        >
          {REGIONS.map((r) => {
            const active = region === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setRegion(r.id)}
                aria-pressed={active}
                data-testid={`region-filter-${r.id}`}
                className={[
                  "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all border-2",
                  active
                    ? "bg-[#7C1D1D] text-[#FAF5E6] border-[#7C1D1D] shadow-sm"
                    : "bg-[#FFFCF2] text-[#5C4632] border-[#D9C99B] hover:border-[#7C1D1D]/50 hover:text-[#7C1D1D]",
                  kh ? "font-khmer" : "",
                ].join(" ")}
              >
                <Globe2 className="w-3.5 h-3.5" />
                {kh ? r.kh : r.en}
              </button>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div
            className="rounded-2xl border-2 border-dashed border-[#D9C99B] bg-[#FFFCF2] p-10 text-center"
            data-testid="university-empty-state"
          >
            <BookMarked className="w-10 h-10 text-[#7C1D1D]/40 mx-auto mb-3" />
            <p
              className={`text-[#5C4632] font-semibold ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "No universities match your search. Try a different keyword or region.",
                "គ្មានសាកលវិទ្យាល័យដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ។ សូមសាកល្បងពាក្យគន្លឹះ ឬតំបន់ផ្សេង។"
              )}
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-testid="university-grid"
          >
            {filtered.map((u) => {
              const sp = SPECIALTY[u.specialty];
              return (
                <div
                  key={u.name}
                  className="group flex flex-col bg-[#FFFCF2] rounded-xl border-2 border-[#E8D9A8] p-4 hover:border-[#7C1D1D]/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
                  data-testid="university-card"
                >
                  {/* Top: small flag + region accent */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#7C1D1D]/80">
                      <MapPin className="w-3 h-3" />
                      <span>{u.countryEn}</span>
                      <span className="font-khmer text-[#5C4632]/70 normal-case font-normal">
                        · {u.countryKh}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <h4 className="font-display font-bold text-[#2D1810] text-sm leading-snug mb-2 group-hover:text-[#7C1D1D] transition-colors">
                    {u.name}
                  </h4>

                  {/* Specialty — bilingual */}
                  <div className="mt-auto pt-2 border-t border-[#E8D9A8] flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#7C1D1D]">
                      <Sparkles className="w-3 h-3 text-[#B8860B]" />
                      {sp.en}
                    </span>
                    <span className="text-[11px] font-khmer text-[#5C4632]/80 italic truncate">
                      {sp.kh}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default GlobalUniversityHub;
