import React, { useEffect, useRef } from 'react';

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: 'forward' | 'backward';
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
}

export const Plasma: React.FC<PlasmaProps> = ({
  color = '#C9A96E',
  speed = 0.6,
  opacity = 0.18,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      time += 0.01 * speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time) * 200,
        canvas.height / 2 + Math.cos(time) * 200,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );

      gradient.addColorStop(0, `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, speed, opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};
