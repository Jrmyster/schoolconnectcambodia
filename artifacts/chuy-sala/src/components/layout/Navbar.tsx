import { Link, useLocation } from "wouter";
import {
  Map, Heart, CheckCircle, Menu, X, PlusCircle, LogIn, LogOut,
  GraduationCap, Handshake, BookOpen, Leaf, Star,
  Shield, Rocket, ChevronDown, Compass, Library, FlaskConical, Smile, User, Sun, Columns3, Dna,
  Activity, Banknote, Wrench, Globe, Zap, Atom, Beaker, Microscope, Sparkles, PersonStanding, PenLine, Mountain, LifeBuoy, Cpu, Binary, Waves, Camera, CloudRain, Thermometer, HeartPulse, Plane, Magnet, Music, Sigma, Fuel, Bike, Bot, Gamepad2, Users, Brain, Dumbbell, Hexagon, Diamond, FlaskRound, Building2, Snowflake, Train, ScrollText, Landmark, Network, Trees, Radar as RadarIcon, Flag, Radiation, Tv, Languages as LanguagesIcon, BrainCircuit, Factory, Bug, Pill, Radio, Lock, Eye, Car, Skull, Split, Disc3, Unlink, Gauge, Presentation, Construction, Droplet, Droplets, Hourglass, PawPrint, Pickaxe, Fan, Flame, Lightbulb, Sprout, Blocks, Search, Box, Ship, Briefcase, FileText, MessageSquare, Calculator, Telescope, Hammer, Apple, Baby,
} from "lucide-react";
import { useState, useRef, useEffect, useId, useLayoutEffect, ComponentType } from "react";
import { createPortal } from "react-dom";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import { useAuth } from "@/context/AuthContext";
import { NotificationBell } from "@/components/NotificationBell";
import { ThemePalette } from "@/components/ThemePalette";
import { GlobalSearch } from "@/components/GlobalSearch";
import { InstallAppButton } from "@/components/InstallAppButton";
import { LiveStudentCounter, LiveStudentCounterCompact } from "@/components/layout/LiveStudentCounter";

// ── Types ─────────────────────────────────────────────────────────────────────

type NavItem = {
  href: string;
  labelEn: string;
  labelKh: string;
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  external?: boolean;
  descEn?: string;
  descKh?: string;
};

// ── Semantic category color system ────────────────────────────────────────────
// Each top-level dropdown owns a category color. The trigger pill uses a soft
// tinted bg + bold colored text by default, then fills with the solid vibrant
// color and switches text to white on hover / when the dropdown is open or its
// section is the current route. Class strings are static literals so Tailwind's
// content scanner picks them up at build time.
type NavGroupColor = "slate" | "orange" | "violet" | "blue" | "cyan" | "lime" | "emerald";

const COLOR_THEMES: Record<NavGroupColor, { default: string; active: string }> = {
  slate:   { default: "bg-slate-500/10 text-slate-700 hover:bg-slate-700 hover:text-white",       active: "bg-slate-700 text-white shadow-md shadow-slate-900/15" },
  orange:  { default: "bg-orange-500/15 text-orange-700 hover:bg-orange-600 hover:text-white",    active: "bg-orange-600 text-white shadow-md shadow-orange-700/25" },
  violet:  { default: "bg-violet-500/10 text-violet-700 hover:bg-violet-600 hover:text-white",    active: "bg-violet-600 text-white shadow-md shadow-violet-700/25" },
  blue:    { default: "bg-blue-500/10 text-blue-700 hover:bg-blue-600 hover:text-white",          active: "bg-blue-600 text-white shadow-md shadow-blue-700/25" },
  cyan:    { default: "bg-cyan-500/15 text-cyan-800 hover:bg-cyan-700 hover:text-white",          active: "bg-cyan-700 text-white shadow-md shadow-cyan-800/25" },
  lime:    { default: "bg-lime-500/20 text-lime-800 hover:bg-lime-700 hover:text-white",          active: "bg-lime-700 text-white shadow-md shadow-lime-800/25" },
  emerald: { default: "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-700 hover:text-white", active: "bg-emerald-700 text-white shadow-md shadow-emerald-800/25" },
};

type NavGroup = {
  labelEn: string;
  labelKh: string;
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  items: NavItem[];
  /**
   * Semantic category color for this top-level dropdown. Drives the pill's
   * default tinted background, default text color, and the solid hover/active
   * fill. Defaults to "slate" if omitted.
   */
  color?: NavGroupColor;
  /**
   * Optional URL prefix(es) that scope the "active" highlight for this
   * dropdown. When set, the dropdown is highlighted ONLY when the current
   * pathname matches one of these prefixes (with a clean `/` boundary).
   * When omitted, we fall back to per-item matching.
   *
   * Use this for groups (like Well-being) that contain cross-cutting links
   * to pages that conceptually live elsewhere (e.g. /science, /music-theory),
   * to prevent the dropdown from lighting up on those unrelated pages.
   */
  basePaths?: string[];
};

// ── Active-state matching ─────────────────────────────────────────────────────
// Returns true if `location` is exactly `prefix` or sits underneath it
// (next char is `/`). Prevents `/well-being-other` from matching `/well-being`.
function pathMatchesPrefix(location: string, prefix: string): boolean {
  if (!prefix || prefix === "/") return location === "/";
  return location === prefix || location.startsWith(prefix + "/");
}

function isItemActive(location: string, item: NavItem): boolean {
  // External links (https://…) can never match an in-app pathname.
  if (item.external) return false;
  if (!item.href.startsWith("/")) return false;
  return pathMatchesPrefix(location, item.href);
}

function isGroupActiveFor(location: string, group: NavGroup): boolean {
  if (group.basePaths && group.basePaths.length > 0) {
    return group.basePaths.some((bp) => pathMatchesPrefix(location, bp));
  }
  return group.items.some((item) => isItemActive(location, item));
}

// ── Groups ─────────────────────────────────────────────────────────────────────

