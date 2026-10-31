> English: [docs/en/notch-hud.md](./en/notch-hud.md)

# Notch HUD(macOS)-合同

Agent-notch的UX,原生到节点:沿着顶端的透明始终在顶端将是
在代理工作时在MacBook Notch旁边显示**行走代理吉祥物**,并在点击时扩展
输入 **mini 会话面板 **. macOS 仅限桌面。 以节点为主的联邦
代理-状态(精确的工作/实情——无~30 s afterglow),重用节点的已有吉祥物艺术.
拥有者决定: 钩子喂食; 其自己的微型面板, 带有一个“ Go” 按钮向妇女提供节点打开; 节点 ;
** 默认 ON**( 守护为 darwin; 在设置中可切换) 。

□窗口(src/main/notch-hud.ts,新)

一个浏览器 Window: QQ Frame: False, 透明: true, has Shadowỏ: false, repizable: false,
总是在Top: true,可聚焦:false,跳过Taskbar: true}` + `总是在Top(真,“屏幕保护”)相互合作 +`setVisibleOnAllWorkspaces(true,{visibleOnFullScreen:true})`+ “ 设置忽略 ”
{前进: 稠}`. Its own renderer entry `hud.html`(添加到elect.vite.config.ts)`renderer.input`)共享现有的预装加上一个小型的HUD专用API.

-** 测量** 是纯度`hudGeometry`(单位:千美元)`notch-hud-geometry.ts`(单位测试);控制器
只供养`screen.getPrimaryDisplay()`- 初等展品的LIVE界限在每个呼叫,
3 人 家 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 、 人 人 人 人 、 人 人 人 人 人 人 人 人 人 人 人 人 ( 的另一个 家 人 人 人 人 人 人 人 人 人 人 人 人 人 ( ( 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 人 (                                                                                                                                                                                           的另一个                (                                                  `bounds`, (中文).`y = bounds.y`),大小为`bar + HUD_WINDOW_HEIGHT`(+正垂直抵消,因此降低)
面板没有被剪辑),所以EXPANDED框将顶条清除到
两种布面; 我们从不调整帧大小, 除了这个偏移(`setTunables`→`reposition`) (中文(简体) ).
主发送所有它需要绘制
胶囊:`bar`(= (单位:千美元)`workArea.y - bounds.y`楼层`NOTCH_BAR_FLOOR`24 — 引信区
身高高低,`width`, (中文).`notchWidth`(单位:千美元)`settings.notchWidth`夹在列车上`NOTCH_WIDTH_MIN/MAX`100-320, (中文(简体) ).
倒计时`NOTCH_WIDTH_DEFAULT`**168**——电源暴露无`auxiliaryTopLeftArea`这样
假设此宽度的中点, 200 个空隙,`notchCenterX`(= (单位:千美元)`bounds.width/2`页:1 重装`screen`
  `display-metrics-changed`+ 键`display-added/removed`。 。 。
页:1`hasNotch`是 RATIO, 绝不是绝对的 px 计数** (`display' )。 内部 QQ inset / 边界 。 高度
0.03号。 macOS 保留一个菜单栏 完全一样高的 Notch, 所以在一个
标记的面板,条是显示器的固定的 SHARE,并且能够存活到每个缩放模式——一个15'
航空在默认情况下报告为37/1112,在1440x932时报告为31/932,两者均为0.0333. 无名面板菜单
bar是一个固定的24 pt,因此随着分辨率的上升(24/1080=0.0222),它的份额反而下降。 这个
上一个绝对`inset >= 32`,在显示时, 0.033 共享仅可清除
足够高的:HUD检测到默认缩放时的音符,没有其它位置,并绘制其
无色药丸直入正字(问题#508).`display.internal`下半个
鼻塞只存在于内置面板上, 因此恪守低分辨率的外部屏蔽
比例是自己决定的。
-** 水泥** 是纯净的`hudPlacement`(相同的文件,单位测试),在政治上输入了几何图案和
用户的两个放置设置 -`settings.notchAlign`(单位:千美元)`left | center | right`默认值`center`和(或)`settings.notchOffsetY`(px,正数 = 下,默认 0)——它用
所有渲染器的位置:`fused`, (中文).`anchor`, (中文).`capsuleX`, (中文).`capsuleTop`, (中文).`panelLeft`, (中文).`panelWidth`(推为 CSS 变量 + 根类;渲染器自行决定无).
页:1`hasNotch`仍然决定SHAP 应该说每个组合的图

+ 显示 + 侧 + 抵消 + 画 +
|,|也.
=========================================== 我们有帮助 ============================================================================================================================
# # # # # # # # # # # # # # # #推动了# # 以Below为中心悬挂 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 33. # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
左 右 右 左 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 是与左 右 右 右 右 右 老兄 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 右 左 左 右 左 右 右 右 自由地 右 右 右 右所作的承诺`HUD_EDGE_MARGIN`在菜单栏条下方+===
在那边,在 + 抵消线以下, 旧的无名闸回落, 现为可移动的

放置规则:**(1)**药丸的顶部是`bar + PILL_TOP_GAP + offset`,夹住
**0** — 显示器顶端上方没有任何东西, 这就是为什么设置副本说"上"
停在顶端 而不是暗示 胶囊可以离开屏幕, 为什么`-48`(单位:千美元)`NOTCH_OFFSET_MIN`) 足够旅行:它从每个真正的菜单栏到达边缘。 ** (2) **
胶囊的侧面保持面板,但其左侧边缘被夹在SCREEN上(`panelLeft`编号 :
边缘倾斜度,以`center`,在显示面板+边距太窄
拥抱CHOSEN的边缘——一个赤裸的夹子将边距掉在了最远的一面),#791级的bug.
**(3)**点击通过 免费跟随太空舱——太空舱元素是热点
(单位:千美元)`pointerenter`页:1`pointerleave`切换`setIgnoreMouseEvents`因此无论这些数字在哪里
换句话说,互动区域就在那里,其余部分保持透明。
**(4)** 种植的左倾`syncCapsuleOverhang`)只适用于FUSED形状:一种药丸
无法遮盖 垫子是一条死黑尾巴(无名药丸)
罗素在降落前绘制)或者在边上,在菜单栏项目上画一个黑条.
** (5) ** 一个手工编辑的设置.json是敌对输入:两个值都在点上重新验证
使用量(`sanitizeNotchAlign`→`center`用于未知字符串;`sanitizeNotchOffsetY`− 0为a
非编号,离距离最近的界限——与`sanitizeNotchWidth`),以及
设置部分通过相同的消毒器来读取它们,这样一个控件就永远不能绑定它的价值
无法绘图 。 三个都住在这里`src/shared/notch-hud.ts`,这也是滑动器的界限
用来手抄的`WIDTH_MIN/MAX`带有"保持同步"的注释.

