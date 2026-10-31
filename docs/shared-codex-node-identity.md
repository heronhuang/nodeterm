> English: [docs/en/shared-codex-node-identity.md](./en/shared-codex-node-identity.md)

# 共享代码节点身份——账户范围所有者脊柱

一个 Codex 画布节点对 ** 1 共享`codex app-server`里面有一条线
节点-thread映射是存活下来的恢复,内板重启,以及app重启. S6 增加了
** 账户** 维度:同一机器可持有系统登录(`~/.codex`与几个
管理登录,而线程的所有权记录必须注明它所属的**账户**,而不仅仅是
这个节点——所以一个帐户永远不能用来代表另一个线程.

此文档涵盖整个 S6 特性 — 账户  你想看看吗 ?
切换和跨机协议,失败关闭属性,以及同一文件系统(U3) /
发现(U1)限制了探测器的定位。 S6通过9项公关运输(账户模型,
这里记录的身份代理, 推出原始, 中继守护进程, 本地账户 + 开关,
SSH 远程账户、 每个账户的使用、 设置 UI 和每个节点的账户拾取器; 此
功能是**完全可操作的**——一个编码节点带有一个账户范围,它带有拾取器的邮票,以及
切换/转移动词运行。 每层都是用真原始(真原始)进行测试的。`/bin/sh`真实的fs,
real HMAC, 真正的主侧开关处理器); 构成一旦端到端都走入`src/main/codex-accounts-e2e.test.ts`(任务9.2),以及无头CI的人力/设备核查
无法运行在 [接受门] (codex-counts- acception.md) 中列出。

基于@Corvin的S6设计在外部PR #112.

□帐户×机器模型

一个账户是**系统**或**管理**鹳,它生活在**一个机器上**:

- ** 系统账户** - 登录`$CODEX_HOME`(或`~/.codex`) (中文(简体) ). 没有身份证 总是决定。 一个机器
没有管理账户的行为与S6(约束12)之前完全相同。
- ** 管理账户**-第二个(或第三个.)登录的编码身份,由经核实的身份证处理。
其住宅为私人住宅(`0700`)和隔离;只有非秘密安装资产(`config.toml`, (中文).`AGENTS.md`, (中文).`skills`,......)与系统母体相连——永远不`auth.json`从不
线程 DB,所以一个管理账户只作为**its own các 登录。
- ** 远程账户**——相同,但其家庭生活在SSH主机上(`host`(编). 桌面驱动器
它的生命周期超过SSH;主机运行继电器+导入,而不是自己的账户管理IPC.

`id`任何呼叫站点的空/ 未定义表示系统账户 。 药片是从可手工编辑的
平方千兆`settings.json`页:1`project.json`,所以每个ID通过`isSafeAccountId`(单位:千美元)`^[A-Za-z0-9][A-Za-z0-9._-]*$`,必须开始字母数字)**在**成为路径组件之前。

□ 磁盘上的家庭布局

曰甚么处.
| | | |
系统之家`$CODEX_HOME`或`~/.codex`|
管理家庭(当地)`~/.nodeterm/cx/<sha256(userDataDir ␀ accountId)[0..16]>`模式`0700`|
管理家庭(远程)`<remoteHome>/.nodeterm/cx/<sha256(accountId)[0..16]>`|
QQ 应用服务器控制套接字QQ`<home>/app-server-control/app-server-control.sock`|
所有权记录`<userDataDir>/codex-thread-nodes/`(系统:赤根;管理:`<accountId>/`) (中文(简体) ).

文摘故意**短**:应用服务器控制 Unix 套接字在以下两个级别存在
在家,必须留在macOS下`SUN_LEN`,该电子用户Data路径已加UUID
过度射击。`userDataDir`折叠到 LOCAL 文摘中, 所以单独的节点配置文件永远不会
碰撞;远程主机有一个家根,所以远程消化结束`accountId`仅此而已。 页:1
移民前长期住房(`<userData>/codex-accounts/<id>`被移动到它的短 家在靴子,
失败关闭( 缺席时不开放, 如果目标存在, 或在无效的 ID 上) 。

□ 共享守护进程重新启动连续性

控制套接字不是每个帆布节点一个过程 。 每个`codex --remote unix://`TUI是一个
帐号范围可搭载一个持续应用服务器,所以一个应用服务器的升级、修理或崩溃将全部断开
他们立刻。 它们的 tmux 面板和 Codex 推出时完好无损,但没有客户端主管
每个窗帘都掉回壳里 看起来像是重置

祗生成的发射机因此拥有束缚线条寿命的远程客户端:

1. 它在发射TUI前记录了应用服务器控制套接字的inode.
2. 正常出口或终端信号返回不变。
3. 在任何其他出口之后,它只有在`codex app-server daemon version`不报告`status: running`,或者当已知的发射前套接字inode改变。 一个失败的 inode 单独读取是
未知的,不是重置的证明; 无关的 Codex 对同一代健康的一代的失败
返回其原始状态。
4. 它通过飞行前所用的同样洗涤器环境启动 我就恢复了
精确的线程 。 只有第一次发射收到呼叫者的即时/选择;
恢复不会重放它们,因为这样可以提交相同的用户翻转两次。
5. 三个快速重排停止循环并打印准确的手册`codex resume <thread>`ẳ 命令。

在生命周期开始前对礼宾保健进行检查。 Codex 的 PID 所有权记录可变成 stale
临Τ)临Τ)临Τ not
共享基础设施。 行为是真实测试失败注射`/bin/sh`输入`src/core/codex-launcher-sh.test.ts`包括一个变异的护卫 证明一个健康的
同代客户端错误没有重新启动 。

