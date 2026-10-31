> English: [docs/en/mobile-chat-view.md](./en/mobile-chat-view.md)

# 移动聊天视图——设计(2026-09-27).

将桌面 QQM 聊天视图 (# 943 QX957) 带到 * nodeterm 移动 * ()`nodeterm-ios`),与克劳德机动车
感觉:作为马克下调、作曲家、现场“工作”指标和计划提供的会话记录
回答代理提示的问卡——超过****运输(直接SSH和E2EE)
中继器,在一次交货。

^ 1. 背景(计量,2026-09-27).

- **iOS今天**(`nodeterm-ios`来源/主 43bcf5c : 无标记, 也没有在任何地方查看记录; a
会话仅作为 Swift 终端打开( S)`Features/Session/SessionView.swift`克劳德风格
作曲家已经存在( R)`Terminal/DictationComposer.swift`跛脚 :`+`通过 PhotosPicker/文件导入器附加,
麦克风通过`Services/SpeechDictation.swift`+Whiper/Parakeet/Apple引擎,QQ发送). SPM 道具 :
Swift Term, Citadel, Sodium, WhisperKit, FluidAudio. 互联网档案馆的存檔,存档日期2014-07-02.
- ** 运输**:`SSHTransport`(学院)与`Services/HostCommands.swift`(单位:千美元)`run`页:1`stream`,重复使用
session)——执行,文件读取,tmux发送密钥,SFTP上传到`~/.nodeterm/uploads/`回复文件
写作。`RelayTransport`(E2EE Na昼夜)调用由桌面服务的固定 RPC 集`src/main/remote/host-service.ts` `onRpc`(pty.*,fs.* 被囚禁在共同的根,git.*,项目。*,
节点 你也一样。 ** 马上没有记录、聊天或许可回答。 ** 服务器版 你也无转发
主机服务(仅供电话使用).
- ** 电话状况**:代理状态镜`core/agent-status-mirror.ts`→`agent-status.json`/ 每个SSH项目`~/.nodeterm/agent-status-<projectId>.json`),在SSH上每4次投票.
(单位:千美元)`Services/AgentStatusMonitor.swift`),中继`projects.list`每30个局外网,加上APN/Live
活动。 镜像载有状态/会话Id/账户/隐藏和收件箱事件;** 无记录
路径,没有`held`(计划与问题),无模式/努力**.
- ** 今天核准**`Services/InboxApproval.swift`: 允许/拒绝通过普通字答案文件
(单位:千美元)`~/.nodeterm/pending/<id>.answer`当一个社会性别主流化存在时,则 tmux 发送密钥(数字/Escape/Enter).
没有结构化的答案(计划模式/修改/问答/自由文本);只有SSH.
- ** 建立现实**: 无法在此 Linux 服务器上编译 SwiftUI; 一个 Linux Swift 6.1.2 工具链
(单位:千美元)`/root/.cache/swift/swift-6.1.2-RELEASE-ubuntu24.04`编译和测试**纯逻辑**在划痕中
SwiftPM 牵引装置. iOS CI (英语:`.github/workflows/ios-build.yml`),自2026-09-14起开始收账.
- ** 可重复使用的桌面核心**:`core/transcript-reader.ts`(无)`parseChatWindow`,页`ChatTranscriptResult`与`olderCursor`页:1`key`页:1`unmatchedResults`页:1`at`,增长 - 不完成线,`core/chat-tool-body.ts`(计划/问题机构),`core/remote-ssh/transcript-window.ts`(单位:千美元)`transcriptPageCommand`(原始内容存档于2018-09-21). POSIX sh,
一次往返,大小在同一答复中);`core/remote-transcript-locate.ts`,有望实现。`core/agents/permission-decision.ts`(单位:千美元)`buildPermissionDecision`,`answerHeldPermission`页:1
门,`transcript-ipc.ts` `readChatPage`。 。 。

□ 2. 决定:一种电线格式,两种制作人

