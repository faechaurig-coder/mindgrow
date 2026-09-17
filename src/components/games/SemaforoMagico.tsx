"use client";

import { useEffect, useRef, useState } from "react";
import { Picto } from "@/components/art/Pictos";
import { playRetry, playSparkle, playSuccess, playTap } from "@/lib/sound";
import { speak } from "@/lib/speech";
import type { GamePlayProps } from "./types";
import { AnimatedInstruction } from "./AnimatedInstruction";
import { GameFeedback } from "./GameFeedback";
import { GameHost } from "./GameHost";

export function SemaforoMagico({ ageYears, rounds, sessionId, context, onRound, onComplete }: GamePlayProps) {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [crystal, setCrystal] = useState<"green" | "red">("green");
  const [starOn, setStarOn] = useState(false);
  const [pos, setPos] = useState({ x: 40, y: 40 });
  const [feedback, setFeedback] = useState("");
  const answered = useRef(false);
  const started = useRef(Date.now());

  const goTrial = index < 2 || (index % 3 !== 1 && ageYears <= 5) || Math.random() > 0.38;

  useEffect(() => {
    if (!ready) return;
    speak(index === 0 ? "Toca las estrellas cuando diga ahora." : "Espera al ahora.");
  }, [index, ready]);

  useEffect(() => {
    if (!ready) return;
    answered.current = false;
    started.current = Date.now();
    const green = index === 0 || index === 1 ? true : goTrial;
    setCrystal(green ? "green" : "red");
    setStarOn(false);
    setFeedback("");
    const appear = setTimeout(() => setStarOn(true), 450);
    const hide = setTimeout(() => {
      if (!answered.current) {
        const correct = !green;
        onRound({
          gameId: "semaforo",
          sessionId,
          context,
          difficulty: green ? 2 : 3,
          correct,
          omissions: green ? 1 : 0,
          latencyMs: Date.now() - started.current,
        });
        if (correct) playSuccess();
        else playRetry();
        setFeedback(correct ? "Bien esperado." : "Era verde. Probemos otra vez.");
        advance();
      }
    }, ageYears <= 5 ? 2400 : 1800);
    return () => {
      clearTimeout(appear);
      clearTimeout(hide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, ready]);

  function advance() {
    setTimeout(() => {
      if (index + 1 >= rounds) onComplete(true);
      else setIndex((i) => i + 1);
    }, 650);
  }

  return (
    <GameHost
      gameId="semaforo"
      title="Semáforo Mágico"
      message={feedback || (crystal === "green" ? "Verde: toca la estrella" : "Rojo: no toques")}
      total={rounds}
      current={index}
    >
      <div className="relative flex flex-1 flex-col items-center">
        {!ready ? (
          <AnimatedInstruction
            compact
            text="Toca la estrella solo cuando diga ahora."
            demo={
              <div className="flex items-center gap-3">
                <Picto id="cristal" size={56} color="#8fd08a" />
                <Picto id="estrella" size={48} />
              </div>
            }
            onDone={() => setReady(true)}
          />
        ) : null}
        <div
          className={`flex flex-col items-center rounded-[32px] px-6 py-3 ${
            crystal === "green" ? "bg-[#8fd08a33]" : "bg-[#e07a6a22]"
          }`}
          aria-live="polite"
        >
          <Picto id="cristal" size={86} color={crystal === "green" ? "#8fd08a" : "#e07a6a"} />
          <p className="h-child mt-1 text-xl font-extrabold text-white">{crystal === "green" ? "¡Ahora!" : "Espera"}</p>
        </div>
        <div className="relative mt-6 h-[320px] w-full">
          {ready && starOn ? (
            <button
              className="absolute"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => {
                if (answered.current) return;
                answered.current = true;
                playTap();
                const correct = crystal === "green";
                if (correct) playSparkle();
                else playRetry();
                onRound({
                  gameId: "semaforo",
                  sessionId,
                  context,
                  difficulty: crystal === "red" ? 4 : 2,
                  correct,
                  impulsiveErrors: crystal === "red" ? 1 : 0,
                  latencyMs: Date.now() - started.current,
                });
                setFeedback(correct ? "¡Justo a tiempo!" : "Probemos otra vez. Espera al verde.");
                setPos({ x: 15 + Math.random() * 60, y: 10 + Math.random() * 50 });
                setStarOn(false);
                advance();
              }}
            >
              <Picto id="estrella" size={64} />
            </button>
          ) : null}
        </div>
        <GameFeedback companion="nilo" kind={feedback.includes("otra") ? "retry" : feedback ? "correct" : null} />
      </div>
    </GameHost>
  );
}
