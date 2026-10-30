import React, {useEffect, useState} from 'react';
import {AbsoluteFill, OffthreadVideo, Sequence, continueRender, delayRender, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT, WINDOWS, ease} from './theme';
import {useFonts} from './components/Fonts';
import {Sfx} from './components/Sfx';
import {S1Hook} from './scenes/S1Hook';
import {S2Cards} from './scenes/S2Cards';
import {S3Cage} from './scenes/S3Cage';
import {S4Future} from './scenes/S4Future';
import {S5Zero} from './scenes/S5Zero';
import {S6Spark} from './scenes/S6Spark';
import {S7Break} from './scenes/S7Break';
import {S8Win} from './scenes/S8Win';

// public/video.mp4 আছে কিনা — না থাকলে প্লেসহোল্ডার ব্যাকগ্রাউন্ড
const useVideoExists = () => {
  const [state, setState] = useState<boolean | null>(null);
  const [handle] = useState(() => delayRender('video-check'));
  useEffect(() => {
    fetch(staticFile('video.mp4'), {method: 'HEAD'})
      .then((r) => setState(r.ok && (r.headers.get('content-type') || '').includes('video')))
      .catch(() => setState(false))
      .finally(() => continueRender(handle));
  }, [handle]);
  return state;
};

const clampO = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Placeholder: React.FC = () => (
  <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 30%, #CFCDDB 0%, ${C.wall} 55%, #8F8CA6 100%)`}}>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920">
      <ellipse cx="540" cy="500" rx="150" ry="190" fill="#5E5A78" opacity="0.55" />
      <path d="M140 1000 Q160 760 400 720 L680 720 Q920 760 940 1000 Z" fill="#2A2A3A" opacity="0.7" />
    </svg>
    <div style={{position: 'absolute', top: 70, width: '100%', textAlign: 'center', fontFamily: FONT, fontSize: 36, color: C.navy, opacity: 0.6, fontWeight: 600}}>
      প্লেসহোল্ডার — public/video.mp4 রাখুন
    </div>
  </AbsoluteFill>
);

const VideoLayer: React.FC<{has: boolean}> = ({has}) => {
  const f = useCurrentFrame();
  // ধীর পুশ-ইন (মুখ ~৫০%x, ~২৬%y) + প্রতি গ্রাফিকের শুরুতে ছোট পালস; সর্বোচ্চ ~১০৬.৫%
  const drift = interpolate(f, [0, 1179], [0, 0.04], {easing: ease.inOut, ...clampO});
  const pulse = Math.max(...WINDOWS.map(([s]) => interpolate(f, [s, s + 10, s + 40], [0, 0.025, 0], {easing: ease.out, ...clampO})));
  const scale = 1 + drift + pulse;
  return (
    <AbsoluteFill style={{transform: `scale(${scale})`, transformOrigin: '50% 26%'}}>
      {has ? <OffthreadVideo src={staticFile('video.mp4')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : <Placeholder />}
    </AbsoluteFill>
  );
};

const Fx: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <AbsoluteFill style={{background: C.navy, opacity: 0.05}} />
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(5,12,30,0.38) 100%)'}} />
    <svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.07, mixBlendMode: 'overlay'}}>
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /></filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </AbsoluteFill>
);

export const Main: React.FC = () => {
  useFonts();
  const has = useVideoExists();
  const scenes = [S1Hook, S2Cards, S3Cage, S4Future, S5Zero, S6Spark, S7Break, S8Win];
  return (
    <AbsoluteFill style={{background: C.wall}}>
      <VideoLayer has={!!has} />
      {scenes.map((Sc, i) => {
        const [s, e] = WINDOWS[i];
        return (
          <Sequence key={i} from={s} durationInFrames={e - s}>
            <Sc dur={e - s} />
          </Sequence>
        );
      })}
      <Fx />
      {/* SFX — ভিজ্যুয়াল ল্যান্ডের ২-৩ ফ্রেম আগে */}
      <Sfx name="whoosh" at={WINDOWS[0][0] - 2} />
      <Sfx name="pop" at={WINDOWS[1][0] - 2} />
      <Sfx name="click" at={WINDOWS[2][0] + 18} volume={0.24} />
      <Sfx name="thud" at={WINDOWS[3][0] + 54} volume={0.22} />
      <Sfx name="tick" at={WINDOWS[4][0] + 42} volume={0.2} />
      <Sfx name="thud" at={WINDOWS[6][0] + 44} volume={0.24} />
      <Sfx name="whoosh" at={WINDOWS[6][0] + 48} volume={0.22} />
      <Sfx name="chime" at={WINDOWS[7][0] - 2} volume={0.26} />
    </AbsoluteFill>
  );
};
