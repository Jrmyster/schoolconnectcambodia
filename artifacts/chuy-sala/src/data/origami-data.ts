export type OrigamiStep = {
  id: number;
  instructionEn: string;
  instructionKh: string;
  // A path definition for the paper
  paperPath: string;
  // Optional fold lines
  foldLines?: string[];
  // Words to highlight
  actionVerbs: string[];
};

export type OrigamiModel = {
  id: string;
  titleEn: string;
  titleKh: string;
  descriptionEn: string;
  descriptionKh: string;
  steps: OrigamiStep[];
};

// Simplified SVG paths (100x100 viewBox assumed for easy scaling)
// M = moveto, L = lineto, Z = closepath
const SQUARE = "M 10 10 L 90 10 L 90 90 L 10 90 Z";
const TRIANGLE_HALF = "M 10 90 L 90 10 L 90 90 Z";
const KITE_BASE = "M 10 90 L 50 10 L 90 90 L 50 70 Z";
const SWAN_BODY = "M 20 80 L 50 40 L 80 80 L 60 70 L 50 50 L 40 70 Z"; 
const SWAN_HEAD = "M 20 80 L 50 40 L 40 30 L 30 35 L 50 50 L 40 70 Z";

const HEART_BASE = "M 50 90 L 10 50 L 10 20 L 50 40 L 90 20 L 90 50 Z";
const HEART_FOLD = "M 50 90 L 10 50 C 10 20 50 20 50 40 C 50 20 90 20 90 50 Z";

const FROG_BASE = "M 50 10 L 90 50 L 50 90 L 10 50 Z";