- ** 带热点的点击通路**:窗口保持鼠标小镇化;渲染器报告指针
在 IPC 上输入/ 离开指示矩 = 主切换“ setIgnore MouseEvents( 假/ true, ) ,
{前方: true}}'。 在热点中单击 ^ 扩展;在扩展面板外单击 → 崩溃
(a) 联合国`blur`/global-ish的检查——最简单:通过跟踪指针-叶子的应用级点击离线
扩展界限)。 永不将窗口吝啬框动画——大小为扩展框,驱动 CSS`transform: scale()`从`transform-origin: top center`(                                                                                                                                                                                                             
用于扩展/缩合。

□数据(主侧控制器,无核心变化)

订阅SAME接合器推-通知用途(`agent-status-mirror.ts`:`onNodeStateChange`(工作/需要你/边缘),`onNodeNowChange`(活动+上下文%),`onMirrorFlush`(全额)
页:1 每个节点加入 :`workspaceStore.getNodeTitle(nodeId)`(标题),`IPC.contextUpdate`(型号,
控制器-本地`Map<nodeId,lastPrompt>`来自`emitAgentStatus`因为`ev.task`打开`newTurn`(无核心变化),加a`Map<nodeId,Set<toolUseId>>`用于调试剂
子代理启动/ 结束事件( 主要已保留)`nodeSubagents`.  103. 将已 103.的快照阵列推向
通过 HUD 窗口`getHudWindow()`页:1`sendToHud()`单体( 镜像)`main-window.ts`) (中文(简体) ).

发送到 HUD 的行形状 :```ts
{ nodeId, agentId, title, model?, state: 'working'|'needsYou'|'done'|'idle',
  prompt?, activity?, contextPercent?, unread,
  subagents: [{ id, label?, state: 'working'|'done' }], updatedAt }
```- ** 订货单=国家优先,不重任**(`hudRowRank`:`needsYou`未读`done`→阙`working`→阙`idle`,会话侧边栏自己的区段顺序(`STATUS_GROUP_ORDER`, (中文).
渲染器/lib/sessionList.ts)——所有者要求notch遵循侧边栏的模型. 绑
在 ** 第一次出现** 的分层间歇( acum 映射的插入顺序) 中, 没有种子
Antwerp. 事件可以改变。 Antwerp. 过去排序的行`updatedAt`DESC,以及`updatedAt`被每个
活动,包括`onNodeNowChange`活动/文字勾选,所以繁忙的会话爬上
每几秒最高,因为面板 妈妈只画第一个`HUD_ROW_CAP`每一行
攀爬也把最后一排人赶走并交还:
消失,回来。"`updatedAt`仍然驱动行的相对标记和僵硬
监督者;它不再履行排队职务的双重职责。
- ****`unread`已经解决的锁链是大声说出来的`state === 'done' && !doneSeen`)——相同标记
边栏载着。 它以前只能读作"这行完全存在",即
在另外五行外看不见 电话边读包退休时看起来像个故障
排队 渲染器将其画成标题线上的**未读**徽章.
- ****`prompt`被剪辑在镜子的`PROMPT_MAX`(120) ** -`firstPromptLine`进口
而不是保留自己的号码 因为手机的Live活动线 由E.
同样的`onNodeStateChange`缝合和两个表面不得显示两个长度的1个提示。
- ** 接头+清晰**:`done`状态已经被镜像绑住了。 清理为**严格按
页:1`hudFocusNode`→`model.noteFocus`清除那个节点,读读
节点内的会话通过镜像的读入来澄清它(`state:'done', ack:true`) (中文(简体) ). 开幕
或关闭面板澄清什么——一个早期的"面板打开了,所以你看着它".
完全清楚意味着,在三个会话完成等待之后,打开面板并点击一个
默吞彼二门. 在HUD消失时弃用一个节点+闲置 > 6h.
A级`done`最初从 MIRROR FLUSH 中得知的种子为已见: 镜像保存
持续数小时,并在每次发射时被重新读取,所以没有这个规则,每个应用程序开始(和每个开始)
重新启用设置)将旧的完成会话作为新鲜的绿色blobs复活. 只能活下来
EDGE——HUD运行期间的转弯结束——提升了亮点. 一个恢复`needsYou`还在
因为它真的需要你
- ** 工作监督**:会场休假`working`只有在有东西这么说的时候 有些出口才这么说
什么都没有——Esc在打工具电话时,一个死亡的CLI,一个睡觉的机器,一个掉的SSH. 发音是
中心点 :`agent-status-mirror`因为`sweepStaleWorking`(窗口输入)`shared/agents/stale.ts`, (中文).`WORKING_STALE_MS`20分钟,远超过克劳德的 ~10分钟巴什帽) 移动进入工作
一个端边标记`stale`,这些`onNodeStateChange`消费者荣誉——荣誉
放下这行 然后电话的现场直播结束 HUD保留着同样的副本
检查一下 太空舱从不依赖边缘到达 没有任何变化 所以以后的任何事件
立即恢复行,60s的扫荡 重排,这样一行可以老化 没有事件在
都一样 中断**
已执行(`NodeStateChange.interrupted`从不点亮绿色亮点 你说的对
已完成,所以没有东西可以读(规则与通知路径相同)。
-** 解除** 缝合RAW状态, 所以监视器翻转隐藏行的显示不能计算
作为"它改变了"。

□指标 + 面板(厚度渲染器) – Dynamic Notch 胶囊

重用`src/renderer/lib/mascot.ts`(单位:千美元)`CLAUDE_MASCOT`数据-URI +`CODEX_MASCOT`几何学 +`pet-codex.webp`)和来自Agent Mascot/tyles.css的行走周期CSS——普通DOM,无反应
需要组合(反应可选;保持HUD倾斜). 动画由CSS驱动,不是JS时钟:
克劳德的行走周期是`0.8s steps(1)`(2帧)和商标呼吸`1.6s ease-in-out`,两者
已禁用`prefers-reduced-motion`改善其结构。

