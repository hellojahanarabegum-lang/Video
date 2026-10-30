import {Easing, spring} from 'remotion';

export const W = 1080;
export const H = 1920;
export const FPS = 30;
export const DURATION = Math.round(39.3 * FPS); // 1179

export const C = {
  navy: '#0F2348',
  mint: '#63D89A',
  off: '#F4F6FA',
  white: '#FFFFFF',
  wall: '#B9B6C8',
};

export const FONT = "'Hind Siliguri', sans-serif";

export const ease = {
  out: Easing.bezier(0.16, 1, 0.3, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  in: Easing.bezier(0.7, 0, 0.84, 0),
};

export const SPRING = {
  pop: {damping: 14, stiffness: 160, mass: 0.7},
  soft: {damping: 20, stiffness: 120, mass: 0.9},
};

export const sp = (frame: number, fps: number, delay = 0, cfg = SPRING.soft) =>
  spring({frame: frame - delay, fps, config: cfg});

// গ্রাফিক উইন্ডো (frame@30fps) — PLAN.md থেকে
export const WINDOWS: [number, number][] = [
  [6, 60], [72, 180], [210, 300], [312, 420],
  [546, 630], [756, 840], [846, 990], [1077, 1110],
];

// সেফ জোন: মুখ ওপরে (~১৫-৩৭%), গ্রাফিক নিচের অংশে
export const SAFE = {top: 900, bottom: 1480};
