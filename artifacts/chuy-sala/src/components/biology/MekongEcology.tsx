import { Fish, TreePine, Droplets, Sun, Bird, User } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

const FACTS = [
  { en: "Tonle Sap reverses its flow twice a year — the only river in the world that does so.",
    kh: "ទន្លេសាបបង្វិលលំហូររបស់វាពីរដងក្នុងមួយឆ្នាំ — ជាទន្លេតែមួយគត់នៅលើពិភពលោកដែលធ្វើដូច្នេះ។" },
  { en: "It is one of the most productive freshwater fisheries on Earth, feeding millions of Cambodians.",
    kh: "វាគឺជាការនេសាទទឹកសាបដែលផ្តល់ផលច្រើនបំផុតមួយនៅលើផែនដី ផ្តល់អាហារដល់ប្រជាជនកម្ពុជារាប់លាននាក់។" },
  { en: "The Mekong is home to giant catfish, freshwater dolphins and hundreds of other fish species.",
    kh: "ទន្លេមេគង្គគឺជាផ្ទះរបស់ត្រីអណ្តើកយក្ស ផ្សោតទឹកសាប និងត្រីរាប់រយប្រភេទផ្សេងៗទៀត។" },
];

type Node = {
  id: string;
  letter: string;
  label: { en: string; kh: string };
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
  x: number; y: number;
};

const NODES: Node[] = [
  { id: "sun",       letter: "☀", label: { en: "Sun",                          kh: "ព្រះអាទិត្យ" },        Icon: Sun,      color: "#f59e0b", x: 50, y: 30  },
  { id: "plants",    letter: "P", label: { en: "Aquatic plants & algae",       kh: "រុក្ខជាតិទឹក និងសារ៉ាយ" }, Icon: TreePine, color: "#16a34a", x: 50, y: 130 },
  { id: "smallFish", letter: "S", label: { en: "Small fish (trey riel)",        kh: "ត្រីតូច (ត្រីរៀល)" },     Icon: Fish,     color: "#0ea5e9", x: 25, y: 230 },
  { id: "insects",   letter: "I", label: { en: "Insects & shrimp",              kh: "សត្វល្អិត និងបង្គា" },    Icon: Droplets, color: "#0891b2", x: 75, y: 230 },
  { id: "bigFish",   letter: "B", label: { en: "Big fish (catfish, snakehead)", kh: "ត្រីធំ (ត្រីអណ្តើក, ផ្ទក់)" }, Icon: Fish, color: "#1e40af", x: 30, y: 330 },
  { id: "birds",     letter: "W", label: { en: "Water birds",                   kh: "បក្សីទឹក" },             Icon: Bird,     color: "#b91c1c", x: 70, y: 330 },
  { id: "humans",    letter: "H", label: { en: "Cambodian families",            kh: "គ្រួសារកម្ពុជា" },        Icon: User,     color: "#7c2d12", x: 50, y: 430 },
];

const EDGES: [string, string][] = [
  ["sun", "plants"],
  ["plants", "smallFish"],
  ["plants", "insects"],
  ["smallFish", "bigFish"],
  ["insects", "smallFish"],
  ["insects", "birds"],
  ["bigFish", "humans"],
  ["smallFish", "humans"],
  ["birds", "humans"],
];

