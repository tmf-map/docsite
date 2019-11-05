---
id: history-rooter
title: History路由
sidebar_label: History路由
---

原理：
- history 提供了 pushState 和 replaceState 两个方法，这两个方法改变 URL 的 path 部分不会引起页面刷新
- history 提供类似 hashchange 事件的 popstate 事件，但 popstate 事件有些不同：通过浏览器前进后退改变 URL 时会触发 popstate 事件，通过pushState/replaceState或`<a>`标签改变 URL 不会触发 popstate 事件。好在我们可以拦截 pushState/replaceState的调用和`<a>`标签的点击事件来检测 URL 变化，所以监听 URL 变化可以实现，只是没有 hashchange 那么方便。

实现：

HTML 部分：
```
<body>
  <ul>
    <li><a href='/home'>home</a></li>
    <li><a href='/about'>about</a></li>

    <div id="routeView"></div>
  </ul>
</body>
```
JavaScript 部分：
```js
// 页面加载完不会触发 hashchange，这里主动触发一次 hashchange 事件
window.addEventListener('DOMContentLoaded', onLoad)
// 监听路由变化
window.addEventListener('popstate', onPopState)

// 路由视图
var routerView = null

function onLoad () {
  routerView = document.querySelector('#routeView')
  onPopState()

  // 拦截 <a> 标签点击事件默认行为， 点击时使用 pushState 修改 URL并更新手动 UI，从而实现点击链接更新 URL 和 UI 的效果。
  var linkList = document.querySelectorAll('a[href]')
  linkList.forEach(el => el.addEventListener('click', function (e) {
    e.preventDefault()
    history.pushState(null, '', el.getAttribute('href'))
    onPopState()
  }))
}

// 路由变化时，根据路由渲染对应 UI
function onPopState () {
  switch (window.location.pathname) {
    case '/home':
      routerView.innerHTML = 'Home'
      return
    case '/about':
      routerView.innerHTML = 'About'
      return
    default:
      return
  }
}
```
演示：https://codepen.io/ustc-han/pen/ZgOaNj

结合React框架的路由实现：https://github.com/whinc/web-router-principle/tree/master/react

History对象的其他方法：http://javascript.ruanyifeng.com/bom/history.html
相关文章：https://juejin.im/post/5ac61da66fb9a028c71eae1b#heading-7
