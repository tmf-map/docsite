---
title: 水平居中
sidebar_label: 水平居中
---

import Img from '../../../src/components/Img'
import Hint from '../../../src/components/Hint'

## 行级元素

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/YMZ0YS.png'/>

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/H4LgAg.png'/>

[在线 Demo](https://codepen.io/muwenzi/pen/NZaqGz) ，当需要居中的元素为行内元素时，你可以通过在其父元素设置如下 CSS 样式：

```css
.element-parent {
  text-align: center;
}
```

这种方法对 `display` 设置为 `inline`, `inline-*`(inline-block、inline-table、inline-flex) 的元素都有效。

<Hint type="warning">这种方法要求父元素必须是块级元素。</Hint>

还有一种方法就是 flex ，也很简单，可以防止忘记检查父元素是否是块级元素：

```css
.element-parent {
  display: flex;
  justify-content: center;
}
```

## 块级元素

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/EQnajP.png'/>

[在线 Demo](https://codepen.io/muwenzi/pen/ExxNgOp) ，对于块级元素你可以通过设置其 `margin` 属性，来达到水平居中的效果。你可以将其 `margin-left` 和 `margin-right` 为 `auto` 让它居中：

```css
.element-self {
  margin: 0 auto; /* 上下值可以根据实际情况灵活调整 */
}
```

这样浏览器就会根据**元素的宽度**自动为元素左右两边设定等宽的 `margin` ，来达到水平居中的效果。也可以使用 flex ，但稍微复杂一点：

```css
.element-parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

<Hint type="warning">元素需要设定 `width` 属性，否则元素的宽度会自动充满父元素，无法看出居中效果，就不存在相对父元素水平居中一说了。</Hint>
<Hint type="warning">如果元素设置 `float` 属性，会导致第一种方法失效，flex 虽然还有效，但文字也是居中的，某些场景下是有问题的。</Hint>

## 绝对定位元素

```css
.element-self {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```

## 浮动元素

如果只是单纯的浮动元素水平居中，使用 flex，绝对定位也可以达到效果，但如果考虑文本流环绕的问题的话，就需要稍微麻烦一点，主要分为两步：

1. 将浮动元素使用绝对定位，进行绝对定位居中
1. 在文字区域相应的设置浮动的伪类作为占位符

我们先讨论一种相对复杂的情况，比如想要实现下面这种文字环绕图片居中的效果：

<Img width="500" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Kigl7x.jpg'/>

我们可以通过使用浮动的伪元素占位符来实现。在左边中放置一个向右浮动的占位符，在右边中放置一个向左浮动的占位符。伪元素高度即图像的高度，每个宽度是图像宽度的一半。

```css
#l:before, #r:before { 
  content: ""; 
  width: 125px; 
  height: 250px; 
}
#l:before { 
  float: right; 
}
#r:before { 
  float: left; 
}
```

<Img width="500" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/2nZEmW.jpg'/>

<Hint type="tip">以上是相对复杂的浮动居中，对于一些简单的浮动居中，只需要使用一个浮动占位符即可。</Hint>

## 参考阅读

1. [css-tricks: Faking ‘float: center’ with Pseudo Elements, By Chris Coyier](https://css-tricks.com/float-center/)
