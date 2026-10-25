import React, { useState, useEffect, useRef } from 'react';
import {
  PackageOpen,
  Sparkles,
  Search,
  Dice5,
  Eye,
  Flame,
  Layers,
  Shield,
  Trophy,
  KeyRound,
  Lock,
  Unlock,
  Zap,
  Timer,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  RotateCcw,
  Compass,
  Dices
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOY_ITEMS } from '../data/avikData';
import { ToyItem } from '../types';
import { ToyModal } from './ToyModal';
import { soundEffects } from '../utils/audio';
import { SecretSpot, subscribeToCodeFlash } from '../utils/secretSpot';

const SECRET_TOY_1922: ToyItem = {
  id: 'secret-1922-hyper-mach',
  name: 'Classified Prototype #1922: Golden Mach-Infinity',
  category: 'hotwheels',
  categoryLabel: 'Classified Prototype',
  image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&auto=format&fit=crop&q=80',
  badge: 'CODE 1922 UNLOCKED 🏆',
  rating: 5,
  stats: {
    label1: 'Secret Tech Core',
    val1: '1,922 TeraWatts',
    label2: 'Speedway Record',
    val2: 'Mach ∞'
  },
  description: 'Ultra-rare classified prototype speeder unlocked exclusively via secret access code 1922! Features gold-infused titanium plating, quantum aero-wings, and infinite hyper-boost loop thrusters.',
  story: 'Engineered in secret under the bed using titanium die-cast parts, neon LED light strips, and complex orbital math calculations Avik solved during 3rd grade lunch break.',
  favoriteFeature: 'Gold-plated aerodynamic canopy with active aero wings and secret rocket exhaust.',
  color: 'from-amber-400 via-yellow-500 to-amber-600'
};

interface ToyVaultSectionProps {
  activeSpot?: SecretSpot;
  onShuffleSpot?: () => void;
}

