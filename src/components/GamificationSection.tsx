import { motion } from "motion/react";
import { Trophy, Star, Medal, Zap } from "lucide-react";

const badges = [
  {
    title: "Kimya Kaşifi",
    icon: Trophy,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30"
  },
  {
    title: "Molekül Ustası",
    icon: Zap,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30"
  },
  {
    title: "Deney Uzmanı",
    icon: Star,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30"
  }
];

export function GamificationSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card border-cyan-500/20 p-8 md:p-12 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-cyan-500/10 blur-3xl rounded-full z-0 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Öğrenirken Kazan</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Görevleri tamamla, deneyleri başarıyla bitir ve XP kazan. Liderlik tablosunda yükselerek kimya dehası olduğunu kanıtla!
              </p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-cyan-400">Seviye 12</span>
                    <span className="text-slate-400">2450 / 3000 XP</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "82%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 relative"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border ${badge.border} ${badge.bg} backdrop-blur-sm group hover:scale-105 transition-transform`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-slate-900/50 mb-4 shadow-lg group-hover:shadow-[0_0_15px_currentColor] transition-shadow ${badge.color}`}>
                    <badge.icon className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-center text-slate-200">{badge.title}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
