import { describe, it, expect } from "vitest";
import { SWEDEN_LAKES } from "@/data/sweden-lakes";

describe("Sweden lakes verification", () => {
  it("has correct node counts", () => {
    const counts = Object.fromEntries(SWEDEN_LAKES.map(l => [l.name, l.coordinates.length]));
    console.log("Lake node counts:", counts);
    
    expect(counts["Vänern"]).toBe(300);
    expect(counts["Vättern"]).toBe(200);
    expect(counts["Mälaren"]).toBe(300);
    expect(counts["Storsjön"]).toBe(150);
    expect(counts["Siljan"]).toBe(100);
    expect(counts["Torneträsk"]).toBe(100);
    expect(counts["Hjälmaren"]).toBeGreaterThanOrEqual(100);
  });
});
