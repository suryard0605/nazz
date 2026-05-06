'use client';
import { useState, useEffect } from 'react';

const FULL_TEXT = 'Happy 4th Anniversary ❤️';

export default function Typewriter({ onComplete }) {
  const [displayed, setDisplayed] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 90);
    return () => clearInterval(interval);
  }, [onComplete]);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-20">
      <p
        className="text-3xl sm:text-5xl font-semibold text-center px-6"
        style={{ color: '#f8a5c2', textShadow: '0 0 20px rgba(248,165,194,0.5)' }}
      >
        {displayed}
        <span
          className="inline-block w-0.5 h-8 sm:h-12 ml-1 align-middle"
          style={{
            background: '#f8a5c2',
            opacity: cursorVisible ? 1 : 0,
            transition: 'opacity 0.1s',
          }}
        />
      </p>
    </div>
  );
}
