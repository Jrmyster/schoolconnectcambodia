import { useState } from "react";
import {
  Shield, Lock, AlertTriangle, CheckCircle2, XCircle,
  Eye, KeyRound, Search, ChevronRight, RotateCcw,
  MessageSquare
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Threat warning cards ──────────────────────────────────────────────────────

type ThreatCard = {
  icon: React.ElementType;
  color: string;
  borderColor: string;
  titleEn: string;
  titleKh: string;
  tipsEn: string[];
  tipsKh: string[];
};

const THREATS: ThreatCard[] = [
  {
    icon: Eye,
    color: "text-red-500",
    borderColor: "border-red-200",
    titleEn: "Phishing — Spot Fake Links",
    titleKh: "ការបោកបញ្ឆោត — រចេះស្គាល់តំណភ្ជាប់ក្លែងក្លាយ",
    tipsEn: [
      "Hover over any link before clicking — check that the full URL matches the real site.",
      "Watch for misspellings: 'faceb00k.com' or 'telegam.org' are not the real apps.",
      "Legitimate banks and apps never ask for your password through Telegram or SMS.",
      "Shortened URLs (bit.ly, tinyurl) can hide dangerous destinations — use linkexpander.com to preview them.",
    ],
    tipsKh: [
      "ដាក់កណ្ដុរលើតំណភ្ជាប់ណាមួយមុននឹងចុច — ត្រូតពិនិត្យ URL ពេញ ដើម្បីប្រៀបធៀបជាមួយគេហទំព័រពិត។",
      "ប្រុងប្រយ័ត្នអក្ខរាវិរុទ្ធខុស: 'faceb00k.com' ឬ 'telegam.org' មិនមែនជាកម្មវិធីពិតទេ។",
      "ធនាគារ និងកម្មវិធីស្របច្បាប់មិនដែលស្នើសុំពាក្យសម្ងាត់របស់អ្នកតាម Telegram ឬ SMS ឡើយ។",
      "URL ខ្លី (bit.ly, tinyurl) អាចលាក់ទិសដៅគ្រោះថ្នាក់ — ប្រើ linkexpander.com ដើម្បីមើលជាមុន។",
    ],
  },
  {
    icon: KeyRound,
    color: "text-amber-500",
    borderColor: "border-amber-200",
    titleEn: "Password Strength & 2FA",
    titleKh: "ភាពខ្លាំងនៃពាក្យសម្ងាត់ & 2FA",
    tipsEn: [
      "Use a passphrase of 4+ random words (e.g. 'river-mango-school-blue') — it's stronger than 'P@ssw0rd!'",
      "Never reuse the same password across Facebook, email, and banking apps.",
      "Enable two-factor authentication (2FA) — even if someone steals your password, they cannot log in.",
      "Never share your OTP (one-time password) with anyone, including people claiming to be support staff.",
    ],
    tipsKh: [
      "ប្រើឃ្លាគន្លឹះចំ ៤ ពាក្យចៃដន្យ (ឧ. 'river-mango-school-blue') — វាខ្លាំងជាង 'P@ssw0rd!'",
      "កុំប្រើពាក្យសម្ងាត់តែមួយដូចគ្នា សម្រាប់ Facebook អ៊ីមែល និងកម្មវិធីធនាគារ។",
      "បើកការផ្ទៀងផ្ទាត់ពីរជំហាន (2FA) — ទោះបីនរណាលួចពាក្យសម្ងាត់អ្នក ពួកគេក៏មិនអាចចូលបានដែរ។",
      "កុំប្រាប់ OTP (ពាក្យសម្ងាត់ម្ដងប៉ុណ្ណោះ) ដល់នរណាម្នាក់ ទោះបីពួកគេអះអាងថាជាបុគ្គលិកគ្រប់គ្រងក៏ដោយ។",
    ],
  },
  {
    icon: Search,
    color: "text-blue-500",
    borderColor: "border-blue-200",
    titleEn: "Fact-Checking Before You Share",
    titleKh: "ការត្រួតពិនិត្យការពិតមុននឹងចែករំលែក",
    tipsEn: [
      "Search the headline on Google News — if a story is real, multiple trusted outlets will cover it.",
      "Check the source: is it a known newspaper or a random Facebook page with 200 likes?",
      "Be suspicious of 'SHARE BEFORE IT GETS DELETED' — that urgency is a manipulation tactic.",
      "Use Google Reverse Image Search (images.google.com) to check if a photo is being used out of context.",
    ],
    tipsKh: [
      "ស្វែងរកចំណងជើងព័ត៌មាននៅ Google News — ប្រសិនបើរឿងនោះពិត ប្រព័ន្ធផ្សព្វផ្សាយជឿទុកចិត្តច្រើននឹងផ្សាយ។",
      "ត្រូតពិនិត្យប្រភព: តើវាជាកាសែតល្បីល្បាញ ឬទំព័រ Facebook ចៃដន្យដែលមានការចូលចិត្តតែ ២០០?",
      "ប្រយ័ត្ននឹង 'ចែករំលែកមុនពេលវាត្រូវលុប' — ការប្រញ៉ាប់ប្រញ៉ាល់នោះគឺជាយុទ្ធសាស្ត្រឧបាយកល។",
      "ប្រើ Google Reverse Image Search (images.google.com) ដើម្បីត្រូតពិនិត្យថាតើរូបភាពមួយត្រូវបានប្រើខុសសំណ។",
    ],
  },
];

// ── Trust or Trash quiz ───────────────────────────────────────────────────────

type Scenario = {
  id: number;
  platform: "Telegram" | "Facebook" | "SMS";
  platformColor: string;
  messageEn: string;
  messageKh: string;
  answer: "trust" | "trash";
  explanationEn: string;
  explanationKh: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    platform: "Telegram",
    platformColor: "bg-sky-500",
    messageEn:
      "🎉 Congratulations! You've been selected to receive $500 from the World Bank Cambodia Program. Click here to claim your reward: bit.ly/wb-cam-grant-2024",
    messageKh:
      "🎉 សូមអបអរសាទរ! អ្នកត្រូវបានជ្រើសរើសទទួលប្រាក់ ២,០០០,០០០ រៀល ពីកម្មវិធី World Bank Cambodia។ ចុចទីនេះដើម្បីទទួលរង្វាន់: bit.ly/wb-cam-grant-2024",
    answer: "trash",
    explanationEn:
      "TRASH — Shortened links (bit.ly) hide the true destination. The World Bank never awards prizes via Telegram to random strangers. This is a classic phishing link.",
    explanationKh:
      "ត្រូវបោះចោល — តំណ URL ខ្លី (bit.ly) លាក់ទិសដៅពិត។ World Bank មិនដែលចែករង្វាន់តាម Telegram ទៅមនុស្សចៃដន្យ។ នេះគឺជាតំណ phishing បែបចំណាស់។",
  },
  {
    id: 2,
    platform: "Facebook",
    platformColor: "bg-[#1877F2]",
    messageEn:
      "⚠️ URGENT: Your Facebook account will be permanently deleted in 24 hours. Verify your identity immediately at: facebook-account-security.support/verify",
    messageKh:
      "⚠️ បន្ទាន់: គណនី Facebook របស់អ្នកនឹងត្រូវបោះបង់ជាអចិន្ត្រៃយ៍ក្នុង ២៤ ម៉ោង។ ផ្ទៀងផ្ទាត់ភ្លាម: facebook-account-security.support/verify",
    answer: "trash",
    explanationEn:
      "TRASH — The domain is 'facebook-account-security.support' — NOT 'facebook.com'. This fake site steals your login password. Facebook's real domain is always 'facebook.com'.",
    explanationKh:
      "ត្រូវបោះចោល — ដែន (domain) គឺ 'facebook-account-security.support' — មិនមែន 'facebook.com' ទេ។ គេហទំព័រក្លែងក្លាយនេះលួចពាក្យសម្ងាត់ចូល។ ដែនពិតរបស់ Facebook គឺ 'facebook.com' ជានិច្ច។",
  },
  {
    id: 3,
    platform: "Telegram",
    platformColor: "bg-sky-500",
    messageEn:
      "Hi class, this is Mr. Bunna. Our Grade 11 geography class tomorrow (Tuesday) has moved to the library instead of Room 3. Please let your classmates know. Thank you.",
    messageKh:
      "សួស្ដីថ្នាក់ នេះគ្រូបុណ្ណា។ ថ្នាក់ភូមិសាស្ត្រថ្នាក់ ១១ ថ្ងៃស្អែក (ថ្ងៃអង្គារ) ផ្លាស់ទៅបន្ទប់បណ្ណាល័យ ចេញពីបន្ទប់ ៣។ សូមប្រាប់មិត្តរួមថ្នាក់ផ្សេង។ អរគុណ។",
    answer: "trust",
    explanationEn:
      "TRUST — No links, no money requests, no urgency pressure. Specific, practical information from a named teacher. This has all the signs of a genuine school message.",
    explanationKh:
      "អាចទុកចិត្ត — គ្មានតំណ គ្មានការស្នើប្រាក់ គ្មានសម្ពាធបន្ទាន់។ ព័ត៌មានជាក់លាក់ ទ្រឹស្ដី ពីគ្រូដែលមានឈ្មោះ។ នេះមានសញ្ញាទាំងអស់នៃសារសាលាពិតប្រាកដ។",
  },
  {
    id: 4,
    platform: "Facebook",
    platformColor: "bg-[#1877F2]",
    messageEn:
      "💰 EASY MONEY! Send just 5,000 KHR via Wing to 012-XXX-XXX and receive 50,000 KHR back within 1 hour! 100% GUARANTEED. Only 10 spots left — act fast!",
    messageKh:
      "💰 ប្រាក់ងាយ! ផ្ញើតែ ៥,០០០ រៀល តាម Wing ទៅ ០១២-XXX-XXX ហើយទទួល ៥០,០០០ រៀលក្នុង ១ ម៉ោង! ធានា ១០០%។ នៅសល់ ១០ ទីតាំងប៉ុណ្ណោះ — ប្រញ៉ាប់!",
    answer: "trash",
    explanationEn:
      "TRASH — No legitimate investment returns 10× in 1 hour. The false scarcity ('Only 10 spots') creates panic. This is an advance-fee scam — you send money and receive nothing.",
    explanationKh:
      "ត្រូវបោះចោល — ការវិនិយោគស្របច្បាប់គ្មានដែលត្រឡប់ ១០ ដងក្នុង ១ ម៉ោងឡើយ។ ការខ្វះខាតក្លែងក្លាយ ('នៅសល់ ១០ ទីតាំង') បង្កើតភាពប[[ន}ប្រញ}ាប់។ នេះជាការបោកប្រាស់ — អ្នកផ្ញើប្រាក់ ហើយមិនទទួលអ្វីទៅវិញ។",
  },
  {
    id: 5,
    platform: "SMS",
    platformColor: "bg-slate-600",
    messageEn:
      "🚨 BREAKING: Scientists in Phnom Penh discovered a miracle herb that cures cancer, diabetes AND COVID-19 in just 3 days! SHARE NOW BEFORE IT GETS DELETED BY THE GOVERNMENT!",
    messageKh:
      "🚨 ព័ត៌មានបន្ទាន់: អ្នកវិទ្យាសាស្ត្រភ្នំពេញបានរកឃើញរុក្ខជាតិព្យាបាលមហារីក ទឹកនោមផ្អែម និង COVID-19 ក្នុង ៣ ថ្ងៃ! ចែករំលែកឥឡូវ មុននឹងរដ្ឋាភិបាលលុប!",
    answer: "trash",
    explanationEn:
      "TRASH — 'SHARE BEFORE IT GETS DELETED' is classic manipulation. No single herb cures multiple complex diseases. Always verify medical claims via WHO or trusted health authorities.",
    explanationKh:
      "ត្រូវបោះចោល — 'ចែករំលែកមុនពេលវាត្រូវលុប' គឺជាការឧបាយកលទូទៅ។ រុក្ខជាតិតែមួយមិនអាចព្យាបាលជំងឺស្មុគស្មាញច្រើនបានទេ។ ផ្ទៀងផ្ទាត់ការអះអាងវេជ្ជសាស្ត្រតាម WHO ឬអាជ្ញាធរសុខភាពដែលទុកចិត្ត។",
  },
];

