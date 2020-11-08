---
title: 节流
---

节流 (`throttle`) 是固定时间内触发。以鼠标点击为例，它不是以最后一次为准，而是看触发时间是否刚好达到所规定的时间间隔，如果在未到时间间隔，就忽略这次操作。在实际应用中， `window.scroll` 这种一般需要进行节流。

## 时间戳版

在持续触发事件的过程中，函数会立即执行，并且每 1s 执行一次。如下图所示：

<Img width="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20201107222117.png'/>

```js
function throttle(fn, interval) {
  let pre;
  return function (...args) {
    const now = Date.now();
    // 当前触发和上次触发的时间间隔大于interval时执行
    if (!pre || now - pre >= interval) {
      pre = now;
      fn.apply(this, args);
    }
  };
}
```

## 定时器版

在持续触发事件的过程中，函数不会立即执行，并且每 1s 执行一次，在停止触发事件后，函数还会再执行一次。

<Img width="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/20201107222206.png'/>

```js
function throttle(fn, interval) {
  let timer;
  return function (...args) {
    if (!timer) {
      // 定时器每次执行函数时都会将time改为null，并在1s后触发
      timer = setTimeout(() => {
        timer = null;
        func.apply(this, args);
      }, interval);
    }
  };
}
```

## 区别

时间戳版的函数触发是在时间段内开始的时候，而定时器版的函数触发是在时间段内结束的时候。
