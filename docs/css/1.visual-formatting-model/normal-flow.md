---
title: 文档流
---

import Img from '@site/src/components/Img';

## 流 Flow

流实际上是 CSS 中的一种基本的定位和布局机制，流和现实世界的水流有异曲同工的表现。CSS 世界的“流”似乎就是按照现实世界的“水流”创造的。

CSS 世界构建的基石是 HTML，而 HTML 最具代表的两个基石 `<div>` 和 `<span>` 正好是 CSS 世界中 block-level 和 inline-level 的代表，它们对应的正是图中的盛水容器中的水和木头。

<Img width="450" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/S74EgO.jpg'/>

:::tip

所谓“流”，就是 CSS 世界中引导元素排列和定位的一条看不见的“水流”。

:::

## 文档流

文档流（Normal Flow, 也有翻译成 `普通流`, `常规流`）中的盒肯定属于某一个格式化上下文（Formatting Context），可能是 BFC 和 IFC ，但不能两者都是。

:::tip

简单点说，把格式化上下文看成是决定盒子详细排列布局的方案，盒子怎么排的。有两种方案，BFC 和 IFC ，每一种排列方案有其各自的规则和特点。

:::

那么有一个疑问，我们不是有 block box 和 inline box 吗，它也规定了 box 的位置排列，一行一行排还是在一行里面一列一列排，那 BFC/IFC 又是什么鬼？

你要知道，总有一些 box 很独秀，就像人类中总有一些人异于常人。像浮动的盒子、绝对定位的盒子、inline-block、flex 这些盒子，就是盒子中比较特殊的盒子。OK，那这些盒子的出现就不能用 block box 和 inline box 的特性来简简单单定义了，我们为它们做了一个新的划分，划分为 BFC 和 IFC 两大类，在原来的 block box 和 inline box 的基础上，再结合那些特殊的 box，定义了一些新的计算高度、margin、位置排列等的一些规范。个人感觉其实 BFC 是主要的成因（因为这些特殊的盒子基本上都在 BFC 规范中），IFC 是一种相对比较被动的存在，更多地是配合 BFC。

另外注意规范中说的是：

> Boxes in the normal flow belong to a formatting context, which may be block or inline, but not both simultaneously.

文档流中的盒肯定属于某一个格式化上下文，但并不代表脱离文档流的盒子不属于某一个格式化上下文，比如浮动盒子和绝对定位的盒子，它们属于 BFC。

## BFC

BFC(Block Formatting Context) 即块格式化上下文，是一种虚拟概念，可以理解称创建一个 BFC 就会产生一个“结界”，形成了一个封闭的空间，里面的人出不去，外面的人进不来，具有极强的防御力。

不是每一个 block box 都会创建一个 BFC，创建 BFC 的也不一定是 block box。不要以 block box 来看待 BFC 中的 B，这在 CSS 规范中解释了这个 B 指的是 block-level box('block', 'list-item', and 'table')，但 block-level box 并不仅仅指 block box，说得再简单一点：

- BFC 的 B 不等于 block box，而是 block-level box('block', 'list-item', and 'table')
- 只要创建了 BFC，该 box 就可以设置宽高和 margin 等，毕竟要遵守 BFC 的规则。为了遵守规则，之前的 display 会按照如下表格转化成 block-level box。这也解释了为什么 float 和绝对定位的 inline box 都可以设置宽高和 margin。
- inline-block 的元素。

| Specified value | Computed value |
| --- | --- |
| inline-table | table |
| inline, table-row-group, table-column, table-column-group, table-header-group, table-footer-group, table-row, table-cell, table-caption, inline-block | block |
| 其它 | 与指定值相同 |

BFC 规则规定了在该 BFC 中 boxes(包括：浮动的 box，绝对定位的 box，block coantainer box 以及其他 block box)排列布局方式，它在计算盒子高度，margin 值计算等地方有区别于其他环境。

- **清除浮动**：由于 BFC 改变了正常 box 的宽高计算规则，所以它可以用来清除浮动。
- **去除父子 margin 重叠**：BFC 元素是不会发生 margin 重叠的，因为 margin 重叠会影响外面元素。
- **自适应布局**：实现更健壮、更智能的自适应布局。

### 什么元素会触发产生一个（新）BFC？

https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context

- 根元素 `<html>`
- 浮动
- 绝对定位（absolute 或 fixed）
- block containers(not block box): inline-block, table-cell, table-caption, flex, inline-flex
- block box: overflow 不为 visible

<Img width="300" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ZQe2wN.jpg'/>

Demo: https://codepen.io/muwenzi/pen/vqdJxz

### BFC 特点

- 内部盒子会在垂直方向排列，即行排，一行一行进行排列布局；每个盒的左外边界挨着包含块的左外边界（对于从右向左的格式化，右外边界挨着）。
- BFC 就是页面上的一个隔离的独立容器，里外互相不影响，产生了一种“结界”效果。可以用来解决**父子 margin 重叠的问题**，在**父元素上新建 BFC**即可。
- 同一个 BFC 中的**相邻块级盒之间的垂直外边距会合并**，如蓝色块的 margin-bottom 和红色块的的 margin-top 都是 80px，它们的距离最后是 80px，不是 160px。
- 计算 BFC 的高度时，会计算所有子元素，连浮动元素也参与计算，故可以用来清除浮动。如计算红色块的高度，因为其是一个新的 BFC，所以浮动黑块也参与计算；需要注意的是**计算 html 高度的时候浮动元素也会参与计算**。
- 当元素不是 BFC 的子元素的时候，浮动元素高度不参与 BFC 计算，如计算蓝色的高度，因为其没有建立 BFC，故 BFC1-1 不会参与计算，需要注意的是**如果浮动元素它的上一级 BFC 是 html 的话，在计算 body 的高度，则浮动不会参与计算，因为 body 没有建立 BFC**。

