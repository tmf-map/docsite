(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{193:function(e,n,r){"use strict";r.d(n,"a",(function(){return i})),r.d(n,"b",(function(){return p}));var t=r(0),a=r.n(t),l=a.a.createContext({}),c=function(e){var n=a.a.useContext(l),r=n;return e&&(r="function"==typeof e?e(n):Object.assign({},n,e)),r},i=function(e){var n=c(e.components);return a.a.createElement(l.Provider,{value:n},e.children)};var u="mdxType",o={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},b=Object(t.forwardRef)((function(e,n){var r=e.components,t=e.mdxType,l=e.originalType,i=e.parentName,u=function(e,n){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&-1===n.indexOf(t)&&(r[t]=e[t]);return r}(e,["components","mdxType","originalType","parentName"]),b=c(r),p=t,s=b[i+"."+p]||b[p]||o[p]||l;return r?a.a.createElement(s,Object.assign({},{ref:n},u,{components:r})):a.a.createElement(s,Object.assign({},{ref:n},u))}));function p(e,n){var r=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var l=r.length,c=new Array(l);c[0]=b;var i={};for(var o in n)hasOwnProperty.call(n,o)&&(i[o]=n[o]);i.originalType=e,i[u]="string"==typeof e?e:t,c[1]=i;for(var p=2;p<l;p++)c[p]=r[p];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},62:function(e,n,r){"use strict";r.r(n),r.d(n,"frontMatter",(function(){return c})),r.d(n,"rightToc",(function(){return i})),r.d(n,"default",(function(){return b}));r(0);var t=r(193);function a(){return(a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e}).apply(this,arguments)}function l(e,n){if(null==e)return{};var r,t,a=function(e,n){if(null==e)return{};var r,t,a={},l=Object.keys(e);for(t=0;t<l.length;t++)r=l[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)r=l[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c={id:"reverse-linked-list",title:"反转链表",sidebar_label:"反转链表"},i=[{value:"题目",id:"题目",children:[]},{value:"思路",id:"思路",children:[]},{value:"特殊测试",id:"特殊测试",children:[]},{value:"代码实现",id:"代码实现",children:[{value:"方法一：迭代",id:"方法一：迭代",children:[]},{value:"方法二：递归",id:"方法二：递归",children:[]}]}],u={rightToc:i},o="wrapper";function b(e){var n=e.components,r=l(e,["components"]);return Object(t.b)(o,a({},u,r,{components:n,mdxType:"MDXLayout"}),Object(t.b)("ul",null,Object(t.b)("li",{parentName:"ul"},"题源：《剑指Offer: 面试题 24》P142"),Object(t.b)("li",{parentName:"ul"},"在线：",Object(t.b)("a",a({parentName:"li"},{href:"https://leetcode-cn.com/problems/reverse-linked-list/"}),"LeetCode: 206"))),Object(t.b)("h2",{id:"题目"},"题目"),Object(t.b)("p",null,"定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点，节点定义如下："),Object(t.b)("pre",null,Object(t.b)("code",a({parentName:"pre"},{className:"language-js"}),"function ListNode(val) {\n    this.val = val;\n    this.next = null;\n}\n")),Object(t.b)("p",null,"示例:"),Object(t.b)("pre",null,Object(t.b)("code",a({parentName:"pre"},{className:"language-text"}),"输入: 1->2->3->4->5->null\n输出: 5->4->3->2->1->null\n")),Object(t.b)("h2",{id:"思路"},"思路"),Object(t.b)("ol",null,Object(t.b)("li",{parentName:"ol"},"直接进行 ",Object(t.b)("inlineCode",{parentName:"li"},"curr.next = prev")," 反转的时候，会导致 curr 和 next 断裂"),Object(t.b)("li",{parentName:"ol"},"需要一个 next 指针先把 next 节点存储下来"),Object(t.b)("li",{parentName:"ol"},"如果 next 是 null，说明 curr 已经到了尾节点，将新的 head 指向尾节点"),Object(t.b)("li",{parentName:"ol"},"移动 prev 和 cur 使各自指向下一个节点"),Object(t.b)("li",{parentName:"ol"},"思考迭代和递归的实现")),Object(t.b)("div",{align:"center"},Object(t.b)("img",{width:"530",src:"https://raw.githubusercontent.com/ThinkBucket/oss/master/ex0Dzp.png"}),Object(t.b)("p",null,"图：curr.next = prev 反转的时候出现断裂")),Object(t.b)("h2",{id:"特殊测试"},"特殊测试"),Object(t.b)("ul",null,Object(t.b)("li",{parentName:"ul"},"输入空链表"),Object(t.b)("li",{parentName:"ul"},"输入只有一个节点的链表")),Object(t.b)("h2",{id:"代码实现"},"代码实现"),Object(t.b)("h3",{id:"方法一：迭代"},"方法一：迭代"),Object(t.b)("pre",null,Object(t.b)("code",a({parentName:"pre"},{className:"language-js"}),"function reverseList (head) {\n    let reversedHead = null;\n    let prev = null;\n    let curr = head;\n    while (curr) {\n        // 先存储 next\n        let next = curr.next;\n        if (!next) {\n            reversedHead = curr;\n        }\n        // 反转\n        curr.next = prev;\n        // 指向下一个节点\n        prev = curr;\n        curr = next;\n    }\n    return reversedHead;\n}\n")),Object(t.b)("h3",{id:"方法二：递归"},"方法二：递归"),Object(t.b)("p",null,"递归的方法，处理 prev 的时候是采用函数传参的方式，巧妙利用递归可以避免处理指向一下个节点的时候逻辑比较“绕”的问题，代码也相对更简洁。"),Object(t.b)("pre",null,Object(t.b)("code",a({parentName:"pre"},{className:"language-js"}),"function reverseList (head, prev = null) {\n    if (!head) return null;\n    let curr = head;\n    // 先存储 next\n    let next = curr.next;\n    // 反转\n    curr.next = prev;\n    if (!next) {\n        return curr;\n    }\n    return reverseList(next, curr);\n}\n")))}b.isMDXComponent=!0}}]);