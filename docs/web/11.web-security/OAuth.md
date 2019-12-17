---
id: OAuth
title: OAuth
sidebar_label: OAuth
---

https://www.youtube.com/watch?v=T0h6A-M_WmI

生成 access_token 的时候生成一个 refresh_token，refresh_token 过期时间长于 access_token。客户端用 refresh_token 请求 access_token 续签。服务端刷新原 access_token 的过期时间再返回。
