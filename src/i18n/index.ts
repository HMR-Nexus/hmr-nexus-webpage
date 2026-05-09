import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import de from './locales/de.json';
import en from './locales/en.json';
import es from './locales/es.json';

const supportedLanguages = new Set(['de', 'en', 'es']);

const getDocumentLanguage = (lng?: string) => {
  const baseLanguage = lng?.split('-')[0];
  return baseLanguage && supportedLanguages.has(baseLanguage) ? baseLanguage : 'es';
};

const updateDocumentLanguage = (lng?: string) => {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = getDocumentLanguage(lng);
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: de },
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: 'es',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })
  .then(() => updateDocumentLanguage(i18n.resolvedLanguage || i18n.language));

i18n.on('languageChanged', (lng) => updateDocumentLanguage(lng));

export default i18n;
