import React, { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Lock,
  Play,
  Check,
  AlertCircle,
  HelpCircle,
  Trophy,
  Flame,
  Layers,
  Palette,
  Droplet,
  Wrench,
  Box,
  ChevronRight,
  Hammer,
  X
} from "lucide-react";
import confetti from "canvas-confetti";
import database from "@/data/frugal-blueprint-scenarios.json";

// ── Web Audio API sound generator ──────────────────────────────────────────
const audioCtx =
  typeof window !== "undefined" && (window.AudioContext || (window as any).webkitAudioContext)
    ? new (window.AudioContext || (window as any).webkitAudioContext)()
    : null;

function playSound(type: "click" | "buy" | "remove" | "success" | "fail") {
  if (!audioCtx) return;
  try {
    if (audioCtx.state === "suspended") audioCtx.resume();
    const t = audioCtx.currentTime;

    if (type === "click") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, t);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.start(t);
      osc.stop(t + 0.05);
    } else if (type === "buy") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.start(t);
      osc.stop(t + 0.15);
    } else if (type === "remove") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(440, t + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.start(t);
      osc.stop(t + 0.15);
    } else if (type === "success") {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t + idx * 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        gain.gain.setValueAtTime(0.08, t + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.12 + 0.4);
        osc.start(t + idx * 0.12);
        osc.stop(t + idx * 0.12 + 0.4);
      });
    } else if (type === "fail") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(130, t);
      osc.frequency.linearRampToValueAtTime(80, t + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.5);
      osc.start(t);
      osc.stop(t + 0.5);
    }
  } catch (e) {}
}

// Map database icon strings to Lucide Component icons
const iconMap: Record<string, React.ComponentType<any>> = {
  Flame,
  Layers,
  Palette,
  Droplet,
  Wrench,
  Box,
  Sparkles,
  HelpCircle
};

type GamePhase = "selection" | "presentation" | "tested";

