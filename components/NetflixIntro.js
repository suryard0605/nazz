'use client';

export default function NetflixIntro() {
  const furs = Array.from({ length: 31 }, (_, i) => i + 1);
  const lamps = Array.from({ length: 28 }, (_, i) => i + 1);

  return (
    <div className="netflix-container">
      <div className="netflixintro">
        <div className="helper-1">
          <div className="effect-brush">
            {[...furs].reverse().map(n => <span key={n} className={`fur-${n}`} />)}
          </div>
          <div className="effect-lumieres">
            {lamps.map(n => <span key={n} className={`lamp-${n}`} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
