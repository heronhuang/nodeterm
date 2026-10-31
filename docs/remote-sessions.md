> English: [docs/en/remote-sessions.md](./en/remote-sessions.md)

# 远程工作空间会议——设计(小组,第4阶段)

** 日期:** 2026-07-13
** 状况:** 4a + 4b + 4d + **4c 着陆**`feat/relay-rpc-main`(全套套房+类型检查绿色,
1690测试). 两个桌面在 E2EE 中继器上的共享画布上是平等的对等器: 一个远程主机
打开为 ** 项目标签 ** (已删除)`NodeTerminalApi`在隧道上方,双方同意
在赠款时刻,一个离线标签灰色+橱线重联,以及工作树/街道路径
主持人。 桌面-**客户** 遗留方言被删除;** 手机** 方言被故意删除
保留到iOS repo迁移到隧道(`docs/ios-protocol-migration.md`). 待决:
然后全处安全审查+合并到`main`。见下文**“4c着陆”** 装运的表面和推迟的后续情况。 4e(服务员)
作为标签的版本)是未来.
** 取决于:** 阶段1-3(`docs/team-presence.md`),全部合并.

□ 目标

任何远程节点核心在桌面应用程序中以 **纽带标签 ** 打开, 并带有完整的
特性集——终端,git,编辑器,存在,co-attach,画布同步. 标题
大小写:两个桌面(例如两个Mac)作为**相等的对等点**,在一个共享的画布上覆盖
E2EE中继. 同样的抽象还打开了一个服务器版框作为标签.

阶段1–3为共享One核心的为支持客户构建多人游戏. 第四阶段不变
这个模式——它延伸了 客户端可以附加在核心上*. 一个桌面加入另一个桌面
桌面是主机核心再见的客户端, 正像浏览器是服务器的客户端
版为核心.

□决定(每项决定都明确)

1. ** 单一工作空间,平等权利。 ** 画布、文件和进程在
主机; 端点加满权限( 创建/ 删除节点, 打开)
终端,类型。 "平等"的意思是平等 *权利 *,而不是混合的寻觅——一张画布从不
有两个机器的节点 非对称性是真实的,并且有文件记载:如果主机
睡眠,对等者的世界冻结(并在重联ình上通过co-attach恢复).
混合家庭帆布(a)`home`字段(每个节点)被考虑并拒绝用于v1。 图1
2. 全部信托,明确给予。 ** 邀请同行赠款空壳访问——
请 UI 用简单词表示( “ < name> 将可运行此命令)
Mac——与给予他们SSH访问权限相同". 没有每次行动的批准, 没有目录
监狱:第一弹壳之后, 边界是你邀请的
3. **远程会本国境内是工程标签**,不是单独的窗口,也不是全应用
承担起 你们的本地项目都放在帐单上,
4. ** 抽象是来源不可知的。 ** 一个会话的来源是`local`(今天的会议)
预装,`relay`(E2EE中继到另一个桌面),或`server`(WS 到服务器)
编辑框). 复有一人买三者.
5. ** 一项议定书。 **`src/shared/rpc.ts`—— 服务器版的WS- RPC—— 成为
只有客户端 QQCore 协议, 在中各特派团的 E2EE 套接字上下隧道为远程
桌面。 中继器的私人 opcode 方言(`framing.ts`OP代码,`snapshot.ts`, (中文).`host-service.ts`手卷的RPC词汇,`host-canvas-hub`完全状态
镜子`sanitizeClientMutation`)是**删除**,而不是贬值——应用程序是
未公布,所以这是一个不费钱的时刻。 iOS( 单独还原)
迁移到`rpc.ts`电话在斯威夫特工作之前无法连接,
汇兑收益 Musevenist、存在、代理地位和共同交易,其中无
方言传承.
6. **子阶段,每个阶段可独立合并**(见下文Split):4a → 4b → 4d
平行分支,然后是4c(结合点),然后是4e。

□ 结构

QQ 会话抽象( 递归)

今天,渲染器假设一个核心:`window.nodeTerminal`是一个全球和商店
是单胞胎 第4阶段介绍**会议** = 与一个核心+的连接
核心的 API :

```ts
interface WorkspaceSession {
  id: string
  source: 'local' | 'relay' | 'server'
  label: string                    // "Ayşe's Mac", "prod-box"
  api: NodeTerminalApi             // preload (local) or a bridged RPC client
  status: 'connected' | 'connecting' | 'offline'
}
```

每个工程标签属于一个会话.`SessionContext`+ 键`useSession()`提供
API; (中文(简体) ).`Canvas`,课题`TerminalNode`,课题`EditorNode`和小组从上下文中阅读
而不是全球范围。

** API分为两个**(衡量:46个文件中的221个呼叫站点):
- ** 核心**(~90个电话)`pty`, (中文).`git`, (中文).`fs`, (中文).`workspace`, (中文).`presence`, (中文).`chat`, (中文).`canvas`, (中文).`agent`: 路由每会话。 在远程标签中,它们击中了远程核心。
- ** App-Global**(约60个电话) -`updates`, (中文).`license`, (中文).`clipboard`, (中文).`shell`, (中文).`dialog`, (中文).`media`, (中文).`settings`, (中文).`pairing`:总是当地人. 您的更新横幅显示
版本,从来不是主机的。

** 缩略语为会话。 **谄。`presence`和`agentStatus`举行每届会议
表格(两场会议=两场对等会议)。 这是其中最危险的部分:
存在存储的模块级状态( N)`connectPresence`专横,`lastFocus`, (中文).
Ws-bridge"准确的一位用户" 早期缓冲的不常态)必须成为
访谈。访谈阶段1的无变化者举行*每场会议*。

