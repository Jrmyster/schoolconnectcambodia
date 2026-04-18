/**
 * Chemical equation balancer.
 *
 * Approach: parse each side into an element-count matrix, then find the
 * smallest positive-integer null-space vector via rational Gauss-Jordan.
 * Works for typical high-school equations (≤ ~10 species, ≤ ~10 elements).
 */

/* ── Rational arithmetic (small ints; high-school sized inputs) ───── */

type Frac = { n: number; d: number };

function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

function frac(n: number, d = 1): Frac {
  if (d === 0) throw new Error("Division by zero");
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}

const F0 = frac(0);
function fAdd(a: Frac, b: Frac): Frac { return frac(a.n * b.d + b.n * a.d, a.d * b.d); }
function fSub(a: Frac, b: Frac): Frac { return frac(a.n * b.d - b.n * a.d, a.d * b.d); }
function fMul(a: Frac, b: Frac): Frac { return frac(a.n * b.n, a.d * b.d); }
function fDiv(a: Frac, b: Frac): Frac {
  if (b.n === 0) throw new Error("Division by zero");
  return frac(a.n * b.d, a.d * b.n);
}
function fNeg(a: Frac): Frac { return frac(-a.n, a.d); }
function fIsZero(a: Frac): boolean { return a.n === 0; }

/* ── Tokenizer & parser for a single species (formula) ─────────────── */

export type AtomCounts = Record<string, number>;

/**
 * Parse a formula like "Ca(OH)2" or "Fe2(SO4)3" into element counts.
 * Throws if the formula is malformed.
 */
export function parseFormula(input: string): AtomCounts {
  const s = input.trim();
  if (!s) throw new Error("EMPTY_SPECIES");

  // Recursive descent parser.
  let i = 0;
  const counts: AtomCounts = {};

  function readNumber(): number {
    let start = i;
    while (i < s.length && /[0-9]/.test(s[i]!)) i++;
    if (start === i) return 1;
    return parseInt(s.slice(start, i), 10);
  }

  function parseGroup(): AtomCounts {
    const local: AtomCounts = {};
    while (i < s.length) {
      const c = s[i]!;
      if (c === "(") {
        i++; // consume (
        const inner = parseGroup();
        if (s[i] !== ")") throw new Error("UNCLOSED_PAREN");
        i++; // consume )
        const mult = readNumber();
        for (const [el, n] of Object.entries(inner)) {
          local[el] = (local[el] ?? 0) + n * mult;
        }
      } else if (c === ")") {
        return local;
      } else if (/[A-Z]/.test(c)) {
        let el = c;
        i++;
        while (i < s.length && /[a-z]/.test(s[i]!)) {
          el += s[i]!;
          i++;
        }
        const n = readNumber();
        local[el] = (local[el] ?? 0) + n;
      } else if (/\s/.test(c)) {
        i++;
      } else {
        throw new Error(`BAD_CHAR:${c}`);
      }
    }
    return local;
  }

  const top = parseGroup();
  if (i < s.length) throw new Error("EXTRA_CHARS");
  Object.assign(counts, top);
  if (Object.keys(counts).length === 0) throw new Error("EMPTY_SPECIES");
  return counts;
}

/* ── Equation parser ──────────────────────────────────────────────── */

export type ParsedEquation = {
  reactants: { formula: string; counts: AtomCounts }[];
  products:  { formula: string; counts: AtomCounts }[];
};

/**
 * Split an equation string on `=`, `->` or `→` and split each side on `+`.
 * Strips leading numeric coefficients (we will recompute them).
 */
export function parseEquation(raw: string): ParsedEquation {
  const eqRegex = /->|→|=/;
  const parts = raw.split(eqRegex);
  if (parts.length !== 2) throw new Error("MISSING_EQUALS");
  const [lhs, rhs] = parts;

  const splitSide = (side: string) =>
    side
      .split("+")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((token) => {
        // Strip optional leading integer coefficient (e.g. "2 H2O" or "2H2O")
        const m = token.match(/^(\d+)\s*(.+)$/);
        const formula = m ? m[2]!.trim() : token;
        const counts = parseFormula(formula);
        return { formula, counts };
      });

  const reactants = splitSide(lhs!);
  const products  = splitSide(rhs!);

  if (reactants.length === 0) throw new Error("EMPTY_REACTANTS");
  if (products.length === 0)  throw new Error("EMPTY_PRODUCTS");

  return { reactants, products };
}

/* ── Element-conservation check (used for "impossible" diagnosis) ──── */

function elementSets(eq: ParsedEquation) {
  const lhs = new Set<string>();
  const rhs = new Set<string>();
  for (const s of eq.reactants) Object.keys(s.counts).forEach((e) => lhs.add(e));
  for (const s of eq.products)  Object.keys(s.counts).forEach((e) => rhs.add(e));
  return { lhs, rhs };
}

/* ── Rational matrix RREF ──────────────────────────────────────────── */

function rref(M: Frac[][]): { M: Frac[][]; rank: number } {
  const rows = M.length;
  const cols = M[0]?.length ?? 0;
  let r = 0;
  for (let c = 0; c < cols && r < rows; c++) {
    // Find pivot.
    let pivot = -1;
    for (let i = r; i < rows; i++) {
      if (!fIsZero(M[i]![c]!)) { pivot = i; break; }
    }
    if (pivot === -1) continue;
    [M[r], M[pivot]] = [M[pivot]!, M[r]!];
    // Normalize pivot row.
    const p = M[r]![c]!;
    for (let j = 0; j < cols; j++) M[r]![j] = fDiv(M[r]![j]!, p);
    // Eliminate other rows.
    for (let i = 0; i < rows; i++) {
      if (i === r) continue;
      const factor = M[i]![c]!;
      if (fIsZero(factor)) continue;
      for (let j = 0; j < cols; j++) {
        M[i]![j] = fSub(M[i]![j]!, fMul(factor, M[r]![j]!));
      }
    }
    r++;
  }
  return { M, rank: r };
}

