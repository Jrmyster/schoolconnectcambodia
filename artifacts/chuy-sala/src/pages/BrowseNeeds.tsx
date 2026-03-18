import { useState } from "react";
import { useListNeeds, useListProvinces, NeedCategory } from "@workspace/api-client-react";
import { NeedCard } from "@/components/NeedCard";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Loader2, Filter, SearchX } from "lucide-react";

export function BrowseNeeds() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  
  const [province, setProvince] = useState<string>("");
  const [category, setCategory] = useState<NeedCategory | "">("");
  
  const { data: provinces } = useListProvinces();
  
  const { data: needs, isLoading } = useListNeeds({
    province: province || undefined,
    category: (category as NeedCategory) || undefined,
  });

  const activeNeeds = needs?.filter(n => n.status === 'active' || n.status === 'funded') || [];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${language === 'kh' ? 'font-khmer' : 'font-display'}`}>
            {t("Browse School Needs", "ស្វែងរកតម្រូវការសាលា")}
          </h1>
          <p className={`text-lg text-primary-foreground/80 max-w-2xl ${language === 'kh' ? 'font-khmer' : ''}`}>
            {t("Find a project that speaks to you. Every donation makes a direct impact on a student's education.", "ស្វែងរកគម្រោងដែលអ្នកចាប់អារម្មណ៍។ រាល់ការបរិច្ចាគធ្វើឱ្យមានផលប៉ះពាល់ផ្ទាល់ដល់ការអប់រំរបស់សិស្ស។")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="bg-card rounded-2xl shadow-md border border-border p-4 mb-8 flex flex-col md:flex-row gap-4 items-center z-10 relative">
          <div className="flex items-center gap-2 text-foreground font-semibold px-2">
            <Filter className="w-5 h-5 text-primary" />
            <span className={language === 'kh' ? 'font-khmer' : ''}>{t("Filters:", "តម្រង:")}</span>
          </div>
          
          <select 
            className="w-full md:w-64 bg-background border-2 border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          >
            <option value="">{t("All Provinces", "គ្រប់ខេត្តទាំងអស់")}</option>
            {provinces?.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select 
            className="w-full md:w-64 bg-background border-2 border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value as NeedCategory)}
          >
            <option value="">{t("All Categories", "គ្រប់ប្រភេទទាំងអស់")}</option>
            {Object.values(NeedCategory).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-primary">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="font-medium text-muted-foreground">{t("Loading needs...", "កំពុងផ្ទុកតម្រូវការ...")}</p>
          </div>
        ) : activeNeeds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeNeeds.map(need => (
              <NeedCard key={need.id} need={need} />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-3xl border border-dashed border-border p-16 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <SearchX className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className={`text-2xl font-bold text-foreground mb-2 ${language === 'kh' ? 'font-khmer' : 'font-display'}`}>
              {t("No needs found", "រកមិនឃើញតម្រូវការទេ")}
            </h3>
            <p className="text-muted-foreground max-w-md">
              {t("Try adjusting your filters to see more results.", "សូមព្យាយាមកែសម្រួលតម្រងរបស់អ្នកដើម្បីមើលលទ្ធផលបន្ថែមទៀត។")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
