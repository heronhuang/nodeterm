> English: [docs/en/windows-session-host.md](./en/windows-session-host.md)

# 视窗会话主机

** 这是:** Windows(和任何其他)的 tmux 等同会话的后端
一个真实的平台`tmux`无法找到),所以关闭应用程序——或者应用程序崩溃——没有
更长的时间会杀死每个运行的终端 和每个特工CLI 中任务。 这是独立的,
拥有真实的PTY和超过Electron应用的长寿节点过程.

此文档描述了Windows桌面执行. 它没有嵌入 Microsoft Windows
终端,它不会改变服务器版或移动同伴.

按此顺序按会话自动选择 :

```
Windows + tmuxEnabled            →  session host (this document)
POSIX + real tmux found          →  tmux (unchanged)
POSIX + no tmux, tmuxEnabled     →  session host (this document)
tmuxEnabled off                 →  plain shell (no persistence)
```

Stock Windows 不提供本地 tmux, 而 Windows tmux 兼容的二进制不执行
Unix tmux 控制器和控制台语义这个应用程序所依赖的. 因此,会议主办方是:
权威的 Windows 持续后端,即使一个`tmux.exe`显示于`PATH`打开
macOS/Linux 无变化: 真正的 tmux 安装仍然优先 。

□ 为什么不只是端口 tmux的方法

tmux在Windows上不存在,完全停止——没有二进制捆绑. 会话主持人是
从剪切模拟器中构建的三块 这个代码库(或更广泛的节点生态系统)
已经具备了良好的组件:

1. 每届会议实际费用总额**`node-pty`,其它应用程序已经使用了同样的依赖性。
2. 每个会议都有一个**服务器侧终端模拟器** -`@xterm/headless`+ 键`@xterm/addon-serialize`, (中文).
因此,主机可以回答"这个屏幕目前试验性是什么样子",而人类从未有过
看着它。 这是从它自己的 C 执行中获得的作品; 这里是一样的
xterm.js 渲染器本身使用的核心,只是在节点运行无头.
3. 一个**tiny belspeak IPC协议**(在本地命名的管/unix套接字上的新线限制JSON)
而不是 tmux 的二进制控制模式协议, 因为不存在“ attach to a name
session and stream its 输出" 原始到Windows上重用.

□ 结构

```
Electron main process                    Session-host process (standalone, detached)
┌─────────────────────┐                  ┌──────────────────────────────────────────┐
│ PtyManager           │                  │ net.Server (named pipe / unix socket)     │
│  spawnSession()      │  local IPC       │  ── per-connection: hello + dispatch      │
│   └ SessionHostPty ──┼─── (JSON lines) ─┼─→ Map<name, HostSession>                  │
│      (IPty-shim)     │                  │      ├─ node-pty IPty  (the real process) │
│                       │                  │      ├─ TerminalEmulator (headless xterm) │
│  session-host-client  │                  │      └─ subscriber sockets (co-attach)    │
│   (one connection,    │                  │                                          │
│    auto-spawns host)  │                  │  exits when its last session is killed,  │
└─────────────────────┘                  │  plus a grace window (see "Lifetime")     │
                                           └──────────────────────────────────────────┘
```

- 怎么样?`src/session-host/`——独立过程. 纯节点,在任何地方都不依赖电子
此目录( 已验证 : 它甚至不导入)`../core`或`../main`) (中文(简体) ). 装满了建筑
(单位:千美元)`npm run host:build`,反映现有的`server:build`脚本)改为`out/session-host/host.cjs`,与`node-pty`保持外部(内部模块——同样的理由)`server:build`外化其义).
- 怎么样?`src/core/session-host-client.ts`页:1`session-host-launcher.ts`页:1`session-host-backend.ts`页:1`session-host-pty.ts`——电子主端客户端.`src/core`保持无电
(单位:千美元)`no-electron.test.ts`; 仅导入这些文件`net`页:1`fs`页:1`crypto`和纯协议/路径
模块。
- 怎么样?`src/core/pty-manager.ts`一体化接合:`Session.sessionHost?: boolean`矣。`Session`,并且每个呼叫网站到达过去`session.proc`改为
直接运行 tmux CLI 命令 (`sendText`, (中文).`paneCommand`, (中文).`captureSession`, (中文).`captureSnapshot`, (中文).`snapshotScrollback`, (中文).`captureForResync`,最后的杀入`destroySession`, (中文).`listNodetermSessions`获得一个`else if (!this.tmuxPath) { … session-host equivalent … }`分支,形状相同`sshRemote`分支已经使用。`spawnSession()`选择
在 tmux 分支和 plain- shell 后端之间构建一个`SessionHostPty`而不是打电话`pty.spawn`直接来

□ 备查通知

`pty:tmux-status`仅保留 tmux`available`字段并添加`persistence`编号:
用户的`enabled`设置和发现`backend`(单位:千美元)`tmux`, (中文).`session-host`,或无效)。
发现不会启动主机或认证运行时间健康. POSIX 偏好 tmux; 视窗
使用会话主机。 缺失/ 疲劳状态未知, 包括服务器版的
WS桥. 没有实地工作的老年人也仍然不明朗。

桌面/ 浏览器横幅在保护禁用、 缺席或未知时警告; 设置
显示相同的状态,并在设置变化后得不错,并定期更新。 国家是
大约** 新的本地终端**,不是SSH/中继主机,也不是对现有普通壳的升级。
只从本地项目提供安装器, 因此无法运行在选中的远程
页:1 运行时位址
路径; 正在显示的捆绑不是成功附加的单个会话的证明。

□ Windows 配置文件解析度

