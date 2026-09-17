"use client";

import { useState } from "react";
import { Nilo } from "@/components/mascot/Nilo";
import { ChoiceChip, GhostButton, PrimaryButton } from "@/components/ui/primitives";
import { unlockAudio } from "@/lib/sound";
import type { InterestId, StartingHints } from "@/lib/types";
import { useApp } from "@/store/app-store";

const INTERESTS: { id: InterestId; label: string; emoji: string }[] = [
  { id: "animals", label: "Animales", emoji: "🦊" },
  { id: "space", label: "Espacio", emoji: "🌙" },
  { id: "dinosaurs", label: "Dinosaurios", emoji: "🦕" },
  { id: "vehicles", label: "Vehículos", emoji: "🚲" },
  { id: "nature", label: "Naturaleza", emoji: "🌿" },
  { id: "fantasy", label: "Fantasía", emoji: "✨" },
  { id: "ocean", label: "Océano", emoji: "🐚" },
];

const HINTS: StartingHints["letters"][] = ["yes", "some", "not_yet", "unsure"];
const HINT_LABEL: Record<StartingHints["letters"], string> = {
  yes: "Sí",
  some: "Algunas",
  not_yet: "Todavía no",
  unsure: "No estoy seguro",
};

export function OnboardingFlow() {
  const { createFamily } = useApp();
  const [step, setStep] = useState(0);
  const [gateA] = useState(() => 12 + Math.floor(Math.random() * 6));
  const [gateB] = useState(() => 7 + Math.floor(Math.random() * 6));
  const [gateValue, setGateValue] = useState("");
  const [gateError, setGateError] = useState(false);
  const [nickname, setNickname] = useState("");
  const [ageYears, setAgeYears] = useState(5);
  const [interests, setInterests] = useState<InterestId[]>([]);
  const [hints, setHints] = useState<StartingHints>({
    letters: "unsure",
    counting: "unsure",
    reading: "unsure",
  });

  if (step === 0) {
    return (
      <div className="safe-pad flex min-h-dvh flex-col justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#5b7f6a]">MindGrow</p>
          <h1 className="h-display mt-4 text-[36px] leading-tight text-[#1a2744]">
            Descubre cómo aprende y progresa.
          </h1>
          <p className="mt-4 text-[16px] leading-7 text-[#243044]/85">
            Pequeñas aventuras de juego van construyendo un mapa vivo de las habilidades que tu hijo practica.
          </p>
          <div className="card-lux mt-6 rounded-3xl p-4 text-[14px] leading-6 text-[#243044]/80">
            MindGrow no es un diagnóstico, ni un test de inteligencia, ni una herramienta médica. Es una forma
            honesta de observar y acompañar el juego.
          </div>
        </div>
        <PrimaryButton onClick={() => setStep(1)}>Soy el adulto</PrimaryButton>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="safe-pad flex min-h-dvh flex-col justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#5b7f6a]">Parent gate</p>
          <h2 className="h-display mt-3 text-[32px] leading-tight text-[#1a2744]">Espacio para adultos</h2>
          <p className="mt-3 text-[15px] leading-6 text-[#243044]/75">
            Las compras y los informes viven aquí. El niño no verá este paso.
          </p>
          <p className="mt-8 text-[18px] font-semibold text-[#1a2744]">
            ¿Cuánto es {gateA} + {gateB}?
          </p>
          <input
            inputMode="numeric"
            value={gateValue}
            onChange={(e) => {
              setGateValue(e.target.value);
              setGateError(false);
            }}
            className="field-lux mt-4 w-full rounded-2xl px-4 py-4 text-[22px] outline-none"
          />
          {gateError ? <p className="mt-2 text-sm text-[#9a4a32]">Ese no es el resultado.</p> : null}
        </div>
        <PrimaryButton
          onClick={() => {
            if (Number(gateValue) === gateA + gateB) setStep(2);
            else setGateError(true);
          }}
        >
          Entrar
        </PrimaryButton>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="safe-pad flex min-h-dvh flex-col justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#5b7f6a]">Perfil</p>
          <h2 className="h-display mt-3 text-[32px] text-[#1a2744]">¿Cómo le llamamos?</h2>
          <p className="mt-2 text-sm text-[#243044]/70">Solo lo necesario. Sin fotos, sin dirección, sin diagnósticos.</p>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Apodo o nombre"
            className="field-lux mt-6 w-full rounded-2xl px-4 py-4 text-[18px] outline-none"
          />
          <p className="mt-6 text-sm font-semibold text-[#1a2744]">Edad</p>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {[4, 5, 6, 7, 8].map((age) => (
              <button
                key={age}
                onClick={() => setAgeYears(age)}
                className={`rounded-2xl py-3 text-[18px] font-bold ${
                  ageYears === age
                    ? "btn-3d bg-[linear-gradient(180deg,#2a3d62,#16233d)] text-white"
                    : "tile-3d text-[#1a2744]"
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>
        <PrimaryButton onClick={() => setStep(3)}>Continuar</PrimaryButton>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="safe-pad flex min-h-dvh flex-col justify-between">
        <div>
          <h2 className="h-display text-[30px] text-[#1a2744]">Para empezar cerca de su juego</h2>
          <p className="mt-2 text-sm leading-6 text-[#243044]/70">
            No pasa nada si no estás seguro. El juego se irá adaptando. No preguntamos “qué tan inteligente es”.
          </p>
          <Field label="¿Reconoce algunas letras?">
            {HINTS.map((h) => (
              <ChoiceChip key={h} label={HINT_LABEL[h]} selected={hints.letters === h} onClick={() => setHints({ ...hints, letters: h })} />
            ))}
          </Field>
          <Field label="¿Puede contar aproximadamente hasta 10?">
            {HINTS.map((h) => (
              <ChoiceChip key={h} label={HINT_LABEL[h]} selected={hints.counting === h} onClick={() => setHints({ ...hints, counting: h })} />
            ))}
          </Field>
          <Field label="¿Ya lee algunas palabras?">
            {HINTS.map((h) => (
              <ChoiceChip key={h} label={HINT_LABEL[h]} selected={hints.reading === h} onClick={() => setHints({ ...hints, reading: h })} />
            ))}
          </Field>
        </div>
        <div>
          <PrimaryButton onClick={() => setStep(4)}>Continuar</PrimaryButton>
          <GhostButton onClick={() => setStep(4)}>Saltar: no estoy seguro</GhostButton>
        </div>
      </div>
    );
  }

  return (
    <div className="safe-pad flex min-h-dvh flex-col justify-between">
      <div>
        <h2 className="h-display text-[30px] text-[#1a2744]">¿Qué le gusta explorar?</h2>
        <p className="mt-2 text-sm text-[#243044]/70">Solo cambia colores y criaturas. Nunca los resultados.</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {INTERESTS.map((item) => (
            <ChoiceChip
              key={item.id}
              emoji={item.emoji}
              label={item.label}
              selected={interests.includes(item.id)}
              onClick={() =>
                setInterests((current) =>
                  current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id].slice(0, 3),
                )
              }
            />
          ))}
        </div>
      </div>
      <div>
        <PrimaryButton
          onClick={() =>
            createFamily({
              nickname,
              ageYears,
              otherLanguages: [],
              interests,
              startingHints: hints,
            })
          }
        >
          Preparar la aventura
        </PrimaryButton>
        <GhostButton
          onClick={() =>
            createFamily({
              nickname,
              ageYears,
              otherLanguages: [],
              interests: ["nature"],
              startingHints: hints,
            })
          }
        >
          Elegir más tarde
        </GhostButton>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-sm font-semibold text-[#1a2744]">{label}</p>
      <div className="grid grid-cols-2 gap-2">{children}</div>
    </div>
  );
}

export function Splash() {
  const { go, state } = useApp();
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
      <div className="pointer-events-none absolute -left-16 -top-10 h-64 w-64 rounded-full bg-[#f0c56a66] blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-20 h-48 w-48 rounded-full bg-[#4f7a6233] blur-3xl" />
      <div className="safe-pad relative flex h-full flex-col items-center justify-between text-center">
        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.28em] text-[#4f7a62]">MindGrow</p>
          <div className="mt-8 flex justify-center">
            <Nilo size={168} mood="wave" interactive />
          </div>
          <h1 className="h-display mt-6 text-[42px] leading-none text-[#16233d]">Haz crecer tu mundo.</h1>
          <p className="mx-auto mt-4 max-w-[300px] text-[16px] leading-7 text-[#243044]/80">
            Un mapa vivo de habilidades, construido con juego. Para el niño: aventura. Para ti: claridad.
          </p>
        </div>
        <div className="w-full">
          <PrimaryButton
            onClick={() => go(state.child ? (state.discovery.completed ? "child-home" : "handoff") : "onboarding")}
          >
            {state.child ? "Continuar" : "Comenzar"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export function Handoff() {
  const { startDiscovery } = useApp();
  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <div className="absolute inset-0 child-sky" />
      <div className="sun-orb" />
      <div className="rays" />
      <div className="safe-pad relative flex h-full flex-col items-center justify-between text-center text-white">
      <div className="mt-8">
        <Nilo size={156} mood="wave" interactive />
        <h2 className="h-child mt-4 text-[34px] font-extrabold">Entrégale el aparato</h2>
        <p className="mt-3 text-[16px] leading-7 text-white/85">
          El valle está quieto. Juntos despertarán el primer pedacito. No es un examen.
        </p>
      </div>
      <PrimaryButton
        tone="amber"
        onClick={() => {
          unlockAudio();
          startDiscovery();
        }}
      >
        Ya estoy listo
      </PrimaryButton>
      </div>
    </div>
  );
}
