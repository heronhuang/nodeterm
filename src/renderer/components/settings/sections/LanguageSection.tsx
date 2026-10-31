import { useMemo } from 'react'
import { useSettings } from '../../../state/settings'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { SegmentedPill } from '@renderer/ui/SegmentedPill'
import type { UiLanguage } from '@shared/i18n/types'
import { UI_LANGUAGES } from '@shared/i18n/types'
import { useI18n } from '@renderer/i18n/useI18n'

const LANGUAGE_KEYWORDS = ['language', 'locale', '中文', 'english', 'i18n', 'translation', 'display']

export function LanguageSection({ isActive }: { isActive: boolean }): React.JSX.Element {
  const { t } = useI18n()
  const uiLanguage = useSettings((s) => s.settings.uiLanguage)
  const update = useSettings((s) => s.update)
  const row = useMemo(
    () => ({ title: t('settings.language.rows.language.title'), keywords: LANGUAGE_KEYWORDS }),
    [t]
  )

  const choices: { value: UiLanguage; label: string }[] = UI_LANGUAGES.map((code) => ({
    value: code,
    label: t(`settings.language.${code}`)
  }))

  return (
    <SettingsSection
      id="language"
      title={t('settings.language.title')}
      description={t('settings.language.description')}
      isActive={isActive}
      searchEntries={[row]}
    >
      <SearchableRow {...row}>
        <FieldRow
          label={t('settings.language.label')}
          control={
            <SegmentedPill
              value={uiLanguage}
              options={choices}
              onChange={(v) => update({ uiLanguage: v as UiLanguage })}
            />
          }
        />
      </SearchableRow>
    </SettingsSection>
  )
}
