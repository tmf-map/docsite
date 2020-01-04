---
title: 客户端缓存
sidebar_label: 客户端缓存
---

import Img from '../../../src/components/Img';

import Hint from '../../../src/components/Hint';

## 概述

缓存（Cache）是计算机领域里的一个重要概念，是优化系统性能的利器。

由于链路漫长，网络时延不可控，浏览器使用 HTTP 获取资源的成本较高。所以通过在各个环节缓存资源，可以减少通信的成本，节约网络带宽，也可以加快响应速度。

缓存大致可以分为客户端缓存（浏览器缓存）和代理缓存，如下图所示：

<Img w="600" legend="图：客户端（Client）缓存和代理(Proxy)缓存" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/CXFABV.png" />

## 客户端缓存

客户端缓存可以分为**强缓存**和**协商缓存**两种，两种缓存通过请求头字段和响应头字段来控制缓存的行为，如下所示：

<Img width="600" legend="图：客户端缓存分类" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Bvao1T.png" />

HTTP 客户端缓存都是从第二次请求开始的。

- 第一次请求时，服务器返回资源，并在 `response header` 中回传资源的缓存参数；

- 第二次请求时，**浏览器**判断强缓存的这些请求参数，如果**没有过期**就命中强缓存就直接 200(from memory/disk cache)，否则就把请求参数加到 `request header` 头传给**服务器**，判断是否命中协商缓存，命中则返回 304，否则服务器会返回新的资源。

详细请看下面的这张流程图：

<Img width="520" legend="图：客户端缓存流程图" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cache.png" />

<Hint type = "tip">上图中判断强缓存是否过期主要通过`Cache-Control：max-age`字段和`Expires`字段来判断，其中`Cache-Control`的优先级较高</Hint>

HTTP 缓存分为强缓存和协议缓存，它们的区别如下：

|  | 强缓存 | 协商缓存 |
| --- | --- | --- |
| 状态码 | 200(from memory/disk cache) | 304 |
| 缓存位置 | 浏览器 | 浏览器 |
| 谁来决定 | 浏览器 | 服务器 |
| 请求头还是响应头 | if 开头的都是请求头，Cache-Control 都有，其他都是响应头 | 与强缓存相同 |

## 强缓存

状态码 200 有三种情况：

<Img width="800" legend="图：强缓存种类" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/tCzCsP.png"/>

其中上图中的 1 和 2 分别代表了命中强缓存的两种情况：

- 200 from memory 不访问服务器，直接读缓存，从内存中读取缓存。此时的数据时缓存到内存中的，当 kill 进程后，也就是浏览器关闭以后，数据将不存在。但是这种方式只能缓存派生资源

- 200 from disk 不访问服务器，直接读缓存，从磁盘中读取缓存，当 kill 进程时，数据还是存在。这种方式也只能缓存派生资源。

以加载图片为例：

1. 访问 -> 200 -> 退出浏览器
2. 再进来-> 200(from disk cache) -> 正常刷新 -> 200(from memory cache)

### Cache-Control

在第四章部分我们已经讲过`Cache-Control`是个通用的字段，也就是说它既能出现在请求报文中，也可以出现在响应报文中。当出现在请求报文中的时候，我们可以理解为**客户端的缓存控制**，而出现在响应报文中，我们可以理解为**服务器的缓存控制**。但是这两种控制是在**客户端**和**服务器**这两端进行的，不涉及到任何**代理服务器**，也就是说不涉及**共享缓存（share cache）**。

<Img width="600" legend="图：Cache-Control常用参数" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/OAWzaU.png"/>

**服务器的缓存控制：**

当服务器收到浏览器的请求时，会通过添加`Cache-Control`字段来控制资源的缓存。常用的参数有`max-age`、`no-cache`、`no-store`、`must-revalidate`。

`max-age`代表的是**缓存的过期时间**，用的是相对时间，**时间从响应报文发出开始计算**。

`no-cache`、`no-store`、`must-revalidate`这三个参数需要我们区别一下：

- no-store： **不允许缓存**，用于某些变化非常频繁的数据，例如秒杀页面；
- no-cache： 可以缓存，但在**使用之前**必须要去服务器验证是否过期，是否有最新的版本；
- must-revalidate：和 `no-cache` 非常相似，它的意思是如果**缓存不过期就可以继续使用**，但**过期了就必须去服务器验证**。

为了更好的理解这几个字段的意思，可以看下面这张流程图：

<Img width="525" legend="图：服务器的缓存控制" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/oDMgW4.png"/>

**客户端的缓存控制：**

`Cache-Control`在客户端的缓存控制中常用的参数为`max-age`和`no-cache`两个。

当我们点击刷新按钮、使用`CMD + R`、`F5或Ctrl + R`来**Normal Reload（正常刷新）**网页时，请求头中会添加`Cache-Control：max-age=0`字段。因为 `max-age` 是“生存时间”，而本地缓存里的数据至少保存了几秒钟，所以`max-age=0`就意味着**不直接读取浏览器缓存，必须向服务器发出请求**。

