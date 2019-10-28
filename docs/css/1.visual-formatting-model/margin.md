---
title: margin合并
sidebar_label: margin合并
---
BFC中规定垂直方向属于同一个BFC里的元素**垂直方向**边距合并。

**注意:**
- 父子元素的垂直`margin`合并需要**保证两者没有被非空内容、padding、border 或 clear 分隔开**。在没有被分隔开的情况下，一个元素的 margin-top 会和它普通流中的第一个子元素(非浮动元素等)的 `margin-top` 相邻，会产生合并，否则不会合并。
- 垂直方向的兄弟元素不受`padding`、`border`等的限制，即使含有也会产生合并
<!--more-->
如下图所示：

<img src='https://robbie-blog.oss-cn-shanghai.aliyuncs.com/img/20191014105734.png'/>
![20191014105734.png]

[demo链接](https://codepen.io/ustc-han/pen/oNNbRxZ?editors=0100)

### 解决margin合并

1. 对于上下相邻的元素，设置浮动、`inline-block`、绝对定位属性，它们的`margin`在垂直方向上不会和其他元素的`margin`合并。

2. 创建了块级格式化上下文的元素，不和它的子元素发生 `margin`合并。

**触发BFC的条件：**
- html元素
- float（除了none）
- overflow（除了visible）
- display（table-cell/table-caption/inline-block/flex）
- position（除了static/relative）

**触发BFC并不能保证可以解决margin合并，触发BFC是相邻元素不发生合并的子集**。例如：为上下相邻的元素设置了`overflow:hidden`，虽然触发了BFC，但是上下元素的上下`margin`还是会发生折叠

### 举个例子
html代码：
```
<div class="blue"></div>
<div class="red-outer">
  <div class="red-inner">red inner</div>
</div>
```
CSS代码
```
.blue{
  height: 50px;
  margin: 10px 0;
  background: blue;
}

.red-inner {
  background: red;
  margin: 10px 0;
}

.red-outer {
  overflow: hidden;
}
```

[DAMO链接](https://codepen.io/ustc-han/pen/ydKeXY)

解决方案：
由解决方案的第二条，`创建了BFC的元素，不和它的子元素发生 margin 合并`。

通过在外面包裹一层盒子，设置`overflow: hidden;`为外部盒子新建BFC规范，这样子元素不会同外部盒子合并，而外部盒子是个空元素。就相当于`class`为`blue`的盒子与`class`为`reed-inner`的盒子不会`margin`合并。
