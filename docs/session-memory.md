> English: [docs/en/session-memory.md](./en/session-memory.md)

# 会话内存:RAM避孕药和每会话面板

左下方的药丸** 与使用药丸相邻的药丸** 并打开会议-记忆面板** :
* 活动项目* 正在运行的机器使用, 以及该机器`nt-*`tmux 会话是
拿着

> 设计规格 :`docs/superpowers/specs/2026-08-10-session-memory-panel-design.md`。 。 。 。
> 凝聚的规则生活在`CLAUDE.md`(“会议记忆”);本文件载有
> 测量,对文件来说太长的推理,和XQ10,设备清单**
> 在无头的 Linux 框参加了无法核实的每件工作。

文件 :

QQ 层文件QQ
|,|也.
本地读 + 纯装配`src/core/session-memory.ts`|
SSH 主机的腿( 生成)`sh`· 国家`src/core/session-memory-remote.ts`|
+ RPC + 路由(由双壳启动) +  `src/core/session-memory-service.ts`|
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *劳工市场* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *`src/renderer/state/sessionMemory.ts`|
~ 标题 / 项目 / 孤儿 ~`src/renderer/lib/sessionMemoryRows.ts`|
死亡必须降落的地方`src/renderer/lib/sessionKill.ts`|
药片+面板`src/renderer/components/SystemResourcePill.tsx`, (中文).`SessionMemoryPanel.tsx`|

- - - 说吧

□1. 测量到什么,意味着什么

这个功能之所以存在,是因为一个用户报告 *“Claude终端正在杀死我的记忆,每个都带走了
2 GB"*. 量产主机(64 GB,95 直播).`claude`进程:

{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}什么衡量 {\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}什么衡量
|,|也.
|`claude`单程 | avg **335 MB**,峰值 **1159 MB** |
| 95`claude`流程 **31.1 GB ** ++
+30–200 MB(玩法-mcp + Chrome → 200 MB 单曲)
[永久失效連結] [永久失效連結] 1"Claude terminal"树 | **440 MB – 1.2 GB ** |
QQ 节点服务器( 每个用户) QQ 49 快去82 MB QQ
QQ tmux 客户端 (每个附加会话) QQ 5.1 MB × 59 = 303 MB →

两个事实解决了归属:

