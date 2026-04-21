import { useEffect, useRef, useState } from "react";
import {
  X,
  Atom,
  FlaskConical,
  Sigma,
  Microscope,
  Telescope,
  Zap,
  Dna,
  Cpu,
  Sparkles,
  Quote,
  Compass,
  Users,
  Droplets,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

/* ──────────────────────────────────────────────────────────────────────
   Field metadata — colour & icon for each domain of science.
   ────────────────────────────────────────────────────────────────────── */

type Field =
  | "physics"
  | "astronomy"
  | "chemistry"
  | "biology"
  | "computing"
  | "philosophy"
  | "design"
  | "social";

const FIELDS: Record<
  Field,
  { en: string; kh: string; icon: LucideIcon; from: string; to: string; ring: string }
> = {
  physics:    { en: "Physics",          kh: "រូបវិទ្យា",          icon: Atom,        from: "from-indigo-500",  to: "to-violet-700",  ring: "ring-indigo-300/40" },
  astronomy:  { en: "Astronomy",        kh: "តារាសាស្ត្រ",        icon: Telescope,   from: "from-sky-500",     to: "to-blue-800",    ring: "ring-sky-300/40" },
  chemistry:  { en: "Chemistry",        kh: "គីមីវិទ្យា",         icon: FlaskConical,from: "from-emerald-500", to: "to-teal-700",    ring: "ring-emerald-300/40" },
  biology:    { en: "Biology",          kh: "ជីវវិទ្យា",         icon: Dna,         from: "from-lime-500",    to: "to-green-700",   ring: "ring-lime-300/40" },
  computing:  { en: "Computing",        kh: "កុំព្យូទ័រ",        icon: Cpu,         from: "from-fuchsia-500", to: "to-purple-700",  ring: "ring-fuchsia-300/40" },
  philosophy: { en: "Philosophy & Logic", kh: "ទស្សនវិជ្ជា និងតក្កវិជ្ជា", icon: Sigma, from: "from-amber-500",   to: "to-orange-700",  ring: "ring-amber-300/40" },
  design:     { en: "Design & Systems", kh: "រចនា និងប្រព័ន្ធ",     icon: Compass,     from: "from-rose-500",    to: "to-pink-700",    ring: "ring-rose-300/40" },
  social:     { en: "Social Sciences",  kh: "វិទ្យាសាស្ត្រសង្គម",     icon: Users,       from: "from-teal-600",    to: "to-slate-800",   ring: "ring-teal-300/40" },
};

/* ──────────────────────────────────────────────────────────────────────
   Scientist data — bilingual.
   ────────────────────────────────────────────────────────────────────── */

type Scientist = {
  id: string;
  initials: string;          // shown on portrait
  field: Field;
  alt?: LucideIcon;          // optional override for portrait icon
  name:        { en: string; kh: string };
  nationality: { en: string; kh: string };
  years:       string;       // life span — universal
  tag:         { en: string; kh: string };  // short "Core Contribution"
  bio:         { en: string; kh: string };  // long text shown in modal
  quote?:      { en: string; kh: string };
};

const SCIENTISTS: Scientist[] = [
  {
    id: "newton", initials: "IN", field: "physics",
    name:  { en: "Isaac Newton",      kh: "អ៊ីសាក់ ញូតុន" },
    nationality: { en: "English", kh: "អង់គ្លេស" },
    years: "1643–1727",
    tag:   { en: "Laws of Motion and Universal Gravitation.",
             kh: "ច្បាប់នៃចលនា និងទំនាញសកល។" },
    bio:   { en: "Newton's three laws of motion and his law of universal gravitation united the heavens and the Earth under a single mathematical framework. His Principia Mathematica (1687) is one of the most influential scientific books ever written; he also co-invented calculus and made foundational discoveries in optics.",
             kh: "ច្បាប់ចលនាបីរបស់ញូតុន និងច្បាប់ទំនាញសកល បានភ្ជាប់មេឃនិងផែនដីក្រោមក្របខ័ណ្ឌគណិតវិទ្យាតែមួយ។ សៀវភៅ Principia Mathematica (១៦៨៧) ជាសៀវភៅវិទ្យាសាស្ត្រដ៏មានឥទ្ធិពលបំផុត។ គាត់ក៏ជាសហអ្នកបង្កើតគណិតកាល និងបានរកឃើញគ្រឹះនៃអុបទិក។" },
    quote: { en: "If I have seen further it is by standing on the shoulders of giants.",
             kh: "ប្រសិនបើខ្ញុំមើលឃើញឆ្ងាយ នោះជាព្រោះខ្ញុំឈរលើស្មារបស់យក្ស។" },
  },
  {
    id: "einstein", initials: "AE", field: "physics",
    name:  { en: "Albert Einstein",   kh: "អាល់ប៊ែរ អាញស្តាញ" },
    nationality: { en: "German-American", kh: "អាល្លឺម៉ង់-អាមេរិក" },
    years: "1879–1955",
    tag:   { en: "General Relativity (E = mc²) and the nature of time.",
             kh: "ទ្រឹស្តីរ៉ឺឡាទីវីតេ (E = mc²) និងធម្មជាតិនៃពេលវេលា។" },
    bio:   { en: "Einstein's special and general theories of relativity reshaped our understanding of space, time, mass and gravity. His 1905 'miracle year' alone produced four papers that changed physics forever, including E = mc². He won the 1921 Nobel Prize for explaining the photoelectric effect, helping launch quantum theory.",
             kh: "ទ្រឹស្តីរ៉ឺឡាទីវីតេពិសេស និងទូទៅរបស់អាញស្តាញ បានផ្លាស់ប្ដូរការយល់ដឹងរបស់យើងអំពីលំហ ពេលវេលា ម៉ាស់ និងទំនាញ។ ឆ្នាំ ១៩០៥ ដែលគេហៅថា 'ឆ្នាំអព្ភូតហេតុ' គាត់បានបោះពុម្ពអត្ថបទ ៤ ដែលផ្លាស់ប្ដូររូបវិទ្យាជារៀងរហូត រួមទាំងសមីការ E = mc²។ គាត់ឈ្នះរង្វាន់ណូបែលឆ្នាំ ១៩២១ ដោយការពន្យល់ពីបាតុភូតផូតូអេឡិចត្រិច។" },
    quote: { en: "Imagination is more important than knowledge.",
             kh: "ការស្រមើស្រមៃសំខាន់ជាងចំណេះដឹង។" },
  },
  {
    id: "curie", initials: "MC", field: "chemistry", alt: Sparkles,
    name:  { en: "Marie Curie",       kh: "ម៉ារី គូរី" },
    nationality: { en: "Polish-French", kh: "ប៉ូឡូញ-បារាំង" },
    years: "1867–1934",
    tag:   { en: "Pioneering research on radioactivity; first person to win two Nobel Prizes.",
             kh: "ការស្រាវជ្រាវលើវិទ្យុសកម្ម និងជាមនុស្សដំបូងដែលឈ្នះរង្វាន់ណូបែលពីរ។" },
    bio:   { en: "Marie Curie discovered the elements polonium and radium and coined the term 'radioactivity.' She was the first woman to win a Nobel Prize, the only person to win in two different sciences (Physics 1903, Chemistry 1911), and her work led to revolutionary advances in medicine and our understanding of the atom.",
             kh: "ម៉ារី គូរី បានរកឃើញធាតុប៉ូឡូញៀម និងរ៉ាដ្យូម ហើយបានបង្កើតពាក្យ 'វិទ្យុសកម្ម'។ គាត់ជាស្ត្រីដំបូងគេដែលឈ្នះរង្វាន់ណូបែល និងជាមនុស្សតែម្នាក់គត់ដែលឈ្នះក្នុងវិទ្យាសាស្ត្រពីរផ្សេងគ្នា (រូបវិទ្យា ១៩០៣ គីមីវិទ្យា ១៩១១)។ ការងារនេះបាននាំឱ្យមានវឌ្ឍនភាពបដិវត្តន៍ក្នុងវេជ្ជសាស្ត្រ និងការយល់ដឹងពីអាតូម។" },
    quote: { en: "Nothing in life is to be feared, it is only to be understood.",
             kh: "គ្មានអ្វីក្នុងជីវិតដែលត្រូវភ័យខ្លាចទេ — មានតែត្រូវយល់ដឹង។" },
  },
  {
    id: "darwin", initials: "CD", field: "biology",
    name:  { en: "Charles Darwin",    kh: "ឆាល​​ស៍ ដាវីន" },
    nationality: { en: "English", kh: "អង់គ្លេស" },
    years: "1809–1882",
    tag:   { en: "The theory of Evolution by natural selection.",
             kh: "ទ្រឹស្តីនៃការវិវត្តតាមរយៈការជ្រើសរើសដោយធម្មជាតិ។" },
    bio:   { en: "After a five-year voyage on HMS Beagle, Darwin spent decades gathering evidence for what became On the Origin of Species (1859). His theory — that all life shares common ancestors and that species change through natural selection — is the unifying principle of modern biology.",
             kh: "បន្ទាប់ពីដំណើរសមុទ្រ ៥ ឆ្នាំលើនាវា HMS Beagle ដាវីនបានចំណាយពេលរាប់សិបឆ្នាំប្រមូលភស្តុតាងសម្រាប់សៀវភៅ On the Origin of Species (១៨៥៩)។ ទ្រឹស្តីរបស់គាត់ — ដែលថាជីវិតទាំងអស់មានដូនតារួម ហើយប្រភេទសត្វប្រែប្រួលតាមរយៈការជ្រើសរើសដោយធម្មជាតិ — គឺជាគោលការណ៍រួមនៃជីវវិទ្យាទំនើប។" },
  },
  {
    id: "galileo", initials: "GG", field: "astronomy",
    name:  { en: "Galileo Galilei",   kh: "ហ្គាលីលេអូ ហ្គាលីលេ" },
    nationality: { en: "Italian", kh: "អ៊ីតាលី" },
    years: "1564–1642",
    tag:   { en: "Father of observational astronomy; confirmed the Earth orbits the Sun.",
             kh: "បិតានៃតារាសាស្ត្រសង្កេតការណ៍។" },
    bio:   { en: "By improving the telescope and pointing it skyward, Galileo discovered Jupiter's four largest moons, the phases of Venus and the mountains of the Moon — observations that confirmed the Copernican model. He is also considered the father of modern physics for his work on motion and acceleration.",
             kh: "ដោយការកែលម្អកែវយឹត និងបង្វែរវាទៅមេឃ ហ្គាលីលេអូបានរកឃើញព្រះច័ន្ទធំបំផុត ៤ របស់ភពព្រហស្បតិ៍ ដំណាក់កាលនៃភពសុក្រ និងភ្នំនៃព្រះច័ន្ទ — ការសង្កេតដែលបញ្ជាក់ពីគំរូកូពែរនិច។ គាត់ក៏ត្រូវបានចាត់ទុកជាបិតានៃរូបវិទ្យាទំនើបផងដែរ។" },
    quote: { en: "And yet it moves.", kh: "ប៉ុន្តែវាចលនា។" },
  },
  {
    id: "tesla", initials: "NT", field: "physics", alt: Zap,
    name:  { en: "Nikola Tesla",      kh: "នីកូឡា តេស្លា" },
    nationality: { en: "Serbian-American", kh: "សែប៊ី-អាមេរិក" },
    years: "1856–1943",
    tag:   { en: "Development of the Alternating Current (AC) electrical system.",
             kh: "ការអភិវឌ្ឍន៍ប្រព័ន្ធអគ្គិសនីចរន្តឆ្លាស់។" },
    bio:   { en: "Tesla designed the alternating-current induction motor and the polyphase AC system that powers nearly every home and factory today. He held more than 300 patents covering wireless transmission, radio, X-rays and rotating magnetic fields, and the unit of magnetic flux density is named in his honour.",
             kh: "តេស្លាបានរចនាម៉ូទ័រអាំងឌុកស្យុងចរន្តឆ្លាស់ និងប្រព័ន្ធ AC ពហុដំណាក់កាលដែលផ្តល់ថាមពលដល់ស្ទើរគ្រប់ផ្ទះ និងរោងចក្រនាពេលបច្ចុប្បន្ន។ គាត់មានប៉ាតង់ជាង ៣០០ ចំពោះការបញ្ជូនឥតខ្សែ វិទ្យុ កាំរស្មីអ៊ិច និងមជ្ឈដ្ឋានម៉ាញេទិចបង្វិល។" },
  },
  {
    id: "pasteur", initials: "LP", field: "biology", alt: Microscope,
    name:  { en: "Louis Pasteur",     kh: "លូយ ប៉ាស្ទ័រ" },
    nationality: { en: "French", kh: "បារាំង" },
    years: "1822–1895",
    tag:   { en: "Principles of vaccination and pasteurization.",
             kh: "គោលការណ៍នៃការចាក់វ៉ាក់សាំង និងការសម្លាប់មេរោគក្នុងអាហារ។" },
    bio:   { en: "Pasteur proved that microorganisms cause disease, developed vaccines for rabies and anthrax, and invented the heat-treatment process now called pasteurization that keeps milk and other foods safe. His germ theory transformed medicine, surgery and food safety worldwide.",
             kh: "ប៉ាស្ទ័របានបញ្ជាក់ថាមីក្រូសរីរាង្គបង្កជំងឺ បានបង្កើតវ៉ាក់សាំងសម្រាប់ជំងឺឆ្កែឆ្កួត និង anthrax ហើយបានបង្កើតដំណើរការដំបៅដែលឥឡូវហៅថា pasteurization ដែលរក្សាទឹកដោះគោ និងអាហារផ្សេងទៀតឱ្យមានសុវត្ថិភាព។ ទ្រឹស្តីមេរោគរបស់គាត់បានផ្លាស់ប្ដូរវេជ្ជសាស្ត្រ វះកាត់ និងសុវត្ថិភាពអាហារទូទាំងពិភពលោក។" },
  },
  {
    id: "lovelace", initials: "AL", field: "computing",
    name:  { en: "Ada Lovelace",      kh: "អាដា ឡាវឡេស" },
    nationality: { en: "English", kh: "អង់គ្លេស" },
    years: "1815–1852",
    tag:   { en: "The first computer programmer.",
             kh: "អ្នកសរសេរកម្មវិធីកុំព្យូទ័រដំបូងគេ។" },
    bio:   { en: "Working with Charles Babbage's Analytical Engine in the 1840s, Lovelace wrote what is widely regarded as the first computer algorithm — a method for the machine to compute Bernoulli numbers. She also foresaw that computers could one day manipulate any kind of information, not just numbers.",
             kh: "ដោយធ្វើការជាមួយ Analytical Engine របស់ Charles Babbage ក្នុងទសវត្សរ៍ ១៨៤០ ឡាវឡេសបានសរសេរនូវអ្វីដែលត្រូវបានចាត់ទុកជាក្បួនដោះស្រាយកុំព្យូទ័រដំបូងបង្អស់។ គាត់ក៏បានព្យាករណ៍ថាកុំព្យូទ័រអាចគ្រប់គ្រងព័ត៌មានគ្រប់ប្រភេទ មិនមែនត្រឹមតែលេខនោះទេ។" },
  },
  {
    id: "mendeleev", initials: "DM", field: "chemistry",
    name:  { en: "Dmitri Mendeleev",  kh: "ឌីមីទ្រី មិនដេឡេវ" },
    nationality: { en: "Russian", kh: "រុស្ស៊ី" },
    years: "1834–1907",
    tag:   { en: "Created the Periodic Table of Elements.",
             kh: "អ្នកបង្កើតតារាងខួបនៃធាតុគីមី។" },
    bio:   { en: "Mendeleev arranged the known chemical elements into a table according to atomic weight and recurring properties. The gaps in his 1869 table allowed him to predict the existence — and properties — of elements not yet discovered, an extraordinary triumph for scientific theory.",
             kh: "មិនដេឡេវបានរៀបចំធាតុគីមីដែលគេស្គាល់ក្នុងតារាងមួយតាមទម្ងន់អាតូម និងលក្ខណៈដែលលេចឡើងម្ដងហើយម្ដងទៀត។ ចន្លោះក្នុងតារាងឆ្នាំ ១៨៦៩ របស់គាត់បានអនុញ្ញាតឱ្យគាត់ព្យាករណ៍ពីអត្ថិភាព — និងលក្ខណៈ — នៃធាតុដែលមិនទាន់រកឃើញ ដែលជាជោគជ័យដ៏អស្ចារ្យសម្រាប់ទ្រឹស្តីវិទ្យាសាស្ត្រ។" },
  },
  {
    id: "turing", initials: "AT", field: "computing",
    name:  { en: "Alan Turing",       kh: "អាឡែន ទូរីង" },
    nationality: { en: "English", kh: "អង់គ្លេស" },
    years: "1912–1954",
    tag:   { en: "Father of theoretical computer science and artificial intelligence.",
             kh: "បិតានៃវិទ្យាសាស្ត្រកុំព្យូទ័រ និងបញ្ញាសិប្បនិម្មិត។" },
    bio:   { en: "Turing's 1936 idea of a universal computing machine became the theoretical foundation of every computer ever built. During World War II he led the team at Bletchley Park that broke the German Enigma code, shortening the war by an estimated two years. He also proposed the famous 'Turing Test' for machine intelligence.",
             kh: "គំនិតរបស់ទូរីងឆ្នាំ ១៩៣៦ អំពីម៉ាស៊ីនកុំព្យូទ័រសកល បានក្លាយជាគ្រឹះទ្រឹស្តីនៃរាល់កុំព្យូទ័រដែលធ្លាប់បានសាងសង់។ ក្នុងសង្គ្រាមលោកលើកទីពីរ គាត់បានដឹកនាំក្រុមនៅ Bletchley Park ដែលបានបំបែកលេខកូដ Enigma របស់អាល្លឺម៉ង់ ដោយកាត់បន្ថយរយៈពេលសង្គ្រាមប្រហែលពីរឆ្នាំ។" },
  },
  {
    id: "kepler", initials: "JK", field: "astronomy",
    name:  { en: "Johannes Kepler",   kh: "យូហាន់ណេស ខេបឡឺ" },
    nationality: { en: "German", kh: "អាល្លឺម៉ង់" },
    years: "1571–1630",
    tag:   { en: "Three laws of planetary motion — orbits are ellipses, not circles.",
             kh: "ច្បាប់បីនៃចលនាភពព្រះ — គន្លងជាពងក្រពើ មិនមែនជារង្វង់ទេ។" },
    bio:   { en: "Kepler used the precise observations of Tycho Brahe to derive three mathematical laws describing how planets move around the Sun. His insight that orbits are ellipses replaced two thousand years of belief in perfect circles and prepared the ground for Newton's law of gravity.",
             kh: "ខេបឡឺបានប្រើការសង្កេតយ៉ាងច្បាស់លាស់របស់ Tycho Brahe ដើម្បីដកស្រង់ច្បាប់គណិតវិទ្យាបី ដែលពិពណ៌នាពីរបៀបដែលភពព្រះធ្វើចលនាជុំវិញព្រះអាទិត្យ។ ការយល់ឃើញរបស់គាត់ថាគន្លងជាពងក្រពើ បានជំនួសជំនឿពេញពីរពាន់ឆ្នាំចំពោះរង្វង់ឥតខ្ចោះ។" },
  },
  {
    id: "copernicus", initials: "NC", field: "astronomy",
    name:  { en: "Nicolaus Copernicus", kh: "នីកូឡាស កូពែរនិច" },
    nationality: { en: "Polish", kh: "ប៉ូឡូញ" },
    years: "1473–1543",
    tag:   { en: "The Sun, not the Earth, is the centre of the solar system.",
             kh: "ព្រះអាទិត្យ មិនមែនផែនដី គឺជាចំណុចកណ្ដាលនៃប្រព័ន្ធព្រះអាទិត្យ។" },
    bio:   { en: "In On the Revolutions of the Heavenly Spheres (1543), Copernicus proposed a heliocentric universe — placing the Sun, not the Earth, at the centre. This 'Copernican Revolution' set off the Scientific Revolution and changed humanity's place in the cosmos forever.",
             kh: "ក្នុងសៀវភៅ On the Revolutions of the Heavenly Spheres (១៥៤៣) កូពែរនិចបានស្នើពិភពចក្រវាលដែលមានព្រះអាទិត្យជាកណ្ដាល — ដាក់ព្រះអាទិត្យ មិនមែនផែនដី នៅកណ្ដាល។ 'បដិវត្តន៍កូពែរនិច' នេះបានបើកដំណើរបដិវត្តន៍វិទ្យាសាស្ត្រ និងផ្លាស់ប្ដូរកន្លែងរបស់មនុស្សជាតិក្នុងសកលលោកជារៀងរហូត។" },
  },
  {
    id: "bacon", initials: "FB", field: "philosophy",
    name:  { en: "Francis Bacon",     kh: "ហ្វ្រង់ស៊ីស បេកុន" },
    nationality: { en: "English", kh: "អង់គ្លេស" },
    years: "1561–1626",
    tag:   { en: "Founder of the modern scientific method.",
             kh: "ស្ថាបនិកនៃវិធីសាស្ត្រវិទ្យាសាស្ត្រទំនើប។" },
    bio:   { en: "Bacon argued that real knowledge comes from careful observation and controlled experiments rather than from authority or pure reasoning. His insistence on systematic, evidence-based inquiry — what we now call the scientific method — shaped centuries of research that followed.",
             kh: "បេកុនបានអះអាងថាចំណេះដឹងពិតមកពីការសង្កេតយ៉ាងប្រុងប្រយ័ត្ន និងការពិសោធន៍ដែលគ្រប់គ្រងបាន ជាជាងពីសិទ្ធអំណាច ឬហេតុផលសុទ្ធ។ ការអះអាងរបស់គាត់ចំពោះការស្រាវជ្រាវដែលមានភស្តុតាងជាប្រព័ន្ធ — ដែលឥឡូវយើងហៅថាវិធីសាស្ត្រវិទ្យាសាស្ត្រ — បានរូបរាងការស្រាវជ្រាវរាប់សតវត្សដែលបានបន្ត។" },
    quote: { en: "Knowledge is power.", kh: "ចំណេះដឹងគឺជាអំណាច។" },
  },
  {
    id: "planck", initials: "MP", field: "physics",
    name:  { en: "Max Planck",        kh: "ម៉ាក់ ប៉្លង់ក៍" },
    nationality: { en: "German", kh: "អាល្លឺម៉ង់" },
    years: "1858–1947",
    tag:   { en: "Founder of quantum theory; energy comes in discrete 'quanta'.",
             kh: "ស្ថាបនិកនៃទ្រឹស្តីក្វាន់ទុំ — ថាមពលមកជាដុំៗ។" },
    bio:   { en: "In 1900 Planck proposed that energy is emitted and absorbed in tiny discrete packets called 'quanta' — the radical first step that opened the door to quantum mechanics and twentieth-century physics. He won the Nobel Prize in Physics in 1918.",
             kh: "ក្នុងឆ្នាំ ១៩០០ ប៉្លង់ក៍បានស្នើថាថាមពលត្រូវបានបញ្ចេញ និងស្រូបចូលក្នុងកញ្ចប់តូចៗហៅថា 'ក្វាន់ទុំ' — ជាជំហានដំបូងដ៏ខ្លាំងក្លាដែលបើកទ្វារទៅរកមេកានិចក្វាន់ទុំ និងរូបវិទ្យាសតវត្សទីម្ភៃ។ គាត់ឈ្នះរង្វាន់ណូបែលរូបវិទ្យាក្នុងឆ្នាំ ១៩១៨។" },
  },
  {
    id: "bohr", initials: "NB", field: "physics",
    name:  { en: "Niels Bohr",        kh: "នៀល បូរ" },
    nationality: { en: "Danish", kh: "ដាណឺម៉ាក" },
    years: "1885–1962",
    tag:   { en: "Model of the atom with electrons in fixed energy levels.",
             kh: "គំរូនៃអាតូមដែលអេឡិចត្រុងស្ថិតនៅកម្រិតថាមពលថេរ។" },
    bio:   { en: "Bohr's 1913 model of the atom, with electrons orbiting the nucleus only at specific allowed energies, explained the spectral lines of hydrogen and bridged classical and quantum physics. He went on to lead the Copenhagen school of quantum mechanics and won the 1922 Nobel Prize in Physics.",
             kh: "គំរូអាតូមរបស់បូរឆ្នាំ ១៩១៣ ដែលមានអេឡិចត្រុងធ្វើគន្លងជុំវិញនុយក្លេអ៊ែរនៅកម្រិតថាមពលជាក់លាក់ បានពន្យល់ពីបន្ទាត់ស្ប៉ិចត្រាល​ នៃហ៊ីដ្រូសែន និងបានភ្ជាប់រូបវិទ្យាបុរាណ និងក្វាន់ទុំ។ គាត់បានដឹកនាំសាលា Copenhagen នៃមេកានិចក្វាន់ទុំ ហើយឈ្នះរង្វាន់ណូបែលរូបវិទ្យាក្នុងឆ្នាំ ១៩២២។" },
  },
  {
    id: "descartes", initials: "RD", field: "philosophy",
    name:  { en: "René Descartes",   kh: "រេណេ ដេការ" },
    nationality: { en: "French", kh: "បារាំង" },
    years: "1596–1650",
    tag:   { en: "Father of modern philosophy — 'I think, therefore I am.'",
             kh: "បិតានៃទស្សនវិជ្ជាទំនើប — 'ខ្ញុំគិត ដូច្នេះខ្ញុំមានវត្តមាន។'" },
    bio:   { en: "Descartes set out to doubt everything that could possibly be doubted in order to find one absolutely certain truth. He found it in the very act of thinking: 'Cogito, ergo sum' — 'I think, therefore I am.' His method of systematic doubt and his invention of analytic geometry (Cartesian coordinates) became foundations of modern philosophy and mathematics.",
             kh: "ដេការបានចាប់ផ្ដើមសង្ស័យអ្វីៗដែលអាចសង្ស័យបាន ដើម្បីស្វែងរកការពិតមួយដែលច្បាស់លាស់ឥតព្រួយ។ គាត់បានរកឃើញវាក្នុងសកម្មភាពនៃការគិត៖ 'Cogito, ergo sum' — 'ខ្ញុំគិត ដូច្នេះខ្ញុំមានវត្តមាន'។ វិធីសាស្ត្រនៃការសង្ស័យជាប្រព័ន្ធ និងធរណីមាត្រវិភាគ (កូអរដោនេកាតេស្យាន) របស់គាត់ បានក្លាយជាគ្រឹះនៃទស្សនវិជ្ជា និងគណិតវិទ្យាទំនើប។" },
    quote: { en: "I think, therefore I am.", kh: "ខ្ញុំគិត ដូច្នេះខ្ញុំមានវត្តមាន។" },
  },
  {
    id: "locke", initials: "JL", field: "philosophy",
    name:  { en: "John Locke",       kh: "យ៉ូហាន ឡុក" },
    nationality: { en: "English", kh: "អង់គ្លេស" },
    years: "1632–1704",
    tag:   { en: "Enlightenment thinker who proposed the 'Tabula Rasa' — the mind as a blank slate.",
             kh: "អ្នកគិតក្នុងសម័យពន្លឺនៃបញ្ញា ដែលបានស្នើទ្រឹស្តី 'ចិត្តគឺជាបន្ទះក្តារទទេ'។" },
    bio:   { en: "Locke argued that we are not born with built-in ideas — the mind starts as a blank slate (tabula rasa) and is filled by experience. His writings on knowledge, religious tolerance and government inspired the American and French revolutions and laid the philosophical groundwork for modern liberal democracy.",
             kh: "ឡុកបានអះអាងថាយើងមិនកើតមកជាមួយគំនិតស្រាប់ទេ — ចិត្តចាប់ផ្ដើមជាបន្ទះក្តារទទេ (tabula rasa) ហើយត្រូវបានបំពេញដោយបទពិសោធន៍។ សំណេររបស់គាត់ស្ដីពីចំណេះដឹង សេរីភាពសាសនា និងរដ្ឋាភិបាល បានបំផុសបដិវត្តន៍អាមេរិក និងបារាំង ហើយបានដាក់គ្រឹះទស្សនវិជ្ជាសម្រាប់ប្រជាធិបតេយ្យសេរីទំនើប។" },
  },
  {
    id: "kant", initials: "IK", field: "philosophy",
    name:  { en: "Immanuel Kant",    kh: "អ៊ីម៉ានូអែល កាន់ត៍" },
    nationality: { en: "German (Prussian)", kh: "អាល្លឺម៉ង់ (ព្រុស)" },
    years: "1724–1804",
    tag:   { en: "Explored how our mind structures the way we experience the world.",
             kh: "បានរុករកពីរបៀបដែលចិត្តរបស់យើងរៀបចំរចនាសម្ព័ន្ធបទពិសោធន៍នៃពិភពលោក។" },
    bio:   { en: "In his Critique of Pure Reason (1781), Kant argued that we never see reality directly: our minds actively organise raw sense-data using built-in categories like space, time and causality. This 'Copernican turn' in philosophy reframed every later debate about knowledge, ethics and the limits of reason.",
             kh: "ក្នុង Critique of Pure Reason (១៧៨១) កាន់ត៍បានអះអាងថាយើងមិនដែលឃើញការពិតដោយផ្ទាល់ទេ៖ ចិត្តរបស់យើងរៀបចំទិន្នន័យអារម្មណ៍ឆៅយ៉ាងសកម្ម ដោយប្រើប្រភេទស្រាប់ដូចជាលំហ ពេលវេលា និងបុព្វហេតុ។ 'ការវិលកូពែរនិច' ក្នុងទស្សនវិជ្ជានេះបានកំណត់ឡើងវិញនូវរាល់ការពិភាក្សាក្រោយៗមកអំពីចំណេះដឹង សីលធម៌ និងព្រំដែននៃហេតុផល។" },
    quote: { en: "Sapere aude — dare to know.", kh: "Sapere aude — ហ៊ានដឹង។" },
  },
  {
    id: "keyser", initials: "CK", field: "philosophy",
    name:  { en: "Cassius J. Keyser", kh: "ខាស្ស៊ូស ជេ. ខេយស៊ឺ" },
    nationality: { en: "American", kh: "អាមេរិក" },
    years: "1862–1947",
    tag:   { en: "Mathematician who explored how mathematics shapes human reasoning and spiritual life.",
             kh: "គណិតវិទូដែលបានរុករកពីរបៀបដែលគណិតវិទ្យារូបរាងហេតុផល និងជីវិតផ្នែកស្មារតីរបស់មនុស្ស។" },
    bio:   { en: "A long-time professor at Columbia University, Keyser argued that mathematics is far more than a tool for calculation — it is a way of thinking that disciplines the mind and reveals the deep structure of human reasoning. His writings on 'mathematical philosophy' deeply influenced Alfred Korzybski's General Semantics.",
             kh: "ជាសាស្ត្រាចារ្យយូរឆ្នាំនៅសកលវិទ្យាល័យកូឡុំប៊ីយ៉ា ខេយស៊ឺបានអះអាងថាគណិតវិទ្យាមិនមែនគ្រាន់តែជាឧបករណ៍សម្រាប់គណនានោះទេ — វាជាវិធីនៃការគិតដែលបង្ហាត់បង្រៀនចិត្ត និងបង្ហាញរចនាសម្ព័ន្ធជ្រៅនៃហេតុផលរបស់មនុស្ស។ សំណេររបស់គាត់ស្ដីពី 'ទស្សនវិជ្ជាគណិតវិទ្យា' បានជះឥទ្ធិពលយ៉ាងជ្រៅទៅលើសេម៉ង់ទិកទូទៅរបស់ Alfred Korzybski។" },
  },
  {
    id: "korzybski", initials: "AK", field: "philosophy",
    name:  { en: "Alfred Korzybski", kh: "អាល់ប្រេដ កូហ្ស៊ីបស្គី" },
    nationality: { en: "Polish-American", kh: "ប៉ូឡូញ-អាមេរិក" },
    years: "1879–1950",
    tag:   { en: "Founder of General Semantics — 'The map is not the territory.'",
             kh: "អ្នកបង្កើតសេម៉ង់ទិកទូទៅ — 'ផែនទីមិនមែនជាទឹកដីពិតនោះទេ។'" },
    bio:   { en: "Korzybski founded General Semantics, a discipline studying how language and symbols shape — and often distort — our perception of reality. His central lesson, 'the map is not the territory,' reminds us that our words and models are never the same as the things they describe, and that careful, scientific thinking requires constant awareness of this gap.",
             kh: "កូហ្ស៊ីបស្គីបានបង្កើតសេម៉ង់ទិកទូទៅ ដែលជាវិន័យសិក្សាពីរបៀបដែលភាសា និងនិមិត្តសញ្ញារូបរាង — ហើយជារឿយៗបង្ខូច — ការយល់ឃើញរបស់យើងពីការពិត។ មេរៀនកណ្ដាលរបស់គាត់ 'ផែនទីមិនមែនជាទឹកដីពិតនោះទេ' រំលឹកយើងថាពាក្យ និងគំរូរបស់យើងមិនដែលដូចគ្នាទៅនឹងវត្ថុដែលវាពិពណ៌នានោះទេ ហើយការគិតបែបវិទ្យាសាស្ត្រត្រូវការការដឹងខ្លួនជានិច្ចចំពោះចន្លោះនេះ។" },
    quote: { en: "The map is not the territory.", kh: "ផែនទីមិនមែនជាទឹកដីពិតនោះទេ។" },
  },
  {
    id: "fuller", initials: "BF", field: "design",
    name:  { en: "Buckminster Fuller", kh: "បាក់មីនស្ទ័រ ហ្វូលឺ" },
    nationality: { en: "American", kh: "អាមេរិក" },
    years: "1895–1983",
    tag:   { en: "Architect and systems theorist; inventor of the Geodesic Dome and the 'Dymaxion' concept.",
             kh: "ស្ថាបត្យករ និងអ្នកទ្រឹស្តីប្រព័ន្ធ — អ្នកបង្កើតលំហ Geodesic និងគំនិត 'Dymaxion'។" },
    bio:   { en: "Fuller spent his life asking how to do 'more and more with less and less.' He invented the geodesic dome — the strongest structure for its weight ever built — and coined 'Dymaxion' (dynamic + maximum + tension) to describe lightweight, efficient designs for cars, houses and maps. He saw the planet as 'Spaceship Earth' and urged humanity to live within its means.",
             kh: "ហ្វូលឺបានចំណាយពេញមួយជីវិតសួរថាតើធ្វើដូចម្ដេចដើម្បីបាន 'ច្រើនឡើងៗជាមួយធនធានតិចឡើងៗ'។ គាត់បានបង្កើតលំហ Geodesic — រចនាសម្ព័ន្ធរឹងមាំបំផុតធៀបនឹងទម្ងន់ដែលធ្លាប់សាងសង់ — ហើយបង្កើតពាក្យ 'Dymaxion' ដើម្បីពិពណ៌នាការរចនាស្រាល និងមានប្រសិទ្ធភាពសម្រាប់រថយន្ត ផ្ទះ និងផែនទី។ គាត់បានចាត់ទុកផែនដីជា 'យានអវកាសផែនដី' ហើយបានជំរុញឱ្យមនុស្សជាតិរស់នៅក្នុងព្រំដែនរបស់វា។" },
  },
  {
    id: "fresco", initials: "JF", field: "design",
    name:  { en: "Jacque Fresco",    kh: "ហ្ស៊ាក ហ្វ្រេស្កូ" },
    nationality: { en: "American", kh: "អាមេរិក" },
    years: "1916–2017",
    tag:   { en: "Industrial designer and social engineer; founder of The Venus Project for a resource-based economy.",
             kh: "អ្នករចនាឧស្សាហកម្ម និងវិស្វករសង្គម — ស្ថាបនិកនៃគម្រោង Venus សម្រាប់សេដ្ឋកិច្ចផ្អែកលើធនធាន។" },
    bio:   { en: "Fresco spent over seventy years designing cities, transportation systems and technologies aimed at meeting human needs sustainably. With Roxanne Meadows he founded The Venus Project in Florida to demonstrate a 'resource-based economy' — one organised around the careful use of Earth's resources and automation rather than money or scarcity.",
             kh: "ហ្វ្រេស្កូបានចំណាយពេលជាង ៧០ ឆ្នាំរចនាទីក្រុង ប្រព័ន្ធដឹកជញ្ជូន និងបច្ចេកវិទ្យាដែលសំដៅបំពេញតម្រូវការមនុស្សដោយចីរភាព។ រួមជាមួយ Roxanne Meadows គាត់បានបង្កើតគម្រោង Venus នៅរដ្ឋ Florida ដើម្បីបង្ហាញ 'សេដ្ឋកិច្ចផ្អែកលើធនធាន' — ដែលរៀបចំជុំវិញការប្រើប្រាស់ធនធានផែនដីយ៉ាងប្រុងប្រយ័ត្ន និងការធ្វើស្វ័យប្រវត្តិកម្ម ជាជាងលុយ ឬការខ្វះខាត។" },
  },
  {
    id: "veblen", initials: "TV", field: "social",
    name:  { en: "Thorstein Veblen", kh: "ធរស្ទីន វេបឡែន" },
    nationality: { en: "Norwegian-American", kh: "ន័រវេស-អាមេរិក" },
    years: "1857–1929",
    tag:   { en: "Founder of institutional economics and evolutionary sociology; coined the term \"conspicuous consumption\" to describe how humans use wealth for social status.",
             kh: "ស្ថាបនិកសេដ្ឋកិច្ចវិទ្យាស្ថាប័ន និងសង្គមវិទ្យាវិវត្តន៍; បានបង្កើតពាក្យ \"ការប្រើប្រាស់បង្អួត\" ដើម្បីពណ៌នាពីរបៀបដែលមនុស្សប្រើប្រាស់ទ្រព្យសម្បត្តិសម្រាប់ឋានៈសង្គម។" },
    bio:   { en: "In The Theory of the Leisure Class (1899), Veblen argued that economics cannot be understood without sociology and history: people do not just buy what is useful — they buy what signals status. He coined 'conspicuous consumption' to describe spending designed to be seen by others, and 'conspicuous leisure' for the visible avoidance of work. By treating economies as evolving social institutions shaped by habit, custom and power, he founded what is now called institutional economics and gave generations of social scientists a sharper lens on inequality.",
             kh: "ក្នុងសៀវភៅ The Theory of the Leisure Class (១៨៩៩) វេបឡែនបានអះអាងថាសេដ្ឋកិច្ចវិទ្យាមិនអាចយល់បានដោយគ្មានសង្គមវិទ្យា និងប្រវត្តិសាស្ត្រ៖ មនុស្សមិនគ្រាន់តែទិញអ្វីដែលមានប្រយោជន៍នោះទេ — ពួកគេទិញអ្វីដែលបង្ហាញពីឋានៈ។ គាត់បានបង្កើតពាក្យ 'ការប្រើប្រាស់បង្អួត' ដើម្បីពណ៌នាការចំណាយដែលរចនាឱ្យអ្នកដទៃឃើញ និង 'ការទំនេរបង្អួត' សម្រាប់ការគេចចេញពីការងារយ៉ាងបង្ហាញ។ ដោយចាត់ទុកសេដ្ឋកិច្ចជាស្ថាប័នសង្គមដែលវិវត្តន៍ និងត្រូវបានរូបរាងដោយទម្លាប់ ប្រពៃណី និងអំណាច គាត់បានបង្កើតនូវអ្វីដែលឥឡូវហៅថាសេដ្ឋកិច្ចវិទ្យាស្ថាប័ន ហើយបានផ្ដល់ឱ្យជំនាន់ៗនៃអ្នកវិទ្យាសាស្ត្រសង្គមនូវកែវយឹតមួយដ៏មុតចំពោះវិសមភាព។" },
    quote: { en: "Conspicuous consumption of valuable goods is a means of reputability to the gentleman of leisure.",
             kh: "ការប្រើប្រាស់ទំនិញដ៏មានតម្លៃជាបង្អួត គឺជាមធ្យោបាយនៃកិត្តិនាមសម្រាប់អភិជនទំនេរ។" },
  },
  {
    id: "semmelweis", initials: "IS", field: "biology", alt: Droplets,
    name:  { en: "Ignaz Semmelweis", kh: "អ៊ិកណាស សេមមែលវ៉ៃ" },
    nationality: { en: "Hungarian", kh: "ហុងគ្រី" },
    years: "1818–1865",
    tag:   { en: "Pioneer of antiseptic procedures — the \"Saviour of Mothers.\" Empirical evidence over accepted belief.",
             kh: "អ្នកត្រួសត្រាយផ្លូវផ្នែកអនាម័យ — \"អ្នកសង្គ្រោះម្ដាយ\"។ ភស្តុតាងជាក់ស្ដែងលើសជំនឿដែលទទួលយក។" },
    bio:   { en: "Decades before anyone knew what bacteria were, Semmelweis noticed that mothers in the doctors' ward of a Vienna maternity hospital were dying from \"childbed fever\" at terrifying rates — far higher than mothers attended only by midwives. He realised the doctors were coming straight from autopsies and proved that simply washing hands with a chlorinated lime solution cut the death rate dramatically. His data was undeniable, but it contradicted the accepted beliefs of the medical establishment, and he was mocked and dismissed during his lifetime. He teaches us a hard lesson: sometimes the data shows us WHAT works long before we understand WHY — and accepted authority is not the same as truth.",
             kh: "ជាច្រើនទសវត្សរ៍មុនពេលនរណាម្នាក់ដឹងថាបាក់តេរីជាអ្វី សេមមែលវ៉ៃបានកត់សំគាល់ថាម្ដាយនៅក្នុងបន្ទប់របស់វេជ្ជបណ្ឌិតនៃមន្ទីរពេទ្យសម្ភពទីក្រុង Vienna កំពុងស្លាប់ដោយ \"គ្រុនក្រោយសម្រាល\" ក្នុងអត្រាដ៏គួរឱ្យភ័យខ្លាច — ខ្ពស់ជាងម្ដាយដែលថែទាំដោយឆ្មបឆ្ងាយណាស់។ គាត់បានយល់ថាវេជ្ជបណ្ឌិតមកដោយផ្ទាល់ពីការវះកាត់សាកសព ហើយបានបង្ហាញថាគ្រាន់តែលាងដៃជាមួយសូលុយស្យុងកម្ទេចកំបោរក្លរ បានកាត់បន្ថយអត្រាមរណភាពយ៉ាងខ្លាំង។ ទិន្នន័យរបស់គាត់មិនអាចបដិសេធបាន ប៉ុន្តែវាផ្ទុយនឹងជំនឿដែលត្រូវបានទទួលយកនៃអ្នកជំនាញវេជ្ជសាស្ត្រ ហើយគាត់ត្រូវបានចំអកនិងបណ្ដេញចេញនៅពេលនៅរស់។ គាត់បង្រៀនយើងនូវមេរៀនមួយដ៏ពិបាក៖ ពេលខ្លះទិន្នន័យបង្ហាញយើងពី «អ្វី» ដែលដំណើរការ មុនពេលយើងយល់ថា «ហេតុអ្វី» — ហើយអំណាចដែលត្រូវបានទទួលយក មិនដូចគ្នានឹងការពិតទេ។" },
    quote: { en: "When I look back upon the past, I can only dispel the sadness which falls upon me by gazing into that happy future when the infection will be banished.",
             kh: "នៅពេលខ្ញុំក្រឡេកមើលអតីតកាល ខ្ញុំអាចបំបាត់ភាពកើតទុក្ខបានតែដោយសម្លឹងមើលអនាគតដ៏រីករាយ ដែលការឆ្លងនឹងត្រូវបានបណ្ដេញចេញ។" },
  },
  {
    id: "kuhn", initials: "TK", field: "philosophy", alt: BookOpen,
    name:  { en: "Thomas Kuhn", kh: "ថូម៉ាស គូន" },
    nationality: { en: "American", kh: "អាមេរិក" },
    years: "1922–1996",
    tag:   { en: "Architect of the \"paradigm shift\" — author of The Structure of Scientific Revolutions.",
             kh: "ស្ថាបត្យករនៃ \"បដិវត្តន៍គំនិត\" — អ្នកនិពន្ធសៀវភៅ The Structure of Scientific Revolutions។" },
    bio:   { en: "Kuhn's 1962 book The Structure of Scientific Revolutions changed how we think about science itself. He showed that science doesn't just slowly accumulate facts in a straight line. Instead, it operates inside a \"paradigm\" — a shared set of rules, models and expectations — until anomalies (problems the rules can't explain) build up. When the pressure of those anomalies becomes too great, the field undergoes a sudden, sometimes painful \"paradigm shift\" to a new framework, like Newtonian mechanics giving way to relativity and quantum theory. Kuhn teaches us that scientific \"truth\" is a constantly evolving model — and that the scientific community must be brave enough to abandon old maps when new evidence breaks them.",
             kh: "សៀវភៅរបស់គូនឆ្នាំ ១៩៦២ The Structure of Scientific Revolutions បានផ្លាស់ប្ដូររបៀបដែលយើងគិតអំពីវិទ្យាសាស្ត្រដោយខ្លួនឯង។ គាត់បានបង្ហាញថាវិទ្យាសាស្ត្រមិនគ្រាន់តែប្រមូលផ្ដុំការពិតយឺតៗតាមបន្ទាត់ត្រង់នោះទេ។ ផ្ទុយទៅវិញ វាដំណើរការនៅក្នុង \"គំនិត\" (paradigm) — សំណុំច្បាប់ គំរូ និងការរំពឹងទុករួម — រហូតដល់បាតុភូតមិនប្រក្រតី (បញ្ហាដែលច្បាប់មិនអាចពន្យល់) កើនឡើងច្រើន។ នៅពេលសម្ពាធនៃបាតុភូតទាំងនោះធ្ងន់ធ្ងរពេក វិស័យនោះឆ្លងកាត់ \"បដិវត្តន៍គំនិត\" ភ្លាមៗ ដែលជួនកាលឈឺចាប់ ទៅរកក្របខ័ណ្ឌថ្មី ដូចជាមេកានិករបស់ញូតុនបានបោះបង់ឱ្យរ៉ឺឡាទីវីតេ និងទ្រឹស្តីកង់ទិច។ គូនបង្រៀនយើងថា \"ការពិត\" វិទ្យាសាស្ត្រគឺជាគំរូដែលវិវត្តន៍ឥតឈប់ឈរ — ហើយសហគមន៍វិទ្យាសាស្ត្រត្រូវតែក្លាហានគ្រប់គ្រាន់ដើម្បីបោះបង់ផែនទីចាស់ នៅពេលភស្តុតាងថ្មីបំបែកវា។" },
    quote: { en: "The successive transition from one paradigm to another via revolution is the usual developmental pattern of mature science.",
             kh: "ការប្ដូរបន្តបន្ទាប់ពីគំនិតមួយទៅគំនិតមួយទៀតតាមរយៈបដិវត្តន៍ គឺជាគំរូអភិវឌ្ឍធម្មតានៃវិទ្យាសាស្ត្រដែលឈានដល់ភាពចាស់ទុំ។" },
  },
];

/* ──────────────────────────────────────────────────────────────────────
   Portrait — stylized "museum plaque" with serif initials.
   ────────────────────────────────────────────────────────────────────── */

function Portrait({ s, size = "card" }: { s: Scientist; size?: "card" | "modal" }) {
  const f = FIELDS[s.field];
  const Icon = s.alt ?? f.icon;
  const isModal = size === "modal";
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-gradient-to-br ${f.from} ${f.to} ${
        isModal ? "rounded-2xl" : "rounded-xl"
      } ring-1 ring-white/10`}
      style={{ aspectRatio: "1 / 1" }}
    >
      {/* subtle grain / vignette */}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.55), transparent 55%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.45), transparent 60%)",
        }}
      />
      {/* corner ornament */}
      <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-white/40 rounded-tl-sm" />
      <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-white/40 rounded-tr-sm" />
      <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-white/40 rounded-bl-sm" />
      <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-white/40 rounded-br-sm" />

      {/* Initials */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`font-display text-white/95 tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] ${
            isModal ? "text-7xl sm:text-8xl" : "text-4xl sm:text-5xl"
          }`}
          style={{ fontWeight: 700 }}
        >
          {s.initials}
        </span>
      </div>

      {/* Field icon badge */}
      <div
        className={`absolute ${isModal ? "bottom-3 right-3 w-10 h-10" : "bottom-1.5 right-1.5 w-7 h-7"} rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20`}
      >
        <Icon className={`${isModal ? "w-5 h-5" : "w-3.5 h-3.5"} text-white`} />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Card.
   ────────────────────────────────────────────────────────────────────── */

function ScientistCard({
  s,
  onOpen,
  kh,
  t,
}: {
  s: Scientist;
  onOpen: (id: string) => void;
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const f = FIELDS[s.field];
  return (
    <button
      type="button"
      onClick={() => onOpen(s.id)}
      aria-label={t(
        `${s.name.en}: ${s.tag.en}`,
        `${s.name.kh}៖ ${s.tag.kh}`,
      )}
      className={`group text-left bg-slate-900/60 border border-slate-700/60 rounded-2xl p-3 sm:p-3.5 hover:border-white/30 hover:bg-slate-900/80 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${f.ring}`}
    >
      <Portrait s={s} />
      <div className="mt-3">
        <div className="flex items-center gap-1.5 mb-1">
          <span
            className={`text-[10px] font-bold tracking-widest uppercase text-white/50 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {kh ? FIELDS[s.field].kh : FIELDS[s.field].en}
          </span>
          <span className="text-white/30 text-[10px]">·</span>
          <span className="text-[10px] text-white/50 font-mono">{s.years}</span>
        </div>
        <h3
          className={`text-base sm:text-[17px] font-bold text-white leading-tight group-hover:text-amber-200 transition-colors ${
            kh ? "font-khmer leading-relaxed" : "font-display"
          }`}
        >
          {kh ? s.name.kh : s.name.en}
        </h3>
        <p
          className={`text-xs sm:text-[13px] text-white/65 mt-1 leading-snug line-clamp-3 ${
            kh ? "font-khmer leading-relaxed" : ""
          }`}
        >
          {kh ? s.tag.kh : s.tag.en}
        </p>
      </div>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Modal.
   ────────────────────────────────────────────────────────────────────── */

function ScientistModal({
  s,
  onClose,
  kh,
  t,
}: {
  s: Scientist;
  onClose: () => void;
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const f = FIELDS[s.field];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`scientist-${s.id}-name`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" />
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t("Close", "បិទ")}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-5 sm:p-8">
          <div className="grid sm:grid-cols-[200px_1fr] gap-5 sm:gap-7">
            {/* Portrait */}
            <div className="max-w-[200px] mx-auto sm:mx-0 w-full">
              <Portrait s={s} size="modal" />
            </div>

            {/* Header */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-gradient-to-br ${f.from} ${f.to} text-white shadow-sm ${
                    kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                  }`}
                >
                  {kh ? f.kh : f.en}
                </span>
                <span className="text-xs text-white/60 font-mono">{s.years}</span>
                <span className="text-white/30 text-xs">·</span>
                <span
                  className={`text-xs text-white/60 ${kh ? "font-khmer" : ""}`}
                >
                  {kh ? s.nationality.kh : s.nationality.en}
                </span>
              </div>
              <h2
                id={`scientist-${s.id}-name`}
                className={`text-2xl sm:text-3xl font-bold text-white leading-tight ${
                  kh ? "font-khmer leading-relaxed" : "font-display"
                }`}
              >
                {kh ? s.name.kh : s.name.en}
              </h2>
              <p
                className={`text-sm sm:text-base text-amber-200/90 italic mt-2 leading-snug ${
                  kh ? "font-khmer not-italic leading-relaxed" : ""
                }`}
              >
                {kh ? s.tag.kh : s.tag.en}
              </p>
            </div>
          </div>

          {/* Bio sections */}
          <div className="mt-6 sm:mt-8 space-y-5">
            {/* Core contribution heading */}
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <Sparkles className="w-4 h-4 text-amber-300/80" />
              <span
                className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-amber-200/80 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Core Contribution", "បេសកកម្មស្នូល")}
              </span>
            </div>
            <p
              className={`text-sm sm:text-base text-white/85 leading-relaxed ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {kh ? s.bio.kh : s.bio.en}
            </p>

            {/* Quote */}
            {s.quote && (
              <blockquote className="relative mt-4 rounded-2xl border-l-4 border-amber-400/70 bg-white/5 px-5 py-4">
                <Quote className="absolute -top-2 -left-2 w-5 h-5 text-amber-300/70 bg-slate-900 rounded-full p-0.5" />
                <p
                  className={`text-sm sm:text-base text-white/90 italic leading-relaxed ${
                    kh ? "font-khmer not-italic leading-loose" : "font-display"
                  }`}
                >
                  "{kh ? s.quote.kh : s.quote.en}"
                </p>
                <footer
                  className={`text-xs text-white/55 mt-1.5 ${kh ? "font-khmer" : ""}`}
                >
                  — {kh ? s.name.kh : s.name.en}
                </footer>
              </blockquote>
            )}

            {/* Bilingual chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80">
                {s.name.en}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 font-khmer">
                {s.name.kh}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Top-level gallery.
   ────────────────────────────────────────────────────────────────────── */

export function GiantsOfScience() {
  const t = useTranslation();
  const kh = useLanguageStore((s) => s.language) === "kh";
  const [openId, setOpenId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Field | "all">("all");

  const visible =
    filter === "all" ? SCIENTISTS : SCIENTISTS.filter((s) => s.field === filter);
  const open = SCIENTISTS.find((s) => s.id === openId) ?? null;

  // Build set of fields actually present, in display order.
  const presentFields = (Object.keys(FIELDS) as Field[]).filter((f) =>
    SCIENTISTS.some((s) => s.field === f),
  );

  return (
    <section
      aria-label={t("Giants of Science", "យក្សនៃវិទ្យាសាស្ត្រ")}
      className="mb-12 -mx-4 px-4 sm:-mx-6 sm:px-6 py-8 sm:py-10 rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-inner"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-5 sm:mb-6">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 flex items-center justify-center flex-shrink-0 shadow-md">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div
            className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-amber-300/80 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t("Hall of Fame", "សាលឈ្មោះល្បី")}
          </div>
          <h2
            className={`text-xl sm:text-2xl font-bold text-white leading-tight ${
              kh ? "font-khmer leading-relaxed" : "font-display"
            }`}
          >
            {t("Giants of Science", "យក្សនៃវិទ្យាសាស្ត្រ")}
          </h2>
          <p
            className={`text-xs sm:text-sm text-white/60 leading-snug mt-1 max-w-2xl ${
              kh ? "font-khmer leading-relaxed" : ""
            }`}
          >
            {t(
              "Tap a portrait to read the core contribution of the thinkers who built modern science.",
              "ចុចលើរូបភាពដើម្បីអានបេសកកម្មស្នូលរបស់អ្នកគិតដែលបានកសាងវិទ្យាសាស្ត្រទំនើប។",
            )}
          </p>
        </div>
      </div>

      {/* Field filter chips */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        <button
          type="button"
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
          className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
            filter === "all"
              ? "bg-white text-slate-900"
              : "bg-white/10 text-white/75 hover:bg-white/15"
          } ${kh ? "font-khmer" : ""}`}
        >
          {t(`All (${SCIENTISTS.length})`, `ទាំងអស់ (${SCIENTISTS.length})`)}
        </button>
        {presentFields.map((f) => {
          const meta = FIELDS[f];
          const count = SCIENTISTS.filter((s) => s.field === f).length;
          const active = filter === f;
          const Icon = meta.icon;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                active
                  ? `bg-gradient-to-br ${meta.from} ${meta.to} text-white shadow-sm`
                  : "bg-white/10 text-white/75 hover:bg-white/15"
              } ${kh ? "font-khmer" : ""}`}
            >
              <Icon className="w-3 h-3" />
              {kh ? meta.kh : meta.en}
              <span className={`opacity-70 font-mono ${kh ? "font-mono" : ""}`}>· {count}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {visible.map((s) => (
          <ScientistCard key={s.id} s={s} onOpen={setOpenId} kh={kh} t={t} />
        ))}
      </div>

      {/* Footer count */}
      <p
        className={`text-xs text-white/40 mt-5 text-center ${kh ? "font-khmer" : ""}`}
      >
        {t(
          `Showing ${visible.length} of ${SCIENTISTS.length} thinkers.`,
          `បង្ហាញ ${visible.length} ក្នុងចំនោម ${SCIENTISTS.length} នាក់។`,
        )}
      </p>

      {/* Modal */}
      {open && (
        <ScientistModal
          s={open}
          kh={kh}
          t={t}
          onClose={() => setOpenId(null)}
        />
      )}
    </section>
  );
}
