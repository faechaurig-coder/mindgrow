"use client";

import { useId, useState, type ReactNode } from "react";
import { Nilo } from "@/components/mascot/Nilo";
import { Creature } from "@/components/art/WorldArt";
import { tapLine, type CastId, type CharacterEmotion } from "@/lib/character";
import { playCritter, unlockAudio } from "@/lib/sound";

function Stage({
  name,
  size,
  motion,
  interactive,
  children,
  onPeek,
}: {
  name: string;
  size: number;
  motion: string;
  interactive?: boolean;
  children: ReactNode;
  onPeek?: (line: string) => void;
}) {
  const [reacting, setReacting] = useState(false);

  function poke() {
    unlockAudio();
    playCritter(name);
    setReacting(true);
    window.setTimeout(() => setReacting(false), 520);
    onPeek?.(tapLine(name, Date.now()));
  }

  const inner = (
    <div className={`${motion} ${reacting ? "cast-react" : ""}`} style={{ width: size, height: size }}>
      {children}
    </div>
  );

  if (!interactive) return inner;
  return (
    <button type="button" aria-label={name} className="bg-transparent p-0" onClick={poke}>
      {inner}
    </button>
  );
}

export function Lumi({
  size = 72,
  mood = "idle",
  interactive = false,
  onPeek,
}: {
  size?: number;
  mood?: CharacterEmotion;
  interactive?: boolean;
  onPeek?: (line: string) => void;
}) {
  const uid = useId().replace(/:/g, "");
  const dim = mood === "confused" || mood === "encourage";
  const bright = mood === "celebrate" || mood === "proud";
  return (
    <Stage name="lumi" size={size} motion="lumi-fly" interactive={interactive} onPeek={onPeek}>
      <svg viewBox="0 0 80 80" width={size} height={size} aria-hidden>
        <defs>
          <radialGradient id={`${uid}-g`} cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#fffef4" />
            <stop offset="55%" stopColor="#f4e287" />
            <stop offset="100%" stopColor="#d4923c" />
          </radialGradient>
        </defs>
        <ellipse cx="40" cy="74" rx="14" ry="3" fill="#122018" opacity="0.16" />
        <g className={bright ? "lumi-glow-hot" : dim ? "lumi-glow-dim" : "lumi-glow"}>
          <ellipse className="lumi-wing" cx="18" cy="30" rx="14" ry="8" fill="#c5e08a" opacity="0.45" />
          <ellipse className="lumi-wing" cx="62" cy="32" rx="14" ry="8" fill="#c5e08a" opacity="0.45" />
          <circle cx="40" cy="42" r="16" fill={`url(#${uid}-g)`} />
          <circle cx="40" cy="42" r="22" fill="#f4e287" opacity="0.22" />
          <circle cx="35" cy="38" r="2.2" fill="#1a2744" />
          <circle cx="45" cy="38" r="2.2" fill="#1a2744" />
          <circle cx="36" cy="37" r="0.7" fill="#fff" />
          <path d="M36 48 Q40 51 44 48" stroke="#b07428" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </Stage>
  );
}

