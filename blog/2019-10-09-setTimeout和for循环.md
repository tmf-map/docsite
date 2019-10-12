---
id: for循环中的setTimeout
title: for循环中的setTimeout
author: Robbie Han
authorTitle: Front End Engineer @ Tradeshift
authorURL: https://github.com/USTC-Han
authorImageURL: https://robbie-pic.oss-cn-beijing.aliyuncs.com/IMG_4175.JPG?x-oss-process=style/compress
authorTwitter: 
tags: [setTimeout, for]
---
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

解析： 根据setTimeout定义的操作在函数调用栈清空之后才会执行的特点，for循环里定义了5个setTimeout操作。而等待1秒后，任务队列里的setTimeout开始依次执行时，for循环的i值，已经先一步变成了5。因为任务队列推到函数调用栈执行的时间可以忽略不记（毫秒级），所以打印的GMT时间（精确到秒）和i的值都是相同的。

<!--truncate-->
解决这个问题有三种方法：

1. 使用闭包
2. 使用let定义变量 i
3. 使用setTimeOut的第三个参数，将第三个参数作为setTimeout回调函数。

## 闭包法：

闭包可以将外层引用保存在内存中，借助闭包的特性，每次循环时，将i值保存在一个闭包中，当setTimeout中定义的操作执行时，则访问对应闭包保存的i值。

而我们知道在函数中闭包判定的准则，即执行时是否在内部定义的函数中访问了上层作用域的变量。因此我们需要包裹一层自执行函数为闭包的形成提供条件。

具体代码，如下所示：
```js
for (var i=0; i<5; i++) { 
    (function(i) {
        setTimeout( function timer() {
            console.log(i);
        }, i*1000 );
    })(i)
}
```
代码主要通过使用**自执行函数提供闭包条件**并将**传入i的值保存在闭包**中实现的。

如下图所示，我们可以通过在Chrome中打断点查看闭包的值

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/xTvjaK.png)

## 使用let：

在for循环中使用let声明循环因子时，不仅将循环因子i绑定到了for循环的块级作用域中，还保证了每次迭代都会对i进行重新赋值。

使用let的代码如下：
```js
for (let i=0; i<5; i++) {
    setTimeout( function timer() {
        console.log(new Date, i);
    }, 1000);
}
```

每次迭代，i的绑定和赋值可以等价下面的代码：

```js
{
  let j
  for (j=0; j<5; j++) {
    let i=j;
    // some code
  }
}

```
## 使用setTimeOut的第三个参数：

setTimeOut可以有多个参数，第一个参数是回调函数，第二个参数是回调函数被推向回调队列的时间，多于两个的参数将作为回调函数的参数。

```js
for (var i=0; i<5; i++) {
    setTimeout(function timer(v) {
        console.log(new Date, v);
    }, i*1000, i);
}
```
使用setTimeOut的第三个参数可以让回调函数避免引用同一个参数，解决了前言中存在的问题
