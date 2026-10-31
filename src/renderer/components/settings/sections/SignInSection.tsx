import { useMemo, useState } from 'react'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { Button } from '@renderer/ui/Button'
import { ConfirmDialog } from '../../ConfirmDialog'
import { signOutBrowser, type SignOutScope } from '../../../lib/browserSignOut'
import { useI18n } from '@renderer/i18n/useI18n'

const SIGN_OUT_KEYWORDS = ['sign out', 'log out', 'logout', 'session', 'password', 'browser']
const SIGN_OUT_ALL_KEYWORDS = [
  'sign out',
  'log out',
  'logout',
  'everywhere',
  'all',
  'sessions',
  'revoke',
  'browser',
  'stolen'
]

export function SignInSection({ isActive }: { isActive: boolean }): React.JSX.Element {
  const { t } = useI18n()
  const [busy, setBusy] = useState<SignOutScope | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)

  const rows = useMemo(
    () => ({
      signOut: { title: t('settings.signIn.rows.signOut.title'), keywords: SIGN_OUT_KEYWORDS },
      signOutEverywhere: {
        title: t('settings.signIn.rows.signOutEverywhere.title'),
        keywords: SIGN_OUT_ALL_KEYWORDS
      }
    }),
    [t]
  )
  const entries = useMemo(() => Object.values(rows), [rows])

  const run = async (scope: SignOutScope): Promise<void> => {
    setBusy(scope)
    setError(null)
    const r = await signOutBrowser(scope, {
      fetch: (...a) => window.fetch(...a),
      assign: (url) => window.location.assign(url)
    })
    if (!r.ok) {
      setError(r.error)
      setBusy(null)
    }
  }

  return (
    <SettingsSection
      id="sign-in"
      title={t('settings.signIn.title')}
      isActive={isActive}
      searchEntries={entries}
    >
      <SearchableRow entry={rows.signOut}>
        <FieldRow
          label={t('settings.signIn.signOutLabel')}
          description={t('settings.signIn.signOutDescription')}
          control={
            <Button onClick={() => void run('this')} disabled={busy !== null}>
              {busy === 'this' ? t('settings.signIn.signingOut') : t('settings.signIn.signOutButton')}
            </Button>
          }
        />
      </SearchableRow>
      <SearchableRow entry={rows.signOutEverywhere}>
        <FieldRow
          label={t('settings.signIn.signOutEverywhereLabel')}
          description={t('settings.signIn.signOutEverywhereDescription')}
          control={
            <Button onClick={() => setConfirming(true)} disabled={busy !== null}>
              {busy === 'everywhere'
                ? t('settings.signIn.signingOut')
                : t('settings.signIn.signOutEverywhereButton')}
            </Button>
          }
        />
      </SearchableRow>
      {error ? (
        <p role="alert" className="mt-2 text-[13px] text-danger">
          {error}
        </p>
      ) : null}
      {confirming ? (
        <ConfirmDialog
          message={t('settings.signIn.confirmMessage')}
          confirmLabel={t('settings.signIn.confirmLabel')}
          onConfirm={() => {
            setConfirming(false)
            void run('everywhere')
          }}
          onCancel={() => setConfirming(false)}
        />
      ) : null}
    </SettingsSection>
  )
}
