'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import GradientASCII from "@/components/GradientASCII";
import Preloader from "@/components/Preloader";
import HalftoneReveal from "@/components/HalftoneReveal";
import TextPressure from '@/components/TextPressure';
import ProfileCard from "@/components/ProfileCard";
import ScrambledText from "@/components/ScrambledText";
import Particles from "@/components/Particles";
import Dock from '@/components/Dock';
import LogoLoop from '@/components/LogoLoop';
import Folder from '@/components/Folder';
import CustomCircularGallery from '@/components/CustomCircularGallery';
import BorderGlow from '@/components/BorderGlow';
import SpecularButton from '@/components/SpecularButton';
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
  ArrowUpRight01Icon,
  Award01Icon,
  Briefcase02Icon,
  Calendar03Icon,
  Cancel01Icon,
  CodeFolderIcon,
  CodeIcon,
  Github01Icon,
  Home01Icon,
  InstagramIcon,
  Layers01Icon,
  Linkedin01Icon,
  Mail01Icon,
  Mortarboard02Icon,
  PaintBoardIcon,
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
    skills: ['MySQL', 'Supabase', 'Vector DB'],
  },
   {
    number: '4',
    title: 'Prompt Engineering',
    badgeClass:
      'bg-white text-neutral-950 border-white shadow-[0_0_16px_-3px_rgba(255,255,255,0.35)]',
    pillHover: 'hover:border-amber-500/40 hover:text-amber-300 hover:bg-amber-500/10',
    skills: [
      'Ai Integration',
      'Python',
      'RAG Chatbot',
    ],
  },
  {
    number: '5',
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
      'Developing fullstack web applications using Laravel, building robust backend systems and responsive user interfaces tailored to business needs.',
    tags: ['Laravel', 'Mysql', 'API', 'Tailwind CSS'],
  },
  {
    number: '02',
    title: 'Creative Frontend & UI/UX',
    badge: 'MOTION • INTERACTION',
    icon: PaintBoardIcon,
    description:
      'Creating modern, responsive websites to showcase products, promote services, and establish a professional brand identity that builds credibility and engages potential customers.',
    tags: ['GSAP Motion', 'Tailwind CSS', 'React', 'Native'],
  },
  {
    number: '03',
    title: 'AI Automation & RAG Chatbot Development',
    badge: 'Automation • INTELLIGENCE',
    icon: SmartPhone01Icon,
    description:
      'Building AI-powered automation workflows and RAG-based chatbots that streamline business processes, deliver intelligent responses from custom knowledge sources, and improve operational efficiency.',
    tags: ['RAG Chatbot', 'n8n', 'API Integration', 'Python', 'VectorDB'],
  },
];

