import { useAuth } from "@/context/AuthContext";
import { useSavedCareers, useToggleSavedCareer } from "@/hooks/use-saved-careers";
import { useLanguageStore } from "@/store/use-language";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import careersData from "@/data/careers.json";
import {
  GraduationCap,
  Heart,
  Trash2,
  ExternalLink,
  BookMarked,
  LogIn,
  Loader2,
  User,
} from "lucide-react";

type RawMajor = {
  id: string;
  en: string;
  kh: string;
  icon: string;
  careers: { id: string; en: string; kh: string }[];
};

const allMajors = careersData as RawMajor[];

function t(en: string, kh: string, isKh: boolean) {
  return isKh ? kh : en;
}

export function ProfilePage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const { data: saved = [], isLoading } = useSavedCareers();
  const toggle = useToggleSavedCareer();
  const { toast } = useToast();

  function remove(majorKey: string, careerKey: string) {
    toggle.mutate(
      { majorKey, careerKey, isSaved: true },
      {
        onSuccess: () => {
          toast({
            title: t("Removed from roadmap", "បានដកចេញ", kh),
            duration: 2000,
          });
        },
      },
    );
  }

  function goToCareer(majorKey: string) {
    navigate(`/launchpad?major=${encodeURIComponent(majorKey)}`);
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4"
        style={{ background: "linear-gradient(135deg,#F0F7FF 0%,#EFF6FF 100%)" }}>
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(135deg,#1E3A5F,#2563EB)" }}
        >
          <User size={36} color="white" />
        </div>
        <div className="text-center">
          <h1 className={`text-2xl font-bold text-slate-800 mb-2 ${kh ? "font-khmer" : ""}`}>
            {t("Sign in to view your profile", "ចូលគណនី ដើម្បីមើលប្រូហ្វាយ", kh)}
          </h1>
          <p className={`text-slate-500 text-sm ${kh ? "font-khmer" : ""}`}>
            {t("Save careers and track your roadmap after logging in.", "រក្សាទុកអាជីព និងតាមដានផ្លូវការប្រឡង បន្ទាប់ពីចូល។", kh)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(135deg,#1E3A5F,#2563EB)" }}
        >
          <LogIn size={16} />
          {t("Sign In", "ចូលគណនី", kh)}
        </button>
      </div>
    );
  }

  const groupedSaved = saved.reduce<Record<string, { majorKey: string; careerKey: string }[]>>(
    (acc, s) => {
      if (!acc[s.majorKey]) acc[s.majorKey] = [];
      acc[s.majorKey].push(s);
      return acc;
    },
    {},
  );

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg,#F0F7FF 0%,#EFF6FF 100%)" }}>
      {/* ── Hero ───────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1E3A5F 0%,#2563EB 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 25% 25%, #60A5FA 0%, transparent 50%), radial-gradient(circle at 75% 75%, #93C5FD 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)" }}
            >
              <GraduationCap size={28} color="white" />
            </div>
            <div>
              <p className="text-blue-200 text-sm font-semibold tracking-wide mb-1">
                {t("Your Profile", "ប្រូហ្វាយរបស់អ្នក", kh)}
              </p>
              <h1 className={`text-2xl sm:text-3xl font-bold text-white mb-1 ${kh ? "font-khmer" : ""}`}>
                {user.school
                  ? (kh ? user.school.nameKh : user.school.nameEn)
                  : user.email}
              </h1>
              {user.school && (
                <p className="text-blue-200 text-sm">{user.email}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Career Roadmap ─────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#1E3A5F,#2563EB)" }}
          >
            <BookMarked size={18} color="white" />
          </div>
          <div>
            <h2 className={`text-xl font-bold text-slate-800 ${kh ? "font-khmer" : ""}`}>
              {t("My Career Roadmap", "ផែនទីអាជីពរបស់ខ្ញុំ", kh)}
            </h2>
            <p className={`text-slate-500 text-sm ${kh ? "font-khmer" : ""}`}>
              {t(
                "Careers you've saved from Future Pathways",
                "អាជីពដែលអ្នកបានរក្សាទុកពី Future Pathways",
                kh,
              )}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={32} className="animate-spin text-blue-400" />
          </div>
        ) : saved.length === 0 ? (
          <div
            className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-16 gap-4 text-center px-6"
            style={{ borderColor: "#BFDBFE", background: "rgba(255,255,255,0.7)" }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "#EFF6FF" }}
            >
              <Heart size={24} color="#93C5FD" />
            </div>
            <div>
              <p className={`font-bold text-slate-700 text-base mb-1 ${kh ? "font-khmer" : ""}`}>
                {t("No saved careers yet", "មិនទាន់មានអាជីពដែលបានរក្សាទុក", kh)}
              </p>
              <p className={`text-slate-400 text-sm ${kh ? "font-khmer" : ""}`}>
                {t(
                  "Explore Future Pathways and tap the heart icon to save careers you like.",
                  "ស្វែងរក Future Pathways ហើយចុចរូបបេះដូង ដើម្បីរក្សាទុកអាជីព។",
                  kh,
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/launchpad")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
              style={{ background: "linear-gradient(135deg,#1E3A5F,#2563EB)" }}
            >
              <ExternalLink size={15} />
              {t("Explore Future Pathways", "ស្វែងរក Future Pathways", kh)}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {Object.entries(groupedSaved).map(([majorKey, careers]) => {
              const major = allMajors.find(m => m.id === majorKey);
              if (!major) return null;
              const majorName = kh ? major.kh : major.en;

              return (
                <div
                  key={majorKey}
                  className="rounded-2xl overflow-hidden shadow-sm border"
                  style={{ borderColor: "#BFDBFE", background: "rgba(255,255,255,0.95)" }}
                >
                  {/* Major header */}
                  <button
                    type="button"
                    onClick={() => goToCareer(majorKey)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left hover:opacity-90 transition-opacity"
                    style={{ background: "linear-gradient(90deg,#1E3A5F,#2563EB)" }}
                  >
                    <span className="text-2xl">{major.icon}</span>
                    <p className={`font-bold text-white text-base flex-1 ${kh ? "font-khmer" : ""}`}>
                      {majorName}
                    </p>
                    <ExternalLink size={16} color="rgba(255,255,255,0.7)" />
                  </button>

                  {/* Career list */}
                  <div className="divide-y" style={{ borderColor: "#EFF6FF" }}>
                    {careers.map(({ careerKey }) => {
                      const careerData = major.careers.find(c => c.id === careerKey);
                      if (!careerData) return null;
                      const careerName = kh ? careerData.kh : careerData.en;

                      return (
                        <div
                          key={careerKey}
                          className="flex items-center gap-3 px-5 py-3.5"
                        >
                          <Heart size={14} fill="#EF4444" stroke="#EF4444" className="flex-shrink-0" />
                          <p className={`flex-1 text-sm font-medium text-slate-700 ${kh ? "font-khmer" : ""}`}>
                            {careerName}
                          </p>
                          <button
                            type="button"
                            onClick={() => remove(majorKey, careerKey)}
                            disabled={toggle.isPending}
                            aria-label={t("Remove", "លុប", kh)}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 transition-all flex-shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
