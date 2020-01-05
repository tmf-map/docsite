---
title: '%'
sidebar_label: '%'
---

import Img from '../../../src/components/Img'; import Hint from '../../../src/components/Hint';

百分比是一定有其对应的参照值的。也就是说，百分比值是一种相对值，任何时候要分析它的效果，都需要正确找到它的参照。

## 可用百分比值的常见 CSS 属性

### width & height

宽和高在使用百分比值时，其参照都是元素的包含块（Containing Block，详情）。width 参照包含块的宽度，height 参照包含块的高度。在大部分情况下，**包含块就是父元素的内容区（盒模型里的 content）**。

我们有时会写这样的代码 `width:100%; height:100%;` 来实现尺寸和父元素一致。但会发现有时候宽度是符合意思（100%）的，但高度却没有效果。请看下面这个示例：

```html
<div class="grandpa">
  <div class="parent">
    <div class="child"></div>
  </div>
</div>
```

```css
.grandpa {
  border: 1px dotted #ee3979;
  width: 100px;
  height: 100px;
}
.parent {
  height: 100%;
}
.child {
  background-color: #98d4fb;
  height: 70%;
}
```

<Img width="530" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/6HhVta.png'/>

可以看到，直接父元素（包含块）是否有明确的高度定义，会影响 height 为百分比值时的结果。

<Hint type="tip">如果直接父元素 `height` 为 `auto` ，只要子元素在文档流中（即 `position` 不等于 `fixed` 或者 `absolute` ），那子元素 `height:100%` 会完全就被忽略了，等同于 `auto` 初始默认值。</Hint>

如果元素是根元素（`<html>`），它的高度等于视窗高度。所以，`<html>` 标签的高度定义百分比总是有效的，而如果你希望在 `<body>` 里也用高度百分比，就一定要先为 `<html>` 定义明确的高度。这就是为什么在之前的固定页脚一文中，有以下这样写法：

```css
html,
body {
  height: 100%;
}
```

为什么？如果包含块（即父元素）的高度没有显式指定（即高度由内容决定），并且该元素不是绝对定位，则计算值为 auto（这是计算值，是指渲染之后解释的值，并不是我们设置 height: auto 所指的值）。一句话总结就是：因为解释成了 auto。要知道，auto 和百分比计算，肯定是算不了的：

```text
'auto' * 100/100 = NaN
```

此时，他们的计算结果是 NaN,这就是父元素没有设置高度时，子元素高度百分比不生效的原因了。

### margin & padding

这两个属性属于混合属性，也通过一个例子说明：

<Img width="530" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/hLkljH.png'/>

<Hint type="tip">对于 `margin` 和 `padding` ，其任意方向的百分比值，参照都是**包含块的宽度**。</Hint>

为什么会多个方向都取包含块的宽度作为参照呢？在我看来，包含块的宽度在块布局的排版中是最有用的（想象一下 word 里输入文字，到宽度边缘后换行的场景），对应的，水平方向的内外边距一定要参照包含块的宽度。再考虑垂直方向的内外边距，它们如果不和水平方向取相同的参照物，就会因为不一致而很难使用。所以，总体来说，统一以包含块的宽度作为参考，会具有相对最好的可用性。

严格地说，参照是包含块的宽度，是在样式属性 writing-mode 为默认值时的情况。不过这个属性极少被用到，所以在此不做考虑。

### border-radius

你也许见过有人用下面的代码来让一个矩形变成刚好的圆形（请体会这个“刚好”）：

```css
.circle {
  border-radius: 50%;
}
```

<Hint type="tip">如果一个元素的 `border-radius` 为百分比值，其参照物是这个元素自身的尺寸。</Hint>

也就是说，假如这个元素宽是 60px，高是 40px（border-box 的尺寸），那么 `border-radius:50%` 的结果等同于 `border-radius: 30px / 20px` 。

如果你还疑惑这里带 `/` 的圆角写法，请查看 [MDN 对 border-radius 的说明](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius)。

### background-position

`background-position` 的初始值就是百分比值 `0% 0%` 。下面是一个使用示例：

