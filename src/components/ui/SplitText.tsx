import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  yOffset?: number;
  once?: boolean;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  duration = 0.8,
  ease = "power3.out",
  yOffset = 40,
  once = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || charsRef.current.length === 0) return;

    const chars = charsRef.current.filter(Boolean);
    
    gsap.set(chars, { opacity: 0, y: yOffset });

    const animation = gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration,
      ease,
      stagger,
      delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once,
      }
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [delay, stagger, duration, ease, yOffset, once]);

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIndex) => {
            const index = words.slice(0, wordIndex).join('').length + charIndex;
            return (
              <span
                key={charIndex}
                ref={(el) => (charsRef.current[index] = el)}
                className="inline-block"
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
};
