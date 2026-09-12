"use client";

import { useEffect, useState } from "react";
import { Picto, type PictoId } from "@/components/art/Pictos";
import { haptic } from "@/lib/haptics";
import { playRetry, playSuccess, playTap } from "@/lib/sound";
import { speak } from "@/lib/speech";
import type { GamePlayProps } from "./types";
import { AnimatedInstruction } from "./AnimatedInstruction";
import { GameFeedback } from "./GameFeedback";
import { GameHost } from "./GameHost";

const HOUSES = [
  { roof: "techo", door: "puertaCasa", window: "ventana" },
  { roof: "techo", door: "puertaCasa", window: "estrella" },
  { roof: "techo", door: "puertaCasa", window: "luna" },
] as const;

type Slot = "roof" | "door" | "window";

export function CasaPuzzle({ ageYears, rounds, sessionId, context, onRound, onComplete }: GamePlayProps) {
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const house = HOUSES[index % HOUSES.length];
  const [placed, setPlaced] = useState<Record<string, PictoId>>({});
  const [holding, setHolding] = useState<PictoId | null>(null);
  const [errors, setErrors] = useState(0);
  const [note, setNote] = useState<"correct" | "retry" | null>(null);
  const pieces: Slot[] = ageYears <= 4 ? ["roof", "door"] : ["roof", "door", "window"];
  const canDrag = ageYears >= 6;

  useEffect(() => {
    if (!ready) return;
    speak("Tiko necesita cada pieza en su lugar.");
  }, [ready, index]);

  function resetRound(nextIndex: number) {
    setIndex(nextIndex);
    setPlaced({});
    setHolding(null);
    setErrors(0);
    setNote(null);
  }

  function place(slot: Slot) {
    if (!ready || !holding) return;
    playTap();
    haptic("tap");
    if (holding !== house[slot]) {
      playRetry();
      haptic("errorSoft");
      setErrors((e) => e + 1);
      setNote("retry");
      return;
    }
    const next = { ...placed, [slot]: holding };
    setPlaced(next);
    setHolding(null);
    setNote("correct");
    haptic("success");
    if (pieces.every((p) => next[p])) {
      playSuccess();
      onRound({
        gameId: "casa",
        sessionId,
        context,
        difficulty: pieces.length,
        correct: errors === 0,
        attempts: 1 + errors,
        subSkillId: errors === 0 ? "construction" : "spatial_mismatch",
      });
      setTimeout(() => {
        if (index + 1 >= Math.min(rounds, 3)) onComplete(true);
        else resetRound(index + 1);
      }, 500);
    }
  }

  const unused = pieces.map((p) => house[p]).filter((glyph) => !Object.values(placed).includes(glyph));

  return (
    <GameHost title="Casa Puzzle" message="Ayuda a Tiko: toca una pieza y su lugar" total={Math.min(rounds, 3)} current={index}>
      {!ready ? (
        <AnimatedInstruction
          compact
          text="Toca una pieza y luego su lugar en la casa."
          demo={
            <div className="flex items-center gap-3">
              <Picto id="techo" size={44} />
              <span className="text-white/70">→</span>
              <Picto id="casa" size={48} />
            </div>
          }
          onDone={() => setReady(true)}
        />
      ) : null}
      <div className="mx-auto flex w-56 flex-col items-center gap-3">
        <SlotWell
          label="techo"
          filled={placed.roof}
          ghost={holding === house.roof ? house.roof : undefined}
          onDrop={() => place("roof")}
          className="h-20 w-40 rounded-t-[40px]"
        />
        <div className="flex w-44 justify-between rounded-b-3xl bg-[linear-gradient(180deg,#e8c48a,#c4893a)] p-4 shadow-[0_12px_24px_rgba(18,26,48,0.16)]">
          {pieces.includes("window") ? (
            <SlotWell
              label="ventana"
              filled={placed.window}
              ghost={holding === house.window ? house.window : undefined}
              onDrop={() => place("window")}
              className="h-14 w-14 rounded-xl"
              size={36}
            />
          ) : (
            <span />
          )}
          <SlotWell
            label="puerta"
            filled={placed.door}
            ghost={holding === house.door ? house.door : undefined}
            onDrop={() => place("door")}
            className="h-16 w-12 rounded-t-xl"
            size={36}
          />
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-3">
        {unused.map((glyph) => (
          <button
            key={glyph}
            draggable={canDrag}
            onDragStart={() => setHolding(glyph)}
            onClick={() => {
              if (!ready) return;
              setHolding(glyph);
            }}
            className={`tile-3d flex h-20 w-20 items-center justify-center rounded-3xl ${
              holding === glyph ? "ring-4 ring-[#e6b567] ring-offset-2 ring-offset-transparent" : ""
            }`}
          >
            <Picto id={glyph} size={48} />
          </button>
        ))}
      </div>
      <GameFeedback kind={note} />
    </GameHost>
  );
}

function SlotWell({
  label,
  filled,
  ghost,
  onDrop,
  className,
  size = 56,
}: {
  label: string;
  filled?: PictoId;
  ghost?: PictoId;
  onDrop: () => void;
  className: string;
  size?: number;
}) {
  return (
    <button
      aria-label={label}
      onClick={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
      }}
      className={`tile-3d flex items-center justify-center ${className}`}
    >
      {filled ? <Picto id={filled} size={size} /> : ghost ? (
        <span className="opacity-35">
          <Picto id={ghost} size={size} />
        </span>
      ) : (
        <span className="text-[#1a274433]">▢</span>
      )}
    </button>
  );
}
