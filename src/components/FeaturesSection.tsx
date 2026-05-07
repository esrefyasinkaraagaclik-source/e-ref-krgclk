import { motion } from "motion/react";
import { FlaskConical, Gamepad2, Bot, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: FlaskConical,
    title: "Sanal Laboratuvar",
    description: "Deneyleri güvenli ve etkileşimli bir ortamda sanal olarak gerçekleştirin.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    link: "/lab",
    linkText: "Deneye Git"
  },
  {
    icon: Gamepad2,
    title: "Eğitici Oyunlar",
    description: "Kimya konularını eğlenceli oyunlar ve görevlerle pekiştirin.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    link: "/map",
    linkText: "Öğrenmeye Başla"
  },
  {
    icon: Bot,
    title: "Yapay Zeka Asistanı",
    description: "Anlamadığınız yerleri 7/24 yapay zeka asistanınıza sorun.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Öğrenmeyi Yeniden Keşfet</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Geleneksel yöntemleri unutun. Modern teknolojilerle kimyayı yaşayarak, oynayarak ve anlayarak öğrenin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`glass-card p-8 border ${feature.border} hover:-translate-y-2 transition-transform duration-300 group`}
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed mb-6">{feature.description}</p>
              {feature.link && (
                <Link 
                  to={feature.link}
                  className={`inline-flex items-center gap-2 text-sm font-bold ${feature.color} hover:underline`}
                >
                  {feature.linkText} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
