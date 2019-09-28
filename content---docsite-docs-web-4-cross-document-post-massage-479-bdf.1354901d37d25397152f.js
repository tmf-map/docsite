(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{210:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"rightToc",(function(){return s})),t.d(n,"default",(function(){return i}));t(0);var a=t(249);function r(){return(r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var c={id:"postMassage",title:"postMassage",sidebar_label:"postMassage"},s=[],l={rightToc:s},p="wrapper";function i(e){var n=e.components,t=o(e,["components"]);return Object(a.b)(p,r({},l,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("img",r({parentName:"p"},{src:"https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/pSaI0z.png",alt:null}))),Object(a.b)("p",null,"跨文档通信 API（Cross-document messaging）。它是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，它可用于解决以下方面的问题："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"页面和其打开的新窗口的数据传递"),Object(a.b)("li",{parentName:"ul"},"多窗口之间消息传递"),Object(a.b)("li",{parentName:"ul"},"页面与嵌套的iframe消息传递"),Object(a.b)("li",{parentName:"ul"},"上面三个场景的跨域数据传递")),Object(a.b)("p",null,"这个API为window对象新增了一个window.postMessage方法，允许跨窗口通信，不论这两个窗口是否同源。"),Object(a.b)("p",null,"举例来说，父窗口",Object(a.b)("a",r({parentName:"p"},{href:"http://aaa.com%E5%90%91%E5%AD%90%E7%AA%97%E5%8F%A3http://bbb.com%E5%8F%91%E6%B6%88%E6%81%AF%EF%BC%8C%E8%B0%83%E7%94%A8postMessage%E6%96%B9%E6%B3%95%E5%B0%B1%E5%8F%AF%E4%BB%A5%E4%BA%86%E3%80%82"}),"http://aaa.com向子窗口http://bbb.com发消息，调用postMessage方法就可以了。")),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-js"}),"var popup = window.open('http://bbb.com', 'title');\npopup.postMessage('Hello World!', 'http://bbb.com');\n")),Object(a.b)("p",null,'postMessage方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即"协议 + 域名 + 端口"。也可以设为*，表示不限制域名，向所有窗口发送。'),Object(a.b)("p",null,"子窗口向父窗口发送消息的写法类似。"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-js"}),"window.opener.postMessage('Nice to see you', 'http://aaa.com');\n")),Object(a.b)("p",null,"父窗口和子窗口都可以通过message事件，监听对方的消息。"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-js"}),"window.addEventListener('message', function(e) {\n  console.log(e.data);\n},false);\n")),Object(a.b)("p",null,"message事件的事件对象event，提供以下三个属性："),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"event.source：发送消息的窗口"),Object(a.b)("li",{parentName:"ol"},"event.origin: 消息发向的网址"),Object(a.b)("li",{parentName:"ol"},"event.data: 消息内容")),Object(a.b)("p",null,"下面的例子是，子窗口通过event.source属性引用父窗口，然后发送消息。"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-js"}),"window.addEventListener('message', receiveMessage);\nfunction receiveMessage(event) {\n  event.source.postMessage('Nice to see you!', '*');\n}\n")),Object(a.b)("p",null,"event.origin属性可以过滤不是发给本窗口的消息。"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-js"}),"window.addEventListener('message', receiveMessage);\nfunction receiveMessage(event) {\n  if (event.origin !== 'http://aaa.com') return;\n  if (event.data === 'Hello World') {\n      event.source.postMessage('Hello', event.origin);\n  } else {\n    console.log(event.data);\n  }\n}\n")))}i.isMDXComponent=!0},249:function(e,n,t){"use strict";t.d(n,"a",(function(){return s})),t.d(n,"b",(function(){return b}));var a=t(0),r=t.n(a),o=r.a.createContext({}),c=function(e){var n=r.a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):Object.assign({},n,e)),t},s=function(e){var n=c(e.components);return r.a.createElement(o.Provider,{value:n},e.children)};var l="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},i=Object(a.forwardRef)((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,l=function(e,n){var t={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===n.indexOf(a)&&(t[a]=e[a]);return t}(e,["components","mdxType","originalType","parentName"]),i=c(t),b=a,u=i[s+"."+b]||i[b]||p[b]||o;return t?r.a.createElement(u,Object.assign({},{ref:n},l,{components:t})):r.a.createElement(u,Object.assign({},{ref:n},l))}));function b(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,c=new Array(o);c[0]=i;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s[l]="string"==typeof e?e:a,c[1]=s;for(var b=2;b<o;b++)c[b]=t[b];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,t)}i.displayName="MDXCreateElement"}}]);