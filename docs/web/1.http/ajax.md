---
id: ajax
title: Ajax
sidebar_label: Ajax
---
## Ajax

Ajax是Asynchronous Javascript + XML的简写，这一技术能够向服务器请求额外的数据而无须卸载页面，Ajax技术的核心是XMLHttpRequest对象（简称XHR）。

XHR的用法首先创建XHR对象，如下：

```js
var xhr = new XMLHttpRequest();
```

在使用XHR对象时，要调用的第一个方法是open()，它接受3个参数：
- 要发送的请求的类型（"get"、"post"等）
- 请求的URL
- 表示是否异步发送请求的布尔值，**默认是true(异步),可以省去**

下面就是调用这个方法的例子。  
```js
xhr.open("get", "api/example", false);
```

这行代码会启动一个针对api/example的GET请求。有关这行代码，需要说明两点：
- URL相对于执行代码的当前页面（当然也可以使用绝对路径）；
- 调用open()方法并不会真正发送请求，而只是启动一个请求以备发送。

注：只能向同一个域使用相同端口和协议的URL发送请求。如果URL与启动请求的页面有任何差别，都会引发安全错误。要发送特定的请求，必须像下面这样调用send()方法：

```js
xhr.open("get", "api/example", false);
xhr.send(null);
```

这里的send()方法接收一个参数，即要作为请求主体发送的数据。**如果不需要通过请求主体发送数据，则必须传入null**，因为这个参数对有些浏览器来说是必需的。

调用send()之后，请求就会被发送到服务器。由于这次请求是同步的，JS代码会等到服务器响应之后再继续执行。在收到响应后，响应的数据会自动填充XHR对象的属性，相关的属性简介如下：

* status：响应的HTTP状态。
* responseText：作为响应主体被返回的文本。
* responseXML：如果响应的内容类型是"text/xml"或"application/xml"，这个属性中将保存包含着响应数据的XML DOM文档。
* statusText：HTTP状态的说明。

在接收到响应后，第一步是检查status属性，以确定响应已经成功返回。一般来说，可以将HTTP状态代码为200作为成功的标志。此时，responseText属性的内容已经就绪，而且在内容类型正确的情况下，responseXML也应该能够访问了。此外，状态代码为304表示请求的资源并没有被修改，可以直接使用浏览器中缓存的版本；也意味着响应是有效的。为确保接收到适当的响应，应该像下面这样检查上述两种状态代码：

```
xhr.open("get", "api/example", false);
xhr.send(null);
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          alert(xhr.responseText);
} else {
          alert("Request was unsuccessful:"+xhr.status);
}
```
根据返回的状态代码，这个例子可能会显示由服务器返回的内容，也可能会显示一条错误信息。建议通过检测status来决定下一步的操作，不要依赖statusText，因为后者在浏览器使用时不太可靠。

另外，无论内容类型是什么，响应主体的内容都会保存到responseText属性中；而对于非XML而言，responseXML属性的值将为null。像前面这样发送同步请求当然没有问题，但多数情况下，我们还是要发送异步请求，才能让JavaScript继续执行而不必等待响应。此时，可以检测XHR对象的readyState属性，该属性表示请求/响应过程的当前活动阶段。这个属性可取的值如下：

0：未初始化。尚未调用open()方法。

1：启动。已经调用open()方法，但尚未调用send()方法。

2：发送。已经调用send()方法，但尚未接收到响应。

3：接收。已经接收到部分响应数据。

4：完成。已经接收到全部响应数据，而且已经可以在客户端使用了。

只要readyState属性的值由一个值变成另一个值，都会触发一次 **readystatechange** 事件，可以利用这个事件来检测每次状态变化后readyState的值。通常我们只对**readyState值为4的阶段感兴趣**，因为这时所有数据都已经就绪。不过，**必须在调用open()之前指定onreadystatechange事件处理程序才能确保跨浏览器兼容性**。

Old XHR Ajax：
```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
   if (xhr.readyState == 4){
           if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
               alert(xhr.responseText);
         } else {
              alert("Request was unsuccessful:" + xhr.status);
         }
   }
};
xhr.open("get", "exanmple.php", true);
xhr.send(null);
```

XHR Level2 Ajax：

```js
function myAsyncFunction(url) {
 return new Promise((resolve, reject) => {
   const xhr = new XMLHttpRequest();
   xhr.open("GET", url); // 通过url建立链接
   xhr.onload = () => resolve(xhr.responseText); //接收到完整响应数据时触发
   xhr.onerror = () => reject(xhr.statusText); //请求发生错误的时候触发。
   xhr.send();
 });
};
```

完整的XHR应用参考：https://github.com/cosmos-x/earth-ui/blob/master/src/components/_utils/xhr/index.js 

https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest 

[XMLHttpRequest Level 2 使用指南，作者：阮一峰](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)

掘金上一篇[Ajax](https://juejin.im/post/5a20b1f1f265da432529179c#heading-8)详解讲的还不错