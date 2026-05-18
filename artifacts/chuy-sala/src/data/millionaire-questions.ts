export type DifficultyTier = 'easy' | 'medium' | 'hard';

export interface MillionaireQuestion {
  id: string;
  categoryEn: string;
  categoryKh: string;
  questionEn: string;
  questionKh: string;
  optionsEn: [string, string, string, string];
  optionsKh: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  difficultyTier: DifficultyTier;
}

export const PRIZE_LADDER = [
  "$100",
  "$200",
  "$300",
  "$500",
  "$1,000",
  "$2,000",
  "$4,000",
  "$8,000",
  "$16,000",
  "$32,000",
  "$64,000",
  "$125,000",
  "$250,000",
  "$500,000",
  "$1,000,000"
];

export const MILLIONAIRE_QUESTIONS: MillionaireQuestion[] = [
  // ── EASY TIER ──
  {
    id: "e1",
    categoryEn: "Biology", categoryKh: "ជីវវិទ្យា",
    questionEn: "Which organelle is known as the powerhouse of the cell?",
    questionKh: "តើសរីរាង្គកោសិកាមួយណាដែលត្រូវបានគេស្គាល់ថាជារោងចក្រថាមពលនៃកោសិកា?",
    optionsEn: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
    optionsKh: ["ណ្វៃយ៉ូ (Nucleus)", "មីតូកុងទ្រី (Mitochondria)", "រីបូសូម (Ribosome)", "ក្លរ៉ូប្លាស (Chloroplast)"],
    correctIndex: 1, difficultyTier: "easy"
  },
  {
    id: "e2",
    categoryEn: "English", categoryKh: "ភាសាអង់គ្លេស",
    questionEn: "Which of the following words is a noun?",
    questionKh: "តើពាក្យមួយណាខាងក្រោមនេះជានាម?",
    optionsEn: ["Quickly", "Beautiful", "Apple", "Run"],
    optionsKh: ["Quickly (យ៉ាងលឿន)", "Beautiful (ស្រស់ស្អាត)", "Apple (ផ្លែប៉ោម)", "Run (រត់)"],
    correctIndex: 2, difficultyTier: "easy"
  },
  {
    id: "e3",
    categoryEn: "Chemistry", categoryKh: "គីមីវិទ្យា",
    questionEn: "What is the chemical formula for water?",
    questionKh: "តើរូបមន្តគីមីនៃទឹកគឺជាអ្វី?",
    optionsEn: ["CO2", "O2", "NaCl", "H2O"],
    optionsKh: ["CO2", "O2", "NaCl", "H2O"],
    correctIndex: 3, difficultyTier: "easy"
  },
  {
    id: "e4",
    categoryEn: "History", categoryKh: "ប្រវត្តិវិទ្យា",
    questionEn: "Which famous temple complex is located in Cambodia?",
    questionKh: "តើប្រាសាទដ៏ល្បីល្បាញមួយណាដែលមានទីតាំងនៅប្រទេសកម្ពុជា?",
    optionsEn: ["Angkor Wat", "Taj Mahal", "Machu Picchu", "Pyramids of Giza"],
    optionsKh: ["ប្រាសាទអង្គរវត្ត", "ប្រាសាទតាហ្កម៉ាហាល់", "ម៉ាជូពេជូ", "ពីរ៉ាមីតហ្គីហ្សា"],
    correctIndex: 0, difficultyTier: "easy"
  },
  {
    id: "e5",
    categoryEn: "Physics", categoryKh: "រូបវិទ្យា",
    questionEn: "What fundamental force keeps the planets in orbit around the Sun?",
    questionKh: "តើកម្លាំងអ្វីដែលរក្សាភពឲ្យវិលជុំវិញព្រះអាទិត្យ?",
    optionsEn: ["Electromagnetism", "Strong Nuclear Force", "Gravity", "Friction"],
    optionsKh: ["អេឡិចត្រូម៉ាញេទិច", "កម្លាំងនុយក្លេអ៊ែរខ្លាំង", "ទំនាញផែនដី (Gravity)", "កម្លាំងកកិត"],
    correctIndex: 2, difficultyTier: "easy"
  },
  {
    id: "e6",
    categoryEn: "Biology", categoryKh: "ជីវវិទ្យា",
    questionEn: "What part of the plant conducts photosynthesis?",
    questionKh: "តើផ្នែកណានៃរុក្ខជាតិដែលធ្វើរស្មីសំយោគ?",
    optionsEn: ["Root", "Stem", "Leaf", "Flower"],
    optionsKh: ["ឫស", "ដើម", "ស្លឹក", "ផ្កា"],
    correctIndex: 2, difficultyTier: "easy"
  },
  {
    id: "e7",
    categoryEn: "English", categoryKh: "ភាសាអង់គ្លេស",
    questionEn: "What is the opposite of 'hot'?",
    questionKh: "តើពាក្យផ្ទុយពី 'hot' គឺជាអ្វី?",
    optionsEn: ["Warm", "Cold", "Boiling", "Sun"],
    optionsKh: ["Warm (កក់ក្តៅ)", "Cold (ត្រជាក់)", "Boiling (កំពុងពុះ)", "Sun (ព្រះអាទិត្យ)"],
    correctIndex: 1, difficultyTier: "easy"
  },
  {
    id: "e8",
    categoryEn: "Chemistry", categoryKh: "គីមីវិទ្យា",
    questionEn: "Which gas do humans exhale?",
    questionKh: "តើឧស្ម័នអ្វីដែលមនុស្សដកដង្ហើមចេញ?",
    optionsEn: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    optionsKh: ["អុកស៊ីសែន", "កាបូនឌីអុកស៊ីត", "អាសូត", "អេលីយ៉ូម"],
    correctIndex: 1, difficultyTier: "easy"
  },
  {
    id: "e9",
    categoryEn: "History", categoryKh: "ប្រវត្តិវិទ្យា",
    questionEn: "Who was the first person to walk on the moon?",
    questionKh: "តើនរណាជាមនុស្សដំបូងដែលដើរលើព្រះច័ន្ទ?",
    optionsEn: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "Albert Einstein"],
    optionsKh: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "Albert Einstein"],
    correctIndex: 1, difficultyTier: "easy"
  },
  {
    id: "e10",
    categoryEn: "Physics", categoryKh: "រូបវិទ្យា",
    questionEn: "What falls faster in a vacuum: a feather or a bowling ball?",
    questionKh: "នៅក្នុងសុញ្ញកាស តើមួយណាធ្លាក់លឿនជាង៖ រោមសត្វ ឬ ប៊ូលីង?",
    optionsEn: ["Feather", "Bowling Ball", "Both fall at the same rate", "Neither"],
    optionsKh: ["រោមសត្វ", "ប៊ូលីង", "ធ្លាក់ក្នុងល្បឿនស្មើគ្នា", "មិនធ្លាក់ទាំងពីរ"],
    correctIndex: 2, difficultyTier: "easy"
  },
  {
    id: "e11",
    categoryEn: "Biology", categoryKh: "ជីវវិទ្យា",
    questionEn: "How many legs does an insect have?",
    questionKh: "តើសត្វល្អិតមានជើងប៉ុន្មាន?",
    optionsEn: ["4", "6", "8", "10"],
    optionsKh: ["៤", "៦", "៨", "១០"],
    correctIndex: 1, difficultyTier: "easy"
  },
  {
    id: "e12",
    categoryEn: "English", categoryKh: "ភាសាអង់គ្លេស",
    questionEn: "Which punctuation mark ends a question?",
    questionKh: "តើសញ្ញាវណ្ណយុត្តិមួយណាដែលបញ្ចប់ប្រយោគសំណួរ?",
    optionsEn: ["Period (.)", "Comma (,)", "Question Mark (?)", "Exclamation Mark (!)"],
    optionsKh: ["សញ្ញាខណ្ឌ (.)", "សញ្ញាក្បៀស (,)", "សញ្ញាសួរ (?)", "សញ្ញាឧទាន (!)"],
    correctIndex: 2, difficultyTier: "easy"
  },
  {
    id: "e13",
    categoryEn: "Chemistry", categoryKh: "គីមីវិទ្យា",
    questionEn: "What is the center of an atom called?",
    questionKh: "តើចំណុចកណ្តាលនៃអាតូមហៅថាអ្វី?",
    optionsEn: ["Electron", "Proton", "Nucleus", "Neutron"],
    optionsKh: ["អេឡិចត្រុង", "ប្រូតុង", "ណ្វៃយ៉ូ (Nucleus)", "ណឺត្រុង"],
    correctIndex: 2, difficultyTier: "easy"
  },
  {
    id: "e14",
    categoryEn: "History", categoryKh: "ប្រវត្តិវិទ្យា",
    questionEn: "What is the capital city of Cambodia?",
    questionKh: "តើរាជធានីនៃប្រទេសកម្ពុជាមានឈ្មោះអ្វី?",
    optionsEn: ["Siem Reap", "Phnom Penh", "Battambang", "Sihanoukville"],
    optionsKh: ["សៀមរាប", "ភ្នំពេញ", "បាត់ដំបង", "ព្រះសីហនុ"],
    correctIndex: 1, difficultyTier: "easy"
  },
  {
    id: "e15",
    categoryEn: "Physics", categoryKh: "រូបវិទ្យា",
    questionEn: "What energy comes from the sun?",
    questionKh: "តើថាមពលអ្វីដែលបានមកពីព្រះអាទិត្យ?",
    optionsEn: ["Geothermal", "Solar", "Wind", "Nuclear"],
    optionsKh: ["កំដៅផែនដី", "សូឡា (ព្រះអាទិត្យ)", "ខ្យល់", "នុយក្លេអ៊ែរ"],
    correctIndex: 1, difficultyTier: "easy"
  },
  {
    id: "e16",
    categoryEn: "Biology", categoryKh: "ជីវវិទ្យា",
    questionEn: "What do pandas primarily eat?",
    questionKh: "តើសត្វខ្លាឃ្មុំផេនដាស៊ីអ្វីជាអាហារចម្បង?",
    optionsEn: ["Meat", "Insects", "Bamboo", "Fish"],
    optionsKh: ["សាច់", "សត្វល្អិត", "ឫស្សី", "ត្រី"],
    correctIndex: 2, difficultyTier: "easy"
  },
  {
    id: "e17",
    categoryEn: "English", categoryKh: "ភាសាអង់គ្លេស",
    questionEn: "What is the plural of 'child'?",
    questionKh: "តើពហុវចនៈនៃ 'child' គឺជាអ្វី?",
    optionsEn: ["Childs", "Childrens", "Children", "Childes"],
    optionsKh: ["Childs", "Childrens", "Children", "Childes"],
    correctIndex: 2, difficultyTier: "easy"
  },

  // ── MEDIUM TIER ──
  {
    id: "m1",
    categoryEn: "Biology", categoryKh: "ជីវវិទ្យា",
    questionEn: "What process do plants use to convert sunlight into food?",
    questionKh: "តើរុក្ខជាតិប្រើដំណើរការអ្វីដើម្បីបំប្លែងពន្លឺព្រះអាទិត្យទៅជាអាហារ?",
    optionsEn: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
    optionsKh: ["ការដកដង្ហើម", "រស្មីសំយោគ (Photosynthesis)", "ការរំលាយអាហារ", "ការធ្វើមេ"],
    correctIndex: 1, difficultyTier: "medium"
  },
  {
    id: "m2",
    categoryEn: "English", categoryKh: "ភាសាអង់គ្លេស",
    questionEn: "What is the past tense of the verb 'go'?",
    questionKh: "តើទម្រង់អតីតកាលនៃកិរិយាសព្ទ 'go' គឺជាអ្វី?",
    optionsEn: ["Goed", "Going", "Gone", "Went"],
    optionsKh: ["Goed", "Going", "Gone", "Went"],
    correctIndex: 3, difficultyTier: "medium"
  },
  {
    id: "m3",
    categoryEn: "Chemistry", categoryKh: "គីមីវិទ្យា",
    questionEn: "Which chemical element has the atomic number 1?",
    questionKh: "តើធាតុគីមីមួយណាដែលមានលេខអាតូមិច ១?",
    optionsEn: ["Hydrogen", "Helium", "Oxygen", "Carbon"],
    optionsKh: ["អ៊ីដ្រូសែន (Hydrogen)", "អេលីយ៉ូម (Helium)", "អុកស៊ីសែន (Oxygen)", "កាបូន (Carbon)"],
    correctIndex: 0, difficultyTier: "medium"
  },
  {
    id: "m4",
    categoryEn: "History", categoryKh: "ប្រវត្តិវិទ្យា",
    questionEn: "In what year did Cambodia gain full independence from France?",
    questionKh: "តើប្រទេសកម្ពុជាទទួលបានឯករាជ្យពេញលេញពីប្រទេសបារាំងនៅឆ្នាំណា?",
    optionsEn: ["1945", "1953", "1975", "1993"],
    optionsKh: ["១៩៤៥", "១៩៥៣", "១៩៧៥", "១៩៩៣"],
    correctIndex: 1, difficultyTier: "medium"
  },
  {
    id: "m5",
    categoryEn: "Physics", categoryKh: "រូបវិទ្យា",
    questionEn: "What is the approximate speed of light in a vacuum?",
    questionKh: "តើល្បឿននៃពន្លឺនៅក្នុងសុញ្ញកាសមានប្រហែលប៉ុន្មាន?",
    optionsEn: ["300,000 km/s", "150,000 km/s", "343 m/s", "1,000,000 km/s"],
    optionsKh: ["៣០០,០០០ គ.ម/វិនាទី", "១៥០,០០០ គ.ម/វិនាទី", "៣៤៣ ម/វិនាទី", "១,០០០,០០០ គ.ម/វិនាទី"],
    correctIndex: 0, difficultyTier: "medium"
  },
  {
    id: "m6",
    categoryEn: "Biology", categoryKh: "ជីវវិទ្យា",
    questionEn: "What is the primary function of red blood cells?",
    questionKh: "តើមុខងារចម្បងនៃកោសិកាឈាមក្រហមគឺជាអ្វី?",
    optionsEn: ["Fight infection", "Clot blood", "Carry oxygen", "Digest food"],
    optionsKh: ["ប្រយុទ្ធនឹងការឆ្លងមេរោគ", "ធ្វើឱ្យឈាមកក", "ដឹកជញ្ជូនអុកស៊ីសែន", "រំលាយអាហារ"],
    correctIndex: 2, difficultyTier: "medium"
  },
  {
    id: "m7",
    categoryEn: "English", categoryKh: "ភាសាអង់គ្លេស",
    questionEn: "Which of these is an adjective?",
    questionKh: "តើពាក្យមួយណាខាងក្រោមនេះជាគុណនាម?",
    optionsEn: ["Run", "Quick", "Dog", "Happily"],
    optionsKh: ["Run (រត់)", "Quick (លឿន)", "Dog (ឆ្កែ)", "Happily (យ៉ាងរីករាយ)"],
    correctIndex: 1, difficultyTier: "medium"
  },
  {
    id: "m8",
    categoryEn: "Chemistry", categoryKh: "គីមីវិទ្យា",
    questionEn: "What is the most common state of matter in the universe?",
    questionKh: "តើស្ថានភាពរូបធាតុទូទៅបំផុតនៅក្នុងសកលលោកគឺជាអ្វី?",
    optionsEn: ["Solid", "Liquid", "Gas", "Plasma"],
    optionsKh: ["រឹង", "រាវ", "ឧស្ម័ន", "ប្លាស្មា"],
    correctIndex: 3, difficultyTier: "medium"
  },
  {
    id: "m9",
    categoryEn: "History", categoryKh: "ប្រវត្តិវិទ្យា",
    questionEn: "During which period was Angkor Wat built?",
    questionKh: "តើប្រាសាទអង្គរវត្តត្រូវបានសាងសង់ក្នុងកំឡុងពេលណា?",
    optionsEn: ["1st Century", "9th Century", "12th Century", "15th Century"],
    optionsKh: ["សតវត្សទី ១", "សតវត្សទី ៩", "សតវត្សទី ១២", "សតវត្សទី ១៥"],
    correctIndex: 2, difficultyTier: "medium"
  },
  {
    id: "m10",
    categoryEn: "Physics", categoryKh: "រូបវិទ្យា",
    questionEn: "Which of Newton's laws states 'For every action, there is an equal and opposite reaction'?",
    questionKh: "តើច្បាប់របស់ញូតុនមួយណាដែលចែងថា 'គ្រប់សកម្មភាព តែងមានប្រតិកម្មស្មើគ្នា និងផ្ទុយគ្នា'?",
    optionsEn: ["First Law", "Second Law", "Third Law", "Law of Gravitation"],
    optionsKh: ["ច្បាប់ទីមួយ", "ច្បាប់ទីពីរ", "ច្បាប់ទីបី", "ច្បាប់ទំនាញសកល"],
    correctIndex: 2, difficultyTier: "medium"
  },
  {
    id: "m11",
    categoryEn: "Biology", categoryKh: "ជីវវិទ្យា",
    questionEn: "Which part of the brain controls balance and coordination?",
    questionKh: "តើផ្នែកណានៃខួរក្បាលដែលគ្រប់គ្រងតុល្យភាព និងចលនា?",
    optionsEn: ["Cerebrum", "Cerebellum", "Brainstem", "Hypothalamus"],
    optionsKh: ["Cerebrum", "Cerebellum", "Brainstem", "Hypothalamus"],
    correctIndex: 1, difficultyTier: "medium"
  },
  {
    id: "m12",
    categoryEn: "English", categoryKh: "ភាសាអង់គ្លេស",
    questionEn: "Identify the conjunction in this sentence: 'I like tea, but I prefer coffee.'",
    questionKh: "បញ្ជាក់ឈ្នាប់នៅក្នុងប្រយោគនេះ៖ 'I like tea, but I prefer coffee.'",
    optionsEn: ["like", "tea", "but", "prefer"],
    optionsKh: ["like", "tea", "but", "prefer"],
    correctIndex: 2, difficultyTier: "medium"
  },
  {
    id: "m13",
    categoryEn: "Chemistry", categoryKh: "គីមីវិទ្យា",
    questionEn: "Which element has the chemical symbol 'Au'?",
    questionKh: "តើធាតុគីមីមួយណាមាននិមិត្តសញ្ញា 'Au'?",
    optionsEn: ["Silver", "Gold", "Aluminum", "Argon"],
    optionsKh: ["ប្រាក់", "មាស", "អាលុយមីញ៉ូម", "អាកុង"],
    correctIndex: 1, difficultyTier: "medium"
  },
  {
    id: "m14",
    categoryEn: "History", categoryKh: "ប្រវត្តិវិទ្យា",
    questionEn: "Who was the first President of the United States?",
    questionKh: "តើនរណាជាប្រធានាធិបតីដំបូងនៃសហរដ្ឋអាមេរិក?",
    optionsEn: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
    optionsKh: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
    correctIndex: 2, difficultyTier: "medium"
  },
  {
    id: "m15",
    categoryEn: "Physics", categoryKh: "រូបវិទ្យា",
    questionEn: "What unit is used to measure electrical resistance?",
    questionKh: "តើឯកតាអ្វីដែលប្រើសម្រាប់វាស់រេស៊ីស្តង់អគ្គិសនី?",
    optionsEn: ["Volt", "Ampere", "Watt", "Ohm"],
    optionsKh: ["វ៉ុល", "អំពែរ", "វ៉ាត់", "អូម (Ohm)"],
    correctIndex: 3, difficultyTier: "medium"
  },
  {
    id: "m16",
    categoryEn: "Biology", categoryKh: "ជីវវិទ្យា",
    questionEn: "What type of animal is a frog?",
    questionKh: "តើកង្កែបជាសត្វប្រភេទអ្វី?",
    optionsEn: ["Reptile", "Amphibian", "Mammal", "Fish"],
    optionsKh: ["សត្វល្មូន", "សត្វពាហនៈ", "ថនិកសត្វ", "ត្រី"],
    correctIndex: 1, difficultyTier: "medium"
  },
  {
    id: "m17",
    categoryEn: "Chemistry", categoryKh: "គីមីវិទ្យា",
    questionEn: "What is the pH of pure water at 25°C?",
    questionKh: "តើ pH នៃទឹកបរិសុទ្ធនៅសីតុណ្ហភាព 25°C មានប៉ុន្មាន?",
    optionsEn: ["0", "7", "10", "14"],
    optionsKh: ["០", "៧", "១០", "១៤"],
    correctIndex: 1, difficultyTier: "medium"
  },

  // ── HARD TIER ──
  {
    id: "h1",
    categoryEn: "Biology", categoryKh: "ជីវវិទ្យា",
    questionEn: "What is the largest organ in the human body?",
    questionKh: "តើសរីរាង្គណាដែលធំជាងគេនៅក្នុងរាងកាយមនុស្ស?",
    optionsEn: ["Heart", "Liver", "Brain", "Skin"],
    optionsKh: ["បេះដូង", "ថ្លើម", "ខួរក្បាល", "ស្បែក (Skin)"],
    correctIndex: 3, difficultyTier: "hard"
  },
  {
    id: "h2",
    categoryEn: "English", categoryKh: "ភាសាអង់គ្លេស",
    questionEn: "Which literary device uses 'like' or 'as' to make a comparison?",
    questionKh: "តើវិធីសាស្ត្រតែងនិពន្ធមួយណាដែលប្រើពាក្យ 'like' ឬ 'as' ដើម្បីធ្វើការប្រៀបធៀប?",
    optionsEn: ["Metaphor", "Simile", "Personification", "Hyperbole"],
    optionsKh: ["Metaphor (រៀបចំ)", "Simile (ឧបមា)", "Personification (បុគ្គលាធិដ្ឋាន)", "Hyperbole (អតិពចន៏)"],
    correctIndex: 1, difficultyTier: "hard"
  },
  {
    id: "h3",
    categoryEn: "Chemistry", categoryKh: "គីមីវិទ្យា",
    questionEn: "What is the most abundant gas in the Earth's atmosphere?",
    questionKh: "តើឧស្ម័នអ្វីដែលមានបរិមាណច្រើនជាងគេនៅក្នុងបរិយាកាសផែនដី?",
    optionsEn: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
    optionsKh: ["អុកស៊ីសែន (Oxygen)", "កាបូនឌីអុកស៊ីត", "អាសូត (Nitrogen)", "អាកុង (Argon)"],
    correctIndex: 2, difficultyTier: "hard"
  },
  {
    id: "h4",
    categoryEn: "History", categoryKh: "ប្រវត្តិវិទ្យា",
    questionEn: "Who was the founder of the Khmer Empire in the 9th century?",
    questionKh: "តើនរណាជាស្ថាបនិកនៃអាណាចក្រខ្មែរនៅសតវត្សទី ៩?",
    optionsEn: ["Jayavarman VII", "Suryavarman II", "Norodom Sihanouk", "Jayavarman II"],
    optionsKh: ["ព្រះបាទជ័យវរ្ម័នទី ៧", "ព្រះបាទសូរ្យវរ្ម័នទី ២", "ព្រះបាទនរោត្តមសីហនុ", "ព្រះបាទជ័យវរ្ម័នទី ២"],
    correctIndex: 3, difficultyTier: "hard"
  },
  {
    id: "h5",
    categoryEn: "Physics", categoryKh: "រូបវិទ្យា",
    questionEn: "Which quantum mechanics principle states that exact position and momentum of a particle cannot be simultaneously known?",
    questionKh: "តើគោលការណ៍មេកានិចកង់ទិចមួយណាដែលចែងថា ទីតាំង និងសន្ទុះពិតប្រាកដនៃភាគល្អិតមិនអាចដឹងក្នុងពេលដំណាលគ្នាបាន?",
    optionsEn: ["Heisenberg Uncertainty Principle", "Pauli Exclusion Principle", "Schrödinger's Cat", "Bohr's Complementarity"],
    optionsKh: ["គោលការណ៍មិនប្រាកដប្រជារបស់ Heisenberg", "គោលការណ៍ដកចេញរបស់ Pauli", "សត្វឆ្មារបស់ Schrödinger", "ភាពបំពេញគ្នារបស់ Bohr"],
    correctIndex: 0, difficultyTier: "hard"
  },
  {
    id: "h6",
    categoryEn: "Biology", categoryKh: "ជីវវិទ្យា",
    questionEn: "What is the name of the enzyme that unwinds DNA during replication?",
    questionKh: "តើអង់ស៊ីមអ្វីដែលដោះឌីអិនអេអំឡុងពេលថតចម្លង?",
    optionsEn: ["Polymerase", "Ligase", "Helicase", "Primase"],
    optionsKh: ["Polymerase", "Ligase", "Helicase", "Primase"],
    correctIndex: 2, difficultyTier: "hard"
  },
  {
    id: "h7",
    categoryEn: "English", categoryKh: "ភាសាអង់គ្លេស",
    questionEn: "What is the term for a word that is spelled the same forwards and backwards?",
    questionKh: "តើពាក្យដែលអានពីមុខទៅក្រោយ និងពីក្រោយទៅមុខដូចគ្នាហៅថាអ្វី?",
    optionsEn: ["Anagram", "Palindrome", "Homophone", "Synonym"],
    optionsKh: ["Anagram", "Palindrome", "Homophone", "Synonym"],
    correctIndex: 1, difficultyTier: "hard"
  },
  {
    id: "h8",
    categoryEn: "Chemistry", categoryKh: "គីមីវិទ្យា",
    questionEn: "Which of the following is an allotrope of carbon?",
    questionKh: "តើមួយណាខាងក្រោមនេះជាអាឡូត្រូបនៃកាបូន?",
    optionsEn: ["Quartz", "Diamond", "Ozone", "Corundum"],
    optionsKh: ["រ៉ែថ្មខៀវ", "ពេជ្រ", "អូហ្សូន", "Corundum"],
    correctIndex: 1, difficultyTier: "hard"
  },
  {
    id: "h9",
    categoryEn: "History", categoryKh: "ប្រវត្តិវិទ្យា",
    questionEn: "Which empire was conquered by Hernán Cortés in 1521?",
    questionKh: "តើអាណាចក្រមួយណាដែលត្រូវបានដណ្តើមយកដោយ Hernán Cortés នៅឆ្នាំ 1521?",
    optionsEn: ["Inca", "Maya", "Aztec", "Ottoman"],
    optionsKh: ["Inca", "Maya", "Aztec", "Ottoman"],
    correctIndex: 2, difficultyTier: "hard"
  },
  {
    id: "h10",
    categoryEn: "Physics", categoryKh: "រូបវិទ្យា",
    questionEn: "What is the theoretical temperature where all molecular motion ceases?",
    questionKh: "តើសីតុណ្ហភាពទ្រឹស្តីដែលចលនាម៉ូលេគុលទាំងអស់ឈប់ហៅថាអ្វី?",
    optionsEn: ["0 Fahrenheit", "0 Celsius", "Absolute Zero", "Freezing Point"],
    optionsKh: ["០ ហ្វារិនហៃ", "០ អង្សាសេ", "សូន្យដាច់ខាត (Absolute Zero)", "ចំណុចត្រជាក់"],
    correctIndex: 2, difficultyTier: "hard"
  },
  {
    id: "h11",
    categoryEn: "Biology", categoryKh: "ជីវវិទ្យា",
    questionEn: "Which type of RNA brings amino acids to the ribosome?",
    questionKh: "តើ RNA ប្រភេទណាដែលនាំអាស៊ីតអាមីណូទៅកាន់រីបូសូម?",
    optionsEn: ["mRNA", "rRNA", "tRNA", "snRNA"],
    optionsKh: ["mRNA", "rRNA", "tRNA", "snRNA"],
    correctIndex: 2, difficultyTier: "hard"
  },
  {
    id: "h12",
    categoryEn: "English", categoryKh: "ភាសាអង់គ្លេស",
    questionEn: "Who wrote the play 'Macbeth'?",
    questionKh: "តើនរណាជាអ្នកនិពន្ធរឿង 'Macbeth'?",
    optionsEn: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    optionsKh: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctIndex: 1, difficultyTier: "hard"
  },
  {
    id: "h13",
    categoryEn: "Chemistry", categoryKh: "គីមីវិទ្យា",
    questionEn: "What is the name of the chemical process that changes liquid water into a gas at temperatures below the boiling point?",
    questionKh: "តើដំណើរការគីមីដែលបំប្លែងទឹកទៅជាឧស្ម័ននៅសីតុណ្ហភាពក្រោមចំណុចរំពុះហៅថាអ្វី?",
    optionsEn: ["Condensation", "Sublimation", "Evaporation", "Melting"],
    optionsKh: ["កំណក", "រំហួតរឹង", "រំហួត (Evaporation)", "ការរលាយ"],
    correctIndex: 2, difficultyTier: "hard"
  },
  {
    id: "h14",
    categoryEn: "History", categoryKh: "ប្រវត្តិវិទ្យា",
    questionEn: "What year did the Berlin Wall fall?",
    questionKh: "តើជញ្ជាំងប៊ែកឡាំងបានដួលរលំនៅឆ្នាំណា?",
    optionsEn: ["1985", "1989", "1991", "1993"],
    optionsKh: ["១៩៨៥", "១៩៨៩", "១៩៩១", "១៩៩៣"],
    correctIndex: 1, difficultyTier: "hard"
  },
  {
    id: "h15",
    categoryEn: "Physics", categoryKh: "រូបវិទ្យា",
    questionEn: "What particle is thought to mediate the strong nuclear force?",
    questionKh: "តើភាគល្អិតអ្វីដែលត្រូវបានគេគិតថាជាអ្នកសម្របសម្រួលកម្លាំងនុយក្លេអ៊ែរខ្លាំង?",
    optionsEn: ["Photon", "Gluon", "Boson", "Graviton"],
    optionsKh: ["Photon", "Gluon", "Boson", "Graviton"],
    correctIndex: 1, difficultyTier: "hard"
  },
  {
    id: "h16",
    categoryEn: "History", categoryKh: "ប្រវត្តិវិទ្យា",
    questionEn: "Which king initiated the construction of Angkor Thom?",
    questionKh: "តើព្រះមហាក្សត្រអង្គណាដែលបានចាប់ផ្តើមការសាងសង់អង្គរធំ?",
    optionsEn: ["Suryavarman II", "Jayavarman VII", "Yasovarman I", "Rajendravarman"],
    optionsKh: ["ព្រះបាទសូរ្យវរ្ម័នទី ២", "ព្រះបាទជ័យវរ្ម័នទី ៧", "ព្រះបាទយសោវរ្ម័នទី ១", "ព្រះបាទរាជេន្ទ្រវរ្ម័ន"],
    correctIndex: 1, difficultyTier: "hard"
  }
];
