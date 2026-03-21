import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "./custom-fetch";
import type { School, Need } from "./generated/api.schemas";

export interface UpdateSchoolData {
  nameEn?: string;
  nameKh?: string;
  province?: string;
  district?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  studentCount?: number;
  photoUrl?: string;
  latitude?: number;
  longitude?: number;
}

export interface UpdateNeedData {
  titleEn?: string;
  titleKh?: string;
  descriptionEn?: string;
  descriptionKh?: string;
  category?: string;
  goalAmount?: number;
  contactEmail?: string;
  photoUrl?: string;
}

export function useUpdateSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSchoolData }) =>
      customFetch<School>(`/api/schools/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/schools"] });
    },
  });
}

export function useUpdateNeed() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateNeedData }) =>
      customFetch<Need>(`/api/needs/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/needs"] });
    },
  });
}
