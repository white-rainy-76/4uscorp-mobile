import { getItem, setItem } from '@/shared/lib/storage'
import i18n from 'i18next'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { I18nManager } from 'react-native'
import { Language } from './resources'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

const LANGUAGE_STORAGE_KEY = '@app_language'

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>('en')

  // Загружаем сохраненный язык при инициализации
  useEffect(() => {
    loadLanguageFromStorage()
  }, [])

  const loadLanguageFromStorage = async () => {
    try {
      const savedLanguage = getItem<string>(LANGUAGE_STORAGE_KEY)
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
        // Сначала обновляем i18n
        await i18n.changeLanguage(savedLanguage)
        const isRTL = i18n.dir(savedLanguage) === 'rtl'
        I18nManager.forceRTL(isRTL)

        // Проверяем что i18n действительно изменил язык
        const currentI18nLanguage = i18n.language
        if (currentI18nLanguage === savedLanguage) {
          // Затем обновляем состояние
          setLanguageState(savedLanguage as Language)
        } else {
          console.warn(
            `Language load failed: expected ${savedLanguage}, got ${currentI18nLanguage}`,
          )
        }
      }
    } catch (error) {
      console.error('Error loading language from storage:', error)
    }
  }

  const setLanguage = async (lang: Language) => {
    try {
      // Сначала обновляем i18n
      await i18n.changeLanguage(lang)
      const isRTL = i18n.dir(lang) === 'rtl'
      I18nManager.forceRTL(isRTL)

      // Проверяем что i18n действительно изменил язык
      const currentI18nLanguage = i18n.language
      if (currentI18nLanguage === lang) {
        // Затем обновляем состояние и сохраняем
        setLanguageState(lang)
        await setItem(LANGUAGE_STORAGE_KEY, lang)
      } else {
        console.warn(
          `Language change failed: expected ${lang}, got ${currentI18nLanguage}`,
        )
      }
    } catch (error) {
      console.error('Error saving language to storage:', error)
    }
  }

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ru' : 'en'
    setLanguage(newLanguage)
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
