import { CANVAS_BACKING_MAX, CANVAS_BACKING_MIN, resolveCanvasBacking } from '@shared/canvas-backing'
import { useI18n } from '@renderer/i18n/useI18n'
import { useMemo, useEffect, useState } from 'react'
import { useSettings } from '../../../state/settings'
import { useWallpaperBackgroundFor } from '../../../state/wallpaper'
import { isLiquidGlass } from '@renderer/lib/appTheme'
import {
  GLASS_READABLE_TICK,
  keepGlassBlurWhileMoving,
  resolveGlassSlider
} from '@renderer/lib/glassContrast'
import { useGlassA11y } from '@renderer/lib/useGlassA11y'
import { showCanvasDots } from '@renderer/lib/canvasDots'
import {
  defaultWallpaper,
  GRADIENT_WALLPAPERS,
  NO_WALLPAPER,
  normalizeWallpaper,
  recentWallpaperImage,
  wallpaperChoice,
  sameWallpaper,
  type DesktopWallpaper,
  type WallpaperStill
} from '@shared/wallpaper'
import { SYSTEM_NODE_COLOR_SWATCHES } from '@shared/node-colors'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { GlassSlider } from '../GlassSlider'
import { Switch } from '@renderer/ui/Switch'
import { SegmentedPill } from '@renderer/ui/SegmentedPill'
import {
  HIDEABLE_HEADER_BUTTONS,
  HIDEABLE_MENU_ITEMS,
  isHidden,
  type HideableRow
} from '@renderer/lib/ui-visibility'
import { cn } from '@renderer/ui/cn'
import { Select } from '@renderer/ui/Select'
import { isBrowserRuntime } from '@renderer/bridge/runtime'
import { UI_SCALE_CHOICES, resolveUiScale, uiScaleLabel } from '@shared/ui-scale'
import {
  TABBAR_HEIGHT_MAX_PX,
  TABBAR_HEIGHT_MIN_PX,
  TABBAR_HEIGHT_PX,
  resolveTabBarHeight
} from '@shared/window-chrome-metrics'
import { NumberField } from '@renderer/ui/NumberField'
import { FontPicker } from '../FontPicker'
import { PROSE_FONT_CATALOG, buildProseFontStack } from '@renderer/lib/fontDetect'
import {
  DEFAULT_MARKDOWN_FONT_FAMILY,
  DEFAULT_MARKDOWN_FONT_SIZE,
  MARKDOWN_FONT_SIZE_MAX,
  MARKDOWN_FONT_SIZE_MIN,
  resolveMarkdownFontFamily,
  resolveMarkdownFontSize
} from '@shared/markdown-font'
import { SectionReset } from '../SectionReset'
import { APPEARANCE_RESET_KEYS } from '@renderer/lib/settingsReset'

