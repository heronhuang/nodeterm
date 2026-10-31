import { settingsSectionEn } from './settings-en'

const { language: languageSectionEn, ...settingsRestEn } = settingsSectionEn

/** English UI message catalog (nested keys resolved by createTranslator). */
export const enMessages = {
  common: {
    cancel: 'Cancel',
    ok: 'OK',
    save: 'Save',
    close: 'Close',
    delete: 'Delete',
    confirm: 'Confirm',
    back: 'Back',
    search: 'Search',
    dismiss: 'Dismiss',
    testOnlyFallback: 'English fallback string'
  },
  confirm: {
    cancel: 'Cancel',
    ok: 'OK',
    delete: 'Delete',
    confirm: 'Confirm'
  },
  menu: {
    settings: 'Settings',
    settingsMac: 'Settings…',
    snapToGrid: 'Snap to Grid',
    fitView: 'Fit View',
    toggleKanban: 'Toggle Kanban Board',
    edit: 'Edit',
    view: 'View',
    window: 'Window',
    file: 'File'
  },
  welcome: {
    tagline: 'A canvas of terminals. Start a project to begin.',
    newProject: 'New project',
    openFolder: 'Open folder…',
    cloneRepo: 'Clone repo…',
    connectSsh: 'Connect over SSH…',
    recentlyClosed: 'Recently closed',
    filterPlaceholder: 'Filter by name or folder…',
    noMatch: 'No closed projects match “{query}”.',
    close: 'Close',
    deletePermanently: 'Delete permanently (ends its sessions)',
    deletePermanentlyAria: 'Delete permanently',
    running: '{count} running',
    sessionsTooltipOne:
      '{count} tmux session from this project is still running on this machine. Reopen the project to pick them up, or × to delete it and end them.',
    sessionsTooltipOther:
      '{count} tmux sessions from this project are still running on this machine. Reopen the project to pick them up, or × to delete it and end them.'
  },
  settings: {
    groups: {
      ai: 'AI capabilities',
      workspace: 'Workspace',
      interface: 'Interface',
      connectivity: 'Remote & team',
      application: 'Application',
      projects: 'Projects'
    },
    sections: {
      terminal: 'Terminal',
      shell: 'Shell',
      behavior: 'Behavior',
      language: 'Language',
      appearance: 'Appearance',
      notch: 'Notch',
      phone: 'Phone',
      speech: 'Speech',
      shortcuts: 'Keyboard Shortcuts',
      agents: 'Agents',
      usage: 'Usage',
      accounts: 'Accounts',
      'custom-agents': 'Custom agents',
      'model-gateway': 'Model gateway',
      notifications: 'Notifications',
      commit: 'Commit messages',
      tmux: 'Session protection',
      'github-issues': 'GitHub Issues',
      license: 'License',
      presence: 'Your name',
      remote: 'Remote access',
      'team-access': 'Team seats',
      'live-links': 'Live links',
      ssh: 'Remote (SSH)',
      updates: 'Updates',
      privacy: 'Privacy',
      'sign-in': 'Sign-in',
      debug: 'Debug'
    },
    sidebar: {
      backToApp: 'Back to app',
      searchSettings: 'Search settings'
    },
    language: {
      title: 'Language',
      description: 'Choose the language used for menus, settings, and dialogs in this app.',
      label: 'Display language',
      zh: '简体中文',
      en: 'English',
      ...languageSectionEn
    },
    ...settingsRestEn
  },
  palette: {
    placeholder: 'Type a command or name…',
    empty: 'No matches',
    foundInOutput: 'found in output',
    filesSection: 'Files',
    revealInExplorer: 'Reveal in Explorer'
  },
  tabBar: {
    canvasView: 'Canvas view',
    kanbanView: 'Kanban view',
    storeInFolder: 'Store canvas in folder',
    storeInAppData: 'Store canvas in app data',
    openToResume: 'Open the project to resume',
    updateDownloaded: 'nodeterm v{version} is ready, restart to update',
    updateAvailable: 'nodeterm v{version} is available, click to download it',
    updateManual: 'nodeterm v{version} is available, download it to update',
    updateUnsupported: 'This version is no longer supported, update to continue',
    updateButton: 'Update',
    projectOptions: 'Project options',
    newProject: 'New project'
  },
  session: {
    state: {
      working: 'Running',
      attention: 'Waiting for your response',
      done: 'Done',
      unknown: 'Unknown'
    },
    group: {
      attention: 'Need attention',
      unread: 'Unread',
      working: 'Running',
      idle: 'Idle',
      unknown: 'Unknown'
    }
  },
  nodeActions: {
    nodesCount: '{count} nodes',
    oneNode: '1 node',
    stopAgentControl: 'Stop agent control',
    addToGroup: 'Add selection to {title}',
    addToGroupFallback: 'group',
    addSelectionToGroup: 'Add selection to group',
    groupFallback: 'Group',
    groupSelection: 'Group selection',
    groupNode: 'Group node',
    removeFromGroup: 'Remove from group',
    changeIcon: 'Change icon…',
    setIcon: 'Set icon…',
    duplicate: 'Duplicate',
    snapToZone: 'Snap to zone',
    collapseExpand: 'Collapse / Expand',
    markdownView: 'Markdown view',
    refreshTerminal: 'Refresh terminal',
    branchConversation: 'Branch conversation',
    delete: 'Delete',
    pauseSessions: 'Pause {count} sessions',
    restartAgent: 'Restart agent',
    restartAgentAndShell: 'Restart agent and shell',
    reopenAs: 'Reopen session as',
    switchModel: 'Switch model',
    switchModelCurrent: 'Switch model ({model})',
    restart: 'Restart',
    resumeSession: 'Resume session',
    pauseSession: 'Pause session',
    pause: 'Pause',
    pauseEndSession: 'Pause & end session',
    switchClaudeAccount: 'Switch Claude account',
    switchCodexAccount: 'Switch Codex account'
  },
  markdown: {
    localLink: "Local file links can't be opened from rendered markdown."
  },
  dialog: {
    ok: 'OK',
    cancel: 'Cancel'
  },
  sidebar: {
    title: 'Sessions',
    pin: 'Pin',
    unpin: 'Unpin',
    close: 'Close',
    groupByAria: 'Group sessions by',
    tabProject: 'Project',
    tabStatus: 'Status',
    filterPlaceholder: 'Filter sessions…',
    clearFilter: 'Clear filter',
    clearFilterTitle: 'Clear filter (Esc)',
    noMatch: 'No sessions match “{query}”.',
    noSessions: 'No sessions yet.',
    noSessionsInProject: 'No sessions',
    ungrouped: 'Ungrouped',
    expand: 'Expand',
    collapse: 'Collapse',
    expandProject: 'Expand {name}',
    collapseProject: 'Collapse {name}',
    dropRemoveFromGroup: 'Drop here to remove from group',
    addNode: 'Add a node to this project',
    dropSessionHere: 'Drop a session or group here',
    showGroupOnCanvas: 'Click to show the group on the canvas',
    renameGroup: 'Double-click to rename group',
    nameGroupAi: 'Name group with AI (from every session below it)',
    signals: {
      project: {
        attention: 'Sessions that need you',
        unread: 'Finished — new for you',
        working: 'Sessions running right now'
      },
      group: {
        attention: 'Sessions in this group that need you',
        unread: 'Finished in this group — new for you',
        working: 'CLIs running in this group right now'
      }
    }
  },
  onboarding: {
    setupKindSetup: 'Setup',
    setupKindArchive: 'Archive',
    skip: 'Skip',
    approve: 'Approve',
    runOnce: 'Run once',
    agentsMessage: 'Use the shared agent launch settings for “{name}”?',
    agentsChanged: 'These settings have changed since you approved them for this project.',
    agentsIntro:
      'They come from the project’s shared .nodeterm/settings.json, so anyone who can commit to the repo can change them. One answer covers the launch command and every variable below.',
    launchCommand: 'Launch command',
    environment: 'Environment',
    shellMessage: 'Use the shared terminal shell for “{name}”?',
    shellChanged: 'This setting has changed since you approved it for this project.',
    shellIntro:
      'It comes from the project’s shared .nodeterm/settings.json, so anyone who can commit to the repo can change it. Every terminal you open for this project starts this program.',
    shellLabel: 'Shell',
    setupMessage: 'Run the {kind} script for “{name}”?',
    setupChanged: 'These scripts have changed since you approved them for this project.',
    setupIntro:
      'They come from the project’s shared .nodeterm/settings.json, so anyone who can commit to the repo can change them. One answer covers both.',
    scriptAboutToRun: ' (about to run)'
  },
  projectLimit: {
    checking: 'Checking your free allowance…',
    connectionTitle: 'Connection needed',
    connectionBody:
      'Checking your free allowance and upgrading need a connection to api.nodeterm.dev. Only license checks are sent — telemetry stays off. You can turn this off in Settings → Privacy.',
    openTitle: '{open} of {limit} free projects are open',
    openBody:
      'Close one to make room. Closing never deletes anything — its terminals keep running and it stays one click away in Recently closed.',
    checkFailed: 'Couldn’t check your free allowance with api.nodeterm.dev.',
    retry: 'Retry',
    mismatchBase: 'Your free allowance is tied to another computer.',
    mismatchDate: 'Your free allowance is tied to another computer. It can move to this one on {date}.',
    openProjectsAria: 'Open projects',
    closeProject: 'Close',
    closeProjectAria: 'Close {name}',
    cancel: 'Cancel',
    allowAndCheck: 'Allow and check',
    upgradeCta: 'Unlimited with Pro — $10/mo'
  },
  announcement: {
    learnMore: 'Learn more'
  },
  addMenu: {
    hints: {
      worktreeSsh: 'Not supported in SSH projects yet',
      runSsh: 'Run configurations run on this machine — not in SSH projects yet',
      simulatorUnavailable: 'Simulators need the desktop app',
      simulatorRelay: 'Simulators run on this machine — not in a relay tab',
      simulatorSsh: 'Simulators run on this machine — not in SSH projects yet',
      runWindows: 'Run configurations that launch a process are not supported on Windows yet',
      noCwd:
        'This project has no folder — set one first (tab ⌄ → “Set folder…”)'
    },
    labels: {
      newTerminal: 'New terminal',
      newRemote: 'New remote…',
      newSimulator: 'New simulator',
      newRunConfiguration: 'New run configuration',
      newBrowser: 'New browser',
      newWebView: 'New web view…',
      newStickyNote: 'New sticky note',
      newFileManager: 'New file manager',
      newWhiteboard: 'New whiteboard',
      newDinoGame: 'New dino game',
      newTrigger: 'New trigger…',
      openFile: 'Open file…',
      newFile: 'New file…',
      spawnTeam: 'Spawn a team…',
      newWorktree: 'New worktree…',
      simulator: 'Simulator',
      runConfiguration: 'Run Configuration',
      browser: 'Browser',
      webView: 'Web View',
      stickyNote: 'Sticky Note',
      fileManager: 'File Manager',
      whiteboard: 'Whiteboard',
      dinoGame: 'Dino Game',
      trigger: 'Trigger',
      worktree: 'Worktree…',
      newAgent: 'New agent',
      groupView: 'New view',
      groupFiles: 'Files',
      groupOrchestrate: 'Orchestrate'
    }
  }
} as const

export type EnMessages = typeof enMessages
