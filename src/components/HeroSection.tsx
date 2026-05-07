import { motion } from "motion/react";
import { Atom, Beaker, Play, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-cyan-500/30 text-cyan-300 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Maarif Müfredatı ile Uyumlu</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight mb-6 leading-tight">
            Kimya Dünyasına <br className="hidden lg:block" />
            <span className="text-gradient">Hoş Geldin</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            10. sınıf kimya konularını oyunlar, simülasyonlar ve yapay zeka destekli öğrenme ile keşfet. Bilimi yaşayarak öğren!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={onStart}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              Platforma Başla
            </button>
            <button 
              onClick={() => document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-xl glass-card glass-card-hover text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Beaker className="w-5 h-5" />
              Konuları Keşfet
            </button>
          </div>
        </motion.div>

        {/* Visual Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[400px] sm:h-[500px] flex items-center justify-center z-10"
        >
          {/* Central Atom/Molecule */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="w-48 h-48 rounded-full border-4 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.5)] overflow-hidden bg-slate-900 z-10 flex items-center justify-center">
              <img 
                src="https://i.hizliresim.com/27jdo2j.png" 
                alt="Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Orbiting Electrons */}
            <div className="absolute inset-0 border border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]">
              <div className="absolute -top-2 left-1/2 w-4 h-4 bg-violet-400 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
            </div>
            <div className="absolute inset-[-20px] border border-violet-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]">
              <div className="absolute top-1/2 -right-2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
            </div>
            <div className="absolute inset-[-40px] border border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]">
              <div className="absolute -bottom-2 left-1/4 w-5 h-5 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
