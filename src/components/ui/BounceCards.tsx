import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface BounceCardsProps {
  images: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}

export const BounceCards: React.FC<BounceCardsProps> = ({
  images,
  containerWidth = 500,
  containerHeight = 250,
  animationDelay = 0.8,
  animationStagger = 0.09,
  easeType = "elastic.out(1, 0.5)",
  transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)"
  ],
  enableHover = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || cardsRef.current.length === 0) return;

    const cards = cardsRef.current.filter(Boolean);
    
    gsap.set(cards, { y: 300, opacity: 0 });

    gsap.to(cards, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: animationStagger,
      delay: animationDelay,
      ease: easeType,
      onComplete: () => {
        cards.forEach((card, i) => {
          if (card) {
            gsap.set(card, { transform: transformStyles[i] });
          }
        });
      }
    });

  }, [animationDelay, animationStagger, easeType, transformStyles]);

  return (
    <div 
      ref={containerRef} 
      className="relative flex items-center justify-center"
      style={{ width: containerWidth, height: containerHeight }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          ref={el => cardsRef.current[i] = el}
          className={`absolute w-32 h-40 md:w-40 md:h-52 rounded-xl overflow-hidden shadow-xl border border-white/20 transition-transform duration-300 ${enableHover ? 'hover:z-10 hover:scale-110' : ''}`}
          style={{ transform: transformStyles[i] }}
        >
          <img src={src} alt={`Card ${i}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};
