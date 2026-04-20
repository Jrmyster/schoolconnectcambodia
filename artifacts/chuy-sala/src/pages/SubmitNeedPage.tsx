import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  School as SchoolIcon,
  MapPin,
  Tag,
  FileText,
  LogIn,
  ArrowLeft,
} from "lucide-react";
import { useCreateNeed } from "@workspace/api-client-react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { PROVINCE_KH } from "@/lib/province-data";

type NeedCategory =
  | "Stationery"
  | "Electronics"
  | "Infrastructure"
  | "Books"
  | "Sports"
  | "Other"
  | "Furniture"
  | "WASH"
  | "Teacher Training";

const CATEGORY_LABELS: Record<NeedCategory, { en: string; kh: string }> = {
  Electronics:        { en: "Science Lab Equipment / Technology / Computers", kh: "ឧបករណ៍មន្ទីរពិសោធន៍ / បច្ចេកវិទ្យា / កុំព្យូទ័រ" },
  Books:              { en: "English Books / Library Materials",               kh: "សៀវភៅភាសាអង់គ្លេស / សម្ភារៈបណ្ណាល័យ" },
  Infrastructure:     { en: "Infrastructure (classrooms, roof, walls)",        kh: "ហេដ្ឋារចនាសម្ព័ន្ធ (ថ្នាក់រៀន ដំបូល ជញ្ជាំង)" },
  Stationery:         { en: "Stationery (pens, notebooks, paper)",             kh: "សម្ភារសិក្សា (ប៊ិច សៀវភៅ ក្រដាស)" },
  Furniture:          { en: "Furniture (desks, chairs, shelves)",              kh: "សម្ភារ​គ្រឿងសង្ហារឹម (តុ កៅអី ធ្នើ)" },
  WASH:               { en: "WASH (clean water, toilets, hygiene)",            kh: "ទឹក​អនាម័យ (ទឹកស្អាត បង្គន់ អនាម័យ)" },
  Sports:             { en: "Sports & Physical Education",                     kh: "កីឡា និងអប់រំកាយ" },
  "Teacher Training": { en: "Teacher Training",                                 kh: "បណ្តុះបណ្តាលគ្រូ" },
  Other:              { en: "Other",                                            kh: "ផ្សេងៗ" },
};

type FieldErrors = {
  schoolName?: string;
  province?: string;
  category?: string;
  description?: string;
};

