(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{155:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return s}));var r=n(0),o=n.n(r),a=o.a.createContext({}),i=function(e){var t=o.a.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},u=function(e){var t=i(e.components);return o.a.createElement(a.Provider,{value:t},e.children)};var c="mdxType",l={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},p=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,u=e.parentName,c=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}(e,["components","mdxType","originalType","parentName"]),p=i(n),s=r,f=p[u+"."+s]||p[s]||l[s]||a;return n?o.a.createElement(f,Object.assign({},{ref:t},c,{components:n})):o.a.createElement(f,Object.assign({},{ref:t},c))}));function s(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=p;var u={};for(var l in t)hasOwnProperty.call(t,l)&&(u[l]=t[l]);u.originalType=e,u[c]="string"==typeof e?e:r,i[1]=u;for(var s=2;s<a;s++)i[s]=n[s];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},40:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"rightToc",(function(){return u})),n.d(t,"default",(function(){return p}));n(0);var r=n(155);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i={id:"hello-world",title:"Hello",author:"Endilie Yacop Sucipto",authorTitle:"Maintainer of Docusaurus",authorURL:"https://github.com/endiliey",authorImageURL:"https://avatars1.githubusercontent.com/u/17883920?s=460&v=4",authorTwitter:"endiliey",tags:["hello","docusaurus"]},u=[],c={rightToc:u},l="wrapper";function p(e){var t=e.components,n=a(e,["components"]);return Object(r.b)(l,o({},c,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Welcome to this blog. This blog is created with ",Object(r.b)("a",o({parentName:"p"},{href:"https://v2.docusaurus.io/"}),Object(r.b)("strong",{parentName:"a"},"Docusaurus 2 alpha")),"."),Object(r.b)("p",null,"This is a test post."),Object(r.b)("p",null,"A whole bunch of other information."))}p.isMDXComponent=!0}}]);