桌面版和服务器版都用同样的核心脊椎线连接. 无头壳 手持
恢复稳定记录秘密, 注册线程启动/ 固定处理器与持续布局,
刷新发射机的能力,并通过其正常的RPC来广播身份模式.
移动不需要单独的执行: 它附加在服务器版现有的 tmux 上
届会。 管理 Codex 账户管理仍只使用桌面;这与
3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , , 3 , 3 , 3 , 3 , 3 , ắn , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , 3 , , 3 , 3 , 3 , 3 , , , , , , , , , 3 3 , , , , 、 , , 3 , , , , , , , , 、 , , , 、 , 、 , 、 、 , 、 , 、 、 、 腻 , 、 . 、 、 、 、 、 、 、 、

□ 签字秘诀(两种炮弹——决定1)

每张所有权记录都是HMAC的签名 由** 1 ** 重启的32字节点-自动密钥
(单位:千美元)`src/core/agents/node-auth-secret.ts`, (中文).`loadOrCreateNodeAuthSecret`) (中文(简体) ). 那个秘密已经解除了
**** 炮弹和有权得到的代用设备都重新使用:

- ** 台顶:** 密封,休息通过`safeStorage`→`node-auth-key.json`(仅密码,模式)`0600`; 从来没有写过原始的机密背书).
- ** 服务版(无键链):** 32 个原始字节。`node-auth-key.bin`模式`0600`。 。 。

这是** 保密和闭关**:一个不正确/错误的状态持续存在**
而不是刻出新的秘密——旋转钥匙会使机器上的所有束缚线都化为乌有——和
单飞行缓存在拒绝时就清除了 所以一个治愈的机器重试。 都装在靴子上`src/main/index.ts`和`src/server/index.ts`通过盎司`setCodexThreadIdentityAuthSecret(...)`装备
密钥与写入记录不同 : 只有桌面登记写入的处理器
任何——见下文解析器部分。

> 无`safeStorage`-只有秘密模块被引入 @ 科尔文的`codex-node-auth-secret.ts`内栈
> PR # 112 为`safeStorage`- 仅密码文本并扔到无头服务器上; 合并的双壳
> 上方的通道是正确的镜像, 复制它作为只键链文件会退缩
> 服务器版. 这是已批准的第1号决定。

□ 所有权记录

`~/.nodeterm/codex-thread-nodes/`(单位:千美元)`CorePlatform.userDataDir`,**不**`~`:

- ** 系统账户** 头衔文件`<root>/<threadId>`精确的S韵律,所以是一个机器
没有管理账户的字节字节不变,其遗留记录不断解决。
- **管理账户** `<root>/<accountId>/<threadId>`。 。 。

每个记录都是平面`key=value`文本文件,模式`0600`,**作为数据,从未来源**:

