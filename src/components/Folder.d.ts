import React from 'react';

export interface FolderItem {
  title?: string;
  description?: string;
  content?: React.ReactNode;
  image?: string;
  key?: string | number;
  [key: string]: unknown;
}

export interface FolderProps {
  items?: (FolderItem | React.ReactNode)[];
  label?: string;
  mode?: 'flap' | 'book';
  variant?: 'solid' | 'translucent' | 'glass';
  color?: string;
  paperColor?: string;
  tabPosition?: 'left' | 'center' | 'right';
  layout?: 'spread' | 'stack' | 'row';
  size?: number;
  cardScale?: number;
  openOn?: 'click' | 'hover';
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onItemClick?: (item: unknown, index: number) => void;
  onItemDrop?: (item: unknown, index: number) => void;
  draggable?: boolean;
  zoomOnClick?: boolean;
  peek?: boolean;
  intro?: boolean;
  tilt?: number | boolean;
  bounce?: number;
  speed?: number;
  frost?: number;
  closeOnOutsideClick?: boolean;
  theme?: 'dark' | 'light';
  className?: string;
  style?: React.CSSProperties;
}

declare const Folder: React.FC<FolderProps>;
export default Folder;
