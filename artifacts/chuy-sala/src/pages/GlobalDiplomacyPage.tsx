import type { ComponentType, ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Globe,
  Handshake,
  Building2,
  Landmark,
  Bird,
  ScrollText,
  FileText,
  Languages,
  Users,
  Sparkles,
  HeartHandshake,
  MessageSquare,
  Flag,
  Heart,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Global Diplomacy: International Relations
 * ការទូតសកល៖ ទំនាក់ទំនងអន្តរជាតិ
 * Module: Study Center
 * Aesthetic: formal & diplomatic — navy blues, gold accents, globe/flag motifs.
 * ══════════════════════════════════════════════════════════════════════════ */

export function GlobalDiplomacyPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100 py-8 sm:py-10 px-4 sm:px-6 relative overflow-hidden"
      data-testid="global-diplomacy-page"
    >
      {/* Diplomatic ambience */}
      <DiplomaticBackdrop />

      <div className="relative max-w-5xl mx-auto">
        {/* ── Back link ──────────────────────────────────────────── */}
        <Link
          href="/study-center/global-conflicts"
          data-testid="link-back-study-center"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200 transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Study Center", "ត្រឡប់ទៅមជ្ឈមណ្ឌលសិក្សា")}
        </Link>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <header className="mb-10 sm:mb-12" data-testid="hero">
          <div className="flex items-start gap-4 mb-5">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 shadow-lg ring-2 ring-amber-400/60 flex items-center justify-center">
                <Globe className="w-8 h-8 sm:w-9 sm:h-9 text-amber-300" strokeWidth={2.25} />
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 border-2 border-slate-900 flex items-center justify-center shadow">
                <Star className="w-3.5 h-3.5 text-slate-900" strokeWidth={3} fill="currentColor" />
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold tracking-[0.25em] uppercase text-amber-300 mb-1.5">
                <Landmark className="w-3 h-3" />
                <span>Study Center · Diplomacy & Statecraft</span>
                <span className="opacity-50" aria-hidden>·</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-amber-300">
                  មជ្ឈមណ្ឌលសិក្សា · ការទូត និងគ្រប់គ្រងរដ្ឋ
                </span>
              </span>
              <h1
                id="diplomacy-title"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
                data-testid="page-title"
              >
                <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">
                  Global Diplomacy:
                </span>{" "}
                <span className="text-white">International Relations</span>
              </h1>
              <p
                className="font-khmer text-lg sm:text-xl md:text-2xl text-slate-100 leading-snug mt-2"
                data-testid="page-title-kh"
              >
                <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">
                  ការទូតសកល៖
                </span>{" "}
                <span>ទំនាក់ទំនងអន្តរជាតិ</span>
              </p>
            </div>
          </div>

          {/* Gold separator */}
          <div className="my-5 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

          <p
            className={`text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Every flag at the United Nations represents a country that has chosen to talk instead of fight. Diplomacy is the quiet art that decides whether a disagreement becomes a treaty — or a war.",
              "ទង់ជាតិនីមួយៗនៅអង្គការសហប្រជាជាតិ តំណាងឱ្យប្រទេសមួយដែលបានជ្រើសរើសនិយាយ ជំនួសឱ្យការប្រយុទ្ធ។ ការទូតគឺជាសិល្បៈស្ងាត់ស្ងៀមដែលសម្រេចថាការមិនយល់ស្របមួយ ក្លាយជាសន្ធិសញ្ញា — ឬជាសង្គ្រាម។",
            )}
          </p>
        </header>

        {/* ── Section 1: What are Foreign Relations? ──────────────── */}
        <Section
          number={1}
          icon={Globe}
          tone="navy"
          titleEn="What are Foreign Relations?"
          titleKh="តើទំនាក់ទំនងការបរទេសគឺជាអ្វី?"
          subtitleEn="The system by which nations talk, trade, and disagree — without fighting"
          subtitleKh="ប្រព័ន្ធដែលប្រជាជាតិនិយាយ ជួញដូរ និងមិនយល់ស្រប — ដោយមិនប្រយុទ្ធ"
          dataTestid="section-what"
        >
          {/* Definition card */}
          <DiplomaticCard tone="navy">
            <div className="flex items-start gap-3 mb-4">
              <DiplomaticBadge icon={MessageSquare} tone="navy" />
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-amber-200 leading-tight">
                  The Definition
                </h3>
                <h4 className="font-khmer text-sm sm:text-base text-amber-200 leading-snug">
                  និយមន័យ
                </h4>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              <BL
                en="Foreign relations is the system by which different countries communicate, trade, and resolve conflicts without resorting to war. It includes presidents on phone calls, ambassadors at dinners, signed treaties, trade agreements, and quiet messages passed in private rooms long before anything reaches the news."
                kh="ទំនាក់ទំនងការបរទេសគឺជាប្រព័ន្ធដែលប្រទេសផ្សេងៗ ទាក់ទងគ្នា ជួញដូរ និងដោះស្រាយជម្លោះ ដោយមិនអនុវត្តសង្គ្រាម។ វារួមមានប្រធានាធិបតីហៅទូរស័ព្ទ ឯកអគ្គរដ្ឋទូតនៅពិធីសាយោជន៍ សន្ធិសញ្ញាដែលបានចុះហត្ថលេខា កិច្ចព្រមព្រៀងពាណិជ្ជកម្ម និងសារស្ងាត់ដែលផ្ញើនៅក្នុងបន្ទប់ឯកជន មុនពេលអ្វីៗឡើងព័ត៌មាន។"
              />
            </p>
          </DiplomaticCard>

          {/* No nation alone */}
          <DiplomaticCard tone="navy" className="mt-4">
            <div className="flex items-start gap-3 mb-4">
              <DiplomaticBadge icon={HeartHandshake} tone="navy" />
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-amber-200 leading-tight">
                  No Nation Survives Alone
                </h3>
                <h4 className="font-khmer text-sm sm:text-base text-amber-200 leading-snug">
                  គ្មានប្រជាជាតិណារស់រានដោយឯកា
                </h4>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-4">
              <BL
                en="In a globally connected world, no country is an island. Every nation depends on its neighbours and on distant trading partners. Countries must negotiate treaties for the things that cross borders — water, trade, and weather:"
                kh="នៅក្នុងពិភពលោកដែលតភ្ជាប់សកល គ្មានប្រទេសណាមួយជាកោះឯករាជ្យទេ។ ប្រជាជាតិទាំងអស់ ពឹងផ្អែកលើអ្នកជិតខាង និងលើដៃគូពាណិជ្ជកម្មឆ្ងាយ។ ប្រទេសត្រូវចរចាសន្ធិសញ្ញាសម្រាប់រឿងដែលឆ្លងព្រំដែន — ទឹក ពាណិជ្ជកម្ម និងអាកាសធាតុ៖"
              />
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <NeedCard
                icon={WaterTreaty}
                labelEn="Shared water resources"
                labelKh="ធនធានទឹករួម"
                bodyEn="Cambodia, Laos, Thailand, and Vietnam share the Mekong. Every dam upstream affects every farmer downstream — only treaties keep the water flowing fairly."
                bodyKh="កម្ពុជា ឡាវ ថៃ និងវៀតណាម ចែករំលែកទន្លេមេគង្គ។ ទំនប់នីមួយៗនៅលើអាងផ្លូវ ប៉ះពាល់ដល់កសិករនីមួយៗនៅខាងក្រោម — មានតែសន្ធិសញ្ញាប៉ុណ្ណោះដែលរក្សាទឹកឱ្យហូរយ៉ាងយុត្តិធម៌។"
              />
              <NeedCard
                icon={ScrollText}
                labelEn="International trade"
                labelKh="ពាណិជ្ជកម្មអន្តរជាតិ"
                bodyEn="The phone in your hand was assembled in three countries from parts mined in five more. Trade agreements decide which goods cross which border at what price."
                bodyKh="ទូរស័ព្ទនៅដៃអ្នក ត្រូវបានដំឡើងក្នុងបីប្រទេសពីផ្នែកដែលជីកនៅប្រាំទៀត។ កិច្ចព្រមព្រៀងពាណិជ្ជកម្ម សម្រេចថាទំនិញមួយណាឆ្លងព្រំដែនមួយណានៅតម្លៃប៉ុន្មាន។"
              />
              <NeedCard
                icon={Globe}
                labelEn="Climate change"
                labelKh="ការប្រែប្រួលអាកាសធាតុ"
                bodyEn="A factory's smoke in one country becomes flooding in another. The atmosphere has no border — only a global agreement can protect it."
                bodyKh="ផ្សែងរោងចក្រនៅប្រទេសមួយ ក្លាយជាទឹកជំនន់នៅប្រទេសមួយទៀត។ បរិយាកាសគ្មានព្រំដែន — មានតែកិច្ចព្រមព្រៀងសកលទើបអាចការពារវាបាន។"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 italic mt-4 leading-relaxed">
              <BL
                en="(Trade ties directly back to our Economics module — every treaty is also an economic equation.)"
                kh="(ពាណិជ្ជកម្មភ្ជាប់ដោយផ្ទាល់ត្រឡប់ទៅម៉ូឌុលសេដ្ឋកិច្ចរបស់យើង — សន្ធិសញ្ញានីមួយៗ ក៏ជាសមីការសេដ្ឋកិច្ច។)"
              />
            </p>
          </DiplomaticCard>
        </Section>

        {/* ── Section 2: Embassies and Ambassadors ─────────────────── */}
        <Section
          number={2}
          icon={Building2}
          tone="navy"
          titleEn="Embassies and Ambassadors"
          titleKh="ស្ថានទូត និងឯកអគ្គរដ្ឋទូត"
          subtitleEn="A 'mini-country' inside a foreign nation — and the official voice of its leader"
          subtitleKh="«ប្រទេសតូច» នៅខាងក្នុងប្រជាជាតិបរទេស — និងជាសំឡេងផ្លូវការនៃមេដឹកនាំខ្លួន"
          dataTestid="section-embassies"
        >
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-5">
            {/* Embassy */}
            <DiplomaticCard tone="navy">
              <div className="flex items-start gap-3 mb-4">
                <DiplomaticBadge icon={Building2} tone="navy" />
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-300 inline-flex flex-wrap gap-x-2">
                    <span>Definition</span>
                    <span className="opacity-50" aria-hidden>·</span>
                    <span className="font-khmer normal-case tracking-normal">និយមន័យ</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-amber-200 leading-tight mt-0.5">
                    The Embassy
                  </h3>
                  <h4 className="font-khmer text-base sm:text-lg text-amber-200 leading-snug">
                    ស្ថានទូត
                  </h4>
                </div>
              </div>

              {/* Mini-country illustration */}
              <EmbassyIllustration />

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed mt-4">
                <BL
                  en="An embassy is like a 'mini-country' planted inside a foreign nation. By international law, the soil it sits on is treated as if it belonged to the home country, with its own flag flying, its own laws inside the gates, and the host country's police forbidden from entering without permission."
                  kh="ស្ថានទូតគឺដូចជា «ប្រទេសតូច» ដែលដាំនៅខាងក្នុងប្រជាជាតិបរទេស។ តាមច្បាប់អន្តរជាតិ ដីដែលស្ថានទូតស្ថិតនៅ ត្រូវចាត់ទុកដូចជាជាកម្មសិទ្ធិរបស់ប្រទេសម្ចាស់ផ្ទះ ដោយមានទង់ជាតិផ្ទាល់ខ្លួនបក់ ច្បាប់ផ្ទាល់ខ្លួននៅខាងក្នុងទ្វារ ហើយប៉ូលីសប្រទេសម្ចាស់ផ្ទះត្រូវហាមឃាត់ចូល ដោយគ្មានការអនុញ្ញាត។"
                />
              </p>

              <div className="mt-4 space-y-2">
                <DutyRow
                  icon={ShieldCheck}
                  textEn="A safe headquarters where diplomats live and work"
                  textKh="ទីស្នាក់ការកណ្តាលសុវត្ថិភាព ដែលអ្នកការទូតរស់នៅ និងធ្វើការ"
                />
                <DutyRow
                  icon={FileText}
                  textEn="Issues passports and visas to citizens abroad"
                  textKh="ចេញលិខិតឆ្លងដែន និងទិដ្ឋាការដល់ប្រជាពលរដ្ឋនៅបរទេស"
                />
                <DutyRow
                  icon={Heart}
                  textEn="Helps citizens who lose their passport, get sick, or land in jail while travelling"
                  textKh="ជួយប្រជាពលរដ្ឋដែលបាត់លិខិតឆ្លងដែន ឈឺ ឬជាប់ឃុំខ្លួន ពេលធ្វើដំណើរ"
                />
              </div>
            </DiplomaticCard>

            {/* Ambassador */}
            <DiplomaticCard tone="navy">
              <div className="flex items-start gap-3 mb-4">
                <DiplomaticBadge icon={Users} tone="navy" />
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-300 inline-flex flex-wrap gap-x-2">
                    <span>Definition</span>
                    <span className="opacity-50" aria-hidden>·</span>
                    <span className="font-khmer normal-case tracking-normal">និយមន័យ</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-amber-200 leading-tight mt-0.5">
                    The Ambassador
                  </h3>
                  <h4 className="font-khmer text-base sm:text-lg text-amber-200 leading-snug">
                    ឯកអគ្គរដ្ឋទូត
                  </h4>
                </div>
              </div>

              {/* Ambassador illustration */}
              <AmbassadorIllustration />

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed mt-4">
                <BL
                  en="An ambassador is the highest-ranking official representing their home country's government inside another nation. They are the official voice of their leader — when an ambassador speaks, the host country hears it as if the president or king were speaking themselves."
                  kh="ឯកអគ្គរដ្ឋទូតគឺជាមន្ត្រីដែលមានឋានៈខ្ពស់បំផុត តំណាងឱ្យរដ្ឋាភិបាលនៃប្រទេសខ្លួនឯងនៅខាងក្នុងប្រជាជាតិមួយទៀត។ ពួកគេគឺជាសំឡេងផ្លូវការនៃមេដឹកនាំរបស់ខ្លួន — ពេលឯកអគ្គរដ្ឋទូតនិយាយ ប្រទេសម្ចាស់ផ្ទះស្ដាប់វាដូចជាប្រធានាធិបតី ឬព្រះមហាក្សត្រកំពុងតែនិយាយដោយខ្លួនឯង។"
                />
              </p>

              <div className="mt-4 space-y-2">
                <DutyRow
                  icon={Handshake}
                  textEn="Negotiates directly with the host country's government"
                  textKh="ចរចាដោយផ្ទាល់ជាមួយរដ្ឋាភិបាលនៃប្រទេសម្ចាស់ផ្ទះ"
                />
                <DutyRow
                  icon={ScrollText}
                  textEn="Signs treaties and delivers official messages from their head of state"
                  textKh="ចុះហត្ថលេខាលើសន្ធិសញ្ញា និងបញ្ជូនសារផ្លូវការពីប្រមុខរដ្ឋរបស់ខ្លួន"
                />
                <DutyRow
                  icon={Star}
                  textEn="Hosts state dinners and represents their nation at official events"
                  textKh="រៀបចំអាហារយប់រដ្ឋ និងតំណាងឱ្យប្រជាជាតិរបស់ខ្លួនក្នុងព្រឹត្តិការណ៍ផ្លូវការ"
                />
              </div>
            </DiplomaticCard>
          </div>
        </Section>

        {/* ── Section 3: Bridging the Gap ─────────────────────────── */}
        <Section
          number={3}
          icon={Bird}
          tone="navy"
          titleEn="Bridging the Gap"
          titleKh="ការផ្សារភ្ជាប់គម្លាត"
          subtitleEn="Soft power, cultural exchange, and the human side of peace"
          subtitleKh="អំណាចទន់ ការផ្លាស់ប្តូរវប្បធម៌ និងផ្នែកមនុស្សនៃសន្តិភាព"
          dataTestid="section-bridging"
        >
          {/* Inspiring highlight box */}
          <div
            className="relative rounded-3xl overflow-hidden border-4 border-amber-400 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 p-5 sm:p-7 shadow-[0_0_36px_rgba(251,191,36,0.18)]"
            data-testid="soft-power-highlight"
          >
            {/* Gold trim */}
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500"
            />
            <div
              aria-hidden
              className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500"
            />

            <div className="flex items-start gap-4 mb-5 mt-1">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-amber-200">
                <Bird className="w-7 h-7" strokeWidth={2.25} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 px-3 py-1 rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold uppercase tracking-[0.25em] mb-2 shadow">
                  <span>Soft Power</span>
                  <span className="opacity-70" aria-hidden>·</span>
                  <span className="font-khmer normal-case tracking-normal">អំណាចទន់</span>
                </span>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-amber-200 leading-tight">
                  Bridges Built by People, Not Papers
                </h3>
                <h4 className="font-khmer text-base sm:text-lg md:text-xl text-amber-200 leading-snug mt-1">
                  ស្ពានសាងសង់ដោយមនុស្ស មិនមែនក្រដាស
                </h4>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-100 leading-relaxed mb-5">
              <BL
                en="Bridging the gap between nations is not just about politicians signing papers in marble halls. It is about human connection. When citizens of different countries learn each other's languages, share technology, study at each other's universities, or volunteer to teach in another's schools, they build a foundation of mutual trust. That trust is what makes lasting global peace possible — long after any single treaty is signed and forgotten."
                kh="ការផ្សារភ្ជាប់គម្លាតរវាងប្រជាជាតិ មិនមែនគ្រាន់តែជារឿងអ្នកនយោបាយចុះហត្ថលេខាលើក្រដាសនៅក្នុងសាលថ្មសម្បត្តិទេ។ វាគឺជារឿងនៃការតភ្ជាប់របស់មនុស្ស។ ពេលប្រជាពលរដ្ឋនៃប្រទេសផ្សេងៗរៀនភាសារបស់គ្នាទៅវិញទៅមក ចែករំលែកបច្ចេកវិទ្យា សិក្សានៅសកលវិទ្យាល័យរបស់គ្នា ឬស្ម័គ្រចិត្តបង្រៀននៅសាលារបស់គ្នា ពួកគេសាងសង់មូលដ្ឋាននៃការទុកចិត្តគ្នាទៅវិញទៅមក។ ការទុកចិត្តនោះគឺជាអ្វីដែលធ្វើឱ្យសន្តិភាពសកលស្ថិតស្ថេរ អាចទៅរួច — យូរបន្ទាប់ពីសន្ធិសញ្ញាណាមួយត្រូវបានចុះហត្ថលេខា និងបំភ្លេច។"
              />
            </p>

            {/* Soft power examples */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <SoftPowerCard
                icon={Languages}
                labelEn="Learning languages"
                labelKh="ការរៀនភាសា"
              />
              <SoftPowerCard
                icon={Sparkles}
                labelEn="Sharing technology"
                labelKh="ការចែករំលែកបច្ចេកវិទ្យា"
              />
              <SoftPowerCard
                icon={Users}
                labelEn="Student exchange"
                labelKh="ការផ្លាស់ប្តូរនិស្សិត"
              />
              <SoftPowerCard
                icon={HeartHandshake}
                labelEn="Volunteer teaching"
                labelKh="ការបង្រៀនស្ម័គ្រចិត្ត"
              />
            </div>

            {/* Closing line */}
            <div className="mt-5 pt-5 border-t border-amber-400/30 text-center">
              <p className="text-sm sm:text-base text-amber-200 italic font-semibold leading-relaxed">
                <BL
                  en="Treaties keep the peace for a year. A friendship between two students keeps the peace for a generation."
                  kh="សន្ធិសញ្ញារក្សាសន្តិភាពមួយឆ្នាំ។ មិត្តភាពរវាងនិស្សិតពីរនាក់ រក្សាសន្តិភាពមួយជំនាន់។"
                />
              </p>
            </div>
          </div>
        </Section>

        {/* ── Footer note ─────────────────────────────────────────── */}
        <p
          className={`mt-12 text-center text-xs sm:text-sm text-amber-300/70 italic max-w-2xl mx-auto ${
            kh ? "font-khmer not-italic leading-loose" : ""
          }`}
        >
          {t(
            "Diplomacy is what allows seven billion people from two hundred countries to share one small planet — without burning it down.",
            "ការទូតគឺជាអ្វីដែលអនុញ្ញាតឱ្យមនុស្សប្រាំពីរពាន់លាននាក់ ពីប្រទេសពីររយ ចែករំលែកភពតូចមួយ — ដោយមិនដុតវាចោល។",
          )}
        </p>
      </div>
    </div>
  );
}

/* ── Helpers ───────────────────────────────────────────────────────────── */

function BL({ en, kh }: { en: string; kh: string }) {
  return (
    <span>
      <span>{en}</span>{" "}
      <span className="font-khmer text-slate-400">({kh})</span>
    </span>
  );
}

function DiplomaticBackdrop() {
  return (
    <>
      {/* Subtle world latitude/longitude grid */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dipl-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#fbbf24" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dipl-grid)" />
      </svg>
      {/* Gold radial glow */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.10), transparent 70%)",
        }}
      />
      {/* Stylized flag silhouettes */}
      <div
        aria-hidden
        className="absolute left-0 bottom-20 w-72 h-72 opacity-[0.05] pointer-events-none"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#fbbf24" strokeWidth="1.5">
            <path d="M30 30 L30 170" />
            <path d="M30 30 L100 30 L90 60 L100 90 L30 90 Z" />
            <path d="M70 70 L70 170" />
            <path d="M70 70 L130 70 L122 95 L130 120 L70 120 Z" />
            <path d="M110 50 L110 170" />
            <path d="M110 50 L170 50 L162 75 L170 100 L110 100 Z" />
          </g>
        </svg>
      </div>
    </>
  );
}

/* Custom illustration: embassy as a building with home flag */
function EmbassyIllustration() {
  return (
    <div
      className="rounded-xl bg-gradient-to-b from-blue-950/60 to-slate-900/60 border border-amber-400/30 p-4 flex items-end justify-center gap-1"
      aria-hidden
    >
      {/* Outer host country dim buildings */}
      <div className="w-6 h-12 bg-slate-700/60 rounded-t-sm" />
      <div className="w-5 h-10 bg-slate-700/60 rounded-t-sm" />
      <div className="w-6 h-14 bg-slate-700/60 rounded-t-sm" />
      {/* Embassy in the middle */}
      <div className="relative mx-2 flex flex-col items-center">
        {/* Flagpole */}
        <div className="w-0.5 h-6 bg-amber-300" />
        {/* Flag */}
        <div className="w-7 h-4 bg-amber-400 -translate-y-6 ml-3.5 absolute top-0 left-1/2 origin-left rounded-r-sm flex items-center justify-center">
          <Star className="w-2.5 h-2.5 text-slate-900" strokeWidth={3} fill="currentColor" />
        </div>
        {/* Building */}
        <div className="mt-1 w-20 h-20 bg-gradient-to-b from-blue-700 to-blue-900 border-2 border-amber-400 rounded-t-md flex flex-col items-center justify-end pb-1.5 shadow-lg">
          <Landmark className="w-7 h-7 text-amber-300 mb-1" strokeWidth={2.25} />
          <div className="text-[8px] font-mono font-bold text-amber-200 tracking-widest">EMBASSY</div>
        </div>
      </div>
      {/* Outer host country dim buildings */}
      <div className="w-6 h-13 bg-slate-700/60 rounded-t-sm" />
      <div className="w-5 h-11 bg-slate-700/60 rounded-t-sm" />
      <div className="w-6 h-14 bg-slate-700/60 rounded-t-sm" />
    </div>
  );
}

/* Custom illustration: ambassador at podium */
function AmbassadorIllustration() {
  return (
    <div
      className="rounded-xl bg-gradient-to-b from-blue-950/60 to-slate-900/60 border border-amber-400/30 p-4 flex items-center justify-center gap-3"
      aria-hidden
    >
      {/* Home flag */}
      <div className="flex flex-col items-center">
        <div className="w-0.5 h-12 bg-amber-300" />
        <div className="-translate-y-12 w-8 h-5 bg-amber-400 rounded-r-sm flex items-center justify-center absolute" style={{ marginLeft: "1.75rem" }}>
          <Star className="w-3 h-3 text-slate-900" strokeWidth={3} fill="currentColor" />
        </div>
      </div>
      {/* Ambassador figure */}
      <div className="relative">
        {/* Head */}
        <div className="w-8 h-8 rounded-full bg-amber-200 mx-auto mb-1 ring-2 ring-amber-400" />
        {/* Body */}
        <div className="w-14 h-12 bg-gradient-to-b from-blue-700 to-blue-900 rounded-t-lg border-x-2 border-t-2 border-amber-400 flex items-center justify-center">
          <Star className="w-3 h-3 text-amber-300" strokeWidth={3} fill="currentColor" />
        </div>
        {/* Podium */}
        <div className="w-16 h-3 bg-amber-400/80 rounded-sm -mt-0.5 mx-auto" />
      </div>
      {/* Host flag */}
      <div className="flex flex-col items-center">
        <div className="w-0.5 h-12 bg-slate-300" />
        <div className="-translate-y-12 w-8 h-5 bg-slate-300 rounded-r-sm flex items-center justify-center absolute" style={{ marginLeft: "1.75rem" }}>
          <Flag className="w-3 h-3 text-slate-900" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}

/* Custom icon: water treaty (handshake over wave) */
function WaterTreaty({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M2 17 q3 -3 5 0 t5 0 t5 0 t5 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M2 21 q3 -3 5 0 t5 0 t5 0 t5 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M7 11 l3 3 l1.5 -1.5 l1.5 1.5 l3 -3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="7" cy="8" r="2" fill="currentColor" />
      <circle cx="17" cy="8" r="2" fill="currentColor" />
    </svg>
  );
}

type Tone = "navy";

function Section({
  number,
  icon: Icon,
  titleEn,
  titleKh,
  subtitleEn,
  subtitleKh,
  children,
  dataTestid,
}: {
  number: number;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: Tone;
  titleEn: string;
  titleKh: string;
  subtitleEn: string;
  subtitleKh: string;
  children: ReactNode;
  dataTestid: string;
}) {
  return (
    <section className="mb-10 sm:mb-12 scroll-mt-24" data-testid={dataTestid}>
      <header className="mb-5 sm:mb-6">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 text-amber-300 flex items-center justify-center flex-shrink-0 shadow ring-2 ring-amber-400/50">
            <Icon className="w-6 h-6" strokeWidth={2.25} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-amber-300 mb-0.5">
              Section {number} · ផ្នែកទី {number}
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
              {titleEn}
            </h2>
            <p className="font-khmer text-base sm:text-lg text-slate-200 leading-snug">
              {titleKh}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 inline-flex flex-wrap gap-x-2 gap-y-0.5">
              <span className="italic">{subtitleEn}</span>
              <span className="opacity-50" aria-hidden>·</span>
              <span className="font-khmer">{subtitleKh}</span>
            </p>
          </div>
        </div>
      </header>
      {children}
    </section>
  );
}

function DiplomaticCard({
  children,
  className = "",
}: {
  children: ReactNode;
  tone: Tone;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border-2 border-amber-400/40 bg-gradient-to-br from-blue-950/80 via-slate-900/80 to-blue-950/80 backdrop-blur-sm p-5 sm:p-6 shadow-lg ${className}`}
    >
      {/* Gold corner accents */}
      <div aria-hidden className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400 rounded-tl-2xl" />
      <div aria-hidden className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-400 rounded-tr-2xl" />
      <div aria-hidden className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-400 rounded-bl-2xl" />
      <div aria-hidden className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-400 rounded-br-2xl" />
      {children}
    </div>
  );
}

