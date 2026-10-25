import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, VolumeX, Hand, Compass, Calculator, Bike, PackageOpen, MapPin, PartyPopper, Dices } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface NavbarProps {
  highFiveCount: number;
  onHighFive: () => void;
  discoMode: boolean;
  onToggleDisco: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  highFiveCount,
  onHighFive,
  discoMode,
  onToggleDisco,
}) => {
  const [soundOn, setSoundOn] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = soundEffects.toggleSound();
    setSoundOn(next);
    if (next) soundEffects.playPop();
  };

  const navLinks = [
    { label: 'Race to 100 🎲', href: '#race-to-100', icon: Dices },
    { label: 'About', href: '#about', icon: Compass },
    { label: 'Math & EVS', href: '#subjects', icon: Calculator },
    { label: 'Hobbies', href: '#hobbies', icon: Bike },
    { label: 'Toy Vault', href: '#toy-vault', icon: PackageOpen },
    { label: 'Society Map', href: '#neighborhood', icon: MapPin },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-amber-900/5 py-2.5 border-b border-amber-200/60'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-amber-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="nav-brand-logo"
          href="#"
          onClick={() => soundEffects.playPop()}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-amber-400 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-xl">
              🚀
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bubble text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-600 bg-clip-text text-transparent">
                Avik's World
              </span>
              <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 rounded-full border border-amber-300">
                Grade 3
              </span>
            </div>
            <p className="text-[11px] text-amber-600 font-bold tracking-wide hidden sm:block">
              A Big World • Play Like Every Day 🎮
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-1 bg-amber-50/80 p-1.5 rounded-full border border-amber-200/70 shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                onClick={() => soundEffects.playPop()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-700 hover:bg-white rounded-full transition-all duration-150 hover:shadow-sm"
              >
                <Icon className="w-3.5 h-3.5 text-blue-600" />
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle Button */}
          <button
            id="btn-sound-toggle"
            onClick={toggleSound}
            title={soundOn ? 'Sound is ON (Click to Mute)' : 'Sound is MUTED (Click to Enable)'}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all ${
              soundOn
                ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
            }`}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            <span className="hidden sm:inline">{soundOn ? 'Sound On' : 'Muted'}</span>
          </button>

          {/* Disco / Party Mode Button */}
          <button
            id="btn-disco-toggle"
            onClick={() => {
              soundEffects.playBoing();
              onToggleDisco();
            }}
            title="Toggle Fun Disco Lights"
            className={`p-2 rounded-full border transition-all ${
              discoMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400 shadow-md animate-pulse'
                : 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* High Five Quick Button */}
          <button
            id="btn-nav-high-five"
            onClick={onHighFive}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white font-bubble text-sm font-bold px-3.5 py-1.5 rounded-full shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Hand className="w-4 h-4 animate-wiggle" />
            <span className="hidden sm:inline">High-Five!</span>
            <span className="bg-white/25 px-1.5 py-0.5 rounded-full text-xs font-black">
              {highFiveCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <span className="text-lg">☰</span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-nav-dropdown" className="lg:hidden bg-white border-b border-amber-200 px-4 py-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    soundEffects.playPop();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/60 hover:bg-blue-50 text-xs font-bold text-slate-800 hover:text-blue-700 border border-amber-200/50"
                >
                  <Icon className="w-4 h-4 text-blue-600" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
