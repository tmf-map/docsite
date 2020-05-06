---
title: 实体头字段
sidebar_label: 实体头字段
---

import Img from '../../../src/components/Img';

## 概述

`实体字段`是用来描述实体内容的字段，可以用于请求报文或响应报文中。常见的实体字段有`Content-Length`，`Content-Language`，`Content-Encoding`。这些字段的含义如下所示：

<Img w="400" legend="图：HTTP实体头字段" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Fx55L6.png"/>

## Allow

`Allow` 首部字段用于枚举资源所支持的 HTTP 请求方法的集合。

若服务器不支持请求的方法时会返回状态码 `405 Method Not Allowed`，同时还会把支持的 HTTP 方法写到 `Allow` 字段后。若返回的首部字段的值为空，说明资源不接受使用任何 HTTP 方法的请求。比如服务器需要临时禁止对资源的任何访问。

**语法：**

```
Allow: GET, POST, HEAD
```

## 内容协商

在请求头字段那一节已经对`Content-Type：资源媒体类型`、`Content-Encoding：资源的编码方式`、`Content-Language：资源使用的语言`三个字段进行了讲解，它们分别对应请求头中的`Accept`、`Accept-Encoding`和`Accept-Language`。如下图所示：

<Img w="500" legend="图：与Accept*对应的实体头字段" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/jjjfyc.png" />

## Content-Length

首部字段 `Content-Length` 表明了**实体主体部分的大小**(单位是字节)。**对实体主体进行内容分块传输时，分块的长度是未知的，不能再使用 `Content-Length`字段**。

```
Content-Length: 15000
```

## Content-Location

首部字段`Location` 不同，`Content-Location`表示的是报文主体返回资源对应的 URI，而`Location`指向的是重定向的 URI。

**语法：**

```
Content-Location: <url>(相对或者绝对地址)
```

## Content-Range

`Content-Range`的功能是告知客户端片段的`实际偏移量`和`资源的总大小`。

**语法：**

```
Content-Range: bytes x-y/length
```

它的语法与 `Range` 头区别在于没有“=”，**范围后多了总长度 length**。例如，对于“0-10”的范围请求，值就是`Content-Range: bytes 0-10/100`。

`Content-Range`与`Range`、`If-Range`、`Accept-Range`之间的关系，在请求头字段那一节已经详细介绍过，在后面的文件传输中还会提到详细的应用场景。

## Expires

`Expires`字段主要应用于浏览器缓存的强缓存中，服务器通过`Expires`字段告知客户端实体资源的过期时间。当再次访问该资源的时候，如过此时时间不超过`Expires`设定的时间，则命中强缓存，不需要向服务器发送请求。

**语法：**

```
Expires: Fri, 27 Dec 2019 05:41:37 GMT
```

## Last-Modified

`Last-Modified`字段主要应用在协商缓存中，当服务器资源发生改变时，会更改`Last-Modified`的值。之后如果客户端携带`If-Modified-Since`请求资源，服务器发现两者的值不匹配（没有命中协商缓存），会把新的`Last-Modified`字段和更新过的资源发送到客户端，然后更新客户端`If-Modified-Since`的值。

**语法：**

```
Last-Modified: Sat, 13 May 2017 15:50:14 GMT
```
