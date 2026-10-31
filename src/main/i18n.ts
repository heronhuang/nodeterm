import { createTranslator } from '@shared/i18n/translate'
import { normalizeUiLanguage, type TranslateFn } from '@shared/i18n/types'
import type { Settings } from '@shared/types'

/** Main-process translator; follows persisted `settings.uiLanguage`. */
export function mainT(settings: Settings): TranslateFn {
  return createTranslator(normalizeUiLanguage(settings.uiLanguage))
}
