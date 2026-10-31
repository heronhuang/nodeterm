> English: [docs/en/ios-protocol-migration.md](./en/ios-protocol-migration.md)

# iOS 伴奏——中继协议移位谱(Stage 4 / 4c)

** 现状:** iOS侧重写蓝图。 节点侧面执行于`feat/relay-rpc-main`。 。 。
** 观众:** 斯威夫特开发者(或孰为iOS-side Claude会话)重写`~/projects/nodeterm-ios`电线层。 退票时没有回扣
文档是 * 只* 合同; 不要猜测线形, 它们是转写
各节引用的节点来源的字节换字节。

> 这是设计文件。 这里没有Swift,节点方面没有变化
> 因为这个文件除外.

- - - 说吧

□总论.

Nodeterm's stage 4 崩溃了 ** 2 ** 客户端 QQ核心协议变成了 ** 1 **.

电话今天会说话`framing.ts`操作码
(单位:千美元)`OP.Input`页:1`OP.Output`页:1`OP.Snapshot*`. . . . . . . .`snapshot.ts`三阶段屏幕
重新组装,`host-service.ts`手卷式RPC词汇表,`host-canvas-hub`因为`canvas:state`全州镜像,`sanitizeClientMutation`——已删除**。
- 改为**服务版的WS-RPC**(`src/shared/rpc.ts`(隧道)
逐字记录在现有的E2EE中继框内。

安全信封( NaCl 框, 每段 HKDF 密钥, 角色字节, 单调)
反重播后继,波段外 SAS)是** 形状不变** 但得到两个硬化
规则 iOS 客户端必须尊重, 信任模式成为 ** mutoual ** (两者都是人类)
比较 SAS ; 两者都确认; 都标定对等键).

** 顺序:** 当节点删除了 opcode 万一的方言, 电话仍然
无法连接极为重视。`rpc.ts`作为交换,电话停止
成为一流的客户端`CorePlatform`客户端** — 服务器版 加所开展的: git、 存在、 代理状态,
终点站联合接驳

** 这必须与节点-侧面变化兼容**(常设电话主机是
仍与旧方言相连——见"德士克托普-侧锁步工作". 两边都不行
一个人

- - - 说吧

□什么变化和为什么

在( opcode 方言) 之前的( rpc. ts 隧道) 之后的( rpc.
|,|也.
中继条目 。`wss://…/?token=<token>`** 未更改** * *
E2EE握个手`e2ee_hello → e2ee_ready → e2ee_auth → e2ee_authenticated`**** 形状不变**,+汝"准备完毕后无重键"+对等键针 #*
HKDF 会话密钥下的交通加密 NaCl 框; 密封的纯文本`[role][seq][tag]…`** 未更改** * *
内载荷标记`0x01`RPC信封,`0x02`二进制终端框架( E)`framing.ts`现在`0x03`隧道文本( rpc. ts JSON) +`0x04`隧道二 II( R)`encodePtyData`) (中文(简体) ). 标记`0x01`页:1`0x02`是遗留的,不再被迁移的对等方使用。
QQ App协议 QQ`framing.ts`密码+`snapshot.ts`+ 键`host-service`RPC 动词`src/shared/rpc.ts`编号 :`req`页:1`res`页:1`cast`页:1`ev`JSON 帧+ 一个二进制 pty 帧 QQ
|  Trust  Trust  Trust | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
=========================================================================================================== ==践=================================================================晴`CorePlatform`: pty, git, fs, 存在, 代理状态, 画布, co-attach QQ

为什么现在:应用程序没有发布,所以该方言被删除(没有贬值全面参与)——这是
一瞬间却一无所获 见`docs/remote-sessions.md`。 。 。

- - - 说

□ 1. 隧道协议——`src/shared/rpc.ts`

一旦会议`ready`,每个应用程序消息都是`rpc.ts`带框
E2EE框内(框见§2). 有**4种JSON帧类型**和
**一个二进制框类型**.

* 1.1 JSON帧(作为隧道文字、标记携带)`0x03`页:1

所有JSON,UTF-8编码. 精确类型脚本形状( S)`rpc.ts`第6至第11行:

```
RpcRequest  = { "t":"req",  "id": <number>, "method": <string>, "args": [ ... ], "undef"?: [<number>...] }
RpcCast     = { "t":"cast",                 "method": <string>, "args": [ ... ], "undef"?: [<number>...] }
RpcOk       = { "t":"res",  "id": <number>, "ok": true,  "result": <any> }
RpcErr      = { "t":"res",  "id": <number>, "ok": false, "error": { "code": <string>, "message": <string> } }
RpcEvent    = { "t":"ev",   "channel": <string>, "args": [ ... ], "undef"?: [<number>...] }
```

- ****`req`** 电话等待答复。`id`是客户选择的单音节** 数字**
(无弦. 核心答案为`res`带有相同的`id`。 。 。
- ****`res`** 答复。`ok:true`→`result`(任何JSON;核心替代品)`null`为返回的操作员`undefined`) (中文(简体) ).`ok:false`→`error {code, message}`。 。 。
- ****`cast`** 单向、无答复、无答复`id`(例如:`pty:write`,  你不觉得`presence:cursor`) (中文(简体) ).
- ****`ev`** 一个核心-客户活动`channel`(例如:`presence:sync`, (中文).`pty:exit:<sid>`) (中文(简体) ). 电话只收到`ev`它从不发送一个。

** 错误代码** 电话必须识别(`rpc.ts`13 - 18岁:`E_UNSUPPORTED`, (中文).`E_UNAUTHORIZED`, (中文).`E_NO_HANDLER`,客户端合成`E_DISCONNECTED`iOS应合成
有关                                                                                                                                                                                   (                                                                           程序相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关相关`E_HANDLER`(一个处理器扔).

** 回答 id 语义:**`id`*在一个关联内相关。 重置的计数器
重新连接。 匹配 a`res`严格通过`id`; 丢弃一个未匹配的.

* 1.2 报 告`undef`字段——无定义 vs 无线(READ Thist)

`JSON.stringify([a, undefined])`变成`[a, null]`原JSON没有`undefined`这样
省略的随附任择论据将构成明确`null`- 还有
明确`null`** 不** 触发 JS/TS 默认参数。 几种方法包括:
** 意义 **`null`, , , , , , , , , ,                                                                                                                                                                                                                                            
未定义`. Examples where `无效是真实的,必须生存:

- 说吧`pty.resize(sid, null, null)`- 共助信号 ** park ** 信号(从尺寸上放我下来)
分类账)。 折叠到`undefined`将每个共同观看者的共享 pty 缩小到 1×1.
- 怎么样?`presence.cursor/focus/chat/project(null)`- 清 你已经准备好了

因此,**sender** 解析出带:`undef`是 ** 顶级的数组
参数索引**`undefined`参数 *值 * 从未被检查,所以没有
有效载荷可以伪造所进行的标记。

**iOS MUST同样执行两边**,否则会击中无定义的bugs:

** 编码( E)`encodeArgs`,第57-65页):** 行不妨走`args`; 用于每个槽
语言“ 缺席/ 未定义” , 将其索引推向`undef`和地点`null`输入
数组。 释放`undef`** 只在非空的情况下**。 向框架扩展 :`{ "t":"req", "id":…, "method":…, "args":[…], "undef":[…] }`. ..

** 二级`decodeArgs`页:1`undef`是非空数组, 复制`args`并且将每个列出的索引放回您的"缺席"哨人。 ** 保护指数**:忽略
任何不是整数的条目`[0, args.length)`——垃圾指数必须标记什么.
并且永远不能延长数组(一个敌对的/ buggy 端点不能创建槽) 。

** 仅标上层档次。 ** A`null`/ 弃置在物体或阵列内
是发送者自己的数据( Y)`{cwd: null}`不是一个`{}`)——让它与JSON给予的完全一样.
这个 不要重现。

