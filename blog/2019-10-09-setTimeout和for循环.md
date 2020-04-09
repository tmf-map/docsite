---
title: for循环中的setTimeout
author: Robbie Han
author_title: Front End Engineer @ Tradeshift
author_url: https://github.com/USTC-Han
author_image_url: https://robbie-pic.oss-cn-beijing.aliyuncs.com/IMG_4175.JPG?x-oss-process=style/compress
tags: [setTimeout, for]
---

import Img from '../src/components/Img';

## 前言：

浏览器事件循环经典题目:

```js
for (var i=0; i<5; i++) {
    setTimeout( function timer() {
        console.log(new Date, i);
    }, 1000);
}
VM84:3 Wed Oct 09 2019 09:29:47 GMT+0800 (中国标准时间) 5
VM84:3 Wed Oct 09 2019 09:29:47 GMT+0800 (中国标准时间) 5
VM84:3 Wed Oct 09 2019 09:29:47 GMT+0800 (中国标准时间) 5
VM84:3 Wed Oct 09 2019 09:29:47 GMT+0800 (中国标准时间) 5
VM84:3 Wed Oct 09 2019 09:29:47 GMT+0800 (中国标准时间) 5
```

解析： 根据 setTimeout 定义的操作在函数调用栈清空之后才会执行的特点，for 循环里定义了 5 个 setTimeout 操作。而等待 1 秒后，任务队列里的 setTimeout 开始依次执行时，for 循环的 i 值，已经先一步变成了 5。因为任务队列推到函数调用栈执行的时间可以忽略不记（毫秒级），所以打印的 GMT 时间（精确到秒）和 i 的值都是相同的。

<!--truncate-->

解决这个问题有三种方法：

1. 使用闭包
2. 使用 let 定义变量 i
3. 使用 setTimeOut 的第三个参数，将第三个参数作为 setTimeout 回调函数。

## 闭包法：

闭包可以将外层引用保存在内存中，借助闭包的特性，每次循环时，将 i 值保存在一个闭包中，当 setTimeout 中定义的操作执行时，则访问对应闭包保存的 i 值。

而我们知道在函数中闭包判定的准则，即执行时是否在内部定义的函数中访问了上层作用域的变量。因此我们需要包裹一层自执行函数为闭包的形成提供条件。

具体代码，如下所示：

```js
for (var i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(function timer() {
      console.log(i);
    }, i * 1000);
  })(i);
}
```

代码主要通过使用**自执行函数提供闭包条件**并将**传入 i 的值保存在闭包**中实现的。

如下图所示，我们可以通过在 Chrome 中打断点查看闭包的值

<Img width="480" legend="图：Chrome控制台闭包" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/xTvjaK.png" />

## 使用 let：

在 for 循环中使用 let 声明循环因子时，不仅将循环因子 i 绑定到了 for 循环的块级作用域中，还保证了每次迭代都会对 i 进行重新赋值。

使用 let 的代码如下：

```js
for (let i = 0; i < 5; i++) {
  setTimeout(function timer() {
    console.log(new Date(), i);
  }, 1000);
}
```

每次迭代，i 的绑定和赋值可以等价下面的代码：

```js
{
  let j;
  for (j = 0; j < 5; j++) {
    let i = j;
    // some code
  }
}
```

## 使用 setTimeOut 的第三个参数：

setTimeOut 可以有多个参数，第一个参数是回调函数，第二个参数是回调函数被推向回调队列的时间，多于两个的参数将作为回调函数的参数。

```js
for (var i = 0; i < 5; i++) {
  setTimeout(
    function timer(v) {
      console.log(new Date(), v);
    },
    i * 1000,
    i
  );
}
```

使用 setTimeOut 的第三个参数可以让回调函数避免引用同一个参数，解决了前言中存在的问题
