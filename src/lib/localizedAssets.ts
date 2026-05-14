export type LocalizedAssetLanguage = 'de' | 'en' | 'es';

export function getLocalizedAssetLanguage(language?: string): LocalizedAssetLanguage {
  const baseLanguage = language?.split('-')[0];

  if (baseLanguage === 'de' || baseLanguage === 'en' || baseLanguage === 'es') {
    return baseLanguage;
  }

  return 'es';
}

export function getLocalizedSvgSrc(folder: string, file: string, language: LocalizedAssetLanguage) {
  const suffix = language === 'de' ? '' : `-${language}`;
  return `/imagenes/${folder}/${file}${suffix}.svg`;
}
