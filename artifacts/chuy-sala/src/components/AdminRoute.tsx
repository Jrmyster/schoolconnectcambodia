import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { useEffect, type ComponentType } from "react";
import { ShieldOff, Loader2 } from "lucide-react";

export function AdminRoute({ component: Component }: { component: ComponentType }) {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!user.isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4"
        style={{ background: "linear-gradient(135deg,#F0F7FF 0%,#EFF6FF 100%)" }}>
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(135deg,#7F1D1D,#DC2626)" }}
        >
          <ShieldOff size={36} color="white" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Access Restricted</h1>
          <p className="text-slate-500 text-sm max-w-xs">
            This area is reserved for authorized government and staff administrators only.
          </p>
        </div>
      </div>
    );
  }

  return <Component />;
}
