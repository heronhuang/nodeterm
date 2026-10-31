> English: [docs/en/agent-messaging-idle-session-boundary-fix.md](./en/agent-messaging-idle-session-boundary-fix.md)

# 代理消息: 空闲会话被杀死并永久报告为 stale

** 现状:地方整治,没有承诺,没有上游。 为针对节点的公关撰写。 **
在 Windows 桌面安装上本地诊断和补丁
(单位:千美元)`C:\Desenv\particular\nodeterm`基础承诺`2393e06a`),于2026-09-13查阅. 下方所有东西都是
说明该地方diff(`git status`没问题`git diff`在树上),加上什么是和不是
已证实,而不是声称已经审查或准备合并。

□ □ □ □ □

多代理管弦乐(协调员+建筑师+编码器,全部是克劳德代码,全部在Windows上,
所有非tmux/native-PTY会议)`send`页:1`reply`有一段时间。 然后,每一次之后
克劳德会议开始拒绝每条进一步的信息`targetStatusStale`,永久为:

- 怎么样?`send`到编码器失败两次, 然后是 a`write`无法吝啬。 编码器关闭,
重新开放,完成任务, * 也去`targetStatusStale`后说.
`send`两次失败,`write`失败, 终端仍然
明显地显示克劳德坐在它的瞬间(没有坠e,没有忙碌).
- 画布一直保留着每个节点 - 没有显示为关闭或消失。
- 关闭和重造一个节点 "固定"它, 这是一个工作绕圈, 他妈的诊断。

□ root reason —— 三个独立的bug,全部Windows形状,一个共同的结果

QQ 1. 非 tmux 后端上的闲置代理 CLI 被普通内存杠杆杀死

`src/renderer/terminal/live-work.ts`因为`wouldKillLiveWork`(屏幕后面的共享门)
释放和所有三个公园减震杠杆——见`CLAUDE.md`"每个记忆杠杆必须问
”)只保护一个节点,`agentState`当时是`working`页:1`waiting`页:1`blocked`A类 **`done`和的的的的的 的 的 的 的  的 的 的 的  的  的   的   的  的      没有          的    的                                 的          的          的   的 的         的  的 的 的       的  的 的   的 的  的      的       的  的  的   的     的 中对                的     的        的  的              的  的   的  
即时——读作"无事可逃",被放出/停放和证明完全像一个
普通终端.

在 tmux (mac/Linux) 上正确: 释放/ 证明只解析客户端, shell 和
CLI进程持续在下面运行, 重排是一个温暖的重排。 ** 在视窗上,当无
真正的TMU被发现,没有壳 在CLI下 生存的杀手** —— pty *是*
CLI 自己的进程树( 直接本地的 PTY , 或在会话主机包装修复后)
下面是会议主办方的pty;无论哪种方式,杀死客户会杀死这个过程). 这个
"保护"这个前提应该不会让一个闲置但依然开放的克劳德订婚
因此:

- 会话关机(项目开关、开盘或10分钟的屏外放出计时器)
被应享有的特权
- 冷藏机自动恢复`claude --resume <id>`复活时,这似乎没什么
发生了(同一个节点,同一个标题,同一个会话 id)——但请参看bug 2,这是为什么是这里
永久拒绝来自。

### 2.`SessionStart`页:1`SessionEnd`正确重发信件证明, 但拒绝它会产生误导

`src/core/agent-status-mirror.ts`因为`reduceEffectiveEntry`处理每个会话边界
(单位:千美元)`kind: 'session'`作为`commitState(undefined, false)`- 向其提供节点`state`转到`undefined`和`stateVerified`转到`false`这一部分是正确和深思熟虑的:一个仅仅是
启动/恢复/终止不能被假定为空闲和安全到消息。

窃听器是什么`src/core/agents/agent-message-decide.ts`因为`identityRefusal`报告
输入。 它只区分"从来没有观察到任何东西"(它需要`targetStatusStale`页:1
可重复的* 身份* 拒绝:"等待它证明自己") 从其他案件, 跌落
改为:`targetStatusStale`一个节点,**在这之前证明了自己。
所传递的消息,`stateVerified: true`- 然后越过a`SessionStart`页:1`SessionEnd`据报道,边界(恢复、就地重新启动、平原重启)使用相同的措辞:
"目标有节点身份,但尚未公布核实状态". 这是假的
老实说,`idleRefusal`因为
拥有“节点介于会话之间(无当前状态)”,但`identityRefusal`先运行于`decidePreProbe`并预其法.

