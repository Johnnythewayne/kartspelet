import { describe, it, expect } from "vitest";
import { SWEDEN_LAKES } from "@/data/sweden-lakes";

describe("Sweden lakes detail", () => {
  it("has high node counts", () => {
    const byName = Object.fromEntries(SWEDEN_LAKES.map((l) => [l.name, l.coordinates.length]));
    // Log for verification in test output
    // eslint-disable-next-line no-console
    console.log("SWEDEN_LAKES node counts:", byName);

    expect(byName["Vänern"]).toBeGreaterThanOrEqual(400);
    expect(byName["Mälaren"]).toBeGreaterThanOrEqual(300);
    expect(byName["Vättern"]).toBeGreaterThanOrEqual(150);
    expect(byName["Torneträsk"]).toBeGreaterThanOrEqual(120);
    expect(byName["Storsjön"]).toBeGreaterThanOrEqual(100);
    expect(byName["Siljan"]).toBeGreaterThanOrEqual(70);
    expect(byName["Hjälmaren"]).toBeGreaterThanOrEqual(60);
  });
});
