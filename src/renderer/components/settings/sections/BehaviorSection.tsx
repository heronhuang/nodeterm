import { useMemo, useState } from 'react'
import { useI18n } from '@renderer/i18n/useI18n'
import { useSettings } from '../../../state/settings'
import { SettingsSection } from '../SettingsSection'
import { SearchableRow } from '../SearchableRow'
import { FieldRow } from '../FieldRow'
import { Switch } from '@renderer/ui/Switch'
import { NumberField } from '@renderer/ui/NumberField'
import { Select } from '@renderer/ui/Select'
import { SegmentedPill } from '@renderer/ui/SegmentedPill'
import { Input } from '@renderer/ui/Input'
import { hintLabel, isMacPlatform, isWindowsPlatform } from '@shared/platform-utils'
import { trackpadRoutingSupported } from '@renderer/canvas/wheel-gesture'
import { isBrowserRuntime } from '@renderer/bridge/runtime'
import { backgroundCloseRowVisible } from '@renderer/lib/backgroundClose'
import type { BackgroundOnCloseSetting } from '@shared/types'
import { clampWheelZoomSpeed } from '@renderer/canvas/wheel-zoom'
import { DEFAULT_WORKTREE_PATH_TEMPLATE } from '@shared/worktree'
import type { NewProjectStorage } from '@shared/project-storage'
import { Button } from '@renderer/ui/Button'
import type { NodeSize } from '@shared/default-node-size'
import {
  NODE_SIZE_CHOICES,
  NODE_SIZE_CHOICE_LABELS,
  nodeSizeField,
  nodeSizePatch,
  nodeSizeResetPatch,
  type NodeSizeChoice
} from '@renderer/lib/defaultNodeSizeSetting'

