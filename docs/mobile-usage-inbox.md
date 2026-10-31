> English: [docs/en/mobile-usage-inbox.md](./en/mobile-usage-inbox.md)

# 移动用户和收件箱——协议合同(v1)

iOS 同伴的Inbox 工作表有两个标签—— ** Agents ** (inbox feed) 和 ** U体现了 ——
被设计为空所作的承诺 这个医生是激活他们的所作的承诺
在** 现有代理状态镜像文件中,每样东西都载着**(`agent-status.json`页:1`agent-status-<projectId>.json`)——没有新文件,沒有新運輸: 手機已經分批讀
这些通过SSH(在中继器上得到同样的blob)`projects.list`(原始内容存档于2018-09-26). RPC.

□ 运输回顾

- 桌面/服务器写入`<userData>/agent-status.json`(原子,0600,300毫秒脱落) -`src/core/agent-status-mirror.ts`。 。 。 。
- 对于相连的SSH项目,`src/main/remote-ssh/remote-status-push.ts`推动每个项目
切片为`~/.nodeterm/agent-status-<projectId>.json`在主机上(2节油门,60节心跳)
- iOS的民调,每8秒一次`AgentStatusMonitor`→`NodetermProjects.swift`) (中文(简体) ).

`MirrorFile.v`留下来`1`——所有添加都是可选字段;老读者忽略了.

□ 镜像文件

```ts
export interface MirrorFile {
  v: 1
  updatedAt: number
  nodes: Record<string, MirrorEntry>
  settings?: MirrorSettings
  usage?: MirrorUsage          // NEW — local accounts' provider rate-limit usage
  inbox?: MirrorInbox          // NEW — event feed + per-node live activity
}
```

使用量

```ts
export interface MirrorUsage {
  updatedAt: number
  accounts: MirrorUsageAccount[]   // system account first, then managed local accounts
}
export interface MirrorUsageAccount {
  accountId: string | null         // null = system ~/.claude
  label: string | null             // account label from settings (managed accounts)
  email: string | null
  agentId: string                  // 'claude' (codex later — same shape)
  status: string                   // 'ok' | 'unavailable' | 'error' | 'fetching'
  updatedAt: number
  limits: MirrorUsageLimit[]       // pass-through of shared UsageLimit — do NOT re-derive
}
// Snapshot of shared UsageLimit, tolerated loose: another branch is generalizing it
// (severity may be string|null, windowMinutes may appear). The mirror passes entries through
// verbatim; readers must treat every field but kind/usedPercent as optional.
export interface MirrorUsageLimit {
  kind: string                     // 'session' | 'weekly_all' | 'weekly_scoped' | future
  group?: string | null            // 'session' | 'weekly'
  usedPercent: number              // 0–100 consumed
  severity?: string | null         // null ⇒ derive colour from percentage locally
  resetsAt?: number | null         // unix ms
  windowMinutes?: number | null    // real window length when the provider reports it
  scopeLabel?: string | null       // per-model scoped limit's model name
  isActive?: boolean
}
```

