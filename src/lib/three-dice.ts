import * as THREE from 'three';

/* ── Triangles per logical face for each die type ── */
const TRIS_PER_FACE: Record<number, number> = {
  4: 1,   /* TetrahedronGeometry: 4 tris, 1 per face */
  40: 1,  /* d4t (top-read): same geometry as d4 */
  6: 2,   /* BoxGeometry: 12 tris, 2 per face */
  8: 1,   /* OctahedronGeometry: 8 tris, 1 per face */
  10: 1,  /* Pentagonal bipyramid: 10 tris, 1 per face */
  12: 3,  /* DodecahedronGeometry: 36 tris, 3 pentagon */
  20: 1,  /* IcosahedronGeometry: 20 tris, 1 per face */
  100: 1, /* d%: uses d10 geometry, 10 tris, 1 per face */
};

/* ── Purple palette for face textures (vibrant popping purples) ── */
const PALETTES = [
  ['#E9D5FF', '#7C3AED', '#3B0764'],
  ['#F0ABFC', '#9333EA', '#4A044E'],
  ['#E879F9', '#A855F7', '#581C87'],
  ['#E879F9', '#A855F7', '#581C87'],
  ['#E9D5FF', '#7C3AED', '#3B0764'],
  ['#F0ABFC', '#9333EA', '#4A044E'],
  ['#E879F9', '#A855F7', '#581C87'],
  ['#E879F9', '#A855F7', '#581C87'],
  ['#E9D5FF', '#7C3AED', '#3B0764'],
  ['#F0ABFC', '#9333EA', '#4A044E'],
  ['#E879F9', '#A855F7', '#581C87'],
  ['#E879F9', '#A855F7', '#581C87'],
];

/* ── Canvas helpers ── */
function fillGradient(ctx: CanvasRenderingContext2D, size: number, colorIdx: number) {
  const pal = PALETTES[colorIdx % PALETTES.length];
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, pal[0]);
  grad.addColorStop(0.5, pal[1]);
  grad.addColorStop(1, pal[2]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
}

function drawNumber(ctx: CanvasRenderingContext2D, size: number, label: string, fontScale = 0.38) {
  ctx.font = `900 ${size * fontScale}px Sora, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.miterLimit = 2;
  ctx.strokeStyle = '#1a0a2e';
  ctx.lineWidth = size * 0.03;
  ctx.strokeText(label, size / 2, size / 2);
  ctx.lineWidth = size * 0.015;
  ctx.strokeText(label, size / 2, size / 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(label, size / 2, size / 2);
}

function createNumberTexture(label: string, colorIdx: number, size = 512, fontScale = 0.38): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  fillGradient(ctx, size, colorIdx);
  drawNumber(ctx, size, label, fontScale);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/* ── d4t texture: 3 numbers per face, each oriented toward its vertex ── */
function createD4tFaceTexture(faceNums: [number, number, number], colorIdx: number, size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  fillGradient(ctx, size, colorIdx);

  const cx = size / 2;
  const cy = size / 2;

  /* 3 positions in a triangle, well within visible area.
     Pos 0 = top (tip vertex), pos 1 = bottom-left, pos 2 = bottom-right. */
  const topX = cx;
  const topY = size * 0.30;
  const blX = size * 0.33;
  const blY = size * 0.58;
  const brX = size * 0.67;
  const brY = size * 0.58;

  const positions: [number, number, number][] = [
    [faceNums[0], topX, topY],
    [faceNums[1], blX, blY],
    [faceNums[2], brX, brY],
  ];

  const fontSz = size * 0.14;

  for (let i = 0; i < positions.length; i++) {
    const [num, px, py] = positions[i];
    ctx.save();
    ctx.translate(px, py);

    /* Rotate so top of text points toward vertex (outward from center) */
    const angle = Math.atan2(py - cy, px - cx) + Math.PI / 2;
    ctx.rotate(angle);

    ctx.font = `900 ${fontSz}px Sora, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;

    ctx.strokeStyle = '#1a0a2e';
    ctx.lineWidth = fontSz * 0.03;
    ctx.strokeText(String(num), 0, 0);
    ctx.lineWidth = fontSz * 0.015;
    ctx.strokeText(String(num), 0, 0);

    ctx.fillStyle = '#ffffff';
    ctx.fillText(String(num), 0, 0);

    ctx.restore();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/* ── d6 pip layout ── */
function drawPips(ctx: CanvasRenderingContext2D, size: number, val: number, colorIdx: number) {
  fillGradient(ctx, size, colorIdx);

  const r = size * 0.07;
  const cx = size / 2;
  const cy = size / 2;
  const off = size * 0.25;

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#1a0a2e';
  ctx.lineWidth = size * 0.02;

  function dot(x: number, y: number) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
  }

  const positions: [number, number][] = [];
  if (val === 1) {
    positions.push([cx, cy]);
  } else if (val === 2) {
    positions.push([cx - off, cy - off], [cx + off, cy + off]);
  } else if (val === 3) {
    positions.push([cx - off, cy - off], [cx, cy], [cx + off, cy + off]);
  } else if (val === 4) {
    positions.push([cx - off, cy - off], [cx + off, cy - off], [cx - off, cy + off], [cx + off, cy + off]);
  } else if (val === 5) {
    positions.push([cx - off, cy - off], [cx + off, cy - off], [cx, cy], [cx - off, cy + off], [cx + off, cy + off]);
  } else {
    positions.push([cx - off, cy - off], [cx + off, cy - off], [cx - off, cy], [cx + off, cy], [cx - off, cy + off], [cx + off, cy + off]);
  }

  positions.forEach(([x, y]) => dot(x, y));
}

