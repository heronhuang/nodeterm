import { t as menuT } from '../i18n/runtime'
import { isMacPlatform, isWindowsPlatform } from '@shared/platform-utils'

/**
 * Naming THIS machine's file manager. Viewer-platform is correct here (unlike file-link dialects,
 * which follow the filesystem-owning core): every caller is already gated by `canRevealLocally` /
 * `canUseLocalShell`, i.e. "the desktop app hands a local path to its own OS".
 */
export type RevealOs = 'darwin' | 'win32' | 'other'

export function viewerRevealOs(): RevealOs {
  if (isMacPlatform()) return 'darwin'
  if (isWindowsPlatform()) return 'win32'
  return 'other'
}

/** "Finder" / "File Explorer" / "file manager". */
export function osFileManagerName(os: RevealOs = viewerRevealOs()): string {
  return os === 'darwin' ? 'Finder' : os === 'win32' ? 'File Explorer' : 'file manager'
}

/**
 * The OS-reveal menu label. Windows says "Show in File Explorer" — deliberately NOT "Reveal in
 * Explorer", which is the link menu's row for the in-app Explorer DRAWER.
 */
export function osRevealLabel(os: RevealOs = viewerRevealOs()): string {
  if (os === 'darwin') return menuT('menuItems.revealInFinder')
  if (os === 'win32') return menuT('menuItems.showInFileExplorer')
  return menuT('menuItems.revealInFileManager')
}

/**
 * Join a repo-relative git path (always `/`-separated) onto a local checkout for the OS reveal.
 * Windows gets one native separator throughout; every other platform keeps the historical
 * `${cwd}/${rel}` byte for byte.
 */
export function localRevealPath(cwd: string | undefined, rel: string, os: RevealOs = viewerRevealOs()): string {
  if (os !== 'win32' || cwd === undefined) return `${cwd}/${rel}`
  return `${cwd.replace(/[\\/]+$/, '')}\\${rel.replace(/\//g, '\\')}`
}
