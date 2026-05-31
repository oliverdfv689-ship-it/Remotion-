import React from 'react';
import {Composition} from 'remotion';
import {CodexOverlay} from './components/CodexOverlay';

export const FPS = 30;
export const WIDTH = 3840;
export const HEIGHT = 2880;
export const DURATION_IN_FRAMES = 263 * FPS;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CodexOverlay4x3"
        component={CodexOverlay}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
        calculateMetadata={async () => ({
          defaultCodec: 'prores',
          defaultVideoImageFormat: 'png',
          defaultPixelFormat: 'yuva444p10le',
          defaultProResProfile: '4444',
        })}
      />
      <Composition
        id="CodexOverlay4x3Silent"
        component={CodexOverlay}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{includeAudio: false}}
        calculateMetadata={async () => ({
          defaultCodec: 'prores',
          defaultVideoImageFormat: 'png',
          defaultPixelFormat: 'yuva444p10le',
          defaultProResProfile: '4444',
        })}
      />
    </>
  );
};
