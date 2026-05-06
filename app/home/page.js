'use client';
import { useEffect } from 'react';
import ParallaxHero from '@/components/ParallaxHero';

export default function HomePage() {
  useEffect(() => {
    document.body.classList.remove('locked');
  }, []);

  useEffect(() => {
    document.body.style.overflow = '';
  }, []);

  return (
    <main style={{ background: '#0d0608' }}>
      <ParallaxHero />
    </main>
  );
}
