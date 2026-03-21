import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateSchool,
  useCreateNeed,
  useListSchools,
  useListNeeds,
  CreateSchoolRequest,
  CreateNeedRequest,
  School,
  Need,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { PhotoUploader } from "@/components/PhotoUploader";
import { useToast } from "@/hooks/use-toast";
import { Building, Heart, UserPlus, BarChart2, Pencil, LayoutList } from "lucide-react";
import { Link } from "wouter";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { EditSchoolModal } from "@/components/EditSchoolModal";
import { EditNeedModal } from "@/components/EditNeedModal";

const CAMBODIA_PROVINCES = [
  "Banteay Meanchey","Battambang","Kampong Cham","Kampong Chhnang","Kampong Speu",
  "Kampong Thom","Kampot","Kandal","Kep","Koh Kong","Kratié","Mondulkiri",
  "Oddar Meanchey","Pailin","Phnom Penh","Preah Sihanouk","Preah Vihear",
  "Prey Veng","Pursat","Ratanakiri","Siem Reap","Stung Treng","Svay Rieng",
  "Takéo","Tboung Khmum",
];

const DISTRICTS_BY_PROVINCE: Record<string, string[]> = {
  "Banteay Meanchey": ["Serei Saophoan","Mongkol Borei","Poipet","Svay Chek","Thma Puok","Ou Chrov","Preah Netr Preah","Phnum Srok"],
  "Battambang": ["Battambang","Banan","Bavel","Ek Phnom","Kamrieng","Koa Kraol","Maung Russei","Phnom Proek","Ratanak Mondul","Rukhak Kiri","Samlout","Sampov Lun","Sangkae","Thmor Koul"],
  "Kampong Cham": ["Kampong Cham","Batheay","Chamkar Leu","Cheung Prey","Kampong Siem","Kang Meas","Koh Soutin","Prey Chhor","Srey Santhor","Stung Trang"],
  "Kampong Chhnang": ["Kampong Chhnang","Baribour","Chol Kiri","Kampong Leaeng","Kampong Tralach","Kirivong","Rolea B'ier","Samaki Meanchey","Sameakki Mean Chey","Tuek Phos"],
  "Kampong Speu": ["Chbar Mon","Basedth","Kong Pisei","Oral","Phnom Sruoch","Samraong Tong","Thpong"],
  "Kampong Thom": ["Stung Sen","Baray","Kampong Svay","Prasat Ballangk","Prasat Sambour","Sandann","Stoung","Tbaeng Meanchey"],
  "Kampot": ["Kampot","Angkor Chey","Chhuk","Chum Kiri","Dang Tong","Teuk Chhou","Banteay Meas"],
  "Kandal": ["Ta Khmau","Ang Snuol","Kamboul","Kandal Stung","Kien Svay","Khsach Kandal","Leuk Daek","Loeuk Dek","Muk Kampul","Ponhea Lueu","Prey Kabas","Roha Kiri","S'ang","Saarthou"],
  "Kep": ["Kep","Damnak Chang'aeur"],
  "Koh Kong": ["Koh Kong","Botum Sakor","Kiri Sakor","Mondol Seima","Smach Mean Chey","Sre Ambel","Thma Bang"],
  "Kratié": ["Kratié","Chhloung","Prek Prasab","Sambour","Snuol"],
  "Mondulkiri": ["Senmonorom","Kaev Seima","Koh Nhek","O Reang Au","Pechr Chenda"],
  "Oddar Meanchey": ["Samraong","Anlong Veng","Banteay Ampil","Chong Kal","Trapeang Prasat"],
  "Pailin": ["Pailin","Sala Krau"],
  "Phnom Penh": ["Chamkar Mon","Daun Penh","7 Makara","Tuol Kork","Dangkao","Mean Chey","Russei Keo","Saensokh","Pur Senchey","Chraoy Chongvar","Praek Pnov","Chbar Ampov","Boeng Keng Kang","Kamboul","Posenchey"],
  "Preah Sihanouk": ["Preah Sihanouk","Prey Nob","Stueng Hav","Kampong Seila"],
  "Preah Vihear": ["Tbeng Meanchey","Chhaeb","Choam Ksan","Kuleaen","Rovieng","Sangkom Thmei","Srayang"],
  "Prey Veng": ["Prey Veng","Ba Phnom","Kamchay Mear","Kanhchriech","Me Sang","Peam Chor","Peam Ro","Pea Reang","Preah Sdach","Puok","Sithor Kandal","Svay Antor","Svay Chrum","Svay Teab"],
  "Pursat": ["Pursat","Bakan","Kandieng","Krakor","Phnom Kravanh","Veal Veaeng"],
  "Ratanakiri": ["Ban Lung","Bar Kaev","Koun Mom","Lumphat","O Chum","O Ya Dav","Ou Chum","Padah Chha","Taveng","Veun Sai"],
  "Siem Reap": ["Siem Reap","Angkor Chum","Angkor Thom","Banteay Srei","Chi Kraeng","Kralanh","Prasat Bakong","Puok","Soutr Nikom","Srei Snam","Svay Leu","Varin"],
  "Stung Treng": ["Stung Treng","Siem Bouk","Siem Pang","Thala Barivat","Borei O'Chresau"],
  "Svay Rieng": ["Svay Rieng","Kampong Rou","Chantrea","Komrieng","Romeas Hek","Svay Chrum","Svay Teab"],
  "Takéo": ["Doun Kaev","Angkor Borei","Bati","Borei Cholsar","Kaoh Andaet","Kirivong","Kiri Vong","Prey Kabbas","Samraong","Treang"],
  "Tboung Khmum": ["Suong","Dambae","Krouch Chhmar","Memot","Ou Reang Ov","Ponhea Kraek","Tbong Khmum"],
};

