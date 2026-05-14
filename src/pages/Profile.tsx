import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { BADGE_DETAILS } from '../data/badges';
import { collection, query, where, getCountFromServer } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Award, Trophy, Target, Zap, User, Star, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Profile() {
  const { userProfile } = useAuth();
  const [rank, setRank] = useState<number | null>(null);
  const [loadingRank, setLoadingRank] = useState(true);

  useEffect(() => {
    const fetchRank = async () => {
      if (!userProfile?.totalScore) {
        setRank(null);
        setLoadingRank(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'users'),
          where('totalScore', '>', userProfile.totalScore)
        );
        const snapshot = await getCountFromServer(q);
        setRank(snapshot.data().count + 1);
      } catch (error) {
        console.error("Sıralama alınırken hata:", error);
      } finally {
        setLoadingRank(false);
      }
    };

    fetchRank();
  }, [userProfile?.totalScore]);

  if (!userProfile) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Profil Bulunamadı</h2>
          <p className="text-slate-400 mb-6">Lütfen giriş yapın.</p>
          <Link to="/login" className="px-6 py-2 bg-cyan-500 text-white rounded-xl">Giriş Yap</Link>
        </div>
      </div>
    );
  }

  const userBadges = userProfile.badges || [];
  const level = Math.floor((userProfile.totalScore || 0) / 500) + 1;
  const progressToNextLevel = ((userProfile.totalScore || 0) % 500) / 5; 

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        
        {}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-5xl font-bold border-4 border-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                {userProfile.displayName[0].toUpperCase()}
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center border-2 border-slate-900 text-slate-950 font-bold shadow-lg" title="Seviye">
                {level}
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{userProfile.displayName}</h1>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-slate-300">{userProfile.totalScore || 0} Puan</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <Trophy className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-slate-300">
                    {loadingRank ? 'Hesaplanıyor...' : `#${rank || 'N/A'} Sıralama`}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-slate-300">{userBadges.length} / {Object.keys(BADGE_DETAILS).length} Rozet</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-400">Seviye {level} Gelişimi</span>
              <span className="text-sm font-bold text-cyan-400">%{Math.floor(progressToNextLevel)}</span>
            </div>
            <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5 p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-cyan-600 to-blue-500 rounded-full transition-all duration-1000"
                style={{ width: `${progressToNextLevel}%` }}
              />
            </div>
          </div>
        </motion.div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Kazandığın Rozetler</h3>
            </div>
            
            {userBadges.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {userBadges.map((badgeId) => {
                  const detail = BADGE_DETAILS[badgeId];
                  if (!detail) return null;
                  const Icon = detail.icon;
                  return (
                    <div key={badgeId} className={`p-4 rounded-xl ${detail.bg} border border-white/5 flex flex-col items-center text-center group transition-all hover:scale-105`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-slate-900 shadow-inner`}>
                        <Icon className={`w-6 h-6 ${detail.color}`} />
                      </div>
                      <h4 className={`font-bold text-sm mb-1 text-white`}>{detail.label}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2">{detail.description}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-2xl">
                <Award className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">Henüz bir rozet kazanmadın.</p>
                <Link to="/lectures" className="text-cyan-400 text-xs mt-2 inline-block hover:underline">Öğrenmeye başla &rarr;</Link>
              </div>
            )}
          </motion.div>

          {}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">Modül İlerlemesi</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 text-sm">Tamamlanan Modüller</span>
                  <span className="text-white font-bold">{userProfile.completedModules.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-1 flex-1 bg-emerald-500 rounded-full" style={{ opacity: userProfile.completedModules.length >= 1 ? 1 : 0.1 }} />
                  <div className="h-1 flex-1 bg-emerald-500 rounded-full" style={{ opacity: userProfile.completedModules.length >= 2 ? 1 : 0.1 }} />
                  <div className="h-1 flex-1 bg-emerald-500 rounded-full" style={{ opacity: userProfile.completedModules.length >= 4 ? 1 : 0.1 }} />
                  <div className="h-1 flex-1 bg-emerald-500 rounded-full" style={{ opacity: userProfile.completedModules.length >= 6 ? 1 : 0.1 }} />
                  <div className="h-1 flex-1 bg-emerald-500 rounded-full" style={{ opacity: userProfile.completedModules.length >= 9 ? 1 : 0.1 }} />
                </div>
              </div>
              
              <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5">
                <h4 className="text-sm font-medium text-slate-400 mb-3">Yakındaki Hedeflerin</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                    <span className="text-xs text-slate-300 flex-1">1000 Puan Barajını Geç</span>
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-xs text-slate-300 flex-1">Bir Rozet Daha Kazan</span>
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {}
        <div className="text-center">
          <Link 
            to="/leaderboard"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-bold rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <Trophy className="w-5 h-5" />
            Tüm Sıralamayı Gör
          </Link>
        </div>

      </div>
    </div>
  );
}
