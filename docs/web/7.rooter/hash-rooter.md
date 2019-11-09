---
id: hash-rooter
title: Hash 路由
sidebar_label: Hash 路由
---

## 路由要解决的问题

要实现前端路由，需要解决两个核心：
- 如何改变 URL 却不引起页面刷新？
- 如何检测 URL 变化了？

下面分别使用 hash 和 history 两种实现方式回答上面的两个核心问题。

## hash router

原理：

- hash 是 URL 中 hash (#) 及后面的那部分，常用作锚点在页面内进行导航，改变 URL 中的 hash 部分不会引起页面刷新
- 通过 hashchange 事件监听 URL 的变化，改变 URL 的方式只有这几种：通过浏览器前进后退改变 URL、通过`<a>`标签改变 URL、通过window.location改变URL，这几种情况改变 URL 都会触发 hashchange 事件

实现：

HTML 部分：
```
<body>
  <ul>
    <!-- 定义路由 -->
    <li><a href="#/home">home</a></li>
    <li><a href="#/about">about</a></li>

    <!-- 渲染路由对应的 UI -->
    <div id="routeView"></div>
  </ul>
</body>
```

JavaScript 部分：

```js
// 页面加载完不会触发 hashchange，这里主动触发一次 hashchange 事件
window.addEventListener('DOMContentLoaded', onLoad)
// 监听路由变化
window.addEventListener('hashchange', onHashChange)

// 路由视图
var routerView = null

function onLoad () {
  routerView = document.querySelector('#routeView')
  onHashChange()
}

// 路由变化时，根据路由渲染对应 UI
function onHashChange () {
  switch (window.location.hash) {
    case '#/home':
      routerView.innerHTML = 'Home'
      return
    case '#/about':
      routerView.innerHTML = 'About'
      return
    default:
      return
  }
}

```

[damo链接](https://codepen.io/ustc-han/pen/eqzeBe?editors=1010)

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/NcNC0d.png)

演示时，打开控制台，可以使用通过修改location.hash实现home和about的切换。这进一步证明了hash rooter通过监听location.hash来修改路由。每次路由的切换，history的length都会+1。