function createPipTexture(val: number, colorIdx: number, size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  drawPips(ctx, size, val, colorIdx);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/* ── Geometry builders ── */

/* d4: TetrahedronGeometry is non-indexed, 4 faces × 3 vertices = 12 vertices */
function buildD4Geometry(): THREE.BufferGeometry {
  return new THREE.TetrahedronGeometry(2.1);
}

/* d6: BoxGeometry is indexed, 6 faces × 2 tris = 12 tris, 36 indices */
function buildD6Geometry(): THREE.BufferGeometry {
  return new THREE.BoxGeometry(2.4, 2.4, 2.4);
}

/* d8: OctahedronGeometry is non-indexed, 8 faces × 3 vertices = 24 vertices */
function buildD8Geometry(): THREE.BufferGeometry {
  return new THREE.OctahedronGeometry(2.1);
}

/* d10: Pentagonal bipyramid (non-indexed, 10 triangular faces) */
function buildD10Geometry(radius = 2.2, height = 2.0): THREE.BufferGeometry {
  const r = radius;
  const h = height;

  const eq: number[][] = [];
  for (let i = 0; i < 5; i++) {
    const angle = (2 * Math.PI * i) / 5 + Math.PI / 10;
    eq.push([r * Math.cos(angle), r * Math.sin(angle), 0]);
  }
  const poleTop: number[] = [0, 0, h];
  const poleBot: number[] = [0, 0, -h];

  const positions: number[] = [];
  const uvArr: number[] = [];
  const triUVs = [[0.5, 1], [0, 0], [1, 0]];

  function triNormal(ax: number, ay: number, az: number, bx: number, by: number, bz: number, cx: number, cy: number, cz: number): [number, number, number] {
    const e1x = bx - ax, e1y = by - ay, e1z = bz - az;
    const e2x = cx - ax, e2y = cy - ay, e2z = cz - az;
    let nx = e1y * e2z - e1z * e2y;
    let ny = e1z * e2x - e1x * e2z;
    let nz = e1x * e2y - e1y * e2x;
    const mag = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (mag > 0) { nx /= mag; ny /= mag; nz /= mag; }
    const fcx = (ax + bx + cx) / 3, fcy = (ay + by + cy) / 3, fcz = (az + bz + cz) / 3;
    if (nx * fcx + ny * fcy + nz * fcz < 0) { nx = -nx; ny = -ny; nz = -nz; }
    return [nx, ny, nz];
  }

  const normals: number[] = [];

  for (let i = 0; i < 5; i++) {
    const n = (i + 1) % 5;

    /* Upper face: poleTop → eq[i] → eq[n] */
    for (const v of [poleTop, eq[i], eq[n]]) positions.push(v[0], v[1], v[2]);
    triUVs.forEach(uv => uvArr.push(uv[0], uv[1]));
    const [unx, uny, unz] = triNormal(poleTop[0], poleTop[1], poleTop[2], eq[i][0], eq[i][1], eq[i][2], eq[n][0], eq[n][1], eq[n][2]);
    for (let v = 0; v < 3; v++) { normals.push(unx, uny, unz); }

    /* Lower face: poleBot → eq[n] → eq[i] */
    for (const v of [poleBot, eq[n], eq[i]]) positions.push(v[0], v[1], v[2]);
    triUVs.forEach(uv => uvArr.push(uv[0], uv[1]));
    const [lnx, lny, lnz] = triNormal(poleBot[0], poleBot[1], poleBot[2], eq[n][0], eq[n][1], eq[n][2], eq[i][0], eq[i][1], eq[i][2]);
    for (let v = 0; v < 3; v++) { normals.push(lnx, lny, lnz); }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvArr, 2));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));

  for (let f = 0; f < 10; f++) {
    geo.addGroup(f * 3, 3, f);
  }
  return geo;
}

