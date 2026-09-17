"use client";

import { useState } from "react";
import { Picto } from "@/components/art/Pictos";
import { Nilo } from "@/components/mascot/Nilo";
import { playSuccess, playTap } from "@/lib/sound";
import { GameHost } from "./GameHost";

export function Warmup({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<"tap" | "leaf" | "done">("tap");
  const [holdingLeaf, setHoldingLeaf] = useState(false);

  function finish() {
    playSuccess();
    setStep("done");
    setTimeout(onComplete, 700);
  }

  return (
    <GameHost
      gameId="warmup"
      title="Primeros pasos"
      message={
        step === "tap" ? "Toca a Nilo" : step === "leaf" ? "Toca la hojita y luego a Nilo" : "¡Ya sabemos jugar!"
      }
    >
      <div className="relative flex flex-1 flex-col items-center justify-center">
        <button
          className="pop-in"
          onClick={() => {
            playTap();
            if (step === "tap") setStep("leaf");
            if (step === "leaf" && holdingLeaf) finish();
            if (step === "done") onComplete();
          }}
        >
          <Nilo size={150} mood={step === "done" ? "cheer" : "wave"} />
        </button>
        {step === "leaf" ? (
          <button
            className={`mt-10 ${holdingLeaf ? "pulse-soft" : ""}`}
            onClick={() => {
              playTap();
              setHoldingLeaf(true);
            }}
          >
            <Picto id="hoja" size={72} />
          </button>
        ) : null}
      </div>
    </GameHost>
  );
}
