# MindGrow — Inventario de recursos AAA

Arqueología de Fase 0. Nada de este documento se copió a ciegas.

## AVAILABLE

| Recurso | Dónde | Uso previsto |
| --- | --- | --- |
| Next.js 16 + React 19 + Tailwind 4 | `package.json` | App shell. Sin dependencias extra. |
| Motor de estado local | `src/store/app-store.tsx` | Flujos, persistencia, discovery/daily. |
| Scoring heurístico | `src/lib/scoring.ts` | Ability + confidence. No es psicometría. |
| Adaptive 1.0 | `src/lib/adaptive.ts` | +1/−1 por racha de 2. |
| Ontología 7 dominios | `src/lib/ontology.ts` | Conservar. No inflar. |
| Mundo por participación | `src/lib/world.ts` | Árbol, criaturas, regiones. |
| Pictos SVG propios | `src/components/art/Pictos.tsx` | Identidad visual. Cero emoji de sistema. |
| Nilo SVG | `src/components/mascot/Nilo.tsx` | Base de IP. Hay que elevarlo. |
| Web Audio osciladores | `src/lib/sound.ts` | Prototipo. Elevar capas, no librería. |
| speechSynthesis | `src/lib/speech.ts` | Fallback de VO. No es voz premium. |
| Tests de motor | `src/lib/engine.test.ts` | 8 casos. Ampliar. |
| Docs de producto | `docs/MVP.md`, `docs/ARCHITECTURE.md` | Restricción científica ya correcta. |

## POTENTIALLY USEFUL

| Recurso | Dónde | Decisión |
| --- | --- | --- |
| Motor Aurora Videojuegos | `../Motor Aurora Videojuegos` | Factory/orquestación, no runtime infantil. **No integrar.** Ideas: stages, schemas, tests. |
| Motor personajes | `../Motor personajes` | Inspección incompleta (timeout). **No copiar assets.** |
| Kitty Crush / Tetris / TowerNeon / Juegos | carpetas hermanas | Juegos distintos, trade dress ajeno. **No copiar.** |
| GitHub starred: `MengTo/threeui`, `majidmanzarpour/threejs-game-skills` | API starred | Three.js/WebGL. **Rechazado para MVP:** peso, batería, overkill. |
| GitHub starred: `QwenAudio/CosyVoice` | API starred | Voz grabada futura. **No ahora.** Licencia y backend. |
| `speechSynthesis` + Web Audio nativos | navegador | Mantener. Cero nuevas deps. |

## REJECTED

| Recurso | Por qué |
| --- | --- |
| Three.js / partículas pesadas | El prompt pide no sacrificar rendimiento. SVG + CSS es suficiente. |
| Librerías de animación (framer-motion, gsap) | No justificadas. CSS + estado alcanza. |
| Assets de Sago / Khan / Lingokids | Trade dress. Prohibido. |
| Analytics de terceros infantiles | COPPA / Families. Eventos locales seudónimos solamente. |
| Copiar motores Aurora/personajes | Licencia interna no documentada + dominio distinto. |

## LICENSE RISK

- Código propio de InfanteIQ: OK.
- Google fonts (Fraunces, Nunito, Outfit) vía `next/font`: OFL, OK.
- Osciladores Web Audio: propios.
- Starred repos: **no se clonaron ni se copiaron**.

## NOT ACCESSIBLE

- `GITHUB_STARRED_ACCESS` = AVAILABLE (cuenta `faechaurig-coder`). Primeras 30 starred revisadas; no se paginó el resto.
- Play Console / App Store Connect: no hay credenciales de store en este workspace.
- Voces grabadas: no existen assets.
- Haptics nativos: no hay wrapper iOS/Android.

## VEREDICTO DE REUTILIZACIÓN

Elevar **dentro** de MindGrow. Cero dependencias nuevas. Cero assets ajenos.
