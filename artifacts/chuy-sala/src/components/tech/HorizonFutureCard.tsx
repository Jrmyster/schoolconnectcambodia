import { useEffect, useMemo, useState } from "react";
import {
  Atom, Brain, Leaf, Sparkles, Send, Lightbulb, Stars, Dna, Sun,
  Heart, FlaskConical, Telescope, Infinity as InfinityIcon, ChevronRight, Quote,
} from "lucide-react";
import type { ComponentType } from "react";
import { useLanguageStore } from "@/store/use-language";

type Idea = { id: string; name: string; place: string; en: string; kh?: string; seed?: boolean };

const SEED_IDEAS: Idea[] = [
  { id: "s1", name: "Sopheak", place: "Battambang",   en: "A computer that finds clean water under the ground for villages.", kh: "កុំព្យូទ័រដែលរកទឹកស្អាតនៅក្រោមដី សម្រាប់ភូមិ។", seed: true },
  { id: "s2", name: "Linda",   place: "Phnom Penh",   en: "An AI that translates Khmer to every language instantly so no student is left out.", kh: "AI ដែលបកប្រែខ្មែរទៅគ្រប់ភាសាភ្លាមៗ ដើម្បីកុំឱ្យសិស្សណាម្នាក់ត្រូវបានទុកចោល។", seed: true },
  { id: "s3", name: "Dara",    place: "Siem Reap",    en: "A machine that can grow rice using salt water from the sea.", kh: "ម៉ាស៊ីនដែលអាចដាំស្រូវដោយប្រើទឹកសមុទ្រ។", seed: true },
];

/* ──────────────────────────────────────────────────────────────────── */

