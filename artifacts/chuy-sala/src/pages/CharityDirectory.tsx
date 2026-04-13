import { ComponentType } from "react";
import { ExternalLink, Users, ShoppingBag, Truck, LayoutGrid, Tag, TrendingUp } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Charity = {
  name: string;
  nameKh: string;
  descEn: string;
  descKh: string;
  url: string;
  accent: string;
};

const CHARITIES: Charity[] = [
  {
    name: "EYC",
    nameKh: "EYC — សហគ្រិនសម្រាប់យុវវ័យកម្ពុជា",
    descEn: "Empowers Cambodian youth through entrepreneurship training and community leadership programs.",
    descKh: "ជំរុញយុវវ័យកម្ពុជាតាមរយៈការបណ្តុះបណ្តាលសហគ្រិន និងកម្មវិធីភាពជាអ្នកដឹកនាំសហគមន៍។",
    url: "https://eycambodia.org/",
    accent: "from-[#1A6EA8] to-[#2196F3]",
  },
  {
    name: "Save the Children",
    nameKh: "Save the Children — ការពារកុមារ",
    descEn: "Delivers education, health, and child protection programs to vulnerable children across Cambodia.",
    descKh: "ផ្តល់កម្មវិធីអប់រំ សុខភាព និងការការពារកុមារដល់កុមារងាយរងគ្រោះទូទាំងប្រទេសកម្ពុជា។",
    url: "https://cambodia.savethechildren.net/",
    accent: "from-[#E00025] to-[#ff4d6d]",
  },
  {
    name: "CCT",
    nameKh: "CCT — កុមារនៃថ្ងៃស្អែករបស់កម្ពុជា",
    descEn: "Supports access to quality education and social services for underprivileged children and families.",
    descKh: "គាំទ្រការទទួលបានការអប់រំប្រកបដោយគុណភាព និងសេវាសង្គមដល់កុមារ និងគ្រួសារដែលទទួលរងការខ្វះខាត។",
    url: "https://cambodianchildrenstrust.org/",
    accent: "from-[#F59E0B] to-[#FBBF24]",
  },
  {
    name: "PEPY",
    nameKh: "PEPY — ផ្តល់អំណាចដល់យុវវ័យ",
    descEn: "Builds leadership skills and educational opportunities for youth in rural Cambodian communities.",
    descKh: "បង្កើតជំនាញភាពជាអ្នកដឹកនាំ និងឱកាសសិក្សាដល់យុវវ័យនៅសហគមន៍ជនបទកម្ពុជា។",
    url: "https://www.pepyempoweringyouth.org/",
    accent: "from-[#059669] to-[#10B981]",
  },
  {
    name: "Sipar",
    nameKh: "Sipar — បណ្ណាល័យ និងការអាន",
    descEn: "Promotes reading culture and library development to strengthen literacy for Cambodian children.",
    descKh: "លើកកម្ពស់វប្បធម៌ការអាន និងការអភិវឌ្ឍបណ្ណាល័យដើម្បីពង្រឹងការអានសម្រាប់កុមារខ្មែរ។",
    url: "https://sipar.org/en/",
    accent: "from-[#7C3AED] to-[#8B5CF6]",
  },
  {
    name: "Friends-International",
    nameKh: "Friends-International — មិត្តអន្តរជាតិ",
    descEn: "Supports street-connected children through education, skills training, and family reintegration.",
    descKh: "គាំទ្រកុមារ និងយុវវ័យតាមដងផ្លូវ តាមរយៈការអប់រំ ការបណ្តុះបណ្តាលជំនាញ និងការបញ្ចូលក្នុងគ្រួសារ។",
    url: "https://friends-international.org/",
    accent: "from-[#DB2777] to-[#EC4899]",
  },
  {
    name: "CYN",
    nameKh: "CYN — បណ្តាញយុវវ័យកម្ពុជា",
    descEn: "Connects and empowers Cambodia's youth networks to drive positive social change nationwide.",
    descKh: "ភ្ជាប់ និងលើកកម្ពស់បណ្តាញយុវវ័យកម្ពុជា ដើម្បីជំរុញការផ្លាស់ប្តូរសង្គមវិជ្ជមាននៅទូទាំងប្រទេស។",
    url: "https://cyncambodia.org/",
    accent: "from-[#0284C7] to-[#38BDF8]",
  },
  {
    name: "Helping Hands",
    nameKh: "Helping Hands — ដៃជួយ",
    descEn: "Provides humanitarian aid, educational resources, and community development support to rural families.",
    descKh: "ផ្តល់ជំនួយមនុស្សធម៌ ធនធានអប់រំ និងការគាំទ្រការអភិវឌ្ឍសហគមន៍ដល់គ្រួសារជនបទ។",
    url: "https://www.globalteer.org/helpinghands/",
    accent: "from-[#D97706] to-[#F59E0B]",
  },
  {
    name: "Teach for Cambodia",
    nameKh: "Teach for Cambodia — បង្រៀនដើម្បីកម្ពុជា",
    descEn: "Places top graduates in underserved schools to expand educational access and inspire future leaders.",
    descKh: "ដាក់ប្រឡូកបញ្ញវន្តកំពូលនៅសាលាដែលខ្វះខាតធនធាន ដើម្បីពង្រីកការទទួលបានការអប់រំ និងបំផុសសុបិននៃអ្នកដឹកនាំនៃអនាគត។",
    url: "https://teachforcambodia.org/",
    accent: "from-[#1A6EA8] to-[#059669]",
  },
  {
    name: "Don Bosco",
    nameKh: "Don Bosco — ការបណ្តុះបណ្តាលវិជ្ជាជីវៈ",
    descEn: "Offers vocational training and technical education to youth, preparing them for dignified employment.",
    descKh: "ផ្តល់ការបណ្តុះបណ្តាលវិជ្ជាជីវៈ និងការអប់រំបច្ចេកទេសដល់យុវវ័យ ដើម្បីរៀបចំពួកគេសម្រាប់ការងារមានតម្លៃ។",
    url: "https://www.donboscokh.org/",
    accent: "from-[#B45309] to-[#D97706]",
  },
];

