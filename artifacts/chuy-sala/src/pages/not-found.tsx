import { Link } from "wouter";
import { Compass, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-[80vh] w-full flex items-center justify-center bg-gradient-to-b from-amber-50/40 via-background to-sky-50/30 px-4 py-12"
      role="main"
      aria-labelledby="notfound-heading"
    >
      <div
        data-testid="not-found"
        className="w-full max-w-md text-center bg-white border-2 border-amber-200/70 rounded-3xl shadow-[0_8px_30px_-12px_rgba(120,80,30,0.20)] p-8 sm:p-10"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-200 mb-5">
          <Compass className="w-8 h-8 text-amber-700" aria-hidden />
        </div>

        <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-700">
          404 · Lost in the rice fields
        </div>

        <h1
          id="notfound-heading"
          className="mt-2 font-display text-2xl sm:text-3xl font-bold text-foreground"
        >
          Page Not Found
        </h1>
        <p className="mt-1 font-khmer text-lg text-foreground/90 leading-snug">
          រកមិនឃើញទំព័រនេះទេ
        </p>

        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          The page you're looking for may have moved or never existed.
        </p>
        <p className="mt-1 font-khmer text-sm text-muted-foreground leading-loose">
          ទំព័រដែលអ្នកកំពុងស្វែងរកប្រហែលជាបានផ្លាស់ប្ដូរ ឬមិនធ្លាប់មាន។
        </p>

        <div className="mt-7 flex flex-col sm:flex-row items-stretch justify-center gap-3">
          <Link
            href="/"
            data-testid="link-home"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Home className="w-4 h-4" aria-hidden />
            <span>
              Back to Home <span className="font-khmer ml-1 font-normal opacity-90">/ ត្រឡប់ទៅទំព័រដើម</span>
            </span>
          </Link>
          <Link
            href="/needs"
            data-testid="link-browse"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-3 rounded-xl bg-white border-2 border-amber-200 text-amber-900 font-bold text-sm hover:bg-amber-50 hover:border-amber-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
          >
            <Search className="w-4 h-4" aria-hidden />
            <span>
              Browse Needs <span className="font-khmer ml-1 font-normal opacity-80">/ តម្រូវការ</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