export function HorizonFutureCard() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [ideas, setIdeas] = useState<Idea[]>(SEED_IDEAS);
  const [draft, setDraft] = useState("");
  const [name, setName] = useState("");
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const id = `u${Date.now()}`;
    const idea: Idea = {
      id,
      name: name.trim() || (kh ? "សិស្សអនាមិក" : "Anonymous student"),
      place: kh ? "កម្ពុជា" : "Cambodia",
      en: text,
    };
    setIdeas((prev) => [idea, ...prev]);
    setDraft("");
    setName("");
    setJustAddedId(id);
    setTimeout(() => setJustAddedId(null), 2500);
  }

  return (
    <div className="relative rounded-3xl overflow-hidden border-2 border-fuchsia-400/40 shadow-2xl">
      {/* Animated background layer */}
      <FuturisticBackground />

      <div className="relative">
        {/* HEADER */}
        <div className="px-5 sm:px-7 py-6 backdrop-blur-md bg-white/5 border-b border-white/10">
          <div className="flex items-start gap-4">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border border-fuchsia-300/40 flex items-center justify-center flex-shrink-0 backdrop-blur-md">
              <Telescope className="w-7 h-7 sm:w-8 sm:h-8 text-fuchsia-200" />
              <span aria-hidden className="absolute inset-0 rounded-2xl pulse-glow pointer-events-none" />
            </div>
            <div className="min-w-0 flex-1">
              <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-fuchsia-300 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{kh ? "សម័យទី ៧" : "Era VII"}</span>
                <span className="opacity-50">/</span>
                <span>{kh ? "ការមើលឃើញអនាគត" : "Future Sight"}</span>
              </div>
              <h3 className={`font-display text-2xl sm:text-3xl font-extrabold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
                <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">
                  {kh ? "ផ្ទៃមេឃ៖ ឆ្នាំ ២០៥០ និងលើសពីនេះ" : "The Horizon: 2050 & Beyond"}
                </span>
              </h3>
              {kh && <div className="text-xs italic text-fuchsia-200/70 mt-1">The Horizon: 2050 &amp; Beyond</div>}
              <p className={`mt-2 text-sm text-white/80 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose text-base" : ""}`}>
                {kh
                  ? "កុំព្យូទ័រកំពុងផ្លាស់ប្ដូរពីដែក និងសារធាតុឆេះ ទៅជាកាំរស្មី អូដ្ឋាតូម និងជីវវិទ្យា។ នេះគឺជាបី ការផ្លាស់ប្ដូរធំបំផុតដែលអ្នកនឹងឃើញ — និងការអញ្ជើញរបស់អ្នក ដើម្បីជួយរូបរាងវា។"
                  : "Computers are shifting from metal and silicon to light, atoms, and biology. Here are the three biggest leaps you'll witness — and an invitation for YOU to help shape what comes next."}
              </p>
            </div>
          </div>
        </div>

        {/* THREE FUTURE PILLARS */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-5 p-5 sm:p-6">
          {/* 1. Quantum */}
          <PillarCard
            kh={kh}
            accent="cyan"
            icon={Atom}
            kickerEn="Pillar 01" kickerKh="សសរទី ០១"
            titleEn="Quantum Computing"
            titleKh="កុំព្យូទ័រខ្វានតូម"
            taglineEn="Bits → Qubits"
            taglineKh="Bits → Qubits"
          >
            {/* Bit vs Qubit visualization */}
            <div className="grid grid-cols-2 gap-3 my-3">
              {/* Classical bit */}
              <div className="rounded-xl bg-white/5 border border-white/15 backdrop-blur-md p-3 text-center">
                <div className={`text-[9px] font-mono uppercase tracking-widest text-white/50 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                  {kh ? "សព្វថ្ងៃ • Bit" : "Today • Bit"}
                </div>
                <div className="font-mono text-3xl font-black text-white">
                  0 <span className="text-white/30 mx-1">/</span> 1
                </div>
                <div className={`mt-1.5 text-[10px] text-white/60 ${kh ? "font-khmer text-xs" : ""}`}>
                  {kh ? "មួយក្នុងពេលតែមួយ" : "One at a time"}
                </div>
              </div>
              {/* Qubit */}
              <div className="relative rounded-xl border-2 border-cyan-300/60 backdrop-blur-md p-3 text-center overflow-hidden"
                   style={{ background: "radial-gradient(circle at center, rgba(34,211,238,0.35), rgba(168,85,247,0.15) 60%, transparent)" }}>
                <span aria-hidden className="absolute inset-0 qubit-aura pointer-events-none" />
                <div className={`relative text-[9px] font-mono uppercase tracking-widest text-cyan-200 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                  {kh ? "ឆ្នាំ ២០៥០ • Qubit" : "2050 • Qubit"}
                </div>
                <div className="relative font-mono text-3xl font-black text-white">
                  <span className="qubit-flicker">0</span>
                  <span className="text-cyan-300 mx-1">&amp;</span>
                  <span className="qubit-flicker" style={{ animationDelay: "0.4s" }}>1</span>
                </div>
                <div className={`relative mt-1.5 text-[10px] text-cyan-100 ${kh ? "font-khmer text-xs" : ""}`}>
                  {kh ? "ទាំងពីរ ក្នុងពេលតែមួយ!" : "BOTH at the same time!"}
                </div>
              </div>
            </div>

            <p className={`text-sm text-white/85 leading-relaxed ${kh ? "font-khmer leading-loose text-base" : ""}`}>
              {kh
                ? "បច្ចុប្បន្ន​នេះ កុំព្យូទ័រគិតមួយជំហានម្ដងៗ។ កុំព្យូទ័រខ្វានតូមអាចសាកល្បងផ្លូវ រាប់លាន ក្នុងពេលតែមួយ ដោយប្រើច្បាប់របស់អណូអូដ្ឋាតូម។"
                : "Today's computers think one step at a time. Quantum computers can try millions of paths at once, using the strange rules of atoms."}
            </p>
            {kh && <p className="mt-1 text-[11px] italic text-white/50">Quantum computers try millions of paths at once.</p>}

            {/* Benefit callout */}
            <div className="mt-3 rounded-lg bg-cyan-500/10 border border-cyan-300/40 p-3">
              <div className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-cyan-200 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <FlaskConical className="w-3 h-3" /> {kh ? "ផលប្រយោជន៍" : "The Benefit"}
              </div>
              <p className={`text-sm text-white font-bold leading-snug ${kh ? "font-khmer leading-loose text-base" : ""}`}>
                {kh
                  ? "បញ្ហាឱសថ និងអាកាសធាតុ ដែលត្រូវការ រាប់លានឆ្នាំ សម្រាប់កុំព្យូទ័រសព្វថ្ងៃ — អាច​ដោះស្រាយ​ក្នុងវិនាទីប៉ុណ្ណោះ។"
                  : "Medicine and climate problems that would take today's computers MILLIONS OF YEARS — solved in seconds."}
              </p>
            </div>
          </PillarCard>

          {/* 2. Brain-Computer Interfaces */}
          <PillarCard
            kh={kh}
            accent="fuchsia"
            icon={Brain}
            kickerEn="Pillar 02" kickerKh="សសរទី ០២"
            titleEn="Brain-Computer Interfaces"
            titleKh="ចំណុចប្រទាក់ខួរក្បាល និងកុំព្យូទ័រ"
            taglineEn="Think → Click"
            taglineKh="គិត → ចុច"
          >
            {/* Brain ↔ Chip illustration */}
            <BrainChipIllustration kh={kh} />

            <p className={`mt-3 text-sm text-white/85 leading-relaxed ${kh ? "font-khmer leading-loose text-base" : ""}`}>
              {kh
                ? "បច្ចេកវិទ្យា «Neural-Link» ភ្ជាប់ខួរក្បាលរបស់អ្នកដោយផ្ទាល់ទៅកុំព្យូទ័រ។ ថ្ងៃណាមួយ អ្នកអាចបញ្ជាកុំព្យូទ័រ — ដោយគ្រាន់តែគិត។"
                : "'Neural-Link' technology connects your brain directly to a computer. One day, you might control devices just by thinking."}
            </p>
            {kh && <p className="mt-1 text-[11px] italic text-white/50">Control computers just by thinking.</p>}

            {/* Compassion callout */}
            <div className="mt-3 rounded-lg bg-fuchsia-500/10 border border-fuchsia-300/40 p-3">
              <div className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-fuchsia-200 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Heart className="w-3 h-3" /> {kh ? "សារសម្រាប់មនុស្សជាតិ" : "Why It Matters"}
              </div>
              <p className={`text-sm text-white font-bold leading-snug ${kh ? "font-khmer leading-loose text-base" : ""}`}>
                {kh
                  ? "នេះអាចជួយឱ្យមនុស្ស ដែលមិនអាចផ្លាស់ទីខ្លួន — ដើរ ឬនិយាយ បានវិញ។"
                  : "This could help people who cannot move their bodies to walk or talk again."}
              </p>
            </div>
          </PillarCard>

          {/* 3. Sustainable / Green Computing */}
          <PillarCard
            kh={kh}
            accent="emerald"
            icon={Leaf}
            kickerEn="Pillar 03" kickerKh="សសរទី ០៣"
            titleEn="Sustainable Computing"
            titleKh="បច្ចេកវិទ្យាបៃតង"
            taglineEn="Silicon → Biology + Light"
            taglineKh="ស៊ីលីកុន → ជីវវិទ្យា + ពន្លឺ"
          >
            <div className="grid grid-cols-2 gap-2 my-3">
              {/* DNA */}
              <div className="rounded-xl bg-white/5 border border-emerald-300/30 backdrop-blur-md p-3 text-center">
                <div className="flex justify-center mb-1.5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-400/10 border border-emerald-300/50 flex items-center justify-center">
                    <Dna className="w-5 h-5 text-emerald-200 dna-spin" />
                  </div>
                </div>
                <div className={`text-[10px] font-mono uppercase tracking-widest text-emerald-200 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                  {kh ? "អង្គផ្ទុក DNA" : "DNA Storage"}
                </div>
                <div className={`mt-1 text-xs text-white/80 leading-snug ${kh ? "font-khmer text-sm leading-loose" : ""}`}>
                  {kh ? "១ ក្រាម = ២១៥ លាន GB" : "1 gram = 215 million GB"}
                </div>
              </div>
              {/* Solar */}
              <div className="rounded-xl bg-white/5 border border-amber-300/30 backdrop-blur-md p-3 text-center">
                <div className="flex justify-center mb-1.5">
                  <div className="relative w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-300/50 flex items-center justify-center">
                    <Sun className="w-5 h-5 text-amber-200 sun-spin" />
                  </div>
                </div>
                <div className={`text-[10px] font-mono uppercase tracking-widest text-amber-200 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                  {kh ? "ដំណើរការដោយពន្លឺ" : "Light-Powered"}
                </div>
                <div className={`mt-1 text-xs text-white/80 leading-snug ${kh ? "font-khmer text-sm leading-loose" : ""}`}>
                  {kh ? "សូន្យកាបូន សូន្យសំរាម" : "Zero carbon, zero waste"}
                </div>
              </div>
            </div>

            <p className={`text-sm text-white/85 leading-relaxed ${kh ? "font-khmer leading-loose text-base" : ""}`}>
              {kh
                ? "អ្នកវិទ្យាសាស្ត្រកំពុងរៀនរក្សាទុក រូបថត ភ្លេង និងវីដេអូ ក្នុងម៉ូលេគុល DNA — ហើយរត់ឧបករណ៍ដោយពន្លឺថ្ងៃ ឬពន្លឺឡាស៊ែរ​ផ្ទាល់។ កុំព្យូទ័រដែលជីវិតរស់ និងអាចបង្កើនឡើងដោយខ្លួនឯង។"
                : "Scientists are learning to store photos, music, and videos inside DNA molecules — and run devices on sunlight or laser light directly. Computers that are alive, and can grow themselves."}
            </p>
            {kh && <p className="mt-1 text-[11px] italic text-white/50">Computers that are alive, powered by light.</p>}

            <div className="mt-3 rounded-lg bg-emerald-500/10 border border-emerald-300/40 p-3">
              <div className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-200 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Leaf className="w-3 h-3" /> {kh ? "ផលប្រយោជន៍" : "The Benefit"}
              </div>
              <p className={`text-sm text-white font-bold leading-snug ${kh ? "font-khmer leading-loose text-base" : ""}`}>
                {kh
                  ? "ផែនដី​ទទួលបាន​ការ​សម្រាក — ខណៈដែលបច្ចេកវិទ្យានៅតែលូតលាស់។"
                  : "Earth gets a break — while technology keeps growing."}
              </p>
            </div>
          </PillarCard>
        </div>

        {/* FUTURE PREDICTOR QUIZ */}
        <div className="px-5 sm:px-7 py-6 backdrop-blur-md bg-white/5 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-fuchsia-500/15 border border-fuchsia-300/50 flex items-center justify-center text-fuchsia-200">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-[10px] font-mono uppercase tracking-[0.25em] text-fuchsia-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {kh ? "ការប្រកួត" : "Interactive"}
              </div>
              <h4 className={`font-display text-lg sm:text-xl font-bold text-white leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
                {kh ? "ទស្សន៍ទាយអនាគត" : "The Future-Predictor"}
                {kh && <span className="ml-2 text-sm text-fuchsia-200/70 font-sans font-normal">(Future-Predictor)</span>}
              </h4>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md p-4 sm:p-5">
            <p className={`text-base sm:text-lg font-bold text-white leading-snug ${kh ? "font-khmer leading-loose text-lg sm:text-xl" : ""}`}>
              {kh
                ? "តើ​អ្នកចង់ឱ្យកុំព្យូទ័រឆ្នាំ ២០៥០ ដោះស្រាយបញ្ហាអ្វី?"
                : "What problem do you want a 2050 computer to solve?"}
            </p>
            {kh && <p className="text-xs italic text-white/50 mt-1">What problem do you want a 2050 computer to solve?</p>}

            <div className={`mt-2 flex flex-wrap gap-1.5 text-[11px] ${kh ? "font-khmer text-xs" : ""}`}>
              {[
                { en: "Curing diseases", kh: "ព្យាបាលជំងឺ" },
                { en: "Cleaning the ocean", kh: "សម្អាតមហាសមុទ្រ" },
                { en: "Growing food in the desert", kh: "ដាំអាហារនៅវាលខ្សាច់" },
                { en: "Helping every child learn", kh: "ជួយកុមារគ្រប់រូបឱ្យរៀន" },
              ].map((s, i) => (
                <button key={i} type="button"
                        onClick={() => setDraft(kh ? s.kh : s.en)}
                        className="px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-white/80 hover:bg-fuchsia-500/20 hover:border-fuchsia-300/60 hover:text-white transition">
                  + {kh ? s.kh : s.en}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="mt-3 grid sm:grid-cols-[1fr_auto] gap-2">
              <div className="flex flex-col gap-2">
                <input
                  type="text" maxLength={40}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={kh ? "ឈ្មោះរបស់អ្នក (ស្រេចចិត្ត)" : "Your name (optional)"}
                  className={`w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60 focus:border-fuchsia-300 ${kh ? "font-khmer" : ""}`}
                />
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={2}
                  maxLength={240}
                  placeholder={kh
                    ? "បញ្ចូលគំនិតរបស់អ្នកនៅទីនេះ…"
                    : "Type your idea here…"}
                  className={`w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60 focus:border-fuchsia-300 resize-none ${kh ? "font-khmer leading-loose text-base" : ""}`}
                />
              </div>
              <button type="submit" disabled={!draft.trim()}
                      className={`self-end inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-bold shadow-lg shadow-fuchsia-500/30 hover:shadow-fuchsia-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition ${kh ? "font-khmer" : ""}`}>
                <Send className="w-4 h-4" />
                {kh ? "បង្ហោះ" : "Post Idea"}
              </button>
            </form>
            <div className={`mt-1.5 text-[11px] text-white/50 text-right ${kh ? "font-khmer text-xs" : ""}`}>
              {draft.length} / 240
            </div>
          </div>

          {/* WALL OF FUTURE IDEAS */}
          <div className="mt-5">
            <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-200 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              <Stars className="w-3.5 h-3.5" />
              {kh ? "ជញ្ជាំងគំនិតអនាគត" : "Wall of Future Ideas"}
              <span className="text-white/40 ml-1">• {ideas.length}</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ideas.map((idea) => (
                <IdeaSticky key={idea.id} idea={idea} kh={kh} highlight={idea.id === justAddedId} />
              ))}
            </div>
          </div>
        </div>

        {/* CLOSING TAGLINE */}
        <div className="relative px-5 sm:px-7 py-6 border-t border-white/10 backdrop-blur-md bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-amber-500/10 text-center">
          <Quote className="w-7 h-7 text-fuchsia-300 mx-auto mb-2 opacity-70" />
          <p className={`max-w-2xl mx-auto font-display text-base sm:text-lg font-bold leading-snug text-white ${kh ? "font-khmer leading-loose text-lg sm:text-xl" : ""}`}>
            {kh
              ? "អនាគតមិនមែនជាកន្លែងដែលយើងទៅទេ — វាជាកន្លែងដែលយើង បង្កើត។ ហើយ អ្នក គឺជាអ្នកបង្កើត។"
              : "The future isn't a place we go — it's a place we BUILD. And YOU are the builder."}
          </p>
          {kh && <p className="mt-2 text-xs italic text-white/50">The future isn't a place we go — it's a place we BUILD.</p>}
          <div className="mt-3 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-fuchsia-200/80">
            <InfinityIcon className="w-3.5 h-3.5" />
            <span>{kh ? "សួស្ដី ឆ្នាំ ២០៥០" : "Hello, 2050"}</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes float-up {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          15%  { opacity: 0.8; }
          85%  { opacity: 0.8; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        @keyframes pulse-glow-anim {
          0%, 100% { box-shadow: 0 0 0 0 rgba(217, 70, 239, 0.5); }
          50%      { box-shadow: 0 0 28px 6px rgba(217, 70, 239, 0.55); }
        }
        .pulse-glow { animation: pulse-glow-anim 2.6s ease-in-out infinite; border-radius: inherit; }
        @keyframes qubit-flicker {
          0%, 100% { opacity: 1; text-shadow: 0 0 8px #22d3ee, 0 0 16px #22d3ee; }
          50%      { opacity: 0.4; text-shadow: 0 0 4px #a855f7, 0 0 12px #a855f7; }
        }
        .qubit-flicker { animation: qubit-flicker 1.6s ease-in-out infinite; display: inline-block; }
        @keyframes qubit-aura-anim {
          0%, 100% { background: radial-gradient(circle at 30% 30%, rgba(34,211,238,0.30), transparent 60%); }
          50%      { background: radial-gradient(circle at 70% 70%, rgba(168,85,247,0.40), transparent 60%); }
        }
        .qubit-aura { animation: qubit-aura-anim 3.2s ease-in-out infinite; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .dna-spin { animation: spin-slow 9s linear infinite; }
        .sun-spin { animation: spin-slow 14s linear infinite; }
        @keyframes neural-pulse {
          0%, 100% { stroke-dashoffset: 0; }
          50%      { stroke-dashoffset: -20; }
        }
        .neural-line { stroke-dasharray: 4 4; animation: neural-pulse 2s linear infinite; }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(40px, -30px) scale(1.1); }
          66%      { transform: translate(-30px, 20px) scale(0.95); }
        }
        .blob-a { animation: blob 18s ease-in-out infinite; }
        .blob-b { animation: blob 22s ease-in-out infinite reverse; }
        @media (prefers-reduced-motion: reduce) {
          .pulse-glow, .qubit-flicker, .qubit-aura, .dna-spin, .sun-spin, .neural-line, .blob-a, .blob-b, .float-particle {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function FuturisticBackground() {
  // Memoize particle positions so they don't re-randomize on each render
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 14 + Math.random() * 16,
      size: 2 + Math.random() * 3,
      hue: ["#22d3ee", "#a855f7", "#d946ef", "#fbbf24"][i % 4],
    }));
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden"
         style={{ background: "linear-gradient(140deg, #020617 0%, #0c0a3e 35%, #2e1065 65%, #4a044e 100%)" }}>
      {/* Animated blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-30 blur-3xl blob-a"
           style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)" }} />
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full opacity-30 blur-3xl blob-b"
           style={{ background: "radial-gradient(circle, #d946ef 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full opacity-25 blur-3xl blob-a"
           style={{ background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)", animationDelay: "4s" }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.06]"
           style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full float-particle"
            style={{
              left: `${p.left}%`,
              bottom: `-10px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.hue,
              boxShadow: `0 0 ${p.size * 3}px ${p.hue}`,
              animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function PillarCard({
  kh, accent, icon: Icon, kickerEn, kickerKh, titleEn, titleKh, taglineEn, taglineKh, children,
}: {
  kh: boolean;
  accent: "cyan" | "fuchsia" | "emerald";
  icon: ComponentType<{ className?: string }>;
  kickerEn: string; kickerKh: string;
  titleEn: string; titleKh: string;
  taglineEn: string; taglineKh: string;
  children: React.ReactNode;
}) {
  const palette = {
    cyan:    { ring: "border-cyan-300/40",    chip: "text-cyan-200",    glow: "rgba(34,211,238,0.35)",  iconBg: "bg-cyan-500/15 border-cyan-300/50 text-cyan-200" },
    fuchsia: { ring: "border-fuchsia-300/40", chip: "text-fuchsia-200", glow: "rgba(217,70,239,0.35)",  iconBg: "bg-fuchsia-500/15 border-fuchsia-300/50 text-fuchsia-200" },
    emerald: { ring: "border-emerald-300/40", chip: "text-emerald-200", glow: "rgba(16,185,129,0.35)",  iconBg: "bg-emerald-500/15 border-emerald-300/50 text-emerald-200" },
  }[accent];
  return (
    <div className={`relative rounded-2xl border-2 ${palette.ring} bg-white/5 backdrop-blur-md p-4 shadow-xl`}
         style={{ boxShadow: `0 0 28px ${palette.glow}` }}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${palette.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className={`text-[9px] font-mono uppercase tracking-[0.25em] ${palette.chip} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? kickerKh : kickerEn}
          </div>
          <div className={`text-[10px] font-mono ${palette.chip} ${kh ? "font-khmer text-xs" : ""}`}>
            {kh ? taglineKh : taglineEn}
          </div>
        </div>
      </div>
      <h5 className={`font-display text-lg sm:text-xl font-extrabold leading-tight text-white ${kh ? "font-khmer leading-snug" : ""}`}>
        {kh ? titleKh : titleEn}
      </h5>
      {kh && <div className="text-[11px] italic text-white/50 mt-0.5 leading-tight">{titleEn}</div>}
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function BrainChipIllustration({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 280 110" className="block w-full h-auto" role="img" aria-label="Brain connected to a chip">
      {/* Brain (left) */}
      <g>
        <path d="M 30 55 C 25 30, 60 18, 80 30 C 95 22, 115 30, 110 50 C 120 55, 115 75, 95 78 C 90 90, 65 92, 55 80 C 35 82, 22 70, 30 55 Z"
              fill="rgba(217,70,239,0.18)" stroke="#f0abfc" strokeWidth="1.6" />
        {/* Wrinkles */}
        <path d="M 50 45 C 60 38, 75 42, 80 50 M 60 60 C 70 55, 85 60, 88 70 M 45 65 C 55 60, 70 65, 75 75"
              fill="none" stroke="#f0abfc" strokeWidth="1" opacity="0.7" />
      </g>
      {/* Neural connection lines */}
      <g stroke="#22d3ee" strokeWidth="1.8" fill="none">
        <line x1="118" y1="40" x2="170" y2="40" className="neural-line" />
        <line x1="118" y1="55" x2="170" y2="55" className="neural-line" style={{ animationDelay: "0.3s" }} />
        <line x1="118" y1="70" x2="170" y2="70" className="neural-line" style={{ animationDelay: "0.6s" }} />
      </g>
      {/* Pulse dots traveling */}
      <circle r="3" fill="#22d3ee">
        <animateMotion dur="2.4s" repeatCount="indefinite" path="M 118 55 L 170 55" />
      </circle>
      <circle r="2.5" fill="#a855f7">
        <animateMotion dur="2.8s" repeatCount="indefinite" path="M 170 40 L 118 40" />
      </circle>

      {/* Chip (right) */}
      <g>
        <rect x="170" y="20" width="80" height="70" rx="6" fill="rgba(34,211,238,0.18)" stroke="#22d3ee" strokeWidth="1.6" />
        <rect x="180" y="30" width="60" height="50" rx="3" fill="#0f172a" stroke="#22d3ee" strokeWidth="1" />
        {/* Circuit traces */}
        <g stroke="#22d3ee" strokeWidth="0.8" fill="none" opacity="0.7">
          <path d="M 195 40 L 215 40 L 215 50 L 230 50" />
          <path d="M 195 60 L 210 60 L 210 70 L 225 70" />
          <path d="M 220 35 L 220 45 L 235 45" />
        </g>
        {/* Chip pins */}
        {[0,1,2,3,4].map((i) => (
          <g key={i}>
            <rect x={170 + 2 + i * 14} y="14" width="3" height="6" fill="#22d3ee" />
            <rect x={170 + 2 + i * 14} y="90" width="3" height="6" fill="#22d3ee" />
          </g>
        ))}
        <text x="210" y="60" textAnchor="middle" fontSize="9" fontWeight="900" fill="#22d3ee" fontFamily="ui-monospace">CPU</text>
      </g>

      {/* Captions */}
      <text x="65" y="105" textAnchor="middle" fontSize="8" fontWeight="700" fill="#f0abfc" fontFamily="ui-monospace"
            style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-monospace" }}>
        {kh ? "ខួរក្បាល" : "BRAIN"}
      </text>
      <text x="210" y="105" textAnchor="middle" fontSize="8" fontWeight="700" fill="#22d3ee" fontFamily="ui-monospace"
            style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-monospace" }}>
        {kh ? "កុំព្យូទ័រ" : "COMPUTER"}
      </text>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function IdeaSticky({ idea, kh, highlight }: { idea: Idea; kh: boolean; highlight: boolean }) {
  // Each sticky has a subtle hue rotation based on the id
  const hue = useMemo(() => {
    const palettes = [
      { from: "from-fuchsia-500/20", border: "border-fuchsia-300/50", text: "text-fuchsia-200" },
      { from: "from-cyan-500/20",    border: "border-cyan-300/50",    text: "text-cyan-200" },
      { from: "from-amber-500/20",   border: "border-amber-300/50",   text: "text-amber-200" },
      { from: "from-emerald-500/20", border: "border-emerald-300/50", text: "text-emerald-200" },
    ];
    return palettes[Math.abs(idea.id.charCodeAt(idea.id.length - 1)) % palettes.length];
  }, [idea.id]);

  return (
    <div className={`relative rounded-xl bg-gradient-to-br ${hue.from} to-white/5 border ${hue.border} backdrop-blur-md p-4 transition ${
      highlight ? "ring-2 ring-fuchsia-300 shadow-[0_0_24px_rgba(217,70,239,0.5)]" : ""
    }`}>
      {highlight && (
        <span className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-fuchsia-500 text-white text-[9px] font-mono font-bold uppercase tracking-widest shadow ${kh ? "font-khmer normal-case tracking-normal text-[10px]" : ""}`}>
          {kh ? "ថ្មី" : "NEW"}
        </span>
      )}
      <div className="flex items-center gap-1.5 mb-2">
        <Sparkles className={`w-3 h-3 ${hue.text}`} />
        <span className={`text-[10px] font-mono uppercase tracking-widest ${hue.text} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {idea.seed ? (kh ? "ឧទាហរណ៍" : "Example") : (kh ? "សម្លេងសិស្ស" : "Student voice")}
        </span>
      </div>
      <p className={`text-sm text-white leading-relaxed font-medium break-words ${kh ? "font-khmer leading-loose text-base" : ""}`}>
        “{kh && idea.kh ? idea.kh : idea.en}”
      </p>
      {kh && idea.kh && idea.en && (
        <p className="mt-1 text-[11px] italic text-white/50 leading-tight">{idea.en}</p>
      )}
      <div className={`mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60 ${kh ? "font-khmer text-xs" : ""}`}>
        <span className="font-bold text-white/80">— {idea.name}</span>
        <span className="opacity-70">{idea.place}</span>
      </div>
    </div>
  );
}