HUD是一个黑色圆底胶囊`.hud-capsule`(d) 将物理音符解开**-
引信无缝:其TOP边缘位于`y=0`共享 Notch 的黑色(顶角 SQUARE),只共享
BOTTOM角为圆形(`--capsule-radius`),它锚定在 Notch的横向中心
(与有关会员国协商)`left: var(--notch-center-x); translateX(-50%)`) (中文(简体) ). 吉祥物/rows live  我真想看看它。 胶囊 IS
点击通过热点( C)`pointerenter`初级`setIgnoreMouse(false)`,离开`true`中的一个是:
窗口的透明剩余部分继续点击。 当闲置时完全隐藏( 没有空药) 。

- ** 缩合胶囊**:从未比真假高过(所有者: "notch'a ekstra high vermek)
(原始内容存档于2018-10-21). Istemiyorum". 没错`--bar`高( 高)`max-height`),收缩到合身宽,它的右边缘被固定
将吉祥物垂直地集中在那条带子上—— Notch 读作
作为发展经济学所,不高,所以在条线下方的动态岛凸起被扔下(`--capsule-drop`现在`0px`并且只能靠扩张的数学生存 内容占据了 LEFT 的条
页:1`syncCapsuleOverhang`将右侧的宽度固定在正弦上,所以胶囊会增大
左转。 (它过去对称地生长;在拥挤的菜单栏上,右手挂上媚头。)
状态项目,作为点击的热点,吞噬了它们的点击。 (第78期). 崩溃的内容是由 ONE 纯度决定的
规则,`buildIndicator`(单位:千美元)`src/renderer/hud/indicator.ts`,单位测试`orderIndicatorAgents`:
每个代理类型一个插槽,正在工作: Claude → 2帧珊瑚像素吉祥物步行;纯属代码 → 宠物
图标表第一行裁剪(的对象为`image-rendering: pixelated`(grok/gemini/opencode) 自己品牌
标记呼吸而不是畜牲(`lib/brandPulse.ts`画布徽章的同名称呼;
加上一个闪闪发亮的绿色blob for a
完成的未看到槽和一个红色的“需要你”点进行等待(所以胶囊从来不是空的)
黑药丸). 闲着的时候没显示什么
- ** 扩大面板**:点击——或,用`settings.notchHoverExpand`在(默认)上,徘徊,`HOVER_OPEN_MS`(180毫秒) ——长出同母体黑色表面——宽度————.`--panel-width`高处
(驱动者:`max-height`,所以的唯一内容是未知的高度动画) ——行框,下角
仍然圆形,顶部仍被熔化 弹簧一样`--capsule-dur`(约220毫秒)`--capsule-ease`扩展
从 Notch 开始,不是单独的浮面板。 行在条线下逐渐淡出并开始
(单位:千美元)`padding-top: calc(var(--bar) + 4px)`) (中文(简体) ).`HUD_ROW_CAP`(6) 推开的会话行数
(国家优先级)顺序。 每行 :
动画吉祥物/绿色检查+标题+**未读**徽章时`row.unread`+ 键`model · reltime`的确如此 标记( 蓝色工作 / 灰色闲置 / 绿色)
已执行)+a`You: <prompt>`(或`activity`) 第二行+a`▸ N subagents`披露(儿童行:
标签 + 状态). 由于命令现在有意义, 切行是一个真正的省略, 所以盖子是
披露而不是沉默肤浅:a`+N more · 1 needs you · 2 unread`页脚数 :
级(边栏用`projectSignalCounts`; 音符没有空间
并点击它绘制完整的列表——盖和计数是纯`splitPanelRows`页:1`overflowLabel`(单位:千美元)`src/renderer/hud/panel-rows.ts`,单位测试). 说明主
推动所有行: 整个阵列上的崩溃指标总和, 所以主要封顶
默默地放下一个特工的吉祥物 a **Go**按钮(或行-tap) → IPC → 主镜像点击处理器:`getMainWindow().show()/focus()`+ + + + + + + + +`sendToMain(app:focus-node, nodeId)`- 翻译:`Canvas.focusNodeById`, (中文).
并清除节点僧侣完成锁。
- ** 解散**珉 晃著一列`×`خد الك اله الك اله الك الك الك الك الك ال足 .`IPC.hudDismiss`→`model.dismiss(nodeId)`将这行隐藏在AT上
(单位:千美元)`dismissedAt`),所以一个会话挂在`working`(特工在中转时死亡)
真正的状态变化 使行回来。 仅HUD-局部——节点/终点未受影响.
- ** Pill** (中文(简体) ).`fused === false`从`hudPlacement`- 无名显示、左/右侧或
中层胶囊从顶部下移:`.pill`根类(从`.notchless`, (中文).
因为形状不再只是关于显示) 画胶囊作为**独立
浮药**-全玉米片`--pill-radius`从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从 我以为从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从 我已经从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从 已删除
高度 = 高度 =`--pill-height`;药丸中的吉祥物中心(无)`--bar`用于清除。

