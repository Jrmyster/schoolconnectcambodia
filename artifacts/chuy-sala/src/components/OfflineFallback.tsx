import { Link } from "wouter";
import { CloudOff, ArrowLeft, RotateCw } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/**
 * Shown in place of pages that need a live network connection (e.g. the Impact Report)
 * when the device is offline. Friendly, bilingual, with clear next steps.
 */
export function OfflineFallback({ titleEn, titleKh }: { titleEn?: string; titleKh?: string }) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-[60vh] grid place-items-center px-4 py-12">
      <div className="max-w-md text-center bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 grid place-items-center">
          <CloudOff className="w-8 h-8" />
        </div>
        <h1 className={`mt-5 text-2xl font-bold text-slate-900 ${kh ? "font-khmer" : "font-display"}`}>
          {kh
            ? titleKh ?? "ផ្នែកនេះត្រូវការអ៊ីនធឺណិត"
            : titleEn ?? "This section needs internet"}
        </h1>
        <p className={`mt-2 text-sm text-slate-600 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "This section needs internet. Please connect to view!",
            "ផ្នែកនេះត្រូវការអ៊ីនធឺណិត។ សូមភ្ជាប់អ៊ីនធឺណិតដើម្បីមើល!"
          )}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-bold transition-colors ${kh ? "font-khmer" : ""}`}
          >
            <RotateCw className="w-4 h-4" />
            {t("Try again", "សាកល្បងម្តងទៀត")}
          </button>
          <Link
            href="/"
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 text-sm font-bold transition-colors ${kh ? "font-khmer" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
        </div>
        <p className={`mt-5 text-xs text-slate-400 ${kh ? "font-khmer" : ""}`}>
          {t(
            "Tip: Once installed, cached lessons like Beginner English and Market Math still work without internet.",
            "ព័ត៌មានជំនួយ៖ ពេលដំឡើងរួច មេរៀនដូចជាអង់គ្លេសកម្រិតដំបូង និងគណិតផ្សារ នៅតែដំណើរការដោយគ្មានអ៊ីនធឺណិត។"
          )}
        </p>
      </div>
    </div>
  );
}