const ROW_DEFS = {
  appTheme: {
    key: 'settings.appearance.rows.appTheme.title',
    keywords: ['appearance', 'theme', 'light', 'dark', 'mode', 'colour', 'color', 'chrome', 'liquid', 'glass', 'blur', 'translucent', 'frosted']
  },
  uiScale: {
    key: 'settings.appearance.rows.uiScale.title',
    keywords: ['ui', 'scale', 'zoom', 'size', 'text', 'bigger', 'larger', '4k', 'hidpi', 'dpi', 'display', 'readability']
  },
  tabBarHeight: {
    key: 'settings.appearance.rows.tabBarHeight.title',
    keywords: ['tab', 'bar', 'height', 'strip', 'top', 'title bar', 'thickness', 'compact', 'dense']
  },
  stickyNoteBacking: {
    key: 'settings.appearance.rows.stickyNoteBacking.title',
    keywords: ['sticky', 'note', 'notes', 'transparency', 'transparent', 'opacity', 'opaque', 'solid', 'see-through', 'background', 'readability']
  },
  groupFrameBacking: {
    key: 'settings.appearance.rows.groupFrameBacking.title',
    keywords: ['group', 'frame', 'frames', 'transparency', 'transparent', 'opacity', 'opaque', 'solid', 'see-through', 'background']
  },
  markdownFont: {
    key: 'settings.appearance.rows.markdownFont.title',
    keywords: ['markdown', 'font', 'family', 'typeface', 'chat', 'preview', 'reading', 'output', 'text', 'serif', 'sans']
  },
  markdownFontSize: {
    key: 'settings.appearance.rows.markdownFontSize.title',
    keywords: ['markdown', 'font', 'size', 'text', 'bigger', 'larger', 'smaller', 'chat', 'preview', 'reading', 'readability']
  },
  accent: {
    key: 'settings.appearance.rows.accent.title',
    keywords: ['accent', 'color', 'theme', 'appearance']
  },
  wallpaper: {
    key: 'settings.appearance.rows.wallpaper.title',
    keywords: ['wallpaper', 'background', 'desktop', 'image', 'picture', 'gradient', 'sonoma', 'canvas', 'aerial', 'aerials', 'video', 'shuffle', 'moving']
  },
  windowTitle: {
    key: 'settings.appearance.rows.windowTitle.title',
    keywords: [
      'window',
      'title',
      'session',
      'tab',
      'tracker',
      'time',
      'activitywatch',
      'focused',
      'native'
    ]
  },
  glassTint: {
    key: 'settings.appearance.rows.glassTint.title',
    keywords: ['glass', 'liquid', 'transparency', 'clear', 'tinted', 'frosted', 'blur', 'opacity']
  },
  glassBlurWhileMoving: {
    key: 'settings.appearance.rows.glassBlurWhileMoving.title',
    keywords: ['glass', 'blur', 'pan', 'zoom', 'moving', 'gpu', 'performance', 'refraction']
  },
  canvasDots: {
    key: 'settings.appearance.rows.canvasDots.title',
    keywords: ['grid', 'dots', 'dot', 'canvas', 'background', 'pattern']
  },
  resumeCard: {
    key: 'settings.appearance.rows.resumeCard.title',
    keywords: ['resume', 'where you left off', 'breadcrumb', 'card', 'popup', 'trail']
  },
  menuItems: {
    key: 'settings.appearance.rows.menuItems.title',
    keywords: ['menu', 'context', 'right click', 'items', 'hide']
  },
  headerButtons: {
    key: 'settings.appearance.rows.headerButtons.title',
    keywords: ['terminal', 'header', 'buttons', 'icons', 'hide', 'context', 'meter', 'model', 'usage']
  },
  reset: {
    key: 'settings.appearance.rows.reset.title',
    keywords: ['reset', 'default', 'defaults', 'factory', 'restore', 'revert', 'undo']
  }
} as const

/** Settings store what is HIDDEN, the switches say "show" — so showing drops the id and hiding
 *  appends it. Filtering first also keeps a hand-edited list free of duplicates. */
function withShown(hidden: readonly string[], id: string, shown: boolean): string[] {
  const next = hidden.filter((h) => h !== id)
  if (!shown) next.push(id)
  return next
}

/** One switch per hideable row, checked when the row is visible. */
function VisibilityToggles({
  rows,
  hidden,
  where,
  onChange
}: {
  rows: readonly HideableRow[]
  hidden: readonly string[]
  /** Completes the aria-label ("Show Duplicate in the node menu") — the label alone is ambiguous
   *  once both lists are on screen and a screen reader reads them out of context. */
  where: string
  onChange: (next: string[]) => void
}): React.JSX.Element {
  const { t } = useI18n()
  return (
    <div className="mt-3 space-y-3 border-l border-border pl-4">
      {rows.map((row) => (
        <FieldRow
          key={row.id}
          label={row.label}
          control={
            <Switch
              checked={!isHidden(row.id, hidden)}
              onChange={(shown) => onChange(withShown(hidden, row.id, shown))}
              ariaLabel={t('settings.appearance.showVisibilityAria', { label: row.label, where })}
            />
          }
        />
      ))}
    </div>
  )
}

/** UI scale (issue #299) — page zoom for the whole app chrome; see shared/ui-scale.ts for the
 *  mechanism decision. The row stays visible but DISABLED on the Server Edition (a hidden row
 *  teaches nothing — the house rule the SSH-worktree affordances follow): a browser page cannot
 *  set its own page zoom, and the browser's Cmd/Ctrl+± already does the identical thing. */