对于电话来说,这最重要 在**出界** 铸/里克,你省去了一个线索
可选(例如)`git.history(cwd)`没有`limit`)和关于** 已进入**事件/结果
核心省略了一个。

### 1.3 二进制 pty-data 框架 -`encodePtyData`/有望`decodePtyData`(第117-141条)

高容量 pty 输出为 ** not ** JSON ——是一个紧凑的二进制框架,作为
隧道二进制( tag)`0x04`) (中文(简体) ). 字节布局 :

```
byte 0        : 0x01                      (PTY_DATA_FRAME magic)
byte 1        : (sidLen >> 8) & 0xff      (session-id length, uint16 BIG-endian, high byte)
byte 2        :  sidLen       & 0xff      (low byte)
bytes 3 .. 3+sidLen           : sessionId, UTF-8
bytes 3+sidLen .. end         : data,      UTF-8
```

- 神奇的字节是`0x01`。 ** 不要将其混淆** 与密封的平面文字标记字节
(§2)——不同的层. 当你解密这个框架时 你已经剥光了
框头和`0x04`隧道二进制标记; 遗存的字节 0`0x01`。 。 。
- 怎么样?`sidLen`是** big-endian ** (注:§2中的后框是小-endian——不混合)
他们起来。
- 如果`buf.length < 3`, (中文).`buf[0] !== 0x01`,或`3 + sidLen > buf.length`。 。 。
- 那个`data`是原始终端字节解码为UTF-8。 这是替换`OP.Output`。 。 。

** 指示:** 电话只收到** pty-data binary frame(core ~ phone).
电话 — 核心输入是 JSON`cast`(单位:千美元)`pty:write`),从没有二进制框架——主机采取必要行动.
忽略边界二进制隧道框架(`relay-host.ts`:"精巧的输入骑着JSON铸造").

- - - 说吧

□ 2.为指导中继器上架设的E2EE握手+隧道-.`src/main/remote/relay-socket.ts`(+ 数)`e2ee.ts`页:1

中继器是一个哑字节前导器,配对符;它从不解密. 这个
被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的与委员会的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被拒绝的被的被拒绝的被的被的被拒绝的被拒绝的被的被的被的被的被的被的被的被的被的拒绝的被的被的拒绝的被的被的被的被的被的被的拒绝的被的拒绝的被的被的被的被的被的被的被的拒绝的被的被的被的被的拒绝的被的被的 未的被的被的被的被的被的拒绝的被的被的被的被的被的被的被的被的被的被的被的被的被的被的被被的被的被的被的被的被的被的被的被的被的被的被的被的被的被的被的被的

^ 2.0 密码原生(`e2ee.ts`)——必须准确匹配.

