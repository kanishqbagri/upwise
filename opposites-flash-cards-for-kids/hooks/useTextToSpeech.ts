import { useState, useCallback, useEffect } from 'react';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // This effect runs once on mount to set up voice loading and cleanup.
  useEffect(() => {
    const handleVoicesChanged = () => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;
      const availableVoices = window.speechSynthesis.getVoices();
      // Filter for English voices to avoid populating with unnecessary options
      const englishVoices = availableVoices.filter(voice => voice.lang.startsWith('en'));
      setVoices(englishVoices);
    };

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Add listener for when voices become available
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      
      // Manually trigger to get voices that might already be loaded
      handleVoicesChanged(); 
    }

    // Cleanup function to run on component unmount
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
        window.speechSynthesis.cancel(); // Stop any speech on unmount
      }
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.error('Text-to-speech is not supported in this browser.');
      return;
    }

    // Cancel existing speech before starting a new one
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error('An error occurred during speech synthesis:', event);
      setIsSpeaking(false);
    };
    
    // Slow down the speech rate for better clarity for kids
    utterance.rate = 0.8; 
    
    // Use a slightly higher pitch for a friendlier, more child-like tone
    utterance.pitch = 1.2;

    // --- Voice Selection Logic ---
    // We try to find the most suitable voice available in the browser.
    let selectedVoice: SpeechSynthesisVoice | null = null;
    if (voices.length > 0) {
      // 1. Look for a voice with "child" in its name.
      const childVoice = voices.find(v => v.name.toLowerCase().includes('child'));
      // 2. Look for known high-quality, clear voices.
      const highQualityVoice = voices.find(v => ['Google US English', 'Samantha', 'Microsoft Zira Desktop - English (United States)'].includes(v.name));
      // 3. Look for any US English female voice.
      const femaleVoice = voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('female'));
      // 4. Fallback to the first available English voice.
      const defaultEnglishVoice = voices[0];
      
      selectedVoice = childVoice || highQualityVoice || femaleVoice || defaultEnglishVoice;
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, [voices]); // Dependency on `voices` ensures we use the loaded list.

  return { speak, isSpeaking };
};
