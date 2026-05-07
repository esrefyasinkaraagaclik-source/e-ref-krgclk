/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Book, Globe, Cpu, ShieldCheck, Database, Layout } from 'lucide-react';

export function References() {
  const references = [
    {
      id: 1,
      category: "Eğitim ve Müfredat",
      icon: Book,
      title: "T.C. Millî Eğitim Bakanlığı (2024)",
      description: "Ortaöğretim Kimya Dersi (9, 10, 11 ve 12. Sınıflar) Öğretim Programı (Türkiye Yüzyılı Maarif Modeli). Ankara: MEB Yayınları.",
      link: "https://mufredat.meb.gov.tr/"
    },
    {
      id: 2,
      category: "Yapay Zeka Teknolojisi",
      icon: Cpu,
      title: "Google AI (2024)",
      description: "Gemini Generative AI Model Documentation & SDK for JavaScript. Generative AI integration for educational support.",
      link: "https://ai.google.dev/"
    },
    {
      id: 3,
      category: "Backend ve Veri Yönetimi",
      icon: Database,
      title: "Firebase by Google (2024)",
      description: "Firestore NoSQL Database and Firebase Authentication Service Documentation.",
      link: "https://firebase.google.com/docs"
    },
    {
      id: 4,
      category: "Frontend Mimari",
      icon: Layout,
      title: "Meta Open Source (2024)",
      description: "React v19: A JavaScript library for building user interfaces. Documentation and best practices.",
      link: "https://react.dev/"
    },
    {
      id: 5,
      category: "Görsel ve Etkileşim Tasarımı",
      icon: ShieldCheck,
      title: "Tailwind Labs & Framer Motion (2024)",
      description: "Tailwind CSS Design Systems and Motion for React (formerly Framer Motion) animation guidelines.",
      link: "https://tailwindcss.com/"
    },
    {
      id: 6,
      category: "3D Görselleştirme",
      icon: Globe,
      title: "Three.js Developers (2024)",
      description: "Three.js & React-Three-Fiber: JavaScript 3D Library documentation for molecular modeling.",
      link: "https://threejs.org/"
    }
  ];

  return (
    <div className="space-y-8 pb-20">
      <header className="text-center md:text-left">
        <h1 className="text-3xl font-bold font-display text-white flex items-center justify-center md:justify-start gap-3">
          <Book className="w-8 h-8 text-cyan-400" />
          Kaynakça ve Bilimsel Dayanaklar
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl">
          Bu proje, akademik standartlar ve güncel teknolojik dökümantasyonlar rehberliğinde TÜBİTAK 4006 standartlarına uygun olarak geliştirilmiştir.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {references.map((ref, index) => (
          <motion.div
            key={ref.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 border-white/5 hover:border-cyan-500/30 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shrink-0">
                <ref.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">{ref.category}</span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{ref.title}</h3>
                <p className="text-sm text-slate-400 italic leading-relaxed mb-4">
                  "{ref.description}"
                </p>
                <a 
                  href={ref.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  <Globe className="w-3 h-3" />
                  Erişim adresi: {new URL(ref.link).hostname}
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <footer className="glass-card p-6 border-cyan-500/10 bg-cyan-500/5">
        <p className="text-sm text-slate-400 text-center">
          <strong>Not:</strong> Bu kaynaklar TÜBİTAK proje rehberinde belirtilen bilimsel dürüstlük ve kaynak gösterme kurallarına (TÜBİTAK 4006 Bilim Fuarları Destekleme Programı) uygun olarak listelenmiştir.
        </p>
      </footer>
    </div>
  );
}
