> English: [docs/en/trigger-node.md](./en/trigger-node.md)

# 触发器节点（issue #493）

**触发器**是按计划在连接的终端/代理节点上投递 payload 的画布节点。定义在 `.nodeterm/project.json`（git 共享，加载时经 `sanitizeNodeTriggers` 消毒）；**开火同意**在 `core/trigger-arm-store.ts`（机器本地、内容绑定）。

- git 拉取的触发器默认 **disarmed**，直到本机 arm。
- 编辑 spec 后已 arm 的触发器变为 **CHANGED**，不在旧同意下运行新内容。

`startTriggerService` 在桌面与 Server Edition 相同启动：30 s scheduler（无 catch-up）、delivery 经 `sendText` paste、agent 目标仅在 mirror idle `done` 时投递。

**界面：** 桌面与 SE 完整支持；relay 标签拒绝 arm（主机侧 consent）；移动无画布。应用关闭时不 fire（host-alive v1）。
