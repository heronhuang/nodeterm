import { useMemo } from 'react'
import { useSettings } from '../../../state/settings'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { Select } from '@renderer/ui/Select'
import { Input } from '@renderer/ui/Input'
import { Switch } from '@renderer/ui/Switch'
import { useI18n } from '@renderer/i18n/useI18n'

const ROW_DEFS = {
  autoFetch: {
    key: 'settings.commit.rows.autoFetch.title',
    keywords: ['git', 'fetch', 'source control', 'ahead', 'behind', 'sync', 'remote']
  },
  agent: {
    key: 'settings.commit.rows.agent.title',
    keywords: ['commit', 'message', 'ai', 'claude', 'codex', 'generate']
  },
  command: {
    key: 'settings.commit.rows.command.title',
    keywords: ['commit', 'custom', 'command', 'prompt', 'promptFile']
  },
  extra: {
    key: 'settings.commit.rows.extra.title',
    keywords: ['commit', 'prompt', 'conventional', 'gitmoji']
  }
} as const

export function CommitSection({ isActive }: { isActive: boolean }): React.JSX.Element {
  const { t } = useI18n()
  const settings = useSettings((s) => s.settings)
  const update = useSettings((s) => s.update)
  const rows = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(ROW_DEFS).map(([id, def]) => [
          id,
          { title: t(def.key), keywords: [...def.keywords] }
        ])
      ) as Record<keyof typeof ROW_DEFS, { title: string; keywords: string[] }>,
    [t]
  )
  const entries = useMemo(() => Object.values(rows), [rows])
  return (
    <SettingsSection
      id="commit"
      title={t('settings.commit.title')}
      description={t('settings.commit.description')}
      isActive={isActive}
      searchEntries={entries}
    >
      <SearchableRow entry={rows.autoFetch}>
        <FieldRow
          label={t('settings.commit.autoFetchLabel')}
          description={t('settings.commit.autoFetchDescription')}
          control={
            <Switch
              checked={settings.gitAutoFetch}
              ariaLabel={t('settings.commit.autoFetchLabel')}
              onChange={(on) => update({ gitAutoFetch: on })}
            />
          }
        />
      </SearchableRow>
      <SearchableRow entry={rows.agent}>
        <FieldRow
          label={t('settings.commit.agentLabel')}
          control={
            <Select
              value={settings.commitAgent}
              onChange={(e) =>
                update({ commitAgent: e.target.value as 'claude' | 'codex' | 'custom' })
              }
            >
              <option value="claude">{t('settings.commit.agentClaude')}</option>
              <option value="codex">{t('settings.commit.agentCodex')}</option>
              <option value="custom">{t('settings.commit.agentCustom')}</option>
            </Select>
          }
        />
      </SearchableRow>
      {settings.commitAgent === 'custom' && (
        <SearchableRow entry={rows.command}>
          <FieldRow
            label={t('settings.commit.commandLabel')}
            description={t('settings.commit.commandDescription')}
            control={
              <Input
                className="w-72"
                placeholder={t('settings.commit.commandPlaceholder')}
                value={settings.commitAgentCommand}
                onChange={(e) => update({ commitAgentCommand: e.target.value })}
              />
            }
          />
        </SearchableRow>
      )}
      <SearchableRow entry={rows.extra}>
        <div className="py-2.5">
          <label className="block text-[13px] text-text">{t('settings.commit.extraLabel')}</label>
          <textarea
            value={settings.commitExtraPrompt}
            placeholder={t('settings.commit.extraPlaceholder')}
            onChange={(e) => update({ commitExtraPrompt: e.target.value })}
            className="mt-2 min-h-20 w-full rounded-md border border-border bg-bg px-2.5 py-2 text-[13px] text-text outline-none focus:border-accent"
          />
        </div>
      </SearchableRow>
    </SettingsSection>
  )
}
