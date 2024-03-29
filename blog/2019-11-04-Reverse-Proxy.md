---
title: 正向代理和反向代理
author: Robbie Han
author_title: Front End Engineer @ Tradeshift
author_url: https://github.com/Robbie-Han
author_image_url: https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Dnx3Ag.jpg
tags: [正向代理, 反向代理]
---

## 正向代理

A 同学创业需要启动资金，于是他决定去找马云爸爸借钱，可想而知，最后碰一鼻子灰回来了。情急之下，他想到一个办法，找关系开后门，经过一番消息打探，原来 A 同学的大学老师王老师是马云的同学，于是 A 同学找到王老师，托王老师帮忙去马云那借 500 万过来。

不过马云并不知道这钱是 A 同学借的，马云是借给王老师的，最后由王老师转交给 A 同学。这里的王老师在这个过程中扮演了一个非常关键的角色，就是**代理**，也可以说是**正向代理**。王老师代替 A 同学办这件事，这个过程中，真正借钱的人是谁，马云是不知道的，这点非常关键。

正向代理的过程中，服务器并不知道真正的客户端是谁，客户端的请求都是依靠代理服务器来请求。在我们访问谷歌的时候，会被防火墙阻止，此时我们需要购买一款可以翻墙的服务器，这个翻墙的服务器就扮演者正向代理的角色。

<!--truncate-->

<Img width="480" legend="图：正向代理示意图" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/INXnEj.jpg" />

## 反向代理

反向代理隐藏了真实的服务端，当我们请求 www.baidu.com 的时候，就像拨打 10086 一样，背后可能有成千上万台服务员（服务器）为我们服务，但具体是哪一台，你不知道，也不需要知道，你只需要知道反向代理服务器是谁就好了，www.baidu.com 就是我们的反向代理服务器，反向代理服务器会帮我们把请求转发到真实的服务器那里去。

<Img width="480" legend="图：反向代理示意图" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/z40S1x.png" />

使用反向代理的优点：

- 保护了真实的 web 服务器，保证了 web 服务器的资源安全

  使用反向代理，可以隐藏内部网络，外部链接只能向代理服务器发送请求。而代理服务器没有保存任何网页的真实数据，因此对反向代理服务器的攻击并不会使得网页信息遭到破坏，这样就增强了 Web 服务器的安全性。

- 节约了有限的 IP 地址资源

  企业内所有的网站共享一个在 internet 中注册的 IP 地址，这些服务器分配私有地址，采用虚拟主机的方式对外提供服务。

- 减少 WEB 服务器压力，提高响应速度

  反向代理就是通常所说的 web 服务器加速，它是一种通过在繁忙的 web 服务器和外部网络之间增加一个高速的 web 缓冲服务器来降低实际的 web 服务器的负载的一种技术。反向代理服务器会强制将外部网络对要代理的服务器的访问经过它，这样反向代理服务器负责接收客户端的请求，然后到源服务器上获取内容，把内容返回给用户，并把内容保存到本地，以便日后再收到同样的信息请求时，它会把本地缓存里的内容直接发给用户，以减少后端 web 服务器的压力，提高响应速度。

两者的区别在于代理的对象不一样：正向代理代理的对象是客户端，反向代理的对象是服务器。

## 参考资料

[反向代理为何叫反向代理 --- 知乎](https://www.zhihu.com/question/24723688)

[理解 Nginx 工作原理 --- Rick617](https://www.jianshu.com/p/6215e5d24553)
