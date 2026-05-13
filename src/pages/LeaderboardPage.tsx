import { Leaderboard } from '../components/Leaderboard';
import { Trophy } from 'lucide-react';
import { motion } from 'motion/react';

export function LeaderboardPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6">
          <Trophy className="w-12 h-12 text-amber-500" />
        </div>
        <h1 className="text-4xl font-bold font-display text-white mb-4">En Başarılı Kimyacılar</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          ReaksiyonLab platformunda modülleri tamamlayarak ve oyunlarda yüksek skorlar elde ederek zirveye tırmanan öğrencilerimiz.
        </p>
      </motion.div>

      <div className="glass-card p-4 sm:p-8 border-amber-500/10">
        <Leaderboard />
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-white/5 text-center">
          <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-cyan-400 font-bold">1</span>
          </div>
          <h3 className="text-white font-bold mb-2">Modülleri Tamamla</h3>
          <p className="text-slate-400 text-sm">Her tamamladığın modül sana puan kazandırır.</p>
        </div>
        <div className="glass-card p-6 border-white/5 text-center">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-purple-400 font-bold">2</span>
          </div>
          <h3 className="text-white font-bold mb-2">Yüksek Skor Al</h3>
          <p className="text-slate-400 text-sm">Eğitici oyunlarda ne kadar hızlı ve doğru olursan o kadar çok puan alırsın.</p>
        </div>
        <div className="glass-card p-6 border-white/5 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-emerald-400 font-bold">3</span>
          </div>
          <h3 className="text-white font-bold mb-2">Zirveye Tırman</h3>
          <p className="text-slate-400 text-sm">En iyiler arasına girerek adını tüm platformda duyur!</p>
        </div>
      </div>
    </div>
  );
}