export const ToyVaultSection: React.FC<ToyVaultSectionProps> = ({
  activeSpot,
  onShuffleSpot
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'hotwheels' | 'lego' | 'superhero' | 'boardgames' | 'classified'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedToy, setInspectedToy] = useState<ToyItem | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [showClueRadar, setShowClueRadar] = useState(true);

  // Secret Code 1922 States
  const [isCodeFlashed, setIsCodeFlashed] = useState(false);
  const [flashTimeRemaining, setFlashTimeRemaining] = useState(100); // 100% down to 0%
  const [enteredCode, setEnteredCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  // Vault starts LOCKED so no cars/cards are shown until code 1922 is unlocked!
  const [isVaultUnlocked, setIsVaultUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('avik_vault_1922_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const flashTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // All toys include the secret prototype once unlocked
  const allToys = isVaultUnlocked ? [SECRET_TOY_1922, ...TOY_ITEMS] : [];

  const categories = [
    { id: 'all', label: 'All Toys', icon: '🌟', count: allToys.length },
    { id: 'hotwheels', label: 'Hot Wheels', icon: '🏎️', count: allToys.filter(t => t.category === 'hotwheels').length },
    { id: 'lego', label: 'LEGO Builds', icon: '🧱', count: allToys.filter(t => t.category === 'lego').length },
    { id: 'superhero', label: 'Superheroes', icon: '🦸', count: allToys.filter(t => t.category === 'superhero').length },
    { id: 'boardgames', label: 'Board Games', icon: '🎲', count: allToys.filter(t => t.category === 'boardgames').length },
    { id: 'classified', label: 'Secret #1922', icon: '🏆', count: 1 }
  ];

  const filteredToys = allToys.filter(item => {
    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'classified' ? item.id === SECRET_TOY_1922.id : item.category === activeCategory);
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle triggering the 1-second secret code flash
  const handleFlashSecretCode = () => {
    soundEffects.playPowerup();

    // Clear any existing timer
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    setIsCodeFlashed(true);
    setFlashTimeRemaining(100);

    // Progress tick over strictly 1000ms (1.0 second)
    const startTime = Date.now();
    const duration = 1000;

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setFlashTimeRemaining(remaining);

      if (elapsed >= duration) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      }
    }, 20);

    // Turn off after exactly 1 second (1000ms)
    flashTimerRef.current = setTimeout(() => {
      setIsCodeFlashed(false);
      setFlashTimeRemaining(0);
      soundEffects.playWhoosh();
    }, 1000);
  };

  // Subscribe to global flash events when user discovers the secret hidden spot anywhere
  useEffect(() => {
    const unsubscribe = subscribeToCodeFlash(() => {
      handleFlashSecretCode();
    });

    return () => {
      unsubscribe();
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  // Handle submitting the secret code 1922
  const handleCodeSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (enteredCode.trim() === '1922') {
      soundEffects.playFanfare();
      setIsVaultUnlocked(true);
      setCodeError(false);
      setEnteredCode('');
      try {
        localStorage.setItem('avik_vault_1922_unlocked', 'true');
      } catch {}

      // Confetti burst
      confetti({
        particleCount: 160,
        spread: 95,
        origin: { y: 0.6 }
      });

      // Automatically inspect the unlocked secret toy
      setInspectedToy(SECRET_TOY_1922);
    } else {
      soundEffects.playBuzzer();
      setCodeError(true);
      setTimeout(() => setCodeError(false), 2500);
    }
  };

  // Lock the vault back
  const handleLockVault = () => {
    soundEffects.playWhoosh();
    setIsVaultUnlocked(false);
    setEnteredCode('');
    try {
      localStorage.setItem('avik_vault_1922_unlocked', 'false');
    } catch {}
  };

  const handleSurpriseMe = () => {
    if (!isVaultUnlocked || allToys.length === 0) return;
    soundEffects.playBoing();
    setIsRolling(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * allToys.length);
      const chosenToy = allToys[randomIndex];
      setInspectedToy(chosenToy);
      setIsRolling(false);
    }, 400);
  };

  return (
    <section id="toy-vault" className="py-16 md:py-24 bg-white relative">
      
      {/* 1-SECOND SECRET CODE FLASH POPUP (Strictly 1000ms) */}
      {isCodeFlashed && (
        <div className="fixed inset-x-4 top-24 z-50 max-w-sm sm:max-w-md mx-auto animate-bounce pointer-events-none select-none">
          <div className="bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 p-1.5 rounded-3xl shadow-[0_10px_35px_rgba(239,68,68,0.5)] border-4 border-slate-950">
            <div className="bg-slate-950 text-white p-5 rounded-[20px] text-center space-y-2 relative overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between text-xs font-bubble font-black text-amber-300">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-yellow-300 animate-spin" />
                  SECRET CODE FOUND!
                </span>
                <span className="font-mono bg-red-600 text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                  ⏱️ 1.0 SECOND FLASH!
                </span>
              </div>

              {/* Glowing 1922 Digits */}
              <div className="py-1">
                <div className="font-mono text-5xl sm:text-6xl font-black text-amber-400 tracking-[0.25em] drop-shadow-[0_0_20px_rgba(251,191,36,0.9)] animate-pulse">
                  1922
                </div>
              </div>

              {/* Live 1-Second Depletion Progress Bar */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-red-500 rounded-full transition-all duration-75"
                  style={{ width: `${flashTimeRemaining}%` }}
                />
              </div>

              <p className="text-[11px] text-amber-200 font-bold">
                ⚡ Code 1922 is vanishing! Run to the Toy Vault to unlock all cars!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-1.5 rounded-full text-xs font-bubble font-bold mb-3 border border-red-200">
            <PackageOpen className="w-4 h-4 text-red-600" />
            SECTION 04 • PRIZED COLLECTIONS
          </div>
          <h2 className="font-bubble text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            The Ultimate Toy Vault
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Avik's prized high-speed Hot Wheels, master LEGO builds, and hero figures are kept safe inside the Classified Security Vault!
          </p>
        </div>

        {/* =========================================================================
            SECRET CODE VAULT TERMINAL (Code: 1922)
            ========================================================================= */}
        <div className="mb-10 max-w-3xl mx-auto bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-6 border-4 border-amber-400 shadow-[6px_6px_0px_0px_rgba(245,158,11,1)] text-white relative overflow-hidden">
          
          {/* Background matrix glow */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative z-10 space-y-4">
            
            {/* Terminal Title Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black shadow-md ${
                  isVaultUnlocked ? 'bg-emerald-400 text-slate-950' : 'bg-amber-400 text-slate-950'
                }`}>
                  {isVaultUnlocked ? <Unlock className="w-5 h-5 text-emerald-950" /> : <Lock className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bubble text-lg font-bold text-amber-300 flex items-center gap-2">
                    Classified Vault Keypad
                    {isVaultUnlocked ? (
                      <span className="text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-black">
                        VAULT UNLOCKED • ALL CARDS VISIBLE 🔓
                      </span>
                    ) : (
                      <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-black">
                        LOCKED • CODE HIDDEN IN RANDOM SPOT
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {isVaultUnlocked
                      ? 'Access granted! All cars and collection cards are now unlocked below.'
                      : 'Cars and cards are hidden! Hunt down the secret spot in Avik\'s world to discover the 4-digit code.'}
                  </p>
                </div>
              </div>

              {/* Scavenger Hunt Controls */}
              <div className="flex items-center gap-2">
                <button
                  id="btn-toggle-clue"
                  onClick={() => setShowClueRadar(!showClueRadar)}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bubble text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs border border-slate-950 flex items-center gap-1 active:scale-95 transition-all"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>{showClueRadar ? 'Hide Clue' : 'Show Clue 🧭'}</span>
                </button>

                {onShuffleSpot && (
                  <button
                    id="btn-shuffle-spot"
                    onClick={() => {
                      soundEffects.playPop();
                      onShuffleSpot();
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-300 font-bubble text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1 active:scale-95 transition-all"
                    title="Hide the secret code in a new random spot!"
                  >
                    <Dices className="w-3.5 h-3.5" />
                    <span>Shuffle Spot</span>
                  </button>
                )}

                {isVaultUnlocked && (
                  <button
                    id="btn-relock-vault"
                    onClick={handleLockVault}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bubble text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1 active:scale-95 transition-all"
                    title="Lock the vault back to hide the cars"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Lock Vault</span>
                  </button>
                )}
              </div>
            </div>

            {/* Radar Clue Box */}
            {showClueRadar && !isVaultUnlocked && (
              <div className="bg-amber-950/60 p-3 sm:p-3.5 rounded-2xl border border-amber-500/50 flex items-center justify-between gap-3 animate-fadeIn">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm shrink-0">
                    🧭
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-black tracking-wider text-amber-400 block">
                      Secret Spot Clue ({activeSpot?.section || 'Avik\'s World'}):
                    </span>
                    <p className="text-xs font-bubble font-bold text-amber-100">
                      {activeSpot?.clue || "🔍 Search Avik's World to find the hidden detective button!"}
                    </p>
                  </div>
                </div>

                <div className="bg-amber-400/20 text-amber-300 font-mono text-[10px] font-bold px-2.5 py-1.5 rounded-xl border border-amber-400/30 shrink-0">
                  🕵️‍♂️ Hidden Spot Active
                </div>
              </div>
            )}

            {/* Keypad Input Form & Digital Screen */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              
              {/* Digital Screen Display (Left 5 Cols) */}
              <div className="sm:col-span-5 bg-black/70 rounded-2xl p-3 border-2 border-slate-700 flex flex-col items-center justify-center space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  VAULT STATUS SCREEN
                </span>

                <div className="font-mono text-3xl font-black tracking-widest h-10 flex items-center justify-center">
                  {isCodeFlashed ? (
                    <span className="text-amber-400 animate-pulse text-3xl">1922</span>
                  ) : isVaultUnlocked ? (
                    <span className="text-emerald-400 text-2xl font-bold">UNLOCKED</span>
                  ) : (
                    <span className="text-slate-600 text-2xl">•••• [LOCKED]</span>
                  )}
                </div>

                <div className="text-[10px] font-mono text-slate-400">
                  {isCodeFlashed ? (
                    <span className="text-red-400 font-bold">⚠️ VANISHING IN 1s!</span>
                  ) : isVaultUnlocked ? (
                    <span className="text-emerald-400">All Cars & Cards Visible Below</span>
                  ) : (
                    'Enter 4-digit secret PIN to open vault'
                  )}
                </div>
              </div>

              {/* Input Form & Buttons (Right 7 Cols) */}
              <div className="sm:col-span-7 space-y-2">
                <form onSubmit={handleCodeSubmit} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="input-vault-code"
                      type="text"
                      maxLength={4}
                      value={enteredCode}
                      onChange={(e) => setEnteredCode(e.target.value)}
                      placeholder="Enter 4-digit PIN (••••)"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800 border-2 border-slate-700 text-white font-mono text-sm tracking-wider placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <button
                    id="btn-submit-vault-code"
                    type="submit"
                    className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bubble text-xs font-bold px-4 py-2.5 rounded-xl shadow-md border border-slate-950 active:scale-95 transition-all shrink-0"
                  >
                    Unlock 🔓
                  </button>
                </form>

                {/* Status and Error Messages */}
                <div className="flex items-center justify-between text-[11px] min-h-[22px]">
                  {codeError ? (
                    <span className="text-red-400 font-bold flex items-center gap-1 animate-pulse">
                      <AlertCircle className="w-3.5 h-3.5" />
                      ❌ Incorrect Code! Access Denied. Keep hunting for the secret spot.
                    </span>
                  ) : isVaultUnlocked ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Vault Open (9 Cards Revealed)
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-500" />
                      Find the secret spot on the page to reveal the PIN.
                    </span>
                  )}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =========================================================================
            STATE 1: VAULT LOCKED (DO NOT SHOW ANY CARS / CARDS)
            ========================================================================= */}
        {!isVaultUnlocked ? (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            
            {/* Giant Blast Door Vault Shield Card */}
            <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 rounded-3xl p-8 sm:p-12 border-4 border-slate-950 shadow-2xl text-center space-y-6 relative overflow-hidden text-white">
              
              {/* Hazard Stripes border accents */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-[repeating-linear-gradient(45deg,#eab308,#eab308_10px,#0f172a_10px,#0f172a_20px)] opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 h-3 bg-[repeating-linear-gradient(45deg,#eab308,#eab308_10px,#0f172a_10px,#0f172a_20px)] opacity-80" />

              {/* Giant Armored Vault Lock Icon */}
              <div className="relative inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-950 border-4 border-amber-400 shadow-xl">
                <Lock className="w-12 h-12 text-amber-400 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-600 border-2 border-white animate-ping" />
              </div>

              <div className="space-y-2">
                <span className="inline-block bg-red-600/30 text-red-300 border border-red-500/50 font-bubble text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                  SECURITY CLEARANCE REQUIRED
                </span>
                
                <h3 className="font-bubble text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  Toy Cars & Collection Locked! 🔒
                </h3>

                <p className="font-bubble text-slate-300 text-sm sm:text-base max-w-lg mx-auto font-medium">
                  None of the cars or collection cards are visible right now. Follow the clue to discover where the secret 4-digit code is hidden, then enter it on the keypad!
                </p>
              </div>

              {/* Jump to Keypad Action */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  id="btn-locked-focus-keypad"
                  onClick={() => {
                    const inputEl = document.getElementById('input-vault-code');
                    if (inputEl) {
                      inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      inputEl.focus();
                    }
                  }}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bubble text-sm font-black px-6 py-3 rounded-2xl border-2 border-slate-950 shadow-lg active:scale-95 transition-all flex items-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Enter PIN on Keypad 🔑</span>
                </button>
              </div>

            </div>

            {/* Mystery Locked Card Silhouettes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bubble font-bold text-slate-500 px-2">
                <span>🔐 8 ENCRYPTED TOY CARDS LOCKED IN VAULT</span>
                <span>STATUS: LOCKED • PIN REQUIRED</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { title: 'Classified Car #1', type: '🏎️ Hot Wheels' },
                  { title: 'Classified Car #2', type: '🏎️ Classic Muscle' },
                  { title: 'Classified Build', type: '🧱 LEGO Space' },
                  { title: 'Mythic Prototype', type: '🏆 Secret Vault Item' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-100 rounded-3xl p-5 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-600 flex items-center justify-center text-xl font-black">
                      🔒
                    </div>
                    <div>
                      <div className="font-bubble text-xs font-bold text-slate-700">
                        {item.title}
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold block">
                        {item.type}
                      </span>
                    </div>
                    <span className="text-[9px] text-amber-600 font-bold bg-amber-100/80 px-2 py-0.5 rounded-full">
                      Locked • Need PIN
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* =========================================================================
              STATE 2: VAULT UNLOCKED (SHOW ALL CARS & CARDS!)
              ========================================================================= */
          <div className="space-y-8 animate-fadeIn">
            
            {/* Success Unlocked Banner */}
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-3xl p-4 sm:p-5 border-4 border-slate-950 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white text-emerald-700 flex items-center justify-center font-black text-xl shadow-md shrink-0">
                  🎉
                </div>
                <div>
                  <h4 className="font-bubble text-base sm:text-lg font-black tracking-tight">
                    Vault Code 1922 Accepted! All Cards & Cars Unlocked!
                  </h4>
                  <p className="text-xs text-emerald-100 font-medium">
                    You can now browse, filter, inspect, and explore all 9 prized toy items and cars in the showroom.
                  </p>
                </div>
              </div>

              <button
                id="btn-relock-banner"
                onClick={handleLockVault}
                className="bg-slate-950 hover:bg-slate-900 text-white font-bubble text-xs font-bold px-4 py-2 rounded-xl border border-white/20 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Re-lock Vault</span>
              </button>
            </div>

            {/* Controls Bar: Category Filters + Search Bar + Surprise Button */}
            <div className="space-y-4">
              
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    id={`btn-toy-cat-${cat.id}`}
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveCategory(cat.id as typeof activeCategory);
                    }}
                    className={`px-4 py-2.5 rounded-2xl font-bubble text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border-2 ${
                      activeCategory === cat.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                        : 'bg-amber-50/70 text-slate-700 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      activeCategory === cat.id ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search & Surprise Roll Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-2xl mx-auto">
                {/* Search input */}
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-toy-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search toys by name, brick count, or car model..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-slate-300 focus:border-blue-500 focus:outline-none text-xs sm:text-sm font-semibold bg-slate-50 placeholder:text-slate-400 transition-colors"
                  />
                </div>

                {/* Surprise Me Button */}
                <button
                  id="btn-surprise-toy"
                  onClick={handleSurpriseMe}
                  disabled={isRolling}
                  className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-bubble text-xs font-bold px-5 py-2.5 rounded-2xl border-2 border-slate-900 shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Dice5 className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
                  Surprise Toy Roll! 🎲
                </button>
              </div>

            </div>

            {/* Toys Grid: ALL CARS & CARDS DISPLAYED */}
            {filteredToys.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredToys.map((toy) => {
                  const isSecret1922 = toy.id === SECRET_TOY_1922.id;
                  return (
                    <div
                      key={toy.id}
                      id={`toy-card-${toy.id}`}
                      onClick={() => {
                        soundEffects.playPop();
                        setInspectedToy(toy);
                      }}
                      className={`bg-white rounded-3xl border-4 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col overflow-hidden group relative ${
                        isSecret1922 ? 'border-amber-400 ring-4 ring-amber-300/40' : 'border-slate-900'
                      }`}
                    >
                      {/* Secret 1922 Top Tag */}
                      {isSecret1922 && (
                        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-slate-950 font-bubble text-[10px] font-black py-1 px-3 text-center border-b-2 border-slate-900 flex items-center justify-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          CLASSIFIED CODE 1922 PROTOTYPE
                        </div>
                      )}

                      {/* Toy Image Thumbnail with Badge Overlay */}
                      <div className="relative h-48 bg-slate-100 overflow-hidden shrink-0">
                        <img
                          src={toy.image}
                          alt={toy.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Category Pill */}
                        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white font-bubble text-[11px] font-bold px-2.5 py-1 rounded-full">
                          {toy.categoryLabel}
                        </div>

                        {/* Badge */}
                        <div className="absolute bottom-3 left-3 bg-amber-400 text-slate-950 font-bubble text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-slate-900 shadow-sm">
                          {toy.badge}
                        </div>

                        {/* Hover Inspect Icon */}
                        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-white text-slate-900 font-bubble text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5 text-blue-600" />
                            Inspect Toy
                          </span>
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h3 className="font-bubble text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                            {toy.name}
                          </h3>
                          <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                            {toy.description}
                          </p>
                        </div>

                        {/* Micro Specs */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          <span className="text-slate-500 font-semibold">{toy.stats.label1}:</span>
                          <span className="font-bold text-slate-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {toy.stats.val1}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-amber-50/50 rounded-3xl border-2 border-dashed border-amber-300">
                <span className="text-4xl block mb-2">🔍</span>
                <h4 className="font-bubble text-xl font-bold text-slate-900">
                  No toys found matching "{searchQuery}"
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Try searching for "Hot Wheels", "LEGO", "Batman", or clear the search query!
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 bg-slate-900 text-white font-bubble text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Clear Search
                </button>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Toy Inspection Modal */}
      <ToyModal
        toy={inspectedToy}
        onClose={() => setInspectedToy(null)}
      />
    </section>
  );
};
