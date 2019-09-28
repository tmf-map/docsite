---
id: pic-optimize
title: 图片优化
sidebar_label: 图片优化
---

## 不在盒子元素中缩放图片

我们会为了方便在一个200✖200的图片容器内直接使用一张400✖400的图片，我们甚至认为这样能让用户觉得图片更加清晰，其实不然，在普通的显示器上，用户并不会感到缩放后的大图更加清晰，但这一切却导致网页加速速度下降，同时照成带宽浪费，你可能不知道，一张200KB的图片和2M的图片的传输时间会是200ms和12s的差距（亲身经历，深受其害(┬＿┬)）。所以，当你需要用多大的图片时，就在服务器上准备好多大的图片，尽量固定图片尺寸。
## 使用Css Sprite
 使用雪碧图，可以整合页面中的多个图片为单个图片减少网络请求。内部通过设置CSS属性
```
background：url(xx.img) no-repeat x y。
```
参考：https://cloud.tencent.com/developer/article/1334594

生成雪碧图链接： https://www.toptal.com/developers/css/sprite-generator
## 使用WebP图片

使用WebP格式的图片可以减少图片和GIF动图的大小，可以减少带宽加快传输速度。

转webp链接：https://www.upyun.com/webp

## 使用矢量图标

对于系统中的小图标使用矢量图来代替小图片，它仅往HTML里插入字符和CSS样式，相对图片来说占用网络资源较小

阿里小图标： https://www.iconfont.cn
