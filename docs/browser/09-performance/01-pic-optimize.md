---
id: pic-optimize
title: 图片优化
---

## 不在盒子元素中缩放图片

我们会为了方便在一个 200✖200 的图片容器内直接使用一张 400✖400 的图片，我们甚至认为这样能让用户觉得图片更加清晰，其实不然，在普通的显示器上，用户并不会感到缩放后的大图更加清晰，但这一切却导致网页加速速度下降，同时照成带宽浪费，你可能不知道，一张 200KB 的图片和 2M 的图片的传输时间会是 200ms 和 12s 的差距（亲身经历，深受其害(┬＿┬)）。所以，当你需要用多大的图片时，就在服务器上准备好多大的图片，尽量固定图片尺寸。

## 使用 Css Sprite

使用雪碧图，可以整合页面中的多个图片为单个图片减少网络请求。内部通过设置 CSS 属性

```css
background：url(xx.img) no-repeat x y;
```

参考：https://cloud.tencent.com/developer/article/1334594

生成雪碧图链接： https://www.toptal.com/developers/css/sprite-generator

## 使用 WebP 图片

使用 WebP 格式的图片可以减少图片和 GIF 动图的大小，可以减少带宽加快传输速度。

转 webp 链接：https://www.upyun.com/webp

## 使用矢量图标

对于系统中的小图标使用矢量图来代替小图片，它仅往 HTML 里插入字符和 CSS 样式，相对图片来说占用网络资源较小

阿里小图标： https://www.iconfont.cn

## 图片压缩

https://github.com/google/guetzli/

https://github.com/tinify/tinify-nodejs
