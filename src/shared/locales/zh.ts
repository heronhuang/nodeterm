/** 简体中文 UI 消息目录（由 createTranslator 解析嵌套键）。 */
export const zhMessages = {
  common: {
    cancel: '取消',
    ok: '确定',
    save: '保存',
    close: '关闭',
    delete: '删除',
    confirm: '确认',
    back: '返回',
    search: '搜索',
    dismiss: '关闭'
  },
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
      en: 'English'
    }
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
      newWorktree: '新建 worktree…',
      simulator: '模拟器',
      runConfiguration: '运行配置',
      browser: '浏览器',
      webView: '网页视图',
      stickyNote: '便签',
      fileManager: '文件管理器',
      whiteboard: '白板',
      dinoGame: '恐龙游戏',
      trigger: '触发器',
      worktree: 'Worktree…',
      newAgent: '新建 Agent',
      groupView: '新建视图',
      groupFiles: '文件',
      groupOrchestrate: '编排'
    }
  }
} as const

export type ZhMessages = typeof zhMessages
