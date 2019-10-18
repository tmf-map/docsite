(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{202:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return m}));n(0);var r=n(390),o=n(391);function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s={id:"hoc",title:"HOC",sidebar_label:"HOC"},l=[],i={rightToc:l},p="wrapper";function m(e){var t=e.components,n=a(e,["components"]);return Object(r.b)(p,c({},i,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,Object(r.b)("a",c({parentName:"p"},{href:"https://www.reactjscn.com/docs/higher-order-components.html"}),"高阶组件"),"类似于函数式编程中的高阶函数，就是一个函数式组件接受一个组件作为参数，经过一系列加工后，最后返回一个新的组件。看下面的代码示例，withUser函数就是一个高阶组件，它返回了一个新的组件，这个组件具有了它提供的获取用户信息的功能。"),Object(r.b)("p",null,"高阶组件（HOC）是react中对组件逻辑进行重用的高级技术。但高阶组件本身并不是React API。它只是一种模式，这种模式是由react自身的组合性质必然产生的。"),Object(r.b)("pre",null,Object(r.b)("code",c({parentName:"pre"},{className:"language-jsx"}),'const withUser = WrappedComponent => {\n  const user = sessionStorage.getItem("user");\n  return props => <WrappedComponent user={user} {...props} />;\n};\n\nconst UserPage = props => (\n  <div class="user-container">\n    <p>My name is {props.user}!</p>\n  </div>\n);\n\nexport default withUser(UserPage);\n')),Object(r.b)("p",null,"对比组件将props属性转变成UI，高阶组件则是将一个组件转换成另一个新组件。高阶组件是通过将原组件 包裹（wrapping） 在容器组件（container component）里面的方式来 组合（composes） 使用原组件。高阶组件就是一个没有副作用的纯函数。高阶组件并不关心数据是如何以及为什么被使用。"),Object(r.b)(o.a,{type:"must",mdxType:"Hint"},"不要在高阶组件内部修改（或以其它方式修改）原组件的原型属性。"))}m.isMDXComponent=!0},391:function(e,t,n){"use strict";var r=n(0),o=n.n(r),c=n(393),a=n.n(c),s=(n(392),{better:{name:"推荐",color:"#50c610",icon:o.a.createElement("svg",{preserveAspectRatio:"xMidYMid meet",height:"1em",width:"1em",fill:"none",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",stroke:"currentColor",className:"custom-hint__icon",style:{color:"#50c610"}},o.a.createElement("g",null,o.a.createElement("path",{d:"M22 11.07V12a10 10 0 1 1-5.93-9.14"}),o.a.createElement("polyline",{points:"23 3 12 14 9 11"})))},must:{name:"强制",color:"#ff4642",icon:o.a.createElement("svg",{preserveAspectRatio:"xMidYMid meet",height:"1em",width:"1em",fill:"#ff4642",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024",stroke:"none",className:"custom-hint__icon"},o.a.createElement("g",null,o.a.createElement("path",{d:"M512 992c-262.4 0-480-217.6-480-480 0-262.4 217.6-480 480-480s480 217.6 480 480C992 774.4 774.4 992 512 992zM512 108.8C288 108.8 108.8 288 108.8 512c0 224 179.2 403.2 403.2 403.2s403.2-179.2 403.2-403.2C915.2 288 736 108.8 512 108.8zM697.6 684.8l-12.8 12.8c-6.4 6.4-19.2 6.4-25.6 0L512 550.4l-140.8 140.8c-6.4 6.4-19.2 6.4-25.6 0l-12.8-12.8c-6.4-6.4-6.4-19.2 0-25.6L473.6 512 326.4 371.2C320 358.4 320 345.6 326.4 339.2l12.8-12.8C345.6 320 358.4 320 371.2 326.4L512 473.6l140.8-140.8c6.4-6.4 19.2-6.4 25.6 0l12.8 12.8c6.4 6.4 6.4 19.2 0 25.6L550.4 512l140.8 140.8C704 665.6 704 678.4 697.6 684.8z"})))},tip:{name:"提示",color:"#3884ff",icon:o.a.createElement("svg",{preserveAspectRatio:"xMidYMid meet",height:"1em",width:"1em",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",stroke:"none",className:"custom-hint__icon",style:{color:"#3884ff"}},o.a.createElement("g",null,o.a.createElement("path",{d:"M12.2 8.98c.06-.01.12-.03.18-.06.06-.02.12-.05.18-.09l.15-.12c.18-.19.29-.45.29-.71 0-.06-.01-.13-.02-.19a.603.603 0 0 0-.06-.19.757.757 0 0 0-.09-.18c-.03-.05-.08-.1-.12-.15-.28-.27-.72-.37-1.09-.21-.13.05-.23.12-.33.21-.04.05-.09.1-.12.15-.04.06-.07.12-.09.18-.03.06-.05.12-.06.19-.01.06-.02.13-.02.19 0 .26.11.52.29.71.1.09.2.16.33.21.12.05.25.08.38.08.06 0 .13-.01.2-.02M13 16v-4a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0M12 3c-4.962 0-9 4.038-9 9 0 4.963 4.038 9 9 9 4.963 0 9-4.037 9-9 0-4.962-4.037-9-9-9m0 20C5.935 23 1 18.065 1 12S5.935 1 12 1c6.066 0 11 4.935 11 11s-4.934 11-11 11",fillRule:"evenodd"})))},warning:{name:"注意",color:"#fdbe12",icon:o.a.createElement("svg",{preserveAspectRatio:"xMidYMid meet",height:"1em",width:"1em",fill:"none",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",stroke:"currentColor",className:"custom-hint__icon",style:{color:"#fdbe12"}},o.a.createElement("g",null,o.a.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.a.createElement("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),o.a.createElement("line",{x1:"12",y1:"16",x2:"12",y2:"16"})))}});t.a=function(e){var t=e.type,n=e.children;return o.a.createElement("div",{className:"custom-hint",style:{borderLeft:"4px solid ".concat(s[t].color)}},o.a.createElement("div",{style:{float:"left"}},s[t].icon),o.a.createElement("div",{dangerouslySetInnerHTML:{__html:a()("<strong>".concat(s[t].name,"</strong>：").concat(n))}}))}},392:function(e,t,n){}}]);