const CATEGORY_OPTIONS: { value: string; en: string; kh: string }[] = [
  { value: "Electronics",       en: "Electronics & Tech",          kh: "គ្រឿងអេឡិចត្រូនិក និងបច្ចេកវិទ្យា" },
  { value: "Books",             en: "Books & Stationery",           kh: "សៀវភៅ និងសម្ភារៈសិក្សា" },
  { value: "Furniture",         en: "Furniture",                    kh: "គ្រឿងសង្ហារឹម" },
  { value: "Infrastructure",    en: "Infrastructure & Repair",      kh: "ហេដ្ឋារចនាសម្ព័ន្ធ និងការជួសជុល" },
  { value: "WASH",              en: "Water & Sanitation (WASH)",    kh: "ទឹកស្អាត និងអនាម័យ" },
  { value: "Sports",            en: "Sports & Arts",                kh: "កីឡា និងសិល្បៈ" },
  { value: "Teacher Training",  en: "Teacher Training",             kh: "ការបណ្តុះបណ្តាលគ្រូ" },
  { value: "Other",             en: "Other",                        kh: "ផ្សេងៗ" },
];

export function Admin() {
  const [activeTab, setActiveTab] = useState<"signup" | "school" | "need" | "manage">("signup");
  const [schoolPhotoUrl, setSchoolPhotoUrl] = useState("");
  const [needPhotoUrl, setNeedPhotoUrl] = useState("");
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [editingNeed, setEditingNeed] = useState<Need | null>(null);
  const { toast } = useToast();
  const { data: schools } = useListSchools();
  const { data: needs } = useListNeeds();
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
  const { register: registerSchool, handleSubmit: handleSchoolSubmit, reset: resetSchool, watch: watchSchool, setValue: setSchoolValue } = useForm<CreateSchoolRequest>();
  const selectedProvince = watchSchool("province");
  const availableDistricts = selectedProvince ? (DISTRICTS_BY_PROVINCE[selectedProvince] ?? []) : [];

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
          <Link
            href="/admin/dashboard"
            className={`inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-sm transition-colors ${language === 'kh' ? 'font-khmer text-base' : ''}`}
          >
            <BarChart2 className="w-4 h-4" />
            {t("View Dashboard", "មើលផ្ទាំងព័ត៌មាន")}
          </Link>
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
          <button
            onClick={() => setActiveTab("manage")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'} ${
              activeTab === "manage" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <LayoutList className="w-4 h-4 flex-shrink-0" />
            {t("Manage", "គ្រប់គ្រង")}
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
                  <select
                    {...registerSchool("province", { required: true })}
                    className={inputClass}
                    onChange={(e) => {
                      setSchoolValue("province", e.target.value);
                      setSchoolValue("district", "");
                    }}
                  >
                    <option value="">{t("Select province", "ជ្រើសរើសខេត្ត")}</option>
                    {CAMBODIA_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className={`font-bold text-foreground block ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}>
                    {t("District", "ស្រុក/ខណ្ឌ")}*
                  </label>
                  <select
                    {...registerSchool("district", { required: true })}
                    className={inputClass}
                    disabled={!selectedProvince || availableDistricts.length === 0}
                  >
                    <option value="">
                      {!selectedProvince
                        ? t("Select a province first", "សូមជ្រើសរើសខេត្តជាមុន")
                        : t("Select district", "ជ្រើសរើសស្រុក/ខណ្ឌ")}
                    </option>
                    {availableDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
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
              <h2 className={`text-2xl font-bold border-b pb-4 ${language === 'kh' ? 'font-khmer' : ''}`}>
                {t("Create School Need", "បង្កើតតម្រូវការសាលារៀន")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* School selector */}
                <div className="space-y-2 md:col-span-2">
                  <label className={`font-semibold text-foreground block ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}>
                    {t("Select School", "ជ្រើសរើសសាលារៀន")}*
                  </label>
                  <select {...registerNeed("schoolId", { required: true })} className={inputClass}>
                    <option value="">{t("-- Choose a school --", "-- សូមជ្រើសរើសសាលារៀន --")}</option>
                    {schools?.map(s => (
                      <option key={s.id} value={s.id}>{s.nameEn} ({s.province})</option>
                    ))}
                  </select>
                </div>

                {/* Category — positioned between school and title per spec */}
                <div className="space-y-2 md:col-span-2">
                  <label className={`font-semibold text-foreground block ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}>
                    {t("Category", "ប្រភេទ")}*
                  </label>
                  <select {...registerNeed("category", { required: true })} className={inputClass}>
                    <option value="">{t("-- Select Category --", "-- ជ្រើសរើសប្រភេទ --")}</option>
                    {CATEGORY_OPTIONS.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {language === 'kh' ? cat.kh : cat.en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title EN */}
                <div className="space-y-2">
                  <label className={`font-semibold text-foreground block ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}>
                    {t("Title (English)", "ចំណងជើង (ភាសាអង់គ្លេស)")}*
                  </label>
                  <input
                    {...registerNeed("titleEn", { required: true })}
                    className={inputClass}
                    placeholder={t("e.g. 50 Library Books", "ឧទាហរណ៍៖ សៀវភៅបណ្ណាល័យចំនួន ៥០ ក្បាល")}
                  />
                </div>

                {/* Title KH */}
                <div className="space-y-2">
                  <label className={`font-semibold text-foreground block ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}>
                    {t("Title (Khmer)", "ចំណងជើង (ភាសាខ្មែរ)")}*
                  </label>
                  <input
                    {...registerNeed("titleKh", { required: true })}
                    className={`${inputClass} font-khmer`}
                  />
                </div>

                {/* Description EN */}
                <div className="space-y-2">
                  <label className={`font-semibold text-foreground block ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}>
                    {t("Description (English)", "ការពិពណ៌នា (ភាសាអង់គ្លេស)")}*
                  </label>
                  <textarea
                    {...registerNeed("descriptionEn", { required: true })}
                    rows={4}
                    className={`${inputClass} resize-none leading-relaxed`}
                  />
                </div>

                {/* Description KH */}
                <div className="space-y-2">
                  <label className={`font-semibold text-foreground block ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}>
                    {t("Description (Khmer)", "ការពិពណ៌នា (ភាសាខ្មែរ)")}*
                  </label>
                  <textarea
                    {...registerNeed("descriptionKh", { required: true })}
                    rows={4}
                    className={`${inputClass} resize-none font-khmer leading-loose`}
                  />
                </div>

                {/* Goal Amount */}
                <div className="space-y-2">
                  <label className={`font-semibold text-foreground block ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}>
                    {t("Goal Amount (USD)", "ចំនួនទឹកប្រាក់គោលដៅ (ដុល្លារ)")}*
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 font-bold text-muted-foreground">$</span>
                    <input
                      type="number"
                      {...registerNeed("goalAmount", { required: true, min: 1 })}
                      className={`${inputClass} pl-8`}
                      placeholder="500"
                    />
                  </div>
                </div>

                {/* Photo */}
                <div className="md:col-span-2">
                  <PhotoUploader
                    label={t("Need Photo", "រូបថតតម្រូវការ")}
                    onUpload={setNeedPhotoUrl}
                    currentUrl={needPhotoUrl}
                  />
                </div>
              </div>

              <div className="pt-4 border-t mt-8 flex justify-end">
                <Button
                  type="submit"
                  disabled={createNeedMutation.isPending}
                  className={`px-8 py-6 rounded-xl text-lg font-bold ${language === 'kh' ? 'font-khmer' : ''}`}
                >
                  {createNeedMutation.isPending
                    ? t("Submitting...", "កំពុងដាក់បញ្ជូន...")
                    : t("Submit", "ដាក់បញ្ជូន")}
                </Button>
              </div>
            </form>
          )}

          {/* ── MANAGE TAB ── */}
          {activeTab === "manage" && (
            <div className="space-y-10">
              {/* Schools Section */}
              <section>
                <h2 className={`text-xl font-bold mb-4 text-foreground ${language === 'kh' ? 'font-khmer' : ''}`}>
                  🏫 {t("Schools", "សាលា")}
                </h2>
                {!schools?.length ? (
                  <p className={`text-muted-foreground text-sm ${language === 'kh' ? 'font-khmer' : ''}`}>
                    {t("No schools registered yet.", "មិនទាន់មានសាលាណាចុះឈ្មោះ។")}
                  </p>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted text-muted-foreground">
                          <th className={`text-left px-4 py-3 font-semibold ${language === 'kh' ? 'font-khmer text-base' : ''}`}>{t("School", "សាលា")}</th>
                          <th className={`text-left px-4 py-3 font-semibold ${language === 'kh' ? 'font-khmer text-base' : ''}`}>{t("Province", "ខេត្ត")}</th>
                          <th className={`text-left px-4 py-3 font-semibold ${language === 'kh' ? 'font-khmer text-base' : ''}`}>{t("District", "ស្រុក")}</th>
                          <th className="px-4 py-3 w-24"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {schools.map((school, i) => (
                          <tr key={school.id} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                            <td className="px-4 py-3">
                              <div className={`font-semibold text-foreground ${language === 'kh' ? 'font-khmer' : ''}`}>
                                {language === 'kh' ? school.nameKh : school.nameEn}
                              </div>
                              {school.contactEmail && (
                                <div className="text-xs text-muted-foreground mt-0.5">{school.contactEmail}</div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">{school.province}</td>
                            <td className="px-4 py-3 text-muted-foreground">{school.district || "—"}</td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => setEditingSchool(school)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-colors"
                              >
                                <Pencil className="w-3 h-3" />
                                {t("Edit", "កែប្រែ")}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              {/* Needs Section */}
              <section>
                <h2 className={`text-xl font-bold mb-4 text-foreground ${language === 'kh' ? 'font-khmer' : ''}`}>
                  💙 {t("Needs", "តម្រូវការ")}
                </h2>
                {!needs?.length ? (
                  <p className={`text-muted-foreground text-sm ${language === 'kh' ? 'font-khmer' : ''}`}>
                    {t("No needs posted yet.", "មិនទាន់មានតម្រូវការណាដាក់ស្នើ។")}
                  </p>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted text-muted-foreground">
                          <th className={`text-left px-4 py-3 font-semibold ${language === 'kh' ? 'font-khmer text-base' : ''}`}>{t("Title", "ចំណងជើង")}</th>
                          <th className={`text-left px-4 py-3 font-semibold ${language === 'kh' ? 'font-khmer text-base' : ''}`}>{t("Category", "ប្រភេទ")}</th>
                          <th className={`text-left px-4 py-3 font-semibold ${language === 'kh' ? 'font-khmer text-base' : ''}`}>{t("Goal", "គោលដៅ")}</th>
                          <th className={`text-left px-4 py-3 font-semibold ${language === 'kh' ? 'font-khmer text-base' : ''}`}>{t("Status", "ស្ថានភាព")}</th>
                          <th className="px-4 py-3 w-24"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {needs.map((need, i) => (
                          <tr key={need.id} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                            <td className="px-4 py-3">
                              <div className={`font-semibold text-foreground ${language === 'kh' ? 'font-khmer' : ''}`}>
                                {language === 'kh' ? need.titleKh : need.titleEn}
                              </div>
                              {need.school && (
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  {language === 'kh' ? need.school.nameKh : need.school.nameEn}
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">{need.category}</td>
                            <td className="px-4 py-3 font-semibold text-primary">${need.goalAmount.toLocaleString()}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                need.status === "active"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                                  : "bg-muted text-muted-foreground"
                              }`}>
                                {need.status === "active" ? t("Active", "សកម្ម") : t("Fulfilled", "បានបំពេញ")}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => setEditingNeed(need)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-colors"
                              >
                                <Pencil className="w-3 h-3" />
                                {t("Edit", "កែប្រែ")}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modals */}
      {editingSchool && (
        <EditSchoolModal school={editingSchool} onClose={() => setEditingSchool(null)} />
      )}
      {editingNeed && (
        <EditNeedModal need={editingNeed} onClose={() => setEditingNeed(null)} />
      )}
    </div>
  );
}
