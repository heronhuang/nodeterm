> English: [CONTRIBUTING.en.md](./CONTRIBUTING.en.md)

# 参与 nodeterm 贡献

感谢参与 nodeterm。本文是快速入门与必须遵守的协作规则；各子系统的设计理由与不变量见仓库根目录 `CLAUDE.md`（完整英文见 `CLAUDE.en.md`）。

谢谢你来找 这个文件是很短的门:足够跑步了,还有房子的规矩
实际得到一个拉请求 发送回。 长版本——每一个子系统和背后的推理
其间是其个人,其间是其本人。`CLAUDE.md`位于复方根,如果您需要的话,也可以自动装入。
与 AI 编码代理。

bUSL-1.1**(四年后改为麻省理工学院——见`LICENSE`捐款
凭该许可证被接受。 其附加用途赠款不包括建筑物的生产用途
其许可证或使用限制检查被取消或绕过;在此修改公关中的代码
平时的工作。

# 准备起来#

```bash
npm install        # also patches + rebuilds node-pty against Electron's ABI (postinstall)
npm run dev        # dev mode with renderer HMR
npm run typecheck  # tsc for both the node and web projects — the fastest correctness gate
npm test           # vitest, unit + integration
```

规定的义务`bootstrap-windows.bat`改为`npm install`它验证视觉工作室
C++ 工作量及其在编译前单独安装的 Spectre 减速库`node-pty`。 。 。
它还保护从第26号节点继承的clang/lld ThinLTO设置中建造的MSVC附加物;a
平面`npm install`在股票节点26 节点12 否则失败`LNK1117`。 。 。

`npm run server:dev`如果您正在该表面工作, 请将服务器版( 浏览器 UI) 启动 。

** 如果`src/main/node-pty-patch.test.ts`红色的,你的`node_modules`而不是你的代码。 **
运行`npm run rebuild`1.1.0 每个产卵在macOS上泄漏一个齿轮装置
([节点-pty#950](https://github.com/microsoft/node-pty/issues/950))和在视窗上留下一个
每个被杀死的会话都会被活捉(其退出线程删除 ConPTY 警棍而不关闭)
HPCON ; 我们先修补两个源`electron-rebuild`编译他们, 测试卫士
补丁幸存升级。
也一样`src/core/speech/smart-whisper-patch.test.ts`编号 :`scripts/patch-smart-whisper.mjs`在 Linux x64 的基线边上添加一个 AVX2 构件 sleep.cpp( 问题 # 1267, ~侥幸 10x)
说明)和`npm run rebuild`应用它。
重建之后,`scripts/stage-conpty-dll.mjs`复制节点的捆绑`conpty.dll`+ 键`OpenConsole.exe`后边`build/Release/conpty.node`在 Windows 上(重建删除);
以还还原还原还还原还还原,还原还还原还还原,还还原还原的原还还原的原还诘的原还还原的原还还原还原原的原还还原的原还还原的原还还原的原还还原的原还原的原还还还原的原还原原的原还还还还原的原的原原原的原原原原的原的原原的原的原原的原原的的原原的的的的的的的原的的的的原的的的的的的原的的的的原的的原的的的的的的的的的的的的的的的的的的的的的的的的的的的的的的原的的的的的的的的的原的的的的的的的的的的的的的的的的的的的原的的的的的的的的也可的的的的的的的的的的的的的的的的的的的的的的的的的的的的的的的的的的的的的的

□ 密码到哪里去

Repo由Electron进程边界分割,并强制分割,而非咨询:

目 录 什么生活在这里
|,|也.
|`src/core/`QQ无电服务核心. 只能通过它与外壳交谈`CorePlatform`。 。 。在履行。
|`src/main/`电击弹`src/core`窗口、 IPC、 对话框 。
|`src/server/`QQ 服务器版 shell (浏览器 UI over WS- RPC). QQ
|`src/preload/`唯一的桥梁:`contextBridge`曝光`window.nodeTerminal`。 。 。 。
页:1`src/renderer/`– 反应UI. 到达主 * 只通过`window.nodeTerminal`。 。 。 。
|`src/shared/`QQ 类型和 IPC 我可不想被所有方导入的频道名称 。 |

`src/core/no-electron.test.ts`和`src/server/no-electron.test.ts`失败, 如果`src/core`或`src/server`导入`electron`或`../main/*`。 。 。

** 将新服务逻辑插入`src/core`后面`CorePlatform`,不内含`src/main`** 这是
切换服务器版的靴子; 逻辑留入`src/main`默默无闻地不存在
边界测试不能告诉你一个特性是 * missing *。 这一直发生在同一个子系统中:
校对:Soup`context:ensure`都只运出桌面,以及
在这两种情况下,浏览器将信件扔入空格,特性看起来只是空格。 狦
处理器需要的只有电源有的东西(一个SSH Control 60,一个本地对话框),使它成为
** 被注射的除尘器** 其缺失有记录的降解——见`registerTranscriptIpc`页:1`registerContextEnsureIpc`- 而不是让整个处理者`src/main`。 。 。

** Windows代理消息:** 直接的ConPTY终端由运行时节点索引查看,
而不是恒定键。`NativeWindowsPane`检查控制台成员, 明确土著
过程链和过程的诞生时间,和帧粘贴只有在终端请求之后。
不要用存储器替换已读`agentId`或重新开始的Heuristic最深的后裔。
翻译,例如:`node`以其脚本包命名`bin`条目,永远不要`node`,这样
npm-installed的CLI如Codex被识别. 由 park 过期 或 屏外 释放的会话
发布仍然可以发送信息:存在和路由询问后端,而不是附带客户端.
两个Windows所有者都读取(会话主机和直接ConPTY)通过一个 PowerShell 探测器
寒冷时,他们得到自己的`WINDOWS_PANE_PROBE_TIMEOUT_MS`通过`PtyManager.paneProbeTimeoutMs`,来自探测器自己的最后期限
(单位:千美元)`session-host/windows-probe-budget.ts`· 在那里改变探测期限,而不是文字;
tmux 保持2s的束缚。 窃听代理消息的外壳必须转发可选的解密器 。
主持了 :`core/settled-submit.ts`粘贴,等待信封渲染,然后在每一个后端分别提交.
持久性会话- 主机传输有自己的版本消息扩展:主机检查
其会议代号、操作系统处理身份和编写前的模拟器。 一个旧的现场主持人
它的终端并拒绝扩展; 绝不自动重启, 或掉回发送 Keys 。
信件发送在主解决范围之前发布待编辑的画布,而不覆盖
未解决的文件冲突。 见`docs/windows-session-host.md`。 。 。

* 窗帘探测器:** 从未启动并制定`powershell.exe`每个平等原则。 集体行动
读取通过每个过程的探测工(`session-host/windows-probe-worker.ts`),该下降
发回一发脚本( 绝对)`powershellExe()`仅仅当它不能回答的时候。 杂费
同时的表格读取,但不添加基于时间的缓存: 重新启动的退出民调需要两个真实的
它之前的连续观察相信一个变化的窗格。

** Windows 剂发射:** 一种新剂发射场,必须采用快速发射线。
通过发射编剧(`createLaunchWriter`) 因此,一个Windows-native gane 可以执行节点`data.launchIntent`相反(`pty:execute-launch`) (中文(简体) ). 如果你添加发射输入 核心计划员做
而不是模型,排除它在`heldLaunchIntentFor`,或 Windows 窗帘没有它就发射。

** 直升机发射由核心发射,而不是通过标签发射。 ** 一个项目的每个观众都会运行
扫描发布循环对应于它自己的节点副本, 因此每个节点检查无法停止两个服务器
输入同一启动的版本标签(# 1173)。 发射路径必须通过`commitLaunchAttempt`联合国`claim`(单位:千美元)`workspace.claimLaunch`并治疗`elsewhere`结果为"另一个查看器正在输入它":没有输入,没有状态变化,没有失败.

Claude的使用身份被设定为与其证书相同的配置目录. 阅读组织
元数据,即使证书中已经包含电子邮件,但当
无法读取元数据 。 管理下的使用绝不能回到一个没有扫描的系统 键链符号:
将一个账户的限额与另一个账户的组织挂钩。

上下文链接地图授权读取 。 发布边缘、链接元数据和背景的更改
独立于画布几何学更新的工程; 由每个节点渲染重置
饥饿的出版无限。 只合并同一核心拥有的项目,并使用已提供的项目
帆布在制表器开关时的工程时代 。 核心在同步前必须取消已删除的链接
笔录发现或调试文件写完; 旧的书写绝不能恢复访问。
在构建工作空间地图之前, Coalesce 渲染渊源更新, 不重置预定任务 。
中间出版物只保留已解决的文字记录路径,以保持未变的身份;
a 会话/账号/位置/hook路径或删除目标立即使缓存无效。

视窗更新( 未签名的β) :`release-win`你喜欢吗?`dist:win:release`(单位:千美元)`nodeTermUpdates=manual`页:1
上传`latest.yml`,所以该应用程序显示被动的"新版本——下载"卡片;它从来没有
下载或安装,主则拒绝重启任何非自建的新建。
保持本地状态`dist:win`打开`disabled`窗口`*.blockmap`直到签署土地。

更新者 UX: 必须调用更新检查按钮`checkForUpdatesNow()`(12个员额)`state/pendingUpdate.ts`) -
卡片将其他支票视为自动和无声。 从不翻转旗子
安装可以启动(macOS等待松鼠). Mac);参见CLAUDE.md"包装和自动更新".

Windows安装器安全 (# 829) :`build/installer.nsh`超过 NSIS 的流程杀检 。
运行中的应用程序或会话主机块安装/uninstall,瓷器查询块也失败 。
永远不要恢复自动主机终止 : 退出应用程序会保留这些直播会话 。
更新准备必须保留已保存的画布节点: 正常退出程序,  我想退出, 然后有用户 。
核实并阻止任何剩余的主机。 绝不建议 ** 届会结束** (删除节点)。 冷剂 就在这
恢复取决于所支持的、保存的对话历史;它不保存运行中的任务。
见`docs/windows-session-host.md`用于用户控制的准备/回收步骤和限制。

** 准备更新** (# 829 step 2, Windows 只限): QQK / 更新卡运行`components/PrepareUpdateDialog.tsx`誓以纯洁的、`lib/updatePrep.ts`计划。 它拒绝时,任何
正在工作或等待用户( 发送存储器 OR 核心镜像—— 未挂载的节点)
没有制造器状态 )`/exit`通过`registerAgentUpdateExit`, (中文). 有些
罢了。`shutdown`仅命令和退出
一旦主机进程确认消失。`shutdown`是经过商谈的问候功能:永远不要寄给
一个没有做广告的宿主, 并且从不添加任务 kill/name- kill refack—— 一个老的宿主得到
手动步骤。 流从不删节点. 服务器版: 已退化的 stub (`unsupported`) (中文(简体) ).
一个主机分类`staged`(运行从其`%LOCALAPPDATA%`复制)只需退出即可。
带有“退出节点(会话持续运行)”的线索;`unknown`永远不能被当做舞台。
NSIS飞行前等待(限制,10号出口仅限)静默/`--updated`运行和永远不杀人。

分阶段主机运行时间(# 829 step 3):一个包装的 Windows 构建从私人启动咄咄逼人
copy`%LOCALAPPDATA%\nodeterm\session-host\<version>-<fingerprint>\nodeterm-sessionhost-v2.exe`(单位:千美元)`src/core/session-host-runtime.ts`),因此它映射了没有安装的文件,不再屏蔽更新.
规则: 一份副本只有在一个经散列核查的重名公布之后才发行,
烟雾测试临时目录( 最后写入标记); 图像名称必须保持与`nodeterm.exe`页:1`nodeterm-session-host.exe`(旧的未安装器与全机器名称的相同);
失败可追溯到遗留下来的In-in-install-dir发射,飞行前仍然阻碍着发射; 旧的
复制件仅在SUCCESSULFLE 进程查询显示无任何内容时被删除。
目录可以被重新命名到一边。 主机协议只保留添加剂——保存旧主机,
使用,一个不兼容的 被留下运行和报告,从来没有杀死。

□ 三个表面

一个功能在你决定它如何表现之前是不会完成的——即使决定是"不是"
适用于此处的“:

1. **Desktop**(电子)
2. **服务版**(Linux,浏览器)
3. **移动伴** — *节点移动*, 2 ** 私人** 重置:`nodeterm-ios`(闪电UI)和`eneskirca/nodeterm-android`(科特林,开发中). 你也不能打开公关,所以...
这通常是一个后续说明, 而不是相同的PR工作: 在您的公关里,
需要, 和时间, 时间, 时间, 时间, 时间, "不适用"是罚款
回答——把它变成一个明确的答案。 永远不要假设手机是桌面副本中的 iPhone 或者
默认值。

任何能够从`window.nodeTerminal`执行****`src/renderer/bridge/`或故意的、有记录的降解。 那个`satisfies NodeTerminalApi`门
强迫你宣布每个成员, 但一个不op stub 编译很好,而无所作为。

**canvas和 给我的canban板是同一个节点的两种观点。 ** 当你把东西加进一个
画布节点——页眉动作,徽章,菜单项——集中注意板牌景象和牌型
也需要它,并用同样的改变。 全球( Omni) 板显示所有开放项目为
叠叠式泳线; 默认关闭( T)`settings.omniKanbanEnabled`),有一个专用的复用
快捷键( E)`view.globalKanbanToggle`),并可以通过`settings.omniKanbanAsDefault`- 刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的辫的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的刺激的的的的的刺激的的刺激的刺激的刺激的刺激的的的的的的刺激的的的刺激的刺激的刺激的的的刺激的刺激的的的的刺激的的的的的的

** 节点行动在一个建设者中进行。 ** 在帆布节点上活动的一行——菜单项目,切换,
选手——进入`renderer/lib/nodeActionItems.tsx`中,从不内置`Canvas.tsx`。帆布节点
菜单,会话边栏菜单和两个 kanban 卡片菜单(通过)`components/kanban/cardMenu.tsx`从之而建. 在同一改动中决定是否发卡
新行: 一张牌只需要`BOARD_NODE_ACTION_IDS`在帆布位置上活动的一行
输入`BOARD_SPATIAL_ROW_IDS`相反。 卡片模式的QQ菜单需要`BOARD_MODAL_ACTION_IDS`结束
联合国`sessionActions`prop, 在动作运行前关闭模式, 当卡片已存在时则缺席
无会话行。 记住,董事会在项目节点上 执行没有在
画布(Omni板):通过 Canvas 写作`nodeWritesFor(projectId)`(建造在`createNodeWriteRouter`, (中文).`lib/nodeWriteRouter.ts`),从不恢复直播,并报告失败`nodeterm:toast`。 。 。`lib/nodeActionItems.guard.test.ts`第二行副本失败 。

董事会卡**source**是一个注册条目,而不是您在呼叫网站添加的分支
(单位:千美元)`renderer/lib/kanbanSources.ts`) (中文(简体) ).轿车. 一次宣布来源——过滤标签,`placement`(单位:千美元)`assignment`= 董事会自己坚持的任务,`provider`= 提供者拥有栏 大家都 26.
栏内`lane`命令,无论它是`configured`对于一个董事会,无论它是`readOnly`(无)
板子从来不写:没有拖动,没有移动控制)——并给它一个叶子(一个卡片组件和
列表路径输入它。 列取行并命名无源; 拖动问责路径分支`placement`。如果你发现自己写`=== 'github'`在登记处之外,登记处
缺少一个字段。

一个板块特征必须说它生活在三个层次中的哪一个:一个**板块事实**是共享内容
输入`project.kanban`(单位:千美元)`.nodeterm/project.json`——可选,可选,可选,可选,可选,可选,可选,可选,可选,可选,可选,可选,可选,可选,可选,可选,可选,可选,可选,可选,可选,可男女)`sanitizeKanban`(单位:千美元)`core/workspace-files.ts`并且对结果表明的建筑无害;
a ** 显示偏好**是用户本地Storage(`state/kanbanDisplay.ts`); **live上的过滤器
代理状态** 是组件状态,从未持续。 一个无忧无虑的卡片移动 土地在TOP
;只有位置下移才要求底部(`AT_COLUMN_END`) (中文(简体) ). 牌单是`rank`字符串,每个字——渲染器或核心——都经过`placeAssignment`(单位:千美元)`@shared/kanban-order`(ARRAY),它也使任务按等级顺序排列,以便建造
忽略`rank`;永远不要用手搅动阵列。 保存的视图查询仅由`viewQuery`, (中文).
因此,活状态芯片永远无法保存到一个。 棋盘密钥是
注册命令`board`范围——唯一范围允许一个赤信,因为它从来没有
在打字时或在终端时开火。

任何** 启动代理本身** (机位调度是第一个) 获得其同意
机器本地设置及其触发器来自个人在这个应用程序中作出的姿态——从未来自一个
标签,可以从吉特·胡布或`git pull`- 其同意对什么
它同意(板块调度绑定寄存器+列标题+标签,而不是赤色的列标识).
董事会调度局的一个触发器是`KanbanView.moveIssueByUser`* * * * *`onIssueMoved`* * * * *`decideDispatch`, (中文).
运行只开始于`dispatchStart`,从该决定或从排队排水`recheckQueued`· ;`lib/board-dispatch.guard.test.ts`如果该链接中的新调用者失败
链条出现,或者,如果任何东西,但`dispatchOnUserMove`创建队列条目。

