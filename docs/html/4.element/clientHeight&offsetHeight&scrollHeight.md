---
title: clientHeight & offsetHeight & scrollHeight
---

本文以 `clientHeight & offsetHeight & scrollHeight` 为例来介绍三者的区别，与其对应的 `clientWidth & offsetWidth & scrollWidth`道理相同，可以类推。

## clientHeight

`element.clientHeigth` 代表元素内部的高度，高度值为`height + padding（上下） - height of horizontal scrollbar (if present)`，`clientHeigth`的值与元素的`border`和`margin`无关。

如下图所示，由于元素有`padding-top`，没有`padding-bottom`和水平滚动条，所以`element.clientHeigth === height + padding-top`；由于元素存在垂直滚动条，所以在计算`element.clientWidth`的时候不包括滚动条的宽度。

<Img w="580" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/iaY83D.png' alt='iaY83D'/>

## offsetHeight

`element.offsetHeight` 在标准盒模型下，是等于`height + padding（上下） + border-width`的，如果设置了`box-sizing: border-box`，元素的 height 即为设置的`height`。`offsetHeight`的值与元素的`margin`无关，且不需要减去滚动条高度。

如下图所示，由于元素存在`padding-top`、`border-top`和`border-bottom`，没有`padding-bottom`，所以`offsetHeight === height + padding-top + border-top + border-bottom`。

<Img w="580" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/myXyiL.png' alt='myXyiL'/>

当存在垂直滚动条的时候，滚动条会挤占`width`的空间，例如元素设置的`width: 100px`，当出现宽度为`5px`的滚动条时，元素的`width`的值会变为`95px`。

在一般情况下， `offsetHeight === getBoundingClientRect().height`，两者的详细关系，可以查看[getBoundingClientRect](http://localhost:3000/docs/html/3.element/getBoundingClientRect#width--offsetwidth)。

## scrollHeight

`scrollHeight`代表了整个元素内容的真实高度。即使当前使用了滚动条，只可见的只有元素的部分内容，`scrollHeight`也会返回元素内容的真实高度。

如下图所示，由于元素内容超出了外面容器的高度，元素内容溢出，出现了垂直方向的滚动条，可见的只有元素的部分内容，但是与这些无关，`scrollHeight`依旧会返回元素内容的真实高度。

<Img w="610" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/6zqOLK.png' alt='6zqOLK'/>

## Reference

1. [搞清 clientHeight、offsetHeight、scrollHeight、offsetTop、scrollTop, by zsxrping](https://www.imooc.com/article/17571)
1. [clientWidth 和 getBoundingClientRect, by Qz](https://qinzhen001.github.io/2017/11/29/clientWidth%E5%92%8CgetBoundingClientRect-myblog/)
1. [Element.clientHeight](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeigh)
1. [HTMLElement.offsetHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetHeight)
1. [Element.scrollHeight](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight)