type Platform = {
  name: string;
  nameKh: string;
  descEn: string;
  descKh: string;
  url: string;
  accent: string;
  icon: ComponentType<{ className?: string }>;
};

const PLATFORMS: Platform[] = [
  {
    name: "L192",
    nameKh: "L192 — ដឹកជញ្ជូន និងផ្សារ",
    descEn: "Cambodia's leading delivery and logistics marketplace connecting buyers with local vendors across the country.",
    descKh: "ទីផ្សារដឹកជញ្ជូន និងភស្តុភារឈានមុខគេរបស់កម្ពុជា ភ្ជាប់អ្នកទិញជាមួយអ្នកលក់ក្នុងស្រុកទូទាំងប្រទេស។",
    url: "https://www.l192.com/",
    accent: "from-[#E05C00] to-[#F97316]",
    icon: Truck,
  },
  {
    name: "Khmer24",
    nameKh: "Khmer24 — ផ្សារបោះដូចប្រែ",
    descEn: "Cambodia's largest online classifieds and marketplace for goods, vehicles, property, and services.",
    descKh: "ទីផ្សារ និងការផ្សព្វផ្សាយតាមអ៊ីនធឺណិតធំបំផុតរបស់កម្ពុជា សម្រាប់ទំនិញ យានយន្ត អចលនទ្រព្យ និងសេវាកម្ម។",
    url: "https://www.khmer24.com/",
    accent: "from-[#059669] to-[#34D399]",
    icon: LayoutGrid,
  },
  {
    name: "E-GetS",
    nameKh: "E-GetS — ផ្សារអ៊ីនធឺណិត",
    descEn: "A growing Cambodian e-commerce platform offering a wide range of products from local sellers and brands.",
    descKh: "វេទិកាពាណិជ្ជកម្មឌីជីថលកម្ពុជាដែលកំពុងរីកចម្រើន ផ្តល់ជម្រើសផលិតផលចម្រុះពីអ្នកលក់ និងម៉ាកក្នុងស្រុក។",
    url: "https://www.egets.com.kh/",
    accent: "from-[#4F46E5] to-[#818CF8]",
    icon: ShoppingBag,
  },
  {
    name: "Sabbay",
    nameKh: "Sabbay — ទំនិញសប្បាយ",
    descEn: "A community-driven Cambodian shopping platform celebrating local crafts, fashion, and lifestyle products.",
    descKh: "វេទិកាទិញទំនិញតាមសហគមន៍ខ្មែរ លើកកម្ពស់សិល្បៈ ម៉ូដ និងផលិតផលរបៀបរស់នៅក្នុងស្រុក។",
    url: "https://www.sabbay.com/",
    accent: "from-[#9333EA] to-[#C084FC]",
    icon: Tag,
  },
];

