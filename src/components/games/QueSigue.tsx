"use client";

import { useEffect, useMemo, useState } from "react";
import { Picto } from "@/components/art/Pictos";
import { createAdaptiveState, nextAdaptive } from "@/lib/adaptive";
import { generatePattern, type PatternToken } from "@/lib/patterns";
import { playRetry, playSuccess, playTap } from "@/lib/sound";
import { speak } from "@/lib/speech";
import type { GamePlayProps } from "./types";
import { AnimatedInstruction } from "./AnimatedInstruction";
import { GameHost, OptionTile } from "./GameHost";

export function QueSigue({ ageYears, rounds, sessionId, context, onRound, onComplete }: GamePlayProps) {
  const [ready, setReady] = useState(false);
  const [adaptive, setAdaptive] = useState(() => createAdaptiveState(ageYears, 2));
  const [index, setIndex] = useState(0);
  const item = useMemo(() => generatePattern(ageYears, index + ageYears * 3), [index, ageYears]);

  useEffect(() => {
    if (!ready) return;
    speak("¿Qué sigue?");
  }, [index, ready]);

  function choose(option: PatternToken) {
    if (!ready) return;
    playTap();
    const correct = option.label === item.answer;
    if (correct) playSuccess();
    else playRetry();
    onRound({
      gameId: "quesigue",
      sessionId,
      context,
      difficulty: adaptive.difficulty,
      correct,
    });
    setAdaptive((s) => nextAdaptive(s, correct, ageYears, context === "discovery" ? "discovery" : "daily"));
    setTimeout(() => {
      if (index + 1 >= Math.min(rounds, 5)) onComplete(true);
      else setIndex((i) => i + 1);
    }, 350);
  }

  return (
    <GameHost title="¿Qué sigue?" message="Mira el patrón y toca la pieza" total={Math.min(rounds, 5)} current={index}>
      {!ready ? (
        <AnimatedInstruction
          compact
          text="Mira el patrón. Toca la pieza que sigue."
          demo={
            <div className="flex items-center gap-2">
              <Picto id="circulo" size={36} />
              <Picto id="cuadrado" size={36} />
              <Picto id="circulo" size={36} />
              <span className="text-xl font-bold text-white">?</span>
            </div>
          }
          onDone={() => setReady(true)}
        />
      ) : null}
      <div className="mb-8 flex justify-center gap-2">
        {item.seq.map((v, i) => (
          <span key={i} className="tile-3d flex h-14 w-14 items-center justify-center rounded-2xl">
            <Picto id={v.id} size={36} color={v.color} />
          </span>
        ))}
        <span className="stone-idle flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white">?</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {item.options.map((option) => (
          <OptionTile key={option.label} onClick={() => choose(option)}>
            <Picto id={option.id} size={48} color={option.color} />
          </OptionTile>
        ))}
      </div>
    </GameHost>
  );
}
