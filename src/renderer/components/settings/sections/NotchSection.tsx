import { useMemo } from 'react'
import { useSettings } from '../../../state/settings'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { Switch } from '@renderer/ui/Switch'
import { SegmentedPill } from '@renderer/ui/SegmentedPill'
import {
  NOTCH_OFFSET_MAX,
  NOTCH_OFFSET_MIN,
  NOTCH_WIDTH_MAX,
  NOTCH_WIDTH_MIN,
  sanitizeNotchAlign,
  sanitizeNotchOffsetY,
  type NotchAlign
} from '@shared/notch-hud'
import { useI18n } from '@renderer/i18n/useI18n'

const ROW_DEFS = {
  enabled: {
    key: 'settings.notch.rows.enabled.title',
    keywords: [
      'notch',
      'hud',
      'mascot',
      'menu bar',
      'overlay',
      'agent',
      'status',
      'macos',
      'capsule',
      'dynamic island'
    ]
  },
  width: {
    key: 'settings.notch.rows.width.title',
    keywords: ['notch', 'width', 'flush', 'align', 'capsule', 'position', 'offset', 'tune']
  },
  side: {
    key: 'settings.notch.rows.side.title',
    keywords: ['notch', 'side', 'left', 'right', 'center', 'centre', 'align', 'position', 'place', 'corner', 'capsule']
  },
  offset: {
    key: 'settings.notch.rows.offset.title',
    keywords: ['notch', 'vertical', 'offset', 'raise', 'lower', 'up', 'down', 'height', 'position', 'move', 'capsule']
  },
  hover: {
    key: 'settings.notch.rows.hover.title',
    keywords: ['notch', 'hover', 'expand', 'panel', 'click', 'open', 'sessions']
  }
} as const

function offsetLabel(px: number): string {
  if (px > 0) return `+${px} px`
  if (px < 0) return `−${-px} px`
  return '0 px'
}

export function NotchSection({ isActive }: { isActive: boolean }): React.JSX.Element {
  const { t } = useI18n()
  const notchHud = useSettings((s) => s.settings.notchHud)
  const notchWidth = useSettings((s) => s.settings.notchWidth)
  const notchAlign = useSettings((s) => sanitizeNotchAlign(s.settings.notchAlign))
  const notchOffsetY = useSettings((s) => sanitizeNotchOffsetY(s.settings.notchOffsetY))
  const hoverExpand = useSettings((s) => s.settings.notchHoverExpand)
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
      id="notch"
      title={t('settings.notch.title')}
      description={t('settings.notch.description')}
      isActive={isActive}
      searchEntries={entries}
    >
      <SearchableRow entry={rows.enabled}>
        <FieldRow
          label={t('settings.notch.showHud')}
          description={t('settings.notch.showHudDescription')}
          control={
            <Switch
              checked={notchHud}
              ariaLabel="macOS Notch HUD"
              onChange={(on) => update({ notchHud: on })}
            />
          }
        />
      </SearchableRow>

      <div
        className={
          'mt-3 space-y-3 border-l border-border pl-4' +
          (notchHud ? '' : ' pointer-events-none opacity-40')
        }
        aria-disabled={!notchHud}
      >
        <SearchableRow entry={rows.side}>
          <FieldRow
            label={t('settings.notch.capsuleSide')}
            description={t('settings.notch.capsuleSideDescription')}
            control={
              <SegmentedPill<NotchAlign>
                value={notchAlign}
                options={[
                  { value: 'left', label: t('settings.notch.alignLeft') },
                  { value: 'center', label: t('settings.notch.alignCenter') },
                  { value: 'right', label: t('settings.notch.alignRight') }
                ]}
                onChange={(v) => update({ notchAlign: v })}
                ariaLabel="Notch capsule side"
              />
            }
          />
        </SearchableRow>

        <SearchableRow entry={rows.offset}>
          <FieldRow
            label={t('settings.notch.verticalPosition')}
            description={t('settings.notch.verticalPositionDescription')}
            control={
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={NOTCH_OFFSET_MIN}
                  max={NOTCH_OFFSET_MAX}
                  step={2}
                  value={notchOffsetY}
                  aria-label="Notch capsule vertical offset in pixels"
                  onChange={(e) => update({ notchOffsetY: Number(e.target.value) })}
                  className="w-40 accent-[var(--accent)]"
                />
                <span className="w-14 text-right text-[12px] text-muted tabular-nums">
                  {offsetLabel(notchOffsetY)}
                </span>
              </div>
            }
          />
        </SearchableRow>

        <SearchableRow entry={rows.width}>
          <FieldRow
            label={t('settings.notch.notchWidth')}
            description={t('settings.notch.notchWidthDescription')}
            control={
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={NOTCH_WIDTH_MIN}
                  max={NOTCH_WIDTH_MAX}
                  step={2}
                  value={notchWidth}
                  aria-label="Assumed notch width in pixels"
                  onChange={(e) => update({ notchWidth: Number(e.target.value) })}
                  className="w-40 accent-[var(--accent)]"
                />
                <span className="w-12 text-right text-[12px] text-muted tabular-nums">
                  {notchWidth} px
                </span>
              </div>
            }
          />
        </SearchableRow>

        <SearchableRow entry={rows.hover}>
          <FieldRow
            label={t('settings.notch.expandOnHover')}
            description={t('settings.notch.expandOnHoverDescription')}
            control={
              <Switch
                checked={hoverExpand}
                ariaLabel="Expand the notch panel on hover"
                onChange={(on) => update({ notchHoverExpand: on })}
              />
            }
          />
        </SearchableRow>
      </div>
    </SettingsSection>
  )
}
