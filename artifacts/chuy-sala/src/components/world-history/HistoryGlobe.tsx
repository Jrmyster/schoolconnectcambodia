import { Component, ReactNode, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Globe2, Clock, ChevronRight } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

/* ──────────────────────────────────────────────────────────────────────────────
 * Eras
 * ────────────────────────────────────────────────────────────────────────────── */

type EraId = "neolithic" | "ancient" | "industrial" | "modern";

interface EraDef {
  id: EraId;
  labelEn: string;
  labelKh: string;
  shortEn: string;
  shortKh: string;
  /** Globe surface color */
  globeColor: string;
  /** Glowing atmosphere color */
  atmosphereColor: string;
}

const ERAS: EraDef[] = [
  {
    id: "neolithic",
    labelEn: "Neolithic",
    labelKh: "បុរេប្រវត្តិ",
    shortEn: "~10,000 BCE",
    shortKh: "១០,០០០ មុន គ.ស.",
    // A lush, green, mostly-wild Earth.
    globeColor: "#3f8a4a",
    atmosphereColor: "#8fd19e",
  },
  {
    id: "ancient",
    labelEn: "Ancient Empires",
    labelKh: "សម័យចក្រភព",
    shortEn: "800–1400 CE",
    shortKh: "៨០០–១៤០០ គ.ស.",
    // Warm sandstone — temples, dynasties, trade routes.
    globeColor: "#c89b5a",
    atmosphereColor: "#f4d6a0",
  },
  {
    id: "industrial",
    labelEn: "Industrial",
    labelKh: "សម័យឧស្សាហកម្ម",
    shortEn: "1700s–1900s",
    shortKh: "សតវត្សទី ១៨–១៩",
    // Smoky grey — coal, steel, steam.
    globeColor: "#6f7378",
    atmosphereColor: "#b8bdc4",
  },
  {
    id: "modern",
    labelEn: "Modern",
    labelKh: "សម័យទំនើប",
    shortEn: "1950–today",
    shortKh: "១៩៥០–សព្វថ្ងៃ",
    // Deep blue — atmospheric halo carries the era's identity.
    globeColor: "#1e3a8a",
    atmosphereColor: "#7dd3fc",
  },
];

/* ──────────────────────────────────────────────────────────────────────────────
 * Regions
 * ────────────────────────────────────────────────────────────────────────────── */

type RegionId = "asia" | "europe" | "africa" | "americas";

interface RegionDef {
  id: RegionId;
  nameEn: string;
  nameKh: string;
  /** Approximate centroid in degrees (lat, lng) used to place the marker. */
  lat: number;
  lng: number;
  pinColor: string;
}

const REGIONS: RegionDef[] = [
  // Asia centered roughly on Cambodia/Indochina so Angkor sits near the marker.
  { id: "asia",     nameEn: "Asia",     nameKh: "អាស៊ី",        lat: 20,  lng: 100, pinColor: "#ef4444" },
  { id: "europe",   nameEn: "Europe",   nameKh: "អឺរ៉ុប",        lat: 50,  lng: 10,  pinColor: "#3b82f6" },
  { id: "africa",   nameEn: "Africa",   nameKh: "អាហ្វ្រិក",   lat: 5,   lng: 20,  pinColor: "#f59e0b" },
  { id: "americas", nameEn: "Americas", nameKh: "អាមេរិក",     lat: 15,  lng: -80, pinColor: "#10b981" },
];

/* ──────────────────────────────────────────────────────────────────────────────
 * Era × Region content matrix (bilingual)
 * ────────────────────────────────────────────────────────────────────────────── */

interface RegionEraEntry {
  headlineEn: string;
  headlineKh: string;
  bodyEn: string;
  bodyKh: string;
  /** Optional callout — used for the "must-include" globally significant facts */
  highlightEn?: string;
  highlightKh?: string;
}

