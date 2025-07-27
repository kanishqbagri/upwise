
import React, { useState, useCallback } from 'react';
import { OPPOSITES } from './constants';
import Flashcard from './components/Flashcard';
import { ArrowLeftIcon, ArrowRightIcon } from './components/Icons';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % OPPOSITES.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + OPPOSITES.length) % OPPOSITES.length);
  }, []);

  const currentPair = OPPOSITES[currentIndex];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 font-sans text-brand-dark-purple overflow-hidden">
      <header className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-brand-dark-purple drop-shadow-lg">
          Learn Your Opposites!
        </h1>
        <p className="text-lg md:text-xl text-brand-purple mt-2">Click the card to flip it!</p>
      </header>

      <div className="w-full max-w-2xl flex items-center justify-center" style={{ perspective: '1000px' }}>
        <Flashcard 
          key={currentIndex}
          frontText={currentPair.front} 
          backText={currentPair.back} 
        />
      </div>

      <div className="flex items-center justify-between w-full max-w-md mt-8">
        <button
          onClick={goToPrevious}
          className="flex items-center gap-2 bg-brand-purple text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <ArrowLeftIcon />
          <span>Prev</span>
        </button>
        <div className="text-lg font-semibold text-brand-dark-purple">
          {currentIndex + 1} / {OPPOSITES.length}
        </div>
        <button
          onClick={goToNext}
          className="flex items-center gap-2 bg-brand-purple text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default App;
