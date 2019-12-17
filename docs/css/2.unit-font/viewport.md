---
title: 'vh/vw'
sidebar_label: 'vh/vw'
---

import Img from '../../../src/components/Img'; import Hint from '../../../src/components/Hint';

## 视区 viewport

有些文章直译成“视口”，我觉得太挫了，中文你都看不懂是啥意思，翻译成视窗和视区还行，不过视区容易和市区谐音。

浏览器一般会给用户提供一个视区（屏幕上的一个窗口或者视图区域，即网页中视线可见区域），用户通过它来浏览网页。viewport 尺寸变化时，浏览器可能会改变文档的布局，比如我调节浏览器的大小。

当视区比渲染文档的画布区域（可以看成是整个网页区域）小时，浏览器应该提供一种滚动机制。说人话就是当网页过长时，视区只能显示局部网页的时候，网页要可以滚动浏览。图中绿色部分即视区范围：

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/kqJMh6.jpg'/>

viewport 的 meta 标签...

## vh/vw

v 指视窗/视区，那我们得首先明确 vh/vw 指的是什么？[在线 Demo](https://www.zhangxinxu.com/study/201209/vw-vh-to-pixel.html)

```text
vw ~ window.innerWidth
vh ~ window.innerHeight
```

- **vw**: 1vw = 视口宽度的 1%
- **vh**: 1vh = 视口高度的 1%
- **vmin**: 选取 vw 和 vh 中最小的那个
- **vmax**: 选取 vw 和 vh 中最大的那个

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/4h4phi.jpg'/>

## calc()

用于动态计算长度值。

- 运算符前后都需要保留一个空格，例如：`width: calc(100% - 10px)`，%不一定在前；
- 任何长度值都可以使用 `calc()` 函数进行计算；
- calc() 函数支持 `"+", "-", "*", "/"` 运算；
- calc() 函数使用标准的数学运算优先级规则；

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ej1QJV.jpg'/>
