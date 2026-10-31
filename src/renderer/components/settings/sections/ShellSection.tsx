import { useMemo } from 'react'
import { useSettings } from '../../../state/settings'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { Input } from '@renderer/ui/Input'
import { useI18n } from '@renderer/i18n/useI18n'

const SHELL_KEYWORDS = ['shell', 'bash', 'zsh', 'fish', 'default']

export function ShellSection({ isActive }: { isActive: boolean }): React.JSX.Element {
  const { t } = useI18n()
  const defaultShell = useSettings((s) => s.settings.defaultShell)
  const update = useSettings((s) => s.update)
  const row = useMemo(
    () => ({ title: t('settings.shell.rows.shell.title'), keywords: SHELL_KEYWORDS }),
    [t]
  )
  const entries = useMemo(() => [row], [row])
  return (
    <SettingsSection
      id="shell"
      title={t('settings.shell.title')}
      description={t('settings.shell.description')}
      isActive={isActive}
      searchEntries={entries}
    >
      <SearchableRow entry={row}>
        <FieldRow
          label={t('settings.shell.rows.shell.title')}
          control={
            <Input
              className="w-64"
              placeholder={t('settings.shell.placeholderSystemDefault')}
              value={defaultShell}
              onChange={(e) => update({ defaultShell: e.target.value })}
            />
          }
        />
      </SearchableRow>
    </SettingsSection>
  )
}
