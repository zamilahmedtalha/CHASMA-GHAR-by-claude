import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PillNav } from './components/ui/PillNav';
import { CartDrawer } from './components/shop/CartDrawer';
import { SettingsButton } from './components/admin/SettingsButton';
import { AdminPanel } from './components/admin/AdminPanel';
import { useCartStore } from './store/useCartStore';
import { useAdminStore } from './store/useAdminStore';
import { Plasma } from './components/Plasma';
import { SplashCursor } from './components/ui/SplashCursor';
import { Logo } from './components/ui/Logo';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const { items, toggleCart } = useCartStore();
  const { adminMode } = useAdminStore();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Contact', href: '/contact' }
  ];

  const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches;
  };

  return (
    <Router>
      <div className="min-h-screen relative flex flex-col selection:bg-black selection:text-white bg-transparent">
        {/* Plasma Background */}
        <div className="fixed inset-0 z-[-1]">
          <Plasma color="#fdfbf7" speed={0.5} scale={1.5} opacity={0.8} />
        </div>

        {/* Splash Cursor */}
        {!isTouchDevice() && (
          <div className="fixed inset-0 pointer-events-none z-[1]">
            <SplashCursor 
              DENSITY_DISSIPATION={3.5}
              VELOCITY_DISSIPATION={2}
              SPLAT_RADIUS={0.2}
              SPLAT_FORCE={6000}
              BACK_COLOR={{ r: 0.78, g: 0.66, b: 0.43 }}
              TRANSPARENT={true}
              SHADING={true}
            />
          </div>
        )}

        {/* Global UI */}
        <PillNav items={navItems} />
        <CartDrawer />
        
        {/* Floating Cart Button (Mobile/Sticky) */}
        <button 
          onClick={toggleCart}
          className="fixed bottom-6 right-6 z-[101] w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-black text-xs font-bold rounded-full flex items-center justify-center border-2 border-black">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </button>

        {/* Admin Features */}
        <SettingsButton />
        {adminMode && <AdminPanel />}

        {/* Main Content */}
        <main className="flex-grow pt-24 relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="relative z-10 mt-24 py-12 border-t border-black/5 bg-white/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 text-display-sm text-[--color-text-primary]">
              <Logo className="w-24 h-auto text-black" />
            </div>
            <div className="flex gap-6 text-label text-[--color-text-muted]">
              <a href="#" className="hover:text-[--color-text-primary] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[--color-text-primary] transition-colors">Twitter</a>
              <a href="#" className="hover:text-[--color-text-primary] transition-colors">Pinterest</a>
            </div>
            <div className="text-label text-[--color-text-muted]">
              © {new Date().getFullYear()} Chasma Ghar. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
