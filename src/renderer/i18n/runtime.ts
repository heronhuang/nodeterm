import { createTranslator } from '@shared/i18n/translate'
import {
  DEFAULT_UI_LANGUAGE,
  normalizeUiLanguage,
  type TranslateFn,
  type UiLanguage
} from '@shared/i18n/types'

// Product default is zh; Vitest asserts English copy unless a test opts into zh.
let locale: UiLanguage =
  typeof process !== 'undefined' && process.env.VITEST === 'true'
    ? 'en'
    : DEFAULT_UI_LANGUAGE
let translator: TranslateFn = createTranslator(locale)

const listeners = new Set<() => void>()

export function getUiLanguage(): UiLanguage {
  return locale
}

export function setUiLanguage(next: UiLanguage): void {
  const lang = normalizeUiLanguage(next)
  if (lang === locale) return
  locale = lang
  translator = createTranslator(locale)
  for (const fn of listeners) fn()
}

export function subscribeUiLanguage(fn: () => void): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function t(key: string, params?: Record<string, string | number | undefined>): string {
  return translator(key, params)
}
