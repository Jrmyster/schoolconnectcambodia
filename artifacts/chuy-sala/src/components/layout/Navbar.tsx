import { Link, useLocation } from "wouter";
import { Map, Heart, CheckCircle, Menu, X, PlusCircle, LogIn, LogOut, GraduationCap, Handshake, ExternalLink, BookOpen, Leaf, Star, Shield } from "lucide-react";
import { useState, ComponentType } from "react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguageStore();
  const t = useTranslation();
  const { user, logout } = useAuth();

  const navLinks: { href: string; label: string; icon: ComponentType<{ className?: string }>; external?: boolean }[] = [
    { href: "/",          label: t("Home",           "ទំព័រដើម"),              icon: Heart },
    { href: "/map",       label: t("Map",            "ផែនទី"),                 icon: Map },
    { href: "/needs",     label: t("Browse Needs",   "តម្រូវការ"),             icon: Heart },
    { href: "/projects",  label: t("Completed",      "បានបញ្ចប់"),             icon: CheckCircle },
    { href: "/charities", label: t("Partners",       "ដៃគូ"),                  icon: Handshake },
    { href: "/launchpad", label: t("Scholarships",   "អាហារូបករណ៍"),           icon: BookOpen },
    { href: "/sanctuary", label: t("Sanctuary",      "សុខុមាលភាព"),            icon: Leaf },
    { href: "/alumni",    label: t("Alumni",         "រឿងជោគជ័យ"),            icon: Star },
    { href: "/safety",    label: t("Safety",         "សុវត្ថិភាព"),             icon: Shield },
    { href: "https://khmerenglishexam.com", label: t("Exam Prep", "ត្រៀមប្រឡង"), icon: GraduationCap, external: true },
    { href: "/admin",     label: t("Admin",          "គ្រប់គ្រង"),              icon: PlusCircle },
  ];

  const LanguageToggle = ({ compact = false }: { compact?: boolean }) => (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-1.5 rounded-full border-2 border-primary/25 bg-white hover:bg-primary/5 hover:border-primary/50 transition-all font-bold text-primary shadow-sm active:scale-95
        ${compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`}
    >
      <span className={language === "en" ? "opacity-100" : "opacity-35 font-normal"}>EN</span>
      <span className="opacity-25">|</span>
      <span className={language === "kh" ? "opacity-100 font-khmer" : "opacity-35 font-normal font-khmer"}>ខ្មែរ</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b-0">

      {/* ── Row 1: Logo | Controls ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* LEFT — Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt="Chouy Sala Logo"
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-xl text-primary">Chouy Sala</span>
              <span className="font-khmer text-xs text-muted-foreground">ជួយសាលា</span>
            </div>
          </Link>

          {/* RIGHT — Language toggle + Auth (desktop) + Hamburger (mobile) */}
          <div className="flex items-center gap-3">

            {/* Language toggle — always visible */}
            <LanguageToggle compact={false} />

            {/* Auth — desktop only */}
            <div className="hidden lg:flex items-center gap-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20">
                    <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className={`text-xs font-semibold text-primary truncate max-w-[120px] ${language === "kh" ? "font-khmer text-sm" : ""}`}>
                      {user.school ? (language === "kh" ? user.school.nameKh : user.school.nameEn) : user.email}
                    </span>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted hover:bg-destructive/10 hover:text-destructive text-muted-foreground text-xs font-bold transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    {t("Sign out", "ចេញ")}
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-md hover:bg-primary/90 transition-all active:scale-95"
                >
                  <LogIn className="w-4 h-4" />
                  {t("Sign In", "ចូលគណនី")}
                </Link>
              )}
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="lg:hidden p-2 text-foreground bg-black/5 rounded-xl hover:bg-black/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Row 2: Nav Links — desktop only ────────────────────────── */}
      <div className="hidden lg:block border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-[15px] h-11 overflow-x-auto scrollbar-none">
            {navLinks.map((link) => {
              const isActive = !link.external && (
                location === link.href ||
                (link.href !== "/" && location.startsWith(link.href))
              );
              const base = "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0";
              const color = isActive
                ? "bg-primary/10 text-primary"
                : link.external
                  ? "text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                  : "text-muted-foreground hover:bg-black/5 hover:text-foreground";

              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${base} ${color}`}
                  >
                    <link.icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className={language === "kh" ? "font-khmer text-sm" : ""}>{link.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${base} ${color}`}
                >
                  <link.icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className={language === "kh" ? "font-khmer text-sm" : ""}>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Mobile dropdown ──────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full glass-panel border-t border-border/50 shadow-2xl pb-4 rounded-b-3xl">
          <nav className="flex flex-col p-3 gap-1">
            {navLinks.map((link) => {
              const isActive = !link.external && (
                location === link.href ||
                (link.href !== "/" && location.startsWith(link.href))
              );
              const base = "flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-base transition-all";
              const color = isActive
                ? "bg-primary/10 text-primary"
                : link.external
                  ? "text-amber-600 hover:bg-amber-50"
                  : "text-foreground hover:bg-black/5";

              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`${base} ${color}`}
                  >
                    <link.icon className="w-5 h-5 flex-shrink-0" />
                    <span className={language === "kh" ? "font-khmer" : ""}>{link.label}</span>
                    <ExternalLink className="w-4 h-4 opacity-50 ml-auto" />
                  </a>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${base} ${color}`}
                >
                  <link.icon className="w-5 h-5 flex-shrink-0" />
                  <span className={language === "kh" ? "font-khmer" : ""}>{link.label}</span>
                </Link>
              );
            })}

            {/* Auth row in mobile menu */}
            <div className="border-t border-border mt-2 pt-2">
              {user ? (
                <div className="flex flex-col gap-1.5 px-1">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10">
                    <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className={`text-sm font-semibold text-primary truncate ${language === "kh" ? "font-khmer" : ""}`}>
                      {user.school ? (language === "kh" ? user.school.nameKh : user.school.nameEn) : user.email}
                    </span>
                  </div>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-destructive hover:bg-destructive/10 text-sm transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    {t("Sign out", "ចេញ")}
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold bg-primary text-primary-foreground text-base"
                >
                  <LogIn className="w-5 h-5" />
                  {t("Sign In", "ចូលគណនី")}
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
