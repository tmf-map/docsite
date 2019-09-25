(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{132:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return p}));n(0);var r=n(155);function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c={id:"redux",title:"Redux",sidebar_label:"Redux"},i=[{value:"Redux 三大理念",id:"redux-三大理念",children:[]}],u={rightToc:i},l="wrapper";function p(e){var t=e.components,n=o(e,["components"]);return Object(r.b)(l,a({},u,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"redux-三大理念"},"Redux 三大理念"),Object(r.b)("p",null,"Redux是有自己的",Object(r.b)("strong",{parentName:"p"},"三大理念的（Three Principles）"),"，所以我们的最佳实践都是基于这三个理念："),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},Object(r.b)("strong",{parentName:"li"},"Single source of truth"),"：应用程序的所有 state 应该被保存在单个 store 中。"),Object(r.b)("li",{parentName:"ol"},Object(r.b)("strong",{parentName:"li"},"State is read-only"),": state 不能被直接修改，只能通过触发 action 来修改。 "),Object(r.b)("li",{parentName:"ol"},Object(r.b)("strong",{parentName:"li"},"Changes are made with pure functions"),": 使用",Object(r.b)("strong",{parentName:"li"},"纯函数式"),"的 reducer 来处理数据修改逻辑。纯函数意味着没有 side effect，也就是处理逻辑不能依赖于全局变量，只能依赖于传入的参数；不能修改传入的参数，返回的应该是一个全新的对象。")))}p.isMDXComponent=!0},155:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return s}));var r=n(0),a=n.n(r),o=a.a.createContext({}),c=function(e){var t=a.a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},i=function(e){var t=c(e.components);return a.a.createElement(o.Provider,{value:t},e.children)};var u="mdxType",l={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},p=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,u=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}(e,["components","mdxType","originalType","parentName"]),p=c(n),s=r,f=p[i+"."+s]||p[s]||l[s]||o;return n?a.a.createElement(f,Object.assign({},{ref:t},u,{components:n})):a.a.createElement(f,Object.assign({},{ref:t},u))}));function s(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=p;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:r,c[1]=i;for(var s=2;s<o;s++)c[s]=n[s];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);