import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, ease} from '../theme';
import {Shell} from '../components/Shell';
import {Words} from '../components/Words';

// এসেছেন জয় করার জন্য: ছোট ও জোরালো সমাপ্তি
export const S8Win: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const ring = interpolate(f, [0, 22], [0, 1], {easing: ease.out, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Shell dur={dur}>
      <div style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{position: 'absolute', top: '50%', left: '50%', width: 420, height: 420, marginLeft: -210, marginTop: -210, borderRadius: '50%', border: `6px solid ${C.off}`, opacity: (1 - ring) * 0.5, transform: `scale(${0.4 + ring * 1.1})`}} />
        <Words text="এসেছেন" size={72} weight={500} color={C.off} stagger={3} />
        <Words text="জয়" size={230} stagger={3} delay={3} hero={[0]} />
        <Words text="করার জন্য" size={104} stagger={3} delay={6} />
      </div>
    </Shell>
  );
};
