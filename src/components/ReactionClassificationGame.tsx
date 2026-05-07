import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReactionTypeData, ReactionTypeItem } from '../types/curriculum';
import { CheckCircle2, XCircle, Beaker } from 'lucide-react';

interface ReactionClassificationGameProps {
  data: ReactionTypeData;
  onComplete: (score: number) => void;
}

export function ReactionClassificationGame({ data, onComplete }: ReactionClassificationGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [errors, setErrors] = useState(0);
  const [startTime] = useState(Date.now());
  const [isFinished, setIsFinished] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // to retrigger animation

  const currentItem = data.items[currentIndex];

  useEffect(() => {
    // Retrigger animation on new item
    setAnimationKey(prev => prev + 1);
  }, [currentIndex]);

  const handleSelect = (type: string) => {
    if (showFeedback || isFinished) return;

    if (type === currentItem.correctType) {
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
      }, 2500); // give enough time to read explanation
    } else {
      setErrors(prev => prev + 1);
      setShowFeedback('incorrect');
      setTimeout(() => setShowFeedback(null), 1500);
    }
  };

  if (isFinished) {
    return null;
  }

  // Generate stylized representation of equation based on animation mode
  const renderInteractiveAnimation = (item: ReactionTypeItem) => {
    return (
      <div className="relative min-h-64 sm:min-h-80 w-full bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-4 sm:p-8 overflow-hidden" key={`anim-${animationKey}`}>
        
        {/* Background Beaker */}
        <div className="absolute opacity-10 flex flex-col items-center pointer-events-none">
           <Beaker className="w-48 h-48 sm:w-64 sm:h-64" />
        </div>

        <div className="z-10 flex flex-col w-full h-full justify-evenly items-center gap-6">
          
          {/* Reaction Equation Full string with nice formatting */}
          <div className="text-lg sm:text-2xl lg:text-3xl font-mono text-cyan-300 bg-slate-900/80 px-4 sm:px-6 py-3 rounded-xl border border-slate-700/50 flex w-full max-w-full overflow-hidden text-center justify-center break-words break-all sm:break-normal whitespace-pre-wrap leading-relaxed shadow-lg">
             {item.equation}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full">
            
            {/* Reactants Container */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {item.reactants.map((reactant, idx) => (
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.2, duration: 0.5, type: 'spring' }}
                  key={`r-${idx}`} 
                  className="flex flex-col items-center"
                >
                  <motion.div 
                    animate={
                      item.animationType === 'acid-base' ? { y: [0, -5, 0] } :
                      item.animationType === 'precipitation' ? { scale: [1, 1.1, 1] } : 
                      {}
                    }
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-bold text-lg shadow-lg border-2 ${reactant.color || 'bg-slate-700 border-slate-500'}`}
                  >
                    {reactant.formula}
                  </motion.div>
                  <span className="text-xs text-slate-400 mt-2 font-mono bg-slate-800 px-2 py-1 rounded">{reactant.state}</span>
                </motion.div>
              ))}
            </div>

            {/* Reaction Arrow animation */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="hidden md:flex text-3xl font-bold text-slate-500"
            >
              ➔
            </motion.div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="flex md:hidden text-3xl font-bold text-slate-500 rotate-90"
            >
              ➔
            </motion.div>

            {/* Products Container */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {item.products.map((product, idx) => (
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.5 + idx * 0.2, duration: 0.5, type: 'spring' }}
                  key={`p-${idx}`} 
                  className="flex flex-col items-center"
                >
                  <motion.div 
                    animate={
                      product.state === '(k)' || product.state === '(s)' || item.animationType === 'precipitation' 
                        ? { y: [0, 20, 0] } // Solid drops down
                        : item.animationType === 'redox' 
                          ? { rotate: [0, 10, -10, 0] }
                          : { y: [0, -5, 0] }
                    }
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-[4px] flex items-center justify-center font-bold text-lg shadow-lg border-2 ${product.color || 'bg-slate-700 border-slate-500'}`}
                  >
                    {product.formula}
                  </motion.div>
                  <span className="text-xs text-slate-400 mt-2 font-mono bg-slate-800 px-2 py-1 rounded">{product.state}</span>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    );
  };

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

      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Bu tepkime türünü belirleyin</h2>
        <p className="text-slate-400">Aşağıdaki tepkimeyi ve süreç animasyonunu inceleyip doğru tepkime sınıfını seçin.</p>
      </div>

      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 mb-8 relative">
        <div className="w-full relative mb-8">
          {renderInteractiveAnimation(currentItem)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={showFeedback !== null}
              className={`py-4 px-6 rounded-xl font-bold text-lg border-2 border-slate-700 bg-slate-800 transition-all text-slate-200 ${option.colorClass}`}
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
                showFeedback === 'correct' ? 'bg-emerald-900/90' : 'bg-red-900/90'
              }`}
            >
              <div className="text-center p-6 max-w-lg">
                {showFeedback === 'correct' ? (
                  <>
                    <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto mb-4" />
                    <h4 className="text-3xl font-bold text-white mb-4">Doğru!</h4>
                    {currentItem.explanation && (
                      <p className="text-emerald-100 text-lg leading-relaxed bg-emerald-950/50 p-4 rounded-xl border border-emerald-800/50">{currentItem.explanation}</p>
                    )}
                  </>
                ) : (
                  <>
                    <XCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
                    <h4 className="text-3xl font-bold text-white">Yanlış</h4>
                    <p className="text-red-200 text-lg">Bu tepkimenin türü seçtiğiniz değil. Tekrar deneyin veya tepkime özelliklerine dikkat edin (çöken madde, ısı, asit/baz vs).</p>
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
