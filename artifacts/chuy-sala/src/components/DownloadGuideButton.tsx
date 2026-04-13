import { FileDown } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

interface DownloadGuideButtonProps {
  className?: string;
}

export function DownloadGuideButton({ className = "" }: DownloadGuideButtonProps) {
  const t = useTranslation();
  const { language } = useLanguageStore();

  return (
    <a
      href={`${import.meta.env.BASE_URL}School_Connect_Resource_Guide.pdf`}
      download="School_Connect_Resource_Guide.pdf"
      className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold shadow-md
        bg-primary border-2 border-amber-400 text-white
        hover:bg-primary/90 hover:border-amber-300 hover:-translate-y-0.5 hover:shadow-lg
        active:scale-95 transition-all
        ${language === "kh" ? "font-khmer text-base" : "text-sm"}
        ${className}`}
    >
      <FileDown className="w-4 h-4 flex-shrink-0" />
      {t("Download Offline Resource Guide (PDF)", "ទាញយកមគ្គុទ្ទេសក៍ធនធាន (PDF)")}
    </a>
  );
}