function buildD12Geometry(): THREE.BufferGeometry {
  return new THREE.DodecahedronGeometry(2.2);
}

function buildD20Geometry(): THREE.BufferGeometry {
  return new THREE.IcosahedronGeometry(2.7);
}

/* ── Compute face normals (handles both indexed and non-indexed) ── */
function computeFaceNormals(
  geometry: THREE.BufferGeometry,
  faceCount: number,
  trisPerFace: number,
): THREE.Vector3[] {
  const pos = geometry.getAttribute('position');
  const idx = geometry.getIndex();
  const normals: THREE.Vector3[] = [];

  for (let f = 0; f < faceCount; f++) {
    let nx = 0, ny = 0, nz = 0;
    const uniqueVerts = new Set<number>();
    const vertSums = [0, 0, 0];

    for (let t = 0; t < trisPerFace; t++) {
      let i0: number, i1: number, i2: number;

      if (idx) {
        const base = f * trisPerFace * 3 + t * 3;
        i0 = idx.getX(base);
        i1 = idx.getX(base + 1);
        i2 = idx.getX(base + 2);
      } else {
        const tri = f * trisPerFace + t;
        i0 = tri * 3;
        i1 = tri * 3 + 1;
        i2 = tri * 3 + 2;
      }

      for (const vi of [i0, i1, i2]) {
        if (!uniqueVerts.has(vi)) {
          uniqueVerts.add(vi);
          vertSums[0] += pos.getX(vi);
          vertSums[1] += pos.getY(vi);
          vertSums[2] += pos.getZ(vi);
        }
      }

      const ax = pos.getX(i0), ay = pos.getY(i0), az = pos.getZ(i0);
      const bx = pos.getX(i1), by = pos.getY(i1), bz = pos.getZ(i1);
      const ccx = pos.getX(i2), ccy = pos.getY(i2), ccz = pos.getZ(i2);

      const e1x = bx - ax, e1y = by - ay, e1z = bz - az;
      const e2x = ccx - ax, e2y = ccy - ay, e2z = ccz - az;
      nx += e1y * e2z - e1z * e2y;
      ny += e1z * e2x - e1x * e2z;
      nz += e1x * e2y - e1y * e2x;
    }

    const vCount = uniqueVerts.size;
    const cx = vertSums[0] / vCount;
    const cy = vertSums[1] / vCount;
    const cz = vertSums[2] / vCount;

    const mag = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (mag > 0) { nx /= mag; ny /= mag; nz /= mag; }

    const normal = new THREE.Vector3(nx, ny, nz);
    if (normal.dot(new THREE.Vector3(cx, cy, cz)) < 0) normal.negate();
    normals.push(normal);
  }
  return normals;
}

