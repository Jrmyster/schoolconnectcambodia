import { useState } from "react";
import { FileDown, Loader2, CheckCircle2 } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { generateResourceGuide } from "@/lib/generatePDF";

interface DownloadGuideButtonProps {
  className?: string;
}

export function DownloadGuideButton({ className = "" }: DownloadGuideButtonProps) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [progress, setProgress] = useState("");

  async function handleClick() {
    if (status === "loading") return;
    setStatus("loading");
    setProgress(kh ? "កំពុងរៀបចំ…" : "Preparing…");
    try {
      await generateResourceGuide((step) => setProgress(step));
      setStatus("done");
      setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("idle");
      setProgress("");
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={status === "loading"}
      className={`inline-flex flex-col items-center gap-1 px-6 py-3.5 rounded-xl font-bold shadow-md
        bg-primary border-2 border-amber-400 text-white
        hover:bg-primary/90 hover:border-amber-300 hover:-translate-y-0.5 hover:shadow-lg
        active:scale-95 transition-all disabled:opacity-75 disabled:cursor-wait disabled:hover:translate-y-0
        ${kh ? "font-khmer text-base" : "text-sm"}
        ${className}`}
    >
      <span className="flex items-center gap-2.5">
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
        ) : status === "done" ? (
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-amber-300" />
        ) : (
          <FileDown className="w-4 h-4 flex-shrink-0" />
        )}
        {status === "done"
          ? t("PDF Downloaded!", "PDF បានទាញយករួច!")
          : t("Download Offline Resource Guide (PDF)", "ទាញយកមគ្គុទ្ទេសក៍ធនធាន (PDF)")}
      </span>

      {status === "loading" && progress && (
        <span className={`text-[10px] font-normal text-amber-200/80 leading-none ${kh ? "font-khmer" : ""}`}>
          {progress}
        </span>
      )}
    </button>
  );
}
