---
title: Request Methods
sidebar_label: Request Methods
---

上一节本文介绍了 HTTP 的报文结构，它是由 `header+body` 构成，请求头里有`请求方法`和`请求目标`，响应头里有`状态码`和`原因短语`，本节的主要内容就是`请求头里的请求方法`。

## Method

<Img w="600" legend="图：HTTP请求方法" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/5hN9lB.png" />

如上图所示，本文将 HTTP 方法分为了：常用方法、非常用方法和拓展方法。其中常用方法、非常用方法是需要我们重点掌握的，而拓展方法本文不会介绍，如果需要的话可以百度学习。

### GET

GET 方法自 0.9 版出现并一直被保留至今，它的含义是请求从服务器获取资源，这个资源既可以是静态的文本、页面、图片、视频，也可以是由 PHP、Java 动态生成的页面或者其他格式的数据。

**GET 方法虽然基本动作比较简单，但搭配 URI 和其他头字段就能实现对资源更精细的操作。**

例如：

- 在 URI 后使用“#”，就可以在获取页面后直接定位到某个标签所在的位置；
- 使用 If-Modified-Since 字段就变成了“有条件的请求”，仅当资源被修改时才会执行获取动作；
- 使用 Range 字段就是“范围请求”，只获取资源的一部分数据。

### HEAD

HEAD 方法与 GET 方法类似，也是请求从服务器获取资源，服务器的处理机制也是一样的，**但服务器不会返回请求的实体数据，只会传回响应头**，也就是资源的“元信息”。

HEAD 方法可以看做是 GET 方法的一个“简化版”或者“轻量版”。因为它的响应头与 GET 完全相同，所以**可以用在很多并不真正需要资源的场合，避免传输 body 数据的浪费**。

例如：

- 想要检查一个文件是否存在，只要发个 HEAD 请求就可以了，没有必要用 GET 把整个文件都取下来。
- 想要检查文件是否有最新版本，同样也应该用 HEAD，服务器会在响应头里把文件的修改时间传回来。

### POST

POST 也是一个经常用到的请求方法，使用频率应该是仅次于 GET，应用的场景也非常多，**只要向服务器发送数据，用的大多数都是 POST**。

例如：

- 在上论坛上发帖，浏览器就执行了一次 POST 请求，把帖子的内容放进报文的实体里，然后拼好 POST 请求头，通过 TCP 协议发给服务器。

- 在淘宝上点击“加入购物车”时，淘宝会使用 POST 请求把商品 ID 发给服务器，服务器再把 ID 写入到的购物车相关的数据库记录。

### PUT

PUT 的作用与 POST 类似，也可以向服务器提交数据，但与 POST 存在微妙的不同，通常 POST 表示的是`create`的含义，而 PUT 则是`update`的含义。

### DELETE

DELETE 方法**指示服务器删除资源**，因为这个动作危险性太大，所以通常服务器不会执行真正的删除操作，而是对资源做一个删除标记。当然，更多的时候服务器就直接不处理 DELETE 请求。

> A payload within a DELETE request message has no defined semantics;
   sending a payload body on a DELETE request might cause some existing
   implementations to reject the request. -- [RFCs (7230-7237) IETF](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-p2-semantics-22#section-4.3.5)

:::tip

Do not send a payload body on a DELETE request.

:::

### OPTIONS

OPTIONS 方法**要求服务器列出可对资源实行的操作方法**，在协商缓存的“非简单请求”中用来做预检，这块知识点会在后面章节介绍。

### CONNECT

CONNECT 是一个比较特殊的方法，要求服务器为客户端和另一台远程服务器建立一条特殊的连接隧道，这时 Web 服务器在中间充当了代理的角色。

### TRACE

TRACE 方法多用于对 HTTP 链路的测试或诊断，可以显示出请求 - 响应的传输路径。它的本意是好的，但存在漏洞，会泄漏网站的信息，所以 Web 服务器通常也是禁止使用。

## Idempotent

| HTTP Method | Idempotent | Safe |
| ----------- | ---------- | ---- |
| OPTIONS     | yes        | yes  |
| HEAD        | yes        | yes  |
| GET         | yes        | yes  |
| POST        | no         | no   |
| PUT         | yes        | no   |
| PATCH       | no         | no   |
| DELETE      | yes        | no   |
