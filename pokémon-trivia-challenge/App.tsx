import React, { useState, useCallback } from 'react';
import { GameState, TriviaQuestion } from './types';
import { TOTAL_QUESTIONS } from './constants';
import { questionBank } from './data/questions';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';

// Helper to shuffle the array
const shuffleArray = (array: TriviaQuestion[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [gameQuestions, setGameQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const startGame = useCallback(() => {
    setScore(0);
    setCurrentQuestionIndex(0);
    const shuffledQuestions = shuffleArray([...questionBank]);
    setGameQuestions(shuffledQuestions.slice(0, TOTAL_QUESTIONS));
    setGameState(GameState.Playing);
  }, []);

  const handleNextQuestion = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState(GameState.Finished);
    }
  }, [currentQuestionIndex]);

  const restartGame = useCallback(() => {
    setGameState(GameState.Start);
    setGameQuestions([]);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Start:
        return <StartScreen onStart={startGame} />;
      case GameState.Playing:
        const currentQuestion = gameQuestions[currentQuestionIndex];
        return currentQuestion ? (
          <QuizScreen
            question={currentQuestion}
            onNext={handleNextQuestion}
            questionNumber={currentQuestionIndex + 1}
            score={score}
          />
        ) : null; // Should not happen in normal flow
      case GameState.Finished:
        return <ResultsScreen score={score} onRestart={restartGame} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-slate-800 flex items-center justify-center p-4 font-roboto text-light">
      <main className="w-full max-w-2xl bg-slate-700/60 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-500">
        <h1 className="text-4xl md:text-5xl font-black text-center text-light mb-6">
          Poké<span className="text-accent">Quiz</span> League
        </h1>
        {renderContent()}
      </main>
    </div>
  );
}