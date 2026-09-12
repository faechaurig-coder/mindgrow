import { agePriorAbility } from "./age";
import { skillByGame } from "./ontology";
import type {
  Confidence,
  GameId,
  Observation,
  PlayContext,
  SkillEstimate,
  SkillId,
  Trend,
} from "./types";

export interface ObservationInput {
  gameId: GameId;
  skillId?: SkillId;
  subSkillId?: string;
  difficulty: number;
  correct: boolean;
  hints?: number;
  attempts?: number;
  latencyMs?: number;
  impulsiveErrors?: number;
  omissions?: number;
  sessionId: string;
  context: PlayContext;
}

export function toObservation(input: ObservationInput, id: string): Observation {
  const skillId = input.skillId ?? skillByGame(input.gameId);
  if (!skillId) {
    throw new Error("Observation without skill");
  }
  return {
    id,
    gameId: input.gameId,
    skillId,
    subSkillId: input.subSkillId,
    difficulty: input.difficulty,
    accuracy: input.correct ? 1 : 0,
    correct: input.correct,
    hints: input.hints ?? 0,
    attempts: input.attempts ?? 1,
    latencyMs: input.latencyMs,
    impulsiveErrors: input.impulsiveErrors,
    omissions: input.omissions,
    timestamp: new Date().toISOString(),
    sessionId: input.sessionId,
    context: input.context,
  };
}

export function emptyEstimate(skillId: SkillId, ageYears: number): SkillEstimate {
  return {
    skillId,
    ability: agePriorAbility(ageYears),
    confidence: "low",
    evidenceCount: 0,
    independentGames: [],
    sessionCount: 0,
    activeDays: 0,
    trend: "unknown",
    lastUpdated: new Date().toISOString(),
  };
}

function expectedScore(ability: number, difficulty: number): number {
  return 1 / (1 + Math.exp(-(ability - difficultyToAbility(difficulty)) / 12));
}

function difficultyToAbility(difficulty: number): number {
  return 20 + difficulty * 9;
}

export function applyObservation(
  estimate: SkillEstimate,
  observation: Observation,
  ageYears: number,
): SkillEstimate {
  const prior = estimate.evidenceCount === 0 ? agePriorAbility(ageYears) : estimate.ability;
  const k = estimate.evidenceCount < 4 ? 10 : estimate.evidenceCount < 10 ? 7 : 4;
  const hintPenalty = observation.hints > 0 ? 0.35 : 0;
  const actual = Math.max(0, observation.accuracy - hintPenalty);
  const expected = expectedScore(prior, observation.difficulty);
  const nextAbility = clamp(prior + k * (actual - expected), 8, 96);

  const games = estimate.independentGames.includes(observation.gameId)
    ? estimate.independentGames
    : [...estimate.independentGames, observation.gameId];

  const evidenceCount = estimate.evidenceCount + 1;
  const sessionCount = estimate.sessionCount;

  return {
    ...estimate,
    ability: Math.round(nextAbility),
    evidenceCount,
    independentGames: games,
    confidence: confidenceFor({
      evidenceCount,
      games: games.length,
      sessions: sessionCount,
      activeDays: estimate.activeDays,
      forceLow: observation.context === "discovery" && estimate.activeDays <= 1 && evidenceCount < 8,
    }),
    lastUpdated: observation.timestamp,
  };
}

export function markSession(estimate: SkillEstimate): SkillEstimate {
  return {
    ...estimate,
    sessionCount: estimate.sessionCount + 1,
    confidence: confidenceFor({
      evidenceCount: estimate.evidenceCount,
      games: estimate.independentGames.length,
      sessions: estimate.sessionCount + 1,
      activeDays: estimate.activeDays,
      forceLow: estimate.activeDays <= 1,
    }),
  };
}

export function confidenceFor(input: {
  evidenceCount: number;
  games: number;
  sessions: number;
  activeDays?: number;
  forceLow?: boolean;
}): Confidence {
  const days = input.activeDays ?? input.sessions;
  if (input.forceLow) return "low";
  if (input.evidenceCount >= 14 && days >= 3 && input.games >= 2) return "high";
  if (input.evidenceCount >= 6 && (days >= 2 || input.games >= 2)) return "medium";
  return "low";
}

export function abilityToDots(ability: number, confidence: Confidence): number {
  if (confidence === "low") {
    if (ability < 38) return 2;
    if (ability > 68) return 4;
    return 3;
  }
  if (ability < 30) return 1;
  if (ability < 45) return 2;
  if (ability < 60) return 3;
  if (ability < 75) return 4;
  return 5;
}

export function computeTrend(history: Observation[]): Trend {
  if (history.length < 8) return "unknown";
  const recent = history.slice(-6);
  const older = history.slice(-12, -6);
  if (older.length < 3) return "unknown";
  const recentAvg = average(recent.map((o) => o.accuracy));
  const olderAvg = average(older.map((o) => o.accuracy));
  const delta = recentAvg - olderAvg;
  if (delta > 0.12) return "up";
  if (delta < -0.12) return "down";
  return "stable";
}

export function upsertEstimates(
  estimates: SkillEstimate[],
  incoming: Observation[],
  ageYears: number,
  history: Observation[] = incoming,
): SkillEstimate[] {
  const next = [...estimates];
  for (const observation of incoming) {
    let current = next.find((e) => e.skillId === observation.skillId);
    if (!current) {
      current = emptyEstimate(observation.skillId, ageYears);
      next.push(current);
    }
    const updated = applyObservation(current, observation, ageYears);
    const index = next.findIndex((e) => e.skillId === updated.skillId);
    next[index] = updated;
  }
  return next.map((estimate) => {
    const skillObs = history.filter((o) => o.skillId === estimate.skillId);
    const days = new Set(skillObs.map((o) => o.timestamp.slice(0, 10)));
    const sessions = new Set(skillObs.map((o) => o.sessionId));
    return {
      ...estimate,
      sessionCount: sessions.size,
      activeDays: days.size,
      trend: computeTrend(skillObs),
      confidence: confidenceFor({
        evidenceCount: estimate.evidenceCount,
        games: estimate.independentGames.length,
        sessions: sessions.size,
        activeDays: days.size,
        forceLow: days.size <= 1,
      }),
    };
  });
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
