import { SKILLS } from "./ontology";
import type { AppState, SkillEstimate, SkillId } from "./types";

export interface WeeklyInsight {
  areas: SkillId[];
  strength?: SkillId;
  practicing?: SkillId;
  adventures: number;
  missions: number;
  teaser: string;
  full: string[];
  missionPrompt: string;
  whyItMatters: string;
}

export function buildWeeklyInsight(state: AppState): WeeklyInsight {
  const practiced = state.estimates.filter((e) => e.evidenceCount > 0);
  const areas = practiced.map((e) => e.skillId);
  const hasStable = practiced.some((e) => e.confidence !== "low");
  const strength = hasStable ? pickStrength(practiced) : undefined;
  const practicing = pickPractice(practiced);
  const name = state.child?.nickname ?? "tu hijo";
  const missionPrompt =
    state.dailyPlan?.mission.prompt ??
    "Después de jugar, una misión breve en casa: contar, tocar, construir o contar un cuento.";

  const teaser = practiced.length
    ? `Esta semana ${name} exploró ${practiced.length} áreas. El mapa sigue siendo una hipótesis en construcción.`
    : "Aún no hay suficientes partidas para un relato semanal.";

  const full = [
    `Exploró ${practiced.length || 0} áreas.`,
    `Fortaleza observada: ${strength ? SKILLS[strength].short.toLowerCase() : "aún en construcción"}.`,
    `Área que estamos practicando: ${practicing ? SKILLS[practicing].short.toLowerCase() : "variedad"}.`,
    `Misiones familiares: ${state.world.missionsDone}. Aventuras: ${state.world.adventuresCompleted}.`,
    "Estamos aprendiendo más sobre cómo juega y resuelve problemas. Un cambio de una semana no es una mejora cognitiva demostrada.",
  ];

  const why = practicing
    ? SKILLS[practicing].why
    : "Las pequeñas repeticiones, en juegos distintos, nos dan una señal más honesta que un único resultado.";

  return {
    areas,
    strength,
    practicing,
    adventures: state.world.adventuresCompleted,
    missions: state.world.missionsDone,
    teaser,
    full,
    missionPrompt,
    whyItMatters: why,
  };
}

function pickStrength(estimates: SkillEstimate[]): SkillId | undefined {
  const ready = estimates.filter((e) => e.confidence !== "low");
  const pool = ready.length ? ready : estimates;
  return [...pool].sort((a, b) => b.ability - a.ability)[0]?.skillId;
}

function pickPractice(estimates: SkillEstimate[]): SkillId | undefined {
  const low = estimates.filter((e) => e.confidence === "low");
  const pool = low.length ? low : estimates;
  return [...pool].sort((a, b) => a.ability - b.ability)[0]?.skillId;
}

export const OFFLINE_IDEAS: Record<SkillId, string> = {
  attention_inhibition: "Jugad a “luna”: 20 segundos quietos cuando la nombréis. Sin premio ni castigo.",
  visual_memory: "Esconde 3 juguetes. Pídele que recuerde dónde estaba cada uno.",
  flexibility: "Construid un puente de dos maneras distintas con lo que tengáis a mano.",
  reasoning: "Ordenad tres objetos del más pequeño al más grande y decid por qué.",
  visuospatial: "Encontrad 3 objetos redondos y uno que no lo sea.",
  language: "Contad una historia corta con perro, luna y barco.",
  numeracy: "Pedid 4 cosas de la merienda y contadlas juntos.",
};
