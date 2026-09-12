"use client";

import { useEffect } from "react";
import { setAudioEnabled } from "@/lib/sound";
import { effectiveMotion } from "@/lib/settings";
import { setVoiceEnabled } from "@/lib/speech";
import {
  ChildHome,
  DailyAdventure,
  DiscoveryAdventure,
  RealWorldMission,
  SeedMoment,
  SessionComplete,
} from "@/components/child/ChildFlows";
import { ParentGate } from "@/components/gates/ParentGate";
import { Handoff, OnboardingFlow, Splash } from "@/components/onboarding/OnboardingFlow";
import { ParentDashboard, Paywall, SkillDetail, WeeklyReport } from "@/components/parent/ParentFlows";
import { AppShell } from "@/components/shell/AppShell";
import { useApp } from "@/store/app-store";

const CHILD_SCREENS = new Set([
  "handoff",
  "discovery",
  "seed",
  "child-home",
  "daily",
  "mission",
  "session-complete",
]);

export function AppRoot() {
  const { state, hydrated, reset } = useApp();
  useEffect(() => {
    if (!hydrated) return;
    const settings = state.settings ?? { motion: "normal" as const, audio: "on" as const, voice: "on" as const };
    setAudioEnabled(settings.audio === "on");
    setVoiceEnabled(settings.voice === "on");
    document.documentElement.dataset.motion = effectiveMotion(settings);
  }, [hydrated, state.settings]);
  if (!hydrated) {
    return (
      <AppShell>
        <div className="flex min-h-dvh items-center justify-center text-[#1a2744]">Cargando el mundo…</div>
      </AppShell>
    );
  }

  const mood = CHILD_SCREENS.has(state.screen) ? "child" : "parent";

  return (
    <AppShell mood={mood}>
      {state.screen === "splash" ? <Splash /> : null}
      {state.screen === "onboarding" ? <OnboardingFlow /> : null}
      {state.screen === "handoff" ? <Handoff /> : null}
      {state.screen === "discovery" ? <DiscoveryAdventure /> : null}
      {state.screen === "seed" ? <SeedMoment /> : null}
      {state.screen === "parent-gate" ? <ParentGate /> : null}
      {state.screen === "parent-home" ? <ParentDashboard /> : null}
      {state.screen === "parent-skill" ? <SkillDetail /> : null}
      {state.screen === "parent-report" ? <WeeklyReport /> : null}
      {state.screen === "parent-paywall" ? <Paywall /> : null}
      {state.screen === "child-home" ? <ChildHome /> : null}
      {state.screen === "daily" ? <DailyAdventure /> : null}
      {state.screen === "mission" ? <RealWorldMission /> : null}
      {state.screen === "session-complete" ? <SessionComplete /> : null}
      <button
        className="absolute bottom-2 right-3 text-[10px] text-black/20"
        onClick={reset}
        aria-label="Reiniciar demo"
      >
        reset
      </button>
    </AppShell>
  );
}
