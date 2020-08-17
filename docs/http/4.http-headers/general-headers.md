---
title: 通用头字段
---

import Img from '@site/src/components/Img';

## 概述

**通用头字段**即在*请求头*和*响应头*里都可以出现的字段，常见的字段有：`Cache-Control`、`Date`、`Transfer-Encoding`、`Via`、`Warning`等，这些字段所代表的含义如下图所示：

<Img w="400" legend="图：HTTP通用头字段" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/7k2exV.png"/>

## Cache-Control

头字段`Cache-Control`的功能是控制缓存的行为，该字段的参数是可选的，多个指令之间用逗号分开。`Cache-Control`即可以在请求头中控制客户端的缓存，也以在响应头中控制服器端的缓存。

**Cache-Control 的格式:**

```js
Cache-Control: private, max-age=0
```

**Cache-Control 的参数：**

<Img w="600" legend="图：HTTP通用头字段" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/hlRGo8.png"/>

如上图，这里列出了`Cache-Control`控制客户端和服器端缓存的参数，这些参数将在下章 HTTP 缓存中详细讲解。

## Connection

`Connection`字段主要用在 HTTP 链接管理上，客户端可以在发送请求的时候添加`Connection: keep-alive`显示要求服务器建立长链接，如果服务器支持长连接，响应报文中也会包含`Connection: keep-alive`来告知客户端支持长链接。不过 HTTP/1.1 以后都是支持长链接的，所以请求头可以省略该字段。

当要断开链接时，客户端可以在请求头里加上`Connection: close`字段，主动关闭链接。

## Date

Date 表明 HTTP 报文创建的日期和时间。其格式如下:

```
Date: Tue, 24 Dec 2019 14:46:17 GMT
```

## Transfer-Encoding

`Transfer-Encoding`指明了报文主体在传输时实体内容的编码方式。其参数常见的有`chunked`、`compress`、`deflate`、`gzip`和`identity`。这些参数的具体含义可以查看 MDN 中关于[Transfer-Encoding](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Transfer-Encoding)的讲解。

## Via

Via 是一个通用字段，请求头或响应头里都可以出现。每当报文经过一个代理节点，代理服务器就会把自身的信息追加到字段的末尾。

<Img w="620" legend="图：Via字段示例" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ytDaP0.png"/>

如上图所示，户端发送请求会经过这两个代理，依次添加就是`Via: proxy1, proxy2`，等到服务器返回响应报文的时候就要反过来走，头字段就是`Via: proxy2, proxy1`。

## Warning

`Warning` 是一个通用头字段，包含报文当前状态可能存在的问题。在响应中可以出现多个 `Warning` 头。

**语法**

```
Warning: <warn-code> <warn-agent> <warn-text> [<warn-date>]
```

- warn-code：警告码
- warn-agent：警告主机:端口号（当不知道 warn-agent 具体值的时候可以用 "-" 代替）
- warn-text：警告内容
- warn-date：可选。假如多个 Warning 被发送，那么需包含一个与 Date 头相对应的日期字段。

关于这块`Warning`的详细内容此处不再详细解释，如果需要可以参考 MDN 的[Warning](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Warning)部分。
