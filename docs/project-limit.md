> English: [docs/en/project-limit.md](./en/project-limit.md)

# 自由级开放项目限制

免费桌面安装可同时保留数量有限的项目**打开**;Pro是无限的;
安装在开关开关前就已存在的设备,保留它们已经工作过的号码。 客户
整个机制** 关闭** 服务器打开:直到服务器设置
截断,没有开放路径的行为与该特性存在之前不同.

设计记录和实施计划保存在本储存库之外;本页为
引用中,并列出每一条规则,即贡献者或释放需要。

代码 :`src/shared/project-limit.ts`(伯爵,决定,最后期限),`src/core/project-limit.ts`(挂帐、津贴、索赔),`src/core/license.ts`(小时主播,Pro for the
限制,DO NOT TRACK同意),`src/core/machine-id.ts`+ 键`src/core/project-allowance-token.ts`(机器散列和离线代币检查)肇事`src/core/check.ts`(服务器打开/关闭回答),`src/renderer/lib/projectLimitGate.ts`(大门)`src/renderer/state/projectLimit.ts`+ 键`src/renderer/components/ProjectLimitDialog.tsx`(限时). 服务器:节点服务器`/v1/check`, (中文).`POST /v1/limits/claim`和管理员控制台的**项目限制**卡。

□ 定义

- ** 开放项目**:在工作空间中的一个项目不是`closed`而不是中继标签
(单位:千美元)`project.remote`) SSH 项目、无 cwd 画布和无法使用的占位符数——每个占位符都是
用户屏幕上的标签。 已关闭的项目("最近关闭")和中继标签从不计数.
** 一个定义**:`countOpenProjects`(单位:千美元)`src/shared/project-limit.ts`)),并在核心中`WorkspaceStore.openProjectCount`(工作空间指数从不持有中继标签). 开放式项目
报告(A版)和大门都使用。
- ** 开放项目**:任何使项目未开放的项目——新项目,开放
文件夹... (包括采用已有的`.nodeterm/project.json`并重新使用 * 关闭* 项目
用于该文件夹的SSH这本书对话框(包括重用一个已关闭的SSH项目),从
最近关闭 / 欢迎屏幕 / QQK / 会话侧栏 / QQT / 通知或链接
进入一个关闭的项目,以及代理`open-project`动词. 激活一个已启动的项目
打开不是打开的。 创建继电器或团队标签永远不会打开 。
- **Cutoff**:一个服务器侧时间戳。 两者都是遗留线(开放项目最大a
设备报告 * 之前是它爷爷的) 和开关时刻。
- **Allowance**:非Pro安装的开放项目可能有多少个。 服务器计算一次
每个时代,在安装的第一个索赔, 并把它签入一个备抵符:
- Pro(有效权利):无限制——由客户决定,不索赔。
- 设备先见(由`/v1/check`在停产前,报告最长:`max(FREE, min(maximum, CAP))`。 。 。
- 截断前首次看到从未报告过设备的装置(遥测,或旧的建筑):`max(FREE, min(firstLaunchOpenCount, CAP))`第一次发射时的计数
有限容量构建(没有发送计数为0,即FREE).
- 设备在截断时或之后首次看到,或服务器所不知道(从未到达检查)
free.com. [永久失效連結] 页面存档备份,存于互联网档案馆 没有数据是最严格的答案。
- **FREE / CAP / 划时代**:服务器值(admin卡). FREE是新安装的备抵。
客户端编译`PROJECT_LIMIT_DEFAULT_FREE`仅在服务器作出不同表示之前); CAP
将客户报告的遗产计数设上限;每个发放的津贴都划到一个时代。
复说com言. 初始值:FREE 5,CAP 50,epoc 1,截断未定.

□ 休眠无常

虽然`active`错误的,每条开放的路径 行为都和它之前一样, ** 包括
保持同步 。 禁止网络呼叫, 禁止模式, 禁止使用 。
大门 如何维持,逐层保持:

- 怎么样?`gateProjectOpen()`返回文字`true`在同一勾选时`decideOpen`允许( 无)
保证,没有微任务),不活动状态总是允许的. 每个打电话者都会写`if (g !== true && !(await g)) return`因此,休眠的开放永远不会等待。
- 科雷尔的`claim()`在限量关闭时,无论谁打电话
它会回答`disabled`页:1`consent_required`当许可证网络门拒绝先,`{ ok: true, state }`否则。
- 机器代号只通过索要来读取,或者在已存有代号时,以催收方式读取。
安装限制从未被打开 没有符号,所以它从来没有读过它。
通过检查种子关闭 关闭它 保留它的标志, 仍然读在靴子。
- 唯一一个休眠装置的要求是`/v1/check`已经打过了 核心项目
工作空间载荷确定后读取(`initProjectLimit`因为`ready`每6小时,
通过相同的5分钟缓存和相同的构建 / DO NOT TRACK 守护. 那靴子读不出来
空闲: 当需要开放项目计数( 遥测) 但未知时, 获得回复 。
索引加载,坤格与更新卡首次读取时可运行 – 不
支持一个后读可以方面所携带的计数符;读取 retraches并替换缓存.
因此,一个靴子可以花费一个额外的请求,一旦索引是
而不是只装入 6 h 勾选上( 会话比它短 )
) (英语). 核心记录一次第一次发射计数(上文的更新日期较晚,按设计);`project-limit.json`仅当服务器单词更改存储状态时才会写入,而不是
每个支票。
- 经纪人`open-project`动词在限制关闭时也同步询问; 无头开始 还原
关闭项目中的节点与以前完全相同。

