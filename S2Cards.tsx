import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, SPRING, sp} from '../theme';
import {Shell, glass} from '../components/Shell';

const Icon: React.FC<{color: string; p: number}> = ({color, p}) => (
  <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
    <circle cx="42" cy="42" r="34" stroke={color} strokeWidth="7" opacity={0.95} />
    <line x1="18" y1="66" x2="66" y2="18" stroke={color} strokeWidth="7" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
  </svg>
);

// ঝামেলা নেই / কষ্ট নেই / রিস্ক নেই — cue-র সময়ে সমান ব্যবধান (৩০ ফ্রেম)
export const S2Cards: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const items = ['ঝামেলা নেই', 'কষ্ট নেই', 'রিস্ক নেই'];
  return (
    <Shell dur={dur}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 28, width: '100%'}}>
        {items.map((t, i) => {
          const d = i * 30;
          const p = sp(f, fps, d, SPRING.pop);
          const o = interpolate(f - d, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const draw = interpolate(f - d, [8, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const last = i === 2;
          const breathe = Math.sin((f / 80 + i) * Math.PI * 2) * 4;
          return (
            <div
              key={i}
              style={{
                ...glass, height: 150, display: 'flex', alignItems: 'center', gap: 36, padding: '0 44px',
                border: last ? `4px solid ${C.mint}` : glass.border,
                opacity: o, transform: `translateX(${(1 - p) * -120}px) translateY(${breathe}px) scale(${0.94 + 0.06 * p})`,
              }}
            >
              <Icon color={last ? C.mint : C.off} p={draw} />
              <span style={{fontSize: 88, fontWeight: 700, lineHeight: 1.35, letterSpacing: 0, color: C.white}}>{t}</span>
            </div>
          );
        })}
      </div>
    </Shell>
  );
};
