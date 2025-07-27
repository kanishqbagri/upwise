import React from 'react';

const CONFETTI_COUNT = 150;
const COLORS = ['#FFD700', '#16A34A', '#0A3D62', '#F1F5F9', '#DC2626'];

const ConfettiParticle = ({ style }) => (
  <div
    className="absolute rounded-full animate-confetti-fall"
    style={style}
  ></div>
);

const Confetti = () => {
  const particles = React.useMemo(() => {
    return Array.from({ length: CONFETTI_COUNT }).map((_, index) => {
      const size = Math.random() * 0.5 + 0.25; // 0.25rem to 0.75rem
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * -100}%`, // Start well above the container
        width: `${size}rem`,
        height: `${size}rem`,
        backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        animationDuration: `${Math.random() * 1 + 1.5}s`, // Faster: 1.5s to 2.5s
        animationDelay: `${Math.random() * 0.2}s`, // Appear faster
      };
      return <ConfettiParticle key={index} style={style} />;
    });
  }, []);

  return <div className="absolute inset-0 w-full h-full pointer-events-none z-50 overflow-hidden">{particles}</div>;
};

export default React.memo(Confetti);