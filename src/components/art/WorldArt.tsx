"use client";

import { useId } from "react";
import type { InterestId, SkillId, WorldProgress } from "@/lib/types";
import { Picto } from "./Pictos";

export function GrowingTree({ stage, size = 180 }: { stage: number; size?: number }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 180 210" width={size} height={size} className="tree-sway grow-up" aria-hidden>
      <defs>
        <linearGradient id={`${uid}-bark`} x1="0" x2="1">
          <stop offset="0%" stopColor="#5a3420" />
          <stop offset="38%" stopColor="#a0663c" />
          <stop offset="70%" stopColor="#7a4a28" />
          <stop offset="100%" stopColor="#3f2416" />
        </linearGradient>
        <radialGradient id={`${uid}-a`} cx="34%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#b6dc86" />
          <stop offset="48%" stopColor="#5f8f4a" />
          <stop offset="100%" stopColor="#2d5536" />
        </radialGradient>
        <radialGradient id={`${uid}-b`} cx="40%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#d4ec9a" />
          <stop offset="100%" stopColor="#3f6d42" />
        </radialGradient>
        <radialGradient id={`${uid}-c`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#8fbf6e" />
          <stop offset="100%" stopColor="#2f5538" />
        </radialGradient>
        <filter id={`${uid}-soft`} x="-22%" y="-12%" width="144%" height="148%">
          <feDropShadow dx="0" dy="7" stdDeviation="5.5" floodColor="#122018" floodOpacity="0.32" />
        </filter>
      </defs>
      <ellipse cx="90" cy="200" rx="52" ry="9" fill="#122018" opacity="0.24" />
      {stage === 0 ? (
        <g filter={`url(#${uid}-soft)`}>
          <ellipse cx="90" cy="176" rx="12" ry="17" fill={`url(#${uid}-bark)`} />
          <ellipse cx="85" cy="168" rx="4.5" ry="7" fill="#c89a62" opacity="0.4" />
          <path d="M90 160 C96 132 118 126 120 150 C110 154 96 166 90 160" fill={`url(#${uid}-a)`} />
        </g>
      ) : (
        <g filter={`url(#${uid}-soft)`}>
          <path
            d="M80 200 C78 152 74 118 84 92 C90 108 104 116 106 90 C114 124 108 168 102 200 Z"
            fill={`url(#${uid}-bark)`}
          />
          <path d="M86 150 C68 132 56 118 48 108" stroke="#4a2a18" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M100 138 C122 122 134 112 142 104" stroke="#4a2a18" strokeWidth="5" fill="none" strokeLinecap="round" />
          <ellipse cx="90" cy={86 - stage} rx={40 + stage * 5} ry={34 + stage * 4} fill={`url(#${uid}-a)`} />
          <ellipse cx="52" cy={100 - stage} rx={26 + stage * 3} ry={22 + stage * 2} fill={`url(#${uid}-c)`} />
          <ellipse cx="128" cy={102 - stage} rx={24 + stage * 3} ry={21 + stage * 2} fill={`url(#${uid}-b)`} />
          <ellipse cx="70" cy={72 - stage} rx={20 + stage * 2} ry={17 + stage} fill={`url(#${uid}-b)`} />
          <ellipse cx="112" cy={70 - stage} rx={18 + stage * 2} ry={16 + stage} fill={`url(#${uid}-c)`} />
          <ellipse cx="90" cy={62 - stage} rx={20 + stage * 2} ry={16 + stage} fill="#d4ec9a" opacity="0.28" />
          <ellipse cx="78" cy={94 - stage} rx="14" ry="10" fill="#3d6a38" opacity="0.22" />
          {stage >= 2 ? <ellipse cx="72" cy={88 - stage} rx="11" ry="7" fill="#fff8ea" opacity="0.14" /> : null}
          {stage >= 3
            ? [0, 1, 2, 3, 4].map((i) => (
                <g key={i}>
                  <circle cx={64 + i * 13} cy={82 + (i % 2) * 10} r="4" fill="#e8b44a" />
                  <circle cx={62.5 + i * 13} cy={80.5 + (i % 2) * 10} r="1.3" fill="#fff6d2" opacity="0.7" />
                </g>
              ))
            : null}
        </g>
      )}
    </svg>
  );
}

