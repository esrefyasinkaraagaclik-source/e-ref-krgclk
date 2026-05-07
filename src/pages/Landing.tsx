import { Link } from 'react-router-dom';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { TopicsSection } from '../components/TopicsSection';
import { GamificationSection } from '../components/GamificationSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { Atom } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Landing() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className="flex-1 pt-24 pb-12 relative z-10 w-full">
      {/* Main Content */}
      <main>
        <HeroSection onStart={() => navigate(currentUser ? '/dashboard' : '/register')} />
        <FeaturesSection />
        <TopicsSection />
        <GamificationSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
