import {
  persistenceDescription,
  sessionBackendNote,
  usePersistenceStatus
} from '../../usePersistenceStatus'
import { useSettings } from '../../../state/settings'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { Switch } from '@renderer/ui/Switch'
import { NumberField } from '@renderer/ui/NumberField'
import { Select } from '@renderer/ui/Select'
import { normalizeSessionBackend, ZELLIJ_BACKEND_GAPS } from '@shared/session-backend'
import { XTERM_SCROLLBACK_MAX } from '@shared/scrollback'
import {
  LEAD_PANE_WIDTH_DEFAULT,
  LEAD_PANE_WIDTH_MAX,
  LEAD_PANE_WIDTH_MIN
} from '@shared/tmux-lead-pane'
import {
  PARK_MAX,
  PARK_MAX_LIMIT,
  PARK_MINUTES_DEFAULT,
  PARK_MINUTES_MAX
} from '@renderer/terminal/park-budget'
import { useMemo } from 'react'
import { useI18n } from '@renderer/i18n/useI18n'

const ROW_DEFS = {
  enabled: {
    key: 'settings.tmux.rows.enabled.title',
    keywords: ['tmux', 'persistent', 'session', 'continuity', 'protection', 'host']
  },
  backend: {
    key: 'settings.tmux.rows.backend.title',
    keywords: ['tmux', 'zellij', 'backend', 'multiplexer', 'session', 'persistent']
  },
  scrollback: {
    key: 'settings.tmux.rows.scrollback.title',
    keywords: ['tmux', 'scrollback', 'history', 'lines']
  },
  leadPane: {
    key: 'settings.tmux.rows.leadPane.title',
    keywords: ['lead', 'pane', 'width', 'agent', 'team', 'teammates', 'split', 'claude', 'resize']
  },
  parkMinutes: {
    key: 'settings.tmux.rows.parkMinutes.title',
    keywords: ['park', 'switch', 'project', 'ssh', 'fast', 'instant', 'reattach', 'minutes', 'memory']
  },
  parkMax: {
    key: 'settings.tmux.rows.parkMax.title',
    keywords: ['park', 'cap', 'limit', 'switch', 'project', 'ssh', 'reattach', 'memory', 'ram']
  },
  offscreen: {
    key: 'settings.tmux.rows.offscreen.title',
    keywords: ['offscreen', 'memory', 'ram', 'release', 'reattach', 'idle', 'minutes']
  }
} as const

