import { getLocales } from 'expo-localization';
import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

import bgButtons from './locales/bg/buttons.json';
import bgCommon from './locales/bg/common.json';
import enButtons from './locales/en/buttons.json';
import enCommon from './locales/en/common.json';

const languageCode = getLocales()[0]?.languageCode ?? 'en';

const config: InitOptions = {
  fallbackLng: 'en',
  lng: languageCode,
  ns: ['common', 'buttons'],
  defaultNS: 'common',
  resources: {
    bg: { common: bgCommon, buttons: bgButtons },
    en: { common: enCommon, buttons: enButtons },
  },
  interpolation: { escapeValue: false },
  react: {
    useSuspense: false
  }
};

i18n
  .use(initReactI18next)
  .init(config) 
;

export default i18n;
