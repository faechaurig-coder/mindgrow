import type { GameId } from "./types";

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

export type CastId = "nilo" | "lumi" | "cami" | "tiko";
export type SuccessTier = "micro" | "medium" | "major";

export function companionForGame(gameId?: GameId | null): CastId {
  if (gameId === "luciernagas") return "lumi";
  if (gameId === "camaleon") return "cami";
  if (gameId === "casa") return "tiko";
  return "nilo";
}

const TAP_LINES: Record<string, string[]> = {
  nilo: ["¡La hoja se despertó!", "¿Vamos por ahí?", "Se me ocurrió algo..."],
  lumi: ["Luz despacio...", "Si corres, me apago.", "Por aquí brillaba."],
  cami: ["Ahora soy de otro color.", "Cambié de idea.", "¿Cabemos juntos?"],
  tiko: ["Un momentito...", "Esta pieza va… ¡aquí!", "Si giro mucho, me atasco."],
  lumen: ["Luz despacio...", "No me pierdas."],
  hoja: ["El viento me cuenta secretos.", "Nilo me dejó caer una vez."],
  búho: ["Hoo. Yo vigilo.", "Todo está quieto... por ahora."],
  rana: ["¡Boing!", "¡Al charco!"],
  caracol: ["Despacio gano.", "Mi casa viaja conmigo."],
  cometa: ["¡Wiii por el cielo!", "Dejo un hilo de luz."],
  lucero: ["Te vi.", "Parpadeo para saludar."],
};

export function tapLine(name: string, salt = 0): string {
  const lines = TAP_LINES[name] ?? TAP_LINES.nilo;
  return lines[Math.abs(salt) % lines.length];
}

export function feedbackCopy(cast: CastId, kind: "correct" | "retry"): string {
  if (cast === "lumi") return kind === "correct" ? "Lumi volvió a brillar." : "Lumi se apagó un poquito.";
  if (cast === "cami") return kind === "correct" ? "Cami encontró su sitio." : "Cami cambió de regla. Otra vez.";
  if (cast === "tiko") return kind === "correct" ? "Tiko encajó la pieza." : "Tiko se atascó. Probemos despacio.";
  return kind === "correct" ? "Nilo lo vio." : "Nilo mira otra vez.";
}

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
