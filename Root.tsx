import {Composition} from 'remotion';
import {Main} from './Main';
import {W, H, FPS, DURATION} from './theme';

export const Root: React.FC = () => (
  <Composition id="Main" component={Main} width={W} height={H} fps={FPS} durationInFrames={DURATION} />
);
