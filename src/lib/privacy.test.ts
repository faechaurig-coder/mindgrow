import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { hasPii, makeEvent } from "./analytics";

describe("privacy-first analytics", () => {
  it("drops unknown events", () => {
    assert.equal(makeEvent("hack_the_planet"), null);
  });

  it("strips child PII keys", () => {
    const event = makeEvent("game_start", { nickname: "Lina", ageYears: 6, game: "semaforo" });
    assert.ok(event);
    assert.equal(event.props?.nickname, undefined);
    assert.equal(event.props?.game, "semaforo");
    assert.equal(hasPii(event), false);
  });
});
