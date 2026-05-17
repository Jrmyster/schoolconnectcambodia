import { HeartPulse, Ship, Stethoscope, Activity, Syringe, Radio, Wrench, Scale, BookOpen, Landmark, Cross, Globe, Baby, ShieldAlert } from "lucide-react";

export type NgoCategory = "Medical & Health" | "Technical & Rights" | "Broad Humanitarian";

export interface GlobalNgo {
  id: string;
  category: NgoCategory;
  nameEn: string;
  nameKh: string;
  descriptionEn: string;
  descriptionKh: string;
  icon: any;
}

export const GLOBAL_NGOS: GlobalNgo[] = [
  // Group 1: Medical & Health Focused
  {
    id: "medecins-du-monde",
    category: "Medical & Health",
    nameEn: "Doctors of the World (Médecins du Monde)",
    nameKh: "វេជ្ជបណ្ឌិតពិភពលោក (Médecins du Monde)",
    descriptionEn: "A network of French doctors providing long-term medical care and emergency aid to vulnerable populations worldwide.",
    descriptionKh: "បណ្តាញវេជ្ជបណ្ឌិតបារាំងដែលផ្តល់ការថែទាំសុខភាពរយៈពេលវែង និងជំនួយសង្គ្រោះបន្ទាន់ដល់ប្រជាជនងាយរងគ្រោះទូទាំងពិភពលោក។",
    icon: Stethoscope,
  },
  {
    id: "international-medical-corps",
    category: "Medical & Health",
    nameEn: "International Medical Corps (IMC)",
    nameKh: "អង្គភាពពេទ្យអន្តរជាតិ (IMC)",
    descriptionEn: "Provides health services and training in desperate, neglected areas, often acting as first responders during crises.",
    descriptionKh: "ផ្តល់សេវាសុខភាព និងការបណ្តុះបណ្តាលនៅតំបន់ដាច់ស្រយាល ដោយច្រើនតែធ្វើជាអ្នកសង្គ្រោះបឋមក្នុងអំឡុងពេលមានវិបត្តិ។",
    icon: HeartPulse,
  },
  {
    id: "mercy-ships",
    category: "Medical & Health",
    nameEn: "Mercy Ships",
    nameKh: "នាវាមេត្តាធម៌ (Mercy Ships)",
    descriptionEn: "Operates a fleet of ships staffed by volunteer medical professionals to deliver specialized surgeries and healthcare to poor nations.",
    descriptionKh: "ប្រតិបត្តិការកងនាវាដែលបម្រើការដោយអ្នកជំនាញពេទ្យស្ម័គ្រចិត្ត ដើម្បីផ្តល់ការវះកាត់ឯកទេស និងការថែទាំសុខភាពដល់ប្រទេសក្រីក្រ។",
    icon: Ship,
  },
  {
    id: "partners-in-health",
    category: "Medical & Health",
    nameEn: "Partners In Health (PIH)",
    nameKh: "ដៃគូសុខភាព (PIH)",
    descriptionEn: "Focuses on providing comprehensive, direct healthcare to marginalized communities globally.",
    descriptionKh: "ផ្តោតលើការផ្តល់ការថែទាំសុខភាពដោយផ្ទាល់ និងទូលំទូលាយដល់សហគមន៍ដែលខ្វះខាតទូទាំងពិភពលោក។",
    icon: Activity,
  },
  {
    id: "acupuncturists-without-borders",
    category: "Medical & Health",
    nameEn: "Acupuncturists Without Borders",
    nameKh: "គ្រូពេទ្យចាក់ម្ជុលវិទ្យាសាស្ត្រគ្មានព្រំដែន",
    descriptionEn: "Provides community-based trauma relief and training, utilizing acupuncture to treat populations affected by disaster.",
    descriptionKh: "ផ្តល់ការសង្គ្រោះរបួសផ្លូវចិត្ត និងការបណ្តុះបណ្តាលតាមសហគមន៍ ដោយប្រើការចាក់ម្ជុលវិទ្យាសាស្ត្រដើម្បីព្យាបាលប្រជាជនដែលរងគ្រោះដោយគ្រោះមហន្តរាយ។",
    icon: Syringe,
  },

  // Group 2: Specialized Technical & Rights-Based
  {
    id: "reporters-without-borders",
    category: "Technical & Rights",
    nameEn: "Reporters Without Borders (RSF)",
    nameKh: "អ្នកយកព័ត៌មានគ្មានព្រំដែន (RSF)",
    descriptionEn: "Defends freedom of information and assists journalists operating in dangerous or oppressive regions.",
    descriptionKh: "ការពារសេរីភាពនៃព័ត៌មាន និងជួយអ្នកកាសែតដែលធ្វើការនៅតំបន់គ្រោះថ្នាក់ ឬមានការគាបសង្កត់។",
    icon: Radio,
  },
  {
    id: "engineers-without-borders",
    category: "Technical & Rights",
    nameEn: "Engineers Without Borders (EWB)",
    nameKh: "វិស្វករគ្មានព្រំដែន (EWB)",
    descriptionEn: "Partners with communities to implement sustainable engineering projects involving water, sanitation, and infrastructure.",
    descriptionKh: "សហការជាមួយសហគមន៍ដើម្បីអនុវត្តគម្រោងវិស្វកម្មប្រកបដោយនិរន្តរភាព រួមមាន ទឹកស្អាត អនាម័យ និងហេដ្ឋារចនាសម្ព័ន្ធ។",
    icon: Wrench,
  },
  {
    id: "lawyers-without-borders",
    category: "Technical & Rights",
    nameEn: "Lawyers Without Borders (ASF)",
    nameKh: "មេធាវីគ្មានព្រំដែន (ASF)",
    descriptionEn: "Specializes in defending human rights and supporting justice mechanisms in developing countries.",
    descriptionKh: "មានជំនាញក្នុងការការពារសិទ្ធិមនុស្ស និងគាំទ្រយន្តការយុត្តិធម៌នៅក្នុងប្រទេសកំពុងអភិវឌ្ឍន៍។",
    icon: Scale,
  },
  {
    id: "teachers-without-borders",
    category: "Technical & Rights",
    nameEn: "Teachers Without Borders",
    nameKh: "គ្រូបង្រៀនគ្មានព្រំដែន",
    descriptionEn: "Connects educators globally to foster local educational improvements and empower teaching communities.",
    descriptionKh: "ភ្ជាប់ទំនាក់ទំនងអ្នកអប់រំទូទាំងពិភពលោក ដើម្បីលើកកម្ពស់ការកែលម្អការអប់រំក្នុងស្រុក និងពង្រឹងសហគមន៍បង្រៀន។",
    icon: BookOpen,
  },
  {
    id: "bankers-without-borders",
    category: "Technical & Rights",
    nameEn: "Bankers Without Borders",
    nameKh: "ធនាគារិកគ្មានព្រំដែន",
    descriptionEn: "Provides volunteer financial expertise to support microfinance initiatives and alleviate global poverty.",
    descriptionKh: "ផ្តល់ជំនាញហិរញ្ញវត្ថុស្ម័គ្រចិត្ត ដើម្បីគាំទ្រគំនិតផ្តួចផ្តើមមីក្រូហិរញ្ញវត្ថុ និងកាត់បន្ថយភាពក្រីក្រជាសកល។",
    icon: Landmark,
  },

  // Group 3: Broad Humanitarian Aid
  {
    id: "red-cross",
    category: "Broad Humanitarian",
    nameEn: "International Committee of the Red Cross (ICRC)",
    nameKh: "គណៈកម្មាធិការអន្តរជាតិនៃកាកបាទក្រហម (ICRC)",
    descriptionEn: "A major, neutral organization providing critical aid and protection to victims of armed conflict and violence.",
    descriptionKh: "អង្គការអព្យាក្រឹតដ៏ធំមួយ ដែលផ្តល់ជំនួយ និងការការពារយ៉ាងសំខាន់ដល់ជនរងគ្រោះដោយជម្លោះប្រដាប់អាវុធ និងអំពើហិង្សា។",
    icon: Cross,
  },
  {
    id: "oxfam",
    category: "Broad Humanitarian",
    nameEn: "Oxfam International",
    nameKh: "អង្គការអុកស្វាមអន្តរជាតិ",
    descriptionEn: "A global confederation working tirelessly to end poverty, fight injustice, and provide emergency disaster relief.",
    descriptionKh: "សហព័ន្ធសកលលោកដែលធ្វើការយ៉ាងសកម្មដើម្បីបញ្ចប់ភាពក្រីក្រ ប្រឆាំងនឹងភាពអយុត្តិធម៌ និងផ្តល់ការសង្គ្រោះបន្ទាន់។",
    icon: Globe,
  },
  {
    id: "save-the-children",
    category: "Broad Humanitarian",
    nameEn: "Save the Children",
    nameKh: "សង្គ្រោះកុមារ (Save the Children)",
    descriptionEn: "Focuses on providing food, shelter, education, and medical care for children living in extreme crisis situations.",
    descriptionKh: "ផ្តោតលើការផ្តល់អាហារ ជម្រក ការអប់រំ និងការថែទាំសុខភាពសម្រាប់កុមារដែលរស់នៅក្នុងស្ថានភាពវិបត្តិធ្ងន់ធ្ងរ។",
    icon: Baby,
  },
  {
    id: "global-medic",
    category: "Broad Humanitarian",
    nameEn: "GlobalMedic",
    nameKh: "គ្រូពេទ្យសកល (GlobalMedic)",
    descriptionEn: "A Canadian NGO utilizing professional volunteers to provide rapid and efficient disaster response operations.",
    descriptionKh: "អង្គការក្រៅរដ្ឋាភិបាលកាណាដា ដែលប្រើប្រាស់អ្នកស្ម័គ្រចិត្តជំនាញ ដើម្បីផ្តល់ប្រតិបត្តិការសង្គ្រោះគ្រោះមហន្តរាយយ៉ាងរហ័ស និងមានប្រសិទ្ធភាព។",
    icon: ShieldAlert,
  }
];
