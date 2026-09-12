# MindGrow AAA — Master checklist

Nunca marcar `[x]` sin evidencia. Este archivo se actualiza al cerrar cada fase.

## PHASE 0 — Arqueología

- [x] Leer docs, src, package, tests, audio, scoring, workspace, GitHub
  - STATUS: done
  - BEFORE: inventario inexistente
  - CHANGE: `docs/AAA_RESOURCE_INVENTORY.md`
  - FILES: docs/AAA_RESOURCE_INVENTORY.md
  - TEST: n/a
  - EVIDENCE: gh auth OK; starred leídos; Aurora/personajes inspectados y no copiados
  - SCORE BEFORE: 0
  - SCORE AFTER: 9

## PHASE 1 — Baseline

- [ ] Screenshots + scores por pantalla
  - STATUS: partial (sesión previa + esta)
  - BEFORE: child ~7, parent ~6
  - CHANGE: gates de calidad definidos
  - FILES: docs/AAA_QA_MATRIX.md
  - TEST: visual browser
  - EVIDENCE: pendientes nuevas capturas post-ascensión
  - SCORE BEFORE: 7
  - SCORE AFTER: —

## PHASE 2 — Tokens / motion / audio

- [x] Tokens, reduced-motion, capas de audio, settings
  - STATUS: done (síntesis, no voces grabadas)
  - BEFORE: CSS ad-hoc, audio prototipo, sin settings
  - CHANGE: tokens + audio 2.0 + motion modes + settings parentales
  - FILES: src/app/globals.css, src/lib/sound.ts, src/lib/settings.ts
  - TEST: npm test 16 pass
  - EVIDENCE: reduced-motion CSS; playNiloCheer; settings en dashboard
  - SCORE BEFORE: 6
  - SCORE AFTER: 8

## PHASE 3–5 — Nilo + emoción + foco

- [x] Nilo IP + emotion engine + world modes
  - STATUS: done (IP aún no 9.5)
  - BEFORE: mascota idle/wave/cheer
  - CHANGE: emociones contextuales, hoja firma, GAME_MODE
  - FILES: src/lib/character.ts, src/components/mascot/Nilo.tsx, WorldScene
  - TEST: typecheck
  - EVIDENCE: leafDrop, look, ChildStage focused
  - SCORE BEFORE: 6.5
  - SCORE AFTER: 8.1

## PHASE 6–8 — Mundo, Discovery, GameHost

- [x] Mundo reactivo, arco Discovery, host focused
  - STATUS: partial (demo animada 1:1 aún no es componente único)
  - BEFORE: mundo decorativo, host genérico
  - CHANGE: lastEvent/flores, seed copy, GameHost focused
  - FILES: world.ts, ChildFlows, GameHost
  - TEST: typecheck
  - EVIDENCE: lastEvent en home y cierre
  - SCORE BEFORE: 7
  - SCORE AFTER: 8

## PHASE 9–10 — Juegos + contenido

- [x] Rework mecánico + banks
  - STATUS: done en núcleo; Casa drag y VO grabada pendientes
  - BEFORE: arrays pequeños hardcoded
  - CHANGE: patrones, vocab, semáforo multimodal, Lumi, Cami
  - FILES: games/*, src/lib/patterns.ts, src/content/es/vocabulary.ts
  - TEST: patterns.test 12×5 puzzles
  - EVIDENCE: 16 tests green
  - SCORE BEFORE: 6.5
  - SCORE AFTER: 8

## PHASE 11–12 — Adaptive + scoring

- [x] Adaptive 2.0 + activeDays
  - STATUS: done
  - BEFORE: sessionCount = días
  - CHANGE: sessionCount vs activeDays; sims always/never/alt
  - FILES: scoring.ts, adaptive.ts, storage.ts
  - TEST: engine + adaptive-sim
  - EVIDENCE: tests pass
  - SCORE BEFORE: 7
  - SCORE AFTER: 8.2

## PHASE 13–16 — Parent, money, a11y, analytics

- [x] Dashboard, gate, settings, eventos locales
  - STATUS: done (paywall copy ya existía; no se endureció el mundo free)
  - BEFORE: suma fácil, dots ambiguos, analytics muertos
  - CHANGE: hold+suma, certainty vs ability, track()
  - FILES: ParentGate, ParentFlows, analytics.ts
  - TEST: privacy.test
  - EVIDENCE: nickname stripped
  - SCORE BEFORE: 6.5
  - SCORE AFTER: 8

## PHASE 17–20 — Tests, perf, store, audit

- [x] Cobertura + veredicto
  - STATUS: tests 16 pass; lint React 19 con deuda de effects; store no listo
  - BEFORE: 8 tests
  - CHANGE: patterns/adaptive/privacy tests + report
  - FILES: src/lib/*.test.ts, docs/ASCENSION_REPORT.md
  - TEST: npm test 16/16
  - EVIDENCE: docs/ASCENSION_REPORT.md
  - SCORE BEFORE: 4
  - SCORE AFTER: 7