当服务器收到`Cache-Control: max-age=0`，此时服务器就会**判断协商缓存**的相关字段，如果命中协商缓存，返回 304 状态码，读取本地缓存。如果没有命中协商缓存，就返回新的资源给客户端。如下图：

<Img width="800" legend="图：非强制刷新" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/2coR6N.png"/>

当我们使用`CMD + Shift + R`或`Ctrl + F5或 Ctrl + Shift + R`来**Hard Reload（强制刷新）**网页的时候，我们可以从请求头中看到`Cache-Control：no-cache`的字段。此时意味着不使用任何缓存数据，服务器必须返回新的资源给客户端。如下图：

<Img width="800" legend="图：强制刷新" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/g37iuy.png"/>

<Hint type="tip">在强制刷新网页后，如果网页通过重定向加载了其他资源，则它可能会从缓存中加载。</Hint>

除了上面两种刷新方式外，在浏览器中还有一种**Empty Cache and Hard Reload（清空缓存并强制加载）**的页面刷新方式，如下图所示：

<Img width="560" legend="图：Chrome缓存" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20191231211624.png"/>

当选择`Empty Cache and Hard Reload`时，**它将首先清空缓存**，然后重新下载所有内容，如果要完全重新加载网页，这是最好的选择。

<Hint type = "tip">上面提到的三种页面刷新方式，其实都没有命中**强缓存**。只有在前进、后退、点击跳转链接、地址栏输入 url 回车的时候才能命中**强缓存**</Hint>

### Expires

`Expires`字段属于实体头字段，用来控制资源的过期时间，时间是 GMT 格式。

**Expires 和 Cache-Control 对比：**

| 强缓存 | 可选值 | 优先级 | 优缺点 |
| --- | --- | --- | --- |
| Cache-Control | **max-age**、**no-cache**、**no-store** 等 | 高 | 无 |
| Expires | GMT 时间 | 低 | 服务器和本地时间不一定统一 |

## 协商缓存

在上一章的**请求头字段**的条件请求中我们提到了协商缓存需要的两个字段`If-Modify-Since`、`If-None-Match`，在**响应头字段**那一节也详细讲解了强`Etag`和弱`Etag`和它们的作用。这些内容在这里将不再赘述，我们只将这些字段在协商缓存中是怎么应用的。

由本文开始的`客户端流程图`可以看出，协商缓存是先判断`Etag`对应的`If-None-Match`字段，如果命中协商缓存，则返回 304 状态码，浏览器读取本地缓存。如果`If-None-Match`与`Etag`不匹配，需要查看`If-Modify-Since`的时间是否早于服务器资源设置的`Last-Modify`的时间，如果早于的话，服务器返回 200 状态码，并把最新的资源发送到客户端，客户端收到后更新本地资源。如果时间相同的话，则返回 304 状态码，浏览器读取本地缓存。

如下图，协商缓存都是成对出现的（相同颜色是一对响应和请求头部，if 开头的都是请求头部）。

<Img width="800" legend="图：协商缓存字段" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/x4wXe9.png"/>

**协商缓存字段对比：**

| 协商缓存 | 可选值 | 优先级 | 优缺点 |
| --- | --- | --- | --- |
| Last-Modify/If-Modify-Since | GMT 时间 | 依次比较，排序靠后 | 1.修改并不意味修改；2.秒级判断（精确度到秒） |
| ETag/If-None-Match | 校验值 | 依次比较，先比较 | 使用系统默认的 Hash 算法，在分布式部署中会导致不同服务器的 ETag 值不一致 |

## 仍存在的问题

因为协商缓存本身也有 http 请求的损耗，所以最佳优化策略是要尽可能的将静态文件存储为较长的时间，多利用强缓存而不是协商缓存，即消灭 304。

但是给文件设置一个很长的`Cache-Control`也会带来其他的问题，最主要的问题是静态内容更新时，**用户不能及时获得更新的内容**。

**为了解决这个问题，我们可以采取不缓存访问的`html`文件，只缓存文件中的 js、css 、图片等资源。这样我们每次都可以拿到最新的`html`文件，而对于其引入的其它文件，我们都采用`hash`的形式对文件进行命名。**如下图：

<Img width="600" legend="图：文件hash命名" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/vX3wwK.png"/>

对于引入的静态资源，通过打包生成 hash 形式命名的文件。

当我们第一次访问`page.html`文件时，浏览器缓存`main.8b8e005.js`等静态文件，等到下次再访问`page.html`文件时，如果对应的`main.8b8e005.js`等静态文件的`hash`没变，使用本地缓存。如果对应的`hash`改变时，浏览器再从服务器获取新的资源，并保存客户端，这样就可以保证实时获取最新资源了。

## 相关文章推荐

[面试精选之 http 缓存 -- lucefer](https://juejin.im/post/5b3c87386fb9a04f9a5cb037#heading-3)

[HTTP 缓存控制小结 -- 孙世吉](https://imweb.io/topic/5795dcb6fb312541492eda8c)
