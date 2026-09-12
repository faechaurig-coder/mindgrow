import type { AgeBand } from "./types";

export function ageBand(ageYears: number): AgeBand {
  if (ageYears <= 4) return "A";
  if (ageYears === 5) return "B";
  if (ageYears === 6) return "C";
  if (ageYears === 7) return "D";
  return "E";
}

export function agePriorAbility(ageYears: number): number {
  return Math.round(18 + ageYears * 6);
}

export function sessionMinutes(ageYears: number): { min: number; max: number } {
  return ageYears <= 5 ? { min: 8, max: 12 } : { min: 10, max: 15 };
}

export function discoveryQueue(ageYears: number): Array<
  | "warmup"
  | "semaforo"
  | "luciernagas"
  | "camaleon"
  | "historia"
  | "quesigue"
  | "casa"
  | "bosque"
  | "mercado"
  | "guardianes"
> {
  const band = ageBand(ageYears);
  if (band === "A") {
    return ["warmup", "semaforo", "luciernagas", "camaleon", "bosque", "mercado"];
  }
  if (band === "B") {
    return ["warmup", "semaforo", "luciernagas", "camaleon", "historia", "bosque", "mercado"];
  }
  if (band === "C") {
    return ["warmup", "semaforo", "luciernagas", "camaleon", "guardianes", "bosque", "mercado"];
  }
  return ["warmup", "semaforo", "luciernagas", "camaleon", "guardianes", "quesigue", "bosque"];
}

export function difficultyBounds(ageYears: number): { min: number; max: number } {
  if (ageYears <= 4) return { min: 1, max: 4 };
  if (ageYears === 5) return { min: 1, max: 5 };
  if (ageYears === 6) return { min: 2, max: 6 };
  if (ageYears === 7) return { min: 2, max: 7 };
  return { min: 2, max: 8 };
}

export function roundsForGame(ageYears: number, context: "discovery" | "daily"): number {
  if (context === "discovery") return ageYears <= 5 ? 5 : 6;
  return ageYears <= 5 ? 6 : 8;
}
