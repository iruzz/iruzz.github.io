import React from 'react';

export interface HalftoneRevealProps {
  src?: string;
  fit?: 'cover' | 'contain';
  mode?: 'mono' | 'duotone' | 'color';
  shape?: 'dot' | 'ellipse' | 'square' | 'diamond' | 'line' | 'cross';
  cellSize?: number;
  angle?: number;
  dotScale?: number;
  inkColor?: string;
  accentColor?: string;
  paperColor?: string;
  contrast?: number;
  brightness?: number;
  invert?: boolean;
  roughness?: number;
  misregistration?: number;
  revealRadius?: number;
  softness?: number;
  linger?: number;
  reverse?: boolean;
  wander?: boolean;
  clickBurst?: boolean;
  intro?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare const HalftoneReveal: React.FC<HalftoneRevealProps>;
export default HalftoneReveal;
