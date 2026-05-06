'use client';
import { useState, useEffect, useCallback } from 'react';
import NetflixIntro from '@/components/NetflixIntro';
import Countdown from '@/components/Countdown';
import Fireworks from '@/components/Fireworks';

const TEXT = 'happy anniversary, my dear ♡';

function CursiveText() {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayed(TEXT.slice(0, i));
      if (i >= TEXT.length) clearInterval(t);
    }, 100);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <p style={{
        fontFamily: '"Dancing Script", cursive',
        fontSize: 'clamp(1.8rem, 5vw, 3rem)',
        color: 'rgba(255,255,255,0.92)',
        textShadow: '0 0 18px rgba(255,255,255,0.4)',
        letterSpacing: '0.03em',
        textAlign: 'center',
        padding: '0 1.5rem',
      }}>
        {displayed}
        <span style={{ opacity: 0.7, animation: 'blink 1s step-end infinite' }}>|</span>
      </p>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');
        @keyframes blink { 0%,100%{opacity:0.7} 50%{opacity:0} }
      `}</style>
    </div>
  );
}

// STATE FLOW: intro → countdown → fireworks → done
export default function LandingPage() {
  const [stage, setStage] = useState('intro');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    if (stage !== 'intro') return;
    const t = setTimeout(() => setStage('countdown'), 4500);
    return () => clearTimeout(t);
  }, [stage]);

  const handleCountdownComplete = useCallback(() => setStage('fireworks'), []);
  const handleFireworksComplete = useCallback(() => setStage('done'), []);

  return (
    <main className="fixed inset-0 overflow-hidden bg-black">
      {stage === 'intro' && <NetflixIntro />}
      {stage === 'countdown' && <Countdown onComplete={handleCountdownComplete} />}
      {stage === 'fireworks' && (
        <>
          <Fireworks onComplete={handleFireworksComplete} />
          <CursiveText />
        </>
      )}
    </main>
  );
}
