(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{162:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return s}));n(0);var r=n(193);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var a={id:"websocket",title:"Websocket",sidebar_label:"Websocket"},l=[],b={rightToc:l},p="wrapper";function s(e){var t=e.components,n=c(e,["components"]);return Object(r.b)(p,o({},b,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,'HTTP 协议有一个缺陷：通信只能由客户端发起。这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用"轮询"：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）。因此，工程师们一直在思考，有没有更好的方法。WebSocket 就是这样发明的。'),Object(r.b)("p",null,"WebSocket 协议在2008年诞生，2011年成为国际标准。所有浏览器都已经支持了。WebSocket不是HTTP协议，HTTP只负责建立WebSocket连接。"),Object(r.b)("p",null,"它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。"),Object(r.b)("img",{src:"https://raw.githubusercontent.com/ThinkBucket/oss/master/KkrB30.png",width:"425",height:"340"}),Object(r.b)("p",null,"其他特点包括："),Object(r.b)("p",null,"（1）建立在 TCP 协议之上，服务器端的实现比较容易。"),Object(r.b)("p",null,"（2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。"),Object(r.b)("p",null,"（3）数据格式比较轻量，性能开销小，通信高效。"),Object(r.b)("p",null,"（4）可以发送文本，也可以发送二进制数据。"),Object(r.b)("p",null,"（5）没有同源限制，客户端可以与任意服务器通信。"),Object(r.b)("p",null,"（6）协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。"),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"ws://example.com:80/some/path")),Object(r.b)("img",{src:"https://raw.githubusercontent.com/ThinkBucket/oss/master/RuWgZG.png",width:"410",height:"310"}),Object(r.b)("p",null,"客户端的简单示例\nWebSocket 的用法相当简单。"),Object(r.b)("p",null,"下面是一个网页脚本的例子（点击这里看运行结果），基本上一眼就能明白。"),Object(r.b)("pre",null,Object(r.b)("code",o({parentName:"pre"},{className:"language-js"}),'var ws = new WebSocket("wss://echo.websocket.org");\nws.onopen = function(evt) { \n  console.log("Connection open ..."); \n  ws.send("Hello WebSockets!");\n};\nws.onmessage = function(evt) {\n  console.log( "Received Message: " + evt.data);\n  ws.close();\n};\nws.onclose = function(evt) {\n  console.log("Connection closed.");\n};      \n')),Object(r.b)("p",null,"更多内容请阅读：\n",Object(r.b)("a",o({parentName:"p"},{href:"http://www.ruanyifeng.com/blog/2017/05/websocket.html"}),"WebSocket 教程，作者：阮一峰"),"\n",Object(r.b)("a",o({parentName:"p"},{href:"http://www.ruanyifeng.com/blog/2017/05/websocket.html"}),"JavaScript 服务器推送技术之 WebSocket，作者：SHERlocked93")))}s.isMDXComponent=!0},193:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return u}));var r=n(0),o=n.n(r),c=o.a.createContext({}),a=function(e){var t=o.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},l=function(e){var t=a(e.components);return o.a.createElement(c.Provider,{value:t},e.children)};var b="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},s=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,c=e.originalType,l=e.parentName,b=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}(e,["components","mdxType","originalType","parentName"]),s=a(n),u=r,i=s[l+"."+u]||s[u]||p[u]||c;return n?o.a.createElement(i,Object.assign({},{ref:t},b,{components:n})):o.a.createElement(i,Object.assign({},{ref:t},b))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var c=n.length,a=new Array(c);a[0]=s;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[b]="string"==typeof e?e:r,a[1]=l;for(var u=2;u<c;u++)a[u]=n[u];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}s.displayName="MDXCreateElement"}}]);