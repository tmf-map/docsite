---
title: Flex
sidebar_label: Flex
---

import Img from '../../../src/components/Img'; import Hint from '../../../src/components/Hint';

## 概览

[Flexbox 布局语法速查手册](http://www.webhek.com/apps/flex-cheatsheet/)

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Uff7mw.jpg'/>

## 盒子大小：flex

该部分是弹性盒子当中的精华所在，必须要掌握这几个概念，才能运用好 flex。flex 是 `flex-grow`, `flex-shrink`, `flex-basis` 的缩写初始值是 `0 1 auto` 。

<Hint type="good">flex 属性不要采用缩写的方式，最好明确定义是哪个属性的值。</Hint>

看下面这些[缺省的规则](https://www.w3.org/TR/css-flexbox-1/#flex-initial)，你能记得住吗。

```text
flex: 1 = flex: 1 1 0%
flex: 2 = flex: 2 1 0%
flex: initial = flex: 0 1 auto;
flex: auto = flex: 1 1 auto;
flex: none = flex: 0 0 auto; // 常用于固定尺寸 不伸缩
```

## 伸缩比例：flex-grow/flex-shrink

<img width="430" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Qzg5IF.jpg'/>

<img width="510" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/DsKEvq.jpg'/>

<Hint type="warn">弹性盒子中元素的总长度肯定不能超过盒子的长度，但可以小于盒子的长度。</Hint>

- 当元素的总长度过长时，所以 shrink 默认是 1，按照该元素长度在总长度中的占比进行收缩大小，计算公式稍复杂。
- 当弹性盒子空间过剩时，因为没有超过弹性盒子的长度，所以 grow 默认为 0，即空间多余就多余，不在乎是否刚好塞满，但就是不能超。 shrink 和 grow 理论上>=0 的 number 即可，但最好使用自然数(即零和正整数)。

## 初始尺寸：flex-basis

在进行弹性处理之余，其实有些场景我们更希望元素尺寸固定（这个固定指初始固定，并不代表完全不变，当其他盒子尺寸过大时候还会挤压该盒子，还需要 `flex-shrink` 进行配合），不需要进行弹性调整。设置元素尺寸除了 `width` 和 `height` 以外，flex 还提供了一个 `flex-basis` 属性。

`flex-basis` 设置的是元素在主轴上的初始尺寸，所谓的初始尺寸就是元素在 `flex-grow` 和 `flex-shrink` 生效前的尺寸，定义该项目在分配主轴空间之前提前获得的空间。

## 弹性布局优点

1. 高度自动填满父元素高度(`align-items: stretch`(default))
1. 不用把偏移值写死，因为其不需要偏移值， `order` 即可
1. 不用清除浮动，因为不需要浮动，即使有浮动，容器层 flex 也会新建 BFC
1. 较为方便的实现垂直居中

## 兼容性

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Ac3uy6.jpg'/>
