import { useState, useEffect, useMemo } from "react";
import {
  Plane,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Stamp,
  Compass,
  Globe2,
  Building2,
  Sparkles,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

import nycImg        from "@assets/stock_images/nyc-statue-liberty.jpg";
import parisImg      from "@assets/stock_images/paris-eiffel-tower.jpg";
import tokyoImg      from "@assets/stock_images/tokyo-shibuya.jpg";
import phnomPenhImg  from "@assets/stock_images/phnom-penh-monument.jpg";
import cairoImg      from "@assets/stock_images/cairo-pyramids.jpg";

// ════════════════════════════════════════════════════════════════════════════
//  Global Cities & Landmarks
//  ទីក្រុងធំៗ និងតំបន់ល្បីៗលើពិភពលោក
//
//  Three modules in a vibrant "Traveler" aesthetic:
//   1. The World's Giants — ranked top-5 most populated cities
//   2. Iconic Landmark Carousel — postcard slider, 5 cities w/ photos + facts
//   3. City Statistics — bar chart vs Phnom Penh
//
//  Aesthetic: warm cream paper, rotated postcards with tape & stamps,
//  passport-style stamps, dashed flight paths, travel pins.
// ════════════════════════════════════════════════════════════════════════════

type CityRank = {
  rankCity: string;
  cityKh: string;
  country: string;
  countryKh: string;
  flag: string;
  populationMillions: number;
};

const TOP_CITIES: CityRank[] = [
  { rankCity: "Tokyo",     cityKh: "តូក្យូ",         country: "Japan",      countryKh: "ជប៉ុន",        flag: "🇯🇵", populationMillions: 37.4 },
  { rankCity: "Delhi",     cityKh: "ដេលី",            country: "India",      countryKh: "ឥណ្ឌា",       flag: "🇮🇳", populationMillions: 33.8 },
  { rankCity: "Shanghai",  cityKh: "សៀងហៃ",         country: "China",      countryKh: "ចិន",          flag: "🇨🇳", populationMillions: 29.9 },
  { rankCity: "Dhaka",     cityKh: "ដាកា",            country: "Bangladesh", countryKh: "បង់ក្លាដេស", flag: "🇧🇩", populationMillions: 23.9 },
  { rankCity: "São Paulo", cityKh: "សៅប៉ូឡូ",        country: "Brazil",     countryKh: "ប្រេស៊ីល",   flag: "🇧🇷", populationMillions: 22.8 },
];

const PHNOM_PENH_POP_MILLIONS = 2.3;

type Landmark = {
  id: string;
  cityEn: string; cityKh: string;
  countryEn: string; countryKh: string;
  flag: string;
  landmarkEn: string; landmarkKh: string;
  factEn: string; factKh: string;
  image: string;
  stampEn: string; stampKh: string;
  accent: string; // tailwind text colour for accent
  bg: string;     // tailwind tinted bg for postcard back
  rotate: string; // small base rotation
};

const LANDMARKS: Landmark[] = [
  {
    id: "nyc",
    cityEn: "New York City", cityKh: "ញូវយ៉ក",
    countryEn: "United States", countryKh: "សហរដ្ឋអាមេរិក",
    flag: "🇺🇸",
    landmarkEn: "Statue of Liberty", landmarkKh: "រូបសំណាកសេរីភាព",
    factEn: "A symbol of freedom standing 93 metres tall in New York Harbor — a gift from France to the United States in 1886. Her seven-pointed crown represents the seven seas and seven continents of the world.",
    factKh: "និមិត្តរូបនៃសេរីភាព ឈរខ្ពស់ ៩៣ ម៉ែត្រនៅកំពង់ផែញូវយ៉ក — ជាអំណោយពីប្រទេសបារាំងដល់សហរដ្ឋអាមេរិកក្នុងឆ្នាំ ១៨៨៦។ មកុដមានចំណុចប្រាំពីរ តំណាងឲ្យសមុទ្រប្រាំពីរ និងទ្វីបប្រាំពីរនៃពិភពលោក។",
    image: nycImg,
    stampEn: "LIBERTY · 1886", stampKh: "សេរីភាព · ១៨៨៦",
    accent: "text-rose-600", bg: "bg-rose-50",
    rotate: "-rotate-1",
  },
  {
    id: "paris",
    cityEn: "Paris", cityKh: "ប៉ារីស",
    countryEn: "France", countryKh: "បារាំង",
    flag: "🇫🇷",
    landmarkEn: "Eiffel Tower", landmarkKh: "ប៉មអេហ្វែល",
    factEn: "Built in 1889 for the World's Fair as a temporary structure that was supposed to be torn down after 20 years. Parisians hated it at first, but it became the most-visited paid monument on Earth — about 7 million visitors each year.",
    factKh: "សង់ឡើងក្នុងឆ្នាំ ១៨៨៩ សម្រាប់ពិព័រណ៍ពិភពលោក ជាសំណង់បណ្ដោះអាសន្នដែលត្រូវរុះរើបន្ទាប់ពី ២០ ឆ្នាំ។ ប្រជាជនប៉ារីសស្អប់វាដំបូង ប៉ុន្តែវាបានក្លាយជាវិមានដែលមានការទស្សនាច្រើនជាងគេបង់ប្រាក់នៅលើផែនដី — ប្រហែល ៧ លាននាក់ក្នុងមួយឆ្នាំ។",
    image: parisImg,
    stampEn: "BONJOUR · PARIS", stampKh: "ប៉ារីស · ១៨៨៩",
    accent: "text-amber-600", bg: "bg-amber-50",
    rotate: "rotate-1",
  },
  {
    id: "tokyo",
    cityEn: "Tokyo", cityKh: "តូក្យូ",
    countryEn: "Japan", countryKh: "ជប៉ុន",
    flag: "🇯🇵",
    landmarkEn: "Shibuya Crossing", landmarkKh: "ផ្លូវកាត់ស៊ីប៊ូយ៉ា",
    factEn: "The world's busiest pedestrian intersection — up to 3,000 people cross at once when the lights turn green. Tokyo is also a global leader in robotics and high-tech transit, with bullet trains that run on time within seconds.",
    factKh: "ផ្លូវកាត់សម្រាប់អ្នកថ្មើរជើងមមាញឹកជាងគេក្នុងពិភពលោក — រហូតដល់ ៣.០០០ នាក់ឆ្លងកាត់ក្នុងពេលតែមួយ ពេលភ្លើងបៃតង។ តូក្យូក៏ជាអ្នកដឹកនាំសកលលោកក្នុងវិស័យមនុស្សយន្ត និងការដឹកជញ្ជូនបច្ចេកវិទ្យាខ្ពស់ ដែលរថភ្លើងល្បឿនលឿនរត់ទាន់ពេលរាប់វិនាទី។",
    image: tokyoImg,
    stampEn: "TOKYO 東京", stampKh: "តូក្យូ · ជប៉ុន",
    accent: "text-fuchsia-600", bg: "bg-fuchsia-50",
    rotate: "-rotate-2",
  },
  {
    id: "phnom-penh",
    cityEn: "Phnom Penh", cityKh: "ភ្នំពេញ",
    countryEn: "Cambodia", countryKh: "កម្ពុជា",
    flag: "🇰🇭",
    landmarkEn: "Independence Monument", landmarkKh: "វិមានឯករាជ្យ",
    factEn: "Inaugurated in 1958 to celebrate Cambodia's independence from France in 1953. Designed in the lotus-shaped style of Angkorian temples, it stands at the heart of the city alongside the Royal Palace — a beautiful complex still home to the Cambodian king.",
    factKh: "សម្ពោធក្នុងឆ្នាំ ១៩៥៨ ដើម្បីអបអរសាទរឯករាជ្យកម្ពុជាពីបារាំងក្នុងឆ្នាំ ១៩៥៣។ រចនាក្នុងរូបរាងផ្កាឈូកនៃស្ថាបត្យកម្មអង្គរ វាឈរនៅបេះដូងទីក្រុង នៅជាប់នឹងព្រះបរមរាជវាំង — សំណង់ដ៏ស្រស់ស្អាត ដែលនៅតែជាលំនៅរបស់ព្រះមហាក្សត្រកម្ពុជា។",
    image: phnomPenhImg,
    stampEn: "ភ្នំពេញ · 1953", stampKh: "ភ្នំពេញ · ១៩៥៣",
    accent: "text-emerald-700", bg: "bg-emerald-50",
    rotate: "rotate-1",
  },
  {
    id: "cairo",
    cityEn: "Cairo", cityKh: "កែរ៉ូ",
    countryEn: "Egypt", countryKh: "អេហ្ស៊ីប",
    flag: "🇪🇬",
    landmarkEn: "Great Pyramid of Giza", landmarkKh: "ពីរ៉ាមីតធំនៃហ្គីហ្សា",
    factEn: "The only one of the Seven Wonders of the Ancient World that still stands. Built around 2560 BCE for Pharaoh Khufu, it was the tallest human-made structure on Earth for nearly 4,000 years — taller than any cathedral or skyscraper until 1889.",
    factKh: "ជាវត្ថុតែមួយគត់ក្នុងចំណោមអច្ឆរិយវត្ថុទាំងប្រាំពីរនៃពិភពលោកបុរាណ ដែលនៅឈរ។ សង់ឡើងប្រហែលឆ្នាំ ២៥៦០ មុនគ.ស. សម្រាប់ស្ដេចហ្វារ៉ោន ឃឹហ្វូ វាជាសំណង់ខ្ពស់បំផុតដែលមនុស្សបានបង្កើតលើផែនដី ស្ទើរតែ ៤.០០០ ឆ្នាំ — ខ្ពស់ជាងព្រះវិហារ ឬអគារខ្ពស់ៗណាមួយ រហូតដល់ឆ្នាំ ១៨៨៩។",
    image: cairoImg,
    stampEn: "GIZA · 2560 BCE", stampKh: "ហ្គីហ្សា · បុរាណ",
    accent: "text-orange-700", bg: "bg-orange-50",
    rotate: "-rotate-1",
  },
];

// ════════════════════════════════════════════════════════════════════════════

export default function GlobalCitiesPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-[#fdf6e8] text-stone-800 relative overflow-hidden">
      {/* Subtle paper texture using SVG noise */}
      <svg className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.04] mix-blend-multiply" aria-hidden="true">
        <filter id="gc-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" />
        </filter>
        <rect width="100%" height="100%" filter="url(#gc-noise)" />
      </svg>

      {/* Decorative dashed flight path across page */}
      <svg className="pointer-events-none absolute top-32 left-0 w-full h-[300px] opacity-30" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
        <path d="M -50 200 Q 300 50, 600 150 T 1250 80" stroke="#a16207" strokeWidth="2" strokeDasharray="6 6" fill="none" />
      </svg>

      {/* ────────── Hero ────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-amber-700/30 rounded-full px-4 py-1.5 mb-5 text-xs font-bold text-amber-800 shadow-sm">
          <Plane className="w-3.5 h-3.5" />
          {isKh ? "សៀវភៅធ្វើដំណើរ" : "Travel Journal"}
        </div>

        <h1 className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-stone-900 mb-4 leading-tight ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh ? (
            <>ទីក្រុងធំៗ <span className="text-amber-700">និងតំបន់ល្បីៗ</span> លើពិភពលោក</>
          ) : (
            <>Global Cities <span className="text-amber-700">& Landmarks</span></>
          )}
        </h1>

        <p className={`text-stone-600 max-w-2xl text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "ដាក់សម្ភារធ្វើដំណើរហើយ! យើងកំពុងធ្វើដំណើរជុំវិញពិភពលោក — ពីផ្លូវនៃតូក្យូ ដល់ផ្ទៃទឹកនៅញូវយ៉ក រហូតដល់ស្ដេចនៅព្រះបរមរាជវាំងភ្នំពេញ។"
            : "Pack your bags! We're going around the world — from the streets of Tokyo to the harbour of New York to the king at the Royal Palace in Phnom Penh."}
        </p>

        {/* Decorative passport stamps */}
        <div className="hidden sm:block absolute top-8 right-8 -rotate-12">
          <PassportStamp text="WORLD TOUR" sub="2026" />
        </div>
      </header>

      {/* ────────── Tool 1: Top 5 Most Populated ────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader
          eyebrowEn="The World's Giants"
          eyebrowKh="យក្សនៃពិភពលោក"
          titleEn="Top 5 Most Populated Cities"
          titleKh="ទីក្រុងចំនួន ៥ ដែលមានប្រជាជនច្រើនជាងគេ"
          descEn="These metropolitan areas each hold more people than entire countries. The numbers below count everyone living in the wider urban region — homes, suburbs, satellite towns and all."
          descKh="តំបន់ទីក្រុងធំៗទាំងនេះ ផ្ទុកមនុស្សច្រើនជាងប្រទេសខ្លះទាំងមូល។ លេខខាងក្រោមរាប់មនុស្សគ្រប់រូបដែលរស់នៅក្នុងតំបន់ទីក្រុងធំទូលាយ — ផ្ទះ ជាយក្រុង ទីក្រុងផ្កាយរណប និងគ្រប់ទីកន្លែង។"
          isKh={isKh}
        />

        <ol className="space-y-3">
          {TOP_CITIES.map((c, i) => (
            <RankRow key={c.rankCity} rank={i + 1} city={c} isKh={isKh} />
          ))}
        </ol>

        <p className={`mt-4 text-xs text-stone-500 italic ${isKh ? "font-khmer" : ""}`}>
          {isKh
            ? "* ប្រហាក់ប្រហែលនៃប្រជាជនតំបន់ទីក្រុង (UN World Urbanization Prospects)។"
            : "* Approximate metropolitan-area populations (UN World Urbanization Prospects)."}
        </p>
      </section>

      {/* ────────── Tool 2: Landmark Carousel ────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader
          eyebrowEn="Iconic Landmarks"
          eyebrowKh="តំបន់ល្បីៗ"
          titleEn="Postcards from Around the World"
          titleKh="ប៉ុស្តាល់កាតពីជុំវិញពិភពលោក"
          descEn="Five postcards from five cities. Use the arrows or the dots to flip through them."
          descKh="ប៉ុស្តាល់កាតប្រាំសន្លឹក ពីទីក្រុងប្រាំ។ ប្រើព្រួញ ឬចំណុច ដើម្បីបើកមើល។"
          isKh={isKh}
        />

        <LandmarkCarousel landmarks={LANDMARKS} isKh={isKh} />
      </section>

      {/* ────────── Tool 3: Bar Chart Comparison ────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader
          eyebrowEn="City Statistics"
          eyebrowKh="ស្ថិតិទីក្រុង"
          titleEn="Mega-Cities vs. Phnom Penh"
          titleKh="ទីក្រុងយក្ស ធៀបនឹងភ្នំពេញ"
          descEn="To understand just how big a 'mega-city' is, compare each of the world's giants against our own capital. Phnom Penh has about 2.3 million people — Tokyo has more than 16 times as many."
          descKh="ដើម្បីយល់ថា 'ទីក្រុងយក្ស' ធំប៉ុណ្ណា សូមប្រៀបធៀបយក្សនីមួយៗ ជាមួយរដ្ឋធានីរបស់យើង។ ភ្នំពេញមានប្រជាជនប្រហែល ២,៣ លាននាក់ — តូក្យូមានច្រើនជាង ១៦ ដង។"
          isKh={isKh}
        />

        <PopulationChart isKh={isKh} />
      </section>

      {/* ────────── Closing ────────── */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 text-center">
        <div className="inline-flex items-center gap-2 text-stone-500 text-sm">
          <Compass className="w-4 h-4" />
          <span className={isKh ? "font-khmer" : ""}>
            {isKh
              ? "ពិភពលោកធំ — តែការរៀនធ្វើឱ្យវាតូចជាង។"
              : "The world is big — but learning makes it smaller."}
          </span>
          <Compass className="w-4 h-4" />
        </div>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section header
// ════════════════════════════════════════════════════════════════════════════

function SectionHeader({
  eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh,
}: {
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
}) {
  return (
    <div className="mb-6">
      <div className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-amber-800 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
        <span className="w-6 h-px bg-amber-700/50" />
        {isKh ? eyebrowKh : eyebrowEn}
        <span className="w-6 h-px bg-amber-700/50" />
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-stone-900 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-stone-600 text-sm max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 1: rank rows
// ════════════════════════════════════════════════════════════════════════════

function RankRow({ rank, city, isKh }: { rank: number; city: CityRank; isKh: boolean }) {
  return (
    <li
      className="bg-white border-2 border-stone-200 rounded-2xl p-4 sm:p-5 flex items-center gap-4 sm:gap-6 shadow-sm hover:shadow-md hover:border-amber-300 transition-all"
      data-testid={`city-rank-${rank}`}
    >
      <div className="flex-shrink-0 relative">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-700 text-white flex items-center justify-center font-display font-bold text-xl sm:text-2xl shadow-md">
          #{rank}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h3 className={`font-display font-bold text-lg sm:text-xl text-stone-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? city.cityKh : city.rankCity}
          </h3>
          <span className="text-2xl leading-none" aria-hidden="true">{city.flag}</span>
          <span className={`text-sm text-stone-500 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? city.countryKh : city.country}
          </span>
        </div>
      </div>
      <div className="flex-shrink-0 text-right">
        <div className="flex items-center gap-1.5 justify-end text-stone-500 text-[10px] uppercase tracking-wider font-bold">
          <Users className="w-3 h-3" />
          {isKh ? "ប្រជាជន" : "Population"}
        </div>
        <div className="font-display font-bold text-xl sm:text-2xl text-amber-800">
          {city.populationMillions.toFixed(1)}M
        </div>
      </div>
    </li>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 2: Landmark Carousel (postcard style)
// ════════════════════════════════════════════════════════════════════════════

function LandmarkCarousel({ landmarks, isKh }: { landmarks: Landmark[]; isKh: boolean }) {
  const [index, setIndex] = useState(0);
  const total = landmarks.length;
  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);

  // Keyboard navigation — only when an editable element is NOT focused
  useEffect(() => {
    const isEditable = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el.isContentEditable
      );
    };
    const onKey = (e: KeyboardEvent) => {
      if (isEditable(e.target)) return;
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = landmarks[index];

  return (
    <div className="relative">
      {/* Postcard */}
      <div
        className={`relative ${current.bg} border-4 border-white rounded-2xl shadow-2xl overflow-hidden transition-transform duration-500 ${current.rotate}`}
        style={{ boxShadow: "0 25px 50px -12px rgba(120, 53, 15, 0.25), 0 0 0 1px rgba(0,0,0,0.08)" }}
        aria-live="polite"
      >
        {/* Tape strips at corners */}
        <div className="hidden sm:block absolute -top-2 left-8 w-20 h-6 bg-yellow-100/80 rotate-[-8deg] shadow-sm pointer-events-none" />
        <div className="hidden sm:block absolute -top-2 right-12 w-20 h-6 bg-yellow-100/80 rotate-[6deg] shadow-sm pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
          {/* Photo side */}
          <div className="relative h-72 sm:h-96 lg:h-auto min-h-[20rem] overflow-hidden">
            <img
              src={current.image}
              alt={isKh ? current.landmarkKh : current.landmarkEn}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* City label badge over photo */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg flex items-center gap-2">
              <MapPin className={`w-4 h-4 ${current.accent}`} />
              <div>
                <div className={`font-display font-bold text-sm text-stone-900 leading-tight ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? current.cityKh : current.cityEn}
                </div>
                <div className={`text-[10px] text-stone-500 leading-tight ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? current.countryKh : current.countryEn} {current.flag}
                </div>
              </div>
            </div>
          </div>

          {/* Postcard back side */}
          <div className="relative p-6 sm:p-8 flex flex-col">
            {/* Stamp in corner */}
            <div className="absolute top-4 right-4">
              <PassportStamp text={isKh ? current.stampKh : current.stampEn} sub={current.flag} accent={current.accent} />
            </div>

            <div className={`text-[10px] font-bold tracking-widest uppercase ${current.accent} mb-1 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
              {isKh ? "តំបន់ល្បី" : "Landmark"}
            </div>
            <h3 className={`font-display font-bold text-2xl sm:text-3xl text-stone-900 mb-3 max-w-[75%] ${isKh ? "font-khmer leading-loose" : "leading-tight"}`}>
              {isKh ? current.landmarkKh : current.landmarkEn}
            </h3>

            {/* Handwritten-style divider */}
            <div className="border-t border-stone-300 border-dashed mb-3" />

            <p className={`text-stone-700 text-sm flex-1 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? current.factKh : current.factEn}
            </p>

            <div className={`mt-5 text-xs text-stone-500 italic flex items-center gap-1.5 ${isKh ? "font-khmer" : ""}`}>
              <Sparkles className="w-3 h-3" />
              {isKh ? "បានបោះត្រាដោយ Chouy Sala" : "Stamped by Chouy Sala"}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          onClick={() => go(-1)}
          aria-label={isKh ? "ប៉ុស្តាល់កាតមុន" : "Previous postcard"}
          className="w-11 h-11 rounded-full bg-white border-2 border-stone-300 hover:border-amber-700 hover:bg-amber-50 flex items-center justify-center text-stone-700 hover:text-amber-800 shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          data-testid="carousel-prev"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2" aria-label={isKh ? "ប៉ុស្តាល់កាត" : "Postcards"}>
          {landmarks.map((l, i) => (
            <button
              key={l.id}
              onClick={() => setIndex(i)}
              aria-current={i === index ? "true" : undefined}
              aria-label={isKh ? l.cityKh : l.cityEn}
              className={`transition-all rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                i === index
                  ? "w-8 h-3 bg-amber-700"
                  : "w-3 h-3 bg-stone-300 hover:bg-stone-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          aria-label={isKh ? "ប៉ុស្តាល់កាតបន្ទាប់" : "Next postcard"}
          className="w-11 h-11 rounded-full bg-white border-2 border-stone-300 hover:border-amber-700 hover:bg-amber-50 flex items-center justify-center text-stone-700 hover:text-amber-800 shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          data-testid="carousel-next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <p className={`mt-3 text-center text-xs text-stone-500 ${isKh ? "font-khmer" : ""}`}>
        {isKh
          ? `ប៉ុស្តាល់កាត ${index + 1} ក្នុងចំណោម ${total} • ប្រើគ្រាប់ចុចព្រួញដើម្បីផ្លាស់ប្ដូរ`
          : `Postcard ${index + 1} of ${total} • Use arrow keys to navigate`}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 3: Population bar chart
// ════════════════════════════════════════════════════════════════════════════

function PopulationChart({ isKh }: { isKh: boolean }) {
  const rows = useMemo(() => {
    const all = [
      ...TOP_CITIES.map((c) => ({
        en: c.rankCity, kh: c.cityKh, flag: c.flag, pop: c.populationMillions, isPP: false,
      })),
      { en: "Phnom Penh", kh: "ភ្នំពេញ", flag: "🇰🇭", pop: PHNOM_PENH_POP_MILLIONS, isPP: true },
    ];
    return all.sort((a, b) => b.pop - a.pop);
  }, []);

  const max = Math.max(...rows.map((r) => r.pop));

  return (
    <div className="bg-white border-2 border-stone-200 rounded-2xl p-5 sm:p-7 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-amber-700" />
          <h3 className={`font-display font-bold text-base sm:text-lg text-stone-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ប្រជាជន (លាននាក់ — តំបន់ទីក្រុង)" : "Population (millions — metro area)"}
          </h3>
        </div>
        <div className={`hidden sm:flex items-center gap-3 text-xs ${isKh ? "font-khmer" : ""}`}>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-gradient-to-r from-amber-500 to-orange-700" />
            {isKh ? "ទីក្រុងយក្ស" : "Mega-city"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-gradient-to-r from-emerald-500 to-emerald-700" />
            {isKh ? "ភ្នំពេញ" : "Phnom Penh"}
          </span>
        </div>
      </div>

      <div className="space-y-3.5">
        {rows.map((r) => {
          const widthPct = (r.pop / max) * 100;
          return (
            <div key={r.en} className="grid grid-cols-[7rem_1fr_auto] sm:grid-cols-[10rem_1fr_auto] gap-3 items-center">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-stone-800 min-w-0">
                <span aria-hidden="true">{r.flag}</span>
                <span className={`truncate ${isKh ? "font-khmer" : ""}`}>{isKh ? r.kh : r.en}</span>
              </div>
              <div className="relative h-7 bg-stone-100 rounded-md overflow-hidden">
                <div
                  className={`h-full rounded-md transition-all duration-700 ease-out ${
                    r.isPP
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-700"
                      : "bg-gradient-to-r from-amber-500 to-orange-700"
                  }`}
                  style={{ width: `${widthPct}%` }}
                  role="img"
                  aria-label={`${r.en}: ${r.pop} million`}
                />
              </div>
              <div className={`text-right font-display font-bold text-sm tabular-nums ${r.isPP ? "text-emerald-700" : "text-amber-800"}`}>
                {r.pop.toFixed(1)}M
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight callout */}
      <div className="mt-6 bg-amber-50 border-2 border-amber-200 border-dashed rounded-xl p-4 flex items-start gap-3">
        <Globe2 className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <div className={`text-sm font-bold text-stone-900 mb-1 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "តើធំប៉ុណ្ណា?" : "How big is that, really?"}
          </div>
          <p className={`text-sm text-stone-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? `តូក្យូមានប្រជាជនច្រើនជាងភ្នំពេញប្រហែល ${(TOP_CITIES[0].populationMillions / PHNOM_PENH_POP_MILLIONS).toFixed(0)} ដង។ បើភ្នំពេញគឺជាស្រះមួយ តូក្យូគឺជាបឹងធំ។`
              : `Tokyo has about ${(TOP_CITIES[0].populationMillions / PHNOM_PENH_POP_MILLIONS).toFixed(0)}× as many people as Phnom Penh. If Phnom Penh is a pond, Tokyo is a great lake.`}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Decorative passport stamp
// ════════════════════════════════════════════════════════════════════════════

function PassportStamp({ text, sub, accent = "text-amber-700" }: { text: string; sub?: string; accent?: string }) {
  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center w-24 h-24 rounded-full border-[3px] border-current ${accent} font-display font-bold opacity-80 select-none`}
      style={{
        transform: "rotate(-6deg)",
        boxShadow: "inset 0 0 0 2px currentColor",
        background: "transparent",
      }}
      aria-hidden="true"
    >
      <Stamp className="w-3 h-3 mb-0.5 opacity-70" />
      <div className="text-[9px] tracking-widest leading-none text-center px-1">{text}</div>
      {sub && <div className="text-[9px] mt-0.5 opacity-80">{sub}</div>}
    </div>
  );
}
