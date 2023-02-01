---
title: 数据绑定
---

## getter/setter

当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的属性，并使用 `Object.defineProperty` 把这些属性全部转为 getter/setter。`Object.defineProperty` 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因，[阅读更多](https://www.google.com/url?q=https://cn.vuejs.org/v2/guide/reactivity.html&sa=D&ust=1570449321571000)。

## Proxy

[在线 Demo](https://codepen.io/muwenzi/pen/rNNGdvY)

```html
<div id="count"></div>
<button onclick="increase()">+</button>
<button onclick="decrease()">-</button>
```

```js
const data = {count: 0};
const proxy = new Proxy(data, {
  get(target, property) {
    return target[property];
  },
  set(target, property, value) {
    target[property] = value;
    render(value);
  }
});

render(proxy.count);

function render(value) {
  document.getElementById('count').innerHTML = value;
}

function increase() {
  proxy.count += 1;
}

function decrease() {
  proxy.count -= 1;
}
```
