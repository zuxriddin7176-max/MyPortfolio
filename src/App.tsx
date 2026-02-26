import React, { useState, useEffect, useRef, useMemo } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring,
  useInView
} from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Palette, 
  Terminal, 
  Cpu, 
  ChevronRight,
  Menu,
  X,
  Download,
  Send,
  Instagram,
  User,
  Briefcase,
  Layers,
  Phone,
  ArrowLeft
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  image?: string;
  customLogo?: React.ReactNode;
  link: string;
}

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
}

interface Stat {
  label: string;
  value: string;
  suffix: string;
}

// --- Constants ---
const PROJECTS: Project[] = [
  { 
    id: 1, 
    title: "Web Dizayn Laboratoriyasi", 
    category: "Web Design", 
    customLogo: (
      <div className="w-full h-full flex items-center justify-center bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,210,255,0.05)_1px,rgba(0,210,255,0.05)_2px)] bg-[length:100%_2px]" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <svg viewBox="0 0 100 100" className="w-32 h-32 text-neon-blue drop-shadow-[0_0_15px_rgba(0,210,255,0.5)]">
              <rect x="10" y="20" width="80" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="10" y1="35" x2="90" y2="35" stroke="currentColor" strokeWidth="2" />
              <circle cx="20" cy="27.5" r="2" fill="currentColor" />
              <circle cx="30" cy="27.5" r="2" fill="currentColor" />
              <circle cx="40" cy="27.5" r="2" fill="currentColor" />
              <path d="M40 50 L60 50 M50 40 L50 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
              <path d="M30 70 L70 70" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
            </svg>
          </div>
          <div className="mt-4 text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">Creative Lab v1.0</div>
        </div>
        <div className="absolute top-4 right-4">
          <div className="w-2 h-2 bg-neon-blue rounded-full animate-ping" />
        </div>
      </div>
    ),
    link: "#" 
  },
  { 
    id: 2, 
    title: "Qurilish materiallari ombori", 
    category: "Development", 
    customLogo: (
      <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-neon-blue)_0%,_transparent_70%)]" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <svg viewBox="0 0 100 100" className="w-32 h-32 text-neon-blue drop-shadow-[0_0_15px_rgba(0,210,255,0.5)]">
            <path d="M10 80 L90 80 L90 40 L50 10 L10 40 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M30 80 L30 50 L70 50 L70 80" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="40" y="25" width="20" height="10" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M10 40 L90 40" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
            <circle cx="50" cy="65" r="5" fill="currentColor" className="animate-pulse" />
          </svg>
          <div className="mt-4 text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Warehouse System v3.0</div>
        </div>
        <div className="absolute bottom-4 right-4 flex gap-1">
          {[1,2,3].map(i => <div key={i} className="w-1 h-4 bg-neon-purple/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />)}
        </div>
      </div>
    ),
    link: "#" 
  },
  { 
    id: 3, 
    title: "Aqlli Uy Boshqaruvi", 
    category: "UI/UX", 
    customLogo: (
      <div className="w-full h-full flex items-center justify-center bg-[#0a050a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-neon-purple)_0%,_transparent_70%)]" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative group-hover:scale-110 transition-transform duration-500">
            <svg viewBox="0 0 100 100" className="w-32 h-32 text-neon-purple drop-shadow-[0_0_20px_rgba(157,80,187,0.5)]">
              <path d="M20 50 L50 20 L80 50 L80 80 L20 80 Z" fill="none" stroke="currentColor" strokeWidth="3" />
              <circle cx="50" cy="55" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="55" r="3" fill="currentColor" className="animate-pulse" />
              <path d="M35 80 L35 65 L65 65 L65 80" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M10 50 Q50 10 90 50" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 3" className="opacity-50" />
            </svg>
          </div>
          <div className="mt-4 text-[10px] font-bold tracking-[0.5em] uppercase text-white/40">Smart Home OS</div>
        </div>
        <div className="absolute bottom-6 left-6 flex space-x-1">
          {[1,2,3,4].map(i => <div key={i} className="w-1 h-3 bg-neon-purple/30 rounded-full" />)}
        </div>
      </div>
    ),
    link: "#" 
  },
  { 
    id: 4, 
    title: "Raqamli Brending", 
    category: "Web Design", 
    customLogo: (
      <div className="w-full h-full flex items-center justify-center bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(0,210,255,0.1)_180deg,transparent_360deg)]" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="w-32 h-32 text-neon-blue drop-shadow-[0_0_25px_rgba(0,210,255,0.6)]">
              <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="currentColor" strokeWidth="3" />
              <polygon points="50,25 75,40 75,60 50,75 25,60 25,40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />
            </svg>
          </motion.div>
          <div className="mt-4 text-[10px] font-bold tracking-[0.6em] uppercase text-white/40">Digital Identity v2.4</div>
        </div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent" />
      </div>
    ),
    link: "#" 
  },
  { 
    id: 5, 
    title: "Competitive Programming", 
    category: "Development", 
    customLogo: (
      <div className="w-full h-full flex items-center justify-center bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 gap-2 p-4">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="text-[8px] font-mono text-neon-purple">{i % 2 === 0 ? '1' : '0'}</div>
            ))}
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <svg viewBox="0 0 100 100" className="w-32 h-32 text-neon-purple drop-shadow-[0_0_20px_rgba(157,80,187,0.6)]">
                <path d="M20 30 L10 50 L20 70" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M80 30 L90 50 L80 70" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M40 80 L60 20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M35 40 L50 25 L65 40 L65 60 L50 75 L35 60 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-neon-pink" />
              </svg>
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-neon-pink/20 blur-xl rounded-full animate-pulse" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-neon-purple" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/60">Algorithm Expert</span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-neon-purple" />
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <div className="text-[8px] font-mono text-white/20">O(log n)</div>
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="text-[8px] font-mono text-white/20">#include &lt;bits/stdc++.h&gt;</div>
        </div>
      </div>
    ),
    link: "#" 
  },
  { 
    id: 6, 
    title: "Mening inspektorim", 
    category: "Mobile App", 
    customLogo: (
      <div className="w-full h-full flex items-center justify-center bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(0,210,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px]" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative group-hover:scale-110 transition-transform duration-500">
            <svg viewBox="0 0 100 100" className="w-32 h-32 text-neon-blue drop-shadow-[0_0_20px_rgba(0,210,255,0.4)]">
              {/* Shield/Badge Shape */}
              <path d="M50 10 L85 25 L85 55 C85 75 50 90 50 90 C50 90 15 75 15 55 L15 25 Z" fill="none" stroke="currentColor" strokeWidth="3" />
              {/* Magnifying Glass */}
              <circle cx="45" cy="45" r="15" fill="none" stroke="currentColor" strokeWidth="3" />
              <line x1="56" y1="56" x2="70" y2="70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              {/* Scan Line */}
              <motion.line 
                x1="20" y1="45" x2="80" y2="45" 
                stroke="rgba(0,210,255,0.5)" 
                strokeWidth="1"
                animate={{ y: [-20, 20, -20] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>
          <div className="mt-4 text-[10px] font-bold tracking-[0.5em] uppercase text-white/40">Inspection System Pro</div>
        </div>
        {/* Corner Accents */}
        <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-neon-blue/30" />
        <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-neon-blue/30" />
      </div>
    ),
    link: "#" 
  },
  { 
    id: 7, 
    title: "Tezkor eltuv", 
    category: "Mobile App", 
    customLogo: (
      <div className="w-full h-full flex items-center justify-center bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,_var(--color-neon-pink)_0%,_transparent_60%)]" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <svg viewBox="0 0 100 100" className="w-32 h-32 text-neon-pink drop-shadow-[0_0_20px_rgba(255,0,150,0.5)]">
              {/* Envelope Body */}
              <path d="M10 30 L90 30 L90 70 L10 70 Z" fill="none" stroke="currentColor" strokeWidth="3" />
              {/* Envelope Flap */}
              <path d="M10 30 L50 55 L90 30" fill="none" stroke="currentColor" strokeWidth="3" />
              {/* Speed Lines */}
              <line x1="0" y1="40" x2="15" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-40" />
              <line x1="-10" y1="50" x2="10" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="0" y1="60" x2="15" y2="60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-40" />
            </svg>
            {/* Trail Effect */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex space-x-1">
              <div className="w-1 h-8 bg-neon-pink/30 rounded-full blur-[2px]" />
              <div className="w-1 h-6 bg-neon-pink/20 rounded-full blur-[1px]" />
            </div>
          </motion.div>
          <div className="mt-4 text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 italic">Express Delivery v2.0</div>
        </div>
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-neon-pink/5 blur-[60px] rounded-full" />
      </div>
    ),
    link: "#" 
  },
];

const SKILLS: Skill[] = [
  { name: "Frontend Development", level: 95, icon: <Code2 className="w-5 h-5" /> },
  { name: "UI/UX Design", level: 88, icon: <Palette className="w-5 h-5" /> },
  { name: "Backend Systems", level: 82, icon: <Terminal className="w-5 h-5" /> },
  { name: "Cloud Infrastructure", level: 75, icon: <Cpu className="w-5 h-5" /> },
];

const STATS: Stat[] = [
  { label: "Years Experience", value: "5", suffix: "+" },
  { label: "Projects Completed", value: "120", suffix: "+" },
  { label: "Happy Clients", value: "80", suffix: "+" },
];

// --- Components ---

const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-16 text-center">
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-neon-blue font-display font-medium tracking-widest uppercase text-sm mb-2"
    >
      {subtitle}
    </motion.p>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-display font-bold"
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-6 rounded-full"
    />
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home', icon: <User className="w-4 h-4" /> },
    { name: 'About', href: '#about', id: 'about', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Skills', href: '#skills', id: 'skills', icon: <Layers className="w-4 h-4" /> },
    { name: 'Projects', href: '#projects', id: 'projects', icon: <Code2 className="w-4 h-4" /> },
    { name: 'Contact', href: '#contact', id: 'contact', icon: <Phone className="w-4 h-4" /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-bold tracking-tighter"
        >
          ZUXRIDDIN<span className="text-neon-blue">BOLTAYEV</span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className={`relative text-sm font-medium transition-colors hover:text-neon-blue ${activeSection === link.id ? 'text-neon-blue' : 'text-white/70'}`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-neon-blue"
                />
              )}
            </a>
          ))}
          <a 
            href="#contact"
            className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium hover:bg-white/20 transition-all"
          >
            Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-10 flex flex-col space-y-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-4 text-xl font-medium text-white/80 hover:text-neon-blue transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-neon-blue">
                    {link.icon}
                  </div>
                  <span>{link.name}</span>
                </a>
              ))}
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple font-bold text-lg shadow-lg shadow-neon-blue/20">
                Download Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [profileImage] = useState("src/photo_2026-02-25 21.04.15.jpeg");

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-blue/20 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, -60, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-neon-purple/20 blur-[150px] rounded-full"
        />
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full glass border border-white/10 text-neon-blue text-xs font-bold tracking-widest uppercase mb-6"
          >
            Available for new projects
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
              Zuxriddin Boltayev
            </span>
          </motion.h1>
          <p className="text-lg text-white/60 mb-10 max-w-lg leading-relaxed">
            I'm a Full-Stack Developer & UI Designer specializing in building exceptional digital products that combine stunning visuals with robust performance.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <a 
              href="#projects"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple font-bold hover:scale-105 transition-transform flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <span>View My Work</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <div className="flex items-center space-x-4 justify-center w-full sm:w-auto">
              <a href="https://github.com/zuxriddin7176-max" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:text-neon-blue transition-colors"><Github className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/in/zuxriddin-boltayev-2ab761296/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:text-neon-blue transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="https://t.me/zuxriddinboltayev" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:text-neon-blue transition-colors"><Send className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/zuxriddin_6688" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:text-neon-blue transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >
          <div className="relative group">
            {/* Animated Border Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full border border-dashed border-neon-blue/30"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 rounded-full border border-dashed border-neon-purple/20"
            />
            
            {/* Profile Image Container */}
            <div className="relative w-[280px] h-[370px] md:w-[340px] md:h-[450px] rounded-[40px] overflow-hidden p-1.5 bg-gradient-to-tr from-neon-blue via-neon-purple to-neon-pink shadow-[0_0_50px_rgba(157,80,187,0.3)] group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full rounded-[34px] overflow-hidden bg-[#050505]">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'development',
      title: 'Development',
      icon: <Code2 className="w-10 h-10 text-neon-blue mb-4" />,
      color: 'border-neon-blue',
      description: 'Building scalable and performant applications using modern stacks.',
      details: "With over half a decade of profound expertise in software engineering, I specialize in architecting high-performance, scalable web applications utilizing cutting-edge technologies such as React, Next.js, and Node.js. My technical repertoire is grounded in TypeScript, ensuring robust and maintainable codebases. Throughout my career, I have successfully spearheaded a multitude of intricate projects, ranging from sophisticated analytical dashboards to high-traffic e-commerce platforms. My philosophy centers on the meticulous optimization of every line of code, striving for an impeccable balance between computational efficiency and architectural elegance."
    },
    {
      id: 'design',
      title: 'Design',
      icon: <Palette className="w-10 h-10 text-neon-pink mb-4" />,
      color: 'border-neon-pink',
      description: 'Creating visually stunning and user-centric interfaces.',
      details: "In the realm of UI/UX design, my methodology is anchored in a user-centric paradigm, where psychological insights meet aesthetic precision. Leveraging industry-leading tools like Figma and Adobe XD, I conceptualize and execute contemporary interfaces that are not only visually arresting but also intuitively navigable. I am a firm proponent of the idea that design should transcend mere aesthetics; it must serve as a functional conduit that enhances user engagement and streamlines complex workflows. By paying fastidious attention to micro-interactions and accessibility standards, I ensure that every digital touchpoint resonates with the end-user."
    },
    {
      id: 'strategy',
      title: 'Strategy',
      icon: <Terminal className="w-10 h-10 text-neon-purple mb-4" />,
      color: 'border-neon-purple',
      description: 'Defining product roadmaps and technical architectures.',
      details: "Strategic product development requires a harmonious synthesis of market intelligence and technical feasibility. My role involves meticulously defining product roadmaps and architecting technical frameworks that are resilient enough to accommodate future scalability. I possess a proven track record of bridging the gap between high-level business objectives and granular technical execution. By conducting comprehensive feasibility studies and risk assessments, I ensure that every project is built upon a foundation of strategic foresight, ultimately delivering long-term value and a competitive edge in the digital landscape."
    },
    {
      id: 'innovation',
      title: 'Innovation',
      icon: <Cpu className="w-10 h-10 text-neon-blue mb-4" />,
      color: 'border-neon-blue',
      description: 'Exploring emerging technologies to solve complex problems.',
      details: "Innovation is the cornerstone of my professional identity. I am perpetually engaged in the exploration of nascent technologies, seeking novel ways to resolve multifaceted challenges. My focus extends to the integration of Artificial Intelligence, decentralized systems, and cloud-native architectures into practical, real-world applications. I believe that staying at the vanguard of technological evolution is not merely an advantage but a necessity in the modern era. By fostering a culture of continuous learning and experimental iteration, I transform emerging trends into tangible innovations that redefine the boundaries of what is possible in software development."
    }
  ];

  const selectedData = categories.find(c => c.id === selectedCategory);

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeading title="About Me" subtitle="My Story" />
        
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {!selectedCategory ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-2 gap-16 items-center"
              >
                <div className="space-y-6">
                  <h3 className="text-3xl font-display font-bold">
                    Passionate about creating <span className="text-neon-blue">impactful</span> digital solutions.
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    With over 5 years of experience in the tech industry, I've had the privilege of working with startups and established brands to bring their visions to life. My approach combines technical excellence with a deep understanding of user behavior.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                    {STATS.map((stat, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass p-6 rounded-2xl text-center"
                      >
                        <div className="text-3xl font-display font-bold text-neon-blue mb-1">
                          {stat.value}{stat.suffix}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    {categories.slice(0, 2).map((cat) => (
                      <button 
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left glass p-6 md:p-8 rounded-3xl border-l-4 ${cat.color} hover:scale-[1.02] transition-transform group`}
                      >
                        {cat.icon}
                        <h4 className="text-xl font-bold mb-2 group-hover:text-neon-blue transition-colors">{cat.title}</h4>
                        <p className="text-sm text-white/50">{cat.description}</p>
                      </button>
                    ))}
                  </div>
                  <div className="space-y-6 sm:pt-12">
                    {categories.slice(2, 4).map((cat) => (
                      <button 
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left glass p-6 md:p-8 rounded-3xl border-l-4 ${cat.color} hover:scale-[1.02] transition-transform group`}
                      >
                        {cat.icon}
                        <h4 className="text-xl font-bold mb-2 group-hover:text-neon-blue transition-colors">{cat.title}</h4>
                        <p className="text-sm text-white/50">{cat.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="glass p-10 md:p-16 rounded-[40px] relative overflow-hidden"
              >
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="absolute top-8 left-8 flex items-center space-x-2 text-white/60 hover:text-neon-blue transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-bold uppercase tracking-widest">Back</span>
                </button>

                <div className="flex flex-col md:flex-row gap-12 items-center pt-12">
                  <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl glass flex items-center justify-center border-l-4 ${selectedData?.color}`}>
                    {selectedData?.icon}
                  </div>
                  <div className="flex-1 space-y-6">
                    <h3 className="text-4xl md:text-5xl font-display font-bold">
                      {selectedData?.title}
                    </h3>
                    <p className="text-xl text-white/80 leading-relaxed font-light italic">
                      {selectedData?.description}
                    </p>
                    <div className="h-px w-full bg-white/10" />
                    <p className="text-lg text-white/60 leading-relaxed">
                      {selectedData?.details}
                    </p>
                  </div>
                </div>

                {/* Decorative background element */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-neon-blue/5 blur-[100px] rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-white/5">
      <div className="container mx-auto px-6">
        <SectionHeading title="My Expertise" subtitle="Technical Skills" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((skill, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-3xl group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-neon-blue/20 transition-colors">
                <div className="text-neon-blue">{skill.icon}</div>
              </div>
              <h4 className="text-xl font-bold mb-4">{skill.name}</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Circular Skills (Visual representation) */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 justify-items-center">
          {['React', 'Node.js', 'TypeScript', 'Figma'].map((tech, idx) => (
            <div key={idx} className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-white/5"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray="364"
                  initial={{ strokeDashoffset: 364 }}
                  whileInView={{ strokeDashoffset: 364 - (364 * (85 + idx * 3)) / 100 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="text-neon-blue"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold">{85 + idx * 3}%</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter text-white/40">{tech}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const categories = ['All', 'Web Design', 'Development', 'UI/UX', 'Mobile App'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="Featured Work" subtitle="Portfolio" />
        
        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-neon-blue text-black font-bold' : 'glass hover:bg-white/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -15 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden glass"
              >
                {project.customLogo ? (
                  <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
                    {project.customLogo}
                  </div>
                ) : (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="space-y-2"
                  >
                    <span className="text-neon-blue text-xs font-bold uppercase tracking-widest">{project.category}</span>
                    <h4 className="text-2xl font-display font-bold transition-transform duration-300 group-hover:scale-105 origin-left text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
                      {project.title}
                    </h4>
                    <a 
                      href={project.link}
                      className="inline-flex items-center space-x-2 text-sm font-bold text-white hover:text-neon-blue transition-colors pt-4"
                    >
                      <span>View Project</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length > 6 && !showAll && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => setShowAll(true)}
              className="px-10 py-4 rounded-full glass border border-white/10 font-bold hover:bg-white/10 transition-all group"
            >
              <span className="flex items-center space-x-2">
                <span>View More Projects</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.span>
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const Contact = () => {
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch("https://formsubmit.co/ajax/zuxriddin7176@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        <SectionHeading title="Get In Touch" subtitle="Contact" />
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-display font-bold mb-4">Let's talk about your project</h3>
              <p className="text-white/50 leading-relaxed">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-neon-blue">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40">Email Me</p>
                  <p className="font-medium">zuxriddin7176@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-neon-purple">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40">LinkedIn</p>
                  <p className="font-medium">linkedin.com/in/zuxriddin-boltayev</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-neon-pink">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40">Phone</p>
                  <p className="font-medium">+998971286688</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 glass p-6 sm:p-10 rounded-[30px] sm:rounded-[40px]"
          >
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    required
                    className="w-full bg-transparent border-b-2 border-white/10 py-3 outline-none transition-colors focus:border-neon-blue peer"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="name"
                    className={`absolute left-0 top-3 text-white/40 transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:text-neon-blue peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs`}
                  >
                    Full Name
                  </label>
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    required
                    className="w-full bg-transparent border-b-2 border-white/10 py-3 outline-none transition-colors focus:border-neon-blue peer"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="email"
                    className={`absolute left-0 top-3 text-white/40 transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:text-neon-blue peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs`}
                  >
                    Email Address
                  </label>
                </div>
              </div>

              <div className="relative">
                <input 
                  type="text" 
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused(null)}
                  required
                  className="w-full bg-transparent border-b-2 border-white/10 py-3 outline-none transition-colors focus:border-neon-blue peer"
                  placeholder=" "
                />
                <label 
                  htmlFor="subject"
                  className={`absolute left-0 top-3 text-white/40 transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:text-neon-blue peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs`}
                >
                  Subject
                </label>
              </div>

              <div className="relative">
                <textarea 
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  required
                  className="w-full bg-transparent border-b-2 border-white/10 py-3 outline-none transition-colors focus:border-neon-blue peer resize-none"
                  placeholder=" "
                />
                <label 
                  htmlFor="message"
                  className={`absolute left-0 top-3 text-white/40 transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:text-neon-blue peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs`}
                >
                  Your Message
                </label>
              </div>

              <button 
                disabled={status === 'sending'}
                className={`w-full py-5 rounded-2xl font-bold text-lg shadow-[0_10px_30px_rgba(157,80,187,0.3)] hover:scale-[1.02] transition-all flex items-center justify-center space-x-3 ${
                  status === 'success' ? 'bg-emerald-500' : 
                  status === 'error' ? 'bg-rose-500' : 
                  'bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink'
                }`}
              >
                {status === 'idle' && (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
                {status === 'sending' && (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span>Sending...</span>
                  </>
                )}
                {status === 'success' && (
                  <>
                    <span>Message Sent!</span>
                  </>
                )}
                {status === 'error' && (
                  <>
                    <span>Error Sending Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-xl font-display font-bold">
            ZUXRIDDIN<span className="text-neon-blue">BOLTAYEV</span>
          </div>
          
          <div className="flex space-x-8">
            <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Terms of Service</a>
          </div>

          <div className="flex space-x-4">
            {[
              { Icon: Github, href: "https://github.com/zuxriddin7176-max" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/zuxriddin-boltayev-2ab761296/" },
              { Icon: Send, href: "https://t.me/zuxriddinboltayev" },
              { Icon: Instagram, href: "https://www.instagram.com/zuxriddin_6688" },
              { Icon: Mail, href: "mailto:zuxriddin7176@gmail.com" }
            ].map(({ Icon, href }, idx) => (
              <a key={idx} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-neon-blue transition-colors">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center text-white/20 text-xs font-medium uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Zuxriddin Boltayev. All Rights Reserved. Crafted with Passion.
        </div>
      </div>
    </footer>
  );
};

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);
  const containerRef = useRef<any>(null);
  const lastInteractionRef = useRef<number>(Date.now());

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    const handleInteraction = () => {
      lastInteractionRef.current = Date.now();
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (!init) return;

    // We no longer need the removal interval if push is disabled
    // but we'll keep the interaction tracking just in case
  }, [init]);

  const particlesLoaded = async (container?: any) => {
    containerRef.current = container;
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          push: {
            quantity: 10,
          },
          grab: {
            distance: 200,
            links: {
              opacity: 0.5
            }
          },
        },
      },
      particles: {
        color: {
          value: "#00d2ff",
        },
        links: {
          color: "#00d2ff",
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 3,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 300,
          limit: 300,
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options as any}
        className="absolute inset-0 -z-20 pointer-events-none"
      />
    );
  }

  return null;
};

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && cursorOuterRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorOuterRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-neon-blue rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" />
      <div ref={cursorOuterRef} className="fixed top-0 left-0 w-10 h-10 border border-neon-blue/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out hidden md:block" />
    </>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative selection:bg-neon-blue/30 overflow-x-hidden">
      <ParticlesBackground />
      <CustomCursor />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
