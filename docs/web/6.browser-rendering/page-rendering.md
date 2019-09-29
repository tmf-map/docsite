---
id: page-rendering
title: 页面渲染
sidebar_label: 页面渲染
---
## 浏览器页面渲染

浏览器工作流程大体分为如下三部分：

1. 浏览器会解析三个东西：
    - 一个是HTML/SVG/XHTML，事实上，Webkit有三个C++的类对应这三类文档。解析这三种文件会产生一个DOM Tree。
    - CSS，解析CSS会产生CSS规则树。
    - Javascript，脚本，主要是通过DOM API和CSSOM API来操作DOM Tree和CSS Rule Tree.

2. 解析完成后，浏览器引擎会通过DOM Tree 和 CSS Rule Tree 来构造 Rendering Tree。

    - Rendering Tree 渲染树并不等同于DOM树，因为**一些像`<headr>`元素或CSS设置display:none的节点**就没必要放在渲染树中了。
    - CSS 的 Rule Tree主要是为了完成匹配并把CSS Rule附加上Rendering Tree上的每个Element。也就是DOM结点。也就是所谓的Frame。
    - 然后，计算每个Frame（也就是每个Element）的位置，这又叫layout和reflow过程。

3. 最后通过调用操作系统Native GUI(图像用户接口)的API绘制。

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/kBpnEt.png)

[如上图所示](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=zh-cn)，**在DOM树和CSS规则树合并成渲染树的时候会忽略`<head>`等不可见节点和设置了样式为display:none的节点**。生成渲染树后然后进入布局，布局计算每个对象的精确位置和大小，然后通过绘制，呈现出页面。

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/yw9qb5brpt.png)

<img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/s6T92W.png" width="650">



浏览器工作流程：构建DOM -> 构建CSSOM -> 构建渲染树 -> 布局 -> 绘制。

## CSSOM的构建会阻碍DOM树的解析吗？

由上图可知，在页面渲染机制中，通常情况下DOM和CSSOM是`并行构建`的，两者互不干扰，所以CSSOM的构建不会阻碍DOM树的解析

## CSSOM的构建会阻碍页面的渲染吗？

只有CSSOM和DOM都构建完毕时，渲染树才会根据两者开始构建，所以在默认情况下，CSS 被视为阻塞渲染的资源，这意味着浏览器将不会渲染任何已处理的内容，直至 CSSOM 构建完毕。所以CSS也需要精简、减少Reflow和Repaint。

## script脚本会影响页面渲染吗？
JavaScript的加载、解析与执行会阻塞DOM的构建，也就是说，在构建DOM时，HTML解析器若遇到了JavaScript，那么它会暂停构建DOM，将控制权移交给JavaScript引擎，等JavaScript引擎运行完毕，浏览器再从中断的地方恢复DOM构建。

此外，JavaScript不只是可以改DOM，它还可以更改样式，也就是它可以更改CSSOM。不完整的CSSOM是无法使用的，而JavaScript中想访问CSSOM并更改它，必须要能拿到完整的CSSOM。所以就导致了一个现象，如果浏览器尚未完成CSSOM的下载和构建，而我们却想在此时运行脚本，**那么浏览器将延迟脚本执行和DOM构建，直至其完成CSSOM的下载和构建**。也就是说，在这种情况下，**浏览器会先下载和构建CSSOM，然后再执行JavaScript，最后在继续构建DOM**。

## 相关拓展：
相关内容: [DOMContentLoaded, 深入了解一下](https://thinkbucket.github.io/docsite/docs/web/6.browser-rendering/DOMContentLoaded)

本文参考链接：

[参考链接一](https://juejin.im/post/5b88ddca6fb9a019c7717096#heading-4)

[参考链接二](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css?hl=zh-cn)