因为Claude的CLI 刚刚恢复了 并且一时闲置无事可做
永远不要自己转身,这读起来是 永远的,从外部 stale —— 确切地说,
报告症状。 它解决了节点的下一个转弯时刻 张贴一个** 核实**事件,但
没有任何迹象告诉召唤者,转弯是它等待的,或者
身份本身是好的。

3个`write`到非持久性的本地 Windows PTY 无声失败

`src/core/pty-manager.ts`因为`sendText`(单位:千美元)`write`控制动词,`/rename`,音符-推,拼写
——每个内部作家,不只是代理通讯)有三个分支:SSH远程,会话主持人,
. ** 直接** 本地Windows PTY(`Session.nativeWindowsPane`设置, 不`session.sshRemote`,没有`session.sessionHost`, (中文).`this.tmuxPath`(未设定)`session-host`这个
tmuxPath 图像` condition, which calls `会话SendKeys(目标,...) 与会话主办会议相对应
名称 ** 不存在 ** 对于一个直接的 PTY —— 它总是返回`false`时`write`这样的
pane 失败, 无条件, 这是报告“ 写 falhẩ” 的一半 。

□ 修补

1. 摇摆剂CLI现在受到保护,就像`working`页:1`waiting`页:1`blocked`

`src/renderer/terminal/live-work.ts`编号 :
- 怎么样?`LiveWorkInput`已获取`agentProcess?: boolean`- "是CLI特工 据信正在运行英寸
这个窗格,无论它的转折状态如何"(行~50).
- 怎么样?`wouldKillLiveWork`(第66行)现在返回`true`打开`agentProcess`一个人,甚至看着`agentState`。 。 。
- 新设`agentProcessInPane(agentId, status)`(第77行):任何带有一个节点的正确性`agentId`谁
状态是 ** 不**说`hibernated`页:1`paused`页:1`dropped`这三个是CLI自己的
文档中的“ 坐稳”表示(Eco退出、手动暂停、`dropped`活性检查),只有这三个人才能使节点再次恢复.

`src/renderer/terminal/park-budget.ts`编号 :`ParkedEntryState`和`canDisposeParkedEntry`(线~62)
现载/前载`agentProcess`,在公园时间为同样的原因拍摄`parkedAgentState`已经是(离开效应 公园的节点也清除了活的代理)
状态。

`src/renderer/nodes/TerminalNode.tsx`页:1`readAgentProcessRef`与现有`readAgentStateRef`读到屏外释放检查和公园快照

**汇聚的不是视窗。 ** 汇聚在每一个平台的屏蔽/屏蔽上
没问题 杠杆已经调用; 在 tmux 上它不会改变任何可观察到的( tmux 支持的会话从来就没有)
被保护的*或* 濒临死亡的客户 在那里总是便宜的,现在它是
仅仅"也"没有尝试 一个闲置的代理, 这花费一个额外的温暖的再接合 在平原
课题组会被驱逐的 Mac/Linux上的评论员仍应进行理智检查:
共享代码,我只在Windows上验证过.

2. 镜像现在可以诚实地澄清"尚未有证据"的疑问,以恢复和孤立的CLI,决定者讲述它等待着什么的真相.

`src/core/agent-status-mirror.ts`编号 :
- 说吧`MirrorEntry.sessionStarted?: true`(第 ~ 149 行) –"目前无国籍入境者为:
a ** 经核实**`SessionStart`从那时起,没有任何东西能建州" 未坚持
(单位:千美元)`buildFile`许可列表未更改, 清除于每个`commitState`(行~467线).
- 一个经过核实的克劳德`idle_prompt`通知(续)`ev.idle === true`) 紧接着
已核实的会话开始,此后没有国家承诺,现在允许实施**核实,
非受难者**`done`(单位:千美元)`idleAfterSessionStart`,线~500-505; 额外`commitState`参数,
线条~457-473. với以下各项: 页:1
等待批准,所以,`idle_prompt`现有的“ 拯救” 机制
(已经习惯了把ESC的节点从工具呼叫中解开——看) Beatrice`normalize.ts`安全性: 安全性
以某种方式信任这里 信任一个"任意"是不安全的`done`(这可能是掩盖a)
现场审批)。
- 这取决于克劳德实际发射 经证实的`idle_prompt`简历没有之后不久
新的转折——我还没有证实确实如此。 ** 见下文“验证的东西”;
修补方法对实现是未经证实的。

