"use client";

import { feedbackCopy, type CastId, type CharacterEmotion } from "@/lib/character";

export type FeedbackKind = "correct" | "retry" | "hint" | "complete";

const EMOTION: Record<FeedbackKind, CharacterEmotion> = {
  correct: "proud",
  retry: "confused",
  hint: "thinking",
  complete: "celebrate",
};

export function GameFeedback({ kind, companion = "nilo" }: { kind: FeedbackKind | null; companion?: CastId }) {
  if (!kind) return null;
  const text =
    kind === "correct" || kind === "retry"
      ? feedbackCopy(companion, kind)
      : kind === "hint"
        ? companion === "tiko"
          ? "Tiko señala el hueco."
          : companion === "lumi"
            ? "Mira la lucecita."
            : companion === "cami"
              ? "Cami mira el cesto."
              : "Mira dónde señala la hoja."
        : "Esa parte del valle despertó.";
  return (
    <p className="pop-in mt-3 text-center text-sm font-semibold text-white/90" aria-live="polite">
      {text}
    </p>
  );
}

export function feedbackEmotion(kind: FeedbackKind | null): CharacterEmotion | undefined {
  return kind ? EMOTION[kind] : undefined;
}
