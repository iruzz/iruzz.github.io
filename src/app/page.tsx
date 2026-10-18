'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import GradientASCII from "@/components/GradientASCII";
import Preloader from "@/components/Preloader";
import HalftoneReveal from "@/components/HalftoneReveal";
import TextPressure from '@/components/TextPressure';
import ProfileCard from "@/components/ProfileCard";
import ScrambledText from "@/components/ScrambledText";
import Grainient from "@/components/Grainient";
import Dock from '@/components/Dock';
import LogoLoop from '@/components/LogoLoop';
import Folder from '@/components/Folder';
import CustomCircularGallery from '@/components/CustomCircularGallery';
import BorderGlow from '@/components/BorderGlow';
import {
  SiTailwindcss,
  SiJavascript,
  SiPhp,
  SiLaravel,
  SiPython,
  SiGit,
  SiDocker,
  SiMysql,
} from 'react-icons/si';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AiSparklesIcon,
  ArrowUpRight01Icon,
  Award01Icon,
  Briefcase02Icon,
  Calendar03Icon,
  CodeFolderIcon,
  CodeIcon,
  Database01Icon,
  Delete02Icon,
  Github01Icon,
  Home01Icon,
  InstagramIcon,
  Layers01Icon,
  Linkedin01Icon,
  Mail01Icon,
  Mortarboard02Icon,
  MusicNote03Icon,
  PaintBoardIcon,
  Presentation01Icon,
  Settings01Icon,
  SmartPhone01Icon,
  UserCircle02Icon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type HugeIconType = React.ComponentProps<typeof HugeiconsIcon>['icon'];
const glyph = (icon: HugeIconType) => <HugeiconsIcon icon={icon} size="1.25em" strokeWidth={2} />;

const techLogos = [
  { node: <SiTailwindcss className="text-[#38bdf8]" />, title: 'Tailwind CSS', href: 'https://tailwindcss.com', hoverColor: '#38bdf8' },
  { node: <SiJavascript className="text-[#f7df1e]" />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', hoverColor: '#f7df1e' },
  { node: <SiPhp className="text-[#777bb4]" />, title: 'PHP', href: 'https://www.php.net', hoverColor: '#777bb4' },
  { node: <SiLaravel className="text-[#ff2d20]" />, title: 'Laravel', href: 'https://laravel.com', hoverColor: '#ff2d20' },
  { node: <SiPython className="text-[#3776ab]" />, title: 'Python', href: 'https://www.python.org', hoverColor: '#3776ab' },
  { node: <SiGit className="text-[#f05032]" />, title: 'Git', href: 'https://git-scm.com', hoverColor: '#f05032' },
  { node: <SiDocker className="text-[#2496ed]" />, title: 'Docker', href: 'https://www.docker.com', hoverColor: '#2496ed' },
  { node: <SiMysql className="text-[#4479a1]" />, title: 'MySQL', href: 'https://www.mysql.com', hoverColor: '#4479a1' },
];

const skillCategories = [
  {
    number: '1',
    title: 'Web Development',
    badgeClass:
      'bg-white text-neutral-950 border-white shadow-[0_0_16px_-3px_rgba(255,255,255,0.35)]',
    pillHover: 'hover:border-emerald-500/40 hover:text-emerald-300 hover:bg-emerald-500/10',
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'PHP',
      'Laravel',
      'Tailwind CSS',
      'REST API',
    ],
  },
  {
    number: '2',
    title: 'Mobile & Software Development',
    badgeClass:
      'bg-white text-neutral-950 border-white shadow-[0_0_16px_-3px_rgba(255,255,255,0.35)]',
    pillHover: 'hover:border-cyan-500/40 hover:text-cyan-300 hover:bg-cyan-500/10',
    skills: ['Flutter', 'Dart', 'Python'],
  },
  {
    number: '3',
    title: 'Database & Cloud',
    badgeClass:
      'bg-white text-neutral-950 border-white shadow-[0_0_16px_-3px_rgba(255,255,255,0.35)]',
    pillHover: 'hover:border-purple-500/40 hover:text-purple-300 hover:bg-purple-500/10',
    skills: ['MySQL', 'Supabase'],
  },
  {
    number: '4',
    title: 'Development & DevOps Tools',
    badgeClass:
      'bg-white text-neutral-950 border-white shadow-[0_0_16px_-3px_rgba(255,255,255,0.35)]',
    pillHover: 'hover:border-amber-500/40 hover:text-amber-300 hover:bg-amber-500/10',
    skills: [
      'Linux',
      'Git',
      'GitHub',
      'Docker',
      'Visual Studio Code',
      'Android Studio',
      'Postman',
      'Antigravity',
    ],
  },
];

