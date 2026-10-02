import { MAP_SITE_URL } from "@/config/sites";
import { Heart } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import { DownloadGuideButton } from "@/components/DownloadGuideButton";

export function Footer() {
  const t = useTranslation();
  const language = useLanguageStore((s) => s.language);

  return (
    <footer className="bg-foreground text-secondary py-12 mt-20 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Chouy Sala Logo"
                className="w-10 h-10 object-contain rounded-lg bg-white p-1"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-none text-white">
                  Chouy Sala
                </span>
                <span className="font-khmer text-xs text-secondary/70">
                  ជួយសាលា
                </span>
              </div>
            </div>
            <p className="text-secondary/80 text-sm leading-relaxed max-w-sm">
              {t(
                "Bilingual learning, practical science, and student tools for Cambodia.",
                "ការសិក្សាពីរភាសា វិទ្យាសាស្ត្រ និងឧបករណ៍សម្រាប់សិស្សកម្ពុជា។"
              )}
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg text-white mb-6">
              {t("Contact Us", "ទំនាក់ទំនង")}
            </h4>
            <ul className="space-y-3 text-sm text-secondary/80">
              <li>Email: jaredrobertw@gmail.com</li>
              <li>Phnom Penh, Cambodia</li>
              <li>
                <a
                  href="/impact"
                  data-testid="link-impact-report"
                  className="underline underline-offset-2 hover:text-white transition-colors"
                >
                  {t("Impact & Transparency Report", "របាយការណ៍ផលប៉ះពាល់ និងតម្លាភាព")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg text-white mb-6">
              {t("Learning Resources", "ធនធានសិក្សា")}
            </h4>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm flex flex-col gap-4">
              <p className="text-sm flex items-center gap-2">
                <Heart className="w-4 h-4 text-destructive flex-shrink-0" fill="currentColor" />
                {t("Keep learning with our downloadable guide.", "បន្តសិក្សាជាមួយមគ្គុទ្ទេសក៍ដែលអាចទាញយកបាន។")}
              </p>
              <a href={MAP_SITE_URL} target="_blank" rel="noopener noreferrer" className="underline">Digital Map</a>
              <DownloadGuideButton className="w-full justify-center" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-secondary/50 space-y-4">
          <p>© {new Date().getFullYear()} Chouy Sala. {t("All rights reserved.", "រក្សាសិទ្ធិគ្រប់យ៉ាង។")}</p>
          <div className="max-w-2xl mx-auto text-xs text-secondary/40 leading-relaxed">
            <p className="font-semibold text-secondary/50">
              {t("Funding & Privacy Policy", "គោលការណ៍មូលនិធិ និងភាពឯកជន")}
            </p>
          </div>
          <div className="max-w-2xl mx-auto text-xs text-secondary/40 leading-relaxed border-t border-white/10 pt-6 mt-2">
            {language === "kh" ? (
              <span className="font-khmer">
                អ្នកបង្កើតគម្រោងនេះគាំទ្រដល់ស្នាដៃរបស់លោក Jacque Fresco និង{" "}
                <a
                  href="https://thevenusproject.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-secondary/70 transition-colors"
                >
                  The Venus Project
                </a>
                ។ យើងជឿជាក់លើការប្រើប្រាស់វិទ្យាសាស្ត្រ និងបច្ចេកវិទ្យា ដើម្បីបង្កើតពិភពលោកដ៏ល្អប្រសើរសម្រាប់មនុស្សគ្រប់គ្នា។
              </span>
            ) : (
              <span>
                The developer of this project supports the work of Jacque Fresco and{" "}
                <a
                  href="https://thevenusproject.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-secondary/70 transition-colors"
                >
                  The Venus Project
                </a>
                . We believe in using science and technology to create a better world for everyone.
              </span>
            )}
          </div>

          {/* ── Reflective sign-off quote ─────────────────────────────── */}
          <div
            data-testid="footer-fresco-quote"
            className="max-w-2xl mx-auto pt-8 mt-4 text-center"
          >
            {/* Subtle decorative divider — soft cyan thread */}
            <div
              className="flex items-center justify-center gap-3 mb-6"
              aria-hidden="true"
            >
              <span className="h-px w-12 bg-cyan-400/25" />
              <span className="h-1 w-1 rounded-full bg-cyan-400/40" />
              <span className="h-px w-12 bg-cyan-400/25" />
            </div>

            {/* English quote */}
            <blockquote className="italic text-secondary/70 text-sm sm:text-base leading-relaxed font-light">
              &ldquo;Is there intelligent life on Earth? We believe, no, not yet.&rdquo;
            </blockquote>
            <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-secondary/50">
              &mdash; Jacque Fresco
            </p>

            {/* Khmer translation — slightly smaller, more muted */}
            <p className="font-khmer text-xs text-secondary/45 leading-loose mt-5 max-w-xl mx-auto">
              &ldquo;តើមានជីវិតដ៏ឆ្លាតវៃនៅលើផែនដីដែរឬទេ? យើងជឿថា ទេ មិនទាន់មាននៅឡើយទេ។&rdquo;
            </p>
            <p className="font-khmer text-[11px] text-secondary/35 mt-1">
              &mdash; ហ្សាក់ ហ្វ្រេស្កូ (Jacque Fresco)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
