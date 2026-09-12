"use client";

import { useEffect, useMemo, useState } from "react";
import { Picto, SHAPE_COLOR } from "@/components/art/Pictos";
import { playRetry, playSuccess, playTap } from "@/lib/sound";
import { speak } from "@/lib/speech";
import type { GamePlayProps } from "./types";
import { AnimatedInstruction } from "./AnimatedInstruction";
import { GameHost, OptionTile } from "./GameHost";

type Shape = "circle" | "square" | "triangle";
type Color = "rojo" | "azul" | "amarillo";
type Rule = "color" | "shape";

const SHAPES: Shape[] = ["circle", "square", "triangle"];
const COLOR_LIST: Color[] = ["rojo", "azul", "amarillo"];

function shapeId(shape: Shape) {
  if (shape === "circle") return "circulo" as const;
  if (shape === "square") return "cuadrado" as const;
  return "triangulo" as const;
}

export function CamaleonClasificador({ ageYears, rounds, sessionId, context, onRound, onComplete }: GamePlayProps) {
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const rule: Rule = index < Math.ceil(rounds / 2) ? "color" : "shape";
  const items = useMemo(() => {
    const count = ageYears <= 5 ? 4 : 6;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      color: COLOR_LIST[i % (ageYears <= 4 ? 2 : 3)],
      shape: SHAPES[i % (ageYears <= 4 ? 2 : 3)],
    }));
  }, [index, ageYears]);
  const [remaining, setRemaining] = useState(items);
  const [selected, setSelected] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    if (!ready) return;
    setRemaining(items);
    setSelected(null);
    setErrors(0);
    speak(rule === "color" ? "Pon juntos los del mismo color." : "Ahora por forma.");
  }, [index, items, rule, ready]);

  const baskets = rule === "color" ? COLOR_LIST.slice(0, ageYears <= 4 ? 2 : 3) : SHAPES.slice(0, ageYears <= 4 ? 2 : 3);

  function drop(target: string) {
    if (!ready || selected === null) return;
    const item = remaining.find((p) => p.id === selected);
    if (!item) return;
    const ok = rule === "color" ? item.color === target : item.shape === target;
    playTap();
    if (!ok) {
      playRetry();
      setErrors((e) => e + 1);
      return;
    }
    const next = remaining.filter((p) => p.id !== selected);
    setRemaining(next);
    setSelected(null);
    if (next.length === 0) {
      playSuccess();
      onRound({
        gameId: "camaleon",
        sessionId,
        context,
        difficulty: rule === "shape" ? 4 : 2,
        correct: errors === 0,
        attempts: 1 + errors,
        subSkillId: errors === 0 ? "rule_switching" : "perseveration",
      });
      setTimeout(() => {
        if (index + 1 >= Math.min(rounds, 4)) onComplete(true);
        else setIndex((i) => i + 1);
      }, 400);
    }
  }

  return (
    <GameHost
      title="Camaleón Clasificador"
      message={rule === "color" ? "Cami quiere colores juntos" : "Ahora Cami quiere formas"}
      total={Math.min(rounds, 4)}
      current={index}
    >
      {!ready ? (
        <AnimatedInstruction
          compact
          text="Cami junta los del mismo color. Toca y luego el cesto."
          demo={
            <div className="flex items-center gap-3">
              <Picto id="circulo" size={44} color={SHAPE_COLOR.rojo} />
              <span className="text-white/70">→</span>
              <span className="h-8 w-8 rounded-full" style={{ background: SHAPE_COLOR.rojo }} />
            </div>
          }
          onDone={() => setReady(true)}
        />
      ) : null}
      <p className="mb-3 text-center text-sm font-bold text-white/90" aria-live="polite">
        {rule === "color" ? "Regla: color" : "Regla nueva: forma"}
      </p>
      <div className="grid grid-cols-3 gap-3">
        {remaining.map((item) => (
          <OptionTile key={item.id} selected={selected === item.id} onClick={() => ready && setSelected(item.id)}>
            <Picto id={shapeId(item.shape)} size={48} color={SHAPE_COLOR[item.color]} />
          </OptionTile>
        ))}
      </div>
      <div className="mt-auto grid grid-cols-3 gap-3 pt-6">
        {baskets.map((b) => (
          <button
            key={b}
            onClick={() => drop(b)}
            aria-label={rule === "color" ? `Cesto ${b}` : `Cesto ${b}`}
            className="tile-3d rounded-[24px] py-4 text-[18px] font-bold text-[#1a2744]"
          >
            {rule === "color" ? (
              <span className="mx-auto block h-7 w-7 rounded-full" style={{ background: SHAPE_COLOR[b as Color] }} />
            ) : (
              <Picto id={shapeId(b as Shape)} size={36} color="#1a2744" />
            )}
          </button>
        ))}
      </div>
    </GameHost>
  );
}
