---
title: 防抖
---

import Img from '../../../src/components/Img';

## 什么是 debounce

以鼠标点击为例无论多快地点击多少次，最终都以最后一次加 delay 的时间为准且，下图一个颜色的我只会执行最后一次，且还是加了 delay 时间的：

<Img align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/9P2oyG.jpg'/>

例如当你在电梯里时，门正准备关闭，突然另一个人试图上电梯。电梯的门又回自动打开。这就像 debounce ，电梯里等待的人，虽然上下楼的时间被延迟了，但资源的利用却得到了优化。

## 代码实现

```js
function debounce(fn, wait) {
  let timer;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}
```
