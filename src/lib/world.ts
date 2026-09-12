import type { SkillId, WorldProgress } from "./types";

const CREATURES = ["lumen", "hoja", "búho", "rana", "cometa", "caracol", "lucero"];

const EVENTS = [
  "Una flor nueva se asoma.",
  "Lumi dejó una lucecita.",
  "El puente del valle se ilumina.",
  "Tiko apoyó una piedrita.",
  "El árbol respiró más alto.",
  "Cami saludó desde una hoja.",
];

export function growWorld(
  world: WorldProgress,
  input: {
    completedAdventure?: boolean;
    missionDone?: boolean;
    regions?: SkillId[];
    gameDone?: boolean;
  },
): WorldProgress {
  const adventuresCompleted = world.adventuresCompleted + (input.completedAdventure ? 1 : 0);
  const missionsDone = world.missionsDone + (input.missionDone ? 1 : 0);
  const sessionsCompleted = world.sessionsCompleted + (input.completedAdventure || input.missionDone ? 1 : 0);
  const treeStage = Math.min(5, Math.floor((adventuresCompleted + missionsDone) / 1.5));
  const stars = world.stars + (input.completedAdventure ? 3 : 0) + (input.missionDone ? 1 : 0);
  const bloomed = Boolean(input.completedAdventure || input.missionDone || input.gameDone);
  const flowers = (world.flowers ?? 0) + (bloomed ? 1 : 0);
  const litRegions = Array.from(new Set([...world.litRegions, ...(input.regions ?? [])]));
  const unlockedCreatures = CREATURES.slice(0, Math.min(CREATURES.length, 1 + adventuresCompleted + Math.floor(flowers / 3)));
  const lastEvent = bloomed ? EVENTS[flowers % EVENTS.length] : world.lastEvent;
  return {
    sessionsCompleted,
    adventuresCompleted,
    missionsDone,
    treeStage,
    unlockedCreatures,
    litRegions,
    stars,
    flowers,
    lastEvent,
  };
}