(                                                                                                                   (                                                                           集体行动                                      在这一问题上                        程序程序相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关集体行动相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关在这一问题上相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关`id`, (中文).
显示标签、类型、可用性和可选的不可用理由。 可执行路径和 argv
保持隐私。`PtyCreateOptions.profileId`跨过桌面桥; 信任的核心验证
并立即解决了其中之一`node-pty`或会议主机生成一个进程。

稳定编号是`auto`, (中文).`pwsh`, (中文).`windows-powershell`, (中文).`cmd`, (中文).`git-bash`, (中文).`custom`一个`wsl:<distribution>`每个安装的 WSL 分布 。`auto`是唯一允许搜索的配置文件
下 title 列表: PowerShell 7, 然后是 Windows PowerShell, 然后是`%COMSPEC%`页:1`cmd.exe`一个
显性不可用或配置错误失败; 它永远不会变成不同的 shell 。

对 WSL , 分布发现解析 UTF-16/ NUL 添加输出`wsl.exe --list --quiet`。选定分发的自有`wslpath`翻译 Windows 项目
目录,之后发射保持结构化`wsl.exe -d <distribution> --cd <linux-path>`的案件前缀和运行一个可信任的Distro-side cwd 守护符,然后将其替换为配置的默认
贝壳。 守护者会独立更改位置 Linux 路径, 从而删除一个目录
无法无声地打开`/`. 编号,
翻译,发射失败 保持其真实的理由 并且不做倒置产卵。 页:1
含有空格的分布式名称仍然是一个 argv 元素。

profile id是机器本地快照,而不是项目内容.`terminalProfileId`,遗产
自定义`shell`,并将高级 SSH 执行值从共享的项目文件中删除,可移植
出口和入境的帆布交通。 因此,共享文件或对等端既不能输入 argv,也不能输入
选择本地可执行文件。 见
[`features/terminals/windows-shell-profiles.md`[地貌/地貌/窗-壳-图谱. md].

在 Windows 本地 shell 中启动代理(`pty:execute-launch`页:1

渲染器的代理发射线是POSIX源(POSIX source).`'it'\''s'`、 、 、 、 、`"$(cat '<file>')"`. PowerShell (英语).
空壳断开, Windows PowerShell 5.1 在 CLI 看见前将嵌入的双引号放下
cmd Kurdistan.exe将一个单引用的提示分为单独的参数。 如此迅速的产生
内建的代理节点也带有语义`data.launchIntent`(单位:千美元)`shared/agents/launch-intent.ts`), (中文(简体) ).
绑在它准确的打字线上,从未连载过. 当发射员要打字的时候
将线排入一个 win32 核心上的本地会话- 主办面板**, 它要求`pty:execute-launch`换成
(单位:千美元)`renderer/terminal/launch-intent.ts`→`core/launch-intent-execute.ts`:核心解决
对会话产物 PATH 的代理可执行文件(原始图像,然后)`.ps1`页:1`.cmd`- 仅此而已
安装被拒绝),读作 a`--prompt-file`本身(白空格为一个参数,确切地说
什麽`"$(cat …)"`HOST记录的方言的 argv
生成(`launchDialect`附加结果; 仅在产卵时设定`pwsh`页:1`powershell`页:1`cmd`), (中文(简体) ).
并且通过主机的准确发射分类账交付.

保护这个安全的规则:
- 所有其他面板(tmux、SSH、Zellij、普通贝壳、Git Bash/WSL、任何POSIX核心)`unsupported-shell`在读出任何内容之前,使用输入的行,字节相同。
- 在要求主机返回打字线之前作出的拒绝;`delivery-failed`(或a)
—— 发射会暂时停留,
- 不包括意图(只包括遗留线):恢复、定制代理、发射命令控制,
每节点模型,SSH节点. 复线只持有旗词和经验证的ID.
- 怎么样?`pty:execute-launch`仅针对中继同行(`shared/host-control.ts`) (中文(简体) ).

IPty-shim(为什么整合如此之小)

`PtyManager`/ 流量控制/ 用户/ 公园/ 收割机械运行`Session.proc`,并且只有永远打电话`.onData()`, , (中文).`.onExit()`, , (中文).`.write()`, , (中文).`.resize()`, , (中文).`.pause()`, , (中文).`.resume()`, , (中文).`.kill()`页:1`.destroy()`永远不要`.pid`,从来没有任何ConPTY/Unix的特异性.`SessionHostPty`(单位:千美元)`src/core/session-host-pty.ts`准确执行该子集,辅以
会话主机连接, 而不是真正的 OS pty 。 在一个建筑工地上铸造`spawnSession()`(单位:千美元)`as unknown as pty.IPty`否则,它与真实的
节点`IPty`切换到每行`pty-manager.ts`每个用户,每个流量控制
罚单,每个公园/复建决定都保持未修改。

□ 协议

新线限制 JSON,定义于`src/session-host/protocol.ts`(双方进口)
一个模块 独立捆绑 和电源主捆绑 真正的份额。 每个请求
携带单调`id`主持人在回答时会回响 所以回答自责
长寿命连接(没有位置-FIFO 脆弱,与这个应用的 tmux 控制-mode 客户端不同).

QQ 动词`SessionHostRequest.cmd`===============================讲述====而被删除
|,|也.
|`hello`                                                                               
|`attach`|`new-session -A`页:1`attach-session`* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
|`hasSession`|`has-session -t <name>`*                                                                      
|`write`绑定客户端的原始字节
|`writeDetachedV1`|`send-keys -H`输入已发布会话( 没有客户端) QQ 完整—— 添加; 旧主机答案`unknown command`且该写入失败( 从未重发 增编 )`sendKeys`) (中文(简体) ).
|`terminateOwnerV1`|`kill -TERM -<foreground pgid>`QQ 视窗形状 -`taskkill /T /F`在重新证明的代理 pid, 永远不要控制台根( 见下文) QQ
|`resize`++ ConPTY/pty 调整大小 +`refresh-client -C`QQ 完整; 每个视图都声称大小, 应用程序的网格跟随最近活跃的视图( 问题 # 914) QQ
|`pause`页:1`resume`节点 - 节点`pause()`页:1`resume()`QQ满; 核心中的每个查看器和主机中的每个连接器( 第一次暂停/ 最后一次恢复) QQ
|`sendKeys`|`send-keys -l -- <text>`(+ 数)`Enter`) QQ全 — 工作媚无附客户端, 完全像 tmux QQ
|`paneCommand`|`display-message -p '#{pane_current_command}'`大约——见`process-tree.ts`|
|`capture`|`capture-pane -p -e [-S -N]`QQ 完整,严格地说更多(模式修复——tmux的纯文本抓取带无) QQ
|`paneModesV1`QQ( 无一 — tmux 拥有鼠标本身) QQ 添加剂: gane app 的鼠标跟踪协议, 用于中继卷轴路由; 旧主机答案`unknown command`="无鼠标" ===
|`killSession`|`kill-session -t <name>`满额
|`detach`一个客户自己的`tmux detach-client`满额
页:1`listSessions`页:1`list-sessions -F '#{session_name}'`+,与`sessionDetails`, (中文).`list-windows`页:1`list-panes`QQ; 见下文“ 可观察性 ”
|`ping`|(启动赛期间使用的生命探测器) |(满) |
|`attachExisting {watch: true}`|`attach-session -E -f ignore-size,read-only`(现场链接监视器的客户端) QQ功能`watch-attach`: 订阅无几何要求, 没有暂停票, 拒绝`write`页:1`resize`从此连接中, 绝不产生; 在已连接的连接中, 它会撤回请求( 其最后的投票订阅者左鳖) QQ
|`captureVisible`|`capture-pane -p -e`+ 键`display-message '#{cursor_x} #{cursor_y}'`QQ 特性`captureVisible`: 只显示 ACTIVE 缓冲器的可见行( 从来没有历史), 视图光标,`altScreen`——直播链接的关键框架  .
|`paneCwd`|`display-message -p '#{pane_current_path}'`QQ 特性`paneCwd`: cwd 上次报告(OSC畔7/9;9/633,由`cwd-report.ts`在人到来之前是无效的 绝不是产卵

最后三个是** 谈判在你好**`SESSION_HOST_FEATURES`喜欢`geometry`页:1`shutdown`编号:
客户端从不向没有登广告的主机发送一个(一个更古老,长寿的主机持续服务)
其它一切,也永远不会被取代。 没有他们:这个应用程序的节点的现场链接浏览器
拒绝 Jonasnon 持有(`join-only`没有键框(R36),而且`paneCwd`无效。

** 未执行——故意超出本在履行权限的范围:**

- 怎么样?`paneOwner`/ 括号内粘贴检测(`bracket_paste_flag`)/`#{cursor x] #{cursor y].
QQcursor flag }`作为  separate 查询. 这些是真实的 tmux 特性 此应用程序也使用
(单位:千美元)`pty-manager.ts`因为`paneOwner`, (中文).`bracketPasteRequested`, (中文).`paneCursor`),但没有一个在
任务最小动词列表,光标位置已经随身携带到内部`capture`因为
产出(`SerializeAddon`将光标重新定位为自身序列化的一部分——见下文),所以
对于此后端来说, 一个单独的光标查询是多余的 。 主办会议
节点从不调用这些只使用 tmux 的路径( 它们一直被锁定)`this.tmuxPath`正在设定,选择会话主机时从来不是。
- tmux 控制模式 "阴影客户端" / 共享背景写客户端
(单位:千美元)`PtyManager.shadowAttach`页:1`shared`) (中文(简体) ). 会话主持人根本不需要等同的:
tmux CLI 命令(每次引用一个完整的子进程),每个会话主动词都是无国籍的
根据会话名称处理的 ONE 已打开的连接中的请求 。
阴影客户端机器的存在 使 tmux 变得便宜 完全不是一个问题在这里。 见`sendKeys`/ 你真是的错`paneCommand`/ 你真是的错`capture`上行:其中无一需要附属客户端. 一个生的
背景写到一个相关的节点(`PtyManager.backgroundWrite`,通过一个
阴影)使用`writeDetachedV1`:逐字记录字节,按姓名地址,无附件. 没有门
打开`ptyShadowClients`(该切换规范`tmux -C`儿童)和从未再受过审判——一个迷失
答复可能仍然输入。

□ 播种陷阱(在触摸之前读这个)`spawnNew`页:1`join`页:1`SessionHostPty`页:1

CLAUDE.md的 tmux 一节说明了后端的负载规则: 在温暖的重排上,
渲染器必须** 种子什么也没有**, 因为 tmux 自己的附着客户端自己重新油漆屏幕
(重画作为普通的PTY输出到达,通过与其它一切相同的通道). 写入
{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}在它上面的缓冲器里 {\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}产生黑色带子和复制屏幕
早期设计.

** 会议主办者不是画家。 ** 将新连接附加到已有的`HostSession`并不使任何东西重新油漆本身——没有任何东西将新的字节写进附件上的字节。 获取
向后移动一个可见的bug:

- 这个后端上没有种子(复制 tmux 规则的逐字记录) - 重新附着的终端是
** 空白** 直至下一个实际产出字节到达。
- 每个后端的种子无条件 ~ Tmux后端得到一个**重复的iscreen**顶部
它自己的证明了这一点。

问题在于`Session.proc.ready`+ 键`PtyCreateResult.screen`,精确地使用了原有的方式
联合路径`PtyManager.join()`) 已经使用`screen`用于同一过程的第二个
用户 —— 这项任务不需要发明一个新 我们走, 只需将现有领域从一个
新来源 :

- 怎么样?`SessionHostPty.ready`解决`{fresh, screen}`从相同的ME`attach`环 警察
建筑师开机了`fresh: true`(冷启动——无画)或`fresh: false`带有`screen`从主机的现场无头终端重建的字符串.
- 怎么样?`spawnNew()`等着`ready`(之后)`spawnSession()`返回)和折叠`screen`输入`PtyCreateResult`它的手回—— 准确的球场`join()`已为同一进程填充
{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscyj7\fscy66\2cHFFFFFF\3cH808080}我们一起来
- 一个被拒绝的`ready`是一个失败的创建, 从来不是一个冷却的终端。 临时地方`Session`已解开并删除,队列输出被取消,原始错误到达
变形器。 赛跑造成等待结果,而不是加入临时指数条目;
脱除的继电器接收一个非零槽退出,因为其遗留的API无法还原承诺.
- ** 制造器需要零改變。 **`seedPaint()`(单位:千美元)`src/renderer/terminal/terminal-config.ts`页:1
已经处理   any 非空`screen`时间:`warm-attach`重放为可画
(单位:千美元)`create-screen`不论它是否通过共同连接或平坦的重新连接抵达——
那种泛泛的事物已经存在, 被任何事物所利用`join()`,在此任务之前。 由
读取`seedPaint`身体而不是假设

中继/移动附件不使用渲染器创建往返: 它询问`PtyManager.sessionExists()`和`captureSnapshot()`在此之前`attachDetached()`这两个公众
叶子必须经过`sessionHostHasSession`页:1`sessionHostCapture`当 tmux 缺席时。 若为
它们又回到旧的 tmux 执行中,一个实况的 Windows 托管代理被报告为
尽管会话主机仍然拥有它,

* 私人模式恢复(Mouse跟踪,括号内贴纸,......)

窗格的光标位置及其 DEC 私有模式( 它请求鼠标的应用正在内部运行)
追踪? 括号中的粘贴? 是否在交替屏幕上 ?) 在纯捕获文本中不可见 。
Tmux自己的答案是`PtyCreateResult.coAttachMouse`页:1`CO_ATTACH_MOUSE_SEQ`- 硬码
由于 tmux 的`capture-pane`无模式
信息,这个应用程序总是运行 tmux才可`mouse on`。 。 。

会话主办者做得更好,因为`@xterm/headless`+ 键`@xterm/addon-serialize`知道真实
模式状态 :

- ** 已核实,未假定**(已读)`SerializeAddon`已编译`_serializeModes()`输入`node_modules/@xterm/addon-serialize/lib/addon-serialize.js`而不是相信文件:`serialize()`输出已经恢复了应用程序- cursor- keys, 应用程序- keypad,
括号上,插入模式、原产地模式、反向包装、发送焦点、包装俏皮、
alt-buffer 切换器和光标位置——全部直接嵌入返回的字符串中作为
ANSI逃脱序列。
-** 已知的差距:**`SerializeAddon`不发射`CSI ?1006h`(SGR 扩展鼠标)
坐标)即使鼠标跟踪活动——公众没有单独的字段`IModes`API将其改为:`mouseTrackingMode`只说哪一个跟踪 protocol :
/xnxn10/n10/ 不用 coordinaten n nxn . 明确填写于`TerminalEmulator.serialize()`输入`src/session-host/terminal-emulator.ts`: 任何时候`mouseTrackingMode !== 'none'`, (中文).`\x1b[?1006h`以手方式附上。

因为这一切 骑在内部`screen`字符串本身(作为真实的逃逸序列)
翻译员写逐字记录)**`PtyCreateResult.coAttachMouse`从未为会话主机设定的形式
届会**——没有任何东西可供单独悬挂。

===========================================================================================================================================================只是一个

上面的修复只有在模式到达模拟器时才有恢复的东西. 打开
** Windows 10**(19041服务线 可是22H2 = Building 19045 including) OS收件箱 ConPTY没有
通过DEC私有鼠标跟踪模式(`?1000h`编号/`?1002h`编号/`?1006h`)或替换屏幕
(单位:千美元)`?1049h`)通到最远的航站楼:它消耗它们并重新油漆屏幕
地点。 因此主机的无头模拟器和渲染器的xterm都没有进入鼠标跟踪
模式,xterm从不向 pty 转发一个轮子事件,并且——因为 ConPTY 重新油漆而不是
卷轴 — xterm 自己的卷轴回转保持空格 。 在全屏TUI(Claude Code with`/tui fullscreen`)轮与轨盘无所事事,而早前的对话是不可通的.
帆布没有涉及:终端容器已经存在`nodrag nowheel`。 。 。