// ── Daily checklist ───────────────────────────────────────────────────────────

type ChecklistItem = {
  titleEn: string;
  titleKh: string;
  descEn: string;
  descKh: string;
};

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    titleEn: "Pause Before Clicking",
    titleKh: "ផ្អាកមុនពេលចុច",
    descEn: "If a message creates a sense of 'Urgency' or 'Fear,' it is very likely a scam. Slow down and think before you tap.",
    descKh: "ប្រសិនបើសារបង្កើត 'ភាពបន្ទាន់' ឬ 'ភាពភ័យខ្លាច' វាទំនងជាការបោកប្រាស់ណាស់។ សូមឈប់ហើយគិតមុននឹងចុច។",
  },
  {
    titleEn: "Verify the Sender",
    titleKh: "ផ្ទៀងផ្ទាត់អ្នកផ្ញើ",
    descEn: "Check the phone number or profile carefully. Is it a stranger, an unknown account, or someone impersonating a friend?",
    descKh: "ត្រូតពិនិត្យលេខទូរស័ព្ទ ឬប្រវត្តិរូបឱ្យបានច្បាស់។ តើវាជាមនុស្សចម្លែក គណនីមិនស្គាល់ ឬអ្នកក្លែងបន្លំជាមិត្ត?",
  },
  {
    titleEn: "Protect Your OTP",
    titleKh: "ការពារលេខ OTP របស់អ្នក",
    descEn: "Never share your One-Time Password or login verification codes with anyone — including someone who claims to be customer support.",
    descKh: "មិនត្រូវចែករំលែកលេខ OTP ឬលេខកូដផ្ទៀងផ្ទាត់ការចូលរបស់អ្នកជាមួយនរណាម្នាក់ — ទោះបីអ្នកនោះអះអាងថាជាក្រុមការងារក៏ដោយ។",
  },
  {
    titleEn: "Check the Link",
    titleKh: "ពិនិត្យតំណភ្ជាប់",
    descEn: "Look for spelling tricks: 'g00gle.com' or 'telegrarn.org' are not real sites. The correct domain must match exactly.",
    descKh: "រកមើលល្បិចអក្ខរាវិរុទ្ធ: 'g00gle.com' ឬ 'telegrarn.org' មិនមែនជាគេហទំព័រពិត។ ដែនត្រឹមត្រូវត្រូវតែត្រូវគ្នាបញ្ជាក់ដាច់ខាត។",
  },
  {
    titleEn: "Report & Block",
    titleKh: "រាយការណ៍ និងរារាំង",
    descEn: "If you spot a scam, report it to the platform and immediately block the sender. You may protect someone else from becoming a victim.",
    descKh: "ប្រសិនបើអ្នករកឃើញការបោកប្រាស់ ត្រូវរាយការណ៍ទៅប្រព័ន្ធ ហើយរារាំងអ្នកផ្ញើភ្លាមៗ។ អ្នកអាចការពារអ្នកផ្សេងទៀតពីការក្លាយជាជនរងគ្រោះ។",
  },
];

