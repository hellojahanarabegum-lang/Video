import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, ease, SPRING, sp} from '../theme';
import {Shell} from '../components/Shell';
import {Words} from '../components/Words';

const barTop = (x: number) => {
  const t = (x - 40) / 320;
  return 90 - 160 * t * (1 - t);
};

// আরামের খাঁচা: Line Draw — খাঁচার শিক নামে, ভেতরে ছোট বিন্দু
export const S3Cage: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const xs = [60, 100, 140, 180, 220, 260, 300, 340];
  const roof = interpolate(f, [0, 16], [0, 1], {easing: ease.out, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const dotP = sp(f, fps, 6, SPRING.pop);
  const bob = Math.sin((f / 40) * Math.PI * 2) * 7;
  return (
    <Shell dur={dur}>
      <svg width="440" height="330" viewBox="0 0 400 300" fill="none" style={{marginBottom: 10}}>
        <path d="M40 90 Q200 10 360 90" stroke={C.off} strokeWidth="9" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - roof} />
        {xs.map((x, i) => {
          const p = interpolate(f, [8 + i * 3, 22 + i * 3], [0, 1], {easing: ease.out, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return <line key={i} x1={x} y1={barTop(x)} x2={x} y2={250} stroke={C.off} strokeWidth="8" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />;
        })}
        <line x1="40" y1="250" x2="360" y2="250" stroke={C.off} strokeWidth="10" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - roof} />
        <circle cx="200" cy={205 + bob} r={20 * dotP} fill={C.mint} />
      </svg>
      <Words text="আরামের খাঁচা" size={124} delay={14} stagger={6} />
    </Shell>
  );
};
