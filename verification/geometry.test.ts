import assert from "node:assert/strict";
import {
  polyhedron,
  project,
} from "../artifacts/chuy-sala/src/components/diagrams/LearningDiagrams";
for (const [shape, V, E, F] of [
  ["tetrahedron", 4, 6, 4],
  ["cube", 8, 12, 6],
  ["octahedron", 6, 12, 8],
  ["icosahedron", 12, 30, 20],
] as const) {
  const g = polyhedron(shape);
  assert.equal(g.vertices.length, V);
  assert.equal(g.edges.length, E);
  assert.equal(g.faces.length, F);
  assert.equal(V - E + F, 2);
  for (const [a, b] of g.edges) assert.notEqual(a, b);
  for (const face of g.faces)
    for (let i = 0; i < face.length; i++)
      assert(
        g.edges.some(
          ([a, b]) =>
            (a === face[i] && b === face[(i + 1) % face.length]) ||
            (b === face[i] && a === face[(i + 1) % face.length]),
        ),
      );
  for (const point of g.vertices)
    for (const angle of [0, Math.PI / 2, Math.PI])
      assert(project(point, angle).every(Number.isFinite));
}
console.log(
  "PASS: all four polyhedra have correct vertices, edges, closed face boundaries and Euler characteristic under SVG projection.",
);
