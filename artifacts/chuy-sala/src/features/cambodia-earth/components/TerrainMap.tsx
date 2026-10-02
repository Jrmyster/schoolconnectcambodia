import { validSchoolPin, type SchoolPin } from "../lib/school-pins";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { Map as LibreMap, Marker, GeoJSONSource } from "maplibre-gl";
import type { FeatureCollection } from "geojson";
import { places, type Locale } from "@/features/cambodia-earth/data/places";
import { cities } from "@/features/cambodia-earth/data/cities";
import {
  cameraGroundDistance,
  cityLOD,
  urbanSource,
  urbanLayers,
  URBAN_LAYER_IDS,
} from "@/features/cambodia-earth/lib/urban";
import { copy } from "@/features/cambodia-earth/locales/earth";
import {
  type Coordinate,
  type RegionFeature,
} from "@/features/cambodia-earth/lib/geography";
import { BoundaryClient } from "@/features/cambodia-earth/lib/boundary-client";
import { registerTileCache } from "@/features/cambodia-earth/lib/tile-cache";
import { configureTerrainLOD } from "@/features/cambodia-earth/lib/map-lifecycle";
import { monitorMap } from "@/features/cambodia-earth/lib/map-performance";
import { ElevationSampler } from "@/features/cambodia-earth/lib/elevation";
import {
  createMapStyle,
  CAMBODIA_BOUNDS,
} from "@/features/cambodia-earth/lib/map-style";