规则:
- 来源是:`src/core/usage/usage-service.ts`缓存。 服务现在主动投票 **
* 当地账户**(系统账户和未用当地管理账户),现有15分钟账户,
不仅仅是系统账户,而是在每个缓存更新上通知镜像.
-** SSH切片没有`usage`** 在v1中(`filterMirrorForNodes`掉下来,像`settings`:
一个远程主机的账户证书正在该主机上直播衲子,所以桌面无法回答它们.
一个运行节点本身(服务器版)的主机会用自己的用法写出自己的镜像.
- 排除远程账户(规则与桌面使用指标相同)。

输入

```ts
export interface MirrorInbox {
  events: InboxEvent[]                       // oldest→newest, capped at EVENTS_CAP (50)
  nodes: Record<string, InboxNodeNow>        // per-node "what it's doing right now"
}
export interface InboxEvent {
  id: string            // monotonic per writer, e.g. `${ts}-${seq}`
  ts: number            // unix ms
  nodeId: string
  agentId?: string
  sessionId?: string
  kind: 'approval' | 'question' | 'done'
  title: string         // first line, ≤120 chars — "Approve write to /etc/hosts", "Finished"
  detail?: string       // ≤240 chars — lastMessage snippet
  interrupted?: boolean // done: user hit Esc/Ctrl-C
  resolved?: boolean    // approval/question: the node has since left blocked/waiting
}
export interface InboxNodeNow {
  activity?: string     // ≤80 chars — "Editing foo.ts", "Running npm test", "Reading bar.ts"
  tool?: string         // raw tool name the activity came from
  contextPercent?: number // context-window fill 0–100 (from context-tail), when known
  updatedAt: number
}
```

活动制作(全部在内/外)`agent-status-mirror.ts`由听众喂养的贝壳
已接线 :

- 正常化`state:'blocked'`→`approval`事件(标题=`lastMessage`,则
"需要审批").`state:'waiting'`→`question`活动。 Dedup:如果节点是最新的
未解决的核准/问题的标题相同,没有任何问题——不附加重复。
- 正常化`state:'done'`→`done`事件为`detail`=`lastMessage`片断和`interrupted`路过 之后完成的`interrupted`Esc垃圾邮件应该还是一个
每个转弯的事件(  我们现在已经崩溃了 ) 。
- 当一个节点离开被阻断/等待(任何新的状态事件)时,标记它尚未解决
核准/问题事项`resolved: true`(他们移动到手机的存档).
- 节点清除(`dropNode`删除其`nodes`条目; 事件保留( 历史资料) 但获取`resolved: true`。 。 。
- ** 活动**来自RAW钩听器(`setRawListener`已经看到`tool_name`页:1`tool_input`:`Edit|Write|NotebookEdit → "Editing <basename>"`,(提供便利)`Read → "Reading <basename>"`,(提供便利)`Bash → "Running <command ≤60ch>"`,(提供便利)`Grep|Glob → "Searching <pattern>"`,(提供便利)`Task → "Delegating: <description>"`,(提供便利)`WebFetch|WebSearch → "Fetching <host|query>"`,则`"Using <tool>"`。清除了 Stop/done/会话结束。
- ** 弹壳广播时记录的文字`IPC.contextUpdate`(两者)`src/main/index.ts`和`src/server/agent-status.ts` `wireAgentStatus`) (中文(简体) ).
- SSH切片(`filterMirrorForNodes`保留`inbox`但过滤器`events`和`nodes`页:1
工程的节点标识 。

□ iOS 行为 (v1)

- ** 用户标签**:每对连接一节,报告`usage`(标题:主机名称+)
相对`updatedAt`) (中文(简体) ). 每个账户:标签/电子邮件、每个限制栏-会话窗口和每周
窗口(下面列出范围限制)。 右边:`usedPercent`+ 重设倒计时
(单位:千美元)`<24h → "16:40"`时钟时间,否则`"3d 16h"`) (中文(简体) ). 颜色: 存在时的重度, 其他来源
(≥90红,≥70琥珀,另作绿). 派斯行: 比较`usedPercent`超过
窗口 (`windowMinutes`其他300/10080按种类计算) →"在联合国主持下,使用速度慢/快".
- ** 代理标签(feed)**:跨连接合并事件,最先更新;未解决
上面是批准/问卡,`done`/溶于**Archived**(可缩合)。 卡片显示
节点`contextPercent`当确实是已知时,工作节点的活动线,代理芯片+
相对时间。 工作会议`activity`字符串渲染为活牌, 即使没有
事件还没有结束。
- 快速批准(仅声明,v1)**:批准卡`agentId == 'claude'`有助于实现
** 证明** / ** Deny ** 按钮: 批准发送单键`1`,拒绝发送`Escape`,改为
节点 tmux 会话( T)`nt-<nodeId>`书面材料
(单位:千美元)`tmux send-keys`在主机节点套接字上)。 发送前, 重新读取状态文件和
只当节点还在时发送`blocked`;否则显示"已处理". 非克劳德
核准时间可追溯到**开幕会议**。
- 读/不读+存档状态为电话本地化(按设计);`resolved`只从主机
从可操作列表中移出牌。
- 现场活动/动态岛/APNs:** 超出v1的范围**(仍然"即将到来").
