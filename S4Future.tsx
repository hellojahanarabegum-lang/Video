import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, ease, SPRING, sp} from '../theme';
import {Shell, glass} from '../components/Shell';
import {Words} from '../components/Words';

// নিজের ভবিষ্যৎ নিজেই নষ্ট: Statement Card + ক্ষয়ে যাওয়া বার
export const S4Future: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cardP = sp(f, fps, 0, SPRING.soft);
  const drain = interpolate(f, [34, 80], [1, 0.07], {easing: ease.inOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const hit = f >= 62 ? Math.max(0, 1 - (f - 62) / 10) : 0;
  const shake = Math.sin(f * 2.4) * 10 * hit;
  return (
    <Shell dur={dur}>
      <div style={{...glass, width: '100%', padding: '48px 54px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34, opacity: cardP, transform: `translateY(${(1 - cardP) * 70}px) scale(${0.95 + 0.05 * cardP})`}}>
        <Words text="নিজের ভবিষ্যৎ" size={112} delay={6} stagger={6} />
        <div style={{width: '100%', height: 30, borderRadius: 15, background: 'rgba(255,255,255,0.16)', overflow: 'hidden'}}>
          <div style={{width: `${drain * 100}%`, height: '100%', background: C.mint, borderRadius: 15}} />
        </div>
        <div style={{transform: `translateX(${shake}px)`}}>
          <Words text="নিজেই নষ্ট" size={112} delay={56} stagger={6} />
        </div>
      </div>
    </Shell>
  );
};
