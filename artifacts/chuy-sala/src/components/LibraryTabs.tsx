import { useState } from "react";
import { Library, Sparkles, ScrollText } from "lucide-react";
import { FoundationalLibrarySection } from "@/components/FoundationalLibrarySection";
import { ImaginativeWorldsSection } from "@/components/ImaginativeWorldsSection";
import { KhmerLiteratureSection } from "@/components/KhmerLiteratureSection";

type TabKey = "foundational" | "imaginative" | "khmer";

type Props = {
  kh: boolean;
  t: (en: string, kh: string) => string;
};

/**
 * Tab toggle that lets students switch between three curated libraries:
 *   1. Foundational Library — 200+ classic non-fiction titles
 *   2. Imaginative Worlds — modern fiction (Sci-Fi / Fantasy / Teen)
 *   3. Khmer Literature — foundational Cambodian works
 *
 * Sits directly above each section's internal search bar.
 */
export function LibraryTabs({ kh, t }: Props) {
  const [tab, setTab] = useState<TabKey>("foundational");

  const tabs: {
    key: TabKey;
    en: string;
    kh: string;
    icon: React.ReactNode;
    activeClass: string;
  }[] = [
    {
      key: "foundational",
      en: "Foundational Library",
      kh: "បណ្ណាល័យមូលដ្ឋាន",
      icon: <Library className="w-4 h-4" />,
      activeClass: "bg-[#1A6EA8] text-white border-[#1A6EA8] shadow-md",
    },
    {
      key: "imaginative",
      en: "Imaginative Worlds",
      kh: "ពិភពរវើរវាយ",
      icon: <Sparkles className="w-4 h-4" />,
      activeClass: "bg-violet-600 text-white border-violet-600 shadow-md",
    },
    {
      key: "khmer",
      en: "Khmer Literature",
      kh: "អក្សរសិល្ប៍ខ្មែរ",
      icon: <ScrollText className="w-4 h-4" />,
      activeClass: "bg-amber-600 text-white border-amber-600 shadow-md",
    },
  ];

  return (
    <div data-testid="library-tabs-wrapper">
      {/* Tab toggle — sits ABOVE the search bar of whichever section is active.
          On mobile the three buttons stack vertically; from sm+ they share the
          row equally. */}
      <div
        role="tablist"
        aria-label={t("Library category", "ប្រភេទបណ្ណាល័យ")}
        className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4"
        data-testid="library-tab-toggle"
      >
        {tabs.map((tabDef) => {
          const active = tab === tabDef.key;
          return (
            <button
              key={tabDef.key}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`library-panel-${tabDef.key}`}
              data-testid={`library-tab-${tabDef.key}`}
              onClick={() => setTab(tabDef.key)}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all active:scale-[0.99] ${
                active
                  ? tabDef.activeClass
                  : "bg-white text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {tabDef.icon}
              <span className={kh ? "font-khmer" : ""}>{kh ? tabDef.kh : tabDef.en}</span>
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div
        id={`library-panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`library-tab-${tab}`}
      >
        {tab === "foundational" && <FoundationalLibrarySection kh={kh} t={t} />}
        {tab === "imaginative" && <ImaginativeWorldsSection kh={kh} t={t} />}
        {tab === "khmer" && <KhmerLiteratureSection kh={kh} t={t} />}
      </div>
    </div>
  );
}
