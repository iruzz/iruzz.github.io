import React from 'react';

export interface SpecularButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  idleIntensity?: number;
  speed?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  glow?: number;
  autoAnimate?: boolean;
  followMouse?: boolean;
  proximity?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

declare const SpecularButton: React.FC<SpecularButtonProps>;

export default SpecularButton;
