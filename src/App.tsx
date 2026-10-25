import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RaceTo100Game } from './components/RaceTo100Game';
import { AboutSection } from './components/AboutSection';
import { SubjectsSection } from './components/SubjectsSection';
import { HobbiesSection } from './components/HobbiesSection';
import { ToyVaultSection } from './components/ToyVaultSection';
import { NeighborhoodSection } from './components/NeighborhoodSection';
import { HighFiveFooter } from './components/HighFiveFooter';
import confetti from 'canvas-confetti';
import { soundEffects } from './utils/audio';
import { SECRET_SPOTS } from './utils/secretSpot';

export default function App() {
  const [highFiveCount, setHighFiveCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('avik_highfives');
      return saved ? parseInt(saved, 10) : 48;
    } catch {
      return 48;
    }
  });

  const [discoMode, setDiscoMode] = useState<boolean>(false);

  // Random secret spot selection (Hides code in a random spot on the page!)
  const [spotIndex, setSpotIndex] = useState<number>(() => Math.floor(Math.random() * SECRET_SPOTS.length));

  const handleShuffleSpot = () => {
    setSpotIndex(prev => (prev + 1 + Math.floor(Math.random() * (SECRET_SPOTS.length - 1))) % SECRET_SPOTS.length);
  };

  const activeSpot = SECRET_SPOTS[spotIndex];

  useEffect(() => {
    try {
      localStorage.setItem('avik_highfives', highFiveCount.toString());
    } catch {}
  }, [highFiveCount]);

  const handleHighFive = () => {
    soundEffects.playHighFive();
    setHighFiveCount(prev => prev + 1);

    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const toggleDiscoMode = () => {
    setDiscoMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-amber-300 selection:text-slate-900 ${
      discoMode ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white' : 'bg-[#fffdf5] text-slate-800'
    }`}>
      
      {/* Disco Mode Fun Lights Overlay */}
      {discoMode && (
        <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_50%_120%,rgba(120,0,255,0.2),rgba(255,0,100,0.1))] animate-pulse" />
      )}

      {/* Main Navbar */}
      <Navbar
        highFiveCount={highFiveCount}
        onHighFive={handleHighFive}
        discoMode={discoMode}
        onToggleDisco={toggleDiscoMode}
      />

      {/* Main Sections */}
      <main id="main-content">
        {/* Section 1: Hero Header (Welcome Section) */}
        <HeroSection
          onHighFive={handleHighFive}
          highFiveCount={highFiveCount}
          activeSpotId={activeSpot.id}
        />

        {/* Section 2: Race to 100 Turbo Speedway Game */}
        <RaceTo100Game />

        {/* Section 3: About Me & 3rd Grade Life */}
        <AboutSection activeSpotId={activeSpot.id} />

        {/* Section 4: Favorite Subjects (Math & EVS) */}
        <SubjectsSection activeSpotId={activeSpot.id} />

        {/* Section 5: Hobbies & Fun Activities */}
        <HobbiesSection activeSpotId={activeSpot.id} />

        {/* Section 6: Toy Vault Showcase */}
        <ToyVaultSection
          activeSpot={activeSpot}
          onShuffleSpot={handleShuffleSpot}
        />

        {/* Section 7: My Neighborhood & Society */}
        <NeighborhoodSection activeSpotId={activeSpot.id} />
      </main>

      {/* Section 7: Interactive Footer & High-Five */}
      <HighFiveFooter
        highFiveCount={highFiveCount}
        onHighFive={handleHighFive}
      />

    </div>
  );
}