# # 怎样 #`active`正在计算

核心项目(`src/core/project-limit.ts`, (中文).`isActive`:

```
active = packaged build AND allowance key configured
         AND (latched OR (anchor >= PROJECT_LIMIT_DEADLINE_MS AND NOT a server "off" in the last 24 h))
```

- 仅装箱。 **`npm run dev`建筑从不活动,无论有无`NODETERM_API_BASE`。 。 ئارب 。
服务器版从不运行此模块(见三面体).
- ** 只使用备用钥匙。 ** 一个建筑`PROJECT_ALLOWANCE_PUBLIC_KEY`这是`''`(已发运)
在拥有者步骤 O1 从未活动之前, 无论服务器或最后期限上说: 它可以验证
没有备抵,因此,每笔索偿都将失败,每次安装,包括遗留的,都将举行
在自由号。 相反,它是无限的,完全像在限额存在之前的建筑(没有要求,
没有对话框,没有读取机器).
- 锁链是服务器的词 有两个答案: 支票答录`limits: { projects: { free, epoch } }`(储存FREE和时代)和一项成功的主张(a)`200`他的鉴证是真实的,它保存了自由、时代和迹象。 完全由两个人清除
答复:成功的、* 检查形状* 答复(a)`messages`阵列和一个`update`对象)
** 无**`limits`,或要求答复`409 not_active`(也删去了符号). 页:1
无法检查或声称, 一个非-2xx, 一个 HTML 绑定的门户, 一个 JSON 页面, 这不是一个检查回复,
或缺陷`limits`没有答案,也改变不了任何东西——无法到达永远不要改变
限制关闭。 锁链比最后期限要慢,所以一个锁链的安装 其检查种子不会运行
(DO NOT TRACK开始执行,`NODETERM_TELEMETRY_DISABLED`——因此,
大门再次按其已知的备抵(限时,项目5)。
- ** 嵌入式最后期限**(`PROJECT_LIMIT_DEADLINE_MS`) 覆盖一个从未运行过支票的客户端
(DOT TR卡羅克,),"DOOT" ,"`NODETERM_TELEMETRY_DISABLED`,一个被封锁的主机). 过它客户端处理极限
(a) 在实际操作中仅指“在FREE以外开启索赔”;`not_active`回复
24h(下一个子弹)再次关闭,然后下一个限制时刻再次声称。 这个
比较**小时锚**(`clockAnchorMs`:墙钟和
最近这个安装已观察到),所以向后滚动的时钟不会解除它.
- ** 服务器“关闭”**(`offAt`(b) 规定:`OFF_TRUST_MS`(24小时); 保持
回答时不断刷新
- 更改被推到机器的窗口(`projectLimit:changed`在每一个服务器单词之后
在6小时的勾选时间 单独的时间变化( 最后期限过后, "关闭" 将停滞, Pro's
因此,一个长期运行的应用程序不会在最后期限之前保持休眠与否。

其余诸州(.`ProjectLimitState`:

- 怎么样?`free`: FREE 作为服务器上次发送, 否则是编译的默认值.
- 怎么样?`allowance`: 从存储的代号中, 在每个读数** 下校验 ** — 签名( 单独的)
备抵键,嘞`typ`设备、时代和机器散列 该机器只根据
从“成功”的操作系统读取散列;而还没有人知道(在启动时读取,或者操作系统读取)
失败, 并且只有主机名倒置存在) 在所有文件上暂时信任符号
别的 宣布不同日期的检查会删除符号; 下一张在限制下打开
再次索赔。
- 怎么样?`pro`编号 :`proForProjectLimit()`. . . . . .`isPremium()`,或到期的权益符号小于
30天前,被钟点锚,没有2xx`active:false`从服务器开始。 这个恩典是用来
限制; 没有其它 Pro 特性看到它。
- ⊿岿`dnt`: DO NOT TRACK / (韩语).`NODETERM_TELEMETRY_DISABLED`——索赔(和购买)需要
先征得用户同意。

一个打开,然后由`decideOpen(state, openCount)`: 关闭或 pro − 允许; 打开次数少于`effectiveLimit`(单位:千美元)`max(allowance ?? free, free)`——老津贴从未削弱提高的FREE).
· 允许;在限额内,尚未给予津贴;
上面是可以达到的(Pro liff):新的开放被封锁,**没有关闭**. i 低于
门转一`block`说明一. . . . . . . . . . .`decideOpen`它本身并不知道这一点。

# 大门坐在哪里 #

一个人打开项目的每一条路`gateProjectOpen`(单位:千美元)`src/renderer/lib/projectLimitGate.ts`在五个Canvas呼叫站点:`addProject`, (中文).`openOrAdoptFolder`, (中文).`createSshProject`, (中文).`onRepoCloned`, (中文).`reopenProject`规则:

```ts
const g = opensProject(useProjects.getState().projects, action) ? gateProjectOpen() : true
if (g !== true && !(await g)) return
```

- 门是** 最后一个等待** 在同步商店变异之前, 所以没有什么可以改变
数到决定和写。
- 这是** 滑动** 当`opensProject(...)`(单位:千美元)`src/renderer/lib/projectOpens.ts`)说动作
打开无(文件夹或 SSH 主机已经是一个打开的工程) 。 上面的每个店都用
动作本身的匹配器,所以预测不能从动作的作用中漂移.
- 怎么样?`reopenProject`当`g === true`。 。 。`reopenProjectUnchecked`(单位:千美元)
共享到团队撤销: 工程在前一刻开放) 保留 。
- ** 中继制和团队制表从不设门**(`addRelayTab`, (中文).`hostedTeamTabs`, (中文).`relay-tab.ts`),以及
从不计数。
-** 代理人`open-project`动词**通过`checkAgentProjectOpen`(在文件夹之前)
探测器)和`finishAgentProjectOpen`(最后决定和`registerProject`以一分之一计。 页:1
拒绝是简单的句子“ 免费计划: N 工程的 N 已打开; 用户提供技术支持
选项——不重试,用户最多每分钟一次看到对话框。 这个
指导会载着拒绝:代理式动词帮助(`buildCanvasSkillBody`页:1`buildCanvasControlInstructions`)没有说关于限制,所以没有关于它印刷给
它关闭时的代理人,以及拒绝(只在关闭时才存在进行的调查)是其文件
(代理文本同步规则由结果文本本身满足). 一个节点的无头开始
限量关闭项目开始会话,但不会解开项目(现有
"从欢迎屏重新打开"回复).
- 新的开工方式必须叫大门`src/renderer/canvas/project-limit-opens.source.test.ts`咩 系五个呼叫站点

** 绝不强迫。 ** 大门只回答一个新开的门能否继续。 没有关闭,
删除或解析工程、节点或 tmux 会话,因为限制——不是限制,
不在其上边。

□ 限制的时刻

1. 尚没有代号——索赔。 "检查你的免费津贴..."小组只有在索赔是
300米后仍在飞行中 如果索要的津贴允许营业,则没有
对话框 。
2. 仍然处于极限 – 对话框:"N自由项目的N是开放的",每个开放的项目与
** 关闭** (`closeProject`,无损),**取消**和**无限制的Pro——10/mo**.
关闭后,或者一旦Pro通过许可证广播到达,等待开放的收益.
3. 失败的索赔(离线、服务器错误) – 与“ Couldn't check your free
(c) 关闭和Pro仍在工作。 页:1`machine_mismatch`说津贴是捆绑的
到另一个计算机,当服务器给出一个时,它可以移动的日期。
4. DO NOT TRACK 未经同意 ——"需要联系"先行. 同意为:`settings.licenseNetworkConsent`,仅在设置 DNT 时显示和可撤销 。
它只涵盖许可证和索赔电话——从不遥测或
检查种子。
5. DO NOT TR薛克(或`NODETERM_TELEMETRY_DISABLED`(a) 一项已知的**津贴   
对话框( E)`reclaimsAtBlock`在门内),每打开一次,有相同的300毫秒面板. 这样安装
听到没有检查种子,所以这个要求是唯一的撤销方式(`not_active`),一个划时代的凸起或
升起的FREE到达它。`not_active`(成为一种较大的备抵) ——未对话的未结收益;
(b) 同一备抵——在一项索赔之后,第2项的对话框;
到达服务器 —— 也可以是项 2 的对话框,而不是“ 无法检查 ”一些具体选项 。
与第一项索赔完全相同所需经费估计数。 其他装置都是
不变: 以已知的允许值显示对话框而不要求 。 代理检查重新索赔
相同方式,但绝不征求同意(`consent_required`拒绝。

虽然限制在上,但Pro比较(Settings)头部是核心"Core——自由"(不是"永远自由").
加上“上到 N 打开的项目”,在 Pro 下列出“ 无限打开的项目”, 升级对话框也添加了
"无限开放项目". 不活跃,都读得和以前一样。

□ 数据

- 怎么样?`<userData>/project-limit.json`编号 :`latched`, (中文).`offAt`, (中文).`free`, (中文).`epoch`, (中文).`token`, (中文).`firstLaunchOpenCount`(首次启动有限能力建设时的开放式项目计数——
)). 写入`writeFileAtomic`; 每一个错误的字段都投放到其上
自己和一个坏文件读作空 。
- 怎么样?`/v1/check`(每一个安装,除非DO NOT TRACK /`NODETERM_TELEMETRY_DISABLED`/ 无包装
新建,不用`NODETERM_API_BASE`:`deviceId, version, os, arch, channel, plan`,并仅**
在设置时 ~ 隐私 ~ 遥测 **`openProjects=<n>`数字、名字、路径或
师曰. 服务器保存每个设备的最大值(直到截断).
- 怎么样?`POST /v1/limits/claim`(仅在限时,仅在活动时):`{ deviceId, machine, firstLaunchOpenCount }`。 。 。`machine`= 小写十六进制 SHA-256 =`'nodeterm-project-allowance-v1:' + rawMachineId.trim().toLowerCase()`(重大`IOPlatformUUID`, (中文).
链接`/etc/machine-id`,则`/var/lib/dbus/machine-id`窗口`MachineGuid`; 在两个失败失败后
OS读到,`host:<hostname>`) (中文(简体) ). 原始编号
从不离开`machine-id.ts`答复:`200 { token, free, epoch }`, (中文).`409 not_active`, (中文).`409 machine_mismatch`+ 键`retryAfter`(九秒钟),`429`(每个地址每分钟10次——可重试,
从来没有最终。 8 s 之后的 HTTP 请求时间( 包括身体) ; 读取机器 ID
当OS工具挂起时(两个 5 s  你在干什么),它可以加起来再加到~10 s. 索赔从未
拒绝。
- 津贴代号:`base64url(payloadJSON).base64url(ed25519sig)`有效载荷`{ typ: 'project-allowance', deviceId, machine, allowance, epoch, iat }`,无过期,与`PROJECT_ALLOWANCE_PRIVATE_KEY`——自有钥匙,从无权利钥匙(发包客户做).
不检查`typ`在一个权利符号上,所以一个签了钥匙的人会读作Pro.

□ 三个表面

- 楠竺顶**:上面的一切.
- ** 公务员版**:没有大门,没有索赔。 桥根接住了`INACTIVE_PROJECT_LIMIT`和
索赔`disabled`· ;`src/server`从不打电话`initProjectLimit`。运行服务器版可避免
限制所体现的缺陷(见下文),即被接受的缺陷。
- **Mobile**:N/A——电话没有打开桌面项目。将成为用户的电话。 中继标签不包含在计数中,`projectLimit:*`只有主机: 中继端口既不能调用也不能接收`projectLimit:changed`(核心只发给这台机器的窗户,从未通过)`platform().broadcast`) (中文(简体) ).
- **Kanban**:N/A——董事会在项目内创建节点,从不进行项目.

□ 发布清单

1. ** 翻转前的每个释放`PROJECT_LIMIT_DEADLINE_MS`页:1`src/shared/project-limit.ts`页:1
到日期 经过计划翻转。 在翻转门 DO NOT TRACK 用户之前通过的期限
在别人面前
2. **翻页**:将最后期限设定为翻页日期和`PROJECT_LIMIT_DEADLINE_FROZEN = true`时,
与翻转相伴的释放,或者第一个。 从那时起,最后期限是
翻转约会好。
-   Free zing  switches  switches 如果释放冻结
截止时间和翻转会滑过该日期, 每一个安装的检查种子都这样做
未运行( DO  NOT  TRACK,`NODETERM_TELEMETRY_DISABLED`被封锁的宿主 被冻结
当服务器仍然回答“ 不活动” 时: 如果同意它声称在 FREE , 则关闭
24小时,并在此后的下一个限制时刻再次索赔;未经同意,它坐落于FREE
同意对话背后。 恢复是设定`FROZEN = false`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}然后撞倒
期限通过新计划——在冻结日期通过前运送.
- 冻结在第一次发布 * 之后 * 翻转消除危险。 成本:DO NOT TRACK
安装在释放之前 直到释放的最后期限结束
3. **翻版发布需要所有者步骤O1**:在同时拒绝冻结发布。`PROJECT_ALLOWANCE_PUBLIC_KEY`空的(见O1——并在此之前及早完成)。
4. ** 撤销后**,解除冻结:释放`FROZEN = false`和新计划的最后日期
(见下文) 没有它,过去的最后期限 重新武装每个 DO NOT TRACK /`NODETERM_TELEMETRY_DISABLED`每架后安装24小时`not_active`即便有了它,一个"紧凑的"
(它持有先前索赔的标志) 只在下一个限制时刻关闭,通过
重新要求,一个未经同意的人在同意之前一直守在门前——锁在门外的比在门外的要高。
截止日期。
5. 保持两个常数的字面单行形式 --`export const PROJECT_LIMIT_DEADLINE_MS = Date.parse('<ISO instant>')`和`export const PROJECT_LIMIT_DEADLINE_FROZEN = true | false`因为警卫会读源头
6. ** 电离引信是带有翻转准备释放物的船舶,而不是以前。 **`package.json`携带
无`build.electronFuses`当极限处于休眠状态时:引信是改变使用者的唯一办法。
休眠释放可能注意到(未确定)`NODE_EXTRA_CA_CERTS`页:1 店主过后
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""另外一些""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""在某种程度上""""""""`build.electronFuses`确切地说`scripts/electron-fuses.json`——由两者共同解读的一个定义.`src/main/electron-fuses.test.ts`(裁决记录;它接受缺席或确切的反对)
并拒绝释放的警卫`build.electronFuses`缺席或不同
从它。 未检查解冻释放 。

** 警卫**:`scripts/check-project-limit-deadline.mjs`是每个建筑中运行的第一步
任务`.github/workflows/release.yml`. . .  决议草案`release-mac`,(实质内容)`release-linux`和`release-win`-对
退职和设置节点后, 在`npm ci`(平顶节点). 当期限缩短时退出1
超过30天后没有被冻结,或者当它不能读取常数时; 对于一个** f也已冻结** (flip)
也释放当`PROJECT_ALLOWANCE_PUBLIC_KEY`(单位:千美元)`src/core/project-allowance-key.ts`空无一物,
无法读取,不是Ed25519公用钥匙PEM,或私人钥匙,以及何时`package.json`因为`build.electronFuses`并不是说`scripts/electron-fuses.json`(项目6) 解冻释放
永远不要看钥匙或保险丝。 这三项工作
并行, 并且每个都在其第一次上传时创建发布, 因此一个被拒绝的标签在之前都失败了 。
任何东西都是建造或上传的:没有释放,甚至没有预先释放,以及`publish`从不跑 弹跳
,然后将标记移动到该承诺(或标记下一个版本)并重新运行。`scripts/check-project-limit-deadline.test.ts`将警卫的读数 转到编译的常数,
因此,改变字面形式在公关上失败, 而不是在发布日,
三个工作。 它从来不保护一个冻结的最后期限——这就是第2项的危险。

□ 在限额可以运货之前所有者的决定

O1: 备用钥匙配对

`PROJECT_ALLOWANCE_PUBLIC_KEY`输入`src/core/project-allowance-key.ts`作为`''`直到拥有 67.
生成密钥对 :

```sh
openssl genpkey -algorithm ed25519 -out allowance.pem && openssl pkey -in allowance.pem -pubout
```

私钥仅** ** 输入到服务器的 Dokploy env 作为`PROJECT_ALLOWANCE_PRIVATE_KEY`; 数据
公开部分(SPKI PEM)`project-allowance-key.ts`。删除本地`.pem`后来。

执行的是什么:

- **翻转版。 ** 释放警卫拒绝冻结释放 而钥匙是`''`(无法读取,不是Ed25519公用钥匙PEM,或私人钥匙):"PROJECT ALLOWANCE PUBLIC KEY是
空 — 粘贴 Project  Allowance  PRIVATE  KEY 的公用部分
翻页发布前的src/core/project-alowance-key.ts(docs/project-limit.md,O1))".
- **单元测试**(`src/core/project-allowance-token.test.ts`)完全接受`''`或一个
Ed25519 与`ENTITLEMENT_PUBLIC_KEY`而且不是私人钥匙 所以
半贴或错误的密钥会在粘贴它的公关上红掉. 绿色的`main`不管怎么样。
-**在服务器上**,没有私钥`POST /v1/limits/claim`答复每件索赔`409 { error: 'not_active' }`和`/v1/check`从不发送`limits`无论截断结果如何 所以
客户端听到 要么关闭限制。

** 运入的建筑物`''`从来没有活动** ——它保持无限,就像从前的建筑
限制(见如何限制)`active`将计算,即使在翻转之后。 因此,在O1之前的每次发布都会增加
安装限制直到更新(已接受的空白)。 警卫执行
键只在翻页发布时,因为拒绝 O1 之前的每个发布都会阻断无关
发布;早做O1是主人的呼叫.

NODE EXTRA CA CERTS / NODE OPTIONS(保险丝之前的所有人电话)

引信带有翻转准备释放(释放清单,项目6),因此本决定
(b) 在未向受害者提供引信的B单元之前提交。

硬化引信`enableNodeOptionsEnvironmentVariable: false`(单位:千美元)`scripts/electron-fuses.json`, (中文).
设置为`package.json` `build.electronFuses`从翻转准备发布开始)使Electron
** 未确定**`NODE_OPTIONS`** ** 和**`NODE_EXTRA_CA_CERTS`在进程启动时, 在 GUI 和 RunAsNode 模式相同( 在电子上测量)
联合国 后果:

