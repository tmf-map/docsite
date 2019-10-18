(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{122:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return b})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return p}));n(0);var a=n(390);function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var b={title:"内存检测",sidebar_label:"内存检测"},c=[{value:"对象大小",id:"对象大小",children:[{value:"Shallow Size",id:"shallow-size",children:[]},{value:"Retained Size",id:"retained-size",children:[]}]},{value:"Retainers",id:"retainers",children:[]},{value:"支配项",id:"支配项",children:[]}],o={rightToc:c},i="wrapper";function p(e){var t=e.components,n=l(e,["components"]);return Object(a.b)(i,r({},o,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"对象大小"},"对象大小"),Object(a.b)("p",null,"将内存视为具有原始类型（如数字和字符串）和对象（引用类型）的图。形象一点，可以将内存表示为一个由多个互连的节点组成的图，如下所示："),Object(a.b)("div",{align:"center"},Object(a.b)("img",{width:"350",src:"https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Z3bLkf.jpg"}),Object(a.b)("p",null,"图中数字只是节点编号，并不是实际的值")),Object(a.b)("p",null,"对象可通过以下两种方式占用内存："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"直接通过对象自身占用。"),Object(a.b)("li",{parentName:"ul"},"通过保持对其他对象的引用隐式占用，这种方式可以阻止这些对象自动被垃圾回收器（简称 GC）回收。")),Object(a.b)("p",null,"使用 DevTools 中的 ",Object(a.b)("inlineCode",{parentName:"p"},"Memory")," 分析器时，将会看到多个信息列。",Object(a.b)("inlineCode",{parentName:"p"},"Shallow Size")," 和 ",Object(a.b)("inlineCode",{parentName:"p"},"Retained Size")," 这两个列（均以字节",Object(a.b)("inlineCode",{parentName:"p"},"Byte"),"为单位）表示什么呢？"),Object(a.b)("img",{src:"https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/0ZbdLb.png"}),Object(a.b)("h3",{id:"shallow-size"},"Shallow Size"),Object(a.b)("p",null,"这是对象自身占用内存的大小。"),Object(a.b)("p",null,"典型的 JavaScript 对象会将一些内存用于自身的说明和保存中间值。通常，只有数组和字符串会有明显的 ",Object(a.b)("inlineCode",{parentName:"p"},"Shallow Size")," 。不过，字符串和外部数组的主存储一般位于渲染器内存中，仅将一个小包装对象置于 JavaScript 堆上。"),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"渲染器内存是渲染检查页面的进程的内存总和：原生内存 + 页面的 JS 堆内存 + 页面启动的所有专用工作线程的 JS 堆内存。")),Object(a.b)("p",null,"尽管如此，即使一个小对象也可能通过阻止其他对象被自动垃圾回收进程处理的方式间接地占用大量内存。"),Object(a.b)("h3",{id:"retained-size"},"Retained Size"),Object(a.b)("p",null,"这是将对象本身连同其无法从 ",Object(a.b)("strong",{parentName:"p"},"GC 根"),"到达的相关对象一起删除后释放的内存大小。"),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"GC 根"),"由 ",Object(a.b)("strong",{parentName:"p"},"handles")," (官方翻译成“句柄”，这里使用原始英文术语) 组成，这些 handles 在从原生代码引用 V8 外部的 JavaScript 对象时创建（本地或全局）。所有这些 handles 都可以在 ",Object(a.b)("strong",{parentName:"p"},"GC roots > Handle scope")," 和 ",Object(a.b)("strong",{parentName:"p"},"GC roots > Global handles")," 下的 ",Object(a.b)("inlineCode",{parentName:"p"},"Heap snapshot")," 内找到。"),Object(a.b)("p",null,"存在很多内部 ",Object(a.b)("strong",{parentName:"p"},"GC 根"),"，其中的大部分都不需要用户关注。从应用角度来看主要关注以下类型的根："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"Window 全局对象"),"（位于每个 iframe 中）。",Object(a.b)("inlineCode",{parentName:"li"},"Heap snapshot"),"中有一个距离字段，表示从 window 出发的最短保留路径上的属性引用数量。"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"文档 DOM 树"),"，由可以通过遍历文档到达的所有原生 DOM 节点组成。并不是所有的节点都有 JS 包装器，不过，如果有包装器(JS wrappers)，并且文档处于活动状态，包装器也将处于活动状态。")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"内存图",Object(a.b)("strong",{parentName:"p"},"从根开始"),"，根可以是浏览器的 ",Object(a.b)("inlineCode",{parentName:"p"},"window")," 对象或 Node.js 模块的 ",Object(a.b)("inlineCode",{parentName:"p"},"global")," 对象。你无法控制此根对象的垃圾回收方式。")),Object(a.b)("div",{align:"center"},Object(a.b)("img",{width:"420",src:"https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/enmBSs.jpg"})),Object(a.b)("p",null,"任何无法从根到达的对象都会被 GC 回收。"),Object(a.b)("h2",{id:"retainers"},"Retainers"),Object(a.b)("p",null,"堆是一个由互连的对象组成的网络。在数学领域，此结构被称为“图”或内存图。图由通过",Object(a.b)("strong",{parentName:"p"},"边"),"连接的节点组成，两者都是给定标签。"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"节点"),"（或对象）使用构造函数（用于构建节点）的名称进行标记。"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"边"),"使用属性的名称进行标记。")),Object(a.b)("p",null,"了解 ",Object(a.b)("a",r({parentName:"p"},{href:"https://developers.google.com/web/tools/chrome-devtools/profile/memory-problems/heap-snapshots"}),"how to record a profile using the Heap Profiler"),"。我们可以从下面的 ",Object(a.b)("inlineCode",{parentName:"p"},"Heap Profiler")," 中看到一些引人注目的参数，例如距离：距离是指与 GC 根之间的距离。如果相同类型的几乎所有对象的距离都相同，只有少数对象的距离偏大，则有必要进行检查。"),Object(a.b)("img",{src:"https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/FKT1pk.png"}),Object(a.b)("h2",{id:"支配项"},"支配项"),Object(a.b)("p",null,"支配对象由一个树结构组成，因为每个对象都有且仅有一个支配项。对象的支配项可能缺少对其所支配对象的直接应用；也就是说，支配项的树不是图表的生成树。"),Object(a.b)("p",null,"在下面的图表中："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"节点 1 支配节点 2"),Object(a.b)("li",{parentName:"ul"},"节点 2 支配节点 3 、4 和 6"),Object(a.b)("li",{parentName:"ul"},"节点 3 支配节点 5"),Object(a.b)("li",{parentName:"ul"},"节点 5 支配节点 8"),Object(a.b)("li",{parentName:"ul"},"节点 6 支配节点 7")),Object(a.b)("div",{align:"center"},Object(a.b)("img",{width:"210",src:"https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/fN93zR.jpg"})),Object(a.b)("p",null,"在下面的示例中，节点 ",Object(a.b)("inlineCode",{parentName:"p"},"#3")," 是 ",Object(a.b)("inlineCode",{parentName:"p"},"#10")," 的支配项，但 ",Object(a.b)("inlineCode",{parentName:"p"},"#7")," 也存在于从 GC 到 ",Object(a.b)("inlineCode",{parentName:"p"},"#10")," 的每一个简单路径中。因此，如果对象 B 存在于从根到对象 A 的每一个简单路径中，那么对象 B 就是对象 A 的支配项。"),Object(a.b)("img",{src:"https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/dominators.gif"}))}p.isMDXComponent=!0},390:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return s}));var a=n(0),r=n.n(a),l=r.a.createContext({}),b=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},c=function(e){var t=b(e.components);return r.a.createElement(l.Provider,{value:t},e.children)};var o="mdxType",i={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},p=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,o=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===t.indexOf(a)&&(n[a]=e[a]);return n}(e,["components","mdxType","originalType","parentName"]),p=b(n),s=a,u=p[c+"."+s]||p[s]||i[s]||l;return n?r.a.createElement(u,Object.assign({},{ref:t},o,{components:n})):r.a.createElement(u,Object.assign({},{ref:t},o))}));function s(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,b=new Array(l);b[0]=p;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c[o]="string"==typeof e?e:a,b[1]=c;for(var s=2;s<l;s++)b[s]=n[s];return r.a.createElement.apply(null,b)}return r.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);