读取代理状态的卡片订阅它 我们走吧的节点的**原始签名**
(单位:千美元)`teamProgressSig`, (中文).`issueRunChipSig`),从来没有对整体`agentStatus.byId`地图——该地图的更改
每个节点的每个钩子事件。 领域`agentStatus`在重启过程中坚持的状态被恢复
作为历史的记载, 从来没有像 你是个活的州:`lastSeen`命令和年龄边栏,但从未
变成`state`或 Eco 闲置时钟(`lastEventAt`) (中文(简体) ). 在卡片显示事实之前 检查一下它在板子上的位置
还没说`lib/cardRedundancy.ts`);卡模式保存着卡片滴出的每一个事实.`project.ropes`页:1`bridges`类似棋盘的敌对输入:它们通过`sanitizeLinks`每一个负荷和保存缝合, 读者仍然容忍任何事情。 等绳子
(单位:千美元)`--after`,核查面板)`waitRopeId`(单位:千美元)`ctrl-after-<dep>-<node>`从不与
打开器`ctrl-<source>-<node>`环 面: 环 面:
删除节点,所以ID是唯一一个从打开器中告诉等待的东西. 一个节点打开
控制动词还记录其打开器(`data.openedBy`); 读者问"是谁打开的"
(单位:千美元)`stationsByOpener`,车站故障通知)更喜欢该记录,仍需要打开者.
绳子存在。 在渲染器中,规则是一个函数,`openerByTarget`(单位:千美元)`lib/teamProgress.ts`:
团队进步和Tidy画布都读过 任何新东西 都要问"是谁打开的"
节点"——通过绳子`id`或者每个等待者都读作开场白

在添加 GitHub 各种不同的读数之前, 请检查现有民意调查已经获取什么 。 拔出请求卡
无需提出新的要求:`/repos/{repo}/issues`返回拉动请求,并使用客户端
抛弃他们。`/repos/{repo}/pulls`看起来像是明显的终点,是昂贵的终点——它
** 鸟类`since`**,因此它不能再利用任何增量机械,其物项是~3.5×
字节。 CLAUDE.md的kanban 部分有测量和驱逐规则 维持问题
未受影响。

任何新的GitHub呼叫的三条规则(CLAUDE.md的kanban部分,"同步基础",有原因:
- 不要决定失败意味着什么。 传过去`classifyGitHubFailure`(单位:千美元)`core/github/failure.ts`) (中文(简体) ). 仅`unauthorized`可能读作“ 已签出”; 费率限制, a
断开或断开的连接必须如此表示, 否则用户会重新校验 55.
没事了
- ** 通过请求协调员和由东道主建造的客户端。 ** 这才是每个
答复对协调员的费率预算,暂停下层的背景工作,顶点等待。
绕过它的要求在预算上是看不见的. 倾向于有条件的请求
(单位:千美元)`If-None-Match`)对于任何你民意调查:304是免费的.
- ** 其含义来自项目文件需要的文字`context.mappingApproved`** 栏
映射是 git- 分摊的; 批准覆盖它, 读取不需要它 。
- ** 只有完成的扫描才能移动增量光标。 **`lastSuccessfulRefreshAt`下一个
扫描`since`; 将一个问题折叠成快照的写法必须让它单独存在, 或其他
人们在写作前的改变 等待每天的全程通行
- ** GraphQL支出不同的预算。 ** GitHub 仪表`graphql`除`core`; 问
协调员与资源`throttle(identity, now, 'graphql')`) 并让一个主限制
联合国`resource`,或者一个用完的 GraphQL 预算会拖累 REST 的同步。 符号可能包含的图形QL字段
不读回来`null`加上一个 FORBIDDEN 错误 —— 解码为“ 隐藏的 ” , 绝不是空的 。
值(单是无效的检查滚动表示"不检查").

不在内部添加字段`ProjectKanban.meta[]`条目:每张卡片(指定者,到期日)
优先级、 标签、 手机的标签动词) 重建固定列表中的条目并默不作声地删除
别的 董事会一级的领域在每一个转变中都幸存下来——`pullLinks`是一个。

□ 家规

- ** 检查`src/shared`在写双线帮助者之前。 ** JSON物体警卫`isRecord`),一个
错误的消息( E)`errorText`), (中文(简体) ).`sleep`中,根-空格父步(`rootPositionWith`)和
证书库临时扫描`sweepForeignTempFiles`输入`core/fs-atomic.ts`) 每一个在5个中存在
直到1252号的续集 和父母步行的拷贝已经
在腐朽的帆布上飘散。 本地帮助者, 分享一个名字, 但行为不同
(泽利的)`errorText`, 窗口- 康普蒂的数组接收守护符)不是 亲爱的 ; 别管它 。

- 由节点标识插入窗帘`PtyManager.sendPaneKeys`和 SSH 项目节点
从未在本地 tmux 套接 Kurdistan上读取或输入。 ** 未挂载的远程节点解析通过`remoteNodeOwner`或被拒绝`not-connected`(三)`paneCommand`页:1`paneOwner`解析未挂载
仅带有明确节点`{ resolveUnmounted: true }`选项。 见批量暂停`CLAUDE.md`。 。 。

- 一个节点 id从来没有到达tmux作为一个裸体`-t`.** 使用`exactPaneTarget`(单位:千美元)`=nt-<id>:`(a) 或`exactSessionTarget`(单位:千美元)`=nt-<id>`从.`core/tmux-naming.ts`在遥控器上单引用
命令行(zsh 扩展一个主线)`=`. tmux 前缀匹配一个赤裸的目标在错位上,所以`nt-x-1`到达现场`nt-x-12`: 中继端点命名输入、读取并杀死另一个前缀
项目终端(安全审计F1/F2)。`pty-exact-target.realtmux.test.ts`驱动一个真实`PtyManager`; 参见“精确 tmux 目标”`CLAUDE.md`。 。 。

- ** 中继对等者的节点ID、存在和共享文件夹被判定为主机侧面。 ** 一个被瞄准的客人
新引入的节点只解锁自己的节点`newOnly`产卵,存在到非编辑器仅用于
共享项目的同行,以及植根于`/`, (中文).`$HOME`或其中任何一个的祖先
从未共享( N)`core/relay/share-root.ts`) (中文(简体) ). 隐藏选项的用户界面是方便; 策略为`core/relay/`这是大门。 见"远程访问"和"Host 没事 团队接力"`CLAUDE.md`。 。 。

- ** Branch标签描述一个核心的结账。 ** 共享当前状态`renderer/state/gitBranches.ts`; 不要通过工程 ID 或复制工程来永久缓存分支
树枝到工作树节点。 源、会话和工作树头都使用同样的观测数据,
以 API 身份、 精确 cwd 和 (用于 SSH) 项目身份键入。进行改革
从一个背景标题:只有活跃的SSH项目是git-roubable. SSH 信头观察
源头刷新 。

- ** Pty 输入被过滤为完全一件事:重复设备属性答案。 ** 每个观众
一个会话(浏览器标签、 kanban 卡片模式、 中继端口) 的回答 tmux 客户端的 DA
手握手,然后tmux 键入第一个后每个答案。`core/da-reply-gate.ts`内部`PtyManager.write`中,让一个DA1/DA2在输出时通过每个查询回复,然后放下其余的。
不要把它拓宽到“任何看起来像终端报告的东西”:`ESC[1;2R`心肺复苏和
Shift+F3, 以及一个吃键盘的过滤器比错误更糟糕( 见 CLAUDE. md → 终端)
会议连续性)。

- ** 一个端口是节点的,蔷薇在节点的工艺树上。 ** 开发服务器
发现(`core/dev-ports.ts`)通过 socket 所有权属性端口,从不连接到
任何东西。 新消费者读扫描,不会增加探测器. 前进
(单位:千美元)`core/remote-ssh/port-forward.ts`绑定`127.0.0.1`只保留同一端口号码或
拒绝的理由——不同的当地港口只是该人的明确选择——和
从不向低于1024年的端口推进 渲染器通过一个节点和一个端口,从来没有地址:
核心重新扫描并决定主机侧目标。 处理`ss`页:1`lsof`页:1`ls`输出为攻击者-
受影响的文本:进程选择一个进程名称,因此对每个所有者组单独解析
永远不要让名字到达一个pid(参见 CLAUDE.md → Dev-server 端口).

- ** 原发文本只输入空提示。 ** 以备注的节点类型转换成代理
它自己的(上下文链接的发现笔记,粘着的推过笔记链接)通过`linkNoteRefusal`+ 键`pty.sendToEmptyPrompt`从不裸露`pty.sendText`编号 :`sendText`粘贴和
按 Enter 键, 它会提交用户用它打的半型( # 1144) , 并回答打开的
权限对话框。 从屏幕上读取Emptiness(`readClaudeComposer`因此,一个没有
被测量的作曲家读者得不到音符——一个跳过音符在通知中被命名,从不沉默.

- ** GitHub 问题仅作为经证实的参考才达到一个窗帘。 ** 题目和机构
由陌生人写在公共仓库, 发射线被打成一个壳。 任何东西
开始或指示代理商处理一个问题`@shared/github-issue-ref`编号 :`issueLaunchPrompt`(唯一的作曲家,重新验证`owner/repo#N`用于文本,以及`normalizeIssueRef`存放在什么地方`issueRef`它来自一个 git-shared 文件。 永远
内插`issue.title`页:1`issue.body`这次访问将进入一个提示, 并且永远不要添加一个张贴代理的路径
自动输出到 GitHub : 发布是公开的, 只有用户要求 。

- ** 董事会日志中的评论是文字,绝不是触发器。 ** 董事会评论 @mentions a session
交付给该代理人(`deliverBoardCommentFromUi`,通过普通代理消息
gates),仅来自注释作曲家的发件,用户刚输入的文字,在桌面上
app的自己的窗口。 日志是一个共享文件—— git 拖动, 另一个实例, 中继端点或
团队出席的嘉宾可以在里面放上一个记号——所以没有东西可以加载,重新装入或使它成为.
可以送货`board-comment-trigger.guard.test.ts`在第二个呼叫站点失败,
IPC是一个原始的主窗口`ipcMain`处理器(从未在对等可发送的平台表上).

- ** JSON决定书是用核心编写的,从来不用制作器或脚本。 ** 回答一个问题
Claude的许可请求`allow`页:1`deny`(一个计划的后续模式,一个问题)
发件人:`PermissionAnswer`通过`answerPermission`· ;`core/agents/permission-decision.ts`根据代理主机上等待的请求文件验证,并撰写JSON. 管理
钩子打印一个 JSON 的答案,只有在严格的前缀/大小/单行检查后,所以要新决定形状
必须通过`isBoundedAnswerContent`或者它被默默地忽略了。 答题内容从不重复。
见`docs/hook-reply-approvals.md`。 。 。

- ****`NODETERM_NODE_ID`所以钩子事件的节点ID不能证明是节点
届会** 一个离子`claude -p`从节点开始, 或者克劳德自己的守护进程 主持一个叉,
在节点的代号(及其标志)下贴上钩子. 克劳德事件过去`core/agents/claude-pane-origin.ts`在任何听众前面的钩子服务器中: 管理的脚本报告`$CLAUDE_PID`前景
旗帜和tty, 只有窗帘的前方的claude代表节点。 不要添加一个听众
在门前运行, 不要"修补"一个卡住的节点 放松它: 已经漏掉了事实
无法打开 。 两枚炮弹都呼叫`wireClaudePaneOrigin`(以`hook-verified-parity.test.ts`) (中文(简体) ).

- ** 绝对不要在用户可见的副本中称用户的机器为Mac。 ** 使用`thisMachine()`页:1`thisMachineCap()`页:1`machineNoun()`你确定吗?`src/renderer/lib/machineName.ts`- "这个Mac"上
macOS, Windows 上的“此 PC ” , “ 此 计算机 ” , 其它版本和任何服务器版浏览器标签
(其中被描述的机器是SERVER,其OS是观众无法知道的). 第563期:
~30弦说"这个Mac",包括*"这个Mac在这个执照上没有授权"*和*a.
座椅上的队友可以在这个 Mac 上运行命令 * — 用户之前必须信任的一句话
发送贝壳访问。`machineName.guard.test.ts`扫描非注释行并失败
PR; 复制的确是 macOS 专用( ptmx 限制横幅, Notch step) 按名称免除
以它的理由。 评论没有扫描。

- 罐头帆布丸必须留有空间供测量码头使用。`CanvasPills`限制他们的行
当副预算太小的时候, 把它移到码头上方。 只能使用摘要文本
切换; 在溢出处外保持刷新, 并保持行无堆叠上下文
弹出器仍然可以清除侧边栏/板.`scripts/usage-layout.test.ts`验证真实的Chrome
布局和命中目标(套)`CHROME_BIN`大体为默认路径。

- 你躺在一个活的终端上 偷走了它的轮子 - 给它`pointer-events: none`∗∗∗ 载于E/CN.4/Sub.2/2002/L.10号文件。
车轮路由是每个包的命中测试`closest('.nowheel')`(我们参加)`Canvas.tsx`反应
流量自有`panOnScroll`因此指针下的元素决定,而不是节点.`.term-node__xterm`搭载班级,覆盖整个身体, 所以横幅画在跑步 你是怎么 快跑!
终端将那些像素从终端的车轮区带 spider到帆布上。
用户滚动和帆布幻灯片。`.term-node__upload`和`.term-copy-pill`曾经
已经`pointer-events: none`为此;`.term-node__stalecwd`没有(问题767),`canvas/terminal-wheel-boundary.test.ts`现在在下一个失败。 一个重叠的REPLACES a
死景使帆布轮保持故意——下面没有任何东西可以峦卷.. 同样的规则
向上一层 : 不要通过移动 100 个路径问题“ 修补 ”`nowheel`外向,因为一秒钟
消费者阅读该类,没有每个元素的选出可以达到. 深层版本: CLAUDE.md§
终端节点生命周期.

- ** 节点彩色调色板是单色列表,也是控制边界。 **`src/shared/node-colors.ts`是每个采摘者画什么`nodeterm color --color C`因此,UI提供的颜色和CLI接受的颜色不能分开。
它的代理部门是从`AGENT_CONFIG`,从不重排:添加内建代理和
书面材料会自己生长书面材料,如果您要添加一个表层,让某人选择节点颜色,
提交`<NodeColorSwatches>`而不是自己映射阵列( 守护测试失败于
手卷式监视行)——如果绘制值为 TEXT 或作为不透明填充
白色,拿着`SYSTEM_NODE_COLOR_SWATCHES`反之,在评论中给出了相反的理由。 深处
版本,包括测量的数字: CLAUDE.md §节点颜色。

-意见交流?`agy`工具调用机器——处理它
作为一项决定。 **`agy`将钩子读作JSON和我们的钩子 在全球`~/.gemini/config/hooks.json`,则已订阅`PreToolUse`. 测量:工具是沉默的,但是`{}`在节点和用户自己的
终端服务。 所以: 仅以`antigravity-decision.ts`(一个表格); 无打印
答案后; 保留 Windows 命令的引号( ragy 逃脱它们为`\"`,该cmd.exe
无法读取)并测试 Windows 发送未读`windowsVerbatimArguments`; 保留`AutoRun`拒绝。 深版本 :`docs/antigravity-agent.md`和CLAUDE.md §代理支持.

- ** 在Windows上,只有Claude运行POSIX。 ** Claude Code通过 Git Bash 运行钩和工具; codex,
Gemini,grok和副驾驶在PowerShell/cmd.exe运行它们. 所以,钩子命令或 "运行这个shimm"
用于任何其他代理的线条`.cmd`帮助`src/core/agents/hooks/windows-hook-wrapper.ts`页:1`shared/agents/shim-invocation.ts`和每个
构建者使用带有 POSIX 默认的 RUNNING 机器平台——永远`process.platform`在建设者内部 SSH 安装器也呼叫。 深版:CLAUDE.md § Hook安装器.

- ** 寻找`agy`安装钩子并不足以发射。 ** 测量的窗口
安装器已写入`%LOCALAPPDATA%\agy\bin`改为 a`REG_SZ`用户 PATH,所以命令查询保存
表达式文字和`agy`即使其可执行性存在,也没有找到。 当地
因此,Antigravity PTYs 将同一销售商地点查询返回的目录附后
钩子安装器使用, 只有当没有 PATH 条目将其命名时(`pathWithAgyDir`)——从未
预置 : 在 macOS/ Linux angy 上生活在共享目录中, 并改善其在用户条目前的位置
阴影他们自己的工具。 将校正范围保留在反重力会话中,并退出SSH
届会。 (单独的窗口)`Path`→`PATH`密钥修复适用于遵照Windows的每个产物。 )

-** 我们的钩子。json捆绑是用户的关闭。**`"enabled": false`打开`nodeterm-status`输入`~/.gemini/config/hooks.json`是 Agy 自己的开关, 而节点则是唯一的选择退出; 安装器
每次重写都带着它 chooks.json通过共享设置交易发布
(单位:千美元)`updateSettingsFile`)——姗姗来无常的书写,它用普通的书写取代了连结的文件.

- ** 安全门每次松动都必须是用户可以看见和取消的缝隙。 ** 一个"不要"
再问一遍",只生活在一个对话框中是一次获得的许可,永远无法再次找到. 这个
画布控制破坏性确认是复制的模式(`@shared/control-confirm`- 一个反恐者
被放弃的行动仍然在屏幕上宣布放弃
让它通过, 哪些门可以放弃 是一个表,而不是一个`if`在每一个呼叫地点——
因此,"这个永远不能放弃"是一个经过考验的事实,而不是有人忘记写的台词.
** 可能给予什么对话的界限是SCOPE,而不是永久性。 ** 它提供,作为收音机可见
从开头选中“ 再次问我” , “ 不要再在 < project> 中询问代理 ”
(机器 - 本地的,按着项目 ID 键,被挤压像`settings.sidebarCollapsedItems`)或"不要问
在任何项目中,直到节点终止为止”(在记忆中——不是)`settings.json`没有`localStorage`, (中文).
因此退出恢复大门。 隐藏到一个复选框后,它被读作缺失. 这个
每个项目的答案也可以从项目标签的“代理人可以,不用问”中预先放弃。
菜单;它通过同样的机器-本地地图写出相同的机器-本地地图`withProjectWaiver`永远不要 该死
复制合并,每行显示闸门的实际作用(`projectWaiverState`),这样
应用程序运行或全局放弃被命名,而不是隐藏在一个不受限制的框后面。 机器- WIDE 豁免只保留设置, 因为
在用户手中出现的对话框中的偏差点击不能允许。
只提供应用程序运行的功能是其自身的失败:不是用户在“不要问”时抽取的。
所以真正的选择是"被问到永远" 或"把它关掉" 两个规则
带项目范围:在项目上键入了调用ACDS ON(扫描控制路径)
因此,这往往不是屏幕上的项目,而是机器-本地的——从不`.nodeterm/project.json`的关键要素, 或克隆的Repo 可以切换某人的确认
关闭。

- ** 代理只能通过ALLOWLIST到达设置,每一次更改都会问。 ** 这个
画布控制`settings`动词 (`src/shared/settings-verb.ts`)阅读并请求修改短篇
键表;表外的任何东西都因名称而被拒绝,以及被禁止的一组(许可模式,
账户/证书、节点身份、浏览器控制、遥测、密钥绑定、确认放弃)
排名在表格之上——它的测试将表格与设定和名称图案相对照,因此条目
哪怕是故意增加的 也会让特工给自己权力红掉`settings`外边`CONFIRM_WAIVABLE_VERBS`:可以放弃自己确认的CLI会使确认的装饰品。
能力变化必须通过UI自己的设置器着陆(`setProjectCapability`: 文件旗和
这个机器`'kept'`回答),从不写手卷旗. 添加密钥是
表格加A`why`。服务器版没有对话框,因此它拒绝每个`--set`以名义.

- ** 允许模式(或其他任何东西)`project.json`是GIT-SHED——从不关键
单靠当地大门。 **`project.defaultPermissionMode`前往所有克隆人的地方
Repo, 将确认- skip 绑定在“ 模式是绕行的 鬓毛” 上, 让一个克隆人
寄存器静态关闭用户的破坏性动作门。 从中产生的规则:
询问`resolvePermissionModeWithSource`卫生组织选择了数值(`project`页:1`global`页:1`default`和(或)
仅根据用户自己的机器本地选择来操作 。`default`与`global`, (中文).
因为将一个未设定的设定视为一个刻意的选择就是将同意读成沉默. 随便
机器本地化进入`settings.json`; 任何赋予能力的东西都会进入`project.json`。 。 。
用于项目能力的机器-当地防御系统`agentMessagingDefault`仅仅因为
答案是:一个明确的`true`输入`project.json`还需要这台机器的录音
回答,一个明确的`false`仍然赢了,所以"关闭"必须写成字面`false`。 。 。
通过`projectCapabilityGrantedFor(project, cap, settings)`- 从来没有文件位。

-** 任何代理都不得拿走用户的屏幕。** (原始内容存档于2018-06-26). Canvas control roads by Source:与人权有关的 Canvas roads by S.
请求指定代理商自己的节点名称,发送方必须找到拥有它的画布. 对于
几年后,“画布不在屏幕上”的答案是切换项目标签,所以背景
经纪人的`close`移动一个正在另一个工程中输入的用户, 应用该工程保存
并把他们的相机和打字的焦点,当作他们没有发出的呼吁。 现在每个动词都有
(a) 决定的屏外行为(`src/shared/control-off-screen.ts`他们没有一个是"旅行":
以自有项目序列化节点或REFUSED 来回答它,因为代理商
可以继续 如果你加一个动词,请给出一个条目——拒绝击败劫机者,一个动词没有
输入属于一般拒绝,这是失败的,但无人决定。 两个陷阱
旧形状隐藏着: 解决的动词体`--node`对抗现场`nodesRef.current`时
回答另一个项目 默默无声地对人所看到的一切采取行动(使用)`ctlNodes()`),阅读`activeProjectId`动词内部有相同的错误( 使用)`ctlProject`) (中文(简体) ).
警卫是`test/acceptance/control-verb-disposition.test.ts`,它走主动词表
- 故意跨层,因为这是唯一的本着
"每个动词"被检查而不是记住.

-** 制造某种东西的帆布控制动词必须能够安全地重试。** 答复的代理人
丢失(它的工具调用超时, 隧道掉落) 运行了相同的命令, 并且
Shim的终点站靠自己重新站岗. 钩子服务器`/control/`路线——一个地点
桌面主机和服务器版都坐落在后面——键入一个分类账(已验证的调用器节点,
请求 id) 并重放第一个回复,而不是两次调用
(单位:千美元)`src/core/control-request-ledger.ts`) (中文(简体) ). 打开节点、团队、工作树或框架的新动词
加入`REQUEST_ID_VERBS`在同一 PR 中; 代理文本从该集中生成。 处理器
在它知道它的效果是否发生之前就放弃了`indeterminate: true`从来没有
说"安全重试"的普通失败——重试之后会打开第二个. 任意桌面
主写有渲染器答案,属于`finishAnswer`步骤,转发器也运行
在 LATE 回复( 重试后重播) 上: 后处理`await`换成
只有准时运行。 不扩散条约秘书处
这个

- ** 交车站工作的新方式必须提供`src/core/station-handover.ts`** 平面图`--after`否则,将释放一个依赖该站`done`从它以前的任务。 今天,
移交是`send`页:1`reply`(通过信件层)`onHandover`和(或)`write`页:1`run`(单位:千美元)`noteControlAnswer`每个 shell 的控制处理器中 – 桌面主控器`finishAnswer`页:1
服务器版包装器). 将任务输入àn节点窗格的新动词
同样的公关,在两个贝壳上;`src/main/station-handover-wiring.test.ts`锁定已有的站点。

