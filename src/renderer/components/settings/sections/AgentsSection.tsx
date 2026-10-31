import { useMemo, useEffect, useState } from 'react'
import { useI18n } from '@renderer/i18n/useI18n'
import { useSettings } from '../../../state/settings'
import { useProjects } from '../../../state/projects'
import { useBrowserLease, drivingNodeIds } from '../../../state/browserLease'
import {
  PROJECT_CAPABILITIES,
  PROJECT_CAPABILITY_COPY,
  capabilityHasMachineDefault,
  capabilityMachineDefault,
  projectCapabilityFlagInFile
} from '@shared/project-capabilities'
import {
  applyCapabilityChoice,
  capabilityChoiceLabel,
  capabilityChoiceOf,
  capabilityStatusText,
  type CapabilityChoice
} from '../../../lib/capabilityChoice'
import {
  isAgentEnabled,
  setAgentEnabled,
  setDefaultAgent
} from '../../../state/agentAvailability'
import { ensureClaudeCliCaps } from '../../../state/permissionMode'
import type { AgentLaunchMode, ClaudeCliCaps } from '@shared/types'
import {
  AGENT_CONFIG,
  ALL_PERMISSION_MODES,
  AUTO_PERMISSION_MODE_MIN_VERSION,
  BUILTIN_AGENT_IDS,
  hasSharedIdentity,
  PERMISSION_MODE_LABELS,
  type AgentId,
  type AgentPermissionMode,
  type BuiltinAgentId
} from '@shared/agents/config'
import {
  permissionModeAgentIds,
  permissionModeAgentsLabel,
  unsupportedModesNote
} from '@shared/agents/approval-mode'
import { codexApprovalCaps } from '@renderer/state/codexCli'
import { codexIdentityCapsNow } from '@renderer/state/codexIdentity'
import { AgentIcon } from '../../../lib/agentIcons'
import { chipFor } from '../../../lib/keybindingOverrides'
import { NODE_IDENTITY_STRICT_DATE } from '@shared/node-identity'
import {
  CONFIRM_WAIVABLE_VERBS,
  sanitizeControlConfirmWaivers,
  withProjectWaiver
} from '@shared/control-confirm'
import { useControlConfirm } from '../../../state/controlConfirm'
import { SegmentedPill } from '@renderer/ui/SegmentedPill'
import { Button } from '@renderer/ui/Button'
import { Input } from '@renderer/ui/Input'
import { Select } from '@renderer/ui/Select'
import { Switch } from '@renderer/ui/Switch'
import { NumberField } from '@renderer/ui/NumberField'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { IntegrationSettings } from '../IntegrationConsent'

