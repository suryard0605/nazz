'use client';
import { useEffect, useRef } from 'react';

function rand(a, b) { return a + Math.random() * (b - a); }

function createRocket(w, h) {
  return {
    x: rand(w * 0.2, w * 0.8),
    y: h,
    targetY: rand(h * 0.15, h * 0.4),
    speed: rand(8, 14),
    hue: rand(0, 360),
    trail: [],
    exploded: false,
  };
}

function explode(rocket) {
  const particles = [];
  const count = rand(60, 120);
  const type = Math.random() > 0.5 ? 'ring' : 'sphere';

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = type === 'ring' ? rand(4, 7) : rand(2, 10);
    const hue = rocket.hue + rand(-30, 30);
    particles.push({
      x: rocket.x,
      y: rocket.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      radius: rand(1.5, 3.5),
      color: `hsl(${hue}, 100%, ${rand(55, 80)}%)`,
      decay: rand(0.008, 0.018),
      gravity: 0.06,
      trail: [],
    });
  }

  // Add sparkles
  for (let i = 0; i < 20; i++) {
    const angle = rand(0, Math.PI * 2);
    const speed = rand(1, 4);
    particles.push({
      x: rocket.x,
      y: rocket.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      radius: rand(0.5, 1.5),
      color: '#fff',
      decay: rand(0.02, 0.04),
      gravity: 0.02,
      trail: [],
    });
  }

  return particles;
}

export default function Fireworks({ onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let rockets = [];
    let particles = [];
    let launchCount = 0;
    const maxLaunches = 8;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Launch rockets staggered
    const launchInterval = setInterval(() => {
      if (launchCount >= maxLaunches) {
        clearInterval(launchInterval);
        return;
      }
      rockets.push(createRocket(canvas.width, canvas.height));
      launchCount++;
    }, 350);

    const tick = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update rockets
      rockets.forEach(r => {
        if (r.exploded) return;
        r.trail.push({ x: r.x, y: r.y, alpha: 1 });
        if (r.trail.length > 8) r.trail.shift();
        r.y -= r.speed;
        r.x += rand(-0.5, 0.5);

        // Draw rocket trail
        r.trail.forEach((t, i) => {
          ctx.globalAlpha = t.alpha * 0.5;
          ctx.beginPath();
          ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${r.hue}, 100%, 70%)`;
          ctx.fill();
          t.alpha -= 0.12;
        });

        // Draw rocket head
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = `hsl(${r.hue}, 100%, 70%)`;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (r.y <= r.targetY) {
          r.exploded = true;
          particles.push(...explode(r));
        }
      });

      rockets = rockets.filter(r => !r.exploded);

      // Update particles
      particles.forEach(p => {
        p.trail.push({ x: p.x, y: p.y, alpha: p.alpha });
        if (p.trail.length > 4) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.985;
        p.alpha -= p.decay;

        // Draw trail
        p.trail.forEach(t => {
          ctx.globalAlpha = t.alpha * 0.3;
          ctx.beginPath();
          ctx.arc(t.x, t.y, p.radius * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });

        // Draw particle
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
      particles = particles.filter(p => p.alpha > 0);

      if (launchCount >= maxLaunches && rockets.length === 0 && particles.length === 0) {
        onComplete();
        return;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(launchInterval);
      window.removeEventListener('resize', resize);
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30"
      style={{ background: '#000' }}
    />
  );
}
