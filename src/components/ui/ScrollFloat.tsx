import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
  ease?: string;
  scrub?: boolean | number;
}

export const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  className = '',
  yOffset = 50,
  duration = 1,
  ease = "power2.out",
  scrub = false
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(ref.current,
      { y: yOffset, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          end: "top 50%",
          scrub,
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [yOffset, duration, ease, scrub]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
