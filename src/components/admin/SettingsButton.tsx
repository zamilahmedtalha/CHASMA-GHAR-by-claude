import React, { useRef } from 'react';
import { Settings } from 'lucide-react';
import { gsap } from 'gsap';
import { useAdminStore } from '../../store/useAdminStore';
import { GlassSurface } from '../ui/GlassSurface';
import { Toast } from '../ui/Toast';

export const SettingsButton: React.FC = () => {
  const { incrementTap, adminMode } = useAdminStore();
  const iconRef = useRef<HTMLDivElement>(null);
  const [showToast, setShowToast] = React.useState(false);

  const handleTap = () => {
    incrementTap();
    
    if (iconRef.current) {
      gsap.fromTo(iconRef.current, 
        { scale: 0.8, rotation: 0 }, 
        { scale: 1, rotation: 360, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }

    // Check if admin mode was just unlocked
    const newAdminMode = sessionStorage.getItem('adminMode') === 'true';
    if (newAdminMode && !adminMode) {
      setShowToast(true);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <GlassSurface
          className="w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-white/80 transition-colors"
          borderRadius={999}
          opacity={0.6}
          onClick={handleTap}
        >
          <div ref={iconRef} className="text-[--color-text-muted] hover:text-[--color-text-primary] transition-colors">
            <Settings size={20} />
          </div>
        </GlassSurface>
      </div>

      <Toast 
        message="Admin Mode Unlocked" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </>
  );
};
