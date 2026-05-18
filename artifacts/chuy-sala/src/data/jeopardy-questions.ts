export interface JeopardyClue {
  id: string;
  points: number;
  clueEn: string;
  clueKh: string;
  answerEn: string;
  answerKh: string;
}

export interface JeopardyCategory {
  id: string;
  nameEn: string;
  nameKh: string;
  clues: JeopardyClue[];
}

export const JEOPARDY_DATA: JeopardyCategory[] = [
  {
    id: "physics",
    nameEn: "Physics",
    nameKh: "រូបវិទ្យា",
    clues: [
      {
        id: "p100",
        points: 100,
        clueEn: "This fundamental force keeps us anchored to the Earth.",
        clueKh: "កម្លាំងមូលដ្ឋាននេះរក្សាយើងឱ្យជាប់នឹងផែនដី។",
        answerEn: "What is gravity?",
        answerKh: "តើអ្វីទៅជាទំនាញផែនដី?"
      },
      {
        id: "p200",
        points: 200,
        clueEn: "It is the standard unit of measurement for electrical resistance.",
        clueKh: "វាគឺជាឯកតារង្វាស់ស្តង់ដារសម្រាប់រេស៊ីស្តង់អគ្គិសនី។",
        answerEn: "What is the Ohm?",
        answerKh: "តើអ្វីទៅជា អូម (Ohm)?"
      },
      {
        id: "p300",
        points: 300,
        clueEn: "This theory by Einstein asserts that E = mc².",
        clueKh: "ទ្រឹស្តីនេះរបស់អែងស្តែងបញ្ជាក់ថា E = mc²។",
        answerEn: "What is the Theory of Relativity?",
        answerKh: "តើអ្វីទៅជាទ្រឹស្តីរ៉ឺឡាទីវីតេ?"
      },
      {
        id: "p400",
        points: 400,
        clueEn: "This is the approximate speed of light in a vacuum, in kilometers per second.",
        clueKh: "នេះគឺជាល្បឿនប្រហាក់ប្រហែលនៃពន្លឺនៅក្នុងសុញ្ញកាស គិតជាគីឡូម៉ែត្រក្នុងមួយវិនាទី។",
        answerEn: "What is 300,000 km/s?",
        answerKh: "តើអ្វីទៅជា ៣០០,០០០ គ.ម/វិនាទី?"
      },
      {
        id: "p500",
        points: 500,
        clueEn: "This quantum mechanics principle states that you cannot simultaneously know the exact position and momentum of a particle.",
        clueKh: "គោលការណ៍មេកានិចកង់ទិចនេះចែងថា អ្នកមិនអាចដឹងពីទីតាំង និងសន្ទុះពិតប្រាកដនៃភាគល្អិតក្នុងពេលដំណាលគ្នាបានទេ។",
        answerEn: "What is the Heisenberg Uncertainty Principle?",
        answerKh: "តើអ្វីទៅជាគោលការណ៍មិនប្រាកដប្រជារបស់ Heisenberg?"
      }
    ]
  },
  {
    id: "chemistry",
    nameEn: "Chemistry",
    nameKh: "គីមីវិទ្យា",
    clues: [
      {
        id: "c100",
        points: 100,
        clueEn: "It is the chemical symbol for water.",
        clueKh: "វាគឺជានិមិត្តសញ្ញាគីមីសម្រាប់ទឹក។",
        answerEn: "What is H2O?",
        answerKh: "តើអ្វីទៅជា H2O?"
      },
      {
        id: "c200",
        points: 200,
        clueEn: "This element has the atomic number 1 and is the lightest element.",
        clueKh: "ធាតុនេះមានលេខអាតូមិច ១ ហើយជាធាតុស្រាលជាងគេ។",
        answerEn: "What is Hydrogen?",
        answerKh: "តើអ្វីទៅជា អ៊ីដ្រូសែន?"
      },
      {
        id: "c300",
        points: 300,
        clueEn: "A solution with a pH of 7 is considered to be this.",
        clueKh: "សូលុយស្យុងដែលមាន pH ៧ ត្រូវបានចាត់ទុកថាជាអ្វី។",
        answerEn: "What is neutral?",
        answerKh: "តើអ្វីទៅជា អព្យាក្រឹត?"
      },
      {
        id: "c400",
        points: 400,
        clueEn: "This table organizes all known chemical elements based on their atomic number.",
        clueKh: "តារាងនេះរៀបចំធាតុគីមីទាំងអស់ដោយផ្អែកលើលេខអាតូមិចរបស់ពួកវា។",
        answerEn: "What is the Periodic Table?",
        answerKh: "តើអ្វីទៅជា តារាងខួបនៃធាតុគីមី?"
      },
      {
        id: "c500",
        points: 500,
        clueEn: "It is the industrial process used to artificially fix nitrogen from the air into ammonia.",
        clueKh: "វាគឺជាដំណើរការឧស្សាហកម្មដែលប្រើដើម្បីទាញយកអាសូតពីខ្យល់ទៅជាអាម៉ូញាក់។",
        answerEn: "What is the Haber-Bosch process?",
        answerKh: "តើអ្វីទៅជា ដំណើរការ Haber-Bosch?"
      }
    ]
  },
  {
    id: "biology",
    nameEn: "Biology",
    nameKh: "ជីវវិទ្យា",
    clues: [
      {
        id: "b100",
        points: 100,
        clueEn: "This is known as the powerhouse of the cell.",
        clueKh: "វាត្រូវបានគេស្គាល់ថាជារោងចក្រថាមពលនៃកោសិកា។",
        answerEn: "What is the mitochondria?",
        answerKh: "តើអ្វីទៅជា មីតូកុងទ្រី?"
      },
      {
        id: "b200",
        points: 200,
        clueEn: "This process is how plants convert sunlight, water, and carbon dioxide into food.",
        clueKh: "ដំណើរការនេះគឺជារបៀបដែលរុក្ខជាតិបំប្លែងពន្លឺព្រះអាទិត្យ ទឹក និងកាបូនឌីអុកស៊ីតទៅជាអាហារ។",
        answerEn: "What is photosynthesis?",
        answerKh: "តើអ្វីទៅជា រស្មីសំយោគ?"
      },
      {
        id: "b300",
        points: 300,
        clueEn: "This is the molecule that carries genetic instructions in all living things.",
        clueKh: "នេះគឺជាម៉ូលេគុលដែលផ្ទុកព័ត៌មានសេនេទិចនៅក្នុងភាវៈរស់ទាំងអស់។",
        answerEn: "What is DNA?",
        answerKh: "តើអ្វីទៅជា ឌីអិនអេ (DNA)?"
      },
      {
        id: "b400",
        points: 400,
        clueEn: "These cells in the blood are primarily responsible for fighting infections.",
        clueKh: "កោសិកាទាំងនេះនៅក្នុងឈាមមានតួនាទីចម្បងក្នុងការប្រយុទ្ធប្រឆាំងនឹងការឆ្លងមេរោគ។",
        answerEn: "What are white blood cells (Leukocytes)?",
        answerKh: "តើអ្វីទៅជា គោលិកាស (កោសិកាឈាមស)?"
      },
      {
        id: "b500",
        points: 500,
        clueEn: "This revolutionary gene-editing technology acts like molecular scissors.",
        clueKh: "បច្ចេកវិទ្យាកែសម្រួលហ្សែនដ៏អស្ចារ្យនេះដើរតួដូចជាកន្ត្រៃម៉ូលេគុល។",
        answerEn: "What is CRISPR (or CRISPR-Cas9)?",
        answerKh: "តើអ្វីទៅជា CRISPR?"
      }
    ]
  },
  {
    id: "english",
    nameEn: "English",
    nameKh: "ភាសាអង់គ្លេស",
    clues: [
      {
        id: "e100",
        points: 100,
        clueEn: "It is a word that represents a person, place, or thing.",
        clueKh: "វាគឺជាពាក្យដែលតំណាងឱ្យមនុស្ស ទីកន្លែង ឬវត្ថុ។",
        answerEn: "What is a noun?",
        answerKh: "តើអ្វីទៅជា នាម?"
      },
      {
        id: "e200",
        points: 200,
        clueEn: "This literary device uses 'like' or 'as' to compare two different things.",
        clueKh: "វិធីសាស្ត្រតែងនិពន្ធនេះប្រើ 'like' ឬ 'as' ដើម្បីប្រៀបធៀបវត្ថុពីរខុសគ្នា។",
        answerEn: "What is a simile?",
        answerKh: "តើអ្វីទៅជា ឧបមា (Simile)?"
      },
      {
        id: "e300",
        points: 300,
        clueEn: "Words like 'to', 'too', and 'two' that sound the same but have different meanings.",
        clueKh: "ពាក្យដូចជា 'to', 'too', និង 'two' ដែលមានសំឡេងដូចគ្នា ប៉ុន្តែមានអត្ថន័យខុសគ្នា។",
        answerEn: "What are homophones?",
        answerKh: "តើអ្វីទៅជា Homophones?"
      },
      {
        id: "e400",
        points: 400,
        clueEn: "A word that describes or modifies a verb, adjective, or another adverb.",
        clueKh: "ពាក្យដែលពណ៌នា ឬបញ្ជាក់កិរិយាសព្ទ គុណនាម ឬគុណកិរិយាផ្សេងទៀត។",
        answerEn: "What is an adverb?",
        answerKh: "តើអ្វីទៅជា គុណកិរិយា (Adverb)?"
      },
      {
        id: "e500",
        points: 500,
        clueEn: "A term for a word, phrase, or sequence that reads the same backward as forward, like 'madam'.",
        clueKh: "ពាក្យ ឬឃ្លាដែលអាចអានពីមុខទៅក្រោយ និងពីក្រោយទៅមុខដូចគ្នា ឧទាហរណ៍ 'madam'។",
        answerEn: "What is a palindrome?",
        answerKh: "តើអ្វីទៅជា Palindrome?"
      }
    ]
  },
  {
    id: "history",
    nameEn: "History",
    nameKh: "ប្រវត្តិវិទ្យា",
    clues: [
      {
        id: "h100",
        points: 100,
        clueEn: "This massive temple complex is a national symbol of Cambodia.",
        clueKh: "ប្រាសាទដ៏ធំនេះគឺជានិមិត្តសញ្ញាជាតិនៃប្រទេសកម្ពុជា។",
        answerEn: "What is Angkor Wat?",
        answerKh: "តើអ្វីទៅជា ប្រាសាទអង្គរវត្ត?"
      },
      {
        id: "h200",
        points: 200,
        clueEn: "He was the first President of the United States of America.",
        clueKh: "គាត់គឺជាប្រធានាធិបតីដំបូងបង្អស់នៃសហរដ្ឋអាមេរិក។",
        answerEn: "Who is George Washington?",
        answerKh: "តើនរណាជា George Washington?"
      },
      {
        id: "h300",
        points: 300,
        clueEn: "This empire was the most powerful in the ancient Mediterranean before splitting in 395 CE.",
        clueKh: "អាណាចក្រនេះមានឥទ្ធិពលបំផុតនៅសមុទ្រមេឌីទែរ៉ាណេបុរាណ មុនពេលបែកបាក់នៅឆ្នាំ 395 គ.ស។",
        answerEn: "What is the Roman Empire?",
        answerKh: "តើអ្វីទៅជា ចក្រភពរ៉ូម?"
      },
      {
        id: "h400",
        points: 400,
        clueEn: "This Cambodian king initiated the construction of the city of Angkor Thom.",
        clueKh: "ព្រះមហាក្សត្រខ្មែរអង្គនេះបានចាប់ផ្តើមការសាងសង់ទីក្រុងអង្គរធំ។",
        answerEn: "Who is Jayavarman VII?",
        answerKh: "តើនរណាជា ព្រះបាទជ័យវរ្ម័នទី ៧?"
      },
      {
        id: "h500",
        points: 500,
        clueEn: "This global conflict ended in 1945 following the use of atomic weapons.",
        clueKh: "ជម្លោះសកលនេះបានបញ្ចប់នៅឆ្នាំ ១៩៤៥ បន្ទាប់ពីការប្រើប្រាស់អាវុធបរមាណូ។",
        answerEn: "What is World War II?",
        answerKh: "តើអ្វីទៅជា សង្គ្រាមលោកលើកទី ២?"
      }
    ]
  }
];
