import type { GameId, Layer, SkillId } from "./types";

export interface SkillDef {
  id: SkillId;
  layer: Layer;
  isolated: boolean;
  scored: boolean;
  label: string;
  short: string;
  what: string;
  why: string;
  worldRegion: string;
  color: string;
  games: GameId[];
  subSkills: { id: string; label: string }[];
}

export const SKILLS: Record<SkillId, SkillDef> = {
  attention_inhibition: {
    id: "attention_inhibition",
    layer: "cognitive",
    isolated: false,
    scored: true,
    label: "Atención e inhibición",
    short: "Atención",
    what: "Mantenerse en lo importante y esperar cuando una regla pide no tocar.",
    why: "Ayuda a seguir una consigna, esperar un turno y no responder al primer impulso.",
    worldRegion: "Bosque de Atención",
    color: "#3F7A5A",
    games: ["semaforo", "guardianes"],
    subSkills: [
      { id: "selective_attention", label: "Atención selectiva" },
      { id: "response_inhibition", label: "Inhibición de respuesta" },
    ],
  },
  visual_memory: {
    id: "visual_memory",
    layer: "cognitive",
    isolated: false,
    scored: true,
    label: "Memoria visual",
    short: "Memoria",
    what: "Recordar posiciones, órdenes y pequeñas secuencias que acaba de ver.",
    why: "Sustenta seguir instrucciones, recordar un recado corto y reconstruir lo que pasó.",
    worldRegion: "Valle de Memoria",
    color: "#3D5A80",
    games: ["luciernagas", "historia"],
    subSkills: [
      { id: "spatial_sequence", label: "Secuencia espacial" },
      { id: "event_sequence", label: "Memoria de eventos" },
    ],
  },
  flexibility: {
    id: "flexibility",
    layer: "cognitive",
    isolated: false,
    scored: true,
    label: "Flexibilidad",
    short: "Flexibilidad",
    what: "Cambiar de regla o estrategia cuando la situación cambia.",
    why: "Sirve para adaptarse si las instrucciones cambian y no quedarse anclado a la regla anterior.",
    worldRegion: "Isla de Flexibilidad",
    color: "#6A7F3A",
    games: ["camaleon"],
    subSkills: [
      { id: "rule_switching", label: "Cambio de regla" },
      { id: "set_shifting", label: "Cambio de set" },
    ],
  },
  reasoning: {
    id: "reasoning",
    layer: "cognitive",
    isolated: false,
    scored: true,
    label: "Razonamiento",
    short: "Patrones",
    what: "Notar patrones y elegir lo que encaja en una secuencia visual.",
    why: "Es la base de “qué sigue” en juegos, cuentos y matemáticas tempranas.",
    worldRegion: "Montaña de Lógica",
    color: "#7A4E2D",
    games: ["quesigue"],
    subSkills: [{ id: "pattern_reasoning", label: "Patrones" }],
  },
  visuospatial: {
    id: "visuospatial",
    layer: "cognitive",
    isolated: false,
    scored: true,
    label: "Visoespacial",
    short: "Construcción",
    what: "Encajar piezas, notar formas y construir una figura.",
    why: "Apoya puzzles, dibujo, construcción y orientación en el espacio cercano.",
    worldRegion: "Taller de Formas",
    color: "#8A5A3B",
    games: ["casa"],
    subSkills: [
      { id: "construction", label: "Construcción" },
      { id: "visual_discrimination", label: "Discriminación visual" },
    ],
  },
  language: {
    id: "language",
    layer: "learning",
    isolated: true,
    scored: true,
    label: "Lenguaje",
    short: "Palabras",
    what: "Comprender palabras y elegir la imagen que corresponde.",
    why: "El vocabulario receptivo sostiene seguir cuentos e instrucciones. No mide “inteligencia”.",
    worldRegion: "Villa de Palabras",
    color: "#5B4E8A",
    games: ["bosque"],
    subSkills: [{ id: "receptive_vocabulary", label: "Vocabulario receptivo" }],
  },
  numeracy: {
    id: "numeracy",
    layer: "learning",
    isolated: true,
    scored: true,
    label: "Números",
    short: "Números",
    what: "Contar, comparar cantidades y hacer correspondencia uno a uno.",
    why: "Prepara el sentido numérico. Se interpreta aparte de las habilidades cognitivas generales.",
    worldRegion: "Ciudad de Números",
    color: "#B56A2B",
    games: ["mercado"],
    subSkills: [
      { id: "counting", label: "Conteo" },
      { id: "magnitude", label: "Comparar cantidades" },
    ],
  },
};

export const SKILL_ORDER: SkillId[] = [
  "attention_inhibition",
  "visual_memory",
  "flexibility",
  "reasoning",
  "visuospatial",
  "language",
  "numeracy",
];

export function skillByGame(gameId: GameId): SkillId | null {
  if (gameId === "warmup") return null;
  const found = SKILL_ORDER.find((id) => SKILLS[id].games.includes(gameId));
  return found ?? null;
}

export function confidenceCopy(level: "low" | "medium" | "high"): string {
  if (level === "low") return "Conociéndola";
  if (level === "medium") return "Aprendiendo más";
  return "Señal más estable";
}

export function observationCopy(skillId: SkillId, confidence: "low" | "medium" | "high"): string {
  if (confidence === "low") {
    return "Esta es una primera impresión de cómo jugó hoy. MindGrow irá contrastándola en otras actividades.";
  }
  const extra: Record<SkillId, string> = {
    attention_inhibition: "En actividades sencillas vimos cómo espera o toca según la regla del momento.",
    visual_memory: "Hemos visto cómo recuerda posiciones y, cuando toca, pequeñas historias visuales.",
    flexibility: "Cuando la regla cambia, a veces necesita un ejemplo extra. Eso es parte de practicar.",
    reasoning: "Está practicando notar qué se repite y qué falta en un patrón.",
    visuospatial: "Está encajando piezas y prestando atención a la forma del conjunto.",
    language: "Estas observaciones son de comprensión de palabras en este idioma, no de capacidad general.",
    numeracy: "Está practicando cantidad y comparación. No es un test de matemáticas escolares.",
  };
  return extra[skillId];
}
