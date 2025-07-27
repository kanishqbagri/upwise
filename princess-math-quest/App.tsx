
import React, { useState, useEffect, useCallback } from 'react';
import ScoreBoard from './components/ScoreBoard.tsx';
import QuestionCard from './components/QuestionCard.tsx';
import PrincessAvatar from './components/PrincessAvatar.tsx';
import { generateQuestion } from './utils/math.ts';
import { getPrincessMessage } from './services/geminiService.ts';
import { Question, GameState } from './types.ts';
import { StarIcon } from './components/icons.tsx';

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [gameState, setGameState] = useState<GameState>('start');
  const [princessMessage, setPrincessMessage] = useState('');
  const [isMessageLoading, setIsMessageLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const fetchMessage = useCallback(async (type: 'welcome' | 'correct' | 'incorrect' | 'next') => {
    setIsMessageLoading(true);
    const msg = await getPrincessMessage(type);
    setPrincessMessage(msg);
    setIsMessageLoading(false);
  }, []);
  
  const nextQuestion = useCallback(() => {
    if (questionNumber >= TOTAL_QUESTIONS) {
        setGameState('start'); // Effectively game over, show final screen
        setPrincessMessage(`Wow! You finished the quest with ${score} stars! Great job! 🌟`);
        setIsMessageLoading(false);
        return;
    }
    setShowCelebration(false);
    setSelectedAnswer(null);
    setCurrentQuestion(generateQuestion());
    setQuestionNumber(prev => prev + 1);
    setGameState('playing');
    fetchMessage('next');
  }, [questionNumber, score, fetchMessage]);


  useEffect(() => {
    if (gameState === 'start' && questionNumber === 0) {
      fetchMessage('welcome');
    }
  }, [gameState, questionNumber, fetchMessage]);

  const handleAnswerSelect = (answer: number) => {
    if (gameState !== 'playing') return;

    setGameState('answered');
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion?.correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setShowCelebration(true);
      fetchMessage('correct');
    } else {
      fetchMessage('incorrect');
    }
  };

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
  };

  const startGame = () => {
      setScore(0);
      setQuestionNumber(0);
      setIsMessageLoading(true);
      // We call nextQuestion which will set up the first question
      nextQuestion();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4 space-y-6 md:space-y-8 overflow-hidden">
      
      {gameState !== 'start' && currentQuestion && (
        <>
          <ScoreBoard score={score} questionNumber={questionNumber} totalQuestions={TOTAL_QUESTIONS} />
          <PrincessAvatar
            message={princessMessage}
            isLoading={isMessageLoading}
            showCelebration={showCelebration}
            onCelebrationComplete={handleCelebrationComplete}
          />
          <QuestionCard
            question={currentQuestion}
            onAnswerSelect={handleAnswerSelect}
            isAnswered={gameState === 'answered'}
            selectedAnswer={selectedAnswer}
          />
           {gameState === 'answered' && (
            <div className="text-center">
                <button
                    onClick={nextQuestion}
                    className="bg-purple-500 text-white font-display text-2xl px-10 py-3 rounded-full shadow-lg hover:bg-purple-600 transform hover:-translate-y-1 transition-all duration-300 animate-pulse"
                    aria-label="Next Question"
                >
                    Next
                </button>
            </div>
          )}
        </>
      )}

      {gameState === 'start' && (
        <div className="text-center flex flex-col items-center p-8 bg-white/80 rounded-3xl shadow-2xl max-w-lg mx-auto space-y-4">
            <h1 className="font-display text-5xl text-pink-500 mb-2">Princess Math Quest</h1>
            <PrincessAvatar
              message={princessMessage}
              isLoading={isMessageLoading}
              showCelebration={false}
              onCelebrationComplete={() => {}}
            />
            {questionNumber === TOTAL_QUESTIONS && (
                <div className="my-4">
                    <p className="text-2xl text-purple-600 font-bold">Final Score</p>
                    <div className="flex items-center justify-center gap-3 mt-2">
                        <StarIcon className="w-12 h-12 text-yellow-400" />
                        <span className="font-display text-6xl text-pink-500">{score}</span>
                    </div>
                </div>
            )}
            <button 
                onClick={startGame}
                className="mt-6 bg-pink-500 text-white font-display text-3xl px-12 py-4 rounded-full shadow-lg hover:bg-pink-600 transform hover:-translate-y-1 transition-all duration-300"
            >
                {questionNumber === TOTAL_QUESTIONS ? 'Play Again?' : 'Start Quest'}
            </button>
        </div>
      )}
    </div>
  );
};

export default App;