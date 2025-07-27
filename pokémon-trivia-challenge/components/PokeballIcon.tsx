
import React from 'react';

const PokeballIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className}
    viewBox="0 0 200 200" 
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <g stroke="currentColor" strokeWidth="12">
      <path 
        d="M100,12 a88,88 0 0 1 0,176 a88,88 0 0 1 0,-176" 
        fill="#f04444" 
      />
      <path 
        d="M100,188 a88,88 0 0 0 0,-176" 
        fill="#f6f6f6"
      />
    </g>
    <g stroke="currentColor" strokeWidth="12" fill="none">
       <circle cx="100" cy="100" r="88" />
       <circle cx="100" cy="100" r="30" fill="#f6f6f6" />
       <circle cx="100" cy="100" r="30" />
    </g>
  </svg>
);

export default PokeballIcon;
