import { PLAYABLE_GAMES } from "./games/catalog";
import { todayKey, uid } from "./ids";
import { SKILLS } from "./ontology";
import type { ChildProfile, DailyPlan, GameId, OfflineMission, SkillEstimate, SkillId } from "./types";

const MISSIONS: Array<Omit<OfflineMission, "id" | "status" | "createdAt">> = [
  { title: "Formas escondidas", prompt: "Encuentra 3 objetos redondos en casa.", minutes: 5, skillId: "visuospatial" },
  { title: "Torre de seis", prompt: "Construye una torre con 6 objetos y luego derríbala con cuidado.", minutes: 6, skillId: "numeracy" },
  { title: "Suave y áspero", prompt: "Busca algo suave y algo áspero. Tócalos y nómbralos.", minutes: 5, skillId: "language" },
  { title: "Cinco rojos", prompt: "Cuenta 5 objetos rojos. Si no hay rojos, elige otro color.", minutes: 5, skillId: "numeracy" },
  { title: "Cuento de tres", prompt: "Cuéntale a alguien una historia con perro, luna y barco.", minutes: 7, skillId: "language" },
  { title: "De menor a mayor", prompt: "Ordena tres objetos del más pequeño al más grande.", minutes: 6, skillId: "reasoning" },
  { title: "Dos puentes", prompt: "Encuentra dos maneras distintas de construir un puente con lo que tengáis a mano.", minutes: 8, skillId: "flexibility" },
  { title: "Estatua atenta", prompt: "Jugad a “congelados”: 20 segundos quietos cuando digas “luna”.", minutes: 5, skillId: "attention_inhibition" },
  { title: "Camino de memoria", prompt: "Esconde 3 juguetes. Pídele que recuerde dónde estaba cada uno.", minutes: 6, skillId: "visual_memory" },
];

export function buildDailyPlan(
  child: ChildProfile,
  estimates: SkillEstimate[],
  recentGames: GameId[],
): DailyPlan {
  const available = PLAYABLE_GAMES.filter((id) => {
    if (id === "historia" && child.ageYears < 5) return false;
    if (id === "quesigue" && child.ageYears < 5) return false;
    if (id === "casa" && child.ageYears < 5) return true;
    return true;
  });

  const scored = estimates.filter((e) => e.evidenceCount > 0);
  const priority = [...scored].sort((a, b) => {
    const conf = Number(a.confidence === "low") - Number(b.confidence === "low");
    if (conf !== 0) return -conf;
    return a.ability - b.ability;
  });
  const strengths = [...scored].sort((a, b) => b.ability - a.ability);

  const chosen: GameId[] = [];
  const pickFromSkill = (skillId: SkillId) => {
    const options = SKILLS[skillId].games.filter(
      (g) => available.includes(g) && !chosen.includes(g) && !recentGames.slice(-2).includes(g),
    );
    return options[0];
  };

  for (const estimate of priority) {
    if (chosen.length >= 2) break;
    const game = pickFromSkill(estimate.skillId);
    if (game) chosen.push(game);
  }

  const strengthGame = strengths[0] ? pickFromSkill(strengths[0].skillId) : undefined;
  if (strengthGame && chosen.length < 3) chosen.push(strengthGame);

  for (const game of available) {
    if (chosen.length >= 3) break;
    if (!chosen.includes(game) && !recentGames.includes(game)) chosen.push(game);
  }
  for (const game of available) {
    if (chosen.length >= 3) break;
    if (!chosen.includes(game)) chosen.push(game);
  }

  const focusSkill = priority[0]?.skillId ?? chosen[0];
  const missionPool = MISSIONS.filter((m) => !focusSkill || m.skillId === focusSkill);
  const missionBase = (missionPool.length ? missionPool : MISSIONS)[child.ageYears % (missionPool.length || MISSIONS.length)];

  return {
    id: uid("plan"),
    date: todayKey(),
    gameIds: chosen.slice(0, 3),
    currentIndex: 0,
    mission: {
      ...missionBase,
      id: uid("mission"),
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    completed: false,
  };
}

export function weeklyFreeRemaining(adventuresThisWeek: number, plan: "free" | "trial" | "premium"): number {
  if (plan !== "free") return 99;
  return Math.max(0, 3 - adventuresThisWeek);
}
