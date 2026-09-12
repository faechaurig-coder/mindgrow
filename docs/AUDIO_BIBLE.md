# Audio bible

Capas: VOICE → CHARACTER VOCALS → INTERACTION SFX → SUCCESS MOTIFS → WORLD AMBIENCE → MUSIC → SILENCE.

El silencio es una herramienta. Los juegos cognitivos no llevan música constante.

## Voice

`speechSynthesis` es fallback. Arquitectura: `RecordedVoiceProvider` (manifest vacío) + `SpeechSynthesisFallback`.

4–5 años: frases muy cortas. 6–8: un poco más. Cálida, clara, no infantilizada, ~0.92 rate.

## Error

No buzzer. No trombón. Un pluck corto y neutro (`playRetry`).

## Success

- micro: tick/pluck (`playTap` / `playMicro`)
- medium: 2–3 notas (`playSuccess`)
- major: motivo Nilo + mundo (`playGrow` / `playNiloCheer`)

Motivo Nilo: **E4 – G4 – B4** (3 notas). Reconocible, no casino.

## Settings

Audio on/off y voz on/off viven en ajustes parentales. Child Mode no muestra comercio ni toggles complejos.

## Futuro

Voces grabadas en `public/audio/` cuando existan. Hoy: síntesis propia, sin deps.
