import { useEffect, useState } from "react";
import {
  Shield,
  HeartPulse,
  Stethoscope,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Lock,
  ChevronDown,
  Phone,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Sexual Health & Pathogen Protection
//  សុខភាពផ្លូវភេទ និងការការពារមេរោគ
//
//  A privacy-first, clinically accurate, non-judgmental bilingual page
//  for the Well-being section. Three modules:
//
//   1. Pathogen Profiles — six clean medical cards (HIV, Chlamydia, Gonorrhea,
//      Syphilis, HPV, Genital Herpes) with Symptoms and Transmission for each.
//   2. Truth vs. Myth — toggle list correcting common misinformation.
//   3. Care Path — a 3-step action plan for "what to do if you are worried."
//
//  Privacy:
//   - "Quick Exit" button at the top that immediately replaces the current
//     page with the homepage in the browser history (so the back button does
//     not return here).
//   - Esc key also triggers Quick Exit.
//   - Soft blue/teal medical palette, no graphic imagery, only line icons.
// ════════════════════════════════════════════════════════════════════════════

export default function SexualHealthPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  // ── Quick exit ─────────────────────────────────────────────────────────
  const quickExit = () => {
    // Replace current entry so the back button does not return here
    window.location.replace("/");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") quickExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ── Privacy bar (sticky) ────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600 min-w-0">
            <Lock className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
            <span className={`truncate ${isKh ? "font-khmer" : ""}`}>
              {isKh
                ? "ឯកជន — យើងមិនរក្សាទុកនូវអ្វីដែលអ្នកអានទេ។"
                : "Private — we do not record what you read here."}
            </span>
          </div>
          <button
            onClick={quickExit}
            className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:outline-none transition-colors ${
              isKh ? "font-khmer" : ""
            }`}
            data-testid="quick-exit-button"
            aria-label={isKh ? "ចេញលឿន — ត្រឡប់ទៅទំព័រដើម" : "Quick Exit — return to home page"}
          >
            <XCircle className="w-3.5 h-3.5" />
            {isKh ? "ចេញលឿន" : "Quick Exit"}
            <kbd className="hidden sm:inline-block ml-1 px-1 py-0.5 text-[9px] bg-white/20 rounded font-mono">Esc</kbd>
          </button>
        </div>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <header className="bg-gradient-to-b from-teal-50 to-slate-50 border-b border-teal-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-teal-200 rounded-full px-4 py-1.5 mb-5 text-xs font-semibold text-teal-700">
            <HeartPulse className="w-3.5 h-3.5" />
            {isKh ? "សុខភាព និងការអប់រំ" : "Health Education"}
          </div>

          <h1 className={`font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-3 leading-tight ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? (
              <>សុខភាពផ្លូវភេទ <span className="text-teal-600">និងការការពារមេរោគ</span></>
            ) : (
              <>Sexual Health <span className="text-teal-600">& Pathogen Protection</span></>
            )}
          </h1>

          <p className={`text-slate-600 max-w-2xl ${isKh ? "font-khmer text-base leading-loose" : "text-base leading-relaxed"}`}>
            {isKh
              ? "ព័ត៌មានច្បាស់លាស់ មិនវិនិច្ឆ័យ និងផ្អែកលើវិទ្យាសាស្ត្រ ដើម្បីជួយអ្នករក្សាសុខភាពខ្លួន និងស្គាល់ពីពេលដែលត្រូវសុំជំនួយ។ ការដឹងគឺជាការការពារ។"
              : "Clear, non-judgmental, science-based information to help you keep yourself healthy and know when to ask for help. Knowledge is protection."}
          </p>

          {/* Reassurance card */}
          <div className="mt-6 inline-flex items-start gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 max-w-xl">
            <Shield className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className={`text-sm font-bold text-slate-800 mb-0.5 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "សម្រាប់ការសិក្សាប៉ុណ្ណោះ" : "For learning, not diagnosis"}
              </div>
              <p className={`text-xs text-slate-600 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh
                  ? "ទំព័រនេះផ្ដល់ព័ត៌មានទូទៅ។ បើអ្នកមានការព្រួយបារម្ភពិតប្រាកដ សូមនិយាយជាមួយវេជ្ជបណ្ឌិត ឬមជ្ឈមណ្ឌលសុខភាព។"
                  : "This page provides general information only. If you have a real concern, please speak with a doctor or a health centre."}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── Tool 1: Pathogen Profiles ───────────────────────────────────── */}
      <Section
        eyebrowEn="Pathogen Profiles"
        eyebrowKh="ប្រវត្តិមេរោគ"
        titleEn="Six common infections, explained simply"
        titleKh="មេរោគចម្លងតាមផ្លូវភេទ ៦ ប្រភេទ ពន្យល់ដោយសាមញ្ញ"
        descEn="Each card shows the typical symptoms and how the infection spreads. Many of these can have no symptoms at all for months or years — that's why testing matters."
        descKh="កាតនីមួយៗបង្ហាញនូវរោគសញ្ញាធម្មតា និងរបៀបដែលមេរោគនេះចម្លង។ ច្រើនក្នុងចំណោមនេះអាចមិនបង្ហាញរោគសញ្ញាអ្វីទាំងអស់ ពេញរយៈពេលជាច្រើនខែ ឬជាច្រើនឆ្នាំ — នោះហើយជាមូលហេតុដែលការត្រួតពិនិត្យសំខាន់។"
        isKh={isKh}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PATHOGENS.map((p) => (
            <PathogenCard key={p.id} p={p} isKh={isKh} />
          ))}
        </div>
      </Section>

      {/* ── Tool 2: Truth vs Myth ───────────────────────────────────────── */}
      <Section
        eyebrowEn="Truth vs. Myth"
        eyebrowKh="ការពិត ទល់នឹង រឿងភូតភរ"
        titleEn="Common misinformation, corrected"
        titleKh="ការយល់ខុសសាមញ្ញ បានកែតម្រូវ"
        descEn="Tap each myth to see the truth. Spreading correct information is one of the most powerful ways to protect your community."
        descKh="ចុចលើរឿងភូតភរនីមួយៗដើម្បីមើលការពិត។ ការផ្សព្វផ្សាយព័ត៌មានត្រឹមត្រូវ គឺជាមធ្យោបាយដ៏មានឥទ្ធិពលបំផុតមួយក្នុងការការពារសហគមន៍របស់អ្នក។"
        isKh={isKh}
      >
        <div className="space-y-3">
          {MYTHS.map((m, i) => (
            <MythRow key={i} m={m} isKh={isKh} />
          ))}
        </div>
      </Section>

      {/* ── Tool 3: Care Path ───────────────────────────────────────────── */}
      <Section
        eyebrowEn="Care Path"
        eyebrowKh="ផ្លូវនៃការថែទាំ"
        titleEn="What to do if you are worried"
        titleKh="អ្វីដែលត្រូវធ្វើ បើអ្នកមានការព្រួយបារម្ភ"
        descEn="A simple, calm three-step plan. You are not alone, and most infections are treatable when caught early."
        descKh="ផែនការ ៣ ជំហានសាមញ្ញ និងស្ងប់។ អ្នកមិននៅម្នាក់ឯងទេ ហើយមេរោគភាគច្រើនអាចព្យាបាលបាន ប្រសិនបើរកឃើញទាន់ពេល។"
        isKh={isKh}
      >
        <div className="space-y-4">
          {CARE_STEPS.map((s, i) => (
            <CareStep key={i} step={s} index={i + 1} isKh={isKh} />
          ))}
        </div>
      </Section>

      {/* ── Resources / closing ─────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-2xl bg-gradient-to-br from-teal-600 to-sky-700 text-white p-6 sm:p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <Phone className="w-7 h-7 flex-shrink-0 mt-0.5 opacity-90" />
            <div>
              <h3 className={`font-display font-bold text-xl sm:text-2xl mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? "ត្រូវការនិយាយជាមួយនរណាម្នាក់?" : "Need to talk to someone?"}
              </h3>
              <p className={`text-white/90 text-sm mb-4 max-w-2xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh
                  ? "មជ្ឈមណ្ឌលសុខភាពសាធារណៈនៅកម្ពុជាផ្ដល់សេវាកម្មត្រួតពិនិត្យ និងព្យាបាលដោយឥតគិតថ្លៃ ឬតម្លៃទាប — ក្នុងភាពឯកជនពេញលេញ។"
                  : "Public health centres in Cambodia offer testing and treatment for free or at low cost — completely confidentially."}
              </p>
              <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ${isKh ? "font-khmer" : ""}`}>
                <ResourceItem
                  en="Provincial referral hospital"
                  kh="មន្ទីរពេទ្យបង្អែកខេត្ត"
                />
                <ResourceItem
                  en="Public Health Operational District clinic"
                  kh="គ្លីនិកស្រុកប្រតិបត្តិសុខាភិបាល"
                />
                <ResourceItem
                  en="School nurse or trusted teacher"
                  kh="គិលានុបដ្ឋាយិកាសាលា ឬគ្រូដែលអ្នកទុកចិត្ត"
                />
                <ResourceItem
                  en="National HIV/AIDS hotline"
                  kh="ខ្សែទូរស័ព្ទជំនួយ HIV/AIDS ជាតិ"
                />
              </ul>
            </div>
          </div>
        </div>

        <p className={`mt-6 text-center text-xs text-slate-500 max-w-xl mx-auto ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "សូមចំណាំ៖ ទំព័រនេះជាការអប់រំ មិនមែនការវិនិច្ឆ័យវេជ្ជសាស្ត្រទេ។ សូមពិគ្រោះវេជ្ជបណ្ឌិត​ដែល​មាន​លក្ខណសម្បត្តិ​សម្រាប់​ការ​ថែទាំ​ផ្ទាល់​ខ្លួន។"
            : "Note: this page is educational, not medical advice. Please consult a qualified healthcare provider for personal care."}
        </p>
      </section>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section wrapper
// ════════════════════════════════════════════════════════════════════════════

function Section({
  eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-xs font-bold tracking-widest uppercase text-teal-700 mb-2">
        <span className={isKh ? "font-khmer tracking-normal" : ""}>{isKh ? eyebrowKh : eyebrowEn}</span>
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-slate-600 text-sm mb-6 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      {children}
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 1: Pathogen Profiles
// ════════════════════════════════════════════════════════════════════════════

type PathogenType = "virus" | "bacteria";

type Pathogen = {
  id: string;
  nameEn: string;
  nameKh: string;
  type: PathogenType;
  curableEn: "Curable with antibiotics" | "Manageable with medicine" | "Preventable with vaccine, manageable";
  curableKh: string;
  symptomsEn: string;
  symptomsKh: string;
  transmissionEn: string;
  transmissionKh: string;
};

const PATHOGENS: Pathogen[] = [
  {
    id: "hiv",
    nameEn: "HIV",
    nameKh: "មេរោគ HIV",
    type: "virus",
    curableEn: "Manageable with medicine",
    curableKh: "គ្រប់គ្រងបានដោយឱសថ",
    symptomsEn: "Often no symptoms for years. Early signs (2–4 weeks after exposure) can include fever, sore throat, fatigue, and swollen lymph nodes — easy to mistake for flu. Without treatment it slowly weakens the immune system.",
    symptomsKh: "ច្រើនតែគ្មានរោគសញ្ញាពេញរយៈពេលជាច្រើនឆ្នាំ។ សញ្ញាដំបូង (២–៤ សប្ដាហ៍ក្រោយប៉ះមេរោគ) អាចរួមមាន គ្រុនក្ដៅ ឈឺបំពង់ក អស់កម្លាំង និងក្រពេញឡាំហ្វាហើម — ងាយច្រឡំជាជំងឺផ្ដាសាយ។ ប្រសិនបើគ្មានការព្យាបាល វាបន្ថយប្រព័ន្ធការពាររាងកាយយឺតៗ។",
    transmissionEn: "Through specific body fluids: blood, semen, vaginal fluids, and breast milk. Most often spreads through unprotected sex, sharing needles, or from mother to child during birth or breastfeeding. NOT spread by hugs, food, water, mosquitoes, or toilet seats.",
    transmissionKh: "តាមរយៈវត្ថុរាវរាងកាយជាក់លាក់៖ ឈាម ទឹកកាម ទឹករំអិលទ្វារមាស និងទឹកដោះម្ដាយ។ ភាគច្រើនចម្លងតាមរយៈការរួមភេទដោយគ្មានការការពារ ការប្រើម្ជុលរួមគ្នា ឬពីម្ដាយទៅកូននៅពេលសម្រាល ឬបំបៅដោះ។ មិនចម្លងតាមការឱប អាហារ ទឹក មូស ឬកៅអីបង្គន់។",
  },
  {
    id: "chlamydia",
    nameEn: "Chlamydia",
    nameKh: "ក្លាមីឌា (Chlamydia)",
    type: "bacteria",
    curableEn: "Curable with antibiotics",
    curableKh: "ព្យាបាលជាសះស្បើយដោយថ្នាំអង់ទីប៊ីយ៉ូទិក",
    symptomsEn: "About 70% of people with chlamydia have NO symptoms. When symptoms appear: unusual discharge, burning when urinating, or pain in the lower belly. If untreated, it can damage fertility.",
    symptomsKh: "ប្រហែល ៧០% នៃអ្នកដែលមាន chlamydia គ្មានរោគសញ្ញាទេ។ នៅពេលរោគសញ្ញាបង្ហាញ៖ មានសារធាតុហូរចេញខុសធម្មតា ឆេះនៅពេលនោម ឬឈឺនៅចំពោះក្បាល។ បើគ្មានការព្យាបាល វាអាចបំផ្លាញដល់សមត្ថភាពបង្កើតកូន។",
    transmissionEn: "Spreads through unprotected vaginal, anal, or oral sex with an infected person. Can also pass from mother to baby during birth.",
    transmissionKh: "ចម្លងតាមរយៈការរួមភេទដោយគ្មានការការពារ ជាមួយអ្នកដែលមានមេរោគ។ ក៏អាចចម្លងពីម្ដាយទៅកូននៅពេលសម្រាលដែរ។",
  },
  {
    id: "gonorrhea",
    nameEn: "Gonorrhea",
    nameKh: "ប្រមេះទឹកបាយ (Gonorrhea)",
    type: "bacteria",
    curableEn: "Curable with antibiotics",
    curableKh: "ព្យាបាលជាសះស្បើយដោយថ្នាំអង់ទីប៊ីយ៉ូទិក",
    symptomsEn: "Often no symptoms, especially in women. When present: thick discharge, painful or burning urination, or sore throat (if oral). Untreated, it can spread to joints and cause serious illness.",
    symptomsKh: "ច្រើនតែគ្មានរោគសញ្ញា ជាពិសេសចំពោះស្ត្រី។ នៅពេលមាន៖ មានសារធាតុហូរក្រាស់ ការនោមឈឺ ឬឆេះ ឬឈឺបំពង់ក (បើតាមមាត់)។ បើគ្មានការព្យាបាល វាអាចរាលដាលដល់សន្លាក់ និងបណ្ដាលឲ្យជំងឺធ្ងន់ធ្ងរ។",
    transmissionEn: "Through unprotected vaginal, anal, or oral sex. Can also pass from mother to baby during birth.",
    transmissionKh: "តាមរយៈការរួមភេទដោយគ្មានការការពារ។ ក៏អាចចម្លងពីម្ដាយទៅកូននៅពេលសម្រាលដែរ។",
  },
  {
    id: "syphilis",
    nameEn: "Syphilis",
    nameKh: "ស្វាយ (Syphilis)",
    type: "bacteria",
    curableEn: "Curable with antibiotics",
    curableKh: "ព្យាបាលជាសះស្បើយដោយថ្នាំអង់ទីប៊ីយ៉ូទិក",
    symptomsEn: "Three stages. First: a painless sore (often unnoticed). Second: a body rash and flu-like feeling. Third (years later, untreated): serious damage to the heart, brain, and nerves. Easy to cure in early stages.",
    symptomsKh: "មាន ៣ ដំណាក់កាល។ ទីមួយ៖ ដំបៅឥតឈឺ (ច្រើនតែមើលមិនឃើញ)។ ទីពីរ៖ កន្ទួលលើខ្លួន និងអារម្មណ៍ដូចផ្ដាសាយ។ ទីបី (ច្រើនឆ្នាំក្រោយ បើមិនព្យាបាល)៖ បំផ្លាញធ្ងន់ធ្ងរដល់បេះដូង ខួរក្បាល និងសរសៃប្រសាទ។ ងាយព្យាបាលនៅដំណាក់កាលដំបូង។",
    transmissionEn: "Through direct contact with a syphilis sore during vaginal, anal, or oral sex. Also spreads from a pregnant mother to her baby.",
    transmissionKh: "តាមរយៈការប៉ះផ្ទាល់នឹងដំបៅស្វាយ ក្នុងពេលរួមភេទ។ ក៏ចម្លងពីម្ដាយមានផ្ទៃពោះទៅកូនដែរ។",
  },
  {
    id: "hpv",
    nameEn: "HPV (Human Papillomavirus)",
    nameKh: "មេរោគ HPV",
    type: "virus",
    curableEn: "Preventable with vaccine, manageable",
    curableKh: "ការពារបានដោយវ៉ាក់សាំង គ្រប់គ្រងបាន",
    symptomsEn: "Most people clear it without ever knowing they had it. Some types cause warts; high-risk types cause no symptoms but can lead to cervical and other cancers many years later. A safe, effective vaccine exists for teens and young adults.",
    symptomsKh: "មនុស្សភាគច្រើនដកចេញវាបានដោយខ្លួនឯងដោយមិនដែលដឹងថាខ្លួនមានទេ។ ប្រភេទខ្លះបង្កើតជាល្ពៅ; ប្រភេទគ្រោះថ្នាក់ខ្ពស់មិនបង្ហាញរោគសញ្ញា ប៉ុន្តែអាចនាំឲ្យកើតមហារីកមាត់ស្បូន និងមហារីកផ្សេងទៀតច្រើនឆ្នាំក្រោយ។ មានវ៉ាក់សាំងសុវត្ថិភាព និងមានប្រសិទ្ធភាពសម្រាប់ក្មេងជំទង់ និងមនុស្សពេញវ័យក្មេង។",
    transmissionEn: "Skin-to-skin contact during sexual activity — even without intercourse. Condoms reduce but do not eliminate the risk.",
    transmissionKh: "ការប៉ះស្បែកនឹងស្បែកក្នុងពេលសកម្មភាពផ្លូវភេទ — សូម្បីតែគ្មានការរួមភេទក៏ដោយ។ ស្រោមអនាម័យកាត់បន្ថយ ប៉ុន្តែមិនលុបចោលហានិភ័យទាំងស្រុងទេ។",
  },
  {
    id: "herpes",
    nameEn: "Genital Herpes",
    nameKh: "ហឺផេសប្រដាប់ភេទ (Genital Herpes)",
    type: "virus",
    curableEn: "Manageable with medicine",
    curableKh: "គ្រប់គ្រងបានដោយឱសថ",
    symptomsEn: "Often very mild or no symptoms. When present: small painful blisters or sores around the genitals, sometimes with itching or burning. Outbreaks come and go; the virus stays in the body but medicine reduces both symptoms and spread.",
    symptomsKh: "ច្រើនតែស្រាលណាស់ ឬគ្មានរោគសញ្ញា។ នៅពេលមាន៖ ប៉ោងពងតូចៗឈឺ ឬដំបៅជុំវិញប្រដាប់ភេទ ពេលខ្លះមានរមាស់ ឬឆេះ។ ការផ្ទុះមកនិងទៅ; មេរោគនៅក្នុងរាងកាយ ប៉ុន្តែឱសថកាត់បន្ថយទាំងរោគសញ្ញា និងការចម្លង។",
    transmissionEn: "Skin-to-skin contact, including kissing (oral herpes) or sexual contact (genital herpes). Most contagious during an outbreak, but can spread even when no sores are visible.",
    transmissionKh: "ការប៉ះស្បែកនឹងស្បែក រួមទាំងការថើប (herpes មាត់) ឬការរួមភេទ (herpes ប្រដាប់ភេទ)។ ចម្លងខ្លាំងបំផុតពេលមានការផ្ទុះ ប៉ុន្តែអាចចម្លងសូម្បីតែគ្មានដំបៅឲ្យឃើញ។",
  },
];

function PathogenCard({ p, isKh }: { p: Pathogen; isKh: boolean }) {
  const typeColor = p.type === "virus"
    ? "bg-violet-50 text-violet-700 border-violet-200"
    : "bg-sky-50 text-sky-700 border-sky-200";

  const curableColor = p.curableEn.startsWith("Curable")
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : p.curableEn.startsWith("Preventable")
      ? "bg-teal-50 text-teal-700 border-teal-200"
      : "bg-amber-50 text-amber-700 border-amber-200";

  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-teal-200 transition-all">
      <header className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 flex-shrink-0">
            <Stethoscope className="w-4 h-4" />
          </div>
          <h3 className={`font-display font-bold text-base text-slate-900 truncate ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? p.nameKh : p.nameEn}
          </h3>
        </div>
      </header>

      {/* Pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${typeColor} ${isKh ? "font-khmer tracking-normal" : ""}`}>
          {p.type === "virus" ? (isKh ? "មេរោគ Virus" : "Virus") : (isKh ? "បាក់តេរី" : "Bacteria")}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${curableColor} ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
          {isKh ? p.curableKh : p.curableEn}
        </span>
      </div>

      {/* Symptoms */}
      <div className="mb-3">
        <div className={`flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
          <AlertCircle className="w-3 h-3" />
          {isKh ? "រោគសញ្ញា" : "Symptoms"}
        </div>
        <p className={`text-[13px] text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh ? p.symptomsKh : p.symptomsEn}
        </p>
      </div>

      {/* Transmission */}
      <div>
        <div className={`flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
          <ArrowRight className="w-3 h-3" />
          {isKh ? "ការចម្លង" : "Transmission"}
        </div>
        <p className={`text-[13px] text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh ? p.transmissionKh : p.transmissionEn}
        </p>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 2: Truth vs Myth
