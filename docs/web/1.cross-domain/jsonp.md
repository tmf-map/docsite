---
id: jsonp
title: JSONP
sidebar_label: JSONP
---

## JSONP 简介

JSONP 是服务器与客户端跨源通信的常用方法。**最大特点就是简单适用，老式浏览器全部支持，服务器改造非常小**。但只能发**GET**请求，JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。

## JSONP 的原理

它的基本思想是，网页通过添加一个`<script>`元素，向服务器请求 JSON 数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

首先，网页动态插入`<script>`元素，由它向跨源网址发出请求。

**客户端配置**

```js
function addScriptTag(src) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.src = src;
  document.body.appendChild(script);
}

window.onload = function () {
  addScriptTag('http://example.com/ip?callback=myFunction');
};

function myFunction(data) {
  console.log('Your public IP address is: ' + data.ip);
}
```

上面代码通过动态添加`<script>`元素，向服务器 example.com 发出请求。注意，该请求的查询字符串有一个 callback 参数，用来指定回调函数的名字，这对于 JSONP 是必需的。

**服务器配置(Node)**

```js
var express = require('express');
var app = express();

var responsePort = 3001;

app.get('/', function (req, res) {
  var callbackName = req.query.callback; // myFunction
  res.send(callbackName + "({'ip': '8.8.8.8'});");
  // myFunction({'ip': '8.8.8.8'})
});

app.listen(responsePort, function () {
  console.log('jsonp_responser server listening on port ' + responsePort);
});
```

服务器收到这个请求以后，服务器通过参数获得回调函数的名字`callbackName`,会将**数据放在回调函数的参数位置**返回，如下所示：

```js
myFunction({ip: '8.8.8.8'});
```

由于 `<script>`元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了 foo 函数，该函数就会立即调用。**作为参数的 JSON 数据被视为 JavaScript 对象**，而不是字符串，因此避免了使用 JSON.parse 的步骤。

## JSONP 跨域 demo

可以通过`git clone git@github.com:Robbie-Han/cross-domain.git`将 demo 拷贝到本地，然后参考 Readme 中的步骤，运行其中的`2-JSONP`项目。
