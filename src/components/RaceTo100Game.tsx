import React, { useState, useEffect, useRef } from 'react';
import {
  Trophy,
  Dices,
  Play,
  RotateCcw,
  Zap,
  Shield,
  Sparkles,
  Bot,
  Users,
  Flag,
  Flame,
  Award,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/audio';
import avikRealPhoto from '../assets/images/avik_real_photo_1792919013034.jpg';

type GameMode = 'vs-avik' | 'pass-and-play';
type DiceCount = 1 | 2;

interface PlayerState {
  id: string;
  name: string;
  avatar: string;
  photo?: string;
  color: string;
  score: number;
  turnScore: number;
  hasShield: boolean;
  boosterUsed: boolean;
  totalRolls: number;
  highestTurn: number;
}

interface MathQuestion {
  question: string;
  options: number[];
  answer: number;
}

const MATH_QUESTIONS: MathQuestion[] = [
  { question: "What is 7 × 8?", options: [54, 56, 58, 64], answer: 56 },
  { question: "What is 9 × 6?", options: [45, 52, 54, 63], answer: 54 },
  { question: "What is 45 + 55?", options: [90, 95, 100, 110], answer: 100 },
  { question: "What is 100 - 37?", options: [53, 63, 67, 73], answer: 63 },
  { question: "What is 8 × 8?", options: [56, 62, 64, 72], answer: 64 },
  { question: "What is 12 × 5?", options: [50, 55, 60, 65], answer: 60 },
  { question: "What is 34 + 48?", options: [72, 82, 84, 92], answer: 82 },
  { question: "What is 9 × 9?", options: [79, 80, 81, 89], answer: 81 },
];

export const RaceTo100Game: React.FC = () => {
  const [mode, setMode] = useState<GameMode>('vs-avik');
  const [diceCount, setDiceCount] = useState<DiceCount>(1);
  const [activePlayerIndex, setActivePlayerIndex] = useState<0 | 1>(0);
  const [diceValues, setDiceValues] = useState<number[]>([1]);
  const [isRolling, setIsRolling] = useState(false);
  const [busted, setBusted] = useState(false);
  const [winner, setWinner] = useState<PlayerState | null>(null);
  const [showHundredsChart, setShowHundredsChart] = useState(false);
  const [avikMessage, setAvikMessage] = useState<string>("Hey! Think you can reach 100 before me? Let's roll!");
  
  // Math Booster Modal state
  const [boosterModalOpen, setBoosterModalOpen] = useState(false);
  const [currentMathQ, setCurrentMathQ] = useState<MathQuestion | null>(null);

  const [players, setPlayers] = useState<[PlayerState, PlayerState]>([
    {
      id: 'p1',
      name: 'Racer You 🚀',
      avatar: '🏎️',
      color: 'from-blue-500 to-indigo-600',
      score: 0,
      turnScore: 0,
      hasShield: false,
      boosterUsed: false,
      totalRolls: 0,
      highestTurn: 0
    },
    {
      id: 'p2',
      name: 'Avik (Grade 3) 👦',
      avatar: '👦',
      photo: avikRealPhoto,
      color: 'from-amber-400 to-orange-500',
      score: 0,
      turnScore: 0,
      hasShield: false,
      boosterUsed: false,
      totalRolls: 0,
      highestTurn: 0
    }
  ]);

  const activePlayer = players[activePlayerIndex];

  // When mode changes, update player names
  const handleModeChange = (newMode: GameMode) => {
    soundEffects.playPop();
    setMode(newMode);
    resetGame(newMode);
  };

  const resetGame = (currentMode: GameMode = mode) => {
    soundEffects.playWhoosh();
    setPlayers([
      {
        id: 'p1',
        name: currentMode === 'vs-avik' ? 'Racer You 🏎️' : 'Player 1 🚀',
        avatar: currentMode === 'vs-avik' ? '🏎️' : '🚀',
        color: 'from-blue-500 to-indigo-600',
        score: 0,
        turnScore: 0,
        hasShield: false,
        boosterUsed: false,
        totalRolls: 0,
        highestTurn: 0
      },
      {
        id: 'p2',
        name: currentMode === 'vs-avik' ? 'Avik (Grade 3) 👦' : 'Player 2 🏎️',
        avatar: currentMode === 'vs-avik' ? '👦' : '🏎️',
        photo: currentMode === 'vs-avik' ? avikRealPhoto : undefined,
        color: 'from-amber-400 to-orange-500',
        score: 0,
        turnScore: 0,
        hasShield: false,
        boosterUsed: false,
        totalRolls: 0,
        highestTurn: 0
      }
    ]);
    setActivePlayerIndex(0);
    setDiceValues([Math.floor(Math.random() * 6) + 1]);
    setIsRolling(false);
    setBusted(false);
    setWinner(null);
    setAvikMessage("New game! Race to 100 begins! You go first!");
  };

  // AI Avik Logic
  useEffect(() => {
    if (mode === 'vs-avik' && activePlayerIndex === 1 && !winner && !isRolling) {
      const timer = setTimeout(() => {
        handleAvikTurn();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [activePlayerIndex, players[1].turnScore, isRolling, winner, mode]);

  const handleAvikTurn = () => {
    const avik = players[1];
    const player1 = players[0];

    // Avik decides whether to use his math booster if available and close to 100 or behind
    if (!avik.boosterUsed && (avik.score >= 40 || player1.score > avik.score + 15)) {
      setPlayers(prev => {
        const next = [...prev] as [PlayerState, PlayerState];
        next[1] = {
          ...next[1],
          score: Math.min(100, next[1].score + 10),
          hasShield: true,
          boosterUsed: true
        };
        return next;
      });
      soundEffects.playPowerup();
      setAvikMessage("⚡ Avik activated Math Turbo Booster! +10 Points & Shield!");

      // If that puts Avik at 100
      if (avik.score + 10 >= 100) {
        handleWin(players[1]);
        return;
      }
    }

    // Avik's decision to Bank or Roll
    // Threshold strategy: typically bank at ~15-20 points, or if current score + turnScore >= 100
    const targetBank = diceCount === 2 ? 18 : 15;
    const canWinNow = avik.score + avik.turnScore >= 100;

    if (canWinNow || (avik.turnScore >= targetBank && avik.turnScore > 0)) {
      setAvikMessage(`Avik says: "Banking my ${avik.turnScore} points! Better play it safe!" 🏦`);
      handleBank(1);
    } else {
      setAvikMessage(
        avik.turnScore === 0
          ? 'Avik says: "My turn! Watch this roll!" 🎲'
          : `Avik has ${avik.turnScore} in the bank... "One more roll!" 🎲`
      );
      handleRoll(1);
    }
  };

  const handleRoll = (playerIdx: 0 | 1 = activePlayerIndex) => {
    if (isRolling || winner) return;

    setIsRolling(true);
    setBusted(false);
    soundEffects.playDiceRoll();

    // Roll animation
    let count = 0;
    const interval = setInterval(() => {
      const tempRolls = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1);
      setDiceValues(tempRolls);
      count++;

      if (count > 6) {
        clearInterval(interval);
        finalizeRoll(playerIdx);
      }
    }, 60);
  };

  const finalizeRoll = (playerIdx: 0 | 1) => {
    const finalRolls = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1);
    setDiceValues(finalRolls);
    setIsRolling(false);

    const hasOne = finalRolls.includes(1);
    const sum = finalRolls.reduce((a, b) => a + b, 0);

    const currentPlayer = players[playerIdx];

    if (hasOne) {
      // Check if player has active shield from Math Booster
      if (currentPlayer.hasShield) {
        soundEffects.playPop();
        setAvikMessage(`🛡️ SHIELD PROTECTED ${currentPlayer.name}! The 1 was deflected!`);
        setPlayers(prev => {
          const next = [...prev] as [PlayerState, PlayerState];
          next[playerIdx] = {
            ...next[playerIdx],
            hasShield: false,
            totalRolls: next[playerIdx].totalRolls + 1
          };
          return next;
        });
      } else {
        // BUST!
        soundEffects.playBuzzer();
        setBusted(true);
        setAvikMessage(
          playerIdx === 0
            ? "Oh no! Slipped on a banana peel (Rolled a 1)! Turn lost! 🍌"
            : "Avik got a Flat Tire (Rolled a 1)! Haha, your turn! 🛞"
        );

        setPlayers(prev => {
          const next = [...prev] as [PlayerState, PlayerState];
          next[playerIdx] = {
            ...next[playerIdx],
            turnScore: 0,
            totalRolls: next[playerIdx].totalRolls + 1
          };
          return next;
        });

        setTimeout(() => {
          setBusted(false);
          setActivePlayerIndex(playerIdx === 0 ? 1 : 0);
        }, 1200);
      }
    } else {
      // Valid score!
      soundEffects.playPop();
      const newTurnScore = currentPlayer.turnScore + sum;

      setPlayers(prev => {
        const next = [...prev] as [PlayerState, PlayerState];
        next[playerIdx] = {
          ...next[playerIdx],
          turnScore: newTurnScore,
          totalRolls: next[playerIdx].totalRolls + 1,
          highestTurn: Math.max(next[playerIdx].highestTurn, newTurnScore)
        };
        return next;
      });

      // Check if instant win possible if they bank
      if (currentPlayer.score + newTurnScore >= 100) {
        setAvikMessage(`🔥 ${currentPlayer.name} can win right now! Bank to cross 100!`);
      }
    }
  };

  const handleBank = (playerIdx: 0 | 1 = activePlayerIndex) => {
    if (isRolling || winner) return;

    const currentPlayer = players[playerIdx];
    if (currentPlayer.turnScore === 0) return;

    soundEffects.playCorrect();
    const finalScore = currentPlayer.score + currentPlayer.turnScore;

    setPlayers(prev => {
      const next = [...prev] as [PlayerState, PlayerState];
      next[playerIdx] = {
        ...next[playerIdx],
        score: finalScore,
        turnScore: 0
      };
      return next;
    });

    if (finalScore >= 100) {
      handleWin({
        ...currentPlayer,
        score: finalScore
      });
      return;
    }

    setAvikMessage(`🏦 ${currentPlayer.name} banked ${currentPlayer.turnScore} points! Total: ${finalScore}/100.`);
    setActivePlayerIndex(playerIdx === 0 ? 1 : 0);
  };

  const handleWin = (winningPlayer: PlayerState) => {
    soundEffects.playFanfare();
    setWinner(winningPlayer);
    setAvikMessage(`🏆 ${winningPlayer.name} IS THE FIRST TO REACH 100! SPEEDWAY CHAMPION! 🎉`);

    // Mega Confetti explosion
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.5 }
      });
    }, 400);
  };

  // Trigger Math Booster for active human player
  const openMathBooster = () => {
    if (activePlayer.boosterUsed || winner) return;
    soundEffects.playPop();
    const q = MATH_QUESTIONS[Math.floor(Math.random() * MATH_QUESTIONS.length)];
    setCurrentMathQ(q);
    setBoosterModalOpen(true);
  };

  const handleAnswerMath = (selectedAnswer: number) => {
    if (!currentMathQ) return;

    if (selectedAnswer === currentMathQ.answer) {
      soundEffects.playPowerup();
      setBoosterModalOpen(false);

      const newScore = Math.min(100, activePlayer.score + 10);
      setPlayers(prev => {
        const next = [...prev] as [PlayerState, PlayerState];
        next[activePlayerIndex] = {
          ...next[activePlayerIndex],
          score: newScore,
          hasShield: true,
          boosterUsed: true
        };
        return next;
      });

      setAvikMessage(`⚡ MATH WHIZ POWER-UP! +10 Points & Banana Shield unlocked!`);

      if (newScore >= 100) {
        handleWin({
          ...activePlayer,
          score: newScore
        });
      }
    } else {
      soundEffects.playBuzzer();
      alert(`Oops! Nice try, but the correct answer was ${currentMathQ.answer}. Keep practicing!`);
      setBoosterModalOpen(false);
    }
  };

  // Render Dice visual pips
  const renderDice = (value: number) => {
    const dotClasses = "w-3 h-3 sm:w-3.5 sm:h-3.5 bg-slate-900 rounded-full shadow-inner";
    return (
      <div
        className={`w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] p-2.5 flex flex-col justify-between items-center transition-all ${
          isRolling ? 'rotate-12 scale-110 animate-bounce' : ''
        } ${value === 1 ? 'bg-red-50 border-red-600' : ''}`}
      >
        {value === 1 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-red-600 rounded-full" />
          </div>
        )}
        {value === 2 && (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex justify-start"><div className={dotClasses} /></div>
            <div className="flex justify-end"><div className={dotClasses} /></div>
          </div>
        )}
        {value === 3 && (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex justify-start"><div className={dotClasses} /></div>
            <div className="flex justify-center"><div className={dotClasses} /></div>
            <div className="flex justify-end"><div className={dotClasses} /></div>
          </div>
        )}
        {value === 4 && (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex justify-between"><div className={dotClasses} /><div className={dotClasses} /></div>
            <div className="flex justify-between"><div className={dotClasses} /><div className={dotClasses} /></div>
          </div>
        )}
        {value === 5 && (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex justify-between"><div className={dotClasses} /><div className={dotClasses} /></div>
            <div className="flex justify-center"><div className={dotClasses} /></div>
            <div className="flex justify-between"><div className={dotClasses} /><div className={dotClasses} /></div>
          </div>
        )}
        {value === 6 && (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex justify-between"><div className={dotClasses} /><div className={dotClasses} /></div>
            <div className="flex justify-between"><div className={dotClasses} /><div className={dotClasses} /></div>
            <div className="flex justify-between"><div className={dotClasses} /><div className={dotClasses} /></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="race-to-100" className="py-20 relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-blue-50 border-y-4 border-slate-900">
      
      {/* Background Track Lines & Math Icons */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-8 text-5xl">🏁</div>
        <div className="absolute top-40 right-12 text-6xl">🏎️</div>
        <div className="absolute bottom-20 left-16 text-5xl">💯</div>
        <div className="absolute bottom-12 right-24 text-6xl">🎲</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 via-amber-500 to-yellow-400 text-white font-bubble text-xs font-black px-4 py-1.5 rounded-full border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
            <Flag className="w-4 h-4" />
            OFFICIAL 3RD GRADE SPEEDWAY CHALLENGE
          </div>

          <h2 className="font-bubble text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            Race to 100: Turbo Challenge! 🏁💯
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
            Who will be the first racer to reach <span className="font-bold text-blue-600">100 points</span>?
            Roll the dice to build your stash, avoid the tricky <span className="text-red-500 font-bold">1 (Flat Tire)</span>, bank safely, and unlock Avik's Math Super-Boosters!
          </p>

          {/* Game Controls Bar: Mode & Dice count */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            
            {/* Mode Toggle */}
            <div className="inline-flex bg-slate-100 p-1 rounded-2xl border-2 border-slate-900 shadow-xs">
              <button
                id="btn-mode-vs-avik"
                onClick={() => handleModeChange('vs-avik')}
                className={`px-3 sm:px-4 py-1.5 rounded-xl font-bubble text-xs font-bold transition-all flex items-center gap-1.5 ${
                  mode === 'vs-avik'
                    ? 'bg-amber-400 text-slate-950 border-2 border-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                Race vs Avik (AI)
              </button>

              <button
                id="btn-mode-2player"
                onClick={() => handleModeChange('pass-and-play')}
                className={`px-3 sm:px-4 py-1.5 rounded-xl font-bubble text-xs font-bold transition-all flex items-center gap-1.5 ${
                  mode === 'pass-and-play'
                    ? 'bg-amber-400 text-slate-950 border-2 border-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                2 Players (Pass & Play)
              </button>
            </div>

            {/* Dice count toggle */}
            <div className="inline-flex bg-slate-100 p-1 rounded-2xl border-2 border-slate-900 shadow-xs">
              <button
                id="btn-dice-single"
                onClick={() => {
                  soundEffects.playPop();
                  setDiceCount(1);
                  setDiceValues([Math.floor(Math.random() * 6) + 1]);
                }}
                className={`px-3 py-1.5 rounded-xl font-bubble text-xs font-bold transition-all flex items-center gap-1 ${
                  diceCount === 1
                    ? 'bg-blue-600 text-white border-2 border-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Dices className="w-3.5 h-3.5" />
                Single Die (Safer)
              </button>

              <button
                id="btn-dice-double"
                onClick={() => {
                  soundEffects.playPop();
                  setDiceCount(2);
                  setDiceValues([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);
                }}
                className={`px-3 py-1.5 rounded-xl font-bubble text-xs font-bold transition-all flex items-center gap-1 ${
                  diceCount === 2
                    ? 'bg-red-500 text-white border-2 border-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-yellow-300" />
                Double Dice (Turbo!)
              </button>
            </div>

            {/* Reset Button */}
            <button
              id="btn-restart-game"
              onClick={() => resetGame()}
              className="p-2 sm:px-3 sm:py-1.5 bg-white hover:bg-slate-100 text-slate-800 rounded-2xl border-2 border-slate-900 font-bubble text-xs font-bold shadow-xs flex items-center gap-1.5"
              title="Reset Speedway"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Game</span>
            </button>

            {/* Toggle 100-Chart View */}
            <button
              id="btn-toggle-hundreds-chart"
              onClick={() => {
                soundEffects.playPop();
                setShowHundredsChart(!showHundredsChart);
              }}
              className="p-2 sm:px-3 sm:py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 rounded-2xl border-2 border-indigo-400 font-bubble text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <span>{showHundredsChart ? '🏎️ Track View' : '📊 1-100 Grid Chart'}</span>
            </button>
          </div>

        </div>

        {/* Speedway Interactive Board Card */}
        <div className="bg-white rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] p-6 sm:p-8 space-y-8 relative overflow-hidden">
          
          {/* Top Speedway Progress Lanes (0 to 100) */}
          <div className="space-y-5 bg-slate-950 p-5 sm:p-6 rounded-2xl border-2 border-slate-800 text-white shadow-inner">
            
            <div className="flex items-center justify-between text-xs font-bubble font-bold text-amber-400">
              <span className="flex items-center gap-1.5">
                <Flag className="w-4 h-4 text-red-400" />
                SPEEDWAY PROGRESS (FIRST TO 100 WINS!)
              </span>
              <span className="text-slate-400 font-mono">
                🏁 Target: 100 Pts
              </span>
            </div>

            {/* Racer 1 Track */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{players[0].avatar}</span>
                  <span className="font-bubble text-blue-400">{players[0].name}</span>
                  {activePlayerIndex === 0 && (
                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-[10px] animate-pulse">
                      ACTIVE TURN
                    </span>
                  )}
                  {players[0].hasShield && (
                    <span className="bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded text-[10px] flex items-center gap-0.5">
                      <Shield className="w-3 h-3" /> SHIELD
                    </span>
                  )}
                </div>
                <div className="font-bubble text-sm">
                  <span className="text-white text-base font-black">{players[0].score}</span>
                  <span className="text-slate-500"> / 100</span>
                  {players[0].turnScore > 0 && (
                    <span className="text-amber-400 text-xs ml-1.5 font-bold">
                      (+{players[0].turnScore} stashed)
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar with Moving Racer Icon */}
              <div className="h-6 bg-slate-800 rounded-full border border-slate-700 relative overflow-hidden p-1 flex items-center">
                {/* Distance Fill */}
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${Math.min(100, Math.max(players[0].score, 4))}%` }}
                />
                {/* Checkered Finish Line Marker */}
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-[repeating-linear-gradient(45deg,#000,#000_4px,#fff_4px,#fff_8px)] opacity-60" />
                
                {/* Milestone notches at 25, 50, 75 */}
                <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-slate-600" title="25 Pts" />
                <div className="absolute left-2/4 top-0 bottom-0 w-0.5 bg-slate-600" title="50 Pts" />
                <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-slate-600" title="75 Pts" />
              </div>
            </div>

            {/* Racer 2 Track */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  {players[1].photo ? (
                    <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 shadow-xs">
                      <img src={players[1].photo} alt={players[1].name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <span className="text-lg">{players[1].avatar}</span>
                  )}
                  <span className="font-bubble text-amber-400">{players[1].name}</span>
                  {activePlayerIndex === 1 && (
                    <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] animate-pulse">
                      ACTIVE TURN
                    </span>
                  )}
                  {players[1].hasShield && (
                    <span className="bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded text-[10px] flex items-center gap-0.5">
                      <Shield className="w-3 h-3" /> SHIELD
                    </span>
                  )}
                </div>
                <div className="font-bubble text-sm">
                  <span className="text-white text-base font-black">{players[1].score}</span>
                  <span className="text-slate-500"> / 100</span>
                  {players[1].turnScore > 0 && (
                    <span className="text-amber-400 text-xs ml-1.5 font-bold">
                      (+{players[1].turnScore} stashed)
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar with Moving Racer Icon */}
              <div className="h-6 bg-slate-800 rounded-full border border-slate-700 relative overflow-hidden p-1 flex items-center">
                {/* Distance Fill */}
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${Math.min(100, Math.max(players[1].score, 4))}%` }}
                />
                {/* Checkered Finish Line Marker */}
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-[repeating-linear-gradient(45deg,#000,#000_4px,#fff_4px,#fff_8px)] opacity-60" />
                
                {/* Milestone notches at 25, 50, 75 */}
                <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-slate-600" title="25 Pts" />
                <div className="absolute left-2/4 top-0 bottom-0 w-0.5 bg-slate-600" title="50 Pts" />
                <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-slate-600" title="75 Pts" />
              </div>
            </div>

            {/* Milestone Legend */}
            <div className="flex justify-between text-[10px] font-bold text-slate-500 px-1">
              <span>Start (0)</span>
              <span>⛽ Pit Stop (25)</span>
              <span>🔥 Halfway Nitro (50)</span>
              <span>🚀 Turbo Boost (75)</span>
              <span className="text-amber-400">🏆 Finish (100)</span>
            </div>

          </div>

          {/* Optional 100-Chart Grid View (Grade 3 Classroom Favorite!) */}
          {showHundredsChart && (
            <div className="bg-amber-50/70 p-4 rounded-2xl border-2 border-amber-200 animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bubble text-xs font-bold text-amber-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  3rd Grade Hundreds Chart (Positions 1 to 100):
                </span>
                <span className="text-[11px] text-slate-600">
                  {players[0].name.split(' ')[0]}: #{players[0].score} | {players[1].name.split(' ')[0]}: #{players[1].score}
                </span>
              </div>
              <div className="grid grid-cols-10 gap-1 text-center font-mono text-[10px]">
                {Array.from({ length: 100 }).map((_, i) => {
                  const num = i + 1;
                  const isP1 = players[0].score === num;
                  const isP2 = players[1].score === num;
                  return (
                    <div
                      key={num}
                      className={`h-7 rounded flex items-center justify-center font-bold border transition-all ${
                        isP1 && isP2
                          ? 'bg-purple-600 text-white border-purple-800 scale-110 z-10 shadow-md'
                          : isP1
                          ? 'bg-blue-600 text-white border-blue-800 scale-110 z-10 shadow-md'
                          : isP2
                          ? 'bg-orange-500 text-white border-orange-800 scale-110 z-10 shadow-md'
                          : num === 100
                          ? 'bg-amber-300 text-amber-950 font-black border-amber-400'
                          : num % 10 === 0
                          ? 'bg-amber-100/60 text-slate-600 border-amber-200'
                          : 'bg-white text-slate-400 border-slate-200'
                      }`}
                    >
                      {isP1 && isP2 ? '👥' : isP1 ? '🏎️' : isP2 ? '👦' : num === 100 ? '🏁' : num}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Speedway Arena: Active Racer Turn Console */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Active Racer Info Card */}
            <div className="md:col-span-4 bg-slate-50 rounded-2xl p-5 border-2 border-slate-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${activePlayer.color} text-white text-2xl flex items-center justify-center shadow-md overflow-hidden border-2 border-slate-900 shrink-0`}>
                  {activePlayer.photo ? (
                    <img src={activePlayer.photo} alt={activePlayer.name} className="w-full h-full object-cover" />
                  ) : (
                    activePlayer.avatar
                  )}
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Current Turn</div>
                  <div className="font-bubble text-lg font-black text-slate-900 truncate">
                    {activePlayer.name}
                  </div>
                </div>
              </div>

              {/* Turn Stash Display */}
              <div className="bg-amber-100/80 rounded-xl p-3 border-2 border-amber-300 text-center space-y-1">
                <span className="text-[11px] uppercase font-black text-amber-900 tracking-wider block">
                  Current Turn Stash
                </span>
                <div className="font-bubble text-3xl font-black text-amber-950">
                  +{activePlayer.turnScore} <span className="text-sm font-bold">Points</span>
                </div>
                <p className="text-[10px] text-amber-800 font-medium">
                  {activePlayer.turnScore > 0 ? 'Bank now or roll again to push your luck!' : 'Roll the dice to start earning points!'}
                </p>
              </div>

              {/* Avik's Live Commentary Speech Bubble */}
              <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-xs relative">
                <div className="text-[10px] font-black text-blue-600 uppercase flex items-center gap-1 mb-0.5">
                  <Bot className="w-3 h-3" /> Speedway Commentary
                </div>
                <p className="text-xs font-bubble font-bold text-slate-800">
                  "{avikMessage}"
                </p>
              </div>
            </div>

            {/* Center: The Dice Rolling Stage */}
            <div className="md:col-span-5 flex flex-col items-center justify-center space-y-5 py-4">
              
              {/* Flat Tire Alert Banner */}
              {busted && (
                <div className="bg-red-500 text-white font-bubble text-xs font-black px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-md animate-bounce flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-yellow-300" />
                  FLAT TIRE! ROLLED A 1! TURN LOST!
                </div>
              )}

              {/* Dice Display */}
              <div className="flex items-center gap-4 justify-center">
                {diceValues.map((val, idx) => (
                  <div key={idx} className="relative">
                    {renderDice(val)}
                  </div>
                ))}
              </div>

              {/* Action Buttons: Roll & Bank */}
              <div className="flex items-center gap-3 w-full max-w-xs">
                
                {/* Roll Dice Button */}
                <button
                  id="btn-roll-dice"
                  disabled={isRolling || Boolean(winner) || (mode === 'vs-avik' && activePlayerIndex === 1)}
                  onClick={() => handleRoll()}
                  className={`flex-1 py-3.5 px-4 rounded-2xl font-bubble text-base font-black border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:scale-95 transition-all flex items-center justify-center gap-2 ${
                    isRolling || Boolean(winner) || (mode === 'vs-avik' && activePlayerIndex === 1)
                      ? 'bg-slate-200 text-slate-400 border-slate-400 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
                  }`}
                >
                  <Dices className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
                  <span>{isRolling ? 'Rolling...' : 'Roll Dice 🎲'}</span>
                </button>

                {/* Bank Points Button */}
                <button
                  id="btn-bank-points"
                  disabled={
                    activePlayer.turnScore === 0 ||
                    isRolling ||
                    Boolean(winner) ||
                    (mode === 'vs-avik' && activePlayerIndex === 1)
                  }
                  onClick={() => handleBank()}
                  className={`py-3.5 px-5 rounded-2xl font-bubble text-base font-black border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:scale-95 transition-all flex items-center justify-center gap-1.5 ${
                    activePlayer.turnScore === 0 ||
                    isRolling ||
                    Boolean(winner) ||
                    (mode === 'vs-avik' && activePlayerIndex === 1)
                      ? 'bg-slate-200 text-slate-400 border-slate-400 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-slate-950'
                  }`}
                  title="Secure your turn points into total score"
                >
                  <span>Bank 🏦</span>
                </button>

              </div>

              {/* Bot thinking indicator */}
              {mode === 'vs-avik' && activePlayerIndex === 1 && !winner && (
                <div className="text-xs font-bubble font-bold text-amber-600 flex items-center gap-1.5 animate-pulse">
                  <Bot className="w-4 h-4 animate-spin" />
                  Avik is planning his roll...
                </div>
              )}
            </div>

            {/* Right: Math Super Booster & Speedway Stats */}
            <div className="md:col-span-3 bg-slate-50 rounded-2xl p-4 border-2 border-slate-200 space-y-3">
              
              <div className="text-center pb-2 border-b border-slate-200">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                  Avik's Secret Weapon
                </span>
                <span className="font-bubble text-sm font-bold text-slate-900">
                  Math Super-Booster ⚡
                </span>
              </div>

              {/* Math Booster Button */}
              <div className="space-y-1.5 text-center">
                <button
                  id="btn-math-booster"
                  disabled={
                    activePlayer.boosterUsed ||
                    Boolean(winner) ||
                    (mode === 'vs-avik' && activePlayerIndex === 1)
                  }
                  onClick={openMathBooster}
                  className={`w-full py-2.5 px-3 rounded-xl font-bubble text-xs font-bold border-2 transition-all flex items-center justify-center gap-1.5 ${
                    activePlayer.boosterUsed
                      ? 'bg-slate-100 text-slate-400 border-slate-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-500 hover:to-yellow-400 text-amber-950 border-amber-500 shadow-sm'
                  }`}
                >
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>
                    {activePlayer.boosterUsed ? 'Booster Used (1/1)' : 'Solve Math (+10 Pts & Shield)'}
                  </span>
                </button>

                <p className="text-[10px] text-slate-500 leading-tight">
                  Answer 1 mental math question to grab 10 bonus points and a flat tire shield!
                </p>
              </div>

              {/* Quick Rules Mini-Guide */}
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="font-bold text-slate-800">🏁 How to Play:</div>
                <div className="flex items-start gap-1">
                  <span>1.</span>
                  <span>Roll dice to rack up turn points.</span>
                </div>
                <div className="flex items-start gap-1">
                  <span>2.</span>
                  <span>Rolling a <b className="text-red-500">1</b> loses current turn points!</span>
                </div>
                <div className="flex items-start gap-1">
                  <span>3.</span>
                  <span>Hit <b className="text-emerald-600">Bank</b> to save your points.</span>
                </div>
                <div className="flex items-start gap-1">
                  <span>4.</span>
                  <span>First to reach <b className="text-blue-600">100</b> wins!</span>
                </div>
              </div>

            </div>

          </div>

          {/* Winner Celebration Modal / Banner */}
          {winner && (
            <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 p-6 sm:p-8 rounded-3xl border-4 border-slate-900 shadow-2xl text-center space-y-4 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-3xl shadow-lg animate-bounce">
                🏆
              </div>

              <div className="space-y-1">
                <span className="text-xs font-black uppercase text-amber-950 tracking-wider">
                  WE HAVE A SPEEDWAY CHAMPION!
                </span>
                <h3 className="font-bubble text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-md">
                  {winner.name} Reached 100! 🏁
                </h3>
                <p className="font-bubble text-base text-amber-950 font-bold max-w-md mx-auto">
                  Final Score: <span className="text-white underline">{winner.score} Points</span> • Total Rolls: {winner.totalRolls}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  id="btn-play-again-winner"
                  onClick={() => resetGame()}
                  className="bg-white hover:bg-amber-100 text-slate-950 font-bubble text-base font-black px-6 py-3 rounded-full border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:scale-95 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Race Again! 🔄
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Math Booster Modal */}
      {boosterModalOpen && currentMathQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl border-4 border-slate-900 shadow-2xl max-w-md w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto text-xl shadow-md">
              ⚡
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">
                3rd Grade Math Booster Challenge
              </span>
              <h3 className="font-bubble text-2xl font-black text-slate-900">
                {currentMathQ.question}
              </h3>
              <p className="text-xs text-slate-500">
                Answer correctly to earn +10 Bonus Speedway Points and a Banana Shield!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {currentMathQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerMath(option)}
                  className="py-3 rounded-2xl bg-slate-100 hover:bg-amber-300 hover:text-slate-950 border-2 border-slate-900 font-bubble text-lg font-bold text-slate-800 transition-all active:scale-95 shadow-sm"
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              onClick={() => setBoosterModalOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-600 font-semibold underline pt-2"
            >
              Cancel and return to race
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
