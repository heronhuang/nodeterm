> English: [docs/en/agent-integration-consent.md](./en/agent-integration-consent.md)

# 代理-合并同意

第744期(重述被取代的900号草案). 用于写入每个代理CLI的节点
每次发射时用户拥有的全局配置,并连接到每个SSH主机,没有
无法拒绝:状态悬钩在`~/.claude/settings.json`中 边`~/.gemini/settings.json`中 边`~/.codex/hooks.json`+ 键`config.toml`信任, grok/copilot/ 打开码/
反重力钩文件, 和 ~17 KB 画布控制+上下文链接指令合并为`~/.codex/AGENTS.md`, (中文).`~/.gemini/GEMINI.md`,副驾驶和开码指令文件。 代码
单是块就拿了17,102字节的代码32 KiB`project_doc_max_bytes`预算,挤出
用户自己的仓库指令。

□ 型号

`settings.agentIntegrations`(中文(简体)团结起来)`src/shared/agent-integrations.ts`),可手工编辑和消毒于
每个读数 :

====================================================便是===================================== (===========================================================
|,|也.
|`agents[<id>]`|`enabled`页:1`declined`使用此机的代理人; 缺席 = 从未要求 ===
|`hosts[<user@host>]`QQ 每个 SSH 主机; 键入`sshHostKey`只有,所以编辑身份文件,端口或额外参数保留答案QQ
|`hostDefault`QQ 未输入主机的答案; 设置为`enabled`只通过祖父 QQ
|`origin`|`grandfathered`(从此特性之前安装)或`asked`|
|`noticeDismissed`爷爷的一次性通知被解除了

每个剂的生命周期(`src/core/agent-integrations.ts`被两枚炮弹击中 在这之前

- ** 启用**:安装/更新状态钩和两种技能(canvas控制、上下文链接)
将旧的标记块剥离 合并到全球
指令文件。
- **declined**:删除节点所写的确切内容——通过精确命令匹配的钩子条目(用户的)
自有钩子幸存),技能文件通过精确内容接收(用户编辑的文件被保存,
在设置中列出),遗留块,我们的钩脚本.
- 未经决定**:任何方向都没有。

服务器版`installHooks: false`否决权比一切选择都强。

□ 默认已存在的 vs 新安装( 产品决定 —— 确认)

- ** 现有安装按启用方式进行。 ** 证据只是我们自己的档案:一个非空的`~/.nodeterm/agent-hooks/`。用户Data下的画布ء子不是证据——每个靴子
写他们,同意与否, 哪个祖父在他们的第二个靴子上新装的(# 114建议将). 这个
第一次没有证据的靴子写着`<userData>/integration-consent-fresh-install`,而不会在以后的靴子 安装爷爷
(即使兄弟安装共享也不行)`~/.nodeterm`启用自己的钩子). 记录写在
启动,在渲染器装入设置和安装之前,启用每个代理,`hostDefault: enabled`因此,没有人的徽章或帆布控制停止升级。 一次性
解除通知说,合并现在是Setle 或Setle elections 快点。
- ** 新安装被请求一次**,用一个横幅(可以全部 / 选择... / 现在不行) 。 直到回答为止
没有全局文件 终端工作 但特工没有身份徽章 通知
会话名称、上下文表、子代理卡、帆布控制或链接节点读 这是我们的功能。 "现在不行"
记录了每名特工的下降,所以要求一次。
- **SSH主机**:一个没有答案的主机得到什么也没有(没有被删除). 当活动
project的主机是连接和未回答的,一个横幅请求(Allow on this host / not on this host).
主机仅在两个主机和代理机启用时安装代理机 。

□ 技能去向(衡量2026-10-03)

本地,每个代理商自己的目录(所以每个代理商的下降是准确的):

用 QQ 测量的 QQ 代理 QQ dir QQ
|,|也.
| cla`$CLAUDE_CONFIG_DIR`或`~/.claude` `/skills`,加上每个本地管理/链接账户 dir QQ(现有)QQ
密码: 0.156.1`$CODEX_HOME/skills`(+ 管理的编码之家)`codex debug prompt-input`|
双胞胎`$GEMINI_CLI_HOME`页:1`~` `/.gemini/skills`|`gemini skills list --all`|
打开码 1.18.33`<opencode config>/skills`|`opencode debug skill`|
副驾驶: 1.0.89`$COPILOT_HOME`页:1`~/.copilot` `/skills`|`copilot skill --help`(记录在案)
| | 1.0.44 |`$GROK_HOME`页:1`~/.grok` `/skills`|`grok inspect --json`|

在SSH主机上: Claude's`~/.claude/skills`(和远程账户 dirs)和 **`~/.agents/skills`页:1 (续)
对其他人来说——代码、基因组、开ục 和grok 都经过测量读取,副驾驶文档
因为它——因为一个内存-独立目录是一个我们无法低调地回顾需要的宿主。

副驾驶没有上下文链接,因此它只 你有没有获得画布技能(和以前一样). 反重力也没有

□ 故意没有做的事

- 怎么样?`config.toml`codex 信任条目处于衰落状态: 不再使用的钩子的信任条目
存在是惰性的,文件是用户的。
- 那个`buildCanvasControlInstructions`页:1`buildLinkedContextInstructions`建筑师已经不在了
安装在任何地方;他们的平等测试仍然贴在他们身上,应当移动到技能体上
(续).
- 仅持有我们块的文件被本地删除;在SSH主机上(或者在符号链接后面)是
- - - - - - - - -
- SSH主机的删除只识别此 你是个建筑会写的技能文件 你应该知道是哪个字节
记录于此机器写作时(收录于`<userData>/integration-receipts.json`(a) 减少
旧建筑的复制件在主机上 这台从未刷新过的机器被保存和报告。

□ 表面

桌面:满. 服务器版:相同的生命周期和设置行(`installHooks: false`否决权),
没有SSH主机. 中继标签: 同意是主机的( 设置为只主机); 中继标签的自有
设置描述此机器 。 手机:v1的N/A——手机读取主机钩的状况
Production;电话侧面解释"整合关闭"是iOS的后续.

□ 设备核对表( 在此无法运行)

1. macOS桌面升级从0.4.x:祖父通知一次出现;徽章继续工作.
2. 新鲜的macOS安装:横幅出现在任何前`~/.claude`写( R)`ls ~/.claude`不变);
启用所有 ~ 徽章和帆布控制工作 。
3. 在macOS上下降声:`~/.claude/settings.json`保持用户自己的钩子,我们的条目消失;
编辑`SKILL.md`在设置中列出。
4. macOS上的编码器读取画布技巧来自`~/.codex/skills`(请它列出节点).
5. SSH主机(已安装的Linux,代码x + gemini + claude): 允许 ——`~/.agents/skills`和`~/.claude/skills`人口众多,没有`AGENTS.md`块; 不在这个主机上 ~ 清理。
6. SSH主机,旧17KB`AGENTS.md`块:升级后第一次连接时剥离。
7. 实际登录的副驾驶:`copilot skill list`显示来自`~/.copilot/skills`了`~/.agents/skills`(SSH)——这里只测量了帮助文本.
8. Windows桌面 你是谁:同意的代码的钩子(`codex-hook.cmd`和技能Dirs决定。
