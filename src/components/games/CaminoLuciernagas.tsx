"use client";

import { useEffect, useState } from "react";
import { Picto } from "@/components/art/Pictos";
import { createAdaptiveState, nextAdaptive } from "@/lib/adaptive";
import { playRetry, playSparkle, playSuccess, playTap } from "@/lib/sound";
import { speak } from "@/lib/speech";
import type { GamePlayProps } from "./types";
import { AnimatedInstruction } from "./AnimatedInstruction";
import { GameHost } from "./GameHost";

export function CaminoLuciernagas({ ageYears, rounds, sessionId, context, onRound, onComplete }: GamePlayProps) {
  const [ready, setReady] = useState(false);
  const [adaptive, setAdaptive] = useState(() => createAdaptiveState(ageYears, ageYears <= 5 ? 1 : 2));
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"show" | "play">("show");
  const [lit, setLit] = useState<number | null>(null);
  const [path, setPath] = useState<number[]>([]);
  const [guess, setGuess] = useState<number[]>([]);

  const stones = Math.min(5, 3 + Math.floor(adaptive.difficulty / 3));
  const length = Math.min(stones, 2 + Math.floor(adaptive.difficulty / 2));

  useEffect(() => {
    if (!ready) return;
    const nextPath = Array.from({ length }, () => Math.floor(Math.random() * stones));
    setPath(nextPath);
    setGuess([]);
    setPhase("show");
    speak(index === 0 ? "Mira el camino de luciérnagas. Luego tócalo igual." : "Mira el camino.");
    let step = 0;
    const timer = setInterval(() => {
      if (step >= nextPath.length) {
        clearInterval(timer);
        setLit(null);
        setPhase("play");
        return;
      }
      setLit(nextPath[step]);
      playSparkle();
      step += 1;
    }, ageYears <= 5 ? 850 : 650);
    return () => clearInterval(timer);
  }, [index, length, stones, ageYears, ready]);

  function choose(stone: number) {
    if (phase !== "play") return;
    const nextGuess = [...guess, stone];
    playTap();
    setGuess(nextGuess);
    setLit(stone);
    if (nextGuess.length < path.length) return;
    const correct = nextGuess.every((v, i) => v === path[i]);
    if (correct) playSuccess();
    else playRetry();
    onRound({
      gameId: "luciernagas",
      sessionId,
      context,
      difficulty: adaptive.difficulty,
      correct,
    });
    setAdaptive((s) => nextAdaptive(s, correct, ageYears, context === "discovery" ? "discovery" : "daily"));
    setTimeout(() => {
      if (index + 1 >= rounds) onComplete(true);
      else setIndex((i) => i + 1);
    }, 500);
  }

  return (
    <GameHost
      title="Camino de Luciérnagas"
      message={phase === "show" ? "Lumi perdió el camino. Mira." : "Ayuda a Lumi"}
      total={rounds}
      current={index}
    >
      {!ready ? (
        <AnimatedInstruction
          compact
          text="Mira el camino de luces. Luego tócalo igual."
          demo={
            <div className="flex items-center gap-3">
              <Picto id="luciernaga" size={48} />
              <Picto id="piedra" size={40} />
              <Picto id="luciernaga" size={48} />
            </div>
          }
          onDone={() => setReady(true)}
        />
      ) : null}
      <div className="flex flex-1 items-center justify-center">
        <div className="grid w-full grid-cols-3 gap-4">
          {Array.from({ length: stones }).map((_, i) => (
            <button
              key={i}
              disabled={phase !== "play"}
              onClick={() => choose(i)}
              className={`h-24 rounded-[30px] transition ${
                lit === i ? "stone-lit firefly" : "stone-idle"
              } ${phase !== "play" ? "pointer-events-none" : ""}`}
            >
              <Picto id={lit === i ? "luciernaga" : "piedra"} size={40} />
            </button>
          ))}
        </div>
      </div>
    </GameHost>
  );
}
