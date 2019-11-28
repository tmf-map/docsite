```
id: webService
title: 什么是Web Service
author: Robbie Han
author_title: Front End Engineer @ Tradeshift
author_url: https://github.com/USTC-Han
author_image_url: https://robbie-pic.oss-cn-beijing.aliyuncs.com/IMG_4175.JPG?x-oss-process=style/compress
tags: [webService]
```

## 什么是Web Service：

​		相比于Web Service（网络服务），“本地服务”这个名词我们似乎更加的熟悉。本地服务通过本地的计算机环境为系统功能提供服务，完成某项特定的功能，使用期间不需要使用网络。而对应的Web Service则是利用网络调用其他网站的资源来实现系统的某项特定功能。

​		例如，当我们想在个人网站中添加一个显示天气的功能时，如果我们仅仅使用一些简单的前端组件显然是无法实现的。这项功能的数据可能不仅依赖于数据库的分析，甚至还需要卫星的探测等。此外，天气展示这项功能并不是我们这个网站中的核心功能，我们不会为了实现这项功能付出太多的开发成本。

​	   于是乎，Web Service就应运而生了。对于像在网页上显示天气、地图、Twitter上的最新动态这类的非核心功能，我们不需要自己去开发，Web Service就可以让我们的网站使用其他网站的资源。**这些网络资源会向外界暴露出能够通过Web进行调用的API，我们只需要调用这些API，就可以拿到这些网络资源的数据**。

<!--truncate-->

## 跨语言、跨平台

​		不同的人开发不同的功能可能会使用不同的平台和开发语言，有的人可能使用Java、有的人可能会用PHP等。想到这些语言的数据类型和数据结构可能完全不一样，我们肯定会怀疑**部署在Web服务器上的这些网络资源到底能不能满足我们的需求呢**？

​		如果不能满足这些需求，那还要它干嘛.....

​		首先，Web Service是与平台无关的，不管你使用什么平台，都可以使用Web Service。此外，它与编程语言也没有半毛钱关系，只要遵守相关协议，就可以使用任意编程语言，向其他网站要求Web Service。这大大增加了Web Service的适用性，降低了对程序员的要求。

​		Web Service要想做到不区分平台和语言，肯定要使用一种通用的数据结构，通过HTTP进行传输。所以Web Service一般会使用**http+XML\json**的形式进行通信。

## 本地服务的缺陷		

- 本地资源不足。很多数据和资料，本地得不到，只有向其他网站要。
- 成本因素。本地提供服务，往往是不经济的，使用专业网站的服务更便宜。这里面涉及硬件和人员两部分，即使你买得起硬件，专门找一个人管理系统，也是很麻烦的事。
- 可移植性差。如果你想把本机的服务，移植到其他机器上，往往很困难，尤其是在跨平台的情况下。

## Web Service的优势

除了解决本地服务的这些缺陷和上面提出的跨平台、跨语言外，Web Service还有以下的优越性：

- 对于Web Service提供者来说，部署、升级和维护Web Service都非常单纯，不需要考虑客户端兼容问题，而且一次性就能完成。

*　对于Web Service使用者来说，可以轻易实现多种数据、多种服务的聚合（mashup），因此能够做出一些以前根本无法想像的事情

## 其他

​		Web Service分两大类架构一种是基于Soap协议的，另外一种就是基于Restful思想的，由于Restful Api接口的设计思想，后者国外商业应用更多。例如谷歌推特提供的Api接口。

## 参考链接

[参考链接一](http://www.ruanyifeng.com/blog/2009/08/what_is_web_service.html)

[参考链接二](https://juejin.im/post/5aadae4bf265da238a303917)