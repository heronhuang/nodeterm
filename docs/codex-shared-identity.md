> English: [docs/en/codex-shared-identity.md](./en/codex-shared-identity.md)

# 代码共享身份

有多少 Codex 画布节点共享一个`codex app-server`,每个节点如何保持稳定的身份
在其中,以及——实际上最重要的部分——如果这些都不是,会发生什么。
备有.

提供一个附件`docs/grok-agent.md`和`docs/gemini-agent.md`; §9 是设备核对表
文件的§9设置了格式。 从外部 PR #112 切除,由 ** Corvin **
(单位:千美元)`corvin@streamlain.com`。 。 。 。 。

- - - 说吧

□1. 它买什么

一个代码终端节点用来产出一个完整的`codex`进程树——每个应用服务器. 画布与
一打Codex节点用一个账户支付一打服务器的费用. 现在机器上的每一个节点
页:1`codex app-server`并拥有一个** 字段 里面。

节点 QQ线程映射 使得它能够存活。 它必须超过应用,因为Tmux
会话确实如此:运行的 Codex 客户端可以比启动它的电子进程活到它时,然后在
在记忆中重新开始什么都不知道是谁的谈话。

QQ 需要什么: 安装频道, 不是版本

`codex app-server daemon start`——整个特色的奠基——运行App-server出a.
** 独立运行时间 代码x 安装器管理 **, 在固定路径`<CODEX_HOME>/packages/standalone/current/codex`。安装时不设置运行时间
在任何版本中, 无法孜孜不倦地主机 :