const NAV_GROUPS: NavGroup[] = [
  {
    labelEn: "Explore",
    labelKh: "រុករក",
    icon: Compass,
    color: "slate",
    items: [
      { href: "/",          labelEn: "Home",        labelKh: "ទំព័រដើម",  icon: Heart },
      { href: "/map",       labelEn: "Map",          labelKh: "ផែនទី",     icon: Map },
      { href: "/needs",     labelEn: "Browse Needs", labelKh: "តម្រូវការ", icon: Heart },
      { href: "/projects",  labelEn: "Completed",    labelKh: "បានបញ្ចប់", icon: CheckCircle },
      {
        href: "/cambodia",
        labelEn: "Cambodia: The Heart of Southeast Asia",
        labelKh: "កម្ពុជា៖ បេះដូងនៃអាស៊ីអាគ្នេយ៍",
        icon: Landmark,
        descEn: "A heritage tour of the country: the river that flows two ways, Angkor's barays still visible from space, the 74-letter Khmer alphabet, and the thinkers who modernised it.",
        descKh: "ដំណើរទស្សនាបេតិកភណ្ឌប្រទេស ៖ ទន្លេដែលហូរពីរទិស បារាយណ៍អង្គរដែលនៅមើលឃើញពីលំហ អក្សរខ្មែរ ៧៤ តួ និងអ្នកប្រាជ្ញដែលបានធ្វើឲ្យវាទាន់សម័យ។",
      },
    ],
  },
  {
    labelEn: "Resources",
    labelKh: "ធនធាន",
    icon: Library,
    color: "violet",
    items: [
      { href: "/launchpad", labelEn: "Scholarships", labelKh: "អាហារូបករណ៍", icon: BookOpen },
      {
        href: "/launchpad/universities",
        labelEn: "Universities in Cambodia",
        labelKh: "សាកលវិទ្យាល័យនៅកម្ពុជា",
        icon: Building2,
        descEn: "Where to Apply — a directory of the top 5 national public universities in Cambodia and what they are famous for teaching: RUPP (science, humanities, IT, foreign languages), ITC / Sala Techno (engineering, architecture, computer science), RUA (agronomy, veterinary medicine, food science), RULE (law, public administration, finance), and NUM (business, accounting, entrepreneurship). Each card links out to the university's official website and Facebook page.",
        descKh: "កន្លែងដែលត្រូវដាក់ពាក្យ — បញ្ជីសាកលវិទ្យាល័យសាធារណៈជាតិកំពូលទាំង ៥ នៅកម្ពុជា និងអ្វីដែលពួកគេល្បីល្បាញក្នុងការបង្រៀន ៖ RUPP (វិទ្យាសាស្ត្រ មនុស្សសាស្ត្រ បច្ចេកវិទ្យាព័ត៌មាន ភាសាបរទេស), ITC / សាលាតិចណូ (វិស្វកម្ម ស្ថាបត្យកម្ម វិទ្យាសាស្ត្រកុំព្យូទ័រ), RUA (កសិកម្ម វេជ្ជសាស្ត្រសត្វ វិទ្យាសាស្ត្រអាហារ), RULE (នីតិសាស្ត្រ រដ្ឋបាលសាធារណៈ ហិរញ្ញវត្ថុ), និង NUM (ពាណិជ្ជកម្ម គណនេយ្យ សហគ្រិនភាព)។ កាតនីមួយៗភ្ជាប់ទៅគេហទំព័រផ្លូវការ និងទំព័រ Facebook របស់សាកលវិទ្យាល័យ។",
      },
      { href: "/charities", labelEn: "Partners",      labelKh: "ដៃគូ",          icon: Handshake },
      { href: "/alumni",    labelEn: "Alumni",         labelKh: "រឿងជោគជ័យ",   icon: Star },
      { href: "/reading-list", labelEn: "Reading List", labelKh: "បញ្ជីសៀវភៅអាន", icon: BookOpen },
    ],
  },
  {
    labelEn: "Study Center",
    labelKh: "មជ្ឈមណ្ឌលសិក្សា",
    icon: FlaskConical,
    color: "blue",
    items: [
      { href: "/exam-prep",             labelEn: "Exam Prep",        labelKh: "ត្រៀមប្រឡង",           icon: GraduationCap },
      { href: "/art-of-learning",       labelEn: "The Art of Learning", labelKh: "សិល្បៈនៃការរៀនសូត្រ",   icon: BookOpen, descEn: "How to study smarter, understand learning differences, and see why education changed civilization.", descKh: "របៀបរៀនឲ្យឆ្លាតវៃ យល់ដឹងពីភាពខុសគ្នានៃការរៀន និងមើលថាហេតុអ្វីការអប់រំបានផ្លាស់ប្ដូរអរិយធម៌។" },
      {
        href: "/pathway-to-medicine",
        labelEn: "Pathway to Medicine",
        labelKh: "ផ្លូវទៅកាន់វិជ្ជាជីវៈពេទ្យ",
        icon: HeartPulse,
        descEn: "The 10–15-year journey from high-school biology to becoming a doctor — plus an interactive guide to choosing your specialty.",
        descKh: "ដំណើរ ១០–១៥ ឆ្នាំពីជីវវិទ្យាវិទ្យាល័យ ដល់ការក្លាយជាវេជ្ជបណ្ឌិត — ព្រមទាំងមគ្គុទ្ទេសក៍អន្តរកម្មសម្រាប់ជ្រើសរើសឯកទេសរបស់អ្នក។",
      },
      {
        href: "/future-hub/university-guide",
        labelEn: "University Survival Guide",
        labelKh: "មគ្គុទ្ទេសក៍សម្រាប់និស្សិតឆ្នាំទី១",
        icon: GraduationCap,
        descEn: "Four hard truths that turn your first semester from a panic into a plan: the illusion of free time, the syllabus is the law, office hours, and homesickness.",
        descKh: "ការពិតពិបាក ៤ ដែលប្រែឆមាសទីមួយរបស់អ្នកពីការភ័យស្លន់ស្លោទៅជាគម្រោង៖ ការបំភាន់នៃពេលវេលាទំនេរ គម្រោងកម្មវិធីសិក្សាគឺជាច្បាប់ ម៉ោងពិគ្រោះយោបល់ និងការនឹករលឹកផ្ទះ។",
      },
      { href: "/english-writing",       labelEn: "English Writing",  labelKh: "ការសរសេរភាសាអង់គ្លេស", icon: PenLine },
      {
        href: "/english-writing/public-speaking",
        labelEn: "How to Give a Presentation",
        labelKh: "របៀបធ្វើការបង្ហាញ",
        icon: Presentation,
        descEn: "Public Speaking & Presentations — three rules to walk onto a stage and own the room: YOU are the presentation (the 6×6 slide rule), the classic three-part structure (Hook → Rule of Three → Call to Action), and body language and voice (eye contact + speak 20% louder & 20% slower).",
        descKh: "ការនិយាយជាសាធារណៈ និងការបង្ហាញ — ច្បាប់បីដើម្បីដើរចូលឆាក និងគ្រប់គ្រងបន្ទប់៖ អ្នកគឺជាការបង្ហាញ (ច្បាប់ស្លាយ ៦×៦), រចនាសម្ព័ន្ធបុរាណបីផ្នែក (ការទាក់ទាញ → ច្បាប់នៃចំណុចបី → ការសន្និដ្ឋាន), និងកាយវិការនិងសំឡេង (សម្លឹងភ្នែក + និយាយខ្លាំងជាង ២០% និងយឺតជាង ២០%)។",
      },
      {
        href: "/study-center/wildlife-explorer",
        labelEn: "Wildlife Explorer: Zoo Animals",
        labelKh: "ការរុករកសត្វព្រៃ៖ សត្វសួនសត្វ",
        icon: Leaf,
        descEn: "A bilingual flashcard deck of zoo animals with one-tap audio in English and Khmer — built for younger learners.",
        descKh: "ឈុតកាតវាក្យសព្ទពីរភាសាអំពីសត្វសួនសត្វ ជាមួយសំឡេងចុចម្ដងបានភ្លាមៗជាភាសាអង់គ្លេស និងខ្មែរ — សម្រាប់អ្នករៀនវ័យក្មេង។",
      },
      {
        href: "/study-center/galactic-grammar",
        labelEn: "Galactic Grammar: Voice Adventure",
        labelKh: "វេយ្យាករណ៍អវកាស៖ ដំណើរផ្សងព្រេងតាមសំឡេង",
        icon: Rocket,
        descEn: "A sci-fi voice game: hold the mic, speak English to a Ship's Computer, get instant grammar corrections, fluency tips, and a story that continues based on what you say.",
        descKh: "ហ្គេមសំឡេងបែបវិទ្យាសាស្ត្រប្រឌិត៖ ចុចម៉ៃក្រូ និយាយភាសាអង់គ្លេសទៅកាន់កុំព្យូទ័រកប៉ាល់អវកាស ទទួលបានការកែតម្រូវវេយ្យាករណ៍ភ្លាមៗ គន្លឹះនៃភាពស្ទាត់ជំនាញ និងរឿងដែលបន្តទៅតាមអ្វីដែលអ្នកនិយាយ។",
      },
      {
        href: "/study-center/dinosaur-extinction",
        labelEn: "Dinosaurs & Extinction",
        labelKh: "ឌីណូស័រ និងការផុតពូជ",
        icon: Skull,
        descEn: "Flip interactive fossil cards of T-Rex, Triceratops, Stegosaurus and Spinosaurus, then walk through the Chicxulub asteroid impact step by step — and meet the bird-like dinosaurs that survived.",
        descKh: "ត្រឡប់កាតហ្វូស៊ីលអន្តរកម្មនៃ ទីរ៉ាណូសូរ៉ិច ទ្រីសេរ៉ាតូប ស្ទេហ្គោសូរ និងស្ពីណូសូរ បន្ទាប់មកដើរឆ្លងកាត់ការបុកទង្គិចនៃអាចម៍ផ្កាយឈីកស៊ូឡុបជាជំហានៗ — និងជួបឌីណូស័រស្រដៀងសត្វស្លាបដែលបានរស់រាន។",
      },
      {
        href: "/study-center/antarctica",
        labelEn: "Antarctica & Earth Extremes",
        labelKh: "អង់តាក់ទិក និងភាពខ្លាំងក្លានៃផែនដី",
        icon: Snowflake,
        descEn: "The Frozen Desert: a continent under 2 km of ice that holds 70% of Earth's fresh water, ruled by no nation under the 1959 Antarctic Treaty, with 6 months of daylight and 6 months of total darkness.",
        descKh: "វាលខ្សាច់ទឹកកក៖ ទ្វីបមួយនៅក្រោមទឹកកកកំរាស់ ២ គីឡូម៉ែត្រ ដែលស្តុកទុក ៧០% នៃទឹកសាបនៃផែនដី គ្មានជាតិសាសន៍ណាគ្រប់គ្រងក្រោមសន្ធិសញ្ញាអង់តាក់ទិកឆ្នាំ ១៩៥៩ ជាមួយ ៦ ខែពន្លឺថ្ងៃ និង ៦ ខែងងឹត។",
      },
      {
        href: "/study-center/puzzles",
        labelEn: "🧩 The Mind Gym: Logic & Puzzles",
        labelKh: "🧩 កន្លែងហ្វឹកហាត់ខួរក្បាល៖ តក្កវិជ្ជា និងល្បែងប្រាជ្ញា",
        icon: Brain,
        descEn: "Train the muscle between your ears with 9 bilingual brain teasers across three difficulty tiers — pattern recognition, lateral-thinking riddles, and classic algorithmic-logic puzzles. Confetti included.",
        descKh: "ហ្វឹកហាត់សាច់ដុំរវាងត្រចៀករបស់អ្នកជាមួយល្បែងផ្គុំខួរក្បាល ៩ ជាពីរភាសាក្នុងកម្រិតពិបាកបី — ការសម្គាល់លំនាំ សំណួរប្រើការគិតបែបច្នៃប្រឌិត និងល្បែងតក្កវិជ្ជាបុរាណ។ មានកញ្ចែឆ្នោតផងដែរ។",
      },
      {
        href: "/spelling-forge",
        labelEn: "The Spelling Forge",
        labelKh: "កម្មវិធីពិនិត្យអក្ខរាវិរុទ្ធ",
        icon: CheckCircle,
        descEn: "Type any English word for instant green/red feedback with closest-match suggestions, then practice tricky homophones (to/too/two, their/there/they're) in a quick mini-game.",
        descKh: "វាយពាក្យអង់គ្លេសណាមួយដើម្បីទទួលការឆ្លើយតបបៃតង/ក្រហមភ្លាមៗ ព្រមទាំងការផ្ដល់យោបល់ជិតបំផុត និងហ្គេមតូចមួយដើម្បីហ្វឹកហាត់ពាក្យពិបាក (homophones)។",
      },
      { href: "https://khmervoc.com",   labelEn: "Vocational Guide", labelKh: "មគ្គុទ្ទេសក៍វិជ្ជាជីវៈ", icon: Wrench, external: true },
      { href: "https://anatomykh.com",  labelEn: "Human Anatomy",    labelKh: "រូបកាយវិភាគវិទ្យា",      icon: PersonStanding, external: true },
      {
        href: "/study-center/linguistics",
        labelEn: "Linguistics: The Architecture of Thought",
        labelKh: "ភាសាវិទ្យា៖ ស្ថាបត្យកម្មនៃការគិត",
        icon: ScrollText,
        descEn: "The three pillars of word science (linguistics, semantics, etymology), the 'map is not the territory' insight, and the pioneers — Sir William Jones who linked Sanskrit to Latin, and Lord Monboddo who dared to argue language was invented by humans.",
        descKh: "សសរស្តម្ភទាំងបីនៃវិទ្យាសាស្ត្រពាក្យ (ភាសាវិទ្យា អត្ថន័យវិទ្យា និរុត្តិវិទ្យា) ការយល់ឃើញថា «ផែនទីមិនមែនជាទឹកដី» និងអ្នកត្រួសត្រាយផ្លូវ — លោក Sir William Jones ដែលបានភ្ជាប់សំស្ក្រឹតទៅឡាតាំង និងលោក Lord Monboddo ដែលហ៊ានអះអាងថាភាសាត្រូវបានបង្កើតឡើងដោយមនុស្ស។",
      },
      {
        href: "/study-center/languages",
        labelEn: "Languages of the World: The Human Tapestry",
        labelKh: "ភាសានៅជុំវិញពិភពលោក៖ ផ្ទាំងគំនូរនៃមនុស្សជាតិ",
        icon: LanguagesIcon,
        descEn: "About 7,100 living languages on Earth, why Papua New Guinea alone has 800+ of them, the four giant tongues, the quiet emergency of one language dying every two weeks, the three different kinds of writing system humans invented (alphabet, logogram, abugida — including our own Khmer with the world's longest alphabet), and why Spanish and Italian feel like cousins while Basque has no relatives at all.",
        descKh: "ភាសារស់ប្រហែល ៧,១០០ នៅលើផែនដី ហេតុអ្វីប៉ាពួញូហ្គីណេតែឯងមានជាង ៨០០ ភាសាយក្សបួន បញ្ហាបន្ទាន់ស្ងាត់នៃភាសាមួយស្លាប់រៀងរាល់ ២ សប្ដាហ៍ ប្រព័ន្ធសរសេរបីផ្សេងគ្នាដែលមនុស្សបង្កើត (អក្ខរក្រម ឡូហ្គូក្រាម អប៊ូហ្គីដា — រួមទាំងភាសាខ្មែររបស់យើងដែលមានអក្ខរក្រមវែងបំផុតលើពិភពលោក) និងហេតុអ្វីអេស្ប៉ាញ និងអ៊ីតាលីមានអារម្មណ៍ដូចបងប្អូនជីដូនមួយ ខណៈពេលដែលបាស្ក៍គ្មានសាច់ញាតិទាល់តែសោះ។",
      },
      { href: "/world-history",         labelEn: "World History",     labelKh: "ប្រវត្តិសាស្ត្រពិភពលោក",  icon: Library },
      {
        href: "/study-center/history/roman-empire",
        labelEn: "The Roman Empire",
        labelKh: "ចក្រភពរ៉ូម",
        icon: Landmark,
        descEn: "Rise, Rule, and Ruin — how a small republic with iron-discipline legions, 400,000 km of roads, and a new material called concrete grew into the ancient world's superpower under emperors like Augustus, Trajan, Marcus Aurelius and Constantine, then split in 395 CE so the western half collapsed into the Dark Ages while Byzantium endured another 1,000 years.",
        descKh: "ការ​កកើត ​ការ​គ្រប់​គ្រង ​និង​ការ​ដួល​រលំ — របៀប​ដែល​សាធារណរដ្ឋ​តូច​មួយ​មាន​កង​ល្បាន​វិន័យ​ដែក ​ផ្លូវ ៤០០,០០០ គ.ម. ​និង​សម្ភារៈ​ថ្មី​ឈ្មោះ​បេតុង ​បាន​លូត​លាស់​ទៅ​ជា​មហាអំណាច​នៃ​ពិភព​បុរាណ​ក្រោម​អធិរាជ​ដូច​ជា​អូហ្គូស្ទុស ត្រាចាន ម៉ាកុស អូរ៉េលៀស និង​កុងស្តង់ទីន ​បន្ទាប់​មក​បំបែក​ជា​ពីរ​នៅ​ឆ្នាំ ៣៩៥ ​គ.ស. ​ដែល​ផ្នែក​ខាង​លិច​ដួល​រលំ​ចូល​យុគ​ងងឹត ខណៈ​ផ្នែក​បីហ្សង់ទីន​នៅ​ស្ថិត​ស្ថេរ​មួយ​ពាន់​ឆ្នាំ​ទៀត។",
      },
      {
        href: "/study-center/ancient-professions",
        labelEn: "Ancient Professions & Lost Arts",
        labelKh: "វិជ្ជាជីវៈបុរាណ និង សិល្បៈដែលបាត់បង់",
        icon: Hammer,
        descEn: "A guided tour through the workshops of the ancient world — the blacksmith's forge, the leatherworker's tannin vats, the weaver's loom; the chisels and corbel arches that built Angkor Wat without a single crane; and the lost wisdom of celestial navigation and Persian wind catchers that cooled houses to 25°C without electricity.",
        descKh: "ដំណើរទស្សនកិច្ចតាមរោងជាងបុរាណ — ឡារបស់ជាងដែក អាងសម្រួលស្បែករបស់ជាងស្បែក កីត្បាញរបស់អ្នកត្បាញ; ដែកគាស់ និងខ្ទមកោប ដែលបានសាងសង់ប្រាសាទអង្គរវត្តដោយគ្មានគ្រែនមួយ; និងប្រាជ្ញាដែលបាត់បង់នៃការធ្វើនាវាចរណ៍តាមផ្កាយ និងអ្នកចាប់ខ្យល់ពែស៊ី ដែលធ្វើឲ្យផ្ទះត្រជាក់ដោយគ្មានអគ្គិសនី។",
      },
      {
        href: "/global-cities",
        labelEn: "Global Cities & Landmarks",
        labelKh: "ទីក្រុងធំៗ និងតំបន់ល្បីៗលើពិភពលោក",
        icon: Plane,
        descEn: "A travel-journal tour of the world's biggest cities and most iconic landmarks, from Tokyo's Shibuya Crossing to Phnom Penh's Independence Monument.",
        descKh: "ដំណើរទេសចរណ៍តាមសៀវភៅធ្វើដំណើរ ទស្សនាទីក្រុងធំៗ និងតំបន់ល្បីៗបំផុតលើពិភពលោក ពីផ្លូវកាត់ស៊ីប៊ូយ៉ានៅតូក្យូ ដល់វិមានឯករាជ្យនៅភ្នំពេញ។",
      },
      {
        href: "/study-center/philosophy",
        labelEn: "Philosophy",
        labelKh: "ទស្សនវិជ្ជា",
        icon: Compass,
        descEn: "The Map of Thinking — a 7-branch interactive compass plus a deep dive into Buddhist Philosophy and the Four Noble Truths.",
        descKh: "ផែនទីនៃការគិតមាន ៧ មែកធាងអន្តរកម្ម ព្រមទាំងការជ្រៅជ្រះអំពីពុទ្ធសាសនទស្សនវិជ្ជា និងអរិយសច្ច៤។",
      },
      {
        href: "/study-center/europe",
        labelEn: "Europe & The EU: 3000 Years of History",
        labelKh: "អឺរ៉ុប និងសហភាពអឺរ៉ុប៖ ប្រវត្តិសាស្ត្រ ៣០០០ ឆ្នាំ",
        icon: Columns3,
        descEn: "A vertical timeline of Rome → Middle Ages & Renaissance → Industrial Revolution & World Wars → the EU peace experiment, plus fast facts on the 27-state union, the Euro, and the Schengen open-borders zone.",
        descKh: "ពេលវេលាបញ្ឈរនៃរ៉ូម → មជ្ឈិមសម័យ និងយុគរស់ឡើងវិញ → បដិវត្តន៍ឧស្សាហកម្ម និងសង្គ្រាមលោក → ការពិសោធន៍សន្តិភាពនៃសហភាពអឺរ៉ុប ព្រមទាំងការពិតរហ័សអំពីសហភាព ២៧ រដ្ឋ រូបិយប័ណ្ណអឺរ៉ូ និងតំបន់សិនជេនគ្មានព្រំដែន។",
      },
      {
        href: "/study-center/africa",
        labelEn: "Africa & The AU: The Giant Continent",
        labelKh: "អាហ្វ្រិក និងសហភាពអាហ្វ្រិក៖ ទ្វីបដ៏ធំល្វឹងល្វើយ",
        icon: Globe,
        descEn: "The world's second-largest continent in three lessons: a Mediterranean-Sahara geography of extremes (the Sahara is almost the size of the USA!), 1.4 billion people across 54 countries with megacities Cairo, Lagos & Johannesburg, and the African Union — 55 nations bound by one peace-and-trade experiment.",
        descKh: "ទ្វីបធំទីពីរនៃពិភពលោកក្នុងមេរៀនបី ៖ ភូមិសាស្ត្រ​មេឌីទែរ៉ាណេ-សាហារ៉ានៃភាពអស្ចារ្យ (សាហារ៉ាស្ទើរតែស្មើនឹងសហរដ្ឋអាមេរិក!) ប្រជាជន ១,៤ ពាន់លាននាក់នៅក្នុង ៥៤ ប្រទេស ដោយមានទីក្រុងធំៗកៃរ៉ូ ឡាកូស និងចូហានណេសបឺក និងសហភាពអាហ្វ្រិក — ៥៥ ប្រជាជាតិដែលត្រូវបានចងភ្ជាប់ដោយការពិសោធន៍សន្តិភាព និងពាណិជ្ជកម្មមួយ។",
      },
      {
        href: "/study-center/asia",
        labelEn: "Discover Asia: The Giant Continent",
        labelKh: "ស្វែងយល់អំពីអាស៊ី៖ ទ្វីបដ៏ធំ",
        icon: Globe,
        descEn: "The largest continent on Earth in three vivid lessons: 4.7 billion people across 48 countries (60% of all humanity), the cradle of civilization where farming, cities, and writing were invented thousands of years before Rome, and the planet's physical extremes — Mount Everest at +8,848 m and the Dead Sea at −430 m below sea level.",
        descKh: "ទ្វីបធំបំផុតលើផែនដីក្នុងមេរៀន​បីដ៏រស់រវើក ៖ ប្រជាជន ៤,៧ ពាន់លាននាក់ នៅក្នុង ៤៨ ប្រទេស (៦០% នៃមនុស្សជាតិទាំងមូល), ប្រភពដើមនៃអរិយធម៌ដែលកសិកម្ម ទីក្រុង និងការសរសេរត្រូវបានបង្កើតរាប់ពាន់ឆ្នាំមុនចក្រភពរ៉ូម, និងចំណុចកំពូលរូបវន្តនៃផែនដី — ភ្នំអេវឺរ៉េស +៨,៨៤៨ ម៉ែត្រ និងសមុទ្រមរណៈ −៤៣០ ម៉ែត្រក្រោមកម្រិតទឹកសមុទ្រ។",
      },
      {
        href: "/study-center/global-atlas",
        labelEn: "World Directory 🌍",
        labelKh: "បញ្ជីប្រទេសពិភពលោក 🌍",
        icon: Globe,
        descEn: "The Global Atlas: an offline-first directory of 50 countries with bilingual names, flags, capitals, populations, languages, religions, GDP, literacy, wildlife, landmarks and a fun fact for each — searchable by name and filterable by continent.",
        descKh: "សៀវភៅផែនទីពិភពលោក៖ បញ្ជីអូហ្វឡាញនៃប្រទេសចំនួន ៥០ ដែលមានឈ្មោះពីរភាសា ទង់ជាតិ រាជធានី ប្រជាជន ភាសា សាសនា ផលិតផលក្នុងស្រុក អត្រាអក្ខរកម្ម សត្វព្រៃ ស្ថាបត្យកម្ម និងការពិតកម្សាន្ត — ស្វែងរកតាមឈ្មោះ និងច្រោះតាមទ្វីប។",
      },
      {
        href: "/geography/latin-america",
        labelEn: "South & Central America: The Connected Continents",
        labelKh: "អាមេរិកខាងត្បូង និងកណ្តាល៖ ទ្វីបដែលតភ្ជាប់គ្នា",
        icon: Mountain,
        descEn: "A massive land bridge from Mexico to Argentina in three lessons: 650+ million people across 27 countries with the legacy of the Maya, Aztec & Inca pyramid civilizations; the Andes — the longest mountain range on Earth — and the Amazon, the planet's largest rainforest and 'Lungs of the Earth'; and the engineering marvel of the Panama Canal, where giant water locks lift 50,000-ton cargo ships over the mountains using only gravity.",
        descKh: "ស្ពានដីដ៏ធំពីប្រទេសមិកស៊ិកដល់អាហ្សង់ទីនក្នុងមេរៀនបី ៖ ប្រជាជនជាង ៦៥០ លាននាក់នៅក្នុង ២៧ ប្រទេស ជាមួយនឹងបេតិកភណ្ឌនៃអរិយធម៌ពីរ៉ាមីត ម៉ាយ៉ា អាស្ទែក និងអាំងកា; ជួរភ្នំអង់ដេស — ជួរភ្នំវែងបំផុតលើផែនដី — និងព្រៃអាម៉ាហ្សូន ព្រៃភ្លៀងធំបំផុតនៃភពផែនដី និង 'សួតនៃផែនដី'; និងស្នាដៃវិស្វកម្មនៃព្រែកជីកប៉ាណាម៉ា ដែលព្រែករូបទឹកយក្សលើកកប៉ាល់ដឹកទំនិញ ៥០,០០០ តោន ឆ្លងលើភ្នំដោយប្រើតែទំនាញ។",
      },
      {
        href: "/study-center/flags",
        labelEn: "Global Flags & Vexillology",
        labelKh: "ទង់ជាតិពិភពលោក និងវ៉ិចស៊ីឡូឡូជី",
        icon: Flag,
        descEn: "Vexillology: The Language of Flags — the scientific study of every flag in the world. Learn the 5 Basic Rules of Good Flag Design (keep it simple, meaningful symbolism, 2–3 colours, no lettering, be distinctive) and see how Cambodia proudly breaks Rule #4 by putting Angkor Wat on its flag — making it the most uniquely recognizable flag on Earth. Then browse a live, searchable gallery of all 190+ countries pulled straight from the REST Countries API: filter by continent, search by name, and explore every flag, capital, and region on the planet.",
        descKh: "វ៉ិចស៊ីឡូឡូជី ៖ ភាសានៃទង់ជាតិ — ការសិក្សាបែបវិទ្យាសាស្ត្រអំពីទង់ជាតិទាំងអស់នៅលើពិភពលោក។ រៀនច្បាប់មូលដ្ឋានទាំង ៥ នៃការរចនាទង់ជាតិល្អ (សាមញ្ញ និមិត្តរូបជ្រាលជ្រៅ ពណ៌មូលដ្ឋាន ២-៣ គ្មានអក្សរ មានលក្ខណៈប្លែកពីគេ) ហើយឃើញរបៀបដែលកម្ពុជាបានបំបែកច្បាប់ទី ៤ ដោយមោទនភាព ដោយដាក់ប្រាសាទអង្គរវត្តលើទង់ជាតិ — ធ្វើឱ្យវាក្លាយជាទង់ជាតិដែលមានលក្ខណៈប្លែកមិនអាចយល់ច្រឡំបាននៅលើផែនដី។ បន្ទាប់មកស្វែងរកនៅក្នុងវិចិត្រសាលផ្ទាល់នៃប្រទេសជាង ១៩០ ដែលទាញមកដោយផ្ទាល់ពី REST Countries API ៖ ច្រោះតាមទ្វីប ស្វែងរកតាមឈ្មោះ និងស្វែងយល់រាល់ទង់ជាតិ រាជធានី និងតំបន់នៅលើភពផែនដី។",
      },
      {
        href: "/study-center/coordinates",
        labelEn: "Reading Coordinates: Latitude & Longitude",
        labelKh: "ការអានកូអរដោនេ៖ រយៈទទឹង និងរយៈបណ្តោយ",
        icon: Compass,
        descEn: "The invisible grid humans drew over the planet: latitude lines as a flat ladder from the Equator (0°) up to 90°N or down to 90°S; longitude lines as orange-slice meridians measured East/West from the Prime Meridian through Greenwich (0°); and the 2,200-year history from Eratosthenes to John Harrison's 1700s Marine Chronometer that finally solved the longitude problem (the Earth spins 15° every hour).",
        descKh: "ក្រឡា​ចត្រង្គ​ដែល​មើល​មិន​ឃើញ​ដែល​មនុស្ស​បាន​គូរ​លើ​ភពផែនដី ៖ ខ្សែ​រយៈ​ទទឹង​ជា​ជណ្ដើរ​ផ្ដេក​ពី​ខ្សែ​អេក្វាទ័រ (០°) ឡើង​ដល់ ៩០°N ឬ​ចុះ​ដល់ ៩០°S; ខ្សែ​រយៈ​បណ្តោយ​ជា​ចំណិត​ក្រូច​ឆ្មារ​វាស់​ខាង​កើត/លិច ពី​ខ្សែ​មេដ្យាន​ទី​សូន្យ​ឆ្លង​កាត់​ហ្គ្រីនវិច (០°); និង​ប្រវត្តិ​សាស្ត្រ ២,២០០ ឆ្នាំ​ពី​អេរ៉ាតូស្ថែន ដល់​នាឡិកា​សមុទ្រ​របស់​ចន ហារីសុន​នៅ​សតវត្សរ៍​ទី ១៨ ដែល​បាន​ដោះស្រាយ​បញ្ហា​រយៈ​បណ្តោយ​ជា​ស្ថាពរ (ផែនដី​បង្វិល ១៥° ក្នុង​មួយ​ម៉ោង)។",
      },
      {
        href: "/philosophy/language",
        labelEn: "Language & Reality: Escaping the 'Is' Trap",
        labelKh: "ភាសា និងការពិត៖ ការគេចចេញពីអន្ទាក់នៃពាក្យ 'គឺ'",
        icon: Lock,
        descEn: "Aristotelian language locks the world with the verb 'is'. Korzybski's Non-Aristotelian language (E-Prime) replaces it with action, perspective, and time — and gives us a translation matrix from rigid verdicts to honest observations.",
        descKh: "ភាសាអារីស្តូតចាក់សោពិភពលោកដោយប្រើពាក្យ 'គឺ'។ ភាសាមិនមែនអារីស្តូតរបស់ Korzybski (E-Prime) ជំនួសវាដោយសកម្មភាព ទស្សនវិស័យ និងពេលវេលា — និងផ្តល់ឱ្យយើងនូវម៉ាទ្រីសបកប្រែពីការវិនិច្ឆ័យដាច់ខាត ទៅជាការសង្កេតស្មោះត្រង់។",
      },
      {
        href: "/study-center/sociology",
        labelEn: "Sociology",
        labelKh: "សង្គមវិទ្យា",
        icon: Users,
        descEn: "The Science of Society — core concepts, the Veblen Lens on conspicuous consumption, and what sociologists really do.",
        descKh: "វិទ្យាសាស្ត្រនៃសង្គម — គោលគំនិតសំខាន់ៗ កែវយឹត Veblen លើការប្រើប្រាស់បង្ហាញឈ្មោះ និងអ្វីដែលអ្នកសង្គមវិទ្យាធ្វើពិតប្រាកដ។",
      },
      {
        href: "/study-center/anthropology",
        labelEn: "Anthropology: The Human Story",
        labelKh: "នរវិទ្យា៖ រឿងរ៉ាវរបស់មនុស្សជាតិ",
        icon: Globe,
        descEn: "What makes us human — the four-field science of archaeology, biology, language, and culture; the pioneers Boas, Mead, and Ibn Khaldun; and the ultimate thesis that culture and environment, not biology, shape macro-human behavior.",
        descKh: "អ្វីដែលធ្វើឱ្យយើងជាមនុស្ស — វិទ្យាសាស្ត្របួនវិស័យ ៖ បុរាណវិទ្យា ជីវវិទ្យា ភាសា និងវប្បធម៌; អ្នកត្រួសត្រាយ Boas, Mead និង Ibn Khaldun; និងទ្រឹស្តីចុងក្រោយថា វប្បធម៌និងបរិស្ថាន មិនមែនជីវវិទ្យា គឺជាកត្តាបង្កើតអាកប្បកិរិយារបស់មនុស្សទូទៅ។",
      },
      {
        href: "/study-center/pandemics-history",
        labelEn: "Pandemics & Triumphs: The History of Disease",
        labelKh: "ជំងឺរាតត្បាត និងជ័យជម្នះ៖ ប្រវត្តិសាស្ត្រនៃជំងឺ",
        icon: Pill,
        descEn: "Three sections of medical history: the Ancient Plagues (Biblical disasters, the Black Death, and Leprosy), the Viral Invaders (Yellow Fever, Influenza, Polio with full disease profile cards), and the Ultimate Victory — the WHO eradication of Smallpox, the only human disease ever 100% wiped out.",
        descKh: "បីផ្នែកនៃប្រវត្តិវេជ្ជសាស្ត្រ ៖ ជំងឺរាតត្បាតបុរាណ (ជំងឺក្នុងព្រះគម្ពីរ ជំងឺប៉េស្ត ជំងឺឃ្លង់) ភ្នាក់ងារចម្លងវីរុស (ជំងឺគ្រុនលឿង ផ្ដាសាយ ស្វិតដៃជើង) និងជ័យជម្នះចុងក្រោយ — ការលុបបំបាត់ជំងឺអុតធំដោយ WHO ដែលជាជំងឺមនុស្សតែមួយគត់ដែលត្រូវបានលុបបំបាត់ ១០០%។",
      },
      {
        href: "/study-center/moving-humanity",
        labelEn: "Moving Humanity: From Stairs to Teleportation",
        labelKh: "ចលនាមនុស្សជាតិ៖ ពីជណ្ដើរ ដល់ការបញ្ជូនរូបធាតុ",
        icon: Atom,
        descEn: "A progressive journey through the physics of moving people — the inclined-plane physics of stairs, the hidden counterweight that makes elevators almost free to run, the continuous-motion genius of escalators and transveyors, and finally the real science (plus the haunting philosophical question) of quantum teleportation.",
        descKh: "ដំណើរវឌ្ឍនភាពឆ្លងកាត់រូបវិទ្យានៃការផ្លាស់ទីមនុស្ស — រូបវិទ្យាផ្ទៃជម្រាលនៃជណ្ដើរ ទម្ងន់ផ្ទុយលាក់ដែលធ្វើឱ្យជណ្ដើរយន្តប្រើថាមពលតិចបំផុត ភាពប៉ិនប្រសប់នៃចលនាបន្តរបស់ជណ្ដើរយន្តរំកិល និងចុងក្រោយ វិទ្យាសាស្ត្រពិត (បូកនឹងសំណួរទស្សនវិជ្ជា) នៃការបញ្ជូនរូបធាតុកង់ទិច។",
      },
      {
        href: "/study-center/authority-conformity",
        labelEn: "Authority & Conformity: The Science of Obedience",
        labelKh: "អំណាច និងការស្របតាមសង្គម ៖ វិទ្យាសាស្ត្រនៃការស្តាប់បង្គាប់",
        icon: Zap,
        descEn: "Solomon Asch's line-length experiment shows ~37 % of normal people will deny what their eyes see to fit in with a confident group. Stanley Milgram's 1961 Yale experiment shows that 65 % of ordinary, decent adults will keep pressing a 450-volt shock switch as long as a man in a white coat says 'the experiment requires that you continue.' This module unpacks both, explains Milgram's 'Agentic State' theory of how the moral switch flips, and gives a 5-question critical-thinking kit as the antidote to blind obedience.",
        descKh: "ការពិសោធន៍បន្ទាត់របស់ Solomon Asch បង្ហាញថា មនុស្សធម្មតា ~៣៧% នឹងបដិសេធអ្វីដែលភ្នែករបស់ខ្លួនឃើញ ដើម្បីស្របជាមួយក្រុមដែលប្រកបដោយទំនុកចិត្ត។ ការពិសោធន៍ឆ្នាំ ១៩៦១ របស់ Stanley Milgram នៅ Yale បង្ហាញថា មនុស្សពេញវ័យធម្មតាល្អៗ ៦៥% នឹងបន្តចុចស្វិចតង់ស្យុង ៤៥០ វុល តរាប់បុរសស្លៀកអាវពណ៌សនិយាយថា «ការពិសោធន៍ទាមទារឲ្យអ្នកបន្ត»។ មុខវិជ្ជានេះពន្យល់ការពិសោធន៍ទាំងពីរ ទ្រឹស្ដី «ស្ថានភាពធ្វើតាមបញ្ជា» របស់ Milgram និងផ្ដល់ឧបករណ៍គិតពិចារណា ៥ សំណួរជាដំណោះស្រាយប្រឆាំងការស្តាប់បង្គាប់ងងឹត។",
      },
      {
        href: "/study-center/competition-cooperation",
        labelEn: "Competition vs. Cooperation",
        labelKh: "ការប្រកួតប្រជែង និងកិច្ចសហប្រតិបត្តិការ",
        icon: Network,
        descEn: "The Social Operating System — zero-sum vs positive-sum games, the Space Race, the expanding circle of cooperation, the Resource-Based Economy thought experiment, and Cambodian Pravas Dai mutual aid.",
        descKh: "ប្រព័ន្ធប្រតិបត្តិការសង្គម — ហ្គេមផលសរុបសូន្យ ទល់នឹងវិជ្ជមាន ការប្រកួតប្រជែងអវកាស រង្វង់នៃកិច្ចសហប្រតិបត្តិការដែលពង្រីក សេដ្ឋកិច្ចផ្អែកលើធនធាន និងប្រវ៉ាស់ដៃខ្មែរ។",
      },
      {
        href: "/study-center/behaviorism",
        labelEn: "Behaviorism: The Architecture of Action",
        labelKh: "អាកប្បកិរិយាវិទ្យា៖ ស្ថាបត្យកម្មនៃសកម្មភាព",
        icon: Brain,
        descEn: "Tabula Rasa and the nature-vs-nurture debate, Pavlov's bell and Skinner's box, and how the Cambodian Sampeah is a beautiful example of culture conditioning a whole society.",
        descKh: "Tabula Rasa និងការជជែកធម្មជាតិ-ទល់នឹង-ការចិញ្ចឹមបីបាច់ កណ្ដឹង Pavlov និងប្រអប់ Skinner និងរបៀបដែលសំពះជាឧទាហរណ៍ដ៏ស្រស់ស្អាតនៃវប្បធម៌កំពុងផ្សារភ្ជាប់សង្គមទាំងមូល។",
      },
      {
        href: "/study-center/united-states",
        labelEn: "The United States: History, Geography, and Culture",
        labelKh: "សហរដ្ឋអាមេរិក៖ ប្រវត្តិសាស្ត្រ ភូមិសាស្ត្រ និងវប្បធម៌",
        icon: Flag,
        descEn: "Tabbed deep-dive: 50 states map and Great Lakes, the Founding Story (Jamestown to Bill of Rights), four major cultural holidays, Mount Rushmore, and a searchable list of all 46 presidents.",
        descKh: "ការសិក្សាជ្រៅតាមផ្ទាំង ៖ ផែនទី ៥០ រដ្ឋ និងស្រះធំ ប្រវត្តិបង្កើត (Jamestown ដល់សិទ្ធិមូលដ្ឋាន) ថ្ងៃឈប់សម្រាកវប្បធម៌ធំៗ ៤ ភ្នំ Rushmore និងបញ្ជីប្រធានាធិបតី ៤៦ នាក់ដែលអាចស្វែងរក។",
      },
      {
        href: "/study-center/global-conflicts",
        labelEn: "Global Conflicts & The Atomic Age",
        labelKh: "ជម្លោះសកល និងយុគសម័យបរមាណូ",
        icon: Radiation,
        descEn: "World War I and the trenches, World War II's two theaters, the Manhattan Project and E=mc², the Cold War's Mutually Assured Destruction, and the spread of nuclear weapons from 1945 to today.",
        descKh: "សង្គ្រាមលោកលើកទី ១ និងលំហដី សង្គ្រាមលោកលើកទី ២ និងរោងមហោស្រព ២ គម្រោងម៉ាន់ហាតាន់ និង E=mc² សង្គ្រាមត្រជាក់ និង MAD និងការរីករាលនុយក្លេអ៊ែរពីឆ្នាំ ១៩៤៥ ដល់សព្វថ្ងៃ។",
      },
      {
        href: "/study-center/global-diplomacy",
        labelEn: "Global Diplomacy: International Relations",
        labelKh: "ការទូតសកល៖ ទំនាក់ទំនងអន្តរជាតិ",
        icon: Handshake,
        descEn: "How nations communicate, trade, and resolve conflicts without going to war. Define foreign relations and the treaties that govern shared water, trade, and climate; understand what an embassy is (a 'mini-country' inside a foreign nation) and what an ambassador does (the official voice of their head of state); and discover the 'soft power' of language, technology, and student exchange.",
        descKh: "របៀបដែលប្រជាជាតិ ទាក់ទងគ្នា ជួញដូរ និងដោះស្រាយជម្លោះ ដោយមិនធ្វើសង្គ្រាម។ កំណត់និយមន័យទំនាក់ទំនងការបរទេស និងសន្ធិសញ្ញាដែលគ្រប់គ្រងទឹករួម ពាណិជ្ជកម្ម និងអាកាសធាតុ យល់អំពីស្ថានទូត («ប្រទេសតូច» នៅខាងក្នុងប្រជាជាតិបរទេស) និងឯកអគ្គរដ្ឋទូត (សំឡេងផ្លូវការនៃប្រមុខរដ្ឋ) និងស្វែងយល់អំពី «អំណាចទន់» នៃភាសា បច្ចេកវិទ្យា និងការផ្លាស់ប្តូរនិស្សិត។",
      },
      {
        href: "/study-center/entrepreneurship",
        labelEn: "Entrepreneurship & Innovation",
        labelKh: "សហគ្រិនភាព និងនវានុវត្តន៍",
        icon: Rocket,
        descEn: "Entrepreneurship: Building the Future — what an entrepreneur really is (a problem solver, not a salesman), why money is the byproduct of creating value, why tenacity beats raw talent, and why a single individual with a better idea can replace whole inefficient systems.",
        descKh: "សហគ្រិនភាព៖ ការកសាងអនាគត — តើសហគ្រិនពិតប្រាកដជាអ្វី (អ្នកដោះស្រាយបញ្ហា មិនមែនអ្នកលក់) ហេតុអ្វីប្រាក់គឺជាផលបន្ទាប់បន្សំនៃការបង្កើតតម្លៃ ហេតុអ្វីភាពអត់ធ្មត់ឈ្នះទេពកោសល្យ និងហេតុអ្វីបុគ្គលម្នាក់ដែលមានគំនិតល្អជាង អាចជំនួសប្រព័ន្ធគ្មានប្រសិទ្ធភាពទាំងមូល។",
      },
    ],
  },
  {
    labelEn: "Science",
    labelKh: "វិទ្យាសាស្ត្រ",
    icon: Atom,
    color: "cyan",
    items: [
      {
        href: "/science/scale-of-universe",
        labelEn: "The Scale of the Universe",
        labelKh: "ទំហំនៃចក្រវាឡ",
        icon: Telescope,
        descEn: "An interactive 'Powers of Ten' zoom from a single proton (10⁻¹⁵ m) to the edge of the observable universe (10²⁶ m) — through nine milestones including hydrogen atoms, red blood cells, ants, Earth, the Solar System, and the Milky Way galaxy.",
        descKh: "ការពង្រីកអន្តរកម្ម 'គោលដប់' ពីប្រូតុងតែមួយ (១០⁻¹⁵ ម) ដល់គែមនៃចក្រវាឡដែលអាចមើលឃើញ (១០²⁶ ម) — ឆ្លងកាត់ ៩ ចំណុចសំខាន់ រួមទាំងអាតូមអ៊ីដ្រូសែន កោសិកាឈាមក្រហម ស្រមោច ផែនដី ប្រព័ន្ធព្រះអាទិត្យ និងកាឡាក់ស៊ីផ្លូវទឹកដោះ។",
      },
      {
        href: "/science/disproven-theories",
        labelEn: "Disproven Theories",
        labelKh: "ទ្រឹស្ដីដែលត្រូវបានច្រានចោល",
        icon: Hourglass,
        descEn: "The Graveyard of Bad Maps — eleven once-respected scientific theories (Four Elements, Phlogiston, Aether, Geocentrism, Phrenology, Martian Canals…) that were eventually shattered by new evidence, framed by Thomas Kuhn's idea of the paradigm shift.",
        descKh: "ទីបញ្ចុះសពនៃផែនទីខុស — ទ្រឹស្ដីវិទ្យាសាស្ត្រដែលធ្លាប់ត្រូវបានគោរពចំនួន ១១ (ធាតុបួន ផ្លូជីស្ដុន អេទែរ ផែនដីជាចំណុចកណ្តាល លលាដ៍ក្បាល ប្រឡាយលើភពអង្គារ…) ដែលត្រូវបានបំបែកដោយភស្តុតាងថ្មី តាមរយៈគំនិតការផ្លាស់ប្តូរគំរូរបស់ Thomas Kuhn។",
      },
      {
        href: "/science/women-in-science",
        labelEn: "Women in Science: The Pioneers",
        labelKh: "ស្ត្រីក្នុងវិស័យវិទ្យាសាស្ត្រ៖ អ្នកត្រួសត្រាយផ្លូវ",
        icon: Sparkles,
        descEn: "Four trailblazing women — Marie Curie (radioactivity & two Nobel Prizes), Rosalind Franklin (the X-ray photograph that revealed DNA's double helix), Tu Youyou (the malaria cure that saves millions), and Katherine Johnson (the math that sent humans to the Moon) — plus an inspiration message: Cambodia needs your mind.",
        descKh: "ស្ត្រីអ្នកត្រួសត្រាយផ្លូវចំនួនបួននាក់ — ម៉ារី គុយរី (វិទ្យុសកម្ម និងរង្វាន់ណូបែលពីរ) រ៉ូហ្សាលីន ហ្វ្រែងឃ្លីន (រូបថតកាំរស្មីអ៊ិចដែលបង្ហាញរូបរាងកំសៀវកំសៀរនៃ DNA) ទូ យូយូ (ថ្នាំព្យាបាលគ្រុនចាញ់ដែលជួយសង្គ្រោះមនុស្សរាប់លាននាក់) និង ខាថឺរីន ចនសុន (គណិតវិទ្យាដែលបញ្ជូនមនុស្សទៅព្រះច័ន្ទ) — ព្រមទាំងសារបំផុសគំនិត៖ ប្រទេសកម្ពុជាត្រូវការបញ្ញារបស់អ្នក។",
      },
      {
        href: "/science/fourier-transform",
        labelEn: "Fourier Transformation: The Secret Recipe of Waves",
        labelKh: "ការបំប្លែង Fourier៖ រូបមន្តសម្ងាត់នៃរលក",
        icon: Activity,
        descEn: "The math that 'tastes' a complex signal and tells you exactly which pure tones (frequencies) are inside it — explained with the smoothie analogy, the Time vs Frequency view, and the three places it changed the world: MP3 music, MRI medical imaging, and Wi-Fi.",
        descKh: "គណិតវិទ្យាដែល 'ភ្លក់' សញ្ញាស្មុគស្មាញ ហើយប្រាប់អ្នកថាតើមានសំឡេងសុទ្ធ (ប្រេកង់) មួយណាខ្លះនៅខាងក្នុង — ពន្យល់ដោយការប្រៀបធៀបជាមួយទឹកក្រឡុក ទិដ្ឋភាពពេលវេលា ធៀបនឹងប្រេកង់ និងកន្លែងបីដែលវាបានផ្លាស់ប្តូរពិភពលោក៖ តន្ត្រី MP3 រូបភាពពេទ្យ MRI និង Wi-Fi។",
      },
      {
        href: "/science/energy-future",
        labelEn: "Renewable & Future Energies",
        labelKh: "ថាមពលកកើតឡើងវិញ និងអនាគត",
        icon: Zap,
        descEn: "Powering Spaceship Earth — solar, wind, hydro, geothermal, nuclear fission, the thorium fuel cycle, piezoelectric floor tiles, and the speculative frontier of fusion and space-based solar.",
        descKh: "ការផ្តល់ថាមពលដល់ផែនដី — ព្រះអាទិត្យ ខ្យល់ វារីអគ្គិសនី កម្ដៅផែនដី ប្រតិកម្មបំបែកនុយក្លេអ៊ែរ វដ្តឥន្ធនៈថូរីយ៉ូម ក្រឡាសម្ពាធ និងព្រំដែនអនាគតនៃការរលាយ និងថាមពលពីអវកាស។",
      },
      {
        href: "/science/entomology",
        labelEn: "Entomology: The Micro-Engineers of Cambodia",
        labelKh: "បាណកសាស្ត្រ៖ វិស្វករខ្នាតតូចនៃប្រទេសកម្ពុជា",
        icon: Bug,
        descEn: "The 3-2-6-2 anatomy rule, the local engineers (weaver ants, silkworms, giant water bugs), and why the mosquito is the deadliest animal on Earth.",
        descKh: "ច្បាប់រចនាសម្ព័ន្ធ ៣-២-៦-២ វិស្វករក្នុងស្រុក (ស្រមោចត្បាញ ដង្កូវនាង មមាចទឹកធំ) និងហេតុអ្វីបានជាមូសគឺជាសត្វមហន្តរាយបំផុតលើផែនដី។",
      },
      {
        href: "/science/pharmacology",
        labelEn: "Pharmacology & Pharmacy",
        labelKh: "ឱសថសាស្ត្រ និង ឱសថស្ថាន",
        icon: Pill,
        descEn: "How medicines work — pharmacokinetics (what the body does to the drug) vs pharmacodynamics (the lock-and-key model) — plus the 4-step roadmap to becoming a licensed pharmacist in Cambodia.",
        descKh: "របៀបដែលថ្នាំដំណើរការ — ឱសថចលនសាស្ត្រ (អ្វីដែលរាងកាយធ្វើចំពោះថ្នាំ) ធៀបនឹង ឱសថរលកសាស្ត្រ (គំរូសោ-កូនសោ) — និងផ្លូវបួនជំហានឆ្ពោះទៅកាន់ឱសថការីមានអាជ្ញាប័ណ្ណនៅកម្ពុជា។",
      },
      {
        href: "/chemistry",
        labelEn: "Chemistry Hub",
        labelKh: "មជ្ឈមណ្ឌលគីមីវិទ្យា",
        icon: Beaker,
        descEn: "Atoms, reactions, and chemistry in daily life — in 4 modules.",
        descKh: "អាតូម ប្រតិកម្ម និងគីមីវិទ្យាក្នុងជីវភាពប្រចាំថ្ងៃ — ជា ៤ មុខវិជ្ជា។",
      },
      {
        href: "/chemistry/building-blocks",
        labelEn: "1. The Atom",
        labelKh: "១. អាតូម",
        icon: Atom,
      },
      {
        href: "/chemistry/reactions-math",
        labelEn: "2. Chemical Reactions & Math",
        labelKh: "២. ប្រតិកម្មគីមី និងគណិតវិទ្យា",
        icon: FlaskConical,
      },
      {
        href: "/chemistry/advanced",
        labelEn: "3. Advanced Concepts",
        labelKh: "៣. គំនិតកម្រិតខ្ពស់",
        icon: Microscope,
      },
      {
        href: "/chemistry/real-world",
        labelEn: "4. Chemistry in the Real World",
        labelKh: "៤. គីមីវិទ្យាក្នុងពិភពពិត",
        icon: Sparkles,
      },
      {
        href: "/chemistry/organic-101",
        labelEn: "5. Organic Chemistry 101",
        labelKh: "៥. គីមីសរីរាង្គ ១០១",
        icon: Hexagon,
      },
      {
        href: "/science/chemistry/inorganic",
        labelEn: "6. Inorganic Chemistry 101",
        labelKh: "៦. គីមីអសរីរាង្គ ១០១",
        icon: Diamond,
      },
      {
        href: "/science/chemistry/physical",
        labelEn: "7. Physical Chemistry",
        labelKh: "៧. គីមីរូបវិទ្យា",
        icon: Sigma,
      },
      {
        href: "/science/chemistry/haber-bosch",
        labelEn: "7.5. The Haber-Bosch Process",
        labelKh: "៧.៥. ដំណើរការ Haber-Bosch",
        icon: Factory,
        descEn: "The reversible reaction N₂ + 3H₂ ⇌ 2NH₃ that pulls nitrogen from thin air and turns it into the synthetic fertilizer feeding 8 billion people. Le Chatelier's Principle in action: 200 atm pressure, 450 °C, and an iron catalyst.",
        descKh: "ប្រតិកម្មត្រឡប់បាន N₂ + 3H₂ ⇌ 2NH₃ ដែលទាញអាសូតចេញពីខ្យល់ស្ដើង ហើយបំប្លែងទៅជាជីសំយោគដែលចិញ្ចឹមមនុស្ស ៨ ពាន់លាននាក់។ គោលការណ៍របស់ Le Chatelier ដំណើរការ៖ សម្ពាធ ២០០ atm ៤៥០ °C និងកាតាលីករដែក។",
      },
      {
        href: "/science/chemistry/nitrogen-cycle",
        labelEn: "7.6. The Nitrogen Cycle: Nature's Fertilizer Factory",
        labelKh: "៧.៦. វដ្តអាសូត៖ រោងចក្រជីធម្មជាតិ",
        icon: Leaf,
        descEn: "Why 78% of the air is nitrogen but plants can't touch it, the three steps that move nitrogen from sky to soil to root and back (fixation by lightning and root bacteria, nitrification into nitrates, denitrification back to N₂), and how compost or synthetic fertilizer in a Cambodian rice paddy is just speeding up the natural cycle.",
        descKh: "ហេតុអ្វីខ្យល់ ៧៨% គឺជាអាសូត ប៉ុន្តែរុក្ខជាតិមិនអាចប៉ះវាបាន ជំហានទាំងបីដែលផ្លាស់ទីអាសូតពីមេឃទៅដី ទៅឫស និងត្រឡប់មកវិញ (ការកែច្នៃដោយផ្គររន្ទះ និងបាក់តេរីឫស នីទ្រីកម្មទៅជានីត្រាត ឌីនីទ្រីកម្មត្រឡប់ទៅ N₂) និងរបៀបដែលជីកំប៉ុស្ត ឬជីសំយោគនៅក្នុងស្រែស្រូវកម្ពុជា គ្រាន់តែបង្កើនល្បឿនវដ្តធម្មជាតិ។",
      },
      {
        href: "/science/chemistry/analytical",
        labelEn: "8. Analytical Chemistry",
        labelKh: "៨. គីមីវិភាគ និងឧបករណ៍",
        icon: FlaskRound,
      },
      {
        href: "/chemistry/ion-calculator",
        labelEn: "Oxidation State & Ion Calculator",
        labelKh: "ម៉ាស៊ីនគិតលេខស្ថានភាពអុកស៊ីតកម្ម និងអ៊ីយ៉ុង",
        icon: Atom,
        descEn: "Pick any of the first 20 elements, then add or remove electrons and watch the atom flip from neutral to a cation (+) or anion (−) in real time.",
        descKh: "ជ្រើសរើសធាតុណាមួយក្នុងចំណោម ២០ ធាតុដំបូង បន្ទាប់មកបន្ថែមឬដកអេឡិចត្រុង ហើយមើលអាតូមផ្លាស់ប្តូរពីអព្យាក្រឹតទៅជាកាទីយ៉ុង (+) ឬអានីយ៉ុង (−) ភ្លាមៗ។",
      },
      {
        href: "/science/chemical-engineering",
        labelEn: "Chemical Engineering",
        labelKh: "វិស្វកម្មគីមី",
        icon: Factory,
        descEn: "From a glass test tube to a multi-ton steel factory — the three pillars (Mass · Energy · Reactions), the four core university classes, and how chemical engineers deliver clean water, safe food, vaccines, and biofuels at the scale of a province.",
        descKh: "ពីបំពង់សាកល្បងកញ្ចក់ ទៅរោងចក្រដែករាប់តោន — សសរស្តម្ភបី (ម៉ាស · ថាមពល · ប្រតិកម្ម) មុខវិជ្ជាស្នូលបួននៅសាកលវិទ្យាល័យ និងរបៀបដែលវិស្វករគីមីផ្តល់ទឹកស្អាត ស្បៀងសុវត្ថិភាព វ៉ាក់សាំង និងឥន្ធនៈជីវសាស្ត្រ ក្នុងមាត្រដ្ឋានខេត្ត។",
      },
      {
        href: "/science/chemistry/heisenberg",
        labelEn: "9. Quantum Uncertainty (Heisenberg)",
        labelKh: "៩. ភាពមិនប្រាកដប្រជាកង់ទិច (ហៃសិនបឺគ)",
        icon: Atom,
        descEn: "The camera analogy for fast cars and electrons, the Δx·Δp ≥ h/4π inequality unpacked, and why a water buffalo is too heavy for the universe to be unsure of.",
        descKh: "ការប្រៀបធៀបម៉ាស៊ីនថតសម្រាប់ឡានលឿន និងអេឡិចត្រុង វិសមភាព Δx·Δp ≥ h/4π ត្រូវបានបំបែក និងហេតុអ្វីបានជាក្របីមួយធ្ងន់ពេក សកលលោកមិនអាចមិនច្បាស់បាន។",
      },
      {
        href: "/quantum-limit",
        labelEn: "The Quantum Limit: Max Planck's Discovery",
        labelKh: "ដែនកំណត់កង់ទិច៖ ការរកឃើញរបស់ Max Planck",
        icon: Atom,
        descEn: "Energy comes in tiny packets. Tune a light beam to see E = hν, zoom from a human down to the Planck length, and meet the smallest possible moment of time.",
        descKh: "ថាមពលមកជាកញ្ចប់តូចៗ។ លៃតម្រូវធ្នឹមពន្លឺដើម្បីមើល E = hν ពង្រីកពីមនុស្សដល់ប្រវែង Planck និងស្គាល់ពេលខ្លីបំផុតដែលមាន។",
      },
      {
        href: "/magnets",
        labelEn: "The Science of Magnets",
        labelKh: "វិទ្យាសាស្ត្រនៃមេដែក (The Science of Magnets)",
        icon: Magnet,
        descEn: "Three types of magnetism, an interactive atomic-spin simulator, and a bar magnet whose invisible field lines you can reveal with iron filings.",
        descKh: "ប្រភេទមេដែកបី ការក្លែងសាកល្បងរង្វិលអាតូមអន្តរកម្ម និងមេដែកដំបងដែលអ្នកអាចបង្ហាញខ្សែដែនមើលមិនឃើញរបស់វាដោយកំទេចដែក។",
      },
      {
        href: "/science/electromagnetism",
        labelEn: "Electromagnetism: The Power of Fields",
        labelKh: "អគ្គិសនីម៉ាញ៉េទិច៖ ថាមពលនៃដែន",
        icon: Zap,
        descEn: "Meet self-taught Michael Faraday and the moving-magnet experiment that powers every plant on Earth, throw a 'fishing net' around a charge to derive Gauss's Law (∮ E·dA = Q/ε₀), then see motors, transformers, and MRI scanners as the same idea at different scales.",
        descKh: "ស្គាល់ហ្វារ៉ាដេយដែលរៀនដោយខ្លួនឯង និងពិសោធន៍មេដែកផ្លាស់ទីដែលផ្ដល់ថាមពលដល់រោងចក្រអគ្គិសនីលើផែនដី បោះ 'សំណាញ់ត្រី' ពទ្ធជុំវិញបន្ទុក ដើម្បីទាញច្បាប់ហ្គោស (∮ E·dA = Q/ε₀) រួចមើលម៉ូទ័រ បំលែងតង់ស្យុង និង MRI ជាគំនិតតែមួយក្នុងខ្នាតផ្សេងៗ។",
      },
      {
        href: "/science/dentistry",
        labelEn: "Dentistry & Orthodontics: Engineers of the Smile",
        labelKh: "ទន្តសាស្ត្រ និងទន្តពេទ្យកែចង្កូម៖ វិស្វករនៃស្នាមញញឹម",
        icon: Smile,
        descEn: "Meet the family doctor for your mouth and the biomechanical engineer of the jaw, see the three layers inside a single tooth (enamel, dentin, pulp), and walk Cambodia's 7+3-year road from Bac II to becoming an orthodontist.",
        descKh: "ស្គាល់គ្រូពេទ្យគ្រួសារសម្រាប់មាត់របស់អ្នក និងវិស្វករជីវ-មេកានិកនៃថ្គាម មើលស្រទាប់ទាំងបីនៅក្នុងធ្មេញតែមួយ (កាចា ភ្លុក និងបណ្តូល) និងដើរផ្លូវ ៧+៣ ឆ្នាំរបស់កម្ពុជា ពី Bac II ទៅជាទន្តពេទ្យកែចង្កូម។",
      },
      {
        href: "/science/veterinary",
        labelEn: "Veterinary Medicine: Healing the Animal Kingdom",
        labelKh: "ពេទ្យសត្វ៖ ការព្យាបាលសត្វ",
        icon: PawPrint,
        descEn: "Meet the animal doctors who perform surgery, deliver newborns, and stop zoonotic diseases like Rabies and Bird Flu, walk Cambodia's high-school → university → DVM road, and tour the patient ward — cattle, pigs, poultry, dogs and cats — with red Zoonotic warnings on every disease that can jump to humans.",
        descKh: "ស្គាល់​ពេទ្យ​សត្វ​ដែល​ធ្វើ​វះកាត់ ជួយ​សម្រាល​កូន​សត្វ និង​ឈប់​ជំងឺ​ហ្សូណូទិក​ដូច​ជា ឆ្កែឆ្កួត និង​ផ្តាសាយ​បក្សី ដើរ​ផ្លូវ​វិទ្យាល័យ → សាកលវិទ្យាល័យ → DVM របស់​កម្ពុជា ហើយ​ដើរ​ទស្សនា​បន្ទប់​អ្នក​ជំងឺ — គោ ក្របី ជ្រូក មាន់ ឆ្កែ និង​ឆ្មា — ជាមួយ​នឹង​ការ​ព្រមាន​ពណ៌​ក្រហម​លើ​គ្រប់​ជំងឺ​ដែល​អាច​លោត​មក​មនុស្ស។",
      },
      {
        href: "/science/archaeology-paleontology",
        labelEn: "Unearthing the Past: Archaeology & Paleontology",
        labelKh: "ការជីកកកាយអតីតកាល៖ បុរាណវិទ្យា និង ប៉ាលេអុងតូឡូស៊ី",
        icon: Pickaxe,
        descEn: "Two sister sciences that both dig into dirt — but one studies humans (Angkor, artifacts, LIDAR mapping under jungle canopy) and one studies pre-human life (dinosaurs, fossils, deep time). Side-by-side comparison, an Angkor Empire highlight, and a 24-hour Cosmic Calendar where humans appear in the last 77 seconds.",
        descKh: "វិទ្យាសាស្ត្រ​បងប្អូន​ពីរ​ដែល​ទាំង​ពីរ​ជីក​ដី — តែ​មួយ​សិក្សា​មនុស្ស (អង្គរ បុរាណវត្ថុ ការ​ស្ទង់ LIDAR ពី​ក្រោម​ព្រៃ) ហើយ​មួយ​ទៀត​សិក្សា​ជីវិត​មុន​មនុស្ស (ឌីណូស័រ ហ្វូស៊ីល ពេលវេលា​ជ្រៅ)។ ការ​ប្រៀបធៀប​ចំហៀង​នឹង​ចំហៀង ការ​រំលេច​អាណាចក្រ​អង្គរ និង​ប្រតិទិន​ចក្រវាល ២៤ ម៉ោង​ដែល​មនុស្ស​លេច​ឡើង​ត្រឹម ៧៧ វិនាទី​ចុង​ក្រោយ។",
      },
      {
        href: "/mathematics",
        labelEn: "Mathematics: The Language of Logic",
        labelKh: "គណិតវិទ្យា៖ ភាសានៃតក្កវិជ្ជា",
        icon: Sigma,
        descEn: "A 5-part journey: a 10-second mental-math trainer, a balance-scale algebra puzzle, a draggable right triangle with live sin/cos/tan, and a car-graph that explains derivatives and integrals.",
        descKh: "ដំណើរ ៥ ផ្នែក៖ Trainer គណិតក្នុងក្បាល ១០ វិនាទី, ល្បែងជញ្ជីងពិជគណិត, ត្រីកោណកែងអូសបាន និងក្រាហ្វិកឡានដែលពន្យល់ derivative និង integral។",
      },
      {
        href: "/mathematics/geometry",
        labelEn: "Geometry & Space",
        labelKh: "ធរណីមាត្រ និងលំហ",
        icon: Sigma,
        descEn: "Euclidean (flat) vs Non-Euclidean (curved) geometry, the Pythagorean theorem with a 3-4-5 right triangle, and a talking dictionary of 8 basic shapes for ESL pronunciation practice.",
        descKh: "ធរណីមាត្រអឺគ្លីត (រាបស្មើ) ទល់នឹងមិនមែនអឺគ្លីត (កោង), ទ្រឹស្តីបទពីតាក័រជាមួយត្រីកោណកែង ៣-៤-៥ និងវចនានុក្រមនិយាយរូបរាង ៨ មូលដ្ឋានសម្រាប់ហ្វឹកហាត់ការនិយាយ។",
      },
      {
        href: "/mathematics/logarithms",
        labelEn: "Logarithms: The Scale of Nature",
        labelKh: "លោការីត៖ រង្វាស់នៃធម្មជាតិ",
        icon: Sigma,
        descEn: "Logarithms as the inverse of exponents, the Richter earthquake scale as a real-world log scale, and an introduction to Euler's number e and the natural logarithm ln(x).",
        descKh: "លោការីតជាច្រាសនៃអិចស្ប៉ូណង់សយល រង្វាស់រញ្ជួយដីរីឆ្ទ័រជារង្វាស់លោការីតក្នុងជីវិតពិត និងការណែនាំចំនួន e របស់អ៊ុយលឺរ ព្រមទាំងលោការីតធម្មជាតិ ln(x)។",
      },
      {
        href: "/mathematics/advanced",
        labelEn: "Calculus III & Linear Algebra",
        labelKh: "Calculus III និងពីជគណិតលីនេអ៊ែរ",
        icon: Sigma,
        descEn: "Advanced logic for engineers, physicists, and AI: partial derivatives explained as a mountain climber freezing one direction, plus vectors and matrices as machines that stretch, squash, and rotate the entire grid.",
        descKh: "តក្កវិទ្យាកម្រិតខ្ពស់សម្រាប់វិស្វករ អ្នករូបវិទ្យា និង AI ៖ ដេរីវេដោយផ្នែក ពន្យល់ជាអ្នកឡើងភ្នំ ដែលកក់ទិសមួយ ហើយវ៉ិចទ័រ និងម៉ាទ្រីសជាម៉ាស៊ីនដែលទាញ សង្កត់ និងបង្វិលក្រឡាទាំងមូល។",
      },
      {
        href: "/fun-lab",
        labelEn: "Fun Lab",
        labelKh: "មន្ទីរពិសោធន៍កំសាន្ត",
        icon: FlaskConical,
        descEn: "Safe, hands-on chemistry experiments you can try at home.",
        descKh: "ការពិសោធន៍គីមីវិទ្យាសុវត្ថិភាពដែលអ្នកអាចសាកល្បងនៅផ្ទះ។",
      },
      {
        href: "/science/materials",
        labelEn: "Materials Science: The Stuff of the World",
        labelKh: "វិទ្យាសាស្ត្រសម្ភារៈ៖ សារធាតុនៃពិភពលោក",
        icon: Wrench,
        descEn: "Inspect the Big Three (metals, polymers, ceramics & glass), pull and crush them in a live stress–strain workshop, and see why plastic waste is also a feedstock.",
        descKh: "ពិនិត្យក្រុមធំទាំងបី (លោហៈ ប្លាស្ទិក សេរ៉ាមិច និងកញ្ចក់) ទាញ និងសង្កត់វាក្នុងសិក្ខាសាលាស្ត្រេស–បន្ទះផ្ទាល់ និងមើលហេតុអ្វីសំណល់ប្លាស្ទិកក៏ជាសម្ភារៈឆៅ។",
      },
      {
        href: "/science/glaciology",
        labelEn: "Glaciology: The Frozen Rivers",
        labelKh: "ផ្ទាំងទឹកកក៖ ទន្លេដែលកក",
        icon: Snowflake,
        descEn: "Snow piled for thousands of years becomes a slow river of dense blue ice that grinds U-shaped valleys — and stores 70% of the world's fresh water. When it melts, the sea rises in Cambodia.",
        descKh: "ព្រិលដែលគរជាច្រើនពាន់ឆ្នាំ ក្លាយជាទន្លេទឹកកកខៀវយឺតៗ ដែលកិនជ្រលងរាង U — ហើយរក្សាទុក ៧០% នៃទឹកសាបពិភពលោក។ ពេលវារលាយ ទឹកសមុទ្រឡើងខ្ពស់នៅប្រទេសកម្ពុជា។",
      },
      {
        href: "/science/architecture",
        labelEn: "Architecture: The Strength of Shapes",
        labelKh: "ស្ថាបត្យកម្ម៖ ភាពរឹងមាំនៃរូបរាង",
        icon: Building2,
        descEn: "Why does a triangle never break, an arch get tighter under weight, and a dome stay up with no columns? Trace the path that weight takes from a roof down to the ground.",
        descKh: "ហេតុអ្វីបានជាត្រីកោណមិនបាក់, រាងកោងកាន់តែតឹងពេលដាក់ទម្ងន់, ហើយដូមឈរបានដោយគ្មានសសរ? តាមដានផ្លូវដែលទម្ងន់ធ្វើដំណើរពីដំបូលចុះទៅដី។",
      },
      {
        href: "/science/neurology",
        labelEn: "Neurology: The Universe Inside",
        labelKh: "ប្រសាទវិទ្យា៖ សកលលោកខាងក្នុង",
        icon: Brain,
        descEn: "Tap a glowing brain map, watch a chemical signal jump a synapse, and see how one night of REM sleep moves today's lesson into long-term memory.",
        descKh: "ចុចលើផែនទីខួរក្បាលភ្លឺ មើលសញ្ញាគីមីលោតឆ្លងស៊ីណាប និងមើលរបៀបដែលការគេង REM មួយយប់ផ្លាស់មេរៀនថ្ងៃនេះចូលទៅការចងចាំរយៈពេលវែង។",
      },
      {
        href: "/physics",
        labelEn: "Physics Hub",
        labelKh: "មជ្ឈមណ្ឌលរូបវិទ្យា",
        icon: Atom,
        descEn: "Motion, forces, energy, waves & light — the rules of the universe.",
        descKh: "ចលនា កម្លាំង ថាមពល រលក និងពន្លឺ — ច្បាប់នៃសកលលោក។",
      },
      {
        href: "/physics/motion",
        labelEn: "1. Motion & Kinematics",
        labelKh: "១. ចលនា និងគីនេម៉ាទិច",
        icon: Rocket,
      },
      {
        href: "/physics/forces",
        labelEn: "2. Forces & Newton's Laws",
        labelKh: "២. កម្លាំង និងច្បាប់ញូតុន",
        icon: Compass,
      },
      {
        href: "/physics/energy",
        labelEn: "3. Energy & Thermodynamics",
        labelKh: "៣. ថាមពល និងទែម៉ូឌីណាមិច",
        icon: Zap,
      },
      {
        href: "/physics/waves",
        labelEn: "4. Waves, Sound & Light",
        labelKh: "៤. រលក សំឡេង និងពន្លឺ",
        icon: Globe,
      },
      {
        href: "/physics/bicycle",
        labelEn: "5. Physics of the Bicycle",
        labelKh: "៥. រូបវិទ្យានៃកង់",
        icon: Bike,
      },
      {
        href: "/biology",
        labelEn: "Biology Hub",
        labelKh: "មជ្ឈមណ្ឌលជីវវិទ្យា",
        icon: Leaf,
        descEn: "Cells, genetics, evolution and the Mekong's living web — bilingual & interactive.",
        descKh: "កោសិកា ហ្សែន ការវិវត្ត និងបណ្តាញជីវិតនៃទន្លេមេគង្គ — ទ្វេភាសា និងអន្តរកម្ម។",
      },
      {
        href: "/science/chemistry/sweet-science",
        labelEn: "Sweet Science: Sugars & Cellular Energy",
        labelKh: "វិទ្យាសាស្ត្រនៃជាតិស្ករ៖ ជាតិស្ករ និងថាមពលកោសិកា",
        icon: Hexagon,
        descEn: "Mono-, di-, and polysaccharides explained with hexagonal carbon rings. Meet glucose, fructose, and sucrose — then follow a glucose molecule into the mitochondria where it powers the ATP factory that runs every muscle, lung, and thought.",
        descKh: "ម៉ូណូ-, ឌី-, និងប៉ូលីសាការីត ពន្យល់ដោយរង្វង់កាបូនរាងហ្វិកសាហ្គន។ ស្គាល់គ្លុយកូស ហ្វ្រុចតូស និងស៊ុចក្រូស — បន្ទាប់មកតាមដានគ្លុយកូសមួយម៉ូលេគុលចូលក្នុងមីតូកុនឌ្រី កន្លែងដែលវាបញ្ចេញថាមពលឱ្យម៉ាស៊ីនផលិត ATP ដែលដំណើរការគ្រប់សាច់ដុំ សួត និងគំនិត។",
      },
      {
        href: "/biology/cellular-power-plant",
        labelEn: "Biochemistry: The Cellular Power Plant",
        labelKh: "ជីវគីមីវិទ្យា ៖ រោងចក្រថាមពលកោសិកា",
        icon: Factory,
        descEn: "Follow a single grain of glucose from your bloodstream into the cell's power plant: snap it apart in glycolysis, watch the liver run it backward in gluconeogenesis to keep your brain alive, load electrons into NADH minecarts in the Krebs cycle, then ride them down the electron transport chain to spin the world's smallest turbine — ATP synthase, turning at 100 revs/sec inside every one of your 30 trillion cells.",
        descKh: "តាមដានគ្រាប់គ្លុយកូសតែមួយ ពីឈាមរបស់អ្នកចូលក្នុងរោងចក្រថាមពលកោសិកា ៖ បំបែកវានៅគ្លីកូលីស មើលថ្លើមដំណើរការវាបញ្ច្រាសនៅការបង្កើតគ្លុយកូសថ្មីដើម្បីរក្សាខួរក្បាលអ្នករស់ ផ្ទុកអេឡិចត្រុងចូលរទេះធ្យូង NADH នៅវដ្តក្រែប បន្ទាប់មកជិះវាចុះតាមខ្សែសង្វាក់ដឹកជញ្ជូនអេឡិចត្រុង ដើម្បីបង្វិលទួរប៊ីនតូចបំផុតនៅលើពិភពលោក — ATP synthase បង្វិល ១០០ ជុំ/វិនាទីនៅក្នុងកោសិកា ៣០ លានលានរបស់អ្នកនីមួយៗ។",
      },
      {
        href: "/science/biology/crispr",
        labelEn: "Genetic Engineering (CRISPR)",
        labelKh: "វិស្វកម្មហ្សែន (CRISPR)",
        icon: Dna,
        descEn: "CRISPR-Cas9 as a 'find & replace' for the 3-billion-letter book of DNA — drought-proof rice, the first FDA-approved cure for sickle cell, and the ethics of editing life.",
        descKh: "CRISPR-Cas9 ដូចជា «រកនិងជំនួស» សម្រាប់សៀវភៅ DNA ៣ ពាន់លានអក្សរ — ស្រូវធន់នឹងគ្រោះរាំងស្ងួត ការព្យាបាលដំបូងគេដែលអនុម័តដោយ FDA សម្រាប់ឈាមរូបអាក់ និងសីលធម៌នៃការកែសម្រួលជីវិត។",
      },
      {
        href: "/science/biology/cell-division",
        labelEn: "Cell Division",
        labelKh: "ការបែងចែកកោសិកា",
        icon: Split,
        descEn: "Mitosis vs. Meiosis — how a cell with 46 chromosomes either makes two perfect clones (growth & healing) or four genetically unique cells with 23 each (sperm & egg, with DNA crossing over to mix mum and dad).",
        descKh: "មីតូស និង​មេយ៉ូស — របៀប​ដែល​កោសិកា​មាន ៤៦ ក្រូម៉ូសូម​បង្កើត​ច្បាប់​ចម្លង​ដូច​គ្នា​ពីរ (ការ​លូតលាស់ & ការ​ព្យាបាល) ឬ​កោសិកា​ខុស​គ្នា​ផ្នែក​ហ្សែន​បួន​មាន ២៣ នីមួយ​ៗ (មេជីវិត & ស៊ុត ដោយ​ DNA ឆ្លង​កាត់​លាយ​ម្តាយ​នឹង​ឪពុក)។",
      },
      {
        href: "/science/biology/microscopes",
        labelEn: "Microscopes & Magnification",
        labelKh: "មីក្រូទស្សន៍ និងការពង្រីក",
        icon: Microscope,
        descEn: "How two pieces of curved glass let humans see what eyes alone cannot — the 0.1 mm limit of the naked eye, how a convex lens bends light to a focal point, and the simple math of compound magnification (eyepiece × objective).",
        descKh: "របៀបដែលកញ្ចក់កោងពីរបន្ទះអនុញ្ញាតឱ្យមនុស្សមើលឃើញអ្វីដែលភ្នែកតែឯងមិនអាច — ដែនកំណត់ ០,១ មម នៃភ្នែកទទេ របៀបដែលឡង់ទីប៉ោងបង្វែរពន្លឺទៅចំណុចប្រសព្វ និងគណិតវិទ្យាសាមញ្ញនៃការពង្រីកផ្សំ (ឡង់ទីភ្នែក × ឡង់ទីវត្ថុ)។",
      },
      {
        href: "/biology/botany",
        labelEn: "Botany: The Green Engine of Earth",
        labelKh: "រុក្ខសាស្ត្រ៖ ម៉ាស៊ីនពណ៌បៃតងនៃផែនដី",
        icon: Trees,
        descEn: "Deep history (8m mushrooms!), photosynthesis (LaTeX), xylem & phloem, conifers vs Cambodian dipterocarps, the Wood Wide Web of Mother Trees, and why tree burls don't kill the tree.",
        descKh: "ប្រវត្តិដ៏ជ្រាលជ្រៅ (ផ្សិត ៨ ម៉ែត្រ!) រស្មីសំយោគ (LaTeX) ស៊ីឡែម និងផ្លូអែម ដើមស្វិតទល់នឹងឈើជ័រដ្បូងកម្ពុជា បណ្តាញព្រៃនៃដើមឈើមេ និងហេតុអ្វីដុំសាច់ឈើមិនសម្លាប់ដើមឈើ។",
      },
      {
        href: "/geology",
        labelEn: "Geology & Earth Science",
        labelKh: "ភូគព្ភវិទ្យា និងវិទ្យាសាស្ត្រផែនដី",
        icon: Mountain,
        descEn: "Tectonic plates, the rock cycle, and Cambodia's geological position — interactive maps & diagrams.",
        descKh: "ប្លាកធរណីសាស្ត្រ វដ្ដថ្ម និងទីតាំងភូគព្ភវិទ្យារបស់កម្ពុជា — ផែនទី និងតារាងអន្តរកម្ម។",
      },
      {
        href: "/science/geology",
        labelEn: "Mountains & Volcanoes",
        labelKh: "ភ្នំ និងភ្នំភ្លើង",
        icon: Flame,
        descEn: "Magma vs. lava, the convection-current 'engine' of the planet, the sleeping Yellowstone supervolcano, and how the Himalayas, Andes, and Rockies were each built by a different tectonic story.",
        descKh: "ម៉ាកម៉ានិងកម្អែលភ្នំភ្លើង «ម៉ាស៊ីន» ចរន្តកម្តៅរបស់ភពផែនដី ភ្នំភ្លើងយក្សយ៉ូឡូស្តូនដែលកំពុងដេក និងរបៀបដែលហិមាល័យ អង់ដេស និងរ៉ូគី សាងសង់ឡើងដោយរឿងតិចតូនិកផ្សេងៗគ្នា។",
      },
      {
        href: "/science/geology/deep-time",
        labelEn: "Deep Time (4.5 Billion Years)",
        labelKh: "ពេលវេលាដ៏ជ្រៅ (៤,៥ ពាន់លានឆ្នាំ)",
        icon: Mountain,
        descEn: "From a magma ocean Earth, through the Cambrian Explosion and dinosaurs, to the day the Sun grows so hot that plants suffocate and life ends.",
        descKh: "ចាប់ពីផែនដីសមុទ្រកម្អែភ្នំភ្លើង តាមរយៈការផ្ទុះខេមប្រៀន និងដាយណូសូរ រហូតដល់ថ្ងៃដែលព្រះអាទិត្យក្ដៅខ្លាំងរហូតរុក្ខជាតិដាច់ខ្យល់ ហើយជីវិតបញ្ចប់។",
      },
      {
        href: "/geology/wonders",
        labelEn: "Geological Wonders: The Earth's Sculptures",
        labelKh: "អច្ឆរិយភូមិសាស្ត្រ៖ ចម្លាក់របស់ផែនដី",
        icon: Globe,
        descEn: "The Grand Canyon as a vertical timeline, Niagara Falls walking upstream, the Mariana Trench deep enough to swallow Everest, and the Great Barrier Reef built by living polyps.",
        descKh: "មហាអន្លង់ធំជាបន្ទាត់ពេលវេលាបញ្ឈរ ទឹកធ្លាក់ណាយអាហ្គារ៉ាដើរឡើងលើ អន្លង់ម៉ារីយ៉ាណាជ្រៅល្មមលេបភ្នំអេវើរេស និងថ្មប៉ប្រះទឹកដែលសាងសង់ដោយប៉ូលីបមានជីវិត។",
      },
      {
        href: "/fossil-fuels",
        labelEn: "Fossil Fuels: Ancient Energy",
        labelKh: "ប្រេងឥន្ធនៈហ្វូស៊ីល៖ ថាមពលបុរាណ",
        icon: Fuel,
        descEn: "Watch oil form over 300 million years, separate it in a fractionating tower, fire a 4-stroke piston, and break down what you actually pay at the pump.",
        descKh: "មើលប្រេងបង្កើតក្នុងរយៈពេល ៣០០ លានឆ្នាំ បំបែកវាក្នុងប៉មចម្រាញ់ បាញ់ស៊ីឡាំងបួនជំហាន និងបែងចែកអ្វីដែលអ្នកពិតជាបង់នៅស្ថានីយប្រេង។",
      },
      {
        href: "/disaster-prep",
        labelEn: "Disaster Preparedness",
        labelKh: "ការត្រៀមលក្ខណៈគ្រោះមហន្តរាយ",
        icon: LifeBuoy,
        descEn: "Floods, earthquakes, tsunamis — read the warning signs and pack your Go-Bag.",
        descKh: "ទឹកជំនន់ ការរញ្ជួយដី ស៊ូណាមិ — អានសញ្ញាព្រមាន និងខ្ចប់កាបូបបន្ទាន់របស់អ្នក។",
      },
      {
        href: "/space",
        labelEn: "Space",
        labelKh: "អវកាស",
        icon: Rocket,
      },
      {
        href: "/oceanography",
        labelEn: "Oceanography: The Blue Frontier",
        labelKh: "មហាសមុទ្រវិទ្យា៖ ព្រំដែនពណ៌ខៀវ",
        icon: Waves,
        descEn: "Dive through the ocean's three zones, ride the global current conveyor belt, and meet the mangroves and reefs of Cambodia's coast.",
        descKh: "មុជឆ្លងកាត់តំបន់ ៣ នៃមហាសមុទ្រ ជិះខ្សែបង្វិលចរន្តពិភពលោក និងស្គាល់ព្រៃកោងកាង និងផ្កាថ្មសមុទ្រនៃឆ្នេរកម្ពុជា។",
      },
      {
        href: "/weather",
        labelEn: "Weather & Atmospheric Science",
        labelKh: "អាកាសធាតុ និងវិទ្យាសាស្ត្របរិយាកាស",
        icon: CloudRain,
        descEn: "Trap CO₂ and watch the Earth glow red, crash a cold front into a warm one to make rain, build lightning inside a cloud, and meet hurricanes and tornadoes.",
        descKh: "ស្ទះ CO₂ ហើយមើលផែនដីចាំងពន្លឺក្រហម ប៉ះផ្ទៃខ្យល់ត្រជាក់ និងក្ដៅឱ្យកើតភ្លៀង សាងសង់រន្ទះក្នុងពពក និងស្គាល់ខ្យល់ព្យុះធំ និងខ្យល់ព្យុះក្រឡុក។",
      },
      {
        href: "/science/trains-railways",
        labelEn: "Trains & Railways: The Steel Arteries",
        labelKh: "រថភ្លើង និងផ្លូវដែក៖ សរសៃឈាមដែកនៃពិភពលោក",
        icon: Train,
        descEn: "Why steel-on-steel wheels waste so little energy, the four kinds of trains (including Battambang's bamboo Norry), how 'diesel' locomotives are secretly electric, and why every railway sits on a deep bed of crushed rock.",
        descKh: "ហេតុអ្វីកង់ដែកលើផ្លូវដែកខាតថាមពលតិច ប្រភេទរថភ្លើងបួន (រួមបញ្ចូលណូរីឫស្សីនៃខេត្តបាត់ដំបង) របៀបដែលរថភ្លើង «ឌីសែល» ពិតជាដំណើរការដោយអគ្គិសនី និងហេតុអ្វីផ្លូវដែកទាំងអស់អង្គុយលើគ្រែថ្មកំទេចដ៏ជ្រៅ។",
      },
      {
        href: "/weather/snow",
        labelEn: "Snow: The Frozen Clouds",
        labelKh: "ព្រិល៖ ពពកដែលកក",
        icon: Snowflake,
        descEn: "Snow is not frozen rain — it is water vapour that turns straight into a six-sided ice crystal around a tiny dust seed, and falls only where the air stays below 0 °C.",
        descKh: "ព្រិលមិនមែនជាភ្លៀងដែលកកទេ — វាគឺជាចំហាយទឹកដែលប្ដូរទៅជាគ្រីស្តាល់ទឹកកកមានជ្រុង ៦ ដោយផ្ទាល់ជុំវិញគ្រាប់ធូលីតូចមួយ ហើយធ្លាក់តែនៅកន្លែងដែលខ្យល់ស្ថិតក្រោម 0°C។",
      },
      {
        href: "/science/weather/sky-color",
        labelEn: "Why is the Sky Blue? — Rayleigh Scattering",
        labelKh: "ហេតុអ្វីបានជាមេឃមានពណ៌ខៀវ? — ការបែកខ្ចាត់ខ្ចាយរ៉េឡេ",
        icon: Sun,
        descEn: "White sunlight is a hidden rainbow. Run it through Earth's nitrogen-and-oxygen obstacle course, derive Rayleigh's I ∝ 1/λ⁴ law, and discover why the sky is blue at noon and red at sunset.",
        descKh: "ពន្លឺព្រះអាទិត្យពណ៌សគឺជាឥន្ធនូលាក់។ បញ្ជូនវាកាត់ទីលានឧបសគ្គអាសូត-អុកស៊ីសែននៃផែនដី ទាញច្បាប់ I ∝ 1/λ⁴ របស់រ៉េឡេ និងរកឃើញហេតុអ្វីមេឃមានពណ៌ខៀវនៅថ្ងៃត្រង់ និងពណ៌ក្រហមនៅពេលថ្ងៃលិច។",
      },
    ],
  },
  {
    labelEn: "Technology",
    labelKh: "បច្ចេកវិទ្យា",
    icon: Cpu,
    color: "lime",
    items: [
      {
        href: "/technology/automotive",
        labelEn: "How Cars Work",
        labelKh: "របៀបដែលឡានដំណើរការ",
        icon: Car,
        descEn: "Lift the bonnet on a 4-stroke engine, a triangle-spinning rotary, the 20,000-volt spark plug, the 'air pedal' throttle, turbochargers, mufflers, the clutch, manual vs automatic gearboxes, rack-and-pinion steering, and ABS that pumps brakes 15 times a second.",
        descKh: "បើកគម្របលើម៉ាស៊ីន ៤ ជំហាន រ៉ូតារីត្រីកោណវិល ផ្គរប៊ូហ្គី ២០,០០០ វ៉ុល «ឈ្នាន់ខ្យល់» ធួបូ បំពង់ស៊ីម៉ាំង អាំប្រាយ៉ា ប្រអប់លេខកា ទល់នឹងលេខអូតូ ចង្កូត Rack-and-Pinion និង ABS ដែលលោតហ្វ្រាំង ១៥ ដងក្នុងមួយវិនាទី។",
      },
      {
        href: "/how-computers-work",
        labelEn: "How Computers Work",
        labelKh: "របៀបដែលកុំព្យូទ័រដំណើរការ",
        icon: Binary,
        descEn: "Build a virtual PC, flip binary switches, and see hardware vs. software — interactive blueprint diagrams.",
        descKh: "សាងសង់ Virtual PC ប្ដូរកុងតាក់គោលពីរ និងមើល Hardware ប្រឆាំងនឹង Software — តារាង blueprint អន្តរកម្ម។",
      },
      {
        href: "/safety",
        labelEn: "Digital Safety",
        labelKh: "សុវត្ថិភាពឌីជីថល",
        icon: Shield,
        descEn: "Spot phishing scams, forge unbreakable passwords, and trace your digital footprint.",
        descKh: "ស្គាល់ការបោកប្រាស់ phishing ផ្គុំពាក្យសម្ងាត់មិនអាចបំបាក់បាន និងតាមដានស្នាមជើងឌីជីថលរបស់អ្នក។",
      },
      {
        href: "/cinematography",
        labelEn: "Cameras & Cinematography: The Science of Light",
        labelKh: "កាមេរ៉ា និងសិល្បៈភាពយន្ត៖ វិទ្យាសាស្ត្រនៃពន្លឺ",
        icon: Camera,
        descEn: "Trace photons through a camera lens, balance the exposure triangle to freeze a moving motorbike, and learn how filmmakers tell whole stories with three shot sizes.",
        descKh: "តាមដានពន្លឺឆ្លងកាត់កែវកាមេរ៉ា ផ្គុំត្រីកោណការថតឱ្យបង្ហាប់ម៉ូតូកំពុងធ្វើដំណើរ និងរៀនរបៀបដែលអ្នកថតភាពយន្តនិទានរឿងទាំងមូលដោយស៊ុមបី។",
      },
      {
        href: "/hvac",
        labelEn: "HVAC: Managing Our Environment",
        labelKh: "HVAC៖ ការគ្រប់គ្រងសីតុណ្ហភាព និងខ្យល់ចេញចូល",
        icon: Thermometer,
        descEn: "Watch refrigerant cycle through an air conditioner, see how heaters glow red, and discover why ventilation keeps classrooms healthy.",
        descKh: "មើលរូបធាតុត្រជាក់ផ្លាស់ប្ដូរក្នុងម៉ាស៊ីនត្រជាក់ មើលឧបករណ៍កំដៅភ្លឺក្រហម និងរកឃើញហេតុអ្វីការបញ្ចេញខ្យល់ធ្វើឲ្យបន្ទប់រៀនមានសុខភាពល្អ។",
      },
      {
        href: "/technology/vacuum-cleaner",
        labelEn: "The Pressure Drop: How Vacuum Cleaners Work",
        labelKh: "ការធ្លាក់ចុះសម្ពាធ៖ របៀបដែលម៉ាស៊ីនបូមធូលីដំណើរការ",
        icon: Fan,
        descEn: "A vacuum cleaner doesn't 'suck' — it can't. A motor-driven fan pushes air out, the pressure inside drops, and the heavy outside atmosphere shoves air (and dust) in to fill the void. The same principle scales up to the air-conditioner ducts that ventilate every building.",
        descKh: "ម៉ាស៊ីនបូមធូលីមិន «បឺត» ទេ — វាមិនអាចទេ។ កង្ហារដំណើរការដោយម៉ូទ័រច្រានខ្យល់ចេញ សម្ពាធខាងក្នុងធ្លាក់ចុះ ហើយបរិយាកាសខាងក្រៅដ៏ធ្ងន់ច្រានខ្យល់ (និងធូលី) ចូលដើម្បីបំពេញទីទេរ។ គោលការណ៍ដូចគ្នានេះត្រូវបានពង្រីកទៅទុយោម៉ាស៊ីនត្រជាក់ដែលបញ្ចេញខ្យល់នៅគ្រប់អគារ។",
      },
      {
        href: "/aviation",
        labelEn: "Aviation: How We Fly",
        labelKh: "អាកាសចរណ៍៖ របៀបដែលយើងហោះហើរ",
        icon: Plane,
        descEn: "See air particles race over an airfoil to make Lift, meet the Wright brothers, and click each of the four forces of flight on a real plane diagram.",
        descKh: "មើលភាគល្អិតខ្យល់រត់លើស្លាបយន្តហោះបង្កើតកម្លាំងលើក ស្គាល់បងប្អូន Wright និងចុចលើកម្លាំងបួននៃការហោះហើរលើតារាងយន្តហោះពិតប្រាកដ។",
      },
      {
        href: "/robotics",
        labelEn: "Robotics: Machines That Think",
        labelKh: "រ៉ូបូតវិទ្យា៖ ម៉ាស៊ីនដែលចេះគិត",
        icon: Bot,
        descEn: "Run the Sense-Think-Act loop, click hotspots on a Build-a-Bot, and follow the 4-step engineering cycle from idea to working machine.",
        descKh: "ដំណើរការវដ្តយល់ឃើញ-គិត-ធ្វើសកម្មភាព ចុចចំណុចភ្លឺលើ Build-a-Bot និងអនុវត្តតាមវដ្តវិស្វកម្មបួនជំហាន។",
      },
      {
        href: "/technology/nanotechnology",
        labelEn: "Nanotechnology: Building from the Atom Up",
        labelKh: "បច្ចេកវិទ្យាណាណូ៖ ការស្ថាបនាពីអាតូមឡើងលើ",
        icon: Atom,
        descEn: "What a nanometre actually is, why ordinary light microscopes can't see atoms, and how an Atomic Force Microscope lets us not just read individual atoms but push them — building matter one atom at a time.",
        descKh: "ណាណូម៉ែត្រគឺជាអ្វី ហេតុអ្វីមីក្រូទស្សន៍ពន្លឺធម្មតាមើលអាតូមមិនឃើញ និងរបៀបដែលមីក្រូទស្សន៍កម្លាំងអាតូម អនុញ្ញាតឱ្យយើងមិនត្រឹមតែអានអាតូមនីមួយៗ ប៉ុន្តែក៏រុញវាបានផងដែរ — ស្ថាបនាសារធាតុម្ដងមួយអាតូម។",
      },
      {
        href: "/video-games",
        labelEn: "Video Games: The Science of Play",
        labelKh: "បច្ចេកវិទ្យាហ្គេម៖ វិទ្យាសាស្ត្រនៃការលេង",
        icon: Gamepad2,
        descEn: "Race a CPU against a GPU painting pixels, follow the Input → Update → Render game loop, and watch a 3D head get built from triangles, textures, and light.",
        descKh: "ប្រណាំង CPU ប្រឆាំងនឹង GPU ក្នុងការគូរភីកសែល ដើរតាមវដ្តហ្គេម និងមើលក្បាល 3D ត្រូវសាងសង់ពីត្រីកោណ វាយនភាព និងពន្លឺ។",
      },
      {
        href: "/technology/radio",
        labelEn: "Radio & Waves: Catching Invisible Signals",
        labelKh: "វិទ្យុ និងរលក៖ ការចាប់យកសញ្ញាអរូបិយ",
        icon: Radio,
        descEn: "Place radio waves on the electromagnetic spectrum, follow the transmitter–receiver loop from a DJ's microphone to your speaker, meet Marconi & Tesla, and compare AM (long range, more static) vs FM (short range, crystal clear).",
        descKh: "ដាក់រលកវិទ្យុលើវិសាលគមអេឡិចត្រូម៉ាញ៉េទិច ដើរតាមវដ្តឧបករណ៍បញ្ជូន–ឧបករណ៍ទទួល ពីមីក្រូ DJ ដល់ឧបករណ៍បំពងសំឡេងរបស់អ្នក ជួប Marconi និង Tesla និងប្រៀបធៀប AM (ឆ្ងាយ សំឡេងរំខានច្រើន) ទល់នឹង FM (ខ្លី សំឡេងច្បាស់ដូចគ្រីស្តាល់)។",
      },
      {
        href: "/technology/mass-production",
        labelEn: "Mass Production & Automation: From Hands to Robots",
        labelKh: "ការផលិតទ្រង់ទ្រាយធំ និងស្វ័យប្រវត្តិកម្ម៖ ពីដៃទៅរ៉ូបូត",
        icon: Factory,
        descEn: "Walk a vertical timeline from cottage industry through Eli Whitney's interchangeable parts to Henry Ford's moving assembly line ($825 → $260 Model T), climb the power ladder from muscle to steam to electricity to robotics, and unpack why scaling up makes prices fall.",
        descKh: "ដើរតាមប្រវត្តិបញ្ឈរ ពីសិប្បកម្មតាមផ្ទះ ឆ្លងគ្រឿងបន្លាស់ដែលអាចផ្លាស់ប្តូរបានរបស់ Eli Whitney ដល់ខ្សែសង្វាក់ផលិតកម្មចល័តរបស់ Henry Ford (Model T ៨២៥ ➜ ២៦០ ដុល្លារ) ឡើងជណ្ដើរថាមពលពីសាច់ដុំទៅចំហាយ ទៅអគ្គិសនី ទៅរ៉ូបូត និងពន្យល់ហេតុអ្វីបានជាការផលិតធំធ្វើឱ្យតម្លៃធ្លាក់។",
      },
      {
        href: "/technology/radar",
        labelEn: "Radar: Seeing with Radio Waves",
        labelKh: "រ៉ាដា៖ ការមើលឃើញដោយរលកវិទ្យុ",
        icon: RadarIcon,
        descEn: "Decode the RADAR acronym, derive the echo distance formula d = c·t/2 with LaTeX, follow the WW2 Chain Home story, and see how Phnom Penh airport and weather stations use it today.",
        descKh: "បកស្រាយអក្សរកាត់ RADAR ទាញយករូបមន្តចម្ងាយអេកូ d = c·t/2 ដោយ LaTeX ដើរតាមរឿង Chain Home សង្គ្រាមលោកលើកទីពីរ និងមើលរបៀបដែលអាកាសយានដ្ឋានភ្នំពេញ និងស្ថានីយអាកាសធាតុប្រើវាសព្វថ្ងៃ។",
      },
      {
        href: "/technology/bridges",
        labelEn: "Bridge Engineering",
        labelKh: "វិស្វកម្មស្ពាន",
        icon: Construction,
        descEn: "Bridges: Defying Gravity — 2,000 years of engineering in four cards: the ancient stone arch (compression — Romans & Angkor), modern steel & cables (tension — cable-stayed Tsubasa Bridge over the Mekong + classic suspension bridges), the global giants (164-km Danyang–Kunshan in China, 343-m Millau Viaduct taller than the Eiffel Tower), and when bridges fail (the 1940 Tacoma Narrows disaster — 64 km/h wind + resonance turning solid steel into a wet noodle).",
        descKh: "ស្ពាន ៖ ការប្រឆាំងនឹងទំនាញផែនដី — វិស្វកម្ម ២,០០០ ឆ្នាំក្នុងកាតបួន ៖ ស្ពានធ្នូថ្មសម័យបុរាណ (កម្លាំងសង្កត់ — ជនជាតិរ៉ូម៉ាំង និងអង្គរ), ដែក និងខ្សែកាបទំនើប (កម្លាំងទាញ — ស្ពានខ្សែកាបអុបទិកអ្នកលឿងឆ្លងទន្លេមេគង្គ + ស្ពានព្យួរបុរាណ), ស្ពានយក្សលើពិភពលោក (ដាន់យ៉ាង–គុនសាន ១៦៤ គម នៅចិន, មីយ៉ូ ៣៤៣ ម៉ែត្រខ្ពស់ជាងប៉មអេហ្វែល), និងនៅពេលស្ពានបាក់ស្រុត (គ្រោះមហន្តរាយ Tacoma Narrows ឆ្នាំ ១៩៤០ — ខ្យល់ ៦៤ គម/ម៉ោង + រ៉េសូណង់បំប្លែងដែករឹងមាំទៅជាមីសើម)។",
      },
      {
        href: "/technology/plumbing",
        labelEn: "City Plumbing & Sewers",
        labelKh: "ប្រព័ន្ធលូ និងទុយោទឹកក្នុងទីក្រុង",
        icon: Droplets,
        descEn: "Sewers & Plumbing: The Invisible City — the second city beneath every street in four cards: the P-Trap miracle (a tiny puddle of water that blocks toxic, explosive, smelly methane gas from your sink), the gravity engine (no motors — pipes built at a precise 1–2 % slope so water and solids flow together), flood control vs. waste (sanitary sewers to a treatment plant vs. storm drains straight to the river — kept separate so monsoon rains don't flood the streets with raw sewage), and cleaning the underground (CCTV pipe-crawling robots looking for cracks + the Fatberg phenomenon: 130-tonne rock-hard blockages of cooking oil and wet wipes blasted apart with high-pressure water jets).",
        descKh: "ប្រព័ន្ធលូ និងទុយោទឹក ៖ ទីក្រុងដែលមើលមិនឃើញ — ទីក្រុងទីពីរនៅក្រោមផ្លូវក្នុងកាតបួន ៖ អព្ភូតហេតុនៃបំពង់ U (ទឹកបន្តិចបន្តួចដែលបាំងឧស្ម័នមេតានពុល ផ្ទុះបាន និងស្អុយពីស៊ីង), ម៉ាស៊ីនទំនាញផែនដី (មិនប្រើម៉ូទ័រ — ទុយោសង់ដោយជម្រាល ១–២ % ច្បាស់លាស់ ដើម្បីឲ្យទឹក និងកាកសំណល់ហូរជាមួយគ្នា), ការគ្រប់គ្រងទឹកជំនន់ ទល់នឹងកាកសំណល់ (លូកាកសំណល់ទៅរោងចក្រសម្អាត ទល់នឹងលូទឹកភ្លៀងដែលហូរទៅទន្លេដោយផ្ទាល់ — បំបែកដាច់ពីគ្នាដើម្បីកុំឲ្យភ្លៀងវស្សាធ្វើឲ្យទឹកលូលិចផ្លូវ), និងការសម្អាតក្រោមដី (រ៉ូបូតកាមេរ៉ាវារក្នុងទុយោដើម្បីរកប្រេះ + បាតុភូត Fatberg ៖ ការស្ទះធ្ងន់ ១៣០ តោនរឹងដូចថ្មពីប្រេងចម្អិន និងក្រដាស់ជូតសើម ដែលត្រូវបាញ់បំផ្លាញដោយទឹកសម្ពាធខ្ពស់)។",
      },
      {
        href: "/technology/pumps",
        labelEn: "Pumps & Fluid Dynamics",
        labelKh: "ម៉ាស៊ីនបូមទឹក និងឌីណាមិកអង្គធាតុរាវ",
        icon: Fan,
        descEn: "Pumps: Defying Gravity — 2,000 years of inventions that push water uphill in three cards: the Archimedes Screw (an ancient Greek hand-cranked spiral that physically carries water up its threads — still used today on farms and in sewage), the village hand pump (a piston creates a vacuum and the heavy atmosphere outside literally pushes water up — you aren't pulling, the air is pushing), and the modern centrifugal pump (a motorized impeller spinning incredibly fast hurls water outward by centrifugal force, the design behind rice-field irrigation, city water-towers, fire-trucks, washing machines, and car radiators).",
        descKh: "ម៉ាស៊ីនបូមទឹក ៖ ការប្រឆាំងនឹងទំនាញផែនដី — ការបង្កើត ២,០០០ ឆ្នាំដែលរុញទឹកឡើងលើក្នុងកាតបី ៖ វីសអាគីម៉ែត (រង្វិលស្ប៊ីរ៉ាល់ក្រិចបុរាណដំណើរការដោយដៃ ដែលដឹកទឹកឡើងតាមខ្សែវីសដោយផ្ទាល់ — នៅប្រើសព្វថ្ងៃនៅកសិដ្ឋាន និងលូកាកសំណល់), ស្នប់ដៃក្នុងភូមិ (ភីស្តុងបង្កើតសុញ្ញកាស ហើយបរិយាកាសដ៏ធ្ងន់ខាងក្រៅច្រានទឹកឡើងពិតៗ — អ្នកមិនបានទាញទេ ខ្យល់កំពុងច្រាន), និងម៉ាស៊ីនបូមកម្លាំងចោលទំនើប (អ៊ំផេលឺដំណើរការដោយម៉ូទ័រវិលលឿនមិនធម្មតា គ្រវែងទឹកចេញក្រៅដោយកម្លាំងចោល ការរចនាដែលនៅពីក្រោយការស្រោចស្រែ ប្រាសាទទឹកទីក្រុង រថពន្លត់អគ្គិភ័យ ម៉ាស៊ីនបោកគក់ និងរ៉ាដ្យាទ័ររថយន្ត)។",
      },
      {
        href: "/technology/television",
        labelEn: "Television: The Illusion of Light",
        labelKh: "ទូរទស្សន៍៖ ការបំភាន់នៃពន្លឺ",
        icon: Tv,
        descEn: "Why a screen has no white, no yellow, and no orange — only red, green, and blue. Mix RGB live, dissect a CRT electron gun, peel back the six layers of an LCD, and learn the simple maths behind HD and 4K.",
        descKh: "ហេតុអ្វីអេក្រង់គ្មានពណ៌ស គ្មានពណ៌លឿង គ្មានពណ៌ទឹកក្រូច — មានតែក្រហម បៃតង និងខៀវ។ លាយ RGB ផ្ទាល់ កាត់មើល CRT បកស្រាយ ៦ ស្រទាប់នៃ LCD និងរៀនគណិតវិទ្យាសាមញ្ញនៅពីក្រោយ HD និង 4K។",
      },
      {
        href: "/technology/locks",
        labelEn: "Locks & Locksmithing",
        labelKh: "សោរ និងជំនាញសោរ",
        icon: Lock,
        descEn: "Crack open the world's most common lock — the pin tumbler. See the shear line that physically blocks the cylinder, watch a key act as a mechanical password whose teeth align five or six pins to a single line, and meet the locksmiths who blend micro-mechanics, metalworking, and electronics to design and defeat physical security.",
        descKh: "បើកមើលសោរដែលប្រើច្រើនបំផុតនៅលើពិភពលោក — សោរម្ជុលកន្លាស់។ មើលខ្សែបន្ទាត់កាត់ដែលបិទស៊ីឡាំងដោយរូបវិទ្យា មើលកូនសោរដើរតួជាពាក្យសម្ងាត់មេកានិចដែលធ្មេញរបស់វាតម្រឹមម្ជុល ៥ ឬ ៦ ឱ្យត្រង់នឹងខ្សែបន្ទាត់តែមួយ និងស្គាល់ជាងសោរដែលលាយបញ្ចូលគ្នានូវមីក្រូ-មេកានិច ការងារលោហៈ និងអេឡិចត្រូនិក ដើម្បីរចនា និងវាយឆ្លងសុវត្ថិភាពរូបវន្ត។",
      },
      {
        href: "/technology/welding",
        labelEn: "Welding & Metallurgy",
        labelKh: "ការផ្សារដែក និងលោហធាតុ",
        icon: Flame,
        descEn: "Welding is not glue — it is controlled fire. A 3,000 °C oxy-acetylene flame and a 10,000 °C electric arc melt two metals into one piece, often stronger than the original. Learn why a single bubble of oxygen ruins a joint, why aluminum melts away in a heartbeat, and walk through the four-stage cycle every clean weld follows.",
        descKh: "ការផ្សារមិនមែនជាការបិទកាវទេ — វាជាភ្លើងគ្រប់គ្រងបាន។ អណ្ដាតភ្លើងអុកស៊ី-អាសេទីឡែន ៣,០០០ °C និងធ្នូអគ្គិសនី ១០,០០០ °C រំលាយលោហៈពីរក្លាយជាបំណែកតែមួយ ដែលជារឿយៗមាំជាងលោហៈដើម។ រៀនមូលហេតុដែលពពុះអុកស៊ីហ្សែនតែមួយបំផ្លាញចំណុចតភ្ជាប់ មូលហេតុដែលអាលុយមីញ៉ូមរលាយក្នុងភ្លែត និងដើរតាមវដ្តដំណាក់កាលទាំងបួននៃការផ្សារស្អាតៗ។",
      },
      {
        href: "/technology/water-filtration",
        labelEn: "Water Filtration",
        labelKh: "ការចម្រោះទឹក",
        icon: Droplet,
        descEn: "Three engineered stages turn cloudy river water into safe drinking water. Sand and gravel mechanically catch silt, mud, and leaves. Activated carbon adsorbs odors, chlorine, and farm runoff onto the surface of microscopic pores. A reverse-osmosis membrane with 0.0001-micrometre holes lets only H₂O molecules through under high pressure, blocking bacteria, viruses, salts, and heavy metals. Includes an interactive Filter Stacking simulator where you build your own column and test the result.",
        descKh: "ដំណាក់​កាល​វិស្វកម្ម​បី​បំ​ប្លែង​ទឹក​ទន្លេ​ដែល​មាន​ល្បាប់​ឱ្យ​ទៅ​ជា​ទឹក​ផឹក​សុវត្ថិភាព។ ខ្សាច់ និង​ក្រួស​ចាប់​ល្បាប់ ភក់ និង​ស្លឹក​ឈើ​ដោយ​មេកានិច។ កាបូន​សកម្ម​ស្រូប​ក្លិន ក្លរ និង​ការ​ហូរ​ចេញ​ពី​កសិកម្ម​ចូល​ផ្ទៃ​នៃ​រន្ធ​មីក្រូទស្សន៍។ ភ្នាស​អូស្មូសច្រាស​ដែល​មាន​រន្ធ ០.០០០១ មីក្រូម៉ែត្រ អនុញ្ញាត​ឱ្យ​តែ​ម៉ូលេគុល H₂O ប៉ុណ្ណោះ​ឆ្លង​កាត់​ក្រោម​សម្ពាធ​ខ្ពស់ ដោយ​ទប់​ស្កាត់​បាក់តេរី មេរោគ អំបិល និង​លោហៈ​ធ្ងន់។ មាន​ឧបករណ៍​សាក​ល្បង​ការ​តម្រៀប​តម្រង​ដែល​អន្តរ​សកម្ម ដែល​អ្នក​សាង​ជួរ​ផ្ទាល់​ខ្លួន ហើយ​សាក​ល្បង​លទ្ធផល។",
      },
      {
        href: "/technology/electrostatic-precipitators",
        labelEn: "Electrostatic Precipitators",
        labelKh: "ឧបករណ៍ចាប់ភាគល្អិតដោយអគ្គិសនីស្ទិត",
        icon: Factory,
        descEn: "How a 100-year-old invention cleans the air over factory chimneys without using a physical filter. Meet Frederick Cottrell's 1907 idea — a wall of high-voltage electricity that shocks fly ash and soot with a negative charge, then yanks the now-charged dust sideways onto positively charged collector plates. The dirt sticks; only clean gas escapes. Still the global standard at up to 99% efficiency in coal plants, cement kilns, metal smelters, and chemical works.",
        descKh: "របៀប​ដែល​ការ​ច្នៃ​ប្រឌិត​អាយុ ១០០ ឆ្នាំ​សម្អាត​ខ្យល់​ខាង​លើ​បំពង់​ផ្សែង​រោងចក្រ​ដោយ​មិន​ប្រើ​តម្រង​រូបវន្ត។ ស្គាល់​គំនិត​ឆ្នាំ ១៩០៧ របស់ Frederick Cottrell — ជញ្ជាំង​អគ្គិសនី​វ៉ុល​ខ្ពស់​ដែល​ឆក់​ផេះ​ថ្ម និង​ផ្សែង​ខ្មៅ​ឱ្យ​ផ្ទុក​បន្ទុក​អវិជ្ជមាន រួច​ទាញ​ភាគ​ល្អិត​មាន​បន្ទុក​នោះ​ទៅ​ផ្ទាំង​ប្រមូល​បន្ទុក​វិជ្ជមាន។ ភាគ​ល្អិត​ជាប់ មាន​តែ​ឧស្ម័ន​ស្អាត​ប៉ុណ្ណោះ​ចេញ។ នៅ​ជា​ស្តង់ដារ​សកល​ដោយ​មាន​ប្រសិទ្ធភាព​រហូត​ដល់ ៩៩% នៅ​រោងចក្រ​ធ្យូង​ថ្ម ឡ​ស៊ីម៉ងត៍ រោងចក្រ​លោហៈ និង​រោងចក្រ​គីមី។",
      },
      {
        href: "/technology/inventions",
        labelEn: "The Great Inventions",
        labelKh: "ការច្នៃប្រឌិតដ៏អស្ចារ្យ",
        icon: Lightbulb,
        descEn: "Eighteen inventions that built the modern world, grouped into five families — the foundations of civilization (fire, agriculture, the wheel, writing), China's four great inventions (paper, movable type, gunpowder, the compass), the information age (printing press, telephone, radio & TV), energy & transport (electricity, automobile, airplane), and modern science & industry (vaccines, sewing machine, transistor, internet). Filter by category and study one branch at a time.",
        descKh: "ការច្នៃប្រឌិតដប់ប្រាំបី ដែលបានសាងសង់ពិភពលោកទំនើប រៀបជាគ្រួសារប្រាំ — មូលដ្ឋានគ្រឹះនៃអរិយធម៌ (ភ្លើង កសិកម្ម កង់ អក្សរសិល្ប៍) ការច្នៃប្រឌិតអស្ចារ្យទាំងបួនរបស់ចិន (ក្រដាស តួអក្សរផ្លាស់ទីបាន ដីកាំភ្លើង ត្រីវិស័យ) យុគព័ត៌មាន (ម៉ាស៊ីនបោះពុម្ព ទូរស័ព្ទ វិទ្យុ និងទូរទស្សន៍) ថាមពល និងការដឹកជញ្ជូន (អគ្គិសនី រថយន្ត យន្តហោះ) និងវិទ្យាសាស្ត្រ និងឧស្សាហកម្មទំនើប (វ៉ាក់សាំង ម៉ាស៊ីនដេរ ត្រង់ស៊ីស្ទ័រ អ៊ីនធឺណែត)។ ច្រោះតាមប្រភេទ និងសិក្សាមែកធាងម្ដងមួយ។",
      },
      {
        href: "/technology/future-intelligence",
        labelEn: "The Future of Intelligence & Economy",
        labelKh: "អនាគតនៃបញ្ញា និងសេដ្ឋកិច្ច",
        icon: BrainCircuit,
        descEn: "Climb the three rungs of the AI ladder (narrow AI today, human-level AGI tomorrow, the super-intelligent ASI singularity), peek at the if/then logic behind every program written in Python, JavaScript, and C++, and ask whether a planet-wide AI 'World Game' could one day feed everyone without money or competition.",
        descKh: "ឡើងជណ្ដើរ AI ទាំងបី (AI តូចចង្អៀតថ្ងៃនេះ AGI កម្រិតមនុស្សថ្ងៃស្អែក និង ASI ឯកឧត្តមឆ្លាតខ្ពស់) មើលតក្កវិជ្ជាប្រសិនបើ/នោះនៅពីក្រោយកម្មវិធីគ្រប់ប្រភេទដែលសរសេរក្នុង Python, JavaScript, និង C++ និងសួរថា តើ 'ហ្គេមពិភពលោក' AI ពេញផែនដី អាចចិញ្ចឹមមនុស្សគ្រប់គ្នាដោយគ្មានលុយ ឬការប្រកួតប្រជែងបានទេ ?",
      },
      {
        href: "/technology/horology",
        labelEn: "Horology & Time",
        labelKh: "ហោរាសាស្ត្រ និងពេលវេលា",
        icon: Hourglass,
        descEn: "Horology: The Scientific Study of Time — 5,000 years of timekeeping in three sections. A timeline from sundials and water clocks to mechanical escapements, quartz crystals (32,768 Hz), and atomic clocks (the caesium 9.2-billion-vibration second that GPS depends on). The four parts of a mechanical watch movement (mainspring, gear train, escapement, balance wheel) with an animated diagram. Time and physics — Einstein's relativity (why GPS satellites need a 38-microsecond daily correction) and the Prime Meridian at Greenwich (why Cambodia is UTC+7).",
        descKh: "ហោរាសាស្ត្រ៖ ការសិក្សាវិទ្យាសាស្ត្រនៃការវាស់វែងពេលវេលា — ប្រវត្តិ ៥,០០០ ឆ្នាំក្នុងផ្នែកបី។ ប្រវត្តិពីនាឡិកាស្រមោល និងនាឡិកាទឹក ដល់ម៉ាស៊ីនបញ្ចេញមេកានិច គ្រីស្តាល់កែវកាវ (៣២,៧៦៨ Hz) និងនាឡិកាអាតូម (វិនាទីសេស៊ូម ៩.២ ពាន់លានរំញ័រ ដែល GPS ពឹងផ្អែក)។ ផ្នែកបួននៃម៉ាស៊ីននាឡិកាមេកានិច (ស្ព្រីងមេ ខ្សែស្ពឺ ម៉ាស៊ីនបញ្ចេញ កង់តុល្យភាព) ជាមួយតារាងដែលមានចលនា។ ពេលវេលា និងរូបវិទ្យា — ទ្រឹស្តីទាក់ទងរបស់ Einstein និងមេរីដៀនដើមនៅ Greenwich (ហេតុអ្វីកម្ពុជាស្ថិតនៅ UTC+7)។",
      },
      {
        href: "/technology/3d-printing",
        labelEn: "3D Printing",
        labelKh: "ការបោះពុម្ពត្រីមាត្រ",
        icon: Box,
        descEn: "3D Printing: Manufacturing the Future — three sections in a maker-space aesthetic (carbon-fibre blacks, neon wireframes, concrete greys). How it works: subtractive vs additive manufacturing, with the digital-model → slicer → heated-nozzle → layered-object pipeline. Printing the small: custom wrenches, gears, and discontinued spare parts for mechanics; finger splints, stethoscopes, and patient-specific prosthetics for clinics in remote areas. Printing the massive: gantry cranes squeezing concrete to print a two-bedroom house in 24 hours, and laser-sintered titanium-powder car chassis printed as a single lattice part.",
        descKh: "ការបោះពុម្ពត្រីមាត្រ៖ ការផលិតសម្រាប់អនាគត — បីផ្នែកក្នុងរចនាបថ maker-space (ខ្មៅ carbon fibre បន្ទាត់ neon ប្រផេះកុងក្រែត)។ របៀបដែលវាដំណើរការ៖ ការផលិតដោយដក និងការផលិតដោយបន្ថែម ជាមួយនឹងលំហូរ គំរូឌីជីថល → កម្មវិធីកាត់ស្រទាប់ → ច្រមុះក្ដៅ → វត្ថុរាងស្រទាប់។ ការបោះពុម្ពខ្នាតតូច៖ ឧបករណ៍កាត់ កង់ស្ព្រែង និងគ្រឿងបន្លាស់រលត់សម្រាប់មេកានិក; ឧបករណ៍ដាក់ម្រាមដៃ stethoscope និងដៃសិប្បនិម្មិតសម្រាប់មន្ទីរសុខាភិបាលនៅខេត្តឆ្ងាយ។ ការបោះពុម្ពខ្នាតធំ៖ ដ៏ឧប្ករណ៍ក្រេនដែលច្របាច់កុងក្រែតបោះពុម្ពផ្ទះពីរបន្ទប់គេងក្នុង ២៤ ម៉ោង និងស៊ុមរថយន្តពីម្សៅទីតានីយ៉ូមផ្សារដោយឡាស៊ែរបោះពុម្ពជា lattice តែមួយ។",
      },
      {
        href: "/technology/maritime",
        labelEn: "Shipping & Buoyancy",
        labelKh: "ការដឹកជញ្ជូន និងការអណ្តែត",
        icon: Ship,
        descEn: "Maritime Tech: Shipping & Buoyancy — three sections in a heavy industrial / oceanic aesthetic (deep-sea blues, steel greys, cargo orange and red accents). The physics of floating: Archimedes' Principle and the steel-paradox of average density that lets a 220,000-tonne container ship float while a steel nail sinks. Engineering mega-ships: 400-metre Ever Ace-class vessels carrying 24,000 TEU, and the Plimsoll Line — Samuel Plimsoll's painted load-line (TF, F, T, S, W, WNA) that stops captains from overloading. The invisible highways: shipping lanes set by the IMO, and the three global chokepoints that carry 90% of all trade — the Strait of Malacca right next to Cambodia, the Suez Canal, and the Panama Canal.",
        descKh: "បច្ចេកវិទ្យាសមុទ្រ៖ ការដឹកជញ្ជូន និងការអណ្តែត — បីផ្នែកក្នុងរចនាបថឧស្សាហកម្មធុនធ្ងន់ និងសមុទ្រ (ខៀវសមុទ្រជ្រៅ ប្រផេះដែក សញ្ញាពណ៌ទឹកក្រូច និងពណ៌ក្រហមនៃកុងតឺន័រ)។ រូបវិទ្យានៃការអណ្តែត៖ គោលការណ៍ Archimedes និងភាពផ្ទុយនៃដែកដែលដង់ស៊ីតេមធ្យមធ្វើឱ្យកប៉ាល់ដឹកកុងតឺន័រ ២២០,០០០ តោនអណ្តែត ខណៈដែលដែកគោលលង់។ ការរចនាកប៉ាល់យក្ស៖ កប៉ាល់ Ever Ace ប្រវែង ៤០០ ម៉ែត្រដឹក TEU ២៤,០០០ និងបន្ទាត់ Plimsoll — បន្ទាត់ផ្ទុក (TF, F, T, S, W, WNA) ដែល Samuel Plimsoll លាបទប់ស្កាត់នាយកនាវាមិនឱ្យដឹកធ្ងន់ហួស។ មហាវិថីមើលមិនឃើញ៖ ផ្លូវនាវាចរ និងចំណុចច្របាច់ពិភពលោកបី — ច្រកម៉ាឡាកានៅជិតកម្ពុជា ព្រែកជីកស៊ុយអេស និងព្រែកជីកប៉ាណាម៉ា — ដែលដឹក ៩០% នៃពាណិជ្ជកម្មសកល។",
      },
    ],
  },
  {
    labelEn: "Career",
    labelKh: "អាជីព",
    icon: Briefcase,
    color: "blue",
    items: [
      {
        href: "/career/resume-builder",
        labelEn: "Resume Builder",
        labelKh: "បង្កើតប្រវត្តិរូបសង្ខេប",
        icon: FileText,
        descEn: "Build a clean, bilingual Standard Professional resume in four guided steps (Personal Info → Education → Skills → Experience). Office aesthetic — minimalist whites, deep navy blues, clear borders. Skill-Sync pulls in scores from completed mock interviews as 'Passed: ...' badges; an Action-Verb engine offers strong verbs like Managed (ដឹកនាំ), Analyzed (វិភាគ), Engineered (រចនា), and Collaborated (សហការ); every field has a Khmer translation slot. Print or download as PDF — perfect for interviews in Phnom Penh or Siem Reap.",
        descKh: "បង្កើតប្រវត្តិរូបសង្ខេបពីរភាសាបែបជំនាញដ៏ស្អាតក្នុងបួនជំហាន (ព័ត៌មានផ្ទាល់ខ្លួន → ការអប់រំ → ជំនាញ → បទពិសោធន៍)។ រចនាបថការិយាល័យ — ស ដ៏ហ្មត់ចត់ ខៀវឆ្នូត និងស៊ុមច្បាស់លាស់។ ការតភ្ជាប់ជំនាញនាំចូលលទ្ធផលសម្ភាសន៍ជា 'បានជាប់៖' ឬម៉ាស៊ីនកិរិយាស័ព្ទផ្ដល់ពាក្យដូចជា ដឹកនាំ វិភាគ រចនា និងសហការ; គ្រប់វាលមានកន្លែងសម្រាប់បកប្រែខ្មែរ។ បោះពុម្ព ឬទាញយក PDF — សម្រាប់សម្ភាសន៍នៅភ្នំពេញ ឬសៀមរាប។",
      },
      {
        href: "/launchpad",
        labelEn: "Mock Interview",
        labelKh: "សម្ភាសន៍សាកល្បង",
        icon: MessageSquare,
        descEn: "Practice career interviews with the AI Interview Simulator on the Launchpad page — pick a role, answer three questions, and receive a structured performance summary you can later import into your resume.",
        descKh: "ហាត់សម្ភាសន៍អាជីពជាមួយកម្មវិធីសម្ភាសន៍បញ្ញាសិប្បនិម្មិតនៅទំព័រ Launchpad — ជ្រើសរើសតួនាទី ឆ្លើយសំណួរបី ហើយទទួលបានសេចក្ដីសង្ខេបការអនុវត្ត ដែលអ្នកអាចនាំចូលក្នុងប្រវត្តិរូបសង្ខេបនៅពេលក្រោយ។",
      },
    ],
  },
  {
    labelEn: "Well-being",
    labelKh: "សុខុមាលភាព",
    icon: Smile,
    color: "emerald",
    // Only highlight this dropdown when the URL is actually under /well-being.
    // The items list also contains cross-cutting links to /science, /sanctuary,
    // /music-theory, /human-engine, /electrical-safety, /sexual-health, etc.,
    // so per-item matching used to light Well-being up on those pages too.
    basePaths: ["/well-being"],
    items: [
      { href: "/sanctuary",          labelEn: "Sanctuary",             labelKh: "សន្តិភាព",                 icon: Leaf },
      {
        href: "/well-being/soft-skills",
        labelEn: "🤝 Soft Skills: The Invisible Tools",
        labelKh: "🤝 ជំនាញទន់៖ ឧបករណ៍មើលមិនឃើញ",
        icon: Handshake,
        descEn: "Hard skills are WHAT you do (math, coding, fixing a car) — and a machine can do them. Soft skills are HOW you do it (listening, teamwork, staying calm, reading the room). Meet the Core Four — Communication, Teamwork, Adaptability, and Emotional Intelligence — your human advantage.",
        descKh: "ជំនាញរឹង គឺ«អ្វី» ដែលអ្នកធ្វើ (គណិតវិទ្យា ការសរសេរកូដ ការជួសជុលឡាន) — ហើយម៉ាស៊ីនអាចធ្វើបាន។ ជំនាញទន់ គឺ«របៀប» ដែលអ្នកធ្វើវា (ការស្ដាប់ ការងារក្រុម ការនៅស្ងប់ ការយល់អារម្មណ៍មនុស្ស)។ ជួប ជំនាញគោលទាំងបួន — ការប្រាស្រ័យទាក់ទង ការងារក្រុម ភាពបត់បែន និងបញ្ញាស្មារតី — គុណសម្បត្តិមនុស្សរបស់អ្នក។",
      },
      {
        href: "/well-being/sanctuary/structural-violence",
        labelEn: "Structural Violence",
        labelKh: "អំពើហិង្សាជារចនាសម្ព័ន្ធ",
        icon: Unlink,
        descEn: "The invisible injury — how laws, economies, and healthcare systems can quietly harm people by blocking basic needs (Johan Galtung, 1969).",
        descKh: "របួសដែលមើលមិនឃើញ — របៀបដែលច្បាប់ សេដ្ឋកិច្ច និងប្រព័ន្ធថែទាំសុខភាពអាចធ្វើបាបមនុស្សដោយស្ងាត់ៗ តាមរយៈការរារាំងតម្រូវការមូលដ្ឋាន (Johan Galtung, ១៩៦៩)។",
      },
      {
        href: "/well-being/abundance-vs-scarcity",
        labelEn: "Abundance vs. Scarcity",
        labelKh: "ភាពសម្បូរបែប និងភាពខ្សត់ខ្សោយ",
        icon: Gauge,
        descEn: "The architecture of behavior — how scarcity narrows the brain into 'tunnel vision' while abundance unlocks creativity, cooperation, and long-term thinking; and why 'greed' is a symptom of the system, not a human trait.",
        descKh: "ស្ថាបត្យកម្មនៃអាកប្បកិរិយា — របៀបដែលភាពខ្សត់ខ្សោយបង្រួមខួរក្បាលទៅជា 'ចក្ខុវិស័យចង្អៀត' ខណៈដែលភាពសម្បូរបែបបើកការច្នៃប្រឌិត ការសហការ និងការគិតរយៈពេលវែង។ ហើយ 'ភាពលោភលន់' គឺជារោគសញ្ញានៃប្រព័ន្ធ មិនមែនជាលក្ខណៈរបស់មនុស្សទេ។",
      },
      {
        href: "/well-being/public-health",
        labelEn: "Public Health: The Web of Well-Being",
        labelKh: "សុខភាពសាធារណៈ៖ បណ្តាញនៃសុខុមាលភាព",
        icon: HeartPulse,
        descEn: "How disease detectives stop outbreaks, why vaccines protect even the people who can't get them, what cigarette smoke really does to DNA, how chronic stress and inequality damage the heart, and the 85-year Harvard finding that close relationships are the strongest medicine ever measured.",
        descKh: "របៀបដែលអ្នកស៊ើបអង្កេតជំងឺ ឈប់ការផ្ទុះ ហេតុអ្វីវ៉ាក់សាំងការពារសូម្បីតែមនុស្សដែលមិនអាចទទួលវា អ្វីដែលផ្សែងបារីពិតជាធ្វើទៅលើ DNA របៀបដែលភាពតានតឹង និងវិសមភាពបំផ្លាញបេះដូង និងការរកឃើញ ៨៥ ឆ្នាំរបស់ហាវ៉ាដ ដែលថាទំនាក់ទំនងជិតស្និទ្ធគឺជាឱសថខ្លាំងបំផុត។",
      },
      {
        href: "/well-being/disease-divide",
        labelEn: "The Disease Divide: Global Health Perspectives",
        labelKh: "គម្លាតនៃជំងឺ៖ ទិដ្ឋភាពសុខភាពសកល",
        icon: Globe,
        descEn: "Why a child in a village without clean water and a child in a wealthy city die of completely different diseases. Learn the Epidemiological Transition — how clean water, sanitation, and vaccines shift a country from infectious killers (cholera, malaria, tuberculosis) to chronic killers (heart disease, type 2 diabetes, cancer, Alzheimer's).",
        descKh: "ហេតុអ្វីកុមារនៅភូមិដែលគ្មានទឹកស្អាត និងកុមារនៅទីក្រុងធំសម្បូរ ស្លាប់ដោយជំងឺផ្សេងគ្នាទាំងស្រុង។ រៀនពីអន្តរកាលរោគរាតត្បាត — របៀបដែលទឹកស្អាត អនាម័យ និងវ៉ាក់សាំង ផ្លាស់ប្តូរប្រទេសពីអ្នកសម្លាប់ឆ្លង (អាសន្នរោគ គ្រុនចាញ់ របេង) ទៅជាអ្នកសម្លាប់រ៉ាំរ៉ៃ (បេះដូង ទឹកនោមផ្អែម មហារីក Alzheimer)។",
      },
      {
        href: "/well-being/family-development",
        labelEn: "Parenting & Development",
        labelKh: "ការចិញ្ចឹមបីបាច់ និងការវិវត្ត",
        icon: Sprout,
        descEn: "From seed to society — Diana Baumrind's three parenting styles (authoritative, authoritarian, permissive), the science of pregnancy from HCG to the three trimesters and the three stages of labor, and the early milestones of babies and toddlers including a gentle introduction to early signs of autism.",
        descKh: "ពីគ្រាប់ពូជទៅសង្គម — រចនាប័ទ្មចិញ្ចឹមកូនទាំងបីរបស់ Diana Baumrind (មានតុល្យភាព តឹងរ៉ឹងជ្រុល ធូររលុងជ្រុល) វិទ្យាសាស្ត្រនៃការមានផ្ទៃពោះពី HCG ដល់ត្រីមាសទាំងបី និងដំណាក់កាលឈឺពោះសម្រាលទាំងបី និងដំណាក់កាលសំខាន់ៗដំបូងរបស់ទារក និងកុមារតូច រួមទាំងការណែនាំថ្នមៗអំពីសញ្ញាដំបូងនៃអូទីសឹម។",
      },
      {
        href: "/well-being/infant-nutrition",
        labelEn: "Infant Nutrition: Formula, Breast Milk & Safety",
        labelKh: "អាហារូបត្ថម្ភទារក៖ ទឹកដោះគោម្សៅ ទឹកដោះម្តាយ និងសុវត្ថិភាព",
        icon: Baby,
        descEn: "What's actually inside a can of commercial baby formula (iron, vitamin D, calcium, DHA), an honest side-by-side comparison of breast milk and formula, and a high-visibility safety warning every Cambodian caregiver needs to read about the dangers of homemade infant formula.",
        descKh: "តើមានអ្វីពិតប្រាកដនៅក្នុងកំប៉ុងទឹកដោះគោម្សៅពាណិជ្ជកម្ម (ជាតិដែក វីតាមីន D កាល់ស្យូម DHA) ការប្រៀបធៀបស្មោះត្រង់រវាងទឹកដោះម្តាយ និងទឹកដោះគោម្សៅ និងការព្រមានសុវត្ថិភាពច្បាស់លាស់ដែលអ្នកថែទាំជនជាតិខ្មែរគ្រប់រូបត្រូវអានអំពីគ្រោះថ្នាក់នៃទឹកដោះគោម្សៅទារកដែលធ្វើដោយខ្លួនឯង។",
      },
      {
        href: "/well-being/survival-skills",
        labelEn: "Survival Skills: Thriving in the Wild",
        labelKh: "ជំនាញរស់រានមានជីវិត៖ ការរស់នៅក្នុងព្រៃ",
        icon: Compass,
        descEn: "What to do if you ever get lost in the forest: the S.T.O.P. method, the universal Rule of Threes (3 minutes air, 3 hours shelter, 3 days water, 3 weeks food), and Cambodia-specific tips on bamboo water, raised beds, and signal smoke.",
        descKh: "អ្វីដែលត្រូវធ្វើបើអ្នកវង្វេងផ្លូវនៅក្នុងព្រៃ ៖ វិធីសាស្ត្រ S.T.O.P. ច្បាប់នៃលេខ 3 (3 នាទីខ្យល់ 3 ម៉ោងជម្រក 3 ថ្ងៃទឹក 3 សប្ដាហ៍អាហារ) និងគន្លឹះពិសេសសម្រាប់កម្ពុជាស្ដីពីទឹកឫស្សី គ្រែលើកខ្ពស់ និងផ្សែងសញ្ញា។",
      },
      {
        href: "/well-being/survival-hydration",
        labelEn: "Survival Hydration: The Rationing Myth",
        labelKh: "ការរក្សាជាតិទឹកដើម្បីរស់រានមានជីវិត៖ ការយល់ច្រឡំអំពីការត្បិតត្បៀតទឹក",
        icon: Droplet,
        descEn: "The golden rule of wilderness survival — ration sweat, not water. Why tiny sips kill (thickened blood, heatstroke, cognitive collapse), the grim truth that rescuers find victims dead with full canteens, and the right way to conserve water: deep shade, no noon travel, work only at dawn and dusk, and breathe through your nose.",
        descKh: "វិធានមាសនៃការរស់រានមានជីវិតក្នុងព្រៃ — ត្បិតត្បៀតញើស មិនមែនទឹកទេ។ ហេតុអ្វីការបឺតតិចៗសម្លាប់មនុស្ស (ឈាមខាប់ ការក្ដៅខ្លួនធ្ងន់ធ្ងរ ការដួលរលំនៃការគិត) ការពិតដ៏អាក្រក់ដែលអ្នកសង្គ្រោះឃើញជនរងគ្រោះស្លាប់ដោយមានដបពេញ និងវិធីត្រឹមត្រូវដើម្បីសន្សំទឹក៖ ម្លប់ជ្រៅ មិនធ្វើដំណើរនៅពេលថ្ងៃត្រង់ ធ្វើការតែពេលព្រឹកនិងល្ងាច និងដកដង្ហើមតាមច្រមុះ។",
      },
      {
        href: "/well-being/strength-endurance",
        labelEn: "The Human Engine: Strength and Endurance",
        labelKh: "ម៉ាស៊ីនមនុស្ស ៖ កម្លាំង និងភាពធន់",
        icon: Dumbbell,
        descEn: "How muscle actually grows (microscopic tears + over-repair = hypertrophy), why progressive overload is the one rule no strength programme can skip, why a few big compound lifts (bench press, pull-up) beat dozens of isolation exercises, what cardio really upgrades (heart chambers, capillaries, oxygen efficiency — not biceps), and the modern sports-science U-turn: never static-stretch a cold muscle before lifting — use dynamic warm-ups instead.",
        descKh: "របៀបដែលសាច់ដុំលូតលាស់ពិតប្រាកដ (រហែកមីក្រូ + ការជួសជុលលើស = ហ៊ីប៉ឺត្រូហ្វី) ហេតុអ្វីការដាក់បន្ទុកជាបណ្ដើរៗជាច្បាប់តែមួយដែលគ្រោងការណ៍កម្លាំងណាមួយមិនអាចរំលង ហេតុអ្វីការលើកទម្ងន់រួមធំៗមួយចំនួន (Bench Press, Pull-up) ឈ្នះលំហាត់ដាច់ដោយឡែករាប់សិប អ្វីដែលលំហាត់បេះដូងពិតជាធ្វើឲ្យប្រសើរ (បន្ទប់បេះដូង សរសៃឈាមតូច ប្រសិទ្ធភាពអុកស៊ីសែន — មិនមែនប៊ីសេបទេ) និងការបង្វែរនៃវិទ្យាសាស្ត្រកីឡាសម័យថ្មី ៖ កុំទាញសាច់ដុំស្ងៀមលើសាច់ដុំត្រជាក់មុនលើករបស់ធ្ងន់ — ប្រើការក្ដៅឡើងថាមវន្តជំនួស។",
      },
      {
        href: "/human-engine",
        labelEn: "Nutrition & Movement",
        labelKh: "អាហារូបត្ថម្ភ និងចលនា",
        icon: Dumbbell,
        descEn: "How food fuels you, how exercise builds heart and muscle, and what 'rust' (sitting too much) does to your body over time.",
        descKh: "របៀបដែលអាហារផ្ដល់ឥន្ធនៈដល់អ្នក របៀបដែលលំហាត់ប្រាណសាងសង់បេះដូង និងសាច់ដុំ និងអ្វីដែល 'ច្រេះ' (ការអង្គុយច្រើនពេក) ធ្វើដល់រាងកាយរបស់អ្នកតាមពេលវេលា។",
      },
      {
        href: "/music-theory",
        labelEn: "Music Theory & The Art of Sound",
        labelKh: "ទ្រឹស្តីតន្ត្រី និងសិល្បៈនៃសំឡេង",
        icon: Music,
        descEn: "An interactive journey through instrument families, chords with jobs, the magic of voice leading, polyrhythms, and a re-harmonized Twinkle Twinkle — with audio at every step.",
        descKh: "ដំណើរអន្តរកម្មកាត់គ្រួសារឧបករណ៍ភ្លេង, chord ដែលមានការងារ, voice leading, polyrhythm, និង Twinkle Twinkle ដែលបានរៀបចំឡើងវិញ — មានសំឡេងគ្រប់ជំហាន។",
      },
      {
        href: "/music/20th-century",
        labelEn: "20th Century Genres",
        labelKh: "ចង្វាក់​ភ្លេង​សតវត្ស​ទី ២០",
        icon: Disc3,
        descEn: "The Electric Revolution — how blues and jazz turned into rock and metal once amplifiers were invented, then how DJs in the Bronx made the turntable itself a brand-new instrument and started hip-hop & rap.",
        descKh: "បដិវត្តន៍​អគ្គិសនី — របៀប​ដែល​ប៊្លូស និង​ហ្សាស​ប្រែ​ក្លាយ​ជា​រ៉ុក និង​មេតាល់​ពេល​បំពង​សំឡេង​ត្រូវ​បាន​បង្កើត ​បន្ទាប់​មក​របៀប​ដែល​ឌី​ជេ​នៅ Bronx បាន​ធ្វើ​ឱ្យ​ម៉ាស៊ីន​បង្វិល​ថាស​ក្លាយ​ជា​ឧបករណ៍​ភ្លេង​ថ្មី ហើយ​ចាប់​ផ្តើម​ហ៊ីបហប និង​រ៉េប។",
      },
      { href: "/science",            labelEn: "Scientific Literacy",    labelKh: "ចំណេះដឹងវិទ្យាសាស្ត្រ",  icon: FlaskConical },
      { href: "/electrical-safety",  labelEn: "Electrical Safety",      labelKh: "សុវត្ថិភាពអគ្គិសនី",      icon: Zap },
      {
        href: "/sexual-health",
        labelEn: "Sexual Health & Pathogen Protection",
        labelKh: "សុខភាពផ្លូវភេទ និងការការពារមេរោគ",
        icon: HeartPulse,
        descEn: "Clear, non-judgmental information about STIs, common myths, and what to do if you are worried — with a Quick Exit button for privacy.",
        descKh: "ព័ត៌មានច្បាស់លាស់ មិនវិនិច្ឆ័យ អំពី STI ការយល់ខុសសាមញ្ញ និងអ្វីដែលត្រូវធ្វើបើព្រួយបារម្ភ — មានប៊ូតុងចេញលឿនដើម្បីភាពឯកជន។",
      },
      { href: "https://finlitkh.com",    labelEn: "Financial Literacy",       labelKh: "ចំណេះដឹងហិរញ្ញវត្ថុ",    icon: Banknote, external: true },
      {
        href: "https://bfiworldgame.com",
        labelEn: "Global Resource Game (BFI World Game)",
        labelKh: "ល្បែងធនធានពិភពលោក (BFI World Game)",
        icon: Globe,
        external: true,
        descEn: "Learn to manage Earth's resources so that 100% of humanity can thrive.",
        descKh: "រៀនគ្រប់គ្រងធនធានរបស់ផែនដី ដើម្បីឱ្យមនុស្សជាតិ ១០០% អាចរីកចម្រើន។",
      },
    ],
  },
  {
    labelEn: "For Kids (សម្រាប់កុមារ)",
    labelKh: "សម្រាប់កុមារ (For Kids)",
    icon: Blocks,
    color: "orange",
    items: [
      {
        href: "/beginner-guide",
        labelEn: "English & Math Starter",
        labelKh: "មូលដ្ឋានគ្រឹះអង់គ្លេស និងគណិតវិទ្យា",
        icon: Sparkles,
        descEn: "Foundational starter for primary-school learners — alphabet A–Z with pictures, numbers 1–100, and a 100–1,000 number-builder.",
        descKh: "មូលដ្ឋានគ្រឹះសម្រាប់សិស្សបឋមសិក្សា — អក្ខរក្រម A–Z មានរូបភាព លេខ ១–១០០ និងឧបករណ៍សាងសង់លេខ ១០០–១,០០០។",
      },
      {
        href: "/for-kids/word-popper",
        labelEn: "The Word Popper",
        labelKh: "ប៉ោងប៉ោងពាក្យ",
        icon: LanguagesIcon,
        descEn: "Tap the floating letter balloons in the right order to spell each word — a playful alphabet game that builds English spelling, one pop at a time.",
        descKh: "ប៉ះប៉ោងប៉ោងអក្សរតាមលំដាប់ត្រឹមត្រូវ ដើម្បីប្រកបពាក្យនីមួយៗ — ល្បែងអក្ខរក្រមរីករាយ ដែលជួយកសាងការប្រកបពាក្យអង់គ្លេសម្តងមួយប៉ោង។",
      },
      {
        href: "/for-kids/my-day",
        labelEn: "My Day: Actions & Health",
        labelKh: "ថ្ងៃរបស់ខ្ញុំ៖ សកម្មភាព និងសុខភាព",
        icon: Sun,
        descEn: "Tap-to-hear vocabulary cards for everyday actions — wake up, wash hands, brush teeth, eat, play, sleep — with bilingual health tips.",
        descKh: "កាតវាក្យសព្ទចុចស្ដាប់សម្រាប់សកម្មភាពប្រចាំថ្ងៃ — ភ្ញាក់ពីដេក លាងដៃ ដុសធ្មេញ ញ៉ាំ លេង ដេក — មានគន្លឹះសុខភាពពីរភាសា។",
      },
      {
        href: "/for-kids/animals",
        labelEn: "Animals: Near & Far",
        labelKh: "សត្វ៖ ជិត និងឆ្ងាយ",
        icon: PawPrint,
        descEn: "Two-section vocabulary — animals at home and on the farm, then wildlife from across the world. Tap a card to hear the English name.",
        descKh: "វាក្យសព្ទពីរផ្នែក — សត្វនៅផ្ទះ និងនៅកសិដ្ឋាន រួចសត្វព្រៃពីជុំវិញពិភពលោក។ ប៉ះកាតដើម្បីស្ដាប់ឈ្មោះជាភាសាអង់គ្លេស។",
      },
      {
        href: "/for-kids/habitat-sorter",
        labelEn: "The Habitat Sorter",
        labelKh: "ផ្ទះសត្វ",
        icon: Trees,
        descEn: "Drag each animal back to the habitat where it lives — forest, ocean, farm, desert. A bilingual sorting game that teaches where in the world each creature calls home.",
        descKh: "អូសសត្វនីមួយៗត្រឡប់ទៅកាន់ទីជម្រកដែលវារស់នៅ — ព្រៃ មហាសមុទ្រ កសិដ្ឋាន វាលខ្សាច់។ ល្បែងតម្រៀបពីរភាសាដែលបង្រៀនពីកន្លែងដែលសត្វនីមួយៗហៅថាផ្ទះ។",
      },
      {
        href: "/for-kids/feelings",
        labelEn: "My Feelings",
        labelKh: "អារម្មណ៍របស់ខ្ញុំ",
        icon: Smile,
        descEn: "Big-emoji feelings vocabulary — happy, sad, angry, scared, tired, hungry. Tap a face to hear the English word and learn to talk about emotions.",
        descKh: "វាក្យសព្ទអារម្មណ៍ដែលមានរូបធំៗ — សប្បាយចិត្ត ពិបាកចិត្ត ខឹង ភ័យខ្លាច អស់កម្លាំង ឃ្លាន។ ប៉ះមុខដើម្បីស្ដាប់ពាក្យអង់គ្លេស ហើយរៀននិយាយពីអារម្មណ៍។",
      },
      {
        href: "/for-kids/healthy-foods",
        labelEn: "Fuel Your Body: Healthy Foods 🍎",
        labelKh: "ផ្តល់ថាមពលដល់រាងកាយ៖ អាហារសុខភាព 🍎",
        icon: Apple,
        descEn: "A rainbow of fruits, vegetables, energy foods, and proteins — with the 'superpower' (vitamin or mineral) each one gives your growing body and brain.",
        descKh: "ឥន្ទធនូនៃផ្លែឈើ បន្លែ អាហារថាមពល និងសាច់ — ជាមួយ 'អំណាចពិសេស' (វីតាមីន ឬសារធាតុរ៉ែ) ដែលនីមួយៗផ្តល់ឲ្យរាងកាយ និងខួរក្បាលរបស់អ្នកដែលកំពុងលូតលាស់។",
      },
      {
        href: "/kids/science",
        labelEn: "Science for Kids",
        labelKh: "វិទ្យាសាស្ត្រសម្រាប់កុមារ",
        icon: Search,
        descEn: "The three branches of science — Biology (the study of life), Chemistry (what things are made of), and Physics (how things move). Tap any card to hear the English word.",
        descKh: "បីផ្នែកនៃវិទ្យាសាស្ត្រ — ជីវវិទ្យា (ការសិក្សាអំពីជីវិត), គីមីវិទ្យា (តើវត្ថុធ្វើពីអ្វី), និងរូបវិទ្យា (របៀបដែលវត្ថុផ្លាស់ទី)។ ប៉ះកាតណាក៏បាន ដើម្បីស្ដាប់ពាក្យអង់គ្លេស។",
      },
      {
        href: "/kids/community",
        labelEn: "My Community",
        labelKh: "សហគមន៍របស់ខ្ញុំ",
        icon: Handshake,
        descEn: "Places & people — picture cards for the village (school, market, farm, pagoda, hospital) and the helpers who care for us (teacher, farmer, doctor, monk). Tap any card to hear the English word.",
        descKh: "ទីកន្លែង និងមនុស្ស — កាតរូបភាពអំពីភូមិ (សាលារៀន ផ្សារ កសិដ្ឋាន វត្ត មន្ទីរពេទ្យ) និងអ្នកជួយយើង (គ្រូបង្រៀន កសិករ គ្រូពេទ្យ ព្រះសង្ឃ)។ ប៉ះកាតណាក៏បាន ដើម្បីស្ដាប់ពាក្យអង់គ្លេស។",
      },
      {
        href: "/kids/electronics",
        labelEn: "Power & Light",
        labelKh: "ថាមពល និងពន្លឺ",
        icon: Lightbulb,
        descEn: "Basic electronics — picture cards for power sources (battery, solar panel, plug) and circuit parts (wire, switch, lightbulb, motor). Tap any card to hear the English word.",
        descKh: "អេឡិចត្រូនិកមូលដ្ឋាន — កាតរូបភាពពីប្រភពថាមពល (ថ្ម ផ្ទាំងសូឡា ព្រីភ្លើង) និងគ្រឿងសៀគ្វី (ខ្សែភ្លើង កុងតាក់ អំពូល ម៉ូទ័រ)។ ប៉ះកាតណាក៏បាន ដើម្បីស្ដាប់ពាក្យអង់គ្លេស។",
      },
      {
        href: "/kids/math-tables",
        labelEn: "Math Magic 🧮",
        labelKh: "វេទមន្តគណិតវិទ្យា 🧮",
        icon: Calculator,
        descEn: "Numbers & tables — interactive Addition (blue) & Subtraction (red) fact tables, plus a 10×10 Multiplication (green) / Division (purple) grid with row+column highlight. Tap any equation to hear it in English.",
        descKh: "លេខ និងតារាង — តារាងវិធីបូក (ខៀវ) និងវិធីដក (ក្រហម) ដែលអាចចុចបាន រួមជាមួយតារាង ១០×១០ វិធីគុណ (បៃតង) និងវិធីចែក (ស្វាយ) ដែលបញ្ជាក់ជួរ និងជួរឈរ។ ប៉ះសមីការណាមួយដើម្បីស្ដាប់ជាភាសាអង់គ្លេស។",
      },
    ],
  },
];

