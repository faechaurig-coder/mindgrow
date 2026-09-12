"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from "react";
import { discoveryQueue } from "@/lib/age";
import { buildDailyPlan, weeklyFreeRemaining } from "@/lib/daily-plan";
import { uid, weekKey } from "@/lib/ids";
import { skillByGame } from "@/lib/ontology";
import { makeEvent } from "@/lib/analytics";
import { toObservation, upsertEstimates, type ObservationInput } from "@/lib/scoring";
import type { AppSettings } from "@/lib/settings";
import { clearState, defaultState, loadState, saveState } from "@/lib/storage";
import { growWorld } from "@/lib/world";
import type {
  AppState,
  ChildProfile,
  GameId,
  ParentAccount,
  Screen,
  SkillId,
  StartingHints,
} from "@/lib/types";

type Action =
  | { type: "hydrate"; state: AppState }
  | { type: "go"; screen: Screen }
  | { type: "gate"; target: Screen }
  | { type: "select-skill"; skillId: SkillId }
  | {
      type: "create-family";
      child: Omit<ChildProfile, "id" | "createdAt" | "language"> & { language?: "es" };
    }
  | { type: "start-discovery" }
  | { type: "advance-discovery" }
  | { type: "record"; inputs: ObservationInput[] }
  | { type: "finish-game"; gameId: GameId; completed: boolean }
  | { type: "finish-discovery" }
  | { type: "ensure-daily" }
  | { type: "advance-daily" }
  | { type: "finish-daily" }
  | { type: "mission"; status: "done" | "skipped" }
  | { type: "start-trial" }
  | { type: "dismiss-reveal" }
  | { type: "settings"; settings: Partial<AppSettings> }
  | { type: "track"; name: string; props?: Record<string, string | number | boolean | null> }
  | { type: "reset" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "go":
      return { ...state, screen: action.screen };
    case "gate":
      return { ...state, screen: "parent-gate", gateTarget: action.target };
    case "select-skill":
      return { ...state, selectedSkill: action.skillId, screen: "parent-skill" };
    case "create-family": {
      const parent: ParentAccount = {
        id: uid("p"),
        createdAt: new Date().toISOString(),
        plan: "free",
      };
      const child: ChildProfile = {
        id: uid("c"),
        nickname: action.child.nickname.trim() || "Peque",
        ageYears: action.child.ageYears,
        language: "es",
        otherLanguages: action.child.otherLanguages,
        schoolHint: action.child.schoolHint,
        interests: action.child.interests,
        startingHints: action.child.startingHints,
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        parent,
        child,
        discovery: {
          started: false,
          completed: false,
          queue: discoveryQueue(child.ageYears),
          index: 0,
        },
        screen: "handoff",
        analytics: [...state.analytics, makeEvent("onboarding_complete")!].filter(Boolean),
      };
    }
    case "start-discovery":
      return {
        ...state,
        discovery: { ...state.discovery, started: true, index: 0 },
        screen: "discovery",
        analytics: [...state.analytics, makeEvent("discovery_start")!].filter(Boolean),
      };
    case "advance-discovery":
      return {
        ...state,
        discovery: { ...state.discovery, index: state.discovery.index + 1 },
      };
    case "record": {
      if (!state.child) return state;
      const observations = action.inputs.map((input) => toObservation(input, uid("obs")));
      const history = [...state.observations, ...observations];
      return {
        ...state,
        observations: history,
        estimates: upsertEstimates(state.estimates, observations, state.child.ageYears, history),
      };
    }
    case "finish-game": {
      const skillId = skillByGame(action.gameId);
      const regions = skillId && action.completed ? [skillId] : [];
      return {
        ...state,
        lastSessionGames: [...state.lastSessionGames, action.gameId].slice(-8),
        world: growWorld(state.world, { regions, gameDone: true }),
      };
    }
    case "finish-discovery": {
      const estimates = state.estimates.map((e) => ({
        ...e,
        confidence: "low" as const,
        trend: "unknown" as const,
      }));
      return {
        ...state,
        estimates,
        discovery: { ...state.discovery, completed: true },
        world: growWorld(state.world, {
          completedAdventure: true,
          regions: estimates.map((e) => e.skillId),
        }),
        screen: "seed",
        adventuresThisWeek: state.adventuresThisWeek + 1,
        analytics: [...state.analytics, makeEvent("discovery_complete")!, makeEvent("seed_reveal")!].filter(Boolean),
      };
    }
    case "ensure-daily": {
      if (!state.child) return state;
      if (state.dailyPlan && state.dailyPlan.date === new Date().toISOString().slice(0, 10) && !state.dailyPlan.completed) {
        return { ...state, screen: "daily" };
      }
      if (weeklyFreeRemaining(state.adventuresThisWeek, state.parent?.plan ?? "free") <= 0) {
        return { ...state, screen: "parent-gate", gateTarget: "parent-paywall" };
      }
      return {
        ...state,
        dailyPlan: buildDailyPlan(state.child, state.estimates, state.lastSessionGames),
        screen: "daily",
      };
    }
    case "advance-daily": {
      if (!state.dailyPlan) return state;
      const nextIndex = state.dailyPlan.currentIndex + 1;
      if (nextIndex >= state.dailyPlan.gameIds.length) {
        return { ...state, dailyPlan: { ...state.dailyPlan, currentIndex: nextIndex }, screen: "mission" };
      }
      return { ...state, dailyPlan: { ...state.dailyPlan, currentIndex: nextIndex } };
    }
    case "finish-daily":
      return {
        ...state,
        dailyPlan: state.dailyPlan ? { ...state.dailyPlan, completed: true } : null,
        world: growWorld(state.world, { completedAdventure: true }),
        adventuresThisWeek: state.adventuresThisWeek + 1,
        screen: "session-complete",
      };
    case "mission": {
      if (!state.dailyPlan) {
        return {
          ...state,
          world: action.status === "done" ? growWorld(state.world, { missionDone: true }) : state.world,
          screen: "session-complete",
        };
      }
      return {
        ...state,
        dailyPlan: {
          ...state.dailyPlan,
          completed: true,
          mission: { ...state.dailyPlan.mission, status: action.status },
        },
        world: growWorld(state.world, {
          completedAdventure: true,
          missionDone: action.status === "done",
        }),
        adventuresThisWeek: state.adventuresThisWeek + (state.dailyPlan.completed ? 0 : 1),
        screen: "session-complete",
      };
    }
    case "dismiss-reveal":
      return {
        ...state,
        mapRevealSeen: true,
        analytics: [...state.analytics, makeEvent("map_reveal_seen")!].filter(Boolean),
      };
    case "settings":
      return { ...state, settings: { ...state.settings, ...action.settings } };
    case "track": {
      const event = makeEvent(action.name, action.props);
      if (!event) return state;
      return { ...state, analytics: [...state.analytics, event].slice(-80) };
    }
    case "start-trial": {
      if (!state.parent) return state;
      const ends = new Date();
      ends.setDate(ends.getDate() + 14);
      return {
        ...state,
        parent: { ...state.parent, plan: "trial", trialEndsAt: ends.toISOString() },
        screen: "parent-home",
      };
    }
    case "reset":
      return { ...defaultState(), weekKey: weekKey() };
    default:
      return state;
  }
}

