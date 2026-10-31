/** Behavior settings section (English). */
export const behaviorEn = {
  title: 'Behavior',
  rows: {
    defaultView: { title: 'Default view' },
    omniKanban: { title: 'Omni Kanban (global swimlanes)' },
    omniKanbanDefault: { title: 'Omni as default for Cmd+Shift+B' },
    gridSize: { title: 'Grid size' },
    nodeSize: { title: 'Default node size' },
    snap: { title: 'Snap to grid' },
    autoAlign: { title: 'Snap to grid mode (auto-arrange)' },
    panHover: { title: 'Pan-hover delay (ms)' },
    focusFollowsPointer: { title: 'Terminal focus follows pointer' },
    doubleClick: { title: 'Double-click to focus' },
    focusZoom: { title: 'Zoom when going to a node' },
    closeProjectOnLastSession: { title: 'Offer to close a project after its last session' },
    rememberLock: { title: 'Remember the canvas lock' },
    openLinks: { title: 'Allow nodeterm:// links' },
    mdPreview: { title: 'Open Markdown in preview' },
    sidebarCollapse: { title: 'Sidebar: collapse inactive by default' },
    sidebarGrouping: { title: 'Sidebar: group by' },
    projectStorage: { title: 'New folder projects store their canvas' },
    worktreePath: { title: 'Worktree path template' },
    wheelZoom: { title: 'Scroll wheel zooms' },
    wheelZoomSpeed: { title: 'Wheel zoom speed' },
    trackpadPan: { title: 'Trackpad scroll pans' },
    dragMode: { title: 'Canvas left-drag' },
    browserSaver: { title: 'Browser memory saver' },
    keepAwake: { title: 'Keep awake while agents work' },
    confirmQuit: { title: 'Confirm before quitting' },
    backgroundClose: { title: 'Keep running when the window closes' }
  },
  defaultViewLabel: 'Default view',
  defaultViewDescription:
    "How a project opens when you haven't switched it. Projects you toggle keep their own choice.",
  viewCanvas: 'Canvas',
  viewKanban: 'Kanban board',
  omniKanbanLabel: 'Omni Kanban (global swimlanes)',
  omniKanbanDescription:
    'When enabled, the global Kanban overview is available via its dedicated shortcut (Settings → Keyboard Shortcuts → Toggle global kanban). Default OFF — existing users see no change.',
  omniKanbanAria: 'Omni Kanban',
  omniDefaultLabel: 'Make Omni the default for Cmd+Shift+B',
  omniDefaultDescription:
    'When enabled, Cmd+Shift+B opens the global overview instead of the per-project board. The dedicated global shortcut always opens Omni regardless. Opt-in, per user.',
  omniDefaultAria: 'Omni as default',
  gridSizeLabel: 'Grid size',
  snapLabel: 'Snap to grid',
  autoAlignLabel: 'Snap to grid mode',
  autoAlignDescription:
    'Arranges every node to the grid at the moment you turn it on — like a desktop “Auto arrange”. Distinct from the drag-snap toggle above, which only constrains dragging.',
  focusFollowsPointerOn:
    'On: hovering a terminal for the pan-hover delay gives it the keyboard. It keeps the keyboard when the pointer moves off — until you hover another terminal, or click another node, the empty canvas or a field. Turn off for click to focus.',
  focusFollowsPointerOff:
    'Off (click to focus): click a terminal to type in it. It keeps the keyboard until you click another node, the empty canvas or a field — moving the pointer away changes nothing.',
  panHoverUnused:
    'Not used in click-to-focus mode (Terminal focus follows pointer is off): hovering never takes the keyboard.',
  focusZoomDescription: 'Off: going to a node keeps your current zoom and only pans to it.',
  closeProjectDescription:
    'When you close the last terminal or agent node in a project with ×, ask whether to close the project too. It stays reopenable from Recently closed.',
  rememberLockDescription:
    'The bottom-left lock stays on across restarts until you turn it off. Off: every launch starts unlocked.',
  openLinksDescription:
    'Lets other apps, scripts and web pages ask nodeterm to open one agent or terminal node, or pre-fill a pairing code. Every link shows a confirm sheet first and opens nothing until you click Open. Off: links are ignored.',
  mdPreviewDescription:
    "Markdown files open rendered instead of as editable text. The node's Preview/Edit toggle still switches either way.",
  sidebarCollapseDescription:
    'Projects without an explicit choice start collapsed when inactive. Your project and group chevron choices are remembered.',
  sidebarGroupingLabel: 'Sidebar: group sessions by',
  sidebarGroupingDescription:
    'Group the sessions sidebar by project (the default) or by live status, so sessions needing attention float to the top across all projects. Status reflects local-core sessions; remote sessions show as idle.',
  groupByProject: 'Project',
  groupByStatus: 'Status',
  groupSessionsAria: 'Group sessions by',
  projectStorageDescription:
    'In the folder writes .nodeterm/project.json there, to share through git. In app data writes nothing into the folder. A folder that already has a project.json opens as it is. Move an existing project from its tab menu.',
  storageInFolder: 'In the folder',
  storageInAppData: 'In app data',
  worktreePathDescription:
    'Resolved from the repository root. Supports $repoName (also $reponame or $defaultFolderName) and $branch; a missing branch is appended automatically.',
  wheelZoomDescription: 'Zoom with a plain mouse wheel (no ⌘). Turns off scroll-to-pan — pan by dragging.',
  wheelZoomSpeedDescription:
    'How far one wheel click zooms. Turn it down if a single click jumps too far (common on high-resolution wheels like the MX Master).',
  trackpadPanDescription:
    'A two-finger trackpad scroll pans the canvas even with wheel zoom on, while a wheel mouse still zooms. The macOS desktop app tells mouse and trackpad apart directly; on Windows and in the browser (Server Edition) detection is heuristic — turn off if a smooth-scrolling mouse (Magic Mouse, MX) pans when you meant to zoom.',
  dragModeDescription:
    'What dragging empty canvas does. Pan moves the map directly (box-select moves to Shift+drag); Select rubber-band selects, panning stays on middle-drag / two-finger scroll.',
  dragSelect: 'Select (default)',
  dragPan: 'Pan the canvas',
  browserSaverDescription:
    "Free a hidden browser page's memory after 5 minutes; it reloads when shown. Each page is a whole Chromium process.",
  keepAwakeDescription:
    'Holds off idle sleep while a local agent is running. Lets the machine sleep on battery below 5% or when it runs critically hot. A closed lid still sleeps the machine, except on macOS when plugged in with an external display connected.',
  confirmQuitDescription:
    'Ask before the app quits (⌘Q / Ctrl+Q or the title-bar close). Terminal sessions survive a quit either way.',
  backgroundAuto: 'Automatic',
  backgroundOn: 'Always',
  backgroundOff: 'Never (closing quits)',
  nodeSizeLabel: 'Default node size (px)',
  nodeSizeDescription: 'Size new nodes of the chosen kind open at. Existing nodes keep their size.',
  nodeKindAria: 'Node kind',
  reset: 'Reset',
  backgroundCloseDescriptionWindows:
    'Closing the window hides nodeterm to the notification area so phone access, agent notifications and updates keep working. Quit from the tray icon or File → Exit. Automatic keeps it running on Windows.',
  backgroundCloseDescriptionLinux:
    'Closing the window hides nodeterm to the system tray so phone access, agent notifications and updates keep working. Quit from the tray icon or Ctrl+Q. Automatic quits on Linux, where a tray icon depends on your desktop.'
} as const
