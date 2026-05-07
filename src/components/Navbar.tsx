import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Map, 
  LogOut, 
  User, 
  Home, 
  BookOpen, 
  ChevronDown,
  Menu,
  X,
  Shield,
  Beaker,
  FileText,
  PlayCircle,
  HelpCircle
} from 'lucide-react';
import { curriculum } from '../data/curriculum';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const { userProfile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Panel' },
    { path: '/lectures', icon: BookOpen, label: 'Konu Anlatımları' },
    { path: '/games', icon: PlayCircle, label: 'Eğitici Oyunlar' },
    { path: '/lab', icon: Beaker, label: 'Sanal Laboratuvar' },
    { path: '/exercises', icon: HelpCircle, label: 'Soru Bankası' },
    { path: '/poster', icon: FileText, label: 'Proje Posteri' },
  ];

  const handleThemeClick = (themeId: string) => {
    navigate('/lectures', { state: { scrollToTheme: themeId } });
    setIsThemeOpen(false);
    setIsMenuOpen(false);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-card rounded-none border-x-0 border-t-0 border-b-white/10 px-4 sm:px-6 h-20 flex items-center">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] overflow-hidden bg-slate-900 shrink-0 group-hover:scale-110 transition-transform">
            <img 
              src="https://i.hizliresim.com/27jdo2j.png" 
              alt="ReaksiyonLab Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xl font-bold font-display tracking-tight text-white hidden sm:block">ReaksiyonLab</span>
        </Link>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}

          {userProfile?.isAdmin && (
            <Link
              to="/admin"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                location.pathname === '/admin'
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span className="font-medium text-sm">Yönetim</span>
            </Link>
          )}

          {/* Themes Dropdown */}
          <div className="relative" ref={themeRef}>
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                isThemeOpen || location.pathname.startsWith('/module')
                  ? 'bg-white/5 text-cyan-300'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="font-medium text-sm">Konular</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isThemeOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isThemeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 mt-2 w-64 glass-card p-2 shadow-2xl border border-white/10 overflow-hidden"
                >
                  <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {curriculum.map((theme) => {
                      const titleMatch = theme.title.match(/^\d+\.\sTEMA:\s*(.+)$/i);
                      const displayName = titleMatch ? titleMatch[1] : theme.title;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => handleThemeClick(theme.id)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-300 text-left group"
                        >
                          <BookOpen className="w-4 h-4 shrink-0 group-hover:text-cyan-400" />
                          <span className="text-sm font-medium leading-tight">{displayName}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: User Profile & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* TÜBİTAK Logo */}
          <div className="hidden lg:flex items-center gap-2 pr-2 border-r border-white/10">
            <img 
              src="https://tubitak.gov.tr/sites/default/files/styles/original/public/2024-03/4006_ana_1.jpg.webp?itok=obkaQC0Z" 
              alt="TÜBİTAK 4006 Logo" 
              className="h-10 w-auto rounded-md"
              referrerPolicy="no-referrer"
            />
          </div>

          {userProfile ? (
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                <User className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-sm font-medium text-slate-200 hidden lg:block">{userProfile.displayName || 'Öğrenci'}</span>
              <button 
                onClick={handleLogout}
                className="ml-2 p-1.5 rounded-full hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                title="Çıkış Yap"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Giriş Yap
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                Kayıt Ol
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-white/10 md:hidden overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/5 hover:text-cyan-400 transition-all"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              {userProfile?.isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-white/5 transition-all border border-red-500/10"
                >
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Yönetim Paneli</span>
                </Link>
              )}
              <div className="pt-2 border-t border-white/5 mt-2">
                <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Konular</div>
                <div className="max-h-64 overflow-y-auto custom-scrollbar py-2">
                    {curriculum.map((theme) => {
                      const titleMatch = theme.title.match(/^\d+\.\sTEMA:\s*(.+)$/i);
                      const displayName = titleMatch ? titleMatch[1] : theme.title;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => handleThemeClick(theme.id)}
                          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-cyan-300 text-left"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span className="text-sm">{displayName}</span>
                        </button>
                      );
                    })}
                </div>
              </div>
              
              {userProfile ? (
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all border border-red-500/10 mt-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Çıkış Yap</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex justify-center items-center py-3 rounded-xl border border-white/10 text-slate-300 font-medium"
                  >
                    Giriş
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex justify-center items-center py-3 rounded-xl bg-cyan-500 text-white font-medium"
                  >
                    Kayıt
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
