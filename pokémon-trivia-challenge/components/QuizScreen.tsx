import React, { useState, useEffect } from 'react';
import { TriviaQuestion } from '../types';
import { TOTAL_QUESTIONS } from '../constants';
import Confetti from './Confetti';

interface QuizScreenProps {
  question: TriviaQuestion;
  onNext: (isCorrect: boolean) => void;
  questionNumber: number;
  score: number;
}

// Helper to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};


const Scoreboard: React.FC<{ questionNumber: number; score: number }> = ({ questionNumber, score }) => (
  <div className="flex justify-between items-center bg-dark/80 text-text-light p-3 rounded-lg mb-6 font-roboto text-base font-semibold border border-slate-600">
    <div>
      Challenge: <span className="font-bold text-accent">{questionNumber}</span> / {TOTAL_QUESTIONS}
    </div>
    <div>
      Score: <span className="font-bold text-accent">{score}</span>
    </div>
  </div>
);

const QuizScreen: React.FC<QuizScreenProps> = ({ question, onNext, questionNumber, score }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowConfetti(false);
    // Shuffle options when a new question is loaded
    if (question?.options) {
      setShuffledOptions(shuffleArray(question.options));
    }
  }, [question]);

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer) return; // Prevent changing answer

    const correct = option === question.correctAnswer;
    setSelectedAnswer(option);
    setIsCorrect(correct);
    if (correct) {
      setShowConfetti(true);
    }
  };

  const getButtonClass = (option: string) => {
    if (selectedAnswer === null) {
      return 'bg-primary hover:bg-primary-hover';
    }
    if (option === question.correctAnswer) {
      return 'bg-success scale-105 ring-4 ring-accent'; // Correct answer is always green with a gold ring
    }
    if (option === selectedAnswer && !isCorrect) {
      return 'bg-danger'; // Selected incorrect answer is red
    }
    return 'bg-muted/50'; // Other options
  };

  return (
    <div className="relative animate-fade-in-up">
      {showConfetti && <Confetti />}
      
      <Scoreboard questionNumber={questionNumber} score={score} />
      
      <div className="bg-slate-800/80 p-6 rounded-lg shadow-inner mb-6 border border-slate-600">
        <p className="text-xl md:text-2xl text-center text-light font-semibold">
          {question.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {shuffledOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswerClick(option)}
            disabled={selectedAnswer !== null}
            className={`w-full p-4 rounded-lg text-white font-bold text-lg transition-all duration-300 transform focus:outline-none ${getButtonClass(option)} ${selectedAnswer === null ? 'hover:scale-105' : 'cursor-not-allowed'}`}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <div className="text-center mt-4 p-4 rounded-lg animate-fade-in-up">
          {isCorrect ? (
            <p className="text-3xl font-bold text-success">Victory!</p>
          ) : (
            <p className="text-3xl font-bold text-danger">Defeated!</p>
          )}
          <button
            onClick={() => onNext(isCorrect ?? false)}
            className="mt-4 px-8 py-3 bg-accent text-text-dark font-bold text-xl rounded-full shadow-lg hover:bg-accent-hover transition-colors transform hover:scale-105"
          >
            {questionNumber === TOTAL_QUESTIONS ? 'See Results' : 'Next Challenger'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;