`TerminalTransport`注释: 本地路径的接口会保留, 但是`RemoteTransport`删除 —— 通过连接的远程标签会谈`NodeTerminalApi`(ws桥)
构建者,和浏览器一样. 负载缝线向上移动一层:
从"扫描传输"到"扫描API对象".

++ 主机侧( 主要进程)

阶段1 - 3 写入`CorePlatform`(单位:千美元)`clientIds()`, (中文).`sendTo(id)`, (中文).`onWithSender`),并且已经每天在服务器版上运行多个客户端. 唯一一个
电阻器是`electronPlatform`解决客户端为 WebContents :`clientIds()`只返回主窗口;`sendTo`用途`webContents.fromId`。 。 。

固定:客户登记册**。`clientIds() = [mainWindow, ...peerIds]`· ;`sendTo`通过 id 发送到 webContents *或 * 注册的对等汇(中继连接) 。
与那个接合,`presenceHub`,第3阶段帆布反射器和终端连带
流动到一个没有进一步变化的远程对等点——他们从不知道什么是网络Contents
曾经是`phone-presence.ts`半合(主机看见电话;电话是盲的,因为`sendTo`不,不,不,不,不。
电话得到一个真正的槽(见下文)。

QQ 4b – 4c 接口(已关闭)

4b为**合并**:`electronPlatform`是真正的多客户。 中继对等点现在是
一等所规定的义务`CorePlatform`桌面核心的客户端, 所以`presenceHub`阶段3
帆布反射器和终端共接器已经到达——4c只需提供
插头。 4c消耗量为:

```ts
// src/main/peer-registry.ts
export function registerPeerSink(id: number, sink: UiSink): void
export function unregisterPeerSink(id: number): void

// src/core/ui-sink-registry.ts (shared with the Server Edition, which registers browsers)
export interface UiSink {
  sendText(json: string): void        // RPC event frame: {t:'ev', channel, args}
  sendBinary(buf: Uint8Array): void   // pty:data, encodePtyData(sessionId, chunk)
  bufferedAmount?(): number           // bytes queued in the socket send buffer
}
```

- 号码来自`allocateRelayClientId()`页:1`src/core/presence/hub.ts`()做到单调
从`1_000_000`,所以一个对等的 ID 永远不能与 WebContents ID 相撞(那些开始)
小和数起来。 4c 薄荷每次连接一次,使用 * same * id  因`presenceHub.join`, (中文).`registerPeerSink`和每个`sendTo`。 。 。
- ****`bufferedAmount()`MUST报告中继套接字的真实缓冲字节. ** 这是
4b中单项最重要的合同. 第2阶段的每个客户背压 *和 * 8 MB`WS_DROP_WATER`一个号码上的天花板键 水槽总是
返回时`0`在每次测试中看起来都很好, 默默地禁用天花板: 缓慢的对等点
然后排队无约束的 pty 输出, 没有任何东西会诫止 pty 或 减少它的积压,
宿主的记忆不断增长,直到宿主进程结束。 如果中继器没有
本地语言`bufferedAmount`,4c必须计算一个(字节交给套接字减字节)
- 一个诚实的数字,而不是占位符。
- ****`onPeerGone`已装有电线。 **`src/main/index.ts`调用“ wirePeerRegistry”({)
setFlow, captainForResync, on PeerGone: ptyManager.droppClient })' 完全一次. **4c 必须
不打电话`wirePeerRegistry`第二次** - 道具是最后写成的,所以第二次
默默地召唤他们。 打电话`unregisterPeerSink(id)`关闭套接字( 或)
撤销, 每4d : 它的镜像`src/server/ws.ts`这条路很近...`presenceHub.leave`→`PtyManager.dropClient`+ 注册 prune( 也返回任何 pty 暂停该对等点)
因此,共享终端不能冻结其他观众。
- ** 连续两次自发扔水槽**(`SINK_FAILURE_LIMIT`=2;任意
成功发送重置计数),并获得上面的全撕. 所以4c的水槽应该
# # 扔在死套上的支持而不是吞 # # (写给半封闭的溪流 #`EPIPE`页:1`ERR_STREAM_WRITE_AFTER_END`信号),必须**不要** 瞬间抛出
在健康的一面——连续两投将踢出现场的同龄人。

的任务是:

-**没有连接代码 Siberia.** 没有接力插座,没有握手,没有框架——4b是
登记连接,没有其他。 4c带载体。
- ****`phone-presence.ts`半战不退。 ** 它仍然只是加入中枢;
桥接电话登记器没有水槽,所以它仍然得不到任何东西。 退休是4c的工作,
当它使电话成为一个真正的对等点(在ID下注册一个槽,它已经薄荷).
- ** 没有进入的对等点* 核心投射路径** 超越什么`onWithSender`已经规定: 4b make
核心能够跟同伴说话 而不是听到 呼唤同伴的RPC
芯片`handle`页:1`on`页:1`onWithSender`处理器(以对等方的ID作为发送者)为4c.

已证实端到端`src/main/peer-integration.test.ts`对真实平台+枢纽+
画布反射器: 已注册的对等端收到`presence:sync`页:1`presence:peer`及以后各页`canvas:mut`,然后pty输出风扇到它的槽作为`sendBinary`每个客户下的框架
背压 +  你是谁?
窗口或快速对等点)。

协议路径( 4c)

`rpc.ts`隧道通过中继器现有的E2EE插座. 在同伴那边
**ws-bridge 建构器**在中继后置帧源 说真的,这才是关键
一个 WebSocket 中 — 套接字上方的所有内容都与浏览器路径共享。

中继套接器必须符合两项载体要求(WS免费提供):
- 一个`bufferedAmount`等效 — 第2阶段的每个客户后压和 8 MB
上面的天花板键;
- FIFO每條連線的交付 3階`seq`内容包括:
单E2EE流已经提供崽子;它必须保持单流).

