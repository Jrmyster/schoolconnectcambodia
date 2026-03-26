import { useState } from "react";
import { useListNeeds, NeedCategory } from "@workspace/api-client-react";
import { NeedCard } from "@/components/NeedCard";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Loader2, Search, SearchX, Heart, SlidersHorizontal, Share2, Copy, Check } from "lucide-react";
import { SupportModal } from "@/components/SupportModal";

const SHARE_TITLE =
  "Check out School Connect Cambodia - Supporting rural education through tech.";

type SharePlatform = {
  name: string;
  bg: string;
  text?: string;
  buildUrl?: (url: string, title: string) => string;
  type?: "native" | "copy";
};

const SHARE_PLATFORMS: SharePlatform[] = [
  {
    name: "Reddit",
    bg: "#FF4500",
    buildUrl: (u, t) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}`,
  },
  {
    name: "Facebook",
    bg: "#1877F2",
    buildUrl: (u) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
  },
  {
    name: "Twitter / X",
    bg: "#000000",
    buildUrl: (u, t) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}`,
  },
  {
    name: "Threads",
    bg: "#101010",
    buildUrl: (u, t) =>
      `https://www.threads.net/intent/post?text=${encodeURIComponent(t + " " + u)}`,
  },
  {
    name: "LinkedIn",
    bg: "#0A66C2",
    buildUrl: (u) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`,
  },
  {
    name: "WhatsApp",
    bg: "#25D366",
    buildUrl: (u, t) =>
      `https://wa.me/?text=${encodeURIComponent(t + " " + u)}`,
  },
  {
    name: "Telegram",
    bg: "#2AABEE",
    buildUrl: (u, t) =>
      `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
  },
  {
    name: "Pinterest",
    bg: "#E60023",
    buildUrl: (u, t) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(u)}&description=${encodeURIComponent(t)}`,
  },
  {
    name: "Weibo",
    bg: "#E6162D",
    buildUrl: (u, t) =>
      `https://service.weibo.com/share/share.php?url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}`,
  },
  // Platforms with no standard web share URL — use Web Share API or clipboard
  { name: "Instagram",  bg: "#E1306C", type: "native" },
  { name: "TikTok",     bg: "#010101", type: "native" },
  { name: "Snapchat",   bg: "#FFFC00", text: "#000000", type: "copy" },
  { name: "WeChat",     bg: "#07C160", type: "copy" },
  { name: "ByteDance",  bg: "#1F1F1F", type: "copy" },
];

const PROVINCE_OPTIONS: { value: string; en: string; kh: string }[] = [
  { value: "Banteay Meanchey", en: "Banteay Meanchey", kh: "បន្ទាយមានជ័យ" },
  { value: "Battambang",       en: "Battambang",       kh: "បាត់ដំបង" },
  { value: "Kampong Cham",     en: "Kampong Cham",     kh: "កំពង់ចាម" },
  { value: "Kampong Chhnang",  en: "Kampong Chhnang",  kh: "កំពង់ឆ្នាំង" },
  { value: "Kampong Speu",     en: "Kampong Speu",     kh: "កំពង់ស្ពឺ" },
  { value: "Kampong Thom",     en: "Kampong Thom",     kh: "កំពង់ធំ" },
  { value: "Kampot",           en: "Kampot",           kh: "កំពត" },
  { value: "Kandal",           en: "Kandal",           kh: "កណ្តាល" },
  { value: "Kep",              en: "Kep",              kh: "កែប" },
  { value: "Koh Kong",         en: "Koh Kong",         kh: "កោះកុង" },
  { value: "Kratié",           en: "Kratie",           kh: "ក្រចេះ" },
  { value: "Mondulkiri",       en: "Mondulkiri",       kh: "មណ្ឌលគីរី" },
  { value: "Oddar Meanchey",   en: "Oddar Meanchey",   kh: "ឧត្តរមានជ័យ" },
  { value: "Pailin",           en: "Pailin",           kh: "ប៉ៃលិន" },
  { value: "Phnom Penh",       en: "Phnom Penh",       kh: "ភ្នំពេញ" },
  { value: "Preah Sihanouk",   en: "Preah Sihanouk",   kh: "ព្រះសីហនុ" },
  { value: "Preah Vihear",     en: "Preah Vihear",     kh: "ព្រះវិហារ" },
  { value: "Prey Veng",        en: "Prey Veng",        kh: "ព្រៃវែង" },
  { value: "Pursat",           en: "Pursat",           kh: "ពោធិ៍សាត់" },
  { value: "Ratanakiri",       en: "Ratanakiri",       kh: "រតនគីរី" },
  { value: "Siem Reap",        en: "Siem Reap",        kh: "សៀមរាប" },
  { value: "Stung Treng",      en: "Stung Treng",      kh: "ស្ទឹងត្រែង" },
  { value: "Svay Rieng",       en: "Svay Rieng",       kh: "ស្វាយរៀង" },
  { value: "Takéo",            en: "Takeo",            kh: "តាកែវ" },
  { value: "Tboung Khmum",     en: "Tboung Khmum",     kh: "ត្បូងឃ្មុំ" },
];

