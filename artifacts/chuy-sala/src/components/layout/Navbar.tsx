import { Link, useLocation } from "wouter";
import {
  Map, Heart, CheckCircle, Menu, X, PlusCircle, LogIn, LogOut,
  GraduationCap, Handshake, BookOpen, Leaf, Star,
  Shield, Rocket, ChevronDown, Compass, Library, FlaskConical, Smile,
} from "lucide-react";
import { useState, useRef, useEffect, ComponentType } from "react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import { useAuth } from "@/context/AuthContext";

// ── Types ─────────────────────────────────────────────────────────────────────

type NavItem = {
  href: string;
  labelEn: string;
  labelKh: string;
  icon: ComponentType<{ className?: string }>;
};

type NavGroup = {
  labelEn: string;
  labelKh: string;
  icon: ComponentType<{ className?: string }>;
  items: NavItem[];
};

// ── Groups ─────────────────────────────────────────────────────────────────────

const NAV_GROUPS: NavGroup[] = [
  {
    labelEn: "Explore",
    labelKh: "រុករក",
    icon: Compass,
    items: [
      { href: "/",      labelEn: "Home",        labelKh: "ទំព័រដើម",  icon: Heart },
      { href: "/map",   labelEn: "Map",          labelKh: "ផែនទី",     icon: Map },
      { href: "/needs", labelEn: "Browse Needs", labelKh: "តម្រូវការ", icon: Heart },
    ],
  },
  {
    labelEn: "Resources",
    labelKh: "ធនធាន",
    icon: Library,
    items: [
      { href: "/launchpad", labelEn: "Scholarships", labelKh: "អាហារូបករណ៍", icon: BookOpen },
      { href: "/charities", labelEn: "Partners",      labelKh: "ដៃគូ",          icon: Handshake },
      { href: "/alumni",    labelEn: "Alumni",         labelKh: "រឿងជោគជ័យ",   icon: Star },
    ],
  },
  {
    labelEn: "Study Center",
    labelKh: "មជ្ឈមណ្ឌលសិក្សា",
    icon: FlaskConical,
    items: [
      { href: "/exam-prep", labelEn: "Exam Prep",     labelKh: "ត្រៀមប្រឡង", icon: GraduationCap },
      { href: "/projects",  labelEn: "Completed",      labelKh: "បានបញ្ចប់",   icon: CheckCircle },
      { href: "/safety",    labelEn: "Digital Safety", labelKh: "សុវត្ថិភាព",  icon: Shield },
    ],
  },
  {
    labelEn: "Well-being",
    labelKh: "សុខុមាលភាព",
    icon: Smile,
    items: [
      { href: "/sanctuary", labelEn: "Sanctuary", labelKh: "សន្តិភាព", icon: Leaf },
      { href: "/space",     labelEn: "Space",      labelKh: "អវកាស",    icon: Rocket },
    ],
  },
];

const ADMIN_ITEM: NavItem = {
  href: "/admin",
  labelEn: "Admin",
  labelKh: "គ្រប់គ្រង",
  icon: PlusCircle,
};

// ── DropdownGroup ──────────────────────────────────────────────────────────────

