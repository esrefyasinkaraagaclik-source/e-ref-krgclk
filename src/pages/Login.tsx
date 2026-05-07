import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Atom, Mail, Lock, ArrowRight, Loader2, UserCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginAsGuest } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError('E-posta veya şifre hatalı.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setGuestLoading(true);
    setError('');
    try {
      await loginAsGuest();
      navigate('/dashboard');
    } catch (err: any) {
      setError('Misafir girişi başarısız oldu.');
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <div className="flex-1 pt-24 pb-12 flex items-center justify-center p-4 relative z-10 w-full overflow-y-auto">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] mb-6">
            <Atom className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold font-display text-white mb-2">Tekrar Hoş Geldin</h1>
          <p className="text-slate-400">Laboratuvara dönmek için giriş yap.</p>
        </div>

        <div className="glass-card p-8 border-cyan-500/20">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">E-posta Adresi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-700 rounded-xl bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="ogrenci@okul.edu.tr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Şifre</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-700 rounded-xl bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || guestLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Giriş Yap <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-slate-400">veya</span>
            </div>
          </div>

          <button
            onClick={handleGuestLogin}
            disabled={loading || guestLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-slate-700 rounded-xl shadow-sm text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {guestLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                <UserCircle2 className="w-5 h-5" /> Misafir Olarak Devam Et
              </>
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Hesabın yok mu?{' '}
              <Link to="/register" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                Kayıt Ol
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
