import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, ease, SPRING, sp} from '../theme';
import {Shell} from '../components/Shell';
import {Words} from '../components/Words';

const SQ = 330;
const Box: React.FC = () => (
  <div style={{width: SQ, height: SQ, borderRadius: 56, background: '#1B3566', border: '3px solid rgba(255,255,255,0.22)', boxShadow: '0 24px 60px rgba(5,12,30,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <span style={{fontSize: 60, fontWeight: 700, lineHeight: 1.35, letterSpacing: 0, color: C.white, textAlign: 'center', padding: '0 24px'}}>কমফোর্ট জোন</span>
  </div>
);

// কমফোর্ট জোন ভেঙে বের হয়ে আসুন: বক্স ফাটে, দুই ভাগ হয়, তীর ওপরে ওঠে
export const S7Break: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const inP = sp(f, fps, 0, SPRING.pop);
  const crack = interpolate(f, [28, 44], [0, 1], {easing: ease.out, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const split = interpolate(f, [46, 80], [0, 1], {easing: ease.out, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const arrow = sp(f, fps, 52, SPRING.pop);
  const boxO = interpolate(f, [70, 92], [1, 0.0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const float = Math.sin((f / 60) * Math.PI * 2) * 5;
  const half = (side: -1 | 1) => (
    <div style={{position: 'absolute', inset: 0, clipPath: side < 0 ? 'inset(0 50% 0 0)' : 'inset(0 0 0 50%)', transform: `translateX(${side * split * 150}px) rotate(${side * split * 9}deg)`, opacity: boxO}}>
      <Box />
    </div>
  );
  return (
    <Shell dur={dur}>
      <div style={{position: 'relative', width: SQ, height: SQ, transform: `scale(${0.85 + 0.15 * inP}) translateY(${float}px)`, opacity: inP, marginBottom: 20}}>
        {half(-1)}
        {half(1)}
        <svg width={SQ} height={SQ} viewBox={`0 0 ${SQ} ${SQ}`} style={{position: 'absolute', inset: 0, opacity: 1 - split}} fill="none">
          <path d="M165 0 L150 70 L182 130 L152 200 L176 260 L165 330" stroke={C.white} strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - crack} />
        </svg>
        <svg width={SQ} height={SQ} viewBox="0 0 100 100" style={{position: 'absolute', inset: 0, opacity: arrow, transform: `translateY(${(1 - arrow) * 50 - split * 10}px) scale(${0.6 + 0.4 * arrow})`}} fill="none">
          <path d="M50 78 V26 M28 46 L50 24 L72 46" stroke={C.mint} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <Words text="ভেঙে বের হয়ে আসুন" size={108} delay={62} stagger={8} />
    </Shell>
  );
};
