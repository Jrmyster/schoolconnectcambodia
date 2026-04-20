import {
  Atom, Beaker, Cpu, Dna, Mountain, ShieldAlert, Briefcase, BookOpen,
  Pencil, GraduationCap, MapPin, Heart, Sparkles, Telescope, Calculator,
  Zap, Sun, Waves, Microscope, FlaskConical, Brain, Rocket, BookMarked,
  Building2, Users, FileText,
} from "lucide-react";
import type { ComponentType } from "react";

export type SearchEntry = {
  id: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  titleEn: string;
  titleKh: string;
  categoryEn: string;
  categoryKh: string;
  descEn: string;
  descKh: string;
  /** English synonyms / alternate phrasings */
  keywordsEn: string[];
  /** Khmer synonyms */
  keywordsKh: string[];
};

/**
 * Master search index for Chouy Sala.
 * Order doesn't matter — results are scored at search time.
 */
export const SEARCH_INDEX: SearchEntry[] = [
  // ── BIOLOGY / GENETICS ────────────────────────────────────
  {
    id: "biology",
    href: "/biology",
    icon: Dna,
    titleEn: "Biology, Genetics & Evolution",
    titleKh: "ជីវវិទ្យា ហ្សែនវិទ្យា និងវិវត្តន៍",
    categoryEn: "Science", categoryKh: "វិទ្យាសាស្ត្រ",
    descEn: "Cells, DNA, heredity, natural selection, and the story of life.",
    descKh: "កោសិកា DNA តំណពូជ ការជ្រើសរើសធម្មជាតិ និងរឿងរ៉ាវជីវិត។",
    keywordsEn: ["genetics", "genetic", "dna", "gene", "genes", "heredity", "evolution", "darwin", "cell", "cells", "biology", "life", "species", "natural selection", "mutation"],
    keywordsKh: ["ហ្សែន", "DNA", "តំណពូជ", "វិវត្តន៍", "កោសិកា", "ជីវវិទ្យា", "ជីវិត"],
  },
  {
    id: "biology-genetics-explorer",
    href: "/biology#genetics",
    icon: Microscope,
    titleEn: "Genetics Explorer",
    titleKh: "កម្មវិធីរុករកហ្សែនវិទ្យា",
    categoryEn: "Biology", categoryKh: "ជីវវិទ្យា",
    descEn: "Interactive Punnett squares, dominant vs recessive traits, and inheritance.",
    descKh: "Punnett squares ថ្នាក់ខ្លាំង/ខ្សោយ និងការទទួលតំណពូជ។",
    keywordsEn: ["genetics", "genetic", "punnett", "dominant", "recessive", "inheritance", "trait", "alleles", "mendel", "chromosome"],
    keywordsKh: ["ហ្សែន", "តំណពូជ", "Punnett"],
  },

  // ── PHYSICS ──────────────────────────────────────────────
  {
    id: "physics",
    href: "/physics",
    icon: Atom,
    titleEn: "Physics Hub",
    titleKh: "មជ្ឈមណ្ឌលរូបវិទ្យា",
    categoryEn: "Science", categoryKh: "វិទ្យាសាស្ត្រ",
    descEn: "Motion, forces, energy, waves — the rules that run the universe.",
    descKh: "ចលនា កម្លាំង ថាមពល និងរលក — ច្បាប់ដែលគ្រប់គ្រងសកលលោក។",
    keywordsEn: ["physics", "motion", "force", "energy", "waves", "newton", "gravity", "physical", "mechanics"],
    keywordsKh: ["រូបវិទ្យា", "ចលនា", "កម្លាំង", "ថាមពល", "រលក", "ទំនាញ"],
  },
  {
    id: "physics-motion",
    href: "/physics/motion",
    icon: Rocket,
    titleEn: "Motion & Speed",
    titleKh: "ចលនា និងល្បឿន",
    categoryEn: "Physics", categoryKh: "រូបវិទ្យា",
    descEn: "Velocity, acceleration, falling objects, and how to measure them.",
    descKh: "ល្បឿន ការបង្កើនល្បឿន វត្ថុធ្លាក់ និងរបៀបវាស់វា។",
    keywordsEn: ["motion", "speed", "velocity", "acceleration", "falling", "kinematics", "movement"],
    keywordsKh: ["ចលនា", "ល្បឿន", "ការផ្លាស់ទី"],
  },
  {
    id: "physics-forces",
    href: "/physics/forces",
    icon: Zap,
    titleEn: "Forces & Newton's Laws",
    titleKh: "កម្លាំង និងច្បាប់ញូតុន",
    categoryEn: "Physics", categoryKh: "រូបវិទ្យា",
    descEn: "Push, pull, friction, gravity — the three laws of motion.",
    descKh: "រុញ ទាញ កក់ ទំនាញ — ច្បាប់ចលនាបីរបស់ញូតុន។",
    keywordsEn: ["force", "newton", "gravity", "friction", "push", "pull", "law", "weight"],
    keywordsKh: ["កម្លាំង", "ញូតុន", "ទំនាញ", "កក់"],
  },
  {
    id: "physics-energy",
    href: "/physics/energy",
    icon: Sun,
    titleEn: "Energy & Work",
    titleKh: "ថាមពល និងការងារ",
    categoryEn: "Physics", categoryKh: "រូបវិទ្យា",
    descEn: "Kinetic, potential, conservation of energy, heat, and power.",
    descKh: "ថាមពលចលនា ថាមពលសក្ដានុពល ការអភិរក្សថាមពល កំដៅ និងថាមពល។",
    keywordsEn: ["energy", "work", "kinetic", "potential", "heat", "power", "conservation", "calories", "joule"],
    keywordsKh: ["ថាមពល", "ការងារ", "កំដៅ"],
  },
  {
    id: "physics-waves",
    href: "/physics/waves",
    icon: Waves,
    titleEn: "Waves, Sound & Light",
    titleKh: "រលក សំឡេង និងពន្លឺ",
    categoryEn: "Physics", categoryKh: "រូបវិទ្យា",
    descEn: "How waves carry energy — sound, light, and the rainbow spectrum.",
    descKh: "របៀបរលកនាំថាមពល — សំឡេង ពន្លឺ និងរង្វង់ឥន្ទធនូ។",
    keywordsEn: ["wave", "waves", "sound", "light", "rainbow", "frequency", "wavelength", "spectrum", "color"],
    keywordsKh: ["រលក", "សំឡេង", "ពន្លឺ", "ឥន្ទធនូ", "ពណ៌"],
  },

  // ── CHEMISTRY ────────────────────────────────────────────
  {
    id: "chemistry",
    href: "/chemistry",
    icon: Beaker,
    titleEn: "Chemistry Hub",
    titleKh: "មជ្ឈមណ្ឌលគីមីវិទ្យា",
    categoryEn: "Science", categoryKh: "វិទ្យាសាស្ត្រ",
    descEn: "Atoms, molecules, reactions — the recipe book of all matter.",
    descKh: "អូដ្ឋាតូម ម៉ូលេគុល ប្រតិកម្ម — សៀវភៅរូបមន្តនៃរូបធាតុ។",
    keywordsEn: ["chemistry", "chemical", "atom", "atoms", "molecule", "reaction", "matter", "element", "compound", "periodic"],
    keywordsKh: ["គីមី", "គីមីវិទ្យា", "អូដ្ឋាតូម", "ម៉ូលេគុល", "ប្រតិកម្ម", "រូបធាតុ"],
  },
  {
    id: "chemistry-building-blocks",
    href: "/chemistry/building-blocks",
    icon: FlaskConical,
    titleEn: "Building Blocks: Atoms & Periodic Table",
    titleKh: "សមាសធាតុមូលដ្ឋាន៖ អូដ្ឋាតូម និងតារាងខួប",
    categoryEn: "Chemistry", categoryKh: "គីមីវិទ្យា",
    descEn: "The Bohr model, electron shells, and the famous periodic table.",
    descKh: "គំរូ Bohr សំបកអេឡិចត្រុង និងតារាងខួបដ៏ល្បី។",
    keywordsEn: ["atom", "atoms", "bohr", "bohr model", "periodic table", "periodic", "element", "elements", "electron", "proton", "neutron", "shell"],
    keywordsKh: ["អូដ្ឋាតូម", "Bohr", "តារាងខួប", "ធាតុ", "អេឡិចត្រុង"],
  },
  {
    id: "chemistry-reactions",
    href: "/chemistry/reactions-math",
    icon: Calculator,
    titleEn: "Reactions & Stoichiometry",
    titleKh: "ប្រតិកម្ម និងស្តូកអ៊ីយ៉ូម៉េទ្រី",
    categoryEn: "Chemistry", categoryKh: "គីមីវិទ្យា",
    descEn: "Balancing equations, moles, and predicting what happens.",
    descKh: "តុល្យភាពសមីការ ម៉ូល និងព្យាករណ៍លទ្ធផលប្រតិកម្ម។",
    keywordsEn: ["reaction", "equation", "balancing", "mole", "stoichiometry", "math"],
    keywordsKh: ["ប្រតិកម្ម", "សមីការ", "ម៉ូល"],
  },
  {
    id: "chemistry-real-world",
    href: "/chemistry/real-world",
    icon: Sparkles,
    titleEn: "Chemistry in Everyday Life",
    titleKh: "គីមីវិទ្យាក្នុងជីវភាពប្រចាំថ្ងៃ",
    categoryEn: "Chemistry", categoryKh: "គីមីវិទ្យា",
    descEn: "Cooking, soap, plastics, batteries — chemistry you can touch.",
    descKh: "ការចម្អិន សាប៊ូ ប្លាស្ទិក ថ្ម — គីមីដែលអ្នកអាចប៉ះបាន។",
    keywordsEn: ["everyday", "real world", "cooking", "soap", "plastic", "battery", "food chemistry"],
    keywordsKh: ["ប្រចាំថ្ងៃ", "ចម្អិន", "សាប៊ូ", "ប្លាស្ទិក"],
  },

  // ── TECHNOLOGY ───────────────────────────────────────────
  {
    id: "tech-how-computers-work",
    href: "/how-computers-work",
    icon: Cpu,
    titleEn: "How Computers Work",
    titleKh: "របៀបដែលកុំព្យូទ័រដំណើរការ",
    categoryEn: "Technology", categoryKh: "បច្ចេកវិទ្យា",
    descEn: "Build a virtual PC, decode binary, see Apollo vs your phone, and predict 2050.",
    descKh: "សាងសង់ PC និម្មិត ឌិកូដ binary ប្រៀបធៀប Apollo នឹងទូរស័ព្ទ និងព្យាករណ៍ឆ្នាំ ២០៥០។",
    keywordsEn: ["computer", "computers", "pc", "hardware", "software", "binary", "cpu", "ram", "ssd", "transistor", "apollo", "smartphone", "quantum", "ai", "history of computing", "tech", "technology"],
    keywordsKh: ["កុំព្យូទ័រ", "បច្ចេកវិទ្យា", "binary", "ហាដវែរ", "សូហ្វវែរ", "ខ្វានតូម", "AI"],
  },
  {
    id: "tech-electrical-safety",
    href: "/electrical-safety",
    icon: Zap,
    titleEn: "Electrical Safety",
    titleKh: "សុវត្ថិភាពអគ្គិសនី",
    categoryEn: "Technology", categoryKh: "បច្ចេកវិទ្យា",
    descEn: "How to stay safe around wires, plugs, water, and storms.",
    descKh: "របៀបនៅឱ្យសុវត្ថិភាពនៅជិតខ្សែភ្លើង ពូស ទឹក និងព្យុះ។",
    keywordsEn: ["electric", "electricity", "electrical", "safety", "shock", "wire", "plug", "voltage", "danger"],
    keywordsKh: ["អគ្គិសនី", "ភ្លើង", "សុវត្ថិភាព", "ឆក់ភ្លើង"],
  },

  // ── ENGLISH WRITING ──────────────────────────────────────
  {
    id: "english-writing",
    href: "/english-writing",
    icon: Pencil,
    titleEn: "English Writing",
    titleKh: "ការសរសេរភាសាអង់គ្លេស",
    categoryEn: "Language", categoryKh: "ភាសា",
    descEn: "Sentence structure, essays, grammar, and vocabulary for Cambodian students.",
    descKh: "រចនាសម្ព័ន្ធប្រយោគ អត្ថបទ វេយ្យាករណ៍ និងវាក្យសព្ទសម្រាប់សិស្សកម្ពុជា។",
    keywordsEn: ["english", "writing", "essay", "grammar", "vocabulary", "sentence", "paragraph", "language", "ielts", "toefl"],
    keywordsKh: ["អង់គ្លេស", "សរសេរ", "វេយ្យាករណ៍", "ភាសា", "អត្ថបទ"],
  },
  {
    id: "submit-story",
    href: "/submit-story",
    icon: FileText,
    titleEn: "Submit a Story",
    titleKh: "ដាក់ស្នើរឿង",
    categoryEn: "Language", categoryKh: "ភាសា",
    descEn: "Share your own writing with the Chouy Sala community.",
    descKh: "ចែករំលែកការសរសេររបស់អ្នកជាមួយសហគមន៍ ជួយសាលា។",
    keywordsEn: ["submit", "story", "essay", "publish", "share writing"],
    keywordsKh: ["ដាក់ស្នើ", "រឿង", "ចែករំលែក"],
  },

  // ── CAREER / LAUNCHPAD ───────────────────────────────────
  {
    id: "launchpad",
    href: "/launchpad",
    icon: Briefcase,
    titleEn: "Career Pathway Guide (Launchpad)",
    titleKh: "មគ្គុទ្ទេសក៍ផ្លូវអាជីព (Launchpad)",
    categoryEn: "Career", categoryKh: "អាជីព",
    descEn: "Discover jobs that match your interests — engineering, medicine, art, business, and more.",
    descKh: "ស្វែងរកអាជីពដែលសមនឹងចំណាប់អារម្មណ៍របស់អ្នក — វិស្វកម្ម វេជ្ជសាស្ត្រ សិល្បៈ ជំនួញ និងផ្សេងៗ។",
    keywordsEn: ["career", "careers", "job", "jobs", "work", "profession", "future", "launchpad", "pathway", "engineer", "doctor", "teacher", "interview", "resume", "salary", "university", "major"],
    keywordsKh: ["អាជីព", "ការងារ", "មុខរបរ", "អនាគត", "វិស្វកម្ម", "វេជ្ជបណ្ឌិត", "គ្រូ", "សាកលវិទ្យាល័យ"],
  },
  {
    id: "alumni",
    href: "/alumni",
    icon: GraduationCap,
    titleEn: "Alumni Voices",
    titleKh: "សំលេងសិស្សចាស់",
    categoryEn: "Career", categoryKh: "អាជីព",
    descEn: "Stories from graduates who walked the same path you're on now.",
    descKh: "រឿងរ៉ាវពីបណ្ឌិតបញ្ចប់ការសិក្សាដែលធ្លាប់ដើរផ្លូវដូចអ្នកសព្វថ្ងៃ។",
    keywordsEn: ["alumni", "graduates", "stories", "mentor", "role model"],
    keywordsKh: ["សិស្សចាស់", "បញ្ចប់ការសិក្សា", "រឿង"],
  },

  // ── GEOLOGY ─────────────────────────────────────────────
  {
    id: "geology",
    href: "/geology",
    icon: Mountain,
    titleEn: "Geology",
    titleKh: "ភូគោលវិទ្យា",
    categoryEn: "Science", categoryKh: "វិទ្យាសាស្ត្រ",
    descEn: "Rocks, volcanoes, earthquakes, and the inner story of our planet.",
    descKh: "ថ្ម ភ្នំភ្លើង រញ្ជួយដី និងរឿងរ៉ាវនៃភពផែនដី។",
    keywordsEn: ["geology", "rock", "rocks", "volcano", "earthquake", "earth", "planet", "minerals", "tectonic", "lava", "fossil"],
    keywordsKh: ["ភូគោល", "ភូគោលវិទ្យា", "ថ្ម", "ភ្នំភ្លើង", "រញ្ជួយដី", "ផែនដី", "ហ្វូស៊ីល"],
  },
  {
    id: "disaster-prep",
    href: "/disaster-prep",
    icon: ShieldAlert,
    titleEn: "Disaster Preparedness",
    titleKh: "ការត្រៀមលក្ខណៈគ្រោះមហន្តរាយ",
    categoryEn: "Safety", categoryKh: "សុវត្ថិភាព",
    descEn: "Floods, storms, earthquakes — what to do BEFORE, DURING, and AFTER.",
    descKh: "ទឹកជំនន់ ព្យុះ រញ្ជួយដី — អ្វីដែលត្រូវធ្វើ មុន អំឡុង និងក្រោយ។",
    keywordsEn: ["disaster", "flood", "storm", "earthquake", "tsunami", "emergency", "safety", "first aid", "preparedness"],
    keywordsKh: ["មហន្តរាយ", "ទឹកជំនន់", "ព្យុះ", "រញ្ជួយដី", "សង្គ្រោះ", "ការពារ"],
  },

  // ── SCIENCE LITERACY ────────────────────────────────────
  {
    id: "scientific-literacy",
    href: "/science",
    icon: Brain,
    titleEn: "Scientific Literacy",
    titleKh: "ការអាន-សរសេរវិទ្យាសាស្ត្រ",
    categoryEn: "Science", categoryKh: "វិទ្យាសាស្ត្រ",
    descEn: "How to think like a scientist, spot fake news, and read evidence.",
    descKh: "របៀបគិតដូចអ្នកវិទ្យាសាស្ត្រ ចាប់ព័ត៌មានក្លែងក្លាយ និងអានភ័ស្តុតាង។",
    keywordsEn: ["science", "scientific", "method", "literacy", "evidence", "fake news", "critical thinking", "general semantics", "reasoning"],
    keywordsKh: ["វិទ្យាសាស្ត្រ", "ការគិត", "ភ័ស្តុតាង", "ព័ត៌មានក្លែងក្លាយ"],
  },
  {
    id: "fun-lab",
    href: "/fun-lab",
    icon: Sparkles,
    titleEn: "Fun Lab",
    titleKh: "មន្ទីរពិសោធន៍សប្បាយ",
    categoryEn: "Science", categoryKh: "វិទ្យាសាស្ត្រ",
    descEn: "Quick science experiments you can do at home with cheap materials.",
    descKh: "ការពិសោធន៍វិទ្យាសាស្ត្ររហ័សដែលអាចធ្វើនៅផ្ទះដោយវត្ថុថោក។",
    keywordsEn: ["lab", "experiment", "experiments", "fun", "diy", "home science"],
    keywordsKh: ["ពិសោធន៍", "សប្បាយ", "ផ្ទះ"],
  },
  {
    id: "space",
    href: "/space",
    icon: Telescope,
    titleEn: "Space & Astronomy",
    titleKh: "អវកាស និងតារាសាស្ត្រ",
    categoryEn: "Science", categoryKh: "វិទ្យាសាស្ត្រ",
    descEn: "Planets, stars, black holes, and the search for life beyond Earth.",
    descKh: "ភព តារា រន្ធខ្មៅ និងការស្វែងរកជីវិតក្រៅផែនដី។",
    keywordsEn: ["space", "astronomy", "planet", "star", "stars", "galaxy", "black hole", "moon", "sun", "solar system", "rocket", "nasa", "universe"],
    keywordsKh: ["អវកាស", "តារាសាស្ត្រ", "ភព", "តារា", "ព្រះច័ន្ទ", "ព្រះអាទិត្យ", "សកលលោក"],
  },

  // ── DONATIONS / COMMUNITY ───────────────────────────────
  {
    id: "map",
    href: "/map",
    icon: MapPin,
    titleEn: "School Map",
    titleKh: "ផែនទីសាលា",
    categoryEn: "Community", categoryKh: "សហគមន៍",
    descEn: "Browse rural Cambodian schools by location and see what they need.",
    descKh: "រុករកសាលារៀននៅជនបទកម្ពុជាតាមទីតាំង និងមើលអ្វីដែលពួកគេត្រូវការ។",
    keywordsEn: ["map", "school", "schools", "location", "find school", "rural", "cambodia"],
    keywordsKh: ["ផែនទី", "សាលា", "ទីតាំង", "ជនបទ", "កម្ពុជា"],
  },
  {
    id: "needs",
    href: "/needs",
    icon: Heart,
    titleEn: "Browse Needs",
    titleKh: "រុករកតម្រូវការ",
    categoryEn: "Community", categoryKh: "សហគមន៍",
    descEn: "Active requests from schools — books, desks, computers, repairs.",
    descKh: "ការស្នើសុំសកម្មពីសាលា — សៀវភៅ តុ កុំព្យូទ័រ ការជួសជុល។",
    keywordsEn: ["donate", "donation", "give", "help", "need", "needs", "request", "support", "books", "supplies"],
    keywordsKh: ["ឧបត្ថម្ភ", "បរិច្ចាគ", "ជួយ", "តម្រូវការ", "សៀវភៅ"],
  },
  {
    id: "charities",
    href: "/charities",
    icon: Building2,
    titleEn: "Charity Directory",
    titleKh: "បញ្ជីអង្គការសប្បុរសធម៌",
    categoryEn: "Community", categoryKh: "សហគមន៍",
    descEn: "Verified NGOs working with rural Cambodian schools.",
    descKh: "អង្គការ NGO ដែលបានផ្ទៀងផ្ទាត់ ដែលធ្វើការជាមួយសាលាជនបទ។",
    keywordsEn: ["charity", "ngo", "non-profit", "organization", "directory"],
    keywordsKh: ["អង្គការ", "សប្បុរសធម៌", "NGO"],
  },
  {
    id: "projects",
    href: "/projects",
    icon: Users,
    titleEn: "Completed Projects",
    titleKh: "គម្រោងបញ្ចប់",
    categoryEn: "Community", categoryKh: "សហគមន៍",
    descEn: "See the impact: photos, stories, and outcomes of finished donations.",
    descKh: "មើលផលប៉ះពាល់៖ រូបថត រឿងរ៉ាវ និងលទ្ធផលនៃអំណោយដែលបានបញ្ចប់។",
    keywordsEn: ["completed", "projects", "results", "impact", "stories", "before after"],
    keywordsKh: ["គម្រោង", "បញ្ចប់", "លទ្ធផល"],
  },
  {
    id: "reading-list",
    href: "/reading-list",
    icon: BookMarked,
    titleEn: "Reading List",
    titleKh: "បញ្ជីសៀវភៅអាន",
    categoryEn: "Library", categoryKh: "បណ្ណាល័យ",
    descEn: "Curated books and articles for curious Cambodian students.",
    descKh: "សៀវភៅ និងអត្ថបទដែលបានជ្រើសរើសសម្រាប់សិស្សកម្ពុជាដែលចង់ដឹង។",
    keywordsEn: ["read", "reading", "book", "books", "library", "article", "literature"],
    keywordsKh: ["អាន", "សៀវភៅ", "បណ្ណាល័យ"],
  },
  {
    id: "exam-prep",
    href: "/exam-prep",
    icon: BookOpen,
    titleEn: "Exam Preparation",
    titleKh: "ត្រៀមប្រឡង",
    categoryEn: "Study", categoryKh: "សិក្សា",
    descEn: "Study guides and practice questions for the Bac II and university entry.",
    descKh: "ការណែនាំសិក្សា និងសំណួរអនុវត្តសម្រាប់ Bac II និងការចូលសាកលវិទ្យាល័យ។",
    keywordsEn: ["exam", "test", "bac", "bac ii", "university", "study", "practice", "preparation"],
    keywordsKh: ["ប្រឡង", "តេស្ត", "Bac", "សាកលវិទ្យាល័យ", "ត្រៀម"],
  },
];

