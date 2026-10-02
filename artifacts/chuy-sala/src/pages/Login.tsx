import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useListSchools } from "@workspace/api-client-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
export function Login() {
  const { login, register } = useAuth(),
    [, navigate] = useLocation(),
    t = useTranslation(),
    kh = useLanguageStore((s) => s.language) === "kh";
  const [signUp, setSignUp] = useState(false),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmation, setConfirmation] = useState(""),
    [schoolId, setSchoolId] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const { data: schools } = useListSchools();
  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (signUp && password !== confirmation) {
      setError(t("Passwords do not match.", "លេខសម្ងាត់មិនត្រូវគ្នា។"));
      return;
    }
    setBusy(true);
    try {
      if (signUp)
        await register(
          email.trim(),
          password,
          "school",
          schoolId ? +schoolId : undefined,
        );
      else await login(email.trim(), password);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">
        {signUp
          ? t("Register a school account", "ចុះឈ្មោះគណនីសាលា")
          : t("School Sign In", "ចូលគណនីសាលា")}
      </h1>
      <form onSubmit={submit} className="space-y-4">
        <label className="block">
          {t("Email", "អ៊ីមែល")}
          <input
            className="w-full border rounded p-3"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block">
          {t("Password", "លេខសម្ងាត់")}
          <input
            className="w-full border rounded p-3"
            type="password"
            autoComplete={signUp ? "new-password" : "current-password"}
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {signUp && (
          <>
            <label className="block">
              {t("Confirm password", "បញ្ជាក់លេខសម្ងាត់")}
              <input
                className="w-full border rounded p-3"
                type="password"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                required
              />
            </label>
            <label className="block">
              {t("School (optional)", "សាលា (ជាជម្រើស)")}
              <select
                className="w-full border rounded p-3"
                value={schoolId}
                onChange={(e) => setSchoolId(e.target.value)}
              >
                <option value="">—</option>
                {schools?.map((s) => (
                  <option key={s.id} value={s.id}>
                    {kh ? s.nameKh : s.nameEn}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}
        {error && (
          <p role="alert" className="text-red-700">
            {error}
          </p>
        )}
        <button
          className="bg-sky-800 text-white rounded p-3 w-full"
          disabled={busy}
        >
          {busy
            ? t("Please wait…", "សូមរង់ចាំ…")
            : signUp
              ? t("Register", "ចុះឈ្មោះ")
              : t("Sign in", "ចូល")}
        </button>
      </form>
      <button className="underline mt-4" onClick={() => setSignUp(!signUp)}>
        {signUp
          ? t("Already registered? Sign in", "មានគណនីហើយ? ចូល")
          : t("Create a school account", "បង្កើតគណនីសាលា")}
      </button>
      <p className="mt-4">
        <Link href="/forgot-password">
          {t("Forgot password?", "ភ្លេចលេខសម្ងាត់?")}
        </Link>
      </p>
    </main>
  );
}
