import React, { useEffect, useRef } from 'react';

interface SplashCursorProps {
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  BACK_COLOR?: { r: number; g: number; b: number };
  TRANSPARENT?: boolean;
  SHADING?: boolean;
}

export const SplashCursor: React.FC<SplashCursorProps> = ({
  BACK_COLOR = { r: 0.78, g: 0.66, b: 0.43 },
  TRANSPARENT = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      for (let i = 0; i < 5; i++) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          life: 1,
          color: `rgba(${BACK_COLOR.r * 255}, ${BACK_COLOR.g * 255}, ${BACK_COLOR.b * 255}, `
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        
        if (p.life <= 0) {
          particles.splice(i, 1);
          i--;
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.life * 10, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.life})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [BACK_COLOR, TRANSPARENT]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};