- ** 框:** NaCl`box`= 曲线25519 + XSalsa20-Poly1305 (中文(简体) ).`tweetnacl`; iOS: 一个
互操作性NaCl/ libsodium`crypto_box`) (中文(简体) ). 一个框的线格式是`nonce(24) ‖ ciphertext ‖ mac(16)`(单位:千美元)`encrypt`, e2ee.ts 76–84: a **24字节**随机
信件未准备到`box.after(plaintext, nonce, sharedKey)`。 。 。`decrypt`将前24个字节拆分为nonce,打开其余字节,返回错误的 MAC 时无效。
- ** baseKey(身份/SAS密钥):**`deriveSharedKey`= 'nacl.box. bef可持续发展问题,
`(ECDH预先计算)。 稳定每件设备。 ** 从未加密过
* 直接交通。 **
- **SessionKey(交通钥匙):**`deriveSessionKey`=
‘HKDF-SHA256(ikm = baseKey,盐 = 主机 Nonce = 客户端 Nonce,信息=
"nodeterm-relay-session-v2",长度=32)'(e2ee.ts 62–73). RFC 5869 HKDF; 匹配
iOS  Cry  Cry  Cry`HKDF<SHA256>`** 盐订单是主机nonce先,然后客户端nonce,
(b) 担任两个职务。 **
- ** 会议无::**`randomSessionNonce`=**16** 随机字节(从
24字节盒非ce。 以握手方式交换,控制框基数64.

> 两个不同的非ce存在. **16字节**会议非曲直喂食HKDF盐. 那个
> **24字节**框非ce是每封加密消息的新随机值,并生活在
每个盒子。 别把他们扯进来

2.1 运输框架歧视

在转发 WebSocket 上:
- **文本**框架=简写握手控制JSON(`e2ee_hello`页:1`e2ee_ready`) (中文(简体) ).
- **二进制**帧=E2EE盒。

中继保存文本/二进制-性结束到结束. 客户端发送代号作为查询
Wss URL 上的参数: 附加`?token=<urlencoded token>`(单位的自由`&`如果 URL 已经有一个
查询). 该标志为**绝不**是一个数据框架.

2.2 手握手势,一步一步

客户端在前面知道主机的公钥( 从对齐); 主机学习客户端
从`e2ee_hello`。 。 。

** 第1步 — 客户端 — 主机, PLAINTEXT 文本框 : **```json
{ "type": "e2ee_hello", "publicKeyB64": "<client box pubkey, base64>", "nonceB64": "<16-byte client nonce, base64>" }
```客户端已经计算`baseKey = ECDH(hostPub, clientSecret)`.  也许我可以

** 第2步——主机 客户端,PLAINTEXT文本框架:**```json
{ "type": "e2ee_ready", "nonceB64": "<16-byte host nonce, base64>" }
```主机现在计算`baseKey`从客户puke正在进行,`sessionKey = HKDF(baseKey, salt = hostNonce ‖ clientNonce)`。 。 。

** 第3步——客户端 主机,ENCRYPTED盒。 ** 客户也一样`sessionKey`(Salt = 主机 Nonce 挚客 Nonce) 并发送一个封存的简写是`[role][seq][ tag 0x01 ][ {"type":"e2ee_auth"} ]`(标题见第2.3节)。
对MVP来说,这是一个赤裸的认证标记——中继器已经检查过该符号和
所以没有额外的秘密可以证明 把它封起来
会话密钥( 新的非会话) 停止从早先的会话中记录的认证框
重放过

** 第4步——主机——客户端,ENCRYPTED框:**`[role][seq][ 0x01 ][ {"type":"e2ee_authenticated"} ]`。 。 。

双方设定状态`ready`并发射"准备" 一旦他们一方的认证交换
完结。 ** 在此点之后, 每个信件都是 E2EE 框; 不再使用纯文本控制
框架是合法的(第2.4节)。 **

`nonceB64`解码碼碼頭頭 16字节或丟掉框框

2.3 密封框格式(每个框的简写INSIDE)

封印前,发件人会预留一个信头(`relay-socket.ts`250-265): (中文(简体) ).

```
byte 0            : role     (host = 1, client = 2)   ← the SENDER's role
bytes 1 .. 9      : seq      (uint64, LITTLE-endian, split as two uint32 LE: low @1? see note)
bytes 9 .. end    : payload
```

seq 编码细节( 必须匹配 ) :`view.setUint32(1, floor(seq / 2^32), true)`我知道该做什么了`view.setUint32(5, seq >>> 0, true)`——即 **字节 1.5 = 高 32 位 LE,字节 5.9
=低32位 LE**,每个小-endian. 总标题=**9字节**(`HEADER BYTES=1+)
页:1

以小小小小小横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横全面落实横横横横横横横横横横横横像个横横横横横横横就有关横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横横`relay-socket.ts`284 - 289 (中文(简体) ).`[tag:1][body…]`。 。 。
标记 :

```
0x01  TAG_RPC          legacy peer RPC envelope (JSON)   — used only in the handshake now (e2ee_auth/authenticated) + keepalive
0x02  TAG_FRAME        legacy framing.ts binary frame     — NOT used by a migrated peer
0x03  TAG_TUNNEL_TEXT  a rpc.ts JSON frame (§1.1)          — the phone's main inbound/outbound text channel
0x04  TAG_TUNNEL_BIN   an encodePtyData frame (§1.3)       — the phone's inbound pty-output channel
```

因此,一个完整的外出应用信息是:`box( [role][seq]  +  [0x03]  +  utf8(JSON rpc frame) )`用于文本,或`box( [role][seq]  +  [0x04]  +  encodePtyData(...) )`二进制

** 收件人支票按顺序排列(`relay-socket.ts`318-347),iOS上的所有强制规定:**
1. 解密方框`sessionKey`; 如果失败或短于 9 字节则下降
头曰.
2. ** Role检查:**标题角色字节必须等于**peer**角色,而不是你自己的角色. A级
框中标有您自己角色的选项是继电器 * reflection * — 放下它。 (主机接受)
角色2,客户端接受角色1. )
3. ** 反重放:** 读以下各段;必须** 严格** 大于**
已接受的以下各条`recvSeq`请检查date=中的日期值 (帮助) 。 放弃`<= recvSeq`这个
失败重放和重排。 每(重)连接重置计数器.
4. 剥离9字节头;由有效载荷标记字节发送。

您的** 出局** 下限从 0 开始, 并按您发送的每个框递增 1 个( 每个方向)
拥有自己的柜台。

• 2.4 安全——没有中段重键,将对等键钉上

