import { GalaxyDiagram } from "@/components/diagrams/LearningDiagrams";
import { Suspense } from "react";

import { useLanguageStore } from "@/store/use-language";
import { Orbit } from "lucide-react";

// ── 3D scene ─────────────────────────────────────────────────────────────────

// ── Main exported component ───────────────────────────────────────────────────

export function GalaxyMap() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      aria-labelledby="galaxy-title"
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-lg bg-sky-400/15 border border-sky-400/25 flex items-center justify-center text-sky-400">
          <Orbit className="w-3.5 h-3.5" />
        </div>
        <span
          className={`text-xs font-bold tracking-widest text-sky-400 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}
        >
          {kh ? "កាឡាក់ស៊ីផ្លូវទឹកដោះគោ" : "The Milky Way Galaxy"}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-sky-400/20 to-transparent" />
      </div>

      {}
      <>
        <>
          <div
            className="relative rounded-3xl overflow-hidden border border-white/10"
            style={{
              background:
                "radial-gradient(ellipse at center, #06091a 0%, #020614 60%, #010310 100%)",
              height: "clamp(340px, 52vw, 520px)",
            }}
          >
            {/* 3-D canvas */}
            <Suspense
              fallback={
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/40">
                  <div className="w-8 h-8 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
                  <span className={`text-sm ${kh ? "font-khmer" : ""}`}>
                    {kh ? "កំពុងបង្ហាញ 3D..." : "Rendering galaxy…"}
                  </span>
                </div>
              }
            >
              <GalaxyDiagram />
            </Suspense>

            {/* Top-right controls hint */}
            <div
              className="absolute top-3 right-3 rounded-xl px-3 py-2 text-[10px] text-white/40 border border-white/8 leading-snug text-right pointer-events-none"
              style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(6px)",
              }}
            >
              <p>{kh ? "ប្រើម្រាមដៃ​ដើម្បី​វិល" : "Drag to rotate"}</p>
              <p>
                {kh ? "ប្រើគ្រាប់រំកិលដើម្បីពង្រីក" : "Use the zoom slider"}
              </p>
            </div>

            {/* "You are here" overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 px-5 py-4 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(1,3,16,0.92) 0%, rgba(1,3,16,0.6) 60%, transparent 100%)",
              }}
            >
              <div className="flex items-start gap-2.5 max-w-xl">
                <span
                  className="flex-shrink-0 w-2.5 h-2.5 rounded-full mt-1 animate-pulse"
                  style={{
                    background: "#22ffcc",
                    boxShadow: "0 0 8px #22ffcc",
                  }}
                />
                <div>
                  <p
                    id="galaxy-title"
                    className={`text-xs font-semibold text-[#22ffcc] mb-0.5 ${kh ? "font-khmer" : ""}`}
                  >
                    {kh ? "អ្នកនៅទីនេះ" : "You are here"}
                  </p>
                  <p
                    className={`text-xs leading-relaxed ${kh ? "font-khmer" : ""}`}
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {kh
                      ? "ផែនដីស្ថិតនៅក្នុងដៃអូរីយ៉ុង (Orion Arm) ប្រហែល ២៦,០០០ ឆ្នាំពន្លឺពីចំណុចកណ្ដាល។"
                      : "Earth is located in the Orion Arm, about 26,000 light-years from the galactic centre."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      </>

      {/* Caption */}
      <p
        className={`mt-3 text-xs text-center text-white/25 ${kh ? "font-khmer" : ""}`}
      >
        {kh
          ? "ចំណុចបៃតង = ផែនដី · ណែនាំ: ដ្យាក្រាម SVG"
          : "Teal dot = Earth · Interactive SVG · Schematic spiral arms"}
      </p>
    </section>
  );
}
