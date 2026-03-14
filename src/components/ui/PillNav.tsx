import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { cn } from './GlassSurface';
import { Logo } from './Logo';

interface NavItem {
  label: string;
  href: string;
}

interface PillNavProps {
  logo?: string;
  logoAlt?: string;
  items: NavItem[];
  activeHref?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  theme?: string;
  initialLoadAnimation?: boolean;
}

export const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  ease = "power2.easeOut",
  baseColor = "#F8F7F4",
  pillColor = "#0A0A0A",
  hoveredPillTextColor = "#FFFFFF",
  pillTextColor = "#0A0A0A",
  initialLoadAnimation = true
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const currentPath = activeHref || location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (initialLoadAnimation && navRef.current) {
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 }
      );
    }
  }, [initialLoadAnimation]);

  return (
    <header 
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-4 sm:px-8 py-4",
        isScrolled ? "py-2" : "py-6"
      )}
    >
      <div 
        className={cn(
          "max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 rounded-full px-6 py-3",
          isScrolled ? "bg-white/55 backdrop-blur-md border border-white/20 shadow-sm" : "bg-transparent"
        )}
      >
        <Link to="/" className="flex items-center gap-3 text-display-sm text-[--color-text-primary] z-50">
          {logo ? <img src={logo} alt={logoAlt} className="h-8" /> : <Logo className="w-24 h-auto text-black" />}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {items.map((item) => {
            const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "relative px-4 py-2 text-label transition-colors duration-300 rounded-full",
                  isActive ? "text-white bg-[#0A0A0A]" : "text-[--color-text-primary] hover:bg-black/5"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={cn("w-full h-0.5 bg-black transition-transform origin-left", isOpen && "rotate-45 translate-x-1")} />
            <span className={cn("w-full h-0.5 bg-black transition-opacity", isOpen && "opacity-0")} />
            <span className={cn("w-full h-0.5 bg-black transition-transform origin-left", isOpen && "-rotate-45 translate-x-1")} />
          </div>
        </button>

        {/* Mobile Menu */}
        <div 
          className={cn(
            "fixed inset-0 bg-white/90 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-500 md:hidden",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className="text-display-md text-[--color-text-primary] hover:text-[--color-text-secondary] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
