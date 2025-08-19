/**
 * @fileoverview Internationalization system with React Context and hooks
 * @description Provides bilingual support (French/English) throughout the application
 * using React Context API. Manages language state and provides translation data.
 */

'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

/**
 * Available translations object containing all language data
 */
const translations = { fr, en };

/**
 * Translation context type definition
 * @interface TranslationContextType
 */
type TranslationContextType = {
  /** Translation data for the current language */
  t: typeof fr;
  /** Current language code ('fr' or 'en') */
  language: string;
  /** Function to change the current language */
  setLanguage: (lang: string) => void;
};

/**
 * React Context for managing translation state across the application
 */
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

/**
 * Translation provider component that wraps the entire application
 * 
 * @component
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to wrap with translation context
 * @returns {JSX.Element} Provider component with translation context
 * 
 * @description Provides translation context to all child components. Manages the current
 * language state and provides access to translation data. Should wrap the entire application
 * to ensure all components have access to internationalization features.
 * 
 * @example
 * ```tsx
 * // In layout.tsx or _app.tsx
 * <TranslationProvider>
 *   <App />
 * </TranslationProvider>
 * ```
 * 
 * @features
 * - Manages current language state (defaults to French)
 * - Provides translation data for the active language
 * - Allows language switching throughout the application
 * - Type-safe access to translation keys
 */
export function TranslationProvider({ children }: { children: ReactNode }) {
  // Default language is French
  const [language, setLanguage] = useState('fr');
  
  // Get translation data for current language
  const t = translations[language as keyof typeof translations];

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

/**
 * Custom hook for accessing translation context and functionality
 * 
 * @hook
 * @returns {TranslationContextType} Translation context object
 * 
 * @description Provides access to translation data and language management functions.
 * Must be used within a TranslationProvider component tree.
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { t, language, setLanguage } = useTranslation();
 *   
 *   return (
 *     <div>
 *       <h1>{t.home.hero.title}</h1>
 *       <button onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}>
 *         Switch to {language === 'fr' ? 'English' : 'French'}
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @throws {Error} When used outside of TranslationProvider
 * 
 * @returns
 * - `t`: Translation object with all text content for current language
 * - `language`: Current language code ('fr' | 'en')
 * - `setLanguage`: Function to change language (accepts 'fr' | 'en')
 * 
 * @dependencies
 * - Translation JSON files: `@/locales/fr.json` and `@/locales/en.json`
 * - React Context API for state management
 */
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
} 