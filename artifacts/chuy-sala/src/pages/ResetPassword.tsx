import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Button } from "@/components/ui/button";
import { GraduationCap, Eye, EyeOff, CheckCircle, Loader2, AlertTriangle } from "lucide-react";

interface FormValues {
  password: string;
  confirmPassword: string;
}

export function ResetPassword() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const [location] = useLocation();
  const token = new URLSearchParams(window.location.search).get("token") ?? "";
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormValues>();
  const password = watch("password", "");

  const inputClass = "w-full px-4 py-3 pr-12 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-background text-sm";
  const labelClass = `font-semibold text-foreground block mb-1.5 ${language === "kh" ? "font-khmer text-base" : "text-sm"}`;

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    if (!token) {
      setServerError(t("Invalid or missing reset token.", "ថូខឹនមិនត្រឹមត្រូវ ឬបាត់។"));
      return;
    }
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: values.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error ?? t("Something went wrong.", "មានបញ្ហា។"));
        return;
      }
      setDone(true);
    } catch {
      setServerError(t("Network error. Please try again.", "បញ្ហាបណ្ដាញ។ សូមព្យាយាមម្ដងទៀត។"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-sky-50/50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            {t("Reset Password", "កំណត់ពាក្យសម្ងាត់ឡើងវិញ")}
          </h1>
          <p className={`mt-2 text-muted-foreground ${language === "kh" ? "font-khmer text-base" : "text-sm"}`}>
            {t("Enter your new password below.", "បញ្ចូលពាក្យសម្ងាត់ថ្មីរបស់អ្នកខាងក្រោម។")}
          </p>
        </div>

        <div className="bg-card rounded-3xl shadow-xl border border-border p-8">
          {/* No token warning */}
          {!token && (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-7 h-7 text-amber-600" />
              </div>
              <p className={`text-muted-foreground ${language === "kh" ? "font-khmer text-base" : "text-sm"}`}>
                {t("This link is invalid or has expired. Please request a new one.", "តំណនេះមិនត្រឹមត្រូវ ឬផុតកំណត់ហើយ។ សូមស្នើសុំតំណថ្មី។")}
              </p>
              <Link href="/forgot-password" className={`inline-block text-sm font-semibold text-primary hover:underline ${language === "kh" ? "font-khmer text-base" : ""}`}>
                {t("Request new reset link", "ស្នើសុំតំណថ្មី")}
              </Link>
            </div>
          )}

          {/* Success state */}
          {token && done && (
            <div className="text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h2 className={`text-lg font-bold text-foreground mb-2 ${language === "kh" ? "font-khmer" : ""}`}>
                  {t("Password Updated!", "ពាក្យសម្ងាត់ត្រូវបានធ្វើបច្ចុប្បន្នភាព!")}
                </h2>
                <p className={`text-muted-foreground ${language === "kh" ? "font-khmer text-base leading-loose" : "text-sm leading-relaxed"}`}>
                  {t("Your password has been changed. You can now sign in with your new password.", "ពាក្យសម្ងាត់របស់អ្នកត្រូវបានផ្លាស់ប្ដូរ។ អ្នកអាចចូលគណនីដោយប្រើពាក្យសម្ងាត់ថ្មី។")}
                </p>
              </div>
              <Link
                href="/login"
                className={`inline-flex items-center justify-center w-full h-12 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors ${language === "kh" ? "font-khmer text-base" : "text-sm"}`}
              >
                {t("Sign In Now", "ចូលគណនីឥឡូវ")}
              </Link>
            </div>
          )}

          {/* Reset form */}
          {token && !done && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* New Password */}
              <div>
                <label className={labelClass}>{t("New Password", "ពាក្យសម្ងាត់ថ្មី")}*</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    autoComplete="new-password"
                    {...register("password", {
                      required: t("Password is required.", "ត្រូវការពាក្យសម្ងាត់។"),
                      minLength: { value: 6, message: t("At least 6 characters.", "យ៉ាងតិច ៦ តួអក្សរ។") },
                    })}
                    className={inputClass}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className={`text-destructive text-xs mt-1 ${language === "kh" ? "font-khmer" : ""}`}>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className={labelClass}>{t("Confirm New Password", "បញ្ជាក់ពាក្យសម្ងាត់ថ្មី")}*</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    {...register("confirmPassword", {
                      required: t("Please confirm your password.", "សូមបញ្ជាក់ពាក្យសម្ងាត់របស់អ្នក។"),
                      validate: val => val === password || t("Passwords do not match.", "ពាក្យសម្ងាត់មិនត្រូវគ្នា។"),
                    })}
                    className={inputClass}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className={`text-destructive text-xs mt-1 ${language === "kh" ? "font-khmer" : ""}`}>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {serverError && (
                <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3">
                  <p className={`text-destructive text-sm ${language === "kh" ? "font-khmer" : ""}`}>{serverError}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-12 rounded-xl font-bold ${language === "kh" ? "font-khmer text-base" : ""}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />{t("Saving...", "កំពុងរក្សាទុក...")}</span>
                ) : (
                  t("Set New Password", "កំណត់ពាក្យសម្ងាត់ថ្មី")
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
