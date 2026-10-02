import { STEM_SITE_URL } from "@/config/sites";
import type { SchoolPin } from "../lib/school-pins";
import { useLanguageStore } from "@/store/use-language";
import "./earth.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import {
  Globe2,
  Search,
  MapPin,
  Mountain,
  Layers,
  BookOpen,
  Compass,
  Plus,
  Minus,
  House,
  Ruler,
  X,
  Info,
  PanelLeft,
  ChevronDown,
  Navigation,
  Leaf,
} from "lucide-react";
import TerrainMap, { type Inspection, type MapControls } from "./TerrainMap";
import {
  places,
  provinces,
  lessons,
  type Locale,
} from "@/features/cambodia-earth/data/places";
import { cities, CENSUS_URL } from "@/features/cambodia-earth/data/cities";
import { copy } from "@/features/cambodia-earth/locales/earth";
import {
  distanceKm,
  normalize,
  type Coordinate,
} from "@/features/cambodia-earth/lib/geography";

export default function CambodiaEarth({ schools }: { schools: SchoolPin[] }) {
  const language = useLanguageStore((s) => s.language);
  const locale: Locale = language === "kh" ? "km" : "en";
  const setLocale = (value: Locale) =>
    useLanguageStore.setState({ language: value === "km" ? "kh" : "en" });
  const [tab, setTab] = useState<"explore" | "layers" | "learn">("explore");
  const [query, setQuery] = useState(""),
    [mode, setMode] = useState<"relief" | "satellite">("relief");
  const [borders, setBorders] = useState(true),
    [labels, setLabels] = useState(true),
    [exaggeration, setExaggeration] = useState(1);
  const [lowData, setLowData] = useState(false),
    [ready, setReady] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false),
    [mobile, setMobile] = useState(false);
  const [placeId, setPlaceId] = useState<string | null>(null),
    [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [inspection, setInspection] = useState<Inspection | null>(null),
    [measuring, setMeasuring] = useState(false),
    [points, setPoints] = useState<Coordinate[]>([]);
  const [cityId, setCityId] = useState<string | null>(null),
    [lodCity, setLodCity] = useState<string | null>(null),
    [night, setNight] = useState(false);
  const [outside, setOutside] = useState(false);
  const map = useRef<MapControls>(null),
    dialog = useRef<HTMLDialogElement>(null);
  const t = copy[locale],
    isKm = locale === "km";
  const q = normalize(query);
  const foundPlaces = places.filter((p) =>
    normalize(
      p.name.en + p.name.km + p.type.en + p.type.km + p.note.en + p.note.km,
    ).includes(q),
  );
  const foundProvinces = provinces.filter((p) =>
    normalize(p.name.en + p.name.km + p.sourceName).includes(q),
  );
  const city = cities.find((c) => c.id === cityId);
  const foundCities = cities.filter((c) =>
    normalize(
      c.name.en +
        c.name.km +
        c.province.en +
        c.province.km +
        c.features.en +
        c.features.km,
    ).includes(q),
  );
  const place = places.find((p) => p.id === placeId);
  const regionName = provinces.find(
    (p) => p.sourceName === (inspection?.province || selectedProvince),
  )?.name[locale];
  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const frame = requestAnimationFrame(() => {
      try {
        const stored = localStorage.getItem("cambodia-earth-language");
        if (stored === "km" || stored === "en") setLocale(stored);
      } catch {}
      setMobile(media.matches);
    });
    const update = () => setMobile(media.matches);
    media.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", update);
    };
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  function switchLocale(next: Locale) {
    setLocale(next);
    try {
      localStorage.setItem("cambodia-earth-language", next);
    } catch {}
  }
  function goCity(id: string) {
    setCityId(id);
    setInspection(null);
    map.current?.clearInspection();
    setMeasuring(false);
    setPoints([]);
    setPlaceId(null);
    setSelectedProvince(null);
    map.current?.goCity(id);
    setPanelOpen(false);
    setOutside(false);
  }
  function goPlace(id: string) {
    setCityId(null);
    setInspection(null);
    map.current?.clearInspection();
    setMeasuring(false);
    setPoints([]);
    setPlaceId(id);
    setSelectedProvince(null);
    map.current?.goPlace(id);
    setPanelOpen(false);
    setOutside(false);
  }
  function goProvince(sourceName: string) {
    setCityId(null);
    setInspection(null);
    map.current?.clearInspection();
    setPlaceId(null);
    setSelectedProvince(sourceName);
    map.current?.goProvince(sourceName);
    setPanelOpen(false);
    setOutside(false);
  }
  function inspect(point: Inspection) {
    setInspection((previous) =>
      previous &&
      previous.coordinate[0] === point.coordinate[0] &&
      previous.coordinate[1] === point.coordinate[1] &&
      previous.elevation === point.elevation &&
      previous.province === point.province &&
      previous.status === point.status
        ? previous
        : point,
    );
    setOutside(false);
    setCityId(null);
  }
  function onMeasure(point: Coordinate) {
    setPoints((old) => (old.length === 2 ? [point] : [...old, point]));
    setOutside(false);
  }
  function home() {
    setCityId(null);
    map.current?.home();
    map.current?.clearInspection();
    setInspection(null);
    setMeasuring(false);
    setPoints([]);
    setPlaceId(null);
    setSelectedProvince(null);
    setPanelOpen(false);
  }
  const iconProps = { size: 18, strokeWidth: 1.8 };
  return (
    <main className="earth-feature earth-app">
      <header className="earth-header">
        <div className="brand">
          <span className="brand-icon">
            <Globe2 size={27} />
          </span>
          <div>
            <h1>
              Cambodia <strong>Earth</strong>
            </h1>
            <p>
              ផែនដីកម្ពុជា{" "}
              <span>
                {" "}
                / {isKm ? "ស្វែងយល់ពីទម្រង់ដី" : "A landscape explorer"}
              </span>
            </p>
          </div>
        </div>
        <div className="header-actions">
          <a
            className="network-link"
            href={STEM_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {isKm ? "មជ្ឈមណ្ឌល STEM និងការសិក្សា" : "STEM & Learning Hub"}
          </a>
          <div
            className="language-group"
            aria-label={isKm ? "ភាសា" : "Language"}
          >
            {(["en", "km"] as const).map((lang) => (
              <button
                key={lang}
                aria-pressed={locale === lang}
                onClick={() => switchLocale(lang)}
              >
                {lang === "en" ? "EN" : "ខ្មែរ"}
              </button>
            ))}
          </div>
        </div>
      </header>
      <div className="workspace">
        <aside
          id="map-panel"
          className={`sidebar ${panelOpen ? "panel-open" : "panel-closed"}`}
          inert={mobile && !panelOpen}
          aria-label={t.panel}
        >
          <div className="sidebar-top">
            <span className="eyebrow">
              {isKm ? "ស្វែងយល់ពីប្រទេសរបស់យើង" : "EXPLORE OUR COUNTRY"}
            </span>
            <h2>{t.intro}</h2>
            <button
              className="panel-close icon-button"
              aria-label={t.close}
              onClick={() => setPanelOpen(false)}
            >
              <X {...iconProps} />
            </button>
          </div>
          <nav className="panel-tabs" aria-label={t.panel}>
            {(
              [
                { id: "explore", label: t.explore, icon: Compass },
                { id: "layers", label: t.layers, icon: Layers },
                { id: "learn", label: t.learn, icon: BookOpen },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                aria-pressed={tab === item.id}
                onClick={() => setTab(item.id)}
              >
                <item.icon size={17} />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-content">
            {tab === "explore" && (
              <>
                <label className="search-field">
                  <Search size={18} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t.search}
                    aria-label={t.search}
                  />
                  {query && (
                    <button aria-label={t.clear} onClick={() => setQuery("")}>
                      <X size={17} />
                    </button>
                  )}
                </label>
                <h3 className="section-label">
                  {isKm ? "ស្វែងយល់ពីទីក្រុង" : "CITY EXPLORER"}
                  <span>{foundCities.length}</span>
                </h3>
                <p className="help-text">
                  {isKm
                    ? "ចុចលើទីក្រុងដើម្បីមើលផ្លូវ និងអគារ។ ពង្រីកផែនទីដើម្បីមើលព័ត៌មានលម្អិត។"
                    : "Fly into a city to discover its streets and buildings. Zoom closer for 3D footprints."}
                </p>
                <div className="place-list">
                  {foundCities.map((c) => (
                    <button
                      className={`place-card city-choice ${cityId === c.id ? "selected" : ""}`}
                      key={c.id}
                      disabled={!ready}
                      onClick={() => goCity(c.id)}
                    >
                      <MapPin size={19} />
                      <span>
                        <strong>{c.name[locale]}</strong>
                        <small>{c.province[locale]}</small>
                      </span>
                      <span className="city-3d">3D</span>
                    </button>
                  ))}
                </div>
                <h3 className="section-label">
                  {t.places}
                  <span>{foundPlaces.length}</span>
                </h3>
                <div className="place-list">
                  {foundPlaces.map((p, index) => (
                    <button
                      className={`place-card ${placeId === p.id ? "selected" : ""}`}
                      key={p.id}
                      disabled={!ready}
                      onClick={() => goPlace(p.id)}
                    >
                      <span className="place-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <strong>{p.name[locale]}</strong>
                        <small>{p.type[locale]}</small>
                      </span>
                      <MapPin size={17} />
                    </button>
                  ))}
                </div>
                <h3 className="section-label province-heading">
                  {t.provinces}
                  <span>{foundProvinces.length}</span>
                </h3>
                <div className="province-list">
                  {foundProvinces.map((p) => (
                    <button
                      disabled={!ready}
                      key={p.sourceName}
                      className={
                        selectedProvince === p.sourceName ? "selected" : ""
                      }
                      onClick={() => goProvince(p.sourceName)}
                    >
                      <span>{p.name[locale]}</span>
                      <Navigation size={14} />
                    </button>
                  ))}
                </div>
                {!foundCities.length &&
                  !foundPlaces.length &&
                  !foundProvinces.length && <p>{t.noResults}</p>}
              </>
            )}
            {tab === "layers" && (
              <>
                <h3 className="section-label">{t.view}</h3>
                <div className="view-choices">
                  <button
                    className={mode === "relief" ? "selected" : ""}
                    aria-pressed={mode === "relief"}
                    onClick={() => setMode("relief")}
                  >
                    <Mountain size={24} />
                    <strong>{t.relief}</strong>
                    <span className="relief-sample" aria-hidden="true" />
                  </button>
                  <button
                    className={mode === "satellite" ? "selected" : ""}
                    aria-pressed={mode === "satellite"}
                    onClick={() => setMode("satellite")}
                  >
                    <Globe2 size={24} />
                    <strong>{t.satellite}</strong>
                    <small>NASA Blue Marble</small>
                  </button>
                </div>
                <p className="help-text">{t.imageryNote}</p>
                <label className="toggle-row">
                  <span>
                    <strong>
                      {isKm ? "ទិដ្ឋភាពពេលយប់" : "Dusk / city lights"}
                    </strong>
                    <small>
                      {isKm
                        ? "ពន្លឺសម្រាប់បង្ហាញតែប៉ុណ្ណោះ មិនមែនទិន្នន័យវាស់វែង។"
                        : "Illustrative city glow, not measured night-light data."}
                    </small>
                  </span>
                  <input
                    type="checkbox"
                    checked={night}
                    onChange={(e) => setNight(e.target.checked)}
                  />
                </label>
                <label className="toggle-row">
                  <span>{t.borders}</span>
                  <input
                    type="checkbox"
                    checked={borders}
                    onChange={(e) => setBorders(e.target.checked)}
                  />
                </label>
                <label className="toggle-row">
                  <span>{t.labels}</span>
                  <input
                    type="checkbox"
                    checked={labels}
                    onChange={(e) => setLabels(e.target.checked)}
                  />
                </label>
                <div className="setting-block">
                  <label htmlFor="exaggeration">
                    {t.exaggeration}
                    <output>{exaggeration.toFixed(1)}×</output>
                  </label>
                  <input
                    id="exaggeration"
                    type="range"
                    min="1"
                    max="3"
                    step="0.25"
                    value={exaggeration}
                    onChange={(e) => setExaggeration(Number(e.target.value))}
                  />
                  <div className="range-labels">
                    <span>1×</span>
                    <span>3×</span>
                  </div>
                  <p className="help-text">{t.exaggerationNote}</p>
                </div>
                <label className="toggle-row">
                  <span>
                    <strong>{t.performance}</strong>
                    <small>{t.performanceNote}</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={lowData}
                    onChange={(e) => setLowData(e.target.checked)}
                  />
                </label>
              </>
            )}
            {tab === "learn" && (
              <div className="lessons">
                {lessons.map((lesson, index) => (
                  <article key={lesson.id}>
                    <span className="lesson-number">
                      {isKm ? "មេរៀន" : "FIELD LESSON"}{" "}
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{lesson.title[locale]}</h3>
                    <p>{lesson.body[locale]}</p>
                    <div className="lesson-task">
                      <Leaf size={17} />
                      <div>
                        <strong>{t.task}</strong>
                        <p>{lesson.task[locale]}</p>
                      </div>
                    </div>
                    <button
                      className="primary-button"
                      disabled={!ready}
                      onClick={() => goPlace(lesson.place)}
                    >
                      <MapPin size={16} />
                      {t.show}
                    </button>
                    <a
                      className="reading-link"
                      href={lesson.source}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.lessonSource}
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
          <div className="sidebar-footer">
            <button onClick={() => dialog.current?.showModal()}>
              <Info size={17} />
              {t.viewSources}
            </button>
          </div>
        </aside>
        <section
          className={`map-workspace ${measuring ? "is-measuring" : ""}`}
          aria-label={t.view}
        >
          <TerrainMap
            schools={schools}
            ref={map}
            night={night}
            onCity={goCity}
            onLOD={setLodCity}
            locale={locale}
            mode={mode}
            exaggeration={exaggeration}
            borders={borders}
            labels={labels}
            lowData={lowData}
            measuring={measuring}
            points={points}
            selectedProvince={selectedProvince}
            onInspect={inspect}
            onMeasure={onMeasure}
            onPlace={goPlace}
            onOutside={() => setOutside(true)}
            onReady={setReady}
          />
          <div className="map-topline">
            <span className="map-mode">
              <Mountain size={15} />
              {mode === "relief" ? t.relief : t.satellite}
              <span className="mode-divider" />
              {exaggeration.toFixed(1)}×
            </span>
            <span className="data-badge">
              {lodCity
                ? isKm
                  ? "ផ្លូវក្នុងទីក្រុង"
                  : "Urban LOD"
                : lowData
                  ? t.lowData
                  : t.standard}
            </span>
          </div>
          <button
            className="mobile-panel-button"
            aria-expanded={panelOpen}
            aria-controls="map-panel"
            onClick={() => setPanelOpen(!panelOpen)}
          >
            <PanelLeft size={18} />
            {t.panel}
            <ChevronDown size={15} />
          </button>
          <div className="map-controls" aria-label={t.view}>
            <button
              disabled={!ready}
              aria-label={t.home}
              title={t.home}
              onClick={home}
            >
              <House {...iconProps} />
            </button>
            <button
              disabled={!ready}
              aria-label={t.north}
              title={t.north}
              onClick={() => map.current?.north()}
            >
              <Compass {...iconProps} />
            </button>
            <button
              disabled={!ready}
              aria-label={t.zoomIn}
              title={t.zoomIn}
              onClick={() => map.current?.zoom(1)}
            >
              <Plus {...iconProps} />
            </button>
            <button
              disabled={!ready}
              aria-label={t.zoomOut}
              title={t.zoomOut}
              onClick={() => map.current?.zoom(-1)}
            >
              <Minus {...iconProps} />
            </button>
            <button
              disabled={!ready}
              aria-label={`${t.flat} / ${t.tilt}`}
              title={`${t.flat} / ${t.tilt}`}
              onClick={() => map.current?.toggleTilt()}
              className="dimension-button"
            >
              3D
            </button>
            <button
              disabled={!ready}
              className={measuring ? "active" : ""}
              aria-pressed={measuring}
              aria-label={t.measure}
              title={t.measure}
              onClick={() => {
                setMeasuring(!measuring);
                setPoints([]);
                setInspection(null);
                map.current?.clearInspection();
                setPlaceId(null);
              }}
            >
              <Ruler {...iconProps} />
            </button>
          </div>
          {outside && (
            <div className="map-toast" role="status">
              {t.outside}
              <button aria-label={t.close} onClick={() => setOutside(false)}>
                <X size={16} />
              </button>
            </div>
          )}
          <div className="map-result">
            {measuring ? (
              <div className="result-card measurement-card">
                <div className="result-heading">
                  <Ruler size={18} />
                  <h3>{t.measure}</h3>
                  <button
                    aria-label={t.close}
                    onClick={() => {
                      setMeasuring(false);
                      setPoints([]);
                    }}
                  >
                    <X size={17} />
                  </button>
                </div>
                <p>{t.measureHint}</p>
                {points.map((point, index) => (
                  <div className="coordinate-row" key={index}>
                    <span>
                      {t.point} {index + 1}
                    </span>
                    <code>
                      {point[1].toFixed(4)}° N, {point[0].toFixed(4)}° E
                    </code>
                  </div>
                ))}
                {points.length === 2 && (
                  <div className="elevation-value">
                    <small>{t.distance}</small>
                    <strong>
                      {distanceKm(points[0], points[1]).toFixed(2)}{" "}
                      <span>{t.kmUnit}</span>
                    </strong>
                  </div>
                )}
                {points.length > 0 && (
                  <button className="text-button" onClick={() => setPoints([])}>
                    {t.clear}
                  </button>
                )}
              </div>
            ) : inspection ? (
              <div className="result-card">
                <div className="result-heading">
                  <MapPin size={18} />
                  <h3>{regionName || t.inspect}</h3>
                  <button
                    aria-label={t.remove}
                    onClick={() => {
                      setInspection(null);
                      map.current?.clearInspection();
                    }}
                  >
                    <X size={17} />
                  </button>
                </div>
                <div className="elevation-value">
                  <small>{t.elevation}</small>
                  <strong>
                    {inspection.elevation === null ? (
                      <span>
                        {inspection.status === "pending"
                          ? t.waiting
                          : isKm
                            ? "មិនមានទិន្នន័យកម្ពស់"
                            : "Elevation unavailable"}
                      </span>
                    ) : (
                      <>
                        {Math.round(inspection.elevation).toLocaleString(
                          locale === "km" ? "km-KH" : "en-US",
                        )}{" "}
                        <span>{t.mUnit}</span>
                      </>
                    )}
                  </strong>
                </div>
                <div className="coordinate-row">
                  <span>{t.coordinates}</span>
                  <code>
                    {inspection.coordinate[1].toFixed(5)}° N<br />
                    {inspection.coordinate[0].toFixed(5)}° E
                  </code>
                </div>
                <p className="help-text">{t.surveyNote}</p>
              </div>
            ) : city ? (
              <div className="result-card city-result">
                <div className="result-heading">
                  <MapPin size={18} />
                  <h3>{city.name[locale]}</h3>
                  <button aria-label={t.close} onClick={() => setCityId(null)}>
                    <X size={17} />
                  </button>
                </div>
                <span className="city-province">{city.province[locale]}</span>
                <p>{city.features[locale]}</p>
                <div className="city-population">
                  <small>
                    {isKm
                      ? "ចំនួនប្រជាជនខេត្ត/រាជធានី · ជំរឿនឆ្នាំ២០១៩"
                      : "Province / municipality population · 2019 census"}
                  </small>
                  <strong>
                    {city.population.toLocaleString(isKm ? "km-KH" : "en-US")}
                  </strong>
                  <a
                    href={CENSUS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {isKm
                      ? "ប្រភព៖ វិទ្យាស្ថានជាតិស្ថិតិ"
                      : "Source: National Institute of Statistics"}
                  </a>
                </div>
                <p className="help-text">
                  {isKm
                    ? "អគារផ្អែកលើ OpenStreetMap។ កម្ពស់ខ្លះជាការប៉ាន់ស្មាន ហើយភាពលម្អិតអាស្រ័យលើទិន្នន័យក្នុងតំបន់។"
                    : "OpenStreetMap footprints; some heights are estimates. Detail varies by local mapping coverage."}
                </p>
              </div>
            ) : place ? (
              <div className="result-card place-result">
                <div className="result-heading">
                  <MapPin size={18} />
                  <h3>{place.name[locale]}</h3>
                  <button aria-label={t.close} onClick={() => setPlaceId(null)}>
                    <X size={17} />
                  </button>
                </div>
                <p>{place.note[locale]}</p>
              </div>
            ) : (
              <div className="map-instruction">
                <MapPin size={17} />
                <span>{t.inspectHint}</span>
              </div>
            )}
          </div>
          <div className="map-bottom">
            <div
              className={`terrain-legend ${mode === "satellite" ? "legend-hidden" : ""}`}
            >
              <span>{t.legend}</span>
              <div className="legend-ramp" />
              <div className="legend-ticks">
                <span>0</span>
                <span>500</span>
                <span>1,000</span>
                <span>2,000</span>
              </div>
            </div>
            <p className="gesture-hint">{mobile ? t.mobileHint : t.hint}</p>
          </div>
        </section>
      </div>
      <dialog
        ref={dialog}
        className="sources-dialog"
        aria-labelledby="sources-heading"
      >
        <div className="dialog-heading">
          <h2 id="sources-heading">{t.sources}</h2>
          <button
            className="icon-button"
            aria-label={t.close}
            onClick={() => dialog.current?.close()}
          >
            <X size={20} />
          </button>
        </div>
        <p>{t.sourceNote}</p>
        <ul>
          <li>
            <a
              href="https://registry.opendata.aws/terrain-tiles/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mapzen Terrain Tiles · AWS Open Data
            </a>{" "}
            ·{" "}
            <a
              href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              {isKm ? "អាជ្ញាបណ្ណ និងប្រភព" : "Licenses & source credits"}
            </a>
          </li>
          <li>
            <a
              href="https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NASA Blue Marble · NASA GIBS
            </a>
          </li>
          <li>
            <a
              href="https://www.geoboundaries.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              geoBoundaries · CC BY 4.0
            </a>{" "}
            /{" "}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenStreetMap · ODbL
            </a>
          </li>
          <li>
            <a
              href="https://maplibre.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MapLibre GL JS · BSD 3-Clause
            </a>
          </li>
        </ul>
        <p>
          {isKm
            ? "ផ្លូវ និងអគារ៖ OpenFreeMap / OpenMapTiles / OpenStreetMap។ ផ្ទុកតែនៅពេលពង្រីកជិតទីក្រុង។ រូបភាពពន្លឺពេលយប់សម្រាប់បង្ហាញតែប៉ុណ្ណោះ។"
            : "Streets and buildings: OpenFreeMap / OpenMapTiles / OpenStreetMap. Streamed only near cities at close zoom. Dusk glow is illustrative; building heights may be estimated."}
        </p>
        <p>{t.imageryNote}</p>
        <p>{t.boundaryNote}</p>
        <p>{t.surveyNote}</p>
        <p>{t.offlineNote}</p>
        <a className="text-button" href="/data/adm1.geojson" download>
          {isKm
            ? "ទាញយកទិន្នន័យព្រំប្រទល់ខេត្ត"
            : "Download province boundary data"}
        </a>
      </dialog>
    </main>
  );
}
