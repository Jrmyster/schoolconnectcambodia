import { useListCompletedProjects } from "@workspace/api-client-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { CheckCircle, Calendar, GraduationCap } from "lucide-react";
import { format } from "date-fns";

export function CompletedProjects() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  
  const { data: projects, isLoading } = useListCompletedProjects();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-[#0F4270] text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${language === 'kh' ? 'font-khmer leading-tight' : 'font-display'}`}>
            {t("Transparency Log", "កំណត់ហេតុតម្លាភាព")}
          </h1>
          <p className={`text-lg text-white/80 ${language === 'kh' ? 'font-khmer leading-relaxed' : ''}`}>
            {t(
              "See the real impact. When a project is funded and items are delivered, schools post a 'Thank You' update here.",
              "មើលពីផលប៉ះពាល់ពិតប្រាកដ។ នៅពេលដែលគម្រោងទទួលបានមូលនិធិ ហើយសម្ភារៈត្រូវបានប្រគល់ជូន សាលារៀននឹងបង្ហោះព័ត៌មាន 'អរគុណ' នៅទីនេះ។"
            )}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        {isLoading ? (
          <div className="bg-card p-12 rounded-3xl shadow-xl flex justify-center">
            <div className="animate-pulse flex gap-2">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <div className="w-4 h-4 bg-primary rounded-full delay-75"></div>
              <div className="w-4 h-4 bg-primary rounded-full delay-150"></div>
            </div>
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="space-y-8">
            {projects.map(project => (
              <div key={project.id} className="bg-card rounded-3xl shadow-xl border border-border/60 overflow-hidden flex flex-col md:flex-row group">
                <div className="md:w-2/5 h-64 md:h-auto bg-muted relative">
                  <img 
                    src={project.thankYouPhotoUrl || "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80"} 
                    alt="Thank you photo" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {t("Completed", "បានបញ្ចប់")}
                  </div>
                </div>
                <div className="p-8 md:w-3/5 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-4">
                    <GraduationCap className="w-5 h-5" />
                    <span className={language === 'kh' ? 'font-khmer' : ''}>
                      {t(project.school?.nameEn || "", project.school?.nameKh || "")}
                    </span>
                  </div>
                  
                  <h3 className={`text-2xl font-bold text-foreground mb-4 ${language === 'kh' ? 'font-khmer' : 'font-display'}`}>
                    {t(project.titleEn, project.titleKh)}
                  </h3>
                  
                  <p className={`text-muted-foreground mb-6 ${language === 'kh' ? 'font-khmer leading-relaxed text-sm' : ''}`}>
                    {t(project.descriptionEn, project.descriptionKh)}
                  </p>
                  
                  <div className="mt-auto flex items-center text-sm text-muted-foreground border-t border-border pt-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {format(new Date(project.completedAt), "MMMM d, yyyy")}
                    <span className="mx-3 text-border">•</span>
                    <span className="bg-secondary px-2 py-1 rounded-md text-xs font-medium text-foreground">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card p-16 rounded-3xl shadow-xl text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t("No completed projects yet.", "មិនទាន់មានគម្រោងបានបញ្ចប់នៅឡើយទេ។")}
            </h3>
            <p className="text-muted-foreground">
              {t("Check back soon to see the impact of our generous donors.", "សូមត្រលប់មកវិញក្នុងពេលឆាប់ៗនេះដើម្បីមើលពីផលប៉ះពាល់នៃសប្បុរសជនរបស់យើង។")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
