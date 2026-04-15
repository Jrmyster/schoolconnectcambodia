import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, RotateCcw, CheckCircle2, XCircle, Send, Loader2, Shuffle } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import { randomScenario, nextScenario } from "@/data/relativityScenarios";
import type { AnswerKey, Scenario } from "@/data/relativityScenarios";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

// ── ClockFace ────────────────────────────────────────────────────────────────

function ClockFace({
  fast,
  label,
  labelKh,
  color,
}: {
  fast: boolean;
  label: string;
  labelKh: string;
  color: string;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const animClass = fast ? "animate-spin-fast" : "animate-spin-slow";

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative rounded-full border-2 flex items-center justify-center"
        style={{
          width: 88,
          height: 88,
          borderColor: color,
          background: "rgba(0,0,0,0.5)",
          boxShadow: `0 0 20px ${color}55`,
        }}
      >
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * 360;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                width: 2,
                height: 6,
                background: color,
                opacity: 0.5,
                top: 4,
                left: "calc(50% - 1px)",
                transformOrigin: "1px 40px",
                transform: `rotate(${angle}deg)`,
              }}
            />
          );
        })}

        <div className={`absolute ${animClass}`} style={{ width: "100%", height: "100%" }}>
          <div
            className="absolute rounded-full"
            style={{
              width: 2,
              height: 28,
              background: color,
              top: "50%",
              left: "calc(50% - 1px)",
              transformOrigin: "top center",
              marginTop: -28,
            }}
          />
        </div>

        <div
          className="absolute"
          style={{
            width: "100%",
            height: "100%",
            animation: fast
              ? "spinFast 9.6s linear infinite"
              : "spinSlow 96s linear infinite",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 20,
              background: color,
              opacity: 0.7,
              top: "50%",
              left: "calc(50% - 1.5px)",
              transformOrigin: "top center",
              marginTop: -20,
            }}
          />
        </div>

        <div
          className="absolute rounded-full z-10"
          style={{ width: 6, height: 6, background: color }}
        />
      </div>

      <div className="text-center">
        <p className="font-bold text-sm" style={{ color }}>
          {kh ? labelKh : label}
        </p>
        <p className={`text-white/40 text-xs mt-0.5 ${kh ? "font-khmer" : ""}`}>
          {fast
            ? kh ? "ដើរលឿន" : "Racing forward"
            : kh ? "ដើរយឺតណាស់" : "Barely ticking"}
        </p>
      </div>
    </div>
  );
}

// ── RelativityChallenge ───────────────────────────────────────────────────────

interface RelativityChallengeProps {
  onScoreSubmitted?: () => void;
}

