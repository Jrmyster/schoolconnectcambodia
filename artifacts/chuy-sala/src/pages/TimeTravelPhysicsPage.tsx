import React, { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Hourglass,
  HelpCircle,
  Activity,
  BookOpen,
  Info,
  Layers,
  Sparkles,
  AlertTriangle,
  Play,
  RotateCcw,
} from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

interface TimeTravelCategory {
  id: "info" | "mind" | "physical_fixed" | "physical_multi";
  nodeNameEn: string;
  nodeNameKh: string;
  titleEn: string;
  titleKh: string;
  ruleEn: string;
  ruleKh: string;
  physicsEn: string;
  physicsKh: string;
  examples: {
    title: string;
    descEn: string;
    descKh: string;
  }[];
}

const categoriesData: Record<string, TimeTravelCategory> = {
  info: {
    id: "info",
    nodeNameEn: "Information Only",
    nodeNameKh: "តែព័ត៌មាន (គ្មានរូបធាតុ)",
    titleEn: "Node A: Information Only (No Matter Moves)",
    titleKh: "ប្រភេទ A៖ ការបញ្ជូនតែព័ត៌មាន (គ្មានការផ្លាស់ទីរូបធាតុ)",
    ruleEn: "Matter remains in the present, but signals, data, or future-visions are transmitted back into the past.",
    ruleKh: "រូបធាតុពិតប្រាកដនៅរក្សាទ្រង់ទ្រាយក្នុងបច្ចុប្បន្ន ប៉ុន្តែសញ្ញា ទិន្នន័យ ឬចក្ខុវិស័យអនាគតត្រូវបានបញ្ជូនទៅអតីតកាល។",
    physicsEn: "Conceptually relies on hypothetical particles like Tachyons (faster-than-light) or quantum entanglement. However, sending information back still creates grandfather paradoxes and violates causality rules.",
    physicsKh: "ជាទ្រឹស្តីពឹងផ្អែកលើភាគល្អិតសន្មតដូចជា Tachyons (លឿនជាងពន្លឺ) ឬបាតុភូតចងភ្ជាប់ខ្វានតូម។ ទោះជាយ៉ាងណា ការបញ្ជូនព័ត៌មានត្រឡប់ក្រោយនៅតែបង្កើតឱ្យមានវិវាទពេលវេលា និងបំពានច្បាប់បុព្វហេតុនិងផល។",
    examples: [
      {
        title: "Paycheck (2003)",
        descEn: "A machine uses a gravitational lens to peer into the future and send 20 items (information clues) to the past as warnings.",
        descKh: "ម៉ាស៊ីនមួយប្រើកញ្ចក់ទំនាញដើម្បីសម្លឹងមើលអនាគត និងបញ្ជូនវត្ថុ ២០ (ជាតម្រុយព័ត៌មាន) ទៅកាន់អតីតកាលដើម្បីជាការព្រមាន។",
      },
      {
        title: "Next (2007)",
        descEn: "The protagonist can see exactly 2 minutes into his own personal future, allowing him to react to events before they occur.",
        descKh: "តួអង្គឯកអាចមើលឃើញច្បាស់លាស់ ២ នាទីទៅក្នុងអនាគតផ្ទាល់ខ្លួនរបស់គាត់ ដែលអនុញ្ញាតឱ្យគាត់មានប្រតិកម្មនឹងព្រឹត្តិការណ៍មុនពេលវាកើតឡើង។",
      },
      {
        title: "Deja Vu (2006)",
        descEn: "Scientists use space-folding wormholes to send a laser beam/message back in time, and eventually attempt physical travel.",
        descKh: "អ្នកវិទ្យាសាស្ត្រប្រើប្រាស់រន្ធដង្កូវបត់លំហដើម្បីបញ្ជូនពន្លឺឡាស៊ែរ ឬសារទៅកាន់អតីតកាល ហើយក្រោយមកព្យាយាមធ្វើដំណើររូបធាតុ។",
      },
    ],
  },
  mind: {
    id: "mind",
    nodeNameEn: "Consciousness",
    nodeNameKh: "ស្មារតី/ចិត្តគំនិត",
    titleEn: "Node B: Consciousness Travel (Mind Moves)",
    titleKh: "ប្រភេទ B៖ ការធ្វើដំណើរស្មារតី (គំនិតផ្លាស់ទី)",
    ruleEn: "Sending memories, awareness, or minds back in time into one's own younger body or inside a repeating time loop.",
    ruleKh: "បញ្ជូនការចងចាំ ស្មារតី ឬចិត្តគំនិតត្រឡប់ទៅអតីតកាល ចូលទៅក្នុងរាងកាយក្មេងជាងមុនរបស់ខ្លួន ឬនៅក្នុងរង្វិលជុំពេលវេលា។",
    physicsEn: "Violates the second law of thermodynamics. While memories are electrochemical brain configurations, copying them back in time into a younger brain violates entropy conservation and mass-energy rules.",
    physicsKh: "បំពានច្បាប់ទីពីរនៃទែម៉ូឌីណាមិច។ ខណៈពេលដែលការចងចាំជាការរៀបចំគីមី-អគ្គិសនីក្នុងខួរក្បាល ការចម្លងពួកវាត្រឡប់ក្រោយទៅក្នុងខួរក្បាលក្មេងជាងមុន បំពានច្បាប់រក្សាអង់ត្រូពី និងម៉ាស់-ថាមពល។",
    examples: [
      {
        title: "The Butterfly Effect (2004)",
        descEn: "The protagonist reads his childhood diaries to project his adult consciousness back into his younger body, altering decisions.",
        descKh: "តួឯកអានសៀវភៅកំណត់ហេតុកុមារភាពរបស់គាត់ ដើម្បីបញ្ជូនស្មារតីមនុស្សពេញវ័យរបស់គាត់ទៅក្នុងរាងកាយក្មេងជាងមុនរបស់គាត់ ដើម្បីកែប្រែការសម្រេចចិត្ត។",
      },
      {
        title: "X-Men: Days of Future Past (2014)",
        descEn: "Wolverine's mind is projected back into his 1973 body to prevent an apocalyptic future, leaving the original timeline altered.",
        descKh: "ស្មារតីរបស់ Wolverine ត្រូវបានបញ្ជូនត្រឡប់ទៅក្នុងរាងកាយឆ្នាំ ១៩៧៣ របស់គាត់ ដើម្បីការពារអនាគតវិនាសកម្ម ដោយបន្សល់ទុកនូវបន្ទាត់ពេលវេលាដែលបានកែប្រែ។",
      },
      {
        title: "Groundhog Day (1993) / Edge of Tomorrow (2014)",
        descEn: "Characters are stuck in repeating loops. Only their memory of previous iterations survives and accumulates knowledge.",
        descKh: "តួអង្គជាប់នៅក្នុងរង្វិលជុំដដែលៗ។ មានតែការចងចាំពីការវិលជុំមុនៗប៉ុណ្ណោះដែលនៅរស់រាន និងប្រមូលផ្តុំចំណេះដឹង។",
      },
    ],
  },
  physical_fixed: {
    id: "physical_fixed",
    nodeNameEn: "Physical (Fixed)",
    nodeNameKh: "រូបធាតុ (បន្ទាត់ថេរ)",
    titleEn: "Node C1: Physical Travel (Fixed Timeline / Novikov Principle)",
    titleKh: "ប្រភេទ C១៖ ផ្លាស់ទីរូបធាតុ (បន្ទាត់ពេលវេលាថេរ / វិធាន Novikov)",
    ruleEn: "Traveling physically to the past. The timeline is fixed; any attempt to change history was already part of history.",
    ruleKh: "ការធ្វើដំណើររូបធាតុទៅកាន់អតីតកាល។ បន្ទាត់ពេលវេលាត្រូវបានកំណត់ថេរ គ្រប់ការព្យាយាមកែប្រែប្រវត្តិសាស្ត្រត្រូវបានសរសេររួចជាស្រេចនៅក្នុងប្រវត្តិសាស្ត្រ។",
    physicsEn: "Formulated by physicist Igor Novikov. Highly consistent with Einstein's General Relativity. If time travel is possible, the probability of paradoxes is zero; timelines are self-consistent loops.",
    physicsKh: "បង្កើតឡើងដោយរូបវិទូ Igor Novikov។ ស្របគ្នាយ៉ាងខ្លាំងនឹងទ្រឹស្តីរ៉េឡាទីវីតេទូទៅរបស់អាញស្តាញ។ ប្រសិនបើការធ្វើដំណើរឆ្លងពេលវេលាអាចទៅរួច ប្រូបាប៊ីលីតេនៃវិវាទពេលវេលាគឺសូន្យ ព្រោះវាជារង្វិលជុំស្របគ្នាដោយខ្លួនឯង។",
    examples: [
      {
        title: "Twelve Monkeys (1995)",
        descEn: "A traveler goes back to stop a global plague, but his actions directly facilitate the virus release. History is unchangeable.",
        descKh: "អ្នកដំណើរម្នាក់ត្រឡប់ទៅក្រោយដើម្បីបញ្ឈប់ជំងឺរាតត្បាតសកល ប៉ុន្តែសកម្មភាពរបស់គាត់បានជួយសម្រួលដល់ការបញ្ចេញវីរុសដោយផ្ទាល់។ ប្រវត្តិសាស្ត្រមិនអាចកែប្រែបានទេ។",
      },
      {
        title: "Tenet (2020)",
        descEn: "Matter travels backward through time by having its entropy inverted. 'What's happened, happened' — the past cannot be altered.",
        descKh: "រូបធាតុធ្វើដំណើរថយក្រោយក្នុងពេលវេលាតាមរយៈការបច្រាសអង់ត្រូពីរបស់វា។ 'អ្វីដែលបានកើតឡើង គឺបានកើតឡើងរួចហើយ' — អតីតកាលមិនអាចផ្លាស់ប្តូរបានទេ។",
      },
      {
        title: "Harry Potter & the Prisoner of Azkaban (2004)",
        descEn: "Harry saves his past self because he has already seen his future self do it. Cause and effect form a seamless loop.",
        descKh: "ហារី ផតធ័រ ជួយសង្គ្រោះខ្លួនឯងក្នុងអតីតកាល ព្រោះគាត់បានឃើញខ្លួនឯងនាពេលអនាគតធ្វើវារួចហើយ។ បុព្វហេតុនិងផលបង្កើតបានជារង្វិលជុំគ្មានចន្លោះ។",
      },
    ],
  },
  physical_multi: {
    id: "physical_multi",
    nodeNameEn: "Physical (Multiverse)",
    nodeNameKh: "រូបធាតុ (ពហុចក្រវាឡ)",
    titleEn: "Node C2: Physical Travel (Dynamic / Multiverse Timeline)",
    titleKh: "ប្រភេទ C២៖ ផ្លាស់ទីរូបធាតុ (ពហុចក្រវាឡ / ផ្លាស់ប្តូរ)",
    ruleEn: "Traveling physically to the past. Interacting with the past alters history or splits off a brand-new parallel reality.",
    ruleKh: "ការធ្វើដំណើររូបធាតុទៅកាន់អតីតកាល។ ការប្រាស្រ័យទាក់ទងនឹងអតីតកាលកែប្រែប្រវត្តិសាស្ត្រ ឬបំបែកចេញជាចក្រវាឡស្របគ្នាថ្មីមួយ។",
    physicsEn: "Draws inspiration from Hugh Everett's 'Many-Worlds Interpretation' of quantum mechanics. Changing the past spawns a new branch, avoiding grandfather paradoxes but requiring infinite energy to create branches.",
    physicsKh: "ដកស្រង់ចេញពី 'ការបកស្រាយពិភពលោកច្រើន' នៃមេកានិចខ្វានតូមរបស់ Hugh Everett។ ការផ្លាស់ប្តូរអតីតកាលបង្កើតឱ្យមានការបែកខ្នែងថ្មី ដែលជៀសវាងវិវាទជីតា ប៉ុន្តែត្រូវការថាមពលគ្មានដែនកំណត់ដើម្បីបង្កើតខ្នែងចក្រវាឡ។",
    examples: [
      {
        title: "Back to the Future (1985)",
        descEn: "Marty McFly alters his parents' first meeting, causing his own existence to start fading until he repairs the timeline.",
        descKh: "Marty McFly កែប្រែការជួបគ្នាដំបូងរបស់ឪពុកម្តាយគាត់ ដែលបណ្តាលឱ្យអត្ថិភាពរបស់គាត់ចាប់ផ្តើមរលាយបាត់ រហូតដល់គាត់កែតម្រូវបន្ទាត់ពេលវេលាឡើងវិញ។",
      },
      {
        title: "Avengers: Endgame (2019)",
        descEn: "The heroes state that traveling to the past cannot change their present. Instead, removing Infinity Stones splits off branching realities.",
        descKh: "ក្រុមវីរបុរសបញ្ជាក់ថាការធ្វើដំណើរទៅអតីតកាលមិនអាចផ្លាស់ប្តូរបច្ចុប្បន្នកាលរបស់ពួកគេឡើយ។ ផ្ទុយទៅវិញ ការយកត្បូង Infinity ចេញនឹងបំបែកបន្ទាត់ពេលវេលាជាខ្នែងផ្សេងៗ។",
      },
      {
        title: "Star Trek (2009)",
        descEn: "A Romulan ship travels back and destroys Vulcan, creating an alternate 'Kelvin Timeline' while the original timeline remains unaffected.",
        descKh: "យាន Romulan ធ្វើដំណើរថយក្រោយនិងបំផ្លាញភព Vulcan បង្កើតបានជា 'បន្ទាត់ពេលវេលា Kelvin' ស្របគ្នា ខណៈពេលដែលបន្ទាត់ពេលវេលាដើមមិនរងផលប៉ះពាល់។",
      },
    ],
  },
};

