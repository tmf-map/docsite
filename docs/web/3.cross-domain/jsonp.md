---
id: jsonp
title: JSONP
sidebar_label: JSONP
---

JSONP是服务器与客户端跨源通信的常用方法。**最大特点就是简单适用，老式浏览器全部支持，服务器改造非常小**。但只能发**GET**请求，JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。

它的基本思想是，网页通过添加一个`<script>`元素，向服务器请求JSON数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

首先，网页动态插入`<script>`元素，由它向跨源网址发出请求。

```js
function addScriptTag(src) {
  var script = document.createElement('script');
  script.setAttribute("type","text/javascript");
  script.src = src;
  document.body.appendChild(script);
}

window.onload = function () {
  addScriptTag('http://example.com/ip?callback=foo');
}

function foo(data) {
  console.log('Your public IP address is: ' + data.ip);
};
```

上面代码通过动态添加`<script>`元素，向服务器example.com发出请求。注意，该请求的查询字符串有一个callback参数，用来指定回调函数的名字，这对于JSONP是必需的。

服务器收到这个请求以后，会将**数据放在回调函数的参数位置**返回。
```js
foo({
  "ip": "8.8.8.8"
});
```
由于 `<script>`元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了foo函数，该函数就会立即调用。**作为参数的JSON数据被视为JavaScript对象**，而不是字符串，因此避免了使用JSON.parse的步骤。