export function Cami({
  size = 72,
  mood = "idle",
  interactive = false,
  onPeek,
}: {
  size?: number;
  mood?: CharacterEmotion;
  interactive?: boolean;
  onPeek?: (line: string) => void;
}) {
  const uid = useId().replace(/:/g, "");
  const rush = mood === "confused" || mood === "surprised";
  return (
    <Stage name="cami" size={size} motion="cami-waddle" interactive={interactive} onPeek={onPeek}>
      <svg viewBox="0 0 80 80" width={size} height={size} aria-hidden>
        <defs>
          <radialGradient id={`${uid}-s`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#c5e08a" />
            <stop offset="100%" stopColor="#3d6a38" />
          </radialGradient>
        </defs>
        <ellipse cx="40" cy="74" rx="18" ry="3.2" fill="#122018" opacity="0.18" />
        <g className={rush ? "cami-skin-rush" : "cami-skin"}>
          <path d="M58 52 C72 40 70 22 58 28 C64 40 62 50 58 52" fill={`url(#${uid}-s)`} />
          <ellipse cx="38" cy="48" rx="22" ry="16" fill={`url(#${uid}-s)`} />
          <circle cx="24" cy="36" r="10" fill={`url(#${uid}-s)`} />
          <circle cx="22" cy="34" r="3.4" fill="#fff6e4" />
          <circle cx="30" cy="38" r="3.1" fill="#fff6e4" />
          <circle className="cami-eye" cx="22.6" cy="34.4" r="1.5" fill="#1a2744" />
          <circle cx="30.6" cy="38.6" r="1.3" fill="#1a2744" />
          <path className="cami-tongue" d="M16 40 L6 44" stroke="#e07a6a" strokeWidth="2.4" strokeLinecap="round" />
          <ellipse cx="38" cy="46" rx="8" ry="4" fill="#fff8ea" opacity="0.25" />
        </g>
      </svg>
    </Stage>
  );
}

export function Tiko({
  size = 72,
  mood = "idle",
  interactive = false,
  onPeek,
}: {
  size?: number;
  mood?: CharacterEmotion;
  interactive?: boolean;
  onPeek?: (line: string) => void;
}) {
  const uid = useId().replace(/:/g, "");
  const stuck = mood === "confused" || mood === "thinking";
  return (
    <Stage name="tiko" size={size} motion={stuck ? "tiko-stuck" : "tiko-fidget"} interactive={interactive} onPeek={onPeek}>
      <svg viewBox="0 0 80 80" width={size} height={size} aria-hidden>
        <defs>
          <linearGradient id={`${uid}-w`} x1="0" x2="1">
            <stop offset="0%" stopColor="#c4893a" />
            <stop offset="55%" stopColor="#8a5a3b" />
            <stop offset="100%" stopColor="#5a3420" />
          </linearGradient>
        </defs>
        <ellipse cx="40" cy="74" rx="16" ry="3" fill="#122018" opacity="0.2" />
        <rect x="28" y="34" width="28" height="28" rx="6" fill={`url(#${uid}-w)`} />
        <rect className="tiko-block" x="34" y="16" width="14" height="14" rx="3" fill="#f0c56a" />
        <rect x="20" y="48" width="10" height="6" rx="2" fill="#c4893a" />
        <rect x="54" y="48" width="10" height="6" rx="2" fill="#c4893a" />
        <circle cx="36" cy="46" r="2.4" fill="#1a2744" />
        <circle cx="48" cy="46" r="2.4" fill="#1a2744" />
        <path d="M36 54 H48" stroke="#3f2416" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="34" cy="40" rx="5" ry="2.4" fill="#fff8ea" opacity="0.28" />
      </svg>
    </Stage>
  );
}

export function Companion({
  id,
  size = 80,
  mood = "curious",
  interactive = false,
  onPeek,
}: {
  id: CastId;
  size?: number;
  mood?: CharacterEmotion;
  interactive?: boolean;
  onPeek?: (line: string) => void;
}) {
  if (id === "lumi") return <Lumi size={size} mood={mood} interactive={interactive} onPeek={onPeek} />;
  if (id === "cami") return <Cami size={size} mood={mood} interactive={interactive} onPeek={onPeek} />;
  if (id === "tiko") return <Tiko size={size} mood={mood} interactive={interactive} onPeek={onPeek} />;
  return <Nilo size={size} mood={mood} interactive={interactive} onPeek={onPeek} />;
}

const HABITAT: Record<string, { left: string; bottom: string; motion: string }> = {
  lumen: { left: "10%", bottom: "48%", motion: "lumi-fly" },
  lumi: { left: "10%", bottom: "48%", motion: "lumi-fly" },
  cami: { left: "20%", bottom: "27%", motion: "cami-waddle" },
  tiko: { left: "76%", bottom: "25%", motion: "tiko-fidget" },
  hoja: { left: "68%", bottom: "40%", motion: "leaf-drift" },
  búho: { left: "56%", bottom: "50%", motion: "owl-perch" },
  rana: { left: "6%", bottom: "23%", motion: "frog-hop" },
  caracol: { left: "34%", bottom: "21%", motion: "snail-crawl" },
  cometa: { left: "78%", bottom: "60%", motion: "comet-streak" },
  lucero: { left: "46%", bottom: "66%", motion: "star-spin" },
};

export function WorldBuddy({
  name,
  size = 52,
  interactive = false,
  onPeek,
}: {
  name: string;
  size?: number;
  interactive?: boolean;
  onPeek?: (line: string) => void;
}) {
  const spot = HABITAT[name] ?? { left: "40%", bottom: "28%", motion: "nilo-float" };
  const cast: CastId | null = name === "lumen" || name === "lumi" ? "lumi" : name === "cami" ? "cami" : name === "tiko" ? "tiko" : null;
  return (
    <div className="absolute" style={{ left: spot.left, bottom: spot.bottom }}>
      {cast ? (
        <Companion id={cast} size={size} interactive={interactive} onPeek={onPeek} />
      ) : (
        <Stage name={name} size={size} motion={spot.motion} interactive={interactive} onPeek={onPeek}>
          <Creature name={name} size={size} />
        </Stage>
      )}
    </div>
  );
}
