import { useEffect, useState } from 'react'
import type { TmuxStatus } from '@shared/types'
import type { TranslateFn } from '@shared/i18n/types'
import { localSession } from '../session/localSession'
import { useSettings } from '../state/settings'
import { t as defaultT } from '../i18n/runtime'

/** Always the local core (the server in a browser), never the selected relay host. */
export function usePersistenceStatus(): TmuxStatus | null | undefined {
  const enabled = useSettings((s) => s.settings.tmuxEnabled)
  // The backend choice changes what the core reports; re-read at once rather than in up to 15 s.
  const backend = useSettings((s) => s.settings.sessionBackend)
  const [status, setStatus] = useState<TmuxStatus | null>()
  useEffect(() => {
    let cancelled = false
    const refresh = async (): Promise<void> => {
      try {
        const next = await localSession.api.pty.tmuxStatus()
        if (!cancelled) setStatus(next)
      } catch {
        if (!cancelled) setStatus(null)
      }
    }
    void refresh()
    // Settings saves are coalesced for 300 ms; re-read after that write as well.
    const settled = setTimeout(() => void refresh(), 1000)
    const timer = setInterval(() => void refresh(), 15_000)
    return () => {
      cancelled = true
      clearInterval(timer)
      clearTimeout(settled)
    }
  }, [enabled, backend])
  return status
}

export function persistenceDescription(
  status: TmuxStatus | null | undefined,
  translate: TranslateFn = defaultT
): string {
  const t = translate
  if (status === undefined) return t('settings.tmux.persistenceChecking')
  const p = status?.persistence
  if (!p) return t('settings.tmux.persistenceNotConfirmed')
  if (!p.enabled) return t('settings.tmux.persistenceOff')
  if (!p.backend) return t('settings.tmux.persistenceNoBackend')
  const name =
    p.backend === 'tmux'
      ? 'tmux'
      : p.backend === 'zellij'
        ? 'Zellij'
        : t('settings.tmux.backendSessionHost')
  return t('settings.tmux.persistenceAvailable', { name })
}

/**
 * The Session backend row's sentence. The setting only decides where a NEW local terminal is
 * created, so each branch says what actually happens next — including the fallback when Zellij is
 * selected but no binary was found, which must not read as applied.
 */
export function sessionBackendNote(
  z: {
    available: boolean
    selected: boolean
    socketTooLong?: boolean
  },
  translate: TranslateFn = defaultT
): string {
  const t = translate
  if (z.selected && z.available && z.socketTooLong)
    return t('settings.tmux.sessionBackendZellijSocketTooLong')
  if (z.selected && !z.available) return t('settings.tmux.sessionBackendZellijNotFound')
  if (z.selected) return t('settings.tmux.sessionBackendZellijSelected')
  return z.available
    ? t('settings.tmux.sessionBackendTmuxWithZellij')
    : t('settings.tmux.sessionBackendTmuxOnly')
}
