import { Link } from "wouter";
import { Mail, GraduationCap, MapPin, Pencil } from "lucide-react";
import { Need } from "@workspace/api-client-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Button } from "@/components/ui/button";
import { ConnectToHelp } from "@/components/ConnectToHelp";

interface NeedCardProps {
  need: Need;
  onEdit?: (need: Need) => void;
}

export function NeedCard({ need, onEdit }: NeedCardProps) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  
  const title = t(need.titleEn, need.titleKh);
  const description = t(need.descriptionEn, need.descriptionKh);
  const schoolName = t(need.school?.nameEn || "", need.school?.nameKh || "");
  
  const percentFunded = Math.min(100, Math.round((need.fundedAmount / need.goalAmount) * 100));
  const isFullyFunded = percentFunded >= 100;
  
  // Use fallback image if none provided
  const imageUrl = need.photoUrl || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80";

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'Stationery': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Electronics': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Infrastructure': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Books': return 'bg-green-100 text-green-700 border-green-200';
      case 'Sports': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleDonate = () => {
    const email = need.contactEmail || need.school?.contactEmail || "donate@chuysala.org";
    const subject = encodeURIComponent(`Donation inquiry for: ${need.titleEn}`);
    const body = encodeURIComponent(`Hello,\n\nI am interested in helping fund the need: "${need.titleEn}" for ${need.school?.nameEn || 'the school'}.\n\nPlease let me know how I can contribute.\n\nThank you.`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border/60 shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      {/* Image Header */}
      <div className="relative h-56 overflow-hidden bg-muted">
        {/* category tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${getCategoryColor(need.category)}`}>
            {need.category}
          </span>
        </div>

        {/* Edit button — only when admin passes onEdit */}
        {onEdit && (
          <button
            onClick={() => onEdit(need)}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all hover:scale-110"
            title="Edit"
          >
            <Pencil className="w-4 h-4 text-primary" />
          </button>
        )}
        
        {/* fallback to stock photo of school supplies if no photo uploaded */}
        {/* stock photo: school notebooks and pencils */}
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {isFullyFunded && (
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="text-center transform -rotate-12 bg-white px-6 py-3 rounded-2xl shadow-xl">
              <span className="text-primary font-black text-2xl uppercase tracking-widest block">
                {t("Funded!", "បានផ្តល់មូលនិធិ!")}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-3">
          <GraduationCap className="w-4 h-4" />
          <span className={language === 'kh' ? 'font-khmer text-sm' : ''}>{schoolName}</span>
          <span className="text-muted-foreground ml-auto flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {need.school?.province}
          </span>
        </div>
        
        <h3 className={`text-xl font-bold text-foreground mb-3 leading-tight line-clamp-2 ${language === 'kh' ? 'font-khmer' : 'font-display'}`}>
          {title}
        </h3>
        
        <p className={`text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow ${language === 'kh' ? 'font-khmer leading-relaxed' : ''}`}>
          {description}
        </p>
        
        {/* Progress Bar */}
        <div className="mt-auto pt-4 border-t border-border/50">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-2xl font-black text-foreground">${need.fundedAmount}</span>
              <span className="text-sm text-muted-foreground ml-1">
                / ${need.goalAmount}
              </span>
            </div>
            <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
              {percentFunded}%
            </span>
          </div>
          
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden mb-6 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-primary to-light-blue rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentFunded}%` }}
            />
          </div>
          
          <Button 
            onClick={handleDonate}
            disabled={isFullyFunded}
            className="w-full h-12 text-base rounded-xl font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
          >
            <Mail className="w-5 h-5 mr-2" />
            {t("Contact to Donate", "ទាក់ទងដើម្បីបរិច្ចាគ")}
          </Button>

          {!isFullyFunded && (
            <ConnectToHelp
              schoolNameEn={need.school?.nameEn || ""}
              schoolNameKh={need.school?.nameKh || ""}
              needTitleEn={need.titleEn}
              contactPhone={need.school?.contactPhone}
              telegramUsername={null}
            />
          )}
        </div>
      </div>
    </div>
  );
}
