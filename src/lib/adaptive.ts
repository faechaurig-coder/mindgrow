import { difficultyBounds } from "./age";

export interface AdaptiveState {
  difficulty: number;
  streakCorrect: number;
  streakWrong: number;
  recentCorrect: boolean[];
  hintsUsed: number;
}

export function createAdaptiveState(ageYears: number, start?: number): AdaptiveState {
  const bounds = difficultyBounds(ageYears);
  const difficulty = clamp(start ?? bounds.min + 1, bounds.min, bounds.max);
  return { difficulty, streakCorrect: 0, streakWrong: 0, recentCorrect: [], hintsUsed: 0 };
}

export function nextAdaptive(
  state: AdaptiveState,
  correct: boolean,
  ageYears: number,
  mode: "discovery" | "daily",
  extra?: { hint?: boolean; fatigued?: boolean },
): AdaptiveState {
  const bounds = difficultyBounds(ageYears);
  const recentCorrect = [...state.recentCorrect, correct].slice(-6);
  let difficulty = state.difficulty;
  let streakCorrect = correct ? state.streakCorrect + 1 : 0;
  let streakWrong = correct ? 0 : state.streakWrong + 1;
  const hintsUsed = state.hintsUsed + (extra?.hint ? 1 : 0);

  if (extra?.fatigued) {
    difficulty -= 1;
    streakCorrect = 0;
    streakWrong = 0;
  } else {
    if (streakCorrect >= 2 && hintsUsed < 2) {
      difficulty += 1;
      streakCorrect = 0;
    }
    if (streakWrong >= 2) {
      difficulty -= 1;
      streakWrong = 0;
    }
    if (mode === "discovery" && recentCorrect.length >= 3) {
      const rate = recentCorrect.filter(Boolean).length / recentCorrect.length;
      if (rate > 0.9) difficulty += 1;
      if (rate < 0.4) difficulty -= 1;
    }
  }

  return {
    difficulty: clamp(difficulty, bounds.min, bounds.max),
    streakCorrect,
    streakWrong,
    recentCorrect,
    hintsUsed,
  };
}

export function successRate(results: boolean[]): number {
  if (results.length === 0) return 0;
  return results.filter(Boolean).length / results.length;
}

export function looksFatigued(input: {
  randomTaps?: number;
  noResponse?: number;
  abandonAttempts?: number;
  accuracyDrop?: boolean;
}): boolean {
  return (
    (input.randomTaps ?? 0) >= 6 ||
    (input.noResponse ?? 0) >= 3 ||
    (input.abandonAttempts ?? 0) >= 2 ||
    Boolean(input.accuracyDrop)
  );
}

export function simulateAdaptive(profile: boolean[], ageYears = 6, mode: "discovery" | "daily" = "daily") {
  return profile.reduce((state, correct) => nextAdaptive(state, correct, ageYears, mode), createAdaptiveState(ageYears, 3));
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
