import { useMemo, useState } from 'react'
import { useI18n } from '@renderer/i18n/useI18n'
import { useEntitlement } from '../../../state/entitlement'
import { useProjects } from '../../../state/projects'
import { relayShareGrantCopy } from '../../../lib/relayHostShare'
import { useHostShareChoice } from '../../../lib/useHostShareChoice'
import { thisMachine } from '../../../lib/machineName'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { Button } from '@renderer/ui/Button'
import { CopyButton } from '@renderer/ui/CopyButton'
import { Input } from '@renderer/ui/Input'
import { Select } from '@renderer/ui/Select'

const ROW_DEFS = {
  allow: {
    key: 'settings.remote.rows.allow.title',
    keywords: ['remote', 'host', 'share', 'pairing', 'ssh']
  },
  connect: {
    key: 'settings.remote.rows.connect.title',
    keywords: ['remote', 'connect', 'client', 'pairing', 'code']
  }
} as const

export function RemoteSection({
  isActive,
  onClose
}: {
  isActive: boolean
  onClose: () => void
}): React.JSX.Element {
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

  const isPremium = useEntitlement((s) => s.isPremium)
  const projects = useProjects((s) => s.projects)
  const activeProjectId = useProjects((s) => s.activeProjectId)
  const [hostOffer, setHostOffer] = useState('')
  const [hostBusy, setHostBusy] = useState(false)
  const [remoteError, setRemoteError] = useState('')
  const [clientCode, setClientCode] = useState('')
  const [connecting, setConnecting] = useState(false)

  // Which project this host shares with the joiner. Default = the active project (hoisted first
  // by hostShareOptions); the user can pick any other OPEN project before minting the offer.
  // A project whose folder is the disk root or the home directory (or contains it) is offered
  // disabled with the host's reason, and never falls back to an unscoped invite (useHostShareChoice).
  const {
    options: shareOptions,
    shareId: effectiveShareId,
    setShareId,
    sharedName,
    refusal: shareRefusal
  } = useHostShareChoice(projects, activeProjectId)
  // HOST side — the NEW relay tunnel (`relayHost`). `start()` returns the single-use pairing offer;
  // a connecting peer's approval + canvas sync are handled globally by Canvas (`relayHost.onPeerPending`
  // / `relayHost.confirm`, and the CorePlatform seq-stamped reflector — no old canvas-mirror flag).
  const startHosting = async () => {
    setRemoteError('')
    setHostBusy(true)
    try {
      const { offer } = await window.nodeTerminal.relayHost.start(effectiveShareId || undefined)
      setHostOffer(offer)
    } catch (err) {
      setRemoteError((err as Error).message)
      setHostBusy(false)
    }
  }
  const stopHosting = async () => {
    await window.nodeTerminal.relayHost.stop()
    setHostOffer('')
    setHostBusy(false)
  }
  // CLIENT side — hand the offer to Canvas, which runs the relay connect → SAS compare → open-tab
  // flow (the same `connectOffer` the dock/palette "New Remote Connection" uses). We deliberately do
  // NOT call `relayClient.connect` here, so the SAS handshake lives in exactly one place.
  const connectToHost = () => {
    const code = clientCode.trim()
    if (!code) return
    setRemoteError('')
    setConnecting(true)
    setClientCode('')
    window.dispatchEvent(
      new CustomEvent('nodeterm:open-remote-terminal', { detail: { offer: code } })
    )
    setConnecting(false)
    onClose()
  }
  return (
    <SettingsSection
      id="remote"
      title={t('settings.remote.title')}
      description={t('settings.remote.description')}
      isActive={isActive}
      searchEntries={entries}
    >
      <SearchableRow {...rows.allow}>
        <div className="space-y-3">
          <h4 className="text-[13px] font-medium text-text">Allow remote access</h4>
          {isPremium ? (
            hostOffer ? (
              <div className="space-y-2">
                <p className="text-sm text-muted">
                  {sharedName ? (
                    <>
                      Sharing <strong className="text-text">{sharedName}</strong>.{' '}
                    </>
                  ) : null}
                  {relayShareGrantCopy(sharedName || null, thisMachine())} Share this pairing code
                  with the other device (single use):
                </p>
                <FieldRow
                  label="Pairing code"
                  control={
                    <Input
                      className="w-72"
                      readOnly
                      value={hostOffer}
                      onFocus={(e) => e.target.select()}
                    />
                  }
                />
                <div className="flex gap-2">
                  <CopyButton text={hostOffer} label="Copy code" />
                  <Button onClick={() => void stopHosting()}>Stop sharing</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {shareOptions.length > 1 ? (
                  <FieldRow
                    label="Project to share"
                    control={
                      <Select
                        className="w-72"
                        value={effectiveShareId}
                        onChange={(e) => setShareId(e.target.value)}
                      >
                        {shareOptions.map((o) => (
                          <option key={o.id} value={o.id} disabled={!!o.refusal}>
                            {o.refusal ? `${o.name} (cannot be shared)` : o.name}
                          </option>
                        ))}
                      </Select>
                    }
                  />
                ) : null}
                <p className="text-sm text-muted">
                  {sharedName && shareOptions.length <= 1 ? (
                    <>
                      Sharing <strong className="text-text">{sharedName}</strong>.{' '}
                    </>
                  ) : null}
                  {relayShareGrantCopy(sharedName || null, thisMachine())}
                </p>
                {shareRefusal ? <p className="text-sm text-danger">{shareRefusal}</p> : null}
                <Button disabled={hostBusy || !!shareRefusal} onClick={() => void startHosting()}>
                  {hostBusy ? 'Starting…' : 'Allow remote access'}
                </Button>
              </div>
            )
          ) : (
            <p className="text-sm text-muted">
              Hosting this machine requires nodeterm Pro — upgrade above. Connecting to a host you
              were given a code for is free.
            </p>
          )}
        </div>
      </SearchableRow>
      <SearchableRow {...rows.connect}>
        <div className="mt-4 space-y-3">
          <h4 className="text-[13px] font-medium text-text">Connect to a host</h4>
          <FieldRow
            label="Pairing code"
            control={
              <Input
                className="w-72"
                placeholder="paste the host's code"
                value={clientCode}
                onChange={(e) => setClientCode(e.target.value)}
              />
            }
          />
          <Button disabled={connecting || !clientCode.trim()} onClick={() => void connectToHost()}>
            {connecting ? (
              <>
                <span className="ui-spinner" aria-hidden /> Connecting…
              </>
            ) : (
              'Connect'
            )}
          </Button>
          {remoteError ? (
            <p className="text-sm" style={{ color: 'var(--warn)' }}>
              {remoteError}
            </p>
          ) : null}
        </div>
      </SearchableRow>
    </SettingsSection>
  )
}