1. ** 决定不分配。 ** 这是CLI的V8重机`RssAnon`本质上是
全部RSS(1165 MB of 1187 MB on the bigest process),而这个Repo设置没有`NODE_OPTIONS`页:1`--max-old-space-size`,所以V8从系统RAM(`heap_size_limit = 4144 MB`打开
说到这里
2. ** 这不是泄漏。 ** RSS是平的,过程年龄为 0–24 havg **340 MB**, 1–7 avg 339 MB,
7即便是7天+avg **326 MB**. 每个过程即便是平坦的基线,也不会返回.

因此用户的*数字*是正确的,他们的*归属*是错误的——但节点不是无辜的.
要么:它使这些进程保持活力(只有`×`杀死会话; 项目关闭和应用程序仅退出
和画布邀请 许多人同时。 一个量度客户端举行了**51次附加会议
17GB** (英语).

** 这一差距的所确认的是盲目,而不是分配。 ** 产品中没有告诉所确认的用户
18场比赛是现场直播,其中一场是1.2GB, 或六场是属于他们的一个项目
三周前关闭了 抓取代理内存( E)`--max-old-space-size`)被审议和拒绝
v1: 低天花板 OOM 杀死长文本会话, 比 2 GB 更糟糕.

** 不要重新确定这些数字。 ** 他们在这里,所以下一个人 不花一个下午`/proc`算术得出同样的结论。

** 电源用户:封顶一个基于节点的代理商的堆积。 ** 节点决定仍然没有封顶,并且不能生长`NODE_OPTIONS`默认。 一个想要的用户可以设置`NODE_OPTIONS=--max-old-space-size=2048`在一个
** 海关代理人的巢穴** (定居) 代理人;项目巢穴不能,因为`NODE_OPTIONS`是一个保留的
产卵密钥(一个代码执行警卫). 3个警告与该建议有关:一个超出范围的会议
盖子是 OOM 杀死的(窗格和`--resume`恢复对话,而不是转弯;它只是
影响 npm- installed **node ** 国家升力(`claude.cmd`——土生土长.`claude.exe`是块
二进制和编码是Rust,所以它什么都不做(`where claude`表示 Windows 用户的哪个
运行);它是一个每台机器的选择,从来不是一个项目。

** 从设计上说,连带的会议从未收获。 ** 摄取者(`session-budget.ts`仅结束
预设会议;帆布上挂载的任何东西都受到监视,无法触碰。
视窗会话主机相同 。 直播会话的杠杆是屏外释放(这可以解除
查看器,所以宽度窗口 / 计数盖可以应用),依循生态,暂停,和面板`×`。      
缩短优雅`NODETERM_SESSION_GRACE_HOURS`(违例价值观得到尊重渊博;见下文)。

** Windows:显示会议主办方自己的费用,而不是隐藏。 ** 在 Windows 上,面板添加一个
非杀人`nodeterm session host (N consoles)`线条——主机进程(无头模拟器,
节点-pty的每场会展工人线条)加上它的宿主/开放孔索尔儿童,没有
会话行可以到达。 它是一套量度工作设备,只有在量度时才加入总量。 见
docs/windows-session-host.md ("可观察性","Pane探测器").

一个分数`NODETERM_SESSION_*`值不能解除守卫

运行现场收割者实验时发现`NODETERM_SESSION_GRACE_HOURS=1`。 。 。

`envInt`使用过的`Math.floor(n)`后面`n > 0`,所以分数设置变为**0**——零
这里不是一个较小的环境,它是一个安全的去除:

QQ 效果前的输入 QQ 效果
|,|在当地.
|`GRACE_HOURS=0.5`0秒,一个会话一旦脱离,就可收获
|`MAX_DETACHED=0.5`QQ 封顶 0 QQ 每一个分离的会话都算为超额: 每一次扫荡,一整批死亡 QQ

误差是:`abc`, (中文).`''`, (中文).`0`(单位:千美元)`-3`都掉下来了
返回安全默认值,同时`0.5`- 操作员会打的PLAUSIBLE 最多的东西,意思是
"半"——默默解除警卫武装. ** 手动编辑值必须降解为安全默认值,
永远不要对比违约更具有破坏性的东西。 **

`envInt`现在需要`>= 1`,而且分时的优待(合法的愿望)由`envHours`,保留分数 :`0.5`是1800秒,而不是零视情况而定。

□2. 死神为何故意不受伤害

`src/core/session-budget.ts`仅可在优雅的窗口上闲暇地收获** 已删除的** 会话。 打开
编制其杀伤性清单的计量主机**空虚** - 60`nt-`参加届会的50人,**0人
31GB坐在那的时候 张开的帆布是无法接触的

重新确定收割者的目标是一个单独的改变,有不同的风险(它会开始杀死会话 a)
用户正在查看). 这个功能增加了**视觉**,而不是政策:它显示31GB,让一个人
决定 它与收割者分享的一件事`readMemInfo`(第3节)


{\fn华文楷体\fs16\1cHE0E0E0}收割者也不会在macOS上的字节水印上出现

修复`readMemInfo`使字节成为HONEST;它并没有使它们成为正确的的乐器. 一样
抓取已校验的公式, 显示机器使用 macOS 自身的内存压力为 ** 82%
图GREEN** (8.38 对全球数字压缩,1.77 GB互换使用). 因此,10%的可用水更积极地燃烧
在状态中,OS本身称为健康——而收割者的压力触发积分会.

展示了`hostMemReader`(达文)`null`)是死神的** 默认** 阅读器,而不是什么贝壳
注射剂 这是有意的:用整个套间绿色——两次测量——可以删除一条线。
这支树枝上,有缺省,不能缺省。`planReap`处理`null`*没有压力信号*,等等
macOS只有脱落的-COUNT盖可以触发凸起,这根本不是基于内存.

收割者在macOS上保持目的: 计数封顶限制积聚,pty-pressure监视器
覆盖实际耗尽的资源,这个面板可以让用户看到 Cull
蓄意的 它失去的就是 隐藏在信号上的能力 信号告诉它错误的东西。

** 在来源方面受到保障,而且诚实地说:**`hostMemReader`与`readMemInfo`只有达文,
CI 运行在 Linux 上, 它们的功能是相同的 —— 因此返回默认值会留下每个
BEAVIOURAL测试绿色(计量).`session-budget.test.ts`因此,在
源文本,旁边写有限制。

□□□□□□□□三.`readMemInfo`只有一个家

它住在这里`session-memory.ts`· ;`session-budget.ts`进口**和再出口**。 现在有两个特色
被拒绝的反对反对的反对和拒绝的反对的反对和反对的反对的反对。 收割者与
药丸绝对不能对免费的RAM有多少有异议.

链接`/proc/meminfo` `MemAvailable`是诚实的,`os.freemem()`是别处的后退
(在后退的Linux上报告)`MemFree`,在温暖的页面缓存下,物质上较小,
因此,阅读文件要先。`null`任何内容都不可读——**绝不是零**。

□□四时.`ok:false`没有`ok:true`无行

这个规则是整个特征存在是为了遵守,每一层都保留着它:

- 怎么样?`collectSessionMemory`返回时`ok:false`当没有 tmux 二进制时, 当进程表是
无法读取,或当 ** 没有套接字回答 ** 。 没有 tmux 服务器的套接字是一个 * 回答 * (即
套接字的正常状态`isNoServerError`- 故意缩小
和** anchored** 到 tmux 自己的连接信息,因为`promisify(execFile)`折叠 stderr 到`err.message`赤裸裸的,`no such file or directory`还匹配缺少共享的 tmux 客户端
库(在 *ever* socket 上退出 127)和一个死Ssh Control Master。 清洗到"不"
这里的会议“ 打印一个超过 20 个活的面板 。
- 说吧`parseRemoteSessionMemory`返回时`ok:false`丢失的**或失序** 路标
空进程表(一个主机总是有进程评判),以及——规则的远程对应程序
上——当**没有套接字回答为一个**。 每个套接字在回执中设置栅为一个栅栏(`##SOCK <name>`.其的一个基本性
tmux 退出状态为`##SOCKRC <n>`)与 tmux 的 stderr 折叠成 (`2>&1`), 以及同样的`isNoServerError`分类它: 退出 0 个答案, 有窗体, “ 不运行服务器 ” / “ 错误 ”
连接到... (没有这样的文件或目录)" 再回答“ 这里什么都没有”, ** 其它东西没有
回答**(溪流也没有被隔开)。 之前的扫荡`{ tmux …; tmux …; } || true`已丢弃 stderr, 因此无法启动 tmux 客户端的主机
- 127号出口,每座插座,现场会话没有变化——产生一个与一个小区相同的小区字节
闲置主持人和小组说"这里没有会话",超过30个.
-店里装着`ok:false`通过未触动, 并视一个* 拒绝* 呼叫作为相同的事实。
- 面板做了四句不同的句子: "可能不测量广泛地在这个机器上的会话。"
"测量...","这里没有开会",还有名单。 总计和
"***会话"计数在a`measured`旗帜( N)`ok && loadedScope === scopeKey`因此,一个
失败永远无法显示旁边的“ 0 B / 0 会话 ” 。

□5. 读这台机器

`/proc/<pid>/status`改为全表,**从未`statm`页:1`status`携带`PPid`和`VmRSS`a. 在一个文件中并已在 kB中;`statm`以**页**表示的RSS报告,这要求页数
假设——硬码为4096的下报**4×**在16 KiB页的arm64内核上,**16×**在
64 KiB页的企业 arm64(将为640 MB会议打印40 MB)。 不要"优化"
这回`statm`。 。 。

非Linux( 以及无法读取)`/proc`跌至一个`ps -eo pid,ppid,rss`呼叫,通过
与 tmux 相同的可注射接合器——无输入`session-memory.ts`到达周围的子进程。

`rollupTree`走路的每个表皮的 蜘蛛的后代有一个`seen`警卫(一张被俘的桌子,而皮条客是
循环利用可以呈现一个环状的斑点链, 和一个吊断的扫描比一个更糟糕
页:1 页:1`childCount`包括:`pane_pid`这是
pane 的 *shell *,所以有两台 MCP 服务器的 Claude 会话报告 **3 **. 因此,小组说:
"孩子的过程",从来不是"MCP"——一个平原`npm run dev`还有孩子

`list-panes -a`每个**平板喷出一行**,所以一个会话的第一个面板在两条腿中获胜(相同)
, ; ; ; ; ; ; ; ; ; ; ; ;

在macOS上,PANEL读 phys 脚印,而不是`ps`rs

描述一台机器的两面面不得使用两种核算. 药片`vm_stat`读取
计算压缩器页面,并将意见交流显示器匹配到0.05%;`ps`因为`rss`不计算在
所有,所以面板是测量 其它的东西。

在真实的Mac上测量(2026-08-12),8`claude`与 Apple 对应的同一勾选中的进程
拥有`footprint`工具——活动监视器"记忆"一栏的来源:

* 进程状态 * * 脚印/ rs * *
|,|也.
                                                                                                                                            欢迎      
* * **1.84 - 2.20x** * * *

, 两条方向都很重要。`rss`共享居民页脚印没有(因此0.73x),
将一个闲置进程的压缩页(因此为2x)放下。 ** 闲置案件决定:** 本小组
解决闲散会议的费用问题,而macOS压缩的正是这些,所以`rss`少报a
六小时半的年龄

`parseTopFootprint`读取`top -l 1 -stats pid,mem`,经核实与`footprint`工具。`ps`仍然被调用父链接(`top`(没有 pid 列), 我给你两个 合并在 pid; a pid`top`没有列表保留其`rss`因为快照是分开的

该分析中的格式事实是经过核对的,而不是由它构成的,包括本可以
打破一个天真的执行: MEM 列以五个字符左对齐,所以值带
飞行空间`12M  `, (中文).`859M `, (中文).`1314M`和 a 数据`/M$/`regex 错过了列的三分之二.`G`(a) 被接受,但从未被遵守(在M保留1314M程序);`B`和任何限制性程序
渲染没有被观察到,并且被刻意不猜测——一个未识别的 我有后缀跳过行.

** Linux 未受影响:**`/proc/<pid>/status`因为`VmRSS`是右边的号码。

{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}========和各科================================================================================`vm_stat`没有`os.freemem()`

利布维的`os.freemem()`而健康的Mac保持了接近零的状态
目的——文件备份和可以清除的页面被保存到有需要的时候. 这么说`total - free`使 她在 ~ 100% 时使用每个 Mac 。 实地观察:24GB Mac报告 **23.9 / 24.0 GB**
讨论小组的会期为2.8GB。

`parseVmStat`计算“活动监视器”所称的内存`anonymous - purgeable + wired + compressor`- 其它的就当有 这是一个
** 活动监测器的近似值,而不是复制**: 苹果文档没有确切的数字, 并运行
苹果硅这些部分已知不会与其总量相加。

** 页面大小读自`vm_stat`自己的信头,从不假设。 ** 苹果硅使用 16 KiB
页面; 硬编码 4096 将报告四分之一的实际使用量—— 同样的错误 此文件
已经固定在 Linux 一侧, 其中`statm`诱惑同样的常数。

** 这也决定了收割者, 这就是为什么变化存在于`readMemInfo`而不是在
避孕药。 **`sessionBudgetConfig`水印默认为RAM的10%(2457 MB在24GB机上),以及`os.freemem()`永远坐在它下面,所以`planReap`看到记忆压力 每一个扫描和一个Mac
每10分钟收获一次闲置的脱机会,不管实际上有多少记忆是免费的. 一个
读者,两个消费者:这就是他们共享定义的原因.

**A 失败`vm_stat`没有信号,不是反弹。`darwinMemInfo`返回时`null`而不是说
转机到`os.freemem()`——这个值正是引起虫子的原因,所以倒回它.
在任何麦克恢复它`vm_stat`缺少、缓慢或无法解析。 两个消费者都退化了
正确打开`null`编号 :`planReap`将它视为没有压力(缺乏证据永远不会引发杀戮)
和药促进对症的治疗,

** 在外地得到确认。 ** 死神的症状是独立报告的,因为"我的疗程保持
消失"在macOS上, 在原因已知之前。 直到这艘飞船, 工作围绕一个受影响的
机器是死神的开关:`NODETERM_SESSION_REAP_DISABLED=1`。 。 。

7)\fs90\bord1\shad1\1cHF0F0F0}但...
活动监视器报告 App 7.67 GB + Wired 2.95 GB + 压缩 8.38 GB = **19.00 GB **;丸
读作**19.1 GB**. AM自己的标题"Memory Used"说 19.73 GB——它超过了自己的总和.
部分在 Apple Silicon 上,一个有文件记载的差异而不是错误。 在修旧之前
机器改为**23.9 / 24.0 GB**.

测试固定仍由 Apple 的文档格式组成; 经验证为 FORMULA
而不是ù的号码

避孕药中的交换和内核压力(仅播放)

增加2026-10-19,从Ma 你是谁? 药片上说86%"警告" 你是谁?
内核被换掉 内核压在2级 屏幕上也没说

- 哪里? 你说什么?`MemInfo.display`-- -- 说`swapUsedMb`, (中文).`swapTotalMb`, (中文).`pressureLevel`. Darwin 读`sysctl vm.swapusage`(单位:千美元)`total = 9216.00M  used = 7853.62M  free = 1362.38M  (encrypted)`,以`parseSwapUsage`;只有K/M/G)和`kern.memorystatus_vm_pressure_level`(单位:千美元)`parsePressureLevel`编号 :
1个正常,2个警告,4个关键,其他任何省略). 都来自一个`/usr/sbin/sysctl`运行
输入`darwinMemInfo`(每30个药丸再加一个同步过程)`vm_stat`); 每个字段
仍然可以自行选择 —— 我们得用没有线程的 Oid 省略该字段,`vm_stat`读取未触及。 链接
复制其交换`/proc/meminfo`文本已解析。 Linux 没有内核级别; PSI 是
未映射到一个,因为没有测量阈 可是没有测量。
- **为什么是子对象。 **`hostUnderMemoryPressure`读取`swapTotalMb`页:1`swapFreeMb`。填充这些倡仪
Darwin会把一个保持大部分互换使用的Mac(在测量的1上为16%自由)变成永久的"压力".
摄受者. 药丸只读`display`;没有别的了。
- 罐头。`max(used-% threshold, kernel level)`:关卡可以提高颜色,永远不要降低.
-**没有假零。** 没有`display`没有互换文本。 标题中仅说明使用的测量值为0。
- ** 已执行。 ** 药丸对`sysctl vm.swapusage`和活动监视器的 压力颜色超过一天。

