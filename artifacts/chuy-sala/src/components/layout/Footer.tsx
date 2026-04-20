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
              {t("Make a Difference", "បង្កើតភាពខុសគ្នា")}
            </h4>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm flex flex-col gap-4">
              <p className="text-sm flex items-center gap-2">
                <Heart className="w-4 h-4 text-destructive flex-shrink-0" fill="currentColor" />
                {t("100% of your donation goes directly to the schools.", "១០០% នៃការបរិច្ចាគរបស់អ្នកទៅដល់សាលារៀនដោយផ្ទាល់។")}
              </p>
              <DownloadGuideButton className="w-full justify-center" />
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-secondary/50 space-y-4">
          <p>© {new Date().getFullYear()} Chouy Sala. {t("All rights reserved.", "រក្សាសិទ្ធិគ្រប់យ៉ាង។")}</p>
          <div className="max-w-2xl mx-auto text-xs text-secondary/40 leading-relaxed space-y-1">
            <p className="font-semibold text-secondary/50">
              {t("Funding & Privacy Policy", "គោលការណ៍មូលនិធិ និងភាពឯកជន")}
            </p>
            <p>
              {t(
                "This project is managed by a Peace Corps Volunteer. Donations are used solely for server hosting and resource development.",
                "គម្រោងនេះត្រូវបានគ្រប់គ្រងដោយអ្នកស្ម័គ្រចិត្ត Peace Corps ។ ការបរិច្ចាគត្រូវបានប្រើប្រាស់សម្រាប់តែការបង្ហោះម៉ាស៊ីនមេ និងការអភិវឌ្ឍន៍ធនធានប៉ុណ្ណោះ។"
              )}
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
        </div>
      </div>
    </footer>
  );
}
