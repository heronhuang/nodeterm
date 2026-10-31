import { useMemo } from 'react'
import { useSettings } from '../../../state/settings'
import { useI18n } from '@renderer/i18n/useI18n'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { TerminalPreview } from '../TerminalPreview'
import { FontPicker } from '../FontPicker'
import { ThemeSelect } from '../ThemeSelect'
import { SectionReset } from '../SectionReset'
import { Switch } from '@renderer/ui/Switch'
import { Select } from '@renderer/ui/Select'
import { NumberField } from '@renderer/ui/NumberField'
import { Input } from '@renderer/ui/Input'
import { SegmentedPill } from '@renderer/ui/SegmentedPill'
import { TERMINAL_RESET_KEYS } from '@renderer/lib/settingsReset'
import { isMacPlatform } from '@shared/platform-utils'
import {
  TERMINAL_FONT_SIZE_MAX,
  TERMINAL_FONT_SIZE_MIN
} from '@renderer/terminal/terminal-font-zoom'
import {
  TERMINAL_LETTER_SPACING_MAX,
  TERMINAL_LETTER_SPACING_MIN,
  TERMINAL_LINE_HEIGHT_MAX,
  TERMINAL_LINE_HEIGHT_MIN
} from '@renderer/terminal/terminal-config'
// No `resolveGpuRendering`: the renderer row is a four-way CHOICE now (the 'shared' mode), so the
// row renders the raw setting and `App.tsx` resolves it through `resolveTerminalRenderer`.
import type { Settings, TerminalCursorInactiveStyle, TerminalCursorStyle } from '@shared/types'

/**
 * Row metadata for the settings search. Keywords matter as much as titles: an appearance setting
 * is far more often looked for by symptom ("colors", "flicker", "spacing") than by our label.
 *
 * Rows that carry two related controls (size+weight, line+letter) list the keywords for BOTH, so
 * searching either word still surfaces the row that holds it.
 */
const ROW_DEFS = {
  theme: {
    key: 'settings.terminal.rows.theme.title',
    keywords: [
      'theme', 'color', 'colour', 'scheme', 'palette', 'ansi', 'dracula', 'nord', 'gruvbox',
      'solarized', 'tokyo', 'catppuccin', 'dark', 'light'
    ]
  },
  fontFamily: {
    key: 'settings.terminal.rows.fontFamily.title',
    keywords: ['font', 'family', 'typeface', 'monospace', 'mono', 'ligature']
  },
  fontSize: {
    key: 'settings.terminal.rows.fontSize.title',
    keywords: ['font', 'size', 'text', 'zoom', 'weight', 'bold', 'thin', 'light', 'heavy']
  },
  fontZoomKeys: {
    key: 'settings.terminal.rows.fontZoomKeys.title',
    keywords: [
      'font', 'size', 'zoom', 'bigger', 'smaller', 'cmd', 'ctrl', 'plus', 'minus', 'shortcut',
      'per terminal'
    ]
  },
  spacing: {
    key: 'settings.terminal.rows.spacing.title',
    keywords: [
      'spacing', 'line', 'height', 'leading', 'density', 'letter', 'tracking', 'character'
    ]
  },
  cursor: {
    key: 'settings.terminal.rows.cursor.title',
    keywords: ['cursor', 'style', 'block', 'bar', 'beam', 'underline', 'blink', 'caret']
  },
  cursorInactive: {
    key: 'settings.terminal.rows.cursorInactive.title',
    keywords: ['cursor', 'inactive', 'unfocused', 'blurred', 'outline']
  },
  middleClickPaste: {
    key: 'settings.terminal.rows.middleClickPaste.title',
    keywords: ['middle', 'click', 'mouse', 'paste', 'primary', 'selection', 'x11', 'linux', 'wheel']
  },
  copyOnSelect: {
    key: 'settings.terminal.rows.copyOnSelect.title',
    keywords: [
      'copy', 'select', 'selection', 'clipboard', 'drag', 'mouse', 'highlight', 'auto', 'windows'
    ]
  },
  wordSeparator: {
    key: 'settings.terminal.rows.wordSeparator.title',
    keywords: ['word', 'separator', 'selection', 'double click', 'identifier', 'hyphen']
  },
  boldBright: {
    key: 'settings.terminal.rows.boldBright.title',
    keywords: ['bold', 'bright', 'color', 'colour', 'intense']
  },
  minContrast: {
    key: 'settings.terminal.rows.minContrast.title',
    keywords: [
      'contrast', 'readable', 'legible', 'accessibility', 'a11y', 'wcag', 'dim', 'unreadable'
    ]
  },
  gpu: {
    key: 'settings.terminal.rows.gpu.title',
    keywords: [
      'gpu',
      'webgl',
      'renderer',
      'rendering',
      'flicker',
      'performance',
      'graphics',
      'acceleration',
      'shared',
      // Kept although Shared GPU is no longer labelled experimental: it was, for two releases, and
      // a user who remembers the word must still land on the row that owns it.
      'experimental'
    ]
  },
  reset: {
    key: 'settings.terminal.rows.reset.title',
    keywords: ['reset', 'default', 'defaults', 'factory', 'restore', 'revert', 'undo']
  }
} as const

