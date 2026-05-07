import { Outlet } from 'react-router-dom';
import { AnimatedBackground } from './AnimatedBackground';
import { Navbar } from './Navbar';

export function MainLayout() {
  return (
    <main className="flex-1 pt-24 pb-12 relative z-10 px-4 md:px-8 overflow-y-auto w-full">
      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>
    </main>
  );
}
