---
id: JWT
title: JWT
sidebar_label: JWT
---

JSON Web Token，JWT 是一个基于 JSON 的开放标准（RFC 7519），用于创建访问 token。简单来说，**一个 JWT 就是一个字符串**，形式如下：
```js
header.payload.signature
```

## 为什么使用 JWT？

<div align="center">
    <img width="430" height="310" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/qh2bq2.png" />
</div>


如图所示，存在3个角色：
- uthentication server （登录／授权服务器）
- user（用户）
- app server （应用服务器）

**步骤：**
1. 用户通过授权服务器的登录系统登录，授权服务器把 JWT 传给用户。
2. 用户访问应用服务器的API时，带上 JWT，应用服务器通过 JWT 来判断用户身份。

可以看到，这是一套无状态的验证机制，不必在内存中保存用户状态。用户访问时自带 JWT，无需像传统应用使用 session，应用可以做到更多的解耦和扩展。同时，JWT 可以保存用户的数据，减少数据库访问。

## 使用 JWT
## 创建 header

JWT 的 header 部分包含怎么计算 signature 的信息。

```js
{
    "typ": "JWT", // 表明是 JWT
    "alg": "HS256" // 代表生成 signature 所用的哈希算法，这里是 HMAC-SHA256
}
```

### 创建 payload

JWT 的 payload 部分即 JWT 所带的数据。

比如我们这里存储了用户 ID：
```js
{
    "userId": "b08f86af-35da-48f2-8fab-cef3904660bd"
}
```
你可以在 payload 里存储大量信息，但大量信息会降低性能，增加延迟。

### 计算生成 signature

把 header 和 payload 分别 base64 编码（两个对象已 JSON.stringify 转为字符串）后，通过 . 相加，然后用之前指定的哈希算法计算，即可得到 signature。
```js
// signature algorithm
data = base64urlEncode( header ) + "." + base64urlEncode( payload )
signature = Hash( data, secret );
```
组装 header，payload 和 signature。把 header，payload 和 signature 用 . 相连即最终的 JWT token。
```js
header.payload.signature

// header 是 eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
// payload 是 eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ
// signature 是 -xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM
// 最终 jwt token 是 eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ.-xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM
```
## 怎么验证 JWT token？

通过前面 4 步生成了 JWT token，验证服务器把它发送给用户，用户带着它访问应用服务器，应用服务器怎么验证 JWT token ？

因为应用服务器知道验证服务器哈希计算 signature 的 secret key，所以应用服务器可以用这个 secret key 去重新计算 signature （用户发送过来的 token 里有 header 和 payload），并与用户发送过来的 token 中 signature 比较，最终验证是否合法。

## 安全性？

JWT 本身的内容只是 base64 编码了，跟明文几乎没差别。JWT 并不比 cookie 更安全，所以最好配合使用 https。

