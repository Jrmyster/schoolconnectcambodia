import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Need, useUpdateNeed } from "@workspace/api-client-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PhotoUploader } from "@/components/PhotoUploader";
import { X } from "lucide-react";
import { useState } from "react";

const CATEGORY_OPTIONS = [
  { value: "Electronics",      en: "Electronics & Tech",        kh: "គ្រឿងអេឡិចត្រូនិក និងបច្ចេកវិទ្យា" },
  { value: "Books",            en: "Books & Stationery",         kh: "សៀវភៅ និងសម្ភារៈសិក្សា" },
  { value: "Furniture",        en: "Furniture",                  kh: "គ្រឿងសង្ហារឹម" },
  { value: "Infrastructure",   en: "Infrastructure & Repair",    kh: "ហេដ្ឋារចនាសម្ព័ន្ធ និងការជួសជុល" },
  { value: "WASH",             en: "Water & Sanitation (WASH)",  kh: "ទឹកស្អាត និងអនាម័យ" },
  { value: "Sports",           en: "Sports & Arts",              kh: "កីឡា និងសិល្បៈ" },
  { value: "Teacher Training", en: "Teacher Training",           kh: "ការបណ្តុះបណ្តាលគ្រូ" },
  { value: "Other",            en: "Other",                      kh: "ផ្សេងៗ" },
];

interface Props {
  need: Need;
  onClose: () => void;
}

interface FormValues {
  titleEn: string;
  titleKh: string;
  descriptionEn: string;
  descriptionKh: string;
  category: string;
  goalAmount: number;
  contactEmail: string;
}

export function EditNeedModal({ need, onClose }: Props) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const { toast } = useToast();
  const updateNeed = useUpdateNeed();
  const [photoUrl, setPhotoUrl] = useState(need.photoUrl ?? "");

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      titleEn: need.titleEn,
      titleKh: need.titleKh,
      descriptionEn: need.descriptionEn,
      descriptionKh: need.descriptionKh,
      category: need.category,
      goalAmount: need.goalAmount,
      contactEmail: need.contactEmail ?? "",
    },
  });

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-background text-sm";
  const labelClass = `font-semibold text-foreground block mb-1.5 ${language === "kh" ? "font-khmer text-base" : "text-sm"}`;

  const onSubmit = (values: FormValues) => {
    updateNeed.mutate(
      { id: need.id, data: { ...values, goalAmount: Number(values.goalAmount), photoUrl: photoUrl || undefined } },
      {
        onSuccess: () => {
          toast({ title: t("Changes Saved!", "បានរក្សាទុករួចរាល់!"), description: t("The need has been updated.", "តម្រូវការត្រូវបានធ្វើបច្ចុប្បន្នភាព។") });
          onClose();
        },
        onError: (err: any) => toast({ variant: "destructive", title: "Error", description: err.message }),
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
          <h2 className={`text-xl font-bold text-foreground ${language === "kh" ? "font-khmer" : ""}`}>
            ✏️ {t("Edit Need", "កែប្រែតម្រូវការ")}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Category */}
          <div>
            <label className={labelClass}>{t("Category", "ប្រភេទ")}*</label>
            <select {...register("category", { required: true })} className={inputClass}>
              {CATEGORY_OPTIONS.map(c => (
                <option key={c.value} value={c.value}>
                  {language === "kh" ? c.kh : c.en}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title EN */}
            <div>
              <label className={labelClass}>{t("Title (English)", "ចំណងជើង (ភាសាអង់គ្លេស)")}*</label>
              <input {...register("titleEn", { required: true })} className={inputClass} />
              {errors.titleEn && <p className="text-destructive text-xs mt-1">{t("Required", "ទាមទារ")}</p>}
            </div>

            {/* Title KH */}
            <div>
              <label className={labelClass}>{t("Title (Khmer)", "ចំណងជើង (ភាសាខ្មែរ)")}*</label>
              <input {...register("titleKh", { required: true })} className={`${inputClass} font-khmer`} />
              {errors.titleKh && <p className="text-destructive text-xs mt-1">{t("Required", "ទាមទារ")}</p>}
            </div>

            {/* Description EN */}
            <div>
              <label className={labelClass}>{t("Description (English)", "ការពិពណ៌នា (ភាសាអង់គ្លេស)")}*</label>
              <textarea {...register("descriptionEn", { required: true })} rows={4} className={`${inputClass} resize-none leading-relaxed`} />
            </div>

            {/* Description KH */}
            <div>
              <label className={labelClass}>{t("Description (Khmer)", "ការពិពណ៌នា (ភាសាខ្មែរ)")}*</label>
              <textarea {...register("descriptionKh", { required: true })} rows={4} className={`${inputClass} resize-none font-khmer leading-loose`} />
            </div>
          </div>

          {/* Goal Amount */}
          <div>
            <label className={labelClass}>{t("Goal Amount (USD)", "ចំនួនទឹកប្រាក់គោលដៅ (ដុល្លារ)")}*</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 font-bold text-muted-foreground">$</span>
              <input type="number" {...register("goalAmount", { required: true, min: 1 })} className={`${inputClass} pl-8`} />
            </div>
          </div>

          {/* Contact Email */}
          <div>
            <label className={labelClass}>{t("Contact Email", "អ៊ីមែលទំនាក់ទំនង")}</label>
            <input type="email" {...register("contactEmail")} className={inputClass} />
          </div>

          {/* Photo */}
          <PhotoUploader
            label={t("Need Photo", "រូបថតតម្រូវការ")}
            onUpload={setPhotoUrl}
            currentUrl={photoUrl}
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}
              className={`px-6 py-2.5 rounded-xl ${language === "kh" ? "font-khmer" : ""}`}>
              {t("Cancel", "បោះបង់")}
            </Button>
            <Button type="submit" disabled={updateNeed.isPending}
              className={`px-6 py-2.5 rounded-xl ${language === "kh" ? "font-khmer" : ""}`}>
              {updateNeed.isPending ? t("Saving...", "កំពុងរក្សាទុក...") : t("Save", "រក្សាទុក")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
