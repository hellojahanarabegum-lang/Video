import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, SPRING, sp} from '../theme';

type Props = {
  text: string; size: number; weight?: number; color?: string;
  delay?: number; stagger?: number; gap?: number; justify?: 'center' | 'flex-start';
  hero?: number[]; heroColor?: string;
};

// শব্দ-বিভাজন শুধু স্পেসে (বাংলা যুক্তাক্ষর অক্ষত থাকে)
export const Words: React.FC<Props> = ({text, size, weight = 700, color = C.white, delay = 0, stagger = 5, gap = 22, justify = 'center', hero = [], heroColor = C.mint}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: justify, gap: `${Math.round(size * 0.08)}px ${gap}px`}}>
      {text.split(' ').map((w, i) => {
        const p = sp(f, fps, delay + i * stagger, SPRING.pop);
        const o = interpolate(f - delay - i * stagger, [0, 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <span
            key={i}
            style={{
              display: 'inline-block', fontSize: size, fontWeight: weight, lineHeight: 1.35, letterSpacing: 0,
              color: hero.includes(i) ? heroColor : color,
              opacity: o, transform: `translateY(${(1 - p) * 46}px) scale(${0.88 + 0.12 * p})`,
              textShadow: '0 4px 24px rgba(5,12,30,0.35)',
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
