import React, { createContext, useContext, useState, useEffect } from 'react';

interface VoiceContextType {
  isEnabled: boolean;
  toggle: () => void;
  speak: (text: string) => void;
}

const VoiceContext = createContext<VoiceContextType>({
  isEnabled: false,
  toggle: () => {},
  speak: () => {}
});

export const useVoice = () => useContext(VoiceContext);

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const speak = (text: string) => {
    if (isEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const toggle = () => {
    setIsEnabled(prev => !prev);
  };

  useEffect(() => {
    const saved = localStorage.getItem('voiceEnabled');
    if (saved) {
      setIsEnabled(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('voiceEnabled', JSON.stringify(isEnabled));
  }, [isEnabled]);

  return (
    <VoiceContext.Provider value={{ isEnabled, toggle, speak }}>
      {children}
    </VoiceContext.Provider>
  );
};