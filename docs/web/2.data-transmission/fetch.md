---
title: Fetch
---

## Fetch API

XMLHttpRequest 是一个设计粗糙的 API，不符合关注分离（Separation of Concerns）的原则，配置和调用方式非常混乱，而且基于事件的异步模型写起来也没有现代的 Promise，generator/yield，async/await 友好。

Fetch API 是近年来被提及将要取代 XHR 的技术新标准，是一个 HTML5 的 API。Fetch 并不是 XHR 的升级版本，而是从一个全新的角度来思考的一种设计。Fetch 是基于 Promise 语法结构，而且它的设计足够低阶，这表示它可以在实际需求中进行更多的弹性设计。对于 XHR 所提供的能力来说，Fetch 已经足够取代 XHR ，并且提供了更多拓展的可能性。

Fetch API 规范明确了用户代理获取资源的语义。原生支持 Promise，调用方便，符合语义化。

```js
// 获取 some.json 资源
fetch('some.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('data', data);
  })
  .catch(function (error) {
    console.log('Fetch Error: ', error);
  });
```

可配合使用 ES2016 中的 async / await 语法，更加优雅。

```js
// 采用ES2016的 async/await 语法
async function() {
  try {
    const response = await fetch('some.json');
    const data = response.json();
    console.log('data', data);
  } catch (error) {
    console.log('Fetch Error: ', error)
  }
}
```

## fetch 方法的两种调用方式

```js
Promise fetch(String url, [, Object options]) // 常用
Promise fetch(Request req, [, Object options])
```

第一个参数是一个 url，或一个 Request 对象，第二个参数（可选）是配置信息

可选配置信息是一个 Object 对象，可以包含以下字段：

- `method`: 请求的方法，例如：GET, POST。
- `headers`: 请求头部信息，可以是一个简单的对象，也可以是 Headers 类实例化的一个对象。
- `body`: 需要发送的信息内容，可以是 `Blob`, `BufferSource`, `FormData`, `URLSearchParams` 或者 `USVString`。注意，GET, HEAD 方法不能包含 body。
- `mode`: 请求模式，分别有 `cors`, `no-cors`, `same-origin`, `navigate` 这几个可选值。
  - `cors`: 允许跨域，要求响应中 `Acess-Control-Allow-Origin` 这样的头部表示允许跨域。
  - `no-cors`: 只允许使用 `HEAD`, `GET`, `POST` 方法。
  - `same-origin`: 只允许同源请求，否则直接报错。
  - `navigate`: 支持页面导航。
- `credentials`: 表示是否发送 cookie，有三个选项：
  - `omit`: 不发送 cookie（2017 年 8 月 25 日以前默认）。
  - `same-origin`: 仅在同源时发送 cookie **（现在默认）**。
  - **`include`**: 发送 cookie。
- `cache`: 表示处理缓存的策略。
- `redirect`: 表示发生重定向时，有三个选项：
  - `follow`: 跟随。
  - `error`: 发生错误。
  - `manual`: 需要用户手动跟随。
- `integrity`: 包含一个用于验证资资源完整性的字符串。

例子：

```js
// Example POST method implementation:

postData('http://example.com/answer', {answer: 42})
  .then(data => console.log(data)) // JSON from `response.json()` call
  .catch(error => console.error(error));

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer' // *client, no-referrer
  }).then(response => response.json()); // parses response to JSON
}
```

Fetch API 的一个应用：https://github.com/muwenzi/http-chain/blob/master/src/BrowserRequest.js#L97

## Headers

Headers 可用来表示 HTTP 的头部信息，使用 Headers 的接口，你可以通过 Headers() 构造函数来创建一个你自己的 headers 对象。

```js
let headers = new Headers({
  'Content-Type': 'text/plain',
  'Content-Length': content.length.toString(),
  'X-Custom-Header': 'ProcessThisImmediately'
});
headers.append('X-Custom-Header', 'AnotherValue');
headers.has('Content-Type'); // true
headers.getAll('X-Custom-Header'); // ["ProcessThisImmediately", "AnotherValue"]
```

Headers 提供 `append`, `delete`, `get`, `getAll`, `has`, `set`, `forEach` 等这些实例方法，可供开发者更加灵活地配置请求中的 headers。

## Request

Request 类用于描述请求内容。构造函数接受的参数与 fetch 方法一致，这里就不展开介绍了。我们可以这么理解，事实上**fetch 方法在调用时，会将传入的参数构造出一个 Request 对象并执行**。

```js
var URL = '//api.some.com';
var getReq = new Request(URL, {method: 'GET', cache: 'reload'});
fetch(getReq)
  .then(function (response) {
    return response.json();
  })
  .catch(function (error) {
    console.log('Fetch Error: ', error);
  });
```

需要注意的是，此时 fetch 方法仍然可以添加第二个参数，即配置信息对象。如果添加，这个参数将会覆盖掉 Request 对象的配置信息中相同的字段：

```js
let URL = '//api.some.com';
let getReq = new Request(URL, {
    method: 'GET',
    headers: {'X-Custom-Header': 'ProcessThisImmediately'}
  });
fetch(getReq, {method: 'POST'})
  ...
```

相当于：