const CONTENT: Record<EraId, Record<RegionId, RegionEraEntry>> = {
  neolithic: {
    asia: {
      headlineEn: "Rice along the great rivers",
      headlineKh: "ស្រូវតាមដងទន្លេធំ",
      bodyEn:
        "Along the Mekong, Yangtze, and Indus, people stopped wandering and began planting rice and millet. Permanent villages, pottery, and the first temples appeared.",
      bodyKh:
        "តាមដងទន្លេមេគង្គ យ៉ាងសេ និងសិន្ធុ មនុស្សបានឈប់រេរ៉ូន ហើយចាប់ផ្តើមដាំស្រូវ និងធញ្ញជាតិ។ ភូមិអចិន្ត្រៃយ៍ ផើងដី និងប្រាសាទដំបូងបានលេចចេញមក។",
    },
    europe: {
      headlineEn: "Wheat reaches the cold north",
      headlineKh: "ស្រូវសាលីទៅដល់ភាគខាងជើងត្រជាក់",
      bodyEn:
        "Farming spread slowly out of the Middle East across the European continent. Stonehenge and other megaliths show that even early farmers built monuments to the seasons.",
      bodyKh:
        "កសិកម្មបានរីករាលដាលយឺតៗពីមជ្ឈិមបូព៌ាឆ្លងកាត់ទ្វីបអឺរ៉ុប។ Stonehenge និងវិមានធំៗដទៃទៀតបង្ហាញថា សូម្បីតែកសិករដំបូងក៏បានសាងសង់វិមានដើម្បីរដូវកាល។",
    },
    africa: {
      headlineEn: "The cradle of cattle",
      headlineKh: "កន្លែងកំណើតនៃការចិញ្ចឹមគោ",
      bodyEn:
        "In the green Sahara — at the time a savanna full of lakes — Africans were among the first to herd cattle. The earliest evidence of milking comes from this region.",
      bodyKh:
        "នៅ Sahara ដែលនៅពេលនោះជាវាលស្មៅពោរពេញដោយបឹង ប្រជាជនអាហ្វ្រិកជាក្រុមដំបូងគេដែលបានចិញ្ចឹមគោ។ ភ័ស្តុតាងដំបូងបំផុតនៃការច្របាច់ទឹកដោះមកពីតំបន់នេះ។",
    },
    americas: {
      headlineEn: "Maize and the three sisters",
      headlineKh: "ពោត និងបងប្អូនប្រុសស្រីបី",
      bodyEn:
        "In Mexico and the Andes, indigenous farmers domesticated maize, beans, and squash — the famous \"three sisters\" planted together for richer soil and bigger harvests.",
      bodyKh:
        "នៅម៉ិកស៊ិក និងភ្នំ Andes កសិករជនជាតិដើមបានដាំពោត សណ្ដែក និងល្ពៅ — \"បងប្អូនប្រុសស្រីបី\" ដ៏ល្បីដែលដាំជាមួយគ្នាដើម្បីដីមានជីជាតិ និងផលប្រមូលច្រើនជាង។",
    },
  },
  ancient: {
    asia: {
      headlineEn: "The Khmer Empire & Angkor Wat",
      headlineKh: "ចក្រភពខ្មែរ និងអង្គរវត្ត",
      bodyEn:
        "From the 9th to the 15th centuries, the Khmer Empire ruled an area larger than modern France from its capital at Angkor. Its kings built Angkor Wat — one of the largest religious monuments in the world — and an irrigation system so advanced that NASA satellites still study it today.",
      bodyKh:
        "ពីសតវត្សទី ៩ ដល់ទី ១៥ ចក្រភពខ្មែរបានគ្រប់គ្រងលើទឹកដីធំជាងប្រទេសបារាំងបច្ចុប្បន្ន ពីរាជធានីអង្គរ។ ស្តេចបានសាងសង់ប្រាសាទអង្គរវត្ត — វិមានសាសនាដ៏ធំបំផុតមួយនៅលើពិភពលោក — និងប្រព័ន្ធធារាសាស្ត្រដ៏ជឿនលឿន ដែលផ្កាយរណប NASA នៅតែសិក្សាសព្វថ្ងៃ។",
      highlightEn:
        "A global engineering marvel: built in roughly 37 years without a single modern machine, by a workforce estimated at over 250,000 people.",
      highlightKh:
        "ស្នាដៃវិស្វកម្មពិភពលោក៖ សាងសង់ក្នុងរយៈពេលប្រហែល ៣៧ ឆ្នាំដោយគ្មានម៉ាស៊ីនទំនើបណាមួយ ដោយកម្លាំងពលកម្មប៉ាន់ស្មានជាង ២៥០,០០០ នាក់។",
    },
    europe: {
      headlineEn: "From Rome to the cathedrals",
      headlineKh: "ពីរ៉ូមដល់វិហារដ៏ធំ",
      bodyEn:
        "Rome had fallen, but a new Europe was rising — Charlemagne's empire, Norman castles, Gothic cathedrals, and the first universities at Bologna, Paris, and Oxford.",
      bodyKh:
        "រ៉ូមបានដួលរលំ ប៉ុន្តែអឺរ៉ុបថ្មីកំពុងលូតលាស់ — ចក្រភព Charlemagne ប្រាសាទ Norman វិហារ Gothic និងសាកលវិទ្យាល័យដំបូងនៅ Bologna, Paris និង Oxford។",
    },
    africa: {
      headlineEn: "Mali, gold, and Timbuktu",
      headlineKh: "ម៉ាលី មាស និងធីមប៊ុកធូ",
      bodyEn:
        "The Mali Empire commanded a major share of the world's gold trade. Its emperor Mansa Musa (1280s–1330s) is often cited by historians as one of the wealthiest individuals in recorded history. The university libraries of Timbuktu were among the great centres of learning of the medieval world.",
      bodyKh:
        "ចក្រភពម៉ាលីបានគ្រប់គ្រងលើផ្នែកដ៏ធំនៃពាណិជ្ជកម្មមាសពិភពលោក។ អធិរាជរបស់ខ្លួន Mansa Musa (១២៨០–១៣៣០) ច្រើនត្រូវបានអ្នកប្រវត្តិសាស្ត្រលើកឡើងថាជាបុគ្គលអ្នកមានបំផុតម្នាក់ក្នុងប្រវត្តិសាស្ត្រដែលបានកត់ត្រា។ បណ្ណាល័យសាកលវិទ្យាល័យធីមប៊ុកធូស្ថិតក្នុងចំណោមមជ្ឈមណ្ឌលសិក្សាដ៏ធំនៃពិភពលោកសម័យកណ្តាល។",
    },
    americas: {
      headlineEn: "Maya, Aztec, and Inca",
      headlineKh: "ម៉ាយ៉ា អាស្តេក និងអ៊ីនកា",
      bodyEn:
        "The Maya invented a numbering system with zero centuries before Europe did. The Aztec capital Tenochtitlán was larger than London. The Inca built a 40,000 km road network across the Andes — without the wheel.",
      bodyKh:
        "ម៉ាយ៉ាបានបង្កើតប្រព័ន្ធលេខដែលមានសូន្យ ប៉ុន្មានសតវត្សមុនអឺរ៉ុប។ រាជធានីអាស្តេក Tenochtitlán ធំជាងទីក្រុងឡុងដ៍។ អ៊ីនកាបានសាងសង់បណ្តាញផ្លូវ ៤០,០០០ គីឡូម៉ែត្រឆ្លងកាត់ភ្នំ Andes — ដោយគ្មានកង់ឡានឡើយ។",
    },
  },
  industrial: {
    asia: {
      headlineEn: "Tradition meets steam",
      headlineKh: "ប្រពៃណីជួបនឹងចំហាយ",
      bodyEn:
        "European empires colonized much of Asia in this era. Cambodia became a French protectorate in 1863. Railways, postal services, and Western schools arrived — but so did extraction of resources and loss of sovereignty.",
      bodyKh:
        "ចក្រភពអឺរ៉ុបបានធ្វើអាណានិគមលើភាគច្រើននៃអាស៊ីក្នុងសម័យកាលនេះ។ កម្ពុជាបានក្លាយជាអាណាព្យាបាលបារាំងនៅឆ្នាំ ១៨៦៣។ ផ្លូវដែក សេវាកម្មប្រៃសណីយ៍ និងសាលារៀនលោកខាងលិចបានមកដល់ — ប៉ុន្តែការដកហូតធនធាន និងការបាត់បង់អធិបតេយ្យភាពក៏មកដល់ដែរ។",
    },
    europe: {
      headlineEn: "The steam engine changes everything",
      headlineKh: "ម៉ាស៊ីនចំហាយផ្លាស់ប្តូរអ្វីៗទាំងអស់",
      bodyEn:
        "In 1769, Scottish engineer James Watt perfected the steam engine. Burning coal could now boil water, push pistons, and turn wheels — anywhere. Within fifty years, Britain went from horses and sailing ships to factories, railways, and iron steamships.",
      bodyKh:
        "ឆ្នាំ ១៧៦៩ វិស្វករស្កុត James Watt បានធ្វើឲ្យម៉ាស៊ីនចំហាយល្អឥតខ្ចោះ។ ការដុតធ្យូងថ្មឥឡូវនេះអាចដាំទឹក រុញ piston និងបង្វិលកង់ — នៅគ្រប់ទីកន្លែង។ ក្នុងរយៈពេលហាសិបឆ្នាំ ចក្រភពអង់គ្លេសបានកែប្រែពីសេះ និងនាវាបើកក្តោងទៅជារោងចក្រ ផ្លូវដែក និងនាវាចំហាយដែក។",
      highlightEn:
        "The steam engine was a key driver of the Industrial Revolution — and within roughly two human lifetimes, the technologies it unlocked had reshaped economies on every continent.",
      highlightKh:
        "ម៉ាស៊ីនចំហាយជាកត្តាជំរុញដ៏សំខាន់នៃបដិវត្តន៍ឧស្សាហកម្ម — ហើយក្នុងរយៈពេលប្រហែលពីរអាយុជីវិតមនុស្ស បច្ចេកវិទ្យាដែលវាបានបើកទ្វារនោះបានកែប្រែសេដ្ឋកិច្ចនៅគ្រប់ទ្វីប។",
    },
    africa: {
      headlineEn: "The colonial century",
      headlineKh: "សតវត្សអាណានិគម",
      bodyEn:
        "By 1900, almost the entire continent had been divided up by European powers. Railways, telegraphs, and ports were built — almost always to move resources outward, not to connect African communities to one another.",
      bodyKh:
        "ដល់ឆ្នាំ ១៩០០ ស្ទើរតែទ្វីបទាំងមូលត្រូវបានបែងចែកដោយមហាអំណាចអឺរ៉ុប។ ផ្លូវដែក ទូរលេខ និងកំពង់ផែត្រូវបានសាងសង់ — ស្ទើរតែតែងតែដើម្បីដឹកធនធានចេញខាងក្រៅ មិនមែនដើម្បីភ្ជាប់សហគមន៍អាហ្វ្រិកទៅគ្នាទេ។",
    },
    americas: {
      headlineEn: "Independence and railroads",
      headlineKh: "ឯករាជ្យ និងផ្លូវរថភ្លើង",
      bodyEn:
        "The United States, freed from Britain in 1776, built railroads from coast to coast by 1869. South American republics won independence under leaders like Simón Bolívar. Cotton, sugar, and silver from this hemisphere fueled European factories.",
      bodyKh:
        "សហរដ្ឋអាមេរិកដែលរំដោះពីចក្រភពអង់គ្លេសនៅឆ្នាំ ១៧៧៦ បានសាងសង់ផ្លូវរថភ្លើងពីឆ្នេរមួយទៅឆ្នេរមួយនៅឆ្នាំ ១៨៦៩។ សាធារណរដ្ឋអាមេរិកខាងត្បូងបានឈ្នះឯករាជ្យក្រោមមេដឹកនាំដូចជា Simón Bolívar។ កប្បាស ស្ករ និងប្រាក់ពីអឌ្ឍគោលនេះបានផ្គត់ផ្គង់រោងចក្រអឺរ៉ុប។",
    },
  },
  modern: {
    asia: {
      headlineEn: "The Asian Century",
      headlineKh: "សតវត្សអាស៊ី",
      bodyEn:
        "In just 70 years, Asia became the manufacturing and technology heart of the world. China, South Korea, Japan, Singapore, and Vietnam transformed themselves from agricultural to industrial economies in a single generation. Cambodia is now part of this rising region — its garment factories, growing tech sector, and youth-led startups are connecting the country to global markets.",
      bodyKh:
        "ក្នុងរយៈពេលត្រឹមតែ ៧០ ឆ្នាំ អាស៊ីបានក្លាយជាបេះដូងនៃផលិតកម្ម និងបច្ចេកវិទ្យាពិភពលោក។ ចិន កូរ៉េខាងត្បូង ជប៉ុន សិង្ហបុរី និងវៀតណាមបានប្រែខ្លួនពីសេដ្ឋកិច្ចកសិកម្មទៅឧស្សាហកម្ម ក្នុងជំនាន់តែមួយ។ កម្ពុជាឥឡូវនេះជាផ្នែកនៃតំបន់ដែលកំពុងលូតលាស់នេះ — រោងចក្រកាត់ដេរ វិស័យបច្ចេកវិទ្យាដែលកំពុងរីកចម្រើន និងស្ដាតអាបដែលដឹកនាំដោយយុវជន កំពុងភ្ជាប់ប្រទេសទៅទីផ្សារសកល។",
      highlightEn:
        "Today's most advanced microchips are designed in California — but built in Taiwan, South Korea, and increasingly across Southeast Asia. The next wave of innovation may come from your generation.",
      highlightKh:
        "ឈីបទំនើបបំផុតសព្វថ្ងៃនេះត្រូវបានរចនានៅរដ្ឋ California — ប៉ុន្តែសាងសង់នៅតៃវ៉ាន់ កូរ៉េខាងត្បូង និងកាន់តែច្រើននៅអាស៊ីអាគ្នេយ៍។ រលកនៃការច្នៃប្រឌិតបន្ទាប់អាចមកពីជំនាន់របស់អ្នក។",
    },
    europe: {
      headlineEn: "Union after war",
      headlineKh: "ឯកភាពបន្ទាប់ពីសង្គ្រាម",
      bodyEn:
        "After two world wars killed tens of millions, European countries chose cooperation. The European Union now lets 27 nations share trade, science, and free travel. The continent is among the global leaders in renewable energy adoption and in formal frameworks for protecting human rights.",
      bodyKh:
        "បន្ទាប់ពីសង្គ្រាមលោកពីរបានសម្លាប់មនុស្សរាប់សិបលាននាក់ ប្រទេសអឺរ៉ុបបានជ្រើសរើសសហប្រតិបត្តិការ។ សហភាពអឺរ៉ុបឥឡូវនេះអនុញ្ញាតឲ្យប្រជាជាតិ ២៧ ចែករំលែកពាណិជ្ជកម្ម វិទ្យាសាស្ត្រ និងការធ្វើដំណើរសេរី។ ទ្វីបនេះស្ថិតក្នុងចំណោមប្រទេសឈានមុខគេពិភពលោកក្នុងការអនុវត្តថាមពលកកើតឡើងវិញ និងក្នុងក្របខ័ណ្ឌផ្លូវការសម្រាប់ការពារសិទ្ធិមនុស្ស។",
    },
    africa: {
      headlineEn: "Independence and a young continent",
      headlineKh: "ឯករាជ្យ និងទ្វីបវ័យក្មេង",
      bodyEn:
        "Between 1957 and 1980 most African nations won independence. Today Africa is the youngest continent — half its 1.4 billion people are under 19. Mobile money was invented in Kenya, and African universities are training the next generation of scientists.",
      bodyKh:
        "រវាងឆ្នាំ ១៩៥៧ និង ១៩៨០ ប្រជាជាតិអាហ្វ្រិកភាគច្រើនបានឈ្នះឯករាជ្យ។ សព្វថ្ងៃ អាហ្វ្រិកគឺជាទ្វីបវ័យក្មេងបំផុត — ពាក់កណ្តាលនៃប្រជាជន ១,៤ ពាន់លាននាក់របស់ខ្លួនមានអាយុក្រោម ១៩ ឆ្នាំ។ លុយចល័តត្រូវបានបង្កើតនៅ Kenya ហើយសាកលវិទ្យាល័យអាហ្វ្រិកកំពុងបណ្តុះបណ្តាលជំនាន់បន្ទាប់នៃអ្នកវិទ្យាសាស្ត្រ។",
    },
    americas: {
      headlineEn: "Silicon, satellites, and space",
      headlineKh: "ស៊ីលីកុន ផ្កាយរណប និងអវកាស",
      bodyEn:
        "The United States led the digital revolution: the first computers, the internet, the smartphone, and the first humans on the Moon. Latin America gave the world some of its largest cultural movements — from Brazilian music to Mexican film to Argentine football.",
      bodyKh:
        "សហរដ្ឋអាមេរិកបានដឹកនាំបដិវត្តន៍ឌីជីថល៖ កុំព្យូទ័រដំបូង អ៊ីនធឺណិត ទូរស័ព្ទស្មាតហ្វូន និងមនុស្សដំបូងនៅលើព្រះច័ន្ទ។ អាមេរិកឡាទីនបានផ្តល់ឲ្យពិភពលោកនូវចលនាវប្បធម៌ដ៏ធំបំផុត — ពីតន្ត្រីប្រេស៊ីល ដល់ភាពយន្តម៉ិកស៊ិក ដល់បាល់ទាត់អាហ្សង់ទីន។",
    },
  },
};

