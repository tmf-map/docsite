---
title: 什么是Web Service
author: Robbie Han
author_title: Front End Engineer @ Tradeshift
author_url: https://github.com/Robbie-Han
author_image_url: https://robbie-pic.oss-cn-beijing.aliyuncs.com/IMG_4175.JPG?x-oss-process=style/compress
tags: [webService]
---

import Img from '@site/src/components/Img';

## 什么是 Web Service：

相比于 Web Service（网络服务），“本地服务”这个名词我们似乎更加的熟悉。本地服务通过本地的计算机环境为系统功能提供服务，完成某项特定的功能，使用期间不需要使用网络。而对应的 Web Service 则是利用网络调用其他网站的资源来实现系统的某项特定功能。

​ 例如，当我们想在个人网站中添加一个显示天气的功能时，如果我们仅仅使用一些简单的前端组件显然是无法实现的。这项功能的数据可能不仅依赖于数据库的分析，甚至还需要卫星的探测等。此外，天气展示这项功能并不是我们这个网站中的核心功能，我们不会为了实现这项功能付出太多的开发成本。

<Img width="480" legend="图：360导航中的天气功能" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Ozb8Z0.png" />

于是乎，Web Service 就应运而生了。对于像在网页上显示天气、地图、Twitter 上的最新动态这类的非核心功能，我们不需要自己去开发，Web Service 就可以让我们的网站使用其他网站的资源。**这些网络资源会向外界暴露出能够通过 Web 进行调用的 API，我们只需要调用这些 API，就可以拿到这些网络资源的数据**。

<!--truncate-->

## 跨语言、跨平台

不同的人开发不同的功能可能会使用不同的平台和开发语言，有的人可能使用 Java、有的人可能会用 PHP 等。想到这些语言的数据类型和数据结构可能完全不一样，我们肯定会怀疑**部署在 Web 服务器上的这些网络资源到底能不能满足我们的需求呢**？

如果不能满足这些需求，那还要它干嘛.....

首先，Web Service 是与平台无关的，不管你使用什么平台，都可以使用 Web Service。此外，它与编程语言也没有半毛钱关系，只要遵守相关协议，就可以使用任意编程语言，向其他网站要求 Web Service。这大大增加了 Web Service 的适用性，降低了对程序员的要求。

Web Service 要想做到不区分平台和语言，肯定要使用一种通用的数据结构，通过 HTTP 进行传输。所以 Web Service 一般会使用**http+XML**的形式进行通信。

## 本地服务的缺陷

- 本地资源不足。很多数据和资料，本地得不到，只有向其他网站要。
- 成本因素。本地提供服务，往往是不经济的，使用专业网站的服务更便宜。这里面涉及硬件和人员两部分，即使你买得起硬件，专门找一个人管理系统，也是很麻烦的事。
- 可移植性差。如果你想把本机的服务，移植到其他机器上，往往很困难，尤其是在跨平台的情况下。

## Web Service 的优势

除了解决本地服务的这些缺陷和上面提出的跨平台、跨语言外，Web Service 还有以下的优越性：

- 对于 Web Service 提供者来说，部署、升级和维护 Web Service 都非常单纯，不需要考虑客户端兼容问题，而且一次性就能完成。

- 对于 Web Service 使用者来说，可以轻易实现多种数据、多种服务的聚合（mashup），因此能够做出一些以前根本无法想像的事情

## Web Service、API、SDK

### 什么是 API

研发人员 A 开发了软件 A，研发人员 B 正在研发软件 B。

有一天，研发人员 B 想要调用软件 A 的部分功能来用，但是他又不想从头看一遍软件 A 的源码和功能实现过程，怎么办呢？

研发人员 A 想了一个好主意：我把软件 A 里你需要的功能打包好，写成一个函数。

你按照我说的流程，把这个函数放在软件 B 里，就能直接用我的功能了！其中，API 就是研发人员 A 说的那个函数。

<Img width="360" legend="图：研发人员A和研发人员B交互示意图" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/zhWVcF.jpg" />

> An API is an interface that can be used to program software that interacts with an existing application.APIs have been described as the glue holding the Internet together. They are woven into the fabric of most things end users do on their devices.

### 什么是 SDK

SDK 就是 Software Development Kit 的缩写，翻译过来——软件开发工具包。这是一个覆盖面相当广泛的名词，可以这么说：辅助开发某一类软件的相关文档、范例和工具的集合都可以叫做 SDK。SDK 被开发出来是为了减少程序员工作量的。

比如——

我们现在要在企业 ERP 系统中增加某个功能（比如自动备份、数据分析、云存储等），但又不想耗费大量时间、也没那么多研发亲自去做这个功能。这时我们可以选择使用这个“SDK”软件包，把 ERP 系统连接上 API 接口，就可以使用 SDK 软件包里的功能。

### Web Service 与 API 的关系

所有的 Web Service 都会向外提供一个 API，并且 Web Service 是依赖于网络的。API 是一段代码的公共接口，通过这个接口可以调用已封装好的功能。通过 API 调用的可能是一个 Web 服务，但它也可能是一个 JavaScript 库（不需要网络）。两者更多区别详见---[What Is The Difference Between Web Services and APIs?](https://nordicapis.com/what-is-the-difference-between-web-services-and-apis/)

### SDK 与 API 的关系

举例说明两者之间的关系：

<Img width="360" legend="图：奶茶示例图" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/iPjpHO.jpg" />

有一杯奶茶，它的名字叫做“SDK”。

奶茶上插着吸管，吸管的名字叫“API”。把你叫做“XX 系统”。

如果你想喝到 SDK 里的奶茶（让系统拥有 SDK 中的功能），你必须通过 API 这根吸管来实现（通过 API 连接你的系统和 SDK 工具包），否则你就喝不到奶茶。

所以：

SDK ＝放着你想要的软件功能的软件包

API ＝ SDK 上唯一的接口

## 参考链接

- [Web service 是什么---阮一峰](http://www.ruanyifeng.com/blog/2009/08/what_is_web_service.html)

- [WebService 就是这么简单---Java3y(掘金)](https://juejin.im/post/5aadae4bf265da238a303917)

- [SDK 和 API 的区别？---简道云](https://www.zhihu.com/question/21691705/answer/770586138)

- [What Is The Difference Between Web Services and APIs?](https://nordicapis.com/what-is-the-difference-between-web-services-and-apis/)
