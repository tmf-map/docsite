---
id: async-defer
title: async和defer
sidebar_label: async和defer
---

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/OelrrE.png)

其中蓝色线代表JS加载；红色线代表JS执行；绿色线代表 HTML 解析。

defer: 延迟执行
aysnc: 异步下载

HTML 网页中，浏览器通过`<script>`标签加载 JavaScript 脚本。
```
<!-- 页面内嵌的脚本 -->
<script type="application/javascript">
  // module code
</script>

<!-- 外部脚本 -->
<script type="application/javascript" src="path/to/myModule.js">
</script>
```
上面代码中，由于浏览器脚本的默认语言是 JavaScript，因此type="application/javascript"可以省略。

默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到`<script>`标签就会停下来，等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须加入脚本下载的时间。

如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，没有任何响应。这显然是很不好的体验，所以浏览器允许脚本异步加载，下面就是两种异步加载的语法。
```
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```
上面代码中，`<script>`
标签打开defer或async属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。

**defer与async的区别是**：defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。
- defer是“渲染完再执行”，async是“下载完就执行”。
- 多个defer脚本，会按照在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。
