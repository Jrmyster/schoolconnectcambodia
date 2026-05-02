import { useState } from "react";
import { Library, Sparkles } from "lucide-react";
import { FoundationalLibrarySection } from "@/components/FoundationalLibrarySection";
import { ImaginativeWorldsSection } from "@/components/ImaginativeWorldsSection";

type TabKey = "foundational" | "imaginative";

type Props = {
  kh: boolean;
  t: (en: string, kh: string) => string;
};

/**
 * Tab toggle that lets students switch between the curated Foundational
 * Library and the modern Imaginative Worlds & Teen Fiction shelf. Sits
 * directly above each section's internal search bar.
 */
export function LibraryTabs({ kh, t }: Props) {
  const [tab, setTab] = useState<TabKey>("foundational");

  const tabs: { key: TabKey; en: string; kh: string; icon: React.ReactNode; activeClass: string }[] = [
    {
      key: "foundational",
      en: "Foundational Library",
      kh: "បណ្ណាល័យមូលដ្ឋាន",
      icon: <Library className="w-4 h-4" />,
      activeClass: "bg-[#1A6EA8] text-white border-[#1A6EA8] shadow-md",
    },
    {
      key: "imaginative",
      en: "Imaginative Worlds & Teen Fiction",
      kh: "ពិភពរវើរវាយ និង ប្រលោមលោកយុវវ័យ",
      icon: <Sparkles className="w-4 h-4" />,
      activeClass: "bg-violet-600 text-white border-violet-600 shadow-md",
    },
  ];

  return (
    <div data-testid="library-tabs-wrapper">
      {/* Tab toggle — sits ABOVE the search bar of whichever section is active */}
      <div
        role="tablist"
        aria-label={t("Library category", "ប្រភេទបណ្ណាល័យ")}
        className="flex flex-col sm:flex-row gap-2 mb-4"
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
              className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all active:scale-[0.99] ${
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
        {tab === "foundational" ? (
          <FoundationalLibrarySection kh={kh} t={t} />
        ) : (
          <ImaginativeWorldsSection kh={kh} t={t} />
        )}
      </div>
    </div>
  );
}
