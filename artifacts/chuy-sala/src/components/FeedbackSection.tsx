import { useCallback, useEffect, useRef, useState } from "react";
import {
  Send,
  MessageSquare,
  WifiOff,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdayqjla";
const QUEUE_KEY = "chuy-sala:feedback-queue";

type QueuedFeedback = {
  id: string;
  name: string;
  message: string;
  savedAt: string;
};

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "offline-saved" }
  | { kind: "queued-flushed"; count: number }
  | { kind: "error"; en: string; kh: string };

function readQueue(): QueuedFeedback[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(QUEUE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Hard cap on queued items so a long offline period (or a placeholder
// endpoint that always 404s) can't fill up the user's storage.
const QUEUE_MAX_ITEMS = 50;

function writeQueue(items: QueuedFeedback[]): { ok: boolean } {
  if (typeof window === "undefined") return { ok: false };
  try {
    window.localStorage.setItem(QUEUE_KEY, JSON.stringify(items));
    return { ok: true };
  } catch {
    // QuotaExceeded, storage disabled, or private-mode denial.
    return { ok: false };
  }
}

// Atomically read the latest queue, apply a mutation, and write back.
// This prevents the drain↔submit race: if a submit happens while a
// drain is in flight, both paths re-read the latest snapshot before
// writing, so neither can clobber the other's append.
function mutateQueue(
  mutator: (current: QueuedFeedback[]) => QueuedFeedback[],
): { ok: boolean; result: QueuedFeedback[] } {
  const next = mutator(readQueue()).slice(-QUEUE_MAX_ITEMS);
  const { ok } = writeQueue(next);
  return { ok, result: next };
}

async function postFeedback(item: QueuedFeedback): Promise<boolean> {
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: item.name || "(anonymous)",
        message: item.message,
        savedAt: item.savedAt,
        _source: "chuy-sala homepage feedback",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function FeedbackSection() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // Guard against multiple concurrent drains (e.g. mount + online event firing
  // in the same tick).
  const drainingRef = useRef(false);

  const drainQueue = useCallback(async () => {
    if (drainingRef.current) return;
    if (typeof navigator !== "undefined" && navigator.onLine === false) return;
    drainingRef.current = true;
    try {
      const snapshot = readQueue();
      if (snapshot.length === 0) return;
      // Track which items were sent successfully by id; everything else
      // stays in the queue (and any items appended by a concurrent submit
      // are preserved by the atomic mutateQueue below).
      const sentIds = new Set<string>();
      for (const item of snapshot) {
        const ok = await postFeedback(item);
        if (ok) sentIds.add(item.id);
      }
      if (sentIds.size > 0) {
        mutateQueue((latest) => latest.filter((x) => !sentIds.has(x.id)));
        setStatus({ kind: "queued-flushed", count: sentIds.size });
      }
    } finally {
      drainingRef.current = false;
    }
  }, []);

  // On mount: try to drain anything queued from a previous session.
  useEffect(() => {
    void drainQueue();
  }, [drainQueue]);

  // Auto-flush whenever the connection returns.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      void drainQueue();
    };
    window.addEventListener("online", handler);
    return () => window.removeEventListener("online", handler);
  }, [drainQueue]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedMessage = message.trim();
      if (!trimmedMessage) return;

      const item: QueuedFeedback = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: name.trim(),
        message: trimmedMessage,
        savedAt: new Date().toISOString(),
      };

      const online =
        typeof navigator !== "undefined" ? navigator.onLine : true;

      const storageFullError = {
        kind: "error" as const,
        en: "Couldn't save your message — your browser storage is full or disabled. Please try again later.",
        kh: "មិនអាចរក្សាទុកសារបានទេ — ឃ្លាំងផ្ទុករបស់កម្មវិធីរុករកបានពេញ ឬត្រូវបានបិទ។ សូមព្យាយាមម្ដងទៀតនៅពេលក្រោយ។",
      };

      if (!online) {
        // Offline — save it for later and tell the user.
        const wr = mutateQueue((cur) => [...cur, item]);
        if (!wr.ok) {
          setStatus(storageFullError);
          return;
        }
        setStatus({ kind: "offline-saved" });
        setMessage("");
        setName("");
        return;
      }

      setStatus({ kind: "sending" });
      const ok = await postFeedback(item);
      if (ok) {
        setStatus({ kind: "success" });
        setMessage("");
        setName("");
      } else {
        // Online but POST failed (placeholder endpoint, transient network
        // blip, Formspree rejected). Queue it so it can be retried.
        const wr = mutateQueue((cur) => [...cur, item]);
        if (!wr.ok) {
          setStatus(storageFullError);
          return;
        }
        setStatus({
          kind: "error",
          en: "We couldn't send right now, but we saved your message and will retry when the connection improves.",
          kh: "មិនអាចផ្ញើបានទេ ប៉ុន្តែយើងបានរក្សាទុកសារ និងនឹងព្យាយាមម្ដងទៀតនៅពេលដែលការតភ្ជាប់ប្រសើរឡើង។",
        });
      }
    },
    [message, name],
  );

  return (
    <section
      id="feedback"
      data-testid="feedback-section"
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 mt-8"
    >
      {/* Soft glow accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-sky-400/10 blur-3xl"
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            <MessageSquare className="w-3.5 h-3.5" />
            {kh ? "មតិយោបល់ និងសំណូមពរ" : "Suggestions & Feedback"}
          </div>
          <h2
            data-testid="feedback-heading"
            className="mb-3"
          >
            {/* Bilingual heading: render BOTH languages, with the user's
                primary language emphasised on top. */}
            <span
              className={`block text-3xl md:text-4xl font-bold ${
                kh ? "font-khmer leading-snug" : "font-display"
              }`}
            >
              {kh
                ? "តើយើងគួរបង្កើតអ្វីបន្ទាប់ទៀត?"
                : "What should we build next?"}
            </span>
            <span
              className={`block text-base md:text-lg font-semibold text-white/80 mt-1 ${
                kh ? "font-display" : "font-khmer leading-snug"
              }`}
            >
              {kh
                ? "What should we build next?"
                : "តើយើងគួរបង្កើតអ្វីបន្ទាប់ទៀត?"}
            </span>
          </h2>
          <p
            className={`text-white/80 max-w-xl mx-auto ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {kh
              ? "ប្រាប់ពួកយើងពីគំនិតរបស់អ្នក — មុខវិជ្ជា ហ្គេម ឬឧបករណ៍ណាមួយដែលនឹងជួយសិស្ស និងគ្រូខ្មែរ។"
              : "Tell us your idea — any subject, game, or tool that would help Cambodian students and teachers."}
            <span
              className={`block mt-1 text-xs opacity-70 ${
                kh ? "" : "font-khmer"
              }`}
            >
              ·{" "}
              {kh
                ? "Tell us your idea — any subject, game, or tool that would help Cambodian students and teachers."
                : "ប្រាប់ពួកយើងពីគំនិតរបស់អ្នក — មុខវិជ្ជា ហ្គេម ឬឧបករណ៍ណាមួយដែលនឹងជួយសិស្ស និងគ្រូខ្មែរ។"}
            </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          data-testid="feedback-form"
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl"
          noValidate
        >
          <label className="block mb-4">
            <span
              className={`block text-sm font-bold text-white/90 mb-1.5 ${
                kh ? "font-khmer" : ""
              }`}
            >
              {kh ? "ឈ្មោះ (ស្រេចចិត្ត)" : "Name (optional)"}
              <span
                className={`ml-1 opacity-60 text-xs font-normal ${
                  kh ? "" : "font-khmer"
                }`}
              >
                · {kh ? "Name (optional)" : "ឈ្មោះ (ស្រេចចិត្ត)"}
              </span>
            </span>
            <input
              type="text"
              data-testid="feedback-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={kh ? "ឈ្មោះអ្នក" : "Your name"}
              maxLength={80}
              autoComplete="name"
              className="w-full rounded-xl bg-white/95 text-slate-900 placeholder:text-slate-400 px-4 py-3 text-base font-medium border-2 border-transparent focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-400/20 transition"
            />
          </label>

          <label className="block mb-5">
            <span
              className={`block text-sm font-bold text-white/90 mb-1.5 ${
                kh ? "font-khmer" : ""
              }`}
            >
              {kh ? "សាររបស់អ្នក" : "Your message"}
              <span
                className={`ml-1 opacity-60 text-xs font-normal ${
                  kh ? "" : "font-khmer"
                }`}
              >
                · {kh ? "Your message" : "សាររបស់អ្នក"}
              </span>
            </span>
            <textarea
              data-testid="feedback-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                kh
                  ? "សរសេរគំនិតរបស់អ្នកនៅទីនេះ..."
                  : "Type your idea here..."
              }
              required
              rows={6}
              maxLength={2000}
              className="w-full rounded-xl bg-white/95 text-slate-900 placeholder:text-slate-400 px-4 py-3 text-base leading-relaxed border-2 border-transparent focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-400/20 transition resize-y min-h-[140px]"
            />
            <div
              data-testid="feedback-char-count"
              className="mt-1 text-right text-xs text-white/60 tabular-nums"
            >
              {message.length} / 2000
            </div>
          </label>

          <button
            type="submit"
            data-testid="feedback-submit"
            disabled={
              status.kind === "sending" || message.trim().length === 0
            }
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-slate-900 shadow-lg shadow-amber-400/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            <span>
              {status.kind === "sending"
                ? kh
                  ? "កំពុងផ្ញើ..."
                  : "Sending..."
                : kh
                  ? "ផ្ញើមតិយោបល់"
                  : "Send Feedback"}
              {status.kind !== "sending" && (
                <span
                  className={`ml-1.5 text-xs opacity-70 font-normal ${
                    kh ? "" : "font-khmer"
                  }`}
                >
                  · {kh ? "Send Feedback" : "ផ្ញើមតិយោបល់"}
                </span>
              )}
            </span>
          </button>

          <p
            className={`mt-3 inline-flex items-start gap-1.5 text-xs text-white/60 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>
              {kh
                ? "ដំណើរការ Offline — យើងនឹងរក្សាទុកសារជាមុន ហើយផ្ញើពេលមាន Wi-Fi។"
                : "Works offline — we save your note first, then send when Wi-Fi is back."}
            </span>
          </p>

          {/* Status messages */}
          {status.kind === "success" && (
            <div
              role="status"
              aria-live="polite"
              data-testid="feedback-status-success"
              className="mt-5 flex items-start gap-3 rounded-xl bg-emerald-500/15 border border-emerald-300/40 px-4 py-3 text-emerald-50"
            >
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-emerald-300" />
              <div
                className={`text-sm ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {kh
                  ? "សូមអរគុណ! គំនិតរបស់អ្នកត្រូវបានផ្ញើហើយ។"
                  : "Thank you! Your idea has been sent."}
                <span
                  className={`block opacity-80 text-xs mt-0.5 ${
                    kh ? "" : "font-khmer"
                  }`}
                >
                  ·{" "}
                  {kh
                    ? "Thank you! Your idea has been sent."
                    : "សូមអរគុណ! គំនិតរបស់អ្នកត្រូវបានផ្ញើហើយ។"}
                </span>
              </div>
            </div>
          )}

          {status.kind === "offline-saved" && (
            <div
              role="status"
              aria-live="polite"
              data-testid="feedback-status-offline"
              className="mt-5 flex items-start gap-3 rounded-xl bg-amber-500/15 border border-amber-300/40 px-4 py-3 text-amber-50"
            >
              <WifiOff className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-300" />
              <div
                className={`text-sm ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {kh
                  ? "អ្នកមិនមានអ៊ីនធឺណិតទេ! យើងបានរក្សាទុកសាររបស់អ្នក ហើយនឹងផ្ញើវានៅពេលអ្នកភ្ជាប់វ៉ាយហ្វាយ (Wi-Fi)។"
                  : "You are offline! We saved your message and will send it when you connect to Wi-Fi."}
                <span
                  className={`block opacity-80 text-xs mt-0.5 ${
                    kh ? "" : "font-khmer"
                  }`}
                >
                  ·{" "}
                  {kh
                    ? "You are offline! We saved your message and will send it when you connect to Wi-Fi."
                    : "អ្នកមិនមានអ៊ីនធឺណិតទេ! យើងបានរក្សាទុកសាររបស់អ្នក ហើយនឹងផ្ញើវានៅពេលអ្នកភ្ជាប់វ៉ាយហ្វាយ (Wi-Fi)។"}
                </span>
              </div>
            </div>
          )}

          {status.kind === "queued-flushed" && (
            <div
              role="status"
              aria-live="polite"
              data-testid="feedback-status-flushed"
              className="mt-5 flex items-start gap-3 rounded-xl bg-sky-500/15 border border-sky-300/40 px-4 py-3 text-sky-50"
            >
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-sky-300" />
              <div
                className={`text-sm ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {kh
                  ? `យើងបានផ្ញើសារ ${status.count} ដែលអ្នកបានរក្សាទុកនៅពេលនៅ offline។`
                  : `We sent ${status.count} message${
                      status.count === 1 ? "" : "s"
                    } you saved while offline.`}
              </div>
            </div>
          )}

          {status.kind === "error" && (
            <div
              role="alert"
              data-testid="feedback-status-error"
              className="mt-5 flex items-start gap-3 rounded-xl bg-rose-500/15 border border-rose-300/40 px-4 py-3 text-rose-50"
            >
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-rose-300" />
              <div
                className={`text-sm ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {kh ? status.kh : status.en}
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
