---
title: 页面渲染
---

## 浏览器页面渲染

浏览器工作流程大体分为如下三部分：

1. 浏览器会解析三个东西：

   - **HTML/SVG/XHTML**，解析这三种文件会产生一个 DOM Tree。
   - **CSS**，解析 CSS 会产生 CSS Rule Tree。
   - **Javascript**，主要是通过 DOM API 和 CSSOM API 来操作 DOM Tree 和 CSS Rule Tree。

2. 解析完成后，浏览器引擎会通过 DOM Tree 和 CSS Rule Tree 来构造 Rendering Tree。

   - Render Tree 渲染树并不等同于 DOM Tree，因为**一些像`<head>`或 CSS 设置 `display:none` 的节点**就没必要放在渲染树中了。
   - CSS Rule Tree 主要是为了完成匹配并把 CSS Rule 附加上 Render Tree 上的每个 Element。也就是 DOM 结点。也就是所谓的 Frame。
   - 然后，计算每个 Frame（也就是每个 Element）的位置，包括 `layout` 和 `reflow` 过程。

3. 最后通过调用操作系统 Native GUI(图像用户接口)的 API 绘制。

<Img align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/page-render.jpg' alt='page-render' />

<p align="center">图1：DOM、CSSOM 和 Render Tree 关系</p>

[如图 1 所示](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=zh-cn)，**在 DOM 树和 CSS 规则树合并成渲染树的时候会忽略`<head>`等不可见节点和设置了样式为 display:none 的节点**。生成渲染树后然后进入布局，布局计算每个对象的精确位置和大小，然后通过绘制，呈现出页面。

<Img align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/render-steps.jpg' alt='render-steps' width="800" />

<Img align="center" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/construct-step.jpg" alt='construct-step' width="750"/>

浏览器工作流程：构建 DOM -> 构建 CSSOM -> 构建渲染树 -> 布局 -> 绘制。

## CSSOM 的构建会阻碍 DOM 树的解析吗？

由上图可知，在页面渲染机制中，通常情况下 DOM 和 CSSOM 是`并行构建`的，两者互不干扰，所以 CSSOM 的构建不会阻碍 DOM 树的解析

## CSSOM 的构建会阻碍页面的渲染吗？

只有 CSSOM 和 DOM 都构建完毕时，渲染树才会根据两者开始构建，所以在默认情况下，CSS 被视为阻塞渲染的资源，这意味着浏览器将不会渲染任何已处理的内容，直至 CSSOM 构建完毕。所以 CSS 也需要精简、减少 Reflow 和 Repaint。

## script 脚本会影响页面渲染吗？

JavaScript 的加载、解析与执行会阻塞 DOM 的构建，也就是说，在构建 DOM 时，HTML 解析器若遇到了 JavaScript，那么它会暂停构建 DOM，将控制权移交给 JavaScript 引擎，等 JavaScript 引擎运行完毕，浏览器再从中断的地方恢复 DOM 构建。

此外，JavaScript 不只是可以改 DOM，它还可以更改样式，也就是它可以更改 CSSOM。不完整的 CSSOM 是无法使用的，而 JavaScript 中想访问 CSSOM 并更改它，必须要能拿到完整的 CSSOM。所以就导致了一个现象，如果浏览器尚未完成 CSSOM 的下载和构建，而我们却想在此时运行脚本，**那么浏览器将延迟脚本执行和 DOM 构建，直至其完成 CSSOM 的下载和构建**。也就是说，在这种情况下，**浏览器会先下载和构建 CSSOM，然后再执行 JavaScript，最后在继续构建 DOM**。

## 白屏现象

Chrome 的渲染机制要先构建 DOM 树和 CSSOM 树，二者都得构建完成后再进行渲染，如果 CSS 部分放在 HTML 尾部，由于 CSS 未加载完成，浏览器迟迟未渲染，从而导致白屏；也可能是把 js 文件放在头部，脚本会阻塞后面内容的呈现，脚本会阻塞其后组件的下载，出现白屏问题。

## 为什么操作 DOM 慢

因为 DOM 是属于渲染引擎中的东西，而 JS 又是 JS 引擎中的东西。当我们通过 JS 操作 DOM 的时候，其实这个操作涉及到了两个线程之间的通信，那么势必会带来一些性能上的损耗。操作 DOM 次数一多，也就等同于一直在进行线程之间的通信，并且操作 DOM 可能还会带来重绘回流的情况，所以也就导致了性能上的问题。

## 相关拓展

1. [DOMContentLoaded, 深入了解一下](https://tmf-map.github.io/docsite/docs/web/6.browser-rendering/DOMContentLoaded)

## 参考资料

1. [css 加载会造成阻塞吗？By 可乐好喝不胖](https://juejin.im/post/5b88ddca6fb9a019c7717096#heading-4)
2. [阻塞渲染的 CSS: By Ilya Grigorik](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css?hl=zh-cn)