export function MekongEcology() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="rounded-2xl bg-white border border-emerald-200/70 shadow-sm overflow-hidden">
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-sky-50 via-emerald-50 to-white border-b border-emerald-200/70">
        <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-sky-700/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <Droplets className="w-3.5 h-3.5" />
          <span>{kh ? "បរិស្ថានទន្លេមេគង្គ និងទន្លេសាប" : "Mekong & Tonle Sap Ecosystem"}</span>
        </div>
        <h3 className={`font-display text-xl sm:text-2xl font-bold text-stone-900 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? "ទន្លេធំ ទន្លេសាប — បេះដូងជីវិតរបស់កម្ពុជា" : "The Mighty Mekong — Cambodia's Beating Heart"}
        </h3>
        <p className={`mt-1 text-sm text-stone-600 max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "ទន្លេមេគង្គ និងទន្លេសាប គឺជាប្រព័ន្ធអេកូទឹកសាបដ៏សម្បូរបំផុតមួយនៅលើផែនដី។ តោះមើលថាតើថាមពលហូរយ៉ាងដូចម្ដេចតាមរយៈជីវិត — ចាប់ពីព្រះអាទិត្យដល់តុអាហាររបស់អ្នក។"
            : "The Mekong River and Tonle Sap form one of the richest freshwater ecosystems on Earth. Let's see how energy flows through life — from the Sun all the way to your table."}
        </p>
      </div>

      <div className="p-5 sm:p-7 grid lg:grid-cols-[1fr,1.2fr] gap-6">
        <div className="space-y-3">
          <div className={`text-[11px] font-mono uppercase tracking-widest text-emerald-700/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "ការពិតគួរឱ្យចាប់អារម្មណ៍" : "Did you know?"}
          </div>
          {FACTS.map((f, i) => (
            <div key={i} className="rounded-lg bg-gradient-to-br from-sky-50 to-emerald-50 border border-sky-200 p-3">
              <p className={`text-sm text-stone-700 ${kh ? "font-khmer leading-loose" : ""}`}>{kh ? f.kh : f.en}</p>
            </div>
          ))}
          <div className={`mt-4 p-4 rounded-xl bg-emerald-700 text-white ${kh ? "font-khmer leading-loose" : ""}`}>
            <strong>{kh ? "ហេតុអ្វីបានជាសំខាន់៖" : "Why it matters:"}</strong>{" "}
            {kh
              ? "ការការពារទន្លេមេគង្គមិនមែនគ្រាន់តែជាបញ្ហាបរិស្ថានទេ — វាជាបញ្ហានៃសុវត្ថិភាពអាហារសម្រាប់គ្រួសារកម្ពុជារាប់លាននាក់។"
              : "Protecting the Mekong isn't just an environmental issue — it's a matter of food security for millions of Cambodian families."}
          </div>
        </div>

        <div>
          <div className={`text-[11px] font-mono uppercase tracking-widest text-stone-500 mb-2 text-center ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "បណ្តាញអាហារ — ការហូរនៃថាមពល" : "Food Web — Energy Flow"}
          </div>
          <div className="rounded-xl bg-gradient-to-b from-sky-50 via-white to-emerald-50 border border-stone-200 p-3">
            <svg viewBox="0 0 100 470" className="w-full h-auto" style={{ maxHeight: 480 }} role="img" aria-label={kh ? "ដ្យាក្រាមបណ្តាញអាហារ" : "Food web diagram"}>
              <defs>
                <marker id="bio-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M0,0 L0,10 L10,5 z" fill="#94a3b8" />
                </marker>
              </defs>
              {EDGES.map(([a, b], i) => {
                const A = NODES.find(n => n.id === a)!;
                const B = NODES.find(n => n.id === b)!;
                return (
                  <line key={i}
                    x1={A.x} y1={A.y + 9}
                    x2={B.x} y2={B.y - 9}
                    stroke="#94a3b8" strokeWidth={0.8} strokeDasharray="2 2"
                    markerEnd="url(#bio-arrow)" />
                );
              })}
              {NODES.map(n => (
                <g key={n.id} transform={`translate(${n.x},${n.y})`}>
                  <circle r={9} fill={n.color} stroke="white" strokeWidth={1.5} />
                  <text y={3.5} textAnchor="middle" fontSize={9} fontWeight="bold" fill="white">{n.letter}</text>
                </g>
              ))}
            </svg>
            <div className="mt-3 grid grid-cols-1 gap-1.5 text-xs">
              {NODES.map(n => {
                const Icon = n.Icon;
                return (
                  <div key={n.id} className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white flex-shrink-0" style={{ background: n.color }}>
                      <Icon className="w-3 h-3" />
                    </span>
                    <span className="font-mono text-[10px] text-stone-400">{n.letter}</span>
                    <span className={`text-stone-700 ${kh ? "font-khmer" : ""}`}>{kh ? n.label.kh : n.label.en}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className={`mt-3 text-xs text-stone-500 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "ព្រួញនីមួយៗមានន័យថា 'ត្រូវបានស៊ីដោយ' — ឧ. រុក្ខជាតិទឹក → ត្រីតូច មានន័យថា ត្រីតូចស៊ីរុក្ខជាតិទឹក។ ថាមពលហូរឡើងលើ ប៉ុន្តែភាគច្រើនត្រូវបាត់បង់នៅកម្រិតនីមួយៗ។"
              : "Each arrow means 'is eaten by' — e.g. plants → small fish means small fish eat the plants. Energy flows upward, but most of it is lost at every level."}
          </p>
        </div>
      </div>
    </div>
  );
}
