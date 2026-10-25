import React, { useState } from 'react';
import { Hand, PartyPopper, Send, MessageSquare, Sparkles, Heart, CheckCircle2, Calendar, User, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GuestbookEntry } from '../types';
import { INITIAL_GUESTBOOK } from '../data/avikData';
import { soundEffects } from '../utils/audio';

interface HighFiveFooterProps {
  highFiveCount: number;
  onHighFive: () => void;
}

export const HighFiveFooter: React.FC<HighFiveFooterProps> = ({
  highFiveCount,
  onHighFive,
}) => {
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>(INITIAL_GUESTBOOK);
  const [senderName, setSenderName] = useState('');
  const [relation, setRelation] = useState<'Classmate' | 'Best Friend' | 'Cousin / Family' | 'Neighbor' | 'Teacher / Coach'>('Classmate');
  const [selectedActivity, setSelectedActivity] = useState('Turbo Cycling & Races 🚴');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const activities = [
    'Turbo Cycling & Races 🚴',
    'LEGO Mega Build Co-Op 🧱',
    'Hot Wheels Ramp Showdown 🏎️',
    '5v5 Sunset Football ⚽',
    'Minecraft / Mario Kart 🎮',
    'Board Games & Rubik\'s Battle 🎲',
    'Comic Drawing & Sketches 🎨',
    'Science Volcano Experiments 🧪'
  ];

  const handleTriggerHighFive = () => {
    onHighFive();
    soundEffects.playHighFive();

    // Multi-cannon confetti blast
    const count = 200;
    const defaults = { origin: { y: 0.8 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    soundEffects.playCorrect();
    const colors = ['bg-blue-500', 'bg-pink-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500'];
    const emojis = ['🚀', '⭐', '🏆', '🎉', '🔥', '💖', '🦸'];

    const newEntry: GuestbookEntry = {
      id: `entry-${Date.now()}`,
      senderName: senderName.trim(),
      relation: relation,
      activity: selectedActivity,
      message: message.trim(),
      timestamp: 'Just now',
      avatarColor: colors[Math.floor(Math.random() * colors.length)],
      favoriteEmoji: emojis[Math.floor(Math.random() * emojis.length)]
    };

    setGuestbook([newEntry, ...guestbook]);
    setFormSubmitted(true);
    setSenderName('');
    setMessage('');

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 }
    });

    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <footer id="footer" className="relative bg-slate-950 text-white pt-20 pb-12 overflow-hidden border-t-8 border-amber-400">
      {/* Background Glows & Stars */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 text-4xl animate-float">⭐</div>
        <div className="absolute top-40 right-20 text-5xl animate-float-reverse">🚀</div>
        <div className="absolute bottom-20 left-1/4 text-3xl animate-wiggle">✨</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Giant High-Five Interactive Banner */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-3xl p-8 sm:p-12 text-slate-950 border-4 border-white shadow-2xl text-center max-w-4xl mx-auto mb-16 relative overflow-hidden">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full font-bubble text-xs font-black shadow-md">
              <PartyPopper className="w-4 h-4 text-orange-500" />
              FRIENDSHIP POWER-UP
            </div>

            <h2 className="font-bubble text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
              Give Avik a Mega High-Five! ✋
            </h2>

            <p className="font-bubble text-base sm:text-lg text-amber-950 max-w-xl mx-auto font-bold">
              Smash the button below to launch a celebratory confetti explosion and join the Official High-Five Squad!
            </p>

            {/* Giant Bouncy High-Five Button */}
            <div className="pt-4">
              <button
                id="btn-footer-mega-high-five"
                onClick={handleTriggerHighFive}
                className="group relative inline-flex items-center gap-3 bg-white hover:bg-amber-100 text-slate-950 font-bubble text-xl sm:text-2xl font-black px-8 sm:px-12 py-4 sm:py-5 rounded-full border-4 border-slate-950 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-x-1 hover:translate-y-1 active:scale-95 transition-all"
              >
                <span className="text-3xl sm:text-4xl animate-wiggle group-hover:scale-125 transition-transform">
                  ✋
                </span>
                <span>HIGH-FIVE AVIK!</span>
                <span className="bg-orange-500 text-white font-bubble text-sm sm:text-base font-extrabold px-3 py-1 rounded-full shadow-inner">
                  {highFiveCount} Hits
                </span>
              </button>
            </div>

            <p className="text-xs font-bold text-amber-950 pt-2">
              🎉 Total Global High-Fives Given: <span className="underline font-black">{highFiveCount}</span>
            </p>
          </div>

        </div>

        {/* Playdate Invitation & Message Board Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Send Note / Playdate Form (Left 5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 sm:p-7 border-2 border-slate-800 space-y-5">
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bubble text-xl font-bold text-white">
                  Plan a Playdate or Send a Note
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Classmates, friends & family welcome!
                </p>
              </div>
            </div>

            {formSubmitted && (
              <div className="bg-emerald-900/60 border border-emerald-500 p-3.5 rounded-2xl text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Message pinned to Avik's Guestbook! He will see it after homework! 🚀
              </div>
            )}

            <form onSubmit={handleSendMessage} className="space-y-4">
              {/* Sender Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Your Name / Nickname *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-sender-name"
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g., Kabir, Auntie Priya, Coach Dave"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Relation Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Who are you to Avik?
                </label>
                <select
                  id="select-relation"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value as typeof relation)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:border-amber-400 focus:outline-none"
                >
                  <option value="Classmate">🎒 Classmate (3rd Grade)</option>
                  <option value="Best Friend">⭐ Best Friend</option>
                  <option value="Neighbor">🏡 Society Neighbor</option>
                  <option value="Cousin / Family">💖 Cousin / Family Member</option>
                  <option value="Teacher / Coach">🏆 Teacher / Sports Coach</option>
                </select>
              </div>

              {/* Activity Choice */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Suggested Playdate Activity:
                </label>
                <select
                  id="select-playdate-activity"
                  value={selectedActivity}
                  onChange={(e) => setSelectedActivity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:border-amber-400 focus:outline-none"
                >
                  {activities.map((act, i) => (
                    <option key={i} value={act}>{act}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Your Message or Note *
                </label>
                <textarea
                  id="input-message"
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hey Avik! Let's race Hot Wheels or build a LEGO fortress this weekend..."
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-xs font-semibold focus:border-amber-400 focus:outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                id="btn-send-playdate-invite"
                type="submit"
                className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-bubble text-sm font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                Send Note to Avik! 🚀
              </button>
            </form>

          </div>

          {/* Guestbook Pinboard (Right 7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-400" />
                <h3 className="font-bubble text-xl font-bold text-white">
                  Avik's Friend Guestbook & Pinboard
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-semibold">
                {guestbook.length} Notes Pinned
              </span>
            </div>

            {/* Pinned Notes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-1">
              {guestbook.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-slate-900/90 rounded-2xl p-4 border-2 border-slate-800 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-3 relative group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${entry.avatarColor} text-white text-xs flex items-center justify-center font-bold`}>
                          {entry.favoriteEmoji}
                        </div>
                        <div>
                          <div className="font-bubble text-sm font-bold text-white">
                            {entry.senderName}
                          </div>
                          <span className="text-[10px] text-amber-400 font-bold block">
                            {entry.relation}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {entry.timestamp}
                      </span>
                    </div>

                    <div className="text-[11px] font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40 inline-block">
                      🎯 {entry.activity}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      "{entry.message}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
                    <span>Avik's Friend Wall</span>
                    <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Bottom Legal & Kid-Friendly Signature */}
        <div className="pt-8 border-t border-slate-800/80 text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-2 font-bubble text-base text-amber-400">
            <span>🚀</span>
            <span>Welcome to a Big World • It's the best. Play like every day!</span>
            <span>🌟</span>
          </div>

          <p className="text-xs text-slate-400">
            Avik's 3rd Grade HQ • Powered by 🧱 LEGO bricks, 🏎️ Hot Wheels speed, 🧮 Math puzzles, and 🧀 cheese nachos!
          </p>

          <div className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} Avik's World • Keep Exploring, Keep Playing, and Stay Awesome!
          </div>
        </div>

      </div>
    </footer>
  );
};
