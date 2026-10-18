import React from 'react';

export interface LogoItem {
  node?: React.ReactNode;
  src?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  href?: string;
  hoverColor?: string;
  ariaLabel?: string;
}

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutWidth?: number;
  scaleOnHover?: boolean;
  layout?: 'line' | 'wave' | 'arc' | 'orbit';
  bend?: number;
  focus?: number;
  magnify?: number;
  tiltX?: number;
  tiltY?: number;
  step?: boolean;
  labels?: 'hover' | 'inline' | 'below' | 'none';
  muted?: number;
  gray?: number;
  dim?: number;
  copies?: number;
  ariaLabel?: string;
  renderItem?: (item: LogoItem, key: string) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

declare const LogoLoop: React.FC<LogoLoopProps>;
export { LogoLoop };
export default LogoLoop;
