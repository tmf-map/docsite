(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{114:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"rightToc",(function(){return p})),r.d(t,"default",(function(){return b}));r(0);var n=r(155);function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c={},p=[{value:"react-router",id:"react-router",children:[]},{value:"@reach/router",id:"reachrouter",children:[]}],i={rightToc:p},u="wrapper";function b(e){var t=e.components,r=o(e,["components"]);return Object(n.b)(u,a({},i,r,{components:t,mdxType:"MDXLayout"}),Object(n.b)("h1",{id:"5-路由管理"},"5. 路由管理"),Object(n.b)("h2",{id:"react-router"},"react-router"),Object(n.b)("p",null,'{% embed url="',Object(n.b)("a",a({parentName:"p"},{href:"http://reacttraining.cn/web/example/basic"}),"http://reacttraining.cn/web/example/basic"),'" %}'),Object(n.b)("p",null,"React Router被拆分成三个包：",Object(n.b)("inlineCode",{parentName:"p"},"react-router"),",",Object(n.b)("inlineCode",{parentName:"p"},"react-router-dom"),"和",Object(n.b)("inlineCode",{parentName:"p"},"react-router-native"),"。",Object(n.b)("inlineCode",{parentName:"p"},"react-router"),"提供核心的路由组件与函数。其余两个则提供运行环境（即浏览器与react-native）所需的特定组件。"),Object(n.b)("p",null,"进行网站（将会运行在浏览器环境中）构建，我们应当安装",Object(n.b)("inlineCode",{parentName:"p"},"react-router-dom"),"。",Object(n.b)("inlineCode",{parentName:"p"},"react-router-dom"),"暴露出",Object(n.b)("inlineCode",{parentName:"p"},"react-router"),"中暴露的对象与方法，它会自动安装 ",Object(n.b)("inlineCode",{parentName:"p"},"react-router")," ，因此你只需要安装并引用",Object(n.b)("inlineCode",{parentName:"p"},"react-router-dom"),"即可。"),Object(n.b)("h2",{id:"reachrouter"},"@reach/router"),Object(n.b)("blockquote",null,Object(n.b)("p",{parentName:"blockquote"},Object(n.b)("strong",{parentName:"p"},"推荐"),"：路由管理推荐使用 ",Object(n.b)("a",a({parentName:"p"},{href:"https://github.com/reach/router"}),"@reach/router"),"，功能简洁而强大，没有 react-router 的繁琐，详情请参考官方文档：",Object(n.b)("a",a({parentName:"p"},{href:"https://reach.tech/router"}),"https://reach.tech/router"))),Object(n.b)("blockquote",null,Object(n.b)("p",{parentName:"blockquote"},Object(n.b)("strong",{parentName:"p"},"Tips"),": 在 ",Object(n.b)("inlineCode",{parentName:"p"},"@reach/router")," 中，父路由组件有一个特殊的 props: ",Object(n.b)("strong",{parentName:"p"},Object(n.b)("inlineCode",{parentName:"strong"},"*"))," ，它作为一个特殊的 key，可以帮助父路由组件取到子路由组件的 path。")),Object(n.b)("p",null,"详细的 Rematch 介绍请参考该文章：",Object(n.b)("a",a({parentName:"p"},{href:"https://zhuanlan.zhihu.com/p/37718650"}),"Reach-Router “真香👍”"),"。"))}b.isMDXComponent=!0},155:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return l}));var n=r(0),a=r.n(n),o=a.a.createContext({}),c=function(e){var t=a.a.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):Object.assign({},t,e)),r},p=function(e){var t=c(e.components);return a.a.createElement(o.Provider,{value:t},e.children)};var i="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=Object(n.forwardRef)((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,i=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&-1===t.indexOf(n)&&(r[n]=e[n]);return r}(e,["components","mdxType","originalType","parentName"]),b=c(r),l=n,m=b[p+"."+l]||b[l]||u[l]||o;return r?a.a.createElement(m,Object.assign({},{ref:t},i,{components:r})):a.a.createElement(m,Object.assign({},{ref:t},i))}));function l(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,c=new Array(o);c[0]=b;var p={};for(var u in t)hasOwnProperty.call(t,u)&&(p[u]=t[u]);p.originalType=e,p[i]="string"==typeof e?e:n,c[1]=p;for(var l=2;l<o;l++)c[l]=r[l];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"}}]);