export type VerdictType = "FALSE" | "PARTIALLY TRUE";

export interface Challenge {
  id: string;
  number: string;
  verdict: VerdictType;
  verdictColor: string;
  en: {
    title: string;
    claim: string;
    background: string;
    reveal: string;
    verdictDetail: string;
    checklist: { peer_reviewed: string; sample_size: string; conflict: string };
  };
  kh: {
    title: string;
    claim: string;
    background: string;
    reveal: string;
    verdictDetail: string;
    checklist: { peer_reviewed: string; sample_size: string; conflict: string };
  };
  correctChecklist: { peer_reviewed: boolean; sample_size: boolean; conflict: boolean };
}

export const CHALLENGES: Challenge[] = [
  {
    id: "carrots-night-vision",
    number: "#1",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      title: "The Night Vision Myth",
      claim: "Do carrots give you super night vision?",
      background:
        'Eating extra carrots will give you the ability to see in total darkness like a cat.',
      reveal:
        "Vitamin A Dependency: Carrots contain Beta-carotene, which the body uses to make Vitamin A. While Vitamin A is essential for normal vision, eating extra won't give you super vision. This was actually a WWII propaganda myth used to hide the invention of radar!",
      verdictDetail:
        "Vitamin A prevents night blindness caused by deficiency — but extra carrots won't give you cat eyes.",
      checklist: {
        peer_reviewed:
          "Yes — Vitamin A deficiency linked to night blindness is confirmed by multiple peer-reviewed studies.",
        sample_size:
          "Yes — global studies across thousands of people confirm the link (with deficiency only).",
        conflict:
          "Yes — the original claim was deliberate wartime propaganda by the British government.",
      },
    },
    kh: {
      title: "រឿងប្រឌិតអំពីការមើលពេលយប់",
      claim: "តើការញ៉ាំការ៉ុតជួយឱ្យអ្នកមើលឃើញច្បាស់ក្នុងទីងងឹតមែនទេ?",
      background:
        "ការញ៉ាំការ៉ុតបន្ថែមនឹងជួយឱ្យអ្នកមើលឃើញក្នុងទីងងឹតដូចឆ្មា។",
      reveal:
        "ការ៉ុតមានបេតាការ៉ូទីន ដែលខ្លួនប្រើដើម្បីបង្កើតវីតាមីន A។ ប៉ុន្តែការញ៉ាំបន្ថែមមិនផ្តល់ការមើលឃើញពិសេស។ នេះជាការផ្សព្វផ្សាយក្នុងសង្គ្រាមលោកទី២!",
      verdictDetail:
        "វីតាមីន A ការពារការចុះខ្សោយនៃការមើល — ប៉ុន្តែការ៉ុតបន្ថែមមិនផ្តល់ភ្នែកឆ្មាទេ។",
      checklist: {
        peer_reviewed: "បាទ — ការខ្វះវីតាមីន A ត្រូវបានបញ្ជាក់ដោយការសិក្សាជាច្រើន។",
        sample_size: "បាទ — ការសិក្សាលើមនុស្សរាប់ពាន់នាក់បញ្ជាក់ការភ្ជាប់នេះ។",
        conflict: "បាទ — ការអះអាងដើមមកពីការផ្សព្វផ្សាយសង្គ្រាម។",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: true },
  },
  {
    id: "five-second-rule",
    number: "#2",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      title: "The 5-Second Rule",
      claim: "Is food safe if picked up within 5 seconds?",
      background:
        'If you drop food on the floor, bacteria need at least 5 seconds to crawl onto it, so it\'s safe to eat if you\'re fast.',
      reveal:
        "Instant Transfer: Bacteria do not wait; they attach to wet or porous food the millisecond it touches the ground. The floor is covered in microscopic life that moves at the speed of contact, not a 5-second countdown.",
      verdictDetail:
        "Bacteria transfer is nearly instantaneous. There is no safe window — wet or sticky food picks up bacteria on contact.",
      checklist: {
        peer_reviewed:
          "Yes — lab studies show measurable bacterial transfer within milliseconds of contact.",
        sample_size:
          "Yes — multiple controlled experiments across different surfaces and food types confirm this.",
        conflict:
          "No — research is largely academic with no commercial bias.",
      },
    },
    kh: {
      title: "វិធាន ៥ វិនាទី",
      claim: "តើអាហារដែលធ្លាក់លើដីនៅតែមានសុវត្ថិភាព បើអ្នករើសក្នុង ៥ វិនាទី?",
      background:
        "បាក់តេរីត្រូវការ ៥ វិនាទី ដើម្បីចូលទៅក្នុងអាហារ ដូច្នេះអាហារមានសុវត្ថិភាពប្រសិនបើអ្នករើសវាឆាប់។",
      reveal:
        "បាក់តេរីមិនរង់ចាំទេ។ ពួកវាភ្ជាប់ទៅនឹងអាហារភ្លាមៗ នៅពេលវាប៉ះដី។ ជាន់ដីពោរពេញដោយសិ្ថតជីវិតតូចណាស់។",
      verdictDetail:
        "ការផ្ទេរបាក់តេរីកើតឡើងស្ទើរតែភ្លាមៗ — គ្មានពេលវេលាសុវត្ថិភាពទេ។",
      checklist: {
        peer_reviewed: "បាទ — ការសិក្សាបន្ថែមបង្ហាញការផ្ទេរបាក់តេរីក្នុងរយៈមីលីវិនាទី។",
        sample_size: "បាទ — ការពិសោធន៍ច្រើនប្រភេទបញ្ជាក់នេះ។",
        conflict: "ទេ — ការស្រាវជ្រាវភាគច្រើនជាបែបអប់រំ។",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: false },
  },
  {
    id: "cold-weather-cold",
    number: "#3",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      title: "Cold Weather & Sickness",
      claim: "Does rain or cold air cause a virus?",
      background:
        'Standing in the rain or being in cold air will physically give you a "Cold" or the "Flu."',
      reveal:
        "Viral Origin: Temperature itself doesn't create viruses. We get sicker in cold weather because we huddle indoors together (increasing transmission) and dry air can weaken our nasal mucosal barrier — but the Cold is caused by a virus, not the weather.",
      verdictDetail:
        "Viruses cause colds; the weather just changes our behavior and immune response.",
      checklist: {
        peer_reviewed:
          "Yes — controlled experiments show chilled volunteers catch colds at the same rate as warm ones.",
        sample_size:
          "Yes — large randomised trials in the 1950s–70s debunked this with hundreds of volunteers.",
        conflict:
          "No — most research is publicly funded with no commercial incentive.",
      },
    },
    kh: {
      title: "អាកាសធាតុត្រជាក់ & ជំងឺ",
      claim: "តើការដើរកាត់ភ្លៀង ឬខ្យល់ត្រជាក់បណ្តាលឱ្យផ្តាសាយមែនទេ?",
      background:
        "ការឈរក្នុងភ្លៀង ឬខ្យល់ត្រជាក់នឹងធ្វើឱ្យអ្នកជំងឺផ្ដាសាយ។",
      reveal:
        "សីតុណ្ហភាពខ្លួនឯងមិនបង្កើតមេរោគទេ។ យើងឈឺច្រើននៅរដូវត្រជាក់ ព្រោះយើងនៅក្នុងផ្ទះជាមួយគ្នា។ ប៉ុន្តែមេរោគទើបបណ្ដាលឱ្យផ្ដាសាយ។",
      verdictDetail:
        "មេរោគបណ្ដាលឱ្យផ្ដាសាយ — អាកាសធាតុគ្រាន់តែប្រែប្រួលអាកប្បកិរិយារបស់យើង។",
      checklist: {
        peer_reviewed: "បាទ — ការពិសោធន៍ត្រួតពិនិត្យបង្ហាញថាត្រជាក់មិនបណ្ដាលឱ្យផ្ដាសាយ។",
        sample_size: "បាទ — ការសាកល្បងធំៗនៅទស្សវត្ស ១៩៥០-៧០ បញ្ជាក់នេះ។",
        conflict: "ទេ — ការស្រាវជ្រាវភាគច្រើនជារបស់រដ្ឋ។",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: false },
  },
  {
    id: "ten-percent-brain",
    number: "#4",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      title: "The Brain Percentage Myth",
      claim: "Do we only use 10% of our brains?",
      background:
        'Humans only use 10% of their brains. If we unlock the other 90%, we would have superpowers.',
      reveal:
        "Metabolic Efficiency: Evolution is economical. The brain uses 20% of your body's energy. If 90% was useless, it would have shrunk to save energy. Brain scans show that almost every part of the brain is active over a 24-hour period.",
      verdictDetail:
        "Brain scans show we use virtually all of our brain. Damage to almost any region causes measurable harm.",
      checklist: {
        peer_reviewed:
          "Yes — brain imaging studies (fMRI, PET scans) show virtually all brain regions are active over a day.",
        sample_size:
          "Yes — thousands of patients and scans across decades of neuroscience research confirm this.",
        conflict:
          "Yes — self-help authors and marketers benefit commercially from the idea of unlocking hidden potential.",
      },
    },
    kh: {
      title: "រឿងប្រឌិតអំពីការប្រើប្រាស់ខួរក្បាល",
      claim: "តើយើងប្រើប្រាស់ខួរក្បាលតែ ១០% ប៉ុណ្ណោះមែនទេ?",
      background:
        "មនុស្សប្រើប្រាស់ខួរក្បាលតែ ១០% ប៉ុណ្ណោះ។ ប្រសិនបើយើងដោះស្រាយ ៩០% ដែលនៅសល់ យើងនឹងមានអំណាចពិសេស។",
      reveal:
        "ប្រសិទ្ធភាពថាមពល: ការវិវត្ដសាស្ត្រជ្រើសរើសសន្សំថាមពល។ ខួរក្បាលប្រើ ២០% នៃថាមពលខ្លួន។ ការស្គែនខួរក្បាលបង្ហាញថាផ្នែកស្ទើរតែទាំងអស់ប្រើប្រាស់ក្នុងមួយថ្ងៃ។",
      verdictDetail:
        "ការស្គែនខួរក្បាលបង្ហាញថាយើងប្រើផ្នែកស្ទើរតែទាំងអស់ — ការខូចខាតណាក្នុងផ្នែកណាក៏ធ្វើឱ្យមានផលប៉ះពាល់។",
      checklist: {
        peer_reviewed: "បាទ — fMRI និង PET scan បង្ហាញថាតំបន់ខួរក្បាលស្ទើរទាំងអស់ប្រើប្រាស់។",
        sample_size: "បាទ — ការស្រាវជ្រាវទូលំទូលាយជាច្រើនទសវត្ស បញ្ជាក់នេះ។",
        conflict: "បាទ — អ្នកនិពន្ធការលើកទឹកចិត្តរកប្រយោជន៍ពីគំនិតនេះ។",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: true },
  },
  {
    id: "sugar-hyperactivity",
    number: "#5",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      title: "Sugar & Hyperactivity",
      claim: "Does sugar make children hyperactive?",
      background:
        "Eating sugar makes children hyperactive and 'crazy' for a few hours.",
      reveal:
        "Expectation Bias: Extensive double-blind studies show that sugar does not change behavior. The 'Sugar High' is usually a result of the environment (like a birthday party) or the parents' expectations, not the glucose itself.",
      verdictDetail:
        "It is a psychological expectation, not a physiological reaction to glucose.",
      checklist: {
        peer_reviewed:
          "Yes — multiple double-blind, placebo-controlled studies find no link between sugar and hyperactivity.",
        sample_size:
          "Yes — large-scale meta-analyses covering hundreds of children confirm no behavioral change.",
        conflict:
          "No — research is largely independent with no commercial stake in the outcome.",
      },
    },
    kh: {
      title: "ស្ករ & ភាពរហរហួសហេតុ",
      claim: "តើស្ករធ្វើឱ្យក្មេងៗមានភាពរហរហួសហេតុ (Hyperactive) មែនទេ?",
      background:
        "ការញ៉ាំស្ករធ្វើឱ្យក្មេងៗមានភាពរហរហួសហេតុ និង 'ឆ្កួត' ក្នុងរយៈពេលពីរបីម៉ោង។",
      reveal:
        "ការក្លែងបន្លំការរំពឹងទុក: ការស្រាវជ្រាវបង្ហាញថាស្ករមិនប្រែប្រួលអាកប្បកិរិយាទេ។ 'Sugar High' ជាធម្មតាមកពីបរិយាកាស ឬការរំពឹងទុករបស់មាតាបិតា។",
      verdictDetail:
        "នេះជាការរំពឹងទុកផ្លូវចិត្ត មិនមែនប្រតិកម្មខាងរាងកាយចំពោះជាតិស្ករទេ។",
      checklist: {
        peer_reviewed: "បាទ — ការស្រាវជ្រាវ double-blind ជាច្រើនមិនរកឃើញទំនាក់ទំនងទេ។",
        sample_size: "បាទ — ការវិភាគធំៗលើក្មេងរាប់រយនាក់បញ្ជាក់ថាគ្មានការប្រែប្រួល។",
        conflict: "ទេ — ការស្រាវជ្រាវភាគច្រើនឯករាជ្យ គ្មានបំណងពាណិជ្ជកម្ម។",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: false },
  },
  {
    id: "hair-nails-death",
    number: "#6",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      title: "Hair & Nails Growth After Death",
      claim: "Do hair and nails grow after death?",
      background:
        "Your hair and fingernails continue to grow for several days after you die.",
      reveal:
        "Dehydration Illusion: Biological growth requires ATP and oxygen, which stop at death. The 'growth' is an illusion caused by the skin drying and shrinking back, making the hair and nails appear longer.",
      verdictDetail:
        "Skin shrinkage due to dehydration creates a visual illusion of growth.",
      checklist: {
        peer_reviewed:
          "Yes — biology textbooks and forensic science confirm growth is impossible without cellular energy.",
        sample_size:
          "Yes — well-established across decades of forensic and pathological research.",
        conflict:
          "No — purely scientific finding with no commercial angle.",
      },
    },
    kh: {
      title: "សក់ & ក្រចកដុះបន្ទាប់ពីស្លាប់",
      claim: "តើសក់ និងក្រចកបន្តដុះបន្ទាប់ពីមនុស្សស្លាប់មែនទេ?",
      background:
        "សក់ និងក្រចករបស់អ្នកបន្តដុះក្នុងរយៈពេលពីរបីថ្ងៃបន្ទាប់ពីស្លាប់។",
      reveal:
        "ការបំភ័ន្តដោយការខះទឹក: ការដុះតម្រូវឱ្យមាន ATP និងអុកស្សីហ្ស៊ែន ដែលឈប់ពេលស្លាប់។ 'ការដុះ' ជាការបំភ័ន្តមួយបណ្ដាលដោយស្បែកស្ងួត និងរួញ ធ្វើឱ្យសក់ និងក្រចកហាក់ដូចជាវែងជាង។",
      verdictDetail:
        "ការរួញស្បែកដោយសារការខះទឹកបង្កើតការបំភ័ន្តទស្សន៍ នៃការដុះ។",
      checklist: {
        peer_reviewed: "បាទ — វិទ្យាសាស្ត្រជីវសាស្ត្រ និងវេជ្ជសាស្ត្របញ្ជាក់ថាការដុះមិនអាចទៅរួចគ្មានថាមពលកោសិកា។",
        sample_size: "បាទ — បង្ហាញច្បាស់ក្នុងការស្រាវជ្រាវវេជ្ជសាស្ត្រជាច្រើនទស្សវត្ស។",
        conflict: "ទេ — ការរកឃើញវិទ្យាសាស្ត្រសុទ្ធ គ្មានបំណងពាណិជ្ជកម្ម។",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: false },
  },
  {
    id: "goldfish-memory",
    number: "#7",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      title: "Goldfish Memory",
      claim: "Do goldfish only have a 3-second memory?",
      background:
        "Goldfish are very unintelligent and only have a memory span of 3 seconds.",
      reveal:
        "Cognitive Mapping: Research shows goldfish can remember things for months. They can be trained to respond to colors, music, and even navigate mazes, proving they have complex neural storage.",
      verdictDetail:
        "Goldfish can remember information for months and can be trained.",
      checklist: {
        peer_reviewed:
          "Yes — laboratory studies show goldfish can be conditioned and remember tasks for many months.",
        sample_size:
          "Yes — repeated experiments across multiple research groups confirm robust long-term memory.",
        conflict:
          "No — independent academic research with no commercial motive.",
      },
    },
    kh: {
      title: "ការចងចាំរបស់ត្រីមាស",
      claim: "តើត្រីមាសមានការចងចាំត្រឹមតែ ៣ វិនាទីប៉ុណ្ណោះមែនទេ?",
      background:
        "ត្រីមាសគ្មានប្រាជ្ញា ហើយមានការចងចាំត្រឹមតែ ៣ វិនាទីប៉ុណ្ណោះ។",
      reveal:
        "ការស្រាវជ្រាវបង្ហាញថាត្រីមាសអាចចងចាំបានជាច្រើនខែ។ ពួកវាអាចត្រូវបានបណ្តុះបណ្តាលឱ្យឆ្លើយតបចំពោះពណ៌ ចម្រៀង និងសូម្បីតែដើរតាមផ្លូវវង់ ។",
      verdictDetail:
        "ត្រីមាសអាចចងចាំព័ត៌មានបានជាខែៗ ហើយអាចបណ្តុះបណ្តាលបាន។",
      checklist: {
        peer_reviewed: "បាទ — ការសិក្សាបង្ហាញថាត្រីមាសអាចត្រូវបានបណ្តុះ ហើយចងចាំភារកិច្ចបានជាខែៗ។",
        sample_size: "បាទ — ការពិសោធន៍ម្ដងហើយម្ដងទៀតបញ្ជាក់ការចងចាំរយៈពេលវែង។",
        conflict: "ទេ — ការស្រាវជ្រាវវប្បធម៌សុទ្ធ គ្មានបំណងពាណិជ្ជកម្ម។",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: false },
  },
  {
    id: "lightning-strikes",
    number: "#8",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      title: "Lightning Strikes Twice",
      claim: "Does lightning never strike the same place twice?",
      background:
        "Lightning never strikes the same place twice.",
      reveal:
        "Path of Least Resistance: Lightning is an electrical discharge seeking the quickest path to the ground. Tall buildings like the Empire State Building are struck dozens of times a year. Physics doesn't have a 'memory' of where it has been.",
      verdictDetail:
        "Lightning strikes the most efficient path, often hitting the same tall objects repeatedly.",
      checklist: {
        peer_reviewed:
          "Yes — atmospheric physics and electrical engineering confirm lightning always seeks the path of least resistance.",
        sample_size:
          "Yes — lightning rod strike data from tall structures around the world provides extensive real-world evidence.",
        conflict:
          "No — well-established physics principle with no commercial interest.",
      },
    },
    kh: {
      title: "ផ្លេកបន្ទោរបាញ់ម្ដងហើយម្ដងទៀត",
      claim: "តើផ្លេកបន្ទោរមិនដែលបាញ់ចំកន្លែងដដែលពីរដងមែនទេ?",
      background:
        "ផ្លេកបន្ទោរមិនដែលបាញ់ចំកន្លែងដដែលពីរដងទេ។",
      reveal:
        "ផ្លូវវាស់ប្រឆាំងតិចបំផុត: ផ្លេកបន្ទោរជាការចេញអគ្គិសនី ស្វែងរកផ្លូវលឿនបំផុតទៅដី។ អគារខ្ពស់ដូចជា Empire State Building ត្រូវបាញ់ជាច្រើនដងក្នុងមួយឆ្នាំ។ រូបវិទ្យាគ្មាន 'ការចងចាំ' ពីកន្លែងបានទៅ។",
      verdictDetail:
        "ផ្លេកបន្ទោរបាញ់ផ្លូវវាស់ប្រឆាំងតិចបំផុត ច្រើនតែបាញ់ចំវត្ថុខ្ពស់ដដែលម្ដងហើយម្ដងទៀត។",
      checklist: {
        peer_reviewed: "បាទ — រូបវិទ្យាបរិយាកាស និងវិស្វកម្មអគ្គិសនីបញ្ជាក់ផ្លេកបន្ទោរស្វែងរកផ្លូវវាស់ប្រឆាំងតិចបំផុត។",
        sample_size: "បាទ — ទិន្នន័យការបាញ់ជាច្រើនពីអគារខ្ពស់ជុំវិញពិភពលោកផ្ដល់ភស្ដុតាង។",
        conflict: "ទេ — គោលការណ៍រូបវិទ្យាច្បាស់ គ្មានបំណងពាណិជ្ជកម្ម។",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: false },
  },
  {
    id: "bulls-red-color",
    number: "#9",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      title: "Bull vs. Red Color",
      claim: "Do bulls hate the color red?",
      background:
        "Bulls become angry and aggressive specifically when they see the color red.",
      reveal:
        "Dichromatic Vision: Bulls are actually color-blind to red. They don't react to the color; they react to the movement and the perceived threat of the matador's cape. Any color moving that way would trigger the same response.",
      verdictDetail:
        "Bulls are color-blind to red; they react to the movement of the cape, not its color.",
      checklist: {
        peer_reviewed:
          "Yes — animal vision studies confirm bulls have dichromatic vision and cannot distinguish red from green.",
        sample_size:
          "Yes — experiments using capes of different colors confirm bulls charge at movement, not at red.",
        conflict:
          "No — academic animal science research with no commercial motive.",
      },
    },
    kh: {
      title: "គោជល់ & ពណ៌ក្រហម",
      claim: "តើគោជល់ស្អប់ពណ៌ក្រហមមែនទេ?",
      background:
        "គោជល់ក្លាយជាឆ្កួតនិងឈ្លានពានជាពិសេសនៅពេលដែលឃើញពណ៌ក្រហម។",
      reveal:
        "ការមើលឃើញពណ៌ពីរ: គោជល់ពិតជាមើលមិនឃើញពណ៌ក្រហមទេ។ ពួកវាមិនប្រតិកម្មចំពោះពណ៌ទេ — ពួកវាប្រតិកម្មចំពោះចលនា និងការគំរាមរបស់ក្រណាត់ matador ។ ពណ៌ណាមួយដែលចលនាបែបនោះ នឹងបង្កឱ្យមានប្រតិកម្មដូចគ្នា។",
      verdictDetail:
        "គោជល់មើលមិនឃើញពណ៌ក្រហម — ពួកវាប្រតិកម្មចំពោះចលនារបស់ក្រណាត់ មិនមែនពណ៌វាទេ។",
      checklist: {
        peer_reviewed: "បាទ — ការសិក្សាស្ដីពីចក្ខុទស្សន៍សត្វបញ្ជាក់ថាគោជល់មើលមិនឃើញពណ៌ក្រហម។",
        sample_size: "បាទ — ការពិសោធន៍ដោយប្រើក្រណាត់ពណ៌ផ្សេងៗ បញ្ជាក់ថាគោវាយចំចលនា មិនមែនពណ៌ក្រហមទេ។",
        conflict: "ទេ — ការស្រាវជ្រាវវិទ្យាសាស្ត្រសត្វ គ្មានបំណងពាណិជ្ជកម្ម។",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: false },
  },
  {
    id: "tongue-map",
    number: "#10",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      title: "The Tongue Map",
      claim: "Do different parts of the tongue taste different things?",
      background:
        "Different parts of the tongue are responsible for different tastes (sweet at the tip, sour on the sides, bitter at the back).",
      reveal:
        "Universal Receptors: The 'Tongue Map' is a 100-year-old misunderstanding from a misread German study. While some areas might be slightly more sensitive, taste receptors for all flavors are distributed across the entire tongue.",
      verdictDetail:
        "All taste receptors are spread across the entire tongue — the map is a century-old myth.",
      checklist: {
        peer_reviewed:
          "Yes — modern taste receptor studies confirm all taste buds respond to all basic tastes across the whole tongue.",
        sample_size:
          "Yes — replicated across many labs worldwide since the original mistranslation was identified.",
        conflict:
          "No — purely academic finding correcting a historical error.",
      },
    },
    kh: {
      title: "ផែនទីអណ្តាត",
      claim: "តើផ្នែកផ្សេងៗនៃអណ្តាត ទទួលដឹងរសជាតិផ្សេងៗគ្នាស្រឡះមែនទេ?",
      background:
        "ផ្នែកផ្សេងៗនៃអណ្តាតទទួលខុសត្រូវចំពោះរសជាតិផ្សេងៗ (ផ្អែមនៅចុង ជូរនៅចំហៀង쓴 ចង្ហើញនៅខាងក្រោយ)។",
      reveal:
        "គ្រប់ឧបករណ៍ទទួលរស: ផែនទីអណ្តាតជាការយល់ច្រឡំ ១០០ ឆ្នាំ មកពីការអានការសិក្សាអាល្លឺម៉ង់ខុស។ ឧបករណ៍ទទួលរសជាតិទាំងអស់ត្រូវបានចែកចាយទូទាំងអណ្តាត។",
      verdictDetail:
        "ឧបករណ៍ទទួលរសទាំងអស់ត្រូវបានរាយប៉ាយទូទាំងអណ្តាត — ផែនទីនេះជារឿងប្រឌិតដែលមានអាយុជាង ១ សតវត្ស។",
      checklist: {
        peer_reviewed: "បាទ — ការសិក្សាឆ្លើយតបរបស់រសគ្រប់ប្រភេទ បញ្ជាក់ថារបូតរសទទួលរសជាតិទាំងអស់ទូទាំងអណ្តាត។",
        sample_size: "បាទ — ត្រូវបានធ្វើឡើងម្ដងហើយម្ដងទៀតនៅក្នុងមន្ទីរពិសោធន៍ជាច្រើនទូទាំងពិភពលោក។",
        conflict: "ទេ — ការរកឃើញបែបអប់រំ ដែលកែតម្រូវកំហុសប្រវត្តិសាស្ត្រ។",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: false },
  },
  {
    id: "shaving-hair-growth",
    number: "#11",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      title: "Shaving & Hair Thickness",
      claim: "Does shaving make hair grow back thicker?",
      background:
        "If you shave your hair, it will grow back thicker, darker, and faster than before.",
      reveal:
        "Blunt End Illusion: Shaving cuts the hair at its thickest part near the skin. As it grows out, the blunt edge feels coarse compared to the naturally tapered ends of unshaven hair. The follicle itself remains completely unchanged — shaving has no effect on it.",
      verdictDetail:
        "It only feels coarser because the ends are blunt; the hair structure and follicle are exactly the same.",
      checklist: {
        peer_reviewed:
          "Yes — controlled dermatology studies measuring hair diameter before and after shaving show no change.",
        sample_size:
          "Yes — multiple clinical trials across different body areas confirm no change in thickness or growth rate.",
        conflict:
          "No — academic dermatology research with no commercial interest.",
      },
    },
    kh: {
      title: "ការកោរ & ភាពក្រាស់របស់សក់",
      claim: "តើការកោរសក់ធ្វើឱ្យសក់ដុះមកវិញក្រាស់ជាងមុនមែនទេ?",
      background:
        "ប្រសិនបើអ្នកកោរសក់ វានឹងដុះមកវិញក្រាស់ ងងឹត និងឆាប់ជាងមុន។",
      reveal:
        "ការបំភ័ន្តចុងត្រង់: ការកោរកាត់សក់នៅផ្នែកក្រាស់បំផុតរបស់វាជិតស្បែក។ នៅពេលវាដុះចេញ ចុងត្រង់ផ្តល់អារម្មណ៍거칠 ប្រៀបជាមួយចុងស្រួចនៃសក់ដែលមិនបានកោរ។ ប្រពន្ធសក់ខ្លួនឯងនៅតែដូចគ្នា — ការកោរមិនប៉ះពាល់ដល់វាទេ។",
      verdictDetail:
        "វាផ្តល់អារម្មណ៍거칠 ព្រោះតែចុងត្រង់ប៉ុណ្ណោះ — រចនាសម្ព័ន្ធសក់ និងប្រពន្ធដូចគ្នាបេះបិទ។",
      checklist: {
        peer_reviewed:
          "បាទ — ការសិក្សាស្បែកត្រួតពិនិត្យការវាស់ស្ទង់径 សក់មុន/ក្រោយការកោរ មិនបង្ហាញការផ្លាស់ប្ដូរ។",
        sample_size:
          "បាទ — ការសាកល្បងព្យាបាលច្រើននៅផ្នែករាងកាយផ្សេងគ្នា បញ្ជាក់ថាគ្មានការផ្លាស់ប្ដូរ ក្នុងភាពក្រាស់ ឬល្បឿនដុះ។",
        conflict:
          "ទេ — ការស្រាវជ្រាវវេជ្ជសាស្ត្រស្បែកដែលគ្មានផលប្រយោជន៍ពាណិជ្ជកម្ម។",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: false },
  },,
  {
    id: "blood-color",
    number: "#12",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      title: "Blue Blood Myth",
      claim: "Is blood blue inside the body?",
      background:
        "Blood inside your body is blue until it comes out and touches oxygen.",
      reveal:
        "Hemoglobin Reality: Blood is always red. Deoxygenated blood is just a darker, duller red. It only appears blue through your skin due to the way light wavelengths are reflected and absorbed by your tissues.",
      verdictDetail:
        "Blood is never blue — the blue appearance of veins under skin is an optical effect of how different light wavelengths penetrate tissue.",
      checklist: {
        peer_reviewed:
          "Yes — spectroscopy studies confirm hemoglobin remains red in both oxygenated and deoxygenated states.",
        sample_size:
          "Yes — consistent findings across anatomy, physiology, and optical research.",
        conflict:
          "No — straightforward physiological finding with no commercial interest.",
      },
    },
    kh: {
      title: "រឿងប្រឌិតឈាមពណ៌ខៀវ",
      claim: "តើឈាមនៅក្នុងរាងកាយមានពណ៌ខៀវមែនទេ?",
      background:
        "ឈាមក្នុងរាងកាយរបស់អ្នកមានពណ៌ខៀវ រហូតដល់វាចេញមកខាងក្រៅ ហើយប៉ះជាមួយអុកស៊ីហ្សែន។",
      reveal:
        "សេចក្តីពិតអំពីហឺម៉ូហ្គ្លូប៊ីន: ឈាមមានពណ៌ក្រហមជានិច្ច។ ឈាមដែលគ្មានអុកស៊ីហ្សែន គ្រាន់តែមានពណ៌ក្រហមងងឹតជាង។ វាលេចឡើងពណ៌ខៀវតាមស្បែករបស់អ្នក ដោយសារតែរបៀបដែលរលករំលេចពន្លឺ ត្រូវបានឆ្លុះបញ្ចាំង និងស្រូបយកដោយជាលិការបស់អ្នក។",
      verdictDetail:
        "ឈាមមិនដែលពណ៌ខៀវទេ — រូបរាងខៀវនៃសរសៃឈាមតាមស្បែក គឺជាបាតុភូតអុបទិចនៃការបញ្ចាំងពន្លឺ។",
      checklist: {
        peer_reviewed:
          "បាទ — ការសិក្សា spectroscopy បញ្ជាក់ថា hemoglobin នៅតែក្រហម ទាំងក្នុងស្ថានភាពមាន និងគ្មានអុកស៊ីហ្សែន។",
        sample_size:
          "បាទ — លទ្ធផលស្ថិរស្ថេរទូទាំងការស្រាវជ្រាវវិទ្យាសាស្ត្ររបស់រាងកាយ និងអុបទិច។",
        conflict:
          "ទេ — ការរកឃើញខាងសរីរវិទ្យាដ៏សាមញ្ញ ដោយគ្មានផលប្រយោជន៍ពាណិជ្ជកម្ម។",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: false },
  },
  {
    id: "knuckle-cracking-arthritis",
    number: "#13",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      title: "Knuckle Cracking & Arthritis",
      claim: "Does cracking your knuckles cause arthritis?",
      background:
        "Cracking your knuckles will eventually cause you to develop arthritis.",
      reveal:
        "Cavitation: The pop you hear is just gas bubbles — mostly nitrogen — bursting in the synovial fluid of your joints. Long-term studies have shown no correlation between knuckle cracking and arthritis.",
      verdictDetail:
        "The sound is harmless gas bubble collapse in joint fluid; no joint damage occurs.",
      checklist: {
        peer_reviewed:
          "Yes — longitudinal studies including one doctor who cracked only one hand's knuckles for 60 years show no arthritis difference.",
        sample_size:
          "Yes — replicated across multiple independent studies with long follow-up periods.",
        conflict:
          "No — academic rheumatology research with no commercial interest.",
      },
    },
    kh: {
      title: "ការចុចសន្លាក់ & ជំងឺរលាកសន្លាក់",
      claim: "តើការចុចសន្លាក់ម្រាមដៃ បណ្តាលឱ្យកើតជំងឺរលាកសន្លាក់មែនទេ?",
      background:
        "ការចុចសន្លាក់ម្រាមដៃ នឹងបណ្តាលឱ្យអ្នករំលើបជំងឺរលាកសន្លាក់នៅទីបំផុត។",
      reveal:
        "ការជះទឹកក្នុងរន្ធ: សំឡេងដែលអ្នកឮ គ្រាន់តែជាពពុះឧស្ម័ន — ភាគច្រើនជាអាតូតអ — ដែលផ្ទុះនៅក្នុងសំណើមសន្លាក់ (synovial fluid) ។ ការសិក្សារយៈពេលវែងមិនបង្ហាញទំនាក់ទំនងរវាងការចុចសន្លាក់ និងជំងឺរលាកសន្លាក់ទេ។",
      verdictDetail:
        "សំឡេងនោះ គ្រាន់តែជាការផ្ទុះពពុះឧស្ម័នដ៏គ្មានគ្រោះថ្នាក់ — មិនមានការខូចខាតសន្លាក់ឡើយ។",
      checklist: {
        peer_reviewed:
          "បាទ — ការសិក្សារយៈពេលវែង រួមទាំងវេជ្ជបណ្ឌិតម្នាក់ ដែលចុចសន្លាក់ដៃម្ខាងតែ ៦០ ឆ្នាំ មិនបង្ហាញភាពខុសគ្នានៃជំងឺរលាកសន្លាក់ទេ។",
        sample_size:
          "បាទ — ត្រូវបានធ្វើឡើងម្ដងហើយម្ដងទៀតនៅក្នុងការសិក្សាឯករាជ្យជាច្រើន ជាមួយនឹងរយៈពេលតាមដានយូរ។",
        conflict:
          "ទេ — ការស្រាវជ្រាវវិជ្ជាជំងឺសន្លាក់ដែលគ្មានផលប្រយោជន៍ពាណិជ្ជកម្ម។",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: false },
  },
  {
    id: "toads-warts",
    number: "#14",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      title: "Toads & Warts",
      claim: "Do you get warts from touching toads?",
      background:
        "If you touch a toad or a frog, you will grow warts on your skin.",
      reveal:
        "Viral Cause: Warts are caused by the Human Papillomavirus (HPV), not by amphibians. While many toads have bumpy skin that looks like warts, those bumps are actually parotoid glands that produce toxins for defense — not contagious wart-causing agents.",
      verdictDetail:
        "HPV — a human virus — causes warts; toads cannot transmit it. Their bumps are defensive glands.",
      checklist: {
        peer_reviewed:
          "Yes — virology studies confirm HPV as the sole cause of common warts in humans.",
        sample_size:
          "Yes — consistent across dermatology and infectious disease literature worldwide.",
        conflict:
          "No — basic virology and amphibian biology with no commercial interest.",
      },
    },
    kh: {
      title: "គីង្គក់ & ពងបែក",
      claim: "តើការប៉ះសត្វគីង្គក់ បណ្តាលឱ្យដុះពងបែក ឬបូសនៅលើស្បែកមែនទេ?",
      background:
        "ប្រសិនបើអ្នកប៉ះគីង្គក់ ឬតម្លោក វានឹងដុះពងបែកនៅលើស្បែករបស់អ្នក។",
      reveal:
        "មូលហេតុដោយវីរុស: ពងបែក ឬបូស ត្រូវបានបង្កដោយវីរុស Human Papillomavirus (HPV) មិនមែនដោយសត្វទេ។ ខណៈដែលគីង្គក់ជាច្រើនមានស្បែកខ្លៅដូចពងបែក ស្បែកខ្លៅទាំងនោះជាក់ស្ដែងគឺជាក្រពេញ parotoid ដែលផលិតជាតិពុលសម្រាប់ការពារខ្លួន — មិនមែនជាភ្នាក់ងារបង្ករោគទេ។",
      verdictDetail:
        "HPV — ជាវីរុសរបស់មនុស្ស — បង្ករោគពងបែក។ គីង្គក់មិនអាចឆ្លងវីរុសនេះបានទេ ស្បែកខ្លៅរបស់ពួកវាជាក្រពេញការពារខ្លួន។",
      checklist: {
        peer_reviewed:
          "បាទ — ការសិក្សា virology បញ្ជាក់ HPV ជាមូលហេតុតែមួយគត់នៃពងបែករបស់មនុស្ស។",
        sample_size:
          "បាទ — ស្ថិរស្ថេរទូទាំងឯកសារ dermatology និងជំងឺឆ្លងទូទាំងពិភពលោក។",
        conflict:
          "ទេ — ជីវវិទ្យា virology មូលដ្ឋាន និងជីវសាស្ត្រសត្វទន្សាយ ដោយគ្មានផលប្រយោជន៍ពាណិជ្ជកម្ម។",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: false },
  },
  {
    id: "bedroom-plants",
    number: "#15",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      title: "Bedroom Plants at Night",
      claim: "Are plants in the bedroom dangerous at night?",
      background:
        "Keeping plants in your bedroom at night is dangerous because they steal your oxygen.",
      reveal:
        "Relative Scale: While plants do switch from photosynthesis to respiration at night — consuming a tiny amount of oxygen — the amount is negligible compared to what a human or a pet uses. The room contains far more than enough oxygen from the air, and the CO2 they release is similarly trivial.",
      verdictDetail:
        "The oxygen a bedroom plant uses at night is a fraction of what humans exhale; there is no meaningful impact on air quality.",
      checklist: {
        peer_reviewed:
          "Yes — plant physiology and indoor air quality studies confirm the negligible oxygen impact of houseplants at night.",
        sample_size:
          "Yes — consistent across botany and environmental health research.",
        conflict:
          "No — straightforward plant biology finding with no commercial interest.",
      },
    },
    kh: {
      title: "ដើមឈើក្នុងបន្ទប់គេងពេលយប់",
      claim: "តើការទុកដើមឈើក្នុងបន្ទប់គេងនៅពេលយប់ គ្រោះថ្នាក់មែនទេ?",
      background:
        "ការទុកដើមឈើក្នុងបន្ទប់គេងនៅពេលយប់ គ្រោះថ្នាក់ ព្រោះពួកវាលួចអុកស៊ីហ្សែនរបស់អ្នក។",
      reveal:
        "ខ្នាតសាមញ្ញ: ខណៈដែលដើមឈើប្ដូរពី photosynthesis ទៅ respiration នៅពេលយប់ — ប្រើប្រាស់អុកស៊ីហ្សែនបន្តិចបន្តួច — បរិមាណនេះចាក់ទ្រង់ទ្រាយបើប្រៀបនឹងអ្វីដែលមនុស្ស ឬសត្វចិញ្ចឹមប្រើ។ ក្នុងបន្ទប់មានអុកស៊ីហ្សែនច្រើនជាងបំណាច់ ហើយ CO2 ដែលពួកវាបញ្ចេញ ក៏ស្ទើរមិនគួរឱ្យកត់សម្គាល់ដែរ។",
      verdictDetail:
        "អុកស៊ីហ្សែនដែលដើមឈើក្នុងបន្ទប់ប្រើពេលយប់ តូចណាស់បើប្រៀបនឹងអ្វីដែលមនុស្សដកដង្ហើម — មិនមានផលប៉ះពាល់គួរឱ្យកត់សម្គាល់ទេ។",
      checklist: {
        peer_reviewed:
          "បាទ — ការសិក្សាសរីរវិទ្យារុក្ខជាតិ និងគុណភាពខ្យល់ក្នុងផ្ទះ បញ្ជាក់ការប៉ះពាល់អុកស៊ីហ្សែនតូចតាចនៃរុក្ខជាតិក្នុងផ្ទះពេលយប់។",
        sample_size:
          "បាទ — ស្ថិរស្ថេរទូទាំងការស្រាវជ្រាវវិទ្យាសាស្ត្ររុក្ខជាតិ និងសុខភាពបរិស្ថាន។",
        conflict:
          "ទេ — ការរកឃើញជីវវិទ្យារុក្ខជាតិដ៏សាមញ្ញ ដោយគ្មានផលប្រយោជន៍ពាណិជ្ជកម្ម។",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: false },
  },
];
