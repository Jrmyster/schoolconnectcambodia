import { create } from "zustand";

type SubjectId = "science" | "math" | "lit" | "tech" | "art" | "social";

export interface TopPick {
  majorId: string;
  subjectLabelEn: string;
  subjectLabelKh: string;
  scoreRating: number;
}

interface CareerMatchState {
  preScores: Record<SubjectId, number> | null;
  autoTrigger: boolean;
  topPick: TopPick | null;

  setPreScores: (scores: Record<SubjectId, number>) => void;
  setAutoTrigger: (v: boolean) => void;
  setTopPick: (pick: TopPick) => void;
  clearAutoTrigger: () => void;
  clearAll: () => void;
}

export const useCareerMatchStore = create<CareerMatchState>((set) => ({
  preScores: null,
  autoTrigger: false,
  topPick: null,

  setPreScores: (scores) => set({ preScores: scores }),
  setAutoTrigger: (v) => set({ autoTrigger: v }),
  setTopPick: (pick) => set({ topPick: pick }),
  clearAutoTrigger: () => set({ autoTrigger: false, preScores: null }),
  clearAll: () => set({ preScores: null, autoTrigger: false, topPick: null }),
}));
