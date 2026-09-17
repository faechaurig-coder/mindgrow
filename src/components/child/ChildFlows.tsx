"use client";

import { useState } from "react";
import { Picto } from "@/components/art/Pictos";
import { GameRouter } from "@/components/games/GameRouter";
import { Nilo, SpeechBubble } from "@/components/mascot/Nilo";
import { PrimaryButton } from "@/components/ui/primitives";
import { GAMES } from "@/lib/games/catalog";
import { SKILLS, skillByGame } from "@/lib/ontology";
import { playGrow, unlockAudio } from "@/lib/sound";
import { useApp } from "@/store/app-store";
import { ChildStage, WorldScene } from "./WorldScene";

export function DiscoveryAdventure() {
  const { state, record, finishGame, advanceDiscovery, finishDiscovery } = useApp();
  const [arrival, setArrival] = useState(state.discovery.index === 0);
  const child = state.child;
  if (!child) return null;
  if (arrival) {
    return (
      <ChildStage>
        <div className="safe-pad flex h-full flex-col items-center justify-between text-center text-white">
          <div className="mt-8">
            <Nilo size={148} mood="curious" interactive />
            <h1 className="h-child mt-4 text-[34px] font-extrabold">El valle se quedó callado</h1>
            <p className="mt-3 text-[16px] leading-7 text-white/85">
              Nilo no sabe por dónde empezar. ¿Lo ayudamos a despertar un pedacito?
            </p>
          </div>
          <PrimaryButton
            tone="amber"
            onClick={() => {
              unlockAudio();
              setArrival(false);
            }}
          >
            Vamos con Nilo
          </PrimaryButton>
        </div>
      </ChildStage>
    );
  }
  const gameId = state.discovery.queue[state.discovery.index];
  if (!gameId) return null;
  return (
    <GameRouter
      gameId={gameId}
      ageYears={child.ageYears}
      context="discovery"
      onRound={(input) => record([input])}
      onComplete={(completed) => {
        finishGame(gameId, completed);
        if (state.discovery.index + 1 >= state.discovery.queue.length) finishDiscovery();
        else advanceDiscovery();
      }}
    />
  );
}

export function DailyAdventure() {
  const { state, record, finishGame, advanceDaily } = useApp();
  const [reaction, setReaction] = useState<string | null>(null);
  const child = state.child;
  const plan = state.dailyPlan;
  if (!child || !plan) return null;
  if (plan.currentIndex >= plan.gameIds.length) return <RealWorldMission />;
  const gameId = plan.gameIds[plan.currentIndex];
  if (reaction) {
    return (
      <div className="relative flex h-full min-h-0 flex-col text-white">
        <div className="absolute inset-0">
          <WorldScene world={state.world} interests={child.interests} immersive highlightLatest />
        </div>
        <div className="relative z-10 mt-auto safe-pad pb-8 text-center">
          <Nilo size={108} mood="cheer" interactive />
          <p className="h-child mt-2 text-3xl font-extrabold">{reaction}</p>
          <p className="mt-2 text-white/85">{state.world.lastEvent}</p>
        </div>
      </div>
    );
  }
  return (
    <GameRouter
      gameId={gameId}
      ageYears={child.ageYears}
      context="daily"
      onRound={(input) => record([input])}
      onComplete={(completed) => {
        finishGame(gameId, completed);
        const skill = skillByGame(gameId);
        playGrow();
        setReaction(skill ? `${SKILLS[skill].worldRegion} se ilumina` : "Tu mundo crece");
        setTimeout(() => {
          setReaction(null);
          advanceDaily();
        }, 1600);
      }}
    />
  );
}

