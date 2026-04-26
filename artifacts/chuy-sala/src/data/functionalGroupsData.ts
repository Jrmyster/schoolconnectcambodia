/* ══════════════════════════════════════════════════════════════════════════
 * Functional Groups — The Molecular Alphabet
 * អក្ខរក្រមម៉ូលេគុល៖ ក្រុមនាទី
 *
 * Pure data file. The matching SVG renderings live in
 * <FunctionalGroupGallery /> and are dispatched by `id`.
 * ══════════════════════════════════════════════════════════════════════════ */

export type FGCategory =
  | "hydrocarbon"     // Alkane, Alkene, Alkyne, Aromatic
  | "heteroatom"      // R-OH, R-O-R', R-NH2, R-X
  | "carbonyl"        // C=O family
  | "nitrogen";       // R-C≡N

export type FunctionalGroup = {
  /** Stable id; also drives the SVG renderer in FunctionalGroupGallery. */
  id:
    | "alkane" | "alkene" | "alkyne" | "aromatic"
    | "alcohol" | "ether" | "amine" | "haloalkane"
    | "aldehyde" | "ketone" | "carboxylic-acid" | "ester" | "amide" | "acyl-chloride"
    | "nitrile";
  category: FGCategory;
  enName: string;
  khName: string;
  /** Plain-text shorthand of the structural formula, e.g. "R-OH". */
  formula: string;
  /** IUPAC suffix when used as the principal group (e.g. "-ol"). */
  suffix?: string;
  /** IUPAC prefix when used as a substituent (e.g. "hydroxy-"). */
  prefix?: string;
  /** A concrete example molecule the student already knows. */
  enExample: string;
  khExample: string;
};

export const FUNCTIONAL_GROUP_CATEGORIES: {
  id: FGCategory;
  enName: string;
  khName: string;
  enHint: string;
  khHint: string;
}[] = [
  {
    id: "hydrocarbon",
    enName: "Hydrocarbons",
    khName: "ហ៊ីដ្រូកាបូន",
    enHint: "Carbon + hydrogen only — the skeletons.",
    khHint: "កាបូន + អ៊ីដ្រូសែន តែប៉ុណ្ណោះ — គ្រោងឆ្អឹង។",
  },
  {
    id: "heteroatom",
    enName: "Single Bonds to Heteroatoms",
    khName: "ចំណងតែមួយទៅនឹងអាតូមមិនមែនកាបូន",
    enHint: "One non-carbon atom bonded by a single bond.",
    khHint: "អាតូមមិនមែនកាបូនមួយ ភ្ជាប់ដោយចំណងតែមួយ។",
  },
  {
    id: "carbonyl",
    enName: "Carbonyls (C=O)",
    khName: "ក្រុមកាបូនីល (C=O)",
    enHint: "The C=O double bond — the busiest spot in organic chemistry.",
    khHint: "ចំណងទ្វេ C=O — ចំណុចមមាញឹកបំផុតក្នុងគីមីសរីរាង្គ។",
  },
  {
    id: "nitrogen",
    enName: "Nitrogen-Based",
    khName: "ក្រុមផ្អែកលើនីត្រូសែន",
    enHint: "Triple bond to nitrogen — strong, polar, useful.",
    khHint: "ចំណងបី ទៅនឹងនីត្រូសែន — រឹង មាន​ប៉ូល និងមានប្រយោជន៍។",
  },
];

