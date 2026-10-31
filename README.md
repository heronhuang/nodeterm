<div align="center">

<img src="docs/assets/nodeterm.png" alt="nodeterm" width="120" height="120" />

# nodeterm

<sub>English: [README.en.md](./README.en.md)</sub>

**基于节点的终端管理器 — 在无限画布上放置终端与 Agent。**

多个真实终端以可拖拽节点的形式存在于同一块可平移/缩放的画布上；每个项目同时是一张 **Trello 风格的 Claude Code 实时会话看板**。面向 ADHD 与分散式工作流：用空间布局替代一叠被藏起来的标签页。

**本 fork 默认界面为简体中文**（`zh`）。可在 **设置 → 界面 → 语言** 中切换到 English。

[![Platform](https://img.shields.io/badge/platform-macOS%20(arm64%20%2B%20x64)%20·%20Windows%20(x64%2C%20beta)-black)](https://github.com/heronhuang/nodeterm)
[![Built with Electron](https://img.shields.io/badge/built%20with-Electron-47848F?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![License](https://img.shields.io/badge/license-BUSL--1.1-blue)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/heronhuang/nodeterm?style=flat)](https://github.com/heronhuang/nodeterm/stargazers)
[![Latest release](https://img.shields.io/github/v/release/heronhuang/nodeterm?include_prereleases&sort=semver)](https://github.com/heronhuang/nodeterm/releases)

[下载](#-下载) · [文档](./docs/) · [功能](#-功能) · [从源码构建](#-从源码构建) · [架构](#-架构) · [许可证](#-许可证)

</div>

---

<div align="center">
  <a href="docs/assets/hero-tour.mp4">
    <img src="docs/assets/hero-tour.webp" alt="nodeterm 30 秒速览 — 画布、重启后仍存活的会话、Agent 与刘海、看板、听写、iPhone" width="900" />
  </a>
  <br/>
  <sub>▶ <a href="docs/assets/hero-tour.mp4">观看带声音的 30 秒导览</a></sub>
</div>

## 为什么选择 nodeterm

堆叠的终端标签会隐藏上下文 — 你很难记得哪里在跑什么。nodeterm 把它变成一张 **地图**：每个 shell 都是一个可放置、分组、标注并放大的节点。会话在空间上持久存在，重启后心智模型仍然完整。

同一块画布有三种用法：**macOS 与 Windows（beta）桌面应用**（本 fork 仅发布这两种安装包）、可从任何地方访问的 **自托管浏览器版**（Server Edition），以及接入同一 live 会话的 **iOS 伴侣应用**。

📚 仓库内文档见 [`docs/`](./docs/)；上游完整文档见 [nodeterm.dev/docs](https://nodeterm.dev/docs)。

## ✨ 功能

<table>
<tr>
<td width="42%" valign="middle">

### 一切皆节点

在画布上右键打开 **终端** — 或 AI **Agent**。各自在独立的持久 tmux 会话中运行，旁边还有 **便签**（可链接为 Agent 上下文）、**Monaco 编辑器**、**diff 视图**以及 **网页/视频** 节点 — 像地图一样空间排布。退出应用，甚至 **重启整机** — 每个会话都会回来。

</td>
<td><img src="docs/assets/canvas-tour.webp" alt="画布 — 右键添加 Claude Code、终端、便签、编辑器与 diff；将便签链到 Claude；重启后每个会话都会回来" /></td>
</tr>
<tr>
<td width="42%" valign="middle">

### 知道 Agent 何时需要你

由 Hook 驱动的状态 — 不爬输出：脉动的 **RUNNING / NEEDS YOU** 徽章、带实时 transcript 的 **子 Agent** 卡片、每节点 **上下文计量**、系统通知。点击提示，在节点内直接回答权限请求，并在回合 **完成** 时收到通知。在 MacBook 上，Agent 也会出现在 **刘海** 区域。

</td>
<td><img src="docs/assets/agents-tour.webp" alt="Agent 状态 — 子 Agent 扇出与上下文计量；权限提示点亮刘海并发送 macOS 通知" /></td>
</tr>
<tr>
<td width="42%" valign="middle">

### 一个项目，两种视图

每个项目既是画布 — **也是看板**。卡片 *就是* 你的 live 会话：Agent 继续运行时把卡片拖过列，打开 **实时卡片模态框**（真实会话 + 成员、截止日期、优先级、评论），并分配队友。用 `⌘⇧B` 切换。

</td>
<td><img src="docs/assets/kanban-launch.webp" alt="看板 — ⌘⇧B 将画布变为卡片" /></td>
</tr>
<tr>
<td width="42%" valign="middle">

### 会话，随处可用

**用手机配对** — 扫一次 QR（*使用 nodeterm iOS 应用*）— **同一 live 会话在口袋里继续**，经中继 **E2E 加密**。同一块画布也可自托管在任意浏览器（Server Edition）。

</td>
<td><img src="docs/assets/remote-tour.webp" alt="配对手机 — 扫 QR，iPhone 上的真实 Claude Code" /></td>
</tr>
<tr>
<td width="42%" valign="middle">

### 对终端说话

按住 `⌘⌥`，说完松开。设备端 **Whisper** 在本地转写并输入到终端提示符 — **由你** 按 Enter（不会自动提交）。语音不会离开本机。

</td>
<td><img src="docs/assets/dictation-tour.webp" alt="听写 — 按住 ⌘⌥ 说话，本地 Whisper 将文字输入提示符" /></td>
</tr>
</table>

### 节点类型

🖥 **终端**（xterm + tmux） · 🤖 **Agent**（Claude Code / Codex / Antigravity / Gemini / GitHub Copilot / opencode / Grok / Cursor / 自定义） · 📝 **便签** · 🗂 **分组**（可绑定 **git worktree**） · ✏️ **编辑器** · 🔀 **Diff** · 🌐 **网页 / 视频**

### 更多

- **会话连续性（tmux）** — 终端在节点重挂载与应用重启后仍运行；macOS 应用 **自带 tmux**。
- **Agent 增强** — 上下文链接、Claude 分支对话与托管账户、canvas-control CLI 驱动画布。
- **远程 / SSH 项目** — 在远程主机上打开项目，画布留在本地。
- **源代码管理** — 暂存/提交/push、worktree、`gh` 登录等。
- **看板上的 GitHub Issues** — 见 [`docs/github-issues-kanban.md`](./docs/github-issues-kanban.md)。
- **命令面板**（⌘K）、**文件资源管理器**（⌘⇧E）、**Markdown 视图**（⌘M）等。

### 🌍 Server Edition — 浏览器中的 nodeterm

在 Linux 或 macOS 主机上无头运行同一套画布，通过浏览器访问。快速开始：

```bash
npm run server:dev     # 构建并启动；打开 http://127.0.0.1:8443 并设置密码
```

详见 [`docs/SERVER.md`](./docs/SERVER.md)。

## 📦 下载

本 fork 的 **macOS / Windows** 安装包在 **[GitHub Releases](https://github.com/heronhuang/nodeterm/releases)** 发布（推送 `v*` 标签会触发 CI 构建，详见 [`docs/PACKAGING.md`](./docs/PACKAGING.md)）。

- **macOS** — Apple Silicon 与 Intel 的 `.dmg`（及 zip）。
- **Windows（x64，beta）** — `nodeterm-Setup-<version>.exe` 或便携 `-win.zip`。安装包目前 **未签名**（SmartScreen 可能提示）；更新以应用内提示为准。
- **iOS** — [App Store 上的 nodeterm mobile](https://apps.apple.com/app/nodeterm/id6790581233)。

试用后卸载可参考 [`docs/uninstall.md`](./docs/uninstall.md) 与上游 `scripts/uninstall.sh`。

## 🛠 从源码构建

需要 **Node.js 20+**（推荐与 `package.json` 中 `engines` 一致）。在 macOS 或 Linux 上开发时建议安装 **tmux**（会话连续性依赖它）。**Windows** 首次克隆请运行 `bootstrap-windows.bat`。

```bash
npm install        # 依赖 + 针对 Electron ABI 重建 node-pty（postinstall）
npm run dev        # 开发模式（渲染进程 HMR）
npm run build      # 生产构建到 out/
npm start          # 预览生产构建
npm run typecheck  # 类型检查
npm test           # Vitest 单元与集成测试
npm run dist       # macOS：本地未签名 .dmg（冒烟）
npm run dist:win   # Windows：未签名 NSIS + zip（须在 Windows 主机上执行）
npm run server:dev # 浏览器 Server Edition
```

**打包说明：** 本 fork 的 electron-builder 目标仅为 **macOS 与 Windows**，无 Linux 安装包脚本。命令与 CI 细节见 [`docs/PACKAGING.md`](./docs/PACKAGING.md)。

## ⌨️ 键盘快捷键

以下为默认值，可在 **设置 → 键盘快捷键** 中修改。

| 快捷键 | 作用 |
| --- | --- |
| `⌘K` | 命令面板 |
| `⌘T` / `⌘⇧C` | 新建终端 / 新建 Claude Code |
| `⌘⇧B` | 切换看板 |
| `⌘W` | 关闭选中节点 |
| `⌘Z` / `⌘⇧Z` | 撤销 / 重做 |
| `⌘M` | Markdown 视图 |
| 按住 `⌘⌥`（Windows 为 `Ctrl+Alt`） | 听写输入到终端 |
| `⌘⇧E` | 文件资源管理器 |
| `⌘,` | 设置 |

## 🏗 架构

- **Electron 三进程** — `src/main`、`src/preload`（`window.nodeTerminal`）、`src/renderer`（React）；`src/shared` 共享类型与 IPC 通道名。
- **`CorePlatform` 接缝** — 业务在 `src/core`，不直接 import `electron`；桌面与 Server Edition（`src/server`）共用同一核心。
- **`TerminalTransport`** — 渲染层只依赖传输抽象，本地与远程（SSH）可切换而不改画布 UI。
- **React Flow** 为 live 节点唯一真相来源；磁盘持久化 + tmux 保证重启后会话仍在。

更多设计说明见 [`docs/`](./docs/) 与 [`CLAUDE.md`](./CLAUDE.md)。

## 🤝 参与贡献

请先阅读 **[CONTRIBUTING.md](./CONTRIBUTING.md)**。深度约定见 [CLAUDE.md](./CLAUDE.md)。

贡献遵循 **[BUSL-1.1](./LICENSE)**（四年后对应版本转为 MIT，详见许可证全文）。

## 📜 许可证

**[BUSL-1.1](./LICENSE)**：可在附加使用授权范围内用于生产，但不得移除/绕过授权与用量限制检查，亦不得以竞争方式提供托管或独立产品。 bundled 组件见 [`THIRD-PARTY-NOTICES.md`](./THIRD-PARTY-NOTICES.md)。

> 「Claude」「Claude Code」为 Anthropic 商标；「Trello」为 Atlassian 商标；nodeterm 与上述公司无隶属关系。
