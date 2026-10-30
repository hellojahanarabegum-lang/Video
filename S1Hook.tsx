import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, ease} from '../theme';
import {Shell} from '../components/Shell';
import {Words} from '../components/Words';

// হুক: Kinetic Typography + হাইলাইট সুইপ
export const S1Hook: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const sweep = interpolate(f, [14, 30], [0, 1], {easing: ease.out, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const t2 = interpolate(f, [14, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Shell dur={dur}>
      <Words text="কমফোর্ট জোন" size={150} stagger={5} />
      <div style={{position: 'relative', marginTop: 28, padding: '4px 40px'}}>
        <div style={{position: 'absolute', inset: 0, background: C.mint, borderRadius: 24, transformOrigin: 'left center', transform: `scaleX(${sweep})`}} />
        <span style={{position: 'relative', fontSize: 100, fontWeight: 700, lineHeight: 1.35, letterSpacing: 0, color: C.navy, opacity: t2}}>আরামের জায়গা</span>
      </div>
    </Shell>
  );
};