const services = [
  {
    number: '01',
    title: 'Fullstack Web Development',
    badge: 'WEB APPS • ARCHITECTURE',
    icon: CodeIcon,
    description:
      'Designing & building scalable, reactive web applications with clean component architecture, server-side rendering, and responsive UI across all screens.',
    tags: ['Next.js', 'React', 'Laravel', 'TypeScript', 'Tailwind CSS'],
  },
  {
    number: '02',
    title: 'Creative Frontend & UI/UX',
    badge: 'MOTION • INTERACTION',
    icon: PaintBoardIcon,
    description:
      'Crafting distinctive digital identities with fluid micro-interactions, GSAP timeline choreographies, glassmorphic aesthetics, and seamless responsive layouts.',
    tags: ['GSAP Motion', 'Figma', 'Tailwind CSS', 'WebGL', 'UI/UX Design'],
  },
  {
    number: '03',
    title: 'Backend Systems & Cloud APIs',
    badge: 'API • CLOUD • DEVOPS',
    icon: Database01Icon,
    description:
      'Engineering high-throughput RESTful services, resilient database schemas, automated containerized workflows with Docker, and robust backend pipelines.',
    tags: ['PHP', 'Laravel', 'Docker', 'MySQL', 'Nginx', 'REST APIs'],
  },
  {
    number: '04',
    title: 'Mobile Apps & AI Integration',
    badge: 'MOBILE • INTELLIGENCE',
    icon: SmartPhone01Icon,
    description:
      'Developing cross-platform mobile apps with Flutter, coupled with modern AI model integrations (Gemini API, OpenAI) for automated intelligent workflows.',
    tags: ['Flutter', 'Dart', 'Gemini API', 'Python', 'Firebase'],
  },
];

const featuredProjects = [
  {
    title: 'Pantai Ngliyep Ticketing',
    tagline: 'Landing page destinasi wisata dengan formulir booking online. Dibangun dengan PHP native tanpa framework.',
    category: 'Native Web',
    year: '2024',
    image: '/projects/ngliyep1.png',
    images: ['/projects/ngliyep1.png', '/projects/ngliyep22.png'],
    browserUrl: 'ngliyep-ticket.id',
    description:
      'Landing page destinasi wisata pesisir Pantai Ngliyep dilengkapi formulir pemesanan tiket online, kalkulasi biaya otomatis, kalender reservasi, dan integrasi pemesanan wisata. Dibangun secara efisien menggunakan PHP native, CSS modern, dan MySQL.',
    metrics: [
      { label: 'Online Bookings', value: '1.2K+' },
      { label: 'Page Load', value: '< 0.6s' },
      { label: 'Satisfaction', value: '4.8 / 5' },
    ],
    technologies: ['PHP Native', 'MySQL', 'JavaScript', 'Tailwind CSS', 'HTML5'],
    accentColor: '#0ea5e9',
    liveUrl: 'https://github.com/iruzz/Pantai-Ngliyep',
    githubUrl: 'https://github.com/iruzz/Pantai-Ngliyep',
  },
  {
    title: 'Reservation Hotel Project',
    tagline: 'Sistem booking hotel dengan integrasi AI automate. React di frontend, Laravel 12 di backend.',
    category: 'Fullstack Web App',
    year: '2025',
    image: '/projects/hotel1.png',
    images: ['/projects/hotel1.png', '/projects/hotel2.png'],
    browserUrl: 'karyahub.id',
    description:
      'Digital talent marketplace connecting tech creatives and enterprise organizations. Features multi-tier milestone escrow workflows, real-time negotiation channels, and dynamic developer portfolios.',
    metrics: [
      { label: 'Active Users', value: '10K+' },
      { label: 'Escrow Volume', value: '$1.2M+' },
      { label: 'Avg Rating', value: '4.9 / 5.0' },
    ],
    technologies: ['Laravel 11', 'PHP 8.3', 'MySQL', 'Tailwind CSS', 'Redis', 'REST APIs'],
    accentColor: '#ea580c',
    liveUrl: 'https://reservasi-hotel-ai-automate.vercel.app/',
    githubUrl: 'https://reservasi-hotel-ai-automate.vercel.app/',
  },
  
];

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  logo: string;
  description: string;
  technologies?: string[];
  project?: {
    name: string;
    url?: string;
  };
  projects?: Array<{
    name: string;
    url?: string;
  }>;
}

const experiences: ExperienceItem[] = [
  {
    role: 'Frontend Developer',
    company: 'Interactive Web Solutions',
    period: '2023 — 2024',
    type: 'Web Application & UI',
    logo: '/logos/company2.svg',
    description:
      'Engineered interactive user interfaces, component-driven layouts, and dynamic micro-animations. Focused on performance optimization, responsive layouts across devices, and clean component structures.',
    technologies: ['JavaScript', 'Tailwind CSS', 'GSAP', 'HTML5/CSS3', 'Git', 'UI/UX'],
    project: {
      name: 'Interactive UI System',
      url: 'https://github.com/iruzcodes',
    },
  },
  {
    role: 'System Analyst Intern',
    company: 'PT Cahaya Medika Healthcare (Wings Group)',
    period: 'Jul 2026 — Present',
    type: 'Fullstack Development',
    logo: '/logos/wings.webp',
    description:
      'Worked as a System Analyst and Fullstack Developer, collaborating with a team to design and build Dokuflow, a professional web-based document management and archiving system.',
    technologies: ['Laravel', 'PHP', 'Tailwind CSS', 'JavaScript', 'MySQL', 'Docker', 'Git'],
    project: {
      name: 'Dokuflow',
      url: 'https://dokuflow.cmhgroup.id/',
    },
  },
  {
    role: 'Backend & Database Engineer',
    company: 'Web Systems & Services',
    period: '2022 — 2023',
    type: 'System Development',
    logo: '/logos/company3.svg',
    description:
      'Developed server-side logic, authentication pipelines, and database architectures using PHP and Laravel. Containerized environments using Docker and managed data queries with MySQL.',
    technologies: ['PHP', 'Laravel', 'MySQL', 'Python', 'Docker', 'REST APIs'],
    project: {
      name: 'Database & API Engine',
      url: 'https://github.com/iruzcodes',
    },
  },
];