这是一个安全嗡嗡iOS**必须**荣誉(`relay-socket.ts` `handleControl`, 350–398, (中文(简体) ).
和保安区:

- ** 会议是`ready`,简写握手控制框架(`e2ee_hello`页:1`e2ee_ready`) 被忽略-从未重新处理。 ** 后处理一让
中继 MITM **re- key a live session ** 在自己的 keypair 下( 重新定义 )
基础/ 会话密钥, 覆盖对等端的 pubkey) , 然后伪造对等端的加密`trust:confirm`根据互换的钥匙——将相互批准降格为单向。 那个
真实的对等者不会在既定会话中重新发送问候。 ** 不带
重新按键,不关闭套接字**(中继器已经控制运输);
关闭会给一个MITM一个微不足道的撕裂 并且没有增加保护。 iOS 必须执行
同样的"准备后冻结"规则。
- ** 在对等对象的盒子中为会议提供公用钥匙。 ** 对于电话(客户角色)
主机密钥在前方( 从配对) 已知, 是被绑定的身份; 处理任意
作为攻击的分歧。 节点主机在每条隧道上额外重新加载
组合键的同位素键仍然等于握手时的密钥键,以及
将会话切除为不匹配( E)`relay-host.ts` `peerKeyIntact`) iOS的等效词:
您获得的主控键`baseKey`/SAS是本届会议唯一呗;
绝不接受重按键会话。

2.5 保持状态

主机每~25 s 发送一个保存器作为加密`0x01`- 挂着JSON`{"kind":"keepalive"}`;接收器忽略了它. iOS也可能发送一个(可选),但
必须默不作声地忽略一个进入的恒存。 (这是遗留的TAG RPC信封,仍然是)
仅用于保存式+两个握手式认证标记. )

- - - 说吧

□3. 相互批准——信任握手(`relay-trust.ts`+ 键`mutual-approval-core.ts`+ 键`docs/remote-sessions.md`页:1

第4阶段使电话成为**peer**, 和一对**grants贝壳访问**在主机上
机器 机器 电脑 中继MITM和那罐壳之间唯一的事情是**mutual SAS批准**:
波士顿人把同样的六位数代码比对出来, 按确认。

3.1 SAS(v2:10位数) -`sasFromSharedKey`(e2ee.ts) (中文(简体) ).

两端都从`baseKey`(欧洲人权法院共享秘密,即NaCl)`box.before`= HSalsa20(X25519)——**不**会议关键:

```
h    = SHA-512(baseKey)                                   // nacl.hash
a    = BE_u32(h[0..4]) mod 1_000_000                      // the v1 code
b    = BE_u32(h[4..8]) mod 10_000                         // four more digits
SAS  = pad6(a)[0..3] + " " + pad6(a)[3..6] + " " + pad4(b)   // e.g. "123 456 7890"
```

`BE_u32(x)`=4字节读作**big-endian,未签名**. 前七个角色是
准确的 v1 代码 (`"NNN NNN"`, ~ 20 比特), 所以一个旧建筑的对等点, 仍然显示 6
数字可以比较前六. 单是v1就可磨:一个攻击者代替一个
绑定键(一个被篡改的报价,加入代码或QR)在秒内匹配两条腿;v2为~33位.

每个显示 SAS 的表面, 在它下面, 精确地说: * compare all 10 位数. 如果
其他设备只显示6个,它运行一个更古老的版本:比较前6个"*.
(单位:千美元)`src/shared/remote/sas.ts`) (中文(简体) ).

测试向量( E)`src/core/relay/e2ee.test.ts`; 用 Python 独立计算`hashlib`:

QQ BaseKey( 32 字节) SAS QQ
{\fn黑体\向秘书处提交资料
第32页`0x00`|`809 281 4822`|
第32页`0x01`(SHA-512开始)`5ce86efb 75fa4e2c`) (中文(简体) ).`736 635 8284`|
|`0x00, 0x01, …, 0x1f`|`170 596 5663`|
第32页`0xff`|`773 237 5799`|
|`0x00, 0x17`向其报告`0x00`|`071 120 4361`(领先于六位数)
|`0x00, 0x0b`,然后为 30 ×`0x00`|`243 975 0790`(领先于四)                                                                                                                                   

结尾: 秘密 A = 32 ×`0x01`, 秘密 B = 32 ×`0x02`• 阴道`pOCSkrZRwni5dyxWn1+puxPZBrRqtoyd+dwrRAn4ogk=`缩写, pubB`zo060cy2M+x7cMF4FKXHbs0CloUFDTRHRboFhw5YfVk=`,生X25519号`2ed76ab549b1e73c031eb49c9448f0798aea81b698279a0c3dc3e49fbfc4b953`, (中文).`box.before`
`18a99320f3488fa18a04239715d8ee738065e65c3d4b2898522d6c3d4ead588c`页:1`561 048 8895`页:1

终止两个不同的ECDH交换机的MITM产生两种不同的代码  Anh拒绝。

* 3.1a 密钥摄入:低序密钥和犬科基础64

- ** 使用低序对等键。 ** 如果生下来`X25519(ourSecret, theirPub)`全部为零,
键是一个小顺序点(0, 1, 两个顺序-8点, p−1, p, p+1), 每个点都有顶端
设置)和`box.before`将是HSalsa20(0):一个**公共常数**。 一个没有秘密的同伴
完成握手, 人类看到相同的固定 SAS, 任何人在线上获得
会话键。 桌面在它需要的任何地方拒绝这样的密钥(手摇两个角色,
配对报价,加入代码,`/pair` `epk`披针店,`team add-owner`关闭套接字
没有回答。 电话也必须在确定电话内容时拒绝。`hostKey`中继块,`relay.json`:检查原X25519输出,而不是`box.before`输出。
- ** Canonical base64 only**, paddated,标准字母表:解码字节必须重编码为
准确的输入。 节点的解码器跳过废品( N)`"!!!" + key`解码到密钥),并比较密钥
store  as  spelling  spelling
没有它自己的针。 每个制片人都已经准备好了

第3.2条 确认框架——必须搭乘ENCRYPTED隧道

