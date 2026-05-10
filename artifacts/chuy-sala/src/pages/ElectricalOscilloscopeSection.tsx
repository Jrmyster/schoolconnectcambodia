import {
  Activity,
  Monitor,
  Zap,
  Sliders,
  Crosshair,
  BarChart2,
  Eye,
  Wrench,
  Radio,
  Clock
} from "lucide-react";
import React from "react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

export function ElectricalOscilloscopeSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section
      id="oscilloscope"
      className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-24"
    >
      <div className="relative overflow-hidden rounded-3xl border border-sky-900/40 shadow-2xl bg-slate-950">
        
        {/* Soft glows */}
        <div
          aria-hidden
          className="absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #0284c7 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)" }}
        />

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div className="relative px-6 sm:px-10 pt-10 pb-8 border-b border-sky-900/30">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-sky-500/15 text-sky-300 rounded-sm px-2.5 py-0.5 border border-sky-500/30">
              MODULE · DIAGNOSTICS
            </span>
            <span className="font-khmer text-xs text-sky-300/80">
              ម៉ូឌុល · ការវិនិច្ឆ័យ
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <h2 className={`font-bold text-2xl sm:text-4xl text-sky-50 leading-tight ${kh ? 'font-khmer leading-snug' : 'font-display'}`}>
                {t("Oscilloscopes: Visualizing Electricity", "ម៉ាស៊ីន Oscilloscope៖ ការមើលឃើញអគ្គិសនី")}
              </h2>
              <p className={`text-sky-100/80 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl ${kh ? 'font-khmer leading-loose' : ''}`}>
                {t(
                  "An oscilloscope (or 'scope') is an electronic test instrument that graphically displays varying electrical signals, showing voltage on the vertical (Y) axis and time on the horizontal (X) axis to analyze waveforms.",
                  "ម៉ាស៊ីន Oscilloscope (ឬ 'scope') គឺជាឧបករណ៍តេស្តអេឡិចត្រូនិកដែលបង្ហាញសញ្ញាអគ្គិសនីជាក្រាហ្វិក ដោយបង្ហាញវ៉ុលនៅលើអ័ក្សបញ្ឈរ (Y) និងពេលវេលានៅលើអ័ក្សផ្ដេក (X) ដើម្បីវិភាគទម្រង់រលក។"
                )}
              </p>
            </div>
            
            <div className="flex-shrink-0 relative w-48 h-32 bg-slate-900 border-2 border-slate-700 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(2,132,199,0.3)]">
              {/* Fake oscilloscope screen */}
              <div className="absolute inset-0 grid grid-cols-10 grid-rows-8 opacity-20">
                {Array.from({ length: 80 }).map((_, i) => (
                  <div key={i} className="border-r border-b border-sky-400/50" />
                ))}
              </div>
              <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="none">
                <path
                  d="M0 30 Q 12 5, 25 30 T 50 30 T 75 30 T 100 30"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ── Key Functions ───────────────────────────────────────────── */}
        <div className="relative px-6 sm:px-10 py-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-sky-400" />
            </div>
            <h3 className={`text-xl font-bold text-sky-50 ${kh ? 'font-khmer' : ''}`}>
              {t("Key Functions & Uses", "មុខងារ និងការប្រើប្រាស់សំខាន់ៗ")}
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800 flex items-start gap-4">
              <Eye className="w-6 h-6 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className={`block text-sky-100 mb-1 ${kh ? 'font-khmer' : ''}`}>
                  {t("Signal Visualization", "ការមើលឃើញសញ្ញា")}
                </strong>
                <p className={`text-sm text-slate-400 ${kh ? 'font-khmer leading-loose' : 'leading-relaxed'}`}>
                  {t("Seeing fast signals that change too quickly for a standard multimeter to read.", "ការមើលឃើញសញ្ញាលឿនដែលផ្លាស់ប្តូរលឿនពេក ដែលម៉ាទីម៉ែត្រ (multimeter) ស្តង់ដារមិនអាចអានបាន។")}
                </p>
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800 flex items-start gap-4">
              <BarChart2 className="w-6 h-6 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className={`block text-sky-100 mb-1 ${kh ? 'font-khmer' : ''}`}>
                  {t("Measurement", "ការវាស់វែង")}
                </strong>
                <p className={`text-sm text-slate-400 ${kh ? 'font-khmer leading-loose' : 'leading-relaxed'}`}>
                  {t("Precisely determining the amplitude (voltage) and frequency (timing) of a waveform.", "ការកំណត់យ៉ាងច្បាស់នូវទំហំ (វ៉ុល) និងប្រេកង់ (ពេលវេលា) នៃទម្រង់រលក។")}
                </p>
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800 flex items-start gap-4">
              <Wrench className="w-6 h-6 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className={`block text-sky-100 mb-1 ${kh ? 'font-khmer' : ''}`}>
                  {t("Troubleshooting", "ការដោះស្រាយបញ្ហា")}
                </strong>
                <p className={`text-sm text-slate-400 ${kh ? 'font-khmer leading-loose' : 'leading-relaxed'}`}>
                  {t("Diagnosing circuit issues like noise, distortion, or incorrect signal timing.", "ការធ្វើរោគវិនិច្ឆ័យបញ្ហាសៀគ្វីដូចជា សំលេងរំខាន ការបង្ខូចទ្រង់ទ្រាយ ឬពេលវេលាសញ្ញាមិនត្រឹមត្រូវ។")}
                </p>
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800 flex items-start gap-4">
              <Radio className="w-6 h-6 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className={`block text-sky-100 mb-1 ${kh ? 'font-khmer' : ''}`}>
                  {t("Sensor Analysis", "ការវិភាគសេនស័រ")}
                </strong>
                <p className={`text-sm text-slate-400 ${kh ? 'font-khmer leading-loose' : 'leading-relaxed'}`}>
                  {t("Reading exact real-time output from sensors to verify their accuracy and responsiveness.", "ការអានទិន្នន័យជាក់ស្តែងពីសេនស័រ ដើម្បីបញ្ជាក់ពីភាពត្រឹមត្រូវ និងការឆ្លើយតបរបស់ពួកវា។")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2">
          {/* ── Core Components ─────────────────────────────────────────── */}
          <div className="relative px-6 sm:px-10 py-8 border-t md:border-r border-sky-900/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <Sliders className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className={`text-xl font-bold text-sky-50 ${kh ? 'font-khmer' : ''}`}>
                {t("Core Components", "សមាសធាតុស្នូល")}
              </h3>
            </div>
            
            <ul className="space-y-4">
              <li className="flex gap-3">
                <Zap className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <strong className={`text-sm text-indigo-200 block ${kh ? 'font-khmer' : ''}`}>{t("Probes", "ប្រូប (Probes)")}</strong>
                  <span className={`text-sm text-slate-400 ${kh ? 'font-khmer leading-loose' : ''}`}>{t("The physical connections that attach the scope to the circuit being tested.", "ការភ្ជាប់រូបវន្តដែលភ្ជាប់ scope ទៅនឹងសៀគ្វីដែលកំពុងធ្វើតេស្ត។")}</span>
                </div>
              </li>
              <li className="flex gap-3">
                <Monitor className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <strong className={`text-sm text-indigo-200 block ${kh ? 'font-khmer' : ''}`}>{t("Vertical Controls", "ឧបករណ៍បញ្ជាបញ្ឈរ")}</strong>
                  <span className={`text-sm text-slate-400 ${kh ? 'font-khmer leading-loose' : ''}`}>{t("Adjusts the voltage scale (amplitude) to make the signal fit the screen.", "លៃតម្រូវខ្នាតវ៉ុល (ទំហំ) ដើម្បីឲ្យសញ្ញាសមនឹងអេក្រង់។")}</span>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <strong className={`text-sm text-indigo-200 block ${kh ? 'font-khmer' : ''}`}>{t("Horizontal Controls", "ឧបករណ៍បញ្ជាផ្ដេក")}</strong>
                  <span className={`text-sm text-slate-400 ${kh ? 'font-khmer leading-loose' : ''}`}>{t("Adjusts the time scale (time/division) to stretch or compress the waveform.", "លៃតម្រូវខ្នាតពេលវេលា (time/division) ដើម្បីទាញឬបង្រួមទម្រង់រលក។")}</span>
                </div>
              </li>
              <li className="flex gap-3">
                <Crosshair className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <strong className={`text-sm text-indigo-200 block ${kh ? 'font-khmer' : ''}`}>{t("Trigger Controls", "ឧបករណ៍បញ្ជាកេះ (Trigger)")}</strong>
                  <span className={`text-sm text-slate-400 ${kh ? 'font-khmer leading-loose' : ''}`}>{t("Stabilizes a repeating signal so it appears frozen on the screen rather than moving across it.", "រក្សាលំនឹងសញ្ញាដែលកើតឡើងដដែលៗ ដូច្នេះវាបង្ហាញដូចជាបញ្ឈប់នៅលើអេក្រង់ ជំនួសឲ្យការផ្លាស់ទី។")}</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            {/* ── Key Terminology ───────────────────────────────────────── */}
            <div className="relative px-6 sm:px-10 py-8 border-t border-sky-900/30">
              <div className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-4">
                Tech Glossary <span className="font-khmer tracking-normal normal-case">/ វចនានុក្រមបច្ចេកទេស</span>
              </div>
              <div className="bg-sky-950/30 rounded-xl border border-sky-800/50 p-4 space-y-3">
                <div>
                  <span className={`text-sm font-bold text-sky-200 mr-2 ${kh ? 'font-khmer' : ''}`}>{t("Bandwidth:", "កម្រិតបញ្ជូន (Bandwidth):")}</span>
                  <span className={`text-sm text-sky-100/70 ${kh ? 'font-khmer' : ''}`}>{t("The highest frequency signal the scope can accurately measure.", "ប្រេកង់សញ្ញាខ្ពស់បំផុតដែល scope អាចវាស់បានយ៉ាងច្បាស់។")}</span>
                </div>
                <div>
                  <span className={`text-sm font-bold text-sky-200 mr-2 ${kh ? 'font-khmer' : ''}`}>{t("Sample Rate:", "អត្រាគំរូ (Sample Rate):")}</span>
                  <span className={`text-sm text-sky-100/70 ${kh ? 'font-khmer' : ''}`}>{t("How many times per second the scope takes a 'snapshot' of the signal.", "ចំនួនដងក្នុងមួយវិនាទីដែល scope ចាប់យកទិន្នន័យរបស់សញ្ញា។")}</span>
                </div>
                <div>
                  <span className={`text-sm font-bold text-sky-200 mr-2 ${kh ? 'font-khmer' : ''}`}>{t("Channels:", "ឆានែល (Channels):")}</span>
                  <span className={`text-sm text-sky-100/70 ${kh ? 'font-khmer' : ''}`}>{t("The number of different signals you can input and compare at the same time (usually 2 or 4).", "ចំនួនសញ្ញាផ្សេងគ្នាដែលអ្នកអាចបញ្ចូល និងប្រៀបធៀបក្នុងពេលតែមួយ (ជាធម្មតា ២ ឬ ៤)។")}</span>
                </div>
              </div>
            </div>

            {/* ── Types of Oscilloscopes ────────────────────────────────── */}
            <div className="relative px-6 sm:px-10 pb-8 flex-1">
              <div className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-4">
                Types <span className="font-khmer tracking-normal normal-case">/ ប្រភេទ</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-full px-3 py-1">
                  Digital (DSO)
                </span>
                <span className="text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-full px-3 py-1">
                  Analog
                </span>
                <span className="text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-full px-3 py-1">
                  Mixed-Signal (MSO)
                </span>
                <span className="text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-full px-3 py-1">
                  Handheld
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
