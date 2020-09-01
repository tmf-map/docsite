---
title: getBoundingClientRect
---

## overview

`Element.getBoundingClientRect() ` 方法返回元素的宽高和其相对于视口的位置（top right bottom left），如果元素是一个不规则的图形，返回的结果是可以包含完整元素的最小矩形。如下图所示：

- 规则矩形

<Img width="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200831210220.png" />

- 部分再在视窗内

<Img width="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200831212515.png" />

- 非规则图形

<Img width="600" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200831210304.png" />

## Syntax

```js
domRect = element.getBoundingClientRect();
```

使用 element.getBoundingClientRect()所获得的 `top` `right` `bottom` `left`的值会考虑元素在 viewport 内的滚动操作，当元素发生滚动时，相对视口的位置的值也会发生改变。

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

其中的 window.pageXOffset 和 window.pageYOffset 分别是 `window.scrollX` 和 `window.scrollY`的别名，两者是相等的，但是 window.pageXOffset 和 window.pageYOffset 具有较好的兼容性。

window.pageXOffset 表示文档/页面水平方向滚动的像素值。其加上元素到视窗的水平距离，可以得到元素到整个网页左上角的水平距离。

window.pageYOffset 表示文档/页面垂直方向滚动的像素值。其加上元素到视窗的垂直距离，可以得到元素到整个网页左上角的垂直距离。

当不支持 window.pageXOffset 时，可以使用 document.documentElement.scrollTop（有 DOCTYPE）来获取元素内卷的像素值，如果不支持可以尝试使用 document.body.parentNode.scrollTop 获取，如果还是无效的话，说明 html 文档没有声明 DOCTYPE，此时可以使用 document.body.scrollTop。

### 判断元素是否在可视区域内

判断元素是否在可视区域内很简单，只需要判断元素的 top 值是否小于视窗的高度并且 bottom 的值是否大于 0 即可。

```js
function isElView(el) {
  let top = el.getBoundingClientRect().top;

  let bottom = el.getBoundingClientRect().bottom;

  // 浏览器视窗高度
  let se = document.documentElement.clientHeight;

  return top < se && bottom > 0;
}
```

参考链接

1. [MDN 文档--getBoundingClientRect](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)
1. [getBoundingClientRect 的用法, by 椰子糖糖发射机](https://juejin.im/post/6844903888902963213)
1. [你真的会用 getBoundingClientRect 吗？,by zuopf769](https://github.com/zuopf769/notebook/blob/master/fe/%E4%BD%A0%E7%9C%9F%E7%9A%84%E4%BC%9A%E7%94%A8getBoundingClientRect%E5%90%97/README.md)
