import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  User as UserIcon,
  GraduationCap,
  Wrench,
  Briefcase,
  Sparkles,
  Plus,
  Trash2,
  Printer,
  Bot,
  CheckCircle2,
  Languages as LanguagesIcon,
  FileText,
  ChevronDown,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  CAREER · Digital Resume Builder
//  Aesthetic: Office — minimalist whites, deep navy, clear borders
// ════════════════════════════════════════════════════════════════════════════

const NAVY = "#1e3a8a";
const NAVY_DEEP = "#172554";
const INK = "#0f172a";
const SUBTLE = "#475569";
const MUTED = "#64748b";
const BORDER = "#e2e8f0";
const PAPER = "#ffffff";
const BG = "#f8fafc";
const ACCENT = "#2563eb";

const STORAGE_KEY = "chuy-sala:resume-draft";
const HISTORY_KEY = "chuy-sala:interview-history";

// ════════════════════════════════════════════════════════════════════════════
//  TYPES
// ════════════════════════════════════════════════════════════════════════════

type InterviewRecord = {
  id: string;
  labelEn: string;
  labelKh: string;
  category: string;
  dateISO: string;
};

type EducationEntry = {
  id: string;
  schoolEn: string;
  schoolKh: string;
  degreeEn: string;
  degreeKh: string;
  years: string;
  detailsEn: string;
  detailsKh: string;
};

type SkillEntry = {
  id: string;
  nameEn: string;
  nameKh: string;
};

type ExperienceEntry = {
  id: string;
  roleEn: string;
  roleKh: string;
  companyEn: string;
  companyKh: string;
  dates: string;
  bulletsEn: string[];
  bulletsKh: string[];
};

type ResumeData = {
  fullNameEn: string;
  fullNameKh: string;
  headlineEn: string;
  headlineKh: string;
  email: string;
  phone: string;
  location: string;
  summaryEn: string;
  summaryKh: string;
  education: EducationEntry[];
  skills: SkillEntry[];
  syncedSkills: InterviewRecord[];
  experience: ExperienceEntry[];
};

const STEPS = [
  {
    id: "personal",
    labelEn: "Personal Info",
    labelKh: "ព័ត៌មានផ្ទាល់ខ្លួន",
    icon: UserIcon,
  },
  {
    id: "education",
    labelEn: "Education",
    labelKh: "ការអប់រំ",
    icon: GraduationCap,
  },
  {
    id: "skills",
    labelEn: "Skills",
    labelKh: "ជំនាញ",
    icon: Wrench,
  },
  {
    id: "experience",
    labelEn: "Experience",
    labelKh: "បទពិសោធន៍",
    icon: Briefcase,
  },
] as const;

type StepId = (typeof STEPS)[number]["id"];

// ════════════════════════════════════════════════════════════════════════════
//  ACTION VERBS — bilingual strong verb library
// ════════════════════════════════════════════════════════════════════════════

const ACTION_VERBS: Array<{ en: string; kh: string }> = [
  { en: "Managed", kh: "ដឹកនាំ" },
  { en: "Analyzed", kh: "វិភាគ" },
  { en: "Engineered", kh: "រចនា" },
  { en: "Collaborated", kh: "សហការ" },
  { en: "Designed", kh: "ឌីហ្សាញ" },
  { en: "Developed", kh: "អភិវឌ្ឍ" },
  { en: "Improved", kh: "កែលម្អ" },
  { en: "Coordinated", kh: "សម្របសម្រួល" },
  { en: "Researched", kh: "ស្រាវជ្រាវ" },
  { en: "Implemented", kh: "អនុវត្ត" },
  { en: "Led", kh: "ដឹកនាំ" },
  { en: "Trained", kh: "បណ្ដុះបណ្ដាល" },
];

// ════════════════════════════════════════════════════════════════════════════
//  HELPERS
// ════════════════════════════════════════════════════════════════════════════

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function emptyEducation(): EducationEntry {
  return {
    id: uid(),
    schoolEn: "",
    schoolKh: "",
    degreeEn: "",
    degreeKh: "",
    years: "",
    detailsEn: "",
    detailsKh: "",
  };
}

function emptySkill(): SkillEntry {
  return { id: uid(), nameEn: "", nameKh: "" };
}

function emptyExperience(): ExperienceEntry {
  return {
    id: uid(),
    roleEn: "",
    roleKh: "",
    companyEn: "",
    companyKh: "",
    dates: "",
    bulletsEn: [""],
    bulletsKh: [""],
  };
}

function defaultResume(): ResumeData {
  return {
    fullNameEn: "",
    fullNameKh: "",
    headlineEn: "",
    headlineKh: "",
    email: "",
    phone: "",
    location: "",
    summaryEn: "",
    summaryKh: "",
    education: [emptyEducation()],
    skills: [emptySkill()],
    syncedSkills: [],
    experience: [emptyExperience()],
  };
}

// Strict, defensive sanitiser so corrupted-but-parseable JSON in localStorage
// can't crash the page (e.g. `education: null` or wrong shape).
function sanitizeResume(raw: unknown): ResumeData {
  const d = defaultResume();
  if (!raw || typeof raw !== "object") return d;
  const r = raw as Record<string, unknown>;
  const str = (v: unknown): string => (typeof v === "string" ? v : "");
  const arr = <T,>(v: unknown, fallback: T[]): T[] =>
    Array.isArray(v) ? (v as T[]) : fallback;

  const education = arr<unknown>(r.education, []).map((e) => {
    const o = (e ?? {}) as Record<string, unknown>;
    return {
      id: str(o.id) || uid(),
      schoolEn: str(o.schoolEn),
      schoolKh: str(o.schoolKh),
      degreeEn: str(o.degreeEn),
      degreeKh: str(o.degreeKh),
      years: str(o.years),
      detailsEn: str(o.detailsEn),
      detailsKh: str(o.detailsKh),
    };
  });

  const skills = arr<unknown>(r.skills, []).map((s) => {
    const o = (s ?? {}) as Record<string, unknown>;
    return { id: str(o.id) || uid(), nameEn: str(o.nameEn), nameKh: str(o.nameKh) };
  });

  const syncedSkills = arr<unknown>(r.syncedSkills, [])
    .filter((s) => {
      const o = (s ?? {}) as Record<string, unknown>;
      return typeof o.id === "string" && typeof o.dateISO === "string";
    })
    .map((s) => {
      const o = s as Record<string, unknown>;
      return {
        id: str(o.id),
        labelEn: str(o.labelEn),
        labelKh: str(o.labelKh),
        category: str(o.category),
        dateISO: str(o.dateISO),
      };
    });

  const experience = arr<unknown>(r.experience, []).map((e) => {
    const o = (e ?? {}) as Record<string, unknown>;
    return {
      id: str(o.id) || uid(),
      roleEn: str(o.roleEn),
      roleKh: str(o.roleKh),
      companyEn: str(o.companyEn),
      companyKh: str(o.companyKh),
      dates: str(o.dates),
      bulletsEn: arr<unknown>(o.bulletsEn, [""]).map(str),
      bulletsKh: arr<unknown>(o.bulletsKh, [""]).map(str),
    };
  });

  return {
    fullNameEn: str(r.fullNameEn),
    fullNameKh: str(r.fullNameKh),
    headlineEn: str(r.headlineEn),
    headlineKh: str(r.headlineKh),
    email: str(r.email),
    phone: str(r.phone),
    location: str(r.location),
    summaryEn: str(r.summaryEn),
    summaryKh: str(r.summaryKh),
    // Keep the form usable: at least one editable entry per repeating section.
    education: education.length > 0 ? education : d.education,
    skills: skills.length > 0 ? skills : d.skills,
    syncedSkills,
    experience: experience.length > 0 ? experience : d.experience,
  };
}