```
$ codex --version
codex-cli 0.146.0
$ codex app-server daemon start
Error: managed standalone Codex install not found at /root/.codex/packages/standalone/current/codex

This command requires the standalone install managed by the Codex installer, because the daemon
starts and updates app-server from that fixed path.

Install it with:
  curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

这是通过 npm 安装的代码 #来了 0.146.0 —— 主流频道,还有一个`docs/troubleshooting-codex-snap.md`steer从从 users. 从从从从从从从从从从从从从从从从从从从从从从从从接受了从从从从从 25从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从的动议从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从 ―从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从`--help`列表`--remote`和`--remote-auth-token-env`, (中文).`codex app-server daemon --help`列出每个子命令,
和`codex app-server daemon stop`将要求本身报告为JSON
(单位:千美元)`"managedCodexPath":"/root/.codex/packages/standalone/current/codex","managedCodexVersion":null`) (中文(简体) ).

因此,获得共同身份的人口是** 独立相应地的频道**,迥然不同。
其他安装运行`codex`§3使得安静的退化而不是吵闹的。

□ 2. 块

QQ 文件 QQ 任务 QQ
|-|-|-|
|`src/core/codex-identity-proxy.ts`QQ 线程 ~ 节点记录库(签名),以及生成的发射装置. |
|`src/core/codex-thread-identity-sh.ts`QQ POSIX-sh 预奏预告片,预告片中每个管理的钩脚本. QQ
|`src/core/codex-session-name.ts`QQ 应用服务器协议客户端: 薄荷一线程, 检查一个存在, 读取它的名称 。 |
|`src/core/codex-identity-caps.ts`“这台机器上的节点能得到的法律地位吗?”
|`src/core/agents/hook-server.ts`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}你觉得呢?`/codex-thread/{start,bind,fallback}`路径和每个节点的能力。
|`src/core/agents/node-auth-secret.ts`* * 上面两个都按键(封存于`safeStorage`在桌面上,原始的0600字节出现在服务器版上。
|`src/core/agents/node-auth-token.ts`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}这个推论...`kid.mac`——每条路线的三程校验者都评出一个标志。
|`src/core/agents/node-token-files.ts`QQ 信使如何到达客户端: 每个节点一个 0600 文件`node-tokens/`,从不使用 tmux argv.
|`src/renderer/state/codexIdentity.ts`++ 渲染器的门+ UI 显示的切换/ 节点模式 。

* 记录

下方每个线索一个文件`<userDataDir>/codex-thread-nodes/<threadId>`编号 :

```
nodeId=term-17
endpoint=/Users/x/Library/Application Support/nodeterm/hook-endpoint.env
signature=<base64url HMAC-SHA256>
```

通过`CorePlatform.userDataDir`,**不**`homedir()`这是最初的形状,也是为什么
服务器版根本没有任何故事 。 生成的 sh 得到相同的路径 烤在, POSIX 引用
(真实的在macOS上包含一个空间)将性别问题纳入,所以两者不能有分歧.

有意不进行账户范围界定:管理下的Codex账户是后期切片,范围界定增加
上面的目录级别,而不改变格式承诺。

为什么这些记录是签名的?

钩子前奏读出记录,**将两个字段再出口到代理环境**. 一个
攻击者会选择一个会话的节点ID和钩点。 所以每个
记录带一个HMAC过`(threadId, nodeId, endpoint)`; 不验证的记录是
被忽略,從未修复,也從未被普鲁士删除.

SH方面无法证实HMAC——代理的外壳里没有钥匙——所以前奏
重新验证这两个字段的 * 形状* (`L1`在审查中:签名为桌面侧
保证,而序曲的字符集检查是第二层,而不是冗余。

* 每个节点的能力——安全固定

钩子服务器的无记名符号只证明 * 此请求来自某个节点
届会*。 它不能证明**哪一个**。 每条身份路线都有一个呼叫器`nodeId`,所以与
任何代理会议都可以将**它自己的**线线绑在一个**兄弟**节点上——
重现节点的状态 (通过序曲) 瞄准它的钩子交通。

每个`/codex-thread/*`因此,路线也需要`X-NodeTerm-Node-Token`=`HMAC(secret, nodeId)`: 重新启动稳定, 范围为一个节点, 只注入该节点的会话
内置`buildPtyEnv`,并且从不会写入每个会话都能读取的共享端点文件。 那个
同样的秘密在记录上签字。

`/codex-thread/fallback`只有一个例外,它很窄,最普通
,,,,,,,,,,,
这正是它存在的原因 手握手握手握手握手握手握手握手握手握手握手握手
在它命名的节点代号上,只信任一个无符号的呼叫器.

在两条路线上处理一个冷的应用服务器:`codex app-server daemon start`退出 0 不
表示控制套接字正在接受连接, 所以`waitForCodexAppServer`(3×200毫秒)
在薄荷之前, 绑定检查只当它不能对服务器—— 服务器—— 进行重试
回答"我没有那条线" 从来没有重复过, 因为这是一个答案。

如果无法安全存储,则整个功能将保持关闭——`codexIdentityCaps()`回复`shared: false`每个发射线都保持空虚`codex`没有什么是半武装的。

路线

{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}我们该走了 {\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}我们该走了
| | |
|`POST /codex-thread/start`请求在应用程序服务器上刻上一条线条, 写下记录, 返回 id 我们有一条线条
|`POST /codex-thread/bind`QQ 要求的 QQ 验证线索存在, 然后记录该节点拥有 QQ
|`POST /codex-thread/fallback`=================================================================================== 妈妈=====

`start`薄荷通过五步对话(`initialize`,,,,,,,,,,,,,,,,,,,,,, 不然,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,橘,,,,,,,,,,,,,,,,,,,,,之用,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,来,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,`thread/start`,一个空`turn/start`, (中文).`turn/interrupt`, (中文).`thread/fork`在转弯之前`thread/delete`以种子为种子。`thread/start`仅创建应用服务器元数据, 走吧!
- 第二个客户的`thread/resume`然后失败的"没有找到"推出, 这正是什么
发射装置在一行之后。 分叉舞产生一条线 零用户转动
有效推出,而不使用已贬值的回滚API。

对话与一个通常为** cold**的服务器对峙(第一个代码节点在之后)
{\fn黑体\fs20\shad2\2aH82\3aH20\4aH33\fscx95\3cH592001\be1}别太激动 三个预算必须保持订单,订单是整点:

```
launcher curl (30 s)  >  server handler (CODEX_THREAD_START_TIMEOUT_MS, 20 s)  <  socket guard (CONTROL_CEILING_MS, 130 s)
```

在服务器继续创建线程时, 向后获取第一次比较, 卷曲退出
并写一个记录 永远不会恢复, 孤对一次尝试。 弄错第二个
这条路线继承了2s**slowloris**的护卫,它是一个RECHEIVE相位护卫:它摧毁了它。
操作员所确认的最常用的发射装置`handleCodexThread`手拿开`CONTROL_CEILING_MS`之后`readBody`,确切为`/control/`和`/context-link/`说吧
和`codex-launcher-sh.test.ts`用一个睡觉的起动控制器固定它

- - - - 好几分钟?

□ 3. 倒退

** 每个失败路径结束于`exec codex "$@"`,论据完整无损。 ** 上游退出69"身份
不可用),它变成一个丢失的应用服务器,一个年长的`codex`,或
锁定数据目录为 ** dead 节点**。 Repo自己的先例是`gatePermissionMode`数字 : a
未知或失败的探测器会降解为赤裸的指令,永远不会降解为被阻断的发射.

裁决位于两个不同颗的四个位置,**文字是权威**.

**1. 施工时间** -`codexIdentityCaps()`从从从从从从从从从从从从从从麒从从从从从从从从从从从从从从从从从从从从从从力求从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从在此方面从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从`AGENT_CONFIG.codex.launchCmd`保持原样`'codex'`, (中文).
字节相同;`agentLaunchProgram(id, base, sharedIdentity = false)`仅当发出命令时,将启动器命名为自动启动器。
召师选入,并.`codexSharedIdentity(remote)`只有在探测器报告时才答应
* 已安装的+武装发射器** 并且** 会话是局部的。 (一个SSH主机没有安装发射装置——).
这是后来的切片,所以一个发射装置命名的线会在那里`command not found`,即准确的
死节点存在以预防. ) 默认`false`表示没有选择的每个呼叫站点
发今岔令.

`shared`是四件事情的AND,最后两件是有趣的。

** 这种安装可以运行一个应用服务器吗? **`appServer`, (中文).`codexManagedRuntimeInstalled`很快就会有
问题§1,由**stat**`<CODEX_HOME>/packages/standalone/current/codex`编辑
第一次剪切此文件时询问了不同的问题 — does`--help`提及`--remote`- 哪一个
npm- installed 代码x 0.146.0 回答 * 是 * 而`daemon start`拒绝,所以主流
我们写的频道`nodeterm-codex`进入每一个发射线,只在运行时发现:浪费
卷曲往返, a`plain codex`芯片,和初回旗,每个节点,永远,一个
特性不能在那里运行。 其功能是 独立化的
频道,不是无谓的惰性。

为何是命令,而不是权威命令:

候选人 为何不
| | | |
|`codex app-server daemon start`启动守护进程 **。 探测器在安装了代码x的每台机器上运行,包括从未打开过代码节点的运行;能力探测器不能创建特性所存在的懒散过程。 |
|`codex app-server daemon version`QQ 只读,但它连接到控制套接字,所以它失败在一个完全有能力的安装上,它的守护进程仅仅还没有升起——也就是在每一个靴子之后. 探测器运行的ONCE,这样就可以将会话的特性固定在它所需要的机器上。
|`codex app-server daemon stop`· 印刷权威的JSON(`managedCodexPath`, (中文).`managedCodexVersion`适合于一个运行中的守护进程**,它是一个共享的应用服务器。

不能推断路径:CLI在拒绝时逐字将其命名并报告为`managedCodexPath`. 解决`codexHome()`这样`$CODEX_HOME`第8.5节)
警告说,窗帘可能以不同方式解决)。 任何尚未确定的东西——一条缺失的道路,a
不执行的文件, 权限错误, 我们不承认的布局—— 是 ** false ** 。

** 已安装`codex`接受`--remote`* ** (中文(简体) ).`remoteFlag`, (中文).`codexCliSupportsRemote`(一) 说明
发射装置的飞行小镇`daemon start`出口 0
然后是**execs**,还有带有应用服务器的CLI,但没有`--remote`在绰号使用错误时死亡
没有退缩。 从CLI自己的地物上发现与国家的地物`--help`(和 )`codex resume --help`如果
首先不说,从来没有版本比较, 出于同样的原因,克劳德的`--session-id`编号: a
未识别的旗帜不退化,它使CLI退出.

安装检查先行 ** ** 并短路帮助产卵:没有应用服务器可以到达
没有什么可学的 我们永远不会使用的旗帜,所以`remoteFlag`读错为
"没有被调查"——未知,和本文件中其他所有未知的一样.

链中的任何地方都未知——登录 PATH 上没有CLI, 产卵失败或超时, 没有独立
runtime,从未提及国旗的帮助文本——表示**false**,即plain codex. 错的"是"
(b) 错误的“否”只花费共享
祂是应用服务器祂的探测器每运行一次`refreshCodexIdentityCaps()`,完全关闭
发射路径**:每次发射时,在发射板上都会有明显的潜伏状态,以回答
问谁的答案在应用程序运行期间无法改变 。

和Claude不同的是,这个探测器不能计算任何东西,直到贝壳交出钩子服务器。
秘密,所以贝壳**pushes** 答案在和一个早期的呼叫者**等待**。 同步获取器会
回答"不" 任何先问的, 一个"不" 标注的特征关闭 整个运行与否
芯片,没有土司,也没有日志线——一个靴链重排,隐形.

** Đuntime ** — 发射装置。 只有脚本可以看到窗格的内涵,不管端点文件是
可读性, 经纪人回答还是安装`codex`甚至有一个应用服务器。 这个
执行普通代码

哪里浮出水面

不沉默, 和**从来没有在窗格** —— 文本推入一个代理终端是迅速注射,
这是禁止的

- 发射器 POSTs`/codex-thread/fallback`在执行之前有机器可读的理由;
- 节点头显示一个哑巴 **`plain codex`** 其工具提示说明原因的芯片;
- 每个节点的**第一个**回落也提高了警告旗,因为你是一个节点上的芯片
不看教什么。

模式是 ** 短暂 ** , 从未持续过: 它描述了一个过程的一次启动, 和 stale
重新装填的节点上的"平面"徽章将是一个谎言.

原因

原因 意思是说
| | | |
|`node-id-unavailable`不是节点弹出会话(发射机是用手操作的)
|`hook-endpoint-unavailable`QQ 端点文件缺失或无法读取QQ
|`broker-unreachable`没用的钩子服务器的坐标
|`node-token-unavailable`没有每个节点的能力——通常没有安全的储存——                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
|`thread-id-unavailable`要恢复的会话 id 形状不像 QQ
|`app-server-unavailable`|`daemon start`无法使用独立的运行时间 – 一个年长的 CLI, 或一个不会出现的守护进程 。
|`codex-standalone-missing`|`daemon start`失败, 没有独立的运行时间—— npm 或 snap s安装( §1) , 不是版本问题 QQ
|`thread-bind-refused`====================================================================================================
|`thread-start-failed`QQ 服务器不会将线索薄荷 QQ

后两个曾经是一个原因, 其副本说 *"一个老的CLI" *, 它发送任何人阅读它
编码 0.146.0 节点搜索一个不存在的版本问题 ——
这回波已经失去了诊断时间 发射器运行`daemon start`即为权宜,即为权宜。`${CODEX_HOME:-$HOME/.codex}/packages/standalone/current/codex`决定其中的哪一个 15.
击中。 那命令很重要:先运行的ST沧桑会让将来的代码解码器不再需要
独立运行的时间 回到证据 我们没有商业上信任指挥本身。

盖子通常保留`codex-standalone-missing`完全远离发射装置, 所以看到它意味着
启动探测器无法做到的东西:独立安装在应用运行时被移除,
或风扇`CODEX_HOME`与桌面不同(§8.5)

{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}退后者不涵盖什么

** 之后的一切`exec`无法恢复。 ** 一旦发射装置运行`codex --remote unix:// resume "$thread" "$@"`,一个拍拍使用错误或“未发现推出”是一个死
节点——这个整个设计存在的结果是为了防止,由不同的门到达.

的确,其中一类是封闭式防守式的:**bind验证在应用服务器上存在的线程**
在写唱片之前 到达我们的ID 不管节点持续, 它可以是 steal 或
从一个在普通代码下ẹ的会话中留下的; 无论如何绑定它写一个记录然后
执行的履历 死了,没有什么能抓住它。 拒绝在这里,是"倒退"。 我们的服务器
无法找到“ 不存在” 的答案, 安全的方向是: 拒绝花费一个普通代码
会话,接受节点的成本。

其余需要一台真正的机器——§9.1-9.3.

* 故意不使用

**"再起作用剂(再起作用)"不断排放光线`codex resume <id>`.** 它键入一个窗帘,
已存在,在发射装置安装之前创建的 tmux 会话不会携带其
关于 PATH 的目录。 一个重启的节点作为普通客户端重新加入,直到其下一个寒冷开始.

- - - 说吧

□ 4. 钩子序曲

一个共享的应用服务器会产下一个Codex **tool**的贝壳本身,从而使贝壳继承.`CODEX_THREAD_ID`但是没有`NODETERM_*`我们设置在窗帘上——它运行的钩子不会知道哪个
帆布节点属于它, 和节点的徽章 根本不会移动。 序曲恢复
从线性标识绑定。

它被准备为**所有**代理的管理钩脚本,而不只是代码的. 这是故意的:
是惰性没有`CODEX_THREAD_ID`(没有其他代理工具 shells),一个建筑师击败一个
代码唯一的叉子。 它确实改变了每个代理 生成的脚本, 这就是为什么`managed-script.test.ts`声称这5个建筑都存在,而且缺少身份
root 生成遗留的脚本不变。 ** 远程(SSH)主机得到`null`** — 默认根是
这台机器的数据目录,然后在别人主机上将它制成脚本 泄露桌面
向无益设置布局

- - - 说吧

□ 5. 会话名称

`TITLE_READ_CAPABLE`(                                                     凿           橱                                (                                                                                   (                                                                        `codex`· ;`RENAME_CAPABLE`没有。 通过共享服务器,节点拥有 a
线程,而线程携带`Thread.name`可读于服务器自身的套接字——但有
没有测量到的重命名命令,所以读写腿会像对双胞胎一样分开。 一个
列表将同时点亮重命名 UI 的节点, 使写作默默无所事事。

`readAgentSessionName`路由代码到自己的阅读器 ** 之前** Claude's: Claude的解析器SCANS`~/.claude/projects`在缓存误差上,它的规定的程序可以将陌生人的会话名称交回。
两个贝壳的会话名称扫描都取核心`supportsTitleRead`默认,所以输入代码x
两者都未经编辑(前两次漂移——见CLAUDE.md规则10)。

- - - 说吧

□ 6. 三个表面

- ** Desktop**——全力支持。
- **《服务版》** -- -- 有 Minnesotau的、有文件记载的故意退化成平面`codex`。阻断器是
*secret *,的各项活动不是管道:每个节点的能力是按键链支持在桌面上(电子)`safeStorage`),在无头的Linux主机上没有对应值,所以武装 但我们在Linux主机上是秘密
在数据目录中休息——这个片段无权悄悄地作出安全决定。 所有的东西
它需要已经生活在那里`src/core`和靴子从`CorePlatform`接线是三通电话
加上两个操作员的注册, 在标记位置`src/server/handlers/index.ts`编辑
铸造桥已经有一个**真**`codex`命名空间, 这样一面不需要更改 。
- ** 流动伴侣** (`~/projects/nodeterm-ios`——不详。 它在2004年7月1日至2005年6月30日期间对tmux会议作了安排。
运输协议; 哪个应用服务器的编码会话是隐形的, 以及`plain codex`芯片是一个帆布节点 支付电话没有插槽。 协议不变。
- ** Windows**——故意关闭(第一阶段)。`refreshCodexIdentityCaps`提前返回`win32`与`unavailableReason: 'unsupported-platform'`(没有探测器,没有发射器写),`pty-manager`在会话 PATH 上预先插入任何发射器目录(`codexLauncherPathDir`(此处无效),
设置 ~ 代理 显示 Codex 下的一条变音线 已提交 。 已经是意外了 跑步时间
STAT 寻找无扩展`codex`,发射侏儒是`sh`他说:
由名字决定,但沉默不语。 第2阶段首先需要三个装置的事实(下面项目13),然后是:
非SH发射器`nodeterm-codex.cmd`运行 Electron-as-Node的范围下的节点脚本或
会话主机运行时间, 移植`buildCodexLauncherScript`'绑定/倒置/POST逻辑'.
- ** Kanban** — 模式存在于一个可以读取的卡片模式的 50. 芯片位于画布节点
仅标头. 添加到卡片的扩展细节行中是一个小的后续诠释.

- - - 说吧

□ 7. 不在这片

中继守护进程,管理 Codex 账户(包括账户范围的记录目录),该记录目录
平面布局扩展为干净的,SSH主机,浏览器控制,以及邮箱/浏览器的工作——都来自
PR并不构成一一二,全部还有待切片.

- ――

□ 8. 已知的差距

1. ** 邮政`exec`失败无法收回** (§3). 那个`--remote`案件在封顶时结案;
第9.2(b)节:麒`resume <id> <prompt> --ask-for-approval never`页:1
§9.3(持续会话id是应用服务器的线程id).
- ** 安装通道大门是一个Stat,而不是它所代表的命令。 **`codexManagedRuntimeInstalled`声明在今天的 CLI 路径中存在独立的运行时间
需要; 无法证明`daemon start`将会成功(一个腐败的运行时间,一个楔形套接字,一个
挡住产卵的沙盒 发射装置仍然失效`app-server-unavailable`) (中文(简体) ). 如果未来的代码 放弃独立的要求,这个
回答错误 **no ** — 简单的代码,这里所有的东西都会退化,但它会
需要重新衡量而不是假设。 替代品,为什么没有一个更便宜
*和*结论,是§3中的表.
2. **发射装置需要钩式PORT**,而不是unix套接字——它POSTs to`http://localhost:$NODETERM_HOOK_PORT`。今天的精细(桌面的钩子服务器是一个回转 TCP)
,但服务器版的线条必须同时重温`NODETERM_HOOK_SOCK`, (中文).
启动器已经为卷曲读取但并非为 URL 读取 。
3. ** 节点信使乘坐tmux`-e`在本地路径**, 即它像 tmux 会话内
每隔一段时间`NODETERM_*`数值。 与钩手的接触相同;
因为改变它意味着改变它们如何交付
4. ** 两个遗留孤儿类别**,既包括固有类别,也包括缺陷类别,预算没有涵盖这些类别。
命令 §2. (a) 客户端因非超时原因而死亡—— 被杀死的窗格,`tmux
ctrl-C中薄荷-仍然让处理者完成并写下记录。 这是
已绑定 : §2 的 pruning 将其与节点一起删除, 而下一个发射薄荷会带一条新线
无论如何,(b) 中止中间对话的应用服务器可以留下种子和/或叉子
线程在它的一侧活着,因为关闭`thread/delete`可能永远不会被发送。 孤儿
*线条* 任何地方都没有收割者——不是在这里,也不是在编码中.
5,**  .`CODEX_HOME`双解 **:桌面解析 Electron 的应用服务器套接字
进程的环境, 窗格解析`--remote unix://`从它自己的。 用户除外
套装`CODEX_HOME`中,只有 shell rc,在这种情况下,开始成功并恢复丢失。 管理
账目明确了这一点;在此之前,这是一个狭隘的、真正的不匹配。

- ―― --

□ 9. 设备核对表

楼下的一切都需要一台有登录的机器`codex`项目1-3是:
执行无法核实;其中任何一项的失败都是**死节点**,而不是退化,所以
先来 第1、第2和第5项从一个新节点上跳出。

1. ** 经常预算:`codex --remote unix://`有效——探测器无法自行回答的部分。 **
不再需要设备的东西:这台机器是否获得了共同的身份. 两半
每台机器崛起一次 并进行测试`codexManagedRuntimeInstalled`(§1的安装通道要求,**在通过npm安装的codex-cli 0.146.0上测量虚假**,
地点`daemon start`以“未找到管理的独立代码安装”拒绝)和`codexCliSupportsRemote`(国旗的存在). 安装失败或运行普通代码,
默默无声,从未命名过发射装置——因此负面案例在纸面上关闭.
仍然需要一台机器在**独立-Installer**频道上: 我们探测到的旗帜是
然后我们使用的旗帜。 检查`--remote`参数表`codex --help`对两人`exec`开一个新的代号节点 并且确认 泛号显示工作会议
而不是拍拍使用错误。 并且确认整个大门的高度: 在机器上
节点出现** share**,而在npm安装上,同一构件打开一个普通的编码节点。
处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处处 目留有位置。`plain codex`你是个坏蛋,
2. ** 经常预算:`codex resume <id> <prompt> --ask-for-approval never`接受位置提示和全局
在子命令后面的旗帜。 ** 这条线是编成的`createAgentNode`建筑,它是
CLUDE.md规则5的grok -`--`准确的教训:a`withPermissionMode`单位测试通过时
编组的线条是错误的。 在许可模式时创建初始提示的代码节点
除了别的`manual`,确认提示到达模型,国旗被授予(不是
已自动自动自动 74.。
3. ** 来自钩子的会话 id 节点持续是应用服务器接受为线程的 id。 **
让一个代码节点运行一个转弯,注意`agentStatus.sessionId`,重新启动应用程序,确认寒冷
恢复同样的对话,而不是退缩。 如果不一样
命名空间,`bind`每个恢复的节点都会悄悄地运行 简单的代码
4. **RAM,这是为.** 打开六个编码节点; 确认`ps`显示一个`codex app-server`和6个瘦客户端, 比较RSS和6个独立客户端`codex`进程。
5. **芯片和土司。 ** 强制倒置( 重命名)`~/.nodeterm`不,最简单的:发射节点
与`CODEX_HOME`向一个没有自自从自自自自自自自自自自自自自自自自自自自自自从自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自自从自自自自自自自从自自自自自自从自自自自自自从自自自自自自自自从自自自自从自自自从自自自自自自自自自自自自自自自自从自自自自自自自自自自自自自从自自自自自从自自从自自自自自自自自从自从自自从自从自自从自自自自自自自自自自自自从自从自自自从自从自自从自从从从自从自从从自自自自自从自从自从自从自从从从从自从自从自从自从从自从自从从自从自自充分地从自自从自`app-server`),并确认节点显示`plain codex`,工具提示将原因命名为
横幅出现过一次,** 没有写进窗格**。
6. ** 会议名称。 ** 让代码命名线索,确认节点标题 在民意调查中通过
循环,确认一个手改名的节点(`titleAuto`假的)是孤独的。
7. ** 重新启动和重新启动。 ** 通过 Codex 节点运行重新启动应用程序: tmux 客户端存活, 即
记录仍然可信,而钩子来自一个 Codex TOOL shell(它只有`CODEX_THREAD_ID`页:1
仍然移动右节点的徽章——上一个徽章是序曲,它只是由一个
工具调用,而不是简单的转弯。
8. ** 删除笔数。 ** 永久删除一个 Codex 节点并确认其记录从`<userDataDir>/codex-thread-nodes/`而其他节点仍然保留。
9. **两个节点,一个线程。 ** 将第二个节点指向第一个仍然拥有的线条(a)`resume`与
一个复制的 这就是我的代码 而不是两个客户
10. ** 一个冷却的应用服务器,在裁武条约的道路上。 ** 杀死应用服务器,然后打开一个新鲜的Codex节点.
确认它等待 薄荷(可以花几秒钟) 并出现共享,而不是下降
带回`thread-start-failed`却在背后制造出一丝孤魂
11. ** 在RESUME/BIND路径上的冷式应用服务器。 ** 杀死应用服务器,然后冷却启动一个
EXISTING Codex节点(重新启动应用程序,或重新启动). 现在绑定了一个强制的应用服务器回合
因此,一个守护进程,它的套接字捆绑一个节拍迟到 将会将一个合法的恢复变成实况`thread-bind-refused`- 普通代码。`waitForCodexAppServer`旨在吸收;
节点出现共享, 并且一个真正缺席的服务器仍然会迅速倒回
而不是绞刑。
12. ** 国家`CODEX_HOME`只设置在弹壳弧**(§8.5)中。 打开`export CODEX_HOME=…`输入`~/.zshrc`(不见于
打开 Codex 节点。 桌面解析应用程序服务器套接字
电压的环境,而板子会解决`--remote unix://`从自己的,所以这里是
他们的分歧是:确认实际发生的情况——分享错误的家庭,或者开始
成功后,恢复了状态。
13. ** 窗户,在第二阶段建成前。 ** 在Windows机上安装独立编码器:
(a) 对`%USERPROFILE%\.codex\packages\standalone\current\codex.exe`存在; (b) 有`codex app-server daemon start`单曲 :`version`和在哪个控制频道上工作(名称
管道对 unix 套接字 ; (c) 确实`codex --remote <that endpoint>`接受这个 直到所有三个坚守,
页:1`unsupported-platform`大门留下 也确认今天的大门: 设置 = 代理显示
哑巴线和编码节点的路径没有`codex-bin`输入。
