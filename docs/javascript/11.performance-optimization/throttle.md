---
title: 节流
---

import Img from '@site/src/components/Img';

节流 (throttle) 是固定时间内触发，以鼠标点击为例，它不是以最后一次为准，而是看是不是刚好达到所规定的时间间隔，否则就忽略这次操作。像 `window.scroll` 这种一般需要进行节流。

## 时间戳版

在持续触发事件的过程中，函数会立即执行，并且每 1s 执行一次。

<Img width="560" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Pkjprp.jpg'/>

```js
function throttle(fn, wait) {
  let pre;
  return function (...args) {
    const now = Date.now();
    if (!pre || now - pre >= wait) {
      pre = now;
      fn.apply(this, args);
    }
  };
}
```

## 定时器版

在持续触发事件的过程中，函数不会立即执行，并且每 1s 执行一次，在停止触发事件后，函数还会再执行一次。

<Img width="560" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/0PDoyB.jpg'/>

```js
function throttle(fn, wait) {
  let timer;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(this, args);
      }, wait);
    }
  };
}
```

## 区别

时间戳版的函数触发是在时间段内开始的时候，而定时器版的函数触发是在时间段内结束的时候。