- 每一个子孙都会失去双胞胎:能够得到Tmux服务器从下一个开始,
终端(Claude、Gemini、Opencode、副驾驶)中以节点为基础的CLI代理;承诺信息代理;
在 Windows 上,会话主机和它下面的每个 ConPTY shell 。
- 主进程HTTPS是节点`fetch`,所以一个CA只分别在`NODE_EXTRA_CA_CERTS`不见了
许可证、检查、项目限制索赔、遥测、模型门道发现、当地使用情况
阅读器、git服务、配对和中继主机。 隐藏在 TLS 干扰代理的后面, 即: 粘住
在FREE, 每一个索赔"不能检查", Pro不刷新。
- ** 受影响的**:用户界面界面的启动环境带有这些变量(macOS)的用户`launchctl setenv`/ MDM, Windows 用户或系统环境变量, Linux`environment.d`或`/etc/environment`** 未受影响**:在 shell rc 中导出它们的用户(每个交互)
贝壳重新应用它们). 任何证据都无法证明今天有人依赖它
- ** 引信为何保留**:没有引信`NODE_OPTIONS=--require …`在
主要过程(针对未安装的控件)——在macOS和
视窗 正中方向 Windows.

在 " 翻转准备 " 的 " 释放 " 舰之前的选项:

- **(a)** 载有成本的船舶,并在释放说明中注明。
- **(b)** 首先建立儿童再供应:读取登录壳探测器的值`src/core/exec-path.ts`已经运行,`launchctl getenv`,窗口注册,或`/proc/self/environ`然后把他们传入会场和会场。
- **(c)** 仅放弃可选节点引信(并接受绕线)。

