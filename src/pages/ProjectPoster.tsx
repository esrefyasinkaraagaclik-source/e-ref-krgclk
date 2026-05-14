import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Share2, Printer, ChevronLeft, Shield, Beaker } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectPoster = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" /> Geri Dön
          </button>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors">
              <Printer className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white shadow-2xl w-full flex flex-col p-8 md:p-12 text-slate-900 font-sans border border-slate-200 min-h-fit"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {}
          <div className="flex justify-between items-start border-b border-slate-300 pb-4 mb-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-slate-800">PROJE SUNUM POSTERİ</h1>
              <p className="text-slate-500 text-sm">4006 Destek Programının Proje Sunum Posteri örneği aşağıda sunulmuştur.</p>
              <div className="flex gap-4 text-[10px] text-slate-400 font-medium">
                <span>(100x80cm Dekota 3mm / 5mm)</span>
                <span>Font: Barlow Serisi</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center overflow-hidden border border-slate-200">
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const text = document.createElement('span');
                      text.innerText = 'REAKSİYONLAB';
                      text.className = 'text-[8px] text-white font-bold text-center px-1';
                      parent.appendChild(text);
                    }
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {}
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-sm p-4 min-h-[120px] flex flex-col">
                <h3 className="text-red-600 font-bold text-sm mb-2 text-center uppercase border-b border-slate-100 pb-1">Problem / Soru Cümlesi</h3>
                <p className="text-[11px] text-slate-600 flex-1">Kimyasal tepkimeler ve gaz yasaları gibi soyut kavramlar deneysel ortam olmadan kalıcı olarak nasıl öğrenilebilir?</p>
              </div>

              <div className="border border-slate-200 rounded-sm p-4 min-h-[200px] flex flex-col flex-1">
                <h3 className="text-red-600 font-bold text-sm mb-2 text-center uppercase border-b border-slate-100 pb-1">Özet</h3>
                <p className="text-[10px] leading-relaxed text-slate-600">
                  Bu projede; kimyasal bağlar, gaz kanunları ve tepkime türleri gibi temel kimya konularının interaktif simülasyonlar ve oyunlaştırılmış içeriklerle öğretildiği bir "Sanal Laboratuvar" platformu geliştirilmiştir. Web tabanlı bu uygulama ile her seviyeden öğrencinin laboratuvar ortamına erişimi hedeflenmiştir.
                </p>
              </div>

              <div className="border border-slate-200 rounded-sm p-4 min-h-[180px] flex flex-col">
                <h3 className="text-red-600 font-bold text-sm mb-2 text-center uppercase border-b border-slate-100 pb-1">Yöntem</h3>
                <p className="text-[10px] leading-relaxed text-slate-600">
                  Müfredat kazanımları analiz edilerek görselleştirme yöntemleri belirlendi. React ve Framer Motion teknolojileri kullanılarak dinamik atom modelleri ve gaz simülatörleri geliştirildi. Kullanıcı deneyimi odaklı arayüzler tasarlandı.
                </p>
              </div>
            </div>

            {}
            <div className="flex flex-col gap-4">
              {}
              <div className="border border-slate-200 rounded-sm p-4 flex flex-col items-center text-center">
                <div className="flex justify-between w-full mb-4 px-4">
                   <div className="w-10 h-10 flex items-center justify-center grayscale opacity-70"><Shield className="w-6 h-6 text-red-600" /></div>
                   <div className="text-[10px] font-bold text-slate-800">TÜBİTAK 4006</div>
                   <div className="w-10 h-10 flex items-center justify-center grayscale opacity-70"><Beaker className="w-6 h-6 text-slate-400" /></div>
                </div>
                <h2 className="text-lg font-bold text-slate-800 uppercase leading-snug mb-2">İnteraktif Sanal Kimya Laboratuvarı ve Öğrenme Platformu</h2>
                <div className="w-full h-px bg-slate-200 mb-4"></div>
                
                <div className="grid grid-cols-3 gap-2 w-full text-[9px] font-bold uppercase mb-4">
                  <div className="space-y-1">
                    <div className="text-slate-400">Proje Türü</div>
                    <div className="text-slate-800">Tasarım / Yazılım</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-slate-400">Ana Alan</div>
                    <div className="text-slate-800">Kimya / Teknoloji</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-slate-400">Konu Başlığı</div>
                    <div className="text-slate-800 leading-tight">Dijital Eğitim</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full text-[9px] border-t border-slate-100 pt-4">
                  <div className="text-left">
                    <div className="text-slate-400 uppercase mb-1">Görevli Öğrenciler</div>
                    <div className="text-slate-800 font-bold space-y-0.5">
                      <p>Eşref Yasin Karaağaçlık</p>
                      <p>Mustafa Kaan Gider</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 uppercase mb-1">Danışman Öğretmen</div>
                    <div className="text-slate-800 font-bold">
                      <p>Berna Sivri İşyapan</p>
                    </div>
                  </div>
                </div>
              </div>

              {}
              <div className="border border-slate-200 rounded-sm p-4 flex-1 flex flex-col">
                <h3 className="text-red-600 font-bold text-sm mb-4 text-center uppercase border-b border-slate-100 pb-1">Kullanılan Teknolojiler</h3>
                <div className="flex-1 bg-slate-50 border border-dashed border-slate-200 rounded flex flex-col items-start justify-start p-3 overflow-y-auto">
                  <div className="space-y-3 w-full text-[8.5px] text-slate-700">
                    <div>
                      <span className="font-bold text-slate-900 block border-b border-slate-200 mb-1">1. Yazılım Teknolojileri</span>
                      <p>TypeScript, React 19, Node.js</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block border-b border-slate-200 mb-1">2. Yapay Zeka</span>
                      <p>Google Gemini AI (Gemini 2.0 Flash)</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block border-b border-slate-200 mb-1">3. Görselleştirme</span>
                      <p>Three.js, React Three Fiber, Recharts, D3.js</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block border-b border-slate-200 mb-1">4. Tasarım & UX</span>
                      <p>Tailwind CSS (v4), Framer Motion, Lucide React</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-sm p-4 flex-1 flex flex-col min-h-[300px]">
                <h3 className="text-red-600 font-bold text-sm mb-2 text-center uppercase border-b border-slate-100 pb-1">Sonuç ve Tartışma</h3>
                <div className="text-[10px] leading-relaxed text-slate-600 space-y-2">
                  <p><strong>1. Yazılım:</strong> TypeScript ve React 19 kullanımı ile yüksek performanslı ve tip güvenli bir platform elde edilmiştir.</p>
                  <p><strong>2. AI Ent.:</strong> Gemini 2.0 Flash ile öğrencilere 7/24 rehberlik eden bir asistan entegre edilmiştir.</p>
                  <p><strong>3. Grafik:</strong> Three.js ile molekül modelleri ve deney düzenekleri sanal ortamda gerçeğe yakın simüle edilmiştir.</p>
                  <p><strong>4. UX:</strong> Tailwind v4 ve Motion ile interaktif, akıcı bir öğrenme deneyimi sunulmuştur.</p>
                  <p><strong>5. Veri:</strong> Maarif müfredatına uygun modüler yapı ile sürdürülebilirlik sağlanmış, kimya eğitiminde dijital dönüşüm hedefine ulaşılmıştır.</p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-sm p-4 min-h-[120px] flex flex-col overflow-y-auto">
                <h3 className="text-red-600 font-bold text-sm mb-2 text-center uppercase border-b border-slate-100 pb-1">Kaynaklar</h3>
                <ul className="text-[8px] text-slate-500 list-decimal list-inside space-y-0.5">
                  <li>TypeScript & React 19 Resmi Dokümantasyonu</li>
                  <li>Google Gemini AI API Referans Rehberi</li>
                  <li>Three.js & WebGL Grafik Motoru Kaynakları</li>
                  <li>Tailwind CSS v4 & Framer Motion Animasyon Kılavuzu</li>
                  <li>MEB Maarif Müfredatı 10. Sınıf Kimya Kazanımları</li>
                </ul>
              </div>
            </div>

          </div>

          {}
          <div className="mt-8 border-t border-slate-200 pt-4 flex justify-between items-end">
            <div className="text-[9px] text-slate-400 font-medium space-x-4">
              <span>TÜBİTAK BİLİM ve TOPLUM BAŞKANLIĞI</span>
              <span>4006 Destek Programı Görünürlük Rehberi</span>
            </div>
            <div className="text-red-600 font-black text-[14px] leading-none text-right">
              <span className="block text-[8px] mb-1">#MİLLİ</span>
              <span>TEKNOLOJİ<br/>HAMLESİ</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectPoster;
