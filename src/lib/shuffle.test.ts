import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { seededShuffle } from "./shuffle";

describe("seededShuffle", () => {
  it("keeps the same items", () => {
    const input = ["a", "b", "c", "d"];
    const out = seededShuffle(input, 4);
    assert.deepEqual([...out].sort(), [...input].sort());
  });

  it("is deterministic", () => {
    assert.deepEqual(seededShuffle([1, 2, 3, 4], 9), seededShuffle([1, 2, 3, 4], 9));
  });
});
