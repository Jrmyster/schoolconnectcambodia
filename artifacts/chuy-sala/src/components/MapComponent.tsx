import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import { Link } from "wouter";
import { School, Need } from "@workspace/api-client-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { GraduationCap, MapPin, Heart } from "lucide-react";

// Fix Leaflet marker icons in React
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const customIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

interface MapComponentProps {
  schools: School[];
  needs: Need[];
}

export function MapComponent({ schools, needs }: MapComponentProps) {
  const t = useTranslation();
  const { language } = useLanguageStore();

  useEffect(() => {
    // Ensure the default icon is properly set if components use it directly
    L.Marker.prototype.options.icon = customIcon;
  }, []);

  // Cambodia coordinates
  const center: [number, number] = [12.5657, 104.9910];

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-border shadow-xl shadow-black/5 relative z-0">
      <MapContainer 
        center={center} 
        zoom={7} 
        className="w-full h-full"
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />
        
        {schools.map((school) => {
          // Count active needs for this school
          const schoolNeeds = needs.filter(n => n.schoolId === school.id && n.status === 'active');
          const needsCount = schoolNeeds.length;
          
          if (!school.latitude || !school.longitude) return null;

          return (
            <Marker 
              key={school.id} 
              position={[school.latitude, school.longitude]}
              icon={customIcon}
            >
              <Popup className="rounded-xl overflow-hidden shadow-lg border-0 p-0 m-0">
                <div className="p-1 min-w-[220px]">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`font-bold text-sm m-0 leading-tight ${language === 'kh' ? 'font-khmer' : 'font-display'}`}>
                        {t(school.nameEn, school.nameKh)}
                      </h4>
                      <p className="text-xs text-muted-foreground m-0 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {school.province}
                      </p>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    {needsCount > 0 ? (
                      <div className="flex items-center gap-2 text-sm text-accent font-semibold">
                        <Heart className="w-4 h-4 fill-current" />
                        {needsCount} {t("Active Needs", "តម្រូវការសកម្ម")}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground italic">
                        {t("No active needs", "គ្មានតម្រូវការសកម្មទេ")}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    <Link href={`/school/${school.id}`} className="flex-1 text-center bg-primary text-white text-xs font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-colors">
                      {t("View Profile", "មើលប្រវត្តិ")}
                    </Link>
                    <Link href={`/needs?schoolId=${school.id}`} className="flex-1 text-center bg-secondary text-secondary-foreground text-xs font-bold py-2.5 rounded-lg hover:bg-secondary/80 transition-colors">
                      {t("Needs", "តម្រូវការ")}
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
