import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeId =
  | "default"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "violet";

export interface ThemeDef {
  id: ThemeId;
  labelEn: string;
  labelKh: string;
  swatch: string;
  bg: string;
  text: string;
}

export const THEMES: ThemeDef[] = [
  { id: "default", labelEn: "Default",  labelKh: "ពណ៌ដើម",  swatch: "#1A6EA8", bg: "",        text: "" },
  { id: "red",     labelEn: "Soft Red",    labelKh: "ក្រហមស្រាល",   swatch: "#FECDD3", bg: "#FFE4E6", text: "#1f2937" },
  { id: "orange",  labelEn: "Soft Orange", labelKh: "ទឹកក្រូចស្រាល", swatch: "#FED7AA", bg: "#FFEDD5", text: "#1f2937" },
  { id: "yellow",  labelEn: "Pale Yellow", labelKh: "លឿងស្រាល",     swatch: "#FEF08A", bg: "#FEF9C3", text: "#1f2937" },
  { id: "green",   labelEn: "Soft Mint",   labelKh: "បៃតងស្រាល",    swatch: "#BBF7D0", bg: "#DCFCE7", text: "#1f2937" },
  { id: "blue",    labelEn: "Baby Blue",   labelKh: "ខៀវស្រាល",     swatch: "#BFDBFE", bg: "#DBEAFE", text: "#1f2937" },
  { id: "indigo",  labelEn: "Soft Indigo", labelKh: "ខៀវចាស់ស្រាល",  swatch: "#C7D2FE", bg: "#E0E7FF", text: "#1f2937" },
  { id: "violet",  labelEn: "Soft Violet", labelKh: "ស្វាយស្រាល",   swatch: "#DDD6FE", bg: "#EDE9FE", text: "#1f2937" },
];

interface ThemeState {
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeId: "default",
      setTheme: (id) => set({ themeId: id }),
    }),
    { name: "chuy-sala-theme" },
  ),
);

export function getTheme(id: ThemeId): ThemeDef {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
