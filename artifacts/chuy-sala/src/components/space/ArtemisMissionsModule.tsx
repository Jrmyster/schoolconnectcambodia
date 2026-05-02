import {
  Rocket,
  Target,
  Users,
  CalendarDays,
  CheckCircle2,
  Clock,
  Flag,
  Moon,
  Sparkles,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

/* ════════════════════════════════════════════════════════════════════════════
 *  RETURN TO THE MOON: THE ARTEMIS MISSIONS
 *  ការវិលត្រឡប់ទៅកាន់ព្រះច័ន្ទ៖ បេសកកម្ម Artemis
 *
 *  Lives on the Space page, anchor: #artemis
 *  Aesthetic: deep space blacks, lunar grays, clean white text, sky accents.
 * ══════════════════════════════════════════════════════════════════════════ */

type Lang = "en" | "kh";

type Status = "complete" | "active" | "planned";

type Mission = {
  id: string;
  nameEn: string;
  nameKh: string;
  dateEn: string;
  dateKh: string;
  status: Status;
  summaryEn: string;
  summaryKh: string;
};

const MISSIONS: Mission[] = [
  {
    id: "artemis-1",
    nameEn: "Artemis I",
    nameKh: "Artemis I",
    dateEn: "November 16, 2022",
    dateKh: "១៦ វិច្ឆិកា ២០២២",
    status: "complete",
    summaryEn:
      "The first uncrewed test flight of NASA's giant SLS rocket. Orion capsule traveled to lunar orbit and back — proving the hardware works.",
    summaryKh:
      "ការសាកល្បងហោះហើរដោយគ្មានមនុស្សលើកដំបូងនៃរ៉ុក្កែតយក្ស SLS របស់ NASA។ យានអវកាស Orion បានធ្វើដំណើរទៅគន្លងចន្ទ្រា និងវិលត្រឡប់មកវិញ — បញ្ជាក់ថាគ្រឿងបរិក្ខារដំណើរការបាន។",
  },
  {
    id: "artemis-2",
    nameEn: "Artemis II",
    nameKh: "Artemis II",
    dateEn: "April 1, 2026",
    dateKh: "១ មេសា ២០២៦",
    status: "complete",
    summaryEn:
      "First crewed lunar flyby in over 50 years. Crew: Reid Wiseman, Victor Glover, Christina Koch, and Jeremy Hansen — including the first woman and first person of color ever to fly to the Moon.",
    summaryKh:
      "ការហោះហើរកាត់ព្រះច័ន្ទដោយមានអវកាសយានិកលើកដំបូងក្នុងរយៈពេលជាង ៥០ ឆ្នាំ។ ក្រុមអវកាសយានិក៖ Reid Wiseman, Victor Glover, Christina Koch និង Jeremy Hansen — រួមទាំងស្ត្រីដំបូងគេ និងមនុស្សស្បែកខ្មៅដំបូងគេ ដែលធ្វើដំណើរទៅព្រះច័ន្ទ។",
  },
  {
    id: "artemis-3",
    nameEn: "Artemis III",
    nameKh: "Artemis III",
    dateEn: "Late 2027",
    dateKh: "ចុងឆ្នាំ ២០២៧",
    status: "planned",
    summaryEn:
      "A crewed test in low Earth orbit to rehearse rendezvous and docking procedures with the SpaceX Starship Human Landing System before the next surface attempt.",
    summaryKh:
      "ការសាកល្បងជាមួយអវកាសយានិកក្នុងគន្លងផែនដីទាប ដើម្បីហាត់សម ការជួបជុំ និងភ្ជាប់យានជាមួយប្រព័ន្ធ Starship Human Landing System របស់ SpaceX មុនពេលប៉ុនប៉ងចុះចតលើផ្ទៃច័ន្ទ។",
  },
  {
    id: "artemis-4",
    nameEn: "Artemis IV",
    nameKh: "Artemis IV",
    dateEn: "Early 2028",
    dateKh: "ដើមឆ្នាំ ២០២៨",
    status: "planned",
    summaryEn:
      "The return to the lunar surface. Astronauts will land near the Moon's south pole — where shadowed craters hold frozen water that could fuel future Mars missions.",
    summaryKh:
      "ការវិលត្រឡប់ទៅផ្ទៃព្រះច័ន្ទ។ អវកាសយានិកនឹងចុះចតក្បែរប៉ូលខាងត្បូងនៃព្រះច័ន្ទ — ជាកន្លែងដែលរណ្ដៅងងឹតមានទឹកកក ដែលអាចជាឥន្ធនៈសម្រាប់បេសកកម្មទៅភពអង្គារនាពេលអនាគត។",
  },
];

function StatusBadge({ status, isKh }: { status: Status; isKh: boolean }) {
  if (status === "complete") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-emerald-400/10 text-emerald-300 border border-emerald-400/30">
        <CheckCircle2 className="w-3 h-3" />
        <span className={isKh ? "font-khmer tracking-normal" : ""}>
          {isKh ? "បញ្ចប់" : "COMPLETE"}
        </span>
      </span>
    );
  }
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-sky-400/15 text-sky-300 border border-sky-400/40">
        <Rocket className="w-3 h-3" />
        <span className={isKh ? "font-khmer tracking-normal" : ""}>
          {isKh ? "កំពុងដំណើរការ" : "ACTIVE"}
        </span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-amber-400/10 text-amber-300 border border-amber-400/40">
      <Clock className="w-3 h-3" />
      <span className={isKh ? "font-khmer tracking-normal" : ""}>
        {isKh ? "គ្រោងទុក" : "PLANNED"}
      </span>
    </span>
  );
}

