---
title: font
---

## 字体分类

在 Web 上应用字体，是一门技术，同时也是一门艺术. 由于计算机历史发展的原因，西文有大量优秀的字体可供选择，可对于中文来说就是一项挑战. 主流操作系统提供的本地中文字体极少，另一方面中文字体组成的特殊性，其体积过于庞大，无法良好地使用 webfont。所以编写健壮的 font-family 是一件需要深思熟虑的事情.

### 衬线和无衬线

- 衬（chèn）线：**serif**
- 无衬线/非衬线：**sans-serif** (sans: _prep_. 无,没有)

<Img width="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/CGcoCe.png'/>

何为`额外的装饰`，看下图对比：

<Img width="400" legend="图：上图为衬线字体，下图为非衬线字体" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/3IhQIU.jpg'/>

<Img width="400" legend="图：左图为衬线字体，右图为非衬线字体" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/KTxEta.jpg'/>

<Img width="400" legend="图：中日韩衬线字体与非衬线字体"src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/zRiiBr.jpg' />

但有时候还是会忘记有“额外的装饰”是衬线还是无衬线，所以我们还需要理解什么是“衬线”，如下图所示：

<Img width="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/4jBtO0.jpg' />

### 等宽字体（Monospace）

即每个字符的宽度一致，常用语代码编辑器中，可方便对齐代码。

<Img width="300" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/0S1WpF.jpg'/>

我们可以在代码编辑器，比如 VSCode 中使用 `Menlo` 或 `monospace`。

## 中文字体

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/chinese-font-history.jpg' alt='chinese-font-history'/>

抛开宋/明体长时间作为系统默认字体，所产生的审美疲劳，宋/明体相比黑体是更合适作为正文字体. 大多的宋/明体针对正文设计，横细直粗，造型方正，笔画在小字号的情况下，不会糊在一起，给人一种素雅的感觉. 而黑体笔画粗壮有力，引人注目，更适合作为标题使用，注意下面报纸上的字体：

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/S97nTd.png' />

但大部分人已经习惯在**网页**上阅读黑体，以及宋/明体在 `font-weight` 过大的情况下，显示效果还是不太理想. 所以正文默认提供黑体，可选择性的切换宋/明体。

## 参考资料

1. [中文排版需求, by 刘庆](https://img2.w3ctech.com/%E4%B8%AD%E6%96%87%E6%8E%92%E7%89%88%E9%9C%80%E6%B1%82-cssconf.pdf)
2. [「衬线」, by Childhood Chen](https://zhuanlan.zhihu.com/p/24434632)
3. [第一次接触字体，认识下 serif, by 刘瑞春](https://zhuanlan.zhihu.com/p/32961737)
4. [CSS 魔法堂：再次认识 font, by 肥仔 John](https://www.cnblogs.com/fsjohnhuang/p/4310533.html)