"我确认"信号是`rpc.ts`** 广播** (`relay-trust.ts` `TRUST_CONFIRM`:

```json
{ "t": "cast", "method": "trust:confirm", "args": [] }
```

通过`sendTunnelText`——即作为隧道文字(tag)`0x03`在E2EE盒子内**
(单位:千美元)`relay-trust.ts` `confirmHere`,第117行). 这是故意的,不** routable RPC
方法: 主机在信任门中消耗, 绝不转发给任何处理器
(单位:千美元)`onTunnelText`返回时`true`=消费)。 iOS 接收时必须这样做: 确认`{t:'cast', method:'trust:confirm'}`穿过隧道到达信托中心
b. 国家,**不**RPC调度员。

**SECURITY——一个简写确认是一个安全孔,桌面会拒绝它。 **
只有在加密、按会话键到达时,确认才被接受。
角色标记、 重播检查的频道( T)`onTunnel`) (中文(简体) ). 纯文本中继框仅达到`handleControl`,仅理解`e2ee_hello`页:1`e2ee_ready`并在那里死去——它可以
从不预先批准 iOS必须:
- 只在隧道上确认(绝不是普通文字框架),以及
- ** 接受** 对等方的确认仅从本届会下解密的框架进行。
键(通过角色+后续检查)。 永远不要从任何简洁文本中预先批准或
未经认证的来源。

如果确认书能够以任何其他方式送达,相互批准会悄ụ无声地降低到单向,
攻击者提供了第二个人类从未给予的确认。

3.3 作业顺序(两端对称)

每对配对尝试 完全有** 1 ** 批准状态,在创建时绑定到
** 本届会议的** 对等键和一个会话代号(`空的Mutual Approval(peerKeyB64,
因此,从一个会话得到的确认实际上不能跨入另一个会话。

1. 握手完成 □`ready`(§2) SAS成为可用.
2. 各方向人类展示SAS**。
3. 人类A型新闻机`localConfirmed`** 边
发送`trust:confirm`穿过隧道
4. 同行收到`trust:confirm`穿过隧道 —— 缝隙`remoteConfirmed`。 。 。
5. 当一方有** 两者 **`localConfirmed && remoteConfirmed`,它正对端的
框中的公用钥匙** 其持续核准的设备商店** 首先是**,然后打开
届会`recordApproval`调查 调查 调查
由国家携带。 每一端都钉着**的内容
6. 直到现在,主机才将电话登记为`CorePlatform`客户端并启动
服务RPC. 在此之前,任何`req`电话团聚了
\ t:''s, ok: false, 错误:有悖于 {代码:"E UNAUTARIZED减缓贫穷", 消息:"等待相互
核准。` (`609. 中继主机.ts ' 191 - 200)——iOS必须预见到并浮出水面。

3.4 持久性设备密钥 + pinning

- 电话盒的键盘必须具有**持久性**(通过重新连接的稳定身份),
不是麻风。 它的公钥是桌面的针头. (在桌面一侧)
键已装入/ 创建一次并重新使用; iOS 必须做到等效并保留
密钥在密钥链中。 )
- 在后来从一个已经固定的对等点重新连接上,桌面的*固定电话
主机* 可以自动无声( pin-once) —— 但参见§7中关于
电话路径是每次使用完全的SAS,还是第一次之后使用pin-once
相互认可。 iOS应该坚持宿主的固定键并警告
如果它曾经改变(键替换).

-- -- -- . . .

□ 4. 移徙的iOS性别问题认识信息和联网系统

在新隧道上,电话是一流的`CorePlatform`客户端——相同的表面`src/server/ws.ts`给一个浏览器。 RPC方法名称是`IPC.*`频道
字符串;电话给他们打电话`req`页:1`cast`订阅`ev`频道。

4.1 终点站/pty(`PtyApi`, (中文).`src/shared/types.ts`页:1

请求(`req`和铸造者,

方法`method`字符串) \ \ \ \ \ \ \ \ \ \ \ \ \
|,|也.
|`pty:create`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}你是谁?`(options: PtyCreateOptions)`|`PtyCreateResult`(第5节)
|`pty:write`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}你觉得呢?`(sessionId, data)`| | |
|`pty:resize`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}你来干什么?`(sessionId, cols\|null, rows\|null)`                                                           `null,null`= 公园;需要§1.2`undef`) (中文(简体) ).
|`pty:flow`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}你觉得呢?`(sessionId, resume:boolean)`| | |
|`pty:kill`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}你觉得呢?`(sessionId)`——(截断;tmux幸存).
|`pty:destroy`{\fn黑体\fs22\bord1\shad0\3 我来告诉你`(persistKey)`| –(永久失效) | |
|`pty:recycle`{\fn方正黑体简体\fs18\b1\bord1\shad1\3cH丫头 {\fn方正黑体简体\fs18\b1\bord1\shad1\3cH的预算 {\fn方正黑体简体\fs18\b1\bord1\shad1\3cH2F2F2F}美国著名导演`(persistKey)`——( Collinsa-move-in-worktree) ————(移动到工作树上) ————
|`pty:capture`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}你觉得呢?`(persistKey, full?)`|`string`|
|`pty:read-scrollback`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx6 nói`(persistKey)`|`string`|
|`pty:send-text`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}你觉得呢?`(persistKey, text)`|`boolean`|
|`pty:read-session-name`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}你觉得呢?`(sessionId, accountId?)`|`string \| null`|

入境事件`ev`渠道;`<sid>`= 会话 :

* 频道* * 有效载荷* * 注* *
|,|也.
|`pty:data:<sid>`                        **二进制**`encodePtyData`框架 (§1.3) QQ终端输出; 唯一二进制通道 QQ
|`pty:exit:<sid>`|`(exitCode:number)`程序退出
|`pty:size:<sid>`|`({cols, rows})`++ 权威的 co- attach 大小( 最小的订阅者获胜) ++
|`pty:closed:<sid>`|`({by: ClientId\|null})`QQ 另一个客户端永久销毁了节点QQ
|`pty:recycled:<sid>`|`(RecycledInfo {ready})`、
|`pty:resync:<sid>`|`(screen:string)`我们落后了; 重置模拟器 和重新油漆从这个。

4.2 出席情况`PresenceApi`)——电话是**无浊音的同位素**

############################################################################################################################################################################################################################################聆###################
|,|也.
|`presence:hello`{\fn黑体\fs曾多次见面`(identity: PeerIdentity {name, color})`的 +++++++++
|`presence:cursor`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}你觉得呢?`(cursor \| null)`——电话没有鼠标:留着这个`null`|
|`presence:focus`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}你觉得呢?`(nodeId \| null)`|
|`presence:chat`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}你觉得呢?`(text \| null)`|
|`presence:project`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}我们来`(projectId \| null)`|
|`presence:sync`{\fn黑体\fs22\bord1\shad0\3aHBE\4aH00\fscx67\fscy66\2cHFFFFFF\3cH808080}你觉得呢?`(PeerState[])`- 加入的完整名册
|`presence:peer`===================================================================================展开了对================================================有助于提高==================================`(PeerDiff)`. . . . 耿耿于怀.`{op:'join',peer}`再见`{op:'update',clientId,patch}`再见`{op:'leave',clientId}`|

电话与现场连接`kind:'phone'`(指定东道方),不动**
(cursor语`null`),只出现在脸孔里. 它可以发送`presence:hello`(名称)
存在——新;旧方言没有名称,`presence:focus`, (中文(简体) ).`presence:chat`, (中文(简体) ).`presence:project`,并接收完整的光标/面板 diff 流。`PeerState`/ 页 次`PeerDiff`形状 :`src/shared/presence.ts`(同伴携带`客户身份、姓名、肤色、
光标、焦点、聊天、打字、图像、类型”)。

4.3 吉特语`GitApi`)——电话全新.