export default function TimeTravelPhysicsPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // Active category node state
  const [activeCategory, setActiveCategory] = useState<TimeTravelCategory>(categoriesData.physical_fixed);

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Background radial matrix glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#050b18] to-black pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-20 font-sans">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/physics"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer" : "font-semibold"}>
              {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Hourglass className="w-5 h-5 text-indigo-400 animate-pulse" />
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-300 to-purple-500 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Time Travel in Movies: The Physics of Fiction", "ការធ្វើដំណើរឆ្លងពេលវេលាក្នុងភាពយន្ត៖ រូបវិទ្យានៃរឿងប្រឌិត")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block font-mono">
            <span>PHYSICS-TIME-TRAVEL</span>
          </div>
        </div>
      </header>

      {/* Main Grid Content Layout */}
      <main className="flex-grow w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col gap-6">

        {/* 1. Theoretical Disclaimer Banner (Crucial) */}
        <div className="bg-amber-950/20 border-2 border-amber-500/35 rounded-3xl p-6 backdrop-blur-md shadow-xl flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0 mt-1 animate-bounce" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
              {t("PHYSICS DISCLAIMER", "សេចក្តីថ្លែងការណ៍រូបវិទ្យា")}
            </span>
            <p
              className={`text-slate-200 font-bold leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}
              style={{ fontSize: "max(1rem, 1.45vw)" }}
            >
              {t(
                "DISCLAIMER: This page is a fun thought experiment! While forward time travel (via Einsteinian time dilation) is a proven reality of physics, traveling backwards into the past is completely theoretical and currently violates known laws of causality. Hollywood frequently bends or breaks the rules of physics to tell compelling stories!",
                "សេចក្តីថ្លែងការណ៍៖ ទំព័រនេះគឺជាការពិសោធន៍គំនិតដ៏រីករាយមួយ! ខណៈពេលដែលការធ្វើដំណើរទៅមុខក្នុងពេលវេល (តាមរយៈការធ្វើឱ្យពេលវេលាយឺតយ៉ាវរបស់អាល់បឺត អាញស្តាញ) គឺជាការពិតដែលបានបង្ហាញដោយរូបវិទ្យា ការធ្វើដំណើរត្រឡប់ទៅអតីតកាលគឺជាទ្រឹស្តីទាំងស្រុង និងបច្ចុប្បន្នវាផ្ទុយនឹងច្បាប់នៃបុព្វហេតុនិងផល។ ហូលីវូដតែងតែបំប្លែង ឬបំពានច្បាប់រូបវិទ្យាដើម្បីបង្កើតសាច់រឿងដែលគួរឱ្យទាក់ទាញ!"
              )}
            </p>
          </div>
        </div>

        {/* 2. Flowchart Section & Detail Overlay Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-2">
          
          {/* SVG Flowchart (Col Span 7) */}
          <section className="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-indigo-400 font-mono tracking-widest uppercase block mb-1">
                {t("TEMPORAL TAXONOMY FLOWCHART", "គំនូសបំព្រួញចំណាត់ថ្នាក់ពេលវេលា")}
              </span>
              <h3 className={`font-black text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.3rem, 2.3vw)" }}>
                {t("How does Matter & Info Flow?", "តើព័ត៌មាន និងរូបធាតុហូរដោយរបៀបណា?")}
              </h3>
              <p className={`text-slate-400 text-xs mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Click on any node below to load the theoretical physics analysis and discover key cinematic examples.",
                  "ចុចលើប៊ូតុងចំណាត់ថ្នាក់ណាមួយខាងក្រោម ដើម្បីមើលការវិភាគរូបវិទ្យា និងគំរូភាពយន្តជាក់លាក់។"
                )}
              </p>
            </div>

            {/* SVG Interactive Canvas */}
            <div className="w-full bg-slate-950/80 rounded-2xl border border-slate-850 p-4 flex items-center justify-center min-h-[360px] relative overflow-hidden">
              <svg viewBox="0 0 700 400" className="w-full max-w-[620px] h-auto select-none">
                <defs>
                  <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Connector lines / branches */}
                <g stroke="rgba(99, 102, 241, 0.15)" strokeWidth="3" fill="none">
                  {/* Root to Node A */}
                  <path d="M 350,70 Q 250,70 150,150" />
                  {/* Root to Node B */}
                  <line x1="350" y1="70" x2="350" y2="150" />
                  {/* Root to Node C */}
                  <path d="M 350,70 Q 450,70 550,150" />
                  {/* Node C to Sub-Node C1 */}
                  <line x1="550" y1="180" x2="480" y2="280" />
                  {/* Node C to Sub-Node C2 */}
                  <line x1="550" y1="180" x2="620" y2="280" />
                </g>

                {/* ── Root Node: TIME TRAVEL ── */}
                <g transform="translate(350, 50)">
                  <rect x="-80" y="-20" width="160" height="40" rx="10" fill="#0f172a" stroke="#4f46e5" strokeWidth="2.5" />
                  <text x="0" y="5" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    {t("TIME TRAVEL TYPE", "ប្រភេទឆ្លងពេលវេលា")}
                  </text>
                </g>

                {/* ── Node A: Information Only ── */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setActiveCategory(categoriesData.info)}
                  transform="translate(150, 160)"
                >
                  <rect
                    x="-90"
                    y="-25"
                    width="180"
                    height="50"
                    rx="12"
                    fill={activeCategory.id === "info" ? "#1e1b4b" : "#0f172a"}
                    stroke={activeCategory.id === "info" ? "#a855f7" : "#3b0764"}
                    strokeWidth={activeCategory.id === "info" ? "3" : "1.5"}
                    filter={activeCategory.id === "info" ? "url(#neon-glow)" : ""}
                    className="transition-all duration-300"
                  />
                  <text x="0" y="-2" fill={activeCategory.id === "info" ? "#e9d5ff" : "#d8b4fe"} fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    NODE A
                  </text>
                  <text x="0" y="12" fill="#ffffff" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
                    {isKh ? "ព័ត៌មានគីមី (គ្មានរូបធាតុ)" : "Information Only"}
                  </text>
                </g>

                {/* ── Node B: Consciousness ── */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setActiveCategory(categoriesData.mind)}
                  transform="translate(350, 160)"
                >
                  <rect
                    x="-90"
                    y="-25"
                    width="180"
                    height="50"
                    rx="12"
                    fill={activeCategory.id === "mind" ? "#1e1b4b" : "#0f172a"}
                    stroke={activeCategory.id === "mind" ? "#a855f7" : "#3b0764"}
                    strokeWidth={activeCategory.id === "mind" ? "3" : "1.5"}
                    filter={activeCategory.id === "mind" ? "url(#neon-glow)" : ""}
                    className="transition-all duration-300"
                  />
                  <text x="0" y="-2" fill={activeCategory.id === "mind" ? "#e9d5ff" : "#d8b4fe"} fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    NODE B
                  </text>
                  <text x="0" y="12" fill="#ffffff" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
                    {isKh ? "ស្មារតី/ចិត្តគំនិត" : "Consciousness Only"}
                  </text>
                </g>

                {/* ── Node C: Physical Matter ── */}
                <g transform="translate(550, 160)">
                  <rect x="-90" y="-25" width="180" height="50" rx="12" fill="#020617" stroke="#1e293b" strokeWidth="2" />
                  <text x="0" y="-2" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    NODE C
                  </text>
                  <text x="0" y="12" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
                    {isKh ? "រូបធាតុ (រាងកាយ)" : "Physical Matter"}
                  </text>
                </g>

                {/* ── Sub-Node C1: Fixed Timeline ── */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setActiveCategory(categoriesData.physical_fixed)}
                  transform="translate(470, 300)"
                >
                  <rect
                    x="-80"
                    y="-25"
                    width="160"
                    height="50"
                    rx="12"
                    fill={activeCategory.id === "physical_fixed" ? "#1e1b4b" : "#0f172a"}
                    stroke={activeCategory.id === "physical_fixed" ? "#a855f7" : "#3b0764"}
                    strokeWidth={activeCategory.id === "physical_fixed" ? "3" : "1.5"}
                    filter={activeCategory.id === "physical_fixed" ? "url(#neon-glow)" : ""}
                    className="transition-all duration-300"
                  />
                  <text x="0" y="-2" fill={activeCategory.id === "physical_fixed" ? "#e9d5ff" : "#d8b4fe"} fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    NODE C1
                  </text>
                  <text x="0" y="12" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    {isKh ? "បន្ទាត់ថេរ (Novikov)" : "Fixed / Novikov"}
                  </text>
                </g>

                {/* ── Sub-Node C2: Multiverse Timeline ── */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setActiveCategory(categoriesData.physical_multi)}
                  transform="translate(630, 300)"
                >
                  <rect
                    x="-80"
                    y="-25"
                    width="160"
                    height="50"
                    rx="12"
                    fill={activeCategory.id === "physical_multi" ? "#1e1b4b" : "#0f172a"}
                    stroke={activeCategory.id === "physical_multi" ? "#a855f7" : "#3b0764"}
                    strokeWidth={activeCategory.id === "physical_multi" ? "3" : "1.5"}
                    filter={activeCategory.id === "physical_multi" ? "url(#neon-glow)" : ""}
                    className="transition-all duration-300"
                  />
                  <text x="0" y="-2" fill={activeCategory.id === "physical_multi" ? "#e9d5ff" : "#d8b4fe"} fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    NODE C2
                  </text>
                  <text x="0" y="12" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    {isKh ? "ពហុចក្រវាឡ (បែកខ្នែង)" : "Multiverse / Branching"}
                  </text>
                </g>
              </svg>
            </div>
          </section>

          {/* Details Overlay Panel (Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Theoretical Physics Rules Info */}
            <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-xl flex-grow flex flex-col gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-400 font-mono tracking-widest uppercase block mb-1">
                  {t("RULES & COMPATIBILITY", "វិធាននិងលទ្ធភាពរូបវិទ្យា")}
                </span>
                <h3 className={`font-black text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.1rem, 2vw)" }}>
                  {isKh ? activeCategory.titleKh : activeCategory.titleEn}
                </h3>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 flex-grow flex flex-col gap-4">
                
                {/* Core Rule */}
                <div>
                  <span className="text-[10px] text-indigo-300 font-mono block uppercase mb-1">
                    {t("THEORETICAL RULE", "វិធានសម្មតិកម្ម")}
                  </span>
                  <p className={`text-xs text-slate-200 font-semibold leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                    {isKh ? activeCategory.ruleKh : activeCategory.ruleEn}
                  </p>
                </div>

                {/* Physics critique */}
                <div className="border-t border-slate-900 pt-3">
                  <span className="text-[10px] text-purple-400 font-mono block uppercase mb-1">
                    {t("PHYSICS CRITIQUE", "ការវិភាគបែបវិទ្យាសាស្ត្រ")}
                  </span>
                  <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                    {isKh ? activeCategory.physicsKh : activeCategory.physicsEn}
                  </p>
                </div>

              </div>
            </section>

            {/* Cinematic Movie Cards */}
            <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-xl flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-indigo-400" />
                <h3 className={`font-bold text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1rem, 1.8vw)" }}>
                  {t("Cinematic Examples", "ឧទាហរណ៍ក្នុងភាពយន្ត")}
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {activeCategory.examples.map((item, idx) => (
                  <div key={idx} className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 hover:border-indigo-500/30 transition-all flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-200">{item.title}</span>
                    <p className={`text-[11px] text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {isKh ? item.descKh : item.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

        </div>

        {/* 3. Logic Comparison Dashboard */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6 mt-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h3 className={`font-black text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.2rem, 2.2vw)" }}>
              {t("Temporal Logic Comparison Dashboard", "តារាងប្រៀបធៀបតក្កវិជ្ជាពេលវេលា")}
            </h3>
          </div>

          <div className="overflow-x-auto bg-slate-950 rounded-2xl border border-slate-850">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-mono font-bold">
                  <th className="p-4">{t("Travel Type", "ប្រភេទនៃការធ្វើដំណើរ")}</th>
                  <th className="p-4">{t("Timeline Structure", "រចនាសម្ព័ន្ធបន្ទាត់ពេលវេលា")}</th>
                  <th className="p-4">{t("Can You Change the Past?", "តើអាចកែប្រែអតីតកាលបានទេ?")}</th>
                  <th className="p-4">{t("Key Examples", "ឧទាហរណ៍ភាពយន្តល្បីៗ")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-300">
                {/* Row 1: Information */}
                <tr>
                  <td className="p-4 font-bold text-indigo-300">
                    {t("Information Only", "តែព័ត៌មាន (គ្មានរូបធាតុ)")}
                  </td>
                  <td className={`p-4 ${isKh ? "font-khmer" : ""}`}>
                    {t("Single, immutable timeline", "បន្ទាត់ពេលវេលាថេរតែមួយ")}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-amber-950/40 text-amber-400 border border-amber-500/20 font-bold uppercase text-[10px]">
                      {t("No (Loops)", "ទេ (រង្វិលជុំ)")}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-semibold text-[11px]">
                    Paycheck, Deja Vu, Next
                  </td>
                </tr>

                {/* Row 2: Consciousness */}
                <tr>
                  <td className="p-4 font-bold text-indigo-300">
                    {t("Consciousness", "ស្មារតី/ចិត្តគំនិត")}
                  </td>
                  <td className={`p-4 ${isKh ? "font-khmer" : ""}`}>
                    {t("Looping or singular body overwrite", "ការវិលជុំ ឬសរសេរជាន់លើរាងកាយ")}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-green-950/40 text-green-400 border border-green-500/20 font-bold uppercase text-[10px]">
                      {t("Yes (Memories)", "បាទ/ចាស (ការចងចាំ)")}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-semibold text-[11px]">
                    The Butterfly Effect, Edge of Tomorrow
                  </td>
                </tr>

                {/* Row 3: Physical (Fixed) */}
                <tr>
                  <td className="p-4 font-bold text-indigo-300">
                    {t("Physical - Fixed", "រូបធាតុ - បន្ទាត់ថេរ")}
                  </td>
                  <td className={`p-4 ${isKh ? "font-khmer" : ""}`}>
                    {t("Single self-consistent timeline", "បន្ទាត់ពេលវេលាលំនឹងខ្លួនឯង")}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-red-950/40 text-red-400 border border-red-500/20 font-bold uppercase text-[10px]">
                      {t("Absolutely No", "មិនអាចទាល់តែសោះ")}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-semibold text-[11px]">
                    Twelve Monkeys, Tenet, Harry Potter
                  </td>
                </tr>

                {/* Row 4: Physical (Multiverse) */}
                <tr>
                  <td className="p-4 font-bold text-indigo-300">
                    {t("Physical - Multiverse", "រូបធាតុ - ពហុចក្រវាឡ")}
                  </td>
                  <td className={`p-4 ${isKh ? "font-khmer" : ""}`}>
                    {t("Branching parallel universe", "ចក្រវាឡបំបែកស្របគ្នា")}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-green-950/40 text-green-400 border border-green-500/20 font-bold uppercase text-[10px]">
                      {t("Yes (Creates Branch)", "បាទ/ចាស (បង្កើតខ្នែង)")}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-semibold text-[11px]">
                    Back to the Future, Avengers: Endgame
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}
