> English: [docs/en/cursor-agent.md](./en/cursor-agent.md)

# CLI(`Cursor-Agent ' )作为节点剂

已建的代号`cursor`(单位:千美元)`AGENT_CONFIG.cursor`,启动`cursor-agent`后提示`agent`) 子命令 (中文(简体) ). 第1至第8节涵盖现状叶:`cursor`是会员之一`AGENT_HOOK_TARGETS`,所以光标节点 得到运行徽章,未读点,完成
通知书,`--after`依赖性和触发目标。 后面各节涵盖各种能力
它从此加入(模型和权限旗、聊天、测量、会话连续性、需要你、
管弦乐). 兄弟姐妹写作:`docs/antigravity-agent.md`(最近的先例),`docs/grok-agent.md`。 。 。黏贴。

** 事实来自何处。 测量`cursor-agent`2026.09.28-64d2043 (macOS):5个无头
(单位:千美元)`-p`运行在付费账户上,两次零成本互动TUI启动,以及运送的JS捆绑
(单位:千美元)`~/.local/share/cursor-agent/versions/*/`的一点是,的一点是,自2026年9月23日起安装的CLI自动更新。
这工作。 固定线 :`src/shared/agents/__fixtures__/cursor/hook-payloads.json`。 。 。

^ 1. 记录的编号(用于恢复工作)