export function TmuxSection({ isActive }: { isActive: boolean }): React.JSX.Element {
  const { t } = useI18n()
  const status = usePersistenceStatus()
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
      id="tmux"
      title={t('settings.tmux.title')}
      description={t('settings.tmux.description')}
      isActive={isActive}
      searchEntries={entries}
    >
      <SearchableRow {...rows.enabled}>
        <FieldRow
          label={t('settings.tmux.persistentSessions')}
          description={persistenceDescription(status, t)}
          control={
            <Switch
              checked={settings.tmuxEnabled}
              onChange={(v) => update({ tmuxEnabled: v })}
              ariaLabel={t('settings.tmux.persistentSessions')}
            />
          }
        />
      </SearchableRow>
      {status?.zellij ? (
        <SearchableRow {...rows.backend}>
          <FieldRow
            label={t('settings.tmux.sessionBackend')}
            description={sessionBackendNote(status.zellij, t)}
            note={
              normalizeSessionBackend(settings.sessionBackend) === 'zellij'
                ? t('settings.tmux.zellijUnavailable', { gaps: ZELLIJ_BACKEND_GAPS.join(' ') })
                : undefined
            }
            control={
              <Select
                aria-label={t('settings.tmux.aria.sessionBackend')}
                value={normalizeSessionBackend(settings.sessionBackend)}
                onChange={(e) => update({ sessionBackend: normalizeSessionBackend(e.target.value) })}
              >
                <option value="tmux">tmux</option>
                <option value="zellij">Zellij</option>
              </Select>
            }
          />
        </SearchableRow>
      ) : null}
      <SearchableRow {...rows.scrollback}>
        <FieldRow
          label={t('settings.tmux.scrollbackLines')}
          description={t('settings.tmux.scrollbackDescription', {
            scrollbackMax: XTERM_SCROLLBACK_MAX.toLocaleString()
          })}
          control={
            <NumberField
              value={settings.tmuxScrollback}
              min={1000}
              max={200000}
              step={1000}
              onChange={(v) => update({ tmuxScrollback: v || 50000 })}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.leadPane}>
        <FieldRow
          label={t('settings.tmux.leadPane')}
          description={t('settings.tmux.leadPaneDescription')}
          control={
            <div className="flex items-center gap-2">
              {settings.tmuxLeadPaneWidth > 0 ? (
                <NumberField
                  value={settings.tmuxLeadPaneWidth}
                  min={LEAD_PANE_WIDTH_MIN}
                  max={LEAD_PANE_WIDTH_MAX}
                  step={1}
                  ariaLabel={t('settings.tmux.aria.leadPaneWidth')}
                  // Raw value stored; out-of-range hand edits are re-validated where the conf is
                  // generated (sanitizeLeadPaneWidth), so mid-typing values never snap under the
                  // user's cursor.
                  onChange={(v) => update({ tmuxLeadPaneWidth: Number.isFinite(v) ? v : 0 })}
                />
              ) : null}
              <Switch
                checked={settings.tmuxLeadPaneWidth > 0}
                onChange={(v) => update({ tmuxLeadPaneWidth: v ? LEAD_PANE_WIDTH_DEFAULT : 0 })}
                ariaLabel={t('settings.tmux.aria.leadPaneWide')}
              />
            </div>
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.parkMinutes}>
        <FieldRow
          label={t('settings.tmux.parkMinutes')}
          description={t('settings.tmux.parkMinutesDescription', {
            defaultMinutes: PARK_MINUTES_DEFAULT
          })}
          control={
            <NumberField
              value={settings.terminalParkMinutes}
              min={0}
              max={PARK_MINUTES_MAX}
              step={1}
              ariaLabel={t('settings.tmux.aria.parkMinutes')}
              // A cleared field reads back as the DEFAULT, not 0: 0 means "keep forever", the
              // memory-expensive end, and must only ever be typed on purpose.
              onChange={(v) =>
                update({
                  terminalParkMinutes: Number.isFinite(v) ? Math.max(0, v) : PARK_MINUTES_DEFAULT
                })
              }
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.parkMax}>
        <FieldRow
          label={t('settings.tmux.parkMax')}
          description={t('settings.tmux.parkMaxDescription', { defaultMax: PARK_MAX })}
          control={
            <NumberField
              value={settings.terminalParkMax}
              min={1}
              max={PARK_MAX_LIMIT}
              step={1}
              ariaLabel={t('settings.tmux.aria.parkMax')}
              onChange={(v) =>
                update({ terminalParkMax: Number.isFinite(v) && v >= 1 ? Math.floor(v) : PARK_MAX })
              }
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.offscreen}>
        <FieldRow
          label={t('settings.tmux.offscreen')}
          description={t('settings.tmux.offscreenDescription')}
          control={
            <NumberField
              value={settings.offscreenTerminalMinutes}
              min={0}
              max={240}
              step={1}
              // A cleared/invalid field reads back as 0 = "never", the safe end of this setting.
              // Never NaN: `offscreenDisposeMs` would read it as "off" anyway, but NaN does not
              // survive a JSON round-trip to settings.json (it lands as `null`).
              onChange={(v) =>
                update({ offscreenTerminalMinutes: Number.isFinite(v) ? Math.max(0, v) : 0 })
              }
            />
          }
        />
      </SearchableRow>
    </SettingsSection>
  )
}