拒绝:(2) 两种运输方式的电话(接载原JSONL;仍然需要桌面答案RPC;
TS 解析器必须保留用于桌面%%M, 所以漂移风险只是移动); (3) 主机侧助手解析器
为SSH(POSIX sh不能剖析JSON;节也应在主机上得到保证——克劳德船作为独立围绕着.
二进制).

选择:电话总是消耗同样的东西 **`ChatPage`页:1 桌面制作用于中继
(不改变使用核心核心;使用不变的再使用核心); 光子手机在SSH主机上自行生产。
因此,SSH工作时没有桌面运行. ** TS 执行产生的黄金固定装置**
Swift 端口为字节- 相同输出 。

□ 3. 数据和运输

页:1 线条格式

```
ChatPage {
  version: 1
  messages: ChatMessage[]        // desktop shape: role, parts (text | thinking | tool{name,arg,result,
                                 //   summary,body,questions,id}), key (byte offset), at (ms)
  found: boolean
  olderCursor: number | null
  unmatchedResults: {id, result}[]
  model?: string                 // from the latest assistant record
  effort?: string                // from the latest assistant record (`effort` field)
  sessionId?: string             // the session id the host READ this page with; absent = none resolved
}
ChatStatus {
  version: 1
  state: 'working' | 'waiting' | 'blocked' | 'done' | null   // the desktop WINDOW's hook state; null = unknown
  held: {pendingId, toolName, questions?} | null
  hibernated, paused, dropped, sessionEnded: boolean
  structuredAnswers: boolean     // held ticket accepts structured answers (else "answer in the terminal")
  hostRefuses: boolean           // the HOST's agent-status mirror refuses sends right now
  refusal?: 'working' | 'dialog' // why, when hostRefuses
}
ChatSendOutcome {                // chat.send reply body
  result: 'sent' | 'refused' | 'pasted-not-submitted' | 'unconfirmed'
  reason?: 'working' | 'dialog' | 'asleep' | 'paused' | 'dropped' | 'exited'
         | 'busy' | 'late' | 'unavailable' | 'failed'        // only with 'refused'
}
```

`version`让电话诚实地拒绝更新形状: a`ChatPage`或`ChatStatus`谁`version`它不知道没有被证明/当作**锁**。 ** composer rule:** 仅在`hostRefuses`是虚假的,`held`54. 无效且`state`这是`done`或`null`;任何其他价值——包括a`state`字符串无法识别——已锁定 。`hostRefuses`存在是因为在桌面之后
重新启动窗口时什么也不知道( E)`state: null`虽然主机镜像仍然可以保持一个现场对话,
和`chat.send`被拒绝的被拒绝;被拒绝的被拒绝。 目标
无论手机显示什么,桌面都会重新输入每个发送。 一个未知`reason`显示值
作为通用的"没有发送".

3.2 中继制片人(桌面,此中继)——已实施

四个动词在`host-service.ts` `onRpc`(单位:千美元)`handleChat`),仅服务于**核定电话**
届会的审批门在批准之前拒绝每个区域规划会议)。 他们无法从团队进入
中继嘉宾 :`relay-host.ts`完全没有电话方言服务(其`onRpc`这是惰性的,所以
项目范围监禁`relay-project-scope.ts`永远看不到它们,它们什么也看不见 电话
只发送**`nodeId`** (加上呼/文本/答有效载荷)——cwd,账号,代理,会话编号,
记录路径和远程路由从桌面自身注册处解决主机侧
(单位:千美元)`WorkspaceStore.getNodeResolved`+ 代理状态镜;节点ID是攻击者可控制的,所以
电话提供路径永远不会被信任。 操作 :`main/remote/host-chat.ts`(单位:千美元)`createHostChat`线
基本情况`hostBridge.chat`输入`main/index.ts`,由两个电话主机转发).

