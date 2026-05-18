import React, { useState, useEffect, useRef } from 'react';
import { useLanguageStore } from '@/store/use-language';
import { MILLIONAIRE_QUESTIONS, PRIZE_LADDER, MillionaireQuestion } from '@/data/millionaire-questions';
import { CircleDollarSign, Users, SplitSquareHorizontal, CheckCircle2, XCircle, ArrowRight, Trophy, PlayCircle, Dices } from 'lucide-react';

// --- AUDIO HELPERS ---
const audioCtx = typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext) 
  ? new (window.AudioContext || (window as any).webkitAudioContext)() 
  : null;

function playCorrect() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc1.type = 'sine';
  osc2.type = 'sine';
  osc1.frequency.setValueAtTime(523.25, t); // C5
  osc2.frequency.setValueAtTime(659.25, t); // E5
  
  osc1.frequency.setValueAtTime(659.25, t + 0.15); // E5
  osc2.frequency.setValueAtTime(783.99, t + 0.15); // G5
  
  osc1.frequency.setValueAtTime(1046.50, t + 0.3); // C6
  osc2.frequency.setValueAtTime(1318.51, t + 0.3); // E6

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(audioCtx.destination);
  
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.2, t + 0.05);
  gain.gain.setValueAtTime(0.2, t + 0.6);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
  
  osc1.start(t);
  osc2.start(t);
  osc1.stop(t + 1.5);
  osc2.stop(t + 1.5);
}

function playWrong() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(150, t);
  osc.frequency.linearRampToValueAtTime(100, t + 0.5);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.3, t + 0.1);
  gain.gain.linearRampToValueAtTime(0.001, t + 0.8);
  
  osc.start(t);
  osc.stop(t + 0.8);
}

function startSuspense() {
  if (!audioCtx) return { stop: () => {} };
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc1.type = 'sine';
  osc2.type = 'sine';
  osc1.frequency.value = 60;
  osc2.frequency.value = 62; // Slight detune for tension
  
  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(audioCtx.destination);
  
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 1);
  
  osc1.start();
  osc2.start();
  
  return {
    stop: () => {
      const t = audioCtx.currentTime;
      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(gain.gain.value, t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.5);
      osc1.stop(t + 0.5);
      osc2.stop(t + 0.5);
    }
  };
}

