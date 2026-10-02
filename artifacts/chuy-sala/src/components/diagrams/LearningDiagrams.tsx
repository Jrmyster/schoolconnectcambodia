import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguageStore } from "@/store/use-language";
export type Point = [number, number, number];
const TAU = Math.PI * 2;
const palette = ["#38bdf8", "#fb7185", "#fbbf24", "#a78bfa"];
export function project([x, y, z]: Point, angle: number, scale = 70): Point {
  const u = x * Math.cos(angle) + z * Math.sin(angle);
  const v = z * Math.cos(angle) - x * Math.sin(angle);
  return [300 + u * scale, 180 - (y * 0.85 - v * 0.35) * scale, v];
}
function path(points: Point[]) {
  return points
    .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");
}
/** SVG controls work with touch, mouse and keyboard without a graphics context. */
export function Diagram({
  title,
  children,
  dark = true,
}: {
  title: string;
  children: (angle: number) => ReactNode;
  dark?: boolean;
}) {
  const [angle, setAngle] = useState(0.5),
    [zoom, setZoom] = useState(1);
  const drag = useRef<number | null>(null);
  const kh = useLanguageStore((s) => s.language) === "kh";
  return (
    <div
      className="relative w-full h-full min-h-64 flex flex-col"
      style={{
        background: dark ? "#071426" : "#f8fafc",
        color: dark ? "#e2e8f0" : "#0f172a",
      }}
    >
      <svg
        viewBox="0 0 600 360"
        className="w-full flex-1 min-h-0 touch-pan-y"
        role="img"
        aria-label={title}
        onPointerDown={(e) => {
          // Preserve clicks on selectable planets and other SVG buttons.
          if ((e.target as Element).closest('[role="button"]')) return;
          drag.current = e.clientX;
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (drag.current !== null) {
            const delta = (e.clientX - drag.current) * 0.01;
            drag.current = e.clientX;
            setAngle((a) => a + delta);
          }
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
        onLostPointerCapture={() => (drag.current = null)}
      >
        <title>{title}</title>
        <g transform={`translate(300 180) scale(${zoom}) translate(-300 -180)`}>
          {children(angle)}
        </g>
      </svg>
      <div className="flex gap-4 items-center px-4 py-2 text-xs relative z-10 bg-slate-900 text-white">
        <label className="flex flex-1 gap-2">
          {kh ? "បង្វិល" : "Rotate"}
          <input
            aria-label={kh ? "បង្វិលទិដ្ឋភាព" : "Rotate view"}
            className="min-w-0 w-full"
            type="range"
            min={-Math.PI}
            max={Math.PI}
            step={0.02}
            value={Math.atan2(Math.sin(angle), Math.cos(angle))}
            onChange={(e) => setAngle(+e.target.value)}
          />
        </label>
        <label className="flex flex-1 gap-2">
          {kh ? "ពង្រីក" : "Zoom"}
          <input
            aria-label={kh ? "ពង្រីកទិដ្ឋភាព" : "Zoom view"}
            className="min-w-0 w-full"
            type="range"
            min={0.5}
            max={1.8}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(+e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
export function polyhedron(shape: string): {
  vertices: Point[];
  faces: number[][];
  edges: number[][];
} {
  let vertices: Point[] = [];
  if (shape === "cube")
    vertices = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ];
  else if (shape === "tetrahedron")
    vertices = [
      [1, 1, 1],
      [1, -1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
    ];
  else if (shape === "octahedron")
    vertices = [
      [1.5, 0, 0],
      [-1.5, 0, 0],
      [0, 1.5, 0],
      [0, -1.5, 0],
      [0, 0, 1.5],
      [0, 0, -1.5],
    ];
  else {
    const p = (1 + Math.sqrt(5)) / 2;
    for (const a of [-1, 1])
      for (const b of [-p, p]) vertices.push([0, a, b], [a, b, 0], [b, 0, a]);
  }
  const distances = vertices.flatMap((a, i) =>
    vertices.slice(i + 1).map((b) => Math.hypot(...a.map((v, j) => v - b[j]))),
  );
  const edgeLength = Math.min(...distances),
    edges: number[][] = [];
  vertices.forEach((a, i) =>
    vertices.forEach((b, j) => {
      if (
        j > i &&
        Math.abs(Math.hypot(...a.map((v, k) => v - b[k])) - edgeLength) < 0.001
      )
        edges.push([i, j]);
    }),
  );
  const faces: number[][] =
    shape === "cube"
      ? [
          [0, 1, 2, 3],
          [4, 7, 6, 5],
          [0, 4, 5, 1],
          [3, 2, 6, 7],
          [0, 3, 7, 4],
          [1, 5, 6, 2],
        ]
      : [];
  const linked = (a: number, b: number) =>
    edges.some(([i, j]) => i === Math.min(a, b) && j === Math.max(a, b));
  if (shape !== "cube")
    for (let i = 0; i < vertices.length; i++)
      for (let j = i + 1; j < vertices.length; j++)
        for (let k = j + 1; k < vertices.length; k++)
          if (linked(i, j) && linked(j, k) && linked(i, k))
            faces.push([i, j, k]);
  return { vertices, faces, edges };
}
export function PolyhedronDiagram({
  shape,
  highlight,
}: {
  shape: string;
  highlight: string;
}) {
  const { vertices, faces, edges } = polyhedron(shape);
  return (
    <Diagram
      title={`${shape}: ${vertices.length} vertices, ${edges.length} edges, ${faces.length} faces`}
    >
      {(angle) => {
        const p = vertices.map((v) => project(v, angle, 65));
        return (
          <>
            {faces
              .slice()
              .sort(
                (a, b) =>
                  a.reduce((s, i) => s + p[i][2], 0) / a.length -
                  b.reduce((s, i) => s + p[i][2], 0) / b.length,
              )
              .map((face, i) => (
                <polygon
                  key={i}
                  points={face.map((j) => p[j].slice(0, 2).join(",")).join(" ")}
                  fill={highlight === "faces" ? "#fbbf24" : "#38bdf8"}
                  fillOpacity={highlight === "faces" ? 0.5 : 0.13}
                />
              ))}
            {edges.map(([a, b], i) => (
              <path
                key={i}
                d={path([p[a], p[b]])}
                stroke={highlight === "edges" ? "#fb7185" : "#7dd3fc"}
                strokeWidth={highlight === "edges" ? 4 : 1.5}
              />
            ))}
            {p.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={highlight === "vertices" ? 7 : 3}
                fill="#34d399"
              />
            ))}
          </>
        );
      }}
    </Diagram>
  );
}
export function HornDiagram({ a }: { a: number }) {
  return (
    <Diagram title={`Gabriel's horn, y=1/x rotated about x, 1≤x≤${a}`}>
      {(angle) => {
        const rings = Array.from({ length: 30 }, (_, i) => {
          const x = 1 + ((a - 1) * i) / 29;
          return Array.from({ length: 33 }, (_, j) =>
            project(
              [
                ((x - (a + 1) / 2) * 4) / a,
                Math.cos((j * TAU) / 32) / x,
                Math.sin((j * TAU) / 32) / x,
              ],
              angle,
              90,
            ),
          );
        });
        return (
          <>
            {rings.map((r, i) => (
              <path
                key={i}
                d={path(r)}
                fill="none"
                stroke="#34d399"
                opacity={0.4 + i / 60}
              />
            ))}
            <text x="20" y="35" fill="#a7f3d0">
              y = 1/x · 1 ≤ x ≤ {a.toFixed(1)}
            </text>
          </>
        );
      }}
    </Diagram>
  );
}
function usePhase(speed: number, enabled = true) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (
      !enabled ||
      speed === 0 ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let last = 0,
      id = 0;
    function tick(now: number) {
      if (last && now - last < 32) {
        id = requestAnimationFrame(tick);
        return;
      }
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      if (!document.hidden) setPhase((p) => (p + dt * speed) % (TAU * 2));
      id = requestAnimationFrame(tick);
    }
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [speed, enabled]);
  return phase;
}
function Surface({
  sample,
  title,
  tracing = false,
}: {
  sample: (u: number, v: number) => Point;
  title: string;
  tracing?: boolean;
}) {
  const phase = usePhase(1, tracing);
  return (
    <Diagram title={title}>
      {(angle) => {
        const cells = [];
        for (let i = 0; i < 40; i++)
          for (let j = 0; j < 8; j++) {
            const p = [
              [i, j],
              [i + 1, j],
              [i + 1, j + 1],
              [i, j + 1],
            ].map(([a, b]) => project(sample(a / 40, b / 8), angle, 64));
            cells.push({ p, z: p.reduce((s, v) => s + v[2], 0) / 4, j });
          }
        const point = project(sample((phase / (TAU * 2)) % 1, 0.5), angle, 64);
        return (
          <>
            {cells
              .sort((a, b) => a.z - b.z)
              .map(({ p, j }, i) => (
                <polygon
                  key={i}
                  points={p.map((v) => v.slice(0, 2).join(",")).join(" ")}
                  fill={j % 2 ? "#0891b2" : "#a78bfa"}
                  fillOpacity=".48"
                  stroke="#67e8f9"
                  strokeOpacity=".3"
                  strokeWidth=".5"
                />
              ))}
            {tracing && (
              <circle cx={point[0]} cy={point[1]} r="6" fill="#fde047" />
            )}
          </>
        );
      }}
    </Diagram>
  );
}
export function KleinDiagram({ tracing }: { tracing: boolean }) {
  // Figure-eight immersion: self-intersection is a projection feature, not a hole.
  return (
    <Surface
      title="Klein bottle immersion in three dimensions, projected to SVG"
      tracing={tracing}
      sample={(u, v) => {
        const a = u * TAU,
          b = v * TAU,
          r =
            2 +
            Math.cos(a / 2) * Math.sin(b) -
            Math.sin(a / 2) * Math.sin(2 * b);
        return [
          r * Math.cos(a) * 0.7,
          r * Math.sin(a) * 0.7,
          (Math.sin(a / 2) * Math.sin(b) + Math.cos(a / 2) * Math.sin(2 * b)) *
            0.7,
        ];
      }}
    />
  );
}
export function KnotDiagram({ kind }: { kind: string }) {
  const [deformation, setDeformation] = useState(1);
  const kh = useLanguageStore((s) => s.language) === "kh";
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0">
        <Diagram
          title={
            kind === "unknot"
              ? "Unknot: deformable circle"
              : "Trefoil knot: three crossings"
          }
        >
          {(angle) => {
            const pts = Array.from({ length: 241 }, (_, i): Point => {
              const t = (i * TAU) / 240;
              const [x, y, z]: Point =
                kind === "unknot"
                  ? [2 * Math.cos(t), 2 * Math.sin(t), 0]
                  : [
                      Math.sin(t) + 2 * Math.sin(2 * t),
                      Math.cos(t) - 2 * Math.cos(2 * t),
                      -Math.sin(3 * t),
                    ];
              // A composition of invertible shears stretches the loop without cutting or passing strands through one another.
              const sx = x + deformation * 0.7 * Math.sin(y * 2),
                sy = y + deformation * 0.5 * Math.sin(sx),
                sz = z + deformation * 0.7 * Math.sin(sx * 2);
              return [sx, sy, sz];
            });
            const p = pts.map((v) => project(v, angle, 45));
            return p
              .slice(1)
              .map((b, i) => ({ a: p[i], b, z: (p[i][2] + b[2]) / 2 }))
              .sort((a, b) => a.z - b.z)
              .map(({ a, b }, i) => (
                <g key={i}>
                  <path
                    d={path([a, b])}
                    stroke="#071426"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <path
                    d={path([a, b])}
                    stroke="#c4b5fd"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </g>
              ));
          }}
        </Diagram>
      </div>
      <label className="flex gap-3 items-center bg-slate-900 text-white px-4 py-2 text-xs">
        {kh ? "ពន្លាតរង្វង់" : "Stretch the loop"}
        <input
          className="flex-1"
          type="range"
          min="0"
          max="1"
          step=".02"
          value={deformation}
          onChange={(e) => setDeformation(+e.target.value)}
        />
        <span>{Math.round(deformation * 100)}%</span>
      </label>
    </div>
  );
}
export function TopologyDiagram({
  kind,
  morph = 0,
}: {
  kind: "mobius" | "mug";
  morph?: number;
}) {
  if (kind === "mobius")
    return (
      <Surface
        title="Möbius strip with a half twist"
        tracing
        sample={(u, v) => {
          const t = u * TAU,
            w = (v - 0.5) * 1.2;
          return [
            (2 + w * Math.cos(t / 2)) * Math.cos(t),
            (2 + w * Math.cos(t / 2)) * Math.sin(t),
            w * Math.sin(t / 2),
          ];
        }}
      />
    );
  // A planar silhouette homotopy: the ring hole becomes the cup-handle hole.
  // This is a schematic cross-section, not a claim of a physical fluid surface.
  const m = Math.max(0, Math.min(1, morph));
  const outline: [number, number][] = [
    [2, 0],
    [2, 0.55],
    [1.5, 0.95],
    [0.85, 0.95],
    [0.7, 1.3],
    [-1.2, 1.3],
    [-1.6, 0.8],
    [-1.6, -1.3],
    [0.8, -1.3],
    [0.85, -0.95],
    [1.5, -0.95],
    [2, -0.55],
  ];
  return (
    <Diagram title="Ring-to-cup silhouette: the single hole is preserved">
      {(angle) => {
        const outer = outline.map(([x, y], i): Point => {
          const t = (i * TAU) / outline.length;
          return project(
            [
              (1 - m) * 2 * Math.cos(t) + m * x,
              -((1 - m) * 2 * Math.sin(t) + m * y),
              0,
            ],
            angle,
            70,
          );
        });
        const hole = Array.from({ length: 49 }, (_, i): Point => {
          const t = (i * TAU) / 48;
          return project(
            [
              m * 1.35 + (1 - m * 0.55) * Math.cos(t),
              -(1 - m * 0.5) * Math.sin(t),
              0,
            ],
            angle,
            70,
          );
        });
        return (
          <>
            <path
              d={path(outer) + " Z " + path(hole) + " Z"}
              fillRule="evenodd"
              fill="#fb923c"
              stroke="#fed7aa"
              strokeWidth="2"
            />
            <text x="20" y="32" fill="#e2e8f0">
              One hole / រន្ធតែមួយ · 2D schematic
            </text>
          </>
        );
      }}
    </Diagram>
  );
}
export function SolarDiagram<
  T extends { name: string; nameKh: string; color: string },
>({
  planets,
  onSelect,
  kh,
}: {
  planets: T[];
  onSelect: (p: T) => void;
  kh: boolean;
}) {
  const [playing, setPlaying] = useState(false),
    phase = usePhase(0.4, playing);
  return (
    <div className="h-full relative">
      <Diagram title="Solar system orbital schematic; sizes and distances are not to scale">
        {(angle) => (
          <>
            <circle cx="300" cy="180" r="14" fill="#fbbf24" />
            {planets.map((p, i) => {
              const r = 35 + i * 27,
                t = i * 1.9 + phase / (1 + i * 0.4) + angle,
                x = 300 + r * Math.cos(t),
                y = 180 + r * 0.56 * Math.sin(t);
              return (
                <g key={p.name}>
                  <ellipse
                    cx="300"
                    cy="180"
                    rx={r}
                    ry={r * 0.56}
                    fill="none"
                    stroke="#334155"
                  />
                  <g
                    tabIndex={0}
                    role="button"
                    aria-label={kh ? p.nameKh : p.name}
                    onClick={() => onSelect(p)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelect(p);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <circle cx={x} cy={y} r="15" fill="transparent" />
                    <circle cx={x} cy={y} r={i < 4 ? 5 : 9} fill={p.color} />
                    <text x={x + 10} y={y - 9} fill="#e2e8f0" fontSize="10">
                      {kh ? p.nameKh : p.name}
                    </text>
                  </g>
                </g>
              );
            })}
          </>
        )}
      </Diagram>
      <button
        className="absolute top-3 right-3 rounded bg-slate-800 px-3 py-1 text-white text-xs"
        onClick={() => setPlaying(!playing)}
      >
        {kh
          ? playing
            ? "ផ្អាក"
            : "ចាប់ផ្តើម"
          : playing
            ? "Pause orbits"
            : "Play orbits"}
      </button>
    </div>
  );
}
export function GalaxyDiagram() {
  return (
    <Diagram title="Schematic Milky Way spiral arms and the Sun's location">
      {(angle) => (
        <>
          {[0, 1, 2, 3].map((arm) => {
            const pts = Array.from({ length: 150 }, (_, i): Point => {
              const r = 0.05 + i * 0.017,
                t = (arm * Math.PI) / 2 + Math.log(r + 0.3) * 1.8;
              return project([r * Math.cos(t), 0, r * Math.sin(t)], angle, 92);
            });
            return (
              <path
                key={arm}
                d={path(pts)}
                fill="none"
                stroke={palette[arm]}
                strokeWidth="9"
                strokeLinecap="round"
                opacity=".65"
              />
            );
          })}
          <circle cx="300" cy="180" r="14" fill="#fde68a" />
          {(() => {
            const p = project([1.5, 0, 0.5], angle, 92);
            return (
              <g>
                <circle cx={p[0]} cy={p[1]} r="6" fill="#2dd4bf" />
                <text x={p[0] + 10} y={p[1] - 10} fill="#5eead4" fontSize="12">
                  ☀ Earth / ផែនដី
                </text>
              </g>
            );
          })()}
        </>
      )}
    </Diagram>
  );
}
export function SymmetryDiagram({
  operation,
  step,
}: {
  operation: string | null;
  step: number;
}) {
  const [positions, setPositions] = useState<Point[]>([
    [1.4, 0, 0],
    [0, 1.4, 0],
    [-1.4, 0, 0],
    [0, -1.4, 0],
  ]);
  useEffect(() => {
    if (!operation) return;
    setPositions((p) =>
      p.map(
        ([x, y, z]): Point =>
          operation === "rotate"
            ? [-y, x, z]
            : operation === "mirror"
              ? [-x, y, z]
              : [-x, -y, -z],
      ),
    );
  }, [step, operation]);
  return (
    <Diagram
      title="Square-planar symmetry: rotation, reflection and inversion"
      dark={false}
    >
      {(angle) => (
        <>
          {positions.map((v, i) => {
            const [x, y] = project(v, angle, 75);
            return (
              <g key={i}>
                <line
                  x1="300"
                  y1="180"
                  x2={x}
                  y2={y}
                  stroke="#64748b"
                  strokeWidth="5"
                  style={{ transition: "all 1s" }}
                />
                <circle
                  cx={x}
                  cy={y}
                  r="18"
                  fill={palette[i]}
                  style={{ transition: "all 1s" }}
                />
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  fontSize="12"
                  style={{ transition: "all 1s" }}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
          <circle cx="300" cy="180" r="22" fill="#db2777" />
        </>
      )}
    </Diagram>
  );
}
export function EngineDiagram({ rpm }: { rpm: number }) {
  const phase = usePhase(rpm / 20);
  const [manual, setManual] = useState(0);
  return (
    <div className="h-full flex flex-col text-white">
      <svg
        viewBox="0 0 600 320"
        className="w-full flex-1 min-h-0"
        role="img"
        aria-label="Four-stroke inline-four engine, slowed schematic motion"
      >
        {[0, 3 * Math.PI, Math.PI, 2 * Math.PI].map((offset, i) => {
          const theta = (phase + manual - offset + 4 * Math.PI) % (4 * Math.PI),
            t = theta % (2 * Math.PI),
            r = 28,
            l = 75,
            y =
              200 -
              r * Math.cos(t) -
              Math.sqrt(l * l - r * r * Math.sin(t) ** 2),
            x = 90 + i * 140,
            cx = x + r * Math.sin(t),
            cy = 200 - r * Math.cos(t),
            stroke = Math.floor(theta / Math.PI);
          return (
            <g key={i}>
              <rect
                x={x - 42}
                y="40"
                width="84"
                height="140"
                fill={["#fb923c", "#94a3b8", "#38bdf8", "#a78bfa"][stroke]}
                fillOpacity=".23"
                stroke="#94a3b8"
              />
              <rect x={x - 37} y={y} width="74" height="25" fill="#cbd5e1" />
              <line
                x1={x}
                y1={y + 15}
                x2={cx}
                y2={cy}
                stroke="#64748b"
                strokeWidth="10"
              />
              <circle cx={x} cy="200" r={r} fill="none" stroke="#475569" />
              <line
                x1={x}
                y1="200"
                x2={cx}
                y2={cy}
                stroke="#f59e0b"
                strokeWidth="6"
              />
              {theta < 0.65 && (
                <path
                  d={`M${x - 10} 55l10 25 10-25`}
                  stroke="#fb923c"
                  strokeWidth="6"
                  fill="none"
                />
              )}
              <text
                x={x}
                y="285"
                fill="#e2e8f0"
                textAnchor="middle"
                fontSize="12"
              >
                {i + 1}:{" "}
                {
                  [
                    "Power / ផ្ទុះ",
                    "Exhaust / បញ្ចេញ",
                    "Intake / បញ្ចូល",
                    "Compression / បង្ហាប់",
                  ][stroke]
                }
              </text>
            </g>
          );
        })}
      </svg>
      <label className="flex gap-3 px-4 text-xs pb-2">
        Cycle / វដ្ត
        <input
          className="flex-1"
          type="range"
          min="0"
          max={4 * Math.PI}
          step=".02"
          value={manual}
          onChange={(e) => setManual(+e.target.value)}
        />
      </label>
      <p className="text-center text-xs pb-2">
        Slowed schematic motion / ចលនាបង្ហាញយឺត
      </p>
    </div>
  );
}
export function HistoryMapDiagram<
  T extends {
    id: string;
    lat: number;
    lng: number;
    nameEn: string;
    nameKh: string;
    pinColor: string;
  },
>({
  regions,
  onSelect,
  kh,
}: {
  regions: T[];
  onSelect: (r: T) => void;
  kh: boolean;
}) {
  return (
    <svg
      viewBox="0 0 720 400"
      className="w-full h-full"
      role="img"
      aria-label={kh ? "ផែនទីប្រវត្តិសាស្ត្រ" : "World history map"}
    >
      <image
        href={`${import.meta.env.BASE_URL}textures/earth-blue-marble.jpg`}
        x="0"
        y="20"
        width="720"
        height="360"
      />
      {regions.map((r) => {
        const x = (r.lng + 180) * 2,
          y = (90 - r.lat) * 2 + 20;
        return (
          <g
            key={r.id}
            tabIndex={0}
            role="button"
            aria-label={kh ? r.nameKh : r.nameEn}
            onClick={() => onSelect(r)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(r);
              }
            }}
            className="cursor-pointer"
          >
            <circle
              cx={x}
              cy={y}
              r="14"
              fill={r.pinColor}
              stroke="white"
              strokeWidth="3"
            />
            <text
              x={x + 18}
              y={y + 4}
              fill="white"
              stroke="#0f172a"
              strokeWidth="3"
              paintOrder="stroke"
              fontSize="13"
            >
              {kh ? r.nameKh : r.nameEn}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