/* ──────────────────────────────────────────────────────────────────────────────
 * Geometry helpers
 * ────────────────────────────────────────────────────────────────────────────── */

const GLOBE_RADIUS = 1.4;

/** Convert lat/lng (degrees) to a 3D point on a sphere of `radius`. */
function latLngToVec3(latDeg: number, lngDeg: number, radius: number): [number, number, number] {
  const phi = (90 - latDeg) * (Math.PI / 180);
  const theta = (lngDeg + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}

/* ──────────────────────────────────────────────────────────────────────────────
 * 3D scene parts
 * ────────────────────────────────────────────────────────────────────────────── */

/* ── Texture URLs (served from public/textures/, cached by SW for offline use) ──
 * Diffuse  — NASA "Blue Marble" composite (continents, oceans, ice).
 * Specular — white = water (so light bounces off oceans, not landmasses).
 * Note: a separate night-lights texture used to be applied as an emissive map
 * for the Modern era, but it tinted the whole sphere yellow when blended with
 * the directional light. All four eras now share the identical base material;
 * the era's identity is carried by the atmospheric halo color. */
const TEX_BASE = `${import.meta.env.BASE_URL}textures/`;
const EARTH_DIFFUSE_URL = `${TEX_BASE}earth-blue-marble.jpg`;
const EARTH_SPECULAR_URL = `${TEX_BASE}earth-water.png`;

/**
 * Realistic, textured Earth. Suspends while the diffuse + specular maps load
 * — the parent <Suspense fallback> renders a flat-coloured sphere in the
 * meantime so the user never sees a blank canvas.
 *
 * Coordinate alignment: Three.js sphereGeometry's default UV mapping with
 * latLngToVec3() above puts longitude 0 at +x and latitude 0 at the equator,
 * matching the equirectangular Blue Marble texture. Region pins keep the
 * exact same world-coordinates and remain pinned to the correct real-world
 * latitude/longitude on the new realistic globe (verified: NYC ≈ -74°,40°
 * lands in eastern North America; Cambodia ≈ 105°,12° lands on the
 * Indochinese peninsula).
 */
function TexturedEarth() {
  // Loading either map will suspend this component until both resolve.
  // useLoader caches by URL so we only pay this cost once per session.
  const [diffuse, specular] = useLoader(THREE.TextureLoader, [
    EARTH_DIFFUSE_URL,
    EARTH_SPECULAR_URL,
  ]);

  // Configure colour space synchronously *before* first render so the very
  // first paint is gamma-correct (no brief over-dark flash). The specular
  // map is data, not colour — leave it as the default linear space.
  useMemo(() => {
    diffuse.colorSpace = THREE.SRGBColorSpace;
  }, [diffuse]);

  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <meshPhongMaterial
        map={diffuse}
        specularMap={specular}
        // White-ish specular highlight on water; subtle so it doesn't blow out.
        specular={new THREE.Color("#3a4a5e")}
        shininess={12}
      />
    </mesh>
  );
}