/* ── Solver — find smallest positive-integer null-space vector ────── */

export type BalanceOk = {
  ok: true;
  coefficients: number[];          // length = reactants + products
  reactantCounts: AtomCounts;      // totals after applying coefficients
  productCounts: AtomCounts;
};

export type BalanceErr = {
  ok: false;
  /** Stable error code for i18n. */
  code:
    | "EMPTY"
    | "PARSE"
    | "MISSING_EQUALS"
    | "EMPTY_SIDE"
    | "ELEMENT_MISMATCH"
    | "NO_SOLUTION"
    | "AMBIGUOUS"
    | "TOO_LARGE";
  /** Optional extra detail (e.g. element name, bad token). */
  detail?: string;
};

export type BalanceResult = BalanceOk | BalanceErr;

const MAX_COEFF = 1000;

export function balanceEquation(raw: string): BalanceResult {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: false, code: "EMPTY" };

  let eq: ParsedEquation;
  try {
    eq = parseEquation(trimmed);
  } catch (e) {
    const msg = (e as Error).message;
    if (msg === "MISSING_EQUALS") return { ok: false, code: "MISSING_EQUALS" };
    if (msg === "EMPTY_REACTANTS" || msg === "EMPTY_PRODUCTS")
      return { ok: false, code: "EMPTY_SIDE" };
    return { ok: false, code: "PARSE", detail: msg };
  }

  // Element-set sanity check (a missing element on either side guarantees no solution).
  const { lhs, rhs } = elementSets(eq);
  const missing = [...lhs].find((e) => !rhs.has(e)) ?? [...rhs].find((e) => !lhs.has(e));
  if (missing) return { ok: false, code: "ELEMENT_MISMATCH", detail: missing };

  // Build element list and species list.
  const elements = Array.from(new Set([...lhs, ...rhs])).sort();
  const species = [...eq.reactants, ...eq.products];
  const nReact = eq.reactants.length;
  const nSpec = species.length;

  // Build matrix A (elements × species): reactants positive, products negative.
  // We want A · x = 0 with x > 0 integers.
  const A: Frac[][] = elements.map((el) =>
    species.map((sp, i) => {
      const v = sp.counts[el] ?? 0;
      return frac(i < nReact ? v : -v);
    }),
  );

  // RREF.
  const { M, rank } = rref(A.map((row) => row.slice()));

  // Need exactly one degree of freedom (nSpec - rank === 1) for a unique ratio.
  if (nSpec - rank < 1) return { ok: false, code: "NO_SOLUTION" };
  if (nSpec - rank > 1) return { ok: false, code: "AMBIGUOUS" };

  // Identify the single free column (last one not chosen as pivot).
  // After RREF in column-order, the free column is the last one.
  // Find pivot columns.
  const pivotCols = new Set<number>();
  for (let r = 0; r < rank; r++) {
    for (let c = 0; c < nSpec; c++) {
      if (!fIsZero(M[r]![c]!)) { pivotCols.add(c); break; }
    }
  }
  const freeCols: number[] = [];
  for (let c = 0; c < nSpec; c++) if (!pivotCols.has(c)) freeCols.push(c);
  if (freeCols.length !== 1) return { ok: false, code: "AMBIGUOUS" };
  const free = freeCols[0]!;

  // Set free var = 1, solve pivots: pivot_c = -M[r][free] (since pivot = 1).
  const x: Frac[] = new Array(nSpec).fill(F0);
  x[free] = frac(1);
  for (let r = 0; r < rank; r++) {
    let pivotCol = -1;
    for (let c = 0; c < nSpec; c++) {
      if (!fIsZero(M[r]![c]!)) { pivotCol = c; break; }
    }
    if (pivotCol === -1) continue;
    x[pivotCol] = fNeg(M[r]![free]!);
  }

  // Multiply by LCM of denominators → integers.
  let L = 1;
  for (const f of x) L = lcm(L, f.d);
  let ints = x.map((f) => Math.round((f.n * L) / f.d));

  // Flip sign so all are positive (null space is closed under negation).
  if (ints.some((v) => v < 0) && ints.every((v) => v <= 0)) {
    ints = ints.map((v) => -v);
  }
  // If signs are mixed, balancing has no positive integer solution.
  if (ints.some((v) => v <= 0)) return { ok: false, code: "NO_SOLUTION" };

  // Reduce by global GCD.
  let g = ints[0]!;
  for (let i = 1; i < ints.length; i++) g = gcd(g, ints[i]!);
  ints = ints.map((v) => v / g);

  if (ints.some((v) => v > MAX_COEFF)) return { ok: false, code: "TOO_LARGE" };

  // Verify and compute final atom totals.
  const reactantCounts: AtomCounts = {};
  const productCounts: AtomCounts = {};
  for (let i = 0; i < nSpec; i++) {
    const k = ints[i]!;
    const isReact = i < nReact;
    const target = isReact ? reactantCounts : productCounts;
    for (const [el, c] of Object.entries(species[i]!.counts)) {
      target[el] = (target[el] ?? 0) + k * c;
    }
  }
  for (const el of elements) {
    if ((reactantCounts[el] ?? 0) !== (productCounts[el] ?? 0)) {
      return { ok: false, code: "NO_SOLUTION" };
    }
  }

  return { ok: true, coefficients: ints, reactantCounts, productCounts };
}
