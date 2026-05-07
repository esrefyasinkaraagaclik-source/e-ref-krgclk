import { motion } from "motion/react";
import { BookOpen, CheckCircle2, ChevronRight, Target, Trophy, PlayCircle, Zap, Star } from "lucide-react";

export function Dashboard() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-white mb-2">Öğrenci Paneli</h1>
            <p className="text-slate-400">Hoş geldin, bugünkü kimya görevlerin seni bekliyor.</p>
          </div>
          
          <div className="flex items-center gap-4 glass-card px-4 py-2 border-cyan-500/30">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Ahmet Yılmaz</div>
              <div className="text-xs text-cyan-400">Seviye 12 • 2450 XP</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Continue Learning */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 border-l-4 border-l-cyan-500 relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none" />
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Kaldığın Yerden Devam Et</div>
                  <h2 className="text-2xl font-bold text-white mb-2">Atom Modelleri</h2>
                  <p className="text-slate-400 text-sm mb-6 max-w-md">Bohr atom modeli ve modern atom teorisi arasındaki farkları incelemeye devam et.</p>
                  
                  <div className="flex items-center gap-4">
                    <button className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                      <PlayCircle className="w-5 h-5" />
                      Derse Devam Et
                    </button>
                    <span className="text-sm text-slate-400">%65 Tamamlandı</span>
                  </div>
                </div>
                
                {/* Circular Progress */}
                <div className="hidden sm:flex relative w-24 h-24 items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-cyan-500"
                      strokeWidth="3"
                      strokeDasharray="65, 100"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-lg font-bold text-white">65%</div>
                </div>
              </div>
            </motion.div>

            {/* Topics Progress */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">Ünite İlerlemesi</h3>
                <button className="text-sm text-cyan-400 hover:text-cyan-300">Tümünü Gör</button>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "Kimyanın Temel Kanunları", progress: 100, status: "completed" },
                  { name: "Mol Kavramı", progress: 80, status: "in-progress" },
                  { name: "Kimyasal Tepkimeler", progress: 30, status: "in-progress" },
                  { name: "Karışımlar", progress: 0, status: "locked" }
                ].map((topic, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      topic.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                      topic.status === 'in-progress' ? 'bg-cyan-500/20 text-cyan-400' :
                      'bg-slate-800 text-slate-500'
                    }`}>
                      {topic.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : 
                       topic.status === 'in-progress' ? <BookOpen className="w-5 h-5" /> :
                       <Target className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className={`font-medium ${topic.status === 'locked' ? 'text-slate-500' : 'text-slate-200'}`}>{topic.name}</span>
                        <span className="text-xs text-slate-400">%{topic.progress}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${topic.status === 'completed' ? 'bg-emerald-500' : 'bg-cyan-500'}`}
                          style={{ width: `${topic.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <ChevronRight className={`w-5 h-5 ${topic.status === 'locked' ? 'text-slate-700' : 'text-slate-400'}`} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            
            {/* Daily Mission */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 border-violet-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-violet-500/20 rounded-lg text-violet-400">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Günün Görevi</h3>
              </div>
              
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 mb-4">
                <h4 className="font-medium text-slate-200 mb-1">Sanal Laboratuvar</h4>
                <p className="text-sm text-slate-400 mb-3">Asit-Baz titrasyonu deneyini tamamla.</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-amber-400 font-medium flex items-center gap-1">
                    <Zap className="w-4 h-4" /> +150 XP
                  </span>
                  <button className="text-violet-400 hover:text-violet-300 font-medium">Başla &rarr;</button>
                </div>
              </div>
            </motion.div>

            {/* Recent Badges */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Son Rozetler</h3>
                <span className="text-xs font-medium px-2 py-1 bg-slate-800 rounded-md text-slate-300">3/15</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Trophy, color: "text-amber-400", bg: "bg-amber-500/10" },
                  { icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/10" },
                  { icon: Star, color: "text-violet-400", bg: "bg-violet-500/10" }
                ].map((badge, i) => (
                  <div key={i} className={`aspect-square rounded-xl flex items-center justify-center ${badge.bg} border border-white/5`}>
                    <badge.icon className={`w-6 h-6 ${badge.color}`} />
                  </div>
                ))}
              </div>
            </motion.div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
