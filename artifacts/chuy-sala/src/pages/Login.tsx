import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useListSchools } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  GraduationCap,
  User,
  School as SchoolIcon,
  Mail,
  AtSign,
  KeyRound,
} from "lucide-react";
import type { UserRole } from "@/context/AuthContext";
import {
  usernameToEmail,
  validateUsername,
  validatePin,
  USERNAME_REGEX,
  PIN_REGEX,
} from "@/lib/student-auth";

type Tab = "login" | "register";
type AuthMode = "pin" | "email";

interface LoginForm {
  identifier: string; // username or email
  secret: string; // 4-digit PIN or password
}

interface RegisterForm {
  identifier: string;
  secret: string;
  confirmSecret: string;
  schoolId: string;
  role: UserRole;
}

export function Login() {
  const [tab, setTab] = useState<Tab>("login");
  // Default to "pin" so students-without-email get the simpler flow.
  const [authMode, setAuthMode] = useState<AuthMode>("pin");
  const [showSecret, setShowSecret] = useState(false);
  const [, navigate] = useLocation();
  const { login, register } = useAuth();
  const { toast } = useToast();
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const { data: schools } = useListSchools();

  const inputClass =
    "w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-background text-sm";
  const labelClass = `font-semibold text-foreground block mb-1.5 ${
    kh ? "font-khmer text-base" : "text-sm"
  }`;
  const tabBase = `flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
    kh ? "font-khmer text-base" : ""
  }`;

  const {
    register: regLogin,
    handleSubmit: handleLoginSubmit,
    reset: resetLogin,
    formState: { errors: loginErrors, isSubmitting: loginPending },
  } = useForm<LoginForm>();

  const {
    register: regReg,
    handleSubmit: handleRegSubmit,
    watch: watchReg,
    reset: resetReg,
    formState: { errors: regErrors, isSubmitting: regPending },
  } = useForm<RegisterForm>();

  // ── Mode-aware copy ─────────────────────────────────────────────
  const isPin = authMode === "pin";

  const identifierLabel = isPin
    ? t("Username", "ឈ្មោះអ្នកប្រើប្រាស់")
    : t("Email", "អ៊ីមែល");
  const identifierHelper = isPin
    ? t(
        "Use your first name and class, e.g., sokha_12A",
        "ប្រើឈ្មោះ និងថ្នាក់របស់អ្នក ឧ. sokha_12A",
      )
    : null;
  const identifierPlaceholder = isPin ? "sokha_12A" : "school@example.com";

  const secretLabel = isPin
    ? t("4-Digit PIN", "លេខសម្ងាត់ ៤ ខ្ទង់")
    : t("Password", "លេខសម្ងាត់");
  const secretPlaceholder = isPin ? "••••" : "••••••••";

  // ── Submit handlers ─────────────────────────────────────────────
  const transformIdentifier = (raw: string): string => {
    if (!isPin) return raw.trim();
    return usernameToEmail(raw);
  };

  const onLogin = async (data: LoginForm) => {
    try {
      const email = transformIdentifier(data.identifier);
      await login(email, data.secret.trim());
      toast({
        title: t("Welcome back!", "សូមស្វាគមន៍!"),
        description: t("You are now signed in.", "អ្នកបានចូលទៅក្នុងប្រព័ន្ធ។"),
      });
      navigate("/dashboard");
    } catch (e: any) {
      // Translate common backend errors so Khmer users see Khmer text.
      const raw = String(e?.message ?? "");
      const friendly = raw.toLowerCase().includes("invalid")
        ? isPin
          ? t(
              "Username or PIN is incorrect.",
              "ឈ្មោះអ្នកប្រើប្រាស់ ឬលេខសម្ងាត់មិនត្រឹមត្រូវ។",
            )
          : t(
              "Email or password is incorrect.",
              "អ៊ីមែល ឬលេខសម្ងាត់មិនត្រឹមត្រូវ។",
            )
        : raw;
      toast({
        variant: "destructive",
        title: t("Login failed", "ការចូលបានបរាជ័យ"),
        description: friendly,
      });
    }
  };

  const onRegister = async (data: RegisterForm) => {
    // PIN-mode students always register as `student` and have no school
    // selector. Email-mode users still pick a role + (optional) school.
    if (!isPin && !data.role) {
      toast({
        variant: "destructive",
        title: t("Please select an account type", "សូមជ្រើសរើសប្រភេទគណនី"),
      });
      return;
    }
    if (data.secret !== data.confirmSecret) {
      toast({
        variant: "destructive",
        title: isPin
          ? t("PINs don't match", "លេខសម្ងាត់មិនត្រូវគ្នា")
          : t("Passwords don't match", "លេខសម្ងាត់មិនត្រូវគ្នា"),
      });
      return;
    }
    try {
      const email = transformIdentifier(data.identifier);
      const role: UserRole = isPin ? "student" : data.role;
      const schoolId =
        !isPin && role === "school" && data.schoolId
          ? Number(data.schoolId)
          : undefined;
      await register(email, data.secret.trim(), role, schoolId);
      toast({
        title: t("Account created!", "បានបង្កើតគណនី!"),
        description: t("You are now signed in.", "អ្នកបានចូលទៅក្នុងប្រព័ន្ធ។"),
      });
      navigate("/dashboard");
    } catch (e: any) {
      const raw = String(e?.message ?? "");
      const lower = raw.toLowerCase();
      let friendly = raw;
      if (lower.includes("already exists")) {
        friendly = isPin
          ? t(
              "Username already taken — please choose another.",
              "ឈ្មោះអ្នកប្រើប្រាស់នេះមាននៅរួចហើយ — សូមជ្រើសរើសឈ្មោះផ្សេង។",
            )
          : t(
              "An account with this email already exists.",
              "មានគណនីដែលប្រើអ៊ីមែលនេះរួចហើយ។",
            );
      } else if (lower.includes("pin must")) {
        friendly = t(
          "PIN must be exactly 4 digits (0–9).",
          "លេខសម្ងាត់ត្រូវមានពិតប្រាកដ ៤ ខ្ទង់ (០–៩)។",
        );
      } else if (lower.includes("username must")) {
        friendly = t(
          "Username must be 3–32 letters, digits, or underscore.",
          "ឈ្មោះអ្នកប្រើប្រាស់ត្រូវមាន ៣–៣២ តួ (អក្សរ លេខ ឬគូស្បែក)។",
        );
      }
      toast({
        variant: "destructive",
        title: t("Registration failed", "ការចុះឈ្មោះបានបរាជ័យ"),
        description: friendly,
      });
    }
  };

  // ── Mode switch button copy ─────────────────────────────────────
  const switchModeLabel = isPin
    ? t("I have an email", "ខ្ញុំមានអ៊ីមែល")
    : t(
        "I'd rather use a username and PIN",
        "ខ្ញុំចូលចិត្តប្រើឈ្មោះអ្នកប្រើប្រាស់ និងលេខសម្ងាត់",
      );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-sky-50/50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h1
            className={`font-display text-3xl font-bold text-foreground ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t("School & Student Portal", "ច្រកទ្វារសាលា និង​សិស្ស")}
          </h1>
          <p
            className={`mt-2 text-muted-foreground ${
              kh ? "font-khmer text-base" : "text-sm"
            }`}
          >
            {t(
              "Sign in or create an account to access educational tools or manage your school's needs.",
              "ចូល ឬ​បង្កើតគណនី ដើម្បីប្រើប្រាស់ឧបករណ៍សិក្សា ឬគ្រប់គ្រងតម្រូវការសាលារបស់អ្នក។",
            )}
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-3xl shadow-xl border border-border p-8">
          {/* Mode badge */}
          <div
            data-testid="auth-mode-indicator"
            className={`mb-5 rounded-xl px-3 py-2 text-center text-xs font-bold uppercase tracking-wider ${
              isPin
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-sky-50 text-sky-700 border border-sky-200"
            } ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}
          >
            {isPin ? (
              <span className="inline-flex items-center gap-1.5">
                <AtSign className="w-3.5 h-3.5" />
                {t(
                  "Username + 4-digit PIN",
                  "ឈ្មោះអ្នកប្រើប្រាស់ + លេខសម្ងាត់ ៤ ខ្ទង់",
                )}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                {t("Email + password", "អ៊ីមែល + លេខសម្ងាត់")}
              </span>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-muted/60 p-1.5 rounded-2xl mb-8">
            <button
              type="button"
              onClick={() => {
                setTab("login");
                resetLogin();
              }}
              data-testid="tab-login"
              className={`${tabBase} ${
                tab === "login"
                  ? "bg-white shadow-sm text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LogIn className="w-4 h-4" />
              {t("Sign In", "ចូលគណនី")}
            </button>
            <button
              type="button"
              onClick={() => {
                setTab("register");
                resetReg();
              }}
              data-testid="tab-register"
              className={`${tabBase} ${
                tab === "register"
                  ? "bg-white shadow-sm text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <UserPlus className="w-4 h-4" />
              {t("Register", "ចុះឈ្មោះ")}
            </button>
          </div>

          {/* ── LOGIN FORM ──────────────────────────────────────── */}
          {tab === "login" && (
            <form
              onSubmit={handleLoginSubmit(onLogin)}
              className="space-y-5"
              data-testid="form-login"
            >
              <div>
                <label className={labelClass} htmlFor="login-identifier">
                  {identifierLabel}*
                </label>
                <input
                  id="login-identifier"
                  type={isPin ? "text" : "email"}
                  inputMode={isPin ? "text" : "email"}
                  autoComplete={isPin ? "username" : "email"}
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder={identifierPlaceholder}
                  data-testid="input-identifier"
                  {...regLogin("identifier", {
                    required: isPin
                      ? t(
                          "Username is required",
                          "ឈ្មោះអ្នកប្រើប្រាស់ត្រូវការ",
                        )
                      : t("Email is required", "អ៊ីមែលត្រូវការ"),
                  })}
                  className={inputClass}
                />
                {identifierHelper && (
                  <p
                    className={`text-muted-foreground mt-1.5 text-xs ${
                      kh ? "font-khmer text-sm" : ""
                    }`}
                  >
                    {identifierHelper}
                  </p>
                )}
                {loginErrors.identifier && (
                  <p className="text-destructive text-xs mt-1">
                    {loginErrors.identifier.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass} htmlFor="login-secret">
                  {secretLabel}*
                </label>
                <div className="relative">
                  <input
                    id="login-secret"
                    type={
                      isPin
                        ? showSecret
                          ? "text"
                          : "password"
                        : showSecret
                        ? "text"
                        : "password"
                    }
                    inputMode={isPin ? "numeric" : "text"}
                    pattern={isPin ? "\\d{4}" : undefined}
                    maxLength={isPin ? 4 : undefined}
                    autoComplete={isPin ? "one-time-code" : "current-password"}
                    placeholder={secretPlaceholder}
                    data-testid="input-secret"
                    {...regLogin("secret", {
                      required: isPin
                        ? t("PIN is required", "លេខសម្ងាត់ត្រូវការ")
                        : t("Password is required", "លេខសម្ងាត់ត្រូវការ"),
                    })}
                    className={`${inputClass} pr-12 ${
                      isPin ? "tracking-[0.5em] text-center text-lg" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret((v) => !v)}
                    aria-label={t("Show / hide secret", "បង្ហាញ / លាក់")}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showSecret ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {loginErrors.secret && (
                  <p className="text-destructive text-xs mt-1">
                    {loginErrors.secret.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loginPending}
                data-testid="button-submit-login"
                className={`w-full py-6 rounded-xl text-base font-bold ${
                  kh ? "font-khmer" : ""
                }`}
              >
                <LogIn className="w-4 h-4 mr-2" />
                {loginPending
                  ? t("Signing in...", "កំពុងចូល...")
                  : t("Sign In", "ចូលគណនី")}
              </Button>

              {/* Forgot password is shown only in email mode — PIN students
                  ask their teacher (per spec). */}
              {!isPin && (
                <div className="text-center">
                  <Link
                    href="/forgot-password"
                    className={`text-muted-foreground hover:text-primary transition-colors ${
                      kh ? "font-khmer text-sm" : "text-xs"
                    }`}
                  >
                    {t("Forgot Password?", "ភ្លេចលេខសម្ងាត់?")}
                  </Link>
                </div>
              )}

              {isPin && (
                <p
                  className={`text-center text-muted-foreground text-xs ${
                    kh ? "font-khmer text-sm" : ""
                  }`}
                >
                  {t(
                    "Forgot your PIN? Ask your teacher to reset it for you.",
                    "ភ្លេចលេខសម្ងាត់? សុំគ្រូរបស់អ្នកកំណត់ឡើងវិញឱ្យអ្នក។",
                  )}
                </p>
              )}

              <p
                className={`text-center text-muted-foreground ${
                  kh ? "font-khmer text-sm" : "text-xs"
                }`}
              >
                {t("Don't have an account?", "មិនទាន់មានគណនី?")}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setTab("register");
                    resetReg();
                  }}
                  className="text-primary font-semibold hover:underline"
                >
                  {t("Register here", "ចុះឈ្មោះនៅទីនេះ")}
                </button>
              </p>
            </form>
          )}

          {/* ── REGISTER FORM ───────────────────────────────────── */}
          {tab === "register" && (
            <form
              onSubmit={handleRegSubmit(onRegister)}
              className="space-y-5"
              data-testid="form-register"
            >
              {/* Role selector — only in EMAIL mode (PIN mode is always
                  student) */}
              {!isPin && (
                <div>
                  <label className={labelClass}>
                    {t("I am registering as a:", "ខ្ញុំចុះឈ្មោះជា៖")}*
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        { value: "student", icon: User, en: "Student", kh: "សិស្ស" },
                        {
                          value: "school",
                          icon: SchoolIcon,
                          en: "School Official",
                          kh: "មន្ត្រីសាលា",
                        },
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
                          <Icon
                            className={`w-6 h-6 ${
                              checked ? "text-primary" : "text-muted-foreground"
                            }`}
                          />
                          <span
                            className={`text-sm font-semibold ${
                              checked ? "text-primary" : "text-foreground"
                            } ${kh ? "font-khmer text-base" : ""}`}
                          >
                            {kh ? opt.kh : opt.en}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {regErrors.role && (
                    <p className="text-destructive text-xs mt-1">
                      {t(
                        "Please select an account type",
                        "សូមជ្រើសរើសប្រភេទគណនី",
                      )}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className={labelClass} htmlFor="reg-identifier">
                  {identifierLabel}*
                </label>
                <input
                  id="reg-identifier"
                  type={isPin ? "text" : "email"}
                  inputMode={isPin ? "text" : "email"}
                  autoComplete={isPin ? "username" : "email"}
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder={identifierPlaceholder}
                  data-testid="input-identifier"
                  {...regReg("identifier", {
                    required: true,
                    validate: (v) => {
                      if (!isPin) return true;
                      const r = validateUsername(v);
                      if (r.ok) return true;
                      return kh ? r.errorKh : r.errorEn;
                    },
                    pattern: isPin
                      ? {
                          value: USERNAME_REGEX,
                          message: kh
                            ? "ប្រើ ៣–៣២ តួ៖ អក្សរ លេខ និងគូស្បែក (_)។"
                            : "Use 3–32 chars: letters, digits, underscore (_).",
                        }
                      : undefined,
                  })}
                  className={inputClass}
                />
                {identifierHelper && (
                  <p
                    className={`text-muted-foreground mt-1.5 text-xs ${
                      kh ? "font-khmer text-sm" : ""
                    }`}
                  >
                    {identifierHelper}
                  </p>
                )}
                {regErrors.identifier && (
                  <p className="text-destructive text-xs mt-1">
                    {regErrors.identifier.message ||
                      t("Required", "ទាមទារ")}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass} htmlFor="reg-secret">
                  {secretLabel}*{" "}
                  <span className="font-normal text-muted-foreground text-xs">
                    (
                    {isPin
                      ? t("4 digits", "៤ ខ្ទង់")
                      : t("min 6 chars", "យ៉ាងហោចណាស់ ៦ តួ")}
                    )
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="reg-secret"
                    type={showSecret ? "text" : "password"}
                    inputMode={isPin ? "numeric" : "text"}
                    pattern={isPin ? "\\d{4}" : undefined}
                    maxLength={isPin ? 4 : undefined}
                    autoComplete={isPin ? "one-time-code" : "new-password"}
                    placeholder={secretPlaceholder}
                    data-testid="input-secret"
                    {...regReg("secret", {
                      required: true,
                      validate: (v) => {
                        if (!isPin) {
                          if (v.length < 6) {
                            return kh
                              ? "យ៉ាងហោចណាស់ ៦ តួ"
                              : "Min 6 characters";
                          }
                          return true;
                        }
                        const r = validatePin(v);
                        if (r.ok) return true;
                        return kh ? r.errorKh : r.errorEn;
                      },
                      pattern: isPin
                        ? {
                            value: PIN_REGEX,
                            message: kh
                              ? "លេខសម្ងាត់ត្រូវមានពិតប្រាកដ ៤ ខ្ទង់។"
                              : "PIN must be exactly 4 digits.",
                          }
                        : undefined,
                    })}
                    className={`${inputClass} pr-12 ${
                      isPin ? "tracking-[0.5em] text-center text-lg" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret((v) => !v)}
                    aria-label={t("Show / hide secret", "បង្ហាញ / លាក់")}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showSecret ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {regErrors.secret && (
                  <p className="text-destructive text-xs mt-1">
                    {regErrors.secret.message ||
                      (isPin
                        ? t("4 digits required", "ត្រូវការ ៤ ខ្ទង់")
                        : t("Min 6 characters", "យ៉ាងហោចណាស់ ៦ តួ"))}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass} htmlFor="reg-confirm">
                  {isPin
                    ? t("Confirm PIN", "បញ្ជាក់លេខសម្ងាត់")
                    : t("Confirm Password", "បញ្ជាក់លេខសម្ងាត់")}
                  *
                </label>
                <input
                  id="reg-confirm"
                  type={showSecret ? "text" : "password"}
                  inputMode={isPin ? "numeric" : "text"}
                  pattern={isPin ? "\\d{4}" : undefined}
                  maxLength={isPin ? 4 : undefined}
                  autoComplete={isPin ? "one-time-code" : "new-password"}
                  placeholder={secretPlaceholder}
                  data-testid="input-confirm-secret"
                  {...regReg("confirmSecret", { required: true })}
                  className={`${inputClass} ${
                    isPin ? "tracking-[0.5em] text-center text-lg" : ""
                  }`}
                />
                {regErrors.confirmSecret && (
                  <p className="text-destructive text-xs mt-1">
                    {t("Required", "ទាមទារ")}
                  </p>
                )}
              </div>

              {/* School linker — only in email mode AND school role */}
              {!isPin && watchReg("role") === "school" && (
                <div>
                  <label className={labelClass}>
                    {t("Link to School", "ភ្ជាប់ទៅសាលា")}{" "}
                    <span className="font-normal text-muted-foreground text-xs">
                      ({t("optional", "ស្រេចចិត្ត")})
                    </span>
                  </label>
                  <select {...regReg("schoolId")} className={inputClass}>
                    <option value="">
                      {t(
                        "— Select your school (optional) —",
                        "— ជ្រើសរើសសាលា (ស្រេចចិត្ត) —",
                      )}
                    </option>
                    {schools?.map((s) => (
                      <option key={s.id} value={s.id}>
                        {kh ? s.nameKh : s.nameEn} — {s.province}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <Button
                type="submit"
                disabled={regPending}
                data-testid="button-submit-register"
                className={`w-full py-6 rounded-xl text-base font-bold ${
                  kh ? "font-khmer" : ""
                }`}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                {regPending
                  ? t("Creating account...", "កំពុងបង្កើតគណនី...")
                  : t("Create Account", "បង្កើតគណនី")}
              </Button>

              <p
                className={`text-center text-muted-foreground ${
                  kh ? "font-khmer text-sm" : "text-xs"
                }`}
              >
                {t("Already have an account?", "មានគណនីរួចហើយ?")}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setTab("login");
                    resetLogin();
                  }}
                  className="text-primary font-semibold hover:underline"
                >
                  {t("Sign in", "ចូលគណនី")}
                </button>
              </p>
            </form>
          )}

          {/* ── Auth-mode toggle (per spec, at the BOTTOM) ──────── */}
          <div className="mt-8 pt-6 border-t border-border/60">
            <button
              type="button"
              onClick={() => {
                setAuthMode((m) => (m === "pin" ? "email" : "pin"));
                resetLogin();
                resetReg();
              }}
              data-testid="button-toggle-auth-mode"
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-border text-foreground/80 hover:bg-muted/40 hover:border-primary/40 transition-all text-sm font-semibold ${
                kh ? "font-khmer text-base" : ""
              }`}
            >
              {isPin ? (
                <Mail className="w-4 h-4" />
              ) : (
                <KeyRound className="w-4 h-4" />
              )}
              {switchModeLabel}
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p
          className={`text-center mt-6 text-muted-foreground/70 ${
            kh ? "font-khmer text-sm" : "text-xs"
          }`}
        >
          {t(
            "Chouy Sala — connecting schools with those who care",
            "ជួយសាលា — ភ្ជាប់សាលាជាមួយអ្នកគាំទ្រ",
          )}
        </p>
      </div>
    </div>
  );
}