/** A sub-heading inside the section, riding on the first row of its group so a search that hides
 *  every row in the group takes the heading with it. */
function GroupHeading({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <h4 className="text-[11px] font-semibold uppercase tracking-wide text-muted-2">{children}</h4>
  )
}

/** A secondary label between two controls sharing one row ("13 · bold 700"). */
/** The primary modifier as the user reads it in the font-size-keys description. */
const modKey = isMacPlatform() ? '⌘' : 'Ctrl'

function Sub({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <span className="text-[13px] text-muted">{children}</span>
}

export function TerminalSection({ isActive }: { isActive: boolean }): React.JSX.Element {
  const { t } = useI18n()
  const cursorStyles = useMemo(
    (): { value: TerminalCursorStyle; label: string }[] => [
      { value: 'block', label: t('settings.terminal.cursorStyle.block') },
      { value: 'bar', label: t('settings.terminal.cursorStyle.bar') },
      { value: 'underline', label: t('settings.terminal.cursorStyle.underline') }
    ],
    [t]
  )
  const cursorInactiveStyles = useMemo(
    (): { value: TerminalCursorInactiveStyle; label: string }[] => [
      { value: 'outline', label: t('settings.terminal.cursorInactiveStyle.outline') },
      { value: 'block', label: t('settings.terminal.cursorInactiveStyle.block') },
      { value: 'bar', label: t('settings.terminal.cursorInactiveStyle.bar') },
      { value: 'underline', label: t('settings.terminal.cursorInactiveStyle.underline') },
      { value: 'none', label: t('settings.terminal.cursorInactiveStyle.none') }
    ],
    [t]
  )
  const fontWeights = useMemo(
    (): { value: number; label: string }[] => [
      { value: 100, label: t('settings.terminal.fontWeight.w100') },
      { value: 200, label: t('settings.terminal.fontWeight.w200') },
      { value: 300, label: t('settings.terminal.fontWeight.w300') },
      { value: 400, label: t('settings.terminal.fontWeight.w400') },
      { value: 500, label: t('settings.terminal.fontWeight.w500') },
      { value: 600, label: t('settings.terminal.fontWeight.w600') },
      { value: 700, label: t('settings.terminal.fontWeight.w700') },
      { value: 800, label: t('settings.terminal.fontWeight.w800') },
      { value: 900, label: t('settings.terminal.fontWeight.w900') }
    ],
    [t]
  )
  // xterm reads 1 as "no adjustment"; the named steps are the WCAG ratios, and 21 is the maximum
  // possible (black on white), i.e. force every foreground to one or the other.
  const minContrastOptions = useMemo(
    (): { value: number; label: string }[] => [
      { value: 1, label: t('settings.terminal.minContrast.off') },
      { value: 3, label: t('settings.terminal.minContrast.low') },
      { value: 4.5, label: t('settings.terminal.minContrast.wcagAa') },
      { value: 7, label: t('settings.terminal.minContrast.wcagAaa') },
      { value: 21, label: t('settings.terminal.minContrast.maximum') }
    ],
    [t]
  )
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

  const settings = useSettings((s) => s.settings)
  const update = useSettings((s) => s.update)
  return (
    <SettingsSection id="terminal" title={t('settings.terminal.title')} isActive={isActive} searchEntries={entries}>
      {/* The preview leads. Every control below changes what it shows, so anchoring it at the top
          means a choice is a look rather than a scroll back up — and it keeps the section short
          enough that the troubleshooting toggle at the foot is still on screen. */}
      <SearchableRow {...rows.theme}>
        <div className="space-y-3">
          <TerminalPreview />
          <FieldRow
            label={rows.theme.title}
            description={t('settings.terminal.description')}
            control={
              <ThemeSelect
                value={settings.terminalTheme}
                onChange={(id) => update({ terminalTheme: id })}
              />
            }
          />
        </div>
      </SearchableRow>

      <SearchableRow {...rows.fontFamily}>
        <div className="space-y-3">
          <GroupHeading>{rows.fontFamily.title}</GroupHeading>
          <FieldRow
            label={rows.fontFamily.title}
            description={t('settings.terminal.fontFamilyDescription')}
            control={
              <FontPicker
                label={rows.fontFamily.title}
                value={settings.fontFamily}
                onChange={(stack) => update({ fontFamily: stack })}
              />
            }
          />
        </div>
      </SearchableRow>
      <SearchableRow {...rows.fontSize}>
        <FieldRow
          label={rows.fontSize.title}
          control={
            <span className="flex items-center gap-2">
              <NumberField
                className="w-16"
                value={settings.fontSize}
                min={TERMINAL_FONT_SIZE_MIN}
                max={TERMINAL_FONT_SIZE_MAX}
                onChange={(v) => update({ fontSize: v || 13 })}
              />
              <Select
                className="w-28"
                value={String(settings.fontWeight)}
                onChange={(e) => update({ fontWeight: Number(e.target.value) })}
                aria-label={t('settings.terminal.aria.fontWeight')}
              >
                {fontWeights.map((w) => (
                  <option key={w.value} value={w.value}>
                    {w.label}
                  </option>
                ))}
              </Select>
              <Sub>{t('settings.terminal.subBold')}</Sub>
              <Select
                className="w-28"
                value={String(settings.fontWeightBold)}
                onChange={(e) => update({ fontWeightBold: Number(e.target.value) })}
                aria-label={t('settings.terminal.aria.fontWeightBold')}
              >
                {fontWeights.map((w) => (
                  <option key={w.value} value={w.value}>
                    {w.label}
                  </option>
                ))}
              </Select>
            </span>
          }
        />
      </SearchableRow>
      {/* Issue #915. Behaviour, not appearance: deliberately NOT in TERMINAL_RESET_KEYS (same as
          middle-click paste), so the section's reset button does not flip a key binding. */}
      <SearchableRow {...rows.fontZoomKeys}>
        <FieldRow
          label={rows.fontZoomKeys.title}
          description={t('settings.terminal.fontZoomKeysDescription', { modKey })}
          control={
            <Switch
              checked={settings.terminalFontZoomKeys}
              onChange={(v) => update({ terminalFontZoomKeys: v })}
              ariaLabel={t('settings.terminal.aria.fontSizeKeys')}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.spacing}>
        <FieldRow
          label={rows.spacing.title}
          description={t('settings.terminal.spacingDescription')}
          control={
            <span className="flex items-center gap-2">
              <Sub>{t('settings.terminal.subLine')}</Sub>
              <NumberField
                className="w-20"
                value={settings.terminalLineHeight}
                min={TERMINAL_LINE_HEIGHT_MIN}
                max={TERMINAL_LINE_HEIGHT_MAX}
                step={0.05}
                onChange={(v) => update({ terminalLineHeight: v || 1 })}
              />
              <Sub>{t('settings.terminal.subLetter')}</Sub>
              <NumberField
                className="w-20"
                value={settings.terminalLetterSpacing}
                min={TERMINAL_LETTER_SPACING_MIN}
                max={TERMINAL_LETTER_SPACING_MAX}
                step={0.5}
                onChange={(v) => update({ terminalLetterSpacing: v ?? 0 })}
              />
            </span>
          }
        />
      </SearchableRow>

      <SearchableRow {...rows.cursor}>
        <div className="space-y-3">
          <GroupHeading>{rows.cursor.title}</GroupHeading>
          <FieldRow
            label={rows.cursor.title}
            control={
              <span className="flex items-center gap-3">
                <SegmentedPill
                  value={settings.cursorStyle}
                  options={cursorStyles}
                  onChange={(v) => update({ cursorStyle: v })}
                  ariaLabel={t('settings.terminal.aria.cursorStyle')}
                />
                <Sub>{t('settings.terminal.subBlink')}</Sub>
                <Switch
                  checked={settings.cursorBlink}
                  onChange={(v) => update({ cursorBlink: v })}
                  ariaLabel={t('settings.terminal.aria.cursorBlink')}
                />
              </span>
            }
          />
        </div>
      </SearchableRow>
      <SearchableRow {...rows.cursorInactive}>
        <FieldRow
          label={rows.cursorInactive.title}
          description={t('settings.terminal.cursorInactiveDescription')}
          control={
            <Select
              className="w-36"
              value={settings.cursorInactiveStyle}
              onChange={(e) =>
                update({ cursorInactiveStyle: e.target.value as TerminalCursorInactiveStyle })
              }
              aria-label={t('settings.terminal.aria.cursorUnfocused')}
            >
              {cursorInactiveStyles.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          }
        />
      </SearchableRow>

      <SearchableRow {...rows.middleClickPaste}>
        <div className="space-y-3">
          <GroupHeading>{t('settings.terminal.groupAdvanced')}</GroupHeading>
          <FieldRow
            label={rows.middleClickPaste.title}
            description={t('settings.terminal.middleClickPasteDescription')}
            control={
              <Switch
                checked={settings.terminalMiddleClickPaste}
                onChange={(v) => update({ terminalMiddleClickPaste: v })}
                ariaLabel={t('settings.terminal.aria.middleClickPaste')}
              />
            }
          />
        </div>
      </SearchableRow>

      <SearchableRow {...rows.copyOnSelect}>
        <FieldRow
          label={rows.copyOnSelect.title}
          description={t('settings.terminal.copyOnSelectDescription')}
          control={
            <Switch
              checked={settings.copyOnSelect}
              onChange={(v) => update({ copyOnSelect: v })}
              ariaLabel={t('settings.terminal.aria.copyOnSelect')}
            />
          }
        />
      </SearchableRow>

      <SearchableRow {...rows.wordSeparator}>
        <FieldRow
          label={rows.wordSeparator.title}
          description={t('settings.terminal.wordSeparatorDescription')}
          control={
            <Input
              className="w-48 font-mono"
              value={settings.terminalWordSeparator}
              onChange={(e) => update({ terminalWordSeparator: e.target.value })}
              aria-label={t('settings.terminal.aria.wordSeparators')}
            />
          }
        />
      </SearchableRow>

      <SearchableRow {...rows.boldBright}>
        <div className="space-y-3">
          <FieldRow
            label={rows.boldBright.title}
            description={t('settings.terminal.boldBrightDescription')}
            control={
              <Switch
                checked={settings.drawBoldTextInBrightColors}
                onChange={(v) => update({ drawBoldTextInBrightColors: v })}
                ariaLabel={t('settings.terminal.aria.boldBright')}
              />
            }
          />
        </div>
      </SearchableRow>
      <SearchableRow {...rows.minContrast}>
        <FieldRow
          label={rows.minContrast.title}
          description={t('settings.terminal.minContrastDescription')}
          control={
            <Select
              className="w-44"
              value={String(settings.terminalMinContrast)}
              onChange={(e) => update({ terminalMinContrast: Number(e.target.value) })}
              aria-label={t('settings.terminal.aria.minContrast')}
            >
              {minContrastOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.gpu}>
        <FieldRow
          label={rows.gpu.title}
          description={t('settings.terminal.gpuDescription')}
          control={
            <Select
              aria-label={t('settings.terminal.aria.rendering')}
              value={settings.terminalGpuRendering}
              onChange={(e) =>
                update({
                  terminalGpuRendering: e.target.value as Settings['terminalGpuRendering']
                })
              }
            >
              <option value="auto">{t('settings.terminal.gpuMode.auto')}</option>
              <option value="on">{t('settings.terminal.gpuMode.on')}</option>
              <option value="shared">{t('settings.terminal.gpuMode.shared')}</option>
              <option value="off">{t('settings.terminal.gpuMode.off')}</option>
            </Select>
          }
        />
      </SearchableRow>

      <SearchableRow {...rows.reset}>
        <SectionReset
          keys={TERMINAL_RESET_KEYS}
          label={rows.reset.title}
          what={t('settings.terminal.resetAppearanceWhat')}
        />
      </SearchableRow>
    </SettingsSection>
  )
}
