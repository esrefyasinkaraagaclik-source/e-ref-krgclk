import { motion } from "motion/react";
import { BookOpen, CheckCircle2, Target, Trophy, PlayCircle, Zap, Star } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCurriculum } from "../contexts/CurriculumContext";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const { userProfile } = useAuth();
  const { konular: curriculum, loading } = useCurriculum();
  const navigate = useNavigate();

  if (!userProfile || loading) return <div className="text-slate-400 p-8">Yükleniyor...</div>;

  const flattenedModules = curriculum.flatMap(konu => konu.modules);
  let nextModule = null;

  if (userProfile.completedModules && userProfile.completedModules.length > 0) {
    const lastCompletedId = userProfile.completedModules[userProfile.completedModules.length - 1];
    const lastCompletedIndex = flattenedModules.findIndex(m => m.id === lastCompletedId);
    
    if (lastCompletedIndex !== -1 && lastCompletedIndex < flattenedModules.length - 1) {
      nextModule = flattenedModules[lastCompletedIndex + 1];
    } else {
      
      nextModule = flattenedModules.find(m => !userProfile.completedModules?.includes(m.id)) || null;
    }
  } else {
    
    nextModule = flattenedModules.length > 0 ? flattenedModules[0] : null;
  }

  
  const totalModules = curriculum.reduce((acc, konu) => acc + konu.modules.length, 0);
  const completedCount = userProfile.completedModules?.length || 0;
  const overallProgress = Math.round((completedCount / totalModules) * 100) || 0;

  return (
    <div className="space-y-8">
      {}
      <div>
        <h1 className="text-3xl font-bold font-display text-white mb-2">Öğrenci Paneli</h1>
        <p className="text-slate-400">Hoş geldin {userProfile.displayName}, bugünkü kimya görevlerin seni bekliyor.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {}
        <div className="lg:col-span-2 space-y-8">
          
          {}
          {nextModule ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 border-l-4 border-l-cyan-500 relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none" />
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Kaldığın Yerden Devam Et</div>
                  <h2 className="text-2xl font-bold text-white mb-2">{nextModule.title}</h2>
                  <p className="text-slate-400 text-sm mb-6 max-w-md">{nextModule.description}</p>
                  
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => navigate('/lectures', { state: { scrollToModule: nextModule?.id } })}
                      className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    >
                      <PlayCircle className="w-5 h-5" />
                      Derse Devam Et
                    </button>
                    <span className="text-sm text-slate-400">Genel İlerleme: %{overallProgress}</span>
                  </div>
                </div>
                
                {}
                <div className="hidden sm:flex relative w-24 h-24 items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: overallProgress / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="text-cyan-500"
                      strokeWidth="3"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-lg font-bold text-white">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {overallProgress}%
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 border-l-4 border-l-emerald-500"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Tebrikler!</h2>
              <p className="text-slate-400 mb-4">Tüm müfredatı başarıyla tamamladın.</p>
            </motion.div>
          )}

          {}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Ünite İlerlemesi</h3>
              <button onClick={() => navigate('/lectures')} className="text-sm text-cyan-400 hover:text-cyan-300">Konu Listesini Gör</button>
            </div>
            
            <div className="space-y-4">
              {curriculum.map((konu, i) => {
                const konuModules = konu.modules.length;
                const completedInKonu = konu.modules.filter(m => userProfile.completedModules?.includes(m.id)).length;
                const konuProgress = Math.round((completedInKonu / konuModules) * 100);
                const status = konuProgress === 100 ? 'completed' : (konuProgress > 0 ? 'in-progress' : 'locked');

                return (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer" onClick={() => navigate('/lectures', { state: { scrollToKonu: konu.id } })}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                      status === 'in-progress' ? 'bg-cyan-500/20 text-cyan-400' :
                      'bg-slate-800 text-slate-500'
                    }`}>
                      {status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : 
                       status === 'in-progress' ? <BookOpen className="w-5 h-5" /> :
                       <Target className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className={`font-medium ${status === 'locked' ? 'text-slate-500' : 'text-slate-200'}`}>{konu.title}</span>
                        <span className="text-xs text-slate-400">%{konuProgress}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${konuProgress}%` }}
                          transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                          className={`h-full rounded-full ${status === 'completed' ? 'bg-emerald-500' : 'bg-cyan-500'}`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {}
        <div className="space-y-8">
          
          {}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Rozetlerin</h3>
              <span className="text-xs font-medium px-2 py-1 bg-slate-800 rounded-md text-slate-300">{userProfile.badges?.length || 0} Kazanıldı</span>
            </div>
            
            {(userProfile.badges?.length || 0) > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {userProfile.badges?.map((badge, i) => (
                  <div key={i} className="aspect-square rounded-xl flex items-center justify-center bg-cyan-500/10 border border-cyan-500/30 text-cyan-400" title={badge}>
                    <Trophy className="w-6 h-6" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-500 text-sm">
                Henüz rozet kazanmadın. Modülleri tamamlayarak rozet kazanabilirsin!
              </div>
            )}
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
