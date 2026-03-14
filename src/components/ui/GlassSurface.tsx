import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  borderRadius?: number | string;
  className?: string;
  opacity?: number;
  blur?: number;
}

export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  borderRadius = 24,
  className,
  opacity = 0.55,
  blur = 16,
  style,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)]",
        className
      )}
      style={{
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};
