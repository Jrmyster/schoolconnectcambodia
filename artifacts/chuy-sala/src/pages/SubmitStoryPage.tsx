import { useState, useRef } from "react";
import { Link } from "wouter";
import { UserCircle2, Send, ChevronLeft, ImagePlus, CheckCircle2, Loader2, AlertCircle, X } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type FormState = "idle" | "uploading" | "submitting" | "success" | "error";

const CURRENT_YEAR = new Date().getFullYear();

export function SubmitStoryPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [fullName, setFullName] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [profession, setProfession] = useState("");
  const [story, setStory] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const year = parseInt(graduationYear, 10);
    if (!fullName.trim() || !profession.trim() || !story.trim()) {
      setErrorMsg(t("Please fill in all required fields.", "សូមបំពេញប្រអប់ទាំងអស់ដែលត្រូវការ។"));
      return;
    }
    if (isNaN(year) || year < 1990 || year > CURRENT_YEAR) {
      setErrorMsg(t(`Please enter a valid graduation year (1990–${CURRENT_YEAR}).`, `សូមបញ្ចូលឆ្នាំបញ្ចប់ការសិក្សាត្រឹមត្រូវ (1990–${CURRENT_YEAR})។`));
      return;
    }
    if (story.trim().length < 10) {
      setErrorMsg(t("Your story must be at least 10 characters.", "រឿងរ៉ាវរបស់អ្នកត្រូវតែមានយ៉ាងហោចណាស់ 10 តួអក្សរ។"));
      return;
    }

    try {
      let photoUrl: string | undefined;

      if (photoFile) {
        setFormState("uploading");
        const fd = new FormData();
        fd.append("photo", photoFile);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
        if (!uploadRes.ok) throw new Error("Photo upload failed");
        const uploadData = await uploadRes.json();
        photoUrl = uploadData.url;
      }

      setFormState("submitting");
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          graduationYear: year,
          profession: profession.trim(),
          story: story.trim(),
          ...(photoUrl ? { photoUrl } : {}),
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || "Submission failed");
      }
      setFormState("success");
    } catch (err) {
      console.error(err);
      setFormState("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : t("Something went wrong. Please try again.", "មានបញ្ហាកើតឡើង។ សូមព្យាយាមម្ដងទៀត។")
      );
    }
  }

  const isBusy = formState === "uploading" || formState === "submitting";

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="relative bg-gradient-to-br from-[#0a1628] via-[#1a2e4a] to-[#0f2040] text-white overflow-hidden">
        <div className="flex h-2">
          <div className="flex-1 bg-[#c9a227]" />
          <div className="flex-1 bg-[#e8c547]" />
          <div className="flex-1 bg-[#c9a227]" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center relative z-10">
          <div className="inline-flex items-center gap-2 border border-[#c9a227]/50 bg-[#c9a227]/10 rounded-full px-5 py-2 mb-5 text-sm font-semibold text-[#e8c547] backdrop-blur-sm">
            <Send className="w-4 h-4" />
            {t("Share Your Story", "ចែករំលែករឿងរបស់អ្នក")}
          </div>
          <h1 className={`font-display text-3xl sm:text-4xl font-bold leading-tight mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t("Your Journey Inspires Others", "ដំណើររបស់អ្នកបំផុសអ្នកដទៃ")}
          </h1>
          <p className={`text-white/70 max-w-xl mx-auto leading-relaxed ${kh ? "font-khmer text-base leading-loose" : "text-base"}`}>
            {t(
              "Every story submitted is reviewed before it appears on the Alumni page. We read every word.",
              "រឿងរ៉ាវដែលបានបញ្ជូនទៅត្រូវបានពិនិត្យ មុនពេលលេចឡើងនៅទំព័រ Alumni ។ យើងអានគ្រប់ពាក្យ។"
            )}
          </p>
        </div>

        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="hsl(var(--background))" />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Back link */}
        <Link
          href="/alumni"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          {t("Back to Alumni", "ត្រឡប់ទៅ Alumni")}
        </Link>

        {/* ── SUCCESS STATE ── */}
        {formState === "success" ? (
          <div className="text-center py-16 px-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a227] to-[#e8c547] flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CheckCircle2 className="w-10 h-10 text-[#0a1628]" />
            </div>
            <h2 className={`font-display font-bold text-foreground text-2xl mb-3 ${kh ? "font-khmer" : ""}`}>
              {t("Thank You!", "សូមអរគុណ!")}
            </h2>
            <p className={`text-muted-foreground text-lg mb-2 ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Your story has been sent for review.",
                "រឿងរបស់អ្នកត្រូវបានបញ្ជូនទៅពិនិត្យហើយ។"
              )}
            </p>
            <p className={`text-muted-foreground/70 text-sm mb-10 ${kh ? "font-khmer" : ""}`}>
              {t(
                "Once approved, it will appear on the Alumni Hall of Fame page.",
                "នៅពេលដែលបានអនុម័ត វានឹងលេចឡើងនៅទំព័រ Alumni Hall of Fame ។"
              )}
            </p>
            <Link
              href="/alumni"
              className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold shadow-lg
                bg-gradient-to-r from-[#c9a227] to-[#e8c547] text-[#0a1628]
                hover:from-[#e8c547] hover:to-[#c9a227] hover:-translate-y-0.5 hover:shadow-xl
                active:scale-95 transition-all ${kh ? "font-khmer text-base" : ""}`}
            >
              {t("View Alumni Stories", "មើលរឿងរ៉ាវ Alumni")}
            </Link>
          </div>
        ) : (
          /* ── FORM ── */
          <form onSubmit={handleSubmit} noValidate>
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              {/* Gold accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-[#c9a227] via-[#e8c547] to-[#c9a227]" />

              <div className="p-6 sm:p-8 flex flex-col gap-6">

                {/* Full Name */}
                <div>
                  <label className={`block text-sm font-bold text-foreground mb-1.5 ${kh ? "font-khmer" : ""}`}>
                    {t("Full Name", "ឈ្មោះពេញ")}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t("e.g. Sophal Rath", "ឧ. សុផល រ៉ាត")}
                    disabled={isBusy}
                    className={`w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:border-[#c9a227] focus:outline-none transition-colors disabled:opacity-60 ${kh ? "font-khmer text-base" : "text-sm"}`}
                  />
                </div>

                {/* Graduation Year */}
                <div>
                  <label className={`block text-sm font-bold text-foreground mb-1.5 ${kh ? "font-khmer" : ""}`}>
                    {t("Graduation Year", "ឆ្នាំបញ្ចប់ការសិក្សា")}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    placeholder={`${CURRENT_YEAR - 5}`}
                    min={1990}
                    max={CURRENT_YEAR}
                    disabled={isBusy}
                    className={`w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:border-[#c9a227] focus:outline-none transition-colors disabled:opacity-60 ${kh ? "font-khmer text-base" : "text-sm"}`}
                  />
                </div>

                {/* Profession */}
                <div>
                  <label className={`block text-sm font-bold text-foreground mb-1.5 ${kh ? "font-khmer" : ""}`}>
                    {t("Current Profession or Study", "វិជ្ជាជីវៈ ឬការសិក្សាបច្ចុប្បន្ន")}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder={t("e.g. Software Developer — Phnom Penh", "ឧ. អ្នកអភិវឌ្ឍន៍កម្មវិធី — ភ្នំពេញ")}
                    disabled={isBusy}
                    className={`w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:border-[#c9a227] focus:outline-none transition-colors disabled:opacity-60 ${kh ? "font-khmer text-base" : "text-sm"}`}
                  />
                </div>

                {/* Story */}
                <div>
                  <label className={`block text-sm font-bold text-foreground mb-1.5 ${kh ? "font-khmer" : ""}`}>
                    {t("Your Story", "រឿងរ៉ាវរបស់អ្នក")}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <p className={`text-xs text-muted-foreground mb-2 ${kh ? "font-khmer" : ""}`}>
                    {t(
                      "Tell us how your school years shaped your path. What resources made a difference? Where are you now?",
                      "ប្រាប់យើងអំពីរបៀបដែលឆ្នាំសិក្សារបស់អ្នកបានកែប្រែដំណើររបស់អ្នក។ ធនធានអ្វីខ្លះដែលបានផ្លាស់ប្ដូររឿង? អ្នកនៅទីណាឥឡូវ?"
                    )}
                  </p>
                  <textarea
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    rows={8}
                    disabled={isBusy}
                    className={`w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:border-[#c9a227] focus:outline-none transition-colors resize-y disabled:opacity-60 ${kh ? "font-khmer text-base leading-loose" : "text-sm leading-relaxed"}`}
                    placeholder={t(
                      "Growing up in a rural province, I never imagined that...",
                      "ធំដឹងក្ដីក្នុងខេត្តជនបទ ខ្ញុំមិនដែលស្រមៃថា..."
                    )}
                  />
                  <p className={`text-xs text-muted-foreground/60 mt-1 text-right ${kh ? "font-khmer" : ""}`}>
                    {story.length} / 5000
                  </p>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className={`block text-sm font-bold text-foreground mb-1.5 ${kh ? "font-khmer" : ""}`}>
                    {t("Profile Photo", "រូបថតប្រវត្តិរូប")}
                    <span className={`ml-2 text-xs font-normal text-muted-foreground ${kh ? "font-khmer" : ""}`}>
                      {t("(optional)", "(ស្រេចចិត្ត)")}
                    </span>
                  </label>

                  {photoPreview ? (
                    <div className="flex items-center gap-4">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-[#c9a227]/40 shadow-sm"
                      />
                      <div className="flex flex-col gap-2">
                        <p className={`text-sm font-semibold text-foreground ${kh ? "font-khmer" : ""}`}>
                          {photoFile?.name}
                        </p>
                        <button
                          type="button"
                          onClick={removePhoto}
                          className={`flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-semibold transition-colors ${kh ? "font-khmer" : ""}`}
                        >
                          <X className="w-3.5 h-3.5" />
                          {t("Remove photo", "លុបរូបថត")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isBusy}
                      className="flex items-center gap-3 w-full px-4 py-4 rounded-xl border-2 border-dashed border-border hover:border-[#c9a227]/60 hover:bg-[#c9a227]/5 transition-all disabled:opacity-60 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                        <ImagePlus className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="text-left">
                        <p className={`text-sm font-semibold text-foreground ${kh ? "font-khmer" : ""}`}>
                          {t("Click to upload a photo", "ចុចដើម្បីបញ្ចូលរូបថត")}
                        </p>
                        <p className={`text-xs text-muted-foreground mt-0.5 ${kh ? "font-khmer" : ""}`}>
                          {t("JPG, PNG or WEBP · Max 10 MB", "JPG, PNG ឬ WEBP · អតិបរមា 10 MB")}
                        </p>
                      </div>
                    </button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>

                {/* Error message */}
                {(formState === "error" || errorMsg) && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className={`text-sm text-red-700 dark:text-red-300 ${kh ? "font-khmer leading-loose" : ""}`}>
                      {errorMsg || t("Something went wrong. Please try again.", "មានបញ្ហាកើតឡើង។ សូមព្យាយាមម្ដងទៀត។")}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isBusy}
                  className={`flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-xl font-bold shadow-md
                    bg-gradient-to-r from-[#c9a227] to-[#e8c547] text-[#0a1628]
                    hover:from-[#e8c547] hover:to-[#c9a227] hover:-translate-y-0.5 hover:shadow-lg
                    active:scale-95 transition-all
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0
                    ${kh ? "font-khmer text-base" : ""}`}
                >
                  {isBusy ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {formState === "uploading"
                        ? t("Uploading photo…", "កំពុងបញ្ចូលរូបថត…")
                        : t("Submitting…", "កំពុងបញ្ជូន…")}
                    </>
                  ) : (
                    <>
                      <UserCircle2 className="w-5 h-5" />
                      {t("Submit My Story", "បញ្ជូនរឿងរ៉ាវរបស់ខ្ញុំ")}
                    </>
                  )}
                </button>

                <p className={`text-center text-xs text-muted-foreground/60 -mt-2 ${kh ? "font-khmer" : ""}`}>
                  {t(
                    "All submissions are reviewed before being published. Your story stays private until approved.",
                    "ការដាក់ស្នើទាំងអស់ត្រូវបានពិនិត្យ មុនពេលត្រូវបានផ្សព្វផ្សាយ។ រឿងរ៉ាវរបស់អ្នកនៅឯកជន រហូតដល់ការអនុម័ត។"
                  )}
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
