---
title: Ajax
---

## 简介

Ajax 是 Asynchronous Javascript + XML 的简写，这一技术能够向服务器请求额外的数据而无须卸载页面，Ajax 技术的核心是 XMLHttpRequest 对象（简称 XHR）。

XHR 的用法首先创建 XHR 对象，如下：

```js
var xhr = new XMLHttpRequest();
```

在使用 XHR 对象时，要调用的第一个方法是 `open()`，它接受 3 个参数：

- 要发送的请求的类型（"get"、"post"等）
- 请求的 URL
- 表示是否异步发送请求的布尔值，**默认是 true(异步),可以省去**

下面就是调用这个方法的例子。

```js
xhr.open('get', 'api/example', false);
```

这行代码会启动一个针对 `api/example` 的 GET 请求。有关这行代码，需要说明两点：

- URL 相对于执行代码的当前页面（当然也可以使用绝对路径）；
- 调用 `open()`方法并不会真正发送请求，而只是启动一个请求以备发送。

只能向同一个域使用相同端口和协议的 URL 发送请求。如果 URL 与启动请求的页面有任何差别，都会引发安全错误。要发送特定的请求，必须像下面这样调用 `send()`方法：

```js
xhr.open('get', 'api/example', false);
xhr.send(null);
```

这里的 `send()`方法接收一个参数，即要作为请求主体发送的数据。**如果不需要通过请求主体发送数据，则必须传入 null**，因为这个参数对有些浏览器来说是必需的。

调用 `send()`之后，请求就会被发送到服务器。由于这次请求是同步的，JS 代码会等到服务器响应之后再继续执行。在收到响应后，响应的数据会自动填充 XHR 对象的属性，相关的属性简介如下：

- `status`：响应的 HTTP 状态。
- `responseText`：作为响应主体被返回的文本。
- `responseXML`：如果响应的内容类型是`text/xml`或`application/xml`，这个属性中将保存包含着响应数据的 XML DOM 文档。
- `statusText`：HTTP 状态的说明。

在接收到响应后，第一步是检查 `status` 属性，以确定响应已经成功返回。一般来说，可以将 HTTP 状态代码为 200 作为成功的标志。此时，`responseText` 属性的内容已经就绪，而且在内容类型正确的情况下，`responseXML` 也应该能够访问了。此外，状态代码为 304 表示请求的资源并没有被修改，可以直接使用浏览器中缓存的版本；也意味着响应是有效的。为确保接收到适当的响应，应该像下面这样检查上述两种状态代码：

```js
xhr.open('get', 'api/example', false);
xhr.send(null);
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
  alert(xhr.responseText);
} else {
  alert('Request was unsuccessful:' + xhr.status);
}
```

根据返回的状态代码，这个例子可能会显示由服务器返回的内容，也可能会显示一条错误信息。建议通过检测 `status` 来决定下一步的操作，不要依赖 `statusText`，因为后者在浏览器使用时不太可靠。

另外，无论内容类型是什么，响应主体的内容都会保存到 `responseText` 属性中；而对于非 XML 而言，`responseXML` 属性的值将为 null。像前面这样发送同步请求当然没有问题，但多数情况下，我们还是要发送异步请求，才能让 JavaScript 继续执行而不必等待响应。此时，可以检测 XHR 对象的 `readyState` 属性，该属性表示请求/响应过程的当前活动阶段。这个属性可取的值如下：

- `0`：未初始化。尚未调用 `open()`方法。
- `1`：启动。已经调用 `open()`方法，但尚未调用 `send()`方法。
- `2`：发送。已经调用 `send()`方法，但尚未接收到响应。
- `3`：接收。已经接收到部分响应数据。
- `4`：完成。已经接收到全部响应数据，而且已经可以在客户端使用了。

只要 `readyState` 属性的值由一个值变成另一个值，都会触发一次 **readystatechange** 事件，可以利用这个事件来检测每次状态变化后 `readyState` 的值。通常我们只对**`readyState` 值为 `4` 的阶段感兴趣**，因为这时所有数据都已经就绪。不过，**必须在调用 `open()`之前指定 onreadystatechange 事件处理程序才能确保跨浏览器兼容性**。

Old XHR Ajax：

```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText);
    } else {
      alert('Request was unsuccessful:' + xhr.status);
    }
  }
};
xhr.open('get', 'exanmple.php', true);
xhr.send(null);
```

XHR Level2 Ajax：

```js
function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url); // 通过url建立链接
    xhr.onload = () => resolve(xhr.responseText); //接收到完整响应数据时触发
    xhr.onerror = () => reject(xhr.statusText); //请求发生错误的时候触发。
    xhr.send();
  });
}
```

完整的 XHR 应用参考：https://github.com/webapp-suite/ui/blob/master/src/components/_utils/xhr/index.ts

## 参考资料

1. [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)
2. [XMLHttpRequest Level 2 使用指南，作者：阮一峰](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)
3. [再也不学 AJAX 了！（二）使用 AJAX，作者：libinfs](https://juejin.im/post/5a20b1f1f265da432529179c#heading-8)