const ROW_DEFS = {
  integrations: {
    key: 'settings.agents.rows.integrations.title',
    keywords: ['agent integrations', 'integration', 'remove', 'uninstall', 'consent', 'hook', 'hooks', 'skill', 'skills', 'install', 'opt out', 'decline', 'clean up', 'ssh', 'host', 'agents.md', 'gemini.md']
  },
  agents: {
    key: 'settings.agents.rows.agents.title',
    keywords: ['agent', 'claude', 'codex', 'gemini', 'cursor', 'enable', 'disable', 'show', 'hide', 'menu', 'default']
  },
  launchCommands: {
    key: 'settings.agents.rows.launchCommands.title',
    keywords: [
      'launch',
      'command',
      'wrapper',
      'cli',
      'binary',
      'path',
      'account',
      'switch',
      'custom command',
      'claude',
      'codex',
      'gemini',
      'grok',
      'opencode',
      'cursor'
    ]
  },
  vanillaLaunch: {
    key: 'settings.agents.rows.vanillaLaunch.title',
    keywords: [
      'launch mode',
      'subscription',
      'vanilla',
      'gateway',
      'gateway model',
      'provider',
      'default',
      'default model',
      'anthropic',
      'openai',
      'copilot',
      'env',
      'credentials',
      'clear env'
    ]
  },
  messagingDefault: {
    key: 'settings.agents.rows.messagingDefault.title',
    keywords: ['agent', 'message', 'messaging', 'default', 'project', 'send', 'reply', 'orchestration']
  },
  permissionMode: {
    key: 'settings.agents.rows.permissionMode.title',
    keywords: [
      'permission',
      'mode',
      'auto',
      'auto mode',
      'accept edits',
      'plan',
      'bypass',
      'approve',
      'ask',
      'claude',
      'grok',
      'gemini',
      'codex',
      'cursor',
      'approval',
      'shift tab'
    ]
  },
  hookReplyApprovals: {
    key: 'settings.agents.rows.hookReplyApprovals.title',
    keywords: ['approve', 'deny', 'approval', 'permission', 'hook', 'phone', 'canvas', 'one click', 'claude']
  },
  autoHideFinishedSubagentCards: {
    key: 'settings.agents.rows.autoHideFinishedSubagentCards.title',
    keywords: [
      'subagent',
      'card',
      'fan out',
      'hide',
      'remove',
      'finished',
      'done',
      'clutter',
      'canvas',
      'task'
    ]
  },
  controlConfirm: {
    key: 'settings.agents.rows.controlConfirm.title',
    keywords: [
      'confirm',
      'confirmation',
      'dialog',
      'ask',
      "don't ask again",
      'dont ask again',
      'waive',
      'write',
      'close',
      'destructive',
      'canvas control',
      'bypass',
      'permission mode',
      'security'
    ]
  },
  nodeIdentity: {
    key: 'settings.agents.rows.nodeIdentity.title',
    keywords: [
      'identity',
      'verify',
      'verified',
      'node',
      'token',
      'canvas control',
      'context link',
      'security',
      'hook',
      'strict',
      'refused'
    ]
  },
  browserControl: {
    key: 'settings.agents.rows.browserControl.title',
    keywords: [
      'browser',
      'control',
      'drive',
      'driving',
      'stop',
      'revoke',
      'agent',
      'web',
      'page',
      'security'
    ]
  },
  hibernation: {
    key: 'settings.agents.rows.hibernation.title',
    keywords: [
      'hibernate',
      'eco',
      'idle',
      'memory',
      'ram',
      'exit',
      'resume',
      'offscreen',
      'minutes',
      'sleep',
      'pause',
      'paused',
      'restart',
      'reopen'
    ]
  }
} as const
/**
 * The per-project capability rows are GENERATED from PROJECT_CAPABILITIES — search registry
 * included. A hand-written row list that happens to match the union is the documented
 * claims-ahead-of-mechanism failure: agent messaging's row (its PR 6) must appear by adding a copy
 * entry, and agents-capabilities.test.tsx iterates the array so a capability without a row is red.
 */
const CAPABILITY_ROWS = PROJECT_CAPABILITIES.map((cap) => ({
  cap,
  title: PROJECT_CAPABILITY_COPY[cap].label,
  keywords: [
    'project',
    'capability',
    'permission',
    ...PROJECT_CAPABILITY_COPY[cap].label.toLowerCase().split(/\s+/)
  ]
}))
const CAPABILITY_CHOICES: readonly CapabilityChoice[] = ['default', 'on', 'off']

/**
 * Every fact in this sentence is DERIVED from the per-agent mapping (`@shared/agents/approval-mode`):
 * the agent list from `PERMISSION_MODE_CAPABLE`, and the admission of where a mode does NOT apply
 * from `modeSupported`. Hardcoding either would leave a second list to keep in sync, and its failure
 * mode is a settings page promising Plan on an agent that is quietly running in its own default.
 *
 * Assembled by joining the non-empty parts, so the middle sentence disappears cleanly (no double
 * space) the day every capable agent expresses every mode.
 */
function permissionModeDescription(): string {
  // The gaps are not a constant: codex's `--ask-for-approval` vocabulary changes between releases
  // (it lost `untrusted`, and with it "Ask each time", in 0.149.0), so the sentence is derived
  // against the codex ON THIS MACHINE rather than a table pinned to one release. Read at render;
  // the probe is warmed at boot, so by the time Settings can be opened this is the real answer,
  // and an unprobed read degrades to the baseline vocabulary like every other consumer.
  const caps = codexApprovalCaps()
  return [
    `The mode ${permissionModeAgentsLabel()} terminal sessions start in; other agents ignore it.`,
    unsupportedModesNote(caps),
    'Shift+Tab still switches modes at any time. Projects can override this from the tab ⌄ menu.'
  ]
    .filter(Boolean)
    .join(' ')
}

/**
 * The waivable destructive verbs, in the order they are shown, with a sentence each.
 *
 * The LIST comes from the shared table (`CONFIRM_WAIVABLE_VERBS`) rather than being typed here, so
 * a verb that becomes waivable cannot be waivable-in-code and invisible-in-Settings — a loosening
 * the user cannot see or revoke is exactly what this section exists to prevent. An unknown verb
 * falls back to its own name, which is honest and ugly rather than absent.
 */