以旧方言删除:`framing.ts`密码,`snapshot.ts`(由`PtyCreateResult.screen`,它解决了一般在第2阶段的加盟绘画,`host-service.ts`RPC的词汇,`host-canvas-hub.ts`+ 键`canvas:state`完整状态
推(由以下的缩 印 的 反 线 取代 ),`sanitizeClientMutation`(由
信托决定,`RemoteTransport`, , , , ,`RemoteSessionView`(由遥控器取代)
选项卡)。

* 信托(4d——范围为加密/铺设层)

- 对等方的设备密钥变成** 持久性**(今天的客户端密钥是麻黄)
sAS(10位数 v2;一个 v1 对等点显示前六位数) 被验证为 ** 相互**。
- 退位是头等舱行动(面孔(facepile avatar) ~ "退位"):它解开关键
** 并杀死直播会话 ** — 关闭中继连接, 放弃对等者的 pty
订阅,叶存在. 单独解开会让对等点连接起来.
- 4d故意不动`host-service`页:1`client-service`握手代码 -
4c 重写这些文件;4d 船 键/pin/SAS/同意层(`pairing.ts`, (中文).`e2ee.ts`, (中文).`approved-devices*`,邀请/同意UI)作为图书馆的4c线进入.
- ** 交付(图书馆,有4c线):** 持续的同伴身份
(单位:千美元)`src/main/remote/peer-identity.ts`+ 纯`key-file-codec.ts`); 相互 SAS + 双端针
(单位:千美元)`src/main/remote/mutual-approval-core.ts`; 与`onRevoke`杀死钩子
(单位:千美元)`src/main/remote/revocation.ts`——坚持不懈,然后钩子剪断直播;同意
副本(`src/shared/remote/consent.ts` `describeGrant`+ 键`ConsentNotice.tsx`(原始内容存档于2018-09-26). ). 现有的加密
试验`e2ee`, (中文).`pairing`, (中文).`relay-id`, (中文).`approved-devices-core`(a) 未经修改通过。
- ** 开放产品决定——许可证:** Pro 目前只打开主机的标志
薄荷(原变种). 对等故事(主持人付费? 二者,皆为自由者。
光谱记录为开放而非猜测.

所享有的4d = 4c接口(精确的接合4c线)

4d是一个**惰性库**——没有连接代码,没有IPC,没有UI在叶子之外.`ConsentNotice`在4c线连接到重写握手台之前 什么都不能运行 准确
从6项4d任务中收集的表面4c消耗量:

** 持之以恒的同伴身份** (`src/main/remote/peer-identity.ts`,I/O包装器——唯一的
进口的4d模块`electron`:

```ts
function loadOrCreatePeerKeyPair(): Promise<KeyPair>   // throws PeerKeyLockedError (code E_PEER_KEY_LOCKED)
function resetPeerKeyCache(): void                     // test seam only
class PeerKeyLockedError extends Error                 // encrypted key + keyring locked ⇒ do NOT regenerate
```

替换电流`genKeyPair()`时间`client-service.ts:286`。公用钥匙是
稳定身份 一个主机针穿过连接。`PeerKeyLockedError`必须表面到
用户("解锁密钥环和重联")——永远不要重生它.

** 自动核准** (纯粹`src/main/remote/mutual-approval-core.ts`- 没有电子:

```ts
type MutualApproval    // opaque/branded; only emptyMutualApproval can construct it
function emptyMutualApproval(peerKeyB64: string, sessionId: string): MutualApproval
function confirmLocal(s: MutualApproval): MutualApproval
function confirmRemote(s: MutualApproval): MutualApproval
function isMutuallyApproved(s: MutualApproval): boolean
function recordApproval(store: ApprovedDevices, s: MutualApproval): ApprovedDevices   // pins s.peerKeyB64 only when both confirmed
function mutualSas(shared: Uint8Array): string                                        // "NNN NNN NNNN"; alias of sasFromSharedKey
```

流量 :`emptyMutualApproval(peerKeyB64, sessionId)`→`confirmLocal`这个人类的SAS
匹配 +`confirmRemote`在同行的确认框上`recordApproval(store, state)`针
同伴的密钥(每端钉住对方的密钥;同位素). 每对试一次一次

**重现**(纯核+钩,`src/main/remote/revocation.ts`- 没有 所有的电源:

```ts
function revoke(store: ApprovedDevices, peerKeyB64: string): ApprovedDevices   // pure unpin, idempotent
type OnRevoke = (peerId: string) => void | Promise<void>
interface RevocationDeps { load(): Promise<ApprovedDevices>; save(s: ApprovedDevices): Promise<void>; onRevoke: OnRevoke }
interface RevokeResult { persisted: boolean; killed: boolean }
function createRevoker(deps: RevocationDeps): { revoke(peerKeyB64: string): Promise<RevokeResult> }
```

4c 个工具`onRevoke(peerId)`= 关闭对等者的中继连接 =`PtyManager.dropClient(clientId)`→`presenceHub.leave(clientId)`(同样的撕裂)`peer-registry.ts`运行在水槽未注册。`revoke()`磁盘上的卸载,然后开火
钩子`persisted:false`针头可能存活下来,UI不能显示"退位",必须
重试;`killed:false`切口是未经证实的`peerId`是同行的稳定框公示
键(基准64)。

** 关键文件编码**(纯`src/main/remote/key-file-codec.ts`无电子;`safeStorage`注入为`SafeStorageLike`:

```ts
function encodeKeyFile(keys: KeyPair, safe: SafeStorageLike): string
function decodeKeyFile(raw: string, safe: SafeStorageLike): { keys: KeyPair; migrate: boolean } | null | 'locked'
```

`e2ee.ts`已获取`secretKeyFromB64(b64)`,`publicKeyFromB64`) -
唯一编辑到先前存在的加密文件,添加剂。

** 同意副本** (中文(简体) ).`src/shared/remote/consent.ts`+ 键`src/renderer/remote/ConsentNotice.tsx`:

```ts
const SHELL_ACCESS_CONSENT: string
function describeGrant(peerLabel: string): string       // "<name> will be able to run commands on this Mac — the same as giving them SSH access."
function ConsentNotice({ peerLabel }: { peerLabel: string }): JSX.Element
```

4个C级`<ConsentNotice peerLabel={…} />`在实际邀请/核准对话框中。

4c 荣誉

这些是信任层的全部点。 纯模块无法横跨
连接接合器 - 4c拥有它们, 打破任何人默默札地给予一个 MITM 弹壳
访问此机器 :

- **(a) 国家`confirmRemote`可能只能由在ENCRYPTED上收到的一个框架驱动,
会话按键频道** (框下方)`deriveSessionKey`() 从未出现过简写或
中继可见消息. 可伪造/可重播的“我确认”信号会降解相互
批准返回单向:中继器提供确认的第二人从未
给的,一个当地人确认,然后把攻击者刺上。
-**(b) 一个`MutualApproval`每对试**,通过`emptyMutualApproval(peerKeyB64, sessionId)`来自此会话的 ECDH 对等键( 相同)
他们的共同秘密创造了人类所比较的SAS 不重复尝试,
没有用不同的钥匙播种。
-**(c) 退职必须称为杀钩,而不只是无名小卒以便向它致敬。** 只拒绝
NEXT 握手; 打开的套接字保持完整的 shell 访问, 直到它自己掉下来. 4c级`onRevoke`必须切断现场直播
• **(d) 采用编码器`host-service.ts`也一样。 ** 现有`loadOrCreateKeyPair`(单位:千美元)`host-service.ts:548`)有同源键环锁缺陷`peer-identity`固定: 加密`secretKeyEnc`键读时`isEncryptionAvailable()`是假的在靴子 掉进两个
读取分支并重生新密钥( 第574行), 覆盖加密好的密钥
并迫使每个宿主起草一份新的文件 左侧4d`host-service.ts`未受设计影响; 4c 应引导它通过`key-file-codec`+ 键`'locked'`结果。

* 持久性

远程标签是一个 ** 连接书签 **, 从来不是一个工作空间 。
文件在主机上存在; 端点不能拥有它们。 下线,标签会灰化
“ 无法获取” (重用工作空间索引中现有的不可用- ref渲染) 和
点击时重新连接。 主机睡眠QQ数据丢失:睡眠冻结主机世界
(进程暂停,不运行——tmux仍然持有它们), 工作恢复在醒来,
并且通过共 Tesstach重新连接(Stage 2已经保证了这一点)。

** 文件限制:鬣狗在断开时进行画布编辑丢失
(v1没有下线排队). 接受,记录在这里 所以没有人在现场发现它。

□ 分裂——分支和大门

分站 分站 分站 分站 分站 分站 分站 分站
|,|也.
****4a** 会话抽象化(提交;仅本地)                         `feat/session-abstraction`QQ — ** 行为- 不变**: 完整套房+类型检查 绿色, 零可见 diff 一个独家用户QQ
****4b** 客户登记册`electronPlatform`|`feat/peer-registry`                                                                                                                                                                                                                                                                                                      `peer-integration.test.ts`; WebContents path bit-ise;独奏成本为0. 手动:上方的"4b → 4c接口" QQ
***4d** 信任层(钥匙、针头、共同SAS、撤销)`feat/peer-trust`- 加密/铺设单位测试;
页:1`rpc.ts`超接力; 远程标签; 删除旧方言QQ`feat/relay-rpc-main`* 4a+4b+4d*************************************************************** 963-9196).******************************************************************************************************************************************* ****************************************************************************************************************************************************************************************`relay-tunnel.test.ts`(E2EE往返+手摇前拒);全套房1690绿色. 手动二进制接受(以下)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    有助于实现
QQ **4e** 服务器版作为标签QQQ`feat/server-tab`===============================================================================================================================================================================================================================================================

4a,4b和4d在平行工作树上运行. 4c是连结点 不得向
4d之前的用户有线(赠款)`pty.create`向同行提供)。

^ 4c 着陆——运出表面,删除,以及推迟后续

** 发运的物资`feat/relay-rpc-main`页:1
- ** Bridged api** (中文(简体) ).`src/renderer/bridge/relay-api.ts` `buildRelayApi`()——满额`NodeTerminalApi`在E2EE中继器上`RelayFrameTransport`,重用ws-bridge建造器. 核心命名空间
(单位:千美元)`pty`, (中文).`workspace`, (中文).`fs`, (中文).`git`, (中文).`files`, (中文).`context`, (中文).`canvas`, (中文).`presence`, (中文).`userDataDir`, (中文).`claude.cliCaps`击中**远**核心;应用全球(`updates`页:1`clipboard`页:1`settings`留下来
** 当地**。 有两个负载例外:`pty.onData`按会话读取 LOCAL 频道( 中继)
pty 输出按主输出重新发送到那里);`dialog.selectFolder/selectFile`是应用程序
**host** 目录浏览器(远程标签的文件夹选择是主机选择——义务d).
- ** 远程会话作为项目标签**( 请检查url=中的日期值 (帮助)`src/renderer/session/relay-tab.ts` `openRelayTab`, (中文).`Canvas.tsx`) -`createSession('relay', api, label)`绑定到工程标签; Canvas 子树
键为`session.id`因此, api 互换重载( 4a 义务 3) 。 现场拆解数 +
断开处理(义务1);通过`setMeAll`(义务2)`LocalTransport(useSession().api)`是远程运输——一项协议,否
单独`RemoteTransport`。
- ** offline  我知道 + reconnection ** — 无意中将标签灰移到“ 无法获取” 并取其
会话离线( kept + 绑定, 左侧存在); 单击后重新连接并重新对齐
代码(中继报价是单用的——在v1中没有静态/固定重联). 断开时编辑
(v1,无腐败)。 用户-关闭完全处理 + 删除; 两条路径是不同的 。
- ** 在赠款时表示同意**——东道方核准对话来源`relayHost.onPeerPending`显示`<ConsentNotice>`(“<peer> 将能够在SAS上方运行命令);
确认乘坐加密隧道;`enterConfirms={false}`所以一个流浪者不能同意。
- **删除桌面客户遗留方言**(`RemoteSessionView`, (中文).`RemoteTransport`, (中文).`client-service`页:1`remoteClient`预装+通道,`data.remote`, (中文).`remote-fs.ts`和旧的
客户端/中继e2e套房). 这两个设置对话框已迁移到`relayClient`页:1`relayHost`。 。 。
- ** 项目范围共享**(处)`feat/relay-project-scope`)——中继标签现在显示主机的
ACTUAL项目,不是空白画布。 ** 主机在开始托管时选择共享 One 项目**
(单位:千美元)`relayHost.start(projectId)`; 默认 = 活动项目;在两个主机UI中都是选择者. 号码是
在主办接力会议上举行的`sharedProjectId`)——从未在配对报价中,因此没有项目
名称泄露到一个被粘贴的代码中。 主机 ** 瞄准对等点`workspace:load`对中继发送边界上的项目的答复**`scopeWorkspaceToProject`, (中文).`relay-host.ts`)——核心.`workspace:load`处理器未受影响,所以一个本地窗口仍然得到
完全的工作空间; 范围只有NARROWS(纯滤波器,经核查不能扩大或泄露)
其他项目的名称/cwds/节点)。 客户`openRelayTab`接下来`api.workspace.load()`那个
范围项目和**采用**`useProjects.adoptProject({ ...hostProject, remote: true })`. . . . . .
新鲜的项目 id, 主机节点 ids 保存如此的终端 co-attach to the host's tmux; Stage-3 突变
同步让它活下来。 标记了中继标签`project.remote`(仅运行时间),而且从未坚持**
到对等者`workspace.json`(两者均排除在外)`workspace-files.ts`和`toWorkspace`) (中文(简体) ). 两个
错误集成表面和固定: 渲染器- 全球终端地图
(单位:千美元)`parkedTerminals`页:1`coStates`/...)是赤裸的节点代号键,所以一个对等点让SAME重新克隆
本地可以在标签开关上将中继终端交叉连接到其LOCAL pty上。`terminalKey(sessionId, nodeId)`;和 核准后`workspace.load()`失败泄露
届会——现在处理在失败路径上。 共享为**每个主办会议**(更改
共享工程 = 停止 + 重新启动托管; 重排主机当前连接的节点是一个
后续(制表符保留其最后一眼节点直到下一次直播突变).
- ** 在活动会话之后继续合作**(处)`feat/relay-collab-session`——与
选项卡, LIVE 层现在也跨过隧道:光标、脸孔、聊天、焦点芯片和
帆布突变(一方打开的节点出现在另一方). 其根源被固定: Canvas's
协作层绑定在 LOCAL 会话上——静态`connectPresence`页:1`usePresence`进口
加号`[]`记录上山时间(当地)的上山效应`api`因此,在中继制表机上,
从未在隧道上发表/阅读过,也从未在布画杂志上发表/阅读过B谐音(及其核心)
发布门没有看到同行)。 固定通过 ACTIVE 会话, 重新连接到
`useActiveSessionPresence()`页:1`presenceForProject(activeProjectId)`(解决被记下来的每个核心`PresenceSession`; 无约束/当地 +`defaultPresence`因此,LOCAL
行为为字节-同义);存在组件(Facepile/PresenceChips/PresenceLayer/)
存在NamePrompt) + 光标/聊天 WRITE 读写当前会话; Canvas 的`connect`页:1`reportProject`页:1`reportFocus`页:1`canvas:mut`出版社 +`onMutation`重键在
活动会话的 ** api 对象 ** (每个核心稳定——所以本地%%% 本地标签切换器不会重置
全部顺序/重联状态, 记录的不变量, 而本地的%% relay 切换到
中继核心)。 ** 保留合同:** 扫描仪显示存在
(单位:千美元)`store.getState()`页:1`subscribe`从来没有反应`usePresence(selector)`,所以一个 20 Hz 光标框架
永远不再放弃 Canvas (`usePresence`被完全从Canvas删除). 推迟:背景
RELAY项目( 当 LOCAL 标签正在运行时) 无法直播—— 只有活动会话的`onMutation`这是
已订阅; 重新启动时再次同步 。

