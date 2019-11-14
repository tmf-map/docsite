---
title: 文档流
sidebar_label: 文档流
---

import Hint from '../../../src/components/Hint'
import Img from '../../../src/components/Img'

## 流 Flow

流实际上是CSS中的一种基本的定位和布局机制，流和现实世界的水流有异曲同工的表现。CSS世界的“流”似乎就是按照现实世界的“水流”创造的。

CSS世界构建的基石是HTML，而HTML最具代表的两个基石 `<div>` 和 `<span>` 正好是CSS世界中block-level 和 inline-level 的代表，它们对应的正是图中的盛水容器中的水和木头。

<Img width="450" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/S74EgO.jpg'/>

<Hint type="tip">所谓“流”，就是CSS世界中引导元素排列和定位的一条看不见的“水流”。</Hint>

## 文档流

文档流（Normal Flow, 也有翻译成 `普通流`, `常规流`）中的盒肯定属于某一个格式化上下文（Formatting Context），可能是 BFC 和 IFC ，但不能两者都是。

<Hint type="tip">简单点说，把格式化上下文看成是决定盒子详细排列布局的方案，盒子怎么排的。有两种方案，BFC 和 IFC ，每一种排列方案有其各自的规则和特点。</Hint>

那么有一个疑问，我们不是有block box 和inline box吗，它也规定了box的位置排列，一行一行排还是在一行里面一列一列排，那BFC/IFC又是什么鬼？

你要知道，总有一些box很独秀，就像人类中总有一些人异于常人。像浮动的盒子、绝对定位的盒子、inline-block、flex这些盒子，就是盒子中比较特殊的盒子。OK，那这些盒子的出现就不能用block box 和inline box 的特性来简简单单定义了，我们为它们做了一个新的划分，划分为BFC和IFC两大类，在原来的block box 和 inline box的基础上，再结合那些特殊的box，定义了一些新的计算高度、margin、位置排列等的一些规范。个人感觉其实BFC是主要的成因（因为这些特殊的盒子基本上都在BFC规范中），IFC是一种相对比较被动的存在，更多地是配合BFC。

另外注意规范中说的是：

> Boxes in the normal flow belong to a formatting context, which may be block or inline, but not both simultaneously.

文档流中的盒肯定属于某一个格式化上下文，但并不代表脱离文档流的盒子不属于某一个格式化上下文，比如浮动盒子和绝对定位的盒子，它们属于BFC。

## BFC

BFC(Block Formatting Context) 即块格式化上下文，是一种虚拟概念，可以理解称创建一个BFC就会产生一个“结界”，形成了一个封闭的空间，里面的人出不去，外面的人进不来，具有极强的防御力。

不是每一个block box都会创建一个BFC，创建BFC的也不一定是block box。不要以block box来看待BFC中的B，这在CSS规范中解释了这个B指的是block-level box('block', 'list-item', and 'table')，但block-level box并不仅仅指block box，说得再简单一点：

- BFC 的B不等于 block box，而是block-level box('block', 'list-item', and 'table')
- 只要创建了BFC，该box就可以设置宽高和margin等，毕竟要遵守BFC的规则。为了遵守规则，之前的display会按照如下表格转化成block-level box。这也解释了为什么float和绝对定位的inline box都可以设置宽高和margin。
- inline-block 的元素。

| Specified value                                                                                                                                       | Computed value |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| inline-table                                                                                                                                          | table          |
| inline, table-row-group, table-column, table-column-group, table-header-group, table-footer-group, table-row, table-cell, table-caption, inline-block | block          |
| 其它                                                                                                                                                  | 与指定值相同   |

BFC规则规定了在该BFC中boxes(包括：浮动的box，绝对定位的box，block coantainer box 以及其他 block box)排列布局方式，它在计算盒子高度，margin值计算等地方有区别于其他环境。

- **清除浮动**：由于BFC改变了正常box的宽高计算规则，所以它可以用来清除浮动。
- **去除父子margin重叠**：BFC元素是不会发生margin重叠的，因为margin重叠会影响外面元素。
- **自适应布局**：实现更健壮、更智能的自适应布局。

### 什么元素会触发产生一个（新）BFC？

https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context 

- 根元素 `<html>`
- 浮动
- 绝对定位（absolute或fixed）
- block containers(not block box): inline-block, table-cell, table-caption, flex, inline-flex
- block box: overflow不为visible

<Img width="300" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ZQe2wN.jpg'/>

Demo: https://codepen.io/muwenzi/pen/vqdJxz

### BFC 特点

- 内部盒子会在垂直方向排列，即行排，一行一行进行排列布局；每个盒的左外边界挨着包含块的左外边界（对于从右向左的格式化，右外边界挨着）。
- BFC就是页面上的一个隔离的独立容器，里外互相不影响，产生了一种“结界”效果。可以用来解决**父子margin重叠的问题**，在**父元素上新建BFC**即可。
- 同一个BFC中的**相邻块级盒之间的垂直外边距会合并**，如蓝色块的margin-bottom和红色块的的margin-top都是80px，它们的距离最后是80px，不是160px。
- 计算BFC的高度时，会计算所有子元素，连浮动元素也参与计算，故可以用来清除浮动。如计算红色块的高度，因为其是一个新的BFC，所以浮动黑块也参与计算；需要注意的是**计算html高度的时候浮动元素也会参与计算**。
- 当元素不是BFC的子元素的时候，浮动元素高度不参与BFC计算，如计算蓝色的高度，因为其没有建立BFC，故BFC1-1不会参与计算，需要注意的是**如果浮动元素它的上一级BFC是html的话，在计算body的高度，则浮动不会参与计算，因为body没有建立BFC**。

