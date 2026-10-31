import { useMemo, useEffect, useState } from 'react'
import { useI18n } from '@renderer/i18n/useI18n'
import type { TranslateFn } from '@shared/i18n/types'
import { useSettings } from '../../../state/settings'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { Switch } from '@renderer/ui/Switch'
import { Button } from '@renderer/ui/Button'
import { SegmentedPill } from '@renderer/ui/SegmentedPill'
import { USAGE_PROVIDER_IDS, providerLabel } from '@shared/usage-limits'
import { AGENT_CONFIG } from '@shared/agents/config'

const ROW_DEFS = {
  percentMode: {
    key: 'settings.usage.rows.percentMode.title',
    keywords: ['usage', 'percent', 'used', 'remaining', 'left', 'display']
  },
  visibility: {
    key: 'settings.usage.rows.visibility.title',
    keywords: [
      'usage',
      'provider',
      'show',
      'hide',
      'toggle',
      'claude',
      'remote',
      'ssh',
      'host',
      'codex',
      'cursor',
      'gemini',
      'grok',
      'kimi',
      'minimax',
      'opencode',
      'pill',
      'indicator'
    ]
  },
  cookies: {
    key: 'settings.usage.rows.cookies.title',
    keywords: ['minimax', 'opencode', 'cookie', 'session', 'sign in', 'credential', 'paste']
  }
} as const

const COOKIE_PROVIDER_IDS = ['minimax', 'opencode'] as const

/** AGENT_CONFIG is keyed by builtin ids; billing-only providers fall through to the label table. */
function labelFor(provider: string): string {
  const agentLabel = (AGENT_CONFIG as Record<string, { label?: string } | undefined>)[provider]?.label
  return providerLabel(provider, agentLabel)
}

function usageProviderDisplayName(provider: string, t: TranslateFn): string {
  const key = `settings.usage.providers.${provider}.displayName`
  const localized = t(key)
  if (localized !== key) return localized
  return labelFor(provider)
}

function usageProviderBlurb(provider: string, t: TranslateFn): string {
  const key = `settings.usage.providers.${provider}.blurb`
  const localized = t(key)
  return localized !== key ? localized : ''
}

function CookieProviderRow({
  id,
  stored,
  onChange
}: {
  id: (typeof COOKIE_PROVIDER_IDS)[number]
  stored: boolean
  onChange: (stored: boolean) => void
}): React.JSX.Element {
  const { t } = useI18n()
  const [value, setValue] = useState('')
  const save = async (next: string): Promise<void> => {
    onChange(await window.nodeTerminal.usage.setProviderCookie(id, next))
    // Never keep the secret in component state once it has been handed over.
    setValue('')
  }
  return (
    <FieldRow
      label={t(`settings.usage.cookies.${id}.label`)}
      description={t(`settings.usage.cookies.${id}.description`)}
      note={stored ? t('settings.usage.cookies.noteStored') : t('settings.usage.cookies.noteEmpty')}
      control={
        <div className="flex items-center gap-2">
          <input
            type="password"
            className="input w-64"
            placeholder={
              stored ? t('settings.usage.cookies.storedPlaceholder') : t(`settings.usage.cookies.${id}.placeholder`)
            }
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          <Button onClick={() => void save(value)} disabled={!value.trim()}>
            {t('common.save')}
          </Button>
          {stored && (
            <Button onClick={() => void save('')}>{t('common.clear')}</Button>
          )}
        </div>
      }
    />
  )
}

export function UsageSection({ isActive }: { isActive: boolean }): React.JSX.Element | null {
  const { t } = useI18n()
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

  const settings = useSettings((s) => s.settings)
  const update = useSettings((s) => s.update)

  const hidden = new Set(settings.hiddenUsageProviders)
  const setShown = (provider: string, shown: boolean): void => {
    const next = settings.hiddenUsageProviders.filter((p) => p !== provider)
    if (!shown) next.push(provider)
    update({ hiddenUsageProviders: next })
  }

  // Which cookie providers have one stored — state only; the values never reach the renderer.
  const [cookieStored, setCookieStored] = useState<Record<string, boolean>>({})
  useEffect(() => {
    if (!isActive) return
    let cancelled = false
    void window.nodeTerminal.usage.cookieProviders().then((v) => {
      if (!cancelled) setCookieStored(v)
    })
    return () => {
      cancelled = true
    }
  }, [isActive])

  return (
    <SettingsSection
      id="usage"
      title={t('settings.usage.title')}
      description={t('settings.usage.description')}
      isActive={isActive}
      searchEntries={entries}
    >
      <SearchableRow {...rows.percentMode}>
        <FieldRow
          label={t('settings.usage.percentModeLabel')}
          description={t('settings.usage.percentModeDescription')}
          control={
            <SegmentedPill
              value={settings.usagePercentMode}
              options={[
                { value: 'used', label: t('settings.usage.percentUsed') },
                { value: 'remaining', label: t('settings.usage.percentRemaining') },
                { value: 'tokens', label: t('settings.usage.percentTokens') }
              ]}
              onChange={(v) => update({ usagePercentMode: v })}
              ariaLabel={t('settings.usage.percentModeAria')}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.visibility}>
        <div className="space-y-5">
          {USAGE_PROVIDER_IDS.map((id) => {
            const displayName = usageProviderDisplayName(id, t)
            return (
              <FieldRow
                key={id}
                label={t('settings.usage.providerRowLabel', { provider: displayName })}
                description={usageProviderBlurb(id, t)}
                control={
                  <Switch
                    checked={!hidden.has(id)}
                    onChange={(v) => setShown(id, v)}
                    ariaLabel={t('settings.usage.showProviderAria', { provider: displayName })}
                  />
                }
              />
            )
          })}
        </div>
      </SearchableRow>
      <SearchableRow {...rows.cookies}>
        <div className="space-y-5">
          {COOKIE_PROVIDER_IDS.map((id) => (
            <CookieProviderRow
              key={id}
              id={id}
              stored={!!cookieStored[id]}
              onChange={(stored) => setCookieStored((m) => ({ ...m, [id]: stored }))}
            />
          ))}
        </div>
      </SearchableRow>
    </SettingsSection>
  )
}