药丸在顶端`--capsule-top`=`bar + PILL_TOP_GAP + offset`,夹必不可少的
0),这是负载而不是化妆品. 窗户的顶端是显示器,所以
第一个`--bar`px是菜单栏/notch条;放置在那里的药丸完全集中在
地理坐标,它使每一个小点的MIS检测都隐形,而不只是
错误——第508期的明显一半. 清理带子意味着背面布局保持安全
即使探测器不是, 和在真正的无名氏展示药丸 不再涂过
用于重叠的菜单栏。 用户可以将其提升到条状带内,并带有负抵消——
这是在设置中作出的明确选择, 而不是探测器的猜测, 它停止在边缘。

** 不可转移物**(共享常数)`src/shared/notch-hud.ts`中,主常数`notch-hud-geometry.ts`; CSS vars 输入`hud.css :root`,默认在 parens 中——在 mac 上的调值 :`NOTCH_WIDTH_DEFAULT`(168) (中文(简体) ).`--notch-width`(主推第一几何上的真实值)
推动,`NOTCH_WIDTH_MIN/MAX`(100/320,设置夹),`NOTCH_OFFSET_MIN/MAX`(-48/240,
纵向固定夹,`NOTCH_BAR_RATIO`(0.03, Notch-探测阈值作为
显示高度,`NOTCH_BAR_FLOOR`(24个),`HUD_WINDOW_HEIGHT`(460, 添加于`bar`), (中文(简体) ).`HUD_PANEL_WIDTH`(400,推为`--panel-width`- 其主要原因是:`panelLeft`,所以请
CSS不得携带自己的号码),`PILL_TOP_GAP`(6), (中文(简体) ).`HUD_EDGE_MARGIN`(12个),`--capsule-drop`(0 — 弹出; 仅用于扩展数学),`--capsule-radius`(16个),`--panel-max-h`(420个),`--capsule-dur`(0.22s) (中文(简体) ).`--capsule-ease`, (中文).
和药片`--pill-radius`(18) 国家`--pill-height`(30) (英语).

□ 设置+生命周期

** 安排 + 接口 → 注释 ** (`NotchSection.tsx`,仅使用macOS:`nav.ts`标记区域`macOnly`和`visibleSettingsGroups(isMac)`丢到别处)拥有所有五个把手:`notchHud`(违约**真**),`notchAlign`(默认)`center`——左/中/右分区
药片,`notchOffsetY`(默认 0 — “ 虚拟位置” 滑动器, 已签名读出, 其副本
说在屏幕边缘停了下来, 并且把装有保险的胶囊拆成药丸,`notchWidth`(默认 168 ) — 假定的 Notch 宽度, 即 冲动对齐的把手, 夹到`NOTCH_WIDTH_MIN/MAX`主要;只有引信形状使用)和`notchHoverExpand`(默认为真;关闭=仅点击,渲染器从`hoverExpand`(原始内容存档于2018-09-26). push field).`initNotchHud(deps, tunables)`从`index.ts`守卫`process.platform === 'darwin'`· ;`settingsStore.onChange`→`applyNotchHudSettings(tunables)`创建/销毁该窗口
能够将宽度/侧面/抵销/重置切换到运行中控制器(`setTunables`,哪个
穿过`reposition`因为偏移可以改变窗口高度),所以每个滑动器移动
太空舱,当你拖动它时——不重启,不跳动。

首场巡回演唱会只有MacOS 台阶 **notch step ** (`OnboardingFlow`因为`STEPS`已按住 ID 键
所以这个步骤可以 离开macOS,加`SceneNotch`输入`scenes.tsx`: 现场
左侧, 解释 + 直播`notchHud`右侧切换, 像其他任何步骤。 三层:桌面/只使用macOS——`src/server`和 iOS 不受影响(纯读取器)
现有主状态; 无电子测试保持绿色, 因为所有新代码都在`src/main`+a 键
渲染器条目).

□超出范围(v1)

Pet-switching config,非darwin(Windows/Linux) HUD,一个完整的每行上下文菜单(解散是一个
右键单击 / 徘徊 x, 不是菜单 , 多监视器 notch
精度超越中心, SDK聊天节点在面板中.