export function SeedMoment() {
  const { state, requestParent, go } = useApp();
  return (
    <div className="relative flex h-full min-h-0 flex-col text-white">
      <div className="absolute inset-0">
        <WorldScene world={state.world} interests={state.child?.interests} immersive highlightLatest />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-between gap-6 overflow-y-auto safe-pad text-center">
        <div className="mt-2">
          <Nilo size={120} mood="cheer" interactive />
          <SpeechBubble child text="¡Ya empezamos a construir tu mundo!" />
          <div className="mt-4 grow-up flex justify-center">
            <Picto id="semilla" size={80} />
          </div>
          <p className="h-child mt-3 text-3xl font-extrabold">¡Despertamos el primer pedacito!</p>
        </div>
        <div className="w-full space-y-3 pb-2">
          <PrimaryButton tone="amber" onClick={() => requestParent("parent-home")}>
            Ver el mapa con un adulto
          </PrimaryButton>
          <button className="w-full py-3 text-white/80" onClick={() => go("child-home")}>
            Seguir en mi mundo
          </button>
          <p className="text-sm text-white/70">Hoy {state.child?.nickname} plantó su mundo.</p>
        </div>
      </div>
    </div>
  );
}

export function ChildHome() {
  const { state, startDaily, requestParent } = useApp();
  return (
    <div className="relative flex h-full min-h-0 flex-col text-white">
      <div className="absolute inset-0">
        <WorldScene world={state.world} interests={state.child?.interests} immersive />
      </div>
      <div className="pointer-events-none relative z-10 flex h-full min-h-0 flex-col">
        <div className="min-h-0 flex-1" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#122018cc] via-[#1a274455] to-transparent" />
        <div className="pointer-events-auto relative safe-pad flex flex-col gap-3 pt-0">
          <p className="text-sm font-medium text-white/90 drop-shadow">El mundo de {state.child?.nickname}</p>
          <h1 className="h-child text-[32px] font-extrabold leading-[0.95]">Nilo te espera</h1>
          <p className="text-sm text-white/85">{state.world.lastEvent || "El valle está quieto. Vamos a despertarlo."}</p>
          <PrimaryButton
            tone="amber"
            onClick={() => {
              unlockAudio();
              startDaily();
            }}
          >
            Seguir el sendero
          </PrimaryButton>
          <button className="w-full py-2 text-white/80" onClick={() => requestParent("parent-home")}>
            Zona de adultos
          </button>
        </div>
      </div>
    </div>
  );
}

export function RealWorldMission() {
  const { state, completeMission } = useApp();
  const mission = state.dailyPlan?.mission;
  if (!mission) return null;
  return (
    <ChildStage>
      <div className="safe-pad flex h-full flex-col items-center justify-between gap-6 overflow-y-auto text-center text-white">
        <div>
          <Nilo size={132} mood="wave" interactive />
          <p className="text-sm uppercase tracking-[0.18em] text-white/70">Misión en el mundo real</p>
          <h1 className="h-child mt-3 text-[32px] font-extrabold">{mission.title}</h1>
          <p className="glass-card mt-4 rounded-[28px] p-5 text-lg font-bold leading-7 text-[#1a2744]">
            {mission.prompt}
          </p>
          <p className="mt-3 text-sm text-white/70">Unos {mission.minutes} minutos. Sin fotos.</p>
        </div>
        <div className="w-full space-y-2">
          <PrimaryButton tone="sage" onClick={() => completeMission("done")}>
            Hecho
          </PrimaryButton>
          <button className="w-full py-3 text-white/80" onClick={() => completeMission("skipped")}>
            Ahora no
          </button>
        </div>
      </div>
    </ChildStage>
  );
}

export function SessionComplete() {
  const { go, state } = useApp();
  return (
    <div className="relative flex h-full min-h-0 flex-col text-white">
      <div className="absolute inset-0">
        <WorldScene world={state.world} interests={state.child?.interests} immersive highlightLatest />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-between gap-6 overflow-y-auto safe-pad text-center">
        <div className="mt-4">
          <Nilo size={124} mood="celebrate" interactive />
          <h1 className="h-child mt-3 text-[34px] font-extrabold">¡Ya hicimos mucho hoy!</h1>
          <p className="mt-3 text-white/85">{state.world.lastEvent || "Tu mundo creció un poquito más."}</p>
        </div>
        <PrimaryButton tone="amber" onClick={() => go("child-home")}>
          Nos vemos después
        </PrimaryButton>
      </div>
    </div>
  );
}

export function DailyLabel({ gameId }: { gameId: keyof typeof GAMES }) {
  return <span>{GAMES[gameId].childTitle}</span>;
}
