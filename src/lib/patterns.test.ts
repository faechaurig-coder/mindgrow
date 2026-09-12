import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { generatePattern, kindsForAge, validatePattern } from "./patterns";

describe("pattern generator", () => {
  it("gates kinds by age", () => {
    assert.deepEqual(kindsForAge(4), ["AB"]);
    assert.ok(kindsForAge(8).includes("AABB"));
  });

  it("always has one defensible answer", () => {
    for (const age of [4, 5, 6, 7, 8]) {
      for (let seed = 0; seed < 12; seed += 1) {
        const puzzle = generatePattern(age, seed);
        assert.equal(validatePattern(puzzle), true, `age ${age} seed ${seed}`);
        assert.equal(puzzle.options.filter((o) => o.label === puzzle.answer).length, 1);
      }
    }
  });
});
