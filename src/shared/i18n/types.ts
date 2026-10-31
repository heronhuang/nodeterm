/** UI language — Chinese default for this fork; English is the alternate locale. */
export type UiLanguage = 'zh' | 'en'

export const DEFAULT_UI_LANGUAGE: UiLanguage = 'zh'

export const UI_LANGUAGES: readonly UiLanguage[] = ['zh', 'en'] as const

export function normalizeUiLanguage(raw: unknown): UiLanguage {
  return raw === 'en' ? 'en' : DEFAULT_UI_LANGUAGE
}

export type TranslateParams = Record<string, string | number | undefined>

export type TranslateFn = (key: string, params?: TranslateParams) => string

export function htmlLangFor(locale: UiLanguage): string {
  return locale === 'zh' ? 'zh-CN' : 'en'
}
