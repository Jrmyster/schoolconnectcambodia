import { useState } from "react";
import { useListSchools, useListNeeds } from "@workspace/api-client-react";
import { MapComponent } from "@/components/MapComponent";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Link } from "wouter";
import { Loader2, Map as MapIcon, ChevronRight, Heart, X, QrCode } from "lucide-react";

// ── Replace this URL with your GitHub-hosted QR code image ──
const DONATION_QR_URL =
  "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https%3A%2F%2Fgithub.com%2Fchouysala&bgcolor=ffffff&color=1A6EA8&margin=10";

function SupportModal({ onClose }: { onClose: () => void }) {
  const t = useTranslation();
  const { language } = useLanguageStore();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border border-border"
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
          <h2 className={`text-xl font-bold leading-tight ${language === "kh" ? "font-khmer" : "font-display"}`}>
            {t("Support Cambodian Schools", "គាំទ្រសាលារៀនខ្មែរ")}
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-6 text-center space-y-5">
          {/* Message */}
          <p className={`text-muted-foreground leading-relaxed ${language === "kh" ? "font-khmer text-base leading-loose" : "text-sm"}`}>
            {t(
              "Your donation helps cover Replit hosting costs for rural Cambodian schools, keeping their digital presence alive and their needs visible to the world.",
              "ការបរិច្ចាគរបស់អ្នកជួយរ៉ាប់រងថ្លៃដំណើរការ Replit សម្រាប់សាលារៀននៅជនបទកម្ពុជា ដើម្បីឱ្យតម្រូវការរបស់ពួកគេត្រូវបានមើលឃើញដោយពិភពលោក។"
            )}
          </p>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-white rounded-2xl border-2 border-border shadow-sm inline-block">
              <img
                src={DONATION_QR_URL}
                alt="Donation QR Code"
                className="w-[180px] h-[180px] rounded-lg"
                onError={e => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                }}
              />
              <div className="hidden w-[180px] h-[180px] flex items-center justify-center bg-muted/30 rounded-lg">
                <QrCode className="w-16 h-16 text-muted-foreground/40" />
              </div>
            </div>
            <p className={`text-xs text-muted-foreground ${language === "kh" ? "font-khmer" : ""}`}>
              {t("Scan to donate", "ស្កេនដើម្បីបរិច្ចាគ")}
            </p>
          </div>

          {/* Footer note */}
          <p className={`text-xs text-muted-foreground/70 ${language === "kh" ? "font-khmer" : ""}`}>
            {t(
              "Every contribution, big or small, makes a difference for students in need.",
              "រាល់ការចូលរួម មិនថាតូច ឬធំ នឹងបង្កើតភាពខុសគ្នាសម្រាប់សិស្សដែលត្រូវការ។"
            )}
          </p>
        </div>

        {/* Close button */}
        <div className="px-6 pb-6">
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
            {t("Support Cambodian Schools", "គាំទ្រសាលារៀនខ្មែរ")}
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
