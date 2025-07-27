import React from 'react';

const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible' }}
  >
    {/* Sparkles are now outside the main floating group to feel more detached */}
    <path
      className="animate-sparkle-twinkle"
      style={{ animationDelay: '0s' }}
      d="M22.5 9.5a.8.8 0 0 1-.8-2.3l-2.3-.8 2.3-.8.8-2.3.8 2.3 2.3.8-2.3.8.8 2.3z" transform="scale(0.5) translate(25, -5)"
    />
    <path
      className="animate-sparkle-twinkle"
      style={{ animationDelay: '0.6s' }}
      d="M9.5 5.5a.8.8 0 0 1-.8-2.3l-2.3-.8 2.3-.8.8-2.3.8 2.3 2.3.8-2.3.8.8 2.3z" transform="scale(0.4) translate(-15, 2)"
    />
    
    {/* Main Trophy group that will float */}
    <g className="animate-trophy-float">
      {/* Main Trophy and Base */}
      <path 
        d="M17.5 2H6.5C4.01 2 2 4.01 2 6.5v4.24c.73-.55 1.58-.89 2.5-.96V6.5C4.5 5.12 5.38 4 6.5 4h11c1.12 0 2 1.12 2 2.5v3.28c.92.07 1.77.41 2.5.96V6.5C22 4.01 19.99 2 17.5 2z" 
      />
      <path 
        d="M11 18.5h2V20h-2zm-6 3.5h14v-1.5H5z" 
      />

      {/* Pokéball Section */}
      <path 
        fillRule="evenodd" 
        clipRule="evenodd"
        d="M19.46 11.5H4.54C4.16 12.12 4 12.8 4 13.5v1c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4v-1c0-.7-.16-1.38-.54-2zM12 16a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-6-2.5h12v-1H6v1zM12 15a.5.5 0 100-1 .5.5 0 000 1z"
      />
    </g>
  </svg>
);

export default TrophyIcon;