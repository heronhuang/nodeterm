/** 行为 settings section (简体中文). */
export const behaviorZh = {
  title: '行为',
  rows: {
    defaultView: { title: '默认视图' },
    omniKanban: { title: '全局看板（跨项目泳道）' },
    omniKanbanDefault: { title: 'Cmd+Shift+B 默认打开全局看板' },
    gridSize: { title: '网格大小' },
    nodeSize: { title: '默认节点尺寸' },
    snap: { title: '对齐网格' },
    autoAlign: { title: '对齐网格模式（自动排列）' },
    panHover: { title: '悬停平移延迟（毫秒）' },
    focusFollowsPointer: { title: '终端焦点跟随指针' },
    doubleClick: { title: '双击以聚焦' },
    focusZoom: { title: '前往节点时缩放' },
    closeProjectOnLastSession: { title: '最后一个会话关闭后询问是否关闭项目' },
    rememberLock: { title: '记住画布锁定状态' },
    openLinks: { title: '允许 nodeterm:// 链接' },
    mdPreview: { title: '以预览打开 Markdown' },
    sidebarCollapse: { title: '侧栏：默认折叠非活动项' },
    sidebarGrouping: { title: '侧栏：分组方式' },
    projectStorage: { title: '新建文件夹项目的画布存储位置' },
    worktreePath: { title: 'Worktree 路径模板' },
    wheelZoom: { title: '滚轮缩放' },
    wheelZoomSpeed: { title: '滚轮缩放速度' },
    trackpadPan: { title: '触控板滚动平移' },
    dragMode: { title: '画布左键拖拽' },
    browserSaver: { title: '浏览器内存节省' },
    keepAwake: { title: 'Agent 工作时保持唤醒' },
    confirmQuit: { title: '退出前确认' },
    backgroundClose: { title: '关闭窗口后保持运行' }
  },
  defaultViewLabel: '默认视图',
  defaultViewDescription:
    '在你未手动切换时，项目以何种视图打开。你已切换过的项目会保留各自的选择。',
  viewCanvas: '画布',
  viewKanban: '看板',
  omniKanbanLabel: '全局看板（跨项目泳道）',
  omniKanbanDescription:
    '开启后，可通过专用快捷键打开全局看板概览（设置 → 键盘快捷键 → 切换全局看板）。默认关闭 — 现有用户界面不变。',
  omniKanbanAria: '全局看板',
  omniDefaultLabel: '将 Cmd+Shift+B 默认设为全局看板',
  omniDefaultDescription:
    '开启后，Cmd+Shift+B 打开全局概览而非单项目看板。专用全局快捷键始终打开全局看板。需主动开启，按用户生效。',
  omniDefaultAria: '全局看板为默认',
  gridSizeLabel: '网格大小',
  snapLabel: '对齐网格',
  autoAlignLabel: '对齐网格模式',
  autoAlignDescription:
    '开启瞬间将所有节点排列到网格上 — 类似桌面「自动排列」。与上方仅约束拖拽的对齐开关不同。',
  focusFollowsPointerOn:
    '开：悬停终端达到悬停平移延迟后获得键盘焦点；指针移开仍保留焦点，直到悬停另一终端、或点击其他节点、空白画布或输入框。关闭则改为点击聚焦。',
  focusFollowsPointerOff:
    '关（点击聚焦）：点击终端即可输入；保留焦点直到点击其他节点、空白画布或输入框 — 仅移动指针不会改变焦点。',
  panHoverUnused:
    '在点击聚焦模式下未使用（终端焦点跟随指针已关）：悬停不会获得键盘焦点。',
  focusZoomDescription: '关：前往节点时保持当前缩放，仅平移画面。',
  closeProjectDescription:
    '用 × 关闭项目中最后一个终端或 Agent 节点时，询问是否一并关闭项目。仍可从「最近关闭」重新打开。',
  rememberLockDescription:
    '左下角锁定在重启后保持，直到你手动关闭。关：每次启动均为未锁定。',
  openLinksDescription:
    '允许其他应用、脚本和网页请求 nodeterm 打开某个 Agent 或终端节点，或预填配对码。每个链接先显示确认 sheet，点击「打开」前不会执行。关：忽略链接。',
  mdPreviewDescription:
    'Markdown 文件以渲染视图打开，而非可编辑文本。节点上的预览/编辑切换仍可双向切换。',
  sidebarCollapseDescription:
    '未单独设置过的项目在非活动时默认折叠。你对项目与分组 chevron 的选择会被记住。',
  sidebarGroupingLabel: '侧栏：会话分组依据',
  sidebarGroupingDescription:
    '按项目（默认）或实时状态分组会话侧栏，使需要关注的会话在全部项目中浮到顶部。状态反映本机 core 会话；远程会话显示为空闲。',
  groupByProject: '项目',
  groupByStatus: '状态',
  groupSessionsAria: '会话分组依据',
  projectStorageDescription:
    '「文件夹内」在文件夹写入 .nodeterm/project.json，可通过 git 共享。「应用数据」不向文件夹写入任何内容。已有 project.json 的文件夹按原样打开。可从标签菜单迁移现有项目。',
  storageInFolder: '文件夹内',
  storageInAppData: '应用数据',
  worktreePathDescription:
    '从仓库根目录解析。支持 $repoName（亦 $reponame 或 $defaultFolderName）与 $branch；缺少分支时会自动追加。',
  wheelZoomDescription: '用普通鼠标滚轮缩放（无需 ⌘）。关闭滚动平移 — 请拖拽平移。',
  wheelZoomSpeedDescription:
    '单次滚轮滚动的缩放幅度。若一次跳动过大（高分辨率滚轮如 MX Master 常见），可调低。',
  trackpadPanDescription:
    '双指触控板滚动可在开启滚轮缩放时仍平移画布，滚轮鼠标仍缩放。macOS 桌面应用可直接区分鼠标与触控板；Windows 与浏览器（Server Edition）为启发式检测 — 若平滑滚轮鼠标（Magic Mouse、MX）误触发平移，请关闭。',
  dragModeDescription:
    '拖拽空白画布时的行为。平移直接移动地图（框选改为 Shift+拖拽）；选择用橡皮筋框选，平移仍为中键拖拽 / 双指滚动。',
  dragSelect: '选择（默认）',
  dragPan: '平移画布',
  browserSaverDescription:
    '隐藏浏览器页面 5 分钟后释放内存；再次显示时重新加载。每个页面是一个完整的 Chromium 进程。',
  keepAwakeDescription:
    '本地 Agent 运行期间阻止空闲睡眠。电池低于 5% 或严重过热时仍允许睡眠。合盖仍会睡眠，macOS 接电源且外接显示器时除外。',
  confirmQuitDescription:
    '应用退出前询问（⌘Q / Ctrl+Q 或标题栏关闭）。无论是否确认，终端会话都会在退出后保留。',
  backgroundAuto: '自动',
  backgroundOn: '始终',
  backgroundOff: '从不（关闭即退出）',
  nodeSizeLabel: '默认节点尺寸（像素）',
  nodeSizeDescription: '所选类型的新节点以此尺寸打开。已有节点保持原尺寸。',
  nodeKindAria: '节点类型',
  reset: '重置',
  backgroundCloseDescriptionWindows:
    '关闭窗口会将 nodeterm 隐藏到通知区域，手机访问、Agent 通知与更新继续运行。从托盘图标或「文件 → 退出」完全退出。在 Windows 上「自动」保持后台运行。',
  backgroundCloseDescriptionLinux:
    '关闭窗口会将 nodeterm 隐藏到系统托盘，手机访问、Agent 通知与更新继续运行。从托盘图标或 Ctrl+Q 完全退出。在 Linux 上「自动」会退出，托盘图标取决于你的桌面环境。'
} as const
