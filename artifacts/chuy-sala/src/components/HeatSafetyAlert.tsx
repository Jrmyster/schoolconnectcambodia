import { useState, useEffect } from "react";
import { X, Thermometer, BookOpen, Droplets } from "lucide-react";
import { Link } from "wouter";
import { useWeatherStore } from "@/store/use-weather";
import { useLanguageStore } from "@/store/use-language";

const HEAT_THRESHOLD = 38;
const DISMISS_KEY = "heat-alert-dismissed-at";
const RESHOW_MS = 4 * 60 * 60 * 1000; // 4 hours

function isDismissedRecently(): boolean {
  const raw = localStorage.getItem(DISMISS_KEY);
  if (!raw) return false;
  return Date.now() - Number(raw) < RESHOW_MS;
}

export function HeatSafetyAlert() {
  const temperature = useWeatherStore((s) => s.temperature);
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Whenever temperature changes, decide whether to show the alert
  useEffect(() => {
    if (temperature === null) return;
    if (temperature >= HEAT_THRESHOLD && !isDismissedRecently()) {
      setVisible(true);
      // Kick off the slide-in animation on next tick
      setTimeout(() => setAnimateIn(true), 10);
    }
  }, [temperature]);

  function dismiss() {
    setAnimateIn(false);
    setTimeout(() => {
      setVisible(false);
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    }, 300);
  }

  if (!visible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="w-full overflow-hidden transition-all duration-300"
      style={{
        maxHeight: animateIn ? "300px" : "0px",
        opacity: animateIn ? 1 : 0,
      }}
    >
      <div
        className="relative w-full"
        style={{
          background: "linear-gradient(90deg, #7f1d1d 0%, #b91c1c 45%, #c2410c 100%)",
        }}
      >
        {/* Animated heat shimmer strip at the top */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background:
              "linear-gradient(90deg, transparent, #fbbf24, #f97316, #fbbf24, transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite linear",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Thermometer className="w-4 h-4 text-yellow-300" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Title */}
              <p
                className={`font-bold text-white text-sm mb-0.5 ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {kh
                  ? "⚠️ ការព្រមានអំពីកម្ដៅខ្លាំង"
                  : "⚠️ Extreme Heat Warning"}
              </p>

              {/* Body text */}
              <p
                className={`text-red-100 text-xs leading-relaxed ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {kh ? (
                  <>
                    សីតុណ្ហភាពក្នុងតំបន់គឺ{" "}
                    <span className="font-bold text-yellow-300">
                      {temperature}°C
                    </span>{" "}
                    — លើសពី ៣៨°C។ សូមញ៉ាំទឹកឱ្យបានច្រើន
                    រក្សាកន្លែងដែលមានម្លប់ និងជៀសវាងសកម្មភាពរាងកាយខ្លាំង។
                  </>
                ) : (
                  <>
                    The local temperature is{" "}
                    <span className="font-bold text-yellow-300">
                      {temperature}°C
                    </span>{" "}
                    — above 38°C. Please stay hydrated, seek shade, and avoid
                    heavy physical activity.
                  </>
                )}
              </p>

              {/* Action row */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {/* Tips chips */}
                <span className="inline-flex items-center gap-1 bg-white/15 text-white rounded-full px-2.5 py-1 text-xs font-medium">
                  <Droplets className="w-3 h-3 text-sky-300" />
                  {kh ? "ញ៉ាំទឹក" : "Stay hydrated"}
                </span>
                <span className="inline-flex items-center gap-1 bg-white/15 text-white rounded-full px-2.5 py-1 text-xs font-medium">
                  🌳 {kh ? "ស្វែងរកម្លប់" : "Find shade"}
                </span>
                <span className="inline-flex items-center gap-1 bg-white/15 text-white rounded-full px-2.5 py-1 text-xs font-medium">
                  😮‍💨 {kh ? "សម្រាក" : "Rest often"}
                </span>

                {/* Learn more link */}
                <Link
                  href="/exam-prep"
                  className="inline-flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold rounded-full px-3 py-1 text-xs transition-colors"
                >
                  <BookOpen className="w-3 h-3" />
                  <span className={kh ? "font-khmer" : ""}>
                    {kh
                      ? "ស្វែងយល់ពីការដែលរាងកាយបន្ត (វិទ្យាសាស្ត្រជីវវិទ្យា)"
                      : "Learn how your body stays cool (Health & Science)"}
                  </span>
                </Link>
              </div>
            </div>

            {/* Dismiss button */}
            <button
              onClick={dismiss}
              className="flex-shrink-0 w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors mt-0.5"
              aria-label="Dismiss heat alert"
              title={
                kh
                  ? "បិទ (នឹងបង្ហាញវិញក្នុង ៤ ម៉ោង)"
                  : "Dismiss (will reappear in 4 hours)"
              }
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reappearance note */}
          <p className="text-red-300 text-xs mt-1.5 pl-11">
            {kh
              ? "🕐 នឹងបង្ហាញវិញក្រោយ ៤ ម៉ោង ប្រសិនបើសីតុណ្ហភាពនៅតែខ្ពស់"
              : "🕐 This alert will reappear in 4 hours if the temperature remains high."}
          </p>
        </div>
      </div>
    </div>
  );
}
