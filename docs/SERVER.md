> English: [docs/en/SERVER.md](./en/SERVER.md)

# 节点服务器版(第二阶段)

在浏览器中运行节点表, 支持您自己的无头节点服务器
机器或者盒子 机器或者盒子 服务器服务于桌面应用程序使用的 ** same ** 已建的渲染器
, 并用 WebSocket- RPC 协议表达它; 浏览器侧面`window.nodeTerminal`嘘`src/renderer/bridge/`电动预装,所以反应UI是
不变. 其所属的同级电动无核核心服务机构(无核电).`src/core/`------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------所提--------------------------------------------------------------------------------------------------------------------------------------------------------------------`ServerPlatform`,因此终端获得与桌面应用程序相同的 tmux 会话连续性.

> ** 第2阶段范围:仅限终端。 ** 这是一个真实的,可用的终端帆布 上,
> 网络,但故意缩小——见[限制](#阶段-2-限制).

□ 快速启动

```bash
npm run server:dev
```

`server:dev`运行`npm run build`(投降+核心)然后`npm run server:build`(捆绑)`src/server/main.ts`→`out/server/main.cjs`最终,`node out/server/main.cjs`重复运行中, 渲染器已经建起你
可以直接跳转到`npm run server:start`。 。 。 。

第一次运行( 设置符牌)

在尚未配置密码的情况下, 服务器会打印一个 ** 一次性设置 URL ** 以显示 :

```
Setup: http://127.0.0.1:8443/setup?token=<32-hex>
nodeterm-server listening on http 127.0.0.1:8443
```

打开该 URL,选择密码( min 8 字符) , 并签名 。 设置
符号是单用的,只生活在内存中(从未写入磁盘),所以是
如果进程在设置完成前重新启动,则重新生成。

QQ 无头设置( 无交互设置 URL)

以嵌入式 Var 为带宽的密码种子——适用于容器/CI
没有人在看 Stdout:

```bash
NODETERM_SERVER_PASSWORD='choose-a-strong-one' npm run server:start
```

何时`NODETERM_SERVER_PASSWORD`设置 ** ** 尚未配置密码,
服务器将srypt散列写在靴子上并全部跳过设置的 URL —— 直行
改为:`/login`。一旦密码已经存在,它就会被忽略(它永远不会覆盖)。
使用至少8个字符,设置格式执行的规则相同. 一个较短的值是
仍在使用(现有部署必须持续启动),但靴子印得响亮`✖ NODETERM_SERVER_PASSWORD is shorter than 8 characters`线条。

++ 手动构建 + 运行

```bash
npm run build         # electron-vite build → out/renderer, out/core
npm run server:build  # esbuild → out/server/main.cjs
npm run server:start  # node out/server/main.cjs
```

□ 配置

优先级:**CLI旗 > 环境变量 > 默认值。 **

|  Flag  Flag  Flag  Flag |  Flag
| -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
|`--port <n>`|`NODETERM_PORT`|`8443`TCP端口可听.
|`--host <h>`|`NODETERM_HOST`|`127.0.0.1`QQ 接口要绑定 。 @ info
|`--data-dir <path>`|`NODETERM_DATA_DIR`|`~/.nodeterm-server`=============================合作伙伴================================================----================================================================================================================================================================================
|`--renderer-dir <path>`|`NODETERM_RENDERER_DIR`|`out/renderer`(从 cwd 解析) | 已建成的渲染器目录 (`index.html`+ 散列资产)。
|`--insecure-http`QQ — 关闭 QQ Access 直接在非浏览界面上服务 plain HTTP (见下文). |
| | |`NODETERM_SERVER_PASSWORD`| | | | | | | | | | | | | | | | | | | 各种不同 boot | | | | | | | | | | | | | | | | | | | | | | Museveni | | | | | | | | | | | | | | | | | | | 的国家数目 | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
|`--trust-proxy-header <name>`|`NODETERM_TRUST_PROXY_HEADER`—(off) — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 由您的代理代理代理所主张的、 — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 如果他们信任: — — — — — — — — — — — — — — — — — — — — — — — — — — — — |
|`--trust-proxy-nets <list>`|`NODETERM_TRUST_PROXY_NETS`|`127.0.0.0/8, ::1/128`QQ 逗号分离的IP/CIDRs(IPv4+IPv6),其请求可能使用信任头. 仅对标题集有意义 。 @ @ info: whatsthis
| | |`NODETERM_TRUST_PROXY_SECRET`- 分享您的代理发送的秘密`X-Nodeterm-Proxy-Secret`(至少32个可打印字符). ** 当信任的网包括回转时需要**。 只有环境:拒绝使用命令行旗,因为每个本地用户都可以读取argv. QQ
|`--public-origin <url>`|`NODETERM_PUBLIC_ORIGIN`QQ — https 来源于您在浏览器中打开的, 例如 。`https://term.example.com`强制`Secure`饼干旗,发送HSTS,并让`Origin`代理重写时通过同一来源的检查`Host`。参见 [TLS] (#tls-逆向-代用). QQ

约束一个“不落空”主机(除`127.0.0.1`页:1`localhost`页:1`::1`** 没有**`--insecure-http`启动时被拒绝 – 普通 HTTP 对公众
界面会泄露会话 cookie。 预定的部署有回转限制
在 TLS 终止反向代理后面(参见 [TLS] (#tls 你要我反向代理) ).

□ 无头通知主机

服务器版作为 ** 无标题通知主机**: 任意一个背景进程
Linux 框, 提供手机 SSH 进入其全推/ Live- activity 覆盖—— ** 无
为浏览器 UI 服务,而不打开单一端口**.

### 单行安装

```bash
curl -fsSL https://raw.githubusercontent.com/eneskirca/nodeterm/main/scripts/install-server.sh | bash
```

安装器( E)`scripts/install-server.sh`——随时更新. 它会:

- 仅需要`git`, (中文).`curl`和`tar`** 节点js不再是一个先决条件**:如果
系统节点 {} 20( 与 npm) 存在, 它作为- 即使用, 否则安装器下载 a
从 nodejs.org 被钉入节点LTS`~/.nodeterm-server-app/runtime/node`并把它用于
构建和系统化服务(没有安装全系统;Alpine/musl主机仍然需要一个)
双层`nodejs`) (中文(简体) ). 它还警告(使用 apt/dnf 单线条) 如果 C 工具链
(单位:千美元)`make`页:1`gcc`页:1`python3`节点-pty的本土建设需求缺失;
- 克隆人(或`git pull`(s) 重新输入`~/.nodeterm-server-app`· ;
- 安装道具(`npm ci --ignore-scripts`,则`npm rebuild node-pty`反对Node的ABI——
用于构建文档并构建渲染器 +
服务器捆绑;
- 安装**系统**服务(`NODETERM_HEADLESS=1`, (中文(简体) ).`Restart=on-failure`,日记日志 :
一个系统单位,位于`/etc/systemd/system/nodeterm-server.service`当运行为 root,或 a
单位+`loginctl enable-linger`否则——然后促成并(重新)启动;
- 写**`<data-dir>/install-meta.json`页:1`{version, commit, installedAt}`时,`<data-dir>`默认为`~/.nodeterm-server`) (中文(简体) ). 服务器读在靴子上,表面显示在一对手机上
通过代理状态镜像的顶层`server`块,所以连接可以显示哪个版本
此安装已启动 —— “ 安装的服务器版如何了解更新? ”
- 安装**每日自动更新定时器**(除非你选择退出——见下文)。

跟踪日志`journalctl -u nodeterm-server -f`(增加) (中文(简体) ).`--user`用于非根部安装).

自动更新她在

安装器也安装一个`nodeterm-server-update.service`联合国`oneshot`加上一个`nodeterm-server-update.timer`(单位:千美元)`OnCalendar=daily`,(杜绝)`RandomizedDelaySec=3600`,(杜绝)`Persistent=true`), (中文(简体) ).
以相同根/用户拆分**作为主要服务(下面的系统单元)`/etc/systemd/system/`,或`~/.config/systemd/user/`) (中文(简体) ). 当它燃烧时,
服务 :

一、导 言`git pull --ff-only`输入`~/.nodeterm-server-app`更新离职单 ** 包括此
更新器脚本**,因此更新器逻辑保持了自身流畅;
2. 重新执行新推出的`scripts/install-server.sh`,用于重建和重新启动
服务。 安装器是一流的 所以通过无害的
重建 。

** 退出:** 用`NODETERM_NO_AUTOUPDATE=1`- 它跳过计时器,和(所以)
重新运行可关闭自动更新日期) ** remove 当我们使用已有的**定时器/服务. 安装者打印
计时器状态( O)`systemctl list-timers`)在它的摘要中,这样你就可以确认下一次运行.

手动检查或触发:

```bash
systemctl list-timers nodeterm-server-update.timer      # add --user for a non-root install
systemctl start nodeterm-server-update.service          # run an update now
```

每个用户安装(每个Unix用户一个)

一个安装覆盖**只覆盖它运行的Unix用户**——它的系统化单元,`~/.nodeterm-server-app`离职,和`~/.nodeterm-server`数据目录是该用户的。 包含多个服务器用户的框
(单位:千美元)`root`, (中文).`customerservice`,(...)需要**每个用户安装一个**;电话提供这个
连接( 它在任何用户的SSH 会话日志中安装) 。 非根安装依赖`loginctl enable-linger <user>`(安装器运行)所以用户的系统管理器 哇,所以
服务与自动更新定时器均不活动登录。

###`NODETERM_HEADLESS`

设定`NODETERM_HEADLESS=1`(亦接受)`true`以无头模式启动。
所有的东西都像往常一样 —— 回转钩服务器 Alfredo 代理状态镜像
用户民意调查,授予的推送人(push-notify + Live-Activity),以及待批
扫——**除**公共HTTP/WS收听器,该收听器从未捆绑**. 没有制造器
服务而无认证表面。`NODETERM_HOST`页:1`NODETERM_PORT`被弃绝;`platform.broadcast`是一个没有浏览器 UI 的禁用。

* 安全 那么你的理论:零开放端口

这种模式的整个要点是,它增加了**没有网络攻击表面**:

-**完全没有公开的听众。** HTTP/WS 服务器从未创建, 所以没有端口可以
的合作,没有登入网页 野蛮的力量, 没有会话饼干飞行。
-** 钩子服务器只能回转。 ** 特工CLIsPOST 他们的生命周期钩`127.0.0.1`(一个每届无记名符号,故障打开)——它永远不会离开主机.
-** Push只出门。 ** 经授权,通过** 境外HTTPS** 拨打电话。
由一个签名的, 设备扫描** grant** 电话本身掉到`~/.nodeterm/push-grants/<deviceId>.grant`当它到达主机 超过SSH。 无入境
连接,没有站立的中继身份——一个电话从未掉落的赠款就意味着没有推力.

电话本身的SSH会话进入主机是信任边界;节点不增加听力
旁边

                                                  你先用会议预算(会期收割者)

tmux会话故意超过客户(即连续性合同),所以主机是
服务许多 SSH 项目 缓慢累积 ** dadected ** 代理会话
——一份实地报告计算了95场会议,有34袍子闲置`claude`进程。 每个
节点服务器(无头或服务)运行** nó的预算**(`src/core/session-budget.ts`,则
Tmux 渲染器 WebGL 预算的对应器: 每10分钟它会扫描本地`node-terminal`** ** SSH 远程`nodeterm-rmt`套接字并收获**最近活动的
分离**`nt-*`届会

- 主机**可用内存** 低于水印(默认为RAM的10%,1 GB楼)——
纯属受压力驱动的主要触发装置;或
- **已删除的会 Nixon值** 超过上限(默认值48)——积存备份。

** 附带的会话从未触碰**,宽度窗口(自上次活动以来的默认值 6 h)保护
最近的工作,杀人被重新核实 与新的上市, 每一次扫荡收获最多一个小
批量(默认8),所以趋同是渐进的。 收获的会话与重启是分不开的
转到它的节点:下次打开它时**冷退**(回滚快照+`claude --resume`) (中文(简体) ). 调制/
通过env杀死开关 :`NODETERM_SESSION_MIN_AVAILABLE_MB`, (中文).`NODETERM_SESSION_MAX_DETACHED`, (中文).`NODETERM_SESSION_GRACE_HOURS`, (中文).`NODETERM_SESSION_REAP_BATCH`, (中文).`NODETERM_SESSION_REAP_DISABLED=1`。 。 。

QQ 会话内存( RAM 丸 + 每会话面板)

收割者的对手 一个人类:`startSessionMemoryService`(单位:千美元)`src/core/session-memory-service.ts`页:1
被踢到这里,除了死神`src/server/index.ts`,以及`window.nodeTerminal.sessionMemory`有****ws-bridge执行(不是支点)。 因此浏览器得到了左下角的RAM药丸和
每个会话的分解,并同时描述 ** 服务器服务于 ** 的机器: 联合国`/proc/meminfo`时,`node-terminal`页:1`nodeterm-rmt`tmux 套接字,它的处理表. 完整写入 :`docs/session-memory.md`。 。 。

** SSH 项目的范围答案`ok:false`——"不能量度"——这是故意的. ** 编号
服务器没有ControlMaster, 因此它不能读取另一个主机; 用自己的会话回答会
在主机名下发布此机的内存. 与远程使用相同的降解, 一步
更严格:

- 服务是**`isRemoteProject`但是没有`run`**. 了解哪些项目是某人
其它的机器和能够读取它们的能力是不同的,选择对是
非对称地说`run`可选的,`isRemoteProject`A/CN.9/WG.III/WP.31,附件。
- 拒绝的决定是**根据身份**,而不是通过信任制造者`remote`旗帜 :`sshScopePredicate({ sshProjectIds: () => workspaceStore.sshProjectIds() })`输入查询
没有这面旗子——一个尚未了解该项目的客户端是SSH的客户端——则不然.
进入LOCAL的搜索, 这正是错误分配 拒绝的存在防止。
-** 上游要看时间`await workspaceStore.load(...)`** 计`startServer`(a) 联合国
上下文链接)。 放下它,否则就别等了`server.listen()`· 每一个SSH项目又被无声读作地方性;`test/server/session-memory-e2e.test.ts`如果发生这种情况则失败。 什么是**不**负载是
负载相对于服务舱的位置:`isRemoteProject`被评估的关闭
QUERY, 无法在未到达前到达查询`startServer`达到`listen()`要求是:
负载在服务器 * serves * 之前完成,而不是在任何特定启动线之前完成。

一个无头的主机像其他核心服务一样靴子 但没有UI
问它。

* 主机团队接力`team`CLI) (中文(简体) ).

