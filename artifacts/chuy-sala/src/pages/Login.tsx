import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useListSchools } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Eye, EyeOff, LogIn, UserPlus, GraduationCap, User, School as SchoolIcon } from "lucide-react";
import type { UserRole } from "@/context/AuthContext";

type Tab = "login" | "register";

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  schoolId: string;
  role: UserRole;
}

export function Login() {
  const [tab, setTab] = useState<Tab>("login");
  const [showPass, setShowPass] = useState(false);
  const [, navigate] = useLocation();
  const { login, register } = useAuth();
  const { toast } = useToast();
  const t = useTranslation();
  const { language } = useLanguageStore();
  const { data: schools } = useListSchools();

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-background text-sm";
  const labelClass = `font-semibold text-foreground block mb-1.5 ${language === "kh" ? "font-khmer text-base" : "text-sm"}`;
  const tabBase = `flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all ${language === "kh" ? "font-khmer text-base" : ""}`;

  const {
    register: regLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: loginPending },
  } = useForm<LoginForm>();

  const {
    register: regReg,
    handleSubmit: handleRegSubmit,
    watch: watchReg,
    formState: { errors: regErrors, isSubmitting: regPending },
  } = useForm<RegisterForm>();

  const onLogin = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      toast({ title: t("Welcome back!", "សូមស្វាគមន៍!"), description: t("You are now signed in.", "អ្នកបានចូលទៅក្នុងប្រព័ន្ធ។") });
      navigate("/admin");
    } catch (e: any) {
      toast({ variant: "destructive", title: t("Login failed", "ការចូលបានបរាជ័យ"), description: e.message });
    }
  };

  const onRegister = async (data: RegisterForm) => {
    if (!data.role) {
      toast({ variant: "destructive", title: t("Please select an account type", "សូមជ្រើសរើសប្រភេទគណនី") });
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast({ variant: "destructive", title: t("Passwords don't match", "លេខសម្ងាត់មិនត្រូវគ្នា") });
      return;
    }
    try {
      await register(
        data.email,
        data.password,
        data.role,
        data.role === "school" && data.schoolId ? Number(data.schoolId) : undefined,
      );
      toast({ title: t("Account created!", "បានបង្កើតគណនី!"), description: t("You are now signed in.", "អ្នកបានចូលទៅក្នុងប្រព័ន្ធ។") });
      navigate("/admin");
    } catch (e: any) {
      toast({ variant: "destructive", title: t("Registration failed", "ការចុះឈ្មោះបានបរាជ័យ"), description: e.message });
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
          <h1 className={`font-display text-3xl font-bold text-foreground ${language === "kh" ? "font-khmer" : ""}`}>
            {t("School & Student Portal", "ច្រកទ្វារសាលា និង​សិស្ស")}
          </h1>
          <p className={`mt-2 text-muted-foreground ${language === "kh" ? "font-khmer text-base" : "text-sm"}`}>
            {t(
              "Sign in or create an account to access educational tools or manage your school's needs.",
              "ចូល ឬ​បង្កើតគណនី ដើម្បីប្រើប្រាស់ឧបករណ៍សិក្សា ឬគ្រប់គ្រងតម្រូវការសាលារបស់អ្នក។",
            )}
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-3xl shadow-xl border border-border p-8">
          {/* Tabs */}
          <div className="flex gap-2 bg-muted/60 p-1.5 rounded-2xl mb-8">
            <button
              type="button"
              onClick={() => setTab("login")}
              className={`${tabBase} ${tab === "login" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              <LogIn className="w-4 h-4" />
              {t("Sign In", "ចូលគណនី")}
            </button>
            <button
              type="button"
              onClick={() => setTab("register")}
              className={`${tabBase} ${tab === "register" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              <UserPlus className="w-4 h-4" />
              {t("Register", "ចុះឈ្មោះ")}
            </button>
          </div>

          {/* LOGIN FORM */}
          {tab === "login" && (
            <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-5">
              <div>
                <label className={labelClass}>{t("Email", "អ៊ីមែល")}*</label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="school@example.com"
                  {...regLogin("email", { required: t("Email is required", "អ៊ីមែលត្រូវការ") })}
                  className={inputClass}
                />
                {loginErrors.email && <p className="text-destructive text-xs mt-1">{loginErrors.email.message}</p>}
              </div>

              <div>
                <label className={labelClass}>{t("Password", "លេខសម្ងាត់")}*</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...regLogin("password", { required: t("Password is required", "លេខសម្ងាត់ត្រូវការ") })}
                    className={`${inputClass} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {loginErrors.password && <p className="text-destructive text-xs mt-1">{loginErrors.password.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={loginPending}
                className={`w-full py-6 rounded-xl text-base font-bold ${language === "kh" ? "font-khmer" : ""}`}
              >
                <LogIn className="w-4 h-4 mr-2" />
                {loginPending ? t("Signing in...", "កំពុងចូល...") : t("Sign In", "ចូលគណនី")}
              </Button>

              <div className="text-center">
                <Link
                  href="/forgot-password"
                  className={`text-muted-foreground hover:text-primary transition-colors ${language === "kh" ? "font-khmer text-sm" : "text-xs"}`}
                >
                  {t("Forgot Password?", "ភ្លេចពាក្យសម្ងាត់?")}
                </Link>
              </div>

              <p className={`text-center text-muted-foreground ${language === "kh" ? "font-khmer text-sm" : "text-xs"}`}>
                {t("Don't have an account?", "មិនទាន់មានគណនី?")}{" "}
                <button type="button" onClick={() => setTab("register")} className="text-primary font-semibold hover:underline">
                  {t("Register here", "ចុះឈ្មោះនៅទីនេះ")}
                </button>
              </p>
            </form>
          )}

          {/* REGISTER FORM */}
          {tab === "register" && (
            <form onSubmit={handleRegSubmit(onRegister)} className="space-y-5">
              <div>
                <label className={labelClass}>
                  {t("I am registering as a:", "ខ្ញុំចុះឈ្មោះជា៖")}*
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      { value: "student", icon: User, en: "Student", kh: "សិស្ស" },
                      { value: "school", icon: SchoolIcon, en: "School Official", kh: "មន្ត្រីសាលា" },
                    ] as const
                  ).map((opt) => {
                    const Icon = opt.icon;
                    const checked = watchReg("role") === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={`relative flex flex-col items-center gap-1.5 px-3 py-4 rounded-xl border-2 cursor-pointer transition-all ${
                          checked
                            ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                            : "border-border hover:border-primary/40 hover:bg-muted/30"
                        }`}
                      >
                        <input
                          type="radio"
                          value={opt.value}
                          {...regReg("role", { required: true })}
                          className="sr-only"
                        />
                        <Icon className={`w-6 h-6 ${checked ? "text-primary" : "text-muted-foreground"}`} />
                        <span
                          className={`text-sm font-semibold ${checked ? "text-primary" : "text-foreground"} ${language === "kh" ? "font-khmer text-base" : ""}`}
                        >
                          {language === "kh" ? opt.kh : opt.en}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {regErrors.role && (
                  <p className="text-destructive text-xs mt-1">
                    {t("Please select an account type", "សូមជ្រើសរើសប្រភេទគណនី")}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>{t("Email", "អ៊ីមែល")}*</label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="school@example.com"
                  {...regReg("email", { required: true })}
                  className={inputClass}
                />
                {regErrors.email && <p className="text-destructive text-xs mt-1">{t("Required", "ទាមទារ")}</p>}
              </div>

              <div>
                <label className={labelClass}>{t("Password", "លេខសម្ងាត់")}* <span className="font-normal text-muted-foreground text-xs">({t("min 6 chars", "យ៉ាងហោចណាស់ ៦ តួ")})</span></label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    {...regReg("password", { required: true, minLength: 6 })}
                    className={`${inputClass} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {regErrors.password && <p className="text-destructive text-xs mt-1">{t("Min 6 characters", "យ៉ាងហោចណាស់ ៦ តួ")}</p>}
              </div>

              <div>
                <label className={labelClass}>{t("Confirm Password", "បញ្ជាក់លេខសម្ងាត់")}*</label>
                <input
                  type={showPass ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  {...regReg("confirmPassword", { required: true })}
                  className={inputClass}
                />
                {regErrors.confirmPassword && <p className="text-destructive text-xs mt-1">{t("Required", "ទាមទារ")}</p>}
              </div>

              {watchReg("role") === "school" && (
                <div>
                  <label className={labelClass}>{t("Link to School", "ភ្ជាប់ទៅសាលា")} <span className="font-normal text-muted-foreground text-xs">({t("optional", "ស្រេចចិត្ត")})</span></label>
                  <select {...regReg("schoolId")} className={inputClass}>
                    <option value="">{t("— Select your school (optional) —", "— ជ្រើសរើសសាលា (ស្រេចចិត្ត) —")}</option>
                    {schools?.map(s => (
                      <option key={s.id} value={s.id}>
                        {language === "kh" ? s.nameKh : s.nameEn} — {s.province}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <Button
                type="submit"
                disabled={regPending}
                className={`w-full py-6 rounded-xl text-base font-bold ${language === "kh" ? "font-khmer" : ""}`}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                {regPending ? t("Creating account...", "កំពុងបង្កើតគណនី...") : t("Create Account", "បង្កើតគណនី")}
              </Button>

              <p className={`text-center text-muted-foreground ${language === "kh" ? "font-khmer text-sm" : "text-xs"}`}>
                {t("Already have an account?", "មានគណនីរួចហើយ?")}{" "}
                <button type="button" onClick={() => setTab("login")} className="text-primary font-semibold hover:underline">
                  {t("Sign in", "ចូលគណនី")}
                </button>
              </p>
            </form>
          )}
        </div>

        {/* Footer note */}
        <p className={`text-center mt-6 text-muted-foreground/70 ${language === "kh" ? "font-khmer text-sm" : "text-xs"}`}>
          {t("Chouy Sala — connecting schools with those who care", "ជួយសាលា — ភ្ជាប់សាលាជាមួយអ្នកគាំទ្រ")}
        </p>
      </div>
    </div>
  );
}
