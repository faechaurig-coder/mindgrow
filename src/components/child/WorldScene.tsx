"use client";

import type { ReactNode } from "react";
import { Clouds, Creature, GrowingTree, MeadowLife, WorldGround, interestSky } from "@/components/art/WorldArt";
import { Nilo } from "@/components/mascot/Nilo";
import type { InterestId, WorldProgress } from "@/lib/types";

export function ChildStage({
  children,
  mode = "ambient",
}: {
  children: ReactNode;
  mode?: "ambient" | "focused" | "celebration";
}) {
  const focused = mode === "focused";
  return (
    <div className={`relative flex h-full min-h-0 flex-col ${focused ? "world-focused" : ""}`}>
      <div className="absolute inset-0 child-sky" />
      {focused ? null : <div className="sun-orb" />}
      {focused ? null : <div className="rays" />}
      {focused ? null : <Clouds />}
      <div className="vignette" />
      <div className="relative z-10 flex h-full min-h-0 flex-col">{children}</div>
    </div>
  );
}

export function WorldScene({
  world,
  interests = [],
  compact = false,
  immersive = false,
  highlightLatest = false,
}: {
  world: WorldProgress;
  interests?: InterestId[];
  compact?: boolean;
  immersive?: boolean;
  highlightLatest?: boolean;
}) {
  const tint = interestSky(interests);
  const tall = immersive ? "h-full" : compact ? "h-52" : "h-[340px]";
  return (
    <div className={`relative overflow-hidden ${tall}`} style={tint ? { backgroundImage: tint } : undefined}>
      {!tint ? <div className="absolute inset-0 child-sky" /> : null}
      <div className="sun-orb" />
      <div className="rays" />
      <Clouds />
      <div className="pointer-events-none absolute right-6 top-10 h-24 w-24 rounded-full bg-white/25 blur-2xl" />
      {Array.from({ length: Math.min(9, 3 + Math.floor(world.stars / 2)) }).map((_, i) => (
        <span
          key={`star-${i}`}
          className="star-twinkle absolute rounded-full bg-[#fff8ea] shadow-[0_0_12px_#fff3c4]"
          style={{
            width: i % 3 === 0 ? 5 : 3,
            height: i % 3 === 0 ? 5 : 3,
            left: `${8 + i * 11}%`,
            top: `${5 + (i % 4) * 7}%`,
            animationDelay: `${i * 0.22}s`,
          }}
        />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={`fly-${i}`}
          className="firefly-drift absolute rounded-full bg-[#f4e287]"
          style={{
            width: 5,
            height: 5,
            left: `${18 + i * 15}%`,
            bottom: `${22 + (i % 3) * 8}%`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}
      <svg className="absolute inset-x-0 top-[26%] h-28 w-full" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden>
        <path d="M0 62 C80 18 140 74 220 32 C300 2 340 52 400 26 V100 H0 Z" fill="#4d7a6a" opacity="0.32" />
        <path d="M0 74 C100 42 180 86 280 50 C340 30 370 66 400 52 V100 H0 Z" fill="#3a6458" opacity="0.38" />
      </svg>
      <WorldGround world={world} interests={interests} compact={compact} />
      <MeadowLife world={world} compact={compact} highlightLatest={highlightLatest} />
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: immersive ? "46%" : compact ? 20 : 32 }}
      >
        <GrowingTree stage={world.treeStage} size={immersive || !compact ? 220 : 120} />
      </div>
      {world.unlockedCreatures.slice(0, 4).map((creature, i) => (
        <span
          key={creature}
          className="nilo-float absolute"
          style={{
            left: 14 + i * 88,
            bottom: immersive ? "30%" : 16 + (i % 2) * 12,
            animationDelay: `${i * 0.35}s`,
          }}
        >
          <Creature name={creature} size={46} />
        </span>
      ))}
      <div className="absolute right-1 top-2">
        <Nilo size={compact ? 72 : immersive ? 108 : 100} mood="idle" />
      </div>
      {compact ? null : <div className="vignette" />}
    </div>
  );
}