决定权在enes的。 下面的设备检查10 收集证据。

□ 翻转和撤消运行本(所有者步骤,第6部分)

- **O0——在隐私复制船之前:**决定遥测默认. 应用船`telemetryEnabled: true`;网站默认取消. 站点更改或应用程序默认
更改(单独的PR)。 A版的计数跟随切换,所以这也决定了有多少
安装得到一个快照。
-**O1——在翻转时可能仍在使用的下一份发行前**(翻转发行本身是
拒绝,则密钥对(上)。
- **O2——A版:**合并并部署服务器快照记录,合并隐私副本,然后
释放桌面报告。 让它运行1–2周;读取管理员卡的p50 / p90 / p99并设定
CAP QQ p99(并重新审视FREE).
- **O3——B版:**已部署确认服务器#18(`/v1/license/status`当键源是时回答 502
下- 否则键源退出会让付费用户降低到极限 ; 合并并部署服务器
索赔`PROJECT_ALLOWANCE_PRIVATE_KEY`设定 ** 且截断点仍然未定**; 释放此
客户端——使用O1公用密钥粘贴,或者其安装即使在翻转后仍然无限.
在翻转前的每次释放`PROJECT_LIMIT_DEADLINE_MS`(发布工作流程)
以其他方式摈弃)。
- **而不仅仅是在 NODE EXTRA CA CERTS 决定和装置之后,在 O4:** 之前的释放
运行 1, 设置`package.json` `build.electronFuses`确切的说`scripts/electron-fuses.json`(释放清单,项目6)。 没有他们,翻版就被拒绝了
- **O4——翻转日:**
1. 在翻转(或之后的第一个——必须携带引信)的同时释放时,
设定`PROJECT_LIMIT_DEADLINE_FROZEN = true`和翻转日期的截止日期。 如果翻转滑过
运出的释放已经冻结了 没有什么能警告你: 运送设定的释放`FROZEN = false`并且在该日期之前超过最后期限(释放清单,项目2)。
2. 在 我有管理控制台的工程限制卡(ISO即时加减)中设定截断值.
3. 节点网的同一天:增加一个**Plans**部分(网站今天没有定价页)-案中,
核心 :`Up to 5 open projects (existing installs keep their current count)`页:1`$10/mo`铭文:
无限开放项目,直播链接,3个团队席位,更大的拼写模型,节点移动
Pro-和换行“自由计划:5个开放项目;现有安装保持其当前状态
计数。 没有横幅、电子邮件或申请通知
4. 增加隐私页面,故意推迟到翻页:
- (a) 存储的开放项目最大值为**也用于计算现有安装的
免费项目津贴**——在计算任何津贴之前加上。
- (b) 使用的最大值是**在截止日期前报告的**。
(c) 机器散列:当一个安装达到自由项目限值并要求其安装时:
备抵,节点发送计算机硬件代号的单向咸散列(macOS)`IOPlatformUUID`时, Linux`/etc/machine-id`或`/var/lib/dbus/machine-id`窗口`MachineGuid`)用其匿名安装代号,所以津贴保留在一台电脑上. 这个
原始 id 从未离开机器; 从未达到极限的安装 从未发送它 。
- (d) 删除每安装一次的检查记录也删除祖父的依据
津贴。
- DO NOT TRACK同意:根据DO NOT TRACK的规定,在用户使用前不发送任何许可证
允许在限制对话框或设置中 ~ 隐私 ; 同意包含许可证和
只能进行津贴检查,从不进行遥测或检查种子,并且可以在那里取消。
-**Undo**——每个安装都做什么,随着代码的行为:
1.清理管理卡中的截断. 从此`/v1/check`发送无`limits`和每项索赔
答题`not_active`。 。 。
2. ** 装有工作检查输入器的安装** 关闭下一次成功检查的限值(在
在支票不断到来的同时, 每个人将24小时的"关闭"续订。
翻转后 冻结的最后期限已经过去 所以一个24小时的装置
(offline, a blocked host) 恢复,直到再次检查或要求答案. 到了极限
使用其储存的备忘符号离线(通过检查种子保存),没有一个,
其索赔建议将它扣在FREE“Couldn't check”之后。
3. **DO NOT TRACK经同意安装**(没有检查饲料;`NODETERM_TELEMETRY_DISABLED`行为
如DO NOT TR与否,
门牌(按其先前的索赔额)
第5项,限制时间),因为这一主张是无法消除的唯一办法。`not_active`清空锁链和标志 关闭它24小时, 然后过去的最后期限 重新武装
这个 因此,每次有人在最后一次索赔之后到达FREE超过24小时时,就再次声称:
离线时,该索赔失败,它被保存在FREE后面的"Couldn't check". 直到索赔获得
通过,一个有纪念物的留 在其允许(离线重新索回那里只是显示极限)
对话).
4. **DO NOT TRACK未经同意的安装** 从未声称(许可证网络门以前拒绝)
任何请求:在限制下,他们看到同意对话框,并一直守门直到用户同意——
在FREE, 或以他们仍然持有的标志(在取消同意之前注销的,或
由DO NOT TRACK设定前的检查种子). 同意那里的权利主张,然后逆向
和3号一样
5. ** 因此,完全取消还船释放**`PROJECT_LIMIT_DEADLINE_FROZEN = false`页:1
最后期限超过了新的计划;从那时起,警卫再次适用。 在上面,一个安装
即刻关闭。 已安装的 DO  NOT  TRACK 安装不是 —— 锁定比
截止时间——直至下一个截止时间:经同意重新提出索赔的答复`not_active`和这个
永远关闭;未经同意,将一直关闭直至用户同意(4)。 这样做的安装
不更新行为 。
6. 没有任何东西是关闭的,因此没有任何东西可以恢复。 要在新的截断时重飞,** 跳动
被拒绝的反对,即被拒绝的反对,即被拒绝的反对,即被拒绝的反对的反对,即被拒绝的反对的反对的反对的反对的反对的反对的反对的拒绝的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的拒绝的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的拒绝的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对全面参与的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的拒绝的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的反对的得的反对的反对的反对的反对的反对的反对的反对的反对
截断重算.