// ── Page component ────────────────────────────────────────────────────────────

export function SafetyPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [answered, setAnswered] = useState<"trust" | "trash" | null>(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [expandedThreat, setExpandedThreat] = useState<number | null>(null);

  // Checklist state
  const [checked, setChecked] = useState<boolean[]>(Array(CHECKLIST_ITEMS.length).fill(false));
  const [pingSet, setPingSet] = useState<Set<number>>(new Set());

  const current = SCENARIOS[quizIndex];

  const handleAnswer = (choice: "trust" | "trash") => {
    if (answered) return;
    setAnswered(choice);
    if (choice === current.answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (quizIndex + 1 >= SCENARIOS.length) {
      setQuizDone(true);
    } else {
      setQuizIndex((i) => i + 1);
      setAnswered(null);
    }
  };

  const handleRestart = () => {
    setQuizIndex(0);
    setAnswered(null);
    setScore(0);
    setQuizDone(false);
  };

  const toggleCheck = (i: number) => {
    const nowChecked = !checked[i];
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
    if (nowChecked) {
      setPingSet((prev) => new Set([...prev, i]));
      setTimeout(() => {
        setPingSet((prev) => { const n = new Set(prev); n.delete(i); return n; });
      }, 650);
    }
  };

  const allProtected = checked.every(Boolean);

  return (
    <div className="min-h-screen bg-background">

      <style>{`
        @keyframes ping-once {
          0%   { transform: scale(1);   opacity: 0.8; }
          60%  { transform: scale(1.9); opacity: 0.3; }
          100% { transform: scale(2.4); opacity: 0;   }
        }
        @keyframes protected-in {
          0%   { transform: scale(0.75) translateY(12px); opacity: 0; }
          65%  { transform: scale(1.04) translateY(-2px); opacity: 1; }
          100% { transform: scale(1)   translateY(0);    opacity: 1; }
        }
        @keyframes star-spin {
          0%   { transform: rotate(0deg)   scale(1);    }
          50%  { transform: rotate(180deg) scale(1.25); }
          100% { transform: rotate(360deg) scale(1);    }
        }
      `}</style>

      {/* ── Hero ── */}
      <div className="relative bg-gradient-to-br from-[#0d1b2a] via-[#1a2e4a] to-[#0d1b2a] text-white overflow-hidden">
        {/* Caution-yellow top stripe */}
        <div className="flex h-2">
          <div className="flex-1 bg-[#fbbf24]" />
          <div className="flex-1 bg-[#f59e0b]" />
          <div className="flex-1 bg-[#fbbf24]" />
        </div>

        {/* Faint shield watermark */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none" aria-hidden>
          <Shield className="w-64 h-64 text-[#fbbf24]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <div className="inline-flex items-center gap-2 border border-[#fbbf24]/50 bg-[#fbbf24]/10 rounded-full px-5 py-2 mb-6 text-sm font-semibold text-[#fde68a] backdrop-blur-sm">
            <Shield className="w-4 h-4" fill="currentColor" />
            {t("Digital Safety Hub", "មជ្ឈមណ្ឌលសុវត្ថិភាពឌីជីថល")}
          </div>

          <h1 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t("Stay Safe", "ត្រូវ")}
            {" "}
            <span className="text-[#fbbf24]">{t("Online.", "ស្ថិតសុវត្ថិភាព​អនឡាញ។")}</span>
          </h1>
          <p className={`text-white/70 max-w-2xl mx-auto leading-relaxed ${kh ? "font-khmer text-base leading-loose" : "text-base"}`}>
            {t(
              "Scams, fake news, and phishing attacks target students every day. Learn to recognise threats, test your skills, and build safe digital habits.",
              "ការបោកប្រាស់ ព័ត៌មានក្លែងក្លាយ និងការវាយប្រហារ phishing កំណត់គោលដៅលើសិស្សសាលារៀនរាល់ថ្ងៃ។ រៀនស្គាល់ការគំរាមកំហែង សាកល្បងជំនាញ និងកសាងទំនោរទម្លាប់ឌីជីថលដោយសុវត្ថិភាព។"
            )}
          </p>
        </div>

        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="hsl(var(--background))" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

        {/* ── Threat Cards ── */}
        <section>
          <h2 className={`font-display font-bold text-foreground text-2xl mb-2 ${kh ? "font-khmer" : ""}`}>
            {t("Know Your Threats", "ស្គាល់ការគំរាមកំហែង")}
          </h2>
          <p className={`text-muted-foreground text-sm mb-7 ${kh ? "font-khmer" : ""}`}>
            {t("Click any card to expand tips.", "ចុចកាតណាមួយ ដើម្បីពង្រីកគន្លឹះ។")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {THREATS.map((threat, i) => {
              const isOpen = expandedThreat === i;
              const Icon = threat.icon;
              return (
                <button
                  key={i}
                  onClick={() => setExpandedThreat(isOpen ? null : i)}
                  className={`text-left rounded-2xl border-2 bg-card shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${threat.borderColor} ${isOpen ? "ring-2 ring-[#fbbf24]/40" : ""}`}
                >
                  {/* Yellow accent bar */}
                  <div className="h-1.5 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]" />
                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-card border ${threat.borderColor}`}>
                        <Icon className={`w-5 h-5 ${threat.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-foreground text-sm leading-snug ${kh ? "font-khmer" : "font-display"}`}>
                          {kh ? threat.titleKh : threat.titleEn}
                        </h3>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground/60 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
                    </div>
                    {isOpen && (
                      <ul className="space-y-2 mt-3 pt-3 border-t border-border">
                        {(kh ? threat.tipsKh : threat.tipsEn).map((tip, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                            <span className={`text-xs text-muted-foreground leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Trust or Trash Quiz ── */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-5 h-5 text-[#fbbf24]" />
            <h2 className={`font-display font-bold text-foreground text-2xl ${kh ? "font-khmer" : ""}`}>
              {t("Trust or Trash?", "ទុកចិត្ត ឬ បោះចោល?")}
            </h2>
          </div>
          <p className={`text-muted-foreground text-sm mb-7 ${kh ? "font-khmer" : ""}`}>
            {t("Read each message and decide — is it safe to trust, or should you trash it?",
              "អានសារនីមួយៗ ហើយសម្រេចចិត្ត — តើវាសុវត្ថិភាពក្នុងការទុកចិត្ត ឬគួរបោះចោល?")}
          </p>

          {quizDone ? (
            /* ── Results screen ── */
            <div className="bg-gradient-to-br from-[#0d1b2a] to-[#1a2e4a] rounded-3xl p-10 text-center text-white">
              <div className={`text-5xl font-display font-bold mb-2 ${score >= 4 ? "text-[#4ade80]" : score >= 3 ? "text-[#fbbf24]" : "text-red-400"}`}>
                {score}/{SCENARIOS.length}
              </div>
              <p className={`text-white/70 mb-6 ${kh ? "font-khmer" : ""}`}>
                {score === SCENARIOS.length
                  ? t("Perfect score! You're a digital safety expert. 🛡️", "ពិន្ទុល្អឥតខ្ចោះ! អ្នកជាអ្នកជំនាញសុវត្ថិភាពឌីជីថល។ 🛡️")
                  : score >= 3
                    ? t("Good job! Review the cards above for the ones you missed.", "ល្អ! ពិនិត្យកាតខាងលើ ចំពោះចម្លើយដែលអ្នកខកខាន។")
                    : t("Keep practising — scammers are clever. Review the threat cards above.", "បន្តអនុវត្ត — អ្នកបោកប្រាស់មានភាពឆ្លាតវៃ។ ពិនិត្យកាតគំរាមកំហែងខាងលើ។")}
              </p>
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fbbf24] text-[#0d1b2a] font-bold text-sm hover:bg-[#fde68a] active:scale-95 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                {t("Try Again", "សាកម្ដងទៀត")}
              </button>
            </div>
          ) : (
            /* ── Quiz card ── */
            <div className="bg-gradient-to-br from-[#0d1b2a] to-[#1a2e4a] rounded-3xl overflow-hidden shadow-xl">
              {/* Progress bar */}
              <div className="h-1.5 bg-white/10">
                <div
                  className="h-full bg-[#fbbf24] transition-all duration-500"
                  style={{ width: `${((quizIndex) / SCENARIOS.length) * 100}%` }}
                />
              </div>

              <div className="p-8">
                {/* Progress label */}
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-white/50 text-xs font-semibold ${kh ? "font-khmer" : ""}`}>
                    {t(`Message ${quizIndex + 1} of ${SCENARIOS.length}`, `សារ ${quizIndex + 1} ក្នុងចំណោម ${SCENARIOS.length}`)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${current.platformColor} text-white`}>
                    {current.platform}
                  </span>
                </div>

                {/* Message bubble */}
                <div className="bg-white/10 border border-white/15 rounded-2xl p-5 mb-6">
                  <p className={`text-white text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                    {kh ? current.messageKh : current.messageEn}
                  </p>
                </div>

                {/* Answer buttons or feedback */}
                {!answered ? (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleAnswer("trust")}
                      className="flex-1 flex items-center justify-center gap-2.5 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm active:scale-95 transition-all shadow-md hover:shadow-lg"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      {t("Trust ✓", "ទុកចិត្ត ✓")}
                    </button>
                    <button
                      onClick={() => handleAnswer("trash")}
                      className="flex-1 flex items-center justify-center gap-2.5 py-4 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-sm active:scale-95 transition-all shadow-md hover:shadow-lg"
                    >
                      <XCircle className="w-5 h-5" />
                      {t("Trash 🗑️", "បោះចោល 🗑️")}
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Result badge */}
                    <div className={`flex items-center gap-2 px-4 py-3 rounded-xl mb-4 font-bold text-sm
                      ${answered === current.answer
                        ? "bg-emerald-500/20 border border-emerald-400/40 text-emerald-300"
                        : "bg-red-500/20 border border-red-400/40 text-red-300"}`}>
                      {answered === current.answer
                        ? <><CheckCircle2 className="w-4 h-4" />{t("Correct!", "ត្រឹមត្រូវ!")}</>
                        : <><XCircle className="w-4 h-4" />{t("Incorrect — see why below.", "មិនត្រឹមត្រូវ — មើលមូលហេតុខាងក្រោម។")}</>}
                    </div>
                    {/* Explanation */}
                    <div className="bg-[#fbbf24]/10 border border-[#fbbf24]/30 rounded-xl px-5 py-4 mb-5">
                      <p className={`text-[#fde68a] text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                        {kh ? current.explanationKh : current.explanationEn}
                      </p>
                    </div>
                    <button
                      onClick={handleNext}
                      className="w-full py-3 rounded-xl bg-[#fbbf24] text-[#0d1b2a] font-bold text-sm hover:bg-[#fde68a] active:scale-95 transition-all"
                    >
                      {quizIndex + 1 < SCENARIOS.length
                        ? t("Next Message →", "សារបន្ទាប់ →")
                        : t("See My Score", "មើលពិន្ទុ")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* ── 5-Step Digital Safety Checklist ── */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-[#fbbf24]" />
            <h2 className={`font-display font-bold text-foreground text-2xl ${kh ? "font-khmer" : ""}`}>
              {t("5-Step Digital Safety Checklist", "បញ្ជីត្រួតពិនិត្យ ៥ ជំហាន")}
            </h2>
          </div>
          <p className={`text-muted-foreground text-sm mb-7 ${kh ? "font-khmer" : ""}`}>
            {t(
              "Tap each card to mark it complete. Check all 5 to earn your protection badge.",
              "ចុចកាតនីមួយៗ ដើម្បីសម្គាល់ថាបានបញ្ចប់។ ធីកទាំង ៥ ដើម្បីទទួលផ្លាកសញ្ញាការពារ។"
            )}
          </p>

          {/* Card list */}
          <div className="space-y-4">
            {CHECKLIST_ITEMS.map((item, i) => (
              <button
                key={i}
                onClick={() => toggleCheck(i)}
                className={`w-full text-left flex items-center gap-5 p-5 rounded-2xl border-2 shadow-sm
                  hover:shadow-md active:scale-[0.99] transition-all duration-200
                  ${checked[i]
                    ? "border-emerald-400/60 bg-emerald-50 dark:bg-emerald-950/20"
                    : "border-[#fbbf24]/40 bg-card hover:border-[#fbbf24]/80 hover:bg-[#fbbf24]/5"
                  }`}
              >
                {/* Large step number */}
                <div className="flex-shrink-0 w-14 text-center">
                  <span className={`font-display font-black text-3xl leading-none transition-colors
                    ${checked[i] ? "text-emerald-500" : "text-[#fbbf24]"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Text block */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-3.5 h-3.5 text-[#fbbf24] flex-shrink-0" />
                    <span className={`font-bold text-[#0d1b2a] dark:text-foreground text-sm
                      ${checked[i] ? "line-through text-muted-foreground" : ""}
                      ${kh ? "font-khmer" : "font-display"}`}>
                      {kh ? item.titleKh : item.titleEn}
                    </span>
                  </div>
                  <p className={`text-xs text-muted-foreground leading-relaxed
                    ${checked[i] ? "opacity-60" : ""}
                    ${kh ? "font-khmer leading-loose" : ""}`}>
                    {kh ? item.descKh : item.descEn}
                  </p>
                </div>

                {/* Checkbox with ping ring */}
                <div className="flex-shrink-0 relative w-9 h-9 flex items-center justify-center">
                  {/* One-shot ping ring */}
                  {pingSet.has(i) && (
                    <div
                      className="absolute inset-0 rounded-full border-2 border-emerald-400"
                      style={{ animation: "ping-once 0.65s ease-out forwards" }}
                    />
                  )}
                  <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200
                    ${checked[i]
                      ? "bg-emerald-500 border-emerald-500 shadow-md shadow-emerald-300/40"
                      : "border-[#fbbf24] bg-white dark:bg-card"}`}>
                    {checked[i] && (
                      <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#fbbf24] to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${(checked.filter(Boolean).length / CHECKLIST_ITEMS.length) * 100}%` }}
              />
            </div>
            <span className={`text-xs font-bold text-muted-foreground whitespace-nowrap ${kh ? "font-khmer" : ""}`}>
              {checked.filter(Boolean).length}/{CHECKLIST_ITEMS.length} {t("done", "បានបញ្ចប់")}
            </span>
          </div>

          {/* ── Celebration banner ── */}
          {allProtected && (
            <div
              className="mt-8 relative overflow-hidden bg-gradient-to-br from-[#0d1b2a] via-[#0f2c1a] to-[#0d1b2a] rounded-3xl p-10 text-center"
              style={{ animation: "protected-in 0.45s cubic-bezier(0.175,0.885,0.32,1.275) forwards" }}
            >
              {/* Gold border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-[#fbbf24]/50 pointer-events-none" />
              {/* Top stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#fbbf24] via-emerald-400 to-[#fbbf24]" />

              {/* Spinning shield */}
              <div
                className="mx-auto mb-4 w-16 h-16 flex items-center justify-center"
                style={{ animation: "star-spin 0.7s ease-out forwards" }}
              >
                <Shield className="w-16 h-16 text-[#fbbf24]" fill="currentColor" />
              </div>

              <h3 className={`font-display font-black text-white text-3xl mb-2 ${kh ? "font-khmer leading-loose" : ""}`}>
                {t("You are Protected! 🛡️", "អ្នកត្រូវបានការពារ! 🛡️")}
              </h3>
              <p className={`text-emerald-300 text-sm mb-1 ${kh ? "" : "font-khmer"}`}>
                {kh ? "You are Protected! 🛡️" : "អ្នកត្រូវបានការពារ! 🛡️"}
              </p>
              <p className={`text-white/55 text-xs mt-3 max-w-sm mx-auto ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "You know all 5 safety rules. Share this knowledge — it could protect someone you care about.",
                  "អ្នកស្គាល់ច្បាប់សុវត្ថិភាព ៥ ទាំងអស់ហើយ។ ចែករំលែកចំណេះដឹងនេះ — វាអាចការពារអ្នកណាម្នាក់ដែលអ្នកស្រឡាញ់។"
                )}
              </p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
