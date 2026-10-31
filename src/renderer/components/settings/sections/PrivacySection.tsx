import { useMemo } from 'react'
import { useSettings } from '../../../state/settings'
import { useProjectLimit } from '../../../state/projectLimit'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { Switch } from '@renderer/ui/Switch'
import { useI18n } from '@renderer/i18n/useI18n'

const CONSENT_KEYWORDS = ['privacy', 'license', 'pro', 'do not track', 'dnt', 'consent', 'network']

export function PrivacySection({ isActive }: { isActive: boolean }): React.JSX.Element {
  const { t } = useI18n()
  const telemetryEnabled = useSettings((s) => s.settings.telemetryEnabled)
  const licenseNetworkConsent = useSettings((s) => s.settings.licenseNetworkConsent)
  const update = useSettings((s) => s.update)
  const dnt = useProjectLimit((s) => s.state.dnt)
  const limitOn = useProjectLimit((s) => s.state.active)

  const rows = useMemo(
    () => ({
      telemetry: {
        title: t('settings.privacy.rows.telemetry.title'),
        keywords: ['privacy', 'telemetry', 'usage', 'analytics', 'data']
      },
      licenseConsent: {
        title: t('settings.privacy.rows.licenseConsent.title'),
        keywords: CONSENT_KEYWORDS
      },
      licenseConsentLimit: {
        title: t('settings.privacy.rows.licenseConsentLimit.title'),
        keywords: [...CONSENT_KEYWORDS, 'allowance', 'projects']
      }
    }),
    [t]
  )

  const entries = useMemo(
    () =>
      dnt ? (limitOn ? [rows.telemetry, rows.licenseConsentLimit] : [rows.telemetry, rows.licenseConsent]) : [rows.telemetry],
    [dnt, limitOn, rows]
  )

  const consentRow = limitOn ? rows.licenseConsentLimit : rows.licenseConsent
  const telemetryDescription =
    t('settings.privacy.telemetryDescription') +
    (limitOn ? t('settings.privacy.machineHashSentence') : '')

  return (
    <SettingsSection
      id="privacy"
      title={t('settings.privacy.title')}
      isActive={isActive}
      searchEntries={entries}
    >
      <SearchableRow {...rows.telemetry}>
        <FieldRow
          label={t('settings.privacy.telemetryLabel')}
          description={telemetryDescription}
          control={
            <Switch
              checked={telemetryEnabled}
              onChange={(v) => update({ telemetryEnabled: v })}
              ariaLabel="Telemetry"
            />
          }
        />
      </SearchableRow>
      {dnt ? (
        <SearchableRow {...consentRow}>
          <FieldRow
            label={t('settings.privacy.licenseConsentLabel')}
            description={
              limitOn
                ? t('settings.privacy.consentDescriptionLimit')
                : t('settings.privacy.consentDescription')
            }
            control={
              <Switch
                checked={licenseNetworkConsent === true}
                onChange={(v) => update({ licenseNetworkConsent: v })}
                ariaLabel={t('settings.privacy.licenseConsentLabel')}
              />
            }
          />
        </SearchableRow>
      ) : null}
    </SettingsSection>
  )
}