□ 接受差距(按设计,在建筑时发现)

1. 在B版发布前释放的积木永远无限制地存在——同样,在不使用
允许使用公用钥匙(在O1级前),但从未使用。
2. 服务器版无限制。
3. 手写`workspace.json`至未关闭的工程绕过大门; 从未被夹住 。 一样
类:手动编辑的未来`offAt`输入在内`project-limit.json`压制期限。
4. 补丁式建筑(易于Linux-Electron在Linux-Electron上没有灰烬完整性)
macOS/Windows 一旦引信飞船;在翻转准备释放之前,任何地方都很容易。 之后
许可证变更(# 1317) 这是违反生产许可证, 不是代码
预防
5. 两项遗留的点数均由客户报告并在联合呼吁程序中封顶;封顶限制截止日期前报告的内容
可以说是
6. 重新约束留下一个遗产`device-id`缓慢共享: 每一个重新组合的机器都保留符号
它已经储存了,所以N机器需要N×30天.
7. 28. 被取消的Pro用户如果屏蔽API,最多可保持30天的无限开放。
8. OS 机器ID读取失败时发送的声称两次将服务器行绑定到**hostname**
散货 接下来正常的发布会读取OS ID 就是信物停止匹配 重新请求可能
击中`machine_mismatch`30天重置窗口内部(用户在此之前坐在FREE).
9. 划时代的凸起重置重置重置时钟:每凸起一次额外的即时机器移动.
10. 键盘 Pro 安装键盘,服务器拒绝为标记 TTL + 30 日保持限制
(键盘刷新从未看到 2xx)`active:false`) (中文(简体) ).

