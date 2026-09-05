import React, { useEffect, useRef } from 'react';

/**
 * Reusable subtle particle background for light SaaS pages
 */
export default function ParticleBackground({ density = 'normal', style = {} }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      init();
    };

    window.addEventListener('resize', handleResize);

    const palette = [
      { r: 56, g: 189, b: 248 },  // Cyan/Blue
      { r: 129, g: 140, b: 248 }, // Indigo
      { r: 168, g: 85, b: 247 },  // Purple
      { r: 236, g: 72, b: 153 },  // Pink
      { r: 251, g: 146, b: 60 }   // Orange
    ];

    let dots = [];
    const count = density === 'sparse' ? 35 : density === 'dense' ? 90 : 55;

    const init = () => {
      dots = [];
      for (let i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 2 + 1,
          color: palette[Math.floor(Math.random() * palette.length)],
          alpha: Math.random() * 0.35 + 0.15,
          pulse: Math.random() * Math.PI * 2
        });
      }
    };

    init();

    let t = 0;
    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;

        const currentAlpha = Math.max(0.08, Math.min(0.6, d.alpha + Math.sin(t + d.pulse) * 0.1));

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${d.color.r}, ${d.color.g}, ${d.color.b}, ${currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density]);

  return (
    <div className="global-particle-canvas-wrapper" style={style} aria-hidden="true">
      <canvas ref={canvasRef} className="global-particle-canvas" />
    </div>
  );
}