/* ── Compute per-face "up" direction (centroid→tip vertex, projected onto face plane) ── */
function computeFaceUpDirs(
  geometry: THREE.BufferGeometry,
  faceNormals: THREE.Vector3[],
  faceCount: number,
  trisPerFace: number,
): THREE.Vector3[] {
  const pos = geometry.getAttribute('position');
  const idx = geometry.getIndex();
  const dirs: THREE.Vector3[] = [];

  for (let f = 0; f < faceCount; f++) {
    const uniqueMap = new Map<string, [number, number, number]>();
    let cx = 0, cy = 0, cz = 0, count = 0;

    for (let t = 0; t < trisPerFace; t++) {
      let i0: number, i1: number, i2: number;
      if (idx) {
        const base = f * trisPerFace * 3 + t * 3;
        i0 = idx.getX(base); i1 = idx.getX(base + 1); i2 = idx.getX(base + 2);
      } else {
        const tri = f * trisPerFace + t;
        i0 = tri * 3; i1 = tri * 3 + 1; i2 = tri * 3 + 2;
      }
      for (const vi of [i0, i1, i2]) {
        const x = pos.getX(vi), y = pos.getY(vi), z = pos.getZ(vi);
        cx += x; cy += y; cz += z; count++;
        const key = `${x.toFixed(6)},${y.toFixed(6)},${z.toFixed(6)}`;
        if (!uniqueMap.has(key)) uniqueMap.set(key, [x, y, z]);
      }
    }
    cx /= count; cy /= count; cz /= count;

    const uniqueVerts = Array.from(uniqueMap.values());
    let tipIdx = 0, tipDist2 = 0;
    for (let vi = 0; vi < uniqueVerts.length; vi++) {
      const dx = uniqueVerts[vi][0] - cx, dy = uniqueVerts[vi][1] - cy, dz = uniqueVerts[vi][2] - cz;
      const d2 = dx * dx + dy * dy + dz * dz;
      if (d2 > tipDist2) { tipDist2 = d2; tipIdx = vi; }
    }

    const tip = uniqueVerts[tipIdx];
    const up = new THREE.Vector3(tip[0] - cx, tip[1] - cy, tip[2] - cz).normalize();
    /* Project onto face plane (remove normal component) */
    const n = faceNormals[f];
    up.sub(n.clone().multiplyScalar(up.dot(n))).normalize();
    dirs.push(up);
  }
  return dirs;
}

/* ── Recompute UVs for box faces — projects vertices onto tangent axes ── */
function recomputeBoxFaceUVs(geometry: THREE.BufferGeometry) {
  const pos = geometry.getAttribute('position');
  const idx = geometry.getIndex();
  const uvs = geometry.getAttribute('uv');
  if (!uvs || !idx) return;

  for (let f = 0; f < 6; f++) {
    const base = f * 6;
    const i0 = idx.getX(base), i1 = idx.getX(base + 1), i2 = idx.getX(base + 2);

    const ax = pos.getX(i0), ay = pos.getY(i0), az = pos.getZ(i0);
    const bx = pos.getX(i1), by = pos.getY(i1), bz = pos.getZ(i1);
    const ccx = pos.getX(i2), ccy = pos.getY(i2), ccz = pos.getZ(i2);

    const e1x = bx - ax, e1y = by - ay, e1z = bz - az;
    const e2x = ccx - ax, e2y = ccy - ay, e2z = ccz - az;
    let nx = e1y * e2z - e1z * e2y;
    let ny = e1z * e2x - e1x * e2z;
    let nz = e1x * e2y - e1y * e2x;
    const mag = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (mag > 0) { nx /= mag; ny /= mag; nz /= mag; }

    let tx: number, ty: number, tz: number;
    if (Math.abs(nx) > 0.9) {
      tx = 0; ty = 1; tz = 0;
    } else if (Math.abs(ny) > 0.9) {
      tx = 1; ty = 0; tz = 0;
    } else {
      tx = 1; ty = 0; tz = 0;
    }
    let btx = ny * tz - nz * ty, bty = nz * tx - nx * tz, btz = nx * ty - ny * tx;

    const allU: number[] = [], allV: number[] = [];
    for (let t = 0; t < 2; t++) {
      for (let j = 0; j < 3; j++) {
        const vi = idx.getX(base + t * 3 + j);
        const px = pos.getX(vi), py = pos.getY(vi), pz = pos.getZ(vi);
        allU.push(px * tx + py * ty + pz * tz);
        allV.push(px * btx + py * bty + pz * btz);
      }
    }
    const minU = Math.min(...allU), maxU = Math.max(...allU);
    const minV = Math.min(...allV), maxV = Math.max(...allV);
    const rangeU = maxU - minU || 1, rangeV = maxV - minV || 1;

    for (let t = 0; t < 2; t++) {
      for (let j = 0; j < 3; j++) {
        const viIdx = idx.getX(base + t * 3 + j);
        const px = pos.getX(viIdx), py = pos.getY(viIdx), pz = pos.getZ(viIdx);
        const u = (px * tx + py * ty + pz * tz - minU) / rangeU;
        const vv = (px * btx + py * bty + pz * btz - minV) / rangeV;
        uvs.setXY(viIdx, u, vv);
      }
    }
  }
  (uvs as THREE.BufferAttribute).needsUpdate = true;
}

