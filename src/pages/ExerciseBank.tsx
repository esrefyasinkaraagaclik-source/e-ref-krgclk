import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { exercises, ExerciseQuestion } from '../data/exercises';
import { curriculum } from '../data/curriculum';
import { 
  ChevronRight, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  BookOpen,
  Trophy,
  Filter
} from 'lucide-react';

const ExerciseBank = () => {
  const [selectedThemeId, setSelectedThemeId] = useState(curriculum[0].id);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  // Notify AI Assistant about the selected theme
  React.useEffect(() => {
    localStorage.setItem('active-exercise-theme', selectedThemeId);
    const event = new CustomEvent('exercise-theme-changed', { detail: { themeId: selectedThemeId } });
    window.dispatchEvent(event);
  }, [selectedThemeId]);

  const currentExercises = exercises[selectedThemeId] || [];

  const handleAnswerChange = (questionId: string, answer: any) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    setShowResults(prev => ({ ...prev, [questionId]: true }));
  };

  const isCorrect = (question: ExerciseQuestion) => {
    return userAnswers[question.id] === question.answer;
  };

  const resetExercise = (questionId: string) => {
    setUserAnswers(prev => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
    setShowResults(prev => ({ ...prev, [questionId]: false }));
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-emerald-400" /> Soru Bankası
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Maarif Müfredatı 10. sınıf kimya konularına göre hazırlanmış etkileşimli soru bankası. Farklı soru tipleriyle öğrendiklerini test et.
          </p>
        </div>

        {/* Konu Seçiciler */}
        <div className="flex flex-wrap gap-3 mb-10">
          {curriculum.map(theme => (
            <button
              key={theme.id}
              onClick={() => setSelectedThemeId(theme.id)}
              className={`px-6 py-3 rounded-xl font-bold transition-all border-2 flex items-center gap-2 ${
                selectedThemeId === theme.id 
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <Filter className={`w-4 h-4 ${selectedThemeId === theme.id ? 'text-emerald-200' : 'text-slate-600'}`} />
              {theme.title.includes(':') ? theme.title.split(':')[1].trim() : theme.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8">
          {currentExercises.length > 0 ? (
            currentExercises.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/50 rounded-3xl border border-slate-800 p-8 relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/20">
                      {index + 1}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                        {question.topic} • {question.points} Puan
                      </span>
                      <h3 className="text-xl font-medium text-white leading-relaxed">
                        {question.question}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {question.type === 'multiple-choice' && question.options?.map((option, optIdx) => (
                    <button
                      key={optIdx}
                      disabled={showResults[question.id]}
                      onClick={() => handleAnswerChange(question.id, optIdx)}
                      className={`p-5 rounded-2xl border-2 text-left transition-all relative group ${
                        showResults[question.id]
                          ? optIdx === question.answer
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                            : userAnswers[question.id] === optIdx
                              ? 'bg-red-500/10 border-red-500 text-red-400'
                              : 'bg-slate-900/30 border-slate-800 text-slate-500 opacity-50'
                          : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:bg-emerald-500/5'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:text-emerald-400 border border-white/5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="font-semibold">{option}</span>
                      </div>
                      
                      {showResults[question.id] && optIdx === question.answer && (
                        <CheckCircle2 className="w-5 h-5 absolute top-5 right-5 text-emerald-500" />
                      )}
                      {showResults[question.id] && userAnswers[question.id] === optIdx && optIdx !== question.answer && (
                        <XCircle className="w-5 h-5 absolute top-5 right-5 text-red-500" />
                      )}
                    </button>
                  ))}

                  {question.type === 'true-false' && [true, false].map((option, optIdx) => (
                    <button
                      key={optIdx}
                      disabled={showResults[question.id]}
                      onClick={() => handleAnswerChange(question.id, option)}
                      className={`p-5 rounded-2xl border-2 text-left transition-all relative group ${
                        showResults[question.id]
                          ? option === question.answer
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                            : userAnswers[question.id] === option
                              ? 'bg-red-500/10 border-red-500 text-red-400'
                              : 'bg-slate-900/30 border-slate-800 text-slate-500 opacity-50'
                          : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:bg-emerald-500/5'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center text-xs font-bold border border-white/5 ${option ? 'text-blue-400' : 'text-red-400'}`}>
                          {option ? 'D' : 'Y'}
                        </span>
                        <span className="font-semibold">{option ? 'Doğru' : 'Yanlış'}</span>
                      </div>
                      
                      {showResults[question.id] && option === question.answer && (
                        <CheckCircle2 className="w-5 h-5 absolute top-5 right-5 text-emerald-500" />
                      )}
                      {showResults[question.id] && userAnswers[question.id] === option && option !== question.answer && (
                        <XCircle className="w-5 h-5 absolute top-5 right-5 text-red-500" />
                      )}
                    </button>
                  ))}

                  {question.type === 'fill-in-the-blank' && (
                    <div className="col-span-full">
                      <div className="relative group">
                        <input
                          type="text"
                          disabled={showResults[question.id]}
                          placeholder="Cevabınızı yazın..."
                          className={`w-full p-5 bg-slate-900/50 border-2 rounded-2xl outline-none transition-all ${
                            showResults[question.id]
                              ? (userAnswers[question.id] || '').toString().toLowerCase().trim() === question.answer.toString().toLowerCase().trim()
                                ? 'border-emerald-500 text-emerald-400'
                                : 'border-red-500 text-red-400'
                              : 'border-slate-800 text-white focus:border-emerald-500/50'
                          }`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAnswerChange(question.id, (e.target as HTMLInputElement).value);
                            }
                          }}
                        />
                        {!showResults[question.id] && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-800 px-2 py-1 rounded">Enter</span>
                          </div>
                        )}
                        {showResults[question.id] && (
                          <div className="mt-3 flex items-center gap-3 text-sm">
                            <span className="text-slate-500">Doğru Cevap:</span>
                            <span className="text-emerald-400 font-bold uppercase tracking-wider">{question.answer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {showResults[question.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-8 pt-6 border-t border-slate-800"
                    >
                      <div className={`p-6 rounded-2xl relative overflow-hidden ${
                        isCorrect(question) ? 'bg-emerald-500/5' : 'bg-red-500/5'
                      }`}>
                        <div className="flex items-start gap-4 mb-2">
                          <HelpCircle className={`w-5 h-5 mt-0.5 ${isCorrect(question) ? 'text-emerald-400' : 'text-red-400'}`} />
                          <div>
                            <h4 className={`font-bold mb-1 ${isCorrect(question) ? 'text-emerald-400' : 'text-red-400'}`}>
                              {isCorrect(question) ? 'Tebrikler!' : 'Bilgi Notu'}
                            </h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                              {question.explanation}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => resetExercise(question.id)}
                          className="flex items-center gap-2 mt-4 text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" /> Tekrar Dene
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-24 bg-slate-900/30 rounded-[3rem] border border-dashed border-slate-800">
              <Trophy className="w-16 h-16 text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Henüz soru eklenmemiş</h3>
              <p className="text-slate-500">Bu konu üzerinde çalışıyoruz!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseBank;
