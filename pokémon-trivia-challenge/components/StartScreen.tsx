
import React from 'react';
import GymBadgeIcon from './GymBadgeIcon';
import { TOTAL_QUESTIONS } from '../constants';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center p-8">
      <GymBadgeIcon className="w-32 h-32 text-accent animate-pulse-slow" />
      <h2 className="text-3xl font-bold text-light my-4">The Gym Challenge Awaits!</h2>
      <p className="text-text-light mb-8 max-w-md mx-auto text-lg">
        Prove your skills across {TOTAL_QUESTIONS} demanding questions. Only the best trainers will triumph. Are you ready?
      </p>
      <button
        onClick={onStart}
        className="px-10 py-4 bg-accent text-text-dark font-bold text-xl rounded-full shadow-lg transform hover:scale-105 hover:bg-accent-hover transition-all duration-300 ease-in-out"
      >
        Accept Challenge
      </button>
    </div>
  );
};

export default StartScreen;
