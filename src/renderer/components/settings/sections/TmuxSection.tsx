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
      <SearchableRow entry={rows.enabled}>
        <FieldRow
          label={t('settings.tmux.persistentSessions')}
          description={persistenceDescription(status)}
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
        <SearchableRow entry={rows.backend}>
          <FieldRow
            label={t('settings.tmux.sessionBackend')}
            description={sessionBackendNote(status.zellij)}
            note={
              normalizeSessionBackend(settings.sessionBackend) === 'zellij'
                ? t('settings.tmux.zellijUnavailable', { gaps: ZELLIJ_BACKEND_GAPS.join(' ') })
                : undefined
            }
            control={
              <Select
                aria-label="Session backend"
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
      <SearchableRow entry={rows.scrollback}>
        <FieldRow
          label={t('settings.tmux.scrollbackLines')}
          description={
            'tmux’s history-limit for each terminal. ' +
            `Without tmux (Windows), history is capped at ${XTERM_SCROLLBACK_MAX.toLocaleString('en-US')} lines: the app holds it at full width in memory.`
          }
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
      <SearchableRow entry={rows.leadPane}>
        <FieldRow
          label={t('settings.tmux.leadPane')}
          description={
            'Claude Code agent teams re-apply a hardcoded 70/30 tmux split on every teammate spawn, squeezing the pane you type into. ' +
            'When on, guarded tmux hooks keep the lead pane at the chosen % of the node width (40–90), locally and on SSH hosts (at next connect). ' +
            'Side effect: a manual 50/50 split in a plain terminal is nudged to the same width. ' +
            'Turning it off leaves a running tmux server’s hooks in place until that server exits (close all terminals, or tmux -L node-terminal kill-server).'
          }
          control={
            <div className="flex items-center gap-2">
              {settings.tmuxLeadPaneWidth > 0 ? (
                <NumberField
                  value={settings.tmuxLeadPaneWidth}
                  min={LEAD_PANE_WIDTH_MIN}
                  max={LEAD_PANE_WIDTH_MAX}
                  step={1}
                  ariaLabel="Lead pane width (%)"
                  // Raw value stored; out-of-range hand edits are re-validated where the conf is
                  // generated (sanitizeLeadPaneWidth), so mid-typing values never snap under the
                  // user's cursor.
                  onChange={(v) => update({ tmuxLeadPaneWidth: Number.isFinite(v) ? v : 0 })}
                />
              ) : null}
              <Switch
                checked={settings.tmuxLeadPaneWidth > 0}
                onChange={(v) => update({ tmuxLeadPaneWidth: v ? LEAD_PANE_WIDTH_DEFAULT : 0 })}
                ariaLabel="Keep lead pane wide"
              />
            </div>
          }
        />
      </SearchableRow>
      <SearchableRow entry={rows.parkMinutes}>
        <FieldRow
          label={t('settings.tmux.parkMinutes')}
          description={
            'Minutes a project’s terminals stay attached after you switch to another project, so switching back is instant. ' +
            'After that they reattach on return — seconds per project over SSH. 0 = until the app quits. ' +
            `Default ${PARK_MINUTES_DEFAULT}. Applies from the next switch.`
          }
          control={
            <NumberField
              value={settings.terminalParkMinutes}
              min={0}
              max={PARK_MINUTES_MAX}
              step={1}
              ariaLabel="Park window (minutes)"
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
      <SearchableRow entry={rows.parkMax}>
        <FieldRow
          label={t('settings.tmux.parkMax')}
          description={
            'How many switched-away terminals stay attached in total. Beyond this the oldest are released early — local ones before SSH ones, which are slower to reattach. ' +
            'Each costs about 2 MB with tmux (more without tmux: its scrollback lives in the app) and, over SSH, one local ssh client on the project’s connection. ' +
            `Default ${PARK_MAX}.`
          }
          control={
            <NumberField
              value={settings.terminalParkMax}
              min={1}
              max={PARK_MAX_LIMIT}
              step={1}
              ariaLabel="Max parked terminals"
              onChange={(v) =>
                update({ terminalParkMax: Number.isFinite(v) && v >= 1 ? Math.floor(v) : PARK_MAX })
              }
            />
          }
        />
      </SearchableRow>
      <SearchableRow entry={rows.offscreen}>
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
