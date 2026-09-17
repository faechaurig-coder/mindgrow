"use client";

import { useEffect, useMemo, useState } from "react";
import { Picto, type PictoId } from "@/components/art/Pictos";
import { playRetry, playSuccess, playTap } from "@/lib/sound";
import { speak } from "@/lib/speech";
import type { GamePlayProps } from "./types";
import { AnimatedInstruction } from "./AnimatedInstruction";
import { GameHost } from "./GameHost";

const FRUITS: PictoId[] = ["manzana", "pera", "naranja", "limon", "fresa", "manzana"];

export function MercadoMagico({ ageYears, rounds, sessionId, context, onRound, onComplete }: GamePlayProps) {
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const target = useMemo(() => (ageYears <= 5 ? 2 + (index % 3) : 3 + (index % 4)), [index, ageYears]);
  const compare = index % 2 === 1;
  const [picked, setPicked] = useState<number[]>([]);
  const left = 3 + (index % 3);
  const right = 5 + (index % 2);

  useEffect(() => {
    if (!ready) return;
    setPicked([]);
    speak(compare ? "¿Dónde hay más?" : `Dame ${target} manzanas.`);
  }, [index, compare, target, ready]);

  function finishCount() {
    if (!ready) return;
    playTap();
    const correct = picked.length === target;
    if (correct) playSuccess();
    else playRetry();
    onRound({
      gameId: "mercado",
      sessionId,
      context,
      difficulty: target,
      correct,
      subSkillId: target <= 3 ? "subitizing" : "counting",
    });
    next();
  }

  function finishCompare(side: "left" | "right") {
    if (!ready) return;
    playTap();
    const correct = side === (right > left ? "right" : "left");
    if (correct) playSuccess();
    else playRetry();
    onRound({ gameId: "mercado", sessionId, context, difficulty: 3, correct, subSkillId: "magnitude" });
    next();
  }

  function next() {
    setTimeout(() => {
      if (index + 1 >= Math.min(rounds, 5)) onComplete(true);
      else setIndex((i) => i + 1);
    }, 320);
  }

  return (
    <GameHost
      gameId="mercado"
      title="Mercado Mágico"
      message={compare ? "¿Dónde hay más?" : `Toca ${target}`}
      total={Math.min(rounds, 5)}
      current={index}
    >
      {!ready ? (
        <AnimatedInstruction
          compact
          text="Toca las frutas que te piden. Luego Listo."
          demo={
            <div className="flex items-center gap-2">
              <Picto id="manzana" size={40} />
              <Picto id="manzana" size={40} />
              <span className="text-sm font-bold text-white">2</span>
            </div>
          }
          onDone={() => setReady(true)}
        />
      ) : null}
      {compare ? (
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => finishCompare("left")} className="tile-3d flex flex-wrap justify-center gap-1 rounded-[28px] p-4">
            {Array.from({ length: left }).map((_, i) => (
              <Picto key={i} id="naranja" size={28} />
            ))}
          </button>
          <button onClick={() => finishCompare("right")} className="tile-3d flex flex-wrap justify-center gap-1 rounded-[28px] p-4">
            {Array.from({ length: right }).map((_, i) => (
              <Picto key={i} id="naranja" size={28} />
            ))}
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3">
            {FRUITS.map((fruit, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!ready) return;
                  setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
                }}
                className={`tile-3d flex h-20 items-center justify-center rounded-[28px] ${
                  picked.includes(i) ? "ring-4 ring-[#e6b567] ring-offset-2 ring-offset-transparent" : ""
                }`}
              >
                <Picto id={fruit} size={52} />
              </button>
            ))}
          </div>
          <button
            onClick={finishCount}
            className="btn-3d mt-6 w-full rounded-full bg-[linear-gradient(180deg,#f0c56a_0%,#d4923c_52%,#b07428_100%)] py-4 font-bold text-white"
          >
            Listo ({picked.length})
          </button>
        </>
      )}
    </GameHost>
  );
}
