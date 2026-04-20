import { Link, useLocation } from "wouter";
import {
  Map, Heart, CheckCircle, Menu, X, PlusCircle, LogIn, LogOut,
  GraduationCap, Handshake, BookOpen, Leaf, Star,
  Shield, Rocket, ChevronDown, Compass, Library, FlaskConical, Smile, User,
  Banknote, Wrench, Globe, Zap, Atom, Beaker, Microscope, Sparkles, PersonStanding, PenLine, Mountain, LifeBuoy, Cpu, Binary, Waves, Camera, CloudRain,
} from "lucide-react";
import { useState, useRef, useEffect, ComponentType } from "react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import { useAuth } from "@/context/AuthContext";
import { NotificationBell } from "@/components/NotificationBell";
import { ThemePalette } from "@/components/ThemePalette";
import { GlobalSearch } from "@/components/GlobalSearch";
import { InstallAppButton } from "@/components/InstallAppButton";

// ── Types ─────────────────────────────────────────────────────────────────────

type NavItem = {
  href: string;
  labelEn: string;
  labelKh: string;
  icon: ComponentType<{ className?: string }>;
  external?: boolean;
  descEn?: string;
  descKh?: string;
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
      { href: "/exam-prep",             labelEn: "Exam Prep",        labelKh: "ត្រៀមប្រឡង",           icon: GraduationCap },
      { href: "/english-writing",       labelEn: "English Writing",  labelKh: "ការសរសេរភាសាអង់គ្លេស", icon: PenLine },
      { href: "https://khmervoc.com",   labelEn: "Vocational Guide", labelKh: "មគ្គុទ្ទេសក៍វិជ្ជាជីវៈ", icon: Wrench, external: true },
      { href: "https://anatomykh.com",  labelEn: "Human Anatomy",    labelKh: "រូបកាយវិភាគវិទ្យា",      icon: PersonStanding, external: true },
      { href: "/reading-list",          labelEn: "Reading List",      labelKh: "បញ្ជីសៀវភៅអាន",         icon: BookOpen },
      { href: "/world-history",         labelEn: "World History",     labelKh: "ប្រវត្តិសាស្ត្រពិភពលោក",  icon: Library },
      { href: "/projects",              labelEn: "Completed",         labelKh: "បានបញ្ចប់",              icon: CheckCircle },
    ],
  },
  {
    labelEn: "Science",
    labelKh: "វិទ្យាសាស្ត្រ",
    icon: Atom,
    items: [
      {
        href: "/chemistry",
        labelEn: "Chemistry Hub",
        labelKh: "មជ្ឈមណ្ឌលគីមីវិទ្យា",
        icon: Beaker,
        descEn: "Atoms, reactions, and chemistry in daily life — in 4 modules.",
        descKh: "អាតូម ប្រតិកម្ម និងគីមីវិទ្យាក្នុងជីវភាពប្រចាំថ្ងៃ — ជា ៤ មុខវិជ្ជា។",
      },
      {
        href: "/chemistry/building-blocks",
        labelEn: "1. The Atom",
        labelKh: "១. អាតូម",
        icon: Atom,
      },
      {
        href: "/chemistry/reactions-math",
        labelEn: "2. Chemical Reactions & Math",
        labelKh: "២. ប្រតិកម្មគីមី និងគណិតវិទ្យា",
        icon: FlaskConical,
      },
      {
        href: "/chemistry/advanced",
        labelEn: "3. Advanced Concepts",
        labelKh: "៣. គំនិតកម្រិតខ្ពស់",
        icon: Microscope,
      },
      {
        href: "/chemistry/real-world",
        labelEn: "4. Chemistry in the Real World",
        labelKh: "៤. គីមីវិទ្យាក្នុងពិភពពិត",
        icon: Sparkles,
      },
      {
        href: "/fun-lab",
        labelEn: "Fun Lab",
        labelKh: "មន្ទីរពិសោធន៍កំសាន្ត",
        icon: FlaskConical,
        descEn: "Safe, hands-on chemistry experiments you can try at home.",
        descKh: "ការពិសោធន៍គីមីវិទ្យាសុវត្ថិភាពដែលអ្នកអាចសាកល្បងនៅផ្ទះ។",
      },
      {
        href: "/physics",
        labelEn: "Physics Hub",
        labelKh: "មជ្ឈមណ្ឌលរូបវិទ្យា",
        icon: Atom,
        descEn: "Motion, forces, energy, waves & light — the rules of the universe.",
        descKh: "ចលនា កម្លាំង ថាមពល រលក និងពន្លឺ — ច្បាប់នៃសកលលោក។",
      },
      {
        href: "/physics/motion",
        labelEn: "1. Motion & Kinematics",
        labelKh: "១. ចលនា និងគីនេម៉ាទិច",
        icon: Rocket,
      },
      {
        href: "/physics/forces",
        labelEn: "2. Forces & Newton's Laws",
        labelKh: "២. កម្លាំង និងច្បាប់ញូតុន",
        icon: Compass,
      },
      {
        href: "/physics/energy",
        labelEn: "3. Energy & Thermodynamics",
        labelKh: "៣. ថាមពល និងទែម៉ូឌីណាមិច",
        icon: Zap,
      },
      {
        href: "/physics/waves",
        labelEn: "4. Waves, Sound & Light",
        labelKh: "៤. រលក សំឡេង និងពន្លឺ",
        icon: Globe,
      },
      {
        href: "/biology",
        labelEn: "Biology Hub",
        labelKh: "មជ្ឈមណ្ឌលជីវវិទ្យា",
        icon: Leaf,
        descEn: "Cells, genetics, evolution and the Mekong's living web — bilingual & interactive.",
        descKh: "កោសិកា ហ្សែន ការវិវត្ត និងបណ្តាញជីវិតនៃទន្លេមេគង្គ — ទ្វេភាសា និងអន្តរកម្ម។",
      },
      {
        href: "/geology",
        labelEn: "Geology & Earth Science",
        labelKh: "ភូគព្ភវិទ្យា និងវិទ្យាសាស្ត្រផែនដី",
        icon: Mountain,
        descEn: "Tectonic plates, the rock cycle, and Cambodia's geological position — interactive maps & diagrams.",
        descKh: "ប្លាកធរណីសាស្ត្រ វដ្ដថ្ម និងទីតាំងភូគព្ភវិទ្យារបស់កម្ពុជា — ផែនទី និងតារាងអន្តរកម្ម។",
      },
      {
        href: "/disaster-prep",
        labelEn: "Disaster Preparedness",
        labelKh: "ការត្រៀមលក្ខណៈគ្រោះមហន្តរាយ",
        icon: LifeBuoy,
        descEn: "Floods, earthquakes, tsunamis — read the warning signs and pack your Go-Bag.",
        descKh: "ទឹកជំនន់ ការរញ្ជួយដី ស៊ូណាមិ — អានសញ្ញាព្រមាន និងខ្ចប់កាបូបបន្ទាន់របស់អ្នក។",
      },
      {
        href: "/space",
        labelEn: "Space",
        labelKh: "អវកាស",
        icon: Rocket,
      },
      {
        href: "/oceanography",
        labelEn: "Oceanography: The Blue Frontier",
        labelKh: "មហាសមុទ្រវិទ្យា៖ ព្រំដែនពណ៌ខៀវ",
        icon: Waves,
        descEn: "Dive through the ocean's three zones, ride the global current conveyor belt, and meet the mangroves and reefs of Cambodia's coast.",
        descKh: "មុជឆ្លងកាត់តំបន់ ៣ នៃមហាសមុទ្រ ជិះខ្សែបង្វិលចរន្តពិភពលោក និងស្គាល់ព្រៃកោងកាង និងផ្កាថ្មសមុទ្រនៃឆ្នេរកម្ពុជា។",
      },
      {
        href: "/weather",
        labelEn: "Weather & Atmospheric Science",
        labelKh: "អាកាសធាតុ និងវិទ្យាសាស្ត្របរិយាកាស",
        icon: CloudRain,
        descEn: "Trap CO₂ and watch the Earth glow red, crash a cold front into a warm one to make rain, build lightning inside a cloud, and meet hurricanes and tornadoes.",
        descKh: "ស្ទះ CO₂ ហើយមើលផែនដីចាំងពន្លឺក្រហម ប៉ះផ្ទៃខ្យល់ត្រជាក់ និងក្ដៅឱ្យកើតភ្លៀង សាងសង់រន្ទះក្នុងពពក និងស្គាល់ខ្យល់ព្យុះធំ និងខ្យល់ព្យុះក្រឡុក។",
      },
    ],
  },
  {
    labelEn: "Technology",
    labelKh: "បច្ចេកវិទ្យា",
    icon: Cpu,
    items: [
      {
        href: "/how-computers-work",
        labelEn: "How Computers Work",
        labelKh: "របៀបដែលកុំព្យូទ័រដំណើរការ",
        icon: Binary,
        descEn: "Build a virtual PC, flip binary switches, and see hardware vs. software — interactive blueprint diagrams.",
        descKh: "សាងសង់ Virtual PC ប្ដូរកុងតាក់គោលពីរ និងមើល Hardware ប្រឆាំងនឹង Software — តារាង blueprint អន្តរកម្ម។",
      },
      {
        href: "/safety",
        labelEn: "Digital Safety",
        labelKh: "សុវត្ថិភាពឌីជីថល",
        icon: Shield,
        descEn: "Spot phishing scams, forge unbreakable passwords, and trace your digital footprint.",
        descKh: "ស្គាល់ការបោកប្រាស់ phishing ផ្គុំពាក្យសម្ងាត់មិនអាចបំបាក់បាន និងតាមដានស្នាមជើងឌីជីថលរបស់អ្នក។",
      },
      {
        href: "/cinematography",
        labelEn: "Cameras & Cinematography: The Science of Light",
        labelKh: "កាមេរ៉ា និងសិល្បៈភាពយន្ត៖ វិទ្យាសាស្ត្រនៃពន្លឺ",
        icon: Camera,
        descEn: "Trace photons through a camera lens, balance the exposure triangle to freeze a moving motorbike, and learn how filmmakers tell whole stories with three shot sizes.",
        descKh: "តាមដានពន្លឺឆ្លងកាត់កែវកាមេរ៉ា ផ្គុំត្រីកោណការថតឱ្យបង្ហាប់ម៉ូតូកំពុងធ្វើដំណើរ និងរៀនរបៀបដែលអ្នកថតភាពយន្តនិទានរឿងទាំងមូលដោយស៊ុមបី។",
      },
    ],
  },
  {
    labelEn: "Well-being",
    labelKh: "សុខុមាលភាព",
    icon: Smile,
    items: [
      { href: "/sanctuary",          labelEn: "Sanctuary",             labelKh: "សន្តិភាព",                 icon: Leaf },
      { href: "/science",            labelEn: "Scientific Literacy",    labelKh: "ចំណេះដឹងវិទ្យាសាស្ត្រ",  icon: FlaskConical },
      { href: "/electrical-safety",  labelEn: "Electrical Safety",      labelKh: "សុវត្ថិភាពអគ្គិសនី",      icon: Zap },
      { href: "https://finlitkh.com",    labelEn: "Financial Literacy",       labelKh: "ចំណេះដឹងហិរញ្ញវត្ថុ",    icon: Banknote, external: true },
      {
        href: "https://bfiworldgame.com",
        labelEn: "Global Resource Game (BFI World Game)",
        labelKh: "ល្បែងធនធានពិភពលោក (BFI World Game)",
        icon: Globe,
        external: true,
        descEn: "Learn to manage Earth's resources so that 100% of humanity can thrive.",
        descKh: "រៀនគ្រប់គ្រងធនធានរបស់ផែនដី ដើម្បីឱ្យមនុស្សជាតិ ១០០% អាចរីកចម្រើន។",
      },
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
  const hasDescriptions = group.items.some((item) => item.descEn || item.descKh);

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
          className="nav-dropdown-scroll"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 9999,
            minWidth: hasDescriptions ? "300px" : "200px",
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.14)",
            padding: "6px",
            maxHeight: "min(60vh, 480px)",
            overflowY: "auto",
            overscrollBehavior: "contain",
            scrollBehavior: "smooth",
          }}
        >
          {group.items.map((item) => {
            const isActive =
              !item.external &&
              (location === item.href ||
                (item.href !== "/" && location.startsWith(item.href)));

            const hasDesc = !!(item.descEn || item.descKh);
            const sharedStyle: React.CSSProperties = {
              display: "flex",
              alignItems: hasDesc ? "flex-start" : "center",
              gap: "10px",
              padding: "10px 14px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              color: isActive ? "hsl(var(--primary))" : "hsl(var(--foreground))",
              backgroundColor: isActive ? "hsl(var(--primary) / 0.08)" : "transparent",
              transition: "background-color 0.1s",
            };

            const sharedHover = {
              onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(var(--muted) / 0.6)";
              },
              onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              },
            };

            const inner = (
              <>
                <item.icon
                  className="w-4 h-4 flex-shrink-0"
                  style={{
                    color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                    marginTop: hasDesc ? "2px" : "0",
                  }}
                />
                <span className="flex-1 min-w-0">
                  <span className={`block ${kh ? "font-khmer" : ""}`}>
                    {kh ? item.labelKh : item.labelEn}
                  </span>
                  {hasDesc && (
                    <span
                      className={`block leading-snug mt-0.5 ${kh ? "font-khmer" : ""}`}
                      style={{ fontSize: "11px", color: "hsl(var(--muted-foreground))", fontWeight: 400 }}
                    >
                      {kh ? item.descKh : item.descEn}
                    </span>
                  )}
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
              </>
            );

            return item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                style={sharedStyle}
                {...sharedHover}
              >
                {inner}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={sharedStyle}
                {...sharedHover}
              >
                {inner}
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

          {/* Logo + slogan */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-shrink">
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

            {/* Slogan — hidden on mobile, visible from lg up */}
            <div
              className="hidden lg:flex items-center gap-3 min-w-0"
              aria-hidden={false}
            >
              <span
                className="h-7 w-px bg-slate-300/80"
                aria-hidden="true"
              />
              <span
                className={`text-[13px] font-light text-slate-500 truncate ${
                  language === "kh" ? "font-khmer leading-snug" : ""
                }`}
                title={t(
                  "The Educational Front Page of Cambodia",
                  "ទំព័រមុខនៃការអប់រំនៅកម្ពុជា",
                )}
              >
                {t(
                  "The Educational Front Page of Cambodia",
                  "ទំព័រមុខនៃការអប់រំនៅកម្ពុជា",
                )}
              </span>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Bell appears only for school accounts (handles its own visibility) */}
            <NotificationBell />
            <ThemePalette />
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
                  <Link
                    href="/profile"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground text-xs font-bold transition-all"
                  >
                    <User className="w-3.5 h-3.5" />
                    {t("Profile", "ប្រូហ្វាយ")}
                  </Link>
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
              <InstallAppButton variant="compact" />
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

            {/* Compact global search — pushed to the right */}
            <div className="ml-auto flex-shrink-0 w-64 xl:w-80">
              <GlobalSearch variant="compact" />
            </div>

            {/* Admin link intentionally omitted — hidden route only */}
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
            {/* Mobile global search */}
            <div className="px-1 pt-1 pb-2">
              <GlobalSearch variant="compact" onNavigate={() => setMobileOpen(false)} />
            </div>

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
                          !item.external &&
                          (location === item.href ||
                            (item.href !== "/" && location.startsWith(item.href)));

                        const itemHasDesc = !!(item.descEn || item.descKh);
                        const mobileItemClass = `flex ${itemHasDesc ? "items-start" : "items-center"} gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                          ${isActive ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-black/5 hover:text-foreground"}`;
                        const mobileInner = (
                          <>
                            <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"} ${itemHasDesc ? "mt-0.5" : ""}`} />
                            <span className="flex-1 min-w-0">
                              <span className={`block ${kh ? "font-khmer" : ""}`}>
                                {kh ? item.labelKh : item.labelEn}
                              </span>
                              {itemHasDesc && (
                                <span className={`block text-xs text-muted-foreground leading-snug mt-0.5 font-normal ${kh ? "font-khmer" : ""}`}>
                                  {kh ? item.descKh : item.descEn}
                                </span>
                              )}
                            </span>
                          </>
                        );

                        return item.external ? (
                          <a
                            key={item.href}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                            className={mobileItemClass}
                          >
                            {mobileInner}
                          </a>
                        ) : (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={mobileItemClass}
                          >
                            {mobileInner}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Admin link intentionally omitted from mobile nav — hidden route only */}

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
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-primary hover:bg-primary/10 text-sm transition-all"
                  >
                    <User className="w-5 h-5" />
                    <span className={kh ? "font-khmer" : ""}>{kh ? "ប្រូហ្វាយ" : "My Profile"}</span>
                  </Link>
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
              <InstallAppButton variant="full" className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
