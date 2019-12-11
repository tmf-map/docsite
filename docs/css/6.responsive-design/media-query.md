---
title: 媒体查询
sidebar_label: 媒体查询
---

## 选择加载 CSS

"自适应网页设计"的核心，就是 CSS3 引入的 **Media Query** 模块。

它的意思就是，自动探测屏幕宽度，然后加载相应的 CSS 文件。

```html
<link
  rel="stylesheet"
  type="text/css"
  media="screen and (max-device-width: 400px)"
  href="tinyScreen.css"
/>
```

上面的代码意思是如果屏幕宽度小于 400 像素，就加载 `tinyScreen.css` 文件。

```html
<link
  rel="stylesheet"
  type="text/css"
  media="screen and (min-width: 400px) and (max-device-width: 600px)"
  href="smallScreen.css"
/>
```

如果屏幕宽度在 400 像素到 600 像素之间，则加载 `smallScreen.css` 文件。

除了用 HTML 标签加载 CSS 文件，还可以在现有 CSS 文件中加载。

```css
@import url('tinyScreen.css') screen and (max-device-width: 400px);
```

## CSS 的 @media 规则

同一个 CSS 文件中，也可以根据不同的屏幕分辨率，选择应用不同的 CSS 规则。

```css
@media (min-width: 400px) {
}
@media (max-width: 399px) {
}
@media (min-width: 500px) and (max-width: 799px) {
}
```

这种写法在分界值，比较“丑陋”。在 **Media Queries Level 4** 中可以这样写：

```css
@media (width >= 400px) {
}
@media (width < 400px) {
}
@media (500px <= width < 800px) {
}
```

## 参考资料

1. [自适应网页设计（Responsive Web Design）, 作者： 阮一峰](http://www.ruanyifeng.com/blog/2012/05/responsive_web_design.html)
2. [Using media queries, By MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Syntax)
