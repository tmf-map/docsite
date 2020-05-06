---
title: 列布局
sidebar_label: 列布局
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## 两列布局

常见的两列布局有：PX-AUTO, AUTO-PX, 如果使用 flex 进行布局话，那基本上就是一种布局，另外一种通过 `flex-direction` 属性调整即可（DOM 保持不变的情况下）。[在线 Demo](https://codepen.io/muwenzi/pen/WqywJr)

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/NGgZLD.jpg'/>

<Tabs defaultValue="html" values={[{label: 'HTML', value: 'html'}, {label: 'CSS', value: 'css'}] }>

<TabItem value="html">

```html
<main>
  <div class="px">PX</div>
  <div class="auto">AUTO</div>
</main>
```

</TabItem>
<TabItem value="css">

```css
main {
  display: flex;
}
.px {
  width: 200px;
  flex-shrink: 0; /* must have */
}
.auto {
  flex-grow: 1;
}
```

</TabItem>
</Tabs>

如果让 DOM 中的 AUTO 先渲染的话，在 `main` 上面加一句：`flex-direction: row-reverse;` 即可：

<Tabs defaultValue="html" values={[{label: 'HTML', value: 'html'}, {label: 'CSS', value: 'css'}]}>

<TabItem value="html">

```html
<main>
  <div class="auto">AUTO</div>
  <div class="px">PX</div>
</main>
```

</TabItem>
<TabItem value="css">

```css
main {
  display: flex;
  flex-direction: row-reverse;
}
.px {
  width: 200px;
  flex-shrink: 0; /* must have */
}
.auto {
  flex-grow: 1;
}
```

</TabItem>
</Tabs>

如果 DOM 结构如上所示，但不加 `flex-direction: row-reverse;` 的话，其实就是 AUTO-PX 布局：

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/83imG8.jpg'/>

:::tip

在子元素上使用 `order` 属性来调整顺序也能达到同样目的。

:::

## 三列布局

常见的三列布局有：PX1-AUTO-PX2, AUTO-PX1-PX2, PX1-PX2-AUTO, 如果使用 flex 进行布局话，那基本上就是一种布局，另外两种通过 `order` 属性调整即可。[在线 Demo](https://codepen.io/muwenzi/pen/xozVoa)

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ema3ul.jpg'/>

<Tabs defaultValue="html" values={[{label: 'HTML', value: 'html' }, {label: 'CSS', value: 'css'}]}>

<TabItem value="html">

```html
<main>
  <div class="px1">PX1</div>
  <div class="auto">AUTO</div>
  <div class="px2">PX2</div>
</main>
```

</TabItem>
<TabItem value="css">

```css
main {
  display: flex;
}
.px1,
.px2 {
  width: 200px;
  flex-shrink: 0; /* must have */
}
.auto {
  flex-grow: 1;
}
```

</TabItem>
</Tabs>

如果让 DOM 中的 AUTO 先渲染的话，对子元素使用 `order` 属性即可，[在线 Demo](https://codepen.io/muwenzi/pen/BgVzyK) 。

<Tabs defaultValue="html" values={[{label: 'HTML', value: 'html'}, { label: 'CSS', value: 'css'}]}>

<TabItem value="html">

```html
<main>
  <div class="auto">AUTO</div>
  <div class="px1">PX1</div>
  <div class="px2">PX2</div>
</main>
```

</TabItem>
<TabItem value="css">

```css
main {
  display: flex;
}
.px1,
.px2 {
  width: 200px;
  flex-shrink: 0; /* must have */
}
.auto {
  flex-grow: 1;
}
.px1 {
  order: -1;
}
```

</TabItem>
</Tabs>

如果 DOM 结构如上所示，但不加 `order` 的话，其实就是 AUTO-PX1-PX2 布局：

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/dltsZx.jpg'/>

同样保持 DOM 结构如上所示，但在 `AUTO` 中加上 `order: 1` 其实就是 PX1-PX1-AUTO 布局：

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/H8SZ3y.jpg'/>