/** Fallback shown while textures are downloading on first visit. */
function FallbackSphere() {
  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
      <meshStandardMaterial color="#1e3a8a" roughness={0.9} />
    </mesh>
  );
}

function GlobeMesh({
  era,
  spinning,
  children,
}: {
  era: EraDef;
  spinning: boolean;
  /** Anything that should rotate WITH the Earth — region pins, labels, etc. */
  children?: ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (spinning && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Realistic Earth — suspends until textures load. Same base material
          for every era so the diffuse map always reads correctly. */}
      <Suspense fallback={<FallbackSphere />}>
        <TexturedEarth />
      </Suspense>

      {/* Era-tinted atmospheric halo — back-side material gives a cheap glow. */}
      <mesh scale={1.08}>
        <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
        <meshBasicMaterial
          color={era.atmosphereColor}
          transparent
          opacity={0.18}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Anything passed as children lives INSIDE the rotating group, so it
          inherits the Earth's rotation.y — region pins stay glued to their
          real-world latitude/longitude as the planet spins. */}
      {children}
    </group>
  );
}

function RegionPin({
  region,
  hovered,
  active,
  onPointerDown,
  onPointerOver,
  onPointerOut,
}: {
  region: RegionDef;
  hovered: boolean;
  active: boolean;
  onPointerDown: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void;
}) {
  const pos = useMemo(
    () => latLngToVec3(region.lat, region.lng, GLOBE_RADIUS + 0.04),
    [region.lat, region.lng],
  );

  const ringScale = hovered || active ? 1.5 : 1;

  return (
    <group position={pos}>
      {/* Pulsing ring (cheap — just a torus that scales). */}
      <mesh scale={ringScale}>
        <torusGeometry args={[0.08, 0.012, 6, 16]} />
        <meshBasicMaterial color={region.pinColor} transparent opacity={0.7} />
      </mesh>
      {/* Solid pin head — clickable. Larger hit area than visual. */}
      <mesh
        onPointerDown={onPointerDown}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial
          color={region.pinColor}
          emissive={region.pinColor}
          emissiveIntensity={hovered || active ? 0.8 : 0.35}
        />
      </mesh>
    </group>
  );
}

