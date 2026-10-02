import { useEffect, useRef, useState } from "react";
import { createMapStyle } from "../lib/map-style";
import "maplibre-gl/dist/maplibre-gl.css";
export function SchoolLocation({
  latitude,
  longitude,
  label,
}: {
  latitude: number;
  longitude: number;
  label: string;
}) {
  const container = useRef<HTMLDivElement>(null),
    [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    let dispose = () => {};
    void import("maplibre-gl")
      .then((lib) => {
        if (cancelled || !container.current) return;
        lib.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
        const map = new lib.Map({
          container: container.current,
          style: createMapStyle(
            "/data/render/adm0.geojson",
            "/data/render/adm1.geojson",
            true,
          ),
          center: [longitude, latitude],
          zoom: 10,
          attributionControl: { compact: true },
        });
        const marker = new lib.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map);
        map.addControl(new lib.NavigationControl());
        map.on("error", () => setFailed(true));
        const resize = new ResizeObserver(() => map.resize());
        resize.observe(container.current);
        dispose = () => {
          resize.disconnect();
          marker.remove();
          map.remove();
        };
      })
      .catch(() => setFailed(true));
    return () => {
      cancelled = true;
      dispose();
    };
  }, [latitude, longitude]);
  return (
    <div className="relative h-full min-h-64">
      <div ref={container} className="absolute inset-0" aria-label={label} />
      {failed && (
        <p role="status" className="absolute bottom-2 bg-white p-2">
          Map unavailable / ផែនទីមិនអាចប្រើបាន
        </p>
      )}
      <a
        className="absolute top-2 left-2 bg-white rounded p-2 text-sm"
        href="/map"
      >
        Digital Map ↗
      </a>
    </div>
  );
}
