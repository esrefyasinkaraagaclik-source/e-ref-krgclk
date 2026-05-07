import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Beaker, 
  Droplets, 
  FlaskConical, 
  Play, 
  RotateCcw, 
  Scale, 
  Wind, 
  Thermometer, 
  Box, 
  Zap,
  Info,
  ChevronRight,
  MousePointer2,
  Redo2,
  Equal,
  Trophy,
  UserRound
} from 'lucide-react';

type ExperimentId = 'ph' | 'gas_laws' | 'mole_calc' | 'changes' | 'particle_view' | 'separation' | 'balance';

// 6. Separation of Mixtures Simulator
function SeparationSim() {
  const [mixture, setMixture] = useState([
    { name: 'Demir Tozu', type: 'magnetic', separated: false },
    { name: 'Kum', type: 'solid', separated: false },
    { name: 'Tuz', type: 'soluble', separated: false },
  ]);
  const [method, setMethod] = useState<'none' | 'magnet' | 'filter' | 'evaporate' | 'mix'>('none');
  const [hasWater, setHasWater] = useState(false);

  const applyMethod = (m: 'magnet' | 'filter' | 'evaporate' | 'mix') => {
    setMethod(m);
    setTimeout(() => {
      if (m === 'mix') {
        setHasWater(true);
      } else {
        setMixture(prev => prev.map(item => {
          if (m === 'magnet' && item.type === 'magnetic' && !hasWater) return { ...item, separated: true };
          // If water is added, magnetic separation is harder/impossible in this simple model without drying
          if (m === 'filter' && item.type === 'solid' && hasWater) return { ...item, separated: true };
          if (m === 'evaporate' && item.type === 'soluble' && hasWater) return { ...item, separated: true };
          return item;
        }));
      }
      setMethod('none');
    }, 1500);
  };

  const isAllSeparated = mixture.every(m => m.separated);

  return (
    <div className="glass-card p-6 md:p-10 border-rose-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Karışım Ayırma Laboratuvarı</h2>
            <p className="text-slate-400 text-sm">Bileşenleri ayırmak için önce gerekliyse su ekleyin, sonra uygun yöntemi seçin.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => applyMethod('mix')}
              disabled={hasWater || method !== 'none'}
              className="px-6 py-3 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 rounded-xl font-bold hover:bg-cyan-500/30 transition-all disabled:opacity-30 flex items-center justify-center gap-2"
            >
              <Droplets className="w-5 h-5" /> Su Ekle
            </button>
            <button 
              onClick={() => applyMethod('magnet')}
              disabled={method !== 'none' || hasWater || mixture.find(m => m.name === 'Demir Tozu')?.separated}
              className="px-6 py-3 bg-rose-500/20 border border-rose-500/50 text-rose-400 rounded-xl font-bold hover:bg-rose-500/30 transition-all disabled:opacity-30 flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" /> Mıknatıs
            </button>
            <button 
              onClick={() => applyMethod('filter')}
              disabled={method !== 'none' || !hasWater || mixture.find(m => m.name === 'Kum')?.separated}
              className="px-6 py-3 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-xl font-bold hover:bg-blue-500/30 transition-all disabled:opacity-30 flex items-center justify-center gap-2"
            >
              <Box className="w-5 h-5" /> Süzme
            </button>
            <button 
              onClick={() => applyMethod('evaporate')}
              disabled={method !== 'none' || !hasWater || mixture.find(m => m.name === 'Tuz')?.separated}
              className="px-6 py-3 bg-orange-500/20 border border-orange-500/50 text-orange-400 rounded-xl font-bold hover:bg-orange-500/30 transition-all disabled:opacity-30 flex items-center justify-center gap-2"
            >
              <Wind className="w-5 h-5" /> Buharlaştırma
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Durum</h4>
            <div className="flex gap-2">
               <div className={`px-3 py-1 rounded-full text-[10px] font-bold border ${hasWater ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-slate-800 border-white/5 text-slate-500'}`}>
                 {hasWater ? 'SULU KARIŞIM' : 'KATI KARIŞIM'}
               </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-rose-400">
               <Info className="w-4 h-4" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Ayırma Prensipleri</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
               <div className="text-[10px] text-slate-400">
                 <strong className="text-white">Mıknatıs:</strong> Demir, nikel, kobalt gibi manyetik maddeleri ayırır.
               </div>
               <div className="text-[10px] text-slate-400">
                 <strong className="text-white">Süzme:</strong> Katı-sıvı heterojen karışımları tanecik boyutu farkıyla ayırır.
               </div>
               <div className="text-[10px] text-slate-400">
                 <strong className="text-white">Buharlaştırma:</strong> Çözünmüş katıyı sıvıdan ısı yardımıyla ayırır.
               </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center p-8 bg-black/40 rounded-3xl min-h-[400px] border border-white/5 overflow-hidden">
          {method !== 'none' && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="absolute inset-0 bg-white/5 backdrop-blur-sm z-30 flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="mb-4 text-cyan-400">
                  <RotateCcw className="w-10 h-10" />
                </motion.div>
                <div className="text-white font-bold">İşlem Yapılıyor...</div>
              </div>
            </motion.div>
          )}

          {isAllSeparated ? (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center space-y-4">
              <Trophy className="w-20 h-20 text-amber-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Başarı!</h3>
              <p className="text-slate-400">Bütün bileşenleri ayırdınız.</p>
              <button 
                onClick={() => { setMixture(prev => prev.map(p => ({ ...p, separated: false }))); setHasWater(false); }}
                className="px-6 py-2 bg-cyan-500 text-white rounded-lg font-bold"
              >
                Sıfırla
              </button>
            </motion.div>
          ) : (
            <div className={`relative w-64 h-64 border-x-4 border-b-4 ${hasWater ? 'border-blue-500/30' : 'border-slate-700/50'} rounded-b-3xl flex flex-col items-center justify-center p-8 transition-colors`}>
              {hasWater && <div className="absolute inset-0 bg-blue-500/10 rounded-b-[24px]" />}
              <div className="flex flex-wrap gap-2 justify-center relative z-10">
                {mixture.filter(m => !m.separated).map((item, idx) => (
                  <motion.div 
                    key={item.name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, y: hasWater ? [0, -5, 0] : 0 }}
                    transition={{ repeat: hasWater ? Infinity : 0, duration: 2 }}
                    className={`w-10 h-10 rounded-full ${item.type === 'magnetic' ? 'bg-slate-500' : item.type === 'solid' ? 'bg-amber-900' : 'bg-white/40'} shadow-lg`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 7. Reaction Balancer Simulator
function BalanceSim() {
  const [coefficients, setCoefficients] = useState([1, 1, 1]); // H2 + O2 -> H2O
  
  const isBalanced = coefficients[0] * 2 === coefficients[2] * 2 && coefficients[1] * 2 === coefficients[2] * 1;
  // Adjusted for simple H2 + O2 -> H2O:  2H2 + O2 -> 2H2O
  const target = [2, 1, 2];
  const balanced = coefficients[0] === 2 && coefficients[1] === 1 && coefficients[2] === 2;

  return (
    <div className="glass-card p-6 md:p-10 border-violet-500/20">
      <div className="grid grid-cols-1 gap-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Tepkime Denkleştirici</h2>
          <p className="text-slate-400 text-sm">Girenler ve ürünlerin katsayılarını ayarlayarak atom sayılarını eşitleyin.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-black/40 p-12 rounded-3xl border border-white/5">
          <div className="flex items-center gap-4">
             <div className="flex flex-col items-center">
                <input 
                  type="number" min="1" max="5" value={coefficients[0]} 
                  onChange={(e) => setCoefficients([Number(e.target.value), coefficients[1], coefficients[2]])}
                  className="w-16 p-3 bg-white/5 border border-white/10 rounded-xl text-center text-white font-bold"
                />
                <span className="text-cyan-400 font-bold mt-2">H₂</span>
             </div>
             <span className="text-slate-500 text-2xl">+</span>
             <div className="flex flex-col items-center">
                <input 
                  type="number" min="1" max="5" value={coefficients[1]} 
                  onChange={(e) => setCoefficients([coefficients[0], Number(e.target.value), coefficients[2]])}
                  className="w-16 p-3 bg-white/5 border border-white/10 rounded-xl text-center text-white font-bold"
                />
                <span className="text-cyan-400 font-bold mt-2">O₂</span>
             </div>
          </div>

          <ChevronRight className="w-10 h-10 text-slate-700 rotate-90 md:rotate-0" />

          <div className="flex items-center gap-4">
             <div className="flex flex-col items-center">
                <input 
                  type="number" min="1" max="5" value={coefficients[2]} 
                  onChange={(e) => setCoefficients([coefficients[0], coefficients[1], Number(e.target.value)])}
                  className="w-16 p-3 bg-white/5 border border-white/10 rounded-xl text-center text-white font-bold"
                />
                <span className="text-cyan-400 font-bold mt-2">H₂O</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Atom Sayımı (Girenler)</h4>
              <div className="space-y-4">
                 <div className="flex justify-between">
                    <span className="text-slate-300">Hidrojen (H)</span>
                    <span className="text-white font-bold">{coefficients[0] * 2}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-slate-300">Oksijen (O)</span>
                    <span className="text-white font-bold">{coefficients[1] * 2}</span>
                 </div>
              </div>
           </div>
           <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Atom Sayımı (Ürünler)</h4>
              <div className="space-y-4">
                 <div className="flex justify-between">
                    <span className="text-slate-300">Hidrojen (H)</span>
                    <span className="text-white font-bold">{coefficients[2] * 2}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-slate-300">Oksijen (O)</span>
                    <span className="text-white font-bold">{coefficients[2] * 1}</span>
                 </div>
              </div>
           </div>
        </div>

        {balanced && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl text-center"
          >
             <h3 className="text-emerald-400 font-bold text-xl mb-2">Denklem Dengelendi!</h3>
             <p className="text-emerald-500/80">Kütlenin korunumu kanunu sağlandı: 2 H₂ + O₂ → 2 H₂O</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xs font-bold text-violet-400 uppercase mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" /> Kütlenin Korunumu
              </h5>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Lavoisier'e göre kimyasal reaksiyonlarda toplam kütle korunur. Atomlar yok olmaz, yeni bir düzenle birleşirler.
              </p>
           </div>
           <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xs font-bold text-violet-400 uppercase mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" /> Atom Sayısı
              </h5>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Tepkimenin her iki tarafındaki her elementin atom sayısı eşit olmalıdır. Katsayılar molekül sayısını ifade eder.
              </p>
           </div>
           <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
              <h5 className="text-xs font-bold text-violet-400 uppercase mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" /> Katsayı Kuralı
              </h5>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Sadece molekülün önündeki katsayılar değiştirilebilir. Alt indisler (H₂, O₂ gibi) kimliğidir ve asla değişmez.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}

const experiments = [
  {
    id: 'ph',
    tema: 'Asitler ve Bazlar',
    title: 'pH İndikatör Testi',
    description: 'Maddelerin asitlik ve bazlık derecelerini turnusol kağıdı ve indikatörlerle test edin.',
    icon: Droplets,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'changes',
    tema: 'Fiziksel ve Kimyasal',
    title: 'Değişim Laboratuvarı',
    description: 'Maddelere ısı, ışık veya reaktif ekleyerek fiziksel ve kimyasal değişimleri gözlemleyin.',
    icon: Zap,
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'gas_laws',
    tema: 'Gazlar',
    title: 'İdeal Gas Simülatörü',
    description: 'Basınç, hacim ve sıcaklık arasındaki ilişkiyi pistonlu bir kapta deneyimleyin.',
    icon: Wind,
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'mole_calc',
    tema: 'Mol Kavramı',
    title: 'Atomik Terazi',
    description: 'Maddelerin kütle, mol ve tanecik sayısı arasındaki dönüşümleri 3D modellerle görün.',
    icon: Scale,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'separation',
    tema: 'Karışımlar',
    title: 'Ayırma Teknikleri',
    description: 'Mıknatıs, süzme ve buharlaştırma yöntemleriyle karışımları bileşenlerine ayırın.',
    icon: Redo2,
    color: 'from-rose-500 to-pink-600'
  },
  {
    id: 'balance',
    tema: 'Denklemler',
    title: 'Tepkime Denkleştirici',
    description: 'Kütlenin korunumu kanununa uygun olarak kimyasal denklemleri denkleştirin.',
    icon: Equal,
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'particle_view',
    tema: 'Maddenin Yapısı',
    title: 'Mikroskop Gözlemevi',
    description: 'Maddelere atomik düzeyde bakarak element, bileşik ve karışım farklarını keşfedin.',
    icon: Box,
    color: 'from-purple-500 to-pink-600'
  }
];

export function VirtualLab() {
  const [activeExperiment, setActiveExperiment] = useState<ExperimentId | null>(null);

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto px-4">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold font-display text-white flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <Beaker className="w-8 h-8 text-cyan-400" />
            </div>
            Sanal Laboratuvar
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Teorik bilgileri interaktif deneylerle pratiğe dönüştürün.
          </p>
        </div>
        {activeExperiment && (
          <button 
            onClick={() => setActiveExperiment(null)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 transition-all border border-white/10 group"
          >
            <RotateCcw className="w-4 h-4 group-hover:rotate-[-180deg] transition-transform duration-500" /> 
            Laboratuvara Dön
          </button>
        )}
      </header>

      <AnimatePresence mode="wait">
        {!activeExperiment ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {experiments.map((exp, idx) => (
              <motion.button
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setActiveExperiment(exp.id as any)}
                className="glass-card p-6 border-white/5 hover:border-cyan-500/40 transition-all text-left flex flex-col group relative overflow-hidden h-64"
              >
                {/* Background Glow */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${exp.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
                
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${exp.color} flex items-center justify-center text-white shadow-lg`}>
                    <exp.icon className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-full border border-white/5">
                    {exp.tema}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{exp.title}</h3>
                <p className="text-slate-400 text-sm flex-1 leading-relaxed">{exp.description}</p>
                
                <div className="mt-4 flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                  Simülasyonu Başlat <ChevronRight className="w-4 h-4" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="simulation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            {activeExperiment === 'ph' && <PHSimulator />}
            {activeExperiment === 'gas_laws' && <GasSim />}
            {activeExperiment === 'mole_calc' && <MoleCalcSim />}
            {activeExperiment === 'changes' && <ChangesSim />}
            {activeExperiment === 'particle_view' && <ParticleViewSim />}
            {activeExperiment === 'separation' && <SeparationSim />}
            {activeExperiment === 'balance' && <BalanceSim />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 1. pH Simulator (Improved)
function PHSimulator() {
  const [level, setLevel] = useState(7);
  const [selectedSubstance, setSelectedSubstance] = useState<string | null>(null);
  const [isDipping, setIsDipping] = useState(false);
  const [paperColor, setPaperColor] = useState<string>('#e2e8f0');

  const substances = [
    { name: 'Mide Asidi', ph: 1.5, color: '#dc2626' },
    { name: 'Limon', ph: 2.4, color: '#facc15' },
    { name: 'Süt', ph: 6.5, color: '#f8fafc' },
    { name: 'Saf Su', ph: 7.0, color: '#38bdf8' },
    { name: 'Deniz Suyu', ph: 8.1, color: '#2563eb' },
    { name: 'Sabun', ph: 10.0, color: '#f472b6' },
  ];

  const getPHColor = (ph: number) => {
    if (ph < 3) return '#ef4444';
    if (ph < 5) return '#f97316';
    if (ph < 7) return '#facc15';
    if (ph === 7) return '#22c55e';
    if (ph < 10) return '#3b82f6';
    return '#6366f1';
  };

  const getPHLabel = (v: number) => {
    if (v < 3) return { text: 'Kuvvetli Asit', color: 'text-red-500' };
    if (v < 7) return { text: 'Zayıf Asit', color: 'text-orange-400' };
    if (v === 7) return { text: 'Nötr', color: 'text-green-500' };
    if (v < 11) return { text: 'Zayıf Baz', color: 'text-blue-400' };
    return { text: 'Kuvvetli Baz', color: 'text-indigo-600' };
  };

  const handleDip = () => {
    setIsDipping(true);
    setTimeout(() => {
      setPaperColor(getPHColor(level));
      setIsDipping(false);
    }, 1000);
  };

  return (
    <div className="glass-card p-6 md:p-10 border-indigo-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">pH İndikatör Testi</h2>
            <p className="text-slate-400 text-sm">Bir madde seçerek çözeltinin asitlik veya bazlık durumunu gözlemleyin.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {substances.map(s => (
              <button
                key={s.name}
                onClick={() => { setSelectedSubstance(s.name); setLevel(s.ph); setPaperColor('#e2e8f0'); }}
                className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                  selectedSubstance === s.name 
                    ? 'bg-indigo-500/20 border-indigo-500 text-white' 
                    : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
             <button
               onClick={handleDip}
               disabled={!selectedSubstance || isDipping}
               className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
             >
               <MousePointer2 className="w-5 h-5" /> Turnusol Kağıdını Batır
             </button>
             <p className="text-[10px] text-center text-slate-500">Kağıdın renk değişimi maddenin pH değerini gösterir.</p>
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 relative group">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">pH Skalası (0-14)</h4>
            <div className="h-4 w-full bg-gradient-to-r from-red-600 via-yellow-400 via-green-500 via-blue-500 to-indigo-800 rounded-full mb-4 relative">
              <motion.div 
                animate={{ left: `${(level / 14) * 100}%` }}
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-4 border-slate-900 shadow-xl z-10 flex items-center justify-center"
              >
                <div className="w-1 h-3 bg-slate-400 rounded-full" />
              </motion.div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-600 font-mono">
              <span>0 (Asit)</span><span>7 (Nötr)</span><span>14 (Baz)</span>
            </div>
          </div>

          <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Bilgi Köşesi</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
               <div className="text-[10px] text-slate-400 leading-relaxed">
                 <strong className="text-indigo-300">pH {'<'} 7:</strong> Çözelti asidiktir. Turnusol kağıdını <span className="text-red-400">kırmızıya</span> çevirir.
               </div>
               <div className="text-[10px] text-slate-400 leading-relaxed">
                 <strong className="text-indigo-300">pH = 7:</strong> Çözelti nötrdür (örneğin saf su). İndikatör rengini değiştirmez.
               </div>
               <div className="text-[10px] text-slate-400 leading-relaxed">
                 <strong className="text-indigo-300">pH {'>'} 7:</strong> Çözelti baziktir. Turnusol kağıdını <span className="text-blue-400">maviye</span> çevirir.
               </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-slate-900/50 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Mevcut Durum</div>
            <div className={`text-4xl font-black ${getPHLabel(level).color}`}>{level.toFixed(1)}</div>
            <div className="text-sm font-medium text-slate-400">{getPHLabel(level).text}</div>
          </div>

          <div className="relative w-48 h-64 border-x-4 border-b-4 border-white/20 rounded-b-3xl overflow-hidden shadow-inner">
            <motion.div 
              animate={{ 
                height: `${(level + 3) * 5}%`, 
                backgroundColor: substances.find(s => s.name === selectedSubstance)?.color || '#38bdf8' 
              }}
              transition={{ type: 'spring', stiffness: 50 }}
              className="absolute bottom-0 left-0 w-full opacity-80"
            />
            
            {/* Hand with litmus paper simulation */}
            <motion.div
              animate={{ 
                y: isDipping ? 150 : 0,
                opacity: selectedSubstance ? 1 : 0
              }}
              className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-8 h-40 z-30"
            >
               <div className="w-full h-full bg-slate-200 border border-slate-300 rounded-b-sm shadow-lg relative">
                  <motion.div 
                    initial={false}
                    animate={{ backgroundColor: paperColor }}
                    className="absolute bottom-0 left-0 w-full h-1/2 bg-slate-200"
                  />
               </div>
            </motion.div>

            {/* Bubbles */}
            <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [-10, -200], opacity: [0, 0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, delay: i * 0.5 }}
                  className="absolute w-2 h-2 rounded-full bg-white/20"
                  style={{ left: `${20 + Math.random() * 60}%`, bottom: 0 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Gas Laws Simulation
function GasSim() {
  const [vol, setVol] = useState(50); // Volume %
  const [temp, setTemp] = useState(300); // Kelvin
  const [p, setP] = useState(1); // Standard Atm
  const [particles, setParticles] = useState(20);
  const [gasType, setGasType] = useState<'He' | 'Ar'>('He');

  // PV = nRT (n is number of particles)
  useEffect(() => {
    const calculatedP = (particles / 20) * (temp / 300) * (50 / vol);
    setP(calculatedP);
  }, [vol, temp, particles]);

  return (
    <div className="glass-card p-6 md:p-10 border-cyan-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">İdeal Gaz Simülatörü</h2>
            <p className="text-slate-400 text-sm">Hacim, sıcaklık ve tanecik sayısı arasındaki ilişkiyi gözlemleyin.</p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
               <button 
                 onClick={() => setGasType('He')}
                 className={`flex-1 p-3 rounded-xl text-xs font-bold border transition-all ${gasType === 'He' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/5 border-white/5 text-slate-500'}`}
               >
                 Helyum (Hafif)
               </button>
               <button 
                 onClick={() => setGasType('Ar')}
                 className={`flex-1 p-3 rounded-xl text-xs font-bold border transition-all ${gasType === 'Ar' ? 'bg-indigo-500/20 border-indigo-500 text-white' : 'bg-white/5 border-white/5 text-slate-500'}`}
               >
                 Argon (Ağır)
               </button>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-white flex items-center gap-2"><Box className="w-4 h-4 text-cyan-400" /> Hacim (V)</span>
                <span className="text-cyan-400 font-mono">{vol}%</span>
              </div>
              <input 
                type="range" min="10" max="90" value={vol}
                onChange={(e) => setVol(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-white flex items-center gap-2"><Thermometer className="w-4 h-4 text-orange-400" /> Sıcaklık (T)</span>
                <span className="text-orange-400 font-mono">{temp} K</span>
              </div>
              <input 
                type="range" min="100" max="600" value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-white flex items-center gap-2"><UserRound className="w-4 h-4 text-emerald-400" /> Tanecik Sayısı (n)</span>
                <span className="text-emerald-400 font-mono">{particles}</span>
              </div>
              <input 
                type="range" min="5" max="50" value={particles}
                onChange={(e) => setParticles(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Basınç (P)</div>
              <div className="text-3xl font-black text-cyan-400">{p.toFixed(2)} <span className="text-sm font-normal text-slate-500">atm</span></div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
               <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Kinetik Enerji</div>
               <div className={`text-sm font-medium mt-2 ${temp > 450 ? 'text-orange-400' : 'text-cyan-400'}`}>
                 {temp > 450 ? 'Yüksek' : temp < 200 ? 'Düşük' : 'Orta'}
               </div>
            </div>
          </div>

          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 grid grid-cols-2 gap-4">
             <div>
                <h5 className="text-[10px] font-bold text-cyan-400 uppercase mb-2">Boyle Kanunu</h5>
                <p className="text-[9px] text-slate-400 leading-tight italic">
                  Sıcaklık sabitken hacim azaldıkça basınç artar (P x V = k).
                </p>
             </div>
             <div>
                <h5 className="text-[10px] font-bold text-orange-400 uppercase mb-2">Charles Kanunu</h5>
                <p className="text-[9px] text-slate-400 leading-tight italic">
                  Hacim sabitken sıcaklık arttıkça basınç artar (P / T = k).
                </p>
             </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center bg-black/40 rounded-3xl p-8 border border-white/5 overflow-hidden">
          {/* Cylinder Container */}
          <div className="relative w-48 h-64 border-x-4 border-b-4 border-slate-600">
            {/* Piston */}
            <motion.div 
               animate={{ bottom: `${vol}%` }}
               className="absolute left-0 w-full h-4 bg-slate-400 border-y border-slate-300 z-20 shadow-2xl"
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-[400px] bg-slate-500" />
            </motion.div>

            {/* Gas Particles */}
            <div className="absolute inset-0">
               {[...Array(particles)].map((_, i) => (
                 <GasParticle key={i} temp={temp} type={gasType} />
               ))}
            </div>
          </div>
          
          {/* Heat Indicator */}
          <motion.div 
            animate={{ opacity: (temp - 100) / 500 }}
            className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-orange-500/30 to-transparent pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}

function GasParticle({ temp, type }: { temp: number, type: 'He' | 'Ar' }) {
  const [pos, setPos] = useState({ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 });
  const speed = (temp / 150) * (type === 'He' ? 2 : 0.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setPos(prev => ({
        x: (prev.x + (Math.random() - 0.5) * speed + 100) % 100,
        y: (prev.y + (Math.random() - 0.5) * speed + 100) % 100,
      }));
    }, 50);
    return () => clearInterval(interval);
  }, [speed]);

  return (
    <motion.div
      animate={{ x: `${pos.x}%`, y: `${pos.y}%` }}
      className={`absolute ${type === 'He' ? 'w-1.5 h-1.5 bg-cyan-400' : 'w-3 h-3 bg-indigo-400'} rounded-full shadow-[0_0_5px_currentColor] particle-glow`}
    />
  );
}

// 3. Mole Calculations (Atomik Terazi)
function MoleCalcSim() {
  const [substance, setSubstance] = useState('H2O');
  const [mass, setMass] = useState(18);
  const [showParticles, setShowParticles] = useState(false);
  
  const data: Record<string, { ma: number, name: string, structure: string }> = {
    'H2O': { ma: 18, name: 'Su', structure: 'O-H-H' },
    'CO2': { ma: 44, name: 'Karbondioksit', structure: 'O-C-O' },
    'NaCl': { ma: 58.5, name: 'Yemek Tuzu', structure: 'Na-Cl Grid' },
    'CH4': { ma: 16, name: 'Metan', structure: 'C-H4' },
    'O2': { ma: 32, name: 'Oksijen', structure: 'O=O' }
  };

  const mol = mass / data[substance].ma;
  const particles = mol * 6.02;

  return (
    <div className="glass-card p-6 md:p-10 border-emerald-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
           <div>
            <h2 className="text-2xl font-bold text-white mb-2">Atomik Terazi</h2>
            <p className="text-slate-400 text-sm">Mol, kütle ve tanecik sayısı arasındaki ilişkiyi dijital terazi ile keşfedin.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-3">Madde Seçin</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(data).map(k => (
                  <button 
                    key={k}
                    onClick={() => { setSubstance(k); setMass(data[k].ma); }}
                    className={`p-3 rounded-xl text-sm font-bold border transition-all ${
                      substance === k ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/5 border-white/5 text-slate-500'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-3">Miktar (Gram): <span className="text-white ml-2">{mass} g</span></label>
              <input 
                type="range" min="1" max="250" value={mass}
                onChange={(e) => setMass(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <button
              onClick={() => setShowParticles(!showParticles)}
              className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-slate-300 font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Box className="w-5 h-5" /> {showParticles ? 'Teraziye Dön' : 'Tanecik Yapısını Gör'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 relative overflow-hidden">
               <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Hesaplanan Mol</div>
               <div className="text-3xl font-black text-emerald-400">{mol.toFixed(3)} <span className="text-sm font-normal text-slate-500">mol</span></div>
               <Scale className="absolute -right-4 -bottom-4 w-20 h-20 text-emerald-500/10" />
            </div>
            <div className="p-6 rounded-2xl bg-teal-500/10 border border-teal-500/20 relative overflow-hidden">
               <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Tanecik Sayısı</div>
               <div className="text-2xl font-black text-teal-400">{particles.toFixed(2)} <span className="text-xs">x 10²³</span></div>
               <Box className="absolute -right-4 -bottom-4 w-20 h-20 text-teal-500/10" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[400px]">
           <div className="w-full">
            <AnimatePresence mode="wait">
              {!showParticles ? (
                <motion.div 
                  key="scale"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="relative p-12 bg-white/5 rounded-[3rem] border border-white/10 shadow-2xl flex flex-col items-center"
                >
                  {/* Balance Body */}
                  <div className="w-64 h-8 bg-slate-700 rounded-lg relative">
                    <motion.div 
                      animate={{ rotate: (mass - 100) / 15 }}
                      className="absolute -top-10 left-0 w-full h-2 bg-slate-500 rounded-full flex justify-between px-4"
                    >
                      <div className="w-12 h-12 bg-slate-400 rounded-full -mt-5 flex items-center justify-center text-[10px] text-black font-bold">100g</div>
                      <div className="w-12 h-12 bg-slate-400 rounded-full -mt-5 flex items-center justify-center text-[10px] text-black font-bold">{mass}g</div>
                    </motion.div>
                  </div>
                  <div className="mt-8 text-center">
                    <div className="text-slate-500 text-xs font-mono mb-2 uppercase">Moleküler Formül</div>
                    <div className="text-5xl font-black text-white tracking-tighter">{substance}</div>
                    <div className="mt-4 px-4 py-1 bg-white/5 rounded-full text-xs text-slate-400 border border-white/5">
                      M₁ = {data[substance].ma} g/mol
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="molecular"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="w-full h-full flex flex-col items-center justify-center p-8 bg-black/40 rounded-3xl border border-white/5"
                >
                  <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-8">Tanecik Yapısı ({data[substance].name})</h4>
                  <div className="relative w-48 h-48 flex items-center justify-center">
                     {substance === 'H2O' && (
                       <div className="relative group">
                          <div className="w-16 h-16 rounded-full bg-red-500 border-2 border-white/20 shadow-[0_0_20px_rgba(239,68,68,0.5)] flex items-center justify-center text-white font-bold">O</div>
                          <div className="absolute -bottom-2 -right-4 w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-slate-800 text-xs font-bold">H</div>
                          <div className="absolute -bottom-2 -left-4 w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-slate-800 text-xs font-bold">H</div>
                       </div>
                     )}
                     {substance === 'CO2' && (
                       <div className="flex items-center gap-1">
                          <div className="w-10 h-10 rounded-full bg-red-500 border-2 border-white/10" />
                          <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-white/20 flex items-center justify-center text-white font-bold">C</div>
                          <div className="w-10 h-10 rounded-full bg-red-500 border-2 border-white/10" />
                       </div>
                     )}
                     {(substance !== 'H2O' && substance !== 'CO2') && (
                       <div className="grid grid-cols-4 gap-2">
                         {[...Array(16)].map((_, i) => (
                           <motion.div 
                             key={i} 
                             animate={{ scale: [1, 1.1, 1] }} 
                             transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                             className={`w-6 h-6 rounded-full ${i % 2 === 0 ? 'bg-cyan-500' : 'bg-white'} border border-black/10`} 
                           />
                         ))}
                       </div>
                     )}
                  </div>
                  <p className="mt-8 text-xs text-center text-slate-400 italic">
                    "Avogadro sayısı ({particles.toFixed(2)} x 10²³) kadar bu tanecikten bir araya gelerek {mass} gram kütle oluşturur."
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10"
            >
              <h5 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Info className="w-3 h-3" /> Bilgi Köşesi
              </h5>
              <div className="grid grid-cols-1 gap-2 text-[10px] text-slate-400">
                <p>• 1 mol madde 6.02x10²³ tanecik içerir.</p>
                <p>• n = m/MA formülü ile mol hesaplanır.</p>
              </div>
            </motion.div>
           </div>
        </div>
      </div>
    </div>
  );
}

// 4. Physical vs Chemical Changes (Değişim Laboratuvarı)
function ChangesSim() {
  const [state, setState] = useState<'idle' | 'melting' | 'rusting' | 'boiling' | 'burning' | 'caramelizing'>('idle');
  const [object, setObject] = useState<'buz' | 'demir' | 'su' | 'magnezyum' | 'seker'>('buz');

  const triggers = {
    'buz': [
      { id: 'heat', label: 'Isı Ver', action: 'melting', result: 'Fiziksel Değişim (Erime)' },
    ],
    'demir': [
      { id: 'water', label: 'Nemli Ortam', action: 'rusting', result: 'Kimyasal Değişim (Oksitlenme)' },
    ],
    'su': [
      { id: 'heat', label: 'Isı Ver', action: 'boiling', result: 'Fiziksel Değişim (Buharlaşma)' },
    ],
    'magnezyum': [
      { id: 'burn', label: 'Yak', action: 'burning', result: 'Kimyasal Değişim (Yanma)' }
    ],
    'seker': [
      { id: 'heat', label: 'Kuvvetli Isı', action: 'caramelizing', result: 'Kimyasal Değişim (Karamelize)' }
    ]
  };

  return (
    <div className="glass-card p-6 md:p-10 border-orange-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
           <div>
            <h2 className="text-2xl font-bold text-white mb-2">Değişim Laboratuvarı</h2>
            <p className="text-slate-400 text-sm">Maddelerin geçirdiği değişimlerin türünü deneysel olarak tespit edin.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-3">Model Nesne Seçin</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {['buz', 'demir', 'su', 'magnezyum', 'seker'].map(o => (
                  <button 
                    key={o}
                    onClick={() => { setObject(o as any); setState('idle'); }}
                    className={`py-3 rounded-xl text-[10px] font-bold border transition-all flex flex-col items-center gap-1 ${
                      object === o ? 'bg-orange-500/20 border-orange-500 text-white' : 'bg-white/5 border-white/5 text-slate-500'
                    }`}
                  >
                    <Box className="w-4 h-4" />
                    {o.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Müdahale Edin</label>
              <div className="flex gap-4">
                {triggers[object].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setState(t.action as any)}
                    className="flex-1 py-4 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl font-bold shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5" /> {t.label}
                  </button>
                ))}
                <button 
                  onClick={() => setState('idle')}
                  className="p-4 bg-white/5 hover:bg-white/10 text-slate-400 rounded-2xl border border-white/10"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-black/40 rounded-3xl min-h-[400px] border border-white/5 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className={`w-32 h-32 flex items-center justify-center ${
                  object === 'buz' ? 'text-blue-200' : 
                  object === 'demir' ? 'text-slate-400' : 
                  object === 'su' ? 'text-blue-500' : 
                  object === 'magnezyum' ? 'text-slate-300' : 'text-white'
                }`}>
                   {object === 'buz' ? <Box className="w-24 h-24" /> : 
                    object === 'demir' ? <Scale className="w-24 h-24" /> : 
                    object === 'su' ? <Droplets className="w-24 h-24" /> :
                    object === 'magnezyum' ? <Zap className="w-20 h-20" /> : <div className="w-16 h-16 bg-white/20 rounded-md rotate-45" />}
                </div>
                <p className="mt-4 text-slate-500 font-mono text-sm">Madde stabil durumda.</p>
              </motion.div>
            )}

            {state === 'melting' && (
              <motion.div key="melting" className="flex flex-col items-center">
                 <motion.div animate={{ scale: [1, 0.5], opacity: [1, 0.5] }} className="text-blue-300">
                    <Box className="w-24 h-24" />
                 </motion.div>
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 20] }} className="absolute bottom-20 text-blue-500">
                    <Droplets className="w-16 h-16" />
                 </motion.div>
                 <div className="mt-8 px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 font-bold border border-blue-500/30">
                    Fiziksel Değişim! (Erime)
                 </div>
              </motion.div>
            )}

            {state === 'rusting' && (
              <motion.div key="rusting" className="flex flex-col items-center">
                 <motion.div animate={{ color: ['#94a3b8', '#92400e'] }} transition={{ duration: 3 }} className="text-slate-400">
                    <Scale className="w-24 h-24" />
                 </motion.div>
                 <div className="mt-8 px-4 py-2 bg-red-500/20 rounded-full text-red-400 font-bold border border-red-500/30">
                    Kimyasal Değişim! (Paslanma)
                 </div>
              </motion.div>
            )}

            {state === 'boiling' && (
              <motion.div key="boiling" className="flex flex-col items-center">
                 <div className="relative">
                    <Droplets className="w-24 h-24 text-blue-500" />
                    {[...Array(3)].map((_, i) => (
                       <motion.div 
                        key={i} 
                        initial={{ y: 0, opacity: 1 }} 
                        animate={{ y: -100, opacity: 0 }} 
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.3 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2"
                       >
                         <Wind className="w-8 h-8 text-white/40" />
                       </motion.div>
                    ))}
                 </div>
                 <div className="mt-8 px-4 py-2 bg-blue-400/20 rounded-full text-blue-300 font-bold border border-blue-400/30">
                    Fiziksel Değişim! (Buharlaşma)
                 </div>
              </motion.div>
            )}

            {state === 'burning' && (
               <motion.div key="burning" className="flex flex-col items-center">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      filter: ['brightness(1)', 'brightness(3)', 'brightness(1)']
                    }}
                    transition={{ duration: 0.5, repeat: 3 }}
                    className="text-white"
                  >
                     <Zap className="w-24 h-24" />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 0.5 }} 
                    transition={{ delay: 1.5 }}
                    className="w-24 h-4 bg-slate-800 rounded-full blur-sm"
                  />
                  <div className="mt-8 px-4 py-2 bg-orange-500/20 rounded-full text-orange-400 font-bold border border-orange-500/30">
                    Kimyasal Değişim! (Yanma)
                 </div>
               </motion.div>
            )}

            {state === 'caramelizing' && (
              <motion.div key="sugar" className="flex flex-col items-center">
                 <motion.div 
                  className="w-20 h-20 bg-white rounded-lg rotate-45"
                  animate={{ backgroundColor: ['#ffffff', '#92400e', '#451a03'], scale: [1, 0.8] }}
                  transition={{ duration: 4 }}
                 />
                 <div className="mt-8 px-4 py-2 bg-yellow-500/20 rounded-full text-yellow-500 font-bold border border-yellow-500/30">
                    Kimyasal Değişim! (Karamelize)
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
             <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-orange-400" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Özet Bilgi</span>
             </div>
             <p className="text-[10px] text-slate-400 leading-relaxed">
               {state === 'idle' ? "Bir madde ve müdahale seçerek değişim türünü analiz edin." : 
                state === 'melting' || state === 'boiling' ? "Hal değişimleri fizikseldir; maddenin kimliği değişmez, sadece tanecik arası mesafe değişir." : 
                "Kimyasal değişimlerde madde geri dönüşsüz olarak yeni bir yapıya bürünür (yanma, oksitlenme vb.)."}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Particle Classification View
function ParticleViewSim() {
  const [selection, setSelection] = useState<'pure_element' | 'compound' | 'mixture'>('pure_element');
  const [temp, setTemp] = useState(300);

  const getSpeed = () => (temp / 150);

  return (
    <div className="glass-card p-6 md:p-10 border-purple-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
           <div>
            <h2 className="text-2xl font-bold text-white mb-2">Mikroskop Gözlemevi</h2>
            <p className="text-slate-400 text-sm">Maddeleri atomik ve moleküler düzeyde inceleyin. Sıcaklığın tanecik hareketine etkisini gözlemleyin.</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => setSelection('pure_element')}
              className={`p-4 rounded-xl border text-left transition-all ${selection === 'pure_element' ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-white/5 border-white/5'}`}
            >
              <h4 className="font-bold text-white text-sm">Element</h4>
              <p className="text-[10px] text-slate-500">Aynı cins atomlardan oluşmuş saf madde.</p>
            </button>
            <button 
              onClick={() => setSelection('compound')}
              className={`p-4 rounded-xl border text-left transition-all ${selection === 'compound' ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-white/5 border-white/5'}`}
            >
              <h4 className="font-bold text-white text-sm">Bileşik</h4>
              <p className="text-[10px] text-slate-500">Moleküler yapıda farklı atomlar içerir.</p>
            </button>
            <button 
              onClick={() => setSelection('mixture')}
              className={`p-4 rounded-xl border text-left transition-all ${selection === 'mixture' ? 'bg-pink-500/10 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.2)]' : 'bg-white/5 border-white/5'}`}
            >
              <h4 className="font-bold text-white text-sm">Karışım</h4>
              <p className="text-[10px] text-slate-500">Farklı tanecik türlerinin serbest dağılımı.</p>
            </button>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
             <div className="flex justify-between text-xs mb-3 font-bold">
               <span className="text-slate-400">Sıcaklık Kontrolü</span>
               <span className="text-purple-400">{temp} K</span>
             </div>
             <input 
              type="range" min="50" max="1000" value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
             />
             <div className="flex justify-between mt-2 text-[10px] text-slate-600 uppercase font-mono">
                <span>Katı</span>
                <span>Sıvı</span>
                <span>Gaz</span>
             </div>
          </div>

          <div className="p-5 bg-purple-500/5 rounded-2xl border border-purple-500/10">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-purple-400" />
              <h5 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Sınıflandırma Özeti</h5>
            </div>
            <ul className="space-y-2">
              <li className="text-[10px] text-slate-400 leading-tight">
                <strong className="text-purple-300">Element:</strong> Saf maddedir, fiziksel veya kimyasal yollarla başka maddelere ayrışamaz.
              </li>
              <li className="text-[10px] text-slate-400 leading-tight">
                <strong className="text-indigo-300">Bileşik:</strong> En az iki farklı atomun sabit kütle oranında birleşmesidir.
              </li>
              <li className="text-[10px] text-slate-400 leading-tight">
                <strong className="text-pink-300">Karışım:</strong> Saf olmayan maddedir, bileşenleri her oranda karışabilir.
              </li>
            </ul>
          </div>
        </div>

        <div className="relative aspect-square bg-[#0a0a0c] rounded-full border-8 border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center group">
            {/* Cell View */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            <div className="relative w-full h-full flex flex-wrap items-center justify-center gap-6 p-12">
               {selection === 'pure_element' && (
                 [...Array(15)].map((_, i) => (
                   <motion.div 
                     key={i} 
                     animate={{ 
                       x: [0, (Math.random() - 0.5) * 10 * getSpeed(), 0],
                       y: [0, (Math.random() - 0.5) * 10 * getSpeed(), 0]
                     }}
                     transition={{ repeat: Infinity, duration: 1 / getSpeed() }}
                     className="w-6 h-6 rounded-full bg-cyan-500 border-2 border-white/20 shadow-[0_0_15px_rgba(6,182,212,0.4)]" 
                   />
                 ))
               )}

               {selection === 'compound' && (
                 [...Array(8)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      animate={{ 
                        x: [0, (Math.random() - 0.5) * 8 * getSpeed(), 0],
                        y: [0, (Math.random() - 0.5) * 8 * getSpeed(), 0],
                        rotate: 360
                      }}
                      transition={{ 
                        x: { repeat: Infinity, duration: 1 / getSpeed() },
                        y: { repeat: Infinity, duration: 1.2 / getSpeed() },
                        rotate: { repeat: Infinity, duration: 10 / getSpeed(), ease: "linear" }
                      }}
                      className="flex gap-[-4px] relative"
                    >
                        <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white/20 z-10" />
                        <div className="w-4 h-4 rounded-full bg-white border-2 border-slate-300 -ml-1 mt-4" />
                        <div className="w-4 h-4 rounded-full bg-white border-2 border-slate-300 -ml-6 -mt-2" />
                    </motion.div>
                 ))
               )}

               {selection === 'mixture' && (
                 <>
                   {[...Array(6)].map((_, i) => (
                     <motion.div 
                      key={`e-${i}`} 
                      animate={{ 
                        x: [0, (Math.random() - 0.5) * 15 * getSpeed(), 0],
                        y: [0, (Math.random() - 0.5) * 15 * getSpeed(), 0]
                      }}
                      transition={{ repeat: Infinity, duration: 0.8 / getSpeed() }}
                      className="w-5 h-5 rounded-full bg-amber-500 border border-white/20 shadow-[0_0_10px_rgba(245,158,11,0.3)]" 
                     />
                   ))}
                   {[...Array(6)].map((_, i) => (
                     <motion.div 
                      key={`c-${i}`} 
                      animate={{ 
                        x: [0, (Math.random() - 0.5) * 12 * getSpeed(), 0],
                        y: [0, (Math.random() - 0.5) * 12 * getSpeed(), 0]
                      }}
                      transition={{ repeat: Infinity, duration: 1.5 / getSpeed() }}
                      className="flex"
                     >
                        <div className="w-6 h-6 rounded-full bg-blue-500 border border-white/10" />
                        <div className="w-2 h-2 rounded-full bg-white -ml-1 mt-3" />
                     </motion.div>
                   ))}
                 </>
               )}
            </div>

            {/* Lens HUD */}
            <div className="absolute inset-0 border-[30px] border-black/40 rounded-full pointer-events-none group-hover:border-[40px] transition-all duration-700" />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[10px] font-mono text-slate-400 uppercase">Molecular Scan: Active</span>
            </div>
        </div>
      </div>
    </div>
  );
}
