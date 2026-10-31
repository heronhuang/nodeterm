import { useMemo, useRef, useState } from 'react'
import { useI18n } from '@renderer/i18n/useI18n'
import { useSettings } from '../../../state/settings'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { Switch } from '@renderer/ui/Switch'
import { Button } from '@renderer/ui/Button'
import { isMacPlatform, isWindowsPlatform } from '@shared/platform-utils'
import { notificationsBlockedCopy } from '@renderer/lib/notificationsBlockedCopy'
import { checkCustomSfx, playSfx } from '@renderer/lib/sfx'
import { readAsBase64 } from '@renderer/terminal/file-drop'
import {
  ALERT_SOUND_ACCEPT,
  ALERT_SOUND_KINDS,
  ALERT_SOUND_MAX_BYTES,
  customAlertSoundFor,
  type AlertSoundKind,
  type CustomAlertSound,
  type CustomAlertSounds
} from '@shared/alert-sound'

const ROW_DEFS = {
  notify: {
    key: 'settings.notifications.rows.notify.title',
    keywords: ['notify', 'notification', 'claude', 'background', 'turn', 'done']
  },
  sound: {
    key: 'settings.notifications.rows.sound.title',
    keywords: ['sound', 'audio', 'sfx', 'effect', 'chime', 'beep', 'retro', '8-bit', 'chiptune', 'volume', 'mute', 'finished', 'needs you', 'custom', 'file', 'mp3', 'wav', 'own sound']
  },
  mobilePush: {
    key: 'settings.notifications.rows.mobilePush.title',
    keywords: ['push', 'phone', 'mobile', 'apns', 'fcm', 'ios', 'android', 'notification', 'approval', 'question', 'done', 'completed', 'needs you', 'live update', 'live updates', 'live activity', 'live activities', 'ongoing notification', 'dynamic island', 'lock screen', 'presence', 'idle', 'hold', 'defer', 'at this computer']
  }
} as const

const SOUND_LABELS: Record<AlertSoundKind, string> = { done: 'Finished sound', needsYou: 'Needs-you sound' }

/**
 * One alert kind's sound (issue #289): the built-in chime or the user's own file. The picked file's
 * BYTES go to the core, which validates them and stores a fixed per-kind copy in its data dir —
 * the original path is never sent or kept, so this works the same in the Server Edition, where
 * the file is on the browser's machine. Settings keep only the display name + a stamp.
 */
