"use client";

import { GrowingTree } from "@/components/art/WorldArt";
import { WorldScene } from "@/components/child/WorldScene";
import { Dots, GhostButton, PrimaryButton } from "@/components/ui/primitives";
import { GAMES } from "@/lib/games/catalog";
import { OFFLINE_IDEAS, buildWeeklyInsight } from "@/lib/insights";
import { confidenceCopy, observationCopy, SKILLS, SKILL_ORDER } from "@/lib/ontology";
import { abilityToDots } from "@/lib/scoring";
import { useApp } from "@/store/app-store";

export function ParentDashboard() {
  const { state, selectSkill, go, requestParent, updateSettings } = useApp();
  const child = state.child;
  if (state.discovery.completed && !state.mapRevealSeen) {
    return <MapReveal />;
  }
  const insight = buildWeeklyInsight(state);
  const practiced = SKILL_ORDER.filter((id) => state.estimates.some((e) => e.skillId === id && e.evidenceCount > 0));
  return (
    <div className="scroll-y h-full overflow-y-auto pb-10">
      <div className="overflow-hidden rounded-b-[32px]">
        <WorldScene world={state.world} interests={state.child?.interests} compact />
      </div>
      <div className="safe-pad pt-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-[#5b7f6a]">Esta semana</p>
        <button className="text-sm text-[#5b7f6a]" onClick={() => go("child-home")}>
          Mundo del niño
        </button>
      </div>
      <h1 className="h-display mt-2 text-[34px] leading-tight text-[#1a2744]">
        {insight.adventures === 1 ? "1 pequeña aventura" : `${insight.adventures} pequeñas aventuras`}
      </h1>
      <p className="mt-2 text-[15px] leading-6 text-[#243044]/75">
        Este mapa es provisional. MindGrow irá aprendiendo cómo responde {child?.nickname} en distintas actividades.
      </p>

      <section className="card-lux mt-6 rounded-[28px] p-4">
        <p className="text-sm font-semibold text-[#1a2744]">Mapa de habilidades</p>
        <div className="mt-3 space-y-3">
          {practiced.length === 0 ? (
            <p className="text-sm text-[#243044]/70">Aún no hay observaciones. La primera aventura crea el mapa inicial.</p>
          ) : (
            practiced.map((id) => {
              const estimate = state.estimates.find((e) => e.skillId === id)!;
              return (
                <button
                  key={id}
                  onClick={() => selectSkill(id)}
                  className="flex w-full items-center justify-between rounded-2xl bg-[linear-gradient(180deg,#fffdf8,#f3e8d2)] px-3 py-3 text-left shadow-[inset_0_1px_0_#fff,0_6px_16px_rgba(22,35,61,0.05)]"
                >
                  <div>
                    <p className="font-semibold text-[#1a2744]">{SKILLS[id].short}</p>
                    <p className="text-xs uppercase tracking-wide text-[#5b7f6a]">
                      Certeza: {confidenceCopy(estimate.confidence)}
                      {estimate.trend === "up" ? " · tendencia suave" : ""}
                    </p>
                  </div>
                  {estimate.confidence === "low" ? (
                    <span className="text-xs text-[#5b7f6a]">semilla</span>
                  ) : (
                    <Dots value={abilityToDots(estimate.ability, estimate.confidence)} muted={estimate.confidence === "medium"} />
                  )}
                </button>
              );
            })
          )}
        </div>
      </section>

      <section className="card-lux mt-4 rounded-[28px] p-4">
        <p className="text-sm font-semibold text-[#1a2744]">Crecimiento</p>
        <p className="mt-2 text-[15px] leading-6 text-[#243044]/80">
          {insight.strength
            ? `${SKILLS[insight.strength].short} aparece con más soltura en el juego de esta semana.`
            : "Todavía no interpretamos tendencias. Hace falta más de un día."}{" "}
          {insight.practicing
            ? `${SKILLS[insight.practicing].short}: necesitamos verla en más de una mecánica.`
            : ""}{" "}
          Un día no es una mejora cognitiva real.
        </p>
      </section>

      <section className="card-lux mt-4 rounded-[28px] p-4">
        <p className="text-sm font-semibold text-[#1a2744]">Qué estamos practicando</p>
        <p className="mt-2 text-[15px] leading-6 text-[#243044]/80">{insight.teaser}</p>
      </section>

      <section className="card-lux mt-4 rounded-[28px] p-4">
        <p className="text-sm font-semibold text-[#1a2744]">Con el tiempo</p>
        <p className="mt-2 text-[14px] leading-6 text-[#243044]/75">
          Hoy es una semilla. En 2 semanas, un mes y tres meses el mapa puede contar una historia. Eso es continuidad, no un diagnóstico.
        </p>
        <ContinuityTimeline />
      </section>

      <section className="mt-4 rounded-[28px] bg-[linear-gradient(180deg,#243656,#16233d)] p-4 text-[#f6f1e8] shadow-[0_16px_32px_rgba(18,26,48,0.16)]">
        <p className="text-sm font-semibold text-[#e6b567]">Probar juntos</p>
        <p className="mt-2 text-[15px] leading-6">{insight.missionPrompt}</p>
      </section>

      <section className="card-lux mt-4 rounded-[28px] p-4">
        <p className="text-sm font-semibold text-[#1a2744]">Por qué importa</p>
        <p className="mt-2 text-[15px] leading-6 text-[#243044]/80">{insight.whyItMatters}</p>
      </section>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button className="card-lux rounded-2xl px-3 py-4 text-sm font-semibold text-[#1a2744]" onClick={() => go("parent-report")}>
          Informe semanal
        </button>
        <button className="card-lux rounded-2xl px-3 py-4 text-sm font-semibold text-[#1a2744]" onClick={() => go("parent-paywall")}>
          Plan familiar
        </button>
      </div>
      <p className="mt-6 text-center text-xs text-[#243044]/50">
        MindGrow no diagnostica. Los puntos son una impresión visual, no un percentil.
      </p>
      <section className="card-lux mt-4 rounded-[28px] p-4">
        <p className="text-sm font-semibold text-[#1a2744]">Ajustes suaves</p>
        <button className="mt-3 w-full text-left text-sm text-[#243044]" onClick={() => updateSettings({ motion: state.settings.motion === "normal" ? "reduced" : "normal" })}>
          Movimiento: {state.settings.motion === "reduced" ? "reducido" : "normal"}
        </button>
        <button className="mt-2 w-full text-left text-sm text-[#243044]" onClick={() => updateSettings({ audio: state.settings.audio === "on" ? "off" : "on" })}>
          Sonido: {state.settings.audio === "on" ? "encendido" : "apagado"}
        </button>
        <button className="mt-2 w-full text-left text-sm text-[#243044]" onClick={() => updateSettings({ voice: state.settings.voice === "on" ? "off" : "on" })}>
          Voz: {state.settings.voice === "on" ? "encendida" : "apagada"}
        </button>
      </section>
      <button className="mt-4 w-full text-xs text-[#9a4a32]" onClick={() => requestParent("parent-home")}>
        Volver a verificar adulto
      </button>
      </div>
    </div>
  );
}