export function RelativityChallenge({ onScoreSubmitted }: RelativityChallengeProps) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  // Pick a random scenario on first render
  const [scenario, setScenario] = useState<Scenario>(() => randomScenario());

  const [selected, setSelected] = useState<AnswerKey | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [nickname, setNickname] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const elapsedMsRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [scenario]); // Reset timer each time scenario changes

  const isCorrect = selected !== null && selected === scenario.correctKey;

  function handleSelect(key: AnswerKey) {
    if (revealed) return;
    elapsedMsRef.current = Date.now() - startTimeRef.current;
    setSelected(key);
    setRevealed(true);
  }

  function reset() {
    // Pick a different scenario so the user always sees something new
    setScenario((prev) => nextScenario(prev.id));
    setSelected(null);
    setRevealed(false);
    setNickname("");
    setSubmitting(false);
    setSubmitted(false);
    setSubmitError(false);
    elapsedMsRef.current = 0;
    startTimeRef.current = Date.now();
  }

  const handleSubmit = useCallback(async () => {
    const trimmed = nickname.trim();
    if (!trimmed || submitted || submitting) return;
    setSubmitting(true);
    setSubmitError(false);
    try {
      const res = await fetch(`${BASE_URL}/api/leaderboard/space`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: trimmed,
          score: isCorrect ? 1 : 0,
          completionTimeMs: elapsedMsRef.current,
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setSubmitted(true);
      onScoreSubmitted?.();
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }, [nickname, submitted, submitting, isCorrect, onScoreSubmitted]);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-lg bg-violet-400/15 border border-violet-400/25 flex items-center justify-center text-violet-400">
          <Rocket className="w-3.5 h-3.5" />
        </div>
        <span
          className={`text-xs font-bold tracking-widest text-violet-400 uppercase ${
            kh ? "font-khmer tracking-normal" : ""
          }`}
        >
          {t("Relativity Challenge", "បញ្ហាប្រឈមនៃរ៉ឺឡាទីវីតេ")}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-violet-400/20 to-transparent" />

        {/* Scenario indicator */}
        <div className="flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-400/8 px-3 py-1">
          <Shuffle className="w-3 h-3 text-violet-400/60" />
          <span className={`text-violet-400/60 text-xs ${kh ? "font-khmer" : ""}`}>
            {kh
              ? `ទិសដៅ: ${scenario.destination.kh}`
              : `Destination: ${scenario.destination.en}`}
          </span>
        </div>
      </div>

      {/* Main card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl overflow-hidden border border-violet-500/25"
          style={{
            background:
              "linear-gradient(135deg,rgba(109,40,217,0.18) 0%,rgba(139,92,246,0.10) 50%,rgba(15,5,35,0.65) 100%)",
          }}
        >
          {/* Scenario block */}
          <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-white/8">
            <div className="flex items-start gap-4">
              {/* Destination emoji badge */}
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-2xl">
                {scenario.emoji}
              </div>
              <div className="flex-1">
                {/* Destination tag */}
                <div className="flex items-center gap-2 mb-2">
                  <p
                    className={`text-white/45 text-xs font-semibold uppercase tracking-widest ${
                      kh ? "font-khmer tracking-normal" : ""
                    }`}
                  >
                    {t("The Scenario", "សេណារ្យូ")}
                  </p>
                  <span className="text-violet-300/60 text-xs">·</span>
                  <span
                    className={`text-violet-300 text-xs font-bold ${kh ? "font-khmer" : ""}`}
                  >
                    {kh ? scenario.destination.kh : scenario.destination.en}
                  </span>
                  <span className="text-violet-300/60 text-xs">
                    · {scenario.distanceLy} ly
                  </span>
                </div>
                {/* Scenario prose */}
                <p
                  className={`text-white/85 text-sm leading-relaxed ${
                    kh ? "font-khmer leading-loose" : ""
                  }`}
                >
                  {kh ? scenario.scenarioText.kh : scenario.scenarioText.en}
                </p>
              </div>
            </div>
          </div>

          {/* Question + choices */}
          <div className="px-6 sm:px-8 pt-6 pb-6">
            <p
              className={`text-white font-bold text-base leading-snug mb-6 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {kh ? scenario.questionText.kh : scenario.questionText.en}
            </p>

            <div className="flex flex-col gap-3 mb-6">
              {scenario.choices.map((c) => {
                const isSelected = selected === c.key;
                const isRight = c.key === scenario.correctKey;
                let borderColor = "border-white/15";
                let bg = "bg-white/5 hover:bg-white/8";
                let textColor = "text-white/80";

                if (revealed) {
                  if (isRight) {
                    borderColor = "border-emerald-400/60";
                    bg = "bg-emerald-400/10";
                    textColor = "text-emerald-300";
                  } else if (isSelected && !isRight) {
                    borderColor = "border-red-400/60";
                    bg = "bg-red-400/10";
                    textColor = "text-red-300";
                  }
                }

                return (
                  <button
                    key={c.key}
                    onClick={() => handleSelect(c.key)}
                    disabled={revealed}
                    className={`flex items-center gap-3 w-full text-left rounded-2xl border px-5 py-4 transition-all duration-200 ${borderColor} ${bg} ${
                      !revealed ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center font-bold text-xs ${
                        revealed && isRight
                          ? "border-emerald-400 text-emerald-300"
                          : revealed && isSelected && !isRight
                          ? "border-red-400 text-red-300"
                          : "border-white/30 text-white/50"
                      }`}
                    >
                      {c.key}
                    </span>
                    <span
                      className={`text-sm font-medium leading-snug flex-1 ${textColor} ${
                        kh ? "font-khmer leading-loose" : ""
                      }`}
                    >
                      {kh ? c.kh : c.en}
                    </span>
                    {revealed && isRight && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    )}
                    {revealed && isSelected && !isRight && (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Result panel */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Dual clock animation */}
                  <div
                    className="rounded-2xl border border-white/10 p-6 mb-4"
                    style={{
                      background:
                        "linear-gradient(135deg,rgba(30,10,60,0.8) 0%,rgba(10,5,25,0.9) 100%)",
                    }}
                  >
                    <p
                      className={`text-white/45 text-xs font-semibold uppercase tracking-widest mb-5 text-center ${
                        kh ? "font-khmer tracking-normal" : ""
                      }`}
                    >
                      {t("Time Dilation in Action", "ការពន្យារពេលវេលាក្នុងសកម្មភាព")}
                    </p>

                    <div className="flex items-center justify-center gap-8 sm:gap-16">
                      <ClockFace
                        fast={false}
                        label="Your Clock"
                        labelKh="នាឡិការបស់អ្នក"
                        color="#a78bfa"
                      />
                      <div className="flex flex-col items-center gap-1">
                        <div className="text-white/20 text-2xl">⟺</div>
                        <p
                          className={`text-white/30 text-xs text-center max-w-[80px] ${
                            kh ? "font-khmer leading-loose" : ""
                          }`}
                        >
                          {t("vs", "ទល់នឹង")}
                        </p>
                      </div>
                      <ClockFace
                        fast={true}
                        label="Earth's Clock"
                        labelKh="នាឡិកាផែនដី"
                        color="#38bdf8"
                      />
                    </div>

                    <p
                      className={`text-white/40 text-xs text-center mt-5 leading-relaxed max-w-sm mx-auto ${
                        kh ? "font-khmer leading-loose" : ""
                      }`}
                    >
                      {kh
                        ? scenario.clockCaption.kh
                        : scenario.clockCaption.en}
                    </p>
                  </div>

                  {/* Feedback panel */}
                  <div
                    className={`rounded-2xl border p-5 mb-4 ${
                      isCorrect
                        ? "border-emerald-400/30 bg-emerald-400/8"
                        : "border-amber-400/30 bg-amber-400/8"
                    }`}
                  >
                    <p
                      className={`font-bold mb-2 ${
                        isCorrect ? "text-emerald-300" : "text-amber-300"
                      } ${kh ? "font-khmer" : ""}`}
                    >
                      {isCorrect
                        ? t("Correct! 🎉", "ត្រឹមត្រូវ! 🎉")
                        : t(
                            "Not quite — but here's what really happens:",
                            "មិនត្រឹមត្រូវ — ប៉ុន្តែនេះជាអ្វីដែលពិតជាកើតឡើង:"
                          )}
                    </p>
                    <p
                      className={`text-sm leading-relaxed ${
                        isCorrect ? "text-emerald-200/80" : "text-amber-200/80"
                      } ${kh ? "font-khmer leading-loose" : ""}`}
                    >
                      {kh
                        ? isCorrect
                          ? scenario.feedbackCorrect.kh
                          : scenario.feedbackIncorrect.kh
                        : isCorrect
                        ? scenario.feedbackCorrect.en
                        : scenario.feedbackIncorrect.en}
                    </p>

                    {/* Life fact — always shown regardless of correct/incorrect */}
                    <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                      <p
                        className={`text-white/40 text-xs font-semibold uppercase tracking-wider mb-1 ${
                          kh ? "font-khmer tracking-normal" : ""
                        }`}
                      >
                        🌍 {t("Meanwhile, back on Earth…", "ក្នុងពេលនោះ នៅផែនដី…")}
                      </p>
                      <p
                        className={`text-white/65 text-xs leading-relaxed ${
                          kh ? "font-khmer leading-loose" : ""
                        }`}
                      >
                        {kh ? scenario.lifeFact.kh : scenario.lifeFact.en}
                      </p>
                    </div>
                  </div>

                  {/* Nickname submission */}
                  {!submitted ? (
                    <div
                      className="rounded-2xl border border-white/10 p-5 mb-4"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <p
                        className={`text-white/60 text-sm font-semibold mb-1 ${
                          kh ? "font-khmer" : ""
                        }`}
                      >
                        {t(
                          "Add your name to the leaderboard",
                          "បន្ថែមឈ្មោះអ្នកទៅក្ដារលេខ"
                        )}
                      </p>
                      <p
                        className={`text-white/30 text-xs mb-3 ${
                          kh ? "font-khmer leading-loose" : ""
                        }`}
                      >
                        {t(
                          "Choose a nickname — your real name won't be shown publicly.",
                          "ជ្រើសឈ្មោះហៅ — ឈ្មោះពិតរបស់អ្នកនឹងមិនត្រូវបានបង្ហាញជាសាធារណៈ។"
                        )}
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={nickname}
                          onChange={(e) =>
                            setNickname(e.target.value.slice(0, 30))
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleSubmit()
                          }
                          placeholder={kh ? "ឈ្មោះហៅ…" : "Your nickname…"}
                          maxLength={30}
                          className={`flex-1 rounded-xl border border-white/15 bg-white/8 text-white text-sm px-4 py-2.5 placeholder-white/25 focus:outline-none focus:border-violet-400/50 transition-colors ${
                            kh ? "font-khmer" : ""
                          }`}
                        />
                        <button
                          onClick={handleSubmit}
                          disabled={!nickname.trim() || submitting}
                          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                          style={{
                            background: "rgba(139,92,246,0.7)",
                            color: "white",
                          }}
                        >
                          {submitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                          <span className={kh ? "font-khmer" : ""}>
                            {t("Submit", "បញ្ជូន")}
                          </span>
                        </button>
                      </div>
                      {submitError && (
                        <p
                          className={`text-red-400 text-xs mt-2 ${
                            kh ? "font-khmer" : ""
                          }`}
                        >
                          {t(
                            "Submission failed. Please try again.",
                            "បញ្ជូនបរាជ័យ។ សូមព្យាយាមម្ដងទៀត។"
                          )}
                        </p>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-2xl border border-emerald-400/30 bg-emerald-400/8 p-4 mb-4 text-center"
                    >
                      <p
                        className={`text-emerald-300 font-bold text-sm ${
                          kh ? "font-khmer" : ""
                        }`}
                      >
                        {t(
                          "Score submitted! Check the leaderboard below. 🌌",
                          "ពិន្ទុបានបញ្ជូន! មើលក្ដារលេខខាងក្រោម។ 🌌"
                        )}
                      </p>
                    </motion.div>
                  )}

                  {/* Try again — always gets a NEW scenario */}
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={reset}
                      className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors"
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      <span className={kh ? "font-khmer" : ""}>
                        {t(
                          "Try a new scenario",
                          "សាកល្បងសេណារ្យូថ្មី"
                        )}
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
