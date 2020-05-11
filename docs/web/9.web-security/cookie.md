---
id: cookie
title: cookie
---

https://www.youtube.com/watch?v=lNQAl71Abqc

初衷是为了记住用户浏览网站上的浏览信息，HTTP 是无状态的，导致服务器没有办法维持一个状态，比如保持用户的登录状态，而不是每次都要登录。

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/WSZuNg.png)

1994 年网景通讯的员工将“magic cookies”的这个概念应用到了 web 通讯，试图解决 Web 中购物车应用。在文档中，网景浏览器在第一个浏览器就支持了 cookie

<img width="235" height="160" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/a5hWrl.png" align= 'left'/>

cookie 是浏览器保存在用户电脑上的一小段文本，**用来保存用户在网站上的必要的信息**。Web 页面或服务器告诉浏览器按照一定的规范存储这些信息，并且在以后的所有请求中，这些信息就会自动加在**HTTP Request Header**中发送给服务器，服务器根据这些信息判断不同的用户。并且 cookie 本身是安全的。

<br />
<br />

## 用法(API)

服务端向客户端发送的 cookie(HTTP 头，带参数)：

```
Set-Cookie: value[; expires=date][; domain=domain][; path=path][; secure]
```

客户端设置 cookie：

```
document.cookie = "<cookie-name>=<cookie-value>;(可选参数1);(可选参数2)"
```

可选参数：

```
- Expires=<date>：cookie的最长有效时间，若不设置则生命期与会话期相同，即会话cookie
- Max-Age=<non-zero-digit>：cookie生成后失效的秒数
- Domain=<domain-value>：指定cookie可以送达的主机域名，若一级域名设置了则二级域名也能获取。
- Path=<path-value>：指定一个URL，例如指定path=/docs，则”/docs”、”/docs/Web/“、”/docs/Web/Http”均满足匹配条件
- Secure：必须在请求使用SSL或HTTPS协议的时候cookie才回被发送到服务器
- HttpOnly：客户端无法更改Cookie，客户端设置cookie时不能使用这个参数，一般是服务器端使用
```

示例：

```
Set-Cookie: sessionid=aes7a8; HttpOnly; Path=/

document.cookie = "KMKNKK=1234;Sercure"
```

可选前缀：

- **Secure-：以**Secure-为前缀的 cookie，必须与 secure 属性一同设置，同时必须应用于安全页面（即使用 HTTPS）
- **Host-：以**Host-为前缀的 cookie，必须与 secure 属性一同设置，同时必须应用于安全页面（即使用 HTTPS）。必须不能设置 domian 属性（这样可以防止二级域名获取一级域名的 cookie），path 属性的值必须为”/“。

前缀使用示例：

```
Set-Cookie: __Secure-ID=123; Secure; Domain=example.com
Set-Cookie: __Host-ID=123; Secure; Path=/

document.cookie = "__Secure-KMKNKK=1234;Sercure"
document.cookie = "__Host-KMKNKK=1234;Sercure;path=/"
```