不是空格: 屏蔽 api. nodeterm.dev 在最后期限后在 FREE 留下一个安装; 重置`device-id`让它在FREE新安装。

用户可能注意到的在特定边缘(行为而非绕行):

- 在声明或对话框在飞行中时按下第二个打开键(再次按下) 。
- 在DO NOT TRACK下,已知津贴的限时在对话前等待一项申请
("检查..."面板在300毫秒后; 离线时最多8秒请求超时, 加最多
~10 s 机器代号在OS工具悬挂时读取).
- 当对话被代理商拒绝提起时,“关闭”会腾出空间,但什么也没打开——代理商
已被告知不;再问一次。
- 在极限,一个特工在封闭项目中无头开始一个节点运行而不带来
工程的标签 。

□ 设备核对表

运行在 ** packed ** 建筑上(dev 建筑从不活动). 服务器运行时,请使用`NODETERM_API_BASE=<staging URL>`在其讲述仍在进行中(从一个终端开始二 上帝)`<app>/Contents/MacOS/nodeterm`没有`open`,它会降低环境。 建筑必须携带
允许公钥——没有公钥就永远不会运行,服务器运行时显示什么也没有——和
正在装配服务器必须持有其私密的一半: 每一份声明的令牌都失败了 。
并读作"不能检查你的免费津贴"。

