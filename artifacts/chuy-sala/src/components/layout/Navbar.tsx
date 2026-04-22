import { Link, useLocation } from "wouter";
import {
  Map, Heart, CheckCircle, Menu, X, PlusCircle, LogIn, LogOut,
  GraduationCap, Handshake, BookOpen, Leaf, Star,
  Shield, Rocket, ChevronDown, Compass, Library, FlaskConical, Smile, User, Sun, Columns3, Dna,
  Banknote, Wrench, Globe, Zap, Atom, Beaker, Microscope, Sparkles, PersonStanding, PenLine, Mountain, LifeBuoy, Cpu, Binary, Waves, Camera, CloudRain, Thermometer, HeartPulse, Plane, Magnet, Music, Sigma, Fuel, Bike, Bot, Gamepad2, Users, Brain, Dumbbell, Hexagon, Diamond, FlaskRound, Building2, Snowflake, Train, ScrollText, Landmark, Network, Trees, Radar as RadarIcon, Flag, Radiation, Tv, Languages as LanguagesIcon, BrainCircuit, Factory, Bug, Pill, Radio, Lock, Eye, Car,
} from "lucide-react";
import { useState, useRef, useEffect, ComponentType } from "react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import { useAuth } from "@/context/AuthContext";
import { NotificationBell } from "@/components/NotificationBell";
import { ThemePalette } from "@/components/ThemePalette";
import { GlobalSearch } from "@/components/GlobalSearch";
import { InstallAppButton } from "@/components/InstallAppButton";

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

