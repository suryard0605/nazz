'use client';
import { useEffect, useRef } from 'react';

export default function Countdown({ onComplete }) {
  const lottieRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(onComplete, 2500);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.10/dist/dotlottie-wc.js';
    script.type = 'module';
    script.onload = () => {
      if (!lottieRef.current || lottieRef.current.firstChild) return;
      const el = document.createElement('dotlottie-wc');
      el.setAttribute('src', 'https://lottie.host/4d789a11-c418-4e72-b5d5-9c87314e4625/dxsEgpnpc9.lottie');
      el.setAttribute('autoplay', '');
      el.style.width = '450px';
      el.style.height = '450px';
      lottieRef.current.appendChild(el);
    };
    document.head.appendChild(script);

    return () => {
      clearTimeout(t);
      try { document.head.removeChild(script); } catch(e) {}
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 40 }}>
      <div ref={lottieRef} />
    </div>
  );
}
