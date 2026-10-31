> English: [docs/en/session-backends.md](./en/session-backends.md)

# 会 một会话后端: Zellij 和 herdr 在 tmux 旁

rinteal 将一个本地端口保留为 addrive address , 通过在 ultialxer 中重新显示它 。
指定`nt-<node id>`: tmux on macOS/Linux,Windows上的会话主持人. 有些人活着
在**Zellij**或**herdr**中,希望他们的画布终端成为该工具的*会话,所以它们
随处可见 此文档是 v1 背后的测量 :`PtyManager`需要从它的后端,每个工具提供什么,哪个v1工具以及为什么,以及
后端不会做什么

□ 如何衡量它

- **Zelij 0.45.1** (中文(简体) ).`zellij-x86_64-unknown-linux-musl`体现了2026-09-30日最新发布的GitHub.
- ** 编者0.9.3**(`herdr-linux-x86_64`,最新发布于2026-09-30;资料来源0.9.1改为:
粘贴框架和配置路径。
- 都从`/var/tmp`被丢弃`HOME`,`XDG_CONFIG_HOME`,`XDG_DATA_HOME`,`XDG_CACHE_HOME`,`XDG_RUNTIME_DIR`,+`ZELLIJ_SOCKET_DIR`(泽利)/`HERDR_HOME`(草药). 那个
用户的 tmux 服务器从未被触碰过; 每一个启动的服务器随后都被杀死 。
- 一个画家是一个真正的客户 在真正的pty(一个60行的Python)`pty.fork`绳子写着
脚本输入,调整 真大,送出SIGHUP). Linux, x86 64 (英语) 在我面前,我和他在一起。 ** 在macOS上 真不测。 **

□ Pty包括为管理者需要的,以及每个工具的答案

