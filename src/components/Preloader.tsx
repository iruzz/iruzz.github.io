'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

// Curated architectural & high-fashion default images from Preloader5DOT
const DEFAULT_IMAGES = [
  'loader/load1.jpeg',
  'loader/load2.jpeg',
  'loader/load3.jpeg',
  'loader/load4.jpeg',
  'loader/load5.jpeg',
];

// Luxury Parisian ease curve from Preloader5DOT
const LUXURY_EASE = [0.85, 0, 0.15, 1] as const;

// Shutter column delays (Center column index 2 opens first, then 1 & 3, then 0 & 4)
const columnDelays = [0.24, 0.12, 0, 0.12, 0.24];

interface PreloaderProps {
  onComplete?: () => void;
  brandName?: string;
  images?: string[];
  duration?: number;
  cardWidth?: number;
  cardAspectRatio?: '3/4' | '4/5' | '1/1' | '16/9';
  fillColor?: string;
  textColor?: string;
  counterColor?: string;
}

export default function Preloader({
  onComplete,
  brandName = 'STUDIO // PORTOFOLIO',
  images = DEFAULT_IMAGES,
  duration = 2.4,
  cardWidth = 260,
  cardAspectRatio = '4/5',
  fillColor = '#ff3e00',
  textColor = '#ffffff',
  counterColor = '#ffffff'
}: PreloaderProps) {
  const [displayNumber, setDisplayNumber] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isElementExiting, setIsElementExiting] = useState(false);
  const [isScreenExiting, setIsScreenExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const progress = useMotionValue(0);

  const imageDeck = useMemo(() => {
    const list = images.filter(Boolean);
    return list.length > 0 ? list : DEFAULT_IMAGES;
  }, [images]);

  // Preload images into memory
  useEffect(() => {
    if (typeof window !== 'undefined') {
      imageDeck.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [imageDeck]);

  // Fast image reel cycle (150ms interval)
  useEffect(() => {
    if (isElementExiting || !isVisible) return;
    const interval = setInterval(() => {
      setActiveImageIndex(prev => (prev + 1) % imageDeck.length);
    }, 150);
    return () => clearInterval(interval);
  }, [isElementExiting, isVisible, imageDeck.length]);

  // Sync display counter with smooth motion value
  useEffect(() => {
    const unsubscribe = progress.on('change', latest => {
      setDisplayNumber(Math.min(100, Math.floor(latest)));
    });
    return () => unsubscribe();
  }, [progress]);

  // Master animation timeline: Counter 0 -> 100 with LUXURY_EASE
  useEffect(() => {
    progress.set(0);
    const controls = animate(progress, 100, {
      duration,
      ease: LUXURY_EASE,
      onComplete: () => {
        // Phase 1: Hold briefly at 100%, then slide out header & card
        const exitTimer = setTimeout(() => {
          setIsElementExiting(true);

          // Phase 2: Trigger 5-column shutter opening
          const screenTimer = setTimeout(() => {
            setIsScreenExiting(true);

            // Phase 3: Cleanup and unmount
            const cleanupTimer = setTimeout(() => {
              setIsVisible(false);
              onComplete?.();
            }, 1200);

            return () => clearTimeout(cleanupTimer);
          }, 450);

          return () => clearTimeout(screenTimer);
        }, 350);

        return () => clearTimeout(exitTimer);
      }
    });

    return () => controls.stop();
  }, [duration, progress, onComplete]);

  const aspectRatioClass = useMemo(() => {
    switch (cardAspectRatio) {
      case '3/4':
        return 'aspect-[3/4]';
      case '1/1':
        return 'aspect-square';
      case '16/9':
        return 'aspect-[16/9]';
      case '4/5':
      default:
        return 'aspect-[4/5]';
    }
  }, [cardAspectRatio]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden select-none pointer-events-none font-mono"
      aria-hidden="true"
    >
      {/* 5 Shutter Columns inspired by Framer LoadScreen */}
      <div className="absolute inset-0 grid grid-cols-5 pointer-events-auto">
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            className="relative h-full w-full border-white/[0.12] last:border-r"
            style={{ backgroundColor: fillColor }}
            initial={{ y: '0%' }}
            animate={
              isScreenExiting
                ? {
                    y: '-100%',
                    transition: {
                      duration: 0.95,
                      delay: columnDelays[i],
                      ease: [1, 0, 0.56, 1]
                    }
                  }
                : { y: '0%' }
            }
          />
        ))}
      </div>

      {/* Center Reel Frame & Editorial Header (Preloader5DOT style) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 pointer-events-none">
        <div
          style={{ width: `min(${cardWidth}px, 80vw)` }}
          className="flex flex-col relative"
        >
          {/* Header Bar: Brand Name (Left) + Counter (Right) */}
          <div className="w-full flex items-baseline justify-between pb-2.5 overflow-hidden text-[11px] uppercase tracking-wider select-none">
            {/* Brand Title */}
            <motion.div
              initial={{ y: '120%', opacity: 0 }}
              animate={
                isElementExiting
                  ? {
                      y: '-120%',
                      opacity: 0,
                      transition: { duration: 0.38, ease: LUXURY_EASE }
                    }
                  : {
                      y: '0%',
                      opacity: 1,
                      transition: {
                        duration: 0.85,
                        ease: LUXURY_EASE,
                        delay: 0.04
                      }
                    }
              }
              className="font-semibold tracking-[0.14em]"
              style={{ color: textColor }}
            >
              {brandName}
            </motion.div>

            {/* Preloader5DOT Number Counter */}
            <motion.div
              initial={{ y: '120%', opacity: 0 }}
              animate={
                isElementExiting
                  ? {
                      y: '-120%',
                      opacity: 0,
                      transition: { duration: 0.38, ease: LUXURY_EASE }
                    }
                  : {
                      y: '0%',
                      opacity: 1,
                      transition: {
                        duration: 0.85,
                        ease: LUXURY_EASE,
                        delay: 0.08
                      }
                    }
              }
              className="font-semibold tracking-[0.08em] tabular-nums"
              style={{ color: counterColor }}
            >
              {displayNumber}
            </motion.div>
          </div>

          {/* Media Card (Rapid cycling images with clip-path entrance & exit) */}
          <motion.div
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={
              isElementExiting
                ? {
                    clipPath: 'inset(0% 0% 100% 0%)',
                    transition: { duration: 0.42, ease: LUXURY_EASE }
                  }
                : {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    transition: {
                      duration: 0.85,
                      ease: LUXURY_EASE,
                      delay: 0.1
                    }
                  }
            }
            className={`w-full ${aspectRatioClass} overflow-hidden relative bg-zinc-900 shadow-[0_0_40px_rgba(0,0,0,0.85)]`}
          >
            <div className="w-full h-full relative">
              {imageDeck.map((src, idx) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={idx}
                  src={src}
                  alt={`Reel frame ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    display: idx === activeImageIndex ? 'block' : 'none'
                  }}
                  loading="eager"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
