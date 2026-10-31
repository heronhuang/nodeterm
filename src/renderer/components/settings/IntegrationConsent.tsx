// Agent-integration consent UI (issue #744): the first-run question, the one-time notice for an
// install that was grandfathered, the per-SSH-host question, and the Settings → Agents rows.
//
// The CHOICE is `settings.agentIntegrations` (`@shared/agent-integrations`); saving it is all the
// renderer does — the host's lifecycle (core/agent-integrations.ts) reacts to the settings change
// and installs or cleans up. Every reader goes through the shared sanitizer.
import { useEffect, useState } from 'react'
import { useSettings } from '../../state/settings'
import {
  INTEGRATION_AGENT_IDS,
  agentChoice,
  answerIntegrationPrompt,
  hostChoice,
  integrationsOf,
  needsGrandfatherNotice,
  needsIntegrationPrompt,
  withAgentChoice,
  withHostChoice,
  withNoticeDismissed,
  type AgentIntegrationsStatus,
  type IntegrationAgentId,
  type IntegrationChoice
} from '@shared/agent-integrations'
import { AGENT_CONFIG } from '@shared/agents/config'
import { Button } from '@renderer/ui/Button'
import { AgentIcon } from '../../lib/agentIcons'
import { IconClose } from '../icons'
import { useI18n } from '@renderer/i18n/useI18n'
import type { TranslateFn } from '@shared/i18n/types'

const labelOf = (id: IntegrationAgentId): string => AGENT_CONFIG[id]?.label ?? id

function useSave(): (next: ReturnType<typeof useSettings.getState>['settings']) => void {
  const update = useSettings((s) => s.update)
  return (next) => update({ agentIntegrations: next.agentIntegrations })
}

/** The first-run question (a new install that has not answered). Nothing global is written until
 *  it is answered; "Not now" records a decline, so it is asked once. */
export function IntegrationPromptBanner({ onChoose }: { onChoose: () => void }): React.JSX.Element | null {
  const { t } = useI18n()
  const settings = useSettings((s) => s.settings)
  const hydrated = useSettings((s) => s.hydrated)
  const save = useSave()
  if (!hydrated || !needsIntegrationPrompt(settings)) return null
  return (
    <div className="announce-banner announce-banner--info" role="status" data-testid="integration-prompt">
      <span className="announce-banner__dot" />
      <div className="announce-banner__content">
        <span className="announce-banner__title">{t('integrationConsent.prompt.title')}</span>
        <span className="announce-banner__body">
          {t('integrationConsent.prompt.writes')} {t('integrationConsent.prompt.unavailable')}
        </span>
      </div>
      <button
        className="announce-banner__btn"
        onClick={() => save({ ...settings, agentIntegrations: answerIntegrationPrompt([...INTEGRATION_AGENT_IDS]) })}
      >
        {t('integrationConsent.prompt.enableAll')}
      </button>
      <button className="announce-banner__btn" onClick={onChoose}>
        {t('integrationConsent.prompt.choose')}
      </button>
      <button
        className="announce-banner__btn"
        onClick={() => save({ ...settings, agentIntegrations: answerIntegrationPrompt([]) })}
      >
        {t('integrationConsent.prompt.notNow')}
      </button>
    </div>
  )
}

/** The one-time notice for an install from before this feature: everything it had stays on. */
export function IntegrationGrandfatherNotice({ onOpenSettings }: { onOpenSettings: () => void }): React.JSX.Element | null {
  const { t } = useI18n()
  const settings = useSettings((s) => s.settings)
  const hydrated = useSettings((s) => s.hydrated)
  const save = useSave()
  if (!hydrated || !needsGrandfatherNotice(settings)) return null
  const dismiss = (): void => save(withNoticeDismissed(settings))
  return (
    <div className="announce-banner announce-banner--info" role="status" data-testid="integration-notice">
      <span className="announce-banner__dot" />
      <div className="announce-banner__content">
        <span className="announce-banner__title">{t('integrationConsent.grandfather.title')}</span>
        <span className="announce-banner__body">{t('integrationConsent.grandfather.body')}</span>
      </div>
      <button
        className="announce-banner__btn"
        onClick={() => {
          dismiss()
          onOpenSettings()
        }}
      >
        {t('integrationConsent.grandfather.review')}
      </button>
      <button
        className="announce-banner__close"
        title={t('common.dismiss')}
        aria-label={t('common.dismiss')}
        onClick={dismiss}
      >
        <IconClose />
      </button>
    </div>
  )
}

/** The per-host question: the active project's SSH host has no answer yet, so nothing was
 *  installed there. Shown only once the first-run question is answered. */
