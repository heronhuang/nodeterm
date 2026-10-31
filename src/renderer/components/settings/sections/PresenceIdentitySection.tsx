import { useMemo, useState } from 'react'
import { NAME_MAX_LEN, PRESENCE_COLORS } from '@shared/presence'
import { loadIdentity } from '../../../state/presence'
import { setMeAll } from '../../../session/session'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { Button } from '@renderer/ui/Button'
import { Input } from '@renderer/ui/Input'
import { thisMachine } from '../../../lib/machineName'
import { useI18n } from '@renderer/i18n/useI18n'

const IDENTITY_KEYWORDS = [
  'name',
  'presence',
  'identity',
  'display',
  'collaborate',
  'color',
  'facepile',
  'nickname'
]

export function PresenceIdentitySection({ isActive }: { isActive: boolean }): React.JSX.Element {
  const { t } = useI18n()
  const saved = loadIdentity()
  const [name, setName] = useState(saved?.name ?? '')
  const [color, setColor] = useState(saved?.color ?? PRESENCE_COLORS[0])
  const [justSaved, setJustSaved] = useState(false)

  const row = useMemo(
    () => ({ title: t('settings.presence.rows.identity.title'), keywords: IDENTITY_KEYWORDS }),
    [t]
  )
  const entries = useMemo(() => [row], [row])

  const trimmed = name.trim()
  const dirty = trimmed !== (saved?.name ?? '') || color !== (saved?.color ?? PRESENCE_COLORS[0])

  const save = (): void => {
    if (!trimmed) return
    setMeAll({ name: trimmed, color })
    setJustSaved(true)
  }

  return (
    <SettingsSection
      id="presence"
      title={t('settings.presence.title')}
      description={t('settings.presence.description', { machine: thisMachine() })}
      isActive={isActive}
      searchEntries={entries}
    >
      <SearchableRow {...row}>
        <div className="space-y-4">
          <FieldRow
            label={t('settings.presence.displayName')}
            control={
              <Input
                className="w-72"
                value={name}
                maxLength={NAME_MAX_LEN}
                placeholder={t('settings.presence.placeholder')}
                onChange={(e) => {
                  setName(e.target.value)
                  setJustSaved(false)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') save()
                }}
              />
            }
          />
          <FieldRow
            label={t('settings.presence.color')}
            control={
              <div className="flex flex-wrap gap-2">
                {PRESENCE_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    title={c}
                    aria-label={t('settings.presence.colorAria', { color: c })}
                    onClick={() => {
                      setColor(c)
                      setJustSaved(false)
                    }}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: c,
                      cursor: 'pointer',
                      border: '2px solid transparent',
                      outline: c === color ? '2px solid var(--text)' : 'none',
                      outlineOffset: 2
                    }}
                  />
                ))}
              </div>
            }
          />
          <div className="flex items-center gap-3">
            <Button variant="primary" disabled={!trimmed || !dirty} onClick={save}>
              {t('settings.presence.save')}
            </Button>
            {justSaved && !dirty ? (
              <span className="text-sm text-muted">{t('settings.presence.saved')}</span>
            ) : null}
          </div>
          <p className="text-sm text-muted">{t('settings.presence.footnote')}</p>
        </div>
      </SearchableRow>
    </SettingsSection>
  )
}