1.1.0 一艘较新型的ConPTY号舰(`conpty.dll`+ 键`OpenConsole.exe`,来自窗口终端
并用它来代替 OS 当与产卵`useConptyDll: true`两个产卵地点
届会主办者(`src/session-host/session.ts`和PtyManager的直译`pty.spawn`(单位:千美元)`src/core/pty-manager.ts`——推广一位助手,`windowsConptySpawnOptions()`(单位:千美元)`src/core/windows-conpty-dll.ts`:

渺小的节点渺茫`third_party/`: 当地人`LoadConptyDll`(单位:千美元)`src/win/conpty.cc`(负载)`<directory of the loaded conpty.node>\conpty\conpty.dll`,以及`conpty.node`是第一个`loadNativeModule`(单位:千美元)`lib/utils.js`发现`build/Release`,, , , , ,`build/Debug`,, , , , ,`prebuilds/<platform>-<arch>`,每个尝试相对`lib/..`接下来`lib/.`将人权纳入
帮助者行走相同的列表, 在第一站停止`conpty.node`答案`{ useConptyDll: true }`只有在两个文件都坐在它的`conpty\`子文件夹。 漏掉的一滴水里有一个THROWN产卵
节点-pty("找不到conpty.dll at..."),不是倒计时,这就是帮助者先检查的原因.
- ** 无法打开。 ** 任何其他平台、文件缺失、解析度或 fs 错误QQ`{}`——收件箱
ConPTY, 和产卵选项字节和之前相同。 它从不扔。 关闭窗口它触摸没有
文档 。
- ** 文件必须是STAGED,因为我们的建筑删除了它们。 ** 节点-pty自己的安装后副本`third_party/conpty/<version>/win10-<arch>/`输入`build/Release/conpty/`但我们的邮箱
运行`electron-rebuild -f`,即为.`node-gyp rebuild`,其`clean`删除`build/`。重建时`build/Release/conpty.node`是一个节点的负载,所以`scripts/stage-conpty-dll.mjs`运行后
电子重建(后置和`npm run rebuild`并复制两个文件 回到旁边
(只有Windows;x64和arm64——拱门节点-pity捆绑). 没有它,每个Windows的建设会
安静地运行在收件箱ConPTY。
- ** 包装。 ** 主过程让他们通过`asarUnpack`(单位:千美元)`**/node_modules/node-pty/**`, , , 组织, 组织, 组织, 组织, 组织, 组织, 组织, 组织, 组织, 组织, 组织, 组织, 组织, 组织, 组织, 组织, 组织, 组织, 组织, 组织, 组织 够了, 组织, , 组织, 组织, 组织, 组织, 组织, 组织, 组织, 组织, , 组织, 组织, 组织, , , 组织, , , 组织, , , 组织, , , , , 组织, , , , , , , , , , , , , , , , , ,, , ,, ,, ,, ,,,, , ,,,,, ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
会话主持人自己的节点-pty副本(`build.win.extraResources`)是一个允许列表,现在的名称`build/Release/conpty/conpty.dll`和`build/Release/conpty/OpenConsole.exe`; 舞台主持人
运行时间副本`resources/session-host/**`递归,所以他们到达它不变。
- 本地的近端路径已经处理两个值: Windows 腿部`scripts/patch-node-pty.mjs`补丁`useConptyDll`分支机构,以及`src/session-host/windows-conpty.ts`读取`_useConptyDll`而不是假设一个。

在设备上未验证(这里没有Windows机器):见下文"ConPTY选择——设备核对表".

输出命令、流程所有权已将几何

`@xterm/headless`应用`Terminal.write()`一个同步的。 PTY 数据回调因此是
不是说模拟器已经准备好序列化这个字节了`HostSession.recordOutput()`链条
这些承诺的到来顺序 每一个温暖一声的附着物 捕捉 调整大小和最后出口
在读取或处理模拟器之前,尾巴相同。 不要用火和遗忘来代替它`void term.write(data)`: 中继/ 手机可以接收主机的温暖快照缺失输出
已经观测到,一个附件赛跑一个待决的书写可以得到相同的块一次活一次一次
它们的种子。 新套接字只加入订阅者设置  after   屏障和快照, 即
另一半 避免重复。

承诺尾巴也是记忆的界限 接受但尚未应用于 xterm 的字节为
计为 UTF-8; 在 4 MiB 时 8 , 主机使用模拟器流程票并暂停节点, 然后返回
只有排队后排到1米B的票 这张罚单是独立的 与两个明确的
渲染器流控与命名管回压. 同样,a`socket.write()`返回时`false`每场会话都要一张车票 签在那个插座上 只有那个插座`drain`返回它。 排水管绝不能取消一个渲染器暂停或模拟器积压。

(            蛊                                                                                    (                                                                                                                                                             (            蛊             所有                                                                                                                                                                                                                                    `SessionHostPty`是一个独特的
暂停和几何所有者, 即使他们都有一个`SessionHostClient`插头。 客户
只在本地 0=1 边上发出暂停ộ子, 在 1=0 时才发出复刻; 然后主机会合并该复刻
与其他进程套接字的连接级票。 几何遵循相同的形状: 客户端
减少其活视图要求,主机部分减少所有套接字要求,并调整大小
PTY与无头终端在串接一个温暖的屏幕之前. 解开一个查看器重新计算网格.

** 客户端的减少是"最近活跃",而不是"最小"(问题#914). 在 tmux a 下
手机镜像节点是它自己的 tmux 客户端, 而 tmux 的默认`window-size latest`给
窗口到哪个客户端是最后一个活动客户端——所以一个解开其键盘的电话得到了它的行
回来 这里的电话( 中继服务)`SessionHostPty`)和桌面节点共享一个客户端
套接字, 而旧的组件最小值将手机挂在桌面节点的行上, 无任何内容
屏幕显示原因 。`latestClaimSize`(单位:千美元)`core/pty-size.ts`)现在以最高的比例的若干索赔。
正确性:附件、CHANGES(重新适应相同大小不计数,或每个适合
)和不是最终报告的文字(`core/terminal-reports.ts`. . . . . . .
每个附加的xterm解答一个 DA/CPR/OSC 查询,这些解答数会把会话交给
谁回答最后。 有三条规则

- ** 不能适应的查看器是天花板。 ** 每个渲染器视图都使它被告知的大小
(单位:千美元)`pty:size`:字母提交的文件框一个较小的网格,像 tmux 客户端所做的那样,剪辑一个更大的网格. 一个比
的各个地方,电话屏幕会把垃圾包装在垃圾里,或者按Pty的大小制造,被剪到
它的左~45列,所以中继槽是`bounding`除非`pty.attach`携带`resizedFrames: true`中,选择的大小按每个限定范围的索赔件的组件夹住。 这个
iOS 应用程序故意维持: 它读作`OP.Resized`只解释空带
("Sized to another screen")和提供"Fit this screen",这个屏幕用一个缩写重取大小.
第1行+1行+第1行的摇摆(一项不变的索赔不是活动)。 因为电话澄清了暗示
每次发送一个大小,主机回答每个水槽报告,无论是否不变——水槽的`sinkShown`被遗忘在每份报告。
- ** Pty的真尺寸回流到每个观众。 **`SessionHostPty.onSize`→`PtyManager`
  `applyBackendSize`→`pty:size`用于尚未使用 X 期限的每个视图,以及`OP.Resized`(载荷=`OP.Resize`'s, 2× uint16 LE) 到中继槽. 届会主办人`Session`仅输入 VOTES 在`applySize`;其观点从后端的回答中校正,客户端在每次发送后都会发送
投票,改变与否。
- 主持人的`geometry`推是谈判在你好,从来没有假定。 **`hello`你好 载着`features: ['geometry']`;主机用它说话和推动的子集回答`geometry`边框
(并添加)`geometry`仅针对所询问的连接。 这不是谨慎:a
年长的客户端会处理每个没有的按键框`data`作为一个EXIT, 所以一个几何框架发送到它
取消第一次调整规模的现场会议(`session-host/geometry-host.test.ts`针锋相对
真正的捆绑主机。 针对一个没有这个功能的主机,客户报告自己的应用大小,
准确, 而它是主机唯一的连接。 交叉连接( 一个主机上有两个应用程序)
HOST 仍按最小组件进行。

同名也是一代的边界. 数据与退出事件包含会话名称,但没有
生成代号,所以退出`HostSession`继续注册直到其队列输出, 最终退出
广播和处置完成。 一个同名的随从 等待退休的承诺,然后它可以
产下一个替补。 因此,旧的套接字可能会在新的附加响应前看到它的旧出口,
但替换者永远无法从前身得到无法区分的延迟退出. 这个
整个等待/检查/创建决定按会话名称序列化;否则两个同时附加
请求既可以从同一个退休承诺中醒来, 既观察空位, 也产下两个
PTYs在两个续作都公布其选择之前. 取消Grace -exit是其中的一部分
原子弹在等待之后运行, 所以它也取消了任何新的空宿定时器退休
指定在替换创建之前。

QQ 重联( 已丢弃的客户端连接不是死会话)

会话在主机进程,而不是客户端. 如果电源主侧连接下降
(瞬间发作的IPC打嗝——不是宿主死亡),`SessionHostClient`开始自定义
当任何想要的订阅者仍然存在时, 重新连接尝试; 闲置的查看器不会被冻结到
稍后的编拟 安装套编拟器包括一个等待修复的屏障。 它会重编拟
与本地有效几何和聚合物的每条 对了`paused`旗帜前
允许重新连接到电线上的请求。 主机应用此暂停
在快照或活用户激活前,输出不能通过重排窗口泄露。

任何退回`screen`通过普通方式交付`onData`路径 :`CSI 3J`以卷起的、`CSI 2J`清除视图、家重置光标和序列
屏幕恢复权威单元格和DEC模式。 发声`CSI 3J`仅仅清除可见的
页面并复制每次重新连接后的xterm回滚。 重用普通数据通道保存
此回收本地到会话- 主机客户端, 而不是添加单独的渲染器 reync IPC 。

修复永远不是火灾和遗忘。 延迟的重播附加无法超过`hasSession`, (中文).`write`, (中文).
或确认`killSession`并恢复已删除的名称。 如果一个想要的恢复,分离,
或重播确认是运输模糊的,客户端会破坏套接字,所以主机的
关闭处理器释放所有连接自有的门票, 然后重新连接和重播仅播放静态
想要的状态。 最后的不订阅赛车 飞行中附加时间表 补偿分解
{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}不 {\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}不 {\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}不

这个`hello`手动在处理中`connect`编号`data`编号`error`编号`close`听众 它只删除那些
收听者,安装制作帧听器,然后解决连接承诺. 永远
恢复宽度`removeAllListeners('data')`在此清理: 原订单已安装
制作监听器并立即删除,所以所有真实的响应在套接字时都消失了
仍然看起来连接。

初次`attach`发送前登记其本地订阅者, 因为启动输出可能会有比赛
反应 如果请求拒绝,它只会回滚 用户和它自己的记忆
选项; 并行的并列选项保持不变。 空捕捉和已经死亡确认
宿主的反应,而拒绝运输的情况仍然不明,并广为传播。 这种区分使得
重试失败的快照 , 防止删除声称未确认的持久性
进程已消失。

同样的真理边界到达了渲染器.`pty.destroy`一项确认的请求,即:
电子预装桥和服务器版WebSocket桥. 帆布、侧边栏、项目和
代理控件删除路径删除本地节点, 恢复状态仅在后置 kill 之后
确认; 验证、 费率限制和运输故障保持节点的存在和可重试。

+++ 临时附件不是会话

一个`attach`在主机验证连接并返回
相关成功对策。`PtyManager`不索引 shim, 报告为持久性,或
在订户面前曝光`SessionHostPty.ready`决心。

如果该附件被拒绝,时间中断,或运输失败:

- 暂时的Shim被摧毁,从未进入持续会议指数;
- 排队字节和延迟退出被拒绝的Shim被忽略;
- 同一飞行中创造物后面的每个呼叫器都收到真正的附件故障;
- 失败的订阅者注册被回滚,所以重新连接不能重播放幽灵附件;
- 掌握或消除运输的不确定性仍然是一个错误,而不是被理解为缺失;
- 没有普通壳或不同剖面的产物作为替代品。

这是故意的失败关闭。 具有相同节点身份的非持久性后退
在失去后端承诺的地产的同时看起来很健康, 并且可以运行一个本地命令
错误的外壳或目录。

这个`hello`交接有同样严格的所有权界限。 握手装置`connect`页:1`data`页:1`error`页:1`close`收听者,只收听收听的回答
请求 id, 只删除这些收听器, 然后在制作帧的收听器之前安装
解决连接承诺。 永远不要恢复宽度`removeAllListeners('data')`此处清理 :
原订单安装了制作听众并立即删除,所以第一个`attach`当套接字仍然被连接时, 响应和后面的每一个框架都消失了 。

初次`attach`发送前先登记其本地订阅者, 因为启动输出可能会有比赛
反应 如果请求被拒绝,它只回滚 用户和它自己的记忆
附加选项; 并行的 com- attach 状态完好无损 。 抓捕和杀戮 保护不变
重复连接的失败区分: 空抓和一无是处的杀都是
确认`{ok:true}`主办方的答复,而拒绝的运输/请求仍然未知,而且
传播. 这种传播使得周期性快照 保持其肮脏的一丁点重试和
当主机从未确认时,阻止删除者声称持续过程的是什么就消失了.

这个`hello`交接有同样严格的所有权界限。 握手装置`connect`页:1`data`页:1`error`页:1`close`收听者,只收听收听的回答
请求 id, 只删除这些收听器, 然后在制作帧的收听器之前安装
解决连接承诺。 永远不要恢复宽度`removeAllListeners('data')`在此清理 :
原订单安装了制作收听器并立即删除,所以第一个`attach`当套接字仍然被连接时,响应和每个后卓有成效的帧都会消失。

初次`attach`发送前登记其本地订阅者, 因为启动输出可能会有比赛
反应 如果请求被拒绝,它只会回滚 用户和它自己的记忆
以三、三、三、三、三、三、三、三、三、三、三、三、四、四、三、四、四、三、四、四、四、四、四、四、四、三、四、四、四、四、四、四、三、四、四、四、四、四、四、四、四、四、四、四、四、四、四、三、四、四、四、四、四、四、四、四、四、四、四、四、四、四、四、四、四、三、四、四、四、四、四、四、四、四、四、四、四、三、四、四、阎、四、四、四、四、四、三、四、四、四、三、三、四、四、四、三、四、四、三、三、三、四、四、三、三、三、四、三 等等、三、三、三、三、三、三、三、三、三、四、三、三、三、三、三、三、三、三、三 三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、阎、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三 等等三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、三、
重复连接的失败区分: 空抓和一无是处的杀都是
确认`{ok:true}`东道方的答复,而拒绝的运输/请求仍然未知,而且
传播. 这种传播使得周期性快照 保持其肮脏的一丁点重试和
当主机从未确认时,阻止删除者声称持续过程的是什么就消失了.

□ 分阶段主机运行时间( 问题供大会审议 # 829, step 3)

作为硬链接启动的主机`nodeterm.exe`安装目录地图
可执行文件、其 DLL 和有利环境`resources.pak`,因此安装器在运行时无法替换它们。 打开
macOS/Linux 会话在 tmux, 一个单独的二进制, 并在更新后存活; 舞台运行时间
给予Windows相同的属性.

发生了什么事? 在包装的 Windows 构建中, 在应用程序生成一个主机之前, 它会分阶段
(单位:千美元)`src/core/session-host-runtime.ts`(d) 运行时间的私人副本

% LOCALAPPDATA \ nodeterm\ session- host  app 版本> - <指印>
节点-sessionhost-v2.exe(nodeterm.exe,更名)
*.dll, icudtl.dat, 资源. pak, 快照 blob.bin, v8 context snapshot.bin, locales\ 上页
资源\session-host\host.cjs + node modules\node-pty\...
nodeterm-runtime.json(标记:文件列表,大小,SHA-256)

然后从那座乐园中派遣使者, 指纹散列每个源文件的路径,大小和mtime,
因此,一个不同字节的同版本的重置會得到自己的目錄.`app.asar`没有
复制(主机从未读过).

** 文件集没有测量。 ** 这是在Linux上写的 是保守的套装`ELECTRON_RUN_AS_NODE`进程可以合理触摸 :`icudtl.dat`需要(节点的ICU数据);`resources.pak`由运行中的主机在 # 829 中 不会打开; DLL 覆盖加载时间并延迟
进口;`locales\`涵盖资源捆绑初始化。 每台机器的证明就是烟雾散去
见下文。 设备核对表项目 1 测量了真实的集合, 这样它就可以被剪辑 。

(                 下                                       (                                                                                                                             主持了                                     在我                                  相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关程序相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关程序相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关主持了相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关程序相关 在我相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关`.staging-<uuid>`除了目标,每个
复制件由SHA-256重读,与安装目录中读到的东西进行比较,复制件是
烟雾运行一次 :`nodeterm-sessionhost-v2.exe -e …`与`ELECTRON_RUN_AS_NODE=1`必须装入,`require`其节点和退出`42`。只有这样,现在已经写入标记,目录是
由1人出版`renameAtomic`。没有有效标记的目录(或其文件不再具有
它们记录的大小)被移到一边并重新使用,从未发射. 两个应用进程,将
同一版本同时成功:第二个重命名丢失并采用第一个目录.

**一个新的图像名称。 ** 已进入现场匹配的卸载者`nodeterm.exe`和`nodeterm-session-host.exe`全机名称; 舞台主机运行为`nodeterm-sessionhost-v2.exe`所以没有人会因为 挡住它们的东西而误读

(                                                               (                                                                                   多谢    (                                         将性别问题纳入                                                             (                                                                                                                                                   多谢                          (                    将性别问题纳入                                       (                      `%LOCALAPPDATA%`,缺少所需的文件,磁盘满载, a
失败的散列, 60 s 以内不回答 42 的烟雾运行 。 — Status DLL切实可行 NOT FOUND, a AppLocker 或
WDAC政策屏蔽 profile 我有可执行文件) 回归后遗症发布:硬链接
在安装目录中,然后`nodeterm.exe`它本身。 一个在10秒内死亡的舞台主持人
除主机本身以外的退出代码`0`页:1`1`也掉头了,而且不再提供
其余 我觉得你应该去调查一下 遗留 我觉得你还是会把安装器挡住 所以下面还有飞行前
保护安装。 新版本的首次发射最多等待45秒(副本,
hashing, 烟雾运行; 通常是几秒钟, 在抗病毒扫描之后更长的时间; 过去宿主是
完成的副本为下一次发射服务。 阻碍进步和失败
附于`<userData>\session-host.log`带有`[app]`标记 。

** 旧本。 ** 装配完毕后,会收集当前复制以外的复制件——故障关闭:仅
当一个Win32 Process查询SUCCEEDS时,不`nodeterm-sessionhost-v2.exe`进程不可读
路径,目录下面没有东西,目录超过10分钟,然后重命名
它会成功(Windows拒绝, 一个失败的查询会删除任何内容 。
由旧版本开始的主机因此保留其复制件,只要运行;一旦退出
(30 s) 其上届后,下届应用发布会删除该副本. 磁盘使用量:每盘约250 MB
版本,通常为一个或两个版本。

** 相互交谈 2008年2月1日。 每个用户数据目录 2007 年每个运行时间有一个主机
开始 更新的APAP 连接到一个由 已经存在的、 已经存在的、 已经启动的、 已经启动的、 已经启动的、 已经停止的 的 AP 。
谈判:状态文件徘徊协议版本(v1或v2已接受)和`hello`特性列表
(单位:千美元)`SESSION_HOST_FEATURES`,比如说.`geometry`) (中文(简体) ). 只要是新会议就去那个东道主那里
兼容; 一旦空出,它就自行退出, 而下一个主机从当前启动
版本副本. 今后每次更改的规则:** 主机协议仅是添加剂**——一个新的
命令或按键框架在`hello`从来没有假设。 旧主机不能运行
拒绝执行`SessionHostProtocolCompatibilityError`,它告诉用户为什么。 一个主机
应用程序不接受的协议版本正在运行,连接失败
这个原因——一个应用程序从不会杀死一个主机来取代它.

** 未涵盖。 ** 永久离职( E)`electron-vite dev`和一个灰烬包 保存遗产
发射 服务器版和macOS/Linux不受影响(tmux).

□ Windows 更新和卸载

主机启动了遗留方式(安装目录内的硬链接,或`nodeterm.exe`财务报告和审定财务报表
绘制已安装的 Electron 可执行文件及其 DLL 。 它的单独硬链接名称使它
可识别;它确实**不**使安装目录安全可替换。 单独关闭应用程序
故意让主机及其会话运行(# 829). 一个从舞台上奔走的宿主
运行时间( 以上) 映射到安装目录中的任何内容, 并且不屏蔽更新或更新
卸载:飞行前既非名称也非路径匹配,旧版本的卸载
不知道它的名称。 更新在舞台运行时间之前的版本
版本的遗产主机一次.

解脱者离开`%LOCALAPPDATA%\nodeterm\session-host`现场,因为一个舞台主持人可能
仍然在逃 无人机从不停车`docs/uninstall.md`说如何
之后把它取出来。

当应用程序或主机运行时,NSIS安装/uninstall预飞系统现在拒绝继续运行
任何安装,或进程运行在安装路径前缀下. 它取代了电子制造器
自动程序终止,包括
其沉默/`--updated`路径。 单独取消会话 。 重试执行新鲜的、只读的进程
查询。 一个失败的查询( 包括无法执行的节点进程) 块
而不是猜测。 静态安装返回一个非零退出代码,不设对话框或杀死.
查询使用 Windows PowerShell , 并附带只执行儿童进程的政策; 没有持续的政策
或更改信任设置。 团体政策限制仍造成安全拒绝。

这是刻意保守的:一个老家伙可能会使用一个全机器的名称匹配或一个
没有目录边界的路径前缀。 另一项安装( 甚至一个兄弟目录
名称从此安装的名称开始)因此可以屏蔽更新. 新的飞行前必须
在援引旧的可执行文件之前,先涵盖那些遗留目标;它从未代表你阻止过这些目标。

** 适用方式(与`shutdown`主机特性 : ** 打开命令调色板
(Ctrl+K) → ** 准备更新... **,或更新卡上的按钮. 当运行的主机是
平台复制, 包含“ suit nodeterm( 持续运行) ” 的对话框线索 ** — 退出, 包括来自
系统托盘,然后运行安装器;** 停止所有会话...** 是次要路径。 A级
无法确定位置的主机被视为屏蔽。 否则:

正在工作或等待您的回答(每个列表都有**GO**按钮;**再次检查**何时)
已经这样做了);
2. 要求每个在画布上开放终端的闲置代理商正常札退出(`/exit`, , (中文).`/quit`· ;
双子座裸体`/quit`永远`--delete`因此,它的谈话被保存, 并报告任何曾经
没有;
3. 显示仍然会停止什么——炮弹和任何在炮弹中运行的东西(未保存的工作在那里丢失),
无法退出的代理商——并请求您确认( Cancel 是默认);
4. 向东道国发送`shutdown`命令:主机以普通的杀路径结束每个会话,
答复,删除其状态文件和退出。 节点确认进程已消失, 然后退出
(可选择打开下载页).

Canvas 节点保留;下一次发射时,每个终端冷启动器和代理设备恢复使用`--resume`他们的CLI和保存历史允许的地方。 如果主机不能结束一个会话,它会说
并不断运行——无一例外。 一个旧节点开始的主机没有
命令;然后对话框显示下面的手动步骤。 节点决绝不杀死主机进程
它本身。 安装者本身的拒绝没有改变.

要手动更新( 旧主机, 或程序内流没有完成), 同时保留您保存的画布 :

1. 取消安装器并重新打开已退出的节点。 在每个本地保存工作
终端和代理设备,包括通过电话访问的非公开/其他项目和会话。
让活动任务完成,然后使用每个程序的正常退出命令并退出其 shell.
把帆布节点放好 ** 不使用会话 ~ 结束会话或删除要准备的节点
更新**:这些行动去除节点,而不是仅仅停止其进程。
2. 通常退出节点决定,所以工作空间变化被保存,并且不能开始替换会话.
在最后一个外壳退出后至少30秒等待空宿主自然关闭.
仅放弃该应用程序不会空出主机;拥有会话的主机会继续运行.
3. 如果主机仍然存在,应取消安装器。 在 Windows 任务管理器的 **Details ** 视图中,
核查用户和可执行路径`nodeterm-session-host.exe`用于此 79.
在节省工作并接受** 主机拥有的每一个终端/代理程序后
stop **,仅结束已核实的主机。 这是人工程序关闭,不是优雅的代理
离开,第一步完成 不要用全机器的名牌杀人 如果主机使用
后退名称`nodeterm.exe`,验证其身份/路径,而不是猜测哪个过程
结束。 另一个Windows用户主机需要该用户的决定.
4. 从安装目录外的Downloads运行安装器,或重试其飞行前.
其他节点设施/用户如果阻挡检查,也必须准备自己的会话.
在安装过程中不要重开应用程序或启动会话 。

退出已保存节点元数据( 位置、 组、 代理/ 会话) 后停止主机
)和现有的闭会历史;它不称为节点删除路径
或将删除条目添加到`closedSessions`。安装后重新打开节点以使用这些节点。
这是**寒冷的恢复**,不是保存活的进程:空壳工作和未保存的终端状态
丢失。 代理机只有在支持恢复时才能恢复,节点已保存有效
对话 id, 匹配账户的对话历史仍然可用. 一个保存的节点
单靠这一点并不能保证恢复、恢复 没事的工作。

新安装者在引用上一个版本的未安装前运行此检查 。 已发运
安装器/uninstallers不能追溯补丁;对其使用相同的准备步骤.
这是一个安全的拒绝和人工恢复路径,而不是现场东道主迁移. 一个** 阶段** 主机
(0.4.1及以后,从`%LOCALAPPDATA%\nodeterm\session-host`() 地图没有安装
文件,所以它不屏蔽安装器,它的会话在更新后存活下来——退出节点计数
(从托盘上也)就够了;所有会话都经过0.4.1 ~ 04.2 ~ 04.3的装置验证。
复附温. 只有安装内部遗留的硬链主机必须先停止. A级
程序仍可在飞行前开始;它不是一个全安装的发射锁。

未参加运行( 静默, 或应用程序ان人)`--updated`交接)最多约30秒
节点在拒绝前结束退出; “ 无法核实” (退出 20) 仍然一次拒绝 。 若为
a 一个`--updated`安装仍然找到节点运行, 它写`%LOCALAPPDATA%\nodeterm\update-failed.json`,重新启动已安装的版本,退出;应用程序
在下次启动时记录失败。

服务器版没有NSIS更新器,并且没有变化. 移动/中继客户端必须预期断开
当用户故意结束桌面会话时;它们不能授权更新关闭。
每个用户/所有用户的真正视窗升级、旧的未安装器、PowerShell政策变化以及
电话重联仍然需要设备验证(固定功能不能证明文件锁行为).

□ 生命时间

镜像 Tmux 的服务器寿命规则与不同的 OS 相似 允许:

- 闪闪发光的脱落,不退缩,`stdio: 'ignore'`, (中文).`windowsHide: true`页:1
(单位:千美元)`session-host-launcher.ts`)——在产卵应用过程完全退出后存活.
- 在包装的Windows构建中,二进制是**阶段运行时间**`nodeterm-sessionhost-v2.exe`在安装目录之外(见“Staged主机运行时间”),所以
主机还比应用程序的更新寿命长;遗留的硬链接是倒置。
- 在一个**包装的**应用程序,`process.execPath`电子二进制本身( 没有单独的)`node`可执行的外壳外壳),所以孩子与`ELECTRON_RUN_AS_NODE=1`, (中文).
它告诉Electron作为一个没有Chromium/Browser Window机械的平板节点过程运行.
在真实的节点二进制(dev mode)上没有伤害:未识别,忽略.
- 客户端断开**detaches仅** - 基础`node-pty`进程,以及`HostSession`从从,从,从,从,从从,从,从,从,从从,从,从,从,从,从,从,从,从,从,从从,从,从,从,从,从,从,从, 所有的从从从从从从从从从从从,从,从从,从,从,从,从从,从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从 Kazakh从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从  This  entire
- 应用程序退出了每个客户端( OS 关闭套接字; 主机自己的`'close'`处理器从每个会话的订阅者设置中删除套接字 ** 并返回其暂停
(票**)和离开东道主
嚼开`PtyManager.killAll()`没有被触动——它已经从来没有杀死 tmux 会话,它
对会话- 主机会话也不做正确的事情( 其中没有代码路径到达后端)
完全没有).
- 东道主在其最后一段会议被杀死时退出**(`killSession`,或者一个会话本身的pty
自然而然地离开,没有留下任何东西),加上一个**30秒的优雅窗口**
(单位:千美元)`GRACE_EXIT_MS`输入`host.ts`)所以一个程序重启,可以短暂关闭每个节点不会撕裂
{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx6 我刚给一个主持人带了个新的会话 一个从未收到过
单身真实`attach`最终也通过同样的宽度定时器退出,装备在靴子上.
- ** 开始比赛** (同时推出两个应用例,或者两个窗口在比赛中第一次懒惰)
连接(Connect):两种过程都可能会产生一个宿主. 完全可以创建州文件
(单位:千美元)`fs.openSync(statePath, 'wx')`); 备案的失败者民意调查(范围为~1.5s)等待
胜利者完成写入`{pid, endpoint, tokenPath, …}`回答一个真实的`hello`,然后退出
安静 状态文件在窗口中解决无物被作为 stale 处理
(原主机 được启动中坠毁)并收回. 同样的"连接 được,只有产卵
失败的形状是什么`SessionHostClient.doConnect()`从应用端,所以主机从一个
 先前的 app 运行被找到并重新使用,而不是复制.
中选状态出版物使用 PID+ 相机临时路径和边框重试原子重命名
(单位:千美元)`session-host/state-file.ts`,保留本地端,这样独立的捆绑就不会导入`src/core`A级
固定`<state>.tmp`让Stale-lock重新找回另一个出版商 和一个赤裸的重命名
当一个 Windows 扫描器短暂地将目标打开时, 启动失败 。
装订管/口袋不是成功的边界:符号书写和原子状态出版物
双方必须完成。 如果失败, 主机会关闭它的收听器, 摧毁任何套接字
预发布窗口,删除其拥有的令牌/状态/端点,并退出非零。 这个捕捉是
明确,因为守护进程`uncaughtException`钩子是诊断和抑制节点
默认的致命退出; 让出版物投放其中, 创建一个无法发现的孤机主机 。
仅`ENOENT`表示没有所有权文件 。 无法读取、 目录、 格式错误和空托
观测失败关闭而不恢复或启动一个相互竞争的主机。 客户也
需要状态文件在 Hello 之前的精确协议版本; 因为主机过期 app
升级,默默连接一个版本-2客户端到一个版本-1尽可能广泛地主机会失去原子暂停和
几何修复.

产卵程序跟本地直接的PTY遵循同样的解析器. 没有明确的程序
一个空`settings.defaultShell`,W所享有的Windows选择PowerShell 7,然后内置Windows PowerShell,
接下来`COMSPEC`编号/`cmd.exe`; 主机绝不能只替换 POSIX`bash`那边

□ Auth —— 无记名符号, 从未在 argv 上

`crypto.randomBytes(32)`在主机启动时生成, 写入到`<userData>/session-host.token`与
模式`0600`,每个客户端在第一次请求前阅读并发送到`hello`边框。 每个
其他请求被驳回(`unauthorized`,插座关闭)`hello`成功 。

** 此寄存器在命令上贴上无记名符号时,发生了一定的安全事件。
页:1`docs/node-identity.md`一个钩子手落在一个长寿的tmux客户端`/proc/<pid>/cmdline`在模式444, 任何人都可以在盒子上读取). 会话主机不重复
的形状 : 符号在任何地方绝不是 argv 元素( 主机仅以`<scriptPath> <userDataDir>`——无敏感),从环境变量 a.`ps`任务
管理者上市可能暴露,而且从未访谈过`host.ts`自己的诊断日志从来不包括它。

** 对运输本身的最大限制:** 端点是一个名为管道的Windows / POSIX unix
插头。 节点默认的管道/口袋创建不包含一个清晰的,经过验证的每个用户ACL in
这种执行——无记名支票是负载存取控制,而不是
运输本身的权限, 完全符合任务指令的要求 (“ refuse any connection
谁的问候符不匹配,关闭它" 被执行; 一个单独审计的管道 DACL 是
没有荫影). 本地的非特权进程, 能够猜测/ 观察符号仍然可以连接; 猜测
256位随机六进制令牌不可行,观察它需要文件系统访问
0600-mode文件 此应用程序的用户账户拥有此功能, 与其它每个秘密相同的信任边界
应用程序已保持休止状态( 账户、 挂钩符) 。

□ 内存绑定

每个`HostSession`拿着`@xterm/headless` `Terminal`谁`scrollback`为`xtermScrollback(settings.tmuxScrollback)`地面为1 000,顶部为10 000行**
(单位:千美元)`src/shared/scrollback.ts`),与渲染器自己的xterm相同的夹口. 核心发送夹住
值,并且主机在`attach`请求边界( E)`clampEmulatorScrollback`所以一个
更老的客户端仍然发送原始的50,000美元 也是被捆绑的。
替换-重播指纹和构造,所以同一请求的重播仍然匹配.
主进程`NativeWindowsPane`ủار الدي الدي الدي العير العبر الدي العي العري الكري العير العي العي الدي العيري الدي الدي الدي الدي الداري الري الدار , الرار 106. , الدي , , الري , , , , , , , , , , , , , , , , , , , 躬.

为什么不重新使用 tmux 的`history-limit`(违约50,000):费用不是同一顺序。 tmux 函数
C. xterm 中的单元格`BufferLine`是一个`Uint32Array(cols × 3)`——每条缓冲线,无论它持有什么,每个单元格为**12 B——因此,一个120列的会话可以填充
50,000行持有 ~72 MB 的 ArrayBuffer( 测量 ~91 MB , 高空; ~ 139 MB , 200 cols)
在一个共享的主机进程内,对 ~14–18 MB 值10,000. 和线过 渲染器
1万人永远无法到达:在这个后端,渲染器的xterm是用户唯一的表面
卷轴,但每个温暖的附着 序列的全部历史, 运过管道和IPC,
接收的 xterm 丢弃了其中的80%( 测量: 50k 线 = 5.4 MB 字符串同步构建于
~0.7 s,每场会话的输出会延时; ~0.13 s中为10k~1.1 MB. 抓取模拟器绑定
附加种子,并并对其进行同步`capture`因为`full: true`施工——无协议栏
这是需要的。

未恢复位置: 由 50000 元创建的 OLDE 主机保存到缓冲器
结束 — 安装新应用程序不会升级运行中的主机( 见下文), 而旧的主机不能是
告诉收缩。 降低设置同样只适用于新的会议。 在模拟器之外
其余的每届会议费用为:`SerializeAddon`'目前提供技术咨询'`serialize()`运行(attach, 加入, 定期快照, 抓取请求) —— 从未连续举行 。

设备检查欠( 不屏蔽 ) : 主机 RSS , 10– 20 繁忙的正常屏幕会话, 在前后 。

预定会议的费用由同一届会议预算决定。
(单位:千美元)`core/session-budget.ts`:通过优雅窗口,在内存压力下或通过脱落计数
盖,收割者通过东道主的代检杀结束——见上文"可观察性".

观察性`sessionDetails`:收割者,会话记忆面板, dev-server方面也端口

问 tmux 有关其会话的三个表面——会议收割者(`list-windows`(单位:千美元)`session_attached`+ 键`window_activity`),会话-记忆面板和dev-server端口
(单位:千美元)`list-panes`(单位:千美元)`pane_pid`)——通过ONE添加剂的问候功能向主机询问,`sessionDetails`. 与之谈判的连接,除了不变的`names`每行数
LIVE 代号:`{name, pid, subscribers, lastOutputMs, createdMs, generation}`(单位:千美元)`ListSessionsResult.sessions`(原始内容存档于2013-10-11). ). 一个老客户从不问和读`{names}`字节换字节; a
旧主机从不回答,客户端报告`sessions: null`——命名但未说明.

- ****`lastOutputMs`是诚实的闲置时钟** (tmux的)`window_activity`,而不是它的`session_activity`:盖在每块地上`data`召回,移动的任何东西 仅看 -
附加、分离、捕获(`session-details-host.test.ts`双向针对真实
捆绑主机).
- ****`subscribers`需要没有`shadowed`减 **:主机没有控制模式阴影(a)
背景情况`sendKeys`不需要订阅),所以每个订阅者都是查看者. 收割者的后端
(单位:千美元)`PtyManager.sessionHostReaperBackend`)代替ADDS 1作为节点,这个过程有一个直播
session for – 一个主机重联简短地报告屏幕上一个终端的零订阅者.
- ** 读数从不发射主机** (`listSessionsDetailed`),而失败的读取是`null`从来没有
一个空列表。 缺席状态是"没有宿主";PUBLISHED状态不是活的侥幸状态(一个宿主)的证据.
从任务管理器中杀死, 重新启动), 因此一个寒冷的客户端会连接到“ 保证连接( { 启动 ):
假的 )` and nothing answering is a failed read — the ordinary `请求()仍在进行的路径
每一次民意调查都有一个新主持人 收割者没有计划 记忆面板
说"不能测量",dev端口说`unreachable`。 。 。
- ** 收获恰恰杀死了观察到的列名的一代人**(`killSession`因为`expectedGeneration`),从不单独指名道姓,没有其他:没有回滚删除,没有
墓志铭. 委托人拒绝这种杀戮 因为它的名字是它附着, PtyManager 重新任务
"我们看这个节点吗?" 在杀戮时间, 一个成功的观察 代杀永远不会清除一个
live local context(主机为已经逝去的一代解答成功,这也许意味着a.
同名继任者为所附者)。 一个收割的节点冷冻器`fresh: true`),与tmux收割相同的合同. 那个
收割者的预算 触发器和杀人时间 重新验证`session-budget.ts`',不变;
在Windows上的内存读取是`os.freemem()`,这是OS可用的物理内存。
- ** Memory 面板**:每行的pid被滚动到Windows进程表上
(单位:千美元)`Get-CimInstance Win32_Process`, (中文).`WorkingSetSize`一个`powershell.exe -NoProfile`每个面板
开放——从未接受过调查;始终绝对`%SystemRoot%\System32\WindowsPowerShell\v1.0`路径,`powershellExe()`,因为Windows会先解决cwd的赤色名称. 旧主机无法描述的会话是`unmeasured`拥有自己的
句号。 没有主机运行是"没有会话",不是失败.
- ** 东道主本身的费用**(`SessionMemoryReport.host`, (中文).`hostOverhead`输入`core/session-memory.ts`:
从每扇窗子的SHELL上滚各行,而ConPTY的宿主/OpenConsole是宿主的孩子(The
shell's sible),所以无论是它还是主机进程本身——每个会话的无头模拟器,
节点-pty的每场会展工人线条——在任何一排。 上市现在携带主机pid
从状态文件( R)`SessionHostListing.hostPid`; 每个主机版本都会写, 所以没有协议 。
并显示一条不可杀死的线,`nodeterm session host (N consoles)`报告中的建议,添加到
仅列在`measured`大门 两个数字都是MEASURED工作套件,标注如下:
如此;无任何估计。 每一个非贝壳的孩子都包括在内 所以当宿主的 pane -probe
PowerShell工人(下方)温暖——在探测器后最多60秒——其工作装置是线路的一部分
也是,这确实是宿主的成本,但预计当线路闲置时会下降. 未知的主机pid, 表中缺少的pid, 或未描述的
会话(其 shell 将被预订为主机高空) QQ 无线, 永远不会`0 B`。空闲主机没有
语句仍然被测量。
-廖夫服务端口**:每扫描一次PowerShell呼叫——`Win32_Process`加号`Get-NetTCPConnection`(拥有 pid 是一个内核字段, 没有任何进程可以重新命名自己),
倒计时`netstat -ano`(听众被一个0的外国港口承认,因为国家
栏为本地化)。 非零出口为`unreachable`没有N -会话 没有产物。

帕内探测器:每个过程一个长寿命的PowerS一封

`paneCommand`(重新启动/生态退出劳力调查、特工现场、发射准备)
(单位:千美元)`readWindowsConsoleOwner`信息,Eco的老板读,`terminateOwnerV1`) 用来开始新`powershell.exe`每个呼叫; 所有人探测器也重排`Add-Type`(csc + PS 5.1 上的临时组件) 他们是:
每次都这样 瞷常筁`session-host/windows-probe-worker.ts`:每个过程一个懒惰的孩子
(主机,或主机用于一个直接的Windows PTY),用于编译 ONCE 类型并回答 JSON 线
请FIFO。 规则必须保留:

- ** Fallback,而不是替换。 **`unavailable`(无法开始,超时,死亡,垃圾)
回原一拍脚本;`failed`(工人运行了探测器 它失败)
真正的答案,没有被重审。 连续两次运输故障使工人滞留5分钟。
从不重复循环 期限:产卵(启动+编译)的职权规定,
暖和1.5个 60s之后的Idle退出; stdin关闭结束循环,因此与它的母体一起死亡.
- ** 工人首先拥有自己的结构**`OpenStandardInput/Output`因为...
探测器`FreeConsole`页:1`AttachConsole`s. 未经核查的装置——以下核对表项目P1。
- **表读数在飞行中合在一起,从未按时间缓存**(`createProcessTableReader`) (中文(简体) ). 那个
退出民意调查只接受两次Consecutive民意测验中更改的读数;
两人将证实一个仍在运行的CLI的短暂孩子 从一个观察,并输入
恢复到现场
-** 每一个一枪道都是绝对的`%SystemRoot%`动力壳**(`powershellExe()`从不
名无虚名。
- 慢读还是会拿到样本的 退出阶段欠着一个至少持续回答的窗帘`RESTART_MIN_EXIT_SAMPLES`(4) 读数,每个读数`max(window left, timeoutMs/2)`这么感冒
~1.5s读数不能将8s退出的CLI变成虚假`exit-timeout`(tmux上的惰性).

节点-pty的针头工人线条(有记录,没有改变)

1.1.0 开始一个`worker_threads`每个ConPTY的工人(全V8隔离)
(单位:千美元)`lib/windowsConoutConnection.js`),在平原节点上每闲置一个~11~12 MB RSS(10名工人)测量.
+118 MB,30名工人+349 MB);`ELECTRON_RUN_AS_NODE`可能还要多一点 没错
节点-pty用于保持凸起的设计从主线上读出(a)`ClosePseudoConsole`绝对不能
因此我们不会把它拆掉。 现在
我告诉你,这是在记忆面板的会话主线之内,我们这边的杠杆是:
会话计数(关闭屏幕发布, Eco, 断开会话的收割者). 共用一个吸管工人
通过`scripts/patch-node-pty.mjs`只有当设备显示 ~ ~ 8 MB / 会话时才值得这样做 : p4项 。

□ 诚实的限制

- ** 如果会话主机进程死亡,或机器复发,其会话随它而终止。 ** 这是
绝对弱于真实的 tmux 服务器的保证, 它是一个成熟的, 独立发送的 C
守护此工程不维护 。 现有的**寒冷恢复路径**(长期倒退)
抓图 + 代理`--resume`) 已存在, 用于“ 机器重新启动的” 案件并适用
此处不变:`spawnNew()`正确报告`fresh: true`当难民高专办的新主机没有记录
a 先前运行的会话,即触发渲染器冷启动重放的会话
(单位:千美元)`attachReplay`→`'cold-snapshot'`和CLI的经纪人`--resume`周期性回滚
示意图( E)`snapshotScrollback`运行于同一15秒计时器上的会话主办部分
作为 tmux 路径,使用相同的磁盘格式(`scrollback-store.ts`这是完全的
后端不可知——不需要任何改动)。
- ** A WSL 配置文件不会将其发行的 tmux 变成 Windows 后端。 ** 节点
发送默认 shell 通过`wsl.exe`,而 Windows 会话主机拥有
由此形成的进程。 至于这个过程, 现有解析器所找到的可真正进入 Windows 的 tmux
很显然,这些小径和小径是不同的。`tmux`仅安装在WSL内部的Windows PATH上。
- ****`paneCommand`答案可能不准确** 当一个会话有多个并行子女时
进程(代理CLI+MCP服务器)——见`process-tree.ts`医生的评论。 打电话的人
(在位代理重启,唤醒,触发发送,RunBar,会话重命名)只需要"是一个 shell
所以行走过程只有在每个活过程中 才会回答SHELL的名字
树是壳,否则它会回答非壳。 这很重要,因为`isShellCommand`承认`pwsh.exe`页:1`cmd.exe`页:1`bash.exe`: 外壳只是运行中的代理人下的叶片
(Claude的Bash/PowerShell工具,一个MCP服务器通过`cmd /c npx`)不得读作"CLI".
放开我 未来需要更精细的呼叫者不应认为比这更精确。
- ** 节点-端点驱动器是全球性的,所以所有权是分类而不是猜测的。 在一个应用中
过程,`pty-manager.ts`保留每个查看器/所有者`pausedBy`分类账。 那么独立主机
使用认证的套接字保留第二套套接字:第一个暂停节点的套接字,
一个无关的套接字的简历是不可操作的,只有最后一个所有者离开/恢复激活
续会。`detach`运输`close`把套接字的票还给我 这不能给两个
连接独立的输出流( node-pty 有读侧),但它保留了
必要的最慢查看器语义, 关键是,一个崩溃的查看器不能再冻结
永远为每个健康观众提供现场直播
- ** 无独立审计编号的风笛/un呈件**——见上文“Auth”;
无记名标志是强制边界。
- ****`paneCwd`只知道 shell 报告什么。 ** pwsh, Windows PowerShell 和 cmd 一旦不报告
默认( 无 OSC 7 / 9; 9) , 所以 Plain Windows shell 的相对文件链接仍可针对
仅发射 cwd; 发射OSC 7 / 我不喜欢 / 9;9 / 633 工作的CLI和壳体集成剂。 无提示
为它们安装了钩子(它会重写用户的 你以为它是一个选择输入是后续) 。
- 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得  不得 不得 不得 不得  不得 不得  不得     不得  不得 不得 不得 不得 不得  不得 不得 不得 不得 的不得 不得 不得  不得 不得 的不得 不得 不得 不得  不得 的不得 不得 的不得 不得 不得 不得 不得 的不得 不得 的不得 不得  不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得 不得    的不得 不得   不得 不得          不得 不得 不得 不得 不得 不得 不得 不得  不得     
一个节点,没人会坐只读的车`watch-attach`附件,没有打字路径(
主机拒绝其写入, 密钥不能重排为框架`sendKeys`粘贴). 输入
路由在连接时决定, 因此在主机打开节点后, 查看器只保留读取, 直到它
复会.
- ** 无相当于`paneOwner`页:1`bracketPasteRequested`/ 一个独立的`paneCursor`查询** -
见协议表的"未执行"注释. 此应用程序目前没有任何内容可以称之为
会话主持人支持的节点( 门在后面)`this.tmuxPath`因此,没有什么是
默不作声的破碎;未来需要其中之一在Windows上的一个有望实现的特性需要一个新的主机动词.
- 电话中继器没有Tmux来驱动这个后端。 超过无 SSH( 仅重复) 配对
电话用于(a) 将 POSIX 发射线打入新的窗格,(b) 通过写 SGR 轮子滚动
tmux 复制模式的字节 。 既不在此持有: pwsh / cmd 拒绝`2>/dev/null`, (中文).`env -u`, (中文).`VAR=x cmd`,而一个轮子 没有人要求土地 作为文本在即时。 所以,电话发送`pty.attach { launch }`和HOST发射`core/relay-launch.ts`: cwd/帐号骑着产卵
选项,该行是为窗格的真实剖析器而建,并打过一次;`launched:true`承诺
只有在飞行前建造成功之后,`paneShell`告诉电话是否输入了 POSIX 行
在窗格中是安全的——一个Windows桌面的 SSH 项目节点是`posix`),附件答复说:`scroll:'local'`带着满载的快照,`pty.scroll`仅在`paneModesV1`报告应用程序能够获得鼠标。 键入能够获得的收件箱答案( E)`agent.key`页:1
(单位:千美元)`inbox.ack`),文件夹浏览器(`fs.browse`)和简单捕捉(`pty.capture`)是继电器
动词出于同样的原因. 所有添加剂;`host.info`列出用于特性检测。
- ** ConPTY 帮助拆迥可以发出`Error: AttachConsole failed`** 来自`node-pty/lib/conpty_console_list_agent.js`。协议测试决定从
主机回复和后续会话状态,而不是 stderr 文本。 这个化妆品
软件包中显示的依赖性信息仍然是待定文物运行的一部分。

□ 自动核查

QQ 直接 ConPTY 代理消息( 与持久主机分离)

桌面也可以持有一个**非持久性的本地 PTY**,由画布节点ID索引,但
无`Session.persistKey`。只检查持续会话不正确返回`targetGone`如此运行的 OpenCode 。`hasLiveSession`现在使用常见的运行时间检索 。

`core/native-windows-pane.ts`为这些直接的 PTY 执行消息传送 。 用一个
注解 :
身份通过控制台会员身份 和毫不含糊的贝壳孩子链。 出生时间
和一代代ID检测替换/PID再利用。 它故意不选择任意
最深的后裔,将即时文本解释为可执行文本,或者接受一个脱节控制台.
此 Windows 所有权证据不是 POSIX 前景组语义; 模棱两可的控制台
树木拒绝。 译者通过脚本识别: 探测器仅保留第一个
立场参数( E)`CommandLineToArgvW`在PowerSh徘徊)和`scriptCommandName`解决它
到命令的 npm 软件包`bin`,然后转到脚本基名。 测量
Windows 11 (2026-09-14) 对抗从画布上打开的活的 Codex 面板:PR时代探测器已读`node`而已安装的应用程序被拒绝`send`与`targetNotAgentPane (observed: node)`时,
新探测器已读`codex`(单位:千美元)`agent`从同一个控制台。 单独的控制台中的假 npm 包
证实探测器输出中从未出现过快速参数 。 那个
翻译是叶子;其子孙(本地人)`codex.exe`, MCP 服务器)不计数. 现有项目同意书,经核实的闲置钩,
交货锁、写完后核查和收据跟踪仍然有效。

持久性主机有一个单独的、添加性的信息扩展(`messageOwnerV1`, (中文).`messagePasteReadyV1`, (中文).`messageEnvelopeV1`) (中文(简体) ).`session-host/message-pane.ts`观察操作控制台
在 ** 主机的 ** 会话生成中, 并读取主机输出后的现有模拟器
障碍. 在发送前,它重复了身份探测器,再次检查粘贴模式,并确认
表示每次等待之后,同一会话对象仍然被登记。 然后写一个消毒
多行括号粘贴, 监视自己的仿真器直到信封页脚完成, 是否会发送
输入为第二写, 仅当同一代仍在注册时
(单位:千美元)`core/settled-submit.ts`,与服务器版共享). 以粘贴字里面的“输入”
Codex 0.154 将信封留在作曲者中,并报告交付情况`stalled`主要仍然拥有项目/同意/执行/二进制
和接收门。 直接适配器从未用于主机支持的会话.

在桌面发布客户端后, 主机支持的会话仍可地址( park 过期 ,)
关闭屏幕发布。`targetLive`来源`PtyManager.sessionExists`和三个消息
探测器路线`sessionHostOwns`,在无时读取噬录`Session`左转,
原应适用`sendText`'规则(没有本地 tmux 表示主机拥有持久性).

** 停止代理(`terminateOwnerV1`, 型号开关 / "重新开始订阅") ** 视窗有
没有前景进程组, 因此`PtyManager.terminateForeground`不能一号签字。 在一个
会话 - 主办方的面板 它发送它刚刚证明的主人`messageOwnerV1`(代理身份门)
该    (                                              (                                         (        这几个                                                               (                                                                                            
拥有者,需要`sameNativeProcess`(pane生成, root pid, 单 pid, OS 诞生时间,
可执行文件),拒绝控制台根和任何 shell,ukoi,只运行`taskkill /T /F`关于这个
pi 98.`session-host/terminate-owner.ts`) (中文(简体) ). 壳体为后续的循环体生存. 一个直接
ConPTY 面板在核心中运行相同的助手对战`NativeWindowsPane.owner()`。旧主机答案`unknown command`; 客户端映射到`'unsupported'`画布上写着主机早前
收录了该词的收录。 和现在的收缩`/F`给特工一个冲浪的机会——CLI's
每条短信都会附上记录 所以`--resume`仍然找到对话内容(  你没事吧 ) 。

该扩展是独立版本的,所以现有的终端协议v1/v2不变.
旧的现场主机拒绝新的命令名,客户端返回无效/虚假而不下降
返回到`write`, (中文).`sendKeys`,或当地 tmux. ** 总计新应用程序不会升级一个已经
运行中的主机。 ** 它必须在现有会议结束后,在用户协调的时间内退休;
下一个主机从新的捆绑开始。 永不终止用户的直播主机作为升级步骤.
现有的ConPTY一代没有热量迁移到另一个主机.

`scripts/smoke-session-host-messaging.ts`在其命名的 Windows 主机上练习一个单独的真实ى生
管道,使用本地假读器(无模型/API呼叫):OS身份,2s范围内的探测潜伏度
预算 精确的多线框架 呆滞的生成拒绝 和退休 孤立的固定。
这证明了实际的OpenCode代理之间的传输扩展,而不是消息/复制发送.

安装设备验收(2026-09-13,当地建筑)`0.3.5-windows-messaging.2`: 每一条之后
OpenCode恢复后, 发布了新的核实状态,
建筑师和编码师;`NT2-ARQ-OK`页:1`NT2-CODER-OK`以本地消息格式发送的回复
协调员记录中的信封。 印有确认的双向交货记录
包括协调员闲置后发出的排队答复。 这些续会
是 ** 直接 Windows PTYs ** (它们的外壳进程是桌面主进程的孩子);
旧的恒定宿主不再运行。 因此,这种接受证明已安装
后端的信息工作流程,而持续扩展仍由单独的
上面是真主机的固定装置 而不是声称这些OpenCodes 运行在它内部。

桌面信件发送也等待待刊, 然后再请求主机授权
这对。 没有它,新打开的节点可以在`list`和上下文链接,但不包含
从主持续的项目快照, 其范围解析器标注它`cross-project`文件
冲突阻碍了该出版物的出版;它从未作为Keep my的沉默回答。 服务器控制
已持续创建; 移动不是这些代理信件的发送者 。

`scripts/smoke-windows-agent-messaging.ts`用本地阅读器测试一个真正孤立的 ConPTY :
控制台身份 一个多行括号的贴纸 处置后拒绝 没有LLM
打电话 安装-应用消息/与实际的OpenCode代理进行重试是单独的接受.

`scripts/sim-agent-messaging-windows.ts`运行调制解调器 \\ 建筑师 \ \ 编码器情景结束
最终面对一个孤立的真正的主机, 与真实的镜子,决定者,`deliverFromControl`时,队列和
接收表;只有代理人CLis(paste-aware假作曲家)和钩子运输是
模拟。 2026-09-15:三轮发射/中途通过,包括排队的繁忙目标
以闲置的、被证实的、`SessionStart`+ 键`idle_prompt`执行经核实的闲置
没有转弯。 有两个发现它被钉住:一个应用软件重新启动了一个闲置的代理商,而这个代理商的CLI没有挂钩
留下来`targetStatusStale`在每一次重试中,
并且反对每150毫秒 耗尽输入量的读者`sendKeys`计划
即刻输入),其输入在固定信封时被吞入糊状
提交。
在 Windows 上的 OpenCode 语录导出不属于此更改: 它运行已解析的 npm shim
结束`directExecutableInvocation`(单位:千美元)`opencodeExportAt`, 655号).

重点套房进行行为而不是扫描执行来源:

- Windows配置解析器涵盖检测优先级、标准Git Bash位置、自定义
包含空格的绝对路径,`%COMSPEC%`, 无法执行的可执行文件, 错误的ID, WSL
UTF-16/NUL输出,含有空格的分布名称,以及cwd转换失败;
- 解析器/发芽测试证实:`node-pty`和会话主机创建 50
发射计划,以及明确无源的剖面图不会产生后退产卵;
- 怎么样?`pty-session-host.test.ts`成功创建加临时/拒绝附加
撕裂、串联呼叫者、晚期事件和持续的结果;
- 怎么样?`session-host-client.test.ts`使用真正的本地套接字来进行 Hello 过渡,
相关反应、用户倒转失败、重新连接和运输不确定性;
和
- 工作空间/节点执行测试证明`terminalProfileId`从未进入共享/出口/入境状态
并且当地覆盖 幸存的重载。

临时接受敌对特征 导致失踪
WSL 分布到后退, 并删除机器局部剥离; 每个相应的焦点
测试必须变成红色。 前源文本外壳回归测试被故意取消.

最初的会话东道主执行也对照真正的ConPTY会话进行人工核实.
订单 连接自有的暂停分类账 无 tmux 中继探测器/抓取 平台这项倡议
原子国家出版物现在还用对抗性日程和
输入共享违规。 该来源/运行时间证据不能取代包件检查.ersa.org

□ 仍欠一揽子核查

QQ 分阶段主机运行时间( # 829 step 3) — 设备检查表

在 Linux 上进行书面和单位测试; 以下没有运行在 Windows 上 。

1. ** 衡量文件集。 ** 在已包装的构建中, 运行过滤到的进程监视器`nodeterm-sessionhost-v2.exe`在主机启动和附加时; 记录每个打开的文件
已上演的目录。 弹簧`RUNTIME_*`输入`session-host-runtime.ts`到该集(预计`locales\`和大多数DLL是不必要的),并重新运行烟雾检查.
2. ** 烟雾运行通行证。 ** 重新安装新建筑, 打开一个终端 :`session-host.log`显示`[app] staged runtime: published <key>`细节显示`nodeterm-sessionhost-v2.exe`下有路径`%LOCALAPPDATA%\nodeterm\session-host`。 。 。
3. ** 更新0.3.x + 新建有实况转播的会议。 ** 在与遗产主机的发布, 第一个
更新仍然符合遗留主机(预期:如前准备). 那么,随着新的建筑
舞台主机持有活壳/代理, 安装 NEXT 架构, 并关闭应用程序:未被安装者
不得迅速、必须完成,在每场会议重新开放后,`attach (warm)`,与更新前相同的主机pid).
4. **相同,安装期间应用软件开放**:仅为应用软件的飞行前提示;
关闭它 安装完成和会话保持温暖。
5. ** 更新时未安装旧的。 ** 确认前一版本提供关于前868版本的未安装
存储 1 和 # 868 one)随着舞台主机运行完成.
6. ** 兼容性。 ** 由建设 N 运行的舞台主机, 启动建设 N+ 1: 新终端启动
到旧主机; 在最后将得到的会话关闭和30s通过后, 下一个终端启动主机
从N+1的副本和N的目录在接下来的发射中被删除.
7. **GC故障关闭。 ** 随着一个旧版本的舞台主机运行,推出新的应用程序:那个旧的
目录被保存。 与PowerShell被政策封锁:没有被移除.
8. ** 答辩人/反车辆地雷** 第一次进行实时保护:时间(时间戳),检查
用于检疫或SmartScreen提示,且持有新Exe的扫描不会失败
发布重命名。 重复第三方 AV 和 AppLocker/ WDAC 拒绝执行文件
profile(预期:烟雾运行失败,遗留发射,安装器仍然保护安装).
9. **磁盘使用。 ** 一个分阶段版本目录的大小; 只确认当前( 加运行)
版本在几经更新后仍保留只是个版本。
10. **Uninstall** 设有一个舞台主持人运行:完成、主办和会话持续运行,
已设置的文件夹;在主機退出後,可以删除此文件夹.
11. ** 两个用户/所有用户安装。 ** 每个用户分级自己的副本;一个用户的主机不
屏蔽另一个用户的更新。

QQ 会话- 主机高空和 Windows 探测器—— 设备核对表

P1.** 职业工人结构** 随着工人的温暖, 运行100个代理信息 和生态循环:
探测器答案,没有`csc.exe`页:1`powershell.exe`进程探索器中的锯齿,以及`FreeConsole`页:1`AttachConsole`在持久性进程内部,它不会打破自己的标准/标准。
P2. ** 潜伏期。 ** 时寒时暖`paneCommand`和所有者探测PS 5.1。 目标:温暖
在2 s pane-probe预算范围内; 在6 s 第一次要求的最后期限之内冷却。
P3. ** 东道主亲子关系。 **`Get-CimInstance Win32_Process`显示 conhost.exe / OpenConsole.exe 时使用`ParentProcessId`=会话主机的pid夷(所以面板的行数),用于收件箱ConPTY.
P4. ** 届会主办费用。 ** 会话主机工作集 + 私有字节, 0 / 10 你好 / 30 空闲`cmd`届会,以及`useConptyDll`。在此记录每个会话的三角洲;补丁共享
只有在工人评述每届工作时,
P5. **在Windows**上的Eco,以pwsh和cmd为默认 shell:闲  `/exit`睡觉
醒来吧`claude --resume <id>`键入一次;会话-记忆面板显示树向
单枪匹马 用本地语言重复`claude.exe`和一个npm`claude.cmd`;带MCP孩子的节点
(单位:千美元)`node`→`cmd /c`→`node`)不是误读为外壳;a`blocked`节点从未退出 。

・ ConPTY 选择(捆绑)`conpty.dll`) ——设备核对表

在 Linux 上进行书面和单位测试; 以下没有运行在 Windows 上 。 各运行于 ** Windows 10
22H2(19045)**和在** Windows 11**上,包装的建筑:

C1. ** 哪个ConPTY运行。 ** 任务管理器 → 终端打开时的细节: a`OpenConsole.exe`其路径处于安装(主要进程)或`%LOCALAPPDATA%\nodeterm\session-host\…`(会话主机),没有收件箱`conhost.exe`为了那个终端
C2. **全屏幕 克劳德轮轴,在帆布节点。 ** 克劳德代码`/tui fullscreen`长
对话:鼠标转盘和跟踪盘滚动对话;较早的转盘可以到达。
C3. ** 坎班卡模式中的相同内容**(其共同附图的查看器),包括打开后右侧
模式,不按键。
C4. **vim/ htop鼠标。 ** 单击将光标置于vim`:set mouse=a`; 单击进程进入
htop(或另一只鼠标感知TUI);轮轴在它们内部滚动.
C5. ** Plain shell回滚仍然有效。 ** 在 pwsh 和 cmd 中,运行一些打印
百行:轮轴卷轴 xterm 的自身历史如前,和 Shift-drag 选择副本.
C6. ** 应用程序重启后重新输入警告。 ** 退出并重启,全屏Claude和Vim
打开:两边都重新加热(`attach (warm)`输入`session-host.log`轮子仍然有效
没有按键键(从主机的串行屏幕恢复mouse模式).
C7. **落叶无`OpenConsole.exe`.** 关闭一个节点与x,结束会话,一个生态退出周期,
并退出会话主机进行更新:在每次更新后,没有孤儿`OpenConsole.exe`保留在
任务管理员,以及`conpty.kill`仍然报告正证据(否)`could not safely close`页:1
C8. ** 背书。 ** 删除`build\Release\conpty\conpty.dll`从装入的安装的会话主机
复制: 终端仍然开放( inbox ConPTY),它们只是失去C2.
C9. **P4 与`useConptyDll`** 上文P4的届会 -- -- 东道方费用,再用
捆绑的ConPTY——`OpenConsole.exe`替换`conhost.exe`,以及内存面板的主机行
仍然必须计算(P3的亲子关系检查,用于`OpenConsole.exe`) (中文(简体) ).

* 先前的项目

真正的Windows x64安装器仍必须通过所需的廉价无头路由进行:
创建所有可用的配置文件, 核查输入/输出/ 大小/ Unicode/ copy/ cwd 和标签, 重新启动
通过破坏性剖面图警告切换节点,并记录
拾取器,配置终端,不可用状态,以及发射后重排。 直到这建成
现有文物证据,本文件未声称已对全部包装的核查
已完成。

`paneOwner`, (中文).`bracketPasteRequested`,独立`paneCursor`查询,独立审计
如下文所述,Windows named-pipe DACL 硬化度仍在此配置文件通过之外
"最大限制".

□ 故意没有做的事

- 最初的执行情况是对照真正的ConPTY会议进行人工核查的。 订单,
连接自有暂停分类账、无 tmux 中继探测器/抓取、平台外壳选择和原子
州刊现在通过对抗性日程测试行为 并注入
分享侵权情况。 在单独的Windows设备上启动的包装安装器仍然欠下(参见`docs/windows-support.md`;这些测试并不假装要替换设备检查.
- 怎么样?`paneOwner`, (中文).`bracketPasteRequested`独立`paneCursor`查询没有端口 - 见
"最大限制".
- Windows named-pipe DACL 硬化到超过节点自身默认值时没有尝试——持卡人
符号是已执行的边界,有这样的记录,而不是默默地认为是完美的。
- 中继主机的`createDetached`/为指导`attachDetached`路径被留到`spawnSession()`新的分支自动使用( 他们直接使用它, 没有前置的 ASync)
),所以它们工作,但没有通过中继器单独进行手验证端对端.
——只有主创建/结合/重联/抓/杀路径.

非信息发送结果(# 780)

新呼叫者使用添加剂`sendKeysV2`返回时`result.delivery`显示 :`true`完成时间
请求写道,`false`输入前,或`pasted-not-submitted`当粘贴着陆时
解密/模式/生成检查被扣 Enter,或传输的请求丢失答复。
后一种情况不确定:既未证实粘贴,也未证实呈文。 最后的结果是自动终端
交付:检查终端,不重发或盲目按 Enter. 画布, 触发
运行历史, 单向UI作家浮出水面。 旧主机拒绝此命令并保留
它的届会; 没有倒退到`sendKeys`,原始输入,或自动重新启动。 遗产
客户保留其现有的`sendKeys`电线合约. 没有真正的 Windows TUI 测量
由假PTY回归固定装置声称。
