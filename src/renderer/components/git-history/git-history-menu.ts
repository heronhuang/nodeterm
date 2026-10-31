import { t as menuT } from '../../i18n/runtime'
import type { MenuItem } from '../ContextMenu'
import type { GitHistoryItem } from '@shared/git-history'

export type CommitMenuHandlers = {
  openInBrowser: (item: GitHistoryItem) => void
  copyHash: (item: GitHistoryItem) => void
  copyMessage: (item: GitHistoryItem) => void
  explain: (item: GitHistoryItem) => void
  revert: (item: GitHistoryItem) => void
  branchFrom: (item: GitHistoryItem) => void
  checkout: (item: GitHistoryItem) => void
}

export function buildCommitMenuItems(item: GitHistoryItem, h: CommitMenuHandlers): MenuItem[] {
  return [
    { label: menuT('menuItems.openCommitInBrowser'), onClick: () => h.openInBrowser(item) },
    { label: menuT('menuItems.copyCommitHash'), onClick: () => h.copyHash(item) },
    { label: menuT('menuItems.copyCommitMessage'), onClick: () => h.copyMessage(item) },
    { type: 'separator' },
    { label: menuT('menuItems.newBranchFromHere'), onClick: () => h.branchFrom(item) },
    { label: menuT('menuItems.checkoutThisCommit'), onClick: () => h.checkout(item) },
    { label: menuT('menuItems.revertCommit'), onClick: () => h.revert(item), danger: true },
    { type: 'separator' },
    { label: menuT('menuItems.explainChangesWithAi'), onClick: () => h.explain(item) }
  ]
}
