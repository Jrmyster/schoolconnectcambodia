import { useState } from "react";
import { useParams, Link } from "wouter";
import { MapContainer, TileLayer, Marker, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import { useGetSchool, useListNeeds } from "@workspace/api-client-react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { EditSchoolModal } from "@/components/EditSchoolModal";
import { NeedCard } from "@/components/NeedCard";
import { SendSchoolMessageModal } from "@/components/SendSchoolMessageModal";
import { Loader2, MapPin, Phone, Mail, Users, Pencil, ArrowLeft, GraduationCap, MessageSquare } from "lucide-react";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const schoolIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function FlyToMarker({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  map.setView([lat, lng], 13, { animate: true });
  return null;
}

export function SchoolProfile() {
  const { id } = useParams<{ id: string }>();
  const schoolId = parseInt(id, 10);
  const t = useTranslation();
  const { language } = useLanguageStore();
  const { user } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);

  const { data: school, isLoading, refetch } = useGetSchool(schoolId);
  const { data: needs } = useListNeeds({ schoolId });

  const activeNeeds = needs?.filter(n => n.status === "active") ?? [];
  const canEdit = !!(user && user.schoolId === schoolId);
  // Schools can message OTHER schools (not their own).
  const canMessage =
    !!user && user.role === "school" && !!user.schoolId && user.schoolId !== schoolId;

  const labelClass = `text-xs font-semibold uppercase tracking-wide text-muted-foreground ${language === "kh" ? "font-khmer" : ""}`;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <GraduationCap className="w-16 h-16 text-muted-foreground/30" />
        <p className={`text-muted-foreground ${language === "kh" ? "font-khmer text-base" : "text-sm"}`}>
          {t("School not found.", "រកសាលាមិនឃើញ។")}
        </p>
        <Link href="/map" className="text-primary text-sm font-semibold hover:underline">
          ← {t("Back to Map", "ត្រឡប់ទៅផែនទី")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Back nav */}
      <Link href="/map" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
        <ArrowLeft className="w-4 h-4" />
        {t("Back to Map", "ត្រឡប់ទៅផែនទី")}
      </Link>

      {/* ── SCHOOL HEADER ── */}
      <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-xl shadow-black/5">
        {/* Photo banner */}
        {school.photoUrl && (
          <div className="h-56 md:h-72 overflow-hidden">
            <img
              src={school.photoUrl}
              alt={school.nameEn}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Name row with Edit button */}
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <h1 className={`font-display text-2xl md:text-3xl font-bold text-foreground leading-tight ${!school.photoUrl ? "mt-1" : ""}`}>
                {school.nameEn}
              </h1>
              {/* Khmer name + Edit button side-by-side */}
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-khmer text-lg text-muted-foreground leading-snug">
                  {school.nameKh}
                </span>
                {canEdit && (
                  <button
                    onClick={() => setEditOpen(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all hover:scale-105 active:scale-95"
                    title={t("Edit school profile", "កែប្រែប្រវត្តិសាលា")}
                  >
                    <Pencil className="w-3.5 h-3.5 text-primary" />
                    <span className={language === "kh" ? "font-khmer text-sm" : ""}>{t("Edit", "កែប្រែ")}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
              <MapPin className="w-3.5 h-3.5" /> {school.province}
            </span>
            {school.district && school.district !== "—" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold">
                {school.district}
              </span>
            )}
            {school.studentCount && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold">
                <Users className="w-3.5 h-3.5" /> {school.studentCount.toLocaleString()} {t("students", "សិស្ស")}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold">
              {activeNeeds.length} {t("Active Needs", "តម្រូវការសកម្ម")}
            </span>
          </div>

          {/* Description */}
          {school.description && (
            <p className={`text-muted-foreground leading-relaxed mb-6 ${language === "kh" ? "font-khmer text-base leading-loose" : "text-sm"}`}>
              {school.description}
            </p>
          )}

          {/* Message school button (visible to other school accounts) */}
          {canMessage && (
            <div className="mb-5">
              <button
                type="button"
                onClick={() => setMessageOpen(true)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 text-white text-sm font-bold hover:bg-sky-700 hover:shadow-md transition-all min-h-[44px] ${language === "kh" ? "font-khmer text-base" : ""}`}
              >
                <MessageSquare className="w-4 h-4" />
                {t("Message This School", "ផ្ញើសារទៅសាលានេះ")}
              </button>
            </div>
          )}

          {/* Contact row */}
          <div className="flex flex-wrap gap-4">
            {school.contactEmail && (
              <a
                href={`mailto:${school.contactEmail}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary/70" />
                {school.contactEmail}
              </a>
            )}
            {school.contactPhone && (
              <a
                href={`tel:${school.contactPhone}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary/70" />
                {school.contactPhone}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── LOCATION MAP ── */}
      {school.latitude && school.longitude && (
        <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-xl shadow-black/5">
          <div className="p-6 pb-0 flex items-center justify-between">
            <h2 className={`text-lg font-bold text-foreground ${language === "kh" ? "font-khmer" : ""}`}>
              📍 {t("Location", "ទីតាំង")}
            </h2>
            <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded-lg">
              {school.latitude.toFixed(5)}, {school.longitude.toFixed(5)}
            </span>
          </div>
          <div className="h-64 mt-4 relative z-0">
            <MapContainer
              center={[school.latitude, school.longitude]}
              zoom={13}
              className="w-full h-full"
              zoomControl={false}
              scrollWheelZoom={false}
            >
              <ZoomControl position="topright" />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FlyToMarker lat={school.latitude} lng={school.longitude} />
              <Marker position={[school.latitude, school.longitude]} icon={schoolIcon} />
            </MapContainer>
          </div>
        </div>
      )}

      {/* ── ACTIVE NEEDS ── */}
      <section>
        <h2 className={`text-xl font-bold text-foreground mb-4 ${language === "kh" ? "font-khmer" : ""}`}>
          💙 {t("Active Needs", "តម្រូវការសកម្ម")}
        </h2>
        {activeNeeds.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-10 text-center">
            <GraduationCap className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className={`text-muted-foreground ${language === "kh" ? "font-khmer text-base" : "text-sm"}`}>
              {t("No active needs at this time.", "គ្មានតម្រូវការសកម្មនៅពេលនេះ។")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeNeeds.map(need => (
              <NeedCard key={need.id} need={need} />
            ))}
          </div>
        )}
      </section>

      {/* Edit Modal */}
      {editOpen && (
        <EditSchoolModal
          school={school}
          onClose={() => {
            setEditOpen(false);
            refetch();
          }}
        />
      )}

      {/* Send Message Modal */}
      {messageOpen && (
        <SendSchoolMessageModal
          toSchoolId={schoolId}
          recipientNameEn={school.nameEn}
          recipientNameKh={school.nameKh}
          onClose={() => setMessageOpen(false)}
        />
      )}
    </div>
  );
}
