import React, { useState } from 'react';
import { MapPin, Trees, Bike, Trophy, Sparkles, Castle, IceCream, Compass, Clock, CheckCircle2, Star } from 'lucide-react';
import { SOCIETY_SPOTS } from '../data/avikData';
import { SocietySpot } from '../types';
import { soundEffects } from '../utils/audio';
import { SecretSpotEasterEgg } from './SecretSpotEasterEgg';

interface NeighborhoodSectionProps {
  activeSpotId?: string;
}

export const NeighborhoodSection: React.FC<NeighborhoodSectionProps> = ({ activeSpotId }) => {
  const [selectedSpot, setSelectedSpot] = useState<SocietySpot>(SOCIETY_SPOTS[0]);
  const [visitedSpots, setVisitedSpots] = useState<{ [key: string]: boolean }>({
    'spot-playground': true,
    'spot-cycling-loop': true
  });

  const getSpotIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trees': return <Trees className="w-5 h-5" />;
      case 'Bike': return <Bike className="w-5 h-5" />;
      case 'Trophy': return <Trophy className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Castle': return <Castle className="w-5 h-5" />;
      case 'IceCream': return <IceCream className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  const toggleVisited = (spotId: string) => {
    soundEffects.playCorrect();
    setVisitedSpots(prev => ({
      ...prev,
      [spotId]: !prev[spotId]
    }));
  };

  return (
    <section id="neighborhood" className="py-16 md:py-24 bg-amber-50/40 relative border-t border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bubble font-bold mb-3 border border-emerald-300">
            <Compass className="w-4 h-4 text-emerald-600" />
            SECTION 05 • NEIGHBORHOOD MAP
          </div>
          <h2 className="font-bubble text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            My Neighborhood & Society
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Take an interactive tour of Sunlight Meadows Society! Discover where Avik races bicycles, scores sunset goals, and hangs out with friends.
          </p>
        </div>

        {/* Interactive Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Illustrated Map Canvas (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🗺️</span>
                <div>
                  <h3 className="font-bubble text-xl font-bold text-slate-900">
                    Sunlight Meadows Society Map
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Click any pin to inspect the secret hangout spot!
                  </p>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bubble font-bold px-3 py-1 rounded-full border border-emerald-300">
                Live Radar Mode 🛰️
              </span>
            </div>

            {/* Stylized Illustrated Society Map Canvas */}
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-emerald-100 via-green-50 to-amber-100 rounded-2xl border-4 border-slate-900 overflow-hidden shadow-inner select-none">
              
              {/* Map Ground Details & Roads */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                {/* Looping Track Pavement */}
                <path
                  d="M 50,80 Q 250,20 450,90 T 520,300 Q 300,380 90,320 Z"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="28"
                  strokeLinecap="round"
                  strokeDasharray="8 6"
                />
                <path
                  d="M 50,80 Q 250,20 450,90 T 520,300 Q 300,380 90,320 Z"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="4"
                />

                {/* Central Garden Circle */}
                <circle cx="28%" cy="40%" r="55" fill="#86efac" stroke="#16a34a" strokeWidth="3" />
                <circle cx="75%" cy="65%" r="45" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
              </svg>

              {/* Map Legend Label */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-900 text-[10px] font-bubble font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                GPS: Sector 4 • Block 3
              </div>

              {/* Interactive Radar Map Pins */}
              {SOCIETY_SPOTS.map((spot) => {
                const isSelected = selectedSpot.id === spot.id;

                return (
                  <button
                    key={spot.id}
                    id={`map-pin-${spot.id}`}
                    onClick={() => {
                      soundEffects.playBoing();
                      setSelectedSpot(spot);
                    }}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-200"
                    title={spot.name}
                  >
                    {/* Pulsing ring when selected */}
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full bg-blue-500/40 animate-ping" />
                    )}

                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border-2 border-slate-900 shadow-md flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white scale-125 shadow-xl ring-4 ring-amber-300'
                        : 'bg-white text-slate-900 hover:scale-110 hover:bg-amber-100'
                    }`}>
                      {getSpotIcon(spot.icon)}
                    </div>

                    {/* Spot Name Tag Hover Pill */}
                    <span className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bubble font-bold px-2 py-0.5 rounded-md border border-slate-900 transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white opacity-100 shadow-md'
                        : 'bg-white/95 text-slate-900 opacity-0 group-hover:opacity-100 shadow-sm'
                    }`}>
                      {spot.name.split(' ')[1] || spot.name}
                    </span>
                  </button>
                );
              })}

              {/* Animated Mini Bike on the track */}
              <div className="absolute bottom-6 right-8 text-2xl animate-float pointer-events-none">
                🚲💨
              </div>
            </div>

            {/* Quick Map Pins Mini Selector Bar */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4">
              {SOCIETY_SPOTS.map((spot) => (
                <button
                  key={spot.id}
                  id={`btn-spot-quick-${spot.id}`}
                  onClick={() => {
                    soundEffects.playPop();
                    setSelectedSpot(spot);
                  }}
                  className={`p-2 rounded-xl text-center border-2 text-[10px] font-bubble font-bold transition-all truncate ${
                    selectedSpot.id === spot.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-100'
                  }`}
                >
                  {spot.name.split(' ')[1] || spot.name}
                </button>
              ))}
            </div>

          </div>

          {/* Selected Spot Details & Secret Insider Tips (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] space-y-5">
              
              {/* Spot Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    {selectedSpot.secretCode}
                  </span>
                  <h4 className="font-bubble text-2xl font-bold text-slate-900 mt-2">
                    {selectedSpot.name}
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {selectedSpot.tagline}
                  </p>
                  <SecretSpotEasterEgg spotId="treehouse-pin" activeSpotId={activeSpotId || ''} className="mt-2" />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center text-2xl shrink-0 shadow-md">
                  {selectedSpot.id === 'spot-playground' && '🌳'}
                  {selectedSpot.id === 'spot-cycling-loop' && '🚴'}
                  {selectedSpot.id === 'spot-football-turf' && '⚽'}
                  {selectedSpot.id === 'spot-treehouse' && '✨'}
                  {selectedSpot.id === 'spot-clubhouse' && '🏰'}
                  {selectedSpot.id === 'spot-icecream' && '🍦'}
                </div>
              </div>

              {/* Best Time & Prime Activity */}
              <div className="space-y-2.5">
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-center gap-2 text-xs text-amber-950">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <strong className="font-bold">Prime Hangout Time:</strong> {selectedSpot.bestTime}
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 flex items-center gap-2 text-xs text-blue-950">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <strong className="font-bold">Main Action:</strong> {selectedSpot.activity}
                  </div>
                </div>
              </div>

              {/* Avik's Secret Pro-Tip */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-2xl border-2 border-indigo-200">
                <div className="flex items-center gap-1.5 text-xs font-bubble font-bold text-indigo-900 mb-1">
                  <span>🤫</span> AVIK'S INSIDER PRO-TIP:
                </div>
                <p className="text-xs text-indigo-950 leading-relaxed italic">
                  "{selectedSpot.avikTip}"
                </p>
              </div>

              {/* Playdate Checklist Button */}
              <button
                id={`btn-visit-spot-${selectedSpot.id}`}
                onClick={() => toggleVisited(selectedSpot.id)}
                className={`w-full py-3 rounded-2xl font-bubble text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border-2 border-slate-900 shadow-md ${
                  visitedSpots[selectedSpot.id]
                    ? 'bg-emerald-400 text-slate-950'
                    : 'bg-amber-300 hover:bg-amber-400 text-slate-950 active:scale-95'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {visitedSpots[selectedSpot.id]
                  ? 'Added to Playdate Route! 📍'
                  : 'Add Spot to Playdate Itinerary +'}
              </button>

            </div>

            {/* Society Fun Stat Box */}
            <div className="bg-emerald-600 text-white rounded-3xl p-5 border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] flex items-center gap-4">
              <div className="text-3xl">🏡</div>
              <div>
                <h5 className="font-bubble text-base font-bold">
                  Safe, Green & Friendly Community
                </h5>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Over 200+ kids, zero traffic zone inside the cycling track, and 3 giant playgrounds!
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