`src/core/agents/agent-message-decide.ts`(单位:千美元)`identityRefusal`,行~307-314):一个**有**的节点
证明自己以前`e.verifiedAt`是数字),目前重置为`state === undefined`到会话边界报告`targetNotIdleUnknown`与`SESSION_BOUNDARY_REASON`("节点")
越过会话边界... 并且没有报告任何转弯之后")`targetStatusStale`。 。 。
从未证明自己还得到的节点`targetStatusStale`——该分支不变,
正确无误:对于那个节点,的各项身份问题确实仍然有待解决。

3个`write`现在到达一个直接的本地 Wind Alabamas PTY

`src/core/pty-manager.ts`(单位:千美元)`sendText`,行~4002检查`live?.nativeWindowsPane`** 在此之前。
届会的东道/东道分支机构及其代表。

`src/core/native-windows-pane.ts`已获取`sendText(text, enter)`(第~73行):将有效载荷设定为
括号内的粘贴,只有在面板要求时(同`paste-buffer -p`与 tmux 订约
路径已使用),以其他方式写入,然后应要求输入。 故意** 否
进程证明**(不同于`sendEnvelope`,代理消息传送路径) -`write`朔尔`/rename`音符和音符总是输入 任何目前拥有的面板,和
在这里添加一个证明 这将是新的, 未经要求的行为 来电者从来没有过。

□包装修补(独立于以上三个错误,但需要完全改变故障模式)

安装的大楼完全没有会话主机 ** -`dist:win`从不跑`host:build`,以及`build.win`声明否`extraResources`对于它,所以每个终端 安装是,并且总是
这将是,一个非持久性的直接 本地PTY。`package.json`编号 :
- 怎么样?`dist:win`现在运行`npm run host:build`在此之前`electron-builder`。 。 。
- 怎么样?`build.win.extraResources`现在的船`out/session-host/host.cjs`加上过滤过的拷贝`node_modules/node-pty`(数目)`lib/**/*.js`, (中文).`package.json`,平台已经建成`build/Release/*.node`编号/`.exe`编号/`.dll`)下`resources/session-host/node_modules/node-pty`。 。 。

没有这个, Bug 1 的修补就近乎 mot: 由 CLI 保护的"idle agent CLI"`agentProcess`这是
莺的PTY树 保护它不受内存操纵 只会拖延同样的问题
当应用程序本身重新启动/启动(它杀死了每个直接的PTY,不管它是什么)时——有
根本无法幸存下去 在会话主持人在场的情况下,一个正常的应用程序现在重新启动
而不是从一个死过程重新开始(见"什么被验证听众").

# 被验证的东西 #

