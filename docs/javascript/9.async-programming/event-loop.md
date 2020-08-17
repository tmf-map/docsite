---
title: 事件循环
---

import Img from '@site/src/components/Img';

## 浏览器事件循环

事件循环可以理解成由三部分组成，分别是：

- 主线程执行栈
- 异步任务等待触发
- 任务队列

**任务队列**(task queue)就是以队列的数据结构对事件任务进行管理，特点是先进先出，后进后出。

<Img width="650" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/image61.png" />

在 JS 引擎主线程执行过程中：

- 首先执行宏任务的同步任务，在主线程上形成一个执行栈，可理解为函数调用栈；
- 当执行栈中的函数调用到一些异步执行的 API（例如异步 Ajax，DOM 事件，setTimeout 等 API），则会开启对应的线程（Http 异步请求线程，事件触发线程和定时器触发线程）进行监控和控制
- 当异步任务的事件满足触发条件时，对应的线程则会把该事件的处理函数推进任务队列(task queue)中，等待主线程读取执行
- 当 JS 引擎主线程上的任务执行完毕，则会读取任务队列中的事件，将任务队列中的事件任务推进主线程中，按任务队列顺序执行
- 当 JS 引擎主线程上的任务执行完毕后，则会再次读取任务队列中的事件任务，如此循环，这就是事件循环（Event Loop）的过程

这就是加入微任务后的详细事件循环：

<Img width="520" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/1Bf7ar.jpg'/>

在事件循环中，每进行一次循环操作称为 tick，每一次 tick 的任务处理模型是比较复杂的，但关键步骤如下：

1. 执行一个宏任务（栈中没有就从事件队列中获取）
2. 执行过程中如果遇到微任务，就将它添加(没有执行)到微任务的任务队列中
3. 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
4. 当前宏任务执行完毕，开始检查渲染，然后 GUI 线程接管渲染
5. 渲染完毕后，JS 线程继续接管，开始下一个宏任务（从事件队列中获取）

流程图如下：

<Img width="550" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/image63.png'/>

浏览器事件循环经典题目:

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function timer() {
    console.log(new Date(), i);
  }, 1000);
}

/* VM84:3 Wed Oct 09 2019 09:29:47 GMT+0800 (中国标准时间) 5
VM84:3 Wed Oct 09 2019 09:29:47 GMT+0800 (中国标准时间) 5
VM84:3 Wed Oct 09 2019 09:29:47 GMT+0800 (中国标准时间) 5
VM84:3 Wed Oct 09 2019 09:29:47 GMT+0800 (中国标准时间) 5
VM84:3 Wed Oct 09 2019 09:29:47 GMT+0800 (中国标准时间) 5 */
```

解析： 根据 setTimeout 定义的操作在函数调用栈清空之后才会执行的特点，for 循环里定义了 5 个 setTimeout 操作。而等待 1 秒后，任务队列里的 setTimeout 开始依次执行时，for 循环的 i 值，已经先一步变成了 5。因为任务队列推到函数调用栈执行的时间可以忽略不记（毫秒级），所以打印的 GMT 时间（精确到秒）和 i 的值都是相同的。

解决这个问题有三种方法：

1. 使用闭包
2. 使用 let 定义变量 i
3. 使用 setTimeOut 的第三个参数，将第三个参数作为 setTimeout 回调函数。

[点击查看三种解决方案](https://thinkbucket.github.io/docsite/blog/for循环中的setTimeout)

## 相关拓展

[Event Loop 必知必会（六道题）](https://zhuanlan.zhihu.com/p/34182184)