function DropdownGroup({
  group,
  location,
  language,
}: {
  group: NavGroup;
  location: string;
  language: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const kh = language === "kh";

  const isGroupActive = group.items.some(
    (item) =>
      location === item.href ||
      (item.href !== "/" && location.startsWith(item.href))
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap select-none transition-colors duration-150
          ${isGroupActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
          }`}
      >
        <group.icon className="w-3.5 h-3.5 flex-shrink-0" />
        <span className={kh ? "font-khmer text-sm" : ""}>
          {kh ? group.labelKh : group.labelEn}
        </span>
        <ChevronDown
          className="w-3.5 h-3.5 opacity-50 flex-shrink-0 transition-transform duration-150"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Dropdown panel — rendered with inline styles to guarantee visibility */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 9999,
            minWidth: "200px",
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.14)",
            padding: "6px",
          }}
        >
          {group.items.map((item) => {
            const isActive =
              location === item.href ||
              (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: isActive ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                  backgroundColor: isActive ? "hsl(var(--primary) / 0.08)" : "transparent",
                  transition: "background-color 0.1s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(var(--muted) / 0.6)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <item.icon
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
                />
                <span className={kh ? "font-khmer" : ""}>
                  {kh ? item.labelKh : item.labelEn}
                </span>
                {isActive && (
                  <span
                    style={{
                      marginLeft: "auto",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "hsl(var(--primary))",
                      flexShrink: 0,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────

export function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { language, toggleLanguage } = useLanguageStore();
  const t = useTranslation();
  const { user, logout } = useAuth();
  const kh = language === "kh";

  const LanguageToggle = ({ compact = false }: { compact?: boolean }) => (
    <button
      type="button"
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
    <header
      className="sticky top-0 w-full border-b border-border/40"
      style={{ zIndex: 50, backgroundColor: "rgba(255,255,255,0.97)", boxShadow: "0 1px 12px rgba(0,0,0,0.08)" }}
    >
      {/* ── Row 1: Logo + controls ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group flex-shrink-0"
            onClick={() => setMobileOpen(false)}
          >
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

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <LanguageToggle />

            {/* Auth — desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20">
                    <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className={`text-xs font-semibold text-primary truncate max-w-[120px] ${kh ? "font-khmer text-sm" : ""}`}>
                      {user.school ? (kh ? user.school.nameKh : user.school.nameEn) : user.email}
                    </span>
                  </div>
                  <button
                    type="button"
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

            {/* Hamburger — mobile */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2 text-foreground bg-black/5 rounded-xl hover:bg-black/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Row 2: Dropdown nav — desktop only ───────────────── */}
      <div className="hidden lg:block border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 h-11">
            {NAV_GROUPS.map((group) => (
              <DropdownGroup
                key={group.labelEn}
                group={group}
                location={location}
                language={language}
              />
            ))}

            {/* Admin — only for logged-in users */}
            {user && (
              <Link
                href={ADMIN_ITEM.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors flex-shrink-0
                  ${location.startsWith(ADMIN_ITEM.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
                  }`}
              >
                <ADMIN_ITEM.icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className={kh ? "font-khmer text-sm" : ""}>
                  {kh ? ADMIN_ITEM.labelKh : ADMIN_ITEM.labelEn}
                </span>
              </Link>
            )}
          </nav>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t border-border/50 pb-4"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            zIndex: 9999,
            backgroundColor: "rgba(255,255,255,0.98)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            borderRadius: "0 0 20px 20px",
            maxHeight: "calc(100vh - 4rem)",
            overflowY: "auto",
          }}
        >
          <nav className="flex flex-col p-3 gap-1">
            {NAV_GROUPS.map((group) => {
              const isGroupActive = group.items.some(
                (item) =>
                  location === item.href ||
                  (item.href !== "/" && location.startsWith(item.href))
              );
              const isExpanded = mobileExpanded === group.labelEn;

              return (
                <div key={group.labelEn}>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpanded((prev) =>
                        prev === group.labelEn ? null : group.labelEn
                      )
                    }
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-base transition-colors
                      ${isGroupActive ? "bg-primary/8 text-primary" : "text-foreground hover:bg-black/5"}`}
                  >
                    <group.icon className={`w-5 h-5 flex-shrink-0 ${isGroupActive ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`flex-1 text-left ${kh ? "font-khmer" : ""}`}>
                      {kh ? group.labelKh : group.labelEn}
                    </span>
                    <ChevronDown
                      className="w-4 h-4 opacity-50 transition-transform duration-150"
                      style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>

                  {isExpanded && (
                    <div className="ml-4 mt-0.5 mb-1 flex flex-col gap-0.5 border-l-2 border-primary/20 pl-3">
                      {group.items.map((item) => {
                        const isActive =
                          location === item.href ||
                          (item.href !== "/" && location.startsWith(item.href));
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                              ${isActive ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-black/5 hover:text-foreground"}`}
                          >
                            <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                            <span className={kh ? "font-khmer" : ""}>
                              {kh ? item.labelKh : item.labelEn}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Admin */}
            {user && (
              <Link
                href={ADMIN_ITEM.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-base transition-colors
                  ${location.startsWith(ADMIN_ITEM.href) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-black/5"}`}
              >
                <ADMIN_ITEM.icon className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                <span className={kh ? "font-khmer" : ""}>{kh ? ADMIN_ITEM.labelKh : ADMIN_ITEM.labelEn}</span>
              </Link>
            )}

            {/* Auth row */}
            <div className="border-t border-border mt-2 pt-2">
              {user ? (
                <div className="flex flex-col gap-1.5 px-1">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10">
                    <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className={`text-sm font-semibold text-primary truncate ${kh ? "font-khmer" : ""}`}>
                      {user.school ? (kh ? user.school.nameKh : user.school.nameEn) : user.email}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-destructive hover:bg-destructive/10 text-sm transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    {t("Sign out", "ចេញ")}
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
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