function UiScaleRow(): React.JSX.Element {
  const { t } = useI18n()
  const uiScale = useSettings((s) => s.settings.uiScale)
  const update = useSettings((s) => s.update)
  const inBrowser = isBrowserRuntime()
  const resolved = resolveUiScale(uiScale)
  // A hand-edited between-step value (1.15, say) is honoured by the applier, so the select must
  // show it rather than silently displaying the nearest preset it would overwrite on next change.
  const choices: number[] = UI_SCALE_CHOICES.includes(resolved as (typeof UI_SCALE_CHOICES)[number])
    ? [...UI_SCALE_CHOICES]
    : [...UI_SCALE_CHOICES, resolved].sort((a, b) => a - b)
  return (
    <FieldRow
      label={t('settings.appearance.rows.uiScale.title')}
      htmlFor="ui-scale"
      description={t('settings.appearance.uiScaleDescription')}
      note={inBrowser ? t('settings.appearance.uiScaleBrowserNote') : undefined}
      control={
        <Select
          id="ui-scale"
          value={String(resolved)}
          disabled={inBrowser}
          aria-label={t('settings.appearance.rows.uiScale.title')}
          onChange={(e) => update({ uiScale: Number(e.target.value) })}
        >
          {choices.map((c) => (
            <option key={c} value={String(c)}>
              {uiScaleLabel(c)}
            </option>
          ))}
        </Select>
      }
    />
  )
}

/** The top project tab bar's height, in px. A number field rather than presets: the requests
 *  that prompted it were "a bit shorter" and "a bit taller", and a preset list would have to guess
 *  where those land. The traffic lights follow where they sit inside the bar (main re-centres
 *  them on the same setting); everything positioned against the bar reads its token, so nothing
 *  else moves. The copy names no platform: `machineName.guard.test.ts` forbids "Mac" in
 *  user-visible renderer strings, and a browser viewer's OS says nothing about the server's. */
function TabBarHeightRow(): React.JSX.Element {
  const { t } = useI18n()
  const tabBarHeight = useSettings((s) => s.settings.tabBarHeight)
  const update = useSettings((s) => s.update)
  const resolved = resolveTabBarHeight(tabBarHeight)
  const label = t('settings.appearance.rows.tabBarHeight.title')
  return (
    <FieldRow
      label={label}
      htmlFor="tab-bar-height"
      description={t('settings.appearance.tabBarHeightDescription')}
      control={
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <NumberField
            value={resolved}
            min={TABBAR_HEIGHT_MIN_PX}
            max={TABBAR_HEIGHT_MAX_PX}
            step={2}
            ariaLabel={label}
            onChange={(v) => update({ tabBarHeight: resolveTabBarHeight(v) })}
          />
          <span style={{ opacity: 0.6 }}>px</span>
        </div>
      }
    />
  )
}

/** How solid a sticky note / group frame is behind its colour tint (issue #1113). 0 = the
 *  original see-through look; the tint itself never changes. */
function CanvasBackingRow({ kind }: { kind: 'stickyNoteBacking' | 'groupFrameBacking' }): React.JSX.Element {
  const { t } = useI18n()
  const value = useSettings((s) => s.settings[kind])
  const update = useSettings((s) => s.update)
  const sticky = kind === 'stickyNoteBacking'
  const label = sticky
    ? t('settings.appearance.rows.stickyNoteBacking.title')
    : t('settings.appearance.rows.groupFrameBacking.title')
  return (
    <FieldRow
      label={label}
      htmlFor={kind}
      description={
        sticky
          ? t('settings.appearance.stickyNoteBackingDescription')
          : t('settings.appearance.groupFrameBackingDescription')
      }
      control={
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <NumberField
            value={resolveCanvasBacking(value)}
            min={CANVAS_BACKING_MIN}
            max={CANVAS_BACKING_MAX}
            step={10}
            ariaLabel={label}
            onChange={(v) => update({ [kind]: resolveCanvasBacking(v) })}
          />
          <span style={{ opacity: 0.6 }}>%</span>
        </div>
      }
    />
  )
}

