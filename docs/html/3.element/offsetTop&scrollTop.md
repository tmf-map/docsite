---
title: offsetTop & scrollTop
---

## offsetTop & offsetLeft

`element.offsetTop` 是个只读属性，它代表了元素**顶部外边距（`border`外侧）**到 `offsetParent` 元素的**顶部内边距（`border`内侧）**。与`offsetTop`相关的属性为`offsetLeft`，代表了元素到 `offsetParent` 元素的**左部内边距**。

`element.offsetParent`：返回距离元素最近的一个**具有定位的祖先元素**（relative，absolute，fixed），若不存在`offsetParent`为返回`body`。

`offsetTop`和`offsetLeft`返回值的示意图如下所示：

<Img width="800" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200926183644.png" />

图左是当父元素设置了`position`属性时，父元素即为`offsetParent`，返回值即元素到父元素内边距的距离。图右是元素的祖先元素都没有`position`属性，两者的返回值是根据`body`元素来定的。

## scrollTop & scrollLeft

`element.offsetTop`和 `element.offsetLeft`分别代编垂直方向和水平方向滚动（内卷）的像素值。当一个元素的内容没有产生垂直方向的滚动条，`scrollTop` 值为 0。同理，当没有水平方向的滚动条，`scrollLeft` 值为 0。

这两个属性值，都不是可读属性值，例如，可以如下设置`scrollTop`的值：

```js
// Set the number of pixels scrolled.
element.scrollTop = intValue;
```

:::tip

- 当元素不能滚动时，`scrollTop`会返回 0
- 当设置`scrollTop`的值小于 0，`scrollTop`会返回 0
- 如果设置了超出这个容器可滚动的值, scrollTop 会被设为最大值。

:::

`scrollTop`的示意图如下：

<Img width="400" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20200926185326.png" />

通过上图可以看出，`scrollTop`的返回值为元素内容顶部到**它对应的`viewport`**可见内容顶部的距离。

:::tip

当`scrollTop`被用于根元素`<html>`，此时它的返回值和`scrollY`是相同的，它的应用场景详见：[getBoundingClientRect-获取元素相对于整个网页左上角定位的属性值](/docs/html/3.element/getBoundingClientRect#%E8%8E%B7%E5%8F%96%E5%85%83%E7%B4%A0%E7%9B%B8%E5%AF%B9%E4%BA%8E%E6%95%B4%E4%B8%AA%E7%BD%91%E9%A1%B5%E5%B7%A6%E4%B8%8A%E8%A7%92%E5%AE%9A%E4%BD%8D%E7%9A%84%E5%B1%9E%E6%80%A7%E5%80%BC)

:::

## 参考链接

1. [Element.scrollTop -- MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop)
1. [HTMLElement.offsetTop-- MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop)
1. [搞清 clientHeight、offsetHeight、scrollHeight、offsetTop、scrollTop, by zsxrping](https://www.imooc.com/article/17571)