需要(tmux today) Zellij 04.5.1 草药 0.9.3 |
|,|也.
**的各项活动包括:`new-session -A -s nt-<id>`) (中文(简体) ).`zellij --config <kdl> --layout-string 'layout { pane; }' attach --create --close-on-exit nt-<id> -- <shell> [args]`原子 初始命令在重排时被忽略.`options --default-layout <file>`和 a 类`default_layout`线条仍然产生标签栏和状态栏;`--layout-string`并没有,咕噜声中重新添加了标签。`options --default-shell`在创建的会话中被忽略了,因此是明确的初始命令。 * a*session*是一整台服务器,拥有工作空间/tabs/panes(`herdr --session <name> server`) (中文(简体) ). 一个节点就是用`workspace create --cwd … --env K=V`唯一能给一个窗帘贴上 的办法是`agent attach <pane>`, 已经停止了 。`agent_not_found`为了一个普通的贝壳窗。 满`herdr --session X`附加绘制草药自己的工作空间 UI. QQ
QQ** 脱口秀,离开运行**(客户退出)QQSIGUP给客户:"再见Zellij!",会话停留. QQ 服务器侧; 客户端拆分 。 @ info
* * ** 已存在**(`has-session -t =name`) (中文(简体) ).`list-sessions -n`线条`name [Created …]`页:1`(EXITED - attach to resurrect)`用于序列化的。 无会话 = 退出 **1 ** 加上"未找到活动 zellij 会话"——仅退出状态无法分辨缺席失败. 只有确切的名字。`session list --json`(单位:千美元)`running: true/false`. |.
* ** 壳退出结束会话** * 附有客户端:是(客户端打印"再见",会话结束). ** 无客户端:会话没有终端窗格** (“僵尸”); a`attach --create`连接并立即退出。 创建之后, 会话也没有结束面板 * 暂时 * 。 | 关闭仍在运行的服务器内。
** Capture 屏幕+历史** (中文(简体) ).`capture-pane -p [-e] -S`) (中文(简体) ).`action dump-screen --pane-id <p> --full [--ansi]`(viewport, 哪一个是view可持续发展问题) + 回滚;`--ansi`保持SGR),每拨电话~16ms.`pane read <pane> --source visible\|recent [--ansi] [--lines N]`。 。 。
** 将文本作为 ONE 粘贴以纪念应用程序的粘贴模式,然后输入**(`paste-buffer -p`) (中文(简体) ).`action paste --pane-id <p> <text>`:** 解释** 当应用程序从未要求时,** 框架**`ESC[200~…ESC[201~`之后`printf '\e[?2004h'`(均按`cat -v`(三)`\n`留下来`\n`输入 =`action write --pane-id <p> 13`。文本骑One argv 元素: 131 000字节已交付, 140 000 失败( exit 126, Linux)`MAX_ARG_STRLEN`) (中文(简体) ). 没有标准形式。`pane send-text`** 从未设定** — 测量:文本在`?2004h`。模式感知面条(`paste_payload`输入`src/pane.rs`)仅落后`agent prompt`这需要草药自己的代理检测 |
** 目标没有客户** * * * 没有动作`--pane-id`无声无息的无头(没有客户端就没有焦点的窗帘).`action list-panes --all --json`给以ID;目标为焦活终端面板,否则为最低ID. | 标点符号( N)`w1:p1`从。`pane list`。 。 。 。 。
*** 杀害** (`kill-session -t =name`) (中文(简体) ).`kill-session <name>`,精确匹配(`nt-e`未触动`nt-e1`) (中文(简体) ). 与`session_serialization false`无法恢复。 |`session stop`页:1`pane close`。 。 。 。
** 列表会话 + 附加客户点 ** (重复,会话内存) * * 名称 :`list-sessions -n`客户:`--session <s> action list-clients`(每个客户一行). 在v1中未接线(参见漏洞). |`session list`;客户端数未计量. |
** 创建时的会场环境,没有关于 argv 的秘密** (`-e`+ 键`update-environment`) QQ 每一个会话是它的** own server 进程**,由创建它的客户端预留,所以会话env是创建客户端的env. 测量:一个只导出到创建客户端的变量在窗格中可见;在argv上侥幸无任何.`ZELLIJ_SESSION_NAME`设置在窗帘中。 每页`--env KEY=VALUE`**argv** (可见于`/proc/<pid>/cmdline`CLI运行时). 一个以变量开头的服务器确实传递到它的面板上,但随后每个节点有一个服务器. |
** Pane前景命令** (中文(简体) ).`#{pane_current_command}`,重新启动/生态门) 无无头 CLI :`list-clients`只显示附带客户端的运行中的命令( E)`N/A`罐壳;`list-panes`给出发射命令。 进程表确实:`zellij --server <socketdir>/contract_version_1/<name>`其子贝壳 贝壳`tpgid`——这个过程. 计量`server → bash (tpgid = sleep) → sleep`。 。 。 。`pane process-info --pane <id>`返回时`foreground_processes`与argv和cwd——三人的最好答案。
** 恢复/大小所有权** + Pty 调整大小 → 客户端 SIGWINCH. 两个客户端:会话使用**最小的**(100×30 + 80×20 → 80×20)。
** ** 移动 / 滚动 / 复制 ** 客户端进入替代屏幕 (`?1049h`)并启用`?1000h ?1002h ?1003h ?1006h`; 轮轴滚动 Zellij 自己的滚动回滚; 鼠标拖动已发射 ** OSC 52 ** (`ESC]52;c;<base64>`)到客户端——与节点中的tmux相同. QQ 自有UI; 未计量 。
* ** 关键通过** * * * * 键绑定值是 ** 会话范围** (一个带有已清除的键框创建的会话忽略了第二个客户端自己的配置)支撑. 内`default_mode "locked"`Ctrl-g, Ctrl-p, Ctrl-t, Ctrl-o 全部到达`cat -v`; 随着解锁器移动到 Ctrl-Alt-g, Ctrl-Alt-g 然后脱落 Ctrl-o d. | 未测量。

□决定:v1的Zellij

