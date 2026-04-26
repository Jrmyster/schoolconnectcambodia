/**
 * Organic Reactions — data layer for the Synthesis Engine module.
 *
 * Each reaction is a self-describing record: data-driven so the UI never
 * hardcodes any reaction. To add a new reaction, just append an object here
 * (id must be unique). All bilingual strings have an EN + KH variant.
 *
 * Categories:
 *   carbonyl   — C=O chemistry (additions, condensations, oxidation)
 *   aromatic   — benzene / aryl chemistry (EAS, Sandmeyer)
 *   enolate    — α-carbon chemistry (aldol, kinetic vs thermodynamic enolates)
 *   alkene     — C=C chemistry (hydration, hydroboration, ozonolysis)
 */

export type ReactionCategory = "carbonyl" | "aromatic" | "enolate" | "alkene";

export type Reaction = {
  id: string;
  category: ReactionCategory;
  /** Human-readable name of the starting material (EN). */
  startMolecule: string;
  startMoleculeKh: string;
  /** Reagent + conditions written compactly, e.g. "NaCN / H₂O". */
  reagent: string;
  /** Product / end molecule (EN). */
  endMolecule: string;
  endMoleculeKh: string;
  /** Reaction-type label, e.g. "Nucleophilic Addition". */
  reactionType: string;
  reactionTypeKh: string;
  /** Conditions / context (EN). */
  conditions: string;
  conditionsKh: string;
  /** One-line bilingual mechanism note. */
  notes: string;
  notesKh: string;
};

export const REACTION_CATEGORIES: {
  id: ReactionCategory;
  labelEn: string;
  labelKh: string;
  /** Tailwind accent color used for tabs / chips for this category. */
  accent: string;
}[] = [
  { id: "aromatic", labelEn: "Aromatics", labelKh: "សារធាតុក្រអូប",     accent: "indigo"  },
  { id: "enolate",  labelEn: "Enolates",  labelKh: "អេណូឡាត",           accent: "amber"   },
  { id: "alkene",   labelEn: "Alkenes",   labelKh: "អាល់កែន",          accent: "emerald" },
  { id: "carbonyl", labelEn: "Carbonyls", labelKh: "កាបូនីល",          accent: "sky"     },
];

