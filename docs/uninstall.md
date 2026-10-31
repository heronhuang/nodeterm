> English: [docs/en/uninstall.md](./en/uninstall.md)

# 完全取消节点——完整的库存和便携式安装问题

第347期要求进行清洁试验:安装、评估、清除无残留物。`scripts/uninstall.sh`这是去除。 这份文件是它背后的清单——每一份
将应用程序设置在运行时, 并按键到写它的代码—— 加上可行性说明
提议的问题(完全便携式的安装)。

先安全运行 :

```bash
curl -fsSL https://raw.githubusercontent.com/eneskirca/nodeterm/main/scripts/uninstall.sh | bash -s -- --dry-run
```

`--dry-run`打印您机器上找到的所有脚本( 进程, tmux 会话,
文件,其他工具文件中的配置项),并更改任何内容。 重运行`--yes`申请。 交互运行(auntloaded脚本,没有管道)在触摸任何东西之前确认.

□什么节点写, 谁删除它

1. 节点名称本身的状态——删除批发

由 QQ 僧侣 撰写 。
| | |
|`~/Library/Application Support/node-terminal`(macOS)/ (英语).`~/.config/node-terminal`(Linux) QQ 电子用户数据目录 :`workspace.json`, (中文).`settings.json`,生成`tmux.conf`, (中文).`terminal-scrollback/`, (中文).`hook-endpoint.env`, (中文).`context-links/`, (中文).`canvas-control/`, (中文).`claude-accounts/<id>/`(管理下的账户配置数字),`speech-models/`媒体缓存 秘密商店`device-id`,浏览器存储 QQ 后面的所有`CorePlatform.userDataDir`|
|`~/.nodeterm`每个实例共享的机器稳定状态:`agent-hooks/*.sh`是,是,是。`ssh-cm/*.sock`(SSH控制主套座),`acks/`, (中文).`pending/`, (中文).`push-grants/`, (中文).`cx/`, (中文).`codex-thread-names/`私人特务`install-helper.ts`, (中文).`control-master.ts`, (中文).`pairing-service.ts`, . . | .
|`~/Library/Caches/node-terminal`, (中文).`~/Library/Caches/node-terminal-updater`, (中文).`~/Library/Caches/com.nodeterm.app*`, (中文).`~/Library/Preferences/com.nodeterm.app.plist`, (中文).`~/Library/Saved Application State/…`, (中文).`~/Library/HTTPStorages/com.nodeterm.app`, (中文).`~/Library/Logs/node-terminal`(macOS)/ (英语).`~/.cache/node-terminal`, (中文).`~/.cache/node-terminal-updater`(Linux) → Chromium/electron-updater缓存,macOS窗口状态 → electron / macOS →
键链条目`node-terminal Safe Storage`(macOS) |. 关键电源`safeStorage`用 Electron 加密本地机密
|`/Applications/nodeterm.app`(或本乡水缸) 应用程序本身`install.sh`/酿  brew |
|`~/.nodeterm-server-app`, 编号:`~/.nodeterm-server`,系统单位`nodeterm-server.service`+ 键`nodeterm-server-update.{service,timer}`(系统或`--user`) QQ 服务器版 私家节点运行时间 数据目录 服务 + 每日自动更新时间 QQ`install-server.sh`|

*为什么`node-terminal`而不是,没有`nodeterm`. ** 的做法是用应用软件的 * 名称 * ——
用户数据目录`Safe Storage`键链条目,电子更新器`<name>-updater`缓存 -
用途`app.name`,电子从顶层读取`name`包裹中。 Json
(单位:千美元)`node-terminal`) (中文(简体) ).`productName`(单位:千美元)`nodeterm`仅生活在`build`,哪个电子建设器
从包装的软件包.json中脱落,所以它命名了捆绑和安装器,从不
到达运行中的应用程序。 每一个桌面建设, dev 或安装, 因此写给`…/node-terminal`。用捆绑的ID键入什么`com.nodeterm.app`预告 保存状态
HTTPStorages, Ship It)或由捆绑本身(`/Applications/nodeterm.app`)确实载有`nodeterm`拼写。`scripts/uninstall.test.ts`连接脚本`APP_NAME`切换到软件包。`name`。 。 。

2. 合并到其他工具的配置中——手术后返回

通过将条目合并到其配置语句中,节点与代理CLIs整合起来。
每一次合并都是标记识别的,所以移除 永远不会触碰自己的钩子,证书,或者
设置 :