/* ──────────────────────────────────────────────────────────── */

export type ScoredEntry = { entry: SearchEntry; score: number };

/**
 * Search the index. Case-insensitive. Works in both English and Khmer.
 * Scoring rewards: title prefix > exact keyword > title contains > keyword contains > category contains > desc contains.
 */
export function searchIndex(rawQuery: string, limit = 8): ScoredEntry[] {
  const q = rawQuery.trim().toLowerCase();
  if (q.length < 1) return [];

  const results: ScoredEntry[] = [];

  for (const entry of SEARCH_INDEX) {
    const titleEn = entry.titleEn.toLowerCase();
    const titleKh = entry.titleKh.toLowerCase();
    const descEn = entry.descEn.toLowerCase();
    const descKh = entry.descKh.toLowerCase();
    const catEn = entry.categoryEn.toLowerCase();
    const catKh = entry.categoryKh.toLowerCase();

    let score = 0;

    if (titleEn.startsWith(q) || titleKh.startsWith(q)) score += 100;
    else if (titleEn.includes(q) || titleKh.includes(q)) score += 50;

    for (const kw of entry.keywordsEn) {
      const k = kw.toLowerCase();
      if (k === q) score += 80;
      else if (k.startsWith(q)) score += 40;
      else if (k.includes(q) || q.includes(k)) score += 20;
    }
    for (const kw of entry.keywordsKh) {
      const k = kw.toLowerCase();
      if (k === q) score += 80;
      else if (k.startsWith(q)) score += 40;
      else if (k.includes(q) || q.includes(k)) score += 20;
    }

    if (catEn.includes(q) || catKh.includes(q)) score += 15;
    if (descEn.includes(q) || descKh.includes(q)) score += 8;

    if (score > 0) results.push({ entry, score });
  }

  results.sort((a, b) => b.score - a.score || a.entry.titleEn.localeCompare(b.entry.titleEn));
  return results.slice(0, limit);
}

/** A few popular suggestions to show when the search is empty. */
export const POPULAR_IDS = ["tech-how-computers-work", "launchpad", "biology-genetics-explorer", "physics", "english-writing", "geology"];
export const POPULAR_ENTRIES: SearchEntry[] =
  POPULAR_IDS.map((id) => SEARCH_INDEX.find((e) => e.id === id)!).filter(Boolean);
