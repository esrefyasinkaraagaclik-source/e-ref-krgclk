import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

export function ContactSection() {
  const { userProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'suggestion',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (userProfile) {
      setFormData(prev => ({
        ...prev,
        name: userProfile.displayName || '',
        email: userProfile.email || ''
      }));
    }
  }, [userProfile]);

  const developers = [
    {
      name: "Eşref Yasin Karaağaçlık",
      instagram: "esrefyasinnk",
      instagramUrl: "https://www.instagram.com/esrefyasinnk",
      email: "esrefyasinkaraagaclik@gmail.com",
      role: "Geliştirici"
    },
    {
      name: "Mustafa Kaan Gider",
      instagram: "mustafakaan.exe",
      instagramUrl: "https://www.instagram.com/mustafakaan.exe",
      email: "mustafakaanresmi@gmail.com",
      role: "Geliştirici"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    setStatus('submitting');
    const feedbackPath = 'feedbacks';
    try {
      await addDoc(collection(db, feedbackPath), {
        name: formData.name,
        email: formData.email,
        type: formData.type,
        message: formData.message,
        userId: userProfile?.uid || 'guest',
        timestamp: serverTimestamp()
      });
      setStatus('success');
      setFormData(prev => ({ ...prev, message: '' }));
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, feedbackPath);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4"
          >
            <MessageSquare className="w-4 h-4" />
            <span>İletişim & Geri Bildirim</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold font-display text-white mb-4"
          >
            Fikirleriniz <span className="text-gradient">Bizim İçin Değerli</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Platformu geliştirmemize yardımcı olun. Önerilerinizi, hata raporlarınızı veya genel geri bildirimlerinizi paylaşabilirsiniz.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles className="w-24 h-24 text-cyan-400" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Ad Soyad</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                    placeholder="Adınız..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">E-Posta</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                    placeholder="E-posta adresiniz..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Geri Bildirim Türü</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'suggestion', label: 'Öneri' },
                    { id: 'bug', label: 'Hata Bildir' },
                    { id: 'other', label: 'Diğer' }
                  ].map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.id })}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                        formData.type === type.id 
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' 
                          : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Mesajınız</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                  placeholder="Düşüncelerinizi buraya yazın..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Mesajı Gönder
                  </>
                )}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    Geri bildiriminiz başarıyla iletildi. Teşekkür ederiz!
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    Bir hata oluştu. Lütfen daha sonra tekrar deneyin.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {developers.map((dev, index) => (
                <motion.div
                  key={dev.instagram}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 border-white/5 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-0.5">{dev.name}</h3>
                      <p className="text-cyan-400 text-xs font-medium uppercase tracking-wider">{dev.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a 
                      href={dev.instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group/link"
                    >
                      <Instagram className="w-4 h-4 text-pink-400" />
                      <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{dev.instagram}</span>
                    </a>
                    <a 
                      href={`mailto:${dev.email}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group/link"
                    >
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">E-Posta</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="glass-card p-6 border-white/5">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Geliştirme Süreci</h4>
              <p className="text-sm text-slate-400 leading-relaxed italic">
                "Bu platform, öğrencilerin kimya dersini daha eğlenceli ve etkileşimli bir şekilde öğrenebilmesi için geliştirildi. Her türlü geri bildiriminiz gelişimimiz için altın değerinde."
              </p>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
