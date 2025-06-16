'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const translations = { fr, en };

type TranslationContextType = {
  t: typeof fr;
  language: string;
  setLanguage: (lang: string) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('fr');
  const t = translations[language as keyof typeof translations];

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
} 