export function Creature({ name, size = 42 }: { name: string; size?: number }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 72 72" width={size} height={size} aria-hidden>
      <defs>
        <filter id={`${uid}-s`} x="-22%" y="-12%" width="144%" height="148%">
          <feDropShadow dx="0" dy="3.5" stdDeviation="2.2" floodOpacity="0.3" />
        </filter>
        <radialGradient id={`${uid}-br`} cx="34%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#c4893a" />
          <stop offset="100%" stopColor="#5a3420" />
        </radialGradient>
        <radialGradient id={`${uid}-gr`} cx="34%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#9ec46a" />
          <stop offset="100%" stopColor="#3d6a38" />
        </radialGradient>
        <radialGradient id={`${uid}-or`} cx="34%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#f0c56a" />
          <stop offset="100%" stopColor="#b07428" />
        </radialGradient>
      </defs>
      <ellipse cx="36" cy="66" rx="16" ry="3.5" fill="#122018" opacity="0.18" />
      <g filter={`url(#${uid}-s)`}>
        {name === "búho" ? (
          <>
            <ellipse cx="36" cy="42" rx="18" ry="20" fill={`url(#${uid}-br)`} />
            <ellipse cx="36" cy="36" rx="13" ry="11" fill="#c4893a" opacity="0.32" />
            <circle cx="28" cy="36" r="7.6" fill="#fff6e4" />
            <circle cx="44" cy="36" r="7.6" fill="#fff6e4" />
            <circle cx="28" cy="37" r="3.1" fill="#1a2744" />
            <circle cx="44" cy="37" r="3.1" fill="#1a2744" />
            <circle cx="29.5" cy="35.4" r="1.15" fill="#fff" />
            <path d="M32 46 L36 52 L40 46" fill="#e6b567" />
          </>
        ) : name === "rana" ? (
          <>
            <ellipse cx="36" cy="44" rx="20" ry="14" fill={`url(#${uid}-gr)`} />
            <ellipse cx="36" cy="42" rx="11" ry="6" fill="#c5e08a" opacity="0.4" />
            <circle cx="24" cy="32" r="8" fill={`url(#${uid}-gr)`} />
            <circle cx="48" cy="32" r="8" fill={`url(#${uid}-gr)`} />
            <circle cx="24" cy="32" r="3.2" fill="#1a2744" />
            <circle cx="48" cy="32" r="3.2" fill="#1a2744" />
            <circle cx="25.4" cy="30.7" r="1.1" fill="#fff" />
          </>
        ) : name === "caracol" ? (
          <>
            <path d="M10 52 H46 C56 52 56 38 42 38" stroke="#7a4a2c" strokeWidth="6.5" fill="none" strokeLinecap="round" />
            <circle cx="46" cy="36" r="14" fill={`url(#${uid}-or)`} />
            <circle cx="46" cy="36" r="8.5" fill="#f0c56a" />
            <circle cx="46" cy="36" r="3.6" fill="#c4893a" />
            <ellipse cx="40" cy="30" rx="4" ry="2.5" fill="#fff8ea" opacity="0.45" />
          </>
        ) : name === "lumen" ? (
          <>
            <ellipse cx="22" cy="28" rx="10" ry="5" fill="#8fd08a" opacity="0.55" />
            <ellipse cx="50" cy="30" rx="10" ry="5" fill="#8fd08a" opacity="0.55" />
            <circle cx="36" cy="38" r="11" fill="#f4e287" />
            <circle cx="36" cy="38" r="16" fill="#f4e287" opacity="0.28" />
            <circle cx="33" cy="35" r="2.4" fill="#fffef4" />
          </>
        ) : name === "hoja" ? (
          <>
            <ellipse cx="36" cy="46" rx="14" ry="12" fill={`url(#${uid}-gr)`} />
            <path d="M36 18 C52 28 50 48 36 58 C22 48 20 28 36 18 Z" fill={`url(#${uid}-gr)`} />
            <path d="M36 22 V54" stroke="#2d5536" strokeWidth="1.6" />
            <circle cx="32" cy="40" r="2.2" fill="#1a2744" />
            <circle cx="40" cy="40" r="2.2" fill="#1a2744" />
          </>
        ) : name === "cometa" ? (
          <>
            <path d="M12 50 L36 28 L28 52 Z" fill="#f0c56a" opacity="0.7" />
            <circle cx="44" cy="26" r="10" fill={`url(#${uid}-or)`} />
            <circle cx="41" cy="23" r="3" fill="#fff6d2" />
          </>
        ) : name === "lucero" ? (
          <>
            <circle cx="36" cy="36" r="18" fill="#fff3c4" opacity="0.22" />
            <path d="M36 14 L40 30 L56 30 L43 40 L48 56 L36 46 L24 56 L29 40 L16 30 L32 30 Z" fill="#fff6d2" />
          </>
        ) : (
          <>
            <circle cx="36" cy="36" r="19" fill="#f0c56a" opacity="0.22" />
            <circle cx="36" cy="36" r="12" fill={`url(#${uid}-or)`} />
            <circle cx="32" cy="32" r="3.2" fill="#fff6d2" opacity="0.75" />
          </>
        )}
      </g>
    </svg>
  );
}

