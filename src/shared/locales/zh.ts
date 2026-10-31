import { menuItemsZh } from './menu-items-zh'
import { settingsSectionZh } from './settings-zh'
import { keybindingsZh } from './keybindings-zh'

const { language: languageSectionZh, ...settingsRestZh } = settingsSectionZh

/** 简体中文 UI 消息目录（由 createTranslator 解析嵌套键）。 */
export const zhMessages = {
  menuItems: menuItemsZh,
  common: {
    cancel: '取消',
    ok: '确定',
    save: '保存',
    clear: '清除',
    close: '关闭',
    delete: '删除',
    confirm: '确认',
    back: '返回',
    search: '搜索',
    dismiss: '关闭',
    thisMachine: '本机',
    upgradeToPro: '升级到 Pro'
  },
  keybindings: keybindingsZh,
  confirm: {
    cancel: '取消',
    ok: '确定',
    delete: '删除',
    confirm: '确认'
  },
  menu: {
    settings: '设置',
    settingsMac: '设置…',
    snapToGrid: '对齐网格',
    fitView: '适应视图',
    toggleKanban: '切换看板',
    edit: '编辑',
    view: '视图',
    window: '窗口',
    file: '文件'
  },
  welcome: {
    tagline: '终端画布。创建项目即可开始。',
    newProject: '新建项目',
    openFolder: '打开文件夹…',
    cloneRepo: '克隆仓库…',
    connectSsh: '通过 SSH 连接…',
    recentlyClosed: '最近关闭',
    filterPlaceholder: '按名称或文件夹筛选…',
    noMatch: '没有与「{query}」匹配的已关闭项目。',
    close: '关闭',
    deletePermanently: '永久删除（并结束其会话）',
    deletePermanentlyAria: '永久删除',
    running: '{count} 个运行中',
    sessionsTooltipOne:
      '此项目有 {count} 个 tmux 会话仍在本机运行。重新打开项目可恢复，或点 × 删除项目并结束会话。',
    sessionsTooltipOther:
      '此项目有 {count} 个 tmux 会话仍在本机运行。重新打开项目可恢复，或点 × 删除项目并结束会话。'
  },
  settings: {
    groups: {
      ai: 'AI 能力',
      workspace: '工作区',
      interface: '界面',
      connectivity: '远程与团队',
      application: '应用',
      projects: '项目'
    },
    sections: {
      terminal: '终端',
      shell: 'Shell',
      behavior: '行为',
      language: '语言',
      appearance: '外观',
      notch: '刘海',
      phone: '手机',
      speech: '语音',
      shortcuts: '键盘快捷键',
      agents: 'Agent',
      usage: '用量',
      accounts: '账户',
      'custom-agents': '自定义 Agent',
      'model-gateway': '模型网关',
      notifications: '通知',
      commit: '提交信息',
      tmux: '会话保护',
      'github-issues': 'GitHub Issues',
      license: '许可证',
      presence: '你的名称',
      remote: '远程访问',
      'team-access': '团队席位',
      'live-links': '实时链接',
      ssh: '远程 (SSH)',
      updates: '更新',
      privacy: '隐私',
      'sign-in': '登录',
      debug: '调试'
    },
    sidebar: {
      backToApp: '返回应用',
      searchSettings: '搜索设置'
    },
    language: {
      title: '语言',
      description: '选择本应用中菜单、设置与对话框使用的语言。',
      label: '显示语言',
      zh: '简体中文',
      en: 'English',
      ...languageSectionZh
    },
    ...settingsRestZh
  },
  palette: {
    placeholder: '输入命令或名称…',
    empty: '无匹配项',
    foundInOutput: '在输出中找到',
    filesSection: '文件',
    revealInExplorer: '在资源管理器中显示'
  },
  tabBar: {
    canvasView: '画布视图',
    kanbanView: '看板视图',
    storeInFolder: '将画布存入文件夹',
    storeInAppData: '将画布存入应用数据',
    openToResume: '打开项目以恢复',
    updateDownloaded: 'nodeterm v{version} 已就绪，重启以更新',
    updateAvailable: 'nodeterm v{version} 可用，点击下载',
    updateManual: 'nodeterm v{version} 可用，下载以更新',
    updateUnsupported: '此版本已不再受支持，请更新后继续使用',
    updateButton: '更新',
    projectOptions: '项目选项',
    newProject: '新建项目'
  },
  session: {
    state: {
      working: '运行中',
      attention: '等待你的回复',
      done: '已完成',
      unknown: '未知'
    },
    group: {
      attention: '需要处理',
      unread: '未读',
      working: '运行中',
      idle: '空闲',
      unknown: '未知'
    }
  },
  nodeActions: {
    nodesCount: '{count} 个节点',
    oneNode: '1 个节点',
    stopAgentControl: '停止智能体控制',
    addToGroup: '将选中项添加到 {title}',
    addToGroupFallback: '分组',
    addSelectionToGroup: '将选中项添加到分组',
    groupFallback: '分组',
    groupSelection: '分组选中项',
    groupNode: '分组节点',
    removeFromGroup: '从分组移除',
    changeIcon: '更改图标…',
    setIcon: '设置图标…',
    duplicate: '复制',
    snapToZone: '对齐到区域',
    collapseExpand: '折叠 / 展开',
    markdownView: '标记文本视图',
    refreshTerminal: '刷新终端',
    branchConversation: '分支对话',
    delete: '删除',
    pauseSessions: '暂停 {count} 个会话',
    restartAgent: '重启智能体',
    restartAgentAndShell: '重启智能体与命令行环境',
    reopenAs: '以此重新打开会话',
    switchModel: '切换模型',
    switchModelCurrent: '切换模型 ({model})',
    restart: '重启',
    resumeSession: '恢复会话',
    pauseSession: '暂停会话',
    pause: '暂停',
    pauseEndSession: '暂停并结束会话',
    switchClaudeAccount: '切换 Claude 账户',
    switchCodexAccount: '切换 Codex 账户'
  },
  markdown: {
    localLink: '无法从渲染的 Markdown 中打开本地文件链接。'
  },
  dialog: {
    ok: '确定',
    cancel: '取消'
  },
  sidebar: {
    title: '会话',
    pin: '固定',
    unpin: '取消固定',
    close: '关闭',
    groupByAria: '会话分组依据',
    tabProject: '项目',
    tabStatus: '状态',
    filterPlaceholder: '筛选会话…',
    clearFilter: '清除筛选',
    clearFilterTitle: '清除筛选 (Esc)',
    noMatch: '没有与「{query}」匹配的会话。',
    noSessions: '尚无会话。',
    noSessionsInProject: '无会话',
    ungrouped: '未分组',
    expand: '展开',
    collapse: '折叠',
    expandProject: '展开 {name}',
    collapseProject: '折叠 {name}',
    dropRemoveFromGroup: '拖放到此处以从分组移除',
    addNode: '向此项目添加节点',
    dropSessionHere: '将会话或分组拖放到此处',
    showGroupOnCanvas: '点击在画布上显示该分组',
    renameGroup: '双击重命名分组',
    nameGroupAi: '用 AI 命名分组（依据其下所有会话）',
    signals: {
      project: {
        attention: '需要你处理的会话',
        unread: '已完成 — 对你为新',
        working: '正在运行的会话'
      },
      group: {
        attention: '此分组中需要你处理的会话',
        unread: '此分组中已完成 — 对你为新',
        working: '此分组中正在运行的 CLI'
      }
    }
  },
  onboarding: {
    setupKindSetup: 'Setup',
    setupKindArchive: 'Archive',
    skip: '跳过',
    approve: '批准',
    runOnce: '运行一次',
    agentsMessage: '为「{name}」使用共享的 Agent 启动设置？',
    agentsChanged: '这些设置自你批准此项目以来已变更。',
    agentsIntro:
      '它们来自项目共享的 .nodeterm/settings.json，任何能向仓库提交的人均可修改。一次回答涵盖启动命令与下方所有变量。',
    launchCommand: '启动命令',
    environment: '环境',
    shellMessage: '为「{name}」使用共享的终端 Shell？',
    shellChanged: '此设置自你批准此项目以来已变更。',
    shellIntro:
      '它来自项目共享的 .nodeterm/settings.json，任何能向仓库提交的人均可修改。为此项目打开的每个终端都会启动此程序。',
    shellLabel: 'Shell',
    setupMessage: '为「{name}」运行 {kind} 脚本？',
    setupChanged: '这些脚本自你批准此项目以来已变更。',
    setupIntro:
      '它们来自项目共享的 .nodeterm/settings.json，任何能向仓库提交的人均可修改。一次回答涵盖两者。',
    scriptAboutToRun: '（即将运行）'
  },
  projectLimit: {
    checking: '正在检查免费额度…',
    connectionTitle: '需要连接',
    connectionBody:
      '检查免费额度与升级需要连接 api.nodeterm.dev。仅发送许可证检查 — 遥测保持关闭。可在 设置 → 隐私 中关闭。',
    openTitle: '已打开 {open} / {limit} 个免费项目',
    openBody:
      '关闭一个以腾出位置。关闭不会删除任何内容 — 终端继续运行，且仍可从「最近关闭」一键恢复。',
    checkFailed: '无法通过 api.nodeterm.dev 检查免费额度。',
    retry: '重试',
    mismatchBase: '你的免费额度绑定在另一台计算机上。',
    mismatchDate: '你的免费额度绑定在另一台计算机上。可在 {date} 迁移到本机。',
    openProjectsAria: '已打开的项目',
    closeProject: '关闭',
    closeProjectAria: '关闭 {name}',
    cancel: '取消',
    allowAndCheck: '允许并检查',
    upgradeCta: 'Pro 无限项目 — $10/月'
  },
  integrationConsent: {
    prompt: {
      title: '将 nodeterm 与 Agent CLI 集成？',
      writes:
        'nodeterm 会在各 Agent 自有设置中添加状态 hook，并在其 skills 文件夹中安装两个小技能（画布控制、读取关联节点）。' +
        '不会向 AGENTS.md / GEMINI.md 写入任何内容；关闭某个 Agent 时会精确移除 nodeterm 所添加的内容。',
      unavailable:
        '终端始终可用。未启用集成时，该 Agent 没有运行中/需要你 状态徽章、未读圆点与完成通知；没有会话名称、上下文计量与子 Agent 卡片；也没有画布控制（Agent 打开与整理节点）及读取关联节点。',
      enableAll: '全部启用',
      choose: '选择…',
      notNow: '暂不'
    },
    grandfather: {
      title: 'Agent 集成现已改为可选',
      body:
        '所有 Agent 的集成保持与之前相同。可在 设置 → Agent 中为任意 Agent（或 SSH 主机）关闭 — nodeterm 会精确移除其添加的内容。',
      review: '查看'
    },
    host: {
      title: '是否在 {hostKey} 上与 Agent 集成？',
      bodyPrefix:
        'nodeterm 会在该主机的 Agent 配置中写入相同的 hook 与 skill。在你确认之前不会在主机上安装任何内容。',
      allow: '在此主机上允许',
      decline: '不在此主机上'
    },
    choice: {
      installed: '已安装',
      notInstalled: '未安装',
      notSetUp: '尚未设置'
    },
    actions: {
      install: '安装',
      remove: '移除',
      dontInstall: '不安装',
      installAria: '安装 {label} 集成',
      removeAria: '移除 {label} 集成及 nodeterm 添加的内容',
      dontInstallAria: '不安装 {label} 集成'
    },
    settings: {
      serverVetoed: '此服务器启动时已禁用 Agent 安装，因此无论此处如何选择都不会写入任何内容。',
      onSshHosts: '在 SSH 主机上',
      retainedIntro: '因你在 nodeterm 写入后修改过而保留（若不再需要请手动移除）：'
    }
  },
  announcement: {
    learnMore: '了解更多'
  },
  addMenu: {
    hints: {
      worktreeSsh: 'SSH 项目尚不支持',
      runSsh: '运行配置在本机执行 — SSH 项目尚不支持',
      simulatorUnavailable: '模拟器需要桌面应用',
      simulatorRelay: '模拟器在本机运行 — 不能在 relay 标签页中使用',
      simulatorSsh: '模拟器在本机运行 — SSH 项目尚不支持',
      runWindows: '启动进程的运行配置在 Windows 上尚不支持',
      noCwd: '此项目没有文件夹 — 请先设置（标签 ⌄ →「设置文件夹…」）'
    },
    labels: {
      newTerminal: '新建终端',
      newRemote: '新建远程…',
      newSimulator: '新建模拟器',
      newRunConfiguration: '新建运行配置',
      newBrowser: '新建浏览器',
      newWebView: '新建网页视图…',
      newStickyNote: '新建便签',
      newFileManager: '新建文件管理器',
      newWhiteboard: '新建白板',
      newDinoGame: '新建恐龙游戏',
      newTrigger: '新建触发器…',
      openFile: '打开文件…',
      newFile: '新建文件…',
      spawnTeam: '组建团队…',
      newWorktree: '新建工作树…',
      simulator: '模拟器',
      runConfiguration: '运行配置',
      browser: '浏览器',
      webView: '网页视图',
      stickyNote: '便签',
      fileManager: '文件管理器',
      whiteboard: '白板',
      dinoGame: '恐龙游戏',
      trigger: '触发器',
      worktree: '工作树…',
      newAgent: '新建智能体',
      groupView: '新建视图',
      groupFiles: '文件',
      groupOrchestrate: '编排'
    }
  }
} as const

export type ZhMessages = typeof zhMessages
