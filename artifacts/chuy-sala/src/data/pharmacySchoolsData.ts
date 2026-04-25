// ════════════════════════════════════════════════════════════════════════════
//  Pharmacy Schools Directory · ផ្លូវឆ្ពោះទៅមុខ៖ សាលាឱសថសាស្ត្រ
//
//  A curated, bilingual directory of pharmacy programs for Cambodian
//  students. Two buckets:
//
//    1. "Cambodia" — the four institutions that grant a domestic pharmacy
//       degree recognised by the Ministry of Health.
//    2. "Global"  — a Top 30 international list informed by QS, Shanghai
//       (ARWU), and US News Pharmacy/Pharmacology rankings, with strong
//       Asian and Australian representation that is realistic for
//       Cambodian students applying abroad.
//
//  `rank` on global entries is the entry's position in this Top 30 list.
//  Cambodian entries have no rank by design.
// ════════════════════════════════════════════════════════════════════════════

export type PharmacySchool = {
  id: string;
  nameEn: string;
  nameKh: string;
  shortEn?: string;
  locationEn: string;
  locationKh: string;
  type: "Cambodia" | "Global";
  rank?: number;
  blurbEn: string;
  blurbKh: string;
  website?: string;
};

// ── Cambodia ───────────────────────────────────────────────────────────────
export const CAMBODIA_SCHOOLS: PharmacySchool[] = [
  {
    id: "uhs",
    nameEn: "University of Health Sciences",
    nameKh: "សាកលវិទ្យាល័យវិទ្យាសាស្ត្រសុខាភិបាល",
    shortEn: "UHS",
    locationEn: "Phnom Penh, Cambodia",
    locationKh: "ភ្នំពេញ កម្ពុជា",
    type: "Cambodia",
    blurbEn:
      "Cambodia's national medical university and the country's flagship public school for pharmacy. Six-year Doctor of Pharmacy programme, taught largely in Khmer with French and English clinical electives.",
    blurbKh:
      "សាកលវិទ្យាល័យវេជ្ជសាស្ត្រជាតិរបស់កម្ពុជា និងជាសាលាសាធារណៈឈានមុខគេសម្រាប់ឱសថសាស្ត្រ។ កម្មវិធីបណ្ឌិតឱសថរយៈពេល ៦ ឆ្នាំ បង្រៀនជាភាសាខ្មែរជាសំខាន់ ព្រមទាំងមានមុខវិជ្ជាជម្រើសផ្នែកគ្លីនិកជាភាសាបារាំង និងអង់គ្លេស។",
    website: "https://www.uhs.edu.kh",
  },
  {
    id: "up",
    nameEn: "University of Puthisastra",
    nameKh: "សាកលវិទ្យាល័យពុទ្ធិសាស្ត្រ",
    shortEn: "UP",
    locationEn: "Phnom Penh, Cambodia",
    locationKh: "ភ្នំពេញ កម្ពុជា",
    type: "Cambodia",
    blurbEn:
      "Private health-sciences university with a strong English-medium Bachelor of Pharmacy programme, modern simulation labs, and active links to community pharmacies in Phnom Penh.",
    blurbKh:
      "សាកលវិទ្យាល័យឯកជនផ្នែកវិទ្យាសាស្ត្រសុខាភិបាល មានកម្មវិធីបរិញ្ញាបត្រឱសថសាស្ត្រខ្លាំងជាភាសាអង់គ្លេស មានមន្ទីរពិសោធន៍ក្លែងធ្វើទំនើប និងទំនាក់ទំនងសកម្មជាមួយឱសថស្ថានសហគមន៍នៅភ្នំពេញ។",
    website: "https://www.puthisastra.edu.kh",
  },
  {
    id: "iu",
    nameEn: "International University",
    nameKh: "សាកលវិទ្យាល័យអន្តរជាតិ",
    shortEn: "IU",
    locationEn: "Phnom Penh, Cambodia",
    locationKh: "ភ្នំពេញ កម្ពុជា",
    type: "Cambodia",
    blurbEn:
      "Private university offering a five-year Bachelor of Pharmacy programme alongside medicine and dentistry, with rotations in partner hospitals across Phnom Penh.",
    blurbKh:
      "សាកលវិទ្យាល័យឯកជនដែលផ្ដល់កម្មវិធីបរិញ្ញាបត្រឱសថសាស្ត្ររយៈពេល ៥ ឆ្នាំ ជាមួយវេជ្ជសាស្ត្រ និងធ្មេញពេទ្យ មានវេនអនុវត្តនៅមន្ទីរពេទ្យដៃគូទូទាំងភ្នំពេញ។",
    website: "https://www.iu.edu.kh",
  },
  {
    id: "norton",
    nameEn: "Norton University",
    nameKh: "សាកលវិទ្យាល័យន័រតុន",
    locationEn: "Phnom Penh, Cambodia",
    locationKh: "ភ្នំពេញ កម្ពុជា",
    type: "Cambodia",
    blurbEn:
      "One of Cambodia's largest private universities, with a Faculty of Pharmacy that has trained community and hospital pharmacists across the country since the early 2000s.",
    blurbKh:
      "សាកលវិទ្យាល័យឯកជនធំបំផុតមួយរបស់កម្ពុជា មានមហាវិទ្យាល័យឱសថសាស្ត្រដែលបានបណ្ដុះបណ្ដាលឱសថការីសហគមន៍ និងមន្ទីរពេទ្យទូទាំងប្រទេសតាំងពីដើមទសវត្សរ៍ឆ្នាំ ២០០០ មកម្ល៉េះ។",
    website: "https://norton-u.com",
  },
];

