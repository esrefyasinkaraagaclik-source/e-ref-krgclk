import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReactionData, ReactionItem } from '../types/curriculum';
import { MoleculeViewer } from './MoleculeViewer';
import { CheckCircle2, ArrowRight, Plus, Minus, Beaker, Scale } from 'lucide-react';

interface ReactionGameProps {
  reactions: ReactionData[];
  onComplete: (score: number) => void;
}

export function ReactionGame({ reactions, onComplete }: ReactionGameProps) {
  const [currentReactionIdx, setCurrentReactionIdx] = useState(0);
  const [reactantsCoeffs, setReactantsCoeffs] = useState<number[]>([]);
  const [productsCoeffs, setProductsCoeffs] = useState<number[]>([]);
  const [isBalanced, setIsBalanced] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [errors, setErrors] = useState(0);
  const [startTime] = useState(Date.now());

  const currentReaction = reactions[currentReactionIdx];

  // Initialize coefficients to 1
  useEffect(() => {
    if (currentReaction) {
      setReactantsCoeffs(currentReaction.reactants.map(() => 1));
      setProductsCoeffs(currentReaction.products.map(() => 1));
      setIsBalanced(false);
      setShowSuccess(false);
    }
  }, [currentReactionIdx, currentReaction]);

  // Calculate atom counts
  const calculateAtoms = (items: ReactionItem[], coeffs: number[]) => {
    const counts: Record<string, number> = {};
    items.forEach((item, idx) => {
      const coeff = coeffs[idx] !== undefined ? coeffs[idx] : 1;
      item.molecule.atoms.forEach(atom => {
        counts[atom.element] = (counts[atom.element] || 0) + coeff;
      });
    });
    return counts;
  };

  const reactantsAtoms = calculateAtoms(currentReaction.reactants, reactantsCoeffs);
  const productsAtoms = calculateAtoms(currentReaction.products, productsCoeffs);

  // Check if balanced
  useEffect(() => {
    const allElements = new Set([...Object.keys(reactantsAtoms), ...Object.keys(productsAtoms)]);
    
    // Also check if they are the simplest integer ratio (optional, but good for chemistry)
    // For now, just check if it matches the correct coefficients defined in data
    let matchesCorrect = true;
    currentReaction.reactants.forEach((r, i) => {
      if (reactantsCoeffs[i] !== r.correctCoefficient) matchesCorrect = false;
    });
    currentReaction.products.forEach((p, i) => {
      if (productsCoeffs[i] !== p.correctCoefficient) matchesCorrect = false;
    });

    setIsBalanced(matchesCorrect);
  }, [reactantsCoeffs, productsCoeffs, reactantsAtoms, productsAtoms, currentReaction]);

  // Calculate tilt for the scale animation
  const reactantsTotalAtoms = Object.values(reactantsAtoms).reduce((a, b) => a + b, 0);
  const productsTotalAtoms = Object.values(productsAtoms).reduce((a, b) => a + b, 0);
  
  // Calculate a tilt degree between -15 and 15
  let tiltDegree = 0;
  if (reactantsTotalAtoms > productsTotalAtoms) tiltDegree = -12;
  if (productsTotalAtoms > reactantsTotalAtoms) tiltDegree = 12;
  if (isBalanced) tiltDegree = 0;

  const handleRunReaction = () => {
    if (isBalanced) {
      setShowSuccess(true);
    } else {
      setErrors(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentReactionIdx < reactions.length - 1) {
      setCurrentReactionIdx(prev => prev + 1);
    } else {
      const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
      const calculatedScore = Math.max(0, 1000 - (errors * 50) - (timeInSeconds * 2));
      onComplete(calculatedScore);
    }
  };

  const renderMoleculeControl = (
    item: ReactionItem, 
    idx: number, 
    isReactant: boolean, 
    coeffs: number[], 
    setCoeffs: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    return (
      <div key={idx} className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 bg-slate-800/80 p-2 rounded-xl border border-slate-700">
          <button 
            onClick={() => setCoeffs(prev => {
              const newCoeffs = [...prev];
              if ((newCoeffs[idx] || 1) > 1) newCoeffs[idx] = (newCoeffs[idx] || 1) - 1;
              return newCoeffs;
            })}
            disabled={showSuccess}
            className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white disabled:opacity-50"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-2xl font-bold text-cyan-400 w-8 text-center">{coeffs[idx] !== undefined ? coeffs[idx] : 1}</span>
          <button 
            onClick={() => setCoeffs(prev => {
              const newCoeffs = [...prev];
              if ((newCoeffs[idx] || 1) < 9) newCoeffs[idx] = (newCoeffs[idx] || 1) + 1;
              return newCoeffs;
            })}
            disabled={showSuccess}
            className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-32 h-32 sm:w-40 sm:h-40 relative">
          <MoleculeViewer 
            model={item.molecule} 
            disableInteraction={true} 
            hideLabels={true} 
            className="absolute inset-0 w-full h-full bg-slate-900/50 rounded-xl border border-slate-800"
          />
        </div>
        <div className="text-center">
          <div className="font-medium text-slate-200">{item.molecule.name}</div>
          <div className="text-sm font-mono text-cyan-500">{item.molecule.formula}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Tepkime {currentReactionIdx + 1} / {reactions.length}</h3>
        <div className="text-sm text-slate-400">
          İlerleme: %{Math.round(((currentReactionIdx) / reactions.length) * 100)}
        </div>
      </div>
      
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-8">
        <div 
          className="h-full bg-cyan-500 transition-all duration-500"
          style={{ width: `${((currentReactionIdx) / reactions.length) * 100}%` }}
        />
      </div>

      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">{currentReaction.title}</h2>
        <p className="text-slate-400">{currentReaction.description}</p>
      </div>

      {/* Reaction Builder Area */}
      <div className="bg-slate-900/50 p-6 sm:p-8 rounded-2xl border border-slate-800 mb-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4">
          
          {/* Reactants */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            {currentReaction.reactants.map((item, idx) => (
              <React.Fragment key={`r-${idx}`}>
                {idx > 0 && <span className="text-3xl font-bold text-slate-500">+</span>}
                {renderMoleculeControl(item, idx, true, reactantsCoeffs, setReactantsCoeffs)}
              </React.Fragment>
            ))}
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center justify-center px-4">
            <ArrowRight className="w-12 h-12 text-slate-500 hidden lg:block" />
            <ArrowRight className="w-12 h-12 text-slate-500 block lg:hidden rotate-90 my-4" />
          </div>

          {/* Products */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            {currentReaction.products.map((item, idx) => (
              <React.Fragment key={`p-${idx}`}>
                {idx > 0 && <span className="text-3xl font-bold text-slate-500">+</span>}
                {renderMoleculeControl(item, idx, false, productsCoeffs, setProductsCoeffs)}
              </React.Fragment>
            ))}
          </div>

        </div>

        {/* Success Overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-emerald-900/90 backdrop-blur-sm flex flex-col items-center justify-center z-10"
            >
              <motion.div
                initial={{ scale: 0.5, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="text-center"
              >
                <CheckCircle2 className="w-24 h-24 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">Tepkime Gerçekleşti!</h3>
                <p className="text-emerald-200 text-lg mb-8">Denklem başarıyla eşitlendi.</p>
                <button 
                  onClick={handleNext}
                  className="px-8 py-3 rounded-xl bg-white text-emerald-900 font-bold hover:bg-emerald-50 transition-colors shadow-lg"
                >
                  {currentReactionIdx < reactions.length - 1 ? 'Sıradaki Tepkime' : 'Sonuçları Gör'}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Atom Counters & Scale */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 w-full max-w-4xl mx-auto">
        {/* Reactants Panel */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 w-full md:w-1/3 shadow-inner">
          <h4 className="text-center font-bold text-slate-300 mb-4 border-b border-slate-700 pb-2 flex items-center justify-center gap-2">
            Girenler
            <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full">{reactantsTotalAtoms} Atom</span>
          </h4>
          <div className="space-y-3">
            {Object.entries(reactantsAtoms).map(([element, count]) => (
              <div key={element} className="flex justify-between items-center bg-slate-900/50 px-3 py-2 rounded-lg">
                <span className="text-slate-300 font-medium">{element}</span>
                <span className="text-cyan-400 font-bold font-mono text-lg">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Animated Scale */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/3 py-4">
          <motion.div
            animate={{ rotate: tiltDegree }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className={`flex items-center justify-center p-4 rounded-full transition-colors duration-500 shadow-xl border-4 ${
              isBalanced ? 'bg-emerald-500/20 shadow-emerald-500/20 border-emerald-500/50' : 'bg-slate-800 border-slate-700'
            }`}
          >
            <Scale className={`w-16 h-16 ${isBalanced ? 'text-emerald-400' : 'text-slate-500'}`} />
          </motion.div>
          <div className="mt-4 text-center">
            {isBalanced ? (
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> DENK</span>
            ) : (
              <span className="text-amber-500 font-bold uppercase tracking-wider text-sm">DENK DEĞİL</span>
            )}
          </div>
        </div>

        {/* Products Panel */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 w-full md:w-1/3 shadow-inner">
          <h4 className="text-center font-bold text-slate-300 mb-4 border-b border-slate-700 pb-2 flex items-center justify-center gap-2">
            Ürünler
            <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full">{productsTotalAtoms} Atom</span>
          </h4>
          <div className="space-y-3">
            {Object.entries(productsAtoms).map(([element, count]) => {
              const expectedCount = reactantsAtoms[element] || 0;
              const isMatching = expectedCount === count;
              
              return (
                <div key={element} className={`flex justify-between items-center px-3 py-2 rounded-lg border ${isMatching ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
                  <span className="text-slate-300 font-medium">{element}</span>
                  <div className="flex items-center gap-2">
                    {!isMatching && <span className="text-xs text-red-400/70 font-mono">({expectedCount} olmalı)</span>}
                    <span className={`font-bold font-mono text-lg ${isMatching ? 'text-emerald-400' : 'text-red-400'}`}>
                      {count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Button */}
      {!showSuccess && (
        <div className="flex justify-center">
          <button
            onClick={handleRunReaction}
            disabled={!isBalanced}
            className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all ${
              isBalanced 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Beaker className="w-6 h-6" />
            Tepkimeyi Gerçekleştir
          </button>
        </div>
      )}
    </div>
  );
}
