import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { 
  onAuthStateChanged, 
  User as FirebaseUser,
  signOut,
  signInAnonymously
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, serverTimestamp, increment } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  badges: string[];
  completedModules: string[];
  totalScore?: number;
  isGuest?: boolean;
  isBanned?: boolean;
  isAdmin?: boolean;
  lastIp?: string;
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  completeModule: (moduleId: string) => Promise<void>;
  awardBadge: (badgeId: string) => Promise<void>;
  submitScore: (moduleId: string, score: number) => Promise<void>;
  banUser: (targetUid: string) => Promise<void>;
  unbanUser: (targetUid: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin emails as requested by user
const ADMIN_EMAILS = [
  "esrefyasinkaraagaclik@gmail.com", 
  "mustafakaanresmi@gmail.com",
  "mehmetakiferden@gmail.com"
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
      } catch (e) {
        console.warn("IP could not be fetched");
        return null;
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const currentIp = await fetchIp();
        const isAdmin = user.email ? ADMIN_EMAILS.includes(user.email) : false;
        const fallbackProfile: UserProfile = {
          uid: user.uid,
          displayName: user.isAnonymous ? 'Misafir Öğrenci' : (user.displayName || 'Öğrenci'),
          email: user.email || 'misafir@virtual-lab.com',
          badges: [],
          completedModules: [],
          totalScore: 0,
          isBanned: false,
          isAdmin: isAdmin,
          lastIp: currentIp || undefined
        };

        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            
            // Critical check for ban
            if (data.isBanned) {
              console.error("Bu hesap banlanmıştır.");
              signOut(auth);
              setUserProfile(null);
              setLoading(false);
              return;
            }

            // Update IP if it changed or is missing
            if (currentIp && data.lastIp !== currentIp) {
              await updateDoc(docRef, { lastIp: currentIp });
            }

            // Award welcome badge if missing
            if (!data.badges?.includes('welcome')) {
              await updateDoc(docRef, {
                badges: arrayUnion('welcome'),
                totalScore: increment(1)
              });
              data.badges = [...(data.badges || []), 'welcome'];
              data.totalScore = (data.totalScore || 0) + 1;
            }

            setUserProfile({
              ...fallbackProfile,
              ...data,
              isAdmin: isAdmin,
              lastIp: currentIp || data.lastIp,
              completedModules: data.completedModules || [],
              badges: data.badges || [],
              highScores: data.highScores || {}
            } as UserProfile);
          } else {
            await setDoc(docRef, fallbackProfile);
            setUserProfile(fallbackProfile);
          }
        } catch (error: any) {
          console.error("Firestore error:", error);
          setUserProfile(fallbackProfile);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  const banUser = async (targetUid: string) => {
    if (!userProfile?.isAdmin) throw new Error("Bu işlem için yetkiniz yok.");
    const targetRef = doc(db, 'users', targetUid);
    await updateDoc(targetRef, { isBanned: true });
  };

  const unbanUser = async (targetUid: string) => {
    if (!userProfile?.isAdmin) throw new Error("Bu işlem için yetkiniz yok.");
    const targetRef = doc(db, 'users', targetUid);
    await updateDoc(targetRef, { isBanned: false });
  };

  const loginAsGuest = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Guest login failed:", error);
      throw error;
    }
  };

  const checkAndAwardBadges = async (completedCount: number, currentBadges: string[]) => {
    if (!currentUser) return [];

    const badgeMilestones = [
      { id: 'first_step', count: 1, name: 'Kimya Yolcusu' },
      { id: 'chemist_apprentice', count: 2, name: 'Element Uzmanı' },
      { id: 'lab_technician', count: 4, name: 'Deney Ustası' },
      { id: 'molecular_master', count: 6, name: 'Moleküler Deha' },
      { id: 'grand_chemist', count: 9, name: 'Nobel Adayı' }
    ];

    const newBadges: string[] = [];
    for (const milestone of badgeMilestones) {
      if (completedCount >= milestone.count && !currentBadges.includes(milestone.id)) {
        newBadges.push(milestone.id);
      }
    }

    if (newBadges.length > 0) {
      try {
        const docRef = doc(db, 'users', currentUser.uid);
        await updateDoc(docRef, {
          badges: arrayUnion(...newBadges)
        });
        return newBadges;
      } catch (error) {
        console.warn("Badge update failed in Firestore:", error);
      }
    }
    return [];
  };

  const completeModule = async (moduleId: string) => {
    if (!currentUser || !userProfile) return;
    if (userProfile.completedModules.includes(moduleId)) return; // Already completed

    const newCompletedModules = [...userProfile.completedModules, moduleId];
    const newBadgesFromMilestones = await checkAndAwardBadges(newCompletedModules.length, userProfile.badges);
    
    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await updateDoc(docRef, {
        completedModules: arrayUnion(moduleId)
      });
    } catch (error) {
      console.warn("Firestore update failed, updating local state only:", error);
    }
    
    setUserProfile(prev => prev ? {
      ...prev,
      completedModules: newCompletedModules,
      badges: [...prev.badges, ...newBadgesFromMilestones]
    } : null);
  };

  const awardBadge = async (badgeId: string) => {
    if (!currentUser || !userProfile) return;
    if (userProfile.badges.includes(badgeId)) return;

    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await updateDoc(docRef, {
        badges: arrayUnion(badgeId)
      });
    } catch (error) {
      console.warn("Firestore update failed, updating local state only:", error);
    }
    
    setUserProfile(prev => prev ? {
      ...prev,
      badges: [...prev.badges, badgeId]
    } : null);
  };

  const submitScore = async (moduleId: string, score: number) => {
    if (!currentUser || !userProfile) return;
    if (userProfile.isGuest) return; // Do not save guest scores

    try {
      const scoreId = `${currentUser.uid}_${moduleId}`;
      const docRef = doc(db, 'moduleScores', scoreId);
      const userRef = doc(db, 'users', currentUser.uid);
      
      const docSnap = await getDoc(docRef);
      let scoreDifference = score;

      if (docSnap.exists()) {
        const existingScore = docSnap.data().score;
        if (score > existingScore) {
          scoreDifference = score - existingScore;
          await updateDoc(docRef, {
            score,
            timestamp: serverTimestamp()
          });
        } else {
          scoreDifference = 0; // No new points
        }
      } else {
        await setDoc(docRef, {
          userId: currentUser.uid,
          moduleId,
          displayName: userProfile.displayName,
          score,
          timestamp: serverTimestamp()
        });
      }

      if (scoreDifference > 0) {
        const newTotalScore = (userProfile.totalScore || 0) + scoreDifference;
        const updates: any = {
          totalScore: increment(scoreDifference)
        };

        // Check for score_king badge
        if (newTotalScore >= 1000 && !userProfile.badges.includes('score_king')) {
          updates.badges = arrayUnion('score_king');
        }

        await updateDoc(userRef, updates);
        
        setUserProfile(prev => prev ? {
          ...prev,
          totalScore: newTotalScore,
          badges: updates.badges ? [...prev.badges, 'score_king'] : prev.badges
        } : null);
      }

    } catch (error) {
      console.error("Skor kaydedilirken hata:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      userProfile, 
      loading, 
      logout, 
      loginAsGuest, 
      completeModule, 
      awardBadge, 
      submitScore,
      banUser,
      unbanUser
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
