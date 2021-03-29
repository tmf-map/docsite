---
title: HTTP/3
---

## HTTP/2 的缺点

在 HTTP/2 中通过虚拟的“流”与多路复用等技术解决了应用层“队头阻塞”问题，性能方面比 HTTP/1.1 有了很大的提升。但 HTTP/2 依旧存在许多待解决的问题。

### TCP 队头阻塞

**HTTP/2 中同一域名下只会建立一次 TCP 连接**，当网络环境差出现丢包时，丢失的包必须要等待重新传输确认。也就是说，当 HTTP/2 出现丢包时，整个 `TCP` 都要开始等待重传，那么就会**阻塞该 TCP 连接中的所有请求**。对于 HTTP/1.1 来说，可以开启多个 `TCP` 连接，出现这种情况反到只会影响其中一个连接，剩余的 `TCP` 连接还可以正常传输数据。所以此时 HTTP/2 的表现可能还不如 HTTP/1.1。

关于 TCP 的拥塞控制，推荐看这篇[博客](https://blog.csdn.net/jtracydy/article/details/52366461)。

### 握手时延

HTTP/2 是建立在 TLS1.2 之上的，在数据传输之前需要进行“三次握手”和“TLS 握手”。

- 在建立 TCP 连接时，客户端和服务器需要进行“三次握手”来确认连接，此时需要 1.5 个 [RTT(Round-Trip Time）](https://www.zhihu.com/question/39244840)。
- 在“TLS1.2 握手”中，客户端发送`Client Hello`请求，然后收到服务器`Server Hello`回应后，客户端会再发送一个`Client Key Exchange`(非对称加密算法公钥)消息给服务器，然后服务器发送`Finished`消息。也就是说“TLS1.2 握手”需要 2 个 RTT。

所以在使用 HTTP/2 协议在传输数据之前，需要花掉至少 3 个 RTT。

## QUIC 协议

为了解决 HTTP/2 存在的问题，Google 就推出了一个新的`QUIC`协议，让 HTTP 跑在 `QUIC` 上而不是 `TCP` 上。因为`QUIC`协议时基于`UDP`而不是`TCP`，而 `UDP` 是无序的，包之间没有依赖关系，所以就从根本上解决了“队头阻塞”。

<Img w="600" legend="图：HTTP各层协议" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200108223602.png" />

### QUIC 的特点

- 无“三次握手”时延

`UDP`是一个无连接的、不可靠的传输协议，所以使用`UDP`就不需要“三次握手”和“四次挥手”，也就没有对应的时延。

- 可靠传输

QUIC 协议为了保证使用`UDP`协议数据的可靠性，在`UDP`之上上把 `TCP` 的那一套连接管理、拥塞窗口、流量控制等“搬”了过来，“去其糟粕，取其精华”，打造出了一个全新的可靠传输协议。

- 彻底解决“队头阻塞”问题

引入了类似 HTTP/2 的“流”和“多路复用”，实现了数据流的单独传输。即：单个“流”是有序的，可能会因为丢包而阻塞，但其他“流”不会受到影响，从而解决了 TCP 中队头阻塞的问题。

- 更快、更安全的 TLS1.3

QUIC 使用的是 TLS1.3，相较于早期的 TLS 版本，TLS1.3 更加的安全，并且对与新建连接“TLS 握手”时只需要 1 个 RTT，而恢复连接则是一个 0 RTT 事件。

### QUIC 的现状

Google 的 Chrome 于 2012 年开始开发 QUIC 协议，**QUIC 协议在当前 Chrome 版本中被默认开启**，活跃的会话列表在 chrome://net-internals/#quic 中可见。

截至 2017 年，谷歌的服务器及谷歌发布的原型服务器使用 Go 语言编写的[quic-go](https://github.com/lucas-clemente/quic-go)及[Caddy](https://zh.wikipedia.org/wiki/Caddy)的试验性 QUIC 支持。

在 2017 年 7 月 11 日，LiteSpeed 科技正式在他们的负载均衡（WebADC）及 LiteSpeed 服务器中支持 QUIC。截止 17 年 12 月，97.5%的使用 QUIC 协议的网站在 LiteSpeed 服务器中运行。

2018 年 10 月，互联网工程任务组 HTTP 及 QUIC 工作小组正式将基于 QUIC 协议的 HTTP (英语：HTTP over QUIC) 重命名为 HTTP/3 以为确立下一代规范做准备。

## 握手时延

如下表，表中罗列了使用 HTTP/2 协议和 HTTP/3 协议在创建连接和恢复连接握手的时延。恢复连接比较抽象，举个手机联网的例子，当手机从 4G 信号切换到无线网 WIFI 时，此时需要重新建立连接，也就是恢复连接。

|  | HTTP/2 OVER TLS1.2 创建连接 | HTTP/2 OVER TLS1.2 恢复连接 | HTTP/3 OVER TLS1.3 创建连接 | HTTP/3 OVER TLS1.3 恢复连接 |
| --- | --- | --- | --- | --- |
| TCP 握手 | 1.5-RTT | 0-RTT | ----- | ----- |
| TLS 握手 | 2-RTT | 1-RTT | 1-RTT | 0-RTT |
| Sum | 3.5-RTT | 1-RTT | 1-RTT | 0-RTT |

### TLS1.2 创建连接

如下图所示，在数据传输之前客户端发送`Client Hello`请求，并将支持的“密码套件”等信息发送给服务器，服务器收到后回复`Server Hello`消息，并将选定“密码套件”、“证书”等发送给客户端。客户端收到后会将“非对称加密算法公钥”发送给服务器，然后服务器发送`Finished`消息。一共需要两个 RTT。

<Img w="600" legend="图：TLS1.2创建连接" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200108233152.png" />

### TLS1.2 恢复连接

如下图所示，在恢复连接时，客户端和服务器都会将会话的**会话 ID**保留一段时间，此时恢复连接，客户端只需要将**会话 ID**发送给服务器进行匹配即可完成认证，整个过程只需要 1 个 RTT。 <Img w="600" legend="图：TLS1.2恢复连接" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200108233819.png" />

### TLS1.3 创建连接

下图是我们在[HTTPS](/docs/http/7.http-security/https#https-建立连接的过程)中讲过的 TLS1.3 连接的简化版，因为客户端的`Finished`消息和请求连接是一起发给服务器的，所以 TLS1.3 创建连接只需要 1 个 RTT。

<Img w="600" legend="图：TLS1.3创建连接" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200108234311.png" />

### TLS1.3 恢复连接

当一个支持 TLS 1.3 的客户端连接到同样支持 TLS 1.3 的服务器时，客户端会将收到服务器发送过来的 Ticket 通过相关计算，一起组成新的预共享密钥，PSK（PreSharedKey）。

客户端会将该 PSK 缓存在本地，在会话恢复时在 Client Hello 上带上 PSK 扩展，同时通过之前客户端发送的完成（finished）计算出恢复密钥（Resumption Secret）通过该密钥加密数据发送给服务器。

服务器会从会话 Ticket 中算出 PSK，使用它来解密刚才发过来的加密数据。至此完成了该 0-RTT 会话恢复的过程。

<Img w="600" legend="图：TLS1.3恢复连接" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200109121509.png" />

## 参考资料

- [解读 HTTP/2 与 HTTP/3 的新特 -- 前端工匠](https://mp.weixin.qq.com/s/zhYWDhsqrBO5MB4Hw2XkDA)
- [如何看待 HTTP/3 ？ -- 车小胖](https://www.zhihu.com/question/302412059/answer/533223530)
- [TLS 1.3 如何为 HTTPS 连接提速 -- wotrus](https://zhuanlan.zhihu.com/p/27524995)
- [未来之路：HTTP/3 展望 -- 罗剑锋](https://time.geekbang.org/column/intro/100029001)
- [QUIC -- Wikipedia](https://en.wikipedia.org/wiki/QUIC)