const CONTROL_CONFIRM_VERB_COPY: Record<string, { label: string; description: string }> = {
  write: {
    label: 'Ask before an agent types into a node',
    description:
      'The `write` verb sends text straight into another session\u2019s terminal. Waiving the dialog lets any canvas-control agent do that without asking.'
  },
  close: {
    label: 'Ask before an agent closes nodes',
    description:
      'The `close` verb deletes nodes and ends their terminal sessions. Waiving the dialog lets any canvas-control agent do that without asking.'
  },
  'open-project': {
    label: 'Ask before an agent opens or adds a project',
    description:
      'The `open-project` verb lets an agent open sessions in another project you already have, or add a folder as a new project, so it can start work there. Waiving the dialog lets any canvas-control agent do that without asking.'
  }
}

const CONTROL_CONFIRM_CHOICES = ['ask', 'never'] as const
type ControlConfirmChoice = (typeof CONTROL_CONFIRM_CHOICES)[number]

const CONTROL_CONFIRM_LABELS: Record<ControlConfirmChoice, string> = {
  ask: 'Always ask',
  // Says "permanently" in the option itself: the only other way to waive one of these is the
  // dialog's own checkbox, which is bounded by the app's lifetime, and the difference between the
  // two is the entire safety story.
  never: 'Never ask (permanently, this computer)'
}

// The agents claude's version gate does NOT apply to — every other capable agent. Module level: the
// capable list cannot change while the app runs.
const otherModeAgents = permissionModeAgentIds({ exclude: ['claude'] })

/**
 * `settings.hookIdentityStrict` is the only OPTIONAL key in `Settings`, because it is a TRI-state
 * and `undefined` ("follow the dated rollout") is a different answer from `false` ("never enforce").
 * A `Switch` cannot express that — it would silently collapse the default into one of the two
 * explicit choices the first time anybody touched it — so this row is a `Select` over three values
 * that map back onto `boolean | undefined`.
 *
 * The date is imported, never typed here: a Settings page promising a different cutoff from the one
 * the hook server enforces is the worst possible version of this feature.
 */
const IDENTITY_CHOICES = ['auto', 'on', 'off'] as const
type IdentityChoice = (typeof IDENTITY_CHOICES)[number]

const IDENTITY_LABELS: Record<IdentityChoice, string> = {
  auto: `Automatic (required from ${NODE_IDENTITY_STRICT_DATE})`,
  on: 'Always required',
  off: 'Not required'
}

function identityChoice(value: boolean | undefined): IdentityChoice {
  return value === undefined ? 'auto' : value ? 'on' : 'off'
}

function identityValue(choice: IdentityChoice): boolean | undefined {
  return choice === 'auto' ? undefined : choice === 'on'
}

