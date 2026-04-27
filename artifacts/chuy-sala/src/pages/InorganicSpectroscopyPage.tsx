import { Link } from "wouter";
import {
  ArrowLeft,
  Activity,
  Camera,
  Sun,
  Magnet,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Inorganic Chemistry 101 · Module 07
 * Spectroscopy & Characterization
 *   — វិសាលគមវិទ្យា និងការកំណត់លក្ខណៈ
 * Soft cyan / teal accents to match the curriculum-hub card.
 * ══════════════════════════════════════════════════════════════════════════ */

export function InorganicSpectroscopyPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50/70 to-background py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href="/science/chemistry/inorganic"
          data-testid="link-back-to-inorganic"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t(
            "Back to Inorganic Chemistry 101",
            "ត្រឡប់ទៅគីមីវិទ្យាអសរីរាង្គ ១០១",
          )}
        </Link>

        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="mb-8 sm:mb-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ring-cyan-200">
              <Activity className="w-7 h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block text-[10px] font-bold tracking-widest uppercase text-cyan-700 opacity-80 mb-1 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t(
                  "Module 07 · Inorganic Chemistry",
                  "មុខវិជ្ជា ០៧ · គីមីវិទ្យាអសរីរាង្គ",
                )}
              </span>
              <h1
                id="spectroscopy-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-900 ${
                  kh ? "font-khmer leading-snug" : ""
                }`}
              >
                {t(
                  "Spectroscopy & Characterization",
                  "វិសាលគមវិទ្យា និងការកំណត់លក្ខណៈ",
                )}
              </h1>
            </div>
          </div>
          <p
            className={`text-base sm:text-lg text-foreground/80 leading-relaxed max-w-3xl ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Atoms are far too small to see with even the most powerful microscope. So how does any chemist know what a molecule actually looks like? They shine invisible light on it — and listen for the answer the molecule shines back.",
              "អាតូមតូចពេកមើលមិនឃើញទេ ទោះបីជាមីក្រូទស្សន៍ដ៏ខ្លាំងបំផុតក៏ដោយ។ ដូច្នេះតើអ្នកគីមីវិទ្យាដឹងថាម៉ូលេគុលមើលទៅដូចអ្វីយ៉ាងម៉េច? ពួកគេបាញ់ពន្លឺមើលមិនឃើញលើវា — ហើយស្តាប់ចម្លើយដែលម៉ូលេគុលឆ្លុះត្រឡប់មកវិញ។",
            )}
          </p>
        </header>

        {/* ── Taking a Photograph of an Atom · intro card ────────── */}
        <section
          data-testid="section-photograph-atom"
          aria-labelledby="photograph-title"
          className="mb-8 rounded-2xl border-2 border-cyan-200 bg-white p-5 sm:p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow ring-2 ring-cyan-200"
              aria-hidden="true"
            >
              <Camera className="w-5 h-5" strokeWidth={2.25} />
            </span>
            <div className="flex-1 min-w-0">
              <h2
                id="photograph-title"
                className={`text-lg sm:text-xl font-bold leading-tight text-cyan-900 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t(
                  "Taking a Photograph of an Atom",
                  "ការថតរូបអាតូម",
                )}
              </h2>
              <p
                className={`text-xs font-semibold text-cyan-700/80 mt-0.5 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t(
                  "Different invisible lights for different questions",
                  "ពន្លឺមើលមិនឃើញខុសៗគ្នាសម្រាប់សំណួរខុសៗគ្នា",
                )}
              </p>
            </div>
          </div>

          {/* Electromagnetic spectrum strip — shows where each technique probes */}
          <div
            aria-hidden="true"
            className="mb-4 rounded-lg border border-cyan-200 bg-white p-3"
          >
            <div className="relative">
              {/* gradient rainbow band — full multi-stop via arbitrary CSS
                  (Tailwind's `via-*` only honors one stop per gradient) */}
              <div
                className="h-6 rounded-md shadow-inner bg-[linear-gradient(to_right,#7c3aed_0%,#3b82f6_15%,#22d3ee_30%,#34d399_45%,#facc15_60%,#f97316_75%,#e11d48_88%,#334155_100%)]"
              />
              {/* labels under the band */}
              <div className="grid grid-cols-5 mt-1 text-[8px] font-bold uppercase tracking-wider text-slate-600">
                <span className="text-center">UV</span>
                <span className="text-center">Visible</span>
                <span className="text-center">IR</span>
                <span className="text-center">Microwave</span>
                <span className="text-center">Radio</span>
              </div>
              {/* technique markers */}
              <div className="grid grid-cols-5 mt-1.5 text-[9px] font-bold">
                <span className="text-center text-cyan-700">UV-Vis ▲</span>
                <span className="text-center text-cyan-700">UV-Vis ▲</span>
                <span className="text-center text-slate-400">—</span>
                <span className="text-center text-slate-400">—</span>
                <span className="text-center text-cyan-700">NMR ▲</span>
              </div>
            </div>
          </div>

          <p
            className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Spectroscopy is the chemist's way of taking a photograph of something they cannot see. The trick is that every type of invisible light — ultraviolet, visible, infrared, microwave, radio — interacts with molecules in a different way. Shine the right light on a sample, measure exactly which wavelengths it absorbs and which it lets through, and the pattern you get back tells you what that molecule is, what it is made of, and even how its atoms are arranged in space.",
              "វិសាលគមវិទ្យាជាវិធីរបស់អ្នកគីមីដើម្បីថតរូបអ្វីដែលពួកគេមើលមិនឃើញ។ ល្បិចគឺថាប្រភេទពន្លឺមើលមិនឃើញនីមួយៗ — អ៊ុលត្រាវីយូឡេ មើលឃើញ អ៊ីនហ្វ្រាក្រហម មីក្រូវ៉េវ វិទ្យុ — មានអន្តរកម្មជាមួយម៉ូលេគុលតាមរបៀបខុសៗគ្នា។ បាញ់ពន្លឺត្រឹមត្រូវលើសំណាក វាស់ពិតប្រាកដនូវរលកវែងណាមួយដែលវាស្រូប និងណាមួយដែលវាអនុញ្ញាតឱ្យហុចចេញ ហើយលំនាំដែលអ្នកទទួលបានត្រឡប់មកប្រាប់អ្នកថាម៉ូលេគុលនោះជាអ្វី វាត្រូវបានបង្កើតឡើងពីអ្វី និងសូម្បីតែរបៀបដែលអាតូមរបស់វាត្រូវបានរៀបចំក្នុងលំហ។",
            )}
          </p>
        </section>

        {/* ── Two technique cards · CSS Grid · soft cyan/teal ────── */}
        <h2
          className={`text-base sm:text-lg font-bold text-cyan-900 mb-3 ${
            kh ? "font-khmer" : ""
          }`}
        >
          {t(
            "Two essential techniques",
            "បច្ចេកទេសសំខាន់ពីរ",
          )}
        </h2>
        <div
          role="list"
          aria-label="Spectroscopy techniques · បច្ចេកទេសវិសាលគមវិទ្យា"
          data-testid="grid-concept-cards"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
        >
          {/* ─── Card 1 · UV-Visible Spectroscopy ──────────────── */}
          <article
            role="listitem"
            data-testid="card-uv-vis"
            className="rounded-2xl border-2 border-cyan-200 bg-cyan-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow ring-2 ring-cyan-200"
                aria-hidden="true"
              >
                <Sun className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base sm:text-lg font-bold leading-tight text-cyan-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "UV-Visible Spectroscopy",
                    "វិសាលគមមើលឃើញអ៊ុលត្រាវីយូឡេ",
                  )}
                </h3>
                <p
                  className={`text-xs font-semibold text-cyan-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Why a copper solution looks blue",
                    "ហេតុអ្វីដំណោះស្រាយទង់ដែងមើលទៅខៀវ",
                  )}
                </p>
              </div>
            </div>

            {/* Tiny visual: white light → copper-blue solution → blue light out */}
            <div
              aria-hidden="true"
              className="relative h-20 mb-3 rounded-lg bg-gradient-to-r from-slate-50 to-cyan-50 border border-cyan-200 flex items-center justify-center overflow-hidden gap-2 px-3"
            >
              {/* white light bulb in */}
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-yellow-500 text-2xl leading-none">☀</span>
                <span className="text-[8px] font-bold uppercase text-slate-500 tracking-wider">
                  {t("white", "ស")}
                </span>
              </div>
              <span className="text-cyan-700 text-base font-bold">→</span>
              {/* sample tube */}
              <div className="relative w-7 h-12 rounded-md bg-gradient-to-b from-sky-300 to-cyan-500 ring-2 ring-white shadow-md flex items-end justify-center pb-1">
                <span className="text-[8px] font-bold text-white">Cu</span>
              </div>
              <span className="text-cyan-700 text-base font-bold">→</span>
              {/* blue light out */}
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-cyan-500 text-2xl leading-none">☀</span>
                <span className="text-[8px] font-bold uppercase text-cyan-600 tracking-wider">
                  {t("blue", "ខៀវ")}
                </span>
              </div>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "When you shine a white light through a chemical, the electrons inside that chemical absorb some colors of light and let the rest pass through. Whatever colors come out the other side are the colors your eyes see. A copper sulfate solution looks bright blue for exactly this reason — the copper ions absorb the red and yellow parts of the light, and only the blue makes it to your eye. Measuring which colors get absorbed lets us identify what chemical is in a sample, and how much of it is there.",
                "នៅពេលអ្នកបាញ់ពន្លឺសផ្ទះតាមរយៈសារធាតុគីមី អេឡិចត្រុងនៅខាងក្នុងសារធាតុនោះស្រូបពណ៌ខ្លះនៃពន្លឺ ហើយអនុញ្ញាតឱ្យពណ៌ឯទៀតហុចចេញ។ ពណ៌ណាមួយដែលហុចចេញម្ខាងទៀតគឺជាពណ៌ដែលភ្នែករបស់អ្នកមើលឃើញ។ ដំណោះស្រាយស៊ុលហ្វាតទង់ដែងមើលទៅខៀវភ្លឺច្បាស់ដោយសារហេតុនេះច្បាស់ — អ៊ីយ៉ុងទង់ដែងស្រូបផ្នែកក្រហម និងលឿងនៃពន្លឺ ហើយមានតែខៀវប៉ុណ្ណោះដែលមកដល់ភ្នែករបស់អ្នក។ ការវាស់ពណ៌ដែលត្រូវបានស្រូបអនុញ្ញាតឱ្យយើងកំណត់សារធាតុគីមីនៅក្នុងសំណាក និងបរិមាណរបស់វា។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-cyan-800 bg-white/60 border border-cyan-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Everyday clue:", "តម្រុយប្រចាំថ្ងៃ៖")}{" "}
              <span className="font-normal">
                {t(
                  "Copper sulfate (Cu²⁺) blue · iron rust (Fe³⁺) orange · permanganate (MnO₄⁻) purple.",
                  "ស៊ុលហ្វាតទង់ដែង (Cu²⁺) ខៀវ · ច្រេះដែក (Fe³⁺) ទឹកក្រូច · ប៉ាមង់ហ្គាណាត (MnO₄⁻) ស្វាយ។",
                )}
              </span>
            </p>
          </article>

          {/* ─── Card 2 · NMR (Nuclear Magnetic Resonance) ─────── */}
          <article
            role="listitem"
            data-testid="card-nmr"
            className="rounded-2xl border-2 border-teal-200 bg-teal-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow ring-2 ring-teal-200"
                aria-hidden="true"
              >
                <Magnet className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base sm:text-lg font-bold leading-tight text-teal-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Nuclear Magnetic Resonance",
                    "អនុភាពម៉ាញេទិកនុយក្លេអ៊ែរ",
                  )}
                </h3>
                <p
                  className={`text-xs font-semibold text-teal-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "NMR · the same machine as a hospital MRI",
                    "NMR · ម៉ាស៊ីនដូចគ្នានឹង MRI ក្នុងមន្ទីរពេទ្យ",
                  )}
                </p>
              </div>
            </div>

            {/* Tiny visual: U-shaped magnet with molecule inside + radio echo */}
            <div
              aria-hidden="true"
              className="relative h-20 mb-3 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 flex items-center justify-center overflow-hidden gap-3"
            >
              {/* U-magnet with molecule inside */}
              <div className="relative w-20 h-14">
                {/* magnet legs */}
                <div className="absolute top-0 left-1 w-3 h-12 bg-gradient-to-b from-rose-500 to-rose-700 rounded-t-md ring-1 ring-white shadow-sm" />
                <div className="absolute top-0 right-1 w-3 h-12 bg-gradient-to-b from-slate-500 to-slate-700 rounded-t-md ring-1 ring-white shadow-sm" />
                {/* magnet base */}
                <div className="absolute bottom-0 left-1 right-1 h-3 bg-slate-600 rounded-b-md ring-1 ring-white shadow-sm" />
                {/* N/S pole labels */}
                <span className="absolute top-1 left-1.5 text-[7px] font-bold text-white">
                  N
                </span>
                <span className="absolute top-1 right-1.5 text-[7px] font-bold text-white">
                  S
                </span>
                {/* molecule between the poles */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 ring-2 ring-white shadow-md text-[7px] font-bold text-white flex items-center justify-center">
                  H
                </span>
              </div>
              {/* radio echo arcs */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-cyan-700 text-base font-bold leading-none">
                  ))) 
                </span>
                <span className="text-[8px] font-bold uppercase tracking-wider text-cyan-700">
                  {t("echo", "សំឡេងបន្ទរ")}
                </span>
              </div>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "NMR uses exactly the same physics as the MRI machine in a hospital. We slide the molecule into a giant magnet, hit it with radio waves, and listen for the tiny echo each atom sends back. Every kind of atom, in every kind of position inside a molecule, sings back at a slightly different pitch — so by listening to the chord that comes out, a chemist can rebuild the whole 3D shape of the molecule, atom by atom.",
                "NMR ប្រើរូបវិទ្យាដូចគ្នាបេះបិទនឹងម៉ាស៊ីន MRI នៅមន្ទីរពេទ្យ។ យើងដាក់ម៉ូលេគុលចូលក្នុងម៉ាញ៉េតយក្ស បាញ់វាដោយរលកវិទ្យុ ហើយស្តាប់សំឡេងបន្ទរតូចៗដែលអាតូមនីមួយៗបញ្ជូនត្រឡប់មកវិញ។ អាតូមគ្រប់ប្រភេទ នៅគ្រប់ទីតាំងនៅខាងក្នុងម៉ូលេគុល ច្រៀងត្រឡប់មកវិញនៅសំឡេងខុសៗគ្នាបន្តិចបន្តួច — ដូច្នេះដោយការស្តាប់ភ្លេងដែលហុចចេញ អ្នកគីមីអាចសង់ឡើងវិញនូវរូបរាងបីវិមាត្រទាំងមូលនៃម៉ូលេគុល អាតូមម្តងមួយ។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-teal-800 bg-white/60 border border-teal-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Hospital link:", "ការតភ្ជាប់ជាមួយមន្ទីរពេទ្យ៖")}{" "}
              <span className="font-normal">
                {t(
                  "MRI scans use NMR signals from the hydrogen atoms in your body's water and fat.",
                  "ការវាយតម្លៃ MRI ប្រើសញ្ញា NMR ពីអាតូមអ៊ីដ្រូសែននៅក្នុងទឹក និងខ្លាញ់នៃរាងកាយអ្នក។",
                )}
              </span>
            </p>
          </article>
        </div>

        {/* ── Putting it together strip ──────────────────────────── */}
        <div className="mt-8 rounded-2xl border-2 border-cyan-200 bg-white p-5 sm:p-6 shadow-sm">
          <h2
            className={`text-base sm:text-lg font-bold text-cyan-900 mb-3 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t(
              "Why it matters in real life",
              "ហេតុអ្វីវាសំខាន់ក្នុងជីវិតពិត",
            )}
          </h2>
          <p
            className={`text-sm sm:text-base text-foreground/85 leading-relaxed ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Without spectroscopy, modern chemistry would be blind. Every new medicine, every food safety test, every quality check at a factory, every art forgery investigation, every Mars rover scanning Martian rock — they all rely on hitting a sample with light and reading its reply. The same trick the doctor uses to look inside your body with an MRI is the trick a chemist uses to look inside a molecule.",
              "បើគ្មានវិសាលគមវិទ្យាទេ គីមីវិទ្យាទំនើបនឹងងងឹត។ ឱសថថ្មីនីមួយៗ ការធ្វើតេស្តសុវត្ថិភាពអាហារនីមួយៗ ការត្រួតពិនិត្យគុណភាពរោងចក្រនីមួយៗ ការស៊ើបអង្កេតកេងបន្លំស្នាដៃសិល្បៈនីមួយៗ រ៉ូបឺតយានទំ Mars នីមួយៗដែលស្កេនថ្មនៅលើភពអង្គារ — ពួកគេទាំងអស់ពឹងផ្អែកលើការបាញ់ពន្លឺលើសំណាក និងអានចម្លើយរបស់វា។ ល្បិចដូចគ្នាដែលគ្រូពេទ្យប្រើដើម្បីមើលខាងក្នុងរាងកាយអ្នកដោយ MRI គឺជាល្បិចដែលអ្នកគីមីប្រើដើម្បីមើលខាងក្នុងម៉ូលេគុល។",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
