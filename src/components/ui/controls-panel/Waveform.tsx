'use client';
import { AssistantTranscriptMessage, useVoice } from '@humeai/voice-react';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import { expressionColors } from 'expression-colors';
import { getTopNProsody } from '../../../utils/getTopNProsody';

type Expression = keyof typeof expressionColors;

type WaveformProps = {
  message: AssistantTranscriptMessage | null;
};
const Waveform: FC<WaveformProps> = (props) => {
  const { message } = props;
  const { fft } = useVoice();

  const top3Expressions = useMemo(() => {
    return getTopNProsody(message?.models.prosody?.scores || {}, 3).map(
      ({ name }) => {
        return `rgba(${expressionColors[name as Expression].rgba.join(', ')})`;
      },
    );
  }, [message]);

  return (
    <div
      className="pointer-events-none hidden opacity-90 lg:block"
    >
      <motion.svg
        className={"justify-center bottom-0"}
        viewBox={"0 0 100 200"}
        width={"100%"}
      >
        {Array.from({ length: 24 }).map((_, index) => {
          const value = (fft[index] ?? 0) / 4;
          const height = Math.min(Math.max(value * 80, 2), 70);
          // const yOffset = 50 - height * 0.5;
          const yOffset = 100 - height;

          return (
            <motion.rect
              className="transition-colors"
              key={index}
              fill={top3Expressions[0] ?? "white"}
              height={height}
              width={2}
              x={2 + (index * 100 - 4) / 24}
              y={yOffset}
            />
          );
        })}
      </motion.svg>
    </div>
  );
};

export default Waveform;