const featuredProjects = [

{
  title: 'SIKAS',
  tagline: 'A school financial management system built with Laravel to streamline tuition payments, journal entries, and financial reporting.',
  category: 'Fullstack Web App',
  year: '2026',
  image: '/projects/sikas.png',
  images: ['/projects/sikas.png', '/projects/sikas2.png', '/projects/sikas3.png', '/projects/sikas4.png'],
  browserUrl: 'SIKAS',
  description:
    'A web-based school financial management system developed with Laravel to manage student tuition payments (SPP), income and expenses, general journal entries, and financial reports. Designed to improve financial transparency, simplify administrative workflows, and ensure organized financial recordkeeping.',
  metrics: [],
  technologies: [
    'Laravel',
    'PHP',
    'MySQL',
    'Blade',
    'Tailwind CSS',
  ],
  accentColor: '#2563eb',
  liveUrl: 'https://github.com/iruzz/KeuanganSekolah.git',
  githubUrl: 'https://github.com/iruzz/KeuanganSekolah.git',
},
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
      'A web-based hotel reservation system built with React and Laravel 12, featuring an intuitive booking interface and AI-powered workflow automation to streamline reservations and improve the overall booking experience.',
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
  {
    title: 'Javaroot Company Profile',
    tagline: 'A professional company profile website for an Indonesian spice exporter, featuring an interactive AI chatbot.',
    category: 'Company Profile',
    year: '2026',
    image: '/projects/javaroot/preview.png',
    images: ['/projects/javaroot/1.jpeg', '/projects/javaroot/2.jpeg', '/projects/javaroot/3.jpeg', '/projects/javaroot/4.jpeg',],
    browserUrl: '-',
    description:
      'A corporate website designed to showcase Indonesian spice products, production capabilities, and quality standards to global buyers. Features a product catalog, business inquiry section, and AI-powered chatbot to enhance customer engagement and streamline inquiries.',
    metrics: [
      { label: 'Active Users', value: '10K+' },
      { label: 'Escrow Volume', value: '$1.2M+' },
      { label: 'Avg Rating', value: '4.9 / 5.0' },
    ],
    technologies: ['Laravel 11', 'PHP 8.3', 'MySQL', 'Tailwind CSS', 'Redis', 'REST APIs'],
    accentColor: '#ea580c',
    liveUrl: 'https://github.com/iruzz/Ekspor-Compro.git',
    githubUrl: 'https://github.com/iruzz/Ekspor-Compro.git',
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
    role: 'Freelance Web Developer',
    company: 'Freelancer',
    period: '2025 — Present',
    type: 'Web Application System',
    logo: '/logos/free.jpeg',
    description:
      'Working as a Freelance Fullstack Developer, building tailored web solutions ranging from management systems like SIKAS to modern landing pages and company profile websites. Focused on delivering functional, scalable, and user-centered digital experiences that meet each client`s needs.',
    technologies: ['Laravel', 'Tailwind CSS', 'ChatBot', 'API', 'Git', 'UI/UX'],
    project: {
      name: 'Compro Website & Chatbot CS',
      url: 'https://github.com/iruzz/Ekspor-Compro',
    },
  },
  {
    role: 'System Analyst Intern',
    company: 'PT Cahaya Medika Healthcare (Wings Group)',
    period: '2026 — Present',
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
];

function ExperienceLogo({ src, alt }: { src: string; alt: string }) {
  const [isSquare, setIsSquare] = useState<boolean>(() => {
    return /\.(jpe?g)$/i.test(src) || src.includes('free');
  });

  return (
    <div
      className={`relative shrink-0 w-8 h-8 sm:w-11 sm:h-11 flex items-center justify-center ${isSquare ? 'rounded-full overflow-hidden' : ''
        }`}
    >
      <Image
        src={src}
        alt={alt}
        width={44}
        height={44}
        onLoad={(e) => {
          const img = e.currentTarget;
          if (img.naturalWidth && img.naturalHeight) {
            const ratio = img.naturalWidth / img.naturalHeight;
            setIsSquare(ratio >= 0.85 && ratio <= 1.15);
          }
        }}
        className={`w-full h-full pointer-events-none ${isSquare ? 'object-cover rounded-full' : 'object-contain'
          }`}
      />
    </div>
  );
}

const createExperienceFolderItems = (onSelectExp: (exp: ExperienceItem) => void) =>
  experiences.map((exp, index) => {
    const projectList = exp.projects || (exp.project ? [exp.project] : []);

    return {
      title: exp.role,
      content: (
        <div className="w-full h-full p-3.5 sm:p-5 md:p-6 flex flex-col justify-between overflow-y-auto text-neutral-900 select-none bg-white">
          <div>
            {/* Top Header: Company Logo, Role & Period */}
            <div className="flex items-start justify-between gap-2.5 sm:gap-3 md:gap-3.5 mb-2 sm:mb-2.5 md:mb-3">
              <div className="flex items-center gap-2.5 sm:gap-3 md:gap-3.5 min-w-0">
                <ExperienceLogo src={exp.logo} alt={`${exp.company} logo`} />
                <div className="min-w-0">
                  <h4 className="font-montserrat font-bold text-xs sm:text-[15px] md:text-base text-neutral-900 leading-tight">
                    {exp.role}
                  </h4>
                  <p className="font-montserrat text-[10px] sm:text-xs md:text-sm text-neutral-500 font-medium mt-0.5 truncate">
                    {exp.company}
                  </p>
                </div>
              </div>
              <span className="shrink-0 text-[9px] sm:text-[10px] md:text-xs font-mono font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                0{index + 1}
              </span>
            </div>

            {/* Period & Type */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4 md:mb-5 text-[10px] sm:text-xs md:text-sm font-mono">
              <span className="inline-flex items-center gap-1 font-semibold text-neutral-600">
                <HugeiconsIcon icon={Calendar03Icon} size="1.05em" className="text-orange-600" />
                {exp.period}
              </span>
              <span className="text-neutral-300">•</span>
              <span className="text-neutral-500 font-medium">
                {exp.type}
              </span>
            </div>

            {/* Description - clearly visible and readable with proper breathing room */}
            <p className="font-montserrat text-[11px] sm:text-xs md:text-[13px] text-neutral-700 leading-snug sm:leading-relaxed md:leading-relaxed font-normal">
              {exp.description}
            </p>
          </div>

          {/* Project Developed Footer */}
          <div className="mt-2.5 pt-2 sm:mt-3.5 sm:pt-2.5 md:mt-4 md:pt-3 border-t border-neutral-100 flex flex-col gap-1.5 sm:gap-2">
            <div className="font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider text-neutral-400 font-bold flex items-center justify-between">
              <span>Project Developed</span>
              <button
                type="button"
                data-prevent-folder-drag="true"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectExp(exp);
                }}
                className="text-[9px] sm:text-[10px] md:text-xs text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-0.5 cursor-pointer hover:underline"
              >
                <span>more details</span>
                <HugeiconsIcon icon={ArrowUpRight01Icon} size="1.05em" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
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
                    className="relative z-30 cursor-pointer pointer-events-auto inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1.5 md:px-3.5 md:py-2 rounded-lg bg-neutral-900 hover:bg-orange-600 text-white transition-all duration-200 text-[9px] sm:text-xs md:text-xs font-montserrat font-medium shadow-xs group/proj hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <HugeiconsIcon
                      icon={CodeFolderIcon}
                      size="1.1em"
                      className="text-orange-400 group-hover/proj:text-white transition-colors shrink-0 pointer-events-none"
                    />
                    <span className="truncate max-w-[130px] sm:max-w-[200px] pointer-events-none">{proj.name}</span>
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size="1.05em"
                      className="text-neutral-400 group-hover/proj:text-white transition-transform group-hover/proj:translate-x-0.5 group-hover/proj:-translate-y-0.5 shrink-0 pointer-events-none"
                    />
                  </a>
                ) : (
                  <span
                    key={projIdx}
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1.5 md:px-3.5 md:py-2 rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200 text-[9px] sm:text-xs md:text-xs font-montserrat font-medium"
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
    degree: 'Software Engineering (RPL)',
    institution: 'Vocational High School',
    period: '2024 — Present',
    location: 'Indonesia',
  },
];

const achievements = [
  {
    title: '3rd Place — Student Skills Competition ( LKS ) in Web Technologies, Surabaya City Level',
    issuer: 'Student Skills Competition',
    period: '2026',
    location: 'Indonesia',
    credentialUrl: 'https://www.linkedin.com/in/fairuz-ar-rasyid-rabbani-0a47a2343/overlay/Certifications/759694144/treasury/?profileId=ACoAAFYUe_wBM-a0HP0MqAaynsDxOdzQAtMrAgA',
  },
  {
    title: 'Memulai Pemograman dengan Python',
    issuer: 'Dicoding Indonesia',
    period: '2026',
    location: 'Indonesia',
    credentialUrl: 'https://www.dicoding.com/certificates/4EXG1VG4QPRL',
  },
  {
    title: 'Belajar Dasar Pemograman Web',
    issuer: 'Dicoding Indonesia',
    period: '2024',
    location: 'Indonesia',
    credentialUrl: 'https://www.dicoding.com/certificates/N9ZOYW02YPG5',
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
    handle: '@iruzz',
    href: 'https://github.com/iruzz',
    icon: Github01Icon,
    badgeColor: 'hover:border-white/40 hover:text-white',
  },
  {
    name: 'Instagram',
    handle: '@ruzz_._',
    href: 'https://www.instagram.com/ruzz_._?rpxt=YTNoZjJoMG03eWRm',
    icon: InstagramIcon,
    badgeColor: 'hover:border-pink-500/40 hover:text-pink-400',
  },
  {
    name: 'LinkedIn',
    handle: 'Fairuz Ar Rasyid Rabbani',
    href: 'https://www.linkedin.com/in/fairuz-ar-rasyid-rabbani-0a47a2343/?isSelfProfile=true',
    icon: Linkedin01Icon,
    badgeColor: 'hover:border-sky-500/40 hover:text-sky-400',
  },
  {
    name: 'WhatsApp',
    handle: 'Direct Chat',
    href: 'https://wa.me/628531132617',
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
  const [isMobile, setIsMobile] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const updateSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (window.innerWidth < 480) {
        setFolderSize(1.38);
      } else if (window.innerWidth < 640) {
        setFolderSize(1.55);
      } else if (window.innerWidth < 1024) {
        setFolderSize(1.85);
      } else {
        setFolderSize(2.2);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Lock body scroll when experience detail modal is opened
  useEffect(() => {
    if (selectedExperience) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedExperience(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedExperience]);

  const experienceFolderItems = useMemo(
    () => createExperienceFolderItems((exp) => setSelectedExperience(exp)),
    []
  );

  // GSAP Optimized Scroll Animation with MatchMedia
  useGSAP(
    () => {
      if (!orangeSectionRef.current || !heroContentRef.current) return;

      const mm = gsap.matchMedia(mainRef);

      // ─── 1. MOBILE TIMELINE (<= 768px): ZERO blur/boxShadow lag, snappy 0.3 scrub, pure GPU transforms ───
      mm.add('(max-width: 768px)', () => {
        const entryTl = gsap.timeline({
          scrollTrigger: {
            trigger: orangeSectionRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.3,
            invalidateOnRefresh: true,
            onLeaveBack: () => {
              if (heroRef.current) gsap.set(heroRef.current, { autoAlpha: 1, pointerEvents: 'auto' });
              if (heroContentRef.current) gsap.set(heroContentRef.current, { scale: 1, y: 0, opacity: 1 });
            },
          },
        });

        entryTl.fromTo(
          heroContentRef.current,
          { scale: 1, y: 0, opacity: 1 },
          { scale: 0.94, y: -35, opacity: 0, ease: 'none' },
          0
        );

        if (heroRef.current) {
          entryTl.fromTo(
            heroRef.current,
            { autoAlpha: 1, pointerEvents: 'auto' },
            { autoAlpha: 0, pointerEvents: 'none', ease: 'none' },
            0.85
          );
        }

        if (blankContentRef.current) {
          entryTl.fromTo(
            blankContentRef.current,
            { y: 40, opacity: 0.4 },
            { y: 0, opacity: 1, ease: 'none' },
            0.15
          );
        }

        if (ctaWrapperRef.current && ctaSectionRef.current && ctaContentRef.current) {
          const exitTl = gsap.timeline({
            scrollTrigger: {
              trigger: ctaWrapperRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 0.3,
              invalidateOnRefresh: true,
              onEnter: () => {
                if (ctaSectionRef.current) gsap.set(ctaSectionRef.current, { visibility: 'visible', pointerEvents: 'auto' });
                setIsCtaVisible(true);
              },
              onLeaveBack: () => {
                if (ctaSectionRef.current) gsap.set(ctaSectionRef.current, { visibility: 'hidden', pointerEvents: 'none' });
                setIsCtaVisible(false);
              },
              onUpdate: (self) => {
                if (ctaSectionRef.current) {
                  if (self.progress > 0) {
                    gsap.set(ctaSectionRef.current, { visibility: 'visible', pointerEvents: 'auto' });
                    setIsCtaVisible(true);
                  } else {
                    gsap.set(ctaSectionRef.current, { visibility: 'hidden', pointerEvents: 'none' });
                    setIsCtaVisible(false);
                  }
                }
              },
            },
          });

          exitTl.fromTo(
            ctaContentRef.current,
            { scale: 0.95, y: 20, opacity: 0.4 },
            { scale: 1, y: 0, opacity: 1, ease: 'none' },
            0
          );
        }
      });

      // ─── 2. DESKTOP TIMELINE (> 768px): Smooth momentum scrub with depth layering ───
      mm.add('(min-width: 769px)', () => {
        const entryTl = gsap.timeline({
          scrollTrigger: {
            trigger: orangeSectionRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 1.2,
            invalidateOnRefresh: true,
            onLeaveBack: () => {
              if (heroRef.current) gsap.set(heroRef.current, { autoAlpha: 1, pointerEvents: 'auto' });
              if (heroContentRef.current) gsap.set(heroContentRef.current, { scale: 1, y: 0, opacity: 1 });
            },
          },
        });

        entryTl.fromTo(
          heroContentRef.current,
          { scale: 1, y: 0, opacity: 1 },
          { scale: 0.91, y: -50, opacity: 0, ease: 'power2.out' },
          0
        );

        if (heroRef.current) {
          entryTl.fromTo(
            heroRef.current,
            { autoAlpha: 1, pointerEvents: 'auto' },
            { autoAlpha: 0, pointerEvents: 'none', ease: 'none' },
            0.85
          );
        }

        entryTl.fromTo(
          orangeSectionRef.current,
          { borderTopLeftRadius: '48px', borderTopRightRadius: '48px' },
          { borderTopLeftRadius: '0px', borderTopRightRadius: '0px', ease: 'power1.out' },
          0
        );

        if (blankContentRef.current) {
          entryTl.fromTo(
            blankContentRef.current,
            { y: 80, opacity: 0.3 },
            { y: 0, opacity: 1, ease: 'power2.out' },
            0.15
          );
        }

        if (ctaWrapperRef.current && ctaSectionRef.current && ctaContentRef.current && orangeSectionRef.current) {
          const exitTl = gsap.timeline({
            scrollTrigger: {
              trigger: ctaWrapperRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 1.2,
              invalidateOnRefresh: true,
              onEnter: () => {
                if (ctaSectionRef.current) gsap.set(ctaSectionRef.current, { visibility: 'visible', pointerEvents: 'auto' });
                setIsCtaVisible(true);
              },
              onLeaveBack: () => {
                if (ctaSectionRef.current) gsap.set(ctaSectionRef.current, { visibility: 'hidden', pointerEvents: 'none' });
                setIsCtaVisible(false);
              },
              onUpdate: (self) => {
                if (ctaSectionRef.current) {
                  if (self.progress > 0) {
                    gsap.set(ctaSectionRef.current, { visibility: 'visible', pointerEvents: 'auto' });
                    setIsCtaVisible(true);
                  } else {
                    gsap.set(ctaSectionRef.current, { visibility: 'hidden', pointerEvents: 'none' });
                    setIsCtaVisible(false);
                  }
                }
              },
            },
          });

          exitTl.fromTo(
            orangeSectionRef.current,
            { borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' },
            { borderBottomLeftRadius: '48px', borderBottomRightRadius: '48px', ease: 'power1.out' },
            0
          );

          exitTl.fromTo(
            ctaContentRef.current,
            { scale: 0.92, y: 30, opacity: 0.35 },
            { scale: 1, y: 0, opacity: 1, ease: 'power2.out' },
            0
          );
        }
      });
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

  const scrollToWorks = () => {
    (document.getElementById('works') || document.getElementById('projects'))?.scrollIntoView({ behavior: 'smooth' });
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
    {
      icon: glyph(Home01Icon),
      label: 'Home',
      onClick: scrollToTop,
    },
    {
      icon: glyph(UserCircle02Icon),
      label: 'About Me',
      onClick: scrollToAboutSection,
      menu: [
        {
          label: 'About Me',
          icon: glyph(UserCircle02Icon),
          onClick: scrollToAboutSection,
        },
        {
          label: 'Skills & Tools',
          icon: glyph(CodeIcon),
          onClick: scrollToSkills,
        },
        {
          label: 'Education',
          icon: glyph(Mortarboard02Icon),
          onClick: scrollToEducation,
        },
        {
          label: 'Achievements',
          icon: glyph(Award01Icon),
          onClick: scrollToAchievements,
        },
        {
          label: 'My Experience',
          icon: glyph(Briefcase02Icon),
          onClick: scrollToExperience,
        },
      ],
    },
    {
      icon: glyph(CodeFolderIcon),
      label: 'Works',
      onClick: scrollToProjects,
      menu: [
        {
          label: 'Featured Projects',
          icon: glyph(CodeFolderIcon),
          onClick: scrollToProjects,
        },
        {
          label: 'My Services',
          icon: glyph(Layers01Icon),
          onClick: scrollToServices,
        },
      ],
    },
    {
      icon: glyph(Layers01Icon),
      label: 'Services',
      onClick: scrollToServices,
    },
    {
      icon: glyph(Mail01Icon),
      label: 'Contact',
      onClick: scrollToContact,
    },
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
          className="relative -top-4 sm:-top-8 md:-top-12 z-10 w-full max-w-5xl px-4 py-4 sm:py-8 flex items-center justify-center will-change-transform"
        >
          {/* 'Hello!' Text positioned behind the picture */}
          {/* Desktop: Interactive TextPressure */}
          {!isMobile && (
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[240px] md:h-[300px] z-0 pointer-events-auto">
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
                minFontSize={28}
                scale={false}
              />
            </div>
          )}

          {/* Mobile: Rubik Maps font (larger background centerpiece) */}
          <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center z-0 pointer-events-none select-none">
            <span className="font-rubik-maps text-[clamp(6rem,29vw,11.5rem)] font-normal tracking-tight text-white uppercase text-center drop-shadow-[0_4px_36px_rgba(255,90,31,0.45)] leading-none whitespace-nowrap will-change-transform">
              Hello!
            </span>
          </div>

          {/* Profile Picture in Front */}
          <div
            style={{ height: isMobile ? 'min(440px, 52vh)' : 'min(580px, 66vh)', position: 'relative' }}
            className="w-auto aspect-[433/577] max-w-[82vw] sm:max-w-full mx-auto relative z-10"
          >
            <HalftoneReveal
              src="/profile.png"
              mode="mono"
              shape="dot"
              cellSize={isMobile ? 6 : 4}
              angle={45}
              inkColor="#f4f1ea"
              paperColor="#120f17"
              revealRadius={isMobile ? 120 : 160}
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
              clickBurst={!isMobile}
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
        className="relative z-20 w-full min-h-[140vh] bg-[#120f17] text-white flex flex-col items-center justify-start pt-24 md:pt-32 pb-28 sm:pb-36 px-4 sm:px-6 md:px-12 overflow-clip"
      >
        {/* Fullscreen Animated Particles Background spanning About Me through Services */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
            <Particles
              particleColors={["#ffffff", "#ffffff", "#ffffff"]}
              particleCount={isMobile ? 35 : 180}
              particleSpread={isMobile ? 8 : 10}
              speed={0.1}
              particleBaseSize={isMobile ? 60 : 100}
              glow={isMobile ? 0.2 : 0.5}
              twinkle={isMobile ? 0.15 : 0.3}
              moveParticlesOnHover={false}
              hoverEffect={isMobile ? undefined : 'parallax'}
              sizeRandomness={1}
              shape="circle"
              depthOfField={0}
              connections={false}
              connectionDistance={110}
              particleHoverFactor={1}
              hoverRadius={140}
              drift="none"
              driftSpeed={1}
              alphaParticles={false}
              disableRotation={false}
              cameraDistance={20}
              variation={0}
              opacity={isMobile ? 0.7 : 1}
              clickBurst={!isMobile}
              intro
              lightMode={false}
              className="w-full h-full"
            />
          </div>
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
                  className="group py-6 sm:py-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6 hover:border-orange-500/40 transition-colors"
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

                  <div className="flex sm:flex-col items-start sm:items-end gap-1.5 sm:gap-2 shrink-0">
                    <span className="text-xs sm:text-sm font-mono text-white/50 group-hover:text-orange-400/90 transition-colors whitespace-nowrap">
                      {item.period}
                    </span>
                    {item.credentialUrl && (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-orange-400 hover:text-orange-300 transition-colors group/link"
                      >
                        <span>View Credential</span>
                        <HugeiconsIcon
                          icon={ArrowUpRight01Icon}
                          size="1.1em"
                          className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
                cardScale={isMobile ? 1.25 : 1.22}
                frost={0.25}
                tilt={isMobile ? 0 : 0.5}
                speed={1}
                bounce={0.4}
                peek
                intro
                draggable={!isMobile}
                zoomOnClick
                onItemClick={(_entry: unknown, index: number) => {
                  if (isMobile && experiences[index]) {
                    setSelectedExperience(experiences[index]);
                  }
                }}
                theme="dark"
                className="drop-shadow-2xl"
              />

              {/* Interaction hints */}
              <p className="mt-8 text-white/50 text-xs sm:text-sm font-mono flex flex-wrap items-center justify-center gap-2 select-none">
                <span> Click folder to open</span>
                <span className="text-white/20">•</span>
                <span> {isMobile ? 'Tap any card for full details' : 'Click any card to zoom'}</span>
                {!isMobile && (
                  <>
                    <span className="text-white/20">•</span>
                    <span> Drag cards freely</span>
                  </>
                )}
              </p>

              {/* Mobile Quick Experience Preview Badges */}

            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION: FEATURED PROJECTS (WORKS)                       */}
          {/* ======================================================== */}
          <div
            id="projects"
            data-section="works"
            className="w-full max-w-6xl mt-28 md:mt-40 lg:mt-48 pt-8 flex flex-col items-center relative"
          >
            <span id="works" className="sr-only" aria-hidden="true" />
            {/* Header Badge & Title */}
            <div className="flex flex-col items-center text-center mb-6 sm:mb-10 select-none">

              <h3 className="font-rubik-maps text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-white leading-[1.08] text-center select-none drop-shadow-md">
                FEATURED PROJECTS
              </h3>
            </div>

            {/* Custom 3D Circular Arc Gallery */}
            <CustomCircularGallery
              projects={featuredProjects}
              bend={isMobile ? 1.6 : 3}
            />
          </div>

          {/* ======================================================== */}
          {/* SECTION: WORKSHOPS                                       */}
          {/* ======================================================== */}
          {/* <div
            id="workshops"
            className="w-full max-w-4xl mt-28 md:mt-40 lg:mt-48 pt-8 flex flex-col items-center"
          > */}
          {/* Header Title */}
          {/* <div className="flex flex-col items-center text-center mb-10 md:mb-14 select-none">
              <h3 className="font-rubik-maps text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-white leading-[1.08] text-center select-none drop-shadow-md">
                WORKSHOPS
              </h3>
            </div> */}

          {/* Simple Minimal List */}
          {/* <div className="w-full flex flex-col border-t border-white/15">
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
          </div> */}

          {/* ======================================================== */}
          {/* SECTION: MY SERVICES                                     */}
          {/* ======================================================== */}
          <div
            id="services"
            className="w-full max-w-6xl mt-28 md:mt-40 lg:mt-48 pt-8 flex flex-col items-center"
          >
            {/* Header Badge & Title */}
            <div className="flex flex-col items-center text-center mb-12 sm:mb-16 select-none">
              <h3 className="font-rubik-maps text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-white leading-[1.08] text-center select-none drop-shadow-md">
                MY SERVICES
              </h3>

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

                          <div className="flex items-center gap-2.5">
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
        className="fixed inset-0 z-10 w-full h-screen bg-black text-white flex flex-col items-center justify-center overflow-y-auto sm:overflow-hidden py-12 sm:py-20 md:py-24 px-4 sm:px-6 select-none"
        style={{ visibility: 'hidden', pointerEvents: 'none' }}
      >
        {/* Fullscreen Ambient Gradient ASCII Background - Mounted conditionally to preserve GPU when offscreen */}
        {isCtaVisible && (
          <div className="absolute inset-0 z-0 pointer-events-auto">
            <GradientASCII
              colors={["#2a0f0a", "#9a3412", "#f97316", "#f97316"]}
              shape="horizon"
              characters=" =+xX0S8#@"
              cellSize={isMobile ? 24 : 18}
              density={isMobile ? 0.6 : 0.8}
              glyphOpacity={0.85}
              glow={0.2}
              depthOfField={0}
              flicker={0.2}
              softness={0.5}
              scale={1}
              flow={0.5}
              speed={isMobile ? 0.6 : 1}
              gradientOpacity={0.9}
              grain={0.08}
              variation={0}
              offsetY={0.20}
              mouseInteraction={!isMobile}
              scrambleRadius={0.1}
              clickEffect={isMobile ? "none" : "wave"}
              intro
              lightMode={false}
            />
          </div>
        )}

        {/* Ambient Top & Bottom Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none z-[1]" />

        {/* CTA Interactive Centerpiece */}
        <div
          ref={ctaContentRef}
          className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center will-change-transform my-auto"
        >
          {/* Strong CTA Headline */}
          <h2 className="font-rubik-maps text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-normal tracking-wide text-white leading-[1.12] sm:leading-[1.08] text-center drop-shadow-md select-none max-w-4xl">
            LET&apos;S BUILD SOMETHING EXTRAORDINARY
          </h2>

          {/* Engaging Subtitle */}
          <p className="font-montserrat text-xs sm:text-sm md:text-base text-white/70 font-normal mt-3 sm:mt-5 max-w-2xl text-center leading-relaxed">
            Have a project in mind, an opportunity to collaborate, or just want to say hi? Let&apos;s turn your vision into high-impact digital reality.
          </p>

          {/* Primary Action Button */}
          <div className="mt-5 sm:mt-8 flex flex-wrap items-center justify-center gap-4">
            <SpecularButton
              size={isMobile ? "md" : "lg"}
              radius={18}
              tint="#ffffff"
              tintOpacity={0.04}
              textColor="#f5f5f5"
              lineColor="#ffffff"
              baseColor="#525252"
              intensity={1}
              idleIntensity={0.35}
              shineSize={10}
              shineFade={34}
              thickness={1.2}
              glow={1}
              followMouse={!isMobile}
              proximity={250}
              onClick={() => {
                window.location.href = 'mailto:fairuzcodes@gmail.com';
              }}
            >
              <HugeiconsIcon icon={Mail01Icon} size="1.2em" />
              <span>Get Started</span>
            </SpecularButton>
          </div>

          {/* Social Links Row */}
          <div className="w-full max-w-2xl mt-6 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-white/[0.08] shadow-lg ${social.badgeColor}`}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-white/80 group-hover:scale-110 group-hover:text-white transition-all duration-300 mb-1.5 sm:mb-2">
                  <HugeiconsIcon icon={social.icon} size="1.2em" />
                </div>
                <span className="font-montserrat font-bold text-xs sm:text-sm text-white tracking-tight">
                  {social.name}
                </span>
                <span className="font-mono text-[9px] sm:text-[11px] text-white/50 mt-0.5 truncate max-w-full">
                  {social.handle}
                </span>
              </a>
            ))}
          </div>

          {/* Footer Sub-indicator */}
          <div className="w-full mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] sm:text-xs font-mono text-white/40">
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
        baseItemSize={isMobile ? 42 : 64}
        magnification={isMobile ? 50 : 92}
        panelHeight={isMobile ? 54 : 84}
        gap={isMobile ? 8 : 12}
        accentColor="#ea580c"
      />

      {/* Experience Detail Modal (Portal) */}
      {isMounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedExperience && (
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="experience-modal-title"
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedExperience(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative z-10 w-full max-w-xl max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_30px_rgba(234,88,12,0.1)] overflow-hidden text-neutral-900"
              >
                {/* Header */}
                <div className="relative p-5 sm:p-6 pb-4 sm:pb-5 border-b border-neutral-100 bg-neutral-50/70">
                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedExperience(null)}
                    aria-label="Close modal"
                    className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 active:scale-95 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-all cursor-pointer border border-neutral-200"
                  >
                    <HugeiconsIcon icon={Cancel01Icon} size="1.15em" />
                  </button>

                  <div className="flex items-center gap-3.5 sm:gap-4 pr-10">
                    <ExperienceLogo src={selectedExperience.logo} alt={`${selectedExperience.company} logo`} />
                    <div className="min-w-0">
                      <h3
                        id="experience-modal-title"
                        className="font-montserrat font-bold text-base sm:text-xl text-neutral-900 leading-tight"
                      >
                        {selectedExperience.role}
                      </h3>
                      <p className="font-montserrat text-xs sm:text-sm text-neutral-500 font-medium mt-0.5">
                        {selectedExperience.company}
                      </p>
                    </div>
                  </div>

                  {/* Badges without background and border */}
                  <div className="flex flex-wrap items-center gap-2.5 mt-3 text-xs font-mono">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-neutral-700">
                      <HugeiconsIcon icon={Calendar03Icon} size="1.1em" className="text-orange-600" />
                      {selectedExperience.period}
                    </span>
                    <span className="text-neutral-300">•</span>
                    <span className="inline-flex items-center gap-1.5 text-neutral-600 font-medium">
                      <HugeiconsIcon icon={Briefcase02Icon} size="1.05em" className="text-orange-600" />
                      {selectedExperience.type}
                    </span>
                  </div>
                </div>

                {/* Modal Body (Scrollable) */}
                <div className="p-5 sm:p-6 overflow-y-auto space-y-5 bg-white">
                  {/* Description Section */}
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-orange-600 font-bold mb-2">
                      Role Overview & Responsibilities
                    </h4>
                    <p className="font-montserrat text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                      {selectedExperience.description}
                    </p>
                  </div>

                  {/* Technologies Section */}
                  {selectedExperience.technologies && selectedExperience.technologies.length > 0 && (
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-bold mb-2 flex items-center gap-1.5">
                        <HugeiconsIcon icon={Layers01Icon} size="1.1em" className="text-orange-600" />
                        <span>Technologies & Tools</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {selectedExperience.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-200/80 text-xs font-montserrat font-medium text-neutral-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects Developed Section */}
                  {(() => {
                    const pList = selectedExperience.projects || (selectedExperience.project ? [selectedExperience.project] : []);
                    if (pList.length === 0) return null;
                    return (
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-bold mb-2 flex items-center gap-1.5">
                          <HugeiconsIcon icon={CodeFolderIcon} size="1.1em" className="text-orange-600" />
                          <span>Projects & Deliverables</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {pList.map((proj, pIdx) =>
                            proj.url ? (
                              <a
                                key={pIdx}
                                href={proj.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-orange-600 text-white font-montserrat font-medium text-xs sm:text-sm shadow-md transition-all duration-200 active:scale-95 group"
                              >
                                <HugeiconsIcon icon={CodeFolderIcon} size="1.15em" className="text-orange-400 group-hover:text-white transition-colors" />
                                <span>{proj.name}</span>
                                <HugeiconsIcon
                                  icon={ArrowUpRight01Icon}
                                  size="1.1em"
                                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                              </a>
                            ) : (
                              <span
                                key={pIdx}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-800 font-montserrat text-xs sm:text-sm font-medium"
                              >
                                <HugeiconsIcon icon={CodeFolderIcon} size="1.15em" className="text-orange-600" />
                                <span>{proj.name}</span>
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Modal Footer */}
                <div className="p-4 sm:p-5 pt-3 sm:pt-4 border-t border-neutral-100 bg-neutral-50/70 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedExperience(null)}
                    className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 active:scale-95 text-neutral-800 text-xs sm:text-sm font-montserrat font-semibold transition-all cursor-pointer border border-neutral-200"
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
    </main>
  );
}
