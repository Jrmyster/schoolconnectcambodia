import { useListSchools, useListNeeds } from "@workspace/api-client-react";
import { MapComponent } from "@/components/MapComponent";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Loader2, Map as MapIcon } from "lucide-react";

export function MapPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  
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
                <div key={school.id} className="bg-white p-4 rounded-xl border border-border shadow-sm hover:border-primary/30 transition-colors">
                  <h3 className={`font-bold text-foreground mb-1 ${language === 'kh' ? 'font-khmer text-sm' : ''}`}>
                    {t(school.nameEn, school.nameKh)}
                  </h3>
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
                </div>
              );
            })
          )}
        </div>
      </div>
      
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
