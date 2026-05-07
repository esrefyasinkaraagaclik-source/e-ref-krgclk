import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MindmapNode } from '../types/curriculum';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Illustration } from './Illustrations';

interface MindmapActivityProps {
  nodes: MindmapNode[];
  centralText?: string;
  onComplete: (score: number) => void;
}

export function MindmapActivity({ nodes, centralText = "Merkez Node", onComplete }: MindmapActivityProps) {
  const [selectedNode, setSelectedNode] = useState<MindmapNode | null>(null);
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [radius, setRadius] = useState(window.innerWidth < 640 ? 120 : 220);
  
  const [errors, setErrors] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const handleResize = () => setRadius(window.innerWidth < 640 ? 120 : 220);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNodeClick = (node: MindmapNode) => {
    if (!completedNodes.includes(node.id)) {
      setSelectedNode(node);
      setShowFeedback(null);
    }
  };

  const handleOptionSelect = (isCorrect: boolean) => {
    if (isCorrect) {
      setShowFeedback('correct');
      setTimeout(() => {
        const newCompleted = [...completedNodes, selectedNode!.id];
        setCompletedNodes(newCompleted);
        setSelectedNode(null);
        setShowFeedback(null);
        
        if (newCompleted.length === nodes.length) {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] relative">
      {/* Mindmap Visualization */}
      <div className="relative w-full max-w-3xl h-[500px] sm:h-[600px] mx-auto flex items-center justify-center">
        {/* SVG Lines Background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {nodes.map((node, index) => {
            const angle = (index * 360) / nodes.length;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            const isCompleted = completedNodes.includes(node.id);
            return (
              <line
                key={`line-${node.id}`}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${x}px)`}
                y2={`calc(50% + ${y}px)`}
                stroke={isCompleted ? '#10b981' : '#334155'}
                strokeWidth="2"
                strokeDasharray={isCompleted ? 'none' : '4 4'}
              />
            );
          })}
        </svg>

        {/* Central Node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-slate-800 border-4 border-cyan-500 flex items-center justify-center text-center p-4 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
          <span className="font-bold text-white text-sm sm:text-base">{centralText}</span>
        </div>

        {/* Surrounding Nodes */}
        {nodes.map((node, index) => {
          const angle = (index * 360) / nodes.length;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          const isCompleted = completedNodes.includes(node.id);
          const isSelected = selectedNode?.id === node.id;

          return (
            <div 
              key={node.id}
              className="absolute top-1/2 left-1/2 z-10"
              style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  onClick={() => handleNodeClick(node)}
                  disabled={isCompleted}
                  className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center p-2 text-center transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-300' 
                      : isSelected
                        ? `${node.color} border-2 border-white text-white scale-110 shadow-lg`
                        : 'bg-slate-800 border-2 border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-300'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-medium leading-tight">{node.label}</span>
                  {isCompleted && (
                    <CheckCircle2 className="absolute -top-2 -right-2 w-6 h-6 text-emerald-500 bg-slate-900 rounded-full" />
                  )}
                </button>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Question Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-0 left-0 w-full bg-slate-900 border-t border-slate-700 p-6 shadow-2xl z-50 rounded-t-3xl"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${selectedNode.color}`}></span>
                  {selectedNode.label}
                </h3>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="text-slate-400 hover:text-white"
                >
                  Kapat
                </button>
              </div>
              
              <p className="text-lg text-slate-200 mb-8">{selectedNode.question.text}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {selectedNode.question.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option.isCorrect)}
                    disabled={showFeedback !== null}
                    className="flex flex-col items-center gap-4 p-4 rounded-xl border-2 border-slate-700 bg-slate-800 hover:border-cyan-500 hover:bg-slate-800/80 transition-all group"
                  >
                    {option.svgId ? (
                      <div className="w-full h-48 rounded-lg overflow-hidden relative bg-slate-900/50 flex items-center justify-center p-4">
                        <Illustration id={option.svgId} />
                      </div>
                    ) : option.image ? (
                      <div className="w-full h-48 rounded-lg overflow-hidden relative">
                        <img 
                          src={option.image} 
                          alt={option.text} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                      </div>
                    ) : null}
                    <span className="font-medium text-slate-200 text-center">{option.text}</span>
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
                    className={`absolute inset-0 flex items-center justify-center rounded-t-3xl backdrop-blur-sm ${
                      showFeedback === 'correct' ? 'bg-emerald-900/80' : 'bg-red-900/80'
                    }`}
                  >
                    <div className="text-center">
                      {showFeedback === 'correct' ? (
                        <>
                          <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto mb-4" />
                          <h4 className="text-2xl font-bold text-white">Tebrikler! Doğru Cevap</h4>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
                          <h4 className="text-2xl font-bold text-white">Yanlış Cevap. Tekrar Dene!</h4>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
