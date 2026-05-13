/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CurriculumProvider } from './contexts/CurriculumContext';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { ProgressMap } from './pages/ProgressMap';
import { ModuleView } from './pages/ModuleView';
import { AdminPanel } from './pages/AdminPanel';
import { References } from './pages/References';
import { VirtualLab } from './pages/VirtualLab';
import ProjectPoster from './pages/ProjectPoster';
import ExerciseBank from './pages/ExerciseBank';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { Profile } from './pages/Profile';
import { MainLayout } from './components/MainLayout';
import { Navbar } from './components/Navbar';
import { AnimatedBackground } from './components/AnimatedBackground';
import { AIAssistant } from './components/AIAssistant';

// Protected Route Wrapper
function ProtectedRoute({ children }: { children?: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">Yükleniyor...</div>;
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children ? <>{children}</> : <Outlet />;
}

// Public Route Wrapper (redirects to dashboard if logged in)
function PublicRoute({ children }: { children?: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">Yükleniyor...</div>;
  
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children ? <>{children}</> : <Outlet />;
}

export default function App() {
  return (
    <AuthProvider>
      <CurriculumProvider>
        <Router>
          <div className="min-h-screen font-sans text-slate-50 flex flex-col relative">
            <AnimatedBackground />
            <Navbar />
            <AIAssistant />
            
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/map" element={<ProgressMap />} />
                  <Route path="/lectures" element={<ProgressMap mode="theory" />} />
                  <Route path="/games" element={<ProgressMap mode="games" />} />
                  <Route path="/module/:moduleId" element={<ModuleView />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/references" element={<References />} />
                  <Route path="/lab" element={<VirtualLab />} />
                  <Route path="/poster" element={<ProjectPoster />} />
                  <Route path="/exercises" element={<ExerciseBank />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Route>
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </CurriculumProvider>
    </AuthProvider>
  );
}
