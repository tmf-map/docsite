---
title: 防抖
---

## 什么是防抖(debounce)

以鼠标的点击事件为例，无论被快速地触发了多少次，只会在最后一次点击 + `delay time` 时触发回调。如下图所示：

<Img width="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20201107224205.png'/>

`debounce`与坐电梯的场景很相似。比如当电梯门正准备关闭是，突然另一个人试图上电梯，电梯的门又回自动打开。这就像 `debounce` ，电梯里等待的人，虽然上下楼的时间被延迟了，但资源的利用却得到了优化。

## 代码实现

`debounce`主要通过闭包和定时器来实现。闭包的作用是保证`debounce`函数在被执行完后，可以保留上次执行的定时器。如果在`delay`的时间内，`debounce`被再次触发，就更新保留的定时器。如果在 delay 的时间内没有被再次触发，就执行`fn`

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```