export function AgentsSection({ isActive }: { isActive: boolean }): React.JSX.Element {
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
  const entries = useMemo(
    () => [
      ...Object.values(rows),
      ...CAPABILITY_ROWS.map(({ title, keywords }) => ({ title, keywords }))
    ],
    [rows]
  )

  const settings = useSettings((s) => s.settings)
  const update = useSettings((s) => s.update)
  // Per-project capability rows act on the ACTIVE project. Subscribed (not getState()) so an
  // off-toggle re-renders immediately — and consumers read the switch per call from the store,
  // never from a snapshot taken when a lease started (agents-capabilities.test.tsx "takes effect
  // LIVE"; browser PR 4 / messaging PR 6 rely on that shape).
  // Destructive canvas-control confirmations (@shared/control-confirm). Read through the SANITIZER,
  // never raw: `settings.json` is hand-editable and a bogus entry there must degrade to "ask", so
  // the section shows what the GATES will actually honour rather than what the file happens to say.
  const waivers = sanitizeControlConfirmWaivers(settings.controlConfirmWaivers)
  const waivableVerbs = [...CONFIRM_WAIVABLE_VERBS]
  // Subscribed, not getState(): granting or revoking an app-run waiver must repaint this row.
  const sessionWaivedVerbs = useControlConfirm((s) => s.sessionWaived)
  /** Persist a PERMANENT waiver. Writes the sanitized shape back, so a hand-edited file is
   *  normalized by the first UI touch instead of silently surviving beside it. */
  const setAlwaysWaived = (verb: string, on: boolean): void => {
    const next = on
      ? [...new Set([...(waivers.always ?? []), verb])]
      : (waivers.always ?? []).filter((v) => v !== verb)
    update({
      controlConfirmWaivers: sanitizeControlConfirmWaivers({ ...waivers, always: next })
    })
  }
  const setBypassWaived = (on: boolean): void => {
    update({
      controlConfirmWaivers: sanitizeControlConfirmWaivers({ ...waivers, bypassMode: on })
    })
  }
  // Every project the store holds, CLOSED ones included: `closeProject` keeps the project, its
  // nodes and its running sessions, so a closed project is parked and its waiver is still live.
  // Subscribed, so revoking one repaints the list.
  const allProjects = useProjects((s) => s.projects)
  /**
   * The per-project waivers, as ROWS the user can read: a project id alone names nothing they
   * recognise. A waiver whose project is gone is not rendered as an unnamed row — it is pruned on
   * the next write, exactly as `sidebarCollapsedItems` keys are (`pruneControlConfirmWaivers`).
   */
  const projectWaiverRows = Object.entries(waivers.projects ?? {})
    .map(([id, verbs]) => ({
      id,
      name: allProjects.find((p) => p.id === id)?.name,
      verbs
    }))
    .filter((r) => r.name !== undefined)
    .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''))
  /** Revoke one verb's per-project waiver. Prunes dead projects in the same write, through the one
   *  merge every per-project writer shares (`withProjectWaiver`). */
  const revokeProjectWaiver = (projectId: string, verb: string): void => {
    const live = new Set(allProjects.map((p) => p.id))
    update({ controlConfirmWaivers: withProjectWaiver(waivers, projectId, verb, false, live) })
  }
  const activeProjectId = useProjects((s) => s.activeProjectId)
  const activeProject = useProjects((s) => s.projects.find((p) => p.id === activeProjectId))
  const setProjectCapability = useProjects((s) => s.setProjectCapability)
  const resetProjectCapabilityToDefault = useProjects((s) => s.resetProjectCapabilityToDefault)
  // The kill row (Task 6.4): browser nodes an agent is driving RIGHT NOW, across every open project,
  // each with a Stop and one Stop-all. The precedent is the identity escape hatch — a user who
  // notices their browser doing something needs one obvious place to end it, not a per-node hunt.
  // Stop revokes for real in main (detach + drop), and there is deliberately NO global "disable
  // browser control" toggle here: one concept, one switch (the per-project capability below).
  const browserLeaseEntries = useBrowserLease((s) => s.entries)
  const nodeTitleById = (id: string): string => {
    for (const p of allProjects) {
      const n = p.nodes.find((node) => node.id === id)
      if (n) return n.title || id
    }
    return id
  }
  const drivenRows = [...drivingNodeIds(browserLeaseEntries, Date.now())].map((nodeId) => ({
    nodeId,
    nodeTitle: nodeTitleById(nodeId),
    ownerTitle: nodeTitleById(browserLeaseEntries[nodeId].ownerNodeId)
  }))
  const agentRows: { id: AgentId; label: string; isBuiltin: boolean }[] = [
    ...BUILTIN_AGENT_IDS.map((id) => ({ id, label: AGENT_CONFIG[id].label, isBuiltin: true })),
    ...settings.customAgents.map((c) => ({ id: c.id, label: c.label || c.id, isBuiltin: false }))
  ]

  // The LOCAL Claude CLI's capabilities (the same memoized probe the launch path uses — no extra
  // IPC). `Auto` is silently dropped on a CLI older than the floor (it exits 1 on the flag), and a
  // setting that quietly does nothing reads as a broken setting — so say it where it's picked.
  // Remote (SSH) projects run their own CLI; this note is about the machine running the app.
  const [cliCaps, setCliCaps] = useState<ClaudeCliCaps | null>(null)
  useEffect(() => {
    let alive = true
    void ensureClaudeCliCaps().then((c) => {
      if (alive) setCliCaps(c)
    })
    return () => {
      alive = false
    }
  }, [])
  // Only when the probe actually READ a version: an unknown version (probe failed / no CLI) is not
  // evidence of an old CLI, and guessing would be its own kind of wrong.
  const autoNote =
    settings.claudePermissionMode === 'auto' && cliCaps?.version && !cliCaps.autoPermissionMode
      ? [
          `Your Claude CLI (${cliCaps.version.split(/\s+/)[0]}) doesn't support Auto — Claude sessions start in "${PERMISSION_MODE_LABELS.manual}". Requires Claude Code ${AUTO_PERMISSION_MODE_MIN_VERSION} or newer.`,
          // The bystanders are derived, AND so is the verb agreeing with them: a hardcoded "are"
          // degrades to "Grok are unaffected." if the capable list ever narrows to two, and the
          // sentence has to disappear entirely if claude is ever the only capable agent.
          otherModeAgents.length
            ? `${permissionModeAgentsLabel({ exclude: ['claude'] })} ${otherModeAgents.length === 1 ? 'is' : 'are'} unaffected.`
            : ''
        ]
          .filter(Boolean)
          .join(' ')
      : undefined

  // Whatever "new agent node" is bound to; '' when unbound, and the sentence drops the chord.
  const agentChip = chipFor('node.newAgent')

  return (
    <SettingsSection
      id="agents"
      title={t('settings.agents.title')}
      description={
        agentChip
          ? t('settings.agents.sectionDescriptionWithDefault', { agent: agentChip })
          : t('settings.agents.sectionDescription')
      }
      isActive={isActive}
      searchEntries={entries}
    >
      <SearchableRow {...rows.agents}>
        <FieldRow
          label={t('settings.agents.rows.agents.title')}
          description={t('settings.agents.description')}
          control={null}
        />
        <div className="space-y-2">
          {agentRows.map((row) => {
            const enabled = isAgentEnabled(settings, row.id)
            const isDefault = settings.defaultAgent === row.id
            return (
              <div key={row.id} className="flex items-center gap-3 py-1.5">
                <AgentIcon agentId={row.id} size={18} />
                <span className="flex-1 text-[13px] text-text">{row.label}</span>
                {/* Custom agents included — a user living on their own CLI aliases must be able
                    to make one the default (⌘⇧C / Add menu) instead of a disabled claude. */}
                <Button
                  variant={isDefault ? 'primary' : 'default'}
                  aria-pressed={isDefault}
                  onClick={() => update(setDefaultAgent(settings, row.id))}
                >
                  {isDefault ? t('settings.agents.defaultAgentBadge') : t('settings.agents.setDefaultAgent')}
                </Button>
                <SegmentedPill<'enabled' | 'disabled'>
                  value={enabled ? 'enabled' : 'disabled'}
                  ariaLabel={t('settings.agents.showAgentInMenusAria', { agent: row.label })}
                  options={[
                    { value: 'enabled', label: t('settings.agents.shownInMenus') },
                    { value: 'disabled', label: t('settings.agents.hiddenInMenus') }
                  ]}
                  onChange={(v) => update(setAgentEnabled(settings, row.id, v === 'enabled'))}
                />
              </div>
            )
          })}
        </div>
      </SearchableRow>
      <SearchableRow {...rows.integrations}>
        <FieldRow
          label={t('settings.agents.rows.integrations.title')}
          description={t('settings.agents.integrationsDescription')}
          control={null}
        />
        <IntegrationSettings />
      </SearchableRow>
      <SearchableRow {...rows.launchCommands}>
        <FieldRow
          label={t('settings.agents.rows.launchCommands.title')}
          description={t('settings.agents.launchCommandsDescription')}
          control={null}
        />
        <div className="space-y-2">
          {BUILTIN_AGENT_IDS.map((id: BuiltinAgentId) => (
            <div key={id} className="flex items-center gap-3 py-1">
              <AgentIcon agentId={id} size={18} />
              <span className="w-28 text-[13px] text-text">{AGENT_CONFIG[id].label}</span>
              <Input
                className="w-72"
                placeholder={AGENT_CONFIG[id].launchCmd}
                aria-label={`${AGENT_CONFIG[id].label} launch command`}
                value={settings.agentLaunchCommands[id] ?? ''}
                onChange={(e) => {
                  // A cleared field DELETES its key rather than storing '' — absent is the one
                  // spelling of "default" every consumer (and a hand-read settings.json) agrees on.
                  const next = { ...settings.agentLaunchCommands }
                  if (e.target.value) next[id] = e.target.value
                  else delete next[id]
                  update({ agentLaunchCommands: next })
                }}
              />
              {hasSharedIdentity(id) && settings.agentLaunchCommands[id]?.trim() ? (
                <span className="text-[12px] text-muted">
                  Overrides the managed per-node launcher — sessions join as plain clients.
                </span>
              ) : null}
              {hasSharedIdentity(id) && codexIdentityCapsNow().unavailableReason === 'unsupported-platform' ? (
                <span className="text-[12px] text-muted">
                  Shared Codex app-server is not available on Windows yet; each node runs its own codex.
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </SearchableRow>
      <SearchableRow {...rows.vanillaLaunch}>
        <FieldRow
          label={t('settings.agents.rows.vanillaLaunch.title')}
          description={t('settings.agents.launchModeDescription')}
          control={
            <Select
              aria-label={t('settings.agents.launchModeAria')}
              value={settings.agentLaunchMode}
              onChange={(e) =>
                update({ agentLaunchMode: e.target.value as AgentLaunchMode })
              }
            >
              <option value="gateway">{t('settings.agents.launchGateway')}</option>
              <option value="gateway-model">
                {settings.modelGatewayDefaultModel
                  ? t('settings.agents.launchGatewayModel', { model: settings.modelGatewayDefaultModel })
                  : t('settings.agents.launchGatewayUnconfigured')}
              </option>
              <option value="subscription">{t('settings.agents.launchSubscription')}</option>
            </Select>
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.permissionMode}>
        <FieldRow
          label={t('settings.agents.rows.permissionMode.title')}
          note={autoNote}
          description={permissionModeDescription()}
          control={
            <Select
              aria-label={t('settings.agents.rows.permissionMode.title')}
              value={settings.claudePermissionMode}
              onChange={(e) =>
                update({ claudePermissionMode: e.target.value as AgentPermissionMode })
              }
            >
              {ALL_PERMISSION_MODES.map((m) => (
                <option key={m} value={m}>
                  {m === 'bypassPermissions'
                    ? `${PERMISSION_MODE_LABELS[m]} ⚠︎`
                    : PERMISSION_MODE_LABELS[m]}
                </option>
              ))}
            </Select>
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.hookReplyApprovals}>
        <FieldRow
          label={t('settings.agents.rows.hookReplyApprovals.title')}
          description="Phone/canvas Approve & Deny answer Claude's permission hook directly; the interactive prompt appears after 45s if unanswered. Claude terminal sessions only."
          control={
            <Switch
              checked={settings.hookReplyApprovals}
              ariaLabel="One-click hook-reply approvals"
              onChange={(on) => update({ hookReplyApprovals: on })}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.autoHideFinishedSubagentCards}>
        <FieldRow
          label={t('settings.agents.rows.autoHideFinishedSubagentCards.title')}
          description="Remove a subagent's card from the canvas as soon as that subagent finishes, instead of keeping it until the agent's next turn. Cards for subagents that are still running are never removed."
          control={
            <Switch
              checked={settings.autoHideFinishedSubagentCards}
              ariaLabel="Hide finished subagent cards"
              onChange={(on) => update({ autoHideFinishedSubagentCards: on })}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.controlConfirm}>
        <div className="space-y-4">
          {waivableVerbs.map((v) => {
            const copy =
              CONTROL_CONFIRM_VERB_COPY[v] ??
              ({ label: `Ask before an agent runs \`${v}\``, description: '' } as const)
            const sessionWaived = sessionWaivedVerbs.includes(v)
            const always = (waivers.always ?? []).includes(v)
            // Named per project below rather than counted here: "waived in 3 projects" tells the
            // user a number when what they need is which ones.
            const inProjects = projectWaiverRows.filter((r) => r.verbs.includes(v))
            return (
              <FieldRow
                key={v}
                label={copy.label}
                description={copy.description}
                // A live app-run waiver is a STATE, not help text — the warning accent is right,
                // and it must name how to end it, because the dialog that granted it is gone.
                note={
                  always
                    ? undefined
                    : sessionWaived
                      ? 'Waived until nodeterm quits, in every project (you chose that in an agent\u2019s dialog). Revoke restores the dialog now.'
                      : inProjects.length
                        ? `Waived permanently in ${inProjects.map((r) => `"${r.name}"`).join(', ')} \u2014 revoke below.`
                        : undefined
                }
                control={
                  <div className="flex items-center gap-2">
                    {sessionWaived && !always ? (
                      <Button
                        variant="default"
                        onClick={() => useControlConfirm.getState().revokeForSession(v)}
                      >
                        Revoke
                      </Button>
                    ) : null}
                    <Select
                      aria-label={copy.label}
                      value={always ? 'never' : 'ask'}
                      onChange={(e) => setAlwaysWaived(v, e.target.value === 'never')}
                    >
                      {CONTROL_CONFIRM_CHOICES.map((c) => (
                        <option key={c} value={c}>
                          {CONTROL_CONFIRM_LABELS[c]}
                        </option>
                      ))}
                    </Select>
                  </div>
                }
              />
            )
          })}
          {projectWaiverRows.length > 0 && (
            <FieldRow
              label="Waived in these projects"
              // The rule this section exists for: every loosening stays visible and revocable. A
              // per-project waiver is granted from a DIALOG (gone the moment it is answered) or a
              // project tab's menu (one project at a time) — so this row is the one consolidated list
              // of grants across every project.
              description="You chose \u201cDon\u2019t ask again for agents in \u2026\u201d in an agent’s dialog, or switched it on in the project tab’s “Agents may, without asking” menu. These survive restarts, and apply only to agents running in the project named. A project you delete takes its waivers with it."
              control={
                <div className="flex flex-col items-end gap-2">
                  {projectWaiverRows.map((row) =>
                    row.verbs.map((v) => (
                      <div key={`${row.id}:${v}`} className="flex items-center gap-2">
                        <span className="text-[12px] opacity-70">
                          {CONTROL_CONFIRM_VERB_COPY[v]?.label ?? v} \u2014 {row.name}
                        </span>
                        <Button
                          variant="default"
                          onClick={() => revokeProjectWaiver(row.id, v)}
                        >
                          Revoke
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              }
            />
          )}
          <FieldRow
            label="Also skip them while your permission mode is Bypass"
            description="When YOUR global permission mode (above) is Bypass permissions, treat that as covering these dialogs too. A project that overrides the mode never counts \u2014 an override is saved in .nodeterm/project.json and travels to everyone who clones the repo, so a repository you cloned must not be able to switch your confirmations off."
            control={
              <Switch
                checked={waivers.bypassMode === true}
                ariaLabel="Skip destructive canvas-control confirmations in Bypass permissions mode"
                onChange={setBypassWaived}
              />
            }
          />
        </div>
      </SearchableRow>
      <SearchableRow {...rows.nodeIdentity}>
        <FieldRow
          label="Require verified node identity for canvas control"
          description={t('settings.agents.description')}
          control={
            <Select
              aria-label="Require verified node identity"
              value={identityChoice(settings.hookIdentityStrict)}
              onChange={(e) =>
                update({ hookIdentityStrict: identityValue(e.target.value as IdentityChoice) })
              }
            >
              {IDENTITY_CHOICES.map((c) => (
                <option key={c} value={c}>
                  {IDENTITY_LABELS[c]}
                </option>
              ))}
            </Select>
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.browserControl}>
        <FieldRow
          label="Browser control"
          description="Browser nodes an agent is driving right now, across every open project. Stop ends it immediately — the debugger is detached and the agent is told you stopped it, so it reports that instead of retrying. One place to stop it, so you never have to hunt from node to node."
          control={
            <Button
              variant="default"
              disabled={drivenRows.length === 0}
              onClick={() => window.nodeTerminal.browser.stopAll()}
            >
              Stop all
            </Button>
          }
        />
        <div className="space-y-2">
          {drivenRows.length === 0 ? (
            <span className="text-[13px] text-muted">No agent is driving a browser node right now.</span>
          ) : (
            drivenRows.map((r) => (
              <div key={r.nodeId} className="flex items-center gap-3 py-1">
                <span className="flex-1 text-[13px] text-text">
                  {r.ownerTitle} is driving {r.nodeTitle}
                </span>
                <Button variant="default" onClick={() => window.nodeTerminal.browser.stop(r.nodeId)}>
                  Stop
                </Button>
              </div>
            ))
          )}
        </div>
      </SearchableRow>
      <SearchableRow {...rows.messagingDefault}>
        <FieldRow
          label={rows.messagingDefault.title}
          description="What agent messaging does in a project whose settings do not say. It is stored on this computer only, never in a project file: a project set to on or off keeps its own setting, and a project file that turns messaging on still asks you to confirm it before it takes effect here."
          control={
            <Switch
              checked={settings.agentMessagingDefault === true}
              ariaLabel={rows.messagingDefault.title}
              onChange={(on) => update({ agentMessagingDefault: on })}
            />
          }
        />
      </SearchableRow>
      {CAPABILITY_ROWS.map(({ cap, title, keywords }) =>
        capabilityHasMachineDefault(cap) ? (
          // A capability with a machine default has THREE file states (on / off / use default), so
          // it is a choice plus a sentence saying what is in effect — see lib/capabilityChoice.
          <SearchableRow key={cap} title={title} keywords={keywords}>
            <FieldRow
              label={title}
              note={capabilityStatusText(activeProject, cap, settings)}
              description={`${PROJECT_CAPABILITY_COPY[cap].description} ${PROJECT_CAPABILITY_COPY[cap].cloneWarning}`}
              control={
                <Select
                  aria-label={title}
                  disabled={!activeProject}
                  value={capabilityChoiceOf(activeProject, cap)}
                  onChange={(e) => {
                    if (!activeProject) return
                    applyCapabilityChoice(
                      { setProjectCapability, resetProjectCapabilityToDefault },
                      activeProject.id,
                      cap,
                      e.target.value as CapabilityChoice
                    )
                  }}
                >
                  {CAPABILITY_CHOICES.map((c) => (
                    <option key={c} value={c}>
                      {capabilityChoiceLabel(c, capabilityMachineDefault(settings, cap))}
                    </option>
                  ))}
                </Select>
              }
            />
          </SearchableRow>
        ) : (
          <SearchableRow key={cap} title={title} keywords={keywords}>
            <FieldRow
              label={title}
              note={
                activeProject
                  ? `Applies to the active project: ${activeProject.name}.`
                  : 'Open a project to change this — the switch belongs to a project, not to the app.'
              }
              // The description carries the capability's own copy AND its cloneWarning — the same
              // "this is in the project file" sentence the clone notice shows, so the two git-shared
              // grants read alike wherever they appear (pinned by agents-capabilities.test.tsx).
              description={`${PROJECT_CAPABILITY_COPY[cap].description} ${PROJECT_CAPABILITY_COPY[cap].cloneWarning}`}
              control={
                <Switch
                  // The raw FILE FLAG is the right thing for a settings switch to display — it
                  // mirrors what is written in .nodeterm/project.json. It is NEVER the grant check:
                  // grants require the machine-local 'kept' too (projectCapabilityGrantedFor).
                  checked={projectCapabilityFlagInFile(activeProject, cap)}
                  ariaLabel={title}
                  disabled={!activeProject}
                  onChange={(on) => {
                    // The ONE strict setter: literal `true` on, field deleted on off. Writing the
                    // value any other way (a string, a stored false) is the bug the validators
                    // exist to refuse.
                    if (activeProject) setProjectCapability(activeProject.id, cap, on)
                    // Turning browser control OFF revokes any live lease in this project immediately
                    // (Task 6.4) — detach now, don't wait for the next drive to read the switch. Read
                    // live off this toggle, never cached at lease start.
                    if (activeProject && cap === 'agentBrowserControl' && !on) {
                      window.nodeTerminal?.browser?.stopProject?.(activeProject.id)
                    }
                  }}
                />
              }
            />
          </SearchableRow>
        )
      )}
      <SearchableRow {...rows.hibernation}>
        <FieldRow
          label="Hibernate idle agents"
          description="Exit an agent CLI that has been idle and offscreen this long, freeing its memory; the conversation resumes automatically when you view the node. While this is on, the terminal view of an offscreen agent is kept until the agent hibernates, so the bigger saving happens first. Scheduled, /loop and /cron agents — and sessions with subagents still running — are never touched."
          control={
            <div className="flex items-center gap-2">
              <Switch
                checked={settings.agentHibernationEnabled}
                ariaLabel="Hibernate idle agents"
                onChange={(on) => update({ agentHibernationEnabled: on })}
              />
              <NumberField
                value={settings.agentHibernationIdleMinutes}
                ariaLabel="Hibernate after minutes"
                disabled={!settings.agentHibernationEnabled}
                min={5}
                max={600}
                step={5}
                // A cleared/invalid field falls back to the default rather than 0 (zero minutes
                // would mean "the instant a turn ends"). Deliberately no floor mid-typing: a
                // per-keystroke `Math.max(5, v)` makes 45 untypable (4 snaps to 5, then 55). The
                // real guard is `planHibernation`, which refuses any non-positive window outright.
                onChange={(v) => update({ agentHibernationIdleMinutes: v || 30 })}
              />
              <span className="text-[13px] text-muted">min</span>
            </div>
          }
        />
        <FieldRow
          label="Keep paused after closing"
          description="When Eco hibernates a session, also keep it paused across a project/app reopen instead of auto-resuming — only an explicit Resume brings it back. Manual “Pause session” always persists this way, whatever this is set to."
          control={
            <Switch
              checked={settings.agentHibernationPersistAcrossRestart}
              ariaLabel="Keep paused after closing"
              disabled={!settings.agentHibernationEnabled}
              onChange={(on) => update({ agentHibernationPersistAcrossRestart: on })}
            />
          }
        />
      </SearchableRow>
    </SettingsSection>
  )
}