/** Applies to the ⌘M output and chat views and the editor's Markdown preview (@shared/markdown-font). */
function MarkdownFontRows(): React.JSX.Element {
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
  const family = useSettings((s) => s.settings.markdownFontFamily)
  const size = useSettings((s) => s.settings.markdownFontSize)
  const update = useSettings((s) => s.update)
  return (
    <>
      <SearchableRow {...rows.markdownFont}>
        <FieldRow
          label={rows.markdownFont.title}
          description={t('settings.appearance.markdownFontDescription')}
          control={
            <FontPicker
              label={rows.markdownFont.title}
              value={resolveMarkdownFontFamily(family)}
              onChange={(stack) => update({ markdownFontFamily: stack })}
              catalog={PROSE_FONT_CATALOG}
              buildStack={buildProseFontStack}
              systemOption={{ label: t('settings.appearance.systemFont'), stack: DEFAULT_MARKDOWN_FONT_FAMILY }}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.markdownFontSize}>
        <FieldRow
          label={rows.markdownFontSize.title}
          description={t('settings.appearance.markdownFontSizeDescription', {
            min: MARKDOWN_FONT_SIZE_MIN,
            max: MARKDOWN_FONT_SIZE_MAX,
            default: DEFAULT_MARKDOWN_FONT_SIZE
          })}
          control={
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <NumberField
                value={resolveMarkdownFontSize(size)}
                min={MARKDOWN_FONT_SIZE_MIN}
                max={MARKDOWN_FONT_SIZE_MAX}
                ariaLabel={rows.markdownFontSize.title}
                onChange={(v) => update({ markdownFontSize: resolveMarkdownFontSize(v) })}
              />
              <span style={{ opacity: 0.6 }}>px</span>
            </div>
          }
        />
      </SearchableRow>
    </>
  )
}

/** One picker tile. The selected tile gets the text-coloured ring, like the accent swatches. */
function WallpaperTile({
  label,
  selected,
  background,
  onClick,
  children
}: {
  label: string
  selected: boolean
  background?: string
  onClick: () => void
  children?: React.ReactNode
}): React.JSX.Element {
  return (
    <button
      type="button"
      aria-label={`Wallpaper ${label}`}
      aria-pressed={selected}
      title={label}
      onClick={onClick}
      style={background ? { background } : undefined}
      className={cn(
        'relative flex h-14 w-24 items-center justify-center overflow-hidden rounded-md border-2 text-[11px] text-muted',
        selected ? 'border-text' : 'border-border'
      )}
    >
      {children}
      {/* The ring alone was the only sign of the choice (visual QA L5); a check badge says it
          without relying on the ring's contrast against the picture. White on a picture in both
          themes, like the macOS wallpaper picker. */}
      {selected && (
        <span
          aria-hidden
          className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-white text-[10px] font-bold leading-none text-black shadow"
        >
          ✓
        </span>
      )}
    </button>
  )
}

/**
 * None, the macOS stills found on the machine that owns the files, the gradient presets, and
 * "Choose image…". The stills list comes from core and is empty off macOS (and on a relay tab);
 * "Choose image…" is hidden in the Server Edition, where a native file picker would browse the
 * SERVER's disk rather than the viewer's.
 */
