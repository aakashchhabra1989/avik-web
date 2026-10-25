import React, { useState } from 'react';
import { Bike, Gamepad2, Trophy, Palette, BookOpen, Layers, Sparkles, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { HOBBIES } from '../data/avikData';
import { soundEffects } from '../utils/audio';
import { SecretSpotEasterEgg } from './SecretSpotEasterEgg';

interface HobbiesSectionProps {
  activeSpotId?: string;
}

export const HobbiesSection: React.FC<HobbiesSectionProps> = ({ activeSpotId }) => {
  const [selectedHobbyId, setSelectedHobbyId] = useState<string>('cycling');
  const [completedChallenges, setCompletedChallenges] = useState<{ [key: string]: boolean }>({});

  const hobbyChallenges: { [key: string]: { title: string; task: string } } = {
    cycling: {
      title: 'Turbo Track Challenge',
      task: 'Can you balance on one foot while pedaling safely or count 5 speed bumps?'
    },
    lego: {
      title: 'Master Brick Challenge',
      task: 'Build a spaceship with at least 2 wings and 1 secret radar dish!'
    },
    gaming: {
      title: 'Redstone Logic Quest',
      task: 'Can you design a secret piston door in Minecraft without using guides?'
    },
    football: {
      title: 'Golden Boot Accuracy',
      task: 'Hit the crossbar or cone from 10 paces with your favorite foot!'
    },
    drawing: {
      title: 'Comic Hero Creator',
      task: 'Invent a new superhero animal sidekick for Robo-Pug with a special superpower!'
    },
    reading: {
      title: 'Speed Chapter Challenge',
      task: 'Read 2 exciting chapters and write down the villain\'s secret plan!'
    }
  };

  const getHobbyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bike': return <Bike className="w-6 h-6" />;
      case 'Blocks': return <Layers className="w-6 h-6" />;
      case 'Gamepad2': return <Gamepad2 className="w-6 h-6" />;
      case 'Trophy': return <Trophy className="w-6 h-6" />;
      case 'Palette': return <Palette className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const toggleChallenge = (id: string) => {
    soundEffects.playCorrect();
    setCompletedChallenges(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const activeHobby = HOBBIES.find(h => h.id === selectedHobbyId) || HOBBIES[0];

  return (
    <section id="hobbies" className="py-16 md:py-24 bg-amber-50/60 relative border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full text-xs font-bubble font-bold mb-3 border border-purple-200">
            <Gamepad2 className="w-4 h-4 text-purple-600" />
            SECTION 03 • ADVENTURE & PLAY
          </div>
          <h2 className="font-bubble text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Hobbies & Fun Activities
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            When he isn't solving math riddles, you'll find Avik zooming on the bicycle track, snapping LEGO bricks, or drawing action comics!
          </p>
        </div>

        {/* 6 Hobby Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {HOBBIES.map((hobby) => {
            const isSelected = selectedHobbyId === hobby.id;

            return (
              <div
                key={hobby.id}
                id={`card-hobby-${hobby.id}`}
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedHobbyId(hobby.id);
                }}
                className={`bg-white rounded-3xl p-6 border-4 border-slate-900 transition-all cursor-pointer flex flex-col justify-between relative group ${
                  isSelected
                    ? 'shadow-[8px_8px_0px_0px_rgba(37,99,235,1)] -translate-y-1 ring-2 ring-blue-500'
                    : 'shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Bar: Icon + Skill Rating */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${
                      hobby.id === 'cycling' ? 'bg-blue-500' :
                      hobby.id === 'lego' ? 'bg-red-500' :
                      hobby.id === 'gaming' ? 'bg-purple-600' :
                      hobby.id === 'football' ? 'bg-emerald-500' :
                      hobby.id === 'drawing' ? 'bg-orange-500' : 'bg-indigo-600'
                    }`}>
                      {getHobbyIcon(hobby.icon)}
                    </div>
                    <span className="text-[11px] font-bubble font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                      {hobby.skillLevel}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="font-bubble text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {hobby.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {hobby.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {hobby.description}
                  </p>

                  {/* Badges List */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {hobby.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold bg-amber-100/80 text-amber-900 px-2 py-0.5 rounded-md border border-amber-200"
                      >
                        ⭐ {badge}
                      </span>
                    ))}
                  </div>

                  {hobby.id === 'lego' && (
                    <div className="pt-1">
                      <SecretSpotEasterEgg spotId="lego-brick" activeSpotId={activeSpotId || ''} />
                    </div>
                  )}
                </div>

                {/* Bottom Stat Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px]">
                    <span className="text-slate-400 font-bold block">Record Stat</span>
                    <span className="font-bubble font-bold text-slate-900">{hobby.funStat}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEffects.playPop();
                      setSelectedHobbyId(hobby.id);
                    }}
                    className="text-xs font-bubble font-bold text-blue-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
                  >
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Hobby Spotlight & Co-Op Mini Challenge Card */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-white/20 text-amber-300 text-xs font-bubble font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                <Award className="w-3.5 h-3.5" />
                ACTIVE HOBBY SPOTLIGHT: {activeHobby.title.toUpperCase()}
              </div>
              <h3 className="font-bubble text-2xl sm:text-3xl font-extrabold">
                Want to team up with Avik on {activeHobby.title}?
              </h3>
              <div className="space-y-1.5 text-sm text-blue-100">
                <p>
                  <strong className="text-white">Favorite Gear:</strong> {activeHobby.favoriteGear}
                </p>
                <p>
                  <strong className="text-white">Avik's Top Tip:</strong> "Practice 15 minutes every single day, have fun, and don't be afraid to experiment with new ideas!"
                </p>
              </div>
            </div>

            {/* Interactive Playmate Challenge Box */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-5 border-2 border-white/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bubble text-xs font-bold uppercase tracking-wider text-amber-300">
                  ⚡ Playdate Mini-Challenge
                </span>
                <span className="text-xs text-white/80">
                  {completedChallenges[activeHobby.id] ? 'Completed ✅' : 'Incomplete ⏳'}
                </span>
              </div>

              <div>
                <h4 className="font-bubble text-lg font-bold text-white">
                  {hobbyChallenges[activeHobby.id]?.title}
                </h4>
                <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                  {hobbyChallenges[activeHobby.id]?.task}
                </p>
              </div>

              <button
                id={`btn-challenge-${activeHobby.id}`}
                onClick={() => toggleChallenge(activeHobby.id)}
                className={`w-full py-2.5 px-4 rounded-xl font-bubble text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  completedChallenges[activeHobby.id]
                    ? 'bg-emerald-400 text-slate-950 shadow-md'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md active:scale-95'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {completedChallenges[activeHobby.id]
                  ? 'Challenge Completed! Awesome! 🎉'
                  : 'I Accept This Challenge! 🚀'}
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