** 运行 1 — 已包建,不需要服务器**

在翻转准备释放前没有释放引信,因此,运行 1 运行在包装测试中
建造的建筑物`build.electronFuses`完全设置到`scripts/electron-fuses.json`;结果
(与检查10's) 是什么释放等待。

1. macOS arm64和x64,签名:应用程序发射;`npx @electron/fuses read --app <path>`显示`EnableEmbeddedAsarIntegrityValidation`页:1`OnlyLoadAppFromAsar`启用, RunAsNode 启用,
节点选项和节点Cli检查已禁用;`Info.plist`携带则是`ElectronAsarIntegrity`。 。 。 。
终端打开( 无节点负载从`app.asar.unpacked`),拼写装填一个模型(智能-低音),
工程图标上传工程( sharp) 。
2. macOS 和 Windows: 有意修改`app.asar`拒绝启动; `NODE OPTIONS=- require'
(单位:千美元)` and `-- inspect' 被GUI应用程序忽略案中(仅针对Linux).
3. Windows (NSIS 构建): 开启 Asar 完整性; 打开终端( 节点- ptty), dictation 载入一个模型
(smart重点放在耳边)和工程图标上传工程(sharp)——全部三个负载来自`app.asar.unpacked`;会话主机开始——从舞台运行时间开始
(单位:千美元)`nodeterm-sessionhost-v2.exe`,其运行时间烟雾退出42)和从硬链倒退`nodeterm-session-host.exe`——一个终端在应用程序重启(RunAsNode)后幸存.
4. macOS 和 Windows: 代码串接守护进程 80.`/ping`(运行脚本的运行节点)
内部`app.asar`并附有完整性验证).
5. Linux:可执行文件为`dist/linux-unpacked/node-terminal`(无)`nodeterm`);引信改为:
匹配项目1(在 Linux 上不执行星体完整性)。
6. macOS:自动更新(Squirrel.Mac)安装一个引信,签名更新.
7. 实际捕获`ioreg -rd1 -c IOPlatformExpertDevice`(宏观OS)和`reg query HKLM\SOFTWARE\Microsoft\Cryptography /v MachineGuid`(窗口)输出和确认`parseIoregUuid`页:1`parseRegMachineGuid`将捕捉器粘上`src/core/machine-id.test.ts`以书面形式编写的样本,
没有被抓获。

** 运行 2 — 中转服务器, 限制仍在关闭( 未取消) **

8. Dormant: 9个项目开通,第10开通时服务器日志中没有请求,而是照常开通`/v1/check`(无主张).
9. DO NOT TRACK 在截止日期之后(一个具有过去的测试建构)`PROJECT_LIMIT_DEADLINE_MS`从来没有
:未经同意,限制时间显示为“需要连接”;同意后,索赔程序如下:
回复`not_active`,大门则清空(24小时;之后的下一个限制时间)
(见A/CN.9/WG.III/WP.1号文件)。
10. 公司CA(NODE EXTRA CA CERTS决定的证据):`NODE_EXTRA_CA_CERTS`通过`launchctl setenv`(macOS) / 一个用户环境变量( Windows) 和后置服务器
a CA只记录信托,记录中断情况:许可证状况、索赔、`/v1/check`和 a 俨然`claude`CLI在终端。

** 运行 3 — 中转服务器,翻转(截断套)**

11. 翻转:在 5 开  6 开  6 开  开  对话框; 关闭 1   等待打开
收益; 准备从对话框中检查 —— 它关闭并打开收益 。
12. 带有12个快照的遗留装置:在一次索赔之后,随着网络的关闭,该装置可打开多达12个。
13. DO NOT TRACK=1:限制时间要求同意;拒绝保留5;接受要求;隐私
行显示同意,并撤销它的工作。
14. 机器移动:将用户数据复制到第二台机器 – 其第一台索赔重组;第三台机器是
告诉津贴可以移动的日期。
15. 撤销:清除截断 —— 下一次检查将拆除大门。 同意的 DO NOT TRACK 客户端
宝贝 已经持有津贴证的(13件,仍 呃带)
打开一个要求,答案是`not_active`,且打开后没有对话框;
24小时,它再次在下一个限制时刻声称。 一个未经同意就留在同意后面
对话直到它同意为止。 重复两者`NODETERM_TELEMETRY_DISABLED=1`改为
DO NOT TRACK. (英语). 然后测试与`FROZEN = false`和未来的最后期限:不附带条件的
(a) 客户端立即明确;
或保留在同意对话框后面(无) 。