## IFC

IFC(Inline Formatting Context)，IFC和BFC都是虚拟概念。BFC可能和某一个具体产生BFC的元素还有关系，而IFC则更玄乎了。它来规定同一行盒子的宽高、垂直和水平排列方式等，虽然是虚拟概念，但是它会影响到containing block的排列和大小。在CSS规范中也解释了IFC的I不是指inline box，而是inline-level box，它不包括 inline-block inline-table等，因为它们遵循的是BFC。

> Inline-level boxes that are not inline boxes (such as replaced inline-level elements, inline-block elements, and inline-table elements) are called atomic inline-level boxes because they participate in their inline formatting context as a single opaque box.

### IFC 特点

- 在一个IFC中，盒是一个接一个水平放置的，从包含块的顶部开始
- 这些盒之间的**水平**margin，border和padding**都有效**。
- 盒可能以不同的方式垂直对齐，以它们的底部或者顶部对齐，或者以它们里面的文本的基线对齐。

### 行盒(line box)

同一行的 inline box 组成的盒子叫做行盒(line box)，这是一个完完全全的虚拟概念，并不存在实际元素与其对应，如下图的绿色框所示。

- **宽度**：line box的宽度由包含块和float情况决定，一般来说，line box的宽度等于包含块两边之间的宽度，然而float可以插入到包含块和line box边之间，如果有float，那么的宽度会比没有float时小。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/EQ4czq.jpg'/>

- **高度**：line box的高度由line-height决定，而line box之间的高度各不相同(比如只含文本的line box高度与包含图片的line box高度之间)。
- **垂直**：line box的高度能够容纳它包含的所有box，当box的高度小于line box的高度时(例如盒是baseline对齐)，盒的竖直对齐方式由vertical-align属性决定。
- **水平**：当一行的行内级盒的总宽度小于它们所在的line box的宽度时，它们在行盒里的水平分布由text-align属性决定。如果该属性值为justify，浏览器可能会拉伸行内盒（不包括inline-table和inline-block盒）里的空白和字间距。

Demo: [line box与float，vertical-align，text-align](https://codepen.io/muwenzi/pen/ZdrmKZ&sa=D&ust=1571373688507000)

### 行内盒(inline box)

一个inline box是一个特殊的line box，其内容参与了它的包含行的IFC

- **换行**：当一个inline box超出一个line box的宽度时，它会被分成几个盒，并且这些盒会跨多line box分布。
- **溢出**：如果一个inline-block无法分割（例如，如果该inline box含有一个单个字符，或者特定语言的单词分隔规则不允许在该inline box里分隔，或如果该inline box受到了一个值为nowrap或者pre的white-space的影响），那么该inline box会从line box溢出
- 当一个inline box被分割后，margin，border和padding在发生分割的地方（或者在任何分割处，如果有多处的话）不会有可视化效果
- 同一个line box里的inline box也可能因为双向（bidirectional）文本处理而被分割成几个盒

Demo: [inline box与换行，溢出](https://codepen.io/muwenzi/pen/jjZJyv&sa=D&ust=1571373688509000)

### 行高

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/HNnrga.png'/>

如图，我们就知道了，在CSS中，line-height 不是相邻文本行间上一个baseline与下一文本行baseline之间的距离，而是line box的高度，也就是相邻文本行间底线的距离。

https://codepen.io/muwenzi/pen/qzxwZX

```js
line-height = content area + vertical spacing
```

需要注意的是,content area不等于font-size,只有在simsun(宋体)下,两者相等

通过上面几个例子,可以得出以下结论:

- 计算line box中每个行内级盒的高度时,对于可替换元素,inline-block元素和inline-table元素,这个值就是其margin box的高度;对于inline box,这个值是其line-height
- 行内级盒是根据其vertical-align属性竖直对齐的.如果它们是top或者bottom对齐,它们必须对齐得让line box高度最小化.如果这样的盒足够高,存在多个解,而CSS 2.1没有定义line box基线的位置
- line box高度是最高的盒的top与最低的盒的bottom之间的距离

空行内元素生成空的inline box,这些盒仍然具有margin,padding,border和line height,并因此会影响这些计算,就像有内容的元素一样

https://codepen.io/muwenzi/pen/LKQaqW

在例1中，我们知道了**图片是基于baseline对齐**的，所以行高影响的是文本的高度，而不是图片的高度。

在例2中，我们放置了单张图片，在父容器使用text-align:center，图片受到影响，后面的几个例子是图片去除缝隙的解决方案,分别是:

- 图片display:block
- 图片vertical-align:bottom
- 父元素设置line-height:0 原因是当line-height:0时,行盒的基线会上移

补充：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cOGAiu.jpg'/>
