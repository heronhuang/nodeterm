> English: [docs/en/github-issues-kanban.md](./en/github-issues-kanban.md)

# 看板上的 GitHub Issues

nodeterm 可在 live 会话卡片旁显示 GitHub issues，并在移动看板卡片时与 issue 状态同步。GitHub 仍是唯一真相源。

## 设置

1. 打开项目并创建看板（若尚无）。
2. 设置 → 工作区 → GitHub Issues → 开启 Include GitHub issues。
3. 确认 Git origin 仓库或输入 `owner/repository`。
4. 选择认证方式，映射列到 GitHub 标签，选择完成列，批准本机访问，按需创建标签并刷新。

仓库覆盖与标签映射在 `.nodeterm/project.json`；凭证与本机批准为本地项。

## 认证

Auto 优先 `gh`，否则保存的 token。Fine-grained token 需 Metadata read、Issues read/write。Server Edition 用本地 `0600` 文件存 token。

## 映射与移动

每列一个确切标签；完成列关闭 issue；移出完成列会重新打开。移动仅改标签立即生效；关闭/重新打开需确认。Pull request 排除。

## 刷新与缓存

可见时每 60 s 轮询；请求刷新至少间隔 30 s。缓存目录 `github-issues-cache`。Relay 标签的 GitHub 操作在主机本地执行。

## 当前范围

读 issue、过滤、分页、标签创建、移动、关闭/重新打开、刷新与缓存。标题/正文编辑等在后续 issue 编辑器中。
