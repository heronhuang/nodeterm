> English: [docs/en/ssh-agent-skills.md](./en/ssh-agent-skills.md)

# SSH诶项目的节点技能

介绍人的技能如何`manage-nodeterm-canvas`, (中文).`get-linked-context`联系代理人
运行在 SSH 项目中的 ** 远程主机**。

□ 问题

这两种技能都只安装在桌面自己的家里:

- 怎么样?`manage-nodeterm-canvas`→`~/.claude/skills/…`+ 键`<userData>/canvas-control/`- `get-linked-context`→`~/.claude/skills/…`+ 键`<userData>/context-links/`

一个SSH项目的代理人运行在**host**,读**host的**`~/.claude/skills`并找到
没什么 复制文件也无济于事:

```sh
ELECTRON_RUN_AS_NODE=1 exec "<the desktop's Electron binary>" "<…>/cli.mjs" "$@"
```

—— 一条完全存在于一台机器上的路径. 和节点CLI 他们执行的谈话钩
服务器结束`127.0.0.1:<port>`,在主机上是主机自己的回路,而不是桌面的回路.

□ 运输(已经在那里)

不需要发明新东西:一个SSH项目已经运行了**逆向unix-socket隧道** from
主机返回签约到桌面的回路钩服务器, 因为远程代理各种不同的报告方式
状态(`RemoteHooks.setup`, (中文).`docs/`享受人权?`src/main/remote-ssh/remote-hooks.ts`:

```
remote agent → curl --unix-socket ~/.nodeterm/hook-<projectId>.sock
             → ssh -R → desktop 127.0.0.1:<hook port>
```

每个项目的终点文件`~/.nodeterm/hook-endpoint-<projectId>.env`带活的`NODETERM_HOOK_SOCK`页:1`_TOKEN`页:1`_VERSION`,并且每个远程会话的 tmux env 已经点
在它(`NODETERM_HOOK_ENDPOINT`) 和`NODETERM_NODE_ID`因此,设计规则是:

> **远程侧是一个瘦客户端。 ** 它没有分析,没有状态 没有应用知识——它
> POST 覆盖了已有的隧道并打印了返回的东西。

□ 什么运出 : 帆布控制 SSH

1.** 国家综合指数现为POSIX sh + 卷曲**(b)`CONTROL_SHIM_SCRIPT`输入`canvas-control-core.ts`), (中文(简体) ).
替换Electron-as-Node CLI. 它没有机器专用路径,所以是一样的
脚本安装在桌面和主机上. 它从终点选择运输
它被赋予:`--unix-socket $NODETERM_HOOK_SOCK`当广告发布时,`127.0.0.1:$NODETERM_HOOK_PORT`(台顶).`curl`不是一个新的依附关系——管理钩
脚本已经需要它了 。

请求是**form-urlencode**,而不是JSON:`curl --data-urlencode`这是唯一的逃脱sh
可以信赖。 诸如`--prompt`, (中文).`--html`和`--team`通常包含引文,
新线和`$`和手造JSON 在sh休息 在全部三个。`parseControlBody`(单位:千美元)`hook-server.ts`)读两种方言;桌面的在流程中调用者仍然发送JSON.
A级`text/plain` `Accept`因为SH没有JSON 解析器,所以让服务器提供答复。

