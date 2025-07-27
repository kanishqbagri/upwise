import React from 'react';

const GymBadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
  >
    <path 
      d="M12 2L2 8.5V15.5L12 22L22 15.5V8.5L12 2Z" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      fill="currentColor"
      fillOpacity="0.2"
    />
    <path 
      d="M12 2L2 8.5V15.5L12 22L22 15.5V8.5L12 2Z" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <circle 
      cx="12" 
      cy="12" 
      r="3" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

export default GymBadgeIcon;
