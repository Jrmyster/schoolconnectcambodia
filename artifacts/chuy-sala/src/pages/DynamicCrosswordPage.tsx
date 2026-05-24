import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguageStore } from '@/store/use-language';
import { generateCrossword, CrosswordGrid, PlacedWord } from '@/utils/crosswordGenerator';
import CROSSWORD_BANK from '@/data/crossword-bank.json';
import { Blocks, CheckCircle2, RotateCcw } from 'lucide-react';

export default function DynamicCrosswordPage() {
  const { language } = useLanguageStore();
  const isKh = language === 'kh';

  const [crossword, setCrossword] = useState<CrosswordGrid | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [activeDirection, setActiveDirection] = useState<'across' | 'down'>('across');
  const [activeWordStr, setActiveWordStr] = useState<string | null>(null);
  const [checkMode, setCheckMode] = useState(false);

  const inputsRef = useRef<Record<string, HTMLInputElement | null>>({});

  const initPuzzle = useCallback(() => {
    const cw = generateCrossword(CROSSWORD_BANK, 20);
    setCrossword(cw);
    setUserAnswers({});
    setCheckMode(false);
    setActiveWordStr(null);
    setActiveDirection('across');
  }, []);

  useEffect(() => {
    initPuzzle();
  }, [initPuzzle]);

  const handleCellClick = (r: number, c: number, cellWordIds: string[]) => {
    setCheckMode(false); // Clear check mode on interaction
    
    if (cellWordIds.length === 0) return;

    if (activeWordStr && cellWordIds.includes(activeWordStr)) {
      // If we clicked a cell in the currently active word, toggle direction if there's an intersecting word
      const otherWord = cellWordIds.find(id => id !== activeWordStr);
      if (otherWord) {
        setActiveWordStr(otherWord);
        const w = crossword?.placedWords.find(w => w.word === otherWord);
        if (w) setActiveDirection(w.direction);
      }
    } else {
      // Clicked a completely new cell/word
      // Try to match current direction first
      let selectedWordStr = cellWordIds[0];
      const wordsAtCell = crossword?.placedWords.filter(w => cellWordIds.includes(w.word)) || [];
      const matchDir = wordsAtCell.find(w => w.direction === activeDirection);
      
      if (matchDir) {
        selectedWordStr = matchDir.word;
      } else if (wordsAtCell.length > 0) {
        selectedWordStr = wordsAtCell[0].word;
        setActiveDirection(wordsAtCell[0].direction);
      }
      
      setActiveWordStr(selectedWordStr);
    }
  };

  const handleInputChange = (r: number, c: number, value: string) => {
    const char = value.slice(-1).toUpperCase(); // Take last character typed
    if (!/^[A-Z]*$/.test(char)) return; // Only allow A-Z

    setUserAnswers(prev => ({ ...prev, [`${r}-${c}`]: char }));
    setCheckMode(false);

    if (char) {
      // Auto-advance
      let nextR = activeDirection === 'down' ? r + 1 : r;
      let nextC = activeDirection === 'across' ? c + 1 : c;
      const nextKey = `${nextR}-${nextC}`;
      
      if (inputsRef.current[nextKey]) {
        inputsRef.current[nextKey]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, r: number, c: number) => {
    if (e.key === 'Backspace') {
      const currentVal = userAnswers[`${r}-${c}`];
      if (!currentVal) {
        // Move back
        let prevR = activeDirection === 'down' ? r - 1 : r;
        let prevC = activeDirection === 'across' ? c - 1 : c;
        const prevKey = `${prevR}-${prevC}`;
        if (inputsRef.current[prevKey]) {
          inputsRef.current[prevKey]?.focus();
        }
      } else {
        setUserAnswers(prev => ({ ...prev, [`${r}-${c}`]: '' }));
        setCheckMode(false);
      }
      e.preventDefault();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      let nextR = r;
      let nextC = c;
      if (e.key === 'ArrowRight') nextC++;
      if (e.key === 'ArrowLeft') nextC--;
      if (e.key === 'ArrowDown') nextR++;
      if (e.key === 'ArrowUp') nextR--;
      
      const nextKey = `${nextR}-${nextC}`;
      if (inputsRef.current[nextKey]) {
        inputsRef.current[nextKey]?.focus();
        // Update active word based on new cell
        const cell = crossword?.cells[nextR][nextC];
        if (cell && cell.wordIds.length > 0) {
           handleCellClick(nextR, nextC, cell.wordIds);
        }
      }
    }
  };

  if (!crossword) return null;

  const acrossWords = crossword.placedWords.filter(w => w.direction === 'across').sort((a, b) => a.number - b.number);
  const downWords = crossword.placedWords.filter(w => w.direction === 'down').sort((a, b) => a.number - b.number);

  return (
    <div className="min-h-screen bg-[#064e3b] text-slate-200 font-sans flex flex-col relative overflow-hidden">
      {/* Background dark green radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-[#064e3b] to-[#022c22] pointer-events-none" />
      
      <header className="border-b border-emerald-800/50 bg-[#022c22]/80 backdrop-blur-md relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Blocks className="w-8 h-8 text-amber-400" />
            <h1 className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 tracking-wider uppercase ${isKh ? 'font-khmer' : ''}`}>
              {isKh ? 'ល្បែងពាក្យខ្វែង' : 'DYNAMIC CROSSWORD'}
            </h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setCheckMode(true)}
              className="flex items-center gap-2 text-white bg-[#14b8a6] hover:bg-[#0d9488] px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg"
            >
              <CheckCircle2 className="w-4 h-4" />
              {isKh ? 'ពិនិត្យចម្លើយ' : 'Check Puzzle'}
            </button>
            <button 
              onClick={initPuzzle}
              className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900/30 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              {isKh ? 'បង្កើតថ្មី' : 'New Puzzle'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col lg:flex-row gap-8 overflow-y-auto">
        
        {/* Crossword Grid Container */}
        <div className="flex-none lg:w-[60%] flex items-start justify-center">
          <div className="bg-[#022c22]/60 p-4 rounded-xl border border-emerald-800/50 shadow-xl overflow-x-auto w-full max-w-4xl">
            <div 
              className="grid gap-0 max-w-full"
              style={{ gridTemplateColumns: `repeat(${crossword.size}, minmax(0, 1fr))` }}
            >
              {crossword.cells.map((row, rIndex) => 
                row.map((cell, cIndex) => {
                  if (!cell) {
                    return <div key={`${rIndex}-${cIndex}`} className="aspect-square bg-transparent" />;
                  }

                  const isActiveWord = activeWordStr && cell.wordIds.includes(activeWordStr);
                  const userVal = userAnswers[`${rIndex}-${cIndex}`] || '';
                  
                  let cellBg = 'bg-white text-emerald-950';
                  let cellBorder = 'border-slate-300';
                  
                  if (isActiveWord) {
                    cellBg = 'bg-amber-100 text-emerald-950';
                    cellBorder = 'border-amber-400 z-10';
                  }

                  if (checkMode && userVal) {
                    if (userVal === cell.letter) {
                      cellBg = 'bg-emerald-200 text-emerald-900';
                      cellBorder = 'border-emerald-500';
                    } else {
                      cellBg = 'bg-red-200 text-red-900';
                      cellBorder = 'border-red-500';
                    }
                  }

                  return (
                    <div key={`${rIndex}-${cIndex}`} className="relative aspect-square">
                      {cell.number && (
                        <span className="absolute top-0.5 left-0.5 text-[8px] sm:text-[10px] font-bold text-slate-500 z-20 leading-none">
                          {cell.number}
                        </span>
                      )}
                      <input
                        ref={el => { inputsRef.current[`${rIndex}-${cIndex}`] = el; }}
                        className={`w-full h-full text-center font-bold text-sm sm:text-base md:text-xl lg:text-2xl uppercase border ${cellBorder} ${cellBg} focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-amber-50 transition-colors shadow-sm`}
                        value={userVal}
                        onChange={e => handleInputChange(rIndex, cIndex, e.target.value)}
                        onKeyDown={e => handleKeyDown(e, rIndex, cIndex)}
                        onClick={() => handleCellClick(rIndex, cIndex, cell.wordIds)}
                        maxLength={1}
                        spellCheck={false}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Clues Panel */}
        <div className="flex-1 flex flex-col gap-6 h-[800px]">
          {/* Across */}
          <div className="flex-1 bg-[#022c22]/80 backdrop-blur-md rounded-xl border border-emerald-800/50 overflow-hidden flex flex-col">
            <div className="bg-[#0f766e] px-4 py-3 border-b border-[#042f2e]">
              <h2 className={`font-bold text-white uppercase tracking-wider ${isKh ? 'font-khmer' : ''}`}>
                {isKh ? 'ផ្ដេក (Across)' : 'Across'}
              </h2>
            </div>
            <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
              <ul className="space-y-3">
                {acrossWords.map(w => {
                  const isActive = w.word === activeWordStr;
                  return (
                    <li 
                      key={w.word}
                      onClick={() => {
                        setActiveWordStr(w.word);
                        setActiveDirection('across');
                        // Focus first cell
                        const key = `${w.row}-${w.col}`;
                        inputsRef.current[key]?.focus();
                      }}
                      className={`flex gap-3 p-2 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-emerald-800/60 text-amber-300' : 'hover:bg-emerald-900/40 text-slate-300'}`}
                    >
                      <span className="font-bold shrink-0">{w.number}.</span>
                      <span className={isKh ? 'font-khmer text-sm leading-relaxed' : 'text-sm'}>
                        {isKh ? w.clueKm : w.clueEn}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Down */}
          <div className="flex-1 bg-[#022c22]/80 backdrop-blur-md rounded-xl border border-emerald-800/50 overflow-hidden flex flex-col">
            <div className="bg-[#0f766e] px-4 py-3 border-b border-[#042f2e]">
              <h2 className={`font-bold text-white uppercase tracking-wider ${isKh ? 'font-khmer' : ''}`}>
                {isKh ? 'បញ្ឈរ (Down)' : 'Down'}
              </h2>
            </div>
            <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
              <ul className="space-y-3">
                {downWords.map(w => {
                  const isActive = w.word === activeWordStr;
                  return (
                    <li 
                      key={w.word}
                      onClick={() => {
                        setActiveWordStr(w.word);
                        setActiveDirection('down');
                        // Focus first cell
                        const key = `${w.row}-${w.col}`;
                        inputsRef.current[key]?.focus();
                      }}
                      className={`flex gap-3 p-2 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-emerald-800/60 text-amber-300' : 'hover:bg-emerald-900/40 text-slate-300'}`}
                    >
                      <span className="font-bold shrink-0">{w.number}.</span>
                      <span className={isKh ? 'font-khmer text-sm leading-relaxed' : 'text-sm'}>
                        {isKh ? w.clueKm : w.clueEn}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
