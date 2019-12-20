---
title: URI的组成部分
sidebar_label: URI的组成部分
---

## URI 的定义

URI（Uniform Resource Identifier，统一资源**标识符**）是一个用于**标识某一互联网资源名称**的**字符串**。

## URI 和 URL 的关系

与 URI 相比，显然我们更熟悉的是 URL（Uniform Resource Locator，统一资源**定位符**），例如我们的浏览器中的网址就是 URL。那么这两者之间有什么关系呢？如何理解`标识符`和`定位符`这两者的含义呢？

我们可以明确的一点是**URL 是 URI 的子集，我们能看到的 URL 都是 URI**，而 URL 只是 URI 的一种表示方式。

举个外卖员送外卖的例子，外卖员可以通过拨打手机号通知你外卖送到了，门卫不让进，到小区门口取一下。外卖员也可以通过外卖订单上的地址然后敲门将卖外送给你。此时你就是外卖员要找的“互联网资源”，你的手机号就是你的“标识符”，而你的地址就是你的“定位符”。所以不论是用地址**定位**的方式还是用手机号编号的方式，我们都可以唯一确定一个人，都是 URI 的一种实现，**而 URL 就是用地址定位的方式实现的 URI**。

- **URI 的例子**

```
http://example.org/absolute/URI/with/absolute/path/to/resource.txt

ftp://ftp.is.co.za/rfc/rfc1808.txt

mailto:John.Doe@example.com

news:comp.infosystems.WWW.servers.unix

tel:+1一816一555一1212
```

上面列举了 URI 的几个例子，可以看出 URL 只是其中一种比较常见的标识方式。

## URI 的结构

下图展示了两个 URI 例子及它们的组成部分。

```
eg:
                    hierarchical part
        ┌───────────────────┴─────────────────────┐
                    authority               path
        ┌───────────────┴───────────────┐┌───┴────┐
  abc://username:password@example.com:123/path/data?key=value&key2=value2#fragid1
  └┬┘   └───────┬───────┘ └────┬────┘ └┬┘           └─────────┬─────────┘ └──┬──┘
scheme  user information     host     port                  query         fragment

  mailto:John.Doe@example.com
  └┬┘ └─────────┬──────────┘
scheme         path
```

- scheme（协议名）：表示资源应该使用哪种**协议**来访问。
- authority：表示资源所在的主机名，通常的形式是“host:port”，即主机名加端口号。
- user information（身份信息）：表示登录主机时的用户名和密码，**但现在已经不推荐使用这种形式了**（RFC7230），因为它把敏感信息以明文形式暴露出来，存在严重的安全隐患。
- host(主机名)：表示服务器地址，地址可以是类似 baidu.com 这种 DNS 可解析的名称，或是 192.168.1.1 这类 IPv4 地址名，还可以是[0:0:0:0:0:0:0:1]这样用方括号括起来的 IPv6 地址名。
- port(端口号)：端口号是可以省略，浏览器等客户端会依据**scheme**使用**默认的端口号**，例如 HTTP 的默认端口号是 80，HTTPS 的默认端口号是 443。
- path(文件路径)：指定服务器上的文件路径来定位特定的资源。
- query(查询参数)：针对已定位的文件路径内的资源，可以通过查询参数精确定位。查询参数是一个“key=value”形式的字符串。
- fragment（片段标识符）：它是 URI 所定位的资源内部的一个“锚点”或者说是“标签”，浏览器可以在获取资源后直接**跳转到它指示的位置**。

## 参考链接

[HTTP 协议中 URI 和 URL 有什么区别？ -- daixinye](https://www.zhihu.com/question/21950864)

[统一资源标识符 -- wiki](https://zh.wikipedia.org/wiki/%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E6%A0%87%E5%BF%97%E7%AC%A6#%E6%A0%87%E8%AE%B0%E8%AF%AD%E8%A8%80%E4%B8%ADURI%E5%BC%95%E7%94%A8%E7%9A%84%E4%BD%BF%E7%94%A8)