export function SubmitNeedPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();

  const isSchool = !!user && user.role === "school" && !!user.school;
  const prefilledSchoolName = isSchool ? (kh ? user!.school!.nameKh : user!.school!.nameEn) : "";
  const prefilledProvince = isSchool ? user!.school!.province : "";

  const [schoolName, setSchoolName] = useState(prefilledSchoolName);
  const [province, setProvince] = useState(prefilledProvince);
  const [category, setCategory] = useState<NeedCategory | "">("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const createNeed = useCreateNeed();

  const provinceOptions = useMemo(
    () => Object.keys(PROVINCE_KH).sort((a, b) => a.localeCompare(b)),
    []
  );

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!schoolName.trim()) e.schoolName = t("School name is required.", "តម្រូវឱ្យបញ្ចូលឈ្មោះសាលា។");
    if (!province) e.province = t("Please select a province.", "សូមជ្រើសរើសខេត្ត។");
    if (!category) e.category = t("Please select a category.", "សូមជ្រើសរើសប្រភេទ។");
    if (!description.trim() || description.trim().length < 10)
      e.description = t("Please write at least 10 characters.", "សូមសរសេរយ៉ាងតិច 10 តួអក្សរ។");
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!isSchool || !user?.school) return;

    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitState("submitting");
    setErrorMessage("");

    const trimmedDesc = description.trim();
    const titleSeed = trimmedDesc.length > 60 ? `${trimmedDesc.slice(0, 57).trim()}…` : trimmedDesc;
    const catLabel = CATEGORY_LABELS[category as NeedCategory];

    try {
      await createNeed.mutateAsync({
        data: {
          schoolId: user.school.id,
          titleEn: titleSeed,
          titleKh: titleSeed,
          descriptionEn: trimmedDesc,
          descriptionKh: trimmedDesc,
          category: category as NeedCategory,
          goalAmount: 0,
          contactEmail: user.email,
        },
      });
      setSubmitState("success");
      setTimeout(() => navigate("/map"), 2200);
    } catch (err) {
      setSubmitState("error");
      setErrorMessage(err instanceof Error ? err.message : String(err));
    }

    void catLabel;
  }

  if (authLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isSchool) {
    return (
      <div className="min-h-[80vh] px-4 py-10 max-w-md mx-auto">
        <div className="rounded-3xl border-4 border-amber-300 bg-amber-50 p-6 sm:p-8 text-center shadow-lg">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-100 flex items-center justify-center">
            <SchoolIcon className="w-8 h-8 text-amber-700" />
          </div>
          <h1 className={`text-2xl font-bold text-amber-900 mb-2 ${kh ? "font-khmer leading-snug" : "font-display"}`}>
            {t("Sign in as your school first", "សូមចូលគណនីសាលារបស់អ្នកជាមុនសិន")}
          </h1>
          <p className={`text-amber-800 mb-6 ${kh ? "font-khmer text-sm leading-loose" : ""}`}>
            {t(
              "Only registered schools can submit needs to the map. Sign in with your school account to continue.",
              "មានតែសាលាដែលបានចុះឈ្មោះប៉ុណ្ណោះអាចដាក់ស្នើតម្រូវការទៅលើផែនទី។ សូមចូលគណនីសាលារបស់អ្នកដើម្បីបន្ត។"
            )}
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl bg-amber-600 text-white font-bold text-lg shadow-md hover:bg-amber-700 active:scale-[0.98] transition-all"
          >
            <LogIn className="w-5 h-5" />
            <span className={kh ? "font-khmer" : ""}>{t("Sign In", "ចូលគណនី")}</span>
          </Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-amber-700 hover:text-amber-900 mt-4 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span className={kh ? "font-khmer" : ""}>{t("Back to home", "ត្រឡប់ទៅទំព័រដើម")}</span>
          </Link>
        </div>
      </div>
    );
  }

  if (submitState === "success") {
    return (
      <div className="min-h-[80vh] px-4 py-10 max-w-md mx-auto flex items-center">
        <div className="w-full rounded-3xl border-4 border-green-300 bg-green-50 p-8 text-center shadow-xl animate-in zoom-in-95 fade-in duration-300">
          <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-300 animate-in zoom-in-50 duration-500">
            <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
          <h1 className={`text-2xl font-bold text-green-900 mb-2 ${kh ? "font-khmer leading-snug" : "font-display"}`}>
            {t("Success!", "ជោគជ័យ!")}
          </h1>
          <p className={`text-green-800 text-lg ${kh ? "font-khmer leading-loose text-base" : ""}`}>
            {t(
              "Your request has been added to the map!",
              "ការស្នើសុំរបស់អ្នកត្រូវបានបន្ថែមទៅលើផែនទី!"
            )}
          </p>
          <p className={`text-green-700 text-sm mt-4 ${kh ? "font-khmer" : ""}`}>
            {t("Redirecting to the map…", "កំពុងបញ្ជូនទៅផែនទី…")}
          </p>
        </div>
      </div>
    );
  }

  const inputBase =
    "w-full px-4 py-4 text-base rounded-2xl border-2 bg-white text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-4 transition-all";
  const inputOk = "border-slate-200 focus:border-primary focus:ring-primary/20";
  const inputErr = "border-red-400 focus:border-red-500 focus:ring-red-200";

  const submitting = submitState === "submitting";

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-blue-50/40 to-white px-4 py-6 sm:py-10">
      <div className="max-w-md mx-auto">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span className={kh ? "font-khmer" : ""}>{t("Back to home", "ត្រឡប់ទៅទំព័រដើម")}</span>
        </Link>

        <header className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Send className="w-3.5 h-3.5" />
            {t("School Needs Submission", "ដាក់ស្នើតម្រូវការសាលា")}
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold text-foreground ${kh ? "font-khmer leading-snug" : "font-display"}`}>
            {t("Tell us what your school needs", "ប្រាប់យើងពីអ្វីដែលសាលារបស់អ្នកត្រូវការ")}
          </h1>
          <p className={`text-sm text-muted-foreground mt-2 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Donors will see your request on the map within minutes.",
              "អ្នកបរិច្ចាគនឹងឃើញការស្នើសុំរបស់អ្នកនៅលើផែនទីក្នុងរយៈពេលពីរបីនាទី។"
            )}
          </p>
        </header>

        <form onSubmit={onSubmit} className="space-y-5 bg-white rounded-3xl border-2 border-slate-200 p-5 sm:p-6 shadow-lg">
          {/* School Name */}
          <div>
            <label htmlFor="schoolName" className={`flex items-center gap-2 text-sm font-bold text-foreground mb-2 ${kh ? "font-khmer" : ""}`}>
              <SchoolIcon className="w-4 h-4 text-primary" />
              {t("School Name", "ឈ្មោះសាលា")} <span className="text-red-500">*</span>
            </label>
            <input
              id="schoolName"
              type="text"
              autoComplete="organization"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder={t("e.g. Hun Sen Phnom Srok High School", "ឧ. វិទ្យាល័យហ៊ុន សែន ភ្នំស្រុក")}
              className={`${inputBase} ${errors.schoolName ? inputErr : inputOk} ${kh ? "font-khmer" : ""}`}
              aria-invalid={!!errors.schoolName}
            />
            {errors.schoolName && (
              <p className={`flex items-center gap-1 text-xs text-red-600 mt-1.5 ${kh ? "font-khmer" : ""}`}>
                <AlertCircle className="w-3.5 h-3.5" /> {errors.schoolName}
              </p>
            )}
          </div>

          {/* Province */}
          <div>
            <label htmlFor="province" className={`flex items-center gap-2 text-sm font-bold text-foreground mb-2 ${kh ? "font-khmer" : ""}`}>
              <MapPin className="w-4 h-4 text-primary" />
              {t("Province / District", "ខេត្ត / ស្រុក")} <span className="text-red-500">*</span>
            </label>
            <select
              id="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className={`${inputBase} ${errors.province ? inputErr : inputOk} appearance-none bg-no-repeat bg-[length:20px] bg-[right_1rem_center] bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2024%2024%27%20stroke%3D%27%23475569%27%20stroke-width%3D%272%27%3E%3Cpath%20d%3D%27M19%209l-7%207-7-7%27/%3E%3C/svg%3E")] pr-12`}
              aria-invalid={!!errors.province}
            >
              <option value="">{t("— Select a province —", "— ជ្រើសរើសខេត្ត —")}</option>
              {provinceOptions.map((p) => (
                <option key={p} value={p}>
                  {p}{kh ? ` · ${PROVINCE_KH[p]}` : ""}
                </option>
              ))}
            </select>
            {errors.province && (
              <p className={`flex items-center gap-1 text-xs text-red-600 mt-1.5 ${kh ? "font-khmer" : ""}`}>
                <AlertCircle className="w-3.5 h-3.5" /> {errors.province}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className={`flex items-center gap-2 text-sm font-bold text-foreground mb-2 ${kh ? "font-khmer" : ""}`}>
              <Tag className="w-4 h-4 text-primary" />
              {t("Category of Need", "ប្រភេទតម្រូវការ")} <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as NeedCategory | "")}
              className={`${inputBase} ${errors.category ? inputErr : inputOk} appearance-none bg-no-repeat bg-[length:20px] bg-[right_1rem_center] bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2024%2024%27%20stroke%3D%27%23475569%27%20stroke-width%3D%272%27%3E%3Cpath%20d%3D%27M19%209l-7%207-7-7%27/%3E%3C/svg%3E")] pr-12`}
              aria-invalid={!!errors.category}
            >
              <option value="">{t("— Select a category —", "— ជ្រើសរើសប្រភេទ —")}</option>
              {(Object.keys(CATEGORY_LABELS) as NeedCategory[]).map((c) => (
                <option key={c} value={c}>
                  {kh ? CATEGORY_LABELS[c].kh : CATEGORY_LABELS[c].en}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className={`flex items-center gap-1 text-xs text-red-600 mt-1.5 ${kh ? "font-khmer" : ""}`}>
                <AlertCircle className="w-3.5 h-3.5" /> {errors.category}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={`flex items-center gap-2 text-sm font-bold text-foreground mb-2 ${kh ? "font-khmer" : ""}`}>
              <FileText className="w-4 h-4 text-primary" />
              {t("Description", "ការពិពណ៌នា")} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t(
                "Tell donors what you need and why it matters to your students…",
                "ប្រាប់អ្នកបរិច្ចាគនូវអ្វីដែលអ្នកត្រូវការ និងហេតុអ្វីបានជាវាសំខាន់សម្រាប់សិស្សរបស់អ្នក…"
              )}
              className={`${inputBase} ${errors.description ? inputErr : inputOk} resize-y min-h-[140px] leading-relaxed ${kh ? "font-khmer" : ""}`}
              aria-invalid={!!errors.description}
            />
            <div className="flex items-center justify-between mt-1.5">
              {errors.description ? (
                <p className={`flex items-center gap-1 text-xs text-red-600 ${kh ? "font-khmer" : ""}`}>
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.description}
                </p>
              ) : <span />}
              <span className="text-xs text-muted-foreground tabular-nums">{description.trim().length}</span>
            </div>
          </div>

          {submitState === "error" && (
            <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className={`font-bold text-red-900 text-sm ${kh ? "font-khmer" : ""}`}>
                  {t("Something went wrong", "មានបញ្ហាមួយចំនួន")}
                </p>
                <p className={`text-red-800 text-xs mt-1 ${kh ? "font-khmer" : ""}`}>{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-5 px-6 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/30 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/40 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className={kh ? "font-khmer" : ""}>{t("Submitting…", "កំពុងដាក់ស្នើ…")}</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span className={kh ? "font-khmer" : ""}>{t("Submit Request", "ដាក់ស្នើការស្នើសុំ")}</span>
              </>
            )}
          </button>

          <p className={`text-xs text-center text-muted-foreground ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Your request will be saved with status “active” and shown on the public map.",
              "ការស្នើសុំរបស់អ្នកនឹងត្រូវបានរក្សាទុកដោយស្ថានភាព “សកម្ម” ហើយបង្ហាញនៅលើផែនទីសាធារណៈ។"
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
