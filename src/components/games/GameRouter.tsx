"use client";

import { uid } from "@/lib/ids";
import { roundsForGame } from "@/lib/age";
import type { ObservationInput } from "@/lib/scoring";
import type { GameId, PlayContext } from "@/lib/types";
import { useMemo } from "react";
import { BosquePalabras } from "./BosquePalabras";
import { CamaleonClasificador } from "./CamaleonClasificador";
import { CaminoLuciernagas } from "./CaminoLuciernagas";
import { CasaPuzzle } from "./CasaPuzzle";
import { HistoriaPerdida } from "./HistoriaPerdida";
import { MercadoMagico } from "./MercadoMagico";
import { QueSigue } from "./QueSigue";
import { SemaforoMagico } from "./SemaforoMagico";
import { GuardianesBosque } from "./GuardianesBosque";
import { Warmup } from "./Warmup";

export function GameRouter({
  gameId,
  ageYears,
  context,
  onRound,
  onComplete,
}: {
  gameId: GameId;
  ageYears: number;
  context: PlayContext;
  onRound: (input: ObservationInput) => void;
  onComplete: (completed: boolean) => void;
}) {
  const sessionId = useMemo(() => uid("gs"), [gameId]);
  const rounds = roundsForGame(ageYears, context === "practice" ? "daily" : context);
  const props = { ageYears, rounds, sessionId, context, onRound, onComplete };

  if (gameId === "warmup") return <Warmup onComplete={() => onComplete(true)} />;
  if (gameId === "semaforo") return <SemaforoMagico {...props} />;
  if (gameId === "luciernagas") return <CaminoLuciernagas {...props} />;
  if (gameId === "camaleon") return <CamaleonClasificador {...props} />;
  if (gameId === "historia") return <HistoriaPerdida {...props} />;
  if (gameId === "quesigue") return <QueSigue {...props} />;
  if (gameId === "casa") return <CasaPuzzle {...props} />;
  if (gameId === "bosque") return <BosquePalabras {...props} />;
  if (gameId === "guardianes") return <GuardianesBosque {...props} />;
  return <MercadoMagico {...props} />;
}
