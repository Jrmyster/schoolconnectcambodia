import { Link } from "wouter";
import { ArrowLeft, Bug } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { EntomologyModule } from "@/components/widgets/EntomologyModule";

/* ══════════════════════════════════════════════════════════════════════════
 * Entomology: The Micro-Engineers of Cambodia
 *   បាណកសាស្ត្រ៖ វិស្វករខ្នាតតូចនៃប្រទេសកម្ពុជា
 *
 * Standalone page wrapping the self-contained EntomologyModule widget.
 * Previously this content lived inside the Scientific Literacy page; it now
 * has its own dedicated route under /science/entomology so it can be linked
 * directly from the Science dropdown in the top navigation.
 * ══════════════════════════════════════════════════════════════════════════ */

export function EntomologyPage() {
  const language = useLanguageStore((s) => s.language);
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-amber-50/40 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/science"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className={kh ? "font-khmer" : ""}>
            {kh ? "ត្រឡប់ទៅ វិទ្យាសាស្ត្រ" : "Back to Scientific Literacy"}
          </span>
        </Link>

        {/* Page heading */}
        <header className="flex items-start gap-3 mb-2">
          <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-700 to-amber-700 text-white flex items-center justify-center shadow-md">
            <Bug className="w-6 h-6" aria-hidden />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-950 leading-tight">
              Entomology: The Micro-Engineers of Cambodia
            </h1>
            <p className="font-khmer text-base sm:text-lg text-emerald-900/85 leading-loose mt-0.5">
              បាណកសាស្ត្រ៖ វិស្វករខ្នាតតូចនៃប្រទេសកម្ពុជា
            </p>
          </div>
        </header>

        <p className="text-sm text-emerald-900/80 mb-6 max-w-2xl">
          {kh
            ? "ស្វែងយល់ពីរចនាសម្ព័ន្ធរបស់សត្វល្អិត ពួកវិស្វករខ្នាតតូចក្នុងស្រុក និងវិទ្យាសាស្ត្រនៃការរស់រាន។"
            : "Explore insect anatomy, our local micro-engineers, and the survival science that makes them the most successful animals on Earth."}
        </p>

        <EntomologyModule />
      </div>
    </div>
  );
}

export default EntomologyPage;
