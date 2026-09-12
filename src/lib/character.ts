export type CharacterEmotion =
  | "idle"
  | "curious"
  | "thinking"
  | "confused"
  | "surprised"
  | "proud"
  | "celebrate"
  | "encourage"
  | "sleepy";

export type SuccessTier = "micro" | "medium" | "major";

export function emotionAfterRound(input: {
  correct: boolean;
  errorsInRow: number;
  tier?: SuccessTier;
}): CharacterEmotion {
  if (input.correct) {
    if (input.tier === "major") return "celebrate";
    if (input.tier === "medium") return "proud";
    return "curious";
  }
  if (input.errorsInRow >= 2) return "encourage";
  return "confused";
}

export function emotionForHost(message: string): CharacterEmotion {
  const text = message.toLowerCase();
  if (text.includes("espera") || text.includes("mira")) return "thinking";
  if (text.includes("otra")) return "encourage";
  if (text.includes("justo") || text.includes("listo") || text.includes("encontr")) return "proud";
  return "curious";
}
