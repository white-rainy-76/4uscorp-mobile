import i18n from 'i18next'

import type { resources } from './resources'
import type { RecursiveKeyOf } from './types'

type DefaultLocale = typeof resources.en.translation
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>

export const translate = (key: TxKeyPath, options = undefined) =>
  i18n.t(key, options) as unknown as string
