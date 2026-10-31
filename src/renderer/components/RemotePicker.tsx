import { t as menuT } from '../i18n/runtime'
import { createPortal } from 'react-dom'
import { useSshServers } from '../state/sshServers'
import type { SshServer } from '@shared/ssh'

interface RemotePickerProps {
  x: number
  y: number
  onPick: (server: SshServer) => void
  onManage: () => void
  onClose: () => void
}

/** A small portal menu listing saved SSH servers; picking one opens a remote terminal. */
export function RemotePicker({ x, y, onPick, onManage, onClose }: RemotePickerProps) {
  const servers = useSshServers((s) => s.servers)
  return createPortal(
    <>
      <div className="ctx-backdrop" onClick={onClose} />
      <div className="ctx-menu" style={{ top: y, left: x }} onClick={(e) => e.stopPropagation()}>
        {servers.length === 0 ? (
          <button
            className="ctx-item"
            onClick={() => {
              onManage()
              onClose()
            }}
          >{menuT('menuItems.addSshServer')}</button>
        ) : (
          <>
            {servers.map((s) => (
              <button
                key={s.id}
                className="ctx-item"
                title={`${s.user}@${s.host}`}
                onClick={() => {
                  onPick(s)
                  onClose()
                }}
              >
                {s.label}
              </button>
            ))}
            <div className="ctx-sep" />
            <button
              className="ctx-item"
              onClick={() => {
                onManage()
                onClose()
              }}
            >{menuT('menuItems.manageSshServers')}</button>
          </>
        )}
      </div>
    </>,
    document.body
  )
}
