(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{104:function(e,n,r){"use strict";r.r(n),r.d(n,"frontMatter",(function(){return c})),r.d(n,"rightToc",(function(){return p})),r.d(n,"default",(function(){return u}));r(0);var t=r(249);function o(){return(o=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e}).apply(this,arguments)}function a(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c={id:"hoc",title:"HOC",sidebar_label:"HOC"},p=[],s={rightToc:p},i="wrapper";function u(e){var n=e.components,r=a(e,["components"]);return Object(t.b)(i,o({},s,r,{components:n,mdxType:"MDXLayout"}),Object(t.b)("p",null,Object(t.b)("a",o({parentName:"p"},{href:"https://www.reactjscn.com/docs/higher-order-components.html"}),"高阶组件"),"类似于函数式编程中的高阶函数，就是一个函数式组件接受一个组件作为参数，经过一系列加工后，最后返回一个新的组件。看下面的代码示例，withUser函数就是一个高阶组件，它返回了一个新的组件，这个组件具有了它提供的获取用户信息的功能。"),Object(t.b)("p",null,"高阶组件（HOC）是react中对组件逻辑进行重用的高级技术。但高阶组件本身并不是React API。它只是一种模式，这种模式是由react自身的组合性质必然产生的。"),Object(t.b)("pre",null,Object(t.b)("code",o({parentName:"pre"},{className:"language-jsx"}),'const withUser = WrappedComponent => {\n  const user = sessionStorage.getItem("user");\n  return props => <WrappedComponent user={user} {...props} />;\n};\n\nconst UserPage = props => (\n  <div class="user-container">\n    <p>My name is {props.user}!</p>\n  </div>\n);\n\nexport default withUser(UserPage);\n')),Object(t.b)("p",null,"对比组件将props属性转变成UI，高阶组件则是将一个组件转换成另一个新组件。高阶组件是通过将原组件 包裹（wrapping） 在容器组件（container component）里面的方式来 组合（composes） 使用原组件。高阶组件就是一个没有副作用的纯函数。高阶组件并不关心数据是如何以及为什么被使用。"),Object(t.b)("blockquote",null,Object(t.b)("p",{parentName:"blockquote"},Object(t.b)("strong",{parentName:"p"},"强制"),"：不要在高阶组件内部修改（或以其它方式修改）原组件的原型属性。")))}u.isMDXComponent=!0},249:function(e,n,r){"use strict";r.d(n,"a",(function(){return p})),r.d(n,"b",(function(){return l}));var t=r(0),o=r.n(t),a=o.a.createContext({}),c=function(e){var n=o.a.useContext(a),r=n;return e&&(r="function"==typeof e?e(n):Object.assign({},n,e)),r},p=function(e){var n=c(e.components);return o.a.createElement(a.Provider,{value:n},e.children)};var s="mdxType",i={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},u=Object(t.forwardRef)((function(e,n){var r=e.components,t=e.mdxType,a=e.originalType,p=e.parentName,s=function(e,n){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&-1===n.indexOf(t)&&(r[t]=e[t]);return r}(e,["components","mdxType","originalType","parentName"]),u=c(r),l=t,f=u[p+"."+l]||u[l]||i[l]||a;return r?o.a.createElement(f,Object.assign({},{ref:n},s,{components:r})):o.a.createElement(f,Object.assign({},{ref:n},s))}));function l(e,n){var r=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var a=r.length,c=new Array(a);c[0]=u;var p={};for(var i in n)hasOwnProperty.call(n,i)&&(p[i]=n[i]);p.originalType=e,p[s]="string"==typeof e?e:t,c[1]=p;for(var l=2;l<a;l++)c[l]=r[l];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,r)}u.displayName="MDXCreateElement"}}]);