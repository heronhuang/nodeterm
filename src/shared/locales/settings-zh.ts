import { behaviorZh } from './settings-behavior-zh'
import { settingsRestZh } from './settings-rest-zh'

/** 设置各区块文案（简体中文）— 合并进 zhMessages.settings。 */
export const settingsSectionZh = {
  shell: {
    title: 'Shell',
    description: '新建终端使用的 Shell。留空则使用系统默认。',
    rows: { shell: { title: '默认 Shell' } },
    placeholderSystemDefault: '系统默认'
  },
  commit: {
    title: '提交信息 (AI)',
    description: '在本地以只读方式对暂存 diff 运行编码 Agent CLI（无内置模型）。',
    rows: {
      autoFetch: { title: '自动获取 git 状态' },
      agent: { title: '提交 Agent' },
      command: { title: '自定义命令' },
      extra: { title: '额外提示' }
    },
    autoFetchLabel: '自动获取 git 状态',
    autoFetchDescription: '在打开源代码管理时定期从远程刷新 ahead/behind。',
    agentLabel: 'Agent',
    agentClaude: 'Claude Code',
    agentCodex: 'Codex',
    agentCustom: '自定义命令…',
    commandLabel: '命令',
    commandDescription:
      '默认将提示写入命令的标准输入。{prompt} 将其作为单个参数内联传递（Windows 上不可用于 npm .cmd shim，也不可超过 Windows 命令行长度限制）；{promptFile} 传递保存提示的私有临时文件路径。',
    commandPlaceholder: 'mycli --flag {prompt}',
    extraLabel: '额外提示（可选）',
    extraPlaceholder: '例如：使用 Conventional Commits 与 gitmoji'
  },
  updates: {
    title: '更新',
    rows: { updates: { title: '更新' } },
    currentVersion: '当前版本',
    checkForUpdates: '检查更新',
    resultsHint: '结果会显示在右下角的更新卡片中。'
  },
  debug: {
    title: '调试',
    rows: { logPanel: { title: '调试日志面板' } },
    logPanelLabel: '调试日志面板',
    logPanelDescription:
      '将应用自身控制台捕获到内存环形缓冲区（捕获时脱敏），并解锁日志查看器 — 也可在命令面板中通过「Show debug log」打开。不会写入磁盘或上传；导出需手动复制。',
    logViewerLabel: '日志查看器',
    logViewerDescription: '环形缓冲区的实时视图，可按级别与文本筛选。',
    open: '打开'
  },
  notch: {
    title: '刘海',
    description: '在 MacBook 刘海中显示行走的 Agent  mascot，需要时可展开迷你会话面板。',
    rows: {
      enabled: { title: '刘海 HUD' },
      width: { title: '刘海宽度' },
      side: { title: '胶囊位置' },
      offset: { title: '垂直位置' },
      hover: { title: '悬停展开' }
    },
    showHud: '显示刘海 HUD',
    showHudDescription:
      'Agent 工作时将刘海延伸为黑色胶囊：每个忙碌 Agent 一个行走 mascot，需要你时显示红点，已完成且未查看时显示绿点。',
    capsuleSide: '胶囊位置',
    capsuleSideDescription:
      '居中贴近刘海（无刘海屏幕则为中间浮动 pill）。左/右在屏幕该侧、菜单栏下方绘制浮动 pill。',
    alignLeft: '左',
    alignCenter: '中',
    alignRight: '右',
    verticalPosition: '垂直位置',
    verticalPositionDescription:
      '相对默认位置向下（正）或向上（负）微调胶囊。向上最多到屏幕顶边 — 与刘海融合的胶囊已在顶部，通常只能向下，变成刘海下方的浮动 pill。',
    notchWidth: '刘海宽度',
    notchWidthDescription:
      'macOS 不会告知刘海宽度，胶囊需自行假设。微调直至与刘海齐平 — 更大向左，更小向右。仅居中贴刘海的胶囊使用此值。',
    expandOnHover: '悬停展开',
    expandOnHoverDescription:
      '指向胶囊可打开会话面板。关闭时仅点击打开。移开指针都会关闭 — 已完成会话的绿色提示也在此时消失。'
  },
  privacy: {
    title: '隐私',
    rows: {
      telemetry: { title: '发送匿名使用数据' },
      licenseConsent: { title: '在设置 DO_NOT_TRACK 时仍允许许可证检查' },
      licenseConsentLimit: { title: '在设置 DO_NOT_TRACK 时仍允许许可证检查' }
    },
    telemetryLabel: '发送匿名使用数据（版本/系统、打开项目数）',
    telemetryDescription:
      '不含个人数据；从不存储客户端 IP。用于了解在用版本及用户保持打开的项目数量（仅数字 — 不含名称、路径或主机）。更轻量的匿名安装计数仍会运行；可通过 DO_NOT_TRACK 环境变量完全关闭。',
    machineHashSentence:
      ' 若达到免费项目上限，nodeterm 会用本机硬件 id 的单向哈希检查额度（无论此开关是否开启都会发送），使额度绑定本机。',
    consentDescription:
      '仅允许 nodeterm 联系 api.nodeterm.dev 进行许可证检查。遥测与公告 feed 保持关闭。',
    consentDescriptionLimit:
      '仅允许 nodeterm 联系 api.nodeterm.dev 以验证 Pro 与免费项目额度。遥测与公告 feed 保持关闭。',
    licenseConsentLabel: '在设置 DO_NOT_TRACK 时仍允许许可证检查'
  },
  language: {
    rows: { language: { title: '语言' } }
  },
  tmux: {
    title: '会话保护',
    description: '适用于新建终端 / 下次启动。',
    rows: {
      enabled: { title: '持久会话' },
      backend: { title: '会话后端' },
      scrollback: { title: '回滚行数' },
      leadPane: { title: '保持主 pane 较宽 (Agent 团队)' },
      parkMinutes: { title: '切换走后保持终端附着' },
      parkMax: { title: '其他项目中附着的终端上限' },
      offscreen: { title: '释放屏幕外终端' }
    },
    persistentSessions: '持久会话',
    sessionBackend: '会话后端',
    scrollbackLines: '回滚行数',
    leadPane: '保持主 pane 较宽 (Agent 团队)',
    parkMinutes: '切换走后保持终端附着',
    parkMax: '其他项目中附着的终端上限',
    offscreen: '释放屏幕外终端',
    offscreenDescription:
      '终端在屏幕外停留多少分钟后释放其视图（tmux 仍运行；回到视图时会重新附着）。0 = 从不。',
    zellijUnavailable: 'Zellij 不可用：{gaps}'
  },
  signIn: {
    title: '登录',
    rows: {
      signOut: { title: '在此浏览器中退出登录' },
      signOutEverywhere: { title: '在所有地方退出登录' }
    },
    signOutLabel: '在此浏览器中退出登录',
    signOutDescription:
      '结束此浏览器在服务器上的会话，复制的 cookie 也会失效。若通过代理单点登录，也请在那里退出。',
    signOutButton: '退出登录',
    signingOut: '正在退出…',
    signOutEverywhereLabel: '在所有地方退出登录',
    signOutEverywhereDescription:
      '结束此服务器上的所有浏览器会话（包括当前）。所有打开的标签页都会断开，需用密码重新登录。设备丢失或会话可能被复制时使用。',
    signOutEverywhereButton: '在所有地方退出登录',
    confirmMessage:
      '要在所有浏览器中退出吗？此服务器上所有打开的标签页都会断开，需用密码重新登录。正在运行的终端会继续运行。',
    confirmLabel: '在所有地方退出登录'
  },
  presence: {
    title: '你的名称',
    description:
      '其他人连接到 {machine} 时看到的名称与颜色 — 用于 facepile、光标标签与看板评论。',
    rows: { identity: { title: '你的名称' } },
    displayName: '显示名称',
    placeholder: '你的名称',
    color: '颜色',
    colorAria: '颜色 {color}',
    save: '保存',
    saved: '已保存',
    footnote:
      '若未设置名称，对他人显示为「Someone」。这与登录或许可证无关 — 仅用于实时协作中的标识。'
  },
  behavior: behaviorZh,
  ...settingsRestZh
} as const
