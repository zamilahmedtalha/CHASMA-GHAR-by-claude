import React from 'react';

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 40" 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Left Lens */}
    <path d="M 5 15 C 10 15, 15 10, 25 10 C 35 10, 40 15, 45 15 C 45 25, 35 30, 25 30 C 15 30, 5 25, 5 15 Z" />
    {/* Right Lens */}
    <path d="M 95 15 C 90 15, 85 10, 75 10 C 65 10, 60 15, 55 15 C 55 25, 65 30, 75 30 C 85 30, 95 25, 95 15 Z" />
    {/* Bridge */}
    <path d="M 45 15 Q 50 12 55 15" />
    {/* Left Temple */}
    <path d="M 5 15 L 0 10" />
    {/* Right Temple */}
    <path d="M 95 15 L 100 10" />
  </svg>
);
