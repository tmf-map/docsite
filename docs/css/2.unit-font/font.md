---
title: 字体
sidebar_label: 字体
---

import Img from '../../../src/components/Img'
import Hint from '../../../src/components/Hint'

## 字体类型

在 Web 上应用字体，是一门技术，同时也是一门艺术. 由于计算机历史发展的原因，西文有大量优秀的字体可供选择，可对于中文来说就是一项挑战. 主流操作系统提供的本地中文字体极少，另一方面中文字体组成的特殊性，其体积过于庞大，无法良好地使用 webfont. 所以编写健壮的 font-family 是一件需要深思熟虑的事情.

### 衬线和无衬线

<Img width="600" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/CGcoCe.png'/>

何为额外的装饰，看下图对比：

<Img width="400" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/3IhQIU.jpg'/>

总结一图以蔽之：

<Img width="400" align="center" legend="图：左图为衬线字体，右图为非衬线字体" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/KTxEta.jpg'/>

### 等宽字体

即每个字符的宽度一致，常用语代码编辑器中，可方便对齐代码。

<Img width="300" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/0S1WpF.jpg'/>

抛开宋/明体长时间作为系统默认字体，所产生的审美疲劳，宋/明体相比黑体是更合适作为内文字体. 大多的宋/明体针对内文设计，横细直粗，造型方正，笔画在小字号的情况下，不会糊在一起，给人一种素雅的感觉. 而黑体笔画粗壮有力，引人注目，更适合作为标题使用。

但大部分人已经习惯在网页上阅读黑体，以及宋/明体在字重过大的情况下，显示效果还是不太理想. 所以内文默认提供黑体，可选择性的切换宋/明体。