```
accountId=<id or empty for system>
nodeId=<owning canvas node>
endpoint=<hook endpoint file path>
agentId=<the node's own agent id>
canvasControl=<1 or 0>
signature=<base64url HMAC>
```

QQ 为什么记录上会带动代理

`agentId`(单位:千美元)`canvasControl`曾经是** 康斯坦茨在预演** (`codex`,授权)。 两者都是
关于PANE的事实`hookServer.buildPtyEnv`知道,它用节点的标签标记一个节点
代理代号——对于报关代理`baseAgent: 'codex'`这是`custom:<uuid>`,**不**`codex`- 并发放补助金`canControlCanvas`常数是坚持它是什么的前奏
无法知晓。 它错误地给每个基于定制编码的节点贴上了标签,并声称赠款同意
载明今天的面条是因为`SHARED_IDENTITY_CAPABLE ⊆ CANVAS_CONTROL_CAPABLE`-一个巧合
列表本身的评论邀请下一个共享身份代理中断,此时序曲将会
将一个工具外壳交给它的能力 被拒绝。

谁决定什么:**pane呼应自己的标签**在`/codex-thread/{start,bind}`(a) tmux会议
超过应用程序,所以在重启之后,服务器侧仍然记得节点运行的代理,
窗帘的环境是唯一可持久持有者。 这条路从不重复
它与一个`canControlCanvas`在同一过程中莺扇窗,所以有
确切地说,一个决定者和列述身份的伪造代理人不能制造出能力表拒绝的赠款。
呼应标签无论如何都不是能力要求: 到达这条路线需要一个符号 。
因此,调用者 * 是节点,它塑造的记录是再出口的
只进入那个节点自己的工具壳。

* 签名绑定全部6图

```
signature = base64url( HMAC-SHA256(
  key, threadId ␀ accountScope ␀ nodeId ␀ hookEndpoint ␀ agentId ␀ canvasControl ) )
```

`accountScope`是账号,还是字形`system`系统账户(空 ID)
),",",". 由于范围在预告片内,因此签了记账记录**A**验证
仅属于**A**范围——将其字节复制到**B**的目录中,MAC的第一次失败.`canvasControl`里面有同样的原因: 它命名了前奏出口的能力
所以没有签名的拷贝 行为的受害者可以加入
验证为`timingSafeEqual`。 。 。

** 三个预画世代都是由记录的形状所选择的,从未依次尝试过。 ** 一个`agentId=`线条 QQ 6- tuple , 仅此而已; 没有代理线, 只有一条`accountId=`4建议将
(一个S6时代的记录);在系统范围上也没有 \\ 最初的3点。 掉下来就是
能够剥离或重写代理人身份的门,记录仍然被接受。 A级
预代理记录与隐含值一起读 **`codex`+ 批准** —— 确切意义是何时
这是写着的,因为它来自 同样的脊椎和代码是无条件的 画布控制能力
- 倒计时键在 ** 线是缺席的**, 从来没有在值是空的,所以没有
说出一个特工的名字 可以返回到猜测。`bindCodexThreadIdentity`同样从不降级a
说明其代理名称,并且从未促进代理代理前记录的*imimimex* into a problease
签名索赔。

□ 失败的封闭模糊(房屋规则,重复使用)

所有权分辨率再利用合并的闭塞状态(`pane-ownership.ts`, (中文).`node-identity-policy.ts`:**无法证明的业主被拒绝.

- 怎么样?`resolveCodexThreadNodeIdentity(threadId)`没有帐号提示( 知道共享的工具 shell)
只有光线 id)扫描 **每个** 范围并返回一个所有者** 时`owners.size === 1`页:1
由两个不同账户拥有的同一线程 奠定了** 无**。
- 怎么样?`resolveCodexThreadNodeIdentity(threadId, root, accountId)`并有明确的账户
在一个范围。
- 怎么样?`codexThreadIdentityHasLiveConflict(...)`报告冲突时,
节点**拥有横跨瞄准镜的线程.

□ POSIX-sh 解析器