const ADMIN_ITEM: NavItem = {
  href: "/admin",
  labelEn: "Admin",
  labelKh: "គ្រប់គ្រង",
  icon: PlusCircle,
};

// ── DropdownGroup ──────────────────────────────────────────────────────────────

function DropdownGroup({
  group,
  location,
  language,
}: {
  group: NavGroup;
  location: string;
  language: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const kh = language === "kh";
  const hasDescriptions = group.items.some((item) => item.descEn || item.descKh);

  // Portal-positioned panel coords (viewport-fixed). Recomputed on open,
  // scroll, and resize so the panel "follows" the trigger but is never
  // clipped by the scrollable pills container.
  const [panelPos, setPanelPos] = useState<{ top: number; left: number } | null>(null);
  const panelMinWidth = hasDescriptions ? 300 : 200;

  const isGroupActive = isGroupActiveFor(location, group);
  const theme = COLOR_THEMES[group.color ?? "slate"] ?? COLOR_THEMES.slate;
  // The pill turns "vibrant" (solid fill + white text) when the dropdown is
  // open OR the user is currently on a page that belongs to this group.
  const pillStateClasses = open || isGroupActive ? theme.active : theme.default;

  // Close the dropdown automatically whenever the route changes — guarantees
  // any "stuck" hover/focus state from the previous panel is dropped.
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Close on outside click + Escape (matches mobile-menu behaviour).
  // Outside = neither the trigger wrapper nor the portaled panel.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      const target = e.target as Node;
      if (ref.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Compute & maintain the portaled panel's viewport position. We pin the
  // panel to the trigger's left edge, but flip rightward if it would
  // overflow the viewport, so right-edge pills (e.g. "For Kids") never
  // get clipped.
  useLayoutEffect(() => {
    if (!open) {
      setPanelPos(null);
      return;
    }
    function recompute() {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const viewportW = window.innerWidth;
      const margin = 8;
      let left = rect.left;
      // If left-aligned panel would overflow right edge, right-align it
      // to the trigger instead.
      if (left + panelMinWidth + margin > viewportW) {
        left = Math.max(margin, rect.right - panelMinWidth);
      }
      // Clamp to viewport.
      if (left < margin) left = margin;
      const top = rect.bottom + 6;
      setPanelPos({ top, left });
    }
    recompute();
    window.addEventListener("resize", recompute);
    window.addEventListener("scroll", recompute, true);
    return () => {
      window.removeEventListener("resize", recompute);
      window.removeEventListener("scroll", recompute, true);
    };
  }, [open, panelMinWidth]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger button — uses disclosure (button + aria-expanded) semantics
          rather than role="menu", per WAI-ARIA APG guidance for site nav. */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={kh ? group.labelKh : group.labelEn}
        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-bold whitespace-nowrap select-none border border-transparent transition-all duration-200 ease-out hover:scale-105 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current/40 ${pillStateClasses}`}
      >
        <group.icon className="w-4 h-4 flex-shrink-0" aria-hidden />
        <span className={kh ? "font-khmer text-sm" : ""}>
          {kh ? group.labelKh : group.labelEn}
        </span>
        <ChevronDown
          className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Dropdown panel — portaled to <body> so the scrollable pills
          container's overflow:auto cannot clip it. Position is
          recomputed from the trigger's viewport rect. */}
      {open && panelPos && typeof document !== "undefined" && createPortal(
        <div
          ref={panelRef}
          id={panelId}
          aria-label={kh ? group.labelKh : group.labelEn}
          className="nav-dropdown-scroll"
          style={{
            position: "fixed",
            top: `${panelPos.top}px`,
            left: `${panelPos.left}px`,
            zIndex: 9999,
            minWidth: `${panelMinWidth}px`,
            maxWidth: `min(${panelMinWidth + 120}px, calc(100vw - 16px))`,
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.14)",
            padding: "6px",
            maxHeight: "min(60vh, 480px)",
            overflowY: "auto",
            overscrollBehavior: "contain",
            scrollBehavior: "smooth",
          }}
        >
          {group.items.map((item) => {
            const isActive = isItemActive(location, item);

            const hasDesc = !!(item.descEn || item.descKh);
            const sharedStyle: React.CSSProperties = {
              display: "flex",
              alignItems: hasDesc ? "flex-start" : "center",
              gap: "10px",
              padding: "10px 14px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              color: isActive ? "hsl(var(--primary))" : "hsl(var(--foreground))",
              backgroundColor: isActive ? "hsl(var(--primary) / 0.08)" : "transparent",
              transition: "background-color 0.1s",
            };

            const sharedHover = {
              onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(var(--muted) / 0.6)";
              },
              onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              },
            };

            const inner = (
              <>
                <item.icon
                  className="w-4 h-4 flex-shrink-0"
                  aria-hidden
                  style={{
                    color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                    marginTop: hasDesc ? "2px" : "0",
                  }}
                />
                <span className="flex-1 min-w-0">
                  <span className={`block ${kh ? "font-khmer" : ""}`}>
                    {kh ? item.labelKh : item.labelEn}
                  </span>
                  {hasDesc && (
                    <span
                      className={`block leading-snug mt-0.5 ${kh ? "font-khmer" : ""}`}
                      style={{ fontSize: "11px", color: "hsl(var(--muted-foreground))", fontWeight: 400 }}
                    >
                      {kh ? item.descKh : item.descEn}
                    </span>
                  )}
                </span>
                {isActive && (
                  <span
                    style={{
                      marginLeft: "auto",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "hsl(var(--primary))",
                      flexShrink: 0,
                    }}
                  />
                )}
              </>
            );

            return item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                style={sharedStyle}
                {...sharedHover}
              >
                {inner}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={sharedStyle}
                {...sharedHover}
              >
                {inner}
              </Link>
            );
          })}
        </div>,
        document.body,
      )}
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────

export function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auto-close mobile menu when the route changes (covers any in-app
  // navigation we forgot to wire setMobileOpen(false) on).
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Close mobile menu on ESC for keyboard accessibility.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { language, toggleLanguage } = useLanguageStore();
  const t = useTranslation();
  const { user, logout } = useAuth();
  const kh = language === "kh";

  const LanguageToggle = ({ compact = false }: { compact?: boolean }) => (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`flex items-center gap-1.5 rounded-full border-2 border-primary/25 bg-white hover:bg-primary/5 hover:border-primary/50 transition-all font-bold text-primary shadow-sm active:scale-95
        ${compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`}
    >
      <span className={language === "en" ? "opacity-100" : "opacity-35 font-normal"}>EN</span>
      <span className="opacity-25">|</span>
      <span className={language === "kh" ? "opacity-100 font-khmer" : "opacity-35 font-normal font-khmer"}>ខ្មែរ</span>
    </button>
  );

  return (
    <header
      className="sticky top-0 w-full border-b border-border/40"
      style={{ zIndex: 50, backgroundColor: "rgba(255,255,255,0.97)", boxShadow: "0 1px 12px rgba(0,0,0,0.08)" }}
    >
      {/* ── Row 1: Logo + controls ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo + slogan */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-shrink">
            <Link
              href="/"
              className="flex items-center gap-3 group flex-shrink-0"
              onClick={() => setMobileOpen(false)}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Chouy Sala Logo"
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-xl text-primary">Chouy Sala</span>
                <span className="font-khmer text-xs text-muted-foreground">ជួយសាលា</span>
              </div>
            </Link>

            {/* Live Student Counter — pulsing green dot + bilingual count */}
            <LiveStudentCounter />
            <LiveStudentCounterCompact />

            {/* Slogan — hidden on mobile, visible from xl up to make room for the counter */}
            <div
              className="hidden xl:flex items-center gap-3 min-w-0"
              aria-hidden={false}
            >
              <span
                className="h-7 w-px bg-slate-300/80"
                aria-hidden="true"
              />
              <span
                className={`text-[13px] font-light text-slate-500 truncate ${
                  language === "kh" ? "font-khmer leading-snug" : ""
                }`}
                title={t(
                  "The Educational Front Page of Cambodia",
                  "ទំព័រមុខនៃការអប់រំនៅកម្ពុជា",
                )}
              >
                {t(
                  "The Educational Front Page of Cambodia",
                  "ទំព័រមុខនៃការអប់រំនៅកម្ពុជា",
                )}
              </span>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Bell + Theme + Language toggles — hidden on mobile (toggles
                are surfaced inside the hamburger drawer below) so the mobile
                header stays strictly Logo (left) ↔ Hamburger (right).
                NotificationBell already self-hides for non-school accounts;
                wrapping in `hidden lg:flex` ensures it never appears in the
                mobile header even for school users. */}
            <div className="hidden lg:flex items-center gap-3">
              <NotificationBell />
              <ThemePalette />
              <LanguageToggle />
            </div>

            {/* Auth — desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20">
                    <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className={`text-xs font-semibold text-primary truncate max-w-[120px] ${kh ? "font-khmer text-sm" : ""}`}>
                      {user.school ? (kh ? user.school.nameKh : user.school.nameEn) : user.email}
                    </span>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground text-xs font-bold transition-all"
                  >
                    <User className="w-3.5 h-3.5" />
                    {t("Profile", "ប្រូហ្វាយ")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted hover:bg-destructive/10 hover:text-destructive text-muted-foreground text-xs font-bold transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    {t("Sign out", "ចេញ")}
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-md hover:bg-primary/90 transition-all active:scale-95"
                >
                  <LogIn className="w-4 h-4" />
                  {t("Sign In", "ចូលគណនី")}
                </Link>
              )}
              <InstallAppButton variant="compact" />
            </div>

            {/* Hamburger — mobile */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-3 text-foreground bg-black/5 rounded-xl hover:bg-black/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={mobileOpen ? t("Close menu", "បិទ​ម៉ឺនុយ") : t("Open menu", "បើក​ម៉ឺនុយ")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Row 2: Dropdown nav — desktop only ─────────────────
          The global search bar has been relocated out of this row and
          into the page Hero. The category pills now occupy the full
          width of the row, with the optional Admin pill on the right.
          Horizontal overflow scrolling is preserved so categories
          remain reachable on narrower desktops. */}
      <div className="hidden lg:block border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full gap-4 h-11">
            <nav
              aria-label={kh ? "ប្រភេទនៃការរុករក" : "Site categories"}
              className="flex items-center gap-2 flex-1 w-full justify-start min-w-0 overflow-x-auto whitespace-nowrap hide-scrollbar"
            >
              {NAV_GROUPS.map((group) => (
                <DropdownGroup
                  key={group.labelEn}
                  group={group}
                  location={location}
                  language={language}
                />
              ))}
            </nav>

            {user?.isAdmin && (
              <Link
                href="/admin"
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
                  location.startsWith("/admin")
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-white text-primary border-primary/30 hover:border-primary/60 hover:bg-primary/5"
                } ${kh ? "font-khmer" : ""}`}
              >
                <Shield className="w-3.5 h-3.5" />
                {kh ? "គ្រប់គ្រង" : "Admin"}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          role="dialog"
          aria-modal="false"
          aria-label={t("Site navigation", "ការ​រុក​រក​គេហទំព័រ")}
          className="lg:hidden border-t border-border/50 pb-4"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            zIndex: 9999,
            backgroundColor: "rgba(255,255,255,0.98)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            borderRadius: "0 0 20px 20px",
            maxHeight: "calc(100vh - 4rem)",
            overflowY: "auto",
          }}
        >
          <nav className="flex flex-col p-3 gap-1">
            {/* Mobile global search */}
            <div className="px-1 pt-1 pb-2">
              <GlobalSearch variant="compact" onNavigate={() => setMobileOpen(false)} />
            </div>

            {/* Mobile-only Theme + Language toggles — these live in the
                desktop header on lg+ screens but are surfaced here so the
                mobile header itself stays clean (logo ↔ hamburger only). */}
            <div className="px-1 pb-2 flex items-center gap-2">
              <ThemePalette />
              <LanguageToggle compact />
            </div>

            {NAV_GROUPS.map((group) => {
              const isGroupActive = isGroupActiveFor(location, group);
              const isExpanded = mobileExpanded === group.labelEn;

              return (
                <div key={group.labelEn}>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpanded((prev) =>
                        prev === group.labelEn ? null : group.labelEn
                      )
                    }
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-base transition-colors
                      ${isGroupActive ? "bg-primary/8 text-primary" : "text-foreground hover:bg-black/5"}`}
                  >
                    <group.icon className={`w-5 h-5 flex-shrink-0 ${isGroupActive ? "text-primary" : "text-muted-foreground"}`} aria-hidden />
                    <span className={`flex-1 text-left ${kh ? "font-khmer" : ""}`}>
                      {kh ? group.labelKh : group.labelEn}
                    </span>
                    <ChevronDown
                      className="w-4 h-4 opacity-50 transition-transform duration-150"
                      style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>

                  {isExpanded && (
                    <div
                      className="nav-dropdown-scroll ml-4 mt-0.5 mb-1 flex flex-col gap-0.5 border-l-2 border-primary/20 pl-3 max-h-[60vh] overflow-y-auto overscroll-contain"
                    >
                      {group.items.map((item) => {
                        const isActive = isItemActive(location, item);

                        const itemHasDesc = !!(item.descEn || item.descKh);
                        const mobileItemClass = `flex ${itemHasDesc ? "items-start" : "items-center"} gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                          ${isActive ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-black/5 hover:text-foreground"}`;
                        const mobileInner = (
                          <>
                            <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"} ${itemHasDesc ? "mt-0.5" : ""}`} aria-hidden />
                            <span className="flex-1 min-w-0">
                              <span className={`block ${kh ? "font-khmer" : ""}`}>
                                {kh ? item.labelKh : item.labelEn}
                              </span>
                              {itemHasDesc && (
                                <span className={`block text-xs text-muted-foreground leading-snug mt-0.5 font-normal ${kh ? "font-khmer" : ""}`}>
                                  {kh ? item.descKh : item.descEn}
                                </span>
                              )}
                            </span>
                          </>
                        );

                        return item.external ? (
                          <a
                            key={item.href}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                            className={mobileItemClass}
                          >
                            {mobileInner}
                          </a>
                        ) : (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={mobileItemClass}
                          >
                            {mobileInner}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {user?.isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-primary border-2 border-primary/25 hover:bg-primary/5 text-sm transition-all ${kh ? "font-khmer" : ""}`}
              >
                <Shield className="w-5 h-5" />
                {kh ? "គ្រប់គ្រង" : "Admin Dashboard"}
              </Link>
            )}

            {/* ── Account section ───────────────────────────────────
             * Always visible in the mobile drawer so students never lose
             * access to Sign In / Profile / Sign Out / Install App on
             * small screens (where the desktop auth row is hidden).
             * ──────────────────────────────────────────────────────── */}
            <div
              data-testid="mobile-auth-section"
              className="mt-3 pt-3 border-t-2 border-primary/15"
            >
              <div className={`px-2 mb-2 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {kh ? "គណនី" : "Account"}
              </div>

              {user ? (
                <div className="flex flex-col gap-2 px-1">
                  {/* Logged-in chip showing the school / email */}
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className={`text-sm font-semibold text-primary truncate ${kh ? "font-khmer" : ""}`}>
                      {user.school ? (kh ? user.school.nameKh : user.school.nameEn) : user.email}
                    </span>
                  </div>

                  {/* Profile — full width, centered, prominent */}
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    data-testid="mobile-profile-link"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-bold bg-primary text-primary-foreground text-base shadow-md active:scale-[0.98] transition"
                  >
                    <User className="w-5 h-5" />
                    <span className={kh ? "font-khmer" : ""}>{kh ? "ប្រូហ្វាយរបស់ខ្ញុំ" : "My Profile"}</span>
                  </Link>

                  {/* Sign out — full width, centered, secondary */}
                  <button
                    type="button"
                    onClick={() => { logout(); setMobileOpen(false); }}
                    data-testid="mobile-signout-button"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-destructive border-2 border-destructive/30 bg-destructive/5 hover:bg-destructive/10 text-sm transition active:scale-[0.98]"
                  >
                    <LogOut className="w-5 h-5" />
                    {t("Sign out", "ចេញ")}
                  </button>
                </div>
              ) : (
                /* Sign In — flagship full-width thumb-friendly primary button */
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  data-testid="mobile-signin-link"
                  className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-2xl font-bold bg-primary text-primary-foreground text-base shadow-lg shadow-primary/30 active:scale-[0.98] transition"
                >
                  <LogIn className="w-5 h-5" />
                  {t("Sign In", "ចូលគណនី")}
                </Link>
              )}

              {/* Install App — always available, full-width */}
              <div className="mt-2" data-testid="mobile-install-app">
                <InstallAppButton variant="full" className="w-full" />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
