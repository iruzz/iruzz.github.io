'use client';

import React, { useEffect, useRef } from 'react';

interface AmbientBackdropProps {
  className?: string;
  showGrid?: boolean;
  interactive?: boolean;
}

export default function AmbientBackdrop({
  className = '',
  showGrid = true,
  interactive = true,
}: AmbientBackdropProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!interactive) return;

    const container = containerRef.current;
    const spotlight = spotlightRef.current;
    if (!container || !spotlight) return;

    let targetX = 0;
    let targetY = 0;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right
      ) {
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
        if (!isVisible) {
          isVisible = true;
          spotlight.style.opacity = '1';
        }

        if (rafRef.current === null) {
          rafRef.current = requestAnimationFrame(() => {
            spotlight.style.transform = `translate3d(${targetX - 350}px, ${targetY - 350}px, 0)`;
            rafRef.current = null;
          });
        }
      } else if (isVisible) {
        isVisible = false;
        spotlight.style.opacity = '0';
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      spotlight.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`sticky top-0 h-screen w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{ backgroundColor: '#0d0c10' }}
      aria-hidden="true"
    >
      {/* ─── LAYER 1: Deep Obsidian / Warm Charcoal Base ───────────────── */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% 10%, #1c0e09 0%, #120f17 45%, #0d0c10 100%)',
        }}
      />

      {/* ─── LAYER 2: Ultra-Fast Native CSS Radial Glows (No blur filter) ─ */}
      {/* Top Header Warm Radiance */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            'radial-gradient(ellipse 70% 35% at 50% 0%, rgba(217, 90, 0, 0.20) 0%, rgba(154, 52, 18, 0.08) 45%, transparent 75%)',
        }}
      />

      {/* Left-Flank Warm Ember (Behind Profile Card) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            'radial-gradient(ellipse 45% 45% at 15% 35%, rgba(154, 52, 18, 0.16) 0%, rgba(42, 15, 10, 0.06) 50%, transparent 75%)',
        }}
      />

      {/* Right-Flank Amber Glow (Behind Bio) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            'radial-gradient(ellipse 40% 40% at 85% 40%, rgba(202, 64, 0, 0.12) 0%, transparent 70%)',
        }}
      />

      {/* Mid/Lower Ambient Warmth (Behind Skills & Showcase) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 80%, rgba(180, 60, 10, 0.12) 0%, transparent 75%)',
        }}
      />

      {/* ─── LAYER 3: Architectural Dot Matrix (Linear / Vercel style) ── */}
      {showGrid && (
        <div
          className="absolute inset-0 w-full h-full opacity-35"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            backgroundPosition: 'center top',
            maskImage:
              'radial-gradient(ellipse 85% 75% at 50% 40%, black 35%, transparent 90%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 85% 75% at 50% 40%, black 35%, transparent 90%)',
          }}
        />
      )}

      {/* ─── LAYER 4: Zero-Lag Hardware-Accelerated Cursor Spotlight ───── */}
      {interactive && (
        <div
          ref={spotlightRef}
          className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none opacity-0 transition-opacity duration-300 will-change-transform"
          style={{
            background:
              'radial-gradient(circle at center, rgba(249, 115, 22, 0.08) 0%, rgba(154, 52, 18, 0.02) 40%, transparent 70%)',
          }}
        />
      )}

      {/* ─── LAYER 5: Seamless Top & Bottom Vignettes ─────────────────── */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(13, 12, 16, 0.9) 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-36 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(13, 12, 16, 0.95) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
