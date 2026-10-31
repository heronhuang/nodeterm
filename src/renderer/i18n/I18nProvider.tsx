import { useEffect, type ReactNode } from 'react'
import { normalizeUiLanguage, type UiLanguage } from '@shared/i18n/types'
import { htmlLangFor } from '@shared/i18n/types'
import { setUiLanguage } from './runtime'

/**
 * Keeps the module-level translator in sync with the persisted settings value. Re-renders are
 * driven by `useI18n`'s subscription to `setUiLanguage`, not by this provider's children prop.
 */
export function I18nProvider({
  uiLanguage,
  children
}: {
  uiLanguage: UiLanguage | undefined
  children: ReactNode
}): React.JSX.Element {
  useEffect(() => {
    const locale = normalizeUiLanguage(uiLanguage)
    setUiLanguage(locale)
    document.documentElement.lang = htmlLangFor(locale)
  }, [uiLanguage])
  return <>{children}</>
}