** 保留在 OLED 方言上(不要删除——一个运 快去的功能):** 电话服务器路径 -`host-service.ts`, (中文).`standing-host.ts`, (中文).`host-canvas-hub.ts`, (中文).`framing.ts`, (中文).`snapshot.ts`, (中文).`src/main/remote/canvas-sync.ts`(单位:千美元)`sanitizeClientMutation`,践行`phone-presence.ts`,则`remoteHost`预装命名空间,以及`ssh-fs.ts`(live SSH) (英语). 制动器的电话帆布推着门`settings.phoneAccessEnabled`(单源——它曾经挂起一个单独的`hosting`标记
方言的删除成为了孤儿, 将电话打空; 那面旗帜不见了)。

** 被削弱的后续行动(v1范围呼叫——而不是bugs):**
-**iOS迁移**——电话一直停留在旧的opcode方言上,直到*nodeterm mobile*
(单位:千美元)`~/projects/nodeterm-ios`)移动到中继隧道. 桌面侧重线`standing-host`在中继隧道上(因此迁移的电话有主机要接通)是一个**精心分离的步骤**,
4c没有这样做——它打破了运来的电话,需要明确去。 蓝图 :`docs/ios-protocol-migration.md`。 。 。
-** - (英语)`dialog`中继标签中的 open- file / open- 文件夹** — 工作树/ 确诊器
主机( 义务 d) , 但通用的“ 打开文件 ” /“ 打开文件夹 ” Canvas 呼叫器仍然使用
global( LOCAL) 对话框。 一样`ScmScope`- 写"哪个机器?"的问题; 范围化的后续。
- ** 中继制表持续/书签**——中继制表刻意不坚持(这是直播)
连接,而不是对等方磁盘上的工作空间——见下文工程范围共享)。 一个合适的
灰色离线 * bookmark* 在应用程序重新启动后幸存的你说的(与已知主机重新连接而无新内容)
配对代码)没有执行;标签在重新启动时就消失了。
- ** 重联重联** — 在重联上, 标签保持其最后的视线节点; 它不重排
人 源 源 源 源
下一个活突变。 重运行`api.workspace.load()`在重新连接时进入绑定项目将关闭。
- ** 在不减少会话的情况下改变共享项目**——每个主办会话固定共享
(更改项目=停止+重启托管). 直播"分享不同项目"控制是后续.
- ** 代理地位不通往每期商店** -`SessionStores.agentStatus`(单位:千美元)`agentStatusForApi(api)`)为每届所建,但没有文字写非本地
实例:`agent:status`订阅额高于每个项目的届会提供方,
写 DEFAULT 商店,以及`useSessionStores()`没有消费者。 化妆品直到126号
Plain- shell 保护着陆, 它读取一个节点自己的会话商店 来决定是否杀人
其终端将结束一个运行中的代理( )`terminal/live-work.ts`)——所以** 接续公园/外屏
释放没有保护**:中继节点总是读作`undefined`那里,还有 nó。`persistent:false`现在可以合法地从一个没有Tmux的中继HOST到达. 消费者已经写好了
与缝合相对,不需要改变;缺少的是每场会话的订阅`SessionStores.agentStatus`。 。 。
- **SDK聊天节点通过中继****——拒绝(`E_UNSUPPORTED`)在中继标签中,匹配服务器版.
- ** 预装** 主中继 IP 边界不包含在vitest**(需要Electron)中。 两个真人
在4c期间通过检查发现并固定了 " 双人 " ;
接受运行就是它活下来的练习。 预装模组警卫会有所帮助
- **Per-peer 撤销UI** — LandEd with Team Access(下方):每个连接-device行的**Remove**
电话`relayHost.revoke(id)`→`killRelayHostsByPeerKey`剪切一个活套接字( 设备)
必须重新支付。 既不是安全漏洞, 桌面中继路从不自动核准
针头( R)`isPinned`是电话/`standing-host`因此每个桌面重联需要新鲜的SAS.

