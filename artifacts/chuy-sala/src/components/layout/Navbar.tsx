import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { NotificationBell } from "@/components/NotificationBell";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import { STEM_SITE_URL } from "@/config/sites";
export function Navbar() {
  const { user, logout } = useAuth();
  const t = useTranslation();
  const { toggleLanguage, language } = useLanguageStore();
  return (
    <nav
      className="bg-slate-950 text-white p-4 flex flex-wrap items-center gap-x-5 gap-y-3"
      aria-label="Main navigation"
    >
      <Link href="/" className="font-bold">
        School Connect Map
      </Link>
      {[
        ["/map", t("Digital Map", "ផែនទីឌីជីថល")],
        ["/needs", t("School Needs", "តម្រូវការសាលា")],
        ["/projects", t("Completed Projects", "គម្រោងបានបញ្ចប់")],
        ["/charities", t("Partners", "ដៃគូ")],
        ["/alumni", t("Stories", "រឿងរ៉ាវ")],
      ].map(([href, label]) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
      <a href={STEM_SITE_URL} target="_blank" rel="noopener noreferrer">
        STEM Hub ↗
      </a>
      <button onClick={toggleLanguage}>
        {language === "en" ? "ខ្មែរ" : "EN"}
      </button>
      {user ? (
        <>
          <Link href="/dashboard">{t("Dashboard", "ផ្ទាំងគ្រប់គ្រង")}</Link>
          <Link href="/school-inbox">{t("Inbox", "ប្រអប់សារ")}</Link>
          <NotificationBell />
          {user.isAdmin && <Link href="/admin">Admin</Link>}
          <button onClick={() => void logout()}>
            {t("Sign out", "ចាកចេញ")}
          </button>
        </>
      ) : (
        <Link href="/login">{t("School Sign In", "ចូលគណនីសាលា")}</Link>
      )}
    </nav>
  );
}