const experienceFolderItems = experiences.map((exp, index) => {
  const projectList = exp.projects || (exp.project ? [exp.project] : []);

  return {
    title: exp.role,
    content: (
      <div className="w-full h-full p-4 sm:p-5 flex flex-col justify-between overflow-hidden text-neutral-900 select-none bg-white">
        <div>
          {/* Top Header: Company Logo, Role & Period */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-neutral-100/90 border border-neutral-200 p-2 flex items-center justify-center shadow-xs">
                <Image
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-montserrat font-bold text-sm sm:text-base text-neutral-900 leading-tight">
                  {exp.role}
                </h4>
                <p className="font-montserrat text-xs text-neutral-500 font-medium mt-0.5 truncate">
                  {exp.company}
                </p>
              </div>
            </div>
            <span className="shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
              0{index + 1}
            </span>
          </div>

          {/* Period & Type Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-orange-50 text-orange-700 border border-orange-200/80">
              <HugeiconsIcon icon={Calendar03Icon} size="1.05em" />
              {exp.period}
            </div>
            <span className="text-xs font-mono text-neutral-500 font-medium">
              {exp.type}
            </span>
          </div>

          {/* Description */}
          <p className="font-montserrat text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal">
            {exp.description}
          </p>
        </div>

        {/* Project Developed Footer */}
        <div className="mt-3 pt-2.5 border-t border-neutral-100">
          <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5 flex items-center justify-between">
            <span>Project Developed</span>
            <span className="text-[9px] text-neutral-400 lowercase font-normal flex items-center gap-1">
              <span>open link</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} size="1.05em" />
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {projectList.map((proj, projIdx) =>
              proj.url ? (
                <a
                  key={projIdx}
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-prevent-folder-drag="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (proj.url) {
                      window.open(proj.url, '_blank', 'noopener,noreferrer');
                      e.preventDefault();
                    }
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                  }}
                  className="relative z-30 cursor-pointer pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-orange-600 text-white transition-all duration-200 text-xs font-montserrat font-medium shadow-xs group/proj hover:scale-[1.02] active:scale-[0.98]"
                >
                  <HugeiconsIcon
                    icon={CodeFolderIcon}
                    size="1.1em"
                    className="text-orange-400 group-hover/proj:text-white transition-colors shrink-0 pointer-events-none"
                  />
                  <span className="truncate max-w-[200px] pointer-events-none">{proj.name}</span>
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size="1.05em"
                    className="text-neutral-400 group-hover/proj:text-white transition-transform group-hover/proj:translate-x-0.5 group-hover/proj:-translate-y-0.5 shrink-0 pointer-events-none"
                  />
                </a>
              ) : (
                <span
                  key={projIdx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200 text-xs font-montserrat font-medium"
                >
                  <HugeiconsIcon
                    icon={CodeFolderIcon}
                    size="1.1em"
                    className="text-orange-600 shrink-0"
                  />
                  <span>{proj.name}</span>
                </span>
              )
            )}
          </div>
        </div>
      </div>
    ),
  };
});

const educations = [
  {
    degree: 'Bachelor of Computer Science (Informatics)',
    institution: 'University / Institute of Technology',
    period: '2020 — 2024',
    location: 'Indonesia',
  },
  {
    degree: 'Software Engineering (RPL)',
    institution: 'Vocational High School',
    period: '2017 — 2020',
    location: 'Indonesia',
  },
];

const achievements = [
  {
    title: '1st Place — National Web Development Competition',
    issuer: 'National Tech Summit / Informatics Olympiad',
    period: '2024',
    location: 'Indonesia',
  },
  {
    title: 'Top 3 Finalist — Hackathon Innovation Challenge',
    issuer: 'Tech Fest Indonesia',
    period: '2023',
    location: 'Jakarta, Indonesia',
  },
  {
    title: 'Certified Fullstack Application Developer',
    issuer: 'Professional Certification Authority',
    period: '2023',
    location: 'Indonesia',
  },
];

const workshops = [
  {
    title: 'Fullstack Web Architecture & Scalable Microservices',
    organizer: 'Google Developer Student Clubs / Tech Community',
    period: '2024',
    location: 'Online',
  },
  {
    title: 'Containerization & Cloud Native with Docker',
    organizer: 'DevOps & Cloud Computing Series',
    period: '2023',
    location: 'Online',
  },
  {
    title: 'Modern UI/UX Design Systems & Motion Interfaces',
    organizer: 'Creative Dev Workshop Series',
    period: '2023',
    location: 'Indonesia',
  },
];

