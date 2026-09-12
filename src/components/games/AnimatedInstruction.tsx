"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Nilo } from "@/components/mascot/Nilo";
import { speak } from "@/lib/speech";
import type { CharacterEmotion } from "@/lib/character";

export type InstructionPhase = "observe" | "demonstrate" | "invite" | "done";

export function AnimatedInstruction({
  text,
  demo,
  onDone,
  compact = false,
}: {
  text: string;
  demo: ReactNode;
  onDone: () => void;
  compact?: boolean;
}) {
  const [phase, setPhase] = useState<InstructionPhase>("observe");
  const finish = useRef(onDone);
  finish.current = onDone;

  useEffect(() => {
    speak(text);
    const demoAt = window.setTimeout(() => setPhase("demonstrate"), 700);
    const inviteAt = window.setTimeout(() => setPhase("invite"), 1800);
    const doneAt = window.setTimeout(() => {
      setPhase("done");
      finish.current();
    }, 2600);
    return () => {
      window.clearTimeout(demoAt);
      window.clearTimeout(inviteAt);
      window.clearTimeout(doneAt);
    };
  }, [text]);

  const emotion: CharacterEmotion =
    phase === "observe" ? "thinking" : phase === "demonstrate" ? "curious" : "encourage";

  if (phase === "done") return null;

  return (
    <div className="mb-4 flex flex-col items-center gap-3">
      {compact ? null : <Nilo size={72} mood={emotion} />}
      <p className="text-center text-sm font-bold text-white/90">{text}</p>
      <div className={`transition ${phase === "demonstrate" ? "scale-105" : "opacity-80"}`}>{demo}</div>
    </div>
  );
}