在面板中“节点本身”

从同一度量. GPU帮助器的真正足迹是1557-1845 MB(窗口互换链,
光栅砖、终端W的投诉`ps`rs说96-153 MB;药丸数
它在主机总数, 但面板从来没有 归属它。

- 数据。 ** 桌面外壳注入`appProcesses`(单位:千美元)`app.getAppMetrics()`→,类型,`cumulativeCPUUsage`) (中文(简体) ). 内存在扫描器自己的流程表里 被逐个查找,所以组
在无秒的情况下使用行的会计`top`:  我还要在Darwin上留下足迹(只给皮条客)`top`覆盖,`ProcEntry.footprint`),在Linux上的VmRSS,在Windows上工作设定.`getAppMetrics().memory`没有
使用: 在macOS上`workingSetSize`居民人数和`privateBytes`仅使用 W 咱们的窗口。
- ** 团体。 ** 浏览器 → 主, Tab → 渲染器(HUD是第二个),GPU → gpu, 其他所有
- 帮手。 未测量的 pid 组没有 MB; 组总数只存在于每个组时
有个
- ** 国家。 ** 缺席 = 此表面无法列举其进程( Server Edition, SSH, 中继) :
没什么`ok:false`=它尝试并且不能:"Could not measure nodeterm's own progress." ="Could not measure the nodeterm's own process." ="Could not measure the nodeterm's own process." =它尝试了,并且不能:"Could not measure own process." ="Could not subsession of nodeterm's own process." ="可以不测量节点的节点的自身过程。
从不在总标题中,从不一行,仅局部范围.
- **CPU**是每个组的周期性CPU时间,而不是一个百分比(`percentCPUUsage`返回 0
先打个电话,然后打一个样本
- ** 已执行。 ** 在5%范围内的小组GPU数字`footprint <gpu pid>`且不等于`ps rss`,在一个
真正的建筑。 Linux (VmRSS) 和 Windows (工作套件) 的腿只经过单位测试; 也没有
在真正的机器上检查过

□ 6. SSH腿

一个 SSH 项目的会话在主机上直播, 所以扫描会运行在那里: 核心生成 One POSIX`sh`脚本,贝壳在工程的"控制大师"上运行,只有印刷部分回来
- 分工与`remote-claude-usage.ts`(核心拥有 我发誓)
贝壳拥有主人。 一次往返都包含三个事实 因为每个额外`ssh`执行是
登录别人的机器

生成的 shell 没有编译器检查, 所以`session-memory-remote.test.ts`运行它 ** 真实
下级`/bin/sh`** 与假主树对战——与`remote-claude-usage.test.ts`和`canvas-control-shim.test.ts`保持这样。 这不是仪式:计划自己的剧本说`echo ##MEM`,在 POSIX sh 下打印一条**空行**(未引用)`#`开始单词初始
并且本可以写出所有健康的东道主报告`ok:false`**. 引用标记为:
那个原因。

该脚本的另外三个属性带有负载: 每个区头都打印
* 无条件**(缺一条意味着溪流被缩短,而不是东道主一无所有);
套接字名称+`-F`格式来自共享常数,所以远程扫描永远无法
查看一个不同的套接字或请求一个与本地不同字段不同的字段;**每个套接字是
以自己的 tmux 退出状态及其 stderr** (§4) —— 单凭退出状态不能告诉一个
损坏 tmux 未使用的套接字, 丢下两套是让失败的扫描变成空的
主持人。 非Linux 主机以最佳方式`/proc/meminfo`,所以,这是`mem`是正当的`null`药片必须在那里脉搏,永远不要显示0。

□ 7. 哪个机器回答

`session-memory-service.ts`作出准确的决定:局部扫荡或偏僻。 2个独立
来源说“远”和** 都足够**(或,从来没有和)—— 渲染器自己的`remote`旗帜
(它已经知道`usageScope`和贝壳的`isRemoteProject`。一个回答“否”的来源
因为它是瞬间不知情的(一个没有加载的索引,一个刚刚掉落的主人),
否则将远程查询转换为本地扫描, 并发布 ** this** 机器的会话
宿主名号.

`sshScopePredicate`从**身份,而不是活性** 来构建贝壳边的答案:`workspaceStore.sshProjectIds()`(一个断开的SSH项目仍然是别人的机器),
与现场主机一起运行,用于索引尚未列出的项目。

该`remote`选项对是故意不对称的 :`run`是可选的( shell 可能无法
读另一个主机,`isRemoteProject`- 阅读-不知情是不一致的;
保留编译错误。

每个项目有一个在飞行中远程读取器是连在一起的(面板需要RAM号码和
行; 两行相同`ps`在别人的机器上执行 否则。 关键是`projectId`没有别的了,因为只有这样 才能决定哪一个是司令部所在地
继续 它在结算时被清除——一个货币守卫,从不缓存。

□ 8. 渲染器:范围、粗略、所有权

** 范围** 借以`usageScopeKey(activeProject)`——用量指标使用的同一种帮助,所以两者
药丸不能不同意它们描述的机器 店里每个要求都印有
范围本身(不是计数器:`refreshFull`财务报告和已 就这样`startHostPoll`可以调用不同的范围
在没有间歇性凸起的情况下,丢弃了用它留下的瞄准镜盖上的反应,并清除了
前机器的事实 真正的变化。

** 开销按成本划分:**

- **地方范围**——避孕药民意测验`HOST_POLL_MS`(30 s) (英语). 一个文件,免费。
- **SSH范围**——从未接受过调查。 ** 一个在范围条目上读,一个当项目的控制主
上来(一个SSH项目在主机准备好前打开,没有计时器后方)
将药丸留空,每块一块打开。`⟳`。这是
规则`CLAUDE.md`已设定远程使用, 原因相同 。

完全扫荡从不在计时器上运行 从不从药丸。 面板已卸载* 而
关上它,它就会引发扫荡。 另有一名消费者遵循同样的规则:
欢迎屏幕运行 难道每次显示一次 ** ** 本地** 扫描(仅在“最近关闭”列表时)
将每个已关闭的项目作为项目直播的标志`nt-*`会话次数(问题442),`renderer/lib/projectCloseSessions.ts` `closedSessionCounts`) (中文(简体) ). 它呼唤`window.nodeTerminal.sessionMemory.read({ remote: false })`直接——不通过`state/sessionMemory.ts`,其模块级瞄准镜盖章属于避孕药/小板配对——和
失败的扫描( E)`ok:false`/ 拒绝) 使** 没有徽章**,从不"0".

** 药片仅限图标休息。 ** 它坐在每张帆布上,总是,所以的各项活动`RAM 15.6 GB / 62.5 GB`药丸的工作是可以找到的,而不是
继续报告。 Hover( 或键盘焦点, 或打开面板) 显示已使用/ 总计; 图标
压力读数通过相同的阈值 旧的迷你巴, 锡
记忆是凝固的。 披露内容是**CSS,而不是一个有条件的挂载**:数字留在DOM中。
休息后,它们仍为按钮的可访问名称。
任何读取控制器而不指向它。 药片坐到用药的LEFT
——这台机器的资源在本账户定额之前.

** Ownership 合同:**商店的民意测验计时器及其活动镜章为**module singletons**,
和**pill是他们的单一所有人**。 小组绝对不能打电话`startHostPoll`页:1`stopHostPoll`. . . . . .
(单位:千美元)`stopHostPoll`在卸载时,可以清除药丸的间隔 不再有任何东西可以重启,
数字会默默冻结,直到下一个范围改变。

店铺解决它的Api通过`sessionForProject(projectId).api`没有`window.nodeTerminal`页:1
中继标签的渲染器运行在宾客上,而宾客的会话则在主机上直播,它的亚庇是
树枝...`ok:false`, 面板表面显示为 * 不在此提供 *, 而不是无法重试 。

□ 9. 排队,孤儿,以及杀戮之地

`resolveSessionRows`分别决定.`nt-<nodeId>`店里的所有项目:

- ** 关闭的项目不是孤儿。 **`closeProject`只设定`closed = true`并保留
工程及其磁盘上的节点,所以其会话会决定一个真正的标题,并用它们的标签标注
项目。 称他们为孤儿会邀请用户杀害他们故意停放的会话. 这个
因此,面板通过全部`projects`数组——过滤打开标签会击败此规则
沉默地,从文件外 说它。
- ****`orphan`是区别领域,而不是`state === null`.** 平原终点站从未进入过
代理状态图,所以从缺少代理状态中衍生出孤儿,将标注每个代理状态.
孤儿的状态被放弃vocat 而不是传承(面板无法解释一个“工作”点)
它无法行走的一行),它的圆点变得空洞。
- 孤儿才是重点:他们正是收割者所看不见的,没有帆布能够显示的。

** 死亡由SCOPE处理,而不是排队**(`planSessionKill`一、导 言`transport.destroy(nodeId)`仅通过携带 LIVE 本地客户端到达 *remote * tmux 会话`sshRemote`- 哪一个
孤儿没有,也没有一个非活动项目拥有的节点。 在这之前 每个孤儿
专栏`×`在SH项目上,他承诺要杀死他。
主办单位`nt-<id>`继续运行, 排回来 在下一个刷新,没有解释。 就这样
力争实现目标`sshProject.killSessions(activeProjectId, [nodeId])`结束
该工程的"控制大师"(Control Master),不需要现场直播,而且具有独家能力(挂载的病例,
地点`destroy`已经结束了, 是一个无害的 最好的失败。

这是安全的,因为它是一个** 圆形旅行,而不是一个检查**:`nodeId`从字面上`session.slice('nt-')`从扫荡,`killSessions`通过同一个同位素将其映射回来`sessionName()`,所以远程腿杀死** 准确的会话名称 所观察到的扫荡,在主机上
在**上观察到了这一点。 它并不依赖于全球独一无二的节点标识(它们只是每次发射)
页:1

** 名称和东道主从来都不是最难的部分——SOCKET是。 ** 有两个节点 tmux 套接字
在一个机器上同时:`node-terminal`用于运行在其上的节点(桌面或服务器)
(编辑)和`nodeterm-rmt`为了一个SSH -ing进入它。 清查清单 ** 两者 **
(单位:千美元)`session-memory.ts`, (中文).`session-memory-remote.ts`),而杀戮的目标是**1,所以每行
从另一个套接字上传过来的确认语是"停止它的tmux会话"和圆满完成的命案
没有 这不是一个异国情调的东道主, 一个运行自己的`nodeterm-server`. . . .
并且本地镜像的形状是相同的(这台机器的面板列出`nodeterm-rmt`另一机器的节点产于这里的病症 ——他们都是当地的孤儿,因为他们
节点在机器的帆所体现的。 所以一个知道现在只有名字的杀手 就会امين الك الك الك الك الك الك الك الك , الك الك
姓名可以写上**:`KILL_TMUX_SOCKETS`,通过`remoteTmuxKillEverySocketArgs`(远)和`localKillSockets`(当地). 有三件事是安全的,而不是鲁莽的:

- 这是** 通过合同取得的最佳成绩**: tmux 退出非零 与"找不到会话"在任何
套接字不能按住,这是两条腿都写着的 已经擦过的箱子。
- 目标是**准确**-`-t =nt-<id>`没有`=`,tmux 返回到 fmmatch ,然后返回到
当找不到名称时, PRIFIX 匹配, 而“ 未找到” 是 a 的正常结果
投机杀人 节点ID在柜台上结束,所以`nt-…-1`是一个前缀`nt-…-12`: 错失可能
杀死了一个“不同”会议。 因为这个原因 死神已经这样杀了人
- ** 粉丝退出是选入的,只有面板选择加入。 ** 有两个条件:
插座,* 和* 呼叫者要求它(`localKillSockets(liveSocket, everySocket)`, , (中文(简体) ).`sshProject.killSessions(…, { everySocket: true })`, , (中文(简体) ).`transport.destroy(id, { everySocket: true })`) (中文(简体) ).
我们所举行的会议的破坏 仅仅针对那次会议的插座 不论呼叫者荚里有什么
普通节点 -`×`{\fn华文楷体\fs16\1cHE0E0E0}在固定的节点上 {\fn华文楷体\fs16\1cHE0E0E0}还是只开了一枪 但是,**无控**分支是
非罕见——普通节点-`×`在这个过程中从未挂起的节点上,它需要每一个
时间, 这是应用程序重新启动后常见的情况, 对于每个非活动项目节点来说
——和项目删除是相同的形状ĩ远. 那些打电话的人知道自己的节点 所以ĩ
保持窄处: 假设`nodeterm-rmt`目标为 Another 机器节点 SSH 的会话
在这里产卵, 在宿主的推测`node-terminal`目标为: 工作室 工作室
拥有。 默认和选择进入均被固定(`pty-single-user.test.ts`, (中文).`control-master.test.ts`, (中文).`ssh-project.killSessions.test.ts`),包括电线旗必须
成为文字`true`。 。 。

注意故意的重复:扫荡和收割者保持自己的`[TMUX SOCKET,
转弯曲` arrays. For them the ORDER is load-bearing — the sweep's `以会议先胜者发誓,
所以它决定了哪个套接字 重复的名字归结于—— 对于杀它来说,它毫无意义。
分享一个常数会减少重复 而不是杀人名单

所有权在点击时重解, 而不是从行中取出`orphan`旗帜——行是
上次扫荡的一幕 以及从此建立的一个节点 否则会被当孤儿杀死 与
一个主人,杀人经过`closeSession`,与会话侧边栏和节点的路径相同
拥有`×`应用。

### 表面

- ** Desktop**——包括SSH腿在内。
- **服务版**——服务运行并报告服务机。 SSH 范围
回复`ok:false`(没有输入控制 Master)——它说**通过身份**,通过`sshScopePredicate`结束`workspaceStore.sshProjectIds()`,而不是信任 渲染器的
旗帜。 见`docs/SERVER.md`。 。讲授。
- ** 中继制表** — Ws-bridge stub 答案`ok:false`; 面板表示会话内存不是
可在中继标签上使用,而不是报告失败。
- 坎班板**-坎瓦斯通行证`overBoard={kanbanOpen}`将药丸提升到26号
棋盘的不透明 25( 同一道具)`UsageIndicator`一个开放的面板上升至60,结束
显示板和横幅,但低于 VirtualDialog 原来/调色板。
- **会场旁栏** - 当会场旁栏(z 12)是时 Forum bar(z 12)也必须清除会场旁栏(z 12)
* 非公开*,这是一项单独的规则:`.sysres-indicator:has(.sessmem-panel) { z-index: 13 }`, (中文).
镜像`.usage-indicator:has(.usage-popover)`两者`:has()`规则只起作用 因为药丸
集群挂载在外部`<ReactFlow>`- 图书馆的包装带内线`z-index: 0`它会将任何价值 困在其中,无论大小。 倒塌的药片故意保持低迷
层(5)和通过 * 下 * 侧边栏。
- ** 移动伴奏** - ** v1. ** * 节点移动* 附加在 tmux 会话中
运输协议,没有每会场主机内存的概念;添加一个意味着扩展
协议。 后续行动`~/projects/nodeterm-ios`这里不是建造的

* 已知差距(v1,故意)

- 会议清单**未封装**。 由数百届主持人组成的长列表; 切换
默默地隐藏着那些很重要的行 如果它成为一个问题 固定是一个明显的
"炫耀顶尖N"一行,从来不是无声盖.
- 一个在 tmux 呼叫和进程扫描之间退出的窗格 显示一个合法的外观
**管教所的“测量失败”与“零”形状相同。
§4,在行颗粒度.
- 将两个SSH项目与**相同`user@host`** (范围键没有端口)
将上行保留在屏幕上,直到重新刷新,因为`enterScope`只有当
范围 *字符串 * 变化。
- ** 关闭(是:会话侧边栏有这个在面板中固定的bug)** 修补过了
而不是降落在侧柱上,它落下一层, 每一个表面都同时受益。`PtyManager.runEndSession`经常在座的座椅上`Session`单独对象
(单位:千美元)`dying?.sshRemote`),所以一个没有挂载客户端的删除——侧边栏的跨项目关闭,
节点`×`在应用程序重新启动或屏幕外发布后,删除已停放的节点——跳过
远程分支默默地将其一个杀入LOCAL套接字,其中a`requireRemote`节点有
没什么 由持续指数组成的解析器(`setRemoteNodeOwner`→`workspaceStore.sshProjectIdForNode`加上那个项目的"控制大师" 看`core/remote-end.ts`页:1
现在没有活的客户的回答, 和未交付的杀人记录
(单位:千美元)`core/pending-remote-kills.ts`并安顿在宿主的下一个连接 而不是是
吞了下来`planSessionKill`留作小组的ORPHAN行,没有项目索赔。

□ 10. 设备核对表

以下所有内容都是根据代码、CSS或Linux的测量法进行论证的,可以****不使用
这个没有头的 Linux 框是建立在上面的。 格式遵循`docs/grok-agent.md`第9条/`docs/gemini-agent.md`§9. 第一高值:项目1-5。

```
The kill actually reaching the host (the bug most recently fixed, and the one no test can prove)
 1. SSH project, a row with "no node": press ×, confirm, then on the HOST run BOTH
    `tmux -L nodeterm-rmt ls` and `tmux -L node-terminal ls` — the nt-<id> session must be GONE from
    wherever it was, not merely absent from the panel.
 2. Same, for a row owned by a CLOSED ssh project (it resolves to a title, so it takes the
    closeSession path plus the remote kill — both legs must land).
 2b. THE CROSS-SOCKET CASE, and the reason both sockets are now killed. On a host that also runs its
    own `nodeterm-server`, open an SSH project pointed at it: the panel lists that server's own
    sessions (they live on `node-terminal`, not `nodeterm-rmt`). Kill one and confirm with
    `tmux -L node-terminal ls` on the host. Before the fix this row's confirm was a no-op.
 2c. The LOCAL mirror of 2b: from another machine, SSH into this one with nodeterm and open a
    terminal (it lands on this machine's `nodeterm-rmt`). On THIS machine the panel shows it as an
    orphan; kill it and confirm with `tmux -L nodeterm-rmt ls` locally.
 3. Kill a node created less than a sweep ago (<1 s): the confirm wording may say "no node" from the
    stale snapshot, and the CANVAS node is currently left behind (§4's known hole) — confirm which
    of the two actually happens on a real machine.
 4. Local project, ordinary node ×: confirm `tmux -L node-terminal ls` loses it, that the node's own
    kill still fires exactly ONE kill-session (no fan-out on the path we hold a session for), and
    that no remote kill is attempted — a local nt-<id> whose node belongs to an SSH project must NOT
    be killed on the host.
 4b. tmux target exactness: create nodes until two session names share a prefix (`nt-…-1` and
    `nt-…-12` — same millisecond, counters 1 and 12), delete the SHORTER one, and confirm the longer
    one survives. This is what `-t =<name>` buys and it has only been reasoned about.

macOS (the ps path never runs on Linux)
 5. **DONE 2026-08-12** — measured, and it changed the code. `ps rss` is NOT the right number on
    macOS. Against Apple's own `footprint` tool, 8 `claude` processes in one tick: footprint/rss is
    ~1 for ACTIVE processes (one read 0.73x — rss counts shared resident pages footprint does not)
    but **1.84-2.20x for IDLE** ones, because macOS moves an idle process's pages into the
    compressor, which drops out of rss. That is the population this panel describes, so rss
    understated a six-hour-idle session by about half. The panel now reads phys_footprint via
    `top -l 1 -stats pid,mem`. (WindowServer's 8x gap was real but atypical — graphics allocations.)
    Residual: confirm the panel's per-row totals against AM's Memory column for the same pids, on a
    build containing that change.
 6. ~~macOS: check `parseVmStat` against Activity Monitor.~~ **DONE 2026-08-12** — 19.1 GB vs
    AM's 19.00 GB of parts on a 24 GB machine (was 23.9/24.0 before the fix). Still open on
    macOS: give the memory-PRESSURE monitor a real signal (`kern.memorystatus_vm_pressure_level`)
    rather than a byte watermark — the same capture showed 82% used with AM's pressure graph GREEN.
    **Code DONE 2026-10-19** — a separate darwin kernel-level leg in `core/memory-pressure.ts`
    (`onKernelPressure`): renderer levers on escalations into warn/critical only, never on a held
    level, at most once per `KERNEL_LEVER_GAP_MS` (10 min) at the same or a lower severity so a
    flapping level does not re-run them, never through `hostMemReader`, no reaper sweep on kernel
    CRITICAL yet (#211). Owed: a
    firing log under induced pressure on a dev build (`memory_pressure -S -l warn`), plus the GPU
    process `footprint` / IOSurface count before and 60 s after the lever run.
    RE-VERIFIED independently 2026-08-12 (second session, shipping function imported via esbuild
    bundle, vm_stat captured on the same tick as an AM screenshot): ours 18.87 GB used vs AM's
    parts 7.23 + 2.99 + 8.66 = 18.88 GB — 0.05% off; AM's HEADLINE "Memory Used" was 19.70 GB,
    0.83 GB (4.2%) above its own parts, confirming the header comment that the parts do not sum to
    the headline on Apple Silicon. Same capture: `os.freemem()` said 0.10 GB. Page-size trap
    mutation-verified: hard-coding 4096 against the machine's 16,384-byte pages under-reported used
    memory exactly 4.00× (18.87 → 4.72 GB). The darwin reaper default is now also guarded by a
    BEHAVIOURAL test (darwin-gated, mutation-verified on this machine: reverting the default to
    `readMemInfo` reaps 8) — see session-budget.test.ts, which CI's source-text check stands in for.
 7. Open an SSH project: the panel must list THAT host's sessions and no local ones, and its header
    scope + the pill's title must read `user@host`.
 8. Open an SSH project BEFORE its ControlMaster is up. The pill must end on a NUMBER, not a
    permanent pulse — this is the only place the connection-up re-read can be observed.
 9. A non-Linux SSH host (no /proc/meminfo): the pill must PULSE, never show "0 GB".
10. Kill the master mid-sweep (`ssh -O exit`) and press ⟳: "Could not measure", never an empty list.
10b. BREAK TMUX ON THE HOST while sessions are running (rename the binary, or `chmod 000` the socket
    dir) and press ⟳: the panel must say "Could not measure", NOT "No sessions are running here.".
    This is what the per-socket `##SOCKRC` fence buys, and the only place it can be seen for real.
11. Watch ⟳ during a slow remote sweep: the button must be disabled and spinning (loading is
    asserted nowhere).

Layout and theming (argued from CSS only)
12. Default window and ~900 px wide: the cluster at left:60px clears the React Flow controls and the
    canvas-lock button.
13. A machine with NO agent usage — UsageIndicator renders null, so the RAM pill must sit alone at
    left:60px, un-clipped.
14. Kanban board open: the pill is visible AND clickable over the board.
15. Sessions sidebar open: the collapsed pill passes UNDER the sidebar exactly as the usage pill
    does.
16. Usage popover open beside the RAM pill: no overlap, pill still clickable.
17. Both themes: hover (light is why the ink overlay exists) and the icon's colour steps at ~75% and
    ~90% used.
18. fitView / goToNode must no longer tuck nodes under the pill.

Rows, travel and the panel itself
19. A `claude` node with 2 MCP servers must read `+3 child processes`, not +2: `pane_pid` is the
    pane's SHELL, so the count includes the agent CLI itself. This is the ONLY item that can
    falsify the "reports 3" claim made twice above; everything else about the sub-line is arithmetic.
20. Travel to a row whose node lives in a CLOSED project: the tab must REOPEN and the camera land on
    the node. This is the likeliest thing on the list to be wrong — the load and the focus happen in
    the same tick, and `travelToNode` (not `focusNodeById`) is what handles it.
21. A LOCAL orphan row (`tmux -L node-terminal new-session -d -s nt-fake-1`) renders with a hollow
    dot and a "no node" chip, and its title is inert — clicking it must do nothing at all.
22. The panel STAYS OPEN through a kill: the ConfirmDialog is a portal outside the pill's container,
    and answering it must not dismiss the list the user is working through. Clicking anywhere else
    on the canvas must still close the panel.
23. The confirm on a row that HAS a node must say the node is removed too, and it must actually be
    gone from the canvas afterwards — the panel's purpose invites a user who only wanted the RAM.

Cadence and the other surfaces
24. Local project, panel closed: the pill's number moves after 30 s.
25. Local project: opening the panel triggers a sweep; closing and reopening triggers another; the
    pill alone never does (watch for `ps`/`/proc` activity, or an ssh exec on an SSH scope).
26. Server Edition in a browser: a local project's panel is full; an SSH project's panel says
    "Could not measure", with no local rows attributed to the host.
27. Relay tab: the panel says session memory is not available there, and offers no ⟳.
```
