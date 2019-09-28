(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{194:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"rightToc",(function(){return i})),t.d(n,"default",(function(){return u}));t(0);var r=t(249);function a(){return(a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c={id:"delay-loading",title:"延时加载资源",sidebar_label:"延时加载资源"},i=[],l={rightToc:i},p="wrapper";function u(e){var n=e.components,t=o(e,["components"]);return Object(r.b)(p,a({},l,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("p",null,"对于一些占用带宽的资源比如图片，使用延时加载首屏外资源，而不是加载所有资源。延迟加载图像和视频时，可以减少初始页面加载时间、初始页面负载以及系统资源使用量，所有这一切都会对性能产生积极影响。"),Object(r.b)("p",null,"对于图片延时加载的手段是不像",Object(r.b)("inlineCode",{parentName:"p"},"<img>"),"的src中添加要加载图片的地址，当视窗到达该图片位置时，js为src属性动态赋值。",Object(r.b)("a",a({parentName:"p"},{href:"https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/?hl=zh-cn"}),"参考链接")),Object(r.b)("p",null,"对于列表类等也是同样道理，除了滚动加载外，同时也可以使用点击某个按钮，触发事件实现加载。"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"为什么使用延时加载？")),Object(r.b)("p",null,"直接加载可能会加载用户永远不会查看的内容，这样不仅浪费网络带宽，而且会因为浏览器要解析过多的内容而浪费系统资源。"))}u.isMDXComponent=!0},249:function(e,n,t){"use strict";t.d(n,"a",(function(){return i})),t.d(n,"b",(function(){return f}));var r=t(0),a=t.n(r),o=a.a.createContext({}),c=function(e){var n=a.a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):Object.assign({},n,e)),t},i=function(e){var n=c(e.components);return a.a.createElement(o.Provider,{value:n},e.children)};var l="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},u=Object(r.forwardRef)((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,l=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===n.indexOf(r)&&(t[r]=e[r]);return t}(e,["components","mdxType","originalType","parentName"]),u=c(t),f=r,s=u[i+"."+f]||u[f]||p[f]||o;return t?a.a.createElement(s,Object.assign({},{ref:n},l,{components:t})):a.a.createElement(s,Object.assign({},{ref:n},l))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,c=new Array(o);c[0]=u;var i={};for(var p in n)hasOwnProperty.call(n,p)&&(i[p]=n[p]);i.originalType=e,i[l]="string"==typeof e?e:r,c[1]=i;for(var f=2;f<o;f++)c[f]=t[f];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,t)}u.displayName="MDXCreateElement"}}]);