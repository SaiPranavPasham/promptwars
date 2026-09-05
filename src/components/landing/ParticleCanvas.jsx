import React, { useEffect, useRef } from 'react';

/**
 * ParticleCanvas
 * Renders the radial arc particle pattern behind the hero section,
 * mirroring the reference visual style with smooth blue -> purple -> pink -> orange gradients.
 */
export default function ParticleCanvas() {
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
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Mouse parallax tracking
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Color palette: Cyan -> Blue -> Purple -> Pink -> Orange -> Amber
    const palette = [
      { r: 56, g: 189, b: 248 },  // #38BDF8 (Sky Blue)
      { r: 99, g: 102, b: 241 },  // #6366F1 (Indigo)
      { r: 168, g: 85, b: 247 },  // #A855F7 (Purple)
      { r: 236, g: 72, b: 153 },  // #EC4899 (Pink)
      { r: 251, g: 146, b: 60 },  // #FB923C (Orange)
      { r: 245, g: 158, b: 11 }   // #F59E0B (Amber)
    ];

    let particles = [];

    const initParticles = () => {
      particles = [];
      const centerX = width / 2;
      const centerY = height / 2 - 20;

      // Create radial orbital concentric rings of dots like reference image
      const rings = 14;
      const baseRadiusMin = 180;
      const baseRadiusMax = Math.max(width, height) * 0.75;

      for (let r = 0; r < rings; r++) {
        const radius = baseRadiusMin + (r / rings) * (baseRadiusMax - baseRadiusMin);
        const count = Math.floor(18 + r * 7);

        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2 + (r * 0.18);
          // Determine color based on angle (creating the gradient across the circle)
          const normAngle = (angle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
          const colorIdx = Math.floor((normAngle / (Math.PI * 2)) * palette.length) % palette.length;
          const color = palette[colorIdx];

          particles.push({
            ring: r,
            baseRadius: radius,
            angle,
            angularSpeed: (0.0003 + (r % 3) * 0.00015) * (r % 2 === 0 ? 1 : -1),
            size: Math.random() * 2.2 + 1.2,
            color,
            alpha: Math.random() * 0.45 + 0.35,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.02,
            noiseOffset: (Math.random() - 0.5) * 16
          });
        }
      }
    };

    initParticles();

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      const centerX = width / 2 + (mouse.x - width / 2) * 0.035;
      const centerY = height / 2 - 20 + (mouse.y - height / 2) * 0.035;

      // Soft center halo wash (barely visible, crisp white/clean background preserved)
      const radialGlow = ctx.createRadialGradient(
        centerX, centerY, 80,
        centerX, centerY, width * 0.6
      );
      radialGlow.addColorStop(0, 'rgba(255, 255, 255, 0)');
      radialGlow.addColorStop(0.5, 'rgba(248, 250, 252, 0.4)');
      radialGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw particle dots
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.angularSpeed;

        // Radius with breathing pulse
        const dynamicRadius = p.baseRadius + Math.sin(time + p.pulsePhase) * 6 + p.noiseOffset;
        // Oval / perspective flattening to match reference
        const x = centerX + Math.cos(p.angle) * dynamicRadius * 1.15;
        const y = centerY + Math.sin(p.angle) * dynamicRadius * 0.78;

        const currentAlpha = Math.max(0.12, Math.min(0.85, p.alpha + Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.2));

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="particle-canvas-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-particle-canvas" />
    </div>
  );
}