// ── Global Top 30 ──────────────────────────────────────────────────────────
//  Position-based ranks. Strong Asian/Australian/European/North American mix
//  to reflect realistic destinations for Cambodian students abroad.
export const GLOBAL_SCHOOLS: PharmacySchool[] = [
  {
    id: "harvard",
    nameEn: "Harvard University",
    nameKh: "សាកលវិទ្យាល័យហាវ៉ាដ",
    locationEn: "Cambridge, USA",
    locationKh: "ខេមប្រ៊ីដ សហរដ្ឋអាមេរិក",
    type: "Global",
    rank: 1,
    blurbEn:
      "Pharmacology and drug-discovery research at Harvard Medical School set the global pace — from the modern study of receptors to today's mRNA medicines.",
    blurbKh:
      "ការស្រាវជ្រាវផ្នែកឱសថសាស្ត្រ និងការរកឃើញថ្នាំនៅសាលាវេជ្ជសាស្ត្រហាវ៉ាដ កំណត់ល្បឿនជាសកល — ពីការសិក្សាសម័យទំនើបអំពីអ្នកទទួល រហូតដល់ថ្នាំ mRNA នាសព្វថ្ងៃ។",
  },
  {
    id: "oxford",
    nameEn: "University of Oxford",
    nameKh: "សាកលវិទ្យាល័យអុកហ្វត",
    locationEn: "Oxford, United Kingdom",
    locationKh: "អុកហ្វត ចក្រភពអង់គ្លេស",
    type: "Global",
    rank: 2,
    blurbEn:
      "Home of the Oxford Vaccine Group and a powerhouse for clinical pharmacology — where the AstraZeneca COVID-19 vaccine was designed.",
    blurbKh:
      "ជាទីតាំងនៃក្រុមវ៉ាក់សាំងអុកហ្វត និងជាមជ្ឈមណ្ឌលដ៏ខ្លាំងសម្រាប់ឱសថសាស្ត្រគ្លីនិក — ជាកន្លែងដែលវ៉ាក់សាំងកូវីដ-១៩ AstraZeneca ត្រូវបានរចនាឡើង។",
  },
  {
    id: "ucl",
    nameEn: "University College London",
    nameKh: "សាកលវិទ្យាល័យអ៊ុយស៊ីអិល (UCL)",
    shortEn: "UCL",
    locationEn: "London, United Kingdom",
    locationKh: "ឡុងដ៍ ចក្រភពអង់គ្លេស",
    type: "Global",
    rank: 3,
    blurbEn:
      "The UCL School of Pharmacy is one of the world's oldest and consistently ranks first in the UK for pharmacy and pharmacology research.",
    blurbKh:
      "សាលាឱសថសាស្ត្រ UCL ជាសាលាមួយក្នុងចំណោមសាលាចាស់បំផុតក្នុងពិភពលោក និងជាប់ចំណាត់ថ្នាក់លេខ ១ ជានិច្ចនៅចក្រភពអង់គ្លេសសម្រាប់ការស្រាវជ្រាវឱសថសាស្ត្រ។",
  },
  {
    id: "monash",
    nameEn: "Monash University",
    nameKh: "សាកលវិទ្យាល័យម៉ូណាស",
    locationEn: "Melbourne, Australia",
    locationKh: "ម៉េលប៊ឺន អូស្ត្រាលី",
    type: "Global",
    rank: 4,
    blurbEn:
      "Often ranked the world's #1 pharmacy school, Monash combines a famous Bachelor of Pharmacy with a global drug-development institute and an Asian campus in Malaysia.",
    blurbKh:
      "ជាញឹកញាប់ត្រូវបានចាត់ថ្នាក់ជាសាលាឱសថលេខ ១ លើពិភពលោក ម៉ូណាសរួមផ្សំបរិញ្ញាបត្រឱសថដ៏ល្បីល្បាញ ជាមួយវិទ្យាស្ថានអភិវឌ្ឍថ្នាំសកល និងបរិវេណសិក្សានៅអាស៊ី (ម៉ាឡេស៊ី)។",
  },
  {
    id: "ucsf",
    nameEn: "University of California, San Francisco",
    nameKh: "សាកលវិទ្យាល័យកាលីហ្វ័រនីញ៉ា សាន់ហ្វ្រាន់ស៊ីស្កូ",
    shortEn: "UCSF",
    locationEn: "San Francisco, USA",
    locationKh: "សាន់ហ្វ្រាន់ស៊ីស្កូ សហរដ្ឋអាមេរិក",
    type: "Global",
    rank: 5,
    blurbEn:
      "Often the #1 pharmacy school in the United States. UCSF pioneered modern clinical pharmacy practice and trains many of America's senior hospital pharmacists.",
    blurbKh:
      "ជាញឹកញាប់ត្រូវបានចាត់ថ្នាក់ជាសាលាឱសថលេខ ១ នៅសហរដ្ឋអាមេរិក។ UCSF បានត្រួសត្រាយការអនុវត្តឱសថគ្លីនិកសម័យទំនើប និងបានបណ្ដុះបណ្ដាលឱសថការីជាន់ខ្ពស់ជាច្រើនរបស់អាមេរិក។",
  },
  {
    id: "jhu",
    nameEn: "Johns Hopkins University",
    nameKh: "សាកលវិទ្យាល័យចនហបឃិនស៍",
    locationEn: "Baltimore, USA",
    locationKh: "បាល់ទីម័រ សហរដ្ឋអាមេរិក",
    type: "Global",
    rank: 6,
    blurbEn:
      "World-leading hospital with deep research strength in clinical pharmacology, infectious-disease drugs, and global public-health pharmacy.",
    blurbKh:
      "មន្ទីរពេទ្យឈានមុខគេលើពិភពលោក ដែលមានកម្លាំងស្រាវជ្រាវខ្លាំងផ្នែកឱសថសាស្ត្រគ្លីនិក ថ្នាំជំងឺឆ្លង និងឱសថសាធារណៈសុខាភិបាលសកល។",
  },
  {
    id: "toronto",
    nameEn: "University of Toronto",
    nameKh: "សាកលវិទ្យាល័យតូរ៉ុនតូ",
    locationEn: "Toronto, Canada",
    locationKh: "តូរ៉ុនតូ កាណាដា",
    type: "Global",
    rank: 7,
    blurbEn:
      "Canada's largest pharmacy faculty, internationally famous since insulin was first purified at Toronto in 1921.",
    blurbKh:
      "មហាវិទ្យាល័យឱសថធំបំផុតរបស់កាណាដា ល្បីល្បាញលើពិភពលោកតាំងពីពេលដែលអាំងស៊ុយលីនត្រូវបានបន្សុទ្ធលើកដំបូងនៅតូរ៉ុនតូក្នុងឆ្នាំ ១៩២១។",
  },
  {
    id: "unc",
    nameEn: "University of North Carolina at Chapel Hill",
    nameKh: "សាកលវិទ្យាល័យកាន់រ៉ូលីណាខាងជើង (UNC)",
    shortEn: "UNC",
    locationEn: "Chapel Hill, USA",
    locationKh: "ឆាប់ផេលហីល សហរដ្ឋអាមេរិក",
    type: "Global",
    rank: 8,
    blurbEn:
      "The UNC Eshelman School of Pharmacy regularly tops US rankings, with strengths in pharmaceutical sciences and rural-health pharmacy.",
    blurbKh:
      "សាលាឱសថ Eshelman នៃ UNC តែងតែឈរនៅកំពូលនៃចំណាត់ថ្នាក់សហរដ្ឋអាមេរិក ដោយមានកម្លាំងខ្លាំងផ្នែកវិទ្យាសាស្ត្រឱសថ និងឱសថសុខភាពជនបទ។",
  },
  {
    id: "nus",
    nameEn: "National University of Singapore",
    nameKh: "សាកលវិទ្យាល័យជាតិសិង្ហបុរី",
    shortEn: "NUS",
    locationEn: "Singapore",
    locationKh: "សិង្ហបុរី",
    type: "Global",
    rank: 9,
    blurbEn:
      "Asia's top pharmacy school by most rankings. Strong English-medium teaching and strategic links across ASEAN — a realistic destination for Cambodian students.",
    blurbKh:
      "សាលាឱសថកំពូលនៅអាស៊ីតាមចំណាត់ថ្នាក់ភាគច្រើន។ ការបង្រៀនជាភាសាអង់គ្លេសខ្លាំង និងទំនាក់ទំនងយុទ្ធសាស្ត្រទូទាំងអាស៊ាន — ជាគោលដៅសមហេតុផលសម្រាប់សិស្សកម្ពុជា។",
  },
  {
    id: "cambridge",
    nameEn: "University of Cambridge",
    nameKh: "សាកលវិទ្យាល័យខេមប្រ៊ីដ",
    locationEn: "Cambridge, United Kingdom",
    locationKh: "ខេមប្រ៊ីដ ចក្រភពអង់គ្លេស",
    type: "Global",
    rank: 10,
    blurbEn:
      "Cambridge has no separate pharmacy degree but its Department of Pharmacology is among the world's most cited and helped found modern receptor science.",
    blurbKh:
      "ខេមប្រ៊ីដមិនមានបរិញ្ញាបត្រឱសថដាច់ដោយឡែកទេ ប៉ុន្តែនាយកដ្ឋានឱសថសាស្ត្ររបស់ខ្លួនស្ថិតក្នុងចំណោមកន្លែងដែលត្រូវបានដកស្រង់ច្រើនបំផុតក្នុងពិភពលោក និងបានជួយបង្កើតវិទ្យាសាស្ត្រអ្នកទទួលសម័យទំនើប។",
  },
  {
    id: "umich",
    nameEn: "University of Michigan",
    nameKh: "សាកលវិទ្យាល័យមីឈីហ្គែន",
    locationEn: "Ann Arbor, USA",
    locationKh: "អែនអាប័រ សហរដ្ឋអាមេរិក",
    type: "Global",
    rank: 11,
    blurbEn:
      "Top-ranked US public pharmacy school with a famous College of Pharmacy and one of the country's largest academic medical centers.",
    blurbKh:
      "សាលាឱសថសាធារណៈសហរដ្ឋអាមេរិកជាប់ចំណាត់ថ្នាក់ខ្ពស់ មានមហាវិទ្យាល័យឱសថដ៏ល្បីល្បាញ និងជាមជ្ឈមណ្ឌលវេជ្ជសាស្ត្រសិក្សាធំបំផុតមួយក្នុងប្រទេស។",
  },
  {
    id: "sydney",
    nameEn: "University of Sydney",
    nameKh: "សាកលវិទ្យាល័យស៊ីដនី",
    locationEn: "Sydney, Australia",
    locationKh: "ស៊ីដនី អូស្ត្រាលី",
    type: "Global",
    rank: 12,
    blurbEn:
      "Australia's oldest pharmacy school, with strong programmes in clinical practice, indigenous health, and pharmaceutical chemistry.",
    blurbKh:
      "សាលាឱសថចាស់បំផុតរបស់អូស្ត្រាលី ដែលមានកម្មវិធីខ្លាំងផ្នែកអនុវត្តគ្លីនិក សុខភាពជនជាតិដើម និងគីមីវិទ្យាឱសថ។",
  },
  {
    id: "tokyo",
    nameEn: "University of Tokyo",
    nameKh: "សាកលវិទ្យាល័យតូក្យូ",
    locationEn: "Tokyo, Japan",
    locationKh: "តូក្យូ ជប៉ុន",
    type: "Global",
    rank: 13,
    blurbEn:
      "Japan's #1 pharmaceutical sciences faculty, central to Asia's drug-discovery industry and a frequent source of new molecular targets.",
    blurbKh:
      "មហាវិទ្យាល័យវិទ្យាសាស្ត្រឱសថលេខ ១ របស់ជប៉ុន មានសារៈសំខាន់សម្រាប់ឧស្សាហកម្មរកឃើញថ្នាំនៅអាស៊ី និងជាប្រភពញឹកញាប់នៃគោលដៅម៉ូលេគុលថ្មី។",
  },
  {
    id: "karolinska",
    nameEn: "Karolinska Institute",
    nameKh: "វិទ្យាស្ថានការ៉ូលីនស្កា",
    locationEn: "Stockholm, Sweden",
    locationKh: "ស្តុកខុលម៍ ស៊ុយអែត",
    type: "Global",
    rank: 14,
    blurbEn:
      "The medical school that picks the Nobel Prize in Medicine. Karolinska's pharmacology and toxicology programmes are among Europe's best.",
    blurbKh:
      "សាលាវេជ្ជសាស្ត្រដែលជ្រើសរើសពានរង្វាន់ណូបែលផ្នែកវេជ្ជសាស្ត្រ។ កម្មវិធីឱសថសាស្ត្រ និងវិទ្យាសាស្ត្រជាតិពុលរបស់ការ៉ូលីនស្កា ស្ថិតក្នុងចំណោមកម្មវិធីល្អបំផុតរបស់អឺរ៉ុប។",
  },
  {
    id: "ethz",
    nameEn: "ETH Zurich",
    nameKh: "សាកលវិទ្យាល័យបច្ចេកវិទ្យា ETH ហ្ស៊ូរិច",
    locationEn: "Zurich, Switzerland",
    locationKh: "ហ្ស៊ូរិច ស្វីស",
    type: "Global",
    rank: 15,
    blurbEn:
      "Switzerland's leading science institute, with a Department of Chemistry and Applied Biosciences that drives world-class drug-discovery research.",
    blurbKh:
      "វិទ្យាស្ថានវិទ្យាសាស្ត្រឈានមុខគេរបស់ស្វីស មាននាយកដ្ឋានគីមីវិទ្យា និងជីវវិទ្យាសាស្ត្រអនុវត្ត ដែលជំរុញការស្រាវជ្រាវរកឃើញថ្នាំកម្រិតពិភពលោក។",
  },
  {
    id: "nottingham",
    nameEn: "University of Nottingham",
    nameKh: "សាកលវិទ្យាល័យណតធីងហាំ",
    locationEn: "Nottingham, United Kingdom",
    locationKh: "ណតធីងហាំ ចក្រភពអង់គ្លេស",
    type: "Global",
    rank: 16,
    blurbEn:
      "Top-ranked UK pharmacy school with a famous integrated MPharm degree and a Malaysia campus that welcomes Southeast Asian students.",
    blurbKh:
      "សាលាឱសថចាត់ថ្នាក់កំពូលរបស់ចក្រភពអង់គ្លេស មានសញ្ញាបត្រ MPharm បញ្ចូលគ្នាដ៏ល្បីល្បាញ និងបរិវេណសិក្សានៅម៉ាឡេស៊ី ដែលស្វាគមន៍សិស្សនៅអាស៊ីអាគ្នេយ៍។",
  },
  {
    id: "imperial",
    nameEn: "Imperial College London",
    nameKh: "សាកលវិទ្យាល័យអ៊ីមភើរៀលឡុងដ៍",
    locationEn: "London, United Kingdom",
    locationKh: "ឡុងដ៍ ចក្រភពអង់គ្លេស",
    type: "Global",
    rank: 17,
    blurbEn:
      "Global leader in molecular pharmacology and drug delivery, sitting inside one of the world's largest biomedical research clusters.",
    blurbKh:
      "ជាអ្នកដឹកនាំសកលផ្នែកឱសថសាស្ត្រម៉ូលេគុល និងការដឹកជញ្ជូនថ្នាំ ស្ថិតនៅខាងក្នុងចង្កោមស្រាវជ្រាវជីវវេជ្ជសាស្ត្រធំបំផុតមួយលើពិភពលោក។",
  },
  {
    id: "pku",
    nameEn: "Peking University",
    nameKh: "សាកលវិទ្យាល័យប៉េកាំង",
    locationEn: "Beijing, China",
    locationKh: "ប៉េកាំង ចិន",
    type: "Global",
    rank: 18,
    blurbEn:
      "China's top pharmacy school. Strong in traditional Chinese medicine modernisation alongside cutting-edge synthetic drug development.",
    blurbKh:
      "សាលាឱសថកំពូលរបស់ចិន។ ខ្លាំងផ្នែកការធ្វើទំនើបកម្មឱសថចិនប្រពៃណី រួមផ្សំជាមួយការអភិវឌ្ឍថ្នាំសំយោគទំនើបបំផុត។",
  },
  {
    id: "kcl",
    nameEn: "King's College London",
    nameKh: "សាកលវិទ្យាល័យឃីងស៍ឡុងដ៍",
    locationEn: "London, United Kingdom",
    locationKh: "ឡុងដ៍ ចក្រភពអង់គ្លេស",
    type: "Global",
    rank: 19,
    blurbEn:
      "The Institute of Pharmaceutical Science at King's combines basic pharmacology with hospital practice across some of London's biggest teaching hospitals.",
    blurbKh:
      "វិទ្យាស្ថានវិទ្យាសាស្ត្រឱសថនៅឃីងស៍ រួមផ្សំឱសថសាស្ត្រមូលដ្ឋាន ជាមួយការអនុវត្តនៅមន្ទីរពេទ្យធំៗមួយចំនួនរបស់ឡុងដ៍។",
  },
  {
    id: "manchester",
    nameEn: "University of Manchester",
    nameKh: "សាកលវិទ្យាល័យម៉ានឆេស្ទ័រ",
    locationEn: "Manchester, United Kingdom",
    locationKh: "ម៉ានឆេស្ទ័រ ចក្រភពអង់គ្លេស",
    type: "Global",
    rank: 20,
    blurbEn:
      "Large UK pharmacy school known for its industry partnerships, drug-formulation research, and a friendly international student community.",
    blurbKh:
      "សាលាឱសថធំរបស់ចក្រភពអង់គ្លេស ល្បីល្បាញដោយភាពជាដៃគូឧស្សាហកម្ម ការស្រាវជ្រាវការផ្សំថ្នាំ និងសហគមន៍សិស្សអន្តរជាតិដ៏រួសរាយ។",
  },
  {
    id: "leiden",
    nameEn: "Leiden University",
    nameKh: "សាកលវិទ្យាល័យឡៃដិន",
    locationEn: "Leiden, Netherlands",
    locationKh: "ឡៃដិន ហូឡង់",
    type: "Global",
    rank: 21,
    blurbEn:
      "The Netherlands' oldest university, with a Leiden Academic Centre for Drug Research that is a European hub for pharmacology PhDs.",
    blurbKh:
      "សាកលវិទ្យាល័យចាស់បំផុតរបស់ហូឡង់ មានមជ្ឈមណ្ឌលសិក្សាស្រាវជ្រាវថ្នាំឡៃដិន ដែលជាមជ្ឈមណ្ឌលអឺរ៉ុបសម្រាប់ការសិក្សាបណ្ឌិតផ្នែកឱសថសាស្ត្រ។",
  },
  {
    id: "utrecht",
    nameEn: "Utrecht University",
    nameKh: "សាកលវិទ្យាល័យអ៊ុយត្រិច",
    locationEn: "Utrecht, Netherlands",
    locationKh: "អ៊ុយត្រិច ហូឡង់",
    type: "Global",
    rank: 22,
    blurbEn:
      "One of continental Europe's strongest pharmacy programmes, with deep roots in pharmacoepidemiology — the study of how drugs behave in real populations.",
    blurbKh:
      "ជាកម្មវិធីឱសថដ៏ខ្លាំងបំផុតមួយក្នុងទ្វីបអឺរ៉ុប មានឫសគល់ជ្រៅផ្នែករោគរាតត្បាតឱសថ — ការសិក្សាពីរបៀបដែលថ្នាំធ្វើការលើប្រជាជនពិតប្រាកដ។",
  },
  {
    id: "melbourne",
    nameEn: "University of Melbourne",
    nameKh: "សាកលវិទ្យាល័យម៉េលប៊ឺន",
    locationEn: "Melbourne, Australia",
    locationKh: "ម៉េលប៊ឺន អូស្ត្រាលី",
    type: "Global",
    rank: 23,
    blurbEn:
      "Australia's #1 university overall. Pharmacology and therapeutics here connect with Melbourne's globally-known biomedical precinct.",
    blurbKh:
      "សាកលវិទ្យាល័យលេខ ១ របស់អូស្ត្រាលីជារួម។ ឱសថសាស្ត្រ និងព្យាបាលនៅទីនេះតភ្ជាប់ជាមួយតំបន់ជីវវេជ្ជសាស្ត្រដ៏ល្បីល្បាញនៃម៉េលប៊ឺន។",
  },
  {
    id: "uq",
    nameEn: "University of Queensland",
    nameKh: "សាកលវិទ្យាល័យឃ្វីនលែន",
    shortEn: "UQ",
    locationEn: "Brisbane, Australia",
    locationKh: "ប្រ៊ីសប៊ិន អូស្ត្រាលី",
    type: "Global",
    rank: 24,
    blurbEn:
      "Top Australian pharmacy school, with strengths in tropical medicines and a programme that frequently welcomes Southeast Asian scholarship students.",
    blurbKh:
      "សាលាឱសថកំពូលរបស់អូស្ត្រាលី មានកម្លាំងផ្នែកថ្នាំត្រូពិច និងជាកម្មវិធីដែលតែងតែស្វាគមន៍សិស្សអាហារូបករណ៍មកពីអាស៊ីអាគ្នេយ៍។",
  },
  {
    id: "umn",
    nameEn: "University of Minnesota",
    nameKh: "សាកលវិទ្យាល័យមីនីសូតា",
    locationEn: "Minneapolis, USA",
    locationKh: "មីនីអាប៉ូលីស សហរដ្ឋអាមេរិក",
    type: "Global",
    rank: 25,
    blurbEn:
      "Top-five US College of Pharmacy with a national reputation in clinical pharmacy training and rural-pharmacy programmes.",
    blurbKh:
      "មហាវិទ្យាល័យឱសថកំពូល ៥ របស់សហរដ្ឋអាមេរិក មានកេរ្តិ៍ឈ្មោះថ្នាក់ជាតិផ្នែកការបណ្ដុះបណ្ដាលឱសថគ្លីនិក និងកម្មវិធីឱសថជនបទ។",
  },
  {
    id: "ucsd",
    nameEn: "University of California, San Diego",
    nameKh: "សាកលវិទ្យាល័យកាលីហ្វ័រនីញ៉ា សាន់ឌីអេហ្គោ",
    shortEn: "UCSD",
    locationEn: "San Diego, USA",
    locationKh: "សាន់ឌីអេហ្គោ សហរដ្ឋអាមេរិក",
    type: "Global",
    rank: 26,
    blurbEn:
      "Skaggs School of Pharmacy at UCSD is integrated with one of America's largest biotech corridors and emphasises pharmaceutical sciences research.",
    blurbKh:
      "សាលាឱសថ Skaggs នៅ UCSD ត្រូវបានបញ្ចូលជាមួយច្រករបៀងជីវបច្ចេកវិទ្យាធំបំផុតមួយរបស់អាមេរិក និងផ្ដោតលើការស្រាវជ្រាវវិទ្យាសាស្ត្រឱសថ។",
  },
  {
    id: "uw",
    nameEn: "University of Washington",
    nameKh: "សាកលវិទ្យាល័យវ៉ាស៊ីនតោន",
    locationEn: "Seattle, USA",
    locationKh: "ស៊ីអាថល សហរដ្ឋអាមេរិក",
    type: "Global",
    rank: 27,
    blurbEn:
      "Long-time US top-ten pharmacy school, with a special strength in pharmacokinetics — how the body actually moves and processes a drug.",
    blurbKh:
      "សាលាឱសថកំពូល ១០ របស់សហរដ្ឋអាមេរិកជាយូរមកហើយ មានកម្លាំងពិសេសផ្នែកចលនសាស្ត្រឱសថ — របៀបដែលរាងកាយផ្លាស់ទី និងរំលាយថ្នាំ។",
  },
  {
    id: "ubc",
    nameEn: "University of British Columbia",
    nameKh: "សាកលវិទ្យាល័យប្រ៊ីធីសកូឡុំប៊ី",
    shortEn: "UBC",
    locationEn: "Vancouver, Canada",
    locationKh: "វ៉ានគូវ៉ឺ កាណាដា",
    type: "Global",
    rank: 28,
    blurbEn:
      "Canada's #2 pharmacy faculty, with a famous PharmD programme and large research output in cardiovascular and respiratory drugs.",
    blurbKh:
      "មហាវិទ្យាល័យឱសថលេខ ២ របស់កាណាដា មានកម្មវិធី PharmD ដ៏ល្បីល្បាញ និងផលិតភាពស្រាវជ្រាវធំផ្នែកថ្នាំសរសៃឈាមបេះដូង និងផ្លូវដង្ហើម។",
  },
  {
    id: "snu",
    nameEn: "Seoul National University",
    nameKh: "សាកលវិទ្យាល័យជាតិសេអ៊ូល",
    shortEn: "SNU",
    locationEn: "Seoul, South Korea",
    locationKh: "សេអ៊ូល កូរ៉េខាងត្បូង",
    type: "Global",
    rank: 29,
    blurbEn:
      "South Korea's top university, with a College of Pharmacy that is central to Korea's growing global pharmaceutical industry.",
    blurbKh:
      "សាកលវិទ្យាល័យកំពូលរបស់កូរ៉េខាងត្បូង មានមហាវិទ្យាល័យឱសថ ដែលមានសារៈសំខាន់សម្រាប់ឧស្សាហកម្មឱសថសកលដែលកំពុងរីកចម្រើនរបស់កូរ៉េ។",
  },
  {
    id: "mahidol",
    nameEn: "Mahidol University",
    nameKh: "សាកលវិទ្យាល័យម៉ាហ៊ីដុល",
    locationEn: "Bangkok, Thailand",
    locationKh: "បាងកក ថៃ",
    type: "Global",
    rank: 30,
    blurbEn:
      "Thailand's top medical and pharmacy university and a regional ASEAN leader — geographically and culturally close, with English-medium programmes that frequently welcome Cambodian students.",
    blurbKh:
      "សាកលវិទ្យាល័យវេជ្ជសាស្ត្រ និងឱសថកំពូលរបស់ថៃ និងជាអ្នកដឹកនាំក្នុងតំបន់អាស៊ាន — ជិតស្និទ្ធខាងភូមិសាស្ត្រ និងវប្បធម៌ មានកម្មវិធីជាភាសាអង់គ្លេស ដែលតែងតែទទួលសិស្សកម្ពុជា។",
  },
];

export const ALL_SCHOOLS: PharmacySchool[] = [
  ...CAMBODIA_SCHOOLS,
  ...GLOBAL_SCHOOLS,
];