2. ** 联合国`RemoteHooks.installCanvasControl`** 写shim +`SKILL.md`在主机上,并合并
相同的标记限制指令块进入主机`~/.codex/AGENTS.md`, (中文).`~/.gemini/GEMINI.md`副驾驶`copilot-instructions.md`和`${XDG_CONFIG_HOME:-~/.config}/opencode/AGENTS.md`(最后一条道路由** 远**
shell——桌面的XDG值对主机不说. 管理着克劳德的账户
课程解决相对于`CLAUDE_CONFIG_DIR`永远 看不到`~/.claude/skills`获取
副本`installCanvasSkillIntoAccountDir`当账户被添加的时候。 在连接上
这些不是盲文:`RemoteHooks.refreshAgentTools`检查它们(见
[保持主机电流] (# 保持主机电流) , 只重写不同之处 。

3. ** 洞隙** -`remoteHookEnvArgs`仅注射端点/ 节点代号/ 版本, 因此是远程
无法继承`NODETERM_AGENT_ID`也没有`NODETERM_CANVAS_CONTROL`. CLI 大门
因此,技能是惰性的 每个SSH节点甚至一次
已安装。 它现在反映了当地人`hookServer.buildPtyEnv`没错`canControlCanvas`包括大门。

QQ 旗帜语法,为什么动词不能依赖它

旗帜是`--flag value`或`--flag=value`,而旗帜可能没有任何价值,在任何地方
线条。 那个`=`窗体是 ** 只 ** 传递它本身开始的值的方法`--`(无)`open-terminal --cmd=--version`; 写成两个符号, 一个领先`--`读作下一面旗帜,
这样`--text --oops`发送空`--text`加一个流浪者`--oops`。 。 。

这是蓄意交易。 用于在任何后消费符号的循环`--flag`*无条件* 所以`--read --node b1`成为`arg.read=--node`与`b1`掉下来,还有
无价值旗帜只能作为线上的最后一个标志来表示。 两次失败都是**沉默** —
请求保存完好, 服务器回答错误的旗帜, 它发送下一个
调试器到动词表而不是shim.

**  window  window  window  lives  lives
SSH 主机的复制件在每一个连接上都检查过, 并带入到这个构建中( 下方), 所以一个解析器
改进在更新后的第一个连接上到达远程代理点。 主机还能运行
稍长一段时间的旧循环 —— 它的隧道下行, 文件无法读取, 或者第二个桌面在一个
更古老的构建共享主机账户——线条上没有任何内容可以说明哪个循环正在运行. 新设
因此,动词被设计为在两个循环下进行相同的解析:给每个旗帜一个值和
新旧圈子都同意了

QQ 保持主机当前

上面所有的东西都是由应用程序生成的,所以一个主机的拷贝只和最后一个架构一样流畅
写的`RemoteHooks.refreshAgentTools`保持它的时尚, 对于帆布和背景shims,
无论是技能(系统还是每个管理账户都由主机这种说法),还是我们的指令:

- 一个探测器,一个往返。 主机运行 POSIX`cksum`覆盖每个文件(确切的说是我们的文件)
指示文件的标记跨度),桌面将它与校验和比较
它会写字节。 只重写不同之处; 当前主机需要读一次, 没有
写作。 在没有主机上`cksum`,它可以读取的文件不作比较(如每个
连接已执行), 并合并块; 丢失、 无法读取和已加闸的文件仍然被告知
分开
-**何时** 每个连接(一个新主机,或者一个在应用程序重新启动后幸存的)和每个
逆隧道修复. 这45个监视器一经主机确认 就一文不值
在1/5/15分钟的后台上重复一个未经证实的主持人,
能够更改中途运行的文件是其他人(另一个桌面,一个手编辑)。
- 从来没有。 无法读取的文件不被写入; 管理过的账户目录已丢失
从宿主那里拿不回来(在写作中重新检查); 探测回复中没有
解析会改变什么。 在手我们就删除块上方留下的偏差端标记被跳过——由
合并和探测器都一样——所以它不再让每个检查附件成为新的副本.
-** 一个运行中的特工** 保留它已经读到:shim's`help`状态
文件是 Claude 技能在下次引用时被重新读取, 代码x / gemini / 打开代码读取
在会话开始时它们的指令文件。

{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}Gating and failing actory. {\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}你觉得呢

安装在 ** both ** 一个已解决的远程`$HOME`(每个此刻的远程路径必须是绝对的——a)
字义`~`和经过**验证的**隧道:`setup()`仅限
返回一个在证明反向前进到达 * 此* app 运行后的结束点路径。 一个技能
指着一个死了的插座比没有技能更糟糕 因为特工没有告诉
无法使用画布控制 。

其它所有失败都会打开, 每一步: 无法写入的指令文件, 没有主机 。`curl`页:1
已丢弃的连接 —— 会话运行, 没有帆布控制 。 在节点外
shim 立即在它的嵌入门上通过,所以它不会在用户自己的位置上停留
终端(与管理的钩脚本相同的学科)。

□ 什么运算: SSH 上下文链接

`get-linked-context`无法使用画布控制技巧 as- is: 它的 CLI 是 ~ 230 行 剖析器
真高兴能有3种笔录格式(Claude JSONL,代码推出,Gemini事件源,外加一个开放代码)
导出),用sh表示太多——而主机可能没有`node`一点也不

因此,同样的规则被应用到更深一层:**桌面进行读取和解析.**

1. ** 解析从《国家清单》中移出**`core/context-link-render.ts`普通的、经过测试的TS
而不是嵌入在模板文字中的 JavaScript 。`renderContextLink`获取链接文档
和三个注入的获取器,然后返回文本打印;它对ssh、fs或
.
2. **A`/context-link/<verb>`路由** 在钩状服务器上的答案`text/plain`要是你认为`context.sh`-SH+Curl双胞胎`nodeterm.sh`这是唯一的客户端。 本地路径使用
同样的路线,所以有一个执行,不是局部的,是偏僻的。
3. ** 从桌面上读取凛然可及**:一个远程节点的钩子`transcriptPath`* 是* 一个远程路径, 在控制 Master 上 ...`RemoteFile.readTail`(捆绑着——长会记录有几十 MB和a`summary`显示15行),`PtyManager.captureSession`已经是远程意识之间建立的 所以`terminal`不需要新的代码。 那个
3个是要注射的`src/main`(单位:千美元)`initContextLink(ptyManager, deps)`; 服务器版
不通过任何行为,并保持其仅在当地的行为。
4. **钩道缺失的链接**:原始钩听器的远程分支从未呼叫过`setNodeTranscript`,所以一个远程节点 根本没有已知的笔录。 它现在做到了——与
已经被囚禁的道路`isSafeRemoteTranscriptPath`,因此伪造的 POST 无法瞄准读取的链接
任意远程文件。
5. ** 国家`resolveLinkTranscript`拒绝远程节点的本地定位器。 ** 他们搜索 * 此*
机器的磁盘, 并且会返回一些无关的本地会话文件—— 链接代理
会读到陌生人的谈话 却无动于衷 对于远程节点
钩子喂食路径是唯一值得信赖的来源;没有它,根本就没有东西可以读。

授权

链接文档由**请求者自己的节点 id** 选择,以及`pickLinkNode`只会
返回其中列出的节点。 所以一个拿着钩子的呼叫者 仍然无法读出一个节点
从未连接,也无法读取 * 通过 * 它本身没有的边缘( 链接地图是
指向性). 标志仍然是外部边界,与状态钩一样。 一个价值
到达远程命令行的 Opencode 会话 id 在那个站点被 shell 引用 。

`docs/`- 有意义的后果:在这一变化时`src/server`没有打电话`initContextLink`,因此服务器版没有上下文链接。 ** 现已接通。 **`src/server/context-link.ts`电话`initContextLink(ptyManager, {})`并保持链接地图的步进
磁盘上有画布 它经过** 没有远程道具**,故意: 弹壳运行在主机上
它读到的笔录和tmux, 所以只有本地是完整的答案 那里和SSH项目是
一个只使用桌面的概念。

□ 测试

`canvas-control-shim.test.ts`运行 ** real shim ** 下方`/bin/sh`对**真**钩
服务器,在 TCP 端口和一个 **unix 套接字** 上——shim 生成源代码无编译器
检查,现在是唯一的帆布控制客户端。 它覆盖了下流价值的往返
(引文/新线).`$`/ 回击/回击),位置表,错误传播,
嵌入门, 一个坏的标志, 一个死塞, 和读取坐标 从端点文件。

`context-link.cli.test.ts`对上下文链接shim, 携带固定装置和
对测试已退休的节点CLI的套房的期望,所以重写答案
行为它继承。`context-link.handler.test.ts`驱动真正的处理器: 授权,
本地/远处读分,定位守卫。

□ 超出范围

- **《服务版》**——帆布控制器根本没有接线(没有)`agent:control`处理者,
但这一改变并不改变。 现在的Shim已经足够便携式了 当它被重新使用。
-** 移动伴**——没有帆布,所以炽热的帆布控制器无法浮出水面.
- ** 中继远程节点**——一种没有客户的普遍传输;不受影响。
