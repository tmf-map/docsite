---
title: 事件类型
---

## mouseover & mouseenter

在做`input`组件的时候，需要有一个鼠标悬浮后，出现一个小图标，点击小图标清除文字的事件。如下图：

![20191012200452.png](https://robbie-blog.oss-cn-shanghai.aliyuncs.com/img/20191012200452.png)

此时如果使用`mouseover`和`mouseout`事件控制图标显示，发现如果鼠标移到 icon 边界，就会**出现 icon 闪烁**。这代表着`mouseout`事件被触发，显示图标的变量变为`false`。

<!--more-->

### mouseover 和 mouseenter 的区别

类似`mouseover`，它们两者之间的差别是 `mouseenter`不会冒泡，也就是说当指针从它的**子层物理空间**移到**它的物理空间上**时不会触发。两个对应的`mouseout`和`mouseleave`行为相同。

由于`mouseover`和`mouseout`在空间之间切换也会触发事件，这就导致了在 icon 的边界`mouseover`和`mouseout`会的频繁切换，表现出现 icon 闪烁。

### 演示地址

如果以上的内容，都没看明白，也没关系。点击此[链接](https://qianlongo.github.io/zepto-analysis/example/event/mouseEnter-mouseOver.html)可以更直观的展示了两者的区别。

链接失效可点[此处下载](https://robbie-blog.oss-cn-shanghai.aliyuncs.com/mouseover%26mouseenter.html)
