import {
  Atom, Beaker, Cpu, Dna, Mountain, ShieldAlert, Briefcase, BookOpen,
  Pencil, GraduationCap, MapPin, Heart, Sparkles, Telescope, Calculator,
  Zap, Sun, Waves, Microscope, FlaskConical, Brain, Rocket, BookMarked,
  Building2, Users, FileText,
  Sigma, Music, Plane, Bot, Camera, Magnet, Wrench, Fuel, Thermometer,
  Gamepad2, HeartPulse, Leaf, Library, Compass, CloudRain, Shield, Bike,
  CheckCircle,
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

  // ── BEGINNER GUIDE (ESL kids) ────────────────────────────
  {
    id: "beginner-guide",
    href: "/beginner-guide",
    icon: BookOpen,
    titleEn: "Beginner English & Math Starter",
    titleKh: "មគ្គុទ្ទេសក៍ភាសាអង់គ្លេស និងគណិតវិទ្យា (ចាប់ផ្ដើម)",
    categoryEn: "Beginner", categoryKh: "ចាប់ផ្ដើម",
    descEn: "Alphabet A–Z with pictures, numbers 1–100, and a 100–1,000 number-builder for primary-school students.",
    descKh: "អក្ខរក្រម A–Z មានរូបភាព លេខ ១–១០០ និងឧបករណ៍សាងសង់លេខ ១០០–១,០០០ សម្រាប់សិស្សបឋមសិក្សា។",
    keywordsEn: ["alphabet", "abc", "letters", "primary", "kids", "children", "esl", "beginner", "starter", "counting", "numbers", "1 to 100", "100 to 1000", "kindergarten", "early learning"],
    keywordsKh: ["អក្ខរក្រម", "កុមារ", "បឋម", "ចាប់ផ្ដើម", "លេខ", "រាប់"],
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

  // ── MATHEMATICS ───────────────────────────────────────────
  {
    id: "mathematics",
    href: "/mathematics",
    icon: Sigma,
    titleEn: "Mathematics: The Language of Logic",
    titleKh: "គណិតវិទ្យា៖ ភាសានៃតក្កវិជ្ជា",
    categoryEn: "Study Center", categoryKh: "មជ្ឈមណ្ឌលសិក្សា",
    descEn: "A 5-part journey: 10-second mental-math trainer, balance-scale algebra puzzle, draggable right triangle with live sin/cos/tan, and a car-graph that explains derivatives and integrals.",
    descKh: "ដំណើរ ៥ ផ្នែក៖ Trainer គណិតក្នុងក្បាល ១០ វិនាទី, ល្បែងជញ្ជីងពិជគណិត, ត្រីកោណកែងអូសបាន និងក្រាហ្វិកឡានដែលពន្យល់ derivative និង integral។",
    keywordsEn: [
      "math", "maths", "mathematics", "mathematical", "logic",
      "algebra", "equation", "equations", "variable", "solve",
      "geometry", "shapes", "triangle", "right triangle", "pythagoras",
      "trigonometry", "trig", "sin", "cos", "tan", "sine", "cosine", "tangent",
      "calculus", "derivative", "derivatives", "integral", "integrals", "limit",
      "arithmetic", "mental math", "addition", "subtraction", "multiplication", "division",
      "graph", "function", "slope", "fraction", "decimal", "percentage", "ratio",
    ],
    keywordsKh: [
      "គណិត", "គណិតវិទ្យា", "ពីជគណិត", "ធរណីមាត្រ", "ត្រីកោណមាត្រ",
      "សមីការ", "អថេរ", "មុខងារ", "ដេរីវេ", "អាំងតេក្រាល",
      "ត្រីកោណ", "ត្រីកោណកែង", "ក្រាហ្វិក", "ចំនួន", "បូក", "ដក", "គុណ", "ចែក", "តក្កវិជ្ជា",
    ],
  },

  // ── STUDY CENTER ──────────────────────────────────────────
  {
    id: "art-of-learning",
    href: "/art-of-learning",
    icon: BookOpen,
    titleEn: "The Art of Learning",
    titleKh: "សិល្បៈនៃការរៀនសូត្រ",
    categoryEn: "Study Center", categoryKh: "មជ្ឈមណ្ឌលសិក្សា",
    descEn: "How to study smarter, understand learning differences, and see why education changed civilization.",
    descKh: "របៀបរៀនឲ្យឆ្លាតវៃ យល់ដឹងពីភាពខុសគ្នានៃការរៀន និងមើលថាហេតុអ្វីការអប់រំបានផ្លាស់ប្ដូរអរិយធម៌។",
    keywordsEn: ["learning", "study", "study skills", "memory", "memorize", "concentration", "focus", "education", "civilization", "dyslexia", "adhd", "learning differences", "how to learn"],
    keywordsKh: ["រៀន", "សិក្សា", "ការចងចាំ", "ការផ្ដោត", "ការអប់រំ", "សិល្បៈនៃការរៀន"],
  },
  {
    id: "spelling-forge",
    href: "/spelling-forge",
    icon: CheckCircle,
    titleEn: "The Spelling Forge",
    titleKh: "កម្មវិធីពិនិត្យអក្ខរាវិរុទ្ធ",
    categoryEn: "Language", categoryKh: "ភាសា",
    descEn: "Type any English word for instant green/red feedback with closest-match suggestions, then practice tricky homophones (to/too/two, their/there/they're) in a quick mini-game.",
    descKh: "វាយពាក្យអង់គ្លេសណាមួយដើម្បីទទួលការឆ្លើយតបបៃតង/ក្រហមភ្លាមៗ ព្រមទាំងការផ្ដល់យោបល់ជិតបំផុត និងហ្គេមតូចមួយដើម្បីហ្វឹកហាត់ពាក្យពិបាក (homophones)។",
    keywordsEn: ["spelling", "spell", "spell check", "spellcheck", "english", "homophones", "to too two", "their there they're", "vocabulary", "words", "dictionary"],
    keywordsKh: ["អក្ខរាវិរុទ្ធ", "ការប្រកប", "អង់គ្លេស", "ពាក្យ", "វចនានុក្រម"],
  },
  {
    id: "world-history",
    href: "/world-history",
    icon: Library,
    titleEn: "World History",
    titleKh: "ប្រវត្តិសាស្ត្រពិភពលោក",
    categoryEn: "Study Center", categoryKh: "មជ្ឈមណ្ឌលសិក្សា",
    descEn: "From the first cities to the modern world — empires, revolutions, and turning points.",
    descKh: "ពីទីក្រុងដំបូងរហូតដល់ពិភពលោកសម័យទំនើប — ចក្រភព បដិវត្ត និងចំណុចផ្លាស់ប្ដូរ។",
    keywordsEn: ["history", "world history", "ancient", "empire", "rome", "egypt", "china", "revolution", "war", "civilization", "khmer empire", "angkor"],
    keywordsKh: ["ប្រវត្តិសាស្ត្រ", "ពិភពលោក", "ចក្រភព", "បុរាណ", "សង្គ្រាម", "អង្គរ", "ខ្មែរ", "បដិវត្ត"],
  },
  {
    id: "global-cities",
    href: "/global-cities",
    icon: Plane,
    titleEn: "Global Cities & Landmarks",
    titleKh: "ទីក្រុងធំៗ និងតំបន់ល្បីៗលើពិភពលោក",
    categoryEn: "Study Center", categoryKh: "មជ្ឈមណ្ឌលសិក្សា",
    descEn: "A travel-journal tour of the world's biggest cities and most iconic landmarks, from Tokyo's Shibuya Crossing to Phnom Penh's Independence Monument.",
    descKh: "ដំណើរទេសចរណ៍តាមសៀវភៅធ្វើដំណើរ ទស្សនាទីក្រុងធំៗ និងតំបន់ល្បីៗបំផុតលើពិភពលោក ពីផ្លូវកាត់ស៊ីប៊ូយ៉ានៅតូក្យូ ដល់វិមានឯករាជ្យនៅភ្នំពេញ។",
    keywordsEn: ["city", "cities", "landmark", "landmarks", "travel", "tokyo", "paris", "new york", "london", "phnom penh", "geography", "tourism", "monument"],
    keywordsKh: ["ទីក្រុង", "តំបន់ល្បី", "ដំណើរកម្សាន្ត", "ភូមិសាស្ត្រ", "តូក្យូ", "ប៉ារីស", "ភ្នំពេញ", "វិមាន"],
  },
  {
    id: "philosophy",
    href: "/study-center/philosophy",
    icon: Compass,
    titleEn: "Philosophy",
    titleKh: "ទស្សនវិជ្ជា",
    categoryEn: "Study Center", categoryKh: "មជ្ឈមណ្ឌលសិក្សា",
    descEn: "The Map of Thinking — a 7-branch interactive compass plus a deep dive into Buddhist Philosophy and the Four Noble Truths.",
    descKh: "ផែនទីនៃការគិតមាន ៧ មែកធាងអន្តរកម្ម ព្រមទាំងការជ្រៅជ្រះអំពីពុទ្ធសាសនទស្សនវិជ្ជា និងអរិយសច្ច៤។",
    keywordsEn: ["philosophy", "philosopher", "ethics", "logic", "metaphysics", "buddhism", "buddhist", "four noble truths", "thinking", "wisdom", "socrates", "plato"],
    keywordsKh: ["ទស្សនវិជ្ជា", "ពុទ្ធសាសនា", "អរិយសច្ច", "ការគិត", "ប្រាជ្ញា", "សីលធម៌"],
  },
  {
    id: "sociology",
    href: "/study-center/sociology",
    icon: Users,
    titleEn: "Sociology",
    titleKh: "សង្គមវិទ្យា",
    categoryEn: "Study Center", categoryKh: "មជ្ឈមណ្ឌលសិក្សា",
    descEn: "The Science of Society — core concepts, the Veblen Lens on conspicuous consumption, and what sociologists really do.",
    descKh: "វិទ្យាសាស្ត្រនៃសង្គម — គោលគំនិតសំខាន់ៗ កែវយឹត Veblen លើការប្រើប្រាស់បង្ហាញឈ្មោះ និងអ្វីដែលអ្នកសង្គមវិទ្យាធ្វើពិតប្រាកដ។",
    keywordsEn: ["sociology", "society", "social", "culture", "veblen", "consumption", "class", "community", "social science"],
    keywordsKh: ["សង្គមវិទ្យា", "សង្គម", "វប្បធម៌", "សហគមន៍", "វិទ្យាសាស្ត្រសង្គម"],
  },

  // ── SCIENCE: more modules ─────────────────────────────────
  {
    id: "magnets",
    href: "/magnets",
    icon: Magnet,
    titleEn: "The Science of Magnets",
    titleKh: "វិទ្យាសាស្ត្រនៃមេដែក",
    categoryEn: "Physics", categoryKh: "រូបវិទ្យា",
    descEn: "Three types of magnetism, an interactive atomic-spin simulator, and a bar magnet whose invisible field lines you can reveal with iron filings.",
    descKh: "ប្រភេទមេដែកបី ការក្លែងសាកល្បងរង្វិលអាតូមអន្តរកម្ម និងមេដែកដំបងដែលអ្នកអាចបង្ហាញខ្សែដែនមើលមិនឃើញរបស់វាដោយកំទេចដែក។",
    keywordsEn: ["magnet", "magnets", "magnetism", "magnetic", "field", "iron", "ferromagnetic", "electromagnet", "north pole", "south pole", "physics", "science"],
    keywordsKh: ["មេដែក", "មេដែកអគ្គិសនី", "ដែន", "ដែក", "រូបវិទ្យា", "វិទ្យាសាស្ត្រ"],
  },
  {
    id: "quantum-limit",
    href: "/quantum-limit",
    icon: Atom,
    titleEn: "The Quantum Limit: Max Planck's Discovery",
    titleKh: "ដែនកំណត់កង់ទិច៖ ការរកឃើញរបស់ Max Planck",
    categoryEn: "Physics", categoryKh: "រូបវិទ្យា",
    descEn: "Energy comes in tiny packets. Tune a light beam to see E = hν, zoom from a human down to the Planck length, and meet the smallest possible moment of time.",
    descKh: "ថាមពលមកជាកញ្ចប់តូចៗ។ លៃតម្រូវធ្នឹមពន្លឺដើម្បីមើល E = hν ពង្រីកពីមនុស្សដល់ប្រវែង Planck និងស្គាល់ពេលខ្លីបំផុតដែលមាន។",
    keywordsEn: ["quantum", "quantum mechanics", "planck", "max planck", "photon", "energy", "wavelength", "frequency", "physics", "modern physics"],
    keywordsKh: ["កង់ទិច", "ខ្វានតូម", "Planck", "ថាមពល", "ហ្វូតុង", "រូបវិទ្យា"],
  },
  {
    id: "materials-science",
    href: "/science/materials",
    icon: Wrench,
    titleEn: "Materials Science: The Stuff of the World",
    titleKh: "វិទ្យាសាស្ត្រសម្ភារៈ៖ សារធាតុនៃពិភពលោក",
    categoryEn: "Science", categoryKh: "វិទ្យាសាស្ត្រ",
    descEn: "Inspect the Big Three (metals, polymers, ceramics & glass), pull and crush them in a live stress–strain workshop, and learn waste upcycling: bio-sand water filter, solar water heater, fly trap, and more.",
    descKh: "ពិនិត្យក្រុមធំទាំងបី (លោហៈ ប្លាស្ទិក សេរ៉ាមិច និងកញ្ចក់) ទាញ និងសង្កត់វាក្នុងសិក្ខាសាលាស្ត្រេស–បន្ទះផ្ទាល់ និងរៀនពីការកែច្នៃសំណល់៖ តម្រងទឹក គ្រឿងកម្ដៅទឹកថាមពលព្រះអាទិត្យ អន្ទាក់រុយ និងច្រើនទៀត។",
    keywordsEn: ["material", "materials", "materials science", "metal", "metals", "polymer", "polymers", "plastic", "ceramic", "ceramics", "glass", "stress", "strain", "ductile", "brittle", "tensile", "upcycling", "recycle", "recycling", "bio-sand filter", "water filter", "solar heater", "frugal engineering"],
    keywordsKh: ["សម្ភារៈ", "លោហៈ", "ប្លាស្ទិក", "សេរ៉ាមិច", "កញ្ចក់", "ស្ត្រេស", "បន្ទះ", "ការកែច្នៃ", "តម្រងទឹក", "ថាមពលព្រះអាទិត្យ", "វិស្វកម្មសន្សំសំចៃ"],
  },
  {
    id: "neurology",
    href: "/science/neurology",
    icon: Brain,
    titleEn: "Neurology: The Universe Inside",
    titleKh: "ប្រសាទវិទ្យា៖ សកលលោកខាងក្នុង",
    categoryEn: "Science", categoryKh: "វិទ្យាសាស្ត្រ",
    descEn: "Tap a glowing brain map, watch a chemical signal jump a synapse, and see how one night of REM sleep moves today's lesson into long-term memory.",
    descKh: "ចុចលើផែនទីខួរក្បាលភ្លឺ មើលសញ្ញាគីមីលោតឆ្លងស៊ីណាប និងមើលរបៀបដែលការគេង REM មួយយប់ផ្លាស់មេរៀនថ្ងៃនេះចូលទៅការចងចាំរយៈពេលវែង។",
    keywordsEn: ["brain", "neurology", "neuron", "neurons", "synapse", "neurotransmitter", "memory", "sleep", "rem", "nervous system", "psychology", "biology"],
    keywordsKh: ["ខួរក្បាល", "ប្រសាទ", "ប្រសាទវិទ្យា", "ស៊ីណាប", "ការចងចាំ", "ការគេង", "ចិត្តវិទ្យា", "ជីវវិទ្យា"],
  },
  {
    id: "fossil-fuels",
    href: "/fossil-fuels",
    icon: Fuel,
    titleEn: "Fossil Fuels: Ancient Energy",
    titleKh: "ប្រេងឥន្ធនៈហ្វូស៊ីល៖ ថាមពលបុរាណ",
    categoryEn: "Science", categoryKh: "វិទ្យាសាស្ត្រ",
    descEn: "Watch oil form over 300 million years, separate it in a fractionating tower, fire a 4-stroke piston, and break down what you actually pay at the pump — including the asphalt road under your feet.",
    descKh: "មើលប្រេងបង្កើតក្នុងរយៈពេល ៣០០ លានឆ្នាំ បំបែកវាក្នុងប៉មចម្រាញ់ បាញ់ស៊ីឡាំងបួនជំហាន និងបែងចែកអ្វីដែលអ្នកពិតជាបង់នៅស្ថានីយប្រេង — រួមទាំងផ្លូវអាស្វាល់នៅក្រោមជើងអ្នក។",
    keywordsEn: ["oil", "petroleum", "fossil fuel", "fossil fuels", "gas", "gasoline", "diesel", "engine", "piston", "refinery", "asphalt", "bitumen", "tar", "road", "fuel", "energy"],
    keywordsKh: ["ប្រេង", "ប្រេងឥន្ធនៈ", "ហ្វូស៊ីល", "ហ្គាស", "ម៉ាស៊ីន", "ស៊ីឡាំង", "ចម្រាញ់", "អាស្វាល់", "ប៊ីទុយម៉ែន", "ផ្លូវ", "ថាមពល"],
  },
  {
    id: "physics-bicycle",
    href: "/physics/bicycle",
    icon: Bike,
    titleEn: "Physics of the Bicycle",
    titleKh: "រូបវិទ្យានៃកង់",
    categoryEn: "Physics", categoryKh: "រូបវិទ្យា",
    descEn: "Gears, balance, friction and momentum — how a bicycle stays up and goes fast.",
    descKh: "ហ្វ្រាំង តុល្យភាព កក់ និងបរិមាណចលនា — របៀបដែលកង់ឈរបាន និងបើកលឿន។",
    keywordsEn: ["bicycle", "bike", "cycling", "gear", "gears", "balance", "wheel", "physics", "momentum"],
    keywordsKh: ["កង់", "ជិះកង់", "តុល្យភាព", "ហ្វ្រាំង", "កង់រថយន្ត", "រូបវិទ្យា"],
  },
  {
    id: "weather",
    href: "/weather",
    icon: CloudRain,
    titleEn: "Weather & Atmospheric Science",
    titleKh: "អាកាសធាតុ និងវិទ្យាសាស្ត្របរិយាកាស",
    categoryEn: "Science", categoryKh: "វិទ្យាសាស្ត្រ",
    descEn: "Trap CO₂ and watch the Earth glow red, crash a cold front into a warm one to make rain, build lightning inside a cloud, and meet hurricanes and tornadoes.",
    descKh: "ស្ទះ CO₂ ហើយមើលផែនដីចាំងពន្លឺក្រហម ប៉ះផ្ទៃខ្យល់ត្រជាក់ និងក្ដៅឱ្យកើតភ្លៀង សាងសង់រន្ទះក្នុងពពក និងស្គាល់ខ្យល់ព្យុះធំ និងខ្យល់ព្យុះក្រឡុក។",
    keywordsEn: ["weather", "climate", "rain", "storm", "lightning", "thunder", "hurricane", "typhoon", "tornado", "cloud", "atmosphere", "co2", "global warming", "climate change", "greenhouse"],
    keywordsKh: ["អាកាសធាតុ", "បរិយាកាស", "ភ្លៀង", "ព្យុះ", "រន្ទះ", "ខ្យល់ព្យុះ", "ពពក", "ភាវីឧស្ម័ន", "ការប្រែប្រួលអាកាសធាតុ"],
  },
  {
    id: "oceanography",
    href: "/oceanography",
    icon: Waves,
    titleEn: "Oceanography: The Blue Frontier",
    titleKh: "មហាសមុទ្រវិទ្យា៖ ព្រំដែនពណ៌ខៀវ",
    categoryEn: "Science", categoryKh: "វិទ្យាសាស្ត្រ",
    descEn: "Dive through the ocean's three zones, ride the global current conveyor belt, and meet the mangroves and reefs of Cambodia's coast.",
    descKh: "មុជឆ្លងកាត់តំបន់ ៣ នៃមហាសមុទ្រ ជិះខ្សែបង្វិលចរន្តពិភពលោក និងស្គាល់ព្រៃកោងកាង និងផ្កាថ្មសមុទ្រនៃឆ្នេរកម្ពុជា។",
    keywordsEn: ["ocean", "oceanography", "sea", "marine", "current", "tide", "coral", "reef", "mangrove", "fish", "coast", "salinity", "water"],
    keywordsKh: ["មហាសមុទ្រ", "សមុទ្រ", "ចរន្ត", "ផ្កាថ្ម", "ព្រៃកោងកាង", "ឆ្នេរ", "ត្រី"],
  },

  // ── ADDITIONAL CHEMISTRY ─────────────────────────────────
  {
    id: "chemistry-advanced",
    href: "/chemistry/advanced",
    icon: Microscope,
    titleEn: "Advanced Chemistry Concepts",
    titleKh: "គីមីវិទ្យាកម្រិតខ្ពស់",
    categoryEn: "Chemistry", categoryKh: "គីមីវិទ្យា",
    descEn: "Acids, bases, equilibrium, electrochemistry, and thermodynamics.",
    descKh: "អាស៊ីត បាស តុល្យភាព អេឡិចត្រូគីមី និងទែម៉ូឌីណាមិច។",
    keywordsEn: ["acid", "base", "ph", "equilibrium", "electrochemistry", "thermodynamics", "advanced chemistry", "redox"],
    keywordsKh: ["អាស៊ីត", "បាស", "តុល្យភាព", "អេឡិចត្រូគីមី", "ទែម៉ូឌីណាមិច", "កម្រិតខ្ពស់"],
  },
  {
    id: "chemistry-organic-101",
    href: "/chemistry/organic-101",
    icon: FlaskConical,
    titleEn: "Organic Chemistry 101",
    titleKh: "គីមីសរីរាង្គ ១០១",
    categoryEn: "Chemistry", categoryKh: "គីមីវិទ្យា",
    descEn: "Carbon, hydrocarbons, functional groups — the chemistry of life.",
    descKh: "កាបូន អ៊ីដ្រូកាបូន ក្រុមមុខងារ — គីមីនៃជីវិត។",
    keywordsEn: ["organic", "organic chemistry", "carbon", "hydrocarbon", "alkane", "alkene", "functional group", "biochemistry"],
    keywordsKh: ["សរីរាង្គ", "កាបូន", "អ៊ីដ្រូកាបូន", "ក្រុមមុខងារ", "ជីវគីមី"],
  },

  // ── TECHNOLOGY: more modules ──────────────────────────────
  {
    id: "tech-digital-safety",
    href: "/safety",
    icon: Shield,
    titleEn: "Digital Safety",
    titleKh: "សុវត្ថិភាពឌីជីថល",
    categoryEn: "Technology", categoryKh: "បច្ចេកវិទ្យា",
    descEn: "Spot phishing scams, forge unbreakable passwords, and trace your digital footprint.",
    descKh: "ស្គាល់ការបោកប្រាស់ phishing ផ្គុំពាក្យសម្ងាត់មិនអាចបំបាក់បាន និងតាមដានស្នាមជើងឌីជីថលរបស់អ្នក។",
    keywordsEn: ["digital safety", "online safety", "phishing", "scam", "password", "passwords", "security", "cyber", "cybersecurity", "privacy", "internet safety"],
    keywordsKh: ["សុវត្ថិភាពឌីជីថល", "ឌីជីថល", "ពាក្យសម្ងាត់", "សន្តិសុខ", "បោកប្រាស់", "អ៊ីនធឺណិត"],
  },
  {
    id: "cinematography",
    href: "/cinematography",
    icon: Camera,
    titleEn: "Cameras & Cinematography: The Science of Light",
    titleKh: "កាមេរ៉ា និងសិល្បៈភាពយន្ត៖ វិទ្យាសាស្ត្រនៃពន្លឺ",
    categoryEn: "Technology", categoryKh: "បច្ចេកវិទ្យា",
    descEn: "Trace photons through a camera lens, balance the exposure triangle to freeze a moving motorbike, and learn how filmmakers tell whole stories with three shot sizes.",
    descKh: "តាមដានពន្លឺឆ្លងកាត់កែវកាមេរ៉ា ផ្គុំត្រីកោណការថតឱ្យបង្ហាប់ម៉ូតូកំពុងធ្វើដំណើរ និងរៀនរបៀបដែលអ្នកថតភាពយន្តនិទានរឿងទាំងមូលដោយស៊ុមបី។",
    keywordsEn: ["camera", "cameras", "cinematography", "film", "filmmaking", "movie", "photography", "photo", "lens", "exposure", "iso", "aperture", "shutter", "light"],
    keywordsKh: ["កាមេរ៉ា", "សិល្បៈភាពយន្ត", "ភាពយន្ត", "ការថត", "កែវ", "ពន្លឺ", "រូបថត"],
  },
  {
    id: "hvac",
    href: "/hvac",
    icon: Thermometer,
    titleEn: "HVAC: Heating, Cooling & Ventilation",
    titleKh: "HVAC៖ ការកំដៅ ការត្រជាក់ និងខ្យល់ចេញចូល",
    categoryEn: "Technology", categoryKh: "បច្ចេកវិទ្យា",
    descEn: "Watch refrigerant cycle through an air conditioner, see how heaters glow red, and discover why ventilation keeps classrooms healthy.",
    descKh: "មើលរូបធាតុត្រជាក់ផ្លាស់ប្ដូរក្នុងម៉ាស៊ីនត្រជាក់ មើលឧបករណ៍កំដៅភ្លឺក្រហម និងរកឃើញហេតុអ្វីការបញ្ចេញខ្យល់ធ្វើឲ្យបន្ទប់រៀនមានសុខភាពល្អ។",
    keywordsEn: ["hvac", "air conditioner", "ac", "aircon", "heating", "cooling", "ventilation", "refrigerator", "fridge", "fan", "temperature", "thermostat"],
    keywordsKh: ["HVAC", "ម៉ាស៊ីនត្រជាក់", "ការកំដៅ", "ការត្រជាក់", "ខ្យល់", "ទូទឹកកក", "សីតុណ្ហភាព"],
  },
  {
    id: "aviation",
    href: "/aviation",
    icon: Plane,
    titleEn: "Aviation: How We Fly",
    titleKh: "អាកាសចរណ៍៖ របៀបដែលយើងហោះហើរ",
    categoryEn: "Technology", categoryKh: "បច្ចេកវិទ្យា",
    descEn: "See air particles race over an airfoil to make Lift, meet the Wright brothers, and click each of the four forces of flight on a real plane diagram.",
    descKh: "មើលភាគល្អិតខ្យល់រត់លើស្លាបយន្តហោះបង្កើតកម្លាំងលើក ស្គាល់បងប្អូន Wright និងចុចលើកម្លាំងបួននៃការហោះហើរលើតារាងយន្តហោះពិតប្រាកដ។",
    keywordsEn: ["aviation", "airplane", "plane", "flight", "fly", "flying", "wright brothers", "lift", "drag", "thrust", "weight", "airfoil", "wing", "pilot", "aerodynamics"],
    keywordsKh: ["អាកាសចរណ៍", "យន្តហោះ", "ការហោះហើរ", "ស្លាប", "Wright", "កម្លាំងលើក", "បើកបរយន្តហោះ"],
  },
  {
    id: "robotics",
    href: "/robotics",
    icon: Bot,
    titleEn: "Robotics: Machines That Think",
    titleKh: "រ៉ូបូតវិទ្យា៖ ម៉ាស៊ីនដែលចេះគិត",
    categoryEn: "Technology", categoryKh: "បច្ចេកវិទ្យា",
    descEn: "Run the Sense-Think-Act loop, click hotspots on a Build-a-Bot, and follow the 4-step engineering cycle from idea to working machine.",
    descKh: "ដំណើរការវដ្តយល់ឃើញ-គិត-ធ្វើសកម្មភាព ចុចចំណុចភ្លឺលើ Build-a-Bot និងអនុវត្តតាមវដ្តវិស្វកម្មបួនជំហាន។",
    keywordsEn: ["robot", "robots", "robotics", "ai", "artificial intelligence", "automation", "sensor", "actuator", "machine", "engineering", "stem"],
    keywordsKh: ["រ៉ូបូត", "រ៉ូបូតវិទ្យា", "បញ្ញាសិប្បនិម្មិត", "AI", "ម៉ាស៊ីន", "វិស្វកម្ម", "សិប្បនិម្មិត"],
  },
  {
    id: "video-games",
    href: "/video-games",
    icon: Gamepad2,
    titleEn: "Video Games: The Science of Play",
    titleKh: "បច្ចេកវិទ្យាហ្គេម៖ វិទ្យាសាស្ត្រនៃការលេង",
    categoryEn: "Technology", categoryKh: "បច្ចេកវិទ្យា",
    descEn: "Race a CPU against a GPU painting pixels, follow the Input → Update → Render game loop, and watch a 3D head get built from triangles, textures, and light.",
    descKh: "ប្រណាំង CPU ប្រឆាំងនឹង GPU ក្នុងការគូរភីកសែល ដើរតាមវដ្តហ្គេម និងមើលក្បាល 3D ត្រូវសាងសង់ពីត្រីកោណ វាយនភាព និងពន្លឺ។",
    keywordsEn: ["video game", "video games", "game", "games", "gaming", "gpu", "cpu", "pixel", "3d", "graphics", "render", "game loop", "esports"],
    keywordsKh: ["ហ្គេម", "ហ្គេមវីដេអូ", "ការលេងហ្គេម", "ភីកសែល", "ក្រាហ្វិក", "GPU", "CPU"],
  },

  // ── WELL-BEING ─────────────────────────────────────────────
  {
    id: "music-theory",
    href: "/music-theory",
    icon: Music,
    titleEn: "Music Theory & The Art of Sound",
    titleKh: "ទ្រឹស្តីតន្ត្រី និងសិល្បៈនៃសំឡេង",
    categoryEn: "Well-being", categoryKh: "សុខុមាលភាព",
    descEn: "An interactive journey through instrument families, chords with jobs, the magic of voice leading, polyrhythms, and a re-harmonized Twinkle Twinkle — with audio at every step.",
    descKh: "ដំណើរអន្តរកម្មកាត់គ្រួសារឧបករណ៍ភ្លេង, chord ដែលមានការងារ, voice leading, polyrhythm, និង Twinkle Twinkle ដែលបានរៀបចំឡើងវិញ — មានសំឡេងគ្រប់ជំហាន។",
    keywordsEn: ["music", "music theory", "song", "sound", "chord", "chords", "scale", "rhythm", "melody", "harmony", "instrument", "piano", "guitar", "note", "notes"],
    keywordsKh: ["តន្ត្រី", "ទ្រឹស្តីតន្ត្រី", "ភ្លេង", "សំឡេង", "បទចម្រៀង", "ឧបករណ៍ភ្លេង", "ព្យាណូ", "ហ្គីតា", "នូត"],
  },
  {
    id: "sanctuary",
    href: "/sanctuary",
    icon: Leaf,
    titleEn: "Sanctuary: Adolescence & Mental Well-being",
    titleKh: "សន្តិភាព៖ វ័យជំទង់ និងសុខភាពផ្លូវចិត្ត",
    categoryEn: "Well-being", categoryKh: "សុខុមាលភាព",
    descEn: "A safe space for understanding adolescence — body changes, emotions, friendships, stress, and how to ask for help.",
    descKh: "តំបន់សុវត្ថិភាពមួយដើម្បីយល់ដឹងពីវ័យជំទង់ — ការផ្លាស់ប្ដូររាងកាយ អារម្មណ៍ មិត្តភាព ភាពតានតឹង និងរបៀបស្នើជំនួយ។",
    keywordsEn: ["sanctuary", "adolescence", "teenager", "teen", "puberty", "emotion", "emotions", "stress", "anxiety", "mental health", "wellbeing", "well-being", "feelings", "friendship"],
    keywordsKh: ["សន្តិភាព", "វ័យជំទង់", "អារម្មណ៍", "ភាពតានតឹង", "សុខភាពផ្លូវចិត្ត", "សុខុមាលភាព", "មិត្តភាព"],
  },
  {
    id: "sexual-health",
    href: "/sexual-health",
    icon: HeartPulse,
    titleEn: "Sexual Health & Pathogen Protection",
    titleKh: "សុខភាពផ្លូវភេទ និងការការពារមេរោគ",
    categoryEn: "Well-being", categoryKh: "សុខុមាលភាព",
    descEn: "Anatomy, consent, contraception, and how to protect against HIV, hepatitis and other infections.",
    descKh: "កាយវិភាគវិទ្យា ការយល់ព្រម ការពន្យារកំណើត និងរបៀបការពារពី HIV ហ៊ីប៉ាទីត និងការឆ្លងផ្សេងៗ។",
    keywordsEn: ["sexual health", "sex", "sex education", "puberty", "contraception", "condom", "hiv", "aids", "sti", "std", "pregnancy", "consent", "anatomy", "reproduction"],
    keywordsKh: ["សុខភាពផ្លូវភេទ", "ផ្លូវភេទ", "ការពន្យារកំណើត", "HIV", "ការឆ្លង", "ការយល់ព្រម", "មានផ្ទៃពោះ"],
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
