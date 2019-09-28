---
id: https
title: HTTPS
sidebar_label: HTTPS
---
## 什么是HTTPS？
为了解决 HTTP 协议的以上缺点，在上世纪90年代中期，由网景（NetScape）公司设计了 SSL 协议。SSL 是“Secure Sockets Layer”的缩写，中文叫做“安全套接层”。

到了1999年，SSL 因为应用广泛，已经成为互联网上的事实标准。IETF 就在那年把 SSL 标准化。**标准化之后的名称改为 TLS（是“Transport Layer Security”的缩写），中文叫做“传输层安全协议”**。

很多相关的文章都把这两者并列称呼（SSL/TLS），因为这两者可以视作同一个东西的不同阶段。

互联网加密协议历史：

- 1994年，NetScape 公司设计了 SSL 协议的1.0版，但是未发布。
- 1995年，NetScape 公司发布 SSL 2.0版，很快发现有严重漏洞。
- 1996年，SSL 3.0 版问世，得到大规模应用。
- 1999年，互联网标准化组织 ISOC 接替 NetScape 公司，发布了 SSL 的升级版 TLS 1.0 版。
- 2006年和2008年，TLS 进行了两次升级，分别为 TLS 1.1 版和 TLS 1.2 版。最新的变动是2011年 TLS 1.2 的修订版。

目前，应用最广泛的是TLS 1.0，接下来是SSL 3.0。但是，主流浏览器都已经实现了TLS 1.2的支持。TLS 1.0通常被标示为SSL 3.1，TLS 1.1为SSL 3.2，TLS 1.2为SSL 3.3。

所谓的 HTTPS 其实是“HTTP over SSL”或“HTTP over TLS”，它是 HTTP 与 SSL/TSL 的结合使用而已。另外HTTPS默认**443端口**。

<img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/C4B4G3.png" width="330" height="210" />


原先是应用层将数据直接给到TCP进行传输，现在改成应用层将数据给到TLS/SSL，将数据加密后，再给到TCP进行传输。

大致如图所示:
![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ghX2eD.png)


就是这么回事。将数据加密后再传输，而不是任由数据在复杂而又充满危险的网络上明文裸奔，在很大程度上确保了数据的安全。这样的话，即使数据被中间节点截获，坏人也看不懂。

看下面内容之前可以先看看这篇文章，先压压惊：[HTTPS 的故事-前端外刊评论](https://qianduan.group/posts/5a6560b00cf6b624d2239c6f)

最原始的明文传输消息：

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/L7XQcx.png)

TSL主要内容：“加密”和“解密”

通俗而言，你可以把“加密”和“解密”理解为某种【互逆的】数学运算。就好比“加法和减法”互为逆运算、“乘法和除法”互为逆运算。

“加密”的过程，就是把“明文”变成“密文”的过程；反之，“解密”的过程，就是把“密文”变为“明文”。在这两个过程中，都需要一个关键的东西——叫做“密钥”——来参与数学运算。

公钥：保险箱
私钥：打开保险箱的钥匙

## 对称加密

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/75dp54.png)

所谓的“对称加密技术”，意思就是说：“加密”和“解密”使用【相同的】密钥。这个比较好理解。就好比你用 7zip 或 WinRAR 创建一个带密码（口令）的加密压缩包。当你下次要把这个压缩文件解开的时候，你需要输入【同样的】密码。在这个例子中，密码/口令就如同刚才说的“密钥”。

缺点：如果使用对称加密，客户端和服务端都需要保存大量的加密算法和对应的密钥，管理成本巨大且容易泄漏。

## 非对称加密
![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Ul74Hz.png)

所谓的“非对称加密技术”，意思就是说：“加密”和“解密”使用【不同的】密钥。服务端将公钥（密码箱）发送给客户端，客户端使用公钥加密信息（锁箱子），服务端接受消息后使用私钥（仅韩梅梅知道的密码）解密。当年“非对称加密”的发明，还被誉为“密码学”历史上的一次革命。

也有被劫持情况：
![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Wqe9zV.png)

窃听者可以伪造服务器的公钥与客户端通讯，客户端以为是跟服务器通讯，其实是与窃听者在通讯，后果可想而知。其实这个过程窃听者也要和服务器端进行通信继续所要公匙A。

## CA 证书
CA是认证机构（Certification Authority）的简称。CA 是 PKI 系统中通信双方信任的实体，被称为可信第三方（Trusted Third Party，简称TTP）。　CA 证书，顾名思义，就是 CA 颁发的证书。

CA 的初始是为了解决上面非对称加密被劫持的情况，**服务器申请 CA 证书时将服务器的“公钥”提供给 CA，CA 使用自己的“私钥”将“服务器的公钥”加密后（即：CA证书）返回给服务器**，服务器再将CA 证书提供给客户端。一般系统或者浏览器会内置 CA 的根证书（公钥）

HTTPS 中 CA 证书的获取
![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/tIO9Zd.png)

注：**上图步骤 2 之后，客户端获取到“CA 证书”会进行本地验证，即使用本地系统或者浏览器中的公钥进行解密，每个“CA 证书”都会有一个证书编号可用于解密后进行比对（具体验证算法请查阅相关资料）**。

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/UrBuJE.png)

步骤 5 之前使用的是对称加密，之后将使用对称加密来提高通讯效率。

## HTTP/2 与 HTTPS
2012年google如一声惊雷提出了SPDY的方案，大家才开始从正面看待和解决老版本HTTP协议本身的问题，SPDY可以说是综合了HTTPS和HTTP两者有点于一体的传输协议，缩短 Web 页面的加载时间（50%）。

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/dWs8xx.png)

SPDY位于HTTP之下，TCP和SSL之上，这样可以轻松兼容老版本的HTTP协议(将HTTP1.x的内容封装成一种新的frame格式)，同时可以使用已有的SSL功能。

顾名思义有了HTTP1.x，那么HTTP2.0也就顺理成章的出现了。HTTP2可以说是SPDY的升级版（其实原本也是基于SPDY设计的），但是，HTTP2跟 SPDY 仍有不同的地方，主要是以下两点：

- HTTP2.0 理论上支持明文 HTTP 传输，而 SPDY 强制使用 HTTPS。

- HTTP2.0 消息头的压缩算法采用 HPACK，而非 SPDY 采用的 DEFLATE。






