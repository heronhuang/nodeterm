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
    hideableMenu: {
      group: "Group node / Group selection",
      "remove-from-group": "Remove from group",
      colors: "Colors",
      icon: "Set icon",
      duplicate: "Duplicate",
      "snap-zone": "Snap to zone",
      collapse: "Collapse / Expand",
      "markdown-view": "Markdown view",
      "refresh-terminal": "Refresh terminal",
      "live-link": "Share live link",
      "vanilla-restart": "Restart on subscription",
    },
    hideableHeader: {
      "context-meter": "Model & context meter",
      maximize: "Maximize",
      refresh: "Refresh",
      mic: "Dictate",
      "ai-name": "Name with AI",
      comments: "Comments",
      "share-link": "Share live link",
      "hide-fanout": "Hide cards & connections",
      "tidy-fanout": "Tidy subagent cards",
      "md-hint": "Markdown / chat view hint",
    },
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
    groupAdvanced: "Advanced",
    resetAppearanceWhat: "the terminal appearance settings",
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
    launchModeDescription: 'The default provider behavior for a fresh canvas agent session. “Gateway (CLI default)” injects the model gateway but lets the CLI pick its own default model. “Gateway (default model)” additionally launches on the default model chosen in Settings → Model gateway. “Subscription” strips the gateway + inherited provider env so the agent runs against its OWN provider (Claude’s subscription, Copilot’s GitHub routing) — the global counterpart of the per-node “Restart on subscription” action. The managed-account config dir is kept, so account isolation survives.',
    launchModeAria: 'Agent launch mode',
    launchGateway: 'Gateway (CLI default model)',
    launchGatewayModel: 'Gateway (default model: {model})',
    launchGatewayUnconfigured: 'Gateway (default model — none configured)',
    launchSubscription: 'Subscription (own provider credentials)',
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
    integrationsDescription:
      "Files nodeterm installs into each agent CLI’s own config: a status hook (RUNNING / NEEDS YOU badges, notifications) and two skills (canvas control, reading linked nodes). Remove deletes exactly what nodeterm added. Without it the agent still runs in a terminal, just without those features. This is separate from the menu list above.",
    launchCommandsDescription:
      "Launch an agent with your own command — e.g. a wrapper script that switches accounts or sets env vars. Used everywhere the agent is launched (new sessions, resumes, restarts), with flags like --resume appended after it, so the command must pass its arguments through — a shell script should end with `exec claude \"$@\"`. A flag your command already spells is left alone: write the permission mode here and it wins over the start-up mode below. Leave empty for the default. SSH projects run the same command on the remote host.",
    sectionDescription:
      "Choose which agents the Add menus show and the default, and whether nodeterm installs its hooks and skills into each agent.",
    sectionDescriptionWithDefault:
      "Choose which agents the Add menus show and the default ({agent}), and whether nodeterm installs its hooks and skills into each agent.",
    defaultAgentBadge: "Default",
    setDefaultAgent: "Set default",
    shownInMenus: "Shown",
    hiddenInMenus: "Hidden",
    showAgentInMenusAria: "Show {agent} in the Add menus",
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
    endpointDescription: "Enter the server root. Discovery uses the OpenAI-compatible /v1/models endpoint; agent launches use the configured provider routes.",
    invalidUrl: "Enter a valid HTTP(S) URL without embedded credentials.",
    discoveryLabel: "Discovery:",
    discoveryPathTitle: "Model discovery endpoint",
    discoveryPathDescription: "Which gateway endpoint the model catalogue is read from. Only the discovery request changes — agent launches keep using the OpenAI and Anthropic routes shown under the Gateway URL.",
    defaultPathHint: "OpenAI convention — the default.",
    openaiPathHint: "Same catalogue under the OpenAI launch-route prefix.",
    anthropicPathHint: "Same catalogue under the Anthropic launch-route prefix.",
    customPath: "Custom path…",
    customPathHint: "Enter an exact path below.",
    credentialSource: "Credential source",
    credentialDescription: "Reference an environment variable or save a literal key in protected local storage.",
    environment: "Environment variable",
    storedKey: "Stored API key",
    environmentDescription: "Enter the variable name only. settings.json stores it as ${env:VAR}; the secret itself is never saved.",
    invalidEnvironment: "Use letters, numbers, and underscores; the first character cannot be a number.",
    apiKey: "API key",
    keyDescription: "The key is write-only here and never appears in settings.json or restart commands.",
    restrictedStorage: "Encrypted key storage is unavailable. The key is protected in a mode 0600 local file.",
    unavailableStorage: "Secret storage is unavailable in this session.",
    keySavedPlaceholder: "API key saved",
    saveKey: "Save key",
    clearKey: "Clear",
    discoveringModels: "Discovering models…",
    autoRefresh: "Models are also refreshed automatically when these settings change.",
    discovering: "Discovering…",
    refresh: "Refresh",
    discoverModels: "Discover models",
    defaultModelDescription: "New canvas agent sessions launch on this model when Settings → Agents → Launch mode is “Gateway (default model)”. Picked from the discovered catalogue — discover models first.",
    defaultModelAria: "Default gateway model",
    noDefaultModel: "(none — CLI default model)",
    invalidKey: "Enter a non-empty API key without line breaks.",
    keyringLocked: "Unlock the OS keyring and try again.",
    saveFailed: "The API key could not be saved. Please try again.",
    keySaved: "API key saved securely.",
    keyCleared: "Saved API key cleared.",
    modelAvailable: "{count} model available.",
    modelsAvailable: "{count} models available.",
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
    soundDescription:
      "A short retro chirp for a finished turn and a crackly one when a session needs you — or your own sound file for either. Plays whether or not the window is focused, so you catch a finish while looking at another node.",
    volumeLabel: "Volume",
    mobilePushDescription: "Fires when an agent needs approval, asks a question, or finishes — only if you've paired a phone.",
    pushNeedsYou: "Needs you (approvals & questions)",
    pushDone: "Task completed",
    liveUpdatesOnPhone: "Live updates on phone",
    liveUpdatesDescription:
      "Keep a live status on your phone's lock screen updated as a session works, needs you, or finishes.",
    holdPhoneAlerts: "Hold phone alerts while you're at this computer",
    holdPhoneAlertsDescription:
      "Defer approval, question, and completed alerts while you're active here, then send them the moment you go idle or lock the screen. Live updates are never held.",
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
    remoteAccessTitle: "Remote access from your phone",
    remoteAccessDescription:
      "Reach {machine} from anywhere — not just your local network — end-to-end encrypted over the relay. Your paired phone connects through the relay; the connection is verified with a code the first time.",
    remoteAccessAria: "Remote access from your phone",
    pairHeading: "Pair phone",
    pairDescription:
      "Pair the nodeterm mobile app: scan this QR with your phone. Your phone generates its own key on-device — nothing secret leaves this machine except a single-use pairing token.",
    noAppYet: "Don't have the app yet?",
    startPairing: "Start pairing",
    starting: "Starting…",
    pairedDevicesHeading: "Paired devices",
    noDevicesPaired: "No devices paired yet",
    pairedAt: "Paired {date}",
    revoke: "Revoke",
    pushWebhookDescription:
      "Let a script, a CI job or a long build ring your phone when it finishes. It sends a plain text notification to the phones paired with this machine, marked as coming from a webhook — not from an agent. Title up to {titleMax} characters, body up to {bodyMax}; links are not opened.",
    pairPhoneForWebhook:
      "Pair a phone with remote access first — the webhook pushes to the phones paired with this machine.",
    retry: "Retry",
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
    hostingRequiresPro:
      "Hosting this machine requires nodeterm Pro — upgrade above. Connecting to a host you were given a code for is free.",
    sharingProject: "Sharing {name}.",
    sharePairingCode: "Share this pairing code with the other device (single use):",
    pairingCode: "Pairing code",
    copyCode: "Copy code",
    stopSharing: "Stop sharing",
    projectToShare: "Project to share",
    projectCannotShare: "{name} (cannot be shared)",
    starting: "Starting…",
    connectHeading: "Connect to a host",
    pasteHostCode: "paste the host's code",
    connect: "Connect",
    connecting: "Connecting…",
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
    engineDescription:
      "Local Whisper transcribes on-device. Cloud requires the nodeterm backend · not available yet.",
    engineLocal: "Local Whisper",
    engineCloud: "Cloud",
    engineAria: "Speech engine",
    shortcutDescription: "Dictation's shortcut is managed with every other keyboard shortcut.",
    shortcutDisabled: "Currently disabled.",
    shortcutHoldToTalk: "Currently hold-to-talk: hold {chord}.",
    shortcutToggle: "Currently toggle: press {chord}.",
    openKeyboardShortcuts: "Open Keyboard Shortcuts",
    modelsHeading: "Whisper models",
    modelsLoading: "Loading models…",
    modelNone: "None",
    modelNoneDescription:
      "Dictation off — the shortcut and the Dock mic explain instead of recording. Downloading a model below turns it on.",
    proBadge: "PRO",
    freeBadge: "FREE",
    download: "Download",
    delete: "Delete",
    unlockWithPro: "Unlock with Pro",
    downloading: "Downloading {pct}%",
    downloadFailed: "Download failed.",
    deleteFailed: "Delete failed.",
    languageLabel: "Language",
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
    addServer: "Add server",
    importSshConfig: "Import from ~/.ssh/config",
    windowsAgentDescription:
      "Off by default. On, a key you unlock with its passphrase for an SSH project is also added to the Windows OpenSSH Authentication Agent service (when it is running), so later connections — and your own ssh — stop asking. Windows stores the key, encrypted for your account, until you remove it (ssh-add -d, or ssh-add -D for all); it stays after nodeterm quits and after a restart. Hosts whose ~/.ssh/config says AddKeysToAgent yes get this without the switch.",
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
    upgradeTitle: "Upgrade to Pro — 3 collaborator seats included",
    upgradeBody1:
      "Pro comes with 3 seats to share {machine} with your team. Need more? Extra seats are $5/seat/month. Each teammate connects from their own device over the end-to-end encrypted relay.",
    upgradeBody2:
      "A seat grants full access: a teammate on a seat can run commands on {machine} as you, in every project — the same as giving them SSH access. Every connection is still verified with a one-time pairing code you compare together.",
    upgradeCta: "Upgrade to Pro — get 3 free seats",
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
    percentModeLabel: "Usage percentages",
    percentModeDescription:
      "Whether provider limits and context meters show percentage used, percentage remaining, or (context meters only) raw token counts. Provider limits have no token count and fall back to Used.",
    percentModeAria: "Usage percentage display",
    percentUsed: "Used",
    percentRemaining: "Remaining",
    percentTokens: "Tokens",
    providerRowLabel: "{provider} usage",
    showProviderAria: "Show {provider} usage",
    providers: {
      claude: {
        blurb: "Session, weekly and per-model limits from your Claude subscription.",
      },
      "claude-remote": {
        displayName: "Claude on SSH hosts",
        blurb:
          "Limits for the Claude accounts on your connected SSH projects' hosts. Each read runs on the host itself over the existing connection — the credential never leaves it.",
      },
      codex: {
        blurb: "Session and weekly limits from your ChatGPT (Codex) subscription.",
      },
      cursor: {
        blurb: "Monthly included usage (total, Auto and API) from the Cursor Agent CLI sign-in.",
      },
      gemini: {
        blurb: "Per-model hourly quota from the Gemini CLI sign-in.",
      },
      grok: {
        blurb: "Weekly credits and monthly budget from the Grok CLI sign-in.",
      },
      kimi: {
        blurb: "Session and weekly quota from the Kimi Code sign-in.",
      },
      minimax: {
        blurb: "Per-model session quota — needs the cookie below.",
      },
      opencode: {
        blurb: "Session, weekly and monthly usage — needs the cookie below.",
      },
    },
    cookies: {
      minimax: {
        label: "MiniMax",
        description:
          "MiniMax exposes no CLI credential, so its quota is read with your console session. Open platform.minimax.io/console/usage, copy the request's Cookie header from DevTools, and paste it here.",
        placeholder: "Cookie: _token=…",
      },
      opencode: {
        label: "opencode",
        description:
          "opencode publishes no usage API, so the numbers are read from your dashboard page. Open opencode.ai, copy the Cookie header from DevTools, and paste it here. Because this reads a page rather than an API, it can stop working when opencode changes their site — it will report an error rather than silently showing nothing.",
        placeholder: "auth=…",
      },
      noteStored:
        "Stored in a file only your user can read, never in settings.json. It is not shown again — paste a fresh one when your session expires.",
      noteEmpty:
        "This is a live session credential. It is stored in a 0600 file, not in settings.json, and is never read back into the UI.",
      storedPlaceholder: "•••••••• stored",
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
    upgradePitch:
      "Share a terminal live with anyone — a teammate, a customer, a reviewer — as a link that ends by itself.",
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
    policyDescription:
      "App shortcuts first (the default): shared shortcuts like ⌘K keep working over a focused terminal, and the first time one is captured that way the terminal says so — once per chord, ever. Terminal first: every chord but the terminal's own reaches the shell or TUI, including Close (⌘W / Ctrl+W), Minimize (⌘M / Ctrl+M), actual size (⌘0), the kanban board (⌘⇧B), Settings (⌘,) and the ⌘1–9 project jumps — the matching application-menu entries grey out while a terminal is focused, so those chords can reach it. Reload (⌘R / ⌘⇧R) is the one exception and always stays with the app, so a stuck window can still be recovered.",
    policyAppFirst: "App shortcuts first",
    policyTerminalFirst: "Terminal first",
    filterStatusAria: "Filter shortcuts by status",
    filterAll: "All {count}",
    filterModified: "Modified {count}",
    filterUnassigned: "Unassigned {count}",
    filterDisabled: "Disabled {count}",
    noShortcutsMatch: "No shortcuts match.",
    tooltipDisable: "Disable shortcut",
    tooltipReset: "Reset to default",
  },
} as const
