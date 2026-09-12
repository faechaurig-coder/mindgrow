import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { confidenceFor, applyObservation, emptyEstimate, toObservation } from "./scoring";
import { nextAdaptive, createAdaptiveState } from "./adaptive";
import { discoveryQueue } from "./age";
import { skillByGame } from "./ontology";
import { buildWeeklyInsight } from "./insights";
import { defaultState } from "./storage";
import { growWorld } from "./world";

describe("confidence", () => {
  it("stays low after a first session", () => {
    assert.equal(confidenceFor({ evidenceCount: 5, games: 1, sessions: 1, forceLow: true }), "low");
  });

  it("reaches medium with enough independent evidence", () => {
    assert.equal(confidenceFor({ evidenceCount: 8, games: 2, sessions: 2 }), "medium");
  });
});

describe("adaptive", () => {
  it("raises difficulty after two successes", () => {
    const start = createAdaptiveState(6, 3);
    const mid = nextAdaptive(start, true, 6, "daily");
    const end = nextAdaptive(mid, true, 6, "daily");
    assert.equal(end.difficulty, 4);
  });

  it("lowers difficulty after two failures", () => {
    const start = createAdaptiveState(6, 3);
    const mid = nextAdaptive(start, false, 6, "daily");
    const end = nextAdaptive(mid, false, 6, "daily");
    assert.equal(end.difficulty, 2);
  });
});

describe("scoring", () => {
  it("keeps sessionCount different from activeDays", () => {
    const estimate = emptyEstimate("attention_inhibition", 6);
    assert.equal(estimate.sessionCount, 0);
    assert.equal(estimate.activeDays, 0);
  });

  it("moves ability up after a hard success", () => {
    const estimate = emptyEstimate("visual_memory", 6);
    const observation = toObservation(
      {
        gameId: "luciernagas",
        difficulty: 6,
        correct: true,
        sessionId: "s1",
        context: "daily",
      },
      "o1",
    );
    const next = applyObservation(estimate, observation, 6);
    assert.ok(next.ability >= estimate.ability);
    assert.equal(next.evidenceCount, 1);
  });
});

describe("discovery length", () => {
  it("keeps age 4 shorter than age 8", () => {
    assert.ok(discoveryQueue(4).length < discoveryQueue(8).length);
  });

  it("adds a second attention game for older children", () => {
    assert.ok(discoveryQueue(7).includes("guardianes"));
    assert.equal(skillByGame("guardianes"), "attention_inhibition");
  });
});

describe("world growth", () => {
  it("adds a flower for playing, not only for finishing an adventure", () => {
    const next = growWorld(defaultState().world, { gameDone: true, regions: ["attention_inhibition"] });
    assert.equal(next.flowers, 1);
    assert.equal(next.adventuresCompleted, 0);
    assert.ok(next.litRegions.includes("attention_inhibition"));
    assert.ok(next.lastEvent.length > 0);
  });

  it("does not invent a bloom when nothing happened", () => {
    const next = growWorld(defaultState().world, { regions: [] });
    assert.equal(next.flowers, 0);
    assert.equal(next.lastEvent, "");
  });
});

describe("weekly insight", () => {
  it("does not invent a strength without evidence", () => {
    const insight = buildWeeklyInsight(defaultState());
    assert.equal(insight.strength, undefined);
    assert.ok(insight.teaser.includes("Aún no"));
  });
});
