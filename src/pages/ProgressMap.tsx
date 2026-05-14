import { motion } from "motion/react";
import { CheckCircle2, Lock, PlayCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCurriculum } from "../contexts/CurriculumContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export interface ProgressMapProps {
  mode?: 'all' | 'theory' | 'games';
}

export function ProgressMap({ mode = 'all' }: ProgressMapProps) {
  const { userProfile } = useAuth();
  const { konular: curriculum, loading } = useCurriculum();
  const navigate = useNavigate();
  const location = useLocation();

  
  const filteredCurriculum = curriculum.map(konu => {
    const filteredModules = konu.modules.filter(mod => {
      if (mode === 'theory') {
        return mod.theory || mod.type === 'lesson';
      }
      if (mode === 'games') {
        return ['matching', 'mindmap', 'reaction', 'classification', 'reaction-classification', 'mole-calculation', 'quiz'].includes(mod.type);
      }
      return true;
    });
    return { ...konu, modules: filteredModules };
  }).filter(konu => konu.modules.length > 0);

  useEffect(() => {
    if (location.state) {
      if (location.state.scrollToModule) {
        
        setTimeout(() => {
          const element = document.getElementById(location.state.scrollToModule);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            element.classList.add('ring-4', 'ring-cyan-500', 'ring-offset-8', 'ring-offset-slate-950');
            setTimeout(() => {
              element.classList.remove('ring-4', 'ring-cyan-500', 'ring-offset-8', 'ring-offset-slate-950');
            }, 2000);
          }
        }, 100);
      } else if (location.state.scrollToKonu) {
        setTimeout(() => {
          const element = document.getElementById(location.state.scrollToKonu);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
      
      
      window.history.replaceState({}, document.title);
    }
  }, [location.state, curriculum]);

  if (!userProfile || loading) return <div className="text-slate-400 p-8">Yükleniyor...</div>;

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold font-display text-white mb-2">
          {mode === 'theory' ? 'Konu Anlatımları' : mode === 'games' ? 'Eğitici Oyunlar' : 'İlerleme Haritası'}
        </h1>
        <p className="text-slate-400">
          {mode === 'theory' ? 'Kimya müfredatındaki konuları derinlemesine öğren.' : 
           mode === 'games' ? 'Öğrendiklerini eğlenceli oyunlarla pekiştir.' : 
           'Kimya müfredatındaki yolculuğun. İstediğin modülden başlayabilir ve dilediğin gibi ilerleyebilirsin.'}
        </p>
      </div>

      <div className="space-y-12">
        {filteredCurriculum.map((konu, konuIndex) => (
          <div key={konu.id} id={konu.id} className="relative scroll-mt-24">
            {}
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{konu.title}</h2>
                <p className="text-slate-400">{konu.description}</p>
              </div>
              <div className="w-full md:w-64">
                <div className="flex justify-between mb-1.5 px-1">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Ünite İlerlemesi</span>
                  <span className="text-xs font-bold text-white">
                    %{Math.round((konu.modules.filter(m => userProfile.completedModules?.includes(m.id)).length / konu.modules.length) * 100)}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round((konu.modules.filter(m => userProfile.completedModules?.includes(m.id)).length / konu.modules.length) * 100)}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: konuIndex * 0.1 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                  />
                </div>
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {konu.modules.map((mod, modIndex) => {
                const isCompleted = userProfile.completedModules?.includes(mod.id);
                
                
                const isUnlocked = true;

                return (
                  <motion.div
                    key={mod.id}
                    id={mod.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (konuIndex * 0.2) + (modIndex * 0.1) }}
                    className={`glass-card p-6 border-2 transition-all ${
                      isCompleted ? 'border-emerald-500/50 bg-emerald-500/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:-translate-y-1 cursor-pointer' :
                      isUnlocked ? 'border-cyan-500/50 bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:-translate-y-1 cursor-pointer' :
                      'border-slate-800 bg-slate-900/50 opacity-75 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (isUnlocked) navigate(`/module/${mod.id}`, { 
                        state: { initialTab: mode === 'games' ? 'activity' : 'theory' } 
                      });
                    }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isCompleted ? 'bg-emerald-500/20 text-emerald-400' :
                        isUnlocked ? 'bg-cyan-500/20 text-cyan-400' :
                        'bg-slate-800 text-slate-500'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> :
                         isUnlocked ? <PlayCircle className="w-6 h-6" /> :
                         <Lock className="w-6 h-6" />}
                      </div>
                    </div>
                    
                    <h3 className={`text-lg font-semibold mb-2 ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                      {mod.title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {mod.description}
                    </p>
                    
                    {isUnlocked && !isCompleted && (
                      <div className="mt-4 text-sm font-medium text-cyan-400 flex items-center gap-1">
                        {mode === 'theory' ? 'Dersi Oku' : mode === 'games' ? 'Oyuna Başla' : 'Başlamak için tıkla'} &rarr;
                      </div>
                    )}
                    {isCompleted && (
                      <div className="mt-4 text-sm font-medium text-emerald-400 flex items-center gap-1">
                        {mode === 'theory' ? 'Dersi Tekrar Oku' : mode === 'games' ? 'Tekrar Oyna' : 'Tekrar incele'} &rarr;
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
            
            {}
            {konuIndex < filteredCurriculum.length - 1 && (
              <div className="hidden md:block absolute left-1/2 -bottom-8 w-0.5 h-8 bg-gradient-to-b from-cyan-500/30 to-transparent"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
