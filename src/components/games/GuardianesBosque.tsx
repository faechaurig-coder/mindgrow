"use client";

import { useEffect, useMemo, useState } from "react";
import { Picto, type PictoId } from "@/components/art/Pictos";
import { seededShuffle } from "@/lib/shuffle";
import { playRetry, playSuccess, playTap } from "@/lib/sound";
import { speak } from "@/lib/speech";
import type { GamePlayProps } from "./types";
import { AnimatedInstruction } from "./AnimatedInstruction";
import { GameHost } from "./GameHost";

const DISTRACTORS: PictoId[] = ["arbol", "hongo", "rana", "buho", "zorro", "arbusto", "hongo2", "flor"];

export function GuardianesBosque({ ageYears, rounds, sessionId, context, onRound, onComplete }: GamePlayProps) {
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const count = ageYears <= 5 ? 4 : Math.min(8, 5 + Math.floor(index / 2));
  const field = useMemo(() => {
    const decoys = DISTRACTORS.slice(0, count - 1);
    const items = seededShuffle([...decoys, "amigo" as const], index + count);
    return items;
  }, [index, count]);

  useEffect(() => {
    if (!ready) return;
    speak(index === 0 ? "Toca al amigo con la hojita." : "¿Dónde está el amigo?");
  }, [index, ready]);

  function choose(id: PictoId) {
    if (!ready) return;
    playTap();
    const correct = id === "amigo";
    if (correct) playSuccess();
    else playRetry();
    onRound({
      gameId: "guardianes",
      sessionId,
      context,
      difficulty: count,
      correct,
      subSkillId: "selective_attention",
      impulsiveErrors: correct ? 0 : 1,
    });
    setTimeout(() => {
      if (index + 1 >= Math.min(rounds, 6)) onComplete(true);
      else setIndex((i) => i + 1);
    }, 380);
  }

  return (
    <GameHost
      gameId="guardianes"
      title="Guardianes del Bosque"
      message="Toca al amigo con la hojita"
      total={Math.min(rounds, 6)}
      current={index}
    >
      {!ready ? (
        <AnimatedInstruction
          compact
          text="Toca solo al amigo con la hojita."
          demo={
            <div className="flex items-center gap-3">
              <Picto id="arbol" size={44} />
              <Picto id="amigo" size={52} />
              <Picto id="rana" size={44} />
            </div>
          }
          onDone={() => setReady(true)}
        />
      ) : null}
      <div className={`grid gap-3 ${count > 6 ? "grid-cols-3" : "grid-cols-2"}`}>
        {field.map((id, i) => (
          <button
            key={`${id}-${i}`}
            aria-label={id === "amigo" ? "amigo" : "otro"}
            onClick={() => choose(id)}
            className={`tile-3d big-hit sway-soft flex aspect-square items-center justify-center rounded-[32px] ${
              ageYears >= 7 ? "delay-anim" : ""
            }`}
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <Picto id={id} size={88} />
          </button>
        ))}
      </div>
    </GameHost>
  );
}
