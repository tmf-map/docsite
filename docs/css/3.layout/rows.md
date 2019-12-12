---
title: 行布局
sidebar_label: 行布局
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import Hint from '../../../src/components/Hint';

## 两行布局

两行布局主要是 PX-AUTO 型，[在线 Demo](https://codepen.io/muwenzi/pen/jjKrrw) , 但在实际应用中需要注意两点：

1. PX 可能在不同页面具体的值不一样
1. Scroll 不要被顶部和底部遮盖

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/PHcOwS.jpg'/>

<Tabs defaultValue="html" values={[{label: 'HTML', value: 'html'}, {label: 'LESS', value: 'less'}]}>

<TabItem value="html">

```html
<main>
  <div class="px">PX</div>
  <div class="auto-scroll-parent">
    <div class="auto-scroll-child">AUTO(scroll)</div>
  </div>
</main>
```

</TabItem>
<TabItem value="less">

```less
main {
  display: flex;
  flex-direction: column; // 调整主轴方向
  height: 100vh;
}
.px {
  height: 50px; // 高度有可能在实际中自动产生，此处为模拟
  flex-shrink: 0;
}
.auto-scroll {
  &-parent {
    overflow-y: scroll;
  }
  &-child {
    height: 400px;
  }
}
```

</TabItem>
</Tabs>

<Hint type="tip">要想出现 y 轴的滚动条，那么父元素的实际高度要比子元素的高度小，且 `overflow-y` 是加在父元素上的。</Hint>

如果使用的 `calc`, `margin`, `position: absolute` 之类的方式进行布局, 则 AUTO 部分的 `top` 偏移值可能在不同页面实际值不一样，那么使用 flex 将是一个非常不错的选择。

## 三行布局

三行布局主要是 PX1-AUTO-PX2 型
