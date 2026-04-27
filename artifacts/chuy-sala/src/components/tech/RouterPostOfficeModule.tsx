import { Radio, Router, Lock, ShieldCheck, Smartphone, Tv2, Laptop2, Wifi } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

/* ──────────────────────────────────────────────────────────────────────────────
 * Lesson 2 · The Digital Post Office — Routers & Wi-Fi
 *
 * Self-contained blueprint module that explains how a home Wi-Fi router
 * works in three layered analogies:
 *   1) The Invisible Cables  — Wi-Fi as light we cannot see (radio waves)
 *   2) Router as Postmaster  — IP addressing & packet routing
 *   3) The Secure Handshake  — WPA / encryption
 *
 * Visual language matches the rest of the "How Computers Work" page:
 * deep navy, cyan grid + glow, monospace technical labels, and lucide
 * icons. All sub-headings are paired bilingual EN + KH.
 * ────────────────────────────────────────────────────────────────────────────── */

export function RouterPostOfficeModule() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="space-y-6">
      {/* Local CSS for the radio-wave pulse + packet-flow animations.
          Scoped via class names so they don't leak. */}
      <style>{`
        @keyframes routerWavePulse {
          0%   { r: 26; opacity: 0.65; }
          100% { r: 90; opacity: 0;    }
        }
        .router-wave {
          transform-origin: center;
          animation: routerWavePulse 2.4s ease-out infinite;
        }
        @keyframes routerPacketFlow {
          0%   { offset-distance: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .router-packet { animation: routerPacketFlow 2.4s linear infinite; }
        @keyframes routerBlink {
          0%, 49%   { opacity: 0.15; }
          50%, 100% { opacity: 1;    }
        }
        .router-blink { animation: routerBlink 0.8s steps(2, end) infinite; }
        @keyframes routerScramble {
          0%   { content: "HELLO" }
          25%  { content: "X@9!q" }
          50%  { content: "?#z47" }
          75%  { content: "%K2&p" }
          100% { content: "X@9!q" }
        }
      `}</style>

      <BlueprintCard testId="router-section-radio-waves">
        <SubHeading
          stepEn="Section 1"
          stepKh="ផ្នែក ១"
          titleEn="The Invisible Cables"
          titleKh="ខ្សែកាបមើលមិនឃើញ"
          tagEn="Radio Waves"
          tagKh="រលកវិទ្យុ"
          Icon={Radio}
        />
        <p
          className={`mt-4 text-sm sm:text-base text-slate-200 leading-relaxed ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {kh ? (
            <>
              <span className="text-cyan-300 font-semibold">វ៉ាយហ្វាយមិនមែនជាមន្តអាគមទេ</span>
              {" — វាគ្រាន់តែជា "}
              <span className="text-cyan-300 font-semibold">ពន្លឺដែលភ្នែករបស់យើងមើលមិនឃើញ</span>
              {" (ហៅថា "}
              <span className="text-cyan-200 font-semibold">រលកវិទ្យុ</span>
              {")។ ដូចជាដែ​លពិលពន្លឺមួយ ភ្លឹបភ្លែតតាមកូដ Morse, "}
              <span className="text-cyan-300 font-semibold">អង់តែនរបស់រ៉ោតទ័រ</span>
              {" ភ្លឹបភ្លែតលេខ "}
              <span className="font-mono text-cyan-200 font-bold">១</span>
              {" និងលេខ "}
              <span className="font-mono text-cyan-200 font-bold">០</span>
              {" ឌីជីថល តាមរយៈខ្យល់ ទៅកាន់អង់តែនផ្ទៃក្នុងនៃទូរស័ព្ទ។"}
            </>
          ) : (
            <>
              <span className="text-cyan-300 font-semibold">Wi-Fi is not magic</span>
              {" — it is just "}
              <span className="text-cyan-300 font-semibold">light that our eyes cannot see</span>
              {" (called "}
              <span className="text-cyan-200 font-semibold">radio waves</span>
              {"). Just like a flashlight blinking Morse code, the "}
              <span className="text-cyan-300 font-semibold">router's antenna</span>
              {" blinks digital "}
              <span className="font-mono text-cyan-200 font-bold">1</span>
              {"s and "}
              <span className="font-mono text-cyan-200 font-bold">0</span>
              {"s through the air to the phone's internal antenna."}
            </>
          )}
        </p>
        <RadioWaveDiagram kh={kh} />
      </BlueprintCard>

      <BlueprintCard testId="router-section-postmaster">
        <SubHeading
          stepEn="Section 2"
          stepKh="ផ្នែក ២"
          titleEn="The Router as the Postmaster"
          titleKh="រ៉ោតទ័រជាប្រធានប្រៃសណីយ៍"
          tagEn="IP Addresses"
          tagKh="អាសយដ្ឋាន IP"
          Icon={Router}
        />
        <p
          className={`mt-4 text-sm sm:text-base text-slate-200 leading-relaxed ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {kh ? (
            <>
              {"ការងារសំខាន់របស់រ៉ោតទ័រគឺ "}
              <span className="text-cyan-300 font-semibold">ការគ្រប់គ្រងចរាចរណ៍</span>
              {"។ ឧបករណ៍នីមួយៗនៅក្នុងផ្ទះរបស់អ្នក (ទូរស័ព្ទ កុំព្យូទ័រ ទូរទស្សន៍) ត្រូវបានផ្ដល់ "}
              <span className="text-cyan-300 font-semibold">អាសយដ្ឋានផ្ទះតែមួយគត់</span>
              {" — ហៅថា "}
              <span className="text-cyan-200 font-mono font-bold">IP Address</span>
              {"។ នៅពេលដែលវីដេអូ YouTube ចូលមកពីអ៊ីនធឺណិត រ៉ោតទ័រ "}
              <span className="text-cyan-300 font-semibold">មើលអាសយដ្ឋាន</span>
              {" ហើយផ្ញើ "}
              <span className="text-cyan-300 font-semibold">កញ្ចប់ទិន្នន័យតែទៅទូរស័ព្ទ</span>
              {" ដែលបានស្នើសុំ — មិនមែនទៅទូរទស្សន៍ ឬកុំព្យូទ័រនោះទេ។"}
            </>
          ) : (
            <>
              {"A router's main job is "}
              <span className="text-cyan-300 font-semibold">traffic control</span>
              {". Every device in your home (phone, laptop, TV) gets a "}
              <span className="text-cyan-300 font-semibold">unique "Home Address"</span>
              {" — its "}
              <span className="text-cyan-200 font-mono font-bold">IP Address</span>
              {". When a YouTube video arrives from the internet, the router "}
              <span className="text-cyan-300 font-semibold">looks at the address</span>
              {" and sends the data packets "}
              <span className="text-cyan-300 font-semibold">only to the phone that asked for it</span>
              {", not the TV or the laptop."}
            </>
          )}
        </p>
        <PostmasterDiagram kh={kh} />
      </BlueprintCard>

      <BlueprintCard testId="router-section-handshake">
        <SubHeading
          stepEn="Section 3"
          stepKh="ផ្នែក ៣"
          titleEn="The Secure Handshake"
          titleKh="ការចាប់ដៃសុវត្ថិភាព"
          tagEn="WPA · Encryption"
          tagKh="WPA · ការអ៊ិនគ្រីប"
          Icon={ShieldCheck}
        />
        <p
          className={`mt-4 text-sm sm:text-base text-slate-200 leading-relaxed ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {kh ? (
            <>
              {"នៅពេលដែលទូរស័ព្ទមួយព្យាយាមភ្ជាប់ វាត្រូវធ្វើ "}
              <span className="text-cyan-300 font-semibold">"ការចាប់ដៃ"</span>
              {" ជាមួយរ៉ោតទ័រ ហើយផ្ដល់នូវ "}
              <span className="text-cyan-300 font-semibold">ពាក្យសម្ងាត់សម្ងាត់</span>
              {"។ បើពាក្យសម្ងាត់ត្រូវ រ៉ោតទ័រនឹង "}
              <span className="text-cyan-300 font-semibold">បំប៉ាក់ (អ៊ិនគ្រីប)</span>
              {" រាល់រលកវិទ្យុដែលផ្ញើទៅទូរស័ព្ទនោះ។ ដូច្នេះ បើ "}
              <span className="text-rose-300 font-semibold">ហេកឃ័រណាម្នាក់ស្ទាក់ចាប់</span>
              {" រលកមើលមិនឃើញនៅក្នុងខ្យល់ វាគ្រាន់តែមើលទៅដូចជា "}
              <span className="text-cyan-300 font-semibold">សម្លេងរំខានចៃដន្យ</span>
              {" ប៉ុណ្ណោះ។"}
            </>
          ) : (
            <>
              {"When a phone tries to connect, it must perform a "}
              <span className="text-cyan-300 font-semibold">"Handshake"</span>
              {" with the router and provide the "}
              <span className="text-cyan-300 font-semibold">secret password</span>
              {". If it matches, the router "}
              <span className="text-cyan-300 font-semibold">scrambles (encrypts)</span>
              {" all the radio waves sent to that phone. So if a "}
              <span className="text-rose-300 font-semibold">hacker intercepts</span>
              {" the invisible waves in the air, it just looks like "}
              <span className="text-cyan-300 font-semibold">random noise</span>
              {"."}
            </>
          )}
        </p>
        <HandshakeDiagram kh={kh} />
      </BlueprintCard>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Shared blueprint sub-card                                                */
/* ────────────────────────────────────────────────────────────────────────── */
function BlueprintCard({
  children,
  testId,
}: {
  children: React.ReactNode;
  testId?: string;
}) {
  return (
    <section
      data-testid={testId}
      className="relative overflow-hidden rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-5 sm:px-7 py-6 sm:py-8 shadow-2xl"
    >
      {/* Faint blueprint grid behind the content */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Corner crosshairs */}
      {[
        { top: "8px", left: "8px" },
        { top: "8px", right: "8px" },
        { bottom: "8px", left: "8px" },
        { bottom: "8px", right: "8px" },
      ].map((pos, i) => (
        <div key={i} className="absolute w-4 h-4 pointer-events-none" style={pos}>
          <div className="absolute inset-0 border-l-2 border-t-2 border-cyan-400/70" />
        </div>
      ))}
      <div className="relative">{children}</div>
    </section>
  );
}

/* Paired bilingual sub-section heading: EN above, KH below, always both. */
function SubHeading({
  stepEn,
  stepKh,
  titleEn,
  titleKh,
  tagEn,
  tagKh,
  Icon,
}: {
  stepEn: string;
  stepKh: string;
  titleEn: string;
  titleKh: string;
  tagEn: string;
  tagKh: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <header className="flex items-start gap-3">
      <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/50 text-cyan-300 flex items-center justify-center flex-shrink-0 shadow">
        <Icon className="w-5 h-5" strokeWidth={2.25} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400/85">
          <span>{stepEn}</span>
          <span className="font-khmer normal-case tracking-normal text-xs text-cyan-300/85">
            {stepKh}
          </span>
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug mt-0.5">
          <span className="block">{titleEn}</span>
          <span className="block font-khmer text-lg sm:text-xl font-bold text-cyan-200 mt-1 leading-relaxed">
            {titleKh}
          </span>
        </h3>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-0.5 text-[11px] font-mono text-cyan-200">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 router-blink" />
          <span>{tagEn}</span>
          <span className="opacity-50">·</span>
          <span className="font-khmer normal-case">{tagKh}</span>
        </div>
      </div>
    </header>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Sub-diagrams                                                              */
/* ────────────────────────────────────────────────────────────────────────── */
function RadioWaveDiagram({ kh }: { kh: boolean }) {
  return (
    <div
      className="mt-5 rounded-xl border border-cyan-400/30 bg-slate-950/60 p-3 sm:p-4"
      data-testid="router-radio-diagram"
    >
      <p
        className={`text-[10px] uppercase tracking-widest text-cyan-300/85 font-mono mb-3 ${
          kh ? "font-khmer normal-case tracking-normal text-xs" : ""
        }`}
      >
        {kh
          ? "ផែនទី — រ៉ោតទ័រ ↔ ទូរស័ព្ទ"
          : "Schematic — Router ↔ Phone"}
      </p>
      <svg
        viewBox="0 0 600 180"
        className="w-full h-auto"
        role="img"
        aria-label={kh ? "រលកវិទ្យុ" : "Radio waves between router and phone"}
      >
        {/* Router antenna on the left */}
        <g transform="translate(80,90)">
          <rect x="-26" y="-14" width="52" height="36" rx="6" fill="#0e7490" stroke="#22d3ee" strokeWidth="1.5" />
          <line x1="-12" y1="-14" x2="-12" y2="-34" stroke="#22d3ee" strokeWidth="2" />
          <line x1="12" y1="-14" x2="12" y2="-34" stroke="#22d3ee" strokeWidth="2" />
          <circle cx="-12" cy="-36" r="2.5" fill="#67e8f9" className="router-blink" />
          <circle cx="12" cy="-36" r="2.5" fill="#67e8f9" className="router-blink" />
          <text x="0" y="44" textAnchor="middle" fontSize="11" fill="#67e8f9" fontWeight="700" fontFamily="monospace">
            ROUTER
          </text>
        </g>

        {/* Pulsing radio waves */}
        {[0, 0.8, 1.6].map((delay, i) => (
          <circle
            key={i}
            cx="80"
            cy="90"
            r="26"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            className="router-wave"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}

        {/* Morse-style 1/0 stream */}
        <g fontFamily="monospace" fontSize="14" fontWeight="700" fill="#67e8f9">
          {["1", "0", "1", "1", "0", "0", "1", "0"].map((bit, i) => (
            <text key={i} x={180 + i * 38} y="80" textAnchor="middle" className="router-blink" style={{ animationDelay: `${i * 0.1}s` }}>
              {bit}
            </text>
          ))}
        </g>
        <line x1="170" y1="98" x2="490" y2="98" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.55" />
        <text x="330" y="120" textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="monospace">
          {kh ? "រលកវិទ្យុ — មើលមិនឃើញ" : "Radio waves — invisible"}
        </text>

        {/* Phone on the right */}
        <g transform="translate(520,90)">
          <rect x="-18" y="-32" width="36" height="64" rx="6" fill="#1e293b" stroke="#22d3ee" strokeWidth="1.5" />
          <rect x="-13" y="-26" width="26" height="42" rx="2" fill="#0c4a6e" />
          <circle cx="0" cy="22" r="2" fill="#67e8f9" />
          <line x1="0" y1="-32" x2="0" y2="-50" stroke="#22d3ee" strokeWidth="2" />
          <circle cx="0" cy="-52" r="2.5" fill="#67e8f9" className="router-blink" />
          <text x="0" y="48" textAnchor="middle" fontSize="11" fill="#67e8f9" fontWeight="700" fontFamily="monospace">
            PHONE
          </text>
        </g>
      </svg>
    </div>
  );
}

function PostmasterDiagram({ kh }: { kh: boolean }) {
  /* Router in the middle, three devices around it. A YouTube packet is
     addressed to 192.168.1.42 and is delivered ONLY to that device. */
  const devices = [
    { Icon: Smartphone, ip: "192.168.1.42", label: kh ? "ទូរស័ព្ទ" : "Phone", x: 510, y: 50, asked: true },
    { Icon: Tv2,        ip: "192.168.1.55", label: kh ? "ទូរទស្សន៍" : "TV", x: 510, y: 130, asked: false },
    { Icon: Laptop2,    ip: "192.168.1.71", label: kh ? "កុំព្យូទ័រ" : "Laptop", x: 510, y: 210, asked: false },
  ];

  return (
    <div
      className="mt-5 rounded-xl border border-cyan-400/30 bg-slate-950/60 p-3 sm:p-4"
      data-testid="router-postmaster-diagram"
    >
      <p
        className={`text-[10px] uppercase tracking-widest text-cyan-300/85 font-mono mb-3 ${
          kh ? "font-khmer normal-case tracking-normal text-xs" : ""
        }`}
      >
        {kh
          ? "ផែនទី — កញ្ចប់ទិន្នន័យ → អាសយដ្ឋានត្រឹមត្រូវ"
          : "Schematic — packet → correct address"}
      </p>
      <svg viewBox="0 0 600 270" className="w-full h-auto" role="img" aria-label={kh ? "រ៉ោតទ័រជាប្រធានប្រៃសណីយ៍" : "Router as postmaster"}>
        {/* Internet cloud on the left */}
        <g transform="translate(60,130)">
          <ellipse cx="0" cy="0" rx="42" ry="22" fill="#0c4a6e" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="0" y="4" textAnchor="middle" fontSize="11" fill="#67e8f9" fontWeight="700" fontFamily="monospace">
            INTERNET
          </text>
          <text x="0" y="40" textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="monospace">
            YouTube
          </text>
        </g>

        {/* Router in the middle */}
        <g transform="translate(290,130)">
          <rect x="-44" y="-22" width="88" height="44" rx="8" fill="#0e7490" stroke="#22d3ee" strokeWidth="1.8" />
          <line x1="-30" y1="-22" x2="-30" y2="-42" stroke="#22d3ee" strokeWidth="2" />
          <line x1="30"  y1="-22" x2="30"  y2="-42" stroke="#22d3ee" strokeWidth="2" />
          <circle cx="-30" cy="-44" r="2.5" fill="#67e8f9" className="router-blink" />
          <circle cx="30"  cy="-44" r="2.5" fill="#67e8f9" className="router-blink" />
          <text x="0" y="6" textAnchor="middle" fontSize="11" fill="#e0f2fe" fontWeight="700" fontFamily="monospace">
            ROUTER
          </text>
          <text x="0" y="38" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="monospace">
            postmaster
          </text>
        </g>

        {/* Internet → router incoming line */}
        <line x1="105" y1="130" x2="245" y2="130" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.7" />
        {/* Packet label on incoming line */}
        <g transform="translate(175,118)">
          <rect x="-32" y="-10" width="64" height="18" rx="3" fill="#0c4a6e" stroke="#22d3ee" strokeWidth="1" />
          <text x="0" y="3" textAnchor="middle" fontSize="9" fill="#67e8f9" fontFamily="monospace" fontWeight="700">
            TO: .42
          </text>
        </g>

        {/* Router → each device */}
        {devices.map((d, i) => {
          const stroke = d.asked ? "#22c55e" : "#475569";
          const opac = d.asked ? 1 : 0.4;
          return (
            <g key={i} opacity={opac}>
              <line x1="335" y1="130" x2={d.x - 22} y2={d.y + 12} stroke={stroke} strokeWidth="2" strokeDasharray={d.asked ? "0" : "4 4"} />
              {d.asked && (
                <g>
                  <circle cx={(335 + d.x - 22) / 2} cy={(130 + d.y + 12) / 2 - 6} r="4" fill="#22c55e" />
                  <text x={(335 + d.x - 22) / 2} y={(130 + d.y + 12) / 2 - 14} textAnchor="middle" fontSize="9" fill="#86efac" fontFamily="monospace" fontWeight="700">
                    ✓
                  </text>
                </g>
              )}
              {/* Device icon, drawn as a glyph */}
              <g transform={`translate(${d.x},${d.y + 8})`}>
                <rect x="-22" y="-14" width="44" height="32" rx="6" fill="#1e293b" stroke={d.asked ? "#22c55e" : "#475569"} strokeWidth="1.5" />
                <text x="0" y="6" textAnchor="middle" fontSize="11" fill={d.asked ? "#86efac" : "#94a3b8"} fontFamily="monospace" fontWeight="700">
                  {d.label}
                </text>
              </g>
              <text x={d.x} y={d.y - 14} textAnchor="middle" fontSize="9" fill={d.asked ? "#86efac" : "#64748b"} fontFamily="monospace" fontWeight="700">
                {d.ip}
              </text>
            </g>
          );
        })}

        {/* Render device icons as foreignObject for crispness */}
        {devices.map((d, i) => (
          <foreignObject key={`icon-${i}`} x={d.x - 10} y={d.y - 6} width="20" height="20">
            <div style={{ color: d.asked ? "#86efac" : "#475569", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <d.Icon width={20} height={20} />
            </div>
          </foreignObject>
        ))}

        {/* Wifi indicator on router */}
        <g transform="translate(290,108)">
          <foreignObject x="-10" y="-10" width="20" height="20">
            <div style={{ color: "#67e8f9" }}>
              <Wifi width={20} height={20} />
            </div>
          </foreignObject>
        </g>
      </svg>
      <p
        className={`mt-2 text-xs text-slate-400 text-center ${
          kh ? "font-khmer leading-loose" : ""
        }`}
      >
        {kh
          ? "កញ្ចប់ដែលមានស្លាក .42 ត្រូវបានផ្ញើទៅទូរស័ព្ទតែប៉ុណ្ណោះ — ទូរទស្សន៍ និងកុំព្យូទ័រត្រូវបានរំលង។"
          : 'The packet labelled ".42" is delivered only to the phone — the TV and laptop are skipped.'}
      </p>
    </div>
  );
}

function HandshakeDiagram({ kh }: { kh: boolean }) {
  return (
    <div
      className="mt-5 rounded-xl border border-cyan-400/30 bg-slate-950/60 p-3 sm:p-4"
      data-testid="router-handshake-diagram"
    >
      <p
        className={`text-[10px] uppercase tracking-widest text-cyan-300/85 font-mono mb-3 ${
          kh ? "font-khmer normal-case tracking-normal text-xs" : ""
        }`}
      >
        {kh
          ? "ផែនទី — ការអ៊ិនគ្រីប WPA"
          : "Schematic — WPA encryption"}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-rose-400/30 bg-rose-500/5 p-3">
          <div className={`text-[10px] uppercase tracking-widest text-rose-300/90 font-mono mb-2 flex items-center gap-1.5 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
            <Lock className="w-3.5 h-3.5" />
            <span>{kh ? "បើគ្មានពាក្យសម្ងាត់" : "Without the password"}</span>
          </div>
          <div className="font-mono text-rose-200 text-sm leading-relaxed">
            <span className="text-slate-400 mr-1">{kh ? "សារ៖" : "MSG:"}</span>
            <span>HELLO</span>
            <span className="mx-2 text-slate-500">→</span>
            <span className="text-rose-300">{kh ? "ហេកឃ័រឃើញ៖" : "Hacker sees:"}</span>
          </div>
          <div className="mt-2 font-mono text-rose-200 text-base font-bold tracking-wider">
            HELLO
          </div>
          <p className={`mt-2 text-xs text-rose-200/80 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "ងាយស្រួលអាន — គ្មានសុវត្ថិភាព។"
              : "Easy to read — no security."}
          </p>
        </div>

        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/5 p-3">
          <div className={`text-[10px] uppercase tracking-widest text-emerald-300/90 font-mono mb-2 flex items-center gap-1.5 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{kh ? "ជាមួយពាក្យសម្ងាត់ត្រឹមត្រូវ" : "With the right password"}</span>
          </div>
          <div className="font-mono text-emerald-200 text-sm leading-relaxed">
            <span className="text-slate-400 mr-1">{kh ? "សារ៖" : "MSG:"}</span>
            <span>HELLO</span>
            <span className="mx-2 text-slate-500">→</span>
            <span className="text-emerald-300">{kh ? "ហេកឃ័រឃើញ៖" : "Hacker sees:"}</span>
          </div>
          <div className="mt-2 font-mono text-emerald-200 text-base font-bold tracking-wider">
            X@9!q?#z47
          </div>
          <p className={`mt-2 text-xs text-emerald-200/80 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "ត្រូវបានបំប៉ាក់ — មើលទៅគ្រាន់តែជាសម្លេងរំខាន។"
              : "Scrambled — looks like random noise."}
          </p>
        </div>
      </div>
      <p
        className={`mt-3 text-xs text-slate-400 text-center ${
          kh ? "font-khmer leading-loose" : ""
        }`}
      >
        {kh
          ? "ការចាប់ដៃ៖ ទូរស័ព្ទ → ផ្ដល់ពាក្យសម្ងាត់ → រ៉ោតទ័រអ៊ិនគ្រីបទាំងអស់។"
          : "The handshake: phone → provides password → router encrypts everything."}
      </p>
    </div>
  );
}
