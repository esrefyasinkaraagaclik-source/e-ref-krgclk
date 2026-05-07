import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { MoleculeViewer } from './MoleculeViewer';
import { MoleculeData } from '../types/curriculum';

interface MatchingPair {
  left: string;
  right: string;
  rightType?: 'text' | 'molecule';
  rightMolecule?: MoleculeData;
}

interface MatchingGameProps {
  pairs: MatchingPair[];
  onComplete: (score: number) => void;
}

export function MatchingGame({ pairs, onComplete }: MatchingGameProps) {
  const [leftItems, setLeftItems] = useState<{ id: string; text: string }[]>([]);
  const [rightItems, setRightItems] = useState<{ id: string; text: string; type?: 'text' | 'molecule'; molecule?: MoleculeData }[]>([]);
  
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  
  const [matchedPairs, setMatchedPairs] = useState<{ leftId: string; rightId: string }[]>([]);
  const [errorPair, setErrorPair] = useState<{ left: string; right: string } | null>(null);
  
  const [errors, setErrors] = useState(0);
  const [startTime] = useState(Date.now());

  // Shuffle arrays on mount
  useEffect(() => {
    const shuffledLeft = [...pairs].sort(() => Math.random() - 0.5).map(p => ({ id: p.left, text: p.left }));
    const shuffledRight = [...pairs].sort(() => Math.random() - 0.5).map((p, i) => ({ 
      id: `${p.right}-${i}`, 
      text: p.right,
      type: p.rightType,
      molecule: p.rightMolecule
    }));
    
    setLeftItems(shuffledLeft);
    setRightItems(shuffledRight);
  }, [pairs]);

  // Check for match when both selected
  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const leftPair = pairs.find(p => p.left === selectedLeft);
      const rightPairText = rightItems.find(r => r.id === selectedRight)?.text;
      
      const isMatch = leftPair && rightPairText && leftPair.right.trim() === rightPairText.trim();
      
      if (isMatch) {
        // Match success
        setMatchedPairs(prev => [...prev, { leftId: selectedLeft, rightId: selectedRight }]);
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        // Match failed
        setErrorPair({ left: selectedLeft, right: selectedRight });
        setErrors(prev => prev + 1);
        
        // Reset selection after delay
        setTimeout(() => {
          setErrorPair(null);
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 1000);
      }
    }
  }, [selectedLeft, selectedRight, pairs, rightItems]);

  // Check for completion
  useEffect(() => {
    if (matchedPairs.length === pairs.length && pairs.length > 0) {
      const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
      const calculatedScore = Math.max(0, 1000 - (errors * 50) - (timeInSeconds * 2));
      
      setTimeout(() => {
        onComplete(calculatedScore);
      }, 1500);
    }
  }, [matchedPairs, pairs, onComplete, errors, startTime]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Kavramları Eşleştir</h3>
      </div>
      
      <p className="text-slate-400 mb-8 text-sm">
        Soldaki kavramı seçip sağdaki doğru açıklamasıyla eşleştir.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-3">
          {leftItems.map((item) => {
            const isMatched = matchedPairs.some(m => m.leftId === item.id);
            const isSelected = selectedLeft === item.id;
            const isError = errorPair?.left === item.id;
            
            let btnClass = "w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden ";
            if (isMatched) {
              btnClass += "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 opacity-50 cursor-default";
            } else if (isError) {
              btnClass += "border-red-500 bg-red-500/20 text-red-400 animate-shake";
            } else if (isSelected) {
              btnClass += "border-cyan-500 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]";
            } else {
              btnClass += "border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:border-slate-600 text-slate-200 cursor-pointer";
            }

            return (
              <motion.button
                key={`left-${item.id}`}
                layout
                disabled={isMatched || !!errorPair}
                onClick={() => setSelectedLeft(isSelected ? null : item.id)}
                className={btnClass}
              >
                <div className="flex items-center justify-between min-h-[48px]">
                  <span className="font-medium leading-relaxed pr-8">{item.text}</span>
                  {isMatched && <CheckCircle2 className="w-5 h-5 shrink-0 absolute top-1/2 -translate-y-1/2 right-4" />}
                  {isError && <XCircle className="w-5 h-5 shrink-0 absolute top-1/2 -translate-y-1/2 right-4" />}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          {rightItems.map((item) => {
            const isMatched = matchedPairs.some(m => m.rightId === item.id);
            const isSelected = selectedRight === item.id;
            const isError = errorPair?.right === item.id;
            
            let btnClass = "w-full text-left p-4 rounded-xl border transition-all text-sm relative overflow-hidden ";
            if (isMatched) {
              btnClass += "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 opacity-50 cursor-default";
            } else if (isError) {
              btnClass += "border-red-500 bg-red-500/20 text-red-400 animate-shake";
            } else if (isSelected) {
              btnClass += "border-cyan-500 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]";
            } else {
              btnClass += "border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:border-slate-600 text-slate-300 cursor-pointer";
            }

            return (
              <motion.button
                key={`right-${item.id}`}
                layout
                disabled={isMatched || !!errorPair}
                onClick={() => setSelectedRight(isSelected ? null : item.id)}
                className={btnClass}
              >
                <div className="flex items-center justify-between min-h-[48px]">
                  {item.type === 'molecule' && item.molecule ? (
                    <div className="w-full h-32 pointer-events-none pr-8">
                      <MoleculeViewer 
                        model={item.molecule} 
                        disableInteraction={true} 
                        hideLabels={true} 
                        className="w-full h-full bg-transparent border-none"
                      />
                    </div>
                  ) : (
                    <span className="leading-relaxed pr-8">{item.text}</span>
                  )}
                  
                  {isMatched && <CheckCircle2 className="w-5 h-5 shrink-0 absolute top-1/2 -translate-y-1/2 right-4" />}
                  {isError && <XCircle className="w-5 h-5 shrink-0 absolute top-1/2 -translate-y-1/2 right-4" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {matchedPairs.length === pairs.length && pairs.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 p-6 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-center"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h4 className="text-xl font-bold text-white mb-2">Tebrikler!</h4>
          <p className="text-emerald-300">Tüm eşleştirmeleri başarıyla tamamladın.</p>
        </motion.div>
      )}
    </div>
  );
}
