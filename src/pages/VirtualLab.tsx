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
  UserRound,
  Flame,
  Snowflake,
  Trash2,
  Scissors,
  Microscope,
  Atom,
  Sparkles,
  CloudRain,
  Cloud,
  Target
} from 'lucide-react';
import { MoleculeViewer } from '../components/MoleculeViewer';

type ExperimentId = 'ph' | 'gas_laws' | 'mole_calc' | 'changes' | 'particle_view' | 'balance';

const molecules3d: Record<string, any> = {
  'H2O': {
    name: 'Su',
    formula: 'H₂O',
    atoms: [
      { element: 'O', position: [0, 0, 0] },
      { element: 'H', position: [0.8, -0.6, 0] },
      { element: 'H', position: [-0.8, -0.6, 0] },
    ],
    bonds: [
      { start: [0, 0, 0], end: [0.8, -0.6, 0] },
      { start: [0, 0, 0], end: [-0.8, -0.6, 0] },
    ]
  },
  'CO2': {
    name: 'Karbondioksit',
    formula: 'CO₂',
    atoms: [
      { element: 'C', position: [0, 0, 0] },
      { element: 'O', position: [1, 0, 0] },
      { element: 'O', position: [-1, 0, 0] },
    ],
    bonds: [
      { start: [0, 0, 0], end: [1, 0, 0] },
      { start: [0, 0, 0], end: [-1, 0, 0] },
    ]
  },
  'CH4': {
    name: 'Metan',
    formula: 'CH₄',
    atoms: [
      { element: 'C', position: [0, 0, 0] },
      { element: 'H', position: [1, 1, 1] },
      { element: 'H', position: [-1, -1, 1] },
      { element: 'H', position: [-1, 1, -1] },
      { element: 'H', position: [1, -1, -1] },
    ],
    bonds: [
      { start: [0, 0, 0], end: [1, 1, 1] },
      { start: [0, 0, 0], end: [-1, -1, 1] },
      { start: [0, 0, 0], end: [-1, 1, -1] },
      { start: [0, 0, 0], end: [1, -1, -1] },
    ]
  },
  'O2': {
    name: 'Oksijen',
    formula: 'O₂',
    atoms: [
      { element: 'O', position: [0.6, 0, 0] },
      { element: 'O', position: [-0.6, 0, 0] },
    ],
    bonds: [
      { start: [0.6, 0, 0], end: [-0.6, 0, 0] },
    ]
  },
  'NaCl': {
    name: 'Yemek Tuzu',
    formula: 'NaCl',
    atoms: [
      { element: 'Na', position: [0.5, 0.5, 0.5] },
      { element: 'Cl', position: [-0.5, -0.5, -0.5] },
      { element: 'Na', position: [0.5, -0.5, -0.5] },
      { element: 'Cl', position: [-0.5, 0.5, 0.5] },
      { element: 'Na', position: [-0.5, 0.5, -0.5] },
      { element: 'Cl', position: [0.5, -0.5, 0.5] },
    ],
    bonds: []
  }
};

