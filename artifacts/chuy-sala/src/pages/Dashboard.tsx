import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { StudentDashboard } from "./StudentDashboard";
import {
  Eye,
  EyeOff,
  Inbox,
  MapPin,
  Package,
  Send,
  Sparkles,
} from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/* ─── Dashboard dispatcher ────────────────────────────────────────
 * Routed at /dashboard. Login.tsx and the registration flow both
 * navigate here on success. We forward to the role-appropriate view:
 *   - student → personalised Student Dashboard (separate file)
 *   - school  → School Dashboard (defined below)
 * ────────────────────────────────────────────────────────────────── */

export function Dashboard() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const t = useTranslation();

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div role="status" className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1A6EA8] border-t-transparent rounded-full animate-spin" />
        <span className="sr-only">{t("Loading…", "កំពុងផ្ទុក…")}</span>
      </div>
    );
  }

  return <StudentDashboard />;
}
