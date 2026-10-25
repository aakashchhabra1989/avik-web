import React, { useState } from 'react';
import { Compass, Sparkles, Layers, Flame, Award, Lightbulb, Clock, CheckCircle2, RotateCw, BookOpen, Camera } from 'lucide-react';
import { AVIK_PROFILE } from '../data/avikData';
import { soundEffects } from '../utils/audio';
import avikRealPhoto from '../assets/images/avik_real_photo_1792919013034.jpg';
import { SecretSpotEasterEgg } from './SecretSpotEasterEgg';

interface AboutSectionProps {
  activeSpotId?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ activeSpotId }) => {
  const [activeFactIndex, setActiveFactIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTimelineSlot, setSelectedTimelineSlot] = useState(3); // 5:00 PM Cycling by default

  const timeline = [
    {
      time: '7:30 AM',
      title: 'Morning Launch & Balcony Plants',
      description: 'Watering the sunflower pots, eating yummy honey pancakes, and packing the backpack with color markers!',
      icon: '🌱',
      badge: 'Green Routine'
    },
    {
      time: '9:00 AM',
      title: '3rd Grade Science & Math Missions',
      description: 'Solving speed arithmetic, learning about plant photosynthesis, and trading fun riddles with classmates.',
      icon: '🎒',
      badge: 'Brain Power'
    },
    {
      time: '3:30 PM',
      title: 'Snack Fuel & Homework Blitz',
      description: 'Crunching cheesy nachos or crunchy apples while finishing math worksheets in 15 minutes flat!',
      icon: '🧀',
      badge: 'Fast Finisher'
    },
    {
      time: '5:00 PM',
      title: 'Turbo Cycling & Society Turf Games',
      description: 'Zooming on the cycling track with the neighborhood bike crew and playing 5v5 sunset football!',
      icon: '🚴',
      badge: 'Outdoor Action'
    },
    {
      time: '7:30 PM',
      title: 'LEGO Space Lab & Comic Creation',
      description: 'Designing new trapdoors for LEGO pirate ships and writing Chapter 4 of the Robo-Pug comic book!',
      icon: '🧱',
      badge: 'Creative Lab'
    },
    {
      time: '9:00 PM',
      title: 'Stargazing & Adventure Reading',
      description: 'Reading Greek mythology or Percy Jackson with a flashlight, dreaming of exploring Jupiter\'s moons!',
      icon: '📖',
      badge: 'Cosmic Dreams'
    }
  ];

  const handleNextFact = () => {
    soundEffects.playBoing();
    setIsSpinning(true);
    setTimeout(() => {
      setActiveFactIndex(prev => (prev + 1) % AVIK_PROFILE.funFacts.length);
      setIsSpinning(false);
    }, 250);
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-white/70 relative border-y border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-xs font-bubble font-bold mb-3 border border-blue-200">
            <Compass className="w-4 h-4 text-blue-600" />
            SECTION 01 • DISCOVER AVIK
          </div>
          <h2 className="font-bubble text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            About the 3rd Grade Explorer
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Curious about everything from atomic particles to black holes, Avik is an enthusiastic 8-year-old explorer with big ideas and endless energy!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Explorer Passport & Official Stats */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Holographic-Styled Explorer Passport */}
            <div className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border-4 border-amber-300 shadow-xl shadow-indigo-950/20 overflow-hidden">
              {/* Gold foil header banner */}
              <div className="flex items-center justify-between border-b border-blue-400/30 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌍</span>
                  <div>
                    <h3 className="font-bubble text-lg font-bold tracking-wide text-amber-300">
                      EXPLORER PASSPORT
                    </h3>
                    <p className="text-[10px] text-blue-200 uppercase tracking-widest font-bold">
                      Grade 3 Division • Cadet ID: AV-2018
                    </p>
                  </div>
                </div>
                <div className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bubble font-bold px-2.5 py-1 rounded-full">
                  ACTIVE LEVEL 8
                </div>
              </div>

              {/* Passport Bio & Real Photo Header */}
              <div className="flex items-center gap-4 py-3 border-b border-blue-800/60 mb-3 bg-blue-950/40 p-3 rounded-2xl border border-blue-800/40">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md shrink-0 bg-slate-900">
                  <img
                    src={avikRealPhoto}
                    alt="Official Passport Photo of Avik"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 font-black text-[7px] px-1 rounded-bl">
                    PHOTO ID
                  </div>
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-blue-300 uppercase font-black tracking-wider block">Official Cadet</span>
                    <span className="text-[9px] bg-emerald-500/30 text-emerald-300 px-1.5 py-0.2 rounded font-mono font-bold">● VERIFIED</span>
                  </div>
                  <h4 className="font-bubble text-xl sm:text-2xl font-black text-white">Avik</h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs font-bubble text-amber-300 font-bold">Grade 3 Explorer • Age 8</p>
                    <SecretSpotEasterEgg spotId="passport-seal" activeSpotId={activeSpotId || ''} />
                  </div>
                </div>
              </div>

              {/* Passport Details */}
              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-blue-800/60">
                  <span className="text-blue-300 text-xs uppercase font-bold">Special Ability</span>
                  <span className="font-semibold text-white text-right max-w-[200px] text-xs">
                    Rapid Problem Solving & Track Speeds
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-blue-800/60">
                  <span className="text-blue-300 text-xs uppercase font-bold">Dream Career</span>
                  <span className="font-semibold text-emerald-300 text-right text-xs">
                    Astronaut & LEGO Architect 🛸
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-blue-300 text-xs uppercase font-bold">Motto</span>
                  <span className="italic text-xs text-blue-100 font-medium">
                    "{AVIK_PROFILE.motto}"
                  </span>
                </div>
              </div>

              {/* Official Seal Stamp */}
              <div className="mt-6 pt-4 border-t border-blue-400/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-indigo-950 font-black text-xs flex items-center justify-center border border-white">
                    3RD
                  </div>
                  <span className="text-[11px] text-blue-200 font-bold">
                    Official Grade 3 Stamp
                  </span>
                </div>
                <div className="text-[11px] text-emerald-300 font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  VERIFIED PASS
                </div>
              </div>
            </div>

            {/* 4 Fun Metric Badges */}
            <div className="grid grid-cols-2 gap-3">
              {AVIK_PROFILE.stats.map((stat, idx) => (
                <div
                  key={idx}
                  onClick={() => soundEffects.playPop()}
                  className="bg-white p-4 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">{stat.label}</span>
                    <span className="text-lg">
                      {idx === 0 && '✨'}
                      {idx === 1 && '🧱'}
                      {idx === 2 && '🏎️'}
                      {idx === 3 && '🏆'}
                    </span>
                  </div>
                  <div className="font-bubble text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: "A Day in Avik's Life" Timeline & Fun Fact Dispenser */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Timeline Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bubble text-xl sm:text-2xl font-bold text-slate-900">
                    A Day in Avik's Life
                  </h3>
                </div>
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  Interactive Schedule
                </span>
              </div>

              {/* Timeline Horizontal / Grid Selector */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-5">
                {timeline.map((item, idx) => (
                  <button
                    key={idx}
                    id={`btn-timeline-${idx}`}
                    onClick={() => {
                      soundEffects.playPop();
                      setSelectedTimelineSlot(idx);
                    }}
                    className={`p-2 rounded-xl text-center border-2 transition-all flex flex-col items-center justify-center ${
                      selectedTimelineSlot === idx
                        ? 'bg-blue-600 text-white border-slate-900 shadow-md scale-105'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:border-blue-300'
                    }`}
                  >
                    <span className="text-xl mb-0.5">{item.icon}</span>
                    <span className="text-[10px] font-bold block">{item.time}</span>
                  </button>
                ))}
              </div>

              {/* Selected Timeline Slot Details View */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-5 rounded-2xl border-2 border-amber-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                  {timeline[selectedTimelineSlot].icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-amber-700 bg-amber-200/70 px-2 py-0.5 rounded-md">
                      {timeline[selectedTimelineSlot].time}
                    </span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                      {timeline[selectedTimelineSlot].badge}
                    </span>
                  </div>
                  <h4 className="font-bubble text-lg font-bold text-slate-900">
                    {timeline[selectedTimelineSlot].title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {timeline[selectedTimelineSlot].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Random Fun Fact Dispenser Card */}
            <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 rounded-3xl p-6 border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] text-slate-900">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-950" />
                  <span className="font-bubble text-base sm:text-lg font-bold text-yellow-950">
                    Avik's Mystery Fun Fact Dispenser
                  </span>
                </div>
                <span className="text-xs font-black bg-white px-2.5 py-1 rounded-full border border-slate-900 shadow-xs">
                  Fact #{activeFactIndex + 1} of {AVIK_PROFILE.funFacts.length}
                </span>
              </div>

              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border-2 border-slate-900 min-h-[90px] flex items-center shadow-inner">
                <p className="font-bubble text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  "{AVIK_PROFILE.funFacts[activeFactIndex]}"
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-yellow-950">
                  💡 Click button to spin for a new secret fact!
                </span>
                <button
                  id="btn-spin-fact"
                  onClick={handleNextFact}
                  disabled={isSpinning}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bubble text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
                  Spin Next Fact!
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