export function HostIntegrationBanner({ hostKey }: { hostKey: string | null }): React.JSX.Element | null {
  const { t } = useI18n()
  const settings = useSettings((s) => s.settings)
  const hydrated = useSettings((s) => s.hydrated)
  const save = useSave()
  if (!hydrated || !hostKey || needsIntegrationPrompt(settings)) return null
  if (hostChoice(settings, hostKey) !== undefined) return null
  if (!INTEGRATION_AGENT_IDS.some((a) => agentChoice(settings, a) === 'enabled')) return null
  return (
    <div className="announce-banner announce-banner--info" role="status" data-testid="host-integration-prompt">
      <span className="announce-banner__dot" />
      <div className="announce-banner__content">
        <span className="announce-banner__title">{t('integrationConsent.host.title', { hostKey })}</span>
        <span className="announce-banner__body">
          {t('integrationConsent.host.bodyPrefix')} {t('integrationConsent.prompt.unavailable')}
        </span>
      </div>
      <button className="announce-banner__btn" onClick={() => save(withHostChoice(settings, hostKey, 'enabled'))}>
        {t('integrationConsent.host.allow')}
      </button>
      <button className="announce-banner__btn" onClick={() => save(withHostChoice(settings, hostKey, 'declined'))}>
        {t('integrationConsent.host.decline')}
      </button>
    </div>
  )
}

/** The state, said as what is on disk — "On"/"Off" read like the Add-menu switch below it. */
function choiceText(c: IntegrationChoice | undefined, t: TranslateFn): string {
  if (c === 'enabled') return t('integrationConsent.choice.installed')
  if (c === 'declined') return t('integrationConsent.choice.notInstalled')
  return t('integrationConsent.choice.notSetUp')
}

/** One agent or SSH host: its state, and only the action(s) that would change it. */
function IntegrationRow({
  icon,
  label,
  choice,
  onChoose,
  testId
}: {
  icon?: React.ReactNode
  label: string
  choice: IntegrationChoice | undefined
  onChoose: (c: IntegrationChoice) => void
  testId: string
}): React.JSX.Element {
  const { t } = useI18n()
  return (
    <div className="flex items-center gap-3 py-1" data-testid={testId}>
      {icon}
      <span className="flex-1 text-[13px] text-text">{label}</span>
      <span className="text-[12px] text-muted" data-testid={`${testId}-state`}>
        {choiceText(choice, t)}
      </span>
      {choice !== 'enabled' && (
        <Button
          variant="primary"
          onClick={() => onChoose('enabled')}
          aria-label={t('integrationConsent.actions.installAria', { label })}
        >
          {t('integrationConsent.actions.install')}
        </Button>
      )}
      {choice === 'enabled' && (
        <Button
          onClick={() => onChoose('declined')}
          aria-label={t('integrationConsent.actions.removeAria', { label })}
        >
          {t('integrationConsent.actions.remove')}
        </Button>
      )}
      {choice === undefined && (
        <Button
          onClick={() => onChoose('declined')}
          aria-label={t('integrationConsent.actions.dontInstallAria', { label })}
        >
          {t('integrationConsent.actions.dontInstall')}
        </Button>
      )}
    </div>
  )
}

/** Settings → Agents: one row per agent, the per-host answers, and what the host kept. */
export function IntegrationSettings(): React.JSX.Element {
  const { t } = useI18n()
  const settings = useSettings((s) => s.settings)
  const save = useSave()
  const [status, setStatus] = useState<AgentIntegrationsStatus | null>(null)
  const sig = JSON.stringify(integrationsOf(settings))
  useEffect(() => {
    let live = true
    // Give the host a moment to reconcile after a save, then ask what it did.
    const timer = setTimeout(() => {
      window.nodeTerminal.integrations
        ?.status()
        .then((s) => {
          if (live) setStatus(s)
        })
        .catch(() => {})
    }, 400)
    return () => {
      live = false
      clearTimeout(timer)
    }
  }, [sig])
  const hosts = Object.entries(integrationsOf(settings).hosts ?? {})
  return (
    <div className="space-y-2" data-testid="integration-settings">
      {status?.vetoed && (
        <p className="text-[12px] text-muted">{t('integrationConsent.settings.serverVetoed')}</p>
      )}
      {INTEGRATION_AGENT_IDS.map((id) => (
        <IntegrationRow
          key={id}
          icon={<AgentIcon agentId={id} size={18} />}
          label={labelOf(id)}
          choice={agentChoice(settings, id)}
          onChoose={(c) => save(withAgentChoice(settings, id, c))}
          testId={`integration-row-${id}`}
        />
      ))}
      {hosts.length > 0 && (
        <div className="pt-2">
          <div className="text-[12px] text-muted pb-1">{t('integrationConsent.settings.onSshHosts')}</div>
          {hosts.map(([host, c]) => (
            <IntegrationRow
              key={host}
              label={host}
              choice={c}
              onChoose={(next) => save(withHostChoice(settings, host, next))}
              testId={`integration-host-${host}`}
            />
          ))}
        </div>
      )}
      {!!status?.retained.length && (
        <div className="pt-2 text-[12px] text-muted" data-testid="integration-retained">
          {t('integrationConsent.settings.retainedIntro')}
          <ul className="list-disc pl-5">
            {status.retained.map((p) => (
              <li key={p} className="font-mono">
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
