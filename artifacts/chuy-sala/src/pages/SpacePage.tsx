import { useState, useEffect } from "react";
import { Rocket, Globe, ExternalLink, Star, Telescope, Orbit, AlertCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { GalaxyMap } from "@/components/GalaxyMap";

// ── Types ───────────────────────────────────────────────────────────────────

type ApodData = {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: "image" | "video";
  date: string;
  copyright?: string;
};

// ── Agencies ────────────────────────────────────────────────────────────────

const AGENCIES = [
  {
    id: "nasa",
    name: "NASA",
    nameKh: "ណាសា",
    tagEn: "Exploring the Universe",
    tagKh: "ស្វែងយល់អំពីចក្រវាល",
    descEn:
      "The National Aeronautics and Space Administration leads America's civilian space programme, sending rovers to Mars, telescopes beyond the Solar System, and astronauts to the Moon.",
    descKh:
      "រដ្ឋបាលអវកាស និងការហើរក្នុងអាកាស (NASA) នាំដឹកកម្មវិធីអវកាសសម្រាប់ស៊ីវិលរបស់អាមេរិក ដោយផ្ញើរថយន្ត Rover ទៅដល់ភពដែក 망遠鏡 ហួសប្រព័ន្ធព្រះអាទិត្យ និងអវកាសយានិករទៅខែ។",
    url: "https://www.nasa.gov/",
    gradient: "from-[#0b3d91] to-[#1a6ea8]",
    icon: "🚀",
    countryFlag: "🇺🇸",
  },
  {
    id: "esa",
    name: "ESA",
    nameKh: "អង្គភាពអវកាសអឺរ៉ុប (ESA)",
    tagEn: "International Cooperation",
    tagKh: "កិច្ចសហប្រតិបត្តិការអន្តរជាតិ",
    descEn:
      "The European Space Agency unites 22 nations to explore Earth, our Solar System, and the wider Universe — launching weather satellites, Mars orbiters, and the James Webb Space Telescope.",
    descKh:
      "អង្គភាពអវកាសអឺរ៉ុប (ESA) រួបរួម ២២ ប្រទេសដើម្បីស្វែងយល់ពីផែនដី ប្រព័ន្ធព្រះអាទិត្យ និងចក្រវាល — ដោយបើកដំណើរការ ផ្កាយរណប អាកាសធាតុ អង្គ​ភាព​ត្រួត​ពិនិត្យ​ភព​ដែក និង James Webb Space Telescope។",
    url: "https://www.esa.int/",
    gradient: "from-[#003476] to-[#0055a5]",
    icon: "🌍",
    countryFlag: "🇪🇺",
  },
  {
    id: "jaxa",
    name: "JAXA",
    nameKh: "អង្គភាពស្វែងយល់អវកាសជប៉ុន (JAXA)",
    tagEn: "Excellent Regional Partner",
    tagKh: "ដៃគូតំបន់ល្អឥតខ្ចោះ",
    descEn:
      "Japan's space agency pushes engineering precision to new frontiers — landing spacecraft on asteroids, studying the Sun, and building key modules of the International Space Station.",
    descKh:
      "ទីភ្នាក់ងារអវកាសរបស់ជប៉ុន (JAXA) штовхaє ភាពជាក់លាក់ខាងវិស្វកម្មទៅដល់ព្រំដែនថ្មី — ចុះចតយានអវកាសនៅលើ Asteroid សិក្សាព្រះអាទិត្យ និងសាងសង់ម៉ូឌុលសំខាន់ of the ISS។",
    url: "https://global.jaxa.jp/",
    gradient: "from-[#1a0533] to-[#3b0f6b]",
    icon: "🛸",
    countryFlag: "🇯🇵",
  },
];

// ── Planets ──────────────────────────────────────────────────────────────────

const PLANETS = [
  {
    name: "Mercury",
    nameKh: "ភពស្វ",
    emoji: "⚫",
    color: "text-gray-300",
    ringColor: "border-gray-500/40",
    factEn: "A year on Mercury lasts just 88 Earth days — the fastest orbit in our Solar System.",
    factKh: "មួយឆ្នាំនៅភពស្វ មានត្រឹមតែ ៨៨ ថ្ងៃផែនដី — ការផ្លូវវៀចលឿនបំផុតក្នុងប្រព័ន្ធព្រះអាទិត្យ។",
    orderNum: 1,
  },
  {
    name: "Venus",
    nameKh: "ភពសុក្រ",
    emoji: "🟡",
    color: "text-yellow-300",
    ringColor: "border-yellow-500/40",
    factEn: "Venus is hotter than Mercury despite being farther from the Sun — its thick CO₂ atmosphere traps heat at 465 °C.",
    factKh: "ភពសុក្រក្ដៅជាងភពស្វ ទោះបីនៅឆ្ងាយជាងពីព្រះអាទិត្យ — បរិយាកាស CO₂ ក្រាស់ធ្ងន់ ។ រក្សាកំដៅ ៤៦៥ °C",
    orderNum: 2,
  },
  {
    name: "Earth",
    nameKh: "ភពផែនដី",
    emoji: "🌍",
    color: "text-blue-300",
    ringColor: "border-blue-500/40",
    factEn: "Earth is the only planet in the Solar System known to harbour life — protected by a magnetic field and a life-giving atmosphere.",
    factKh: "ផែនដីជាភពតែមួយគត់ក្នុងប្រព័ន្ធព្រះអាទិត្យ ដែលស្គាល់ថាមានជីវិត — ការពារដោយសង្វាក់ម៉ាញ៉េទិក និងបរិយាកាសផ្ដល់ជីវិត។",
    orderNum: 3,
  },
  {
    name: "Mars",
    nameKh: "ភពដែក",
    emoji: "🔴",
    color: "text-red-400",
    ringColor: "border-red-500/40",
    factEn: "Olympus Mons on Mars is the tallest volcano in the Solar System — nearly 3 times higher than Mount Everest.",
    factKh: "Olympus Mons នៅភពដែក ជាភ្នំភ្លើងខ្ពស់បំផុតក្នុងប្រព័ន្ធព្រះអាទិត្យ — ខ្ពស់ជិត ៣ ដងភ្នំ Everest។",
    orderNum: 4,
  },
  {
    name: "Jupiter",
    nameKh: "ភពព្រហស្បតិ",
    emoji: "🟠",
    color: "text-orange-300",
    ringColor: "border-orange-500/40",
    factEn: "Jupiter's Great Red Spot is a storm that has raged for over 350 years — wider than Earth itself.",
    factKh: "ចំណុចក្រហមមហាភព Jupiter គឺជាព្យុះដែលបានបក់ជាង ៣៥០ ឆ្នាំ — ធំជាងផែនដីទាំងមូល។",
    orderNum: 5,
  },
  {
    name: "Saturn",
    nameKh: "ភពសៅរ",
    emoji: "🪐",
    color: "text-amber-200",
    ringColor: "border-amber-400/40",
    factEn: "Saturn's rings are made mostly of ice chunks ranging from tiny grains to chunks the size of a house.",
    factKh: "ចិញ្ចៀនភពសៅរ ភាគច្រើនធ្វើពីដុំទឹកកក ពីគ្រាប់ខ្សាច់តូចៗ រហូតដល់ដុំធំប្រហែលជាផ្ទះ។",
    orderNum: 6,
  },
  {
    name: "Uranus",
    nameKh: "ភពអ៊ុយរ៉ានុស",
    emoji: "🔵",
    color: "text-cyan-300",
    ringColor: "border-cyan-500/40",
    factEn: "Uranus rotates on its side with an axial tilt of 98° — it essentially rolls around the Sun like a bowling ball.",
    factKh: "ភពអ៊ុយរ៉ានុស វិលម្ខាងជាមួយ axial tilt ៩៨° — វាពិតជា lek​ ជុំព្រះអាទិត្យដូចបាល់ bowling។",
    orderNum: 7,
  },
  {
    name: "Neptune",
    nameKh: "ភពណែបទូន",
    emoji: "💙",
    color: "text-indigo-300",
    ringColor: "border-indigo-500/40",
    factEn: "Neptune has the strongest winds in the Solar System — gusts can reach 2,100 km/h (1,300 mph).",
    factKh: "ភពណែបទូនមានខ្យល់ខ្លាំងបំផុតក្នុងប្រព័ន្ធព្រះអាទិត្យ — ខ្យល់ជំរុញ អាចដល់ ២.១០០ គ.ម./ម៉ោង។",
    orderNum: 8,
  },
];

// ── Component ────────────────────────────────────────────────────────────────

export function SpacePage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [apod, setApod] = useState<ApodData | null>(null);
  const [apodLoading, setApodLoading] = useState(true);
  const [apodError, setApodError] = useState(false);
  const [expandedPlanet, setExpandedPlanet] = useState<number | null>(null);
  const [showFullExplanation, setShowFullExplanation] = useState(false);

  useEffect(() => {
    setApodLoading(true);
    setApodError(false);
    fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
      .then((r) => {
        if (!r.ok) throw new Error("NASA API error");
        return r.json();
      })
      .then((data) => setApod(data))
      .catch(() => setApodError(true))
      .finally(() => setApodLoading(false));
  }, []);

  const togglePlanet = (idx: number) =>
    setExpandedPlanet((prev) => (prev === idx ? null : idx));

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg,#020c1b 0%,#0a1628 40%,#050d1a 100%)" }}>

      {/* ── Starfield overlay ──────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${Math.random() * 2.5 + 0.5}px`,
              height: `${Math.random() * 2.5 + 0.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.1,
              animationDuration: `${Math.random() * 4 + 2}s`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(26,110,168,0.25) 0%, transparent 70%)",
            }}
            aria-hidden
          />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center relative">
            <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 rounded-full px-5 py-2 mb-6 text-sm font-semibold text-white/70 backdrop-blur-sm">
              <Rocket className="w-4 h-4 text-sky-400" />
              {t("Cosmos & Discovery", "ចក្រវាល និងការស្វែងយល់")}
            </div>

            <h1 className={`font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                <>Explore the <span className="text-sky-400">Universe</span></>,
                <>ស្វែងយល់<span className="text-sky-400">ចក្រវាល</span></>
              )}
            </h1>
            <p className={`text-white/55 max-w-2xl mx-auto leading-relaxed ${kh ? "font-khmer text-base leading-loose" : "text-base"}`}>
              {t(
                "From the eight planets of our Solar System to the edge of the observable Universe — science is the greatest adventure of all.",
                "ពីភព ៨ ក្នុងប្រព័ន្ធព្រះអាទិត្យ រហូតដល់ចុងទ្រង់ទ្រាយចក្រវាល — វិទ្យាសាស្ត្រជាការ冒険ធំបំផុតក្នុងជីវិត។"
              )}
            </p>
          </div>
        </div>

        {/* ── NASA APOD ─────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <SectionLabel icon={<Star className="w-3.5 h-3.5" />} label={t("NASA Picture of the Day", "រូបភាព NASA ប្រចាំថ្ងៃ")} kh={kh} />

          <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
            {apodLoading && (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/50">
                <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
                <span className={`text-sm ${kh ? "font-khmer" : ""}`}>
                  {t("Fetching today's image from NASA…", "កំពុងទាញយករូបភាពថ្ងៃនេះពី NASA…")}
                </span>
              </div>
            )}

            {apodError && !apodLoading && (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-white/50 px-6 text-center">
                <AlertCircle className="w-8 h-8 text-amber-400" />
                <p className={`text-sm max-w-sm ${kh ? "font-khmer" : ""}`}>
                  {t(
                    "Unable to load today's NASA image. You can visit the APOD gallery directly at nasa.gov.",
                    "មិនអាចផ្ទុករូបភាព NASA ថ្ងៃនេះ។ អ្នកអាចចូលទស្សនា APOD gallery ផ្ទាល់នៅ nasa.gov។"
                  )}
                </p>
                <a
                  href="https://apod.nasa.gov/apod/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-sky-400 text-sm font-semibold hover:text-sky-300 transition-colors"
                >
                  {t("Open APOD Gallery", "បើក APOD Gallery")}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {apod && !apodLoading && (
              <>
                {apod.media_type === "image" ? (
                  <a
                    href={apod.hdurl ?? apod.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group relative"
                  >
                    <img
                      src={apod.url}
                      alt={apod.title}
                      className="w-full max-h-[520px] object-cover group-hover:brightness-90 transition-[filter] duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-white/80 text-xs font-semibold bg-black/40 rounded-full px-3 py-1.5 backdrop-blur-sm">
                      <ExternalLink className="w-3 h-3" />
                      {t("View HD", "មើល HD")}
                    </div>
                  </a>
                ) : (
                  <div className="relative w-full aspect-video bg-black">
                    <iframe
                      src={apod.url}
                      title={apod.title}
                      className="absolute inset-0 w-full h-full"
                      allowFullScreen
                    />
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <h2 className="font-display font-bold text-white text-xl sm:text-2xl leading-snug">
                      {apod.title}
                    </h2>
                    <span className="flex-shrink-0 text-xs text-white/40 font-mono mt-1">{apod.date}</span>
                  </div>
                  {apod.copyright && (
                    <p className="text-white/35 text-xs mb-3">
                      {t("Image credit:", "ហត្ថប័ណ្ណ:")} {apod.copyright}
                    </p>
                  )}
                  {kh && (
                    <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-[#c9a227]/30 bg-[#c9a227]/8 px-4 py-3">
                      <Star className="w-4 h-4 text-[#e8c547] flex-shrink-0 mt-0.5" fill="currentColor" />
                      <p className="font-khmer text-sm leading-loose text-[#e8c547]/90">
                        សូមអភ័យទោស៖ ការពិពណ៌នាលម្អិតសម្រាប់រូបភាពរបស់ NASA នៅថ្ងៃនេះមានតែជាភាសាអង់គ្លេសប៉ុណ្ណោះ។ នេះជាឱកាសដ៏ល្អសម្រាប់អ្នកក្នុងការហាត់អានភាសាអង់គ្លេស និងស្វែងយល់ពីអាថ៌កំបាំងនៃចក្រវាលក្នុងពេលតែមួយ!
                      </p>
                    </div>
                  )}
                  <p className={`text-white/65 text-sm leading-relaxed ${!showFullExplanation ? "line-clamp-4" : ""}`}>
                    {apod.explanation}
                  </p>
                  <button
                    onClick={() => setShowFullExplanation((v) => !v)}
                    className={`mt-2 text-xs text-sky-400 hover:text-sky-300 font-semibold transition-colors flex items-center gap-1 ${kh ? "font-khmer" : ""}`}
                  >
                    {showFullExplanation
                      ? <><ChevronUp className="w-3.5 h-3.5" />{t("Show less", "បង្ហាញតិច")}</>
                      : <><ChevronDown className="w-3.5 h-3.5" />{t("Read full description", "អានការពិពណ៌នាពេញ")}</>
                    }
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* ── Mission Cards ─────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <SectionLabel icon={<Rocket className="w-3.5 h-3.5" />} label={t("Space Agencies", "ទីភ្នាក់ងារអវកាស")} kh={kh} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {AGENCIES.map((agency) => (
              <a
                key={agency.id}
                href={agency.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-sky-500/40 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(56,189,248,0.15)] transition-all duration-200"
              >
                <div className={`bg-gradient-to-br ${agency.gradient} px-6 pt-8 pb-6 flex flex-col items-center text-center gap-3`}>
                  <span className="text-4xl" role="img" aria-label={agency.name}>{agency.icon}</span>
                  <div>
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <span className="text-lg">{agency.countryFlag}</span>
                      <h3 className="font-display font-bold text-white text-2xl">{agency.name}</h3>
                    </div>
                    <span className="inline-block bg-white/15 text-white/80 text-xs font-semibold rounded-full px-3 py-1">
                      {kh ? agency.tagKh : agency.tagEn}
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col p-5 gap-4">
                  <p className={`text-white/60 text-sm leading-relaxed flex-1 ${kh ? "font-khmer leading-loose" : ""}`}>
                    {kh ? agency.descKh : agency.descEn}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className={`text-sky-400 text-xs font-semibold ${kh ? "font-khmer" : ""}`}>
                      {t("Visit website", "ចូលទស្សនាគេហទំព័រ")}
                    </span>
                    <ExternalLink className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Solar System ──────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <SectionLabel icon={<Orbit className="w-3.5 h-3.5" />} label={t("The Solar System", "ប្រព័ន្ធព្រះអាទិត្យ")} kh={kh} />

          <p className={`text-white/45 text-sm mb-6 ${kh ? "font-khmer" : ""}`}>
            {t(
              "Tap any planet to reveal a fast fact.",
              "ចុចលើភពណាមួយ ដើម្បីស្វែងយល់ពី Fast Fact ។"
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PLANETS.map((planet, idx) => {
              const isOpen = expandedPlanet === idx;
              return (
                <button
                  key={planet.name}
                  onClick={() => togglePlanet(idx)}
                  className={`w-full text-left rounded-2xl border bg-white/5 backdrop-blur-sm p-4 transition-all duration-200
                    hover:bg-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                    ${isOpen ? "border-sky-500/40 bg-white/10 shadow-[0_0_30px_rgba(56,189,248,0.10)]" : `border-white/10 ${planet.ringColor}`}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl flex-shrink-0" role="img" aria-label={planet.name}>
                      {planet.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className={`font-display font-bold text-white text-base ${kh ? "font-khmer" : ""}`}>
                          {kh ? planet.nameKh : planet.name}
                        </span>
                        {kh && (
                          <span className="text-white/30 text-xs font-sans">{planet.name}</span>
                        )}
                        <span className="ml-auto flex-shrink-0 text-white/25 text-xs font-mono">
                          #{planet.orderNum}
                        </span>
                      </div>
                      {isOpen && (
                        <p className={`mt-2 text-sm leading-relaxed ${planet.color} ${kh ? "font-khmer leading-loose" : ""}`}>
                          {kh ? planet.factKh : planet.factEn}
                        </p>
                      )}
                    </div>
                    <span className="text-white/30 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Milky Way Galaxy Map ──────────────────────────────────────── */}
        <GalaxyMap />

        {/* ── Explore More footer strip ──────────────────────────────────── */}
        <div className="border-t border-white/8 bg-white/3">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
            <Telescope className="w-8 h-8 text-sky-400/60 mx-auto mb-3" />
            <p className={`text-white/35 text-sm max-w-md mx-auto ${kh ? "font-khmer" : ""}`}>
              {t(
                "The Universe is under no obligation to make sense to you — but curiosity is always free.",
                "ចក្រវាលមិនមានកាតព្វកិច្ចផ្ដល់ន័យដល់អ្នក — ប៉ុន្តែការចង់ដឹងចង់ឃើញ តែងតែឥតគិតថ្លៃ។"
              )}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ icon, label, kh }: { icon: React.ReactNode; label: React.ReactNode; kh: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-sky-400/15 border border-sky-400/25 flex items-center justify-center text-sky-400">
          {icon}
        </div>
        <span className={`text-xs font-bold tracking-widest text-sky-400 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
          {label}
        </span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-sky-400/20 to-transparent" />
    </div>
  );
}
