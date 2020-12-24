---
title: Cookie
---

<Img width="210" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/a5hWrl.png" float='right'/>

Cookie，原意是曲奇饼。将黄油、中筋面粉、鸡蛋液搅拌后冷藏 30 分钟，取出擀至任意形状后放入 180 度烤箱 20 分钟左右即可<sup>[1]</sup>。在美国与加拿大代表细小而扁平的蛋糕式的面饼。它的名字是由荷兰语：**koekje** 来的，意为“细小的蛋糕”。据考证，曲奇源自波斯（今伊朗）<sup>[2]</sup>。

## Cookie 是什么

### 解决的问题

我们先了解一下 Cookie 的产生是为了解决什么问题，将时间拨回到 2000 年。随着互联网的不断普及，用户对网页的要求不再满足于单方面的浏览。更复杂，更丰富的网页内容和交互被用户所需要。此时，用户状态的留存（用户追踪）成为了当时最大的技术壁垒。

:::note

用户追踪指代记录用户在网页所做过的事情。如用户登录、商品加入购物车等。

:::

以现在的技术广度来看，用户追踪的方式很多。Cookie，Session，WebStorage (LocalStorage、SessionStorage)等。但是在当时的技术环境下，这一切都是空白的。WebStorage 更是在 2009 年才第一次在 W3C 上被提及<sup>[Link](https://www.w3.org/TR/2009/WD-webstorage-20090423/)</sup>。经过 IETF（互联网工程任务组）组织的讨论，决定定义两种不同的方式来解决用户追踪的问题：

- 一种是保存在客户端的方式，即 Cookie。
- 一种是保存在服务器端的方式，即 Session。

其中 Session 虽然被存储在服务器端，但是仍需要 SessionId 的帮助来确定每一次请求对应的用户状态，而 SessionId 又常常存放在 Cookie 中，这种绕地球一圈的解决方式确实在安全性上要强于 Cookie（要盗取 SessionId 就要先破解 Cookie）。

<Img w="500" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/WSZuNg.png" />

但是同时也给服务器存储带来了压力，甚至在集群应用中需要额外的同步流程来统一管理。导致在当前的技术环境下已经很少被应用了。而 Cookie 其简单丰富的 Api，服务器零存储，无视集群等优点使其一直活跃至今。

### 定义

那到底什么是 Cookie 呢？Cookie 是保存在浏览器 document 对象下的一段有规则字符串。由一系列**键值对**组成。为了解决 HTTP 请求**无状态**的问题，会在每一次**HTTP Request Header**中**自动**添加 Cookie。这样服务器就可以通过读取 Cookie 来判断客户端的状态了。并且 cookie 本身是安全的。

格式：

```text
<cookie-name>=<cookie-value>;<cookie-name>=<cookie-value>`
```

示例：

```text
uid=013b6070c74eb20428e6be;code=xqCFUY7_r8EVc8XToEiSE5MXs7-mus4eT7qBFXTJXZI
```

### 类型

可以按照过期时间分为两类：

- 会话 cookie: 临时 cookie，用户退出浏览器，会话 Cookie 就会被删除了
- 持久 cookie: 会储存在硬盘里，保留时间更长，关闭浏览器，重启电脑，它依然存在，通常用来维护某一个用户周期性访问服务器的配置文件或者登录信息。

:::note

持久 cookie 设置一个特定的过期时间 `Expires` 或者有效期 `Max-Age`。

:::

```http
Set-Cookie: id=asdferw; Expires=wed, 23 Oct 2020 09:20:00 GMT;
```

## 工作过程

Cookie 的工作需要依靠**请求头**中的`Cookie`字段和**响应头**中的`Set-Cookie`字段。这两个字段都是由一些`key=value`形式的字段组成，中间用分号`;`隔开。

Cookie 的工作过程如下图所示：

<Img w="600" legend="Cookie的工作过程" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/l4Y5bL.png" />

通过上图可以看出：

1. 当用户通过浏览器第一次访问服务器的时候，服务器肯并不知道他的身份的。所以，就要**创建一个独特的身份标识数据**，格式是“key=value”，然后放进 Set-Cookie 字段里，**随着响应报文一同发给浏览器**。
2. 浏览器收到响应报文，**响应报文头中含有 Set-Cookie 字段，知道这是服务器给的身份标识**，于是就保存起来，下次再请求的时候就自动把这个值放进 Cookie 字段里发给服务器。
3. 因为第二次请求里面有了 Cookie 字段，服务器就知道这个用户不是新人，之前来过，**就可以拿出 Cookie 里的值，识别出用户的身份**，然后提供个性化的服务。

## 查看 Cookie

### 从浏览器小锁查看

<Img w="700" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/zULcuG.png' alt='zULcuG'/>

### 从浏览器开发者工具查看

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/2S9t0b.png' alt='2S9t0b'/>

## 设置 Cookie

Cookie 是浏览器保存在用户电脑上的一小段文本，**用来保存用户在网站上的必要的信息**。所以，Cookie 中除了一些用户信息外，还会有一些关于安全、过期时间等信息，而这些信息就是通过添加 Cookie 的属性来实现的。

### 两种设置方式

服务端设置 cookie，以 HTTP response header 的形式返回给客户端：

```http
Set-Cookie: key=value[; expires=date][; domain=domain][; path=path][; secure]
```

<Img w="680" legend="图1 Set-Cookie 设置 Cookie" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/0g3c26.png" />

客户端设置 cookie：

```js
document.cookie = '<cookie-name>=<cookie-value>;(可选参数1);(可选参数2)';
```

```js
document.cookie = 'user=wang';
console.log(document.cookie);
```

更多操作请参考 [MDN: Document.cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)，但是在 Chrome 87 版本中我们无需再使用原始的 `document.cookie` API，毕竟 get 和 set 都不是很方便，要么使用第三方封装的包([js-cookie](https://www.npmjs.com/package/js-cookie))，现在我们可以使用新的 API：`cookieStore`。这是一个异步的 API，可以很方便地获取设置以及监听 Cookie 的改变。主要包括一下 API：

- cookieStore.get
- cookieStore.getAll
- cookieStore.set
- cookieStore.delete

具体使用请参考 [官方文档](https://wicg.github.io/cookie-store/) 和 [参考资料[4]](https://mp.weixin.qq.com/s/Qzlv57p6E4QT_Gk2ZeaLNA)。

### Cookie 的有效期

Cookie 的有效期，让它只能在一段时间内可用，就像是食品的“保鲜期”，一旦超过这个期限浏览器就认为是 Cookie 失效，在存储里删除，也不会发送给服务器。Cookie 的有效期可以使用 `Expires` 和`Max-Age` 两个属性来设置。

#### `Expires=<date>`

俗称“过期时间”，用的是**绝对时间点**，可以理解为“截止日期”（deadline），若不设置则生命期与会话期相同，即会话 Cookie

#### `Max-Age=<non-zero-digit>`

Cookie 生成后失效的秒数，用的是**相对时间**，单位是秒，**浏览器用收到报文的时间点再加上 Max-Age，就可以得到失效的绝对时间**。

图 1 通过`Set-Cookie`来设置 Cookie，其中 Expires 标记的过期时间是“GMT 2019 年 6 月 7 号 8 点 19 分”，而 Max-Age 则只有 10 秒，如果收到报文的时间是 6 月 6 号零点，那么 Cookie 的实际有效期就是“6 月 6 号零点过 10 秒”。

:::tip

Max-Age 对应的相对时间是收到报文才开始计算的；而浏览器缓存中的 Cache-Control: max-age = 100 中的`max-age`是从服务器发送回应报文开始计算

:::

### Cookie 的作用域

为了保证浏览器将 Cookie 仅发送给特定的服务器和 URI，避免被其他网站盗用，我们需要为 Cookie 设置作用域。

Cookie 作用域的设置比较简单，`Domain`和`Path`指定了 Cookie 所属的**域名**和**路径**，**浏览器在发送 Cookie 前会从 URI 中提取出 host 和 path 部分，对比 Cookie 的属性**。如果不满足条件，就不会在请求头里发送 Cookie。

:::tip

使用这两个属性可以为不同的域名和路径分别设置各自的 Cookie。不过现实中为了省事，通常 Path 就用一个“/”或者直接省略，表示域名下的任意路径都允许使用 Cookie，让服务器自己去挑。

:::

#### `Domain=<domain-value>`

指定 cookie 可以送达的主机域名，若一级域名设置了则二级域名也能获取。

#### `Path=<path-value>`

为服务器特定文档指定 cookie，这个属性设置的 url 且带有这个前缀的 url 路径都是有效的。

例如：m.zhuanzhuan.58.com 和 m.zhaunzhuan.58.com/user/这两个 url。 m.zhuanzhuan.58.com 设置 cookie

```http
Set-cookie: id="123432";domain="m.zhuanzhuan.58.com";
```

m.zhaunzhuan.58.com/user/ 设置 cookie：

```http
Set-cookie: user="wang", domain="m.zhuanzhuan.58.com"; path=/user/
```

但是访问其他路径 m.zhuanzhuan.58.com/other/就会获得

```http
cookie: id="123432"
```

如果访问 m.zhuanzhuan.58.com/user/就会获得

```http
cookie: id="123432"
cookie: user="wang"
```

### Cookie 的安全性

Cookie 的安全性常用的有三个字段：`HttpOnly`、`Secure`和`SameSite`。其中前两个字段对应的 value 会被省略，这是因为它们都是布尔值，即`HttpOnly`是等价于`HttpOnly=true`。下面简单介绍一下这几个字段的含义：

#### `Secure`

表示这个 **Cookie 仅能用 SSL 或 HTTPS 协议加密传输**，明文的 HTTP 协议会禁止发送。但 Cookie 本身不是加密的，浏览器里还是以明文的形式存在。但是这并不是最安全的，由于其固有的不安全性，敏感信息也是不应该通过 cookie 传输的。

```http
Set-Cookie: id=a3fWa; Expires=Wed, 21 0ct 2015 07:28:00GMT; Secure;
```

#### `HttpOnly`

客户端无法更改 Cookie，客户端设置 cookie 时不能使用这个参数，一般是服务器端使用，属性“HttpOnly”会告诉浏览器，**此 Cookie 只能通过浏览器 HTTP 协议传输，禁止其他方式访问，浏览器的 JS 引擎就会禁用 `document.cookie` 等一切相关的 API**，脚本攻击也就无从谈起了。

:::caution

为了避免跨域脚本([XSS](/docs/web/9.web-security/xss))攻击，可以禁止 JavaScript 操作 cookie，那么通过 JavaScript 的 `document.cookie` 将无法访问带有 `HttpOnly` 标记的 cookie。

```http
Set-Cookie: __Secure-ID=123; Secure; Domain=example.com; HttpOnly
```

:::

示例：

```http
Set-Cookie: sessionid=aes7a8; HttpOnly; Path=/
```

#### SameSite

属性 SameSite 可以防范“跨站请求伪造”（XSRF）攻击，设置成`SameSite=Strict`可以`严格限定 Cookie 不能随着跳转链接跨站发送`，而`SameSite=Lax`则略宽松一点，允许 GET/HEAD 等安全方法，但禁止 POST 跨站发送。

#### 可选前缀

- **Secure-**：以`Secure-`为前缀的 Cookie，必须与 secure 属性一同设置，同时必须应用于安全页面（即使用 HTTPS）
- **Host-**：以`Host-`为前缀的 Cookie，必须与 secure 属性一同设置，同时必须应用于安全页面（即使用 HTTPS）。**必须不能设置 domian 属性（这样可以防止二级域名获取一级域名的 Cookie），path 属性的值必须为”/“**。

前缀使用示例：

```http
Set-Cookie: __Secure-ID=123; Secure; Domain=example.com
Set-Cookie: __Host-ID=123; Secure; Path=/
```

```js
document.cookie = '__Secure-KMKNKK=1234;Sercure';
document.cookie = '__Host-KMKNKK=1234;Sercure;path=/';
```

## 应用举例

Cookie 相比 Session 更符合业务场景也更方便实用。各大互联网企业都对其有高强度的依赖。

### 存储用户登录状态

通过 Cookie 可以记住用户浏览网站上的浏览信息，因为 HTTP 本身是无状态的，导致服务器没有办法维持一个状态，比如保持用户的登录状态，而不是每次都要登录。通常用来在用户登录后生成一个用户唯一的 token 来标志用户已登录，也可使用这种方式来判断用户是否登录过期或设置登录时效。

### 临时保存购物车等信息

因为 HTTP 是无状态的，所以服务器没有办法维持一个状态（无记忆能力），比如保持用户的登录状态，而不是每次都要登录。为了让服务器可以“记忆”客户端，1994 年网景通讯的员工将“magic Cookies”的这个概念应用到了 web 通讯，试图解决 Web 中购物车应用。在文档中，网景浏览器在第一个浏览器就支持了 Cookie。

下面通过一个淘宝购物车的例子来说明。

1. 打开淘宝网：https://www.taobao.com
2. 搜索任意商品，比如 `iPhone`。这时可以看到`购物车`数量为 `0`:

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/CB9xR2.png' />

1. 选择任意商品进入详情后加入购物车，可以看到`购物车`已增加为`1`:

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/vFmgRP.png' />

4. 打开开发者工具，查看 cookie，找到 `mt` 发现其值为 `ci=1_1`:

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/aupPib.png' />

5. 右击打开菜单后点击`Edit "Value"`后，修改其值为 `ci=2_1`，刷新页面后发现。购物车已经变为 `2` 了:

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/XMLveR.png' />

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/YbzwKG.png' />

6. 鼠标移入购物车打开详情后，数字自动刷新回了 `1`。这点淘宝做的还是很好的。不完全信任 cookie 值。

<GifPlayer
  gif="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cookie.gif"
  still="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cookie.jpg"
/>

## 优缺点

### 优点

1. 存储在浏览器端，减少了服务器存储的压力
2. 遵循同源策略，可设置域名和路径对数据进行隔离
3. 可通过 SSL 传输，降低了请求被破解的可能性
4. 可设置 Cookie 失效时间，防止 Cookie 永久保留在浏览器端引起的资源浪费和数据过期

### 缺点

1. 每次请求都会携带 Cookie，对带宽资源有一定浪费
2. 虽然传输过程安全，但是可通过浏览器端轻易修改数据，敏感数据不建议使用 Cookie 或加密后使用
3. Cookie 只能存储字符串类型数据，对媒体数据无能为力
4. 不同浏览器对 Cookie 的大小限制不同，通常在 4KB，因此 Cookie 只能存储简短的内容
5. 用户可手动关闭 Cookie，这样使得 Cookie 不是稳定的存储方式

## 小结

- Cookie 是服务器委托浏览器存储的一些数据，让服务器有了“记忆能力”；
- 响应报文使用 Set-Cookie 字段发送“key=value”形式的 Cookie 值；
- 请求报文里用 Cookie 字段发送多个 Cookie 值；
- 为了保护 Cookie，还要给它设置有效期、作用域等属性，常用的有 Max-Age、Expires、Domain、HttpOnly 等；
- Cookie 最基本的用途是身份识别，实现有状态的会话事务。

## 参考资料

1. [闲庭信步聊前端 - Cookie 的前世今生 By 吕宝玉](https://mp.weixin.qq.com/s/YqnhSWb03W-kTS0gyxTJjw)
2. [维基百科：曲奇](https://zh.wikipedia.org/wiki/%E6%9B%B2%E5%A5%87)
3. [这一次带你彻底了解 Cookie By 王宁博](https://mp.weixin.qq.com/s/oOGIuJCplPVW3BuIx9tNQg)
4. [前端前沿观察，Cookie 居然可以这样整了 By 你们的恺哥](https://mp.weixin.qq.com/s/Qzlv57p6E4QT_Gk2ZeaLNA)
5. [理解 Session 和 Cookie By 代码真香](https://www.youtube.com/watch?v=lNQAl71Abqc)
