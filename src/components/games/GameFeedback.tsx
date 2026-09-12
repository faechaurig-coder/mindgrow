"use client";

import type { CharacterEmotion } from "@/lib/character";

export type FeedbackKind = "correct" | "retry" | "hint" | "complete";

const COPY: Record<FeedbackKind, { text: string; emotion: CharacterEmotion }> = {
  correct: { text: "Nilo lo vio.", emotion: "proud" },
  retry: { text: "Nilo mira otra vez.", emotion: "confused" },
  hint: { text: "Mira dónde señala la hoja.", emotion: "thinking" },
  complete: { text: "Esa parte del valle despertó.", emotion: "celebrate" },
};

export function GameFeedback({ kind }: { kind: FeedbackKind | null }) {
  if (!kind) return null;
  return (
    <p className="pop-in mt-3 text-center text-sm font-semibold text-white/90" aria-live="polite">
      {COPY[kind].text}
    </p>
  );
}

export function feedbackEmotion(kind: FeedbackKind | null): CharacterEmotion | undefined {
  return kind ? COPY[kind].emotion : undefined;
}
