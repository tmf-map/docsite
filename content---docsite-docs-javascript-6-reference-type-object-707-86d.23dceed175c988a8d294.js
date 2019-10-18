(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{164:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"rightToc",(function(){return o})),t.d(n,"default",(function(){return s}));t(0);var a=t(390),r=t(391);function b(){return(b=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},b=Object.keys(e);for(a=0;a<b.length;a++)t=b[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(e);for(a=0;a<b.length;a++)t=b[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var c={title:"对象",sidebar_label:"对象"},o=[{value:"Object.defineProperty",id:"objectdefineproperty",children:[{value:"数据属性",id:"数据属性",children:[]},{value:"访问器属性",id:"访问器属性",children:[]}]},{value:"freeze v.s seal",id:"freeze-vs-seal",children:[]},{value:"rest v.s spread",id:"rest-vs-spread",children:[]},{value:"变量作为对象的 key",id:"变量作为对象的-key",children:[]},{value:"对象中的 this",id:"对象中的-this",children:[]},{value:"属性的可枚举性",id:"属性的可枚举性",children:[]},{value:"属性的遍历",id:"属性的遍历",children:[{value:"五大方法",id:"五大方法",children:[]},{value:"key 的顺序",id:"key-的顺序",children:[]}]},{value:"参考资料",id:"参考资料",children:[]}],i={rightToc:o},p="wrapper";function s(e){var n=e.components,t=l(e,["components"]);return Object(a.b)(p,b({},i,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("img",{src:"https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/TUpxA2.jpg"}),Object(a.b)("h2",{id:"objectdefineproperty"},"Object.defineProperty"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"Object.defineProperty")," 可以设置对象属性的数据属性和访问器属性。"),Object(a.b)("h3",{id:"数据属性"},"数据属性"),Object(a.b)("p",null,"数据属性分为四种： ",Object(a.b)("inlineCode",{parentName:"p"},"configurable")," 、 ",Object(a.b)("inlineCode",{parentName:"p"},"enumerable")," 、 ",Object(a.b)("inlineCode",{parentName:"p"},"writable")," 和 ",Object(a.b)("inlineCode",{parentName:"p"},"value")," 。"),Object(a.b)(r.a,{type:"warning",mdxType:"Hint"},"在不使用 `Object.defineProperty` 来定义对象时，四种的默认值都是 true ，如果使用该方法时，默认值都是 false 。"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"configurable")," 字段配置对象属性是否可以删除属性："),Object(a.b)("pre",null,Object(a.b)("code",b({parentName:"pre"},{className:"language-js"}),"var person = {}\nObject.defineProperty(person, 'name', { configurable: false, enumerable: true, writable: true, value: 'robbie'});\ndelete person.name\nconsole.log(person) //{name: 'robbie'}\n")),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"enumerable")," 配置属性是否是可枚举类型："),Object(a.b)("pre",null,Object(a.b)("code",b({parentName:"pre"},{className:"language-js"}),"var person = {}\nObject.defineProperty(person, 'name', { enumerable: false, value: 'robbie'});\nObject.keys(person) // []\n")),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"writable")," 用来配置属性是否可修改："),Object(a.b)("pre",null,Object(a.b)("code",b({parentName:"pre"},{className:"language-js"}),"var person = {}\nObject.defineProperty(person, 'name', {writable: false, value: 'robbie'});\nperson.name = 'sherry'\nconsole.log(person) //{name: 'robbie'}\n")),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"value")," 配置属性值："),Object(a.b)("pre",null,Object(a.b)("code",b({parentName:"pre"},{className:"language-js"}),"var person = {}\nObject.defineProperty(person, 'name', { value: 'robbie' });\nconsole.log(person) // {name: \"robbie\"}\n")),Object(a.b)("h3",{id:"访问器属性"},"访问器属性"),Object(a.b)("p",null,"在读取访问器属性的时候会访问 ",Object(a.b)("inlineCode",{parentName:"p"},"getter")," 属性，在写入访问器属性时会调用 ",Object(a.b)("inlineCode",{parentName:"p"},"setter")," ："),Object(a.b)("pre",null,Object(a.b)("code",b({parentName:"pre"},{className:"language-js"}),"var obj = {\n  log: ['a', 'b', 'c'],\n  get latest() {\n    if (this.log.length == 0) {\n      return undefined;\n    }\n    return this.log[this.log.length - 1];\n  },\n  set add(v) {\n    this.log.push(v);\n    return this.log\n  }\n}\nconsole.log(obj.latest) // 'c'\nobj.add = 'd'\nconsole.log(obj.log) // [\"a\", \"b\", \"c\", \"d\"]\n")),Object(a.b)("h2",{id:"freeze-vs-seal"},"freeze v.s seal"),Object(a.b)("p",null,"Object.freeze: 不能增加和删除属性，不可以修改属性值(属性值为对象的除外)"),Object(a.b)("pre",null,Object(a.b)("code",b({parentName:"pre"},{className:"language-js"}),"var app = {\n  name: 'ts',\n  test: {\n    name: 'kimi'\n  }\n}\n\nObject.freeze(app)\napp.test.name = 'robbie' \nconsole.log(app.test) //{name: 'robbie'}\n\nObject.freeze(app.test)\ndelete app.name  //false\napp // {name: \"ts\", test: {...}}\n")),Object(a.b)("p",null,"Object.seal: 不能增加和删除，但可以修改属性"),Object(a.b)("pre",null,Object(a.b)("code",b({parentName:"pre"},{className:"language-js"}),"const App = {\n  name: 'ts'\n}\n\nObject.seal(App)\n\nApp.name = 'asgh'\n\nconsole.log('name', App.name) // 'asgh'\n")),Object(a.b)("h2",{id:"rest-vs-spread"},"rest v.s spread"),Object(a.b)("p",null,"区别 以及对应es5的代码",Object(a.b)("br",{parentName:"p"}),"\n","= 左边是，右边是",Object(a.b)("br",{parentName:"p"}),"\n","function (..arg)",Object(a.b)("br",{parentName:"p"}),"\n",Object(a.b)("a",b({parentName:"p"},{href:"https://juejin.im/post/5d673044f265da03d60f12f7"}),"【译】JS解构的五种有趣用法"),Object(a.b)("br",{parentName:"p"}),"\n","可迭代 iterable"),Object(a.b)("h2",{id:"变量作为对象的-key"},"变量作为对象的 key"),Object(a.b)("h2",{id:"对象中的-this"},"对象中的 this"),Object(a.b)("h2",{id:"属性的可枚举性"},"属性的可枚举性"),Object(a.b)("p",null,"对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。",Object(a.b)("inlineCode",{parentName:"p"},"Object.getOwnPropertyDescriptor")," 方法可以获取该属性的描述对象。"),Object(a.b)("pre",null,Object(a.b)("code",b({parentName:"pre"},{className:"language-js"}),"let obj = { foo: 123 };\nObject.getOwnPropertyDescriptor(obj, 'foo')\n//  {\n//    value: 123,\n//    writable: true,\n//    enumerable: true,\n//    configurable: true\n//  }\n")),Object(a.b)("p",null,"描述对象的 ",Object(a.b)("inlineCode",{parentName:"p"},"enumerable")," 属性，称为“可枚举性”，如果该属性为 false ，就表示某些操作会忽略当前属性。"),Object(a.b)("p",null,"目前，有四个操作会忽略 ",Object(a.b)("inlineCode",{parentName:"p"},"enumerable")," 为 false 的属性。"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"for...in")," 循环：只遍历对象自身的和继承的可枚举的属性。"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"Object.keys()"),"：返回对象自身的所有可枚举的属性的键名。"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"JSON.stringify()"),"：只串行化对象自身的可枚举的属性。"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"Object.assign()"),"： 忽略 ",Object(a.b)("inlineCode",{parentName:"li"},"enumerable")," 为 false 的属性，只拷贝对象自身的可枚举的属性。")),Object(a.b)("p",null,"这四个操作之中，前三个是 ES5 就有的，最后一个 ",Object(a.b)("inlineCode",{parentName:"p"},"Object.assign()")," 是 ES6 新增的。"),Object(a.b)(r.a,{type:"warning",mdxType:"Hint"},"只有 `for...in` 会遍历继承的属性，其他三个都会忽略继承的属性，只处理对象自身的属性。"),Object(a.b)("p",null,"实际上，引入“可枚举”（enumerable）这个概念的最初目的，就是让某些属性可以规避掉 ",Object(a.b)("inlineCode",{parentName:"p"},"for...in")," 操作，不然所有内部属性和方法都会被遍历到。比如，对象原型的 ",Object(a.b)("inlineCode",{parentName:"p"},"toString")," 方法，以及数组的 ",Object(a.b)("inlineCode",{parentName:"p"},"length")," 属性，就通过“可枚举性”，从而避免被 ",Object(a.b)("inlineCode",{parentName:"p"},"for...in")," 遍历到。"),Object(a.b)("pre",null,Object(a.b)("code",b({parentName:"pre"},{className:"language-js"}),"Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable\n// false\n\nObject.getOwnPropertyDescriptor([], 'length').enumerable\n// false\n")),Object(a.b)("p",null,"上面代码中， ",Object(a.b)("inlineCode",{parentName:"p"},"toString")," 和 ",Object(a.b)("inlineCode",{parentName:"p"},"length")," 属性的 ",Object(a.b)("inlineCode",{parentName:"p"},"enumerable")," 都是false，因此 ",Object(a.b)("inlineCode",{parentName:"p"},"for...in")," 不会遍历到这两个继承自原型的属性。"),Object(a.b)("p",null,"另外，ES6 规定，所有 Class 的原型的方法都是不可枚举的。"),Object(a.b)("pre",null,Object(a.b)("code",b({parentName:"pre"},{className:"language-js"}),"Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable\n// false\n")),Object(a.b)("p",null,"总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。"),Object(a.b)(r.a,{type:"better",mdxType:"Hint"},"尽量不要用 `for...in` 循环，而用 `Object.keys()`代替。"),Object(a.b)("h2",{id:"属性的遍历"},"属性的遍历"),Object(a.b)("h3",{id:"五大方法"},"五大方法"),Object(a.b)("p",null,"ES6 一共有 5 种方法可以遍历对象的属性。"),Object(a.b)("h4",{id:"1-forin"},"(1) for...in"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"for...in")," 循环遍历对象自身的和",Object(a.b)("strong",{parentName:"p"},"继承"),"的可枚举属性（不含 Symbol 属性）。"),Object(a.b)("h4",{id:"2-objectkeysobj"},"(2) Object.keys(obj)"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"Object.keys")," 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。"),Object(a.b)("h4",{id:"3-objectgetownpropertynamesobj"},"(3) Object.getOwnPropertyNames(obj)"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"Object.getOwnPropertyNames")," 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。"),Object(a.b)("h4",{id:"4-objectgetownpropertysymbolsobj"},"(4) Object.getOwnPropertySymbols(obj)"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"Object.getOwnPropertySymbols")," 返回一个数组，包含对象自身的所有 Symbol 属性的键名。"),Object(a.b)("h4",{id:"5-reflectownkeysobj"},"(5) Reflect.ownKeys(obj)"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"Reflect.ownKeys")," 返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。基本就是 ",Object(a.b)("inlineCode",{parentName:"p"},"getOwnPropertyNames")," 和 ",Object(a.b)("inlineCode",{parentName:"p"},"Object.getOwnPropertySymbols")," 的合体。"),Object(a.b)(r.a,{type:"warning",mdxType:"Hint"},"不管是否可枚举，不管是不是Symbol，只要是对象自身的，`Reflect.ownKeys()` 都会遍历。"),Object(a.b)(r.a,{type:"must",mdxType:"Hint"},"`Reflect.ownKeys()` 方法的第一个参数必须是对象，否则会报错。"),Object(a.b)("h3",{id:"key-的顺序"},"key 的顺序"),Object(a.b)("p",null,"对象 key 的顺序问题，你首先需要知道三点："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"ES6 之前是浏览器自己定义，从 ",Object(a.b)("a",b({parentName:"li"},{href:"https://www.ecma-international.org/ecma-262/9.0/index.html#sec-ordinaryownpropertykeys"}),"ES6 开始在规范中做了明确的规定")),Object(a.b)("li",{parentName:"ul"},"顺序并不一定就是定义的顺序"),Object(a.b)("li",{parentName:"ul"},"顺序也不是无序随机的，而是遵循一定的规则")),Object(a.b)("pre",null,Object(a.b)("code",b({parentName:"pre"},{className:"language-js"}),'var obj = {\n  m: function() {},\n  "b": \'\',\n  2: \'\',\n  \'1\': \'\',\n  [Symbol(\'b\')]: \'\',\n  [Symbol(\'a\')]: \'\',\n  "3": \'\',\n  "a": \'\',\n}\n\nObject.keys(obj) //  ["1", "2", "3", "m", "b", "a"]\nReflect.ownKeys(obj) // ["1", "2", "3", "m", "b", "a", Symbol(b), Symbol(a)]\n')),Object(a.b)("p",null,"前面说的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"首先遍历所有 integer-like keys (包括 ",Object(a.b)("inlineCode",{parentName:"li"},"1"),", 和 ",Object(a.b)("inlineCode",{parentName:"li"},"'1'"),") 按照升序排列，按照升序排列。"),Object(a.b)("li",{parentName:"ul"},"其次遍历所有 normal keys (包括加 ",Object(a.b)("inlineCode",{parentName:"li"},"''")," 和不加 ",Object(a.b)("inlineCode",{parentName:"li"},"''"),")，按照定义的顺序排列。"),Object(a.b)("li",{parentName:"ul"},"最后遍历所有 symbol keys，按照定义的顺序排列。")),Object(a.b)(r.a,{type:"must",mdxType:"Hint"},"如果对象的 key 为 integer-like ，千万不要依赖其定义的顺序。"),Object(a.b)(r.a,{type:"warning",mdxType:"Hint"},"如果在 Chrome 控制台上直接输入 `obj` 然后回车，打印出来的顺序还和 m 值的类型有关。这个顺序并不完全符合以上规则，但这只是控制台的表现，对实际的代码并无影响。"),Object(a.b)("p",null,"比如 m 为 函数的时候，打印出 ",Object(a.b)("inlineCode",{parentName:"p"},'{1: "", 2: "", 3: "", b: "", a: "", Symbol(b): "", Symbol(a): "", m: ƒ}')," ， 而 m 为字符串或数组的时候顺序却又在 3 和 b 之间。"),Object(a.b)("h2",{id:"参考资料"},"参考资料"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},Object(a.b)("a",b({parentName:"li"},{href:"http://es6.ruanyifeng.com/#docs/object#%E5%B1%9E%E6%80%A7%E7%9A%84%E5%8F%AF%E6%9E%9A%E4%B8%BE%E6%80%A7%E5%92%8C%E9%81%8D%E5%8E%86"}),"属性的可枚举性和遍历，作者：阮一峰")),Object(a.b)("li",{parentName:"ol"},Object(a.b)("a",b({parentName:"li"},{href:"https://stackoverflow.com/a/38218582"}),"stackoverflow: Does JavaScript Guarantee Object Property Order? "))))}s.isMDXComponent=!0},391:function(e,n,t){"use strict";var a=t(0),r=t.n(a),b=t(393),l=t.n(b),c=(t(392),{better:{name:"推荐",color:"#50c610",icon:r.a.createElement("svg",{preserveAspectRatio:"xMidYMid meet",height:"1em",width:"1em",fill:"none",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",stroke:"currentColor",className:"custom-hint__icon",style:{color:"#50c610"}},r.a.createElement("g",null,r.a.createElement("path",{d:"M22 11.07V12a10 10 0 1 1-5.93-9.14"}),r.a.createElement("polyline",{points:"23 3 12 14 9 11"})))},must:{name:"强制",color:"#ff4642",icon:r.a.createElement("svg",{preserveAspectRatio:"xMidYMid meet",height:"1em",width:"1em",fill:"#ff4642",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024",stroke:"none",className:"custom-hint__icon"},r.a.createElement("g",null,r.a.createElement("path",{d:"M512 992c-262.4 0-480-217.6-480-480 0-262.4 217.6-480 480-480s480 217.6 480 480C992 774.4 774.4 992 512 992zM512 108.8C288 108.8 108.8 288 108.8 512c0 224 179.2 403.2 403.2 403.2s403.2-179.2 403.2-403.2C915.2 288 736 108.8 512 108.8zM697.6 684.8l-12.8 12.8c-6.4 6.4-19.2 6.4-25.6 0L512 550.4l-140.8 140.8c-6.4 6.4-19.2 6.4-25.6 0l-12.8-12.8c-6.4-6.4-6.4-19.2 0-25.6L473.6 512 326.4 371.2C320 358.4 320 345.6 326.4 339.2l12.8-12.8C345.6 320 358.4 320 371.2 326.4L512 473.6l140.8-140.8c6.4-6.4 19.2-6.4 25.6 0l12.8 12.8c6.4 6.4 6.4 19.2 0 25.6L550.4 512l140.8 140.8C704 665.6 704 678.4 697.6 684.8z"})))},tip:{name:"提示",color:"#3884ff",icon:r.a.createElement("svg",{preserveAspectRatio:"xMidYMid meet",height:"1em",width:"1em",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",stroke:"none",className:"custom-hint__icon",style:{color:"#3884ff"}},r.a.createElement("g",null,r.a.createElement("path",{d:"M12.2 8.98c.06-.01.12-.03.18-.06.06-.02.12-.05.18-.09l.15-.12c.18-.19.29-.45.29-.71 0-.06-.01-.13-.02-.19a.603.603 0 0 0-.06-.19.757.757 0 0 0-.09-.18c-.03-.05-.08-.1-.12-.15-.28-.27-.72-.37-1.09-.21-.13.05-.23.12-.33.21-.04.05-.09.1-.12.15-.04.06-.07.12-.09.18-.03.06-.05.12-.06.19-.01.06-.02.13-.02.19 0 .26.11.52.29.71.1.09.2.16.33.21.12.05.25.08.38.08.06 0 .13-.01.2-.02M13 16v-4a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0M12 3c-4.962 0-9 4.038-9 9 0 4.963 4.038 9 9 9 4.963 0 9-4.037 9-9 0-4.962-4.037-9-9-9m0 20C5.935 23 1 18.065 1 12S5.935 1 12 1c6.066 0 11 4.935 11 11s-4.934 11-11 11",fillRule:"evenodd"})))},warning:{name:"注意",color:"#fdbe12",icon:r.a.createElement("svg",{preserveAspectRatio:"xMidYMid meet",height:"1em",width:"1em",fill:"none",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",stroke:"currentColor",className:"custom-hint__icon",style:{color:"#fdbe12"}},r.a.createElement("g",null,r.a.createElement("circle",{cx:"12",cy:"12",r:"10"}),r.a.createElement("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),r.a.createElement("line",{x1:"12",y1:"16",x2:"12",y2:"16"})))}});n.a=function(e){var n=e.type,t=e.children;return r.a.createElement("div",{className:"custom-hint",style:{borderLeft:"4px solid ".concat(c[n].color)}},r.a.createElement("div",{style:{float:"left"}},c[n].icon),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:l()("<strong>".concat(c[n].name,"</strong>：").concat(t))}}))}},392:function(e,n,t){}}]);