function Scene({
  era,
  spinning,
  hoveredRegion,
  onRegionClick,
  onRegionHover,
  onUserInteractStart,
  onUserInteractEnd,
}: {
  era: EraDef;
  spinning: boolean;
  hoveredRegion: RegionId | null;
  onRegionClick: (id: RegionId) => void;
  onRegionHover: (id: RegionId | null) => void;
  onUserInteractStart: () => void;
  onUserInteractEnd: () => void;
}) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 3, 5]} intensity={0.9} />

      <GlobeMesh era={era} spinning={spinning}>
        {/* Pins are children of the rotating group, so they spin with Earth
            and stay locked to their real-world latitude/longitude. */}
        {REGIONS.map((region) => (
          <RegionPin
            key={region.id}
            region={region}
            hovered={hoveredRegion === region.id}
            active={false}
            onPointerDown={(e) => {
              e.stopPropagation();
              onRegionClick(region.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
              onRegionHover(region.id);
            }}
            onPointerOut={() => {
              document.body.style.cursor = "";
              onRegionHover(null);
            }}
          />
        ))}
      </GlobeMesh>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        rotateSpeed={0.6}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={(5 * Math.PI) / 6}
        // Use the real drag lifecycle so auto-spin pauses for the *exact*
        // duration the user is dragging — no timeout guessing.
        onStart={onUserInteractStart}
        onEnd={onUserInteractEnd}
      />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
 * Main exported component
 * ────────────────────────────────────────────────────────────────────────────── */

/** Synchronously probe whether WebGL is even available before mounting THREE.
 * On older phones / locked-down browsers this returns false and we can render
 * a graceful DOM-only fallback instead of letting THREE throw at construction. */
function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const probe = document.createElement("canvas");
    const gl =
      probe.getContext("webgl") ||
      (probe.getContext("experimental-webgl") as WebGLRenderingContext | null);
    return !!gl;
  } catch {
    return false;
  }
}

