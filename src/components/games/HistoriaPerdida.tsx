"use client";

import { useEffect, useMemo, useState } from "react";
import { Picto, type PictoId } from "@/components/art/Pictos";
import { playRetry, playSuccess, playTap } from "@/lib/sound";
import { speak } from "@/lib/speech";
import type { GamePlayProps } from "./types";
import { AnimatedInstruction } from "./AnimatedInstruction";
import { GameHost, OptionTile } from "./GameHost";

const STORIES: PictoId[][] = [
  ["cama", "zapato", "puerta", "bici"],
  ["lluvia", "paraguas", "caminar", "casa"],
  ["huevo", "sarten", "plato", "sonrisa"],
];

function shuffle<T>(list: T[]) {
  return [...list].sort(() => Math.random() - 0.5);
}

export function HistoriaPerdida({ ageYears, rounds, sessionId, context, onRound, onComplete }: GamePlayProps) {
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"show" | "play">("show");
  const story = useMemo(() => STORIES[index % STORIES.length].slice(0, ageYears <= 5 ? 3 : 4), [index, ageYears]);
  const [pool, setPool] = useState(story);
  const [built, setBuilt] = useState<PictoId[]>([]);

  useEffect(() => {
    if (!ready) return;
    setPhase("show");
    setBuilt([]);
    setPool(story);
    speak("Mira el cuento. Después ordénalo.");
    const t = setTimeout(() => {
      setPhase("play");
      setPool(shuffle(story));
    }, 2800);
    return () => clearTimeout(t);
  }, [story, ready]);

  function pick(item: PictoId) {
    if (!ready || phase !== "play") return;
    playTap();
    const next = [...built, item];
    setBuilt(next);
    setPool((p) => p.filter((x) => x !== item));
    if (next.length === story.length) {
      const correct = next.every((v, i) => v === story[i]);
      if (correct) playSuccess();
      else playRetry();
      onRound({
        gameId: "historia",
        sessionId,
        context,
        difficulty: story.length,
        correct,
      });
      setTimeout(() => {
        if (index + 1 >= Math.min(rounds, 3)) onComplete(true);
        else setIndex((i) => i + 1);
      }, 500);
    }
  }

  return (
    <GameHost
      gameId="historia"
      title="La Historia Perdida"
      message={phase === "show" ? "Mira qué pasa" : "¿Qué pasó primero?"}
      total={Math.min(rounds, 3)}
      current={index}
    >
      {!ready ? (
        <AnimatedInstruction
          compact
          text="Mira el cuento. Luego ordénalo igual."
          demo={
            <div className="flex items-center gap-2">
              <Picto id="cama" size={40} />
              <Picto id="zapato" size={40} />
              <Picto id="puerta" size={40} />
            </div>
          }
          onDone={() => setReady(true)}
        />
      ) : null}
      <div className="mb-6 flex justify-center gap-2">
        {story.map((_, i) => (
          <div key={i} className="tile-3d flex h-16 w-16 items-center justify-center rounded-2xl">
            {built[i] ? <Picto id={built[i]} size={40} /> : <span className="text-[#1a274466]">?</span>}
          </div>
        ))}
      </div>
      {phase === "show" ? (
        <div className="grid grid-cols-4 gap-2">
          {story.map((item) => (
            <div key={item} className="tile-3d flex h-20 items-center justify-center rounded-[24px]">
              <Picto id={item} size={48} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {pool.map((item) => (
            <OptionTile key={item} onClick={() => pick(item)}>
              <Picto id={item} size={56} />
            </OptionTile>
          ))}
        </div>
      )}
    </GameHost>
  );
}