Zellij在 tmux 合同上绘制了近1比1的地图: 一个原子创建或图案名称,一个真实的
客户端作为画家( 变相屏幕、 鼠标、 OSC 52 —— 渲染器不需要新内容), 粘贴
应用应用程序本身的括号粘贴模式,环境交付则无任何内容
argv.herdr是一个工作空间管理器,它的 呃...
单面板,不能单独附着(`agent attach`拒绝非代理面板,每页
环境为 argv, 其文本发送不符合 paste 模式 。

** herdr 间隙,对于捡到它的人:** 非剂面板的单面板附件; 模式意识面条
国家行动倡议`pane send-text`画像`paste_payload`); 平面环境不是
argv( std只是个文件)。 医生的`pane process-info`比任何Zellij给
未来过程的问题 将成为腿的模型

□ v1 设计( 发运的)

- ** 安排:**`settings.sessionBackend`=`tmux`(默认)                                   `zellij`设置 – 会话
*会议后端*。 通过阅读`normalizeSessionBackend`: 其他东西都是 tmux.
该行仅通过一个核心显示,报告Zelli与各国的发现(POSIX),并说Zellij何时在.
选中但未安装( 新终端随后使用 tmux) 。
- ** 后端沿用现有的会话。 ** 一个温暖的 tmux 会话在 tmux 中重新附加; a
现场Zellij会话在Zellij重新连接,不管现在的设置如何;只有一个节点没有
在选定的后端创建任意的会话。 因此,切换设置永远不会
老天爷, 将一个运行的代理机套在一个多轴器里, 而冷却又在另一轴器中重新启动它。
- **仅本地项目. **SSH项目保留远程 tmux;Windows保留会话主机.
- 我们的配置`<userData>/zellij.kdl`, 更改时重写 艾丽卡 : 锁定模式
切换到 Ctrl- Alt- g 上, 没有窗框,卿级提示,`session_serialization false`鼠标上;
加上赤裸的单板布局. 当节点启动默认 shell时, 它会通过`-l`(单位:千美元)
bash/zsh/fish, 由于 tmux 作为登录贝壳拜托它运行默认贝壳.
- ** Zombies:** 列出的没有终端窗格的会话只有在5个无窗格读完后才被相信
300 mss 相隔( 刚刚创建的会话看起来一瞬间 如果是僵尸被杀死)
在再次创建节点之前。
- 不知是暖和的,不管什么环境 当Zellij无法询问节点时, 创建
永远不会冷——即使选择 tmux —— 因为可能仍在 Zellij 运行的节点不能
重新播放它的快照和它的代理人`--resume`d 在新 tmux 外壳中第二次(发现于
Review:第一个版本只有在Zellij被选中时才会折叠为温暖).`sessionExists`,通过
对比之下,只从一个分析并显示其活性的列表中声称Zellij会话.
- ** 会议名称可包含空格**(计量如下:`my work [Created 0s ago]`); 列表解析器
在上一个之前拿走一切` [Created `。第一个版本拒绝这样一条线,第一个版本拒绝
每个探测器都由个人进行`unknown`。 。 。
- 不可能的,因为...`--`在每个位置文本之前** (中文(简体) ).`paste`, (中文).`write-chars`曰:已测,`- item one`当时是
拒绝作为未知的论据,`-h`输出 0  知道了 。
- 只有在Zellij上场的时候 我们不知道的节点探测器(每个节点)`list-sessions`,每删除`kill-session`,中继列表)只在Zellij是时运行.
已选中或已使用在此机上( our)`zellij.kdl`存在; 仅当
Zelij终端创建). 一个只安装了Zellij的 tmux 用户运行的正是旧的
路径。
- ** Socket路径长度。 ** Zellij 拒绝超过平台限制的套接字路径(“ IPC 套接字路径是 ”
太长(108字节,最大107)),在Linux上的审查中测量;macOS允许103. 装着一个
无法匹配的路径, 新终端会返回 tmux , 设置行会说明原因 。 库存
mac( 无)`XDG_RUNTIME_DIR`, 49 特性`$TMPDIR`),以真实的节点id计算为~104字节——
超过极限,在这样的Mac上,排队会这样说,直到`XDG_RUNTIME_DIR`或`ZELLIJ_SOCKET_DIR`缩写。 计算,不运行。
- ** 删除**杀人`nt-<id>`在Zellij(确切名称)中,只要Zellij在播放,一个节点就会被删除
在重新启动之后,从此以后从未挂载过,不会使其会话运行。
- ** 标签:** 拒绝(未拆分) 超过 120 000 UTF-8 字节。
- **会议记忆:** 扫描读作tmux;小组报告有多少Zellij会议没有
计量而不是“这里没有会话”。

