---
id: JWT
title: JWT
sidebar_label: JWT
---

import Img from '../../../src/components/Img';

## JWT 定义

`JWT`(JSON Web Token) 是一个基于 `JSON` 的开放标准（RFC 7519），用于创建`access token`，是目前最流行的**跨域认证解决方案**。简单来说，**一个 JWT 就是一个字符串**，形式如下：

```js
header.payload.signature;
```

## session 认证的问题

<Img w="430" legend="session认证模型" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200218233629.png" />

如上图，传统使用`seesion`进行身份认证的流程如下：

1. 客户端向服务器发送用户名和密码。
2. 服务器验证通过后，在当前对话（`session`）里面保存相关数据，比如用户名、过期时间等。
3. 服务器通过传送`Set-Cookie`将`session_id`写入用户的 `Cookie`。
4. 用户随后的每一次请求，都会通过 `Cookie`将 `session_id`传回服务器。
5. 服务器收到 `session_id`，通过与数据库保存的数据进行匹配，由此认证用户的身份。

通过上述流程可以看出，服务器需要对用户的`session`信息进行存储，并通过匹配`session_id`来辨别用户身份，因此，**服务器需要维护大量的`session`信息**。而对于服务器集群来说，由于**不同的系统之间`session`是不共享**的，因此需要将所有系统的`session`做抽象处理，大大的加大了开发难度。

除此之外，我们知道**`cookie`是不能够跨域的**，也就是上面的模型对于不同域名的应用并不适用。

## 为什么使用 JWT

<Img w="430" legend="JWT-Token认证流程" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/qh2bq2.png" />

如图所示，存在 3 个角色：

- Authentication server （认证服务器）
- user（用户）
- app server （应用服务器）

**步骤：**

1. 用户使用账号密码在登录页登录，并将账号和密码传给认证服务器。
2. 认证服务器生成`Token`并将其传给用户。
3. 用户通过携带`Token`的`API`请求访问应用服务器。
4. 应用服务器通过 `JWT` 来判断用户身份，通过验证后将数据返回给用户。

`JWT`有如下几个优点：

- **`JWT`一套无状态的验证机制，用户访问时通过`Token`进行身份验证，服务器不用为了存储用户状态来维护`session`，服务器可以做到更多的解耦和扩展**。
- `JWT`中的`Token`可以通过`URL`和请求头字段`Authorization`进行传送，可以避免跨域问题。
- `JWT` 可以通过`payload`保存用户的数据，减少数据库访问。

## JWT 创建 Token

### 创建 header

`header` 部分是一个 `JSON` 对象，用来描述 `JWT` 的元数据，如下所示：

```js
{
    "typ": "JWT", // 表明是 JWT
    "alg": "HS256" // 代表生成 signature 所用的哈希算法，这里是 HMAC-SHA256
}
```

生成`Token`时需要，将上面的 `JSON` 对象使用 `Base64URL` 算法转成字符串。

### 创建 payload

`JWT` 的 `payload` 部分用来存放实际需要传递的数据。

比如我们这里存储了用户 ID：

```js
{
    "userId": "b08f86af-35da-48f2-8fab-cef3904660bd"
}
```

你可以在 `payload` 里存储大量信息，但大量信息会降低性能，增加延迟。

与`header`相同，`payload`也需要使用`Base64URL` 算法转成字符串。

### 计算生成 signature

`header` 和 `payload` 使用的是 `Base64URL` 编码，所以将两者分别传入`base64UrlEncode`中，并结合服务器生成的`secret`使用下面的公式计算出`signature`。其中`HMAC SHA256`是 `Header` 里面默认指定的签名算法。

```js
// signature algorithm
HMACSHA256(base64UrlEncode(header) + '.' + base64UrlEncode(payload), secret);
```

组装 `header`，`payload` 和 `signature`。把 `header`，`payload` 和 `signature` 用 `.` 相连即最终的 `JWT token`。

例如：当`header`的值为`"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"`，`payload`的值为`"eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ"`，`signature`的值为`"-xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM"`时，生成的`Token`如下所示：

```js
// header.payload.signature;
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ.-xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM
```

## JWT 使用方式

客户端收到认证服务器返回的 `Token`，可以将其存在 `Cookie`或`localStorage/sessionStorage`中。

当客户端访问应用服务器时，每次请求都需要带上`Token`。你可以把它放在 `Cookie` 里面自动发送，但是这样不能跨域，所以更好的做法是放在 `HTTP` 请求头的[Authorization](/docs/http/4.http-headers/request-header#authorization)字段里面，如下所示：

```
Authorization: Basic <token>
```

在跨域时，除了上述用法外，还可以把`Token`就放在 `POST` 请求的数据体里。

## 验证 JWT token

因为应用服务器知道验证服务器哈希计算 `signature` 的 `secret`，所以应用服务器可以用 `secret` 去重新计算 `signature` （用户发送过来的 `token` 里有 `header` 和 `payload`），并与用户发送过来的 `token` 中 `signature` 比较，最终验证是否合法。

## 安全性

我们在前面提到的`header` 和 `payload`并没有进行加密，只是经过了`base64URL`的编码，所以“黑客”不需要`secret`就能将`header`和`payload`解码出来。此外，虽然在生成 `signature`时使用了哈希算法`HMACSHA256`和`secret`进行了数据签名，但这并不是数据加密。当“黑客”获取到`header`中的哈希算法后，依旧可以暴力的破解出用户的`secret`，从而实现篡改`Token`。

因此，为了保证数据的安全性，`JWT`一般需要结合`https`一起使用。

## 参考连接

1. [JSON Web Token 入门教程，by 阮一峰](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
2. [Token Authentication: The Secret to Scalable User Management，by Lindsay Brunner](https://stormpath.com/blog/token-authentication-scalable-user-mgmt)
3. [JWT HANDBOOK, by Sebastián E. Peyrott](https://www.fomasgroup.com/Portals/0/MgmNewsDocuments/jwt-handbook.pdf)
4. [使用 jwt 完成 sso 单点登录，by 秦梁的小站](https://bestqliang.com/2018/06/02/%E4%BD%BF%E7%94%A8jwt%E5%AE%8C%E6%88%90sso%E5%8D%95%E7%82%B9%E7%99%BB%E5%BD%95/)
