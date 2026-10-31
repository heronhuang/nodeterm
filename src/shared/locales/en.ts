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
    dismiss: 'Dismiss'
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
