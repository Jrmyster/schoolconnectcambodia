import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "en" | "kh";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () =>
        set((state) => ({ language: state.language === "en" ? "kh" : "en" })),
    }),
    {
      name: "chuy-sala-language",
    }
  )
);

export function useTranslation() {
  const language = useLanguageStore((s) => s.language);
  
  return function t(en: string, kh: string | null | undefined): string {
    if (language === "kh" && kh) {
      return kh;
    }
    return en;
  };
}