// ════════════════════════════════════════════════════════════════════════════

type Myth = {
  mythEn: string; mythKh: string;
  truthEn: string; truthKh: string;
};

const MYTHS: Myth[] = [
  {
    mythEn: "You can tell if someone has an STD just by looking at them.",
    mythKh: "អ្នកអាចដឹងថានរណាម្នាក់មាន STD គ្រាន់តែដោយមើលទៅមនុស្សនោះ។",
    truthEn: "Most STDs show no visible symptoms for months or years — even the person carrying the infection often doesn't know. The only reliable way to know is testing. Looking at someone tells you nothing about their health status.",
    truthKh: "STD ភាគច្រើនមិនបង្ហាញរោគសញ្ញាដែលអាចមើលឃើញទេ ពេញរយៈពេលជាច្រើនខែ ឬជាច្រើនឆ្នាំ — សូម្បីតែអ្នកដែលផ្ទុកមេរោគ ក៏ច្រើនតែមិនដឹង។ វិធីតែមួយគត់ដែលអាចទុកចិត្តបានគឺការត្រួតពិនិត្យ។ ការមើលលើនរណាម្នាក់ មិនប្រាប់អ្នកអំពីស្ថានភាពសុខភាពរបស់គេទេ។",
  },
  {
    mythEn: "You can get HIV from sharing food, hugging, or using the same toilet.",
    mythKh: "អ្នកអាចឆ្លងមេរោគ HIV ដោយការចែកអាហារ ការឱប ឬប្រើបង្គន់ដូចគ្នា។",
    truthEn: "HIV is only transmitted through specific body fluids: blood, semen, vaginal fluids, and breast milk. It cannot survive in air, water, food, or saliva. You cannot get HIV from a hug, a handshake, sharing a meal, mosquito bites, or a toilet seat.",
    truthKh: "HIV ចម្លងតែតាមរយៈវត្ថុរាវរាងកាយជាក់លាក់ប៉ុណ្ណោះ៖ ឈាម ទឹកកាម ទឹករំអិលទ្វារមាស និងទឹកដោះម្ដាយ។ វាមិនអាចរស់នៅក្នុងខ្យល់ ទឹក អាហារ ឬទឹកមាត់បានទេ។ អ្នកមិនអាចឆ្លង HIV ពីការឱប ការចាប់ដៃ ការចែករំលែកអាហារ ការខាំរបស់មូស ឬកៅអីបង្គន់ទេ។",
  },
  {
    mythEn: "Birth control pills protect you from STDs.",
    mythKh: "ថ្នាំពន្យារកំណើតការពារអ្នកពី STD។",
    truthEn: "Birth control pills only prevent pregnancy — they do not protect against any infection. Condoms, used correctly, are the only common barrier method that significantly reduces the spread of most STDs.",
    truthKh: "ថ្នាំពន្យារកំណើតការពារតែការមានផ្ទៃពោះប៉ុណ្ណោះ — វាមិនការពារពីការឆ្លងមេរោគណាមួយទេ។ ស្រោមអនាម័យ ដែលប្រើបានត្រឹមត្រូវ គឺជាមធ្យោបាយរបាំងសាមញ្ញតែមួយគត់ដែលកាត់បន្ថយការចម្លង STD ភាគច្រើនយ៉ាងសំខាន់។",
  },
  {
    mythEn: "Once you've been treated for an STD, you can't get it again.",
    mythKh: "នៅពេលអ្នកបានព្យាបាល STD ហើយ អ្នកមិនអាចឆ្លងវាម្ដងទៀតបានទេ។",
    truthEn: "Treatment cures the current infection but does not give immunity. You can be reinfected the next time you are exposed. Both partners need to be treated together to prevent passing it back and forth.",
    truthKh: "ការព្យាបាលធ្វើឲ្យជាសះស្បើយការឆ្លងបច្ចុប្បន្ន ប៉ុន្តែមិនផ្ដល់ភាពស៊ាំទេ។ អ្នកអាចឆ្លងម្ដងទៀតពេលក្រោយ ប្រសិនបើមានការប៉ះ។ ទាំងពីរនាក់ក្នុងគូ ត្រូវព្យាបាលជាមួយគ្នា ដើម្បីការពារការចម្លងទៅវិញទៅមក។",
  },
];

