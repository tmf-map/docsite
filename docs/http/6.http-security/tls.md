---
title: SSL和TLS
sidebar_label: SSL和TLS
---

import Img from '../../../src/components/Img';

## 概述

为了解决 HTTP 协议传输不安全等缺点，在上世纪 90 年代中期，由网景（NetScape）公司设计了 **SSL(Secure Sockets Layer) 安全套接层协议**。SSL 经历了 1.0、2.0、3.0 版本后发展成了标准化的安全协议 - **TLS(Transport Layer Security) 传输层安全性协议**，TLS 有 1.0 (RFC 2246)、1.1(RFC 4346)、1.2(RFC 5246)、1.3(RFC 8446) 版本。

很多相关的文章都把这两者并列称呼（SSL/TLS），因为这两者可以视作同一个东西的不同阶段。

目前，应用最广泛的是 TLS 1.2 协议，最新版的 Chrome 和 FireFox 浏览器已经实现了对 TLS1.3 协议的支持。

## SSL/TLS 加密

SSL/TLS 数据的加密通过**对称加密和非对称加密**来实现。其利用非对称加密算法（RSA/ECDHE）**实现身份认证和密钥协商**，对称加密算法**[使用协商后的密钥对数据加密](/docs/http/6.http-security/https#https-建立连接的过程)**。

<Img w="500" legend="图：TLS混合加密" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200202175232.png" />

其中非对称加密常用的加密算法有 RSA、ECC、DH 算法等。

RSA 算法基于“整数分解”的数学难题，使用两个超大素数的乘积作为生成密钥的材料，想要从公钥推算出私钥是非常困难的。但是由于 10 年前 RSA 密钥的推荐长度是 1024，但随着计算机运算能力的提高，现在 1024 已经不安全，普遍认为至少要 2048 位。所以 RSA 算法终将被其它更安全的算法所替代。

比起 RSA，ECC 在安全强度和性能上都有明显的优势。224 位的 ECC 则相当于 2048 位的 RSA。因为密钥短，所以相应的计算量、消耗的内存和带宽也就少，加密解密的性能相对更加出色。

因为 ECC 算法只提供公钥和私钥，不能够实现**身份验证和密钥协商**，所以 ECC 经常会搭配 DH 算法，形成专门的 ECDHE 算法（密钥交换）和 ECDHA 算法（数字签名）

### SSL/TLS 数据传输

与 HTTP 中数据传输不同，HTTPS 在非对称加密阶段需要完成 SSL/TLS 握手，确认对称加密数据的密钥`master secret`。在非对称加密阶段使用不同的加密算法 SSL/TLS 的握手方式也会有所不同。此处简要介绍一下 RSA 的握手过程，ECDHE 的握手过程可以看下一节内容。

<Img w="500" legend="图：RSA握手过程" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200203151454.png" origin= "https://www.tutorialsteacher.com/https/how-ssl-works"/>

由上图所示，RSA 的握手过程如下：

1. 客户端向服务器发送一个 Client hello 消息。消息中包括客户端的 SSL 版本号、密码套件、客户端随机数等信息。
2. web 服务器回复 Server hello 消息。消息中包括服务器的 SSL 版本号、选定的加密方式、证书、服务器随机数等信息。
3. 客户端使用浏览器预装的 CA 证书对服务器传来的证书进行验证。如果验证失败，客户端拒绝 SSL/TLS 连接并且抛出异常；如果验证成功，则继续下面的流程。
4. 客户端使用 RSA 算法结合客户端随机数和服务器随机数生成主密钥，并使用服务器发送过来的公钥对其进行加密后发送给服务器。
5. 服务器使用私钥对获取到的加密后的主密钥进行解密，然后向客户端发送使用主密钥加密过的报文信息。

## 参考链接

1. [HTTPS 系列二：SSL 如何工作？, by Just Tech](https://zhuanlan.zhihu.com/p/101058747)

2. [SSL/TLS 详解，by 鱼の乐](https://blog.wangriyu.wang/2018/03-http-tls.html)
3. [Https(SSLTLS)原理详解, by Mike](https://www.hi-linux.com/posts/17756.html)
