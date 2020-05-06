---
title: OAuth
sidebar_label: OAuth
---

import Img from '../../../src/components/Img';

## OAuth 定义

[OAuth 2.0（开放授权）](https://zh.wikipedia.org/wiki/%E5%BC%80%E6%94%BE%E6%8E%88%E6%9D%83)是一个开放标准，**允许用户让第三方应用通过`access_token`（令牌）来访问该用户在某一网站上（微信、微博、Github）存储的私密的资源（如用户名、邮箱、联系人列表），而无需将账号和密码提供给第三方应用**。

因为使用账号和密码登录时，账号和密码等信息都会保存在第三方应用后台（可能被盗取、泄露），所以当我们不信任第三方应用时，我们可以选择以令牌授权的形式让第三方应用获取个人信息，登录第三方应用平台。

## OAuth 的角色及流程

### OAuth 中的角色

为了方便说清楚`OAuth`的运行流程，需要先了解 `OAuth` 流程中的这几个角色 ：

1. `Resource Owner`：资源所有者，本文中又称"用户"（user）。
2. `Client`：客户端，既“第三方应用”。
3. `Authorization server`：授权服务器，即服务提供商专门用来处理授权的服务器。
4. `Resource server`：资源服务器，即服务提供商存放用户生成的资源的服务器，它与授权服务器，可以是同一台服务。

`OAuth`的作用就是让"客户端"安全可控地获取"用户"的授权，从“资源服务器”中获取用户的基本信息。

### OAuth 运行流程

<Img w="400" legend="OAuth授权流程" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200216165331.png" />

如上图所示：

1. 客户端向用户请求权限。
2. 用户点击**授权**后，客户端收到授权许可。
3. 客户端使用上一步获得的授权向授权服务器获取令牌。
4. 授权服务器将令牌发送给客户端。
5. 客户端获得令牌后，使用令牌向资源服务器获取用户资源。
6. 资源服务器返回受保护的资源。

## 应用场景

为了更好的理解`OAuth`的运行原理，我们可以通过一个常见的例子来对其进行说明。如下图：

<Img w="400" legend="leetcode登录" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200216204452.png" />

当使用[leetcode](https://leetcode-cn.com/)刷题时，我们除了可以通过注册使用账号密码登录外，还可以使用`Github`进行登录。当点击图中`Github`的`Logo`时，页面会跳转指向 `Github` 的 `OAuth` 授权网址，其`URL`如下：

```
https://github.com/login/oauth/authorize?
  client_id = 6efe458dfe2230acceea&
  redirect_uri = https%3A%2F%2Fleetcode.com%2Faccounts%2Fgithub%2Flogin%2Fcallback%2F&
  scope = user%3Aemail&
  response_type = code&
  state = dIqOqdw4WChR
```

其中:

- `client_id`参数让`Github`授权服务器知道是谁在请求。
- `redirect_uri`参数是授权后跳转的网址（leetcode）。
- `scope`参数表示要求的授权范围（用户个人信息）。
- `response_type`参数表示要求返回授权码（code）。
- `state`参数会在重定向时作为`Query Parameter`，开发者可以通过该参数验证请求有效性。`state`还可以用于防止跨站请求伪造（CSRF）。

**第一步**，当我们点击`Github`图标时，网页会跳转到上面`URL`对应的授权页面，**客户端通过授权页面向用户请求权限**。如下图所示：

<Img w="400" legend="授权页面" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200216204845.png" />

**第二步**，当我们点击`Authorize oj-leetcode`按钮后，**`leetcode`将获得授权**，这时网站就会重定向到`redirect_uri`参数指定的网址。跳转时，会传回一个授权码，就像下面这样:

```
https://leetcode.com/accounts/github/login/callback/?code=9275236b97affb3c6cc&state=dIqOqdw4WChR
```

**第三步**，`leetcode`网站拿到授权码以后，就可以**在后端向`Github`网站请求令牌**。

```
https://github.com/login/oauth/authorize?
  client_id = cc568d196569c732159c&
  client_secret = ddddsssss&
  grant_type = authorization_code&
  code = 9275236b97affb3c6cc&
  redirect_uri = https://leetcode-cn.com/
```

其中：

- `client_id`和`client_secret`参数用来确认客户端（leetcode）身份（`client_secret`参数是保密的，因此只能在后端发请求）。
- `grant_type`参数的值是`AUTHORIZATION_CODE`，表示采用的授权方式是授权码。
- `code` 参数是上一步拿到的授权码。
- `redirect_uri`参数是令牌颁发后的回调网址。

**第四步**，**当`Github`网站收到请求以后，如果通过验证，就会发送令牌给`leetcode`**。具体做法是向`redirect_uri`指定的网址，发送一段 `JSON` 数据。

```
{
"access_token":"2YotnFZFEjr1zCsicMWpAA",
"token_type":"bearer",
"expires_in":3600,
"refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
......
}
```

其中：

- `access_token`：表示访问令牌，必选项。
- `token_type`：表示令牌类型，不区分大小写，必选项，可以是 bearer 类型或 mac 类型。
- `expires_in`：表示过期时间，单位为秒。如果省略该参数，必须其他方式设置过期时间。
- `refresh_token`：表示更新令牌，用来更新`access_token`，过期时间长于`access_token`，可选项。

生成 `access_token` 的时候也会生成一个 `refresh_token`，`refresh_token` 过期时间长于`access_token`。当令牌过期时，客户端不用再重复上面的步骤，可以调用对应的`API`用 `refresh_token`更新 `access_token` 。

**第五步**，客户端（`leetcode`）通过令牌向`Github`资源服务器发出请求。

**第六步**，`Github`资源服务器将`Personal user data`（用户数据）传回给`leetcode`。

## 授权模式

`OAuth 2.0` 一共分成四种授权模式，四种模式分别应用于不同场景，四种模式为:

1. 授权码模式
2. 密码模式
3. 简化模式
4. 客户端模式

### 授权码模式

**授权码模式**是最常用的流程，安全性也最高，它适用于那些有后端的 `Web` 应用。授权码通过前端传送，令牌则是储存在后端，而且所有与资源服务器的通信都在后端完成。这样的前后端分离，可以避免令牌泄漏。

**授权码模式**获取令牌的流程如下：

<Img w="500" legend="授权码模式流程" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/微信截图_20200216194354.png" />

上文介绍的`GitHub`便是采用了**授权码模式**，**第三方应用`leetcode`先申请一个授权码`code`，然后再用该授权码获取令牌**。

:::tip

除了授权码模式外，还有密码模式、简化模式和客户端模式，这三种模式在本文中将不再介绍，也不推荐使用这三种授权模式。

:::

如果对其它三种授权模式感兴趣，可以通过参考连接中的`1`和`2`来学习。

另外，阮一峰在他的博客--[GitHub OAuth 第三方登录示例教程](http://www.ruanyifeng.com/blog/2019/04/github-oauth.html)中对授权码模式进行了代码实践，建议实践一下。

## refresh_token

`refresh_token`即“更新令牌”，当授权服务器在返回`access_token`的同时会将`refresh_token`一起返回，并且`refresh_token`的过期时间晚于`access_token`。当用户使用的`access_token`过期时，可以使用`refresh_token`来重新获取令牌。

### 为什么使用 refresh_token

`access_token`是用户访问服务器资源进行身份认证的凭证，一般设置的过期时间都比较短。较短的过期时间主要是从安全方面考虑，一方面，较短的生命周期可以限制攻击者盗取`access_token`，另一方面，较短的生命周期可以在`access_token`改变时，及时的更新`access_token`。

当`access_token`过期需要更新时，只需要向授权服务器发送一个携带`refresh_token`的`Post`请求就可以实现`access_token`的更新（`web`应用的更新还需要携带`client secret`）。

### refresh_token 存储

由于`refresh_token`设置的过期时间较长，所以存储`refresh_token`不被泄露至关重要。`refresh_token`应该和`client secret`一样保存在应用后端，只有在更新`access_token`的时候才需要离开后端。

此外，将`token`和`refresh_token`存储在客户端，服务器就不用专门的维护令牌状态，这样无疑会很好的减轻服务器的压力。

## OAuth 安全

在使用授权码模式时，使用`Github`、微信等网站进行授权登录时，可能会因为`Github`用户授权页面的`URL`不包含`state`参数，导致 CSRF 攻击。

假设，当“黑客”使用`leetcode`网站时，通过自己的`Github`账号，获取了自己的`code`（授权码）。然后“黑客”精心打造了一个和`leetcode`网页高度相似的网站，如果有人通过`Github`账号登录该钓鱼网站，**网站将会把黑客的授权码返回给用户**。用户获取黑客的授权码后向`Github`服务器请求了“黑客”的令牌。此时`黑客`便可以跟任何使用该“钓鱼网站”的用户共享信息。

为了解决授权码模式存在的`CSRF`攻击问题，通常需要在`Github`用户授权页面的`URL`中添加`state`参数，如下所示：

```
https://github.com/login/oauth/authorize?
  client_id = 6efe458dfe2230acceea&
  redirect_uri = https%3A%2F%2Fleetcode.com%2Faccounts%2Fgithub%2Flogin%2Fcallback%2F&
  scope = user%3Aemail&
  response_type = code&
  state = dIqOqdw4WChR
```

其中`state`参数是个随机数，每次刷新页面`state`参数都会改变，`state`会保存在用户本地。

当用户点击授权按钮后，页面会重定向到用户权限认证的`redirect_uri`(leetcode)页面，授权服务器(Github)返回的`code`和`state`会作为查询参数返回，如下所示：

```
https://leetcode.com/accounts/github/login/callback/?code=9275236b97affb3c6cc&state=dIqOqdw4WChR
```

因为两次`state`都是`Github`给出，此时通过对比用户本地保存的`state`和授权服务器返回的`state`，来判断是否是异常请求。这样就可以避免`CSRF`攻击。

## 参考链接

1. [彻底理解 OAuth2 协议，by 代码真香](https://www.youtube.com/watch?v=T0h6A-M_WmI)
2. [理解 OAuth 2.0, by 阮一峰](https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)
3. [OAuth，by Wikipedia](https://en.wikipedia.org/wiki/OAuth)
4. [OAuth 2.0 的一个简单解释，by 阮一峰](http://www.ruanyifeng.com/blog/2019/04/oauth_design.html)
5. [OAuth 2.0 的四种方式，by 阮一峰](https://www.ruanyifeng.com/blog/2019/04/oauth-grant-types.html)
6. [GitHub OAuth 第三方登录示例教程，by 阮一峰](http://www.ruanyifeng.com/blog/2019/04/github-oauth.html)
7. [OAuth 2.0 授权认证详解，by 木鲸鱼](https://juejin.im/post/5cc81d5451882524f72cd32c#heading-33)