// --- COMPONENTS ---
export default function MillionaireChallengePage() {
  const { language } = useLanguageStore();
  const isKh = language === 'kh';

  const [gameMode, setGameMode] = useState<'menu' | 'classic' | 'random'>('menu');
  const [activeQuestions, setActiveQuestions] = useState<MillionaireQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'suspense' | 'correct' | 'wrong' | 'won'>('idle');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [used5050, setUsed5050] = useState(false);
  const [usedAskClass, setUsedAskClass] = useState(false);
  const [showAskClassModal, setShowAskClassModal] = useState(false);

  const suspenseAudioRef = useRef<{ stop: () => void } | null>(null);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (suspenseAudioRef.current) suspenseAudioRef.current.stop();
    };
  }, []);

  const startGame = (mode: 'classic' | 'random') => {
    // Reset all game state
    setGameMode(mode);
    setQIndex(0);
    setGameState('idle');
    setSelectedOption(null);
    setEliminatedOptions([]);
    setUsed5050(false);
    setUsedAskClass(false);

    if (mode === 'classic') {
      // Classic mode pulls the first 5 of each tier, representing the original fixed set
      const easy = MILLIONAIRE_QUESTIONS.filter(q => q.difficultyTier === 'easy').slice(0, 5);
      const med = MILLIONAIRE_QUESTIONS.filter(q => q.difficultyTier === 'medium').slice(0, 5);
      const hard = MILLIONAIRE_QUESTIONS.filter(q => q.difficultyTier === 'hard').slice(0, 5);
      setActiveQuestions([...easy, ...med, ...hard]);
    } else {
      // Random mode
      const easy = [...MILLIONAIRE_QUESTIONS.filter(q => q.difficultyTier === 'easy')].sort(() => Math.random() - 0.5).slice(0, 5);
      const med = [...MILLIONAIRE_QUESTIONS.filter(q => q.difficultyTier === 'medium')].sort(() => Math.random() - 0.5).slice(0, 5);
      const hard = [...MILLIONAIRE_QUESTIONS.filter(q => q.difficultyTier === 'hard')].sort(() => Math.random() - 0.5).slice(0, 5);
      setActiveQuestions([...easy, ...med, ...hard]);
    }
  };

  const handleOptionClick = (idx: number) => {
    if (gameState !== 'idle' || eliminatedOptions.includes(idx)) return;
    const q = activeQuestions[qIndex];
    
    setSelectedOption(idx);
    setGameState('suspense');
    
    // Play suspense hum
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    suspenseAudioRef.current = startSuspense();

    // 3 seconds of suspense
    setTimeout(() => {
      if (suspenseAudioRef.current) {
        suspenseAudioRef.current.stop();
        suspenseAudioRef.current = null;
      }
      
      if (idx === q.correctIndex) {
        setGameState('correct');
        playCorrect();
      } else {
        setGameState('wrong');
        playWrong();
      }
    }, 3000);
  };

  const handleNextQuestion = () => {
    if (qIndex === activeQuestions.length - 1) {
      setGameState('won');
    } else {
      setQIndex(prev => prev + 1);
      setGameState('idle');
      setSelectedOption(null);
      setEliminatedOptions([]);
    }
  };

  const handleUse5050 = () => {
    if (used5050 || gameState !== 'idle') return;
    const q = activeQuestions[qIndex];
    const incorrectIndices = [0, 1, 2, 3].filter(i => i !== q.correctIndex);
    
    // Shuffle and pick 2
    for (let i = incorrectIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [incorrectIndices[i], incorrectIndices[j]] = [incorrectIndices[j], incorrectIndices[i]];
    }
    
    setEliminatedOptions([incorrectIndices[0], incorrectIndices[1]]);
    setUsed5050(true);
  };

  const handleUseAskClass = () => {
    if (usedAskClass || gameState !== 'idle') return;
    setShowAskClassModal(true);
    setUsedAskClass(true);
  };

  const resetToMenu = () => {
    setGameMode('menu');
    setGameState('idle');
  };

  // -----------------------------------------------------
  // RENDER MENU SCREEN
  // -----------------------------------------------------
  if (gameMode === 'menu') {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0f172a] to-[#0f172a] pointer-events-none" />
        
        <div className="z-10 flex flex-col items-center max-w-4xl text-center">
          <CircleDollarSign className="w-24 h-24 text-amber-400 mb-6 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]" />
          <h1 className={`text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 tracking-wider mb-4 ${isKh ? 'font-khmer' : ''}`}>
            {isKh ? 'កម្មវិធីសេដ្ឋីប្រាក់លាន' : 'THE MILLIONAIRE CHALLENGE'}
          </h1>
          <p className={`text-xl text-slate-300 mb-12 max-w-2xl ${isKh ? 'font-khmer' : ''}`}>
            {isKh 
              ? 'ជ្រើសរើសទម្រង់ហ្គេមរបស់អ្នក។ អ្នកអាចលេងជាមួយសំណួរចាស់ៗ ឬជ្រើសរើសរបៀបថ្មីដែលរើសសំណួរដោយចៃដន្យ។' 
              : 'Choose your game mode. Play the classic fixed 15 questions, or dive into a randomized marathon pulled from our massive question bank.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
            {/* Classic Mode Button */}
            <button
              onClick={() => startGame('classic')}
              className={`flex-1 flex flex-col items-center justify-center gap-4 p-8 rounded-3xl bg-blue-900/40 border border-blue-500/50 hover:bg-blue-800/60 hover:border-blue-400 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] group`}
            >
              <PlayCircle className="w-12 h-12 text-blue-400 group-hover:text-white transition-colors" />
              <div className="text-center">
                <h3 className={`text-2xl font-bold text-white mb-2 ${isKh ? 'font-khmer' : ''}`}>
                  {isKh ? 'របៀបធម្មតា (Classic)' : 'Classic Mode'}
                </h3>
                <p className={`text-blue-200 text-sm ${isKh ? 'font-khmer' : ''}`}>
                  {isKh ? 'លេងសំណួរដើមចំនួន ១៥ សំណួរ។' : 'Play the original fixed set of 15 questions.'}
                </p>
              </div>
            </button>

            {/* Random Marathon Mode Button */}
            <button
              onClick={() => startGame('random')}
              className={`flex-1 flex flex-col items-center justify-center gap-4 p-8 rounded-3xl bg-amber-900/40 border border-amber-500/50 hover:bg-amber-800/60 hover:border-amber-400 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(245,158,11,0.1)] hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] group`}
            >
              <Dices className="w-12 h-12 text-amber-400 group-hover:text-white transition-colors" />
              <div className="text-center">
                <h3 className={`text-2xl font-bold text-white mb-2 ${isKh ? 'font-khmer' : ''}`}>
                  {isKh ? 'របៀបចៃដន្យ (Random)' : 'Random Marathon'}
                </h3>
                <p className={`text-amber-200 text-sm ${isKh ? 'font-khmer' : ''}`}>
                  {isKh ? 'សំណួរថ្មីទាំង ១៥ ដែលជ្រើសរើសដោយចៃដន្យ។' : 'A fresh set of 15 questions randomly pulled from the bank.'}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------
  // RENDER WON SCREEN
  // -----------------------------------------------------
  if (gameState === 'won') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans">
        <Trophy className="w-32 h-32 text-yellow-400 mb-8 animate-bounce" />
        <h1 className={`text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 mb-6 text-center ${isKh ? 'font-khmer' : ''}`}>
          {isKh ? 'អ្នកក្លាយជាសេដ្ឋីប្រាក់លានហើយ!' : 'YOU ARE A MILLIONAIRE!'}
        </h1>
        <p className={`text-2xl text-slate-300 mb-12 text-center max-w-2xl ${isKh ? 'font-khmer' : ''}`}>
          {isKh ? 'អបអរសាទរ! អ្នកបានឆ្លើយត្រូវទាំង ១៥ សំណួរដោយជោគជ័យ។' : 'Congratulations! You successfully answered all 15 questions correctly.'}
        </p>
        <button 
          onClick={resetToMenu}
          className={`px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-xl shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all ${isKh ? 'font-khmer' : ''}`}
        >
          {isKh ? 'ត្រឡប់ទៅកាន់ម៉ឺនុយ' : 'BACK TO MENU'}
        </button>
      </div>
    );
  }

  // -----------------------------------------------------
  // RENDER GAME UI
  // -----------------------------------------------------
  const q = activeQuestions[qIndex];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans flex flex-col overflow-hidden relative">
      
      {/* Background radial gradient typical of game shows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0f172a] to-[#0f172a] pointer-events-none" />
      
      {/* Header */}
      <header className="border-b border-blue-900/50 bg-slate-900/80 backdrop-blur-md relative z-10 flex justify-between items-center px-6 py-4">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <CircleDollarSign className="w-8 h-8 text-amber-400" />
            <h1 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 tracking-wider ${isKh ? 'font-khmer' : ''}`}>
              {isKh ? 'កម្មវិធីសេដ្ឋីប្រាក់លាន' : 'THE MILLIONAIRE CHALLENGE'}
            </h1>
          </div>
          <button 
            onClick={resetToMenu}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            {isKh ? 'ចាកចេញ' : 'Quit Game'}
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8 flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* Left Column: Projector UI */}
        <div className="flex-1 flex flex-col items-center justify-between gap-8 h-full">
          
          {/* Top Bar: Category & Lifelines */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-blue-950/50 border border-blue-800/50 rounded-2xl backdrop-blur-sm">
            <div className={`px-4 py-2 bg-blue-900/80 text-blue-200 rounded-lg text-lg font-bold uppercase tracking-widest ${isKh ? 'font-khmer' : ''}`}>
              {isKh ? q?.categoryKh : q?.categoryEn}
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={handleUse5050}
                disabled={used5050 || gameState !== 'idle'}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold border-2 transition-all ${
                  used5050 
                    ? 'border-slate-700 text-slate-600 bg-slate-900 cursor-not-allowed' 
                    : 'border-amber-400 text-amber-400 hover:bg-amber-400/20 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                }`}
              >
                <SplitSquareHorizontal className="w-5 h-5" />
                50:50
              </button>
              
              <button 
                onClick={handleUseAskClass}
                disabled={usedAskClass || gameState !== 'idle'}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold border-2 transition-all ${
                  usedAskClass 
                    ? 'border-slate-700 text-slate-600 bg-slate-900 cursor-not-allowed' 
                    : 'border-sky-400 text-sky-400 hover:bg-sky-400/20 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                } ${isKh ? 'font-khmer' : ''}`}
              >
                <Users className="w-5 h-5" />
                {isKh ? 'សួរថ្នាក់' : 'Class'}
              </button>
            </div>
          </div>

          {/* Question Box */}
          <div className="w-full mt-auto mb-8">
            <div className="w-full bg-gradient-to-b from-blue-900 to-blue-950 border-4 border-blue-500 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(59,130,246,0.2)] flex items-center justify-center min-h-[250px] relative">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-blue-500 rounded-r-full" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-blue-500 rounded-l-full" />
              
              <h2 className={`text-3xl md:text-5xl text-center font-bold text-white leading-tight ${isKh ? 'font-khmer leading-normal' : ''}`}>
                {isKh ? q?.questionKh : q?.questionEn}
              </h2>
            </div>
          </div>

          {/* Answers Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-auto pb-8">
            {[0, 1, 2, 3].map((idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              const isEliminated = eliminatedOptions.includes(idx);
              const isSelected = selectedOption === idx;
              const isCorrect = idx === q?.correctIndex;
              
              let bgStyle = 'bg-gradient-to-b from-blue-900 to-blue-950 border-blue-600 hover:border-amber-400';
              let textStyle = 'text-white';
              let letterStyle = 'text-amber-400';
              
              if (isEliminated) {
                bgStyle = 'bg-slate-900/50 border-slate-800 opacity-30 cursor-not-allowed';
                textStyle = 'text-slate-600';
                letterStyle = 'text-slate-600';
              } else if (isSelected && gameState === 'suspense') {
                bgStyle = 'bg-gradient-to-b from-amber-500 to-amber-600 border-amber-300 animate-pulse';
                textStyle = 'text-slate-900';
                letterStyle = 'text-slate-900';
              } else if (gameState === 'correct') {
                if (isCorrect) {
                  bgStyle = 'bg-gradient-to-b from-emerald-500 to-emerald-600 border-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-[pulse_1s_ease-in-out_infinite]';
                  textStyle = 'text-slate-900';
                  letterStyle = 'text-slate-900';
                }
              } else if (gameState === 'wrong') {
                if (isCorrect) {
                  bgStyle = 'bg-gradient-to-b from-emerald-500 to-emerald-600 border-emerald-300';
                  textStyle = 'text-slate-900';
                  letterStyle = 'text-slate-900';
                } else if (isSelected) {
                  bgStyle = 'bg-gradient-to-b from-rose-500 to-rose-600 border-rose-300 shadow-[0_0_30px_rgba(225,29,72,0.5)]';
                  textStyle = 'text-white';
                  letterStyle = 'text-rose-200';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isEliminated || gameState !== 'idle'}
                  onClick={() => handleOptionClick(idx)}
                  className={`w-full relative px-6 py-5 md:py-6 border-2 rounded-full flex items-center transition-all ${bgStyle} ${!isEliminated && gameState === 'idle' ? 'cursor-pointer' : ''}`}
                >
                  <span className={`text-2xl font-bold mr-6 ${letterStyle}`}>{letter}:</span>
                  <span className={`text-2xl md:text-3xl font-bold text-left ${textStyle} ${isKh ? 'font-khmer' : ''}`}>
                    {isEliminated ? '' : (isKh ? q?.optionsKh[idx] : q?.optionsEn[idx])}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Area (Next button) */}
          <div className="h-20 w-full flex justify-center items-center">
            {gameState === 'correct' && (
              <button
                onClick={handleNextQuestion}
                className={`px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-full font-bold text-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 ${isKh ? 'font-khmer' : ''}`}
              >
                {isKh ? 'សំណួរបន្ទាប់' : 'NEXT QUESTION'}
                <ArrowRight className="w-6 h-6" />
              </button>
            )}
            
            {gameState === 'wrong' && (
              <button
                onClick={resetToMenu}
                className={`px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-bold text-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 ${isKh ? 'font-khmer' : ''}`}
              >
                <XCircle className="w-6 h-6" />
                {isKh ? 'ចាញ់ហើយ! ត្រឡប់ទៅម៉ឺនុយ' : 'GAME OVER! BACK TO MENU'}
              </button>
            )}
          </div>
          
        </div>

        {/* Right Column: Money Ladder */}
        <div className="hidden lg:flex w-[300px] flex-col gap-1 p-6 bg-blue-950/40 rounded-3xl border border-blue-800/50">
          {PRIZE_LADDER.map((prize, idx) => {
            const level = PRIZE_LADDER.length - 1 - idx;
            const isCurrent = level === qIndex;
            const isPassed = level < qIndex;
            const isSafe = level === 4 || level === 9 || level === 14; 
            
            let style = 'text-blue-300';
            if (isCurrent) style = 'bg-amber-500 text-slate-900 scale-105 shadow-[0_0_15px_rgba(251,191,36,0.4)]';
            else if (isPassed) style = 'text-amber-600/50';
            else if (isSafe) style = 'text-white';

            return (
              <div key={level} className={`flex justify-between items-center px-4 py-2 rounded-full font-mono text-xl font-bold transition-all ${style}`}>
                <span className="opacity-70">{level + 1}</span>
                <div className="flex items-center gap-2">
                  {isSafe && !isCurrent && !isPassed && <span className="w-2 h-2 rounded-full bg-white opacity-50" />}
                  <span>{prize}</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Ask the Class Modal */}
      {showAskClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl max-w-md w-full shadow-2xl flex flex-col items-center text-center">
            <Users className="w-16 h-16 text-sky-400 mb-6" />
            <h3 className={`text-2xl font-bold text-white mb-4 ${isKh ? 'font-khmer' : ''}`}>
              {isKh ? 'សួរថ្នាក់' : 'Ask the Class'}
            </h3>
            <p className={`text-slate-300 mb-8 ${isKh ? 'font-khmer' : ''}`}>
              {isKh 
                ? 'លោកគ្រូ/អ្នកគ្រូ សូមសួរអោយសិស្សក្នុងថ្នាក់លើកដៃឡើង ថាតើពួកគេជ្រើសរើសចម្លើយមួយណា!' 
                : 'Teacher, please ask the classroom to raise their hands and vote on which answer they think is correct!'}
            </p>
            <button
              onClick={() => setShowAskClassModal(false)}
              className={`w-full py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold ${isKh ? 'font-khmer' : ''}`}
            >
              {isKh ? 'បិទផ្ទាំងនេះ' : 'CLOSE POLL'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