/* ── Recompute UVs so each face is oriented with number top toward the tip vertex ── */
function recomputeFaceUVs(geometry: THREE.BufferGeometry, faceCount: number, trisPerFace: number) {
  const pos = geometry.getAttribute('position');
  const idx = geometry.getIndex();
  const uvs = geometry.getAttribute('uv');
  if (!uvs) return;

  for (let f = 0; f < faceCount; f++) {
    const verts: [number, number, number][] = [];
    for (let t = 0; t < trisPerFace; t++) {
      let i0: number, i1: number, i2: number;
      if (idx) {
        const base = f * trisPerFace * 3 + t * 3;
        i0 = idx.getX(base); i1 = idx.getX(base + 1); i2 = idx.getX(base + 2);
      } else {
        const tri = f * trisPerFace + t;
        i0 = tri * 3; i1 = tri * 3 + 1; i2 = tri * 3 + 2;
      }
      verts.push([pos.getX(i0), pos.getY(i0), pos.getZ(i0)]);
      verts.push([pos.getX(i1), pos.getY(i1), pos.getZ(i1)]);
      verts.push([pos.getX(i2), pos.getY(i2), pos.getZ(i2)]);
    }

    /* Face centroid */
    let cx = 0, cy = 0, cz = 0;
    for (const v of verts) { cx += v[0]; cy += v[1]; cz += v[2]; }
    cx /= verts.length; cy /= verts.length; cz /= verts.length;

    /* Face normal from first triangle */
    const e1x = verts[1][0] - verts[0][0], e1y = verts[1][1] - verts[0][1], e1z = verts[1][2] - verts[0][2];
    const e2x = verts[2][0] - verts[0][0], e2y = verts[2][1] - verts[0][1], e2z = verts[2][2] - verts[0][2];
    let nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x;
    const mag = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (mag > 0) { nx /= mag; ny /= mag; nz /= mag; }

    /* Pick "tip" vertex: for unique verts, pick the one farthest from centroid */
    const uniqueMap = new Map<string, [number, number, number]>();
    for (const v of verts) {
      const key = `${v[0].toFixed(6)},${v[1].toFixed(6)},${v[2].toFixed(6)}`;
      if (!uniqueMap.has(key)) uniqueMap.set(key, v);
    }
    const uniqueVerts = Array.from(uniqueMap.values());
    let tipIdx = 0;
    let tipDist2 = 0;
    for (let vi = 0; vi < uniqueVerts.length; vi++) {
      const dx = uniqueVerts[vi][0] - cx, dy = uniqueVerts[vi][1] - cy, dz = uniqueVerts[vi][2] - cz;
      const d2 = dx * dx + dy * dy + dz * dz;
      if (d2 > tipDist2) { tipDist2 = d2; tipIdx = vi; }
    }
    const tip = uniqueVerts[tipIdx];

    /* Build tangent basis: t2 (V axis = number "up") points centroid→tip, t1 (U axis) perpendicular */
    const tipDx = tip[0] - cx, tipDy = tip[1] - cy, tipDz = tip[2] - cz;
    const tipLen = Math.sqrt(tipDx * tipDx + tipDy * tipDy + tipDz * tipDz);
    const upX = tipDx / tipLen, upY = tipDy / tipLen, upZ = tipDz / tipLen;

    /* t2 = up direction (number top) */
    const t2 = [upX, upY, upZ];
    /* t1 = up × normal (number right) */
    const t1x = upY * nz - upZ * ny, t1y = upZ * nx - upX * nz, t1z = upX * ny - upY * nx;

    /* Project vertices relative to centroid */
    const proj: [number, number][] = [];
    let maxDist = 0;
    for (const v of verts) {
      const dx = v[0] - cx, dy = v[1] - cy, dz = v[2] - cz;
      const u = dx * t1x + dy * t1y + dz * t1z;
      const vv = dx * t2[0] + dy * t2[1] + dz * t2[2];
      proj.push([u, vv]);
      const d = Math.max(Math.abs(u), Math.abs(vv));
      if (d > maxDist) maxDist = d;
    }

    /* Map to [0,1] centered on (0.5, 0.5) */
    const scale = maxDist > 0 ? 1 / (maxDist * 2.4) : 1;
    let vi = 0;
    for (let t = 0; t < trisPerFace; t++) {
      for (let j = 0; j < 3; j++) {
        const u = 0.5 + proj[vi][0] * scale;
        const vv = 0.5 + proj[vi][1] * scale;
        uvs.setXY(f * trisPerFace * 3 + vi, u, vv);
        vi++;
      }
    }
  }
  (uvs as THREE.BufferAttribute).needsUpdate = true;
}

