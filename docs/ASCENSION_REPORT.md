# MindGrow Ascension Report

Fecha: 2026-09-12. No se afirma store-ready.

## A. Resources discovered

Código propio: Next 16, React 19, Tailwind 4, motor local, SVG, Web Audio, 9 juegos, scoring heurístico.

## B. GitHub / local

`gh auth` OK (faechaurig-coder). Starred revisados (Three.js, CosyVoice): no integrados. Carpetas hermanas: Aurora, Motor personajes, Kitty Crush — inspectadas, no copiadas.

`GITHUB_STARRED_ACCESS = AVAILABLE` (primeras 30).

## C. Reused systems

Estado, ontología 7 dominios, mundo por participación, pictos, persistencia `mindgrow.v1`.

## D. Rejected

Three.js, Framer, analytics infantiles de terceros, assets de otras apps, copiar Aurora.

## E. Character

Nilo 2.0: emociones contextuales, hoja que cae al confundirse, mirada, bible + cast Lumi/Cami/Tiko (narrativa en juegos). Aún no es IP 9.5: falta voz grabada y merchandising real.

## F. Games

Semáforo multimodal (color+palabra, sin twinkle). Luciérnagas: Lumi + input bloqueado en playback. Camaleón: Cami + perseveration log. Qué sigue: generador validado. Bosque: banco por edad. Mercado: subitizing vs counting.

## G. Audio

Capas micro/medium/major, motivo Nilo E-G-B, settings on/off, retry neutro. Sigue siendo síntesis, no producción.

## H. Motion

`GAME_MODE` focused, `prefers-reduced-motion`, ajuste parental. Motion tiene trabajo.

## I. UX

Child home = sendero, no card de plan. Seed: “despertamos el primer pedacito”. Cierre: “Nos vemos después”. Gate: hold 1.8s + suma más dura.

## J. Cognitive engine

`sessionCount` ≠ `activeDays`. Adaptive 2.0: hints + fatiga + sims. Ability sigue siendo heurística.

## K. Parent

Certeza vs semilla (no dots el día 1). Timeline de continuidad. Ajustes. Sin paywall en child.

## L. Accessibility

Reduced motion, VO replay existente, targets grandes, semáforo no solo color. Falta high-contrast y teclado adulto completo.

## M. Privacy

Eventos locales allowlist, strip PII. Sin third-party.

## N. Testing

16 tests (engine, patterns, adaptive sims, privacy). Lint React 19: deuda preexistente `setState` en effects de rondas.

## O. Performance

Cero deps nuevas. SVG + CSS. No partículas pesadas.

## P. Store

PWA/icons/billing nativo: no. Families policy: no certificado.

## Q. Remaining risks

Playtest con niños no hecho. Gate hold+suma no es a prueba de 8 años listos. Voces sintéticas. Lint effects. Store APIs. Validación psicométrica: no existe y no se afirma.

## BEFORE / AFTER

| Área | Before | After |
| --- | --- | --- |
| Product | 7.0 | 8.3 |
| Child UX | 7.0 | 8.4 |
| Parent UX | 6.5 | 8.0 |
| Art | 7.0 | 7.6 |
| Characters | 6.0 | 7.8 |
| Nilo | 6.5 | 8.2 |
| Motion | 6.0 | 8.0 |
| Sound | 5.5 | 7.4 |
| Games | 6.5 | 8.0 |
| Adaptive | 7.0 | 8.1 |
| Scoring | 7.0 | 8.2 |
| World | 7.0 | 8.0 |
| Discovery | 7.0 | 7.8 |
| Retention (ética) | 6.5 | 8.0 |
| Monetization | 6.5 | 7.5 |
| Accessibility | 5.0 | 7.2 |
| Safety | 7.5 | 8.3 |
| Privacy | 7.5 | 8.4 |
| Testing | 4.0 | 7.0 |
| Performance | 8.0 | 8.2 |
| Store Readiness | 2.0 | 3.0 |

## Continuación (esta sesión)

- Instruction engine: Nilo observa → demuestra UNA → invita (`AnimatedInstruction`).
- Feedback contextual (`GameFeedback`): no “muy bien”.
- Semáforo: demo antes de la primera ronda.
- Casa: ghost target, snap/drag desde 6, Tiko, error espacial vs construcción.
- Discovery: beat de llegada (“el valle se quedó callado”).
- VO replay en cada juego.
- Manifest PWA + icono de Nilo. **No es store-ready.**
- Arquitectura de voz grabada (`VOICE_MANIFEST` vacío + fallback).

## VERDICT

**BETA READY** (interno / demo).

No SOFT-LAUNCH READY: falta playtest por edad, voces grabadas, lint limpio de effects, store packaging.
No STORE READY: P0 Families/COPPA legal + P1 playtest + P1 audio grabado.