动词 ============
|,|也.
|`chat.page`|`{nodeId, before?, maxBytes?}`|`{page: ChatPage}`只针对有聊天视图的代理商——`canChat(capabilityAgentId(agent))`(claude、gẳng、Gemini、codex、副驾驶、开码、光标(its SQLite聊天店,`src/core/cursor-chat.ts`海关代理商的底盘就是其中之一 代码由自己的读者读取`src/core/codex-chat.ts`本地和SSH主机上的固定装置和记录规则`src/shared/chat-fixtures/codex/`),其他任何内容在读完之前都会被拒绝.`readChatTranscript`带有 QQM 面板本身的隔页( paged ALWAYS —— 缺页是默认的 256 KB 尾巴; grok 未页) +`model`页:1`effort`, (中文).`version: 1`.会话 id: RENDERER的代理状态 id 首先是(XQM读到的——在桌面重启一个钩形的id只存在在那里之后),然后是镜像,然后是节点的薄荷 id;只有当渲染器在 3 秒 内不回答或者不知道什么时才适用倒数. ** 远程(SSH-Project)节点改为REMOTE-ONLY**(`remoteOnly`:在现场pty's Control所订主机上,否则节点的PROJECT主机(一个闲置的制表符/在可能的情况下重启后的任何节点都没有pty),而从此机器的磁盘上从一声不响——一个没有可达到主机的远程节点,或者一个没有回答 假如一个主机是`Could not read the transcript.`,而不是空页。 主机侧位置为TRI-STAE(`locateRemoteTranscriptRef`, (中文).`src/main/remote-transcript-page.ts`: CLEAN MISS(主机已查找且没有此类文件,或没有 一切都无法查找)`found:false`,并且只有不问(没有主人,没有解决的家,一个失败的ssh,一个监狱以外的路径,一个失败的范围读)才是错误. 对于REMOTE节点,桌面QQM面板遵循相同的 你说什么只有远程规则和相同的缺省-vs-不可读拆分(相同deps):它的IPC处理器决定远离 shell 自己的记录(`isRemoteNode`远程直播或`workspaceStore.sshProjectIdForNode`,从不刻 我没有刻画`remoteOnly`到已读页、未读页、查找栏索引和存在探测器(`unknown`它显示`unreadable`作为"Couldn't read the text."(一个远程的grok节点也在其主机上读到)——`core/remote-grok-chat.ts`,完整文件且未打印,同样缺字的Vs-不可读拆分;一个没有远程阅读器的代理的远程节点——`CHAT_LOCAL_ONLY`——作为"尚未支持"). QQM上的LOCAL节点没有改变——渲染器仍然发送cwd,因此 她在其中仍然适用claude的cwd回落;下面的cwd-只当-远程规则是电话路径的. cwd只搭乘一个有已知的ID的远程节点(主机方位点需要它);当地一个已知的但已死亡的ID不得掉回cwd最新记录(另一个节点的),完全没有ID QQ.`found:false`。 。 。`found:false`因此,总是意味着"看, 没有记录 非。" 答复是`page.sessionId`电话应该放在镜子上。`sessionId`作为页面的线程身份——镜像滞后——每4秒在SSH上,最高为~30秒在中继(.`projects.list`——所以紧接着`/clear`或恢复它 仍然命名旧会话, 而页面已经来自新的记录, 并合并 byte`key`穿过两条线`sessionId`显示于`found:false`页面(一个ID已经解决,它的记录稿已经丢失——例如一个尚未写出的新会话):这样一个页面上的新编号可为不确认的线程开关,所以电话不能清除上面的线程. 添加字段 :`version`stay 1, 一个较旧的桌面只略去它( 倒回镜像) 。 @ @ @ info
|`chat.status`|`{nodeId}`|`{status: ChatStatus}`• 制造器的代理状态条目(`state`无效=未知,`held`,休眠/休眠/投放/会话结束)+`structuredAnswers`= 持有的票在主机结构化-台式机分类账(script Review 5) + 主机镜的`hostRefuses`页:1`refusal`+ 键`version: 1`与`{nodeId, catalog: true}`(一) 向中,在对中,对对中,对中,对中,对中,对中,对中,对中,对中,对这一中中,对中,对中,对中,对中,对中,对中,对中,对中中,对中,对中,对中,对中中,对中,对中,对中, 是我中,对中,对中,对中,对中,对中中,对中,对中,对中,对中,对中中,对问题中,对中,对中,对中,对中,对中,对中,对中,对问题,对问题,对问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题,uang问题问题进行了问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题摇滚问题问题`true`; 选入,所以一个更老的电话看到旧形状) 状态也携带`catalog: ChatCatalog`(单位:千美元)`src/shared/chat-catalog.ts`)——作曲家的作曲家.`/`节点列表:测量的内置,自定义命令和技能,在节点主机上读取一个SSH节点. 当主机无法构建时缺席(从不出现状态错误). 姓名通过`catalogName`,描述为一行消毒;将其变成文本。`partial: true`= 无法读取根 。 主机最多等待4秒(一个SSH节点的目录是ssh的回程),然后回答没有它——所以客户端问与.`catalog: true`每张作曲家的ONCE开张(并且仅在一段时间后用户打开菜单时再次开张),从未在每张状态民意调查中出现过. 一个条目`interactive: true`是一个内置, 在代理的 TUI 中打开对话框 : 发送后无法显示终端的客户端不能提供( 对话框是隐形的, 下一个发送将回答它) 。 在节点移动中采用它是一个iOS的跟踪。
|`chat.send`|`{nodeId, text}`|`ChatSendOutcome`=`{result, reason?}`QQ 文本封顶为 64000 UTF-16 单位 RAW, 然后 ESC + C0/C1 剥离(`\n`, (中文).`\t`保留;`sanitizeChatText`; 被拒绝 FIRST (`reason` `working`页:1`dialog`当主机的镜像显示代理正在工作 / 等待 / 屏蔽或持有问票或批准票( 重新装入后状态是短暂的); 被拒绝`busy`而另一个发送到同一个节点的信号仍在飞行中(在发送SETTLES之前一直保持,封顶在30秒);然后,渲染器在发送时间运行QQM作曲家的门( send).`chatSendRefusal`座谈会`agentProcessInPane`+ 状态 {done, 未知 } → 属于自己的类型`reason`)加“无要求”(`dialog`),则`pty.sendText`。 。 。`'sent'`仅用于`sendText === true`; 被拒绝的窗帘是`refused`页:1`failed`。 。 。 。
|`agent.answer`|`{nodeId, pendingId, answer}`|`{ok: boolean}`|`answerHeldPermission`与节点本身的 I/O( 本地 fs, 或 SSH 项目的 ControlMaster ) 相同`heldPermissionIoFor`桌面解答路径用途 : 根据待决请求文件验证, 结构化- ticket 闸门, 否`setMode auto`编辑`pendingId`必须是属于这个节点的——镜像的其中一张批准票,或者制造器的`held.pendingId`(计划/问题)——其他`{ok:false}`没有I/O和没有回答的事件。 成功释放出同样乐观的"解答"事件.

拒绝是`respond(id, false, {message})`,用这些精确的字符串:

等 等 时 刻 时 刻 时 时
|,|也.
|`<verb> is not served on this host.`QQ 桌面没有操作( 预配置, 或未连接上下文) QQ
|`Invalid node id.`|`nodeId`缺少 / 不是字符串 / 超过`REF_MAX_LEN`/ 包含 C0/ C1 控制字符QQ
|`Unknown node.`QQ 主机没有这样的节点(`chat.page`, (中文).`chat.status`, (中文).`chat.send`) (中文(简体) ).
|`Chat is not available for this agent.`|`chat.page`对于一个没有聊天视图的节点(codex, gemini, 普通终端, ...) QQ
|`Invalid page.`|`before`页:1`maxBytes`被拒绝`normalizeChatPage`(在读之前核对)
|`Could not read the transcript.`QQ 页面读取 FAILED : 一个没有回答的远程主机, 一个只能在主机无法到达的远程节点, 一个失败的重读—— 从不为它设置空页面 QQ
|`The desktop window is not available.`|`chat.status`: 渲染器没有在 3 s( 或没有窗口) 内回答 —— 从没有猜到的状态 QQ
|`Text too long.`|`chat.send`原始文本超过 64000 UTF-16 个单元 QQ
|`chat.send requires non-empty text.`剥离控制字符和空白空格后,什么都没有
|`Invalid pending id.`|`agent.answer` `pendingId`失败`isValidPendingId`我保证

失败规则 :`'refused'`表示** 无输入** — 无窗口(`unavailable`,镜子或
制造器门拒绝(这种门),另一个送来飞行(`busy`),或者渲染器收到查询
在其之后`startBy`(单位:千美元)`late`3 s; 延迟渲染器拒绝而不是打字).`'unconfirmed'`表示
** 桌面无法确认结果** : 发送的在 15 秒 以内未收到报告的信件统计数据,或`sendText`刚开始就恢复了 文字可能已经落地——**或可能没有打字.
完全不能拒绝(例如, 拒绝的拒绝) , 不得拒绝的拒绝, 不得拒绝的拒绝。
被拒绝的被拒绝被拒绝的被拒绝的被拒绝被拒绝的被拒绝被拒绝的被拒绝的被拒绝的被被拒绝的被的被被被被的被被被被被被被的被被被的被被被被的被侬的被被被被被被的被被被被被的被被被被被被被的被被被的被被被的被被被的被被被被被被被被的被的被被被被被被被的被的被被被被被的被被被被被的被被被被被团结起来的被被被的被被被的被被被被被的被被被的被被被的被被被被被的被被被的被被被被被的被被被的被被被的被被被的被被被被的被被的被被被被被的被被的被被被被被的被被的被被的被的被的被被的被被的被的被的被的被的被的被 如果是的的被的被被的被被的被的被的被的被的被的被被的`'unconfirmed'`** (有可能出现重复的提示):保持
草稿可见为“ 可能没有发送 ”, 重新读取页面, 让用户决定 。 A级`chat.send`调度前的操作是`refused`页:1`unavailable`; 丢弃的答案是`{ok:false}`。 。 。`agent.answer`对于未知的节点是`{ok:false}`(没有I/O触动). 限制:第 5页 MB(现有)
夹子),聊天文本 64,000管辖下的,回答文本 8000(`ANSWER_TEXT_MAX_CHARS`,应用`buildPermissionDecision`) (中文(简体) ). 旧桌面上的未知动词 `Unknown method: chat.page`电话
显示“ 更新计算机节点” 。 渲染器在 SEND 解析主窗口
时间( 这里`getMainWindow()`),所以一个macOS窗口关闭并重新创建继续回答. 服务器版 :
N/A(它不提供电话中继服务;它的桥梁订阅是惰性的)。

