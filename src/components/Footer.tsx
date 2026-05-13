import { Atom, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Atom className="w-6 h-6 text-cyan-400" />
              <span className="text-xl font-bold font-display text-white">ReaksiyonLab</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-6">
              10. sınıf kimya öğrencileri için Maarif Müfredatına uygun, etkileşimli ve yapay zeka destekli modern eğitim platformu.
            </p>
            <div className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl border border-white/10 w-fit">
              <img 
                src="https://tubitak.gov.tr/sites/default/files/styles/original/public/2024-03/4006_ana_1.jpg.webp?itok=obkaQC0Z" 
                alt="TÜBİTAK 4006 Logo" 
                className="h-16 w-auto rounded-lg"
                referrerPolicy="no-referrer"
              />
              <div className="pr-2">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">Destekleyen</div>
                <div className="text-sm font-semibold text-slate-300">TÜBİTAK 4006</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Geliştiriciler</h4>
            <ul className="space-y-4">
              <li>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Eşref Yasin Karaağaçlık</div>
                <div className="flex flex-col gap-2">
                  <a href="https://www.instagram.com/esrefyasinnk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    <Instagram className="w-4 h-4" />
                    <span>esrefyasinnk</span>
                  </a>
                  <a href="mailto:esrefyasinkaraagaclik@gmail.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">esrefyasinkaraagaclik@gmail.com</span>
                  </a>
                </div>
              </li>
              <li>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Mustafa Kaan Gider</div>
                <div className="flex flex-col gap-2">
                  <a href="https://www.instagram.com/mustafakaan.exe" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    <Instagram className="w-4 h-4" />
                    <span>mustafakaan.exe</span>
                  </a>
                  <a href="mailto:mustafakaanresmi@gmail.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">mustafakaanresmi@gmail.com</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/map" className="hover:text-cyan-400 transition-colors">Konular</Link></li>
              <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Eğitim Paneli</Link></li>
              <li><Link to="/references" className="hover:text-cyan-400 transition-colors">Kaynakça</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; 2026 ReaksiyonLab. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
