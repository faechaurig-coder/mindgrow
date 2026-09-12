import type { PictoId } from "@/components/art/Pictos";

const SHAPE_COLOR = { rojo: "#d26a4a", azul: "#3d7ea8", amarillo: "#e6b567" };

export type PatternKind = "AB" | "AAB" | "ABB" | "ABC" | "AABB";

export interface PatternToken {
  id: PictoId;
  color?: string;
  label: string;
}

export interface PatternPuzzle {
  kind: PatternKind;
  seq: PatternToken[];
  answer: string;
  options: PatternToken[];
}

const SHAPES: PictoId[] = ["circulo", "cuadrado", "triangulo"];
const COLORS = [
  { key: "rojo", hex: SHAPE_COLOR.rojo },
  { key: "azul", hex: SHAPE_COLOR.azul },
  { key: "amarillo", hex: SHAPE_COLOR.amarillo },
];

const KINDS_BY_AGE: Record<number, PatternKind[]> = {
  4: ["AB"],
  5: ["AB", "AAB"],
  6: ["AB", "AAB", "ABB"],
  7: ["AAB", "ABB", "ABC"],
  8: ["ABB", "ABC", "AABB"],
};

function token(id: PictoId, color: string | undefined, label: string): PatternToken {
  return { id, color, label };
}

function uniqueAnswer(puzzle: Omit<PatternPuzzle, "options">, decoys: PatternToken[]): PatternPuzzle {
  const options = [token(puzzle.seq[0].id, puzzle.seq.find((s) => s.label === puzzle.answer)?.color, puzzle.answer), ...decoys]
    .filter((item, index, list) => list.findIndex((x) => x.label === item.label) === index)
    .slice(0, 3);
  if (!options.some((o) => o.label === puzzle.answer)) {
    options[0] = { ...puzzle.seq.find((s) => s.label === puzzle.answer)!, label: puzzle.answer };
  }
  return { ...puzzle, options };
}

export function kindsForAge(ageYears: number): PatternKind[] {
  return KINDS_BY_AGE[Math.min(8, Math.max(4, ageYears))] ?? ["AB"];
}

export function validatePattern(puzzle: PatternPuzzle): boolean {
  const matches = puzzle.options.filter((o) => o.label === puzzle.answer);
  if (matches.length !== 1) return false;
  const next = nextLabel(puzzle.seq, puzzle.kind);
  return next === puzzle.answer;
}

function nextLabel(seq: PatternToken[], kind: PatternKind): string {
  const labels = seq.map((s) => s.label);
  if (kind === "AB") return labels[labels.length % 2];
  if (kind === "AAB") return labels[labels.length % 3];
  if (kind === "ABB") return labels[labels.length % 3];
  if (kind === "ABC") return labels[labels.length % 3];
  return labels[labels.length % 4];
}

export function generatePattern(ageYears: number, seed: number, depth = 0): PatternPuzzle {
  const kinds = kindsForAge(ageYears);
  const kind = kinds[seed % kinds.length];
  const a = COLORS[seed % 3];
  const b = COLORS[(seed + 1) % 3];
  const c = COLORS[(seed + 2) % 3];
  const shapeA = SHAPES[seed % 3];
  const shapeB = SHAPES[(seed + 1) % 3];
  const shapeC = SHAPES[(seed + 2) % 3];

  const A = token(shapeA, a.hex, `A-${a.key}`);
  const B = token(shapeB, b.hex, `B-${b.key}`);
  const C = token(shapeC, c.hex, `C-${c.key}`);

  const cycle =
    kind === "AB" ? [A, B] : kind === "AAB" ? [A, A, B] : kind === "ABB" ? [A, B, B] : kind === "ABC" ? [A, B, C] : [A, A, B, B];
  const length = kind === "AABB" ? 4 : 4;
  const seq = Array.from({ length }, (_, i) => cycle[i % cycle.length]);
  const answer = cycle[length % cycle.length].label;
  const decoys = [A, B, C].filter((t) => t.label !== answer);
  const puzzle = uniqueAnswer({ kind, seq, answer }, decoys);
  if (!validatePattern(puzzle) && depth < 8) {
    return generatePattern(ageYears, seed + 1, depth + 1);
  }
  return puzzle;
}