const CATEGORY_OPTIONS: { value: string; en: string; kh: string }[] = [
  { value: "Electronics",      en: "Electronics & Tech",         kh: "គ្រឿងអេឡិចត្រូនិក និងបច្ចេកវិទ្យា" },
  { value: "Books",            en: "Books & Stationery",          kh: "សៀវភៅ និងសម្ភារៈសិក្សា" },
  { value: "Furniture",        en: "Furniture",                   kh: "គ្រឿងសង្ហារឹម" },
  { value: "Infrastructure",   en: "Infrastructure & Repair",     kh: "ហេដ្ឋារចនាសម្ព័ន្ធ និងការជួសជុល" },
  { value: "WASH",             en: "Water & Sanitation (WASH)",   kh: "ទឹកស្អាត និងអនាម័យ" },
  { value: "Sports",           en: "Sports & Arts",               kh: "កីឡា និងសិល្បៈ" },
  { value: "Teacher Training", en: "Teacher Training",            kh: "ការបណ្តុះបណ្តាលគ្រូ" },
  { value: "Other",            en: "Other",                       kh: "ផ្សេងៗ" },
];

const selectClass =
  "w-full bg-background border-2 border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer";

export function BrowseNeeds() {
  const t = useTranslation();
  const { language } = useLanguageStore();

  const [province, setProvince] = useState<string>("");
  const [category, setCategory] = useState<NeedCategory | "">("");
  const [search, setSearch] = useState<string>("");
  const [supportOpen, setSupportOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleShare = (platform: SharePlatform) => {
    const url = window.location.origin;
    if (platform.buildUrl) {
      window.open(platform.buildUrl(url, SHARE_TITLE), "_blank", "noopener,noreferrer");
      return;
    }
    // Platforms without a web share URL: try Web Share API first (mobile), else clipboard
    if (platform.type === "native" && navigator.share) {
      navigator.share({ title: SHARE_TITLE, url }).catch(() => {});
      return;
    }
    navigator.clipboard.writeText(`${SHARE_TITLE}: ${url}`).then(() => {
      setCopied(platform.name);
      setTimeout(() => setCopied(null), 3000);
    });
  };

  const { data: needs, isLoading } = useListNeeds({
    province: province || undefined,
    category: (category as NeedCategory) || undefined,
  });

  const activeNeeds = (needs?.filter(n => n.status === "active" || n.status === "funded") || [])
    .filter(n => {
      if (!search.trim()) return true;
      const q = search.trim().toLowerCase();
      const schoolEn = (n.school?.nameEn ?? "").toLowerCase();
      const schoolKh = (n.school?.nameKh ?? "").toLowerCase();
      return schoolEn.includes(q) || schoolKh.includes(q);
    });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${language === "kh" ? "font-khmer" : "font-display"}`}>
            {t("Browse School Needs", "ស្វែងរកតម្រូវការសាលា")}
          </h1>
          <p className={`text-lg text-primary-foreground/80 max-w-2xl ${language === "kh" ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Find a project that speaks to you. Every donation makes a direct impact on a student's education.",
              "ស្វែងរកគម្រោងដែលអ្នកចាប់អារម្មណ៍។ រាល់ការបរិច្ចាគធ្វើឱ្យមានផលប៉ះពាល់ផ្ទាល់ដល់ការអប់រំរបស់សិស្ស។"
            )}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Filter Bar ── */}
        <div className="bg-card rounded-2xl shadow-md border border-border p-4 mb-8">
          {/* Label row */}
          <div className="flex items-center gap-2 mb-3 px-1">
            <SlidersHorizontal className="w-4 h-4 text-primary flex-shrink-0" />
            <span className={`text-sm font-semibold text-foreground ${language === "kh" ? "font-khmer text-base" : ""}`}>
              {t("Filter by:", "ស្វែងរកតាម៖")}
            </span>
          </div>

          {/* Controls — stack on mobile, row on md+ */}
          <div className="flex flex-col md:flex-row gap-3">
            {/* Category */}
            <select
              className={selectClass}
              value={category}
              onChange={(e) => setCategory(e.target.value as NeedCategory)}
            >
              <option value="">{t("All Categories", "គ្រប់ប្រភេទ")}</option>
              {CATEGORY_OPTIONS.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {language === "kh" ? cat.kh : cat.en}
                </option>
              ))}
            </select>

            {/* Province */}
            <select
              className={selectClass}
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              <option value="">{t("All Provinces", "គ្រប់ខេត្ត")}</option>
              {PROVINCE_OPTIONS.map(p => (
                <option key={p.value} value={p.value}>
                  {language === "kh" ? p.kh : p.en}
                </option>
              ))}
            </select>

            {/* School name search */}
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("Search school name...", "ស្វែងរកឈ្មោះសាលា...")}
                className={`w-full bg-background border-2 border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all ${language === "kh" ? "font-khmer" : ""}`}
              />
            </div>
          </div>
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
            <h3 className={`text-2xl font-bold text-foreground mb-2 ${language === "kh" ? "font-khmer" : "font-display"}`}>
              {t("No needs found matching your search.", "មិនឃើញមានតម្រូវការដែលអ្នកស្វែងរកទេ។")}
            </h3>
            <p className={`text-muted-foreground max-w-md ${language === "kh" ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Try adjusting your filters or clearing the search field.",
                "សូមព្យាយាមកែសម្រួលតម្រង ឬលុបពាក្យស្វែងរករបស់អ្នក។"
              )}
            </p>
          </div>
        )}
      </div>

      {/* Support Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-8">
        <div className="border-t border-border pt-12 text-center">

          {/* About the Mission */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h2 className={`text-2xl font-bold text-foreground mb-3 ${language === "kh" ? "font-khmer" : "font-display"}`}>
            {t("About the Mission", "អំពីបេសកកម្ម")}
          </h2>
          <p className={`text-muted-foreground leading-relaxed max-w-xl mx-auto mb-12 ${language === "kh" ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Chouy Sala connects rural Cambodian high schools directly with donors and NGOs — with full transparency on where every contribution goes.",
              "ជួយសាលាភ្ជាប់វិទ្យាល័យជនបទកម្ពុជាដោយផ្ទាល់ជាមួយអ្នកបរិច្ចាគ និងអង្គការ NGO ដោយមានតម្លាភាពពេញលេញអំពីទិសដៅនៃការចូលរួមចំណែករបស់គ្នា។"
            )}
          </p>

          {/* Ways to Give */}
          <h3 className={`text-xl font-bold text-foreground mb-6 ${language === "kh" ? "font-khmer" : "font-display"}`}>
            {t("Ways to Give", "វិធីសាស្ត្របរិច្ចាគ")}
          </h3>

          <div className="bg-gradient-to-br from-primary/5 to-sky-50/60 border border-primary/20 rounded-3xl p-8 flex flex-col items-center gap-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Heart className="w-7 h-7 text-primary fill-primary/20" />
            </div>
            <div>
              <p className={`text-base font-semibold text-foreground mb-1 ${language === "kh" ? "font-khmer" : ""}`}>
                {t(
                  "100% of contributions fund hosting and digital resources for rural Cambodian schools.",
                  "ការចូលរួម ១០០% ផ្ដល់មូលនិធិសម្រាប់ម៉ាស៊ីនបម្រើ និងធនធានឌីជីថលសម្រាប់សាលារៀននៅជនបទ។"
                )}
              </p>
              <p className={`text-sm text-muted-foreground ${language === "kh" ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Donate locally via KHQR or internationally via Ko-fi.",
                  "បរិច្ចាគក្នុងស្រុកតាម KHQR ឬអន្តរជាតិតាម Ko-fi។"
                )}
              </p>
            </div>
            <button
              onClick={() => setSupportOpen(true)}
              className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-bold shadow-md hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg transition-all active:scale-95 ${language === "kh" ? "font-khmer text-base" : "text-sm"}`}
            >
              <Heart className="w-4 h-4 fill-white/70" />
              {t("Support Our Mission", "គាំទ្របេសកកម្មរបស់យើង")}
            </button>
          </div>

          {supportOpen && <SupportModal onClose={() => setSupportOpen(false)} />}

          {/* Spread the Word */}
          <div className="mt-12 pt-10 border-t border-border">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Share2 className="w-5 h-5 text-primary" />
              <h3 className={`text-xl font-bold text-foreground ${language === "kh" ? "font-khmer" : "font-display"}`}>
                {t("Spread the Word", "ចែករំលែកព័ត៌មាន")}
              </h3>
            </div>
            <p className={`text-sm text-muted-foreground mb-6 max-w-md mx-auto ${language === "kh" ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Share this platform with teachers, NGOs, and communities who can help rural Cambodian schools.",
                "ចែករំលែកវេទិកានេះជាមួយគ្រូ អង្គការ NGO និងសហគមន៍ ដែលអាចជួយសាលារៀននៅជនបទកម្ពុជា។"
              )}
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {SHARE_PLATFORMS.map(p => (
                <button
                  key={p.name}
                  onClick={() => handleShare(p)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all active:scale-95"
                  style={{ backgroundColor: p.bg, color: p.text ?? "#ffffff" }}
                  title={
                    p.buildUrl
                      ? `Share on ${p.name}`
                      : `Copy link for ${p.name}`
                  }
                >
                  {p.name === copied ? (
                    <Check className="w-3 h-3 flex-shrink-0" />
                  ) : !p.buildUrl ? (
                    <Copy className="w-3 h-3 flex-shrink-0 opacity-70" />
                  ) : null}
                  {p.name}
                </button>
              ))}
            </div>

            {copied && (
              <p className="mt-4 text-xs text-green-600 font-medium flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {t(
                  `Link copied! Paste it into ${copied}.`,
                  `តំណភ្ជាប់ត្រូវបានចម្លង! បិទភ្ជាប់វានៅក្នុង ${copied}។`
                )}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
