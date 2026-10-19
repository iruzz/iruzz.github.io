import React from 'react';

export interface DockMenuItem {
  label: string;
  onClick?: () => void;
  separator?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  checked?: boolean;
  items?: DockMenuItem[];
}

export interface DockItem {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
  badge?: number | boolean;
  active?: boolean;
  className?: string;
  menu?: DockMenuItem[];
}

export interface DockProps {
  items?: DockItem[];
  position?: 'bottom' | 'top' | 'left' | 'right';
  theme?: 'dark' | 'light';
  baseItemSize?: number;
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  gap?: number;
  roundness?: number;
  spring?: { mass?: number; stiffness?: number; damping?: number };
  bounce?: boolean;
  autoHide?: boolean;
  tiles?: boolean;
  showLabels?: boolean;
  showIndicators?: boolean;
  showBadges?: boolean;
  badgeColor?: string;
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

declare const Dock: React.FC<DockProps>;
export default Dock;

