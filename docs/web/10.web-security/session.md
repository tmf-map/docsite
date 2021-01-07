---
title: Session
---

## 什么是 Session

客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是 Session。客户端浏览器再次访问时只需要从该 Session 中查找该客户的状态就可以了。

用户第一次登录后，浏览器会将用户信息发送给服务器，服务器会为该用户创建一个 SessionID，并在 Cookie 中将该 SessionID 一并返回给浏览器，浏览器将这些数据保存在本地。当用户再次发送请求时，浏览器会**自动**的把上次请求存储的 Cookie 数据发送给服务器。

服务器接收到请求信息后，会通过浏览器请求的数据中的 SessionID 判断当前是哪个用户，然后根据 SessionID 在 Session 库中获取用户的 Session 数据返回给浏览器。

<Img w="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/CKdYzW.png" />

Session 生成后，只要用户继续访问，服务器就会更新 Session 的最后访问时间，并维护该 Session。为防止内存溢出，服务器会把长时间内没有活跃的 Session 从内存删除。这个时间就是 Session 的超时时间。如果超过了超时时间没访问过服务器，Session 就自动失效了。

如果说 Cookie 机制是通过检查客户身上的“通行证”来确定客户身份的话，那么 Session 机制就是通过检查服务器上的“客户明细表”来确认客户身份。Session 相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了。

:::tip

这里所指的 Seesion 是指服务器端的概念，你可以选则在把服务器端发过来的 SessionID 存到 cookie 或者 session storage 当中。

:::

## 与 Cookie 的关系与区别

1. Session 是在服务端保存的一个数据结构，用来跟踪用户的状态，这个数据可以保存在集群、数据库、文件中，Cookie 是客户端保存用户信息的一种机制，用来记录用户的一些信息，也是实现 Session 的一种方式。
2. Cookie 的安全性一般，他人可通过分析存放在本地的 Cookie 并进行 Cookie 欺骗。在安全性第一的前提下，选择 Session 更优。重要交互信息比如权限等就要放在 Session 中，一般的信息记录放 Cookie 就好了。
3. 单个 Cookie 保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存 20 个 Cookie。
4. 当访问增多时，Session 会较大地占用服务器的性能。考虑到减轻服务器性能方面，应当适时使用 Cookie。
5. Session 的运行依赖 Session ID，而 Session ID 是存在 Cookie 中的。也就是说，如果浏览器禁用了 Cookie，Session 也会失效（但是可以通过其它方式实现，比如在 URL 中传递 SessionID,即 sid=xxxx）。

## 分布式 Session 问题

在互联网公司为了可以支撑更大的流量，后端往往需要多台服务器共同来支撑前端用户请求，那如果用户在 A 服务器登录了，第二次请求跑到服务 B 就会出现登录失效问题。

分布式 Session 一般会有以下几种解决方案：

1. Nginx ip_hash 策略，服务端使用 Nginx 代理，每个请求按访问 IP 的 hash 分配，这样来自同一 IP 固定访问一个后台服务器，避免了在服务器 A 创建 Session，第二次分发到服务器 B 的现象。
2. Session 复制，任何一个服务器上的 Session 发生改变（增删改），该节点会把这个 Session 的所有内容序列化，然后广播给所有其它节点。
3. 共享 Session，服务端无状态话，将用户的 Session 等信息使用缓存中间件来统一管理，保障分发到每一个服务器的响应结果都一致。

## 参考资料

1. [Java 进阶 & 1 分钟理解 Token ，Cookie，Session By 乘风破浪的姐姐](https://www.jianshu.com/p/8ef0c5a551d3)
2. [90%的程序员都没有完全回答对 Cookie 和 Session 的区别？ By 纯洁的微笑](https://mp.weixin.qq.com/s/rIiC-yVzm1swR8rOioP2QA)