function loadDraft(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultResume();
    return sanitizeResume(JSON.parse(raw));
  } catch {
    return defaultResume();
  }
}

function loadInterviewHistory(): InterviewRecord[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (r): r is InterviewRecord =>
        !!r &&
        typeof r === "object" &&
        typeof (r as InterviewRecord).id === "string" &&
        typeof (r as InterviewRecord).dateISO === "string",
    );
  } catch {
    return [];
  }
}

function formatDateBadge(iso: string, isKh: boolean): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  if (isKh) {
    const months = [
      "មករា",
      "កុម្ភៈ",
      "មីនា",
      "មេសា",
      "ឧសភា",
      "មិថុនា",
      "កក្កដា",
      "សីហា",
      "កញ្ញា",
      "តុលា",
      "វិច្ឆិកា",
      "ធ្នូ",
    ];
    return `${months[d.getMonth()]} ${d.getFullYear()}`;
  }
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

// ════════════════════════════════════════════════════════════════════════════
//  ROOT
// ════════════════════════════════════════════════════════════════════════════

export default function ResumeBuilderPage() {
  const language = useLanguageStore((s) => s.language);
  const isKh = language === "kh";

  const [resume, setResume] = useState<ResumeData>(() => loadDraft());
  const [step, setStep] = useState<StepId>("personal");
  const [syncFlash, setSyncFlash] = useState<string | null>(null);

  // Persist draft (debounced via storage events; localStorage is sync but fast)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
    } catch {
      // ignore quota errors
    }
  }, [resume]);

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  return (
    <div
      className="resume-builder min-h-screen"
      style={{ backgroundColor: BG, color: INK }}
    >
      {/* Top hairline */}
      <div
        aria-hidden
        className="h-[3px] w-full"
        style={{
          backgroundImage: `linear-gradient(90deg, ${NAVY_DEEP}, ${NAVY}, ${ACCENT}, ${NAVY})`,
        }}
      />

      <div
        className="resume-noprint mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10"
      >
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={14} />
          {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to home"}
        </Link>

        <Header isKh={isKh} />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr,1.05fr]">
          {/* LEFT: Wizard */}
          <div className="space-y-5">
            <Stepper currentStep={step} setStep={setStep} isKh={isKh} stepIndex={stepIndex} />

            <div
              className="rounded-xl border bg-white p-5 sm:p-6"
              style={{ borderColor: BORDER }}
            >
              {step === "personal" && (
                <PersonalSection isKh={isKh} resume={resume} setResume={setResume} />
              )}
              {step === "education" && (
                <EducationSection isKh={isKh} resume={resume} setResume={setResume} />
              )}
              {step === "skills" && (
                <SkillsSection
                  isKh={isKh}
                  resume={resume}
                  setResume={setResume}
                  setSyncFlash={setSyncFlash}
                />
              )}
              {step === "experience" && (
                <ExperienceSection isKh={isKh} resume={resume} setResume={setResume} />
              )}

              {syncFlash && step === "skills" && (
                <div
                  data-testid="sync-flash"
                  className="mt-4 inline-flex items-center gap-2 rounded-md border bg-blue-50 px-3 py-2 text-xs font-semibold"
                  style={{ borderColor: "#bfdbfe", color: NAVY }}
                >
                  <CheckCircle2 size={14} />
                  {syncFlash}
                </div>
              )}

              <StepNav step={step} setStep={setStep} isKh={isKh} />
            </div>
          </div>

          {/* RIGHT: Preview */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <PreviewToolbar isKh={isKh} />
            <div
              className="resume-print-area mt-3 overflow-hidden rounded-xl border bg-white shadow-sm"
              style={{ borderColor: BORDER }}
              data-testid="resume-preview"
            >
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </div>

      <PrintStyles />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  HEADER
// ════════════════════════════════════════════════════════════════════════════

function Header({ isKh }: { isKh: boolean }) {
  return (
    <div>
      <div
        className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.18em]"
        style={{
          borderColor: BORDER,
          backgroundColor: PAPER,
          color: NAVY,
        }}
      >
        <FileText size={13} />
        <span>RESUME BUILDER</span>
        <span style={{ color: MUTED }}>·</span>
        <span style={{ color: SUBTLE }}>កម្មវិធីបង្កើតប្រវត្តិរូបសង្ខេប</span>
      </div>

      <h1
        className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
        style={{ color: INK }}
      >
        {isKh
          ? "កម្មវិធីបង្កើតប្រវត្តិរូបសង្ខេបឌីជីថល"
          : "Digital Resume Builder"}
      </h1>
      <p
        className="mt-2 max-w-2xl text-[14.5px] leading-relaxed"
        style={{ color: SUBTLE }}
      >
        {isKh
          ? "បំពេញព័ត៌មានរបស់អ្នកជាបួនជំហាន ហើយយើងនឹងបង្កើតប្រវត្តិរូបសង្ខេបបែបជំនាញតាមស្ដង់ដារពីរភាសា ដែលអ្នកអាចបោះពុម្ពយកទៅសម្ភាសន៍ការងារនៅភ្នំពេញ ឬសៀមរាប។"
          : "Fill in four short steps and we'll generate a clean, bilingual Standard Professional resume you can print and bring to interviews in Phnom Penh, Siem Reap, or anywhere in Cambodia."}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  STEPPER
// ════════════════════════════════════════════════════════════════════════════

function Stepper({
  currentStep,
  setStep,
  isKh,
  stepIndex,
}: {
  currentStep: StepId;
  setStep: (id: StepId) => void;
  isKh: boolean;
  stepIndex: number;
}) {
  const current = STEPS[stepIndex] ?? STEPS[0];
  const CurrentIcon = current.icon;
  return (
    <div className="space-y-2">
      {/* Mobile-only "Step X of 4: Current Step Name" indicator.
          Saves vertical space on phones while keeping context obvious. */}
      <div
        className="flex items-center justify-between gap-2 rounded-xl border bg-white px-3 py-2 sm:hidden"
        style={{ borderColor: BORDER }}
        data-testid="resume-stepper-mobile-indicator"
        aria-live="polite"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-[11px] font-bold text-white"
            style={{ backgroundColor: NAVY }}
          >
            {stepIndex + 1}
          </span>
          <div className="flex min-w-0 flex-col leading-tight">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{ color: MUTED }}
            >
              {isKh
                ? `ជំហានទី ${stepIndex + 1} នៃ ${STEPS.length}`
                : `Step ${stepIndex + 1} of ${STEPS.length}`}
            </span>
            <span className="flex items-center gap-1.5 text-sm font-bold break-words" style={{ color: INK }}>
              <CurrentIcon size={13} />
              <span className="break-words">{isKh ? current.labelKh : current.labelEn}</span>
            </span>
            <span className="text-[11px] font-medium break-words" style={{ color: SUBTLE }}>
              {isKh ? current.labelEn : current.labelKh}
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal stepper. On mobile: swipeable, snap-aligned, hidden scrollbar.
          On sm+: keeps the original 4-column row look. */}
      <ol
        className="hide-scrollbar flex items-stretch gap-2 overflow-x-auto whitespace-nowrap rounded-xl border bg-white p-2 snap-x snap-mandatory"
        style={{ borderColor: BORDER }}
        data-testid="resume-stepper"
        aria-label={isKh ? "ជំហានបង្កើត" : "Builder steps"}
      >
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const active = s.id === currentStep;
          const completed = i < stepIndex;
          return (
            <li key={s.id} className="flex-1 min-w-[150px] sm:min-w-[110px] snap-start">
              <button
                type="button"
                data-testid={`step-${s.id}`}
                onClick={() => setStep(s.id)}
                className="flex min-h-[44px] w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs transition"
                style={{
                  borderColor: active ? NAVY : completed ? "#bfdbfe" : BORDER,
                  backgroundColor: active ? NAVY : completed ? "#eff6ff" : PAPER,
                  color: active ? "#fff" : completed ? NAVY : INK,
                }}
              >
                <span
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-md border text-[10px] font-bold"
                  style={{
                    borderColor: active ? "rgba(255,255,255,0.4)" : completed ? NAVY : BORDER,
                    backgroundColor: active ? "rgba(255,255,255,0.15)" : "#fff",
                    color: active ? "#fff" : NAVY,
                  }}
                >
                  {i + 1}
                </span>
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="flex items-center gap-1.5 truncate font-semibold">
                    <Icon size={12} />
                    <span className="truncate">{isKh ? s.labelKh : s.labelEn}</span>
                  </span>
                  <span
                    className="truncate text-[10px] font-medium"
                    style={{
                      color: active ? "rgba(255,255,255,0.75)" : MUTED,
                    }}
                  >
                    {isKh ? s.labelEn : s.labelKh}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function StepNav({
  step,
  setStep,
  isKh,
}: {
  step: StepId;
  setStep: (s: StepId) => void;
  isKh: boolean;
}) {
  const idx = STEPS.findIndex((s) => s.id === step);
  const prev = idx > 0 ? STEPS[idx - 1] : null;
  const next = idx < STEPS.length - 1 ? STEPS[idx + 1] : null;
  return (
    <div
      className="mt-6 flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between"
      style={{ borderColor: BORDER }}
    >
      <button
        type="button"
        disabled={!prev}
        onClick={() => prev && setStep(prev.id)}
        className="inline-flex w-full min-h-[44px] items-center justify-center gap-1.5 rounded-md border px-4 py-2 text-sm font-semibold disabled:opacity-40 sm:w-auto sm:text-xs"
        style={{ borderColor: BORDER, color: SUBTLE, backgroundColor: PAPER }}
        data-testid="btn-step-back"
      >
        <ArrowLeft size={14} />
        {prev ? (isKh ? prev.labelKh : prev.labelEn) : isKh ? "មុន" : "Previous"}
      </button>
      <button
        type="button"
        disabled={!next}
        onClick={() => next && setStep(next.id)}
        className="inline-flex w-full min-h-[44px] items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-bold text-white disabled:opacity-40 sm:w-auto sm:text-xs"
        style={{ backgroundColor: next ? NAVY : MUTED }}
        data-testid="btn-step-next"
      >
        {next ? (isKh ? next.labelKh : next.labelEn) : isKh ? "បញ្ចប់" : "Done"}
        <ArrowRight size={14} />
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  REUSABLE FIELD
// ════════════════════════════════════════════════════════════════════════════

function Label({
  children,
  hint,
}: {
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: SUBTLE }}>
      {children}
      {hint && <span className="ml-1.5 font-normal normal-case tracking-normal" style={{ color: MUTED }}>({hint})</span>}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        "block w-full min-h-[44px] rounded-md border bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 " +
        (props.className ?? "")
      }
      style={{ borderColor: BORDER, color: INK, ...(props.style ?? {}) }}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={
        "block w-full min-h-[44px] rounded-md border bg-white px-3 py-2 text-sm leading-relaxed outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 " +
        (props.className ?? "")
      }
      style={{ borderColor: BORDER, color: INK, ...(props.style ?? {}) }}
    />
  );
}

function BilingualField({
  labelEn,
  labelKh,
  isKh,
  valueEn,
  valueKh,
  onChangeEn,
  onChangeKh,
  rows,
  placeholderEn,
  placeholderKh,
  testIdEn,
  testIdKh,
}: {
  labelEn: string;
  labelKh: string;
  isKh: boolean;
  valueEn: string;
  valueKh: string;
  onChangeEn: (v: string) => void;
  onChangeKh: (v: string) => void;
  rows?: number;
  placeholderEn?: string;
  placeholderKh?: string;
  testIdEn?: string;
  testIdKh?: string;
}) {
  return (
    <div className="space-y-2.5">
      <div>
        <Label hint="English">{isKh ? labelKh : labelEn}</Label>
        {rows ? (
          <TextArea
            rows={rows}
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            placeholder={placeholderEn}
            data-testid={testIdEn}
          />
        ) : (
          <TextInput
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            placeholder={placeholderEn}
            data-testid={testIdEn}
          />
        )}
      </div>
      <div>
        <Label hint="ខ្មែរ · Khmer translation">
          <span className="inline-flex items-center gap-1">
            <LanguagesIcon size={11} />
            {isKh ? labelEn : labelKh}
          </span>
        </Label>
        {rows ? (
          <TextArea
            rows={rows}
            value={valueKh}
            onChange={(e) => onChangeKh(e.target.value)}
            placeholder={placeholderKh}
            data-testid={testIdKh}
          />
        ) : (
          <TextInput
            value={valueKh}
            onChange={(e) => onChangeKh(e.target.value)}
            placeholder={placeholderKh}
            data-testid={testIdKh}
          />
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  STEP 1 — PERSONAL INFO
// ════════════════════════════════════════════════════════════════════════════

function PersonalSection({
  isKh,
  resume,
  setResume,
}: {
  isKh: boolean;
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
}) {
  return (
    <div data-testid="section-personal">
      <SectionTitle
        icon={UserIcon}
        en="Personal Information"
        kh="ព័ត៌មានផ្ទាល់ខ្លួន"
        isKh={isKh}
      />
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <BilingualField
          isKh={isKh}
          labelEn="Full name"
          labelKh="ឈ្មោះពេញ"
          valueEn={resume.fullNameEn}
          valueKh={resume.fullNameKh}
          onChangeEn={(v) => setResume((r) => ({ ...r, fullNameEn: v }))}
          onChangeKh={(v) => setResume((r) => ({ ...r, fullNameKh: v }))}
          placeholderEn="Sothearak Chea"
          placeholderKh="ចា សុធារ៉ាក់"
          testIdEn="input-fullNameEn"
          testIdKh="input-fullNameKh"
        />
        <BilingualField
          isKh={isKh}
          labelEn="Headline"
          labelKh="ចំណងជើង"
          valueEn={resume.headlineEn}
          valueKh={resume.headlineKh}
          onChangeEn={(v) => setResume((r) => ({ ...r, headlineEn: v }))}
          onChangeKh={(v) => setResume((r) => ({ ...r, headlineKh: v }))}
          placeholderEn="Environmental Science Apprentice"
          placeholderKh="កម្មសិក្សាការីវិទ្យាសាស្ត្របរិស្ថាន"
          testIdEn="input-headlineEn"
          testIdKh="input-headlineKh"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <Label>{isKh ? "អ៊ីមែល" : "Email"}</Label>
          <TextInput
            type="email"
            value={resume.email}
            onChange={(e) => setResume((r) => ({ ...r, email: e.target.value }))}
            placeholder="you@example.com"
            data-testid="input-email"
          />
        </div>
        <div>
          <Label>{isKh ? "លេខទូរស័ព្ទ" : "Phone"}</Label>
          <TextInput
            value={resume.phone}
            onChange={(e) => setResume((r) => ({ ...r, phone: e.target.value }))}
            placeholder="+855 12 345 678"
            data-testid="input-phone"
          />
        </div>
        <div>
          <Label>{isKh ? "ទីកន្លែង" : "Location"}</Label>
          <TextInput
            value={resume.location}
            onChange={(e) => setResume((r) => ({ ...r, location: e.target.value }))}
            placeholder={isKh ? "ភ្នំពេញ កម្ពុជា" : "Phnom Penh, Cambodia"}
            data-testid="input-location"
          />
        </div>
      </div>

      <div className="mt-5">
        <BilingualField
          isKh={isKh}
          labelEn="Professional summary"
          labelKh="ការសង្ខេបវិជ្ជាជីវៈ"
          valueEn={resume.summaryEn}
          valueKh={resume.summaryKh}
          onChangeEn={(v) => setResume((r) => ({ ...r, summaryEn: v }))}
          onChangeKh={(v) => setResume((r) => ({ ...r, summaryKh: v }))}
          rows={3}
          placeholderEn="2–3 sentences about who you are and what you bring to the role."
          placeholderKh="២-៣ ប្រយោគអំពីអ្នក និងអ្វីដែលអ្នកនាំមកដល់តួនាទី។"
          testIdEn="input-summaryEn"
          testIdKh="input-summaryKh"
        />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  STEP 2 — EDUCATION
// ════════════════════════════════════════════════════════════════════════════

function EducationSection({
  isKh,
  resume,
  setResume,
}: {
  isKh: boolean;
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
}) {
  const updateEdu = (id: string, patch: Partial<EducationEntry>) => {
    setResume((r) => ({
      ...r,
      education: r.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
  };

  const removeEdu = (id: string) => {
    setResume((r) => ({
      ...r,
      education:
        r.education.length > 1
          ? r.education.filter((e) => e.id !== id)
          : [emptyEducation()],
    }));
  };

  return (
    <div data-testid="section-education">
      <SectionTitle
        icon={GraduationCap}
        en="Education"
        kh="ការអប់រំ"
        isKh={isKh}
      />

      <div className="mt-4 space-y-5">
        {resume.education.map((edu, i) => (
          <div
            key={edu.id}
            className="rounded-lg border p-4"
            style={{ borderColor: BORDER, backgroundColor: BG }}
            data-testid={`education-entry-${i}`}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: NAVY }}>
                {isKh ? `ការអប់រំ #${i + 1}` : `Entry #${i + 1}`}
              </span>
              <button
                type="button"
                onClick={() => removeEdu(edu.id)}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md px-2 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                aria-label={isKh ? "លុប" : "Remove"}
              >
                <Trash2 size={12} />
                {isKh ? "លុប" : "Remove"}
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <BilingualField
                isKh={isKh}
                labelEn="School / University"
                labelKh="សាលា / សាកលវិទ្យាល័យ"
                valueEn={edu.schoolEn}
                valueKh={edu.schoolKh}
                onChangeEn={(v) => updateEdu(edu.id, { schoolEn: v })}
                onChangeKh={(v) => updateEdu(edu.id, { schoolKh: v })}
                placeholderEn="Royal University of Phnom Penh"
                placeholderKh="សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ"
              />
              <BilingualField
                isKh={isKh}
                labelEn="Degree / Programme"
                labelKh="សញ្ញាបត្រ / កម្មវិធី"
                valueEn={edu.degreeEn}
                valueKh={edu.degreeKh}
                onChangeEn={(v) => updateEdu(edu.id, { degreeEn: v })}
                onChangeKh={(v) => updateEdu(edu.id, { degreeKh: v })}
                placeholderEn="BSc in Environmental Science"
                placeholderKh="វិទ្យាសាស្ត្របរិស្ថាន"
              />
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <Label>{isKh ? "ឆ្នាំ" : "Years"}</Label>
                <TextInput
                  value={edu.years}
                  onChange={(e) => updateEdu(edu.id, { years: e.target.value })}
                  placeholder="2022 – 2026"
                />
              </div>
              <div className="sm:col-span-2">
                <BilingualField
                  isKh={isKh}
                  labelEn="Achievements / Honours"
                  labelKh="សមិទ្ធផល / ការទទួលស្គាល់"
                  valueEn={edu.detailsEn}
                  valueKh={edu.detailsKh}
                  onChangeEn={(v) => updateEdu(edu.id, { detailsEn: v })}
                  onChangeKh={(v) => updateEdu(edu.id, { detailsKh: v })}
                  placeholderEn="Top of class, Dean's list 2025"
                  placeholderKh="កំពូលថ្នាក់ ទទួលបានបញ្ជី Dean ឆ្នាំ ២០២៥"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setResume((r) => ({ ...r, education: [...r.education, emptyEducation()] }))
          }
          className="inline-flex w-full min-h-[44px] items-center justify-center gap-1.5 rounded-md border px-4 py-2 text-sm font-semibold sm:w-auto sm:text-xs"
          style={{ borderColor: NAVY, color: NAVY, backgroundColor: PAPER }}
          data-testid="add-education"
        >
          <Plus size={14} />
          {isKh ? "បន្ថែមការអប់រំ" : "Add another education entry"}
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  STEP 3 — SKILLS (with Skill-Sync feature)
// ════════════════════════════════════════════════════════════════════════════

function SkillsSection({
  isKh,
  resume,
  setResume,
  setSyncFlash,
}: {
  isKh: boolean;
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
  setSyncFlash: (s: string | null) => void;
}) {
  const updateSkill = (id: string, patch: Partial<SkillEntry>) => {
    setResume((r) => ({
      ...r,
      skills: r.skills.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  };

  const removeSkill = (id: string) => {
    setResume((r) => ({
      ...r,
      skills:
        r.skills.length > 1
          ? r.skills.filter((s) => s.id !== id)
          : [emptySkill()],
    }));
  };

  const removeSyncedSkill = (id: string, dateISO: string) => {
    setResume((r) => ({
      ...r,
      syncedSkills: r.syncedSkills.filter(
        (s) => !(s.id === id && s.dateISO === dateISO),
      ),
    }));
  };

  const importInterviewScores = () => {
    const history = loadInterviewHistory();
    if (history.length === 0) {
      setSyncFlash(
        isKh
          ? "មិនទាន់មានការសម្ភាសន៍ដែលបានបញ្ចប់នៅឡើយទេ — សូមសាកល្បងកម្មវិធីសម្ភាសន៍ជាមុនសិន។"
          : "No completed interviews yet — try the Interview Simulator first.",
      );
      return;
    }
    // Deduplicate by id + dateISO so re-importing is safe.
    const existingKey = new Set(
      resume.syncedSkills.map((s) => `${s.id}|${s.dateISO}`),
    );
    const fresh = history.filter(
      (h) => !existingKey.has(`${h.id}|${h.dateISO}`),
    );
    if (fresh.length === 0) {
      setSyncFlash(
        isKh
          ? "ការសម្ភាសន៍ទាំងអស់ត្រូវបាននាំចូលរួចរាល់។"
          : "All your interview scores are already imported.",
      );
      return;
    }
    setResume((r) => ({
      ...r,
      syncedSkills: [...r.syncedSkills, ...fresh],
    }));
    setSyncFlash(
      isKh
        ? `បាននាំចូល ${fresh.length} លទ្ធផលសម្ភាសន៍។`
        : `Imported ${fresh.length} interview result${fresh.length === 1 ? "" : "s"}.`,
    );
  };

  return (
    <div data-testid="section-skills">
      <SectionTitle
        icon={Wrench}
        en="Skills"
        kh="ជំនាញ"
        isKh={isKh}
      />

      {/* Skill-Sync */}
      <div
        className="mt-4 rounded-lg border p-4"
        style={{ borderColor: "#bfdbfe", backgroundColor: "#f5f9ff" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: NAVY }}>
              <Bot size={13} />
              {isKh ? "ការតភ្ជាប់ជំនាញ" : "Skill-Sync"}
            </div>
            <div className="mt-1 break-words text-[13px]" style={{ color: SUBTLE }}>
              {isKh
                ? "នាំចូលលទ្ធផលសម្ភាសន៍ដែលអ្នកបានបញ្ចប់ ចូលជា 'ជំនាញបច្ចេកទេស' ដោយស្វ័យប្រវត្តិ។"
                : "Pull in the mock interviews you've completed as Technical Skills badges, automatically."}
            </div>
          </div>
          <button
            type="button"
            onClick={importInterviewScores}
            className="inline-flex w-full min-h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-bold text-white sm:w-auto sm:text-xs"
            style={{ backgroundColor: NAVY }}
            data-testid="btn-skill-sync"
          >
            <Sparkles size={14} />
            {isKh ? "នាំចូលពិន្ទុសម្ភាសន៍" : "Import Interview Simulator Scores"}
          </button>
        </div>

        {resume.syncedSkills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2" data-testid="synced-badges">
            {resume.syncedSkills.map((s) => (
              <span
                key={`${s.id}-${s.dateISO}`}
                className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
                style={{
                  borderColor: NAVY,
                  backgroundColor: "#fff",
                  color: NAVY,
                }}
              >
                <CheckCircle2 size={11} />
                {isKh ? "បានជាប់៖" : "Passed:"} {isKh ? s.labelKh : s.labelEn}{" "}
                <span style={{ color: MUTED }}>
                  ({formatDateBadge(s.dateISO, isKh)})
                </span>
                <button
                  type="button"
                  onClick={() => removeSyncedSkill(s.id, s.dateISO)}
                  className="ml-1 rounded p-0.5 hover:bg-slate-100"
                  aria-label={isKh ? "លុប" : "Remove"}
                >
                  <Trash2 size={10} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Manual skills */}
      <div className="mt-5">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: SUBTLE }}>
          {isKh ? "ជំនាញដែលបញ្ចូលដោយដៃ" : "Manually-entered skills"}
        </div>
        <div className="space-y-3">
          {resume.skills.map((skill, i) => (
            <div
              key={skill.id}
              className="grid items-end gap-2 sm:grid-cols-[1fr,1fr,auto]"
              data-testid={`skill-row-${i}`}
            >
              <div>
                <Label hint="English">{isKh ? "ឈ្មោះជំនាញ" : "Skill name"}</Label>
                <TextInput
                  value={skill.nameEn}
                  onChange={(e) => updateSkill(skill.id, { nameEn: e.target.value })}
                  placeholder="Microsoft Excel"
                />
              </div>
              <div>
                <Label hint="ខ្មែរ">{isKh ? "បកប្រែ" : "Khmer translation"}</Label>
                <TextInput
                  value={skill.nameKh}
                  onChange={(e) => updateSkill(skill.id, { nameKh: e.target.value })}
                  placeholder="ម៉ៃក្រូសូហ្វ Excel"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="inline-flex w-full min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-md border text-sm font-semibold text-rose-600 hover:bg-rose-50 sm:w-11 sm:gap-0 sm:text-xs"
                style={{ borderColor: BORDER }}
                aria-label={isKh ? "លុបជំនាញ" : "Remove skill"}
              >
                <Trash2 size={14} />
                <span className="sm:hidden">{isKh ? "លុប" : "Remove"}</span>
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setResume((r) => ({ ...r, skills: [...r.skills, emptySkill()] }))}
          className="mt-3 inline-flex w-full min-h-[44px] items-center justify-center gap-1.5 rounded-md border px-4 py-2 text-sm font-semibold sm:w-auto sm:text-xs"
          style={{ borderColor: NAVY, color: NAVY, backgroundColor: PAPER }}
          data-testid="add-skill"
        >
          <Plus size={14} />
          {isKh ? "បន្ថែមជំនាញ" : "Add another skill"}
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  STEP 4 — EXPERIENCE (with action verb suggester)
// ════════════════════════════════════════════════════════════════════════════

function ExperienceSection({
  isKh,
  resume,
  setResume,
}: {
  isKh: boolean;
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
}) {
  const updateExp = (id: string, patch: Partial<ExperienceEntry>) => {
    setResume((r) => ({
      ...r,
      experience: r.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
  };

  const updateBullet = (
    id: string,
    bulletIdx: number,
    lang: "en" | "kh",
    value: string,
  ) => {
    setResume((r) => ({
      ...r,
      experience: r.experience.map((e) => {
        if (e.id !== id) return e;
        if (lang === "en") {
          const next = [...e.bulletsEn];
          next[bulletIdx] = value;
          return { ...e, bulletsEn: next };
        } else {
          const next = [...e.bulletsKh];
          next[bulletIdx] = value;
          return { ...e, bulletsKh: next };
        }
      }),
    }));
  };

  const insertVerb = (
    id: string,
    bulletIdx: number,
    verb: { en: string; kh: string },
  ) => {
    setResume((r) => ({
      ...r,
      experience: r.experience.map((e) => {
        if (e.id !== id) return e;
        const en = [...e.bulletsEn];
        const kh = [...e.bulletsKh];
        const enExisting = en[bulletIdx] ?? "";
        const khExisting = kh[bulletIdx] ?? "";
        en[bulletIdx] = enExisting
          ? `${verb.en} ${enExisting.replace(/^\s*/, "")}`
          : `${verb.en} `;
        kh[bulletIdx] = khExisting
          ? `${verb.kh} ${khExisting.replace(/^\s*/, "")}`
          : `${verb.kh} `;
        return { ...e, bulletsEn: en, bulletsKh: kh };
      }),
    }));
  };

  const addBullet = (id: string) => {
    setResume((r) => ({
      ...r,
      experience: r.experience.map((e) =>
        e.id === id
          ? { ...e, bulletsEn: [...e.bulletsEn, ""], bulletsKh: [...e.bulletsKh, ""] }
          : e,
      ),
    }));
  };

  const removeBullet = (id: string, idx: number) => {
    setResume((r) => ({
      ...r,
      experience: r.experience.map((e) => {
        if (e.id !== id) return e;
        const en = e.bulletsEn.filter((_, i) => i !== idx);
        const kh = e.bulletsKh.filter((_, i) => i !== idx);
        return {
          ...e,
          bulletsEn: en.length ? en : [""],
          bulletsKh: kh.length ? kh : [""],
        };
      }),
    }));
  };

  const removeExp = (id: string) => {
    setResume((r) => ({
      ...r,
      experience:
        r.experience.length > 1
          ? r.experience.filter((e) => e.id !== id)
          : [emptyExperience()],
    }));
  };

  return (
    <div data-testid="section-experience">
      <SectionTitle
        icon={Briefcase}
        en="Experience"
        kh="បទពិសោធន៍"
        isKh={isKh}
      />

      <div className="mt-4 space-y-5">
        {resume.experience.map((exp, i) => (
          <div
            key={exp.id}
            className="rounded-lg border p-4"
            style={{ borderColor: BORDER, backgroundColor: BG }}
            data-testid={`experience-entry-${i}`}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: NAVY }}>
                {isKh ? `បទពិសោធន៍ #${i + 1}` : `Entry #${i + 1}`}
              </span>
              <button
                type="button"
                onClick={() => removeExp(exp.id)}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md px-2 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700"
              >
                <Trash2 size={12} />
                {isKh ? "លុប" : "Remove"}
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <BilingualField
                isKh={isKh}
                labelEn="Role / Position"
                labelKh="តួនាទី"
                valueEn={exp.roleEn}
                valueKh={exp.roleKh}
                onChangeEn={(v) => updateExp(exp.id, { roleEn: v })}
                onChangeKh={(v) => updateExp(exp.id, { roleKh: v })}
                placeholderEn="Junior Field Technician"
                placeholderKh="អ្នកបច្ចេកទេសវាលជំនាន់ថ្មី"
              />
              <BilingualField
                isKh={isKh}
                labelEn="Company / Organisation"
                labelKh="ក្រុមហ៊ុន / អង្គការ"
                valueEn={exp.companyEn}
                valueKh={exp.companyKh}
                onChangeEn={(v) => updateExp(exp.id, { companyEn: v })}
                onChangeKh={(v) => updateExp(exp.id, { companyKh: v })}
                placeholderEn="Tonle Sap Conservation"
                placeholderKh="ការអភិរក្សទន្លេសាប"
              />
            </div>

            <div className="mt-3">
              <Label>{isKh ? "កាលបរិច្ឆេទ" : "Dates"}</Label>
              <TextInput
                value={exp.dates}
                onChange={(e) => updateExp(exp.id, { dates: e.target.value })}
                placeholder="Jun 2024 – Present"
              />
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between">
                <Label>{isKh ? "ភាពជោគជ័យ (ជាចំណុច)" : "Achievements (bullet points)"}</Label>
              </div>
              <div className="space-y-3">
                {exp.bulletsEn.map((b, bi) => (
                  <BulletEditor
                    key={bi}
                    isKh={isKh}
                    indexLabel={bi + 1}
                    valueEn={b}
                    valueKh={exp.bulletsKh[bi] ?? ""}
                    onChangeEn={(v) => updateBullet(exp.id, bi, "en", v)}
                    onChangeKh={(v) => updateBullet(exp.id, bi, "kh", v)}
                    onInsertVerb={(verb) => insertVerb(exp.id, bi, verb)}
                    onRemove={() => removeBullet(exp.id, bi)}
                    canRemove={exp.bulletsEn.length > 1}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => addBullet(exp.id)}
                className="mt-3 inline-flex w-full min-h-[44px] items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-sm font-semibold sm:w-auto sm:text-xs"
                style={{ borderColor: BORDER, color: SUBTLE, backgroundColor: PAPER }}
              >
                <Plus size={13} />
                {isKh ? "បន្ថែមចំណុច" : "Add bullet"}
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setResume((r) => ({ ...r, experience: [...r.experience, emptyExperience()] }))
          }
          className="inline-flex w-full min-h-[44px] items-center justify-center gap-1.5 rounded-md border px-4 py-2 text-sm font-semibold sm:w-auto sm:text-xs"
          style={{ borderColor: NAVY, color: NAVY, backgroundColor: PAPER }}
          data-testid="add-experience"
        >
          <Plus size={14} />
          {isKh ? "បន្ថែមបទពិសោធន៍" : "Add another experience"}
        </button>
      </div>
    </div>
  );
}

function BulletEditor({
  isKh,
  indexLabel,
  valueEn,
  valueKh,
  onChangeEn,
  onChangeKh,
  onInsertVerb,
  onRemove,
  canRemove,
}: {
  isKh: boolean;
  indexLabel: number;
  valueEn: string;
  valueKh: string;
  onChangeEn: (v: string) => void;
  onChangeKh: (v: string) => void;
  onInsertVerb: (v: { en: string; kh: string }) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div
      className="rounded-md border p-3"
      style={{ borderColor: BORDER, backgroundColor: PAPER }}
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span
          className="grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold text-white"
          style={{ backgroundColor: NAVY }}
        >
          {indexLabel}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {/* Verb suggester */}
          <div className="relative" ref={ref}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-bold"
              style={{ borderColor: ACCENT, color: ACCENT, backgroundColor: "#eff6ff" }}
              data-testid={`verb-trigger-${indexLabel}`}
            >
              <Sparkles size={12} />
              {isKh ? "បញ្ចូលកិរិយាស័ព្ទខ្លាំង" : "Insert strong verb"}
              <ChevronDown size={12} />
            </button>
            {open && (
              <div
                className="absolute right-0 z-20 mt-1 max-h-64 w-56 overflow-y-auto rounded-md border bg-white shadow-lg"
                style={{ borderColor: BORDER }}
                data-testid="verb-menu"
              >
                {ACTION_VERBS.map((v) => (
                  <button
                    key={v.en}
                    type="button"
                    onClick={() => {
                      onInsertVerb(v);
                      setOpen(false);
                    }}
                    className="flex min-h-[44px] w-full items-center justify-between gap-3 border-b px-3 py-2 text-left text-xs hover:bg-slate-50"
                    style={{ borderColor: BORDER }}
                    data-testid={`verb-option-${v.en}`}
                  >
                    <span className="font-semibold" style={{ color: INK }}>{v.en}</span>
                    <span className="text-[11px]" style={{ color: MUTED }}>{v.kh}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {canRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-rose-500 hover:text-rose-700"
              aria-label={isKh ? "លុបចំណុច" : "Remove bullet"}
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      <BilingualField
        isKh={isKh}
        labelEn="Bullet"
        labelKh="ចំណុច"
        valueEn={valueEn}
        valueKh={valueKh}
        onChangeEn={onChangeEn}
        onChangeKh={onChangeKh}
        rows={2}
        placeholderEn="Engineered a low-cost water filter for 12 villages."
        placeholderKh="រចនាឧបករណ៍ច្រោះទឹកតម្លៃថោកសម្រាប់ភូមិចំនួន ១២។"
      />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  PREVIEW TOOLBAR
// ════════════════════════════════════════════════════════════════════════════

function PreviewToolbar({ isKh }: { isKh: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div
        className="text-[11px] font-bold uppercase tracking-[0.16em] break-words"
        style={{ color: SUBTLE }}
      >
        {isKh ? "ការមើលជាមុន · STANDARD PROFESSIONAL" : "Live Preview · Standard Professional"}
      </div>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex w-full min-h-[44px] items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-bold text-white sm:w-auto sm:text-xs"
        style={{ backgroundColor: NAVY }}
        data-testid="btn-print"
      >
        <Printer size={14} />
        {isKh ? "បង្កើត / ទាញយក PDF" : "Generate Resume · PDF / Print"}
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  RESUME PREVIEW
// ════════════════════════════════════════════════════════════════════════════

// IMPORTANT: The resume preview is the actual document the user will print.
// To keep the printed output deterministic (and to match the "Standard
// Professional" template description), we ALWAYS render English as the primary
// language and Khmer as an italic translation directly underneath — regardless
// of the global UI EN/KH toggle. The global toggle only affects the surrounding
// builder UI (form labels, buttons, section headers in the form).
function ResumePreview({ resume }: { resume: ResumeData }) {
  const fullName = useMemo(
    () => resume.fullNameEn || resume.fullNameKh || "Your Name",
    [resume.fullNameEn, resume.fullNameKh],
  );

  return (
    <div className="resume-paper" style={{ color: INK }}>
      {/* Header band */}
      <header
        className="px-7 py-6"
        style={{ backgroundColor: NAVY, color: "#fff" }}
      >
        <div className="text-2xl font-bold leading-tight tracking-tight">
          {fullName}
        </div>
        {resume.fullNameKh && resume.fullNameEn && (
          <div className="text-xs italic opacity-80">{resume.fullNameKh}</div>
        )}
        {(resume.headlineEn || resume.headlineKh) && (
          <div className="mt-1 text-sm font-semibold opacity-90">
            {resume.headlineEn || resume.headlineKh}
            {resume.headlineEn && resume.headlineKh && (
              <span className="ml-2 italic opacity-75">· {resume.headlineKh}</span>
            )}
          </div>
        )}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] opacity-90">
          {resume.email && <span>✉ {resume.email}</span>}
          {resume.phone && <span>☎ {resume.phone}</span>}
          {resume.location && <span>◉ {resume.location}</span>}
        </div>
      </header>

      <main className="space-y-5 px-7 py-6">
        {(resume.summaryEn || resume.summaryKh) && (
          <PreviewSection en="Summary" kh="ការសង្ខេប">
            {resume.summaryEn && (
              <p className="text-[12.5px] leading-relaxed">{resume.summaryEn}</p>
            )}
            {resume.summaryKh && (
              <p
                className="mt-1 text-[12px] italic leading-relaxed"
                style={{ color: SUBTLE }}
              >
                {resume.summaryKh}
              </p>
            )}
          </PreviewSection>
        )}

        {resume.experience.some(
          (e) => e.roleEn || e.roleKh || e.companyEn || e.companyKh || e.bulletsEn.some(Boolean) || e.bulletsKh.some(Boolean),
        ) && (
          <PreviewSection en="Experience" kh="បទពិសោធន៍">
            <div className="space-y-3.5">
              {resume.experience
                .filter(
                  (e) => e.roleEn || e.roleKh || e.companyEn || e.companyKh || e.bulletsEn.some(Boolean) || e.bulletsKh.some(Boolean),
                )
                .map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <div>
                        <div
                          className="text-[13px] font-bold"
                          style={{ color: INK }}
                        >
                          {e.roleEn || e.roleKh}
                          {(e.companyEn || e.companyKh) && (
                            <span
                              className="font-medium"
                              style={{ color: NAVY }}
                            >
                              {" — "}
                              {e.companyEn || e.companyKh}
                            </span>
                          )}
                        </div>
                        {(e.roleKh || e.companyKh) && (e.roleEn || e.companyEn) && (
                          <div
                            className="text-[11px] italic"
                            style={{ color: SUBTLE }}
                          >
                            {e.roleKh}
                            {e.companyKh && ` — ${e.companyKh}`}
                          </div>
                        )}
                      </div>
                      {e.dates && (
                        <div
                          className="shrink-0 text-[11px] font-semibold"
                          style={{ color: MUTED }}
                        >
                          {e.dates}
                        </div>
                      )}
                    </div>
                    {(e.bulletsEn.some(Boolean) || e.bulletsKh.some(Boolean)) && (
                      <ul className="mt-1.5 space-y-1 pl-4 text-[12px] leading-relaxed">
                        {e.bulletsEn.map((b, i) => {
                          const kh = e.bulletsKh[i];
                          if (!b && !kh) return null;
                          return (
                            <li
                              key={i}
                              className="list-disc"
                              style={{ color: INK }}
                            >
                              {b || kh}
                              {b && kh && (
                                <div
                                  className="mt-0.5 italic"
                                  style={{ color: SUBTLE }}
                                >
                                  {kh}
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ))}
            </div>
          </PreviewSection>
        )}

        {resume.education.some(
          (e) => e.schoolEn || e.schoolKh || e.degreeEn || e.degreeKh,
        ) && (
          <PreviewSection en="Education" kh="ការអប់រំ">
            <div className="space-y-2.5">
              {resume.education
                .filter(
                  (e) => e.schoolEn || e.schoolKh || e.degreeEn || e.degreeKh,
                )
                .map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <div>
                        <div
                          className="text-[12.5px] font-bold"
                          style={{ color: INK }}
                        >
                          {e.degreeEn || e.degreeKh}
                          {(e.schoolEn || e.schoolKh) && (
                            <span
                              className="font-medium"
                              style={{ color: NAVY }}
                            >
                              {" — "}
                              {e.schoolEn || e.schoolKh}
                            </span>
                          )}
                        </div>
                        {(e.degreeKh || e.schoolKh) && (e.degreeEn || e.schoolEn) && (
                          <div
                            className="text-[11px] italic"
                            style={{ color: SUBTLE }}
                          >
                            {e.degreeKh}
                            {e.schoolKh && ` — ${e.schoolKh}`}
                          </div>
                        )}
                      </div>
                      {e.years && (
                        <div
                          className="shrink-0 text-[11px] font-semibold"
                          style={{ color: MUTED }}
                        >
                          {e.years}
                        </div>
                      )}
                    </div>
                    {(e.detailsEn || e.detailsKh) && (
                      <div
                        className="mt-0.5 text-[11.5px] leading-relaxed"
                        style={{ color: INK }}
                      >
                        {e.detailsEn || e.detailsKh}
                        {e.detailsEn && e.detailsKh && (
                          <div className="italic" style={{ color: SUBTLE }}>
                            {e.detailsKh}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </PreviewSection>
        )}

        {(resume.skills.some((s) => s.nameEn || s.nameKh) ||
          resume.syncedSkills.length > 0) && (
          <PreviewSection en="Skills" kh="ជំនាញ">
            {resume.syncedSkills.length > 0 && (
              <div className="mb-2.5">
                <div
                  className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: NAVY }}
                >
                  Technical · បច្ចេកទេស
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {resume.syncedSkills.map((s) => (
                    <span
                      key={`${s.id}-${s.dateISO}`}
                      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-semibold"
                      style={{
                        borderColor: NAVY,
                        color: NAVY,
                        backgroundColor: "#eff6ff",
                      }}
                    >
                      ✓ Passed: {s.labelEn}{" "}
                      <span style={{ color: MUTED }}>
                        ({formatDateBadge(s.dateISO, false)})
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
            {resume.skills.some((s) => s.nameEn || s.nameKh) && (
              <div className="flex flex-wrap gap-1.5">
                {resume.skills
                  .filter((s) => s.nameEn || s.nameKh)
                  .map((s) => (
                    <span
                      key={s.id}
                      className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px]"
                      style={{
                        borderColor: BORDER,
                        color: INK,
                        backgroundColor: PAPER,
                      }}
                    >
                      {s.nameEn || s.nameKh}
                      {s.nameKh && s.nameEn && (
                        <span className="italic" style={{ color: SUBTLE }}>
                          · {s.nameKh}
                        </span>
                      )}
                    </span>
                  ))}
              </div>
            )}
          </PreviewSection>
        )}
      </main>
    </div>
  );
}

// Resume document section heading — always English primary with the Khmer
// translation as a quiet sub-label (deterministic regardless of UI toggle).
function PreviewSection({
  en,
  kh,
  children,
}: {
  en: string;
  kh: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        className="mb-2 border-b pb-1 text-[12px] font-bold uppercase tracking-[0.18em]"
        style={{ color: NAVY, borderColor: BORDER }}
      >
        {en}
        <span
          className="ml-2 font-semibold normal-case tracking-normal"
          style={{ color: MUTED }}
        >
          · {kh}
        </span>
      </h2>
      {children}
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION TITLE (form side)
// ════════════════════════════════════════════════════════════════════════════

function SectionTitle({
  icon: Icon,
  en,
  kh,
  isKh,
}: {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  en: string;
  kh: string;
  isKh: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <Icon size={16} style={{ color: NAVY }} />
      <h2 className="text-lg font-bold leading-tight break-words" style={{ color: INK }}>
        {isKh ? kh : en}
      </h2>
      <span
        className="text-[11px] font-semibold break-words"
        style={{ color: MUTED }}
      >
        · {isKh ? en : kh}
      </span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  PRINT CSS
//  Hides everything except .resume-print-area; A4 sizing; clean borders
// ════════════════════════════════════════════════════════════════════════════

function PrintStyles() {
  return (
    <style>{`
      /* Hide horizontal scrollbar on the mobile stepper without losing
         the swipe / overflow behavior. Works across major browsers. */
      .resume-builder .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      .resume-builder .hide-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      /* Prevent bilingual labels (English + ខ្មែរ) from forcing horizontal
         scroll on narrow phones — wrap them onto two lines instead. */
      .resume-builder label { white-space: normal; word-break: break-word; }
      @media print {
        @page { size: A4; margin: 12mm; }
        html, body { background: #fff !important; }
        /* Hide everything on the page except the resume preview and its
           descendants. Visibility-based hiding lets the print area sit
           wherever it naturally lives in the DOM (including inside the
           on-screen layout wrapper) and still print on its own. */
        body * { visibility: hidden !important; }
        .resume-print-area, .resume-print-area * { visibility: visible !important; }
        .resume-print-area {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          border: none !important;
          box-shadow: none !important;
          border-radius: 0 !important;
        }
        .resume-paper { color: #0f172a !important; }
        .resume-paper header {
          color: #fff !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
      /* Soft visual hint of A4 proportions on screen, without forcing layout. */
      .resume-paper { min-height: 600px; }
    `}</style>
  );
}