3.3 SSH制片人(电话:`nodeterm-ios`页:1

- ** Locate**:运行桌面`remote-transcript-locate`命令字符串(以逐字记录形式插入)
,以 Swift 端口验证路径`isSafeRemoteTranscriptPath`。 。 。
- ** 读**:运行`transcriptPageCommand`逐字; 解析框架化的回复( 大小/ 开始/ 结束)
与 Swift 的字节窗口`parseChatWindow`(1字节)
外观后方,部分线性下降,生长到5 MB,工具结果载体,计划/问题
机构,`at`,型号/努力).
- ** 赫尔德**:名单`~/.nodeterm/pending/*.json`按有效载荷的地图`session_id`到节点,`tool_name`□ 计划/问题;从安装中读取钩状修改
脚本标记; 修订版 < 5 = 没有答案控制 。
- ** 发难民高专办 :`load-buffer -b nt -`(文本在**stdin**),副本模式取消
警卫`paste-buffer -d -p -r`, (中文).`send-keys Enter`- 开始吧`node-terminal`页:1`nodeterm-rmt`连接
继续开会 ESC字节剥离.
- ** 答复**:Swift港`buildPermissionDecision`(对未决请求文件进行验证),
解剖写( E)`umask 077`, tmp + mv)从 stdin ;`pendingId`在任何路径前重新验证。

