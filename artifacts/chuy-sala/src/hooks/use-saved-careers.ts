import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export interface SavedCareer {
  id: number;
  userId: number;
  majorKey: string;
  careerKey: string;
  savedAt: string;
}

export function useSavedCareers() {
  const { user } = useAuth();
  return useQuery<SavedCareer[]>({
    queryKey: ["saved-careers"],
    queryFn: async () => {
      const res = await fetch(`${BASE}/api/saved-careers`, { credentials: "include" });
      if (res.status === 401) return [];
      if (!res.ok) throw new Error("Failed to fetch saved careers");
      return res.json();
    },
    enabled: !!user,
    staleTime: 30_000,
  });
}

export function useToggleSavedCareer() {
  const qc = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      majorKey,
      careerKey,
      isSaved,
    }: {
      majorKey: string;
      careerKey: string;
      isSaved: boolean;
    }) => {
      if (!user) throw new Error("Not authenticated");
      const res = await fetch(`${BASE}/api/saved-careers`, {
        method: isSaved ? "DELETE" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ majorKey, careerKey }),
      });
      if (!res.ok) throw new Error("Request failed");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["saved-careers"] });
    },
  });
}
