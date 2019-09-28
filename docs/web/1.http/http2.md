---
id: http2
title: HTTP2
sidebar_label: HTTP2
---

## 简介
HTTP/2主要目的是提高网页性能，最近几年比较火，将其单独抽成一块讲。2015年，HTTP/2 发布。它不叫 HTTP/2.0，是因为标准委员会不打算再发布子版本了，下一个新版本将是 HTTP/3。

目前还有不少服务还是HTTP/1.1，NodeJS也是从v10才将http2转正。Express5.x才开始支持http/2。

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ilnweH.png)

可以打开谷歌首页看看，基本上都是http/2协议，简写成h2

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/yRkSCa.png)

HTTPS是HTTP/2的必要条件。

可以用Chrome插件可以用来检测HTTP/2：HTTP/2 and SPDY indicator。它会给浏览器添加了一个闪电标记：

<img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/NXGjYK.png" width="500" height="50" />

<br/>

- 蓝色闪电，表示这个网页是运行在HTTP/2上

- 红色闪电表示网页运行在SPDY上（spdy和h2的关系和参考这篇文章：[HTTP 协议入门](http://www.ruanyifeng.com/blog/2016/08/http.html)）

- 灰色闪电则表示着这个网页既不是运行于HTTP/2，也不是运行于SPDY

HTTP/1.1 版的**头信息**肯定是文本（ASCII编码），数据体可以是文本，也可以是二进制。HTTP/2 则是一个彻底的二进制协议，**头信息和数据体都是二进制**，并且统称为"帧"（frame）：头信息帧和数据帧。
![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/WQmV6R.png)

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ixFt4p.png)
二进制的一个好处是，可以定义额外的帧。HTTP/2 定义了近十种帧，为将来的高级应用打好了基础。如果使用文本实现这种功能，解析数据将会变得非常麻烦，二进制解析则方便得多。

## 多路复用
**原来是同一个 TCP 连接里面**，上一个回应（response）发送完了，服务器才能发送下一个，现在多路复用（Multiplexing）允许单一的 HTTP/2 连接同时发起多重的请求-响应消息。

<img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/xIKbUs.png" width="420" height="420" />

<br/>

整个访问流程第一次请求index.html页面,之后浏览器会去请求style.css和scripts.js的文件。左边的图是顺序加载两个个文件的，右边则是并行加载两个文件。

**我们知道HTTP底层其实依赖的是TCP协议，那问题是在同一个连接里面同时发生两个请求响应着是怎么做到的？**

首先你要知道，TCP连接相当于两根管道（一个用于服务器到客户端，一个用于客户端到服务器），管道里面数据传输是通过字节码传输，传输是有序的，每个字节都是一个一个来传输。

例如客户端要向服务器发送Hello、World两个单词，只能是先发送Hello再发送World，没办法同时发送这两个单词。不然服务器收到的可能就是HWeolrllod（注意是穿插着发过去了，但是顺序还是不会乱）。这样服务器就懵b了。

接上面的问题，能否同时发送Hello和World两个单词呢？当然也是可以的，可以将数据拆成包，给每个包打上标签。发的时候是这样的①H ②W ①e ②o ①l ②r ①l ②l ①o ②d。这样到了服务器，服务器根据标签把两个单词区分开来。实际的发送效果如下图：


多路复用就是为了解决上述keep-alive的两个性能问题，我们来看一下，他是如何解决的。

解决第一个：在HTTP1.1的协议中，我们传输的request和response都是基本于文本的，这样就会引发一个问题：**所有的数据必须按顺序传输**，比如需要传输：hello world，只能从h到d一个一个的传输，不能并行传输，因为接收端并不知道这些字符的顺序，所以并行传输在HTTP1.1是不能实现的。

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/93XEwT.png)

HTTP/2引入 **二进制数据帧和流**的概念，其中帧对数据进行顺序标识，如下图所示，这样浏览器收到数据之后，就可以按照序列对数据进行合并，而不会出现合并后数据错乱的情况。同样是因为有了序列，服务器就可以并行的传输数据，这就是流所做的事情。

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/939SIN.png)

解决第二个问题：HTTP/2对同一域名下所有请求都是基于流，也就是说同一域名不管访问多少文件，也只建立一路连接。同样Apache的最大连接数为300，因为有了这个新特性，最大的并发就可以提升到300，比原来提升了6倍！