interface Store {
  state: AppState;
  hydrated: boolean;
  go: (screen: Screen) => void;
  requestParent: (target: Screen) => void;
  selectSkill: (skillId: SkillId) => void;
  createFamily: (child: {
    nickname: string;
    ageYears: number;
    otherLanguages: string[];
    interests: ChildProfile["interests"];
    startingHints: StartingHints;
    schoolHint?: ChildProfile["schoolHint"];
  }) => void;
  startDiscovery: () => void;
  advanceDiscovery: () => void;
  record: (inputs: ObservationInput[]) => void;
  finishGame: (gameId: GameId, completed: boolean) => void;
  finishDiscovery: () => void;
  startDaily: () => void;
  advanceDaily: () => void;
  finishDaily: () => void;
  completeMission: (status: "done" | "skipped") => void;
  startTrial: () => void;
  dismissMapReveal: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  track: (name: string, props?: Record<string, string | number | boolean | null>) => void;
  reset: () => void;
}

const StoreContext = createContext<Store | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, defaultState);
  const [hydrated, setHydrated] = useState(false);
  const persist = useRef(false);

  useEffect(() => {
    dispatch({ type: "hydrate", state: loadState() });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!persist.current) {
      persist.current = true;
      return;
    }
    saveState(state);
  }, [state, hydrated]);

  const api = useMemo<Store>(
    () => ({
      state,
      hydrated,
      go: (screen) => dispatch({ type: "go", screen }),
      requestParent: (target) => dispatch({ type: "gate", target }),
      selectSkill: (skillId) => dispatch({ type: "select-skill", skillId }),
      createFamily: (child) => dispatch({ type: "create-family", child }),
      startDiscovery: () => dispatch({ type: "start-discovery" }),
      advanceDiscovery: () => dispatch({ type: "advance-discovery" }),
      record: (inputs) => dispatch({ type: "record", inputs }),
      finishGame: (gameId, completed) => dispatch({ type: "finish-game", gameId, completed }),
      finishDiscovery: () => dispatch({ type: "finish-discovery" }),
      startDaily: () => dispatch({ type: "ensure-daily" }),
      advanceDaily: () => dispatch({ type: "advance-daily" }),
      finishDaily: () => dispatch({ type: "finish-daily" }),
      completeMission: (status) => dispatch({ type: "mission", status }),
      startTrial: () => dispatch({ type: "start-trial" }),
      dismissMapReveal: () => dispatch({ type: "dismiss-reveal" }),
      updateSettings: (settings) => dispatch({ type: "settings", settings }),
      track: (name, props) => dispatch({ type: "track", name, props }),
      reset: () => {
        clearState();
        dispatch({ type: "reset" });
      },
    }),
    [state, hydrated],
  );

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useApp() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useApp outside provider");
  return ctx;
}
