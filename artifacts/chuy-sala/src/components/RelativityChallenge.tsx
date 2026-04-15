import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, RotateCcw, CheckCircle2, XCircle, Send, Loader2 } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

type AnswerKey = "A" | "B" | "C";

const CHOICES: { key: AnswerKey; en: string; kh: string }[] = [
  {
    key: "A",
    en: "About 5 months — the same as you felt on the ship",
    kh: "ប្រហែល ៥ ខែ — ដូចអ្នកមានអារម្មណ៍នៅលើយានអវកាស",
  },
  {
    key: "B",
    en: "8.6 years — the light-travel time to Sirius",
    kh: "8.6 ឆ្នាំ — ពេលវេលាធ្វើដំណើររបស់ពន្លឺទៅផ្កាយ ស៊ីរ្យូស",
  },
  {
    key: "C",
    en: "17.2 years — twice the distance to Sirius",
    kh: "17.2 ឆ្នាំ — ចម្ងាយទ្វីគុណទៅផ្កាយ ស៊ីរ្យូស",
  },
];

const CORRECT: AnswerKey = "B";

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

interface RelativityChallengeProps {
  onScoreSubmitted?: () => void;
}

export function RelativityChallenge({ onScoreSubmitted }: RelativityChallengeProps) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

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
  }, []);

  const isCorrect = selected === CORRECT;

  function handleSelect(key: AnswerKey) {
    if (revealed) return;
    elapsedMsRef.current = Date.now() - startTimeRef.current;
    setSelected(key);
    setRevealed(true);
  }

  function reset() {
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
      </div>

      {/* Main card */}
      <div
        className="rounded-3xl overflow-hidden border border-violet-500/25"
        style={{
          background:
            "linear-gradient(135deg,rgba(109,40,217,0.18) 0%,rgba(139,92,246,0.10) 50%,rgba(15,5,35,0.65) 100%)",
        }}
      >
        {/* Scenario */}
        <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-white/8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-2xl">
              🚀
            </div>
            <div>
              <p
                className={`text-white/45 text-xs font-semibold uppercase tracking-widest mb-2 ${
                  kh ? "font-khmer tracking-normal" : ""
                }`}
              >
                {t("The Scenario", "សេណារ្យូ")}
              </p>
              <p
                className={`text-white/85 text-sm leading-relaxed ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {t(
                  "You are 18 years old. You board a spaceship traveling at 99.9% the speed of light toward the star Sirius — 8.6 light-years away. Due to Time Dilation, only about 5 months pass for you on the ship during the entire trip.",
                  "អ្នកមានអាយុ ១៨ ឆ្នាំ។ អ្នកឡើងយានអវកាសដែលដើរដល់ ៩៩.៩% នៃល្បឿនពន្លឺ ទៅរកផ្កាយ ស៊ីរ្យូស — ចម្ងាយ ៨.៦ ឆ្នាំពន្លឺ។ ដោយសារការពន្យារពេលវេលា អ្នកនៅលើយានត្រឹមតែប្រហែល ៥ ខែប៉ុណ្ណោះ ក្នុងដំណើរទាំងមូល។"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Question & choices */}
        <div className="px-6 sm:px-8 pt-6 pb-6">
          <p
            className={`text-white font-bold text-base leading-snug mb-6 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "When you arrive at Sirius and look back at Earth — how many years have passed for your friends at school?",
              "នៅពេលអ្នកទៅដល់ផ្កាយ ស៊ីរ្យូស ហើយក្រឡេកមើលក្រោយទៅផែនដី — ប៉ុន្មានឆ្នាំបានផ្លាស់ប្តូរសម្រាប់មិត្តភក្តិរបស់អ្នកនៅសាលា?"
            )}
          </p>

          <div className="flex flex-col gap-3 mb-6">
            {CHOICES.map((c) => {
              const isSelected = selected === c.key;
              const isRight = c.key === CORRECT;
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
                    className={`text-sm font-medium leading-snug ${textColor} ${
                      kh ? "font-khmer leading-loose" : ""
                    }`}
                  >
                    {kh ? c.kh : c.en}
                  </span>
                  {revealed && isRight && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 ml-auto flex-shrink-0" />
                  )}
                  {revealed && isSelected && !isRight && (
                    <XCircle className="w-5 h-5 text-red-400 ml-auto flex-shrink-0" />
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
                    {t(
                      "While your clock ticks slowly at near light-speed, Earth's clock races forward — 8.6 years pass there for every ~5 months you experience.",
                      "ខណៈពេលដែលនាឡិការបស់អ្នកដើរយឺតនៅល្បឿនជិតពន្លឺ នាឡិកាផែនដីរត់ទៅមុខ — ៨.៦ ឆ្នាំ កន្លងផ្លាស់ ក្នុងរយៈពេលតែ ៥ ខែដែលអ្នកមានអារម្មណ៍។"
                    )}
                  </p>
                </div>

                {/* Explanation */}
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
                      ? "ត្រឹមត្រូវ! សម្រាប់មិត្តភក្តិរបស់អ្នកនៅលើផែនដី វាត្រូវចំណាយពេល ៨.៦ ឆ្នាំ ដើម្បីឱ្យអ្នកទៅដល់ផ្កាយនោះ។ ខណៈពេលដែលអ្នកមានអារម្មណ៍ថាទើបតែកន្លងផុតទៅពីរបីខែ ប៉ុន្តែផែនដីបានដើរទៅមុខជិតមួយទសវត្សរ៍ទៅហើយ!"
                      : "Correct! To your friends on Earth, it took 8.6 years for you to reach the star. While you felt like you only aged a few months, the Earth \"clock\" moved forward nearly a decade!"}
                  </p>
                </div>

                {/* Nickname submission form */}
                {!submitted ? (
                  <div
                    className="rounded-2xl border border-white/10 p-5 mb-4"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <p className={`text-white/60 text-sm font-semibold mb-1 ${kh ? "font-khmer" : ""}`}>
                      {t("Add your name to the leaderboard", "បន្ថែមឈ្មោះអ្នកទៅក្ដារលេខ")}
                    </p>
                    <p className={`text-white/30 text-xs mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "Choose a nickname — your real name won't be shown publicly.",
                        "ជ្រើសឈ្មោះហៅ — ឈ្មោះពិតរបស់អ្នកនឹងមិនត្រូវបានបង្ហាញជាសាធារណៈ។"
                      )}
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value.slice(0, 30))}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        placeholder={kh ? "ឈ្មោះហៅ…" : "Your nickname…"}
                        maxLength={30}
                        className={`flex-1 rounded-xl border border-white/15 bg-white/8 text-white text-sm px-4 py-2.5 placeholder-white/25 focus:outline-none focus:border-violet-400/50 transition-colors ${kh ? "font-khmer" : ""}`}
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
                        <span className={kh ? "font-khmer" : ""}>{t("Submit", "បញ្ជូន")}</span>
                      </button>
                    </div>
                    {submitError && (
                      <p className={`text-red-400 text-xs mt-2 ${kh ? "font-khmer" : ""}`}>
                        {t("Submission failed. Please try again.", "បញ្ជូនបរាជ័យ។ សូមព្យាយាមម្ដងទៀត។")}
                      </p>
                    )}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl border border-emerald-400/30 bg-emerald-400/8 p-4 mb-4 text-center"
                  >
                    <p className={`text-emerald-300 font-bold text-sm ${kh ? "font-khmer" : ""}`}>
                      {t("Score submitted! Check the leaderboard below. 🌌", "ពិន្ទុបានបញ្ជូន! មើលក្ដារលេខខាងក្រោម។ 🌌")}
                    </p>
                  </motion.div>
                )}

                {/* Reset */}
                <div className="flex justify-center mt-2">
                  <button
                    onClick={reset}
                    className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className={kh ? "font-khmer" : ""}>
                      {t("Try again", "សាកល្បងម្តងទៀត")}
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
