---
title: HTTPS
---

## 前言

由于 HTTP **明文传输**的特点，使得整个传输过程完全透明，任何人都能够在链路中截获、修改或者伪造请求或响应报文，数据不具有可信性。所以我们需要使用一种安全的数据传输方式--HTTPS。

## 什么是 HTTPS

所谓的 HTTPS 其实是“HTTP over SSL”或“HTTP over TLS”，它是 HTTP 与 SSL/TSL 的结合使用而已。在 HTTPS 中默认端口号是**443**。

<Img width="500" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200202213917.png" />

如上图所示，原先是应用层将数据直接给到 TCP 进行传输，现在改成应用层将数据给到 TLS/SSL，将数据加密后，再给到 TCP 进行传输。将数据加密后再传输，而不是任由数据在复杂而又充满危险的网络上明文裸奔，在很大程度上确保了数据的安全性。

## HTTPS 建立连接的过程

虽然目前应用最广泛的依旧是 TLS1.2 版本，但是在 2018 年 8 月份 IETF 已经正式发布了 TLS 1.3 版本的正式版，所以此处将以 TLS1.3 版本的握手过程进行讲解。

在 HTTP 协议里，建立 TCP 连接后，浏览器会立即发送请求报文。但现在是 HTTPS 协议，它需要再用另外一个“握手”过程，在 TCP 上建立安全连接，之后才是收发 HTTP 报文。

<Img width="500" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200106170015.png" />

如上图所示，在 HTTPS 中建立连接需要以下步骤：

1. “三次握手”建立 TCP 连接。
2. TLS 握手，发送 hello 信号
   - 客户端发出**Client Hello**信号，并将客户端的`TLS版本号`、`Client Random`、`Client Params`（客户端公钥）、密码套件等传送给服务器。
   - 服务器收到信号后，会发送**Server Hello**信号到客户端，将服务端的`Server Random`、`Server Params`（服务器公钥）、选定的密码套件等传送给客户端。
3. TLS 握手，生成对称加密密钥`master secret`
   - 此时客户端和服务端共享了`Client Random`、`Client Params`、`Server Random`、`Server Params`四个参数，然后服务器端会使用`Server Params`、`Client Params`这两个参数使用算法生成相同的`Pre-Master`（一个随机数）。
   - 服务器生成`Pre-Master`后结合`Client Random`和`Server Random`生成`master secret`(对称加密的密钥)。
   - 然后服务器发送`Change Cipher Spec`消息通知客户端下次可以使用对称加密传输。发送被加密的扩展消息`Encrypted Extensions`，并将服务端的证书和证书签名发送给客户端，最后发送`Finished`信号给客户端。
   - 客户端收到服务器证书和签名后，验证服务器身份，并生成与服务器相同的`master secret`(对称加密的密钥)。
4. TLS 握手结束
   - 客户端发送`Change Cipher Spec`消息通知服务器下次数据传输将使用对称加密，最后发送`Finished`信号给客户端。
5. HTTPS 连接建立完成
   - HTTPS 连接建立完成后，客户端和服务器可以使用`master secret`对数据进行加密/解密。

**密钥生成示意图：**

<Img width="500" legend="图：TLS 1.3密钥生成示意图" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200106181948.png" />

通过上面的示意图可以看出，客户端与服务器通过共享`Server Params`（服务器参数）和`Client Params`(客户端参数)生成`Pre-Master`,然后结合 Client Random（客户端随机数）和 Server Random（服务器随机数）生成对称加密的密钥`master secret`。

密钥`master secret`计算公式：

```
master_secret = PRF(pre_master_secret, "master secret", ClientHello.random + ServerHello.random)[0..47];
```

有关公式的详细内容可以查看[RFC5246](https://tools.ietf.org/html/rfc5246#section-8.1)文档。

## HTTP VS HTTPS

### HTTP 和 HTTPS 的差异

<Img width="500" legend="图：报文传输对比图" origin ="https://zhuanlan.zhihu.com/p/101058747" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200203145458.png" />

- 数据传输：由上图所示，HTTP 使用明文传输；HTTPS 使用加密格式进行传输。
- 端口：HTTP 默认端口是 80；HTTPS 默认端口是 443。
- 安全性：HTTP 使用明文传输，是不安全的；HTTPS 使用 SSL 安全技术。

### HTTPS 的优点

- 安全通信 HTTPS 在浏览器和服务器之间使用加密传输来确保安全。
- 数据完整性。由于数据是加密的，即使黑客获取到数据，也没法对数据做修改。
- 传输性能。通过对数据进行加密，HTTPS 能够减少数据的大小从而获得更高的传输性能。
- SEO。使用 HTTPS 能优化 SEO 排名。使用 Google Chrome 浏览器时，如果采用 HTTP 协议，浏览器会显示 Not Secure。

## 参考资料

1. [what is http, by tutorialsteacher](https://www.tutorialsteacher.com/https/what-is-https)