const ROW_DEFS = {
  defaultView: {
    key: 'settings.behavior.rows.defaultView.title',
    keywords: ['default', 'view', 'kanban', 'board', 'canvas', 'project']
  },
  omniKanban: {
    key: 'settings.behavior.rows.omniKanban.title',
    keywords: ['omni', 'kanban', 'swimlane', 'global', 'overview', 'board', 'project']
  },
  omniKanbanDefault: {
    key: 'settings.behavior.rows.omniKanbanDefault.title',
    keywords: ['omni', 'kanban', 'global', 'default', 'shortcut', 'cmd', 'shift', 'b']
  },
  gridSize: {
    key: 'settings.behavior.rows.gridSize.title',
    keywords: ['grid', 'size', 'snap']
  },
  nodeSize: {
    key: 'settings.behavior.rows.nodeSize.title',
    keywords: [
      'node', 'size', 'width', 'height', 'terminal', 'default', 'sticky', 'note', 'browser', 'web',
      'editor', 'diff', 'file', 'manager', 'video', 'simulator', 'trigger', 'dino'
    ]
  },
  snap: {
    key: 'settings.behavior.rows.snap.title',
    keywords: ['snap', 'grid', 'align']
  },
  autoAlign: {
    key: 'settings.behavior.rows.autoAlign.title',
    keywords: ['snap', 'grid', 'align', 'arrange', 'auto', 'mode']
  },
  panHover: {
    key: 'settings.behavior.rows.panHover.title',
    keywords: ['pan', 'hover', 'delay', 'focus', 'guard']
  },
  focusFollowsPointer: {
    key: 'settings.behavior.rows.focusFollowsPointer.title',
    keywords: ['focus', 'hover', 'pointer', 'click', 'follows', 'x11', 'sloppy', 'mouse', 'keyboard', 'terminal', 'mac']
  },
  doubleClick: {
    key: 'settings.behavior.rows.doubleClick.title',
    keywords: ['double', 'click', 'focus']
  },
  focusZoom: {
    key: 'settings.behavior.rows.focusZoom.title',
    keywords: ['zoom', 'focus', 'go to', 'node', 'jump', 'camera', 'session', 'sidebar']
  },
  closeProjectOnLastSession: {
    key: 'settings.behavior.rows.closeProjectOnLastSession.title',
    keywords: ['close', 'project', 'last', 'session', 'node', 'tab', 'recently closed', 'cleanup', 'agent', 'terminal']
  },
  rememberLock: {
    key: 'settings.behavior.rows.rememberLock.title',
    keywords: ['lock', 'canvas', 'view', 'pan', 'zoom', 'freeze', 'remember', 'restart', 'persist']
  },
  openLinks: {
    key: 'settings.behavior.rows.openLinks.title',
    keywords: ['link', 'url', 'scheme', 'deep link', 'nodeterm://', 'open', 'other apps', 'protocol', 'external']
  },
  mdPreview: {
    key: 'settings.behavior.rows.mdPreview.title',
    keywords: ['markdown', 'md', 'preview', 'render', 'editor', 'docs', 'readme', 'file']
  },
  sidebarCollapse: {
    key: 'settings.behavior.rows.sidebarCollapse.title',
    keywords: ['sidebar', 'sessions', 'collapse', 'expand', 'project', 'switch', 'group', 'tree']
  },
  sidebarGrouping: {
    key: 'settings.behavior.rows.sidebarGrouping.title',
    keywords: ['sidebar', 'sessions', 'group', 'status', 'project', 'attention']
  },
  projectStorage: {
    key: 'settings.behavior.rows.projectStorage.title',
    keywords: ['project', 'storage', 'app data', 'nodeterm', 'folder', 'repo', 'project.json', 'git', 'client']
  },
  worktreePath: {
    key: 'settings.behavior.rows.worktreePath.title',
    keywords: ['worktree', 'git', 'path', 'folder', 'repo', 'branch', 'template']
  },
  wheelZoom: {
    key: 'settings.behavior.rows.wheelZoom.title',
    keywords: ['zoom', 'wheel', 'scroll', 'mouse', 'pan']
  },
  wheelZoomSpeed: {
    key: 'settings.behavior.rows.wheelZoomSpeed.title',
    keywords: ['zoom', 'wheel', 'speed', 'sensitivity', 'step', 'jump', 'mouse', 'scroll']
  },
  trackpadPan: {
    key: 'settings.behavior.rows.trackpadPan.title',
    keywords: ['trackpad', 'pan', 'scroll', 'zoom', 'magic', 'mouse', 'two-finger', 'macos', 'windows', 'touchpad']
  },
  dragMode: {
    key: 'settings.behavior.rows.dragMode.title',
    keywords: ['pan', 'drag', 'select', 'canvas', 'mouse', 'grab', 'figma', 'miro']
  },
  browserSaver: {
    key: 'settings.behavior.rows.browserSaver.title',
    keywords: ['browser', 'memory', 'saver', 'ram', 'webview', 'discard', 'page', 'web']
  },
  keepAwake: {
    key: 'settings.behavior.rows.keepAwake.title',
    keywords: ['sleep', 'awake', 'power', 'battery', 'suspend', 'run', 'lid', 'thermal', 'heat']
  },
  confirmQuit: {
    key: 'settings.behavior.rows.confirmQuit.title',
    keywords: ['quit', 'exit', 'close', 'confirm', 'dialog', 'ask']
  },
  backgroundClose: {
    key: 'settings.behavior.rows.backgroundClose.title',
    keywords: ['tray', 'background', 'close', 'minimize', 'notification area', 'system tray', 'quit', 'phone']
  }
} as const
// The background-close row only exists for a desktop window off macOS, so search must not offer
// it anywhere else. Decided once: neither the platform nor the runtime changes under a live page.
const SHOW_BACKGROUND_CLOSE = backgroundCloseRowVisible(isMacPlatform(), isBrowserRuntime())
// nodeterm:// links are a desktop OS URL scheme: the Server Edition registers none and its bridge
// stub refuses every link, so the switch would do nothing in a browser tab.
const SHOW_OPEN_LINKS = !isBrowserRuntime()

