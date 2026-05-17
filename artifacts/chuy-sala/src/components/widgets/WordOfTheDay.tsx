import { useState, useEffect } from "react";
import { useLanguageStore } from "@/store/use-language";
import { Volume2, BookOpen, Quote, Sparkles } from "lucide-react";
import { WORD_OF_THE_DAY_DB } from "@/data/word-of-the-day";

export function WordOfTheDay() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  // Calculate day index based on UNIX epoch to ensure stable daily rotation
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    // 86400000 ms in a day
    const currentDay = Math.floor(Date.now() / 86400000);
    setWordIndex(currentDay % WORD_OF_THE_DAY_DB.length);
  }, []);

  const wordData = WORD_OF_THE_DAY_DB[wordIndex];

  const handleListen = () => {
    if (!("speechSynthesis" in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Construct the text to read
    const textToRead = `${wordData.word}. ${wordData.partOfSpeech}. Definition: ${wordData.definitionEn} First Example: ${wordData.example1En} Second Example: ${wordData.example2En}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "en-US";
    utterance.rate = 0.9; // Slightly slower for clarity
    
    window.speechSynthesis.speak(utterance);
  };

  if (!wordData) return null;

  return (
    <div className="bg-emerald-950 rounded-3xl border border-emerald-900/50 shadow-2xl overflow-hidden relative mb-10">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="p-6 sm:p-8 relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-emerald-800/50 pb-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <Sparkles className="w-5 h-5" />
            <span className={`text-sm font-bold tracking-widest uppercase ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {kh ? "ពាក្យកម្រិតខ្ពស់ប្រចាំថ្ងៃ" : "Advanced Word of the Day"}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Left Column: Word & Definition */}
          <div className="flex-1 space-y-6">
            <div>
              <div className="flex items-baseline gap-4 mb-2">
                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                  {wordData.word}
                </h2>
                <button
                  onClick={handleListen}
                  className="p-2 rounded-full bg-emerald-900/50 hover:bg-emerald-800 text-emerald-300 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  title="Listen to pronunciation and examples"
                  aria-label="Listen to word and examples"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>
              <div className="flex items-center gap-3 text-emerald-300/80 font-mono text-sm">
                <span>{wordData.phonetic}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-800" />
                <span className="italic">{wordData.partOfSpeech}</span>
              </div>
            </div>

            <div className="bg-emerald-900/30 rounded-2xl p-5 border border-emerald-800/50">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-emerald-50 text-lg leading-relaxed">
                    {wordData.definitionEn}
                  </p>
                  {kh && (
                    <p className="text-emerald-200/70 font-khmer mt-3 text-sm leading-loose border-t border-emerald-800/50 pt-3">
                      {wordData.definitionKh}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Examples */}
          <div className="flex-1 w-full space-y-4">
            <h3 className={`text-sm font-bold text-emerald-500 uppercase tracking-widest ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {kh ? "ឧទាហរណ៍ក្នុងសំណេរ" : "Academic Examples"}
            </h3>
            
            <div className="space-y-4">
              <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800">
                <div className="flex gap-3">
                  <Quote className="w-4 h-4 text-slate-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-slate-200 leading-relaxed italic font-serif">
                      "{wordData.example1En}"
                    </p>
                    {kh && (
                      <p className="text-slate-400 font-khmer text-sm mt-2">
                        {wordData.example1Kh}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800">
                <div className="flex gap-3">
                  <Quote className="w-4 h-4 text-slate-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-slate-200 leading-relaxed italic font-serif">
                      "{wordData.example2En}"
                    </p>
                    {kh && (
                      <p className="text-slate-400 font-khmer text-sm mt-2">
                        {wordData.example2Kh}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
