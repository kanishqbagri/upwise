import React from 'react';
import { TOTAL_QUESTIONS } from '../constants';
import TrophyIcon from './TrophyIcon';

interface ResultsScreenProps {
  score: number;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, onRestart }) => {
  const isPerfectScore = score === TOTAL_QUESTIONS;

  const getResultMessage = () => {
    const percentage = (score / TOTAL_QUESTIONS) * 100;
    if (percentage === 100) return "Incredible! You are the new Pokémon Champion!";
    if (percentage >= 80) return "Victory! You've earned a place in the Hall of Fame!";
    if (percentage >= 50) return "A hard-fought win! You've earned this Gym Badge!";
    if (percentage >= 20) return "A valiant effort! Return when you've trained more.";
    return "You were defeated. Heal your Pokémon and try again.";
  };

  return (
    <div className="text-center flex flex-col items-center justify-center p-8 animate-fade-in-up">
      {isPerfectScore ? (
        <>
          <TrophyIcon className="w-40 h-40 text-accent mx-auto mb-4 animate-trophy-pop-in animate-trophy-glow" />
          <h2 className="text-3xl md:text-4xl font-black text-light mb-4">
            Pokémon Champion!
          </h2>
        </>
      ) : (
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Challenge Complete!
        </h2>
      )}
      
      <p className="text-xl text-text-light mb-2">Your final score is:</p>
      <p className="text-7xl font-black text-accent my-4">
        {score} <span className="text-5xl text-muted">/ {TOTAL_QUESTIONS}</span>
      </p>
      <p className="text-2xl italic text-light font-semibold mb-8">{getResultMessage()}</p>
      <button
        onClick={onRestart}
        className="px-10 py-4 bg-primary text-white font-bold text-xl rounded-full shadow-lg transform hover:scale-105 hover:bg-primary-hover transition-all duration-300 ease-in-out"
      >
        Challenge Again
      </button>
    </div>
  );
};

export default ResultsScreen;