/* ── Setup material groups for non-indexed geometries ── */
function setupGroups(geometry: THREE.BufferGeometry, faceCount: number, trisPerFace: number) {
  if (geometry.getIndex()) return;
  geometry.clearGroups();
  for (let f = 0; f < faceCount; f++) {
    geometry.addGroup(f * trisPerFace * 3, trisPerFace * 3, f);
  }
}

/* ── Main class ── */
export class ThreeDice {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private mesh: THREE.Mesh;
  private geometry: THREE.BufferGeometry;
  private materials: THREE.MeshBasicMaterial[];
  private faceNormals: THREE.Vector3[] = [];
  private faceUpDirs: THREE.Vector3[] = [];
  private initialQuat = new THREE.Quaternion();
  private finalQuat = new THREE.Quaternion();
  private animStart = 0;
  private animating = false;
  private animDuration = 0;
  private onComplete: (() => void) | null = null;
  private spinAxis: THREE.Vector3;

  constructor(type: number, value: number) {
    const faceCount = (type === 100 || type === 40) ? (type === 100 ? 10 : 4) : type;
    const trisPerFace = TRIS_PER_FACE[type] || 1;

    /* Build geometry */
    switch (type) {
      case 4: case 40: this.geometry = buildD4Geometry(); break;
      case 6:  this.geometry = buildD6Geometry(); break;
      case 8:  this.geometry = buildD8Geometry(); break;
      case 10: this.geometry = buildD10Geometry(); break;
      case 100: this.geometry = buildD10Geometry(2.45, 2.2); break;
      case 12: this.geometry = buildD12Geometry(); break;
      default: this.geometry = buildD20Geometry(); break;
    }

    /* Setup material groups */
    setupGroups(this.geometry, faceCount, trisPerFace);

    /* Recompute UVs so each face fills the texture */
    if (type === 6) {
      recomputeBoxFaceUVs(this.geometry);
    } else {
      recomputeFaceUVs(this.geometry, faceCount, trisPerFace);
    }

    /* Compute face normals */
    this.faceNormals = computeFaceNormals(this.geometry, faceCount, trisPerFace);

    /* Compute face up directions (for upright number orientation) */
    this.faceUpDirs = computeFaceUpDirs(this.geometry, this.faceNormals, faceCount, trisPerFace);

    /* Create materials */
    this.materials = [];

    if (type === 6) {
      /* d6: pip textures with standard die layout (opposite faces sum to 7) */
      /* BoxGeometry face order: +X, -X, +Y, -Y, +Z, -Z → values 2, 5, 3, 4, 1, 6 */
      const faceValues = [2, 5, 3, 4, 1, 6];
      for (let i = 0; i < 6; i++) {
        const tex = createPipTexture(faceValues[i], i);
        this.materials.push(new THREE.MeshBasicMaterial({ map: tex }));
      }
    } else if (type === 4 || type === 40) {
      /* d4/d4t: number textures */
      if (type === 40) {
        /* d4t: each face shows 3 numbers (one per vertex), oriented toward vertex.
           Face order chosen so that value V can be placed at the top with minimal rotation. */
        const faceVertexNums: [number, number, number][] = [
          [1, 2, 4],  /* Face 0: pos0=1, pos1=2, pos2=4 */
          [1, 3, 4],  /* Face 1: pos0=1, pos1=3, pos2=4 */
          [1, 2, 3],  /* Face 2: pos0=1, pos1=2, pos2=3 */
          [2, 3, 4],  /* Face 3: pos0=2, pos1=3, pos2=4 */
        ];
        for (let i = 0; i < 4; i++) {
          const tex = createD4tFaceTexture(faceVertexNums[i], i);
          this.materials.push(new THREE.MeshBasicMaterial({ map: tex }));
        }
      } else {
        for (let i = 0; i < 4; i++) {
          const tex = createNumberTexture(String(i + 1), i);
          this.materials.push(new THREE.MeshBasicMaterial({ map: tex }));
        }
      }
    } else {
      /* d8, d10, d12, d20, d100: number textures */
      let labels: string[];
      let fontScale: number;
      if (type === 100) {
        labels = ['00', '10', '20', '30', '40', '50', '60', '70', '80', '90'];
        fontScale = 0.16;
      } else if (type === 10) {
        labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        fontScale = 0.26;
      } else if (type === 20) {
        labels = Array.from({ length: faceCount }, (_, i) => String(i + 1));
        fontScale = 0.22;
      } else {
        labels = Array.from({ length: faceCount }, (_, i) => String(i + 1));
        fontScale = 0.38;
      }

      for (let i = 0; i < faceCount; i++) {
        const tex = createNumberTexture(labels[i], i, 512, fontScale);
        this.materials.push(new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide }));
      }
    }

    /* Create mesh */
    this.mesh = new THREE.Mesh(this.geometry, this.materials);
    this.mesh.scale.set(0.85, 0.85, 0.85);

    /* Scene */
    this.scene = new THREE.Scene();
    this.scene.add(this.mesh);

    /* Camera */
    this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    this.camera.position.z = 7;

    /* Renderer */
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(120, 120);

    /* Final rotation: orient the rolled face toward the camera with number upright */
    /* d6 has special faceValues mapping, so we need an inverse lookup */
    let fi: number;
    if (type === 6) {
      const d6ValueToFace = [4, 0, 2, 3, 1, 5];
      fi = d6ValueToFace[value - 1];
    } else if (type === 100) {
      fi = value;
    } else if (type === 10) {
      /* d10 labels are 0-indexed: ['0','1',...,'9'] */
      fi = value;
    } else {
      fi = value - 1;
    }

    let normal = this.faceNormals[fi] || this.faceNormals[0];
    let faceUp = this.faceUpDirs[fi] || this.faceUpDirs[0];

    /* d4t: rotate face around normal so the result number is at the top.
       faceVertexNums[face] = [top, bottom-left, bottom-right] numbers.
       We need to find which face has the value and which position index it's at,
       then rotate so that position is at the top. */
    if (type === 40) {
      const fvn: [number, number, number][] = [
        [1, 2, 4],  /* Face 0 */
        [1, 3, 4],  /* Face 1 */
        [1, 2, 3],  /* Face 2 */
        [2, 3, 4],  /* Face 3 */
      ];
      /* Which face to show for each value (1-indexed).
         Each face: [1,2,4], [1,3,4], [1,2,3], [2,3,4]
         Pick a face where the value exists. */
      const valueToFace = [0, 3, 1, 0]; /* value 1→face 0, 2→face 3, 3→face 1, 4→face 0 */
      fi = valueToFace[value - 1];
      normal = this.faceNormals[fi];
      faceUp = this.faceUpDirs[fi];

      const posIdx = fvn[fi].indexOf(value);
      if (posIdx > 0) {
        /* Rotation angles: pos 0 (tip) = 0, pos 1 (BL) ≈ +2π/3, pos 2 (BR) ≈ −2π/3 */
        const rotAngle = posIdx === 1 ? (2 * Math.PI) / 3 : -(2 * Math.PI) / 3;
        faceUp = faceUp.clone().applyAxisAngle(normal, rotAngle);
      }
    }

    /* Source basis: face's local frame */
    const srcZ = normal.clone().normalize();
    const srcY = faceUp.clone().normalize();
    const srcX = new THREE.Vector3().crossVectors(srcY, srcZ).normalize();

    /* Target basis: screen frame */
    const tgtX = new THREE.Vector3(1, 0, 0);
    const tgtY = new THREE.Vector3(0, 1, 0);
    const tgtZ = new THREE.Vector3(0, 0, 1);

    /* Rotation = targetBasis * sourceBasis^T */
    const srcMat = new THREE.Matrix4().makeBasis(srcX, srcY, srcZ);
    const tgtMat = new THREE.Matrix4().makeBasis(tgtX, tgtY, tgtZ);
    const rotMat = tgtMat.clone().multiply(srcMat.transpose());
    this.finalQuat.setFromRotationMatrix(rotMat);

    /* d10/d100: tilt slightly forward so bottom half is visible */
    if (type === 10 || type === 100) {
      const tilt = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -0.25);
      this.finalQuat.premultiply(tilt);
    }

    /* d6: slight tilt to show 3D depth while keeping face visible */
    if (type === 6) {
      const tiltX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0.15);
      this.finalQuat.premultiply(tiltX);
    }

    /* Random initial tumble orientation */
    const rand = new THREE.Euler(
      Math.random() * Math.PI * 4,
      Math.random() * Math.PI * 4,
      Math.random() * Math.PI * 4,
      'YXZ',
    );
    this.initialQuat.setFromEuler(rand).multiply(this.finalQuat);

    /* Random spin axis for tumbling */
    this.spinAxis = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5,
    ).normalize();

    /* Set initial rotation and render first frame */
    this.mesh.quaternion.copy(this.initialQuat);
    this.renderer.render(this.scene, this.camera);
  }

  getElement(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  tumble(duration: number, onComplete?: () => void) {
    this.animDuration = duration;
    this.animStart = performance.now();
    this.animating = true;
    this.onComplete = onComplete || null;

    const totalSpins = 8;
    const spinQuat = new THREE.Quaternion();

    const animate = () => {
      if (!this.animating) return;

      const t = Math.min((performance.now() - this.animStart) / this.animDuration, 1);
      const ease = 1 - Math.pow(1 - t, 3);

      /* Base slerp from initial to final */
      this.mesh.quaternion.slerpQuaternions(this.initialQuat, this.finalQuat, ease);

      /* Extra spin that decelerates: fast at start, zero at end */
      const spinAmount = Math.pow(1 - t, 1.5) * totalSpins * Math.PI * 2;
      spinQuat.setFromAxisAngle(this.spinAxis, spinAmount);
      this.mesh.quaternion.multiply(spinQuat);

      this.renderer.render(this.scene, this.camera);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        this.animating = false;
        this.mesh.quaternion.copy(this.finalQuat);
        this.renderer.render(this.scene, this.camera);
        if (this.onComplete) this.onComplete();
      }
    };

    requestAnimationFrame(animate);
  }

  dispose() {
    this.animating = false;
    this.geometry.dispose();
    this.materials.forEach(m => { m.map?.dispose(); m.dispose(); });
    this.renderer.dispose();
  }
}
