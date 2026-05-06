'use client';

const HEARTS = [
  { left: '10%', delay: '0s',  duration: '6s',  size: '1rem',  opacity: 0.15 },
  { left: '25%', delay: '2s',  duration: '8s',  size: '0.7rem',opacity: 0.1  },
  { left: '40%', delay: '1s',  duration: '7s',  size: '1.2rem',opacity: 0.12 },
  { left: '55%', delay: '3s',  duration: '9s',  size: '0.8rem',opacity: 0.1  },
  { left: '70%', delay: '0.5s',duration: '6.5s',size: '1rem',  opacity: 0.13 },
  { left: '85%', delay: '2.5s',duration: '8s',  size: '0.6rem',opacity: 0.1  },
  { left: '18%', delay: '4s',  duration: '7.5s',size: '0.9rem',opacity: 0.11 },
  { left: '62%', delay: '1.5s',duration: '6s',  size: '1.1rem',opacity: 0.12 },
];

export default function FloatingHearts() {
  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1);   opacity: var(--op); }
          50%  { transform: translateY(-45vh) scale(1.15); opacity: var(--op); }
          100% { transform: translateY(-90vh) scale(0.8); opacity: 0; }
        }
      `}</style>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 5 }}>
        {HEARTS.map((h, i) => (
          <div key={i} style={{
            position: 'absolute',
            bottom: '-2rem',
            left: h.left,
            fontSize: h.size,
            '--op': h.opacity,
            opacity: h.opacity,
            animation: `floatUp ${h.duration} ${h.delay} ease-in infinite`,
            color: '#FFE5E5',
          }}>♡</div>
        ))}
      </div>
    </>
  );
}
