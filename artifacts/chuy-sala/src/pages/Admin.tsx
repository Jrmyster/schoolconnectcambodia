import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateSchool,
  useCreateNeed,
  useListSchools,
  NeedCategory,
  CreateSchoolRequest,
  CreateNeedRequest
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { PhotoUploader } from "@/components/PhotoUploader";
import { useToast } from "@/hooks/use-toast";
import { Building, Heart, UserPlus } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

const CAMBODIA_PROVINCES = [
  "Banteay Meanchey","Battambang","Kampong Cham","Kampong Chhnang","Kampong Speu",
  "Kampong Thom","Kampot","Kandal","Kep","Koh Kong","Kratié","Mondulkiri",
  "Oddar Meanchey","Pailin","Phnom Penh","Preah Sihanouk","Preah Vihear",
  "Prey Veng","Pursat","Ratanakiri","Siem Reap","Stung Treng","Svay Rieng",
  "Takéo","Tboung Khmum",
];

export function Admin() {
  const [activeTab, setActiveTab] = useState<"signup" | "school" | "need">("signup");
  const [schoolPhotoUrl, setSchoolPhotoUrl] = useState("");
  const [needPhotoUrl, setNeedPhotoUrl] = useState("");
  const { toast } = useToast();
  const { data: schools } = useListSchools();
  const t = useTranslation();
  const { language } = useLanguageStore();

  const createSchoolMutation = useCreateSchool();
  const createNeedMutation = useCreateNeed();

  // --- Simple Sign-Up Form ---
  const { register: regSignup, handleSubmit: handleSignupSubmit, reset: resetSignup } = useForm<{
    nameEn: string; province: string; pin: string;
  }>();

  const onSignupSubmit = (data: { nameEn: string; province: string; pin: string }) => {
    const payload: CreateSchoolRequest = {
      nameEn: data.nameEn,
      nameKh: data.nameEn, // default; can update later
      province: data.province,
      district: "—",
      latitude: 12.5,
      longitude: 104.9,
      description: `PIN: ${data.pin}`,
    };
    createSchoolMutation.mutate({ data: payload }, {
      onSuccess: () => {
        toast({ title: t("Registered!", "បានចុះឈ្មោះ!"), description: t("Your school has been added to the platform.", "សាលារបស់អ្នកត្រូវបានបន្ថែមទៅក្នុងប្រព័ន្ធ។") });
        resetSignup();
      },
      onError: (err: any) => {
        toast({ variant: "destructive", title: "Error", description: err.message });
      }
    });
  };

  // --- Full School Form ---
  const { register: registerSchool, handleSubmit: handleSchoolSubmit, reset: resetSchool } = useForm<CreateSchoolRequest>();

  const onSchoolSubmit = (data: CreateSchoolRequest) => {
    createSchoolMutation.mutate({ data: {
      ...data,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      studentCount: data.studentCount ? Number(data.studentCount) : undefined,
      photoUrl: schoolPhotoUrl || undefined,
    }}, {
      onSuccess: () => {
        toast({ title: "Success", description: "School created successfully" });
        resetSchool();
        setSchoolPhotoUrl("");
      },
      onError: (err: any) => {
        toast({ variant: "destructive", title: "Error", description: err.message });
      }
    });
  };

  // --- Need Form ---
  const { register: registerNeed, handleSubmit: handleNeedSubmit, reset: resetNeed } = useForm<CreateNeedRequest>();

  const onNeedSubmit = (data: CreateNeedRequest) => {
    createNeedMutation.mutate({ data: {
      ...data,
      schoolId: Number(data.schoolId),
      goalAmount: Number(data.goalAmount),
      photoUrl: needPhotoUrl || undefined,
    }}, {
      onSuccess: () => {
        toast({ title: "Success", description: "Need created successfully" });
        resetNeed();
        setNeedPhotoUrl("");
      },
      onError: (err: any) => {
        toast({ variant: "destructive", title: "Error", description: err.message });
      }
    });
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-background";

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold text-foreground ${language === 'kh' ? 'font-khmer' : 'font-display'}`}>
            {t("Admin Dashboard", "ផ្ទាំងគ្រប់គ្រង")}
          </h1>
          <p className={`text-muted-foreground mt-2 ${language === 'kh' ? 'font-khmer' : ''}`}>
            {t("Manage schools and submit new needs to the platform.", "គ្រប់គ្រងសាលា និងដាក់ស្នើតម្រូវការថ្មីទៅក្នុងប្រព័ន្ធ។")}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-card p-2 rounded-2xl shadow-sm border border-border flex-wrap">
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'} ${
              activeTab === "signup" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <UserPlus className="w-4 h-4 flex-shrink-0" />
            {t("School Sign-Up", "ចុះឈ្មោះសាលា")}
          </button>
          <button
            onClick={() => setActiveTab("school")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'} ${
              activeTab === "school" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Building className="w-4 h-4 flex-shrink-0" />
            {t("Register Full School Profile", "ចុះឈ្មោះប្រវត្តិសាលាពេញលេញ")}
          </button>
          <button
            onClick={() => setActiveTab("need")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'} ${
              activeTab === "need" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Heart className="w-4 h-4 flex-shrink-0" />
            {t("Post a Need", "បង្ហោះតម្រូវការ")}
          </button>
        </div>

        <div className="bg-card rounded-3xl shadow-xl border border-border p-8">

          {/* ── SIGN-UP TAB ── */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignupSubmit(onSignupSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <h2 className={`text-2xl font-bold border-b pb-4 ${language === 'kh' ? 'font-khmer' : ''}`}>
                  {t("Register Your School", "ចុះឈ្មោះសាលារបស់អ្នក")}
                </h2>
                <p className={`text-muted-foreground mt-2 text-sm ${language === 'kh' ? 'font-khmer' : ''}`}>
                  {t("Just three steps to get started. You can add more details later.", "គ្រាន់តែបីជំហានដើម្បីចាប់ផ្តើម។ អ្នកអាចបន្ថែមព័ត៌មានលំអិតបន្ថែមទៀតនៅពេលក្រោយ។")}
                </p>
              </div>

              <div className="space-y-6">
                {/* School Name */}
                <div className="space-y-2">
                  <label className={`text-sm font-bold text-foreground ${language === 'kh' ? 'font-khmer' : ''}`}>
                    {t("School Name", "ឈ្មោះសាលា")} *
                  </label>
                  <input
                    {...regSignup("nameEn", { required: true })}
                    className={`${inputClass} text-lg`}
                    placeholder={t("e.g. Kampong Cham High School", "ឧ. វិទ្យាល័យកំពង់ចាម")}
                  />
                </div>

                {/* Province */}
                <div className="space-y-2">
                  <label className={`text-sm font-bold text-foreground ${language === 'kh' ? 'font-khmer' : ''}`}>
                    {t("Province", "ខេត្ត")} *
                  </label>
                  <select
                    {...regSignup("province", { required: true })}
                    className={`${inputClass} text-lg`}
                  >
                    <option value="">{t("Select your province", "ជ្រើសរើសខេត្តរបស់អ្នក")}</option>
                    {CAMBODIA_PROVINCES.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Password / PIN */}
                <div className="space-y-2">
                  <label className={`text-sm font-bold text-foreground ${language === 'kh' ? 'font-khmer' : ''}`}>
                    {t("Password", "ពាក្យសម្ងាត់")} *
                  </label>
                  <input
                    type="password"
                    {...regSignup("pin", { required: true, minLength: 4 })}
                    className={`${inputClass} text-lg`}
                    placeholder="••••••••"
                  />
                  <p className={`text-xs text-muted-foreground ${language === 'kh' ? 'font-khmer' : ''}`}>
                    {t("Choose a password to manage your school profile.", "ជ្រើសរើសពាក្យសម្ងាត់ដើម្បីគ្រប់គ្រងប្រវត្តិរូបសាលារបស់អ្នក។")}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end">
                <Button
                  type="submit"
                  disabled={createSchoolMutation.isPending}
                  className="px-10 py-6 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20"
                >
                  {createSchoolMutation.isPending
                    ? t("Registering...", "កំពុងចុះឈ្មោះ...")
                    : t("Register School", "ចុះឈ្មោះសាលា")}
                </Button>
              </div>
            </form>
          )}

          {/* ── FULL PROFILE TAB ── */}
          {activeTab === "school" && (
            <form onSubmit={handleSchoolSubmit(onSchoolSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className={`text-2xl font-bold border-b pb-4 ${language === 'kh' ? 'font-khmer' : ''}`}>
                {t("Register Full School Profile", "ចុះឈ្មោះប្រវត្តិសាលាពេញលេញ")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`font-bold text-foreground block ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}>
                    {t("Name (English)", "ឈ្មោះ (ភាសាអង់គ្លេស)")}*
                  </label>
                  <input {...registerSchool("nameEn", { required: true })} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className={`font-bold text-foreground block ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}>
                    {t("Name (Khmer)", "ឈ្មោះ (ភាសាខ្មែរ)")}*
                  </label>
                  <input {...registerSchool("nameKh", { required: true })} className={`${inputClass} font-khmer`} />
                </div>

                <div className="space-y-2">
                  <label className={`font-bold text-foreground block ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}>
                    {t("Province", "ខេត្ត")}*
                  </label>
                  <select {...registerSchool("province", { required: true })} className={inputClass}>
                    <option value="">{t("Select province", "ជ្រើសរើសខេត្ត")}</option>
                    {CAMBODIA_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className={`font-bold text-foreground block ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}>
                    {t("District", "ស្រុក/ខណ្ឌ")}*
                  </label>
                  <input {...registerSchool("district", { required: true })} className={inputClass} />
                </div>

                <div className="space-y-2">
                  <label className={`font-bold text-foreground block ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}>
                    {t("Latitude", "រដ្ឋបាលបណ្តោយ (Latitude)")}*
                  </label>
                  <input type="number" step="any" {...registerSchool("latitude", { required: true })} className={inputClass} placeholder="12.5" />
                </div>
                <div className="space-y-2">
                  <label className={`font-bold text-foreground block ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}>
                    {t("Longitude", "រដ្ឋបាលទទឹង (Longitude)")}*
                  </label>
                  <input type="number" step="any" {...registerSchool("longitude", { required: true })} className={inputClass} placeholder="105.0" />
                </div>

                <div className="space-y-2">
                  <label className={`font-bold text-foreground block ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}>
                    {t("Contact Email", "អ៊ីមែលទំនាក់ទំនង")}
                  </label>
                  <input type="email" {...registerSchool("contactEmail")} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className={`font-bold text-foreground block ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}>
                    {t("Student Count", "ចំនួនសិស្ស")}
                  </label>
                  <input type="number" {...registerSchool("studentCount")} className={inputClass} />
                </div>

                <div className="md:col-span-2">
                  <PhotoUploader
                    label={t("School Photo", "រូបថតសាលា")}
                    onUpload={setSchoolPhotoUrl}
                    currentUrl={schoolPhotoUrl}
                  />
                </div>
              </div>

              <div className="pt-4 border-t mt-8 flex justify-end">
                <Button type="submit" disabled={createSchoolMutation.isPending} className={`px-8 py-6 rounded-xl text-lg font-bold ${language === 'kh' ? 'font-khmer' : ''}`}>
                  {createSchoolMutation.isPending
                    ? t("Saving...", "កំពុងរក្សាទុក...")
                    : t("Create School Profile", "បង្កើតប្រវត្តិសាលា")}
                </Button>
              </div>
            </form>
          )}

          {/* ── NEED TAB ── */}
          {activeTab === "need" && (
            <form onSubmit={handleNeedSubmit(onNeedSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold border-b pb-4">Create School Need</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-foreground">Select School*</label>
                  <select {...registerNeed("schoolId", { required: true })} className={inputClass}>
                    <option value="">-- Choose a school --</option>
                    {schools?.map(s => (
                      <option key={s.id} value={s.id}>{s.nameEn} ({s.province})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Title (English)*</label>
                  <input {...registerNeed("titleEn", { required: true })} className={inputClass} placeholder="e.g. 50 Library Books" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground font-khmer">Title (Khmer)*</label>
                  <input {...registerNeed("titleKh", { required: true })} className={`${inputClass} font-khmer`} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Description (English)*</label>
                  <textarea {...registerNeed("descriptionEn", { required: true })} rows={4} className={`${inputClass} resize-none`} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground font-khmer">Description (Khmer)*</label>
                  <textarea {...registerNeed("descriptionKh", { required: true })} rows={4} className={`${inputClass} resize-none font-khmer`} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Category*</label>
                  <select {...registerNeed("category", { required: true })} className={inputClass}>
                    {Object.values(NeedCategory).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Goal Amount (USD)*</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 font-bold text-muted-foreground">$</span>
                    <input type="number" {...registerNeed("goalAmount", { required: true, min: 1 })} className={`${inputClass} pl-8`} placeholder="500" />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <PhotoUploader label="Need Photo" onUpload={setNeedPhotoUrl} currentUrl={needPhotoUrl} />
                </div>
              </div>

              <div className="pt-4 border-t mt-8 flex justify-end">
                <Button type="submit" disabled={createNeedMutation.isPending} className="px-8 py-6 rounded-xl text-lg font-bold">
                  {createNeedMutation.isPending ? "Creating..." : "Post Need"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