function MissionCard({ m, lang }: { m: Mission; lang: Lang }) {
  const isKh = lang === "kh";
  const isUpcoming = m.status === "active" || m.status === "planned";

  // Subtle glowing border for Active / Planned missions to differentiate
  // them from the muted "Complete" cards.
  const glowStyle: React.CSSProperties = isUpcoming
    ? {
        boxShadow:
          m.status === "active"
            ? "0 0 0 1px rgba(56,189,248,0.45), 0 0 28px rgba(56,189,248,0.22), 0 0 60px rgba(56,189,248,0.12)"
            : "0 0 0 1px rgba(251,191,36,0.35), 0 0 24px rgba(251,191,36,0.18), 0 0 56px rgba(251,191,36,0.10)",
      }
    : {};

  const borderClass = isUpcoming
    ? m.status === "active"
      ? "border-sky-400/40"
      : "border-amber-400/35"
    : "border-white/10";

  return (
    <article
      className={`relative rounded-2xl border ${borderClass} bg-gradient-to-br from-[#0a1628]/80 via-[#050d1a]/90 to-[#020c1b]/95 backdrop-blur-sm p-5 sm:p-6 flex flex-col h-full transition-transform duration-200 hover:-translate-y-0.5`}
      style={glowStyle}
      data-testid={`card-mission-${m.id}`}
    >
      {/* Header row: name + status */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h4 className="font-display font-bold text-white text-lg sm:text-xl leading-tight">
            {m.nameEn}
          </h4>
          <p className={`text-white/55 text-sm mt-0.5 ${isKh ? "font-khmer" : ""}`}>
            {m.nameKh}
          </p>
        </div>
        <StatusBadge status={m.status} isKh={isKh} />
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-[13px] text-sky-300/90 mb-4 font-mono">
        <CalendarDays className="w-3.5 h-3.5 shrink-0" />
        <span>{m.dateEn}</span>
        <span className="text-white/25">·</span>
        <span className={`text-white/65 ${isKh ? "font-khmer" : ""}`}>
          {m.dateKh}
        </span>
      </div>

      {/* Summary — both languages always shown */}
      <p className="text-white/80 text-sm leading-relaxed mb-2">
        {m.summaryEn}
      </p>
      <p className="font-khmer text-white/65 text-sm leading-loose">
        {m.summaryKh}
      </p>
    </article>
  );
}

function SectionHeading({
  Icon,
  en,
  kh,
  isKh,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  en: string;
  kh: string;
  isKh: boolean;
}) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-9 h-9 rounded-xl bg-sky-400/12 border border-sky-400/30 flex items-center justify-center text-sky-300 shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <h3 className="font-display font-bold text-white text-lg sm:text-xl leading-tight">
          {en}
        </h3>
        <p className={`text-sky-300/80 text-sm mt-0.5 ${isKh ? "font-khmer" : ""}`}>
          {kh}
        </p>
      </div>
    </div>
  );
}

