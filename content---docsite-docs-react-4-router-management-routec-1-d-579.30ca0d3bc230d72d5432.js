(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{126:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return b}));n(0);var a=n(155);function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l={id:"route",title:"Route",sidebar_label:"Route"},p=[{value:"路径(Path)",id:"路径path",children:[]},{value:"匹配路径",id:"匹配路径",children:[]},{value:"创建路由",id:"创建路由",children:[]},{value:"<Route>是如何渲染的？",id:"route是如何渲染的？",children:[]},{value:"<Main>",id:"main",children:[]},{value:"嵌套路由",id:"嵌套路由",children:[]},{value:"路径参数",id:"路径参数",children:[]}],o={rightToc:p},i="wrapper";function b(e){var t=e.components,n=c(e,["components"]);return Object(a.b)(i,r({},o,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"<","Route",">"," 组件是 react-router 中主要的结构单元。在任意位置只要匹配了URL的路径名 ","(","pathname",")"," 你就可以创建 ","<","Route",">"," 元素进行渲染。"),Object(a.b)("h2",{id:"路径path"},"路径","(","Path",")"),Object(a.b)("p",null,"<","Route",">"," 接受一个数为 string 类型的 ",Object(a.b)("inlineCode",{parentName:"p"},"path"),"。在当前 path 参数与当前 location 的路径相匹配时，路由就会开始渲染 React 组件。若不匹配，路由不会进行任何操作。"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-jsx"}),"// 当路径名为'/'时, path不匹配\n// 当路径名为'/article'或'/article/2'时, path匹配\n<Route path='/article' />\n\n// 当你只想匹配'/article'时，你需要使用\"exact\"参数\n// 则路由仅匹配'/article'而不会匹配'/article/2'\n<Route exact path='/article' />\n")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},Object(a.b)("strong",{parentName:"p"},"注意"),"：在匹配路由时，react-router 只关注 location 的",Object(a.b)("strong",{parentName:"p"},"路径名"),"。")),Object(a.b)("p",null,"例如当 URL 如下时："),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-text"}),"http://www.example.com/my-projects/one?extra=false\n")),Object(a.b)("p",null,"react-router 去匹配的只是 '/my-projects/one' 这一部分。"),Object(a.b)("h2",{id:"匹配路径"},"匹配路径"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"path-to-regexp"),"包用来决定 route 元素的 path 参数与当前 location 是否匹配。它将路径字符串编译成正则表达式，并与当前 location 的路径名进行匹配比较。除了上面的例子外，路径字符串有更多高级的选项，详见 path-to-regexp 文档。",Object(a.b)("br",{parentName:"p"}),"\n","当路由地址匹配成功后，会创建一个含有以下属性的 ",Object(a.b)("inlineCode",{parentName:"p"},"match")," ","_","_","对象："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"url ：与当前 location 路径名所匹配部分"),Object(a.b)("li",{parentName:"ul"},"path ：路由的地址"),Object(a.b)("li",{parentName:"ul"},"isExact ：path 是否等于 pathname"),Object(a.b)("li",{parentName:"ul"},"params ：从 path-to-regexp 获取的路径中取出的值都被包含在这个对象中")),Object(a.b)("p",null,"使用 ",Object(a.b)("a",r({parentName:"p"},{href:"https://pshrmn.github.io/route-tester/#/"}),"route tester")," 这款工具来对路由与URL进行检验。"),Object(a.b)("h2",{id:"创建路由"},"创建路由"),Object(a.b)("p",null,"可以在 ","<","Router",">"," 中的任意位置创建多个 ","<","Route",">","，但通常我们会把它们放在同一个位置。使用 ","<","Switch",">"," 组件来包裹一组 ","<","Route",">","。","<","Switch",">"," 会遍历自身的子元素（即 ","<","Route",">","）并对第一个匹配当前路径的元素进行渲染。"),Object(a.b)("p",null,"例如我们希望匹配以下路径："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"/ ： 主页"),Object(a.b)("li",{parentName:"ul"},"/article ： 文章列表"),Object(a.b)("li",{parentName:"ul"},"/article/:id ：文章详情页")),Object(a.b)("p",null,"为了在应用中能匹配路径，在创建","<","Route",">","元素时必须带有需要匹配的path作为参数。"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-jsx"}),"<Switch>\n  <Route exact path='/' component={Home}/>\n  {/* both /article and /article/:id begin with /user */}\n  <Route path='/article' component={rticle}/>\n</Switch>\n")),Object(a.b)("h2",{id:"route是如何渲染的？"},"<","Route",">","是如何渲染的？"),Object(a.b)("p",null,"当一个路由的path匹配成功后，路由用来确定渲染结果的参数有三种。只需要提供其中一个即可。"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"component")," ： 一个 React 组件。当带有 component 参数的 ","<","Route",">"," 匹配成功后，","<","Route",">"," 会返回一个新的元素，其为 component 参数所对应的 React 组件。"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"render")," ： 一个返回 React element 的函数。当匹配成功后调用该函数，该过程与传入 component 参数类似，并且对于",Object(a.b)("strong",{parentName:"li"},"行级渲染与需要向元素传入额外参数"),"的操作会更有用。"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"children")," ： 一个返回 React element 的函数。与上述两个参数不同，无论route是否匹配当前location，其都会被渲染。")),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-jsx"}),"<Route path='/page' component={Page} />\nconst extraProps = { color: 'red' }\n<Route path='/page' render={(props) => (\n  <Page {...props} data={extraProps}/>\n)}/>\n<Route path='/page' children={(props) => (\n  props.match\n    ? <Page {...props}/>\n    : <EmptyPage {...props}/>\n)}/>\n")),Object(a.b)("p",null,"常用的是",Object(a.b)("inlineCode",{parentName:"p"},"component"),"参数与",Object(a.b)("inlineCode",{parentName:"p"},"render"),"参数。",Object(a.b)("inlineCode",{parentName:"p"},"children"),"参数偶尔会被使用，它更常用在 path 无法匹配时呈现的 '空' 状态。在本例中并不会有额外的状态，所以我们将使用 ","<","Route",">"," 的 component 参数。"),Object(a.b)("p",null,"通过 ","<","Route",">"," 渲染的元素会被传入一些参数，分别是："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"match 对象"),Object(a.b)("li",{parentName:"ul"},"当前 location 对象"),Object(a.b)("li",{parentName:"ul"},"history 对象（由 ","<","Router",">"," 创建）")),Object(a.b)("h2",{id:"main"},"<","Main",">"),Object(a.b)("p",null,"现在我们清楚了根路由的结构，我们需要实际渲染我们的路由。对于这个应用，我们将会在 ","<","Main",">","组件 中渲染 ","<","Switch",">"," 与 ","<","Route",">","，这一过程会将 ","<","Route",">"," 匹配生成的 HTML 放在 ","<","main",">"," 节点中。"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-jsx"}),"import { Switch, Route } from 'react-router-dom'\nconst Main = () => (\n  <main>\n    <Switch>\n      <Route exact path='/' component={Home}/>\n      <Route path='/article' component={Article}/>\n    </Switch>\n  </main>\n)\n")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},Object(a.b)("strong",{parentName:"p"},"提示"),"：可以用 exact 参数用来保证路由能准确匹配path。")),Object(a.b)("h2",{id:"嵌套路由"},"嵌套路由"),Object(a.b)("p",null,"文章详情页路由",Object(a.b)("inlineCode",{parentName:"p"},"/article/:id"),"并未包含在上述 ","<","Switch",">"," 中。它由 ","<","Article",">"," 组件负责在路径包含 '/article' 的情形下进行渲染。"),Object(a.b)("p",null,"在","<","Article",">","组件中，我们将为两种路径进行渲染："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"/article ：对应路径名仅仅是/article时，因此需要在 exact 元素上添加 exact 参数。"),Object(a.b)("li",{parentName:"ul"},"/article/:id ： 该路由使用一个路由参数来获取 /article 后的路径名。")),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-jsx"}),"const Article = () => (\n  <Switch>\n    <Route exact path='/article' component={ArticleList}/>\n    <Route path='/article/:id' component={ArticleDetail}/>\n  </Switch>\n)\n")),Object(a.b)("p",null,"组合在相同组件中分享共同前缀的路由是一种有用的方法。这就需要简化父路由并且提供一个区域来渲染具有相同前缀的通用路由。"),Object(a.b)("p",null,"例如，","<","Article",">"," 用来渲染所有以",Object(a.b)("inlineCode",{parentName:"p"},"/article"),"开始的全部路由。"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-jsx"}),"const Article = () => (\n  <div>\n    <h2>This is a article page!</h2>\n    <nav>\n      <span>ArticleList</span>\n      <span>ArticleList</span>\n    </nav>\n    <Switch>\n      <Route exact path='/article' component={ArticleList}/>\n      <Route path='/article/:id' component={ArticleDetail}/>\n    </Switch>\n  </div>\n)\n")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},Object(a.b)("strong",{parentName:"p"},"注意"),"：Switch 里面直接要嵌套 Route，否则在路由跳转的时候会出现一些意想不到的情况。")),Object(a.b)("h2",{id:"路径参数"},"路径参数"),Object(a.b)("p",null,"有时路径名中存在我们需要获取的参数。例如，我们需要获取文章的id。我们可以向 ","<","Route",">"," 中添加 path 参数。"),Object(a.b)("p",null,"如 '/article/:id' 中",Object(a.b)("inlineCode",{parentName:"p"},":id"),"这种写法意味着 /article/ 后的路径名将会被获取并存在",Object(a.b)("inlineCode",{parentName:"p"},"match.params.id"),"中。例如，路径名'/article/6'会获取到一个对象："),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-jsx"}),"{ id: '6' } // 获取的值是字符串类型\n")),Object(a.b)("p",null,"<","ArticleDetail",">"," 组件可以使用 props.match.params 对象来确定需要被渲染的文章的数据。"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-jsx"}),"import ArticleAPI from './ArticleAPI'\nconst Player = (props) => {\n  const article = ArticleAPI.get(\n    parseInt(props.match.params.id, 6)\n  )\n  if (!article) {\n    return <div>Sorry, but the article was not found</div>\n  }\n  return (\n    <div>\n      <h1>{article.name} (#{article.id})</h1>\n      <h2>{article.content}</h2>\n    </div>\n)\n")),Object(a.b)("p",null,"你可以通过阅读 ",Object(a.b)("a",r({parentName:"p"},{href:"https://github.com/pillarjs/path-to-regexp#parameters"}),"path-to-regexp文档")," 来了解更多。"))}b.isMDXComponent=!0},155:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return u}));var a=n(0),r=n.n(a),c=r.a.createContext({}),l=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},p=function(e){var t=l(e.components);return r.a.createElement(c.Provider,{value:t},e.children)};var o="mdxType",i={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,c=e.originalType,p=e.parentName,o=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===t.indexOf(a)&&(n[a]=e[a]);return n}(e,["components","mdxType","originalType","parentName"]),b=l(n),u=a,m=b[p+"."+u]||b[u]||i[u]||c;return n?r.a.createElement(m,Object.assign({},{ref:t},o,{components:n})):r.a.createElement(m,Object.assign({},{ref:t},o))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=n.length,l=new Array(c);l[0]=b;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p[o]="string"==typeof e?e:a,l[1]=p;for(var u=2;u<c;u++)l[u]=n[u];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);