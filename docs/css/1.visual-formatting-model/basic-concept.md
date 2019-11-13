---
title: 基础概念
sidebar_label: 基础概念
---

import Hint from '../../../src/components/Hint'
import Img from '../../../src/components/Img'

## 可替换元素

可替换元素（replaced element）是CSS世界中的另一个派系。从名字上理解：

```html
<img src="1.jpg">
```

如果把上面 `1.jpg` 换成 `2.jpg` ，那么该图片是不是会被替换？其导致的现象就是该图片内容或者宽高就会变得不一样了，所以浏览器将这一类元素话费为可替换元素，并为其设置一些默认样式，还有一些属性（比如 `src` ,  `width` ），来决定元素的具体显示内容。

又比如 `<img>` ，在 HTML 和 CSS 都没有设置宽高，但其却有自己的宽高，因为其内容是可替换的：

<Img width="450" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/q8V0BB.jpg'/>

又例如根据 `<input>` 标签的 `type` 属性来决定是显示输入框，还是单选按钮等。

HTML 中的 `<img>、<input>、<button>、<textarea>、<select>、<object>、<iframe>、<video>、<canvas> `等都是替换元素。这些元素往往没有实际的内容，即是一个空元素。

可替换元素出了内容可替换外，还有以下一些特征：

- **内容的外观不受页面上的CSS影响**：需要利用浏览器暴露出来的类似appearance属性去修改。

<Img width="500" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/2d38wr.png'/>

- **有自己的尺寸**：原则上是CSS尺寸>HTML尺寸>固有尺寸，具体计算规则可以参考《CSS世界》P47
- **在很多CSS属性上有自己的一套表现规则**：比如 `vertical-align`

可替换元素是一种外部对象，它们外观的渲染，是独立于 CSS 的。

简单来说，它们的内容不受当前文档的样式的影响。CSS 可以影响可替换元素的位置，但不会影响到可替换元素自身的内容。某些可替换元素，例如 `<iframe>` 元素，可能具有自己的样式表，但它们不会继承父文档的样式。

CSS 能对可替换元素产生的唯一影响在于，部分属性支持控制元素内容在其框中的位置或定位方式。

## 包含块

包含块（containing block）对非绝对定位元素就是 HTML **嵌套元素中的父元素**，当然它也是相对而言的，它影响着内部盒子的位置、大小等，但内部盒子也不完全受其包含块所限制。

<Hint type="tip">我们常说“一个盒的包含块”表示“盒所在的包含块”，而不是它生成的包含块。如下图， `em` box的包含块指的是 `div.main1` 。</Hint>

<Img width="550" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/lTrogl.jpg'/>

包含块(containing block) 这个概念实际上大家一直都有接触，就是元素用来计算和定位的一个框。比方说，`width:50%` ， 也就是宽度一半，那到底是哪个“元素”宽度的一半呢? 注意，这里的这个“元素”实际上就是指的“包含块”。有经验的人应该都知道，普通元素的百分比宽度是相对于父元素的 `content box` 宽度计算的，而绝对定位元素的宽度是相对于第一个 `position` 不为 `static` 的祖先元素计算的。实际上，大家已经和“包含块”打过交道了，对于这些计算规则，规范是有明确定义的，具体如下(剔除了不常用的部分内容)。

- 根元素(很多场景下可以看成是 `<html>` )被称为“初始包含块”，其尺寸等同于浏览器可视窗口的大小。
- 对于其他元素，如果该元素的 `position` 是 `relative` 或者 `static` ,则“包含块”由其最近的块容器祖先盒的 `content box` 边界形成。
- 如果元素 `position:fixed` , 则“包含块”是“初始包含块”。
- 如果元素 `position:absolute` ，则“包含块”由最近的 `position` 不为 `static` 的祖先元素建立，具体方式如下。

如果该祖先元素是纯 `inline` 元素，则规则略复杂:

- 假设给内联元素的前后各生成一一个宽度为 0的内联盒子(inline box),则这两个内联盒子的 `padding box` 外面的包围盒就是内联元素的“包含块”;
- 如果该内联元素被跨行分割了，那么“包含块”是未定义的，也就是 CSS2.1 规范并没有明确定义，浏览器自行发挥。

否则，“包含块”由该祖先的 `padding box` 边界形成。

如果没有符合条件的祖先元素，则“包含块”是“初始包含块”。