export function interestSky(interests: InterestId[] = []): string {
  if (interests.includes("ocean")) {
    return "radial-gradient(ellipse 80% 50% at 16% 4%, rgba(255,220,130,0.45), transparent 44%), linear-gradient(180deg,#123844 0%,#2a7d86 40%,#e3c48a 100%)";
  }
  if (interests.includes("space")) {
    return "radial-gradient(ellipse 50% 40% at 80% 8%, rgba(180,200,255,0.25), transparent 40%), linear-gradient(180deg,#0c1228 0%,#2a3868 46%,#e0b56a 100%)";
  }
  if (interests.includes("fantasy")) {
    return "radial-gradient(ellipse 70% 45% at 18% 6%, rgba(255,190,220,0.22), transparent 42%), linear-gradient(180deg,#241836 0%,#5a4a7a 48%,#e7b87a 100%)";
  }
  return "";
}

export function WorldGround({
  world,
  interests = [],
  compact = false,
}: {
  world: WorldProgress;
  interests?: InterestId[];
  compact?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const ocean = interests.includes("ocean");
  return (
    <div className={`absolute inset-x-0 bottom-0 ${compact ? "h-24" : "h-40"} ${ocean ? "bg-[#2a6664]" : ""}`}>
      <svg viewBox="0 0 400 160" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id={`${uid}-meadow`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ocean ? "#4a9a8c" : "#7eb45e"} />
            <stop offset="100%" stopColor={ocean ? "#1c4c4a" : "#2a5234"} />
          </linearGradient>
        </defs>
        <path d="M0 52 C70 18 140 68 210 34 C280 6 330 52 400 26 V160 H0 Z" fill={`url(#${uid}-meadow)`} />
        <path
          d="M0 78 C90 52 160 96 250 66 C320 46 360 86 400 64 V160 H0 Z"
          fill={ocean ? "#245a56" : "#3d6b45"}
          opacity="0.88"
        />
        {compact ? null : (
          <path d="M0 110 C120 92 220 124 400 104 V160 H0 Z" fill={ocean ? "#163c3a" : "#244830"} opacity="0.55" />
        )}
      </svg>
      {world.litRegions.map((region) => {
        const spot = REGION_SPOTS[region];
        return (
          <div
            key={region}
            className="absolute h-16 w-16 rounded-full blur-md"
            style={{
              left: spot.left,
              top: spot.top,
              background: `${spot.color}66`,
            }}
          />
        );
      })}
    </div>
  );
}

const REGION_SPOTS: Record<SkillId, { left: string; top: string; color: string }> = {
  attention_inhibition: { left: "8%", top: "22%", color: "#3F7A5A" },
  visual_memory: { left: "24%", top: "10%", color: "#6a8fbf" },
  flexibility: { left: "40%", top: "28%", color: "#8f6ab0" },
  reasoning: { left: "56%", top: "8%", color: "#c4893a" },
  visuospatial: { left: "70%", top: "24%", color: "#5a8a9a" },
  language: { left: "16%", top: "46%", color: "#b0746a" },
  numeracy: { left: "78%", top: "40%", color: "#d4a04a" },
};

const FLOWER_SPOTS = [
  { left: "5%", bottom: "34%" },
  { left: "14%", bottom: "29%" },
  { left: "23%", bottom: "36%" },
  { left: "66%", bottom: "31%" },
  { left: "76%", bottom: "37%" },
  { left: "86%", bottom: "30%" },
  { left: "9%", bottom: "42%" },
  { left: "71%", bottom: "44%" },
  { left: "32%", bottom: "28%" },
  { left: "57%", bottom: "27%" },
];

export function MeadowLife({
  world,
  compact = false,
  highlightLatest = false,
}: {
  world: WorldProgress;
  compact?: boolean;
  highlightLatest?: boolean;
}) {
  const count = Math.min(compact ? 5 : FLOWER_SPOTS.length, world.flowers ?? 0);
  const showBridge = world.treeStage >= 2 || (world.flowers ?? 0) >= 2;
  const showCottage = world.treeStage >= 3 || (world.flowers ?? 0) >= 5;
  return (
    <>
      {showBridge ? (
        <svg
          viewBox="0 0 140 36"
          className="absolute"
          style={{ left: "3%", bottom: compact ? "22%" : "38%", width: compact ? 72 : 110 }}
          aria-hidden
        >
          <path d="M8 28 C28 8 52 8 70 22 C88 8 112 8 132 28" stroke="#7a4a28" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="22" cy="30" r="5" fill="#c4893a" />
          <circle cx="48" cy="30" r="5" fill="#c4893a" />
          <circle cx="74" cy="30" r="5" fill="#c4893a" />
          <circle cx="100" cy="30" r="5" fill="#c4893a" />
          <circle cx="122" cy="30" r="5" fill="#c4893a" />
        </svg>
      ) : null}
      {showCottage ? (
        <span className="absolute" style={{ right: "6%", bottom: compact ? "16%" : "22%" }}>
          <Picto id="casa" size={compact ? 36 : 54} />
        </span>
      ) : null}
      {FLOWER_SPOTS.slice(0, count).map((spot, i) => (
        <span
          key={`flor-${i}`}
          className={`absolute ${highlightLatest && i === count - 1 ? "grow-up" : ""}`}
          style={{ left: spot.left, bottom: spot.bottom }}
        >
          <Picto id="flor" size={compact ? 22 : 32 + (i % 3) * 4} />
        </span>
      ))}
    </>
  );
}

export function Clouds() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[7%] h-32 overflow-hidden">
      <svg className="cloud-drift absolute -left-6 top-1 h-[70px] w-44 opacity-[0.62]" viewBox="0 0 160 60" aria-hidden>
        <ellipse cx="42" cy="38" rx="30" ry="16" fill="#fff" />
        <ellipse cx="74" cy="28" rx="28" ry="20" fill="#fff" />
        <ellipse cx="108" cy="38" rx="32" ry="16" fill="#fff" />
      </svg>
      <svg className="cloud-drift-slow absolute right-[-18px] top-10 h-14 w-36 opacity-[0.42]" viewBox="0 0 160 60" aria-hidden>
        <ellipse cx="48" cy="36" rx="26" ry="14" fill="#fff" />
        <ellipse cx="80" cy="28" rx="24" ry="16" fill="#fff" />
        <ellipse cx="110" cy="36" rx="28" ry="13" fill="#fff" />
      </svg>
    </div>
  );
}