### Zellij 不可用项（与设置行中列出的条目一致）

- Agent 间消息传递以及对 Zellij 会话的触发会被拒绝（无法探测 pane 归属或 bracketed-paste 模式）。
- 模型切换会拒绝：无法停止 Zellij pane 的前台进程。
- 会话内存面板会计数 Zellij 会话但不测量它们；空闲会话回收器看不到它们。
- 粘贴的文本会作为命令行参数传给 Zellij（调用运行期间可被其他本地用户读取）；超过 120 KB 的粘贴会被拒绝。
- 过期文件夹横幅以及文件链接所用的 live pane 文件夹不可用。
- 指向 Zellij 节点的 live link 没有屏幕快照（观看者从实时流开始），且仅在该终端在本应用中 attached 时可观看。
- SSH 项目与 Windows 仍使用 tmux / session host。
- nodeterm 移动端的直接 SSH attach 只能找到 tmux 会话。

同样真实且不在此列表中: 对Zellij( 已发布) 不存在控制模式阴影客户端
Zellij节点被画家重新附着,而不是一个零pty控制客户端; 晚冷启动检查
无论如何,只使用SSH;`paneCursor`不明,所以再生涂料会留下光标

□ 表面

- **Desktop:**仅在Linux上测量在落实测试。 macOS 未测试:见核对表,其中
第一个项目决定了Zellij是否完全可以在没有短插座目录的情况下 That's understanding民族团结委员会。
- **服务版:**同一核心。 服务器主机报告时显示设置行
之间关系发现;会话在服务器主机上创建.
- 移动:**在中继器,电话的`pty.attach`穿过同一个核心,加入
兹利吉会议`listNodetermSessions`包括Zellij会话,并记住它们作为附件)。
电话的**直接SSH**路径运行`tmux`在主机上无法看到 Zellij 会话—— 一个 iOS
后续行动。 对吗?

□设备核对表( 不在此运行)

1. **macOS 套接字路径**:在一个 stock Mac上,设置行是否报告套接字路径太长了
(预期,见上文)`ZELLIJ_SOCKET_DIR`设短,Zellij节点打开吗? 还跑
联合国`*.realzellij.test.ts`在Mac上的套房(他们的沙盒掉回短片)`/tmp`套接字
dir 当沙盒路径不适合时).
2. 马科斯:`ps -A -o pid=,ppid=,tpgid=,comm=,args=`形状和`tpgid`用于窗帘壳
(重新启动代理 / Eco 读取其中的窗我们支持).
3. macOS:来自Homebrew的Zellij是从一个Finder发射的应用程序中找到的(Finder).`/opt/homebrew/bin`) (中文(简体) ).
4. Zellij的帆布节点:打字、调整大小、轮轴卷轴、应给予拖带(OSC 52药片)、Shift+ 输入
一个特工CLI,Ctrl -g到达克劳德代码。
5. 从外部终端接通`zellij attach nt-<id>`;两个客户都看到同一面板;
体积较小的
有关程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序程序、程序、程序、程序、程序、推动了、程序、程序、程序、程序、程序、程序、程序、程序、程序程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序、程序程序程序、程序程序、程序、程序、程序、程序、程序、程序程序、
7. 机器重启:寒冷恢复回放回滚快照,在新的状态中恢复代理
泽利会议。
8. 安装Zellij的Linux主机上的服务器版:创建,从第二个标签中重新添加.
