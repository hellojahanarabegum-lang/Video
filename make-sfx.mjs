import fs from 'fs';
const SR = 44100;
const rnd = (() => { let s = 12345; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296 * 2 - 1; })();

const lp = (x, a) => { let y = 0; return x.map((v) => (y += a * (v - y))); };
const hp = (x, a) => { const l = lp(x, a); return x.map((v, i) => v - l[i]); };
const reverb = (x, mix = 0.12) => {
  const out = x.slice();
  [[0.023, 0.5], [0.041, 0.35], [0.067, 0.22]].forEach(([d, g]) => {
    const n = Math.floor(d * SR);
    for (let i = n; i < out.length; i++) out[i] += x[i - n] * g * mix * 3;
  });
  return out;
};
const norm = (x, peak) => { const m = Math.max(...x.map(Math.abs)) || 1; return x.map((v) => (v / m) * peak); };
const env = (n, a, dcy) => Array.from({length: n}, (_, i) => {
  const t = i / SR; const att = Math.min(1, t / a); return att * Math.exp(-t / dcy);
});
const write = (name, x) => {
  const fade = Math.floor(0.012 * SR);
  for (let i = 0; i < fade; i++) x[x.length - 1 - i] *= i / fade;
  const buf = Buffer.alloc(44 + x.length * 2);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + x.length * 2, 4); buf.write('WAVEfmt ', 8);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(x.length * 2, 40);
  x.forEach((v, i) => buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(v * 32767))), 44 + i * 2));
  fs.writeFileSync(`public/sfx/${name}.wav`, buf);
  console.log(name, (x.length / SR).toFixed(2) + 's');
};

// pop
{
  const n = Math.floor(0.22 * SR); const e = env(n, 0.004, 0.05); let ph = 0;
  const x = Array.from({length: n}, (_, i) => { const t = i / SR; const f = 180 + 520 * Math.exp(-t / 0.03); ph += 2 * Math.PI * f / SR; return Math.sin(ph) * e[i]; });
  write('pop', norm(reverb(lp(x, 0.5)), 0.8));
}
// click
{
  const n = Math.floor(0.12 * SR); const e = env(n, 0.001, 0.014);
  const noise = Array.from({length: n}, () => rnd());
  const x = hp(noise, 0.25).map((v, i) => v * e[i]);
  write('click', norm(reverb(lp(x, 0.6)), 0.8));
}
// whoosh
{
  const n = Math.floor(0.6 * SR); const noise = Array.from({length: n}, () => rnd());
  let y1 = 0, y2 = 0;
  const x = noise.map((v, i) => {
    const t = i / n; const fc = 0.02 + 0.18 * Math.sin(Math.PI * t * 0.9 + 0.2);
    y1 += fc * (v - y1); y2 += fc * (y1 - y2);
    const w = Math.sin(Math.PI * t) ** 2;
    return (y1 - y2) * w;
  });
  write('whoosh', norm(reverb(x), 0.8));
}
// chime
{
  const n = Math.floor(0.55 * SR); const e = env(n, 0.005, 0.16);
  const x = Array.from({length: n}, (_, i) => { const t = i / SR; return (Math.sin(2 * Math.PI * 880 * t) + 0.35 * Math.sin(2 * Math.PI * 1318.5 * t) + 0.15 * Math.sin(2 * Math.PI * 1760 * t)) * e[i]; });
  write('chime', norm(reverb(lp(x, 0.5), 0.18), 0.8));
}
// thud
{
  const n = Math.floor(0.4 * SR); const e = env(n, 0.006, 0.09); let ph = 0;
  const x = Array.from({length: n}, (_, i) => { const t = i / SR; const f = 55 + 70 * Math.exp(-t / 0.05); ph += 2 * Math.PI * f / SR; return Math.sin(ph) * e[i]; });
  write('thud', norm(reverb(lp(x, 0.2), 0.1), 0.75));
}
// tick
{
  const n = Math.floor(0.09 * SR); const e = env(n, 0.001, 0.02);
  const x = Array.from({length: n}, (_, i) => Math.sin(2 * Math.PI * 1500 * i / SR) * e[i]);
  write('tick', norm(lp(x, 0.5), 0.7));
}
