import { useState, useEffect } from "react";
import { X, CloudRain, Droplets, ShieldAlert } from "lucide-react";
import { Link } from "wouter";
import { useLanguageStore } from "@/store/use-language";

const DISMISS_KEY = "rainy-season-alert-dismissed";

let inMemoryDismissed = false;

function isRainySeason(date: Date = new Date()): boolean {
  const m = date.getMonth();
  return m >= 4 && m <= 9;
}

function isDismissedThisSession(): boolean {
  if (inMemoryDismissed) return true;
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function RainySeasonAlert() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (!isRainySeason()) return;
    if (isDismissedThisSession()) return;
    setVisible(true);
    const id = setTimeout(() => setAnimateIn(true), 10);
    return () => clearTimeout(id);
  }, []);

  function dismiss() {
    setAnimateIn(false);
    inMemoryDismissed = true;
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
    }
    setTimeout(() => setVisible(false), 300);
  }

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full overflow-hidden transition-all duration-300"
      style={{
        maxHeight: animateIn ? "640px" : "0px",
        opacity: animateIn ? 1 : 0,
      }}
      data-testid="rainy-season-alert"
    >
      <div
        className="relative w-full"
        style={{
          background:
            "linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)",
        }}
      >
        {/* subtle rain-streak shimmer */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background:
              "linear-gradient(90deg, transparent, #c2410c, #7c2d12, #c2410c, transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite linear",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-start gap-3">
            {/* Icon — white CloudRain on solid dark-orange disc for max contrast */}
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-9 h-9 rounded-full bg-orange-900 flex items-center justify-center ring-2 ring-orange-950/40 shadow">
                <CloudRain
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Headline — always bilingual; kh toggle just controls reading order */}
              <p
                className="font-bold text-slate-900 text-sm sm:text-base mb-0.5"
                data-testid="rainy-season-headline"
              >
                <span aria-hidden="true">⚠️ </span>
                {kh ? (
                  <>
                    <span className="font-khmer leading-loose">
                      សុវត្ថិភាពក្នុងរដូវវស្សា
                    </span>
                    <span className="text-orange-900 font-normal mx-2">/</span>
                    <span>Rainy Season Safety</span>
                  </>
                ) : (
                  <>
                    <span>Rainy Season Safety</span>
                    <span className="text-orange-900 font-normal mx-2">/</span>
                    <span className="font-khmer leading-loose">
                      សុវត្ថិភាពក្នុងរដូវវស្សា
                    </span>
                  </>
                )}
              </p>

              {/* Subtext — always bilingual; reading order follows toggle.
                  Both lines fully opaque slate-900 for AA contrast. */}
              <div
                className="text-slate-900 text-xs sm:text-sm leading-relaxed space-y-0.5"
                data-testid="rainy-season-subtext"
              >
                {kh ? (
                  <>
                    <p className="font-khmer leading-loose font-medium">
                      រដូវវស្សាបានមកដល់ហើយ។
                      សូមប្រុងប្រយ័ត្នចំពោះការជន់លិច ផ្លេកបន្ទោរ
                      និងជំងឺឆ្លងតាមទឹក។
                    </p>
                    <p>
                      The monsoon is here. Stay safe from floods, lightning,
                      and water-borne diseases.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-medium">
                      The monsoon is here. Stay safe from floods, lightning,
                      and water-borne diseases.
                    </p>
                    <p className="font-khmer leading-loose">
                      រដូវវស្សាបានមកដល់ហើយ។
                      សូមប្រុងប្រយ័ត្នចំពោះការជន់លិច ផ្លេកបន្ទោរ
                      និងជំងឺឆ្លងតាមទឹក។
                    </p>
                  </>
                )}
              </div>

              {/* Action buttons — stack vertically on mobile, inline on sm+.
                  Each button is always bilingual per spec ("EN / KH"). */}
              <div className="mt-2.5 flex flex-col sm:flex-row sm:flex-wrap gap-2">
                <Link
                  href="/well-being/public-health"
                  className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-amber-50 text-slate-900 font-bold rounded-full px-3.5 py-1.5 text-xs sm:text-sm shadow-sm hover:shadow ring-1 ring-amber-900/20 transition-all active:scale-95"
                  data-testid="rainy-season-flood-link"
                >
                  <ShieldAlert
                    className="w-3.5 h-3.5 text-orange-700 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>Flood Prep</span>
                  <span className="text-slate-500 font-normal">/</span>
                  <span className="font-khmer">ការត្រៀមលក្ខណៈទឹកជំនន់</span>
                </Link>

                <Link
                  href="/physics/frugal-lab"
                  className="inline-flex items-center justify-center gap-1.5 bg-amber-200 hover:bg-amber-100 text-slate-900 font-bold rounded-full px-3.5 py-1.5 text-xs sm:text-sm shadow-sm hover:shadow ring-1 ring-amber-900/20 transition-all active:scale-95"
                  data-testid="rainy-season-water-link"
                >
                  <Droplets
                    className="w-3.5 h-3.5 text-sky-700 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>Clean Water</span>
                  <span className="text-slate-500 font-normal">/</span>
                  <span className="font-khmer">ទឹកស្អាត</span>
                </Link>
              </div>
            </div>

            {/* Dismiss button */}
            <button
              type="button"
              onClick={dismiss}
              className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-900 hover:bg-orange-950 active:scale-95 flex items-center justify-center text-white shadow ring-1 ring-orange-950/40 transition-colors"
              aria-label={
                kh
                  ? "បិទការព្រមាន (នឹងបង្ហាញវិញនៅពេលបើកលើកក្រោយ)"
                  : "Dismiss (will reappear on the next session)"
              }
              title={
                kh
                  ? "បិទ — នឹងបង្ហាញវិញនៅពេលបើកលើកក្រោយ ដរាបណារដូវវស្សានៅតែបន្ត"
                  : "Dismiss — will reappear next session until rainy season ends"
              }
              data-testid="rainy-season-dismiss"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
