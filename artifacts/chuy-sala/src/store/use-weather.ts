import { create } from "zustand";

interface WeatherState {
  temperature: number | null;
  setTemperature: (t: number) => void;
}

export const useWeatherStore = create<WeatherState>()((set) => ({
  temperature: null,
  setTemperature: (t) => set({ temperature: t }),
}));
