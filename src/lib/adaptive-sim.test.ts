import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { difficultyBounds } from "./age";
import { simulateAdaptive } from "./adaptive";

describe("adaptive simulations", () => {
  it("always-correct child stays inside age bounds", () => {
    const end = simulateAdaptive(Array(12).fill(true), 6);
    const bounds = difficultyBounds(6);
    assert.ok(end.difficulty <= bounds.max);
    assert.ok(end.difficulty >= 3);
  });

  it("always-incorrect child does not collapse below min", () => {
    const end = simulateAdaptive(Array(12).fill(false), 6);
    assert.equal(end.difficulty, difficultyBounds(6).min);
  });

  it("alternating profile does not explode", () => {
    const profile = Array.from({ length: 12 }, (_, i) => i % 2 === 0);
    const end = simulateAdaptive(profile, 6);
    const bounds = difficultyBounds(6);
    assert.ok(end.difficulty >= bounds.min && end.difficulty <= bounds.max);
  });
});
