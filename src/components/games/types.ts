import type { ObservationInput } from "@/lib/scoring";
import type { PlayContext } from "@/lib/types";

export interface GamePlayProps {
  ageYears: number;
  rounds: number;
  sessionId: string;
  context: PlayContext;
  onRound: (input: ObservationInput) => void;
  onComplete: (completed: boolean) => void;
}
