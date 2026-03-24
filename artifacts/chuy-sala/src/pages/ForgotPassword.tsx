import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Button } from "@/components/ui/button";
import { Mail, GraduationCap, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

interface FormValues {
  email: string;
}

export function ForgotPassword() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const [sent, setSent] = useState(false);
  const [devLink, setDevLink] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>();

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-background text-sm";
  const labelClass = `font-semibold text-foreground block mb-1.5 ${language === "kh" ? "font-khmer text-base" : "text-sm"}`;

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error ?? t("Something went wrong.", "មានបញ្ហា។"));
        return;
      }
      if (data.devResetUrl) setDevLink(data.devResetUrl);
      setSent(true);
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
            {t("Forgot Password?", "ភ្លេចពាក្យសម្ងាត់?")}
          </h1>
          <p className={`mt-2 text-muted-foreground ${language === "kh" ? "font-khmer text-base" : "text-sm"}`}>
            {t("Enter your registered school email address.", "បញ្ចូលអ៊ីមែលដែលបានចុះឈ្មោះ។")}
          </p>
        </div>

        <div className="bg-card rounded-3xl shadow-xl border border-border p-8">
          {sent ? (
            /* ── SUCCESS STATE ── */
            <div className="text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h2 className={`text-lg font-bold text-foreground mb-2 ${language === "kh" ? "font-khmer" : ""}`}>
                  {t("Check Your Email", "ពិនិត្យអ៊ីមែលរបស់អ្នក")}
                </h2>
                <p className={`text-muted-foreground ${language === "kh" ? "font-khmer text-base leading-loose" : "text-sm leading-relaxed"}`}>
                  {t(
                    "A reset link has been sent to your email.",
                    "តំណភ្ជាប់ដើម្បីប្តូរពាក្យសម្ងាត់ត្រូវបានផ្ញើទៅកាន់អ៊ីមែលរបស់អ្នក។"
                  )}
                </p>
              </div>

              {/* Dev helper: show the reset link directly */}
              {devLink && (
                <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-4 text-left">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">
                    🔧 {t("Dev Mode — Test Link", "របៀបសាកល្បង")}
                  </p>
                  <p className="text-xs text-amber-600 mb-2 leading-relaxed">
                    {t(
                      "In production a real email would be sent. Use this link to test:",
                      "ក្នុងប្រព័ន្ធពិត អ៊ីមែលនឹងត្រូវបានផ្ញើ។ ប្រើតំណនេះដើម្បីសាកល្បង:"
                    )}
                  </p>
                  <a
                    href={devLink}
                    className="block text-xs font-mono text-primary underline break-all hover:text-primary/80"
                  >
                    {devLink}
                  </a>
                </div>
              )}

              <Link
                href="/login"
                className={`inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline ${language === "kh" ? "font-khmer text-base" : ""}`}
              >
                <ArrowLeft className="w-4 h-4" />
                {t("Back to Sign In", "ត្រឡប់ទៅចូលគណនី")}
              </Link>
            </div>
          ) : (
            /* ── FORM ── */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className={labelClass}>
                  {t("Registered School Email", "អ៊ីមែលសាលាដែលបានចុះឈ្មោះ")}*
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
                  <input
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      required: t("Email is required.", "ត្រូវការអ៊ីមែល។"),
                      pattern: { value: /\S+@\S+\.\S+/, message: t("Enter a valid email.", "បញ្ចូលអ៊ីមែលត្រឹមត្រូវ។") },
                    })}
                    className={`${inputClass} pl-10`}
                    placeholder="principal@school.edu.kh"
                  />
                </div>
                {errors.email && (
                  <p className={`text-destructive text-xs mt-1 ${language === "kh" ? "font-khmer" : ""}`}>
                    {errors.email.message}
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
                  <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />{t("Sending...", "កំពុងផ្ញើ...")}</span>
                ) : (
                  t("Send Reset Link", "ផ្ញើតំណប្ដូរពាក្យសម្ងាត់")
                )}
              </Button>

              <div className="text-center">
                <Link
                  href="/login"
                  className={`text-sm text-muted-foreground hover:text-primary transition-colors ${language === "kh" ? "font-khmer text-base" : ""}`}
                >
                  <ArrowLeft className="inline w-3.5 h-3.5 mr-1" />
                  {t("Back to Sign In", "ត្រឡប់ទៅចូលគណនី")}
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
