import React, { createContext, useContext } from 'react';

interface LanguageContextType {
  // Add language-specific context if needed
}

const LanguageContext = createContext<LanguageContextType>({});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LanguageContext.Provider value={{}}>
      {children}
    </LanguageContext.Provider>
  );
};