每个钩载荷都携带**`conversation_id`** 和复制件**`session_id`** (百分比
(原始内容存档于2017-09-21). General.`normalizeCursor`记录`conversation_id`(后退为:`session_id`作为事件`sessionId`,这是每个代理的ID到达`agentStatus`. ** 证明为零成本:**`cursor-agent --resume <conversation_id>`打开它的历史聊天。 `诅咒剂'
创建-聊天打印新的空聊天 ID。 笔录路径是`~/.cursor/projects/<workspace path with non-alphanumerics as "-">/agent-transcripts/<id>/<id>.jsonl`(JSONL;最后一行是:`{"type":"turn_ended","status":"success"|"error"}`)和有效载荷`transcript_path`一旦写出第一个转弯(nell before)。

□要在2号线上

- 文件读取:`~/.cursor/hooks.json`, (中文).`<workspace>/.cursor/hooks.json`,企业/小组文件,以及
页:1`~/.claude/settings.json`(+项目)`.claude/settings*.json`** 作为Claude Compat。
形状:`{"version":1,"hooks":{"<camelCaseEvent>":[{"command":"...","timeout":5}]}}`的,为为的,为为的,为的,为的,为的,为的 出席情况,为的,为的,为的,为的,为的为为为的为为为的为为的为为的为为的为为为的为的为为的为为的为为的为的为为为的的为为为的为为的为为为的的为为为的为为的为为的为为为的的为为的为为为为的的为为为为为的为为为为的的的为为为为为的的为为为为为的的的的为为为为为为为为为为为为的的的的为为为为为为为为的的为为为为为为为为为的的的为为为为为为为为为为为的的的为为为为为为为的的的的为为为为为为为为为的的的的的为为为为为为为的的的为为为为为的的为为为为为的的的的的的的为为为为为为为的
- 有21个事件 我们赞同六份(即:`CURSOR_HOOK_EVENTS`:`beforeSubmitPrompt`, (中文).`preToolUse`, (中文).`postToolUse`, (中文).`postToolUseFailure`, (中文).`stop`, (中文).`sessionEnd`(见"会议连续性").
- 有效载荷信封(所有事件):`conversation_id`, (中文).`session_id`, (中文).`generation_id`, (中文).`model`, (中文).`hook_event_name`, (中文).`cursor_version`, (中文).`workspace_roots[]`, (中文).`user_email`, (中文).`transcript_path`工具
事件添加`tool_name`(单位:千美元)`Shell`,(......),`tool_input`, (中文).`tool_use_id`, (中文).`cwd`(过去是)`""`),以及`postToolUse`添加`tool_output`, , (中文).`duration`. Hook 老巢载着`CURSOR_PROJECT_DIR`, (中文).`CURSOR_VERSION`, (中文).`CURSOR_TRANSCRIPT_PATH`, (中文).`CLAUDE_PROJECT_DIR`,而父母的巢穴
(这样)`NODETERM_NODE_ID`到达我们的脚本。
- 怎么样?`sessionStart`起火一次,**没有`--resume`** (在TUI和捆绑中衡量)。
于 2026.10.01 (私有 tmux, 项目级日志机, 无提示) 重新测量: 一个平原`cursor-agent`在一瞬间,即刻发射`conversation_id`(==.`generation_id`(a) 支助`cursor-agent --resume <fresh uuid>`(如何节点发射 Everyy node, minted id including)
没有 直到`/quit`(单位:千美元)`sessionEnd`),两跑. 因此,它不是被认同的,它不给予新鲜的,
节点在第一个回合前的状态(如果在第一个回合之前被杀死,则没有 DROPPED 芯片) 。

□ 3. 钩子是门吗? 是的,对于一些事件;沉默是安全的默认

从捆(text)中(`executeCommandHook`通过运行确认:

|钩结果 |效果
|,|也.
QQ 空 Stdout, 退出 0 QQ 无; 工具运行( 测量于`preToolUse`) (中文(简体) ).
2号出口 DENY关于钓鱼事件`preToolUse`, (中文).`beforeShellExecution`, (中文).`beforeMCPExecution`, (中文).`beforeReadFile`, (中文).`subagentStart`) (中文(简体) ).
QQ 任何其他非零退出, 超时 QQ 登录为失败, 除非条目设置`failClosed`|
JSON DENY对吉丁事件("为安全而封锁") 无效的 Studout ===

因此,安装的命令是`sh <script> >/dev/null 2>&1 || :`(单位:千美元)`buildManagedHookCommand`
`silent`:一个破损的脚本永远无法打印垃圾或2号出口. 我们的剧本什么也没有印出来

发现陷阱 :
- 光环条`//...`从shooks.json作为JSONC的评论**ignoring引文**,在解析前. A级
包含`//`损坏每个工具的全部文件。 安装者拒绝写入一个.
- ** 18项活动(包括:`afterAgentResponse`, (中文).`afterAgentThought`, (中文).
shell/MCP/file 事件)加上一个Claude格式的项目文件在第一个消息后丢失了代理流
回答三次("连接丢失... 写字机是关闭的"); 与五个相同的运行
活动加会话开始/会话结束 哪个区别是未知的 所以
未订阅额外事件。 设备项目3。
- 服务器告诉客户端哪个步骤有钩子(`hooksConfig.configuredSteps`并且只给那些打电话 8.

□ 4. 国家测绘(`normalizeCursor`,纯净,闭合的一组确切名称).

\x事件\x结果\x
|,|也.
|`beforeSubmitPrompt`|`working`许多`newTurn`|
|`preToolUse`/ 所作的承诺`postToolUse`/ 所作的承诺`postToolUseFailure`|`working`; 子代理人的呼叫无效(`isCursorChildToolEvent`) 被收归主,被收归主, 啊!`Task`工具用途为`subagent-start`(见"管弦乐平等") |.
|`stop`|`done`* ;`interrupted`若为`status==="aborted"`, (中文).`errored`若为`"error"`|
|`sessionEnd`会议阶段`end`(当`is_background_agent`) (中文(简体) ).
其他一切 无效

电话的活动线来自原始的听众(`applyCursorRaw`: 亲子关系`preToolUse`这是
记录为克劳德`PreToolUse`(工具名称和输入,所以)`Shell`读"奔跑...",`stop`页:1`sessionEnd`作为`Stop`;儿童工具事件被跳过。

*有经验的人不需要你* 有经验的:`AskQuestion`没有工具钩( 无头)
和 TUI ); Cursor 自己的批准提示也没有钩子. 从事件里猜到一个会很麻烦
(第7条) 从窗格中检测到批准提示和询问框:
"NEEEDS你,SSH钩子和迷失停止"下面。

□ 5. 节点悬钩的交叉射击(测量)

带有匹配的 Claude 格式设置文件, Cursor 自行管理 Claude 钩子命令`sessionStart`页:1`preToolUse`页:1`postToolUse`(载荷密钥不变,`hook_event_name`骆驼 Case.
仅包含无匹配项的文件不被视为 claude-format( Cursor)`isClaudeFormat`需要一个`matcher`),但这个机器的`~/.claude/settings.json`拥有其他工具的匹配器条目,
所以节点的`claude.sh`这里每个光标节点都有火 ** 惯性:**`normalizeClaude`比较精确
PascalCase名称和每个捕获光标有效载荷的返回无效(钉在`normalize.cursor.test.ts`),而Claude原始的听众在任何关联或尾部写入之前返回
- 具有:`isCursorPayload`承认(`cursor_version`或`conversation_id`(没有克劳德)
有效载荷有两种)。 曾经记录`nodeContextSession.set(node, session_id)`经常是孩子的
编号,所以`pty:destroy`释放错误的会话, 并且母鼠的光标尾巴漏出( 被钉入)`src/server/agent-status.test.ts`成本:每场活动2 POST。 别把Claude的
事件名称比较。

□ 6. 安装器(`core/agents/hooks/cursor.ts`页:1

合并到共享نأ`~/.cursor/hooks.json`(真正的一个拿着另一个工具)`sessionStart`条目)`updateSettingsFile`(symlink-safe,锁定,模式保存,ENOENT-只创建):我们
记录附在五大事件之后 我们的作品被从其他任何事件中扫走
条目/ key surviveds, 一个无法解析或形状错误的文件被留下字节换字节, 第二行写
没什么 只有在那个地方`cursor-agent`已找到(PATH,然后`~/.local/bin`);一次靴子传球(无)
登录贝壳重新检测像agy). 删除只删除我们的条目, 并且从不创建文件 。 我们的
包含命令`.nodeterm/agent-hooks/cursor.sh`测试用的是临时目录,从来不是真正的家。

同意(问题744),`core/agent-integrations.ts`:安装器只运行一个`cursor`选择`enabled`就像其他探员一样`declined`运行`removeCursorHooks`,删除`cursor.sh`我们
两个技能来自`~/.cursor/skills`(准确内容收据;保存用户编辑的文件)。 永远
问 = 没有写, 没有删除 。

□ 7. 表面和没有做的事情

- 桌面版和服务器版:通过同意的生命周期(`installManagedAgentHooks`国家来自常态者,
和两个原始的听众 称一个共享`applyCursorRaw`(米,亚剂,活动线).
Mobile:状态镜是代理-不可知镜.
- 嘘:`RemoteHooks.installCursorRemote`(见下文"NEEDS You, SSH hooks and lost stop").
- 视窗:`installCursorHooks`无写( N)`'refused'`) (中文(简体) ). 命令为 POSIX sh, Windows
{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}一个非JSON的字节`preToolUse`拒绝每个工具
光标在机器上的会话。 远程安装器只针对POSIX主机.
- 自本节首次撰写以来加入:续会、薄荷、会场结束和模式清单
(“会议连续性”)、聊天/传输/文本链接和计数器、帆布控制、重命名和
亚剂("管弦等效"),使用药丸中的计划使用量(见"康定表"). 未加入 :
经常性(`/loop`),树枝(只有圆形).

□ 8. 设备核对表(未经核实)

1. 回答:互动还参加了TUI火灾`beforeSubmitPrompt`和`stop`(见"NEEDS You").
2. 国家`stop`有效载荷 :`completed`捕获(交互式子剂运行);`aborted|error`以及Esc是否发射过
3. 将 18 个事件流的故障(在一次无头运行中每次添加一个事件)分解。
4. 2026.10.01计量的"副剂行为",参见"管弦等效".
5. 答复:`/quit`火灾`sessionEnd`; 光标在`SESSION_END_CAPABLE`("会议连续性").
6. 答复:无论是 " TUI " 都无钩子; " 立即批准 " 和 " 问询 " 都从面板上读出。
7. 节点内的钩 turkeynment(描述背景为POST;预期小).
8. Linux 和 Windows: hooks.json 位置, (中文(简体) ).`cursor-agent`安装目录。

□ 型号和许可旗

测量`cursor-agent`2026.09.28-64d2043 (中文 我们不能不说这个). 光标在`MODEL_SWITCH_CAPABLE`和`PERMISSION_MODE_CAPABLE`; 翻譯中在现有资源范围内存在。`src/shared/agents/approval-mode.ts`(单位:千美元)`CURSOR_MODES`和`withAgentModel`输入`model-gateway.ts`。 。 。

哪里的旗帜去

编成的线路是`cursor-agent [flags] agent '<prompt>'`标记`agent`。 。 。`agent`是一个
命令子命令, 没有自己的选项; 其动作读取根程序的选项
(单位:千美元)`Ie()`这是`root.opts()`和根的图案,`--model`, , ( 他们)`--force`, , ( 他们)`--mode`无论他们在哪里
请坐 在 TUI 中测量( 不及时, 所以没有模型成本)`cursor-agent --model X agent`和`cursor-agent agent --model X`显示型号 X; 相同的`--force`("运行一切"),`--mode plan`一会儿`--auto-review`两位作曲家(`assembleLaunchCommand`, (中文).`core/agent-launch.ts`被钉住的
测试。

\\\ 模式表

* 节点模式 * * 释放 * 为何 Đi
|,|也.
|每问(`manual`QQ 光标的默认值是`approvalMode: allowlist`; 允许列表中的 shell 命令停止在“运行此命令 ?” 不在许可名单上"(计量)...                                   
自动( X)`auto`,默认值) QQ`--auto-review`QQ Cursor's Smart Auto:一个分类器自动运行安全呼叫和提示其余部分,形状与Claude相同`auto`2026.10.01测量:`touch`运行未提示,页脚"自动审查"征询. 这种变化中的游标船,所以没有现有的节征询器拓宽. |
*************************************************************************** ***************************************要求对************************************************************************************************求职********************************************
计划`--mode plan`QQ 度量的 : “ 创建文件 ” 提示生成了书面计划 (“ Ready to buil 就这样建立 ” ) , 没有文件 QQ 。
{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}哺育一下你`--force`QQ 量度 : shell 命令运行时没有所掌握的提示, footer "Run everything" QQ

仅`acceptEdits`显示于`unsupportedModesNote`。 。 。`--sandbox`是一个单独的轴而不是
触摸(cursor的沙盒默认关闭,所以Bypass的提醒不主张一个).`--mode ask`没有节点模式。

### 型号

`--model <id>`,引用`withAgentModel`。目录是`cursor-agent models`(约250人)
(d) 具有会计作用的IDs,`<id> - <label>`线条,有些末端有零宽空格。 光标在`OWN_MODEL_CATALOGUE`与grok:它从不接收网关的模型(`modelsForAgent`返回
无,转移目标保持平稳,网关默认模式不应用).

QQ 型号和权限: 未验证/ 未构建

1. 被替换:给予了光标现在的恢复,重启菜单的"Switch模型"列表`cursor-agent models`(见"会议连续性",模型). 调用菜单不变 。
2. 国家`--auto-review`仅在一个安全命令上测量(`touch`集中注意程序; 调用它的分类器仍然提示是 Cursor 的服务器边政策, 没有映射 。
3. 光标在未知情况下会做什么`--model`id没有测量。
4. 国家闺蜜`--model`在 TUI 中将 ID 添加到`modelParameters`页:1`modelSelectionHistory`输入`~/.cursor/cli-config.json`(见于真实配置);它没有改变保存的默认模式.
5. 模型可按每个账户的费率限制( "你达到了使用限度")`gpt-5.4-nano-none`(三)
错误来自后端 并证明旗帜到达它。

□ 转写、聊天视图和上下文链接

叶:`src/core/cursor-chat.ts`。测量`cursor-agent`2026.09.23和2026.09.28(macOS),反对
真正的聊天(a)`-p`使用 shell turn 和写/读/grep turn 运行,加上一个更古老的子代理聊天.

页:1`<config>/chats/<md5(physical cwd)>/<chatId>/store.db`时,`<config>`这是`$CURSOR_CONFIG_DIR`如同你所看到的一样`$XDG_CONFIG_HOME/cursor`如同你所看到的一样`~/.cursor`(CLI自己的规则).`<chatId>`是一个UUID:`--resume`ID 和 流 - json 语气`session_id`(情况平稳)
2026.09.28 还写了一篇`meta.json`侧车`--resume <id>`创建未知的 id`store.db`时间
一次( 元密钥)`0`=x JSON 与 (韩语)`latestRootBlobId: ""`; 只有新的 TUI 在任何转弯前退出
叶`meta.json`一个人,没有`store.db`。 。 。
该店为SQLite(WAL):`meta`键`0`=x(JSON)为`latestRootBlobId`和`name`· ;`blobs`这是
内容已涉及(sha256)。 根块是原生的`ConversationStateStructure`字段 1 列出
命令的模型文本消息的ID, 每个 AI- SDK 形状的 JSON blob (系统 / 用户/ 助手)
已取消`text`通过的指南`reasoning`通过的指南`redacted-reasoning`通过的指南`tool-call`/ 工具`tool-result`) (中文(简体) ). 输入的提示是`<user_query>`在用户文本部分中; 用户信件中的其他所有内容都注入上下文。 那个
根的字段 5 坚守`used / window`上下文符号, 计数符读取( “ Context meter ” ); 已校验
18335 / 200000 = TUI fower's 9.2%).
未使用 :`~/.cursor/projects/<slug>/agent-transcripts/<id>/<id>.jsonl`, , , , , , , , , , , , ,  , , , , , , , ,  , , ,                                                              ,       ,                        ,            ,                                                              ,                                  `[REDACTED]`,这个
没有工具结果,并丢失了失败转弯的用户行。

** 正在读。 ** 内建`node:sqlite`,只读(电42=节点24.19;`engines`楼层有它。 无新内容
依赖性。 严格由全UUID id找到;cwd只命令进行桶搜索. 没有cwd
倒计时,所以从不显示另一个聊天. 一页`olderCursor: null`最新16 MiB 信息
阅读。 压缩取代了模型上下文,所以不显示预共性转折.

* * * * 能够 * * * 桌面 * * * 服务器版 * * 移动 * * * SSH-remote节点 * * * *
|,|也.
QQ 我希望你和他谈谈`CHAT_CAPABLE`-是的,是的,是的,是的,通过中继`chat.page`QQ拒绝:"尚未支持"(`CHAT_LOCAL_ONLY`),从不使用本地磁盘 QQ
· 背景联系,双向`CONTEXT_LINK_CAPABLE`================================================================================================================================ 你肯定适用
* 转让来源(`TRANSFER_SOURCE_CAPABLE`(掌上电脑主机) \\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \等国语.1
将会议名称改为(`TITLE_READ_CAPABLE`* * * * * * * * * * *的唯一途径* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *杏奈* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * Nava * * * * * * *给予了* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **************

`get-linked-context`发现: 光标代理列表`~/.claude/skills/get-linked-context`它本身`<agent_skills>`(测量). 由于同意变更(# 744),每个代理人都拥有自己的技能
dir, 光标的复制到`~/.cursor/skills`(以下为"加拿大控制"). 作曲家的模型标签,努力,计划/问题
纸牌和`at`不支持时间戳。`/rename`已加入 Board`RENAME_CAPABLE`后("管弦平等").

□ 设备清单(未核实)

1. 钩子提供聊天id后在现场互动节点上的QQM(此叶假设节点的会话id是它).
2. 与很长的历史(关联)和一个超过16个小米B的交谈。
3. 光标自动命名后的标题芯漩涡(打印模式离开)`New Agent`) (中文(简体) ).
4. Linux和嚷嚷cwd桶的Windows路径的服务器版(仅依赖id扫描).

□ 背景计数器( $`USAGE_CAPABLE`页:1

资料来源:代理商OWN号码(CLAUDE.md规则6),而不是`stop`有效载荷`input_tokens`/`cache_read_tokens`(没有窗口) 该商店的根原生豆球场5是`token_details`{1 号
已使用  tokens, 2 max tokens}; 匹配 TUI 的`/context`,以及`max`每届会议各有不同(2000年00/
256000 / 3000000 / 1000000),所以它是读的,从来没有推断出来. 没有`max`没有计数器。 由一家商店阅读
读者(`readCursorStore`返回时`tokens`· ;`rootMessageIds`和`rootTokenDetails`分享一个原生生物
走进`core/cursor-chat.ts`) (中文(简体) ). 没有第二个SQLite读取器.

页:1`createContextTail`得到了一个选择,`readSource(path, lastKey)`,替换
(                                                                                                                                    谈判中       36                                                                          (                                   各派 为了使   有关该该该该该有关该该该有关该有关该有关该有关该有关该有关该有关该有关该有关有关有关该有关该有关有关有关该有关该有关该有关有关有关有关该有关有关有关有关该有关有关有关有关有关有关有关该有关有关有关有关有关该有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关该有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关该有关有关有关有关有关有关有关有关该有关有关有关有关有关有关有关有关有关谈判中有关该(有关有关有关 36有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关该有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关有关各派 为了使有关有关有关`readCursorContextSource`。 。 。 。`store.db`+ 键`store.db-wal`作为变换键(WAL在检查站之间不动Db文件),
然后商店只读数字,交给`cursorContextParse`作为JSON的一条线。 共享
1赫兹民意测验进行重读;光标钩事件(`trackCursorContext`只有定位和跟踪
存储,严格通过`conversation_id`(单位:千美元)`locateCursorChat`,只聊天根,全UUID). 说明:a
民意调查,而不是一个钩状的阅读器;如果STAT门曾经出现在一个剖面图中,则升级.

页:1 没有消耗有效载荷路径 :`transcript_path`命名已编辑的代理文本 jsonl 和
被忽略,所以没有什么可以扩大`safeTranscriptPath`唯一一条路就是定位器
建设`cursorConfigDir()`(荣誉)`CURSOR_CONFIG_DIR`页:1`XDG_CONFIG_HOME`) (中文(简体) ).

页:1`hasUsage`门`context.ensure`(现在a)`cursor`实例 :`locateCursorChat(id)`,没有cwd)
和搜索器 指数和本着寒冷的再造`readsClaudeTranscript`,对于光标(绑定)是虚假的。

|  Surface  Surface  Status  Status  Status  Status | |
|,|也.
* * * 桌面 * * 是: 原始听众`agentId === 'cursor'`输入`src/main/index.ts`; 确保通往`cursorContextTail`|
QQ 服务器版 QQ 是: 在同一分支中`src/server/agent-status.ts`(平等),`tailFor`输入`src/server/index.ts`|
QQ 移动 QQ 计数器会骑着共享的上下文镜( 代理- 不可识别); 而不是设备验证 QQ
yet  yet  yet  yet  yet  yet : 促进对 :     : : : : : : : : : : : : : : : : : : : : : : : : 嘱 : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :`ensureRemote`是终端`unresolved`从来没有这个机器的磁盘...

计划使用量在最低使用量避孕药中单独解读(`src/core/usage/cursor-usage.ts`,提供者`cursor`,默认情况下显示,设置 - > 用法切换)。 在光标剂2026.10.01-e373342上测量:
CLI的亲身经历`/usage`电话`aiserver.v1.DashboardService/GetCurrentPeriodUsage`(                                               基石                                                  (                                                                  并作为                                                                                         
贾森后`{}`继续`https://api2.cursor.sh`用登录的无记名符号。 使用的字段 :`planUsage.totalPercentUsed`(过去)`includedSpend / limit`CLI的倒计时`autoPercentUsed`, (中文).`apiPercentUsed`,以及`billingCycleEnd`页:1`billingCycleStart`用于重置和
图标。 证书是 CLI 的: macOS 登录密钥链( 账户)`cursor-user`,服务`cursor-access-token`,由`/usr/bin/security`所以用同样的二进制读取它不会
页:1`auth.json`(单位:千美元)`~/.cursor/`与`AGENT_CLI_CREDENTIAL_STORE=file`, (中文).`$XDG_CONFIG_HOME/cursor/`在Linux上, 我相信,`%APPDATA%/Cursor/`在Windows上). 只读, 从未刷新过; 符号仍在保存中
(只有服务名称在argv). 未签名、过期代币(401/403)或超过256 KB的答复
(读到停在那里,从未解析)=无行;网络或
5xx = 错误状态将同一登录的最后一个好数字保存最多一个小时. 未显示 :
美元支出、奖金信贷、按需使用(支出限额)、计划名称和企业账户
无`planUsage`. SSH主机:仅本地登录,无远程腿. 上下文表不显示模型
平等地位(商店根不便宜;流行乐省略)。
在dev应用上验证了活性:头部显示在TUI脚部使用的10.1%。
未经验证:本分支测试中读到的真品库(固定品被合成),设备上的Mobile.

□ 会话连续性( 重复、 薄荷、 会话结束、 重新启动、 模式)

测量`cursor-agent`2026.09.28 (macOS, tmux TUI, 项目级钩子日志). 一个有薪跑步
(共2.5),其余零成本.

页:1`--resume [chatId]`是带有可选值的ROOT选项: id必须直接跟随
这样吧`agent '<prompt>'`可能会跟随。 恢复为`cursor-agent --resume <id> [--mode/--force] [--model X]`(不迅速);旗帜约翰内斯堡标识的两边。 两个作曲家(约翰内斯堡)`resumeCommandWith`- > 简况`assembleResumeCommand`,以及`core/agent-launch.ts`将它射出,`cursor-launch.test.ts`和`agent-launch.test.ts`。 。 。

** 死亡身份是安全的。 **`--resume <unknown uuid>`打开一个空聊天,该聊天通过 id (exit 0, no)
错误; a`chats/<bucket>/<id>/`dir 出现) 哪一个? 所以,错误的ID 哪一个会花费历史,从来没有发射。

** 考虑`SESSION_ID_CAPABLE`,像副驾驶一样无条件。 因为一个未知的ID被采用,a
首次发射时新鲜的UUID IS 薄荷,没有型号调用: 'cursor-agent - resume <uid > [lags] agent
'<即时>`. Paid run: that exact line answered "pong" and `停下来` carried `{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}我对你说了些什么?`create-chat`(1.5 s, network ) 不使用: 它返回光标选择 id, 节点需要 id
发射证明了这一点 没有帮助探针:旗子是恢复已经需要的旗子,收养行为不是一种
探测器可以看见 已经存在的ID只是恢复(从来没有grok的"taken id"发射错误).
如果一个更古老的CLI忽略了未知的ID,节点会降解为钩子学习ID.

** 会议结束。`SESSION_END_CAPABLE`页:1`/quit`+ 输入火灾`sessionEnd`(也恢复)
聊天`normalizeCursor`将其映射到`sessionPhase: 'end'`(当`is_background_agent`),以及`sessionEnd`添加到`CURSOR_HOOK_EVENTS`:列表为惰性,每个退出将读作
DROPPED崩溃,没有订阅. 现有安装在下一个安装器通过时获得.

** 在原地重新启动。 **`EXIT_SEQUENCES.cursor = '/quit'`(空虚). 输入为 SIPARATE 写入( 150 ms)
拆分, 作为打开代码 : text+ 未提交一个写入 。 Ctrl-U (英语:`KILL_LINE`龛 ) 清除半型
光标 TUI(测量)中的草稿。 该`/quit`同时等待`EXIT_KEY_GAP_MS`(150毫秒) 之后
Ctrl-U+:从一个私人的tmux,Ctrl-U+中从2026.10.01到".`/quit`在一次爆炸中,然后输入150毫秒后
使CLI运行 10 。`/quit`- Ctrl -U, 150毫秒,`/quit`, (中文).
150 ms, Enter返回到10号壳的10号壳. 适用于每个`submitsSeparately`探员 重新启动拒绝`working`和`blocked`(核准表报告Cursor的核准情况为:`blocked`,见"NEEDS You"。

** 重新发射清除出口。 ** 我们自己的`/quit`火灾`sessionEnd`,记录`sessionEnded`,以及`--resume`不,没有`sessionStart`因此,一旦节点发送自己的恢复线(即重新启动),
暂停/ Eco wake, 冷藏器重启一个模式切换器循环进入, 节点退出`sessionEnded`本身(`performResumePhase`因为`onResumed`和冷藏的送货`TerminalNode.tsx`) (中文(简体) ). 没有它,聊天作曲家 和电话拒绝运行的CLI
"退出"直到其下一个回合.

** 模式。 **`cursorModelsFrom`剖析`cursor-agent models`(单位:千美元)`<id> - <label>`零宽空格
剥离;246行中的246行匹配,标题和提示被忽略)`{id, name}`探测:`core/cursor-cli.ts`(单位:千美元)`registerCursorCliIpc`,在两个弹壳中),被纪念,一个失败/空的探测器被重试,无法打开[].
频道镜像grok的:`IPC.cursorCliCaps`, (中文).`window.nodeTerminal.cursor.cliCaps()`(预装,ws-bridge,
Stub),渲染器备忘录`ensureCursorCliCaps`页:1`cursorCliCapsNow`温暖的靴子, 和“ 模型ForAgent(...,
由Canvas提供光标模型。 此点亮了光标的重启菜单的“ 开关模式 ” 。

** 黄金再现:没有建造。 **`transcriptExists`页:1`shouldProbeTranscript`只能是圆形的,而且
其频道上没有代理参数; 商店定位符( E)`locateCursorChat`严格地说,可以回答,
但死神的行为使得它没有必要: 缺少的聊天会恢复到空闲聊天中, 在同一下
而不是像克劳德那样失败 唯一的损失是"失会"通知.

* * * * 能够 * * * 桌面 * * * 服务器版 * * 移动 * * * SSH-remote节点 * * * *
|,|也.
+ 恢复 / 冷恢复 / 重启 / 薄荷 + yes + yes( 核心 + 共享 作曲是吗 ) + N/A + 钩子通过`installCursorRemote`(b) 电方面也提供一种;
QQ 会话结束( DROPPED 芯片) QQ 是 QQ (正态器共享) QQ状态镜 QQ 钩子通过`installCursorRemote`从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从协调一致地从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从并行从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从 反对从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从`sessionEnd`未经核实
|模版目录 |是 (IPC) |是 (WS-RPC处理器) |N/A |列出此机的账号 |.

QQ 未核实( 设备清单)

页:1`sessionEnd`Ctrl-C上两次,SIGT`/quit`页:1
2. 使用较老的光标代理人的薄荷,该代理人可能不会采用未知编号。
3个`sessionEnd`子代理聊天( C)`is_background_agent`只有护旗,从来没有见过真实的).
4个`--resume <id>`在真正的聊天在重启内部有历史之后,包括Switch模型路径.
5. 视窗`cursor-agent`argv 用于恢复( 组合器固定, 永不运行) 请问 。
6. 帐号开关下的模型清单(每个过程的记忆)和离线。

□需要你,SHH钩子和迷路

测量`cursor-agent`2026.09.28-64d2043,交互式TUI在私人tmux,项目层面
钩子记录器,4型运行(composer-2.5).

需要你吗?`core/agents/cursor-approval.ts`) (中文(中国大陆)

案件 钩子事件 盘子
太棒了,别这样
*****************`preToolUse`(:`beforeShellExecution`,然后安静... ...`Run this command?`页:1`Not in allowlist: touch`页:1`→ Run (once) (y)`. . . .  ....`Skip & tell the agent what to do instead (esc or n)`; 工具行`$ touch x Waiting for approval...`页: 1
QQ MCP 工具 QQ`preToolUse`(单位:千美元)`MCP:ping`向它们提供的帮助`beforeMCPExecution`,然后安静... ...`Run this MCP tool?`页:1`→ Run (once) (y)`.  ....`Skip (esc or n)`|
|批准(y)或跳过(n) |`postToolUse`用于同一项目`tool_use_id`(也跳过),那么`stop`QQ 对话框不见了 QQ
QQ 文件写入( 默认模式) QQ 无对话框: 自动批准 QQn/a QQ
QQ Ask Question (再次测量 2026- 10-04, 6 跑) QQ 显示、 回答( Enter) 或 跳过( Esc) 时没有工具钩: 之后`beforeSubmitPrompt`仅限`afterAgentThought`直到转弯`stop`,在回答后20到55秒,状态`error`在每次运行中( 打印窗格)`WritableIterable is closed`)QQ在窗格底部的边框:一个标题(模型自有,例如.`Color preference`,或默认`Clarifying Questions`/ (中文(简体) ).`Question 1 of N`页:1`1. <question>`页:1`› [ ] Red`. . . .  ....`[ ] Other: (type to answer)`/ 页脚`↑/↓ option · ←/→ question · Space select · Enter next/submit · Esc to skip`(在60列的两排上) 回答或跳过,它作为摘要保留(`AskQuestion <title> (1)`和`[x]`页:1`[ ]`无页脚的行

规则:光标`preToolUse`谁`tool_use_id`没有`postToolUse`页:1`postToolUseFailure`之后
1.5 s 读取面板(`ptyManager.captureSession`,以`probeWithin`),在4s重审.
10 s (中文(简体) ).`CURSOR_APPROVAL_READS_MS`),因为dev app的首次读取是在对话框绘制前运行的. 如果最后的30个
非空白线从捆绑的`decision-logic.ts`(单位:千美元)`Run this command?`提供技术咨询,`Run this command outside the sandbox?`提供技术咨询,`Run this MCP tool?`提供技术咨询,`Delete this file?`,`写给这个
档案?`, `看这个文件?`, `允许此网页搜索吗 ?`, `允许此网页获取吗 ? ) 之后有一个选项
结束于`(y)`,钩状服务器发送`blocked`在同一个听众 每一个钩子事件。 下一个
事件(`postToolUse`关于y/n,`stop`换成Esc 没有待决工具 = 没有计时器, 没有读取; 最多三个读取
每个电话和一个`blocked`每个对话框( 读取同一对话框的第二个待调), 所以蛊惑
久经批准的命令从不执行`stop`页:1`beforeSubmitPrompt`页:1`sessionEnd`把节点的电话放下
并关闭或再循环该节点释放它们(`hookServer.releaseCursorNode`,两个贝壳,所以读
仍然在飞行中无法带回一个删除的节点, 因为`blocked`一个节点在飞行中最多能捕捉到一个
跨回合、 发布和替换会话: 未读时的读数被跳过( 绝不)
手持读数的快照, 这可能是另一个转折的) 和它的下一个插槽读取新鲜。 即为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为被为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为
超时读取停止节点的读取直到下一个转 文件边缘: 重试一个无法读取的页纸堆栈 ssh
儿童(`pane-probe.ts`) (中文(简体) ). 只有母事件为节点的会话命名: 任何带有`generation_id === conversation_id`是孩子的,从不把它的ID借给一个合成事件。
无副代理`sessionEnd`在任何捕捉中都可以看到(三个子代理运行加上审查员);
亲子关系`sessionEnd`还有`generation_id === conversation_id`,所以不能告诉两人
如果有一个孩子在适当情况下出现(未经证实),

** 代理电话**`isCursorChildToolEvent`编号 :`generation_id === conversation_id`被监视。
测量于2026.10.01 (私人 tmux, a Task/explore child 运行“ find . -name *.txt” QQ sed...) .
排序`): the child's `工具预用` Shell drew `运行这个命令?` / `不在许可列表中: 找到、 sed、 排序 ` /`→ Run (once) (y)`当父母转身还在工作时, 手表发出`blocked`1.5 s 后与 PENT 的聊天id(从节点的母事件中记住;如果没有的话省略)
从来就不是孩子的, 这会取代节点的复式ID。 正常程序程序将孩子丢弃
事件,所以孩子的`postToolUse`(计量`y`,用于`n`+ 空的“ 说代理人” 行)
使表发出`working`它本身。 父亲的`Task`电话没有被监视 : 它永远没有`postToolUse`,并观看它先抓住了孩子的对话,并释放了重复`blocked`(测量在固定之前).

** 计划模式。 ** 计量(`--mode plan`:转弯以.`stop`状态`completed`,然后是窗帘
显示`Ready to build?`页:1`→ 1. Yes, build locally (b)`页:1`2. Yes, build in cloud (c)`/`3. 不,提议
变化(p或ESC)`. A parent `停下来` with status `因此,这三件武器是:`Ready to build?`仅后面的选项行结束于 a`(key)`提示和框边框(必须是
发音`blocked`正如克劳德的"退出计划模式" 目标严格:答案
盒子留在笔录里 大楼是自己的`stop`读上三十行(量度).`b`没有火`beforeSubmitPrompt`; 该建筑的第一个父`preToolUse`结束块( a)`Task`常态化为`subagent-start`没有`working`,所以表发出`working`)并取消读数。 费用:
在每个完成的回合后,计划模式或非计划模式下,最多可读到三个面板。

** 问题。 ** 盒子没有钩子(表上),所以手表上挂着相同的边框读数
静静的转弯:`beforeSubmitPrompt`和每个工具的帖子(孩子也是,因为
亲子关系`Task`父母可以问孩子这几个人是否已经头衔)`preToolUse`取消它们( 一个工具正在运行) ,`stop`页:1`sessionEnd`释放他们`cursorQuestionIn`匹配
框按结构,而不是标题(标题是模型的):页脚结束`Esc to skip`必须是
下边框上最后一行,带有`Question N of M`列和一个选项行( E)`› [ ] ...`, (中文).`[x] ...`上面,所以在记录中留下的答案摘要是完全不匹配的(衡量:下一个)
转弯的第一读看到,没有。 匹配输出`waiting`,什么克劳德的询问用户问题
常态化为( NEEDS You, 电话中的问卡, 聊天发送和代理消息被拒绝) 。 这个
下一个父工具事件替换它( N)`working`;表本身发出它之前一个`Task`也一样`stop`(单位:千美元)`done`, (中文).`errored`计量的`error`页:1 直播重立足于( 真实的钩子日志, 真实的 tmux)
窗关`createCursorApprovalWatch`: 1.5秒读数两次都错过了盒子,4秒读数被捕获
这个 成本:在任何转弯处,每个1.5与邻国或更多的静空段最多可读3个面板。

* Surface * * 桌面 * * 服务器版 * * 移动 * * SSH铲除节点 * *
|,|也.
需要你批准 和在问询框是的(`hookServer.setPaneReader`发展中国家和转型期经济国家 ==========================================================================================================`captureSession`在控制 Master 上读取远程 tmux( 每个读取一个 ssh 的孩子) QQ
坎班卡、芯片、 đã卡`cardBadge`页:1`chatSendRefusal`读`blocked`每名特工都一样 都一样
QQ 聊天发送/ 代理信件被屏蔽时拒绝 QQ`chatSendRefusal`=`dialog`· ;`decideDelivery`=`targetBusy`一样的 一样的 一样的

限制 : 问题框在上次钩子事件( 最后一个读数) 后第一次绘制 10 s 以上 。
线段)将节点保留在运行中;在解答后,节点需要你,直到转弯
下一个钩,20至55 s 后期测量(`stop`)),因为没有任何东西标志着答案本身. 那个
除了 shell 和 MCP 之外,其他标题都是捆绑读物,没有在窗格中看到. 未计量:`p`计划
中外合作 中外合作 中外合作 中外合作 中外合作`beforeSubmitPrompt`) (中文(简体) ).

SSH 钩子安装器`RemoteHooks.installCursorRemote`页:1

`cursor`左边`LOCAL_ONLY_HOOK_AGENTS`这样`--after`接受从从从从的各项活动从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从的两项从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从 从从从从从从的各项活动从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从的两项从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从
连接, 仅在主机有的地方`cursor-agent`(单位:千美元)`command -v`,或`~/.local/bin/cursor-agent`,该
假如您没有使用驸马,请写`~/.nodeterm/agent-hooks/cursor.sh`(stdin),然后合并为
主持人的`~/.cursor/hooks.json`与本地安装者纯度的`applyCursorHooks`结束`updateRemoteSettingsFile`(内容高于 stdin, 锁定目录, 其他工具的条目保存, 无法解析)
文件左键字节,第二个运行不写字). 命令持有`//`以前被拒绝
任何东西运行。 在真实中测试过`/bin/sh`对抗假主机树
(单位:千美元)`remote-cursor-hooks.test.ts`) (中文(简体) ). 它只在主机的同意计划安装时运行`cursor`我们应该知道:
它将我们从主机的条目 但现在`~/.cursor/hooks.json`(单位:千美元)`stripRemoteSettingsFile`, (帮助)
从不创建文件)并删除`cursor.sh`。它的技能走向`~/.agents/skills`,一个根
捆绑负载(在主机上未验证).

###  Lost  Lost

中转网络重新连接`stop`(测量,波1). 无新定时器:镜像`sweepStaleWorking`和铸造者`sweepStaleWorking`两者都匹配`state === 'working'`(单位:千美元)
任何代理,所以光标节点丢失`stop`转弯`done`之后`WORKING_STALE_MS`(20分钟)
时 边 边 边 尔 尔 尔 尔 尔 尔 尔 尔 尔 利 尔  尔 尔 殆 尔 尔 尔 尔 尔 尔 尔   consistent 尔 时 尔 尔 尔 时 尔 尔 尔 尔 尔 尔 尔 尔 尔 尔 尔 尔  尔  尔 尔 尔 尔 尔   尔 尔 尔 尔   尔       尔       尔             尔                           尔                                                                                `cursor-approval.test.ts`) (中文(简体) ).`blocked`设计上没有被扫荡(一个人可能采取
它的清除事件是`postToolUse`页:1`stop`同一转弯。

QQ 设备核对表( 未验证)

1. 真实画布上的光标节点:需要贝壳对话框上的你徽章、鸣笛和电话卡;
回到你的运行。
2. Linux host over SSH:安装土地,钩火穿过隧道,远程窗格读取匹配.
3个`Run this command outside the sandbox?`写/删除/读/网络对话框:
标题文本和 a`(y)`选项。
4. 一个非常长的命令预览,将标题推到30行窗口上方(将降解为RUNNNG).
5. 两个平行工具呼叫获得一个批准:另一个呼叫`postToolUse`返回徽章为
在对话框尚未打开时运行( 没有重读 ) 。
6. 真实画布上的光标节点:需要您和电话上的询问卡
框中; 在 Esc茁壮成长后或答案之后完成`stop`。 。 。

□ Orchestration 等值(扫描控制,子剂,重命名,循环)

测量`cursor-agent`2026.10.01-e373342(工作期间自2026.09.28起自动更新),
macOS, 在一个私人 tmux 服务器中的交互式 TUI, 用项目抓取工作空间`.cursor/hooks.json`十项事件的日志(包括:`subagentStart`页:1`subagentStop`) (中文(简体) ). 五个模型转弯
(编-2.5). 固定线 :`src/shared/agents/__fixtures__/cursor/subagent-payloads.json`。 。 。 。

控制罐头`CANVAS_CONTROL_CAPABLE`页:1

呃... 成员是整条线,就像杂耍:`NODETERM_CANVAS_CONTROL`(单位:千美元)`buildPtyEnv`, (中文).`remoteHookEnvArgs`并让`controlRouting`/ 服务器厂接受光标源 。 发现:
请求列出例证,光标命名`~/.claude/skills/manage-nodeterm-canvas/SKILL.md`和`get-linked-context`。捆绑会按此顺序装载技能使之能够:`~/.cursor/skills-cursor`(内置),`~/.cursor/skills`, (中文).`~/.claude/skills`, (中文).`~/.codex/skills`, (中文).`~/.agents/skills`,插件; 三个
第三方的根由门`thirdPartyExtensibility`( CLI 默认打开; 团队设置可以打开
关了). 陷阱:光标 TRUNCATES 长技能列表(此处省略了"52个额外技能"),来自
尾巴。 。 。`~/.claude/skills`坐在第三,所以它活了下来;一个有几百个用户`~/.cursor/skills`可以把它推出来。 从744年起 技能被写进`~/.cursor/skills`在光标下
同意(`skillRootsFor`)),它也使画布控制在Claude被拒绝时继续工作. 那个
副本尚未在动态会话中计量;`~/.claude/skills`复制( 当 Clude 启用时) 是 。

副代理人(`SUBAGENT_CAPABLE`页:1

3次运行( 2次内置)`explore`,一个习惯`.cursor/agents`子剂),所有相同:

事实 事实 事实
|,|也.
|`subagentStart`页:1`subagentStop`从未被炒鱿鱼,
父亲`Task`工具 QQ`preToolUse`(与`tool_input.subagent_type`, (中文).`description`, (中文).`prompt`)和无`postToolUse`|
儿童工具活动`conversation_id`=`generation_id`= 儿童聊天号码;没有`parent_tool_call_id`* ;`transcript_path`在实施第一个工具使用前,
命令 QQ同步 : 每个孩子活动在父母之前降落`stop`|
任何悬钩有效载荷里都没有钥匙 这孩子`store.db`元已经`subagentInfo {parentAgentId, rootParentAgentId, toolCallId, typeName}`· ;`toolCallId`==  parent`Task`因为`tool_use_id`|
刊物`<config>/projects/<slug>/agent-transcripts/<childId>/<childId>.jsonl`结尾`{"type":"turn_ended","status":"success"}`; 经常使用助理文本`[REDACTED]`|

因此:`normalizeCursor`转动父母`Task`工具预用`subagent-start`(键`tool_use_id`,(a)  有什么问题?
并返回一个子工具事件的无效值( E)`isCursorChildToolEvent`: `生成' 。
(原始内容存档于2018-09-29). interviews id. 该规则还确定了一个真正的错误:用于驱动50岁父母徽章的儿童事件
将节点记录的会话id(复写id)替换为孩子的。 末端和现场尾巴 今年
住在 ONE 核心帮助器 双壳调用(`core/cursor-subagents.ts`, (中文).`createCursorSubagentTracker`:
父亲的`stop`发射`subagent-end`每一个任务都打开 难道一个孩子被跟踪
(单位:千美元)`subagentTail.trackFile`+ 键`createCursorSubagentFormatter`在JSONL之上,`<config>/projects/`) 当节点的开放任务中,一个没有被请求。

平衡,说明:总部`-p`运行有`generation_id === conversation_id`在自己的工具上
事件(2026.09.28 抓获),所以他们现在读作孩子的,却一无所获。`beforeSubmitPrompt`页:1`stop`所以那些事件只是点燃了 跑步的警徽 没有任何证据
平行 任务获得牌但没有尾巴( 注: 读取 kid meta's`toolCallId`(第2条)。 页:1
丢失`stop`(网络重联)将牌留给共享`WORKING_STALE_MS`腐烂。 一个节点
封闭式或回收式的中期任务释放其条目和儿童尾巴(`tracker.release`,两者均打电话
炮弹"`releaseNodeTails`) (中文(简体) ). 没有
已订阅 :`subagentStart`页:1`subagentStop`(从未开火;`subagentStart`这是一个游戏事件,所以
订阅只是风险)。

### 重命名 (`RENAME_CAPABLE`页:1

`/rename <name>`是一个本地 TUI 命令 (`agentStore.setMetadata("name")`没有模式呼叫,没有钩子)
和土地在商店元a`name`读取的腿( 各位)`TITLE_READ_CAPABLE`)已经读了,所以读了。
写好 节点一拍`sendText`(粉碎的粘贴并输入 ONE tMux)
援引) 左`/rename x`在作曲者中不提交; 同样的面条后面是赤裸的
输入为第二次引用重命名为聊天( meta)`name`页:1 ┮`SEPARATE_SUBMIT_AGENTS`(单位:千美元)`submitsSeparately`:`PtyManager.sendText`粘贴,然后发出一个赤色的输入,直到粘贴之后
成功, 每个节点一次交易 。 探员`send`页:1`reply`信封也是一样 那个
经纪人来自`create()`或,在节点重新启动后挂载之前,工作空间记录为每次
安置同意。 批准、 问题或计划提示已上屏幕时不会写( an
信封回复`targetBusy`页:1`blocked`,可重试);粘贴后打开的
进行监督:`pasted-not-submitted`,信封报告`stalled`) (中文(简体) ). 空抓取不是对话框 。
已知的限制 : 在挂载拆分之前, 信任记录 。`agentId`,所以一个共享的项目文件命名`cursor`对于一个不是Cursor的面板 得到分裂。`pushSessionRename`发送一个普通的行。 内置`rename-chat`技能由模型驱动
(单位:千美元)`cursor-app-control.rename_chat`,不在CLI中),没有使用.

循环( X)`RECURRING_CAPABLE`: 没有加入

`/loop 2m <task>`读`~/.cursor/skills-cursor/loop/SKILL.md`(a) 联合国`preToolUse Read`)并提议
贝壳`while true; do sleep 120; echo 'AGENT_LOOP_TICK_<purpose> {...}'; done`(a)`预先使用工具'
Shell ' ),在允许入境时立即停止,遭到拒绝。 因此,SETUP有一个信号(即:
发送器`AGENT_LOOP_TICK_`页:1`AGENT_LOOP_WAKE_`以贝壳为首的命令,但有滴答,折成圆形,
循环的结束从未被测量过 卡片计数转弯,它从未见过 这将是一个猜测。

* * 能力 * * 桌面 * * 服务器版 * * 移动 * * SS的意愿节点 * *
|,|也.
QQ Canvas 控制 QQ是 QQ是 当它的画布控制被启用 QQ N/A 与主机相同的技能通过`installCanvasControl`; 未验证光标QQ
|  Sub  Sub  Sub | | | | | | |`src/server/agent-status.ts`) QQ N/A(卡片只为渲染器) QQ卡片来自`installCursorRemote`钩子; 无活尾( 儿童商店在主机上) QQ
重命名推是是是(同样的渲染器路径,`sendText`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}我抨击你 {\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH咩?`sendText`控制主机; 标题 URE 专为 URL 的 URL 。

QQ 设备核对表( 未验证)

1. 一个节点的第一转弯是否作为`cursor-agent agent '<prompt>'`携带“ 生成  id”
{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}我对你说`? If it equals (like `会话开始`), that turn's tool events and a `任务`
落在其中,`beforeSubmitPrompt`页:1`stop`) (中文(简体) ).
2. 具有背景的副剂`SubagentRunState.backgrounded`在捆绑中存在:其卡片结尾为
父亲的`stop`当它仍然运行。
3. 平行任务一并进行(预期卡,无尾巴)。
4. 转动札记时重命名, 当作曲者仍然持有文本时重命名 : 在此抓取
作曲家 KEPT  操控长的提示键`send-keys -l`在它提交之后,下一个键入
线条附在后面。 节点的粘贴路径是否让作曲家空空
(重命名测试先清除).
5. Canvas控制结束于真正的光标节点(`nodeterm.sh list`(从代理人处).