export const REACTIONS: Reaction[] = [
  /* ── CARBONYLS ───────────────────────────────────────────────── */
  {
    id: "carbonyl-cyanohydrin",
    category: "carbonyl",
    startMolecule: "Aldehyde / Ketone",
    startMoleculeKh: "អាល់ដេអ៊ីត / កេតូន",
    reagent: "NaCN / H₂O",
    endMolecule: "Cyanohydrin",
    endMoleculeKh: "ស៊ីយ៉ាណូហ៊ីដ្រីន",
    reactionType: "Nucleophilic Addition",
    reactionTypeKh: "ការបន្ថែមនុយក្លេអូហ្វីលីក",
    conditions: "0–25 °C, aqueous",
    conditionsKh: "0–25 °C ក្នុងទឹក",
    notes:
      "Cyanide ion (⁻CN) attacks the electrophilic carbonyl carbon, then water protonates the resulting alkoxide to give a hydroxyl-nitrile (cyanohydrin).",
    notesKh:
      "អ៊ីយុង ⁻CN វាយលុកកាបូននៃក្រុមកាបូនីល បន្ទាប់មកទឹកធ្វើឱ្យអាល់កុកស៊ីតក្លាយជាហ៊ីដ្រូស៊ីល-នីត្រីល (ស៊ីយ៉ាណូហ៊ីដ្រីន)។",
  },
  {
    id: "carbonyl-acetal",
    category: "carbonyl",
    startMolecule: "Aldehyde",
    startMoleculeKh: "អាល់ដេអ៊ីត",
    reagent: "2 ROH / H⁺ (cat.)",
    endMolecule: "Acetal",
    endMoleculeKh: "អាសេតាល់",
    reactionType: "Acid-Catalyzed Acetalization",
    reactionTypeKh: "ការបង្កើតអាសេតាល់ដោយអាស៊ីត",
    conditions: "Anhydrous, H⁺ catalyst, remove H₂O",
    conditionsKh: "គ្មានទឹក, ជាមួយ H⁺, ដកទឹកចេញ",
    notes:
      "Two equivalents of alcohol add to the aldehyde under acid catalysis to give a stable acetal (RCH(OR')₂). Water is the byproduct — drive equilibrium by removing it.",
    notesKh:
      "អាល់កុលពីរម៉ូលរួមជាមួយអាល់ដេអ៊ីតក្រោមការកាតាលីសដោយអាស៊ីត ផលិតបានអាសេតាល់ស្ថិតស្ថេរ (RCH(OR')₂)។ ទឹកជាផលរង — ដកវាចេញដើម្បីជំរុញសមតុល្យ។",
  },
  {
    id: "carbonyl-imine",
    category: "carbonyl",
    startMolecule: "Aldehyde / Ketone",
    startMoleculeKh: "អាល់ដេអ៊ីត / កេតូន",
    reagent: "Primary Amine R-NH₂",
    endMolecule: "Imine (Schiff base)",
    endMoleculeKh: "អ៊ីមីន (Schiff base)",
    reactionType: "Condensation (–H₂O)",
    reactionTypeKh: "ការផ្តួលរួម (–H₂O)",
    conditions: "Mild acid catalyst (pH ~4–5)",
    conditionsKh: "អាស៊ីតស្រាល (pH ~4–5)",
    notes:
      "The amine attacks the carbonyl, then loses water to form a C=N double bond. This is how the body builds enzyme intermediates and how many drug candidates form.",
    notesKh:
      "អាមីនវាយលុកកាបូនីល បន្ទាប់មកបាត់បង់ទឹកដើម្បីបង្កើតចំណង C=N។ នេះជារបៀបដែលរាងកាយបង្កើតអន្តរផលអង់ស៊ីម និងរបៀបដែលថ្នាំជាច្រើនត្រូវបានបង្កើត។",
  },
  {
    id: "carbonyl-oxidation-kmno4",
    category: "carbonyl",
    startMolecule: "Primary Alcohol",
    startMoleculeKh: "អាល់កុលបឋម",
    reagent: "KMnO₄ / H₂O",
    endMolecule: "Carboxylic Acid",
    endMoleculeKh: "អាស៊ីតកាបូកស៊ីលីក",
    reactionType: "Strong Oxidation",
    reactionTypeKh: "អុកស៊ីដាស្យុងខ្លាំង",
    conditions: "Aqueous, often warm",
    conditionsKh: "ក្នុងទឹក ច្រើនត្រូវកំដៅ",
    notes:
      "KMnO₄ is a strong oxidant — it pushes a primary alcohol all the way past the aldehyde stage to a carboxylic acid (–COOH). Solution turns from purple to brown MnO₂.",
    notesKh:
      "KMnO₄ ជាសារធាតុអុកស៊ីដឆន់ខ្លាំង — វារុញអាល់កុលបឋមឱ្យឆ្លងផុតដំណាក់កាលអាល់ដេអ៊ីតទៅជាអាស៊ីតកាបូកស៊ីលីក (–COOH)។ សូលុយស្យុងប្តូរពីពណ៌ស្វាយទៅពណ៌ត្នោត MnO₂។",
  },

  /* ── AROMATICS ───────────────────────────────────────────────── */
  {
    id: "aromatic-nitration",
    category: "aromatic",
    startMolecule: "Benzene",
    startMoleculeKh: "បេនហ្សែន",
    reagent: "HNO₃ / H₂SO₄",
    endMolecule: "Nitrobenzene",
    endMoleculeKh: "នីត្រូបេនហ្សែន",
    reactionType: "Electrophilic Aromatic Substitution (Nitration)",
    reactionTypeKh: "ការជំនួសក្រអូបអេឡិចត្រូហ្វីលីក (នីត្រាស្យុង)",
    conditions: "50 °C, anhydrous",
    conditionsKh: "50 °C គ្មានទឹក",
    notes:
      "H₂SO₄ activates HNO₃ to form the nitronium ion ⁺NO₂, which the benzene π-system attacks. A proton is lost to restore aromaticity.",
    notesKh:
      "H₂SO₄ ធ្វើឱ្យ HNO₃ បង្កើតអ៊ីយុងនីត្រូនីយ៉ូម ⁺NO₂ ដែលប្រព័ន្ធ π នៃបេនហ្សែនវាយលុក។ ប្រូតុងមួយត្រូវបាត់ដើម្បីស្តារភាពក្រអូបឡើងវិញ។",
  },
  {
    id: "aromatic-halogenation",
    category: "aromatic",
    startMolecule: "Benzene",
    startMoleculeKh: "បេនហ្សែន",
    reagent: "X₂ / FeX₃ (X = Cl, Br)",
    endMolecule: "Halobenzene (PhX)",
    endMoleculeKh: "ហាឡូបេនហ្សែន (PhX)",
    reactionType: "Electrophilic Aromatic Substitution (Halogenation)",
    reactionTypeKh: "ការជំនួសក្រអូបអេឡិចត្រូហ្វីលីក (ហាឡូជេនាស្យុង)",
    conditions: "Dark, anhydrous, room temp",
    conditionsKh: "ងងឹត គ្មានទឹក សីតុណ្ហភាពបន្ទប់",
    notes:
      "Lewis acid FeX₃ polarises X₂ into X⁺ ··· X-FeX₃⁻. Benzene attacks X⁺, then loses H⁺. Note: F₂ is too violent and I₂ too weak for direct EAS.",
    notesKh:
      "អាស៊ីត Lewis FeX₃ ធ្វើឱ្យ X₂ ប្រែជា X⁺ ··· X-FeX₃⁻។ បេនហ្សែនវាយលុក X⁺ បន្ទាប់មកបាត់ H⁺។ ចំណាំ៖ F₂ ខ្លាំងពេក និង I₂ ទន់ពេកសម្រាប់ EAS ផ្ទាល់។",
  },
  {
    id: "aromatic-sandmeyer",
    category: "aromatic",
    startMolecule: "Aryl Diazonium Salt (ArN₂⁺)",
    startMoleculeKh: "អំបិលដាយអាហ្សូនីយ៉ូមអារីល (ArN₂⁺)",
    reagent: "CuCl, CuBr, or CuCN",
    endMolecule: "Aryl Halide / Aryl Nitrile",
    endMoleculeKh: "ហាឡូអូដអារីល / នីត្រីលអារីល",
    reactionType: "Sandmeyer Reaction",
    reactionTypeKh: "ប្រតិកម្ម Sandmeyer",
    conditions: "0–5 °C, aqueous",
    conditionsKh: "0–5 °C ក្នុងទឹក",
    notes:
      "Diazonium loses N₂ as gas; the copper(I) salt delivers the new substituent (Cl, Br, or CN) onto the ring. Lets you install groups EAS cannot.",
    notesKh:
      "ដាយអាហ្សូនីយ៉ូមបាត់ N₂ ជាឧស្ម័ន អំបិលទង់ដែង(I) បញ្ជូនក្រុមថ្មី (Cl, Br ឬ CN) មកលើរង្វង់។ អនុញ្ញាតឱ្យដាក់ក្រុមដែល EAS មិនអាចដាក់បាន។",
  },

  /* ── ENOLATES ────────────────────────────────────────────────── */
  {
    id: "enolate-aldol",
    category: "enolate",
    startMolecule: "Aldehyde / Ketone",
    startMoleculeKh: "អាល់ដេអ៊ីត / កេតូន",
    reagent: "NaOH (aq), Δ",
    endMolecule: "α,β-Unsaturated Carbonyl (enone)",
    endMoleculeKh: "កាបូនីលមិនឆ្អែត α,β (អេណូន)",
    reactionType: "Aldol Condensation",
    reactionTypeKh: "ការផ្តួលរួមអាល់ដុល",
    conditions: "Aqueous base, heat to dehydrate",
    conditionsKh: "បាសក្នុងទឹក កំដៅដើម្បីដកទឹក",
    notes:
      "Base removes an α-H; the enolate adds to a second carbonyl to give a β-hydroxy carbonyl, which dehydrates on heating to the conjugated enone.",
    notesKh:
      "បាសដក α-H អេណូឡាតរួមជាមួយកាបូនីលទីពីរបង្កើតបាន β-hydroxy carbonyl ដែលដកទឹកក្នុងពេលកំដៅ ផលិតបានអេណូនកុងហ្យូហ្គេ។",
  },
  {
    id: "enolate-kinetic",
    category: "enolate",
    startMolecule: "Unsymmetrical Ketone",
    startMoleculeKh: "កេតូនមិនស៊ីមេទ្រី",
    reagent: "LDA / THF, –78 °C",
    endMolecule: "Kinetic Enolate (less-substituted)",
    endMoleculeKh: "អេណូឡាតស៊ីណេទិច (មានជំនួសតិច)",
    reactionType: "Kinetic Deprotonation",
    reactionTypeKh: "ការដកប្រូតុងស៊ីណេទិច",
    conditions: "Strong, bulky base; very cold",
    conditionsKh: "បាសខ្លាំងធំ; ត្រជាក់ខ្លាំង",
    notes:
      "Bulky LDA at –78 °C grabs the most accessible α-H (the less-hindered side) faster than equilibrium can move it. Result: the kinetic enolate is trapped.",
    notesKh:
      "LDA ធំៗនៅ –78 °C ចាប់ α-H ដែលងាយប៉ះទង្គិចបំផុត (ចំហៀងជំនួសតិច) លឿនជាងសមតុល្យអាចផ្លាស់ប្តូរបាន។ លទ្ធផល៖ អេណូឡាតស៊ីណេទិចត្រូវបានចាប់ជាប់។",
  },
  {
    id: "enolate-thermodynamic",
    category: "enolate",
    startMolecule: "Unsymmetrical Ketone",
    startMoleculeKh: "កេតូនមិនស៊ីមេទ្រី",
    reagent: "LDA / THF, room temp",
    endMolecule: "Thermodynamic Enolate (more-substituted)",
    endMoleculeKh: "អេណូឡាតធើម៉ូឌីណាមិច (មានជំនួសច្រើន)",
    reactionType: "Thermodynamic Deprotonation",
    reactionTypeKh: "ការដកប្រូតុងធើម៉ូឌីណាមិច",
    conditions: "Equilibrium conditions, warmer",
    conditionsKh: "លក្ខខណ្ឌសមតុល្យ ក្តៅជាង",
    notes:
      "At room temperature equilibrium has time to settle on the more-substituted (more-stable, hyperconjugation-favored) enolate. Same base, different temperature, opposite product.",
    notesKh:
      "នៅសីតុណ្ហភាពបន្ទប់ សមតុល្យមានពេលដើម្បីសង្កត់ទៅលើអេណូឡាតមានជំនួសច្រើន (ស្ថិតស្ថេរជាង)។ បាសដូចគ្នា សីតុណ្ហភាពផ្សេងគ្នា ផលិតផលផ្ទុយគ្នា។",
  },

  /* ── ALKENES ─────────────────────────────────────────────────── */
  {
    id: "alkene-markovnikov",
    category: "alkene",
    startMolecule: "Alkene",
    startMoleculeKh: "អាល់កែន",
    reagent: "H₃O⁺ (dilute H₂SO₄ in H₂O)",
    endMolecule: "Markovnikov Alcohol",
    endMoleculeKh: "អាល់កុលម៉ាកូវនីកូវ",
    reactionType: "Acid-Catalyzed Hydration",
    reactionTypeKh: "ការបន្ថែមទឹកដោយអាស៊ីត",
    conditions: "Dilute aqueous acid",
    conditionsKh: "អាស៊ីតរលាយក្នុងទឹក",
    notes:
      "Proton adds to the less-substituted carbon (forming the most-stable carbocation); water then adds to the more-substituted carbon — the OH lands on the more-substituted side.",
    notesKh:
      "ប្រូតុងបន្ថែមលើកាបូនមានជំនួសតិច (បង្កើតកាបូកាទីយ៉ុងស្ថិតស្ថេរបំផុត); ទឹកបន្ថែមលើកាបូនមានជំនួសច្រើន — OH ធ្លាក់លើចំហៀងមានជំនួសច្រើន។",
  },
  {
    id: "alkene-anti-markovnikov",
    category: "alkene",
    startMolecule: "Alkene",
    startMoleculeKh: "អាល់កែន",
    reagent: "1) BH₃ · THF   2) H₂O₂ / OH⁻",
    endMolecule: "Anti-Markovnikov Alcohol",
    endMoleculeKh: "អាល់កុលប្រឆាំងម៉ាកូវនីកូវ",
    reactionType: "Hydroboration–Oxidation",
    reactionTypeKh: "ហ៊ីដ្រូបូរាស្យុង–អុកស៊ីដាស្យុង",
    conditions: "Two-step, anhydrous step 1",
    conditionsKh: "ពីរជំហាន, ជំហានទី1 គ្មានទឹក",
    notes:
      "BH₃ adds with B on the less-hindered carbon (steric control). Peroxide replaces B with OH while keeping the position — so OH lands on the less-substituted side: anti-Markovnikov, syn addition.",
    notesKh:
      "BH₃ បន្ថែមដោយ B នៅលើកាបូនមានឧបសគ្គតិច (ការគ្រប់គ្រងស្តេរីច)។ ប៉េអុកស៊ីតប្តូរ B ជាមួយ OH ដោយរក្សាទីតាំង — ដូច្នេះ OH ធ្លាក់លើចំហៀងមានជំនួសតិច៖ ប្រឆាំងម៉ាកូវនីកូវ ការបន្ថែម syn។",
  },
  {
    id: "alkene-ozonolysis",
    category: "alkene",
    startMolecule: "Alkene",
    startMoleculeKh: "អាល់កែន",
    reagent: "1) O₃   2) Zn / CH₃COOH",
    endMolecule: "Two Carbonyl Fragments (Aldehydes / Ketones)",
    endMoleculeKh: "បំណែកកាបូនីលពីរ (អាល់ដេអ៊ីត / កេតូន)",
    reactionType: "Ozonolysis (reductive workup)",
    reactionTypeKh: "អូហ្សូណូលីស (ការដោះស្រាយរេឌុកស៊ីយ៉ុង)",
    conditions: "–78 °C step 1; mild reductant step 2",
    conditionsKh: "–78 °C ជំហានទី1; រេឌុកតង់ស្រាលជំហានទី2",
    notes:
      "Ozone cleaves the C=C double bond entirely. Reductive workup (Zn/AcOH) gives two carbonyl pieces — perfect for working out where a double bond used to be.",
    notesKh:
      "អូហ្សូនកាត់ចំណង C=C ទាំងស្រុង។ ការដោះស្រាយរេឌុកស៊ីយ៉ុង (Zn/AcOH) ផ្តល់បំណែកកាបូនីលពីរ — ល្អឥតខ្ចោះសម្រាប់រកមើលថាចំណងទ្វេធ្លាប់នៅទីណា។",
  },
];

/**
 * Build a search index value from a reaction. Lowercased + diacritic-stripped
 * so a query like "kmno4" matches "KMnO₄".
 */
export function reactionSearchBlob(r: Reaction): string {
  const raw = [
    r.startMolecule,
    r.startMoleculeKh,
    r.reagent,
    r.endMolecule,
    r.endMoleculeKh,
    r.reactionType,
    r.reactionTypeKh,
    r.conditions,
    r.conditionsKh,
    r.notes,
    r.notesKh,
  ].join(" ");
  // Replace common subscript / superscript unicode digits with their ASCII forms
  // so a student typing "H2O" matches "H₂O".
  const map: Record<string, string> = {
    "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4",
    "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9",
    "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
    "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
    "⁺": "+", "⁻": "-", "·": " ", "→": " ", "Δ": " ",
  };
  return raw
    .replace(/[₀-₉⁰-⁹⁺⁻·→Δ]/g, (c) => map[c] ?? c)
    .toLowerCase();
}