export function BehaviorSection({ isActive }: { isActive: boolean }): React.JSX.Element {
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
    () =>
      Object.values(rows).filter(
        (r) =>
          (SHOW_BACKGROUND_CLOSE || r !== rows.backgroundClose) &&
          (SHOW_OPEN_LINKS || r !== rows.openLinks)
      ),
    [rows]
  )

  const settings = useSettings((s) => s.settings)
  const update = useSettings((s) => s.update)
  return (
    <SettingsSection id="behavior" title={t('settings.behavior.title')} isActive={isActive} searchEntries={entries}>
      <SearchableRow {...rows.defaultView}>
        <FieldRow
          label={t('settings.behavior.defaultViewLabel')}
          description={t('settings.behavior.defaultViewDescription')}
          control={
            <Select
              aria-label={t('settings.behavior.defaultViewLabel')}
              value={settings.defaultProjectView === 'kanban' ? 'kanban' : 'canvas'}
              onChange={(e) => update({ defaultProjectView: e.target.value as 'canvas' | 'kanban' })}
            >
              <option value="canvas">{t('settings.behavior.viewCanvas')}</option>
              <option value="kanban">{t('settings.behavior.viewKanban')}</option>
            </Select>
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.omniKanban}>
        <FieldRow
          label={t('settings.behavior.omniKanbanLabel')}
          description={t('settings.behavior.omniKanbanDescription')}
          control={
            <Switch
              checked={settings.omniKanbanEnabled === true}
              onChange={(v) => update({ omniKanbanEnabled: v })}
              ariaLabel={t('settings.behavior.omniKanbanAria')}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.omniKanbanDefault}>
        <FieldRow
          label={t('settings.behavior.omniDefaultLabel')}
          description={t('settings.behavior.omniDefaultDescription')}
          control={
            <Switch
              checked={settings.omniKanbanAsDefault === true}
              onChange={(v) => update({ omniKanbanAsDefault: v })}
              ariaLabel={t('settings.behavior.omniDefaultAria')}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.gridSize}>
        <FieldRow
          label={t('settings.behavior.gridSizeLabel')}
          control={
            <NumberField
              value={settings.gridSize}
              min={8}
              max={96}
              onChange={(v) => update({ gridSize: v || 24 })}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.nodeSize}>
        <DefaultNodeSizeRow />
      </SearchableRow>
      <SearchableRow {...rows.snap}>
        <FieldRow
          label={t('settings.behavior.snapLabel')}
          control={
            <Switch
              checked={settings.snapToGrid}
              onChange={(v) => update({ snapToGrid: v })}
              ariaLabel={t('settings.behavior.snapLabel')}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.autoAlign}>
        <FieldRow
          label={t('settings.behavior.autoAlignLabel')}
          description={t('settings.behavior.autoAlignDescription')}
          control={
            <Switch
              checked={settings.autoAlignGrid}
              onChange={(v) => update({ autoAlignGrid: v })}
              ariaLabel={t('settings.behavior.autoAlignLabel')}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.focusFollowsPointer}>
        <FieldRow
          label={rows.focusFollowsPointer.title}
          description={
            settings.terminalFocusFollowsPointer
              ? t('settings.behavior.focusFollowsPointerOn')
              : t('settings.behavior.focusFollowsPointerOff')
          }
          control={
            <Switch
              checked={settings.terminalFocusFollowsPointer}
              onChange={(v) => update({ terminalFocusFollowsPointer: v })}
              ariaLabel={rows.focusFollowsPointer.title}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.panHover}>
        <FieldRow
          label={rows.panHover.title}
          description={
            settings.terminalFocusFollowsPointer
              ? undefined
              : t('settings.behavior.panHoverUnused')
          }
          control={
            <NumberField
              value={settings.panHoverDelay}
              min={0}
              max={2000}
              step={50}
              onChange={(v) => update({ panHoverDelay: v || 0 })}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.doubleClick}>
        <FieldRow
          label={rows.doubleClick.title}
          control={
            <Switch
              checked={settings.doubleClickFocus}
              onChange={(v) => update({ doubleClickFocus: v })}
              ariaLabel={rows.doubleClick.title}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.focusZoom}>
        <FieldRow
          label={rows.focusZoom.title}
          description={t('settings.behavior.focusZoomDescription')}
          control={
            <Switch
              checked={settings.focusZoomToNode}
              onChange={(v) => update({ focusZoomToNode: v })}
              ariaLabel={rows.focusZoom.title}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.closeProjectOnLastSession}>
        <FieldRow
          label={rows.closeProjectOnLastSession.title}
          description={t('settings.behavior.closeProjectDescription')}
          control={
            <Switch
              checked={settings.offerCloseProjectOnLastSession}
              onChange={(v) => update({ offerCloseProjectOnLastSession: v })}
              ariaLabel={rows.closeProjectOnLastSession.title}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.rememberLock}>
        <FieldRow
          label={rows.rememberLock.title}
          description={t('settings.behavior.rememberLockDescription')}
          control={
            <Switch
              checked={settings.rememberCanvasLock}
              onChange={(v) => update({ rememberCanvasLock: v })}
              ariaLabel={rows.rememberLock.title}
            />
          }
        />
      </SearchableRow>
      {SHOW_OPEN_LINKS && (
        <SearchableRow {...rows.openLinks}>
          <FieldRow
            label={rows.openLinks.title}
            description={t('settings.behavior.openLinksDescription')}
            control={
              <Switch
                checked={settings.allowOpenLinks}
                onChange={(v) => update({ allowOpenLinks: v })}
                ariaLabel={rows.openLinks.title}
              />
            }
          />
        </SearchableRow>
      )}
      <SearchableRow {...rows.mdPreview}>
        <FieldRow
          label={rows.mdPreview.title}
          description={t('settings.behavior.mdPreviewDescription')}
          control={
            <Switch
              checked={settings.openMarkdownPreview}
              onChange={(v) => update({ openMarkdownPreview: v })}
              ariaLabel={rows.mdPreview.title}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.sidebarCollapse}>
        <FieldRow
          label={rows.sidebarCollapse.title}
          description={t('settings.behavior.sidebarCollapseDescription')}
          control={
            <Switch
              checked={settings.sidebarAutoCollapse}
              onChange={(v) => update({ sidebarAutoCollapse: v })}
              ariaLabel={rows.sidebarCollapse.title}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.sidebarGrouping}>
        <FieldRow
          label={t('settings.behavior.sidebarGroupingLabel')}
          description={t('settings.behavior.sidebarGroupingDescription')}
          control={
            <SegmentedPill<'project' | 'status'>
              value={settings.sidebarGrouping}
              ariaLabel={t('settings.behavior.groupSessionsAria')}
              options={[
                { value: 'project', label: t('settings.behavior.groupByProject') },
                { value: 'status', label: t('settings.behavior.groupByStatus') }
              ]}
              onChange={(v) => update({ sidebarGrouping: v })}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.projectStorage}>
        <FieldRow
          label={rows.projectStorage.title}
          description={t('settings.behavior.projectStorageDescription')}
          control={
            <Select
              aria-label={rows.projectStorage.title}
              value={settings.newProjectStorage}
              onChange={(e) => update({ newProjectStorage: e.target.value as NewProjectStorage })}
            >
              <option value="folder">{t('settings.behavior.storageInFolder')}</option>
              <option value="appData">{t('settings.behavior.storageInAppData')}</option>
            </Select>
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.worktreePath}>
        <FieldRow
          label={rows.worktreePath.title}
          description={t('settings.behavior.worktreePathDescription')}
          control={
            <Input
              className="w-80 font-mono"
              aria-label={rows.worktreePath.title}
              placeholder={DEFAULT_WORKTREE_PATH_TEMPLATE}
              value={settings.worktreePathTemplate}
              onChange={(e) => update({ worktreePathTemplate: e.target.value })}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.wheelZoom}>
        <FieldRow
          label={rows.wheelZoom.title}
          description={hintLabel(t('settings.behavior.wheelZoomDescription'))}
          control={
            <Switch
              checked={settings.wheelZoom}
              onChange={(v) => update({ wheelZoom: v })}
              ariaLabel={rows.wheelZoom.title}
            />
          }
        />
      </SearchableRow>
      <div
        className={
          'mt-3 space-y-3 border-l border-border pl-4' +
          (settings.wheelZoom ? '' : ' pointer-events-none opacity-40')
        }
        aria-disabled={!settings.wheelZoom}
      >
        <SearchableRow {...rows.wheelZoomSpeed}>
          <FieldRow
            label={rows.wheelZoomSpeed.title}
            description={t('settings.behavior.wheelZoomSpeedDescription')}
            control={
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0.2}
                  max={2}
                  step={0.1}
                  value={clampWheelZoomSpeed(settings.wheelZoomSpeed)}
                  aria-label={rows.wheelZoomSpeed.title}
                  onChange={(e) => update({ wheelZoomSpeed: Number(e.target.value) })}
                  className="w-40 accent-[var(--accent)]"
                />
                <span className="w-12 text-right text-[12px] text-muted tabular-nums">
                  {clampWheelZoomSpeed(settings.wheelZoomSpeed).toFixed(1)}×
                </span>
              </div>
            }
          />
        </SearchableRow>
      </div>
      {trackpadRoutingSupported({ mac: isMacPlatform(), windows: isWindowsPlatform() }) && (
        <SearchableRow {...rows.trackpadPan}>
          <FieldRow
            label={rows.trackpadPan.title}
            description={hintLabel(t('settings.behavior.trackpadPanDescription'))}
            control={
              <Switch
                checked={settings.trackpadPan}
                onChange={(v) => update({ trackpadPan: v })}
                ariaLabel={rows.trackpadPan.title}
              />
            }
          />
        </SearchableRow>
      )}
      <SearchableRow {...rows.dragMode}>
        <FieldRow
          label={rows.dragMode.title}
          description={t('settings.behavior.dragModeDescription')}
          control={
            <Select
              aria-label={rows.dragMode.title}
              value={settings.canvasDragMode}
              onChange={(e) => update({ canvasDragMode: e.target.value as 'select' | 'pan' })}
            >
              <option value="select">{t('settings.behavior.dragSelect')}</option>
              <option value="pan">{t('settings.behavior.dragPan')}</option>
            </Select>
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.browserSaver}>
        <FieldRow
          label={rows.browserSaver.title}
          description={t('settings.behavior.browserSaverDescription')}
          control={
            <Switch
              checked={settings.browserMemorySaver}
              onChange={(v) => update({ browserMemorySaver: v })}
              ariaLabel={rows.browserSaver.title}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.keepAwake}>
        <FieldRow
          label={rows.keepAwake.title}
          description={t('settings.behavior.keepAwakeDescription')}
          control={
            <Switch
              checked={settings.keepAwakeWhileAgentsWork}
              onChange={(v) => update({ keepAwakeWhileAgentsWork: v })}
              ariaLabel={rows.keepAwake.title}
            />
          }
        />
      </SearchableRow>
      <SearchableRow {...rows.confirmQuit}>
        <FieldRow
          label={rows.confirmQuit.title}
          description={t('settings.behavior.confirmQuitDescription')}
          control={
            <Switch
              checked={settings.confirmBeforeQuit}
              onChange={(v) => update({ confirmBeforeQuit: v })}
              ariaLabel={rows.confirmQuit.title}
            />
          }
        />
      </SearchableRow>
      {SHOW_BACKGROUND_CLOSE && (
        <SearchableRow {...rows.backgroundClose}>
          <FieldRow
            label={rows.backgroundClose.title}
            description={
              isWindowsPlatform()
                ? t('settings.behavior.backgroundCloseDescriptionWindows')
                : t('settings.behavior.backgroundCloseDescriptionLinux')
            }
            control={
              <Select
                aria-label={rows.backgroundClose.title}
                value={settings.runInBackgroundOnClose}
                onChange={(e) => update({ runInBackgroundOnClose: e.target.value as BackgroundOnCloseSetting })}
              >
                <option value="auto">{t('settings.behavior.backgroundAuto')}</option>
                <option value="on">{t('settings.behavior.backgroundOn')}</option>
                <option value="off">{t('settings.behavior.backgroundOff')}</option>
              </Select>
            }
          />
        </SearchableRow>
      )}
    </SettingsSection>
  )
}

