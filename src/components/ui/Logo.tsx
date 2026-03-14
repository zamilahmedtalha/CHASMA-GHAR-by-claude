import React from 'react';

export const Logo = ({ className = "w-24 h-auto" }: { className?: string }) => (
  <svg 
    viewBox="0 0 240 120" 
    className={className} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <text 
      x="50%" 
      y="45%" 
      textAnchor="middle" 
      dominantBaseline="middle"
      fontFamily="'Cormorant Garamond', serif" 
      fontSize="48" 
      fontWeight="400" 
      letterSpacing="-1"
    >
      CHASMA
    </text>
    <text 
      x="50%" 
      y="85%" 
      textAnchor="middle" 
      dominantBaseline="middle"
      fontFamily="'Cormorant Garamond', serif" 
      fontSize="48" 
      fontWeight="400" 
      letterSpacing="-1"
    >
      GHAR
    </text>
  </svg>
);