function WallpaperPicker(): React.JSX.Element {
  const value = normalizeWallpaper(useSettings((s) => s.settings.desktopWallpaper))
  const recent = recentWallpaperImage(useSettings((s) => s.settings.recentWallpaperImage))
  // The tile offers the current image, else the last one imported (kept when a preset is chosen).
  const yourImage = value.kind === 'image' ? value : recent
  // Its own picture, like every preset tile (visual QA round 2, N7). Imports have no cached
  // thumbnail, so this is the wallpaper itself — the one already loaded when it is the current one.
  const yourImageBg = useWallpaperBackgroundFor(yourImage)
  const update = useSettings((s) => s.update)
  const [stills, setStills] = useState<WallpaperStill[] | null>(null)
  const [aerials, setAerials] = useState<WallpaperStill[]>([])
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    let live = true
    window.nodeTerminal.wallpaper
      .listStills()
      .then((list) => live && setStills(list))
      .catch(() => live && setStills([]))
    // Empty off macOS, in the Server Edition and on a relay tab: the group then does not render.
    window.nodeTerminal.wallpaper
      .listAerials()
      .then((list) => live && setAerials(list))
      .catch(() => {})
    return () => {
      live = false
    }
  }, [])
  const pick = (w: DesktopWallpaper): void => {
    setError(null)
    update(wallpaperChoice(value, w))
  }
  const chooseImage = async (): Promise<void> => {
    setError(null)
    const picked = await window.nodeTerminal.dialog.selectFile().catch(() => null)
    if (!picked) return
    try {
      pick(await window.nodeTerminal.wallpaper.importImage(picked))
    } catch (e) {
      // Electron prefixes a handler's error with "Error invoking remote method …: Error: ".
      setError(String((e as Error)?.message ?? e).replace(/^.*Error: /, ''))
    }
  }
  const is = (w: DesktopWallpaper): boolean => sameWallpaper(value, w)
  return (
    <div>
      <h4 className="text-[13px] font-medium text-text">Desktop wallpaper</h4>
      <p className="mt-1 text-[13px] leading-relaxed text-muted">
        A picture behind the whole window. It stays put while you pan and zoom, and the Liquid
        Glass appearance above frosts the interface over it.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <WallpaperTile label="None" selected={is(NO_WALLPAPER)} onClick={() => pick(NO_WALLPAPER)}>
          None
        </WallpaperTile>
        {stills === null && <span className="self-center text-[12px] text-muted">Loading stills…</span>}
        {stills?.map((s) => (
          <WallpaperTile
            key={s.id}
            label={s.label}
            selected={is({ kind: 'preset', id: s.id })}
            background={s.thumb ? `center / cover no-repeat url("${s.thumb}")` : undefined}
            onClick={() => pick({ kind: 'preset', id: s.id })}
          >
            {s.thumb ? null : s.label}
          </WallpaperTile>
        ))}
        {GRADIENT_WALLPAPERS.map((g) => (
          <WallpaperTile
            key={g.id}
            label={g.label}
            selected={is({ kind: 'preset', id: g.id })}
            background={g.css}
            onClick={() => pick({ kind: 'preset', id: g.id })}
          />
        ))}
        {yourImage && (
          <WallpaperTile
            label="Your image"
            selected={is(yourImage)}
            background={yourImageBg ? `center / cover no-repeat ${yourImageBg}` : undefined}
            onClick={() => pick(yourImage)}
          >
            {yourImageBg ? null : 'Your image'}
          </WallpaperTile>
        )}
        {!isBrowserRuntime() && (
          <WallpaperTile label="Choose image…" selected={false} onClick={() => void chooseImage()}>
            Choose image…
          </WallpaperTile>
        )}
      </div>
      {error && <p className="mt-2 text-[12px] text-danger">{error}</p>}
      {aerials.length > 0 && (
        <>
          <h4 className="mt-4 text-[13px] font-medium text-text">Aerials</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {aerials.map((a) => (
              <WallpaperTile
                key={a.id}
                label={a.label}
                selected={is({ kind: 'preset', id: a.id })}
                background={a.thumb ? `center / cover no-repeat url("${a.thumb}")` : undefined}
                onClick={() => pick({ kind: 'preset', id: a.id })}
              >
                {a.thumb ? null : a.label}
              </WallpaperTile>
            ))}
          </div>
          <p className="mt-2 text-[12px] text-muted">Download more aerials in System Settings → Wallpaper.</p>
        </>
      )}
    </div>
  )
}

