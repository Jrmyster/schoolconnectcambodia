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
];
