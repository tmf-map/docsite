---
title: 宏任务
sidebar_label: 宏任务
---
## 前言
宏任务（macro-task/task）又按执行顺序分为同步宏任务和异步宏任务（这是两个宏任务）。理解宏任务中同步任务和异步任务的执行顺序，那么就相当于理解了JS异步执行机制–事件循环（Event Loop）。

总的执行顺序：

(macro)task->渲染->(macro)task->...

## 同步宏任务

同步任务指的是在JS引擎主线程上按顺序执行的任务，只有前一个任务执行完毕后，才能执行后一个任务，形成一个执行栈（函数调用栈）。
```js
console.log('script start');
console.log('script end');
```
## 异步宏任务

异步任务指的是不直接进入JS引擎主线程，而是满足触发条件时，相关的线程将该异步任务推进任务队列(task queue)，等待JS引擎主线程上的任务执行完毕，空闲时读取执行的任务，例如

- 异步Ajax
- DOM事件
- setTimeout/setInterval
- I/O
- UI rendering
- postMessage
- MessageChannel
- setImmediate(Node.js 环境)

### setTimeout

[点击查看](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout)`setTimeout`语法

```js
setTimeout(function() {
 console.log('setTimeout');
}, 0);
```

每一个`setTimeout`在执行时，会返回一个唯一ID。我们在使用时，常常会使用一个变量将这个唯一ID保存起来，用以传入`clearTimeout`，清除定时器。

我们都知道`setTimeout`和`setInterval`是异步任务的定时器，需要添加到任务队列等待主线程执行，那么使用`setTimeout`模拟实现`setInterval`，会有区别吗？

如果感兴趣，想深入了解两者的不同，可以[点击此处查看](https://thinkbucket.github.io/docsite/docs/blog/setTimeout-or-setInterval)

## setTimeout应用拓展
[防抖和节流教程](https://css-tricks.com/debouncing-throttling-explained-examples/)

[防抖源码实现](https://github.com/ThinkBucket/codebox/blob/master/src/debounce.js)

[节流源码实现](https://github.com/ThinkBucket/codebox/blob/master/src/throttle.js)
