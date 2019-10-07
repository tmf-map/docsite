---
id: portal
title: Portal
sidebar_label: Portal
---

## 什么是 Portal?

Portal 中文即“传送门”的意思，看一张电影海报，不用多说，你应该能猜出来是什么意思：

![doctor strange](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/hEPsMb.jpg)

Portals 提供了一种很好的将子节点渲染到父组件以外的 DOM 节点的方式。

```jsx
ReactDOM.createPortal(child, container)
```

第一个参数（`child`）是任何[可渲染的 React 子元素](https://reactjs.org/docs/react-component.html#render)，例如一个元素，字符串或碎片。第二个参数（`container`）则是一个 DOM 元素。

## 为什么需要 Portal?

React Portal 之所以叫 Portal，因为做的就是和“传送门”一样的事情：**render到一个组件里面去，实际改变的是网页上另一处的DOM结构**。

在React的世界中，一切都是组件，用组件可以表示一切界面中发生的逻辑，不过，有些特例处理起来还比较麻烦，比如，某个组件在渲染时，在某种条件下需要显示一个对话框(Dialog)，这该怎么做呢？

最直观的做法，就是直接在JSX中把Dialog画出来，像下面代码的样子。

```jsx
<div class="foo">
   <div> ... </div>
   { needDialog ? <Dialog /> : null }
</div>
```

问题是，我们写一个Dialog组件，就这么渲染的话，Dialog最终渲染产生的HTML就存在于上面JSX产生的HTML一起了，类似下面这样。

```jsx
<div class="foo">
   <div> ... </div>
   <div class="dialog">Dialog Content</div>
</div>
```

可是问题来了，对于对话框，从用户感知角度，应该是一个独立的组件，通常应该显示在屏幕的最中间，现在 Dialog 被包在其他组件中，要用CSS的 `position` 属性控制Dialog位置，就要求从Dialog往上一直到body没有其他 `position: relative` 的元素干扰，这……有点难为作为通用组件的 Dialog，毕竟，谁管得住所有组件不用 `position` 呢。

还有一点，Dialog的样式，因为包在其他元素中，各种样式纠缠，CSS样式太容易搞成一坨浆糊了。

看样子这样搞局限很多啊，行不通，有没有其他办法？

有一个其他办法，就是在React组件树的最顶层留一个元素专属于Dialog，然后通过Redux或者其他什么通讯方式给这个Dialog发送信号，让Dialog显示或者不显示。
