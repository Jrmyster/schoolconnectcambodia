import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, MapPin, Briefcase, Star, BookOpen, Search, X, RotateCcw } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import careersData from "@/data/careers.json";

type Career = {
  id: string;
  en: string;
  kh: string;
  tasks: { en: string[]; kh: string[] };
  impact: { en: string; kh: string };
};

type Major = {
  id: string;
  en: string;
  kh: string;
  icon: string;
  careers: Career[];
};

const allMajors = careersData as Major[];

/* ─── Shared sub-components ─────────────────────────────────────────── */

function TaskPanel({ career, kh }: { career: Career; kh: boolean }) {
  const tasks  = kh ? career.tasks.kh : career.tasks.en;
  const impact = kh ? career.impact.kh : career.impact.en;
  const title  = kh ? career.kh        : career.en;

  return (
    <div className="h-full flex flex-col">
      <div
        className="px-5 py-4 border-b flex items-center gap-3"
        style={{ borderColor: "#BFDBFE", background: "#EFF6FF" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#1E3A5F,#2563EB)" }}
        >
          <Briefcase size={14} color="white" />
        </div>
        <p className={`font-bold text-slate-800 text-sm leading-snug ${kh ? "font-khmer" : ""}`}>
          {title}
        </p>
      </div>

      <div className="px-5 py-4 flex-1 overflow-y-auto">
        <p
          className={`text-xs font-bold uppercase tracking-wide mb-3 ${kh ? "font-khmer" : ""}`}
          style={{ color: "#2563EB" }}
        >
          {kh ? "កិច្ចការប្រចាំថ្ងៃ" : "Daily Tasks"}
        </p>
        <ul className="space-y-3">
          {tasks.map((task, i) => (
            <li key={i} className="flex gap-2.5">
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5"
                style={{ background: "#2563EB" }}
              >
                {i + 1}
              </span>
              <p className={`text-sm text-slate-700 leading-relaxed ${kh ? "font-khmer" : ""}`}>
                {task}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="mx-4 mb-4 rounded-xl px-4 py-3 border"
        style={{ borderColor: "#93C5FD", background: "linear-gradient(135deg,#DBEAFE,#EFF6FF)" }}
      >
        <div className="flex gap-2 items-start">
          <Star size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#1D4ED8" }} />
          <div>
            <p
              className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${kh ? "font-khmer" : ""}`}
              style={{ color: "#1D4ED8" }}
            >
              {kh ? "ផលប៉ះពាល់" : "Your Impact"}
            </p>
            <p className={`text-xs text-blue-900 leading-relaxed italic ${kh ? "font-khmer" : ""}`}>
              {impact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyCareers({ kh }: { kh: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10 px-6 text-center">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
        style={{ background: "#EFF6FF" }}
      >
        <Briefcase size={20} style={{ color: "#93C5FD" }} />
      </div>
      <p className={`text-sm font-semibold text-slate-500 ${kh ? "font-khmer" : ""}`}>
        {kh ? "កំពុងបន្ថែម..." : "Careers coming soon"}
      </p>
      <p className={`text-xs text-slate-400 mt-1 ${kh ? "font-khmer" : ""}`}>
        {kh ? "ទិន្នន័យសម្រាប់ Major នេះ នឹងត្រូវបន្ថែមក្នុងពេលឆាប់ៗ។" : "Data for this major will be added shortly."}
      </p>
    </div>
  );
}

/* ─── Search bar ─────────────────────────────────────────────────────── */

function SearchBar({
  value,
  onChange,
  onClear,
  kh,
}: {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  kh: boolean;
}) {
  return (
    <div className="relative">
      <Search
        size={13}
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: "#93C5FD" }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={kh ? "ស្វែងរកមុខជំនាញ... (Search Majors...)" : "Search Majors... (ស្វែងរកមុខជំនាញ...)"}
        className={`w-full pl-8 py-2 text-xs border rounded-lg outline-none transition-colors ${value ? "pr-8" : "pr-3"} ${kh ? "font-khmer" : ""}`}
        style={{
          borderColor: "#BFDBFE",
          background: "#F8FAFC",
          color: "#1E3A5F",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
        onBlur={(e) => (e.target.style.borderColor = "#BFDBFE")}
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center transition-colors hover:bg-blue-200"
          style={{ color: "#93C5FD" }}
          aria-label="Clear search"
          type="button"
        >
          <X size={10} />
        </button>
      )}
    </div>
  );
}

/* ─── Desktop 3-column view ──────────────────────────────────────────── */

function DesktopView({
  majors,
  searchQuery,
  onSearchChange,
  initialActiveMajorId,
}: {
  majors: Major[];
  searchQuery: string;
  onSearchChange: (v: string) => void;
  initialActiveMajorId?: string;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const firstWithCareers = majors.find(m => m.careers.length > 0) ?? majors[0];
  const [activeMajorId,   setActiveMajorId]   = useState<string>(
    initialActiveMajorId ?? firstWithCareers?.id ?? ""
  );
  const [activeCareerIdx, setActiveCareerIdx] = useState<number>(0);

  const activeMajor  = majors.find(m => m.id === activeMajorId) ?? majors[0];
  const activeCareer = activeMajor?.careers[activeCareerIdx] ?? null;

  const handleMajorClick = (id: string) => {
    setActiveMajorId(id);
    setActiveCareerIdx(0);
  };

  return (
    <div
      className="hidden lg:grid rounded-2xl overflow-hidden border"
      style={{
        borderColor: "#BFDBFE",
        gridTemplateColumns: "1fr 1fr 1.4fr",
        minHeight: "420px",
      }}
    >
      {/* ── Col 1: Majors ── */}
      <div className="border-r flex flex-col" style={{ borderColor: "#BFDBFE" }}>
        <div
          className="px-4 py-3 border-b flex-shrink-0"
          style={{ background: "#1E3A5F", borderColor: "#2D4F7A" }}
        >
          <p className={`text-xs font-bold text-blue-200 uppercase tracking-wide mb-2 ${kh ? "font-khmer" : ""}`}>
            {kh ? "ជ្រើសជំនាញ" : "Select Major"}
          </p>
          <SearchBar value={searchQuery} onChange={onSearchChange} onClear={() => onSearchChange("")} kh={kh} />
        </div>

        <div
          className="flex-1 bg-white overflow-y-auto"
          style={{ maxHeight: "380px" }}
        >
          {majors.length === 0 ? (
            <div className="px-4 py-6 text-center">
              <p className={`text-xs text-slate-400 ${kh ? "font-khmer" : ""}`}>
                {kh ? "រកមិនឃើញ" : "No results found"}
              </p>
            </div>
          ) : (
            majors.map((m) => {
              const active = m.id === activeMajorId;
              return (
                <button
                  key={m.id}
                  onClick={() => handleMajorClick(m.id)}
                  className="w-full text-left px-4 py-3.5 border-b flex items-center gap-3 transition-colors"
                  style={{
                    borderColor: "#EFF6FF",
                    background: active ? "linear-gradient(90deg,#EFF6FF,#DBEAFE)" : "white",
                    borderLeft: active ? "3px solid #2563EB" : "3px solid transparent",
                  }}
                >
                  <span className="text-lg flex-shrink-0">{m.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-semibold leading-snug ${kh ? "font-khmer" : ""}`}
                      style={{ color: active ? "#1D4ED8" : "#1E3A5F" }}
                    >
                      {kh ? m.kh : m.en}
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${kh ? "" : "font-khmer"}`}
                      style={{ color: "#64748B" }}
                    >
                      {kh ? m.en : m.kh}
                    </p>
                  </div>
                  <ChevronRight
                    size={13}
                    className="flex-shrink-0 ml-auto"
                    style={{ color: active ? "#2563EB" : "#CBD5E1" }}
                  />
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ── Col 2: Careers ── */}
      <div className="border-r flex flex-col" style={{ borderColor: "#BFDBFE" }}>
        <div
          className="px-4 py-3 border-b flex-shrink-0"
          style={{ background: "#1E3A5F", borderColor: "#2D4F7A" }}
        >
          <p className={`text-xs font-bold text-blue-200 uppercase tracking-wide ${kh ? "font-khmer" : ""}`}>
            {kh ? "ជ្រើសអាជីព" : "Select Career"}
          </p>
        </div>
        <div className="flex-1 bg-white overflow-y-auto" style={{ maxHeight: "380px" }}>
          {activeMajor && activeMajor.careers.length > 0 ? (
            activeMajor.careers.map((career, idx) => {
              const active = idx === activeCareerIdx;
              return (
                <button
                  key={career.id}
                  onClick={() => setActiveCareerIdx(idx)}
                  className="w-full text-left px-4 py-3.5 border-b flex items-center gap-3 transition-colors"
                  style={{
                    borderColor: "#EFF6FF",
                    background: active ? "linear-gradient(90deg,#EFF6FF,#DBEAFE)" : "white",
                    borderLeft: active ? "3px solid #2563EB" : "3px solid transparent",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: active ? "#2563EB" : "#EFF6FF" }}
                  >
                    <Briefcase size={12} color={active ? "white" : "#2563EB"} />
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-semibold leading-snug ${kh ? "font-khmer" : ""}`}
                      style={{ color: active ? "#1D4ED8" : "#1E3A5F" }}
                    >
                      {kh ? career.kh : career.en}
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${kh ? "" : "font-khmer"}`}
                      style={{ color: "#64748B" }}
                    >
                      {kh ? career.en : career.kh}
                    </p>
                  </div>
                  <ChevronRight
                    size={13}
                    className="flex-shrink-0 ml-auto"
                    style={{ color: active ? "#2563EB" : "#CBD5E1" }}
                  />
                </button>
              );
            })
          ) : (
            <EmptyCareers kh={kh} />
          )}
        </div>
      </div>

      {/* ── Col 3: Task Panel ── */}
      <div className="flex flex-col bg-white">
        <div
          className="px-4 py-3 border-b flex-shrink-0"
          style={{ background: "#1E3A5F", borderColor: "#2D4F7A" }}
        >
          <p className={`text-xs font-bold text-blue-200 uppercase tracking-wide ${kh ? "font-khmer" : ""}`}>
            {kh ? "ការពិពណ៌នា" : "Daily Tasks & Impact"}
          </p>
        </div>
        {activeCareer ? (
          <TaskPanel career={activeCareer} kh={kh} />
        ) : (
          <EmptyCareers kh={kh} />
        )}
      </div>
    </div>
  );
}

/* ─── Mobile accordion view ──────────────────────────────────────────── */

function MobileView({
  majors,
  searchQuery,
  onSearchChange,
  initialActiveMajorId,
}: {
  majors: Major[];
  searchQuery: string;
  onSearchChange: (v: string) => void;
  initialActiveMajorId?: string;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [openMajorId,  setOpenMajorId]  = useState<string | null>(initialActiveMajorId ?? null);
  const [openCareerId, setOpenCareerId] = useState<string | null>(null);

  const toggleMajor = (id: string) => {
    setOpenMajorId(prev => (prev === id ? null : id));
    setOpenCareerId(null);
  };

  const toggleCareer = (id: string) => {
    setOpenCareerId(prev => (prev === id ? null : id));
  };

  return (
    <div className="lg:hidden rounded-2xl overflow-hidden border" style={{ borderColor: "#BFDBFE" }}>
      {/* Search bar */}
      <div
        className="px-4 py-3 border-b"
        style={{ background: "#1E3A5F", borderColor: "#2D4F7A" }}
      >
        <p className={`text-xs font-bold text-blue-200 uppercase tracking-wide mb-2 ${kh ? "font-khmer" : ""}`}>
          {kh ? "ជ្រើសជំនាញ" : "Select Major"}
        </p>
        <SearchBar value={searchQuery} onChange={onSearchChange} onClear={() => onSearchChange("")} kh={kh} />
      </div>

      {/* Scrollable accordion */}
      <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
        {majors.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className={`text-sm text-slate-400 ${kh ? "font-khmer" : ""}`}>
              {kh ? "រកមិនឃើញ" : "No results found"}
            </p>
          </div>
        ) : (
          majors.map((major, mi) => {
            const majorOpen = openMajorId === major.id;
            return (
              <div
                key={major.id}
                className={mi > 0 ? "border-t" : ""}
                style={{ borderColor: "#BFDBFE" }}
              >
                <button
                  onClick={() => toggleMajor(major.id)}
                  className="w-full flex items-center gap-3 px-4 py-4 text-left transition-colors"
                  style={{
                    background: majorOpen
                      ? "linear-gradient(90deg,#1E3A5F,#1D4ED8)"
                      : "linear-gradient(90deg,#F8FAFC,#EFF6FF)",
                  }}
                >
                  <span className="text-2xl flex-shrink-0">{major.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-bold text-sm ${kh ? "font-khmer" : ""}`}
                      style={{ color: majorOpen ? "white" : "#1E3A5F" }}
                    >
                      {kh ? major.kh : major.en}
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${kh ? "" : "font-khmer"}`}
                      style={{ color: majorOpen ? "#BFDBFE" : "#64748B" }}
                    >
                      {kh ? major.en : major.kh}
                    </p>
                  </div>
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: majorOpen ? "rgba(255,255,255,0.15)" : "#DBEAFE" }}
                  >
                    {majorOpen
                      ? <ChevronDown size={14} color="white" />
                      : <ChevronRight size={14} color="#2563EB" />}
                  </div>
                </button>

                {majorOpen && (
                  <div style={{ background: "#F8FAFC" }}>
                    {major.careers.length === 0 ? (
                      <div className="border-t" style={{ borderColor: "#E2E8F0" }}>
                        <EmptyCareers kh={kh} />
                      </div>
                    ) : (
                      major.careers.map((career) => {
                        const careerOpen = openCareerId === career.id;
                        return (
                          <div key={career.id} className="border-t" style={{ borderColor: "#E2E8F0" }}>
                            <button
                              onClick={() => toggleCareer(career.id)}
                              className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors"
                              style={{
                                background: careerOpen ? "#EFF6FF" : "transparent",
                                borderLeft: careerOpen ? "3px solid #2563EB" : "3px solid transparent",
                              }}
                            >
                              <div
                                className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center"
                                style={{ background: careerOpen ? "#2563EB" : "#DBEAFE" }}
                              >
                                <Briefcase size={12} color={careerOpen ? "white" : "#2563EB"} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm font-semibold ${kh ? "font-khmer" : ""}`}
                                  style={{ color: careerOpen ? "#1D4ED8" : "#1E3A5F" }}
                                >
                                  {kh ? career.kh : career.en}
                                </p>
                                <p
                                  className={`text-xs mt-0.5 ${kh ? "" : "font-khmer"}`}
                                  style={{ color: "#64748B" }}
                                >
                                  {kh ? career.en : career.kh}
                                </p>
                              </div>
                              <ChevronDown
                                size={13}
                                style={{
                                  color: careerOpen ? "#2563EB" : "#94A3B8",
                                  transform: careerOpen ? "rotate(0deg)" : "rotate(-90deg)",
                                  transition: "transform 0.2s",
                                }}
                              />
                            </button>

                            {careerOpen && (
                              <div className="border-t" style={{ borderColor: "#DBEAFE" }}>
                                <TaskPanel career={career} kh={kh} />
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* ─── Main exported component ────────────────────────────────────────── */

interface FuturePathwaysProps {
  initialSearchQuery?: string;
  onSearchQueryConsumed?: () => void;
  jumpToMajorId?: string;
  onReset?: () => void;
}

export function FuturePathways({
  initialSearchQuery,
  onSearchQueryConsumed,
  jumpToMajorId,
  onReset,
}: FuturePathwaysProps = {}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery ?? "");
  const [resetKey,    setResetKey]    = useState(0);

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
      onSearchQueryConsumed?.();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSearchQuery]);

  function handleReset() {
    setSearchQuery("");
    setResetKey(k => k + 1);
    onReset?.();
  }

  const filteredMajors = searchQuery.trim()
    ? allMajors.filter(m =>
        m.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.kh.includes(searchQuery)
      )
    : allMajors;

  return (
    <section
      className="max-w-4xl mx-auto px-4 sm:px-6 pb-20"
      aria-labelledby="future-pathways-title"
    >
      <div className="mb-6 flex items-start gap-3">
        <div
          className="mt-0.5 flex-shrink-0 rounded-lg p-2"
          style={{ background: "linear-gradient(135deg,#1E3A5F,#2563EB)" }}
        >
          <MapPin size={20} color="white" />
        </div>
        <div>
          <h2
            id="future-pathways-title"
            className={`text-2xl font-extrabold text-foreground ${kh ? "font-khmer" : ""}`}
          >
            {kh ? "មគ្គុទ្ទេសក៍ផ្លូវអនាគត" : "Future Pathways Guide"}
          </h2>
          <p className={`mt-1 text-sm text-muted-foreground ${kh ? "font-khmer" : ""}`}>
            {kh
              ? "ស្វែងយល់ពីវិស័យ ជ្រើសអាជីព ហើយស្វែងអ្វីដែលអ្នកត្រូវធ្វើប្រចាំថ្ងៃ។"
              : "Explore a field, pick a career, and discover exactly what your day will look like."}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 border text-xs font-medium"
          style={{ borderColor: "#BFDBFE", background: "#EFF6FF", color: "#1D4ED8" }}
        >
          <BookOpen size={12} />
          <span className={kh ? "font-khmer" : ""}>
            {kh
              ? "ជ្រើស Major → ជ្រើស Career → អានកិច្ចការប្រចាំថ្ងៃ"
              : "Choose a Major → Choose a Career → Read Daily Tasks"}
          </span>
        </div>

        <button
          onClick={handleReset}
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 border text-xs font-semibold transition-all min-h-[36px] active:scale-95 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50 ${kh ? "font-khmer" : ""}`}
          style={{ borderColor: "#CBD5E1", color: "#64748B", background: "transparent" }}
          title={kh ? "កំណត់ឡើងវិញ" : "Reset Explorer"}
          type="button"
        >
          <RotateCcw size={11} />
          <span>{kh ? "កំណត់ឡើងវិញ" : "Reset"}</span>
          {!kh && <span className="font-khmer font-normal opacity-60 text-[10px]">(កំណត់ឡើងវិញ)</span>}
        </button>
      </div>

      <DesktopView
        key={`desktop-${resetKey}`}
        majors={filteredMajors}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        initialActiveMajorId={jumpToMajorId}
      />

      <MobileView
        key={`mobile-${resetKey}`}
        majors={filteredMajors}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        initialActiveMajorId={jumpToMajorId}
      />

      <p className={`mt-4 text-xs text-center text-slate-400 ${kh ? "font-khmer" : ""}`}>
        {kh
          ? `${allMajors.length} មុខជំនាញ — ទិន្នន័យផ្លូវអាជីពត្រូវបានរក្សាទុកក្នុង careers.json`
          : `${allMajors.length} majors — career data lives in careers.json, add new ones anytime`}
      </p>
    </section>
  );
}
