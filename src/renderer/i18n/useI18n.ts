import { useSyncExternalStore } from 'react'
import type { TranslateFn, UiLanguage } from '@shared/i18n/types'
import { getUiLanguage, subscribeUiLanguage, t } from './runtime'

export function useI18n(): { locale: UiLanguage; t: TranslateFn } {
  const locale = useSyncExternalStore(subscribeUiLanguage, getUiLanguage, getUiLanguage)
  return { locale, t }
}