- 怎么样?`npm run typecheck`干净
- 怎么样?`npx vitest run`在每个触摸到的文件套件上: 除一个已存在的仅限 Windows 外, 清除
失败( E)`agent-status-mirror.test.ts`'"以0600权限写入文件"——POSIX文件
模式不适用于NTFS,与这个变化无关。
- 新的/延长的试验:`live-work.test.ts`(单位:千美元)`agentProcessInPane`,新的保护案件),`park-budget.test.ts`(一个停车的闲置代理入口),`native-windows-pane.test.ts`(单位:千美元)`sendText`(b) 框架/进入/处理的案件),`agent-status-mirror.test.ts`(单位:千美元)`sessionStarted`/idle-rescue state machine, 四例:经核实的救援,未经核实的闲置,
未经核实的会话开始,国家承诺解除救援,),`agent-message-decide.test.ts`(单位:千美元)`targetNotIdleUnknown`对于一个经证明的由边界 vs 重置的节点。`targetStatusStale`(单位:千美元)
从来没有证明。
- 怎么样?`npm run dist:win`生产一个安装器 我已经用过它了`resources\session-host\host.cjs`捆绑`node-pty`存在和负载(通过烟雾测试:在孤立的`userData`,确认它写`session-host.json`,听它命名的烟斗, 和包装`node-pty`打开真正的 ConPTY 。
- 安装在本地机器上并重新启动。 通过终端的OS进程树确认
届会目前是会议主办者进程的儿童(不是`nodeterm.exe`(直接)——
包装固定生效。
- 确认的钩子在重启后还活着(`PreToolUse`页:1`PostToolUse`通常为
在重启后6分钟内积极工作。
- 送来的`send`改为两个冷还原的、未激活的节点;两者均正确返回`targetStatusStale`(可重复)——这是**预期的,没有改变的**分支(一个节点,它具有
这么快就发不出消息了 没有`verifiedAt`现在,所以`SESSION_BOUNDARY_REASON`没有
应用; 仅适用于 " 点点 " 重设 " 中运行 " 。

□ 未验证的 / 未打开的公关问题

- 这`idleAfterSessionStart`未观察到射击。 ** 恢复两个
Claude 会话在重启后闲置6+分钟, 无`SessionStart`已张贴
(即使是普通的 更别提救援了)`idle_prompt`)——在两封信之前
我也没有确认这是否是无限期的, 这可能是
普通争论(5 CLI 一次在一台机器上冷启动)或可能表示救援
需要一个不同的信号。 ** 评审员应明确确认Claude Code是否
可靠地发射经证实的`idle_prompt`不久之后`--resume`没有新用户回合**——如果它
不,这半 固定2 没有看到什么`targetNotIdleUnknown`诚实的措辞
(fix 2 的另一半,被* 验证) 实际帮助。
- ** 最初的多代理方案(协调员+建筑师+编码员交换)`send`编号 编号`reply`* 由于技术原因重新印发。 经验证的每个机制在
隔离(保护的上游、镜像状态机器、决定者的措辞、写法)
路径,包装。 完全重播原版是自然接受测试
为公关。
- 固定1和固定2是**共享的跨平台代码**(`live-work.ts`, (中文(简体) ).`park-budget.ts`, (中文(简体) ).`agent-status-mirror.ts`, (中文(简体) ).`agent-message-decide.ts`)尽管虫子只在
今天的Windows(mac/Linux在下面黄色总是有tmux). 公关应当明确注意,并获得
眼从谁拥有tmux-path行为, 尽管意图是没有什么可观察的
换个位置
- 没有试图解释**为什么除了“包装”之外没有会议主持程序**
从未运出过“——即没有调查某些*其他* 运行安装是否曾有过
会话主机,或者自Windows会话主机工作落地以来是否属实. 在其各自
如果此 repo 追踪到“ 自此 Windows 会话为 Windows 版本
持续的事实。
- 这台Diff是完全没有承诺的 机器它写。 没有分支,没有承诺,没有
公关打开了,这是故意留给谁接的。

□ 已触摸的文件

```
CLAUDE.md
CONTRIBUTING.md   (no functional change noted beyond what CLAUDE.md documents)
package.json
src/core/agent-status-mirror.ts
src/core/agent-status-mirror.test.ts
src/core/agents/agent-message-decide.ts
src/core/agents/agent-message-decide.test.ts
src/core/native-windows-pane.ts
src/core/native-windows-pane.test.ts
src/core/pty-manager.ts
src/renderer/nodes/TerminalNode.tsx
src/renderer/terminal/live-work.ts
src/renderer/terminal/live-work.test.ts
src/renderer/terminal/park-budget.ts
src/renderer/terminal/park-budget.test.ts
```

这些是更大的本地、非承诺的更改( 本地 Windows)
代理通讯工作`docs/windows-session-host.md`已经是"自动核查"了
描述——`session-host/message-pane.ts`, (中文).`windows-pane-owner.ts`,则`processBirths`打开字段`PaneOwner`页:1 此文档只涵盖上面的三个错误和包装修补; 它确实
没有重新描述 之前的工作。
