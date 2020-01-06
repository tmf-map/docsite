---
title: HTTPS
sidebar_label: HTTPS
---

import Img from '../../../src/components/Img';

## SSL/TLS 发展史

为了解决 HTTP 协议的以上缺点，在上世纪 90 年代中期，由网景（NetScape）公司设计了 SSL 协议。SSL 是“Secure Sockets Layer”的缩写，中文叫做“安全套接层”。

到了 1999 年，SSL 因为应用广泛，已经成为互联网上的事实标准。IETF 就在那年把 SSL 标准化。**标准化之后的名称改为 TLS（是“Transport Layer Security”的缩写），中文叫做“传输层安全协议”**。

很多相关的文章都把这两者并列称呼（SSL/TLS），因为这两者可以视作同一个东西的不同阶段。

互联网加密协议历史：

- 1994 年，NetScape 公司设计了 SSL 协议的 1.0 版，但是未发布。
- 1995 年，NetScape 公司发布 SSL 2.0 版，很快发现有严重漏洞。
- 1996 年，SSL 3.0 版问世，得到大规模应用。
- 1999 年，互联网标准化组织 ISOC 接替 NetScape 公司，发布了 SSL 的升级版 TLS 1.0 版。
- 2006 年和 2008 年，TLS 进行了两次升级，分别为 TLS 1.1 版和 TLS 1.2 版。最新的变动是 2011 年 TLS 1.2 的修订版。
- 2018 年， TLS 1.3 协议的最终版被发布，该协议在安全性、性能和隐私方面有重大改进，大大提升 HTTPS 连接的速度性能。

目前，应用最广泛的是 TLS 1.2 协议，最新版的 Chrome 和 FireFox 浏览器已经实现了对 TLS1.3 协议的支持。

## 什么是 HTTPS

由于 HTTP **明文传输**的特点，使得整个传输过程完全透明，任何人都能够在链路中截获、修改或者伪造请求或响应报文，数据不具有可信性。所以我们需要使用一种安全的数据传输方式--HTTPS。

所谓的 HTTPS 其实是“HTTP over SSL”或“HTTP over TLS”，它是 HTTP 与 SSL/TSL 的结合使用而已。在 HTTPS 中默认端口号是**443**。

<Img width="330" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/C4B4G3.png" />

如上图所示，原先是应用层将数据直接给到 TCP 进行传输，现在改成应用层将数据给到 TLS/SSL，将数据加密后，再给到 TCP 进行传输。将数据加密后再传输，而不是任由数据在复杂而又充满危险的网络上明文裸奔，在很大程度上确保了数据的安全性。

## HTTPS 建立连接的过程

虽然目前应用最广泛的依旧是 TLS1.2 版本，但是去年 TLS1.3 版本已经发布正式版，所以此处将以 TLS1.3 版本的握手过程进行讲解。

在 HTTP 协议里，建立 TCP 连接后，浏览器会立即发送请求报文。但现在是 HTTPS 协议，它需要再用另外一个“握手”过程，在 TCP 上建立安全连接，之后才是收发 HTTP 报文。 <Img width="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200106170015.png" />

如上图所示，在 HTTPS 中建立连接需要以下步骤：

1. “三次握手”建立 TCP 连接。
2. 客户端发出**Client Hello**信号，并将客户端的`TLS版本号`、`Client Random`、`Client Params`（客户端公钥）、密码套件等传送给服务器。
3. 服务器收到信号后，会发送**Server Hello**信号到客户端，将服务端的`Server Random`、`Server Params`（服务器公钥）、选定的密码套件等传送给客户端。
4. 此时客户端和服务端共享了`Client Random`、`Client Params`、`Server Random`、`Server Params`四个参数，然后服务器端会使用`Server Params`、`Client Params`这两个参数使用算法生成相同的`Pre-Master`（一个随机数）。
5. 服务器生成`Pre-Master`后结合`Client Random`和`Server Random`生成`master secret`(对称加密的密钥)。
6. 然后服务器发送`Change Cipher Spec`消息通知客户端下次可以使用对称加密传输。发送被加密的扩展消息`Encrypted Extensions`，并将服务端的证书和证书签名发送给客户端，最后发送`Finished`信号给客户端。
7. 客户端收到服务器证书和签名后，验证服务器身份，并生成与服务器相同的`master secret`(对称加密的密钥)。
8. 客户端发送`Change Cipher Spec`消息通知服务器下次数据传输将使用对称加密，最后发送`Finished`信号给客户端。
9. HTTPS 连接建立完成，客户端和服务器可以使用`master secret`对数据进行加密/解密。

**密钥生成示意图：** <Img width="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200106181948.png" />

## HTTP/2、SPDY 和 HTTPS

2012 年 google 如一声惊雷提出了 SPDY 的方案，大家才开始从正面看待和解决老版本 HTTP 协议本身的问题，**SPDY 可以说是综合了 HTTPS 和 HTTP 两者有点于一体的传输协议**，缩短 Web 页面的加载时间（50%）。

<Img width="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/dWs8xx.png" />

SPDY 协议位于会话层，这样可以轻松兼容老版本的 HTTP 协议(将 HTTP1.x 的内容封装成一种新的 frame 格式)，同时可以使用已有的 SSL 功能。

**HTTP2 可以说是 SPDY 的升级版**（其实原本也是基于 SPDY 设计的），但是，HTTP2 跟 SPDY 仍有不同的地方，主要是以下两点：

- HTTP2 理论上支持明文 HTTP 传输，而 SPDY 强制使用 HTTPS。

- HTTP2 消息头的压缩算法采用 HPACK，而非 SPDY 采用的 DEFLATE。
