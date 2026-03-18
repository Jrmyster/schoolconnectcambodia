import { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  useCreateSchool, 
  useCreateNeed, 
  useListSchools, 
  NeedCategory,
  CreateSchoolRequest,
  CreateNeedRequest
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { PhotoUploader } from "@/components/PhotoUploader";
import { useToast } from "@/hooks/use-toast";
import { Building, Heart } from "lucide-react";

export function Admin() {
  const [activeTab, setActiveTab] = useState<"school" | "need">("school");
  const [schoolPhotoUrl, setSchoolPhotoUrl] = useState("");
  const [needPhotoUrl, setNeedPhotoUrl] = useState("");
  const { toast } = useToast();
  const { data: schools } = useListSchools();

  const createSchoolMutation = useCreateSchool();
  const createNeedMutation = useCreateNeed();

  // School Form
  const { register: registerSchool, handleSubmit: handleSchoolSubmit, reset: resetSchool } = useForm<CreateSchoolRequest>();

  const onSchoolSubmit = (data: CreateSchoolRequest) => {
    const payload = {
      ...data,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      studentCount: data.studentCount ? Number(data.studentCount) : undefined,
      photoUrl: schoolPhotoUrl || undefined,
    };
    
    createSchoolMutation.mutate({ data: payload }, {
      onSuccess: () => {
        toast({ title: "Success", description: "School created successfully" });
        resetSchool();
        setSchoolPhotoUrl("");
      },
      onError: (err: any) => {
        toast({ variant: "destructive", title: "Error", description: err.message });
      }
    });
  };

  // Need Form
  const { register: registerNeed, handleSubmit: handleNeedSubmit, reset: resetNeed } = useForm<CreateNeedRequest>();

  const onNeedSubmit = (data: CreateNeedRequest) => {
    const payload = {
      ...data,
      schoolId: Number(data.schoolId),
      goalAmount: Number(data.goalAmount),
      photoUrl: needPhotoUrl || undefined,
    };

    createNeedMutation.mutate({ data: payload }, {
      onSuccess: () => {
        toast({ title: "Success", description: "Need created successfully" });
        resetNeed();
        setNeedPhotoUrl("");
      },
      onError: (err: any) => {
        toast({ variant: "destructive", title: "Error", description: err.message });
      }
    });
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-background";

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage schools and submit new needs to the platform.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 bg-card p-2 rounded-2xl shadow-sm border border-border">
          <button
            onClick={() => setActiveTab("school")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "school" 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Building className="w-5 h-5" />
            Add School
          </button>
          <button
            onClick={() => setActiveTab("need")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "need" 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Heart className="w-5 h-5" />
            Create Need
          </button>
        </div>

        <div className="bg-card rounded-3xl shadow-xl border border-border p-8">
          {activeTab === "school" && (
            <form onSubmit={handleSchoolSubmit(onSchoolSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold border-b pb-4">Register New School</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Name (English)*</label>
                  <input {...registerSchool("nameEn", { required: true })} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground font-khmer">Name (Khmer)*</label>
                  <input {...registerSchool("nameKh", { required: true })} className={`${inputClass} font-khmer`} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Province*</label>
                  <input {...registerSchool("province", { required: true })} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">District*</label>
                  <input {...registerSchool("district", { required: true })} className={inputClass} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Latitude*</label>
                  <input type="number" step="any" {...registerSchool("latitude", { required: true })} className={inputClass} placeholder="12.5" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Longitude*</label>
                  <input type="number" step="any" {...registerSchool("longitude", { required: true })} className={inputClass} placeholder="105.0" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Contact Email</label>
                  <input type="email" {...registerSchool("contactEmail")} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Student Count</label>
                  <input type="number" {...registerSchool("studentCount")} className={inputClass} />
                </div>

                <div className="md:col-span-2">
                  <PhotoUploader
                    label="School Photo"
                    onUpload={setSchoolPhotoUrl}
                    currentUrl={schoolPhotoUrl}
                  />
                </div>
              </div>

              <div className="pt-4 border-t mt-8 flex justify-end">
                <Button type="submit" disabled={createSchoolMutation.isPending} className="px-8 py-6 rounded-xl text-lg font-bold">
                  {createSchoolMutation.isPending ? "Saving..." : "Create School"}
                </Button>
              </div>
            </form>
          )}

          {activeTab === "need" && (
            <form onSubmit={handleNeedSubmit(onNeedSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold border-b pb-4">Create School Need</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-foreground">Select School*</label>
                  <select {...registerNeed("schoolId", { required: true })} className={inputClass}>
                    <option value="">-- Choose a school --</option>
                    {schools?.map(s => (
                      <option key={s.id} value={s.id}>{s.nameEn} ({s.province})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Title (English)*</label>
                  <input {...registerNeed("titleEn", { required: true })} className={inputClass} placeholder="e.g. 50 Library Books" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground font-khmer">Title (Khmer)*</label>
                  <input {...registerNeed("titleKh", { required: true })} className={`${inputClass} font-khmer`} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Description (English)*</label>
                  <textarea {...registerNeed("descriptionEn", { required: true })} rows={4} className={`${inputClass} resize-none`} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground font-khmer">Description (Khmer)*</label>
                  <textarea {...registerNeed("descriptionKh", { required: true })} rows={4} className={`${inputClass} resize-none font-khmer`} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Category*</label>
                  <select {...registerNeed("category", { required: true })} className={inputClass}>
                    {Object.values(NeedCategory).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Goal Amount (USD)*</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 font-bold text-muted-foreground">$</span>
                    <input type="number" {...registerNeed("goalAmount", { required: true, min: 1 })} className={`${inputClass} pl-8`} placeholder="500" />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <PhotoUploader
                    label="Need Photo"
                    onUpload={setNeedPhotoUrl}
                    currentUrl={needPhotoUrl}
                  />
                </div>
              </div>

              <div className="pt-4 border-t mt-8 flex justify-end">
                <Button type="submit" disabled={createNeedMutation.isPending} className="px-8 py-6 rounded-xl text-lg font-bold">
                  {createNeedMutation.isPending ? "Creating..." : "Post Need"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
