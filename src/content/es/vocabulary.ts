import type { PictoId } from "@/components/art/Pictos";

export interface VocabItem {
  word: string;
  glyph: PictoId;
  also: PictoId[];
  article: "el" | "la";
  ageBand: "A" | "B" | "C";
  category: string;
}

export const VOCABULARY: VocabItem[] = [
  { word: "faro", glyph: "faro", also: ["manzana", "luna", "pez"], article: "el", ageBand: "A", category: "lugar" },
  { word: "manzana", glyph: "manzana", also: ["pera", "bici", "estrella"], article: "la", ageBand: "A", category: "fruta" },
  { word: "luna", glyph: "luna", also: ["sol", "casa", "zorro"], article: "la", ageBand: "A", category: "cielo" },
  { word: "pez", glyph: "pez", also: ["pajaro", "flor", "estrella"], article: "el", ageBand: "A", category: "animal" },
  { word: "casa", glyph: "casa", also: ["arbol", "barco", "luna"], article: "la", ageBand: "A", category: "lugar" },
  { word: "flor", glyph: "flor", also: ["hongo", "luna", "bici"], article: "la", ageBand: "A", category: "naturaleza" },
  { word: "sol", glyph: "sol", also: ["luna", "estrella", "casa"], article: "el", ageBand: "A", category: "cielo" },
  { word: "barco", glyph: "barco", also: ["bici", "zorro", "manzana"], article: "el", ageBand: "B", category: "vehiculo" },
  { word: "búho", glyph: "buho", also: ["rana", "estrella", "casa"], article: "el", ageBand: "B", category: "animal" },
  { word: "rana", glyph: "rana", also: ["buho", "pez", "flor"], article: "la", ageBand: "B", category: "animal" },
  { word: "árbol", glyph: "arbol", also: ["casa", "flor", "hongo"], article: "el", ageBand: "B", category: "naturaleza" },
  { word: "estrella", glyph: "estrella", also: ["luna", "sol", "pez"], article: "la", ageBand: "B", category: "cielo" },
  { word: "paraguas", glyph: "paraguas", also: ["lluvia", "zapato", "casa"], article: "el", ageBand: "C", category: "objeto" },
  { word: "ventana", glyph: "ventana", also: ["puerta", "casa", "luna"], article: "la", ageBand: "C", category: "casa" },
  { word: "semilla", glyph: "semilla", also: ["hoja", "flor", "arbol"], article: "la", ageBand: "C", category: "naturaleza" },
];

export function vocabForAge(ageYears: number): VocabItem[] {
  if (ageYears <= 4) return VOCABULARY.filter((v) => v.ageBand === "A");
  if (ageYears <= 6) return VOCABULARY.filter((v) => v.ageBand !== "C");
  return VOCABULARY;
}
