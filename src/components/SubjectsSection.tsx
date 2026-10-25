import React, { useState } from 'react';
import { Calculator, Trees, Sparkles, CheckCircle2, XCircle, HelpCircle, Trophy, RefreshCw, Eye, EyeOff, Lightbulb, Orbit, Zap, Leaf, Droplets, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MATH_QUESTIONS, MATH_RIDDLES, EVS_FACTS } from '../data/avikData';
import { soundEffects } from '../utils/audio';
import { SecretSpotEasterEgg } from './SecretSpotEasterEgg';

interface SubjectsSectionProps {
  activeSpotId?: string;
}

export const SubjectsSection: React.FC<SubjectsSectionProps> = ({ activeSpotId }) => {
  const [activeSubjectTab, setActiveSubjectTab] = useState<'math' | 'evs'>('math');
  
  // Math Quiz State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userStreak, setUserStreak] = useState(0);

  // Riddles State
  const [revealedRiddles, setRevealedRiddles] = useState<{ [key: string]: boolean }>({});
  const [revealedHints, setRevealedHints] = useState<{ [key: string]: boolean }>({});

  // EVS Category Filter
  const [evsCategory, setEvsCategory] = useState<'all' | 'space' | 'animals' | 'plants' | 'planet-hero'>('all');
  const [selectedEvsFact, setSelectedEvsFact] = useState<string | null>(null);

  // Math Quiz Handlers
  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    soundEffects.playPop();
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === MATH_QUESTIONS[currentQuestionIdx].correctAnswer;

    if (isCorrect) {
      soundEffects.playCorrect();
      setScore(prev => prev + 1);
      setUserStreak(prev => prev + 1);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      soundEffects.playBoing();
      setUserStreak(0);
    }
  };

  const handleNextQuestion = () => {
    soundEffects.playWhoosh();
    if (currentQuestionIdx + 1 < MATH_QUESTIONS.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestartQuiz = () => {
    soundEffects.playPop();
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setUserStreak(0);
  };

  // Riddle Toggle
  const toggleRiddleAnswer = (riddleId: string) => {
    soundEffects.playBoing();
    setRevealedRiddles(prev => ({
      ...prev,
      [riddleId]: !prev[riddleId]
    }));
  };

  const toggleRiddleHint = (riddleId: string) => {
    soundEffects.playPop();
    setRevealedHints(prev => ({
      ...prev,
      [riddleId]: !prev[riddleId]
    }));
  };

  const filteredEvsFacts = evsCategory === 'all'
    ? EVS_FACTS
    : EVS_FACTS.filter(item => item.category === evsCategory);

  const currentQ = MATH_QUESTIONS[currentQuestionIdx];

  return (
    <section id="subjects" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 via-white to-blue-50/30 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-xs font-bubble font-bold mb-3 border border-amber-300">
            <Sparkles className="w-4 h-4 text-amber-600" />
            SECTION 02 • SCHOOL SUPERSTARS
          </div>
          <h2 className="font-bubble text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Favorite Subjects: Math & EVS
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Where logic meets nature! Dive into Avik's favorite brain challenges and environmental science discoveries.
          </p>

          {/* Subject Tab Toggle Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-100 border-2 border-slate-900 shadow-md">
            <button
              id="btn-tab-math"
              onClick={() => {
                soundEffects.playPop();
                setActiveSubjectTab('math');
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bubble text-sm sm:text-base font-bold transition-all ${
                activeSubjectTab === 'math'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              <Calculator className="w-5 h-5" />
              🧮 Math Mania & Quiz
            </button>

            <button
              id="btn-tab-evs"
              onClick={() => {
                soundEffects.playPop();
                setActiveSubjectTab('evs');
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bubble text-sm sm:text-base font-bold transition-all ${
                activeSubjectTab === 'evs'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-emerald-600'
              }`}
            >
              <Trees className="w-5 h-5" />
              🌿 EVS Nature & Space
            </button>
          </div>

          <div className="mt-3">
            <SecretSpotEasterEgg spotId="math-chalkboard" activeSpotId={activeSpotId || ''} />
          </div>
        </div>

        {/* MATH TAB CONTENT */}
        {activeSubjectTab === 'math' && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* Puzzle Cards Highlight Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Card 1: Number Cruncher */}
              <div className="bg-white rounded-3xl p-5 border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-2xl mb-3 shadow-md">
                  🔢
                </div>
                <h3 className="font-bubble text-xl font-bold text-slate-900">
                  Number Cruncher
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Fast multiplication tables, doubling tricks, and breaking big numbers into friendly tens and hundreds!
                </p>
                <div className="mt-3 inline-block bg-blue-50 text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded-md border border-blue-200">
                  Trick: 9× Table Hand Pattern 🖐️
                </div>
              </div>

              {/* Card 2: Shape Explorer */}
              <div className="bg-white rounded-3xl p-5 border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl mb-3 shadow-md">
                  🔷
                </div>
                <h3 className="font-bubble text-xl font-bold text-slate-900">
                  Shape Explorer
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Exploring 3D geometry: counting vertices on cubes, pyramids, spheres, and calculating LEGO building area!
                </p>
                <div className="mt-3 inline-block bg-amber-50 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-md border border-amber-200">
                  Rule: Faces + Vertices - Edges = 2
                </div>
              </div>

              {/* Card 3: Speed Arena */}
              <div className="bg-white rounded-3xl p-5 border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center text-2xl mb-3 shadow-md">
                  ⚡
                </div>
                <h3 className="font-bubble text-xl font-bold text-slate-900">
                  Speed Math Arena
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Rapid-fire mental math rounds during car rides: calculating distance, fuel mileage, and time to destination!
                </p>
                <div className="mt-3 inline-block bg-red-50 text-red-700 text-[11px] font-bold px-2.5 py-1 rounded-md border border-red-200">
                  Speed Record: 10 Qs in 45s
                </div>
              </div>

              {/* Card 4: Pattern Detective */}
              <div className="bg-white rounded-3xl p-5 border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center text-2xl mb-3 shadow-md">
                  🔍
                </div>
                <h3 className="font-bubble text-xl font-bold text-slate-900">
                  Pattern Detective
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Cracking number sequences, Fibonacci spirals in sunflower seeds, and tile repeating tessellations.
                </p>
                <div className="mt-3 inline-block bg-purple-50 text-purple-700 text-[11px] font-bold px-2.5 py-1 rounded-md border border-purple-200">
                  Secret: Nature is full of Math! 🌻
                </div>
              </div>

            </div>

            {/* Interactive Math Quiz & Riddle Arena */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Interactive Quiz Engine (Left 7 Cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4 mb-5 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                      🏆
                    </div>
                    <div>
                      <h3 className="font-bubble text-xl font-bold text-slate-900">
                        Avik's 3rd Grade Math Challenge
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold">
                        Test your speed & logic skills!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {userStreak > 1 && (
                      <span className="bg-amber-400 text-slate-950 font-bubble text-xs font-black px-2.5 py-1 rounded-full border border-slate-900 animate-bounce">
                        🔥 {userStreak} Streak!
                      </span>
                    )}
                    <span className="bg-blue-100 text-blue-800 text-xs font-bubble font-bold px-3 py-1 rounded-full">
                      Score: {score} / {MATH_QUESTIONS.length}
                    </span>
                  </div>
                </div>

                {!quizFinished ? (
                  <div className="space-y-5">
                    {/* Progress Bar & Question Meta */}
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                      <span>Question {currentQuestionIdx + 1} of {MATH_QUESTIONS.length}</span>
                      <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md">
                        {currentQ.difficulty} Level
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                        style={{ width: `${((currentQuestionIdx + 1) / MATH_QUESTIONS.length) * 100}%` }}
                      />
                    </div>

                    {/* Question Box */}
                    <div className="bg-blue-50/70 p-5 rounded-2xl border-2 border-blue-200">
                      <p className="font-bubble text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {currentQ.question}
                      </p>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentQ.options.map((option, idx) => {
                        let btnStyle = 'bg-white border-2 border-slate-300 hover:border-blue-500 text-slate-800';
                        
                        if (selectedOption === idx) {
                          btnStyle = 'bg-blue-50 border-2 border-blue-600 text-blue-900 font-bold shadow-xs';
                        }
                        
                        if (isAnswerSubmitted) {
                          if (idx === currentQ.correctAnswer) {
                            btnStyle = 'bg-emerald-100 border-2 border-emerald-600 text-emerald-900 font-bold';
                          } else if (selectedOption === idx) {
                            btnStyle = 'bg-rose-100 border-2 border-rose-600 text-rose-900';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            id={`quiz-option-${idx}`}
                            onClick={() => handleSelectOption(idx)}
                            disabled={isAnswerSubmitted}
                            className={`p-3.5 rounded-2xl text-left font-bubble text-sm transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{option}</span>
                            {isAnswerSubmitted && idx === currentQ.correctAnswer && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                            )}
                            {isAnswerSubmitted && selectedOption === idx && idx !== currentQ.correctAnswer && (
                              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback & Explanation Box */}
                    {isAnswerSubmitted && (
                      <div className={`p-4 rounded-2xl border-2 animate-fadeIn ${
                        selectedOption === currentQ.correctAnswer
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : 'bg-rose-50 border-rose-300 text-rose-950'
                      }`}>
                        <div className="font-bubble font-bold text-sm flex items-center gap-1.5 mb-1">
                          {selectedOption === currentQ.correctAnswer ? '🎉 Super Job, Math Star!' : '💡 Good Try! Here is how to solve it:'}
                        </div>
                        <p className="text-xs leading-relaxed">
                          {currentQ.explanation}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                      {!isAnswerSubmitted ? (
                        <button
                          id="btn-submit-math-answer"
                          onClick={handleSubmitAnswer}
                          disabled={selectedOption === null}
                          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bubble text-sm font-bold px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
                        >
                          Check Answer 🚀
                        </button>
                      ) : (
                        <button
                          id="btn-next-math-question"
                          onClick={handleNextQuestion}
                          className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bubble text-sm font-bold px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                        >
                          {currentQuestionIdx + 1 < MATH_QUESTIONS.length ? 'Next Question →' : 'See Final Results 🏆'}
                        </button>
                      )}
                    </div>

                  </div>
                ) : (
                  /* Quiz Finish Card */
                  <div className="text-center py-8 space-y-4 animate-fadeIn">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400 border-4 border-slate-900 flex items-center justify-center text-4xl shadow-md animate-bounce">
                      👑
                    </div>
                    <h4 className="font-bubble text-2xl sm:text-3xl font-extrabold text-slate-900">
                      Math Quest Completed!
                    </h4>
                    <p className="text-sm text-slate-600 max-w-sm mx-auto">
                      You scored <span className="font-bold text-blue-600 text-lg">{score}</span> out of <span className="font-bold text-lg">{MATH_QUESTIONS.length}</span>!
                      {score === MATH_QUESTIONS.length
                        ? ' Unbelievable! You have a 3rd Grade Math Superbrain! 🌟'
                        : ' Awesome effort! Practice makes master builders and math whizzes! 🚀'}
                    </p>
                    <button
                      id="btn-restart-math-quiz"
                      onClick={handleRestartQuiz}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bubble text-sm font-bold px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 mx-auto active:scale-95 transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Play Math Quest Again!
                    </button>
                  </div>
                )}

              </div>

              {/* Pop-Up Math Riddles (Right 5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bubble text-xl font-bold text-slate-900">
                    Avik's Pop-Up Brain Riddles
                  </h3>
                </div>
                <p className="text-xs text-slate-600">
                  Can you solve these trick riddles before revealing the answers?
                </p>

                <div className="space-y-3.5">
                  {MATH_RIDDLES.map((riddle) => {
                    const isRevealed = revealedRiddles[riddle.id];
                    const isHintRevealed = revealedHints[riddle.id];

                    return (
                      <div
                        key={riddle.id}
                        className="bg-white p-4 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bubble font-bold text-sm text-slate-900">
                            🧩 {riddle.title}
                          </span>
                          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                            {riddle.category}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed font-medium mb-3">
                          "{riddle.riddle}"
                        </p>

                        {/* Hint box if toggled */}
                        {isHintRevealed && (
                          <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-xs text-amber-900 mb-3 animate-fadeIn flex items-start gap-1.5">
                            <span className="text-base">💡</span>
                            <div>
                              <span className="font-bold">Clue:</span> {riddle.hint}
                            </div>
                          </div>
                        )}

                        {/* Answer box if toggled */}
                        {isRevealed && (
                          <div className="bg-emerald-50 border border-emerald-300 p-2.5 rounded-xl text-xs text-emerald-950 font-bold mb-3 animate-fadeIn flex items-start gap-1.5">
                            <span className="text-base">🔓</span>
                            <div>{riddle.answer}</div>
                          </div>
                        )}

                        {/* Buttons to toggle hint and answer */}
                        <div className="flex items-center justify-between pt-1">
                          <button
                            id={`btn-hint-${riddle.id}`}
                            onClick={() => toggleRiddleHint(riddle.id)}
                            className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 hover:underline"
                          >
                            <Lightbulb className="w-3.5 h-3.5" />
                            {isHintRevealed ? 'Hide Clue' : 'Need a Clue?'}
                          </button>

                          <button
                            id={`btn-reveal-${riddle.id}`}
                            onClick={() => toggleRiddleAnswer(riddle.id)}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bubble text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1 active:scale-95 transition-all"
                          >
                            {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            {isRevealed ? 'Hide Answer' : 'Reveal Answer'}
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* EVS (ENVIRONMENTAL STUDIES) TAB CONTENT */}
        {activeSubjectTab === 'evs' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Nature Theme Header Banner */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-3xl p-6 sm:p-8 text-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden">
              <div className="absolute right-4 bottom-2 text-8xl opacity-15 pointer-events-none">
                🌿
              </div>
              <div className="max-w-2xl relative z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-emerald-800/80 text-emerald-200 text-xs font-bubble font-bold px-3 py-1 rounded-full border border-emerald-400/40">
                  <Leaf className="w-3.5 h-3.5 text-emerald-300" />
                  EVS NATURE & PLANET EXPLORER
                </div>
                <h3 className="font-bubble text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Protecting Animals, Space & Planet Earth! 🌍
                </h3>
                <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                  In 3rd Grade EVS, Avik studies living organisms, solar systems, plant life cycles, and how every kid can be an eco-superhero.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="mt-6 flex flex-wrap items-center gap-2 pt-2 border-t border-emerald-500/40">
                {[
                  { id: 'all', label: 'All Discoveries 🌟' },
                  { id: 'space', label: 'Space & Planets 🪐' },
                  { id: 'animals', label: 'Wild Animals 🐆' },
                  { id: 'plants', label: 'Plant Life 🌱' },
                  { id: 'planet-hero', label: 'Eco-Heroes 💧' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    id={`btn-evs-filter-${tab.id}`}
                    onClick={() => {
                      soundEffects.playPop();
                      setEvsCategory(tab.id as typeof evsCategory);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bubble font-bold transition-all ${
                      evsCategory === tab.id
                        ? 'bg-amber-300 text-slate-950 shadow-md scale-105 border-2 border-slate-900'
                        : 'bg-emerald-700/60 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* EVS Fact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvsFacts.map((fact) => (
                <div
                  key={fact.id}
                  onClick={() => {
                    soundEffects.playPop();
                    setSelectedEvsFact(selectedEvsFact === fact.id ? null : fact.id);
                  }}
                  className="bg-white rounded-3xl p-5 border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                        {fact.badge}
                      </span>
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {fact.category === 'space' && '🪐'}
                        {fact.category === 'animals' && '🐆'}
                        {fact.category === 'plants' && '🌱'}
                        {fact.category === 'planet-hero' && '💧'}
                      </span>
                    </div>

                    <h4 className="font-bubble text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {fact.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {fact.summary}
                    </p>

                    {/* Cool Fact Box */}
                    <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
                      <div className="font-bold flex items-center gap-1 text-amber-800">
                        <Sparkles className="w-3.5 h-3.5" />
                        Mind-Blowing Fact:
                      </div>
                      <p className="leading-relaxed">
                        {fact.coolFact}
                      </p>
                    </div>

                    {/* Avik's Personal Field Notes */}
                    <div className="bg-blue-50 p-3 rounded-2xl border border-blue-200 text-xs text-blue-950 space-y-1">
                      <div className="font-bold flex items-center gap-1 text-blue-800">
                        <span>📝</span> Avik's Field Observation:
                      </div>
                      <p className="italic leading-relaxed">
                        "{fact.avikNotes}"
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>Third Grade Science Log</span>
                    <span className="text-emerald-600 flex items-center gap-1">
                      Verified True ✓
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Eco-Hero Certificate Card */}
            <div className="bg-amber-100 rounded-3xl p-6 border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white border-2 border-slate-900 flex items-center justify-center text-3xl shrink-0 shadow-md">
                  🌳
                </div>
                <div>
                  <h4 className="font-bubble text-lg sm:text-xl font-bold text-slate-900">
                    Avik's 3rd Grade Eco-Hero Mission
                  </h4>
                  <p className="text-xs text-slate-700">
                    Turn off running taps, plant seeds, reuse cardboard boxes for LEGO castles, and switch off lights!
                  </p>
                </div>
              </div>
              <button
                id="btn-stamp-eco-pledge"
                onClick={() => {
                  soundEffects.playCorrect();
                  confetti({
                    particleCount: 50,
                    spread: 70,
                    origin: { y: 0.8 }
                  });
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bubble text-xs font-bold px-5 py-2.5 rounded-xl border-2 border-slate-900 shadow-md shrink-0 active:scale-95 transition-all"
              >
                🌿 Stamp Eco-Pledge!
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
