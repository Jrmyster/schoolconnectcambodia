import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import {
  ShieldCheck,
  KeyRound,
  Mail,
  Lock,
  Inbox,
  BookOpenCheck,
  Users,
  Bitcoin,
  Sigma,
  Network,
  Sparkles,
  AlertTriangle,
  Check,
  X,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

/* ──────────────────────────────────────────────────────────────────────────
 * The Architecture of Trust — Cryptography & Blockchain
 * ស្ថាបត្យកម្មនៃទំនុកចិត្ត — កូដនីយកម្ម និងប្លុកឆេន
 *
 * A self-contained lesson module rendered inside HowComputersWorkPage.
 * Three distinct cards (Cryptography → Blockchain → Bitcoin) tell one
 * continuous story: how computers create trust between strangers without
 * a middleman.
 *
 * Aesthetic: cyber-security control-panel.
 *   • base:    deep charcoal slate-950 / black
 *   • neon:    emerald-400 (the "secure" channel)
 *   • gold:    amber-400  (the "private / valuable" channel)
 *   • accents: monospace labels, scanline grid, subtle glow shadows
 * ──────────────────────────────────────────────────────────────────────── */

// Charcoal scanline background applied to the outer module shell.
const CHARCOAL_GRID: CSSProperties = {
  backgroundColor: "#020617",
  backgroundImage:
    "linear-gradient(rgba(16, 185, 129, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.06) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

const NEON_GLOW: CSSProperties = {
  boxShadow:
    "0 0 0 1px rgba(16,185,129,0.35), 0 0 24px -6px rgba(16,185,129,0.55), inset 0 0 24px -10px rgba(16,185,129,0.35)",
};

const GOLD_GLOW: CSSProperties = {
  boxShadow:
    "0 0 0 1px rgba(251,191,36,0.40), 0 0 24px -6px rgba(251,191,36,0.55), inset 0 0 24px -10px rgba(251,191,36,0.35)",
};

export function TrustArchitectureModule() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div
      data-testid="module-trust-architecture"
      className="rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl"
      style={CHARCOAL_GRID}
    >
      {/* ── Module hero ──────────────────────────────────────────────── */}
      <div className="relative px-5 sm:px-7 py-6 sm:py-7 bg-gradient-to-br from-black via-slate-950 to-emerald-950/40 border-b-2 border-emerald-500/30">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16,185,129,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.35) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <ShieldCheck
          className="absolute -right-4 -top-4 w-32 h-32 sm:w-40 sm:h-40 text-emerald-400/10 rotate-6 pointer-events-none"
          strokeWidth={1.2}
        />
        <div className="relative">
          <div
            className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-300/90 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{kh ? "សុវត្ថិភាពតាមអ៊ីនធឺណិត" : "Cyber Security"}</span>
            <span className="opacity-50">/</span>
            <span>{kh ? "ទំនុកចិត្តនៃកុំព្យូទ័រ" : "Computer Trust"}</span>
          </div>
          <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-white leading-tight">
            <span className="block">How do strangers trust each other on the internet?</span>
            <span className="block font-khmer text-base sm:text-lg font-bold text-emerald-200 mt-1 leading-relaxed">
              តើមនុស្សដែលមិនស្គាល់គ្នាជឿទុកចិត្តគ្នាតាមរយៈអ៊ីនធឺណិតយ៉ាងដូចម្ដេច?
            </span>
          </h3>
          <p className="mt-2 text-sm text-slate-300/90 max-w-2xl leading-relaxed">
            Three ideas, stacked on top of each other, build an entire system of digital trust —
            no banks, no judges, just math.
          </p>
          <p className="mt-1 text-sm text-emerald-200/70 max-w-2xl leading-relaxed font-khmer">
            គំនិតបីយ៉ាង ដាក់លើគ្នា បង្កើតបានជាប្រព័ន្ធទំនុកចិត្តឌីជីថលទាំងមូល — គ្មានធនាគារ គ្មានចៅក្រម មានតែគណិតវិទ្យា។
          </p>
        </div>
      </div>

      {/* ── 3 stacked cards ──────────────────────────────────────────── */}
      <div className="p-5 sm:p-7 space-y-6 sm:space-y-7">
        <CryptographyCard kh={kh} />
        <BlockchainCard kh={kh} />
        <BitcoinCard kh={kh} />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * CARD 1 — Cryptography: The Digital Lockbox
 * កូដនីយកម្ម - ប្រអប់សោឌីជីថល
 * ──────────────────────────────────────────────────────────────────────── */
function CryptographyCard({ kh }: { kh: boolean }) {
  return (
    <article
      data-testid="card-crypto"
      className="rounded-2xl bg-slate-950/80 border border-emerald-500/40 overflow-hidden"
      style={NEON_GLOW}
    >
      <CardHeader
        index="01"
        kicker={kh ? "ផ្នែកទី ១ · កូដនីយកម្ម" : "Section 1 · Cryptography"}
        titleEn="The Digital Lockbox"
        titleKh="ប្រអប់សោឌីជីថល"
        Icon={KeyRound}
        accent="emerald"
      />

      <div className="p-5 sm:p-6 space-y-5">
        <p className="text-sm sm:text-base text-slate-200/95 leading-relaxed">
          Every secret message you send across the internet — your password, your bank login,
          your private chat — passes through dozens of computers you've never met. So how does
          the message stay secret? With a clever pair of keys.
        </p>
        <p className="text-sm text-emerald-200/80 leading-loose font-khmer">
          រាល់សារសម្ងាត់ដែលអ្នកផ្ញើតាមអ៊ីនធឺណិត — លេខសម្ងាត់ ការចូលគណនីធនាគារ ការសន្ទនាឯកជន — តែងតែឆ្លងកាត់កុំព្យូទ័ររាប់សិបដែលអ្នកមិនធ្លាប់ស្គាល់។ ដូច្នេះតើសារនោះនៅសម្ងាត់ដោយរបៀបណា? ដោយសារសោពីរយ៉ាងឆ្លាតវៃ។
        </p>

        {/* Mailbox visual — single object with TWO different operations */}
        <MailboxDiagram kh={kh} />

        {/* Two key cards side-by-side */}
        <div className="grid md:grid-cols-2 gap-4">
          <KeyPanel
            tone="emerald"
            badge={kh ? "សោសាធារណៈ" : "PUBLIC KEY"}
            badgeKh="សោសាធារណៈ"
            title={kh ? "សោសាធារណៈ" : "The Public Key"}
            subtitle={kh ? "Public Key" : "សោសាធារណៈ"}
            Icon={Inbox}
            analogyEn="Like the slot at the top of a mailbox. ANYONE can drop a secret message in."
            analogyKh="ដូចជារន្ធនៅផ្នែកខាងលើនៃប្រអប់សំបុត្រ។ អ្នកណាក៏ដោយ អាចទម្លាក់សារសម្ងាត់ចូលបាន។"
            ruleEn="Share it openly. Post it on a billboard. It can only RECEIVE."
            ruleKh="ចែករំលែកដោយបើកចំហ។ ដាក់នៅលើផ្ទាំងផ្សាយ។ វាអាចតែ​ ទទួល បានប៉ុណ្ណោះ។"
          />
          <KeyPanel
            tone="amber"
            badge={kh ? "សោឯកជន" : "PRIVATE KEY"}
            badgeKh="សោឯកជន"
            title={kh ? "សោឯកជន" : "The Private Key"}
            subtitle={kh ? "Private Key" : "សោឯកជន"}
            Icon={KeyRound}
            analogyEn="The physical key that opens the BOTTOM of the mailbox. Only the owner has it."
            analogyKh="សោរូបវ័ន្តដែលបើក​ ផ្នែកខាងក្រោម នៃប្រអប់សំបុត្រ។ មានតែម្ចាស់ប៉ុណ្ណោះដែលមានវា។"
            ruleEn="NEVER share it. NEVER lose it. It is the only way to OPEN."
            ruleKh="កុំចែករំលែកវាដាច់ខាត។ កុំធ្វើបាត់វាដាច់ខាត។ វាគឺជាមធ្យោបាយតែមួយគត់ដើម្បី បើក។"
          />
        </div>

        {/* Warning footer */}
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-amber-200">
              <span className="font-bold">If you lose your private key, your messages are locked forever.</span>{" "}
              No one — not the company, not the government — can open them. That is the price of true secrecy.
            </p>
            <p className="mt-1 text-xs text-amber-200/80 font-khmer leading-loose">
              <span className="font-bold">បើអ្នកធ្វើបាត់សោឯកជនរបស់អ្នក សារទាំងអស់ត្រូវបានចាក់សោជារៀងរហូត។</span>{" "}
              គ្មានអ្នកណា — ទាំងក្រុមហ៊ុន ទាំងរដ្ឋាភិបាល — អាចបើកវាបានទេ។ នោះជាតម្លៃនៃការសម្ងាត់ពិត។
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/** A schematic mailbox illustrating the slot (anyone) vs the bottom door (owner only). */
function MailboxDiagram({ kh }: { kh: boolean }) {
  return (
    <div
      data-testid="mailbox-diagram"
      className="rounded-xl bg-black/60 border border-emerald-500/30 p-4 sm:p-5"
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
        {/* Sender */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-300 mb-1">
            <Mail className="w-5 h-5" />
          </div>
          <div className={`text-[10px] font-mono uppercase tracking-widest text-emerald-300/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "អ្នកផ្ញើ" : "Sender"}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {kh ? "ដាក់សារតាមរន្ធខាងលើ" : "drops in via top slot"}
          </div>
        </div>

        {/* Mailbox SVG */}
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 120 160" className="w-24 h-32 sm:w-28 sm:h-36" aria-hidden="true">
            {/* Top slot row + label */}
            <text x="60" y="10" textAnchor="middle" fontSize="9" fill="rgb(110,231,183)" fontFamily="monospace">PUBLIC SLOT</text>
            {/* Mailbox body */}
            <rect x="20" y="20" width="80" height="120" rx="8" fill="#0f172a" stroke="rgb(52,211,153)" strokeWidth="2" />
            {/* Top slot */}
            <rect x="32" y="32" width="56" height="6" rx="2" fill="rgb(16,185,129)" />
            {/* Glow inside slot */}
            <rect x="34" y="33" width="52" height="3" rx="1.5" fill="rgb(110,231,183)" opacity="0.7" />
            {/* Body grid lines for depth */}
            <line x1="20" y1="60" x2="100" y2="60" stroke="rgb(20,184,166)" strokeWidth="0.5" opacity="0.3" />
            <line x1="20" y1="90" x2="100" y2="90" stroke="rgb(20,184,166)" strokeWidth="0.5" opacity="0.3" />
            {/* Bottom door */}
            <rect x="28" y="105" width="64" height="28" rx="3" fill="#1e293b" stroke="rgb(251,191,36)" strokeWidth="2" strokeDasharray="3 2" />
            {/* Lock keyhole */}
            <circle cx="60" cy="119" r="3.5" fill="rgb(251,191,36)" />
            <rect x="58.5" y="120" width="3" height="6" fill="rgb(251,191,36)" />
            <text x="60" y="153" textAnchor="middle" fontSize="9" fill="rgb(252,211,77)" fontFamily="monospace">PRIVATE DOOR</text>
          </svg>
        </div>

        {/* Receiver */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-1">
            <KeyRound className="w-5 h-5" />
          </div>
          <div className={`text-[10px] font-mono uppercase tracking-widest text-amber-300/85 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "ម្ចាស់" : "Owner"}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {kh ? "បើកសារតាមផ្នែកខាងក្រោម" : "opens via bottom door"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * CARD 2 — Blockchain: The Village Notebook
 * ប្លុកឆេន - សៀវភៅសរសេរក្នុងភូមិ
 * ──────────────────────────────────────────────────────────────────────── */
type Villager = {
  id: number;
  name: string;
  isLiar?: boolean;
};

const VILLAGERS: Villager[] = [
  { id: 1, name: "Sok" },
  { id: 2, name: "Dara" },
  { id: 3, name: "Pisey" },
  { id: 4, name: "Bopha" },
  { id: 5, name: "Vannak", isLiar: true },
  { id: 6, name: "Channary" },
];

function BlockchainCard({ kh }: { kh: boolean }) {
  // Each villager keeps a tiny ledger of "Sok → Dara: 1 coin" entries.
  // Pressing "Send" appends to every villager's notebook in sync.
  // Pressing "Vannak Lies" wipes the latest entry from villager #5 only —
  // and the rest of the village immediately spots the mismatch.
  const [ledgers, setLedgers] = useState<string[][]>(
    VILLAGERS.map(() => []),
  );
  const [announceFlash, setAnnounceFlash] = useState(0);
  const sendCounter = useRef(0);

  const handleSend = () => {
    sendCounter.current += 1;
    const sender = VILLAGERS[sendCounter.current % 4];
    const receiver = VILLAGERS[(sendCounter.current + 2) % 4];
    const entry = `${sender.name} → ${receiver.name}: 1 ₿`;
    setLedgers((prev) => prev.map((l) => [...l, entry]));
    setAnnounceFlash((n) => n + 1);
  };

  const handleLiar = () => {
    // Pure mutation — the "lie rejected" banner is derived from the
    // ledgers themselves below, so no separate flag needs flipping.
    // If the liar's notebook is already empty there is nothing to erase
    // and the state is left untouched (no false accusation).
    setLedgers((prev) => {
      const liarIdx = VILLAGERS.findIndex((v) => v.isLiar);
      if (liarIdx === -1) return prev;
      const liarLedger = prev[liarIdx];
      if (liarLedger.length === 0) return prev;
      const next = prev.slice();
      next[liarIdx] = liarLedger.slice(0, -1);
      return next;
    });
  };

  const handleReset = () => {
    setLedgers(VILLAGERS.map(() => []));
    sendCounter.current = 0;
  };

  // After 1.2s the announce-flash badge fades.
  useEffect(() => {
    if (announceFlash === 0) return;
    const t = setTimeout(() => setAnnounceFlash(0), 1200);
    return () => clearTimeout(t);
  }, [announceFlash]);

  // ── Derived consensus state ──────────────────────────────────────────
  // The success / failure banner below is computed PURELY from the
  // ledgers, not from a stale boolean flag. This keeps the UI honest in
  // every interleaving (e.g. Send → Liar → Send still correctly shows
  // Vannak out-of-sync, because his ledger is one entry shorter than
  // everyone else's).
  const lengths = ledgers.map((l) => l.length);
  const majority = lengths.reduce((acc, n) => {
    acc[n] = (acc[n] ?? 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  const consensusLen = Number(
    Object.entries(majority).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0,
  );
  const allInSync = lengths.every((n) => n === consensusLen);
  const hasAnyEntries = consensusLen > 0;

  return (
    <article
      data-testid="card-blockchain"
      className="rounded-2xl bg-slate-950/80 border border-emerald-500/40 overflow-hidden"
      style={NEON_GLOW}
    >
      <CardHeader
        index="02"
        kicker={kh ? "ផ្នែកទី ២ · ប្លុកឆេន" : "Section 2 · The Blockchain"}
        titleEn="The Village Notebook"
        titleKh="សៀវភៅសរសេរក្នុងភូមិ"
        Icon={BookOpenCheck}
        accent="emerald"
      />

      <div className="p-5 sm:p-6 space-y-5">
        <p className="text-sm sm:text-base text-slate-200/95 leading-relaxed">
          Today we trust ONE bank to remember everyone's money. But what if there were no bank?
          Imagine a small village where{" "}
          <span className="font-bold text-emerald-300">every single person carries the SAME notebook</span>.
        </p>
        <p className="text-sm text-emerald-200/80 leading-loose font-khmer">
          សព្វថ្ងៃនេះយើងជឿជាក់លើធនាគារតែ​ មួយ ដើម្បីចងចាំប្រាក់របស់មនុស្សគ្រប់គ្នា។ ប៉ុន្តែបើគ្មានធនាគារ? ស្រមៃថាមានភូមិតូចមួយដែល{" "}
          <span className="font-bold text-emerald-300">មនុស្សគ្រប់រូបកាន់សៀវភៅដូចគ្នា</span>។
        </p>

        <ol className="space-y-2 text-sm text-slate-200/90">
          <RuleStep n={1} en="Sok wants to give Dara 1 coin." kh="សុខ ចង់ឱ្យ ដារ៉ា ១ កាក់។" />
          <RuleStep n={2} en="Sok shouts it loudly so the WHOLE village hears." kh="សុខ ស្រែកឱ្យឮៗ ដូច្នេះភូមិទាំងមូលឮ។" />
          <RuleStep n={3} en="Every villager writes the same line in their notebook at the same time." kh="អ្នកភូមិគ្រប់រូបសរសេរបន្ទាត់ដូចគ្នា ក្នុងសៀវភៅរបស់ពួកគេក្នុងពេលតែមួយ។" />
          <RuleStep n={4} en="If anyone lies later, the rest of the village checks their notebooks and rejects the lie." kh="បើនរណាម្នាក់កុហកពេលក្រោយ អ្នកភូមិដទៃនឹងពិនិត្យសៀវភៅរបស់ខ្លួន ហើយបដិសេធ​ការកុហកនោះ។" />
        </ol>

        {/* Interactive village demo */}
        <div
          data-testid="village-demo"
          className="rounded-xl bg-black/60 border border-emerald-500/30 p-4 sm:p-5"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              <Users className="w-3.5 h-3.5" />
              <span>{kh ? "សៀវភៅភូមិ" : "Village Ledger"}</span>
              {announceFlash > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 animate-pulse">
                  {kh ? "📣 ការប្រកាស!" : "📣 ANNOUNCED!"}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleSend}
                data-testid="btn-village-send"
                className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-md bg-emerald-500/15 border border-emerald-400/50 text-emerald-200 hover:bg-emerald-500/25 active:scale-95 transition-all"
              >
                {kh ? "+ ផ្ញើកាក់" : "+ Send a Coin"}
              </button>
              <button
                type="button"
                onClick={handleLiar}
                data-testid="btn-village-liar"
                className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-md bg-rose-500/10 border border-rose-400/50 text-rose-200 hover:bg-rose-500/20 active:scale-95 transition-all"
              >
                {kh ? "Vannak កុហក" : "Vannak Lies"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                data-testid="btn-village-reset"
                className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-md bg-slate-700/40 border border-slate-500/40 text-slate-300 hover:bg-slate-700/60 active:scale-95 transition-all"
              >
                {kh ? "កំណត់ឡើងវិញ" : "Reset"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {VILLAGERS.map((v, i) => {
              const ledger = ledgers[i];
              const inSync = ledger.length === consensusLen;
              return (
                <VillagerCard
                  key={v.id}
                  name={v.name}
                  isLiar={!!v.isLiar}
                  ledger={ledger}
                  inSync={inSync}
                />
              );
            })}
          </div>

          {hasAnyEntries && !allInSync && (
            <div
              data-testid="liar-caught-banner"
              className="mt-4 rounded-lg border border-rose-400/50 bg-rose-500/10 p-3 flex items-start gap-3"
            >
              <X className="w-5 h-5 text-rose-300 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-rose-100 font-bold">
                  Vannak's notebook doesn't match the village. The lie is rejected.
                </p>
                <p className="mt-0.5 text-xs text-rose-200/85 font-khmer leading-loose">
                  សៀវភៅរបស់ Vannak មិនត្រូវនឹងភូមិទេ។ ការកុហកត្រូវបានបដិសេធ។
                </p>
              </div>
            </div>
          )}

          {hasAnyEntries && allInSync && (
            <div className="mt-4 rounded-lg border border-emerald-400/40 bg-emerald-500/5 p-3 flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-emerald-100 font-bold">
                  All {VILLAGERS.length} notebooks agree. The village trusts the ledger.
                </p>
                <p className="mt-0.5 text-xs text-emerald-200/85 font-khmer leading-loose">
                  សៀវភៅទាំង​ {VILLAGERS.length} យល់ស្របគ្នា។ ភូមិទុកចិត្តលើការកត់ត្រា។
                </p>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed">
          That shared, copied-everywhere notebook is what computer scientists call a{" "}
          <span className="font-bold text-emerald-300">decentralized ledger</span> — a
          blockchain. To rewrite history, a liar would have to break into{" "}
          <span className="font-bold text-emerald-300">more than half the notebooks at once</span>,
          which is essentially impossible.
        </p>
        <p className="text-xs sm:text-sm text-emerald-200/70 leading-loose font-khmer">
          សៀវភៅដែលចែករំលែក និងចម្លងគ្រប់ទីកន្លែង គឺជាអ្វីដែលអ្នកវិទ្យាសាស្ត្រកុំព្យូទ័រហៅថា{" "}
          <span className="font-bold text-emerald-300">ការកត់ត្រាបែងចែក</span> — ប្លុកឆេន។ ដើម្បីសរសេរប្រវត្តិសាស្ត្រឡើងវិញ អ្នកកុហកត្រូវបំបែក​​​{" "}
          <span className="font-bold text-emerald-300">សៀវភៅច្រើនជាងពាក់កណ្ដាលក្នុងពេលតែមួយ</span>, ដែលជារឿងស្ទើរតែមិនអាចទៅរួច។
        </p>
      </div>
    </article>
  );
}

function VillagerCard({
  name,
  isLiar,
  ledger,
  inSync,
}: {
  name: string;
  isLiar: boolean;
  ledger: string[];
  inSync: boolean;
}) {
  const tone = !inSync
    ? "border-rose-400/60 bg-rose-950/30"
    : "border-emerald-500/30 bg-slate-900/70";
  return (
    <div
      data-testid={`villager-${name.toLowerCase()}`}
      className={`rounded-lg border ${tone} p-2.5 transition-colors`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-200">
          <Users className="w-3 h-3" />
          <span className="text-white">{name}</span>
          {isLiar && <span className="text-rose-300/80 text-[10px]">(?)</span>}
        </div>
        {!inSync ? (
          <X className="w-4 h-4 text-rose-300" data-testid="badge-out-of-sync" />
        ) : (
          <Check className="w-4 h-4 text-emerald-300" data-testid="badge-in-sync" />
        )}
      </div>
      <ul className="mt-2 space-y-0.5 text-[10px] font-mono text-emerald-100/80 min-h-[36px] leading-snug">
        {ledger.length === 0 ? (
          <li className="text-slate-500 italic">empty notebook</li>
        ) : (
          ledger.slice(-3).map((line, i) => <li key={i}>· {line}</li>)
        )}
      </ul>
    </div>
  );
}

function RuleStep({ n, en, kh }: { n: number; en: string; kh: string }) {
  return (
    <li className="flex items-start gap-2">
      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 text-[10px] font-mono flex items-center justify-center mt-0.5">
        {n}
      </span>
      <span>
        <span className="block">{en}</span>
        <span className="block text-xs text-emerald-200/70 font-khmer leading-loose">{kh}</span>
      </span>
    </li>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * CARD 3 — Bitcoin & Digital Currency
 * រូបិយប័ណ្ណឌីជីថល និង Bitcoin
 * ──────────────────────────────────────────────────────────────────────── */
function BitcoinCard({ kh }: { kh: boolean }) {
  return (
    <article
      data-testid="card-bitcoin"
      className="rounded-2xl bg-slate-950/80 border border-amber-500/40 overflow-hidden"
      style={GOLD_GLOW}
    >
      <CardHeader
        index="03"
        kicker={kh ? "ផ្នែកទី ៣ · រូបិយប័ណ្ណឌីជីថល" : "Section 3 · Digital Currency"}
        titleEn="Bitcoin & Digital Currency"
        titleKh="រូបិយប័ណ្ណឌីជីថល និង Bitcoin"
        Icon={Bitcoin}
        accent="amber"
      />

      <div className="p-5 sm:p-6 space-y-5">
        <p className="text-sm sm:text-base text-slate-200/95 leading-relaxed">
          Now stack the two ideas together. Bitcoin is{" "}
          <span className="font-bold text-amber-300">not</span> a coin you can hold. There is no
          gold in a vault. Bitcoin is{" "}
          <span className="font-bold text-amber-300">just the math from the previous two cards</span>,
          combined.
        </p>
        <p className="text-sm text-amber-200/80 leading-loose font-khmer">
          ឥឡូវនេះ ដាក់គំនិតពីរនោះបញ្ចូលគ្នា។ Bitcoin{" "}
          <span className="font-bold text-amber-300">មិន</span> មែនជាកាក់ដែលអ្នកអាចកាន់បានទេ។ គ្មានមាសនៅក្នុងហិបទេ។ Bitcoin គឺ​​{" "}
          <span className="font-bold text-amber-300">គ្រាន់តែជាគណិតវិទ្យាពីពីរផ្នែកមុន</span>, បញ្ចូលគ្នា។
        </p>

        {/* The "equation" — Crypto + Blockchain = Bitcoin */}
        <div
          data-testid="bitcoin-equation"
          className="rounded-xl bg-black/60 border border-amber-500/30 p-4 sm:p-5"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            <EquationTile
              tone="emerald"
              Icon={KeyRound}
              labelEn="Cryptography"
              labelKh="កូដនីយកម្ម"
              note={kh ? "បញ្ជាក់ ម្ចាស់" : "proves WHO owns it"}
            />
            <Sigma className="w-6 h-6 text-amber-300/80" aria-hidden="true" />
            <EquationTile
              tone="emerald"
              Icon={Network}
              labelEn="Blockchain"
              labelKh="ប្លុកឆេន"
              note={kh ? "បញ្ជាក់ ចំនួន" : "proves HOW MUCH"}
            />
            <Sigma className="w-6 h-6 text-amber-300/80 rotate-90" aria-hidden="true" />
            <EquationTile
              tone="amber"
              Icon={Bitcoin}
              labelEn="Bitcoin"
              labelKh="Bitcoin"
              note={kh ? "ប្រាក់ឌីជីថលសុទ្ធសាធ" : "pure digital money"}
              big
            />
          </div>
        </div>

        {/* Two-column "what each piece does" */}
        <div className="grid md:grid-cols-2 gap-4">
          <BitcoinPiece
            tone="emerald"
            Icon={KeyRound}
            heading={kh ? "សោឯកជន = កាបូបរបស់អ្នក" : "Private Key = Your Wallet"}
            sub={kh ? "Private Key = Your Wallet" : "សោឯកជន = កាបូបរបស់អ្នក"}
            en="The cryptography from Section 1 proves YOU are the owner. Whoever holds the private key controls the coins. No bank can freeze it. No password reset."
            kh="កូដនីយកម្មពីផ្នែកទី ១ បញ្ជាក់ថា អ្នក គឺជាម្ចាស់។ អ្នកណាកាន់សោឯកជន គឺគ្រប់គ្រងកាក់។ គ្មានធនាគារអាចបង្កករបាន។ គ្មានការកំណត់លេខសម្ងាត់ឡើងវិញ។"
          />
          <BitcoinPiece
            tone="amber"
            Icon={BookOpenCheck}
            heading={kh ? "ប្លុកឆេន = សៀវភៅធនាគារ" : "Blockchain = The Bank Ledger"}
            sub={kh ? "Blockchain = The Bank Ledger" : "ប្លុកឆេន = សៀវភៅធនាគារ"}
            en="The village notebook from Section 2 keeps a permanent, public record of every coin sent — so no one can spend the same Bitcoin twice."
            kh="សៀវភៅភូមិពីផ្នែកទី ២ រក្សាការកត់ត្រាជាសាធារណៈជាអចិន្ត្រៃយ៍នៃរាល់កាក់ដែលផ្ញើ — ដូច្នេះគ្មាននរណាម្នាក់អាចចាយ Bitcoin ដូចគ្នាពីរដងបានទេ។"
          />
        </div>

        {/* Big takeaway */}
        <div className="rounded-xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-emerald-500/10 p-4 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-amber-100">
              <span className="font-bold">There is no Bitcoin object anywhere.</span>{" "}
              The "coin" you own is just an entry in a notebook that{" "}
              <span className="text-emerald-200">millions of computers around the world</span> all
              agree exists — and only{" "}
              <span className="text-amber-200">your private key</span> can move.
            </p>
            <p className="mt-1 text-xs text-amber-200/80 font-khmer leading-loose">
              <span className="font-bold">គ្មានវត្ថុ Bitcoin នៅកន្លែងណាទេ។</span>{" "}
              "កាក់" ដែលអ្នកជាម្ចាស់ គឺគ្រាន់តែជាការកត់ត្រាក្នុងសៀវភៅដែល​{" "}
              <span className="text-emerald-200">កុំព្យូទ័ររាប់លានជុំវិញពិភពលោក</span> យល់ស្របថាមាន — ហើយមានតែ​{" "}
              <span className="text-amber-200">សោឯកជនរបស់អ្នក</span> ប៉ុណ្ណោះអាចផ្លាស់ទីវាបាន។
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function EquationTile({
  tone,
  Icon,
  labelEn,
  labelKh,
  note,
  big = false,
}: {
  tone: "emerald" | "amber";
  Icon: React.ComponentType<{ className?: string }>;
  labelEn: string;
  labelKh: string;
  note: string;
  big?: boolean;
}) {
  const palette =
    tone === "amber"
      ? {
          bg: "bg-amber-500/10",
          border: "border-amber-400/60",
          icon: "text-amber-300",
          text: "text-amber-100",
          sub: "text-amber-200/80",
        }
      : {
          bg: "bg-emerald-500/10",
          border: "border-emerald-400/60",
          icon: "text-emerald-300",
          text: "text-emerald-100",
          sub: "text-emerald-200/80",
        };
  const size = big ? "w-16 h-16 sm:w-20 sm:h-20" : "w-12 h-12 sm:w-14 sm:h-14";
  return (
    <div className="text-center min-w-[88px]">
      <div
        className={`mx-auto rounded-xl ${size} ${palette.bg} ${palette.border} border-2 flex items-center justify-center ${palette.icon} mb-1.5`}
      >
        <Icon className={big ? "w-8 h-8 sm:w-10 sm:h-10" : "w-6 h-6 sm:w-7 sm:h-7"} />
      </div>
      <div className={`text-[11px] font-mono uppercase tracking-widest ${palette.text}`}>
        {labelEn}
      </div>
      <div className={`text-[10px] font-khmer mt-0.5 ${palette.sub}`}>{labelKh}</div>
      <div className="text-[10px] text-slate-400 mt-0.5">{note}</div>
    </div>
  );
}

function BitcoinPiece({
  tone,
  Icon,
  heading,
  sub,
  en,
  kh,
}: {
  tone: "emerald" | "amber";
  Icon: React.ComponentType<{ className?: string }>;
  heading: string;
  sub: string;
  en: string;
  kh: string;
}) {
  const palette =
    tone === "amber"
      ? {
          border: "border-amber-500/40",
          chip: "bg-amber-500/15 border-amber-400/50 text-amber-300",
          accent: "text-amber-200",
        }
      : {
          border: "border-emerald-500/40",
          chip: "bg-emerald-500/15 border-emerald-400/50 text-emerald-300",
          accent: "text-emerald-200",
        };
  return (
    <div className={`rounded-xl bg-black/40 border ${palette.border} p-4`}>
      <div className="flex items-center gap-2.5 mb-2">
        <div className={`w-9 h-9 rounded-lg border ${palette.chip} flex items-center justify-center`}>
          <Icon className="w-4.5 h-4.5" />
        </div>
        <div>
          <div className={`text-sm font-bold ${palette.accent}`}>{heading}</div>
          <div className="text-[10px] font-khmer text-slate-400 leading-snug">{sub}</div>
        </div>
      </div>
      <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed">{en}</p>
      <p className="mt-1 text-xs text-slate-300/70 leading-loose font-khmer">{kh}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Shared sub-component: per-card header
 * ──────────────────────────────────────────────────────────────────────── */
function CardHeader({
  index,
  kicker,
  titleEn,
  titleKh,
  Icon,
  accent,
}: {
  index: string;
  kicker: string;
  titleEn: string;
  titleKh: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: "emerald" | "amber";
}) {
  const palette =
    accent === "amber"
      ? {
          bg: "from-black via-stone-950 to-amber-950/40",
          border: "border-amber-500/30",
          tag: "text-amber-300",
          icon: "bg-amber-500/15 border-amber-400/50 text-amber-300",
          title: "text-amber-50",
          sub: "text-amber-200",
          index: "text-amber-300/60",
        }
      : {
          bg: "from-black via-slate-950 to-emerald-950/40",
          border: "border-emerald-500/30",
          tag: "text-emerald-300",
          icon: "bg-emerald-500/15 border-emerald-400/50 text-emerald-300",
          title: "text-emerald-50",
          sub: "text-emerald-200",
          index: "text-emerald-300/60",
        };

  return (
    <div className={`relative px-4 sm:px-5 py-4 bg-gradient-to-br ${palette.bg} border-b ${palette.border}`}>
      <div className="flex items-center gap-3">
        <div
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 flex items-center justify-center flex-shrink-0 ${palette.icon}`}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`text-[10px] font-mono uppercase tracking-[0.25em] ${palette.tag}`}>
            <span className={`mr-2 font-bold ${palette.index}`}>{index}</span>
            {kicker}
          </div>
          <div className="mt-0.5 leading-tight">
            <span className={`block font-display text-lg sm:text-xl font-bold ${palette.title}`}>
              {titleEn}
            </span>
            <span className={`block font-khmer text-base sm:text-lg font-bold ${palette.sub} leading-relaxed`}>
              {titleKh}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Sub-component: A glowing key panel used in CryptographyCard
 * ──────────────────────────────────────────────────────────────────────── */
function KeyPanel({
  tone,
  badge,
  badgeKh,
  title,
  subtitle,
  Icon,
  analogyEn,
  analogyKh,
  ruleEn,
  ruleKh,
}: {
  tone: "emerald" | "amber";
  badge: string;
  badgeKh: string;
  title: string;
  subtitle: string;
  Icon: React.ComponentType<{ className?: string }>;
  analogyEn: string;
  analogyKh: string;
  ruleEn: string;
  ruleKh: string;
}) {
  const palette =
    tone === "amber"
      ? {
          border: "border-amber-500/50",
          chip: "bg-amber-500/15 border-amber-400/50 text-amber-300",
          glow: GOLD_GLOW,
          title: "text-amber-100",
          sub: "text-amber-200/80",
          rule: "text-amber-200",
        }
      : {
          border: "border-emerald-500/50",
          chip: "bg-emerald-500/15 border-emerald-400/50 text-emerald-300",
          glow: NEON_GLOW,
          title: "text-emerald-100",
          sub: "text-emerald-200/80",
          rule: "text-emerald-200",
        };

  return (
    <div
      data-testid={`key-panel-${tone}`}
      className={`rounded-xl bg-black/50 border ${palette.border} p-4`}
      style={palette.glow}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div className={`w-10 h-10 rounded-lg border ${palette.chip} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400">
            {badge}
            <span className="ml-1.5 text-[10px] font-khmer text-slate-500">· {badgeKh}</span>
          </div>
          <div className={`text-base font-bold leading-tight ${palette.title}`}>{title}</div>
          <div className={`text-xs font-khmer leading-snug ${palette.sub}`}>{subtitle}</div>
        </div>
      </div>
      <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed">{analogyEn}</p>
      <p className="mt-1 text-xs text-slate-300/70 leading-loose font-khmer">{analogyKh}</p>
      <div className={`mt-3 text-xs font-bold ${palette.rule}`}>
        {ruleEn}
        <span className="block text-[11px] font-normal mt-0.5 font-khmer leading-loose opacity-90">
          {ruleKh}
        </span>
      </div>
    </div>
  );
}
