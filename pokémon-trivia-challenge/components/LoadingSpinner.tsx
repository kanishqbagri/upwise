import React from 'react';
import GymBadgeIcon from './GymBadgeIcon';

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <GymBadgeIcon className="w-24 h-24 text-accent animate-pulse-slow" />
      <p className="mt-4 text-xl font-bold text-light">{message}</p>
    </div>
  );
};

export default LoadingSpinner;