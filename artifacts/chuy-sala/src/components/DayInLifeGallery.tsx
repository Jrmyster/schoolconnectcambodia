import { useEffect, useState } from "react";
import {
  Sun, Code2, Sprout, Stethoscope, X, Sunrise, Wrench as WrenchIcon,
  AlertTriangle, Heart, Sparkles, ArrowRight, MapPin, Clock,
  Wrench, Calculator, HeartHandshake, Microscope,
} from "lucide-react";
import type { ComponentType } from "react";
import { useLanguageStore } from "@/store/use-language";

type SkillKey = "build" | "numbers" | "helping" | "nature" | "art";

const SKILL_LABELS: Record<SkillKey, { en: string; kh: string; Icon: ComponentType<{ className?: string }>; cls: string }> = {
  build:   { en: "Fixing & Building",  kh: "ការជួសជុល និងការសាងសង់", Icon: Wrench,         cls: "bg-orange-100 text-orange-800 border-orange-300" },
  numbers: { en: "Numbers & Patterns", kh: "លេខ និងលំនាំ",            Icon: Calculator,     cls: "bg-blue-100 text-blue-800 border-blue-300" },
  helping: { en: "Helping & Teaching", kh: "ការជួយ និងការបង្រៀន",      Icon: HeartHandshake, cls: "bg-rose-100 text-rose-800 border-rose-300" },
  nature:  { en: "Nature & Science",   kh: "ធម្មជាតិ និងវិទ្យាសាស្ត្រ", Icon: Microscope,     cls: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  art:     { en: "Art & Design",       kh: "សិល្បៈ និងការរចនា",          Icon: Sparkles,       cls: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300" },
};

type Profile = {
  id: string;
  name:    { en: string; kh: string };
  role:    { en: string; kh: string };
  location:{ en: string; kh: string };
  age: number;
  Avatar: ComponentType<{ className?: string }>;
  initials: string;
  cover: string; // gradient
  accent: string; // text color for cover
  skill: SkillKey;
  morning: { time: string; en: string; kh: string };
  tools: Array<{ en: string; kh: string }>;
  challenge: { en: string; kh: string };
  reward:    { en: string; kh: string };
  pullQuote: { en: string; kh: string };
};

const PROFILES: Profile[] = [
  {
    id: "solar",
    name: { en: "Sopheaktra", kh: "សុភក្ត្រា" },
    role: { en: "Solar Panel Technician", kh: "អ្នកបច្ចេកទេសថាមពលព្រះអាទិត្យ" },
    location: { en: "Battambang Province", kh: "ខេត្តបាត់ដំបង" },
    age: 24,
    Avatar: Sun,
    initials: "សុ",
    cover: "from-amber-300 via-orange-300 to-rose-300",
    accent: "text-amber-950",
    skill: "build",
    morning: {
      time: "5:30 AM",
      en: "Up before sunrise. I drink coffee, check the day's job sheet, and load my truck with panels, brackets and a multimeter. Most rooftops are an hour away on red-dirt roads.",
      kh: "ភ្ញាក់មុនព្រះអាទិត្យរះ។ ខ្ញុំផឹកកាហ្វេ ពិនិត្យបញ្ជីការងារប្រចាំថ្ងៃ ហើយដាក់ផ្ទាំងសូឡា ខ្នាប់ និងម៉ាស៊ីនវាស់ភ្លើងលើឡាន។ ភាគច្រើនដំបូលផ្ទះនៅឆ្ងាយប្រហែលមួយម៉ោងលើផ្លូវដីក្រហម។",
    },
    tools: [
      { en: "Multimeter",            kh: "ម៉ាស៊ីនវាស់ភ្លើង" },
      { en: "Cordless drill",         kh: "ម៉ាស៊ីនខួងគ្មានខ្សែ" },
      { en: "Solar panel & inverter", kh: "ផ្ទាំងសូឡា និងអាំងវែរតឺរ" },
      { en: "Safety harness",         kh: "ខ្សែសុវត្ថិភាពលើដំបូល" },
      { en: "Wrench set",             kh: "ឈុតប្រដាប់ខាន់" },
    ],
    challenge: {
      en: "Wiring panels safely on a hot tin roof — one wrong connection can fry the inverter or shock me. I have to stay calm, double-check polarity, and trust my multimeter.",
      kh: "ការតភ្ជាប់ខ្សែភ្លើងសូឡាដោយសុវត្ថិភាពនៅលើដំបូលស័ង្កសីដែលក្ដៅខ្លាំង — ការតភ្ជាប់ខុសមួយអាចឲ្យអាំងវែរតឺរឆេះ ឬឆក់ខ្ញុំបាន។ ខ្ញុំត្រូវនៅស្ងប់ ផ្ទៀងផ្ទាត់ប៉ូលពីរដង និងជឿជាក់លើម៉ាស៊ីនវាស់ភ្លើង។",
    },
    reward: {
      en: "When I flip the switch and a family's lights come on for the first time — kids can finally study at night without a kerosene lamp. That moment never gets old.",
      kh: "ពេលខ្ញុំបើកស្វីច ហើយភ្លើងផ្ទះគ្រួសារមួយភ្លឺឡើងជាលើកដំបូល — កុមារទីបំផុតអាចរៀននៅពេលយប់ ដោយមិនចាំបាច់ប្រើចង្កៀងប្រេងកាត។ ពេលនោះមិនដែលធុញទេ។",
    },
    pullQuote: {
      en: "I bring sunlight into homes that have lived in the dark for generations.",
      kh: "ខ្ញុំនាំពន្លឺព្រះអាទិត្យចូលទៅផ្ទះដែលរស់នៅក្នុងភាពងងឹតអស់ច្រើនជំនាន់។",
    },
  },
  {
    id: "dev",
    name: { en: "Davy", kh: "ដាវី" },
    role: { en: "Software Developer", kh: "អ្នកបង្កើតកម្មវិធីកុំព្យូទ័រ" },
    location: { en: "Phnom Penh", kh: "ភ្នំពេញ" },
    age: 27,
    Avatar: Code2,
    initials: "ដ",
    cover: "from-sky-300 via-indigo-300 to-violet-300",
    accent: "text-indigo-950",
    skill: "numbers",
    morning: {
      time: "8:30 AM",
      en: "I open my laptop with a hot cup of Khmer coffee, scan messages from yesterday's bug reports, and write a small to-do list before the team's 9:00 stand-up meeting.",
      kh: "ខ្ញុំបើកកុំព្យូទ័រយួរដៃជាមួយកាហ្វេខ្មែរក្ដៅៗ មើលសារពីរបាយការណ៍កំហុសកាលពីម្សិលមិញ ហើយសរសេរបញ្ជីការងារតូចមួយ មុនកិច្ចប្រជុំក្រុមម៉ោង ៩៖០០។",
    },
    tools: [
      { en: "JavaScript & TypeScript", kh: "ភាសា JavaScript និង TypeScript" },
      { en: "VS Code editor",          kh: "កម្មវិធី VS Code" },
      { en: "Git & GitHub",            kh: "Git និង GitHub" },
      { en: "Figma (for designs)",     kh: "Figma (សម្រាប់ការរចនា)" },
      { en: "Slack & Notion",          kh: "Slack និង Notion" },
    ],
    challenge: {
      en: "Tracking down a bug that only happens for one user. I read logs, write tests, and rebuild the problem step by step — sometimes for two days — until the puzzle clicks.",
      kh: "ការតាមរកកំហុសកម្មវិធីដែលកើតឡើងតែសម្រាប់អ្នកប្រើម្នាក់។ ខ្ញុំអានកំណត់ហេតុ សរសេរការសាកល្បង និងសាងសង់បញ្ហាឡើងវិញម្ដងមួយជំហាន — ជួនកាលពីរថ្ងៃ — រហូតដល់ប៉ុមប៉ាមនោះស្រាយចេញ។",
    },
    reward: {
      en: "Watching a Khmer business owner use the app I built to track sales on her phone — and earn 30% more because of it. My code becomes someone's livelihood.",
      kh: "មើលម្ចាស់អាជីវកម្មខ្មែរប្រើកម្មវិធីដែលខ្ញុំបានសាងសង់ ដើម្បីតាមដានការលក់នៅលើទូរស័ព្ទរបស់នាង — ហើយរកប្រាក់ចំណូលបានច្រើនជាងមុន ៣០%។ កូដរបស់ខ្ញុំក្លាយជាជីវភាពរបស់នរណាម្នាក់។",
    },
    pullQuote: {
      en: "Logic is just patience with a keyboard.",
      kh: "តក្កវិជ្ជា គឺគ្រាន់តែជាការអត់ធ្មត់ជាមួយក្ដារចុច។",
    },
  },
  {
    id: "agri",
    name: { en: "Channary", kh: "ច័ន្ទណារី" },
    role: { en: "Agricultural Scientist", kh: "អ្នកវិទ្យាសាស្ត្រកសិកម្ម" },
    location: { en: "Takeo Province", kh: "ខេត្តតាកែវ" },
    age: 31,
    Avatar: Sprout,
    initials: "ច",
    cover: "from-lime-300 via-emerald-300 to-teal-300",
    accent: "text-emerald-950",
    skill: "nature",
    morning: {
      time: "6:00 AM",
      en: "I head out to the rice paddies before the sun gets high. My first task is to collect soil samples from three farms — pH, moisture, and nitrogen levels all change overnight.",
      kh: "ខ្ញុំចេញទៅស្រែដាំស្រូវមុនពេលថ្ងៃខ្ពស់។ កិច្ចការដំបូងរបស់ខ្ញុំ គឺការប្រមូលគំរូដីពីកសិដ្ឋានបី — កម្រិត pH សំណើម និងនីត្រូសែនប្រែប្រួលក្នុងមួយយប់។",
    },
    tools: [
      { en: "Soil pH meter",         kh: "ឧបករណ៍វាស់ pH ដី" },
      { en: "Moisture probe",        kh: "ឧបករណ៍ស្ទាបស្ទង់សំណើម" },
      { en: "Microscope",            kh: "មីក្រូទស្សន៍" },
      { en: "Field notebook",        kh: "សៀវភៅកត់ត្រាចុះឆ្នេរ" },
      { en: "GPS-tagged seed bags",  kh: "ថង់គ្រាប់ពូជមាន GPS" },
    ],
    challenge: {
      en: "Convincing farmers who have grown rice for 40 years to try a new salt-tolerant variety. Trust takes seasons — I bring data, but I also have to listen first.",
      kh: "ការបញ្ចុះបញ្ចូលកសិករដែលបានដាំស្រូវ ៤០ ឆ្នាំ ឲ្យសាកល្បងពូជស្រូវធន់នឹងជាតិអំបិលថ្មី។ ការទុកចិត្តត្រូវការច្រើនរដូវ — ខ្ញុំនាំទិន្នន័យមកជាមួយ ប៉ុន្តែខ្ញុំក៏ត្រូវស្តាប់មុនដែរ។",
    },
    reward: {
      en: "When a farmer's harvest doubles and he can finally send his daughter to high school in town — that one yield report changes a whole family's future.",
      kh: "ពេលផលរបស់កសិករបានកើនឡើងទ្វេដង ហើយគាត់អាចបញ្ជូនកូនស្រីទៅរៀននៅអនុវិទ្យាល័យក្នុងទីក្រុង — របាយការណ៍ផលមួយនោះ ផ្លាស់ប្ដូរអនាគតគ្រួសារទាំងមូល។",
    },
    pullQuote: {
      en: "Every grain of rice carries the answer to a question we forgot to ask the soil.",
      kh: "គ្រាប់ស្រូវនីមួយៗផ្ទុកនូវចម្លើយចំពោះសំណួរ ដែលយើងភ្លេចសួរដី។",
    },
  },
  {
    id: "nurse",
    name: { en: "Sreypov", kh: "ស្រីពៅ" },
    role: { en: "Hospital Nurse", kh: "គិលានុបដ្ឋាយិកា" },
    location: { en: "Kampong Cham Provincial Hospital", kh: "មន្ទីរពេទ្យខេត្តកំពង់ចាម" },
    age: 26,
    Avatar: Stethoscope,
    initials: "ស",
    cover: "from-rose-300 via-pink-300 to-fuchsia-300",
    accent: "text-rose-950",
    skill: "helping",
    morning: {
      time: "6:45 AM",
      en: "Shift change. The night nurse hands me a list of 18 patients and a quick story about each one. I check vitals, refill medication trays, and put on a calm face for the day.",
      kh: "ការផ្លាស់ប្ដូរវេន។ គិលានុបដ្ឋាកវេនយប់ប្រគល់ឲ្យខ្ញុំនូវបញ្ជីអ្នកជំងឺ ១៨ នាក់ និងរឿងខ្លីៗអំពីម្នាក់ៗ។ ខ្ញុំពិនិត្យសញ្ញាសំខាន់ បំពេញថាសថ្នាំ និងដាក់មុខស្ងប់ស្ងាត់សម្រាប់ថ្ងៃនេះ។",
    },
    tools: [
      { en: "Stethoscope",            kh: "ស្តេតូសកូប" },
      { en: "Blood-pressure cuff",    kh: "ឧបករណ៍វាស់សម្ពាធឈាម" },
      { en: "IV drip & syringes",     kh: "សេរ៉ូម និងស៊ីរ៉ាំង" },
      { en: "Patient chart tablet",   kh: "ថេបប្លេតកត់ត្រាអ្នកជំងឺ" },
      { en: "Compassion (her words)", kh: "ការមេត្តាករុណា (តាមពាក្យនាង)" },
    ],
    challenge: {
      en: "Comforting a frightened mother whose baby has dengue fever, while juggling four other patients. I have to be fast with my hands and gentle with my voice — at the same time.",
      kh: "ការកម្សាន្តចិត្តម្ដាយម្នាក់ដែលភ័យខ្លាច ដោយសារកូនរបស់នាងកើតគ្រុនឈាម ខណៈពេលដែលថែទាំអ្នកជំងឺបួននាក់ទៀតផងដែរ។ ខ្ញុំត្រូវរហ័សដោយដៃ និងទន់ភ្លន់ដោយសំឡេង — ក្នុងពេលតែមួយ។",
    },
    reward: {
      en: "When a patient who came in unable to walk leaves the hospital smiling, holding her grandchild — and remembers my name to say thank you. That's payday for the heart.",
      kh: "ពេលអ្នកជំងឺម្នាក់ដែលបានចូលមក ដោយដើរមិនបាន ចេញពីមន្ទីរពេទ្យទាំងញញឹម កាន់ចៅរបស់នាង — ហើយចងចាំឈ្មោះខ្ញុំដើម្បីនិយាយអរគុណ។ នោះគឺជាប្រាក់ខែសម្រាប់ដួងចិត្ត។",
    },
    pullQuote: {
      en: "Medicine heals the body. Listening heals the rest.",
      kh: "ឱសថព្យាបាលរាងកាយ។ ការស្តាប់ព្យាបាលផ្នែកដែលនៅសល់។",
    },
  },
];

export function DayInLifeGallery() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [openId, setOpenId] = useState<string | null>(null);
  const open = PROFILES.find(p => p.id === openId) ?? null;

  // Lock body scroll while modal is open + ESC to close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setOpenId(null); }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="rounded-3xl bg-white border-2 border-primary/20 shadow-sm overflow-hidden">
      {/* Magazine masthead */}
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-amber-50 via-white to-rose-50 border-b border-border">
        <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-rose-700/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <Clock className="w-3.5 h-3.5" />
          <span>{kh ? "ជីវិតប្រចាំថ្ងៃក្នុងអាជីព" : "A Day in the Life"}</span>
        </div>
        <h3 className={`font-display text-xl sm:text-2xl font-bold text-foreground mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? "ជួបជាមួយមនុស្សដែលធ្វើការងារទាំងនេះ" : "Meet the people behind the jobs"}
        </h3>
        <p className={`mt-1 text-sm text-muted-foreground max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "ប្រហែលជាឈ្មោះតួនាទីមួយ គ្មានន័យអ្វីច្រើនទេ។ ប៉ុន្តែប្រសិនបើអ្នកបានដឹងថា ថ្ងៃរបស់ពួកគេមានរូបរាងយ៉ាងណា — អ្នកអាចមើលឃើញខ្លួនឯងនៅទីនោះបាន។ ចុចលើប័ណ្ណណាមួយ ដើម្បីដើរមួយថ្ងៃក្នុងស្បែកជើងរបស់ពួកគេ។"
            : "A job title alone doesn't tell you much. But once you see what their day actually looks like, you can picture yourself there. Tap any card to walk a day in their shoes."}
        </p>
      </div>

      {/* Profile grid */}
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {PROFILES.map(p => (
          <ProfileCard key={p.id} profile={p} kh={kh} onOpen={() => setOpenId(p.id)} />
        ))}
      </div>

      {open && <ProfileModal profile={open} kh={kh} onClose={() => setOpenId(null)} />}
    </div>
  );
}

