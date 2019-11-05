---
id: postMassage
title: postMassage
sidebar_label: postMassage
---
![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/pSaI0z.png)

跨文档通信 API（Cross-document messaging）。它是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，它可用于解决以下方面的问题：

- 页面和其打开的新窗口的数据传递
- 多窗口之间消息传递
- 页面与嵌套的iframe消息传递
- 上面三个场景的跨域数据传递


这个API为window对象新增了一个window.postMessage方法，允许跨窗口通信，不论这两个窗口是否同源。

举例来说，父窗口http://aaa.com向子窗口http://bbb.com发消息，调用postMessage方法就可以了。
```js
var popup = window.open('http://bbb.com', 'title');
popup.postMessage('Hello World!', 'http://bbb.com');
```
postMessage方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即"协议 + 域名 + 端口"。也可以设为*，表示不限制域名，向所有窗口发送。

子窗口向父窗口发送消息的写法类似。
```js
window.opener.postMessage('Nice to see you', 'http://aaa.com');
```
父窗口和子窗口都可以通过message事件，监听对方的消息。

```js
window.addEventListener('message', function(e) {
  console.log(e.data);
},false);
```
message事件的事件对象event，提供以下三个属性：

1. event.source：发送消息的窗口
2. event.origin: 消息发向的网址
3. event.data: 消息内容

下面的例子是，子窗口通过event.source属性引用父窗口，然后发送消息。

```js
window.addEventListener('message', receiveMessage);
function receiveMessage(event) {
  event.source.postMessage('Nice to see you!', '*');
}
```
event.origin属性可以过滤不是发给本窗口的消息。
```js
window.addEventListener('message', receiveMessage);
function receiveMessage(event) {
  if (event.origin !== 'http://aaa.com') return;
  if (event.data === 'Hello World') {
      event.source.postMessage('Hello', event.origin);
  } else {
    console.log(event.data);
  }
}
```