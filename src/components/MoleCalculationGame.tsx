import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MoleCalculationData, MoleCalcItem } from '../types/curriculum';
import { CheckCircle2, XCircle, Scale, Beaker, Package } from 'lucide-react';

interface MoleCalculationGameProps {
  data: MoleCalculationData;
  onComplete: (score: number) => void;
}

export function MoleCalculationGame({ data, onComplete }: MoleCalculationGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [errors, setErrors] = useState(0);
  const [startTime] = useState(Date.now());
  const [isFinished, setIsFinished] = useState(false);

  const currentItem = data.items[currentIndex];

  const handleSelect = (optionId: string) => {
    if (showFeedback || isFinished) return;

    const isCorrect = currentItem.options.find(o => o.id === optionId)?.isCorrect;

    if (isCorrect) {
      setShowFeedback('correct');
      setTimeout(() => {
        setShowFeedback(null);
        if (currentIndex < data.items.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setIsFinished(true);
          const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
          const calculatedScore = Math.max(0, 1000 - (errors * 50) - (timeInSeconds * 2));
          onComplete(calculatedScore);
        }
      }, 3500); // More time to read math explanations
    } else {
      setErrors(prev => prev + 1);
      setShowFeedback('incorrect');
      setTimeout(() => setShowFeedback(null), 1500);
    }
  };

  if (isFinished) {
    return null;
  }

  const RenderMassVisual = ({ val, sub }: { val: string; sub?: string }) => (
    <div className="relative flex flex-col items-center justify-center h-56 w-full">
      <motion.div 
        animate={{ rotate: [-3, 3, -3] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="relative flex flex-col items-center"
      >
        <div className="relative">
          <Scale className="w-32 h-32 text-amber-500 drop-shadow-lg" strokeWidth={1.5} />
          <motion.div 
            animate={{ y: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-4 -right-12"
          >
            <div className="bg-slate-800 border-2 border-stone-500 rounded-lg p-2 shadow-xl flex flex-col items-center justify-center font-mono">
              <span className="text-amber-200 text-xl font-bold">{val}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
      {sub && <div className="mt-6 text-sm text-slate-400 font-mono bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700">{sub}</div>}
    </div>
  );

  const RenderParticleVisual = ({ val, sub }: { val: string; sub?: string }) => (
    <div className="relative flex flex-col items-center justify-center h-56 w-full">
      <div className="relative w-40 h-40 border-2 border-cyan-500/50 bg-cyan-950/30 rounded-2xl shadow-[inset_0_0_20px_rgba(34,211,238,0.2)] overflow-hidden flex flex-col items-center justify-center">
        {/* Animated Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [Math.random() * 120 - 60, Math.random() * 120 - 60, Math.random() * 120 - 60],
              y: [Math.random() * 120 - 60, Math.random() * 120 - 60, Math.random() * 120 - 60],
            }}
            transition={{ repeat: Infinity, duration: 3 + Math.random() * 3, type: 'tween', ease: 'linear' }}
            className="absolute w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          />
        ))}
        {/* Value Overlay */}
        <div className="z-10 bg-slate-900/90 px-4 py-2 rounded-xl border border-cyan-500/50 backdrop-blur-md shadow-lg">
          <span className="text-cyan-300 font-bold font-mono text-lg">{val}</span>
        </div>
      </div>
      {sub && <div className="mt-6 text-sm text-slate-400 font-mono bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700">{sub}</div>}
    </div>
  );

  const RenderVolumeVisual = ({ val, sub }: { val: string; sub?: string }) => (
    <div className="relative flex flex-col items-center justify-center h-56 w-full">
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="relative flex flex-col items-center"
      >
        <div className="w-28 h-32 bg-gradient-to-br from-purple-500 to-purple-700 rounded-[50%] flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.4)] relative">
          <div className="absolute top-2 left-4 w-6 h-10 bg-white/20 rounded-full blur-[2px] rotate-[-20deg]"></div>
          <span className="text-white font-bold font-mono text-xl drop-shadow-md z-10">{val}</span>
        </div>
        {/* Balloon tie */}
        <div className="w-3 h-4 bg-purple-700 mt-[-2px] clip-path-triangle z-0"></div>
        {/* String */}
        <motion.div 
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-0.5 h-20 bg-slate-500 origin-top"
        ></motion.div>
      </motion.div>
      {sub && <div className="absolute bottom-0 text-sm text-slate-400 font-mono bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700">{sub}</div>}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Soru {currentIndex + 1} / {data.items.length}</h3>
        <div className="text-sm text-slate-400">
          İlerleme: %{Math.round(((currentIndex) / data.items.length) * 100)}
        </div>
      </div>
      
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-8">
        <div 
          className="h-full bg-cyan-500 transition-all duration-500"
          style={{ width: `${((currentIndex) / data.items.length) * 100}%` }}
        />
      </div>

      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">{currentItem.questionText}</h2>
      </div>

      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 mb-8 relative">
        <div className="w-full relative mb-8">
          {currentItem.calcType === 'mass' && <RenderMassVisual val={currentItem.givenValue} sub={currentItem.subText} />}
          {currentItem.calcType === 'particle' && <RenderParticleVisual val={currentItem.givenValue} sub={currentItem.subText} />}
          {currentItem.calcType === 'volume' && <RenderVolumeVisual val={currentItem.givenValue} sub={currentItem.subText} />}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentItem.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={showFeedback !== null}
              className="py-4 px-6 rounded-xl font-bold text-lg border-2 border-slate-700 bg-slate-800 transition-all text-slate-200 hover:border-cyan-500 hover:text-cyan-400 hover:bg-slate-800/80"
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Feedback Overlay */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 flex items-center justify-center rounded-2xl backdrop-blur-md z-20 ${
                showFeedback === 'correct' ? 'bg-emerald-900/95' : 'bg-red-900/90'
              }`}
            >
              <div className="text-center p-6 max-w-xl">
                {showFeedback === 'correct' ? (
                  <>
                    <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto mb-4" />
                    <h4 className="text-3xl font-bold text-white mb-6">Doğru!</h4>
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-emerald-500/30 text-left">
                      <p className="text-emerald-100 text-lg leading-relaxed font-mono whitespace-pre-wrap">{currentItem.explanation}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
                    <h4 className="text-3xl font-bold text-white mb-2">Yanlış</h4>
                    <p className="text-red-200 text-lg">Hesaplamanı tekrar kontrol et. Gerekirse formülleri hatırla (n=m/Ma, n=V/22.4, n=N/Na).</p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
