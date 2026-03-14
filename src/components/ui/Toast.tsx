import React, { useEffect } from 'react';
import { GlassSurface } from './GlassSurface';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-10 fade-in duration-300">
      <GlassSurface className="px-6 py-3 flex items-center gap-4 rounded-full bg-[#0A0A0A] text-white border-white/10" opacity={0.95}>
        <span className="text-label">{message}</span>
        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </GlassSurface>
    </div>
  );
};