<Img width="530" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ydDH2X.png'/>

<Hint type="tip">`background-position` 的百分比值，取的参照是一个减法计算值，由放置背景图的区域尺寸，减去背景图的尺寸得到，可以为负值。</Hint>

对照上面的示例，思考一下，应该可以感受到，以这个减法计算值为参照的话，正好可以符合我们感官上对背景图位置的理解。

这个属性包括水平位置和垂直位置，它们分别参照的是宽度减法计算值和高度减法计算值。

你可能注意到了上面示例的最后一个竟然写了 4 个值（一般都只用 2 个值）。关于它的意义，请查看 [W3C 的 background-position](http://www.w3.org/TR/css3-background/#background-position) 。

### font-size

<Hint type="tip">`font-size` 参照是直接父元素的 `font-size`。</Hint>

例如，一个元素的直接父元素的 `font-size` 是 14px，无论这个是直接定义的，还是继承得到的，当该元素定义 `font-size: 100%` ，获得的效果就是 `font-size: 14px` 。

### line-height

<Hint type="tip">`line-height` 为百分比其参照是元素自身的 `font-size` 。</Hint>

例如，一个元素的 `font-size` 是 12px ，那么 `line-height: 150%` 的效果是 `line-height: 18px` 。

<Hint type="tip">`line-height: 1.5` 和 `line-height: 150%` 对于当前元素效果是一样的。</Hint>

#### 百分比与无单位值之间的区别

line-height 为百分比

```css
body {
  font-size: 14px;
  line-height: 150%;
}
p {
  font-size: 26px;
}

/* 结果就是 */
body {
  line-height: 21px; /* 14*150%=21 */
}
p {
  line-heigt: 21px; /* 继承父元素 */
}
```

line-height 为数值

```css
body {
  font-size: 14px;
  line-height: 1.5;
}
p {
  font-size: 26px;
}

/* 结果就是 */
body {
  line-height: 21px; /* 14*1.5=21 */
}
p {
  line-heigt: 39px; /* 26*1.5=39 */
}
```

<Hint type="good">`设置`line-height` 的推荐使用无单位，这样子元素继承的也是无单位的值，而不是计算后的特定值。</Hint>

### vertical-align

<Hint type="tip">`vertical-align` 为百分比其参照是元素自身的 `line-height` 。</Hint>

例如，一个元素的 `line-height` 是 30px，则 `vertical-align: 10%` 的效果是 `vertical-align: 3px` 。

<Hint type="warn">尽管 `vertical-align` 可以使用数字，百分比值，但浏览器兼容性差异较大，所以不推荐使用数字和百分比。</Hint>

### bottom, left, right, top

<Hint type="tip">这四个定位用的值是百分比时其参照是元素的包含块。left 和 right 是参照包含块的宽度，bottom 和 top 是参照包含块的高度。</Hint>

### transform: translate

<Hint type="tip">平移变换，在水平方向和垂直方向上也可以使用百分比，其参照是变换的边界框的尺寸（等于这个元素自己的 border-box 尺寸）。</Hint>

例如，一个宽度为 150px，高度为 100px 的元素，定义 transform:translate(50%, 50%)的效果是 transform:translate(75px, 50px);。

还可以补充一点，translate3d 对应是还有第三个维度的，但是，经过测试，最后的第 3 个值不可以使用百分比（否则样式定义无效）。至于为什么不可以参照呢，大概是因为那是神秘的第三维度吧…

如果你想要知道更多的百分比值在 css 属性中的可用情况及参照值，请参考 MDN 的 CSS percentage values。

## 百分比值的继承

<Hint type="warn">当百分比值用于可继承属性时，只有结合参照元素计算后的**绝对值会被继承**，而不是百分比值本身。</Hint>

例如，一个元素的 `font-size` 是 14px，并定义了 `line-height:150%` ，那么该元素的下一级子元素继承到的 `line-height` 就是 21px ，而不会再和子元素自己的 `font-size` 有关。

## 参考资料

1. [CSS line-height 百分比和数值的区别, by: zhongxia245](https://github.com/zhongxia245/blog/issues/57)