3.3a 自定义代理人(镜像)`settings.customAgents`,桌面侧已执行)

自定义代理的节点携带`agentId: "custom:<uuid>"`在SSH上,电话无法知道它的底部
调用( 聊天能力随它而来) , 也不指定其二进制( 发件前的窗格所有者检查) 。
自己的,所以代理状态的 这是一个`settings`块的广告:

```json
"settings": {
  "customAgents": [
    { "id": "custom:3f2a…", "label": "Proxy Claude", "baseAgent": "claude", "binaries": ["claude"] },
    { "id": "custom:9b1c…", "label": "My agent", "binaries": ["my-agent"] },
    { "id": "custom:77de…", "label": "Wrapped", "baseAgent": "codex", "binaries": [] }
  ]
}
```

- 每张镜子里都有电话写着:`agent-status.json`(桌面版和服务器版;
中继器`projects.list`每个 SSH 工程的驱动切片
(单位:千美元)`agent-status-<projectId>.json`,通过`settingsFor`) (中文(简体) ). 在旧桌面上缺席 QQ 拒绝每个自定义
节点,如前.
- 怎么样?`binaries`是桌面上传的`binariesFor(id, settings.customAgents)`,仅在
每个名字都匹配`^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$`BUILDER执行这个字母表,因为
衍生出的“ 姓名” 可以是密钥的切片( Name`oauth2:ghp_…`从 git URL、 引用的嵌入值、 a`${env:…}`模板)。 **Empty=不能诚实地命名**(例如:`bash -lc …`,或名称
拒绝,永远不要猜测。
- 残存的字母表无法捕捉:发射命令指示器不能告诉跑者选项的
节目的VALUE,所以`npx --registry-token ghp_… my-agent`将"命名"的标志。 建造者
因此,还出版`[]`对于具有已知证书前缀的名称( )`ghp_`, 、 、 、`gho_`, 、 、 、`ghu_`, 、 、 、`ghs_`, 、 、 、`ghr_`, 、 、 、`github_pat_`, 、 、 、`AIza`, 、 、 、`sk-`, 、 、 、`xai-`, 、 、 、`glpat-`)或高圆形(32个字符,
• 80%的字母、字母和数字。 修炼主义:一个没有前缀的短密仍然可以通过,一个
其捕获量为实际二进制的二进制`[]`) (中文(简体) ). 电话仍然验证每个名字(`isPlainBinaryName`并拒绝。
- 怎么样?`baseAgent`只有当它是一个内置的 id。 在 SSH 上聊天: 只有当它是`claude`(仅限
调用 Swift 解析器读取); 在中继时, 桌面决定(`canChat(capabilityAgentId(…))`) (中文(简体) ).
- 从不包含原始发射命令, args 或 env—— 他们通常持有 API 键和代理 URL,
切片是SSH主机上的文件.`label`正在显示文本 (\\ 200 字符授课)。

3.4 实时更新和呼号(两种运输)

- 第一次打开:256 KB尾巴;在顶端附近滚动 ~ 512 KB旧页;由合并`key`; 携带工具结果;
未证实的有权得到乐观的寄件,直到记录。`olderCursor == null`。 。 。
- 虽然查特屏幕是可见的 代理正在工作: 尾巴每2秒重读一次,单飞,
当大小不变时跳过;当屏幕被隐藏或应用程序被背景化时没有跳过 。
现状来自现有的4个镜像民意测验。`chat.status`(连载).

□ 4. 屏幕和互动(iOS)

- ** Entry**:会话屏幕顶端栏中一个**Chat QQ终端**切换器;默认聊天
能够聊天的代理商(`CHAT_CAPABLE`),每个节点都记住最后一个选择. 窃听收件箱问题 /
批准会在查特开始
- ** Thread**:用户信息在中性泡泡中右对齐;助手解泡全宽. 标记
通过**MarkdownUI** (中文(简体) ).`gonzalezreal/swift-markdown-ui`,一个新的依赖——`属性结构'
(markdown:)`没有块元素:代码块可水平滚动,可复制;链接打开于
Safari; 相对/文件链接被忽略. 工具调用为紧凑的芯片( tap ~ 结果页); 思维
崩溃了 在每个助手响应下:复制+相对时间;长压→复制/共享 67.
从底部向下滚动按钮。
-** 计划卡**:完全计划标记 + * 证明 → 前一个模式 * / * 接受编辑 * / * 证明
在编辑 * / * Revise... * 之前询问。 QQ问卡**:选项(单/多),
其他领域,提交。 大型触控目标; 发送时随机应变 。 当结构化的答案是
不支持 ~ 一个带有按钮切换标签的"Answer in Terminal"横幅.
- ** 计算器**:再利用`DictationComposer`(+附,麦克风, ). * 上面的芯片;`/model`通过发送路径,然后 这个路径切换到终端 。 工作时锁定( 这个原因), 而 a
即时被持有,或者当面板为壳体所有时。 附:SSH上的SFTP; 中继时已禁用
(没有上传RPC——超出范围).
- **工作行**:现有的吉祥物动画+"克劳德正在工作...",乐观地显示在发送上.
- **iPad**:相同视图,可读最大线宽。

□ 5. 安全和故障处理

- 永远不要盲目打入窗帘:发送和`/model`只有当国家是`done`不详**和**无
持有的请求存在**** 并且** 具有面板的代理程序;在发送时重新询问大门。 中继 :
桌面决定。 文本仅通过stdin;ESC剥编拟.
- **iOS消费者`chat.send`** 计:`'refused'`- 保留草案,说没有寄(使用)`reason`(单位:千美元)
( 我很担心)`busy`= 等待上一消息),允许重传;`'unconfirmed'`从来没有
自动转发(它可能已经打过,也可能没有打过);保留标有“可能没有发送”的草稿,
重新装入页面, 将决定留给用户 。 未知的未来`result`数值作为`'unconfirmed'`(安全的一面). 旧的桌面从不返回, 也不返回`reason`A级`ChatStatus`与
无`version`来自于比本合同年长的桌面( 无)`hostRefuses`- 把它当作`version 1`与`hostRefuses: false`; 任何其他不详`version`锁了
- 根据主机待决请求文件验证的答案;
固定装置;`setMode auto`无法形容;过期票/旧钩子 ^ "Couldn't send——在
终点站,绝不是虚假的"同意".
- 不同状态:在本连接/桌面上找不到/无法读取/ 你知道吗?
网络丢失使线程保持“ 重新连接” 横幅并暂停在线读取; 失败的旧页 ~
重试行, 线程保留 。
- 成本:在工作时只在可见的聊天屏幕上进行现场阅读;背景中没有任何内容。

