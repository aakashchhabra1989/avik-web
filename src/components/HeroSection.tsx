import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Flame,
  Rocket,
  Star,
  Compass,
  Hand,
  ShieldCheck,
  Palette,
  Sun,
  Moon,
  Zap,
  Layers,
  Dices,
  Check,
  Camera,
  Smile
} from 'lucide-react';
import { soundEffects } from '../utils/audio';
import avikRealPhoto from '../assets/images/avik_real_photo_1792919013034.jpg';
import { SecretSpotEasterEgg } from './SecretSpotEasterEgg';

export type WelcomeTheme = 'sunny' | 'cosmic' | 'lego' | 'speedway' | 'blueprint';

interface HeroSectionProps {
  onHighFive: () => void;
  highFiveCount: number;
  activeSpotId?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onHighFive, highFiveCount, activeSpotId }) => {
  // Saved or default theme
  const [theme, setTheme] = useState<WelcomeTheme>(() => {
    try {
      const saved = localStorage.getItem('avik_welcome_bg');
      if (saved && ['sunny', 'cosmic', 'lego', 'speedway', 'blueprint'].includes(saved)) {
        return saved as WelcomeTheme;
      }
    } catch {}
    return 'sunny'; // New vibrant default!
  });

  const [selectedOutfit, setSelectedOutfit] = useState<'shades' | 'astro' | 'cape' | 'crown' | 'explorer'>('shades');
  const [avatarClicks, setAvatarClicks] = useState(0);
  const [sayingIndex, setSayingIndex] = useState(0);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [avatarView, setAvatarView] = useState<'real' | 'cartoon'>('real');

  useEffect(() => {
    try {
      localStorage.setItem('avik_welcome_bg', theme);
    } catch {}
  }, [theme]);

  const funnySayings = [
    "Welcome to a Big World! It's the best — play like every day! 🎮✨",
    "Ready for our next mission in this Big World? Let's go! 🚀",
    "Did you know Jupiter has 95 moons? Mind blown! 🪐",
    "Hot Wheels + LEGO = Best invention ever! 🏎️🧱",
    "Math is like solving secret superhero codes! 🔢✨",
    "Double scoop mango ice cream is the fuel of champions! 🍦",
    "High five received! You're on the squad! ✋🔥"
  ];

  const handleAvatarClick = () => {
    soundEffects.playBoing();
    setAvatarClicks(prev => prev + 1);
    setSayingIndex(prev => (prev + 1) % funnySayings.length);
  };

  const outfitDetails = {
    shades: { name: 'Cool Explorer Shades 🕶️', sticker: '🕶️', badge: 'Ultra Cool' },
    astro: { name: 'Space Cadet Helmet 👨‍🚀', sticker: '🚀', badge: 'Galaxy Bound' },
    cape: { name: 'Superhero Red Cape 🦸', sticker: '⚡', badge: 'Hero Mode' },
    crown: { name: 'Math Champion Crown 👑', sticker: '👑', badge: 'Math King' },
    explorer: { name: 'Safari Explorer Hat 🧢', sticker: '🧭', badge: 'Wilderness Pro' }
  };

  const themesList = [
    {
      id: 'sunny' as WelcomeTheme,
      name: 'Sunny Sky & Rainbow',
      badge: 'Sunny Adventure ☀️',
      emoji: '☀️',
      desc: 'Sky blue, cartoon clouds & bright sunshine',
      pillClass: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      id: 'cosmic' as WelcomeTheme,
      name: 'Cosmic Galaxy Orbit',
      badge: 'Deep Space Orbit 🌌',
      emoji: '🌌',
      desc: 'Twinkling stars, nebulae & Saturn rings',
      pillClass: 'bg-indigo-950 text-indigo-200 border-indigo-700'
    },
    {
      id: 'lego' as WelcomeTheme,
      name: 'LEGO Master Zone',
      badge: 'LEGO Brickland 🧱',
      emoji: '🧱',
      desc: 'Vibrant yellow stud grid & toy bricks',
      pillClass: 'bg-yellow-200 text-yellow-950 border-yellow-400'
    },
    {
      id: 'speedway' as WelcomeTheme,
      name: 'Supersonic Speedway',
      badge: 'Turbo Raceway 🏎️',
      emoji: '🏎️',
      desc: 'High-octane racing neon & checkered flags',
      pillClass: 'bg-red-950 text-red-200 border-red-700'
    },
    {
      id: 'blueprint' as WelcomeTheme,
      name: 'Inventor Blueprint Lab',
      badge: 'Secret Blueprint 📐',
      emoji: '📐',
      desc: 'Technical graph grid, math & compass arcs',
      pillClass: 'bg-cyan-950 text-cyan-200 border-cyan-700'
    }
  ];

  const handleSelectTheme = (newTheme: WelcomeTheme) => {
    soundEffects.playPop();
    setTheme(newTheme);
  };

  const handleRandomTheme = () => {
    soundEffects.playCorrect();
    const otherThemes = themesList.map(t => t.id).filter(t => t !== theme);
    const randomPick = otherThemes[Math.floor(Math.random() * otherThemes.length)];
    setTheme(randomPick);
  };

  const isDark = theme === 'cosmic' || theme === 'speedway' || theme === 'blueprint';

  return (
    <section
      id="hero"
      className={`relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden transition-all duration-700 ${
        theme === 'sunny'
          ? 'bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100 text-slate-900'
          : theme === 'cosmic'
          ? 'bg-gradient-to-b from-[#090a1a] via-[#120e36] to-[#1e1347] text-white'
          : theme === 'lego'
          ? 'bg-gradient-to-br from-amber-400 via-yellow-300 to-orange-400 text-slate-950'
          : theme === 'speedway'
          ? 'bg-gradient-to-br from-[#0c102b] via-[#1a0f30] to-[#2d091e] text-white'
          : 'bg-gradient-to-br from-[#071a33] via-[#09264a] to-[#041427] text-white'
      }`}
    >
      {/* =========================================================================
          DYNAMIC BACKGROUND LAYERS & GRAPHICS BASED ON SELECTED THEME
          ========================================================================= */}

      {/* 1. SUNNY SKY & RAINBOW THEME */}
      {theme === 'sunny' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Glowing Animated Sun with Rotating Rays */}
          <div className="absolute -top-12 -right-12 sm:top-4 sm:right-12 w-64 h-64 sm:w-80 sm:h-80 opacity-90">
            <div className="absolute inset-0 bg-yellow-300 rounded-full blur-2xl opacity-60 animate-pulse-gentle" />
            <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_40s_linear_infinite]">
              <defs>
                <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              {/* Sun rays */}
              {Array.from({ length: 12 }).map((_, i) => (
                <rect
                  key={i}
                  x="96"
                  y="6"
                  width="8"
                  height="34"
                  rx="4"
                  fill="#fbbf24"
                  transform={`rotate(${i * 30} 100 100)`}
                  opacity="0.85"
                />
              ))}
              <circle cx="100" cy="100" r="54" fill="url(#sunGrad)" stroke="#f59e0b" strokeWidth="4" />
              {/* Cute Smiling Face on Sun */}
              <circle cx="85" cy="94" r="5" fill="#78350f" />
              <circle cx="115" cy="94" r="5" fill="#78350f" />
              <path d="M 85 110 Q 100 126 115 110" fill="none" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>

          {/* Rainbow Arc */}
          <div className="absolute -top-10 left-1/4 w-[500px] h-[250px] opacity-40 pointer-events-none">
            <svg viewBox="0 0 500 250" className="w-full h-full">
              <path d="M 20 250 A 230 230 0 0 1 480 250" fill="none" stroke="#ef4444" strokeWidth="12" opacity="0.6" />
              <path d="M 32 250 A 218 218 0 0 1 468 250" fill="none" stroke="#f97316" strokeWidth="12" opacity="0.6" />
              <path d="M 44 250 A 206 206 0 0 1 456 250" fill="none" stroke="#eab308" strokeWidth="12" opacity="0.6" />
              <path d="M 56 250 A 194 194 0 0 1 444 250" fill="none" stroke="#22c55e" strokeWidth="12" opacity="0.6" />
              <path d="M 68 250 A 182 182 0 0 1 432 250" fill="none" stroke="#3b82f6" strokeWidth="12" opacity="0.6" />
              <path d="M 80 250 A 170 170 0 0 1 420 250" fill="none" stroke="#a855f7" strokeWidth="12" opacity="0.6" />
            </svg>
          </div>

          {/* Fluffy Cartoon Clouds */}
          <div className="absolute top-20 left-[4%] animate-float opacity-90 drop-shadow-md">
            <svg width="150" height="70" viewBox="0 0 150 70" fill="white">
              <circle cx="45" cy="45" r="25" />
              <circle cx="75" cy="30" r="30" />
              <circle cx="110" cy="45" r="22" />
              <rect x="40" y="45" width="70" height="25" rx="10" />
            </svg>
          </div>
          <div className="absolute top-44 right-[15%] animate-float-reverse opacity-85 drop-shadow-md">
            <svg width="170" height="75" viewBox="0 0 170 75" fill="white">
              <circle cx="45" cy="45" r="25" />
              <circle cx="85" cy="32" r="32" />
              <circle cx="125" cy="46" r="24" />
              <rect x="42" y="45" width="85" height="30" rx="12" />
            </svg>
          </div>
          <div className="absolute bottom-28 left-[18%] animate-float opacity-75 drop-shadow-sm hidden md:block">
            <svg width="120" height="55" viewBox="0 0 120 55" fill="white">
              <circle cx="35" cy="35" r="20" />
              <circle cx="65" cy="22" r="22" />
              <circle cx="95" cy="35" r="18" />
              <rect x="30" y="35" width="65" height="20" rx="8" />
            </svg>
          </div>

          {/* Floating kites, balloons, and paper airplane */}
          <div className="absolute top-36 left-[34%] text-3xl animate-wiggle">🪁</div>
          <div className="absolute top-64 right-[8%] text-3xl animate-float">🎈</div>
          <div className="absolute bottom-16 right-[28%] text-3xl animate-float-reverse">✈️</div>
        </div>
      )}

      {/* 2. COSMIC SPACE ORBIT THEME */}
      {theme === 'cosmic' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Nebula Color Orbs */}
          <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-purple-600/25 rounded-full blur-3xl animate-pulse-gentle" />
          <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-blue-600/25 rounded-full blur-3xl" />
          <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-3xl" />

          {/* Twinkling Starfield Grid */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

          {/* Saturn-like Ring Planet */}
          <div className="absolute top-16 right-[12%] w-36 h-36 opacity-80 animate-float">
            <svg viewBox="0 0 140 140" className="w-full h-full">
              {/* Back of ring */}
              <ellipse cx="70" cy="70" rx="60" ry="18" fill="none" stroke="#fcd34d" strokeWidth="6" opacity="0.6" transform="rotate(-25 70 70)" strokeDasharray="90 180" />
              {/* Planet sphere */}
              <circle cx="70" cy="70" r="32" fill="url(#saturnGrad)" />
              <defs>
                <linearGradient id="saturnGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
              </defs>
              {/* Front of ring */}
              <ellipse cx="70" cy="70" rx="60" ry="18" fill="none" stroke="#fef08a" strokeWidth="6" opacity="0.9" transform="rotate(-25 70 70)" strokeDasharray="180 90" />
            </svg>
          </div>

          {/* Floating Space Artifacts */}
          <div className="absolute top-32 left-[10%] text-4xl animate-float">🛸</div>
          <div className="absolute bottom-20 left-[22%] text-3xl animate-float-reverse">🪐</div>
          <div className="absolute top-52 left-[4%] text-2xl text-yellow-300 animate-wiggle">✨</div>
          <div className="absolute bottom-32 right-[10%] text-4xl animate-wiggle">☄️</div>
          <div className="absolute top-20 left-[48%] text-2xl text-blue-300 animate-pulse">🌟</div>
        </div>
      )}

      {/* 3. LEGO BRICKLAND THEME */}
      {theme === 'lego' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* LEGO Stud Dots Matrix */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: 'radial-gradient(#78350f 3.5px, transparent 3.5px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Giant Toy Brick Silhouettes */}
          <div className="absolute top-12 left-[6%] w-28 h-16 bg-red-500 rounded-lg border-4 border-slate-950 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] -rotate-6 flex items-center justify-around px-2 opacity-90 animate-float">
            <div className="w-4 h-4 rounded-full bg-red-400 border-2 border-slate-950" />
            <div className="w-4 h-4 rounded-full bg-red-400 border-2 border-slate-950" />
            <div className="w-4 h-4 rounded-full bg-red-400 border-2 border-slate-950" />
          </div>

          <div className="absolute top-24 right-[8%] w-32 h-16 bg-blue-600 rounded-lg border-4 border-slate-950 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] rotate-12 flex items-center justify-around px-2 opacity-90 animate-float-reverse">
            <div className="w-4 h-4 rounded-full bg-blue-400 border-2 border-slate-950" />
            <div className="w-4 h-4 rounded-full bg-blue-400 border-2 border-slate-950" />
            <div className="w-4 h-4 rounded-full bg-blue-400 border-2 border-slate-950" />
          </div>

          <div className="absolute bottom-16 left-[20%] w-24 h-14 bg-emerald-500 rounded-lg border-4 border-slate-950 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] rotate-6 flex items-center justify-around px-2 opacity-85 hidden sm:flex">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-slate-950" />
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-slate-950" />
          </div>

          {/* Floating Brick Doodles */}
          <div className="absolute top-48 left-[24%] text-3xl animate-wiggle">🧱</div>
          <div className="absolute bottom-24 right-[22%] text-3xl animate-bounce">🟡</div>
          <div className="absolute top-60 right-[3%] text-3xl animate-float">🏆</div>
        </div>
      )}

      {/* 4. SUPERSONIC SPEEDWAY THEME */}
      {theme === 'speedway' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Speed Streaks & Neon Sparks */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(249,115,22,0.4)_50%,transparent_75%)] [background-size:60px_60px]" />
          
          {/* Glowing Speed Curves */}
          <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none" viewBox="0 0 1000 600">
            <path d="M-100 200 C 300 100, 700 500, 1100 350" fill="none" stroke="#06b6d4" strokeWidth="6" strokeDasharray="15 15" />
            <path d="M-100 230 C 300 130, 700 530, 1100 380" fill="none" stroke="#f97316" strokeWidth="4" />
            <path d="M-100 260 C 300 160, 700 560, 1100 410" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="8 8" />
          </svg>

          {/* Checkered Flag Accent Banner at Top */}
          <div className="absolute top-0 left-0 right-0 h-3 opacity-30 flex">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-white' : 'bg-transparent'}`} />
            ))}
          </div>

          {/* Floating Hot Wheels Icons */}
          <div className="absolute top-24 left-[8%] text-4xl animate-float">🏎️</div>
          <div className="absolute top-36 right-[12%] text-4xl animate-wiggle">🏁</div>
          <div className="absolute bottom-20 left-[26%] text-3xl text-amber-400 animate-float-reverse">⚡</div>
          <div className="absolute bottom-28 right-[18%] text-4xl animate-wiggle">🔥</div>
        </div>
      )}

      {/* 5. SECRET BLUEPRINT LAB THEME */}
      {theme === 'blueprint' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Technical Cyan Graph Paper Grid */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(56, 189, 248, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.25) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Blueprint Drafting Circles & Geometry */}
          <div className="absolute top-10 right-[15%] w-60 h-60 opacity-30">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="100" cy="100" r="30" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="10" y1="100" x2="190" y2="100" stroke="#38bdf8" strokeWidth="1" />
              <line x1="100" y1="10" x2="100" y2="190" stroke="#38bdf8" strokeWidth="1" />
            </svg>
          </div>

          {/* Math Equations & Symbols */}
          <div className="absolute top-28 left-[10%] text-cyan-300/40 font-mono text-xl sm:text-2xl font-bold animate-float">
            f(x) = x² + 42
          </div>
          <div className="absolute bottom-24 left-[14%] text-cyan-300/40 font-mono text-xl sm:text-2xl font-bold animate-float-reverse">
            E = mc² • 3rd Grade Edition
          </div>
          <div className="absolute top-52 right-[6%] text-3xl animate-wiggle">📐</div>
          <div className="absolute bottom-28 right-[24%] text-3xl animate-float">🔬</div>
        </div>
      )}

      {/* Common Floating Math Doodles Across All Themes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className={`absolute top-20 left-[6%] text-2xl md:text-3xl font-bubble font-black animate-float ${isDark ? 'text-amber-300/60' : 'text-blue-600/40'}`}>
          ∑ 42
        </div>
        <div className={`absolute top-48 right-[8%] text-3xl md:text-4xl font-bubble font-black animate-float-reverse ${isDark ? 'text-cyan-300/60' : 'text-amber-600/50'}`}>
          π × 3.14
        </div>
        <div className={`absolute bottom-16 left-[10%] text-2xl md:text-3xl font-bubble font-black animate-float ${isDark ? 'text-emerald-300/60' : 'text-emerald-700/50'}`}>
          9 × 9 = 81
        </div>
        <div className="absolute top-1/3 left-2 text-2xl animate-wiggle">
          ⭐
        </div>
        <div className="absolute bottom-24 right-[14%] text-3xl animate-wiggle">
          🎲
        </div>
      </div>

      {/* =========================================================================
          WELCOME HERO CONTENT
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Background Style Switcher Toolbar Banner */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border-2 border-slate-900/10 dark:border-white/10 shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm shadow-xs">
              <Palette className="w-4 h-4" />
            </span>
            <span className={`text-xs sm:text-sm font-bubble font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Welcome Backdrop:
            </span>
            <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-amber-200 text-amber-950 border border-amber-300 hidden sm:inline-block">
              {themesList.find(t => t.id === theme)?.badge}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {themesList.map((t) => {
              const active = theme === t.id;
              return (
                <button
                  key={t.id}
                  id={`btn-welcome-bg-${t.id}`}
                  onClick={() => handleSelectTheme(t.id)}
                  className={`px-3 py-1.5 rounded-xl font-bubble text-xs font-bold transition-all flex items-center gap-1.5 border-2 ${
                    active
                      ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-105'
                      : 'bg-white/90 text-slate-800 border-slate-300 hover:border-amber-400 hover:bg-amber-50'
                  }`}
                  title={t.desc}
                >
                  <span>{t.emoji}</span>
                  <span className="hidden md:inline">{t.name.split(' ')[0]}</span>
                  {active && <Check className="w-3 h-3 text-amber-400" />}
                </button>
              );
            })}

            {/* Random Theme Dice Button */}
            <button
              id="btn-random-welcome-bg"
              onClick={handleRandomTheme}
              className="p-1.5 px-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-bubble text-xs font-bold shadow-xs flex items-center gap-1 active:scale-95 transition-all"
              title="Roll a random background!"
            >
              <Dices className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Shuffle</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle & Interactive Bio */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top Bubble Badge */}
            <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 p-1 pr-4 rounded-full shadow-md shadow-orange-500/20 border-2 border-white">
                <span className="bg-white text-slate-900 font-bubble text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  OFFICIAL PORTAL
                </span>
                <span className="text-xs font-black text-amber-950 tracking-wide">
                  Third Grade Explorer HQ 🚀
                </span>
              </div>
              <SecretSpotEasterEgg spotId="hero-badge" activeSpotId={activeSpotId || ''} />
            </div>

            {/* Main Hero Title with Kid-Friendly Bubble Font */}
            <div className="space-y-3">
              <h1
                id="hero-main-title"
                className={`font-bubble text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] ${
                  isDark ? 'text-white drop-shadow-lg' : 'text-slate-900'
                }`}
              >
                Welcome to a <br className="hidden sm:inline" />
                <span className="relative inline-block mt-1">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
                    Big World!
                  </span>
                  {/* Decorative underline squiggly / pill */}
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-amber-400 -rotate-1 rounded-full -z-0 opacity-80" />
                </span>
              </h1>

              {/* Playful Motto Badge */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 text-slate-950 px-4 py-2 rounded-2xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] font-bubble text-sm sm:text-base font-black">
                  <span className="animate-wiggle">🌟</span>
                  <span>It's the best. Play like every day!</span>
                  <span>🎮🚀</span>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <div className="inline-block bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm px-5 py-2.5 rounded-2xl border-2 border-amber-300 shadow-md">
              <p
                id="hero-subtitle"
                className="text-base sm:text-lg md:text-xl font-bubble font-semibold text-slate-900 dark:text-white flex items-center justify-center lg:justify-start gap-2 flex-wrap"
              >
                <span className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-lg text-sm font-black shadow-xs">
                  Avik's World
                </span>
                <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded-lg text-sm font-bold shadow-xs">
                  8 Years Old
                </span>
                <span className="text-amber-500">•</span>
                <span className={isDark ? 'text-amber-300' : 'text-indigo-900'}>
                  3rd Grade Adventurer & Explorer
                </span>
                <span className="inline-block animate-bounce">🚀</span>
              </p>
            </div>

            {/* Introductory statement */}
            <p
              className={`text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium ${
                isDark ? 'text-slate-200' : 'text-slate-700'
              }`}
            >
              Hey there! I love building mega LEGO spaceships, crunching tricky math puzzles, racing Hot Wheels at supersonic speed, and uncovering secrets of the solar system!
            </p>

            {/* Quick Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-lg mx-auto lg:mx-0 pt-1">
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs border-2 border-blue-200 dark:border-blue-900/60 p-2.5 rounded-2xl flex items-center gap-2 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  💡
                </div>
                <div className="text-left min-w-0">
                  <div className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">Superpower</div>
                  <div className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>Asking 'Why?'</div>
                </div>
              </div>

              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs border-2 border-amber-200 dark:border-amber-900/60 p-2.5 rounded-2xl flex items-center gap-2 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  🧀
                </div>
                <div className="text-left min-w-0">
                  <div className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400">Top Fuel</div>
                  <div className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>Cheesy Nachos</div>
                </div>
              </div>

              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs border-2 border-emerald-200 dark:border-emerald-900/60 p-2.5 rounded-2xl flex items-center gap-2 col-span-2 sm:col-span-1 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  🛸
                </div>
                <div className="text-left min-w-0">
                  <div className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">Current Quest</div>
                  <div className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>Space Shuttle</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons Group */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                id="cta-race-to-100"
                href="#race-to-100"
                onClick={() => soundEffects.playPop()}
                className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 hover:from-red-600 hover:to-amber-600 active:scale-95 text-white font-bubble text-base font-bold px-6 py-3 rounded-2xl shadow-lg shadow-orange-500/30 flex items-center gap-2 transition-all border-2 border-slate-900"
              >
                <span className="text-xl animate-wiggle">🏁</span>
                First to 100 Game! 🎲
              </a>

              <a
                id="cta-explore-subjects"
                href="#subjects"
                onClick={() => soundEffects.playPop()}
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bubble text-base font-bold px-5 py-3 rounded-2xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all border-2 border-blue-400"
              >
                <Compass className="w-5 h-5 text-blue-200" />
                Math & EVS Lab
              </a>

              <a
                id="cta-toy-vault"
                href="#toy-vault"
                onClick={() => soundEffects.playPop()}
                className="bg-amber-400 hover:bg-amber-500 active:scale-95 text-amber-950 font-bubble text-base font-bold px-5 py-3 rounded-2xl shadow-lg shadow-amber-400/30 flex items-center gap-2 transition-all border-2 border-slate-900"
              >
                <Flame className="w-5 h-5 text-red-600" />
                Toy Vault Showcase
              </a>

              <button
                id="cta-hero-highfive"
                onClick={onHighFive}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:scale-95 text-white font-bubble text-base font-bold px-5 py-3 rounded-2xl shadow-lg shadow-pink-500/30 flex items-center gap-2 transition-all border-2 border-white/40"
              >
                <Hand className="w-5 h-5 animate-wiggle" />
                High-Five! ({highFiveCount})
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Avik Avatar & Photo Frame with Dress-Up Accessories */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Interactive Avatar Card */}
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Outer Decorative Comic Card Frame */}
              <div className="relative bg-white rounded-3xl p-5 sm:p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-1">
                
                {/* Top Corner Stickers */}
                <div className="absolute -top-4 -left-3 bg-yellow-300 border-2 border-slate-900 font-bubble text-xs font-black px-3 py-1 rounded-xl rotate-[-8deg] shadow-sm flex items-center gap-1">
                  ⭐ AV-8000
                </div>
                <div className="absolute -top-4 -right-3 bg-red-500 text-white border-2 border-slate-900 font-bubble text-xs font-black px-3 py-1 rounded-xl rotate-[8deg] shadow-sm flex items-center gap-1">
                  🔥 100% AWESOME
                </div>

                {/* Photo / Avatar View Switcher */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-300">
                    <button
                      id="btn-view-real-person"
                      type="button"
                      onClick={() => {
                        soundEffects.playPop();
                        setAvatarView('real');
                      }}
                      className={`px-3 py-1 rounded-lg font-bubble text-xs font-bold transition-all flex items-center gap-1.5 ${
                        avatarView === 'real'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Camera className="w-3.5 h-3.5" />
                      Real Life Person
                    </button>
                    <button
                      id="btn-view-cartoon"
                      type="button"
                      onClick={() => {
                        soundEffects.playPop();
                        setAvatarView('cartoon');
                      }}
                      className={`px-3 py-1 rounded-lg font-bubble text-xs font-bold transition-all flex items-center gap-1.5 ${
                        avatarView === 'cartoon'
                          ? 'bg-amber-400 text-slate-950 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Smile className="w-3.5 h-3.5" />
                      Cartoon
                    </button>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300 hidden sm:inline-block">
                    ● Real 3rd Grader
                  </span>
                </div>

                {/* Avatar / Photo Visual Display Area */}
                <div
                  id="avik-avatar-frame"
                  onClick={handleAvatarClick}
                  className="relative cursor-pointer group bg-gradient-to-b from-sky-200 via-indigo-100 to-amber-100 rounded-2xl p-5 flex flex-col items-center justify-center border-2 border-slate-900 overflow-hidden min-h-[320px] select-none"
                  title="Click Avik to hear what he says!"
                >
                  {/* Background Comic Rays & Shapes */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_2px,transparent_2px)] [background-size:16px_16px]" />

                  {avatarView === 'real' ? (
                    /* REAL-LIFE PERSON PHOTO OF AVIK */
                    <div className="relative z-10 flex flex-col items-center">
                      
                      {/* Floating Gear Overlay on Real Photo */}
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-5xl sm:text-6xl z-30 transition-all duration-300 transform group-hover:scale-110 drop-shadow-xl animate-wiggle">
                        {selectedOutfit === 'shades' && '🕶️'}
                        {selectedOutfit === 'astro' && '👨‍🚀'}
                        {selectedOutfit === 'cape' && '⚡'}
                        {selectedOutfit === 'crown' && '👑'}
                        {selectedOutfit === 'explorer' && '🧢'}
                      </div>

                      {/* Real Photo Card Frame with Polaroid / Explorer Styling */}
                      <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-4 border-slate-900 shadow-2xl group-hover:scale-[1.02] transition-transform duration-300 bg-white">
                        <img
                          src={avikRealPhoto}
                          alt="Real life photo of 8-year-old Avik with rocket and notebook"
                          className="w-full h-full object-cover object-top"
                        />
                        
                        {/* Live Caption Tag Overlay */}
                        <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-xs text-white text-[11px] font-bubble font-bold py-1.5 px-3 rounded-xl text-center border border-white/20 flex items-center justify-center gap-1.5 shadow-md">
                          <Camera className="w-3.5 h-3.5 text-amber-400" />
                          <span>Avik • Real Life (Age 8)</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* CARTOON ILLUSTRATION AVATAR (Alternative View) */
                    <div className="relative z-10 flex flex-col items-center">
                      {/* Head + Accessory */}
                      <div className="relative">
                        {/* Outfit Overlay Sticker */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl z-20 transition-all duration-300 transform group-hover:scale-110 drop-shadow-md">
                          {selectedOutfit === 'shades' && '🕶️'}
                          {selectedOutfit === 'astro' && '👨‍🚀'}
                          {selectedOutfit === 'cape' && '🦸‍♂️'}
                          {selectedOutfit === 'crown' && '👑'}
                          {selectedOutfit === 'explorer' && '🧢'}
                        </div>

                        {/* Boy Avatar Head Graphic */}
                        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-b from-amber-200 to-amber-300 border-4 border-slate-900 flex items-center justify-center shadow-inner relative overflow-hidden">
                          {/* Spiky Dark Hair */}
                          <div className="absolute -top-1 left-2 right-2 h-14 bg-slate-900 rounded-t-full rounded-b-xl" />
                          <div className="absolute top-2 -left-1 w-4 h-6 bg-slate-900 rounded-full rotate-45" />
                          <div className="absolute top-2 -right-1 w-4 h-6 bg-slate-900 rounded-full -rotate-45" />
                          
                          {/* Friendly Face */}
                          <div className="relative z-10 mt-6 flex flex-col items-center">
                            <div className="flex items-center gap-6">
                              <div className="w-4 h-4 bg-slate-900 rounded-full relative">
                                <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 right-0.5" />
                              </div>
                              <div className="w-4 h-4 bg-slate-900 rounded-full relative">
                                <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 right-0.5" />
                              </div>
                            </div>
                            <div className="flex items-center gap-8 mt-1">
                              <div className="w-3.5 h-2 bg-rose-400/70 rounded-full" />
                              <div className="w-3.5 h-2 bg-rose-400/70 rounded-full" />
                            </div>
                            <div className="w-8 h-4 border-b-4 border-slate-900 rounded-b-full -mt-1" />
                          </div>
                        </div>
                      </div>

                      {/* Boy Avatar Torso */}
                      <div className="w-24 h-14 bg-blue-600 rounded-t-3xl border-4 border-slate-900 -mt-2 relative z-0 flex items-center justify-center">
                        <span className="text-white font-bubble text-xs font-black tracking-wider">
                          AVIK
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Speech Bubble on Click */}
                  <div className="mt-4 bg-white px-4 py-2.5 rounded-2xl border-2 border-slate-900 shadow-md text-center max-w-xs relative z-20 transition-all duration-200">
                    <p className="text-xs sm:text-sm font-bubble font-bold text-slate-900">
                      "{funnySayings[sayingIndex]}"
                    </p>
                    <span className="text-[10px] text-blue-600 font-bold block mt-0.5">
                      👆 Click Avik to hear more! ({avatarClicks} taps)
                    </span>
                  </div>
                </div>

                {/* Dress-Up / Outfit Selector Bar */}
                <div className="mt-4 pt-3 border-t-2 border-dashed border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bubble font-bold text-slate-700 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Avik's Gear Closet:
                    </span>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                      {outfitDetails[selectedOutfit].name}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5">
                    {(['shades', 'astro', 'cape', 'crown', 'explorer'] as const).map((gear) => (
                      <button
                        key={gear}
                        id={`btn-gear-${gear}`}
                        onClick={() => {
                          soundEffects.playPop();
                          setSelectedOutfit(gear);
                        }}
                        className={`p-2 rounded-xl border-2 font-bubble text-lg flex flex-col items-center justify-center transition-all ${
                          selectedOutfit === gear
                            ? 'bg-amber-300 border-slate-900 scale-105 shadow-sm'
                            : 'bg-slate-50 border-slate-300 hover:bg-amber-100 hover:border-amber-400'
                        }`}
                        title={outfitDetails[gear].name}
                      >
                        {gear === 'shades' && '🕶️'}
                        {gear === 'astro' && '👨‍🚀'}
                        {gear === 'cape' && '🦸'}
                        {gear === 'crown' && '👑'}
                        {gear === 'explorer' && '🧢'}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Little side sticker note */}
              <div className="mt-3 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 px-3 py-1 rounded-full border border-amber-300 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Official 3rd Grade Badge Verified
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Decorative Bottom Wave / Cloud Divider Transition */}
      <div className="absolute bottom-0 left-0 right-0 leading-none pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-8 sm:h-12 fill-[#fffdf5]"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};
