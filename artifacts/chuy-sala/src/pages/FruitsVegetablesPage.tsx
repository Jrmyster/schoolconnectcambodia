import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, ChevronLeft, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

interface Produce {
  id: number;
  english: string;
  phonetic: string;
  khmer: string;
  emoji: string;
}

const PRODUCE_DATA: Produce[] = [
  { id: 1, english: 'Mango', phonetic: '/ˈmæŋ.ɡoʊ/', khmer: 'ស្វាយ', emoji: '🥭' },
  { id: 2, english: 'Banana', phonetic: '/bəˈnæn.ə/', khmer: 'ចេក', emoji: '🍌' },
  { id: 3, english: 'Coconut', phonetic: '/ˈkoʊ.kə.nʌt/', khmer: 'ដូង', emoji: '🥥' },
  { id: 4, english: 'Watermelon', phonetic: '/ˈwɔː.tərˌmɛl.ən/', khmer: 'ឪឡឹក', emoji: '🍉' },
  { id: 5, english: 'Pineapple', phonetic: '/ˈpaɪnˌæp.əl/', khmer: 'ម្នាស់', emoji: '🍍' },
  { id: 6, english: 'Orange', phonetic: '/ˈɔːr.ɪndʒ/', khmer: 'ក្រូចពោធិ៍សាត់', emoji: '🍊' },
  { id: 7, english: 'Lime', phonetic: '/laɪm/', khmer: 'ក្រូចឆ្មារ', emoji: '🍋' },
  { id: 8, english: 'Grape', phonetic: '/ɡreɪp/', khmer: 'ទំពាំងបាយជូរ', emoji: '🍇' },
  { id: 9, english: 'Strawberry', phonetic: '/ˈstrɔː.bər.i/', khmer: 'ស្ត្របឺរី', emoji: '🍓' },
  { id: 10, english: 'Peach', phonetic: '/piːtʃ/', khmer: 'ផ្លែប៉េស', emoji: '🍑' },
  { id: 11, english: 'Tomato', phonetic: '/təˈmeɪ.toʊ/', khmer: 'ប៉េងប៉ោះ', emoji: '🍅' },
  { id: 12, english: 'Eggplant', phonetic: '/ˈɛɡ.plænt/', khmer: 'ត្រប់', emoji: '🍆' },
  { id: 13, english: 'Corn', phonetic: '/kɔːrn/', khmer: 'ពោត', emoji: '🌽' },
  { id: 14, english: 'Carrot', phonetic: '/ˈkær.ət/', khmer: 'ការ៉ុត', emoji: '🥕' },
  { id: 15, english: 'Potato', phonetic: '/pəˈteɪ.toʊ/', khmer: 'ដំឡូងបារាំង', emoji: '🥔' },
  { id: 16, english: 'Broccoli', phonetic: '/ˈbrɒk.əl.i/', khmer: 'ខាត់ណាខៀវ', emoji: '🥦' },
  { id: 17, english: 'Onion', phonetic: '/ˈʌn.jən/', khmer: 'ខ្ទឹមបារាំង', emoji: '🧅' },
  { id: 18, english: 'Garlic', phonetic: '/ˈɡɑːr.lɪk/', khmer: 'ខ្ទឹមស', emoji: '🧄' },
  { id: 19, english: 'Cucumber', phonetic: '/ˈkjuː.kʌm.bər/', khmer: 'ត្រសក់', emoji: '🥒' },
  { id: 20, english: 'Morning Glory', phonetic: '/ˈmɔːr.nɪŋ ˈɡlɔːr.i/', khmer: 'ត្រកួន', emoji: '🥬' },
  { id: 21, english: 'Chili Pepper', phonetic: '/ˈtʃɪl.i ˈpɛp.ər/', khmer: 'ម្ទេស', emoji: '🌶️' },
  { id: 22, english: 'Mushroom', phonetic: '/ˈmʌʃ.ruːm/', khmer: 'ផ្សិត', emoji: '🍄' },
];

const Flashcard: React.FC<{ item: Produce }> = ({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent flipping when clicking the speaker button
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(item.english);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      className="group perspective-1000 w-full aspect-square cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front of Card */}
        <div className="absolute w-full h-full backface-hidden rounded-3xl bg-white border-4 border-emerald-100 shadow-xl flex flex-col items-center justify-center p-6 gap-4 hover:border-emerald-300 hover:shadow-emerald-200/50 transition-all">
          <div className="text-7xl md:text-8xl select-none filter drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">
            {item.emoji}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center tracking-tight">
            {item.english}
          </h2>
          <div className="absolute top-4 right-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"></path><path d="M21 13a9 9 0 1 1-3-7.7L21 8"></path></svg>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute w-full h-full backface-hidden rounded-3xl bg-emerald-50 border-4 border-emerald-200 shadow-xl flex flex-col items-center justify-center p-6 gap-6 rotate-y-180">
          <div className="text-center space-y-2">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-600 font-khmer">
              {item.khmer}
            </h2>
            <p className="text-lg md:text-xl text-slate-500 font-medium">
              {item.phonetic}
            </p>
          </div>

          <Button
            onClick={handleSpeak}
            variant="default"
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl bg-emerald-500 hover:bg-emerald-600 text-white gap-2 mt-4 transform hover:scale-105 transition-all"
          >
            <Volume2 className="w-5 h-5" />
            <span className="font-bold">Listen</span>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default function FruitsVegetablesPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-200 text-slate-600">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight flex items-center gap-4">
              Fruits & Vegetables
              <span className="text-4xl">🥗</span>
            </h1>
            <p className="text-lg text-slate-600 mt-2 font-medium">
              Tap a card to flip it and learn the Khmer translation!
            </p>
          </div>
        </div>

        {/* Flashcard Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {PRODUCE_DATA.map((item) => (
            <Flashcard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
