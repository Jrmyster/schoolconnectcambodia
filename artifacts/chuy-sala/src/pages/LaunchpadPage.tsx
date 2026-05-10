import { useState, useRef, useEffect } from "react";
import { useSearch, useLocation } from "wouter";
import { ExternalLink, Building2, ChevronDown, ChevronUp, Star, BookOpen, Quote, FileText, Lightbulb, CheckCircle2, Download, Sparkles } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { useChatStore } from "@/store/use-chat";
import { InterviewSimulator } from "@/components/InterviewSimulator";
import { ResumeMasterclass } from "@/components/ResumeMasterclass";
import { FuturePathways } from "@/components/FuturePathways";
import { CareerMatcher } from "@/components/CareerMatcher";
import { CareerDiscoveryMatrix } from "@/components/CareerDiscoveryMatrix";
import { DayInLifeGallery } from "@/components/DayInLifeGallery";
import { ChoosePathCompare } from "@/components/ChoosePathCompare";
import { LetterBuilder } from "@/components/LetterBuilder";
import { GlobalUniversityHub } from "@/components/GlobalUniversityHub";

export function LaunchpadPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [letterBuilderOpen, setLetterBuilderOpen] = useState(false);
  const { openChat } = useChatStore();

  const [pathwaySearch,  setPathwaySearch]  = useState("");
  const [pathwayMajorId, setPathwayMajorId] = useState("");
  const pathwaysRef = useRef<HTMLDivElement>(null);
  const search = useSearch();
  const [, setLocation] = useLocation();

  // Keep React state in lock-step with the URL — covers direct deep links
  // (`/launchpad?major=…`), the in-page Auto-select button, AND back/forward
  // navigation that strips the param. Cleanup the scroll timer if the URL
  // changes again before it fires so a stale scroll doesn't fight a fresh one.
  useEffect(() => {
    const majorParam = new URLSearchParams(search).get("major") ?? "";
    if (majorParam) {
      setPathwayMajorId(majorParam);
      setPathwaySearch("");
      const id = window.setTimeout(() => {
        pathwaysRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
      return () => window.clearTimeout(id);
    }
    // URL has no major → make sure local state matches (e.g. user pressed
    // back after auto-selecting, or hit Reset which clears the param).
    setPathwayMajorId("");
    return;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function handleNavigateToMajor(majorId: string) {
    // Reflect the selection in the URL (`/launchpad?major=visual-arts`) so the
    // pathway is deep-linkable and survives a refresh. The URL effect above
    // then syncs React state and triggers the scroll — URL is single source of
    // truth. We push (not replace) so browser Back returns to the previous
    // selection like a user would expect.
    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.get("major") !== majorId) {
      currentParams.set("major", majorId);
      const path = window.location.pathname;
      setLocation(`${path}?${currentParams.toString()}`);
    } else {
      // Same id re-clicked: URL won't change so the effect won't re-run.
      // Manually re-scroll so the user still gets the visible jump.
      setTimeout(() => {
        pathwaysRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }

  function handlePathwaysReset() {
    // Strip ?major= from the URL so refreshing or sharing the link doesn't
    // re-apply a selection the user just cleared.
    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.has("major")) {
      currentParams.delete("major");
      const path = window.location.pathname;
      const qs = currentParams.toString();
      setLocation(qs ? `${path}?${qs}` : path, { replace: true });
    }
    setPathwayMajorId("");
    setPathwaySearch("");
  }

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="relative bg-gradient-to-br from-primary via-primary/90 to-[#032EA1] text-white overflow-hidden">
        {/* Cambodian flag colour bar */}
        <div className="flex h-2">
          <div className="flex-1 bg-[#032EA1]" />
          <div className="flex-1 bg-[#E00025]" />
          <div className="flex-1 bg-[#032EA1]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-5 py-2 mb-6 text-sm font-semibold backdrop-blur-sm">
            <Star className="w-4 h-4 text-amber-300" fill="currentColor" />
            {t("University & Scholarship Launchpad", "ឱកាសការអប់រំ និងអាហារូបករណ៍")}
          </div>

          <h1 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Your Evolutionary Leap:",
              "ជំហានឆ្ពោះទៅមុខរបស់អ្នក៖"
            )}
            <br />
            <span className="text-amber-300">
              {t("Discover Higher Education", "ស្វែងយល់ពីការអប់រំកម្រិតឧត្តមសិក្សា")}
            </span>
          </h1>
          <p className={`text-white/75 max-w-2xl mx-auto mt-2 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : "text-base"}`}>
            {t(
              "Official resources, international scholarships, and guidance to help Cambodian students access world-class higher education.",
              "ធនធានផ្លូវការ អាហារូបករណ៍អន្តរជាតិ និងការណែនាំ ដើម្បីជួយនិស្សិតខ្មែរ ទទួលបានការអប់រំឧត្តមសិក្សាកម្រិតពិភពលោក។"
            )}
          </p>
        </div>

        {/* Decorative wave */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="hsl(var(--background))" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">

        {/* ── MoEYS Official Resource ── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className={`font-display font-bold text-foreground text-xl ${kh ? "font-khmer" : ""}`}>
              {t("Official Government Resource", "ធនធានផ្លូវការរបស់រដ្ឋាភិបាល")}
            </h2>
          </div>

          <div className="relative bg-gradient-to-r from-primary/5 via-sky-50/40 to-primary/5 border-2 border-primary/30 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-start md:items-center overflow-hidden">
            {/* Accent stripe */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary to-sky-400 rounded-l-3xl" />

            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg ml-2">
              <Building2 className="w-8 h-8 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wide">
                  {t("Official", "ផ្លូវការ")}
                </span>
              </div>
              <h3 className={`font-display font-bold text-foreground text-xl mb-1 ${kh ? "font-khmer text-lg" : ""}`}>
                {t("Ministry of Education, Youth & Sport (MoEYS)", "ក្រសួងអប់រំ យុវជន និងកីឡា (ក.អ.យ.ក)")}
              </h3>
              <p className={`text-muted-foreground text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "The official source for national exam results, university entrance announcements, scholarship listings, and education policy in Cambodia.",
                  "ប្រភពផ្លូវការសម្រាប់លទ្ធផលប្រឡង ការប្រកាសចូលសាកលវិទ្យាល័យ បញ្ជីអាហារូបករណ៍ និងគោលនយោបាយអប់រំនៅប្រទេសកម្ពុជា។"
                )}
              </p>
            </div>

            <a
              href="https://www.moeys.gov.kh/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all ${kh ? "font-khmer text-base" : ""}`}
            >
              {t("Visit MoEYS", "ចូលគេហទំព័រ")}
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </section>

        {/* ── Global Scholars & University Directory ── */}
        <section id="global-university-hub" className="scroll-mt-20">
          <GlobalUniversityHub />
        </section>

        {/* ── Application Guide Accordion ── */}
        <section>
          <button
            onClick={() => setAccordionOpen((o) => !o)}
            className={`w-full flex items-center justify-between gap-4 px-6 py-5 rounded-2xl
              bg-gradient-to-r from-primary/8 to-amber-50/60
              border-2 ${accordionOpen ? "border-primary/40" : "border-border"}
              text-left font-bold text-foreground hover:border-primary/30 hover:shadow-sm
              transition-all duration-200 group`}
            aria-expanded={accordionOpen}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <span className={kh ? "font-khmer text-base leading-relaxed" : "font-display text-base"}>
                {t(
                  "How to Write a University Application Letter",
                  "របៀបសរសេរលិខិតស្នើសុំចូលរៀនសាកលវិទ្យាល័យ"
                )}
              </span>
            </div>
            {accordionOpen
              ? <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
              : <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
            }
          </button>

          {accordionOpen && (
            <div className="mt-2 rounded-2xl border border-border bg-card overflow-hidden">

              {/* ── Opening quote ── */}
              <div className="px-6 pt-7 pb-5 border-b border-border/60 bg-gradient-to-r from-primary/5 to-amber-50/40">
                <div className="flex items-start gap-3">
                  <Quote className="w-6 h-6 text-primary/40 flex-shrink-0 mt-0.5" fill="currentColor" />
                  <div>
                    <p className={`font-semibold text-foreground text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "Your letter is your voice. Use it to show the university who you are beyond your grades.",
                        "លិខិតរបស់អ្នកគឺជាសំឡេងរបស់អ្នក។ សូមប្រើវាដើម្បីបង្ហាញសាកលវិទ្យាល័យថាអ្នកជានរណា ក្រៅពីពិន្ទុរបស់អ្នក។"
                      )}
                    </p>
                    {kh && (
                      <p className="mt-1 text-xs text-muted-foreground/60 italic">
                        "Your letter is your voice. Use it to show the university who you are beyond your grades."
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 py-6 flex flex-col gap-6">

                {/* ── Section helper ── */}
                {[
                  {
                    num: "1",
                    titleEn: "The Introduction",
                    titleKh: "ការណែនាំ",
                    color: "bg-primary",
                    iconColor: "text-primary",
                    borderColor: "border-primary/20",
                    bgColor: "bg-primary/4",
                    icon: FileText,
                    bullets: [
                      {
                        en: "State clearly which programme or faculty you are applying for.",
                        kh: "បញ្ជាក់ច្បាស់លាស់ថា អ្នកកំពុងស្នើសុំចូលរៀននៅក្នុងកម្មវិធី ឬនាយកដ្ឋានណា។",
                      },
                      {
                        en: "Explain in one or two sentences why you are passionate about this field of study.",
                        kh: "ពន្យល់ក្នុងមួយ ឬពីរប្រយោគ ថាហេតុអ្វីបានជាអ្នកចូលចិត្ត និងមានចំណង់ចំណូលចិត្តក្នុងផ្នែកសិក្សានេះ។",
                      },
                      {
                        en: "Keep it brief — two to three sentences maximum. First impressions count.",
                        kh: "ត្រូវរហ័សសង្ខេប — ច្រើនបំផុត ពីរ ឬបីប្រយោគ។ ការចាប់អារម្មណ៍ដំបូងមានសារៈសំខាន់ណាស់។",
                      },
                    ],
                  },
                  {
                    num: "2",
                    titleEn: "The Body",
                    titleKh: "ខ្លឹមសារ",
                    color: "bg-amber-500",
                    iconColor: "text-amber-600",
                    borderColor: "border-amber-200",
                    bgColor: "bg-amber-50/60",
                    icon: Star,
                    bullets: [
                      {
                        en: "Highlight your specific achievements at school — academic awards, leadership roles, or community projects.",
                        kh: "បង្ហាញពីសេចក្ដីសំរេចជាក់លាក់របស់អ្នកនៅសាលា — ពានរង្វាន់សិក្សា តួនាទីជាអ្នកដឹកនាំ ឬគម្រោងសហគមន៍។",
                      },
                      {
                        en: "Connect those achievements to the degree you want. Show how your past prepared you for this next step.",
                        kh: "ភ្ជាប់ការសម្រេចចិត្តទាំងនោះទៅនឹងសញ្ញាបត្រដែលអ្នកចង់បាន។ បង្ហាញថា ចំណេះដឹងរបស់អ្នកត្រៀមខ្លួនសម្រាប់ជំហានបន្ទាប់នេះ។",
                      },
                      {
                        en: "Mention how resources — including tools like Chouy Sala — helped you develop skills and curiosity outside the classroom.",
                        kh: "បញ្ជាក់ពីរបៀបដែលធនធាន — រួមទាំងឧបករណ៍ដូចជា Chouy Sala — បានជួយអ្នកអភិវឌ្ឍជំនាញ និងការចង់ដឹងចង់ឃើញ ក្រៅពីថ្នាក់រៀន។",
                      },
                      {
                        en: "Use concrete numbers or examples wherever possible: \u201cI improved our school\u2019s science-lab access for 80 students.\u201d",
                        kh: "ប្រើលេខ ឬឧទាហរណ៍ជាក់ស្ដែងនៅទីណាដែលអាចធ្វើបាន: «ខ្ញុំបានធ្វើឲ្យប្រសើរឡើងនូវការចូលប្រើប្រាស់មន្ទីរពិសោធន៍វិទ្យាសាស្ត្ររបស់សាលាយើង សម្រាប់សិស្ស ៨០ នាក់»",
                      },
                    ],
                  },
                  {
                    num: "3",
                    titleEn: "The Conclusion",
                    titleKh: "សេចក្ដីសន្និដ្ឋាន",
                    color: "bg-emerald-600",
                    iconColor: "text-emerald-600",
                    borderColor: "border-emerald-200",
                    bgColor: "bg-emerald-50/50",
                    icon: CheckCircle2,
                    bullets: [
                      {
                        en: "Restate your commitment to the programme in one clear sentence.",
                        kh: "បញ្ជាក់ម្ដងទៀតនូវការប្ដេជ្ញាចិត្តរបស់អ្នកក្នុងកម្មវិធីនេះ ក្នុងប្រយោគច្បាស់លាស់តែមួយ។",
                      },
                      {
                        en: "Thank the admissions committee for their time and consideration — it shows professionalism.",
                        kh: "សូមអរគុណគណៈកម្មការទទួលពាក្យ ចំពោះពេលវេលា និងការពិចារណារបស់ពួកគេ — វាបង្ហាញពីវិជ្ជាជីវៈ។",
                      },
                      {
                        en: "Close with a forward-looking line: \u201cI look forward to contributing to [University Name].\u201d",
                        kh: "បញ្ចប់ដោយប្រយោគដែលផ្ដោតទៅអនាគត: «ខ្ញុំរំពឹងទុកថានឹងបានចូលរួមចំណែកដល់ [ឈ្មោះសាកលវិទ្យាល័យ]»",
                      },
                    ],
                  },
                ].map((section) => (
                  <div
                    key={section.num}
                    className={`rounded-xl border ${section.borderColor} ${section.bgColor} p-4 sm:p-5`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-7 h-7 rounded-lg ${section.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-bold">{section.num}</span>
                      </div>
                      <h3 className={`font-bold text-foreground text-sm ${kh ? "font-khmer text-base" : "font-display"}`}>
                        {kh ? section.titleKh : section.titleEn}
                        {kh && <span className="ml-2 text-xs text-muted-foreground font-sans font-normal">({section.titleEn})</span>}
                      </h3>
                    </div>
                    <ul className="flex flex-col gap-2.5">
                      {section.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${section.color}`} />
                          <p className={`text-sm text-muted-foreground leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                            {kh ? b.kh : b.en}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* ── Pro Tips ── */}
                <div className="rounded-xl border border-amber-300/60 bg-amber-50 p-4 sm:p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-4 h-4 text-white" />
                    </div>
                    <h3 className={`font-bold text-amber-800 text-sm ${kh ? "font-khmer text-base" : "font-display"}`}>
                      {t("Pro Tips", "គន្លឹះពីអ្នកជំនាញ")}
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {[
                      {
                        titleEn: "Be Specific",
                        titleKh: "ត្រូវបញ្ជាក់ជាក់លាក់",
                        bodyEn: "Don't just say you are a hard worker — give a real example. Concrete details are far more convincing than general claims.",
                        bodyKh: "កុំគ្រាន់តែនិយាយថាអ្នកខំប្រឹងធ្វើការ — ផ្ដល់ឧទាហរណ៍ជាក់ស្ដែង។ ព័ត៌មានជាក់លាក់ គួរជឿជាក់ជាងការអះអាងទូទៅ។",
                      },
                      {
                        titleEn: "Proofread Carefully",
                        titleKh: "ត្រួតពិនិត្យដោយយកចិត្តទុកដាក់",
                        bodyEn: "A clean, error-free letter shows the committee you respect their time and pay attention to detail. Read it aloud before submitting.",
                        bodyKh: "លិខិតស្អាត គ្មានកំហុស បង្ហាញដល់គណៈកម្មការថាអ្នកគោរពពេលវេលារបស់ពួកគេ ហើយយកចិត្តទុកដាក់ចំពោះព័ត៌មានលម្អិត។ អានរោទ៍ ជាសំឡេងមុននឹងដាក់ស្នើ។",
                      },
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className={`font-semibold text-amber-800 text-sm ${kh ? "font-khmer" : ""}`}>
                            {kh ? tip.titleKh : tip.titleEn}:{" "}
                          </span>
                          <span className={`text-amber-700/80 text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                            {kh ? tip.bodyKh : tip.bodyEn}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ── Open the interactive Letter Builder ── */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setLetterBuilderOpen(true)}
                    data-testid="button-open-letter-builder"
                    className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm shadow-md
                      bg-gradient-to-r from-primary to-primary/80 text-white
                      hover:from-primary/90 hover:to-primary/70 hover:shadow-lg hover:-translate-y-0.5
                      active:scale-95 transition-all ${kh ? "font-khmer text-base" : ""}`}
                  >
                    <FileText className="w-4 h-4 flex-shrink-0" />
                    {t("Open Letter Builder", "បើកកម្មវិធីបង្កើតលិខិត")}
                  </button>
                  <p className={`mt-2 text-xs text-muted-foreground/60 ${kh ? "font-khmer" : ""}`}>
                    {t(
                      "Fill in your details, see the letter update live, then save it as a PDF.",
                      "បំពេញព័ត៌មានរបស់អ្នក មើលលិខិតផ្លាស់ប្តូរភ្លាមៗ ហើយរក្សាទុកជា PDF។",
                    )}
                  </p>
                </div>

                {/* ── Get AI Review Button ── */}
                <div className="mt-6 pt-5 border-t border-amber-100">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <button
                      onClick={() =>
                        openChat({
                          reviewerMode: true,
                          prompt:
                            "I am ready to share my university application letter draft. Please review it using your professional checklist.",
                        })
                      }
                      title={kh ? "ទទួលការពិនិត្យពី AI" : "Get AI Review"}
                      className={`group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm shadow-md
                        text-white transition-all active:scale-95 hover:-translate-y-0.5 hover:shadow-lg
                        ${kh ? "font-khmer text-base" : ""}`}
                      style={{
                        background:
                          "linear-gradient(135deg, #b8860b 0%, #d4a017 50%, #b8860b 100%)",
                        boxShadow: "0 4px 14px rgba(180,134,11,0.4)",
                      }}
                    >
                      <Sparkles className="w-4 h-4 flex-shrink-0 group-hover:animate-spin" />
                      {kh ? "ទទួលការពិនិត្យពី AI" : "Get AI Review"}
                      {!kh && (
                        <span className="ml-1 text-xs font-normal opacity-80 hidden sm:inline font-khmer">
                          (ទទួលការពិនិត្យពី AI)
                        </span>
                      )}
                    </button>
                    <p className={`text-xs text-muted-foreground/70 max-w-xs ${kh ? "font-khmer" : ""}`}>
                      {t(
                        "AI will review your draft letter using a professional 8-point checklist and score it out of 10.",
                        "AI នឹងពិនិត្យលិខិតពាក្យ​សុំ​ស្រាប់​របស់​អ្នក​ ដោយ​ប្រើ​បញ្ជីពិនិត្យ ៨ ចំណុច​ ហើយ​ វាយ​ផ្ដល់​ពិន្ទុ​ ១០​ ។"
                      )}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}
        </section>

        {/* ── Job Interview Simulator ── */}
        {/* `id` + `scroll-mt-20` so the global search can deep-link here
            via `/launchpad#interview-simulator` and land below the sticky nav. */}
        <section
          id="interview-simulator"
          className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 scroll-mt-20"
        >
          <div className="mb-4">
            <h2 className={`text-2xl font-extrabold text-foreground ${kh ? "font-khmer" : ""}`}>
              {t("Job Interview Simulator", "កម្មវិធីហ្វឹកហាត់សម្ភាសន៍ការងារ")}
            </h2>
            <p className={`text-sm text-muted-foreground mt-1 ${kh ? "font-khmer" : ""}`}>
              {t(
                "Practice real interviews with an AI coach — get instant feedback on your answers.",
                "ហ្វឹកហាត់ការសម្ភាសន៍ជាក់ស្ដែងជាមួយ AI — ទទួលមតិភ្លាមៗអំពីចម្លើយរបស់អ្នក។"
              )}
            </p>
          </div>
          <InterviewSimulator />
        </section>

        {/* ── Resume & CV Masterclass ── */}
        <ResumeMasterclass />

        {/* ── Career Matcher ── */}
        {/* ── Career Discovery Matrix (interest-first) ── */}
        <section id="career-discovery-matrix" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-20">
          <div className="mb-5">
            <h2 className={`text-2xl font-extrabold text-foreground ${kh ? "font-khmer" : ""}`}>
              {t("Career Discovery Matrix", "ម៉ាទ្រីសស្វែងរកអាជីព")}
              {kh && <span className="ml-2 text-base font-normal text-muted-foreground">(Career Discovery Matrix)</span>}
            </h2>
            <p className={`text-sm text-muted-foreground mt-1 ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Not sure what to study? Start with what you genuinely enjoy — and we'll show you both vocational and university paths that fit, plus how much demand they have in Cambodia today.",
                "មិនទាន់ប្រាកដថាត្រូវរៀនអ្វី? ចាប់ផ្ដើមជាមួយអ្វីដែលអ្នកពិតជាសប្បាយចិត្ត — យើងនឹងបង្ហាញផ្លូវវិជ្ជាជីវៈ និងផ្លូវសាកលវិទ្យាល័យដែលត្រូវនឹងអ្នក រួមជាមួយតម្រូវការនៅកម្ពុជា។"
              )}
            </p>
          </div>
          <CareerDiscoveryMatrix />
        </section>

        {/* ── Choose Your Path: Vocational vs. University ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-5">
            <h2 className={`text-2xl font-extrabold text-foreground ${kh ? "font-khmer" : ""}`}>
              {t("Choose Your Path: Vocational vs. University", "ជ្រើសរើសផ្លូវរបស់អ្នក៖ វិជ្ជាជីវៈ ឬសាកលវិទ្យាល័យ")}
              {kh && <span className="ml-2 text-base font-normal text-muted-foreground">(Choose Your Path)</span>}
            </h2>
            <p className={`text-sm text-muted-foreground mt-1 ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Compare the two paths side-by-side, bust a few common myths, and take a 3-question quiz to find your starting point.",
                "ប្រៀបធៀបផ្លូវទាំងពីរក្បែរគ្នា បំបាត់ការយល់ខុសទូទៅមួយចំនួន ហើយឆ្លើយសំណួរ ៣ ដើម្បីរកចំណុចចាប់ផ្ដើមរបស់អ្នក។"
              )}
            </p>
          </div>
          <ChoosePathCompare />
        </section>

        {/* ── Day in the Life Career Gallery ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-5">
            <h2 className={`text-2xl font-extrabold text-foreground ${kh ? "font-khmer" : ""}`}>
              {t("Day in the Life: Career Gallery", "ជីវិតប្រចាំថ្ងៃក្នុងអាជីព")}
              {kh && <span className="ml-2 text-base font-normal text-muted-foreground">(Day in the Life)</span>}
            </h2>
            <p className={`text-sm text-muted-foreground mt-1 ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Real Cambodian professionals share their morning routine, the tools they use, the hardest part of their job, and what makes them love it.",
                "អ្នកជំនាញខ្មែរពិតប្រាកដ ចែករំលែកទម្លាប់ពេលព្រឹក ឧបករណ៍ដែលប្រើ ផ្នែកលំបាកបំផុតនៃការងារ និងអ្វីដែលធ្វើឲ្យពួកគេស្រឡាញ់វា។"
              )}
            </p>
          </div>
          <DayInLifeGallery />
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
          <div className="mb-5">
            <h2 className={`text-2xl font-extrabold text-foreground ${kh ? "font-khmer" : ""}`}>
              {t("Career Matcher", "ឧបករណ៍ស្វែងរកអាជីព")}
              {kh && <span className="ml-2 text-base font-normal text-muted-foreground">(Career Matcher)</span>}
            </h2>
            <p className={`text-sm text-muted-foreground mt-1 ${kh ? "font-khmer" : ""}`}>
              {t(
                "Rate your subject strengths and let AI identify the 3 college majors best aligned with your mind.",
                "វាយតម្លៃភាពខ្លាំងខាងមុខវិជ្ជា ហើយឲ្យ AI កំណត់ជំនាញ ៣ ដែលស័ក្ដិសមបំផុត។"
              )}
            </p>
          </div>
          <CareerMatcher
            onNavigateToMajor={handleNavigateToMajor}
            onResetPathways={handlePathwaysReset}
          />
        </section>

        {/* ── Future Pathways Guide ── */}
        <div ref={pathwaysRef} className="scroll-mt-20">
          <FuturePathways
            initialSearchQuery={pathwaySearch}
            onSearchQueryConsumed={() => setPathwaySearch("")}
            jumpToMajorId={pathwayMajorId}
            onReset={handlePathwaysReset}
          />
        </div>

      </div>

      {/* University Application Letter Builder — modal opened from the
          "Open Letter Builder" button in the writing-tips accordion. */}
      <LetterBuilder
        open={letterBuilderOpen}
        onOpenChange={setLetterBuilderOpen}
      />
    </div>
  );
}