function CustomSoundRow({ kind, volume }: { kind: AlertSoundKind; volume: number }): React.JSX.Element {
  const customAlertSounds = useSettings((s) => s.settings.customAlertSounds)
  const update = useSettings((s) => s.update)
  const current = customAlertSoundFor(customAlertSounds, kind)
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState<string | undefined>()

  // Rebuilt from the validated entries (never spread from the raw, hand-editable value), so a
  // malformed entry for the other kind is dropped rather than carried forward.
  const withEntry = (entry: CustomAlertSound | undefined): CustomAlertSounds => {
    const base = useSettings.getState().settings.customAlertSounds
    const next: CustomAlertSounds = {}
    for (const k of ALERT_SOUND_KINDS) {
      const e = k === kind ? entry : customAlertSoundFor(base, k)
      if (e) next[k] = e
    }
    return next
  }

  const onPick = async (file: File | undefined): Promise<void> => {
    if (!file) return
    setNote(undefined)
    // A fast answer for the obvious case; the core re-checks everything (size, type, magic bytes).
    if (file.size > ALERT_SOUND_MAX_BYTES) {
      setNote(`That file is too large — the limit is ${ALERT_SOUND_MAX_BYTES / (1024 * 1024)} MB.`)
      return
    }
    setBusy(true)
    try {
      const b64 = await readAsBase64(file)
      if (!b64) {
        setNote('That file could not be read.')
        return
      }
      const res = await window.nodeTerminal.files.saveAlertSound(kind, file.name, b64)
      if (!res.ok) {
        setNote(res.error)
        return
      }
      const stamp = Date.now()
      update({ customAlertSounds: withEntry({ name: res.name, stamp }) })
      if (await checkCustomSfx(kind, stamp)) {
        playSfx(kind, volume, useSettings.getState().settings.customAlertSounds)
      } else {
        setNote('Saved, but this file could not be decoded — the built-in chime will play instead.')
      }
    } catch {
      setNote('Could not save the sound.')
    } finally {
      setBusy(false)
    }
  }

  const onReset = async (): Promise<void> => {
    setNote(undefined)
    setBusy(true)
    try {
      await window.nodeTerminal.files.clearAlertSound(kind)
    } catch {
      // The entry is dropped below regardless: a stale file on disk is never played without it.
    } finally {
      update({ customAlertSounds: withEntry(undefined) })
      setBusy(false)
    }
  }

  return (
    <FieldRow
      label={SOUND_LABELS[kind]}
      description={current ? current.name : 'Built-in chime'}
      note={note}
      control={
        <div className="flex items-center gap-2">
          <Button
            onClick={() => playSfx(kind, volume, useSettings.getState().settings.customAlertSounds)}
            aria-label={`Preview ${SOUND_LABELS[kind].toLowerCase()}`}
          >
            Preview
          </Button>
          <Button disabled={busy} onClick={() => inputRef.current?.click()}>
            {busy ? 'Saving…' : 'Choose file…'}
          </Button>
          <Button variant="ghost" disabled={busy || !current} onClick={() => void onReset()}>
            Reset
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept={ALERT_SOUND_ACCEPT}
            hidden
            tabIndex={-1}
            aria-hidden="true"
            onChange={(e) => {
              const f = e.target.files?.[0]
              // Reset so picking the same file again still fires `change`.
              e.target.value = ''
              void onPick(f)
            }}
          />
        </div>
      }
    />
  )
}

// The OS-refusal repair row's wording follows the OS whose notification center refused us.
const blockedCopy = notificationsBlockedCopy(isMacPlatform() ? 'mac' : isWindowsPlatform() ? 'windows' : 'other')