## IFC

IFC(Inline Formatting Context)，IFC 和 BFC 都是虚拟概念。BFC 可能和某一个具体产生 BFC 的元素还有关系，而 IFC 则更玄乎了。它来规定同一行盒子的宽高、垂直和水平排列方式等，虽然是虚拟概念，但是它会影响到 containing block 的排列和大小。在 CSS 规范中也解释了 IFC 的 I 不是指 inline box，而是 inline-level box，它不包括 inline-block inline-table 等，因为它们遵循的是 BFC。

> Inline-level boxes that are not inline boxes (such as replaced inline-level elements, inline-block elements, and inline-table elements) are called atomic inline-level boxes because they participate in their inline formatting context as a single opaque box.

### IFC 特点

- 在一个 IFC 中，盒是一个接一个水平放置的，从包含块的顶部开始
- 这些盒之间的**水平**margin，border 和 padding**都有效**。
- 盒可能以不同的方式垂直对齐，以它们的底部或者顶部对齐，或者以它们里面的文本的基线对齐。

### 行盒(line box)

同一行的 inline box 组成的盒子叫做行盒(line box)，这是一个完完全全的虚拟概念，并不存在实际元素与其对应，如下图的绿色框所示。

- **宽度**：line box 的宽度由包含块和 float 情况决定，一般来说，line box 的宽度等于包含块两边之间的宽度，然而 float 可以插入到包含块和 line box 边之间，如果有 float，那么的宽度会比没有 float 时小。

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/EQ4czq.jpg'/>

- **高度**：line box 的高度由 line-height 决定，而 line box 之间的高度各不相同(比如只含文本的 line box 高度与包含图片的 line box 高度之间)。
- **垂直**：line box 的高度能够容纳它包含的所有 box，当 box 的高度小于 line box 的高度时(例如盒是 baseline 对齐)，盒的竖直对齐方式由 vertical-align 属性决定。
- **水平**：当一行的行内级盒的总宽度小于它们所在的 line box 的宽度时，它们在行盒里的水平分布由 text-align 属性决定。如果该属性值为 justify，浏览器可能会拉伸行内盒（不包括 inline-table 和 inline-block 盒）里的空白和字间距。

Demo: [line box 与 float，vertical-align，text-align](https://codepen.io/muwenzi/pen/ZdrmKZ&sa=D&ust=1571373688507000)

### 行内盒(inline box)

一个 inline box 是一个特殊的 line box，其内容参与了它的包含行的 IFC

- **换行**：当一个 inline box 超出一个 line box 的宽度时，它会被分成几个盒，并且这些盒会跨多 line box 分布。
- **溢出**：如果一个 inline-block 无法分割（例如，如果该 inline box 含有一个单个字符，或者特定语言的单词分隔规则不允许在该 inline box 里分隔，或如果该 inline box 受到了一个值为 nowrap 或者 pre 的 white-space 的影响），那么该 inline box 会从 line box 溢出
- 当一个 inline box 被分割后，margin，border 和 padding 在发生分割的地方（或者在任何分割处，如果有多处的话）不会有可视化效果
- 同一个 line box 里的 inline box 也可能因为双向（bidirectional）文本处理而被分割成几个盒

Demo: [inline box 与换行，溢出](https://codepen.io/muwenzi/pen/jjZJyv&sa=D&ust=1571373688509000)

### 行高

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/HNnrga.png'/>

如图，我们就知道了，在 CSS 中，line-height 不是相邻文本行间上一个 baseline 与下一文本行 baseline 之间的距离，而是 line box 的高度，也就是相邻文本行间底线的距离。

https://codepen.io/muwenzi/pen/qzxwZX

```js
line-height = content area + vertical spacing
```

需要注意的是,content area 不等于 font-size,只有在 simsun(宋体)下,两者相等

通过上面几个例子,可以得出以下结论:

- 计算 line box 中每个行内级盒的高度时,对于可替换元素,inline-block 元素和 inline-table 元素,这个值就是其 margin box 的高度;对于 inline box,这个值是其 line-height
- 行内级盒是根据其 vertical-align 属性竖直对齐的.如果它们是 top 或者 bottom 对齐,它们必须对齐得让 line box 高度最小化.如果这样的盒足够高,存在多个解,而 CSS 2.1 没有定义 line box 基线的位置
- line box 高度是最高的盒的 top 与最低的盒的 bottom 之间的距离

空行内元素生成空的 inline box,这些盒仍然具有 margin,padding,border 和 line height,并因此会影响这些计算,就像有内容的元素一样

https://codepen.io/muwenzi/pen/LKQaqW

在例 1 中，我们知道了**图片是基于 baseline 对齐**的，所以行高影响的是文本的高度，而不是图片的高度。

在例 2 中，我们放置了单张图片，在父容器使用 text-align:center，图片受到影响，后面的几个例子是图片去除缝隙的解决方案,分别是:

- 图片 display:block
- 图片 vertical-align:bottom
- 父元素设置 line-height:0 原因是当 line-height:0 时,行盒的基线会上移

补充：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cOGAiu.jpg'/>
