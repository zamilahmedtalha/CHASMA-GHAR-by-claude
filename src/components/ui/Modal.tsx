import React, { useEffect } from 'react';
import { GlassSurface } from './GlassSurface';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <GlassSurface 
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white/80 animate-in zoom-in-95 fade-in duration-200"
        borderRadius={24}
        opacity={0.95}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-black/5 bg-white/50 backdrop-blur-md">
          {title && <h2 className="text-display-sm text-[--color-text-primary]">{title}</h2>}
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 transition-colors ml-auto"
          >
            <X size={20} className="text-[--color-text-primary]" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </GlassSurface>
    </div>
  );
};