HTTP 性能优化的关键并不在于高带宽，而是低延迟。TCP 连接会随着时间进行自我「调谐」，起初会限制连接的最大速度，如果数据成功传输，会随着时间的推移提高传输的速度。这种调谐则被称为 TCP 慢启动。由于这种原因，让原本就具有突发性和短时性的 HTTP 连接变的十分低效。

HTTP/2 通过让所有数据流共用同一个连接，可以更有效地使用 TCP 连接，让高带宽也能真正的服务于 HTTP 的性能提升。

Demo: https://http2.akamai.com/demo 通过下面两张图，我们可以更加深入的认识多路复用：

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/yMOMBv.png)

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/odScPl.png)

以前我们做的性能优化不适用于HTTP/2了？

- **JS文件的合并**。我们现在优化的一个主要方向就是 **尽量的减少HTTP的请求数**， 对我们工程中的代码，研发时分模块开发，上线时我们会把所有的代码进行压缩合并，合并成一个文件，这样不管多少模块，都请求一个文件，减少了HTTP的请求数。但是这样做有一个非常严重的问题：**文件的缓存**。当我们有100个模块时，有一个模块改了东西，按照之前的方式，整个文件浏览器都需要重新下载，不能被缓存。现在我们有了HTTP/2了，模块就可以单独的压缩上线，而不影响其他没有修改的模块。
- **多域名提高浏览器的下载速度**。之前我们有一个优化就是把css文件和js文件放到2个域名下面，这样浏览器就可以对这两个类型的文件进行同时下载，避免了浏览器6个通道的限制，这样做的缺点也是明显的，1.DNS的解析时间会变长。2.增加了服务器的压力。有了HTTP/2之后，根据上面讲的原理，我们就不用这么搞了，成本会更低。

总结下：多路复用技术：单连接多资源的方式，减少服务端的链接压力，内存占用更少，连接吞吐量更大；由于减少TCP 慢启动时间，提高传输的速度。

## 服务器推送

服务器推送（server push）指的是，还没有收到浏览器的请求，服务器就把各种资源推送给浏览器。

比如，浏览器只请求了index.html，但是服务器把index.html、style.css、example.png全部发送给浏览器。这样的话，只需要一轮 HTTP 通信，浏览器就得到了全部资源，提高了性能。

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/B3hs9d.png)

如何开启呢，可以在服务器配置里面写死要推送的资源，当然这样不是很灵活，那么可以用另一种方法：后端应用产生 HTTP 请求的头信息Link命令。服务器发现有这个头信息，就会进行服务器推送。

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

服务器推送可以提高性能。[网上测评](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/#measuring-server-push-performance)的结果是，打开这项功能，比不打开时的 HTTP/2 快了8%，比将资源都嵌入网页的 HTTP/1 快了5%。提升程度也不是特别多，大概是几百毫秒。而且，也不建议一次推送太多资源，这样反而会拖累性能，因为浏览器不得不处理所有推送过来的资源。只推送 CSS 样式表可能是一个比较好的选择。

## 头部压缩
在HTTP/1.x中首部是没有压缩的，gzip只会压缩body，HTTP/2提供了首部压缩方案。一般轮询请求首部，特别是cookie占用很多大部份空间，首部压缩使得整个HTTP数据包小了很多，传输也就会更快。还有一些浏览器的信息，这些每个请求基本上都一样，没必要每次都传一份完整的。

HTTP/2使用专门设计的HPACK。它是在服务器和客户端各维护一个“首部表”，表中用索引代表首部名，或者首部键-值对，上一次发送两端都会记住已发送过哪些首部，下一次发送只需要传输差异的数据，相同的数据直接用索引表示即可，另外还可以选择地对首部值压缩后再传输。按照这样的设计，两次轮询请求的首部基本是一样的，那之后的请求基本只需要发送几个索引就可以了。
![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/WIKfnl.png)

“首部表”有两种，一种是静态表，即HTTP/2协议内置了常用的一些首部名和首部键值对。另一种是动态表，保存自定义的首部或五花八门的键值对等，动态表可以通过SETTINGS帧的SETTINGS_HEADER_TABLE_SIZE规定大小。

想更深地了解HTTP/2是什么？建议你前往：

[High Performance Browser Networking-HTTP/2 O'Reilly](https://hpbn.co/http2/)

https://www.rrfed.com/2018/03/18/chrome-http2/

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/LP9NmA.png)









