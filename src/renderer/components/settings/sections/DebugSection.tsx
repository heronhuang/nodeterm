import { useMemo } from 'react'
import { useSettings } from '../../../state/settings'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { Switch } from '@renderer/ui/Switch'
import { Button } from '@renderer/ui/Button'
import { useI18n } from '@renderer/i18n/useI18n'

const LOG_KEYWORDS = ['debug', 'log', 'logs', 'console', 'diagnostics', 'troubleshoot']

export function DebugSection({ isActive }: { isActive: boolean }): React.JSX.Element {
  const { t } = useI18n()
  const debugLogPanel = useSettings((s) => s.settings.debugLogPanel)
  const update = useSettings((s) => s.update)
  const row = useMemo(
    () => ({ title: t('settings.debug.rows.logPanel.title'), keywords: LOG_KEYWORDS }),
    [t]
  )
  const entries = useMemo(() => [row], [row])
  return (
    <SettingsSection
      id="debug"
      title={t('settings.debug.title')}
      isActive={isActive}
      searchEntries={entries}
    >
      <SearchableRow {...row}>
        <FieldRow
          label={t('settings.debug.logPanelLabel')}
          description={t('settings.debug.logPanelDescription')}
          control={
            <Switch
              checked={debugLogPanel}
              onChange={(v) => update({ debugLogPanel: v })}
              ariaLabel={t('settings.debug.logPanelLabel')}
            />
          }
        />
        {debugLogPanel && (
          <FieldRow
            label={t('settings.debug.logViewerLabel')}
            description={t('settings.debug.logViewerDescription')}
            control={
              <Button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent('nodeterm:open-log-panel'))
                }
              >
                {t('settings.debug.open')}
              </Button>
            }
          />
        )}
      </SearchableRow>
    </SettingsSection>
  )
}