// 7. Reaction Balancer Simulator
function BalanceSim() {
  const [coefficients, setCoefficients] = useState([1, 1, 1]); // H2 + O2 -> H2O
  
  const isBalanced = coefficients[0] * 2 === coefficients[2] * 2 && coefficients[1] * 2 === coefficients[2] * 1;
  const isMinimal = isBalanced && coefficients[0] === 2 && coefficients[1] === 1 && coefficients[2] === 2;

  const updateCoeff = (idx: number, val: string) => {
    const newCoeffs = [...coefficients];
    newCoeffs[idx] = Math.max(0, parseInt(val) || 0);
    setCoefficients(newCoeffs);
  };

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
                  type="number" min="1" max="10" value={coefficients[0] || ''} 
                  onChange={(e) => updateCoeff(0, e.target.value)}
                  className="w-16 p-3 bg-white/5 border border-white/10 rounded-xl text-center text-white font-bold focus:border-violet-500 transition-colors"
                />
                <span className="text-cyan-400 font-bold mt-2">H₂</span>
             </div>
             <span className="text-slate-500 text-2xl">+</span>
             <div className="flex flex-col items-center">
                <input 
                  type="number" min="1" max="10" value={coefficients[1] || ''} 
                  onChange={(e) => updateCoeff(1, e.target.value)}
                  className="w-16 p-3 bg-white/5 border border-white/10 rounded-xl text-center text-white font-bold focus:border-violet-500 transition-colors"
                />
                <span className="text-cyan-400 font-bold mt-2">O₂</span>
             </div>
          </div>

          <ChevronRight className="w-10 h-10 text-slate-700 rotate-90 md:rotate-0" />

          <div className="flex items-center gap-4">
             <div className="flex flex-col items-center">
                <input 
                  type="number" min="1" max="10" value={coefficients[2] || ''} 
                  onChange={(e) => updateCoeff(2, e.target.value)}
                  className="w-16 p-3 bg-white/5 border border-white/10 rounded-xl text-center text-white font-bold focus:border-violet-500 transition-colors"
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

        {isBalanced && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 border rounded-2xl text-center transition-colors ${isMinimal ? 'bg-emerald-500/20 border-emerald-500' : 'bg-blue-500/20 border-blue-500'}`}
          >
             <h3 className={`font-bold text-xl mb-2 ${isMinimal ? 'text-emerald-400' : 'text-blue-400'}`}>
               {isMinimal ? 'Mükemmel! En Küçük Katsayılarla Denkleştirildi' : 'Tepkime Denkleştirildi!'}
             </h3>
             <p className={`${isMinimal ? 'text-emerald-500/80' : 'text-blue-500/80'}`}>
               Kütlenin korunumu kanunu sağlandı: {coefficients[0]} H₂ + {coefficients[1]} O₂ → {coefficients[2]} H₂O
             </p>
             {!isMinimal && <p className="text-[10px] text-blue-400/60 mt-2 italic">İpucu: Katsayıları sadeleştirerek en küçük tam sayılara ulaşabilirsiniz.</p>}
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
    konu: 'Asitler ve Bazlar',
    title: 'pH İndikatör Testi',
    description: 'Maddelerin asitlik ve bazlık derecelerini turnusol kağıdı ve indikatörlerle test edin.',
    icon: Droplets,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'changes',
    konu: 'Fiziksel ve Kimyasal',
    title: 'Değişim Laboratuvarı',
    description: 'Maddelere ısı, ışık veya reaktif ekleyerek fiziksel ve kimyasal değişimleri gözlemleyin.',
    icon: Zap,
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'gas_laws',
    konu: 'Gazlar',
    title: 'İdeal Gaz Simülatörü',
    description: 'Basınç, hacim ve sıcaklık arasındaki ilişkiyi pistonlu bir kapta deneyimleyin.',
    icon: Wind,
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'mole_calc',
    konu: 'Mol Kavramı',
    title: 'Atomik Terazi',
    description: 'Maddelerin kütle, mol ve tanecik sayısı arasındaki dönüşümleri 3D modellerle görün.',
    icon: Scale,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'balance',
    konu: 'Denklemler',
    title: 'Tepkime Denkleştirici',
    description: 'Kütlenin korunumu kanununa uygun olarak kimyasal denklemleri denkleştirin.',
    icon: Equal,
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'particle_view',
    konu: 'Maddenin Yapısı',
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
                    {exp.konu}
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
            {activeExperiment === 'balance' && <BalanceSim />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 1. pH Simulator (Improved)
function PHSimulator() {
  const [level, setLevel] = useState(7.0);
  const [selectedSubstance, setSelectedSubstance] = useState<string | null>('Saf Su');
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

// 2. Gas Laws Simulation (Refactored for Performance & Science)
function GasSim() {
  const [vol, setVol] = useState(50); // Volume %
  const [temp, setTemp] = useState(300); // Kelvin
  const [p, setP] = useState(1); // Standard Atm
  const [particles, setParticles] = useState(30);
  const [gasType, setGasType] = useState<'He' | 'Ar'>('He');
  const [lockedVar, setLockedVar] = useState<'none' | 'P' | 'V' | 'T'>('none');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);

  // PV = nRT (n is number of particles)
  useEffect(() => {
    if (lockedVar === 'none' || lockedVar === 'P') {
      const calculatedP = (particles / 30) * (temp / 300) * (50 / vol);
      setP(calculatedP);
    }
  }, [vol, temp, particles, lockedVar]);

  // Handle constraints (Locked Variable Logic)
  const handleVolChange = (newVol: number) => {
    if (lockedVar === 'P') {
      // P constant -> V / T = k -> V1/T1 = V2/T2 -> T2 = V2 * T1 / V1
      const newTemp = (newVol * temp) / vol;
      if (newTemp >= 100 && newTemp <= 600) {
        setTemp(newTemp);
        setVol(newVol);
      }
    } else if (lockedVar === 'T') {
      // T constant -> P1V1 = P2V2 -> P2 = P1 * V1 / V2
      // We calculate P in the effect, so just change V
      setVol(newVol);
    } else {
      setVol(newVol);
    }
  };

  const handleTempChange = (newTemp: number) => {
    if (lockedVar === 'P') {
      // P constant -> V / T = k -> V1/T1 = V2/T2 -> V2 = T2 * V1 / T1
      const newVol = (newTemp * vol) / temp;
      if (newVol >= 15 && newVol <= 90) {
        setVol(newVol);
        setTemp(newTemp);
      }
    } else if (lockedVar === 'V') {
      // V constant -> P / T = k -> P1/T1 = P2/T2
      setTemp(newTemp);
    } else {
      setTemp(newTemp);
    }
  };

  // Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize particles if count changes or they don't exist
    if (particlesRef.current.length !== particles) {
      const currentParticles = particlesRef.current;
      if (particles > currentParticles.length) {
        // Add more
        const more = [...Array(particles - currentParticles.length)].map(() => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5),
          vy: (Math.random() - 0.5),
        }));
        particlesRef.current = [...currentParticles, ...more];
      } else {
        // Remove some
        particlesRef.current = currentParticles.slice(0, particles);
      }
    }

    // Clamp existing particles to new canvas bounds (if volume decreased)
    particlesRef.current.forEach(p => {
      if (p.x > canvas.width) p.x = canvas.width - 2;
      if (p.y > canvas.height) p.y = canvas.height - 2;
    });

    let animationFrameId: number;

    const render = () => {
      const speed = (temp / 150) * (gasType === 'He' ? 1.8 : 0.7);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(p => {
        p.x += p.vx * speed;
        p.y += p.vy * speed;

        // Bounce walls
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; }

        // Draw
        ctx.beginPath();
        const radius = gasType === 'He' ? 2 : 4;
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gasType === 'He' ? '#22d3ee' : '#818cf8';
        ctx.fill();
        // Glow effect
        ctx.shadowBlur = 8;
        ctx.shadowColor = ctx.fillStyle;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [particles, temp, gasType, vol]);

  return (
    <div className="glass-card p-6 md:p-10 border-cyan-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">İdeal Gaz Simülatörü</h2>
              <p className="text-slate-400 text-sm">Basınç (P), Hacim (V) ve Sıcaklık (T) arasındaki ilişkiyi inceleyin.</p>
            </div>
          </div>

          {/* Locked Variable Selector */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
             <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">Sabit Tutulacak Değişken (Kanunlar)</label>
             <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'none', label: 'Hiçbiri', law: 'Genel Gaz' },
                  { id: 'T', label: 'T (Sıcaklık)', law: 'Boyle' },
                  { id: 'P', label: 'P (Basınç)', law: 'Charles' },
                  { id: 'V', label: 'V (Hacim)', law: 'Gay-Lussac' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setLockedVar(item.id as any)}
                    className={`flex flex-col items-center p-2 rounded-xl border transition-all ${
                      lockedVar === item.id ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'
                    }`}
                  >
                    <span className="text-[10px] font-bold">{item.label}</span>
                    <span className="text-[8px] opacity-70">{item.law}</span>
                  </button>
                ))}
             </div>
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
            
            {/* V Slider */}
            <div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-white flex items-center gap-2"><Box className="w-4 h-4 text-cyan-400" /> Hacim (V) {lockedVar === 'V' && '🔒'}</span>
                <span className="text-cyan-400 font-mono">{vol.toFixed(0)}%</span>
              </div>
              <input 
                type="range" min="15" max="90" value={vol}
                disabled={lockedVar === 'V'}
                onChange={(e) => handleVolChange(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500 disabled:opacity-30"
              />
            </div>

            {/* T Slider */}
            <div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-white flex items-center gap-2"><Thermometer className="w-4 h-4 text-orange-400" /> Sıcaklık (T) {lockedVar === 'T' && '🔒'}</span>
                <span className="text-orange-400 font-mono">{Math.round(temp)} K</span>
              </div>
              <input 
                type="range" min="100" max="600" value={temp}
                disabled={lockedVar === 'T'}
                onChange={(e) => handleTempChange(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500 disabled:opacity-30"
              />
            </div>

            {/* n Slider */}
            <div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-white flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-[8px] font-bold">n</div> Tanecik Sayısı (n)</span>
                <span className="text-emerald-400 font-mono">{particles}</span>
              </div>
              <input 
                type="range" min="5" max="60" value={particles}
                onChange={(e) => setParticles(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex justify-between items-center mb-1">
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Basınç (P)</div>
                {lockedVar === 'P' && <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest">SABİT</span>}
              </div>
              <div className="text-3xl font-black text-cyan-400">{p.toFixed(2)} <span className="text-sm font-normal text-slate-500">atm</span></div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
               <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Kinetik Enerji</div>
               <div className={`text-sm font-medium mt-2 ${temp > 450 ? 'text-orange-400' : 'text-cyan-400'}`}>
                 {temp > 450 ? 'Yüksek (Hızlı Hareket)' : temp < 200 ? 'Düşük (Yavaş Hareket)' : 'Orta'}
               </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center bg-[#0a0a0c] rounded-3xl p-8 border border-white/10 overflow-hidden shadow-2xl">
          {/* Cylinder Container */}
          <div className="relative w-56 h-[320px] bg-white/[0.02] border-x-4 border-b-4 border-slate-700/50 rounded-b-3xl">
            {/* Piston */}
            <motion.div 
               animate={{ bottom: `${vol}%` }}
               transition={{ type: 'spring', stiffness: 100, damping: 20 }}
               className="absolute left-0 w-full h-6 bg-gradient-to-b from-slate-400 to-slate-600 border-y border-slate-300 z-20 shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-[400px] bg-gradient-to-r from-slate-500 to-slate-700" />
            </motion.div>

            {/* Canvas for Particles */}
            <div className="absolute inset-x-0 bottom-0 overflow-hidden" style={{ height: `${vol}%` }}>
               <canvas 
                 ref={canvasRef} 
                 width={224} 
                 height={320 * (vol / 100)} 
                 className="w-full h-full"
               />
            </div>

            {/* Pressure Gauge Integration */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 flex flex-col items-center">
               <div className="w-1 h-8 bg-slate-700" />
               <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center">
                  <div className="w-1 h-4 bg-red-500 rounded-full origin-bottom" style={{ transform: `rotate(${(p * 20) - 90}deg)` }} />
               </div>
            </div>
          </div>
          
          {/* Heat Source */}
          <div className="mt-4 flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full blur-xl transition-all duration-1000 ${temp > 400 ? 'bg-orange-500/50' : 'bg-transparent'}`} />
            <motion.div 
              animate={{ opacity: (temp - 100) / 500 }}
              className="px-4 py-1 rounded-full bg-orange-500/20 text-orange-400 text-[8px] font-bold tracking-widest uppercase border border-orange-500/30"
            >
              Isı Kaynağı
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Removing obsolete GasParticle component as it's replaced by Canvas logic

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
                  className="w-full h-full flex flex-col items-center justify-center bg-black/40 rounded-3xl border border-white/5 overflow-hidden"
                >
                  <MoleculeViewer 
                    model={molecules3d[substance]} 
                    className="w-full h-[300px] bg-transparent"
                    hideLabels 
                  />
                  <p className="mt-4 pb-4 text-xs text-center text-slate-400 italic px-8">
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

// 4. Physical vs Chemical Changes (Değişim Laboratuvarı - Geliştirilmiş)
function ChangesSim() {
  const [state, setState] = useState<'idle' | 'processing' | 'result'>('idle');
  const [object, setObject] = useState<string>('buz');
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const materials: Record<string, { name: string, icon: any, color: string, description: string }> = {
    'buz': { name: 'Buz Küpü', icon: Snowflake, color: 'text-blue-300', description: 'H₂O(k) yapısındaki katı su.' },
    'demir': { name: 'Demir Çivi', icon: Scale, color: 'text-slate-400', description: 'Saf Fe elementinden yapılmış çivi.' },
    'kagit': { name: 'Kağıt', icon: Scissors, color: 'text-slate-100', description: 'Selüloz liflerinden oluşan organik yapı.' },
    'seker': { name: 'Küp Şeker', icon: Box, color: 'text-white', description: 'C₁₂H₂₂O₁₁ (Sakkaroz) kristali.' },
    'gumus': { name: 'Gümüş Kolye', icon: Sparkles, color: 'text-slate-200', description: 'Saf gümüş (Ag) takı.' },
  };

  const interactions: Record<string, any[]> = {
    'buz': [
      { id: 'heat', label: 'Isı Ver', type: 'physical', action: 'Erime', icon: Flame, explanation: 'Maddenin sadece fiziksel hali değişti. Molekül yapısı halen H₂O.' },
    ],
    'demir': [
      { id: 'rust', label: 'Nemli Ortam', type: 'chemical', action: 'Paslanma', icon: CloudRain, explanation: 'Demir, oksijenle tepkimeye girerek Demir Oksit (Pas) oluşturdu. Yeni bir madde oluştu.' },
    ],
    'kagit': [
      { id: 'cut', label: 'Kes', type: 'physical', action: 'Yırtılma', icon: Scissors, explanation: 'Kağıdın kimliği değişmedi, sadece boyutu küçüldü.' },
      { id: 'burn', label: 'Yak', type: 'chemical', action: 'Yanma', icon: Flame, explanation: 'Selüloz yanarak CO₂ ve su buharına dönüştü. Geri dönüşümsüz bir kimyasal değişim.' },
    ],
    'seker': [
      { id: 'dissolve', label: 'Suya At', type: 'physical', action: 'Çözünme', icon: Droplets, explanation: 'Şeker molekülleri su molekülleri arasına dağıldı. Buharlaştırma ile geri kazanılabilir.' },
      { id: 'caramel', label: 'Kuvvelti Isı', type: 'chemical', action: 'Karamelize', icon: Flame, explanation: 'Şeker molekülleri parçalandı ve yeni aromatik bileşikler oluştu.' },
    ],
    'gumus': [
      { id: 'tarnish', label: 'Hava Alsa', type: 'chemical', action: 'Kararma', icon: Cloud, explanation: 'Gümüş yüzeyinde gümüş sülfür tabakası oluştu. Maddenin atomik dizilimi değişti.' },
    ],
  };

  const currentAction = interactions[object].find(a => a.id === activeAction);

  const startExperiment = (actionId: string) => {
    setActiveAction(actionId);
    setState('processing');
    setTimeout(() => {
      setState('result');
    }, 2000);
  };

  const reset = () => {
    setState('idle');
    setActiveAction(null);
  };

  return (
    <div className="glass-card p-6 md:p-10 border-orange-500/20 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Microscope className="w-6 h-6 text-orange-400" />
              Değişim Laboratuvarı
            </h2>
            <p className="text-slate-400 text-sm">Maddelere müdahale ederek atomik seviyede neler olduğunu keşfedin.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">Laboratuvar Masası: Örnek Seçin</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {Object.entries(materials).map(([key, mat]) => (
                  <button 
                    key={key}
                    onClick={() => { setObject(key); reset(); }}
                    disabled={state === 'processing'}
                    className={`py-4 rounded-xl text-[10px] font-bold border transition-all flex flex-col items-center gap-2 group ${
                      object === key ? 'bg-orange-500/20 border-orange-500 text-white' : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/10'
                    }`}
                  >
                    <mat.icon className={`w-5 h-5 ${object === key ? mat.color : 'text-slate-600 group-hover:text-slate-400'}`} />
                    {mat.name.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Örnek Bilgisi</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">{materials[object].description}</p>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Müdahale Araçları</label>
              <div className="flex flex-wrap gap-3">
                {interactions[object].map(action => (
                  <button
                    key={action.id}
                    onClick={() => startExperiment(action.id)}
                    disabled={state !== 'idle'}
                    className={`flex-1 min-w-[140px] py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg ${
                      state === 'idle' ? 'bg-orange-600 hover:bg-orange-500 shadow-orange-900/20' : 'bg-slate-800 text-slate-600 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <action.icon className="w-5 h-5" /> {action.label}
                  </button>
                ))}
                <button 
                  onClick={reset}
                  className="p-4 bg-white/5 hover:bg-white/10 text-slate-400 rounded-2xl border border-white/10 transition-colors"
                  title="Sıfırla"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative bg-[#050505] rounded-[2.5rem] border border-white/10 p-10 flex flex-col items-center justify-center min-h-[450px] shadow-2xl overflow-hidden group">
          {/* Reaction Chamber Effect */}
          <div className="absolute inset-x-8 inset-y-12 border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent rounded-[2rem] pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                className="flex flex-col items-center gap-6"
              >
                <div className={`p-8 bg-white/5 rounded-full border border-white/10 shadow-inner ${materials[object].color}`}>
                  {React.createElement(materials[object].icon, { className: "w-24 h-24" })}
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-white font-bold text-lg mb-1">{materials[object].name}</div>
                  <div className="text-slate-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    Analiz Bekleniyor
                  </div>
                </div>
              </motion.div>
            )}

            {state === 'processing' && (
              <motion.div 
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="relative mb-8">
                  {currentAction?.id === 'heat' || currentAction?.id === 'burn' || currentAction?.id === 'caramel' ? (
                     <div className="flex flex-col items-center">
                        <motion.div 
                          animate={{ y: [0, -20], opacity: [0, 1, 0], scale: [1, 1.5] }} 
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="text-orange-500 absolute -top-12"
                        >
                          <Flame className="w-12 h-12" />
                        </motion.div>
                        <div className="p-8 bg-orange-500/10 rounded-full animate-pulse">
                           {React.createElement(materials[object].icon, { className: `w-20 h-20 ${materials[object].color}` })}
                        </div>
                     </div>
                  ) : currentAction?.id === 'rust' || currentAction?.id === 'tarnish' ? (
                    <div className="flex flex-col items-center">
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }} 
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <CloudRain className="w-12 h-12 text-blue-400 absolute -top-12 left-1/2 -translate-x-1/2" />
                        </motion.div>
                        <div className="p-8 bg-blue-500/10 rounded-full">
                           {React.createElement(materials[object].icon, { className: `w-20 h-20 ${materials[object].color}` })}
                        </div>
                     </div>
                  ) : (
                    <div className="p-8 bg-white/5 rounded-full border border-dashed border-white/20 animate-spin">
                       {React.createElement(materials[object].icon, { className: `w-20 h-20 ${materials[object].color}` })}
                    </div>
                  )}
                </div>
                <div className="text-cyan-400 font-bold uppercase tracking-widest text-xs">Müdahale Uygulanıyor...</div>
              </motion.div>
            )}

            {state === 'result' && (
              <motion.div 
                key="result"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full flex flex-col items-center"
              >
                <div className="mb-8 p-10 rounded-full relative">
                  <div className={`absolute inset-0 blur-3xl opacity-20 ${currentAction?.type === 'chemical' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                  {currentAction?.id === 'heat' || currentAction?.id === 'boil' ? (
                    <div className="relative">
                      <Droplets className="w-24 h-24 text-blue-400" />
                      <motion.div animate={{ y: -50, opacity: 0 }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 flex justify-center">
                        <Wind className="w-10 h-10 text-white/20" />
                      </motion.div>
                    </div>
                  ) : currentAction?.id === 'burn' ? (
                    <div className="flex flex-col items-center">
                       <Cloud className="w-24 h-24 text-slate-800" />
                       <p className="text-[10px] text-slate-600 mt-2 font-mono">Kül Karışımı</p>
                    </div>
                  ) : currentAction?.id === 'rust' ? (
                    <div className="relative">
                       <Scale className="w-24 h-24 text-orange-900" />
                       <div className="absolute top-0 right-0 w-8 h-8 bg-orange-700 rounded-full blur-sm" />
                    </div>
                  ) : (
                    <div className="relative">
                       {React.createElement(materials[object].icon, { className: `w-24 h-24 ${currentAction?.type === 'chemical' ? 'text-slate-600' : materials[object].color}` })}
                    </div>
                  )}
                </div>

                <div className="text-center space-y-4 w-full">
                  <div className={`inline-block px-4 py-1.5 rounded-full font-black uppercase text-xs tracking-widest border-2 ${
                    currentAction?.type === 'chemical' ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-blue-500/20 border-blue-500 text-blue-400'
                  }`}>
                    {currentAction?.type === 'chemical' ? 'KİMYASAL DEĞİŞİM' : 'FİZİKSEL DEĞİŞİM'}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white">{currentAction?.action} <span className="text-slate-500 font-normal">Gözlemlendi</span></h3>
                  
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl mx-auto max-w-sm">
                    <p className="text-xs text-slate-400 leading-relaxed italic">"{currentAction?.explanation}"</p>
                  </div>
                  
                  <button 
                    onClick={reset}
                    className="text-xs font-bold text-slate-500 hover:text-white transition-colors underline underline-offset-4"
                  >
                    Başka Bir Örnek Dene
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Educational Sidebar / Bottom Tip */}
          <div className="mt-10 p-5 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 w-full relative z-10">
             <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-orange-400" />
                <span className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">Önemli Kriterler</span>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <div className="text-[10px] font-bold text-blue-400 uppercase">Fiziksel</div>
                   <p className="text-[9px] text-slate-500 leading-tight">Molekül yapısı korunur. Hal değişimi, parçalanma, çözünme gibi olaylar.</p>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-orange-400 uppercase">Kimyasal</div>
                  <p className="text-[9px] text-slate-500 leading-tight">Yeni bir madde oluşur. Isı, ışık çıkışı, gaz çıkışı veya renk değişimi görülür.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Particle View Simulator (Mikroskop Gözlem Evi - Geliştirilmiş Eğitim Modeli)
function ParticleViewSim() {
  const [category, setCategory] = useState<'element' | 'compound' | 'mixture'>('element');
  const [state, setState] = useState<'solid' | 'liquid' | 'gas'>('gas');
  const [temperature, setTemperature] = useState(300); // Kelvin
  const [isTestMode, setIsTestMode] = useState(false);
  const [guess, setGuess] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Auto-set state based on temperature
  useEffect(() => {
    if (temperature < 100) setState('solid');
    else if (temperature < 400) setState('liquid');
    else setState('gas');
  }, [temperature]);

  const categories = {
    element: {
      name: "Saf Element",
      example: "Argon",
      formula: "Ar",
      description: "Tüm tanecikler tek bir cins atomdan oluşur. Maddenin en saf halidir.",
      parts: Array(12).fill('atom')
    },
    compound: {
      name: "Bileşik",
      example: "Su",
      formula: "H₂O",
      description: "Farklı tür atomlar belirli sayılarda birleşerek molekül yapısı oluşturur.",
      parts: Array(6).fill('molecule')
    },
    mixture: {
      name: "Karışım",
      example: "Hava Suyu",
      formula: "Ar + H₂O",
      description: "Farklı tür atom ve moleküllerin kimyasal bağ kurmadan bir arada bulunmasıdır.",
      parts: [...Array(6).fill('atom'), ...Array(4).fill('molecule')]
    }
  };

  const current = categories[category];

  const handleGuess = (type: string) => {
    setGuess(type);
    setShowResult(true);
  };

  const startNewTest = () => {
    const types = ['element', 'compound', 'mixture'] as const;
    const randomType = types[Math.floor(Math.random() * types.length)];
    setCategory(randomType);
    setGuess(null);
    setShowResult(false);
    setIsTestMode(true);
  };

  // Animation variants based on state
  const getAnimation = (i: number) => {
    const speedMultiplier = temperature / 300;
    
    if (state === 'solid') {
      return {
        x: [0, (Math.random() - 0.5) * 4, 0],
        y: [0, (Math.random() - 0.5) * 4, 0],
        transition: { repeat: Infinity, duration: 0.1 / speedMultiplier }
      };
    }
    
    if (state === 'liquid') {
      return {
        x: [0, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80, 0],
        y: [0, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80, 0],
        transition: { repeat: Infinity, duration: 4 / speedMultiplier, ease: "linear" as const }
      };
    }

    return {
      x: [0, (Math.random() - 0.5) * 160, (Math.random() - 0.5) * 160, 0],
      y: [0, (Math.random() - 0.5) * 160, (Math.random() - 0.5) * 160, 0],
      transition: { repeat: Infinity, duration: 2 / speedMultiplier, ease: "linear" as const }
    };
  };

  return (
    <div className="glass-card p-6 md:p-10 border-indigo-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Kontrol Paneli */}
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Microscope className="w-6 h-6 text-indigo-400" />
                Tanecik Dünyası
              </h2>
              <p className="text-slate-400 text-sm">Maddeleri oluşturan atom ve molekülleri keşfedin.</p>
            </div>
            <button
              onClick={() => {
                if (isTestMode) setIsTestMode(false);
                else startNewTest();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isTestMode ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-400 border border-white/10 hover:border-indigo-500/50'
              }`}
            >
              {isTestMode ? 'Gözlem Moduna Dön' : 'Test Moduna Geç'}
            </button>
          </div>

          {!isTestMode ? (
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Madde Türü Seçin</label>
              <div className="flex flex-wrap gap-2">
                {(['element', 'compound', 'mixture'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`flex-1 min-w-[100px] px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                      category === cat ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 border-white/10 text-slate-400 hover:border-indigo-500/50'
                    }`}
                  >
                    {categories[cat].name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Model Sınıflandırma</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(['element', 'compound', 'mixture'] as const).map((cat) => (
                  <button
                    key={cat}
                    disabled={showResult}
                    onClick={() => handleGuess(cat)}
                    className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                      showResult 
                        ? (cat === category ? 'bg-emerald-500 border-emerald-400 text-white' : (guess === cat ? 'bg-red-500 border-red-400 text-white' : 'bg-white/5 border-white/10 text-slate-600'))
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-indigo-500/50'
                    }`}
                  >
                    {categories[cat].name}
                  </button>
                ))}
              </div>
              {showResult && (
                <div className={`p-4 rounded-xl text-sm font-bold ${guess === category ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {guess === category ? 'Tebrikler! Doğru tahmin.' : `Yanlış! Bu bir ${categories[category].name}.`}
                  <button onClick={startNewTest} className="ml-4 underline">Yeni Soru</button>
                </div>
              )}
            </div>
          )}

          {/* Sıcaklık Kontrolü */}
          <div className="p-6 bg-slate-900/50 rounded-3xl border border-white/5 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Flame className={`w-4 h-4 ${temperature > 400 ? 'text-red-500' : 'text-blue-400'}`} />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Enerji Seviyesi</span>
              </div>
              <span className="text-lg font-mono font-bold text-indigo-400">{temperature} K</span>
            </div>
            
            <input 
              type="range" min="10" max="1000" value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />

            <div className="flex justify-between items-center px-1">
              {([
                { val: 50, label: 'Katı', color: 'text-blue-400' },
                { val: 300, label: 'Sıvı', color: 'text-emerald-400' },
                { val: 800, label: 'Gaz', color: 'text-orange-400' }
              ]).map((m) => (
                <button 
                  key={m.label} 
                  onClick={() => setTemperature(m.val)}
                  className={`text-[10px] font-bold uppercase transition-all ${temperature === m.val ? m.color : 'text-slate-600'}`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {!isTestMode || showResult ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10"
            >
               <h4 className="text-sm font-bold text-indigo-300 mb-1">{current.example} ({current.formula})</h4>
               <p className="text-xs text-slate-400 leading-relaxed">{current.description}</p>
            </motion.div>
          ) : (
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-white/5 text-center italic text-xs text-slate-500">
              Modeli inceleyin ve madde türünü yukarıdan seçin.
            </div>
          )}
        </div>

        {/* Mikroskop Görüntüsü */}
        <div className="relative">
          <div className="aspect-square bg-[#0a0a0c] rounded-full border-[16px] border-slate-800 shadow-[0_0_80px_rgba(0,0,0,0.6)] relative overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:30px_30px]" />
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[size:100%_2px,3px_100%]" />
             
             {/* Tanecik Simülasyonu */}
             <div className={`relative w-full h-full p-12 flex items-center justify-center ${state === 'solid' ? 'flex-wrap gap-3 max-w-[75%]' : ''}`}>
               {current.parts.map((type, i) => {
                 // Spacing logic for non-solid
                 const row = Math.floor(i / 3);
                 const col = i % 3;
                 const baseLeft = 20 + col * 25;
                 const baseTop = 20 + row * 22;
                 
                 return (
                   <motion.div
                     key={`${category}-${state}-${i}`}
                     initial={{ x: 0, y: 0 }}
                     animate={getAnimation(i)}
                     className={`relative ${state === 'solid' ? '' : 'absolute'}`}
                     style={state !== 'solid' ? { 
                       left: `${baseLeft + (i % 7)}%`, 
                       top: `${baseTop + (i % 5)}%` 
                     } : {}}
                   >
                     {type === 'atom' ? (
                       <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 via-indigo-600 to-indigo-800 border border-white/20 shadow-xl" />
                     ) : (
                       <div className="flex -space-x-2 items-center rotate-45">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 border border-white/20 z-10 shadow-lg" />
                          <div className="flex flex-col -space-y-1">
                             <div className="w-4 h-4 rounded-full bg-slate-100 border border-slate-300 shadow-sm" />
                             <div className="w-4 h-4 rounded-full bg-slate-100 border border-slate-300 shadow-sm" />
                          </div>
                       </div>
                     )}
                   </motion.div>
                 );
               })}
             </div>

             {/* Objektif Efekti */}
             <div className="absolute inset-0 border-[40px] border-black/40 rounded-full pointer-events-none" />
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 z-20">
                <span className="text-[10px] font-mono text-indigo-400 animate-pulse tracking-widest">
                  GÖZLEM: {state.toUpperCase()} FAZI
                </span>
             </div>
          </div>

          {/* Efsane (Legend) */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-6 bg-slate-900 border border-white/10 px-6 py-3 rounded-2xl shadow-xl z-30">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-indigo-500" />
               <span className="text-[10px] font-bold text-slate-300">Atom</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                   <div className="w-3 h-3 rounded-full bg-red-500" />
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                </div>
                <span className="text-[10px] font-bold text-slate-300">Molekül</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
