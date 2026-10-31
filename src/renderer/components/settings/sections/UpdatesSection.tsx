import { useEffect, useMemo, useState } from 'react'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { Button } from '@renderer/ui/Button'
import { checkForUpdatesNow } from '@renderer/state/pendingUpdate'
import { useI18n } from '@renderer/i18n/useI18n'

const UPDATE_KEYWORDS = ['update', 'version', 'check', 'upgrade']

export function UpdatesSection({ isActive }: { isActive: boolean }): React.JSX.Element {
  const { t } = useI18n()
  const [version, setVersion] = useState('')
  const row = useMemo(
    () => ({ title: t('settings.updates.rows.updates.title'), keywords: UPDATE_KEYWORDS }),
    [t]
  )
  const entries = useMemo(() => [row], [row])
  useEffect(() => {
    void window.nodeTerminal.updates.getVersion().then(setVersion)
  }, [])
  return (
    <SettingsSection
      id="updates"
      title={t('settings.updates.title')}
      isActive={isActive}
      searchEntries={entries}
    >
      <SearchableRow entry={row}>
        <div className="space-y-3">
          <FieldRow
            label={t('settings.updates.currentVersion')}
            control={<span className="text-[13px] text-muted">{version || '…'}</span>}
          />
          <Button onClick={checkForUpdatesNow}>{t('settings.updates.checkForUpdates')}</Button>
          <p className="text-sm text-muted">{t('settings.updates.resultsHint')}</p>
        </div>
      </SearchableRow>
    </SettingsSection>
  )
}
