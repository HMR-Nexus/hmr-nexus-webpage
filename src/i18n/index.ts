import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import de from './locales/de.json';
import en from './locales/en.json';

const updateDocumentLanguage = (lng?: string) => {
  if (typeof document === 'undefined') return;
  const base = lng?.split('-')[0];
  document.documentElement.lang = (base === 'en' || base === 'de') ? base : 'de';
};

// Clean up any stale 'es' value left in localStorage from the old config
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('i18nextLng');
  if (stored && !['de', 'en'].includes(stored.split('-')[0])) {
    localStorage.removeItem('i18nextLng');
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: de },
      en: { translation: en },
    },
    supportedLngs: ['de', 'en'],
    fallbackLng: 'de',
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,
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
