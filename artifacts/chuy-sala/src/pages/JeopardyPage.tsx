import React, { useState } from 'react';
import { useLanguageStore } from '@/store/use-language';
import { JEOPARDY_DATA, JeopardyClue } from '@/data/jeopardy-questions';
import { MonitorPlay, X, RotateCcw, CheckCircle } from 'lucide-react';

export default function JeopardyPage() {
  const { language } = useLanguageStore();
  const isKh = language === 'kh';

  const [completedTiles, setCompletedTiles] = useState<string[]>([]);
  const [activeClue, setActiveClue] = useState<JeopardyClue | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleTileClick = (clue: JeopardyClue) => {
    if (completedTiles.includes(clue.id)) return;
    setActiveClue(clue);
    setIsFlipped(false);
  };

  const handleMarkComplete = () => {
    if (activeClue) {
      setCompletedTiles(prev => [...prev, activeClue.id]);
    }
    setActiveClue(null);
    setIsFlipped(false);
  };

  const handleClose = () => {
    setActiveClue(null);
    setIsFlipped(false);
  };

  return (
    <div className="min-h-screen bg-[#064e3b] text-slate-200 font-sans flex flex-col relative overflow-hidden">
      
      {/* Background dark green radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-[#064e3b] to-[#022c22] pointer-events-none" />
      
      {/* Header */}
      <header className="border-b border-emerald-800/50 bg-[#022c22]/80 backdrop-blur-md relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MonitorPlay className="w-8 h-8 text-amber-400" />
            <h1 className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 tracking-wider uppercase ${isKh ? 'font-khmer' : ''}`}>
              {isKh ? 'ទូកចម្លើយ' : 'CLASSROOM JEOPARDY'}
            </h1>
          </div>
          <button 
            onClick={() => setCompletedTiles([])}
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            {isKh ? 'ចាប់ផ្ដើមឡើងវិញ' : 'Reset Board'}
          </button>
        </div>
      </header>

      {/* Main Board Layout */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col">
        
        {/* Jeopardy Grid */}
        <div className="flex-1 grid grid-cols-5 gap-2 md:gap-4 lg:gap-6 w-full h-full">
          
          {/* Column Headers */}
          {JEOPARDY_DATA.map(category => (
            <div key={category.id} className="flex flex-col gap-2 md:gap-4 lg:gap-6">
              
              {/* Category Header Tile */}
              <div className="bg-[#0f766e] border-b-4 border-[#042f2e] rounded-xl flex items-center justify-center p-2 md:p-4 text-center h-20 md:h-28 lg:h-32 shadow-[0_4px_15px_rgba(4,47,46,0.5)]">
                <h2 className={`text-sm md:text-lg lg:text-2xl font-black text-white uppercase tracking-widest leading-tight ${isKh ? 'font-khmer' : ''}`}>
                  {isKh ? category.nameKh : category.nameEn}
                </h2>
              </div>
              
              {/* Point Tiles */}
              {category.clues.map(clue => {
                const isCompleted = completedTiles.includes(clue.id);
                
                return (
                  <button
                    key={clue.id}
                    disabled={isCompleted}
                    onClick={() => handleTileClick(clue)}
                    className={`h-20 md:h-24 lg:h-32 xl:h-40 rounded-xl flex items-center justify-center transition-all ${
                      isCompleted 
                        ? 'bg-emerald-950/40 border border-emerald-900/30 opacity-40 cursor-not-allowed' 
                        : 'bg-[#115e59] border border-[#14b8a6]/30 hover:bg-[#0d9488] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] cursor-pointer shadow-lg'
                    }`}
                  >
                    {!isCompleted && (
                      <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-amber-400 drop-shadow-md">
                        {clue.points}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
          
        </div>
      </main>

      {/* Full Screen Clue Modal */}
      {activeClue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#022c22]/95 backdrop-blur-md p-4 md:p-12 animate-in fade-in duration-200">
          <div className="max-w-6xl w-full h-full max-h-[800px] flex flex-col items-center justify-center relative">
            
            <button 
              onClick={handleClose}
              className="absolute top-0 right-0 p-4 text-emerald-500 hover:text-white transition-colors"
            >
              <X className="w-10 h-10" />
            </button>
            
            <div className="flex-1 w-full flex flex-col items-center justify-center">
              {/* The Clue / Answer Text */}
              <h1 className={`text-5xl md:text-7xl lg:text-8xl text-center font-bold text-white leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] ${isKh ? 'font-khmer leading-normal' : ''}`}>
                {isFlipped 
                  ? (isKh ? activeClue.answerKh : activeClue.answerEn)
                  : (isKh ? activeClue.clueKh : activeClue.clueEn)}
              </h1>
            </div>

            {/* Modal Controls */}
            <div className="mt-12 flex gap-6">
              {!isFlipped ? (
                <button
                  onClick={() => setIsFlipped(true)}
                  className={`px-8 py-4 bg-amber-500 hover:bg-amber-400 text-amber-950 rounded-full font-bold text-2xl uppercase tracking-wider shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all ${isKh ? 'font-khmer' : ''}`}
                >
                  {isKh ? 'បង្ហាញចម្លើយ' : 'REVEAL ANSWER'}
                </button>
              ) : (
                <button
                  onClick={handleMarkComplete}
                  className={`flex items-center gap-3 px-8 py-4 bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-full font-bold text-2xl uppercase tracking-wider shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all ${isKh ? 'font-khmer' : ''}`}
                >
                  <CheckCircle className="w-8 h-8" />
                  {isKh ? 'ត្រឹមត្រូវ (សម្គាល់ថាបានលេង)' : 'MARK COMPLETE'}
                </button>
              )}
            </div>
            
          </div>
        </div>
      )}
      
    </div>
  );
}
