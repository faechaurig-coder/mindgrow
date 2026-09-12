# MindGrow — Arquitectura de producto (MVP)

Documento vivo de decisiones del comité virtual. No es un protocolo clínico.

## 0. Veredicto de auditoría

La spec original es ambiciosa y éticamente sólida. Si se implementara al pie de la letra, el MVP mentiría con precisión: demasiados constructos, muy poca evidencia, onboarding largo y una primera sesión imposible para 4 años.

**Regla que adoptamos:** el mapa del día 1 es una *hipótesis visual*, no un retrato del niño.

## 1. Errores y correcciones

| Riesgo | Por qué importa | Decisión |
| --- | --- | --- |
| 20+ subskills × 8 juegos × 1 sesión | Confianza científica falsa | Ontología MVP colapsada a 7 dominios observables |
| Discovery de 7 juegos / 12 min a los 4 años | Abandono y fatiga | La aventura se acorta por age band; calidad > cobertura |
| Onboarding de 7 pantallas | Drop-off parental | 4 pasos + handoff |
| Puntos ●●●○○ el día 1 | Se leen como diagnóstico | Siempre con sello de confianza y copy provisional |
| Un score cognitivo global | Se convierte en IQ casero | Prohibido. Lenguaje y números van aislados |
| Mundo “más feo” si hay más errores | Vergüenza | El mundo crece por participación, no por aciertos |
| Intereses que mueven dificultad | Sesgo | Solo piel visual |
| Paywall que bloquea el mapa inicial | Rompe confianza | El mapa inicial es gratis; se cobra continuidad |
| IA libre con niños | Seguridad | Cero chat infantil. Copy adulto estático/plantillas |
| Velocidad = cognición | Confunde motricidad | Precisión > velocidad; latencia solo auxiliar y en 7–8 |

## 2. Ontología MVP

Tres capas, pero **solo se puntúa lo que el MVP puede observar**.

### Capa A — Cognitive core (puntuable, con confianza)

- `attention_inhibition` — atención selectiva + inhibición de respuesta
- `visual_memory` — memoria visual / espacial / secuencial
- `flexibility` — cambio de regla
- `reasoning` — patrones y clasificación
- `visuospatial` — construcción y discriminación

### Capa B — Learning foundations (puntuable, **aislada**)

- `language` — vocabulario receptivo (nunca se mezcla en un “total cognitivo”)
- `numeracy` — cantidad y correspondencia

### Capa C — Whole child (cualitativa, sin número)

- Misiones reales: `observed` / `explored` / `practiced`
- Creatividad y SEL: fuera del MVP jugable

Subskills existen en el modelo para telemetría futura. El padre ve dominios, no una sopa de constructos.

## 3. Starting Skill Map

1. Cada juego de Discovery aporta observaciones a 1 dominio primario.
2. `visual_memory` puede recibir señal de Luciérnagas **y** Historia (triangulación).
3. Tras la primera aventura, **toda confianza = low**.
4. No hay percentiles, no hay “mejor que X%”, no hay edad mental.
5. El mapa solo lista dominios **jugados**. Si se omitió un juego, ese dominio no aparece como vacío/deficiente.
6. Ability interna (0–100) arranca en un prior por edad **solo para dificultad**, no como claim.

## 4. Confianza

- **Low:** < 6 ítems o 1 sola mecánica
- **Medium:** ≥ 6 ítems, ≥ 2 sesiones, o 2 juegos distintos del mismo dominio
- **High:** ≥ 14 ítems, ≥ 3 sesiones, ≥ 2 mecánicas, consistencia razonable (no un solo día brillante)

Nunca se muestra High en la sesión 1.

## 5. Motor adaptativo

- Objetivo de acierto en práctica: 70–85%.
- Discovery **muestrea** un rango (no se queda solo en ítems fáciles).
- 2 aciertos seguidos → +1 dificultad (dentro del techo de edad).
- 2 fallos seguidos → −1, ejemplo, menos estímulos.
- Nunca “Incorrecto.” → “Probemos otra vez.”
- Fatiga (toques aleatorios, abandonos, latencia caótica): simplificar o cerrar con calor.

## 6. Daily Plan

- 3 juegos + 1 misión real.
- 8–15 min según edad.
- Mezcla: ~2 práctica prioritaria + 1 fortaleza o exploración.
- No machacar el dominio más bajo.
- El mundo también crece si solo se hace la misión real.

## 7. Monetización

Cliente que paga: el adulto. Cero compras en Child Mode.

- **Free:** 1 perfil, Discovery, mapa inicial, 3 aventuras/semana, misiones, insights básicos.
- **Premium familiar:** plan diario completo, biblioteca, historial, informes, más de un perfil.
- Sin anuncios en la experiencia infantil.
- El árbol del niño no se ve “pobre” en free; se limitan *nuevas aventuras*, no la dignidad visual.

## 8. Privacidad

Local-first en MVP. Identificadores:

- `parentAccountId` local
- `childProfileId` seudónimo (`c_` + aleatorio)
- Edad, idioma, estado de aprendizaje
- Prohibido: ubicación, fotos, voz persistente, chat, ads graph

Cumplimiento legal real (COPPA, Families Policy, Kids Category) requiere revisión jurídica antes de store. Este código no equivale a cumplimiento.

## 9. Stack técnico

- Next.js (App Router) + TypeScript
- Estado local + `localStorage`
- Motor de minijuegos por config + componentes de mecánica
- Sin backend infantil en MVP
- Español primero

## 10. North star de implementación

El niño pide jugar. El padre entiende sin ser asustado. Nadie recibe un diagnóstico.
