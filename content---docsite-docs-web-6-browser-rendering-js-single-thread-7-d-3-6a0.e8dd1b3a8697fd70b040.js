(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{218:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return l}));n(0);var r=n(249);function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c={id:"js-single-thread",title:"单线程js",sidebar_label:"单线程js"},p=[],i={rightToc:p},u="wrapper";function l(e){var t=e.components,n=o(e,["components"]);return Object(r.b)(u,a({},i,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"JS代码在一个线程中执行，即主线程，这意味着一次只能执行一行JS代码。需要注意的是，这一个线程还负责文档的生命周期，比如：layout 和 paint。因此，JS代码运行的时候将会阻碍其他工作：\n",Object(r.b)("img",a({parentName:"p"},{src:"https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/CHWd5i.png",alt:null})),"\n如果HTML解析器碰到",Object(r.b)("inlineCode",{parentName:"p"},"<script>"),"标签，会暂停解析HTML文档并加载、解析和执行JS代码。因为JS有可能通过document.write()修改文档，进而改变DOM结构（HTML标准的“解析模型”有一张图可以一目了然：",Object(r.b)("a",a({parentName:"p"},{href:"http://t.cn/Ai9cupLc"}),"http://t.cn/Ai9cupLc")," ）：\n",Object(r.b)("img",a({parentName:"p"},{src:"https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/3PxN7P.png",alt:null}))),Object(r.b)("p",null,"所以HTML解析器必须停下来执行JavaScript，然后再恢复解析HTML。至于执行JavaScript的细节，大家可以关注V8团队相关的分享：",Object(r.b)("a",a({parentName:"p"},{href:"http://t.cn/RB9qP51"}),"http://t.cn/RB9qP51")," 。"))}l.isMDXComponent=!0},249:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return s}));var r=n(0),a=n.n(r),o=a.a.createContext({}),c=function(e){var t=a.a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},p=function(e){var t=c(e.components);return a.a.createElement(o.Provider,{value:t},e.children)};var i="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},l=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,i=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}(e,["components","mdxType","originalType","parentName"]),l=c(n),s=r,f=l[p+"."+s]||l[s]||u[s]||o;return n?a.a.createElement(f,Object.assign({},{ref:t},i,{components:n})):a.a.createElement(f,Object.assign({},{ref:t},i))}));function s(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=l;var p={};for(var u in t)hasOwnProperty.call(t,u)&&(p[u]=t[u]);p.originalType=e,p[i]="string"==typeof e?e:r,c[1]=p;for(var s=2;s<o;s++)c[s]=n[s];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}l.displayName="MDXCreateElement"}}]);