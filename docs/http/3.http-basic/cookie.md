---
title: Cookie
sidebar_label: Cookie
---

import Img from '../../../src/components/Img';

import Hint from '../../../src/components/Hint';

## 前言

因为 HTTP 是无状态的，所以服务器没有办法维持一个状态（无记忆能力），比如保持用户的登录状态，而不是每次都要登录。为了让服务器可以“记忆”客户端，1994 年网景通讯的员工将“magic Cookies”的这个概念应用到了 web 通讯，试图解决 Web 中购物车应用。在文档中，网景浏览器在第一个浏览器就支持了 Cookie。

## 什么是 Cookie

Cookie 是浏览器保存在用户电脑上的一小段文本，**用来保存用户在网站上的必要的信息**。Web 页面或服务器告诉浏览器按照一定的规范存储这些信息，并且在以后的所有请求中，这些信息就会自动加在**HTTP Request Header**中发送给服务器，**服务器根据这些信息判断不同的用户**。

<Img w="235" legend="图：Cookies" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/a5hWrl.png" />

### 客户端设置 Cookie

客户端可以在控制台通过`document.Cookie`来设置浏览器 Cookie。

例如：

```js
document.Cookie = 'KMKNKK=1234;Sercure';
```

## Cookie 的工作过程

Cookie 的工作需要依靠**请求头**中的`Cookie`字段和**响应头**中的`Set-Cookie`字段。这两个字段都是由一些`key=value`形式的字段组成，中间用分号`;`隔开。

Cookie 的工作过程如下图所示：

<Img w="235" legend="Cookie的工作过程" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/l4Y5bL.png" />

通过上图可以看出：

1. 当用户通过浏览器第一次访问服务器的时候，服务器肯并不知道他的身份的。所以，就要**创建一个独特的身份标识数据**，格式是“key=value”，然后放进 Set-Cookie 字段里，**随着响应报文一同发给浏览器**。

2. 浏览器收到响应报文，**响应报文头中含有 Set-Cookie 字段，知道这是服务器给的身份标识**，于是就保存起来，下次再请求的时候就自动把这个值放进 Cookie 字段里发给服务器。

3. 因为第二次请求里面有了 Cookie 字段，服务器就知道这个用户不是新人，之前来过，**就可以拿出 Cookie 里的值，识别出用户的身份**，然后提供个性化的服务。

## Cookie 属性

上面提到 Cookie 是浏览器保存在用户电脑上的一小段文本，**用来保存用户在网站上的必要的信息**。所以，Cookie 中除了一些用户信息外，还会有一些关于安全、过期时间等信息，而这些信息就是通过添加 Cookie 的属性来实现的。

### Cookie 的生存周期

Cookie 的生存周期，也就是它的有效期，让它只能在一段时间内可用，就像是食品的“保鲜期”，一旦超过这个期限浏览器就认为是 Cookie 失效，在存储里删除，也不会发送给服务器。

Cookie 的有效期可以使用 `Expires` 和`Max-Age` 两个属性来设置。

其中：

- Expires= "date"：俗称“过期时间”，用的是**绝对时间点**，可以理解为“截止日期”（deadline），若不设置则生命期与会话期相同，即会话 Cookie
- Max-Age="non-zero-digit"：用的是**相对时间**，单位是秒，**浏览器用收到报文的时间点再加上 Max-Age，就可以得到失效的绝对时间**。

<Img w="680" legend="Set-Cookie 设置 Cookie" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/0g3c26.png" />

上图通过`Set-Cookie`来设置 Cookie，其中 Expires 标记的过期时间是“GMT 2019 年 6 月 7 号 8 点 19 分”，而 Max-Age 则只有 10 秒，如果收到报文的时间是 6 月 6 号零点，那么 Cookie 的实际有效期就是“6 月 6 号零点过 10 秒”。