export function NotificationsSection({ isActive }: { isActive: boolean }): React.JSX.Element {
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

  const notifyOnClaudeDone = useSettings((s) => s.settings.notifyOnClaudeDone)
  const soundEffects = useSettings((s) => s.settings.soundEffects)
  const soundVolume = useSettings((s) => s.settings.soundVolume)
  const customAlertSounds = useSettings((s) => s.settings.customAlertSounds)
  const mobilePushEnabled = useSettings((s) => s.settings.mobilePushEnabled)
  const mobilePushNeedsYou = useSettings((s) => s.settings.mobilePushNeedsYou)
  const mobilePushDone = useSettings((s) => s.settings.mobilePushDone)
  const mobileLiveActivities = useSettings((s) => s.settings.mobileLiveActivities)
  const mobilePushPresenceAware = useSettings((s) => s.settings.mobilePushPresenceAware)
  const update = useSettings((s) => s.update)
  // The OS refused our test notification (macOS permission denied). macOS never re-prompts
  // once the app's record exists, so the only way back is the System Settings pane.
  const [osBlocked, setOsBlocked] = useState(false)
  return (
    <SettingsSection
      id="notifications"
      title={t('settings.notifications.title')}
      description={t('settings.notifications.description')}
      isActive={isActive}
      searchEntries={entries}
    >
      <SearchableRow {...rows.notify}>
        <FieldRow
          label={rows.notify.title}
          control={
            <Switch
              checked={notifyOnClaudeDone}
              ariaLabel="Background notifications"
              onChange={(on) => {
                update({ notifyOnClaudeDone: on, notifyConsentAsked: true })
                setOsBlocked(false)
                // Enabling fires a real test notification: on a fresh install this is what
                // triggers the macOS permission prompt; on a denied/stale record the OS
                // rejects it and we surface the repair path below.
                if (on)
                  void window.nodeTerminal
                    .notify({
                      title: 'Notifications enabled',
                      body: "You'll be told when Claude Code finishes in the background.",
                      nodeId: '',
                      force: true
                    })
                    .then((result) => setOsBlocked(result === 'failed'))
              }}
            />
          }
        />
        {osBlocked && (
          <div className="mt-2 flex items-center gap-3 text-[13px] text-[color:var(--caution)]">
            {blockedCopy.message}
            {blockedCopy.button && (
              <Button onClick={() => void window.nodeTerminal.openNotificationSettings()}>
                {blockedCopy.button}
              </Button>
            )}
          </div>
        )}
      </SearchableRow>
      <SearchableRow {...rows.sound}>
        <FieldRow
          label={rows.sound.title}
          description={t('settings.notifications.soundDescription')}
          control={
            <Switch
              checked={soundEffects}
              ariaLabel="Sound effects"
              onChange={(on) => {
                update({ soundEffects: on })
                // Enabling plays the finish chirp — it doubles as the volume preview AND as the
                // user gesture a browser needs before it will let us make noise at all.
                if (on) playSfx('done', soundVolume, customAlertSounds)
              }}
            />
          }
        />
        <div
          className={
            'mt-3 space-y-3 border-l border-border pl-4' +
            (soundEffects ? '' : ' pointer-events-none opacity-40')
          }
          aria-disabled={!soundEffects}
        >
          <FieldRow
            label={t('settings.notifications.volumeLabel')}
            control={
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={Math.round(soundVolume * 100)}
                  aria-label="Sound effect volume"
                  onChange={(e) => update({ soundVolume: Number(e.target.value) / 100 })}
                  onMouseUp={() => playSfx('done', soundVolume, customAlertSounds)}
                  className="w-40 accent-[var(--accent)]"
                />
                <span className="w-9 text-right text-[12px] text-muted tabular-nums">
                  {Math.round(soundVolume * 100)}%
                </span>
              </div>
            }
          />
          <CustomSoundRow kind="done" volume={soundVolume} />
          <CustomSoundRow kind="needsYou" volume={soundVolume} />
        </div>
      </SearchableRow>
      <SearchableRow {...rows.mobilePush}>
        <FieldRow
          label={rows.mobilePush.title}
          description={t('settings.notifications.mobilePushDescription')}
          control={
            <Switch
              checked={mobilePushEnabled}
              ariaLabel="Mobile push notifications"
              onChange={(on) => update({ mobilePushEnabled: on })}
            />
          }
        />
        {/* Per-kind sub-gates. Inert (dimmed, non-interactive) while the master toggle is off. */}
        <div
          className={
            'mt-3 space-y-3 border-l border-border pl-4' +
            (mobilePushEnabled ? '' : ' pointer-events-none opacity-40')
          }
          aria-disabled={!mobilePushEnabled}
        >
          <FieldRow
            label={t('settings.notifications.pushNeedsYou')}
            control={
              <Switch
                checked={mobilePushNeedsYou}
                ariaLabel="Push when an agent needs you"
                onChange={(on) => update({ mobilePushNeedsYou: on })}
              />
            }
          />
          <FieldRow
            label={t('settings.notifications.pushDone')}
            control={
              <Switch
                checked={mobilePushDone}
                ariaLabel="Push when a task completes"
                onChange={(on) => update({ mobilePushDone: on })}
              />
            }
          />
          <FieldRow
            label={t('settings.notifications.liveUpdatesOnPhone')}
            description={t('settings.notifications.liveUpdatesDescription')}
            control={
              <Switch
                checked={mobileLiveActivities}
                ariaLabel="Live updates on your phone"
                onChange={(on) => update({ mobileLiveActivities: on })}
              />
            }
          />
          <FieldRow
            label={t('settings.notifications.holdPhoneAlerts')}
            description={t('settings.notifications.holdPhoneAlertsDescription')}
            control={
              <Switch
                checked={mobilePushPresenceAware}
                ariaLabel="Hold phone alerts while you're at this computer"
                onChange={(on) => update({ mobilePushPresenceAware: on })}
              />
            }
          />
        </div>
      </SearchableRow>
    </SettingsSection>
  )
}
