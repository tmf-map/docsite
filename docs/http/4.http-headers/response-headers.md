---
title: 响应头字段
sidebar_label: 响应头字段
---

import Img from '../../../src/components/Img';

## 概述

`响应头字段`（Response header）被用于 HTTP 响应中并且和**响应主体无关的那一类 HTTP header**。像 `Location` 和 `Server` 都属于响应头字段等。常见的响应头字段如下图所示：

<Img w="400" legend="图：HTTP响应头字段" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/kfSnMJ.png" />

:::tip

并非所有出现在响应头中的字段都是响应头字段，例如`Content-Length`就是一个代表响应体消息大小的实体头字段

:::

## Accept-Ranges

`Accept-Ranges`这个字段在请求头字段中`Range`中提到过，该字段用来告知客户端是否支持范围传输。当服务端支持范围请求时返回`Accept-Ranges: bytes`，当服务器没有实现范围请求功能时，返回`Accept-Ranges: none`或者不返回该字段。

**Accept-Ranges 格式：**

```
Accept-Ranges: bytes
```

## Etag

`Etag`是一种可以将资源以字符串形式做`唯一标识`的方式。服务器会为每份资源分配对应的`Etag`。当资源发生更新时，`Etag`值也会更新。

`Etag`经常和请求头字段`If-None-Match`一起用来控制资源缓存，当`If-None-Match`的值与`Etag`的值相匹配时，表示命中协商缓存，否则代表缓存资源已经过期，浏览器会返回新的资源给客户端。

### 强 Etag 和弱 Etag

`Etag`分为强`Etag`和弱`Etag`，弱`Etag`使用`W/`来标示，如下所示：

**强 Etag：**

```
ETag: "<etag_value>"
```

**弱 Etag：**

```
ETag: W/"<etag_value>"
```

强`Etag`只要资源发生任何改变都会立刻变化，而弱 Etag 则只有在资源发生本质变化的时候才会更新。弱`Etag`很容易生成，但不利于比较。强`Etag`是比较的理想选择，但很难有效地生成。相同资源的两个弱 Etag 值可能语义等同，但不是每个字节都相同。

## Location

`Location`的作用是指定的是一个重定向请求的目的地址（3XX）或者新创建资源的 URI（201）。

当浏览器收到 301/302 报文，会检查响应头里有没有`Location`。如果有，就从字段值里提取出 URI，发出新的 HTTP 请求，相当于自动替我们点击了这个链接。

当响应报文的状态码为 201 时，也会带上 Location 首部，它表示新创建资源的 URI

```
Location: /index.html
Location: https://www.baidu.com/index.html
```

:::tip

Location 里的 URI 既可以使用绝对 URI，也可以使用相对 URI。但相对 URI 只能在站内跳转的时候使用

:::

## WWW-Authenticate

响应头字段`WWW-Authenticate`和请求头字段`Authorization`经常搭配使用，`WWW-Authenticate` 通常会和一个 `401 Unauthorized` 的响应一同被发送到客户端，此时客户端想要通过服务器身份认证再时需要添加请求头字段`Authorization`。如下图所示：

<Img w="600" legend="图：HTTP认证框架" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/0bfK6I.jpg
" />

关于 HTTP 访问认证可以参考[HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)

## Proxy-Authenticate

与`WWW-Authenticate`不同的是，`Proxy-Authenticate`发出的是代理服务器。当客户端收到代理服务器发出的`Proxy-Authenticate`时，客户端想要通过服务器身份认证再时需要添加请求头字段`Proxy-Authorization`。

## Server

`Server`字段主要是告诉客户端当前正在提供 Web 服务的`软件名称和版本号`。

**例如：**

```
Server: Apache/2.2.17
```

## Vary

服务器在回复请求报文时，会根据请求报文中的`Accept、Accept-*`字段进行“内容协商”。同一个请求，经过内容协商后可能会有不同的字符集、编码、浏览器等版本，所以**服务器会在响应头里多加一个`Vary`字段，记录服务器在内容协商时参考的请求头字段。**每当 Accept 等请求头变化时，Vary 也会随着响应报文一起变化，也就是说，同一个 URI 可能会有多个不同的“版本”。

**例如：**

```
Vary: Accept-Encoding,User-Agent,Accept
```

这个 Vary 字段表示服务器依据了 `Accept-Encoding`、`User-Agent` 和 `Accept` 这三个头字段，然后决定了发回的响应报文。

### 什么时候用 Vary

`Vary`主要用在传输链路中间的**代理服务器实现缓存服务**，代理服务器会对同一个 URL 可能会缓存多个“版本”的资源。

当客户端发送相同的请求时，代理就读取缓存里的`Vary`，对比请求头里相应的`Accept-Encoding`、`User-Agent`等字段，如果和`Vary`匹配，比如都是`gzip、Chrome`，就表示版本一致，可以返回缓存的数据。当比对不一致时，代理服务器需要先从源服务器获取资源，然后再将资源响应给客户端。

**整体的流程如下图所示：**

<Img w="500" legend="图：Vary功能图" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/4QsFdz.png
" />

## 其他字段

除了上述字段外还有`Access-Control-Allow-Origin`、`Access-Control-Allow-Methods`、`Access-Control-Allow-Headers`、`Access-Control-Allow-Credentials`等字段，这些`Access-Control-Allow-*`用在`CORS`跨域的预检请求对应的响应头中。关于这部分可以参考文档中关于[CORS](/docs/web/2.cross-domain/cors)的内容。

## 参考链接

- [图解 HTTP -- [日]上野宣](https://book.douban.com/subject/25863515/)
- [HTTP Headers -- MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
