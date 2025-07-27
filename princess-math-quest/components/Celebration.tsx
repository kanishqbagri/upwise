import React, { useEffect, useState } from 'react';

interface DustParticle {
  id: number;
  style: React.CSSProperties;
}

// Soft, magical, pastel colors for the fairy dust
const colors = ['#fbcfe8', '#fde68a', '#bfdbfe', '#a7f3d0', '#ddd6fe', '#fecaca'];

const Celebration: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [particles, setParticles] = useState<DustParticle[]>([]);

  useEffect(() => {
    const newParticles: DustParticle[] = Array.from({ length: 60 }).map((_, i) => {
      const size = Math.random() * 7 + 3; // 3px to 10px
      const animationDuration = Math.random() * 1.5 + 1; // 1s to 2.5s
      const animationDelay = Math.random() * 0.5;
      
      const startAngle = Math.random() * 360;
      const startRadius = Math.random() * 10 + 20; // 20-30px from center
      const startX = Math.cos(startAngle * Math.PI / 180) * startRadius;
      const startY = Math.sin(startAngle * Math.PI / 180) * startRadius;

      return {
        id: i,
        style: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          borderRadius: '50%',
          transform: `translate(-50%, -50%) translate(${startX}px, ${startY}px) scale(1)`,
          opacity: 1,
          transition: `transform ${animationDuration}s ease-out ${animationDelay}s, opacity ${animationDuration}s ease-in ${animationDelay}s`,
          boxShadow: `0 0 8px ${colors[Math.floor(Math.random() * colors.length)]}`,
        },
      };
    });
    setParticles(newParticles);

    // This timer triggers the animation to the final state
    const animationTimer = setTimeout(() => {
      setParticles(prevParticles =>
        prevParticles.map(p => {
          const endAngle = Math.random() * 360;
          const endRadius = Math.random() * 100 + 100; // 100-200px away
          const endX = Math.cos(endAngle * Math.PI / 180) * endRadius;
          const endY = Math.sin(endAngle * Math.PI / 180) * endRadius - (Math.random() * 40); // slightly upward drift
          
          return {
            ...p,
            style: {
              ...p.style,
              transform: `translate(-50%, -50%) translate(${endX}px, ${endY}px) scale(0)`,
              opacity: 0,
            }
          }
        })
      );
    }, 100);

    // This timer calls the onComplete callback after the effect is finished
    const completionTimer = setTimeout(onComplete, 2800);

    return () => {
        clearTimeout(animationTimer);
        clearTimeout(completionTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {particles.map(p => (
        <div key={p.id} style={p.style} />
      ))}
    </div>
  );
};

export default Celebration;
