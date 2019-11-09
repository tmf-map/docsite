---
title: 脚本加载
sidebar_label: 脚本加载
---

import Img from '../../../src/components/Img'

## 单线程 JS

JS代码在一个线程中执行，即主线程，这意味着一次只能执行一行JS代码。需要注意的是，这一个线程还负责文档的生命周期，比如：layout 和 paint。因此，JS代码运行的时候将会阻碍其他工作：

<Img width="650" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/CHWd5i.png'/>

如果HTML解析器碰到`<script>`标签，会暂停解析HTML文档并加载、解析和执行JS代码。因为JS有可能通过document.write()修改文档，进而改变DOM结构（HTML标准的“解析模型”有一张图可以一目了然：http://t.cn/Ai9cupLc ）：

<Img width="400" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/3PxN7P.png'/>

所以HTML解析器必须停下来执行JavaScript，然后再恢复解析HTML。至于执行JavaScript的细节，大家可以关注V8团队相关的分享：http://t.cn/RB9qP51 。

## async & defer

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/OelrrE.png)

其中蓝色线代表JS加载；红色线代表JS执行；绿色线代表 HTML 解析。

- defer: 延迟执行
- async: 异步下载

HTML 网页中，浏览器通过`<script>`标签加载 JavaScript 脚本。

```html
<!-- 页面内嵌的脚本 -->
<script type="application/javascript">
  // module code
</script>

<!-- 外部脚本 -->
<script type="application/javascript" src="path/to/myModule.js">
</script>
```

上面代码中，由于浏览器脚本的默认语言是 JavaScript，因此 `type="application/javascript"` 可以省略。

默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到`<script>`标签就会停下来，等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须加入脚本下载的时间。

如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，没有任何响应。这显然是很不好的体验，所以浏览器允许脚本异步加载，下面就是两种异步加载的语法。

```html
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

上面代码中，`<script>`
标签打开defer或async属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。

### defer 与 async 的区别

- defer 要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；
- async 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。
- defer是“渲染完再执行”，async是“下载完就执行”。
- 多个defer脚本，会按照在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。
