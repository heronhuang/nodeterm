> English: [docs/en/troubleshooting-codex-snap.md](./en/troubleshooting-codex-snap.md)

# Codex 代理状态不工作（RUNNING/NEEDS-YOU 从不亮起）

**现象。** Codex 会话在画布或手机上没有实时状态——没有「RUNNING」徽章、没有行走宠物、没有 NEEDS-YOU、没有完成通知。同一主机上的 Claude 和 Gemini 正常，Codex 在**本地**桌面会话中也正常。仅在 Codex 以 **snap** 安装的主机上失败（Ubuntu 的 `snap install codex`，`/snap/bin/codex`）。

**根因——snap confinement，不是 nodeterm 的 bug。** nodeterm 会正确安装 Codex 托管 hook：`~/.codex/hooks.json`（六个事件 → 托管的 `codex.sh`）以及 `~/.codex/config.toml` 中匹配的 `[hooks.state."…"] trusted_hash = "sha256:…"` 信任项。现场已验证：文件存在、脚本可执行、信任哈希匹配。但 Codex 的 **snap** 构建从不读取它们，原因叠加：

1. **`$HOME` / `CODEX_HOME` 重映射。** snap 运行时 `HOME`（因此 `CODEX_HOME`）指向其沙箱目录——例如 `/root/snap/codex/<rev>/`——因此 snap Codex 在 `~/snap/codex/<rev>/.codex/` 找配置，**而不是** nodeterm（及其他工具）写入的标准 `~/.codex/`。
2. **执行 confinement。** hook 命令会运行 `~/.nodeterm/agent-hooks/codex.sh`；snap 的 AppArmor 不允许沙箱外路径，hook 链在结构上不可达。

## 修复——在 snap confinement 外安装 Codex

```sh
snap remove codex
npm i -g @openai/codex
codex login
```

确保 `command -v codex` 指向 npm 安装（≥ 0.145）。重连 SSH 项目或重启 headless Server Edition，打开新 Codex 节点验证状态。