/**
 * One width × height pair for whichever kind the picker names. New nodes of that kind open at it;
 * existing nodes keep their size. The model (and why terminal is special) is in
 * lib/defaultNodeSizeSetting.ts.
 */
function DefaultNodeSizeRow(): React.JSX.Element {
  const { t } = useI18n()
  const settings = useSettings((s) => s.settings)
  const update = useSettings((s) => s.update)
  const [choice, setChoice] = useState<NodeSizeChoice>('terminal')
  const field = nodeSizeField(settings, choice)
  const set = (size: NodeSize): void => {
    update(nodeSizePatch(settings, choice, size))
  }
  return (
    <FieldRow
      label={t('settings.behavior.nodeSizeLabel')}
      description={t('settings.behavior.nodeSizeDescription')}
      control={
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Select
            aria-label={t('settings.behavior.nodeKindAria')}
            value={choice}
            onChange={(e) => setChoice(e.target.value as NodeSizeChoice)}
          >
            {NODE_SIZE_CHOICES.map((c) => (
              <option key={c} value={c}>
                {NODE_SIZE_CHOICE_LABELS[c]}
              </option>
            ))}
          </Select>
          <NumberField
            ariaLabel={`${NODE_SIZE_CHOICE_LABELS[choice]} default width`}
            value={field.size.width}
            min={field.min.width}
            max={field.max.width}
            step={20}
            onChange={(v) => set({ width: v || field.size.width, height: field.size.height })}
          />
          <span style={{ opacity: 0.6 }}>×</span>
          <NumberField
            ariaLabel={`${NODE_SIZE_CHOICE_LABELS[choice]} default height`}
            value={field.size.height}
            min={field.min.height}
            max={field.max.height}
            step={20}
            onChange={(v) => set({ width: field.size.width, height: v || field.size.height })}
          />
          {field.isCustom && (
            <Button variant="ghost" onClick={() => update(nodeSizeResetPatch(settings, choice))}>
              {t('settings.behavior.reset')}
            </Button>
          )}
        </div>
      }
    />
  )
}