export default function HistoryGlobe() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const reduceMotion = useReducedMotion();

  const [eraIdx, setEraIdx] = useState(0);
  const [hoveredRegion, setHoveredRegion] = useState<RegionId | null>(null);
  const [openRegion, setOpenRegion] = useState<RegionId | null>(null);
  // When the user grabs the globe we pause the auto-spin so they have full control.
  // Driven by OrbitControls onStart/onEnd, so it tracks the actual drag lifecycle.
  const [userInteracting, setUserInteracting] = useState(false);
  // WebGL availability: probed once on mount. SSR-safe (defaults to false).
  const [webglOk, setWebglOk] = useState(false);
  useEffect(() => {
    setWebglOk(detectWebGL());
  }, []);

  // Reset any leaked global cursor state if we unmount mid-hover (e.g. route change).
  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  const era = ERAS[eraIdx];
  const spinning = !reduceMotion && !userInteracting && openRegion === null;
  // Save battery on low-end Android: only ask R3F to render every frame
  // while something is actually animating. When idle (modal open, paused),
  // OrbitControls and state changes still trigger an `invalidate()` redraw.
  const frameloop: "always" | "demand" = spinning ? "always" : "demand";

  const entry: RegionEraEntry | null = openRegion ? CONTENT[era.id][openRegion] : null;
  const openRegionDef = openRegion ? REGIONS.find((r) => r.id === openRegion)! : null;

  return (
    <section
      aria-labelledby="history-globe-title"
      data-testid="section-history-globe"
      className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12"
    >
      <div className="rounded-3xl bg-white/85 backdrop-blur-sm border border-white/80 shadow-xl ring-1 ring-black/5 overflow-hidden">
        {/* Header band */}
        <div className="px-5 sm:px-7 pt-6 pb-3">
          <div className={`inline-flex items-center gap-1.5 rounded-full bg-indigo-100 text-indigo-800 px-3 py-1 text-xs font-bold ${kh ? "font-khmer" : ""}`}>
            <Globe2 className="w-3.5 h-3.5" />
            {t("Interactive 3D Globe", "ផែនដី 3D អន្តរកម្ម")}
          </div>
          <h2
            id="history-globe-title"
            className={`mt-2 text-2xl sm:text-3xl font-bold text-slate-900 ${kh ? "font-khmer" : "font-display"}`}
          >
            {t("Interactive History Globe", "ផែនដីប្រវត្តិសាស្ត្រអន្តរកម្ម")}
          </h2>
          <p className={`mt-1 text-sm sm:text-base text-slate-700 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Drag to spin the Earth. Tap a glowing region to see what was happening there. Move the slider to travel through time.",
              "អូសដើម្បីបង្វិលផែនដី។ ចុចលើតំបន់ភ្លឺដើម្បីមើលអ្វីដែលកំពុងកើតឡើងនៅទីនោះ។ រំកិលគ្រាប់រំកិលដើម្បីធ្វើដំណើរតាមពេលវេលា។"
            )}
          </p>
        </div>

        {/* Canvas */}
        <div
          className="relative w-full h-[360px] sm:h-[440px] lg:h-[500px]"
          // Keep the canvas background neutral so the era atmosphere reads.
          style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)" }}
        >
          {webglOk ? (
            <WebGLBoundary fallback={<GlobeFallback kh={kh} />}>
              <Canvas
                // Cap DPR so high-density mobile screens don't render at 3x.
                dpr={[1, 1.5]}
                // Lower default FOV gives a slightly more "global" feel.
                camera={{ position: [0, 0, 4.2], fov: 45 }}
                // Pre-tested setting that keeps three's renderer reasonably fast.
                gl={{ antialias: true, powerPreference: "low-power", failIfMajorPerformanceCaveat: false }}
                // Idle frames are skipped; R3F invalidates on state/prop changes.
                frameloop={frameloop}
              >
                <Scene
                  era={era}
                  spinning={spinning}
                  hoveredRegion={hoveredRegion}
                  onRegionClick={(id) => setOpenRegion(id)}
                  onRegionHover={setHoveredRegion}
                  onUserInteractStart={() => setUserInteracting(true)}
                  onUserInteractEnd={() => setUserInteracting(false)}
                />
              </Canvas>
            </WebGLBoundary>
          ) : (
            <GlobeFallback kh={kh} />
          )}

          {/* Region legend — DOM, not WebGL. Cheap and accessible. */}
          <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-auto flex flex-wrap gap-1.5 max-w-full">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setOpenRegion(r.id)}
                onMouseEnter={() => setHoveredRegion(r.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                data-testid={`globe-region-${r.id}`}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold backdrop-blur-md border transition-colors ${
                  hoveredRegion === r.id
                    ? "bg-white text-slate-900 border-white"
                    : "bg-black/40 text-white border-white/30 hover:bg-black/60"
                } ${kh ? "font-khmer" : ""}`}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: r.pinColor }}
                  aria-hidden
                />
                {kh ? r.nameKh : r.nameEn}
              </button>
            ))}
          </div>

          {/* Era badge — current era shown over the globe. */}
          <div className={`absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 text-slate-900 px-3 py-1 text-xs font-bold shadow ${kh ? "font-khmer" : ""}`}>
            <Clock className="w-3 h-3" />
            {kh ? era.shortKh : era.shortEn}
          </div>
        </div>

        {/* Time Machine slider */}
        <div className="px-5 sm:px-7 py-5 border-t border-slate-200/70 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-bold uppercase tracking-wider text-slate-600 ${kh ? "font-khmer" : ""}`}>
              {t("Time Machine", "ម៉ាស៊ីនពេលវេលា")}
            </span>
            <span className={`text-sm font-bold text-slate-900 ${kh ? "font-khmer" : ""}`}>
              {kh ? era.labelKh : era.labelEn}
            </span>
          </div>

          {/* Native range input — broadest device support, free a11y. */}
          <input
            type="range"
            min={0}
            max={ERAS.length - 1}
            step={1}
            value={eraIdx}
            onChange={(e) => setEraIdx(Number(e.target.value))}
            data-testid="globe-era-slider"
            aria-label={t("Select historical era", "ជ្រើសរើសសម័យកាល")}
            className="w-full accent-indigo-600 h-2 cursor-pointer"
          />

          <div className="mt-2 grid grid-cols-4 gap-1 text-[11px] font-bold text-slate-700">
            {ERAS.map((e, i) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setEraIdx(i)}
                data-testid={`globe-era-stop-${e.id}`}
                className={`text-left rounded-md px-1.5 py-1 transition-colors ${
                  i === eraIdx ? "bg-indigo-600 text-white" : "hover:bg-slate-100"
                } ${kh ? "font-khmer" : ""}`}
                aria-current={i === eraIdx ? "true" : undefined}
              >
                <div className="leading-tight">{i + 1}. {kh ? e.labelKh : e.labelEn}</div>
                <div className={`text-[10px] opacity-80 font-normal ${kh ? "font-khmer" : ""}`}>
                  {kh ? e.shortKh : e.shortEn}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <RegionEraModal
        open={!!entry && !!openRegionDef}
        onClose={() => setOpenRegion(null)}
        region={openRegionDef}
        era={era}
        entry={entry}
        kh={kh}
      />
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
 * WebGL error boundary + fallback — older devices may fail to get a WebGL
 * context. We catch the error and show a friendly bilingual card instead of
 * letting the whole page crash.
 * ────────────────────────────────────────────────────────────────────────────── */

class WebGLBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: unknown) {
    // eslint-disable-next-line no-console
    console.warn("HistoryGlobe: WebGL unavailable —", err);
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function GlobeFallback({ kh }: { kh: boolean }) {
  return (
    <div
      data-testid="globe-fallback"
      className="absolute inset-0 grid place-items-center p-6 text-center"
    >
      <div className="max-w-md text-white/90">
        <Globe2 className="w-10 h-10 mx-auto opacity-80" />
        <p className={`mt-3 text-sm ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "ឧបករណ៍របស់អ្នកមិនអាចបង្ហាញផែនដី 3D បានទេ ប៉ុន្តែអ្នកនៅតែអាចប្រើកម្មវិធីរំកិលពេលវេលា និងអានព័ត៌មានតំបន់នីមួយៗតាមបន្ទប់ខាងក្រោម។"
            : "Your device can't display the 3D globe, but you can still use the Time Machine slider below and read the regional history in the era cards further down the page."}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
 * Region × Era modal
 * ────────────────────────────────────────────────────────────────────────────── */

function RegionEraModal({
  open,
  onClose,
  region,
  era,
  entry,
  kh,
}: {
  open: boolean;
  onClose: () => void;
  region: RegionDef | null;
  era: EraDef;
  entry: RegionEraEntry | null;
  kh: boolean;
}) {
  const t = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && entry && region && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                data-testid="globe-region-modal"
                className="fixed inset-0 z-50 grid place-items-center p-4 pointer-events-none"
              >
                <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-2xl pointer-events-auto">
                  <div
                    className="flex items-center justify-between gap-3 px-5 py-3"
                    style={{ backgroundColor: region.pinColor }}
                  >
                    <Dialog.Title asChild>
                      <h3 className={`text-base font-bold text-white ${kh ? "font-khmer" : ""}`}>
                        <span className="inline-flex items-center gap-1.5">
                          <Globe2 className="w-4 h-4" />
                          {kh ? region.nameKh : region.nameEn}
                          <ChevronRight className="w-4 h-4 opacity-70" />
                          {kh ? era.labelKh : era.labelEn}
                        </span>
                      </h3>
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label={t("Close", "បិទ")}
                        data-testid="button-close-globe-modal"
                        className="p-1.5 rounded-md text-white hover:bg-black/20 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="p-6">
                    <div className={`text-xs font-bold uppercase tracking-wider text-slate-500 ${kh ? "font-khmer" : ""}`}>
                      {kh ? era.shortKh : era.shortEn}
                    </div>
                    <h4 className={`mt-1 text-2xl font-bold text-slate-900 leading-tight ${kh ? "font-khmer" : "font-display"}`}>
                      {kh ? entry.headlineKh : entry.headlineEn}
                    </h4>

                    <Dialog.Description asChild>
                      <p className={`mt-3 text-slate-700 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                        {kh ? entry.bodyKh : entry.bodyEn}
                      </p>
                    </Dialog.Description>

                    {entry.highlightEn && (
                      <div className="mt-5 rounded-xl bg-amber-50 border border-amber-200 p-4">
                        <div className={`text-[11px] font-bold uppercase tracking-wider text-amber-800 ${kh ? "font-khmer" : ""}`}>
                          {t("Why it matters", "ហេតុអ្វីបានជាសំខាន់")}
                        </div>
                        <p className={`mt-1.5 text-sm text-amber-950 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                          {kh ? entry.highlightKh : entry.highlightEn}
                        </p>
                      </div>
                    )}

                    <div className="mt-6 flex justify-end">
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          className={`inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-sm font-bold transition-colors ${kh ? "font-khmer" : ""}`}
                        >
                          {t("Got it", "យល់ហើយ")}
                        </button>
                      </Dialog.Close>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
