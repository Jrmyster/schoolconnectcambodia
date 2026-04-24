import { Link } from "wouter";
import {
  Hourglass, ArrowLeft, BookOpenCheck, ScrollText, Stamp,
  Flame, Bug, Waves, Droplet, Globe, Brain, Telescope, Orbit, Map as MapIcon, Dna,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import type { ComponentType, CSSProperties } from "react";

/* ──────────────────────────────────────────────────────────────────────
 * The Graveyard of Bad Maps — Disproven Science
 * A historical-archive page that retires eleven once-respected scientific
 * theories. Sepia parchment, slate ink, and a red "DISPROVEN" stamp on
 * every card. Strictly bilingual (English / Khmer). Fully responsive.
 * ────────────────────────────────────────────────────────────────────── */

/* ─── Aesthetic constants ──────────────────────────────────────────── */

const PARCHMENT_BG: CSSProperties = {
  backgroundColor: "#f5efe1",
  backgroundImage: [
    "radial-gradient(ellipse at top left,    rgba(120, 80, 30, 0.10), transparent 55%)",
    "radial-gradient(ellipse at bottom right,rgba(120, 80, 30, 0.10), transparent 55%)",
    "radial-gradient(circle  at 20% 80%,     rgba(140, 90, 30, 0.06), transparent 40%)",
    "radial-gradient(circle  at 80% 20%,     rgba(140, 90, 30, 0.06), transparent 40%)",
  ].join(", "),
};

const CARD_BG: CSSProperties = {
  backgroundColor: "#fbf6e9",
  backgroundImage: [
    "radial-gradient(ellipse at top right, rgba(120, 80, 30, 0.06), transparent 60%)",
    "radial-gradient(ellipse at bottom left, rgba(140, 90, 30, 0.05), transparent 60%)",
  ].join(", "),
};

/* ─── Data ─────────────────────────────────────────────────────────── */

type Theory = {
  id: string;
  era: string;
  nameEn: string;
  nameKh: string;
  disciplineEn: string;
  disciplineKh: string;
  icon: ComponentType<{ className?: string }>;
  beliefEn: string;
  beliefKh: string;
  truthEn: string;
  truthKh: string;
};

const THEORIES: Theory[] = [
  {
    id: "four-elements",
    era: "c. 450 BCE",
    nameEn: "The Four Elements",
    nameKh: "ធាតុទាំងបួន",
    disciplineEn: "Ancient Physics",
    disciplineKh: "រូបវិទ្យាបុរាណ",
    icon: Flame,
    beliefEn:
      "Everything in the universe is made of just four substances: Earth, Wind, Fire, and Water.",
    beliefKh:
      "អ្វីៗគ្រប់យ៉ាងនៅក្នុងសកលលោក គឺផ្សំឡើងដោយសារធាតុត្រឹមតែបួនយ៉ាង៖ ដី ខ្យល់ ភ្លើង និងទឹក។",
    truthEn:
      "The Periodic Table proved there are over 100 fundamental elements — and fire isn't an element at all. It's a chemical reaction (rapid oxidation) that releases heat and light.",
    truthKh:
      "តារាងតាមកាលកំណត់បានបញ្ជាក់ថា មានធាតុមូលដ្ឋានជាង ១០០ — ហើយភ្លើងមិនមែនជាធាតុទេ។ វាគឺជាប្រតិកម្មគីមី (អុកស៊ីតកម្មរហ័ស) ដែលបញ្ចេញកំដៅ និងពន្លឺ។",
  },
  {
    id: "spontaneous-generation",
    era: "c. 350 BCE – 1859",
    nameEn: "Spontaneous Generation",
    nameKh: "កំណើតឯកឯង",
    disciplineEn: "Biology",
    disciplineKh: "ជីវវិទ្យា",
    icon: Bug,
    beliefEn:
      "Living things can magically appear from dead things — for example, maggots grow from rotting meat.",
    beliefKh:
      "វត្ថុរស់អាចលេចឡើងដោយអព្ភូតហេតុពីវត្ថុស្លាប់ — ឧទាហរណ៍ ដង្កូវកើតចេញពីសាច់រលួយ។",
    truthEn:
      "Louis Pasteur's swan-neck flask experiment (1859) proved that microscopic eggs and bacteria are always present in the air. No new life appears unless a living parent seeds it.",
    truthKh:
      "ការពិសោធន៍កែវកក្បាលហង្សរបស់ Louis Pasteur (១៨៥៩) បានបញ្ជាក់ថា ស៊ុតមីក្រូទស្សន៍ និងបាក់តេរីតែងតែមានវត្តមាននៅក្នុងខ្យល់។ គ្មានជីវិតថ្មីលេចឡើងទេ លុះត្រាតែមានឪពុកម្ដាយរស់ដាក់ពូជពីដំបូង។",
  },
  {
    id: "luminiferous-aether",
    era: "1600s – 1905",
    nameEn: "The Luminiferous Aether",
    nameKh: "អេទែរពន្លឺ",
    disciplineEn: "Physics",
    disciplineKh: "រូបវិទ្យា",
    icon: Waves,
    beliefEn:
      "Space is filled with an invisible fluid called 'Aether' that allows light waves to travel — the same way water carries ripples.",
    beliefKh:
      "លំហអវកាសត្រូវបានបំពេញដោយវត្ថុរាវមើលមិនឃើញដែលហៅថា 'អេទែរ' ដែលអនុញ្ញាតឱ្យរលកពន្លឺធ្វើដំណើរ — ដូចគ្នានឹងទឹកដែលនាំរលក។",
    truthEn:
      "The Michelson–Morley experiment (1887) and Einstein's Special Relativity (1905) proved that space is a vacuum and that light is a self-propagating electromagnetic wave that needs no medium.",
    truthKh:
      "ការពិសោធន៍ Michelson–Morley (១៨៨៧) និងទ្រឹស្ដីសារធាតុទាក់ទងពិសេសរបស់អែនស្តាញ (១៩០៥) បានបញ្ជាក់ថា លំហអវកាសគឺជាសុញ្ញកាស ហើយពន្លឺគឺជារលកអេឡិចត្រូម៉ាញ៉េទិចដែលបន្តរីកចម្រើនដោយខ្លួនឯង គ្មានត្រូវការមធ្យមណាមួយឡើយ។",
  },
  {
    id: "humoral-theory",
    era: "c. 400 BCE – 1800s",
    nameEn: "Humoral Theory",
    nameKh: "ទ្រឹស្ដីនៃសារធាតុរាវក្នុងខ្លួន",
    disciplineEn: "Medicine",
    disciplineKh: "វេជ្ជសាស្ត្រ",
    icon: Droplet,
    beliefEn:
      "Sickness is caused by an imbalance of four liquids in the body: blood, phlegm, yellow bile, and black bile. The cure was usually bloodletting.",
    beliefKh:
      "ជំងឺគឺបណ្តាលមកពីភាពមិនមានតុល្យភាពនៃវត្ថុរាវបួនយ៉ាងនៅក្នុងរាងកាយ៖ ឈាម ស្លេស្ម ទឹកប្រមាត់លឿង និងទឹកប្រមាត់ខ្មៅ។ ការព្យាបាលជាធម្មតាគឺការដកឈាមចេញ។",
    truthEn:
      "Germ Theory (Pasteur, Koch) proved that microscopic pathogens — bacteria and viruses — are the actual cause of most diseases, and that bloodletting only made patients weaker.",
    truthKh:
      "ទ្រឹស្ដីមេរោគ (Pasteur, Koch) បានបញ្ជាក់ថា មេរោគមីក្រូទស្សន៍ — បាក់តេរី និងវីរុស — គឺជាមូលហេតុពិតប្រាកដនៃជំងឺភាគច្រើន ហើយការដកឈាមធ្វើឱ្យអ្នកជំងឺកាន់តែខ្សោយ។",
  },
  {
    id: "phlogiston",
    era: "1667 – 1783",
    nameEn: "Phlogiston Theory",
    nameKh: "ទ្រឹស្ដីផ្លូជីស្ដុន",
    disciplineEn: "Chemistry",
    disciplineKh: "គីមីវិទ្យា",
    icon: Flame,
    beliefEn:
      "Things burn because they contain an invisible fire-element called 'Phlogiston' which is released into the air during combustion.",
    beliefKh:
      "វត្ថុឆេះបានដោយសារតែវាមានធាតុភ្លើងមើលមិនឃើញដែលហៅថា 'ផ្លូជីស្ដុន' ដែលត្រូវបានបញ្ចេញចូលក្នុងខ្យល់ពេលឆេះ។",
    truthEn:
      "Antoine Lavoisier (1783) proved that burning is actually 'oxidation' — a material grabbing oxygen from the air. Things gain mass when they burn, they don't lose it.",
    truthKh:
      "Antoine Lavoisier (១៧៨៣) បានបញ្ជាក់ថា ការឆេះតាមពិតគឺ 'អុកស៊ីតកម្ម' — សារធាតុមួយចាប់យកអុកស៊ីសែនពីខ្យល់។ វត្ថុទទួលបានម៉ាស់នៅពេលឆេះ មិនមែនបាត់បង់ទេ។",
  },
  {
    id: "geocentrism",
    era: "c. 150 CE – 1610",
    nameEn: "Geocentrism",
    nameKh: "ទ្រឹស្ដីផែនដីជាចំណុចកណ្តាល",
    disciplineEn: "Astronomy",
    disciplineKh: "តារាសាស្ត្រ",
    icon: Globe,
    beliefEn:
      "The Earth is the exact center of the universe. The Sun, the Moon, the planets, and all the stars spin around us in perfect crystal spheres.",
    beliefKh:
      "ផែនដីគឺជាចំណុចកណ្តាលពិតប្រាកដនៃសកលលោក។ ព្រះអាទិត្យ ព្រះច័ន្ទ ភពនានា និងផ្កាយទាំងអស់ វិលជុំវិញយើងក្នុងស្វ៊ែគ្រីស្តាល់ដ៏ល្អឥតខ្ចោះ។",
    truthEn:
      "Copernicus (1543) and Galileo (1610, with his telescope) proved the Earth is just one of many planets orbiting the Sun, which is itself just one of billions of stars in the Milky Way.",
    truthKh:
      "Copernicus (១៥៤៣) និង Galileo (១៦១០ ដោយប្រើទូរទស្សន៍របស់គាត់) បានបញ្ជាក់ថា ផែនដីគឺគ្រាន់តែជាភពមួយក្នុងចំណោមភពជាច្រើនដែលគោចរជុំវិញព្រះអាទិត្យ ហើយព្រះអាទិត្យខ្លួនឯងគឺគ្រាន់តែជាផ្កាយមួយក្នុងចំណោមផ្កាយរាប់ពាន់លានក្នុងផ្លូវទឹកដោះ។",
  },
  {
    id: "phrenology",
    era: "1796 – 1900",
    nameEn: "Phrenology",
    nameKh: "ទ្រឹស្ដីទម្រង់លលាដ៍ក្បាល",
    disciplineEn: "Psychology",
    disciplineKh: "ចិត្តវិទ្យា",
    icon: Brain,
    beliefEn:
      "You can tell how smart, kind, or criminal a person is by measuring the bumps on their skull. Each bump supposedly mapped to a personality trait.",
    beliefKh:
      "អ្នកអាចប្រាប់បានថា មនុស្សម្នាក់ឆ្លាត ល្អ ឬជាឧក្រិដ្ឋជន ដោយវាស់ដុំនៅលើលលាដ៍ក្បាលរបស់ពួកគេ។ ដុំនីមួយៗត្រូវបានគេនិយាយថាទាក់ទងនឹងលក្ខណៈបុគ្គលិកលក្ខណៈ។",
    truthEn:
      "Modern neuroscience and brain imaging proved that brain function is distributed across vast neural networks. The bumps on a skull are random anatomy — they mean absolutely nothing about character.",
    truthKh:
      "ប្រសាទវិទ្យាសម័យទំនើប និងការថតរូបខួរក្បាលបានបញ្ជាក់ថា មុខងារខួរក្បាលត្រូវបានចែកចាយឆ្លងកាត់បណ្តាញសរសៃប្រសាទដ៏ធំទូលាយ។ ដុំនៅលើលលាដ៍ក្បាលគឺជាកាយវិភាគសាស្ត្រចៃដន្យ — វាគ្មានន័យអ្វីសោះអំពីបុគ្គលិកលក្ខណៈ។",
  },
  {
    id: "martian-canals",
    era: "1877 – 1965",
    nameEn: "Martian Canals",
    nameKh: "ប្រឡាយលើភពអង្គារ",
    disciplineEn: "Astronomy",
    disciplineKh: "តារាសាស្ត្រ",
    icon: Telescope,
    beliefEn:
      "Early telescopes seemed to show long, straight lines on the surface of Mars, leading famous astronomers to claim an alien civilization had built water canals across a dying desert planet.",
    beliefKh:
      "ទូរទស្សន៍ដំបូងហាក់ដូចជាបង្ហាញខ្សែវែង និងត្រង់នៅលើផ្ទៃភពអង្គារ ដែលនាំឱ្យអ្នកតារាសាស្ត្រដ៏ល្បីៗអះអាងថា មានអារ្យធម៌ដ៏សម្បូរបែបបានសាងសង់ប្រឡាយទឹកឆ្លងកាត់ភពវាលខ្សាច់ដែលជិតស្លាប់។",
    truthEn:
      "Better telescopes — and the Mariner and Viking spacecraft (1965+) — proved the lines were just optical illusions caused by dust, low resolution, and the human brain's tendency to connect dots into patterns.",
    truthKh:
      "ទូរទស្សន៍ប្រសើរជាងមុន — និងយានអវកាស Mariner និង Viking (១៩៦៥+) — បានបញ្ជាក់ថា ខ្សែទាំងនោះគ្រាន់តែជាការបំភ្លៃភ្នែកបណ្តាលមកពីធូលី គុណភាពទាប និងទំនោររបស់ខួរក្បាលមនុស្សក្នុងការតភ្ជាប់ចំណុចទៅជាគំរូ។",
  },
  {
    id: "static-universe",
    era: "Antiquity – 1929",
    nameEn: "The Static Universe",
    nameKh: "សកលលោកនៅស្ងៀម",
    disciplineEn: "Cosmology",
    disciplineKh: "សកលលោកវិទ្យា",
    icon: Orbit,
    beliefEn:
      "The universe has always existed at the same size and will never change. Even Einstein originally added a 'cosmological constant' to his equations to keep it that way.",
    beliefKh:
      "សកលលោកតែងតែមាននៅទំហំដដែល និងនឹងមិនផ្លាស់ប្តូរទេ។ សូម្បីតែអែនស្តាញដំបូងបានបន្ថែម 'ចំនួនថេរសកលលោក' ទៅក្នុងសមីការរបស់គាត់ ដើម្បីរក្សាវាឱ្យនៅដដែល។",
    truthEn:
      "Edwin Hubble (1929) proved that distant galaxies are racing away from us. The universe is rapidly expanding outward from a Big Bang 13.8 billion years ago. Einstein later called the constant his 'biggest blunder.'",
    truthKh:
      "Edwin Hubble (១៩២៩) បានបញ្ជាក់ថា កាឡាក់ស៊ីឆ្ងាយៗកំពុងរត់ឆ្ងាយពីយើង។ សកលលោកកំពុងពង្រីកយ៉ាងលឿនចេញពី Big Bang កាលពី ១៣.៨ ពាន់លានឆ្នាំមុន។ ក្រោយមក អែនស្តាញហៅចំនួនថេរនោះថាជា 'កំហុសធំបំផុត' របស់គាត់។",
  },
  {
    id: "terra-australis",
    era: "1500s – 1820",
    nameEn: "Terra Australis",
    nameKh: "ទ្វីបភាគខាងត្បូងដែលមិនស្គាល់",
    disciplineEn: "Geography",
    disciplineKh: "ភូមិវិទ្យា",
    icon: MapIcon,
    beliefEn:
      "There must be a massive, hidden continent at the bottom of the world to 'balance' the weight of Europe and Asia in the north — otherwise the Earth would tip over.",
    beliefKh:
      "ត្រូវតែមានទ្វីបធំមួយលាក់នៅផ្នែកខាងក្រោមនៃពិភពលោក ដើម្បី 'ធ្វើតុល្យភាព' ទម្ងន់របស់អឺរ៉ុប និងអាស៊ីនៅភាគខាងជើង — បើមិនដូច្នេះទេ ផែនដីនឹងផ្ទាប់ចុះ។",
    truthEn:
      "Centuries of ocean voyages and Antarctic expeditions (Cook, Bellingshausen) mapped the Southern Ocean and found Antarctica — proving the Earth doesn't need to be symmetrically balanced. Gravity simply doesn't work that way.",
    truthKh:
      "ដំណើរកប៉ាល់សមុទ្រ និងបេសកកម្មអង់តាក់ទិកជាច្រើនសតវត្ស (Cook, Bellingshausen) បានគូសផែនទីមហាសមុទ្រខាងត្បូង និងបានរកឃើញអង់តាក់ទិក — បញ្ជាក់ថា ផែនដីមិនចាំបាច់ត្រូវធ្វើតុល្យភាពស៊ីមេទ្រីទេ។ ទំនាញគ្រាន់តែមិនដំណើរការតាមរបៀបនោះឡើយ។",
  },
  {
    id: "telegony",
    era: "Antiquity – 1900s",
    nameEn: "Telegony",
    nameKh: "ទ្រឹស្ដីតេឡេហ្គោនី",
    disciplineEn: "Biology",
    disciplineKh: "ជីវវិទ្យា",
    icon: Dna,
    beliefEn:
      "Offspring can inherit the physical traits of a mother's previous male partners — even partners she had years before the actual father. People used this idea to police women's marriages.",
    beliefKh:
      "កូនអាចទទួលមរតកលក្ខណៈរូបរាងកាយរបស់ដៃគូប្រុសមុនៗរបស់ម្ដាយ — សូម្បីតែដៃគូដែលនាងមានកាលពីច្រើនឆ្នាំមុនឪពុកពិតប្រាកដ។ មនុស្សបានប្រើគំនិតនេះដើម្បីត្រួតពិនិត្យអាពាហ៍ពិពាហ៍របស់ស្ត្រី។",
    truthEn:
      "Mendelian genetics (1866) and modern DNA mapping proved that traits come strictly from the one sperm and one egg that physically combine to form the child. Past partners contribute nothing.",
    truthKh:
      "ហ្សែនទិចមេនដែល (១៨៦៦) និងការគូសផែនទី DNA សម័យទំនើបបានបញ្ជាក់ថា លក្ខណៈមរតកមកដោយតឹងរ៉ឹងពីមេជីវិតឈ្មោលមួយ និងពងមួយដែលរួមបញ្ចូលគ្នាដើម្បីបង្កើតកូន។ ដៃគូមុនៗមិនរួមចំណែកអ្វីទេ។",
  },
];

/* ─── Page ─────────────────────────────────────────────────────────── */

export function DisprovenTheoriesPage() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const t = (en: string, k: string) => (kh ? k : en);

  return (
    <div className="min-h-screen px-4 py-8 sm:py-10" style={PARCHMENT_BG}>
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-sm font-mono text-amber-900/80 hover:text-amber-900 hover:underline mb-6 transition ${
            kh ? "font-khmer normal-case" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
        </Link>

        {/* Hero */}
        <header className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-stone-50 border-2 border-amber-900/30 shadow-[0_4px_14px_-6px_rgba(120,80,30,0.3)] mb-4">
            <Hourglass className="w-8 h-8 text-amber-900" />
          </div>
          <div
            className={`text-[11px] font-mono uppercase tracking-[0.32em] text-amber-800/90 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t("Historical Archive · Vol. I", "បណ្ណសារប្រវត្តិសាស្ត្រ · ភាគ ១")}
          </div>
          <h1
            className={`font-serif text-3xl sm:text-5xl font-bold text-slate-900 mt-2 italic ${
              kh ? "font-khmer not-italic leading-snug" : ""
            }`}
          >
            {kh
              ? "ទីបញ្ចុះសពនៃផែនទីខុស៖ វិទ្យាសាស្ត្រដែលត្រូវបានច្រានចោល"
              : "The Graveyard of Bad Maps"}
          </h1>
          <p
            className={`mt-2 font-serif text-lg sm:text-xl text-amber-900/80 italic ${
              kh ? "font-khmer not-italic" : ""
            }`}
          >
            {kh ? "(Disproven Science)" : "Disproven Science / វិទ្យាសាស្ត្រដែលត្រូវបានច្រានចោល"}
          </p>
          <p
            className={`mt-5 max-w-2xl mx-auto text-sm sm:text-base text-slate-700 ${
              kh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {kh
              ? "នេះគឺជាសារមន្ទីរនៃ \"ផែនទី\" វិទ្យាសាស្ត្រដែលធ្លាប់ត្រឹមត្រូវ — ដែលធ្លាប់ត្រូវបានគ្រូបង្រៀន ប្រកាន់ជឿ និងការពារ — មុនពេលភស្តុតាងថ្មីបានបំបែកវាទាំងអស់។ រាល់ទ្រឹស្ដីនៅទីនេះមានត្រាក្រហមមួយ៖ DISPROVEN។"
              : "This is the museum of scientific 'maps' that were once correct — taught, believed, defended — until new evidence shattered them. Every theory here wears the same red stamp: DISPROVEN."}
          </p>
        </header>

        {/* Paradigm Shift introduction */}
        <ParadigmShiftCard kh={kh} />

        {/* Section divider */}
        <div className="flex items-center gap-4 my-12">
          <div className="flex-1 h-px bg-amber-900/20" />
          <div className="flex items-center gap-2 text-amber-900/70">
            <ScrollText className="w-4 h-4" />
            <span
              className={`text-[11px] font-mono uppercase tracking-[0.3em] ${
                kh ? "font-khmer normal-case tracking-normal text-xs" : ""
              }`}
            >
              {t("The Museum Grid", "ក្រឡាចត្រង្គសារមន្ទីរ")}
            </span>
          </div>
          <div className="flex-1 h-px bg-amber-900/20" />
        </div>

        {/* Theory grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          data-testid="museum-grid"
        >
          {THEORIES.map((th) => (
            <TheoryCard key={th.id} theory={th} kh={kh} />
          ))}
        </div>

        {/* Closing reflection */}
        <ClosingReflection kh={kh} />
      </div>
    </div>
  );
}

/* ─── Paradigm Shift introduction ──────────────────────────────────── */

function ParadigmShiftCard({ kh }: { kh: boolean }) {
  const t = (en: string, k: string) => (kh ? k : en);
  return (
    <section
      data-testid="paradigm-shift"
      aria-labelledby="paradigm-shift-heading"
      className="rounded-3xl border-2 border-amber-900/25 shadow-[0_10px_40px_-15px_rgba(120,80,30,0.30)] overflow-hidden"
      style={CARD_BG}
    >
      <div className="grid md:grid-cols-[260px_1fr] gap-0">
        {/* Left — Kuhn portrait silhouette */}
        <div className="relative bg-gradient-to-br from-stone-200/60 via-amber-100/40 to-stone-100 border-b md:border-b-0 md:border-r border-amber-900/20 p-6 sm:p-8 flex flex-col items-center justify-center text-center">
          {/* Monogram "portrait" */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-stone-50 border-4 border-amber-900/30 shadow-inner flex items-center justify-center mb-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-amber-950 italic">
              T.K.
            </span>
          </div>
          <div className={`font-serif text-base font-bold text-slate-900 italic ${kh ? "font-khmer not-italic" : ""}`}>
            {t("Thomas S. Kuhn", "ថូម៉ាស អេស. គូន")}
          </div>
          <div className="text-[11px] font-mono text-amber-900/80 mt-0.5">1922 – 1996</div>
          <div
            className={`mt-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-900/10 text-amber-900 border border-amber-900/30 ${
              kh ? "font-khmer normal-case tracking-normal" : ""
            }`}
          >
            <BookOpenCheck className="w-3 h-3" />
            {t("Philosopher of Science", "ទស្សនវិទូវិទ្យាសាស្ត្រ")}
          </div>
        </div>

        {/* Right — concept */}
        <div className="p-6 sm:p-8">
          <div
            className={`text-[11px] font-mono uppercase tracking-[0.25em] text-amber-800/80 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t("The Introduction", "សេចក្ដីផ្ដើម")}
          </div>
          <h2
            id="paradigm-shift-heading"
            className={`font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1 italic ${
              kh ? "font-khmer not-italic leading-snug" : ""
            }`}
          >
            {kh ? "ការផ្លាស់ប្តូរគំរូ" : "The Paradigm Shift"}
            {kh && (
              <span className="ml-2 text-base text-amber-900/70 font-sans font-normal not-italic">
                (The Paradigm Shift)
              </span>
            )}
          </h2>
          <p
            className={`mt-3 text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {kh
              ? 'នៅឆ្នាំ ១៩៦២ ទស្សនវិទូ ថូម៉ាស គូន បានបោះពុម្ពសៀវភៅ "រចនាសម្ព័ន្ធនៃបដិវត្តន៍វិទ្យាសាស្ត្រ" (The Structure of Scientific Revolutions)។ គាត់បានអះអាងថា វិទ្យាសាស្ត្រមិនរីកចម្រើនជាបន្ទាត់ត្រង់ឡើយ — វាដើរតាមជំហានធំៗ។'
              : 'In 1962, the philosopher Thomas Kuhn published his book The Structure of Scientific Revolutions. He argued that science does not progress in a straight line — it moves in great leaps.'}
          </p>
          <div className="mt-4 rounded-2xl border-2 border-dashed border-amber-900/30 bg-amber-50/60 p-4 sm:p-5">
            <div
              className={`text-[10px] font-mono uppercase tracking-widest text-amber-800 mb-2 ${
                kh ? "font-khmer normal-case tracking-normal" : ""
              }`}
            >
              {t("Definition", "និយមន័យ")}
            </div>
            <p
              className={`font-serif text-base sm:text-lg text-slate-900 italic ${
                kh ? "font-khmer not-italic leading-loose" : "leading-relaxed"
              }`}
            >
              {kh
                ? '"ការផ្លាស់ប្តូរគំរូ" កើតឡើងនៅពេលដែលគំរូវិទ្យាសាស្ត្រចាស់មួយ — "ផែនទី" — លែងអាចពន្យល់ការរកឃើញថ្មីៗបានទៀតហើយ។ ប្រព័ន្ធទាំងមូលបាក់បែក ហើយវិទ្យាសាស្ត្រត្រូវកសាងការយល់ដឹងរបស់ខ្លួនអំពីសកលលោកឡើងវិញទាំងស្រុង។'
                : '"A paradigm shift" happens when an old scientific model — a "Map" — can no longer explain new discoveries. The entire system breaks down, and science must completely rebuild its understanding of the universe.'}
            </p>
          </div>
          <p
            className={`mt-4 text-sm text-amber-900/80 italic ${
              kh ? "font-khmer not-italic leading-loose" : ""
            }`}
          >
            {kh
              ? "→ ផែនទីដែលនៅសល់នៅខាងក្រោម គឺជាផែនទីដែលធ្លាក់ចេញពីដំណើរការនេះ។"
              : "→ The maps that follow below are the ones that fell out of this process."}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Theory card ──────────────────────────────────────────────────── */

function TheoryCard({ theory, kh }: { theory: Theory; kh: boolean }) {
  const t = (en: string, k: string) => (kh ? k : en);
  const Icon = theory.icon;

  return (
    <article
      data-testid={`theory-card-${theory.id}`}
      className="relative rounded-2xl border-2 border-amber-900/25 shadow-[0_8px_24px_-12px_rgba(120,80,30,0.35)] overflow-hidden flex flex-col hover:shadow-[0_12px_32px_-12px_rgba(120,80,30,0.45)] hover:-translate-y-0.5 transition-all duration-200"
      style={CARD_BG}
    >
      {/* Top metadata bar */}
      <div className="flex items-center justify-between gap-2 px-5 pt-4">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/5 border border-slate-900/20 text-[10px] font-mono text-slate-700 uppercase tracking-wider">
          <Icon className="w-3 h-3" />
          <span className={kh ? "font-khmer normal-case tracking-normal" : ""}>
            {t(theory.disciplineEn, theory.disciplineKh)}
          </span>
        </div>
        <span className="text-[10px] font-mono text-amber-900/70 italic">{theory.era}</span>
      </div>

      {/* Title block */}
      <header className="px-5 pt-3 pb-4">
        <h3
          className={`font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-tight italic ${
            kh ? "font-khmer not-italic leading-snug" : ""
          }`}
        >
          {t(theory.nameEn, theory.nameKh)}
        </h3>
        <div
          className={`mt-1 text-sm text-amber-900/80 ${
            kh ? "font-sans not-italic" : "font-khmer"
          }`}
        >
          {kh ? theory.nameEn : theory.nameKh}
        </div>
      </header>

      {/* Belief panel */}
      <div className="mx-5 rounded-xl bg-amber-100/50 border border-amber-900/20 p-3.5">
        <div
          className={`text-[10px] font-mono uppercase tracking-widest text-amber-800 mb-1.5 ${
            kh ? "font-khmer normal-case tracking-normal" : ""
          }`}
        >
          {t("The Belief", "ជំនឿ")}
        </div>
        <p
          className={`text-sm text-slate-800 ${
            kh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {t(theory.beliefEn, theory.beliefKh)}
        </p>
      </div>

      {/* Truth panel */}
      <div className="mx-5 mt-3 mb-5 rounded-xl bg-slate-900/[0.04] border border-slate-900/20 p-3.5 flex-1">
        <div
          className={`text-[10px] font-mono uppercase tracking-widest text-slate-700 mb-1.5 ${
            kh ? "font-khmer normal-case tracking-normal" : ""
          }`}
        >
          {t("The Truth", "ការពិត")}
        </div>
        <p
          className={`text-sm text-slate-900 ${
            kh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {t(theory.truthEn, theory.truthKh)}
        </p>
      </div>

      {/* DISPROVEN stamp */}
      <DisprovenStamp kh={kh} />
    </article>
  );
}

/* ─── DISPROVEN red ink stamp ──────────────────────────────────────── */

function DisprovenStamp({ kh }: { kh: boolean }) {
  return (
    <div
      data-testid="disproven-stamp"
      aria-label={kh ? "ស្ថានភាព៖ ច្រានចោល" : "Status: Disproven"}
      className="absolute top-3 right-3 select-none pointer-events-none"
      style={{ transform: "rotate(-12deg)" }}
    >
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border-[2.5px] border-rose-700/70 bg-rose-50/30"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(190,18,60,0.25)",
          mixBlendMode: "multiply",
        }}
      >
        <Stamp className="w-3.5 h-3.5 text-rose-700" />
        <span
          className="font-serif text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] text-rose-700 italic"
          style={{ textShadow: "0 0 1px rgba(190,18,60,0.35)" }}
        >
          {kh ? "ច្រានចោល" : "Disproven"}
        </span>
      </div>
    </div>
  );
}

/* ─── Closing reflection ───────────────────────────────────────────── */

function ClosingReflection({ kh }: { kh: boolean }) {
  const t = (en: string, k: string) => (kh ? k : en);
  return (
    <section
      className="mt-12 mb-4 rounded-3xl border-2 border-amber-900/25 shadow-[0_8px_24px_-12px_rgba(120,80,30,0.30)] overflow-hidden p-6 sm:p-8 text-center"
      style={CARD_BG}
    >
      <Hourglass className="w-7 h-7 text-amber-900 mx-auto mb-3" />
      <div
        className={`text-[11px] font-mono uppercase tracking-[0.3em] text-amber-800/80 ${
          kh ? "font-khmer normal-case tracking-normal text-xs" : ""
        }`}
      >
        {t("A Final Note", "កំណត់សម្គាល់ចុងក្រោយ")}
      </div>
      <p
        className={`mt-3 max-w-2xl mx-auto font-serif text-base sm:text-lg text-slate-900 italic ${
          kh ? "font-khmer not-italic leading-loose" : "leading-relaxed"
        }`}
      >
        {kh
          ? "វិទ្យាសាស្ត្រមិនមែនជាបណ្ដុំការពិតដែលឋិតថេរនោះទេ។ វាគឺជាដំណើរការនៃការគូសផែនទីឡើងវិញ។ រាល់ផែនទីដែលយើងប្រើនៅថ្ងៃនេះ — សូម្បីតែឆ្ពោះទៅអនាគត — នឹងត្រូវបានកែប្រែផងដែរ។ នោះជាសម្រស់របស់វា។"
          : "Science is not a fixed set of facts. It is a process of redrawing the map. Every map we use today — even tomorrow's — will one day be revised too. That is its beauty."}
      </p>
    </section>
  );
}