```js
let URL = '//api.some.com';
let postReq = new Request(URL, {
    method: 'POST',
    headers: {'X-Custom-Header': 'ProcessThisImmediately'}
  });
fetch(postReq)
  ...
```

Request 接口中的配置项 headers 可以是实例化的 Headers 。

```js
var URL = '//api.some.com';
// 实例化 Headers
var headers = new Headers({
  'Content-Type': 'text/plain',
  'Content-Length': content.length.toString(),
  'X-Custom-Header': 'ProcessThisImmediately'
});
var getReq = new Request(URL, {method: 'GET', headers: headers});
fetch(getReq)
  .then(function (response) {
    return response.json();
  })
  .catch(function (error) {
    console.log('Fetch Error: ', error);
  });
```

更便捷的是，Request 对象可以从已有的 Request 对象中继承，并拓展新的配置。

```js
var URL = '//api.some.com';
var getReq = new Request(URL, {method: 'GET', headers: headers});
// 基于已存在的 Request 实例，拓展创建新的 Request 实例
var postReq = new Request(getReq, {method: 'POST'});
```

## Response

Response 实例是在 fetch()处理完 promises 之后返回的。它的实例也可用通过 JS 来创建，但只有在 ServiceWorkers 中才真正有用。

```
var res = new Response(body, init);
```

其中 body 可以是 `Bolb`, `BufferSource`, `FormData`, `URLSearchParams`, `USVString` 这些类型的值。

init 是一个对象，可以包括以下这些字段：

- `status`: 响应状态码
- `statusText`: 状态信息
- `headers`: 头部信息，可以是对象或者 Headers 实例

Response 实例提供了以下实例属性，均是只读属性：

- `bodyUsed`: 用于表示响应内容是否被使用过
- `headers`: 头部信息
- `ok`: 表明请求是否成功，响应状态为 200 ~ 299 时，值为 `true`
- `status`: 状态码
- `statusText`: 状态信息
- `type`: 响应类型
- `basic`: 同源
- `cors`: 跨域
- `error`: 出错
- `opaque`: Request mode 设置为 `no-cors`的响应
- `url`: 响应地址

Response 实例提供以下实例方法：

- `clone`: 复制一个响应对象。
- `arrayBuffer`: 将响应数据转换为 `arrayBuffer` 后 resolve
- `bolb`: 把响应数据转换为 `Bolb` 后 resolve
- `formData`: 把响应数据转换为 `formData` 后 resolve
- `json`: 把响应内容解析为对象后 resolve
- `text`: 把响应数据当做字符串后 resolve

现在浏览器基本上都支持，github 官方推出了一个 Fetch API 的 [polyfill 库](https://github.com/github/fetch)，可以让更多浏览器提前感受到 Fetch API 的便捷的开发体验。

## 处理 error

即使是 HTTP 错误（如状态码 404、500），fetch 方法返回的 promise 也不是 reject 的，而是 resolve 的，只将`ok`字段设置为 `false`。只有当网络错误发生时才会 reject。这其中的区别在于，能够获得 HTTP 错误状态，则表明服务器正常工作且在处理请求，而“网络错误”表示根本无法到达服务器(例如网络掉线或者 DNS 查找失败)。

对大部分开发者来说，HTTP 错误返回一个 reject 的 promise 是非常有用的。为此，我们仅仅需要验证`ok`的值 ，如果为`false`，则 reject：

```js
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
fetch('http://httpstat.us/500')
  .then(handleErrors)
  .then(response => console.log('ok'))
  .catch(error => console.log(error));
```

## 处理 timeout

Fetch API 是基于 Promise，由于 Promise 没有处理 timeout 的机制，所以如果要限制代码的最大处理时间，需要自己处理。使用`Promise.race`可以轻松做到这一点。

```js
function withTimeout(msecs, promise) {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'));
    }, msecs);
  });
  return Promise.race([timeout, promise]);
}

withTimeout(1000, fetch('https://foo.com/bar/'))
  .then(doSomething)
  .catch(handleError);
```

这种外部方法适用于所有 HTTP 客户端和整个请求和响应的超时，但它不会终止基础 HTTP 请求。如果希望中止 HTTP 请求，可以使用低级的超时机制，如`socket.setTimeout()`，来节省一些资源。一般主流的浏览器都有默认 timeout：

| 浏览器  | timeout |
| ------- | ------- |
| Chrome  | 300s    |
| IE      | 120s    |
| Firefox | 300s    |
| Safari  | 60s     |

## 处理 bigint

请参考 BigInt [Use text() in fetch](/docs/javascript/5.typing/bigint#use-text-in-fetch)

## 参考链接

1. [Fetch API, MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)
2. [How to use the Fetch API in JavaScript, by Atta](https://attacomsian.com/blog/javascript-fetch-api)
3. [Handling Failed HTTP Responses With fetch(), by TJ VanToll](https://www.tjvantoll.com/2015/09/13/fetch-and-errors/)
4. [HTTP request timeouts in JavaScript, by Shuhei Kagawa](https://shuheikagawa.com/blog/2017/05/13/http-request-timeouts-in-javascript/)
5. [Increase timeout limit in Google Chrome, by mojoaxel](https://stackoverflow.com/questions/39751124/increase-timeout-limit-in-google-chrome)
