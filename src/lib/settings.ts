export type MotionPref = "normal" | "reduced";
export type AudioPref = "on" | "off";

export interface AppSettings {
  motion: MotionPref;
  audio: AudioPref;
  voice: AudioPref;
}

export const DEFAULT_SETTINGS: AppSettings = {
  motion: "normal",
  audio: "on",
  voice: "on",
};

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function effectiveMotion(settings: AppSettings): MotionPref {
  if (settings.motion === "reduced" || prefersReducedMotion()) return "reduced";
  return "normal";
}
