"use client";

import { useId, useState } from "react";
import type { CharacterEmotion } from "@/lib/character";
import { tapLine } from "@/lib/character";
import { playNiloHello, playNiloOops, unlockAudio } from "@/lib/sound";

type LegacyMood = "idle" | "wave" | "think" | "cheer" | "sleep";
type Mood = CharacterEmotion | LegacyMood;

function resolve(mood: Mood): CharacterEmotion {
  if (mood === "wave") return "curious";
  if (mood === "think") return "thinking";
  if (mood === "cheer") return "celebrate";
  if (mood === "sleep") return "sleepy";
  return mood;
}

export function Nilo({
  size = 112,
  mood = "idle",
  className = "",
  interactive = false,
  onPeek,
}: {
  size?: number;
  mood?: Mood;
  className?: string;
  interactive?: boolean;
  onPeek?: (line: string) => void;
}) {
  const emotion = resolve(mood);
  const look = emotion === "thinking" || emotion === "confused" ? -4 : emotion === "curious" ? 3 : 0;
  const leafDrop = emotion === "confused" || emotion === "encourage" ? 12 : emotion === "sleepy" ? 18 : 0;
  const uid = useId().replace(/:/g, "");
  const [reacting, setReacting] = useState(false);

  function poke() {
    if (!interactive) return;
    unlockAudio();
    if (emotion === "confused") playNiloOops();
    else playNiloHello();
    setReacting(true);
    window.setTimeout(() => setReacting(false), 560);
    onPeek?.(tapLine("nilo", Date.now()));
  }

  const art = (
    <div
      className={`nilo-stage nilo-mood-${emotion} ${reacting ? "cast-react" : ""} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden={!interactive}
    >
      <svg viewBox="0 0 160 160" width={size} height={size}>
        <defs>
          <radialGradient id={`${uid}-body`} cx="36%" cy="28%" r="74%">
            <stop offset="0%" stopColor="#fff8e4" />
            <stop offset="38%" stopColor="#f4d2a2" />
            <stop offset="78%" stopColor="#d9a56a" />
            <stop offset="100%" stopColor="#b07840" />
          </radialGradient>
          <radialGradient id={`${uid}-leaf`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#b6dc86" />
            <stop offset="55%" stopColor="#5f8f4a" />
            <stop offset="100%" stopColor="#2f5538" />
          </radialGradient>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe08a" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffe08a" stopOpacity="0" />
          </radialGradient>
          <filter id={`${uid}-soft`} x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="7" stdDeviation="4.5" floodColor="#1a2744" floodOpacity="0.26" />
          </filter>
        </defs>
        <ellipse className="nilo-shadow" cx="80" cy="148" rx="42" ry="8" fill="#1a2744" opacity="0.18" />
        <circle cx="80" cy="86" r="62" fill={`url(#${uid}-glow)`} opacity="0.5" />
        <g filter={`url(#${uid}-soft)`} className="nilo-bob">
          <g className="nilo-leaf" transform={`rotate(${leafDrop} 110 40)`}>
            <path d="M94 40 C102 12 132 14 130 38 C130 50 110 56 96 52" fill={`url(#${uid}-leaf)`} />
            <path d="M104 28 C114 14 132 20 124 40" fill="#d4ec9a" opacity="0.5" />
            <path d="M100 26 C109 36 113 50 106 54" stroke="#2f5640" strokeWidth="1.5" fill="none" opacity="0.4" />
          </g>
          <g className="nilo-body">
            <circle cx="78" cy="88" r="47" fill={`url(#${uid}-body)`} />
            <ellipse cx="58" cy="68" rx="18" ry="11" fill="#fff8ea" opacity="0.5" />
            <g className="nilo-blink">
              <circle cx="61" cy="78" r="13.8" fill="#fffaf0" />
              <circle cx="97" cy="78" r="13.8" fill="#fffaf0" />
              {emotion === "sleepy" ? (
                <>
                  <path d="M53 80 Q62 87 71 80" stroke="#243044" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                  <path d="M89 80 Q98 87 107 80" stroke="#243044" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                </>
              ) : (
                <g className="nilo-look">
                  <circle cx={62 + look} cy="80" r="6.2" fill="#243044" />
                  <circle cx={98 + look} cy="80" r="6.2" fill="#243044" />
                  <circle cx={64.2 + look} cy="77.6" r="2.1" fill="#fff" />
                  <circle cx={100.2 + look} cy="77.6" r="2.1" fill="#fff" />
                </g>
              )}
            </g>
            <path
              d={
                emotion === "celebrate" || emotion === "proud"
                  ? "M63 104 Q78 120 94 104"
                  : emotion === "confused"
                    ? "M66 110 Q78 106 90 110"
                    : emotion === "sleepy"
                      ? "M68 108 Q78 110 88 108"
                      : "M65 106 Q78 116 92 106"
              }
              stroke="#c4893a"
              strokeWidth="4.2"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx="49" cy="97" rx="7" ry="5" fill="#e89b78" opacity="0.55" />
            <ellipse cx="108" cy="97" rx="7" ry="5" fill="#e89b78" opacity="0.55" />
            <circle cx="78" cy="54" r="7.5" fill="#f0c56a" />
            <circle cx="76" cy="52" r="2.4" fill="#fff6d2" opacity="0.7" />
          </g>
        </g>
      </svg>
    </div>
  );

  if (!interactive) return art;
  return (
    <button type="button" aria-label="Nilo" className="bg-transparent p-0" onClick={poke}>
      {art}
    </button>
  );
}

export function SpeechBubble({
  text,
  child = false,
}: {
  text: string;
  child?: boolean;
}) {
  return (
    <div
      className={`bubble-lux pop-in relative max-w-[280px] rounded-[22px] px-4 py-3 text-center ${
        child ? "h-child text-[20px] font-extrabold text-[#1a2744] !text-shadow-none" : "text-[15px] leading-6 text-[#243044]"
      }`}
      style={child ? { textShadow: "none" } : undefined}
    >
      {text}
    </div>
  );
}