`codexThreadIdentityResolverSh(root)`准备到每个管理中的钩脚本和两个 LOCAL
特工shims (英语:`nodeterm.sh`财务报告和审定财务报表`context.sh`在他们早期的环境大门之前。 页:1
共享应用程序工具 shell 继承`CODEX_THREAD_ID`但不是脸谱`NODETERM_*`(见调查)
铀5,`docs/superpowers/probes/2026-08-codex-tool-shell-env.md`),所以这个序曲恢复了束缚.
没有它, Codex 钩子状态工作的同时 画布控制和链接文本读错
头等节点与节点以外的节点相同。 复制到 SSH 的机器中性 shim 常数
主机故意省略本地记录路径; 每个本地安装器用其创建自己的副本
拥有`codexThreadIdentityRoot()`。 。 。

** shim 一半是共享的; 记录的一半是桌面独占的, 直至服务器版注册
管理者。 ** 这两份声明都很重要,只读第一版的夸大其词。
序曲到达它字节`context-link.ts`因为`writeCliFiles`和两个贝壳
以秘密盟誓,`src/server/handlers/index.ts`故意登记否`setCodexThreadStartHandler`页:1`setCodexThreadBindHandler`,并且(或)`src/main/index.ts`是唯一一个
未测试呼叫者`writeCodexThreadIdentity`页:1`bindCodexThreadIdentity`。** 没有所有权记录。
写在壳上**, 所以解析器总是找不到任何, 并收回它的反面: 它输出
没有什么,而Shims保持 大门完全一样 他们之前,这个序曲存在。 这是
一致而非仅仅缺失——相同的文件答案`UNKNOWN_CODEX_IDENTITY_CAPS`(单位:千美元)`shared: false`因此,一个代码节点 在那里发射赤色`codex`拥有自己的应用服务器和
从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从 那天就是一个真正的空白
服务器版扩展共享的应用程序服务器,关闭的是什么这两个注册——不是a
第二本序语.

解决者:

- 读`NODETERM_CODEX_ACCOUNT_ID`从守护进程内选择瞄准镜;
- 一个已知的安全帐户 id QQ只读 ** ** 该帐户的记录,并要求该记录`accountId=`向**%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%之后才\%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%应是%%%%%%%%%%%%%%%%%%
- 一个** 空** 账户 id \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ذ\\\\\\\\\\\\\\\\\\\\ 我还是扫描\\\\\\\\\\\ n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
** 只当一名候选人完全匹配时** (`nt_codex_matches -eq 1`- 两个账户持有:
同一线程 ID 改变不了任何;
- 它无法验证HMAC(在代理的外壳中没有密钥),因此它重新验证了每个回收的字段
导出前的字符集和账户行/范围协议 。 其行为被证明是真实的`/bin/sh`对一个真正的在磁盘上瞄准树`codex-thread-identity-sh.test.ts`。 。 。

** 它出口记录所述的东西;它没有作出决定。 **`NODETERM_AGENT_ID`出自录音`agentId`,以及`NODETERM_CANVAS_CONTROL=1`仅导出******`canvasControl`说
因此——离开UNSET, 缺席而不是`0`,形状相同`buildPtyEnv`生产和形状
双关语`[ -z … ]`门期待。 放弃就是诚实的贬低:工具壳失去动词
格子仍然如此,而声称拒绝给予格子是不断扩大的方向。 预用药
记录(无)`agentId=`(行)表示`codex`(a) 补助金;
被接受的字母表解决了**什么都没有** 而不是倒回去,因为我们没有记录
写不是一个可以信任字段。

□该`NODETERM_*`铁门从来不是安全边界

很明显,因为前奏和两首歌 都像进入控制:
打开方式`[ -z "$NODETERM_NODE_ID" ]`页:1`[ -z "$NODETERM_CANVAS_CONTROL" ]`并拒绝这样做
没有他们的一切 拓宽这些变量的SETS——即恢复共享Codex
工具壳的身份确实如此——因此,读起来就像扩大当地攻击者能够达到的目标。 没错
不,而这一节是争论。

任何人谁能跑`nodeterm.sh`已经像用户一样运行在外壳中,并且可以简单`export NODETERM_NODE_ID=… NODETERM_CANVAS_CONTROL=1`手边 变量是**路由和
no-op gate** — 他们告诉一个生成的脚本它属于哪个节点, 并保持它在用户的惰性
普通终端——不是授权检查. 服务器端没有咨询它们;它们从来没有
前往钩子服务器。

实际授权的是在套接字的另一侧:

- **每条路线都需要全应用的持卡人**(`X-NodeTerm-Hook-Token`,在任何路径前检查
发送`hook-server.ts`),它生活在0600端点文件中.
- ****`/control/*`联 合 国`/context-link/*`还需要每个节点的能力**
(单位:千美元)`X-NodeTerm-Node-Token`通过单曲`identityGate`→`verifyNodeToken`→`controlPolicy`路径。 那个`nodeId`呼唤者的名字是体域,它是象征——不是
环境——即决定打电话者能否代表环境。`forged`是一个赤裸的403,
严格动词要求 a`verified`最终判决
- ** Context链接通过构建再次缩小**:链接文件由请求器选择
像节点 id (`linkDocs.get(req.nodeId)`),所以一个持有符号的呼叫器只能读取其自己的节点.
方向链接图——一个env var不能扩展该集.
- ****`/codex-thread/{start,bind}`** 形成这些记录的路线是严格的:`verified`每个节点的代币收益。

因此身份前奏会改变 * 哪些会话被正确归结于它们的节点 * 而不是 * 什么
允许任何人这样做*。 这种PR不会改变威胁模式. 只有一件事是真实的
将是一种价值 序曲出口, 没有任何东西被重新确定—— 正因为如此,`canvasControl`和为什么路由计算它与`canControlCanvas`而不是
接受窗帘的话

□ 供应链警卫

账号ID来自手富有成效的`settings.json`页:1`project.json`. 每张身份证`ACCOUNT_ID_RE`(单位:千美元)`^[A-Za-z0-9][A-Za-z0-9._-]*$`,必须开始字母数字)——通过`accountScope()`内
代号,发射机自己的sh检查, 和钩-服务器路线——** 之前** 它成为一个
目录范围, 因此`.`页:1`..`/领导-分隔者/`a/b`绝对的身份证在门口被拒 那个
启动器将账户 ID 连接到`/codex-thread/{start,bind}`后**身体**,从来没有上
argv( 约束 6); 错误的 id 返回平原`codex`恺撒 而不是敌对范围的约束,
服务器拒绝`400`在启动处理器可以建立孤狀線之前.

