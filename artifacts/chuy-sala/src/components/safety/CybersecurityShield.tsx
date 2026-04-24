import { useEffect, useMemo, useRef, useState } from "react";
import {
  ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2,
  Eye, EyeOff, KeyRound, Lock,
  Image as ImageIcon, Share2, Server, Search, Users, Database, Camera,
  Wifi, RefreshCw, Sparkles,
} from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

/* ──────────────────────────────────────────────────────────────────────────────
 * The Cybersecurity Shield — three security-themed interactive lessons.
 * Aesthetic: dark slate canvas, neon-green = safe, red = danger.
 * ────────────────────────────────────────────────────────────────────────────── */

export function CybersecurityShield() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes shieldDash {
          to { stroke-dashoffset: -32; }
        }
        @keyframes shieldPacket {
          0%   { offset-distance: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes shieldPulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.12); }
        }
        @keyframes scamFlash {
          0%   { background-color: rgba(239, 68, 68, 0.45); }
          100% { background-color: rgba(239, 68, 68, 0.20); }
        }
        @keyframes blockedIn {
          0%   { transform: scale(0.8) translateY(8px); opacity: 0; }
          70%  { transform: scale(1.04); opacity: 1; }
          100% { transform: scale(1); }
        }
      `}</style>

      <SpotTheScamSimulator kh={kh} />
      <PasswordStrengthForge kh={kh} />
      <DigitalFootprintVisualizer kh={kh} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
 * 1) SPOT THE SCAM SIMULATOR
 * Mock Messenger-style chat from a fake "Facebook Security" account.
 * Students click on red-flag tokens; each click reveals why it's suspicious.
 * When all flags are found → "Scam Blocked!" badge.
 * ────────────────────────────────────────────────────────────────────────────── */

type RedFlag = {
  id: string;
  // The exact substring of the message body to make clickable, in source order.
  textEn: string;
  textKh: string;
  // Tooltip / explanation when clicked
  whyEn: string;
  whyKh: string;
};

const RED_FLAGS: RedFlag[] = [
  {
    id: "greeting",
    textEn: "Dear User",
    textKh: "ជូនចំពោះអ្នកប្រើប្រាស់",
    whyEn: "Facebook knows your real name. A generic greeting like 'Dear User' is a sign of a mass scam.",
    whyKh: "Facebook ដឹងឈ្មោះពិតរបស់អ្នក។ ការស្វាគមន៍ទូទៅដូចជា 'ជូនចំពោះអ្នកប្រើប្រាស់' គឺជាសញ្ញានៃការបោកប្រាស់ជាក្រុម។",
  },
  {
    id: "urgency",
    textEn: "your account will be permanently deleted in 24 hours",
    textKh: "គណនីរបស់អ្នកនឹងត្រូវលុបជាអចិន្ត្រៃយ៍ក្នុង ២៤ ម៉ោង",
    whyEn: "Urgency and fear ('only 24 hours!') are designed to make you panic and act before you think. Real companies give you days or weeks.",
    whyKh: "ភាពបន្ទាន់ និងការបំភ័យ ('តែ ២៤ ម៉ោង!') ត្រូវបានបង្កើតឡើងដើម្បីធ្វើឲ្យអ្នកភ័យ ហើយធ្វើសកម្មភាពមុនពេលគិត។ ក្រុមហ៊ុនពិតផ្តល់ឲ្យអ្នកច្រើនថ្ងៃ ឬសប្តាហ៍។",
  },
  {
    id: "url",
    textEn: "www.facbook-security.com/login",
    textKh: "www.facbook-security.com/login",
    whyEn: "Look closely: 'facbook' is missing the 'e'. Real Facebook uses 'facebook.com' — never random extra words like '-security'.",
    whyKh: "មើលឲ្យល្អិតល្អន់: 'facbook' បាត់អក្សរ 'e'។ Facebook ពិតប្រាកដប្រើ 'facebook.com' — មិនដែលមានពាក្យបន្ថែមដូចជា '-security' ទេ។",
  },
  {
    id: "password",
    textEn: "enter your current password",
    textKh: "បញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្នរបស់អ្នក",
    whyEn: "No real company will ever ask for your password through a message. Facebook already has it — they would never ask you to send it.",
    whyKh: "គ្មានក្រុមហ៊ុនពិតប្រាកដណាមួយនឹងសុំពាក្យសម្ងាត់របស់អ្នកតាមរយៈសារទេ។ Facebook មានវារួចហើយ — ពួកគេនឹងមិនស្នើសុំឲ្យអ្នកផ្ញើវាឡើយ។",
  },
  {
    id: "sender",
    textEn: "Facebook-Security-Team",
    textKh: "Facebook-Security-Team",
    whyEn: "Facebook only contacts you from inside the app, never from a free Gmail account. The display name is also written with weird dashes — a fake.",
    whyKh: "Facebook ទាក់ទងអ្នកតែពីក្នុងកម្មវិធីប៉ុណ្ណោះ មិនដែលពីគណនី Gmail ឥតគិតថ្លៃទេ។ ឈ្មោះបង្ហាញក៏សរសេរដោយសញ្ញាដាច់ដោយឡែក — គឺជាក្លែងក្លាយ។",
  },
];

const TOTAL_FLAGS = RED_FLAGS.length;

function SpotTheScamSimulator({ kh }: { kh: boolean }) {
  const t = useTranslation();

  const [found, setFound] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);

  const allFound = found.size === TOTAL_FLAGS;

  function clickFlag(id: string) {
    setActiveId(id);
    if (!found.has(id)) setFound((prev) => new Set(prev).add(id));
  }

  function reset() {
    setFound(new Set());
    setActiveId(null);
  }

  // The message body is rendered via a small parser: we split the source string
  // by each red-flag substring (in the active language) and wrap matches with
  // a clickable <button>. Order of substitutions matters (longest first).
  function renderMessageBody(src: string) {
    // Sort flag texts by length desc so we match longest substrings first
    const flags = [...RED_FLAGS]
      .map((f) => ({ id: f.id, text: kh ? f.textKh : f.textEn }))
      .sort((a, b) => b.text.length - a.text.length);

    const nodes: Array<React.ReactNode> = [];
    let remaining = src;
    let key = 0;
    while (remaining.length > 0) {
      // Find the earliest match among all flag substrings
      let earliest: { id: string; text: string; idx: number } | null = null;
      for (const f of flags) {
        const idx = remaining.indexOf(f.text);
        if (idx !== -1 && (earliest === null || idx < earliest.idx)) {
          earliest = { ...f, idx };
        }
      }
      if (!earliest) {
        nodes.push(<span key={key++}>{remaining}</span>);
        break;
      }
      if (earliest.idx > 0) {
        nodes.push(<span key={key++}>{remaining.slice(0, earliest.idx)}</span>);
      }
      const isFound = found.has(earliest.id);
      const isActive = activeId === earliest.id;
      nodes.push(
        <button
          key={key++}
          type="button"
          data-testid={`scam-flag-${earliest.id}`}
          onClick={() => clickFlag(earliest!.id)}
          className={`inline rounded px-1 -mx-0.5 transition-colors duration-200 cursor-pointer ${
            isFound
              ? "bg-red-500/25 text-red-100 underline decoration-red-300 decoration-wavy"
              : "bg-yellow-200/15 hover:bg-yellow-200/25 text-yellow-100 underline decoration-dotted decoration-yellow-300/70"
          } ${isActive ? "ring-2 ring-red-300" : ""}`}
          style={isActive ? { animation: "scamFlash 0.6s ease-out" } : undefined}
        >
          {earliest.text}
        </button>,
      );
      remaining = remaining.slice(earliest.idx + earliest.text.length);
    }
    return nodes;
  }

  const messageEn =
    "Dear User, we detected suspicious activity and your account will be permanently deleted in 24 hours. To keep it safe, please go to www.facbook-security.com/login and enter your current password. — Facebook-Security-Team";
  const messageKh =
    "ជូនចំពោះអ្នកប្រើប្រាស់ យើងបានរកឃើញសកម្មភាពគួរឲ្យសង្ស័យ ហើយ គណនីរបស់អ្នកនឹងត្រូវលុបជាអចិន្ត្រៃយ៍ក្នុង ២៤ ម៉ោង។ ដើម្បីការពារវា សូមចូលទៅ www.facbook-security.com/login ហើយ បញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្នរបស់អ្នក។ — Facebook-Security-Team";

  const activeFlag = RED_FLAGS.find((f) => f.id === activeId) ?? null;

  return (
    <div
      className="rounded-2xl border-2 border-emerald-500/30 bg-slate-950 p-5 sm:p-6 shadow-xl"
      data-testid="scam-simulator"
    >
      <header className="mb-4">
        <div className={`text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-300/90 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {t("Tool 01 · Phishing test", "ឧបករណ៍ ០១ · ការសាកល្បង Phishing")}
        </div>
        <h3 className={`mt-1 text-xl sm:text-2xl font-bold text-white ${kh ? "font-khmer" : "font-display"}`}>
          {t("The 'Spot the Scam' Simulator", "ការសាកល្បង 'ស្វែងរកការបោកប្រាស់'")}
        </h3>
        <p className={`mt-1 text-sm text-slate-300 max-w-xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "An urgent message just arrived. Read it carefully and tap each red flag you can find — there are 5 hidden in this scam.",
            "សារបន្ទាន់មួយទើបតែមកដល់។ អានឲ្យបានយកចិត្តទុកដាក់ ហើយចុចលើសញ្ញាគ្រោះថ្នាក់នីមួយៗដែលអ្នកអាចរកឃើញ — មាន ៥ ដែលលាក់នៅក្នុងការបោកប្រាស់នេះ។",
          )}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-5 items-start">
        {/* ── Phone mock-up ── */}
        <div className="mx-auto lg:mx-0">
          <div className="relative w-[280px] h-[560px] rounded-[2.4rem] bg-slate-900 border-[10px] border-slate-800 shadow-2xl overflow-hidden">
            {/* Notch */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-5 bg-slate-950 rounded-b-2xl z-10" />
            {/* Screen */}
            <div className="absolute inset-0 bg-white flex flex-col">
              {/* Status bar */}
              <div className="h-7 bg-white flex items-center justify-between px-5 text-[10px] text-slate-700 font-semibold">
                <span>9:41</span>
                <span className="flex items-center gap-1">
                  <Wifi className="w-3 h-3" />
                  <span>5G</span>
                  <span>100%</span>
                </span>
              </div>
              {/* Messenger-style header */}
              <div className="bg-gradient-to-r from-[#0084FF] to-[#0099FF] text-white px-3 py-2.5 flex items-center gap-2.5 shadow">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#0084FF] font-bold text-sm">
                  f
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm leading-tight truncate">
                    Facebook-Security-Team
                  </div>
                  <div className="text-[10px] opacity-90">
                    fb.security.help@gmail.com
                  </div>
                </div>
                <ShieldAlert className="w-4 h-4 text-yellow-200" />
              </div>
              {/* Chat area */}
              <div className="flex-1 bg-slate-50 px-3 py-4 overflow-y-auto">
                <div className="text-center text-[10px] text-slate-400 mb-3">
                  {kh ? "ថ្ងៃនេះ ៩:៤១" : "Today · 9:41 AM"}
                </div>
                {/* Incoming bubble */}
                <div className="flex items-end gap-1.5 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[#0084FF] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    f
                  </div>
                  <div className="max-w-[85%] bg-slate-200 text-slate-900 px-3 py-2.5 rounded-2xl rounded-bl-sm">
                    <p className={`text-[12.5px] leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                      {renderMessageBody(kh ? messageKh : messageEn)}
                    </p>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 ml-8 mb-4">
                  {kh ? "បានផ្ញើម្សិលមិញ" : "Sent just now"}
                </div>

                {/* "Scam Blocked!" overlay when all flags found */}
                {allFound && (
                  <div
                    data-testid="scam-blocked"
                    role="status"
                    aria-live="polite"
                    className="rounded-xl bg-emerald-500 text-emerald-950 p-3 text-center shadow-lg border-2 border-emerald-300"
                    style={{ animation: "blockedIn 0.45s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards" }}
                  >
                    <ShieldCheck className="w-7 h-7 mx-auto mb-1" />
                    <div className={`font-extrabold text-sm ${kh ? "font-khmer" : ""}`}>
                      {t("Scam Blocked!", "ការបោកប្រាស់ត្រូវបានរារាំង!")}
                    </div>
                    <div className={`text-[11px] mt-1 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "You spotted all 5 red flags. Trust your instincts — when in doubt, don't click.",
                        "អ្នកបានរកឃើញសញ្ញាគ្រោះថ្នាក់ទាំង ៥។ ជឿលើអារម្មណ៍ — ពេលមានការសង្ស័យ កុំចុច។",
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Side panel: counter + active explanation + reset ── */}
        <div className="space-y-3">
          {/* Counter */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className={`flex items-center justify-between text-[11px] uppercase tracking-wider text-slate-400 mb-1 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                <span>{t("Red flags found", "សញ្ញាគ្រោះថ្នាក់ដែលរកឃើញ")}</span>
                <span data-testid="scam-flag-count" className={`font-bold ${allFound ? "text-emerald-300" : "text-yellow-300"}`}>
                  {found.size} / {TOTAL_FLAGS}
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${allFound ? "bg-emerald-400" : "bg-gradient-to-r from-yellow-400 to-red-400"}`}
                  style={{ width: `${(found.size / TOTAL_FLAGS) * 100}%` }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={reset}
              data-testid="button-reset-scam"
              className="rounded-lg border border-slate-700 bg-slate-900 text-slate-300 p-2 hover:bg-slate-800"
              aria-label={t("Reset", "កំណត់ឡើងវិញ")}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Active explanation panel — aria-live so screen readers hear the
              "why this is suspicious" feedback after each flag click. */}
          {activeFlag ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded-xl border border-red-500/40 bg-red-950/40 p-3.5"
            >
              <div className="flex items-center gap-1.5 text-red-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                {t("Red flag", "សញ្ញាគ្រោះថ្នាក់")}
              </div>
              <div className={`text-sm text-red-100 mb-1 italic ${kh ? "font-khmer not-italic leading-loose" : ""}`}>
                "{kh ? activeFlag.textKh : activeFlag.textEn}"
              </div>
              <p className={`text-[13px] text-red-50/90 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {kh ? activeFlag.whyKh : activeFlag.whyEn}
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-3.5">
              <div className={`text-[13px] text-slate-300 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Tap on any underlined word inside the message bubble. Each one is a clue that this message might not be real.",
                  "ចុចលើពាក្យដែលបានគូសបន្ទាត់ណាមួយនៅក្នុងពពុះសារ។ មួយៗជាតម្រុយដែលបង្ហាញថាសារនេះប្រហែលមិនពិត។",
                )}
              </div>
            </div>
          )}

          {/* Mini-checklist of which flags found */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {RED_FLAGS.map((f) => {
              const ok = found.has(f.id);
              return (
                <div
                  key={f.id}
                  className={`flex items-center gap-2 text-[11px] rounded-md px-2 py-1.5 border ${
                    ok
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-200"
                      : "bg-slate-900/60 border-slate-700 text-slate-400"
                  } ${kh ? "font-khmer leading-loose" : ""}`}
                >
                  {ok ? (
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-current opacity-60 flex-shrink-0" />
                  )}
                  <span className="truncate">
                    {f.id === "greeting" && t("Generic greeting", "ការស្វាគមន៍ទូទៅ")}
                    {f.id === "urgency"  && t("Fake urgency / threat", "ភាពបន្ទាន់ក្លែងក្លាយ")}
                    {f.id === "url"      && t("Misspelled URL", "URL ខុសអក្ខរាវិរុទ្ធ")}
                    {f.id === "password" && t("Asks for password", "ស្នើពាក្យសម្ងាត់")}
                    {f.id === "sender"   && t("Suspicious sender", "អ្នកផ្ញើគួរឲ្យសង្ស័យ")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
 * 2) PASSWORD STRENGTH FORGE
 * Live strength meter + checklist + passphrase explainer.
 * ────────────────────────────────────────────────────────────────────────────── */

const FORBIDDEN_NAMES = [
  // Tokens that count as "your name / common word" — generic enough to teach
  // the lesson without singling out any real student.
  "name", "user", "admin", "student", "test", "facebook", "telegram", "khmer",
];

type StrengthLevel = 0 | 1 | 2 | 3 | 4;

function evaluatePassword(pw: string) {
  const lengthOK = pw.length >= 8;
  const hasNumber = /\d/.test(pw);
  const hasSymbol = /[^A-Za-z0-9\s]/.test(pw);
  const hasUpperLower = /[a-z]/.test(pw) && /[A-Z]/.test(pw);
  const lower = pw.toLowerCase();
  const noName = pw.length === 0
    ? false
    : !FORBIDDEN_NAMES.some((n) => lower.includes(n));

  // Score 0–4 used to drive the visual meter
  let score: StrengthLevel = 0 as StrengthLevel;
  if (lengthOK) score = (score + 1) as StrengthLevel;
  if (hasNumber && hasSymbol) score = (score + 1) as StrengthLevel;
  if (hasUpperLower) score = (score + 1) as StrengthLevel;
  if (pw.length >= 14 && noName) score = (score + 1) as StrengthLevel;
  // Passphrase bonus: 4+ words separated by space/dash/underscore + 16+ chars
  const wordlike = pw.trim().split(/[\s\-_]+/).filter(Boolean);
  if (wordlike.length >= 4 && pw.length >= 16 && noName) {
    score = Math.min(4, score + 1) as StrengthLevel;
  }
  // Cap any name-containing password at "Fair"
  if (!noName && pw.length > 0) score = Math.min(score, 1) as StrengthLevel;

  return { lengthOK, hasNumber, hasSymbol, noName, score };
}

function PasswordStrengthForge({ kh }: { kh: boolean }) {
  const t = useTranslation();

  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);

  const evalResult = useMemo(() => evaluatePassword(pw), [pw]);
  const { lengthOK, hasNumber, hasSymbol, noName, score } = evalResult;

  const labels = [
    { en: "—",            kh: "—",                  color: "bg-slate-700",   text: "text-slate-400" },
    { en: "Weak",         kh: "ខ្សោយ",                color: "bg-red-500",     text: "text-red-300"   },
    { en: "Fair",         kh: "មធ្យម",                color: "bg-orange-500",  text: "text-orange-300" },
    { en: "Strong",       kh: "ខ្លាំង",                color: "bg-yellow-400",  text: "text-yellow-300" },
    { en: "Unbreakable",  kh: "មិនអាចបំបាក់បាន",       color: "bg-emerald-400", text: "text-emerald-300" },
  ];

  const meterLabel = labels[score];

  return (
    <div
      className="rounded-2xl border-2 border-emerald-500/30 bg-slate-950 p-5 sm:p-6 shadow-xl"
      data-testid="password-forge"
    >
      <header className="mb-4">
        <div className={`text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-300/90 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {t("Tool 02 · Password forge", "ឧបករណ៍ ០២ · កាត់សិតពាក្យសម្ងាត់")}
        </div>
        <h3 className={`mt-1 text-xl sm:text-2xl font-bold text-white ${kh ? "font-khmer" : "font-display"}`}>
          {t("The Password Strength Forge", "កន្លែងផ្គុំពាក្យសម្ងាត់ឲ្យខ្លាំង")}
        </h3>
        <p className={`mt-1 text-sm text-slate-300 max-w-xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "Type a password below. The forge will show you in real time how strong it is — and how to make it unbreakable.",
            "វាយពាក្យសម្ងាត់ខាងក្រោម។ កន្លែងផ្គុំនឹងបង្ហាញអ្នកជាក់ស្តែង ថាវាខ្លាំងប៉ុណ្ណា — និងវិធីដើម្បីធ្វើឲ្យវាមិនអាចបំបាក់បាន។",
          )}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Input + meter */}
        <div>
          <label className={`block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {t("Try a password", "សាកល្បងពាក្យសម្ងាត់")}
          </label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              data-testid="input-password"
              placeholder={t("e.g. BlueCowEatsRice!", "ឧ. BlueCowEatsRice!")}
              className="w-full bg-slate-900 border-2 border-slate-700 focus:border-emerald-400 focus:outline-none rounded-xl pl-9 pr-10 py-3 text-white font-mono text-sm placeholder:text-slate-600"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-200"
              aria-label={show ? t("Hide password", "លាក់ពាក្យសម្ងាត់") : t("Show password", "បង្ហាញពាក្យសម្ងាត់")}
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* 4-bar meter */}
          <div className="mt-3 flex gap-1.5" data-testid="strength-meter" data-strength={score}>
            {[1, 2, 3, 4].map((seg) => (
              <div
                key={seg}
                className={`h-2 flex-1 rounded-full transition-colors duration-200 ${
                  score >= seg ? labels[score].color : "bg-slate-800"
                }`}
              />
            ))}
          </div>
          <div className={`mt-1.5 text-xs font-bold ${meterLabel.text} ${kh ? "font-khmer" : ""}`}>
            {t("Strength: ", "កម្រិតខ្លាំង៖ ")}
            <span data-testid="strength-label">{kh ? meterLabel.kh : meterLabel.en}</span>
          </div>

          {/* Checklist */}
          <ul className="mt-4 space-y-1.5">
            <Check item={lengthOK} kh={kh} en="Use 8+ characters" khText="ប្រើ ៨+ តួអក្សរ" testId="check-length" />
            <Check item={hasNumber} kh={kh} en="Use a number (0–9)" khText="ប្រើលេខ (០–៩)" testId="check-number" />
            <Check item={hasSymbol} kh={kh} en="Use a symbol (! @ # $)" khText="ប្រើនិមិត្តសញ្ញា (! @ # $)" testId="check-symbol" />
            <Check item={noName} kh={kh} en="Don't use your name or common words" khText="កុំប្រើឈ្មោះ ឬពាក្យធម្មតា" testId="check-noname" />
          </ul>
        </div>

        {/* Passphrase explainer */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
          <div className="flex items-center gap-2 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            {t("Pro tip · Use a passphrase", "គន្លឹះ · ប្រើឃ្លាសម្ងាត់")}
          </div>
          <p className={`text-sm text-slate-200 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Four random words glued together are easier for you to remember — and much harder for a computer to guess — than a short twisted password.",
              "ពាក្យចៃដន្យបួនភ្ជាប់គ្នា គឺងាយស្រួលសម្រាប់អ្នកចងចាំ — ហើយលំបាកជាងច្រើនសម្រាប់កុំព្យូទ័រទាយ — ជាងពាក្យសម្ងាត់ខ្លីៗដែលប៉ះប៉ូវ។",
            )}
          </p>

          <div className="mt-3 space-y-2 text-sm">
            <ComparisonRow
              kh={kh}
              labelEn="❌ Password123"
              labelKh="❌ Password123"
              noteEn="Cracked in about 17 minutes."
              noteKh="អាចបំបាក់ក្នុងរយៈពេលប្រហែល ១៧ នាទី។"
              tone="bad"
            />
            <ComparisonRow
              kh={kh}
              labelEn="✅ BlueCowEatsRice!"
              labelKh="✅ BlueCowEatsRice!"
              noteEn="Would take centuries to guess. Easy to remember as a picture in your mind."
              noteKh="ត្រូវការរាប់សតវត្សដើម្បីទាយ។ ងាយស្រួលចងចាំជារូបភាពនៅក្នុងគំនិតរបស់អ្នក។"
              tone="good"
            />
          </div>

          <div className="mt-3 flex items-start gap-2 text-[12px] text-emerald-100/85">
            <Lock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-emerald-300" />
            <p className={`leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "And never use the same password for Facebook, your email, and your bank app. If one site leaks, the others fall too.",
                "ហើយកុំប្រើពាក្យសម្ងាត់ដូចគ្នាសម្រាប់ Facebook អ៊ីមែល និងកម្មវិធីធនាគារ។ បើគេហទំព័រមួយលេចឯកសារ ឯកសារផ្សេងទៀតក៏ធ្លាក់ដែរ។",
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Check({ item, en, khText, kh, testId }: {
  item: boolean; en: string; khText: string; kh: boolean; testId: string;
}) {
  return (
    <li
      data-testid={testId}
      data-met={item ? "true" : "false"}
      className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
        item ? "text-emerald-300" : "text-slate-400"
      } ${kh ? "font-khmer leading-loose" : ""}`}
    >
      {item ? (
        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
      ) : (
        <div className="w-4 h-4 rounded-full border-2 border-current opacity-50 flex-shrink-0" />
      )}
      <span>{kh ? khText : en}</span>
    </li>
  );
}

function ComparisonRow({ labelEn, labelKh, noteEn, noteKh, tone, kh }: {
  labelEn: string; labelKh: string; noteEn: string; noteKh: string; tone: "good" | "bad"; kh: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-2.5 border ${
        tone === "good"
          ? "border-emerald-500/40 bg-emerald-500/10"
          : "border-red-500/40 bg-red-500/10"
      }`}
    >
      <div className={`font-mono text-sm font-bold ${tone === "good" ? "text-emerald-200" : "text-red-200"}`}>
        {kh ? labelKh : labelEn}
      </div>
      <div className={`text-[11px] mt-0.5 ${tone === "good" ? "text-emerald-200/75" : "text-red-200/75"} ${kh ? "font-khmer leading-loose" : ""}`}>
        {kh ? noteKh : noteEn}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
 * 3) DIGITAL FOOTPRINT VISUALIZER
 * SVG diagram: a posted photo at center, "Trace it" animates lines fanning to
 * downstream destinations (servers, brokers, search, screenshots, friends).
 * ────────────────────────────────────────────────────────────────────────────── */

type FootprintNode = {
  id: string;
  x: number;
  y: number;
  icon: React.ComponentType<{ className?: string }>;
  labelEn: string;
  labelKh: string;
  // Delay before the line to this node animates in (seconds)
  delay: number;
};

const FOOTPRINT_NODES: FootprintNode[] = [
  { id: "friends",   x: 110, y:  70, icon: Users,    labelEn: "Friends' phones",    labelKh: "ទូរស័ព្ទរបស់មិត្តភក្តិ",  delay: 0.0 },
  { id: "search",    x: 530, y:  70, icon: Search,   labelEn: "Search engines",     labelKh: "ម៉ាស៊ីនស្វែងរក",         delay: 0.2 },
  { id: "screenshot",x: 110, y: 210, icon: Camera,   labelEn: "Screenshots",        labelKh: "រូបថតអេក្រង់",            delay: 0.4 },
  { id: "broker",    x: 530, y: 210, icon: Database, labelEn: "Data brokers",        labelKh: "អ្នកជួញដូរទិន្នន័យ",        delay: 0.6 },
  { id: "servers",   x: 320, y: 270, icon: Server,   labelEn: "Cloud servers",      labelKh: "ម៉ាស៊ីនមេពពក",            delay: 0.8 },
];

function DigitalFootprintVisualizer({ kh }: { kh: boolean }) {
  const t = useTranslation();
  const CENTER = { x: 320, y: 140 };

  const [tracing, setTracing] = useState(false);
  const [done, setDone] = useState(false);
  // Single setTimeout — store id in a ref so we can clean up on reset/unmount
  // (otherwise navigating away mid-animation would still flip the "done" state).
  const doneTimerRef = useRef<number | null>(null);

  function clearDoneTimer() {
    if (doneTimerRef.current !== null) {
      window.clearTimeout(doneTimerRef.current);
      doneTimerRef.current = null;
    }
  }

  useEffect(() => () => clearDoneTimer(), []);

  function trace() {
    clearDoneTimer();
    setDone(false);
    setTracing(true);
    // Last node delay (0.8s) + animation duration (~1.4s)
    doneTimerRef.current = window.setTimeout(() => setDone(true), 2400);
  }

  function reset() {
    clearDoneTimer();
    setTracing(false);
    setDone(false);
  }

  return (
    <div
      className="rounded-2xl border-2 border-emerald-500/30 bg-slate-950 p-5 sm:p-6 shadow-xl"
      data-testid="footprint-visualizer"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <div className={`text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-300/90 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("Tool 03 · Digital footprint", "ឧបករណ៍ ០៣ · ស្នាមជើងឌីជីថល")}
          </div>
          <h3 className={`mt-1 text-xl sm:text-2xl font-bold text-white ${kh ? "font-khmer" : "font-display"}`}>
            {t("The Digital Footprint Visualizer", "ឧបករណ៍មើលឃើញស្នាមជើងឌីជីថល")}
          </h3>
          <p className={`mt-1 text-sm text-slate-300 max-w-xl ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "A student posts a single photo online. Press 'Trace it' to see how far that one photo can quietly travel.",
              "សិស្សម្នាក់ផុសរូបភាពមួយនៅលើអនឡាញ។ ចុច 'តាមដាន' ដើម្បីមើលឃើញថា រូបភាពតែមួយនោះអាចធ្វើដំណើរដោយស្ងៀមៗបានឆ្ងាយប៉ុណ្ណា។",
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={trace}
            disabled={tracing && !done}
            data-testid="button-trace"
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
              tracing && !done
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-400 text-white"
            } ${kh ? "font-khmer" : ""}`}
          >
            <Share2 className="w-4 h-4" />
            {t("Trace it", "តាមដាន")}
          </button>
          {(tracing || done) && (
            <button
              type="button"
              onClick={reset}
              data-testid="button-reset-footprint"
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              aria-label={t("Reset", "កំណត់ឡើងវិញ")}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      <div className="relative w-full rounded-xl overflow-hidden border border-emerald-500/20 bg-slate-900/60">
        <svg
          viewBox="0 0 640 360"
          className="w-full h-auto block"
          role="img"
          aria-label={t("Digital footprint diagram", "ដ្យាក្រាមស្នាមជើងឌីជីថល")}
        >
          {/* Decorative grid */}
          <defs>
            <pattern id="fp-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1e293b" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="640" height="360" fill="url(#fp-grid)" />

          {/* ── Lines from photo to each destination ───────────────────────── */}
          {FOOTPRINT_NODES.map((node) => (
            <g key={`line-${node.id}`}>
              <line
                x1={CENTER.x} y1={CENTER.y}
                x2={node.x}    y2={node.y}
                stroke={tracing ? "#ef4444" : "#334155"}
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeDashoffset={tracing ? 0 : 64}
                style={tracing ? {
                  animation: `shieldDash 1.2s linear ${node.delay}s infinite`,
                  opacity: 1,
                } : { opacity: 0.4 }}
              />
              {tracing && (
                <FootprintPacket
                  from={CENTER}
                  to={{ x: node.x, y: node.y }}
                  delay={node.delay}
                />
              )}
            </g>
          ))}

          {/* ── Center: posted photo ──────────────────────────────────────── */}
          <g>
            {tracing && (
              <circle
                cx={CENTER.x} cy={CENTER.y} r={48}
                fill="none" stroke="#ef4444" strokeWidth="2"
                style={{ animation: "shieldPulse 1.6s ease-in-out infinite" }}
              />
            )}
            <rect
              x={CENTER.x - 36} y={CENTER.y - 28}
              width={72} height={56}
              rx={8}
              fill="#0f172a" stroke={tracing ? "#ef4444" : "#10b981"} strokeWidth="2.5"
            />
            <foreignObject x={CENTER.x - 30} y={CENTER.y - 22} width={60} height={44}>
              <div className="w-full h-full flex flex-col items-center justify-center text-white">
                <ImageIcon className="w-5 h-5 text-emerald-300" />
                <div className={`text-[9px] font-bold mt-0.5 ${kh ? "font-khmer" : ""}`}>
                  {kh ? "រូបភាព" : "Your photo"}
                </div>
              </div>
            </foreignObject>
          </g>

          {/* ── Destination nodes ─────────────────────────────────────────── */}
          {FOOTPRINT_NODES.map((node) => {
            const Icon = node.icon;
            const visited = tracing;
            return (
              <g key={node.id} data-testid={`footprint-node-${node.id}`}>
                <circle
                  cx={node.x} cy={node.y} r={26}
                  fill="#0f172a"
                  stroke={visited ? "#ef4444" : "#475569"}
                  strokeWidth="2"
                />
                <foreignObject x={node.x - 14} y={node.y - 14} width={28} height={28}>
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon className={visited ? "w-5 h-5 text-red-300" : "w-5 h-5 text-slate-400"} />
                  </div>
                </foreignObject>
                <foreignObject x={node.x - 70} y={node.y + 28} width={140} height={36}>
                  <div className={`text-center text-[11px] font-bold leading-tight ${visited ? "text-red-200" : "text-slate-400"} ${kh ? "font-khmer" : ""}`}>
                    {kh ? node.labelKh : node.labelEn}
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        {/* Warning banner overlays once trace completes */}
        {done && (
          <div
            data-testid="footprint-warning"
            role="status"
            aria-live="polite"
            className={`absolute left-3 right-3 sm:left-4 sm:right-4 bottom-3 sm:bottom-4 rounded-lg px-3.5 py-2.5 text-sm shadow-lg backdrop-blur-sm border border-red-400 bg-red-500/90 text-red-50 ${kh ? "font-khmer leading-loose" : ""}`}
            style={{ animation: "blockedIn 0.45s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards" }}
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong>{t("Once it is on the internet, it is very hard to fully take back.", "ពេលដែលវាមាននៅលើអ៊ីនធឺណិត វាពិបាកណាស់ក្នុងការដកវាមកវិញទាំងស្រុង។")}</strong>{" "}
                {t(
                  "Friends can save copies, search engines may index it, and apps often share it with companies you've never heard of. Think before you share.",
                  "មិត្តភក្តិអាចរក្សាច្បាប់ចម្លង ម៉ាស៊ីនស្វែងរកអាចសារពើរពន្ធវា ហើយកម្មវិធីច្រើនតែចែករំលែកវាជាមួយក្រុមហ៊ុនដែលអ្នកមិនដែលលឺឈ្មោះ។ គិតមុនពេលចែករំលែក។",
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <p className={`mt-4 text-center text-sm italic text-emerald-200 ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "“The internet has a long memory. Be kind to your future self.”",
          "«អ៊ីនធឺណិតមានការចងចាំយូរ។ សូមមេត្តាដល់ខ្លួនអ្នកនៅអនាគត។»",
        )}
      </p>
    </div>
  );
}

function FootprintPacket({
  from, to, delay,
}: { from: { x: number; y: number }; to: { x: number; y: number }; delay: number }) {
  const path = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  return (
    <circle
      r="4"
      fill="#ef4444"
      style={{
        offsetPath: `path("${path}")`,
        WebkitOffsetPath: `path("${path}")`,
        animation: `shieldPacket 1.4s ease-in ${delay}s infinite`,
        filter: "drop-shadow(0 0 6px #ef4444)",
      } as React.CSSProperties}
    />
  );
}

export default CybersecurityShield;
