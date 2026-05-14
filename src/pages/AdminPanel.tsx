

import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, getDocs, doc, updateDoc, where } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Shield, User, Ban, ShieldCheck, Search, Loader2, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error Detailed:', JSON.stringify(errInfo, null, 2));
  return errInfo;
}

interface UserData {
  uid: string;
  displayName: string;
  email: string;
  isBanned?: boolean;
  isAdmin?: boolean;
  lastIp?: string;
}

export function AdminPanel() {
  const { userProfile, banUser, unbanUser } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    const path = 'users';
    try {
      const q = query(collection(db, path));
      const querySnapshot = await getDocs(q);
      const userList: UserData[] = [];
      querySnapshot.forEach((doc) => {
        userList.push({ uid: doc.id, ...doc.data() } as UserData);
      });
      setUsers(userList);
    } catch (err) {
      const info = handleFirestoreError(err, OperationType.LIST, path);
      setError(`Erişim Hatası: ${info.error}. Lütfen Firebase konsolundaki kuralları kontrol edin.`);
    } finally {
      setLoading(false);
    }
  };

  const handleBanToggle = async (user: UserData) => {
    if (user.isAdmin) return; 
    
    setActionLoading(user.uid);
    try {
      if (user.isBanned) {
        await unbanUser(user.uid);
      } else {
        await banUser(user.uid);
      }
      
      setUsers(prev => prev.map(u => 
        u.uid === user.uid ? { ...u, isBanned: !user.isBanned } : u
      ));
    } catch (error) {
      alert("Hata: " + (error as Error).message);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = users.filter(user => 
    user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!userProfile?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-white">Erişim Engellendi</h2>
        <p className="text-slate-400">Bu sayfayı görüntülemek için yetkiniz yok.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-cyan-400" />
            Yönetim Paneli
          </h1>
          <p className="text-slate-400 mt-1">Sistemdeki kullanıcıları yönetin ve platform güvenliğini sağlayın.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Kullanıcı ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 w-full md:w-64"
          />
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Kullanıcı</th>
                  <th className="px-6 py-4">E-Posta</th>
                  <th className="px-6 py-4">Son IP</th>
                  <th className="px-6 py-4">Durum</th>
                  <th className="px-6 py-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredUsers.map((user) => (
                  <tr key={user.uid} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                          user.isAdmin ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400' : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}>
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white flex items-center gap-2">
                            {user.displayName}
                            {user.isAdmin && (
                              <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded-full border border-cyan-500/30 uppercase font-bold">Admin</span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500">ID: {user.uid.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-slate-400">
                      {user.lastIp || 'Bilinmiyor'}
                    </td>
                    <td className="px-6 py-4">
                      {user.isBanned ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                          <Ban className="w-3 h-3" />
                          Yasaklı
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                          <ShieldCheck className="w-3 h-3" />
                          Aktif
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {user.isAdmin ? (
                        <span className="text-xs text-slate-500 italic">Yönetici Banlanamaz</span>
                      ) : (
                        <button
                          onClick={() => handleBanToggle(user)}
                          disabled={actionLoading === user.uid}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            user.isBanned
                              ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20'
                              : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                          } disabled:opacity-50`}
                        >
                          {actionLoading === user.uid ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : user.isBanned ? (
                            <>
                              <ShieldCheck className="w-4 h-4" />
                              Yasağı Kaldır
                            </>
                          ) : (
                            <>
                              <Ban className="w-4 h-4" />
                              Yasakla
                            </>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              Arama kriterlerine uygun kullanıcı bulunamadı.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