function DiplomaticBadge({
  icon: Icon,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: Tone;
}) {
  return (
    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 text-amber-300 flex items-center justify-center flex-shrink-0 shadow ring-2 ring-amber-400/50">
      <Icon className="w-5 h-5" strokeWidth={2.25} />
    </div>
  );
}

function NeedCard({
  icon: Icon,
  labelEn,
  labelKh,
  bodyEn,
  bodyKh,
}: {
  icon:
    | ComponentType<{ className?: string; strokeWidth?: number }>
    | ComponentType<{ className?: string }>;
  labelEn: string;
  labelKh: string;
  bodyEn: string;
  bodyKh: string;
}) {
  const IconCmp = Icon as ComponentType<{ className?: string; strokeWidth?: number }>;
  return (
    <div className="rounded-xl border border-amber-400/30 bg-slate-900/70 p-3.5">
      <div className="flex items-start gap-2.5 mb-2">
        <div className="w-9 h-9 rounded-lg bg-blue-800 text-amber-300 flex items-center justify-center flex-shrink-0 shadow ring-1 ring-amber-400/40">
          <IconCmp className="w-5 h-5" strokeWidth={2.25} />
        </div>
        <div>
          <div className="text-xs sm:text-sm font-extrabold text-amber-200 leading-tight">
            {labelEn}
          </div>
          <div className="font-khmer text-xs text-amber-200 leading-snug">
            {labelKh}
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed">{bodyEn}</p>
      <p className="font-khmer text-xs text-slate-300 leading-loose mt-1">
        {bodyKh}
      </p>
    </div>
  );
}

function DutyRow({
  icon: Icon,
  textEn,
  textKh,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  textEn: string;
  textKh: string;
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg bg-slate-900/60 border border-amber-400/20 p-2.5">
      <div className="w-7 h-7 rounded-md bg-amber-400 text-slate-900 flex items-center justify-center flex-shrink-0 shadow">
        <Icon className="w-4 h-4" strokeWidth={2.5} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs sm:text-sm text-slate-200 leading-snug font-semibold">
          {textEn}
        </div>
        <div className="font-khmer text-xs text-slate-300 leading-snug">
          {textKh}
        </div>
      </div>
    </div>
  );
}

function SoftPowerCard({
  icon: Icon,
  labelEn,
  labelKh,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  labelEn: string;
  labelKh: string;
}) {
  return (
    <div className="rounded-xl bg-slate-900/70 border-2 border-amber-400/40 p-3 text-center">
      <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center mx-auto mb-2 shadow">
        <Icon className="w-5 h-5" strokeWidth={2.25} />
      </div>
      <div className="text-xs sm:text-sm font-extrabold text-amber-200 leading-tight">
        {labelEn}
      </div>
      <div className="font-khmer text-xs text-amber-200/90 leading-snug">
        {labelKh}
      </div>
    </div>
  );
}
