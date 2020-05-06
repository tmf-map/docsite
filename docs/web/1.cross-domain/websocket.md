---
title: Web Sockets
---

## Websocket 简介

Websocket 是 HTML5 的一个**持久化的通信协议**，使用 ws://（非加密）和 wss://（加密）作为协议前缀。它实现了**浏览器与服务器的全双工通信**，同时也是**跨域**的一种解决方案。WebSocket 和 HTTP 都是**应用层协议**，都**基于 TCP 协议**。但是 WebSocket 是一种双向通信协议，**在建立连接之后，WebSocket 的 server 与 client 都能主动向对方发送或接收数据**。同时，WebSocket 在建立连接时需要借助 HTTP 协议，连接建立好了之后 client 与 server 之间的双向通信就与 HTTP 无关了。

HTTP 协议有一个缺陷：通信只能由客户端发起。这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用"轮询"：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）。因此，工程师们一直在思考，有没有更好的方法。WebSocket 就是这样发明的。

WebSocket 协议在 2008 年诞生，2011 年成为国际标准。所有浏览器都已经支持了。WebSocket 不是 HTTP 协议，HTTP 只负责建立 WebSocket 连接。

它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。

<img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/EoAH0t.png" width="425" height="340" />

其他特点包括：

- 建立在 TCP 协议之上，服务器端的实现比较容易。
- 与 HTTP 协议有着良好的兼容性。默认端口也是 80 和 443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
- 数据格式比较轻量，性能开销小，通信高效。
- 可以发送文本，也可以发送二进制数据。
- 没有同源限制，客户端可以与任意服务器通信。
- 协议标识符是 ws（如果加密，则为 wss），服务器网址就是 URL。

> ws://example.com:80/some/path

<img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/f9ZdFk.png" width="410" height="310" />

客户端的简单示例 WebSocket 的用法相当简单。

下面是一个网页脚本的例子（点击这里看运行结果），基本上一眼就能明白。

```js
var ws = new WebSocket('wss://echo.websocket.org');
ws.onopen = function (evt) {
  console.log('Connection open ...');
  ws.send('Hello WebSockets!');
};
ws.onmessage = function (evt) {
  console.log('Received Message: ' + evt.data);
  ws.close();
};
ws.onclose = function (evt) {
  console.log('Connection closed.');
};
```

## Socket.io

原生 WebSocket API 使用起来不太方便，我们常使用`Socket.io`，它很好地封装了 webSocket 接口，提供了更简单、灵活的接口，也对不支持 webSocket 的浏览器提供了向下兼容。

利用 Socket.io 实现跨域：

客户端代码：

```js
var p = document.getElementsByTagName('p')[0];
var io = io.connect('http://127.0.0.1:3001'); // 建立链接
io.on('data', function (data) {
  //监听服务器返回的数据
  alert('2s后改变数据👻');
  p.innerHTML = data;
});
```

服务端代码：

```js
var server = require('http').createServer(); // 创建服务器
var io = require('socket.io')(server); // 调用socket.io

io.on('connection', function (client) {
  // 监听客户端请求链接
  client.emit('data', 'Hello WebSocket from 3001.'); // 发送数据给客户端
});

server.listen(3001, function () {
  console.log('Responser is listening on port 3001');
}); //监听3001端口
```

可以通过`git clone git@github.com:Robbie-Han/cross-domain.git`将 demo 拷贝到本地，然后参考 Readme 中的步骤，运行其中的`8-WebSocket`项目。

## webSocket 跨域字段（待考证）

下面是一个例子，浏览器发出的 WebSocket 请求的头信息（摘自维基百科）。

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

上面代码中，有一个字段是 Origin，表示该请求的请求源（origin），即发自哪个域名。和 CORS 机类似。

正是因为有了 Origin 这个字段，所以 WebSocket 才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。如果该域名在白名单内，服务器就会做出如下回应。

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```

## 参考资料

1. [WebSocket 教程，作者：阮一峰](http://www.ruanyifeng.com/blog/2017/05/websocket.html)
2. [JavaScript 服务器推送技术之 WebSocket，作者：SHERlocked93](http://www.ruanyifeng.com/blog/2017/05/websocket.html)
