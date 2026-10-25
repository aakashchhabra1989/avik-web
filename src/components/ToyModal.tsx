import React from 'react';
import { X, Star, Sparkles, Award, ShieldCheck, Flame } from 'lucide-react';
import { ToyItem } from '../types';
import { soundEffects } from '../utils/audio';

interface ToyModalProps {
  toy: ToyItem | null;
  onClose: () => void;
}

export const ToyModal: React.FC<ToyModalProps> = ({ toy, onClose }) => {
  if (!toy) return null;

  return (
    <div
      id="toy-inspect-modal-overlay"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
    >
      <div
        id="toy-inspect-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl border-4 border-slate-900 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] max-w-2xl w-full overflow-hidden relative max-h-[90vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          id="btn-close-toy-modal"
          onClick={() => {
            soundEffects.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-rose-600 transition-colors shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Hero Image */}
        <div className="relative h-60 sm:h-72 w-full bg-slate-100 shrink-0 overflow-hidden">
          <img
            src={toy.image}
            alt={toy.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="bg-amber-400 text-slate-950 font-bubble text-xs font-bold px-3 py-1 rounded-full border border-slate-900">
                {toy.badge}
              </span>
              <span className="bg-white/25 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {toy.categoryLabel}
              </span>
            </div>
            <h3 className="font-bubble text-2xl sm:text-3xl font-bold leading-tight">
              {toy.name}
            </h3>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Key Specs Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 border-2 border-blue-200 p-3.5 rounded-2xl">
              <span className="text-[11px] font-bold text-blue-600 block uppercase">
                {toy.stats.label1}
              </span>
              <span className="font-bubble text-xl font-bold text-slate-900">
                {toy.stats.val1}
              </span>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 p-3.5 rounded-2xl">
              <span className="text-[11px] font-bold text-amber-700 block uppercase">
                {toy.stats.label2}
              </span>
              <span className="font-bubble text-xl font-bold text-slate-900">
                {toy.stats.val2}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bubble text-sm font-bold text-slate-900 uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Vault Overview
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {toy.description}
            </p>
          </div>

          {/* Backstory / Origin */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200">
            <h4 className="font-bubble text-sm font-bold text-amber-900 mb-1 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-red-500" />
              Avik's Origin Story
            </h4>
            <p className="text-xs text-amber-950 leading-relaxed">
              "{toy.story}"
            </p>
          </div>

          {/* Favorite Feature */}
          <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200">
            <h4 className="font-bubble text-sm font-bold text-blue-900 mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" />
              Favorite Secret Feature
            </h4>
            <p className="text-xs text-blue-950 leading-relaxed">
              {toy.favoriteFeature}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs font-bold text-slate-700 ml-1">5.0 Vault Tier</span>
          </div>
          <button
            onClick={() => {
              soundEffects.playPop();
              onClose();
            }}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bubble text-xs font-bold px-5 py-2 rounded-xl transition-all"
          >
            Back to Vault 🏎️
          </button>
        </div>
      </div>
    </div>
  );
};