<Hint type="tip">Max-Age 对应的相对时间是收到报文才开始计算的；而浏览器缓存中的 Cache-Control: max-age = 100 中的`max-age`是从服务器发送回应报文开始计算</Hint>

### Cookie 的作用域

为了保证浏览器将 Cookie 仅发送给特定的服务器和 URI，避免被其他网站盗用，我们需要为 Cookie 设置作用域。

Cookie 作用域的设置比较简单，`Domain`和`Path`指定了 Cookie 所属的**域名**和**路径**，**浏览器在发送 Cookie 前会从 URI 中提取出 host 和 path 部分，对比 Cookie 的属性**。如果不满足条件，就不会在请求头里发送 Cookie。

<Hint type="tip">使用这两个属性可以为不同的域名和路径分别设置各自的 Cookie。不过现实中为了省事，通常 Path 就用一个“/”或者直接省略，表示域名下的任意路径都允许使用 Cookie，让服务器自己去挑。</Hint>

### Cookie 的安全性

Cookie 的安全性常用的有三个字段：`HttpOnly`、`Secure`和`SameSite`。其中前两个字段对应的 value 会被省略，这是因为它们都是布尔值，即`HttpOnly`是等价于`HttpOnly=true`。下面简单介绍一下这几个字段的含义：

**HttpOnly**

在 JS 脚本里可以用`document.cookie`来读写 Cookie 数据，这就带来了安全隐患，**有可能会导致“跨站脚本”（XSS）攻击窃取数据**。

属性“HttpOnly”会告诉浏览器，**此 Cookie 只能通过浏览器 HTTP 协议传输，禁止其他方式访问，浏览器的 JS 引擎就会禁用 `document.cookie` 等一切相关的 API**，脚本攻击也就无从谈起了。

**Secure**

属性 Secure 表示这个 **Cookie 仅能用 HTTPS 协议加密传输**，明文的 HTTP 协议会禁止发送。但 Cookie 本身不是加密的，浏览器里还是以明文的形式存在。

**SameSite**

属性 SameSite 可以防范“跨站请求伪造”（XSRF）攻击，设置成`SameSite=Strict`可以`严格限定 Cookie 不能随着跳转链接跨站发送`，而`SameSite=Lax`则略宽松一点，允许 GET/HEAD 等安全方法，但禁止 POST 跨站发送。

**可选前缀**

- **Secure-**：以`Secure-`为前缀的 Cookie，必须与 secure 属性一同设置，同时必须应用于安全页面（即使用 HTTPS）

- **Host-**：以`Host-`为前缀的 Cookie，必须与 secure 属性一同设置，同时必须应用于安全页面（即使用 HTTPS）。**必须不能设置 domian 属性（这样可以防止二级域名获取一级域名的 Cookie），path 属性的值必须为”/“**。

前缀使用示例：

```
Set-Cookie: __Secure-ID=123; Secure; Domain=example.com
Set-Cookie: __Host-ID=123; Secure; Path=/

document.Cookie = "__Secure-KMKNKK=1234;Sercure"
document.Cookie = "__Host-KMKNKK=1234;Sercure;path=/"
```

## 小结

- Cookie 是服务器委托浏览器存储的一些数据，让服务器有了“记忆能力”；
- 响应报文使用 Set-Cookie 字段发送“key=value”形式的 Cookie 值；
- 请求报文里用 Cookie 字段发送多个 Cookie 值；
- 为了保护 Cookie，还要给它设置有效期、作用域等属性，常用的有 Max-Age、Expires、Domain、HttpOnly 等；
- Cookie 最基本的用途是身份识别，实现有状态的会话事务。

## 相关拓展

[理解 Session 和 Cookie -- 代码真香（YouTube 需翻墙）](https://www.youtube.com/watch?v=lNQAl71Abqc)

[CSRF](https://www.thinkbucket.cn/docs/web/11.web-security/CSRF)

[XSS](https://www.thinkbucket.cn/docs/web/11.web-security/XSS)