export const ORIGAMI_MODELS: OrigamiModel[] = [
  {
    id: "swan",
    titleEn: "Paper Swan",
    titleKh: "សត្វក្ងានក្រដាស",
    descriptionEn: "A classic and elegant origami swan.",
    descriptionKh: "សត្វក្ងានក្រដាសដ៏ស្រស់ស្អាតនិងបុរាណ។",
    steps: [
      {
        id: 1,
        instructionEn: "Start with a square piece of paper. Fold it in half diagonally and unfold.",
        instructionKh: "ចាប់ផ្តើមជាមួយក្រដាសរាងការ៉េ។ បត់វាជាពាក់កណ្តាលតាមអង្កត់ទ្រូង ហើយលាវាវិញ។",
        paperPath: SQUARE,
        foldLines: ["M 10 90 L 90 10"],
        actionVerbs: ["fold", "unfold"],
      },
      {
        id: 2,
        instructionEn: "Fold the left and right edges to meet the center crease, making a kite shape.",
        instructionKh: "បត់គែមខាងឆ្វេង និងខាងស្តាំឲ្យជួបគ្នានៅបន្ទាត់កណ្តាល ដើម្បីបង្កើតជារាងខ្លែង។",
        paperPath: KITE_BASE,
        foldLines: ["M 50 10 L 50 90"],
        actionVerbs: ["fold"],
      },
      {
        id: 3,
        instructionEn: "Flip the paper over and fold the point up to form the neck.",
        instructionKh: "ត្រឡប់ក្រដាស រួចបត់ចំណុចស្រួចឡើងលើដើម្បីបង្កើតជាក។",
        paperPath: SWAN_BODY,
        actionVerbs: ["flip", "fold"],
      },
      {
        id: 4,
        instructionEn: "Tuck the tip down to make the head.",
        instructionKh: "ស៊កចុងក្រដាសចុះក្រោមដើម្បីបង្កើតជាក្បាល។",
        paperPath: SWAN_HEAD,
        actionVerbs: ["tuck"],
      }
    ],
  },
  {
    id: "heart",
    titleEn: "Origami Heart",
    titleKh: "បេះដូងក្រដាស",
    descriptionEn: "A simple heart, perfect for messages.",
    descriptionKh: "បេះដូងសាមញ្ញ សាកសមសម្រាប់សារ។",
    steps: [
      {
        id: 1,
        instructionEn: "Fold the square paper in half both ways and unfold.",
        instructionKh: "បត់ក្រដាសការ៉េជាពាក់កណ្តាលទាំងពីរទិស ហើយលាវាវិញ។",
        paperPath: SQUARE,
        foldLines: ["M 10 50 L 90 50", "M 50 10 L 50 90"],
        actionVerbs: ["fold", "unfold"],
      },
      {
        id: 2,
        instructionEn: "Fold the top and bottom corners to the center.",
        instructionKh: "បត់ជ្រុងខាងលើនិងខាងក្រោមមកកណ្តាល។",
        paperPath: HEART_BASE,
        actionVerbs: ["fold"],
      },
      {
        id: 3,
        instructionEn: "Tuck the remaining corners to round the heart shape.",
        instructionKh: "ស៊កជ្រុងដែលនៅសល់ដើម្បីឱ្យបេះដូងមានរាងមូល។",
        paperPath: HEART_FOLD,
        actionVerbs: ["tuck"],
      }
    ]
  },
  {
    id: "frog",
    titleEn: "Jumping Frog",
    titleKh: "កង្កែបលោត",
    descriptionEn: "A fun frog that actually jumps when you press it.",
    descriptionKh: "កង្កែបដ៏រីករាយដែលអាចលោតនៅពេលអ្នកសង្កត់វា។",
    steps: [
      {
        id: 1,
        instructionEn: "Fold the square diagonally both ways to form an X crease.",
        instructionKh: "បត់ការ៉េតាមអង្កត់ទ្រូងទាំងពីរទិសដើម្បីបង្កើតជាបន្ទាត់ X។",
        paperPath: SQUARE,
        foldLines: ["M 10 10 L 90 90", "M 10 90 L 90 10"],
        actionVerbs: ["fold"],
      },
      {
        id: 2,
        instructionEn: "Collapse the sides to form a waterbomb base (triangle).",
        instructionKh: "សង្កត់ជ្រុងចូលគ្នាដើម្បីបង្កើតជាមូលដ្ឋានគ្រាប់បែកទឹក (រាងត្រីកោណ)។",
        paperPath: FROG_BASE,
        actionVerbs: ["collapse", "form"],
      },
      {
        id: 3,
        instructionEn: "Fold the bottom legs up to create the jumping mechanism.",
        instructionKh: "បត់ជើងខាងក្រោមឡើងលើដើម្បីបង្កើតយន្តការលោត។",
        paperPath: "M 50 10 L 90 50 L 70 90 L 50 70 L 30 90 L 10 50 Z",
        actionVerbs: ["fold", "create"],
      }
    ]
  }
];

export const VOCABULARY_TERMS: Record<string, { en: string; kh: string; descEn: string; descKh: string }> = {
  fold: { en: "Fold", kh: "បត់", descEn: "To bend the paper over itself.", descKh: "បត់ក្រដាសលើខ្លួនវា។" },
  unfold: { en: "Unfold", kh: "លា", descEn: "To open a previous fold.", descKh: "បើកកន្លែងដែលបានបត់ពីមុន។" },
  tuck: { en: "Tuck", kh: "ស៊ក", descEn: "To push a flap into a pocket.", descKh: "រុញចុងក្រដាសចូលក្នុងហោប៉ៅ។" },
  flip: { en: "Flip", kh: "ត្រឡប់", descEn: "To turn the paper completely over.", descKh: "ត្រឡប់ក្រដាសទៅម្ខាងទៀតទាំងស្រុង។" },
  collapse: { en: "Collapse", kh: "សង្កត់ចូល", descEn: "To push sides together to flatten.", descKh: "រុញជ្រុងចូលគ្នាដើម្បីធ្វើឲ្យរាបស្មើ។" },
  form: { en: "Form", kh: "បង្កើតរាង", descEn: "To shape the paper.", descKh: "បង្កើតរាងក្រដាស។" },
  create: { en: "Create", kh: "បង្កើត", descEn: "To make a new feature.", descKh: "បង្កើតលក្ខណៈថ្មីមួយ។" },
  rotate: { en: "Rotate", kh: "បង្វិល", descEn: "To turn the paper around.", descKh: "បង្វិលក្រដាស។" }
};