function ProfileCard({ profile: p, kh, onOpen }: { profile: Profile; kh: boolean; onOpen: () => void }) {
  const skill = SKILL_LABELS[p.skill];
  const Avatar = p.Avatar;
  return (
    <button
      onClick={onOpen}
      className="group text-left rounded-2xl border-2 border-border bg-white overflow-hidden hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2"
      aria-label={`${kh ? p.name.kh : p.name.en} — ${kh ? p.role.kh : p.role.en}`}
    >
      {/* Cover with portrait medallion */}
      <div className={`relative h-28 sm:h-32 bg-gradient-to-br ${p.cover} overflow-hidden`}>
        {/* subtle pattern */}
        <div className="absolute inset-0 opacity-15"
             style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className={`absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider ${p.accent} bg-white/70 backdrop-blur-sm rounded-full px-2 py-0.5 ${kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}>
          <MapPin className="w-3 h-3" />
          <span className="truncate max-w-[140px]">{kh ? p.location.kh : p.location.en}</span>
        </div>
        {/* Portrait medallion */}
        <div className="absolute -bottom-9 left-5 w-[72px] h-[72px] rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center overflow-hidden">
          <div className={`w-full h-full bg-gradient-to-br ${p.cover} flex items-center justify-center relative`}>
            <Avatar className={`w-7 h-7 ${p.accent} opacity-80`} />
            <span className={`absolute bottom-1 right-1 text-[10px] font-bold ${p.accent} bg-white/80 rounded px-1 ${kh ? "font-khmer" : ""}`}>
              {p.initials}
            </span>
          </div>
        </div>
      </div>

      {/* Identity strip */}
      <div className="pt-12 px-5 pb-5">
        <div className={`text-[11px] font-mono uppercase tracking-widest text-stone-500 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {kh ? "អ្នកជំនាញ" : "Profile"} · {p.age}
        </div>
        <h4 className={`font-display text-lg font-bold text-foreground mt-0.5 leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? p.name.kh : p.name.en}
        </h4>
        <p className={`text-sm text-stone-700 mt-0.5 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? p.role.kh : p.role.en}
        </p>

        {/* Skill match badge */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <SkillBadge skillKey={p.skill} kh={kh} asButton={false} />
          <span className={`inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:translate-x-0.5 transition-transform ${kh ? "font-khmer" : ""}`}>
            {kh ? "មើលថ្ងៃរបស់ពួកគេ" : "Read their day"} <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
        {/* echo English skill term in Khmer mode */}
        {kh && (
          <div className="mt-1 text-[10px] text-stone-500 font-mono uppercase tracking-wider">
            Requires: {skill.en}
          </div>
        )}
      </div>
    </button>
  );
}

function SkillBadge({ skillKey, kh, asButton = true }: { skillKey: SkillKey; kh: boolean; asButton?: boolean }) {
  const s = SKILL_LABELS[skillKey];
  const Icon = s.Icon;
  function jumpToMatrix() {
    const el = document.getElementById("career-discovery-matrix");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  const cls = `inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer hover:brightness-95 transition ${s.cls} ${kh ? "font-khmer" : ""}`;
  const content = (
    <>
      <Icon className="w-3 h-3" />
      <span>
        {kh ? "ត្រូវការ៖ " : "Requires: "}
        {kh ? s.kh : s.en}
      </span>
    </>
  );
  // When nested inside another <button> (the profile card), render as a span with role=button
  // to avoid invalid HTML (button-in-button) and hydration errors.
  if (!asButton) {
    return (
      <span
        role="button"
        tabIndex={0}
        className={cls}
        title={kh ? "បើកម៉ាទ្រីសស្វែងរកអាជីព" : "Open the Career Discovery Matrix"}
        onClick={(e) => { e.stopPropagation(); jumpToMatrix(); }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            jumpToMatrix();
          }
        }}
      >
        {content}
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); jumpToMatrix(); }}
      className={cls}
      title={kh ? "បើកម៉ាទ្រីសស្វែងរកអាជីព" : "Open the Career Discovery Matrix"}
    >
      {content}
    </button>
  );
}