- ** 新的帆布控制开放路径必须记录打开节点的人。 ** 当一个车站停止,
打开它的代理人被告知(`src/core/agents/station-notice.ts`)——绳子本身不能说.
谁是谁,因为`--after`节点被绑在它等待的站台上 和同样的ID
形状。 所以,每个开放的动词邮票`data.openedBy`打开者绳子的地方
(单位:千美元)`lib/stationOpener.ts`;活路从`connect`颜料和冷开的写作
电话`withOpenedBy`(见A/CN.9/WG.III/WP.1号文件)。 一条没有盖章的开阔的路径 编译和通过,以及
其站台静默失效;`src/main/station-notice-wiring.test.ts`锁定现有网站。
通知的文本是应用的和固定的——从不添加STATION写给它的任何内容(它)
输出恰恰是针对管弦乐手的注射来源。

- ** 来自`.nodeterm/settings.json`是敌对输入。 ** 那档案是承诺
寄存器,所以任何人 谁可以犯它。 工作树的产地必须经过`sharedWorktreeLocationRefusal`(单位:千美元)`src/shared/worktree-location.ts`在每个创造的道路上,
每个`git worktree add`通过真实路径后退`GitService.worktreeAdd`。如果添加的话
其它设置, 指定磁盘上一个区域的名称, 应用将 WRITE 到, 给予相同的两层 :
逻辑规则`source: 'shared'`,并检查写作发生的真实路径。

- 你刚刚创造的节点不在`nodesRef`现在,和a`setNodes`更新器不是"现在"。 **`nodesRef`镜像在渲染时反射状态, 因此这个勾选框对下一个勾选框是无形的
一个更新器在RENDER时间运行,
已冲出一个反射的渲染器`nodesRef`回到一个没有它的清单。 计算任何
读取`nodesRef`(父母例证,cwd,一个职位)`setNodes`当一流形成
框架和其中的一个节点, 都在一个同步块中进行(`attachWorktree`写新
框为`nodesRef`对于这个。 每个工作树的创作都经过`createBoundWorktree`(单位:千美元)`renderer/lib/worktreeCreate.ts`; 不添加第四份副本
" , "`git worktree add`,然后绑定。"

-** 代表他人提出的对话必须知道这一要求的一生。** 主弃a
120 s 之后的帆布控制请求, 并告诉渲染器什么也没有, 所以一个未解答的对话框坐落了
永远守住一个坚固的守护者,
使用“确认”的动词,
拒绝是可重试的,在循环中重试。 如果你为一个有界限的请求提出一个对话框,
规定期限(`ConfirmState.expiresAt`),输入绑定而不是重制,并具有
在请求者放弃之后,它将略微过期,用“过期”来蜗牛回答——从未被“拒绝”
用户),它声称人类从未做出过的决定. 覆盖现有`useExpiringDialog`钩而不是第二个效果: 工作树清除对话框需要
一天后,同样的规则, 和两份副本 是如何悄悄地错过了下一个修正。 给
仅到AGENT 启动的对话框的截止时间 。 用户打开的对话框绝不能消失
——记住,清除对话并非总能消除对话状态。
提交其本人忙碌的看守人员。

- ** 错误不得指名道姓的补救办法——补救办法需要自己的检验。 ** 这个`unproven-target-owner`拒绝告诉它的呼叫者 *"重新打开目标节点,所以它的主人是
重新打开的正是没有记录
(所有权只记录在真正的新鲜产卵上) 所以听从命令的人得到了相同的
永远拒绝。 它的运出是因为没有测试读了这句话。 当你写一个拒绝书时, 扣上它
它所描述的对机制的求偿——声称补救办法的先决条件是:
函数决定它,所以当行为移动时副本会红——并记住谁读
它:告诉一个语言模型 做一些只有人类能做的事情 并不是建议。

- ** 任何路径形状:Windows是一个传送目标。 大部分都写在
ma孰cOS/Linux,所以反复出现的缺陷是POSIX上真正正确的代码——.`split('/')`, (中文).`startsWith('/')`作为绝对的考验,一个赤裸的`fs.rename`启用`path.basename`页:1`join`页:1`sep`,以`renameAtomic`,并至少用
一个真的`C:\`- 形状输入。 警卫会执行一些 并且会辜负你的公关 在服务器中
这是你的选择。
拥有文件的核心,并保留一个不可观察的主机未知而不是猜测。 相反,
在 POSIX 上,反斜杠是合法文件名文本——不将两个分隔符视为可互换
除非自有文件系统已知为Windows.

- ** Windows上没有unix 套接字和同义链接权限。`ws+unix://`拨号(代码x)
app-server)不能在那里工作——从磁盘上读取同样的事实(管理 Codex 身份是
联合国`auth.json`JWT电子邮件,`codexAppServerReachable`这是大门。 未类型`fs.symlink`掷出
股票账户上的EPERM:通过`linkSharedEntry`(单位:千美元)`src/core/shared-entry-link.ts`——目录的交叉点,硬链接然后提醒文件副本).

-** 在POSIX上Tmux对我们所做的一切,会话主持人欠Windows.** 两种传送方式
不存在对称性, 缺失的半导体在看起来像成功的方向上失败 :`sendText`乘车`tmux paste-buffer -p`在POSIX上,它将有效载荷从窗帘真正的
括号内粘贴状态,并单独提交`send-keys Enter`;会话主持人回答
同一个电话和一个生的`text + '\r'`,所以一个糊涂意识的作曲家 吞噬了Enter作为粘贴
内容和一个注入的提示未提交(问题686)。 在增加交货前,a
探测器或窗格查询,检查 tmux 腿用它做什么,并在
同样的改变。 主机通常比 tmux 更精确的回答,因为它的无头模拟器
参见 pane app 自己的字节 – 见 CLAUDE.md 的"我们有自己的 VT 模拟器", 仅此一项
这种推理是反轉的.

- ** Xterm 形状的缓冲器从不提取原始`tmuxScrollback`.** tmux 号`history-limit`存储
仅使用单元格; xterm 缓冲器( 渲染器, Windows 会话主机的无头模拟器,`NativeWindowsPane`)以全宽分配每行。 大小为`xtermScrollback`从`src/shared/scrollback.ts`(≤ 10k),所以主机从不保存历史,渲染器无法显示.
-** 应用本身的环境不是泛面的环境。 任何启动的节点(通常是一个)
代理CLI的外壳)`process.env`说明那届会议。`buildPtyEnv`条形
明确清单`TMUX`, (中文).`NESTED_AGENT_ENV_STRIP`); 在那里添加一个名称,并带有其测量值,而不是
而不是前缀扫荡——`CLAUDE_CONFIG_DIR`页:1`CODEX_HOME`选择管理账户,必须生存。