全体`req`. 方法字符串(`IPC.*`, (中文).`src/shared/ipc.ts`149-178年: (中文(简体) ).`git:status`, (中文).`git:diff`, (中文).`git:show-file`, (中文).`git:history`, (中文).`git:stage`, (中文).`git:unstage`, (中文).`git:stage-all`, (中文).`git:unstage-all`, (中文).`git:discard`, (中文).`git:commit`, (中文).`git:commit-files`, (中文).`git:push`, (中文).`git:pull`, (中文).`git:sync`, (中文).`git:publish`, (中文).`git:fetch`, (中文).`git:force-push`, (中文).`git:switch-branch`, (中文).`git:create-branch`, (中文).`git:delete-branch`, (中文).`git:rename-branch`, (中文).`git:merge`, (中文).`git:rebase`, (中文).`git:init`, (中文).`git:clone`(+ 数)`git:clone-progress`页:1`git:remote-commit-url`(电话只需要电线 其UI表面。 )

4.4 代理人身份(`AgentApi`)——新电话

只订阅 :`agent:status`(四)和`agent:subagent-activity`(四) 国家 驱动
运行/需要 - 您的徽章和副剂卡 旧方言从未携带。

QQ 4.5 Canvas co-attach / 同步( Canvas / 同步 )`CanvasApi`)——新电话

