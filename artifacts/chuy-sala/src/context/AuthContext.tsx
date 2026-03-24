import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface AuthSchool {
  id: number;
  nameEn: string;
  nameKh: string;
  province: string;
  district: string;
  photoUrl?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  description?: string | null;
  studentCount?: number | null;
}

export interface AuthUser {
  id: number;
  email: string;
  schoolId: number | null;
  school: AuthSchool | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, schoolId?: number) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const API = "/api/auth";

async function apiCall<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, { credentials: "include", ...options });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Request failed");
  return data as T;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiCall<AuthUser>(`${API}/me`)
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const u = await apiCall<AuthUser>(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setUser(u);
  };

  const register = async (email: string, password: string, schoolId?: number) => {
    const u = await apiCall<AuthUser>(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, schoolId }),
    });
    setUser(u);
  };

  const logout = async () => {
    await fetch(`${API}/logout`, { method: "POST", credentials: "include" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
