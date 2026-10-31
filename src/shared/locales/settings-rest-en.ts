/** Remaining settings section strings (English). */
export const settingsRestEn = {
  appearance: {
    title: "Appearance",
    description: "Used by the ⌘M output and chat views and the editor's Markdown preview. Code inside them uses your terminal font.",
    markdownFontDescription:
      "Used by the ⌘M output and chat views and the editor's Markdown preview. Code inside them uses your terminal font.",
    rows: {
      appTheme: {
        title: "Appearance",
      },
      uiScale: {
        title: "UI scale",
      },
      tabBarHeight: {
        title: "Tab bar height",
      },
      stickyNoteBacking: {
        title: "Sticky note background",
      },
      groupFrameBacking: {
        title: "Group frame background",
      },
      markdownFont: {
        title: "Markdown font",
      },
      markdownFontSize: {
        title: "Markdown font size",
      },
      accent: {
        title: "Accent",
      },
      wallpaper: {
        title: "Desktop wallpaper",
      },
      windowTitle: {
        title: "Window title",
      },
      glassTint: {
        title: "Glass",
      },
      glassBlurWhileMoving: {
        title: "Keep blur while moving",
      },
      canvasDots: {
        title: "Show grid dots",
      },
      resumeCard: {
        title: "Resume card",
      },
      menuItems: {
        title: "Node menu items",
      },
      headerButtons: {
        title: "Terminal header buttons",
      },
      reset: {
        title: "Reset appearance",
      },
    },
    appThemeDescription:
      "Follow terminal matches the theme picked in Settings → Terminal. Liquid Glass does too, and frosts the whole interface over the desktop wallpaper, without window colour accents.",
    appThemeDescriptionGlassExtra:
      " Regular text keeps 4.5:1 contrast on glass; secondary text and coloured output can fade over bright wallpaper.",
    themeFollowTerminal: "Follow terminal",
    themeDark: "Dark",
    themeLight: "Light",
    themeLiquidGlass: "Liquid Glass",
    glassReduceTransparency:
      "Reduce Transparency is on in your system settings, so glass is opaque. Turn it off there to use this slider.",
    glassMoreContrast:
      "Increase Contrast is on in your system settings, so glass stays at Tinted with stronger edges.",
    glassClearer:
      "Clearer than Readable: more of the wallpaper shows through, and terminal text stays readable.",
    glassReadable: "Regular text keeps 4.5:1 contrast over any wallpaper.",
    glassBlurDescription: "Uses more GPU while panning and zooming.",
    uiScaleDescription:
      "Scales the whole application UI — menus, node headers, dialogs, sidebars — like a browser's page zoom. Terminal text scales with it too: the terminal font size (Settings → Terminal) is multiplied by this, so lower it there if you want terminal text to stay as it is.",
    uiScaleBrowserNote:
      "In the browser, use your browser's own page zoom (Cmd/Ctrl and + / −) — it does the same thing and the browser remembers it per site.",
    tabBarHeightDescription: "Height of the project tab strip at the top of the window, in pixels.",
    stickyNoteBackingDescription:
      "How much of what lies behind a sticky note shows through it: 0% is see-through (default), 100% is solid. The note keeps its colour either way.",
    groupFrameBackingDescription:
      "How much of the canvas shows through a group frame: 0% is see-through (default), 100% is solid. The frame keeps its colour either way.",
    markdownFontSizeDescription:
      "Body text size in the same views, in pixels ({min}–{max}; default {default}). Headings and code scale with it.",
    systemFont: "System font",
    windowTitleFieldLabel: "Show active session in window title",
    windowTitleDescription:
      'Sets the native window title (and the browser tab, on the Server Edition) to the focused node and project — "api server — myrepo — node-terminal" — so window-title-based time trackers like ActivityWatch can tell sessions apart. Off keeps the static title.',
    windowTitleAria: "Show the active session in the window title",
    canvasDotsDescription:
      "Draw the dot grid on the canvas. Only the dots: snapping and align to grid work the same either way.",
    resumeCardDescription:
      'Offer a "Resume where you left off" card when a project is activated, listing your last few node landings. Cmd+[ / Cmd+] and the Dock arrows walk the same trail either way.',
    resumeCardAria: "Show the resume card on project activation",
    menuItemsDescription:
      "Which rows the node right-click menu offers (and, for Colors, the group frame's colour strip too) — it applies to the next right-click. Destructive and recovery actions (Delete, Restart agent) are never hidden here.",
    menuItemsVisibilityWhere: "in the node menu",
    headerButtonsDescription:
      "Which icon buttons the terminal node header shows. The model & context meter hides on kanban cards and in the card modal too. Close and the terminal Search button are always shown, as are the right-click menu's destructive and recovery actions (Delete, Restart agent).",
    headerButtonsVisibilityWhere: "in the terminal header",
    showVisibilityAria: "Show {label} {where}",
    wallpaperNone: "None",
    wallpaperYourImage: "Your image",
    wallpaperChooseImage: "Choose image…",
    resetAppearanceWhat: "the appearance settings",
  },
  terminal: {
    title: "Terminal",
    description: "Applies to every terminal — on the canvas and in kanban cards. A light theme also turns the app light (Settings → Appearance).",
    rows: {
      theme: {
        title: "Colour theme",
      },
      fontFamily: {
        title: "Font",
      },
      fontSize: {
        title: "Size and weight",
      },
      fontZoomKeys: {
        title: "Font size keys",
      },
      spacing: {
        title: "Spacing",
      },
      cursor: {
        title: "Cursor",
      },
      cursorInactive: {
        title: "Cursor when unfocused",
      },
      middleClickPaste: {
        title: "Middle-click paste",
      },
      copyOnSelect: {
        title: "Copy on select",
      },
      wordSeparator: {
        title: "Word selection",
      },
      boldBright: {
        title: "Bold text uses bright colours",
      },
      minContrast: {
        title: "Minimum contrast",
      },
      gpu: {
        title: "Terminal rendering",
      },
      reset: {
        title: "Reset terminal appearance",
      },
    },
  },
  agents: {
    title: "Agents",
    description: "Which agents appear in the Add menus, the Dock and ⌘K, and which one “New agent” opens. Hiding one only changes the menus — nothing is installed or removed.",
    rows: {
      integrations: {
        title: "Hooks & skills (integrations)",
      },
      agents: {
        title: "Show in Add menus",
      },
      launchCommands: {
        title: "Launch commands",
      },
      vanillaLaunch: {
        title: "Launch mode",
      },
      messagingDefault: {
        title: "Agent messaging in projects that do not set it",
      },
      permissionMode: {
        title: "Permission mode",
      },
      hookReplyApprovals: {
        title: "One-click approvals",
      },
      autoHideFinishedSubagentCards: {
        title: "Hide finished subagent cards",
      },
      controlConfirm: {
        title: "Destructive canvas-control confirmations",
      },
      nodeIdentity: {
        title: "Verified node identity",
      },
      browserControl: {
        title: "Browser control",
      },
      hibernation: {
        title: "Hibernate idle agents",
      },
    },
  },
  accounts: {
    title: "Accounts",
    description: "Use more than one Claude or Codex login side by side. Each account keeps its own login, settings and history. Pick one when you open an agent; move a running agent to another from its right-click menu.",
    rows: {
      accounts: {
        title: "Claude & Codex accounts",
      },
    },
  },
  customAgents: {
    title: "Custom agents",
    description: "Bring your own agent CLI, or wrap a built-in harness (e.g. Claude) to redirect inference to your own proxy. Env values support ${env:VAR} and ${env:VAR:fallback} expansion against your shell environment.",
    rows: {
      custom: {
        title: "Custom agents",
      },
    },
  },
  githubIssues: {
    title: "GitHub Issues",
    description: "Use a fine-grained token with repository metadata read access and issues read and write access. The token is write only in this screen.",
    dispatchDescription:
      "When you move an issue card into this column, an agent session starts on it by itself — the same run as “Start with agent”. Only a move you make in this app on this machine starts one — never a label change on GitHub, a teammate’s move, or a board that arrives by git pull. One run per issue; further runs queue. This setting is for this machine only.",
    rows: {
      enable: {
        title: "GitHub Issues",
      },
      repository: {
        title: "Repository",
      },
      authentication: {
        title: "Authentication",
      },
      mapping: {
        title: "Column labels",
      },
      pullAutoMove: {
        title: "Move merged session cards",
      },
      dispatch: {
        title: "Dispatch agents",
      },
      data: {
        title: "Sync and local data",
      },
    },
  },
  modelGateway: {
    title: "Model gateway",
    description: "Configure one gateway, discover models through the OpenAI-compatible Models API, and switch a supported agent node without creating a custom agent for every model.",
    rows: {
      endpoint: {
        title: "Gateway URL",
      },
      discoveryPath: {
        title: "Discovery path",
      },
      key: {
        title: "API key",
      },
      discovery: {
        title: "Available models",
      },
      defaultModel: {
        title: "Default model",
      },
    },
  },
  notifications: {
    title: "Notifications",
    description: "Get notified when an agent finishes while the app is in the background.",
    rows: {
      notify: {
        title: "Notify when a turn finishes in the background",
      },
      sound: {
        title: "Play a sound when a turn finishes or needs you",
      },
      mobilePush: {
        title: "Send push notifications to your paired phone",
      },
    },
  },
  phone: {
    title: "Phone",
    description: "Pair the nodeterm mobile app so it can connect to this machine over your local network — no terminal commands needed.",
    rows: {
      remote: {
        title: "Remote access from your phone",
      },
      pair: {
        title: "Pair phone",
      },
      devices: {
        title: "Paired devices",
      },
      webhook: {
        title: "Push webhook",
      },
    },
  },
  projectSettings: {
    description: "Shown on the tab and in the project switcher.",
    rows: {
      name: {
        title: "Project name",
      },
      folder: {
        title: "Folder",
      },
      color: {
        title: "Icon & color",
      },
      permission: {
        title: "Default permission mode",
      },
      account: {
        title: "Default Claude account",
      },
    },
  },
  remote: {
    title: "Remote access",
    description: "Open terminals that run on another machine you own — end-to-end encrypted over the relay. Hosting (sharing this machine) is Pro; connecting to a host is free.",
    rows: {
      allow: {
        title: "Allow remote access",
      },
      connect: {
        title: "Connect to a host",
      },
    },
  },
  speech: {
    title: "Speech",
    description: "Dictate into any terminal or chat node. Local Whisper runs fully on-device — nothing leaves this machine.",
    rows: {
      engine: {
        title: "Speech engine",
      },
      shortcut: {
        title: "Dictation shortcut",
      },
      models: {
        title: "Whisper models",
      },
      language: {
        title: "Language",
      },
    },
  },
  ssh: {
    title: "Remote (SSH)",
    description: "Saved SSH servers appear under “New remote”, and can host nodes on a local canvas. Each also becomes a machine in Accounts, where its own isolated Codex logins live. Opening remote terminals over SSH is free.",
    rows: {
      servers: {
        title: "Saved SSH servers",
      },
      windowsAgent: {
        title: "Keep unlocked keys in the Windows ssh-agent",
      },
    },
  },
  teamAccess: {
    title: "Team seats",
    description:
      "Share {machine} with your team — Pro includes 3 seats, extra seats $5/seat/month.",
    rows: {
      team: {
        title: "Team Access",
      },
    },
  },
  usage: {
    title: "Usage",
    description: "Subscription limits shown in the pill at the bottom-left of the canvas. Hiding a provider is a display choice — credentials are untouched, so re-enabling is instant.",
    rows: {
      percentMode: {
        title: "Usage percentages",
      },
      visibility: {
        title: "Providers",
      },
      cookies: {
        title: "Web-console sign-in",
      },
    },
  },
  license: {
    title: "License",
    description: "Manage your nodeterm Pro subscription.",
    rows: {
      license: {
        title: "License",
      },
    },
  },
  liveLinks: {
    title: "Live links",
    description: "A read-only browser link to one terminal. Viewers need nothing installed; links end on their own.",
    rows: {
      links: {
        title: "Active live links",
      },
    },
  },
  shortcuts: {
    title: "Keyboard Shortcuts",
    description:
      "Remap any command. Overrides are stored in settings.json under `keybindings`; Disable turns a command's shortcut off, Reset restores its default. Reload (⌘R / ⌘⇧R) cannot be recorded — it always stays with the app; the system-level chords the menu keeps — ⌘Q (Quit), ⌘H (Hide) and the developer roles — also act while recording, so don't try to bind them.",
    rows: {
      filter: {
        title: "Filter shortcuts",
      },
      policy: {
        title: "While a terminal has focus",
      },
    },
  },
} as const