一个服务器版可以主持一个团队,该团队表达了桌面在中继器上加盟,运行于`team`CLI Minnesota,作为
服务自己的用户( 你是怎么使用的)`node ~/.nodeterm-server-app/out/server/main.cjs team …`);操作指南是`docs/hosted-team-relay.md`。它有两个动词,用于桌面的 ** 共享与团队**,两者都存在
从主机上的壳体手动工作. `团队拖带- 所有者- 键 < key > - 采用 < dir >
[-所有者-label <name>] 是一个独家电话中的全部设置:它创建团队并启动
主机, 使密钥成为所有者, 将文件夹引入此核心的工作空间( 按真实复制 )
路径; 已存在的`.nodeterm/project.json`保留其节点)并共享,然后打印加入
代码。`team resume --project <id>`在此核心的 tmux 套接字上重新启动代理会话 a
桌面已移交, 并恢复对话; 它将其会话列表读作 JSON 。
从来没有从命令线。 下级`--json`,服务器失败(退出 1)打印一个 JSON
在 stdout 上行,服务器发送一个时有稳定的代码(`E_BAD_KEY`, (中文).`E_BAD_CWD`, (中文).`E_HOSTING_OFF`, (中文).`E_ADOPT_FAILED`, (中文).`E_BAD_REQUEST`, (中文).`E_UNSUPPORTED`); CLI 本身的命令行
仅在 Stderr 上拒绝 2 出口 。 浏览器构建不能启动团队共享: 它没有 SSH
项目,以及`shareTeam`拒绝`E_UNSUPPORTED`。 。 。

□ 安全模型

单用户认证。 密码只有一个;会话为每个浏览器 。

- ** Password hashing:** scrypt(英语:`N=16384, r=8, p=1`, 32 字节键, 每字随机
盐,以`auth.json`(模式)`0600`在数据目录中。 登录比较是
恒定时间( E)`crypto.timingSafeEqual`) (中文(简体) ). 应用程序从不存储简洁文本.
- ** Password 校验** 运行一个同步键盘,每次最多两个(FIFO)
))),因此,一次突然的登入尝试永远不会拖累每一次载着的事件循环。
终端的 WebSocket.
- ** 会议饼干:** 在成功登录服务器集时`nt_session=<random>`与`HttpOnly; SameSite=Strict; Path=/`的,以基于基于的、以基于的、以以基于的、以以基于的、以以以以以以以基于为以以以以基于为以以以以以以以基于为以以以以以基于为以以以以以以以以为以以以盏的以以以以以为以以以以以以以以以以以以以以以以以以以以以以以以为以以以以以以以以以以以以为以为ظ以为以为以为以为以以以为以以以以以以以以以以为以以以为以以以以以以以以以以以以以以以以以以以以以以以以以以以以以以以以以以以充分地以以以以为以以以为以以以为以以以以为以以为以为以为以为以以为以以为以以以以为以以为为以为以以以以以为以以以以以以以以为以以以以以以以以以以以以以以以以以为以以`Secure`何时`NODETERM_PUBLIC_ORIGIN`设定
或代理发送`X-Forwarded-Proto: https`(参见[TLS](#tls-逆向-代曲)). 会议
持续(`sessions.json`模式`0600`以30天的TTL并扫荡懒惰。
- 来 来 来 来 来 来 来 来  : 鳄:`POST /auth/logout`删除服务器上显示的会话, 因此 a
饼干的复制件也停止了工作(它曾经只清除浏览器的饼干和
30天有效)`POST /auth/logout-all`("随处签名").
删除每个会话;它需要一个已签名的呼叫器。 两者都在浏览器 UI 下方
** 安排 • 应用程序 • 签名**(仅服务版)。 打开的 WebSocket 记得
会话随即打开并关闭(代码:`4401`此时此刻
签了字, 并在下个心跳( 30 s) 到期后签了字。 打开套接字
代理头信任与代理的身份有关,而不是饼干,并保持开放.
- ** 同源检查:** WebSocket升级和`POST /auth/*`(登录、登录、
全部登录,设置)拒绝请求`Origin`不是这个服务器: 它的主机必须
等同请求`Host`,或`Origin`必须平等`NODETERM_PUBLIC_ORIGIN`。 。 。`Origin: null`并拒绝一个畸形的起源。 请求无`Origin`是一个
非浏览器客户端(浏览器总是在 POST 和 WebSocket 握手时发送一个)
并被允许——除非它说`Sec-Fetch-Site: cross-site`或`same-site`拒绝 。
定义 POST 被回答`403 cross_origin`并且不会被扣上关卡 这样一页
所有者访问时,既不能张贴登录表(以将其锁起来),也不能将其签出。
- ** Login利率限制/关闭**,每个客户:
- 登录尝试预留一个插槽,**在读其机体之前,预算计算
飞行中的尝试和失败。 (曾经在尸体前检查过)
在核查后,要求其尸体被扣在后面的请求全部通过:60
( 出席情况)  出席情况
放弃,并且其插槽免费释放。
- 5次故障(或仍在飞行中)锁定**该客户**1分钟;
进一步锁定双人,最多1小时. 成功重置客户端; 客户端安静
在最后的锁被遗忘后一小时 拒绝是`429 too_many_attempts`带有`Retry-After`各派标题(浏览器在几分钟内随等待获得登录页面).
- 每5分钟滑动窗口50次 Jeffersonp +飞行尝试的全球上限,
在所有客户中, 是针对一个有多个地址的猜测者的后盾。 费用:
在持续的分布式攻击下,它也拒绝主人,直到窗户排水。
- **谁是客户:** TCP对等方,除非对等方是转发方——回转,a
私人、 CGNAT、 链接本地地址或 ULA 地址, 或内部`NODETERM_TRUST_PROXY_NETS`——其中,
这是最后的`X-Forwarded-For`条目( 您的代理附件; 条目)
在它的左边,谁叫谁代理,谁就写谁。 IPv6客户端按其分类
64. 后果:从转发地址(当地地址)到达服务器的过程
用户,网络上的另一个容器)可以选择它充电到的桶——
全球上限仍然适用于它;在两个代理之后(CDN位于您前面)
代理)客户端按CDN的边缘地址分组.
- ** 无框架:** 每一份答复都附有`X-Frame-Options: DENY`和`Content-Security-Policy: frame-ancestors 'none'`(该应用程序自己的CSP是一个`<meta>`标记,在哪里`frame-ancestors`页:1`X-Content-Type-Options: nosniff`。 。 。
- ** 认证门:** 除登录/设置页面及其POST处理器外的每个路线
需要一个有效的会话 - HTML 导航方向`/login`,API/WS 获取`401`。 。 。

XQ 反向代理 SSO( 头部信任)

部署以 SSO 反向代理( Cloudflare 访问,
{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}已经验证了它面前的每一个请求 {\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}我 请将本函及其附件作为安全理事会的
到达节点, 代理在请求头中声明身份 。 设置`NODETERM_TRUST_PROXY_HEADER`将此类请求算作经认证的请求——否
需要密码、设置令牌或会话 cookie :

```bash
# Cloudflare Access
NODETERM_TRUST_PROXY_HEADER=Cf-Access-Authenticated-User-Email node out/server/main.cjs
# Tailscale (tailscale serve / funnel with identity headers)
NODETERM_TRUST_PROXY_HEADER=Tailscale-User-Login node out/server/main.cjs
# oauth2-proxy / Authelia / most others
NODETERM_TRUST_PROXY_HEADER=X-Forwarded-User node out/server/main.cjs
```

只有在** ** 所有持有:

1. 其** TCP同行地址** 位于内部`NODETERM_TRUST_PROXY_NETS`(默认 :
仅回转——同宿代理部署). 如果你的代理到达
在私人网络上明确列出容器,例如:`NODETERM_TRUST_PROXY_NETS=10.0.0.0/8`· ;
2. 带有**非空值**的配置头;
3. 何时`NODETERM_TRUST_PROXY_SECRET`已经设定,它携带`X-Nodeterm-Proxy-Secret`相等于它,

信头 ** 内容未验证 ** (没有 JWT 验证) — 可信任的网络
边界是信任声明,在**回落时,边界占据每个局部
进程**:主机上每个Unix账户、主机网络上每个容器、每个
沙箱代理是"来自信任的网络". 因此:

- 后背网需要这个秘密 如果信任的网包括回转(127.0.0.0/8或`::1`,包括默认和任何更广泛的,例如`0.0.0.0/0`没有秘密,
页眉信任保留 **OFF**:服务器仍带有密码签名的靴子和靴子
打印 a`✖ Proxy header trust is OFF`命名设置出错 。 循环端口永远不会
信头没有秘密 不管什么配置
- ** 其他网没有它工作,但得到一个警告:**每个可以到达服务器的主机
从这些网络——同一网络上的其他集装箱,Docker主机桥
地址 - 计数为您的代理 。 把秘密设置在那里。

要打开它,产生一个秘密`openssl rand -hex 32`,通过
环境(a)`--trust-proxy-secret`拒绝标记:每个本地用户都可以读取 ,
并让代理机发送到**所有**请求,WebSocket升级包括:

```nginx
# nginx
proxy_set_header X-Nodeterm-Proxy-Secret "<secret>";
```

```caddy
# Caddy (inside reverse_proxy)
header_up X-Nodeterm-Proxy-Secret "<secret>"
```

```yaml
# Traefik (a headers middleware attached to the router)
http:
  middlewares:
    nodeterm-secret:
      headers:
        customRequestHeaders:
          X-Nodeterm-Proxy-Secret: "<secret>"
```

代理在收到的客户端请求中还必须 ** strip/ overwrite ** 身份头
(Cloudflare Access, Tailscale 和 oauth2- proxy 都做). 一个来自信任的请求
地址与身份头,但没有正确的秘密 被视为签署,
和服务器日志( 最多每分钟一次, 没有任何标题值) , 即该秘密
失踪。 一个打字网入口, 一个短于32个字符的秘密, 一个有空间的秘密,或者
一个没有头条的秘密 都使靴子失效 而不是悄悄改变谁被信任;
也拒绝设置无头的网。

> ** 更新已使用回转头信任的部署**(默认网):
> 此更改标题信任终止, 直到您设定`NODETERM_TRUST_PROXY_SECRET`页:1
>代理头. 用户然后查看密码页;用密码签名,或设置密码
{\fn黑体\fs20\shad2\2aH82\3aH20\4aH33\fscx95\3cH592001\be1}# 秘密 {\fn黑体\fs20\shad2\2aH82\3aH20\4aH33\fscx95\3cH592001\be1}# 秘密 {\fn黑体\fs20\shad2\2aH82\3aH20\4aH33\fscx95\3cH592001\be1}#

其它一切保持完好无损:密码/cookie auuth继续工作在旁边(例如.
对于回转操作访问,WS升级 仍然执行同一主机Origin检查,
和代理访问`/login`或`/setup`刚转身回家。 靴子记录
打印 a`⚠️ Proxy header trust ENABLED`线条命名标题、网络和
是否需要一个秘密——核实它是否与你所要信任的相符。

QQ TLS( 反向代理)

服务器使用**Plaint HTTP**设计. 对于任何超出`localhost`运行它
绑定回转并设置一个 TLS 终止反向代理( nginx, Caddy, Cloudflare)
前面的Tunnel,一个VPN等),并告诉服务器您在浏览器中打开的地址:

```bash
NODETERM_PUBLIC_ORIGIN=https://term.example.com node out/server/main.cjs
```

有了它,会话饼干是** 总是**`Secure`每一次反应都包含`Strict-Transport-Security: max-age=31536000`; 一个`Origin`和它一样,
当代理重写时进行同源检查`Host`它必须是`https`无路径的源
(其他任何东西都失败了靴l). 没有它,服务器的行为像以前l -`Secure`仅设定
当代理发送时`X-Forwarded-Proto: https`,没有发送HSTS——它记录一个警告
第一次有请求到达时`Host`,因为没有发送的代理
那个信头默默的丢失`Secure`。 。 。`--insecure-http`仅作为明亮的 睁开眼睛的存在
用于信任的私人网络的逃生舱门——更喜欢代理.

+++ Docker / 多克普洛伊

回收船是一个多阶段的`Dockerfile`构建渲染器+服务器捆绑和
生成一个微弱的运行时图像`tmux`、`git`和`curl`(管理钩脚本 POST)
通过卷曲). 任何基于 Dockerfile 的 PaaS (Dokploy, Coolify, plain mapose) 可以部署它 :

```bash
docker build -t nodeterm-server .
docker run -d -p 8443:8443 \
  -e NODETERM_SERVER_PASSWORD='choose-a-strong-one' \
  -v nodeterm-data:/data \
  nodeterm-server
```

在 Dokploy 中: 从此 repo( Dockerfile 构建) 创建一个应用程序, 附加一个音量 :`/data`设置`NODETERM_SERVER_PASSWORD`和`NODETERM_PUBLIC_ORIGIN=https://<your domain>`,以及
在容器端口点出一个域`8443`——Traefik终止 TLS(和向前)`X-Forwarded-Proto`),所以会话饼干得到它的`Secure`旗帜和剪贴板运行于 a
安全环境。

图像为您决定的事物( 见 Dockerfile 注释的全部原因 ) :

-**Node -pity是对照Node的ABI编译的,而不是Electron的.** 货款`postinstall`运行`electron-rebuild`,它针对电子——图像中的每一个安装都使用`--ignore-scripts`加上一个明确的`npm rebuild node-pty`别"简单"了
- ****`--insecure-http`由于容器必须捆绑`0.0.0.0`———————————————————————— 我不理而行。
到达它,而TLS则生活在代理中. 永远不要在公共界面上直接发布端口.
- ** 集装箱重启/重新部署会杀死 tmux 服务器**(它住在集装箱内)。 这个
冷还原路径桥 —— 回滚重放`/data`简况和可恢复性
重新启用代理`--resume`——但运行过程随每次部署而消亡. 就是这个
行为区别与长寿主机的安装,只有机器重启才能做到这一点.
- ****`/data`必须是卷 * ** —— 校正、会话、工作空间和回滚快照都在那里;
没有它,每次重启都会忘记密码和画布。

干员 cLIs (`claude`——安装到运行中
容器(或扩展图像)并在终端节点内认证;其配置寿命
在容器用户的家,所以如果依靠它们,也考虑那里只是在量。

* 社区支助方案

内置登录/设置页面带有严格的CSP. 建筑`index.html`装有`default-src 'self'`标记服务器 **在服务时重写 ** 到`default-src 'self'; connect-src 'self';`因此浏览器可以打开 WebSocket: CSP3
匹配同一来源`ws:`页:1`wss:`URL 相对`'self'`,桥只打开`/ws`在页面的自己的主机。 (过去是)`connect-src 'self' ws: wss:`,即套接字
任何主机——没有XSS,一个带一个的过滤通道,是无害的. ) 无头验证
第153号判决`http`页:1`ws`和`https`页:1`wss`: 同源套接字打开, a
交叉原产地被封锁了 Firefox和Safari遵循同样的CSP3规则,但没有运行;
浏览器太老,无法应用它会阻断 WebSocket 并显示重联覆盖 。 若为
如果缺少标记,服务器会记录一个响亮的警告(否则WS会是
blocked)——重建渲染器或更新重写. HTTP 头条拒绝 Framing 打开
每个响应(见[安全模型] (#安全模型)).

- 翻译

语音对文本输入在浏览器中通过**相同的核心语音服务**桌面应用程序使用. 你要我用 QQD (或 Dock mic 按钮); 转写文本进入覆盖的可编辑字段, 并且只能通过明确的 Send/ Insert 发送到覆盖打开时选择的节点中—— 没有自动提交. ** 浏览器限制:**`getUserMedia`需要**安全上下文**-HTTPS或`localhost`;麦克风许可提示是浏览器自己的. ** 模型存储:** 下载的模型( tiny free level; 更大的 Pro 模型) 存储在 ** server 的数据 dir ** 下`speech-models/`你说                                                                                                                                                                                                                                                     

□ 记录了对光谱的偏差

两次故意离开`docs/superpowers/specs/2026-07-10-server-edition-design.md`编号 :

1. ** 经常预算:`node:http`+ 条规定`ws`页:1 HTTP/WS表面很小(一小部分)
路径 + 1 WS 终点); 内置`http`模块加`ws`留着
依赖性足迹最小,避免了无益的框架。
2.**crypt,而非argon2.**crypt在Node的标准库中(.`crypto`),所以还有
没有本地的依赖性建造/船舶。 参数遵循OWASP基线.

□ 第2阶段限制

- ** 仅限任期。 ** 终端节点工作(春,I/O,调整大小,tmux连续性). 那个
git 面板、 源控件、 摩纳哥编辑器/ diff 节点、 SDK 聊天节点、 代理状态
徽章/呼号,文件夹拾取器被**不**连接到服务器桥上,现在——
他们的`window.nodeTerminal`方法被扭曲。 推迟到第三阶段。
- **重新连接=整页重载。 ** 当WebSocket落下时,桥会显示
覆盖和回收路径是重新装入页面; 在 欢迎每个终端重新装入
tmux会话和tmux重排。 (规格)
较轻的"线条重联条"被记录为v1权衡. )
- ** 初次连接失败显示空白屏幕**(在阶段3c中解决)。 如果
服务器在第一页负载时无法访问(相对于中段投放),
重新连接的叠加没有出现—— 您有一个空白的页面 。 桥现在显示
在失败的连接上重新连接, 而不是启动应用程序, 并重新装入
重新打开。 见[第3c阶段](#第3c阶段-后续加固)。
-** 无后压/流控自动触发器。 这个`pty.setFlow`管道存在
端到端, 但没有任何东西会自动暂停基于 WebSocket 的洪水 PTY`bufferedAmount`还没有。 推迟到第三阶段。
- ** 单一用户。 ** 密码一个,没有账户/账户。

□ 阶段 3a: 文件、 编辑器、 diff 源控件( S)

阶段 3a 将浏览器表面从只限终端拓宽到文件和 git
工作流程。 服务器现在注册核心 **fs**,**git**和**承诺信息**
处理器和浏览器桥显示真实`fs`页:1`git`页:1`files`页:1`context`APIs,所以几个节点类型和面板,在第二阶段被固定,现在工作在
浏览器 :

- **编辑器和diff节点** — 摩纳哥编辑器节点读取/写入文件`fs:read`页:1`fs:write`(QQS 保存),和 diff 节点渲染`git:show-file`+ 键`fs:read`两者
现在在浏览器中功能不变。
- ** 源控制面板**——阶段/未阶段/丢弃,diff,分支开关/创建,
承诺 + 推, 和 QQ AI 承诺 消息( BYO 本地代理 CLI 在舞台上)
diff)全部运行于服务器的`git`服务。
- ** Exploser ** — 文件树列出项目`cwd`通过`fs:list`。 。 。

以下负担在浏览器中改变形状( 无法到达本地的 OS) :

- **Folder / file picker ** — 没有 ** 本地对话框 **。 “ 打开文件夹... ” 和文件
拾取器使用 ** in- app 服务器目录浏览器** (构建于`fs:list`让
在服务器的文件系统中导航并选择路径。
- ****`shell.openExternal`** —— 在 ** 新浏览器标签中打开 URL **  bot** 而不是 a 真的吗?
桌面侧默认浏览器 。
- **"Reveal in Finder" / "打开默认应用" ** — ** 惰性** 在浏览器中
(没有桌面文件管理器可披露); 动作被隐藏或
而不是错误。
- ** 剪贴板(副本)** — 浏览器`navigator.clipboard`仅存在于 ** 安全
上下文** (https或`localhost`) (中文(简体) ). 在局域网的网页上`undefined`,所以请
桥回向隐藏文字区域`document.execCommand('copy')`倒计时
只工作** 在用户手势**:副本快捷键和点击驱动的副本
按钮是好的,但是`OSC 52`由终端驱动的写入 * 输出 * (`vim "+y`, (中文).`gh`, (中文).`yazi`)不是 —— 它失败并升起 ** banner ** (“ 浏览器块块剪贴板访问 ”
」。 复制不会无声失败 但如果你想正常工作
** 在https(或localhost)上服务**——这也是上面TLS代理的一个原因.
请注意,**Ctrl+Shift+C**(在Linux/Windows上作为副本发布)额外打开
Chromium的元素检查器和一页不能压制这一点;** Ctrl+Insert**是
浏览器安全复制和弦.
- ** Markdown 视图 toggle (QQ/Ctrl+M) ** — 在浏览器中工作:没有主进程可
截住它,桥和用户的`node.toggleMarkdown`约束本身
窗口按键下听器( E)`src/renderer/bridge/markdown-toggle-key.ts`并尊重
像桌面一样的终端第一策略。 缩略语 Chrome 预留 QQM 窗口
最小化** 并且从不把它送到页面, 因此在Mac上默认的和弦是
没有 – 在设置中重新绘制它 – 键盘快捷键, 或者使用节点的右键点击
"马克唐风景". 在 Linux/ Windows 上,默认值为 Ctrl+M,默认值为
App-first 策略完全取自桌面上的焦点终端( shell sees)
Ctrl+M 作为 Enter). Ctrl+M在摩纳哥的专注编辑中依循摩纳哥自己的"切换 Tab"
密钥移动焦点“ 绑定; 将节点悬挂在其它位置以切换其预览 。

第二阶段限制中注意到的**后压/流量控制**差距现在
关闭: 根据 WebSocket 自动暂停淹没的 PTY`bufferedAmount`并恢复当它排水, 所以WS被保护。

> ** 协调(后续行动)。 ** 服务器侧 WS 后压和
> 渲染器终端( xterm) 流量控制坐标仅 ** loose ** 相对于 共享
> 暂停驱动器( E)`ptyManager.setFlow`) ——完全双主协调是后续.
> 因为任何一方都可以独立恢复pty,服务器** re-asserts ** its
> 当套接字缓冲器停留在高水标上方时,在每次发送上暂停(而不是)
> 大于在单一上升边缘上拉线,因此渲染器侧恢复不能沉默
> 锁定服务器的保护。

** 仍然推迟到第3b阶段:** SDK **聊天节点** 和**剂状态
徽章/胡克**尚未连接到服务器桥。

□ 阶段 3b: 代理状态, 子代理和上下文表

阶段 3b 带来了代理可观测性表面—— 桌面应用程序相同的代码路径
使用 – 到浏览器 。 服务器给回路带 ** hook 服务器**
(单位:千美元)`hookServer.start()`,单独`127.0.0.1`端口)并安装管理嗓钩
脚本,所以每个代理CLI 服务器产卵POST 其生命周期钩回
主持人。`wireAgentStatus`安装钩子服务器的常态 + 原始收听器和
每个事件经过的路线`platform.broadcast`,所以现有的渲染器徽章/副剂
/ 上下文代码目前在精灵这一部分浏览器中工作不变 :

- **代理身份徽章** — 代理自己的钩子( 不是输出解析)驱动共享
4-状态模式; 正常活动通过播放`agent:status`和页眉
显示脉冲**RUNNING**(工作) /**NEEDS你**(等待/锁)徽章,加
未读点和完成通知(作为网络通知——见第二阶段)。
- ** 副剂可视化** 副剂启动/末驱动电平酝酿**臆想
结束`agent:subagent-activity`;主处理子剂尾流每张卡的直播
记录到浏览器。
- ** Context-window meter**——每个节点的上下文尾流`context:update`所以说
随着会话记录的不断增长,计数器已经填满(这个频道在 3a; 3b 中已经是真的)
从钩子管道里喂它

因为钩子POST带了一个`transcript_path`伪造的《反恐法》
系统默认路径`~/.claude/projects`或管理账户目录
(单位:千美元)`isSafeLocalTranscriptPath`在任何尾巴读之前。

QQ 上下文链接

上下文链接在服务器版中工作. 该特征本身完全生活在核心
(单位:千美元)`src/core/context-link.ts`并写下一切`dataDir`;需要从一个
shell是**link地图**——谁与谁相连.

桌面从它的渲染器中获取,因为React Flow持有活画布. 那个
这里不适合: 代理和他们的 tmux 会话会随着浏览器关闭而运行,
并且无头部署可能永远不会有一个附件。 所以服务器得到同样的地图
从** 持久性**`bridges[]`每张画布(`workspaceStore.persistedCanvases()`→`buildBackgroundLinkMaps`时,`src/server/context-link.ts`) (中文(简体) ). 工作空间保存复选
立即; 15秒的扫荡 也捕捉从钩子上到达的记录路径
而不是从任何帆布更改, 并跳过写入, 当没有移动。

后果值得了解:

- **Boot读过工作空间一次**(`load({ sideline: false })`B. ) ) . ) . ) )
第一个浏览器连接。 故意只读——将冲突放在一边`project.json`保留一个渲染器/测试决定。
- ** Boot 当管理下的钩子安装时,还写入代理配置目录**
打开:`get-linked-context`Claude 技能, 加上标记限制的指令块`~/.codex/AGENTS.md`,及早`~/.gemini/GEMINI.md`打开代码`AGENTS.md`这些块是
专制并保存周边内容. 设定 **`installHooks: false`** 跳过每个
其中一个写作者 被读取的人 仍然在工作, 特派员就是
告诉了Shim什么的
- ** 仅当地 Centre,故意。 ** 没有注入远程道具 Centre`initContextLink(pty, {})`:
服务器运行在它读取的文字记录和tmux主机上, SSH 项目是
桌面专用概念 。
- 怎么样?`contextLink.info()`在浏览器桥中仍然不支持,所以画布注释
宣布新链接不能引用shim路径。 启动指令覆盖
独立发现。

** 设计范围和特征门差异:**

- SDK**聊天节点** 仍然是** 延迟** ——没有线接入服务器桥.
-**加拿大控制**(`agent:control`) 是在服务器版上进行选择的。 不得得不得的不得不得不得的不得不得不得的不得不得的不得的不得不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的不得的`/control/<verb>`对 HTTP 400 的回答`error: control-unsupported-on-this-edition`(单位:千美元)
含有文字 * 的句子“ 不重试 ” *。 启用它后, 只有限定的 v1 动词
下文所述为有线词;其他每个动词都收到同样名称的永久拒绝。`browser`其他名称为什么是**结构**而不是未执行——
此版本上的浏览器节点在 **viewer 自己的 ** 浏览器标签中制作, 此选项
服务器没有调试器,也永远不会。 整个`browser`驱动器已运出
因此,S8(导航/阅读/点击/类型/按压/scroll/wait/screwshot/cookies)是**只使用桌面**:
它需要电源`<webview>`+ CDP,本版没有,所以没有
浏览器在这里驱动。 见`src/server/control-unsupported.ts`。 。 。
代理消息动词(`send`页:1`reply`页:1`notify`)是经核实的。 当服务器控制是
允许它们额外需要过程 - 局部证明 呼叫者在此生成目标
运行; 禁用控件`control-unsupported-on-this-edition`。 。 。
- 那个**`ptyDestroy`尾-斜拉** — * 已溶于第3c阶段。 3b 阶段未跳过
附 件 一`SessionEnd`,所以一个节点关闭 没有 *一个留下了一个
闲置文件尾巴; 服务器现在解析节点关闭时的代理尾巴, 以桌面对等方式 。
见[第3c阶段](#第3c阶段-后续加固)。
- **SSH - 远程代理尾巴是N/A** - 服务器没有SSH - 项目管理器,所以
丢弃桌面钩线- 线条块的 SSH 分支( 原始听众直落)
(通过当地逻辑)。

□ 第3c阶段:后续加固

第3c阶段关闭了第3b阶段留下的两个后续程序,将浏览器桥带到了
代理- 尾端清理和首通行为上的桌面等价 :

- ****`ptyDestroy`尾-上下只是在桌面对等。 ** 当节点关闭时只是在服务器上
** 未跟踪其代理尾巴**(每个节点上下文/播音员会话状态加上
上下文尾巴和副剂尾巴)`ptyDestroy`,正如桌面应用程序所做的那样——没有
更多闲置的文件尾留待节点关闭 * 没有 * a`SessionEnd`(例如,X)
按钮)。 这是通过制作`platform.on`** 多收音机** (匹配电源)`ipcMain.on`:新的撕裂式收听器运行**aide**`PtyManager`属于自己的`ptyDestroy`而不是破坏它。
- ** 在失败的初始连接上清除靴子。 ** 失败 * first * WebSocket 连接不再
将应用程序拖入破损/空白状态 —— 桥显示标准重联覆盖
程序在重新打开时会重新唠叨, 所以第一次装入失败现在表现得像一个会话中空。

** 推迟:** SDK **聊天节点**,全
** 双主流控协调**
(服务器仍然在每次发送时重新加载其WS后压暂停而不是共同管理)
使用渲染器的单个动词),以及网页文件夹拾取器的**硬码淇起
目录**。

Opt- in 帆布控制和创建者所有权

服务器帆布控制默认已禁用 。 设定`NODETERM_SERVER_CANVAS_CONTROL=1`(或通过)`--canvas-control`)安装服务器本地shim并启用其`/control/*`执行。
每个已启用的请求都需要经过核实的节点身份. ** 授权它让代理会话运行
当服务器的用户运行为**时美丽命令`open-terminal --cmd <command>`在一个 PTY 中执行此进程产生, 并带有该用户的环境、文件和证书 。 这个
的目的是决定 哪个特工可以问 而不是要求什么
打开褥子是主机,不是画布。 启用褥子到一个主机上, 其中你将满足 交这些
特工一个贝壳。

所有权有意窄于桌面确认 UI: 代理可能变异,消息,
或仅关闭在当前服务器运行过程中打开的节点。 链接, 组, 重命名, 颜色,
粘性更新、依赖性目标、信息发送和密切验证其完整的指标集
在任何写作或PTY杀之前; 无人拥有的成员拒绝整个操作.联合国系统各实体应提供下列信息:
创建者除了现有的已核实和每个项目的切换闸门外,还要在冲洗时检查。

创建者分类账只包含内存, 从未从工程文件、 标题、 钩子中重建
记录,或 tmux 会话名称。 服务重新启动后为空, 启动时不执行画布节点
或终端会话的通过: 它不附加或创建缺失的后端,也不发送
即使 tmux 后端幸存, 也坚持队列命令 。 后期明确所有者打开或浏览器
视图是唯一的冷泉路径。 普通终端没有代理身份或帆布控制赠款;
失踪`agentId`绝不意味着克劳德

画布控制写入不是外部编辑 。 工厂改变项目,保存它,
广播整个事情 **`workspace:server-change`** 自有渠道,与
联合国`workspace:external-change`工作空间监视器用于 git 拖动或手部编辑。 我们分享
该通道直到测量: 渲染器通过比较外部编辑进行分类
项目外壳,`ropes`包括,所以单身`ctrl-…`每条绳子`open-agent`作为附件读作
只要帆布脏了,冲突就会爆发,因为
配对`canvas:mut`标记它脏,产卵进入 自动解冻,冲突
栏会暂停自动保存,所以第一个把栏杆绑在上,以后每写一次都会重新提出。
"保留我的版本" 然后连载浏览器在文件上的边缘 然后把绳子放下
工厂一直坚持着 在新频道上,浏览器三向合并
(单位:千美元)`renderer/lib/serverChange.ts`: 打开服务器的节点被默默采用,绳索和桥梁
与最后一个已知的磁盘副本合并,未保存的本地编辑幸存。 没有要求
用户,因为合并的两م是相同的应用程序。

`open-terminal`/`open-agent`接受`--run-now`作为不开放: 服务器已经启动,
无头.`--run-now`与`--after`在桌面上拒绝
(单位:千美元)`RUN_NOW_AFTER_REFUSAL`) (中文(简体) ).`run --node <id>`发送节点保留发射(现在运行)
按钮的工作),仅供节点的创建者使用. 它需要验证身份 并解决节点
通过所有者记录,从来没有通过第一个 id 匹配,因为节点 ids可以重复跨
项目。 它在书面索赔前拒绝SSH节点,并回答`--project`名称
其它工程为"No no node with id".`run`和每个立即打开 携带发射命令,
通过相同的回声验证发射器交付桌面的无头启动用途
(单位:千美元)`core/headless-launch.ts`),与`release:false`:服务器保持客户端连接,即
连平板壳都伸手可及 推迟`--after`释放(`refreshArmed`页:1
仍然贴着`sendText`。没有`--run-now`也没有`run`已关闭项目或
通知,与服务器的其他即时打开相同。

具有可支配特性的验证升级`NODETERM_DATA_DIR`和港口。 重新启动共享直播服务器
服务是明确的操作者动作;它不是测试、修理或救靴流动的一部分。

管理下的克劳德账户

管理Claude账户(几个登录的Claude身份并存,每个账户都有自己的身份)`CLAUDE_CONFIG_DIR`) **浏览器中的工作**. 选择一个总是这样做的——内脏注射,
记录阅读器、用字行和取账器都是`src/core`- 但是,我们...
*生命周期*焊接到`ipcMain`,所以只使用浏览器的部署可以选择它没有的账户
创建与当地合作的方式(第313期).

- ** 生命周期为核心。 **`src/core/claude-accounts-service.ts`拥有五`claude-accounts:*`频道( 添加/ 等待日志 / 取消/ 等待/ 删除/ 链接) 并注册
通过平台的缝合,所以** 两种炮弹都为它们服务**:`src/main/claude-accounts.ts`现在是一个
薄的桌面包装器,以及`registerCoreHandlers`呼唤相同`registerClaudeAccountsIpc()`。 。 。
浏览器通过真实的`buildClaudeAccountsApi`在ws-bridge中代替
旧`E_UNSUPPORTED`树枝`waitLogin`直接通过投票 最多5次
分钟 — 安全, 因为 WS R 我们应该没有请求超时,并制定拒绝的请求
只当套接字掉落时。
- ** 账户钩安装在靴子和加件处。 ** 管理账户自带`settings.json`(Claude Code解决它相对于`CLAUDE_CONFIG_DIR`),因此,管理下的状态
钩子必须写在那里 或账户报告没有任何代理身份。`startServer`运行相同的每个账户循环 桌面在紧接着`installManagedAgentHooks()`,以及`add`安装到前面的新目录中。
- ** 画布技能仅限桌面。 ** 本版的Canvas控制完全没有线(canvas control)
钩状服务器答案`control unavailable`因此,服务将技能安装器视为
一个可选的解析器,服务器不通过任何数据——每个账户`SKILL.md`这里会指出
没什么
- ** 没有远程(SSH)账户。 ** 服务器版没有 SSH 项目管理器, 所以是一个账户
带有`projectId`选择 ** 本地** 路径—— 桌面的同样降解
在管理器存在之前。
- **"链接已有的配置 dir..."是SERVER上的一条路径. ** 处理器`stat`目录和
写入其中(账户)`settings.json`作为**服务器用户**,
用户可以到达的地方妇女参与政治和`~`在浏览器中键入的扩展到**server的**家,
不是浏览器用户的。 这个版本的每一个其它路径字段都遵循同样的规则
(文件夹拾取器浏览服务器 爸的磁盘),但这里值得大声说,因为
Dir一个人的连接通常是他们用手创造的,并且认为是"我的".

管理代码账户(S6)

服务器版 ** arms the Codex record-signing secret** 但 ** 不 ** 主机
账户管理 IPC – 该表面由桌面驱动于 SSH.

- ** 记录保密(决定1)。 ** 在靴子时`armServerNodeIdentity`(单位:千美元)`src/server/node-identity-arm.ts`)装入原始节点-原子秘密并呼叫`setCodexThreadIdentityAuthSecret(...)`用它,所以一个管理好的 Codex 账户的线 node 账户
所有权记录可以在无头主机上签名和验证**. 无头 Linux 没有OS 键链,所以
秘诀是32在确定字节时`node-auth-key.bin`模式`0600`同样的双壳通道
桌面封条通过`safeStorage`。当管理运行时间和发射装置可用时,无头
帆布控制发射路线通过`nodeterm-codex`并声称已签名的节点身份;
无法使用的能力仍然退化为空`codex`命令。
- ** 不主在履行账户管理动词。 **`initCodexAccounts`在Electron的IPC上注册`ipcMain`由WebContents-所有者授权,无头桥不提供,所以`startServer`从不叫它。 这是** not** 一个无声的空白:管理下的Codex登录**在一个SSH主机上**
由 **desktop ** 驱动通过 SSH(远程账户添加/设备登录/导入腿+
中继)——主机运行中继+导入,而不是它自己的账户IPC副本.
- ** 两种方式都关闭。 ** 没有秘密武装( 不可写入密钥文件) , 记录层会丢弃
而不是写任何没有签名的东西, 和Codex节点保持工作裸露。 一台有**no**管理的机器
帐号是S6前期布局的字节换字节(每条线的赤根记录).
- ** 只使用浏览器的部署无法管理 Codex 账户** - 案件问题# 313 是
有关。 管理** Claude**账户转入核心(上);Codex没有遵循,原因
不是努力:它的切换动词(`switchThread`页:1`commitSwitch`页:1`finishSwitch`页:1`rollbackSwitch`)由Electron **WebContents id**授权自有窗口,该窗口没有
是指在WS连接中,每个浏览器标签都是同样匿名的套接字。 托管
他们的无头需要先重新设计连接身份,而不是操作端口 我们还需要重新设计连接身份 在此之前`codexAccounts`名称空间保留为`E_UNSUPPORTED`桥和设置区头衔
而不是默默失败,
旋转器却一无所获

□ 手工浏览器 我真想看看

文 文 文 文 文 文 文 文 文 文 文 文 的城市 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 文 的 的 的 文               的    的 的        的   
只练习HTTP/自动表面)。 与`npm run server:dev`运行中:

1. **Setup/登录**——开放`http://127.0.0.1:8443`。在第一次运行中,你被引导到`/setup`(或使用打印设置 URL);选择密码. 等会儿你就会降落
打开`/login`; 签入.
2. ** 增加一个终点站** -- -- 点击码头`+`并添加终端节点。 它应该产下一个
贝壳显示提示 。
3. ** 任期I/O**——类型`echo hi`并确认`hi`指纹。
4. ** 回复** — 拖动节点的调整手柄;终端应重新配置(连/排)
最新消息),不涂鸦.
5. ** 重新编写页**——重新装入。 终点站必须**温和重排** 至其tmux
会话并重新绘制其当前内容(运行过程存活)。
6. ** 重新启动服务器**-停止`node out/server/main.cjs`重新装入
页面。 同样的温暖重排: tmux 服务器超过应用程序,所以状态完好无损.
7. **Lockout**——签署(或开新会话),输入错误密码5次;
第6次尝试应该以~60s的"太多尝试"封禁而被拒绝.
8. ** 打开一个文件夹(第3阶段)** — 使用“打开文件夹......”; ** 正在应用的服务器目录
picker ** 出现( 没有本地对话框) 。 导航到服务器上的 git repo 并选择
它; 项目打开它`cwd`。 。 。
9. ** 编辑并保存文件(第3a阶段)** – 打开文件(爆炸器或拾取器)进入编辑器
节点,进行编辑,按QQS;脏点清空,更改在磁盘上着陆.
10. ** 源控制(第3a阶段)** ——打开源控制面板;您的编辑显示为
页:1 点击它看**diff**,**state**它(+),键入一条消息,以及
** 承诺**;文件未列出更改清单,承诺见最近的承诺。
什么是第3b阶段) ** ——打开**Claude**终端节点,运行一个提示;页眉
应显示工作时的脉冲**RUNNING**徽章(带有未读点)
如果制表符是无重点的)完成时.
12. ** 试剂卡(第3b阶段)**——从克劳德节点发出一个发出一个
亚剂(例如a)`/task`); 麻黄片** 洗涤剂卡** 似乎与
父节点; 单击它来观看其实时记录流。
13. ** Context meter(第3b阶段)**——作为克劳德会议积累的笔录,节点的
** 文字 -- -- 温道测量器应填充。