export const FUNCTIONAL_GROUPS: FunctionalGroup[] = [
  /* ── Hydrocarbons ───────────────────────────────────────────────────── */
  {
    id: "alkane",
    category: "hydrocarbon",
    enName: "Alkane",
    khName: "អាល់កាន",
    formula: "R\u2014R'",
    suffix: "-ane",
    prefix: "alkyl-",
    enExample: "Methane (CH\u2084)",
    khExample: "មេតាន (CH\u2084)",
  },
  {
    id: "alkene",
    category: "hydrocarbon",
    enName: "Alkene",
    khName: "អាល់កែន",
    formula: "R\u2014CH=CH\u2014R'",
    suffix: "-ene",
    prefix: "alkenyl-",
    enExample: "Ethylene (C\u2082H\u2084)",
    khExample: "អេទីលែន (C\u2082H\u2084)",
  },
  {
    id: "alkyne",
    category: "hydrocarbon",
    enName: "Alkyne",
    khName: "អាល់ស៊ីន",
    formula: "R\u2014C\u2261C\u2014R'",
    suffix: "-yne",
    prefix: "alkynyl-",
    enExample: "Acetylene (C\u2082H\u2082)",
    khExample: "អាសេទីលែន (C\u2082H\u2082)",
  },
  {
    id: "aromatic",
    category: "hydrocarbon",
    enName: "Aromatic (Benzene)",
    khName: "សារធាតុក្រអូប (បង់សែន)",
    formula: "C\u2086H\u2086 ring",
    suffix: "-benzene",
    prefix: "phenyl-",
    enExample: "Benzene, Toluene",
    khExample: "បង់សែន ទូលូអ៊ែន",
  },

  /* ── Single bonds to heteroatoms ───────────────────────────────────── */
  {
    id: "alcohol",
    category: "heteroatom",
    enName: "Alcohol",
    khName: "អាល់កុល",
    formula: "R\u2014OH",
    suffix: "-ol",
    prefix: "hydroxy-",
    enExample: "Ethanol (drinking alcohol)",
    khExample: "អេតាណុល (អាល់កុលផឹក)",
  },
  {
    id: "ether",
    category: "heteroatom",
    enName: "Ether",
    khName: "អេទែរ",
    formula: "R\u2014O\u2014R'",
    prefix: "alkoxy-",
    enExample: "Diethyl ether (anaesthetic)",
    khExample: "ឌីអេទីលអេទែរ (ថ្នាំសណ្តំ)",
  },
  {
    id: "amine",
    category: "heteroatom",
    enName: "Amine",
    khName: "អាមីន",
    formula: "R\u2014NH\u2082",
    suffix: "-amine",
    prefix: "amino-",
    enExample: "Methylamine, dopamine",
    khExample: "មេទីលអាមីន ដូប៉ាមីន",
  },
  {
    id: "haloalkane",
    category: "heteroatom",
    enName: "Haloalkane",
    khName: "ហាឡូអាល់កាន",
    formula: "R\u2014X (X = F, Cl, Br, I)",
    prefix: "halo-",
    enExample: "Chloroform (CHCl\u2083)",
    khExample: "ក្លរ៉ូផម (CHCl\u2083)",
  },

  /* ── Carbonyl (C=O) family ────────────────────────────────────────── */
  {
    id: "aldehyde",
    category: "carbonyl",
    enName: "Aldehyde",
    khName: "អាល់ដេអ៊ីត",
    formula: "R\u2014CHO",
    suffix: "-al",
    prefix: "oxo-",
    enExample: "Formaldehyde (preservative)",
    khExample: "ផមាល់ដេអ៊ីត (សារធាតុរក្សា)",
  },
  {
    id: "ketone",
    category: "carbonyl",
    enName: "Ketone",
    khName: "សេតូន",
    formula: "R\u2014CO\u2014R'",
    suffix: "-one",
    prefix: "oxo-",
    enExample: "Acetone (nail-polish remover)",
    khExample: "អាសេតូន (ថ្នាំលុបក្រចក)",
  },
  {
    id: "carboxylic-acid",
    category: "carbonyl",
    enName: "Carboxylic Acid",
    khName: "អាស៊ីតកាបុកស៊ីលិក",
    formula: "R\u2014COOH",
    suffix: "-oic acid",
    prefix: "carboxy-",
    enExample: "Acetic acid (vinegar)",
    khExample: "អាស៊ីតអាសេទិក (ទឹកខ្មេះ)",
  },
  {
    id: "ester",
    category: "carbonyl",
    enName: "Ester",
    khName: "អេស្តែរ",
    formula: "R\u2014COO\u2014R'",
    suffix: "-oate",
    enExample: "Ethyl acetate (fruity smell)",
    khExample: "អេទីលអាសេតាត (ក្លិនផ្លែឈើ)",
  },
  {
    id: "amide",
    category: "carbonyl",
    enName: "Amide",
    khName: "អាមីដ",
    formula: "R\u2014CONH\u2082",
    suffix: "-amide",
    prefix: "carbamoyl-",
    enExample: "Paracetamol, urea",
    khExample: "ប៉ារ៉ាសេតាមុល អ៊ុយរ៉េ",
  },
  {
    id: "acyl-chloride",
    category: "carbonyl",
    enName: "Acyl Chloride",
    khName: "អាស៊ីលក្លរួ",
    formula: "R\u2014COCl",
    suffix: "-oyl chloride",
    enExample: "Acetyl chloride (lab reagent)",
    khExample: "អាសេទីលក្លរួ (សារធាតុមន្ទីរពិសោធន៍)",
  },

  /* ── Nitrogen-based ───────────────────────────────────────────────── */
  {
    id: "nitrile",
    category: "nitrogen",
    enName: "Nitrile",
    khName: "នីទ្រីល",
    formula: "R\u2014C\u2261N",
    suffix: "-nitrile",
    prefix: "cyano-",
    enExample: "Acetonitrile (lab solvent)",
    khExample: "អាសេតូនីទ្រីល (សារធាតុរំលាយ)",
  },
];