* 文件 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
| | |
|`~/.claude/settings.json`, (中文).`~/.gemini/settings.json`QQ 命令引用的状态锁定条目`~/.nodeterm/agent-hooks/`(                                           支撑                                              (                                                                                                                                                                    `claude-signals`) QQ JSON 过滤器按键在这些标记上; 其他钩子和键保存 QQ
|`~/.codex/hooks.json`+ 键`~/.codex/config.toml`++ Hook 条目+ 匹配`[hooks.state."…"]`信任块QQ 我们的条目被删除; 幸存的用户钩子的信任块重新按键到其转移的索引( 散列封面内容, 不是位置) QQ
|`~/.claude/skills/manage-nodeterm-canvas/`, (中文).`~/.claude/skills/get-linked-context/`| |
|`~/.grok/hooks/nodeterm-status.json`, (中文).`~/.copilot/hooks/nodeterm-status.json`QQ 节点控钩文件( 那些 CLIs 合并了整个目录) QQ 删除QQ
|`~/.config/opencode/plugins/nodeterm-status.js`                                                                                                          
|`~/.codex/AGENTS.md`, " , "`~/.gemini/GEMINI.md`, " , "`~/.copilot/copilot-instructions.md`, " , "`~/.config/opencode/AGENTS.md`|`<!-- nodeterm:manage-canvas -->`页:1`<!-- nodeterm:get-linked-context -->`标记块 QQ 块剥离; 文件只删除, 如果没有, 但我们的块仍然 QQ

两个故意的例外:

- ****`"tui": "fullscreen"`输入`~/.claude/settings.json`仅此而已。 ** 节点表示
只有在缺席时,所以一个已有的值可以是用户自己的——删除不能告诉两者
分开来 环境在节座谈会之外是无害的
- ** 如果没有JS 运行时间(`node`) 找到,JSON/TOML条目留有
* 遭拒绝。 即为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为...为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为的为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为的为为为为为为为为为为为为为为为为为为为为为为为为为为为纽带为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为为`if [ -r <script> ]; then sh <script>; else cat >/dev/null; fi`,所以曾经`~/.nodeterm/agent-hooks/`被删除, 每一个条目都是无声的 。 (此守护符存在)
所以一个未安装的节点决不会阻断克劳德的会话——看`install-helper.ts`) (中文(简体) ).

3. 过程——按顺序完全停止

1. 服务器系统化单元被禁用,其单位文件被删除.
2. 桌面应用程序被要求退出(在macOS上的AppleScript,在其他地方的SIGTERM),并带有
10秒的恩典在难杀之前
3. 节点插座上的tmux服务器(`node-terminal`,以及`nodeterm-rmt`若为
另一台机器SSH'd in)是被杀死的——**脚本列出每个现场会话首先和
警告其内部的流程结束。 ** 您自己的 tmux( 默认套接字) 不受影响 。
4. 隐蔽式SSH控制 Masters通过`ssh -O exit`在每个`~/.nodeterm/ssh-cm/*.sock`。 。 。

4. 蓄意的KEPT

- ****`<project>/.nodeterm/`在您的仓库里** (`project.json`, (中文).`board-log.jsonl`, (中文).`images/`) (中文(简体) ). 这些是你画布的布局 设计上可以分享 可能在因特网上
可能是另一个合作者 脚本从工作空间索引中列出
* 在* 删除的监督之前,用手册打印清单`rm -rf`提示而不是删除。
- ** 参考SSH主机。 ** 连接的 SSH 项目在下面安装相同的钩脚本/ 技能
*宿主的*`~/.nodeterm`和代理Dirs, 以及它的会话实况在主机`nodeterm-rmt`tmux 套接字。 每个主机的脚本打印清理指令; 它没有
通过网络联系。
- ** 代理人CLIs和tmux本身**——节点从未拥有它们。

□便携式安装——可行性说明

这个问题的首选形状是"在一个文件夹中的一切;删除=删除文件夹".
节点能有多近?

** 简单80%:重定向用户数据。 ** 电子支持`app.setPath('userData', …)`在此之前`ready`A级`portable`app旁边的标记文件(或 a)`NODETERM_PORTABLE_DATA=<dir>`env var)在登录时检查`src/main/index.ts`会移动
将上方的整个用户数据表输入选定的文件夹,以及`TMUX_TMPDIR`可以移动
Tmux 插座也在那里。 这是一个小的,低风险的改变和值得以和平方式。

** 20%的结构:一体化无法携带。 ** 这个问题还要求保持
能够连接到现有的claude/codex/opencode安装——以及连接 *is*
写入这些工具的自定义 dirs(`~/.claude`, (中文).`~/.codex`他们只读钩子,
技能和从它们自己的地点提供的指导文件,而节点并不控制。
同样`~/.nodeterm/agent-hooks`故意稳定快点,而不是
/ install: 当钩子脚本路径存在于每个实例的数据目录中时,渍秒
安装( dev 构建、 服务器版、 E2E 运行) 重新指定共享`settings.json`在*其*时
复制,当该目录消失时,钩子默默地死在盒子的每一个会话上(字段)
报告——见注3,第7段。`install-helper.ts`),一个"便携式"模式,将它重新移动到
应用程序文件夹会重新出现故障 。

所以诚实的设计是:

- ** 便携式临时性数据目录**(可行的后续):保持画布、设置、回滚、缓存,
一个可删除文件夹中的账户。 Escape-hatch env var + 标记文件,~30行.
- ** Uninstall 脚本**(这一改动):无论需要,因为代理集成和
机器稳定钩子路径在便携式文件夹内永远无法生存均已断开
问题想要保持一体化。 文件夹外的每个字都被嵌入
(在会话节点中惰性没有产物)和标记可逆.

Windows 注释: 桌面构建船作为 NSIS 安装器, 并使用自己的未安装器
(增加/删除程序);运行后删除`%APPDATA%\node-terminal`和`%USERPROFILE%\.nodeterm`。POSIX 脚本不运行在那里。
解冻者也离开了`%LOCALAPPDATA%\nodeterm\session-host`——会议主办单位的非公开会议
运行时间副本( 每个应用程序版本大约250 MB, 发行 # 829) —— 因为主机可能还在运行中 。
从一个和未安装者 从来没有阻止它。 在任何文件夹后删除该文件夹`nodeterm-sessionhost-v2.exe`进程已退出(任务管理器 ~ 细节); Windows 拒绝时
正在运行,这是安全的。