□ 6. 测试与核查

- ** Golden 定着**:一个桌面脚本从这个服务器上的真实记录中切除匿名片段
(隐藏图像行,窗口边缘的多字节字符,跨页工具结果,计划/问题,
模式/努力,通过 TS 解析器/页码器/工具-机构/决定构建器运行,并写入`fixtures/chat/*.json`。如果固定装置从当前 TS 输出中漂移,则桌面测试失败。 这个
相同的固定装置被复制到`nodeterm-ios`斯威夫特解析器和决策者必须与之匹配
完全在Linux Swift的绳子。
- **Desktop**:四个中继动词的单元测试(镜管、限制、节点分辨率、发送门,
修订大门)。
- **iOS纯逻辑**(Linux habel):解析器,呼号/出现,发送门,决策构建器,持有衍生,
SSH 命令构建器( 运行在真实下)`/bin/sh`) (中文(简体) ).
- ** 此处无法核实**: SwiftUI编译,布局,设备行为. 欠一个Mac(`xcodebuild`+ 键
iOS PR 中的设备核对表;没有UI的“测试绿色”索赔。

□ 7. 交付

1. ** Desktop PR** (中文(简体) ).`nodeterm`分支`feat/mobile-chat`:中继动词,金固定生成器+漂移
测试,这个医生, CLAUDE.MD。 首先可以安全合并——没有现有的电话呼叫这些动词.
2. **iOS PR** (中文(简体) ).`nodeterm-ios`: Swift 解析器+决策构建器+`ChatPage`模型, SSH 中继数据( S)
来源,聊天屏幕,卡片,作曲集成,MarkdownUI. PR中的Mac Build + 设备核对表.

□赞成 8. 超出范围(YAGNI)

语音对话、拇指/重试/读音、中继文件上传、Codex/Gemini聊天视图(没有桌面)
(原始内容存档于2018-09-21). Calk view either, Android.
