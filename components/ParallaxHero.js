'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingHearts from './FloatingHearts';

const SLIDES = [
  {
    title: 'The Day Everything Changed',
    subtitle: 'Where our story began',
    date: 'Est. March 2024',
    image: '/images/slide1.jpg',
    bg: 'linear-gradient(135deg, #1a0a0e 0%, #2d0f1a 100%)',
  },
  {
    title: 'Every Moment With You',
    subtitle: 'A memory I\'ll treasure forever',
    date: '365 days • Infinite memories',
    image: '/images/slide2.png',
    bg: 'linear-gradient(135deg, #0e0a1a 0%, #1a0d2d 100%)',
  },
  {
    title: 'Happy Anniversary, My Love',
    subtitle: 'To many more years of us ❤️',
    date: 'Forever & Always',
    image: '/images/slide3.jpg',
    bg: 'linear-gradient(135deg, #1a0a0e 0%, #2d1a0f 100%)',
  },
];

function Slide({ slide, index, scrollYProgress }) {
  const start = index / 3;
  const mid   = (index + 0.5) / 3;
  const end   = (index + 1) / 3;

  // Opacity: fade in, hold, fade out
  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 0.05, start + 0.25, end]
      : [start - 0.08, start + 0.08, mid, end],
    index === 0
      ? [1, 1, 1, 0]
      : index === 2
      ? [0, 1, 1, 1]
      : [0, 1, 1, 0]
  );

  // Image parallax — moves slower than scroll
  const imgY = useTransform(scrollYProgress, [start, end], ['0%', '18%']);

  // Text lift
  const textY = useTransform(scrollYProgress, [start, end], ['0px', '-40px']);

  // Scale
  const scale = useTransform(
    scrollYProgress,
    [start, mid, end],
    index === 2 ? [0.97, 1, 1] : [1, 1, 1.06]
  );

  return (
    <motion.div
      style={{ opacity, scale, position: 'absolute', inset: 0 }}
    >
      {/* Background image with parallax */}
      <motion.div
        style={{
          position: 'absolute', inset: '-10%',
          backgroundImage: `url(${slide.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: imgY,
          zIndex: 1,
          filter: 'brightness(0.75) contrast(1.1) saturate(1.2)',
        }}
      />

      {/* Fallback gradient behind image */}
      <div style={{ position: 'absolute', inset: 0, background: slide.bg, zIndex: 0 }} />

      {/* Romantic overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55))',
      }} />

      {/* Rose gold shimmer */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(105deg, transparent 40%, rgba(183,110,121,0.07) 50%, transparent 60%)',
        animation: 'shimmer 4s ease-in-out infinite',
      }} />

      <FloatingHearts />

      {/* Text content */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          y: textY, padding: '0 1.5rem', textAlign: 'center',
        }}
      >
        {/* Handwritten date */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{
            fontFamily: '"Great Vibes", cursive',
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#B76E79',
            marginBottom: '0.75rem',
            letterSpacing: '0.05em',
          }}
        >
          {slide.date}
        </motion.p>

        {/* Main title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            fontWeight: 700,
            color: '#FFF8F0',
            lineHeight: 1.15,
            marginBottom: '1rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.5), 0 0 30px rgba(183,110,121,0.3)',
            maxWidth: '800px',
          }}
        >
          {slide.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          style={{
            fontFamily: '"Cormorant Garamond", "Lora", serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            color: '#FFE5E5',
            letterSpacing: '0.08em',
            textShadow: '0 1px 8px rgba(0,0,0,0.4)',
            maxWidth: '600px',
          }}
        >
          {slide.subtitle}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
          style={{
            marginTop: '1.5rem',
            width: '80px', height: '1px',
            background: 'linear-gradient(to right, transparent, #B76E79, transparent)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ParallaxHero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Cormorant+Garamond:wght@400;500&family=Great+Vibes&display=swap');
        @keyframes shimmer { 0%,100%{opacity:0} 50%{opacity:1} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.18)} }
      `}</style>

      {/* Scroll container — 300vh total */}
      <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>

        {/* Sticky viewport */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          {SLIDES.map((slide, i) => (
            <Slide key={i} slide={slide} index={i} scrollYProgress={scrollYProgress} />
          ))}

          {/* Scroll hint on slide 1 */}
          <motion.div
            style={{
              position: 'absolute', bottom: '2rem', left: '50%',
              transform: 'translateX(-50%)', zIndex: 20,
              opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
            }}
          >
            <p style={{ fontFamily: '"Cormorant Garamond", serif', color: '#FFE5E5', fontSize: '0.8rem', letterSpacing: '0.15em', opacity: 0.7 }}>
              SCROLL
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ color: '#B76E79', fontSize: '1.2rem' }}
            >
              ↓
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
