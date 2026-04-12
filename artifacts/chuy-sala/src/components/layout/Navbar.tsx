import { Link, useLocation } from "wouter";
import { Map, Heart, CheckCircle, Menu, X, PlusCircle, LogIn, LogOut, GraduationCap, Handshake, ExternalLink } from "lucide-react";
import { useState, ComponentType } from "react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguageStore();
  const t = useTranslation();
  const { user, logout } = useAuth();

  const navLinks: { href: string; label: string; icon: ComponentType<{ className?: string }>; external?: boolean }[] = [
    { href: "/", label: t("Home", "ទំព័រដើម"), icon: Heart },
    { href: "/map", label: t("Map", "ផែនទី"), icon: Map },
    { href: "/needs", label: t("Browse Needs", "តម្រូវការសាលា"), icon: Heart },
    { href: "/projects", label: t("Completed", "គម្រោងបានបញ្ចប់"), icon: CheckCircle },
    { href: "/charities", label: t("Partners", "ដៃគូ"), icon: Handshake },
    { href: "https://khmerenglishexam.com", label: t("Exam Prep", "ត្រៀមប្រឡង"), icon: GraduationCap, external: true },
    { href: "/admin", label: t("Admin", "គ្រប់គ្រង"), icon: PlusCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0 mr-2 lg:mr-6">
            <img 
              src={`${import.meta.env.BASE_URL}images/logo.png`} 
              alt="Chouy Sala Logo" 
              className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-2xl leading-none text-primary">
                Chouy Sala
              </span>
              <span className="font-khmer text-sm text-muted-foreground">
                ជួយសាលា
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-3">
            {navLinks.map((link) => {
              const isActive = !link.external && (location === link.href || (link.href !== "/" && location.startsWith(link.href)));
              const baseClass = `flex items-center gap-1.5 px-2 py-2 xl:px-3 rounded-xl text-sm font-semibold transition-all duration-200`;
              const activeClass = isActive ? "bg-primary/10 text-primary" : "";
              const internalHover = "text-muted-foreground hover:bg-black/5 hover:text-foreground";
              const externalHover = "text-amber-600 hover:bg-amber-50 hover:text-amber-700";
              const colorClass = isActive ? activeClass : (link.external ? externalHover : internalHover);

              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${baseClass} ${colorClass}`}
                  >
                    <link.icon className="w-4 h-4" />
                    <span className={language === 'kh' ? 'font-khmer text-base' : ''}>{link.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${baseClass} ${colorClass}`}
                >
                  <link.icon className="w-4 h-4" />
                  <span className={language === 'kh' ? 'font-khmer text-base' : ''}>{link.label}</span>
                </Link>
              );
            })}
            
            <div className="w-px h-8 bg-border mx-2"></div>
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary/20 bg-white hover:bg-primary/5 hover:border-primary/40 transition-all font-bold text-sm text-primary shadow-sm active:scale-95"
            >
              <span className={language === 'en' ? 'opacity-100' : 'opacity-40 font-normal'}>EN</span>
              <span className="opacity-30">|</span>
              <span className={language === 'kh' ? 'opacity-100 font-khmer text-base' : 'opacity-40 font-normal font-khmer'}>ខ្មែរ</span>
            </button>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20">
                  <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className={`text-xs font-semibold text-primary truncate max-w-[120px] ${language === 'kh' ? 'font-khmer text-sm' : ''}`}>
                    {user.school ? (language === 'kh' ? user.school.nameKh : user.school.nameEn) : user.email}
                  </span>
                </div>
                <button
                  onClick={() => logout()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted hover:bg-destructive/10 hover:text-destructive text-muted-foreground text-xs font-bold transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  {t("Sign out", "ចេញ")}
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-md hover:bg-primary/90 transition-all active:scale-95"
              >
                <LogIn className="w-4 h-4" />
                {t("Sign In", "ចូលគណនី")}
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border-2 border-primary/20 bg-white text-xs font-bold text-primary"
            >
              <span className={language === 'en' ? 'opacity-100' : 'opacity-40 font-normal'}>EN</span>
              <span>|</span>
              <span className={language === 'kh' ? 'opacity-100 font-khmer' : 'opacity-40 font-normal font-khmer'}>ខ្មែរ</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground bg-black/5 rounded-xl hover:bg-black/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full glass-panel border-t border-border/50 shadow-2xl pb-6 rounded-b-3xl">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => {
              const isActive = !link.external && (location === link.href || (link.href !== "/" && location.startsWith(link.href)));
              const baseClass = `flex items-center gap-3 px-4 py-4 rounded-xl font-semibold text-lg transition-all`;
              const colorClass = isActive
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
                    className={`${baseClass} ${colorClass}`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className={language === 'kh' ? 'font-khmer' : ''}>{link.label}</span>
                    <ExternalLink className="w-4 h-4 opacity-60 ml-auto" />
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${baseClass} ${colorClass}`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className={language === 'kh' ? 'font-khmer' : ''}>{link.label}</span>
                </Link>
              );
            })}
            <div className="border-t border-border mt-2 pt-2">
              {user ? (
                <div className="flex flex-col gap-2 px-1">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span className={`text-sm font-semibold text-primary ${language === 'kh' ? 'font-khmer' : ''}`}>
                      {user.school ? (language === 'kh' ? user.school.nameKh : user.school.nameEn) : user.email}
                    </span>
                  </div>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-destructive hover:bg-destructive/10 transition-all ${language === 'kh' ? 'font-khmer text-base' : 'text-sm'}`}
                  >
                    <LogOut className="w-5 h-5" />
                    {t("Sign out", "ចេញ")}
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-4 rounded-xl font-semibold bg-primary text-primary-foreground ${language === 'kh' ? 'font-khmer text-base' : 'text-lg'}`}
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
