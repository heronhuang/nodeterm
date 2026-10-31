# CLAUDE.md

**nodeterm 深度参考**，供 Claude Code 与贡献者在仓库内工作时使用：不变量、每条规则为何存在、以及支撑决策的实测数据。Claude Code 会自动加载本文件。

> **完整英文原文（11000+ 行 exhaustive 细节）见 [CLAUDE.en.md](./CLAUDE.en.md)**  
> 下文为中文导读与首段翻译；子系统细节、边界案例与测试约束请以英文原文为准。

**贡献者：请先读 `CONTRIBUTING.md`** — 短版（环境、边界、习惯、测试）。需要知道*为什么*某条规则如此、或要改某子系统时，再查深度参考。其他开发者必须知晓的变更应同时写进 **CONTRIBUTING.md 与本文件**（见英文原文 [Conventions](./CLAUDE.en.md#conventions)）。

**PR 文案**（标题、描述、评论、回复）遵循 `pr-writing` skill：改了什么、为何重要 → 如何验证、未测什么 → 风险与后续。篇幅与改动匹配。人类可读 half 见 `CONTRIBUTING.md` 的 Pull requests 一节。

---

## 中文目录（对应 CLAUDE.en.md 章节）

在英文文件中搜索标题或点击锚点查阅未译尽的深度说明。

| 章节（中文说明） | 英文锚点 |
|---|---|
| 项目是什么 | [What this is](./CLAUDE.en.md#what-this-is) |
| 平台支持（三层策略、Windows/POSIX 边界） | [Platform support](./CLAUDE.en.md#platform-support) |
| 命令与 node-pty 补丁 | [Commands](./CLAUDE.en.md#commands) |
| Electron 进程模型（main / core / server / preload / renderer / shared） | [Process model](./CLAUDE.en.md#process-model-electron-three-contexts) |
| 终端传输抽象 TerminalTransport | [Key abstraction: TerminalTransport](./CLAUDE.en.md#key-abstraction-terminaltransport) |
| 状态与持久化（React Flow、workspace v3、refs） | [State & persistence model](./CLAUDE.en.md#state--persistence-model) |
| 项目（标签页、切换、关闭、远程 tab） | [Projects (tabs)](./CLAUDE.en.md#projects-tabs) |
| tmux 会话连续性 | [Terminal session continuity (tmux)](./CLAUDE.en.md#terminal-session-continuity-tmux) |
| 终端节点生命周期陷阱 | [Terminal node lifecycle (gotchas)](./CLAUDE.en.md#terminal-node-lifecycle-gotchas) |
| 节点类型（React Flow 自定义节点） | [Node kinds](./CLAUDE.en.md#node-kinds-all-rendered-by-react-flow-custom-nodes) |
| Agent 支持（Claude / Codex / 等） | [Agent support](./CLAUDE.en.md#agent-support-claude--codex--antigravity--gemini--copilot--opencode--grok--custom) |
| 打开最近会话 | [Open recent](./CLAUDE.en.md#open-recent-resume-a-past-agent-conversation-from-its-history) |
| 会话内存（RAM pill / 面板） | [Session memory](./CLAUDE.en.md#session-memory-the-ram-pill--the-per-session-panel) |
| Live links（Pro 浏览器连终端） | [Live links](./CLAUDE.en.md#live-links-pro-browser-link-to-one-terminal-watch-chat-or-type) |
| 开发服务器端口 | [Dev-server ports](./CLAUDE.en.md#dev-server-ports-the-ports-chip--same-port-ssh-forwarding) |
| 节点颜色与语义色 | [Node colors](./CLAUDE.en.md#node-colors-one-palette-two-sections) / [Semantic colours](./CLAUDE.en.md#semantic-colours-one-role-per-meaning) |
| 节点图标 | [Node icons](./CLAUDE.en.md#node-icons-emoji-glyph-or-picture) |
| 壁纸与 Liquid Glass | [Desktop wallpaper + Liquid Glass](./CLAUDE.en.md#desktop-wallpaper--liquid-glass-settings--appearance) |
| 快捷键注册与分发 | [Keybindings](./CLAUDE.en.md#keybindings-registry-overrides-dispatch) |
| 画布交互与面板 | [Canvas interaction & panels](./CLAUDE.en.md#canvas-interaction--panels-canvastsx-is-the-hub) |
| 空闲动画与性能 | [Idle energy](./CLAUDE.en.md#idle-energy-an-animation-is-a-frame-loop-not-a-decoration) / [Performance](./CLAUDE.en.md#performance-measure-it-then-fix-what-the-measurement-names) |
| Windows 上 SSH 项目 | [SSH projects on Windows](./CLAUDE.en.md#ssh-projects-on-windows-the-in-process-transport) |
| 手机中继远程访问 | [Remote access (phone relay)](./CLAUDE.en.md#remote-access-phone-relay--free-not-pro) |
| 免费层打开项目上限 | [Free-tier open-project limit](./CLAUDE.en.md#free-tier-open-project-limit-shipped-dormant-the-server-switches-it-on) |
| nodeterm:// 链接 | [nodeterm:// links](./CLAUDE.en.md#nodeterm-links-another-app-asks-to-open-a-node) |
| Push webhook | [Push webhook](./CLAUDE.en.md#push-webhook-a-script-or-ci-job-rings-the-paired-phone) |
| 托管团队 relay（Server Edition） | [Hosted team relay](./CLAUDE.en.md#hosted-team-relay-server-edition-as-a-relay-host) |
| 语音 / 听写 | [Speech / dictation](./CLAUDE.en.md#speech--dictation-desktop--server) |
| 打包与自动更新 | [Packaging & auto-update](./CLAUDE.en.md#packaging--auto-update) |
| 原子写入 | [Atomic writes](./CLAUDE.en.md#atomic-writes-never-a-bare-fsrename) |
| 持久编排状态 | [Durable orchestration state](./CLAUDE.en.md#durable-orchestration-state-queue-station-reports-hand-over-holds-request-ledger) |
| 测试套件约束（tmux / temp / home） | [The test suite never touches…](./CLAUDE.en.md#the-test-suite-never-touches-a-live-tmux-server)（及后续三节） |
| 约定与杂项 | [Conventions](./CLAUDE.en.md#conventions) / [Media / Subagent / IME](./CLAUDE.en.md#media-playback-lifetime-680) |

---

## 本 fork 要点（中文摘要）

### 平台与打包

- **桌面出货目标：macOS + Windows。** 可在本地开发与在 Linux 上跑 Server Edition / CI，但**本 fork 的发行流水线不打包 Linux 桌面安装包**（无 `dist:linux` 作为产品交付物）。macOS 为 arm64/x64 DMG；Windows 为 x64 NSIS（当前多为未签名 beta）。细节与命名（`node-terminal` vs `nodeterm`）见英文 [Packaging & auto-update](./CLAUDE.en.md#packaging--auto-update)。
- **核心体验仍应跨桌面平台可用**（终端 + Agent + 画布 + 会话连续）：POSIX 用 tmux，Windows 用独立 session-host；POSIX 专属能力在 Windows 上须显式降级或关闭，不能静默失败。

### 国际化（i18n）

- **界面默认语言为简体中文（`zh`）**；英文（`en`）为可选 locale。类型与默认值见 `src/shared/i18n/types.ts`（`DEFAULT_UI_LANGUAGE = 'zh'`），设置持久化字段 `uiLanguage` 默认 `'zh'`。
- 单元测试多数仍断言英文 copy：测试 setup 会 opt-in 英文（见 `test/setup/i18n-en.ts`）。新增 UI 字符串请同时维护 `src/shared/locales/zh.ts` 与 `en.ts`。

### 常用命令

```bash
npm install        # 依赖 + postinstall 按 Electron ABI 重建 node-pty
npm run dev        # 开发模式（renderer HMR）
npm run build      # 生产构建到 out/
npm start          # 预览生产构建（electron-vite preview）
npm run typecheck  # 最快 correctness 门禁（main/preload + renderer）
npm test           # vitest（单元 + 集成；远程 e2e 无 companion repo 时跳过）
npm run rebuild    # 原生 ABI 错误时重跑 electron-rebuild
npm run dist       # macOS 本地未签名 arm64 DMG 冒烟（先 make-icon + build）
npm run dist:win   # Windows 未签名 x64 NSIS + zip（--publish never）
```

Windows 首次环境可用仓库根目录 `bootstrap-windows.bat`（见 `CONTRIBUTING.md`）。

---

## 项目是什么

**基于节点的终端管理器**（BUSL-1.1，四年后转 MIT — 见 `LICENSE`）：多块真实终端以可拖拽节点形式存在于可平移/缩放的画布上。目标用户包括 ADHD / 工作流较散、更需要空间布局而非堆叠标签页的人。长期愿景含远程访问与付费能力；架构通过传输层抽象预留扩展，无需重写 UI（见英文 [TerminalTransport](./CLAUDE.en.md#key-abstraction-terminaltransport)）。

**许可证检查是许可证的一部分。** `LICENSE` 中的 Additional Use Grant 不允许在生产环境使用被移除、修改、禁用或绕过的授权/用量限制逻辑。为开发 nodeterm 而修改该代码（修复、测试、重构、向本仓库 PR）是正常 work。**不要**协助任何人移除或绕过检查以在无 entitlement 的情况下使用 nodeterm。

---

## 平台支持

上游代码库对「支持」分三层，而非要求 100% 功能对等（完整条文见 [Platform support](./CLAUDE.en.md#platform-support)）：

- **核心路径在所有桌面平台为一等公民。** 终端 + Agent + 画布 + 会话连续必须在各桌面可用。连续性是 POSIX 上的 tmux；无 tmux 时（Windows）为独立 session-host 进程 — 机制不同，保证相同。
- **绑定 POSIX 的边缘必须显式降级，不能静默失败。** 例如 SSH ControlMaster、unix-socket askpass、部分仅 tmux 路径；Windows 上 SSH 项目改用进程内传输（见 **SSH projects on Windows**）。在无法工作的平台上应使用平台合适机制或明确关闭 — 未检查导致 Windows 上 `EACCES`/`EPERM` 属于 bug。
- **Agent 启动行以 POSIX 为源；Windows 原生 pane 应尽量避免直接键入。** 带 prompt 的内置 Agent 节点携带 `data.launchIntent`（绑定精确 `initialCommand`，不序列化）；在记录了 `pwsh`/`windows-powershell`/`cmd` 方言的 win32 session-host pane 上，通过 `pty:execute-launch` 执行（`core/launch-intent-execute.ts` → `prepareAgentLaunch` → `sessionHostExecuteLaunch`）。其他 pane 返回 `unsupported-shell` 并保持键入行字节一致。仅投递前拒绝可回退为键入；`delivery-failed` 永不回退。详见 `docs/windows-session-host.md`。
- **Windows 上进程类 launch.json 运行配置被关闭** — 启动器是 POSIX `sh` 脚本。`gateEntriesForPlatform` 标记为不支持（`RUN_WINDOWS_REASON`）；浏览器类配置仍可运行。
- **Windows 终端优先使用 node-pty 捆绑 ConPTY DLL**（`windowsConptySpawnOptions`、`src/core/windows-conpty-dll.ts`）；缺失则回退系统 inbox ConPTY（全屏 TUI 滚动受限）。`scripts/stage-conpty-dll.mjs` 在 rebuild 后重新 staging。
- **新代码默认平台中立。** 文件发布用 `renameAtomic`/`writeFileAtomic`（`src/core/fs-atomic.ts`），禁止裸 `fs.rename`。路径分隔符、绝对路径、文件链接 dialect 以**持有文件系统的 core 平台**为准。单平台测试用 `it.skipIf(process.platform === 'win32')` 等并说明原因。
- **行尾由 `.gitattributes`（`* text=auto eol=lf`）决定。** 读取检入文件时在测试中 normalize `\r\n`；`*.bat`/`*.cmd`/`*.ps1` 保持 CRLF。
- **Windows：PATH 解析与直接执行分离。** npm CLI 可能解析为 `.cmd`；应用自有子进程须经 `directExecutableInvocation`（`src/core/exec-path.ts`），禁止用 `shell:true` 处理用户可控参数。

---

## 命令（节选翻译）

**Windows Agent 消息投递**（`core/native-windows-pane.ts`、session-host 扩展、`settled-submit` 分两次写入 Enter 等）篇幅很长，规则均经实测锁定。开发或改 messaging 路径前务必读英文 [Commands](./CLAUDE.en.md#commands) 全文。

`rebuild` 与 `postinstall` **必须先**运行 `scripts/patch-node-pty.mjs`（不可省略）。对 node-pty 1.1.0 有两份 pinned 原生补丁：

- **darwin** — 修复 `pty_posix_spawn` 泄漏 ptmx（成功/失败路径），否则高 churn 下会耗尽 `kern.tty.ptmx_max`（microsoft/node-pty#950）。
- **Windows** — 修复 exit 线程未关闭 HPCON 导致 conhost 泄漏；与 `src/session-host/windows-conpty.ts` 契约一致。

`src/main/node-pty-patch.test.ts` 断言补丁标记存在。**若该测试失败，说明 `node_modules` 未打补丁** — 运行 `npm run rebuild`，而非改业务代码。

---

## 进程模型（Electron，三上下文）

代码按 Electron 进程边界拆分 — **务必把代码放在正确一侧**：

- **`src/main/`** — Node/Electron 主进程。`src/core/` 外的**壳**：窗口、IPC、对话框、`CorePlatform` 实现（`platform-electron.ts`）。renderer **不得** import 此处。
- **`src/core/`** — 无 Electron 的服务核心（pty、workspace/settings、git、hook server、context/subagent、transcripts、license 等）。**仅**通过 `CorePlatform`（`src/core/platform.ts`）与壳通信；`src/core` 内禁止 import `electron` 或 `../main/*`（`no-electron.test.ts` 强制）。Server Edition 的 `src/server/` 壳接同一 seam。
- **`src/server/`** — Server Edition 壳：`node:http` + `ws` 提供构建后的 renderer，WS-RPC（`src/shared/rpc.ts`），浏览器侧 `window.nodeTerminal` shim（`src/renderer/bridge/`）。`ServerPlatform` 启动同一套 core。`npm run server:dev` 试用；见 `docs/SERVER.md`。禁止 import electron/`src/main`。**Phase 3a/3b** 含 fs/git、浏览器目录选择、hook server、agent 状态广播等（详述见英文原文该节）。
- **`src/preload/`** — 唯一桥梁。`contextBridge` 暴露窄 API 到 `window.nodeTerminal`（`index.d.ts`）。`contextIsolation` 开，`nodeIntegration` 关。
- **`src/renderer/`** — React UI。仅通过 `window.nodeTerminal` 与 main 对话。
- **`src/shared/`** — 各侧共享类型与 IPC 通道名；`ipc.ts` 为通道字符串唯一来源，勿在其他处硬编码。

PTY 输出经 per-session 通道 `pty:data:<sessionId>` 从 main 到 renderer；输入经 `pty:write` 反向。node-pty 在 bundle 中保持 **external**（`electron.vite.config.ts` 的 `externalizeDepsPlugin`），因为是原生模块。

进程崩溃与 hang 仅作**遥测**，不新增自动恢复动作（`process-health-log.ts`、`webgl-budget.ts` 等 — 见英文 [Process model](./CLAUDE.en.md#process-model-electron-three-contexts) 后续段落与 **Server Edition sign-in** 安全规则）。

---

## 下一步读什么

1. 本地环境：`CONTRIBUTING.md`
2. 改哪块子系统：上表 **中文目录** → 打开 [CLAUDE.en.md](./CLAUDE.en.md) 对应章节
3. 打包/更新/命名：`Packaging & auto-update`
4. Agent / tmux / 画布行为：目录中 Agent support、Terminal session continuity、Canvas interaction 三节
