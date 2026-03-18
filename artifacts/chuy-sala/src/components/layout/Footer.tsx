import { Heart } from "lucide-react";
import { useTranslation } from "@/store/use-language";

export function Footer() {
  const t = useTranslation();
  
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
                "Connecting rural Cambodian schools with donors globally. Help provide essential resources for a better education.",
                "ភ្ជាប់សាលារៀននៅតាមជនបទកម្ពុជាជាមួយសប្បុរសជនទូទាំងពិភពលោក។ ជួយផ្តល់ធនធានចាំបាច់សម្រាប់ការអប់រំដ៏ល្អប្រសើរ។"
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
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-6">
              {t("Make a Difference", "បង្កើតភាពខុសគ្នា")}
            </h4>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-sm mb-4 flex items-center gap-2">
                <Heart className="w-4 h-4 text-destructive" fill="currentColor" />
                {t("100% of your donation goes directly to the schools.", "១០០% នៃការបរិច្ចាគរបស់អ្នកទៅដល់សាលារៀនដោយផ្ទាល់។")}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-secondary/50">
          <p>© {new Date().getFullYear()} Chouy Sala. {t("All rights reserved.", "រក្សាសិទ្ធិគ្រប់យ៉ាង។")}</p>
        </div>
      </div>
    </footer>
  );
}
