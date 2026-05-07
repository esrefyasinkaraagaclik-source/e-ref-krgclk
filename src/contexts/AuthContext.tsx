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

// Admin email as requested by user
const ADMIN_EMAIL = "esrefyasinkaraagaclik@gmail.com";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const isAdmin = user.email === ADMIN_EMAIL;
        const fallbackProfile: UserProfile = {
          uid: user.uid,
          displayName: user.isAnonymous ? 'Misafir Öğrenci' : (user.displayName || 'Öğrenci'),
          email: user.email || '',
          badges: [],
          completedModules: [],
          isAdmin: isAdmin
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

            setUserProfile({
              ...fallbackProfile,
              ...data,
              isAdmin: isAdmin, // Always override with true email check
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

  const completeModule = async (moduleId: string) => {
    if (!currentUser || !userProfile) return;
    if (userProfile.completedModules.includes(moduleId)) return; // Already completed

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
      completedModules: [...prev.completedModules, moduleId]
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
        await updateDoc(userRef, {
          totalScore: increment(scoreDifference)
        });
        
        setUserProfile(prev => prev ? {
          ...prev,
          totalScore: (prev.totalScore || 0) + scoreDifference
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