function ProfileModal({ profile: p, kh, onClose }: { profile: Profile; kh: boolean; onClose: () => void }) {
  const Avatar = p.Avatar;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={kh ? p.name.kh : p.name.en}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-stone-300 shadow flex items-center justify-center transition"
          aria-label={kh ? "បិទ" : "Close"}
        >
          <X className="w-4 h-4 text-stone-700" />
        </button>

        {/* Magazine cover */}
        <div className={`relative h-44 sm:h-56 bg-gradient-to-br ${p.cover} overflow-hidden`}>
          <div className="absolute inset-0 opacity-15"
               style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
          <div className="absolute top-4 left-5 right-16 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest ${p.accent} bg-white/80 rounded px-2 py-0.5 ${kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}>
              {kh ? "ជីវិតប្រចាំថ្ងៃ" : "A Day in the Life"}
            </span>
            <span className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest ${p.accent} bg-white/80 rounded px-2 py-0.5 ${kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}>
              <MapPin className="w-3 h-3" /> {kh ? p.location.kh : p.location.en}
            </span>
          </div>
          {/* Portrait */}
          <div className="absolute -bottom-12 left-5 w-24 h-24 rounded-full border-4 border-white bg-white shadow-lg flex items-center justify-center overflow-hidden">
            <div className={`w-full h-full bg-gradient-to-br ${p.cover} flex items-center justify-center relative`}>
              <Avatar className={`w-10 h-10 ${p.accent} opacity-80`} />
              <span className={`absolute bottom-1 right-1 text-xs font-bold ${p.accent} bg-white/80 rounded px-1 ${kh ? "font-khmer" : ""}`}>
                {p.initials}
              </span>
            </div>
          </div>
        </div>

        {/* Title block */}
        <div className="px-5 sm:px-8 pt-16 pb-4 border-b border-border">
          <h2 className={`font-display text-2xl sm:text-3xl font-extrabold text-foreground leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
            {kh ? p.name.kh : p.name.en}
            <span className="text-stone-400 font-normal text-lg ml-2">· {p.age}</span>
          </h2>
          <p className={`text-base sm:text-lg text-stone-700 mt-1 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? p.role.kh : p.role.en}
            {kh && <span className="block text-xs text-stone-500 font-mono mt-1">{p.role.en}</span>}
          </p>
          <div className="mt-3">
            <SkillBadge skillKey={p.skill} kh={kh} />
          </div>
        </div>

        {/* Pull quote */}
        <div className={`px-5 sm:px-8 py-5 bg-gradient-to-r ${p.cover} bg-opacity-20 border-b border-border`}>
          <blockquote className={`relative font-display text-lg sm:text-xl font-bold ${p.accent} leading-snug ${kh ? "font-khmer leading-snug" : ""}`}>
            <span className="text-3xl leading-none mr-1 opacity-50">“</span>
            {kh ? p.pullQuote.kh : p.pullQuote.en}
            <span className="text-3xl leading-none ml-1 opacity-50">”</span>
          </blockquote>
          {kh && (
            <p className="mt-1 text-xs italic text-stone-700 opacity-80">{p.pullQuote.en}</p>
          )}
        </div>

        {/* Sections */}
        <div className="px-5 sm:px-8 py-6 space-y-6">
          <Section
            Icon={Sunrise}
            color="bg-amber-500"
            titleEn="The Morning Routine"
            titleKh="ទម្លាប់ពេលព្រឹក"
            kh={kh}
          >
            <div className={`inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-0.5 mb-2`}>
              <Clock className="w-3 h-3" /> {p.morning.time}
            </div>
            <p className={`text-sm sm:text-base text-stone-700 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : ""}`}>
              {kh ? p.morning.kh : p.morning.en}
            </p>
          </Section>

          <Section
            Icon={WrenchIcon}
            color="bg-stone-700"
            titleEn="Tools of the Trade"
            titleKh="ឧបករណ៍ប្រចាំការ"
            kh={kh}
          >
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {p.tools.map((tl, i) => (
                <li key={i} className={`flex items-start gap-2 text-sm text-stone-700 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2`}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-stone-500 flex-shrink-0" />
                  <span className="flex-1 leading-snug">
                    <span className={kh ? "font-khmer leading-loose font-medium" : "font-medium"}>
                      {kh ? tl.kh : tl.en}
                    </span>
                    {kh && <span className="block text-[11px] text-stone-500 mt-0.5">{tl.en}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Section
            Icon={AlertTriangle}
            color="bg-rose-600"
            titleEn="The Challenge"
            titleKh="បញ្ហាប្រឈម"
            kh={kh}
          >
            <p className={`text-sm sm:text-base text-stone-700 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : ""}`}>
              {kh ? p.challenge.kh : p.challenge.en}
            </p>
          </Section>

          <Section
            Icon={Heart}
            color="bg-emerald-600"
            titleEn="The Reward"
            titleKh="អ្វីដែលធ្វើឲ្យពួកគេស្រឡាញ់ការងារ"
            kh={kh}
          >
            <p className={`text-sm sm:text-base text-stone-700 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : ""}`}>
              {kh ? p.reward.kh : p.reward.en}
            </p>
          </Section>
        </div>

        {/* Footer CTA */}
        <div className="px-5 sm:px-8 py-5 border-t border-border bg-stone-50 flex flex-wrap items-center justify-between gap-3">
          <p className={`text-xs text-stone-600 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "តើអ្នកគិតថា ខ្លួនអ្នកអាចសាកល្បងទម្លាប់នេះបានទេ?"
              : "Can you picture yourself in this routine?"}
          </p>
          <button
            onClick={() => {
              onClose();
              setTimeout(() => {
                document.getElementById("career-discovery-matrix")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 250);
            }}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 active:scale-95 transition ${kh ? "font-khmer" : ""}`}
          >
            <Sparkles className="w-4 h-4" />
            {kh ? "ស្វែងរកអាជីពរបស់ខ្ញុំ" : "Find my career match"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({
  Icon, color, titleEn, titleKh, kh, children,
}: {
  Icon: ComponentType<{ className?: string }>;
  color: string;
  titleEn: string;
  titleKh: string;
  kh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-8 h-8 rounded-xl ${color} flex items-center justify-center text-white flex-shrink-0`}>
          <Icon className="w-4 h-4" />
        </div>
        <h3 className={`font-display text-base sm:text-lg font-bold text-foreground ${kh ? "font-khmer text-lg leading-snug" : ""}`}>
          {kh ? titleKh : titleEn}
          {kh && <span className="ml-2 text-xs text-stone-500 font-sans font-normal">({titleEn})</span>}
        </h3>
      </div>
      <div className="pl-0 sm:pl-10">{children}</div>
    </section>
  );
}
