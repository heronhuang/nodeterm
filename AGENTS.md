# Repository Guidelines

## 项目结构与模块边界

nodeterm 是基于 Electron、React 和 TypeScript 的画布式终端管理器，同时提供 Server Edition。

- `src/core/`：共享服务逻辑，通过 `CorePlatform` 对接宿主；禁止导入 Electron 或 `src/main/`。
- `src/main/`、`src/server/`：分别提供桌面端与服务器端宿主。
- `src/preload/`：暴露 `window.nodeTerminal`；`src/renderer/` 的 React UI 通过此接口访问服务。
- `src/shared/`：公共类型、IPC 协议与纯函数；`src/session-host/`：独立终端会话宿主。
- 测试就近放置，跨层测试位于 `test/`；脚本在 `scripts/`，资源在 `resources/`、`build/`，文档在 `docs/`。

## 构建、测试与本地开发

使用符合 `package.json` engines 的 Node.js 版本。Windows 首次安装运行 `bootstrap-windows.bat`，检查 Visual Studio C++ 工具链；其他平台运行 `npm install`。

- `npm run dev`：启动桌面开发模式，启用界面热更新。
- `npm run server:dev`：构建并启动浏览器版服务。
- `npm run typecheck`：检查 Node 与 Web 两套 TypeScript 项目。
- `npm test`：运行 Vitest 单元与集成测试。
- `npm run build`：生成 `out/` 生产构建，包含会话宿主和 Codex relay。
- `npm run dist:win`：生成 Windows x64 安装包及 ZIP。
- `npm run rebuild`：重新应用原生依赖补丁并按 Electron ABI 编译。

## 代码风格与命名

遵循邻近代码：两空格缩进、单引号、通常省略分号；函数和变量用 camelCase，类型及 React 组件用 PascalCase，工具模块通常用 kebab-case。当前未配置统一 ESLint/Prettier 命令，避免无关格式化。

遵守 `.gitattributes`：常规文本使用 LF，Windows 脚本使用 CRLF。新增界面文案同时维护 `src/shared/locales/zh.ts` 与 `en.ts`。新增服务逻辑放入 core，确保桌面端和服务器端均可调用。

## 测试要求

使用 Vitest，命名为 `*.test.ts` 或 `*.test.tsx`；组件测试按需启用 jsdom。定向运行示例：`npx vitest run src/shared/clone-url.test.ts`。

修复应覆盖触发条件和回归场景。沿用 `test/setup/` 的隔离机制，不接触真实用户配置或活跃 tmux 会话。当前未配置覆盖率百分比门槛；提交前运行类型检查、相关测试及生产构建，并明确平台跳过项与未验证行为。

## 提交与 Pull Request

从 `main` 创建分支。近期提交常用 `fix(ci): ...`、`fix(release): ...`、`chore(release): ...`，建议使用同样的类型与范围格式。

PR 开头说明问题、变更结果及原因，关联相关 issue，列出验证结果和限制；界面变更附截图，性能变更附测量数据。确保适用 CI 检查通过。修改前阅读 `CONTRIBUTING.md`，涉及子系统约束时查阅 `CLAUDE.md`；改变协作规则时同步更新两份文档。
