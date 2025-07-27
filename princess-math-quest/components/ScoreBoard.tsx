import React from 'react';
import { StarIcon } from './icons.tsx';

interface ScoreBoardProps {
  score: number;
  questionNumber: number;
  totalQuestions: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, questionNumber, totalQuestions }) => {
  return (
    <div className="flex justify-between items-center bg-white/70 backdrop-blur-sm p-4 rounded-full shadow-md w-full max-w-md mx-auto border-2 border-pink-100">
      <div className="flex items-center gap-2">
        <StarIcon className="w-8 h-8 text-yellow-400" />
        <span className="font-display text-2xl text-pink-500">{score}</span>
      </div>
      <div className="font-display text-xl text-purple-500">
        Question {questionNumber} / {totalQuestions}
      </div>
    </div>
  );
};

export default ScoreBoard;