`canvas:mut`两者都是被赶出去的`mutate(projectId, mutation)`) ** 和 ** a ev in
(单位:千美元)`onMutation`)在同一频道上:主机邮票每个变种,总顺序为:`seq`并反映给每个客户端,包括发送者(反射框是您的
ACK; 由`src`,见`src/shared/canvas-order.ts`终点站 **co-attach**
(两个客户在一个tmux会话上) 现在为电话工作,因为它是一个真实的`CorePlatform`客户端 :`pty:create`并肩作战,`pty:size:<sid>`给共享
尺寸,`PtyCreateResult.screen`在加盟时绘制当前屏幕(§5)

- - - 说吧

□ 5. iOS LOSES / 必须重新执行——旧的操作码——新 rpc 映射

这个`framing.ts`opcode 流量 (`OP.Input`页:1`OP.Output`页:1`OP.Subscribe`页:1`OP.Snapshot*`. ),简称".
和`snapshot.ts`三阶段屏幕重新组装为**删除**. 绘制每个旧概念
与新的等值:

旧的 opcode / 概念 (`framing.ts`OP #) ++ 新的 rpc.ts 等同 ++++
|,|,|.
|`OP.Input`(7)——主机按键`cast`页:1`pty:write`页:1`(sessionId, data)`(JSON,标签0x03)
|`OP.Output`(1)——主机 客户字节 **二进制**`pty:data:<sid>`边框 =`encodePtyData(sessionId, chunk)`(tag 0x04,§1.3) |
|`OP.Resize`(8) 客户报告的规模`cast`页:1`pty:resize`页:1`(sessionId, cols, rows)`(参数=)`null,null`页:1
|`OP.Resized`(5)——东道主有效规模  .`ev`页:1`pty:size:<sid>`页:1`({cols, rows})`|
|`OP.Subscribe`(9) 附加于某届会议`req`联合国`pty:create`联合国`(PtyCreateOptions)`→`PtyCreateResult`(共同附在现场的tmux会话)
|`OP.Unsubscribe`(10) ——离队 .`cast`页:1`pty:kill`页:1`(sessionId)`(tmux 会话幸存)
|`OP.SnapshotStart/Chunk/End`(3/3/4) — 第一屏幕涂料 ** **`PtyCreateResult.screen`** 关于创建响应(§5)——没有单独的流QQ
|`OP.SnapshotRequest`(11) ——要求重新油漆。 合并绘画是`screen`;中场强迫重新喷漆即为自愿抵达。`ev`页:1`pty:resync:<sid>`页:1`(screen)`|
|`OP.Error`(6) 国家`res`页:1`{t:'res', ok:false, error:{code, message}}`页:1
|`host-canvas-hub` `canvas:state`完整镜像 \\\\\\\\\\\\\\\\\株式会社`canvas:mut`反射器(第4.5节)
|`sanitizeClientMutation`——由信托决定取代(核准的同行完全信任)

5.1 第一屏幕油漆——`PtyCreateResult`(单位:千美元)`src/shared/types.ts`41至75页

这个`pty:create`答复是:

```
PtyCreateResult = {
  sessionId: string,
  fresh: boolean,               // true = cold start (new tmux session, e.g. post-reboot); false = warm reattach
  accountFallback?: boolean,    // account dir missing → fell back to system account (Claude accounts; usually irrelevant on phone)
  screen?: string,              // ← the join-paint: CURRENT tmux screen text, present only for a co-attach that did NOT resize the pty
  closed?: { by: number | null } // REFUSED: node was permanently destroyed by another client; sessionId is empty — show "closed by <name>"
}
```

- 在一个**co-attach**(`fresh:false`联合体没有改变电网`screen`携带当前屏幕——标示到新终端前
现场直播`pty:data`溪流开始**。 这是旧的`OP.Snapshot*`有效载荷,已交付
。 。 。 。 从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从`screen`故意缺席( tmux)
改用重画;两次绘画将分两个瞬间)。`screen`保证
现时非空。
- 在**冷**开放(`fresh:true`,没有`screen`; 使用`pty:read-scrollback`如果您想要重启, 将持续快照
行为。
- 如果说`closed`设置, 节点被另一个客户端删除 —— 显示关闭状态,
做**不**重生。

- - - 说吧

□ 6. 桌面侧锁步骤工作(节点侧-必须在iOS迁移之前着陆)

** 交互式桌面对讲机主机已经讲了新隧道**(`relay-host.ts`编号 :
薄荷客户端 id – 登记槽 – 联合存在 – 路由`onTunnel`文本通过`platform.dispatch`页:1`platform.cast`* 电话主机不设。 **

`standing-host.ts`电话仍然通过**`connectHostSession`(无)`host-service.ts`)**——旧的opcode方言,`snapshot.ts`监狱,`host-canvas-hub`因为`canvas:state`镜子`relay-host.ts`明确范围
桌面对等词汇,并声明电话主机为 * 故意不为 * 路由
迄今:

>"站着的电话主机将它现有的遗留词汇保存在`host-service.ts`. . . . . .
以否认而设的监狱,
> 发送路径。" (`relay-host.ts`SCOPE 注释)

** 因此:** 一旦节点删除 opcode 方言(`framing.ts`OP代码,`snapshot.ts`, (中文).`host-service.ts`RPC的动词,`host-canvas-hub`页:1
失去协议 电话交谈—— 电话即使在iOS之后仍会中断
更新**,除非`standing-host.ts`以同样的方式重新连接到新隧道`relay-host.ts`连接交互式主机。

具体地说,必须相互配合的节点任务:

1. ** 复线`standing-host.ts`打开`relay-host.ts`隧道**(薄荷)`allocateRelayClientId()`, (中文).`registerPeerSink`与**诚实**`bufferedAmount()`=========================================(==========为===========为==== 孩子为======`socket.bufferedAmount()`, (中文).`presenceHub.join(id,'phone')`, (中文).
路径`onTunnel`案文 ∗∗`platform.dispatch`页:1`platform.cast`) (中文(简体) ). 留着
手机专用位点 桌面对讲机主机不需要: 温暖的旁听器
, 拒绝拒绝和拒绝。
2. ** 以下列身份加入:`kind:'phone'`** (无咒语),不是`'desktop'`- 电话没有
鼠标
3. 确定电话電話電話電子 萨斯
大门(`relay-trust.ts` `createTrustGate`),或针上后先验.
旧常备主机采用单向针接;§3 /`docs/remote-sessions.md`制作
同行参加**mutual** SAS。 这必须与iOS共同解决(见第7段)。
4. **删除旧方言**(`framing.ts`, (中文).`snapshot.ts`, (中文).`host-service.ts`RPC动词,`host-canvas-hub`, (中文).`sanitizeClientMutation`, (中文).`RemoteTransport`只有 * 之后 * 两者
电话和桌面对讲机在隧道上
5. **判决:**`relay-host.ts`服务**`CorePlatform`(没有监狱)
一个被邀请的同行完全信任). 电话之前有一个拒绝 默认 fs
监狱。 把电话移到同一个地道上 除非是故意的
重新加载. 旗帜作为担保决定(§7).

** 船舶兼容合同:** iOS重写(新隧道)和`standing-host.ts`复线(新隧道)是一个变化的两个半. 合并或合并
仅此而已,电话无法连接。 把它们放在一起

- - - 说吧

□ 7. 安全要求 iOS MUST 荣誉(名单)

1. ** 将SAS调离频段。 ** 计算`sasFromSharedKey(baseKey)`准确(第3.1、v2节),
显示“NNN NN NNN NNN”和比较uangn-ten副本,并要求人类予以确认
在进行前匹配桌面。 这是针对中继机的唯一防御.
1a. ** 在每个地方都使用低序对等键和非对等键64**(§3.1a)。
拿走了 最重要的是主机钥匙
2. 仅将确认书传送到加密隧道上,** 作为`播',
方法 :“ 信任: 肯定” , 参数 :[ ] 通过 TAG TUNNEL  TEXT 框。 永远不要发送纯文本
确认 —— 桌面拒绝它, 它是一个安全漏洞 。
3. ** 仅从本届会议钥匙下解密的框架接受同行确认**
并传递角色+以下检查。 永远不要从纯文本中提前批准或
未认证数据。
4. ** 无会中重键。 ** 之后`ready`,忽略任何`e2ee_hello`页:1`e2ee_ready`plaintext 控制框架(不重切键,不关闭套接字). 入籍
会话的对等键和 SAS 被冻结 。
5. ** 在对等对象的盒子公用钥匙内**(两端为永久身份)。 警告任意
改为先前的键(键替换)。
6. ** 执行以下反重播**(严格增加入境)和**作用字节**
(带有自己角色的弹出盒=中继反射). 重置计数器
连接。
7. ** 我没有按键。 每次发射都会有新的电平钥匙
强制每次重新批准 并打破针。
8. ** Endianness discription:** 框后为小-endian(2xuint32 LE,高而低);`encodePtyData`sidLen 是一个大端的 uint16; SAS 折叠`h[0..4]`财务报告和`h[4..8]`大个子
不要越过他们。
10. **在组合QR**(§7.1)中输入SSH主机键,而不是信任第一个连接。

页:1 组合QR的`sshHostKeys`(桌面)`pairing-core.ts` `buildPairingPayload`页:1

QR现在携带着这个主机的SSH主机键指纹,所以手机的第一个SSH在之后连接.
配对已不再是信任的第一用途(在路径上攻击者可以用来替代伪造的)`agent.json`页:1`relay.json`在第一个ỡ连线上:

- 钥匙`sshHostKeys`JSON系列的OpenSSH SHA-256指纹`"SHA256:<standard base64 of sha256(keyBlob), trailing '=' removed>"`- 那个`ssh-keygen -lf`拼写;`keyBlob`= 基数64-解码`.pub`线条的第二个字段( SSH 线条 blob, 相同)
字节为服务器提交 。 最多4,订购ed25519,ecdsa, r箴.
- 位置: 之后`relay`(或之后)`hostKey`编号`name`当他们缺席的时候,`ssh`。 。 。
- ** 完成或缺席,从不偏袒。 ** 电话拒绝一个不是在设定中的密钥, Sshd 呈现
无论客户端的算法偏好选择哪一个密钥,所以一个部分列表会锁定
电话了。 桌面上列出了 sshd 所要服务的内容:`HostKey`路径`/etc/ssh/sshd_config`和 你先写的文件`Include`s( else sshd 的默认值)`/etc/ssh/ssh_host_{rsa,ecdsa,ed25519}_key`),每个都仅在其私人文件存在时计算,
每个`.pub`必须读取和解析( 一个 blob 命名一个与它的第一个字段不同的算法是)
(拒绝)。 任何疑问都会省略字段:不可读`.pub`, (中文).`HostKeyAgent`,亲属或
符号化路径, a`Include`从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从骏从从从从从从从从从从纯属从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从从 与配置
无法读取,默认仅在三个都存在且一致时使用.
- 没有完整清单时省略,**总是**省略`ssh:false`(窗户)——那个
有效载荷与以前相同。

电话侧面(iOS / Android后续):当出现时,只接受第一个SSH连接,前提是
服务器的"关键"字已经列入清单中,并停止执行,而不是`forget`钉子;
缺席=旧的TOFU行为.
9. **`undef`正确性**(§1.2)在编码和解码上,因此具有意义`null`(park, exact- clear) 永远不会被误认为是省略的参数 。

- - - 说吧

^ 8. 为iOS 开发者打开问题

1. ** 电话信托模式:** 每一个连接处的全SAS或第一个连接处的全SAS
重新连接时进行配对,然后进行无声的pin-once自动批准(常设主机的电流)
景象? ) ? ? ! ? ! ? ? ? ?景象的节点复线(§6.3)和iOS必须达成一致. 建议:
双方的SAS在第一对,然后是一针一针——但确认与最终结果相反`standing-host.ts`才能实现
2. **fs访问范围:**é 桌面对等隧道服务全程`CorePlatform`(无
监狱。 手机是全速的 还是监狱?
(第6.5节) 这改变了什么`git:*`页:1`fs:*`电话可以打
3. ** License/应享待遇:** 常设东道主在Pro +上登机。`phoneAccessEnabled`。 。 。
没有iOS可见的变化,但确认电话表面清空
"主机不可用/不是Pro"状态(电话根本找不到主机).
4. ** 哪些平等地位是先线的:** pty + 存在是MVP(与今天相等,
加上命名的存在). git / agent-status / roable-mut 是新的收益—— 开始。
5. **重联+代号生命周期:**继电器代号为单用途和短寿命的宗旨是:
(约120 s). 在电话方面,如何通过重新连接获得新鲜的加盟标志
(单位:千美元)`POST /v1/relay/join`以主机的编号为对吗? 镜像桌面
重新连接的新键规则 — 套接字是 ** not ** 自重连接在同一上
符号( A)`relay-socket.ts` `handleClose`) (中文(简体) ).
6. ** 国家`PtyCreateOptions`字段必须发送:**`persistKey`(节点标识,稳定),`cols`页:1`rows`, (中文).`shell`页:1`cwd`页:1`agentId`页:1`accountId`- 确认哪个电话
控件 v 继承主机持续节点。 (`src/shared/types.ts`
   `PtyCreateOptions`. ) (中文(简体) ).
7. ** iOS WebSocket/relay客户端上的Binary vs文本框架:** 确保电话
套接字层保存文本-vs-二进制(手摇控件=文本;框=二进制),
完全一样`wrapWebSocket`在桌面上进行。

- - - 说吧

□ 真实源文件( 节点侧, 此检查)

- 隧道协议:`src/shared/rpc.ts`- E2EE + 框架状态机器:`src/main/remote/relay-socket.ts`, (中文).`src/main/remote/e2ee.ts`- 信赖:`src/main/remote/relay-trust.ts`, (中文).`src/main/remote/mutual-approval-core.ts`- 新的主机连接点 :`src/main/remote/relay-host.ts`- 固定电话主机(将重新接线):`src/main/remote/standing-host.ts`, (中文).`src/main/remote/host-service.ts`- 删除方言(用于绘图):`src/main/remote/framing.ts`, (中文).`src/main/remote/snapshot.ts`, (中文).`src/main/remote/host-canvas-hub.ts`- 方法/渠道字符串:`src/shared/ipc.ts`; API 形状 :`src/shared/types.ts`, (中文).`src/shared/presence.ts`设计背景:`docs/remote-sessions.md`