type NavGroup = {
  labelEn: string;
  labelKh: string;
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  items: NavItem[];
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
    items: [
      { href: "/launchpad", labelEn: "Scholarships", labelKh: "អាហារូបករណ៍", icon: BookOpen },
      { href: "/charities", labelEn: "Partners",      labelKh: "ដៃគូ",          icon: Handshake },
      { href: "/alumni",    labelEn: "Alumni",         labelKh: "រឿងជោគជ័យ",   icon: Star },
      { href: "/reading-list", labelEn: "Reading List", labelKh: "បញ្ជីសៀវភៅអាន", icon: BookOpen },
    ],
  },
  {
    labelEn: "Study Center",
    labelKh: "មជ្ឈមណ្ឌលសិក្សា",
    icon: FlaskConical,
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
      { href: "/english-writing",       labelEn: "English Writing",  labelKh: "ការសរសេរភាសាអង់គ្លេស", icon: PenLine },
      {
        href: "/study-center/wildlife-explorer",
        labelEn: "Wildlife Explorer: Zoo Animals",
        labelKh: "ការរុករកសត្វព្រៃ៖ សត្វសួនសត្វ",
        icon: Leaf,
        descEn: "A bilingual flashcard deck of zoo animals with one-tap audio in English and Khmer — built for younger learners.",
        descKh: "ឈុតកាតវាក្យសព្ទពីរភាសាអំពីសត្វសួនសត្វ ជាមួយសំឡេងចុចម្ដងបានភ្លាមៗជាភាសាអង់គ្លេស និងខ្មែរ — សម្រាប់អ្នករៀនវ័យក្មេង។",
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
    ],
  },
  {
    labelEn: "Science",
    labelKh: "វិទ្យាសាស្ត្រ",
    icon: Atom,
    items: [
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
        href: "/science/chemistry/analytical",
        labelEn: "8. Analytical Chemistry",
        labelKh: "៨. គីមីវិភាគ និងឧបករណ៍",
        icon: FlaskRound,
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
        href: "/technology/television",
        labelEn: "Television: The Illusion of Light",
        labelKh: "ទូរទស្សន៍៖ ការបំភាន់នៃពន្លឺ",
        icon: Tv,
        descEn: "Why a screen has no white, no yellow, and no orange — only red, green, and blue. Mix RGB live, dissect a CRT electron gun, peel back the six layers of an LCD, and learn the simple maths behind HD and 4K.",
        descKh: "ហេតុអ្វីអេក្រង់គ្មានពណ៌ស គ្មានពណ៌លឿង គ្មានពណ៌ទឹកក្រូច — មានតែក្រហម បៃតង និងខៀវ។ លាយ RGB ផ្ទាល់ កាត់មើល CRT បកស្រាយ ៦ ស្រទាប់នៃ LCD និងរៀនគណិតវិទ្យាសាមញ្ញនៅពីក្រោយ HD និង 4K។",
      },
      {
        href: "/technology/future-intelligence",
        labelEn: "The Future of Intelligence & Economy",
        labelKh: "អនាគតនៃបញ្ញា និងសេដ្ឋកិច្ច",
        icon: BrainCircuit,
        descEn: "Climb the three rungs of the AI ladder (narrow AI today, human-level AGI tomorrow, the super-intelligent ASI singularity), peek at the if/then logic behind every program written in Python, JavaScript, and C++, and ask whether a planet-wide AI 'World Game' could one day feed everyone without money or competition.",
        descKh: "ឡើងជណ្ដើរ AI ទាំងបី (AI តូចចង្អៀតថ្ងៃនេះ AGI កម្រិតមនុស្សថ្ងៃស្អែក និង ASI ឯកឧត្តមឆ្លាតខ្ពស់) មើលតក្កវិជ្ជាប្រសិនបើ/នោះនៅពីក្រោយកម្មវិធីគ្រប់ប្រភេទដែលសរសេរក្នុង Python, JavaScript, និង C++ និងសួរថា តើ 'ហ្គេមពិភពលោក' AI ពេញផែនដី អាចចិញ្ចឹមមនុស្សគ្រប់គ្នាដោយគ្មានលុយ ឬការប្រកួតប្រជែងបានទេ ?",
      },
    ],
  },
  {
    labelEn: "Well-being",
    labelKh: "សុខុមាលភាព",
    icon: Smile,
    // Only highlight this dropdown when the URL is actually under /well-being.
    // The items list also contains cross-cutting links to /science, /sanctuary,
    // /music-theory, /human-engine, /electrical-safety, /sexual-health, etc.,
    // so per-item matching used to light Well-being up on those pages too.
    basePaths: ["/well-being"],
    items: [
      { href: "/sanctuary",          labelEn: "Sanctuary",             labelKh: "សន្តិភាព",                 icon: Leaf },
      {
        href: "/well-being/public-health",
        labelEn: "Public Health: The Web of Well-Being",
        labelKh: "សុខភាពសាធារណៈ៖ បណ្តាញនៃសុខុមាលភាព",
        icon: HeartPulse,
        descEn: "How disease detectives stop outbreaks, why vaccines protect even the people who can't get them, what cigarette smoke really does to DNA, how chronic stress and inequality damage the heart, and the 85-year Harvard finding that close relationships are the strongest medicine ever measured.",
        descKh: "របៀបដែលអ្នកស៊ើបអង្កេតជំងឺ ឈប់ការផ្ទុះ ហេតុអ្វីវ៉ាក់សាំងការពារសូម្បីតែមនុស្សដែលមិនអាចទទួលវា អ្វីដែលផ្សែងបារីពិតជាធ្វើទៅលើ DNA របៀបដែលភាពតានតឹង និងវិសមភាពបំផ្លាញបេះដូង និងការរកឃើញ ៨៥ ឆ្នាំរបស់ហាវ៉ាដ ដែលថាទំនាក់ទំនងជិតស្និទ្ធគឺជាឱសថខ្លាំងបំផុត។",
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
  const kh = language === "kh";
  const hasDescriptions = group.items.some((item) => item.descEn || item.descKh);

  const isGroupActive = isGroupActiveFor(location, group);

  // Close the dropdown automatically whenever the route changes — guarantees
  // any "stuck" hover/focus state from the previous panel is dropped.
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap select-none transition-colors duration-150
          ${isGroupActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
          }`}
      >
        <group.icon className="w-3.5 h-3.5 flex-shrink-0" />
        <span className={kh ? "font-khmer text-sm" : ""}>
          {kh ? group.labelKh : group.labelEn}
        </span>
        <ChevronDown
          className="w-3.5 h-3.5 opacity-50 flex-shrink-0 transition-transform duration-150"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Dropdown panel — rendered with inline styles to guarantee visibility */}
      {open && (
        <div
          className="nav-dropdown-scroll"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 9999,
            minWidth: hasDescriptions ? "300px" : "200px",
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
        </div>
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

            {/* Slogan — hidden on mobile, visible from lg up */}
            <div
              className="hidden lg:flex items-center gap-3 min-w-0"
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
            {/* Bell appears only for school accounts (handles its own visibility) */}
            <NotificationBell />
            <ThemePalette />
            <LanguageToggle />

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

      {/* ── Row 2: Dropdown nav — desktop only ───────────────── */}
      <div className="hidden lg:block border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 h-11">
            {NAV_GROUPS.map((group) => (
              <DropdownGroup
                key={group.labelEn}
                group={group}
                location={location}
                language={language}
              />
            ))}

            {/* Compact global search — pushed to the right */}
            <div className="ml-auto flex-shrink-0 w-64 xl:w-80">
              <GlobalSearch variant="compact" />
            </div>

            {user?.isAdmin && (
              <Link
                href="/admin"
                className={`ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
                  location.startsWith("/admin")
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-white text-primary border-primary/30 hover:border-primary/60 hover:bg-primary/5"
                } ${kh ? "font-khmer" : ""}`}
              >
                <Shield className="w-3.5 h-3.5" />
                {kh ? "គ្រប់គ្រង" : "Admin"}
              </Link>
            )}
          </nav>
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
                    <group.icon className={`w-5 h-5 flex-shrink-0 ${isGroupActive ? "text-primary" : "text-muted-foreground"}`} />
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
                            <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"} ${itemHasDesc ? "mt-0.5" : ""}`} />
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

            {/* Auth row */}
            <div className="border-t border-border mt-2 pt-2">
              {user ? (
                <div className="flex flex-col gap-1.5 px-1">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10">
                    <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className={`text-sm font-semibold text-primary truncate ${kh ? "font-khmer" : ""}`}>
                      {user.school ? (kh ? user.school.nameKh : user.school.nameEn) : user.email}
                    </span>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-primary hover:bg-primary/10 text-sm transition-all"
                  >
                    <User className="w-5 h-5" />
                    <span className={kh ? "font-khmer" : ""}>{kh ? "ប្រូហ្វាយ" : "My Profile"}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-destructive hover:bg-destructive/10 text-sm transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    {t("Sign out", "ចេញ")}
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold bg-primary text-primary-foreground text-base"
                >
                  <LogIn className="w-5 h-5" />
                  {t("Sign In", "ចូលគណនី")}
                </Link>
              )}
              <InstallAppButton variant="full" className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