export function SkillDetail() {
  const { state, go } = useApp();
  const skillId = state.selectedSkill;
  if (!skillId) return null;
  const skill = SKILLS[skillId];
  const estimate = state.estimates.find((e) => e.skillId === skillId);
  return (
    <div className="safe-pad h-full overflow-y-auto">
      <button className="text-sm text-[#5b7f6a]" onClick={() => go("parent-home")}>
        Volver
      </button>
      <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[#5b7f6a]">{skill.worldRegion}</p>
      <h1 className="h-display mt-2 text-[34px] text-[#1a2744]">{skill.label}</h1>
      <p className="mt-3 text-[16px] leading-7 text-[#243044]/80">{skill.what}</p>
      <p className="card-lux mt-4 rounded-3xl p-4 text-[15px] leading-6 text-[#243044]/80">
        <strong>Por qué importa. </strong>
        {skill.why}
      </p>
      {estimate ? (
        <div className="card-lux mt-4 rounded-3xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">{confidenceCopy(estimate.confidence)}</p>
            <Dots value={abilityToDots(estimate.ability, estimate.confidence)} muted={estimate.confidence === "low"} />
          </div>
          <p className="mt-3 text-[15px] leading-6 text-[#243044]/80">
            {observationCopy(skillId, estimate.confidence)} Evidencia: {estimate.evidenceCount} actividades
            {estimate.independentGames.length > 1
              ? ` en ${estimate.independentGames.length} juegos distintos.`
              : "."}
          </p>
          <p className="mt-2 text-sm text-[#5b7f6a]">
            Juegos: {skill.games.map((id) => GAMES[id].title).join(" · ")}
          </p>
        </div>
      ) : (
        <p className="mt-4 text-sm">Aún necesitamos jugar más para observar esta área.</p>
      )}
      <div className="card-lux mt-4 rounded-3xl p-4">
        <p className="text-sm font-semibold text-[#1a2744]">Idea fuera de pantalla</p>
        <p className="mt-2 text-[15px] leading-6 text-[#243044]/80">{OFFLINE_IDEAS[skillId]}</p>
      </div>
      <p className="mt-6 text-sm leading-6 text-[#243044]/70">
        No escribimos frases como “su hijo tiene baja {skill.short.toLowerCase()}”. Solo describimos lo que vimos en el juego.
      </p>
    </div>
  );
}

export function WeeklyReport() {
  const { state, go } = useApp();
  const name = state.child?.nickname ?? "tu hijo";
  const insight = buildWeeklyInsight(state);
  const locked = state.parent?.plan === "free";
  return (
    <div className="safe-pad h-full overflow-y-auto">
      <button className="text-sm text-[#5b7f6a]" onClick={() => go("parent-home")}>
        Volver
      </button>
      <h1 className="h-display mt-4 text-[32px] text-[#1a2744]">Semana de {name}</h1>
      <p className="mt-3 text-[15px] leading-6 text-[#243044]/75">{insight.teaser}</p>
      {locked ? (
        <div className="card-lux mt-6 rounded-3xl p-5">
          <p className="font-semibold text-[#1a2744]">El relato completo es parte del plan familiar.</p>
          <p className="mt-2 text-sm leading-6 text-[#243044]/75">
            En el plan gratis ves el mapa inicial y este adelanto. El historial y el informe semanal llegan con la suscripción.
          </p>
          <div className="mt-4">
            <PrimaryButton onClick={() => go("parent-paywall")}>Ver plan familiar</PrimaryButton>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-3 text-[15px] leading-7 text-[#243044]/85">
          {insight.full.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className="card-lux rounded-3xl p-4">{insight.missionPrompt}</p>
        </div>
      )}
    </div>
  );
}

export function Paywall() {
  const { state, startTrial, go } = useApp();
  return (
    <div className="safe-pad h-full overflow-y-auto">
      <button className="text-sm text-[#5b7f6a]" onClick={() => go("parent-home")}>
        Volver
      </button>
      <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#5b7f6a]">Solo para adultos</p>
      <h1 className="h-display mt-2 text-[34px] leading-tight text-[#1a2744]">Paga claridad, no presión.</h1>
      <p className="mt-3 text-[15px] leading-6 text-[#243044]/75">
        El niño no ve compras. El mundo no se vuelve “peor” si no hay suscripción. Se limita la continuidad, no la dignidad.
      </p>
      <div className="mt-6 space-y-3">
        <PlanCard title="Gratis" note="Para descubrir" items={["1 perfil", "Aventura inicial", "Mapa provisional", "3 aventuras / semana"]} />
        <PlanCard
          title="Familiar"
          note="Mensual o anual"
          highlight
          items={["Plan diario adaptativo", "Biblioteca completa", "Informes e historial", "Varios perfiles"]}
        />
      </div>
      <div className="mt-6">
        <PrimaryButton tone="amber" onClick={startTrial}>
          {state.parent?.plan === "free" ? "Probar 14 días en este dispositivo" : "Plan activo"}
        </PrimaryButton>
        <GhostButton onClick={() => go("child-home")}>Seguir con el plan gratis</GhostButton>
      </div>
    </div>
  );
}

function MapReveal() {
  const { state, dismissMapReveal } = useApp();
  const name = state.child?.nickname ?? "tu hijo";
  const seen = SKILL_ORDER.filter((id) => state.estimates.some((e) => e.skillId === id && e.evidenceCount > 0));
  return (
    <div className="scroll-y h-full overflow-y-auto pb-10">
      <div className="overflow-hidden rounded-b-[32px]">
        <WorldScene world={state.world} interests={state.child?.interests} compact highlightLatest />
      </div>
      <div className="safe-pad pt-5">
        <p className="text-xs uppercase tracking-[0.18em] text-[#5b7f6a]">Después de la primera aventura</p>
        <h1 className="h-display mt-2 text-[32px] leading-tight text-[#1a2744]">
          Esto es lo que estamos empezando a observar
        </h1>
        <p className="mt-3 text-[15px] leading-6 text-[#243044]/75">
          Hoy {name} plantó una semilla. El mapa es provisional: una primera impresión, no un diagnóstico.
        </p>

        <section className="card-lux mt-5 rounded-[28px] p-4">
          <p className="text-sm font-semibold text-[#1a2744]">Mapa inicial</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {SKILL_ORDER.map((id) => {
              const lit = seen.includes(id);
              return (
                <div
                  key={id}
                  className={`rounded-2xl px-3 py-3 ${lit ? "bg-[linear-gradient(180deg,#fffdf8,#f3e8d2)]" : "bg-[#e8efe6]"}`}
                >
                  <p className="text-sm font-semibold text-[#1a2744]">{SKILLS[id].short}</p>
                  <p className="text-[11px] uppercase tracking-wide text-[#5b7f6a]">{lit ? "semilla" : "aún no"}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="card-lux mt-4 rounded-[28px] p-4">
          <p className="text-sm font-semibold text-[#1a2744]">Así puede verse el valle si seguimos</p>
          <p className="mt-2 text-[14px] leading-6 text-[#243044]/75">
            No es una promesa de resultado. Es continuidad: más días, más historia.
          </p>
          <ContinuityTimeline />
        </section>

        <div className="mt-6">
          <PrimaryButton tone="amber" onClick={dismissMapReveal}>
            Ver el mapa de esta semana
          </PrimaryButton>
          <p className="mt-3 text-center text-xs leading-5 text-[#243044]/55">
            El plan familiar puede guardar esa historia. Hoy no hace falta decidir.
          </p>
        </div>
      </div>
    </div>
  );
}

function ContinuityTimeline() {
  const moments = [
    { label: "Hoy", stage: 0, note: "semilla" },
    { label: "Semana 2", stage: 2, note: "más luz" },
    { label: "Mes 1", stage: 3, note: "regiones" },
    { label: "Mes 3", stage: 5, note: "historia" },
  ];
  return (
    <div className="mt-4 grid grid-cols-4 gap-2">
      {moments.map((moment, i) => (
        <div key={moment.label} className="text-center">
          <div className={`flex h-24 items-end justify-center ${i === 0 ? "" : "opacity-45"}`}>
            <GrowingTree stage={moment.stage} size={i === 0 ? 72 : 64} />
          </div>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-[#5b7f6a]">{moment.label}</p>
          <p className="text-[11px] text-[#243044]/60">{moment.note}</p>
        </div>
      ))}
    </div>
  );
}

function PlanCard({
  title,
  note,
  items,
  highlight,
}: {
  title: string;
  note: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-[28px] p-4 ${highlight ? "bg-[linear-gradient(180deg,#243656,#16233d)] text-[#f6f1e8] shadow-[0_16px_32px_rgba(18,26,48,0.16)]" : "card-lux text-[#1a2744]"}`}>
      <p className="text-sm opacity-70">{note}</p>
      <p className="h-display text-[26px]">{title}</p>
      <ul className="mt-3 space-y-1 text-sm opacity-90">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
