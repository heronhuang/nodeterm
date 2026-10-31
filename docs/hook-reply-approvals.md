> English: [docs/en/hook-reply-approvals.md](./en/hook-reply-approvals.md)

# (v1合同)

受Claude - Island's Evention Server的启发:它的许可钩使 HTTP 请求打开和
UI的允许/Deny **是钩子的回答**——没有键盘键,没有即时放电耦合. 这个
doc将它适应节点的架构,其中的答录器可能是一个 ** 手机到达
主机在 SSH ** (没有通往桌面回路服务器的路径) 上, 因此回复通道是一个
** 代理商在主机上的文件运行 ** —— 每一个回答者都可以得到。

□为什么替换发送键

电话的快速处理今天的类型`1`逃到tmux。 这取决于许可
即刻进入屏幕 专注 并按我们 你还好吧 Hook -reply是决定性的。
在主线Claude代码上,用涂好的对话框(以
答案先( 钩子的决定或 TUI 中的用户) 获胜, 后一则被忽略
(研究:docs/superpowers/plans/2026-09-26-answer-paths-research.md §1;早期版本为:
这位医生说,决定是在 " 绘制提示之前 " 作出的,这只适用于
子代理的请求, 其对话框等待钩。 准时到时 钩子上没有指纹
对话框只需保留( 无法打开, 位元后遗存 假如选中的话 ) 。

□ 机制

** 请求** — 管理下钩脚本`PermissionRequest`分支(像所有东西一样)
其他输入`managed-script.ts`),只有在`NODETERM_PERM_WAIT_SECS`在会话中设置 ( > 0)
内存 :
1. 生成`pendingId`=`<nodeId>-<epoch-ms>-$$`。 。 。
2. 将接通的JSON钩写到`~/.nodeterm/pending/<pendingId>.json`3. POST 到回路钩服务器到今天为止(火和遗忘状态流动——这就是如何
提出的各项建议`pendingId`) (中文(简体) ).
4. 民意调查`~/.nodeterm/pending/<pendingId>.answer`每0.5人,最多为`NODETERM_PERM_WAIT_SECS`(默认注射: 45;钩必须停留在克劳德自己的钩超时)——或最多`PERM_WAIT_SECS_INTERACTIVE`(540美元)用于`ExitPlanMode`页:1`AskUserQuestion`,见下文。
5. 答案文件出现:解码(见"计划和问题"),`rm -f`两个文件,打印
JSON决定退出:`{"hookSpecificOutput":{"hookEventName":"PermissionRequest","decision":{"behavior":"allow"}}}`(密度增加一个短`"message"`0号出口。
6. 超时:`rm -f`请求文件, 打印 ** nothing **, 0 出口 ~ Claude 显示其正常
即时; 遗留的寄出密钥仍能起到倒置的作用 。

POSIX sh只限,没有解析器——与现有的管理脚本相同的限制. 服务处
当env var(用户自己的终端,旧节点)不存在时,必须是**no-op**。

** 回答者** (在解剖学上,都写同一个单行答案文件)`printf > tmp && mv`:
- 电话(SSH)** -`InboxApproval`在批准事件时将其写入连接
携带`pendingId`;否则掉回送钥匙. 数字`2`/"永远允许"继续使用
v1 (hook)`updatedPermissions`范围以外。
- ** Desktop画布** - NEAS - YOU徽章增益 批准/Deny按钮(核准活动与`pendingId`仅此而已), 路由 IPC 到主侧写入器: 本地项目 → 本地 fs; SSH
− 通过项目的“控制主机”写入。 因此,桌面用户不会被留视
a hold proogle——在警徽脉冲时得到一击批准.

** Event Phypt** — 钩式服务器的原始`PermissionRequest`载荷现在携带`nodeterm_pending_id`(由脚本添加到它的 POST 机构); 镜像的批准`InboxEvent`收益`pendingId?: string`骑着镜子(电话),从窗户上掉下来
遭拒绝,
在行动之前。

** 注射** -`buildPtyEnv`添加`NODETERM_PERM_WAIT_SECS=<n>`新设置时`hookReplyApprovals`(default **on**)是被启用的,代理人是Claude(唯一一个其行为能力增强的CLI).
授权请求钩 裁决合同我们已经核实。 在移动推力旁设置生命
设置; 关闭 QQ env 不包含 QQ 脚本分支 惰性 QQ 确切的遗产行为 。

**Cleanup** — 钩状服务器扫描`~/.nodeterm/pending/`超过10分钟的文件
靴子和小时(死亡治疗的孤儿)。 电话/台顶从不创建答题文件
对于待决Id,他们没有读 从现场批准活动, 重新检查事件仍然是
写入前尚未解决 。

□计划与问题(结构化答案,2026-09).

`ExitPlanMode`页:1`AskUserQuestion`两套`requiresUserInteraction`对于这两个工具
克劳德代码** 空投`{"behavior":"allow"}`** (“如果(!)更新投入,e. requiresuserInteract?”)
返回无效 —— 研究§2 。 V1在计划上(头扣,电话)的核准是无声的
问题完全无法回答。 一个决定包含`updatedInput`工作内容 :

- ** 计划核准**=允许+`updatedInput:{}`从来没有回音`tool_input`,其`plan`将会
改为"由用户编辑". 没有`updatedPermissions`= 恢复计划模式(即
工具本身体现在`call()`恢复它,包括汽车的危险规则条; 接受编辑 / 询问时间
添加为实现`[{"type":"setMode","mode":"acceptEdits"|"default","destination":"session"}]`。这里有
故意**没有`setMode auto`**——这条路跳过条.
- ** 79. 计划修订** (“否,继续规划”)=以用户的反馈予以否认`message`,没有`interrupt`。 。 。
- 问题**=允许+`updatedInput: {...tool_input, answers: {"<exact question>": "<label>"}}`· ;
多选择标签与`", "`;一个条目,作为自由文本的答案标记带有输入文本。

**  builds从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从 太好了从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从,从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从肛从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从`allow`页:1`deny`JSON决定的一行
核心结构`core/agents/permission-decision.ts`、`buildPermissionDecision`从 a 。`PermissionAnswer`(单位:千美元)`shared/agents/permission-answer.ts`和正在等待的请求文件
代理机主机** – 该工具及其唯一真实来源`questions`(从来没有制造器)
页:1 每个字段都被验证:工具必须匹配,计划模式是封闭的enum,标签必须
除非该条目是明确自由的文本,否则该问题的选项中就已存在。
多选题,每问题必须回答(部分题集被拒绝)-
TUI从未提交过一个半解答的拾取器),大小封顶(文本8000字符,整个决定64 KB). 结构化的答案
当请求文件丢失( 控件结束) 时被拒绝 —— 呼叫解决`false`。 。 。

** 脚本印什么** (中文(简体) ).`managed-script.ts`在真实中测试`/bin/sh`输入`managed-script.answer.test.ts`(a) 固定决定`allow`编号`deny`,或(b)项
答案文件 VERBATIM 当它从完全开始`{"hookSpecificOutput":{"hookEventName":"PermissionRequest","decision":{"behavior":`+ 键`"allow"`页:1`"deny"`, (中文).
结尾`}`, 最多为64 KB, 最多为64 KB, 没有控制字节, 也没有控制字节(所以它是一行) 其他指纹
什么都没有——正是以前每个建筑都做了一个未知的答案。 回答的 POST 带有
解码 VERB, 绝不是文件( 结构化的答案持有用户文本, 并且从中无法到达
(原始内容存档于2018-09-21). argv. 远程回答在SSH命令的非正规经济部门上旅行,原因相同.

** 普通字,每个工具**(所以电话和头按钮不需要更改):

QQ 回答文件 QQ 退出计划模式 QQ 问用户问题 QQ 其他问题 QQ
|,|也.
|`allow`+ 允许 +`updatedInput:{}`(恢复模式) — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —  — — — — — — — — — — — — — — — —----  — — — — — — — — — — —一声。
|`deny`QQ 固定拒绝 QQ 固定拒绝 (切除拾取者) QQ 固定拒绝 QQ

一个平原`allow`问题被吞掉,而不是被打印出来,因为克劳德会放弃它;
打印它只会结束钩子, 关闭聊天- 视图的答案路径, 而不会更改任何内容
那个TUI Core也拒绝写作(`answerPermission`→`false`所以没有表面翻转徽章
答案一无所获 信头藏着批准罚单

** 等待时间。 ** 这两个工具的钩子`PERM_WAIT_SECS_INTERACTIVE`= 现在你是540s而不是45s
- 人们读计划几分钟。 安装者写一个明确的`timeout: 600`关于 OUR 权限请求
处理器( E)`PERMISSION_REQUEST_HOOK_TIMEOUT_SECS`, (中文).`CLAUDE_HOOK_EVENTS`; 当地、管理账户和SSH
安装相同, 且在下次安装时会用它重写现有安装, 所以绑定的控件
(c) 60 s 的比额,有60  你能不能有这些经验。 民意调查数
半秒, 和在哪里`sleep 0.5`不支持为`sleep 1`倒计时数2,所以牵制永远不会
双倍超时. 因为主线段对话框是同时绘制的,所以会设置一个长长的屏障
没什么 一个**subagent**的要求保持了短时间:它的对话框等待钩子,所以540s会
隐藏提示。 信号是`"agent_id":`有效载荷中的密钥——经Clude 2.1.283捆绑证实,
其钩基输入为`session_id…,permission_mode:r,agent_id:s?.agentId,agent_type:g,…`,所以关键是
主线上未定义(并被JSON投放);一个嵌提出的申诉假阳性只会缩短控点.
工具名从 FIRST 读取`"tool_name":`在有效载荷中,只有在无有效载荷时才信任`"tool_input"`在它之前,吟咏的密钥 在一个工具的输入中 永远不能成为普通的工具
看起来像一个计划(一个空的/不安全的名字降解为今天的默认行为). 答案文件的大小为
其BYTE计数(`wc -c`),最多可读作盖+1字节(`head -c`) (中文(简体) ).

** SSH主机上的旧剧本——通过修订登机。 **的主要内容 主机上的脚本只在连接 你有什么问题吗?
因此一个长期连接的项目可以持有一个更古老的脚本的请求. 剧本读JSON的答案是
都没有`allow`也没有`deny`中,删除并打印无字(TUI仍然回答——通过运行
与以前的文字相比,新的S测试,而WRITE则成功;没有闸门核心将报告
成功和乐观的"回答"事件 将翻转 需要你工作 代理仍在等待
在TUI乍现。 所以剧本的乍修订门:`MANAGED_SCRIPT_REVISION`5, 已经每个钩子 POST
随身携带`clientRevision`),和钩子服务器(`labelHeldForRevision`保持一个事件`held`我还得买单
——并记录票型结构化能力——仅供改版.`MIN_STRUCTURED_ANSWER_REVISION`(5)  (5).`answerHeldPermission`拒绝(`false`,没有写,没有合成解答事件) 一个结构化的答案
一张无法记录的票和一张平原`allow`关于由这种脚本所持有的计划(将打印出
裸体允许克劳德滴水。 ** UI 后果:** 对旧标本主机不提供计划/问题控制
完全(制造器从未收到)`held`),标题则批准计划答案`false`改为
假装; 拒绝和普通的批准 完全如前。 重新连接工程安装
当前脚本。 能力记录是程序本地化的 并且有 该死 程序前的票
重新启动被视为无法启动( 渲染器的)`held`也不见了。

** 编剧。 ** 被搁置的请求`{pendingId, toolName}`运行为`held`页:1
在节 Olympia 时代理状态存储`blocked`或`waiting`——从`pendingId`,哪个
镜子仍然从一个问题中剥离 所以批准/拒绝 永远不要点亮一个采摘者。 电话镜像文件
不变(`held`这一点并未得到坚持。

** QQM视图(2026-09)中的回答控制。的合作 计划/问卡在`ChatPanel`携带
仅在节点时进行控制`held`属于它`renderer/lib/chatAnswer.ts` `activeAnswerCard`:
最新未答复的持有接轨工具的卡片,以及——作为问题——南非原子能共同体问题文本。
同样的顺序。 因此,一个被质疑的问题也带有其案文(A/CN.9/WG.III/WP.18)。`held.questions`),读者为一.`readQuestions`(单位:千美元)`shared/agents/permission-answer.ts`),也填充卡的结构化`questions`(单位:千美元)`core/transcript-reader.ts`)),因此双方不能对文本产生分歧. 计划:
“ 证明 ” (“ ” )`restore`,第一和初级),“证明...接受编辑”,“证明...问
在编辑前),"Revise..."(feedback ~).`plan-revise`). 问:收音机(单)/复选框(多选择),
“其他”文本字段(对一个没有选项的问题的唯一输入),一旦每个问题都是
答案淑女; 多选择“ 其他” 加入选中的标签和文本`", "`作为自由文本
在回答时,引用的文字(内引文逃脱),当它包含一个逗号或一个引文——克劳德代码自己的
拾取器格式, 2.1.283 (`Red, Blue, "teal, sort of"`, (中文).`Red, teal`),所以模型可以辨别
s. Cha`question-clarify`拒绝问题:否认
其信息来自本地澄清文本, 由待决文件的问题的核心构建; 否`interrupt`克劳德问要澄清什么 然后马上停下来 该票在发售时与商店核对;`false`(或拒绝)显示
"Couldn't send ——在终端里回答(QQM)",并让控制器可用——从来没有卡住的"Sent".
当控件打开时, 作曲者的占位符和卡片的状态列点
(单位:千美元)`chatComposerPlaceholder({answerOnCard})`) (中文(简体) ). Kanban 的卡模式也一样`ChatPanel`时,
控制器也出现在那里。

