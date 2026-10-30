import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';

export const Sfx: React.FC<{name: string; at: number; volume?: number}> = ({name, at, volume = 0.28}) => (
  <Sequence from={Math.max(0, at)} durationInFrames={40} layout="none">
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);