export function CharityDirectory() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-primary via-primary/90 to-[#032EA1] text-white overflow-hidden">
        {/* Cambodian flag color bar at very top */}
        <div className="flex h-2">
          <div className="flex-1 bg-[#032EA1]" />
          <div className="flex-1 bg-[#E00025]" />
          <div className="flex-1 bg-[#032EA1]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-5 py-2 mb-6 text-sm font-semibold backdrop-blur-sm">
            <Users className="w-4 h-4" />
            {t("Partner Network", "បណ្តាញដៃគូ")}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">
            {t("Youth & Children Charity Partners", "ដៃគូសប្បុរសធម៌យុវជន និងកុមារ")}
          </h1>
          <p className={`text-white/75 max-w-2xl mx-auto mt-4 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : "text-base"}`}>
            {t(
              "These trusted organisations work alongside Chouy Sala to improve education, wellbeing, and opportunity for Cambodia's children.",
              "អង្គការដែលទុកចិត្តទាំងនេះធ្វើការជាមួយ Chouy Sala ដើម្បីបង្កើនការអប់រំ សុខុមាលភាព និងឱកាសសម្រាប់កុមារកម្ពុជា។"
            )}
          </p>
        </div>

        {/* decorative bottom wave */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="hsl(var(--background))" />
        </svg>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHARITIES.map((c) => (
            <div
              key={c.name}
              className="group flex flex-col bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden"
            >
              {/* Accent bar */}
              <div className={`h-1.5 bg-gradient-to-r ${c.accent}`} />

              <div className="flex flex-col flex-1 p-6 gap-4">
                {/* Name */}
                <div>
                  <h3 className={`font-bold text-foreground leading-tight ${kh ? "font-khmer text-base" : "font-display text-lg"}`}>
                    {kh ? c.nameKh : c.name}
                  </h3>
                </div>

                {/* Description */}
                <p className={`text-muted-foreground flex-1 leading-relaxed ${kh ? "font-khmer text-sm leading-loose" : "text-sm"}`}>
                  {kh ? c.descKh : c.descEn}
                </p>

                {/* Button */}
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r ${c.accent} text-white font-bold hover:opacity-90 hover:shadow-md active:scale-95 transition-all ${kh ? "font-khmer text-base" : "text-sm"}`}
                >
                  {t("Visit Website", "ចូលទស្សនាគេហទំព័រ")}
                  <ExternalLink className="w-3.5 h-3.5 opacity-80 flex-shrink-0" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className={`text-center text-xs text-muted-foreground/60 mt-12 ${kh ? "font-khmer" : ""}`}>
          {t(
            "Listings are for informational purposes. Chouy Sala does not formally endorse any individual organisation.",
            "បញ្ជីនេះមានគោលបំណងផ្តល់ព័ត៌មានប៉ុណ្ណោះ។ Chouy Sala មិនគាំទ្រផ្លូវការចំពោះអង្គការណាមួយឡើយ។"
          )}
        </p>
      </div>

      {/* ── Support the Economy section ── */}
      <div className="border-t border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

          {/* Section heading */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-5 py-2 mb-5 text-sm font-semibold text-emerald-700">
              <TrendingUp className="w-4 h-4" />
              {t("Support the Economy", "គាំទ្រសេដ្ឋកិច្ច")}
            </div>
            <h2 className={`font-display font-bold text-foreground leading-tight ${kh ? "font-khmer text-xl leading-loose" : "text-2xl sm:text-3xl"}`}>
              {t(
                "Shop Local: Support Cambodian E-Commerce",
                "ទិញទំនិញក្នុងស្រុក៖ គាំទ្រពាណិជ្ជកម្មតាមប្រព័ន្ធឌីជីថលនៅកម្ពុជា"
              )}
            </h2>
          </div>

          {/* Platform cards — 2-col on sm, 4-col on lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLATFORMS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className="group flex flex-col bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden"
                >
                  {/* Accent bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${p.accent}`} />

                  <div className="flex flex-col flex-1 p-6 gap-4">
                    {/* Icon + Name */}
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`font-bold text-foreground leading-tight pt-1 ${kh ? "font-khmer text-base" : "font-display text-lg"}`}>
                        {kh ? p.nameKh : p.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className={`text-muted-foreground flex-1 leading-relaxed ${kh ? "font-khmer text-sm leading-loose" : "text-sm"}`}>
                      {kh ? p.descKh : p.descEn}
                    </p>

                    {/* Button */}
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-auto flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r ${p.accent} text-white font-bold hover:opacity-90 hover:shadow-md active:scale-95 transition-all ${kh ? "font-khmer text-base" : "text-sm"}`}
                    >
                      {t("Visit Store", "ចូលកាន់ហាង")}
                      <ExternalLink className="w-3.5 h-3.5 opacity-80 flex-shrink-0" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Economic tip */}
          <div className="mt-10 flex items-start gap-3 max-w-2xl mx-auto bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-4">
            <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className={`text-emerald-800 text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Buying from local platforms helps build digital infrastructure for all Cambodians.",
                "ការទិញពីគេហទំព័រក្នុងស្រុក ជួយកសាងហេដ្ឋារចនាសម្ព័ន្ធឌីជីថលសម្រាប់ប្រជាជនកម្ពុជាទាំងអស់។"
              )}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
