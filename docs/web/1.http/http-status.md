---
id: http-status
title: HTTP 状态码
sidebar_label: HTTP 状态码
---

## 常见状态码

| 大分类 | 状态码 | 含义 |
| --- | --- | --- |
| 2XX | 200 OK | 分三种，有两种是强缓存 |
|  | 201 Created | 请求成功，并创建了一个新的资源，常用在 put 和 post 请求 |
|  | 202 Accepted | 请求已经接收到，但还未响应，没有结果 |
|  | 204 No Content | 请求成功，没有内容返回 |
|  | 206 Partial Content | 请求成功，返回部分内容 |
|  |  |  |
| 3XX | 301 Moved Permanently | 永久重定向 |
|  | 302 Found | 临时重定向 |
|  | 304 Not Modified | 请求的资源并没有被修改，可以直接使用浏览器中缓存 |
|  | 307 Temporary Redirect |
|  | 308 Permanent Redirect |
|  |  |  |
| 4XX | 400 Bad Request | 请求存在错误 |
|  | 401 Unauthorized | 发送的请求认证失败 |
|  | 403 Forbidden | 请求的资源被服务器禁止 |
|  | 405 Method Not Allowed | 指定的请求方法不能被用于请求相应的资源 |
|  |  |  |
| 5XX | 500 Internal Server Error | 服务器执行请求出错 |
|  | 502 Bad Gateway | 网关错误 |
|  | 503 Service Unavailable | 服务器停机维护 |

参考链接： [MDN 状态码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
