---
id: http-cache
title: HTTP 缓存
sidebar_label: HTTP 缓存
---

## 缓存分类

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/CXFABV.png)

HTTP缓存都是从第二次请求开始的。

- 第一次请求时，服务器返回资源，并在respone header中回传资源的缓存参数；

- 第二次请求时，浏览器判断这些请求参数，击中强缓存就直接200(from memory/disk cache)，否则就把请求参数加到request header头传给服务器，看是否击中协商缓存，击中则返回304，否则服务器会返回新的资源。

<img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/PShPaZ.png" width="500" height="200"/>

状态码200的有三种情况：

<img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/V8aYae.png" width="710" height="65"/>

HTTP缓存分为强缓存和协议缓存，它们的区别如下：

|       | 强缓存 | 协商缓存 |
| ----  | ---- | ----|
|状态码|200(from memory/disk cache)|304|
|缓存位置|浏览器|浏览器|
|谁来决定|浏览器|服务器|
|请求头还是响应头|if 开头的都是请求头，Cache-Control都有，其他都是响应头|与强缓存相同|
|Normal Reload(CMD + R)|
|Hard Reload(CMD + Shift + R)|
|Empty Cache and Hard Relaod|

## 强缓存
强缓存的200也有两种情况：

- 200 from memory 不访问服务器，直接读缓存，从内存中读取缓存。此时的数据时缓存到内存中的，当kill进程后，也就是浏览器关闭以后，数据将不存在。但是这种方式只能缓存派生资源

- 200 from disk 不访问服务器，直接读缓存，从磁盘中读取缓存，当kill进程时，数据还是存在。这种方式也只能缓存派生资源。

以图片为例：

- 访问-> 200 -> 退出浏览器
- 再进来-> 200(from disk cache) -> 正常刷新 -> 200(from memory cache)

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Vfo3MR.png)


| 强缓存 | 可选值 | 优先级 | 优缺点 |
| ----  | ---- | ---- | ---- |
|Cache-Control|**max-age**: xx秒，相对时间，强缓存必备；**no-cache**: 不直接使用缓存，开始服务器新鲜度判定；**no-store**: 每次都下载最新资源；**public/private**: 是否只能被单个用户保存|高|无|
| Expires | GMT时间 | 低 | 服务器和本地时间不一定统一 |

## 协商缓存
304 Not Modified 访问服务器，发现数据没有更新，服务器返回此状态码。然后从缓存中读取数据。

如下图，协商缓存都是成对出现的（相同颜色是一对响应和请求头部，if 开头的都是请求头部）。

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/x4wXe9.png)

| 协商缓存 | 可选值 | 优先级 | 优缺点 |
| ----  | ---- | ---- | ---- |
|Last-Modify/If-Modify-Sicne|GMT时间|依次比较，排序靠后|1.修改并不意味修改；2.秒级判断（精确度到秒）|
|ETag/If-None-Match|校验值|依次比较，先比较|使用系统默认的Hash算法，在分布式部署中会导致不同服务器的ETag值不一致|
![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/vX3wwK.png)

## 整体流程

<img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/pXmTws.png" width="445" height="520"/>

<img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/8yA4hg.png" width="630" height="380"/>



相关文章推荐：

https://juejin.im/post/5b3c87386fb9a04f9a5cb037#heading-3

https://imweb.io/topic/5795dcb6fb312541492eda8c