function MythRow({ m, isKh }: { m: Myth; isKh: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-slate-50 transition-colors focus-visible:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-inset"
        data-testid="myth-toggle"
      >
        <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold uppercase tracking-wide">
          <XCircle className="w-3 h-3" />
          {isKh ? "រឿងភូតភរ" : "Myth"}
        </span>
        <span className={`flex-1 text-sm font-semibold text-slate-800 ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh ? m.mythKh : m.mythEn}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-slate-100 bg-emerald-50/50 p-4 flex items-start gap-3">
          <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase tracking-wide">
            <CheckCircle2 className="w-3 h-3" />
            {isKh ? "ការពិត" : "Truth"}
          </span>
          <p className={`flex-1 text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? m.truthKh : m.truthEn}
          </p>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 3: Care Path
// ════════════════════════════════════════════════════════════════════════════

type Step = {
  titleEn: string; titleKh: string;
  bodyEn: string; bodyKh: string;
  Icon: typeof HeartPulse;
};

const CARE_STEPS: Step[] = [
  {
    Icon: HeartPulse,
    titleEn: "Don't Panic",
    titleKh: "កុំភ័យស្លន់ស្លោ",
    bodyEn: "Take a slow breath. Many sexually transmitted infections are completely curable with simple medicine, especially when caught early. Even the ones that cannot be cured (like HIV) can be controlled with daily treatment so that people live long, healthy lives. Worry alone never made anyone better — a clear plan does.",
    bodyKh: "ដកដង្ហើមយឺតៗ។ មេរោគចម្លងតាមផ្លូវភេទជាច្រើនអាចព្យាបាលជាសះស្បើយទាំងស្រុង ដោយឱសថសាមញ្ញ ជាពិសេសពេលរកឃើញទាន់ពេល។ សូម្បីតែមេរោគដែលមិនអាចព្យាបាលជាសះស្បើយ (ដូចជា HIV) ក៏អាចគ្រប់គ្រងបាន ដោយការព្យាបាលប្រចាំថ្ងៃ ដើម្បីឲ្យមនុស្សមានអាយុវែង និងសុខភាពល្អ។ ការព្រួយបារម្ភតែម្នាក់ឯងមិនធ្វើឲ្យនរណាម្នាក់ល្អជាងមុនទេ — ផែនការច្បាស់លាស់វិញទេ។",
  },
  {
    Icon: Stethoscope,
    titleEn: "Get Tested",
    titleKh: "ទៅធ្វើតេស្ត",
    bodyEn: "Visit a health centre, a provincial referral hospital, or speak to a trusted school nurse or doctor. Testing is fast, often free or low-cost, and completely confidential — they cannot tell your family or school. If you don't know where to go, an adult you trust can help you find a clinic.",
    bodyKh: "ទៅកាន់មជ្ឈមណ្ឌលសុខភាព មន្ទីរពេទ្យបង្អែកខេត្ត ឬនិយាយជាមួយគិលានុបដ្ឋាយិកាសាលា ឬវេជ្ជបណ្ឌិតដែលអ្នកទុកចិត្ត។ ការត្រួតពិនិត្យលឿន ច្រើនតែឥតគិតថ្លៃ ឬតម្លៃទាប និងមានភាពឯកជនពេញលេញ — ពួកគេមិនអាចប្រាប់ក្រុមគ្រួសារ ឬសាលារបស់អ្នកបានទេ។ បើអ្នកមិនដឹងថាត្រូវទៅណា មនុស្សពេញវ័យដែលអ្នកទុកចិត្តអាចជួយអ្នករកឃើញគ្លីនិក។",
  },
  {
    Icon: Users,
    titleEn: "Tell Your Partner",
    titleKh: "ប្រាប់ដៃគូររបស់អ្នក",
    bodyEn: "If a test comes back positive, telling any sexual partners is one of the bravest and most caring things you can do. They need to be tested and treated too — otherwise the infection bounces back and forth between you. Health workers can help you have this conversation, or even tell partners anonymously on your behalf.",
    bodyKh: "ប្រសិនបើលទ្ធផលតេស្តវិជ្ជមាន ការប្រាប់ដៃគូផ្លូវភេទណាមួយ គឺជាអ្វីដ៏ក្លាហាន និងមានការយកចិត្តទុកដាក់បំផុត ដែលអ្នកអាចធ្វើបាន។ ពួកគេក៏ត្រូវការការត្រួតពិនិត្យ និងការព្យាបាលដែរ — បើមិនដូច្នេះទេ មេរោគនឹងបន្តចម្លងទៅវិញទៅមករវាងអ្នក។ បុគ្គលិកសុខាភិបាលអាចជួយអ្នកធ្វើការសន្ទនានេះ ឬសូម្បីតែប្រាប់ដៃគូរដោយអនាមិកជំនួសអ្នក។",
  },
];

function CareStep({ step, index, isKh }: { step: Step; index: number; isKh: boolean }) {
  const { Icon } = step;
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex items-start gap-4 sm:gap-5">
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-display font-bold text-lg">
          {index}
        </div>
        <div className="mt-2 text-teal-600">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`font-display font-bold text-lg text-slate-900 mb-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh ? step.titleKh : step.titleEn}
        </h3>
        <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh ? step.bodyKh : step.bodyEn}
        </p>
      </div>
    </div>
  );
}

function ResourceItem({ en, kh }: { en: string; kh: string }) {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  return (
    <li className="flex items-start gap-2">
      <Sparkles className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 opacity-80" />
      <span className={isKh ? "font-khmer leading-loose" : ""}>{isKh ? kh : en}</span>
    </li>
  );
}
