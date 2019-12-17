---
title: em
sidebar_label: em
---

import Img from '../../../src/components/Img'; import Hint from '../../../src/components/Hint';

px 被称做“绝对单位”。也就是说，5px 在不同的场景下是一样的值。而其他的单位，如 em 和 rem，不是绝对的而是相对的。这也使得使用起来比较灵活也比较难以掌握。

在 CSS 中，“em”实际上是一个垂直测量。一个 em 等于任何字体中的字母所需要的垂直空间，而和它所占据的水平空间没有任何的关系。相对于 em 是以当前元素的字号大小作为基准值的。如当前对行内文本的字体尺寸未被人为设置（也没有继承），则相对于浏览器的默认字体尺寸。

em 特点：

- em 的值并不是固定的；
- em 会继承父级元素的字体大小。

<Hint type="warning">任意浏览器的默认 `font-size: 16px` 。所有未经调整的浏览器都符合: `1em = 16px` 。那么 `12px = 0.75em`, `10px = 0.625em` 。</Hint>

为了简化 font-size 的换算，需要在 CSS 中声明：

```html
html { font-size: 62.5%; // 1em = 16px * 0.625 = 10px }
```

这样就可以将默认的 em 转换比例变成：

```text
1em = 16px * 0.625 = 10px
1.2em = 12px
```

也就是说只需要将你的原来的 px 数值除以 10，然后换上 em 作为单位就行了。

在写 CSS 的时候，需要注意重新计算那些被放大的字体的 em 数值。避免字体大小的重复声明。也就是避免 1.2 \* 1.2= 1.44 的现象：

```css
html {
  font-size: 62.5%;
}
.parent {
  font-size: 1.2em; // 12px
  .child {
    font-size: 1em; // 注意此 em 非彼 em，相对的是 parent，所以是 12px
  }
}
```

是不是觉得这个 em 相对单位很难控制？这也是平时使用不多的原因之一。在这里也不推荐使用这个单位，请用 rem 替代，介绍了这么多其实是为了 rem 做铺垫。
