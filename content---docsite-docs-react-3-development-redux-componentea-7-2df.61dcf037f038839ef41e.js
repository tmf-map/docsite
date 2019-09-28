(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{116:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return p})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return s}));n(0);var r=n(249);function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p={id:"redux-component",title:"Redux组件",sidebar_label:"Redux组件"},c=[{value:"contianer 组件",id:"contianer-组件",children:[]},{value:"presentational 组件",id:"presentational-组件",children:[]}],b={rightToc:c},l="wrapper";function s(e){var t=e.components,n=o(e,["components"]);return Object(r.b)(l,a({},b,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Redux 的一个重要思想是将组件主要分为 ",Object(r.b)("strong",{parentName:"p"},"container（容器型） 组件"),"和 ",Object(r.b)("strong",{parentName:"p"},"presentational（展示型） 组件"),"。"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"container 主要是为 presentational 组件提供一个 ",Object(r.b)("strong",{parentName:"li"},"数据容器"),"，这里的数据包括属性和方法（需要 dispatch 的方法，和不需要 dispatch 的方法）。"),Object(r.b)("li",{parentName:"ul"},"presentational 组件仅仅作为拿到数据（血液）后的展示作用，上承接 contianer 传过来的数据，下接ui 组件。")),Object(r.b)("p",null,Object(r.b)("img",a({parentName:"p"},{src:"https://raw.githubusercontent.com/ThinkBucket/oss/master/qqPz4e.jpg",alt:"Redux 组件与 Store 的关系"}))),Object(r.b)("p",null,"一个完整 React App 的组件树，根节点即 mountNode，叶子节点应该是 presentational 组件或 ui 组件，中间的节点是 container 组件，主要用与传递和监听数据，作为一个数据的中间容器。"),Object(r.b)("p",null,Object(r.b)("img",a({parentName:"p"},{src:"https://raw.githubusercontent.com/ThinkBucket/oss/master/pasted-image-0.png",alt:"Redux 组件树"}))),Object(r.b)("h2",{id:"contianer-组件"},"contianer 组件"),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-javascript"}),"connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])(Component)\n")),Object(r.b)("p",null,"connect: 一个柯里化函数，函数将被调用两次。"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"第一次是设置参数，第一次调用的时候4个参数都是可选。"),Object(r.b)("li",{parentName:"ol"},"第二次是组件与 Redux store 连接。")),Object(r.b)("p",null,"connect 函数不会修改传入的 React 组件，返回的是一个新的已与 Redux store 连接的组件。"),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"推荐"),"：mapStateToProps 和 mapDispatchToProps 里面的对象保持扁平化，不要发生嵌套。")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"推荐"),"：connect 的参数名字可以自定义，但推荐使用默认的参数名字。")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"mapStateToProps","(","state, ownProps?",")",": stateProps")," 在 store 发生改变的时候才会调用，然后把返回的结果作为组件的 props。")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"Tips："),"该函数 return 的对象里面的值有变化才会引起其所对应的 Component 的更新。")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"Tips"),"：mapStateToProps 可以不传，如果不传，组件不会监听 store 的变化，也就是说 store 的更新不会引起 Component 的更新。")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"mapDispatchToProps","(","dispatch, ownProps?",")",": dispatchProps")," 里面主要是事件绑定的方法，方法里面可以通过 ",Object(r.b)("inlineCode",{parentName:"li"},"dispatch")," 调用 ",Object(r.b)("inlineCode",{parentName:"li"},"action")," 。"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"mergeProps","(","stateProps, dispatchProps, ownProps",")",": props")," 用来指定这三个 props 的合并规则，合并的结果作为组件的 props。如果要指定这个函数，建议不要太复杂。")),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-jsx"}),"const mapStateToProps = state => ({\n  page: selector.getPage(state)\n});\nconst mapDispatchToProps = dispatch => ({\n  deleteDiscount(page, lineId) {\n    dispatch(asyncAction.deleteDiscount(page, lineId));\n  }\n});\nconst mergeProps = (stateProps, dispatchProps, ownProps) => {\n  return Object.assign({}, ownProps, stateProps, dispatchProps, {\n    deleteDiscount: dispatchProps.deleteDiscount.bind(null, stateProps.page)\n  });\n};\nexport default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Table);\n")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"强制"),"：使用 ES2015 的 ",Object(r.b)("strong",{parentName:"p"},"Object.assign")," 方法来做 props 的合并，第一个参数传空对象。")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"options: object")," 里面主要关注 pure。"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("em",{parentName:"li"},"[","pure = true","]"," ","(","Boolean",")"),": 如果为 true，connector 将执行 shouldComponentUpdate 并且浅对比 mergeProps 的结果，避免不必要的更新，前提是当前组件是一个“",Object(r.b)("strong",{parentName:"li"},"纯"),"”组件，它不依赖于任何的输入或 state 而只依赖于 props 和 Redux store 的 state。",Object(r.b)("strong",{parentName:"li"},"默认值为 true"),"。"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("em",{parentName:"li"},"[","withRef = false","]"," ","(","Boolean",")"),": 如果为 true，connector 会保存一个对被被包含的组件实例的引用，该引用通过 ",Object(r.b)("inlineCode",{parentName:"li"},"getWrappedInstance()")," 方法获得。",Object(r.b)("strong",{parentName:"li"},"默认值为 false"),"。"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Component")," 就是要被连接的 React 组件。")),Object(r.b)("h2",{id:"presentational-组件"},"presentational 组件"),Object(r.b)("p",null,"presentational 组件理论上可以全部为函数式组件，状态的监听和控制基本上由 Redux 控制即可。"),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"推荐"),"：presentational 组件可以嵌套粒度更小的函数式组件，避免该 presentational 组件 v-dom 过大。")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"强制"),"：更小粒度的函数式组件的命名以类似 renderComponent 这样方式命名。")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"强制"),"：更小粒度的函数式组件的 props 参数前面要加下划线，即 ","_","props 。否则会需要冗余的 PropType 验证。")))}s.isMDXComponent=!0},249:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return i}));var r=n(0),a=n.n(r),o=a.a.createContext({}),p=function(e){var t=a.a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},c=function(e){var t=p(e.components);return a.a.createElement(o.Provider,{value:t},e.children)};var b="mdxType",l={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},s=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,b=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}(e,["components","mdxType","originalType","parentName"]),s=p(n),i=r,u=s[c+"."+i]||s[i]||l[i]||o;return n?a.a.createElement(u,Object.assign({},{ref:t},b,{components:n})):a.a.createElement(u,Object.assign({},{ref:t},b))}));function i(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,p=new Array(o);p[0]=s;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[b]="string"==typeof e?e:r,p[1]=c;for(var i=2;i<o;i++)p[i]=n[i];return a.a.createElement.apply(null,p)}return a.a.createElement.apply(null,n)}s.displayName="MDXCreateElement"}}]);