import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClassificationData } from '../types/curriculum';
import { MoleculeViewer } from './MoleculeViewer';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface ClassificationGameProps {
  data: ClassificationData;
  onComplete: (score: number) => void;
}

export function ClassificationGame({ data, onComplete }: ClassificationGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [errors, setErrors] = useState(0);
  const [startTime] = useState(Date.now());
  const [isFinished, setIsFinished] = useState(false);

  const currentItem = data.items[currentIndex];

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
      }, 1500);
    } else {
      setErrors(prev => prev + 1);
      setShowFeedback('incorrect');
      setTimeout(() => setShowFeedback(null), 1500);
    }
  };

  if (isFinished) {
    return null; // Handled by parent
  }

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
        <h2 className="text-2xl font-bold text-white mb-2">Bu maddeyi sınıflandırın</h2>
        <p className="text-slate-400">Aşağıdaki tanecik modeline bakarak maddenin türünü seçin.</p>
      </div>

      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 mb-8 relative">
        <div className="h-64 sm:h-80 w-full relative mb-8">
          <MoleculeViewer 
            model={currentItem.molecule} 
            disableInteraction={false} 
            hideLabels={false} 
            className="absolute inset-0 w-full h-full bg-slate-950 rounded-xl border border-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {data.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={showFeedback !== null}
              className={`py-4 px-6 rounded-xl font-bold text-lg border-2 border-slate-700 bg-slate-800 hover:bg-slate-800/80 transition-all text-slate-200 ${option.colorClass}`}
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
              className={`absolute inset-0 flex items-center justify-center rounded-2xl backdrop-blur-sm z-10 ${
                showFeedback === 'correct' ? 'bg-emerald-900/80' : 'bg-red-900/80'
              }`}
            >
              <div className="text-center p-6">
                {showFeedback === 'correct' ? (
                  <>
                    <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto mb-4" />
                    <h4 className="text-3xl font-bold text-white mb-2">Doğru!</h4>
                    {currentItem.explanation && (
                      <p className="text-emerald-200 text-lg">{currentItem.explanation}</p>
                    )}
                  </>
                ) : (
                  <>
                    <XCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
                    <h4 className="text-3xl font-bold text-white">Yanlış</h4>
                    <p className="text-red-200 text-lg">Tekrar deneyin.</p>
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
