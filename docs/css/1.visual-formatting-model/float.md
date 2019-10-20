---
title: 浮动
sidebar_label: 浮动
---

import Img from '../../../src/components/Img'
import Hint from '../../../src/components/Hint'

## float 的影响

同一附属于父元素的子元素，都进行float的话，它们会在同一层（同一个常规流），注意float会脱离文本流（Content Flow），因为浮动本身就不是常规流的定位方案，那它肯定也会脱离常规流。

<Hint type="tip">只脱离常规流，不脱离文本流</Hint>

<Hint type="warning">浮动可以让元素块状化。</Hint>

[demo](https://codepen.io/muwenzi/pen/OeQWYa)

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/56ioUC.jpg'/>

左边蓝色的 div 使用 `float:left` 脱离了文档流，跟在后面的h2和p的盒子都当做没看到这个div的样子去定位，所以他们都顶着浏览器左边和顶部的边框。但是有趣的是，h2和p里面的文本（属于content flow）却都看到了这个被float的div，在自己的盒子里往右推，飘到了蓝色div的边上。这就是float的特性，其他盒子看不见被float的元素，但是其他盒子里的文本看得见。

<Hint type="warning">跟在浮动后面的盒子要是 block box，如果是 inline box 则会遵循 IFC 规则，其左边会紧挨着蓝色 div 的右边。</Hint>

<Img width="300" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/HKyIQz.jpg'/>

脱离常规流，也就是将元素从普通的布局排版中拿走，其他盒子在定位的时候，会当做脱离常规流的元素不存在而进行定位。需要注意的是，使用float脱离常规流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在周围。而对于使用absolute脱离常规流的元素，其他盒子与其他盒子内的文本都会无视它。

## 清除浮动

### 方案一：clear: both

clear 属性是让block-level元素自身不能和前面的浮动元素相邻。

```less
// 由于是after，所以加的是父元素上面
clear:after {
   content: "";
   display: block; // after默认是inline
   clear: both;
   height: 0;
}
```

有一定局限性：https://demo.cssworld.cn/6/2-1.php

### 方案二：overflow: hidden

生成新的BFC

[demo演示](https://codepen.io/ustc-han/pen/XLBWaY)
