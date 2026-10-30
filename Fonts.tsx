import {staticFile, delayRender, continueRender} from 'remotion';
import {useEffect, useState} from 'react';

const faces = [500, 600, 700];
export const useFonts = () => {
  const [handle] = useState(() => delayRender('fonts'));
  useEffect(() => {
    Promise.all(
      faces.map((w) =>
        new FontFace('Hind Siliguri', `url(${staticFile(`fonts/hind-siliguri-bengali-${w}-normal.woff2`)})`, {
          weight: String(w),
          unicodeRange: 'U+0951-0952,U+0964-0965,U+0980-09FE,U+1CD0,U+1CD2,U+1CD5-1CD6,U+1CD8,U+1CE1,U+1CEA,U+1CED,U+1CF2,U+1CF5-1CF7,U+200C-200D,U+20B9,U+25CC',
        }).load().then((f) => (document.fonts as unknown as {add: (f: FontFace) => void}).add(f)),
      ),
    ).then(() => continueRender(handle)).catch(() => continueRender(handle));
  }, [handle]);
};
