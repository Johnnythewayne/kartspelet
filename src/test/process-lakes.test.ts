import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

function perpDist(p: number[], a: number[], b: number[]): number {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / lenSq));
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

function simplify(pts: number[][], eps: number): number[][] {
  if (pts.length <= 2) return pts;
  let maxD = 0, maxI = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = perpDist(pts[i], pts[0], pts[pts.length - 1]);
    if (d > maxD) { maxD = d; maxI = i; }
  }
  if (maxD > eps) {
    const left = simplify(pts.slice(0, maxI + 1), eps);
    const right = simplify(pts.slice(maxI), eps);
    return [...left.slice(0, -1), ...right];
  }
  return [pts[0], pts[pts.length - 1]];
}

function simplifyToTarget(pts: number[][], target: number): number[][] {
  if (pts.length <= target) return pts;
  let lo = 0, hi = 0.1;
  while (simplify(pts, hi).length > target) hi *= 2;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (simplify(pts, mid).length > target) lo = mid; else hi = mid;
  }
  return simplify(pts, hi);
}

function joinWays(ways: { geometry: { lat: number; lon: number }[] }[]): number[][] {
  if (ways.length === 0) return [];
  const segments = ways.map(w => w.geometry.map(g => [g.lon, g.lat]));
  const result: number[][] = [...segments[0]];
  const used = new Set<number>([0]);
  
  while (used.size < segments.length) {
    const lastPt = result[result.length - 1];
    let bestIdx = -1, bestReverse = false, bestDist = Infinity;
    
    for (let i = 0; i < segments.length; i++) {
      if (used.has(i)) continue;
      const seg = segments[i];
      const d1 = Math.hypot(lastPt[0] - seg[0][0], lastPt[1] - seg[0][1]);
      const d2 = Math.hypot(lastPt[0] - seg[seg.length - 1][0], lastPt[1] - seg[seg.length - 1][1]);
      if (d1 < bestDist) { bestDist = d1; bestIdx = i; bestReverse = false; }
      if (d2 < bestDist) { bestDist = d2; bestIdx = i; bestReverse = true; }
    }
    
    if (bestIdx === -1 || bestDist > 0.1) break; // 0.1 degree gap = discontinuity
    used.add(bestIdx);
    const seg = bestReverse ? [...segments[bestIdx]].reverse() : segments[bestIdx];
    result.push(...seg.slice(1));
  }
  
  return result;
}

function readOsmFile(filename: string): { geometry: { lat: number; lon: number }[] }[] {
  const filepath = path.resolve(__dirname, '../../tmp/' + filename);
  const raw = fs.readFileSync(filepath, 'utf-8');
  const data = JSON.parse(raw);
  // Filter to outer ways only (role === "outer" or role === "")
  // The relation query already fetched these, but Vättern/Siljan may include inner ways too
  return (data.elements || []).filter((e: any) => e.type === 'way' && e.geometry?.length > 0);
}

// Find largest connected ring from ways (the outer shoreline, not islands)
function findLargestRing(ways: { geometry: { lat: number; lon: number }[] }[]): number[][] {
  if (ways.length === 0) return [];
  const segments = ways.map(w => w.geometry.map(g => [g.lon, g.lat]));
  
  const used = new Set<number>();
  const rings: number[][][] = [];
  
  while (used.size < segments.length) {
    // Find first unused
    let startIdx = -1;
    for (let i = 0; i < segments.length; i++) {
      if (!used.has(i)) { startIdx = i; break; }
    }
    if (startIdx === -1) break;
    
    const ring: number[][] = [...segments[startIdx]];
    used.add(startIdx);
    
    // Try to extend this ring
    let extended = true;
    while (extended) {
      extended = false;
      const lastPt = ring[ring.length - 1];
      let bestIdx = -1, bestReverse = false, bestDist = Infinity;
      
      for (let i = 0; i < segments.length; i++) {
        if (used.has(i)) continue;
        const seg = segments[i];
        const d1 = Math.hypot(lastPt[0] - seg[0][0], lastPt[1] - seg[0][1]);
        const d2 = Math.hypot(lastPt[0] - seg[seg.length - 1][0], lastPt[1] - seg[seg.length - 1][1]);
        if (d1 < bestDist) { bestDist = d1; bestIdx = i; bestReverse = false; }
        if (d2 < bestDist) { bestDist = d2; bestIdx = i; bestReverse = true; }
      }
      
      if (bestIdx !== -1 && bestDist < 0.01) {
        used.add(bestIdx);
        const seg = bestReverse ? [...segments[bestIdx]].reverse() : segments[bestIdx];
        ring.push(...seg.slice(1));
        extended = true;
      }
    }
    
    rings.push(ring);
  }
  
  // Return largest ring
  rings.sort((a, b) => b.length - a.length);
  return rings[0] || [];
}

describe('Process OSM lake data', () => {
  it('builds and writes high-res lakes', () => {
    const lakeFiles: { name: string; file: string; target: number }[] = [
      { name: 'Vänern', file: 'vanern-outer.json', target: 300 },
      { name: 'Vättern', file: 'vattern-outer.json', target: 200 },
      { name: 'Mälaren', file: 'malaren-outer.json', target: 300 },
      { name: 'Hjälmaren', file: 'hjalmaren-outer.json', target: 124 },
      { name: 'Storsjön', file: 'storsjon-outer.json', target: 150 },
      { name: 'Siljan', file: 'siljan-outer.json', target: 100 },
      { name: 'Torneträsk', file: 'tornetrask-outer.json', target: 100 },
    ];

    const lakes: { name: string; coordinates: number[][] }[] = [];

    for (const lake of lakeFiles) {
      const ways = readOsmFile(lake.file);
      const totalNodes = ways.reduce((s, w) => s + w.geometry.length, 0);
      console.log(`${lake.name}: ${ways.length} ways, ${totalNodes} total nodes`);
      
      const ring = findLargestRing(ways);
      console.log(`  Largest ring: ${ring.length} nodes`);
      
      const simplified = simplifyToTarget(ring, lake.target);
      console.log(`  Simplified: ${simplified.length} nodes (target: ${lake.target})`);
      
      lakes.push({ name: lake.name, coordinates: simplified });
    }

    // Write output - compact format (one line per lake's coordinates)
    let output = `// Swedish lakes - high-resolution data from OpenStreetMap\n`;
    output += `// Simplified with Douglas-Peucker algorithm\n\n`;
    output += `export interface LakeData {\n  name: string;\n  coordinates: [number, number][];\n}\n\n`;
    output += `export const SWEDEN_LAKES: LakeData[] = [\n`;
    
    for (const lake of lakes) {
      const coordStr = lake.coordinates.map(c => `[${Number(c[0]).toFixed(5)},${Number(c[1]).toFixed(5)}]`).join(',');
      output += `  { name: "${lake.name}", coordinates: [${coordStr}] },\n`;
    }
    output += `];\n`;

    const outPath = path.resolve(__dirname, '../data/sweden-lakes.ts');
    fs.writeFileSync(outPath, output);

    // Verify
    const written = fs.readFileSync(outPath, 'utf-8');
    const lineCount = written.split('\n').length;
    console.log(`\nOutput: ${lineCount} lines`);
    
    for (const lake of lakes) {
      expect(written).toContain(`name: "${lake.name}"`);
      expect(lake.coordinates.length).toBeGreaterThanOrEqual(100);
      console.log(`✓ ${lake.name}: ${lake.coordinates.length} nodes`);
    }
  });
});
