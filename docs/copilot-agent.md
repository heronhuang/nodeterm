> English: [docs/en/copilot-agent.md](./en/copilot-agent.md)

# GitHub 副驾驶 CLI 代理支持

副驾驶是内置的底盘 其一体化以同样的登记和能力为基础
和每个其他特工一样 都有自定义的特工`baseAgent: 'copilot'`继承其图标,
发射/恢复语法,钩子,帆布控制,以及没有渲染器业已允许的模型门道映射.

□ 核实的合同

以下内容与已安装的副驾驶CLI 1.0.80和GitHub现任官员核对
CLI 参考 :

- 怎么样?`copilot --interactive <prompt>`打开普通交互式 TUI 并提交初始提示;`--prompt`是非交互的,并在反应后退出。
- 怎么样?`--session-id=<uuid>`创建一个可调用的会议,`--resume=<uuid>`恢复它,`/exit`干净地回到壳里,和`--model`(或`COPILOT_MODEL`)选择启动模式,
包括BYOK模式。
- BYOK模式启动通过`COPILOT_PROVIDER_BASE_URL`. 实施工作还`COPILOT_PROVIDER_TYPE`, , (中文)`COPILOT_PROVIDER_API_KEY`, , (中文)`COPILOT_PROVIDER_MODEL_ID`,以及`COPILOT_PROVIDER_WIRE_MODEL`; GPT-5- 家庭 OpenAI 模型使用`COPILOT_PROVIDER_WIRE_API=responses`如CLI要求的那样。
- 用户钩是合并的`$COPILOT_HOME/hooks/*.json`(默认)`~/.copilot/hooks`。 PascalC后代。
事件别名释放出蛇  case 有效载荷节点的共享悬钩运输预期.
- 全球指示现场直播`$COPILOT_HOME/copilot-instructions.md`。 。 。

主要参考文献:

- <https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-programmatic-reference> (中文(简体) ).
- <https://docs.github.com/en/copilot/how-tos/copilot-cli/custificize-copilot/use-byok-models> (中文(简体) ).
- <https://docs.github.com/en/copilot/reference/hooks-reference> (中文(简体) ).
- <https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions> (中文(简体) ).

□ 模式网关映射

用户输入一个网关根并选择一个环境可变名称(长期为`${env:VAR}`)或保存在受保护的本地存储器中的仅写字形密钥. 发现者称
OpenAI 兼容`<root>/v1/models`结束点——双方通过的OpenAI模型 API公约
LiteLLM和Bifrost——同时发送无记名证书和Bifrost的`x-bf-vk`兼容头 。
在任何经认证的请求之前, 无法获取的证书失败 。 那个
下面的供应商发射路线具体是目前的Bifrost布局. 对于一个选定的副驾驶
模式 :

- 怎么样?`anthropic/<model>`使用 70. 使用提供者类型`anthropic`,基础 URL`<root>/anthropic`,内部型号编号`<model>`和电线模型`anthropic/<model>`。 。 。
- 所有其他供应商的前置模式都使用供应商类型`openai`,基础 URL`<root>/openai/v1`,一个
无前缀的内部标识,以及原始的提供者-前缀 一切线标识.

启动和恢复命令也通过`--model <internal-id>`当然 提供者元数据
变量不会取代 Copilot 的启动选择, 而普通的本地重启重用
已存在的外壳环境。 旗子必须匹配`COPILOT_PROVIDER_MODEL_ID`; 提供者前缀
网关 ID 仍在`COPILOT_PROVIDER_WIRE_MODEL`。 。 。

副驾驶 BYOK 并非仅仅因为网关设置存在而启动: 必须选择一个模式
那个节点先。 这保留了普通的GitHub副驾驶路由,用于未触动的节点. 模型变化
停止代理机的前置处理组, 循环 tmux 会话, 然后冷处理相同
新环境下的副驾驶会话; 密钥永远不会键入窗格中 。

□ 状态钩

节点拥有`nodeterm-status.json`在副驾驶的钩子目录中写下被保护的共享
脚本到`~/.nodeterm/agent-hooks/copilot.sh`它注意到:

