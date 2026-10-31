import { t as menuT } from '../i18n/runtime'
// Which rows of the node right-click menu and the terminal node header the user is allowed to
// hide (Settings → the visibility toggles), plus the predicate both call sites share.
//
// Hiding is stored as a HIDDEN list rather than a visible one: an empty array means everything
// shows, so existing users see no change and any row added in a later release appears by default
// instead of silently staying hidden.
//
// The inventories are the whole safety story. Destructive and recovery actions — Delete, Restart
// agent, Branch/Transfer conversation, the terminal Search button, Close — are simply not in them,
// and `isHidden` checks membership rather than trusting the saved list, so a stale or hand-edited
// settings.json can never take Delete off the menu.

export interface HideableRow {
  /** Stable id, persisted in settings — renaming one un-hides that row for existing users. */
  id: string
  /** User-facing label, shown in the Settings toggles. Matches the menu/header wording. */
  label: string
}

/** Hideable node right-click menu entries, in menu order. */
export const HIDEABLE_MENU_ITEMS: readonly HideableRow[] = [
  { id: 'group', get label() { return menuT('menuItems.groupNodeGroupSelection') } },
  { id: 'remove-from-group', get label() { return menuT('menuItems.removeFromGroup') } },
  { id: 'colors', get label() { return menuT('menuItems.colors') } },
  { id: 'icon', get label() { return menuT('menuItems.setIcon') } },
  { id: 'duplicate', get label() { return menuT('menuItems.duplicate') } },
  { id: 'snap-zone', get label() { return menuT('menuItems.snapToZone') } },
  { id: 'collapse', get label() { return menuT('menuItems.collapseExpand') } },
  { id: 'markdown-view', get label() { return menuT('menuItems.markdownView') } },
  { id: 'refresh-terminal', get label() { return menuT('menuItems.refreshTerminal') } },
  // The ROW that opens the create dialog. The LIVE chip that says a terminal IS being broadcast is
  // deliberately in neither inventory (lib/live-link.guard.test.ts).
  { id: 'live-link', get label() { return menuT('menuItems.shareLiveLink') } },
  { id: 'vanilla-restart', get label() { return menuT('menuItems.restartOnSubscription') } }
]

/** Hideable terminal node header buttons, in header order. */
export const HIDEABLE_HEADER_BUTTONS: readonly HideableRow[] = [
  // Not a button but the model + context-usage pill (issue #1141). `ContextMeter` asks this id
  // itself, so it hides on all three places the pill is drawn: node header, kanban card, card
  // modal. Display only — usage tracking and the ⌘M composer's model label are unaffected.
  { id: 'context-meter', get label() { return menuT('menuItems.modelContextMeter') } },
  { id: 'maximize', get label() { return menuT('menuItems.maximize') } },
  { id: 'refresh', get label() { return menuT('menuItems.refresh') } },
  { id: 'mic', get label() { return menuT('menuItems.dictate') } },
  { id: 'ai-name', get label() { return menuT('menuItems.nameWithAi') } },
  { id: 'comments', get label() { return menuT('menuItems.comments') } },
  // The header twin of the node menu's "Share live link…" row. The button may be hidden; the LIVE
  // chip it leads to never can (renderer/lib/live-link.guard.test.ts).
  { id: 'share-link', get label() { return menuT('menuItems.shareLiveLink') } },
  { id: 'hide-fanout', get label() { return menuT('menuItems.hideCardsConnections') } },
  { id: 'tidy-fanout', get label() { return menuT('menuItems.tidySubagentCards') } },
  // Not in the header proper but the label row right under it (`lib/mdViewHint.ts`); it is the
  // same kind of quiet per-node affordance, so it lives in the same Settings list.
  { id: 'md-hint', get label() { return menuT('menuItems.markdownChatViewHint') } }
]

/** Every id the user may hide — the guard that makes everything else unhideable. */
const HIDEABLE_IDS = new Set<string>(
  [...HIDEABLE_MENU_ITEMS, ...HIDEABLE_HEADER_BUTTONS].map((r) => r.id)
)

/**
 * True only when `id` is BOTH hideable and present in the saved list. Unknown ids in the list are
 * ignored, and an id outside the inventory stays visible no matter what the list says.
 */
export function isHidden(id: string, hidden: readonly string[]): boolean {
  // settings.json is hand-editable and nothing normalizes these two lists on load: a non-array
  // value must read as "nothing hidden", not throw inside a node header's render.
  return HIDEABLE_IDS.has(id) && Array.isArray(hidden) && hidden.includes(id)
}