export function AppearanceSection({ isActive }: { isActive: boolean }): React.JSX.Element {
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

  const appTheme = useSettings((s) => s.settings.appTheme)
  const accent = useSettings((s) => s.settings.accent)
  const hiddenNodeMenuItems = useSettings((s) => s.settings.hiddenNodeMenuItems)
  const hiddenHeaderButtons = useSettings((s) => s.settings.hiddenHeaderButtons)
  const showResumeCard = useSettings((s) => s.settings.showResumeCard)
  const canvasDots = useSettings((s) => s.settings.canvasDots)
  const glassSlider = resolveGlassSlider(useSettings((s) => s.settings.glassTint))
  const glassA11y = useGlassA11y()
  const glassLocked = glassA11y.reduceTransparency || glassA11y.moreContrast
  const glassBlurWhileMoving = keepGlassBlurWhileMoving(
    useSettings((s) => s.settings.glassBlurWhileMoving)
  )
  const windowTitleActiveSession = useSettings((s) => s.settings.windowTitleActiveSession)
  const update = useSettings((s) => s.update)
  // Glass over plain black reads as a dark theme with smudges, so choosing Liquid Glass with no
  // wallpaper also picks one. Only when there is none: a wallpaper the user chose is never
  // replaced, and re-checked after the (possibly slow, first-run thumbnail) stills listing.
  const chooseAppTheme = async (v: typeof appTheme): Promise<void> => {
    update({ appTheme: v })
    if (!isLiquidGlass(v)) return
    const hasWallpaper = () =>
      normalizeWallpaper(useSettings.getState().settings.desktopWallpaper).kind !== 'none'
    if (hasWallpaper()) return
    const stills = await window.nodeTerminal.wallpaper.listStills().catch(() => [])
    // The stills listing can take a while (first-run thumbnails): only pick a wallpaper if Liquid
    // Glass is still the choice when it answers.
    if (!hasWallpaper() && isLiquidGlass(useSettings.getState().settings.appTheme))
      update({ desktopWallpaper: defaultWallpaper(stills) })
  }
  return (
    <SettingsSection
      id="appearance"
      title={t('settings.appearance.title')}
      isActive={isActive}
      searchEntries={entries}
    >
      <SearchableRow {...rows.appTheme}>
        <FieldRow
          label={rows.appTheme.title}
          description={
            t('settings.appearance.appThemeDescription') +
            (isLiquidGlass(appTheme) ? t('settings.appearance.appThemeDescriptionGlassExtra') : '')
          }
          control={
            <SegmentedPill
              value={appTheme}
              options={[
                { value: 'auto', label: t('settings.appearance.themeFollowTerminal') },
                { value: 'dark', label: t('settings.appearance.themeDark') },
                { value: 'light', label: t('settings.appearance.themeLight') },
                { value: 'liquid-glass', label: t('settings.appearance.themeLiquidGlass') }
              ]}
              onChange={(v) => void chooseAppTheme(v)}
              ariaLabel={rows.appTheme.title}
            />
          }
        />
      </SearchableRow>
      {isLiquidGlass(appTheme) && (
        <SearchableRow {...rows.glassTint}>
          <FieldRow
            label={rows.glassTint.title}
            description={
              glassA11y.reduceTransparency
                ? t('settings.appearance.glassReduceTransparency')
                : glassA11y.moreContrast
                ? t('settings.appearance.glassMoreContrast')
                : glassSlider < GLASS_READABLE_TICK
                ? t('settings.appearance.glassClearer')
                : t('settings.appearance.glassReadable')
            }
            control={
              <GlassSlider
                value={glassSlider}
                disabled={glassLocked}
                onChange={(v) => update({ glassTint: v })}
              />
            }
          />
        </SearchableRow>
      )}
      {isLiquidGlass(appTheme) && (
        <SearchableRow {...rows.glassBlurWhileMoving}>
          <FieldRow
            label={rows.glassBlurWhileMoving.title}
            description={t('settings.appearance.glassBlurDescription')}
            control={
              <Switch
                checked={glassBlurWhileMoving}
                onChange={(v) => update({ glassBlurWhileMoving: v })}
                ariaLabel={rows.glassBlurWhileMoving.title}
              />
            }
          />
        </SearchableRow>
      )}
      <SearchableRow {...rows.uiScale}>
        <UiScaleRow />
      </SearchableRow>
      <SearchableRow {...rows.tabBarHeight}>
        <TabBarHeightRow />
      </SearchableRow>
      <SearchableRow {...rows.stickyNoteBacking}>
        <CanvasBackingRow kind="stickyNoteBacking" />
      </SearchableRow>
      <SearchableRow {...rows.groupFrameBacking}>
        <CanvasBackingRow kind="groupFrameBacking" />
      </SearchableRow>
      <MarkdownFontRows />
      <SearchableRow {...rows.accent}>
        <div className="flex items-center justify-between gap-4 py-2.5">
          <span className="text-[13px] text-text">{rows.accent.title}</span>
          <div className="flex flex-wrap gap-2">
            {/* The SYSTEM subset only, never the whole palette: `--accent` is painted as an
                opaque background under hardcoded #fff (.dock-add, the dictation button, the
                badge), where white on gemini blue is ~3.6:1 and on grok grey ~4.0:1 - under the
                4.5:1 floor for the 10.5px badge. See isSystemNodeColor. */}
            {SYSTEM_NODE_COLOR_SWATCHES.map(({ value: c, label }) => (
              <button
                key={c}
                type="button"
                aria-label={`Accent ${label}`}
                title={label}
                aria-pressed={accent === c}
                onClick={() => update({ accent: c })}
                style={{ background: c }}
                className={cn(
                  'size-6 rounded-full border-2',
                  accent === c ? 'border-text' : 'border-transparent'
                )}
              />
            ))}
          </div>
        </div>
      </SearchableRow>
      <SearchableRow {...rows.wallpaper}>
        <WallpaperPicker />
      </SearchableRow>
      <SearchableRow {...rows.windowTitle}>
        <FieldRow
          label={t('settings.appearance.windowTitleFieldLabel')}
          description={t('settings.appearance.windowTitleDescription')}
          control={
            <Switch
              checked={windowTitleActiveSession}
              onChange={(v) => update({ windowTitleActiveSession: v })}
              ariaLabel={t('settings.appearance.windowTitleAria')}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.canvasDots}>
        <FieldRow
          label={rows.canvasDots.title}
          description={t('settings.appearance.canvasDotsDescription')}
          control={
            <Switch
              checked={showCanvasDots(canvasDots)}
              onChange={(v) => update({ canvasDots: v })}
              ariaLabel={rows.canvasDots.title}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.resumeCard}>
        <FieldRow
          label={rows.resumeCard.title}
          description={t('settings.appearance.resumeCardDescription')}
          control={
            <Switch
              checked={showResumeCard}
              onChange={(v) => update({ showResumeCard: v })}
              ariaLabel={t('settings.appearance.resumeCardAria')}
            />
          }
        />
      </SearchableRow>
      {/* One wrapper element per row: the section body puts a divider and its own padding around
          every direct child, so a heading + caption + list must arrive as a single node. */}
      <SearchableRow {...rows.menuItems}>
        <div>
          <h4 className="text-[13px] font-medium text-text">{rows.menuItems.title}</h4>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">
            {t('settings.appearance.menuItemsDescription')}
          </p>
          <VisibilityToggles
            rows={HIDEABLE_MENU_ITEMS}
            hidden={hiddenNodeMenuItems}
            where={t('settings.appearance.menuItemsVisibilityWhere')}
            onChange={(next) => update({ hiddenNodeMenuItems: next })}
          />
        </div>
      </SearchableRow>
      <SearchableRow {...rows.headerButtons}>
        <div>
          <h4 className="text-[13px] font-medium text-text">{rows.headerButtons.title}</h4>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">
            {t('settings.appearance.headerButtonsDescription')}
          </p>
          <VisibilityToggles
            rows={HIDEABLE_HEADER_BUTTONS}
            hidden={hiddenHeaderButtons}
            where={t('settings.appearance.headerButtonsVisibilityWhere')}
            onChange={(next) => update({ hiddenHeaderButtons: next })}
          />
        </div>
      </SearchableRow>
      <SearchableRow {...rows.reset}>
        <SectionReset
          keys={APPEARANCE_RESET_KEYS}
          label={rows.reset.title}
          what={t('settings.appearance.resetAppearanceWhat')}
        />
      </SearchableRow>
    </SettingsSection>
  )
}
