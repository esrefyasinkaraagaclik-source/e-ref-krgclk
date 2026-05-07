import { motion } from 'motion/react';
import { Instagram, Mail, MessageSquare, Send } from 'lucide-react';

export function ContactSection() {
  const developers = [
    {
      name: "Eşref Yasin Karaağaçlık",
      instagram: "esrefyasinnk",
      instagramUrl: "https://www.instagram.com/esrefyasinnk",
      email: "esrefyasinkaraagaclik@gmail.com",
      role: "Geliştirici"
    },
    {
      name: "Mustafa Kaan",
      instagram: "mustafakaan.exe",
      instagramUrl: "https://www.instagram.com/mustafakaan.exe",
      email: "mustafakaanresmi@gmail.com",
      role: "Geliştirici"
    }
  ];

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
            <span>İletişim & Destek</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold font-display text-white mb-4"
          >
            Bizimle <span className="text-gradient">Bağlantı Kurun</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Platform hakkındaki sorularınız, geri bildirimleriniz veya iş birliği talepleriniz için bize ulaşabilirsiniz.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {developers.map((dev, index) => (
            <motion.div
              key={dev.instagram}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass-card p-8 border-white/5 hover:border-cyan-500/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{dev.name}</h3>
                  <p className="text-cyan-400 text-sm font-medium">{dev.role}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                  <Send className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-4">
                <a 
                  href={dev.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group/link"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center text-pink-400 border border-pink-500/20">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Instagram</div>
                    <div className="text-slate-200 font-medium">@{dev.instagram}</div>
                  </div>
                </a>

                <a 
                  href={`mailto:${dev.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group/link"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">E-Posta</div>
                    <div className="text-slate-200 font-medium truncate">{dev.email}</div>
                  </div>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
