import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, ease, SPRING, sp} from '../theme';
import {Shell} from '../components/Shell';
import {Words} from '../components/Words';

// ইচ্ছা মরে যাবে: জ্বলন্ত বিন্দু ধীরে নিভে যায়
export const S6Spark: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const inP = sp(f, fps, 0, SPRING.pop);
  const fade = interpolate(f, [34, 72], [1, 0.12], {easing: ease.inOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const glow = fade * (0.9 + Math.sin(f / 4) * 0.08);
  const sparks = [0, 1, 2, 3, 4, 5].map((i) => {
    const a = (i / 6) * Math.PI * 2 + 0.4;
    const t = interpolate(f, [8 + i * 2, 50 + i * 2], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return {x: 180 + Math.cos(a) * (60 + 80 * t), y: 180 + Math.sin(a) * (60 + 80 * t), o: Math.sin(t * Math.PI) * 0.8 * fade};
  });
  return (
    <Shell dur={dur}>
      <svg width="300" height="300" viewBox="0 0 360 360" style={{marginBottom: 6}}>
        <defs><filter id="blur"><feGaussianBlur stdDeviation="22" /></filter></defs>
        <circle cx="180" cy="180" r={110 * inP} fill={C.mint} opacity={glow * 0.55} filter="url(#blur)" />
        <circle cx="180" cy="180" r="84" fill="none" stroke={C.off} strokeOpacity={0.35} strokeWidth="5" />
        <circle cx="180" cy="180" r={50 * inP} fill={C.mint} opacity={0.15 + 0.85 * fade} />
        {sparks.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r="6" fill={C.off} opacity={s.o} />)}
      </svg>
      <Words text="নতুন কিছু করার ইচ্ছা" size={66} weight={500} color={C.off} delay={6} stagger={4} />
      <Words text="মরে যাবে" size={132} delay={40} stagger={7} />
    </Shell>
  );
};
