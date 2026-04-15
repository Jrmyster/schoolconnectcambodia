import { useMemo } from "react";
import { useListNeeds, useListSchools } from "@workspace/api-client-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Link } from "wouter";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { School, ListChecks, DollarSign, ArrowLeft, Loader2, Map } from "lucide-react";
import { PROVINCE_KH } from "@/lib/province-data";
import { WeeklyRecap } from "@/components/WeeklyRecap";

const ALL_PROVINCES = [
  "Banteay Meanchey","Battambang","Kampong Cham","Kampong Chhnang","Kampong Speu",
  "Kampong Thom","Kampot","Kandal","Kep","Koh Kong","Kratié","Mondulkiri",
  "Oddar Meanchey","Pailin","Phnom Penh","Preah Sihanouk","Preah Vihear",
  "Prey Veng","Pursat","Ratanakiri","Siem Reap","Stung Treng","Svay Rieng",
  "Takéo","Tboung Khmum",
];

const MAP_CATEGORIES: { key: string; en: string; kh: string; color: string }[] = [
  { key: "Electronics",      en: "Tech",      kh: "បច្ចេកវិទ្យា",  color: "#3B82F6" },
  { key: "Books",            en: "Books",     kh: "សៀវភៅ",         color: "#10B981" },
  { key: "Furniture",        en: "Furniture", kh: "គ្រឿងសង្ហារឹម", color: "#F59E0B" },
  { key: "Infrastructure",   en: "Infra",     kh: "ហេដ្ឋារចនា",    color: "#8B5CF6" },
  { key: "WASH",             en: "WASH",      kh: "ទឹក/អនាម័យ",   color: "#06B6D4" },
  { key: "Sports",           en: "Sports",    kh: "កីឡា",           color: "#EF4444" },
  { key: "Teacher Training", en: "Teachers",  kh: "គ្រូ",           color: "#EC4899" },
  { key: "Other",            en: "Other",     kh: "ផ្សេងៗ",        color: "#6B7280" },
];

const CATEGORY_LABEL: Record<string, { en: string; kh: string }> = {
  Electronics:       { en: "Electronics & Tech",        kh: "គ្រឿងអេឡិចត្រូនិក" },
  Books:             { en: "Books & Stationery",         kh: "សៀវភៅ" },
  Furniture:         { en: "Furniture",                  kh: "គ្រឿងសង្ហារឹម" },
  Infrastructure:    { en: "Infrastructure & Repair",    kh: "ហេដ្ឋារចនាសម្ព័ន្ធ" },
  WASH:              { en: "Water & Sanitation",         kh: "ទឹកស្អាត" },
  Sports:            { en: "Sports & Arts",              kh: "កីឡា" },
  "Teacher Training":{ en: "Teacher Training",           kh: "បណ្តុះបណ្តាលគ្រូ" },
  Other:             { en: "Other",                      kh: "ផ្សេងៗ" },
  Stationery:        { en: "Stationery",                 kh: "សម្ភារៈ" },
};

const CHART_COLORS = [
  "#1A6EA8", "#2196F3", "#4CAF50", "#FF9800", "#9C27B0",
  "#F44336", "#00BCD4", "#8BC34A", "#FF5722",
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { name: string; value: number; payload: { kh: string } }[];
  language: string;
}

function PieTooltip({ active, payload, language }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-card border border-border rounded-xl shadow-lg px-4 py-2 text-sm">
      <p className={`font-bold text-foreground ${language === "kh" ? "font-khmer" : ""}`}>
        {language === "kh" ? item.payload.kh : item.name}
      </p>
      <p className="text-primary font-semibold">{item.value} {language === "kh" ? "តម្រូវការ" : "needs"}</p>
    </div>
  );
}

interface BarTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  language: string;
}

function BarTooltip({ active, payload, label, language }: BarTooltipProps) {
  if (!active || !payload?.length) return null;
  const displayLabel = language === "kh" ? (PROVINCE_KH[label ?? ""] ?? label) : label;
  return (
    <div className="bg-card border border-border rounded-xl shadow-lg px-4 py-2 text-sm">
      <p className={`font-bold text-foreground mb-1 ${language === "kh" ? "font-khmer" : ""}`}>{displayLabel}</p>
      <p className="text-primary font-semibold">{payload[0].value} {language === "kh" ? "តម្រូវការ" : "needs"}</p>
    </div>
  );
}

