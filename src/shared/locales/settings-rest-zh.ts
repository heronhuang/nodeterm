/** Remaining settings section strings (简体中文). */
export const settingsRestZh = {
  appearance: {
    title: '外观',
    description: '用于 ⌘M 输出与聊天视图以及编辑器的 Markdown 预览。其中的代码使用终端字体。',
    markdownFontDescription:
      '用于 ⌘M 输出与聊天视图以及编辑器的 Markdown 预览。其中的代码使用终端字体。',
    rows: {
      appTheme: {
        title: '外观',
      },
      uiScale: {
        title: '界面缩放',
      },
      tabBarHeight: {
        title: '标签栏高度',
      },
      stickyNoteBacking: {
        title: '便签背景',
      },
      groupFrameBacking: {
        title: '分组框背景',
      },
      markdownFont: {
        title: 'Markdown 字体',
      },
      markdownFontSize: {
        title: 'Markdown 字号',
      },
      accent: {
        title: '强调色',
      },
      wallpaper: {
        title: '桌面壁纸',
      },
      windowTitle: {
        title: '窗口标题',
      },
      glassTint: {
        title: '玻璃效果',
      },
      glassBlurWhileMoving: {
        title: '移动时保持模糊',
      },
      canvasDots: {
        title: '显示网格点',
      },
      resumeCard: {
        title: '恢复卡片',
      },
      menuItems: {
        title: '节点菜单项',
      },
      headerButtons: {
        title: '终端标题栏按钮',
      },
      reset: {
        title: '重置外观',
      },
    },
    appThemeDescription:
      '「跟随终端」与设置 → 终端 中的主题一致。「Liquid Glass」同样跟随终端，并在桌面壁纸上 Frost 整个界面，无窗口色强调。',
    appThemeDescriptionGlassExtra:
      ' 常规文本在玻璃上保持 4.5:1 对比度；次要文本与彩色输出在明亮壁纸上可能变淡。',
    themeFollowTerminal: '跟随终端',
    themeDark: '深色',
    themeLight: '浅色',
    themeLiquidGlass: 'Liquid Glass',
    glassReduceTransparency:
      '系统设置中已开启「降低透明度」，玻璃为不透明。请在系统中关闭以使用此滑块。',
    glassMoreContrast:
      '系统设置中已开启「增强对比度」，玻璃保持着色并加强边缘。',
    glassClearer:
      '比「可读」更通透：更多壁纸透出，终端文本仍可读。',
    glassReadable: '常规文本在任何壁纸上保持 4.5:1 对比度。',
    glassBlurDescription: '平移与缩放时使用更多 GPU。',
    uiScaleDescription:
      '缩放整个应用界面 — 菜单、节点标题、对话框、侧栏 — 类似浏览器页面缩放。终端文字也会缩放：终端字号（设置 → 终端）会乘以此值，若希望终端文字不变，请在终端设置中调低字号。',
    uiScaleBrowserNote:
      '在浏览器中请使用浏览器自带的页面缩放（Cmd/Ctrl + + / −）— 效果相同且按站点记忆。',
    tabBarHeightDescription: '窗口顶部项目标签条的高度，单位为像素。',
    stickyNoteBackingDescription:
      '便签后方内容透出程度：0% 为透明（默认），100% 为实心。便签颜色不变。',
    groupFrameBackingDescription:
      '分组框后画布透出程度：0% 为透明（默认），100% 为实心。框颜色不变。',
    markdownFontSizeDescription:
      '上述视图中的正文字号，像素（{min}–{max}；默认 {default}）。标题与代码随比例缩放。',
    systemFont: '系统字体',
    windowTitleFieldLabel: '在窗口标题中显示活动会话',
    windowTitleDescription:
      '将原生窗口标题（Server Edition 上为浏览器标签）设为当前节点与项目 — 如「api server — myrepo — node-terminal」— 便于 ActivityWatch 等基于窗口标题的计时器区分会话。关闭则保持静态标题。',
    windowTitleAria: '在窗口标题中显示活动会话',
    canvasDotsDescription:
      '在画布上绘制点状网格。仅影响点的显示；对齐网格与 snap 行为不变。',
    resumeCardDescription:
      '激活项目时提供「从上次离开处继续」卡片，列出最近几个节点位置。Cmd+[ / Cmd+] 与 Dock 箭头走同一条轨迹。',
    resumeCardAria: '项目激活时显示恢复卡片',
    menuItemsDescription:
      '节点右键菜单显示哪些行（「颜色」亦影响分组框色条）— 对下一次右键生效。删除、重启 Agent 等破坏性/恢复操作永不可隐藏。',
    menuItemsVisibilityWhere: '在节点菜单中',
    hideableMenu: {
      group: '分组节点 / 分组选区',
      'remove-from-group': '从分组移除',
      colors: '颜色',
      icon: '设置图标',
      duplicate: '复制',
      'snap-zone': '吸附到区域',
      collapse: '折叠 / 展开',
      'markdown-view': 'Markdown 视图',
      'refresh-terminal': '刷新终端',
      'live-link': '分享实时链接',
      'vanilla-restart': '以订阅模式重启',
    },
    hideableHeader: {
      'context-meter': '模型与上下文计量',
      maximize: '最大化',
      refresh: '刷新',
      mic: '听写',
      'ai-name': 'AI 命名',
      comments: '评论',
      'share-link': '分享实时链接',
      'hide-fanout': '隐藏卡片与连线',
      'tidy-fanout': '整理子 Agent 卡片',
      'md-hint': 'Markdown / 聊天视图提示',
    },
    headerButtonsDescription:
      '终端节点标题栏显示哪些图标按钮。模型与上下文计量在看板卡片与卡片模态中也会隐藏。关闭与终端搜索按钮始终显示；右键菜单中的删除、重启 Agent 等同理。',
    headerButtonsVisibilityWhere: '在终端标题栏中',
    showVisibilityAria: '在{where}显示 {label}',
    resetAppearanceWhat: '外观设置',
    wallpaperNone: '无',
    wallpaperYourImage: '你的图片',
    wallpaperChooseImage: '选择图片…',
  },
  terminal: {
    title: '终端',
    description: '适用于画布与看板卡片中的所有终端。浅色终端主题也会将应用设为浅色（设置 → 外观）。',
    groupAdvanced: '高级',
    resetAppearanceWhat: '终端外观设置',
    rows: {
      theme: {
        title: '配色主题',
      },
      fontFamily: {
        title: '字体',
      },
      fontSize: {
        title: '大小与字重',
      },
      fontZoomKeys: {
        title: '字号快捷键',
      },
      spacing: {
        title: '间距',
      },
      cursor: {
        title: '光标',
      },
      cursorInactive: {
        title: '未聚焦时的光标',
      },
      middleClickPaste: {
        title: '中键粘贴',
      },
      copyOnSelect: {
        title: '选中即复制',
      },
      wordSeparator: {
        title: '选词规则',
      },
      boldBright: {
        title: '粗体使用亮色',
      },
      minContrast: {
        title: '最低对比度',
      },
      gpu: {
        title: '终端渲染',
      },
      reset: {
        title: '重置终端外观',
      },
    },
  },
  agents: {
    title: 'Agent',
    launchModeDescription: '新建 Agent 会话的默认服务商模式。“网关（CLI 默认模型）”接入模型网关，由 CLI 选择模型；“网关（默认模型）”使用在“设置 → 模型网关”中选择的模型。“订阅”不使用网关及继承的服务商环境变量，而使用 Agent 自身的服务商凭据。账户配置目录保持独立。',
    launchModeAria: 'Agent 启动模式',
    launchGateway: '网关（CLI 默认模型）',
    launchGatewayModel: '网关（默认模型：{model}）',
    launchGatewayUnconfigured: '网关（默认模型，尚未配置）',
    launchSubscription: '订阅（使用自身服务商凭据）',
    description: '控制哪些 Agent 出现在添加菜单、Dock 与 ⌘K 中，以及「新建 Agent」默认打开哪一个。隐藏仅影响菜单 — 不会安装或卸载任何内容。',
    rows: {
      integrations: {
        title: 'Hooks 与 skills（集成）',
      },
      agents: {
        title: '在添加菜单中显示',
      },
      launchCommands: {
        title: '启动命令',
      },
      vanillaLaunch: {
        title: '启动模式',
      },
      messagingDefault: {
        title: '未单独设置的项目中的 Agent 消息',
      },
      permissionMode: {
        title: '权限模式',
      },
      hookReplyApprovals: {
        title: '一键批准',
      },
      autoHideFinishedSubagentCards: {
        title: '隐藏已完成的子 Agent 卡片',
      },
      controlConfirm: {
        title: '破坏性画布控制确认',
      },
      nodeIdentity: {
        title: '已验证节点身份',
      },
      browserControl: {
        title: '浏览器控制',
      },
      hibernation: {
        title: '休眠空闲 Agent',
      },
    },
    integrationsDescription:
      'nodeterm 写入各 Agent CLI 自身配置的文件：状态 hook（运行中 / 需要你 徽章与通知）以及两个 skill（画布控制、读取关联节点）。「移除」仅删除 nodeterm 添加的内容。无此项 Agent 仍可在终端运行，只是没有这些能力。与上方菜单列表无关。',
    launchCommandsDescription:
      '用自定义命令启动 Agent — 例如切换账户或设置环境变量的包装脚本。在所有启动场景（新会话、恢复、重启）使用，`--resume` 等标志会追加在其后，因此命令须透传参数 — shell 脚本应以 `exec claude \"$@\"` 结尾。命令已写明的标志不会被覆盖：在此写入权限模式会优先于下方启动模式。留空为默认。SSH 项目在远程主机执行相同命令。',
    sectionDescription:
      '选择添加菜单中显示哪些 Agent、默认 Agent，以及 nodeterm 是否为各 Agent 安装 hook 与 skill。',
    sectionDescriptionWithDefault:
      '选择添加菜单中显示哪些 Agent、默认 Agent（{agent}），以及 nodeterm 是否为各 Agent 安装 hook 与 skill。',
    defaultAgentBadge: '默认',
    setDefaultAgent: '设为默认',
    shownInMenus: '显示',
    hiddenInMenus: '隐藏',
    showAgentInMenusAria: '在添加菜单中显示 {agent}',
  },
  accounts: {
    title: '账户',
    description: '并排使用多个 Claude 或 Codex 登录。每个账户保留独立登录、设置与历史。打开 Agent 时选择账户；运行中的 Agent 可通过右键菜单切换到另一账户。',
    rows: {
      accounts: {
        title: 'Claude 与 Codex 账户',
      },
    },
  },
  customAgents: {
    title: '自定义 Agent',
    description: '使用自有 Agent CLI，或包装内置 harness（如 Claude）将推理指向自有代理。环境变量值支持针对 shell 环境的 ${env:VAR} 与 ${env:VAR:fallback} 展开。',
    rows: {
      custom: {
        title: '自定义 Agent',
      },
    },
  },
  githubIssues: {
    title: 'GitHub Issues',
    description: '使用具有仓库元数据读取及 Issues 读写权限的 fine-grained token。Token 仅在本页面写入。',
    dispatchDescription:
      '将 issue 卡片移入此列时，会自动在其上启动 Agent 会话 — 与「使用 Agent 开始」相同。仅本机本应用内的移动会触发 — 非 GitHub 标签变更、队友移动或 git pull 同步的看板。每个 issue 一次运行；后续排队。此设置仅本机有效。',
    rows: {
      enable: {
        title: 'GitHub Issues',
      },
      repository: {
        title: '仓库',
      },
      authentication: {
        title: '认证',
      },
      mapping: {
        title: '列标签',
      },
      pullAutoMove: {
        title: '移动已合并的会话卡片',
      },
      dispatch: {
        title: '派发 Agent',
      },
      data: {
        title: '同步与本地数据',
      },
    },
  },
  modelGateway: {
    title: '模型网关',
    description: '配置单一网关，通过 OpenAI 兼容 Models API 发现模型，并在支持的 Agent 节点间切换，无需为每个模型创建自定义 Agent。',
    endpointDescription: '填写网关根地址。模型发现使用兼容 OpenAI 的 /v1/models 接口；Agent 启动使用配置的服务商路由。',
    invalidUrl: '请输入有效的 HTTP(S) 地址，不要在地址中包含用户名或密码。',
    discoveryLabel: '模型发现：',
    discoveryPathTitle: '模型发现接口',
    discoveryPathDescription: '选择读取模型列表的网关接口。此设置仅影响模型发现；Agent 启动仍使用网关地址下方列出的 OpenAI 和 Anthropic 路由。',
    defaultPathHint: 'OpenAI 标准路径（默认）。',
    openaiPathHint: '通过 OpenAI 路由前缀读取模型列表。',
    anthropicPathHint: '通过 Anthropic 路由前缀读取模型列表。',
    customPath: '自定义路径…',
    customPathHint: '在下方填写完整路径。',
    credentialSource: '凭据来源',
    credentialDescription: '引用环境变量，或将 API 密钥保存到受保护的本地存储中。',
    environment: '环境变量',
    storedKey: '已保存的 API 密钥',
    environmentDescription: '仅填写变量名。settings.json 中保存的是 ${env:VAR} 引用，不会保存密钥本身。',
    invalidEnvironment: '仅可使用字母、数字和下划线，首字符不能是数字。',
    apiKey: 'API 密钥',
    keyDescription: '密钥仅可写入，不会显示在 settings.json 或重启命令中。',
    restrictedStorage: '加密存储不可用。密钥保存在权限为 0600 的本地文件中。',
    unavailableStorage: '当前会话无法使用密钥存储。',
    keySavedPlaceholder: '已保存 API 密钥',
    saveKey: '保存密钥',
    clearKey: '清除',
    discoveringModels: '正在获取模型…',
    autoRefresh: '修改这些设置后，模型列表也会自动刷新。',
    discovering: '正在获取…',
    refresh: '刷新',
    discoverModels: '获取模型',
    defaultModelDescription: '在“设置 → Agent → 启动模式”中选择“网关（默认模型）”后，新建 Agent 会使用此模型。请先获取模型列表，再选择默认模型。',
    defaultModelAria: '网关默认模型',
    noDefaultModel: '（未选择，使用 CLI 默认模型）',
    invalidKey: '请输入非空的 API 密钥，且不能包含换行。',
    keyringLocked: '请解锁系统密钥环后重试。',
    saveFailed: '无法保存 API 密钥，请重试。',
    keySaved: 'API 密钥已安全保存。',
    keyCleared: '已清除保存的 API 密钥。',
    modelAvailable: '共 {count} 个可用模型。',
    modelsAvailable: '共 {count} 个可用模型。',
    rows: {
      endpoint: {
        title: '网关 URL',
      },
      discoveryPath: {
        title: '发现路径',
      },
      key: {
        title: 'API 密钥',
      },
      discovery: {
        title: '可用模型',
      },
      defaultModel: {
        title: '默认模型',
      },
    },
  },
  notifications: {
    title: '通知',
    description: '应用在后台时，Agent 完成一轮工作后通知你。',
    rows: {
      notify: {
        title: '后台完成一轮工作时通知',
      },
      sound: {
        title: '完成或需要你时播放提示音',
      },
      mobilePush: {
        title: '向已配对手机发送推送',
      },
    },
    soundDescription:
      '一轮完成时短促复古提示音，需要你时较沙哑 — 或为任一事件使用自定义音频。无论窗口是否聚焦都会播放，便于在看其他节点时听到完成。',
    volumeLabel: '音量',
    mobilePushDescription: '在 Agent 需要批准、提问或完成时发送 — 仅当已配对手机。',
    pushNeedsYou: '需要你（批准与提问）',
    pushDone: '任务完成',
    liveUpdatesOnPhone: '手机实时更新',
    liveUpdatesDescription: '在会话运行、需要你或完成时，在手机锁屏保持实时状态更新。',
    holdPhoneAlerts: '在本机活跃时暂缓手机提醒',
    holdPhoneAlertsDescription:
      '在本机活跃时推迟批准、提问与完成提醒，在你空闲或锁屏后立即发送。实时更新从不会暂缓。',
  },
  phone: {
    title: '手机',
    description: '配对 nodeterm 移动应用，使其通过局域网连接本机 — 无需终端命令。',
    rows: {
      remote: {
        title: '手机远程访问',
      },
      pair: {
        title: '配对手机',
      },
      devices: {
        title: '已配对设备',
      },
      webhook: {
        title: '推送 Webhook',
      },
    },
    remoteAccessTitle: '手机远程访问',
    remoteAccessDescription:
      '从任意位置（不仅是局域网）访问 {machine} — 经 relay 端到端加密。已配对手机通过 relay 连接；首次连接需用配对码验证。',
    remoteAccessAria: '手机远程访问',
    pairHeading: '配对手机',
    pairDescription:
      '配对 nodeterm 移动应用：用手机扫描此 QR。手机在本地生成密钥 — 除一次性配对令牌外，不会有密钥离开本机。',
    noAppYet: '还没有应用？',
    startPairing: '开始配对',
    starting: '正在启动…',
    pairedDevicesHeading: '已配对设备',
    noDevicesPaired: '尚无已配对设备',
    pairedAt: '配对于 {date}',
    revoke: '撤销',
    pushWebhookDescription:
      '让脚本、CI 或长时间构建在结束时通知你的手机。向与本机关联的手机发送纯文本通知，标记为来自 webhook — 而非 Agent。标题最多 {titleMax} 字符，正文最多 {bodyMax}；不会打开链接。',
    pairPhoneForWebhook: '请先配对手机并开启远程访问 — webhook 会推送到与本机关联的手机。',
    retry: '重试',
  },
  projectSettings: {
    description: '显示在标签与项目切换器中。',
    rows: {
      name: {
        title: '项目名称',
      },
      folder: {
        title: '文件夹',
      },
      color: {
        title: '图标与颜色',
      },
      permission: {
        title: '默认权限模式',
      },
      account: {
        title: '默认 Claude 账户',
      },
    },
  },
  remote: {
    title: '远程访问',
    description: '打开在你拥有的另一台机器上运行的终端 — 经 relay 端到端加密。托管（共享本机）为 Pro；连接主机免费。',
    rows: {
      allow: {
        title: '允许远程访问',
      },
      connect: {
        title: '连接到主机',
      },
    },
    hostingRequiresPro: '托管本机需要 nodeterm Pro — 请在上方升级。使用他人提供的配对码连接主机免费。',
    sharingProject: '正在共享 {name}。',
    sharePairingCode: '将以下配对码发给另一台设备（一次性）：',
    pairingCode: '配对码',
    copyCode: '复制配对码',
    stopSharing: '停止共享',
    projectToShare: '要共享的项目',
    projectCannotShare: '{name}（无法共享）',
    starting: '正在启动…',
    connectHeading: '连接到主机',
    pasteHostCode: '粘贴主机的配对码',
    connect: '连接',
    connecting: '正在连接…',
  },
  speech: {
    title: '语音',
    description: '向任意终端或聊天节点听写。本地 Whisper 完全在设备上运行 — 数据不会离开本机。',
    rows: {
      engine: {
        title: '语音引擎',
      },
      shortcut: {
        title: '听写快捷键',
      },
      models: {
        title: 'Whisper 模型',
      },
      language: {
        title: '语言',
      },
    },
    engineDescription: '本地 Whisper 在本机转写。云端需要 nodeterm 后端 · 尚未提供。',
    engineLocal: '本地 Whisper',
    engineCloud: '云端',
    engineAria: '语音引擎',
    shortcutDescription: '听写快捷键与其它键盘快捷键一同管理。',
    shortcutDisabled: '当前已禁用。',
    shortcutHoldToTalk: '当前为按住说话：按住 {chord}。',
    shortcutToggle: '当前为切换模式：按 {chord}。',
    openKeyboardShortcuts: '打开键盘快捷键',
    modelsHeading: 'Whisper 模型',
    modelsLoading: '正在加载模型…',
    modelNone: '无',
    modelNoneDescription:
      '听写关闭 — 快捷键与 Dock 麦克风会提示而非录音。下载下方模型即可开启。',
    proBadge: 'PRO',
    freeBadge: 'FREE',
    download: '下载',
    delete: '删除',
    unlockWithPro: '使用 Pro 解锁',
    downloading: '正在下载 {pct}%',
    downloadFailed: '下载失败。',
    deleteFailed: '删除失败。',
    languageLabel: '语言',
  },
  ssh: {
    title: '远程 (SSH)',
    description: '已保存的 SSH 服务器出现在「新建远程」下，可在本地画布托管节点。每个也会在账户中成为一台机器，拥有独立的 Codex 登录。通过 SSH 打开远程终端免费。',
    rows: {
      servers: {
        title: '已保存的 SSH 服务器',
      },
      windowsAgent: {
        title: '在 Windows ssh-agent 中保留已解锁密钥',
      },
    },
    addServer: '添加服务器',
    importSshConfig: '从 ~/.ssh/config 导入',
    windowsAgentDescription:
      '默认关闭。开启后，为 SSH 项目用口令解锁的密钥也会加入 Windows OpenSSH 身份验证 Agent 服务（运行中时），后续连接及本机 ssh 不再反复询问。Windows 会加密保存密钥直至移除（ssh-add -d 或 ssh-add -D 清除全部）；nodeterm 退出或重启后仍保留。~/.ssh/config 中 AddKeysToAgent yes 的主机无需此开关。',
  },
  teamAccess: {
    title: '团队席位',
    description: '与团队共享 {machine} — Pro 含 3 席位，额外席位 $5/席位/月。',
    rows: {
      team: {
        title: '团队访问',
      },
    },
    upgradeTitle: '升级到 Pro — 含 3 个协作者席位',
    upgradeBody1:
      'Pro 含 3 个席位，可与团队共享 {machine}。需要更多？额外席位 $5/席位/月。每位队友通过 relay 从自己的设备端到端加密连接。',
    upgradeBody2:
      '席位授予完整访问：席位上的队友可以 {machine} 上以你的身份运行命令（所有项目）— 与授予 SSH 访问相同。每次连接仍须一次性配对码共同核对。',
    upgradeCta: '升级到 Pro — 获得 3 个免费席位',
  },
  usage: {
    title: '用量',
    description: '订阅限额显示在画布左下角胶囊中。隐藏提供商仅为显示选择 — 凭据不变，重新启用即时生效。',
    rows: {
      percentMode: {
        title: '用量百分比',
      },
      visibility: {
        title: '提供商',
      },
      cookies: {
        title: 'Web 控制台登录',
      },
    },
    percentModeLabel: '用量百分比',
    percentModeDescription:
      '提供商限额与上下文计量显示已用百分比、剩余百分比，或（仅上下文计量）原始 token 数。提供商限额无 token 计数，会回退为「已用」。',
    percentModeAria: '用量百分比显示方式',
    percentUsed: '已用',
    percentRemaining: '剩余',
    percentTokens: 'Token',
    providerRowLabel: '{provider} 用量',
    showProviderAria: '显示 {provider} 用量',
    providers: {
      claude: {
        blurb: '来自 Claude 订阅的会话、每周及各模型限额。',
      },
      'claude-remote': {
        displayName: 'SSH 主机上的 Claude',
        blurb:
          '已连接 SSH 项目主机上 Claude 账户的限额。每次读取在主机本地经现有连接完成 — 凭据不会离开主机。',
      },
      codex: {
        blurb: '来自 ChatGPT（Codex）订阅的会话与每周限额。',
      },
      cursor: {
        blurb: '来自 Cursor Agent CLI 登录的每月包含用量（总计、Auto 与 API）。',
      },
      gemini: {
        blurb: '来自 Gemini CLI 登录的各模型每小时配额。',
      },
      grok: {
        blurb: '来自 Grok CLI 登录的每周额度与每月预算。',
      },
      kimi: {
        blurb: '来自 Kimi Code 登录的会话与每周配额。',
      },
      minimax: {
        blurb: '各模型会话配额 — 需要下方的 Cookie。',
      },
      opencode: {
        blurb: '会话、每周与每月用量 — 需要下方的 Cookie。',
      },
    },
    cookies: {
      minimax: {
        label: 'MiniMax',
        description:
          'MiniMax 不提供 CLI 凭据，配额通过控制台会话读取。打开 platform.minimax.io/console/usage，从 DevTools 复制请求的 Cookie 头并粘贴到此处。',
        placeholder: 'Cookie: _token=…',
      },
      opencode: {
        label: 'opencode',
        description:
          'opencode 不提供用量 API，数字从仪表盘页面读取。打开 opencode.ai，从 DevTools 复制 Cookie 头并粘贴到此处。因读取的是页面而非 API，opencode 改版后可能失效 — 会报错而非静默无数据。',
        placeholder: 'auth=…',
      },
      noteStored:
        '保存在仅你的用户可读的文件中，不会写入 settings.json。不会再次显示 — 会话过期时请重新粘贴。',
      noteEmpty:
        '这是实时会话凭据。保存在权限 0600 的文件中，而非 settings.json，且不会读回界面。',
      storedPlaceholder: '•••••••• 已保存',
    },
  },
  license: {
    title: '许可证',
    description: '管理 nodeterm Pro 订阅。',
    rows: {
      license: {
        title: '许可证',
      },
    },
  },
  liveLinks: {
    title: '实时链接',
    description: '指向单个终端的只读浏览器链接。查看者无需安装；链接会自行过期。',
    rows: {
      links: {
        title: '活动实时链接',
      },
    },
    upgradePitch:
      '与任何人实时共享终端 — 队友、客户或审查者 — 链接会自行过期。',
  },
  shortcuts: {
    title: '键盘快捷键',
    description:
      '重映射任意命令。覆盖保存在 settings.json 的 `keybindings` 中；「禁用」关闭命令快捷键，「重置」恢复默认。Reload（⌘R / ⌘⇧R）无法录制 — 始终属于应用；菜单保留的系统级组合键 — ⌘Q（退出）、⌘H（隐藏）及开发者角色 — 在录制时仍生效，请勿尝试绑定。',
    rows: {
      filter: {
        title: '筛选快捷键',
      },
      policy: {
        title: '终端聚焦时',
      },
    },
    policyDescription:
      '应用快捷键优先（默认）：⌘K 等共享快捷键在终端聚焦时仍可用；首次以该方式捕获时终端会提示 — 每个组合键仅一次。终端优先：除终端自身快捷键外，所有组合键进入 shell 或 TUI，包括关闭（⌘W / Ctrl+W）、最小化（⌘M / Ctrl+M）、实际大小（⌘0）、看板（⌘⇧B）、设置（⌘,）及 ⌘1–9 项目跳转 — 终端聚焦时对应菜单项变灰以便组合键到达终端。Reload（⌘R / ⌘⇧R）为例外，始终属于应用，以便恢复卡住的窗口。',
    policyAppFirst: '应用快捷键优先',
    policyTerminalFirst: '终端优先',
    filterStatusAria: '按状态筛选快捷键',
    filterAll: '全部 {count}',
    filterModified: '已修改 {count}',
    filterUnassigned: '未分配 {count}',
    filterDisabled: '已禁用 {count}',
    noShortcutsMatch: '没有匹配的快捷键。',
    tooltipDisable: '禁用快捷键',
    tooltipReset: '恢复默认',
  },
} as const
