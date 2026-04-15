import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { Wind, Search, MapPin, Loader2, RefreshCw, CloudRain, GraduationCap, X } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import { useWeatherStore } from "@/store/use-weather";

// ── Constants ────────────────────────────────────────────────────────────────

const PHNOM_PENH = { lat: 11.5564, lon: 104.9282, en: "Phnom Penh", kh: "ភ្នំពេញ" };

const KHMER_PLACES: Record<string, string> = {
  "Phnom Penh": "ភ្នំពេញ",
  "Siem Reap": "សៀមរាប",
  "Battambang": "បាត់ដំបង",
  "Sihanoukville": "ក្រុងព្រះសីហនុ",
  "Kampot": "កំពត",
  "Kampong Cham": "កំពង់ចាម",
  "Kampong Chhnang": "កំពង់ឆ្នាំង",
  "Kampong Speu": "កំពង់ស្ពឺ",
  "Kampong Thom": "កំពង់ធំ",
  "Kandal": "កណ្ដាល",
  "Koh Kong": "កោះកុង",
  "Kratié": "ក្រចេះ",
  "Kratie": "ក្រចេះ",
  "Mondulkiri": "មណ្ឌលគីរី",
  "Preah Vihear": "ព្រះវិហារ",
  "Prey Veng": "ព្រៃវែង",
  "Pursat": "ពោធិ៍សាត់",
  "Ratanakiri": "រតនគីរី",
  "Svay Rieng": "ស្វាយរៀង",
  "Takeo": "តាកែវ",
  "Oddar Meanchey": "ឧត្ដរមានជ័យ",
  "Kep": "កែប",
  "Pailin": "បៃលិន",
  "Tboung Khmum": "ត្បូងឃ្មុំ",
  "Stung Treng": "ស្ទឹងត្រែង",
  "Cambodia": "កម្ពុជា",
};

