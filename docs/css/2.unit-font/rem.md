---
title: rem
sidebar_label: rem
---

import Img from '../../../src/components/Img'
import Hint from '../../../src/components/Hint'

## 与 em 的区别

rem 这个单位是目前做多端适配的时候，用得非常多的一个单位，尤其是在适配各种移动设备小屏幕方面。

rem 是 CSS3 新增的一个相对单位（root em），这个单位引起了广泛关注。这个单位与 em 有什么区别呢？区别在于使用 rem 为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素，这个基准不会像em变来变去了。这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应，除了IE8不支持，其他支持。

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Rqpn1b.jpg'/>

## px 与 rem 的选择？

- 对于桌面浏览器端开发，不需要做适配的，使用 px 即可。
- 对于需要适配各种移动设备，使用 rem 。
- 当用作图片或者一些不能缩放的展示时，必须要使用固定的 px 值，因为缩放可能会导致图片压缩变形等。

## px 转 rem

主要两个方案：
- 自己写，需要考虑各个移动端的屏幕化分和 base font-size
- 使用第三方 [postcss plugin](https://github.com/cuth/postcss-pxtorem) / [webpack loader](https://github.com/songsiqi/px2rem)
