import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import {
  ArrowLeft,
  Hourglass,
  Rocket,
  Globe,
  Gauge,
  Info,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

export default function TimeDilationPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // State inputs
  const [velocity, setVelocity] = useState<number>(90); // default 90% of c
  const [t0, setT0] = useState<number>(10); // default 10 years on spaceship
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Animation ticks for clock rotation
  const [ticks, setTicks] = useState<number>(0);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  // Relativistic calculations
  // v / c
  const vFraction = velocity / 100;
  // gamma = 1 / sqrt(1 - (v/c)^2)
  const gamma = 1 / Math.sqrt(1 - vFraction * vFraction);
  // t = t0 * gamma
  const earthTime = t0 * gamma;

  // Animation loop
  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== null) {
        const deltaTime = time - previousTimeRef.current;
        if (isPlaying) {
          // base speed is 0.05 units per ms
          setTicks((prevTicks) => prevTicks + deltaTime * 0.05);
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying]);

  // Sync inputs
  const handleVelocitySlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVelocity(parseFloat(e.target.value));
  };

  const handleVelocityNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseFloat(e.target.value);
    if (isNaN(val)) val = 1;
    if (val < 1) val = 1;
    if (val > 99.99) val = 99.99;
    setVelocity(val);
  };

  const handleT0Number = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseFloat(e.target.value);
    if (isNaN(val)) val = 1;
    if (val < 1) val = 1;
    if (val > 1000) val = 1000;
    setT0(val);
  };

  const handleReset = () => {
    setVelocity(90);
    setT0(10);
    setIsPlaying(true);
  };

  // Clock Hand Angles (Degrees)
  const spaceshipAngle = ticks % 360;
  const earthAngle = (ticks * gamma) % 360;

  return (
    <div className="min-h-screen relative text-slate-100 bg-[#02030a] overflow-x-hidden font-sans">
      <ScopedStyles />
      <RelativityBg />

      {/* ── Navigation Header ── */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-20">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/physics"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer text-sm" : "font-semibold text-sm"}>
              {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Hourglass className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span
              className={`font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-indigo-300 to-purple-400 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Time Dilation Simulator", "ឧបករណ៍ក្លែងធ្វើការពន្យារពេល")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block font-mono">
            <span>RELATIVITY-STUDY-MODULE</span>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 relative z-10 flex flex-col gap-8">
        
        {/* Massive Engaging Title & Concept Breakdown */}
        <section className="bg-slate-950/40 border border-slate-900 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 rounded-full px-4 py-1 text-xs font-mono uppercase w-fit">
              <Rocket className="w-3.5 h-3.5" />
              {t("Einstein's Special Relativity", "ទ្រឹស្តីរ៉េឡាទីវីតេពិសេសរបស់អាញស្តាញ")}
            </div>
            
            <h1
              className={`font-black text-white leading-tight ${
                isKh ? "font-khmer leading-relaxed" : ""
              }`}
              style={{ fontSize: "max(2.2rem, 4.5vw)" }}
            >
              {isKh ? (
                <>
                  ការពន្យារពេល៖ <span className="text-cyan-400 glow-cyan">ពេលវេលាដើរយឺត</span>
                </>
              ) : (
                <>
                  Time Dilation: <span className="text-cyan-400 glow-cyan">Time Slows Down</span>
                </>
              )}
            </h1>

            <p
              className={`text-slate-300 text-base sm:text-lg ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {t(
                "Albert Einstein's Theory of Special Relativity reveals that time is not constant. As a spaceship travels faster and approaches the speed of light, time actually passes slower for the astronauts onboard relative to a stationary observer remaining on Earth. Moving clocks tick slower!",
                "ទ្រឹស្តីរ៉េឡាទីវីតេពិសេសរបស់ អាល់បឺត អាញស្តាញ បង្ហាញថាពេលវេលាមិនថេរឡើយ។ កាលណាស្បើយានអវកាសធ្វើដំណើររឹតតែលឿន កាន់តែខិតជិតល្បឿនពន្លឺ ពេលវេលាពិតជាដើរយឺតជាងមុនសម្រាប់អ្នកអវកាសនៅក្នុងយាន ធៀបនឹងអ្នកសង្កេតការណ៍ដែលស្ថិតនៅនឹងថ្កល់លើផែនដី។ នាឡិកាដែលមានចលនាដើរយឺតជាង!"
              )}
            </p>
          </div>
        </section>

        {/* Relativistic Formula & Bilingual Definitions */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Formula Display Column */}
          <div className="lg:col-span-6 bg-slate-950/40 border border-slate-900 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase block mb-2">
                {t("THE MATHEMATICAL EQUATION", "សមីការគណិតវិទ្យា")}
              </span>
              <h3 className={`font-bold text-white text-xl sm:text-2xl ${isKh ? "font-khmer" : ""}`}>
                {t("The Time Dilation Formula", "រូបមន្តនៃការពន្យារពេលវេលា")}
              </h3>
            </div>

            {/* LaTeX Render Block */}
            <div className="math-frame rounded-2xl p-6 flex justify-center items-center overflow-x-auto min-h-[140px]">
              <div className="katex-scaler">
                <BlockMath math={String.raw`t = \frac{t_0}{\sqrt{1 - \frac{v^2}{c^2}}}`} />
              </div>
            </div>

            <p className={`text-slate-400 text-xs ${isKh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "This formula calculates how much time passes on Earth (t) for a given duration spent on the spaceship (t₀) moving at speed (v).",
                "រូបមន្តនេះគណនាថាតើពេលវេលាប៉ុន្មានឆ្នាំកន្លងផុតទៅលើផែនដី (t) សម្រាប់រយៈពេលដែលបានចំណាយលើស្បើយាន (t₀) ធ្វើដំណើរក្នុងល្បឿន (v)។"
              )}
            </p>
          </div>

          {/* Variables Legend Column */}
          <div className="lg:col-span-6 bg-slate-950/40 border border-slate-900 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase block mb-2">
                {t("VARIABLE DEFINITIONS", "និយមន័យអថេរ")}
              </span>
              <h3 className={`font-bold text-white text-xl sm:text-2xl ${isKh ? "font-khmer" : ""}`}>
                {t("Bilingual Variable Guide", "សេចក្តីពន្យល់អថេរពីរភាសា")}
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {/* Variable t */}
              <div className="variable-row flex items-start gap-4 p-3 rounded-xl bg-slate-900/40 border border-slate-900">
                <span className="font-serif font-black text-cyan-300 text-xl shrink-0 w-8 text-center bg-cyan-950/60 rounded px-1.5 py-0.5 border border-cyan-800/40">t</span>
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 block">{t("Earth Time", "ពេលវេលាលើផែនដី")}</span>
                  <p className={`text-slate-300 text-xs sm:text-sm font-semibold ${isKh ? "font-khmer leading-relaxed" : ""}`}>
                    {t("Time elapsed on Earth (stationary observer's frame).", "ពេលវេលាដែលបានកន្លងផុតទៅលើផែនដី (សម្រាប់អ្នកសង្កេតការណ៍នៅនឹងកន្លែង)។")}
                  </p>
                </div>
              </div>

              {/* Variable t0 */}
              <div className="variable-row flex items-start gap-4 p-3 rounded-xl bg-slate-900/40 border border-slate-900">
                <span className="font-serif font-black text-cyan-300 text-xl shrink-0 w-8 text-center bg-cyan-950/60 rounded px-1.5 py-0.5 border border-cyan-800/40">t₀</span>
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 block">{t("Spaceship Time", "ពេលវេលាផ្ទាល់លើស្បើយាន")}</span>
                  <p className={`text-slate-300 text-xs sm:text-sm font-semibold ${isKh ? "font-khmer leading-relaxed" : ""}`}>
                    {t("Proper time: duration recorded by clocks onboard the spaceship.", "ពេលវេលាផ្ទាល់៖ រយៈពេលដែលវាស់វែងដោយនាឡិកាធ្វើដំណើរនៅលើស្បើយានអវកាស។")}
                  </p>
                </div>
              </div>

              {/* Variable v */}
              <div className="variable-row flex items-start gap-4 p-3 rounded-xl bg-slate-900/40 border border-slate-900">
                <span className="font-serif font-black text-cyan-300 text-xl shrink-0 w-8 text-center bg-cyan-950/60 rounded px-1.5 py-0.5 border border-cyan-800/40">v</span>
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 block">{t("Spaceship Velocity", "ល្បឿនរបស់យាន")}</span>
                  <p className={`text-slate-300 text-xs sm:text-sm font-semibold ${isKh ? "font-khmer leading-relaxed" : ""}`}>
                    {t("Speed of the spaceship, measured relative to Earth.", "ល្បឿនរបស់យានអវកាស គិតជាភាគរយនៃល្បឿនពន្លឺ។")}
                  </p>
                </div>
              </div>

              {/* Variable c */}
              <div className="variable-row flex items-start gap-4 p-3 rounded-xl bg-slate-900/40 border border-slate-900">
                <span className="font-serif font-black text-cyan-300 text-xl shrink-0 w-8 text-center bg-cyan-950/60 rounded px-1.5 py-0.5 border border-cyan-800/40">c</span>
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 block">{t("Speed of Light", "ល្បឿនពន្លឺ")}</span>
                  <p className={`text-slate-300 text-xs sm:text-sm font-semibold ${isKh ? "font-khmer leading-relaxed" : ""}`}>
                    {t("Universal speed limit in vacuum (~299,792 km/s).", "ល្បឿនកំណត់ចក្រវាឡនៅក្នុងលំហទំនេរ (~២៩៩,៧៩២ គីឡូម៉ែត្រ/វិនាទី)។")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Spaceship Simulator */}
        <section className="bg-slate-950/40 border border-slate-900 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-8">
          <div>
            <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase block mb-1">
              {t("INTERACTIVE CLASSROOM LAB", "មន្ទីរពិសោធន៍អន្តរកម្មក្នុងថ្នាក់")}
            </span>
            <h2 className={`font-black text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.8rem, 3.2vw)" }}>
              {t("Spaceship Relativistic Visualizer", "ឧបករណ៍ក្លែងធ្វើការធ្វើដំណើរអវកាស")}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Inputs Column (Col Span 4) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Card Title */}
              <div className="border-b border-slate-900 pb-3">
                <h4 className={`text-slate-300 font-bold text-sm uppercase tracking-wider ${isKh ? "font-khmer tracking-normal" : ""}`}>
                  {t("Flight Settings", "ការកំណត់ការហោះហើរ")}
                </h4>
              </div>

              {/* Input: Spaceship Velocity (v) */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-slate-400 flex justify-between">
                  <span>{t("Spaceship Velocity (v)", "ល្បឿនយានអវកាស (v)")}</span>
                  <span className="text-cyan-400 font-bold">% of c</span>
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="99.99"
                    step="0.01"
                    value={velocity}
                    onChange={handleVelocitySlider}
                    className="flex-grow accent-cyan-400 bg-slate-900 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 w-24 shrink-0">
                    <input
                      type="number"
                      min="1"
                      max="99.99"
                      step="0.01"
                      value={velocity}
                      onChange={handleVelocityNumber}
                      className="bg-transparent text-sm text-cyan-300 text-right w-full font-mono font-bold focus:outline-none"
                    />
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 leading-normal">
                  {t(
                    "Relativity effects trigger dramatically past 90% of light speed.",
                    "ឥទ្ធិពលរ៉េឡាទីវីតេចាប់ផ្តើមកើនឡើងយ៉ាងខ្លាំងក្លាហួសពី ៩០% នៃល្បឿនពន្លឺ។"
                  )}
                </div>
              </div>

              {/* Input: Years spent on Spaceship (t0) */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-slate-400 flex justify-between">
                  <span>{t("Time on spaceship (t₀)", "ពេលវេលាលើស្បើយាន (t₀)")}</span>
                  <span className="text-cyan-400 font-bold">{t("Years", "ឆ្នាំ")}</span>
                </label>
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-4 py-2">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={t0}
                    onChange={handleT0Number}
                    className="bg-transparent text-lg text-cyan-300 text-left w-full font-mono font-bold focus:outline-none"
                  />
                </div>
                <div className="text-[10px] text-slate-500 leading-normal">
                  {t(
                    "Set how many years the astronaut spends flying in space.",
                    "កំណត់ចំនួនឆ្នាំដែលអ្នកអវកាសហោះហើរនៅក្នុងលំហអវកាស។"
                  )}
                </div>
              </div>

              {/* Controls: Play/Pause and Reset */}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex-grow inline-flex items-center justify-center gap-2 rounded-xl border py-3 px-4 font-bold text-sm transition-all active:scale-[0.98] ${
                    isPlaying
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                      : "border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>{t("Pause Clocks", "ផ្អាកនាឡិកា")}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>{t("Resume Clocks", "បន្តនាឡិកា")}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center p-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
                  title={t("Reset Simulator", "កំណត់ឡើងវិញ")}
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Outputs Column (Col Span 8) */}
            <div className="lg:col-span-8 flex flex-col gap-6 w-full">
              
              {/* Relativistic Typography Box (Massive display for projection) */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden shadow-inner">
                <div className="absolute top-0 right-0 p-3 text-[10px] font-mono text-cyan-500 bg-cyan-950/40 border-l border-b border-slate-900 rounded-bl-xl uppercase font-bold tracking-widest">
                  {t("Relativistic Output", "ទិន្នន័យ relativistic")}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  
                  {/* Space Time (t0) */}
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                      <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                      {t("Astronaut Time (t₀)", "ពេលវេលាអវកាសយានិក (t₀)")}
                    </span>
                    <div className="text-slate-100 flex items-baseline gap-2">
                      <span className="font-black font-mono leading-none tracking-tight text-glow-cyan" style={{ fontSize: "max(2.2rem, 5.2vw)" }}>
                        {t0.toFixed(2)}
                      </span>
                      <span className={`text-slate-400 text-xs sm:text-sm font-bold ${isKh ? "font-khmer" : ""}`}>
                        {t("Spaceship Years", "ឆ្នាំលើស្បើយាន")}
                      </span>
                    </div>
                  </div>

                  {/* Earth Time (t) */}
                  <div className="flex flex-col gap-1 md:border-l md:border-slate-850 md:pl-6">
                    <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-rose-400" />
                      {t("Earth Time (t)", "ពេលវេលាលើផែនដី (t)")}
                    </span>
                    <div className="text-white flex items-baseline gap-2">
                      <span className="font-black font-mono leading-none tracking-tight text-glow-rose" style={{ fontSize: "max(2.2rem, 5.2vw)" }}>
                        {earthTime.toFixed(2)}
                      </span>
                      <span className={`text-slate-400 text-xs sm:text-sm font-bold ${isKh ? "font-khmer" : ""}`}>
                        {t("Earth Years", "ឆ្នាំលើផែនដី")}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Lorentz Factor Banner */}
                <div className="mt-2 border-t border-slate-900 pt-4 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-purple-400" />
                    <span className={`text-xs text-slate-400 font-bold ${isKh ? "font-khmer" : ""}`}>
                      {t("Relativistic Time Stretch (Lorentz Factor γ):", "កម្រិតពន្យារពេល relativistic (កត្តាឡូរ៉េន γ)៖")}
                    </span>
                  </div>
                  <span className="text-purple-300 font-mono font-bold text-sm bg-purple-950/50 border border-purple-800/40 rounded-lg px-2.5 py-0.5">
                    {gamma.toFixed(4)}x
                  </span>
                </div>
              </div>

              {/* Graphical Visualizer (Dual aging clocks & Bar Comparison) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Visual element 1: Dual Clock System */}
                <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 flex flex-col gap-4">
                  <h5 className={`text-slate-300 font-bold text-xs uppercase tracking-wider ${isKh ? "font-khmer" : ""}`}>
                    {t("BENDING TIME: DUAL CLOCKS", "ការពត់បែននៃពេលវេលា៖ នាឡិកាពីរ")}
                  </h5>

                  <div className="flex items-center justify-around py-4 bg-slate-950/60 rounded-2xl border border-slate-900">
                    {/* Spaceship clock */}
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                        <Rocket className="w-3 h-3" />
                        {t("Spaceship", "ស្បើយាន")}
                      </span>
                      <div className="relative w-24 h-24 rounded-full border-4 border-cyan-500/20 bg-slate-950 flex items-center justify-center">
                        {/* Clock ticks indicator */}
                        <div className="absolute inset-0.5 rounded-full border border-dashed border-cyan-400/25 animate-spin" style={{ animationDuration: "120s" }} />
                        {/* Center hub */}
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 z-10" />
                        {/* Clock hand */}
                        <div
                          className="absolute w-0.5 bg-cyan-400 origin-bottom rounded-full"
                          style={{
                            height: "36px",
                            transform: `rotate(${spaceshipAngle}deg)`,
                            top: "12px",
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{t("Ticks: Normal", "នាឡិកា៖ ធម្មតា")}</span>
                    </div>

                    {/* Earth clock */}
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-[10px] font-mono text-rose-400 flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {t("Earth", "ផែនដី")}
                      </span>
                      <div className="relative w-24 h-24 rounded-full border-4 border-rose-500/20 bg-slate-950 flex items-center justify-center">
                        <div className="absolute inset-0.5 rounded-full border border-dashed border-rose-400/25 animate-spin" style={{ animationDuration: "40s" }} />
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-400 z-10" />
                        <div
                          className="absolute w-0.5 bg-rose-400 origin-bottom rounded-full"
                          style={{
                            height: "36px",
                            transform: `rotate(${earthAngle}deg)`,
                            top: "12px",
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        {t("Ticks:", "នាឡិកា៖")} {gamma.toFixed(2)}x {t("Faster", "លឿនជាង")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Visual element 2: Bar charts comparing elapsed years */}
                <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 flex flex-col justify-between gap-4">
                  <h5 className={`text-slate-300 font-bold text-xs uppercase tracking-wider ${isKh ? "font-khmer" : ""}`}>
                    {t("ELAPSED TIME EXPANSION CHART", "ក្រាហ្វបង្ហាញការពង្រីកនៃពេលវេលា")}
                  </h5>

                  <div className="flex flex-col gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-900">
                    
                    {/* Spaceship bar */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-cyan-400">{t("Spaceship (t₀)", "យានអវកាស (t₀)")}</span>
                        <span className="text-slate-300">{t0.toFixed(1)} {t("yrs", "ឆ្នាំ")}</span>
                      </div>
                      <div className="w-full bg-slate-900 h-6 rounded-lg overflow-hidden border border-slate-800">
                        {/* fixed at 15% width as baseline */}
                        <div className="bg-cyan-500/70 h-full rounded-l-md transition-all duration-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]" style={{ width: "15%" }} />
                      </div>
                    </div>

                    {/* Earth bar */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-rose-400">{t("Earth (t)", "ផែនដី (t)")}</span>
                        <span className="text-slate-200">{earthTime.toFixed(1)} {t("yrs", "ឆ្នាំ")}</span>
                      </div>
                      <div className="w-full bg-slate-900 h-6 rounded-lg overflow-hidden border border-slate-800">
                        {/* Width scales by gamma * 15%. Capped at 100% */}
                        <div
                          className="bg-rose-500/70 h-full transition-all duration-300 shadow-[0_0_12px_rgba(244,63,94,0.4)]"
                          style={{
                            width: `${Math.min(100, 15 * gamma)}%`,
                            borderRadius: gamma > 6.6 ? "8px" : "8px 0 0 8px",
                          }}
                        />
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* The Twin Paradox Illustration Card */}
        <section className="bg-slate-950/40 border border-slate-900 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className={`font-bold text-white text-xl sm:text-2xl ${isKh ? "font-khmer" : ""}`}>
              {t("The Twin Paradox Experiment", "ពិសោធន៍គំនិត៖ វិវាទកូនភ្លោះ")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Twin 1: Astronaut */}
            <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 flex items-center justify-center shrink-0">
                <Rocket className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold">{t("Twin 1: The Traveler", "កូនភ្លោះទី១៖ អ្នកធ្វើដំណើរ")}</span>
                <p className={`text-sm text-slate-300 ${isKh ? "font-khmer leading-relaxed" : ""}`}>
                  {t(
                    `Boards a spaceship moving at ${velocity}% the speed of light. They travel for what feels like exactly ${t0} years on their ship clocks. Upon returning, they have aged only ${t0} years, remaining relatively young!`,
                    `ឡើងជិះយានអវកាសដែលធ្វើដំណើរក្នុងល្បឿន ${velocity}% នៃល្បឿនពន្លឺ។ ពួកគេធ្វើដំណើររយៈពេល ${t0} ឆ្នាំនៅលើនាឡិកាយានអវកាសរបស់ពួកគេ។ នៅពេលត្រឡប់មកវិញ ពួកគេមានអាយុចាស់ជាងមុនតែ ${t0} ឆ្នាំប៉ុណ្ណោះ ដោយនៅតែក្មេងដដែល!`
                  )}
                </p>
              </div>
            </div>

            {/* Twin 2: Earth Observer */}
            <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-300 flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-mono uppercase text-rose-400 font-bold">{t("Twin 2: The Observer", "កូនភ្លោះទី២៖ អ្នករង់ចាំលើផែនដី")}</span>
                <p className={`text-sm text-slate-300 ${isKh ? "font-khmer leading-relaxed" : ""}`}>
                  {t(
                    `Remains on Earth waiting for their sibling. While their twin traveled, they observed the spaceship clock ticking incredibly slow. For them, a massive ${earthTime.toFixed(1)} years have passed. They are now older by ${earthTime.toFixed(1)} years!`,
                    `រង់ចាំនៅលើផែនដីរង់ចាំបងប្អូនរបស់ពួកគេ។ ខណៈពេលដែលកូនភ្លោះរបស់ពួកគេធ្វើដំណើរ ពួកគេបានសង្កេតឃើញនាឡិកាយានអវកាសដើរយឺតយ៉ាងខ្លាំង។ សម្រាប់ពួកគេ ពេលវេលាបានកន្លងផុតទៅរហូតដល់ ${earthTime.toFixed(1)} ឆ្នាំ។ ពួកគេចាស់ជាងមុន ${earthTime.toFixed(1)} ឆ្នាំ!`
                  )}
                </p>
              </div>
            </div>

          </div>

          <div className="bg-cyan-950/20 border border-cyan-800/20 rounded-2xl p-5 flex items-start gap-3 mt-2">
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className={`text-xs text-cyan-300 font-bold block mb-1 ${isKh ? "font-khmer" : ""}`}>
                {t("Relativistic Fact", "ការពិត Relativistic")}
              </span>
              <p className={`text-slate-300 text-xs sm:text-sm leading-relaxed ${isKh ? "font-khmer leading-relaxed" : ""}`}>
                {t(
                  "This is not science fiction or a math trick. Atomic clocks flown on fast jets and satellites run slower than identical clocks on Earth. GPS satellites must adjust their atomic clocks by ~7 microseconds per day due to special relativity (velocity) and ~45 microseconds due to general relativity (gravity) to maintain accurate location tracking on your phone!",
                  "នេះមិនមែនជារឿងប្រឌិតបែបវិទ្យាសាស្ត្រ ឬជាល្បែងលេខគណិតវិទ្យាឡើយ។ នាឡិកាអាតូមិកដែលត្រូវបានហោះហើរលើដ្រូនល្បឿនលឿន និងផ្កាយរណប ដើរយឺតជាងនាឡិកាដូចគ្នានៅលើផែនដី។ ផ្កាយរណប GPS ត្រូវតែកែតម្រូវនាឡិកាអាតូមិករបស់ពួកគេប្រហែល ~៧ មីក្រូវិនាទីក្នុងមួយថ្ងៃ ដោយសារតែរ៉េឡាទីវីតេពិសេស (ល្បឿន) និង ~៤៥ មីក្រូវិនាទី ដោយសារតែរ៉េឡាទីវីតេទូទៅ (ទំនាញ) ដើម្បីរក្សាការស្វែងរកទីតាំងយ៉ាងត្រឹមត្រូវនៅលើទូរសព្ទរបស់អ្នក!"
                )}
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Navigation */}
      <footer className="max-w-[1600px] mx-auto px-6 py-12 text-center border-t border-slate-900 bg-slate-950/20 mt-12 z-10 relative">
        <Link
          href="/physics"
          className="inline-flex items-center gap-1.5 text-cyan-400/80 hover:text-cyan-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className={isKh ? "font-khmer text-xs" : "text-xs font-semibold"}>
            {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
          </span>
        </Link>
      </footer>
    </div>
  );
}

// ── Scoped Styling Component ──
function ScopedStyles() {
  return (
    <style>{`
      .text-glow-cyan {
        color: #22d3ee;
        text-shadow: 0 0 20px rgba(34, 211, 238, 0.65), 0 0 40px rgba(34, 211, 238, 0.25);
      }
      .text-glow-rose {
        color: #f43f5e;
        text-shadow: 0 0 20px rgba(244, 63, 94, 0.65), 0 0 40px rgba(244, 63, 94, 0.25);
      }
      .glow-cyan {
        text-shadow: 0 0 16px rgba(34, 211, 238, 0.45);
      }
      .math-frame {
        background: rgba(0, 0, 0, 0.55);
        border: 1px solid rgba(34, 211, 238, 0.15);
        box-shadow: inset 0 0 24px rgba(34, 211, 238, 0.08);
      }
      .katex-scaler .katex {
        font-size: clamp(1.4rem, 2.8vw, 3.8rem);
        color: #e2e8f0;
      }
      .variable-row {
        transition: transform 0.2s ease, border-color 0.2s ease;
      }
      .variable-row:hover {
        transform: translateX(4px);
        border-color: rgba(34, 211, 238, 0.3);
      }
    `}</style>
  );
}

// ── Background Glows & Stars ──
function RelativityBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, #060919 0%, #02030a 60%, #000000 100%)",
        }}
      />
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px]" />
      <div className="absolute top-[40%] -right-20 w-[450px] h-[450px] rounded-full bg-indigo-500/5 blur-[140px]" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-[100px]" />
      
      {/* Space dots overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(34, 211, 238, 0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
