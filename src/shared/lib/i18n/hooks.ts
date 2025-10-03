import i18n from 'i18next'
import { useEffect, useState } from 'react'
import { useLanguage } from './LanguageProvider'

/**
 * Хук для удобного доступа к текущему языку
 * @returns Объект с информацией о текущем языке
 */
export const useCurrentLanguage = () => {
  const { language, setLanguage, toggleLanguage } = useLanguage()

  return {
    language,
    setLanguage,
    toggleLanguage,
    isEnglish: language === 'en',
    isRussian: language === 'ru',
  }
}

/**
 * Хук для получения функции перевода
 * @returns Функция перевода t
 */
export const useTranslation = () => {
  const { language } = useLanguage()
  const [, forceUpdate] = useState({})

  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({})
    }

    i18n.on('languageChanged', handleLanguageChange)

    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [])

  const t = (key: string, options = undefined) => {
    return i18n.t(key, options) as unknown as string
  }

  return {
    t,
    i18n,
    currentLanguage: language,
  }
}
