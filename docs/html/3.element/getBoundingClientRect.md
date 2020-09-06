---
title: getBoundingClientRect
---

## Overview

`Element.getBoundingClientRect()` 方法返回元素的宽高和其相对于视窗[Viewport](/docs/css/2.unit-font/viewport#视区-viewport)的位置（`top` `right` `bottom` `left`），元素与视窗的关系，如下图所示：

<Img width="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200831210220.png" />

## Syntax

```js
domRect = element.getBoundingClientRect();
```

:::tip

使用 `element.getBoundingClientRect()`所返回的 `top` `right` `bottom` `left`的值会考虑元素在 Viewport 内的滚动操作，当元素发生滚动时，相对视口的位置的值也会发生改变。

:::

## 非矩形元素

如果元素是一个非矩形的图形，例如元素可能是个五角星、圆或者椭圆之类的非矩形元素，此时返回的结果是以**能包含完整元素的最小矩形**为基准的。如下图：

<Img width="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200831210304.png" />

## Application

### 获取元素相对于整个网页左上角定位的属性值

- 水平方向

```js
var x =
  this.getBoundingClientRect().left + (window.pageXOffset !== undefined)
    ? window.pageXOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollLeft;
```

- 垂直方向

```js
var y =
  this.getBoundingClientRect().top + (window.pageYOffset !== undefined)
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
```

其中的 `window.pageXOffset` 和 `window.pageYOffset` 分别是 `window.scrollX` 和 `window.scrollY`的别名，两者是相等的，但是 window.pageXOffset 和 window.pageYOffset 具有较好的兼容性。

`window.pageXOffset` 表示文档/页面水平方向滚动的像素值。其加上元素到视窗的水平距离，可以得到元素到整个网页左上角的水平距离。

`window.pageYOffset` 表示文档/页面垂直方向滚动的像素值。其加上元素到视窗的垂直距离，可以得到元素到整个网页左上角的垂直距离。

当不支持 `window.pageXOffset`时，可以使用 `document.documentElement.scrollTop`（有 DOCTYPE）来获取元素内卷的像素值，如果不支持可以尝试使用 `document.body.parentNode.scrollTop` 获取，如果还是无效的话，说明 html 文档没有声明 DOCTYPE，此时可以使用 `document.body.scrollTop`。

### 判断元素是否在可视区域内

视窗的宽高的计算如下：

```js
const viewWidth = window.innerWidth || document.documentElement.clientWidth;
const viewHeight = window.innerHeight || document.documentElement.clientHeight;
```

元素与视图的关系（垂直方向），分为以下几种：

1. 元素还没进入到视图中，`top > viewHeight`。
1. 当元素部分进入视图时， `top > 0` 但小于视窗的高度 `viewHeight`，此时`bottom > 0`（如下图图左）。
1. 当元素部分移出视图时，`top` 值为负数，依旧小于视窗的高度 `viewHeight`，此时`bottom > 0`（如下图图右）。
1. 当元素完全离开视图后，`bottom < 0`。

<Img width="800" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200906115028.png" />

根据上面的 2 和 3，判断元素是否在可视区域内很简单，只需要判断元素的 `top < viewHeight && bottom > 0` 即可。

```js
function isInViewPort(element) {
  const {top, bottom} = element.getBoundingClientRect();
  const viewHeight =
    window.innerHeight || document.documentElement.clientHeight;
  return top < clientHeight && bottom > 0;
}
```

:::tip 此处只考虑了在垂直方向上，元素是否在视窗内，如果还要考虑水平移动，需要对 left 和 right 进行判断。 :::

## 参考链接

1. [MDN 文档--getBoundingClientRect](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)
1. [getBoundingClientRect 的用法, by 椰子糖糖发射机](https://juejin.im/post/6844903888902963213)
1. [你真的会用 getBoundingClientRect 吗？,by zuopf769](https://github.com/zuopf769/notebook/blob/master/fe/%E4%BD%A0%E7%9C%9F%E7%9A%84%E4%BC%9A%E7%94%A8getBoundingClientRect%E5%90%97/README.md)
1. [判断元素是否在视窗之内](https://cloud.tencent.com/developer/article/1548752)
