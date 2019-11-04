---
id: websocket
title: WebSocket
sidebar_label: WebSocket
---

## Websocket简介
Websocket是HTML5的一个**持久化的通信协议**，使用ws://（非加密）和wss://（加密）作为协议前缀。它实现了**浏览器与服务器的全双工通信**，同时也是**跨域**的一种解决方案。WebSocket和HTTP都是**应用层协议**，都**基于 TCP 协议**。但是 WebSocket 是一种双向通信协议，**在建立连接之后，WebSocket 的 server 与 client 都能主动向对方发送或接收数据**。同时，WebSocket 在建立连接时需要借助 HTTP 协议，连接建立好了之后 client 与 server 之间的双向通信就与 HTTP 无关了。

## Socket.io

原生WebSocket API使用起来不太方便，我们常使用`Socket.io`，它很好地封装了webSocket接口，提供了更简单、灵活的接口，也对不支持webSocket的浏览器提供了向下兼容。

利用Socket.io实现跨域：

客户端代码：

```js
  var p = document.getElementsByTagName('p')[0];
  var io = io.connect('http://127.0.0.1:3001');// 建立链接
  io.on('data', function (data) { //监听服务器返回的数据
      alert('2s后改变数据👻');
      p.innerHTML = data
  });
```
服务端代码：

```js
var server = require('http').createServer();// 创建服务器
var io = require('socket.io')(server); // 调用socket.io

io.on('connection', function (client) { // 监听客户端请求链接
    client.emit('data', 'Hello WebSocket from 3001.'); // 发送数据给客户端
});

server.listen(3001, function () {
    console.log('Responser is listening on port 3001');
});    //监听3001端口
```
可以通过`git clone git@github.com:USTC-Han/cross-domain.git`将demo拷贝到本地，然后参考Readme中的步骤，运行其中的`8-WebSocket`项目。

## webSocket跨域字段（待考证）

下面是一个例子，浏览器发出的WebSocket请求的头信息（摘自维基百科）。
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
上面代码中，有一个字段是Origin，表示该请求的请求源（origin），即发自哪个域名。和CORS机类似。

正是因为有了Origin这个字段，所以WebSocket才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。如果该域名在白名单内，服务器就会做出如下回应。

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```