import type { TranslateFn } from '@shared/i18n/types'
import { thisMachine } from './machineName'

/** Locale-aware “本机” / “this PC” for settings copy. */
export function localizedThisMachine(t: TranslateFn): string {
  const hit = t('common.thisMachine')
  return hit !== 'common.thisMachine' ? hit : thisMachine()
}
