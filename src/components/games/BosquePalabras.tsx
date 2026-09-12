"use client";

import { useEffect, useMemo, useState } from "react";
import { Picto, type PictoId } from "@/components/art/Pictos";
import { vocabForAge } from "@/content/es/vocabulary";
import { seededShuffle } from "@/lib/shuffle";
import { playRetry, playSuccess, playTap } from "@/lib/sound";
import { speak } from "@/lib/speech";
import type { GamePlayProps } from "./types";
import { AnimatedInstruction } from "./AnimatedInstruction";
import { GameHost, OptionTile } from "./GameHost";

export function BosquePalabras({ ageYears, rounds, sessionId, context, onRound, onComplete }: GamePlayProps) {
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const bank = useMemo(() => vocabForAge(ageYears), [ageYears]);
  const item = useMemo(() => bank[index % bank.length], [index, bank]);
  const options = useMemo(() => {
    const extras = ageYears <= 5 ? item.also.slice(0, 2) : item.also;
    return seededShuffle([item.glyph, ...extras], index + extras.length);
  }, [item, ageYears, index]);

  useEffect(() => {
    if (!ready) return;
    speak(`¿Dónde está ${item.article} ${item.word}?`);
  }, [item, ready]);

  function choose(glyph: PictoId) {
    if (!ready) return;
    playTap();
    const correct = glyph === item.glyph;
    if (correct) playSuccess();
    else playRetry();
    onRound({
      gameId: "bosque",
      sessionId,
      context,
      difficulty: options.length,
      correct,
    });
    setTimeout(() => {
      if (index + 1 >= Math.min(rounds, 6)) onComplete(true);
      else setIndex((i) => i + 1);
    }, 320);
  }

  return (
    <GameHost title="Bosque de Palabras" message={`¿Dónde está ${item.word}?`} total={Math.min(rounds, 6)} current={index}>
      {!ready ? (
        <AnimatedInstruction
          compact
          text="Escucha la palabra y toca el dibujo."
          demo={
            <div className="flex items-center gap-3">
              <span className="text-lg font-extrabold text-white">flor</span>
              <span className="text-white/70">→</span>
              <Picto id="flor" size={48} />
            </div>
          }
          onDone={() => setReady(true)}
        />
      ) : null}
      <div className="grid grid-cols-2 gap-3">
        {options.map((glyph) => (
          <OptionTile key={glyph} onClick={() => choose(glyph)}>
            <Picto id={glyph} size={84} />
          </OptionTile>
        ))}
      </div>
    </GameHost>
  );
}
