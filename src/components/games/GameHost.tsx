"use client";

import type { ReactNode } from "react";
import { ChildStage } from "@/components/child/WorldScene";
import { Nilo, SpeechBubble } from "@/components/mascot/Nilo";
import { emotionForHost, type CharacterEmotion } from "@/lib/character";
import { speak } from "@/lib/speech";
import { ProgressPips } from "@/components/ui/primitives";

export function GameHost({
  title,
  message,
  total,
  current,
  children,
  footer,
  emotion,
}: {
  title: string;
  message: string;
  total?: number;
  current?: number;
  children: ReactNode;
  footer?: ReactNode;
  emotion?: CharacterEmotion;
}) {
  return (
    <ChildStage mode="focused">
      <div className="safe-pad pb-2">
        {total && current !== undefined ? <ProgressPips total={total} current={current} /> : null}
        <div className="mt-4 flex items-center gap-3">
          <Nilo size={80} mood={emotion ?? emotionForHost(message)} />
          <div>
            <SpeechBubble child text={message} />
            <button
              type="button"
              className="mt-1 text-[12px] font-medium text-white/55"
              onClick={() => speak(message)}
            >
              Escuchar
            </button>
          </div>
        </div>
        <p className="sr-only">{title}</p>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-6">{children}</div>
      {footer ? <div className="px-4 pb-6">{footer}</div> : null}
    </ChildStage>
  );
}

export function OptionTile({
  onClick,
  children,
  selected,
  dim,
}: {
  onClick: () => void;
  children: ReactNode;
  selected?: boolean;
  dim?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`tile-3d big-hit flex min-h-[112px] items-center justify-center rounded-[32px] ${
        selected ? "ring-4 ring-[#f0c56a] ring-offset-2 ring-offset-transparent" : ""
      } ${dim ? "opacity-40" : ""}`}
    >
      {children}
    </button>
  );
}
