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
  },
  {
    title: 'Every Moment With You',
    subtitle: "A memory I'll treasure forever",
    date: '365 days • Infinite memories',
    image: '/images/slide2.png',
  },
  {
    title: 'Happy Anniversary, My Love',
    subtitle: 'To many more years of us ❤️',
    date: 'Forever & Always',
    image: '/images/slide3.jpg',
  },
];

function Slide({ slide, index, scrollYProgress }) {
  // Each slide occupies 1/3 of scroll, with generous overlap for crossfade
  const s = index / 3;
  const e = (index + 1) / 3;
  const fadeIn  = s - 0.12;
  const fadeOut = e - 0.05;

  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0,    0,    fadeOut, e]
      : index === 2
      ? [fadeIn, s,   1,      1]
      : [fadeIn, s,   fadeOut, e],
    index === 0
      ? [1, 1, 1, 0]
      : index === 2
      ? [0, 1, 1, 1]
      : [0, 1, 1, 0]
  );

  // Subtle parallax — image moves slightly slower, never exposes edges
  const imgY = useTransform(scrollYProgress, [s, e], ['0%', '8%']);

  // Text drifts up gently
  const textY = useTransform(scrollYProgress, [s, e], ['0px', '-24px']);

  return (
    <motion.div style={{ opacity, position: 'absolute', inset: 0, willChange: 'opacity' }}>

      {/* Image layer — oversized so parallax never shows edges */}
      <motion.div style={{
        position: 'absolute',
        top: '-15%', left: '-5%', right: '-5%', bottom: '-15%',
        backgroundImage: `url(${slide.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        y: imgY,
        willChange: 'transform',
      }} />

      {/* Soft dark vignette bottom only — no top color */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 30%, rgba(0,0,0,0.5) 100%)',
      }} />

      {/* Rose gold shimmer */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
        background: 'linear-gradient(105deg, transparent 35%, rgba(183,110,121,0.06) 50%, transparent 65%)',
        animation: 'shimmer 5s ease-in-out infinite',
      }} />

      <FloatingHearts />

      {/* Text */}
      <motion.div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        y: textY, padding: '0 1.5rem', textAlign: 'center',
      }}>
        <p style={{
          fontFamily: '"Great Vibes", cursive',
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          color: '#B76E79',
          marginBottom: '0.6rem',
          letterSpacing: '0.05em',
        }}>
          {slide.date}
        </p>

        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2rem, 6vw, 4.5rem)',
          fontWeight: 700,
          color: '#FFF8F0',
          lineHeight: 1.15,
          marginBottom: '0.8rem',
          textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 0 30px rgba(183,110,121,0.25)',
          maxWidth: '800px',
        }}>
          {slide.title}
        </h2>

        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          color: '#FFE5E5',
          letterSpacing: '0.08em',
          textShadow: '0 1px 8px rgba(0,0,0,0.5)',
          maxWidth: '600px',
        }}>
          {slide.subtitle}
        </p>

        <div style={{
          marginTop: '1.5rem',
          width: '80px', height: '1px',
          background: 'linear-gradient(to right, transparent, #B76E79, transparent)',
        }} />
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

  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Cormorant+Garamond:wght@400;500&family=Great+Vibes&display=swap');
        @keyframes shimmer { 0%,100%{opacity:0} 50%{opacity:1} }
      `}</style>

      <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#000' }}>

          {SLIDES.map((slide, i) => (
            <Slide key={i} slide={slide} index={i} scrollYProgress={scrollYProgress} />
          ))}

          {/* Scroll hint */}
          <motion.div style={{
            position: 'absolute', bottom: '2rem', left: '50%',
            x: '-50%', zIndex: 20, opacity: hintOpacity,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
          }}>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', color: '#FFE5E5', fontSize: '0.75rem', letterSpacing: '0.2em', opacity: 0.6 }}>
              SCROLL
            </p>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              style={{ color: '#B76E79', fontSize: '1rem' }}
            >↓</motion.div>
          </motion.div>

        </div>
      </div>
    </>
  );
}