const socialLinks = [
  {
    name: 'GitHub',
    handle: '@iruzcodes',
    href: 'https://github.com/iruzcodes',
    icon: Github01Icon,
    badgeColor: 'hover:border-white/40 hover:text-white',
  },
  {
    name: 'Instagram',
    handle: '@iruzcodes',
    href: 'https://instagram.com/iruzcodes',
    icon: InstagramIcon,
    badgeColor: 'hover:border-pink-500/40 hover:text-pink-400',
  },
  {
    name: 'LinkedIn',
    handle: 'Fairuz Ar Rasyid',
    href: 'https://linkedin.com/in/fairuz-ar-rasyid',
    icon: Linkedin01Icon,
    badgeColor: 'hover:border-sky-500/40 hover:text-sky-400',
  },
  {
    name: 'WhatsApp',
    handle: 'Direct Chat',
    href: 'https://wa.me/',
    icon: WhatsappIcon,
    badgeColor: 'hover:border-emerald-500/40 hover:text-emerald-400',
  },
];

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const orangeSectionRef = useRef<HTMLElement>(null);
  const blankContentRef = useRef<HTMLDivElement>(null);
  const ctaWrapperRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);
  const [folderSize, setFolderSize] = useState(2.2);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setFolderSize(1.35);
      } else if (window.innerWidth < 1024) {
        setFolderSize(1.8);
      } else {
        setFolderSize(2.2);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // GSAP Smooth Overwrite Scroll Animation
  useGSAP(
    () => {
      if (!orangeSectionRef.current || !heroContentRef.current) return;

      // ─── 1. TOP TRANSITION: Hero -> Orange Section ─────────────────────
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: orangeSectionRef.current,
          start: 'top bottom', // when top of orange section enters the viewport bottom
          end: 'top top',    // when orange section fully covers the hero
          scrub: 1.2,        // buttery-smooth scrub momentum
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            if (heroRef.current) {
              gsap.set(heroRef.current, { autoAlpha: 1, pointerEvents: 'auto' });
            }
            if (heroContentRef.current) {
              gsap.set(heroContentRef.current, { scale: 1, y: 0, opacity: 1, filter: 'blur(0px)' });
            }
          },
        },
      });

      // Hero Content gracefully recedes, dims, blurs, and fades out
      entryTl.fromTo(
        heroContentRef.current,
        {
          scale: 1,
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
        },
        {
          scale: 0.91,
          y: -50,
          opacity: 0,
          filter: 'blur(8px)',
          ease: 'power2.out',
        },
        0
      );

      // Hero Section hides when fully covered by the upper card
      if (heroRef.current) {
        entryTl.fromTo(
          heroRef.current,
          {
            autoAlpha: 1,
            pointerEvents: 'auto',
          },
          {
            autoAlpha: 0,
            pointerEvents: 'none',
            ease: 'none',
          },
          0.85
        );
      }

      // Orange Section smooth curved top edge flattens out into seamless fullscreen
      entryTl.fromTo(
        orangeSectionRef.current,
        {
          borderTopLeftRadius: '48px',
          borderTopRightRadius: '48px',
          boxShadow: '0 -30px 90px rgba(0, 0, 0, 0.85)',
        },
        {
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
          boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
          ease: 'power1.out',
        },
        0
      );

      // About section title & content reveal with luxury subtle upward momentum
      if (blankContentRef.current) {
        entryTl.fromTo(
          blankContentRef.current,
          {
            y: 80,
            opacity: 0.3,
          },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
          },
          0.15
        );
      }

      // ─── 2. BOTTOM LAYER REVEAL: Upper Card (Services) -> Stationary Bottom CTA Section ─────
      if (ctaWrapperRef.current && ctaSectionRef.current && ctaContentRef.current && orangeSectionRef.current) {
        const exitTl = gsap.timeline({
          scrollTrigger: {
            trigger: ctaWrapperRef.current,
            start: 'top bottom', // starts exactly when Services finishes and spacer enters viewport bottom
            end: 'bottom bottom', // ends when Services has moved completely upward and out of view
            scrub: 1.2,
            invalidateOnRefresh: true,
            onEnter: () => {
              if (ctaSectionRef.current) {
                gsap.set(ctaSectionRef.current, { visibility: 'visible', pointerEvents: 'auto' });
              }
            },
            onLeaveBack: () => {
              if (ctaSectionRef.current) {
                gsap.set(ctaSectionRef.current, { visibility: 'hidden', pointerEvents: 'none' });
              }
            },
            onUpdate: (self) => {
              if (ctaSectionRef.current) {
                if (self.progress > 0) {
                  gsap.set(ctaSectionRef.current, { visibility: 'visible', pointerEvents: 'auto' });
                } else {
                  gsap.set(ctaSectionRef.current, { visibility: 'hidden', pointerEvents: 'none' });
                }
              }
            },
          },
        });

        // Upper Section bottom corners curve with deep shadow as it lifts up
        exitTl.fromTo(
          orangeSectionRef.current,
          {
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
          },
          {
            borderBottomLeftRadius: '48px',
            borderBottomRightRadius: '48px',
            boxShadow: '0 40px 100px rgba(0, 0, 0, 0.95)',
            ease: 'power1.out',
          },
          0
        );

        // CTA Content depth layering: starts slightly recessed in 3D depth, then smoothly comes to foreground
        exitTl.fromTo(
          ctaContentRef.current,
          {
            scale: 0.92,
            y: 30,
            opacity: 0.35,
            filter: 'blur(8px)',
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
          },
          0
        );
      }
    },
    { scope: mainRef }
  );

  // Recalculate ScrollTrigger measurements after preloader completes and fonts settle
  const handlePreloaderComplete = () => {
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 800);
    const t3 = setTimeout(() => ScrollTrigger.refresh(), 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const scrollToAboutSection = () => {
    orangeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSkills = () => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEducation = () => {
    document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAchievements = () => {
    document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWorkshops = () => {
    document.getElementById('workshops')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    ctaWrapperRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dock items
  const items = [
    { icon: glyph(Home01Icon), label: 'Home', onClick: scrollToTop },
    { icon: glyph(UserCircle02Icon), label: 'About', onClick: scrollToAboutSection },
    { icon: glyph(CodeIcon), label: 'Skills', onClick: scrollToSkills },
    { icon: glyph(CodeFolderIcon), label: 'Projects', onClick: scrollToProjects },
    { icon: glyph(Briefcase02Icon), label: 'Experience', onClick: scrollToExperience },
    { icon: glyph(Mortarboard02Icon), label: 'Education', onClick: scrollToEducation },
    { icon: glyph(Award01Icon), label: 'Achievements', onClick: scrollToAchievements },
    { icon: glyph(Presentation01Icon), label: 'Workshops', onClick: scrollToWorkshops },
    { icon: glyph(Layers01Icon), label: 'Services', onClick: scrollToServices },
    { icon: glyph(Mail01Icon), label: 'Contact', onClick: scrollToContact },
    { icon: glyph(MusicNote03Icon), label: 'Music', onClick: () => console.log('Music') },
    { icon: glyph(Settings01Icon), label: 'Settings', onClick: () => console.log('Settings') },
    { icon: glyph(Delete02Icon), label: 'Trash', onClick: () => console.log('Trash') },
  ];

  return (
    <main
      ref={mainRef}
      className="relative w-full bg-black text-white selection:bg-orange-500 selection:text-white"
    >
      <Preloader brandName="Iruzz" onComplete={handlePreloaderComplete} />

      {/* ======================================================== */}
      {/* SECTION 1: HERO (Pinned / Sticky viewport)              */}
      {/* ======================================================== */}
      <section
        ref={heroRef}
        id="hero"
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center z-10"
      >
        {/* Fullscreen Ambient Gradient ASCII Background */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <GradientASCII
            colors={["#2a0f0a", "#9a3412", "#f97316", "#f97316"]}
            shape="horizon"
            characters=" =+xX0S8#@"
            cellSize={18}
            density={0.8}
            glyphOpacity={0.85}
            glow={0.2}
            depthOfField={0}
            flicker={0.2}
            softness={0.5}
            scale={1}
            flow={0.5}
            speed={1}
            gradientOpacity={0.9}
            grain={0.08}
            variation={0}
            offsetY={0.20}
            mouseInteraction
            scrambleRadius={0.1}
            clickEffect="wave"
            intro
            lightMode={false}
          />
        </div>

        {/* Hero Interactive Centerpiece: TextPressure + HalftoneReveal */}
        <div
          ref={heroContentRef}
          className="relative -top-8 sm:-top-10 md:-top-12 z-10 w-full max-w-5xl px-4 py-8 flex items-center justify-center will-change-transform"
        >
          {/* 'Hello!' Text Pressure positioned behind the picture */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] z-0 pointer-events-auto">
            <TextPressure
              text="Hello!"
              flex
              alpha={false}
              stroke={false}
              width
              weight
              italic
              radius={0.5}
              smoothing={0.5}
              idle="wave"
              idleSpeed={1}
              clickRipple
              textColor="#ffffff"
              pressureColor="#ff5a1f"
              strokeColor="#ff5a1f"
              strokeWidth={3}
              minFontSize={36}
              scale={false}
            />
          </div>

          {/* Profile Picture in Front */}
          <div
            style={{ height: 'min(580px, 66vh)', position: 'relative' }}
            className="w-auto aspect-[433/577] max-w-full mx-auto relative z-10"
          >
            <HalftoneReveal
              src="/profile.png"
              mode="mono"
              shape="dot"
              cellSize={4}
              angle={45}
              inkColor="#f4f1ea"
              paperColor="#120f17"
              revealRadius={160}
              dotScale={1}
              contrast={1.1}
              brightness={0}
              invert={false}
              roughness={0}
              misregistration={0}
              fit="contain"
              accentColor="#ff4f2a"
              softness={0.6}
              linger={1.2}
              reverse={false}
              wander={false}
              clickBurst
              intro
            />
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: ABOUT ME SECTION (Orange Background)          */}
      {/* Glides up and smoothly overwrites the hero page          */}
      {/* ======================================================== */}
      <section
        ref={orangeSectionRef}
        id="about"
        className="relative z-20 w-full min-h-[140vh] bg-[#120f17] text-white flex flex-col items-center justify-start pt-24 md:pt-32 pb-28 sm:pb-36 px-6 md:px-12 will-change-transform overflow-hidden"
      >
        {/* Fullscreen Animated Grainient Background */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <Grainient
            colors={["#120f17", "#2a0f0a", "#9a3412", "#d95a00ff", "#ca4000ff"]}
            angle={55}
            flow={0.8}
            silk={0.35}
            grainAmount={0.08}
            type="linear"
            bands={1}
            softness={1}
            scale={1}
            speed={1}
            grainSize={1.2}
            grainAnimated
            contrast={1}
            saturation={1}
            variation={0}
            interactive
            stir={1}
            clickSwirl
            intro
            lightMode={false}
          />
        </div>

        {/* Center About Me Showcase Content */}
        <div
          ref={blankContentRef}
          className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center my-auto will-change-transform"
        >
          {/* Heading */}
          <h2 className="font-rubik-maps text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-wide text-white leading-[1.05] text-center mb-16 sm:mb-20 md:mb-24 lg:mb-28 select-none drop-shadow-md">
            ABOUT ME
          </h2>

          {/* Grid: ProfileCard Showcase (Left) + Editorial Bio (Right) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
            {/* Profile Card Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <ProfileCard
                  name="Fairuz"
                  title="Fullstack Developer"
                  handle="iruzcodes"
                  status="Online"
                  contactText="Contact"
                  avatarUrl="/path/to/portrait.png"
                  iconUrl="/assets/demo/iconpattern.png"
                  holo={0.8}
                  glare={0.5}
                  tiltStrength={12}
                  parallax={8}
                  radius={16}
                  enableTilt
                  intro
                  showUserInfo
                  enableMobileTilt={false}
                  theme="dark"
                  onContactClick={() => console.log('Contact clicked')}
                />
              </div>
            </div>

            {/* Editorial Bio Column */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <h3 className=" font-gabarito text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.14] drop-shadow-md">
                Holaaa!! I&apos;m Fairuz Ar Rasyid Rabbani
              </h3>
              <ScrambledText
                className="scrambled-text-demo font-montserrat mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-white/85 leading-relaxed font-normal cursor-pointer"
                effect="scramble"
                radius={100}
                strength={1}
                trail={0.6}
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
                clickBurst
                intro
              >
                {`I'm a Fullstack Developer passionate about building modern, functional, and user-focused digital experiences. I work across frontend and backend development, transforming ideas into reliable web applications through clean code, thoughtful design, and continuous learning.

I believe great software is more than just code, it's about solving real problems, creating meaningful experiences, and pushing beyond limitations.`}
              </ScrambledText>
            </div>
          </div>

          {/* Tech Stack Marquee (LogoLoop) */}
          <div className="w-full mt-14 md:mt-20 py-4 flex flex-col items-center select-none">
            <div className="relative w-full overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <LogoLoop
                logos={techLogos}
                speed={80}
                direction="left"
                logoHeight={44}
                gap={56}
                hoverSpeed={0}
                scaleOnHover
                ariaLabel="Technologies and Tools"
              />
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION: SKILLS & TOOLS                                  */}
          {/* ======================================================== */}
          <div
            id="skills"
            className="w-full max-w-4xl mt-28 md:mt-40 lg:mt-48 pt-8 flex flex-col items-center"
          >
            {/* Header Badge & Title */}
            <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-20 select-none">
              <h3 className="font-rubik-maps text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-white leading-[1.08] text-center select-none drop-shadow-md">
                SKILLS & TOOLS
              </h3>
            </div>

            {/* Categories List */}
            <div className="w-full flex flex-col divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
              {skillCategories.map((cat) => (
                <div
                  key={cat.number}
                  className="group py-7 sm:py-9 flex items-start gap-4 sm:gap-6 w-full hover:bg-white/[0.015] transition-colors rounded-xl px-2 sm:px-4"
                >
                  {/* Number Badge */}
                  <div
                    className={`shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-mono font-bold text-sm sm:text-base border transition-transform duration-300 group-hover:scale-110 mt-0.5 select-none ${cat.badgeClass}`}
                  >
                    {cat.number}
                  </div>

                  {/* Category Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-montserrat font-bold text-base sm:text-lg md:text-xl text-white mb-3.5 tracking-tight group-hover:text-white transition-colors">
                      {cat.title}
                    </h4>

                    {/* Skill Pills */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs sm:text-[13px] font-montserrat font-medium bg-white/[0.05] border border-white/10 text-neutral-300 shadow-xs transition-all duration-200 cursor-default select-none hover:scale-105 active:scale-95 ${cat.pillHover}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION: FEATURED PROJECTS                               */}
          {/* ======================================================== */}
          <div
            id="projects"
            className="w-full max-w-6xl mt-28 md:mt-40 lg:mt-48 pt-8 flex flex-col items-center"
          >
            {/* Header Badge & Title */}
            <div className="flex flex-col items-center text-center mb-6 sm:mb-10 select-none">

              <h3 className="font-rubik-maps text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-white leading-[1.08] text-center select-none drop-shadow-md">
                FEATURED PROJECTS
              </h3>
            </div>

            {/* Custom 3D Circular Arc Gallery */}
            <CustomCircularGallery
              projects={featuredProjects}
              bend={3}
            />
          </div>

          {/* ======================================================== */}
          {/* SECTION: MY EXPERIENCE                                   */}
          {/* ======================================================== */}
          <div
            id="experience"
            className="w-full mt-28 md:mt-40 lg:mt-48 pt-8 flex flex-col items-center"
          >
            {/* Header Badge & Title */}
            <div className="flex flex-col items-center text-center mb-24 sm:mb-32 md:mb-44 select-none">
              <h3 className="font-rubik-maps text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-white leading-[1.08] text-center select-none drop-shadow-md">
                MY EXPERIENCE
              </h3>
            </div>

            {/* Folder Animation Interactive Stage */}
            <div className="w-full flex flex-col items-center justify-center min-h-[540px] sm:min-h-[600px] md:min-h-[680px] pt-6 sm:pt-12 pb-6 select-none overflow-visible">
              <Folder
                label="Experience"
                items={experienceFolderItems}
                mode="flap"
                variant="solid"
                layout="spread"
                color="#ea580c"
                paperColor="#ffffff"
                tabPosition="right"
                openOn="click"
                size={folderSize}
                cardScale={1.22}
                frost={0.25}
                tilt={0.5}
                speed={1}
                bounce={0.4}
                peek
                intro
                draggable
                zoomOnClick
                theme="dark"
                className="drop-shadow-2xl"
              />

              {/* Interaction hints */}
              <p className="mt-8 text-white/50 text-xs sm:text-sm font-mono flex flex-wrap items-center justify-center gap-2 select-none">
                <span> Click folder to open</span>
                <span className="text-white/20">•</span>
                <span> Click any card to zoom</span>
                <span className="text-white/20">•</span>
                <span> Drag cards freely</span>
              </p>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION: EDUCATION                                       */}
          {/* ======================================================== */}
          <div
            id="education"
            className="w-full max-w-4xl mt-28 md:mt-40 lg:mt-48 pt-8 flex flex-col items-center"
          >
            {/* Header Title */}
            <div className="flex flex-col items-center text-center mb-10 md:mb-14 select-none">
              <h3 className="font-rubik-maps text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-white leading-[1.08] text-center select-none drop-shadow-md">
                EDUCATION
              </h3>
            </div>

            {/* Simple Minimal List */}
            <div className="w-full flex flex-col border-t border-white/15">
              {educations.map((edu, index) => (
                <div
                  key={index}
                  className="group py-6 sm:py-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-6 hover:border-orange-500/40 transition-colors"
                >
                  <div>
                    <h4 className="font-montserrat font-bold text-lg sm:text-xl md:text-2xl text-white group-hover:text-orange-400 transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="font-montserrat text-sm sm:text-base text-white/60 font-medium mt-1">
                      {edu.institution}
                      {edu.location && (
                        <>
                          <span className="text-white/30 mx-2">•</span>
                          <span className="text-white/40 text-xs sm:text-sm font-mono">{edu.location}</span>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="text-xs sm:text-sm font-mono text-white/50 group-hover:text-orange-400/90 transition-colors whitespace-nowrap">
                    {edu.period}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION: ACHIEVEMENTS                                    */}
          {/* ======================================================== */}
          <div
            id="achievements"
            className="w-full max-w-4xl mt-28 md:mt-40 lg:mt-48 pt-8 flex flex-col items-center"
          >
            {/* Header Title */}
            <div className="flex flex-col items-center text-center mb-10 md:mb-14 select-none">
              <h3 className="font-rubik-maps text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-white leading-[1.08] text-center select-none drop-shadow-md">
                ACHIEVEMENTS
              </h3>
            </div>

            {/* Simple Minimal List */}
            <div className="w-full flex flex-col border-t border-white/15">
              {achievements.map((item, index) => (
                <div
                  key={index}
                  className="group py-6 sm:py-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-6 hover:border-orange-500/40 transition-colors"
                >
                  <div>
                    <h4 className="font-montserrat font-bold text-lg sm:text-xl md:text-2xl text-white group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-montserrat text-sm sm:text-base text-white/60 font-medium mt-1">
                      {item.issuer}
                      {item.location && (
                        <>
                          <span className="text-white/30 mx-2">•</span>
                          <span className="text-white/40 text-xs sm:text-sm font-mono">{item.location}</span>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="text-xs sm:text-sm font-mono text-white/50 group-hover:text-orange-400/90 transition-colors whitespace-nowrap">
                    {item.period}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION: WORKSHOPS                                       */}
          {/* ======================================================== */}
          <div
            id="workshops"
            className="w-full max-w-4xl mt-28 md:mt-40 lg:mt-48 pt-8 flex flex-col items-center"
          >
            {/* Header Title */}
            <div className="flex flex-col items-center text-center mb-10 md:mb-14 select-none">
              <h3 className="font-rubik-maps text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-white leading-[1.08] text-center select-none drop-shadow-md">
                WORKSHOPS
              </h3>
            </div>

            {/* Simple Minimal List */}
            <div className="w-full flex flex-col border-t border-white/15">
              {workshops.map((item, index) => (
                <div
                  key={index}
                  className="group py-6 sm:py-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-6 hover:border-orange-500/40 transition-colors"
                >
                  <div>
                    <h4 className="font-montserrat font-bold text-lg sm:text-xl md:text-2xl text-white group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-montserrat text-sm sm:text-base text-white/60 font-medium mt-1">
                      {item.organizer}
                      {item.location && (
                        <>
                          <span className="text-white/30 mx-2">•</span>
                          <span className="text-white/40 text-xs sm:text-sm font-mono">{item.location}</span>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="text-xs sm:text-sm font-mono text-white/50 group-hover:text-orange-400/90 transition-colors whitespace-nowrap">
                    {item.period}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION: MY SERVICES                                     */}
          {/* ======================================================== */}
          <div
            id="services"
            className="w-full max-w-6xl mt-28 md:mt-40 lg:mt-48 pt-8 flex flex-col items-center"
          >
            {/* Header Badge & Title */}
            <div className="flex flex-col items-center text-center mb-12 sm:mb-16 select-none">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/25 mb-4 shadow-xs">
                <HugeiconsIcon icon={AiSparklesIcon} size="1.15em" />
                <span>SOLUTIONS & SPECIALIZATIONS</span>
              </div>
              <h3 className="font-rubik-maps text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-white leading-[1.08] text-center select-none drop-shadow-md">
                MY SERVICES
              </h3>
              <p className="font-montserrat text-sm sm:text-base text-white/60 font-normal mt-4 max-w-xl text-center leading-relaxed">
                Modern, reliable, and high-performance digital solutions tailored to solve complex challenges and craft memorable user experiences.
              </p>
            </div>

            {/* Services Grid with BorderGlow Cards (without picture) */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {services.map((service, index) => (
                <div key={index} className="group h-full flex flex-col">
                  <BorderGlow
                    edgeSensitivity={30}
                    glowColor="40 80 80"
                    backgroundColor="#120F17"
                    borderRadius={28}
                    glowRadius={40}
                    glowIntensity={1}
                    coneSpread={25}
                    animated={false}
                    colors={['#c084fc', '#f472b6', '#38bdf8']}
                    className="h-full w-full transition-transform duration-300 group-hover:-translate-y-1"
                  >
                    <div className="p-6 sm:p-8 flex flex-col justify-between h-full min-h-[290px]">
                      <div>
                        {/* Top Bar: Icon + Category Badge + Number */}
                        <div className="flex items-center justify-between gap-3 mb-6">
                          <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/90 group-hover:scale-105 group-hover:bg-white/[0.1] group-hover:border-white/20 transition-all duration-300 shadow-sm">
                            <HugeiconsIcon icon={service.icon} size="1.4em" />
                          </div>

                          <div className="flex items-center gap-2.5">
                            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wider bg-white/[0.05] border border-white/10 text-white/70">
                              {service.badge}
                            </span>
                            <span className="font-mono text-xs font-bold text-white/40">
                              {service.number}
                            </span>
                          </div>
                        </div>

                        {/* Service Title */}
                        <h4 className="font-montserrat font-bold text-xl sm:text-2xl text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-sky-300 transition-all duration-300">
                          {service.title}
                        </h4>

                        {/* Description */}
                        <p className="font-montserrat text-sm sm:text-[15px] text-white/65 leading-relaxed font-normal mt-3">
                          {service.description}
                        </p>
                      </div>

                      {/* Tech / Capabilities Tags */}
                      <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/[0.08]">
                        {service.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.04] border border-white/10 text-neutral-300 group-hover:border-white/20 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </BorderGlow>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom subtle indicator */}
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: BOTTOM LAYER (Fixed Stationary CTA Section)   */}
      {/* Hidden behind upper layer; revealed as Services moves up */}
      {/* ======================================================== */}
      <section
        ref={ctaSectionRef}
        id="contact"
        className="fixed inset-0 z-10 w-full h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden py-16 sm:py-24 px-6 select-none"
        style={{ visibility: 'hidden', pointerEvents: 'none' }}
      >
        {/* Fullscreen Ambient Gradient ASCII Background */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <GradientASCII
            colors={["#2a0f0a", "#9a3412", "#f97316", "#f97316"]}
            shape="horizon"
            characters=" =+xX0S8#@"
            cellSize={18}
            density={0.8}
            glyphOpacity={0.85}
            glow={0.2}
            depthOfField={0}
            flicker={0.2}
            softness={0.5}
            scale={1}
            flow={0.5}
            speed={1}
            gradientOpacity={0.9}
            grain={0.08}
            variation={0}
            offsetY={0.20}
            mouseInteraction
            scrambleRadius={0.1}
            clickEffect="wave"
            intro
            lightMode={false}
          />
        </div>

        {/* Ambient Top & Bottom Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none z-[1]" />

        {/* CTA Interactive Centerpiece */}
        <div
          ref={ctaContentRef}
          className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center will-change-transform"
        >
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/25 mb-4 sm:mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE FOR NEW OPPORTUNITIES • 2026</span>
          </div>

          {/* Strong CTA Headline */}
          <h2 className="font-rubik-maps text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-white leading-[1.08] text-center drop-shadow-md select-none max-w-4xl">
            LET&apos;S BUILD SOMETHING EXTRAORDINARY
          </h2>

          {/* Engaging Subtitle */}
          <p className="font-montserrat text-sm sm:text-base md:text-lg text-white/70 font-normal mt-4 sm:mt-5 max-w-2xl text-center leading-relaxed">
            Have a project in mind, an opportunity to collaborate, or just want to say hi? Let&apos;s turn your vision into high-impact digital reality.
          </p>

          {/* Primary Action Button */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:fairuzcodes@gmail.com"
              className="group relative inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-neutral-950 font-montserrat font-bold text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_rgba(249,115,22,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <HugeiconsIcon icon={Mail01Icon} size="1.2em" />
              <span>Start a Conversation</span>
            </a>
          </div>

          {/* Social Links Row */}
          <div className="w-full max-w-2xl mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-white/[0.08] shadow-lg ${social.badgeColor}`}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-white/80 group-hover:scale-110 group-hover:text-white transition-all duration-300 mb-2">
                  <HugeiconsIcon icon={social.icon} size="1.3em" />
                </div>
                <span className="font-montserrat font-bold text-xs sm:text-sm text-white tracking-tight">
                  {social.name}
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] text-white/50 mt-0.5">
                  {social.handle}
                </span>
              </a>
            ))}
          </div>

          {/* Footer Sub-indicator */}
          <div className="w-full mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-white/40">
            <p>© 2026 Fairuz Ar Rasyid Rabbani. All rights reserved.</p>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white/60 hover:text-orange-400 transition-colors cursor-pointer select-none"
            >
              <span>Back to Top</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </section>

      {/* Spacer that provides the 100vh scroll track to reveal the fixed bottom layer */}
      <div
        ref={ctaWrapperRef}
        className="relative z-10 w-full h-screen pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating Bottom Dock */}
      <Dock
        items={items}
        position="bottom"
        baseItemSize={64}
        magnification={92}
        panelHeight={84}
        gap={12}
      />
    </main>
  );
}
