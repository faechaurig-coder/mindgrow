import type { AnalyticsEvent } from "./types";

const ALLOWED = new Set([
  "onboarding_start",
  "onboarding_complete",
  "handoff",
  "discovery_start",
  "game_tutorial_start",
  "game_tutorial_complete",
  "game_start",
  "round_complete",
  "game_complete",
  "session_exit",
  "discovery_complete",
  "seed_reveal",
  "child_home",
  "daily_start",
  "mission_presented",
  "mission_done",
  "session_complete",
  "parent_dashboard_open",
  "map_reveal_seen",
  "skill_detail_open",
  "report_open",
  "trial_view",
  "trial_start",
]);

const FORBIDDEN_KEYS = /name|email|phone|address|birth|photo|voice|lat|lng|childId|nickname/i;

export function sanitizeProps(props?: Record<string, string | number | boolean | null>) {
  if (!props) return undefined;
  const clean: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(props)) {
    if (FORBIDDEN_KEYS.test(key)) continue;
    if (typeof value === "string" && value.length > 40) continue;
    clean[key] = value;
  }
  return Object.keys(clean).length ? clean : undefined;
}

export function makeEvent(name: string, props?: Record<string, string | number | boolean | null>): AnalyticsEvent | null {
  if (!ALLOWED.has(name)) return null;
  return { name, at: new Date().toISOString(), props: sanitizeProps(props) };
}

export function hasPii(event: AnalyticsEvent): boolean {
  if (!event.props) return false;
  return Object.keys(event.props).some((key) => FORBIDDEN_KEYS.test(key));
}