export default function FrugalBlueprintPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // Scenario States
  const [selectedGrade, setSelectedGrade] = useState<string>("Primary School");
  const [activeScenario, setActiveScenario] = useState<any>(null);

  // Cart & Budget
  const [cart, setCart] = useState<string[]>([]); // Array of item IDs
  const [spentPoints, setSpentPoints] = useState<number>(0);

  // Gameplay Phase
  const [phase, setPhase] = useState<GamePhase>("selection");

  // Result Feedback
  const [testResult, setTestResult] = useState<{
    success: boolean;
    missingItemName: string | null;
    overBudget: boolean;
  } | null>(null);

  // Set active scenario depending on selected grade
  useEffect(() => {
    const sc = database.scenarios.find((s) => s.gradeLevel === selectedGrade);
    setActiveScenario(sc || null);
    
    // Reset selection when changing grade levels
    setCart([]);
    setSpentPoints(0);
    setPhase("selection");
    setTestResult(null);
  }, [selectedGrade]);

  // Recalculate total spent points when cart modifies
  useEffect(() => {
    let total = 0;
    cart.forEach((itemId) => {
      const storeItem = database.storeItems.find((i) => i.id === itemId);
      if (storeItem) {
        total += storeItem.cost;
      }
    });
    setSpentPoints(total);
  }, [cart]);

  // Add item to cart
  const handleBuyItem = (itemId: string) => {
    if (cart.includes(itemId)) return;
    playSound("buy");
    setCart((prev) => [...prev, itemId]);
  };

  // Remove item from cart
  const handleRemoveItem = (itemId: string) => {
    if (!cart.includes(itemId)) return;
    playSound("remove");
    setCart((prev) => prev.filter((id) => id !== itemId));
  };

  // Scramble/Reset cart
  const resetSelection = () => {
    playSound("click");
    setCart([]);
    setPhase("selection");
    setTestResult(null);
  };

  // Lock In Design and switch to Presentation screen
  const handleLockIn = () => {
    playSound("click");
    setPhase("presentation");
  };

  // Test Design & calculate results
  const handleTestDesign = () => {
    if (!activeScenario) return;

    const overBudget = spentPoints > activeScenario.budget;
    let missingItemName: string | null = null;
    let success = true;

    // Verify success logic: cart must contain all required items
    for (const reqId of activeScenario.requiredItems || []) {
      if (!cart.includes(reqId)) {
        success = false;
        const missingStoreItem = database.storeItems.find((i) => i.id === reqId);
        missingItemName = missingStoreItem
          ? (isKh ? missingStoreItem.nameKh : missingStoreItem.nameEn)
          : reqId;
        break;
      }
    }

    // Verify custom successLogic rules if basic items are present
    if (success && activeScenario.successLogic) {
      for (const rule of activeScenario.successLogic) {
        if (!cart.includes(rule.id)) {
          success = false;
          missingItemName = isKh ? rule.nameKh : rule.nameEn;
          break;
        }
      }
    }

    // Over budget counts as failure
    if (overBudget) {
      success = false;
    }

    if (success) {
      playSound("success");
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.55 }
      });
    } else {
      playSound("fail");
    }

    setTestResult({
      success,
      missingItemName,
      overBudget
    });
    setPhase("tested");
  };

  // Return to editing from presentation phase
  const handleEditDesign = () => {
    playSound("click");
    setPhase("selection");
    setTestResult(null);
  };

  const budgetRemaining = activeScenario ? activeScenario.budget - spentPoints : 0;
  const isOverBudget = budgetRemaining < 0;

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Sci-fi star background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#050b18] to-black pointer-events-none" />

      {styleInjection()}

      {/* Navigation Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-20">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/science"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer text-sm" : "font-semibold"}>
              {t("Back to Scientific Literacy", "ត្រឡប់ទៅវិទ្យាសាស្ត្រ")}
            </span>
          </Link>

          <div>
            <span
              className="font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-indigo-300 to-purple-400 uppercase text-glow block"
              style={{ fontSize: "max(1.3rem, 2.2vw)" }}
            >
              {t("The Frugal Blueprint", "គម្រោងវិស្វកម្មសន្សំសំចៃ")}
            </span>
          </div>

          {/* Grade Level Toggles */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl">
            <span className={`text-[10px] text-indigo-400 font-bold uppercase tracking-widest block px-2 ${isKh ? "font-khmer" : ""}`}>
              {t("Grade Level", "កម្រិតថ្នាក់")}
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {[
                { value: "Primary School", labelEn: "Primary School", labelKh: "បឋមសិក្សា" },
                { value: "High School", labelEn: "High School", labelKh: "វិទ្យាល័យ" },
                { value: "University", labelEn: "University", labelKh: "សាកលវិទ្យាល័យ" }
              ].map((lvl) => (
                <button
                  key={lvl.value}
                  onClick={() => {
                    playSound("click");
                    setSelectedGrade(lvl.value);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                    selectedGrade === lvl.value
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40 scale-105 font-black"
                      : "bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  {isKh ? lvl.labelKh : lvl.labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col items-center gap-6">
        
        {/* PHASE 1: SELECTION PHASE */}
        {phase === "selection" && activeScenario && (
          <div className="w-full flex flex-col gap-6 animate-fade-in">
            {/* Scenario Prompt Section */}
            <section className="bg-slate-950/80 border border-slate-900 p-6 md:p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col gap-3">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-indigo-500/20 rounded-tl-[2.5rem]" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-indigo-500/20 rounded-br-[2.5rem]" />
              
              <div className="flex items-center gap-2">
                <Hammer className="w-6 h-6 text-indigo-400 animate-pulse" />
                <span className={`text-xs font-bold uppercase tracking-wider text-indigo-400 ${isKh ? "font-khmer" : ""}`}>
                  {t(
                    `${selectedGrade} Engineering Challenge`,
                    `វិញ្ញាសាវិស្វកម្មកម្រិត ${
                      selectedGrade === "Primary School" ? "បឋមសិក្សា" : selectedGrade === "High School" ? "មធ្យមសិក្សា" : "សាកលវិទ្យាល័យ"
                    }`
                  )}
                </span>
              </div>

              <h2
                className="font-black text-white"
                style={{ fontSize: "max(1.5rem, 2.5vw)" }}
              >
                {isKh ? activeScenario.titleKh : activeScenario.titleEn}
              </h2>

              <p
                className={`text-slate-300 leading-relaxed ${isKh ? "font-khmer text-sm sm:text-base" : "text-base sm:text-lg"}`}
                style={{ fontSize: "max(0.95rem, 1.4vw)" }}
              >
                {isKh ? activeScenario.problemKm : activeScenario.problemEn}
              </p>
            </section>

            {/* Interactive Stats Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Budget Tracker Box */}
              <div className="md:col-span-1 bg-slate-950/80 border border-slate-900 p-6 rounded-[2rem] shadow-2xl flex flex-col items-center justify-center text-center gap-2 relative">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">
                  {t("Budget Limit", "ដែនកំណត់ថវិកា")}
                </span>
                <div className="font-mono text-3xl font-black text-slate-300">
                  {activeScenario.budget} <span className="text-xs text-slate-500 font-sans">pts</span>
                </div>

                <div className="h-px w-full bg-slate-900 my-2" />

                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest block">
                  {t("Remaining Budget", "ថវិកានៅសល់")}
                </span>
                
                <div
                  className={`font-mono font-black ${isOverBudget ? "text-rose-500 animate-pulse font-black" : "text-emerald-400"}`}
                  style={{ fontSize: "max(2.8rem, 4vw)" }}
                >
                  {budgetRemaining}
                  <span className="text-sm font-sans font-bold ml-1">pts</span>
                </div>

                {isOverBudget && (
                  <div className="text-[10px] text-rose-500 font-bold uppercase tracking-wider flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{t("OVER BUDGET!", "លើសថវិកាហើយ!")}</span>
                  </div>
                )}
              </div>

              {/* Team Inventory Cart Box */}
              <div className="md:col-span-2 bg-slate-950/80 border border-slate-900 p-6 rounded-[2rem] shadow-2xl flex flex-col justify-between gap-4">
                <div>
                  <span className={`text-[10px] text-indigo-400 font-bold uppercase tracking-widest block ${isKh ? "font-khmer" : ""}`}>
                    {t("Team Inventory (Cart)", "បញ្ជីសម្ភារៈក្នុងកន្ត្រក")}
                  </span>
                  
                  {cart.length === 0 ? (
                    <div className="h-28 grid place-items-center text-slate-600 text-xs sm:text-sm italic">
                      {t("Cart is empty. Click materials below to buy.", "កន្ត្រកនៅទំនេរ។ ចុចលើសម្ភារៈខាងក្រោមដើម្បីទិញ។")}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2.5 mt-3 max-h-32 overflow-y-auto pr-2">
                      {cart.map((itemId) => {
                        const item = database.storeItems.find((i) => i.id === itemId);
                        if (!item) return null;
                        const ItemIcon = iconMap[item.iconName] || HelpCircle;

                        return (
                          <div
                            key={`cart-item-${itemId}`}
                            className="bg-indigo-950/40 border border-indigo-900/60 rounded-xl px-3 py-1.5 flex items-center gap-2 hover:bg-rose-950/20 hover:border-rose-900/40 hover:text-rose-400 transition-all cursor-pointer select-none group"
                            onClick={() => handleRemoveItem(itemId)}
                          >
                            <ItemIcon className="w-4 h-4 text-indigo-400 group-hover:text-rose-400" />
                            <span className="text-xs font-semibold">{isKh ? item.nameKh : item.nameEn}</span>
                            <span className="text-[10px] bg-slate-950 text-indigo-300 group-hover:text-rose-300 px-1.5 py-0.5 rounded font-mono">
                              {item.cost}
                            </span>
                            <X className="w-3 h-3 text-slate-600 group-hover:text-rose-400" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex gap-4 border-t border-slate-900 pt-4 mt-2">
                  <button
                    onClick={handleLockIn}
                    disabled={cart.length === 0}
                    className="flex-grow py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-950 disabled:text-slate-700 disabled:border-slate-900 disabled:cursor-not-allowed border border-indigo-500 text-white font-black rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-yellow-300" />
                    <span className={isKh ? "font-khmer text-sm" : "font-bold text-base"}>
                      {t("Lock In Design", "ចាក់សោការរចនា")}
                    </span>
                  </button>

                  <button
                    onClick={resetSelection}
                    disabled={cart.length === 0}
                    className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-2xl transition-all flex items-center justify-center cursor-pointer gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="text-xs font-bold font-mono">{t("Reset", "កំណត់ឡើងវិញ")}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Upcycle Storefront Grid */}
            <section className="w-full flex flex-col gap-4">
              <span className={`text-xs font-bold uppercase tracking-widest text-slate-500 ${isKh ? "font-khmer" : ""}`}>
                {t("Upcycle Storefront", "ហាងលក់សម្ភារៈកែច្នៃ")}
              </span>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {database.storeItems.map((item) => {
                  const inCart = cart.includes(item.id);
                  const ItemIcon = iconMap[item.iconName] || HelpCircle;

                  return (
                    <div
                      key={`store-card-${item.id}`}
                      onClick={() => (inCart ? handleRemoveItem(item.id) : handleBuyItem(item.id))}
                      className={`storefront-card p-5 border-4 rounded-3xl transition-all duration-200 select-none flex flex-col justify-between items-center text-center cursor-pointer shadow-xl relative ${
                        inCart
                          ? "bg-indigo-950/30 border-indigo-500/80 shadow-[0_0_20px_rgba(99,102,241,0.2)] scale-105"
                          : "bg-slate-950/80 border-slate-900 hover:border-slate-800 hover:bg-slate-900"
                      }`}
                      style={{ height: "max(10rem, 24vh)" }}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            inCart ? "bg-indigo-600/20 text-indigo-400" : "bg-slate-900 text-slate-500"
                          }`}
                        >
                          <ItemIcon className="w-6 h-6" />
                        </div>

                        <div>
                          <span
                            className="font-black text-white block mt-1 leading-tight"
                            style={{ fontSize: "max(0.9rem, 1.4vw)" }}
                          >
                            {isKh ? item.nameKh : item.nameEn}
                          </span>
                        </div>
                      </div>

                      <div className="w-full flex items-center justify-between mt-3 pt-2 border-t border-slate-900/60 font-mono">
                        <span className="text-xs text-indigo-400 font-bold">{item.cost} pts</span>
                        
                        {inCart ? (
                          <span className="text-[10px] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full font-sans font-semibold">
                            {t("Remove", "ដកចេញ")}
                          </span>
                        ) : (
                          <span className="text-[10px] text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full font-sans font-semibold">
                            {t("Buy", "ទិញ")}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* PHASE 2 & 3: PRESENTATION AND TESTED PHASES */}
        {(phase === "presentation" || phase === "tested") && activeScenario && (
          <div className="w-full max-w-4xl flex flex-col gap-6 animate-fade-in relative z-10">
            {/* Screen Banner Title */}
            <div className="text-center flex flex-col items-center gap-2 mb-4">
              <span className="text-slate-500 font-mono text-xs sm:text-sm tracking-widest uppercase">
                {t("Locked Blueprint Design", "គម្រោងប្លង់រចនាដែលបានចាក់សោ")}
              </span>
              <div
                className="font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-100 to-indigo-500 drop-shadow-[0_4px_20px_rgba(99,102,241,0.5)] select-all leading-none py-2 px-6 border-b border-indigo-500/20"
                style={{ fontSize: "max(2.2rem, 5vw)" }}
              >
                {isKh ? activeScenario.titleKh : activeScenario.titleEn}
              </div>
            </div>

            {/* Presentation Main Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              
              {/* Left Column: Scenario Problem */}
              <div className="md:col-span-1 bg-slate-950/80 border border-slate-900 p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <span className={`text-xs font-bold uppercase tracking-wider text-indigo-400 ${isKh ? "font-khmer" : ""}`}>
                    {t("The Mission", "បេសកកម្ម")}
                  </span>
                  
                  <p
                    className={`text-slate-300 leading-relaxed ${isKh ? "font-khmer text-sm" : "text-sm sm:text-base"}`}
                  >
                    {isKh ? activeScenario.problemKm : activeScenario.problemEn}
                  </p>
                </div>

                <div className="border-t border-slate-900 pt-4 mt-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">
                    {t("Points Expended", "ថ្លៃដើមគម្រោង")}
                  </span>
                  <div className="font-mono text-xl font-black text-indigo-300 mt-1">
                    {spentPoints} / {activeScenario.budget} pts
                  </div>
                </div>
              </div>

              {/* Right Column: Selected Inventory Cards */}
              <div className="md:col-span-2 bg-slate-950/80 border border-slate-900 p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between gap-6">
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider text-indigo-400 mb-4 block ${isKh ? "font-khmer" : ""}`}>
                    {t("Chosen Materials Inventory", "សម្ភារៈកែច្នៃដែលបានជ្រើសរើស")}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2 mt-2">
                    {cart.map((itemId) => {
                      const item = database.storeItems.find((i) => i.id === itemId);
                      if (!item) return null;
                      const ItemIcon = iconMap[item.iconName] || HelpCircle;

                      return (
                        <div
                          key={`presentation-item-${itemId}`}
                          className="bg-indigo-950/30 border-2 border-indigo-900/60 p-4 rounded-2xl flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-600/10 text-indigo-400 rounded-xl flex items-center justify-center">
                              <ItemIcon className="w-5 h-5" />
                            </div>
                            <span className="font-black text-white text-sm">
                              {isKh ? item.nameKh : item.nameEn}
                            </span>
                          </div>
                          <span className="font-mono text-xs text-indigo-400 font-bold">{item.cost} pts</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Evaluation Phase Details (Tested state) */}
                {phase === "tested" && testResult && (
                  <div className="animate-in zoom-in-95 duration-200">
                    {testResult.success ? (
                      <div className="p-6 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-3xl flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center animate-bounce">
                          <Check className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                          <h4
                            className="font-black text-emerald-400 uppercase tracking-wider"
                            style={{ fontSize: "max(1.1rem, 2vw)" }}
                          >
                            {t("SUCCESS! DESIGN VALIDATED!", "ជោគជ័យ! ប្លង់រចនាបានអនុម័ត!")}
                          </h4>
                          <p className={`text-slate-300 text-xs sm:text-sm mt-1 ${isKh ? "font-khmer" : ""}`}>
                            {t("Outstanding engineering! Mission accomplished with 95% Efficiency.", "ស្នាដៃវិស្វកម្មដ៏អស្ចារ្យ! បេសកកម្មបានសម្រេចដោយជោគជ័យជាមួយប្រសិទ្ធភាព ៩៥%។")}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 bg-rose-500/10 border-2 border-rose-500/30 rounded-3xl flex items-center gap-4">
                        <div className="w-12 h-12 bg-rose-500/20 border-2 border-rose-400 rounded-full flex items-center justify-center">
                          <AlertCircle className="w-6 h-6 text-rose-500" />
                        </div>
                        <div className="flex-1">
                          <h4
                            className="font-black text-rose-500 uppercase tracking-wider"
                            style={{ fontSize: "max(1.1rem, 2vw)" }}
                          >
                            {t("DESIGN FAILURE!", "គម្រោងបរាជ័យ!")}
                          </h4>
                          <p className={`text-slate-300 text-xs sm:text-sm mt-1 ${isKh ? "font-khmer" : ""}`}>
                            {testResult.overBudget
                              ? t("Failed: Material selection exceeded budget limits. Reduce costs.", "បរាជ័យ៖ ជម្រើសសម្ភារៈរបស់ក្រុមបានលើសដែនកំណត់ថវិកា។ សូមកាត់បន្ថយថ្លៃដើម។")
                              : t(`Failed: Missing critical component: ${testResult.missingItemName}.`, `បរាជ័យ៖ ខ្វះខាតផ្នែកចម្រោះដ៏សំខាន់៖ ${testResult.missingItemName}។`)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions Panel */}
                <div className="flex flex-wrap gap-4 border-t border-slate-900 pt-4 mt-2">
                  {phase === "presentation" ? (
                    <button
                      onClick={handleTestDesign}
                      className="flex-grow py-3.5 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 text-white font-black rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer flex items-center justify-center gap-2"
                      style={{ fontSize: "max(1rem, 1.6vw)" }}
                    >
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      <span>{t("Test Design", "ធ្វើតេស្តសាកល្បង")}</span>
                    </button>
                  ) : (
                    <button
                      onClick={resetSelection}
                      className="flex-grow py-3.5 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 text-white font-black rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer flex items-center justify-center gap-2"
                      style={{ fontSize: "max(1rem, 1.6vw)" }}
                    >
                      <Trophy className="w-5 h-5 text-yellow-300 animate-bounce" />
                      <span>{t("Play Again", "លេងម្តងទៀត")}</span>
                    </button>
                  )}

                  <button
                    onClick={handleEditDesign}
                    className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white font-bold rounded-2xl transition-all flex items-center justify-center cursor-pointer gap-2"
                    style={{ fontSize: "max(0.9rem, 1.4vw)" }}
                  >
                    <span>{t("Edit Design", "កែសម្រួលឡើងវិញ")}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// Custom animations injected dynamically
function styleInjection() {
  return (
    <style>{`
      @keyframes textGlow {
        0%, 100% { text-shadow: 0 0 3px rgba(34,211,238,0.2); }
        50% { text-shadow: 0 0 15px rgba(34,211,238,0.6); }
      }
      .text-glow {
        animation: textGlow 2.5s infinite ease-in-out;
      }
      .storefront-card {
        transition: transform 0.2s ease, border-color 0.2s ease;
      }
      .animate-fade-in {
        animation: fadeIn 0.2s ease-out forwards;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `}</style>
  );
}
