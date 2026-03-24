import { useForm } from "react-hook-form";
import { School, useUpdateSchool } from "@workspace/api-client-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PhotoUploader } from "@/components/PhotoUploader";
import { X } from "lucide-react";
import { useState } from "react";

const CAMBODIA_PROVINCES = [
  "Banteay Meanchey","Battambang","Kampong Cham","Kampong Chhnang","Kampong Speu",
  "Kampong Thom","Kampot","Kandal","Kep","Koh Kong","Kratié","Mondulkiri",
  "Oddar Meanchey","Pailin","Phnom Penh","Preah Sihanouk","Preah Vihear",
  "Prey Veng","Pursat","Ratanakiri","Siem Reap","Stung Treng","Svay Rieng",
  "Takéo","Tboung Khmum",
];

interface Props {
  school: School;
  onClose: () => void;
}

interface FormValues {
  nameEn: string;
  nameKh: string;
  province: string;
  district: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  studentCount: number | "";
  latitude: number | "";
  longitude: number | "";
}

export function EditSchoolModal({ school, onClose }: Props) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const { toast } = useToast();
  const updateSchool = useUpdateSchool();
  const [photoUrl, setPhotoUrl] = useState(school.photoUrl ?? "");

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      nameEn: school.nameEn ?? "",
      nameKh: school.nameKh ?? "",
      province: school.province ?? "",
      district: school.district ?? "",
      description: school.description ?? "",
      contactEmail: school.contactEmail ?? "",
      contactPhone: school.contactPhone ?? "",
      studentCount: school.studentCount ?? "",
      latitude: school.latitude ?? "",
      longitude: school.longitude ?? "",
    },
  });

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-background text-sm";
  const labelClass = `font-semibold text-foreground block mb-1.5 ${language === "kh" ? "font-khmer text-base" : "text-sm"}`;

  const onSubmit = (values: FormValues) => {
    const payload = {
      ...values,
      studentCount: values.studentCount !== "" ? Number(values.studentCount) : undefined,
      latitude: values.latitude !== "" ? Number(values.latitude) : undefined,
      longitude: values.longitude !== "" ? Number(values.longitude) : undefined,
      photoUrl: photoUrl || undefined,
    };
    updateSchool.mutate(
      { id: school.id, data: payload },
      {
        onSuccess: () => {
          toast({ title: t("Changes Saved!", "បានរក្សាទុករួចរាល់!"), description: t("School profile updated.", "ប្រវត្តិសាលាត្រូវបានធ្វើបច្ចុប្បន្នភាព។") });
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
            ✏️ {t("Edit School", "កែប្រែប្រវត្តិសាលា")}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name EN */}
            <div>
              <label className={labelClass}>{t("School Name (English)", "ឈ្មោះសាលា (ភាសាអង់គ្លេស)")}*</label>
              <input {...register("nameEn", { required: true })} className={inputClass} />
              {errors.nameEn && <p className="text-destructive text-xs mt-1">{t("Required", "ទាមទារ")}</p>}
            </div>

            {/* Name KH */}
            <div>
              <label className={labelClass}>{t("School Name (Khmer)", "ឈ្មោះសាលា (ភាសាខ្មែរ)")}*</label>
              <input {...register("nameKh", { required: true })} className={`${inputClass} font-khmer`} />
              {errors.nameKh && <p className="text-destructive text-xs mt-1">{t("Required", "ទាមទារ")}</p>}
            </div>

            {/* Province */}
            <div>
              <label className={labelClass}>{t("Province", "ខេត្ត")}*</label>
              <select {...register("province", { required: true })} className={inputClass}>
                <option value="">{t("Select province", "ជ្រើសរើសខេត្ត")}</option>
                {CAMBODIA_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* District */}
            <div>
              <label className={labelClass}>{t("District", "ស្រុក/ខណ្ឌ")}</label>
              <input {...register("district")} className={inputClass} />
            </div>

            {/* Contact Email */}
            <div>
              <label className={labelClass}>{t("Contact Email", "អ៊ីមែលទំនាក់ទំនង")}</label>
              <input type="email" {...register("contactEmail")} className={inputClass} />
            </div>

            {/* Contact Phone */}
            <div>
              <label className={labelClass}>{t("Contact Phone", "ទូរស័ព្ទទំនាក់ទំនង")}</label>
              <input {...register("contactPhone")} className={inputClass} />
            </div>
          </div>

          {/* Student Count */}
          <div>
            <label className={labelClass}>{t("Student Count", "ចំនួនសិស្ស")}</label>
            <input type="number" {...register("studentCount")} className={inputClass} min={0} />
          </div>

          {/* Coordinates */}
          <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-4 space-y-4">
            <p className={`text-xs font-semibold text-primary/80 uppercase tracking-wide ${language === "kh" ? "font-khmer" : ""}`}>
              📍 {t("Map Coordinates — updates the pin on the map", "ផ្លាស់ប្ដូរម្ជុលលើផែនទី")}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`${labelClass} text-primary`}>{t("Latitude", "រយៈបណ្ណដេក")}</label>
                <input
                  type="number"
                  step="0.00001"
                  {...register("latitude", { min: -90, max: 90 })}
                  className={`${inputClass} font-mono`}
                  placeholder="e.g. 12.5657"
                />
              </div>
              <div>
                <label className={`${labelClass} text-primary`}>{t("Longitude", "រយៈបណ្ណឈរ")}</label>
                <input
                  type="number"
                  step="0.00001"
                  {...register("longitude", { min: -180, max: 180 })}
                  className={`${inputClass} font-mono`}
                  placeholder="e.g. 104.9910"
                />
              </div>
            </div>
            <p className={`text-xs text-muted-foreground ${language === "kh" ? "font-khmer" : ""}`}>
              {t("Tip: find exact coordinates on Google Maps → right-click → copy lat/long", "គន្លឹះ: ស្វែងរកតាម Google Maps → ចុចខាងស្ដាំ → ចម្លង lat/long")}
            </p>
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>{t("Description", "ការពិពណ៌នា")}</label>
            <textarea {...register("description")} rows={3} className={`${inputClass} resize-none leading-relaxed`} />
          </div>

          {/* Photo */}
          <PhotoUploader
            label={t("School Photo", "រូបថតសាលា")}
            onUpload={setPhotoUrl}
            currentUrl={photoUrl}
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}
              className={`px-6 py-2.5 rounded-xl ${language === "kh" ? "font-khmer" : ""}`}>
              {t("Cancel", "បោះបង់")}
            </Button>
            <Button type="submit" disabled={updateSchool.isPending}
              className={`px-6 py-2.5 rounded-xl ${language === "kh" ? "font-khmer" : ""}`}>
              {updateSchool.isPending
                ? t("Saving...", "កំពុងរក្សាទុក...")
                : t("Save Changes", "រក្សាទុកការផ្លាស់ប្ដូរ")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
