/** Remaining settings section strings (简体中文). */
export const settingsRestZh = {
  appearance: {
    title: "外观",
    description: "用于 ⌘M 输出与聊天视图以及编辑器的 Markdown 预览。其中的代码使用终端字体。",
    markdownFontDescription:
      "用于 ⌘M 输出与聊天视图以及编辑器的 Markdown 预览。其中的代码使用终端字体。",
    rows: {
      appTheme: {
        title: "外观",
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
  },
  terminal: {
    title: "终端",
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
    title: "Agent",
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
    title: "账户",
    description: "Use more than one Claude or Codex login side by side. Each account keeps its own login, settings and history. Pick one when you open an agent; move a running agent to another from its right-click menu.",
    rows: {
      accounts: {
        title: "Claude & Codex accounts",
      },
    },
  },
  customAgents: {
    title: "自定义 Agent",
    description: "Bring your own agent CLI, or wrap a built-in harness (e.g. Claude) to redirect inference to your own proxy. Env values support ${env:VAR} and ${env:VAR:fallback} expansion against your shell environment.",
    rows: {
      custom: {
        title: "自定义 Agent",
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
    title: "模型网关",
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
    title: "通知",
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
    title: "远程访问",
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
    title: "远程 (SSH)",
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
    title: "团队席位",
    description: "Share {machine} with your team — Pro includes 3 seats, extra seats $5/seat/month.",
    rows: {
      team: {
        title: "Team Access",
      },
    },
  },
  usage: {
    title: "用量",
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
    title: "许可证",
    description: "Manage your nodeterm Pro subscription.",
    rows: {
      license: {
        title: "许可证",
      },
    },
  },
  liveLinks: {
    title: "实时链接",
    description: "A read-only browser link to one terminal. Viewers need nothing installed; links end on their own.",
    rows: {
      links: {
        title: "Active live links",
      },
    },
  },
  shortcuts: {
    title: "键盘快捷键",
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
