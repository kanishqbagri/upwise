
import React, { useState } from 'react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { SpeakerIcon } from './Icons';

interface FlashcardProps {
  frontText: string;
  backText: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ frontText, backText }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { speak, isSpeaking } = useTextToSpeech();

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSpeak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    speak(text);
  };

  const cardFaceClasses = "absolute w-full h-full flex flex-col items-center justify-center rounded-2xl shadow-2xl backface-hidden p-4 text-center cursor-pointer";

  return (
    <div
      className="w-[300px] h-[400px] md:w-[400px] md:h-[250px] relative transition-transform duration-700 transform-style-preserve-3d"
      style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      onClick={handleCardFlip}
    >
      {/* Front of the card */}
      <div className={`${cardFaceClasses} bg-brand-yellow text-brand-dark-purple`}>
        <h2 className="text-6xl md:text-7xl font-extrabold">{frontText}</h2>
        <button
          onClick={(e) => handleSpeak(e, frontText)}
          disabled={isSpeaking}
          className="absolute bottom-4 right-4 p-3 bg-brand-purple rounded-full text-white hover:bg-brand-dark-purple transition-colors duration-300 disabled:bg-gray-400"
          aria-label={`Speak the word: ${frontText}`}
        >
          <SpeakerIcon />
        </button>
      </div>

      {/* Back of the card */}
      <div className={`${cardFaceClasses} bg-brand-purple text-brand-yellow rotate-y-180`}>
        <h2 className="text-6xl md:text-7xl font-extrabold">{backText}</h2>
        <button
          onClick={(e) => handleSpeak(e, backText)}
          disabled={isSpeaking}
          className="absolute bottom-4 right-4 p-3 bg-brand-yellow rounded-full text-brand-dark-purple hover:bg-opacity-80 transition-colors duration-300 disabled:bg-gray-400"
          aria-label={`Speak the word: ${backText}`}
        >
          <SpeakerIcon />
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