□ 放大镜分辨率( 未关闭)

`resolveCodexSessionScope(userDataDir, accountId, homeExists)`决定:`CODEX_HOME`+ 键`NODETERM_CODEX_ACCOUNT_ID`a 编码产卵在:

- ** 编号* 系统之家。 总是会解决的,写着** 解释** 所以它覆盖任何
从父程序继承的管理范围( tmux 共享一个服务器 env) 而不是默默行事
错误的登录。
- ** 明确选定的管理账户,其家下落不明** **
(单位:千美元)`{ unavailable: 'codex-account' }`) (中文(简体) ). 它永远不会回到系统之家。 这是故意的
与克劳德兄弟的第一弹簧回落相比,
比被拒产的卵子更糟糕的是, 那个`pty-manager`地图`unavailable`直通铸造厂

OAuth-Shadowing en 实际上,它是一个非常复杂的世界。`OPENAI_API_KEY`, , (帮助)`CODEX_API_KEY`. . . . . .`AUTH_ENV_STRIP`从
因此管理下的账户总是作为自己的账户`auth.json`登录。 那条条
仅触及**env**;从未将证书放置在参数(约束6)上。

□同机开关(三相,所有者授权)

将一个正在运行的节点的谈话转到另一个账户,** 将同一对话的ID,永远不要
叉 it**. 开关是一个三相,连接 TTL 的,所有者授权的协议,由驱动
渲染器( E)`src/main/codex-accounts.ts`:

1. **计划**(`switch-thread`) ——保留两个账户的ID(因此同时删除被阻止).
10号地产),从它的应用服务器读取源推出路径,以及`planCodexRolloutExposure`(仅验证,变异无). 回返a`rollbackToken`。 。 。
2. ** 承诺** (`commit-switch`) -`commitCodexRolloutExposure`: ** 解剖式硬链接** 来源
输入目标账户`sessions/<same relative path>`。相同的inode 。
(原始内容存档于2017-09-29). byte-ike conversation id. 只有拥有网站的用户才可能犯罪。
3. 完成** (中文(简体) ).`finish-switch`——解除保留. 拒绝,直到犯罪 实际运行,所以
过早完成永远无法使渲染器将一个节点循环到一个没有推出的目标上.

