import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { I18nManager } from 'react-native'

import { resources } from './resources'
export * from './hooks'
export * from './LanguageProvider'
export * from './utils'

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Будет обновлен через LanguageProvider
  fallbackLng: 'en',
  compatibilityJSON: 'v4',

  // allows integrating dynamic values into translations.
  interpolation: {
    escapeValue: false, // escape passed in values to avoid XSS injections
  },
})

// Is it a RTL language?
export const isRTL: boolean = i18n.dir() === 'rtl'

I18nManager.allowRTL(isRTL)
I18nManager.forceRTL(isRTL)

export default i18n