export function ArtemisMissionsModule() {
  const { language } = useLanguageStore();
  const lang: Lang = language;
  const isKh = lang === "kh";

  return (
    <section
      id="artemis"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 scroll-mt-24"
      data-testid="section-artemis"
    >
      {/* Section label — matches the SpacePage SectionLabel style */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-sky-400/15 border border-sky-400/25 flex items-center justify-center text-sky-400">
            <Moon className="w-3.5 h-3.5" />
          </div>
          <span
            className={`text-xs font-bold tracking-widest text-sky-400 uppercase ${
              isKh ? "font-khmer tracking-normal" : ""
            }`}
          >
            {isKh ? "ការវិលត្រឡប់ទៅព្រះច័ន្ទ" : "Return to the Moon"}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-sky-400/20 to-transparent" />
      </div>

      {/* ── Hero card ─────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-10 mb-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 0%, rgba(148,163,184,0.18) 0%, transparent 60%)," +
            "linear-gradient(160deg, #050d1a 0%, #0a1628 50%, #020c1b 100%)",
        }}
      >
        {/* Lunar disc accent */}
        <div
          aria-hidden
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #e5e7eb 0%, #94a3b8 35%, #475569 70%, #1e293b 100%)",
            filter: "blur(0.5px)",
          }}
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 rounded-full px-4 py-1.5 mb-5 text-[11px] font-bold tracking-widest text-white/75 uppercase backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-sky-400" />
            {isKh ? "បេសកកម្មអវកាស" : "NASA Mission Series"}
          </div>
          <h2 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Return to the Moon:{" "}
            <span className="text-sky-400">The Artemis Missions</span>
          </h2>
          <p className="font-khmer text-white/85 text-xl sm:text-2xl mt-3 leading-snug">
            ការវិលត្រឡប់ទៅកាន់ព្រះច័ន្ទ៖{" "}
            <span className="text-sky-400">បេសកកម្ម Artemis</span>
          </p>
          <p className={`text-white/65 mt-5 max-w-2xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "បេសកកម្មរបស់ NASA ដើម្បីបញ្ជូនមនុស្សត្រឡប់ទៅព្រះច័ន្ទវិញ — លើកនេះ មិនត្រឹមតែទៅទស្សនាប៉ុណ្ណោះទេ ប៉ុន្តែដើម្បីស្នាក់នៅ និងរៀន។"
              : "NASA's program to send humans back to the Moon — and this time, not just to visit, but to stay and learn."}
          </p>
        </div>
      </div>

      {/* ── Section 1: The Purpose ──────────────────────────────── */}
      <div className="mb-12">
        <SectionHeading
          Icon={Target}
          en="The Purpose"
          kh="គោលបំណង"
          isKh={isKh}
        />

        {/* Apollo vs Artemis comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Flag className="w-4 h-4 text-white/50" />
              <h5 className="font-display font-bold text-white/90 text-base">
                Apollo (1969–1972)
              </h5>
            </div>
            <p className={`text-white/55 font-khmer text-xs mb-3`}>
              បេសកកម្ម Apollo (១៩៦៩–១៩៧២)
            </p>
            <p className="text-white/75 text-sm leading-relaxed">
              <span className="text-white font-semibold">Proving we could get there.</span>{" "}
              Six landings, twelve astronauts, a few days each on the surface — then we left.
            </p>
            <p className="font-khmer text-white/55 text-sm leading-loose mt-2">
              <span className="text-white/85 font-semibold">បញ្ជាក់ថាយើងអាចទៅដល់។</span>{" "}
              ការចុះចត ៦ ដង មនុស្ស ១២ នាក់ ស្នាក់នៅផ្ទៃព្រះច័ន្ទតែប៉ុន្មានថ្ងៃ — រួចហើយយើងចាកចេញ។
            </p>
          </div>

          <div
            className="rounded-2xl border border-sky-400/30 bg-gradient-to-br from-sky-400/[0.06] to-transparent p-5"
            style={{
              boxShadow:
                "0 0 0 1px rgba(56,189,248,0.15), 0 0 24px rgba(56,189,248,0.10)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Moon className="w-4 h-4 text-sky-300" />
              <h5 className="font-display font-bold text-white text-base">
                Artemis (2022–present)
              </h5>
            </div>
            <p className={`text-sky-300/80 font-khmer text-xs mb-3`}>
              បេសកកម្ម Artemis (២០២២–បច្ចុប្បន្ន)
            </p>
            <p className="text-white/85 text-sm leading-relaxed">
              <span className="text-sky-300 font-semibold">Learning how to stay.</span>{" "}
              A permanent base near the lunar south pole — humanity's first off-world neighborhood.
            </p>
            <p className="font-khmer text-white/65 text-sm leading-loose mt-2">
              <span className="text-sky-300 font-semibold">រៀនរបៀបស្នាក់នៅ។</span>{" "}
              មូលដ្ឋានអចិន្ត្រៃយ៍មួយក្បែរប៉ូលខាងត្បូងនៃព្រះច័ន្ទ — សង្កាត់ដំបូងបង្អស់របស់មនុស្សជាតិនៅក្រៅផែនដី។
            </p>
          </div>
        </div>

        {/* The bigger goal — Mars stepping stone */}
        <div
          className="rounded-2xl border border-amber-400/25 p-5 sm:p-6"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 100% 50%, rgba(251,146,60,0.08) 0%, transparent 70%)," +
              "linear-gradient(135deg, rgba(15,23,42,0.6), rgba(2,12,27,0.8))",
          }}
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-400/15 border border-amber-400/35 flex items-center justify-center text-amber-300 shrink-0">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                The Bigger Goal: The Moon as a Stepping Stone to Mars
              </h5>
              <p className="font-khmer text-amber-200/90 text-sm mt-1 leading-snug">
                គោលដៅធំជាង៖ ព្រះច័ន្ទជាជំហានឆ្ពោះទៅភពអង្គារ
              </p>
              <p className="text-white/75 text-sm leading-relaxed mt-3">
                A permanent lunar base is a <span className="text-amber-200 font-semibold">training ground</span>.
                Three days from Earth instead of seven months — engineers can practice life support,
                surface habitats, and refueling on the Moon before risking those same systems on the
                much longer journey to Mars.
              </p>
              <p className="font-khmer text-white/60 text-sm leading-loose mt-2">
                មូលដ្ឋានអចិន្ត្រៃយ៍លើព្រះច័ន្ទគឺជា <span className="text-amber-200 font-semibold">កន្លែងហាត់ហ្វឹក</span>។
                ចម្ងាយ ៣ ថ្ងៃពីផែនដី ជំនួសឱ្យ ៧ ខែ — វិស្វករអាចហាត់សមប្រព័ន្ធទ្រទ្រង់ជីវិត លំនៅផ្ទៃច័ន្ទ និងការបញ្ចូលឥន្ធនៈឡើងវិញនៅលើព្រះច័ន្ទ មុនពេលប្រឈមនឹងហានិភ័យលើដំណើរវែងជាងនេះទៅភពអង្គារ។
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: The Astronauts ───────────────────────────── */}
      <div className="mb-12">
        <SectionHeading
          Icon={Users}
          en="The Astronauts"
          kh="អវកាសយានិក"
          isKh={isKh}
        />

        <div
          className="rounded-2xl border border-white/10 p-5 sm:p-7"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.7) 0%, rgba(2,12,27,0.85) 100%)",
          }}
        >
          <p className="text-white/80 text-base leading-relaxed">
            Artemis is breaking new ground by{" "}
            <span className="text-sky-300 font-semibold">designing space for everyone</span>.
            The Artemis II crew, which launched on April 1, 2026, included the first woman and
            the first person of color ever to fly to the Moon.
          </p>
          <p className="font-khmer text-white/65 text-sm leading-loose mt-3">
            បេសកកម្ម Artemis កំពុងបើកផ្លូវថ្មី ដោយ <span className="text-sky-300 font-semibold">រៀបចំអវកាសសម្រាប់មនុស្សគ្រប់គ្នា</span>។
            ក្រុម Artemis II ដែលបានចេញដំណើរនៅថ្ងៃទី ១ មេសា ឆ្នាំ ២០២៦ បានរួមបញ្ចូលស្ត្រីដំបូងគេ និងមនុស្សស្បែកខ្មៅដំបូងគេ ដែលធ្វើដំណើរទៅព្រះច័ន្ទ។
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <div
              className="rounded-xl border border-fuchsia-400/30 bg-fuchsia-400/[0.05] p-4"
              style={{
                boxShadow: "0 0 24px rgba(232,121,249,0.10)",
              }}
            >
              <div className="text-[10px] font-bold tracking-widest text-fuchsia-300 uppercase mb-1.5">
                First Woman to the Moon
              </div>
              <div className="font-khmer text-[10px] text-fuchsia-300/80 mb-2">
                ស្ត្រីដំបូងគេទៅព្រះច័ន្ទ
              </div>
              <div className="text-white text-lg font-display font-bold">
                Christina Koch
              </div>
              <div className="text-white/55 text-xs mt-0.5">
                NASA Mission Specialist
              </div>
            </div>

            <div
              className="rounded-xl border border-sky-400/30 bg-sky-400/[0.05] p-4"
              style={{
                boxShadow: "0 0 24px rgba(56,189,248,0.10)",
              }}
            >
              <div className="text-[10px] font-bold tracking-widest text-sky-300 uppercase mb-1.5">
                First Person of Color to the Moon
              </div>
              <div className="font-khmer text-[10px] text-sky-300/80 mb-2">
                មនុស្សស្បែកខ្មៅដំបូងគេទៅព្រះច័ន្ទ
              </div>
              <div className="text-white text-lg font-display font-bold">
                Victor Glover
              </div>
              <div className="text-white/55 text-xs mt-0.5">
                NASA Pilot
              </div>
            </div>
          </div>

          <p className="text-white/55 text-xs mt-5 leading-relaxed">
            Joined by Commander <span className="text-white/80">Reid Wiseman</span> and Canadian
            Space Agency astronaut <span className="text-white/80">Jeremy Hansen</span> — the first
            non-American ever sent beyond low Earth orbit.
          </p>
        </div>
      </div>

      {/* ── Section 3: The Mission Timeline ─────────────────────── */}
      <div>
        <SectionHeading
          Icon={CalendarDays}
          en="The Mission Timeline"
          kh="កាលវិភាគបេសកកម្ម"
          isKh={isKh}
        />

        <p className={`text-white/60 text-sm mb-6 ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh
            ? "បេសកកម្មបញ្ចប់ហើយត្រូវបានបង្ហាញដោយព្រំដែនស្រពិចស្រពិល។ បេសកកម្មសកម្ម និងគ្រោងទុកមានព្រំដែនភ្លឺៗ — សញ្ញានៃអនាគតដែលនៅខាងមុខ។"
            : "Completed missions are shown with muted borders. Active and planned missions have a subtle glow — a marker for the future ahead."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MISSIONS.map((m) => (
            <MissionCard key={m.id} m={m} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
