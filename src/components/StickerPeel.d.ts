import React from 'react';

export interface StickerPeelProps {
  imageSrc: string | { src: string; [key: string]: unknown };
  width?: number;
  rotate?: number;
  peelDirection?: number;
  peelBackHoverPct?: number;
  peelBackActivePct?: number;
  curlRadius?: number;
  finish?: 'gloss' | 'matte' | 'holo';
  backColor?: string;
  lightingIntensity?: number;
  shadowIntensity?: number;
  followPointer?: boolean;
  draggable?: boolean;
  swing?: number;
  friction?: number;
  bounce?: number;
  intro?: boolean;
  initialPosition?: 'center' | { x: number; y: number };
  onDragStart?: () => void;
  onDragEnd?: () => void;
  dpr?: number;
  className?: string;
  style?: React.CSSProperties;
}

declare const StickerPeel: React.FC<StickerPeelProps>;
export default StickerPeel;
