import { Link, useLocation } from "wouter";
import { Map, Heart, CheckCircle, Menu, X, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguageStore();
  const t = useTranslation();

  const navLinks = [
    { href: "/", label: t("Home", "ទំព័រដើម"), icon: Heart },
    { href: "/map", label: t("Map", "ផែនទី"), icon: Map },
    { href: "/needs", label: t("Browse Needs", "តម្រូវការសាលា"), icon: Heart },
    { href: "/projects", label: t("Completed", "គម្រោងបានបញ្ចប់"), icon: CheckCircle },
    { href: "/admin", label: t("Admin", "គ្រប់គ្រង"), icon: PlusCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src={`${import.meta.env.BASE_URL}images/logo.png`} 
              alt="Chuy Sala Logo" 
              className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-2xl leading-none text-primary">
                Chuy Sala
              </span>
              <span className="font-khmer text-sm text-muted-foreground">
                ជួយសាលា
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 md:gap-4 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
                  }`}
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
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
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
        <div className="md:hidden absolute top-20 left-0 w-full glass-panel border-t border-border/50 shadow-2xl pb-6 rounded-b-3xl">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => {
              const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-4 rounded-xl font-semibold text-lg transition-all ${
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground hover:bg-black/5"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className={language === 'kh' ? 'font-khmer' : ''}>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
