'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  MotionValue,
  PanInfo,
} from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons';
import { SiGithub } from 'react-icons/si';

export interface GalleryProject {
  title: string;
  tagline: string;
  category: string;
  year: string;
  image: string;
  images?: string[];
  browserUrl?: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  technologies: string[];
  accentColor?: string;
  liveUrl: string;
  githubUrl: string;
}

interface CustomCircularGalleryProps {
  projects: GalleryProject[];
  bend?: number;
  className?: string;
}

interface GalleryCardItemProps {
  item: { project: GalleryProject; originalIndex: number };
  index: number;
  total: number;
  smoothPosition: MotionValue<number>;
  bend: number;
  onSelect: (project: GalleryProject) => void;
}

function GalleryCardItem({
  item,
  index,
  total,
  smoothPosition,
  bend,
  onSelect,
}: GalleryCardItemProps) {
  // Derive 3D cylindrical transform values with GPU-accelerated motion values
  const transform = useTransform(smoothPosition, (pos) => {
    let offset = index - pos;
    while (offset > total / 2) offset -= total;
    while (offset < -total / 2) offset += total;

    // Cull distant cards outside viewport
    if (Math.abs(offset) > 3.6) {
      return 'translateX(-9999px) scale(0)';
    }

    const spacing = 280;
    const x = offset * spacing;
    const bendFactor = bend * 0.35;

    const rotateY = -offset * (13 * bendFactor);
    const rotateZ = -offset * (1.8 * bendFactor);
    const translateZ = -Math.pow(Math.abs(offset), 1.45) * (70 * bendFactor);
    const translateY = Math.pow(Math.abs(offset), 1.55) * (18 * bendFactor);
    const scale = Math.max(0.72, 1 - Math.abs(offset) * 0.08);

    return `translateX(${x}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
  });

  const opacity = useTransform(smoothPosition, (pos) => {
    let offset = index - pos;
    while (offset > total / 2) offset -= total;
    while (offset < -total / 2) offset += total;
    if (Math.abs(offset) > 3.6) return 0;
    return Math.max(0.18, 1 - Math.abs(offset) * 0.26);
  });

  const zIndex = useTransform(smoothPosition, (pos) => {
    let offset = index - pos;
    while (offset > total / 2) offset -= total;
    while (offset < -total / 2) offset += total;
    return Math.round(100 - Math.abs(offset) * 10);
  });

  return (
    <motion.div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.project);
      }}
      className="absolute flex flex-col items-center pointer-events-auto transition-shadow duration-300 group cursor-pointer"
      style={{
        transform,
        opacity,
        zIndex,
        width: 'clamp(230px, 24vw, 290px)',
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
    >
      {/* 3D Glassmorphic Card Shell (Uniform styling - no selected center ring) */}
      <div className="relative w-full aspect-[0.76] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-white/15 group-hover:border-orange-500/60 transition-all duration-300 bg-neutral-900/90 shadow-[0_20px_45px_rgba(0,0,0,0.85)] group-hover:shadow-[0_20px_50px_rgba(249,115,22,0.25)]">
        <Image
          src={item.project.image}
          alt={item.project.title}
          fill
          sizes="(max-width: 768px) 240px, 300px"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Ambient Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-black/60 backdrop-blur-md text-orange-400 border border-white/10 shadow-xs truncate max-w-[150px]">
            {item.project.category}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-white/60 bg-black/50 backdrop-blur-md border border-white/5">
            {item.project.year}
          </span>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center backdrop-blur-[2px] z-20">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-montserrat font-semibold bg-orange-500 text-white shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-250">
            <span>View Project</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} size="1.1em" />
          </span>
        </div>
      </div>

      {/* Title Label Below Card */}
      <div className="mt-4 flex flex-col items-center text-center px-2">
        <h4 className="font-montserrat font-bold text-base sm:text-lg tracking-tight text-white/80 group-hover:text-white transition-colors duration-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          {item.project.title}
        </h4>
        <span className="text-[11px] font-montserrat text-white/50 tracking-wide font-medium mt-0.5">
          {item.project.tagline}
        </span>
      </div>
    </motion.div>
  );
}

export default function CustomCircularGallery({
  projects,
  bend = 3,
  className = '',
}: CustomCircularGalleryProps) {
  // Repeat projects so we always have at least 8 items for a continuous 360-degree cylinder
  const items = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    if (projects.length >= 8) {
      return projects.map((p, idx) => ({ project: p, originalIndex: idx }));
    }
    const repeatCount = Math.ceil(8 / projects.length);
    const repeated: Array<{ project: GalleryProject; originalIndex: number }> = [];
    for (let r = 0; r < repeatCount; r++) {
      projects.forEach((p, idx) => {
        repeated.push({ project: p, originalIndex: idx });
      });
    }
    return repeated;
  }, [projects]);

  const total = items.length;

  const containerRef = useRef<HTMLDivElement>(null);

  const stageRef = useRef<HTMLDivElement>(null);

  // Motion values with physics-based spring smoothing
  const rawPosition = useMotionValue(0);
  const smoothPosition = useSpring(rawPosition, {
    stiffness: 120,
    damping: 24,
    mass: 0.5,
  });

  // Selected project for modal dialog
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Derived list of preview screenshots
  const projectImages = useMemo(() => {
    if (!selectedProject) return [];
    if (selectedProject.images && selectedProject.images.length > 0) {
      return selectedProject.images;
    }
    return [selectedProject.image];
  }, [selectedProject]);


  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const isScrollingRef = useRef(false);
  const dragStartPosRef = useRef(0);

  // Intercept wheel scrolling over the card area:
  // Prevents the page view from scrolling down and smoothly rotates cards instead
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let wheelTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleWheelNative = (e: WheelEvent) => {
      // Prevent browser default so view does NOT scroll down while cursor is over cards
      e.preventDefault();
      e.stopPropagation();

      isScrollingRef.current = true;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      rawPosition.set(rawPosition.get() + delta * 0.0028);

      if (wheelTimeout) clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        rawPosition.set(Math.round(rawPosition.get()));
        isScrollingRef.current = false;
      }, 120);
    };

    stage.addEventListener('wheel', handleWheelNative, { passive: false });
    return () => {
      stage.removeEventListener('wheel', handleWheelNative);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [rawPosition]);

  // Framer Motion Pan gesture handlers
  const handlePanStart = () => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartPosRef.current = rawPosition.get();
  };

  const handlePan = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.y) > Math.abs(info.offset.x) * 1.25) {
      return;
    }
    if (Math.abs(info.offset.x) > 6) {
      hasDraggedRef.current = true;
    }
    const newPos = dragStartPosRef.current - info.offset.x / 280;
    rawPosition.set(newPos);
  };

  const handlePanEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDraggingRef.current = false;
    if (Math.abs(info.offset.y) > Math.abs(info.offset.x) * 1.25 && !hasDraggedRef.current) {
      return;
    }
    const flick = -info.velocity.x * 0.0006;
    const target = Math.round(rawPosition.get() + flick);
    rawPosition.set(target);

    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 80);
  };

  // Handle card click to open project modal
  const handleCardClick = (project: GalleryProject) => {
    if (!hasDraggedRef.current && !isScrollingRef.current) {
      setSelectedProject(project);
      setActiveImageIndex(0);
    }
  };

  // Nav Actions
  const goToNext = () => {
    rawPosition.set(Math.round(rawPosition.get()) + 1);
  };

  const goToPrev = () => {
    rawPosition.set(Math.round(rawPosition.get()) - 1);
  };

  // Modal ESC key, arrow keys, and body scroll lock
  useEffect(() => {
    if (selectedProject) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedProject(null);
        } else if (e.key === 'ArrowRight' && projectImages.length > 1) {
          setActiveImageIndex((prev) => (prev + 1) % projectImages.length);
        } else if (e.key === 'ArrowLeft' && projectImages.length > 1) {
          setActiveImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = origOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedProject, projectImages.length]);

  return (
    <div
      ref={containerRef}
      className={`w-full flex flex-col items-center select-none ${className}`}
    >
      {/* 3D Cylindrical Stage with Framer Motion Pan */}
      <motion.div
        ref={stageRef}
        className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        style={{ perspective: '1100px' }}
      >
        {/* Soft Ambient Radial Floor Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* 3D Preserved Plane */}
        <div
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {items.map((item, index) => (
            <GalleryCardItem
              key={`${item.project.title}-${index}`}
              item={item}
              index={index}
              total={total}
              smoothPosition={smoothPosition}
              bend={bend}
              onSelect={handleCardClick}
            />
          ))}
        </div>

        {/* Floating Navigation Controls */}
        <motion.button
          type="button"
          onClick={goToPrev}
          aria-label="Previous project"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(249, 115, 22, 0.9)' }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-black/60 text-white/90 border border-white/15 backdrop-blur-md flex items-center justify-center transition-colors duration-200 shadow-xl"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size="1.2em" />
        </motion.button>

        <motion.button
          type="button"
          onClick={goToNext}
          aria-label="Next project"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(249, 115, 22, 0.9)' }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-black/60 text-white/90 border border-white/15 backdrop-blur-md flex items-center justify-center transition-colors duration-200 shadow-xl"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size="1.2em" />
        </motion.button>
      </motion.div>

      {/* Project Information Modal Dialog - Mounted directly to document.body via Portal */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-4 md:p-6 pointer-events-auto">
                {/* Backdrop Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  onClick={() => setSelectedProject(null)}
                  className="fixed inset-0 bg-black/85 backdrop-blur-md z-0"
                />

                {/* Modal Dialog Window */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 16 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative z-10 w-full max-w-3xl max-h-[88vh] flex flex-col rounded-3xl bg-white border border-neutral-200/90 shadow-[0_30px_90px_rgba(0,0,0,0.5),0_0_30px_rgba(234,88,12,0.1)] overflow-hidden text-neutral-900"
                >
                  {/* Fixed Header Bar */}
                  <div className="shrink-0 px-6 py-4 sm:px-8 sm:py-4.5 border-b border-neutral-100 bg-neutral-50/70 flex items-center justify-between z-20">
                    <div className="flex items-center gap-2.5 text-xs font-mono">
                      <span className="font-semibold text-neutral-700">
                        {selectedProject.category}
                      </span>
                      <span className="text-neutral-300">•</span>
                      <span className="text-neutral-500 font-medium">
                        {selectedProject.year}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      aria-label="Close modal"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 active:scale-95 text-neutral-500 hover:text-neutral-900 transition-all border border-neutral-200 shadow-xs flex items-center justify-center cursor-pointer"
                    >
                      <HugeiconsIcon icon={Cancel01Icon} size="1.2em" />
                    </button>
                  </div>

                  {/* Scrollable Modal Body */}
                  <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6 bg-white">
                    {/* Project Title & Tagline */}
                    <div>
                      <h3 className="font-montserrat font-bold text-2xl sm:text-3xl text-neutral-900">
                        {selectedProject.title}
                      </h3>
                      <p className="font-montserrat text-sm sm:text-base text-orange-600 font-medium mt-1">
                        {selectedProject.tagline}
                      </p>
                    </div>

                    {/* Multi-Image Screenshot Preview with Browser Chrome */}
                    <div className="w-full flex flex-col gap-3">
                      <div className="w-full rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-xl relative">
                        {/* Chrome Browser Navigation Bar */}
                        <div className="px-4 py-2.5 bg-neutral-100 border-b border-neutral-200 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                          </div>
                          <div className="px-4 py-0.5 rounded-md bg-white border border-neutral-200 text-[11px] font-mono text-neutral-600 truncate max-w-[200px] sm:max-w-none shadow-xs">
                            {selectedProject.browserUrl || 'preview.dev'}
                          </div>
                          <div className="flex items-center gap-2">
                            {projectImages.length > 1 && (
                              <span className="px-2.5 py-0.5 rounded-md bg-neutral-200/80 text-[10px] font-mono font-semibold text-orange-600">
                                {activeImageIndex + 1} / {projectImages.length}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Screenshot Image Frame */}
                        <div className="relative w-full aspect-[16/9] max-h-[340px] bg-neutral-900 overflow-hidden group">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeImageIndex}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="relative w-full h-full"
                            >
                              <Image
                                src={projectImages[activeImageIndex] || selectedProject.image}
                                alt={`${selectedProject.title} preview ${activeImageIndex + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 850px"
                                className="object-cover object-top"
                                priority
                              />
                            </motion.div>
                          </AnimatePresence>

                          {/* Navigation Arrows for Multiple Images */}
                          {projectImages.length > 1 && (
                            <>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
                                }}
                                aria-label="Previous screenshot"
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-orange-600 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all shadow-xl active:scale-90 cursor-pointer"
                              >
                                <HugeiconsIcon icon={ArrowLeft01Icon} size="1.1em" />
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveImageIndex((prev) => (prev + 1) % projectImages.length);
                                }}
                                aria-label="Next screenshot"
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-orange-600 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all shadow-xl active:scale-90 cursor-pointer"
                              >
                                <HugeiconsIcon icon={ArrowRight01Icon} size="1.1em" />
                              </button>

                              {/* Floating Dots Indicator */}
                              <div className="absolute bottom-3 inset-x-0 flex items-center justify-center z-20 pointer-events-auto">
                                <div className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 flex items-center gap-1.5 shadow-lg">
                                  {projectImages.map((_, idx) => (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImageIndex(idx);
                                      }}
                                      aria-label={`Jump to screenshot ${idx + 1}`}
                                      className={`transition-all duration-200 rounded-full cursor-pointer ${
                                        activeImageIndex === idx
                                          ? 'w-5 h-1.5 bg-orange-500 shadow-[0_0_8px_#f97316]'
                                          : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Clickable Thumbnail Strip for multiple images */}
                      {projectImages.length > 1 && (
                        <div className="flex items-center gap-2.5 overflow-x-auto py-1">
                          {projectImages.map((img, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setActiveImageIndex(idx)}
                              className={`relative w-20 sm:w-24 aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                                activeImageIndex === idx
                                  ? 'border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.4)] scale-[1.03]'
                                  : 'border-neutral-200 opacity-60 hover:opacity-100 hover:border-neutral-400'
                              }`}
                            >
                              <Image src={img} alt="" fill className="object-cover object-top" sizes="120px" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Project Description */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-orange-600 font-bold mb-2">
                        Project Overview
                      </h4>
                      <p className="font-montserrat text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold mb-3">
                          Technologies & Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 text-xs font-mono rounded-lg bg-neutral-100 border border-neutral-200/80 text-neutral-800 font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Fixed Footer Bar */}
                  <div className="shrink-0 px-6 py-4 sm:px-8 border-t border-neutral-100 bg-neutral-50/70 flex flex-wrap sm:flex-nowrap items-center gap-3 z-20">
                    {selectedProject.liveUrl && (
                      <motion.a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-montserrat font-semibold text-sm shadow-md transition-all cursor-pointer"
                      >
                        <span>Live Preview</span>
                        <HugeiconsIcon icon={ArrowUpRight01Icon} size="1.2em" />
                      </motion.a>
                    )}

                    {selectedProject.githubUrl && (
                      <motion.a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-orange-600 text-white font-montserrat font-semibold text-sm shadow-md transition-all cursor-pointer"
                      >
                        <SiGithub className="text-base" />
                        <span>Source Code</span>
                      </motion.a>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 font-montserrat font-semibold text-sm transition-all cursor-pointer active:scale-95"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
