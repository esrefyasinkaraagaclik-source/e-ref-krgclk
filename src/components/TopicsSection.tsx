import { motion } from "motion/react";
import { Atom, Beaker, Flame, Layers, Wind } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const topics = [
  {
    title: "Kimyasal ve Fiziksel Değişimler",
    description: "Maddenin yapısındaki değişimleri inceleyin ve kimyasal göstergeleri öğrenin.",
    icon: Flame,
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Tanecik Modelleri",
    description: "Element, bileşik ve karışımların tanecik düzeyindeki dünyasını keşfedin.",
    icon: Atom,
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "Kimyasal Tepkimeler",
    description: "Tepkime türlerini analiz edin ve kimyasal denklemleri denkleştirin.",
    icon: Beaker,
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Mol Kavramı",
    description: "Avogadro sayısı, mol hesaplamaları ve madde miktarının incelenmesi.",
    icon: Layers,
    color: "from-violet-500 to-purple-500"
  },
  {
    title: "Gazlar",
    description: "Gazların özellikleri, kinetik teori ve gaz yasalarının gizemini çözün.",
    icon: Wind,
    color: "from-sky-400 to-blue-600"
  }
];

export function TopicsSection() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleAction = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <section id="topics" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Konuları Keşfet</h2>
            <p className="text-slate-400 max-w-2xl">10. Sınıf Maarif Müfredatına uygun olarak hazırlanmış, interaktif kimya konuları.</p>
          </div>
          <button onClick={handleAction} className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-2 transition-colors">
            Öğrenmeye Başla &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={handleAction}
              className="glass-card p-6 cursor-pointer group relative overflow-hidden text-left w-full block focus:outline-none"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${topic.color} opacity-10 rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150`} />
              
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-6 shadow-lg`}>
                <topic.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-cyan-300 transition-colors">{topic.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{topic.description}</p>
              
              <div className="mt-6 flex items-center text-sm font-medium text-slate-300 group-hover:text-cyan-400 transition-colors">
                Hemen Başla
                <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
