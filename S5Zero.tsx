import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, ease, SPRING, sp} from '../theme';
import {Shell} from '../components/Shell';
import {Words} from '../components/Words';

// উন্নতি শূন্যের কোঠায়: নিচে নামা লাইন (কোনো বানানো সংখ্যা নেই)
export const S5Zero: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const draw = interpolate(f, [4, 44], [0, 1], {easing: ease.inOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const dotP = sp(f, fps, 44, SPRING.pop);
  const pulse = 1 + Math.sin((f / 20) * Math.PI * 2) * 0.12;
  const base = interpolate(f, [0, 12], [0, 0.35], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Shell dur={dur}>
      <svg width="960" height="330" viewBox="0 0 960 330" fill="none">
        <line x1="10" y1="300" x2="950" y2="300" stroke={C.off} strokeOpacity={base} strokeWidth="5" strokeLinecap="round" />
        <path d="M20 40 C 200 48, 300 120, 430 140 S 650 230, 770 268 L 930 300" stroke={C.off} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
        <circle cx="930" cy="300" r={26 * dotP * pulse} fill={C.mint} />
      </svg>
      <div style={{marginTop: 26}}>
        <Words text="উন্নতি শূন্যের কোঠায়" size={98} delay={30} stagger={6} />
      </div>
    </Shell>
  );
};
