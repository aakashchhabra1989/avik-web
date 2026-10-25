import React from 'react';
import { Zap, KeyRound } from 'lucide-react';
import { triggerGlobalCodeFlash } from '../utils/secretSpot';
import { soundEffects } from '../utils/audio';

interface SecretSpotEasterEggProps {
  spotId: string;
  activeSpotId: string;
  className?: string;
}

export const SecretSpotEasterEgg: React.FC<SecretSpotEasterEggProps> = ({
  spotId,
  activeSpotId,
  className = ''
}) => {
  if (spotId !== activeSpotId) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playPowerup();
    triggerGlobalCodeFlash();
  };

  return (
    <div className={`inline-block animate-bounce z-20 ${className}`}>
      <button
        id={`secret-code-easter-egg-${spotId}`}
        onClick={handleClick}
        className="group relative inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-bubble text-xs font-black px-3 py-1.5 rounded-full border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] active:scale-95 transition-all cursor-pointer"
        title="🕵️‍♂️ You found the Secret Vault Code spot! Click to flash code!"
      >
        <span className="text-base animate-wiggle">🕵️‍♂️</span>
        <span>Secret Spot Found! Peek Code</span>
        <KeyRound className="w-3.5 h-3.5 text-slate-950" />
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping absolute -top-1 -right-1" />
      </button>
    </div>
  );
};
