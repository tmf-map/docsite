---
title: HTTP/2
sidebar_label: HTTP/2
---

import Img from '../../../src/components/Img'; import Hint from '../../../src/components/Hint'

## 简介

HTTP/2 主要目的是提高网页性能，最近几年比较火，将其单独抽成一块讲。2015 年，HTTP/2 发布。它不叫 HTTP/2.0，是因为标准委员会不打算再发布子版本了，下一个新版本将是 HTTP/3。

目前还有不少服务还是 HTTP/1.1，NodeJS 也是从 v10 才将 http2 转正。Express5.x 才开始支持 http/2。

<Img w="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ilnweH.png" />

可以打开谷歌首页看看，基本上都是 http/2 协议，简写成 h2

<Img w="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/yRkSCa.png" />

<Hint type="tip">HTTPS 是 HTTP/2 的必要条件。</Hint>

可以用 Chrome 插件可以用来检测 HTTP/2：HTTP/2 and SPDY indicator。它会给浏览器添加了一个闪电标记：

<Img w="450" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/NXGjYK.png" />

- 蓝色闪电，表示这个网页是运行在 HTTP/2 上
- 红色闪电表示网页运行在 SPDY 上（spdy 和 h2 的关系和参考这篇文章：[HTTP 协议入门](http://www.ruanyifeng.com/blog/2016/08/http.html)）
- 灰色闪电则表示着这个网页既不是运行于 HTTP/2，也不是运行于 SPDY

## 一个 TCP 连接

<Img w="500" legend="图：HTTP/1.1与HTTP/2数据传输对比图" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/hTkV0T.jpg'/>

由上图可以看出，HTTP/1.1 中**同一个 TCP 连接里面**，上一个响应发送完了，服务器才能发送下一个。而 HTTP/2 采用多路复用（后面介绍）**允许单一的 TCP 连接同时发起多重的请求响应**，比如 `GET style.css` 和 `GET script.js` 差不多就是同时发送的。

<Hint type="tip">Chrome 在 HTTP/1.1 中会建立 6 个 TCP ，在 HTTP/2 中同域名下会建立 1 个 TCP 。</Hint>

## 二进制传输

HTTP/1.1 **头信息**是文本（ASCII 编码），数据体可以是文本，也可以是二进制。这样就会引发一个问题：**所有的数据必须按顺序传输**，比如需要传输：`helloworld`，只能从 h 到 d 一个一个的传输，不能并行传输，因为接收端并不知道这些字符的顺序，所以并行传输在 HTTP/1.1 是不能实现的。

<Img w="420" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/93XEwT.png" />

HTTP/2 则是一个彻底的二进制协议，二进制协议解析起来更高效。**头信息和数据体都是二进制**，并且统称为"帧"（frame）：

- 头信息帧（HEADERS frame）：存放头数据
- 数据帧（DATA frame）：存放实体数据

<Img w="450" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/WQmV6R.png" />

它把 TCP 协议的部分特性挪到了应用层，把原来的 "Header+Body" 的消息"打散"为数个小片的二进制帧，HTTP/2 数据分帧后 "Header+Body" 的报文结构就完全消失了，协议看到的只是一个个的"碎片"。这样发送的时候先后顺序无所谓了，可以根据帧号将它们重新排列起来。这样同一个 TCP 连接里面同时发生多个请求响应。

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/5M5mmS.png'/>

<Img w="450" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ixFt4p.png" />

帧对数据进行顺序标识，如下图所示，这样浏览器收到数据之后，就可以按照序列对数据进行合并，而不会出现合并后数据错乱的情况。同样是因为有了序列，服务器就可以并行的传输数据，这就是流所做的事情。

<Img w="320" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/939SIN.png" />

二进制的一个好处是，可以定义额外的帧。HTTP/2 定义了近十种帧，为将来的高级应用打好了基础。如果使用文本实现这种功能，解析数据将会变得非常麻烦，二进制解析则方便得多，且解析起来更高效。。

## 多路复用（Multiplexing）

### 解决两大问题

在 HTTP/2 中引入了多路复用的技术，解决了 keep-alive 的性能问题。主要包括：

#### (1) 内存占用更少，连接吞吐量更大

浏览器限制同一个域名下的请求数量。HTTP/2 对同一域名下所有请求都是基于流，也就是说同一域名不管访问多少文件，也只建立一个 TCP 连接。同样 Apache 的最大连接数为 300，因为有了这个新特性，最大的并发就可以提升到 300，比原来提升了 6 倍。

#### (2) 提高传输的速度，降低延迟

新开一个 TCP 连接都需要慢慢提升传输速度。HTTP 性能优化的关键并不在于高带宽，而是低延迟。TCP 连接会随着时间进行自我调谐，起初会限制连接的最大速度，如果数据成功传输，会随着时间的推移提高传输的速度。这种调谐则被称为 **TCP 慢启动**。由于这种原因，让原本就具有突发性和短时性的 HTTP 连接变的十分低效。

HTTP/2 通过让所有数据流共用同一个连接，可以更有效地使用 TCP 连接，让高带宽也能真正的服务于 HTTP 的性能提升。

### 实例对比

大家可以通过[该在线 Demo ](https://http2.akamai.com/demo)直观感受下 HTTP/2 比 HTTP/1 到底快了多少。

<Img w="750" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/http2.gif'/>

下图是请求的对比：

<Img w="705" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/yMOMBv.png" />

<Img w="705" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/odScPl.png" />

第二张图中，感觉有很多个 TCP 连接，但是放大看就会发现它们都是一个 TCP 连接，只是发送请求的时间间隔非常短。

### 主要特性

在 HTTP/2 中，有了二进制分帧之后，HTTP/2 不再依赖 TCP 连接去实现多流并行了，在 HTTP/2 中:

- 同域名下所有通信都在单个连接上完成。
- 单个连接可以承载任意数量的双向数据流。
- 数据流以消息的形式发送，而消息又由一个或多个帧组成，多个帧之间可以乱序发送，因为根据帧首部的流标识可以重新组装。

这一特性，使性能有了极大提升：

- 同个域名只需要占用一个 TCP 连接，使用一个连接并行发送多个请求和响应，这样整个页面资源的下载过程只需要一次慢启动，同时也避免了多个 TCP 连接竞争带宽所带来的问题。
- 并行交错地发送多个请求/响应，请求/响应之间互不影响。
- 在 HTTP/2 中，每个请求都可以带一个 31bit 的优先值，0 表示最高优先级， 数值越大优先级越低。有了这个优先值，客户端和服务器就可以在处理不同的流时采取不同的策略，以最优的方式发送流、消息和帧。

<Img w="700" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ztdcOu.jpg'/>

如上图所示，多路复用的技术可以只通过一个 TCP 连接就可以传输所有的请求数据。

### 一些性能优化不再适用

#### (1) JS 文件的合并

我们现在优化的一个主要方向就是 **尽量的减少 HTTP 的请求数**， 对我们工程中的代码，研发时分模块开发，上线时我们会把所有的代码进行压缩合并，合并成一个文件，这样不管多少模块，都请求一个文件，减少了 HTTP 的请求数。

但是这样做有一个非常严重的问题：**文件的缓存**。当我们有 100 个模块时，有一个模块改了东西，按照之前的方式，整个文件浏览器都需要重新下载，不能被缓存。现在我们有了 HTTP/2 了，模块就可以单独的压缩上线，而不影响其他没有修改的模块。

#### (2) 多域名提高浏览器的下载速度

之前我们有一个优化就是把 css 文件和 js 文件放到 2 个域名下面，这样浏览器就可以对这两个类型的文件进行同时下载，避免了浏览器 6 个通道的限制，这样做的缺点也是明显的：

- DNS 的解析时间会变长。
- 增加了服务器的压力。

有了 HTTP/2 之后，根据上面讲的原理，我们就不用这么搞了，成本会更低。

## 服务器推送

服务器推送（server push）指的是，还没有收到浏览器的请求，服务器就把各种资源推送给浏览器。

比如，浏览器只请求了 index.html，但是服务器把 index.html、style.css、example.png 全部发送给浏览器。这样的话，只需要一轮 HTTP 通信，浏览器就得到了全部资源，提高了性能。

<Img w="750" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/B3hs9d.png" />

如何开启呢，可以在服务器配置里面写死要推送的资源，当然这样不是很灵活，那么可以用另一种方法：后端应用产生 HTTP 请求的头信息 Link 命令。服务器发现有这个头信息，就会进行服务器推送。

```
Link: </styles.css>; rel=preload; as=style
```

如果要推送多个资源，就写成下面这样。

```
Link: </styles.css>; rel=preload; as=style, </example.png>; rel=preload; as=image
```

可以参考 [Go](https://ops.tips/blog/nginx-http2-server-push/)、[Node](https://blog.risingstack.com/node-js-http-2-push/) 实现范例。

服务器推送有一个很麻烦的问题。所要推送的资源文件，如果浏览器已经有缓存，推送就是浪费带宽。即使推送的文件版本更新，浏览器也会优先使用本地缓存。

一种解决办法是，只对第一次访问的用户开启服务器推送，可以根据 Cookie 判断是否为第一次访问。

服务器推送可以提高性能。[网上测评](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/#measuring-server-push-performance)的结果是，打开这项功能，比不打开时的 HTTP/2 快了 8%，比将资源都嵌入网页的 HTTP/1 快了 5%。提升程度也不是特别多，大概是几百毫秒。而且，也不建议一次推送太多资源，这样反而会拖累性能，因为浏览器不得不处理所有推送过来的资源。只推送 CSS 样式表可能是一个比较好的选择。

## 头部压缩

在 HTTP/1.x 中首部是没有压缩的，gzip 只会压缩 body，HTTP/2 提供了首部压缩方案。一般轮询请求首部，特别是 cookie 占用很多大部份空间，首部压缩使得整个 HTTP 数据包小了很多，传输也就会更快。还有一些浏览器的信息，这些每个请求基本上都一样，没必要每次都传一份完整的。

HTTP/2 使用专门设计的 HPACK。它是在服务器和客户端各维护一个“首部表”，表中用索引代表首部名，或者首部键-值对，上一次发送两端都会记住已发送过哪些首部，下一次发送只需要传输差异的数据，相同的数据直接用索引表示即可，另外还可以选择地对首部值压缩后再传输。按照这样的设计，两次轮询请求的首部基本是一样的，那之后的请求基本只需要发送几个索引就可以了。

<Img w="650" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/WIKfnl.png" />

“首部表”有两种，一种是静态表，即 HTTP/2 协议内置了常用的一些首部名和首部键值对。另一种是动态表，保存自定义的首部或五花八门的键值对等，动态表可以通过 SETTINGS 帧的 SETTINGS_HEADER_TABLE_SIZE 规定大小。

## 总结

综上，我们主要讨论了 HTTP/2 的三大特性:

(1) 头部压缩，通过规定头部字段的静态表格和实际传输过程中动态创建的表格，减少多个相似请求里面大量冗余的 HTTP 头部字段，并且引入了霍夫曼编码减少字符串常量的长度。

(2) 多路复用，只使用一个 TCP 连接传输多个资源，减少 TCP 连接数，为了能够让高优先级的资源如 CSS 等更先处理，引入了优先级依赖的方法。由于并发数很高，同时传递的资源很多，如果网速很快的时候，可能会导致缓存空间溢出，所以又引入了流控制，双方通过 window size 控制对方的发送。

(3) Server Push,解决传统 HTTP 传输中资源加载触发延迟的问题，浏览器在创建第一个 流的时候，服务告诉浏览器哪些资源可以先加载了，浏览器提前进行加载而不用等到解析到的时候再加载。

## 相关拓展

想更深地了解 HTTP/2 是什么？建议你前往：

[High Performance Browser Networking-HTTP/2 O'Reilly](https://hpbn.co/http2/)

[从 Chrome 源码看 HTTP/2 -- 会编程的银猪](https://www.rrfed.com/2018/03/18/chrome-http2/)

## 参考资料

1. [HTTP/2 is here, let's optimize! - Velocity SC 2015, By Ilya Grigorik](https://docs.google.com/presentation/d/1r7QXGYOLCh4fcUq0jDdDwKJWNqWK1o4xMtYpKZCJYjM)
2. [How is HTTP/1.1 different from HTTP/2?](https://freecontent.manning.com/mental-model-graphic-how-is-http-1-1-different-from-http-2/)
3. [The HTTP/2 Protocol: Its Pros & Cons and How to Start Using It, By Igor Chishkala](https://www.upwork.com/hiring/development/the-http2-protocol-its-pros-cons-and-how-to-start-using-it/)
4. [Benefits of REST APIs With HTTP/2 By Guy Levin](https://dzone.com/articles/benefits-of-rest-apis-with-http2)
