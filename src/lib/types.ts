export type AgeBand = "A" | "B" | "C" | "D" | "E";

export type Screen =
  | "splash"
  | "onboarding"
  | "handoff"
  | "discovery"
  | "seed"
  | "parent-gate"
  | "parent-home"
  | "parent-skill"
  | "parent-report"
  | "parent-paywall"
  | "child-home"
  | "daily"
  | "mission"
  | "session-complete";

export type Confidence = "low" | "medium" | "high";
export type Trend = "up" | "stable" | "down" | "unknown";
export type Layer = "cognitive" | "learning" | "whole";
export type PlayContext = "discovery" | "daily" | "practice";
export type PlanKind = "free" | "trial" | "premium";
export type MissionStatus = "pending" | "done" | "skipped";
export type QualitativeLevel = "observed" | "explored" | "emerging" | "practicing" | "growing";

export type InterestId =
  | "animals"
  | "space"
  | "dinosaurs"
  | "vehicles"
  | "nature"
  | "fantasy"
  | "ocean";

export type SkillId =
  | "attention_inhibition"
  | "visual_memory"
  | "flexibility"
  | "reasoning"
  | "visuospatial"
  | "language"
  | "numeracy";

export type GameId =
  | "warmup"
  | "semaforo"
  | "luciernagas"
  | "camaleon"
  | "historia"
  | "quesigue"
  | "casa"
  | "bosque"
  | "mercado"
  | "guardianes";

export interface StartingHints {
  letters: "yes" | "some" | "not_yet" | "unsure";
  counting: "yes" | "some" | "not_yet" | "unsure";
  reading: "yes" | "some" | "not_yet" | "unsure";
}

export interface ChildProfile {
  id: string;
  nickname: string;
  ageYears: number;
  language: "es";
  otherLanguages: string[];
  schoolHint?: "preescolar" | "infantil" | "primero" | "segundo" | "tercero";
  interests: InterestId[];
  startingHints: StartingHints;
  createdAt: string;
}

export interface ParentAccount {
  id: string;
  createdAt: string;
  plan: PlanKind;
  trialEndsAt?: string;
}

export interface SkillEstimate {
  skillId: SkillId;
  ability: number;
  confidence: Confidence;
  evidenceCount: number;
  independentGames: GameId[];
  sessionCount: number;
  activeDays: number;
  trend: Trend;
  lastUpdated: string;
}

export interface Observation {
  id: string;
  gameId: GameId;
  skillId: SkillId;
  subSkillId?: string;
  difficulty: number;
  accuracy: number;
  correct: boolean;
  hints: number;
  attempts: number;
  latencyMs?: number;
  impulsiveErrors?: number;
  omissions?: number;
  timestamp: string;
  sessionId: string;
  context: PlayContext;
}

export interface GameSession {
  id: string;
  gameId: GameId;
  context: PlayContext;
  startedAt: string;
  endedAt?: string;
  completed: boolean;
  abandoned: boolean;
  difficultyStart: number;
  difficultyEnd: number;
  rounds: number;
  successes: number;
}

export interface OfflineMission {
  id: string;
  title: string;
  prompt: string;
  minutes: number;
  skillId?: SkillId;
  status: MissionStatus;
  createdAt: string;
}

export interface DailyPlan {
  id: string;
  date: string;
  gameIds: GameId[];
  currentIndex: number;
  mission: OfflineMission;
  completed: boolean;
}

export interface WorldProgress {
  sessionsCompleted: number;
  adventuresCompleted: number;
  missionsDone: number;
  treeStage: number;
  unlockedCreatures: string[];
  litRegions: SkillId[];
  stars: number;
  flowers: number;
  lastEvent: string;
}

export interface WeeklySnapshot {
  weekOf: string;
  areasExplored: SkillId[];
  observedStrength?: SkillId;
  practicing?: SkillId;
  missionsDone: number;
  adventures: number;
}

export interface AnalyticsEvent {
  name: string;
  at: string;
  props?: Record<string, string | number | boolean | null>;
}

export interface AppState {
  version: 1;
  screen: Screen;
  gateTarget: Screen | null;
  selectedSkill: SkillId | null;
  parent: ParentAccount | null;
  child: ChildProfile | null;
  estimates: SkillEstimate[];
  observations: Observation[];
  sessions: GameSession[];
  dailyPlan: DailyPlan | null;
  world: WorldProgress;
  weekly: WeeklySnapshot[];
  analytics: AnalyticsEvent[];
  discovery: {
    started: boolean;
    completed: boolean;
    queue: GameId[];
    index: number;
  };
  lastSessionGames: GameId[];
  adventuresThisWeek: number;
  weekKey: string;
  mapRevealSeen: boolean;
  settings: {
    motion: "normal" | "reduced";
    audio: "on" | "off";
    voice: "on" | "off";
  };
}