export function AdminDashboard() {
  const t = useTranslation();
  const { language } = useLanguageStore();

  const { data: schools, isLoading: schoolsLoading } = useListSchools();
  const { data: needs, isLoading: needsLoading } = useListNeeds();

  const isLoading = schoolsLoading || needsLoading;

  const activeNeeds = useMemo(
    () => (needs ?? []).filter(n => n.status === "active" || n.status === "funded"),
    [needs]
  );

  const totalValue = useMemo(
    () => activeNeeds.reduce((sum, n) => sum + (n.goalAmount ?? 0), 0),
    [activeNeeds]
  );

  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    activeNeeds.forEach(n => {
      counts[n.category] = (counts[n.category] ?? 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, count]) => ({
        name: CATEGORY_LABEL[cat]?.en ?? cat,
        kh: CATEGORY_LABEL[cat]?.kh ?? cat,
        value: count,
      }));
  }, [activeNeeds]);

  const provinceData = useMemo(() => {
    const counts: Record<string, number> = {};
    activeNeeds.forEach(n => {
      const prov = n.school?.province ?? "";
      if (!prov) return;
      counts[prov] = (counts[prov] ?? 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([prov, count]) => ({ province: prov, count }));
  }, [activeNeeds]);

  const provinceMatrix = useMemo(() => {
    const matrix: Record<string, Record<string, number>> = {};
    ALL_PROVINCES.forEach(p => { matrix[p] = {}; });
    activeNeeds.forEach(n => {
      const prov = n.school?.province ?? "";
      if (!prov || !matrix[prov]) return;
      matrix[prov][n.category] = (matrix[prov][n.category] ?? 0) + 1;
    });
    return matrix;
  }, [activeNeeds]);

  const metricClass = "bg-card rounded-2xl border border-border shadow-sm p-6 flex items-start gap-4";
  const iconWrap = "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0";

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 px-4 mb-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/admin" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className={language === "kh" ? "font-khmer" : ""}>{t("Back to Admin", "ត្រឡប់ទៅផ្ទាំងគ្រប់គ្រង")}</span>
          </Link>
          <h1 className={`text-3xl md:text-4xl font-bold ${language === "kh" ? "font-khmer" : "font-display"}`}>
            {t("Dashboard", "ផ្ទាំងព័ត៌មាន")}
          </h1>
          <p className={`text-primary-foreground/75 mt-2 ${language === "kh" ? "font-khmer" : ""}`}>
            {t("Live summary of school needs and registrations.", "ព័ត៌មានសង្ខេបផ្ទាល់អំពីតម្រូវការ និងការចុះឈ្មោះសាលា។")}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-primary">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className={`text-muted-foreground ${language === "kh" ? "font-khmer" : ""}`}>
              {t("Loading dashboard...", "កំពុងផ្ទុកទិន្នន័យ...")}
            </p>
          </div>
        ) : (
          <>
            {/* ── Weekly Recap ── */}
            <WeeklyRecap />

            {/* ── Metric Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={metricClass}>
                <div className={`${iconWrap} bg-blue-100`}>
                  <School className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className={`text-3xl font-bold text-foreground`}>{schools?.length ?? 0}</p>
                  <p className={`text-sm text-muted-foreground mt-1 ${language === "kh" ? "font-khmer leading-loose" : ""}`}>
                    {t("Total Schools Registered", "សាលារៀនដែលបានចុះឈ្មោះសរុប")}
                  </p>
                </div>
              </div>

              <div className={metricClass}>
                <div className={`${iconWrap} bg-green-100`}>
                  <ListChecks className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{activeNeeds.length}</p>
                  <p className={`text-sm text-muted-foreground mt-1 ${language === "kh" ? "font-khmer leading-loose" : ""}`}>
                    {t("Total Active Needs", "តម្រូវការសរុប")}
                  </p>
                </div>
              </div>

              <div className={metricClass}>
                <div className={`${iconWrap} bg-amber-100`}>
                  <DollarSign className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    ${totalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </p>
                  <p className={`text-sm text-muted-foreground mt-1 ${language === "kh" ? "font-khmer leading-loose" : ""}`}>
                    {t("Estimated Total Value Needed", "តម្លៃប៉ាន់ស្មានសរុប ($)")}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Province Needs Map ── */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-border flex items-center gap-3"
                style={{ background: "linear-gradient(90deg,#1E3A5F,#2563EB)" }}>
                <Map className="w-5 h-5 text-white flex-shrink-0" />
                <div>
                  <h2 className={`text-lg font-bold text-white ${language === "kh" ? "font-khmer" : ""}`}>
                    {t("Province Needs Map", "ផែនទីតម្រូវការតាមខេត្ត")}
                  </h2>
                  <p className={`text-blue-200 text-xs mt-0.5 ${language === "kh" ? "font-khmer" : ""}`}>
                    {t("All 25 provinces — active resource requests by category", "ខេត្ត ២៥ — សំណើធនធានដោយប្រភេទ")}
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className={`text-left px-4 py-3 font-bold text-foreground sticky left-0 bg-muted/50 z-10 min-w-[160px] ${language === "kh" ? "font-khmer" : ""}`}>
                        {t("Province", "ខេត្ត")}
                      </th>
                      {MAP_CATEGORIES.map(cat => (
                        <th key={cat.key} className="px-3 py-3 text-center whitespace-nowrap">
                          <div className="flex flex-col items-center gap-1">
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                              style={{ background: cat.color }}
                            >
                              {language === "kh" ? cat.kh : cat.en}
                            </span>
                          </div>
                        </th>
                      ))}
                      <th className={`px-4 py-3 text-center font-bold text-foreground ${language === "kh" ? "font-khmer" : ""}`}>
                        {t("Total", "សរុប")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ALL_PROVINCES.map((province, i) => {
                      const row = provinceMatrix[province] ?? {};
                      const rowTotal = Object.values(row).reduce((s, c) => s + c, 0);
                      const displayName = language === "kh" ? (PROVINCE_KH[province] ?? province) : province;
                      return (
                        <tr
                          key={province}
                          className={`border-b border-border transition-colors hover:bg-primary/5 ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                        >
                          <td className={`px-4 py-2.5 font-semibold text-foreground sticky left-0 z-10 ${i % 2 === 0 ? "bg-background" : "bg-muted/20"} ${language === "kh" ? "font-khmer text-xs" : "text-xs"}`}>
                            {displayName}
                          </td>
                          {MAP_CATEGORIES.map(cat => {
                            const count = row[cat.key] ?? 0;
                            return (
                              <td key={cat.key} className="px-3 py-2.5 text-center">
                                {count > 0 ? (
                                  <span
                                    className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold text-white shadow-sm"
                                    style={{ background: cat.color }}
                                  >
                                    {count}
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground/30 text-xs">—</span>
                                )}
                              </td>
                            );
                          })}
                          <td className="px-4 py-2.5 text-center">
                            {rowTotal > 0 ? (
                              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg text-xs font-bold text-primary bg-primary/10">
                                {rowTotal}
                              </span>
                            ) : (
                              <span className="text-muted-foreground/30 text-xs">0</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-primary/20 bg-primary/5">
                      <td className={`px-4 py-3 font-bold text-foreground sticky left-0 bg-primary/5 z-10 ${language === "kh" ? "font-khmer" : ""}`}>
                        {t("TOTAL", "សរុបទាំងអស់")}
                      </td>
                      {MAP_CATEGORIES.map(cat => {
                        const colTotal = ALL_PROVINCES.reduce((s, p) => s + (provinceMatrix[p]?.[cat.key] ?? 0), 0);
                        return (
                          <td key={cat.key} className="px-3 py-3 text-center">
                            <span className="text-xs font-bold text-foreground">{colTotal || "—"}</span>
                          </td>
                        );
                      })}
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-bold text-primary">{activeNeeds.length}</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* ── Charts row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Pie — Needs by Category */}
              <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                <h2 className={`text-lg font-bold text-foreground mb-6 ${language === "kh" ? "font-khmer" : ""}`}>
                  {t("Needs by Category", "តម្រូវការតាមប្រភេទ")}
                </h2>
                {categoryData.length === 0 ? (
                  <p className={`text-center text-muted-foreground py-16 ${language === "kh" ? "font-khmer" : ""}`}>
                    {t("No data yet.", "មិនទាន់មានទិន្នន័យ។")}
                  </p>
                ) : (
                  <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="45%"
                        outerRadius={100}
                        dataKey="value"
                        nameKey="name"
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {categoryData.map((_, i) => (
                          <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<PieTooltip language={language} />} />
                      <Legend
                        formatter={(value, entry) => {
                          const item = categoryData.find(c => c.name === value);
                          return (
                            <span className={language === "kh" ? "font-khmer text-sm" : "text-sm"}>
                              {language === "kh" ? (item?.kh ?? value) : value}
                            </span>
                          );
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Bar — Needs by Province */}
              <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                <h2 className={`text-lg font-bold text-foreground mb-1 ${language === "kh" ? "font-khmer" : ""}`}>
                  {t("Needs by Province", "តម្រូវការតាមខេត្ត")}
                </h2>
                <p className={`text-xs text-muted-foreground mb-5 ${language === "kh" ? "font-khmer" : ""}`}>
                  {t("Top 10 provinces", "១០ ខេត្តកំពូល")}
                </p>
                {provinceData.length === 0 ? (
                  <p className={`text-center text-muted-foreground py-16 ${language === "kh" ? "font-khmer" : ""}`}>
                    {t("No data yet.", "មិនទាន់មានទិន្នន័យ។")}
                  </p>
                ) : (
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart
                      data={provinceData}
                      margin={{ top: 4, right: 8, left: -16, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="province"
                        tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                        tickFormatter={(val) =>
                          language === "kh"
                            ? (PROVINCE_KH[val] ?? val).slice(0, 6)
                            : val.split(" ")[0]
                        }
                        angle={-40}
                        textAnchor="end"
                        interval={0}
                      />
                      <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      />
                      <Tooltip content={<BarTooltip language={language} />} />
                      <Bar dataKey="count" fill="#1A6EA8" radius={[6, 6, 0, 0]} maxBarSize={48} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
