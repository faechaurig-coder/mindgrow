import type { AppState, WorldProgress } from "./types";
import { weekKey } from "./ids";
import { DEFAULT_SETTINGS } from "./settings";
import { confidenceFor, computeTrend } from "./scoring";

export const STORAGE_KEY = "mindgrow.v1";

export function defaultWorld(): WorldProgress {
  return {
    sessionsCompleted: 0,
    adventuresCompleted: 0,
    missionsDone: 0,
    treeStage: 0,
    unlockedCreatures: [],
    litRegions: [],
    stars: 0,
    flowers: 0,
    lastEvent: "",
  };
}

export function defaultState(): AppState {
  return {
    version: 1,
    screen: "splash",
    gateTarget: null,
    selectedSkill: null,
    parent: null,
    child: null,
    estimates: [],
    observations: [],
    sessions: [],
    dailyPlan: null,
    world: defaultWorld(),
    weekly: [],
    analytics: [],
    discovery: {
      started: false,
      completed: false,
      queue: [],
      index: 0,
    },
    lastSessionGames: [],
    adventuresThisWeek: 0,
    weekKey: weekKey(),
    mapRevealSeen: false,
    settings: DEFAULT_SETTINGS,
  };
}

export function loadState(): AppState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as AppState;
    if (parsed.version !== 1) return defaultState();
    const currentWeek = weekKey();
    if (parsed.weekKey !== currentWeek) {
      return reconcile({ ...parsed, weekKey: currentWeek, adventuresThisWeek: 0 });
    }
    return reconcile(parsed);
  } catch {
    return defaultState();
  }
}

export function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function reconcile(state: AppState): AppState {
  return {
    ...state,
    settings: state.settings ?? DEFAULT_SETTINGS,
    mapRevealSeen: state.mapRevealSeen ?? false,
    world: {
      ...state.world,
      flowers: state.world.flowers ?? 0,
      lastEvent: state.world.lastEvent ?? "",
    },
    estimates: state.estimates.map((estimate) => {
      const skillObs = state.observations.filter((o) => o.skillId === estimate.skillId);
      const days = new Set(skillObs.map((o) => o.timestamp.slice(0, 10)));
      return {
        ...estimate,
        sessionCount: days.size,
        trend: computeTrend(skillObs),
        confidence: confidenceFor({
          evidenceCount: estimate.evidenceCount,
          games: estimate.independentGames.length,
          sessions: days.size,
          forceLow: days.size <= 1,
        }),
      };
    }),
  };
}

export function clearState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