** 已读线条(2026-09-28)**。 一张卡片只回答请求 。
线程读作( I)`answerCardState`;同一种族的iOS修复为#41:`threadHeldFor`这是
最后一次应用尾巴开始时持有的票读作。 钩子动作是A —— —— B, 计划A's
卡片仍然可以在屏幕上,没有结果;仅用工具名就匹配它会批准B. 所以说
请 快取线索不被读取为没有控件 —— 其工具显示的最新未解卡
"更新——或者在终端回答",面板迫使静静的尾巴重载(排在a后面)
在飞行中读读或取取更旧的页码; 用2 s = 30 s 背移重试,直到在新版本下读取
要求土地,无论是否有一张卡片在屏幕上写着"更新...").
在B下面读到的,仍然显示A的卡片 也没有B的束缚: 记录稿
能够拖慢钩子,新请求必须在线程显示为新的卡片上浮出水面。 答对
有效载荷名称为绑定的ID,在发送时与商店和绑定物同时重新核对.
残余物:每面板上挂的上一个卡片内存寿命,所以在 B 绑定 B 下打开
最新的匹配卡; 用于同一工具的重新签发的的适当车票  使用( 重复钩) 保留
"更新..." 必须在终端里回答 保证是克劳德写下
工具 在钩火前使用记录。

3 : 3 : 3 : 3 : 3 : 3 : 3 : 3 : 3 : 3 : 3 : 3 : 3 : 3 : : 3 : : 3 : : 3 : : 3 : 3 : 3 : : 3 : . : : 3 : 3 : : : : 3 : 3 : : : . : : : : . : : : . 的  的 : : : :  : 的 : :  的 的 的 的  的    的          的 的    的 的          的                 将其列入的      的 的             服务器版: 本地项目
(SSH项目仍不支持,如前)。 中继:不变. 移动: 继续写入`allow`页:1`deny`;其计划批准后,一旦主机的脚本被更新,现在通过脚本映射工作;
电话中结构化的答案是iOS后续.

□ 超出范围

- "永远允许"通过钩子`updatedPermissions`。 。 。
- 密码/基因许可钩(未经核实的决定合同)。
- 桌面 notch/ HUD 覆盖(单独功能) 。
