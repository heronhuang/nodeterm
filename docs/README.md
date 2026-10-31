> English: documentation mirrors live under [`docs/en/`](./en/) (same filenames).

# nodeterm 文档

nodeterm 文档以**简体中文**为主（本目录 `docs/*.md`）。下表列出主题文档与一句话说明；需要英文请点「EN」列。

## 入门与运维

| 文档 | 说明 | EN |
|------|------|-----|
| [PACKAGING.md](./PACKAGING.md) | macOS / Windows 桌面打包、签名与 CI 发布（Linux 无官方安装包） | [en](./en/PACKAGING.md) |
| [SERVER.md](./SERVER.md) | Server Edition：浏览器画布、认证、headless 通知主机 | [en](./en/SERVER.md) |
| [uninstall.md](./uninstall.md) | 卸载清单、`scripts/uninstall.sh` 与便携安装可行性 | [en](./en/uninstall.md) |
| [DOCUMENTATION-LANGUAGES.md](./DOCUMENTATION-LANGUAGES.md) | 中英文文档路径策略 | [en](./en/DOCUMENTATION-LANGUAGES.md) |
| [release-notes/README.md](./release-notes/README.md) | 版本说明索引（正文在 `docs/en/release-notes/`） | [en](./en/release-notes/README.md) |

## 平台与会话

| 文档 | 说明 | EN |
|------|------|-----|
| [windows-session-host.md](./windows-session-host.md) | Windows 无 tmux 时的 session host、ConPTY、更新准备 | [en](./en/windows-session-host.md) |
| [session-backends.md](./session-backends.md) | Zellij / herdr 与 tmux 并列的后端测量与 v1 行为 | [en](./en/session-backends.md) |
| [session-memory.md](./session-memory.md) | 会话内存面板与 RAM pill | [en](./en/session-memory.md) |
| [remote-sessions.md](./remote-sessions.md) | 远程工作区会话（团队 relay，Stage 4） | [en](./en/remote-sessions.md) |
| [hosted-team-relay.md](./hosted-team-relay.md) | 托管 Server Edition 作 relay 主机 | [en](./en/hosted-team-relay.md) |
| [team-presence.md](./team-presence.md) | 团队在线状态设计 | [en](./en/team-presence.md) |
| [ios-protocol-migration.md](./ios-protocol-migration.md) | iOS 伴侣 relay 协议迁移（Stage 4/4c） | [en](./en/ios-protocol-migration.md) |

## 代理（Agent）集成

| 文档 | 说明 | EN |
|------|------|-----|
| [agent-integration-consent.md](./agent-integration-consent.md) | 代理集成同意模型与 skills 安装位置 | [en](./en/agent-integration-consent.md) |
| [cursor-agent.md](./cursor-agent.md) | Cursor Agent CLI | [en](./en/cursor-agent.md) |
| [copilot-agent.md](./copilot-agent.md) | GitHub Copilot CLI | [en](./en/copilot-agent.md) |
| [gemini-agent.md](./gemini-agent.md) | Gemini CLI | [en](./en/gemini-agent.md) |
| [grok-agent.md](./grok-agent.md) | Grok CLI | [en](./en/grok-agent.md) |
| [antigravity-agent.md](./antigravity-agent.md) | Antigravity (`agy`) | [en](./en/antigravity-agent.md) |
| [codex-shared-identity.md](./codex-shared-identity.md) | Codex 共享身份与 `--no-daemon` | [en](./en/codex-shared-identity.md) |
| [shared-codex-node-identity.md](./shared-codex-node-identity.md) | 账户作用域 Codex 节点身份 | [en](./en/shared-codex-node-identity.md) |
| [codex-accounts-acceptance.md](./codex-accounts-acceptance.md) | S6 托管 Codex 账户验收门 | [en](./en/codex-accounts-acceptance.md) |
| [codex-ssh-metrics.md](./codex-ssh-metrics.md) | SSH 项目上的 Codex 用量与上下文 | [en](./en/codex-ssh-metrics.md) |
| [troubleshooting-codex-snap.md](./troubleshooting-codex-snap.md) | Codex snap 导致状态 hook 失效 | [en](./en/troubleshooting-codex-snap.md) |
| [ssh-agent-skills.md](./ssh-agent-skills.md) | SSH 项目中的 nodeterm skills | [en](./en/ssh-agent-skills.md) |
| [node-identity.md](./node-identity.md) | 每节点 hook 身份 | [en](./en/node-identity.md) |

## 画布功能

| 文档 | 说明 | EN |
|------|------|-----|
| [trigger-node.md](./trigger-node.md) | 触发器节点（#493） | [en](./en/trigger-node.md) |
| [whiteboard-node.md](./whiteboard-node.md) | 白板节点（Excalidraw） | [en](./en/whiteboard-node.md) |
| [live-links.md](./live-links.md) | Live links（Pro 浏览器链到终端） | [en](./en/live-links.md) |
| [github-issues-kanban.md](./github-issues-kanban.md) | 看板 GitHub Issues | [en](./en/github-issues-kanban.md) |
| [project-limit.md](./project-limit.md) | 免费层 open-project 限制 | [en](./en/project-limit.md) |

## 审批、Hook 与 UI

| 文档 | 说明 | EN |
|------|------|-----|
| [hook-reply-approvals.md](./hook-reply-approvals.md) | Hook 回复式 Approve/Deny | [en](./en/hook-reply-approvals.md) |
| [agent-messaging-idle-session-boundary-fix.md](./agent-messaging-idle-session-boundary-fix.md) | 代理消息与 idle 会话边界 | [en](./en/agent-messaging-idle-session-boundary-fix.md) |
| [mascot-sprites.md](./mascot-sprites.md) | 行走代理 mascot 精灵规范 | [en](./en/mascot-sprites.md) |
| [notch-hud.md](./notch-hud.md) | macOS Notch HUD | [en](./en/notch-hud.md) |

## 移动伴侣

| 文档 | 说明 | EN |
|------|------|-----|
| [mobile-usage-inbox.md](./mobile-usage-inbox.md) | Usages & Inbox 镜像协议 | [en](./en/mobile-usage-inbox.md) |
| [mobile-chat-view.md](./mobile-chat-view.md) | 移动 Chat 视图设计 | [en](./en/mobile-chat-view.md) |

## 基础设施

| 文档 | 说明 | EN |
|------|------|-----|
| [atomic-writes.md](./atomic-writes.md) | 原子写入与 Windows `renameAtomic` | [en](./en/atomic-writes.md) |

## 仓库根目录

| 文档 | 说明 |
|------|------|
| [../README.md](../README.md) | 项目介绍（中文） / [README.en.md](../README.en.md) |
| [../CONTRIBUTING.md](../CONTRIBUTING.md) | 贡献指南（中文） / [CONTRIBUTING.en.md](../CONTRIBUTING.en.md) |
| [../CLAUDE.md](../CLAUDE.md) | AI 协作导向（中文） / [CLAUDE.en.md](../CLAUDE.en.md) |