- 会话开始/结束;
- 用户提示、预处理、后处理和故障处理活动;
- 转弯完成(`Stop`(三)
- 封闭式通知类型`permission_prompt`和`elicitation_dialog`曰如何是可利用.

在Windows上,每个条目还带有一个`powershell`键——一个副驾驶运行在那里——指向`~/.nodeterm/agent-hooks/copilot-hook.cmd`结束`<abs cmd.exe> /d /c call "<wrapper> "`; 联合国
包装器为 W通过关于 Windows 的 Git 找到`sh.exe`运行相同`copilot.sh`从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从都将从从从从从خ从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从`bash`保存, 并使用 SSH
主机的文件永远不会得到密钥 。

`PermissionRequest`故意不安装,因为它是一个可以改变的决定钩
授权。`ErrorOccurred`被省略,因为可恢复的错误可以在转弯前发生
继续。 不明通知是无线的 防止粘性需要你徽章

□聊天视图(QQM)和电话的聊天屏幕

`src/core/copilot-chat.ts`阅读会话日记,`<COPILOT_HOME>/session-state/<sessionId>/events.jsonl`1.0.88 通过运行
BYOK模式中真实的CLI与本地假的OpenAI兼容服务器(因此所有内容都是合成的):
联合国`Stop`钩子`transcript_path`文件名称, 节点计数器`--session-id=<uuid>`名称
它的目录, 日记仅为附件 JSONL( compact 附加)`session.compaction_*`事件而不是改写)。 它像Claude的笔录, 和中继服务电话
同页。 记录规则和黄金固定装置在`src/shared/chat-fixtures/README.md`("副驾驶").

不支持: 远程( SSH) 奠定了副驾驶节点( 日记在主机上, 没有远程阅读器)
然而,所以面板这样说 而不是读这台机器,推理与各国一样,`effort`(无)
),计划/提问答题卡,以及作曲家的模型/努力标签.

** 速记包不读`~/.copilot`∗∗∗ 载于E/CN.4/Sub.2/2002/L.10号文件。`snap/copilot-cli`套装`HOME=$SNAP_USER_COMMON`(单位:千美元)`~/snap/copilot-cli/common`),因此,一个速成的副手就是它的钩子,指示和会话
状态`~/snap/copilot-cli/common/.copilot`。聊天阅读器也检查根,但是
状态钩子节点安装到`~/.copilot/hooks`从来没有看到过: 快速副驾驶节点
报告协调行动, 并且没有挂勾会议段 ID( 因此桌面 QQM 返回到下调输出)
浏览;电话仍然通过薄荷ID读取. 和Codex的同级`CODEX_HOME`复图. npm/安装标记副驾驶不受影响.

□ 设备核对表

这些要求需要经过认证或真实的网关支持的会话,而该股没有行使
套间 :

1. 启动经认证的副驾驶节点,并启动一个初始提示;验证互动的TUI行为和
此会话开始/ 使用程序 Submit/ stop 更新画布徽章并坚持会话 ID 。
2. 触发一个快速许可和一个`ask_user`诱导; 验证工作需要
并且信息/通知不会产生徽章。
3. 选择 OpenAI Bifrost 模型,运行一个工具使用回合,切换模型,并验证同一会话
恢复通过`/openai/v1`使用提供者前置的电线模型。
4. 通过Anth以及其他有关方式重复使用Anthropic模型`/anthropic`,包括一个工具呼叫。
5. 重复一次1-4次关于一个SSH项目,该项目的性能`COPILOT_HOME`与`~/.copilot`; 验证双钩
文档和`copilot-instructions.md`位于主机报告目录下。
6. 基于 Copilot 创建自定义代理并验证其基本图标, 启动/重现行为, 钩
状态、帆布控制和模型切换都符合内建内容。
7. 在赘写工具使用回合后登录的副驾驶节点上的QQM:用工具芯片迅速、回答、工具芯片
结果,一个被拒绝的工具`Error:`结果渲染; 向上滚动旧历史页; 翻转
进步刷新直播. 从电话的查特屏幕重复到中继器。
8. SSH项目中副驾驶节点的QQM显示"读取远程 GitHub 副驾驶会话
记录稿还没有被支持",没有再试,也从来没有本地对话.
9. 视窗:`nodeterm-status.json`条目同时包含`bash`和`powershell`; Windows 使用 Git 键
安装了转动翻转运行 ~ IDLE 和一个权限快速翻转需要您(即副驾驶确实需要)
运行`powershell`在PowerShell下 包装的引用能幸存下来 没有
Git 没有钩子错误的转弯 徽章一直不明
10. Windows:从一个副驾驶节点运行`& "<userData>\canvas-control\nodeterm.cmd" list`(线条)
金色的画布技术,现在给它。`--prompt "two words"`打开,两个都完好无损
