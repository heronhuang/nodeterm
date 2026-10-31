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
  },
  teamAccess: {
    title: '团队席位',
    description: '与团队共享 {machine} — Pro 含 3 席位，额外席位 $5/席位/月。',
    rows: {
      team: {
        title: '团队访问',
      },
    },
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
  },
} as const
