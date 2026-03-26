import { useState } from "react";
import { useListSchools, useListNeeds } from "@workspace/api-client-react";
import { MapComponent } from "@/components/MapComponent";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Link } from "wouter";
import { Loader2, Map as MapIcon, ChevronRight, Heart, X, QrCode, ExternalLink } from "lucide-react";

const KHQR_IMAGE_URL =
  "https://raw.githubusercontent.com/Jrmyster/anatomy-assets/main/donation_qr.png";

// ── Swap in your actual Ko-fi URL here ──
const KOFI_URL = "https://ko-fi.com/chouysala";

function SupportModal({ onClose }: { onClose: () => void }) {
  const t = useTranslation();
  const { language } = useLanguageStore();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border border-border max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-primary to-primary/80 px-6 pt-8 pb-6 text-white text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <h2 className="font-display text-xl font-bold leading-tight">
            Support Science Education in Cambodia
          </h2>
          <p className="font-khmer text-base text-white/80 mt-1 leading-snug">
            គាំទ្រការអប់រំវិទ្យាសាស្ត្រនៅកម្ពុជា
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6">
          {/* Mission statement */}
          <div className="text-center space-y-2">
            <p className={`text-muted-foreground leading-relaxed ${language === "kh" ? "font-khmer text-base leading-loose" : "text-sm"}`}>
              {t(
                "100% of donations go directly toward server hosting and digital learning resources for under-resourced classrooms across rural Cambodia.",
                "ការបរិច្ចាគ ១០០% ទៅដោយផ្ទាល់ដើម្បីជួយថ្លៃម៉ាស៊ីនបម្រើ និងធនធានសិក្សាឌីជីថលសម្រាប់ថ្នាក់រៀនដែលខ្វះខាតនៅជនបទកម្ពុជា។"
              )}
            </p>
            <p className={`text-muted-foreground/80 leading-relaxed ${language === "kh" ? "font-khmer text-sm leading-loose" : "text-xs"}`}>
              {t(
                "Every contribution keeps this platform running and helps more schools reach donors who care.",
                "រាល់ការចូលរួមរក្សាឱ្យប្លាតហ្វមនេះដំណើរការ និងជួយសាលារៀនកាន់តែច្រើនទៀតឈានដល់អ្នកបរិច្ចាគ។"
              )}
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className={`text-xs font-semibold text-muted-foreground uppercase tracking-wide ${language === "kh" ? "font-khmer" : ""}`}>
              {t("Local Donation", "បរិច្ចាគក្នុងស្រុក")}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* KHQR */}
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-white rounded-2xl border-2 border-border shadow-sm">
              <img
                src={KHQR_IMAGE_URL}
                alt="KHQR Donation QR Code"
                className="w-[190px] h-[190px] object-contain rounded-lg"
                onError={e => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = "none";
                  const fallback = img.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <div className="hidden w-[190px] h-[190px] flex items-center justify-center bg-muted/30 rounded-lg">
                <QrCode className="w-16 h-16 text-muted-foreground/40" />
              </div>
            </div>
            <p className={`text-xs font-semibold text-muted-foreground text-center ${language === "kh" ? "font-khmer" : ""}`}>
              {t("Scan to donate via KHQR (ABA / ACLEDA)", "ស្កេនដើម្បីបរិច្ចាគតាម KHQR (ABA / ACLEDA)")}
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className={`text-xs font-semibold text-muted-foreground uppercase tracking-wide ${language === "kh" ? "font-khmer" : ""}`}>
              {t("International", "អន្តរជាតិ")}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Ko-fi button */}
          <a
            href={KOFI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95 ${language === "kh" ? "font-khmer text-base" : "text-sm"}`}
            style={{ background: "linear-gradient(135deg, #FF5E5B 0%, #ff7f47 100%)" }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" aria-hidden>
              <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 2.98.723 4.311zm6.173.478c-.928.116-1.682-.452-1.682-.452V7.3l1.682.252c.638.224 1.11.816 1.11 1.564v2.27c0 .819-.467 1.485-1.11 1.551z" />
            </svg>
            {t("Support via Ko-fi", "គាំទ្រតាម Ko-fi")}
            <ExternalLink className="w-3.5 h-3.5 opacity-70 flex-shrink-0" />
          </a>
        </div>

        {/* Close button */}
        <div className="px-6 pb-6 pt-1">
          <button
            onClick={onClose}
            className={`w-full py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-bold transition-colors ${language === "kh" ? "font-khmer text-base" : "text-sm"}`}
          >
            {t("Close", "បិទ")}
          </button>
        </div>
      </div>
    </div>
  );
}

export function MapPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const [supportOpen, setSupportOpen] = useState(false);
  
  const { data: schools, isLoading: isLoadingSchools } = useListSchools();
  const { data: needs, isLoading: isLoadingNeeds } = useListNeeds();

  const isLoading = isLoadingSchools || isLoadingNeeds;

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col md:flex-row bg-background">
      {/* Sidebar for Map */}
      <div className="w-full md:w-80 lg:w-96 bg-card border-r border-border flex flex-col h-1/3 md:h-full z-10 shadow-xl shadow-black/5">
        <div className="p-6 border-b border-border bg-white">
          <div className="flex items-center gap-3 text-primary mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapIcon className="w-6 h-6" />
            </div>
            <h1 className={`text-2xl font-bold ${language === 'kh' ? 'font-khmer' : 'font-display'}`}>
              {t("School Map", "ផែនទីសាលា")}
            </h1>
          </div>
          <p className={`text-muted-foreground text-sm ${language === 'kh' ? 'font-khmer' : ''}`}>
            {t("Explore schools across Cambodia. Click on a pin to view active needs.", "ស្វែងរកសាលារៀននៅទូទាំងប្រទេសកម្ពុជា។ ចុចលើម្ជុលដើម្បីមើលតម្រូវការសកម្ម។")}
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/20">
          {isLoading ? (
            <div className="flex items-center justify-center h-32 text-primary">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            schools?.map(school => {
              const activeCount = needs?.filter(n => n.schoolId === school.id && n.status === 'active').length || 0;
              return (
                <Link key={school.id} href={`/school/${school.id}`} className="block bg-white p-4 rounded-xl border border-border shadow-sm hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-bold text-foreground mb-1 flex-1 ${language === 'kh' ? 'font-khmer text-sm' : ''}`}>
                      {t(school.nameEn, school.nameKh)}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-muted-foreground">{school.province}</span>
                    {activeCount > 0 ? (
                      <span className="font-bold text-accent bg-accent/10 px-2 py-1 rounded-md">
                        {activeCount} {t("Needs", "តម្រូវការ")}
                      </span>
                    ) : (
                      <span className="text-muted-foreground bg-black/5 px-2 py-1 rounded-md">
                        {t("No needs", "គ្មានតម្រូវការ")}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Support Button — sticky bottom of sidebar */}
        <div className="p-4 border-t border-border bg-white">
          <button
            onClick={() => setSupportOpen(true)}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 ${language === "kh" ? "font-khmer text-base" : "text-sm"}`}
          >
            <Heart className="w-4 h-4 fill-white/80" />
            {t("Support the Project", "គាំទ្រគម្រោង")}
          </button>
        </div>
      </div>

      {/* Support Modal */}
      {supportOpen && <SupportModal onClose={() => setSupportOpen(false)} />}

      {/* Map Container */}
      <div className="flex-1 h-2/3 md:h-full relative z-0">
        {!isLoading && schools && needs ? (
          <MapComponent schools={schools} needs={needs} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/30">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