- ** 必须在下列地点谈判一个新的会话主持人推动框架:`hello`从来没有刚刚发送。 ** 年长的`SessionHostClient`处理每个按键框`type`没有`data`作为一个出口,和一个
长寿命主机经常超过启动它的应用程序——所以一个框架连接没有
选择退出直播会。 将能力添加到`SESSION_HOST_FEATURES`,只发送到
列出它的套接字(`geometry`推动第914期是实例,
以真正的捆绑主机为对象`session-host/geometry-host.test.ts`当然
更丰富的“反补贴”也一样:`listSessions`按会场排列`sessionDetails`特性, 和一个从未谈判过的主机 答案 给你`{names}`消费者必须读作
"命名,没有描述",从来就是"分离"或"没有过程".

- ** 每个 X 术语大小通过`activateTerminalWidths`(单位:千美元)`src/shared/terminal-width.ts`页:1
渲染器的终端和会话主机的模拟器必须相互商定,与 tmux 和
与代理 CLI 有关字符需要多少单元格,或光标位置叶重新油漆
背面的僵硬文字(一个emoji + VS16 正好就是那样). 改变宽度,从一个模拟器,
并测试他们真实的`@xterm/headless`终端,而不是提供者的返回值。

- ** 寻找Windows可执行文件与能够产卵不同。 ** 路径查询可能
正确解析 npm CLI`<name>.cmd`但节点的`execFile`页:1`spawn`无法执行
直接说 对于寿命短的应用程序拥有的子进程,通过解析路径和参数`directExecutableInvocation`(单位:千美元)`src/core/exec-path.ts`: 它使用隐藏`cmd.exe`明确
逃避, 逐字辩论和推迟扩展。 不要用这个修正`shell: true`· ;
提示和其他用户控制的参数将成为 shell 语法。`.bat`页:1`.ps1`,捷克文/LF/NUL
参数和超过 cmd 限值的行明显失败。 保持 stdin 直接: PowerShell 的文本
管道在Windows PowerShell 5.1下更改Unicode和线尾.

-** 需要一个POSIX`sh`在视窗上? 解决吉特巴什,永远不要赤裸的产卵`sh`.** 安装股票Git
仅放置`Git\cmd`在路径。`resolveWindowsSh`(单位:千美元)`src/core/windows-sh.ts`走路吉特真实
布局,然后 PATH 减去 WSL shims; 编码钩包的批次候选列表来自
同样的数据,所以增加一个布局,一次。 没有贝壳,请说"Install Git for Windows"——
项目设置上标的运行器是工作实例(它也设置)`CHERE_INVOKING=1`,或者基特巴什语
登录配置文件离开工程文件夹). 并且不要键入一条链式命令行(`a && b '<x>'`页:1
输入用户的终端: PowerShell 5.1 和 cmd 对它进行不同的解析. 类型 1 赤裸命令
并进行其他的流程(Source Control的发布回落,`lib/publishFallback.ts`) (中文(简体) ).
- ** 关闭 Windows 上的窗口将其隐藏到托盘(背景模式),不会退出。 ** 这个
中继主机、钩子服务器和通知必须像在macOS上所做的那样,在窗口外长期存在。 任意
新应用程序启动退出( 更新类型) 必须设置`quitting`在此之前`app.quit()`,或隐藏
窗口的近端处理器将退出重新变成隐藏。 每一次新的加薪(`show`页:1`focus`需要一个
用户动作和条目`window-raise.guard.test.ts`。 。 。

- ** 电话仅通过中继器到达Windows桌面。 ** 所有 iOS 应用程序发送到
SSH 是 POSIX sh + tmux, 而 Windows OpenSSH 手伸出来`cmd.exe`,所以Windows配对安装不
SSH 密钥并需要远程访问而不是 SSH 服务器 (`src/shared/pairing-gate.ts`) (中文(简体) ). 别
通过将密钥安装到`administrators_authorized_keys`。电话尝试SSH之前
中继器,所以一个能起作用的键将它锁定在无法起作用的路径上. CLAUDE.md,"远程访问",
的所作所为。

- ** 中继附件 听不到电话发送的会话。 ** 电话`pty.attach`穿过`PtyManager.prepareRelayAttach`,该路径 SSH 项目的节点结束
它的工程主机或拒绝它, 并给一个本地节点 嵌入桌面会。 永远不要产卵
直接为电话命名的节点代号提供会话(`attachDetached`页:1`createDetached`:这就是如何
SSH节点成了这台机器的本地贝壳`$HOME`. CLAUDE.md, "一个远程节点从来不是
于

- ** 排水管扫荡使后排压力消除,绝不是下一个输出块。 ** 暂停
Pty没有产生下一个块, 所以一个等待一个永远不会到来的简历: 手机冻结了
在单个 > 8 MB 爆发后永远结束。`host-service.ts`在溪流中扫描250毫秒
被暂停,然后在恢复前用快照重新刷漆——与排水清扫模式相同`core/ui-sink-registry.ts`(他们的自我节奏的汇不会下降). 新暂停路径需要相同的
启动。 CLAUDE.md,"远程访问".

- ** SSH项目节点运行在项目主机上——询问项目,而不是节点。 ** 节点
字段类`sshRemoteTmux`通过共享到达`project.json`表示主机自己的桌面和
队友也写作,因此 我们是没有他们的节点的,仍然决不能成为本地的贝壳(issue #1186)。`fileToProject`从工程的 SSH 记录、 文件返回到
主机保持中性,核心拒绝由SSH项目拥有的本地产卵
(单位:千美元)`PtyManager.setSshProjectCheck`) (中文(简体) ). 将存储的节点变成活的节点或产卵的新路径 a
终端通过这些,而不是通过节点的田园。 CLAUDE.md,"一个远程节点是
从未在当地产下".

- **接线/小组制表在实施东道主的节点上,由它组成的委员会作出决定:
节点可能不会携带任何“远”字。 ** 由SSH与团队共享的一个项目被采纳
宿主,该宿主下降`sshRemoteTmux`页:1`ssh`从它的节点,他们就如平坦地到达标签,
终端。 四条规则让他们远离这个核心(bug F:一个团队标签的终端成为本地 tmux)
会议:
- 节点的会话遵循项目React Flow的STORE hold(`useFlowStoreOwner`; 从未按键
一个节点子树`SessionProvider`打开`activeProjectId`. xyflow 复制节点进入其仓库 Ricardo1
承诺时间较晚, 因此在活动 id 上的一个密钥会重新挂载到即将到来的会话中 。
- 一个无限制的远程项目解决了OFLINE中继会话(`sessionForProject`从不
本地一个。 代码询问“哪个动态会话被绑定在本标签上?”`boundSessionForProject`。 。 。
- 在帆布外架设终端的表面(坎班卡模式——两板都住)
在App的LOCAL供应商下运行`sessionForProject(<its project>)`和提供`OwningProjectContext`向下移动`ProjectSessionScope`(单位:千美元)`session/owning-project.ts`) (中文(简体) ). 一个新的
终端创建路径还询问 `spoundBelongsElsewhere(是远程工程)' Id(“拥有项目”),
届会。 来源)` before its first create; ask `是“远程项目”(session.ts),从未`getProject(id)?.remote`,但错过了商店删除的标签。 构成部分
根据它,按项目分列的密钥数据(板板日志、卡片元数据、拉动请求)读取`useOwningProjectId() ?? activeProjectId`永远`activeProjectId`独自一人:在奥姆尼板上
卡片的工程不是活动项目,而是它的`useSession()`api 为卡打造项目提供答案.
- 核心内容`join`拒绝(`held-elsewhere`(单位:千美元)`requireRemote`创建到保存的会话上,即
本地或另一个主机, 但创建时未命名`sshRemote`仍然被扣押
REMOTE会话,所以仅靠核心并不能阻止只命名一个节点id的呼叫者. 新来电
创建远程节点通道`requireRemote`加上`sshRemote`它有,并且治疗`held-elsewhere`作为不是丢失的连接的拒绝(没有重新连接,没有空投报告).
不要通过重印來固定這個`sshRemoteTmux`在这些节点上:主机将拒绝
自有会议。 CLAUDE.md,"项目(tabs)".

- ** 手机密钥和存储链接是平台中立的。 ** 新配对的密钥被盖章`nodeterm-mobile-<id>`,但撤销必须保持匹配的遗产`nodeterm-ios-<id>`印记
现有iPhone载体(`src/main/pairing-core.ts`) (中文(简体) ). 仅通过链接到商店`mobileStoreLinks()`输入`src/renderer/lib/links.ts`—— Play 链接仍然隐藏在后面`ANDROID_APP_PUBLISHED`在列表存在之前,一个守护测试拒绝在渲染器的其他地方直接存储URL.

- ** 中继针是每个角色的,取消是一次呼叫。 ** 仅通过角色存储端点
输入`src/main/remote/approved-devices.ts`(单位:千美元)`phonePins`是唯一的自动承认...
绝不在此处写入桌面对等点),仅通过`src/main/remote/peer-revoke.ts`,哪个
取消和关闭每个主机的每次直播会话。 为中继端服务的新主机必须`registerPeerSessionKiller`,或者拆卸一个装置使其外壳打开。 CLAUDE.md,"远程访问".
- ** 一个指定项目名称的中继通道需要一行`relay-project-scope.ts`** 一名接力嘉宾
监狱在频道课上按键:
任何名称`githubIssues:*`, (中文).`board-log:*`或`projects.*`拒绝在范围限定的会话中
除非该表能够读取其 projectId. 将行添加到频道或动词中相同的 PR
每个被禁足的宾客,都被拒绝。`relay-project-scope.test.ts`红色的告诉你。

- ** 一个新的IPC频道可调用中继标签必须分类于`src/core/relay/access-policy.ts`警卫测试失败了 每个`IPC.*`由中继 API 的构建器引用
函数在`src/renderer/bridge/ws-bridge.ts`(那些警卫自己的)`BUILDERS`列表名称)
, 和 , , , , , , , , , , , , ,`src/renderer/bridge/relay-api.ts`进去`VIEW`或`COMMENT`用自己的辩驳
或接受审查的国家`EDITOR_ONLY`设置;`src/core/relay/access-policy.guard.test.ts`每个名字
你错过了。 还必须为此增加一个新的构建器功能`BUILDERS`列表,或它的频道是
从来没有扫描。 一个主机组的观众和评论员 被拒绝任何未列出的,所以
忘记是安全的,但沉默, 和警卫是什么 让人决定。 打开频道到
观众也意味着把它添加到渲染器的镜子中,`src/shared/hosted-access.ts`(中文(简体) ).
测试标注两个列表等值). 观众必须接受需要`VIEW_EVENTS`条目,没有
试验力:没有一种, 事件就永远不会到来。 深层版本: CLAUDE.md § 主机
团队接力。

- **... 还有...`src/core/relay/scoped-guest-policy.ts`也一样。 ** A Team Access 邀请分享 One
通过允许列表为项目服务:每个中继塔布频道都在`SCOPED`(附有支票)
其节点/路径/项目ID属于共享项目)或在所审查的项目中`SCOPED_REFUSED`设置,以及`scoped-guest-policy.guard.test.ts`都失败了 一个
未列入清单的频道拒绝观看嘉宾;他们必须接受的活动需要归因于
对共享项目(`filterScopedEvent`) (中文(简体) ). 任何触及主机设置的东西,
证书、执照或配对属于`src/shared/host-control.ts`却拒绝
中继对等点。

- **Live链接:一个新的广播频道不需要任何东西,每个 你说什么?
决定** 现场连线观众是安静的客户端,所以从未有广播到达他们. 每场比赛
事件仅在添加到`watcherEventAllowed`(单位:千美元)`src/core/watch-link/watcher-policy.ts`如果有效载荷是可见屏幕,
从来就没有历史(为什么)`pty:resync`”)。 永远不要在节点、棋盘或帆布操作中添加链接状态:
帆布同步 帆布管理局会公布它。`src/shared/watch-link/`复制字节
字节输入查看器页面的 repo : 只导入兄弟姐妹和`tweetnacl`,将类型导入写入为`import type`(单位:千美元)`isomorphism.guard.test.ts`并预计需要改变
复告诸人. 拒绝新查看器 CAST 。`watcherAccess`故意承认,还有控制
链接中输入的字节只通过节点的窗格`PtyManager.controlInput`从来没有写成一个
tmux客户端的pty(前缀会到达tmux),并且从未在命令行上出现.`docs/live-links.md`. 有些事情你应该知道

- ** 更改不作为旅行内容显示的内容`canvas:mut`在主机核心上失去行动
通过 op 词汇(`src/shared/canvas-content.ts`。 ** 在服务器上
编辑一个团队的托管, 帆布管理局会写一个共享项目的节点、 边缘和棋盘
从它听到的操作, 并覆盖每个担当 内容,所以内容变化 到达
仅保存内的核心从磁盘中跳出。 渲染器写入未打开的工程
屏幕通过项目商店,其节点和边缘作者运行在其中`ownWrite`所以说
书写是铸造你说的`canvas/stored-publish.ts`); 此类新商店作家必须使用`ownWrite`我也一样。 深版:CLAUDE.md § 主机团队中继.

- ** 信任中继主机密钥(host-token mint, host-mode push)的请求证明拥有
结束`src/core/relay/relay-pop.ts`,然后回到一个未经证实的请求 仅在404/405上
挑战。 ** 一个例外,只推:200项挑战,然后是404项挑战。`/v1/push/host-auth`(可能只在后端调用窗口中出现) 也发布未证实的帖子,并缓存该裁定值为 10
分钟; 推一无所止, 后端会打开站台。 推力网钩
管理呼叫通过自己的协议证明相同的密钥(`src/core/push-webhook.ts`)——确实
不折叠到另一个。 更改中继协议和`relay-pop-vector.json`必须更改
两者都重置。 深版:CLAUDE.md § 主机团队中继.

-** 对等方的X25519键通过`src/core/relay/e2ee.ts`继续`nacl.box.before`∗∗∗ 载于E/CN.4/Sub.2/2002/L.10号文件。`deriveSharedKey`拒绝低序密钥( raw X25519 输出全部为零 :
共同的秘密是公共常数, SAS是固定值)和`publicKeyFromB64`拒绝
非冠状基数64; 新的密钥摄入量某人会PIN(一个提议,一个代码,一个QR字段,一个针)
校验`peerPublicKeyFromB64`页:1`isUsablePeerKeyB64`得到一个`low-order-keys.test-support.ts`有关程序、程序、程序、程序、程序、程序、程序、程序、程序、( 这可是 或 、 或 程序、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、 、         、 、 、 、 、 、 、 、 、 、 、 、 、 、  、    、 程序   、  、      程序   President 程序          (                                                                                                                                               (                                                                                                   President            `SAS_COMPARE_HINT`(单位:千美元)`src/shared/remote/sas.ts`)在其下,没有任何东西可以比对横跨构建的 SAS 字符串( a v1 pal)
显示十位数中的前六个。 深版:CLAUDE.md §远程访问.

- ** 通过一个函数对路径比较的两个方面进行规范化。 ** 标记正常化
它的建造和匹配 原始在它使用的地方 是无操作的机器上 你写它和a
Windows上无声缺陷. 这是第558期:管理上的标记被折叠到`/`时
仍然携带的存储命令`\`,因此节点终止识别自己的钩子条目
,每,9次,9次
同时45秒的许可 等待赛车一个快速。 写一个普通人,用在两个上
侧面,并用一个`C:\`- 形状测试。

- ** 必须在重启后幸存的管弦状态经历`src/core/durable-state.ts`页:1
发送队列、站点报告和`--request-id`分类账被反射到`<userData>/orchestration-state/`增加一个模块:`DurableFactSpec`(种类,版本,a)
而不是写另一家店。 决定——和
在事实标题中写入 —— 重新开始意味着什么(一个持续运行的 TTL, 一个会话
在读完任何内容(状态镜)后,将其装入两个弹壳中。
通过一个实例和一个新的实例来测试它。 不要放进去`.nodeterm/project.json`:这是一台机器运行状态. CLAUDE.md § 持久管弦乐状态.
- ** 永远不公开一个赤裸裸的文件`fs.rename`.** 使用`renameAtomic`或`writeFileAtomic`从`src/core/fs-atomic.ts`。在窗口中,重命名失败`EPERM`只要有东西
目标打开——守护者扫描你刚写的文件,搜索索引器OneDrive——所以
平原版断断续续地失去储蓄,并且只在别人的机器上失去. 测试扫描
为了这个,并且会辜负你的公关;`docs/atomic-writes.md`解释为什么重试是安全的。 每个
临时/部分组装名称也必须是每个调用过程的独特名称,并由所有者清理。
包括嵌入在生成的 SSH 10. 命令中或交给 scp 的路径。`fs`无法扫描
看到没? 保持一个远程临时的自身叶片的边框: 延伸一个已经有效的最大长度的目标叶片
带有UUID后缀的原子写法变为保证`ENAMETOOLONG`失败。

- ** 绝不用`cat > <file>`. ** 远程时它会切换文件
弹壳开始,当Ssh通道在尸体到达前死亡`cat`0号出口——重新连接
曾经在0字节时留下了主持人的画布 每一个特工都默默地叫"成功" 使用`runRemoteAtomicWrite`页:1`remoteAtomicWrite`(单位:千美元)`src/main/remote-atomic-write.ts`),检查
字节在重命名前进行计数,在写入未降落时进行抛掷,对于属于的文件
到用户(设置、配置.toml、AGENTS.md)使用`updateRemoteTextFile`,它也保留了它的
与相关联的中枢和模式。 `cat >`一个远程跑者
非零退出,请检查结果或使用帮助器。

- SSH主机上的新代理软件进入代理工具计划。仍在进行中,
shims,他们的技能和我们的教学文件块 一次列出在`remote-hooks.ts`(减)`canvasControlArtifacts`安装器和连接时间新鲜度检查
(单位:千美元)`RemoteHooks.refreshAgentTools`)读到这个列表,所以一个主机被提升到你的建筑字节
在下一个连接。 从别的地方写出来的一首诗,一首歌,一首歌
再次选中 —— 然后将旧文本保存在应用程序更新中 。 这只针对那些文件:
钩脚本和钩头所发挥的配置作用`setup()`命令的链条、端点文件和节点
纪念物带有证书——永远不要放在新鲜的卡登。

- 永远不要写`chmod <mode> -- <file>`输入远程命令。 ** macOS (BSD) chmod 停止解析
选项,为实现`--`成为文件操作, 命令在通过时失败
在 Linux 上。 为了在Linux上测试,放一个`POSIXLY_CORRECT=1`在 PATH 上先围绕 GNU chmod 进行包装.

-** 写个字的Ack是一个关于WRITE的声称, 从来没有关于现在的遥控器。** 不再退休
声明记录“服务器仍然需要告诉X”只是因为写入返回了真实。
SSH镜像的编剧将5节油门的后方写成“乐观”——它返回
真实和排程的运行,所以一个在窗口内死亡的连接会留下一个沉淀
线上什么都没有 删除那块阿克上的删除墓碑是16个终端
在缓慢的链接上删除的语句又回来了, 被宣布为从记者不拥有的电话中发来的会话
(单位:千美元)`clearedNodes`页:1`confirmClearedDeletions`, (中文).`src/core/workspace-store.ts`) (中文(简体) ). 退休状态
有时候,一个显示遥控器已经不存在的读写器 —— 这个密码库已经是同样的规则了。
应用到另一个方向,"失败读取永远不是缺席的证据". 当你不能
观察数据来源, ** 在 UI 副本中不要列出来源**: 错误
属性发送读取向它们提供一个设备而不是文件。

- 从来没有写信给一个孩子的stdin没有`'error'`在溪流上的听众。 ** 烟斗写作
失败不是对呼叫站点的推波助澜:当孩子在排水前退出时(CLI 递送)
一个它不知道的旗帜,一个无法接触到的 ssh 主机,节点将 EPIPE 重现为 aync`'error'`EVERT在溪流上——围绕写作的尝试/捕捉是惰性的,未处理的事件坠落了
整个主进程带有一个"凤凰未在促进例外:写EPIPE"对话框(问题#382的类). 附 录`child.stdin.on('error', ...)`在第一次写入之前——通过`console.warn`所以调试环
看见它,或解决待处理的电话;孩子的退出代码保留对结果的权威
(见`tmux-control-client.ts`和`pty-manager.ts` `runWithStdin`房屋图案)。 测试
(单位:千美元)`src/core/stream-epipe.guard.test.ts`扫描后会失败 。

- ** 绝不卸载、移动或重按浏览器/网络节点的元素。 ** 电子`<webview>`宾客
过程在 DOM 分解时死亡,一个分解包括任何`insertBefore`页:1`appendChild`行动
附加元素,每当被保存的孩子在被保存的按键中的相对顺序时,反应都会执行
孩子们会变的 因此,网景托管节点 在一个稳定的池子区域 尾部
联 合 国 日 刊`<ReactFlow>`节点道具( N)`renderer/lib/webviewKeepAlive.ts`- 阅读其标题之前
触摸合并, Canvas 负载效应中的节点阵列互换, 或任何重新排序的东西
还有为什么一个背景工程的页面被挂载为隐藏的幽灵而不是
卸载中。`display:none`安全( 测量状态、 卷轴和视图大小存活); 重排序
或卸载用户的页面并丢失其页面状态。

- ** A类`<webview>`页面的轮子从未到达主机DOM.** 嘉宾为流程外框架:
在42号电机上测量,物理Ctrl/Cmd+轮到页并排放`zoom-changed`打开
来宾`WebContents`,虽然没有主机`wheel`听者被开除了 保留`nowheel`在网页视图主机上
(它保护 React Flow 路由) 并主要安装页面缩放`installWebviewZoom`· ;
删除类或添加一个渲染器轮式处理器不能执行宾客缩放. 共享
渲染器控制称相同`@shared/webview-zoom`政策直接针对所附嘉宾。

- ** 标定的降幅在所列集装箱内。 ** 链接在`renderMarkdown`输出保持其
书写着href,一个相对的 用来导航整个应用窗口
直到重新装填为止。 1名下放的处理员(`renderer/lib/markdownLinks.ts`) 拦截点击
内部`RENDERED_MARKDOWN_CONTAINERS`; 注入标记下HTML的新表面必须使用其中之一
这些课程或加入名单 --`markdownLinks.test.ts`否则失败。
- ** 装载指标是`components/Spinner`从来没有一个本地旋转器。 **`.nt-spinner`就是那个
环入`styles.css`,并冻结在`prefers-reduced-motion`; 本地副本是如何
spinner持续为不要求运动的用户旋转,以及两个环如何互换中荷. 打开`role="status"`在排 拿着文本, 不是在第二个旋转器旁边。

这些是最经常被审查的。 每一个都存在 因为它的缺失 造成了真正的
虫 快点

** 项目范围检查不能证明在其他地方不存在节点。 ** 链接拒绝必须
命名工程边界并解释跨项目连接不支持; 不扫描其他
改进缺失点诊断的项目。

** 一个内存杠杆,可以放下终端的PTY客户端先询问现场工作门**
(单位:千美元)`terminal/live-work.ts`:没有tmux,pty是贝壳,"自由"释放杀死了贝壳.
探员在里面 一个隐藏/最小化窗口通过让每个节点读取来输入现有的杠杆
离屏幕( E)`terminal/window-backgrounded.ts`——再利用 不要增加平行输入
释放必须重新执行每个门的路径。

** 失败读取从来不是缺席的证据。 ** “无法衡量”和“什么都没有”。
不同的事实,必须保持 分辨的每一层。 折叠就是面板的结局
在一个运行的主持人上报告"没有会话". 当某物ACTS在负,给它三个
答案而不是两个——`present | absent | unknown`(单位:千美元)`TranscriptPresence`——并且让
只有积极的发现触发了行动。 问两个错误中哪一个可以恢复:冷
错误恢复一个已死会话 id 需要一条错误行, 而错误地丢弃一个活会话
打开一个空白的谈话 关于工作,用户认为正在继续。

** 降格为无,永不为错。 ** 失败的探测器意味着 赤裸裸的安全指挥
从来没有替换最近的匹配。 无法识别的手工编辑值必须产生保险箱
默认, 从未有比默认更具有破坏性的东西 。

** 节点的OWNERSHIP是持续状态,从不是一种活物体。 ** "这个节点遥控器/它的宿主是
“必须回答任何问题,
kill, a cleanup – 等一无所有时才到: 应用程序重启后, 屏幕关闭后
在公园计时器之后,为未打开的项目发布。`PtyManager.runEndSession`读吧
远离死亡的记忆`Session`而不是,所以删除了没有直播客户端的 SSH 节点 。`kill-session`在沉默中跳过** 并且它的一个杀死 发送到 LOCAL tmux 套接字`requireRemote`节点什么都没有;节点让画布被删除,它的`nt-<id>`保留
运行在主机上。 询问机器本地索引( E)`workspaceStore.sshProjectIdForNode`),并治疗
依據創用CC授權使用

** 你无法实现的副作用不是你所实现的副作用。 ** 这个`ok:false`规则是
不仅是阅读。`catch {}`环绕远程杀人折叠的"tmux说没有这样的会话"(a)
答案(AnsWER)改为"控制 Master is down"(一个无答,会话仍在运行). 分类失败
——当工作现在真的不能完成时,要么有正当理由拒绝行动,要么写作.
欠债,待会还清`core/pending-remote-kills.ts`) (中文(简体) ). 静静地放下它就是那个
选项。

** 服务版的签注规则为载荷**(安全审计2026-10;见CLAUDE.md →
服务器版签入). 登录尝试在读取其机体之前保留其速率限制槽
用二层门后面的响尾蛇声进行验证——永远不要`scryptSync`,使每个
终端。 一个新的 Author POST 生活在`/auth/`因此,共享的同源检查( U)`src/server/origin.ts`页:1
盖住 从回转对等端需求中获取信头`NODETERM_TRUST_PROXY_SECRET`.
只有环境,从来没有记录。

** 服务器版代理机在此服务器运行中只拥有新打开的节点。 ** 这个
创建器分类账是本地程序,绝不应从`.nodeterm/project.json`,标题,
钩子历史,或称幸存的 tmux 名称:皆可书写或 stale. 因此,重新开始即可
属性,执行节点/会话的通过,使持久排队的发射处于休眠状态。 元数据
突变和消息发送在写入任何文件之前验证每个目标; 缺少的证明是一个
表示拒绝。 对照一次性数据目录和端口验证服务器升级。 重新启动 a
共享直播服务
(a) 明确的操作者动作,绝不是试验或自动修理步骤。

** 您添加的画布控制动词`Canvas.tsx`服务器版不存在。 ** 动词
在 DESKTOP 渲染器的发送中运行;浏览器桥从未订阅`onAgentControl`,以及
服务器版的答案`/control/*`本身(`src/server/control-unsupported.ts`),仅服务`SERVER_V1_VERBS`穿过无头节点工厂. 其它的都一样...`list`, (中文).`arrange`, (中文).`move`, (中文).`resize`, (中文).`place`包括——获得命名的永久`control-unsupported-on-this-edition`拒绝。
即为不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、不可拒绝的、拒绝的、不可拒绝的、不可的、不可的、被的拒绝的、被的、不可拒绝的、被的、不可的拒绝的拒绝的、不可拒绝的、被的、拒绝的、拒绝的、拒绝的、拒绝的、拒绝的、被被的拒绝被的拒绝的拒绝的拒绝的拒绝的拒绝的拒绝的拒绝被被的拒绝的反对的拒绝被被的拒绝的拒绝被被被的拒绝的拒绝被的拒绝的被被的拒绝被的拒绝被被的拒绝的拒绝的拒绝被的拒绝的拒绝的拒绝被被被被被被的被被的拒绝的拒绝的拒绝的被被被被的拒绝的拒绝的拒绝被的被被被被被的拒绝的拒绝的被被被被被的拒绝的拒绝的拒绝的
离开拒绝,并钉在`control-unsupported.test.ts`。一个新的动词的旗门进入`src/shared`从桌面主控器中调用( 它从未运行)`parseControlRequest`),新的动词应该拒绝它不读名的旗帜(# 539)更确切地说.
而不是无视它。

** 一个平坦的终点站不是克劳德节点。 ** 它可搭载通用节点/端点线线,以便
手发射剂 报告钩子,但它没有得到`NODETERM_AGENT_ID`且无`NODETERM_CANVAS_CONTROL`直到序列化节点明确指定代理。

** 重新验证使用点**的手动编辑值,而不是按其类型。 设置
来源于git-shared JSON,最终可以插入贝壳命令行. 也一样
节点 ids: 用它们构建的字符串( 订阅签名、 要求或缓存密钥) 。`JSON.stringify`,从不加入分隔符——包含`|`或`:`否则伪造
输入另一个节点。

** 试验产生的贝壳。 ** 如果您生成 shell 命令, 请在实际操作下运行`/bin/sh`在树上。 一个完美的固定 不会告诉你`echo ##MEM`打印一个
空行因为`#`开始评论。

** 共享团队的远程指令生成贝壳,他们的测试也是如此。 ** 探测器
安装 上午`team`引证和杀人证实都包含在`src/core/remote-ssh/share-team-remote.ts`在真实中运行`/bin/sh`对抗假宿主
测试; 改变其中之一 在那里运行。 交接的杀手留在`nodeterm-rmt`仅插座, 精确`=nt-<id>`目标:在别处使用的每枚口袋杀手也会阻止
服务器核心`node-terminal`交接开始 见CLAUDE.md
"共享团队".

** 间接背景投票必须在SSH运输前绑定字节。 ** 从鞋带
文件的测量端, 保持原始字节中的偏移, 并区分闲读和失败
传票人可以退后。 目前尚不存在的笔录是闲置的,不是失败:只有克劳德.
在SessionStart移交路径很久之后,在第一个提示上创建它。 诱饵历史
仅恢复使用,绝不恢复任务/结果事件。`core/remote-ssh/transcript-window.ts`和真实壳的远程文本测试 将这个合同。

** 共享代理守护进程是现场会议基础设施。 ** Codex的应用服务器控制套接字是
共享资源`--remote`TUI 在账户范围, 所以停止或替换一个守护进程断开
每个附着的帆布节点。 管理下的发射装置必须把已经捆绑的线条保留在一个界限之下
主管: 仅在协议健康失败或已知套接字生成器改变时恢复, 永远不要
循环一个无关的客户端错误,在重新连接后永远不要重放原始提示。 探测a
在引用生命周期修复之前响应守护进程; Stale PID 簿记不允许杀死
工作会议。 见`docs/shared-codex-node-identity.md`。 。 。

** 一个普通的 Codex TUI 不得加入 Codex 自己的孰自启动守护进程. ** 从代码-cli 0.157.0 a
平面`codex`启动( 或加入) 1个背景应用程序服务器`CODEX_HOME`保留着
启动它时的窗格环境, 所以以后每个节点的钩子和工具壳都跟着运行
第一个节点`NODETERM_NODE_ID`(   (                   (  向其              (      在本届会议期间                  (                                                                             cubic                                                                                就这样           坐                     似宜 (                        向其                    在本届会议期间                                                  下                                            beans                                                                                就这样           坐                     似宜 `--no-daemon`将的城市里,
(单位:千美元)`shared/agents/launch.ts`通过`withCodexNoDaemon`),由下列来源提供食物:`ApprovalCaps.codexNoDaemon`新建
Codex发射场穿过这些组装器,并将盖子线条;从不打空字`codex`线条
你自己,还有AWAIT`ensureCodexLaunchCaps`(捆绑在)现场是同步的
当每个节点冷却器重启后,读取会丢失比赛。 中继标签或 SSH 节点必须是
传经为远程:客机或膝上型计算机的答案从来不适用于另一个机器的编码器. 这个
旗子永远不能碰面`--remote`(代码拒绝对), 这就是为什么管理下的发射装置条
参见 CLAUDE.md "Codex自动启动的共享守护进程"。

** 证书从不乘坐argv——当地或SSH。 ** 不是一个 tmux`-e`不对聆讯`curl -H`不是遥控器
命令字符串。`/proc/<pid>/cmdline`是股票Linux上模式444,远程命令行是 argv
在主机上:我们用这种方式运送了钩子手和机器上 图上的任何其他账户
并打开一个运行任意命令的终端。 以0600文件或**stdin**传递机密
(单位:千美元)`curl --config -`),并且从不添加agv回落. 见`docs/node-identity.md`,包括
我们SHOW用户复制的例子( 推推 Webhook 的卷曲管道在 stdin 上的标题, 以及测试运行)
放在下面`/bin/sh`为了证明它:用户粘贴着我们打印成的CI工作在共享的跑者身上.

** 钩套接字路径不是所有权证明。 ** 永远不要解开一个活的听众的钩子
套接字,或覆盖一个广告,其套接字/TCP听器仍然回答. 当地 stale 清理需要`ECONNREFUSED`和一个不变的套接字inode; 正则文件,
连锁和不确定的探测器被保存下来。 SSH 设置分配新套接字并发布
安装合格端点需经过无记名核查。 错误的无记名者回答 421 之前
任何处理器运行;只有明确错误的所有人反应(或运输故障)允许终点
失败 。 节点识别403仍为最终. 用一次性插座测试,从不运行用户的隧道. 增编.

** 钩服务器客户端发送不`Origin`和回转`Host`. ** 服务器拒绝两者之前
无记名者(一个浏览器页面 不要包含 DNS 重新绑定 ) 。 卷曲,节点`http`并获取, Bun 则获取今天使用时的所有符合; 一个新的客户端设置`Origin`,或将服务器命名为除此之外的任何事项。`127.0.0.1`页:1`localhost`页:1`[::1]`真的吗?`hook-server.browser-guard.test.ts`开真正的运输车 加上你的车

** 两个原始听众一起变化** -`src/main/index.ts`和`src/server/agent-status.ts`新建
字段上只到达桌面的钩子事件 静悄悄地离开服务器版
特性,而边框测试只能告诉你一个导入 错误,从不丢失一个字段。
任何钩子服务器签名更改也一样; 此 repo 已经将一个 shell 发送到单个 shell
诵三遍.

** 在一个薄荷矿点执行的一项规则没有得到执行。 ** 节点在两个表面产生——
画布( O)`createAgentNode`和电话's`projects.registerNode`(单位:千美元)`appendProjectNode`的
在其中一种情况下无声地阐明的制约在另一种情况下并不存在。 哪个特工
绑定一个管理下的账户"作为三角体生活在渲染器中,而电话腿则写下任何内容
电线发送。
把规则放在一个上游`src/shared`并且拥有每一个薄荷网站 问它,并获得
从它(一个节点的颜色)中产生的东西,
每一个呼叫者的状况。

** 建立链接的特征须遵守所有权规则,必须是计划的财产。 **
分享`~/.claude/skills`使用此账户"(问题643) 将每个系统技能链接到管理中
账户自有`skills/`并关闭时再次删除这些链接——一个错误的删除删除
某人真正的技能文件夹。 3种习惯使得它安全, 他们概括: 连接LEAVES,不是
包含的目录(节点将自己的画布技能写入`<configDir>/skills/`,所以一个
目录级别链接会将其写入用户的系统文件夹; 由一个
锁定 SHP( 连接`<name>`指针`<system>/<name>`因此,开关创造的
恰好是非开关删除的,而一个真正的目录永远无法符合条件;
动作前的REALPAKHS,因为同一特性的手工版本使得两个目录
一个连接到它 将会在您将要清理的文件夹中设置链接 。 校验
以真实的链接和真实内容来删除文件系统——一个被嘲笑的文件`fs`赞同
不管密码是什么 而发射时间扫描可能会重现,永不删除:所有权推断
从形状中无法从用户桦制的相同链接中分辨您的链接。

** 不要从 tmux 中去掉滚动。 ** 它拥有鼠标、回转和替代
屏幕。 之前的设计将它移动到模拟器中,在结构上失败;`CLAUDE.md`解释
为什么是详细的。

** 产卵-env 写法不能单独达到 tmux 会话。 ** 共享 tmux 服务器每个都使用
从它自己的Global env(从任何客户端 * 启动 * 服务器中继承) 新建会话的内存 ——
创建客户端的流程 env 只涉及列表中的名称`update-environment`(或通过)
作为非机密`-e`(对) 设置`env.FOO`输入`pty-manager`因此,为平原壳工作
倒计时,对于一个碰巧启动服务器的客户端,默默无所作为(或
更糟糕的是,将服务器启动器的值泄露给其他人)之后. 第419期就是这样
已运出:管理账户`CLAUDE_CONFIG_DIR`泄露到系统账户会话中。 每届会议新设
输入或加入`ACCOUNT_SCOPE_UPDATE_ENV`/ 网关列表, 或骑`-e`- 得到一个
real- tmux 测试 (`account-env.realtmux.test.ts`是图案)。

** 主机同步调用总有超时。 ** 使用`PtyManager.runTmuxSync`(第2节,`TMUX_BOOT_CMD_TIMEOUT_MS`从不裸露`execFileSync`在 tmux 套接字上: 1 运行于
第一个窗口存在,一个楔形服务器持有一个无限制的呼叫,只要它保持楔形
(4.05 s in a re灶). 在超时时警告并失败打开; 保持"还没有服务器"的沉默 。
每一个产卵的电话 都需要在停机后冷却
(单位:千美元)`TMUX_UPDATE_ENV_COOLDOWN_MS`),或者每个产卵再次等待同一个楔形.

** CWD Valerie: tmux客户端从未在节点目录中运行。 ** 服务器保存
启动它的客户端的 cwd, 而从 tmux 3.7 一个新的面板`-c`一次静悄悄的放弃
该目录被删除 —— 每个新终端在已删除目录中打开( 问题 # 1131, 测量)
页:1 本地 tmux 客户端产自`localTmuxClientCwd()`(家,别处)`/`页:1
窗格的目录骑`-c`仅此而已。 平板壳倒置是面板, 我只是保持项目 cwd.

** 新的键盘和弦必须在弹壳中幸存,而不仅仅是渲染器。 ** 应用程序菜单是
我们的`buildAppMenu`输入`main/index.ts`),但其命令式加速器——QQ,QQM,QQW,QQ0,QQB,
\\\的临时议程。`keydown`分支永远不要运行: 窃取和弦
回来`main/keydown-intercept.ts`因为`before-input-event`允许列表并转发它,像三个
已经在那里。 两条腿把菜单放下,而不是偷东西——第一终端政策和一个
武装快捷键记录器( X)`menuStandsDown`→`menuItemIdsToSuspend`,因为禁用项目会抑制
它的加速器 —— 重新装入(⌘R /⌘⇧R) 是命名的例外,它总是留在应用程序中,
因为它是撞车回收杠杆。 浏览器拥有不同的集 。 任何到达画布的和弦 都需要两个拒绝
这里有:当 kanban 棋盘覆盖时, 用户输入时则没有 。

** 新和弦不需要编辑到快捷键面板上,也不能得到。 **`ShortcutsPanel`其全部库存来源于`COMMAND_DEFINITIONS`(每节)`CommandGroup`标签`def.title`,从有效绑定的和弦),所以添加注册命令就是它所需要的全部
使其显示; 一个没有有效 4. 绑定的命令会被省略,而不是列出无和弦。`ShortcutsPanel.test.tsx`如果命令无法浮出水面, 则是监视器和红色 。 小组
将手列的24个身份证换成45个指挥员的登记册, 65.
——如果你发现自己在文件里输入命令ID,那就是错误的重新出现.

页:1`keybindings-handler-parity.test.ts`仅检查其编号`checkedIds`.** 增加一个新的
船上没有船,否则就找不到失踪的人`'<id>':`Canvas.tsx 中处理器条目
(处理器地图是`Partial`) (中文(简体) ).

** 评论意见解释其原因,并列出其预防的失败。 ** 密码库是故意密闭的
逻辑。 一个重复代码的评论是噪音; 一个说"不要简化这个回,
问题就在这里。

** 一个生成的sh客户端通过一个解析器读取其节点符号。 ** 每个POSIX -sh客户端,我们
释放( 管理下钩脚本,`nodeterm.sh`希望你能帮我`context.sh`)通过
电话`nt_read_node_token`从`core/agents/node-token-sh.ts`- 从不通过重制版`head -n 1 "$NODETERM_NODE_TOKEN_DIR/$NODETERM_NODE_ID"`。该副本是第384期:
在 tmux 创建时它得到的FILE 路径上被固定为生命,所以客户端只相信什么
在文件陈旧或无法
单凭钩脚本就能痊愈 同一个节点通过一个客户端证明了自己 被拒绝了
换句话说,

** 本地生成的sh客户在其嵌入门前恢复共享-Codex身份。 ** 一个代码工具
外壳是被测账的应用服务机奏效的 所以已经`CODEX_THREAD_ID`但窗帘没有`NODETERM_*`管理下的钩子,当地`nodeterm.sh`和本地`context.sh`必须预先支付`codexThreadIdentityResolverSh(codexThreadIdentityRoot())`检查前`NODETERM_NODE_ID`或者说`NODETERM_CANVAS_CONTROL`。保持 SSH shim 常数的机器中性:烘焙桌面/服务器
记录进入远程主机的路径既是错误的,也存在本地泄密。 警卫测试执行
(单位:千美元)`remote-shim-neutrality.guard.test.ts`)),因为漏水是无声的——远程的shim保持.
工作,没有红。

** 编码钩由有效载荷确定,而不是由内壳确定。 ** Hooks 共享应用程序服务器运行是
守护神的孩子:他们携带守护神的巢穴(常常是僵硬的笼子)`NODETERM_NODE_ID`(没有)`CODEX_THREAD_ID`密码钩脚本读出有效载荷的领先`session_id`在序曲之前
并让线程记录排在继承的 ID 之后;只有标记的窗格`NODETERM_CODEX_PLAIN=1`(发射装置的进场出口)保持自己的状态. 不要将读取的代码有效载荷移回下方
前奏( 单曲)`codex-shared-daemon-hook.test.ts`运行真实的脚本对真实的钩服务器).

** 该序曲可能不会决定任何已经决定的格子。 ** 它输出代理人 id 和
画布控制允许所有者记录 永远不变 以前是硬码的
(单位:千美元)`codex`,而且两者都是`buildPtyEnv`答案: 继承要在 codex 中保存的自定义代理
为`custom:<uuid>`,而补助金来自`canControlCanvas`。如果添加一个字段,则前奏
输出时,将它放入记录的 HMAC 中,并让桌面重新切换任何允许
能力——绝不接受客户的言辞. 放弃而不是假设:工具壳
缺少一个动词 它的窗格是一个错误报告, 一个工具外壳持有一个 它的窗格被拒绝是一个
安全问题。

**  96. 将数据输入这些记录的外壳不能按类型核对是否正确。
正在对空間外的空間外的空間外的空間外的空間外
排在后面的争论, 两者都是井然有序的—— 所以特色船 惰性与绿色套房。 扣紧
源一级布线(`codex-identity-record-wiring.test.ts`, (中文(简体) ).`hook-verified-parity.test.ts`) (中文(简体) ).

** 溪流错误不是您可以捕获的掷球。 ** 当写到`process.stdout`页:1`stderr`失败——`EPIPE`在一个封闭的管道上,`EIO`在 macOS 撤销一个关闭的终端的 tty 之后—— 节点报告
排放`'error'`稍后在溪流上刻出一个勾选,以及未处理的默认值`'error'`事件为
杀死这个过程。 它所携带的堆栈在书写时被捕获,所以撞机*读 * 仿佛它像它一样
发生在你的同步`console.log`,并包装该调用`try/catch`无变化
(测量于节点22). 如果你写到一条可以离开的溪流竹丛,请附上`'error'`听众和
把作家关了...`installLogSink`(单位:千美元)`src/core/log-sink.ts`)是实例。 问题382.

** 一个已死或悬浮的流程记录下来,从未采取行动。 **`child-process-gone`窗口`unresponsive`页:1`responsive`和外部的 WebGL 上下文损失,每个上下文写一条标记的行到
调试日志环( E)`main/process-health-log.ts`, (中文).`[webgl]`输入`terminal/webgl-budget.ts`也没什么
别的 Chromium 重生它自己的 GPU 进程; 重装或重发其中的 GPU 重置
进入失败的会话。 如果增加损失路径,请报告`handle.contextLost(kind)`所以说
外在数和我们自己分开`loseWebglContexts`释放

** 重试预算必须衡量它所等待的东西,耗尽的资金必须是VISIBLE。 ** 这个
武装发射圈(控制筒)`--after`和寒冷打开a`--project`节点得到)
5×400毫秒的平价预算 由Canvas 控制节点时开始
项目切换器是用在加载帆布、安装节点和产卵tmux和发射上
在会议之前就放弃了 第569期有两个规则:
真实信号( E)`isSessionReady`,由节点发表,当其壳结时)而不是在一个
ùادي ال ال ال ال ال .`console.warn`- 那个
节点显示( N)`state/launchDelivery.ts`QUEUED徽章的+工具提示)和帆布控制
答复随附(`queued`页:1`queuedIds`),因为无法看到失败的用户和
听说"打开"的管弦乐师 都在一场没有的会话上表演 添加边框
在任何地方重试时,请询问时钟实际是怎样开始的,它耗尽之处变得明显.

** 所持发射装置是一个执行场,无人能读到的大门仍然关闭。 **`pendingLaunch`是一个
命令在等待结束时键入 shell, 所以它是 MACHINE-LOCAL 喜欢`shell`(单位:千美元)`src/shared/node-exec.ts`: 它搭乘工作空间. json's`localExec`,从不分享`.nodeterm/project.json`,则对等者或中继嘉宾的值会下降`canvas:mut`。写作
您的渲染器作者进入一个背景工程`applyOwnNodeMutation`从不
端点路径`applyNodeMutation`(它剥离发射,无法清除). 当一个值被读取时
(workspace.json 仍然手动可以得到编辑),`normalizePendingLaunch`(单位:千美元)`src/shared/pending-launch-shape.ts`运行在两个序列器接合处:a`after`这不是一个列表
用来在画布的依赖签名选择器内抛出. 它的规则,以及任何新的规则
添加的闸门(`--after-success`等待是最新的 : 无法读取的值
拿着`manualOnly`或者从不满意,从不"没有门"——放下它会提早启动节点,
一个已经发射的依赖,不能解除发射。 一个新的门场也进入那个模块`KNOWN`设置,以及`launchesToFire`必须将缺失的上下文视为已关闭。 如果两个贝壳都评价
(服务器版的无头工厂发布它自己持有的发射门),将评价放入`src/shared`在形状旁边,如`@shared/station-outcome`,所以桌面和服务器
不能对受抚养人何时开始有异议。 永远不要让一个门 读它的"满足" 从一个
file:一个git承诺的成功可以要求释放每一个等待它的人——该站的
报告生活在一个瞬态核心存储器中,其板日志行仅显示。

** 绝不移动用户在背景代理上的观点。 ** Canvas 控制请求路线
UNURCE 和 React Flow 仅持有 ACTIE 项目的节点——所以用来前往
接听前的电话项目 对于一个被屏幕劫持的OPEN:用户正在观看
项目B,项目A运行中的代理`open-claude`,标签开关和A的保存的视图端口是
应用,所以相机看起来会跳跃和缩放. 规则现在有三个层次, 所有成员名单
输入`renderer/lib/controlRouting.ts`编号 :`STORE_ANSWERED_VERBS`("两端均不需要画布")——`list`, (中文).`send`, (中文).`reply`, (中文).`sticky`, (中文).`open-project`, (中文).`settings`), (中文(简体) ).`canColdOpen`(需要一张画布,但是
连载一个会做。"`open-terminal`, (中文).`open-claude`, (中文).`open-agent`,写入自有
项目的节点已储存,发射时携带武器并报告`queued: true`和(或)`answersOffCanvas`(......)和没有什么可推迟的"——`show-image`, (中文).`show-video`, (中文).`show-web`, (中文).`open-browser`,其
节点没有会话,
真实` and never `(已排队). 任何在已经存在的节点上起作用的东西 仍然在旅行,因为
它读到现场状态 序列式副本不携带 -`browser`他们是其中之一。
挂载`<webview>`宾客,不像`open-browser`,只放节点。

将动词放入两个屏外层中一个时,需要结转三件事. ** 演员
项目是资源库**:`ctlProject`决定 ssh 旗、 浏览器会话密钥和媒体
允许列表路由和读取`activeProjectId`给一个背景探员回答,不管他是谁
人类在看 ** 没有任何东西可以到达现场画布**:`setNodes`页:1`setControlEdges`页:1`markDirty`地址 ACTIVE 工程, 从而写入`applyNodeMutation`+ 键`appendCanvasLinks`+ 键`writeDisk`和**告诉人类** - 答复给代理人,所以没有
任何地方都没有报告一个节点落在另一个项目上;它很粘,因为它
描述用户未观看的工作。 当添加动词时,决定它位于哪一级——如果
您改变什么动词 D所提供的 DOS, 更新`buildCanvasSkillBody`/ 我们还是`buildCanvasControlInstructions`输入
同样的公关,测试 红色在 stale 索赔(`src/main/canvas-control-core.test.ts`) (中文(简体) ).

** 在文件夹中标注一个项目是WRITE——在捆确认了之前的探测器。 ** 我们走着瞧
写给`<cwd>/.nodeterm/project.json`,所以,一旦项目得到`cwd`下一个 让自动保存
拥有文件。 "打开文件夹..." 总是被探测和通过; "设置文件夹..." (tab QQ) 用来绑定
无条件地, 画布上一个队友 承诺的回波, 他们的节点消失了,
也没什么备份3 3 3 3 3`renderer/lib/setProjectFolder.ts`:
一个被占用的 * 或无法读取的 * 项目文件拒绝绑定并说原因 。 商店的"从来没有"
盲写"卫士不会救你——它只拒绝EMPTY画布覆盖人口稠密的文件.

** 每个工作空间条目都是REF——内容在文件中,在条目上的机器本地状态。 ** 还有
三种类型,它们现在共用一個外形: 一個目目(S.`<cwd>/.nodeterm/project.json`,git-shared),),"",",",".
SSH 参考文件( 主机上相同的文件, 离线)`cache`),和一张没有cwd的画布
(单位:千美元)`userData/inline-projects/<id>.json`,带有条目`project`字段作为缓存保存
释放这么老的建筑 仍然读它。 有两个习惯 ** 内容输入文件;任何内容
这台机器与另一台机器有合理的分歧——项目代号、视图、默认
账户、面包屑、闭片历史、节点`shell`举行`pendingLaunch`——进入指数条目**
(英语)`IndexEntryV3`),或 a 。`git worktree add`/ 二审将一个机器的状态交到另一个机器的状态.
还有**`workspace.json`是一个有最后写手胜语义歪的文档,所以它对上述语义可能不是唯一的家
包含任何内容**:这正是让第二个应用实例抹去一个没有cwd的画布的原因. 之间
仲裁人是文件的`rev`低调的反光线从不覆盖高色的反光线,而且
没有合并; 如果您添加了第四类, 请给它一个文件, 并说哪个 rev 赢了 。 第四个是
文件夹- data- ref( issue # 1145: 一个在应用数据中保存画布的文件夹项目): 它的文件是
一号线`writeDataFile`规则在个案之间决定,而rev 继续移动
在文件夹和应用程序数据之间。 任何读写`<cwd>/.nodeterm/`必须问`folderFileCwd(e)`永远不要`e.cwd`单独——项目可以有cwd和
在它的文件夹里什么都没有。 这样的工程的侧面文件由节点 id( 白板) 键入到它自己的下面
app-餐馆数据根, 绝不进入文件夹中每个项目共享: 两个文件夹持有一个承诺的画布
共享节点ID。 还有`lastWritten`是记录,而不是文件在磁盘上的证据:文件
可以在商店后面留下文件夹(`git rm`,退出),因此,任何内容都不可删除
因为店里记得写它的替换。 数据文件扫描询问“保存”写了什么 。

** 没有文件夹的项目是一个真正的项目——明确降解,绝不沉默。 ** "新项目"
创建无 cwd 画布,所以每个文件夹形状的特性都会遇到一个. 保持负担和
以理由禁用它(`NEW_FILE_NO_CWD_HINT`,`WORKTREE_NO_CWD_HINT`,“探索者/源控符”;
无,以及一个给错误原因命名的信息(对于一个没有
文件夹要成为之一)会向用户发送一个不存在的问题.

** 启动一个项目。`gateProjectOpen`(单位:千美元)`src/renderer/lib/projectLimitGate.ts`),开放的新方式必须称之为——看`docs/project-limit.md`∗∗∗ 载于E/CN.4/Sub.2/2002/L.10号文件。

** 代理特性附着在基部控制能力上,而不是前端允许列表。 ** 定制代理商可以
继承一个内置的带子,所以添加能力和它的一个共享的叶子(`src/shared/agents`和(a)
让每个UI都问帮助者。 在菜单中重复Claude/Codex/etc的案例,打破继承和
最终漂流.

** 从未在源文件中设置原始 NUL 字节——写`\x00`。 ** Git 分类一个包含的文件
作为 *binary *,所以它使得每个diff表面的"Binary文件不同"(PR页,`git diff`, (中文).`git log -p`和(或)`git grep`跳过它。 仍然在编译 测试还在通过 所以没有失败
——文件只是变得隐形审查,这是最糟糕的处理错误的方法. A级
分离器或监控器是想要字节的一个很好的理由;越狱是同一个字节,并保留它。
文件文本。`src/shared/source-hygiene.test.ts`在每个跟踪器上执行这个`.ts`页:1`.tsx`。 。 。

帕斯交叉机器,所以治疗`\`成为分离者,无论你在哪里分裂。 ** 数值在`.nodeterm/project.json`由一台机器书写,在另一台机器上验证, 所以一个守卫读`\`作为普通文件名字符,对于能解决它的机器来说是完全错误的。 这个
已经产生了一个真实的漏洞: 切换的检查`/`独自看见`./a\..\..\x.png`作为单一的无害部分 在*每个*平台。 分开`[\\/]`,倾向于接受两者
方言同时只存储一个(实例见 CLAUDE.md中的**节点图标**).

*加拿大边都是*`type: 'floating'`,则一个关系得到一个边缘。** 未设`sourceHandle`页:1`targetHandle`在边缘对象上——导出路径从两个节点计算'
矩形( R)`renderer/lib/floatingEdge.ts`),而固定的一面就是将一个边缘送到一个节点的位置。
整个画布的源头循环 不要增加第二个边缘家族
关系 绳子已经携带:`--after`是一个**rope** 其破碎的“等待”外观是 DERIVED
从目标`pendingLaunch`。 。 。 。 。`renderer/lib/edgeModel.ts`),而背景桥梁也
写作会藏在下面 一个`open-claude --after`用来在一个节点上降落三个边缘.`src/renderer/canvas/edge-model.source.test.ts`针头两半

** 画布布局是GEOMETRY,其两半生活在不同的文件中。 ** 保存的 瞧 :
结点和别的东西:它从不创建、删除、重命名、重命名或重生一个,从不
触摸 tmux 会话。 简介本身`Project.layouts`)是CENT,搭乘g见上文`.nodeterm/project.json`,而这台机器的相机的每个布局(`Project.layoutViewports`)为
机 - 本地和乘车`workspace.json`旁边`viewport`和`breadcrumbs`。恢复适用
相机为`setViewport`,按`fitView`规则如下。 删除布局并更新到
屏幕上的安排首先确认, 因为布局编辑不位于撤消堆栈中; 还原
没有,因为它是。 对话框是否声称编辑到达其他人`layoutIsShared`,对于一个SSH项目和一个文件夹。

** Keep-alive webview 鬼魂必须保持挂载,但不得进入微缩图几何. **
他们用`display:none`,而不是反应流`hidden`(解载客. 显示布图
结束`VisibleMiniMap`: 它在共享时, 在只包含小型映射的商店中过滤绘图和边框
现场摄像头 单是透明的矩形仍然扭曲了地图的尺度.

** 反应流`fitView`已排队,而不是立即——永远不要使用它来自动设定某种内容。**
责备它`fitViewQueued`和合体从后面运行`setNodes`(每个节点只有一次)
测量)或下一个`updateNodeInternals`无论节点的检查结果如何,
显示屏幕中间的画布来源。 计算视图
自己去应用`setViewport`(单位:千美元)`renderer/lib/nodeFocus.ts`, (中文).`canvas/fit-view.ts`),哪个
现在的陆地和你的画布。`fitAll`是一个故意的例外:
用户在固定画布上的手势 。

** 上下文菜单为深两关,第三关则默不作声。 **`ContextMenu`使子菜单中的孩子与`if (child.type === 'colors' || child.type === 'submenu') return null`没有错误,没有警告,
Add1 屏幕上什么都没有 这很重要,你看不到的地方 克劳德和科德克斯的账号
拾取器本身是子菜单**,所以将其中的一行移到另一个子菜单中删除
对管理过账户的用户来说,
别的 如果在添加菜单中组合行,请从`isPinnedAgentEntry`(单位:千美元)`renderer/lib/addMenuSpec`而不是用眼睛来判断 永远不要拼写身份证明:
排位居顶端的是由排位本身的形状加成的`ACCOUNT_CAPABLE_AGENT_IDS`,所以一个新的
代理在添加当天被处理 。 上限以`components/ContextMenu.submenu-depth.test.tsx`; 如果您教授组件第三关, 那么
{\                                                                             ء                                                                                                                                 测试                                               

** 添加节点类型意味着触摸添加菜单一次,而不是四次。 **`renderer/lib/addMenuSpec`拥有哪些类型是可添加的,如何组合,用于画布
窗格右键单击,会话边栏“+”和停靠。`ADD_ITEM_GROUP`总计`Record`结束
因此,新的类型是一个**编译错误** 直到你找到它。 坎班专栏
"+新会话"故意不是消费者——只能提供成为卡片的种类——和`addMenuSpec.surfaces.test.ts`分解的针头,所以"让它们都一致" 保持决定
而不是反应

** 取整个键盘标记本身的表面`data-nt-keyboard-owner`** 画布
决定从焦点元素中“是用户打字” (`isTypingTarget`和一张画布,
或者基于以 div 为基础的编辑器——白板的 Excalidraw—— 不是一个文本字段来检查,所以 Space,
删除和QQZ 到达了帆布命令 。 属性被每个打字意识键所尊重
网站通过`isKeyboardOwnerTarget`(单位:千美元)`lib/keyContext.ts`; 添加新网站,而不是类列表.

** 一个节点的自有文件由id处理,从不通过节点数据路径处理。 **`project.json`为:
git-shared and hand-editable,所以其中的一条路径是攻击者控制的: 白板的侧文件是
由核心( 项目, 节点 id) 得出 (`core/whiteboards.ts`),而ID必须是字符串
通过`isSafeNodeId`一份副本提及其原件,作者:`whiteboardSource`侏儒家 而不是路边

** 新节点类型也获得用户可以更改的默认大小。 ** 把它加进`SizableNodeKind`页:1`SIZABLE_NODE_KINDS`(单位:千美元)`shared/default-node-size.ts`和(或)`BUILTIN_NODE_SIZES`并放置在`placeSized(kind, …)`在工厂里 字义`*_SIZE`转至`placeNode`正在编集 。
静悄悄地忽略了设置 → 行为 → 该类型的默认节点大小 。

** 在挂载时读取的设置是DEFAULT,而不是用户的。 **`useSettings`开始于`DEFAULT_SETTINGS`和来自磁盘的水合物同步,同时`<Canvas />`于该日期前挂载
陆地 页:1`useState(() => settings.foo ? ...)`因此,初始化器读取已发运的默认值,
永远不要看,所以一个选入的特色船 惰性与绿色套房, 没有错误任何地方。 门
打开`hydrated`(第一次发射同意对话和`settings.rememberCanvasLock`已经工作
页:1 如果同样效果 WRITES 你在第一个运行时选中: 否则打开设置
中会话将存储状态应用到用户当时正在做的任何工作上,这是不同的
从他们要求的特性。

** 加拿大的`nodesRef`页:1`nodesProjectIdRef`是最晚的一对,不是制造的。 ** a 期间
工程切换一个 zustand 写入 Canvas 在 Synclane 在负载默认Lane 之前`setNodes`因此,在一瞬间, 校对命名 即将到来的工程 而渲染`nodes`仍然是即将离任的`canvas/nodesEpoch.ts`) (中文(简体) ). 事件时间代码(承诺`canvas:mut`接收路径, 创建) 读取 refs; 将标签与 RENDERED 配对的代码`nodes`(a) 联合国
渲染时间发布, 已键入效果`nodes`)读作`renderedProjectId`。对等操作启动
只有当`liveCanvasHolds`反应流说有这个项目,它的`setNodes`正在运行
(单位:千美元)`rebaseOnLatest`) (中文(简体) ).`nodesEpoch.test.tsx`复制带有真实反应的窗口; 永远不要将其包裹`act`将两条车道冲到一起并隐藏起来

尽可能扩大定位和重新确定重点必须使用同样的可测量的矩形
(单位:千美元)`measureMaximizeInsets`:固定侧面板加上持久的顶端控制和底端码头.
不要硬码铬高或增加两次外部边距;瞬态菜单不得调整大小
终端。 普通的焦点和区点 保持自己的政策。 测试最大化的唯一
通过重点决定`viewportForNodeFocus`同一个帮手Canvas打电话,而不是
将预选的设置直接传递到几何函数。

** 用户读取区分失败读取空数据。 ** 对于克劳德,显示失败的时候`status`这是`error`且限制是空的 我们知道的
当限制仍然存在时。 保持单一账户和多账户的视图。

** 环境能力需求会议出处。 ** 克劳德很有效`CLAUDE_CODE_MAX_CONTEXT_TOKENS`仅以经核实的节点身份接受,并验证为
正十进制安全整数。 永远不要在另一会话中读取该应用的全局内涵或让一个
模型家庭猜想扩大了观察到的极限。 不可观察的克劳德窗口是标注的估计数。
制造器通过`context.ensure`;它不会恢复克劳德分母
存储。 其他特工则保留记录窗口的持久性。
只有明确的保证可以重放一个没有ىلع 的活的快照;重复的钩子观察不能
再说一遍 远程路径, ControlMaster 或连接更改取代履带生成.

** 载有指令的终端打开(问题653):** 共享的钩-服务器路线需要验证
节点身份`open-terminal`携带`cmd`,包括空值或空运行。
严政凌驾 和外国势力的退缩 不能释放这个大门。 桌面平面
终端打开时保留其现有的身份政策; 服务器版仍然需要验证
对于每个控制动词。 遗留的移动/SSH 呼叫者必须提交此实例的节点符号
含有命令的打开;这不添加人-确认对话框或更改移动运输 API。

Grok计费诊断必须保留HTTP代码和每个计费视图的安全故障类别. 从不向UI发送原始错误消息,URL或响应机构;证书仍然只读. 一个失败的视图并不能证明没有配额,即使另一个观点回应.

** 电话聊天动词(`chat.page`页:1`chat.status`页:1`chat.send`页:1`agent.answer`** 全员合同`docs/mobile-chat-view.md`§3. 三项规则将公关发回:
- 电话只发送一个`nodeId`** Cwd、账户、代理、会话ID和远程路由来自
这机器的记录。 永远不要添加让手机命名路径,会话或主机的参数.
- 这`chat`依赖是可选的,每跳**(主机服务处理器,`HostSessionOptions`, (中文).`HostBridgeDeps`)),所以把它扔到任何地方仍然编译和将动词作为"未送达"来运输.`host-chat-wiring.test.ts`标定链条; 添加跳动时扩展链条。
- ****`'unconfirmed'`**/从从从从从从从从从从从在适当时候从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从,从从媲从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从现在已经从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从的适当从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从
已输入。 没有任何东西可以把它当作"安全地 我可不想再发送": 手机保存草稿,重新阅读,让我们
由用户决定。 仅限`'refused'`意味着没有打字。

** 联合国`nodeterm://`链接。 ** 链接无法证明是谁发送的(任何网页都可以建立),所以
肯定表是它的全部权威。 关闭, 除非用户打开`settings.allowOpenLinks`和主检查旗本身。 四项规则是把公关送回去
-**没有权力旗帜。** 链接打开了项目默认许可模式中的一个节点. 从不添加
许可模式的参数,`--after`,一个模型,一个计数或"不问而打开"(签名链接)
设计`docs/superpowers/specs/2026-10-13-open-link-design.md`是唯一计划跳过的方法
(表单)
- ** 制造器只选择。 ** 它的答案是一个候选人 id 主报价,"新项目",和a
标题。 最终开放时的 cwd 和 lain 来自于主(`src/main/open-link.ts`从不
回复。
- 永远别打开它 仅点击 Open 的指针, 在 1 s 臂后 。
- 人所看到的是运行。 提示或路径中没有隐藏的 Unicode (S)`hasHiddenText`),无
路径可以到达另一台杂种机,而显示的权限模式在着陆 cents时会重新检查。

□ 用户拥有的代理设置

** 代理商的全球配置中除了`src/core/agent-integrations.ts`** (问题)
744号 钩子、技能和其他东西`~/.claude`, (中文).`~/.codex`, (中文).`~/.gemini`, (中文).`~/.grok`, (中文).`~/.copilot`打开代码的配置目录,`~/.agents`本地或SSH主机只安装
对于一个代理,用户 ENBELD 在`settings.agentIntegrations`当他们退避的时候,
独自一人,而他们没有答复。 不要在安装器上添加直接调用; 将文物添加到
寿命周期(当地)或`RemoteHooks`文物在实施计划时,
只删除节点方案所写的内容。`src/core/agent-integrations-wiring.test.ts`新调用失败
网站。 ** 每个靴子上的文件节点写法绝不是事先同意安装的证据** —
祖父检查( E)`detectExistingIntegrations`)计算了总是写好的用户Data shims和
默默地启用了新安装第二个启动的每个代理(# 1149) 。 只有一个非空的`~/.nodeterm/agent-hooks/`计算,并且只在安装的第一个靴子上(新安装标记). 不将文本合并到`AGENTS.md`页:1`GEMINI.md`——代理员掌握技能(渐进披露).
旧街坊挤满了Codex的32KiB指令预算

** opencode 有两个管理好的插件,必须保留两个**(问题#1136): 1.x 文件`plugins/nodeterm-status.js`仅导出命名的函数 — 打开代码 {} 1.2. 10 调用每个导出
作为函数并在默认对象上死亡,对于机器上的每一个命令——2.x得到
目录`plugins/nodeterm-status-v2/`,没有1.x负载。 2.x插件在内部保持安静
共享`serve --service`服务器( 其env 属于另一个窗格); 参见 CLAUDE. md
测量。

Claude/Gemini 设置必须经过在`src/core/agents/hooks/{settings-file,remote-settings-file}.ts`。确认的缺失或一个成功读取的空/空白文件可能从`{}`· ;
畸形,非对象和不可读文件必须维持不变.
保留不相关的设置和外国钩控器。 舞台写作,串行节点作家,
,并在发布前再次比较原字节;永远不要使用`cat … || echo '{}'`或一个
全部读取回退。 本地和 SSH 对齐配置文件更新和锁定已解决的目标而不替换
链接; 发布前重新检查分辨率。 SSH使用纯读链接和cd -P(无GNU -f),
并拒绝拖动/循环链接和新线路径。 相冲突/ 存储锁跳过安装
(c) 不得从其他工艺中盗取锁。 这些锁
协调节点,而不是外部编辑器,所以不要声称一个全系统比较和扫描的文件。
** 创建代理节点不是开始的证据。 ** 控制打开保留他们的发射命令
在确认 ♪ 并报告 ♪`queued`卷之七 博览会
仅证明交付;没有代理证据,从未将其描述为健康/运行的代理.
每次发射都使用回声验证指令编写器(`@shared/command-delivery`,没有`sendText`编号 :
现在桌面自动运行,桌面无头开始,服务器版立即启动
打开和`run`(最后三个通过)`core/headless-launch.ts`) (中文(简体) ). 服务器版被推迟`--after`释放(`refreshArmed`剩下的一个`sendText`在采取必须采取的行动之前
从不创建会话。
通过 shell 结算/ 卸载保留未提交的 UI 意图 。 新意图携带`attempted:false`· ;
桌面和服务器保存`attempted:true`输入前。 从来没有尝试过温暖`--after`发射时间:
进行 shell 验证后进行; 尝试/ 遗留- 未知意图需要马上运行 。 仅确认
呈文澄清了意图。 使用桌面打开的回复`createControlOpenBatch`排队核算;
保护合同 并同时提交行为测试 
重排队列/ 重排发射, 运行现在被拒绝, 直到存在范围持久要求 API 。
一个新的中继 UI 初始命令可能通过已验证的写入器运行一次在新的 PTY 上,而不使用
工作空间写入或等待 Launch 创建 。 在炮弹安顿之前,保持其短暂的尝试;
永远不要在重载时重试或序列化它为持久意图.
永不绕行中继工作空间负载以保存:负载只能包含一个共享的项目,
同时保存替换整个主机索引。 输入前已停放的项目推迟会实质内容
永远不要尝试;它不能毒害作者或触发重试计时器。
持有的桌面发射装置保留其连带的离屏幕的运输工具(大扇外费用)
(记忆). 服务器延迟发送是一发:失败的探测器/发送需要明确恢复.
无头开始( E)`--run-now`页:1`run`,# 925)遵循同一合同:索赔在
任何产卵,而"开始"是指经适合于回声验证的编剧提交了线条(从不表示代理商是
健康。 桌面释放其无头客户端, 所以没有持续终端的启动
后端失败`not-persistent`将节点按原样交回(冷开仍为普通)
排队的节点),而不是留下一个贝壳,使下一个挂载将孤儿. 通常这种拒绝
如果后端在探测器和产卵之间消失,那么它就会被普通的贝壳覆盖
在打字前就被拒绝了 释放它会杀死它 远程( SSH) 节点和任意
SSH旷建工程的节点,在索赔前在制造器中被拒绝(`remote-unsupported`),这是
主栅栏。 作为一条腰带
在它后面,一个SSH-Project节点的要求携带`requireRemote`,哪个`desktopHeadlessRequest`继续,所以核心`spawnNew`而不是在本地产卵 保持两条栅栏。

□ 性能

在优化前进行测量,然后将前后置入承诺中。 CLAUDE.MD区
** 绩效:计量,然后确定计量名称** 的方法(CDP与`npx electron-vite dev --remoteDebuggingPort 9333`和它产生的规则。 那些
咬伤次数最多:
- 无限CSS动画保持整个窗口重新油漆的显示率. 击破它。
- 从不放`will-change`在 React Flow 视图端口。
- 怎么样?`handleNodesChange`不能打电话`onNodesChange`带有空批次( 它重递画布 祝你好运 )
每个帧通过 React Flow 的调整大小观察).
- 项目开关上每个终端的工作必须连成一体,先上屏幕。
- macOS内存压力来自内核水平(`onKernelPressure`输入`core/memory-pressure.ts`以同样的严重性,最多为每一次。`KERNEL_LEVER_GAP_MS`(每秋天都会轻轻地拍动正常/警告重装). 永远不要重燃它
保持水平,永远不要通过`hostMemReader`页:1`MemInfo`:会议收割者分享读者。
- 坎班板下的终端不能画 CSS 无法停止 xterm; 它的渲染暂停是`terminal/board-render-pause.ts`。每个“是董事会”检查包括Omni董事会
(单位:千美元)`isGlobalKanbanOpen()`),而董事会从不提供驱动的能见度判断
休眠和WebGL预算.
- 用一个逃出来的 搜索大型记忆文字`RegExp(q, 'iu')`每个查询,从未`toLowerCase()`每个条目(标记索引:20-52 ms + 7-15 MB垃圾 → 2-13 ms + 0 MB / 搜索).
- 拆除每个摩纳哥模型 你的节点在卸载时创建。 TS/JS工人(整体)
编译器隔离)只有在没有留下TS/JS模型时才会停止(`renderer/editor/tsWorkerReaper.ts`) (中文(简体) ).

页:1`ssh2`和`electron-updater`首次使用时装入, 从未在主模块范围** 运行
在铬之前`ready`(每次发射 使用“ 进口”
类型` for their types; values come from `ssh2() (中文(简体) ).` in `土生土长` and `输入更新器's`loadUpdater`。 。 。`src/main/lazy-deps.source.test.ts`输入值时为红色。 页:1`require()`这是
未达到olph/%s`vi.mock`,因此一个测试会注射其双倍(参见更新测试).

** Windows**上的SSH项目运行在进程内传输(`src/core/remote-ssh/native/`), (中文(简体) ).
不是Ssh二进制 如果您添加了 ssh 呼叫网站, 请通过`useNativeSsh()`喜欢
其它,如果您添加 ssh 选项到`control-master.ts`教学`ssh-argv.ts`关于它
parser 故意拒绝未知选项。 从 macOS/ Linux 测试`NODETERM_NATIVE_SSH=1`。解决 ssh
程序为`resolveSshProgram()`(决不莹然私自)`findExecutableSync('ssh', …)`在视窗上
也许是赤裸裸的`ssh`哨兵,只有本土的跑者才能服役.

** 服务器版所覆盖的本地添加的依赖是`--external:`输入`server:build`** 主机在后方构建捆绑`npm ci --ignore-scripts`,所以不编译附加词
在那里,重建失败了`.node`要求它不能解决(或汇编附加IS的地方,
它没有装填器。 没有建立服务器捆绑的 CI 任务, 但是`src/server/server-build.test.ts`把它建在两个视图里 然后红掉 服务器运行于 a`node_modules`树,所以一个外部在运行时解决.

** 从未填充`swapTotalMb`页:1`swapFreeMb`(中文(简体) ). ** 收割者的交换术语读取他们, 一个 你肯定是
大部分的交换可以持续数小时 所以它会燃烧一整天 内存药丸的交换图
只能在`MemInfo.display`,没有别人读。 CLAUDE.md,会话记忆.

□ 测试

# 带着刮伤离开套房 #`HOME`,并知道其他的点 在你的真正的配置。 ** 那个工人
设置( E)`test/setup/agent-env.ts`(条)`CLAUDE_CONFIG_DIR`, (中文).`CODEX_HOME`, (中文).`GROK_HOME`, (中文).`COPILOT_HOME`, (中文).`GEMINI_CLI_HOME`, (中文).`XDG_CONFIG_HOME`页:1`NODETERM_*`会话变量,因为
一个从节点代理会话内部运行的套件继承了它们,并在测试中解析代码
他们的LIVE特工 配置目录——一个刮伤`HOME`单凭一个测试并没有阻止它重写
运行会话本身的技能和钩子(# 744). 测试需要自己设定

** Screenshot paste每个手势都有一条路线。 ** 在 macOS 上, Cmd+V 保存/上载一个文件
粘贴其路径; Ctrl+V 属于前景程序. 节点配置的代理不存在
证明前景剪贴板-图像支持。 保持 shell/SSH/Server 文件的路由和抓取
对随附文本的压制; 不合成 Ctrl+V , 或尝试没有一条路由的两种路线
能力和接收协议。 快捷键会记录这种区分(# 712)。

标题栏的滚动视图端口自有`no-drag`区域。 不添加`app-region: no-drag`切换到标签或他们的后代:电源可以从屏幕外的矩形中减去
wordmark的拖动区域。`scripts/tabbar-drag.test.ts`使用隔离的本地命中测试
Linux上的Electron/Xvfb;macOS交通信号灯和实际的窗口移动仍然需要设备检查.

`npm test`必须通过,和`npm run typecheck`是最快的门。

** 排版检查不会在稍后读取中发现关闭值。`const`.** 如果一个援助者在
组件正文为 a`const`已降下,援助者在造物过程中被召唤,
扔出一个 TDZ`ReferenceError`运行时`tsc`保持绿色( # 1090 空白所有设置)
这边走 你们应当说:一个援助者,在援助者之上,已关闭了。
设置区域, 以真实世界的状态进行渲染测试—— 每个区域都进行
每个沅置设置打开,可见或不可见,每个设置被包裹`SettingsSectionBoundary`曰如何是将按照.

除此之外,一种习惯比其他任何一种习惯都值钱:

* 暂停测试你的守卫* 删除或倒置您刚刚添加的检查, 确认测试 * 失败 * 。
绿色套房本身并不是证据——在最近的一个专题节目中,有9项测试表明,
包括一个幸存下来的突变
4500个测试套房 因为它碰到的课 根本没有测试文件

注意不能有区别的固定装置:如果你的固定装置中的每一行都碰巧使
变种人的输出与真实的完全相同,测试在寻找彻底的同时证明什么也没有.

** 决不通过读取源文本来标注行为。 **`expect(SRC).toContain('...')`奉命执行
永远不能歧视:它通过存在、错误的守则感到满意。 我们运送了一个...`src/main/menu-accelerator-intercepts.test.ts`匹配内置的三根字符串`before-input-event`管理者在一棵树上,那棵树上,有一伙人,从树下和赤裸裸的,`0`密钥被吞没了 。 确切地说, 修补时是红色,休息时是绿色。 如果一个
模块无法测试,因为它导入了`electron`在顶部,这就是要修复的东西:
决定成为旁边的纯函数(`keydown-intercept.ts`, (中文).`main-window.ts`, (中文).`zoomShortcut.ts`)并按键。

当一个行为只能用硬件来验证时,我们在CI(一个Mac,一个真正的SSH主机,一个
GPU),明确这么说,而不是暗示覆盖. 几个文件携带编号设备
准确的这个清单。

** 读竺入帐文件的测试,不能管怎么查。 **`.gitattributes`声明`* text=auto eol=lf`,所以每棵工作树都是LF——但属性只在一个
重新检查退出, 所以如果在降落前克隆, 请运行`git add --renormalize .`(或转动)和你的
树赶上。 Windows 是此叮咬的地方: Git 默认 Windows 到`core.autocrlf=true`这样
没有属性文件, 新的克隆有 CRLF 工作文件,`CSS.indexOf('}\n}')`匹配
什么都没有——两套套房在零本地变化的退票中失败,其中之一报告了25个主题
缺少的标志 都存在。 读取时常态化
从从从 最后从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从(从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从`readFileSync(f, 'utf8').replace(/\r\n/g, '\n')`(三)`src/shared/line-endings.guard.test.ts`失败
读取切片a`\n`-没有它就含字面

** 测试从不触及活的 tmux 服务器。 ** 你最可能会逃跑`npm test`从内部a
节点终端, 其中`-L node-terminal`和`-L nodeterm-rmt`是服务器持有每个
节点你打开了,一个流浪`kill-server`结束你的整个画布, 而不是你的测试。 每跑一次
因此获得一个私人`TMUX_TMPDIR`(单位:千美元)`test/setup/tmux-sandbox.ts`),将每个套接字重定向
名一时. 写真实的 tmux 套件的正常方式 —— 选择自己的套件名称, 并使用`makeTmuxTmpdir`如果您也想要卿们的目录, 请不要建立`env`实体对象
不携带的 tmux`TMUX_TMPDIR`进入它,这是逃离沙盒的唯一方法。`src/core/tmux-socket-isolation.guard.test.ts`拥有一个名为
故意生产套接字; 添加第三个是复议对话,而不是复选框。

测试从不触及真正的家园。 钩子安装器写入`~/.codex/config.toml`(科德克斯号)
信任节点的钩子,`~/.claude/settings.json`朋友,他们使用`import { homedir } from 'os'`,哪个`vi.spyOn(os, 'homedir')`达不到——一个测试
重制开发者真实的Codex配置和Codex停止运行节点的钩子. 每个运行点
家/美国在私人沙盒里`test/setup/home-sandbox.ts`)和清除`CODEX_HOME`, (中文).`CLAUDE_CONFIG_DIR`和其他迁移变量(一个列表,`HOME_OVERRIDE_ENV`输入`src/core/test-home.ts`,哪个`test/setup/agent-env.ts`重复使用)。 如果测试需要自己的家 那就嘲笑
模块(`vi.mock('os', …)`,见`install-helper.fs.test.ts`永远不要监视它。

** 会议代码在POSIX上有两个本地后端:tmux和Zelij.**`settings.sessionBackend`选择
创建新的本地终端会话( 默认 tmux); 现有的会话总是
重新附在握能够获得的后端. 如果添加一个`PtyManager`对 tmux 谈论 a 的方法
节点,问`isZellij(persistKey, live)`首先执行Zellij段`src/core/zellij-backend.ts`或回答明确的“未知/重复”值,并将空格添加到`ZELLIJ_BACKEND_GAPS`(设置行打印该列表;)`docs/session-backends.md`(必须说明)
问Tmux套接字关于Zelij节点是一个猜测,`has-session`1号出口读作姻缘行使其权利
"冷冻" "冷冻" "冷冻" "冷冻 "热所表明的 "热污染污染污染污染污染 "的 "污染污染污染 " "污染污染污染 "的 "污染污染污染污染污染污染污染污染污染 "污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染影响 听着污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染绯污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染改善其污染污染污染污染污染污染污染污染污染污染污染污染污染污染的污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染污染 数据`*.realzellij.test.ts`套件需要二进制: 设置`NODETERM_TEST_ZELLIJ=/abs/path/zellij`或设置`zellij`在路径上; 它们沙盒回家, XDG 和`ZELLIJ_SOCKET_DIR`和跳过其他。

** 当运行完成时,测试的临时目录必须消失。 **`fakePlatform()`因为`userDataDir`被制成
在每个运行的根下先读(`test/setup/fake-platform-root.ts`),并删除根
在上次测试文件完成后。 曾经是一个`mkdtemp`在系统临时目录中,每个呼叫,永远不会
删除,一个开发服务器收集了~39.5万个,直到`/tmp`整个都用光了
逐案运行失败 。 如果你逐案调查`mkdtemp`考中考中考中考中考中考中考中考.`afterEach`页:1`afterAll`或,用于`userDataDir`页:1 真的吗?`CorePlatform`你用手搭建,打电话`makeFakeUserDataDir()`, (中文).
都一样

** 超过`fakePlatform()`测试可以清理它创建的每一个临时目录。 套房曾经留下~1500个目录`/tmp`在一个共享的盒子里 耗尽了文件系统的inode 打破了每一个
其他会话的构建。 使用`testTmpDir(prefix)`从`src/core/test-tmp.ts`(文件被删除)
结束,即使测试失败),或`rmSync(dir, { recursive: true, force: true })`输入`afterEach`/立足`afterAll`/立足`finally`;先停止服务器和孩子在那里写作. 每个运行点`os.tmpdir()`在私人沙盒(`test/setup/tmp-sandbox.ts`),运行后退出非零命名
每个前缀仍在其中——`NODETERM_TEST_KEEP_TMP=1`留着沙盒,看看写了什么
那边 模块级缓存`platform().userDataDir`换句话说,一个 dir 回来:一个套房
靴子两个核心 继续写进第一个被删除的目录。

(单位:千美元)`infinite`CSS 动画是一种框架循环,它运行着,不管是否有人在看。 A级
运行的动画使堆肥产生每个vsync——120/s在Promotion显示器上——的帧.
每一次对窗口进行重新拉动;在一个40度的画布上测量,一个可见的脉冲节点被取走
闲置的CPU从1.5%到33%,有20个占101%. 这笔钱是花在之后才付的 所以
步骤是在FIRST动画,而不是第二十部. 你再加一个后果,给它`animation-play-state: var(--nt-anim-state);`在短手之后,它会加入闲置窗口
大门(`src/renderer/styles.animation-gate.test.ts`如果你忘记,就失败了,因为一个被遗忘
动画将整个胜利带回),在脉冲没有时,宁可静态而非脉冲
载有用户需要的信息。 依赖的样式表也算数: 反应流程`dashdraw`在动画边缘上,有一条规则在`styles.css`重复 Xyflow 选择器,以及
相同的测试扫描`@xyflow/react/dist/style.css`因此,升级可以添加无限动画
失败了。 完整的量度表和推理及早出现在CLAUDE.md § idle能量中.

□ 拉动请求

- 分行从`main`CI 执行`quality`,`CodeQL`和`Dependency review`;所有这三项都是必要的。
- 解释为什么,不只是什么。 如果一个决定有谈判中的权衡,就点名说出你所拒绝的.
- 如果你测量到什么,把数字放进去—— 当天下午他们就救了下一个人。
- 说说你做过什么,不证明 这比有自信的总结更有用。
-** 领头的是什么变化和为什么它很重要。 ** 一个只读你前两个书的审校
句子应能够决定是否继续阅读;执行细节随后出现。
- 将长度与变化相匹配。 ** 单行修正得到一段,一个移动 a
边界有其需要的多少空间,也没有通过它不需要的标题加以改进。

□ 文档

两个文件,两个观众:

- ****`CONTRIBUTING.md`** (这个文件)——触摸密码之前人类的另一个需要.
- ****`CLAUDE.md`**——每个子系统,有推理和测量的深层无变量.

** 如果改变或发现其他贡献者必须知道的情况,也更新此文件。 ** 一个
永不改变,只生活在一个承诺的信息 是一个因子远离被某人侵犯
他们从来没有看到它。

** Windows文本提交等待作曲家。 ** 使用`core/settled-text.ts`为本地 PTY 和
会议东道主`sendText`: 相邻的粘贴/ Enter 写作可以在一个读取中消耗. 界限
屏幕检查可能未提交文本; 宣传`pasted-not-submitted`一路走来
打电话者并告诉用户检查终端. 永远不要把真理弦当作成功或
自动重试粘贴。 True 表示所请求的书写已完成,而不是开始转弯.
版本`sendKeysV2`主机请求拒绝旧主机而不倒置或重新启动 。 折叠
或隐藏的粘贴可能需要手动 Enter;设备测试仍然有必要.

一个没有回答的克劳德`AskUserQuestion`由会话和核心工具使用标识关联
镜像,独立于其短暂的显示藏. 普通钩、亚剂活性和
无关的笔录结果不得清除注意力或归档其收件卡宵夜. 两枚炮弹
使用`recordQuestionResult`已停止执行关于停止执行《公约》的规定。
镜子的有效事件。 通过本地和SSH 尾巴保存结果ID; 一个布尔“ 一些工具
“完成”是不够的。 明确新用户翻转,中断,会话边界重设.

远程编码账户安全 (# 736): 管理 SSH 编码会话和无代理登录终端
在产卵前需要已知的安全账户有助于提高身份,需要安全解决的远程 32. 远处的洞穴
建造者提供私人用品`CODEX_HOME`; 范围时绝不返回系统登录
无法使用。 系统SS鹊 Codex 保留主机环境,包括在早期附件期间
家发现前; 从未注入猜测`HOME`或`CODEX_HOME`自定义编码套件
同一个警卫 桌面支持远程账户生命周期; 服务器有力地浏览器
拒绝管理的 Codex 账户管理 。

- 媒体URL直播应用程序运行。 远程缓存搜索必须保存已移交的文件
玩家;缓存盖在重启前是软的. 使用现有的`video`音节也.
- 副代理重装重播是只显示和当前主机。 永远不要重放状态/许可
事件或将重播的卡片视为已核实的流程所有权;在获取其快照之前订阅。的指标

** 电话同意属于经核实的握手方式,而不是浏览插座。 ** 电话站着
SAS请求在120秒期限前才结束运输。
并一起显示框键。 将请求/复制结果区分开来(Stale request,
失败的 pin 保存, 缺少 IPC 响应, 保存但断开连接 。 所有制作针/撤消作者
必须使用`updateApprovedDevices`整个读/修改/写入,因此不能同时更新
失去批准或恢复已撤销的密钥。 服务器版不托管此遗产中继路径 。

管理的 Codex 登录终端是无代理的: 核心从保存中识别其提供者
账户列表。 在打开前,等待`useSettings.getState().flush()`添加账户后。
正常的300 ms联结保存为时已晚:未知的id可以针对系统之家发射.

- 来, 来, 来, 来, 来, 来, 来, 来, , 来, , , , , , , , , , , , ,                    ,                                                     ,             ,           ,     ,                                         ,     ,         ,     , , ,          , , , , ,   ,  , `SubagentStart`/  69.`SubagentStop`开会时
发送;`Agent`\ N`Task`工具配对仍为倒置和任务标签源。 两者
贝壳通过每一个正常事件,`<task-notification>`结束,通过一个`ClaudeSubagentLifecycle`在任何消费者面前,在儿童活动前开始原生尾巴
大门 以ID键入子剂的消费者必须尊重`supersedes`。 本地停车站并不总是
最终结束(一个背景孩子在同一个ID下恢复),所以生态安全乘坐父母`Stop`因为`background_tasks`库存,不单 出席情况。 对照真实情况衡量 出席情况
有效载荷`__fixtures__/claude/subagent-hook-payloads.json`在改变这一切之前。

克劳德的孩子`PreToolUse`页:1`PostToolUse`页:1`PostToolUseFailure`钩子不能驱动母状态 。
儿童`PermissionRequest`和注意事项`Notification`钩子仍然需要你和电话
核准,包括原始核准摘要和确定性答复票。 保留原始摘要
记录在两枚炮弹中的儿童笔录-协会警卫之前。

被持有的父母问题可能与孩子的许可重叠:保留其问卡和等待
状态,同时单独公布每张批准票。 核准答复仅解决
自己购票; 拾票人待其相关答案或明确重置后再取票.
当父母先回答时,保留同时的核准票,并屏蔽注意直到
他们自己的答复; 普通的工具活动不能解决这些答复。 明确回合/届会重排
仍然取消这两种待处理事项。

可选的钩子所有权失败绝不能停止桌面窗口创建或服务器启动 。 使用
共享非致命启动路径,并显示其可操作性诊断. 响应的 HTTP 端口不是
节点身份:验证无记名接受和拒绝. 遗产 SSH 端点迁移需要
所有权证明、无改动的档案检查和仅凭证明的转账; 122. 单项目名称
不允许替换另一个安装的广告。

持有批准注意不得替换子代理、经常性或背景任务活动,或刷新
状态证据 从那些生命周期钩。 父母可以问几个问题,而孩子的票
尚未完成:开始进行每个新拾取者追踪,并独立保存儿童批准卡,包括
当他们的显示标题匹配。 回答问题或罚单,

SSH Codex 度量衡必须保持范围到主机和正在读取的账户. 全权证书和配额
该主机上仍然保留了HTTP请求;仅在SSH上恢复了静态使用. 永不路径失败
远程上下文查看本地文本阅读器, 或重复使用克劳德的符号公式/窗口
用于 Codex 的估计。 系统账户遵循主机登录环境;管理账户
使用经过验证的私人住宅。 用法刷新不能启动或修复共享的 Codex 守护进程 。

延迟提交 Windows 信件必须重新检查已验证的孩子进程/ 出生和仿真器
在Enter之前粘贴模式,而不仅仅是幸存的PTY根. 缺少主机回复
传输的文本请求不确定是否交付, 绝不是预的意愿拒绝 ; 显示不转发
警告 警告我们 SessionSart闲置的救援被设定为同一非空置的会话和特工身份,
外国闲置者不得向制作者播送新的状态证明。

控制与链接- 内容回落必须保留端点家族的已知节点身份
届会开始。 可以接触到的外国服务器不是它拥有画布的证据——
而匹配的令牌也不是证据( 在 SSH 主机上, 令牌目录由 unix 共享)
账户);这是一个路由规则,服务器仍然授权。 将参考标志从
主端点本身的 dir, 绝不来自全局目录, 匹配每个候选人自己的 dir
反之——按数值,或当引用为空时,按目录的真实路径(空)
价值与每个陌生人都相符。 在上任前先查查后退候选人(范围),
真正的POST:一个确认的动词等待一个人类. 保持真正的自我端点拒绝 最终和
遗留的钩子交付不变。 当没有主人回答的时候 就说一次 作为暂时状态
(单位:千美元)`FOREIGN_ENDPOINT_HINT`永远不要让另一个案例的"永久的, 不要重试" 代表一个
隧道掉下来了

** 浏览器控制必须测量确定的几何。 ** 使用 CDP 轮子确认前
铬的卷轴框. 在报告移动情况之前使用有界限的定居点帮助器或
解决指针目标。 保持独家嘉宾的行动 CDP 视图端口覆盖
(单位:千美元)`--screenshot --full true`在调试器拆卸和重载中幸存下来:
在那之前,极力赞颂真主超绝万物,超绝万物,
永远不要重新加入 解除租赁清理。
