---
title: 垂直居中
---

import Img from '@site/src/components/Img';

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/qJ6qBL.png'/>

## 1. padding

[在线 Demo](https://codepen.io/muwenzi/pen/bGGBYaO)

<Img width="500" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/3oWPbs.png'/>

```css
.container {
  padding-top: 30px;
  padding-bottom: 30px;
}
```

:::tip

容器高度已知， `padding` 其实根本上就不存在居中的能力，但可以恰好算出位置，但最好不要这样做。

:::

:::tip

容器高度未知，无论是单行还是多行都可以使用这个方法。

:::

## 2. line-height

`line-height` 这种方式非常具有局限性，文本不会换行(`nowarp`)的情况下，你可以使用 `line-height`，让其与 `height` 相等去对齐文本，[在线 Demo](https://codepen.io/muwenzi/pen/MWWbOVW)

<Img width="720" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/auobxV.png'/>

```css
.container {
  height: 100px; /* must have */
  line-height: 100px;
  white-space: nowrap;
}
```

如果子元素超出宽度的话，将会出现问题：

<Img width="650" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/xHYiDR.png'/>

```css
.container {
  height: 100px;
  width: 230px; /* set fixed width */
  line-height: 100px;
  white-space: nowrap;
}
```

## 3. table-cell

可以让这些文字的容器按 `display: table-cell` 显示，然后设置文字的`vertical-align` 属性对齐，就像 table 那样，[在线 Demo](https://codepen.io/muwenzi/pen/XWWNzqd)

<Img width="450" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/2tO5O2.png'/>

```css
.container {
  display: table-cell;
  vertical-align: middle;
}
```

:::tip

只有元素属于 `inline` 或是 `inline-block` (`table-cell` 也可以理解为 `inline-block`)，其身上的 `vertical-align` 属性才会起作用。

:::

:::caution

如果对 `table-cell` 元素设置 `margin`, 那么将会无效。

:::

> all elements, except elements with table `display` types other than `table-caption`, `table` and `inline-table`. It also applies to `::first-letter`. — [margin – CSS | MSDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)

最好在外面包裹一层 `table`:

```css
.container-parent {
  display: table;
}
```

## 4. flex

一个 flex-child 可以很轻易的在 flex-parent 里垂直居中，[在线 Demo](https://codepen.io/muwenzi/pen/ExxNbpN)：

<Img width="500" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/sgXzzm.png'/>

行内元素

```css
.container {
  height: 230px;
  display: flex;
  flex-wrap: wrap; /* must have */
  align-content: center; /* 多行副轴对齐方式 */
}
```

块级元素

```css
.container {
  height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

## 5. absolute

```css
.container {
  position: relative;
}
.self {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

:::caution

绝对定位可以让元素块状化。

:::