`rollback-switch`保留TTL, 和所有者是`destroyed`全部解除保留
没有承诺。 接触是原子式的,永远不覆盖的硬链接**:`link(2)`这是
无覆盖文字, 一个`EEXIST`如果现有目标已经相同,则只允许****碰撞
inode(一个同位素重曝光),副本拒绝写入**通过**一个共线目录
区域。 我是个区域。 来源`dev`页:1`ino`在链接前后重新验证, 所以在飞行中源交换
未关闭 。

□ 跨机转机(当地-SSH)

`transfer-thread-to-ssh`将一个 **idle ** 本地对话框移动到远程账户。 资源腿
重复使用`planCodexRolloutExposure`警卫( 常规文件`<home>/sessions/`,基准名`<threadId>.jsonl`,没有
SSH进口商. 属性: 对话 id 存活; 远方必须 ** 发现 ** 硬链接
节点回收前推出(验证-当时的再循环-一个虚假发现是**重复复制+)
回滚**,从来不是沉默的;** 本地副本仍然** (这是一个硬链接,从未移动);
现有的远程推出是**从未覆盖**(`link`页:1`mv`关闭失败`EEXIST`页:1`exit 17`) (中文(简体) ).
一个缺席的进口商(没有动态的SSH管理器)** 以一个命名错误关闭**,从未默默成功.

□ 账户使用量( 不混合)

用法为一个**系统行**加上一个行**每个管理账户**,每个账户按自己的键`accountId`因此,一个账户的号码永远不可能是
由另一个人负责。 每个`fetchCodexUsage`返回路径(包括`unavailable`)加盖印章
账户的身份,所以一个空的或失败的读数没有关闭到 ** ** 账户,从不关闭到
编造的;系统行显然没有所有权(`accountId: undefined`) (中文(简体) ). 扔账户
源输出**只系统**,从不编造账户。 账户集上的缓存指纹
当账户被添加、删除或重新贴上标签时,将断层编号。

□ 失败的财产(房屋规则)

情况 判决
| | | |
明确选择的账户, 家失踪 拒绝产卵—— 没有系统倒退 QQ
QQ 由两个账户范围拥有的相同线程 id , 没有提示 QQ 没有所有者( 代理、示例解析器、 转发目录全部关闭) QQ
QQ 启动碰撞目标, 不同的inode QQ 永不覆盖( 扔 /)`exit 17`) (中文(简体) ).
* * * * * * * * * 已命名`EXDEV`错误——没有无声字节-副本倒置(U3) QQ
远方无法发现导入的展开 。 。
QQ 为账户 A 签名的记录, 在 B 下存档 QQ MAC 失败 — 被拒绝 QQ
QQ 不签名 秘密武装 QQ 记录 投出; 没有未签名的竺写纸张 QQ
QQ Usage 源头只扔QQ系统;从来不是虚构的账户QQ
QQ 账户 id from`settings.json`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}可以逃出根头 {\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}在门前被拒绝`isSafeAccountId`|

□U1 / U3——探测器解决的两个制约因素

- **U3 — 同一个文件系统。 ** 同一机器开关连接两个地方中心之家之间的一个推出程序,两个都连接
下级`$HOME`(单位:千美元)`~/.codex`和`~/.nodeterm/cx`),在建材主机(ext4)上测量到的同一设备.`link(2)`掷出`EXDEV`横跨山峰,和a`$HOME`子树 ** 可以** 装入另一个
所以v1不** 悄悄地回到字节副本...`commit`显示名称`EXDEV`错误。 对S6 v1来说,跨山反式副本显然超出了范围。
- **U1——现场发现。 ** 跨机拷贝在跑步上`app-server`发现一个
硬链接推出** 无重索引**。 在编码中通过校验-当时的循环(假的U1是一种)
拒绝复制 + 回滚, 绝不沉默 ), 但现场守护程序确认为 ** device
——见验收 让。
