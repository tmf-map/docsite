---
id: session
title: session
---

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/v09UXT.png)

这里所指的 Seesion 是指服务器端的概念，你可以选则在把服务器端发过来的 sessionid 存到 cookie 活着 session storage 当中。

## 基本概念

Session 是在无状态的 HTTP 协议下，服务端记录用户状态时用于标识具体用户的机制。它是在服务端保存的用来跟踪用户的状态的数据结构，可以保存在文件、数据库或者集群中。

在浏览器关闭后这次的 Session 就消失了，下次打开就不再拥有这个 Session。其实并不是 Session 消失了，而是 Session ID 变了，服务器端可能还是存着你上次的 Session ID 及其 Session 信息，只是他们是无主状态，也许一段时间后会被删除。

大多数的应用都是用 Cookie 来实现 Session 跟踪的，第一次创建 Session 的时候，服务端会在 HTTP 协议中告诉客户端，需要在 Cookie 里面记录一个 SessionID，以后每次请求把这个会话 ID 发送到服务器。

当需要记住用户时，在服务端会设置一个响应头 Set-Cookie，返回给客户端，例如：Set-Cookie:SESSIONID=12345678；客户端接收到这个响应后，此后发送的每一个请求浏览器都会自动带上 Cookie 请求头，对应内容是 Cookie:SESSIONID=12345678。在服务端内存中存有 session，将客户端发送的请求中的 cookie 值与内存中的 session 进行对比，就可以识别这个客户端了。

## 与 Cookie 的关系与区别：

1、Session 是在服务端保存的一个数据结构，用来跟踪用户的状态，这个数据可以保存在集群、数据库、文件中，Cookie 是客户端保存用户信息的一种机制，用来记录用户的一些信息，也是实现 Session 的一种方式。

2、Cookie 的安全性一般，他人可通过分析存放在本地的 Cookie 并进行 Cookie 欺骗。在安全性第一的前提下，选择 Session 更优。重要交互信息比如权限等就要放在 Session 中，一般的信息记录放 Cookie 就好了。

3、单个 Cookie 保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存 20 个 Cookie。

4、当访问增多时，Session 会较大地占用服务器的性能。考虑到减轻服务器性能方面，应当适时使用 Cookie。

5、Session 的运行依赖 Session ID，而 Session ID 是存在 Cookie 中的。也就是说，如果浏览器禁用了 Cookie,Session 也会失效（但是可以通过其它方式实现，比如在 url 中传递 Session ID,即 sid=xxxx）。
