import { describe, it, expect } from "vitest";
import { SWEDEN_LAKES } from "@/data/sweden-lakes";

describe("Sweden lakes verification", () => {
  it("has correct high-res node counts", () => {
    const counts = Object.fromEntries(SWEDEN_LAKES.map(l => [l.name, l.coordinates.length]));
    console.log("Lake node counts:", counts);
    
    expect(counts["Vänern"]).toBe(5000);
    expect(counts["Vättern"]).toBe(3000);
    expect(counts["Mälaren"]).toBe(5000);
    expect(counts["Storsjön"]).toBe(2000);
    expect(counts["Siljan"]).toBe(1500);
    expect(counts["Torneträsk"]).toBe(1500);
    expect(counts["Hjälmaren"]).toBeGreaterThanOrEqual(100);
  });
});