export interface Inspection {
  coordinate: Coordinate;
  elevation: number | null;
  province: string | null;
  status: "pending" | "ready" | "unavailable";
}
export interface MapControls {
  home: () => void;
  goCity: (id: string) => void;
  goPlace: (id: string) => void;
  goProvince: (name: string) => void;
  zoom: (direction: number) => void;
  north: () => void;
  toggleTilt: () => void;
  clearInspection: () => void;
}
interface Props {
  schools: SchoolPin[];
  night: boolean;
  onCity: (id: string) => void;
  onLOD: (id: string | null) => void;
  locale: Locale;
  mode: "relief" | "satellite";
  exaggeration: number;
  borders: boolean;
  labels: boolean;
  lowData: boolean;
  measuring: boolean;
  points: Coordinate[];
  selectedProvince: string | null;
  onInspect: (point: Inspection) => void;
  onMeasure: (point: Coordinate) => void;
  onPlace: (id: string) => void;
  onOutside: () => void;
  onReady: (ready: boolean) => void;
}
const empty: FeatureCollection = { type: "FeatureCollection", features: [] };
const TerrainMap = forwardRef<MapControls, Props>(
  function TerrainMap(props, ref) {
    const container = useRef<HTMLDivElement>(null),
      map = useRef<LibreMap | null>(null);
    const geography = useRef<BoundaryClient | null>(null);
    const interaction = useRef(0),
      urbanSignature = useRef("");
    const selectionName = useRef<string | null>(null),
      selectionTicket = useRef(0);
    const previousPoints = useRef<Coordinate[] | null>(null),
      previousSettings = useRef<Props | null>(null);
    const latest = useRef(props);
    latest.current = props;
    const settingsRef = useRef<() => void>(() => {});
    const markers = useRef<
      { marker: Marker; button: HTMLButtonElement; id: string }[]
    >([]);
    const inspected = useRef<Coordinate | null>(null);
    const sampler = useRef(new ElevationSampler()),
      sampleAbort = useRef<AbortController | null>(null);
    const lastLowData = useRef(props.lowData);
    const activeCity = useRef<string | null>(null);
    const urbanTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
      undefined,
    );
    const [urbanStatus, setUrbanStatus] = useState<
      "off" | "loading" | "ready" | "error"
    >("off");
    const [state, setState] = useState<"loading" | "ready" | "error">(
      "loading",
    );
    const [tileError, setTileError] = useState(false);
    const [errorKind, setErrorKind] = useState<"setup" | "webgl" | "context">(
      "setup",
    );
    useEffect(() => {
      const instance = map.current;
      if (state !== "ready" || !instance) return;
      let cancelled = false;
      const schoolMarkers: Marker[] = [];
      void import("maplibre-gl")
        .then((lib) => {
          if (cancelled) return;
          for (const school of props.schools.filter(validSchoolPin)) {
            const link = document.createElement("a");
            link.className = "map-place map-school";
            link.href = `/school/${school.id}`;
            link.textContent = `🏫 ${props.locale === "km" ? school.nameKh : school.nameEn}`;
            link.setAttribute(
              "aria-label",
              `${link.textContent} — ${school.province}`,
            );
            link.addEventListener("click", (event) => event.stopPropagation());
            schoolMarkers.push(
              new lib.Marker({ element: link, anchor: "bottom" })
                .setLngLat([school.longitude, school.latitude])
                .addTo(instance),
            );
          }
        })
        .catch(() => setTileError(true));
      return () => {
        cancelled = true;
        schoolMarkers.forEach((marker) => marker.remove());
      };
    }, [state, props.schools, props.locale]);
    const t = copy[props.locale];
    const duration = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1000;
    function setGeoJSON(id: string, value: FeatureCollection | RegionFeature) {
      const source = map.current?.getSource(id) as GeoJSONSource | undefined;
      if (source) source.setData(value);
    }
    function syncMarkers() {
      const m = map.current;
      if (!m) return;
      const p = latest.current,
        w = m.getCanvas().clientWidth,
        h = m.getCanvas().clientHeight;
      for (const item of markers.current) {
        const coordinate = item.marker.getLngLat(),
          point = m.project(coordinate);
        item.button.style.display =
          p.labels &&
          point.x >= -100 &&
          point.x <= w + 100 &&
          point.y >= -60 &&
          point.y <= h + 60
            ? ""
            : "none";
        item.button.textContent = (cities.find(
          (city) => "city:" + city.id === item.id,
        ) || places.find((place) => place.id === item.id))!.name[p.locale];
      }
    }
    function applySettings() {
      const m = map.current,
        p = latest.current;
      if (!m || !m.getLayer("relief")) return;
      const old = previousSettings.current;
      if (!old || old.mode !== p.mode) {
        m.setLayoutProperty(
          "relief",
          "visibility",
          p.mode === "relief" ? "visible" : "none",
        );
        m.setLayoutProperty(
          "imagery",
          "visibility",
          p.mode === "satellite" ? "visible" : "none",
        );
        m.setPaintProperty(
          "hillshade",
          "hillshade-exaggeration",
          p.mode === "relief" ? 0.35 : 0.16,
        );
      }
      if (!old || old.borders !== p.borders)
        m.setLayoutProperty(
          "province-lines",
          "visibility",
          p.borders ? "visible" : "none",
        );
      if (!old || old.exaggeration !== p.exaggeration)
        m.setTerrain({ source: "terrain", exaggeration: p.exaggeration });
      if (!old || old.lowData !== p.lowData)
        m.setPixelRatio(
          Math.min(window.devicePixelRatio || 1, p.lowData ? 1 : 1.5),
        );
      if (!old || old.labels !== p.labels || old.locale !== p.locale)
        syncMarkers();
      if (!old || old.night !== p.night) {
        m.setLayoutProperty(
          "night-shade",
          "visibility",
          p.night ? "visible" : "none",
        );
        m.setLayoutProperty(
          "city-lights",
          "visibility",
          p.night ? "visible" : "none",
        );
        m.setSky(
          p.night
            ? {
                "sky-color": "#13243f",
                "horizon-color": "#3b4964",
                "fog-color": "#243f51",
                "fog-ground-blend": 0.35,
              }
            : {
                "sky-color": "#d7e6db",
                "horizon-color": "#dfeadb",
                "fog-color": "#a9c5b8",
                "fog-ground-blend": 0.4,
              },
        );
      }
      syncUrban();
      if (selectionName.current !== p.selectedProvince) {
        selectionName.current = p.selectedProvince;
        const ticket = ++selectionTicket.current;
        setGeoJSON("selection", empty);
        if (p.selectedProvince)
          void geography.current
            ?.region(p.selectedProvince)
            .then(({ feature }) => {
              if (ticket === selectionTicket.current)
                setGeoJSON("selection", feature);
            })
            .catch(() => {
              if (ticket === selectionTicket.current && map.current)
                setTileError(true);
            });
      }
      if (previousPoints.current !== p.points) {
        previousPoints.current = p.points;
        const features: FeatureCollection["features"] = p.points.map(
          (coordinate) => ({
            type: "Feature",
            properties: {},
            geometry: { type: "Point", coordinates: coordinate },
          }),
        );
        if (p.points.length === 2)
          features.unshift({
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates: p.points },
          });
        setGeoJSON("measurement", { type: "FeatureCollection", features });
      }
      previousSettings.current = p;
    }
    function syncUrban() {
      const m = map.current;
      if (!m || !m.getLayer("relief")) return;
      const center = m.getCenter();
      const distance = cameraGroundDistance(
        m.getZoom(),
        center.lat,
        m.getCanvas().clientHeight,
        m.getVerticalFieldOfView(),
      );
      const next = cityLOD(
        [center.lng, center.lat],
        m.getZoom(),
        distance,
        activeCity.current,
      );
      if (next !== activeCity.current) {
        activeCity.current = next;
        latest.current.onLOD(next);
      }
      if (!next) {
        clearTimeout(urbanTimeout.current);
        for (const id of [...URBAN_LAYER_IDS].reverse())
          if (m.getLayer(id)) m.removeLayer(id);
        if (m.getSource("urban")) m.removeSource("urban");
        urbanSignature.current = "";
        setUrbanStatus((previous) => (previous === "off" ? previous : "off"));
        return;
      }
      const p = latest.current;
      if (!m.getSource("urban")) {
        m.addSource("urban", urbanSource());
        setUrbanStatus("loading");
        urbanSignature.current = "";
        clearTimeout(urbanTimeout.current);
        urbanTimeout.current = setTimeout(() => {
          if (
            map.current?.getSource("urban") &&
            !map.current.isSourceLoaded("urban")
          )
            setUrbanStatus("error");
        }, 20000);
      }
      const signature = `${p.night}/${p.lowData}/${p.labels}`;
      if (signature !== urbanSignature.current) {
        for (const layer of urbanLayers(p.night, p.lowData, p.labels)) {
          if (!m.getLayer(layer.id)) m.addLayer(layer, "province-lines");
          else {
            for (const [key, value] of Object.entries(layer.paint || {}))
              m.setPaintProperty(
                layer.id,
                key as Parameters<LibreMap["setPaintProperty"]>[1],
                value,
              );
            for (const [key, value] of Object.entries(layer.layout || {}))
              m.setLayoutProperty(
                layer.id,
                key as Parameters<LibreMap["setLayoutProperty"]>[1],
                value,
              );
          }
        }
        urbanSignature.current = signature;
      }
      if (m.isSourceLoaded("urban")) {
        clearTimeout(urbanTimeout.current);
        setUrbanStatus((previous) =>
          previous === "ready" ? previous : "ready",
        );
      }
    }
    settingsRef.current = applySettings;
    async function inspect(coordinate: Coordinate, province: string | null) {
      if (!map.current) return;
      sampleAbort.current?.abort();
      const abort = new AbortController();
      sampleAbort.current = abort;
      const base = { coordinate, province };
      latest.current.onInspect({ ...base, elevation: null, status: "pending" });
      const timeout = setTimeout(() => abort.abort(), 15000);
      try {
        const elevation = await sampler.current.sample(
          coordinate,
          latest.current.lowData ? 10 : 12,
          abort.signal,
        );
        if (sampleAbort.current === abort && !abort.signal.aborted)
          latest.current.onInspect({ ...base, elevation, status: "ready" });
      } catch {
        if (sampleAbort.current === abort)
          latest.current.onInspect({
            ...base,
            elevation: null,
            status: "unavailable",
          });
      } finally {
        clearTimeout(timeout);
      }
    }
    useImperativeHandle(
      ref,
      () => ({
        home() {
          ++interaction.current;
          const m = map.current;
          if (!m) return;
          m.fitBounds(CAMBODIA_BOUNDS, {
            padding: window.innerWidth < 700 ? 30 : 55,
            pitch: 40,
            bearing: -8,
            duration: duration(),
            maxZoom: 7.5,
          });
        },
        goCity(id) {
          ++interaction.current;
          const city = cities.find((c) => c.id === id);
          if (city)
            map.current?.flyTo({
              center: city.coordinate,
              zoom: 15.6,
              pitch: 55,
              bearing: -12,
              duration: duration(),
            });
        },
        goPlace(id) {
          ++interaction.current;
          const place = places.find((p) => p.id === id);
          if (place)
            map.current?.flyTo({
              center: place.coordinate,
              zoom: place.zoom,
              pitch: 55,
              bearing: -12,
              duration: duration(),
            });
        },
        goProvince(name) {
          const ticket = ++interaction.current;
          void geography.current
            ?.region(name)
            .then(({ bounds }) => {
              if (ticket === interaction.current)
                map.current?.fitBounds(bounds, {
                  padding: 50,
                  pitch: 35,
                  bearing: 0,
                  maxZoom: 10.5,
                  duration: duration(),
                });
            })
            .catch(() => {
              if (ticket === interaction.current && map.current)
                setTileError(true);
            });
        },
        zoom(direction) {
          map.current?.zoomTo((map.current?.getZoom() || 7) + direction, {
            duration: duration() / 2,
          });
        },
        north() {
          map.current?.easeTo({ bearing: 0, duration: duration() / 2 });
        },
        toggleTilt() {
          const m = map.current;
          if (m)
            m.easeTo({
              pitch: m.getPitch() > 10 ? 0 : 55,
              duration: duration() / 2,
            });
        },
        clearInspection() {
          ++interaction.current;
          sampleAbort.current?.abort();
          sampleAbort.current = null;
          inspected.current = null;
          setGeoJSON("inspection", empty);
        },
      }),
      [],
    );
    useEffect(() => {
      const elevationSampler = sampler.current;
      let alive = true;
      let instance: LibreMap | null = null;
      let lodTimer: ReturnType<typeof setTimeout> | undefined;
      let cleanupMetrics = () => {};
      let isGPUError: (error: unknown) => boolean = () => false;
      registerTileCache();
      async function start() {
        try {
          const lib = await import("maplibre-gl");
          isGPUError = (error) => error instanceof lib.GPUInitializationError;
          if (!alive || !container.current) return;
          geography.current = new BoundaryClient();
          lib.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
          lib.setWorkerCount(2);
          lib.setMaxParallelImageRequests(6);
          const m = new lib.Map({
            container: container.current,
            style: createMapStyle(
              "/data/render/adm0.geojson",
              "/data/render/adm1.geojson",
              latest.current.lowData,
            ),
            center: [104.8, 12.6],
            zoom: 6.6,
            pitch: 40,
            bearing: -8,
            minZoom: 5.3,
            maxZoom: 19,
            maxPitch: 70,
            maxBounds: [
              [101.8, 9.5],
              [108.1, 15.2],
            ],
            maxTileCacheSize: 48,
            cancelPendingTileRequestsWhileZooming: true,
            renderWorldCopies: false,
            attributionControl: false,
            canvasContextAttributes: { antialias: false },
            pixelRatio: Math.min(
              window.devicePixelRatio || 1,
              latest.current.lowData ? 1 : 1.5,
            ),
          });
          instance = m;
          map.current = m;
          cleanupMetrics = monitorMap(m);
          m.fitBounds(CAMBODIA_BOUNDS, {
            padding: window.innerWidth < 700 ? 25 : 50,
            pitch: 40,
            bearing: -8,
            duration: 0,
            maxZoom: 7.5,
          });
          m.addControl(
            new lib.AttributionControl({ compact: true }),
            "bottom-right",
          );
          m.addControl(
            new lib.ScaleControl({ maxWidth: 100, unit: "metric" }),
            "bottom-left",
          );
          m.on("error", (e) => {
            console.error(
              "[Cambodia Earth] Map asset/render error",
              e.error,
              e,
            );
            if (!alive) return;
            if ("sourceId" in e && e.sourceId === "urban") {
              setUrbanStatus("error");
            } else setTileError(true);
          });
          const scheduleLOD = () => {
            clearTimeout(lodTimer);
            lodTimer = setTimeout(() => {
              if (alive) {
                syncUrban();
                syncMarkers();
              }
            }, 120);
          };
          m.on("move", scheduleLOD);
          m.on("moveend", () => {
            clearTimeout(lodTimer);
            syncUrban();
            syncMarkers();
          });
          m.on("sourcedata", (e) => {
            if (alive && e.sourceId === "urban" && e.isSourceLoaded) {
              clearTimeout(urbanTimeout.current);
              setUrbanStatus("ready");
            }
          });
          m.on("style.load", () => {
            if (!alive) return;
            // This optimization is optional; it must never prevent a usable map.
            try {
              configureTerrainLOD(m);
            } catch (error) {
              console.warn(
                "[Cambodia Earth] Terrain LOD defaults retained",
                error,
              );
            }
            try {
              settingsRef.current();
              setState("ready");
              latest.current.onReady(true);
            } catch (error) {
              console.error("[Cambodia Earth] Style setup failed", error);
              setErrorKind("setup");
              setState("error");
              latest.current.onReady(false);
            }
          });
          m.on("webglcontextlost", (e) => {
            if (!alive) return;
            console.error("[Cambodia Earth] WebGL context lost", e);
            setErrorKind("context");
            setState("error");
            latest.current.onReady(false);
          });
          m.on("webglcontextrestored", () => {
            if (!alive) return;
            previousSettings.current = null;
            setState("ready");
            latest.current.onReady(true);
          });
          m.once("style.load", () => {
            if (!alive) return;
            for (const place of places.filter(
              (p) => !["phnom-penh", "mekong"].includes(p.id),
            )) {
              const button = document.createElement("button");
              button.className = "map-place";
              button.type = "button";
              button.textContent = place.name[latest.current.locale];
              button.addEventListener("click", (e) => {
                e.stopPropagation();
                latest.current.onPlace(place.id);
              });
              const marker = new lib.Marker({
                element: button,
                anchor: "bottom",
              })
                .setLngLat(place.coordinate)
                .addTo(m);
              markers.current.push({ marker, button, id: place.id });
            }
            for (const city of cities) {
              const button = document.createElement("button");
              button.className = "map-place map-city";
              button.type = "button";
              button.textContent = city.name[latest.current.locale];
              button.addEventListener("click", (e) => {
                e.stopPropagation();
                latest.current.onCity(city.id);
              });
              const marker = new lib.Marker({
                element: button,
                anchor: "bottom",
              })
                .setLngLat(city.coordinate)
                .addTo(m);
              markers.current.push({ marker, button, id: "city:" + city.id });
            }
            syncMarkers();
            settingsRef.current();
          });
          m.on("click", async (e) => {
            const coordinate: Coordinate = [e.lngLat.lng, e.lngLat.lat],
              ticket = ++interaction.current;
            sampleAbort.current?.abort();
            try {
              const result = await geography.current?.inspect(coordinate);
              if (!alive || ticket !== interaction.current || !result) return;
              if (!result.inside) {
                latest.current.onOutside();
                return;
              }
              if (latest.current.measuring) {
                latest.current.onMeasure(coordinate);
                return;
              }
              inspected.current = coordinate;
              setGeoJSON("inspection", {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {},
                    geometry: { type: "Point", coordinates: coordinate },
                  },
                ],
              });
              void inspect(coordinate, result.province);
            } catch {
              if (alive && ticket === interaction.current) setTileError(true);
            }
          });
        } catch (error) {
          console.error("[Cambodia Earth] Map initialization failed", error);
          // Dispose a partially initialized map immediately, not only on unmount.
          cleanupMetrics();
          cleanupMetrics = () => {};
          markers.current.forEach((item) => item.marker.remove());
          markers.current = [];
          geography.current?.destroy();
          geography.current = null;
          if (instance) {
            try {
              instance.remove();
            } catch (cleanupError) {
              console.warn(
                "[Cambodia Earth] Partial map cleanup failed",
                cleanupError,
              );
            }
            instance = null;
          }
          map.current = null;
          if (alive) {
            setErrorKind(isGPUError(error) ? "webgl" : "setup");
            setState("error");
            latest.current.onReady(false);
          }
        }
      }
      start();
      const resize = new ResizeObserver(() => map.current?.resize());
      if (container.current) resize.observe(container.current);
      return () => {
        alive = false;
        ++interaction.current;
        ++selectionTicket.current;
        clearTimeout(lodTimer);
        clearTimeout(urbanTimeout.current);
        cleanupMetrics();
        geography.current?.destroy();
        geography.current = null;
        sampleAbort.current?.abort();
        sampleAbort.current = null;
        elevationSampler.clear();
        resize.disconnect();
        markers.current.forEach((x) => x.marker.remove());
        markers.current = [];
        instance?.remove();
        map.current = null;
      };
    }, []);
    useEffect(() => {
      if (state === "ready") settingsRef.current();
    }, [
      state,
      props.mode,
      props.exaggeration,
      props.borders,
      props.labels,
      props.locale,
      props.selectedProvince,
      props.points,
      props.night,
      props.lowData,
    ]);
    useEffect(() => {
      const m = map.current;
      if (lastLowData.current === props.lowData || !m || !m.getLayer("relief"))
        return;
      lastLowData.current = props.lowData;
      // Replace only DEM detail; keep urban tiles, labels and boundary buckets alive.
      const style = m.getStyle(),
        terrain = style.sources.terrain;
      const relief = style.layers.find((layer) => layer.id === "relief")!,
        hillshade = style.layers.find((layer) => layer.id === "hillshade")!;
      if (terrain.type !== "raster-dem") return;
      m.setTerrain(null);
      m.removeLayer("relief");
      m.removeLayer("hillshade");
      m.removeSource("terrain");
      m.addSource("terrain", { ...terrain, maxzoom: props.lowData ? 10 : 13 });
      m.addLayer(relief, "imagery");
      m.addLayer(hillshade, "night-shade");
      try {
        configureTerrainLOD(m);
      } catch (error) {
        console.warn("[Cambodia Earth] Terrain LOD defaults retained", error);
      }
      m.setTerrain({
        source: "terrain",
        exaggeration: latest.current.exaggeration,
      });
      previousSettings.current = null;
      settingsRef.current();
    }, [props.lowData]);
    return (
      <>
        <div
          className="terrain-canvas"
          ref={container}
          aria-label={
            props.locale === "km"
              ? "ផែនទីកម្ពុជាបីវិមាត្រ"
              : "Interactive 3D map of Cambodia"
          }
        />
        {state !== "ready" && (
          <div className="map-loading" role="status">
            <div className="loading-card">
              <span className="loading-orbit" aria-hidden="true" />
              <h2>
                {state === "error"
                  ? errorKind === "webgl"
                    ? t.webglError
                    : errorKind === "context"
                      ? t.contextError
                      : t.mapError
                  : t.loading}
              </h2>
              {state === "loading" ? (
                <p>{t.loadingNote}</p>
              ) : (
                <>
                  <p>
                    {errorKind === "webgl"
                      ? t.webglNote
                      : errorKind === "context"
                        ? t.contextNote
                        : t.setupNote}
                  </p>
                  <button onClick={() => window.location.reload()}>
                    {t.retry}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        {urbanStatus !== "off" && (
          <div className="urban-status" role="status">
            {props.locale === "km" ? "ទិន្នន័យទីក្រុង" : "City detail"} ·{" "}
            {urbanStatus === "loading"
              ? props.locale === "km"
                ? "កំពុងផ្ទុក"
                : "Loading streets…"
              : urbanStatus === "error"
                ? props.locale === "km"
                  ? "មិនអាចផ្ទុកទិន្នន័យ សាកល្បងបង្រួមផែនទី រួចពង្រីកវិញ"
                  : "Tiles unavailable · zoom out and back in to retry"
                : props.locale === "km"
                  ? "ផ្លូវ និងអគារ"
                  : "Streets & buildings"}{" "}
            {props.lowData && urbanStatus === "ready" ? "· 2D" : ""}
          </div>
        )}
        {tileError && state === "ready" && (
          <div className="tile-warning" role="status">
            {t.dataError}
            <button aria-label={t.close} onClick={() => setTileError(false)}>
              ×
            </button>
          </div>
        )}
      </>
    );
  },
);
export default TerrainMap;