function toKhmerPlace(enName: string): string {
  for (const [key, val] of Object.entries(KHMER_PLACES)) {
    if (enName.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return enName;
}

// ── WMO weather code helpers ─────────────────────────────────────────────────

type ConditionType = "clear" | "cloudy" | "rain" | "storm" | "fog";

type Condition = {
  en: string;
  kh: string;
  icon: string;
  type: ConditionType;
};

function wmoToCondition(code: number): Condition {
  if (code === 0)              return { en: "Clear Sky",      kh: "មេឃស្រឡះ",      icon: "☀️",  type: "clear" };
  if (code <= 2)               return { en: "Partly Cloudy",  kh: "មេឃស្មើ",        icon: "⛅",  type: "cloudy" };
  if (code === 3)              return { en: "Overcast",        kh: "មេឃច្រើនពពក",   icon: "☁️",  type: "cloudy" };
  if (code <= 48)              return { en: "Foggy",           kh: "ចំណុះ",          icon: "🌫️", type: "fog" };
  if (code <= 55)              return { en: "Drizzle",         kh: "ភ្លៀងជ្រសៀ",    icon: "🌦️", type: "rain" };
  if (code <= 65)              return { en: "Rain",            kh: "ភ្លៀង",          icon: "🌧️", type: "rain" };
  if (code <= 75)              return { en: "Snow",            kh: "ព្រិល",          icon: "🌨️", type: "cloudy" };
  if (code <= 82)              return { en: "Rain Showers",    kh: "ភ្លៀងទទក",      icon: "🌩️", type: "rain" };
  if (code <= 84)              return { en: "Snow Showers",    kh: "ព្រិលជ្រសៀ",    icon: "🌨️", type: "cloudy" };
  if (code === 95)             return { en: "Thunderstorm",    kh: "ខ្យល់ព្យុះ",     icon: "⛈️",  type: "storm" };
  return                              { en: "Thunderstorm",    kh: "ខ្យល់ព្យុះ",     icon: "⛈️",  type: "storm" };
}

// ── Card gradient themes ─────────────────────────────────────────────────────

type Theme = {
  gradient: string;
  textPrimary: string;
  textSecondary: string;
  borderColor: string;
  badgeBg: string;
  inputBg: string;
  iconColor: string;
};

function getTheme(type: ConditionType, tempC: number): Theme {
  if (tempC >= 35) {
    return {
      gradient: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)",
      textPrimary: "#fff",
      textSecondary: "rgba(255,255,255,0.75)",
      borderColor: "rgba(255,255,255,0.25)",
      badgeBg: "rgba(255,255,255,0.2)",
      inputBg: "rgba(255,255,255,0.15)",
      iconColor: "#fde68a",
    };
  }
  if (type === "storm" || type === "rain") {
    return {
      gradient: "linear-gradient(135deg, #334155 0%, #1e3a5f 100%)",
      textPrimary: "#fff",
      textSecondary: "rgba(255,255,255,0.65)",
      borderColor: "rgba(255,255,255,0.15)",
      badgeBg: "rgba(255,255,255,0.12)",
      inputBg: "rgba(255,255,255,0.1)",
      iconColor: "#93c5fd",
    };
  }
  if (type === "fog" || type === "cloudy") {
    return {
      gradient: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
      textPrimary: "#fff",
      textSecondary: "rgba(255,255,255,0.7)",
      borderColor: "rgba(255,255,255,0.18)",
      badgeBg: "rgba(255,255,255,0.14)",
      inputBg: "rgba(255,255,255,0.12)",
      iconColor: "#e2e8f0",
    };
  }
  // clear
  return {
    gradient: "linear-gradient(135deg, #bae6fd 0%, #38bdf8 100%)",
    textPrimary: "#0c4a6e",
    textSecondary: "rgba(12,74,110,0.65)",
    borderColor: "rgba(12,74,110,0.15)",
    badgeBg: "rgba(12,74,110,0.1)",
    inputBg: "rgba(12,74,110,0.08)",
    iconColor: "#0c4a6e",
  };
}

// ── Types ────────────────────────────────────────────────────────────────────

type WeatherData = {
  tempC: number;
  windKmh: number;
  condition: Condition;
  cityEn: string;
};

type GeoSuggestion = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

// ── Main component ───────────────────────────────────────────────────────────

export function WeatherWidget() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const setTemperature = useWeatherStore((s) => s.setTemperature);

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<GeoSuggestion[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Fetch weather from Open-Meteo ──────────────────────────────────────────

  const fetchWeather = useCallback(async (lat: number, lon: number, labelEn: string) => {
    setLoading(true);
    setError(false);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code&wind_speed_unit=kmh&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("weather fetch failed");
      const data = await res.json();
      const cur = data.current;
      const tempC = Math.round(cur.temperature_2m);
      setWeather({
        tempC,
        windKmh: Math.round(cur.wind_speed_10m),
        condition: wmoToCondition(cur.weather_code),
        cityEn: labelEn,
      });
      setTemperature(tempC);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [setTemperature]);

  // ── Reverse geocode via Nominatim ──────────────────────────────────────────

  const reverseGeocode = useCallback(async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.county ||
        data.address?.state ||
        "Cambodia";
      return city as string;
    } catch {
      return "Cambodia";
    }
  }, []);

  // ── On mount: try geolocation ──────────────────────────────────────────────

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationDenied(true);
      setShowSearch(true);
      fetchWeather(PHNOM_PENH.lat, PHNOM_PENH.lon, PHNOM_PENH.en);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const city = await reverseGeocode(latitude, longitude);
        fetchWeather(latitude, longitude, city);
      },
      () => {
        setLocationDenied(true);
        setShowSearch(true);
        fetchWeather(PHNOM_PENH.lat, PHNOM_PENH.lon, PHNOM_PENH.en);
      },
      { timeout: 6000 }
    );
  }, [fetchWeather, reverseGeocode]);

  // ── Search suggestions (debounced) ─────────────────────────────────────────

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (searchQuery.trim().length < 2) { setSuggestions([]); return; }

    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery.trim())}&count=6&language=en&format=json`
        );
        const data = await res.json();
        const results: GeoSuggestion[] = (data.results ?? []).map((r: {name: string; country: string; latitude: number; longitude: number}) => ({
          name: r.name,
          country: r.country,
          lat: r.latitude,
          lon: r.longitude,
        }));
        setSuggestions(results.slice(0, 5));
      } catch {
        setSuggestions([]);
      } finally {
        setSearching(false);
      }
    }, 400);
  }, [searchQuery]);

  // ── Close suggestions on outside click ────────────────────────────────────

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ── Select a suggestion ────────────────────────────────────────────────────

  function selectSuggestion(s: GeoSuggestion) {
    setSuggestions([]);
    setSearchQuery("");
    setShowSearch(false);
    fetchWeather(s.lat, s.lon, s.name);
  }

  // ── Derive theme ───────────────────────────────────────────────────────────

  const theme = weather
    ? getTheme(weather.condition.type, weather.tempC)
    : getTheme("clear", 30);

  const cityKh = weather ? toKhmerPlace(weather.cityEn) : PHNOM_PENH.kh;

  return (
    <div
      className="rounded-3xl overflow-hidden shadow-xl border transition-all duration-700"
      style={{ background: theme.gradient, borderColor: theme.borderColor }}
    >
      {/* ── Header bar ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: theme.textSecondary }}
          >
            {kh ? "ការព្យាករណ៍អាកាសធាតុ" : "Local Weather"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch((v) => !v)}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all"
            style={{ background: theme.badgeBg, color: theme.textPrimary }}
            title={kh ? "ផ្លាស់ប្ដូរទីតាំង" : "Change location"}
          >
            <Search className="w-3 h-3" />
            {kh ? "ផ្លាស់ប្ដូរ" : "Change"}
          </button>
          {weather && !loading && (
            <button
              onClick={() => {
                if (weather) fetchWeather(
                  PHNOM_PENH.lat, PHNOM_PENH.lon, PHNOM_PENH.en
                );
              }}
              className="rounded-full p-1.5 transition-all"
              style={{ background: theme.badgeBg, color: theme.textPrimary }}
              title="Refresh"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* ── Search bar (shown on denial or button click) ──────────────── */}
      {showSearch && (
        <div className="px-5 pb-3" ref={searchRef}>
          <div className="relative">
            <div className="flex items-center gap-2 rounded-2xl border px-3 py-2.5"
              style={{ background: theme.inputBg, borderColor: theme.borderColor }}>
              <Search className="w-3.5 h-3.5 flex-shrink-0" style={{ color: theme.textSecondary }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={kh ? "វាយឈ្មោះស្រុក / ខេត្ត…" : "Search district or province…"}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: theme.textPrimary }}
              />
              {searching && <Loader2 className="w-3.5 h-3.5 animate-spin flex-shrink-0" style={{ color: theme.textSecondary }} />}
              {searchQuery && !searching && (
                <button onClick={() => { setSearchQuery(""); setSuggestions([]); }} style={{ color: theme.textSecondary }}>
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full mt-1 rounded-2xl border overflow-hidden z-50 shadow-xl"
                style={{ background: "#fff" }}
              >
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => selectSuggestion(s)}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="font-medium text-foreground">{s.name}</span>
                    <span className="text-muted-foreground text-xs ml-auto">{s.country}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {locationDenied && (
            <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: theme.textSecondary }}>
              <MapPin className="w-3 h-3" />
              {kh
                ? "ទីតាំងបច្ចុប្បន្ន: ភ្នំពេញ (លំនាំដើម)"
                : "Defaulting to Phnom Penh — search to change"}
            </p>
          )}
        </div>
      )}

      {/* ── Main weather content ──────────────────────────────────────── */}
      <div className="px-5 pb-5">
        {loading && (
          <div className="flex items-center justify-center py-8 gap-3" style={{ color: theme.textSecondary }}>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className={`text-sm ${kh ? "font-khmer" : ""}`}>
              {t("Fetching weather…", "កំពុងទាញយកអាកាសធាតុ…")}
            </span>
          </div>
        )}

        {error && !loading && (
          <div className="flex items-center justify-center py-8 gap-2" style={{ color: theme.textSecondary }}>
            <CloudRain className="w-5 h-5" />
            <span className={`text-sm ${kh ? "font-khmer" : ""}`}>
              {t("Weather unavailable", "មិនអាចទាញយកអាកាសធាតុ")}
            </span>
          </div>
        )}

        {weather && !loading && !error && (
          <div>
            {/* City name */}
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: theme.iconColor }} />
              <div>
                <p className="font-bold text-lg leading-tight" style={{ color: theme.textPrimary }}>
                  {kh ? cityKh : weather.cityEn}
                </p>
                {kh && cityKh !== weather.cityEn && (
                  <p className="text-xs" style={{ color: theme.textSecondary }}>{weather.cityEn}</p>
                )}
              </div>
            </div>

            {/* Temperature + icon */}
            <div className="flex items-end gap-4 mb-4">
              <span className="text-6xl leading-none select-none" role="img" aria-label={weather.condition.en}>
                {weather.condition.icon}
              </span>
              <div>
                <div className="flex items-start">
                  <span className="text-5xl font-black leading-none" style={{ color: theme.textPrimary }}>
                    {weather.tempC}
                  </span>
                  <span className="text-2xl font-bold mt-1 ml-0.5" style={{ color: theme.textSecondary }}>°C</span>
                </div>
                <p className={`text-sm font-semibold mt-0.5 ${kh ? "font-khmer" : ""}`} style={{ color: theme.textSecondary }}>
                  {kh ? weather.condition.kh : weather.condition.en}
                </p>
              </div>
            </div>

            {/* Wind speed */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{ background: theme.badgeBg, color: theme.textPrimary }}
              >
                <Wind className="w-3.5 h-3.5" />
                <span className={kh ? "font-khmer" : ""}>
                  {kh ? `ល្បឿនខ្យល់: ${weather.windKmh} គម/ម` : `Wind: ${weather.windKmh} km/h`}
                </span>
              </div>
              {weather.tempC >= 35 && (
                <div
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
                  style={{ background: "rgba(255,255,255,0.25)", color: "#fff" }}
                >
                  🌡️ {kh ? "ព្រមានក្ដៅ!" : "Heat Warning!"}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Footer link ───────────────────────────────────────────────── */}
        <div
          className="flex items-start gap-2 rounded-2xl p-3 border"
          style={{ background: theme.badgeBg, borderColor: theme.borderColor }}
        >
          <GraduationCap className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: theme.iconColor }} />
          <p className={`text-xs leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`} style={{ color: theme.textPrimary }}>
            {kh ? (
              <>
                ចង់ដឹងពីការព្យាករណ៍អាកាសធាតុ?{" "}
                <Link
                  href="/launchpad"
                  className="font-bold underline underline-offset-2 hover:opacity-80 transition-opacity"
                  style={{ color: theme.textPrimary }}
                >
                  ស្វែងយល់ពីជំនាញវិទ្យាសាស្ត្របរិយាកាស!
                </Link>
              </>
            ) : (
              <>
                Want to learn how to predict the weather?{" "}
                <Link
                  href="/launchpad"
                  className="font-bold underline underline-offset-2 hover:opacity-80 transition-opacity"
                  style={{ color: theme.textPrimary }}
                >
                  Check out the Atmospheric Science Major!
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
