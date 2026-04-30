import { useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { ALL_SEARCH_ENTRIES, type SearchEntry } from "@/data/searchIndex";
import { useTranslation, useLanguageStore } from "@/store/use-language";

const ADMIN_PREFIXES = [
  "/admin",
  "/login",
  "/logout",
  "/signup",
  "/sign-in",
  "/sign-up",
  "/profile",
  "/account",
  "/dashboard",
  "/settings",
];

function isFeaturable(entry: SearchEntry): boolean {
  const href = entry.href.toLowerCase();
  if (!href.startsWith("/")) return false;
  if (href.startsWith("//")) return false;
  return !ADMIN_PREFIXES.some((p) => href === p || href.startsWith(`${p}/`));
}

// Compute day-of-year in Cambodia local time (Asia/Phnom_Penh, UTC+7, no DST)
// so the topic rotates at local midnight in Phnom Penh — not at UTC midnight,
// which would otherwise flip the pill at 7 AM local.
function dayOfYearPhnomPenh(date: Date): number {
  const PHNOM_PENH_OFFSET_MS = 7 * 60 * 60 * 1000;
  const local = new Date(date.getTime() + PHNOM_PENH_OFFSET_MS);
  const start = Date.UTC(local.getUTCFullYear(), 0, 0);
  const today = Date.UTC(
    local.getUTCFullYear(),
    local.getUTCMonth(),
    local.getUTCDate(),
  );
  return Math.floor((today - start) / 86_400_000);
}

function pickTopicOfTheDay(now: Date = new Date()): SearchEntry | null {
  const featurable = ALL_SEARCH_ENTRIES.filter(isFeaturable);
  if (featurable.length === 0) return null;
  const idx = dayOfYearPhnomPenh(now) % featurable.length;
  return featurable[idx];
}

export function TopicOfTheDay() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const topic = useMemo(() => pickTopicOfTheDay(), []);
  if (!topic) return null;

  const Icon = topic.icon;

  return (
    <div
      className="flex justify-center animate-in fade-in slide-in-from-bottom-3 duration-700 delay-300"
      data-testid="topic-of-the-day"
    >
      <Link
        href={topic.href}
        data-testid="topic-of-the-day-link"
        aria-label={t(
          `Topic of the Day: ${topic.titleEn}`,
          `ប្រធានបទប្រចាំថ្ងៃ៖ ${topic.titleKh}`,
        )}
        className="group inline-flex max-w-full items-center gap-2 sm:gap-2.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 hover:border-white/60 px-4 py-2 sm:px-5 sm:py-2.5 text-white shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
      >
        <span aria-hidden="true" className="text-base sm:text-lg leading-none">
          🌟
        </span>

        <span
          className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/85 whitespace-nowrap ${
            kh ? "font-khmer normal-case tracking-normal text-[12px] sm:text-[13px]" : ""
          }`}
        >
          {t("Topic of the Day", "ប្រធានបទប្រចាំថ្ងៃ")}
        </span>

        <span className="hidden sm:inline-block h-4 w-px bg-white/30" aria-hidden="true" />

        <Icon
          className="hidden sm:inline-block w-4 h-4 text-white/90 flex-shrink-0"
          aria-hidden="true"
        />

        <span
          className="text-sm sm:text-[15px] font-semibold text-white truncate max-w-[55vw] sm:max-w-md"
          data-testid="topic-of-the-day-title"
        >
          <span>{topic.titleEn}</span>
          <span className="mx-1.5 text-white/50">/</span>
          <span className="font-khmer">{topic.titleKh}</span>
        </span>

        <ArrowRight
          className="w-4 h-4 text-white/90 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
