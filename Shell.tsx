import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, SAFE, ease} from '../theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const Shell: React.FC<{dur: number; children: React.ReactNode}> = ({dur, children}) => {
  const f = useCurrentFrame();
  const ex = interpolate(f, [dur - 8, dur], [0, 1], {easing: ease.in, ...clamp});
  const en = interpolate(f, [0, 14], [0, 1], {easing: ease.out, ...clamp});
  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <div
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 1180,
          background: `linear-gradient(to bottom, rgba(15,35,72,0) 0%, rgba(15,35,72,0.78) 45%, rgba(15,35,72,0.92) 100%)`,
          opacity: en * (1 - ex),
        }}
      />
      <div
        style={{
          position: 'absolute', left: 60, right: 60, top: SAFE.top, height: SAFE.bottom - SAFE.top,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          opacity: 1 - ex, transform: `translateY(${ex * 40}px)`,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

export const glass: React.CSSProperties = {
  background: 'rgba(15,35,72,0.72)',
  border: '2px solid rgba(255,255,255,0.18)',
  borderRadius: 44,
  boxShadow: '0 24px 60px rgba(5,12,30,0.45)',
  backdropFilter: 'blur(14px)',
};

export const useFloat = (f: number, amp = 6, period = 90) => Math.sin((f / period) * Math.PI * 2) * amp;