□派代表出席——多座位中继(付费、设备座位+电子邮件邀请)

单倍中继主机现在是 **Team Access**:付费主机与最多`seats`队友(每个连接设备一个座位),5美元/座位(Stripe,后端). 核心内容
(单位:千美元)`CorePlatform.clientIds()`, 存在, 画布同步, dino, 光标聊天) 已经是 N 客户端; 此
使"主机"的收听器"多声"并包装.

- ** 多级游泳池。 **`relay-host-service.ts`替换单曲`current`带游泳池的听众
由渲染器 ID 键入:`byId: Map<id, { session|null, email? }>`. `relayHost.invite({ProjectId?,?),
• {提议,id \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \
** 上限检查**;`relayHost.revoke(id)`减一;`stop()`关闭所有。 两个传统主持人
通过添加剂的对话框路径`invite`(通过)`start`) (中文(简体) ). 每个座位还是满的
** 结果表明,邀请N人参加是蓄意发放的贝壳获取补助金。
- ** 上限=应享待遇。 **`core/license.ts` `Payload.seats?`(后端签名;** 缺席)
1 ** = 今天的单倍; 自由 → 0; 纯度`canAcceptSeat(byId.size, licensedSeats())`拒绝
编号(座标+1)`E_SEATS_FULL`** 该席位在薄荷时保留。
以可撤消的 id ** —— 关闭一次盖帽赛(同时邀请),并进行邀请- 但-
无法连接的座位可回收通过`revoke(id)`(无鬼座. 主机侧执行为 UX; a
主机绕过自己的封顶只会欺骗自己——**v2 = 服务器侧**(每个账户的中继拒绝).
- ** 安排 • 团队访问** (`TeamAccessSection`——不是溢价 ——投球 + 罐壳接触
披露 (“ 一个座位允许 shell 访问, 如 讲坛 ; 每个连接都是 我不知道 ” ) + 退出
CTA;溢价 −`Used X / N`(X = 待建+连接,匹配盖),连接设备列表
(电子邮件标签 + ** 删除** ** 不错)和** 受邀请** (电子邮件 + **`{offer, id}`+ 待定行+
复制 / Open- in-Mail 共享; 电子邮件仅是一个显示 LABEL, 绝不信任 。 一个渲染器商店
(单位:千美元)`state/teamAccess.ts`) 轨距`relay:host:peer-pending/open/closed`事件。
- ** 合同背面(单独收回,api.nodeterm.dev):**`seats`签名符(每座
Ed25519有效载荷,可选用电子邮件发送邀请(v1应用程序)
生成 + 用户共享),以及 v2 服务器侧座位执行。 有文件,不是在这里建造的。
- ** 后续:** 一个座位列显示邀请电子邮件+通用连接/待发状态; 你是个座位
至其存在名称/颜色(不同的 id 空格—— 渲染器 UUID vs ClientId) 被推迟。

□ 主机团队中继(作为主机的服务器版)

决定1的不对称("如果宿主睡觉,同伴的世界冻结")现在有一个答案:
可以运行服务器版的团队:该核心是中继主机,而 没有共享器的笔记本电脑可以是
关闭。 操作指南、作用和限制:**`docs/hosted-team-relay.md`**. 变化如下:

- ** 中继器移到核心。 **`e2ee`, (中文).`relay-socket`信任门,`relay-host`, (中文).`relay-client`的形式`src/core/relay/`· ;`src/main/remote/`继续再导出 shims 和桌面
自己的包装。`connectRelayHost`增益注射缝合物(`PeerAttach`, (中文).`PinStore`, (中文).`autoApprove`, (中文).`RelayHostHooks`, (中文).`deny()`) (中文(简体) ). Team Access不通过钩子,并走无钩路径,不变.
-** 隧道方言上的固定主机现在存在于核心**:`hosted-scheduler.ts`(一个温暖)
闲置的收听器, 刷新到值的服务器小时过期时, 仅重置一个后置
证明中继工作或在新开始时),由`hosted-service.ts`这是
主机侧机制 iOS 隧道迁移低于需求. 桌面自己的电话主机
(单位:千美元)`standing-host.ts`)仍在旧方言上;在这个排程器上重建是
保留桌面步骤。
- ** 仅供东道国同行使用。 ** 查看器、评论器、编辑器和所有者在
主机核心( R)`core/relay/access-policy.ts`一个团队访问端口仍然完全可信(决定2)。
- ** 仅对东道团队而言,书签后续行动部分关闭。 ** 加入的队伍有书签
(单位:千美元)`<userData>/relay-bookmarks.json`)并在启动时重新连接,没有新的代码,但标签本身
仍未坚持:一旦重新连接获得批准,就会出现。

^ 4a → 4c 接口(已关闭)

会话层位于`src/renderer/session/`(单位:千美元)`session.ts`+ 键`localSession.ts`) (中文(简体) ).
这些是精确导出的名称 4c 构建对照 —— 不重命名 :

-撮别/上下文:**`WorkspaceSession`(单位:千美元)`{id, source, label, api, status}`), (中文(简体) ).`SessionSource`(单位:千美元)`'local' | 'relay' | 'server'`), (中文(简体) ).`SessionContext`, (中文).`SessionProvider`đó。
-** 书名:**`useSession()`(本届会议;构成部分改为:`useSession().api`), (中文(简体) ).`useSessionStores()`(该会话的每期存储实例),`useProjectSession(projectId)`(会话标签属于).
- ** 并提出:**`createSession(source, api, label)`(每id的电源;
每期商店一次,`getSessionStores(sessionId)`, (中文).`setActiveSession(sessionId)`, (中文).`getActiveSession()`, (中文).`activeSessionApi()`(非组件代码的API访问器),`sessionForProject(projectId)`(只运行时间标签 ~ 会话解 17. 返回
今天的当地会议),`sessionCount()`(输入多会话的 UI, 例如标签)
会话标签 ),`resetSessionsForTest()`。 。 。
- ** 商店:**`createPresenceSession(api)`(单位:千美元)`state/presence.ts`页:1
和`createAgentStatusSession(persistKey?)`页:1`agentStatusForApi(api)`(单位:千美元)`state/agentStatus.ts`() —— API 将api-key 的切入点 ** 表示
因此,本地的Api决定了历史上的单子实例和
重复 AP叩头 :`SessionStores`是双
登记册每期举行。

项目 – 会话装订为 ** 只运行时间 **:`workspace.json`/ 简讯`project.json`获得没有领域,`state/projects.test.ts`有一条绊线`toWorkspace()`从不发出会话字段。`session/grep-gate.test.ts`强制禁止生产
会话层外的渲染器文件 / Bridge 读取一个核心锁定的命名空间
(单位:千美元)`pty|fs|git|chat|workspace|presence|canvas`+代理事件流) 关闭`window.nodeTerminal`。 。 。

** 义务 4c 继承**(见4a审查——在接线前读)
会议:

1. ** 远程会议的情况没有处理途径。 **`createSession`搭建店铺(有现场订阅) 没有什么能让它伤心的
下来。 任何搭载遥控帆布的人 都掌握着被敌人击退的
出席会话`connect()`并拨打断线,或商店保持
连接中断的订阅 。
2. ** 经常预算:`setMe`仅复会。 ** 重新命名自己更新和
在所呼吁的会话上进行转播;另一场直播会保留
广播旧名直到重新装入。 4c 需要一个粉丝 跨会议或
共享身份切片。
3. ** 资源效应捕获`api`- 4c 必须在Api上恢复
页:1 这是在4a中深思熟虑的:添加`api`改为`[]`-dep资源效应
(TerminalNode的PTY,编辑Node的摩纳哥,ChatNode的驱动程序)将创建一个第二
PTY/Monaco/刹车驱动程序在任何api变化上. 结果: 如果会话的api是ý
在 PLACE (在同一会话下重新连接新建 RPC 客户端) 中互换过 ,
这些节点一直和老核心说话 直到重新上架...`EditorNode`将
从核心 A 和 SAVE 到核心 B 的 LOAD。 ** 4c 必须按会话按会话对会话的子树键
id / api 身份让 api 更改重载它 。 ** 这是最重要的一行
在这种交接。
4. ** 短短的短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短`CloneRepoDialog`'文件夹拾取器是本地客户端。 ** 本地目录拾取器
在 CLIENT 机器上选择一个路径, 而克隆运行在会话的核心上 ——
今天无害( 相同的机器) , 在远程标签上错误 。 4c 必须在每名拾取者行驶
会话(服务器版的应用服务器目录浏览器是先例).
5. ** 已删除的命名空间仍在读取:**`sshProject`很好地,`contextLink`很好地,`context`很好地,`transcripts`很好地,`handoff`很好地,`files`。它们生活在文件 4c 重写; 4c
每项决定(核心约束会议或应用性全球)必须保留在客户身上。

。 。 。

- ** 核心试验为运输不可知性试验**(对`CorePlatform`伪造)
并且已经包括存在/共同行动/配合——它们证明核心,没有改变。
-**4a的大门是最坚固的**:一个纯粹的重构物被"没有改变"所证明——即:
整个现有套件,加一个grep门(无)`window.nodeTerminal.pty|git|fs|...`在会话层之外).
- ** 新的继电器载具试验(4c的核心交付品):** 一个试验的两个核心
过程与内继,`rpc.ts`隧道; 称你好 在场
同步,跨隧道共管(一个产卵,两个都漆),`canvas:mut`盖章,
和后压信号(一个缓慢的对等点行驶的滴滴和重排天花板).
-**删除旧方言的爆炸半径**——18个测试文件,~97个在委员会测试,三个命运:
- *删除代码*(~49):`framing`, (中文).`snapshot`, (中文).`host-handlers`, (中文).`client-handlers`, (中文).`host-canvas-sync`中继`canvas-sync`, (中文).`client-canvas-router`, (中文).`remote-fs`他们测试方言本身;
替换 với服务器版。
- *必须维持不变* (~24):`e2ee``pairing``relay-id``approved-devices-core``relay-socket`——载体+加密层. 一个4c
断开其中任何一块划得太深; 这是明显的合并门 。
- *重写*(~20+2跳过e2e):`remote-security`, (中文).`standing-host`, (中文).`host-service.presence`, (中文).`relay-e2e`, (中文).`b5-e2e`同样的关切,新的协议。
- ** 人工接受=阶段1-3两个客户的烟雾文字,没有改动。
中继** 介于两个应用实例之间(`NT_MULTI=1 NT_USER_DATA=...`已经
),加上中继特定步骤:主机睡眠/觉醒(Pier的终端返回通过
共切),电缆拉动,取消会话中段(立即切除),同时编辑
断开( 验证它们丢失 * 和 * 没有腐败 ) 。
- **4c 双层验收清单(合并前运行——活门为vitest)
套件无法到达,因为预装的 QQ main 中继 IP 需要 Electron :**在一个Mac上,
启动两个实例(`NT_MULTI=1 NT_USER_DATA=/tmp/nt-A npm run dev`和第二个`/tmp/nt-B`) (中文(简体) ). 然后:
1. A上,启动远程主机(新远程连接=主机),** 选择共享的项目**
(default = active),并复制配对报价.
2. 在B上,将要约粘贴 —— 都显示相同10位SAS** —— B看到**同意通知**
在A的核准中确认 + 在两者上确认 + ** 共享项目打开作为 B 的标签,已经
A的节点**(NOT是空白画布——这是工程镜检查). B只看见
共享项目,而不是A的其他项目。
3. 在标签上输入终端 —— 它运行在A(主机)上, 两个画家都显示它
(** 联合附件**) 在两侧增加/移动一个节点 − 它同步到另一侧(Stage-3突变).
** 生活-协作检查:** B看到A的**cursor**(图式,有名字)和A的**面**
在脸孔中,反之亦然;在EirHER一侧打开/移动/删除的节点出现在
其他;聊天泡交叉。 (如果帆布被覆盖但光标/广播缺失,则
活动会话串联线接线被倒退——见"在活动会话之后进行互动". )
4. 睡眠/盏醒 A → 同伴的终端通过同位素返回(tmux还活着).
5. 拉B的网络 ~ 标签 **greys 到"不可用"**;恢复 + 点击 → ** 重新连接 **
带有新代码; 已断开的编辑器丢失, 没有腐败 。
6. ** 建立实时对等程序** —— 今天通过** 主机站** (新远程连接) 停止托管,或`relay:host:stop`B的会话立即结束(打开的套接字被撕掉,而不只是
接下来握手。 逐级撤销(`killRelayHostsByPeerKey`+ 测试 + 断线
尚未有渲染器触发器(见延迟后续)——所以v1通过主机停止切换*所有*对等器.
7. 确认**电话仍然在** 自己的方言上工作(可设置 ~ 电话在A,
连接 iOS app)——客户端-透视删除一定没有碰过它.

^ iOS(单独的repo——跟踪,而不是相同的PR).

**4c保留了电话方言,所以电话今天仍然有效**——任务10中的删除是
仅标为桌面- ** 客户端** 方言; 电话`standing-host`+ 键`host-canvas-hub`+ 键`framing`页:1`snapshot`路径是完好无损的,仍然靴子。 所以电话不会被4c困住

迁移交涉是未来的、刻意进行的,分两部分进行(没有在4c中完成,因为它打破了运出的货物)。
特性未明确去 :
1. **iOS repo**——斯威夫特客户端重写其电线层与`rpc.ts`(它现在说话
opcode方言). 蓝图 :`docs/ios-protocol-migration.md`。然后获得命名的存在
(单位:千美元)`presence:hello`),git,代理状态,co-attach, 和打字徽章 欢迎它已经半身。
(二) 通信设备`standing-host`在中继隧道上重新连接(`relay-host`在锁步,所以
迁移的电话有一个主机要联系,旧的方言文件最终被删除. 只有一次 一次吗?
这两块土地都把电话移到隧道上;直到那时,它一直停留在保留的老方 104.上.
节点-桌面协议工作( 隧道 + 桥化 api) 完成 4c; iOS 任务
合并。

□超出范围(v1)

混合家庭画布; 离线编辑队列; > LWW 冲突语义( Stage 3's)
记录的种族结转; 语音/视频; 跟踪模式; 客/只读角色;
许可证执行的改变(上文开放决定)。
