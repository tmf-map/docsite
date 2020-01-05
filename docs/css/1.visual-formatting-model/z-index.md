---
title: 层叠
sidebar_label: 层叠
---

import Img from '../../../src/components/Img'; import Hint from '../../../src/components/Hint';

## 层叠顺序

<Img width="450" align="center" legend="图: 层叠顺序类型标注" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/page228image27822112.jpg'/>

1. 位于最下面的 background/border 特指层叠上下文元素的边框和背景色。每一个 层叠顺序规则仅适用于当前层叠上下文元素的小世界。
1. inline 水平盒子指的是包括 inline/inline-block/inline-table 元素的“层 叠顺序”，它们都是同等级别的。
1. 单纯从层叠水平上看，实际上 z-index:0 和 z-index:auto 是可以看成是一样的。注 意这里的措辞— “单纯从层叠水平上看”，实际上，两者在层叠上下文领域有着根本性的差异。

<Hint type="warn">内联元素的层叠顺序要比浮动元素和块状元素都高。</Hint>

`background`/`border` 为装饰属性，浮动和块状元素一般用作布局，而内联元素都是内容。 网页中最重要的是什么?当然是内容了!尤其是 CSS 世界是为 更好的图文展示而设计的，因此，一定要让内容的层叠顺序相当 高，这样当发生层叠时，重要的文字、图片内容才可以优先显示。例如，文字和浮动图片重叠的时候.

## 层叠规则

下面这两条是层叠领域的黄金准则。当元素发生层叠的时候，其覆盖关系遵循下面两条准则:

- **谁大谁上**:当具有明显的层叠水平标识的时候，如生效的 z-index 属性值，在同一个层叠上下文领域，层叠水平值大的那一个覆盖小的那一个。
- **后来居上**:当元素的层叠水平一致、层叠顺序相同的时候，在 DOM 流中处于后面的元素会覆盖前面的元素。

在 CSS 和 HTML 领域，只要元素发生了重叠，都离不开上面这两条黄金准则。

## 层叠上下文

Demo：https://demo.cssworld.cn/7/5-1.php

### 层叠上下文的创建

和块状格式化上下文一样，层叠上下文也基本上是由一些特定的 CSS 属性创建的。我将其 总结为 3 个流派。

1. 天生派:页面根元素天生具有层叠上下文，称为根层叠上下文。
2. 正统派:z-index 值为数值的定位元素的传统“层叠上下文”。
3. 扩招派:其他 CSS3 属性。

<Hint type="tip">z-index 只是产生层叠上下文的一种方式，但不是全部。</Hint>

注：定位元素指 position 不为 static 的元素 position: absolute/relative 的元素 z-index 不为 auto 的时候才会创建新的层叠上下文。在 Chrome 中，position: fixed 是属于天生派中，auto 也会创建层叠上下文。

#### 根层叠上下文

根层叠上下文指的是页面根元素，可以看成是 `<html>` 元素。因此，页面中所有的元素一 定处于至少一个“**层叠结界**”中。

#### 定位元素与传统层叠上下文

对于 `position` 值为 `relative`/`absolute` 以及 Firefox/IE 浏览器(不包括 Chrome 浏览器)下含有 `position:fixed` 声明的定位元素，当其 `z-index` 值不是 `auto` 的时候，会创建层叠上下文。

#### CSS3 与新时代的层叠上下文

CSS3 新世界的出现除了带来了新属性，还对过去的很多规则发出了挑战，其中对层叠上 下文规则的影响显得特别突出。

- 元素为 flex 布局元素(父元素 display:flex|inline-flex)，同时 z-index 值不是 auto。
- 元素的 opacity 值不是 1。
- 元素的 transform 值不是 none。
- 元素 mix-blend-mode 值不是 normal。
- 元素的 filter 值不是 none。
- 元素的 isolation 值是 isolate。
- 元素的 will-change 属性值为上面 2~6 的任意一个(如 will-change:opacity、will-chang:transform 等)。 (8)元素的-webkit-overflow-scrolling 设为 touch。

### 层叠上下文与层叠顺序

## 负 z-index

> 很多人(包括我)一开始的时候，以为一个定位元素设置 z-index 负值，就会跑到页面的背 后，隐藏掉，看不到了。结果实际上是有时候确实隐藏了，但有时候又隐藏不掉。为什么会这样?

z-index 负值的最终表现并不是单一的，而是与“层叠上下文”和“层叠顺序”密 切相关。前面展示的层叠顺序规则 7 阶图，其中最下面的 2 阶是理解 z-index 负值表现的关键，如图所示。

<Img width="250" align="center" legend="图: “层叠顺序”最底层 2 阶" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/page234image27324608.jpg'/>

图中已经很明显地标明了，z-index 负值元素的层级是在层叠上下文元素上面、block 元素的下面。

<Hint type="tip">z-index 虽然名为负数层级，但依然无法突破当前层叠上下文所包裹的小世界。</Hint>

<Hint type="tip">z-index 负值渲染过程就是寻找第一个层叠上下文元素的过程，然后层叠顺序止步于这个层叠上下文元素。</Hint>

Demo：https://demo.cssworld.cn/7/6-1.php
