"use client";

import { useRef, useState } from "react";
import { PrimaryButton } from "@/components/ui/primitives";
import { useApp } from "@/store/app-store";

export function ParentGate() {
  const { state, go } = useApp();
  const [puzzle] = useState(() => {
    const tick = Date.now();
    const a = 14 + (tick % 13);
    const b = 9 + ((tick >> 2) % 12);
    return { a, b, sum: a + b };
  });
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [held, setHeld] = useState(false);
  const timer = useRef<number | null>(null);

  function startHold() {
    timer.current = window.setTimeout(() => setHeld(true), 1800);
  }
  function endHold() {
    if (timer.current) window.clearTimeout(timer.current);
  }

  return (
    <div className="safe-pad flex h-full min-h-dvh flex-col justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-[#5b7f6a]">Espacio adulto</p>
        <h1 className="h-display mt-3 text-[34px] leading-tight text-[#1a2744]">
          ¿Puedes confirmar que eres un adulto?
        </h1>
        <p className="mt-3 text-[15px] leading-6 text-[#243044]/80">
          Mantén pulsado el círculo y luego resuelve la suma. Así el mundo del niño queda fuera de las compras.
        </p>
        <button
          type="button"
          aria-pressed={held}
          onPointerDown={startHold}
          onPointerUp={endHold}
          onPointerLeave={endHold}
          className={`mt-8 h-24 w-24 rounded-full ${
            held ? "btn-3d bg-[linear-gradient(180deg,#4f7a62,#355545)]" : "tile-3d"
          }`}
        >
          {held ? "Listo" : "Mantén"}
        </button>
        {held ? (
          <>
            <p className="mt-8 text-[18px] font-semibold text-[#1a2744]">
              ¿Cuánto es {puzzle.a} + {puzzle.b}?
            </p>
            <input
              inputMode="numeric"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
              className="field-lux mt-4 w-full rounded-2xl px-4 py-4 text-[22px] outline-none"
              placeholder="Escribe el resultado"
            />
            {error ? <p className="mt-2 text-sm text-[#9a4a32]">Prueba otra vez. Sin prisa.</p> : null}
          </>
        ) : (
          <p className="mt-4 text-sm text-[#243044]/60">Sostén dos segundos. Un niño suele soltar antes.</p>
        )}
      </div>
      <div className="space-y-2">
        <PrimaryButton
          disabled={!held}
          onClick={() => {
            if (Number(value) === puzzle.sum) {
              go(state.gateTarget ?? (state.child ? "parent-home" : "onboarding"));
            } else {
              setError(true);
            }
          }}
        >
          Entrar
        </PrimaryButton>
        <button
          className="w-full py-3 text-[#5b7f6a]"
          onClick={() => go(state.discovery.completed ? "child-home" : "handoff")}
        >
          Volver
        </button>
      </div>
    </div>
  );
}
