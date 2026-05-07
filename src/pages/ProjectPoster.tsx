import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Share2, Printer, ChevronLeft } from 'lucide-react';
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
          className="relative bg-white rounded-xl shadow-2xl overflow-hidden aspect-[1.414/1] w-full flex flex-col p-10 text-slate-900 font-sans"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {/* Poster Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-200 pb-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold uppercase tracking-tight text-slate-800 italic">PROJE SUNUM POSTERİ ÖRNEĞİ</h1>
              <p className="text-slate-500 font-medium text-sm">4006 Destek Programının Proje Sunum Posteri örneği aşağıda sunulmuştur.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 text-center px-1 leading-tight">KURUM<br/>LOGO</span>
              </div>
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 text-center px-1 leading-tight">TÜBİTAK<br/>LOGO</span>
              </div>
            </div>
          </div>

          {/* Main Layout: 3 Columns */}
          <div className="flex-1 grid grid-cols-3 gap-10 overflow-hidden">
            {/* Column 1: Intro */}
            <div className="space-y-8">
              <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-red-500 h-full flex flex-col shadow-sm">
                <section>
                  <h2 className="text-xl font-bold text-red-600 mb-2 border-b border-red-100 pb-2">Problem / Soru Cümlesi</h2>
                  <p className="text-sm text-slate-700 font-medium">Yeni kurallar ile oluşturulmuş herhangi bir algoritma üretilebilir mi?</p>
                </section>

                <section className="mt-8">
                  <h2 className="text-xl font-bold text-red-600 mb-2 border-b border-red-100 pb-2">Özet</h2>
                  <div className="text-[12px] leading-relaxed text-slate-600 space-y-2">
                    <p>Bu projede; kredi kartı ya da kimlik numaraları gibi belirli matematiksel kurallar dâhilinde oluşturulan algoritmalara bir benzeri koşulmuş olan yeni kurallarla oluşturulmuş, kart veya üye numarası gibi herhangi bir sayısal bilginin bu algoritmayı sağlayıp sağlamadığı test edilmiştir.</p>
                  </div>
                </section>

                <section className="mt-8 flex-1">
                  <h2 className="text-xl font-bold text-red-600 mb-2 border-b border-red-100 pb-2">Yöntem</h2>
                  <div className="text-[12px] leading-relaxed text-slate-600 space-y-3 overflow-y-auto pr-2">
                    <p>Projenin ilk aşamasında örnek olarak kredi kartı numaralarının oluşturulmasında ve kontrolünde kullanılan Luhn Algoritması, T.C. kimlik numaralarının oluşturma algoritması ve baskı materyallere verilen barkod numaralarının oluşturulmasında kullanılan algoritmalar incelenmiştir.</p>
                    <p>Bu algoritmaların çalışma biçimi, çeşitli örnek girdiler üzerinden öğrencilerin de katılımı ile denenmiştir. Projenin ikinci aşamasında ise öğrenciler tarafından belirlenen kurallarla oluşturulan sayısal algoritma taslakları oluşturulmuştur.</p>
                  </div>
                </section>
              </div>
            </div>

            {/* Column 2: Core Info & Results */}
            <div className="space-y-6 flex flex-col">
              <div className="bg-slate-800 p-8 rounded-2xl text-white text-center mb-4 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-cyan-500"></div>
                <h2 className="text-2xl font-bold leading-tight">Kendi Sayısal Bilgi Kontrol Algoritmamızı Tasarlayalım</h2>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-200 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Proje Türü</span>
                  <span className="text-[13px] font-bold text-slate-800">Tasarım</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-200 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Ana Alan</span>
                  <span className="text-[13px] font-bold text-slate-800">Matematik</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-200 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Tematik Konu</span>
                  <span className="text-[11px] font-bold text-slate-800 leading-tight">Özgün Algoritma Tasarımı</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 mb-4">
                <div className="bg-slate-100/50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Görevli Öğrenciler</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] font-bold text-slate-800">
                      <span>Efe Gayret</span>
                      <span>Barış Demir</span>
                      <span>Pınar Özcan</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Danışman Öğretmen</span>
                    <div className="text-[12px] font-bold text-slate-800">Can Kaya</div>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-slate-50 p-6 rounded-lg border-t-4 border-slate-400 flex flex-col shadow-sm">
                <h2 className="text-xl font-bold text-slate-700 mb-4 text-center uppercase tracking-widest">BULGULAR</h2>
                <div className="flex-1 bg-white border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center p-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Printer className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tablo ve Görsel Alanı</p>
                    <p className="text-[9px] text-slate-300 mt-1 italic">(Grafik, tablo, şekil, fotoğraf ve gözlemler)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Conclusion & Refs */}
            <div className="space-y-8">
              <div className="bg-slate-50 p-6 rounded-lg border-r-4 border-red-500 h-full flex flex-col shadow-sm">
                <section className="flex-1">
                  <h2 className="text-xl font-bold text-red-600 mb-4 border-b border-red-100 pb-2">Sonuç ve Tartışma</h2>
                  <div className="text-[12px] leading-relaxed text-slate-600 space-y-3">
                    <p>Proje sonunda öğrencilerde, günlük hayatımızda birçok yerde karşımıza çıkan sayısal bilgilerin rastgele değil aslında bir aritmetik kural dâhilinde oluşturulduğu konusunda farkındalık oluşturulmuştur.</p>
                    <p className="font-medium text-slate-700">Öğrenciler tarafından bu tür algoritmaların temel aritmetik işlemler kullanılarak kolaylıkla tasarlanabileceği fark edilmiş, bu süreçte kullanılan matematik kavramları hatırlanmış ve oluşturdukları özgün algoritmalar ile gerçekleştirecekleri numara ayıntları sayesinde bir algoritmanın girdi ve çıktıları arasındaki ilişkiler anlaşılmıştır.</p>
                  </div>
                </section>

                <section className="mt-8">
                  <h2 className="text-xl font-bold text-red-600 mb-4 border-b border-red-100 pb-2">Kaynaklar</h2>
                  <ul className="text-[11px] text-slate-500 space-y-1.5 list-decimal list-inside">
                    <li>Matematik Ders Kitapları</li>
                    <li>Luhn Algoritması Teknik Dokümanları</li>
                    <li>T.C. Nüfus ve Vatandaşlık İşleri Algoritma Verileri</li>
                    <li>TÜBİTAK 4006 Proje Hazırlama Kılavuzu</li>
                  </ul>
                </section>
              </div>
            </div>
          </div>


          <div className="mt-8 flex justify-between items-end border-t border-slate-100 pt-4">
            <span className="text-[10px] font-medium text-slate-400">TÜBİTAK BİLİM ve TOPLUM BAŞKANLIĞI | 4006 Destek Programı</span>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-300" />
              <span className="text-[10px] font-bold text-slate-400">#MİLLİ TEKNOLOJİ HAMLESİ</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectPoster;
