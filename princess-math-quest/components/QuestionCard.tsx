import React from 'react';
import { Question } from '../types.ts';

interface QuestionCardProps {
  question: Question;
  onAnswerSelect: (answer: number) => void;
  isAnswered: boolean;
  selectedAnswer: number | null;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswerSelect, isAnswered, selectedAnswer }) => {
  
  const getButtonClass = (choice: number) => {
    let baseClass = 'font-display text-5xl py-6 rounded-2xl shadow-lg transform transition-transform duration-200 w-full disabled:opacity-50 disabled:cursor-not-allowed';

    if (!isAnswered) {
      return `${baseClass} bg-white text-purple-600 hover:bg-purple-100 hover:-translate-y-1`;
    }

    const isCorrect = choice === question.correctAnswer;
    const isSelected = choice === selectedAnswer;

    if (isCorrect) {
      return `${baseClass} bg-green-400 text-white animate-pulse`;
    }
    if (isSelected && !isCorrect) {
      return `${baseClass} bg-red-400 text-white`;
    }
    return `${baseClass} bg-gray-200 text-gray-500`;
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl w-full max-w-2xl mx-auto border-4 border-white">
      <div className="text-center mb-8">
        <p className="text-purple-500 text-2xl md:text-3xl font-display">What is...</p>
        <p className="text-7xl md:text-9xl font-display text-pink-500 tracking-wider my-4">
          {question.num1} {question.operator} {question.num2}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {question.choices.map((choice) => (
          <button
            key={choice}
            onClick={() => onAnswerSelect(choice)}
            disabled={isAnswered}
            className={getButtonClass(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;