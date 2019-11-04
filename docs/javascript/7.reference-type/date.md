---
title: 日期
sidebar_label: 日期
---

## Date转数字
将Date类型转为数字类型的方法主要有一下几种：

- +new Date()
- Date.now()
- (new Date()).getTime()

### 应用：

在节流的源码中会涉及到时间差的计算，此时需要将Date类型的的值转为数字类型。

**节流源码：**
```js
function throttle(fn, wait) {
  let pre;
  return function(...args) {
    const now = Date.now();
    if (!pre || now - pre >= wait) {
      pre = now;
      fn.apply(this, args);
    }
  }
}
```

